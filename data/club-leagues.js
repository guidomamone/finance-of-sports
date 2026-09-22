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
// ningún torneo). Al cargar un ejercicio nuevo hay que agregar su fila: la
// auditoría avisa si falta.
//
// DÓNDE ESTÁN LAS FILAS, DESDE LA VERSIÓN 164: en `data/club-leagues/<iso2>.js`,
// un archivo por país, cada uno autoregistrándose en la misma tabla con
// `Object.assign` (el mismo patrón que `sources{}` y `gestionesByClub{}` desde la
// Versión 101). Este archivo quedó con las REGLAS y los helpers, sin un solo
// dato. Dos motivos, y el segundo pesa más:
//   1. El repaso anual de ascensos y descensos pasa a ser el de UN país.
//   2. LAS FILAS YA NO SE BAJAN EN LA PRIMERA VISITA. Se cargan al abrir el
//      selector, que es el único lugar del sitio que las usa.
//
// POR QUÉ SE CARGAN TODOS LOS PAÍSES JUNTOS Y NO SOLO EL QUE HAGA FALTA: el
// selector necesita la tabla ENTERA para dibujarse. `ligasConClubes()`
// (`js/selector.js`) recorre TODAS las ligas y para cada una pregunta quiénes la
// integran, así que un cargador "por país elegido" terminaría bajando los mismos
// archivos, con un cargador más que mantener encima. Lo que se ganó no es partir
// la carga: es MOVERLA de la primera visita, donde nadie las necesita, a la
// apertura del modal.
//
// POR QUÉ LOS HELPERS SIGUEN SIENDO SÍNCRONOS (vale para los de membresía y para
// `leagueSizeAt()`): hay UNA sola frontera async, el
// `abrirModal()` de `js/selector.js`, que espera la carga antes de dibujar nada.
// Si en vez de eso los helpers devolvieran promesas, habría que volver async cada
// función de render del modal. OJO SI SE AGREGA UN CONSUMIDOR NUEVO: tiene que
// asegurarse de que `loadClubLeagues()` ya resolvió. Con la tabla vacía los
// helpers no tiran error, devuelven listas vacías, que es peor, porque se lee
// como "este club no jugó nunca en ninguna liga".
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

// ============================================================================
// LA TABLA, y quién la llena. Nace VACÍA: la llenan los
// `data/club-leagues/<iso2>.js` cuando alguien llama a `loadClubLeagues()`.
// ============================================================================
window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

// Los países salen de `clubs{}`, que es eager y ya está cargado, así que sumar un
// club de un país nuevo no obliga a tocar ninguna lista acá: solo a crear su
// `data/club-leagues/<iso2>.js`. Si ese archivo falta se avisa por consola y el
// resto sigue (`allSettled` y no `all`): un país sin tabla deja a sus clubes
// fuera del árbol de ligas, que es degradar, no romper. `node tools/audit.js`
// cuenta las filas que faltan, así que el pendiente igual queda a la vista.
let _clubLeaguesPromise = null;
function loadClubLeagues(){
  if(_clubLeaguesPromise) return _clubLeaguesPromise;
  // OJO CON `clubs` SIN `window.` (bug real de esta sesión, y el mismo de la Versión 96):
  // `data/clubs.js` lo declara con `const`, así que es un global LÉXICO y NO una propiedad
  // de `window`. `window.clubs` da `undefined`, la lista de países salía vacía y este
  // cargador no pedía ni un archivo, en silencio. El identificador pelado sí lo encuentra,
  // tanto en el navegador como en el contexto de `vm` de tools/audit.js.
  const tabla = (typeof clubs !== 'undefined' && clubs) || window.clubs || {};
  const paises = [...new Set(Object.values(tabla)
    .map(c => (c.country || '').toLowerCase()).filter(Boolean))].sort();
  if(!paises.length) console.error('[club-leagues] no se pudo leer clubs{}: el selector va a quedar sin ligas');
  _clubLeaguesPromise = Promise.allSettled(paises.map(p => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'data/club-leagues/' + p + '.js' + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
    s.onload = resolve;
    s.onerror = () => reject(new Error(p));
    document.head.appendChild(s);
  }))).then(rs => {
    const faltan = rs.filter(r => r.status === 'rejected').map(r => r.reason.message);
    if(faltan.length) console.error('[club-leagues] no se pudo cargar: ' + faltan.join(', ') +
      '. Los clubes de esos países no van a aparecer bajo ninguna liga.');
  });
  return _clubLeaguesPromise;
}
window.loadClubLeagues = loadClubLeagues;

