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
//
// Agregados 2026-09-25 (3 clubes grandes, 2 ejercicios cada uno): Bayern Munich, Borussia
// Dortmund, RB Leipzig — ninguno descendió nunca, 1ª división los 2 ejercicios. Verificado
// contra Wikipedia (en.wikipedia.org/wiki/2023–24_Bundesliga y .../2024–25_Bundesliga), no
// asumido solo por ser clubes habituales de Bundesliga:
//   - Bayern Munich: 2° puesto 2023/24 (campeón Bayer Leverkusen, invicto), campeón 2024/25
//     (82 puntos).
//   - Borussia Dortmund: 5° puesto 2023/24 (con final de Champions League esa misma temporada
//     pese a la floja campaña de liga); 4° puesto 2024/25 (57 puntos, confirmado además por el
//     propio Annual Report 2024/2025: "fourth-place Bundesliga finish", clasificó directo a la
//     fase de liga de la Champions 2025/26).
//   - RB Leipzig: quedó afuera de competencias europeas en 2023/24 (por primera vez desde
//     2017); 7° puesto 2024/25 (51 puntos, confirmado por el propio Lagebericht 2024/2025: "51
//     Punkten auf dem 7. Tabellenplatz", la peor posición final desde el ascenso a 1ª).
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
  // 2021 (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar): campeón de la 2020/21
  // Bundesliga (9° título consecutivo), verificado vía Wikipedia/Bundesliga.com. 2023 (2da tanda,
  // misma sesión): campeón también de la 2022/23 Bundesliga (11° título consecutivo).
  'bayernmunich-de':       { 2021: 'de-bundesliga', 2023: 'de-bundesliga', 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
  'dortmund-de':           { 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
  // 2022 (2da tanda, misma sesión) y 2023 (misma sesión): RB Leipzig es Bundesliga desde su ascenso
  // en 2016/17, sin descenso nunca — 2022/23 terminó 3°, Champions League.
  'rbleipzig-de':          { 2022: 'de-bundesliga', 2023: 'de-bundesliga', 2024: 'de-bundesliga', 2025: 'de-bundesliga' },
});
