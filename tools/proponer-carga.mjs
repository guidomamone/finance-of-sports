#!/usr/bin/env node
// ============================================================================
// tools/proponer-carga.mjs — etapa 5 del pipeline, versión 0: MIDE si un script puede reconstruir un ejercicio a partir del
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
//   4. Cada rubro se busca, por texto exacto, en los OTROS años del mismo club: si está, hereda lado y categoría (precedente);
//      si no, queda "necesita criterio" (en una versión siguiente lo decide Jev y, si duda, Claude por API).
//   5. Detecta en el documento la fila de total de ingresos y la del resultado del ejercicio.
//   6. Compara contra producción: ¿el total de ingresos detectado es el oficial? ¿los rubros propuestos suman ese total?
//
// USO:
//   node tools/proponer-carga.mjs --backtest [--limit 40] [--club id] [--concurrencia 4]
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

// ---------------------------------------------------------------- precedente (solo de OTROS años)
function buildPrecedent(club, excludeYear) {
  const m = { revenue: new Map(), expense: new Map() };
  for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) {
    for (const [yr, lines] of Object.entries(club[key] || {})) {
      if (Number(yr) === Number(excludeYear)) continue;
      for (const l of lines || []) { const k = norm(l.rawLabel); if (k && !m[side].has(k)) m[side].set(k, l.normalizedCategory); }
    }
  }
  return m;
}

