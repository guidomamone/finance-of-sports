// ============================================================================
// data/juventus-it-data.js — Juventus Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "juventus-it" — slug de "Juventus" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Juventus Football Club S.p.A." — el .md, 3 veces (nombre del club + forma societaria)
//   displayName        ok        "Juventus" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (296 de 310 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 140 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2012 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2012-06-30" — año del ejercicio + mes de cierre (contenido del .md (296 de 310 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2012-06-30" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.794281. --escribir agrega 'EUR@2012-06-30' a FX_CLOSE
//   sourceId           ok        "juventus-it-annual-financial-report-2011-12" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2011–12 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Juventus"
//
// FISCAL YEAR META PROPUESTO para 2012 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2012: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2012-06-30","sourceId":"juventus-it-annual-financial-report-2011-12"}
// ============================================================================

const juventusitRevenueLinesByYear = {
  // 2012: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2011-12.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:31.824261, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.99
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:90.581926, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:53.452409, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:18.433501, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.94
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:19.494134, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.98
  ],
  // 2013: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2012-13.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2012-13.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2013: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:38.051069, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:163.47767, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:52.598893, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:11.397065, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:18.276776, disclosureLevel:'aggregated' }, // pág. 79, precedente
  ],
  // 2014: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2013-14.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2013-14.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2014: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:40.996209, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:150.965077, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:60.29976, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:36.431526, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:27.090529, disclosureLevel:'aggregated' }, // pág. 77, precedente
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2014-15.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2014-15.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:51.368524, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:194.710818, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:53.755276, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:23.527518, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:24.831749, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other non-recurring revenues and costs', normalizedCategory:'other_income', amountNative:1.75, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:65.411, disclosureLevel:'aggregated' }, // pág. 149, precedente
    { rawLabel:'Broadcasting revenues', normalizedCategory:'broadcasting', amountNative:177.389, disclosureLevel:'aggregated' }, // pág. 149, Jev 1
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:105.619, disclosureLevel:'aggregated' }, // pág. 149, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:10.313, disclosureLevel:'aggregated' }, // pág. 149, Jev 1
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:109.725, disclosureLevel:'aggregated' }, // pág. 149, precedente
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:61.173, disclosureLevel:'aggregated' }, // pág. 149, Jev 0.99
    { rawLabel:'Equity-accounted profit (loss) of associates and joint ventures', normalizedCategory:'other_income', amountNative:0.401, disclosureLevel:'aggregated' }, // pág. 149, Jev 1
  ],
  // 2016: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2015-16.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2015-16.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2016: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:43.667912, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:194.897031, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:70.008038, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:13.509887, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:46.403703, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:19.414202, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Other non-recurring revenues and costs', normalizedCategory:'other_income', amountNative:10.638769, disclosureLevel:'aggregated' }, // pág. 64, precedente
  ],
  // 2017: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2016-17.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2016-17.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:57.835297, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:232.773784, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:74.718794, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:19.198979, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:151.149536, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:27.034664, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Other non-recurring revenues and costs', normalizedCategory:'other_income', amountNative:0.35, disclosureLevel:'aggregated' }, // pág. 68, precedente
  ],
  // 2018: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2017-18.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2017-18.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2018: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:56.410423, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:200.169142, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:86.896999, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:27.796591, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:102.401466, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:30.995269, disclosureLevel:'aggregated' }, // pág. 45, precedente
  ],
  // 2020: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2019-20.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:49.200379, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:166.378556, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:129.560768, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:31.725193, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:172.020621, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Other revenue and income', normalizedCategory:'other_income', amountNative:24.538574, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2020-21.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:7.751571, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:235.310322, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:145.907636, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:25.303332, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:43.179105, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other revenue and income', normalizedCategory:'other_income', amountNative:21.551574, disclosureLevel:'aggregated' }, // pág. 69, precedente
  ],
  // 2007: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2006-07.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2006-07.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2007: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:7.74397, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:92.995993, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:34.497537, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:41.531103, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:9.917241, disclosureLevel:'aggregated' }, // pág. 61, precedente
  ],
  // 2009: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2008-09.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2008-09.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2009: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:18.43599, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:150.350568, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:46.133442, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:17.270843, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:8.243297, disclosureLevel:'aggregated' }, // pág. 75, precedente
  ],
  // 2010: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2009-10.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2009-10.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2010: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:18.471393, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:151.436256, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:45.678338, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:14.66472, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:9.914903, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Other non recurring revenues and costs', normalizedCategory:'other_income', amountNative:3.134187, disclosureLevel:'aggregated' }, // pág. 62, precedente
  ],
  // 2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2018-19.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Ticket sales', normalizedCategory:'matchday_competition', amountNative:70.652591, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Television and radio rights and media revenues', normalizedCategory:'broadcasting', amountNative:206.642858, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Revenues from sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:108.842634, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Revenues from sales of products and licences', normalizedCategory:'sponsorship_commercial', amountNative:44.026765, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Revenues from players\' registration rights', normalizedCategory:'player_sales', amountNative:157.186818, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Other revenues', normalizedCategory:'other_income', amountNative:34.104728, disclosureLevel:'aggregated' }, // pág. 43, precedente
  ],
  // 2003: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2002-03.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2002-03.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2003: [
    { rawLabel:'1) REVENUES FROM SALES AND SERVICES', normalizedCategory:'matchday_competition', amountNative:22.589103, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'a) Income from temporary transfer of players', normalizedCategory:'player_sales', amountNative:1.016095, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.98
    { rawLabel:'e) Other revenues and income', normalizedCategory:'other_income', amountNative:17.21318, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'a) capital gains on disposals', normalizedCategory:'player_sales', amountNative:48.013871, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'b) use of reserve art. 25 of the Company By-Laws', normalizedCategory:'other_income', amountNative:0.613289, disclosureLevel:'aggregated' }, // pág. 68, Jev 0.99
    { rawLabel:'d) others', normalizedCategory:'other_income', amountNative:4.217905, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Official and technical sponsors', normalizedCategory:'sponsorship_commercial', amountNative:32.15, disclosureLevel:'aggregated' }, // pág. 87, Jev 1
    { rawLabel:'Other sponsorships and other commercial contracts', normalizedCategory:'sponsorship_commercial', amountNative:19.53, disclosureLevel:'aggregated' }, // pág. 87, Jev 0.99
    { rawLabel:'Television revenues', normalizedCategory:'broadcasting', amountNative:78.201921, disclosureLevel:'aggregated' }, // pág. 87, Jev 1
    { rawLabel:'TV revenues percentage from visiting team', normalizedCategory:'broadcasting', amountNative:3.488, disclosureLevel:'aggregated' }, // pág. 87, Jev 0.99
    { rawLabel:'Telephonic rights', normalizedCategory:'broadcasting', amountNative:5.715, disclosureLevel:'aggregated' }, // pág. 87, precedente
    { rawLabel:'Revenues from U.E.F.A. Champions League', normalizedCategory:'competition_bonus', amountNative:35.009, disclosureLevel:'aggregated' }, // pág. 87, Jev 0.96
    { rawLabel:'Advertising', normalizedCategory:'sponsorship_commercial', amountNative:0.536, disclosureLevel:'aggregated' }, // pág. 87, Jev 1
    { rawLabel:'Players\' and coach image rights', normalizedCategory:'sponsorship_commercial', amountNative:2.396, disclosureLevel:'aggregated' }, // pág. 87, precedente
    { rawLabel:'Sundry income', normalizedCategory:'other_income', amountNative:0.478, disclosureLevel:'aggregated' }, // pág. 87, Jev 0.98
  ],
  // 2004: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Italia/Juventus/Juventus-annual-financial-report-2003-04.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Juventus/Juventus-annual-financial-report-2003-04.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2004: [
    { rawLabel:'1) REVENUES FROM SALES AND SERVICES', normalizedCategory:'matchday_competition', amountNative:17.612596, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'a) Income from temporary transfer of players', normalizedCategory:'player_sales', amountNative:0.91, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.98
    { rawLabel:'e) Other revenues and income', normalizedCategory:'other_income', amountNative:33.125764, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'a) capital gains on disposals', normalizedCategory:'player_sales', amountNative:5.043852, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'b) use of reserve ex art. 26 of the Company By-Laws', normalizedCategory:'other_income', amountNative:0.215006, disclosureLevel:'aggregated' }, // pág. 75, Jev 0.99
    { rawLabel:'d) others', normalizedCategory:'other_income', amountNative:0.103318, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Official and technical sponsors', normalizedCategory:'sponsorship_commercial', amountNative:32.578, disclosureLevel:'aggregated' }, // pág. 95, Jev 1
    { rawLabel:'Other sponsorships and other commercial contracts', normalizedCategory:'sponsorship_commercial', amountNative:17.782, disclosureLevel:'aggregated' }, // pág. 95, Jev 0.99
    { rawLabel:'Television revenues', normalizedCategory:'broadcasting', amountNative:84.968975, disclosureLevel:'aggregated' }, // pág. 95, Jev 1
    { rawLabel:'TV revenues percentage from visiting team', normalizedCategory:'broadcasting', amountNative:3.53, disclosureLevel:'aggregated' }, // pág. 95, Jev 0.99
    { rawLabel:'Telephonic rights', normalizedCategory:'broadcasting', amountNative:6.72, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Revenues from U.E.F.A. Champions League', normalizedCategory:'competition_bonus', amountNative:14.927, disclosureLevel:'aggregated' }, // pág. 95, Jev 0.96
    { rawLabel:'Advertising', normalizedCategory:'sponsorship_commercial', amountNative:1.052, disclosureLevel:'aggregated' }, // pág. 95, Jev 1
    { rawLabel:'Players\' and coach image rights', normalizedCategory:'sponsorship_commercial', amountNative:2.353, disclosureLevel:'aggregated' }, // pág. 95, precedente
    { rawLabel:'Sundry income', normalizedCategory:'other_income', amountNative:0.392, disclosureLevel:'aggregated' }, // pág. 95, Jev 0.98
  ],
};
const juventusitExpenseLinesByYear = {
  2012: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.588125, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-41.162241, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-137.131802, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-12.959489, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-6.297027, disclosureLevel:'aggregated' }, // pág. 86, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-6.179816, disclosureLevel:'aggregated' }, // pág. 86, Jev 1
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-52.304836, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.96
    { rawLabel:'Amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-6.794484, disclosureLevel:'aggregated' }, // pág. 86, Jev 0.96
    { rawLabel:'Provisions and other write-downs/reverses and releases', normalizedCategory:'other_amortisation', amountNative:10.443216, disclosureLevel:'aggregated' }, // pág. 86, precedente
  ],
  2013: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.93377, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-45.079682, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-149.010399, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-14.452797, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-5.579779, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-10.03385, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-51.414589, disclosureLevel:'aggregated' }, // pág. 79, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-8.291739, disclosureLevel:'aggregated' }, // pág. 79, Jev 0.99
    { rawLabel:'Provisions and other write-downs/reverses and releases', normalizedCategory:'other_amortisation', amountNative:-0.810874, disclosureLevel:'aggregated' }, // pág. 79, precedente
  ],
  2014: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.471449, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-47.960673, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-167.886939, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-16.203836, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-3.83044, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-7.259174, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-50.845719, disclosureLevel:'aggregated' }, // pág. 77, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-8.216286, disclosureLevel:'aggregated' }, // pág. 77, Jev 0.99
    { rawLabel:'Provisions and other write-downs/reverses and releases', normalizedCategory:'other_amortisation', amountNative:-1.262567, disclosureLevel:'aggregated' }, // pág. 77, precedente
  ],
  2015: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.103221, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-45.888195, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-178.839411, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-19.590646, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-7.090063, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-9.343474, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-57.874089, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-8.476726, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.99
    { rawLabel:'Provisions and other write-downs/reverses and releases', normalizedCategory:'other_amortisation', amountNative:-0.434553, disclosureLevel:'aggregated' }, // pág. 69, precedente
  ],
  2025: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Cost of raw materials and other consumables', normalizedCategory:'admin_general_expense', amountNative:-4.678, disclosureLevel:'aggregated' }, // pág. 149, Claude 0.85
    { rawLabel:'Cost of goods for sale', normalizedCategory:'other_expenses', amountNative:-2.278, disclosureLevel:'aggregated' }, // pág. 149, Jev 0.98
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-94.669, disclosureLevel:'aggregated' }, // pág. 149, precedente
    { rawLabel:'Registered players and technical staff', normalizedCategory:'wages_squad', amountNative:-220.269, disclosureLevel:'aggregated' }, // pág. 149, Jev 0.92
    { rawLabel:'Other personnel expenses', normalizedCategory:'admin_general_expense', amountNative:-24.397, disclosureLevel:'aggregated' }, // pág. 149, Claude 0.92
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-43.771, disclosureLevel:'aggregated' }, // pág. 149, precedente
    { rawLabel:'Other operating expenses', normalizedCategory:'other_expenses', amountNative:-15.602, disclosureLevel:'aggregated' }, // pág. 149, Jev 1
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-124.932, disclosureLevel:'aggregated' }, // pág. 149, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-12.216, disclosureLevel:'aggregated' }, // pág. 149, Jev 0.99
    { rawLabel:'Provisions, other impairments/reversals and releases of provisions', normalizedCategory:'other_amortisation', amountNative:-16.766, disclosureLevel:'aggregated' }, // pág. 149, Jev 0.93
  ],
  2016: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.380235, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Purchases of products for sale', normalizedCategory:'other_expenses', amountNative:-4.344289, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-51.503546, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-197.742952, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-23.740893, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-10.94084, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-8.441139, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-67.046721, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-9.28455, disclosureLevel:'aggregated' }, // pág. 64, precedente
    { rawLabel:'Provisions, write-downs and release of funds', normalizedCategory:'other_amortisation', amountNative:-1.9, disclosureLevel:'aggregated' }, // pág. 64, Claude 0.93
    { rawLabel:'Group\'s share of results of associates and joint ventures', normalizedCategory:'other_expenses', amountNative:-0.661133, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
  ],
  2017: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.979934, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Purchases of products for sale', normalizedCategory:'other_expenses', amountNative:-8.29014, disclosureLevel:'aggregated' }, // pág. 68, Jev 0.99
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-66.578563, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-235.344554, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-26.481657, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-50.492316, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-10.52469, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-82.949776, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-9.934144, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'Provisions, write-downs and release of funds', normalizedCategory:'other_amortisation', amountNative:-2.107849, disclosureLevel:'aggregated' }, // pág. 68, Claude 0.93
    { rawLabel:'Group\'s share of results of associates and *joint ventures', normalizedCategory:'other_expenses', amountNative:-1.266633, disclosureLevel:'aggregated' }, // pág. 68, Jev 0.98
  ],
  2018: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.464062, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Purchases of products for sale', normalizedCategory:'other_expenses', amountNative:-11.469144, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-76.943169, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-233.319806, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-25.683238, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-20.107143, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-12.273621, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-107.954427, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-12.525527, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Provisions, write-downs and release of funds', normalizedCategory:'other_amortisation', amountNative:-2.363811, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.93
    { rawLabel:'Group\'s share of results of associates and joint ventures', normalizedCategory:'other_expenses', amountNative:-0.886073, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
  ],
  2020: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.20779, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Purchases of products for sale', normalizedCategory:'other_expenses', amountNative:-12.142221, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-71.126279, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-259.273661, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-25.065396, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-31.123416, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-12.184348, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-193.47591, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-17.417474, disclosureLevel:'aggregated' }, // pág. 49, precedente
    { rawLabel:'Provisions, write-downs and release of funds', normalizedCategory:'other_amortisation', amountNative:-15.468313, disclosureLevel:'aggregated' }, // pág. 49, Claude 0.93
    { rawLabel:'Group\'s share of results of associates and joint ventures', normalizedCategory:'other_expenses', amountNative:-1.107177, disclosureLevel:'aggregated' }, // pág. 49, Jev 0.99
  ],
  2021: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.770321, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Purchases of products for sale', normalizedCategory:'other_expenses', amountNative:-11.749404, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-64.010795, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-298.193764, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-23.771876, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-37.328857, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-9.544876, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-197.437118, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Depreciation/amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-17.437779, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Provisions, write-downs and release of funds', normalizedCategory:'other_amortisation', amountNative:-11.595333, disclosureLevel:'aggregated' }, // pág. 69, precedente
    { rawLabel:'Share of results of associates and joint ventures', normalizedCategory:'other_expenses', amountNative:-0.196921, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.94
  ],
  2007: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.159079, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-28.400285, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-95.018696, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-7.872066, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-4.526139, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Other costs', normalizedCategory:'other_expenses', amountNative:-8.420421, disclosureLevel:'aggregated' }, // pág. 61, Jev 0.99
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-22.764546, disclosureLevel:'aggregated' }, // pág. 61, precedente
    { rawLabel:'Other amortisation, write-downs and provisions', normalizedCategory:'other_amortisation', amountNative:-10.054944, disclosureLevel:'aggregated' }, // pág. 61, Jev 1
  ],
  2009: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.299971, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-27.789763, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-129.285999, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-8.477818, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-2.271636, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Other costs', normalizedCategory:'other_expenses', amountNative:-24.053994, disclosureLevel:'aggregated' }, // pág. 75, Jev 0.99
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-28.038586, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'Other amortisation, write-downs and provisions', normalizedCategory:'other_amortisation', amountNative:-4.338215, disclosureLevel:'aggregated' }, // pág. 75, Jev 1
  ],
  2010: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-2.246618, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-27.265348, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-127.035001, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-11.167834, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-3.42177, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Other costs', normalizedCategory:'other_expenses', amountNative:-25.352588, disclosureLevel:'aggregated' }, // pág. 62, Jev 0.99
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-39.486912, disclosureLevel:'aggregated' }, // pág. 62, precedente
    { rawLabel:'Other amortisation, write-downs and provisions', normalizedCategory:'other_amortisation', amountNative:-2.10402, disclosureLevel:'aggregated' }, // pág. 62, Jev 1
  ],
  2019: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Purchase of materials, supplies and other consumables', normalizedCategory:'admin_general_expense', amountNative:-3.733793, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Purchases of products for sale', normalizedCategory:'other_expenses', amountNative:-17.501352, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'External services', normalizedCategory:'admin_general_expense', amountNative:-81.236433, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Players\' wages and technical staff costs', normalizedCategory:'wages_squad', amountNative:-301.334879, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Other personnel', normalizedCategory:'admin_general_expense', amountNative:-26.416512, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Expenses from players\' registration rights', normalizedCategory:'other_expenses', amountNative:-15.521017, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Other expenses', normalizedCategory:'other_expenses', amountNative:-12.717676, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Amortisation and write-downs of players\' registration rights', normalizedCategory:'player_amortisation', amountNative:-149.440966, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Amortisation of other tangible and intangible assets', normalizedCategory:'other_amortisation', amountNative:-11.722391, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Provisions, write-downs and release of funds', normalizedCategory:'other_amortisation', amountNative:-17.160672, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Group\'s share of results of associates and joint ventures', normalizedCategory:'other_expenses', amountNative:-0.500891, disclosureLevel:'aggregated' }, // pág. 43, precedente
  ],
  2003: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'6) PURCHASES', normalizedCategory:'other_expenses', amountNative:-1.926493, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.99
    { rawLabel:'7) SERVICE EXPENSES', normalizedCategory:'admin_general_expense', amountNative:-29.289936, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'8) LEASE AND RENT COSTS', normalizedCategory:'admin_general_expense', amountNative:-12.51283, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.99
    { rawLabel:'a) Salaries and wages', normalizedCategory:'wages_squad', amountNative:-128.222349, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.98
    { rawLabel:'b) Social security contributions', normalizedCategory:'wages_squad', amountNative:-2.900048, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'c) Severance indemnity', normalizedCategory:'wages_squad', amountNative:-0.570386, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'e) Other costs', normalizedCategory:'other_expenses', amountNative:-0.000304, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.99
    { rawLabel:'a) Amortisation of intangible fixed assets', normalizedCategory:'player_amortisation', amountNative:-61.866923, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'b) Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-0.550461, disclosureLevel:'aggregated' }, // pág. 67, Jev 1
    { rawLabel:'d) Write-downs of receivables entered under current assets and cash at bank and in hand', normalizedCategory:'other_amortisation', amountNative:-0.100217, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'Other risks', normalizedCategory:'other_expenses', amountNative:-1.224288, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.94
    { rawLabel:'a) Match organisation expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.435865, disclosureLevel:'aggregated' }, // pág. 67, Jev 1
    { rawLabel:'b) Official match expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.116913, disclosureLevel:'aggregated' }, // pág. 67, Jev 1
    { rawLabel:'c) Match registration fees', normalizedCategory:'match_organisation_expense', amountNative:-0.004823, disclosureLevel:'aggregated' }, // pág. 67, Jev 1
    { rawLabel:'d) Others', normalizedCategory:'other_expenses', amountNative:-22.385241, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.99
    { rawLabel:'c) of securities entered under current assets other than shareholdings', normalizedCategory:'other_expenses', amountNative:-0.196702, disclosureLevel:'aggregated' }, // pág. 68, Jev 0.94
    { rawLabel:'a) capital losses on disposals', normalizedCategory:'exceptional_items', amountNative:-2.447425, disclosureLevel:'aggregated' }, // pág. 68, precedente
    { rawLabel:'c) other extraordinary expenses', normalizedCategory:'exceptional_items', amountNative:-1.469301, disclosureLevel:'aggregated' }, // pág. 68, precedente
  ],
  2004: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'6) RAW MATERIALS, SUPPLIES, CONSUMABLES AND GOODS', normalizedCategory:'admin_general_expense', amountNative:-2.889909, disclosureLevel:'aggregated' }, // pág. 74, Claude 0.8
    { rawLabel:'7) SERVICES', normalizedCategory:'admin_general_expense', amountNative:-24.243997, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.99
    { rawLabel:'8) LEASES AND RENTALS', normalizedCategory:'admin_general_expense', amountNative:-3.889311, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.99
    { rawLabel:'a) Salaries and wages', normalizedCategory:'wages_squad', amountNative:-113.70405, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.98
    { rawLabel:'b) Social security contributions', normalizedCategory:'wages_squad', amountNative:-2.817063, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'c) Employees\' severance indemnity', normalizedCategory:'admin_general_expense', amountNative:-0.473703, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.9
    { rawLabel:'e) Other costs', normalizedCategory:'other_expenses', amountNative:-0.089351, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.99
    { rawLabel:'a) Amortisation of intangible fixed assets', normalizedCategory:'player_amortisation', amountNative:-64.274145, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'b) Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-0.92213, disclosureLevel:'aggregated' }, // pág. 74, Jev 1
    { rawLabel:'d) Write-downs of receivables entered under current assets and cash at bank and in hand', normalizedCategory:'other_amortisation', amountNative:-0.51726, disclosureLevel:'aggregated' }, // pág. 74, precedente
    { rawLabel:'a) Match organisation expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.172906, disclosureLevel:'aggregated' }, // pág. 74, Jev 1
    { rawLabel:'b) Official match expenses', normalizedCategory:'match_organisation_expense', amountNative:-0.110419, disclosureLevel:'aggregated' }, // pág. 74, Jev 1
    { rawLabel:'c) Match registration fees', normalizedCategory:'match_organisation_expense', amountNative:-0.001182, disclosureLevel:'aggregated' }, // pág. 74, Jev 1
    { rawLabel:'d) Others', normalizedCategory:'other_expenses', amountNative:-20.402008, disclosureLevel:'aggregated' }, // pág. 74, Jev 0.99
    { rawLabel:'a) capital losses on disposals', normalizedCategory:'exceptional_items', amountNative:-1.314812, disclosureLevel:'aggregated' }, // pág. 75, precedente
    { rawLabel:'c) others', normalizedCategory:'other_expenses', amountNative:-3.121282, disclosureLevel:'aggregated' }, // pág. 75, Jev 0.99
  ],
};
const juventusitFiscalYearMeta = {
  2012: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2012-06-30',
    sourceId:'juventus-it-annual-financial-report-2011-12',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.730256, tax:-2.735921,
    extraRows: [
      {label:'Financial income', value:1.380876},
      {label:'Financial expenses', value:-6.111132},
      {label:'Current taxes', value:-3.788628},
      {label:'Deferred taxes', value:1.052707},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:213.786231, officialTotalExpenses:254.974604, officialPAT:-48.65455,
  },
  2013: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2013-06-30',
    sourceId:'juventus-it-annual-financial-report-2012-13',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.108992, tax:-4.995651,
    extraRows: [
      {label:'Financial income', value:2.364266},
      {label:'Financial expenses', value:-9.473258},
      {label:'Current taxes', value:-5.924068},
      {label:'Deferred taxes', value:0.928417},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:283.801473, officialTotalExpenses:287.607479, officialPAT:-15.910649,
  },
  2014: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2014-06-30',
    sourceId:'juventus-it-annual-financial-report-2013-14',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-8.699553, tax:-6.820895,
    extraRows: [
      {label:'Financial income', value:3.131807},
      {label:'Financial expenses', value:-11.83136},
      {label:'Current taxes', value:-7.20472},
      {label:'Deferred taxes', value:0.383825},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:315.783101, officialTotalExpenses:306.937083, officialPAT:-6.67443,
  },
  2015: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2015-06-30',
    sourceId:'juventus-it-annual-financial-report-2014-15',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-8.495602, tax:-8.509642,
    extraRows: [
      {label:'Financial income', value:2.365061},
      {label:'Financial expenses', value:-10.860663},
      {label:'Current taxes', value:-7.992976},
      {label:'Deferred taxes', value:-0.516666},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:349.943885, officialTotalExpenses:330.640378, officialPAT:2.298263,
  },
  2025: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'juventus-it-annual-financial-report-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-20.412, tax:-8.187,
    extraRows: [
      {label:'Financial income', value:6.351},
      {label:'Financial expenses', value:-26.763},
      {label:'Current taxes', value:-8.024},
      {label:'Deferred taxes', value:-0.163},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:530.031, officialTotalExpenses:559.578, officialPAT:-58.146,
  },
  2016: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2016-06-30',
    sourceId:'juventus-it-annual-financial-report-2015-16',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.945276, tax:-7.545656,
    extraRows: [
      {label:'Financial income', value:2.408661},
      {label:'Financial expenses', value:-10.353937},
      {label:'Current taxes', value:-8.431039},
      {label:'Deferred taxes', value:0.885383},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:398.539542, officialTotalExpenses:378.986298, officialPAT:4.062312,
  },
  2017: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2017-06-30',
    sourceId:'juventus-it-annual-financial-report-2016-17',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.696079, tax:-15.846795,
    extraRows: [
      {label:'Financial income', value:4.273061},
      {label:'Financial expenses', value:-11.96914},
      {label:'Current taxes', value:-11.363921},
      {label:'Deferred taxes', value:-4.482874},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:563.061054, officialTotalExpenses:496.950256, officialPAT:42.567924,
  },
  2018: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'juventus-it-annual-financial-report-2017-18',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-7.702419, tax:-9.206269,
    extraRows: [
      {label:'Financial income', value:4.26074},
      {label:'Financial expenses', value:-11.963159},
      {label:'Current taxes', value:-8.820346},
      {label:'Deferred taxes', value:-0.385923},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:504.66989, officialTotalExpenses:506.990021, officialPAT:-19.228819,
  },
  2020: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'juventus-it-annual-financial-report-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-13.489202, tax:-8.025012,
    extraRows: [
      {label:'Financial income', value:4.217342},
      {label:'Financial expenses', value:-17.706544},
      {label:'Current taxes', value:-7.971802},
      {label:'Deferred and prepaid taxes', value:-0.05321},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:573.424091, officialTotalExpenses:641.591985, officialPAT:-89.682106,
  },
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 0. Guido 2026-10-03: indicador por acción, no un importe; '(0,157)' se leía como 157 €
  2021: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'juventus-it-annual-financial-report-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-11.140462, tax:-2.339785,
    extraRows: [
      {label:'Financial income', value:5.419735},
      {label:'Financial expenses', value:-16.560197},
      {label:'Current taxes', value:-2.967812},
      {label:'Deferred and prepaid taxes', value:0.628027},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:479.00354, officialTotalExpenses:675.037044, officialPAT:-209.51375,
  },
  2007: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2007-06-30',
    sourceId:'juventus-it-annual-financial-report-2006-07',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.28326, tax:-5.113977,
    extraRows: [
      {label:'Financial revenues', value:2.830559},
      {label:'Financial expenses', value:-5.113819},
      {label:'Current taxes', value:-3.848013},
      {label:'Deferred and prepaid taxes', value:-1.265964},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:186.685844, officialTotalExpenses:180.216176, officialPAT:-0.927569,
  },
  2009: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2009-06-30',
    sourceId:'juventus-it-annual-financial-report-2008-09',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.471064, tax:-6.824605,
    extraRows: [
      {label:'Financial income', value:4.186081},
      {label:'Financial expenses', value:-4.657145},
      {label:'Current taxes', value:-5.517771},
      {label:'Deferred taxes', value:-1.306834},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:240.43414, officialTotalExpenses:226.555982, officialPAT:6.582489,
  },
  2010: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2010-06-30',
    sourceId:'juventus-it-annual-financial-report-2009-10',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.143865, tax:-13.043785,
    extraRows: [
      {label:'Financial income', value:3.58352},
      {label:'Financial expenses', value:-6.727385},
      {label:'Current taxes', value:-5.544717},
      {label:'Deferred taxes', value:-7.499068},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:243.299797, officialTotalExpenses:238.080091, officialPAT:-10.967944,
  },
  // 2019: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 0. Guido 2026-10-03: indicador por acción, no un importe del estado; '(0,040)' se leía como 40 €
  2019: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'juventus-it-annual-financial-report-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-11.067648, tax:-12.997959,
    extraRows: [
      {label:'Financial income', value:3.42923},
      {label:'Financial expenses', value:-14.496878},
      {label:'Current taxes', value:-11.738088},
      {label:'Deferred taxes', value:-1.259871},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:621.456394, officialTotalExpenses:637.286582, officialPAT:-39.895794,
  },
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -670,013. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 196,702. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 48,013,871. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 613,289. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 4,217,905. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2,447,425. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1,469,301. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 19) write-downs / 20) ingresos / 21) gastos extraordinarios)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 32150000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2806)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 19530000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2807)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 78201921. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2808) (incluye -79 € de redondeo de la nota en miles)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3488000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2809)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 5715000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2810)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 35009000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2811)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 536000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2813)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2396000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2814)
  // 2003: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 478000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 2815)
  2003: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2003-06-30',
    sourceId:'juventus-it-annual-financial-report-2002-03',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:4.595859, tax:-7.392658,
    extraRows: [
      {label:'a) From subsidiary companies', value:1.287561},
      {label:'- from others', value:0.000243},
      {label:'c) from securities entered under current assets other than shareholdings', value:0.020392},
      {label:'- from parent companies', value:0.606644},
      {label:'- from others', value:3.351032},
      {label:'d) from others', value:-0.670013},
      {label:'22) INCOME TAXES', value:-7.392658},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:271.167364, officialTotalExpenses:262.303779, officialPAT:2.15006,
  },
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = -3,026,244. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 5,043,852. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 215,006. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 103,318. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1,314,812. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3,121,282. Guido 2026-10-03: formato italiano viejo, el signo lo da el encabezado (17) gastos financieros / 20) ingresos / 21) gastos extraordinarios)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 32578000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3396)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 17782000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3397)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 84968975. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3398) (incluye -25 € de redondeo de la nota en miles)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 3530000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3399)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 6720000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3400)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 14927000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3401)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 1052000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3402)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 2353000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3403)
  // 2004: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-03): fila = 392000. Guido 2026-10-03: se abre "d) Sponsorship and other revenues" con su nota (€/000, línea 3404)
  2004: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2004-06-30',
    sourceId:'juventus-it-annual-financial-report-2003-04',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.3404, tax:1.511262,
    extraRows: [
      {label:'c) from securities entered under current assets other than equity investments', value:0.034475},
      {label:'- from subsidiary companies', value:0.070998},
      {label:'- from parent companies', value:0.191687},
      {label:'- from others', value:0.388684},
      {label:'d) from others', value:-3.026244},
      {label:'a) current taxes', value:-5.727157},
      {label:'b) deferred taxes', value:7.238419},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:221.313511, officialTotalExpenses:237.628716, officialPAT:-18.459155,
  },
};
const juventusitPresupuestoOverlayByYear = {};

