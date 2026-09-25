// ============================================================================
// data/leagues.js — el CATÁLOGO de la taxonomía por la que navega el selector
// jerárquico: deportes, regiones, países y ligas. Nada más que eso.
//
// LO QUE ESTE ARCHIVO NO TIENE, A PROPÓSITO: qué club pertenece a qué liga.
// Decisión de arquitectura de la Versión 137, después de que Guido levantara el
// problema de fondo: "si el usuario quiere ver cuánto generaba una liga en 2025
// y 2024, 2023, 2022, tiene que tener en cuenta que los clubes fueron
// cambiando. hay que pensar más arquitectura".
//
// LA REGLA QUE SALIÓ DE AHÍ, Y ES LA MÁS IMPORTANTE DE ESTE ARCHIVO:
//
//     NO EXISTE NINGUNA ARISTA CLUB → LIGA SIN AÑO. NI UNA.
//
// La membresía vive SOLO en `data/club-leagues.js` (`CLUB_LEAGUE_BY_YEAR`), que
// es (club, ejercicio) → liga, y ya está verificada fila por fila. Un campo
// `clubs[id].league` con "la liga de hoy" habría sido una segunda verdad sobre
// el mismo hecho, desincronizable, y además inútil para todo lo interesante:
// el promedio de una liga, su ranking de ingresos, o "cuánto generaba LaLiga en
// 2023" necesitan saber quiénes la integraban ESE año, no hoy.
//
// Consecuencias prácticas, para no reinventarlas en una sesión futura:
//   - Todo agregado de liga pasa por `clubsOfLeagueYear(leagueId, year)`
//     (data/club-leagues.js). Si una función nueva necesita "los clubes de la
//     liga L" sin año, está mal planteada: falta el año.
//   - En el árbol del selector, un club aparece bajo CADA liga en la que tiene
//     al menos un ejercicio cargado, con los años a la vista. Mirassol, que hoy
//     solo tiene cargado su 2024, aparece bajo Série B; el día que se cargue su
//     2025 va a aparecer bajo las dos, cada una con sus ejercicios. No hay nada
//     que actualizar por temporada y no hay un campo que pueda mentir.
//   - El conteo de clubes de una liga significa "clubes con al menos un
//     ejercicio cargado en esta liga", no "clubes de la liga". Son cosas
//     distintas y el sitio no puede afirmar la segunda.
//
// `sport` SÍ es un campo del club (`clubs[id].sport`, data/clubs.js): un club no
// cambia de deporte, así que ahí no hay arista con año que valga.
//
// NOMBRES SIN SPONSOR, a propósito: "LaLiga EA Sports" y "Meiji Yasuda J1
// League" son los nombres comerciales de la temporada en curso y cambian con el
// contrato. El sitio muestra ejercicios de 2009 a 2027, así que el nombre
// comercial de hoy leería mal en la mitad de ellos. Se usa el nombre de la
// competencia, no el del patrocinador.
//
// LOS NOMBRES DE LIGA Y DE CLUB NO SE TRADUCEN (misma regla que ya rige para
// los rubros de "Formato del club"). Los de deporte, región y país SÍ: van por
// `data/lang/` como todo el chrome del sitio.
// ============================================================================

// ---------------------------------------------------------------------------
// DEPORTES. `active:false` es el roadmap declarado del proyecto, no una promesa
// de fecha: se muestran apagados y no se pueden elegir. El techo real está
// anotado en la to-do de `index.html` (la taxonomía de rubros, las pestañas
// Pases/Resultados/Títulos y `gestionesByClub` son todas de fútbol).
// ---------------------------------------------------------------------------
const SPORTS = [
  { id:'futbol',  key:'sport.futbol',  name:'Fútbol',             icon:'⚽',   active:true  },
  { id:'basquet', key:'sport.basquet', name:'Básquet',            icon:'🏀', active:false },
  { id:'nfl',     key:'sport.nfl',     name:'Fútbol americano',   icon:'🏈', active:false },
  { id:'f1',      key:'sport.f1',      name:'Automovilismo',      icon:'🏎️', active:false },
  { id:'tenis',   key:'sport.tenis',   name:'Tenis',              icon:'🎾', active:false },
  { id:'rugby',   key:'sport.rugby',   name:'Rugby',              icon:'🏉', active:false },
];

