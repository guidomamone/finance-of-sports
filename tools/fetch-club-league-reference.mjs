#!/usr/bin/env node
// ============================================================================
// tools/fetch-club-league-reference.mjs — Baja, vía la API de
// Wikipedia (wikitext crudo, NO un resumen de un modelo — mismo criterio que
// tools/fetch-brand-color-reference.mjs: un LLM resumiendo un dato exacto es
// el mismo riesgo de "inventar un número" que este proyecto evita en todo lo
// demás), el roster completo de una liga-temporada desde su página de
// TEMPORADA en Wikipedia (NO la página del club — esa no trae la tabla).
//
// CORREGIDO (Guido, mirando https://en.wikipedia.org/wiki/2025%E2%80%9326_Premier_League):
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
// onboardeados — Boyacá Chicó). `tools/lookup-club-league.mjs`
// busca por nombre normalizado, como `lookup-brand-color.js`.
//
// USO:
//   node tools/fetch-club-league-reference.mjs "2016 Categoría Primera A season" co-primeraa 2016 --pais co
//   node tools/fetch-club-league-reference.mjs "2019 Eliteserien" no-eliteserien 2019 --pais no --section Teams
//   ... --json   imprime { teams, seccion } en una línea y no escribe nada (para un lote con compuerta: tools/listas-lote.mjs)
//
// Si no encuentra una tabla wikitable dentro de la sección de equipos, NO
// escribe nada (mejor fallar visible que guardar una lista incompleta).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const refDir = resolve(projectRoot, 'tools', 'club-league-reference');

const DEFAULT_SECTION_NAMES = ['Teams', 'Clubs', 'Participating clubs', 'Team changes', 'Club information']; // "Club information": Argentina

function usage() {
  console.error('Uso: node tools/fetch-club-league-reference.mjs "<título de la página de temporada en Wikipedia>" <leagueId> <año> --pais <iso2> [--section <nombre>] [--lang <es|en|...>]');
  process.exit(1);
}

