#!/usr/bin/env node
// ============================================================================
// tools/proponer-carga.mjs — etapa 5 del pipeline, versión 1: MIDE si un script puede reconstruir un ejercicio a partir del
// .md, antes de dejarle escribir nada (to-do 108, decisión de Guido 2026-09-30). No escribe ningún archivo del sitio.
//
//   --backtest   toma los ejercicios YA CARGADOS que tienen su .md, arma "qué habría propuesto el script" usando SOLO lo que
//                había antes (el precedente de categorías sale de los OTROS años del mismo club) y lo compara con lo que hay en
//                producción. Es la única forma honesta de saber qué parte de la carga es mecánica.
//   --pdf <ruta> [--club id]   propone la carga de un documento puntual (imprime la propuesta).
//
// Qué hace, mecánicamente (nada de esto usa IA ni internet):
//   1. Corre tools/prepare-onboarding.mjs sobre el .md (tablas, formato numérico, chequeo de sumas).
//   2. Elige las tablas de estado de resultados (o de recursos y gastos) y, en ellas, la columna del ejercicio.
//   3. Detecta la escala (unidades / miles / millones) por el texto de la página y pasa todo a MILLONES de moneda nativa.
//   4. VERSIÓN 1: cada fila la categoriza Jev (con el lado de la tabla y 8 ejemplos parecidos de otros ejercicios; nunca ejemplos
//      del ejercicio que se está reconstruyendo). Si la confianza es < 0,90 queda "necesita criterio".
//      Escala: por plausibilidad contra los ingresos que ese club ya tiene cargados en otros años (no por palabras).
//   5. Detecta en el documento la fila de total de ingresos y la del resultado del ejercicio.
//   6. Compara contra producción POR CATEGORÍA (los rubros de producción son agrupaciones curadas a mano, no filas literales, así que
//      comparar por texto no sirve): qué porcentaje del dinero de producción quedó en la categoría correcta, en ingresos y en gastos.
//
// USO:
//   node tools/proponer-carga.mjs --backtest [--limit 40] [--club id] [--concurrencia 4] [--mistral-fresco]
//   node tools/proponer-carga.mjs --pdf "Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2021.pdf"
// Deja el detalle en Admin/test-proponer-carga.jsonl y el resumen en Admin/test-proponer-carga.md.
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const BACKTEST = args.includes('--backtest');
const limit = flagVal('--limit') !== null ? Number(flagVal('--limit')) : 0;
const clubOnly = flagVal('--club');
const FRESH = args.includes('--mistral-fresco'); // usa una transcripción NUEVA de Mistral (con tablas) en vez del .md guardado: lo que produciría el pipeline hoy
const concurrency = Number(flagVal('--concurrencia') || 4);
if (!BACKTEST && !flagVal('--pdf')) { console.error('Uso: node tools/proponer-carga.mjs --backtest [--limit N]   o   --pdf <ruta> [--club id]'); process.exit(1); }