// ---------------------------------------------------------------------------
// REGIONES. Las 6 existen siempre; las que no tienen ningún club cargado se
// muestran apagadas, y eso lo decide el conteo real, no un flag escrito a mano
// (un flag `soon:true` se olvida el día que entra el primer club de esa región).
// ---------------------------------------------------------------------------
const REGIONS = [
  { id:'sudamerica',   key:'region.sudamerica',   name:'Sudamérica' },
  { id:'europa',       key:'region.europa',       name:'Europa' },
  { id:'asia',         key:'region.asia',         name:'Asia' },
  { id:'norteamerica', key:'region.norteamerica', name:'Norteamérica' },
  { id:'africa',       key:'region.africa',       name:'África' },
  { id:'oceania',      key:'region.oceania',      name:'Oceanía' },
];

// ---------------------------------------------------------------------------
// PAÍSES. SOLO los que tienen al menos un club cargado. NO se listan países
// "próximamente" (el prototipo los tenía, con Chile/Uruguay/Inglaterra/Italia/
// Alemania/EEUU apagados): una fila "Chile · próximamente" es una afirmación
// sobre el roadmap que el sitio no puede sostener, y la lista se vuelve un
// inventario de 200 filas que nadie mantiene. Al onboardear el primer club de
// un país nuevo se agrega su entrada acá, junto con la de su liga.
// `flag` es el emoji de bandera, para la columna País del selector.
// ---------------------------------------------------------------------------
const COUNTRIES = {
  AR: { name:'Argentina', key:'country.AR', flag:'🇦🇷', region:'sudamerica' },
  BE: { name:'Bélgica',   key:'country.BE', flag:'🇧🇪', region:'europa' },
  BR: { name:'Brasil',    key:'country.BR', flag:'🇧🇷', region:'sudamerica' },
  CL: { name:'Chile',     key:'country.CL', flag:'🇨🇱', region:'sudamerica' },
  CO: { name:'Colombia',  key:'country.CO', flag:'🇨🇴', region:'sudamerica' },
  DE: { name:'Alemania',  key:'country.DE', flag:'🇩🇪', region:'europa' },
  ES: { name:'España',    key:'country.ES', flag:'🇪🇸', region:'europa' },
  GB: { name:'Inglaterra',key:'country.GB', flag:'🏴', region:'europa' },
  HR: { name:'Croacia',   key:'country.HR', flag:'🇭🇷', region:'europa' },
  JP: { name:'Japón',     key:'country.JP', flag:'🇯🇵', region:'asia' },
  MX: { name:'México',    key:'country.MX', flag:'🇲🇽', region:'norteamerica' },
  NL: { name:'Países Bajos', key:'country.NL', flag:'🇳🇱', region:'europa' },
  PE: { name:'Perú',      key:'country.PE', flag:'🇵🇪', region:'sudamerica' },
};

