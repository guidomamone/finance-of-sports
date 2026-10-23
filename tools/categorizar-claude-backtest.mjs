// ============================================================================
// tools/categorizar-claude-backtest.mjs — el backtest de la categorización por Claude contra lo ya cargado y su informe
// Mudado de tools/categorizar-claude.mjs sin cambiar una línea (salvo `export`); tools/categorizar-claude.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { SESION } from './sesion.mjs';
import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { sideOf, loadClubData, norm, allLines, makeRetriever, systemPrompt, readKey, categorizarConClaude } from './categorizar-claude.mjs';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'Admin', 'mediciones', 'backtests', 'categorizar-claude');
const NOT_A_LINE = 'no_es_rubro';

// ---------------------------------------------------------------------------------------------------------
function rng(s) { let x = s >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; }
export const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);

// Arma los documentos (club-año) del backtest: cada rubro de Jev < umbral se asigna al ejercicio más reciente del club
// que tiene ese texto; las filas del documento son las líneas de ese club-año en el orden del data/*.js.
function buildBacktestDocs(opt) {
  const data = loadClubData(); const lines = allLines(data);
  const jev = readJsonl(resolve(root, opt.jevJsonl)).filter((r) => !r.error);
  const jevBy = new Map(jev.map((r) => [`${r.club}|${r.side}|${norm(r.label)}`, r]));
  const low = jev.filter((r) => r.confidence < opt.umbral);
  const docs = new Map();
  for (const r of low) {
    const ys = [...new Set(lines.filter((l) => l.club === r.club && l.side === r.side && norm(l.label) === norm(r.label)).map((l) => l.year))].sort();
    if (!ys.length) continue;
    const key = `${r.club}|${ys.at(-1)}`;
    if (!docs.has(key)) docs.set(key, { club: r.club, year: ys.at(-1), pend: [] });
    docs.get(key).pend.push(r);
  }
  for (const d of docs.values()) {
    const pendKeys = new Set(d.pend.map((r) => `${r.side}|${norm(r.label)}`));
    const seen = new Set();
    d.rubros = lines.filter((l) => l.club === d.club && l.year === d.year).filter((l) => { const k = `${l.side}|${norm(l.label)}`; if (seen.has(k)) return false; seen.add(k); return true; }).map((l) => {
      const k = `${l.side}|${norm(l.label)}`;
      const j = jevBy.get(`${l.club}|${k}`);
      if (pendKeys.has(k)) return { label: l.label, lado: l.side, pendiente: true, truth: j.truth, jev: j.choice, jevConf: j.confidence };
      // Fila de contexto: si Jev la resolvió con confianza alta, se muestra la categoría DE JEV (lo que habría en producción); si no, sin categoría.
      return { label: l.label, lado: l.side, pendiente: false, ya: j && j.confidence >= opt.umbral ? j.choice : undefined };
    });
    d.excludeLabels = pendKeys;
  }
  return { docs: [...docs.values()], lines, jev };
}

export async function backtest(opt) {
  const { docs, lines } = buildBacktestDocs(opt);
  const rnd = rng(opt.seed);
  const order = docs.map((d) => [rnd(), d]).sort((a, b) => a[0] - b[0]).map(([, d]) => d); // orden aleatorio fijo por semilla
  let sel = []; let n = 0;
  for (const d of order) { if (opt.limit > 0 && n >= opt.limit) break; sel.push(d); n += d.pend.length; }
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, `backtest${opt.tag}.jsonl`);
  const done = new Set(readJsonl(outPath).filter((r) => r.categoria !== undefined).map((r) => `${r.club}|${r.year}`));
  const todo = sel.filter((d) => !done.has(`${d.club}|${d.year}`));
  console.log(`${docs.length} club-años con rubros de Jev < ${opt.umbral} (${docs.reduce((a, d) => a + d.pend.length, 0)} rubros). Selección: ${sel.length} club-años / ${n} rubros; ya hechos: ${sel.length - todo.length}. Modelo ${opt.modelo}, esfuerzo ${opt.esfuerzo}, contexto del club: ${opt.sinClub ? 'NO' : 'sí'}.`);
  const retriever = makeRetriever(lines);
  if (opt.dry) {
    let chars = 0;
    for (const d of todo) { const r = await categorizarConClaude({ club: d.club, year: d.year, rubros: d.rubros, contextoClub: !opt.sinClub, excludeYear: d.year, excludeLabels: d.excludeLabels, lines, retriever, dryRun: true }); chars += r.userChars; if (d === todo[0]) { console.log(`--- sistema: ${r.systemChars} chars; ejemplo de mensaje (${d.club} ${d.year}) ---\n${r.user}\n---`); } }
    const sys = systemPrompt().length;
    console.log(`Estimación gruesa (4 chars/token): sistema ~${Math.round(sys / 4)} tokens por llamada; usuario ~${Math.round(chars / 4)} tokens en total (${Math.round(chars / 4 / Math.max(1, todo.length))} por llamada).`);
    return;
  }
  const apiKey = readKey(); let cost = 0; let i = 0; let doneN = 0;
  await Promise.all(Array.from({ length: opt.conc }, async () => {
    while (i < todo.length) {
      const d = todo[i++];
      const r = await categorizarConClaude({ club: d.club, year: d.year, rubros: d.rubros, modelo: opt.modelo, esfuerzo: opt.esfuerzo, contextoClub: !opt.sinClub, excludeYear: d.year, excludeLabels: d.excludeLabels, lines, retriever, apiKey });
      cost += r.costUsd || 0; doneN++;
      if (r.error) { console.log(`  ERROR ${d.club} ${d.year}: ${r.error.slice(0, 200)}`); appendFileSync(outPath, JSON.stringify({ club: d.club, year: d.year, error: r.error }) + '\n'); continue; }
      const perRubro = (r.costUsd || 0) / Math.max(1, r.resultados.length);
      for (const x of r.resultados) {
        const src = d.rubros[x.idx];
        appendFileSync(outPath, JSON.stringify({ ts: new Date().toISOString(), sesion: SESION, club: d.club, year: d.year, side: src.lado, label: src.label, truth: src.truth, jev: src.jev, jevConf: src.jevConf, categoria: x.categoria, confianza: x.confianza, motivo: x.motivo, model: r.model, costUsd: Number(perRubro.toFixed(6)), docRubros: r.resultados.length, docCost: Number((r.costUsd || 0).toFixed(6)), usage: r.usage }) + '\n');
      }
      console.log(`  ${doneN}/${todo.length} ${d.club} ${d.year}: ${r.resultados.length} rubros, ${r.resultados.filter((x) => x.categoria === src0(d, x)).length} aciertos, $${(r.costUsd || 0).toFixed(4)} (acumulado $${cost.toFixed(3)})`);
    }
  }));
  console.log(`\nCosto de esta corrida: $${cost.toFixed(3)}. Resultados en ${outPath.replace(root + '/', '')}.`);
  informe(opt);
}
const src0 = (d, x) => d.rubros[x.idx].truth;

