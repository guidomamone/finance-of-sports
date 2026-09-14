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
// ESTADO: 82 de las 85 filas verificadas, cada bloque con la fuente contra la que
// se chequeó. Las 3 que faltan son presupuestos (Boca 2027, Racing 2026 y 2027):
// dos cierran en el futuro y el tercero no se chequeó contra la temporada.
//
// LOS IDS DEL PRIMER Y SEGUNDO ESCALÓN ARGENTINO son `ar-primera` y
// `ar-primeranacional`, y NO el `ar-lpf` que propone el prompt del selector. El
// motivo: en el período cargado (2009 a 2027) esa misma categoría cambió de
// organizador y de nombre tres veces (Primera División de AFA, Superliga
// 2017-2019, Liga Profesional desde 2020), así que un id atado al organizador de
// hoy leería mal en un ejercicio de 2009. El id nombra el ESCALÓN, que es lo que
// no cambia; el nombre de cada época es un dato de `leagues.js`, cuando exista.
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
  // Verificado el 13/9/2026: temporadas 2022, 2023, 2024 y 2025 de Primera División contra sus
  // páginas de Wikipedia (cubren Estudiantes, Unión, Rosario Central, Independiente, Instituto,
  // River, Boca, San Lorenzo 2024, Racing 2024 y Vélez 2024); Argentinos Juniors contra su propia
  // página y la de la B Nacional 2016-17. Vélez, San Lorenzo y Racing en todos los años con
  // balance: confirmado por Guido, que conoce el dato (13/9/2026).
  //
  // SUB-REGLA DE "LA CATEGORÍA AL CIERRE", para los ejercicios que cierran entre dos torneos:
  // vale la categoría de la temporada EN CURSO o recién terminada a la fecha de cierre. Importa
  // una sola vez acá, y es el caso de Argentinos: su ejercicio jul-2015/jun-2016 se jugó entero en
  // Primera (el descenso se definió al terminar el torneo 2016, en mayo), así que ese ejercicio es
  // Primera aunque al 30/6/2016 el club ya estuviera descendido para el torneo siguiente. Leerlo al
  // revés pondría como "B Nacional" un año cuyos ingresos son 100% de Primera.
  argentinosjuniors: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primeranacional', 2018: 'ar-primera', 2019: 'ar-primera' },
  // El único de los 11 que cambió de categoría en el período cargado: descendió al terminar el
  // torneo de transición 2016 y jugó la B Nacional 2016-17, que ganó (terminó el 30/7/2017, o sea
  // que al cierre del ejercicio 2017 todavía estaba en curso). Volvió a Primera para 2017-18.
  boca: { 2025: 'ar-primera', 2027: null },          // 2027 es el presupuesto jul-2026/jun-2027: cierra en el futuro
  estudianteslp: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  independiente: { 2024: 'ar-primera' },
  instituto: { 2024: 'ar-primera' },              // ascendido para 2023, ya en Primera al cierre
  racing: { 2009: 'ar-primera', 2010: 'ar-primera', 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera', 2026: null, 2027: null },
  // 2026 y 2027 son presupuestos: el de 2027 cierra en el futuro, y el de 2026 (cerrado el
  // 30/6/2026) no se verificó contra la temporada, así que queda en null como cualquier otro
  // dato sin chequear.
  river: { 2024: 'ar-primera' },
  rosariocentral: { 2023: 'ar-primera' },
  sanlorenzo: { 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2024: 'ar-primera' },
  union: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  velez: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },

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

// ============================================================================
// MEMBRESÍA. Versión 137: estas 6 funciones son el ÚNICO camino por el que el
// sitio puede contestar "quiénes integran una liga", y todas piden el año donde
// el año importa. Están acá y no en `data/leagues.js` a propósito: ese archivo
// es el catálogo (qué ligas existen) y este es el hecho verificado (quién jugó
// dónde, y cuándo). Ver la cabecera de `data/leagues.js` para la regla completa
// ("no existe ninguna arista club → liga sin año").
//
// Todas ignoran las filas en `null`: una fila sin verificar no afirma nada, así
// que el club no aparece en ninguna liga por culpa de ella. `clubLeagueCoverage()`
// (arriba) y `node tools/audit.js` son los que se acuerdan de que falta.
// ============================================================================

