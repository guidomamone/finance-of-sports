#!/usr/bin/env node
// Transcribe PDFs a .md usando Gemini directo (multimodal, sin Tesseract/pdftotext previo -- ese es
// el punto: la API lee el PDF nativamente). Nace del test de costo del to-do 66 (ver
// Admin/Archive/test-costo-transcripcion.md) -- promovido a herramienta permanente porque el resultado salió
// 10/10 en la verificación, más barato y más rápido que transcribir con un subagente de Claude.
//
// Uso individual: node tools/gemini-transcribe.mjs "Clubes/Colombia/Alianza FC/estados-financieros-2016.pdf"
// Uso en lote (busca TODOS los PDF sin .md bajo Clubes/, sin que haya que tipear ninguna ruta):
//   node tools/gemini-transcribe.mjs --all
//   node tools/gemini-transcribe.mjs --all --limit 1000
//   node tools/gemini-transcribe.mjs --all --dir Clubes/Colombia --concurrency 3
// Segunda pasada (SOLO los que mistral-ocr-transcribe.mjs marcó como escaneados y todavía no se
// re-hicieron con Gemini -- pisa esa transcripción de Mistral, no la deja al lado):
//   node tools/gemini-transcribe.mjs --redo-mistral-scanned
// Reporte (no llama a ninguna API): qué PDFs pasaron por Mistral Y por Gemini y ninguno de los dos
// terminó con un .md -- son los que le pedís a Guido que le pida a Claude que haga a mano:
//   node tools/gemini-transcribe.mjs --pendientes-claude
//
// Corre entero desde tu propia terminal: no necesita ninguna sesión de Claude Code para nada, así que
// no consume tokens de Claude sea 1 PDF o sean 2000 -- ver la sección de esto en Admin/Archive/test-costo-transcripcion.md.

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, basename, extname, join } from 'node:path';
import { derivado, ubicar } from './rutas.mjs';
import { execFileSync } from 'node:child_process';

const MISTRAL_SCANNED_MARKER = 'ESCANEADO, TRANSCRIPTO CON MISTRAL OCR';
const mistralResultsPath = resolve(import.meta.dirname, '..', 'Admin', 'mistral', 'resultados.jsonl');

function findMistralScannedNotYetRedone() {
  if (!existsSync(mistralResultsPath)) return [];
  const lines = readFileSync(mistralResultsPath, 'utf8').split('\n').filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const line of lines) {
    let rec;
    try { rec = JSON.parse(line); } catch { continue; }
    if (!rec.scanned || !rec.pdf || seen.has(rec.pdf)) continue;
    seen.add(rec.pdf);
    const abs = resolve(import.meta.dirname, '..', rec.pdf);
    if (!existsSync(abs)) continue;
    const md = abs.slice(0, -4) + '.md';
    // Si el .md ya no tiene la advertencia de Mistral, ya se re-hizo (con Gemini u otra cosa) --
    // no lo toques de nuevo. Esto es lo que hace que correr este comando dos veces sea seguro.
    if (existsSync(md) && !readFileSync(md, 'utf8').startsWith(`> **⚠️ ${MISTRAL_SCANNED_MARKER}`)) continue;
    out.push(abs);
  }
  return out.sort();
}

const mistralFailuresPath = resolve(import.meta.dirname, '..', 'Admin', 'mistral', 'fallidos.jsonl');

function findPendientesClaude() {
  const geminiFailuresPath = resolve(import.meta.dirname, '..', 'Admin', 'gemini', 'fallidos.jsonl');
  const seen = new Set();
  for (const p of [mistralFailuresPath, geminiFailuresPath]) {
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split('\n').filter(Boolean)) {
      let rec;
      try { rec = JSON.parse(line); } catch { continue; }
      if (rec.pdf) seen.add(rec.pdf);
    }
  }
  const out = [];
  for (const rel of seen) {
    const abs = resolve(import.meta.dirname, '..', rel);
    // Si ya tiene .md es que un reintento posterior (a mano o de otra corrida) funcionó -- no es
    // pendiente. Este chequeo es lo que hace confiable correr esto en cualquier momento: no importa
    // guardar "se resolvió" en ningún lado, el estado real es si el .md existe o no.
    if (existsSync(abs) && !existsSync(abs.slice(0, -4) + '.md')) out.push(rel);
  }
  return out.sort();
}

