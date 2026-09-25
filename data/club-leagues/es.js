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

  // Verificado el 22/9/2026 contra "2023-24 La Liga", "2024-25 La Liga", "2019-20 Segunda División"
  // y "2023-24 RCD Espanyol season" (Wikipedia/UEFA). Getafe jugó LaLiga los 2 ejercicios cargados,
  // sin ambigüedad. Girona 2019/20 (cierre 30/6/2020) jugó Segunda División (descendido al cierre de
  // 2018/19) -> 'es-segunda'. Espanyol 2023/24 (cierre 30/6/2024) también jugó Segunda División
  // (descendido al cierre de 2022/23, ascendido recién en el playoff de junio de 2024, ya sobre el
  // final del propio ejercicio 2023/24) -> 'es-segunda'.
  'getafe-es': { 2024: 'es-laliga', 2025: 'es-laliga' },
  // Versión de esta sesión: 'es-segunda' se agregó al catálogo (data/leagues.js), así que estos 3
  // ejercicios en Segunda YA NO quedan afuera de la tabla, tienen su fila propia.
  'girona-es': { 2020: 'es-segunda', 2025: 'es-laliga' },
  'espanyol-es': { 2024: 'es-segunda', 2025: 'es-laliga' },

  // Verificado el 22/9/2026 contra "2021-22 CA Osasuna season"/"2023-24 CA Osasuna season" y el
  // propio documento de Osasuna (Nota 6, "instalaciones de Tajonar... 1ª división" al 30/6/2022):
  // Osasuna jugó Primera División los 2 ejercicios cargados, sin descenso.
  'osasuna-es': { 2022: 'es-laliga', 2024: 'es-laliga' },
  // Elche descendió al cierre de 2022/23 y jugó Segunda División en los 2 ejercicios cargados
  // (2023/24 y 2024/25) — el propio presupuesto 2025/26 del club (cifra de negocios proyectada de
  // 58,3 M, el triple de 2024/25) confirma el ascenso recién para la temporada SIGUIENTE, fuera del
  // rango cargado.
  'elche-es': { 2024: 'es-segunda', 2025: 'es-segunda' },
  // Verificado el 2026-09-25 (onboarding, Versión 221) contra Wikipedia en inglés ("2024-25 La
  // Liga", "2024-25 Real Oviedo season"). Real Oviedo jugó Segunda 2024/25 completa (3° en la
  // liga regular, ascendió recién por el playoff de junio 2025, para la temporada SIGUIENTE).
  'rcdmallorca-es': { 2025: 'es-laliga' }, // 10° de 20
  'rayovallecano-es': { 2025: 'es-laliga' }, // 8° de 20
  'realoviedo-es': { 2025: 'es-segunda' },
});

// ---------------------------------------------------------------------------
// CUÁNTOS EQUIPOS TUVO LA LIGA cada ejercicio (ver la cabecera de
// `data/club-leagues.js`, sección "EL TAMAÑO DE LA LIGA", para qué significa y
// cómo se edita). El ejercicio español cierra el 30/6 y coincide con la
// temporada, así que la clave 2025 es la temporada 2024/25.
//
// Verificado el 21/9/2026 contra "2024-25 La Liga" (Wikipedia, en.wikipedia.org),
// que lo dice con todas las letras: "A total of twenty teams contest the league,
// including seventeen sides from the 2023-24 season and three promoted from the
// 2023-24 Segunda División". El infobox declara 380 partidos, consistente con 20
// equipos ida y vuelta (20 x 19).
//
// OJO AL AGREGAR 2024: el ejercicio 2024 (temporada 2023/24, que hoy usa
// villarrealcf) todavía NO está acá. Son 20 también, pero no se escribe hasta
// verificarlo contra "2023-24 La Liga": la regla del archivo es que un número sin
// chequear no entra, aunque parezca obvio.
// ---------------------------------------------------------------------------
window.LEAGUE_SIZE_BY_YEAR = window.LEAGUE_SIZE_BY_YEAR || {};

Object.assign(window.LEAGUE_SIZE_BY_YEAR, {
  'es-laliga': { 2025: 20 },
});
