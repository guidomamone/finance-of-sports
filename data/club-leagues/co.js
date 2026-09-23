// ============================================================================
// data/club-leagues/co.js — en qué liga jugó cada club de Colombia en cada
// ejercicio (cierre de ejercicio: 31/12).
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
  // Verificado el 13/9/2026 contra "2025 Categoría Primera A season" (Wikipedia).
  envigado: { 2025: 'co-primeraA' },           // descendió al terminar 2025
  oncecaldas: { 2025: 'co-primeraA' },
  // Verificado el 22/9/2026 contra "2025 Categoría Primera A season" (Wikipedia): los 5 jugaron
  // la temporada 2025 completa en Primera A (20 equipos participantes ese año).
  'americadecali-co': { 2025: 'co-primeraA' },
  'atlnacional-co': { 2025: 'co-primeraA' },
  'depcali-co': { 2025: 'co-primeraA' },
  'santafe-co': { 2025: 'co-primeraA' },
  'junior-co': { 2025: 'co-primeraA' },
});
