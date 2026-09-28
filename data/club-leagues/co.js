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
  // 2024 verificado el 2026-09-28 (to-do 95, pipeline nuevo de Wikipedia: tools/resolve-wikipedia-
  // season-page.mjs + tools/fetch-club-league-reference.mjs) contra "2024 Liga DIMAYOR" (título
  // vigente de la temporada 2024 en Wikipedia, cambió de sponsor respecto de años anteriores):
  // roster de 21 equipos de Primera A 2024, Once Caldas incluido. 2022 verificado el mismo día,
  // mismo pipeline, contra "2022 Liga DIMAYOR": roster de 20 equipos, Once Caldas incluido. 2023
  // verificado el mismo día contra "2023 Liga DIMAYOR": roster de 20 equipos, Once Caldas incluido.
  oncecaldas: { 2022: 'co-primeraA', 2023: 'co-primeraA', 2024: 'co-primeraA', 2025: 'co-primeraA' },
  // Verificado el 22/9/2026 contra "2025 Categoría Primera A season" (Wikipedia): los 5 jugaron
  // la temporada 2025 completa en Primera A (20 equipos participantes ese año).
  'americadecali-co': { 2025: 'co-primeraA' },
  'atlnacional-co': { 2025: 'co-primeraA' },
  'depcali-co': { 2025: 'co-primeraA' },
  'santafe-co': { 2025: 'co-primeraA' },
  'junior-co': { 2025: 'co-primeraA' },
  // Verificado el 2026-09-24 (onboarding, Versión 217) contra "2018 Categoría Primera B season"
  // (Wikipedia): subcampeón del Torneo Águila 2018, ascendido a Primera A para 2019.
  'unionmagdalena-co': { 2018: 'co-primeraB' },
  // Verificado el 2026-09-25 (onboarding, Versión 221) — se enfrentaron entre sí en la Primera A
  // 2025 (Apertura y Clausura), confirma que los 2 jugaron esa categoría ese año.
  'millonarios-co': { 2025: 'co-primeraA' },
  'deportivopereira-co': { 2025: 'co-primeraA' },
  // Verificado el 2026-09-28 contra el roster ya cacheado de "2024 Liga DIMAYOR" (bajado durante
  // el onboarding de Once Caldas, mismo día) -- Boyacá Chicó apareció ahí mismo, sin fetch nuevo.
  'boyacachico-co': { 2024: 'co-primeraA' },
});
