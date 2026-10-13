// ============================================================================
// data/club-leagues/ar.js — en qué liga jugó cada club de Argentina en cada
// ejercicio (cierre de ejercicio: 30/6 y 31/8).
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
  'almagro-ar': { 2018: 'ar-primeranacional', 2019: 'ar-primeranacional', 2020: 'ar-primeranacional', 2021: 'ar-primeranacional', 2022: 'ar-primeranacional', 2023: 'ar-primeranacional' },
  argentinosjuniors: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primeranacional', 2018: 'ar-primera', 2019: 'ar-primera' },
  boca: { 2025: 'ar-primera', 2027: null, 2022: 'ar-primera', 2023: 'ar-primera' },
  estudianteslp: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  independiente: { 2024: 'ar-primera', 2026: 'ar-primera' },
  instituto: { 2024: 'ar-primera' },
  racing: { 2009: 'ar-primera', 2010: 'ar-primera', 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera', 2026: null, 2027: null },
  river: { 2021: 'ar-primera', 2024: 'ar-primera' },
  rosariocentral: { 2023: 'ar-primera', 2025: 'ar-primera' },
  sanlorenzo: { 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2024: 'ar-primera' },
  union: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  velez: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  'talleres-ar': { 2024: 'ar-primera', 2025: 'ar-primera' },
  'newells-ar': { 2019: 'ar-primera' },
  'banfield-ar': { 2020: 'ar-primera' },
  'gimnasiaesgrima-ar': { 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera', 2026: 'ar-primera' },
  'ferrocarriloeste-ar': { 2022: null, 2023: null },
  'godoycruz-ar': { 2020: 'ar-primera' },
  'losandes-ar': { 2020: 'ar-primerab', 2021: 'ar-primerab' },
});

// ---------------------------------------------------------------------------
// CUÁNTOS EQUIPOS TUVO LA LIGA cada ejercicio (ver la cabecera de
// `data/club-leagues.js`, sección "EL TAMAÑO DE LA LIGA", para qué significa y
// cómo se edita). Argentina es el país POR EL QUE esta tabla existe: la Primera
// División pasó de 20 a 30 equipos dentro del período cargado, así que un número
// suelto por liga habría sido falso en casi todas las temporadas.
//
// Verificado el 21/9/2026 contra "Campeonato de Primera División 2024 (Argentina)"
// (Wikipedia, es.wikipedia.org): el infobox declara "Participantes 28".
//
// POR QUÉ EL EJERCICIO 2024 ES EL TORNEO 2024, y por qué acá no hay ambigüedad
// aunque el ejercicio argentino cruce dos torneos. Por la regla de "la categoría
// al cierre" (cabecera de `data/club-leagues.js`), la clave 2024 es el torneo en
// curso a la fecha de cierre. Los 8 clubes con ejercicio 2024 cierran el 30/6
// (siete de ellos) o el 31/8 (River), y el Campeonato de Primera División 2024
// corrió del 10 de mayo al 16 de diciembre: las dos fechas caen adentro.
// Y AUNQUE SE LEYERA AL REVÉS, el número no cambiaría: la otra competencia de ese
// año calendario, la Copa de la Liga Profesional 2024 (25/1 al 5/5), "la
// disputaron los veintiocho equipos que luego participaron del Campeonato de
// Primera División 2024" — las mismas 28 plazas. Queda anotado para que una
// sesión futura no tenga que volver a abrir los dos torneos para convencerse.
//
// OJO AL AGREGAR 2025: NO es 28. La categoría creció a 30, pero el número va
// verificado contra la temporada como cualquier otro, no deducido de este
// comentario.
// ---------------------------------------------------------------------------
window.LEAGUE_SIZE_BY_YEAR = window.LEAGUE_SIZE_BY_YEAR || {};

Object.assign(window.LEAGUE_SIZE_BY_YEAR, {
  'ar-primera': { 2024: 28 },
});
