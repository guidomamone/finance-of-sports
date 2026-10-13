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
  'panathinaikos-gr': { 2025: 'gr-superleague' },
  'aellarissa-gr': { 2025: 'gr-superleague2', 2024: 'gr-superleague2', 2022: 'gr-superleague2', 2020: 'gr-superleague', 2018: 'gr-superleague', 2017: 'gr-superleague', 2016: 'gr-superleague2', 2021: 'gr-superleague', 2019: 'gr-superleague', 2023: 'gr-superleague2' },
});