// Quiénes integraron una liga EN UN EJERCICIO. Es la función que tiene que usar
// TODO agregado de liga: promedio, mediana, ranking, "cuánto generaba la liga en
// 2022". Devuelve clubIds, alfabético por id para que el orden sea estable.
function clubsOfLeagueYear(leagueId, year){
  return Object.keys(CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => CLUB_LEAGUE_BY_YEAR[clubId][year] === leagueId)
    .sort();
}

// En qué ejercicios jugó un club una liga dada. Descendente, el más nuevo
// primero (mismo criterio que el `<select>` de Año del sitio).
function yearsOfClubInLeague(clubId, leagueId){
  const rows = CLUB_LEAGUE_BY_YEAR[clubId] || {};
  return Object.keys(rows)
    .filter(year => rows[year] === leagueId)
    .map(Number)
    .sort((a, b) => b - a);
}

// Todas las ligas en las que un club tiene al menos un ejercicio verificado, con
// sus años. Es lo que hace que un club que ascendió aparezca bajo las DOS
// categorías en el árbol del selector, en vez de bajo una "liga de hoy" que
// habría que mantener a mano cada temporada. Ordenado por escalón (`LEAGUES`
// puede no estar cargado en un contexto de Node sin el catálogo: en ese caso
// cae a orden alfabético por id).
function leaguesOfClub(clubId){
  const rows = CLUB_LEAGUE_BY_YEAR[clubId] || {};
  const ids = [...new Set(Object.keys(rows).map(y => rows[y]).filter(Boolean))];
  const cat = (typeof LEAGUES !== 'undefined') ? LEAGUES : null;
  ids.sort((a, b) => {
    if(cat && cat[a] && cat[b]) return (cat[a].tier - cat[b].tier) || cat[a].name.localeCompare(cat[b].name, 'es', {sensitivity:'base'});
    return a.localeCompare(b);
  });
  return ids.map(id => ({ league:id, years:yearsOfClubInLeague(clubId, id) }));
}

// Los clubes con al menos un ejercicio verificado en una liga, SIN año. Es para
// NAVEGAR (la columna Equipo del selector), nunca para calcular: el conteo que
// sale de acá significa "clubes con al menos un ejercicio cargado en esta liga",
// que NO es "los clubes de la liga". Un agregado que use esto en vez de
// `clubsOfLeagueYear()` está mezclando ejercicios de temporadas distintas.
function clubsOfLeague(leagueId){
  return Object.keys(CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => Object.values(CLUB_LEAGUE_BY_YEAR[clubId]).includes(leagueId))
    .sort();
}

// Los ejercicios que esa liga tiene cargados (de cualquier club), descendente.
// Es la lista de años elegibles para un benchmark de liga.
function leagueYears(leagueId){
  const years = new Set();
  Object.keys(CLUB_LEAGUE_BY_YEAR).forEach(clubId => {
    const rows = CLUB_LEAGUE_BY_YEAR[clubId];
    Object.keys(rows).forEach(year => { if(rows[year] === leagueId) years.add(Number(year)); });
  });
  return [...years].sort((a, b) => b - a);
}

// Los clubes que no aparecen bajo ninguna liga porque TODAS sus filas están en
// `null`. Hoy es una lista vacía (los 41 tienen al menos una fila verificada),
// pero un club nuevo nace así, y sin esto quedaría invisible en el árbol: el
// selector lo muestra en una fila aparte del país, "sin liga verificada".
function clubsWithoutVerifiedLeague(){
  return Object.keys(CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => !Object.values(CLUB_LEAGUE_BY_YEAR[clubId]).some(Boolean))
    .sort();
}
