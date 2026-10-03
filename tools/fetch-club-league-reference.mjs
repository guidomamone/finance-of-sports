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

function extractAllWikitables(sectionText) {
  // CORREGIDO 2026-09-28 (to-do 104): antes tomaba solo la PRIMERA tabla de la
  // sección, y no siempre es el roster (Grecia: la primera es un resumen
  // "Promoted from/Relegated from" de 2 equipos, el roster real de 14 está en
  // la SEGUNDA tabla). Ahora se extraen todas las tablas de la sección, y
  // main() se queda con la que más equipos parsea, no con la primera.
  const tables = [];
  let from = 0;
  while (true) {
    const start = sectionText.indexOf('{|', from);
    if (start === -1) break;
    // busca el '|}' que cierra ESTA tabla (no anida tablas en estas páginas)
    const end = sectionText.indexOf('|}', start);
    if (end === -1) break;
    tables.push(sectionText.slice(start, end));
    from = end + 2;
  }
  return tables;
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
  // TABLA "EQUIPOS POR ESTADO" (2026-10-02): si la ÚLTIMA columna del encabezado es plural ("Team(s)", "Teams", "Clubs"), cada fila lista
  // VARIOS equipos en esa celda; se toman todos sus wikilinks. Caso: "2017 Campeonato Brasileiro Série B", la única tabla de la sección
  // "Teams" es "Number of teams by state" (| 2 | {{flag|Goiás}} || [[Goiás Esporte Clube|Goiás]] and [[Vila Nova ...|Vila Nova]]); con
  // la regla de la primera celda salían 12 números de rowspan y nombres sueltos, y Goiás no aparecía. Los rowspan corren las columnas, por
  // eso se usa la última celda de cada fila y no un índice.
  const encabezados = (tableWikitext.match(/^!.*$/gm) || []).map((h) => h.replace(/^!\s*/, '').replace(/^.*\|\s*/, '').trim());
  if (/^(team\(s\)|teams|clubs|club\(s\))$/i.test(encabezados[encabezados.length - 1] || '')) {
    for (const row of rows) {
      const celdas = row.split('\n').filter((l) => l.trim().startsWith('|') && !l.trim().startsWith('|}') && !l.trim().startsWith('|+')).flatMap((l) => l.replace(/^\s*\|/, '').split('||'));
      const ultima = celdas[celdas.length - 1] || '';
      for (const m of ultima.matchAll(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)) teams.push((m[2] || m[1]).replace(/&nbsp;/g, ' ').trim());
    }
    return teams;
  }
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

// lee los equipos de una plantilla {{#invoke:sports table|...}}: `teamN=XXX` da el orden y `name_XXX=[[Destino|Nombre]]` el nombre
function equiposDeSportsTable(wikitext) {
  const i = wikitext.search(/\{\{\s*#invoke:\s*sports table/i);
  if (i < 0) return [];
  const t = wikitext.slice(i, i + 20000);
  const orden = [...t.matchAll(/\|\s*team(\d+)\s*=\s*([A-Za-z0-9_]+)/g)].sort((a, b) => Number(a[1]) - Number(b[1])).map((m) => m[2]);
  const nombre = (cod) => { const m = t.match(new RegExp('\\|\\s*name_' + cod + '\\s*=\\s*(\\[\\[[^\\]]*\\]\\]|[^|\\n]*)')); return m ? cleanWikilinkCell(m[1]) : null; };
  return [...new Set(orden.map(nombre).filter(Boolean))];
}

function guardar(teams, { wikipediaTitle, leagueId, year, pais, lang, seccion }) {
  const sec = { name: seccion };
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

  // ESCALERA DE LA FUENTE DEL ROSTER (Versión 401, pedido de Guido):
  //   ESCALÓN 0  una tabla wikitable en la sección de equipos ("Teams", "Clubs"...) — lo de siempre
  //   ESCALÓN 1  si no hay, la tabla de posiciones hecha con la plantilla {{#invoke:sports table}} en CUALQUIER parte de la página: se
  //              leen sus `name_XXX=[[...|Nombre]]` en el orden de `teamN`. Caso: Brasileirão 2009 y 2010 Série A y 2011 Série B (Goiás
  //              9°, 19° y 11°, confirmados con capturas de Guido): la página no tiene tabla común de equipos.
  //   COMPUERTA  al menos 4 equipos únicos (si no, no se escribe nada, como antes)
  const sec = extractTeamsSection(wikitext, section);
  const tables = sec ? extractAllWikitables(sec.text) : [];
  if (!tables.length) {
    const st = equiposDeSportsTable(wikitext);
    if (st.length >= 4) {
      guardar(st, { wikipediaTitle, leagueId, year, pais, lang, seccion: 'plantilla sports table (escalón 1)' });
      return;
    }
    console.error(sec ? `Encontré la sección "${sec.name}" pero ninguna tabla wikitable adentro, y tampoco una plantilla {{#invoke:sports table}} en la página. No escribo nada.` : `No encontré ninguna sección ${JSON.stringify(section)} ni una plantilla {{#invoke:sports table}} en la página. Probar --section "<nombre exacto>" mirando la página a mano.`);
    process.exit(1);
  }
  // Nos quedamos con la tabla que más equipos ÚNICOS parsea, NO con la de más
  // FILAS (probado con Grecia, to-do 104: la tabla de "Managerial changes" trae
  // 21 filas pero solo 13 equipos únicos, con nombres de técnico mezclados y
  // clubes repetidos por cada cambio de DT; la tabla real de "Team" de la
  // sección trae 14 filas = 14 equipos únicos, sin repetir ninguno -- ese es el
  // roster, no el que tiene más filas en bruto).
  let best = { teams: [], uniqueCount: 0 };
  for (const t of tables) {
    const teams = parseWikitableTeams(t);
    const uniqueCount = new Set(teams).size;
    if (uniqueCount > best.uniqueCount) best = { teams: [...new Set(teams)], uniqueCount };
  }
  const teams = best.teams;
  if (!teams.length) {
    console.error(`Encontré ${tables.length} tabla(s) pero no se pudo parsear ningún equipo de ninguna. No escribo nada -- revisar el wikitext a mano.`);
    process.exit(1);
  }
  if (tables.length > 1) {
    console.log(`(${tables.length} tablas encontradas en la sección, me quedé con la de ${teams.length} equipos)`);
  }

  guardar(teams, { wikipediaTitle, leagueId, year, pais, lang, seccion: sec.name });
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
