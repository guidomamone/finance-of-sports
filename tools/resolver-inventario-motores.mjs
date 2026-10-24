// ============================================================================
// tools/resolver-inventario-motores.mjs — las voces de la transcripción (Mistral, Gemini y el texto del PDF), el voto por mayoría y la aritmética que desempata una página
// Mudado de tools/resolver-inventario.mjs sin cambiar una línea (salvo `export`); tools/resolver-inventario.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, copyFileSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { AsyncLocalStorage } from 'node:async_hooks';
import { extractNumbers, NUM_RE, norm } from './verify-numbers.mjs';
import { derivado } from './rutas.mjs';
import { tablasDe, respaldoSumas, respaldoFilas } from './chequeos-gratis.mjs';
import { splitPages } from './huella-paginas.mjs';
import { TOOL, LOGDIR, sleep } from './resolver-inventario.mjs';

const root = resolve(import.meta.dirname, '..');

export const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);

export function pageCount(pdf) {
  const m = execFileSync('pdfinfo', [pdf], { maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString('latin1').match(/^Pages:\s+(\d+)/m);
  return m ? Number(m[1]) : 0;
}

// Texto de cada página del PDF (pdftotext separa páginas con \f).
export function pdfPageTexts(pdf) {
  const buf = execFileSync('pdftotext', ['-layout', pdf, '-'], { maxBuffer: 512 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  const parts = buf.toString('utf8').split('\f');
  if (parts.length && parts[parts.length - 1].trim() === '') parts.pop();
  return parts;
}

// Parte un .md en {pre, pages:[{n, body}]} por sus marcas "--- pág. N ---", sin perder ni un carácter.
export const joinPages = (pre, pages) => pre + pages.map((p) => `--- pág. ${p.n} ---\n${p.body}`).join('');
export const numsOf = (t) => extractNumbers(t);
export const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

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
export class StopRun extends Error {}
let consecutiveAccountFailures = 0;

// Costo real de UNA llamada: las tools anotan en su log el "md" que escribieron (ruta relativa al proyecto,
// o absoluta si está fuera). Con documentos en paralelo no se puede contar "líneas nuevas del log", se busca por ese md.
function costOfCall(engine, outAbs, sinceTs) {
  const rel = outAbs.startsWith(root + '/') ? outAbs.slice(root.length + 1) : outAbs;
  return readJsonl(resolve(root, 'Admin', 'registros', 'api', `${LOGDIR[engine]}.jsonl`)).filter((r) => r.md === rel && r.ts >= sinceTs).reduce((a, r) => a + (r.costUsd || 0), 0);
}

export const docCost = new AsyncLocalStorage(); // acumulador de costo del documento que se está resolviendo
export let runCost = 0;
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
export async function callEngine(engine, pdfAbs, suffix, opts = {}) {
  const out = suffix ? derivado(pdfAbs, suffix + '.md') : resolve(dirname(pdfAbs), basename(pdfAbs, '.pdf') + '.md'); // mismo lugar que escribe la tool (tools/rutas.mjs)
  if (existsSync(out)) return { ok: true, path: out, reused: true };
  const attempts = { credito: 0, transitorio: 0 };
  for (;;) {
    const t0 = new Date().toISOString();
    const output = await runTool(process.env[`RESOLVER_TOOL_${engine.toUpperCase()}`] || resolve(root, TOOL[engine]), [pdfAbs, '--out-suffix', suffix, ...(opts.extraArgs || [])], opts.procTimeoutMs || (engine === 'claude' ? 90 : 25) * 60 * 1000);
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
  const r = spawnSync('qpdf', [src, '--pages', '.', pagesSpec, '--', out], { stdio: 'ignore' });
  if ((r.status === 0 || r.status === 3) && existsSync(out)) return;
  // PDF DAÑADO (qpdf código 2, caso real del segundo piloto: DNCG Francia 2018-19, "file is damaged"): poppler es más
  // tolerante. Se separan las páginas de a una y se vuelven a unir.
  const pages = pagesSpec.split(',').flatMap((x) => { const m = x.match(/^(\d+)-(\d+)$/); return m ? Array.from({ length: m[2] - m[1] + 1 }, (_, i) => Number(m[1]) + i) : [Number(x)]; });
  const dir = mkdtempSync(join(tmpdir(), 'poppler-'));
  try {
    const files = [];
    for (const n of pages) {
      const f = join(dir, `p${n}.pdf`);
      spawnSync('pdfseparate', ['-f', String(n), '-l', String(n), src, f], { stdio: 'ignore' });
      if (existsSync(f)) files.push(f);
    }
    if (files.length !== pages.length) throw new Error(`qpdf falló (código ${r.status}) y poppler solo pudo extraer ${files.length} de ${pages.length} páginas de ${pagesSpec}`);
    if (files.length === 1) copyFileSync(files[0], out); else spawnSync('pdfunite', [...files, out], { stdio: 'ignore' });
    if (!existsSync(out)) throw new Error(`qpdf falló (código ${r.status}) y pdfunite no generó el archivo para ${pagesSpec}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
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
// Tope de páginas por llamada a Claude. El tope de salida de claude-api-transcribe.mjs es 64.000 tokens por llamada y una
// página densa de un escaneo se transcribe en ~2.300 tokens (medido en el piloto C: Real Madrid 2005-06, 18 páginas = 41.763 tokens de
// salida, US$ 0,45). Con 18-25 páginas en un lote se queda al borde del tope, y un intento cortado por max_tokens se PAGA ENTERO y se tira
// (la tool descarta la transcripción truncada). De a 8 páginas (~20.000 tokens) el tope no se alcanza; el costo por página es el mismo.
const CLAUDE_MAX_PAGES = 8;
export async function transcribePages(engine, pdfAbs, pageList, opts = {}) {
  if (engine === 'claude' && pageList.length > CLAUDE_MAX_PAGES) {
    const map = new Map();
    for (let i = 0; i < pageList.length; i += CLAUDE_MAX_PAGES) {
      const r = await transcribePages(engine, pdfAbs, pageList.slice(i, i + CLAUDE_MAX_PAGES), opts);
      if (!r.ok) return r;
      for (const [n, body] of r.pages) map.set(n, body);
    }
    return { ok: true, pages: map };
  }
  const tmp = mkdtempSync(join(tmpdir(), 'resolver-'));
  try {
    let batches;
    try { batches = sizedBatches(pdfAbs, pageList, tmp); } catch (err) { return { ok: false, kind: 'otro', text: err.message }; }
    const map = new Map();
    for (const batch of batches) {
      const r = await callEngine(engine, batch.file, '', opts);
      // BUG REAL del piloto C: 18 páginas densas en un solo lote superaron el tope de salida de Claude
      // (stop_reason=max_tokens); la tool descarta la transcripción cortada (bien) y el documento entero quedaba en `revisar`. El tope es
      // por llamada, así que se reparte el lote en mitades y se reintenta cada una, igual que cuando un motor devuelve menos páginas.
      if (!r.ok && batch.pages.length > 1 && /TRUNCADA|max_tokens|MAX_TOKENS/i.test(r.text || '')) {
        const mid = Math.ceil(batch.pages.length / 2);
        for (const half of [batch.pages.slice(0, mid), batch.pages.slice(mid)]) {
          const rr = await transcribePages(engine, pdfAbs, half, opts);
          if (!rr.ok) return rr;
          for (const [n, body] of rr.pages) map.set(n, body);
        }
        continue;
      }
      if (!r.ok) return { ok: false, kind: r.kind, text: r.text };
      const { pages } = splitPages(readFileSync(r.path, 'utf8'));
      if (pages.length !== batch.pages.length) {
        // BUG REAL de la primera corrida del pipeline (Aston Martin F1: Claude devolvió 12 páginas para 20 pedidas): el motor
        // fusionó u omitió marcas de página, y fallar todo el documento por eso era desproporcionado. Se reparte el lote en
        // dos mitades y se reintenta cada una; una página sola que vuelve vacía es una página en blanco.
        if (batch.pages.length > 1) {
          const mid = Math.ceil(batch.pages.length / 2);
          for (const half of [batch.pages.slice(0, mid), batch.pages.slice(mid)]) {
            const rr = await transcribePages(engine, pdfAbs, half, opts);
            if (!rr.ok) return rr;
            for (const [n, body] of rr.pages) map.set(n, body);
          }
          continue;
        }
        map.set(batch.pages[0], pages.length ? pages.map((p) => p.body).join('\n') : '');
        continue;
      }
      pages.forEach((p, i) => map.set(batch.pages[i], p.body));
    }
    return { ok: true, pages: map };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// Un documento largo no entra en UNA llamada de Gemini (tope de 150 s y de tokens de salida: un informe de 230
// páginas daba timeout seguro y gastaba reintentos en vano, visto en la primera corrida del pipeline con Borussia
// Dortmund). Se transcribe por tramos de BIG_CHUNK páginas y se arma el mismo {pre, pages} que devuelve splitPages.
export const BIG_DOC_PAGES = 40;
export const BIG_CHUNK = 20;
export async function voiceByChunks(engine, pdfAbs, pageList, log) {
  const pages = [];
  for (let i = 0; i < pageList.length; i += BIG_CHUNK) {
    const list = pageList.slice(i, i + BIG_CHUNK);
    const r = await transcribePages(engine, pdfAbs, list, engine === 'gemini' ? { extraArgs: ['--timeout', '300'] } : {});
    if (!r.ok) return { ok: false, kind: r.kind, text: `tramo págs. ${list[0]}-${list[list.length - 1]}: ${r.text}` };
    for (const [n, body] of r.pages) pages.push({ n, body });
    log(`  tramo ${list[0]}-${list[list.length - 1]} (${pageList.length} págs. en total) hecho por ${engine}`);
  }
  return { ok: true, voice: { pre: '', pages } };
}

// Gemini rechaza documentos ENTEROS por "RECITATION" (falso positivo de copyright: 124 de 141 fallos registrados) pero, medido el
// acepta la mayoría de esas mismas páginas de a una (Ituano 2013: 7 de 8; Alverca 2023-24: 21 de 29). Gemini cuesta ~$0,003 por página
// y Claude ~$0,016, así que antes de mandarle el documento entero a Claude se prueba página por página con Gemini y Claude recibe SOLO las
// rechazadas. Devuelve { ok, voice:{pre,pages}, claudeOnly:Set<n> } (claudeOnly = páginas que solo tienen la voz de Claude).
export async function voiceGeminiPerPage(pdfAbs, pageList, log) {
  const got = new Map(); const refused = []; let cursor = 0; let hard = null;
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (!hard) {
      const n = pageList[cursor++]; if (n === undefined) return;
      const r = await transcribePages('gemini', pdfAbs, [n], { extraArgs: ['--timeout', '150'] });
      if (r.ok) got.set(n, r.pages.get(n) ?? '');
      else if (r.kind === 'recitation' || r.kind === 'otro') refused.push(n);
      else hard = r; // agotado (crédito/límite): lo maneja quien llama
    }
  }));
  if (hard) return { ok: false, kind: hard.kind, text: hard.text };
  refused.sort((a, b) => a - b);
  log(`  Gemini página por página: ${got.size} de ${pageList.length} páginas aceptadas${refused.length ? `; rechazadas ${refused.length}: Claude solo en esas` : ''}`);
  const pages = [...got].map(([n, body]) => ({ n, body }));
  const claudeOnly = new Set();
  if (refused.length) {
    const c = await transcribePages('claude', pdfAbs, refused);
    if (!c.ok) return { ok: false, kind: c.kind, text: c.text };
    for (const [n, body] of c.pages) { pages.push({ n, body }); claudeOnly.add(n); }
  }
  pages.sort((a, b) => a.n - b.n);
  return { ok: true, voice: { pre: '', pages }, claudeOnly };
}

// Una cifra de la lectura de Claude que el texto del PDF no tiene es sospechosa SOLO si se parece a una que sí tiene
// (mismo largo, 1-2 dígitos distintos = lectura mal hecha); si no se parece a nada, es texto de una imagen (dirección,
// sello) que el texto del PDF nunca va a tener.
export function pageAccepted(cSet, pdfSet) {
  const extras = [...cSet].filter((x) => !pdfSet.has(x));
  return extras.every((x) => ![...pdfSet].some((y) => y.length === x.length && hamming(x, y) <= (x.length >= 7 ? 2 : 1)));
}

// ---------------------------------------------------------------- lógica por documento
export function textLayerDoubts(pdfTexts, canon) {
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

export function voiceDoubts(pageList, canon, other) {
  const a = new Map(canon.pages.map((p) => [p.n, numsOf(p.body)]));
  const b = new Map(other.pages.map((p) => [p.n, numsOf(p.body)]));
  const doubts = [];
  for (const n of pageList) {
    const sa = a.get(n); const sb = b.get(n);
    if (!sa || !sb) { doubts.push(n); continue; }
    if (!sameSet(sa, sb)) doubts.push(n);
  }
  return doubts;
}

export const nl = (s) => (s.endsWith('\n\n') ? s : s.replace(/\n*$/, '') + '\n\n');

// Voto entre 2-3 transcripciones de UNA página (BUG REAL del piloto, Almagro 2018 pág. 8: Mistral y
// Gemini coincidían en 9.016.531, Claude leyó 9.010.531, y decidir "gana el desempate" aceptaba el error).
// Un número "gana" si está en al menos 2 voces. Se elige la voz cuyo conjunto de números más se parece al
// de la mayoría; si ninguna lo iguala exacto, la página queda sin consenso para revisión humana.
export function vote(voices) {
  const sets = voices.map((v) => numsOf(v.body));
  const count = new Map();
  for (const st of sets) for (const x of st) count.set(x, (count.get(x) || 0) + 1);
  const majority = new Set([...count].filter(([, c]) => c >= 2).map(([x]) => x));
  const dist = sets.map((st) => { let d = 0; for (const x of st) if (!majority.has(x)) d++; for (const x of majority) if (!st.has(x)) d++; return d; });
  const best = dist.indexOf(Math.min(...dist)); // en empate gana la primera (la canónica: no cambia nada)
  return { best, clean: dist[best] === 0 };
}

// ---- Consenso entre voces en una página ---------------------------------------------------------------
function hamming(a, b) { if (a.length !== b.length) return Infinity; let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; }
function majorityNumbers(cands) {
  const count = new Map();
  for (const c of cands) for (const x of numsOf(c.body)) count.set(x, (count.get(x) || 0) + 1);
  return new Set([...count].filter(([, n]) => n >= 2).map(([x]) => x));
}

// PASO 1 (gratis): PARCHE POR MAYORÍA. Si la voz elegida tiene una cifra que ninguna otra tiene, pero es casi igual
// (mismo largo, 1-2 dígitos distintos) a una cifra que SÍ tienen al menos dos voces y a la elegida le falta, es una
// lectura mal hecha: se corrige el dígito (Almagro 2018 pág. 8: 9.010.531 -> 9.016.531). Devuelve null si no alcanza.
export function patchToMajority(cands, best) {
  const M = majorityNumbers(cands);
  const own = numsOf(cands[best].body);
  const bad = [...own].filter((x) => !M.has(x));
  const missing = [...M].filter((x) => !own.has(x));
  if (!bad.length) return null;
  const map = new Map(); const used = new Set();
  for (const x of bad) {
    const y = missing.find((m) => !used.has(m) && m.length === x.length && hamming(m, x) <= (x.length >= 7 ? 2 : 1));
    if (!y) return null;
    map.set(x, y); used.add(y);
  }
  const body = cands[best].body.replace(NUM_RE, (tok) => {
    const d = norm(tok);
    if (!map.has(d)) return tok;
    const y = map.get(d); let i = 0;
    return tok.replace(/\d/g, () => y[i++]);
  });
  if (!sameSet(numsOf(body), M)) return null;
  return { body, parches: [...map].map(([a, b]) => `${a}->${b}`) };
}

// PASO 2 (gratis): ARITMÉTICA DEL DOCUMENTO. Entre versiones distintas de una página gana la que deja más celdas respaldadas por
// sumas (sumScore(), abajo). Comprobado a mano en
// Argentinos Juniors: 425.204.023 + 233.796.753 - 275.518.976 = 383.481.800 decidía cuál de las lecturas era la correcta.
// el puntaje es la cantidad de CELDAS que quedan respaldadas por sumas genéricas de tools/chequeos-gratis.mjs — verticales
// (una fila = suma de las contiguas) y horizontales (en una fila, una celda = combinación con signo de las demás: tablas de movimiento,
// saldo inicial + altas - bajas = saldo final). Antes se usaba un puntaje de prepare-onboarding.mjs (tieScore(), borrado), que solo veía filas rotuladas "total":
// en las notas rusas de Rubin Kazan 2025 daba 0 en las 11 páginas, todas terminaron "con reserva", y en 2 (págs. 18 y 32) la lectura
// elegida era la que NO cerraba ninguna suma. Con este puntaje se deciden 5 de esas 11; el resto no tiene aritmética y sigue con reserva.
function sumScore(body) {
  const t = tablasDe(body);
  const v = respaldoSumas(t).ok; const h = respaldoFilas(t).ok;
  return new Set([...v, ...h]).size;
}
export function settleByArithmetic(cands) {
  const scores = cands.map((c) => sumScore(c.body));
  const max = Math.max(...scores);
  // Gana solo si le saca al menos 3 celdas respaldadas a la segunda (mismo MARGEN que tools/archivo/revisar-reservas.mjs): por 1-2 celdas no se
  // decide una página.
  const segundo = Math.max(...scores.filter((_, i) => i !== scores.indexOf(max)), 0);
  if (max <= 0 || max < segundo + 3) return null;
  return scores.indexOf(max);
}
