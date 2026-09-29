#!/usr/bin/env node
// ============================================================================
// tools/resolver-inventario.mjs — la fase PAGA que deja cada transcripción del inventario en estado
// "listo" (o explica por qué no puede). Trabaja sobre lo que tools/inventario-transcripciones.mjs
// dejó en revisar / pendiente-segunda-voz / sin-verificar / reintentar.
//
// IDEA CENTRAL (pedido de Guido, 2026-09-29, "MUST"): Claude NUNCA ve un documento entero si alcanza
// con ver unas páginas. Se detectan primero, gratis, las PÁGINAS con dudas comparando los números de
// cada página:
//   - PDF con texto seleccionable: los números de la página del .md contra los del texto de esa página
//     del PDF (pdftotext). Duda = el .md tiene un número que el PDF no tiene (lectura mal hecha).
//   - Escaneo (no hay texto en el PDF): los números de la página en dos transcripciones independientes
//     (la canónica contra la de Gemini). Duda = los conjuntos difieren.
// Solo esas páginas se mandan a Claude por API (recortadas con qpdf), y la página de Claude reemplaza a
// la canónica cuando corresponde. Una página en la que las tres voces discrepan queda marcada para
// revisión humana, no se adivina.
//
// FLUJO POR DOCUMENTO
//   PDF con texto:  páginas con dudas (gratis) -> Claude solo esas -> se reemplazan -> revalida
//                   con tools/verify-numbers.mjs -> listo / revisar.
//   Escaneo:        Gemini (todo el documento, barato) como segunda voz
//                     - Gemini rechaza por RECITATION -> Claude transcribe el documento entero como segunda voz
//                       y los desacuerdos se desempatan con Gemini página por página (una página sola
//                       suele pasar el filtro); si Gemini también rechaza esa página, gana Claude y la
//                       página queda anotada como "reserva" (solo una IA la validó: al onboardear, cerrar
//                       esa página con el chequeo de sumas).
//                     - Gemini responde -> páginas donde canónica y Gemini difieren -> Claude solo esas.
//   .md sin marcas de página (no se puede trabajar por página): se re-hace entero con Mistral.
//
// FALLOS POR CRÉDITO / LÍMITE (pedido de Guido: las APIs tienen recarga automática, pero un PDF o dos
// se rechazaron mientras entraba el pago): se distinguen de un rechazo PERMANENTE.
//   - crédito / cuota / límite de velocidad / servidor caído / timeout  -> se ESPERA y se reintenta el
//     MISMO motor (con espera creciente, para darle tiempo a la recarga). Nunca se pasa al motor
//     siguiente por esto: un motor sin crédito no es un motor que rechaza el documento.
//   - Si tras esperar sigue fallando, el documento queda en estado "reintentar" y la corrida SE DETIENE
//     si pasa 3 veces seguidas (para no marcar cientos de documentos por un problema de cuenta).
//     La próxima corrida los retoma solos.
//   - RECITATION (Gemini) es permanente para ese documento y sí pasa a Claude.
//
// COSTO: nada corre sin --ejecutar. Sin él, es un ensayo (--dry-run implícito) que no llama a ninguna
// API y estima el costo. Cada corrida real anota en Admin/transcripciones-verificaciones.jsonl qué se
// hizo, qué páginas reemplazó cada motor y cuánto costó.
//
// USO:
//   node tools/resolver-inventario.mjs --dir Clubes/Chile                 # ensayo: qué haría y cuánto costaría
//   node tools/resolver-inventario.mjs --dir Clubes/Chile --ejecutar
//   node tools/resolver-inventario.mjs --ejecutar --limit 20 --estado revisar
//   node tools/resolver-inventario.mjs --ejecutar --pdf "Clubes/Chile/X/estados-financieros-2022.pdf"
//   node tools/resolver-inventario.mjs --ejecutar --lista Admin/resolver-piloto.txt
//   node tools/resolver-inventario.mjs --ejecutar --concurrencia 3 --dir Clubes/Bélgica   # 3 documentos a la vez
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, copyFileSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { resolve, dirname, basename, join, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { AsyncLocalStorage } from 'node:async_hooks';
import { createHash } from 'node:crypto';
import { extractNumbers, verifyNumbers } from './verify-numbers.mjs';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const EXECUTE = args.includes('--ejecutar');
const dirFilter = flagVal('--dir');
const onlyPdf = flagVal('--pdf');
const listFile = flagVal('--lista'); // archivo con un PDF por línea (# = comentario)
const onlyList = listFile ? new Set(readFileSync(resolve(root, listFile), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))) : null;
const estadoFilter = flagVal('--estado');
const limit = flagVal('--limit') ? Number(flagVal('--limit')) : Infinity;
const concurrency = flagVal('--concurrencia') ? Number(flagVal('--concurrencia')) : 1;

