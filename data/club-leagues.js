// ============================================================================
// data/club-leagues.js — en qué liga jugó cada club en cada ejercicio.
//
// POR QUÉ ES UN ARCHIVO APARTE (decisión de Guido, Versión 132): "vamos a tener
// que armar un file que diga en qué liga juegan cada año los equipos que tenemos
// cargados, es una actualización al año nomás". La alternativa que proponía
// `PROMPT-selector-jerarquico.md` era un campo `league` adentro del
// `fiscalYearMeta` de cada club, o sea el dato repartido en 41 archivos. Junto
// es una tabla que se actualiza una vez por temporada, mirando los ascensos y
// descensos; repartido, hay que acordarse de 41 lugares.
//
// PARA QUÉ SE USA: el selector jerárquico agrupa por liga, y la comparación
// necesita saber en qué categoría jugó CADA ejercicio, no en cuál juega el club
// hoy. Mirassol 2024 (Série B) y Mirassol 2025 (Série A) son dos sujetos con
// ligas distintas, y comparar sus ingresos sin decirlo es comparar dos
// categorías como si fueran una.
//
// LA REGLA QUE HACE QUE ESTE ARCHIVO NO MIENTA: `null` significa "todavía nadie
// lo verificó", y es el valor con el que nace cada fila. NO se rellena de memoria
// ni por deducción: se mira la temporada en Wikipedia (o en la fuente que
// corresponda) y recién ahí se escribe. `node tools/audit.js` cuenta cuántas
// filas siguen en null, así que el pendiente está a la vista y no hace falta
// acordarse de él.
//
// Las filas son los ejercicios REALES de cada club (los placeholder no juegan
// ningún torneo). Al cargar un ejercicio nuevo hay que agregar su fila acá: la
// auditoría avisa si falta.
//
// ESTADO: verificadas las 30 filas que no tienen ambigüedad de calendario (Japón,
// España, Brasil, Colombia, México), cada bloque con la página de Wikipedia
// contra la que se chequeó. Faltan las 55 argentinas.
//
// LOS IDS DE LIGA todavía no existen: `data/leagues.js` es parte de la sesión
// del selector. La convención acordada en ese prompt es `<iso2>-<slug>`:
// `ar-lpf`, `ar-primeranacional`, `es-laliga`, `jp-j1`, `br-serieA`,
// `br-serieB`, `co-primeraA`, `mx-ligamx`.
//
// EL CRITERIO CUANDO UN EJERCICIO CRUZA DOS TORNEOS (decidido por Guido, Versión
// 132): vale LA CATEGORÍA AL CIERRE DEL EJERCICIO. Un ejercicio argentino cierra
// el 30/6 (o el 31/8, Racing hasta 2021) y la temporada argentina va de febrero a
// diciembre, así que uno solo toca dos torneos; se anota la división en la que
// estaba el club el día que cerró el balance. Es una regla sola, siempre
// determinable, y es la MISMA que el proyecto ya usa para atribuir la gestión
// presidencial (el presidente a cargo al cierre, aunque el ejercicio se haya
// repartido entre dos: ver Moretti en San Lorenzo 2024 y el caso de Vélez 2023).
// España y México (cierre 30/6, temporada ago-may) y los de año calendario
// (Brasil, Japón, Colombia) no tienen esta ambigüedad: el ejercicio coincide con
// una temporada.
// ============================================================================

