// ============================================================================
// data/club-leagues/br.js — en qué liga jugó cada club de Brasil en cada
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
  // Verificado el 13/9/2026 contra las páginas de temporada de Wikipedia: Série A 2024 y 2025,
  // Série B 2024 y 2025. El ejercicio es el año calendario, así que coincide con la temporada.
  atleticogoianiense: { 2025: 'br-serieB' },   // descendido de la Série A 2024
  botafogo: { 2024: 'br-serieA' },             // campeón 2024
  // 2023 (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar): jugó la Série A completa
  // 2023, descendido recién al cierre de esa temporada (confirmado por prensa: Gazeta Esportiva/
  // Banda B, derrota vs. Fluminense 25/11/2023).
  coritiba: { 2023: 'br-serieA', 2024: 'br-serieB' },             // descendido de la Série A 2023
  // 2024 (misma sesión): 9° lugar en la Série A 2024, verificado vía Wikipedia.
  cruzeiro: { 2024: 'br-serieA', 2025: 'br-serieA' },
  gremio: { 2024: 'br-serieA' },
  ituano: { 2024: 'br-serieB' },
  mirassol: { 2024: 'br-serieB' },             // ascendió a la Série A para 2025
  // Verificado el 2026-09-24 (onboarding, Versión 217) contra Wikipedia en inglés (temporadas 2023,
  // 2024 y 2025 de cada club). Ejercicio = año calendario, coincide con la temporada.
  'americamineiro-br': { 2023: 'br-serieA', 2024: 'br-serieB', 2025: 'br-serieB' }, // descendido de la Série A al cierre de 2023
  'operarioferroviario-br': { 2024: 'br-serieB', 2025: 'br-serieB' },
  'voltaredonda-br': { 2024: 'br-serieC', 2025: 'br-serieB' }, // campeón de la Série C 2024, ascendido a la Série B para 2025
  // Verificado el 2026-09-24 (onboarding, Versión 219) contra Wikipedia en inglés (temporadas 2019,
  // 2023, 2024 y 2025 de cada club). Ejercicio = año calendario, coincide con la temporada.
  'flamengo-br': { 2024: 'br-serieA', 2025: 'br-serieA' }, // 3° en 2024, campeón 2025
  'atleticomineiro-br': { 2023: 'br-serieA', 2024: 'br-serieA', 2025: 'br-serieA' }, // clasificó a Libertadores 2023, a Sudamericana 2025
  'athleticoparanaense-br': { 2024: 'br-serieA', 2025: 'br-serieB' }, // descendido de la Série A al cierre de 2024 (18°), 2° en la Série B 2025, vuelve a la A en 2026
  'vitoria-br': { 2025: 'br-serieA' }, // 15° de 20
  'rbbragantino-br': { 2019: 'br-serieB', 2024: 'br-serieA' }, // campeón de la Série B 2019 (ascenso), 16° en la Série A 2024
  // Verificado el 2026-09-24 (onboarding, Versión 220) contra Wikipedia en inglés (temporadas 2021,
  // 2023, 2024 y 2025 de cada club). Ejercicio = año calendario, coincide con la temporada.
  'corinthians-br': { 2024: 'br-serieA', 2025: 'br-serieA' },
  'palmeiras-br': { 2024: 'br-serieA', 2025: 'br-serieA' }, // 2° en 2024
  'saopaulo-br': { 2023: 'br-serieA', 2024: 'br-serieA' },
  'santos-br': { 2024: 'br-serieB', 2025: 'br-serieA' }, // descendido por primera vez en su historia al cierre de 2023; campeón de la Série B 2024, vuelve a la A en 2025
  'internacional-br': { 2024: 'br-serieA', 2025: 'br-serieA' }, // clasificó a Libertadores los 2 años
  'fluminense-br': { 2024: 'br-serieA', 2025: 'br-serieA' }, // clasificó a Libertadores 2026 por el resultado de 2025
  'fortaleza-br': { 2025: 'br-serieA' }, // descendido al cierre de 2025 (jugó la Série A completa ese año)
  'bahia-br': { 2024: 'br-serieA', 2025: 'br-serieA' }, // clasificó a Libertadores los 2 años
  // 2017 (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar): entre los primeros 6,
  // clasificó a Copa Libertadores 2018 (verificado vía Wikipedia, "2017 Campeonato Brasileiro Série
  // A"); jugó Série A de corrido desde el ascenso previo hasta la caída de 2021 de abajo.
  'chapecoense-br': { 2017: 'br-serieA', 2021: 'br-serieA' }, // ascendido en 2020, descendido al cierre de 2021
  'vascodagama-br': { 2023: 'br-serieA' }, // ascendido en 2022, primera temporada completa de vuelta en Série A
  // Verificado el 2026-09-25 (onboarding, Versión 221) contra Wikipedia en inglés (temporadas 2022,
  // 2023, 2024 y 2025).
  'guarani-br': { 2024: 'br-serieB', 2025: 'br-serieC' }, // descendido de la Série B al cierre de 2024
  'pontepreta-br': { 2022: 'br-serieB', 2023: 'br-serieB', 2024: 'br-serieB' }, // descendido de la Série B al cierre de 2024, campeón de la Série C 2025 (fuera del rango cargado)
  // Tanda de 5 clubes brasileños nuevos (onboarding sesión 2026-09-25, tanda de 20 transcripts al
  // azar: Ceará, Sport Recife, Amazonas, Juventude, Botafogo-SP — este último NO es el Botafogo de
  // Río, ya cargado como `botafogo`, es la SAF de Ribeirão Preto).
  'ceara-br': { 2024: null, 2025: 'br-serieA' }, // 2025 confirmado (rebaixado a la Série B recién para 2026); 2024 sin verificar
  'sportrecife-br': { 2025: 'br-serieA' }, // jugó la Série A completa 2025 (61 partidos, el propio documento), rebaixado para 2026
  'amazonas-br': { 2024: 'br-serieB' }, // ascendido campeón de la Série C 2023
  'juventude-br': { 2020: 'br-serieB' }, // obtuvo el ascenso a la Série A para 2021 (jugó la B en 2020)
  'botafogosp-br': { 2024: 'br-serieB' }, // 17° lugar
});