const MODEL = 'gemini-3.8-flash';
const PRICE_IN_PER_MTOK = 0.75;
const PRICE_OUT_PER_MTOK = 3.75;
const MAX_RETRIES = 4;
const DEFAULT_TIMEOUT_MS = 150_000; // 150s -- un documento normal tarda 15-110s; más que eso, mejor cortar y anotarlo como fallo en vez de esperar varios minutos por uno solo.

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, 'Admin', 'gemini', '.env');
const resultsPath = resolve(projectRoot, 'Admin', 'gemini', 'resultados.jsonl');
const failuresPath = resolve(projectRoot, 'Admin', 'gemini', 'fallidos.jsonl');
const fidelidadScript = resolve(projectRoot, 'tools', 'check-transcripcion-fidelidad.js');

// Corre tools/check-transcripcion-fidelidad.js (to-do 90) sobre el .md recién escrito. A diferencia
// de Mistral (motor de extracción), Gemini SÍ es un modelo de chat -- el mismo tipo de modelo que
// produjo los placeholders en inglés del test de costo de Haiku (Admin/Archive/test-costo-transcripcion.md,
// to-do 71) -- así que acá el chequeo tiene más chance real de encontrar algo, no es solo una
// formalidad. No bloquea la transcripción si encuentra algo (ni si el chequeo mismo falla): solo
// avisa, para revisar antes de onboardear.
function checkFidelidad(mdPath) {
  try {
    const out = execFileSync(process.execPath, [fidelidadScript, mdPath, '--json'], { encoding: 'utf8' });
    return JSON.parse(out);
  } catch (err) {
    if (err.stdout) { try { return JSON.parse(err.stdout); } catch { /* sigue abajo */ } }
    return null; // el chequeo mismo falló (pdfinfo ausente, etc.) -- no bloquear la transcripción por esto
  }
}

function readEnvKey() {
  const raw = readFileSync(envPath, 'utf8');
  const line = raw.split('\n').find((l) => l.startsWith('GEMINI_API_KEY='));
  if (!line) throw new Error(`No encontré GEMINI_API_KEY en ${envPath}`);
  return line.slice('GEMINI_API_KEY='.length).trim();
}

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
      if (st.isDirectory()) {
        walk(full);
      } else if (/\.pdf$/i.test(entry)) {
        const md = full.slice(0, -4) + '.md';
        if (!existsSync(md)) out.push(full);
      }
    }
  }
  walk(startDir);
  return out.sort();
}

