#!/usr/bin/env node
// ============================================================================
// tools/claude-api-transcribe.mjs — la 3ra API del pipeline de transcripción,
// para cuando Gemini rechaza un documento por `finishReason: RECITATION` (un
// falso positivo de copyright de Google, no un problema del documento -- ver
// Admin/Archive/test-costo-transcripcion.md). `tools/onboard.mjs` la llama sola,
// automáticamente, cuando detecta eso en la salida de Gemini (ver
// `transcribeGeminiWithFallback()` ahí) -- este archivo antes era
// tools/thirdapi-transcribe.mjs, un placeholder sin API elegida; renombrado
// acá porque Guido decidió probar Claude primero.
//
// Por qué Claude (Sonnet 5.5) y no otra: es el mismo modelo que YA es la 3ra
// red de este pipeline como subagente completo (el que resuelve lo que
// ninguna API resuelve sola) -- acá se lo llama por API directa (una sola
// llamada a /v1/messages con el PDF adjunto), no como una sesión agéntica,
// así que sale mucho más barato que los 70k-290k tokens de un subagente, y
// sin el filtro de RECITATION conocido de Gemini para documentos financieros.
//
// RAW HTTP, sin SDK -- mismo criterio que mistral-ocr-transcribe.mjs y
// gemini-transcribe.mjs: este proyecto no tiene package.json ni
// node_modules, a propósito, y las otras 2 tools de transcripción ya llaman
// a su API con fetch() directo. Instalar el SDK de Anthropic solo para este
// archivo rompería esa convención sin necesidad real (la API de Mensajes es
// una sola llamada HTTP, no hace falta el SDK para eso).
//
// STREAMING, no una espera simple: una transcripción completa puede generar
// muchos miles de tokens de salida (Gemini llegó a ~52k en un documento real
// de este proyecto), y a la velocidad de generación normal eso puede tardar
// varios minutos -- una respuesta NO streameada se puede cortar sola antes de
// terminar. Se arma el SSE a mano (sin SDK) acumulando los `content_block_delta`
// de tipo `text_delta`.
//
// USO:
//   node tools/claude-api-transcribe.mjs "<archivo.pdf>" [--out-suffix -gemini-check]
//   node tools/claude-api-transcribe.mjs --all [--dir Clubes/Colombia] [--limit N] [--concurrency N]
//
// Necesita Admin/claude-api/.env con ANTHROPIC_API_KEY=... (gitignoreado,
// mismo criterio que Gemini/Mistral/Resend).
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync, statSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, basename, extname, join } from 'node:path';
import { derivado, ubicar } from './rutas.mjs';
import { execFileSync, spawnSync } from 'node:child_process';

const MODEL = 'claude-sonnet-5-5';
// Precios de la API de Anthropic para claude-sonnet-5-5 (ver la skill claude-api de este proyecto,
// cacheada 2026-09-25): $2/$10 por millón de tokens de entrada/salida.
const PRICE_IN_PER_MTOK = 2.0;
const PRICE_OUT_PER_MTOK = 10.0;
const MAX_RETRIES = 4;
const DEFAULT_TIMEOUT_MS = 600_000; // 10 min -- más largo que Mistral/Gemini (150s) porque streamea
const MAX_TOKENS = 64000;
// Un documento de más de CHUNK_PAGES páginas se parte en tramos (con qpdf) y se transcribe tramo por
// tramo. Motivo real (test de motores, 2026-09-29): una memoria de 88 páginas se cortó en la página 46
// por el tope de salida y la tool guardó el .md incompleto sin avisar; y un balance de 46 páginas
// usó 57.7k de los 64k tokens posibles. Con tramos de 25 páginas queda mucho margen.
const CHUNK_PAGES = 25;
// La API de Anthropic rechaza pedidos de más de ~32 MB (el PDF va en base64, +33%): un tramo no puede pesar
// más de esto. BUG REAL del segundo piloto del inventario (Temperley, PDF de 34,7 MB): "request_too_large".
const MAX_CHUNK_BYTES = 20 * 1024 * 1024;