const CLUB_LEAGUE_BY_YEAR = {
  // ---- ARGENTINA (cierre de ejercicio: 30/6 y 31/8) ----
  argentinosjuniors: { 2015: null, 2016: null, 2017: null, 2018: null, 2019: null },
  boca: { 2025: null, 2027: null },
  estudianteslp: { 2022: null, 2023: null, 2024: null, 2025: null },
  independiente: { 2024: null },
  instituto: { 2024: null },
  racing: { 2009: null, 2010: null, 2011: null, 2012: null, 2013: null, 2014: null, 2015: null, 2016: null, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2024: null, 2025: null, 2026: null, 2027: null },
  river: { 2024: null },
  rosariocentral: { 2023: null },
  sanlorenzo: { 2011: null, 2012: null, 2013: null, 2014: null, 2015: null, 2016: null, 2017: null, 2024: null },
  union: { 2022: null, 2023: null, 2024: null, 2025: null },
  velez: { 2015: null, 2016: null, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null, 2025: null },

  // ---- BRASIL (cierre de ejercicio: 31/12) ----
  // Verificado el 13/9/2026 contra las páginas de temporada de Wikipedia: Série A 2024 y 2025,
  // Série B 2024 y 2025. El ejercicio es el año calendario, así que coincide con la temporada.
  atleticogoianiense: { 2025: 'br-serieB' },   // descendido de la Série A 2024
  botafogo: { 2024: 'br-serieA' },             // campeón 2024
  coritiba: { 2024: 'br-serieB' },             // descendido de la Série A 2023
  cruzeiro: { 2025: 'br-serieA' },
  gremio: { 2024: 'br-serieA' },
  ituano: { 2024: 'br-serieB' },
  mirassol: { 2024: 'br-serieB' },             // ascendió a la Série A para 2025

  // ---- COLOMBIA (cierre de ejercicio: 31/12) ----
  // Verificado el 13/9/2026 contra "2025 Categoría Primera A season" (Wikipedia).
  envigado: { 2025: 'co-primeraA' },           // descendió al terminar 2025
  oncecaldas: { 2025: 'co-primeraA' },

  // ---- ESPAÑA (cierre de ejercicio: 30/6) ----
  // Verificado el 13/9/2026 contra "2024-25 La Liga" y "2023-24 La Liga" (Wikipedia). El
  // ejercicio cierra el 30/6 y coincide con la temporada, sin ambigüedad.
  athleticclub: { 2025: 'es-laliga' },
  atleticomadrid: { 2025: 'es-laliga' },
  celtavigo: { 2025: 'es-laliga' },
  deportivoalaves: { 2025: 'es-laliga' },
  fcbarcelona: { 2025: 'es-laliga' },
  realbetis: { 2025: 'es-laliga' },
  realmadrid: { 2025: 'es-laliga' },
  sevillafc: { 2025: 'es-laliga' },
  valenciacf: { 2025: 'es-laliga' },
  villarrealcf: { 2024: 'es-laliga' },         // temporada 2023/24

  // ---- JAPÓN (cierre de ejercicio: 31/12) ----
  // Verificado el 13/9/2026 contra "2025 J1 League" (Wikipedia): los 10 clubes cargados
  // jugaron J1 en 2025.
  cerezoosaka: { 2025: 'jp-j1' },
  fctokyo: { 2025: 'jp-j1' },
  gambaosaka: { 2025: 'jp-j1' },
  kashimaantlers: { 2025: 'jp-j1' },
  kawasakifrontale: { 2025: 'jp-j1' },
  nagoyagrampus: { 2025: 'jp-j1' },
  sanfreccehiroshima: { 2025: 'jp-j1' },
  urawareddiamonds: { 2025: 'jp-j1' },
  visselkobe: { 2025: 'jp-j1' },
  yokohamafmarinos: { 2025: 'jp-j1' },

  // ---- MÉXICO (cierre de ejercicio: 31/12) ----
  // Verificado el 13/9/2026 contra "2024-25 Liga MX season" (Wikipedia). Liga MX viene con
  // los mismos 18 clubes desde 2020-21.
  clubamerica: { 2025: 'mx-ligamx' },
};

// leagueAt(clubId, year): la liga de ESE ejercicio, o null si todavía no se
// verificó. Devolver null a propósito y no un fallback a "la liga de hoy": un
// ejercicio de hace 10 años puede ser de otra categoría, y contestar con la
// actual sería inventar el dato que este archivo existe para no inventar.
function leagueAt(clubId, year){
  return ((CLUB_LEAGUE_BY_YEAR[clubId] || {})[year]) || null;
}

// Cuántas filas faltan verificar, para que la auditoría lo cuente sin recorrer
// los datos por su cuenta.
function clubLeagueCoverage(){
  let total = 0, cargadas = 0;
  for(const clubId of Object.keys(CLUB_LEAGUE_BY_YEAR)){
    for(const year of Object.keys(CLUB_LEAGUE_BY_YEAR[clubId])){
      total++;
      if(CLUB_LEAGUE_BY_YEAR[clubId][year]) cargadas++;
    }
  }
  return { total, cargadas, faltan: total - cargadas };
}
