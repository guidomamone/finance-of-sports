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
  envigado: { 2025: 'co-primeraA' },
  oncecaldas: { 2022: 'co-primeraA', 2023: 'co-primeraA', 2024: 'co-primeraA', 2025: 'co-primeraA' },
  'americadecali-co': { 2025: 'co-primeraA' },
  'atlnacional-co': { 2025: 'co-primeraA' },
  'depcali-co': { 2025: 'co-primeraA' },
  'santafe-co': { 2025: 'co-primeraA' },
  'junior-co': { 2025: 'co-primeraA' },
  'unionmagdalena-co': { 2018: 'co-primeraB' },
  'millonarios-co': { 2025: 'co-primeraA' },
  'deportivopereira-co': { 2025: 'co-primeraA' },
  'boyacachico-co': { 2024: 'co-primeraA' },
  'fortalezaceif-co': { 2025: 'co-primeraA', 2017: 'co-primeraB', 2018: 'co-primeraB', 2019: 'co-primeraB', 2020: 'co-primeraB', 2023: 'co-primeraB', 2024: 'co-primeraA', 2021: 'co-primeraB', 2022: 'co-primeraB' },
});
