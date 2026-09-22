// ============================================================================
// data/club-leagues/jp.js — en qué liga jugó cada club de Japón en cada
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
  // Verificado el 13/9/2026 contra "2025 J1 League" (Wikipedia): los 10 clubes cargados
  // jugaron J1 en 2025.
  cerezoosaka: { 2025: 'jp-j1' },
  fctokyo: { 2025: 'jp-j1' },
  gambaosaka: { 2025: 'jp-j1' },
  kashimaantlers: { 2025: 'jp-j1' },
  kawasakifrontale: { 2025: 'jp-j1' },
  nagoyagrampus: { 2025: 'jp-j1' },
  sanfreccehiroshima: { 2025: 'jp-j1' },
  urawareddiamonds: { 2025: 'jp-j1' },
  visselkobe: { 2025: 'jp-j1' },
  yokohamafmarinos: { 2025: 'jp-j1' },
});

// ---------------------------------------------------------------------------
// CUÁNTOS EQUIPOS TUVO LA LIGA cada ejercicio (ver la cabecera de
// `data/club-leagues.js`, sección "EL TAMAÑO DE LA LIGA", para qué significa y
// cómo se edita). El ejercicio japonés es de año calendario, así que la clave
// coincide con la temporada sin ambigüedad.
//
// Verificado el 21/9/2026 contra "2025 J1 League" (Wikipedia, en.wikipedia.org):
// la lista de clubes de la temporada tiene 20 entradas, y el infobox declara 380
// partidos, que es exactamente el todos-contra-todos ida y vuelta de 20 equipos
// (20 x 19). Además bajaron 3 (Júbilo Iwata, Hokkaido Consadole Sapporo, Sagan
// Tosu) y subieron 3 (Shimizu S-Pulse, Yokohama FC, Fagiano Okayama), o sea que
// el tamaño no cambió respecto de 2024.
// ---------------------------------------------------------------------------
window.LEAGUE_SIZE_BY_YEAR = window.LEAGUE_SIZE_BY_YEAR || {};

Object.assign(window.LEAGUE_SIZE_BY_YEAR, {
  'jp-j1': { 2025: 20 },
});
