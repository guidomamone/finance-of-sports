// ============================================================================
// data/club-leagues/gr.js — en qué liga jugó cada club de Grecia en cada
// ejercicio (cierre de ejercicio: 30/6).
//
// SE EDITA A MANO, no lo genera ninguna herramienta. Un archivo por país
// (Versión 164) para que el repaso anual de ascensos y descensos sea el de UN
// país y no el de una tabla con todos adentro.
//
// SE AUTOREGISTRA, igual que `sources{}` y `gestionesByClub{}` desde la Versión
// 101: no redeclara nada, le agrega sus clubes a la tabla que ya existe. El orden
// en que se carguen los países no importa.
//
// LAS REGLAS (qué significa `null`, el criterio de "la categoría al cierre", por
// qué los ids de liga nombran el escalón y no al organizador) están UNA sola vez,
// en la cabecera de `data/club-leagues.js`. No se copian acá.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  // Verificado el 2026-09-28 (to-do 95) contra "2024–25 Super League Greece" (Wikipedia):
  // Panathinaikos ("PAO") aparece en la tabla de posiciones de esa temporada. La página tiene una
  // tabla wikitable ANTES de la de equipos reales (un resumen de ascendidos/descendidos), así que
  // tools/fetch-club-league-reference.mjs agarró esa por error (extrajo 1 solo equipo,
  // "Levadiakos") -- se confirmó a mano con el wikitext crudo en vez de confiar en el fetch
  // automático. Mismo tipo de limitación que ya quedó anotada para Argentina (to-do 98/95).
  'panathinaikos-gr': { 2025: 'gr-superleague' },
  // AEL Larissa (alta-club.mjs, 2026-10-03): verificado contra roster cacheado de "2024–25 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia única por palabras "AEL" = "AEL Larissa".
  'aellarissa-gr': { 2025: 'gr-superleague2', 2024: 'gr-superleague2', 2022: 'gr-superleague2' }, // 2024: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2023–24 Super League Greece 2" (tools/club-league-reference/gr.json),  // 2022: tools/cargar.mjs 2026-10-03, verificado contra roster cacheado de "2021–22 Super League Greece 2" (tools/club-league-reference/gr.json), 
});