// qpdf devuelve 3 cuando el resultado es válido pero el PDF de origen tenía advertencias (xref roto, etc.):
// es un ÉXITO. execFileSync lo trata como error, por eso esto va con spawnSync (BUG REAL: Williams, Aalesund).
export function qpdfExtract(src, pagesSpec, out) {
  const r = spawnSync('qpdf', [src, '--pages', '.', pagesSpec, '--', out]);
  if ((r.status !== 0 && r.status !== 3) || !existsSync(out)) throw new Error(`qpdf falló (código ${r.status}) extrayendo ${pagesSpec}: ${String(r.stderr || '').slice(0, 200)}`);
}

// Parte [a,b] en tramos que pesen menos de MAX_CHUNK_BYTES una vez recortados. Una sola página que ya
// pasa el límite no se puede partir más: se avisa con un error claro en vez de mandar un pedido que la API rechaza.
function sizedRanges(pdfPath, a, b, tmp) {
  const f = join(tmp, `p${a}-${b}.pdf`);
  qpdfExtract(pdfPath, `${a}-${b}`, f);
  if (statSync(f).size <= MAX_CHUNK_BYTES) return [{ range: [a, b], file: f }];
  if (a === b) throw new Error(`la página ${a} pesa ${(statSync(f).size / 1048576).toFixed(0)} MB solo: supera el límite de la API y no se puede partir`);
  const mid = Math.floor((a + b) / 2);
  return [...sizedRanges(pdfPath, a, mid, tmp), ...sizedRanges(pdfPath, mid + 1, b, tmp)];
}

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, 'Admin', 'claude-api', '.env');
const resultsPath = resolve(projectRoot, 'Admin', 'claude-api', 'resultados.jsonl');
const failuresPath = resolve(projectRoot, 'Admin', 'claude-api', 'fallidos.jsonl');
const fidelidadScript = resolve(projectRoot, 'tools', 'check-transcripcion-fidelidad.js');

function checkFidelidad(mdPath) {
  try {
    const out = execFileSync(process.execPath, [fidelidadScript, mdPath, '--json'], { encoding: 'utf8' });
    return JSON.parse(out);
  } catch (err) {
    if (err.stdout) { try { return JSON.parse(err.stdout); } catch { /* sigue abajo */ } }
    return null;
  }
}

function readEnvKey() {
  const raw = readFileSync(envPath, 'utf8');
  const line = raw.split('\n').find((l) => l.startsWith('ANTHROPIC_API_KEY='));
  if (!line) throw new Error(`No encontré ANTHROPIC_API_KEY en ${envPath}`);
  return line.slice('ANTHROPIC_API_KEY='.length).trim();
}

// Mismo prompt, palabra por palabra, que gemini-transcribe.mjs -- las 2 transcripciones tienen que
// seguir exactamente las mismas reglas para que tools/compare-transcripts.mjs compare manzanas con
// manzanas (mismo formato de marca de página, mismos criterios de número exacto/ilegible).
const PROMPT = `Transcribí TODO el contenido de este PDF a Markdown, fiel y completo, siguiendo estas reglas exactas:

1. Página por página, en el mismo orden del documento. Antes de cada página poné una marca "--- pág. N ---" (N = número de página real del PDF, empezando en 1). NO te saltees ni colapses páginas -- una marca por cada página física del documento, sin excepción, aunque el documento sea largo.
2. Incluí TODO: texto narrativo, notas, y especialmente las tablas. Las tablas van como tablas Markdown (con | y separador de header) o como listas alineadas si una tabla Markdown no representa bien la estructura (ej. columnas muy anchas).
3. Los números van EXACTAMENTE como figuran impresos -- sin redondear, sin convertir moneda, sin reclasificar a ninguna categoría. Si un número tiene puntos de miles o comas decimales, respetá el formato original tal cual aparece.
4. Es una transcripción fiel, NO un resumen. No te saltees contenido "poco relevante" -- notas al pie, encabezados repetidos, todo va.
5. Si una parte de una imagen/tabla es ilegible o ambigua, escribí "[ilegible]" en ese punto en vez de adivinar un número.
6. No agregues comentarios, interpretación, ni encabezado propio -- el output es la transcripción sola, arrancando directo con "--- pág. 1 ---".`;