// ---------------------------------------------------------------------------
// LIGAS. Las que aparecen en `CLUB_LEAGUE_BY_YEAR`, ni una más: una liga sin
// ningún ejercicio cargado no tiene nada que mostrar.
//
// `id`: `<iso2 minúscula>-<slug>`. Los dos escalones argentinos son
// `ar-primera` y `ar-primeranacional` (y NO el `ar-lpf` que proponía el prompt
// del selector): en el período cargado, 2009 a 2027, esa categoría cambió de
// organizador y de nombre tres veces (Primera División de AFA, Superliga
// 2017-2019, Liga Profesional desde 2020), así que un id atado al organizador
// de hoy leería mal en un ejercicio de 2009. El id nombra el ESCALÓN, que no
// cambia. Ver el comentario de cabecera de `data/club-leagues.js`.
//
// `tier`: el escalón (1 = primera división). Es lo que hace comparable un
// ascenso/descenso entre países sin tener que conocer el nombre de cada liga.
//
// ACÁ NO HAY UN `totalClubs`, Y ES A PROPÓSITO (Versión 177, to-do 23(b)). Hubo
// uno: un número suelto por liga, en `null` en las 8 desde que se creó el
// catálogo, pensado para poder decir "N de M clubes de esta liga tienen ejercicio
// cargado" (el sesgo del benchmark). Se SACÓ en vez de llenarse, porque es el
// mismo error que la regla de arriba prohíbe para la membresía, un escalón más
// arriba: la cantidad de equipos CAMBIA POR TEMPORADA — la Primera División
// argentina pasó de 20 a 30 dentro del período cargado — así que un número por
// liga es falso en casi todas las temporadas y no hay forma de saber en cuál no.
// Dejarlo en `null` al lado de la tabla buena era peor que sacarlo: es el campo
// fácil de llenar, y la próxima sesión lo habría llenado ahí.
//
// EL DATO VIVE EN `LEAGUE_SIZE_BY_YEAR` (`data/club-leagues.js` para las reglas,
// `data/club-leagues/<iso2>.js` para las filas), que es (liga, ejercicio) ->
// cuántos equipos, y se consulta con `leagueSizeAt(liga, año)`. Hoy hay 3
// liga-temporadas verificadas (`jp-j1` 2025, `es-laliga` 2025, `ar-primera`
// 2024); las demás devuelven `null` y el sitio no afirma nada, que es lo correcto.
// ---------------------------------------------------------------------------
const LEAGUES = {
  'ar-primera':        { name:'Primera División',      full:'Primera División de Argentina',       country:'AR', sport:'futbol', tier:1 },
  'ar-primeranacional':{ name:'Primera Nacional',      full:'Primera Nacional de Argentina',       country:'AR', sport:'futbol', tier:2 },
  // Bélgica (onboarding de Club Brugge/Anderlecht/Genk/Gent, esta sesión): temporada jul-jun, cierra
  // 30/6, mismo criterio que España/Alemania/Países Bajos. Nombre sin sponsor ("Pro League" es el
  // nombre de la competencia en sí, no lleva sponsor en el nombre oficial actual).
  'be-proleague':      { name:'Pro League',            full:'Pro League de Bélgica',                country:'BE', sport:'futbol', tier:1 },
  'br-serieA':         { name:'Brasileirão Série A',   full:'Campeonato Brasileiro Série A',       country:'BR', sport:'futbol', tier:1 },
  'br-serieB':         { name:'Brasileirão Série B',   full:'Campeonato Brasileiro Série B',       country:'BR', sport:'futbol', tier:2 },
  // 3ª división (Versión 217, onboarding de Volta Redonda 2024, campeón de esa edición): mismo
  // criterio que br-serieB, el id nombra el escalón.
  'br-serieC':         { name:'Brasileirão Série C',   full:'Campeonato Brasileiro Série C',       country:'BR', sport:'futbol', tier:3 },
  // Chile (onboarding Colo-Colo/U. de Chile/U. Católica, 2026-09-25): temporada calendario (cierra
  // 31/12), sin la ambigüedad de un ejercicio partido en 2 torneos, mismo criterio que Brasil/Japón.
  'cl-primera':        { name:'Primera División',      full:'Primera División de Chile',           country:'CL', sport:'futbol', tier:1 },
  'co-primeraA':       { name:'Primera A',             full:'Categoría Primera A',                 country:'CO', sport:'futbol', tier:1 },
  // 2ª división (Versión 217, onboarding de Unión Magdalena 2018, subcampeón/ascendido esa edición).
  'co-primeraB':       { name:'Primera B',             full:'Categoría Primera B',                 country:'CO', sport:'futbol', tier:2 },
  'de-bundesliga':     { name:'Bundesliga',            full:'Fußball-Bundesliga',                  country:'DE', sport:'futbol', tier:1 },
  // 2ª división (Versión de esta sesión, onboarding de Köln 2024/25 y Elche 2023/24-2024/25): mismo
  // criterio que ar-primeranacional/br-serieB, el id nombra el escalón.
  'de-2bundesliga':    { name:'2. Bundesliga',         full:'2. Fußball-Bundesliga',               country:'DE', sport:'futbol', tier:2 },
  'es-laliga':         { name:'LaLiga',                full:'Primera División de España',          country:'ES', sport:'futbol', tier:1 },
  'es-segunda':        { name:'Segunda División',      full:'Segunda División de España',          country:'ES', sport:'futbol', tier:2 },
  'gb-premierleague':  { name:'Premier League',        full:'Premier League',                      country:'GB', sport:'futbol', tier:1 },
  // 2ª división (onboarding de Sunderland 2023/24-2024/25, jugados enteros en el Championship antes
  // de su ascenso vía playoff para 2025/26): mismo criterio que ar-primeranacional/br-serieB/
  // de-2bundesliga/es-segunda, el id nombra el escalón.
  'gb-championship':   { name:'Championship',          full:'EFL Championship',                    country:'GB', sport:'futbol', tier:2 },
  // Croacia (onboarding de Dinamo Zagreb/Hajduk Split/Rijeka, 2026-09-25): ejercicio CALENDARIO
  // (cierra 31/12), a diferencia de la temporada de la liga en sí (jul-jun) — el id nombra el
  // escalón, no la temporada. Nombre sin sponsor (regla de cabecera de este archivo): la liga se
  // llama comercialmente "SuperSport HNL" hoy, pero el nombre de la competencia es HNL.
  'hr-hnl':            { name:'HNL',                    full:'Hrvatska nogometna liga',             country:'HR', sport:'futbol', tier:1 },
  'jp-j1':             { name:'J1 League',             full:'J1 League',                           country:'JP', sport:'futbol', tier:1 },
  'mx-ligamx':         { name:'Liga MX',               full:'Liga MX',                             country:'MX', sport:'futbol', tier:1 },
  // Países Bajos (onboarding de Ajax/PSV/Feyenoord/AZ, esta sesión): temporada jul-jun, cierra 30/6,
  // mismo criterio que España/Alemania. Nombre sin sponsor (regla de cabecera de este archivo).
  'nl-eredivisie':     { name:'Eredivisie',             full:'Eredivisie de los Países Bajos',      country:'NL', sport:'futbol', tier:1 },
  'pe-liga1':          { name:'Liga 1',                full:'Liga 1 de Perú',                      country:'PE', sport:'futbol', tier:1 },
};

