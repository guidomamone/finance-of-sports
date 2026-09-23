// ============================================================================
// data/club-leagues/gb.js — en qué liga jugó cada club de Inglaterra en cada
// ejercicio (cierre de ejercicio: 31 de mayo para Arsenal/Liverpool, 30 de
// junio para Manchester City/Everton/Tottenham Hotspur — ver
// club-or-year-onboarding, cada club inglés cierra su ejercicio en una fecha
// distinta, a diferencia de los clubes argentinos que comparten el 30/6).
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
//
// Verificado el 2026-09-22 contra "2023–24 Premier League" y "2024–25 Premier
// League" (Wikipedia): los relegados de 2023/24 fueron Luton Town, Burnley y
// Sheffield United; los de 2024/25, Leicester City, Ipswich Town y Southampton.
// Ninguno de los 5 clubes de abajo está en esas listas, así que los 2 ejercicios
// de cada uno son Premier League.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  'arsenal-gb':   { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'liverpool-gb': { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'mancity-gb':   { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'everton-gb':   { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'tottenham-gb': { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
});