// leagueAt(clubId, year): la liga de ESE ejercicio, o null si todavía no se
// verificó. Devolver null a propósito y no un fallback a "la liga de hoy": un
// ejercicio de hace 10 años puede ser de otra categoría, y contestar con la
// actual sería inventar el dato que este archivo existe para no inventar.
function leagueAt(clubId, year){
  return ((window.CLUB_LEAGUE_BY_YEAR[clubId] || {})[year]) || null;
}

// Cuántas filas faltan verificar, para que la auditoría lo cuente sin recorrer
// los datos por su cuenta.
function clubLeagueCoverage(){
  let total = 0, cargadas = 0;
  for(const clubId of Object.keys(window.CLUB_LEAGUE_BY_YEAR)){
    for(const year of Object.keys(window.CLUB_LEAGUE_BY_YEAR[clubId])){
      total++;
      if(window.CLUB_LEAGUE_BY_YEAR[clubId][year]) cargadas++;
    }
  }
  return { total, cargadas, faltan: total - cargadas };
}

// ============================================================================
// EL TAMAÑO DE LA LIGA: (liga, ejercicio) -> cuántos equipos la jugaron.
// Versión 177, to-do 23(b).
//
// POR QUÉ NO ES UN CAMPO DE `data/leagues.js`. Ahí existía `LEAGUES[].totalClubs`,
// un número suelto por liga, en `null` en las 8 desde que se creó el catálogo. Se
// sacó en esta misma versión, no se llenó: es exactamente el error que la cabecera
// de `data/leagues.js` prohíbe para la membresía, un escalón más arriba. La
// cantidad de equipos CAMBIA POR TEMPORADA — la Primera División argentina pasó de
// 20 a 30 equipos dentro del período que el sitio tiene cargado (2009 a 2027) — así
// que un solo número por liga es falso en todas las temporadas menos una, y no hay
// forma de saber en cuál. El dato tiene la misma forma que la membresía, así que
// vive al lado y con la misma regla: SIEMPRE con el año.
//
// POR QUÉ ACÁ Y NO EN UN ARCHIVO NUEVO: viaja en los mismos
// `data/club-leagues/<iso2>.js`, con el mismo `Object.assign` autoregistrado, y por
// lo tanto en el MISMO cargador (`loadClubLeagues()`). Cero pedidos de red nuevos,
// cero cargadores nuevos que mantener, y el repaso anual de una temporada
// (ascensos, descensos y cuántos equipos quedaron) se hace de una sola pasada por
// el archivo de ese país, que es el trabajo que en la práctica se hace junto.
//
// CÓMO SE EDITA, y es la misma regla que la membresía: NO se escribe de memoria ni
// se deduce de cuántos clubes tenemos cargados. Se mira la temporada en Wikipedia
// (o la fuente que corresponda), se anota el número, y se deja escrito contra qué
// se verificó y en qué fecha, arriba del bloque del país. Una liga-temporada que
// nadie verificó simplemente NO tiene entrada acá; `leagueSizeAt()` devuelve null y
// el sitio no dice nada, que es lo correcto. Rellenarla a ojo sería justo el dato
// inventado que todo este archivo existe para no inventar.
//
// EL AÑO ES EL DEL EJERCICIO, no el de la temporada, igual que en
// `CLUB_LEAGUE_BY_YEAR`: la clave es la que usa el sitio para un ejercicio, y se
// resuelve con la MISMA regla de "la categoría al cierre" de la cabecera. Así
// `es-laliga: {2025: 20}` es la temporada 2024/25 (el ejercicio español cierra el
// 30/6/2025) y `ar-primera: {2024: 28}` es el torneo de 2024 (los ejercicios
// argentinos de ese año cierran el 30/6 o el 31/8, con ese torneo en curso). Si no
// fuera así, esta tabla y la de membresía se indexarían distinto y cruzarlas —
// que es TODO lo que se va a hacer con ella — daría cualquier cosa.
//
// PARA QUÉ VA A SERVIR (todavía no la usa nadie, y eso es a propósito: el to-do
// 23(b) era sentar el dato, el consumidor es el 23(c)/33): poder decir "5 de 20
// clubes de esta liga tienen ejercicio cargado" en vez de solo "5 clubes
// cargados". Es el aviso de sesgo del benchmark: 5 de 20 es una muestra, 5 de 5
// es la liga entera, y hoy el sitio no puede distinguirlas.
// ============================================================================
window.LEAGUE_SIZE_BY_YEAR = window.LEAGUE_SIZE_BY_YEAR || {};

