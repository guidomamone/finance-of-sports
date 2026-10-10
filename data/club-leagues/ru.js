// ============================================================================
// data/club-leagues/ru.js — en qué liga jugó cada club de Rusia en cada
// ejercicio. Creado por tools/alta-club.mjs (2026-10-10) al dar de alta el primer club del país.
//
// SE EDITA A MANO (o por alta-club.mjs), no lo genera ningún generador. Un archivo por
// país (Versión 164). SE AUTOREGISTRA con Object.assign sobre la tabla que ya existe.
//
// LAS REGLAS (qué significa `null`, el criterio de "la categoría al cierre", por qué los
// ids de liga nombran el escalón) están UNA sola vez, en la cabecera de
// `data/club-leagues.js`. No se copian acá.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  // Krasnodar (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia exacta "Krasnodar".
  'krasnodar-ru': { 2021: 'ru-premierliga', 2021: 'ru-premierliga', 2022: 'ru-premierliga', 2023: 'ru-premierliga', 2024: 'ru-premierliga', 2025: 'ru-premierliga' }, // 2021: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila // 2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json), // 2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023–24 Russian Premier League" (tools/club-league-reference/ru.json), // 2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024–25 Russian Premier League" (tools/club-league-reference/ru.json), // 2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025–26 Russian Premier League" (tools/club-league-reference/ru.json),
  // Dynamo Makhachkala (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Dynamo" = "Dynamo Makhachkala".
  'dynamomakhachkala-ru': { 2021: 'ru-premierliga', 2022: 'ru-premierliga', 2023: 'ru-premierliga', 2024: 'ru-premierliga', 2025: 'ru-premierliga' }, // 2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json), // 2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023–24 Russian Premier League" (tools/club-league-reference/ru.json), // 2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024–25 Russian Premier League" (tools/club-league-reference/ru.json), // 2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025–26 Russian Premier League" (tools/club-league-reference/ru.json),
  // Krylia Sovetov Samara (alta-club.mjs, 2026-10-10): verificado contra roster cacheado de "2021–22 Russian Premier League" (tools/club-league-reference/ru.json), coincidencia única por palabras "Krylia Sovetov" = "Krylia Sovetov Samara".
  'kryliasovetovsamara-ru': { 2021: 'ru-premierliga', 2021: 'ru-premierliga', 2022: 'ru-premierliga', 2023: 'ru-premierliga', 2024: 'ru-premierliga', 2025: 'ru-premierliga' }, // 2021: tools/cargar.mjs 2026-10-10, verificado contra data/club-leagues/ru.js ya tiene la fila // 2022: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2022–23 Russian Premier League" (tools/club-league-reference/ru.json), // 2023: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2023–24 Russian Premier League" (tools/club-league-reference/ru.json), // 2024: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2024–25 Russian Premier League" (tools/club-league-reference/ru.json), // 2025: tools/cargar.mjs 2026-10-10, verificado contra roster cacheado de "2025–26 Russian Premier League" (tools/club-league-reference/ru.json),
});
