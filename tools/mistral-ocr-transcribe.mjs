#!/usr/bin/env node
// Transcribe PDFs a .md usando Mistral OCR (motor de extracción de documentos, no un chat genérico --
// por eso no tiene el filtro de "RECITATION" que bloquea ~26% de los documentos con Gemini, ver
// Admin/gemini/fallidos.jsonl). DEFAULT del pipeline desde la Versión 244 (ver CLAUDE.md, "Cada PDF
// nuevo"): corré esto primero con --all; gemini-transcribe.mjs --redo-mistral-scanned es la SEGUNDA
// pasada, para lo que esto marque como escaneo. `--retry-gemini-failures` de acá abajo es un camino
// de recuperación aparte (para un lote que corrió Gemini primero y quedó con rechazos RECITATION),
// no el flujo normal.
//
// Uso individual: node tools/mistral-ocr-transcribe.mjs "Clubes/Colombia/Alianza FC/estados-financieros-2016.pdf"
// Uso en lote (todos los PDF sin .md bajo Clubes/):
//   node tools/mistral-ocr-transcribe.mjs --all [--dir Clubes/Colombia] [--limit 1000] [--concurrency 2]
// Recuperación (SOLO los que Gemini rechazó por RECITATION, leyendo Admin/gemini/fallidos.jsonl):
//   node tools/mistral-ocr-transcribe.mjs --retry-gemini-failures
//
// Corre entero desde tu propia terminal, sin sesión de Claude Code: 0 tokens de Claude.
// Necesita Admin/mistral/.env con MISTRAL_API_KEY=... (gitignoreado, mismo criterio que Gemini/Resend).

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename, extname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const MODEL = 'mistral-ocr-latest';
const PRICE_PER_1000_PAGES = 4.0;
const MAX_RETRIES = 4;
const DEFAULT_TIMEOUT_MS = 150_000;

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, 'Admin', 'mistral', '.env');
const resultsPath = resolve(projectRoot, 'Admin', 'mistral', 'resultados.jsonl');
const failuresPath = resolve(projectRoot, 'Admin', 'mistral', 'fallidos.jsonl');
const geminiFailuresPath = resolve(projectRoot, 'Admin', 'gemini', 'fallidos.jsonl');
const fidelidadScript = resolve(projectRoot, 'tools', 'check-transcripcion-fidelidad.js');

// Corre tools/check-transcripcion-fidelidad.js (to-do 90) sobre el .md recién escrito -- placeholders
// de contenido en inglés (Mistral es un motor de extracción, no un chat, así que esto no debería
// pasar nunca acá, pero el chequeo es tan barato que no hay motivo para no correrlo igual, gratis) y
// huecos de página. No bloquea la transcripción si encuentra algo (ni si el chequeo mismo falla) --
// solo avisa, para que quien corre el lote sepa qué revisar antes de onboardear.
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
  const line = raw.split('\n').find((l) => l.startsWith('MISTRAL_API_KEY='));
  if (!line) throw new Error(`No encontré MISTRAL_API_KEY en ${envPath}`);
  return line.slice('MISTRAL_API_KEY='.length).trim();
}

function isScanned(pdfPath) {
  // Mismo chequeo que ya usa el proyecto para decidir OCR (CLAUDE.md, "Cada PDF nuevo"): si
  // pdftotext no devuelve texto real de las primeras páginas, es un escaneo. Barato (recorta a 2
  // páginas) -- sirve para marcar en la salida cuáles conviene revisar con más cuidado, dado que
  // el único fallo de calidad real que encontramos con Mistral fue en un escaneo rotado/dañado.
  try {
    const out = execFileSync('pdftotext', ['-l', '2', pdfPath, '-'], { encoding: 'utf8', timeout: 15_000 });
    return out.trim().length < 40; // umbral bajo: un PDF con texto real trae mucho más que eso en 2 páginas
  } catch {
    return true; // si pdftotext falla (o no está instalado), tratarlo como "no confirmado texto real"
  }
}

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

