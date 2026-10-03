#!/usr/bin/env node
// ============================================================================
// tools/suggest-category-precedent.mjs — to-do 98, paso 5, TIER 0 (el que no
// necesita Jev ni ningún modelo): si un rubro nuevo tiene el MISMO texto que
// uno YA categorizado en un año anterior del MISMO club, sugerir esa
// categoría en vez de que Claude la vuelva a decidir de cero.
//
// SOLO sugiere. Nunca escribe en ningún `data/<club>-data.js` — eso lo sigue
// haciendo Claude a mano, con el criterio de `club-data-mapping/SKILL.md`.
// Tres niveles de confianza, a propósito separados:
//   - EXACTO: mismo texto normalizado que un rawLabel ya cargado, DEL MISMO
//     LADO (ingreso o gasto — ver más abajo). Alta confianza, pero solo si el
//     precedente fue CONSISTENTE entre años (si el mismo texto tuvo 2
//     categorías distintas en años distintos de ese mismo lado, se marca
//     CONFLICTO en vez de sugerir a ciegas).
//   - PARECIDO: comparten palabras pero no son el mismo texto. Confianza
//     BAJA a propósito — esto es un candidato para JEV a futuro (to-do 99),
//     no algo para aceptar sin revisar acá.
//   - SIN PRECEDENTE: no hay nada parecido cargado para este club todavía.
//     Sigue siendo 100% criterio de Claude (SKILL.md sección 1: primera
//     categorización de un club/rubro sin precedente).
//
// INGRESO Y GASTO SE BUSCAN POR SEPARADO, NUNCA MEZCLADOS (bug real
// encontrado probando esta tool, 2026-09-28): Boca tiene "Futbol Femenino"
// como INGRESO (-> womens_football, 2027) y "Fútbol femenino" como GASTO
// (-> youth_other_sports_expense, 2022/2023/2025) — mismo texto, dos rubros
// distintos según el lado del balance. La primera versión los mezclaba en un
// solo mapa y los marcaba como "conflicto" (categoría inconsistente), que era
// un falso positivo: no es el MISMO rubro repetido con criterio distinto, son
// dos rubros distintos que comparten nombre. Por default busca en los dos
// lados y devuelve un resultado por cada uno (`--side revenue`/`--side
// expense` para acotar a uno solo).
//
// Reusa el mismo patrón de carga que tools/generate-club-index.js (vm, no
// require: estos archivos están escritos para el navegador).
//
// USO:
//   node tools/suggest-category-precedent.mjs oncecaldas "DIMAYOR" "Patrocinio"
//   node tools/suggest-category-precedent.mjs oncecaldas "DIMAYOR" --side revenue
//   node tools/suggest-category-precedent.mjs oncecaldas --stdin   (una etiqueta por línea)
//   node tools/suggest-category-precedent.mjs oncecaldas --list    (vuelca todo el precedente, los 2 lados)
//   node tools/suggest-category-precedent.mjs oncecaldas "DIMAYOR" --json
// ============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const projectRoot = resolve(import.meta.dirname, '..');

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function loadGenericData() {
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const baseFiles = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js'];
  const clubFiles = readdirSync(resolve(projectRoot, 'data'))
    .filter((f) => f.endsWith('-data.js')).sort().map((f) => 'data/' + f);
  for (const rel of [...baseFiles, ...clubFiles]) {
    const code = readFileSync(resolve(projectRoot, rel), 'utf8');
    vm.runInContext(code, ctx, { filename: rel });
  }
  return vm.runInContext('window.CLUB_GENERIC_DATA', ctx);
}

// Ingresos y gastos se indexan SEPARADOS, nunca en un solo mapa: el mismo texto puede significar
// dos rubros distintos según el lado (encontrado probando esta misma tool contra Boca: "Futbol
// Femenino" es INGRESO -> womens_football en 2025, y "Fútbol femenino" es GASTO ->
// youth_other_sports_expense en otros años -- mezclarlos los hacía ver como un "conflicto" que en
// realidad no existe, son dos rubros distintos que comparten nombre).
function buildPrecedent(linesByYear) {
  const precedent = new Map(); // normalized(rawLabel) -> {rawLabel, normalizedCategory, years:Set, conflict:bool}
  for (const [year, lines] of Object.entries(linesByYear || {})) {
    for (const line of lines || []) {
      const key = normalize(line.rawLabel);
      if (!key) continue;
      if (!precedent.has(key)) {
        precedent.set(key, { rawLabel: line.rawLabel, normalizedCategory: line.normalizedCategory, years: new Set([year]) });
      } else {
        const entry = precedent.get(key);
        entry.years.add(year);
        if (entry.normalizedCategory !== line.normalizedCategory) entry.conflict = true;
      }
    }
  }
  return precedent;
}

function wordSet(s) {
  return new Set(normalize(s).split(' ').filter((w) => w.length > 2));
}