const statePath = resolve(root, 'Admin', 'transcripciones-estado.jsonl');
const verifPath = resolve(root, 'Admin', 'transcripciones-verificaciones.jsonl');
const TOOL = { mistral: 'tools/mistral-ocr-transcribe.mjs', gemini: 'tools/gemini-transcribe.mjs', claude: 'tools/claude-api-transcribe.mjs' };
const LOGDIR = { mistral: 'mistral', gemini: 'gemini', claude: 'claude-api' };
const EST = { mistral: 0.004, gemini: 0.002, claude: 0.02 }; // USD por página, para el ensayo

// ---------------------------------------------------------------- utilidades
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);

function pageCount(pdf) {
  const m = execFileSync('pdfinfo', [pdf], { maxBuffer: 256 * 1024 * 1024 }).toString('latin1').match(/^Pages:\s+(\d+)/m);
  return m ? Number(m[1]) : 0;
}

// Texto de cada página del PDF (pdftotext separa páginas con \f).
function pdfPageTexts(pdf) {
  const buf = execFileSync('pdftotext', ['-layout', pdf, '-'], { maxBuffer: 512 * 1024 * 1024 });
  const parts = buf.toString('utf8').split('\f');
  if (parts.length && parts[parts.length - 1].trim() === '') parts.pop();
  return parts;
}

// Parte un .md en {pre, pages:[{n, body}]} por sus marcas "--- pág. N ---", sin perder ni un carácter.
function splitPages(text) {
  const re = /^--- pág\. (\d+) ---[ \t]*\r?\n?/gm;
  const marks = [...text.matchAll(re)];
  if (!marks.length) return { pre: text, pages: [] };
  const pages = marks.map((m, i) => ({ n: Number(m[1]), body: text.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : text.length) }));
  return { pre: text.slice(0, marks[0].index), pages };
}
const joinPages = (pre, pages) => pre + pages.map((p) => `--- pág. ${p.n} ---\n${p.body}`).join('');
const numsOf = (t) => extractNumbers(t);
const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

// ---------------------------------------------------------------- errores de motores
// Separa "el motor no pudo por un problema de cuenta o de red" (esperar y reintentar) de "el motor
// rechazó ESTE documento" (permanente). Las cadenas salen de los errores reales de cada API.
function classify(text) {
  const t = String(text || '');
  if (/RECITATION/i.test(t)) return 'recitation';
  if (/credit balance|insufficient|billing|quota|RESOURCE_EXHAUSTED|payment|exceeded your|HTTP 40[23]|permission_denied|out of credit|top up|spending limit|payment required/i.test(t)) return 'credito';
  if (/HTTP (429|5\d\d)|rate.?limit|overloaded|timeout|fetch failed|Error de red|ECONN|ETIMEDOUT|sin páginas|socket/i.test(t)) return 'transitorio';
  return 'otro';
}
// RESOLVER_BACKOFF_SCALE y RESOLVER_TOOL_<MOTOR> existen solo para PROBAR el manejo de fallos con un motor
// falso (ver Admin/CHANGELOG.md): con escala 0.01 las esperas de minutos duran centésimas de segundo.
const SCALE = Number(process.env.RESOLVER_BACKOFF_SCALE || 1);
const BACKOFF = { credito: [60, 180, 300, 600, 900].map((x) => x * SCALE), transitorio: [20, 60, 120, 240].map((x) => x * SCALE) };
class StopRun extends Error {}
let consecutiveAccountFailures = 0;

