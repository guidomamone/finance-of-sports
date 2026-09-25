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
  // Verificado el 13/9/2026: temporadas 2022, 2023, 2024 y 2025 de Primera División contra sus
  // páginas de Wikipedia (cubren Estudiantes, Unión, Rosario Central, Independiente, Instituto,
  // River, Boca, San Lorenzo 2024, Racing 2024 y Vélez 2024); Argentinos Juniors contra su propia
  // página y la de la B Nacional 2016-17. Vélez, San Lorenzo y Racing en todos los años con
  // balance: confirmado por Guido, que conoce el dato (13/9/2026).
  //
  // SUB-REGLA DE "LA CATEGORÍA AL CIERRE", para los ejercicios que cierran entre dos torneos:
  // vale la categoría de la temporada EN CURSO o recién terminada a la fecha de cierre. Importa
  // una sola vez acá, y es el caso de Argentinos: su ejercicio jul-2015/jun-2016 se jugó entero en
  // Primera (el descenso se definió al terminar el torneo 2016, en mayo), así que ese ejercicio es
  // Primera aunque al 30/6/2016 el club ya estuviera descendido para el torneo siguiente. Leerlo al
  // revés pondría como "B Nacional" un año cuyos ingresos son 100% de Primera.
  argentinosjuniors: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primeranacional', 2018: 'ar-primera', 2019: 'ar-primera' },
  // El único de los 11 que cambió de categoría en el período cargado: descendió al terminar el
  // torneo de transición 2016 y jugó la B Nacional 2016-17, que ganó (terminó el 30/7/2017, o sea
  // que al cierre del ejercicio 2017 todavía estaba en curso). Volvió a Primera para 2017-18.
  boca: { 2025: 'ar-primera', 2027: null },          // 2027 es el presupuesto jul-2026/jun-2027: cierra en el futuro
  estudianteslp: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  independiente: { 2024: 'ar-primera', 2026: 'ar-primera' },
  instituto: { 2024: 'ar-primera' },              // ascendido para 2023, ya en Primera al cierre
  racing: { 2009: 'ar-primera', 2010: 'ar-primera', 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera', 2026: null, 2027: null },
  // 2026 y 2027 son presupuestos: el de 2027 cierra en el futuro, y el de 2026 (cerrado el
  // 30/6/2026) no se verificó contra la temporada, así que queda en null como cualquier otro
  // dato sin chequear.
  river: { 2024: 'ar-primera' },
  rosariocentral: { 2023: 'ar-primera', 2025: 'ar-primera' },
  sanlorenzo: { 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2024: 'ar-primera' },
  union: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  velez: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  // 3 clubes nuevos (sesión 2026-09-23, onboarding de Talleres/Newell's/Banfield). Ninguno se
  // verificó contra Wikipedia línea por línea (mismo nivel de confianza que "conoce el dato" de
  // arriba, no una fuente primaria citada): Talleres jugó Copa Libertadores/Sudamericana los 2 años
  // (confirmado por sus propios ingresos "Copas internacionales" en data/talleres-ar-data.js, algo
  // que solo pasa jugando Primera); Newell's nunca descendió en toda su historia (hecho público muy
  // conocido del fútbol argentino); Banfield 2019-20 lo confirma el propio balance ("CONSIDERACIONES
  // REGLAMENTARIAS A.F.A./SAF", tratando la afiliación a la Superliga como vigente ese ejercicio).
  'talleres-ar': { 2024: 'ar-primera', 2025: 'ar-primera' },
  'newells-ar': { 2019: 'ar-primera' },
  'banfield-ar': { 2020: 'ar-primera' },
  // Confirmado vía en.wikipedia.org ("2025 Club de Gimnasia y Esgrima La Plata season": 2025 fue su
  // 11ma temporada consecutiva en Primera, sin descenso desde ~2015) — cubre los 4 ejercicios.
  'gimnasiaesgrima-ar': { 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera', 2026: 'ar-primera' },
  // Ferro Carril Oeste (Versión 220, sesión 2026-09-24): fuentes encontradas se contradicen entre sí
  // sobre la categoría exacta de estos 2 ejercicios (Primera B Metropolitana/Nacional/Torneo Federal
  // A, ninguna de las cuales tiene liga propia en el catálogo hoy) — queda en `null`, sin verificar,
  // en vez de adivinar.
  'ferrocarriloeste-ar': { 2022: null, 2023: null },
  // Godoy Cruz (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar): Ejercicio N°72
  // (1/7/2019-30/6/2020), Wikipedia confirma temporada 2019-20 completa en Primera División.
  'godoycruz-ar': { 2020: 'ar-primera' },
  // Los Andes (misma sesión): Ejercicio N°105 (cerrado 30/6/2021), confirmado vía WhoScored que
  // jugó la Primera B Metropolitana 2020/2021 — 3er escalón, ver 'ar-primerab' agregado a
  // data/leagues.js en esta misma integración.
  // 2020 (2da tanda, misma sesión, "20 más"): confirmado vía Wikipedia (descendido de la Primera B
  // Nacional al cierre de 2018-19, jugó la B Metropolitana 2019-20, temporada cancelada por la
  // pandemia sin definir ascenso — mismo 3er escalón que 2021).
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
