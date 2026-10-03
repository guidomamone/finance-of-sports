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
});

memberCountByClub['juventus-it'] = null;
