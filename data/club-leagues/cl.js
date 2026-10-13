// ============================================================================
// data/club-leagues/cl.js — en qué liga jugó cada club de Chile en cada
// ejercicio (cierre de ejercicio: 31/12, año calendario — sin la ambigüedad de
// un ejercicio partido en 2 torneos que sí tienen Argentina/España).
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
  'colocolo-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
  'udechile-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
  'catolica-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera', 2021: null, 2025: null, 2020: null, 2019: null, 2018: null, 2010: null, 2011: null, 2012: null, 2013: null, 2014: null, 2015: null, 2016: null, 2017: null },
});
