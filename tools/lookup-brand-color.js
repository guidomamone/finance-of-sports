#!/usr/bin/env node
// ============================================================================
// tools/lookup-brand-color.js — busca LOCAL, contra las tablas de
// tools/brand-color-reference/, los swatches que footylogos publica para un
// club (to-do 91). Reemplaza el fetch puntual por club cuando la liga ya está
// cacheada (`tools/fetch-brand-color-reference.mjs`).
//
// ESTO NO DECIDE `brandColor` — solo evita volver a pedirle la página a
// footylogos. Seguí el proceso completo de `club-or-year-onboarding/SKILL.md`
// sección 3 punto 1b antes de aceptar un hex: identidad primero (¿de qué
// color es la CAMISETA, según Wikipedia/la liga?), el hex solo si cae en esa
// familia, y las 4 trampas ya documentadas ahí (bicolor en partes iguales,
// agregador ordenado por el escudo no la camiseta, blanco con acento,
// slugs inestables) siguen aplicando igual.
//
// USO:
//   node tools/lookup-brand-color.js "Boca Juniors"        busca en todas las ligas cacheadas
//   node tools/lookup-brand-color.js "Once Caldas" --liga colombia
//   node tools/lookup-brand-color.js --list-ligas          qué ligas hay cacheadas
//   node tools/lookup-brand-color.js "River" --json
//
// Si la liga que hace falta todavía no está cacheada, bajarla primero:
//   node tools/fetch-brand-color-reference.mjs <slug-liga-footylogos> <nombre-local>
//
// Sin coincidencias (o liga no cacheada) queda anotado en
// tools/brand-color-reference/misses.jsonl (pedido de Guido, 2026-09-27) --
// para que él revise ese archivo de vez en cuando y decida qué liga nueva
// vale la pena cachear, en vez de que cada sesión se tope con el mismo hueco
// sin dejar rastro. Ver también --misses.
// ============================================================================

import { readFileSync, readdirSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const refDir = resolve(projectRoot, 'tools', 'brand-color-reference');
const missesPath = resolve(refDir, 'misses.jsonl');

function logMiss(reason, query, liga) {
  mkdirSync(refDir, { recursive: true });
  appendFileSync(missesPath, JSON.stringify({ ts: new Date().toISOString(), query, liga: liga ?? null, reason }) + '\n', 'utf8');
}

function printMisses() {
  if (!existsSync(missesPath)) { console.log('Sin misses registrados todavía.'); return; }
  const lines = readFileSync(missesPath, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const seen = new Map();
  for (const l of lines) seen.set(`${l.query}${l.liga ? ' --liga ' + l.liga : ''}`, l);
  console.log(`${seen.size} búsqueda(s) distintas sin resultado (${lines.length} intentos en total):\n`);
  for (const [key, l] of seen) console.log(`  "${key}" -- ${l.reason} (última vez: ${l.ts.slice(0, 10)})`);
}

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function listLigas() {
  if (!existsSync(refDir)) return [];
  return readdirSync(refDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
}

function loadLiga(nombre) {
  return JSON.parse(readFileSync(resolve(refDir, `${nombre}.json`), 'utf8'));
}

function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const ligaFlag = args.indexOf('--liga');
  const soloLiga = ligaFlag >= 0 ? args[ligaFlag + 1] : null;
  const query = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--liga');

  if (args.includes('--misses')) return printMisses();

  if (args.includes('--list-ligas')) {
    const ligas = listLigas();
    if (!ligas.length) console.log('Sin ligas cacheadas todavía. Correr tools/fetch-brand-color-reference.mjs primero.');
    else ligas.forEach((l) => {
      const d = loadLiga(l);
      console.log(`${l}: ${d.clubs.length} clubes (fuente: ${d.source}, bajado ${d.fetchedAt.slice(0, 10)})`);
    });
    return;
  }

  if (!query) {
    console.error('Uso: node tools/lookup-brand-color.js "<nombre del club>" [--liga <nombre>] [--json]\n   o: node tools/lookup-brand-color.js --list-ligas\n   o: node tools/lookup-brand-color.js --misses');
    process.exit(1);
  }

  const ligas = soloLiga ? [soloLiga] : listLigas();
  if (!ligas.length) {
    console.error('Sin ligas cacheadas -- correr tools/fetch-brand-color-reference.mjs primero.');
    logMiss('sin ninguna liga cacheada todavía', query, soloLiga);
    console.error('(quedó anotado en tools/brand-color-reference/misses.jsonl -- avisale a Guido para que lo prepopule)');
    process.exit(1);
  }

  const q = normalize(query);
  const matches = [];
  let ligaFaltante = false;
  for (const liga of ligas) {
    const path = resolve(refDir, `${liga}.json`);
    if (!existsSync(path)) {
      console.error(`Liga '${liga}' no está cacheada (no existe ${path.replace(projectRoot + '/', '')}).`);
      ligaFaltante = true;
      continue;
    }
    const data = loadLiga(liga);
    for (const club of data.clubs) {
      const hay = normalize(club.name).includes(q) || normalize(club.slug.replace(/-/g, ' ')).includes(q);
      if (hay) matches.push({ liga, ...club });
    }
  }
  if (ligaFaltante && soloLiga) {
    logMiss(`liga '${soloLiga}' pedida explícitamente pero no está cacheada`, query, soloLiga);
    console.error('(quedó anotado en tools/brand-color-reference/misses.jsonl -- avisale a Guido para que lo prepopule)');
  }

  if (json) {
    console.log(JSON.stringify(matches, null, 2));
    return;
  }
  if (!matches.length) {
    console.log(`Sin coincidencias para "${query}" en: ${ligas.join(', ')}. Puede que la liga del club todavía no esté cacheada.`);
    if (!ligaFaltante) {
      logMiss('sin coincidencias en ninguna liga cacheada', query, soloLiga);
      console.log('(quedó anotado en tools/brand-color-reference/misses.jsonl -- avisale a Guido para que lo prepopule, o puede que el club no esté en footylogos)');
    }
    return;
  }
  for (const m of matches) {
    console.log(`[${m.liga}] ${m.name} (footylogos.com/color-codes/${m.slug})`);
    m.swatches.forEach((s, i) => console.log(`  ${i + 1}. ${s.hex}  ${s.label}`));
  }
  console.log('\nOJO: el orden de arriba es el de footylogos (por el escudo), NO asumir que el #1 es la camiseta. Confirmar contra Wikipedia/la liga antes de elegir (club-or-year-onboarding sección 3, punto 1b).');
}

main();
