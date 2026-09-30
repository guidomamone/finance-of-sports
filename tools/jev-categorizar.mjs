#!/usr/bin/env node
// ============================================================================
// tools/jev-categorizar.mjs — la etapa de Jev: categoriza rubros con la API de Jev (typesafe.ai).
//
// Corre en tu terminal, 0 tokens de Claude Code. Jev es una IA barata y de volumen (~$42 por MIL MILLONES de tokens de entrada):
// para cada rubro (texto tal cual figura en el balance) devuelve la categoría del sitio (data/category-map.js), su confianza
// y las probabilidades por categoría. NO decide nada por sí sola: solo escribe resultados (Admin/jev/).
//
// DOS MODOS:
//
//   --backtest   ¿Es CONFIABLE Jev? (to-do 99). Toma rubros de ejercicios YA CARGADOS en el sitio, cuya categoría real ya
//                decidió una sesión con criterio humano, se los pregunta a Jev SIN mostrarle esa respuesta, y compara.
//                Lo que importa no es el acierto promedio: es si hay errores con confianza ALTA (el caso peligroso, el que
//                una integración automática aceptaría sin que nadie lo mire). Deja Admin/test-jev-resultados.md.
//                Muestra aleatoria (semilla fija) repartida entre categorías y clubes.
//
//   --listos     La etapa de producción: toma los `<md>.rubros.json` que dejó tools/pipeline.mjs (documentos `listo-para-jev`)
//                y deja al lado de cada uno `<md>.jev.json` con la categoría sugerida y la confianza de cada rubro.
//                No hay "verdad" contra qué comparar: sirve para mirar qué tan seguro está Jev en documentos nuevos.
//
// El lado (ingreso o gasto) NO se le dice a Jev: se le ofrecen las 26 categorías juntas y ella misma lo resuelve, como pasaría
// con un rubro sacado de un `.md` (extract-table-rows no sabe si una tabla es de recursos o de gastos). Con --lado-conocido se
// le ofrece solo la lista del lado que corresponde (para medir cuánto ayuda saberlo).
//
// USO:
//   node tools/jev-categorizar.mjs --backtest --limit 200            # 200 rubros ya cargados (~$0.01)
//   node tools/jev-categorizar.mjs --backtest --limit 0              # TODOS los rubros únicos cargados (miles)
//   node tools/jev-categorizar.mjs --listos [--limit 10]             # los documentos listo-para-jev (10 documentos)
//   Extras: --concurrencia 8, --semilla 7, --lado-conocido, --club river, --dry-run (muestra cuántas llamadas haría)
//
// Necesita Admin/jev/.env con JEV_API_KEY=... (gitignoreado).
// API: POST https://api.typesafe.ai/v1/systemone, Authorization: Bearer <key>, ver https://docs.typesafe.ai/
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flagVal = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const BACKTEST = args.includes('--backtest');
const LISTOS = args.includes('--listos');
const DRY = args.includes('--dry-run');
const SIDE_KNOWN = args.includes('--lado-conocido');
const limit = flagVal('--limit') !== null ? Number(flagVal('--limit')) : (BACKTEST ? 200 : 10);
const concurrency = Number(flagVal('--concurrencia') || 8);
const seed = Number(flagVal('--semilla') || 7);
const clubOnly = flagVal('--club');

if (!BACKTEST && !LISTOS) { console.error('Uso: node tools/jev-categorizar.mjs --backtest [--limit N]   o   --listos [--limit N]   (ver la cabecera del archivo)'); process.exit(1); }

