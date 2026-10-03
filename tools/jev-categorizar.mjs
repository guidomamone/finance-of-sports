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
//                una integración automática aceptaría sin que nadie lo mire). Deja Admin/tests/test-jev-resultados.md.
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
//   Extras: --concurrencia 8, --semilla 7, --lado-conocido, --ejemplos 8 (le muestra 8 rubros parecidos ya categorizados),
//           --sin-mismo-club (los ejemplos salen solo de otros clubes: el caso de un club nuevo), --etiqueta _nombre (no pisa el informe de otra variante), --club river, --dry-run
//
// Necesita Admin/jev/.env con JEV_API_KEY=... (gitignoreado).
// API: POST https://api.typesafe.ai/v1/systemone, Authorization: Bearer <key>, ver https://docs.typesafe.ai/
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync } from 'node:fs';
import { huellaRubros, jevAlDia, leerLista } from './huellas.mjs';
import { resolve } from 'node:path';
import { abrirCache } from './respuestas-cache.mjs';
import { derivado, ubicar } from './rutas.mjs';
import { lineasAprendidas } from './memoria-categorias.mjs';
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
const K_EXAMPLES = Number(flagVal('--ejemplos') ?? (LISTOS ? 8 : 0)); // rubros parecidos ya categorizados que se le muestran a Jev (0 = ninguno)
const NO_SAME_CLUB = args.includes('--sin-mismo-club'); // ejemplos solo de OTROS clubes: mide el caso difícil (club nuevo, sin historia propia)
const tag = flagVal('--etiqueta') || ''; // sufijo para no pisar el informe de otra variante

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
async function askJev(key, { label, section, club, side, examples, useSide }) {
  const criteria = (SIDE_KNOWN || useSide) && side ? Object.fromEntries(Object.entries(ALL).filter(([k]) => sideOf(k) === side)) : ALL;
  const exText = examples && examples.length ? `Ejemplos de rubros parecidos que ya están categorizados en el sitio (los clubes tienen convenciones propias; guiate por ellos):\n${examples.map((x) => `- "${x.label}" (${x.club}) -> ${x.truth}`).join('\n')}\n` : '';
  const state = [`Rubro de un estado financiero de un club de fútbol${club ? ` (${club})` : ''}${section ? `, sección: ${section}` : ''}.`, exText, `Texto del rubro, tal cual figura en el documento: "${label}"`].filter(Boolean).join('\n');
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
const words = (t) => new Set(String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9]+/).filter((w) => w.length > 2));
function makeRetriever(bank) {
  const prepared = bank.map((b) => ({ ...b, w: words(b.label), key: `${b.club}|${b.label.toLowerCase().replace(/\s+/g, ' ').trim()}` }));
  return (q) => {
    const qw = words(q.label); const qkey = `${q.club}|${q.label.toLowerCase().replace(/\s+/g, ' ').trim()}`;
    const scored = [];
    for (const b of prepared) {
      if (NO_SAME_CLUB && b.club === q.club) continue;
      if (b.key === qkey) continue; // nunca el mismo rubro del mismo club (sería la respuesta: eso lo cubre el precedente exacto)
      if ((SIDE_KNOWN || q.useSide) && q.side && b.side !== q.side) continue;
      let inter = 0; for (const w of qw) if (b.w.has(w)) inter++;
      if (!inter) continue;
      scored.push([inter / (qw.size + b.w.size - inter), b]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    const seen = new Set(); const out = [];
    for (const [, b] of scored) { const k = `${b.label.toLowerCase()}|${b.truth}`; if (seen.has(k)) continue; seen.add(k); out.push(b); if (out.length >= K_EXAMPLES) break; }
    return out;
  };
}
function rng(s) { let x = s >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }

function buildBank(data) {
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
  return uniq;
}

async function backtest() {
  const data = loadClubData();
  const uniq = buildBank(data);
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
  const key = readKey(); const outPath = resolve(root, 'Admin', 'jev', `backtest${tag}.jsonl`); const rows = [];
  const retrieve = K_EXAMPLES ? makeRetriever([...uniq.values()].filter((x) => !x.conflict)) : null;
  await pool(pool_, async (x) => {
    const r = await askJev(key, { label: x.label, club: x.club, side: x.side, examples: retrieve ? retrieve(x) : null });
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
  lines.push(`Modo: ${SIDE_KNOWN ? 'lado conocido (solo las categorías del lado correcto)' : 'lado desconocido (las 26 categorías juntas)'}${K_EXAMPLES ? `; con ${K_EXAMPLES} ejemplos parecidos ya categorizados${NO_SAME_CLUB ? ' (solo de OTROS clubes)' : ' (también del mismo club)'}` : '; sin ejemplos'}.`, '');
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
  writeFileSync(resolve(root, 'Admin', 'tests', `test-jev-resultados${tag}.md`), lines.join('\n') + '\n');
  console.log(lines.slice(0, 14).join('\n'));
  console.log(`\nErrores con confianza ≥ 0,70: ${bad.length}. Informe completo en Admin/tests/test-jev-resultados${tag}.md`);
}

// ---------------------------------------------------------------- LISTOS
async function listos() {
  const ledger = existsSync(resolve(root, 'Admin', 'transcripciones-estado.jsonl')) ? readFileSync(resolve(root, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
  // Trabajo = documentos `listo-para-jev` cuyo .jev.json falta o se hizo sobre OTRA lista de rubros (huella distinta, ver tools/huellas.mjs:
  // antes se miraba solo si el archivo existía, y 438 listas re-preparadas quedaron con categorías de la versión vieja).
  // `--lista <archivo>`: solo esos PDFs (lo usa pipeline.mjs para que la etapa 5 toque SOLO los documentos de la corrida).
  const lista = flagVal('--lista') ? leerLista(resolve(root, flagVal('--lista'))) : null;
  let docs = ledger.filter((e) => e.jev === 'listo-para-jev' && (!lista || lista.has(e.pdf)) && existsSync(resolve(root, derivado(e.md, '.rubros.json'))) && !jevAlDia(resolve(root, e.md)));
  if (limit > 0) docs = docs.slice(0, limit);
  console.log(`${docs.length} documento(s) listo-para-jev sin categorizar o con la categorización desactualizada.${DRY ? ' (dry-run)' : ''}`);
  if (DRY || !docs.length) return;
  const key = readKey(); let total = 0;
  // Ejemplos parecidos ya categorizados en el sitio (de todos los clubes) y, cuando el documento indica si la tabla es de
  // ingresos o de gastos, solo las categorías de ese lado: son las dos mejoras que llevaron el acierto de 69,5% a 86,6%.
  // Versión 319: a los ejemplos de lo cargado en el sitio se suman los rubros que Claude ya resolvió con confianza >= 0,80
  // (tools/memoria-categorias.mjs): así Jev ve la respuesta que le faltaba la vez anterior. Producción gana si el mismo rubro está en las dos.
  // (El --backtest NO los usa: mediría con respuestas de Claude sobre esos mismos rubros.)
  const banco = buildBank(loadClubData());
  const prodLineas = [...banco.values()].map((x) => ({ club: x.club, side: x.side, label: x.label }));
  for (const l of lineasAprendidas({ produccion: prodLineas })) { const k = `${l.side}|${l.club}|${l.label.toLowerCase().replace(/\s+/g, ' ').trim()}`; if (!banco.has(k)) banco.set(k, { label: l.label, side: l.side, truth: l.cat, club: l.club, aprendido: true }); }
  const retrieve = K_EXAMPLES ? makeRetriever([...banco.values()].filter((x) => !x.conflict)) : null;
  // Memoria de respuestas (Versión 321, tools/respuestas-cache.mjs): un rubro que Jev ya contestó para este club y lado no se vuelve a preguntar
  // (ni se paga, ni cambia de respuesta entre corridas). `--sin-cache` pregunta todo de nuevo.
  const cache = abrirCache('jev'); const SIN_CACHE = args.includes('--sin-cache'); let desdeCache = 0;
  for (const e of docs) {
    const rj = JSON.parse(readFileSync(resolve(root, derivado(e.md, '.rubros.json')), 'utf8'));
    const uniqLabels = [...new Map(rj.rubros.map((r) => [r.label.toLowerCase(), r])).values()];
    const results = [];
    await pool(uniqLabels, async (r) => {
      const base = { label: r.label, lado: r.lado || null, page: r.page, section: r.section };
      const guardada = SIN_CACHE ? null : cache.get(rj.club, r.lado, r.label);
      if (guardada) { desdeCache++; results.push({ ...base, ...guardada, desdeCache: true }); return; }
      const useSide = Boolean(r.lado);
      // Con glosa en español (tools/glosar-rubros.mjs) Jev lee el rubro original + su traducción, y la búsqueda de ejemplos parecidos tiene palabras en común con el sitio.
      const q = { label: r.glosa && r.glosa !== r.label ? `${r.label} (= ${r.glosa})` : r.label, club: rj.club, side: r.lado || null, useSide };
      const resp = await askJev(key, { ...q, section: r.section, examples: retrieve ? retrieve(q) : null });
      if (!resp.error && resp.choice) cache.set(rj.club, r.lado, r.label, { choice: resp.choice, confidence: resp.confidence ?? null });
      results.push({ ...base, ...resp });
    });
    if (stopAll) { console.log(`\nDETENIDO: ${stopAll}`); break; }
    writeFileSync(resolve(root, derivado(e.md, '.jev.json')), JSON.stringify({ md: e.md, generatedAt: new Date().toISOString(), rubrosHuella: huellaRubros(rj), rubros: results }, null, 1));
    const hi = results.filter((r) => r.confidence >= 0.9).length;
    total += results.length;
    console.log(`  ${e.pdf.split('/').slice(-2).join('/')}: ${results.length} rubros únicos, ${hi} con confianza ≥ 0,90, ${results.filter((r) => r.error).length} con error`);
  }
  console.log(`\nListo: ${total} rubros categorizados por Jev (${desdeCache} sin preguntar: ya estaban en Generados/_cache/jev.jsonl). Resultados en <md>.jev.json (gitignoreado).`);
}

if (BACKTEST) await backtest(); else await listos();