async function transcribeOne(pdfPath, apiKey, timeoutMs = DEFAULT_TIMEOUT_MS, opts = {}) {
  // `opts.outSuffix` (mismo patrón que ya tiene mistral-ocr-transcribe.mjs): escribe a un archivo
  // aparte en vez de al `.md` canónico -- lo usa tools/onboard.mjs para transcribir con Gemini EN
  // PARALELO a Mistral (no como redo de un escaneo), sin pisar el .md de Mistral, así
  // compare-transcripts.mjs puede comparar los dos.
  const outSuffix = opts.outSuffix || '';
  // Versión 317: con --out-suffix (una segunda voz, un rehacer, un test) el .md es un DERIVADO y va a Generados/ (tools/rutas.mjs); sin
  // sufijo es LA transcripción del documento y queda al lado del PDF, en Clubes/.
  const mdPath = outSuffix ? derivado(pdfPath, outSuffix + '.md') : resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
  // `opts.redo`: --redo-mistral-scanned SÍ quiere pisar un .md que ya existe (el de Mistral).
  // BUG REAL, 2026-09-28: la versión anterior de este flag borraba TODOS los .md del lote entero
  // ANTES de arrancar a procesarlos uno por uno -- si la corrida se cortaba a mitad de camino
  // (cerrar la terminal, Ctrl+C), quedaban cientos de archivos borrados y sin reemplazo, el
  // trabajo de Mistral ya hecho perdido de verdad (recuperado a mano con `git restore` porque
  // no había commit de por medio, pero no iba a haber red de seguridad la próxima vez). El fix:
  // NO se borra nada por adelantado. Acá abajo directamente no se saltea por `existsSync`, y
  // `writeFileSync()` (más abajo) ya pisa el archivo solo -- no hace falta un `unlinkSync`
  // previo. Si esta llamada puntual falla o se corta, el .md de Mistral sigue intacto: recién se
  // pierde en el mismo instante en que se reemplaza por uno bueno.
  if (existsSync(mdPath) && !opts.redo) {
    return { skipped: true, pdf: pdfPath };
  }

  const pdfBytes = readFileSync(pdfPath);
  const base64 = pdfBytes.toString('base64');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [
      {
        parts: [
          { inline_data: { mime_type: 'application/pdf', data: base64 } },
          { text: PROMPT },
        ],
      },
    ],
  };

  let lastErr;
  const t0 = Date.now();
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let resp;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (networkErr) {
      // Falla de red (DNS, conexión cortada) o timeout (el `AbortController` de arriba corta la
      // espera a los `timeoutMs`, en vez de dejar que un documento colgado tape el resto del lote
      // varios minutos) -- ambos son transitorios, reintenta con backoff igual que un 429/500.
      const isTimeout = networkErr.name === 'AbortError';
      lastErr = isTimeout ? `Timeout tras ${(timeoutMs / 1000).toFixed(0)}s` : `Error de red: ${networkErr.message}`;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
        continue;
      }
      break;
    } finally {
      clearTimeout(timer);
    }
    if (resp.ok) {
      const elapsedMs = Date.now() - t0;
      const json = await resp.json();
      const candidate = json.candidates?.[0];
      const text = candidate?.content?.parts?.map((p) => p.text).filter(Boolean).join('') ?? '';
      if (!text) {
        // Respuesta vacía (bloqueo de seguridad como RECITATION/SAFETY, u otra forma inesperada) --
        // no es reintentable (Gemini va a rechazar lo mismo de nuevo), así que se anota como fallo y
        // se sigue con el resto del lote en vez de tirar abajo todo el proceso.
        lastErr = `Respuesta vacía, finishReason=${candidate?.finishReason ?? '?'}: ${candidate?.finishMessage ?? JSON.stringify(json).slice(0, 300)}`;
        break;
      }

      writeFileSync(mdPath, text, 'utf8');

      const usage = json.usageMetadata ?? {};
      const inTok = usage.promptTokenCount ?? 0;
      const outTok = usage.candidatesTokenCount ?? 0;
      const totalTok = usage.totalTokenCount ?? inTok + outTok;
      const costUsd = (inTok / 1e6) * PRICE_IN_PER_MTOK + (outTok / 1e6) * PRICE_OUT_PER_MTOK;
      const fidelidad = checkFidelidad(mdPath);
      const fidelidadP1 = fidelidad ? fidelidad.findings.filter((f) => f.sev === 'P1').length : null;

      const record = {
        ts: new Date().toISOString(),
        pdf: pdfPath.replace(projectRoot + '/', ''),
        md: mdPath.replace(projectRoot + '/', ''),
        model: MODEL,
        promptTokenCount: inTok,
        candidatesTokenCount: outTok,
        totalTokenCount: totalTok,
        costUsd: Number(costUsd.toFixed(6)),
        elapsedMs,
        finishReason: candidate?.finishReason ?? null,
        fidelidadP1,
      };
      appendFileSync(resultsPath, JSON.stringify(record) + '\n', 'utf8');
      return { ok: true, record };
    }

    lastErr = `HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`;
    if (resp.status === 429 || resp.status >= 500) {
      const backoffMs = 2000 * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, backoffMs));
      continue;
    }
    break; // error no reintentable (400, key inválida, etc.)
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
        worker(item).finally(() => {
          active--;
          next();
        });
      }
    }
    next();
  });
}