// Costo real de UNA llamada: las tools anotan en su log el "md" que escribieron (ruta relativa al proyecto,
// o absoluta si está fuera). Con documentos en paralelo no se puede contar "líneas nuevas del log", se busca por ese md.
function costOfCall(engine, outAbs, sinceTs) {
  const rel = outAbs.startsWith(root + '/') ? outAbs.slice(root.length + 1) : outAbs;
  return readJsonl(resolve(root, 'Admin', LOGDIR[engine], 'resultados.jsonl')).filter((r) => r.md === rel && r.ts >= sinceTs).reduce((a, r) => a + (r.costUsd || 0), 0);
}

const docCost = new AsyncLocalStorage(); // acumulador de costo del documento que se está resolviendo
let runCost = 0;
const addCost = (c) => { runCost += c; const st = docCost.getStore(); if (st) st.cost += c; };

function runTool(scriptPath, argv, timeoutMs) {
  return new Promise((resolveP) => {
    const child = spawn('node', [scriptPath, ...argv], { cwd: root });
    let buf = '';
    const cap = (d) => { buf += d.toString(); if (buf.length > 20000) buf = buf.slice(-10000); };
    child.stdout.on('data', cap); child.stderr.on('data', cap);
    const timer = setTimeout(() => { child.kill('SIGKILL'); buf += '\nTimeout del proceso'; }, timeoutMs);
    child.on('close', () => { clearTimeout(timer); resolveP(buf); });
    child.on('error', (err) => { clearTimeout(timer); resolveP(`Error de red/proceso: ${err.message}`); });
  });
}

// Llama a UNA tool de transcripción sobre UN PDF, con la política de reintentos de arriba.
// Devuelve { ok, path } | { ok:false, kind:'recitation'|'otro'|'agotado', text }. Puede tirar StopRun.
async function callEngine(engine, pdfAbs, suffix) {
  const out = resolve(dirname(pdfAbs), basename(pdfAbs, '.pdf') + suffix + '.md');
  if (existsSync(out)) return { ok: true, path: out, reused: true };
  const attempts = { credito: 0, transitorio: 0 };
  for (;;) {
    const t0 = new Date().toISOString();
    const output = await runTool(process.env[`RESOLVER_TOOL_${engine.toUpperCase()}`] || resolve(root, TOOL[engine]), [pdfAbs, '--out-suffix', suffix], 25 * 60 * 1000);
    addCost(costOfCall(engine, out, t0));
    if (existsSync(out)) { consecutiveAccountFailures = 0; return { ok: true, path: out }; }
    const text = output.trim().split('\n').slice(-4).join(' | ').slice(0, 400);
    const kind = classify(text);
    if (kind === 'recitation' || kind === 'otro') return { ok: false, kind, text };
    const waits = BACKOFF[kind];
    if (attempts[kind] >= waits.length) {
      if (kind === 'credito') { consecutiveAccountFailures++; if (consecutiveAccountFailures >= 3) throw new StopRun(`3 documentos seguidos fallaron por crédito/cuenta en ${engine}: ${text}`); }
      return { ok: false, kind: 'agotado', text: `${engine}: ${kind} persistente. ${text}` };
    }
    const wait = waits[attempts[kind]++];
    console.log(`    ${engine}: ${kind} (${text.slice(0, 90)}) -- espero ${Math.round(wait)}s y reintento (${attempts[kind]}/${waits.length})`);
    await sleep(wait);
  }
}

// qpdf devuelve 3 cuando el resultado es válido pero el PDF de origen tenía advertencias: es un ÉXITO
// (BUG REAL del segundo piloto: Aalesund y Williams se marcaban como fallo por esto).
function qpdfExtract(src, pagesSpec, out) {
  const r = spawnSync('qpdf', [src, '--pages', '.', pagesSpec, '--', out]);
  if ((r.status !== 0 && r.status !== 3) || !existsSync(out)) throw new Error(`qpdf falló (código ${r.status}) extrayendo ${pagesSpec}: ${String(r.stderr || '').slice(0, 200)}`);
}

