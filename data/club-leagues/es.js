// ============================================================================
// data/club-leagues/es.js — en qué liga jugó cada club de España en cada
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
  // Verificado el 13/9/2026 contra "2024-25 La Liga" y "2023-24 La Liga" (Wikipedia). El
  // ejercicio cierra el 30/6 y coincide con la temporada, sin ambigüedad.
  athleticclub: { 2025: 'es-laliga' },
  atleticomadrid: { 2025: 'es-laliga' },
  celtavigo: { 2025: 'es-laliga' },
  deportivoalaves: { 2025: 'es-laliga' },
  fcbarcelona: { 2025: 'es-laliga' },
  realbetis: { 2025: 'es-laliga' },
  realmadrid: { 2025: 'es-laliga' },
  sevillafc: { 2025: 'es-laliga' },
  valenciacf: { 2025: 'es-laliga' },
  villarrealcf: { 2024: 'es-laliga' },         // temporada 2023/24
});