function readGeminiFailures() {
  if (!existsSync(geminiFailuresPath)) return [];
  const lines = readFileSync(geminiFailuresPath, 'utf8').split('\n').filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const line of lines) {
    let rec;
    try { rec = JSON.parse(line); } catch { continue; }
    if (!rec.pdf || seen.has(rec.pdf)) continue;
    seen.add(rec.pdf);
    const abs = resolve(projectRoot, rec.pdf);
    const md = abs.slice(0, -4) + '.md';
    if (existsSync(abs) && !existsSync(md)) out.push(abs);
  }
  return out.sort();
}

const SCANNED_WARNING = `> **⚠️ ESCANEADO, TRANSCRIPTO CON MISTRAL OCR (ver Admin/test-costo-transcripcion.md).** El único
> error de calidad real que encontramos en el test de comparación fue justo en un documento así: en
> celdas dañadas/tapadas/rotadas, Mistral no avisa que no está seguro -- devuelve un número con la
> misma confianza que uno bien leído. Antes de usar este archivo para cargar datos al sitio,
> verificá a mano contra el PDF cualquier cifra que use (no alcanza con que el tie-out cierre, un
> total mal leído puede colar igual si no hay una fuente independiente para comparar). Borrar esta
> nota una vez verificado.

`;

import { diagnosticar, limpiar as limpiarCopia } from './reparar-pdf.mjs';