// Las APIs rechazan pedidos de más de ~32 MB (el PDF va en base64, +33%). Se agrupan las páginas pedidas en
// lotes que, ya recortados, pesen menos de esto (BUG REAL del segundo piloto: Temperley, PDF de 34,7 MB).
const MAX_BATCH_BYTES = 20 * 1024 * 1024;
function sizedBatches(pdfAbs, pageList, tmp, counter = { n: 0 }) {
  const file = join(tmp, `lote${counter.n++}.pdf`);
  qpdfExtract(pdfAbs, pageList.join(','), file);
  if (statSync(file).size <= MAX_BATCH_BYTES) return [{ pages: pageList, file }];
  if (pageList.length === 1) {
    // Una sola página que pesa más que el límite (Temperley pág. 25: 25 MB de imágenes). Se rasteriza a 130 dpi
    // (JPEG) y se re-empaqueta como PDF de una página: para leer cifras alcanza y pesa unos cientos de KB.
    const big = statSync(file).size;
    const jpgBase = join(tmp, `raster${counter.n++}`);
    const small = join(tmp, `raster${counter.n++}.pdf`);
    try {
      execFileSync('pdftoppm', ['-jpeg', '-jpegopt', 'quality=80', '-r', '130', '-f', String(pageList[0]), '-l', String(pageList[0]), '-singlefile', pdfAbs, jpgBase], { stdio: 'pipe' });
      execFileSync('python3', ['-c', 'import sys;from PIL import Image;Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2],"PDF",resolution=130)', jpgBase + '.jpg', small], { stdio: 'pipe' });
    } catch (err) {
      throw new Error(`la página ${pageList[0]} pesa ${(big / 1048576).toFixed(0)} MB sola y no pude reducirla: ${String(err.message).slice(0, 120)}`);
    }
    if (statSync(small).size > MAX_BATCH_BYTES) throw new Error(`la página ${pageList[0]} sigue pesando demasiado tras reducirla`);
    console.log(`    página ${pageList[0]}: ${(big / 1048576).toFixed(0)} MB -> ${(statSync(small).size / 1024).toFixed(0)} KB (rasterizada a 130 dpi)`);
    return [{ pages: pageList, file: small }];
  }
  const mid = Math.ceil(pageList.length / 2);
  return [...sizedBatches(pdfAbs, pageList.slice(0, mid), tmp, counter), ...sizedBatches(pdfAbs, pageList.slice(mid), tmp, counter)];
}

