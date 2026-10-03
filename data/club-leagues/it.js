// ============================================================================
// data/club-leagues/it.js — en qué liga jugó cada club de Italia en cada
// ejercicio. Creado por tools/alta-club.mjs (2026-10-03) al dar de alta el primer club del país.
//
// SE EDITA A MANO (o por alta-club.mjs), no lo genera ningún generador. Un archivo por
// país (Versión 164). SE AUTOREGISTRA con Object.assign sobre la tabla que ya existe.
//
// LAS REGLAS (qué significa `null`, el criterio de "la categoría al cierre", por qué los
// ids de liga nombran el escalón) están UNA sola vez, en la cabecera de
// `data/club-leagues.js`. No se copian acá.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  // Juventus (alta-club.mjs, 2026-10-03): verificado contra roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Juventus".
  'juventus-it': { 2012: 'it-seriea', 2013: 'it-seriea', 2014: 'it-seriea' }, // 2013: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2012–13 Serie A" (tools/club-league-reference/it.json), coincidencia e // 2014: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2013–14 Serie A" (tools/club-league-reference/it.json), coincidencia e
});