// ---------------------------------------------------------------------------------------------------------
// INFORME: tablas sobre el .jsonl del backtest (sin API). La "verdad" es producción: a veces una convención curada
// discutible; los pares de categorías vecinas de abajo se cuentan aparte como "discrepancia de convención".
const CONVENTION_PAIRS = [
  ['other_income', 'lump_football_operations'], ['admin_general_expense', 'other_expenses'], ['depreciation', 'other_amortisation'],
  ['member_dues', 'season_tickets'], ['matchday_competition', 'competition_bonus'], ['stadium_other', 'other_income'],
  ['sponsorship_commercial', 'other_income'], ['other_amortisation', 'exceptional_items'], ['other_expenses', 'exceptional_items'],
  ['youth_other_sports_expense', 'admin_general_expense'], ['match_organisation_expense', 'admin_general_expense'], ['match_organisation_expense', 'wages_squad'],
  ['other_sports', 'other_income'], ['youth_football', 'player_sales'], ['lump_football_operations_expense', 'other_expenses'],
].map((p) => p.sort().join('~'));
export const isConventionPair = (a, b) => CONVENTION_PAIRS.includes([a, b].sort().join('~'));

export function informe(opt) {
  const rows = readJsonl(resolve(outDir, `backtest${opt.tag}.jsonl`)).filter((r) => r.categoria !== undefined && r.truth);
  if (!rows.length) { console.log('Sin filas en el backtest.'); return; }
  const ok = (r) => r.categoria === r.truth;
  const pct = (a, b) => (b ? `${(100 * a / b).toFixed(1)}%` : '-');
  const docs = new Map(); for (const r of rows) docs.set(`${r.club}|${r.year}`, r.docCost || 0);
  const cost = [...docs.values()].reduce((a, b) => a + b, 0);
  console.log(`\n== Backtest Claude${opt.tag ? ` (${opt.tag})` : ''}: ${rows.length} rubros, ${docs.size} club-años, modelo(s) ${[...new Set(rows.map((r) => r.model))].join(', ')} ==`);
  console.log(`Acierto Claude: ${rows.filter(ok).length}/${rows.length} (${pct(rows.filter(ok).length, rows.length)}); Jev en esos mismos rubros: ${rows.filter((r) => r.jev === r.truth).length} (${pct(rows.filter((r) => r.jev === r.truth).length, rows.length)})`);
  console.log(`Costo: $${cost.toFixed(3)} -> $${(cost / rows.length).toFixed(4)} por rubro, $${(cost / docs.size).toFixed(4)} por club-año`);
  for (const [name, lo, hi] of [['>= 0,95', 0.95, 2], ['0,90-0,95', 0.9, 0.95], ['0,80-0,90', 0.8, 0.9], ['0,60-0,80', 0.6, 0.8], ['< 0,60', -1, 0.6]]) {
    const g = rows.filter((r) => r.confianza >= lo && r.confianza < hi); console.log(`  conf ${name}: ${g.length} rubros, ${pct(g.filter(ok).length, g.length)}`);
  }
  for (const [name, lo, hi] of [['Jev 0,70-0,90', 0.7, 0.9], ['Jev 0,50-0,70', 0.5, 0.7], ['Jev < 0,50', 0, 0.5]]) {
    const g = rows.filter((r) => r.jevConf >= lo && r.jevConf < hi); console.log(`  ${name}: ${g.length} rubros, Claude ${pct(g.filter(ok).length, g.length)}, Jev ${pct(g.filter((r) => r.jev === r.truth).length, g.length)}`);
  }
  const bad = rows.filter((r) => !ok(r));
  console.log(`Errores: ${bad.length} (de convención/catch-all: ${bad.filter((r) => isConventionPair(r.categoria, r.truth)).length}; ${NOT_A_LINE}: ${bad.filter((r) => r.categoria === NOT_A_LINE).length}; lado cambiado: ${bad.filter((r) => r.categoria !== NOT_A_LINE && sideOf(r.categoria) !== r.side).length})`);
}
