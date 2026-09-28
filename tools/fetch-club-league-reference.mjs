#!/usr/bin/env node
// ============================================================================
// tools/fetch-club-league-reference.mjs — to-do 95. Baja, vía la API de
// Wikipedia (wikitext crudo, NO un resumen de un modelo — mismo criterio que
// tools/fetch-brand-color-reference.mjs: un LLM resumiendo un dato exacto es
// el mismo riesgo de "inventar un número" que este proyecto evita en todo lo
// demás), el roster completo de una liga-temporada desde su página de
// TEMPORADA en Wikipedia (NO la página del club — esa no trae la tabla).
//
// CORREGIDO 2026-09-28 (Guido, mirando https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League):
// la evaluación anterior de este to-do había mirado la página del CLUB y RSSSF,
// y concluyó que no alcanzaba. Mirando la página de la TEMPORADA en cambio, la
// tabla "Teams"/"Clubs" es un wikitable estándar de MediaWiki, consistente
// entre países (probado: Colombia y Noruega, columnas distintas pero mismo
// patrón `{| class="wikitable" ... |- ... | [[Club]] ...`), parseable con un
// regex simple en vez de HTML renderizado con ambigüedades (RSSSF) o prosa
// suelta (la página del club).
//
// Cachea por RÁSTER de nombres (NO por clubId): la mayoría de los clubes que
// esto tiene que cubrir todavía no tienen clubId (están sourceados, no
// onboardeados — ver to-do 50, Boyacá Chicó). `tools/lookup-club-league.js`
// busca por nombre normalizado, como `lookup-brand-color.js`.
//
// USO:
//   node tools/fetch-club-league-reference.mjs "2016 Categoría Primera A season" co-primeraa 2016 --pais co
//   node tools/fetch-club-league-reference.mjs "2019 Eliteserien" no-eliteserien 2019 --pais no --section Teams
//
// Si no encuentra una tabla wikitable dentro de la sección de equipos, NO
// escribe nada (mejor fallar visible que guardar una lista incompleta).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const refDir = resolve(projectRoot, 'tools', 'club-league-reference');

const DEFAULT_SECTION_NAMES = ['Teams', 'Clubs', 'Participating clubs', 'Team changes'];

function usage() {
  console.error('Uso: node tools/fetch-club-league-reference.mjs "<título de la página de temporada en Wikipedia>" <leagueId> <año> --pais <iso2> [--section <nombre>] [--lang <es|en|...>]');
  process.exit(1);
}

async function fetchWikitext(title, lang) {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'finance-of-sports-tool (research interno, no bot masivo)' } });
  const data = await res.json();
  if (data.error) throw new Error(`Wikipedia API: ${data.error.info}`);
  if (!data.parse) throw new Error('Respuesta sin parse.wikitext -- ¿título exacto?');
  return data.parse.wikitext['*'];
}

function extractTeamsSection(wikitext, sectionNames) {
  for (const name of sectionNames) {
    const re = new RegExp(`^==\\s*${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*==`, 'mi');
    const start = wikitext.search(re);
    if (start === -1) continue;
    const afterHeading = wikitext.slice(start);
    // corta en el próximo heading de nivel 2 (== ... ==, no === ... ===)
    const nextTop = afterHeading.slice(1).search(/^==[^=]/m);
    return { name, text: nextTop === -1 ? afterHeading : afterHeading.slice(0, nextTop + 1) };
  }
  return null;
}

function extractFirstWikitable(sectionText) {
  const start = sectionText.indexOf('{|');
  if (start === -1) return null;
  // busca el '|}' que cierra ESTA tabla (no anida tablas en estas páginas)
  const end = sectionText.indexOf('|}', start);
  if (end === -1) return null;
  return sectionText.slice(start, end);
}

function cleanWikilinkCell(cell) {
  let c = cell.trim();
  // primer wikilink de la celda: [[Target|Display]] o [[Target]]
  const m = c.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
  if (m) return (m[2] || m[1]).replace(/&nbsp;/g, ' ').trim();
  // sin wikilink: sacar markup básico (negrita, referencias, tags)
  return c.replace(/'''?/g, '').replace(/<ref[^>]*\/?>.*?(<\/ref>)?/g, '').replace(/<[^>]+>/g, '').trim();
}

function parseWikitableTeams(tableWikitext) {
  const rows = tableWikitext.split(/\n\|-/).slice(1); // el primer trozo es el header (! ...)
  const teams = [];
  for (const row of rows) {
    const lines = row.split('\n').map((l) => l.trim()).filter(Boolean);
    const firstCellLine = lines.find((l) => l.startsWith('|') && !l.startsWith('|}'));
    if (!firstCellLine) continue;
    const cell = firstCellLine.replace(/^\|\s*/, '');
    const name = cleanWikilinkCell(cell);
    if (name) teams.push(name);
  }
  return teams;
}

async function main() {
  const args = process.argv.slice(2);
  const paisFlag = args.indexOf('--pais');
  const sectionFlag = args.indexOf('--section');
  const langFlag = args.indexOf('--lang');
  const pais = paisFlag >= 0 ? args[paisFlag + 1] : null;
  const section = sectionFlag >= 0 ? [args[sectionFlag + 1]] : DEFAULT_SECTION_NAMES;
  const lang = langFlag >= 0 ? args[langFlag + 1] : 'en';
  const positional = args.filter((a, i) => !a.startsWith('--') && !['--pais', '--section', '--lang'].includes(args[i - 1]));
  const [wikipediaTitle, leagueId, year] = positional;

  if (!wikipediaTitle || !leagueId || !year || !pais) usage();

  console.log(`Bajando wikitext de "${wikipediaTitle}" (${lang}.wikipedia.org)...`);
  const wikitext = await fetchWikitext(wikipediaTitle, lang);

  const sec = extractTeamsSection(wikitext, section);
  if (!sec) {
    console.error(`No encontré ninguna sección ${JSON.stringify(section)} en la página. Probar --section "<nombre exacto>" mirando la página a mano.`);
    process.exit(1);
  }
  const table = extractFirstWikitable(sec.text);
  if (!table) {
    console.error(`Encontré la sección "${sec.name}" pero ninguna tabla wikitable adentro. No escribo nada -- revisar la página a mano.`);
    process.exit(1);
  }
  const teams = parseWikitableTeams(table);
  if (!teams.length) {
    console.error('La tabla se encontró pero no se pudo parsear ningún equipo. No escribo nada -- revisar el wikitext a mano.');
    process.exit(1);
  }

  mkdirSync(refDir, { recursive: true });
  const cachePath = resolve(refDir, `${pais}.json`);
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : { leagues: {} };
  cache.leagues[leagueId] = cache.leagues[leagueId] || {};
  cache.leagues[leagueId][year] = {
    wikipediaPage: wikipediaTitle,
    lang,
    section: sec.name,
    fetchedAt: new Date().toISOString(),
    clubs: teams,
  };
  writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf8');

  console.log(`\n${teams.length} equipos encontrados (sección "${sec.name}"):`);
  teams.forEach((t) => console.log(`  - ${t}`));
  console.log(`\nGuardado en ${cachePath.replace(projectRoot + '/', '')} -- leagues.${leagueId}.${year}`);
  console.log('OJO: esto es una caché de roster, no un dato ya cargado a data/club-leagues/. Confirmar el club puntual que hace falta contra esta lista antes de usarlo.');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