async function transcribeOne(pdfPath, apiKey, timeoutMs = DEFAULT_TIMEOUT_MS, outSuffix = '', scannedFlag = false) {
  // outSuffix sirve para tests de comparación (ej. "-mistral-test"): escribe a un archivo aparte en
  // vez de al `.md` canónico, así se puede correr sobre un PDF que YA tiene transcripción (de otra
  // pata) sin pisarla, para comparar los dos resultados lado a lado.
  const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + outSuffix + '.md');
  if (existsSync(mdPath)) return { skipped: true, pdf: pdfPath };

  // Antes de gastar una llamada: si el PDF está dañado se repara (qpdf) y si tiene una imagen gigante que Mistral rechaza (Thun, 128x105696 px)
  // esas páginas se rasterizan en una copia. Si es irrecuperable (truncado, HTML) se devuelve un error claro en vez de un HTTP 400 críptico.
  const diag = diagnosticar(pdfPath, { reparar: true });
  if (diag.estado === 'truncado' || diag.estado === 'no-es-pdf') {
    return { ok: false, pdf: pdfPath, error: `PDF-${diag.estado.toUpperCase()}: ${diag.motivo}${diag.fuente ? ` -- volver a bajarlo: ${diag.fuente}` : ''}` };
  }
  const pdfBytes = readFileSync(diag.usable || pdfPath);
  limpiarCopia(diag.usable, pdfPath);
  const base64 = pdfBytes.toString('base64');
  const url = 'https://api.mistral.ai/v1/ocr';
  const body = {
    model: MODEL,
    document: {
      type: 'document_url',
      document_url: `data:application/pdf;base64,${base64}`,
    },
    table_format: 'markdown',
  };

  let lastErr;
  const t0 = Date.now();
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let resp, json;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      // OJO: el timeout de arriba solo cubre hasta que llegan los headers -- `fetch()` puede resolver
      // sin que el cuerpo de la respuesta haya terminado de llegar. Por eso `resp.json()` va DENTRO
      // del mismo try, con el mismo `signal`, para que un cuerpo que se cuelga a mitad de camino
      // también aborte a los `timeoutMs` en vez de colgar el proceso entero sin límite (bug real,
      // encontrado en el test de comparación del 2026-09-26: un solo documento colgó >15 minutos).
      if (resp.ok) json = await resp.json();
    } catch (networkErr) {
      const isTimeout = networkErr.name === 'AbortError';
      lastErr = isTimeout ? `Timeout tras ${(timeoutMs / 1000).toFixed(0)}s` : `Error de red: ${networkErr.message}`;
      clearTimeout(timer);
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
        continue;
      }
      break;
    }
    clearTimeout(timer);

    if (resp.ok) {
      const elapsedMs = Date.now() - t0;
      const pages = json.pages ?? [];
      if (pages.length === 0) {
        lastErr = `Respuesta sin páginas: ${JSON.stringify(json).slice(0, 300)}`;
        break;
      }

      // El `markdown` de cada página trae las tablas como un link-placeholder (ej. "[tbl-0.md](tbl-0.md)")
      // en vez del contenido -- el contenido real vive aparte, en `page.tables[]` (cada una con `id` +
      // `content`). Hay que resolver esos placeholders antes de guardar, si no el .md queda con links
      // rotos y CERO cifras (bug real, encontrado en el test de comparación del 2026-09-26: sin este
      // fix, el chequeo automático no encontraba ninguna cifra porque literalmente no estaban).
      function resolveTables(page) {
        let md = page.markdown ?? '';
        for (const t of page.tables ?? []) {
          const placeholder = `[${t.id}](${t.id})`;
          md = md.split(placeholder).join(t.content ?? '');
        }
        return md;
      }

      const text = pages
        .map((p, i) => `--- pág. ${(p.index ?? i) + 1} ---\n\n${resolveTables(p)}`)
        .join('\n\n');
      writeFileSync(mdPath, (scannedFlag ? SCANNED_WARNING : '') + text, 'utf8');

      const pagesProcessed = json.usage_info?.pages_processed ?? pages.length;
      const costUsd = (pagesProcessed / 1000) * PRICE_PER_1000_PAGES;
      const fidelidad = checkFidelidad(mdPath);
      const fidelidadP1 = fidelidad ? fidelidad.findings.filter((f) => f.sev === 'P1').length : null;

      const record = {
        ts: new Date().toISOString(),
        pdf: pdfPath.replace(projectRoot + '/', ''),
        md: mdPath.replace(projectRoot + '/', ''),
        model: MODEL,
        scanned: scannedFlag,
        pagesProcessed,
        costUsd: Number(costUsd.toFixed(6)),
        elapsedMs,
        fidelidadP1,
      };
      appendFileSync(resultsPath, JSON.stringify(record) + '\n', 'utf8');
      return { ok: true, record };
    }

    const retryAfterHeader = resp.headers.get('retry-after');
    lastErr = `HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`;
    if (resp.status === 429 || resp.status >= 500) {
      if (attempt >= MAX_RETRIES) break;
      // Un 429 real de "cuota agotada" no se arregla esperando 2-30s como una falla de red transitoria
      // -- si el servidor manda Retry-After, se respeta; si no, un piso de 20s (contra los 2s de un
      // error de red) para no reintentar en caliente contra un rate limit que puede tardar en liberar.
      const waitMs = retryAfterHeader ? parseInt(retryAfterHeader, 10) * 1000 : Math.max(20_000, 2000 * Math.pow(2, attempt));
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }
    break;
  }

  appendFileSync(
    failuresPath,
    JSON.stringify({ ts: new Date().toISOString(), pdf: pdfPath.replace(projectRoot + '/', ''), error: lastErr }) + '\n',
    'utf8'
  );
  return { ok: false, pdf: pdfPath, error: lastErr };
}