const envPath = resolve(root, 'Admin', 'jev', '.env');
const readKey = () => {
  if (!existsSync(envPath)) throw new Error(`Falta ${envPath} con una línea JEV_API_KEY=...`);
  const line = readFileSync(envPath, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY='));
  if (!line || !line.slice(12).trim()) throw new Error(`No encontré JEV_API_KEY en ${envPath}`);
  return line.slice(12).trim();
};

// ---------------------------------------------------------------- categorías con descripción
// La descripción sale del propio data/category-map.js (etiqueta + el comentario de cada categoría), no se reescribe acá.
function loadCategories() {
  const src = readFileSync(resolve(root, 'data', 'category-map.js'), 'utf8');
  const block = (name) => { const a = src.indexOf(`const ${name} = [`); return src.slice(a, src.indexOf('];', a)); };
  const labels = (name) => { const a = src.indexOf(`const ${name} = {`); const b = src.slice(a, src.indexOf('};', a)); return Object.fromEntries([...b.matchAll(/^\s*([a-z_]+):\s*'([^']*)'/gm)].map((m) => [m[1], m[2]])); };
  const build = (arrName, labName) => {
    const lab = labels(labName); const out = {};
    for (const m of block(arrName).matchAll(/^\s*'([a-z_]+)',?\s*(?:\/\/\s*(.*))?$/gm)) {
      const comment = (m[2] || '').replace(/\(Versión \d+[^)]*\)/g, '').replace(/\s+/g, ' ').trim();
      const first = comment.split(/(?<=[.!?])\s/)[0].slice(0, 220);
      out[m[1]] = [lab[m[1]] || m[1], first].filter(Boolean).join(' — ');
    }
    return out;
  };
  return { revenue: build('REVENUE_CATEGORIES', 'REVENUE_CATEGORY_LABELS'), expense: build('EXPENSE_CATEGORIES', 'EXPENSE_CATEGORY_LABELS') };
}
const CATS = loadCategories();
const ALL = { ...Object.fromEntries(Object.entries(CATS.revenue).map(([k, v]) => [k, `INGRESO: ${v}`])), ...Object.fromEntries(Object.entries(CATS.expense).map(([k, v]) => [k, `GASTO: ${v}`])) };
const sideOf = (cat) => (cat in CATS.revenue ? 'revenue' : cat in CATS.expense ? 'expense' : '?');

// ---------------------------------------------------------------- llamada a Jev
let stopAll = null;
async function askJev(key, { label, section, club, side }) {
  const criteria = SIDE_KNOWN && side ? Object.fromEntries(Object.entries(ALL).filter(([k]) => sideOf(k) === side)) : ALL;
  const state = [`Rubro de un estado financiero de un club de fútbol${club ? ` (${club})` : ''}${section ? `, sección: ${section}` : ''}.`, `Texto del rubro, tal cual figura en el documento: "${label}"`].join('\n');
  const body = { state, model: 'jev-latest', questions: { categoria: { type: 'choice', instructions: 'Elegí la categoría de la lista a la que corresponde este rubro. Si no encaja en ninguna, elegí la más genérica (other_income / other_expenses).', criteria } } };
  for (let attempt = 0; attempt < 5; attempt++) {
    if (stopAll) return { error: stopAll };
    let res;
    try { res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(body) }); }
    catch (e) { await new Promise((r) => setTimeout(r, 2000 * (attempt + 1))); continue; }
    if (res.ok) {
      const j = await res.json(); const a = j.answers?.categoria;
      if (!a) return { error: `respuesta sin answers.categoria: ${JSON.stringify(j).slice(0, 200)}` };
      const probs = Object.entries(a.probabilities || {}).sort((x, y) => y[1] - x[1]).slice(0, 3);
      return { choice: a.choice, confidence: a.confidence, top3: probs, tokens: j.usage?.input_tokens ?? 0 };
    }
    const txt = (await res.text()).slice(0, 200);
    if (res.status === 401 || res.status === 402 || res.status === 403) { stopAll = `Jev respondió ${res.status} (clave o crédito): ${txt}`; return { error: stopAll }; }
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 3000 * (attempt + 1))); continue; }
    return { error: `HTTP ${res.status}: ${txt}` };
  }
  return { error: 'reintentos agotados' };
}

async function pool(items, worker) {
  let i = 0; let done = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (i < items.length && !stopAll) { const idx = i++; await worker(items[idx], idx); done++; if (done % 25 === 0) process.stdout.write(`  ${done}/${items.length}\r`); }
  }));
  process.stdout.write(`  ${done}/${items.length}\n`);
}

