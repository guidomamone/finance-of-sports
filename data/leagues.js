// ============================================================================
// data/leagues.js — el CATÁLOGO de la taxonomía por la que navega el selector
// jerárquico: deportes, regiones, países y ligas. Nada más que eso.
//
// LO QUE ESTE ARCHIVO NO TIENE, A PROPÓSITO: qué club pertenece a qué liga.
// Decisión de arquitectura de la Versión 136, después de que Guido levantara el
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
  BR: { name:'Brasil',    key:'country.BR', flag:'🇧🇷', region:'sudamerica' },
  CO: { name:'Colombia',  key:'country.CO', flag:'🇨🇴', region:'sudamerica' },
  ES: { name:'España',    key:'country.ES', flag:'🇪🇸', region:'europa' },
  JP: { name:'Japón',     key:'country.JP', flag:'🇯🇵', region:'asia' },
  MX: { name:'México',    key:'country.MX', flag:'🇲🇽', region:'norteamerica' },
};

// ---------------------------------------------------------------------------
// LIGAS. Las 8 que aparecen en `CLUB_LEAGUE_BY_YEAR`, ni una más: una liga sin
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
// `totalClubs`: cuántos equipos juega la liga, para poder decir "N de M clubes
// de esta liga tienen ejercicio cargado" (el sesgo del benchmark). Va en `null`
// mientras nadie lo haya verificado, y con `null` el sitio NO muestra ese
// número ni la fila de "X clubes más de esta liga": dice solo cuántos tiene
// cargados, que es lo que sabe. OJO, y es el mismo problema que la membresía:
// la cantidad de equipos de una liga TAMBIÉN cambia por temporada (Primera
// División de Argentina pasó de 20 a 30 equipos en el período cargado), así que
// cuando se verifique, el dato va por año, no como un número suelto. Anotado en
// la to-do de `index.html`.
// ---------------------------------------------------------------------------
const LEAGUES = {
  'ar-primera':        { name:'Primera División',      full:'Primera División de Argentina',       country:'AR', sport:'futbol', tier:1, totalClubs:null },
  'ar-primeranacional':{ name:'Primera Nacional',      full:'Primera Nacional de Argentina',       country:'AR', sport:'futbol', tier:2, totalClubs:null },
  'br-serieA':         { name:'Brasileirão Série A',   full:'Campeonato Brasileiro Série A',       country:'BR', sport:'futbol', tier:1, totalClubs:null },
  'br-serieB':         { name:'Brasileirão Série B',   full:'Campeonato Brasileiro Série B',       country:'BR', sport:'futbol', tier:2, totalClubs:null },
  'co-primeraA':       { name:'Primera A',             full:'Categoría Primera A',                 country:'CO', sport:'futbol', tier:1, totalClubs:null },
  'es-laliga':         { name:'LaLiga',                full:'Primera División de España',          country:'ES', sport:'futbol', tier:1, totalClubs:null },
  'jp-j1':             { name:'J1 League',             full:'J1 League',                           country:'JP', sport:'futbol', tier:1, totalClubs:null },
  'mx-ligamx':         { name:'Liga MX',               full:'Liga MX',                             country:'MX', sport:'futbol', tier:1, totalClubs:null },
};

// ---------------------------------------------------------------------------
// Helpers de catálogo. Los de MEMBRESÍA (qué club está en qué liga, y cuándo)
// NO están acá: viven en `data/club-leagues.js`, que es el único archivo que
// puede contestar eso, y siempre con el año.
// ---------------------------------------------------------------------------

// La división en palabras, para el subtítulo de la fila de liga del selector.
function tierLabel(tier){
  if(tier == null) return '';
  return tier === 1 ? '1ª división' : tier + 'ª división';
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
