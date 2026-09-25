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
  // Verificado el 25/9/2026 contra "2022/2023/2024 Campeonato Nacional Primera División" (Wikipedia):
  // los 3 jugaron Primera División de Chile en los 3 ejercicios (Colo-Colo campeón en 2022 y 2024).
  // clubId con sufijo de país (Versión 129: colocolo-cl/udechile-cl/catolica-cl), clave entre
  // comillas porque un id con guion no es una key JS válida sin comillas.
  'colocolo-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
  'udechile-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
  'catolica-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
});