async function runPool(items, concurrency, worker) {
  let idx = 0, active = 0;
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
  let ok = 0, fail = 0, cost = 0, scanned = 0, fidelidadAlertas = 0;
  const startAll = Date.now();
  await runPool(pending, concurrency, async (pdfPath) => {
    const scannedFlag = isScanned(pdfPath);
    if (scannedFlag) scanned++;
    let res;
    try {
      res = await transcribeOne(pdfPath, apiKey, timeoutMs, '', scannedFlag);
    } catch (err) {
      res = { ok: false, pdf: pdfPath, error: String(err?.message ?? err) };
      appendFileSync(
        failuresPath,
        JSON.stringify({ ts: new Date().toISOString(), pdf: pdfPath.replace(projectRoot + '/', ''), error: res.error }) + '\n',
        'utf8'
      );
    }
    const tag = scannedFlag ? ' [ESCANEADO -- revisar cifras a mano]' : '';
    if (res.ok) {
      ok++;
      cost += res.record.costUsd;
      const fTag = res.record.fidelidadP1 ? ` [FIDELIDAD: ${res.record.fidelidadP1} hallazgo(s) P1 -- ver check-transcripcion-fidelidad.js]` : '';
      if (res.record.fidelidadP1) fidelidadAlertas++;
      console.log(`OK  (${ok + fail}/${pending.length}) ${res.record.pdf} costo=$${res.record.costUsd} t=${(res.record.elapsedMs / 1000).toFixed(1)}s${tag}${fTag}`);
    } else if (res.skipped) {
      // ya tenía .md
    } else {
      fail++;
      console.error(`FAIL (${ok + fail}/${pending.length}) ${pdfPath.replace(projectRoot + '/', '')}: ${res.error}${tag}`);
    }
  });
  const totalMin = (Date.now() - startAll) / 60000;
  console.log(`\nListo: ${ok} OK, ${fail} fallidos, costo total ~$${cost.toFixed(2)}, ${totalMin.toFixed(1)} min. (${scanned} de ${pending.length} eran escaneados -- revisá esos con más cuidado, ver Admin/test-costo-transcripcion.md sobre por qué)`);
  if (fail > 0) console.log(`Ver detalle de fallos en ${failuresPath.replace(projectRoot + '/', '')}.`);
  if (fidelidadAlertas > 0) console.log(`${fidelidadAlertas} transcripción(es) con hallazgos P1 de tools/check-transcripcion-fidelidad.js -- correlo de nuevo sobre esos archivos puntuales antes de onboardearlos.`);
}

async function main() {
  const args = process.argv.slice(2);
  mkdirSync(dirname(envPath), { recursive: true });
  const apiKey = readEnvKey();
  const concFlag = args.indexOf('--concurrency');
  const concurrency = concFlag >= 0 ? parseInt(args[concFlag + 1], 10) : 2;
  const timeoutFlag = args.indexOf('--timeout');
  const timeoutMs = timeoutFlag >= 0 ? parseInt(args[timeoutFlag + 1], 10) * 1000 : DEFAULT_TIMEOUT_MS;

  if (args.includes('--retry-gemini-failures')) {
    const pending = readGeminiFailures();
    console.log(`${pending.length} PDFs pendientes en Admin/gemini/fallidos.jsonl (sin .md todavía), procesando con Mistral OCR (concurrencia=${concurrency})`);
    await runBatch(pending, apiKey, concurrency, timeoutMs);
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

  const pdfArg = args[0];
  if (!pdfArg) {
    console.error('Uso: node tools/mistral-ocr-transcribe.mjs <ruta-al-pdf> [--out-suffix -mistral-test]\n   o: node tools/mistral-ocr-transcribe.mjs --all [--dir Clubes/Colombia] [--limit 1000] [--concurrency 2] [--timeout 150]\n   o: node tools/mistral-ocr-transcribe.mjs --retry-gemini-failures');
    process.exit(1);
  }
  const pdfPath = resolve(projectRoot, pdfArg);
  if (!existsSync(pdfPath)) {
    console.error(`No existe: ${pdfPath}`);
    process.exit(1);
  }
  const suffixFlag = args.indexOf('--out-suffix');
  const outSuffix = suffixFlag >= 0 ? args[suffixFlag + 1] : '';
  const res = await transcribeOne(pdfPath, apiKey, timeoutMs, outSuffix, isScanned(pdfPath));
  if (res.skipped) {
    console.error('Ya existe el .md -- no lo piso.');
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`Mistral OCR error: ${res.error}`);
    process.exit(1);
  }
  const r = res.record;
  console.log(`OK ${r.pdf} -> ${r.md} | páginas=${r.pagesProcessed} costo=$${r.costUsd} tiempo=${r.elapsedMs}ms`);
  if (r.fidelidadP1) console.log(`FIDELIDAD: ${r.fidelidadP1} hallazgo(s) P1 -- correr node tools/check-transcripcion-fidelidad.js "${r.md}" para el detalle antes de onboardear.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
