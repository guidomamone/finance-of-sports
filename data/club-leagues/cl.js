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
  // clubId con sufijo de país (Versión 129: colocolo-cl/udechile-cl/catolica-cl), clave entre // 2021: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2025: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2020: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2019: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2018: tools/cargar.mjs 2026-10-01, SIN VERIFICAR // 2010: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2011: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2012: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2013: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2014: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2015: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2016: tools/cargar.mjs 2026-10-02, SIN VERIFICAR // 2017: tools/cargar.mjs 2026-10-02, SIN VERIFICAR
  // comillas porque un id con guion no es una key JS válida sin comillas.
  'colocolo-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
  'udechile-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera' },
  'catolica-cl': { 2022: 'cl-primera', 2023: 'cl-primera', 2024: 'cl-primera', 2021: null, 2025: null, 2020: null, 2019: null, 2018: null, 2010: null, 2011: null, 2012: null, 2013: null, 2014: null, 2015: null, 2016: null, 2017: null },
});