const juventusitPasesData = [];
const juventusitResultadosData = {};
const juventusitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['juventus-it'] = {
  revenueLinesByYear: juventusitRevenueLinesByYear, expenseLinesByYear: juventusitExpenseLinesByYear,
  fiscalYearMeta: juventusitFiscalYearMeta, pasesData: juventusitPasesData,
  resultadosData: juventusitResultadosData, titulosData: juventusitTitulosData,
  presupuestoOverlayByYear: juventusitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'juventus-it-annual-financial-report-2011-12': {
    id:'juventus-it-annual-financial-report-2011-12', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2011-12 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2011-12.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2012-13': {
    id:'juventus-it-annual-financial-report-2012-13', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2012-13 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2012-13.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2013-14': {
    id:'juventus-it-annual-financial-report-2013-14', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2013-14 (ejercicio 2014)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2013-14.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2014-15': {
    id:'juventus-it-annual-financial-report-2014-15', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2014-15 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2014-15.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2024-25': {
    id:'juventus-it-annual-financial-report-2024-25', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2015-16': {
    id:'juventus-it-annual-financial-report-2015-16', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2015-16 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2015-16.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2016-17': {
    id:'juventus-it-annual-financial-report-2016-17', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2016-17 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2016-17.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2017-18': {
    id:'juventus-it-annual-financial-report-2017-18', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2017-18 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2017-18.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2019-20': {
    id:'juventus-it-annual-financial-report-2019-20', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2020-21': {
    id:'juventus-it-annual-financial-report-2020-21', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2020-21 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2006-07': {
    id:'juventus-it-annual-financial-report-2006-07', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2006-07 (ejercicio 2007)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2006-07.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2008-09': {
    id:'juventus-it-annual-financial-report-2008-09', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2008-09 (ejercicio 2009)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2008-09.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2009-10': {
    id:'juventus-it-annual-financial-report-2009-10', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2009-10 (ejercicio 2010)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2009-10.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2018-19': {
    id:'juventus-it-annual-financial-report-2018-19', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2002-03': {
    id:'juventus-it-annual-financial-report-2002-03', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2002-03 (ejercicio 2003)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2002-03.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'juventus-it-annual-financial-report-2003-04': {
    id:'juventus-it-annual-financial-report-2003-04', clubId:'juventus-it',
    title:'Juventus Football Club S.p.A. — Juventus-annual-financial-report-2003-04 (ejercicio 2004)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Italia/Juventus/Juventus-annual-financial-report-2003-04.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['juventus-it'] = null;