async function fetchWikitext(title, lang) {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`; // redirects: "2023 Argentine Primera División" es una redirección
  const res = await fetch(url, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } });
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
  // CORREGIDO: antes tomaba solo la PRIMERA tabla de la
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
  // un atributo de celda que quedó pegado al contenido ("rowspan=2|Sporting Cristal", tablas de Perú) no es parte del nombre
  let c = cell.trim().replace(/^(?:\s*(?:rowspan|colspan|style|align)\s*=\s*"?[^|"]*"?\s*)+\|/i, '').trim();
  // primer wikilink de la celda: [[Target|Display]] o [[Target]]
  const m = c.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
  // un enlace a un ESTADIO no es un equipo: "[[Estadio Mario Alberto Kempes|Mario Alberto Kempes]]" se colaba en la tabla
  // de equipos argentina por la fila de un estadio compartido
  if (m && /^(Estadio|Estádio|Stadium|Stadion|Stade|Stadio|Arena)\b|\b(Stadium|Stadion)$/i.test(m[1].trim())) return ''; // "Arena da Amazônia"
  if (m) return (m[2] || m[1]).replace(/&nbsp;/g, ' ').trim();
  // sin wikilink: sacar markup básico (negrita, referencias, tags)
  return c.replace(/'''?/g, '').replace(/<ref[^>]*\/?>.*?(<\/ref>)?/g, '').replace(/<[^>]+>/g, '').trim();
}

function parseWikitableTeams(tableWikitext) {
  const rows = tableWikitext.split(/\n\|-/).slice(1); // el primer trozo es el header (! ...)
  const teams = [];
  // TABLA "EQUIPOS POR ESTADO": si la ÚLTIMA columna del encabezado es plural ("Team(s)", "Teams", "Clubs"), cada fila lista
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
    // una celda de ESTADO con rowspan (`|rowspan=4 |{{flagicon|São Paulo}} [[Federação Paulista...|São Paulo]]`) abre un
    // grupo de clubes: en esa fila el club es la celda siguiente. Antes se guardaba el estado y se perdía el primer club del grupo. Caso:
    // "2020 Campeonato Brasileiro Série D", fila São Paulo | Novorizontino | Novo Horizonte.
    const esEstado = (l) => /^\|\s*rowspan\s*=\s*"?\d+"?[^|]*\|.*\{\{\s*flag(icon)?\s*\|/i.test(l); // también {{nowrap|{{flagicon|...}}}}
    const firstCellLine = lines.find((l) => l.startsWith('|') && !l.startsWith('|}') && !esEstado(l));
    if (!firstCellLine) continue;
    let name = cleanWikilinkCell(firstCellLine.replace(/^\|\s*/, ''));
    // una 1ª celda que es solo un número (la matrícula belga: "| 35" y después "| [[R.S.C. Anderlecht|Anderlecht]]") no es el
    // club: el club es la celda siguiente. Caso: "2024–25 Belgian Pro League", que daba 16 números.
    if (name && !/\p{L}/u.test(name)) {
      const sig = lines.slice(lines.indexOf(firstCellLine) + 1).find((l) => l.startsWith('|') && !l.startsWith('|}') && !esEstado(l));
      name = sig ? cleanWikilinkCell(sig.replace(/^\|\s*/, '')) : '';
    }
    if (name) teams.push(name);
  }
  return teams;
}

// lee los equipos de una plantilla {{#invoke:sports table|...}}: `teamN=XXX` da el orden y `name_XXX=[[Destino|Nombre]]` el nombre
function equiposDeSportsTable(wikitext, todas = false) {
  // `todas`: la unión de TODAS las plantillas de la página (Argentina tiene una por zona más la tabla anual)
  const tablas = tablasDeSportsTable(wikitext);
  if (todas) return [...new Set(tablas.flat())];
  // GRUPOS: una liga jugada en grupos sin tabla de equipos ("2021–22 Super League Greece 2": una tabla de posiciones por grupo,
  // Norte y Sur) daba solo el primer grupo. Si hay 2 tablas o más SIN NINGÚN equipo en común y de al menos 8 equipos cada una, son los
  // grupos y se juntan. Una tabla anual o de playoff repite equipos de las otras, así que no entra.
  const grupos = []; for (const t of tablas) if (t.length >= 8 && !t.incompleta && !grupos.some((g) => g.some((x) => t.includes(x)))) grupos.push(t);
  // cuántos grupos juntó va en el --json (GRUPOS), como en equiposPorGrupo: listas-lote.mjs ajusta el tope de 40 por grupo
  // (Second Amateur Division 2019-20 y Division 2 2021-22: tres grupos de 16, 48 equipos)
  if (grupos.length >= 2 && tablas.every((t) => grupos.includes(t) || t.every((x) => grupos.flat().includes(x)))) { GRUPOS = grupos.length; return [...new Set(grupos.flat())]; }
  return [...new Set(tablas[0] || [])];
}
// cada plantilla de la página por separado, en orden de posición; el texto de cada una se corta en la siguiente
function tablasDeSportsTable(wikitext) {
  const inicios = [...wikitext.matchAll(/\{\{\s*#invoke:\s*sports table/gi)].map((m) => m.index);
  return inicios.map((ini, k) => {
    const t = wikitext.slice(ini, Math.min(inicios[k + 1] ?? Infinity, ini + 20000));
    // el código puede traer guion o punto ("B-W", Beerschot Wilrijk en la First Division B 2017-18): con [\p{L}\p{N}_]+ se cortaba en
    // "B", no encontraba su name_ y la tabla quedaba incompleta (un equipo menos; en las ligas por grupos, el escalón de grupos la descartaba).
    // Empieza con letra o número: un enlace de un cuadro de play-off ("team1=[[Olsa Brakel]]") no es un código.
    let orden = [...t.matchAll(/\|\s*team(\d+)\s*=\s*([\p{L}\p{N}_][\p{L}\p{N}_.\-]*)(?=\s|\||\}|$)/gu)].sort((a, b) => Number(a[1]) - Number(b[1])).map((m) => m[2]);
    // la otra forma de la plantilla: `|team_order = OLY, AEK, PAO, ...` ("Template:2024–25 Super League Greece table")
    if (!orden.length) { const to = t.match(/\|\s*team_order\s*=\s*([^|}]*)/); if (to) orden = to[1].replace(/<!--[\s\S]*?-->/g, '').split(',').map((s) => s.trim()).filter((s) => /^[\p{L}\p{N}_][\p{L}\p{N}_.\-]*$/u.test(s)); }
    // el nombre puede venir envuelto ("name_PAC = {{sort|Pacos|[[F.C. Paços de Ferreira|Paços de Ferreira]]}}"): el primer enlace de la
    // línea; sin enlace, el texto hasta el próximo "|"
    const nombre = (cod) => { const m = t.match(new RegExp('\\|\\s*name_' + cod.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*=\\s*([^\\n]*)')); if (!m) return null;
      return /\[\[/.test(m[1]) ? cleanWikilinkCell(m[1]) : cleanWikilinkCell(m[1].split('|')[0]); };
    const nombres = orden.map(nombre);
    const lista = [...new Set(nombres.filter(Boolean))];
    // un código sin nombre deja la tabla INCOMPLETA: no sirve para decidir qué sobra en la lista de equipos (se llevaba a Paços de Ferreira)
    if (nombres.some((x) => !x)) lista.incompleta = true;
    return lista;
  }).filter((l) => l.length);
}

// LIGAS POR GRUPOS: la Serie C trae una sección por grupo ("== Group A (North) ==" o "==== Group A ... ====" dentro de
// "Teams"), con una tabla de equipos cada una; la regla de la tabla más grande se queda con un solo grupo, y sin sección "Teams" no
// encuentra nada ("2023–24 Serie C"). Acá: la mejor tabla de cada grupo (la de más equipos únicos), y la unión de todas. Solo con 2 grupos
// o más y al menos 8 equipos en cada uno; si una letra aparece dos veces (estadios y tablas de posiciones), vale la que más equipos da.
function equiposPorGrupo(wikitext) {
  const heads = [...wikitext.matchAll(/^(=+)\s*(?:Group|Girone)\s+([A-Z])\b[^=\n]*?\1\s*$/gm)];
  const porLetra = {};
  for (const h of heads) {
    const nivel = h[1].length, desde = h.index + h[0].length;
    const fin = [...wikitext.slice(desde).matchAll(/^(=+)[^=\n].*?\1\s*$/gm)].find((m) => m[1].length <= nivel);
    const texto = wikitext.slice(desde, fin ? desde + fin.index : undefined);
    const mejor = extractAllWikitables(texto).map((t) => [...new Set(parseWikitableTeams(t))]).sort((a, b) => b.length - a.length)[0] || [];
    if (mejor.length > (porLetra[h[2]]?.length || 0)) porLetra[h[2]] = mejor;
  }
  const grupos = Object.values(porLetra);
  if (grupos.length < 2 || grupos.some((g) => g.length < 8)) return null;
  return { teams: [...new Set(grupos.flat())], grupos: grupos.length, letras: Object.keys(porLetra).join(', ') };
}

let GRUPOS = 0; // cuántos grupos tuvo la lista (equiposPorGrupo); va en el --json para que listas-lote ajuste el tope de equipos
let SOLO_JSON = false; // --json: imprime { teams, seccion } y NO escribe la caché; lo usa tools/listas-lote.mjs para la compuerta

let POSICIONES = null; // ver main()
function guardar(teams, { wikipediaTitle, leagueId, year, pais, lang, seccion }) {
  // posiciones solo si la tabla tiene EXACTAMENTE tantos equipos como la lista y está completa: una tabla de una zona, de un playoff o
  // con un nombre que no se pudo leer (Paços de Ferreira en "2012–13 Primeira Liga") no es la tabla final; ese año va sin posición
  const posiciones = POSICIONES && !POSICIONES.incompleta && POSICIONES.length === teams.length ? [...POSICIONES] : null;
  if (SOLO_JSON) { console.log(JSON.stringify({ teams, seccion, posiciones, ...(GRUPOS ? { grupos: GRUPOS } : {}) })); return; }
  const sec = { name: seccion };
  mkdirSync(refDir, { recursive: true });
  const cachePath = resolve(refDir, `${pais}.json`);
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : { leagues: {} };
  cache.leagues[leagueId] = cache.leagues[leagueId] || {};
  // UNA LISTA CORREGIDA A MANO (`manualFix`, con su `note`) no se pisa al volver a bajar la página: el parser repetiría el error que se corrigió. Con --forzar se reemplaza.
  if (cache.leagues[leagueId][year]?.manualFix && !process.argv.includes('--forzar')) { console.log(`\n${leagueId} ${year} tiene una corrección a mano (manualFix: ${cache.leagues[leagueId][year].note || 'sin nota'}): no se escribe. Usá --forzar para reemplazarla.`); return; }
  // `fuentes` (regla «la liga de un año necesita dos fuentes»): esta página es la de Wikipedia; las otras (tools/segunda-fuente-liga.mjs) se conservan
  const otras = (cache.leagues[leagueId][year]?.fuentes || []).filter((f) => f.tipo !== 'wikipedia');
  cache.leagues[leagueId][year] = {
    wikipediaPage: wikipediaTitle,
    lang,
    section: sec.name,
    fetchedAt: new Date().toISOString(),
    clubs: teams,
    ...(posiciones ? { posiciones } : {}),
    fuentes: [{ tipo: 'wikipedia', url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(wikipediaTitle.replace(/ /g, '_'))}` }, ...otras],
  };
  writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf8');

  console.log(`\n${teams.length} equipos encontrados (sección "${sec.name}"):`);
  teams.forEach((t) => console.log(`  - ${t}`));
  console.log(`\nGuardado en ${cachePath.replace(projectRoot + '/', '')} -- leagues.${leagueId}.${year}`);
  console.log('OJO: esto es una caché de roster, no un dato ya cargado a data/club-leagues/. Confirmar el club puntual que hace falta contra esta lista antes de usarlo.');
}