// ---------------------------------------------------------------- BACKTEST
function loadClubData() {
  const sandbox = { console, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...readdirSync(resolve(root, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f)];
  for (const rel of files) vm.runInContext(readFileSync(resolve(root, rel), 'utf8'), ctx, { filename: rel });
  return vm.runInContext('window.CLUB_GENERIC_DATA', ctx);
}
function rng(s) { let x = s >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }

async function backtest() {
  const data = loadClubData();
  const uniq = new Map(); // "lado|texto normalizado" -> {label, side, truth, club, conflict}
  for (const [club, d] of Object.entries(data)) {
    if (clubOnly && club !== clubOnly) continue;
    for (const [side, key] of [['revenue', 'revenueLinesByYear'], ['expense', 'expenseLinesByYear']]) {
      for (const lines of Object.values(d[key] || {})) for (const l of lines || []) {
        if (!l.rawLabel || !l.normalizedCategory) continue;
        const k = `${side}|${club}|${l.rawLabel.toLowerCase().replace(/\s+/g, ' ').trim()}`;
        const cur = uniq.get(k);
        if (!cur) uniq.set(k, { label: l.rawLabel.trim(), side, truth: l.normalizedCategory, club });
        else if (cur.truth !== l.normalizedCategory) cur.conflict = true;
      }
    }
  }
  let pool_ = [...uniq.values()].filter((x) => !x.conflict && sideOf(x.truth) === x.side);
  console.log(`${pool_.length} rubros únicos ya cargados (sin los que un club categorizó distinto en años distintos) de ${Object.keys(data).length} clubes.`);
  // muestra: se reparte parejo entre categorías, para no medir solo las categorías grandes (other_income, other_expenses)
  if (limit > 0 && pool_.length > limit) {
    const rnd = rng(seed); const byCat = new Map();
    for (const x of pool_) { if (!byCat.has(x.truth)) byCat.set(x.truth, []); byCat.get(x.truth).push(x); }
    for (const arr of byCat.values()) arr.sort(() => rnd() - 0.5);
    const out = []; const cats = [...byCat.values()];
    while (out.length < limit && cats.some((a) => a.length)) for (const a of cats) if (a.length && out.length < limit) out.push(a.pop());
    pool_ = out;
  }
  console.log(`Muestra: ${pool_.length} rubros. ${DRY ? '(dry-run, no llamo a Jev)' : ''}`);
  if (DRY) return;
  const key = readKey(); const outPath = resolve(root, 'Admin', 'jev', 'backtest.jsonl'); const rows = [];
  await pool(pool_, async (x) => {
    const r = await askJev(key, { label: x.label, club: x.club, side: x.side });
    const row = { ts: new Date().toISOString(), club: x.club, side: x.side, label: x.label, truth: x.truth, ...r };
    rows.push(row); appendFileSync(outPath, JSON.stringify(row) + '\n');
  });
  if (stopAll) console.log(`\nDETENIDO: ${stopAll}`);
  report(rows.filter((r) => !r.error), rows.filter((r) => r.error).length);
}

function report(rows, errors) {
  const bins = [['≥ 0,90', 0.9, 1.01], ['0,70 – 0,90', 0.7, 0.9], ['0,50 – 0,70', 0.5, 0.7], ['< 0,50', 0, 0.5]];
  const ok = (r) => r.choice === r.truth;
  const lines = [];
  lines.push('# Test de confiabilidad de Jev (backtest contra rubros ya cargados)', '');
  lines.push(`Generado por \`tools/jev-categorizar.mjs --backtest\` el ${new Date().toISOString().slice(0, 10)}. ${rows.length} rubros con respuesta${errors ? ` (${errors} con error de la API)` : ''}; la "verdad" es la categoría que una sesión humana ya asignó y está en producción.`);
  lines.push(`Modo: ${SIDE_KNOWN ? 'lado conocido (solo las categorías del lado correcto)' : 'lado desconocido (las 26 categorías juntas)'}.`, '');
  lines.push(`**Acierto total: ${rows.filter(ok).length}/${rows.length} (${(100 * rows.filter(ok).length / Math.max(1, rows.length)).toFixed(1)}%)**`, '');
  lines.push('| Confianza de Jev | Rubros | Aciertos | % |', '|---|---|---|---|');
  for (const [name, lo, hi] of bins) { const g = rows.filter((r) => r.confidence >= lo && r.confidence < hi); lines.push(`| ${name} | ${g.length} | ${g.filter(ok).length} | ${g.length ? (100 * g.filter(ok).length / g.length).toFixed(1) : '-'}% |`); }
  const side = rows.filter((r) => sideOf(r.choice) !== r.side);
  lines.push('', `Rubros donde Jev eligió una categoría del LADO equivocado (ingreso vs gasto): ${side.length}.`, '');
  const bad = rows.filter((r) => !ok(r) && r.confidence >= 0.7).sort((a, b) => b.confidence - a.confidence);
  lines.push(`## Errores con confianza ≥ 0,70 (el caso peligroso): ${bad.length}`, '');
  lines.push('| Club | Rubro | Real | Jev | Conf. |', '|---|---|---|---|---|');
  for (const r of bad.slice(0, 60)) lines.push(`| ${r.club} | ${String(r.label).replace(/\|/g, '/').slice(0, 70)} | ${r.truth} | ${r.choice} | ${Number(r.confidence).toFixed(2)} |`);
  const byTruth = {};
  for (const r of rows) { (byTruth[r.truth] ||= { n: 0, ok: 0 }); byTruth[r.truth].n++; if (ok(r)) byTruth[r.truth].ok++; }
  lines.push('', '## Acierto por categoría real', '', '| Categoría | Rubros | Aciertos |', '|---|---|---|');
  for (const [k, v] of Object.entries(byTruth).sort((a, b) => b[1].n - a[1].n)) lines.push(`| ${k} | ${v.n} | ${v.ok} |`);
  writeFileSync(resolve(root, 'Admin', 'test-jev-resultados.md'), lines.join('\n') + '\n');
  console.log(lines.slice(0, 14).join('\n'));
  console.log(`\nErrores con confianza ≥ 0,70: ${bad.length}. Informe completo en Admin/test-jev-resultados.md`);
}

// ---------------------------------------------------------------- LISTOS
async function listos() {
  const ledger = existsSync(resolve(root, 'Admin', 'transcripciones-estado.jsonl')) ? readFileSync(resolve(root, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
  let docs = ledger.filter((e) => e.jev === 'listo-para-jev' && existsSync(resolve(root, e.md.replace(/\.md$/, '.rubros.json'))) && !existsSync(resolve(root, e.md.replace(/\.md$/, '.jev.json'))));
  if (limit > 0) docs = docs.slice(0, limit);
  console.log(`${docs.length} documento(s) listo-para-jev sin categorizar.${DRY ? ' (dry-run)' : ''}`);
  if (DRY || !docs.length) return;
  const key = readKey(); let total = 0;
  for (const e of docs) {
    const rj = JSON.parse(readFileSync(resolve(root, e.md.replace(/\.md$/, '.rubros.json')), 'utf8'));
    const uniqLabels = [...new Map(rj.rubros.map((r) => [r.label.toLowerCase(), r])).values()];
    const results = [];
    await pool(uniqLabels, async (r) => { results.push({ label: r.label, page: r.page, section: r.section, ...(await askJev(key, { label: r.label, section: r.section, club: rj.club })) }); });
    if (stopAll) { console.log(`\nDETENIDO: ${stopAll}`); break; }
    writeFileSync(resolve(root, e.md.replace(/\.md$/, '.jev.json')), JSON.stringify({ md: e.md, generatedAt: new Date().toISOString(), rubros: results }, null, 1));
    const hi = results.filter((r) => r.confidence >= 0.9).length;
    total += results.length;
    console.log(`  ${e.pdf.split('/').slice(-2).join('/')}: ${results.length} rubros únicos, ${hi} con confianza ≥ 0,90, ${results.filter((r) => r.error).length} con error`);
  }
  console.log(`\nListo: ${total} rubros categorizados por Jev. Resultados en <md>.jev.json (gitignoreado).`);
}

if (BACKTEST) await backtest(); else await listos();