function findPdfsSinTranscribir(startDir) {
  const out = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.pdf$/i.test(entry)) {
        const md = full.slice(0, -4) + '.md';
        if (!existsSync(md)) out.push(full);
      }
    }
  }
  walk(startDir);
  return out.sort();
}

// SSE a mano, sin SDK (ver la cabecera del archivo para el porqué de streaming). Acumula el texto
// de los `content_block_delta` tipo `text_delta`, y agarra `usage`/`stop_reason` de `message_start`/
// `message_delta`. Devuelve { ok, text, stopReason, usage, error }.
async function streamMessage(pdfBytes, apiKey, timeoutMs, prompt = PROMPT) {
  const base64 = pdfBytes.toString('base64');
  const body = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    stream: true,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
          { type: 'text', text: prompt },
        ],
      },
    ],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!resp.ok) {
      const errText = await resp.text();
      return { ok: false, status: resp.status, error: errText.slice(0, 500) };
    }
    let text = '';
    let stopReason = null;
    const usage = { input_tokens: 0, output_tokens: 0 };
    let buffer = '';
    for await (const chunk of resp.body) {
      buffer += Buffer.isBuffer(chunk) ? chunk.toString('utf8') : Buffer.from(chunk).toString('utf8');
      let idx;
      while ((idx = buffer.indexOf('\n\n')) !== -1) {
        const rawEvent = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);
        const dataLine = rawEvent.split('\n').find((l) => l.startsWith('data:'));
        if (!dataLine) continue;
        let evt;
        try { evt = JSON.parse(dataLine.slice(5).trim()); } catch { continue; }
        if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
          text += evt.delta.text;
        } else if (evt.type === 'message_start') {
          usage.input_tokens = evt.message?.usage?.input_tokens ?? 0;
        } else if (evt.type === 'message_delta') {
          if (evt.delta?.stop_reason) stopReason = evt.delta.stop_reason;
          if (evt.usage?.output_tokens != null) usage.output_tokens = evt.usage.output_tokens;
        }
      }
    }
    return { ok: true, text, stopReason, usage };
  } catch (err) {
    const isTimeout = err.name === 'AbortError';
    return { ok: false, error: isTimeout ? `Timeout tras ${(timeoutMs / 1000).toFixed(0)}s` : `Error de red: ${err.message}` };
  } finally {
    clearTimeout(timer);
  }
}

function pageCount(pdfPath) {
  try {
    const m = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' }).match(/^Pages:\s+(\d+)/m);
    return m ? Number(m[1]) : null;
  } catch {
    return null;
  }
}