// ---------------------------------------------------------------------------
// Helpers de catálogo. Los de MEMBRESÍA (qué club está en qué liga, y cuándo)
// NO están acá: viven en `data/club-leagues.js`, que es el único archivo que
// puede contestar eso, y siempre con el año.
// ---------------------------------------------------------------------------

// La división en palabras, para el subtítulo de la fila de liga del selector.
// i18n (to-do 42): solo tier 1 y tier 2 existen hoy en LEAGUES (grep tier:[0-9] confirma), por eso
// son 2 claves fijas y no una plantilla con placeholder — la ordinal en inglés (1st/2nd/3rd...) no
// se puede derivar del número como en castellano ("Nª división" vale para cualquier N), así que el
// fallback para un tier 3+ que todavía no existe se queda en castellano hasta que haga falta.
function tierLabel(tier){
  if(tier == null) return '';
  var t = (window.I18N && window.I18N.t) ? window.I18N.t : function(k, es){ return es; };
  if(tier === 1) return t('league.tier1', '1ª división');
  if(tier === 2) return t('league.tier2', '2ª división');
  return tier + 'ª división';
}

// Las ligas de un país, ordenadas por escalón (primera arriba) y después por
// nombre, para que la columna Liga del selector no dependa del orden de
// escritura de `LEAGUES`.
function leaguesOfCountry(countryId){
  return Object.keys(LEAGUES)
    .filter(id => LEAGUES[id].country === countryId)
    .sort((a, b) => (LEAGUES[a].tier - LEAGUES[b].tier) || LEAGUES[a].name.localeCompare(LEAGUES[b].name, 'es', {sensitivity:'base'}));
}

// Los países de una región, alfabético.
function countriesOfRegion(regionId){
  return Object.keys(COUNTRIES)
    .filter(id => COUNTRIES[id].region === regionId)
    .sort((a, b) => COUNTRIES[a].name.localeCompare(COUNTRIES[b].name, 'es', {sensitivity:'base'}));
}

// La región de un país, en un solo lugar: la región NO es un campo del club
// (sería otra arista duplicada, ver cabecera).
function regionOfCountry(countryId){
  return (COUNTRIES[countryId] || {}).region || null;
}

window.SPORTS = SPORTS;
window.REGIONS = REGIONS;
window.COUNTRIES = COUNTRIES;
window.LEAGUES = LEAGUES;