// Cuántos equipos jugaron esa liga ese ejercicio, o null si nadie lo verificó.
// null y no un fallback a "el tamaño de hoy" ni a "los que tenemos cargados",
// por el mismo motivo que `leagueAt()`: contestar con otra cosa sería inventar.
// OJO AL CONSUMIRLA: un `N de M` solo se puede escribir si esto NO es null, y el
// N tiene que salir de `clubsOfLeagueYear(liga, año)` — el conteo con año. Con
// `clubsOfLeague()` (sin año) el N y el M serían de temporadas distintas.
function leagueSizeAt(leagueId, year){
  const v = (window.LEAGUE_SIZE_BY_YEAR[leagueId] || {})[year];
  return (typeof v === 'number') ? v : null;
}

// Cuántas liga-temporadas tienen tamaño verificado, para que la auditoría lo
// cuente sin recorrer los datos por su cuenta (mismo rol que
// `clubLeagueCoverage()` para la membresía).
function leagueSizeCoverage(){
  let cargadas = 0;
  for(const leagueId of Object.keys(window.LEAGUE_SIZE_BY_YEAR)){
    cargadas += Object.keys(window.LEAGUE_SIZE_BY_YEAR[leagueId]).length;
  }
  return { cargadas };
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
  return Object.keys(window.CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => window.CLUB_LEAGUE_BY_YEAR[clubId][year] === leagueId)
    .sort();
}

// En qué ejercicios jugó un club una liga dada. Descendente, el más nuevo
// primero (mismo criterio que el `<select>` de Año del sitio).
function yearsOfClubInLeague(clubId, leagueId){
  const rows = window.CLUB_LEAGUE_BY_YEAR[clubId] || {};
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
  const rows = window.CLUB_LEAGUE_BY_YEAR[clubId] || {};
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
  return Object.keys(window.CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => Object.values(window.CLUB_LEAGUE_BY_YEAR[clubId]).includes(leagueId))
    .sort();
}

// Los ejercicios que esa liga tiene cargados (de cualquier club), descendente.
// Es la lista de años elegibles para un benchmark de liga.
function leagueYears(leagueId){
  const years = new Set();
  Object.keys(window.CLUB_LEAGUE_BY_YEAR).forEach(clubId => {
    const rows = window.CLUB_LEAGUE_BY_YEAR[clubId];
    Object.keys(rows).forEach(year => { if(rows[year] === leagueId) years.add(Number(year)); });
  });
  return [...years].sort((a, b) => b - a);
}

// Los clubes que no aparecen bajo ninguna liga porque TODAS sus filas están en
// `null`. Hoy es una lista vacía (los 41 tienen al menos una fila verificada),
// pero un club nuevo nace así, y sin esto quedaría invisible en el árbol: el
// selector lo muestra en una fila aparte del país, "sin liga verificada".
function clubsWithoutVerifiedLeague(){
  return Object.keys(window.CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => !Object.values(window.CLUB_LEAGUE_BY_YEAR[clubId]).some(Boolean))
    .sort();
}
