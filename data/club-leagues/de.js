// ============================================================================
// data/club-leagues/de.js — en qué liga jugó cada club de Alemania en cada
// ejercicio. El cierre de ejercicio varía por club: los 5 cargados hoy cierran
// 30/6 (Köln, Eintracht Frankfurt, Werder Bremen, FC Augsburg), salvo VfB
// Stuttgart, que cierra en año CALENDARIO (31/12) — ver el comentario de
// cabecera de data/stuttgart-de-data.js.
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
// Verificado el 2026-09-22, sesión de onboarding de los 5 clubes:
//   - 1. FC Köln: el propio Lagebericht 2024/2025 declara "Klassenwechsel in den
//     Geschäftsjahren 2024/2025 (2. Bundesliga) und 2023/2024 (Bundesliga)" — jugó
//     Bundesliga en el ejercicio 2023/24 (cierre 30/6/2024) pero DESCENDIÓ, así
//     que el ejercicio 2024/25 (cierre 30/6/2025) lleva `de-2bundesliga` (campeón,
//     ascenso directo de vuelta).
//   - Eintracht Frankfurt: 6° puesto 2023/24, 3° puesto 2024/25 (clasificó a
//     Champions League), 1ª división los 2 años.
//   - Werder Bremen: 13° (2022/23), 9° (2023/24), 8° (2024/25), sin descenso en
//     ninguno de los 3 ejercicios cargados.
//   - FC Augsburg: 11° (2023/24), 12° (2024/25), 1ª división los 2 años.
//   - VfB Stuttgart: 2° puesto en la temporada 2023/24 (ejercicio calendario
//     2023 y 2024 la cubren, sin descenso), confirmado además por el propio
//     Lagebericht del ejercicio 2023 ("nach dem 16. Spieltag... dritter Platz").
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  'koln-de':               { 2024: 'de-bundesliga', 2025: 'de-2bundesliga' },   // descendió al cierre de 2023/24, campeón y ascenso directo en 2024/25
  'eintrachtfrankfurt-de': { 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
  'werderbremen-de':       { 2023: 'de-bundesliga', 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
  'augsburg-de':           { 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
  'stuttgart-de':          { 2023: 'de-bundesliga', 2024: 'de-bundesliga' },
  // Sesión 2026-09-25: TSG Hoffenheim (7° puesto 2023/24, 15° puesto 2024/25, sin descenso).
  'hoffenheim-de':         { 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
  // Hamburger SV: 2. Bundesliga los 2 ejercicios (asciende a Bundesliga recién para 2025/26, fuera
  // de los 2 ejercicios cargados — ver comentario de cabecera de data/hamburgersv-de-data.js).
  'hamburgersv-de':        { 2024: 'de-2bundesliga', 2025: 'de-2bundesliga' },
  // Borussia Mönchengladbach: ejercicio CALENDARIO. Bundesliga (1ª división) los 2 ejercicios, sin
  // descenso (14° puesto temporada 2023/24, que cubre ambos años calendario cargados).
  'monchengladbach-de':    { 2023: 'de-bundesliga', 2024: 'de-bundesliga' },
});