// ---------------------------------------------------------------- la propuesta
function propose({ briefing, mdText, clubData, year }) {
  const tables = (briefing.tables || []).filter((t) => t.likelyRelevant && STATEMENT_RE.test(norm(`${t.section || ''} ${(t.columns || []).join(' ')}`)));
  if (!tables.length) return { ok: false, motivo: 'sin estado de resultados' };
  const prec = buildPrecedent(clubData, year);
  const lines = []; let docRevenueTotal = null; let docResult = null; const scales = new Set();
  for (const t of tables) {
    const j = yearColumn(t, year);
    if (j === null) continue;
    const sc = detectScale(`${t.section} ${(t.columns || []).join(' ')} ${pageText(mdText, t.page).slice(0, 2500)}`);
    scales.add(sc.unit);
    for (const r of t.rows) {
      const label = String(r.rawLabel || '').trim(); const v = parseNumber(r.values[j] ?? '');
      if (!label || v === null) continue;
      const nl = norm(label); const M = v * sc.mult;
      if (TOTAL_RE.test(nl) || REV_TOTAL_RE.test(nl)) { if (REV_TOTAL_RE.test(nl) && docRevenueTotal === null) docRevenueTotal = M; if (TOTAL_RE.test(nl)) continue; }
      if (RESULT_RE.test(nl)) { docResult = M; continue; }
      const r1 = prec.revenue.get(nl); const r2 = prec.expense.get(nl);
      let side = null; let cat = null;
      if (r1 && !r2) { side = 'revenue'; cat = r1; } else if (r2 && !r1) { side = 'expense'; cat = r2; } else if (r1 && r2) { side = 'ambiguo'; }
      lines.push({ label, page: t.page, native: M, side, cat, precedent: Boolean(cat) });
    }
  }
  if (!lines.length) return { ok: false, motivo: 'no se pudo ubicar la columna del ejercicio' };
  const withCat = lines.filter((l) => l.side === 'revenue' || l.side === 'expense');
  const revenueSum = withCat.filter((l) => l.side === 'revenue').reduce((a, l) => a + Math.abs(l.native), 0);
  return { ok: true, lines, revenueSum, docRevenueTotal, docResult, scales: [...scales], precedentShare: withCat.length / lines.length, needCriterion: lines.length - withCat.length };
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
      const b = await briefingFor(j.club, j.year, j.e.md);
      const p = propose({ briefing: b, mdText: readFileSync(resolve(root, j.e.md), 'utf8'), clubData: j.cd, year: j.year });
      row = { ...row, ...p, lines: undefined, nLines: p.lines?.length ?? 0 };
      if (p.ok) {
        const off = prod.officialTotalRevenue;
        row.prodRevenue = off ?? null;
        row.docTotalEsOficial = p.docRevenueTotal !== null && off != null ? Math.abs(Math.abs(p.docRevenueTotal) - Math.abs(off)) <= Math.max(0.01, Math.abs(off) * 0.0005) : null;
        row.rubrosSumanElTotal = p.docRevenueTotal !== null && p.revenueSum > 0 ? Math.abs(p.revenueSum - Math.abs(p.docRevenueTotal)) <= Math.max(0.01, Math.abs(p.docRevenueTotal) * 0.0005) : null;
        row.resultadoEsOficial = p.docResult !== null && prod.officialPAT != null ? Math.abs(Math.abs(p.docResult) - Math.abs(prod.officialPAT)) <= Math.max(0.01, Math.abs(prod.officialPAT) * 0.0005) : null;
        row.rubrosPropiosProduccion = new Set([...(j.cd.revenueLinesByYear[j.year] || []), ...(j.cd.expenseLinesByYear[j.year] || [])].map((l) => norm(l.rawLabel)));
        const mine = new Set(p.lines.map((l) => norm(l.label)));
        row.coberturaDeRubros = [...row.rubrosPropiosProduccion].filter((x) => mine.has(x)).length / Math.max(1, row.rubrosPropiosProduccion.size);
        row.rubrosPropiosProduccion = undefined;
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
  const L = [];
  L.push('# Test de la etapa 5 (carga por script): reconstrucción de ejercicios ya cargados', '');
  L.push(`Generado por \`tools/proponer-carga.mjs --backtest\` el ${new Date().toISOString().slice(0, 10)}. ${rows.length} documentos de ejercicios cargados; el precedente sale solo de los OTROS años del mismo club.`, '');
  L.push('| Medida | Documentos | % |', '|---|---|---|');
  const pct = (n, d) => (d ? `${(100 * n / d).toFixed(0)}%` : '-');
  L.push(`| Se pudo armar una propuesta (hay estado de resultados y columna del año) | ${ok.length} | ${pct(ok.length, rows.length)} |`);
  L.push(`| El total de ingresos que detectó en el documento ES el oficial de producción | ${cnt((r) => r.docTotalEsOficial)} | ${pct(cnt((r) => r.docTotalEsOficial), ok.length)} |`);
  L.push(`| Los rubros que propone (con precedente) suman ese total | ${cnt((r) => r.rubrosSumanElTotal)} | ${pct(cnt((r) => r.rubrosSumanElTotal), ok.length)} |`);
  L.push(`| El resultado del ejercicio que detectó ES el oficial | ${cnt((r) => r.resultadoEsOficial)} | ${pct(cnt((r) => r.resultadoEsOficial), ok.length)} |`);
  L.push(`| Todos los rubros con precedente exacto (nada que decidir) | ${cnt((r) => r.needCriterion === 0)} | ${pct(cnt((r) => r.needCriterion === 0), ok.length)} |`);
  const cov = ok.filter((r) => r.coberturaDeRubros !== undefined);
  L.push(`| Cobertura media de los rubros de producción por los que detectó | ${(100 * cov.reduce((a, r) => a + r.coberturaDeRubros, 0) / Math.max(1, cov.length)).toFixed(0)}% | |`, '');
  const mot = {}; for (const r of rows.filter((x) => !x.ok)) { const k = r.motivo || r.error || '?'; mot[k] = (mot[k] || 0) + 1; }
  L.push('Sin propuesta, por motivo: ' + Object.entries(mot).map(([k, v]) => `${k}: ${v}`).join(' | '), '');
  writeFileSync(resolve(root, 'Admin', 'test-proponer-carga.md'), L.join('\n') + '\n');
  console.log('\n' + L.slice(4, 14).join('\n'));
}

if (BACKTEST) await backtest();
else {
  const site = loadSite(); const pdf = flagVal('--pdf');
  const q = JSON.parse(await run('tools/onboard.mjs', ['--quien', pdf, ...(flagVal('--club') ? ['--club', flagVal('--club')] : [])]));
  const md = pdf.replace(/\.pdf$/i, '.md'); const cd = site.generic[q.clubId];
  if (!cd) { console.error(`El club ${q.clubId} no tiene data/<club>-data.js: la carga automática solo cubre un año nuevo de un club existente.`); process.exit(2); }
  const b = await briefingFor(q.clubId, q.year, md);
  const p = propose({ briefing: b, mdText: readFileSync(resolve(root, md), 'utf8'), clubData: cd, year: q.year });
  console.log(JSON.stringify({ club: q.clubId, year: q.year, ...p, lines: p.lines?.slice(0, 40) }, null, 1));
}
