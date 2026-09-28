#!/usr/bin/env node
// ============================================================================
// tools/lookup-club-league.js — arquitectura del to-do 95, ver
// tools/club-league-reference/README.md para el porqué (evaluado 2026-09-28:
// un scraper masivo no rinde con las fuentes disponibles, esto es una caché
// de lo ya buscado, no un reemplazo de la búsqueda).
//
// ESTO NO ES FUENTE DE VERDAD. Solo evita repetir una búsqueda ya resuelta.
// El dato real, con su nota de cómo se confirmó, sigue viviendo (a mano) en
// data/club-leagues/<iso2>.js.
//
// USO:
//   node tools/lookup-club-league.js boyacachico 2016 --pais co
//   node tools/lookup-club-league.js boyacachico --pais co        (todos los años cacheados)
//   node tools/lookup-club-league.js boyacachico 2016 --pais co --json
//   node tools/lookup-club-league.js --misses
// ============================================================================

import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const refDir = resolve(projectRoot, 'tools', 'club-league-reference');
const missesPath = resolve(refDir, 'misses.jsonl');

function logMiss(clubId, year, pais) {
  mkdirSync(refDir, { recursive: true });
  appendFileSync(missesPath, JSON.stringify({ ts: new Date().toISOString(), clubId, year: year ?? null, pais: pais ?? null }) + '\n', 'utf8');
}

function printMisses() {
  if (!existsSync(missesPath)) { console.log('Sin misses registrados todavía.'); return; }
  const lines = readFileSync(missesPath, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  console.log(`${lines.length} búsqueda(s) sin resultado en caché:\n`);
  lines.forEach((l) => console.log(`  ${l.clubId}${l.year ? ' ' + l.year : ''}${l.pais ? ' --pais ' + l.pais : ''} (${l.ts.slice(0, 10)})`));
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--misses')) return printMisses();

  const json = args.includes('--json');
  const paisFlag = args.indexOf('--pais');
  const pais = paisFlag >= 0 ? args[paisFlag + 1] : null;
  const positional = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--pais');
  const clubId = positional[0];
  const year = positional[1] || null;

  if (!clubId || !pais) {
    console.error('Uso: node tools/lookup-club-league.js <clubId> [año] --pais <iso2> [--json]\n   o: node tools/lookup-club-league.js --misses');
    process.exit(1);
  }

  const cachePath = resolve(refDir, `${pais}.json`);
  if (!existsSync(cachePath)) {
    console.log(`Sin caché todavía para --pais ${pais} (no existe ${cachePath.replace(projectRoot + '/', '')}). Buscar online como siempre y, una vez confirmado, agregarlo acá.`);
    logMiss(clubId, year, pais);
    return;
  }

  const data = JSON.parse(readFileSync(cachePath, 'utf8'));
  const entry = data[clubId];
  if (!entry) {
    console.log(`Sin datos cacheados para "${clubId}" en ${pais}.json. Buscar online y agregarlo acá una vez confirmado.`);
    logMiss(clubId, year, pais);
    return;
  }

  const result = year ? { [year]: entry[year] } : entry;
  if (year && entry[year] === undefined) {
    console.log(`"${clubId}" está en caché pero no tiene el año ${year}. Buscar ese año puntual online.`);
    logMiss(clubId, year, pais);
    return;
  }

  if (json) {
    console.log(JSON.stringify(result));
    return;
  }
  console.log(`${clubId} (${pais}):`);
  Object.entries(result).forEach(([y, liga]) => console.log(`  ${y}: ${liga}`));
  console.log('\nOJO: esto es una caché de una búsqueda ya hecha, no la fuente de verdad. Si hay dudas, confirmar igual antes de cargar el dato.');
}

main();
