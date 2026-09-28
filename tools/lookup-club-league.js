#!/usr/bin/env node
// ============================================================================
// tools/lookup-club-league.js — arquitectura del to-do 95, ver
// tools/club-league-reference/README.md para el porqué. Busca por NOMBRE
// (no por clubId: la mayoría de los clubes que esto cubre todavía no están
// onboardeados, así que no tienen clubId todavía) contra los rosters de
// liga-temporada bajados con tools/fetch-club-league-reference.mjs.
//
// ESTO NO ES FUENTE DE VERDAD. Confirma qué liga-temporada YA está cacheada;
// el dato real, con su nota de cómo se confirmó, sigue viviendo (a mano) en
// data/club-leagues/<iso2>.js.
//
// USO:
//   node tools/lookup-club-league.js "Boyacá Chicó" --pais co
//   node tools/lookup-club-league.js "Boyacá Chicó" --pais co --anio 2016
//   node tools/lookup-club-league.js "Lillestrøm" --pais no --json
//   node tools/lookup-club-league.js --list-cache --pais co
//   node tools/lookup-club-league.js --misses
// ============================================================================

import { readFileSync, readdirSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const refDir = resolve(projectRoot, 'tools', 'club-league-reference');
const missesPath = resolve(refDir, 'misses.jsonl');

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function logMiss(query, pais, anio) {
  mkdirSync(refDir, { recursive: true });
  appendFileSync(missesPath, JSON.stringify({ ts: new Date().toISOString(), query, pais: pais ?? null, anio: anio ?? null }) + '\n', 'utf8');
}

function printMisses() {
  if (!existsSync(missesPath)) { console.log('Sin misses registrados todavía.'); return; }
  const lines = readFileSync(missesPath, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  console.log(`${lines.length} búsqueda(s) sin resultado en caché:\n`);
  lines.forEach((l) => console.log(`  "${l.query}"${l.anio ? ' ' + l.anio : ''}${l.pais ? ' --pais ' + l.pais : ''} (${l.ts.slice(0, 10)})`));
}

function listCache(pais) {
  const path = resolve(refDir, `${pais}.json`);
  if (!existsSync(path)) { console.log(`Sin caché para --pais ${pais} todavía.`); return; }
  const data = JSON.parse(readFileSync(path, 'utf8'));
  for (const [leagueId, years] of Object.entries(data.leagues || {})) {
    for (const [year, entry] of Object.entries(years)) {
      console.log(`${leagueId} ${year}: ${entry.clubs.length} equipos (${entry.wikipediaPage}, bajado ${entry.fetchedAt.slice(0, 10)})`);
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--misses')) return printMisses();

  const json = args.includes('--json');
  const paisFlag = args.indexOf('--pais');
  const anioFlag = args.indexOf('--anio');
  const pais = paisFlag >= 0 ? args[paisFlag + 1] : null;
  const anio = anioFlag >= 0 ? args[anioFlag + 1] : null;

  if (!pais) {
    console.error('Uso: node tools/lookup-club-league.js "<nombre del club>" --pais <iso2> [--anio <año>] [--json]\n   o: node tools/lookup-club-league.js --list-cache --pais <iso2>\n   o: node tools/lookup-club-league.js --misses');
    process.exit(1);
  }

  if (args.includes('--list-cache')) return listCache(pais);

  const query = args.find((a, i) => !a.startsWith('--') && !['--pais', '--anio'].includes(args[i - 1]));
  if (!query) {
    console.error('Falta el nombre del club a buscar.');
    process.exit(1);
  }

  const cachePath = resolve(refDir, `${pais}.json`);
  if (!existsSync(cachePath)) {
    console.log(`Sin caché todavía para --pais ${pais} (no existe ${cachePath.replace(projectRoot + '/', '')}).`);
    console.log('Buscar la página de temporada en Wikipedia y bajarla con tools/fetch-club-league-reference.mjs.');
    logMiss(query, pais, anio);
    return;
  }

  const data = JSON.parse(readFileSync(cachePath, 'utf8'));
  const q = normalize(query);
  const matches = [];
  for (const [leagueId, years] of Object.entries(data.leagues || {})) {
    for (const [year, entry] of Object.entries(years)) {
      if (anio && year !== String(anio)) continue;
      const hit = entry.clubs.find((c) => normalize(c).includes(q) || q.includes(normalize(c)));
      if (hit) matches.push({ leagueId, year, matchedName: hit, wikipediaPage: entry.wikipediaPage });
    }
  }

  if (json) {
    console.log(JSON.stringify(matches));
    return;
  }
  if (!matches.length) {
    console.log(`Sin coincidencias para "${query}" en la caché de ${pais}${anio ? ' año ' + anio : ''}.`);
    console.log('Puede que esa liga-temporada todavía no esté cacheada -- bajarla con tools/fetch-club-league-reference.mjs.');
    logMiss(query, pais, anio);
    return;
  }
  matches.forEach((m) => console.log(`${m.leagueId} ${m.year}: "${m.matchedName}" (${m.wikipediaPage})`));
  console.log('\nOJO: esto es una caché de un roster ya bajado, no la fuente de verdad. Confirmar igual antes de cargar el dato en data/club-leagues/<iso2>.js.');
}

main();