// Recorta páginas del PDF y las transcribe con un motor; devuelve Map<páginaReal, texto> o un error.
async function transcribePages(engine, pdfAbs, pageList) {
  const tmp = mkdtempSync(join(tmpdir(), 'resolver-'));
  try {
    let batches;
    try { batches = sizedBatches(pdfAbs, pageList, tmp); } catch (err) { return { ok: false, kind: 'otro', text: err.message }; }
    const map = new Map();
    for (const batch of batches) {
      const r = await callEngine(engine, batch.file, '');
      if (!r.ok) return { ok: false, kind: r.kind, text: r.text };
      const { pages } = splitPages(readFileSync(r.path, 'utf8'));
      if (pages.length !== batch.pages.length) return { ok: false, kind: 'otro', text: `${engine} devolvió ${pages.length} páginas para ${batch.pages.length} pedidas` };
      pages.forEach((p, i) => map.set(batch.pages[i], p.body));
    }
    return { ok: true, pages: map };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------- lógica por documento
function textLayerDoubts(pdfTexts, canon) {
  const byN = new Map(canon.pages.map((p) => [p.n, p.body]));
  const doubts = [];
  pdfTexts.forEach((t, i) => {
    const n = i + 1;
    const pdfSet = numsOf(t);
    if (pdfSet.size === 0) return; // página sin números (portada, firmas): nada que verificar
    const md = byN.get(n);
    if (md === undefined) { doubts.push(n); return; } // página que el .md no tiene
    const mdSet = numsOf(md);
    const unmatched = [...mdSet].filter((x) => !pdfSet.has(x)).length;
    const missing = [...pdfSet].filter((x) => !mdSet.has(x)).length;
    if (unmatched > 0 || missing >= 2) doubts.push(n);
  });
  return doubts;
}

function voiceDoubts(pageCountPdf, canon, other) {
  const a = new Map(canon.pages.map((p) => [p.n, numsOf(p.body)]));
  const b = new Map(other.pages.map((p) => [p.n, numsOf(p.body)]));
  const doubts = [];
  for (let n = 1; n <= pageCountPdf; n++) {
    const sa = a.get(n); const sb = b.get(n);
    if (!sa || !sb) { doubts.push(n); continue; }
    if (!sameSet(sa, sb)) doubts.push(n);
  }
  return doubts;
}

const nl = (s) => (s.endsWith('\n\n') ? s : s.replace(/\n*$/, '') + '\n\n');

// Voto entre 2-3 transcripciones de UNA página (BUG REAL del piloto, Almagro 2018 pág. 8: Mistral y
// Gemini coincidían en 9.016.531, Claude leyó 9.010.531, y decidir "gana el desempate" aceptaba el error).
// Un número "gana" si está en al menos 2 voces. Se elige la voz cuyo conjunto de números más se parece al
// de la mayoría; si ninguna lo iguala exacto, la página queda sin consenso para revisión humana.
function vote(voices) {
  const sets = voices.map((v) => numsOf(v.body));
  const count = new Map();
  for (const st of sets) for (const x of st) count.set(x, (count.get(x) || 0) + 1);
  const majority = new Set([...count].filter(([, c]) => c >= 2).map(([x]) => x));
  const dist = sets.map((st) => { let d = 0; for (const x of st) if (!majority.has(x)) d++; for (const x of majority) if (!st.has(x)) d++; return d; });
  const best = dist.indexOf(Math.min(...dist)); // en empate gana la primera (la canónica: no cambia nada)
  return { best, clean: dist[best] === 0 };
}

async function resolveDoc(e) {
  const pdfAbs = resolve(root, e.pdf);
  const mdAbs = resolve(root, e.md);
  const nPages = pageCount(pdfAbs);
  const tag = e.pdf.split('/').slice(-2).join('/');
  const log = (m) => console.log(`    [${tag}] ${m}`);
  const prov = { base: e.motor, paginas: {} };
  const reserva = []; const sinConsenso = [];
  const fin = (status, detail, extra = {}) => ({ status, detail, prov, reserva, sinConsenso, previo: previo ? relative(root, previo) : null, cost: docCost.getStore().cost, ...extra });
  const retry = (r, what) => fin(r.kind === 'agotado' ? 'reintentar' : 'revisar', `${what}: ${r.text}`);
  let canon = splitPages(readFileSync(mdAbs, 'utf8'));
  let previo = null;
  const backup = () => {
    if (previo) return;
    previo = mdAbs.replace(/\.md$/, `.previo-${e.motor === 'legado' ? 'legado' : e.motor}.md`);
    if (!existsSync(previo)) copyFileSync(mdAbs, previo);
  };
  const setPage = (n, body, engine) => {
    const cur = canon.pages.find((p) => p.n === n);
    if (cur) cur.body = nl(body); else canon.pages.push({ n, body: nl(body) });
    canon.pages.sort((x, y) => x.n - y.n);
    prov.paginas[n] = engine;
  };
  const canonBody = (n) => canon.pages.find((p) => p.n === n)?.body;
  const save = () => { if (Object.keys(prov.paginas).length) writeFileSync(mdAbs, joinPages(canon.pre, canon.pages)); };

  // 0) .md sin marcas de página utilizables: se re-hace entero con Mistral (barato) y se sigue.
  if (canon.pages.length < Math.max(1, Math.floor(nPages * 0.5))) {
    log(`el .md tiene ${canon.pages.length} marcas de página para ${nPages} páginas: lo re-hago entero con Mistral`);
    const r = await callEngine('mistral', pdfAbs, '.mistral-redo');
    if (!r.ok) return retry(r, 'no se pudo re-hacer con Mistral');
    backup();
    copyFileSync(r.path, mdAbs);
    canon = splitPages(readFileSync(mdAbs, 'utf8'));
    prov.base = 'mistral (re-hecho)';
  }

  let method = '';
  const vn0 = verifyNumbers(pdfAbs, mdAbs);
  let needScan = vn0.verdict === 'no-aplica';

  // 1) PDF con texto: la verdad está en el propio PDF.
  if (!needScan) {
    const pageTexts = pdfPageTexts(pdfAbs);
    const doubts = textLayerDoubts(pageTexts, canon);
    const withNumbers = pageTexts.filter((t) => numsOf(t).size > 0).length;
    log(`PDF con texto: ${doubts.length} de ${nPages} páginas con dudas`);
    if (doubts.length > 0.5 * withNumbers) {
      // Si más de la mitad de las páginas "no cierran" con el texto del PDF, lo raro es el texto del PDF
      // (parcialmente roto, caso Cuiaba), no la transcripción: mandar todo eso a Claude sería gastar en vano.
      log('más de la mitad de las páginas no coinciden con el texto del PDF: el texto del PDF no es confiable, comparo voces');
      needScan = true;
    }
    if (!needScan && doubts.length) {
      const r = await transcribePages('claude', pdfAbs, doubts);
      if (!r.ok) return retry(r, 'Claude no pudo transcribir las páginas dudosas');
      backup();
      for (const [n, body] of r.pages) setPage(n, body, 'claude-api');
      save();
    }
  }
  if (!needScan) {
    const vn = verifyNumbers(pdfAbs, mdAbs);
    method = `numeros-vs-texto-pdf + claude-api en ${Object.keys(prov.paginas).length} pág.`;
    if (vn.verdict === 'ok') return fin('listo', `${method}; ${vn.mdNumbers} números, ${vn.unmatchedCount} sin respaldo, cobertura ${(vn.coverage * 100).toFixed(0)}%`, { method });
    // Sigue mal aunque Claude ya releyó las páginas dudosas: el que falla es el texto del PDF (parcialmente roto),
    // no la transcripción. Se pasa a comparar voces entre sí, como en un escaneo (BUG REAL del piloto: Cuiaba).
    log(`sigue con problemas contra el texto del PDF (${vn.reason.slice(0, 80)}): paso a comparar voces`);
    needScan = true;
    method += ' -> ';
  }

  // 2) Escaneo (o texto ilegible): hace falta una segunda voz independiente.
  let voice; let voiceEngine = 'gemini';
  const g = await callEngine('gemini', pdfAbs, '.gemini-check');
  if (g.ok) {
    voice = splitPages(readFileSync(g.path, 'utf8'));
  } else if (g.kind === 'recitation' || g.kind === 'otro') {
    log(`Gemini rechazó el documento (${g.kind}): Claude lo transcribe entero como segunda voz`);
    const c = await callEngine('claude', pdfAbs, '.claude-check');
    if (!c.ok) return retry(c, 'Gemini rechazó y Claude no pudo');
    voice = splitPages(readFileSync(c.path, 'utf8'));
    voiceEngine = 'claude';
  } else {
    return fin('reintentar', g.text);
  }
  if (voice.pages.length < Math.floor(nPages * 0.5)) return fin('revisar', `la segunda voz (${voiceEngine}) trae ${voice.pages.length} marcas de página para ${nPages} páginas`);
  const doubts = voiceDoubts(nPages, canon, voice);
  log(`segunda voz ${voiceEngine}: ${doubts.length} de ${nPages} páginas difieren`);
  const voiceBody = new Map(voice.pages.map((p) => [p.n, p.body]));
  if (doubts.length) {
    backup();
    const tie = await transcribePages(voiceEngine === 'gemini' ? 'claude' : 'gemini', pdfAbs, doubts);
    if (!tie.ok && (tie.kind === 'agotado' || voiceEngine === 'gemini')) return retry(tie, 'no se pudo desempatar');
    const pageCands = new Map();
    for (const n of doubts) {
      const A = canonBody(n); const B = voiceBody.get(n); const C = tie.ok ? tie.pages.get(n) : undefined;
      const names = ['canónica', voiceEngine === 'gemini' ? 'gemini' : 'claude-api', voiceEngine === 'gemini' ? 'claude-api' : 'gemini'];
      const cands = [[A, names[0]], [B, names[1]], [C, names[2]]].filter(([b]) => b !== undefined).map(([body, src]) => ({ body, src }));
      if (cands.length === 3) {
        pageCands.set(n, cands);
        const v = vote(cands);
        if (!v.clean) sinConsenso.push(n);
        if (cands[v.best].src !== 'canónica') setPage(n, cands[v.best].body, cands[v.best].src);
      } else if (cands.length === 2 && voiceEngine === 'claude') {
        // Gemini rechazó también esa página: solo hay dos voces. Gana Claude, con reserva.
        if (A !== undefined) { setPage(n, B, 'claude-api'); reserva.push(n); } else setPage(n, B, 'claude-api');
      } else {
        sinConsenso.push(n);
      }
    }
    // Páginas donde las tres voces discrepan: una CUARTA voz barata (Mistral, ~$0.004/pág.) las desempata,
    // salvo que el .md base ya sea de Mistral (mismo motor: repetiría el mismo error, no aporta una voz nueva).
    if (sinConsenso.length && !String(prov.base).startsWith('mistral')) {
      const pend = [...sinConsenso];
      log(`páginas sin consenso (${pend.join(', ')}): pido una cuarta voz a Mistral`);
      const m = await transcribePages('mistral', pdfAbs, pend);
      if (m.ok) {
        for (const n of pend) {
          const cands = [...pageCands.get(n), { body: m.pages.get(n), src: 'mistral' }];
          const v = vote(cands);
          if (!v.clean) continue;
          sinConsenso.splice(sinConsenso.indexOf(n), 1);
          if (cands[v.best].src === 'canónica') { const cur = canon.pages.find((p) => p.n === n); cur.body = nl(cands[0].body); delete prov.paginas[n]; }
          else setPage(n, cands[v.best].body, cands[v.best].src);
        }
      } else if (m.kind === 'agotado') return retry(m, 'no se pudo pedir la cuarta voz');
    }
    save();
  }
  method += `mayoria-por-pagina (${voiceEngine})`;
  if (sinConsenso.length) return fin('revisar', `${method}; sin consenso entre las voces en las páginas ${sinConsenso.join(', ')}`, { method });
  return fin('listo', `${method}${reserva.length ? `; RESERVA: solo Claude validó las páginas ${reserva.join(', ')} (cerrar con sum-check al onboardear)` : ''}`, { method });
}

// ---------------------------------------------------------------- ensayo (gratis)
function dryRunDoc(e) {
  const pdfAbs = resolve(root, e.pdf);
  const nPages = pageCount(pdfAbs);
  const canon = splitPages(readFileSync(resolve(root, e.md), 'utf8'));
  if (canon.pages.length < Math.max(1, Math.floor(nPages * 0.5))) return { plan: 'rehacer-mistral', nPages, cost: nPages * EST.mistral + nPages * 0.15 * EST.claude };
  const vn = verifyNumbers(pdfAbs, resolve(root, e.md));
  if (vn.verdict !== 'no-aplica') {
    const pt = pdfPageTexts(pdfAbs);
    const d = textLayerDoubts(pt, canon).length;
    if (d > 0.5 * pt.filter((t) => numsOf(t).size > 0).length) return { plan: 'escaneo: Gemini + Claude en págs. que difieran', nPages, cost: nPages * EST.gemini + nPages * 0.6 * 0.25 * EST.claude };
    return { plan: `texto: ${d} pág. dudosas`, nPages, doubts: d, cost: d * EST.claude };
  }
  return { plan: 'escaneo: Gemini + Claude en págs. que difieran', nPages, cost: nPages * EST.gemini + nPages * 0.6 * 0.25 * EST.claude };
}

// ---------------------------------------------------------------- main
const ledger = readJsonl(statePath);
if (!ledger.length) { console.error('Falta Admin/transcripciones-estado.jsonl: corré primero node tools/inventario-transcripciones.mjs'); process.exit(1); }
const TODO_STATES = new Set(estadoFilter ? [estadoFilter] : ['revisar', 'pendiente-segunda-voz', 'sin-verificar', 'reintentar']);
let todo = ledger.filter((e) => !e.cargado && TODO_STATES.has(e.estado)
  && (!dirFilter || e.pdf.startsWith(dirFilter.replace(/\/$/, '') + '/'))
  && (!onlyPdf || e.pdf === onlyPdf)
  && (!onlyList || onlyList.has(e.pdf))).slice(0, limit);

console.log(`${todo.length} documento(s) a resolver${dirFilter ? ` en ${dirFilter}` : ''}. ${EXECUTE ? 'EJECUCIÓN REAL (gasta API)' : 'ENSAYO: no llamo a ninguna API'}\n`);

if (!EXECUTE) {
  let total = 0; const byPlan = {};
  for (const e of todo) {
    let r;
    try { r = dryRunDoc(e); } catch (err) { console.log(`  ?  ${e.pdf}: ${err.message}`); continue; }
    total += r.cost;
    const k = r.plan.startsWith('texto') ? 'texto (Claude solo en págs. dudosas)' : r.plan;
    (byPlan[k] ||= { n: 0, cost: 0, pages: 0 }); byPlan[k].n++; byPlan[k].cost += r.cost; byPlan[k].pages += r.nPages;
    if (todo.length <= 40) console.log(`  ${r.plan.padEnd(46)} ${String(r.nPages).padStart(4)} pág  ~$${r.cost.toFixed(2)}  ${e.pdf}`);
  }
  console.log('\nResumen del ensayo (estimación gruesa):');
  for (const [k, v] of Object.entries(byPlan)) console.log(`  ${String(v.n).padStart(4)} docs  ${String(v.pages).padStart(6)} pág  ~$${v.cost.toFixed(2)}  ${k}`);
  console.log(`  TOTAL ~$${total.toFixed(2)}\nPara ejecutar de verdad, agregá --ejecutar.`);
  process.exit(0);
}

const tally = {};
let done = 0; let stopped = null; let next = 0;

async function worker() {
  while (!stopped) {
    const idx = next++;
    if (idx >= todo.length) return;
    const e = todo[idx];
    console.log(`[${idx + 1}/${todo.length}] ${e.pdf}`);
    let res;
    try {
      res = await docCost.run({ cost: 0 }, () => resolveDoc(e));
    } catch (err) {
      if (err instanceof StopRun) {
        stopped = err.message;
        appendFileSync(verifPath, JSON.stringify({ ts: new Date().toISOString(), md: e.md, mdSha1: sha1(resolve(root, e.md)), status: 'reintentar', method: 'resolver-inventario', detail: err.message }) + '\n');
        return;
      }
      res = { status: 'reintentar', detail: `error inesperado: ${err.message}`.slice(0, 300), prov: { base: e.motor, paginas: {} }, reserva: [], sinConsenso: [], cost: 0 };
    }
    appendFileSync(verifPath, JSON.stringify({
      ts: new Date().toISOString(), md: e.md, mdSha1: sha1(resolve(root, e.md)), status: res.status, method: res.method || 'resolver-inventario', detail: res.detail,
      proveniencia: res.prov, reserva: res.reserva, sinConsenso: res.sinConsenso, previo: res.previo || null, costoUsd: Number((res.cost || 0).toFixed(4)),
    }) + '\n');
    tally[res.status] = (tally[res.status] || 0) + 1;
    done++;
    console.log(`    -> ${e.pdf.split('/').slice(-2).join('/')}: ${res.status.toUpperCase()}: ${res.detail}  (~$${(res.cost || 0).toFixed(3)})  [${done}/${todo.length} terminados, gasto acumulado ~$${runCost.toFixed(2)}]`);
  }
}

try {
  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, worker));
} finally {
  if (stopped) console.log(`\nCORRIDA DETENIDA: ${stopped}\nLos documentos que faltan siguen en su estado y la próxima corrida los retoma.`);
  console.log(`\nResumen: ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(', ') || 'nada procesado'}. Costo API de esta corrida: ~$${runCost.toFixed(2)}`);
  console.log('Corré node tools/inventario-transcripciones.mjs para regenerar el registro.');
}