let COMPARAR = false; // --comparar (ver main)

async function main() {
  const args = process.argv.slice(2);
  const paisFlag = args.indexOf('--pais');
  const sectionFlag = args.indexOf('--section');
  const langFlag = args.indexOf('--lang');
  const pais = paisFlag >= 0 ? args[paisFlag + 1] : null;
  const section = sectionFlag >= 0 ? [args[sectionFlag + 1]] : DEFAULT_SECTION_NAMES;
  const lang = langFlag >= 0 ? args[langFlag + 1] : 'en';
  // --comparar: baja la página y dice qué tabla elegiría la regla vieja y cuál la nueva (escalón "tabla limpia"), SIN escribir la caché.
  COMPARAR = args.includes('--comparar');
  SOLO_JSON = args.includes('--json');
  const positional = args.filter((a, i) => !a.startsWith('--') && !['--pais', '--section', '--lang'].includes(args[i - 1]));
  const [wikipediaTitle, leagueId, year] = positional;

  if (!wikipediaTitle || !leagueId || !year || !pais) usage();

  console.log(`Bajando wikitext de "${wikipediaTitle}" (${lang}.wikipedia.org)...`);
  const wikitext = await fetchWikitext(wikipediaTitle, lang);
  // la tabla de posiciones puede estar en una plantilla aparte que la página incluye ({{2018–19 Argentine Primera División table}})
  let conPlantillas = wikitext;
  for (const m of [...new Set([...wikitext.matchAll(/\{\{\s*([^{}|\n]+ table)\s*[|}]/g)].map((x) => x[1].trim()))].slice(0, 3)) {
    try { conPlantillas += '\n' + await fetchWikitext(`Template:${m}`, lang); } catch { /* sin plantilla: sigue con lo que hay */ }
  }
  // POSICIONES: el orden final de la tabla de posiciones más grande de la página, en sus propios nombres. Se guarda aparte
  // de `clubs` (la lista de equipos) y solo si cubre la liga; faltantes-liga.mjs y estimar.mjs la unen por nombre.
  POSICIONES = tablasDeSportsTable(conPlantillas).sort((a, b) => b.length - a.length)[0] || null;

  // ESCALERA DE LA FUENTE DEL ROSTER:
  //   ESCALÓN 0  una tabla wikitable en la sección de equipos ("Teams", "Clubs"...) — lo de siempre
  //   ESCALÓN 1  si no hay, la tabla de posiciones hecha con la plantilla {{#invoke:sports table}} en CUALQUIER parte de la página: se
  //              leen sus `name_XXX=[[...|Nombre]]` en el orden de `teamN`. Caso: Brasileirão 2009 y 2010 Série A y 2011 Série B (Goiás
  //              9°, 19° y 11°, confirmados con capturas de Guido): la página no tiene tabla común de equipos.
  //   COMPUERTA  al menos 4 equipos únicos (si no, no se escribe nada, como antes)
  const sec = extractTeamsSection(wikitext, section);
  const tables = sec ? extractAllWikitables(sec.text) : [];
  // ESCALÓN "grupos": si la unión de los grupos es MÁS grande que lo que da la sección de equipos y contiene todo lo que da,
  // es la liga entera (la sección daba un solo grupo, o nada). Con la misma lista (Série C de Brasil, grupos de una fase) no cambia nada.
  if (!COMPARAR) {
    const g = equiposPorGrupo(wikitext);
    const deSeccion = tables.length ? [...new Set(tables.map((t) => [...new Set(parseWikitableTeams(t))]).sort((a, b) => b.length - a.length)[0])] : [];
    if (g && g.teams.length > deSeccion.length && deSeccion.every((n) => g.teams.includes(n))) {
      GRUPOS = g.grupos;
      guardar(g.teams, { wikipediaTitle, leagueId, year, pais, lang, seccion: `grupos ${g.letras}` });
      return;
    }
  }
  if (!tables.length) {
    if (COMPARAR) { console.log(JSON.stringify({ comparar: true, igual: true, sinTablas: true })); return; } // el escalón 1 no elige tabla: nada que comparar
    const st = equiposDeSportsTable(wikitext);
    if (st.length >= 4) {
      guardar(st, { wikipediaTitle, leagueId, year, pais, lang, seccion: 'plantilla sports table (escalón 1)' });
      return;
    }
    console.error(sec ? `Encontré la sección "${sec.name}" pero ninguna tabla wikitable adentro, y tampoco una plantilla {{#invoke:sports table}} en la página. No escribo nada.` : `No encontré ninguna sección ${JSON.stringify(section)} ni una plantilla {{#invoke:sports table}} en la página. Probar --section "<nombre exacto>" mirando la página a mano.`);
    process.exit(1);
  }
  // Nos quedamos con la tabla que más equipos ÚNICOS parsea, NO con la de más
  // FILAS (probado con Grecia: la tabla de "Managerial changes" trae
  // 21 filas pero solo 13 equipos únicos, con nombres de técnico mezclados y
  // clubes repetidos por cada cambio de DT; la tabla real de "Team" de la
  // sección trae 14 filas = 14 equipos únicos, sin repetir ninguno -- ese es el
  // roster, no el que tiene más filas en bruto).
  let best = { teams: [], uniqueCount: 0 };
  const parsed = tables.map((t) => [...new Set(parseWikitableTeams(t))]);
  for (const teams of parsed) {
    if (teams.length > best.uniqueCount) best = { teams, uniqueCount: teams.length };
  }
  // ESCALÓN "tabla limpia". La regla de arriba se equivoca cuando la tabla de cambios de técnico tiene MÁS
  // nombres únicos que el roster porque, en un club con dos técnicos, la fila siguiente arranca con el técnico (rowspan): "2024–25
  // Primeira Liga" daba 19 nombres (14 clubes, 4 técnicos y "rowspan=2|") y le ganaba a la tabla de estadios de 18; faltaban Santa Clara,
  // Casa Pia, Estoril y Nacional. SUELTO = un nombre que no aparece en ninguna OTRA tabla de la sección (los clubes se repiten entre
  // estadios y personal; un técnico o un estadio no). Se cambia de tabla SOLO si hay otra SIN sueltos que contiene TODOS los nombres
  // confirmados de la elegida (los que sí aparecen en otra tabla) y además AGREGA alguno que a la elegida le faltaba: o sea, solo cuando
  // la elegida está perdiendo clubes, y con MENOS nombres que ella (la basura infla la cuenta; con la misma cuenta solo cambiaban variantes de
  // nombre: "Estoril Praia" por "Estoril", "Chievo Verona" por "Chievo"). Medido sobre toda la caché: una versión más laxa sacaba clubes reales en Colombia
  // 2017-2020 y cambiaba Brasil Série B 2022-2025 (sacaba estadios, sin agregar ningún club); con esta solo cambia Portugal 2025. Con
  // una sola tabla no cambia nada. Grecia sigue igual.
  const elegidaVieja = best.teams;
  if (parsed.length > 1) {
    const sueltos = (i) => parsed[i].filter((n) => !parsed.some((o, j) => j !== i && o.includes(n))).length;
    const iBest = parsed.indexOf(best.teams);
    const sBest = sueltos(iBest);
    if (sBest > 0) {
      const confirmados = best.teams.filter((n) => parsed.some((o, j) => j !== iBest && o.includes(n)));
      const limpias = parsed.map((ts, i) => ({ ts, i })).filter(({ ts, i }) => i !== iBest && ts.length >= 4 && ts.length < best.teams.length && sueltos(i) === 0
        && confirmados.every((n) => ts.includes(n)) && ts.some((n) => !best.teams.includes(n)));
      if (limpias.length) { const l = limpias.sort((a, b) => b.ts.length - a.ts.length)[0]; best = { teams: l.ts, uniqueCount: l.ts.length }; }
    }
  }
  // ESCALÓN "tabla de posiciones". Si los equipos de TODAS las plantillas {{#invoke:sports table}} de la página están en la
  // tabla elegida y la tabla elegida tiene nombres de más, lo que sobra es basura (un estadio compartido con rowspan corre las columnas:
  // "2023 AFA Liga Profesional", 30 nombres con "Alfredo Terrera" y "Malvinas Argentinas" para 28 equipos). Se usa la de posiciones.
  // FRENOS (medidos con --revalidar sobre las 320 listas guardadas: sin ellos salían clubes reales, Paços de Ferreira, Hønefoss,
  // Beşiktaş, porque las tablas de posiciones de la página no cubrían toda la liga o lo nombraban distinto): se sacan a lo sumo 3
  // nombres, y nunca uno que coincide (normalizado, sin "de", "FC"...) con un nombre de alguna tabla de posiciones.
  const nn = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').split(' ').filter((w) => w && !['de', 'do', 'da', 'del', 'fc', 'cf', 'sc', 'ac', 'fk', 'sk', 'club', 'the'].includes(w)).join(' ');
  const tocaPosiciones = (n, todas) => todas.some((x) => { const a = nn(n), b = nn(x); return a === b || a.startsWith(b + ' ') || b.startsWith(a + ' '); });
  const sacarSeguro = (lista, todasST) => { const fuera = best.teams.filter((n) => !lista.includes(n)); return fuera.length <= 3 && !fuera.some((n) => tocaPosiciones(n, todasST)); };
  {
    const st = equiposDeSportsTable(conPlantillas, true);
    if (process.env.DEBUG_ST) console.error(JSON.stringify({ st, tablas: tablasDeSportsTable(conPlantillas).map((l) => l.length), elegida: best.teams.length }));
    if (st.length >= 4 && st.length < best.teams.length && st.every((n) => best.teams.includes(n)) && sacarSeguro(st, st)
      && !tablasDeSportsTable(conPlantillas).some((l) => l.incompleta)) best = { teams: st, uniqueCount: st.length, viaSportsTable: true };
    // y si a la tabla le sobran hasta 3 nombres que no están en NINGUNA tabla de posiciones (estadios: "2018–19 Argentine Primera
    // División" trae "Mario Alberto Kempes" y "Estadio del Bicentenario"), se sacan. Nunca se agrega un nombre; si los nombres de las dos
    // tablas difieren ("Talleres" contra "Talleres (C)") sobrarían más de 3 y no se toca nada.
    // Solo si UNA tabla de posiciones tiene todos sus nombres en la tabla elegida (es la misma lista con otro orden): con un club que
    // figura con otro nombre ("2008–09 Argentine Primera División") no se aplica, porque se lo llevaría.
    else {
      const igual = tablasDeSportsTable(conPlantillas).filter((l) => !l.incompleta && l.length >= 4 && l.length < best.teams.length && best.teams.length - l.length <= 3
        && l.every((n) => best.teams.includes(n)) && sacarSeguro(l, st)).sort((a, b) => b.length - a.length)[0];
      if (igual) best = { teams: igual, uniqueCount: igual.length, viaSportsTable: true };
    }
  }
  if (COMPARAR) {
    const igual = JSON.stringify([...elegidaVieja].sort()) === JSON.stringify([...best.teams].sort());
    console.log(JSON.stringify({ comparar: true, igual, vieja: elegidaVieja, nueva: best.teams }));
    return;
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