async function runBatch(pending, apiKey, concurrency, timeoutMs, opts = {}) {
  let ok = 0, fail = 0, cost = 0, fidelidadAlertas = 0;
  const startAll = Date.now();
  await runPool(pending, concurrency, async (pdfPath) => {
    // Red de seguridad: pase lo que pase con este PDF puntual (error de red, PDF corrupto,
    // bloqueo de Gemini, lo que sea), un fallo NUNCA debe tirar abajo el resto del lote --
    // se anota y se sigue, para que una corrida de 1000 no se corte por el documento #300.
    let res;
    try {
      res = await transcribeOne(pdfPath, apiKey, timeoutMs, opts);
    } catch (err) {
      res = { ok: false, pdf: pdfPath, error: String(err?.message ?? err) };
      appendFileSync(
        failuresPath,
        JSON.stringify({ ts: new Date().toISOString(), pdf: pdfPath.replace(projectRoot + '/', ''), error: res.error }) + '\n',
        'utf8'
      );
    }
    if (res.ok) {
      ok++;
      cost += res.record.costUsd;
      const fTag = res.record.fidelidadP1 ? ` [FIDELIDAD: ${res.record.fidelidadP1} hallazgo(s) P1 -- ver check-transcripcion-fidelidad.js]` : '';
      if (res.record.fidelidadP1) fidelidadAlertas++;
      console.log(`OK  (${ok + fail}/${pending.length}) ${res.record.pdf} costo=$${res.record.costUsd} t=${(res.record.elapsedMs / 1000).toFixed(1)}s${fTag}`);
    } else if (res.skipped) {
      // ya tenía .md, no cuenta
    } else {
      fail++;
      console.error(`FAIL (${ok + fail}/${pending.length}) ${pdfPath.replace(projectRoot + '/', '')}: ${res.error}`);
    }
  });
  const totalMin = (Date.now() - startAll) / 60000;
  console.log(`\nListo: ${ok} OK, ${fail} fallidos, costo total ~$${cost.toFixed(2)}, ${totalMin.toFixed(1)} min.`);
  if (fail > 0) console.log(`Ver detalle de fallos en ${failuresPath.replace(projectRoot + '/', '')} -- volvé a correr el mismo comando para reintentarlos (se saltea lo que ya tiene .md).`);
  if (fidelidadAlertas > 0) console.log(`${fidelidadAlertas} transcripción(es) con hallazgos P1 de tools/check-transcripcion-fidelidad.js -- correlo de nuevo sobre esos archivos puntuales antes de onboardearlos.`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--pendientes-claude')) {
    const pending = findPendientesClaude();
    console.log(`${pending.length} PDFs que pasaron por Mistral y por Gemini y ninguno de los dos generó .md:\n`);
    for (const p of pending) console.log(p);
    if (pending.length > 0) console.log(`\nSon los que le pedís a Claude que haga a mano (Tesseract si hace falta) -- ver CLAUDE.md, tercer nivel del pipeline.`);
    return;
  }

  const apiKey = readEnvKey();
  const concFlag = args.indexOf('--concurrency');
  const concurrency = concFlag >= 0 ? parseInt(args[concFlag + 1], 10) : 2;
  const timeoutFlag = args.indexOf('--timeout');
  const timeoutMs = timeoutFlag >= 0 ? parseInt(args[timeoutFlag + 1], 10) * 1000 : DEFAULT_TIMEOUT_MS;

  if (args.includes('--redo-mistral-scanned')) {
    const pending = findMistralScannedNotYetRedone();
    console.log(`${pending.length} PDFs marcados como escaneados por Mistral y sin re-hacer todavía, procesando con Gemini (concurrencia=${concurrency})`);
    // NO se borra nada acá (ver el comentario de `transcribeOne`, `opts.redo`): cada .md de
    // Mistral se pisa recién cuando Gemini termina bien ESE archivo puntual, uno por uno. Cortar
    // la corrida a la mitad deja a medio hacer, nunca deja a medio BORRAR.
    await runBatch(pending, apiKey, concurrency, timeoutMs, { redo: true });
    return;
  }

  if (args.includes('--all')) {
    const dirFlag = args.indexOf('--dir');
    const dir = resolve(projectRoot, dirFlag >= 0 ? args[dirFlag + 1] : 'Clubes');
    const limitFlag = args.indexOf('--limit');
    const limit = limitFlag >= 0 ? parseInt(args[limitFlag + 1], 10) : Infinity;

    let pending = findPdfsSinTranscribir(dir);
    const total = pending.length;
    pending = pending.slice(0, limit);
    console.log(`${total} PDFs sin transcribir bajo ${dir.replace(projectRoot + '/', '')}, procesando ${pending.length} (concurrencia=${concurrency}, timeout=${timeoutMs / 1000}s)`);
    await runBatch(pending, apiKey, concurrency, timeoutMs);
    return;
  }

  const pdfArg = args.find((a, idx) => !a.startsWith('--') && args[idx - 1] !== '--out-suffix');
  if (!pdfArg) {
    console.error('Uso: node tools/gemini-transcribe.mjs <ruta-al-pdf> [--out-suffix -gemini-check]\n   o: node tools/gemini-transcribe.mjs --all [--dir Clubes/Colombia] [--limit 1000] [--concurrency 2] [--timeout 150]\n   o: node tools/gemini-transcribe.mjs --redo-mistral-scanned\n   o: node tools/gemini-transcribe.mjs --pendientes-claude');
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
    console.error(`Ya existe el .md -- no lo piso. Borralo a mano si querés re-correr.`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`Gemini API error: ${res.error}`);
    process.exit(1);
  }
  const r = res.record;
  console.log(`OK ${r.pdf} -> ${r.md} | in=${r.promptTokenCount} out=${r.candidatesTokenCount} costo=$${r.costUsd} tiempo=${r.elapsedMs}ms finish=${r.finishReason}`);
  if (r.fidelidadP1) console.log(`FIDELIDAD: ${r.fidelidadP1} hallazgo(s) P1 -- correr node tools/check-transcripcion-fidelidad.js "${r.md}" para el detalle antes de onboardear.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