function jaccard(a, b) {
  const inter = [...a].filter((w) => b.has(w)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

function suggestInSide(precedent, query) {
  const qKey = normalize(query);
  const exact = precedent.get(qKey);
  if (exact) {
    return exact.conflict
      ? { tier: 'CONFLICTO', detail: `"${exact.rawLabel}" tuvo MÁS DE UNA categoría en años distintos de este mismo lado -- no sugiero, revisar a mano.` }
      : { tier: 'EXACTO', category: exact.normalizedCategory, matchedLabel: exact.rawLabel, years: [...exact.years].sort() };
  }
  const qWords = wordSet(query);
  let best = null;
  for (const entry of precedent.values()) {
    const sim = jaccard(qWords, wordSet(entry.rawLabel));
    if (sim >= 0.5 && (!best || sim > best.sim)) best = { sim, entry };
  }
  if (best) {
    return { tier: 'PARECIDO', category: best.entry.normalizedCategory, matchedLabel: best.entry.rawLabel, similarity: Math.round(best.sim * 100) };
  }
  return { tier: 'SIN_PRECEDENTE' };
}

// Busca en ambos lados (o en uno solo si `side` viene dado) y devuelve UN resultado por lado --
// nunca colapsa ingreso y gasto en una sola respuesta, aunque uno de los dos dé SIN_PRECEDENTE:
// esa combinación (precedente de un solo lado) es justo la señal útil para un rubro como "Futbol
// Femenino" arriba.
function suggest(precedentBySide, query, side) {
  const sides = side ? [side] : ['revenue', 'expense'];
  return sides.map((s) => ({ label: query, side: s, ...suggestInSide(precedentBySide[s], query) }));
}

const SIDE_LABEL = { revenue: 'ingreso', expense: 'gasto' };

function printResult(r) {
  const sideTag = `[${SIDE_LABEL[r.side]}]`;
  if (r.tier === 'EXACTO') {
    console.log(`EXACTO      ${sideTag} "${r.label}" -> ${r.category}  (mismo texto en ${r.years.join(', ')})`);
  } else if (r.tier === 'CONFLICTO') {
    console.log(`CONFLICTO   ${sideTag} "${r.label}" -- ${r.detail}`);
  } else if (r.tier === 'PARECIDO') {
    console.log(`PARECIDO    ${sideTag} "${r.label}" ~ "${r.matchedLabel}" (${r.similarity}% de palabras en común) -> candidato: ${r.category} -- REVISAR, no aceptar a ciegas`);
  } else {
    console.log(`SIN PRECEDENTE  ${sideTag} "${r.label}" -- nada parecido cargado para este club de este lado. Criterio de Claude.`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const clubFile = args[0];
  if (!clubFile) {
    console.error('Uso: node tools/suggest-category-precedent.mjs <clubDataFile> "<label1>" ["<label2>" ...] [--side revenue|expense]\n   o: node tools/suggest-category-precedent.mjs <clubDataFile> --stdin [--side revenue|expense]\n   o: node tools/suggest-category-precedent.mjs <clubDataFile> --list [--side revenue|expense]');
    process.exit(1);
  }
  if (!existsSync(resolve(projectRoot, 'data', `${clubFile}-data.js`))) {
    console.error(`No existe data/${clubFile}-data.js`);
    process.exit(1);
  }

  const generic = loadGenericData();
  const clubData = generic[clubFile];
  if (!clubData) {
    console.error(`data/${clubFile}-data.js cargó pero no registró window.CLUB_GENERIC_DATA.${clubFile} -- revisar el nombre.`);
    process.exit(1);
  }
  const precedentBySide = {
    revenue: buildPrecedent(clubData.revenueLinesByYear),
    expense: buildPrecedent(clubData.expenseLinesByYear),
  };

  const sideFlag = args.indexOf('--side');
  const side = sideFlag >= 0 ? args[sideFlag + 1] : null;
  if (side && side !== 'revenue' && side !== 'expense') {
    console.error('--side tiene que ser "revenue" o "expense".');
    process.exit(1);
  }

  if (args.includes('--list')) {
    for (const s of side ? [side] : ['revenue', 'expense']) {
      const precedent = precedentBySide[s];
      console.log(`${precedent.size} rubro(s) de ${SIDE_LABEL[s]} con precedente en ${clubFile}:\n`);
      [...precedent.values()].sort((a, b) => a.rawLabel.localeCompare(b.rawLabel)).forEach((e) => {
        console.log(`  ${e.conflict ? '[CONFLICTO] ' : ''}${e.rawLabel} -> ${e.normalizedCategory}  (${[...e.years].sort().join(', ')})`);
      });
      console.log('');
    }
    return;
  }

  const json = args.includes('--json');
  // ojo: args.slice(1) corre los índices 1 lugar respecto de `args`, así que el índice a excluir
  // (el valor de --side) hay que calcularlo sobre el array ORIGINAL, no sobre el recortado.
  const sideValueIndex = sideFlag >= 0 ? sideFlag + 1 : -1;
  let queries = args.slice(1).filter((a, i) => !a.startsWith('--') && i + 1 !== sideValueIndex);
  if (args.includes('--stdin')) {
    queries = queries.concat(readFileSync(0, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean));
  }
  if (!queries.length) {
    console.error('Falta al menos una etiqueta a buscar (o usar --stdin / --list).');
    process.exit(1);
  }

  const results = queries.flatMap((q) => suggest(precedentBySide, q, side));
  if (json) {
    console.log(JSON.stringify(results));
  } else {
    results.forEach(printResult);
    const counts = results.reduce((acc, r) => ((acc[r.tier] = (acc[r.tier] || 0) + 1), acc), {});
    const perLabel = side ? '' : ' (revenue + expense por cada una)';
    console.log(`\n${queries.length} etiqueta(s)${perLabel}, ${results.length} resultado(s): ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ')}`);
  }
}

main();
