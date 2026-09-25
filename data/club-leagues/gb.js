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
  // 4 clubes nuevos: Nottingham Forest, West Ham y Wolves jugaron Premier League los 2 ejercicios
  // (verificado contra "2023-24 Premier League" y "2024-25 Premier League", Wikipedia: ninguno de
  // los 3 aparece en las listas de descendidos de esos 2 años — 2023/24: Luton/Burnley/Sheffield
  // United; 2024/25: Leicester/Ipswich/Southampton). Sunderland es el caso distinto: ascendió a la
  // Premier League recién para 2025/26 (vía playoff, jugado en mayo de 2025, POSTERIOR al cierre de
  // su ejercicio 2024/25) — sus 2 ejercicios cargados (2024 y 2025, cierre 31/7) fueron enteros en
  // el Championship, confirmado por el propio Strategic Report de cada documento. El ejercicio
  // "2025" de Wolves cubre 13 meses (1/6/2024-30/6/2025, cambio de fecha de cierre de ejercicio)
  // pero cae enteramente dentro de la temporada 2024/25 de Premier League, sin ambigüedad de liga.
  'nottinghamforest-gb': { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'sunderland-gb':       { 2024: 'gb-championship',  2025: 'gb-championship' },
  'westham-gb':          { 2025: 'gb-premierleague' },
  'wolves-gb':           { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  // 4 clubes ingleses más: Aston Villa (solo 2025 cargado), Bournemouth y Brentford jugaron Premier
  // League en todos sus ejercicios cargados (confirmado en el propio documento de cada uno, no
  // asumido). Burnley es la excepción: 2024 Premier League (recién ascendido, descendió 19°), 2025
  // Championship (recién descendido, ascendió de nuevo terminando 2°) — confirmado también en el
  // propio documento ("Turnover has decreased... due to the Club competing in the Championship,
  // compared to the Premier League").
  'astonvilla-gb':  { 2025: 'gb-premierleague' },
  'bournemouth-gb': { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'brentford-gb':   { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'burnley-gb':     { 2024: 'gb-premierleague', 2025: 'gb-championship' },
  // 5 clubes más: Newcastle, Crystal Palace, Fulham y Chelsea jugaron Premier League en todos sus
  // ejercicios cargados (confirmado en el propio documento de cada uno). Leeds es la excepción:
  // Championship los 2 ejercicios cargados (2023-24 y 2024-25), ascendió a Premier League recién
  // para la temporada 2025-26 (no cargada), confirmado con WebSearch y en el propio documento
  // ("would remain in the Championship for the 2024/25 season").
  'newcastle-gb':      { 2025: 'gb-premierleague' },
  'crystalpalace-gb':  { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'fulham-gb':         { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
  'leeds-gb':          { 2024: 'gb-championship',  2025: 'gb-championship' },
  'chelsea-gb':        { 2025: 'gb-premierleague' },
  // Brighton & Hove Albion: Premier League los 2 ejercicios, confirmado por el propio documento de
  // cada ejercicio (Strategic Report: "finishing in 11th position" en 2023/24, "finishing in 8th
  // position" en 2024/25).
  'brighton-gb':       { 2024: 'gb-premierleague', 2025: 'gb-premierleague' },
});