async function transcribeOne(pdfPath, apiKey, timeoutMs = DEFAULT_TIMEOUT_MS, opts = {}) {
  const outSuffix = opts.outSuffix || '';
  // Versión 317: con --out-suffix (una segunda voz, un rehacer, un test) el .md es un DERIVADO y va a Generados/ (tools/rutas.mjs); sin
  // sufijo es LA transcripción del documento y queda al lado del PDF, en Clubes/.
  const mdPath = outSuffix ? derivado(pdfPath, outSuffix + '.md') : resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
  if (existsSync(mdPath) && !opts.redo) {
    return { skipped: true, pdf: pdfPath };
  }

  const totalPages = pageCount(pdfPath);
  const t0 = Date.now();
  let lastErr;
  let text = '';
  const usage = { input_tokens: 0, output_tokens: 0 };
  let stopReason = 'end_turn';

  // Tramos: { range:[primeraPágina, últimaPágina], file }. Un solo tramo sin recortar = el PDF entero, como antes.
  // Se recorta si tiene más de CHUNK_PAGES páginas O si pesa más de lo que la API acepta.
  const needsChunking = (totalPages && totalPages > CHUNK_PAGES) || statSync(pdfPath).size > MAX_CHUNK_BYTES;
  const tmp = needsChunking ? mkdtempSync(join(tmpdir(), 'claude-chunk-')) : null;
  let ranges;
  try {
    if (needsChunking) {
      ranges = [];
      for (let a = 1; a <= (totalPages || 1); a += CHUNK_PAGES) ranges.push(...sizedRanges(pdfPath, a, Math.min(a + CHUNK_PAGES - 1, totalPages || 1), tmp));
    } else {
      ranges = [null];
    }
  } catch (err) {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
    lastErr = `No se pudo preparar el PDF: ${err.message}`;
    appendFileSync(failuresPath, JSON.stringify({ ts: new Date().toISOString(), pdf: pdfPath.replace(projectRoot + '/', ''), error: lastErr }) + '\n', 'utf8');
    return { ok: false, pdf: pdfPath, error: lastErr };
  }

  try {
    for (const item of ranges) {
      const range = item ? item.range : null;
      let bytes, prompt = PROMPT;
      if (range) {
        bytes = readFileSync(item.file);
        prompt = PROMPT + `\n\nOJO: este PDF es SOLO el tramo de las páginas ${range[0]} a ${range[1]} de un documento de ${totalPages} páginas. Numerá las marcas con la página real del documento completo: la primera página de este archivo es la "--- pág. ${range[0]} ---", la última la "--- pág. ${range[1]} ---". No arranques en pág. 1.`;
      } else {
        bytes = readFileSync(pdfPath);
      }
      let chunkOk = false;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const res = await streamMessage(bytes, apiKey, timeoutMs, prompt);
        if (res.ok) {
          if (!res.text) {
            // Sin texto y sin error HTTP -- lo más parecido a lo que hace Gemini con RECITATION/SAFETY:
            // no es reintentable (va a rechazar lo mismo de nuevo), se anota y se sigue.
            lastErr = `Respuesta vacía, stop_reason=${res.stopReason ?? '?'}`;
            break;
          }
          if (res.stopReason === 'max_tokens') {
            // NUNCA guardar una transcripción cortada como si estuviera completa.
            lastErr = `Transcripción TRUNCADA por tope de salida (stop_reason=max_tokens)${range ? ` en el tramo ${range[0]}-${range[1]}` : ''}`;
            break;
          }
          text += (text ? '\n\n' : '') + res.text;
          usage.input_tokens += res.usage.input_tokens;
          usage.output_tokens += res.usage.output_tokens;
          chunkOk = true;
          break;
        }
        lastErr = res.status ? `HTTP ${res.status}: ${res.error}` : res.error;
        const retryable = res.status === 429 || res.status >= 500 || /Error de red|Timeout/.test(res.error || '');
        if (retryable && attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
          continue;
        }
        break;
      }
      if (!chunkOk) { text = null; break; }
    }
  } finally {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
  }

  if (text) {
    const elapsedMs = Date.now() - t0;
    writeFileSync(mdPath, text, 'utf8');
    const costUsd = (usage.input_tokens / 1e6) * PRICE_IN_PER_MTOK + (usage.output_tokens / 1e6) * PRICE_OUT_PER_MTOK;
    const fidelidad = checkFidelidad(mdPath);
    const fidelidadP1 = fidelidad ? fidelidad.findings.filter((f) => f.sev === 'P1').length : null;
    const record = {
      ts: new Date().toISOString(),
      pdf: pdfPath.replace(projectRoot + '/', ''),
      md: mdPath.replace(projectRoot + '/', ''),
      model: MODEL,
      promptTokenCount: usage.input_tokens,
      candidatesTokenCount: usage.output_tokens,
      costUsd: Number(costUsd.toFixed(6)),
      elapsedMs,
      stopReason,
      chunks: ranges.length,
      fidelidadP1,
    };
    appendFileSync(resultsPath, JSON.stringify(record) + '\n', 'utf8');
    return { ok: true, record };
  }

  appendFileSync(
    failuresPath,
    JSON.stringify({ ts: new Date().toISOString(), pdf: pdfPath.replace(projectRoot + '/', ''), error: lastErr }) + '\n',
    'utf8'
  );
  return { ok: false, pdf: pdfPath, error: lastErr };
}