// ---------------------------------------------------------------- datos del sitio
function loadSite() {
  const sandbox = { console, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...readdirSync(resolve(root, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const rel of files) vm.runInContext(readFileSync(resolve(root, rel), 'utf8'), ctx, { filename: rel });
  return { generic: vm.runInContext('window.CLUB_GENERIC_DATA', ctx), clubs: vm.runInContext('typeof clubs !== "undefined" ? clubs : null', ctx) };
}

// ---------------------------------------------------------------- utilidades de texto y números
const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/\s+/g, ' ').trim();
const STATEMENT_RE = /resultado|cuenta de perdidas|perdidas y ganancias|recursos y gastos|recursos y erogaciones|estado de recursos|income statement|profit and loss|profit or loss|comprehensive income|statement of operations|statement of income|conto economico|resultatregnskap|resultatopgor|resultatenrekening|compte de resultat|gewinn- ?und verlust|guv|erfolgsrechnung|racun dobiti|dobiti i gubitka|demonstracao do resultado|demonstracao de resultado|αποτελεσμα|gelir tablosu|kar zarar|zysk|vysledovka|vykaz zisku|tulos/;
const TOTAL_RE = /^\**\s*(total|subtotal|sum\b|suma|totale|totaal|gesamt|ukupno)/;
const REV_TOTAL_RE = /^\**\s*(total\s+(de\s+)?(revenue|revenues|income|ingresos|recursos|receitas?|ricavi|proventi|operating revenue|turnover)|revenue|total revenue|turnover|net sales|receita (operacional )?(liquida|bruta)|ricavi totali|totale ricavi|sum inntekter|sum driftsinntekter|umsatzerloese|gesamtertraege|ukupni prihodi|prihodi ukupno|omsaetning|nettoomsaetning|total opbrengsten)/;
const RESULT_RE = /^\**\s*(resultado (liquido )?do (exercicio|periodo)|resultado del ejercicio|superavit|deficit|profit (for the (year|period))?( after tax)?|net (profit|income|loss)|profit and loss for the year|loss for the year|utile|risultato (netto|d.esercizio)|arsresultat|arets resultat|aarets resultat|jahresueberschuss|jahresfehlbetrag|neto rezultat|dobit|gubitak|net result|resultat)/;

function parseNumber(raw) {
  let s = String(raw).trim().replace(/R\$|[$€£¥]/g, '').replace(/^\s*-\s+(?=\()/, '').trim();
  if (!/\d/.test(s)) return null;
  s = s.replace(/(\d)\s+(?=\d)/g, '$1');
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−')) { neg = true; s = s.slice(1); }
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c !== -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 3) s = s.replace(/\./g, '');
  const n = parseFloat(s.replace(/[^0-9.eE-]/g, ''));
  return Number.isNaN(n) ? null : (neg ? -n : n);
}

// Escala por el texto de la página donde está la tabla (encabezado de la moneda: "in thousands", "€000", "em milhares"...).
function detectScale(text) {
  const t = norm(text);
  if (/\b(millions?|mio\.?|mln|millones|milhoes|mill\.|млн)\b|in millions|\bm€|€ ?m\b/.test(t)) return { unit: 'millones', mult: 1 };
  if (/\b(thousands?|tsd\.?|teur|tusd|t€|tdkk|tnok|tsek|tchf|milhares|tusen|tusind|тыс|тис|tis\.)\b|'000|\(000\)|€ ?000|k€|\b000s?\b|\bmiles\b|en miles|in tausend|tausend eur|tuhat/.test(t)) return { unit: 'miles', mult: 1e-3 };
  return { unit: 'unidades', mult: 1e-6 };
}

function pageText(md, page) {
  const re = /^--- pág\. (\d+) ---[ \t]*\r?\n?/gm; const marks = [...md.matchAll(re)];
  const i = marks.findIndex((m) => Number(m[1]) === page);
  return i < 0 ? '' : md.slice(marks[i].index, i + 1 < marks.length ? marks[i + 1].index : md.length);
}

// Columna del ejercicio: la que dice el año en su encabezado (2024, 2023/24, 2023-24...), y si no, la primera con números.
function yearColumn(table, year) {
  const cols = table.columns || [];
  const y = String(year); const y1 = String(year - 1); const yy = y.slice(2);
  const hit = (h) => new RegExp(`(^|\\D)(${y}|${y1}[-/ ]${yy}|${y1}[-/]${y})(\\D|$)`).test(String(h));
  for (let j = 1; j < cols.length; j++) if (hit(cols[j])) return j - 1;
  const numericCols = [];
  const width = Math.max(0, ...table.rows.map((r) => r.values.length));
  for (let j = 0; j < width; j++) {
    const head = norm(cols[j + 1] || '');
    if (/^(nota|notas|note|notes|anexo|nr|ref|no\.?)$/.test(head) || /nota|note/.test(head)) continue;
    const nums = table.rows.filter((r) => parseNumber(r.values[j] ?? '') !== null).length;
    if (nums >= Math.max(3, table.rows.length * 0.4)) numericCols.push(j);
  }
  return numericCols.length ? numericCols[0] : null;
}

// ---------------------------------------------------------------- Jev (mismo pedido que tools/jev-categorizar.mjs)
function loadCategories() {
  const src = readFileSync(resolve(root, 'data', 'category-map.js'), 'utf8');
  const block = (name) => { const a = src.indexOf(`const ${name} = [`); return src.slice(a, src.indexOf('];', a)); };
  const labels = (name) => { const a = src.indexOf(`const ${name} = {`); const b = src.slice(a, src.indexOf('};', a)); return Object.fromEntries([...b.matchAll(/^\s*([a-z_]+):\s*'([^']*)'/gm)].map((m) => [m[1], m[2]])); };
  const build = (arr, lab) => { const l = labels(lab); const o = {}; for (const m of block(arr).matchAll(/^\s*'([a-z_]+)',?\s*(?:\/\/\s*(.*))?$/gm)) { const c = (m[2] || '').replace(/\(Versión \d+[^)]*\)/g, '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s/)[0].slice(0, 220); o[m[1]] = [l[m[1]] || m[1], c].filter(Boolean).join(' — '); } return o; };
  return { revenue: build('REVENUE_CATEGORIES', 'REVENUE_CATEGORY_LABELS'), expense: build('EXPENSE_CATEGORIES', 'EXPENSE_CATEGORY_LABELS') };
}
const CATS = loadCategories();
const sideOfCat = (c) => (c in CATS.revenue ? 'revenue' : c in CATS.expense ? 'expense' : null);
let jevKey = null;
const readJevKey = () => (jevKey ??= readFileSync(resolve(root, 'Admin', 'jev', '.env'), 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')).slice(12).trim());
const words = (t) => new Set(norm(t).split(/[^a-z0-9]+/).filter((w) => w.length > 2));

async function askJev({ label, club, side, examples }) {
  const criteria = side ? Object.fromEntries(Object.entries(side === 'revenue' ? CATS.revenue : CATS.expense).map(([k, v]) => [k, `${side === 'revenue' ? 'INGRESO' : 'GASTO'}: ${v}`])) : { ...Object.fromEntries(Object.entries(CATS.revenue).map(([k, v]) => [k, `INGRESO: ${v}`])), ...Object.fromEntries(Object.entries(CATS.expense).map(([k, v]) => [k, `GASTO: ${v}`])) };
  const ex = examples?.length ? `Ejemplos de rubros parecidos que ya están categorizados en el sitio (los clubes tienen convenciones propias; guiate por ellos):\n${examples.map((x) => `- "${x.label}" (${x.club}) -> ${x.cat}`).join('\n')}\n` : '';
  const state = [`Rubro de un estado financiero de un club de fútbol (${club}).`, ex, `Texto del rubro, tal cual figura en el documento: "${label}"`].filter(Boolean).join('\n');
  const body = { state, model: 'jev-latest', questions: { categoria: { type: 'choice', instructions: 'Elegí la categoría de la lista a la que corresponde este rubro. Si no encaja en ninguna, elegí la más genérica (other_income / other_expenses).', criteria } } };
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${readJevKey()}` }, body: JSON.stringify(body) });
      if (r.ok) { const j = (await r.json()).answers?.categoria; return j ? { choice: j.choice, confidence: j.confidence } : { error: 'sin respuesta' }; }
      if (r.status === 429 || r.status >= 500) { await new Promise((z) => setTimeout(z, 2500 * (a + 1))); continue; }
      return { error: `HTTP ${r.status}` };
    } catch { await new Promise((z) => setTimeout(z, 2000 * (a + 1))); }
  }
  return { error: 'reintentos agotados' };
}

// Banco de ejemplos: todos los rubros ya categorizados, SIN los del ejercicio que se está reconstruyendo (nada de filtrar la respuesta).
function buildBank(generic, excludeClub, excludeYear) {
  const bank = [];
  for (const [club, d] of Object.entries(generic)) for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const [yr, lines] of Object.entries(d[key] || {})) {
    if (club === excludeClub && Number(yr) === Number(excludeYear)) continue;
    for (const l of lines || []) if (l.rawLabel && l.normalizedCategory) bank.push({ label: l.rawLabel.trim(), club, side, cat: l.normalizedCategory, w: words(l.rawLabel) });
  }
  return bank;
}
function retrieve(bank, label, side, k = 8) {
  const qw = words(label); const sc = [];
  for (const b of bank) { if (side && b.side !== side) continue; let i = 0; for (const w of qw) if (b.w.has(w)) i++; if (i) sc.push([i / (qw.size + b.w.size - i), b]); }
  sc.sort((a, b) => b[0] - a[0]); const seen = new Set(); const out = [];
  for (const [, b] of sc) { const key = `${norm(b.label)}|${b.cat}`; if (seen.has(key)) continue; seen.add(key); out.push(b); if (out.length >= k) break; }
  return out;
}

// Lado de una tabla por las palabras de su título y columnas (mismas familias que tools/pipeline.mjs).
const SIDE_REV = /доход|выручк|прибыл|доходи|vynos|trzb|opbrengsten|omzet|収益|収入|수익|매출|收入|ingreso|recurso|recaudac|venta|cuota|income|revenue|turnover|ricavi|proventi|inntekt|driftsinntekt|umsatz|ertr|prihod|produits|opbrengst|omsaetning|indtaegt|receita|faturamento|εσοδα|gelir|hasilat|przychod|tulot/;
const SIDE_EXP = /расход|затрат|витрат|убыт|naklad|kosten|費用|支出|비용|费用|gasto|egreso|costo|expense|cost of|costi|oneri|kostnad|aufwand|aufwend|rashod|troskov|charges|despesa|custo|εξοδα|gider|omkostning|udgift|wydatki|koszt|menot/;
function sideOfTable(t) { const h = norm(`${t.section || ''} ${(t.columns || []).join(' ')}`); const r = SIDE_REV.test(h); const x = SIDE_EXP.test(h); return r && !x ? 'revenue' : x && !r ? 'expense' : null; }

// Escala por PLAUSIBILIDAD: la que deja el mayor importe del estado cerca de los ingresos que el club ya tiene cargados en otros años.
function pickScale(maxAbs, refM, textScale) {
  if (!refM) return textScale;
  const cands = [{ unit: 'unidades', mult: 1e-6 }, { unit: 'miles', mult: 1e-3 }, { unit: 'millones', mult: 1 }];
  const best = cands.map((c) => ({ c, d: Math.abs(Math.log10(Math.max(maxAbs * c.mult, 1e-9) / refM)) })).sort((a, b) => a.d - b.d)[0];
  return best.d <= 0.8 ? best.c : textScale; // dentro de un factor ~6; si nada se acerca, se cae al texto
}

// ---------------------------------------------------------------- la propuesta
async function propose({ briefing, mdText, clubData, generic, club, year }) {
  const tables = (briefing.tables || []).filter((t) => t.likelyRelevant && (STATEMENT_RE.test(norm(`${t.section || ''} ${(t.columns || []).join(' ')}`)) || sideOfTable(t)));
  if (!tables.length) return { ok: false, motivo: 'sin estado de resultados' };
  const others = Object.entries(clubData.fiscalYearMeta || {}).filter(([y]) => Number(y) !== Number(year)).map(([, m]) => Math.abs(m.officialTotalRevenue || 0)).filter(Boolean).sort((a, b) => a - b);
  const refM = others.length ? others[Math.floor(others.length / 2)] : null;
  const raw = []; let docRevenueTotal = null; let docResult = null;
  const seenLabels = new Set();
  for (const t of tables) {
    const j = yearColumn(t, year); if (j === null) continue;
    const textScale = detectScale(`${t.section} ${(t.columns || []).join(' ')} ${pageText(mdText, t.page).slice(0, 2500)}`);
    const vals = t.rows.map((r) => parseNumber(r.values[j] ?? '')).filter((v) => v !== null);
    const sc = pickScale(Math.max(0, ...vals.map(Math.abs)), refM, textScale);
    const tside = sideOfTable(t);
    for (const r of t.rows) {
      const label = String(r.rawLabel || '').trim(); const v = parseNumber(r.values[j] ?? '');
      if (!label || v === null) continue;
      const nl = norm(label); const M = v * sc.mult;
      if (REV_TOTAL_RE.test(nl) && docRevenueTotal === null) docRevenueTotal = M;
      if (TOTAL_RE.test(nl)) continue;
      if (RESULT_RE.test(nl)) { docResult = M; continue; }
      const key = `${nl}|${Math.round(M * 1e6)}`; if (seenLabels.has(key)) continue; seenLabels.add(key);
      raw.push({ label, page: t.page, native: M, tside });
    }
  }
  if (!raw.length) return { ok: false, motivo: 'no se pudo ubicar la columna del ejercicio' };
  const bank = buildBank(generic, club, year);
  const lines = [];
  for (const r of raw) {
    const j = await askJev({ label: r.label, club, side: r.tside, examples: retrieve(bank, r.label, r.tside) });
    lines.push({ ...r, cat: j.choice || null, conf: j.confidence ?? 0, side: j.choice ? sideOfCat(j.choice) : null, error: j.error });
  }
  const sure = lines.filter((l) => l.cat && l.conf >= 0.9);
  const byCat = { revenue: {}, expense: {} };
  for (const l of sure) byCat[l.side][l.cat] = (byCat[l.side][l.cat] || 0) + Math.abs(l.native);
  return { ok: true, lines, byCat, docRevenueTotal, docResult, refM, nRows: lines.length, nSure: sure.length, needCriterion: lines.length - sure.length };
}

// ---------------------------------------------------------------- ejecución de herramientas
function run(script, argv) {
  return new Promise((res) => {
    const c = spawn('node', [resolve(root, script), ...argv], { cwd: root }); let out = '';
    c.stdout.on('data', (d) => { out += d; }); c.stderr.on('data', () => {});
    c.on('close', () => res(out)); c.on('error', () => res(''));
  });
}
async function briefingFor(club, year, md) {
  const out = resolve(root, md.replace(/\.md$/, '.briefing.json'));
  // El briefing en disco puede ser de antes de que se arreglaran las tools (palabras clave de idiomas, sumas): se rehace si es más viejo que ellas.
  const toolsMtime = Math.max(...['tools/prepare-onboarding.mjs', 'tools/extract-table-rows.mjs', 'tools/sum-check.mjs'].map((f) => statSync(resolve(root, f)).mtimeMs));
  if (!existsSync(out) || statSync(out).mtimeMs < toolsMtime || statSync(out).mtimeMs < statSync(resolve(root, md)).mtimeMs) await run('tools/prepare-onboarding.mjs', [club, String(year), resolve(root, md), '--out', out]);
  return JSON.parse(readFileSync(out, 'utf8'));
}

async function backtest() {
  const site = loadSite();
  const ledger = readFileSync(resolve(root, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  let cands = ledger.filter((e) => e.cargado && e.tieneMd && !e.pdf.includes('memoria') && !e.pdf.includes('presupuesto'));
  const jobs = [];
  await pool(cands, async (e) => {
    const q = JSON.parse((await run('tools/onboard.mjs', ['--quien', e.pdf])) || '{}');
    if (!q.clubId || !q.year || !site.generic[q.clubId]) return;
    const cd = site.generic[q.clubId];
    if (clubOnly && q.clubId !== clubOnly) return;
    if (!cd.revenueLinesByYear?.[q.year] || Object.keys(cd.revenueLinesByYear).length < 2) return; // hace falta el año en producción y al menos otro para el precedente
    jobs.push({ e, club: q.clubId, year: Number(q.year), cd });
  });
  // un mismo ejercicio puede tener varios .md (balance, memoria...): se evalúa cada uno y se queda el mejor
  // muestra al azar (semilla fija) y no los primeros de la lista, que son todos del mismo país
  let seed = 11; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  jobs.sort((a, b) => a.e.pdf.localeCompare(b.e.pdf)).sort(() => rnd() - 0.5);
  const jobsSel = limit > 0 ? jobs.slice(0, limit) : jobs;
  console.log(`${jobsSel.length} documentos de ejercicios ya cargados para reconstruir.`);
  const rows = [];
  await pool(jobsSel, async (j) => {
    const prod = j.cd.fiscalYearMeta?.[j.year] || {};
    let row = { pdf: j.e.pdf, club: j.club, year: j.year };
    try {
      let mdUsed = j.e.md;
      if (FRESH) {
        mdUsed = j.e.pdf.replace(/\.pdf$/i, '.mistral-redo.md');
        if (!existsSync(resolve(root, mdUsed))) await run('tools/mistral-ocr-transcribe.mjs', [resolve(root, j.e.pdf), '--out-suffix', '.mistral-redo']);
        if (!existsSync(resolve(root, mdUsed))) { rows.push({ ...row, motivo: 'Mistral no pudo transcribir' }); return; }
      }
      const b = await briefingFor(j.club, j.year, mdUsed);
      const p = await propose({ briefing: b, mdText: readFileSync(resolve(root, mdUsed), 'utf8'), clubData: j.cd, generic: site.generic, club: j.club, year: j.year });
      row = { ...row, ...p, lines: undefined };
      if (p.ok) {
        // producción por categoría (importes absolutos, en millones de moneda nativa)
        const prodCat = { revenue: {}, expense: {} };
        for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) for (const l of j.cd[key][j.year] || []) prodCat[side][l.normalizedCategory] = (prodCat[side][l.normalizedCategory] || 0) + Math.abs(l.amountNative);
        const overlap = (side) => { const P = prodCat[side]; const Q = p.byCat[side]; const tot = Object.values(P).reduce((a, x) => a + x, 0); if (!tot) return null; let m = 0; for (const [c, v] of Object.entries(P)) m += Math.min(v, Q[c] || 0); return m / tot; };
        row.prodRevenue = prod.officialTotalRevenue ?? null;
        row.dineroIngresosBienUbicado = overlap('revenue'); row.dineroGastosBienUbicado = overlap('expense');
        row.docTotalEsOficial = p.docRevenueTotal !== null && row.prodRevenue != null ? Math.abs(Math.abs(p.docRevenueTotal) - Math.abs(row.prodRevenue)) <= Math.max(0.01, Math.abs(row.prodRevenue) * 0.005) : null;
        row.resultadoEsOficial = p.docResult !== null && prod.officialPAT != null ? Math.abs(Math.abs(p.docResult) - Math.abs(prod.officialPAT)) <= Math.max(0.01, Math.abs(prod.officialPAT) * 0.005) : null;
        row.byCat = undefined;
      }
    } catch (err) { row.error = String(err.message).slice(0, 120); }
    rows.push(row);
  });
  report(rows);
}

async function pool(items, worker) {
  let i = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => { while (i < items.length) { const idx = i++; await worker(items[idx], idx); if (idx % 25 === 0) process.stdout.write(`  ${idx}/${items.length}\r`); } }));
}

function report(rows) {
  writeFileSync(resolve(root, 'Admin', 'test-proponer-carga.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  const ok = rows.filter((r) => r.ok);
  const cnt = (f) => ok.filter(f).length;
  const avg = (k) => { const x = ok.filter((r) => r[k] != null); return x.length ? (100 * x.reduce((a, r) => a + r[k], 0) / x.length).toFixed(0) + '%' : '-'; };
  const pct = (n, d) => (d ? `${(100 * n / d).toFixed(0)}%` : '-');
  const L = [];
  L.push('# Test de la etapa 5 (carga por script), versión 1: reconstrucción de ejercicios ya cargados', '');
  L.push(`Generado por \`tools/proponer-carga.mjs --backtest\` el ${new Date().toISOString().slice(0, 10)}. ${rows.length} documentos de ejercicios cargados. Jev categoriza cada fila con ejemplos que NO incluyen el ejercicio reconstruido; solo cuentan las filas con confianza ≥ 0,90.`, '');
  L.push('| Medida | Resultado |', '|---|---|');
  L.push(`| Se pudo armar una propuesta | ${ok.length} de ${rows.length} (${pct(ok.length, rows.length)}) |`);
  L.push(`| El total de ingresos detectado en el documento ES el oficial de producción (±0,5%) | ${cnt((r) => r.docTotalEsOficial)} de ${ok.length} (${pct(cnt((r) => r.docTotalEsOficial), ok.length)}) |`);
  L.push(`| El resultado del ejercicio detectado ES el oficial (±0,5%) | ${cnt((r) => r.resultadoEsOficial)} de ${ok.length} (${pct(cnt((r) => r.resultadoEsOficial), ok.length)}) |`);
  L.push(`| Dinero de INGRESOS de producción que quedó en la categoría correcta (media) | ${avg('dineroIngresosBienUbicado')} |`);
  L.push(`| Dinero de GASTOS de producción que quedó en la categoría correcta (media) | ${avg('dineroGastosBienUbicado')} |`);
  L.push(`| Filas con Jev ≥ 0,90 sobre el total de filas (media) | ${(100 * ok.reduce((a, r) => a + r.nSure / Math.max(1, r.nRows), 0) / Math.max(1, ok.length)).toFixed(0)}% |`, '');
  const mot = {}; for (const r of rows.filter((x) => !x.ok)) { const k = r.motivo || r.error || '?'; mot[k] = (mot[k] || 0) + 1; }
  L.push('Sin propuesta, por motivo: ' + (Object.entries(mot).map(([k, v]) => `${k}: ${v}`).join(' | ') || '-'), '');
  writeFileSync(resolve(root, 'Admin', 'test-proponer-carga.md'), L.join('\n') + '\n');
  console.log('\n' + L.slice(4, 13).join('\n'));
}

if (BACKTEST) await backtest();
else {
  const site = loadSite(); const pdf = flagVal('--pdf');
  const q = JSON.parse(await run('tools/onboard.mjs', ['--quien', pdf, ...(flagVal('--club') ? ['--club', flagVal('--club')] : [])]));
  const md = pdf.replace(/\.pdf$/i, '.md'); const cd = site.generic[q.clubId];
  if (!cd) { console.error(`El club ${q.clubId} no tiene data/<club>-data.js: la carga automática solo cubre un año nuevo de un club existente.`); process.exit(2); }
  const b = await briefingFor(q.clubId, q.year, md);
  const p = await propose({ briefing: b, mdText: readFileSync(resolve(root, md), 'utf8'), clubData: cd, generic: site.generic, club: q.clubId, year: q.year });
  console.log(JSON.stringify({ club: q.clubId, year: q.year, ...p, lines: p.lines?.slice(0, 40) }, null, 1));
}
