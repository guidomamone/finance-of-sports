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
  independiente: { 2024: 'ar-primera' },
  instituto: { 2024: 'ar-primera' },              // ascendido para 2023, ya en Primera al cierre
  racing: { 2009: 'ar-primera', 2010: 'ar-primera', 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera', 2026: null, 2027: null },
  // 2026 y 2027 son presupuestos: el de 2027 cierra en el futuro, y el de 2026 (cerrado el
  // 30/6/2026) no se verificó contra la temporada, así que queda en null como cualquier otro
  // dato sin chequear.
  river: { 2024: 'ar-primera' },
  rosariocentral: { 2023: 'ar-primera' },
  sanlorenzo: { 2011: 'ar-primera', 2012: 'ar-primera', 2013: 'ar-primera', 2014: 'ar-primera', 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2024: 'ar-primera' },
  union: { 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
  velez: { 2015: 'ar-primera', 2016: 'ar-primera', 2017: 'ar-primera', 2018: 'ar-primera', 2019: 'ar-primera', 2020: 'ar-primera', 2021: 'ar-primera', 2022: 'ar-primera', 2023: 'ar-primera', 2024: 'ar-primera', 2025: 'ar-primera' },
});