async function runPool(items, concurrency, worker) {
  let idx = 0;
  let active = 0;
  return new Promise((resolveAll) => {
    function next() {
      if (idx >= items.length && active === 0) return resolveAll();
      while (active < concurrency && idx < items.length) {
        const item = items[idx++];
        active++;
        worker(item).finally(() => { active--; next(); });
      }
    }
    next();
  });
}

async function runBatch(pending, apiKey, concurrency, timeoutMs) {
  let ok = 0, fail = 0, cost = 0;
  await runPool(pending, concurrency, async (pdfPath) => {
    const res = await transcribeOne(pdfPath, apiKey, timeoutMs);
    if (res.skipped) return;
    if (res.ok) { ok++; cost += res.record.costUsd; console.log(`OK ${res.record.pdf} | costo=$${res.record.costUsd}`); }
    else { fail++; console.log(`FALLO ${pdfPath.replace(projectRoot + '/', '')}: ${res.error}`); }
  });
  console.log(`\n${ok} OK, ${fail} fallidos, costo total ~$${cost.toFixed(2)}`);
}

async function main() {
  const args = process.argv.slice(2);
  mkdirSync(dirname(envPath), { recursive: true });
  if (!existsSync(envPath)) {
    console.error(`No existe ${envPath.replace(projectRoot + '/', '')} -- creá el archivo con una línea "ANTHROPIC_API_KEY=..." (mismo formato que Admin/gemini/.env).`);
    process.exit(1);
  }
  const apiKey = readEnvKey();
  const concFlag = args.indexOf('--concurrency');
  const concurrency = concFlag >= 0 ? parseInt(args[concFlag + 1], 10) : 2;
  const timeoutFlag = args.indexOf('--timeout');
  const timeoutMs = timeoutFlag >= 0 ? parseInt(args[timeoutFlag + 1], 10) * 1000 : DEFAULT_TIMEOUT_MS;

  if (args.includes('--all')) {
    const dirFlag = args.indexOf('--dir');
    const dir = resolve(projectRoot, dirFlag >= 0 ? args[dirFlag + 1] : 'Clubes');
    const limitFlag = args.indexOf('--limit');
    const limit = limitFlag >= 0 ? parseInt(args[limitFlag + 1], 10) : Infinity;
    let pending = findPdfsSinTranscribir(dir);
    const total = pending.length;
    pending = pending.slice(0, limit);
    console.log(`${total} PDFs sin transcribir bajo ${dir.replace(projectRoot + '/', '')}, procesando ${pending.length} (concurrencia=${concurrency})`);
    await runBatch(pending, apiKey, concurrency, timeoutMs);
    return;
  }

  const pdfArg = args.find((a, idx) => !a.startsWith('--') && args[idx - 1] !== '--out-suffix');
  if (!pdfArg) {
    console.error('Uso: node tools/claude-api-transcribe.mjs "<archivo.pdf>" [--out-suffix -gemini-check]\n   o: node tools/claude-api-transcribe.mjs --all [--dir Clubes/Colombia] [--limit N] [--concurrency N]');
    process.exit(1);
  }
  const pdfPath = resolve(projectRoot, pdfArg);
  if (!existsSync(pdfPath)) {
    console.error(`No existe: ${pdfPath}`);
    process.exit(1);
  }
  const suffixFlag = args.indexOf('--out-suffix');
  const outSuffix = suffixFlag >= 0 ? args[suffixFlag + 1] : '';
  const res = await transcribeOne(pdfPath, apiKey, timeoutMs, { outSuffix });
  if (res.skipped) {
    console.error('Ya existe el .md -- no lo piso.');
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`Claude API error: ${res.error}`);
    process.exit(1);
  }
  const r = res.record;
  console.log(`OK ${r.pdf} -> ${r.md} | in=${r.promptTokenCount} out=${r.candidatesTokenCount} costo=$${r.costUsd} tiempo=${r.elapsedMs}ms stop=${r.stopReason}`);
  if (r.fidelidadP1) console.log(`FIDELIDAD: ${r.fidelidadP1} hallazgo(s) P1 -- correr node tools/check-transcripcion-fidelidad.js "${r.md}" para el detalle antes de onboardear.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
