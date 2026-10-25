// En qué liga jugó cada club en cada ejercicio (las filas, en data/club-leagues/<iso2>.js). Las reglas (`null` = nadie lo verificó,
// 'liga-no-catalogada', 'sin-competencia', la categoría al cierre, nunca una arista club→liga sin año): Admin/ARQUITECTURA.md, "Ligas por ejercicio".

// La tabla nace VACÍA: la llenan los data/club-leagues/<iso2>.js al llamar a loadClubLeagues().
window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

// Los países salen de `clubs{}` (eager). Un país sin archivo se avisa por consola y el resto sigue (allSettled): sus clubes quedan
// fuera del árbol de ligas, que es degradar, no romper.
let _clubLeaguesPromise = null;
function loadClubLeagues(){
  if(_clubLeaguesPromise) return _clubLeaguesPromise;
  // OJO: `clubs` SIN `window.`: data/clubs.js lo declara con `const`, así que window.clubs da undefined.
  const tabla = (typeof clubs !== 'undefined' && clubs) || window.clubs || {};
  const paises = [...new Set(Object.values(tabla)
    .map(c => (c.country || '').toLowerCase()).filter(Boolean))].sort();
  if(!paises.length) console.error('[club-leagues] no se pudo leer clubs{}: el selector va a quedar sin ligas');
  _clubLeaguesPromise = Promise.allSettled(paises.map(p => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    // fosUrl() (js/i18n.js): en /liga/<id> o /club/<id> una ruta relativa se resuelve contra la barra y da 404.
    s.src = fosUrl('data/club-leagues/' + p + '.js') + (window.ASSET_V ? '?v=' + window.ASSET_V : '');
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

// leagueAt(clubId, year): la liga de ESE ejercicio, o null si nadie la verificó (nunca "la liga de hoy").
function leagueAt(clubId, year){
  return ((window.CLUB_LEAGUE_BY_YEAR[clubId] || {})[year]) || null;
}

// Cuántas filas faltan verificar (para audit.js).
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

// Cuántos equipos jugó cada liga en cada ejercicio, siempre con el año (ARQUITECTURA.md, "Ligas por ejercicio").
window.LEAGUE_SIZE_BY_YEAR = window.LEAGUE_SIZE_BY_YEAR || {};

// Cuántos equipos jugaron esa liga ese ejercicio, o null si nadie lo verificó. OJO: un "N de M" solo con esto no null y el N de
// clubsOfLeagueYear(liga, año), del mismo año.
function leagueSizeAt(leagueId, year){
  const v = (window.LEAGUE_SIZE_BY_YEAR[leagueId] || {})[year];
  return (typeof v === 'number') ? v : null;
}

// Cuántas liga-temporadas tienen tamaño verificado (para audit.js).
function leagueSizeCoverage(){
  let cargadas = 0;
  for(const leagueId of Object.keys(window.LEAGUE_SIZE_BY_YEAR)){
    cargadas += Object.keys(window.LEAGUE_SIZE_BY_YEAR[leagueId]).length;
  }
  return { cargadas };
}

// MEMBRESÍA: el ÚNICO camino para contestar "quiénes integran una liga", con el año donde importa. Ignoran las filas en null.

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

// Los clubes con TODAS sus filas en null: el selector los muestra aparte, "sin liga verificada", para que no queden invisibles.
function clubsWithoutVerifiedLeague(){
  return Object.keys(window.CLUB_LEAGUE_BY_YEAR)
    .filter(clubId => !Object.values(window.CLUB_LEAGUE_BY_YEAR[clubId]).some(Boolean))
    .sort();
}
