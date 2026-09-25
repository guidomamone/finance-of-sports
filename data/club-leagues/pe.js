// ============================================================================
// data/club-leagues/pe.js — en qué liga jugó cada club de Perú en cada ejercicio
// (cierre de ejercicio: 31/12, año calendario).
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
  // Verificado el 25/9/2026: Alianza Lima jugó Liga 1 (primera división) los 6 ejercicios cargados,
  // sin interrupción. Hubo un intento real de descenso administrativo (tabla acumulada 2019-2020,
  // por los puntos de Carlos Stein), pero el Tribunal Arbitral del Deporte (TAS) anuló esa pérdida de
  // categoría en 2021 antes de que Alianza llegara a jugar en segunda división — nunca descendió de
  // hecho (ver https://www.swissinfo.ch/spa/la-liga-peruana-patas-arriba-tras-anularse-el-descenso-de-alianza-lima/46457674).
  // Campeón de Liga 1 en 2021 y 2022 (24° y 25° título, respectivamente).
  'alianzalima-pe': { 2019: 'pe-liga1', 2020: 'pe-liga1', 2021: 'pe-liga1', 2022: 'pe-liga1', 2023: 'pe-liga1', 2024: 'pe-liga1' },
});
