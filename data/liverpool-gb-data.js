// ============================================================================
// data/liverpool-gb-data.js — Liverpool FC (The Liverpool Football Club and
// Athletic Grounds Limited, Companies House n° 00035668).
//
// Fuente: "Annual report and consolidated financial statements" depositados en
// Companies House UK, cuentas CONSOLIDADAS, ejercicio cerrado el 31 de mayo.
// 31/5/2024 = temporada 2023/24; 31/5/2025 = temporada 2024/25. Confirmado en la
// carátula de cada documento (pág. 1: "31 May 2024"/"31 May 2025") y en el Group
// Strategic Report ("...for the year ended 31 May 2024/2025"). Transcripciones
// completas en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2023-24.md
// y liverpool-group-accounts-2024-25.md.
//
// Cifras en LIBRAS ESTERLINAS (GBP) millones NATIVOS, con signo (revenue
// positivo, expense negativo), mismo shape que data/river-data.js. GBP es
// moneda NUEVA para el sitio (no existe todavía en data/currency-map.js): por
// pedido explícito de esta sesión NO se agregó esa entrada ni se tocó ese
// archivo, así que cada año usa fxRef ('GBP@2024-05-31'/'GBP@2025-05-31') en
// vez de un fx literal — ninguno de los dos documentos declara un tipo de
// cambio propio (no hay nota de moneda extranjera con un TC GBP declarado, ya
// que GBP es la propia moneda de reporte del club), así que no aplica la regla
// #0 de club-data-mapping/SKILL.md sección 5 (no hay TC propio del documento
// para usar). El día que alguien agregue GBP a currency-map.js, estas
// referencias ya están listas para resolverse solas.
//
// ESTRUCTURA DEL P&L (distinta de los balances argentinos ya cargados, ver
// nota de cada año): Turnover (Media/Commercial/Match day) menos Cost of sales
// da Gross profit; menos Administrative expenses más Profit on disposal of
// registrations da el resultado operativo. "Cost of sales" y "Administrative
// expenses" son las DOS líneas de costo operativo que imprime el documento —
// ninguna de las dos se desglosa por departamento (fútbol/comercial/estadio),
// a diferencia de Boca/River/Racing. officialTotalExpenses = Cost of sales +
// Administrative expenses (ANTES de profit on disposal de pases, intereses y
// impuestos), verificado exacto contra el impreso los 2 años (ver
// verificación con node al pie de este comentario).
//
// DECISIÓN DE MAPEO, LA MÁS IMPORTANTE DE ESTE ARCHIVO (duda genuina, no hay
// consulta a Guido posible en esta sesión porque Admin/dudas-por-club.md está
// fuera de alcance de esta tarea — dejar constancia acá): la Nota 4 "Staff
// numbers and costs" da UN SOLO total de sueldos+cargas sociales+pensión para
// TODO el personal del Grupo (1.011 empleados en 2024, de los cuales solo 229
// son "Players, managers and coaches"; el resto son 713 de
// "Administration, commercial and other" y 69 de "Ground and maintenance
// staff"), SIN separar por departamento. No hay ninguna nota que permita
// aislar la porción de sueldo que corresponde solo al plantel/cuerpo técnico
// (a diferencia de Vélez, que sí tiene esa matriz por sector en su Anexo III).
// Se cargó el TOTAL completo como wages_squad, no como catch-all, porque es la
// convención estándar de la prensa/análisis de finanzas del fútbol inglés
// (Deloitte Annual Review of Football Finance, Swiss Ramble, etc.): el "wage
// bill" / "wages to turnover" de un club de Premier League SIEMPRE se cita
// como el costo de personal TOTAL del grupo, no aislado a jugadores. La
// alternativa (mandarlo a admin_general_expense o partirlo a ojo) hubiera
// sido menos fiel a cómo se lee este número en cualquier fuente de prensa
// sobre este club. wagesToTurnover para este club, con este dato, mide
// "personal total / turnover", no "plantel / turnover" en sentido estricto —
// dejarlo dicho acá para que una sesión futura no lo re-derive distinto sin
// saber que ya se pensó.
//
// Cost of sales (83,483 / 88,608 miles de GBP) no tiene NINGUNA nota que lo
// desglose en ninguno de los 2 documentos (se buscó con grep "cost of sales"
// en los dos .md, sin resultado adicional) — se cargó a other_expenses
// (catch-all), no a admin_general_expense, porque el documento NO lo etiqueta
// como "administrative", es una línea separada y distinta en el propio P&L.
//
// "Administrative expenses" SÍ tiene una nota ("Included in administrative
// expenses are the following") con algunos componentes (amortización y
// deterioro de pases, depreciación y deterioro de bienes tangibles, alquileres
// operativos, honorarios de auditoría, resultado por venta de bienes
// tangibles) — los de pases/tangibles se promovieron a su categoría propia
// (player_amortisation/player_impairment/depreciation, ver club-data-mapping
// sección 1), y el resto de esos componentes menores (alquileres, auditoría,
// venta de bienes tangibles) se dejó como `items` de una línea
// admin_general_expense junto con el remanente NO desglosado por la fuente
// (la mayor parte: operaciones de fútbol, estadio, comercial, gastos
// generales — sin etiqueta propia en ninguna nota). Ver club-data-mapping
// sección 4 (sub-ítems anidados: el remanente sin desglose se deja como un
// ítem explícito, no se pierde ni se inventa en 0).
//
// "Other operating income" (Nota, solo 2025: 12,892 miles GBP, "insurance
// settlement relating to historic loss of earnings") se cargó a other_income:
// no es turnover del negocio (el documento lo separa de Turnover en el propio
// P&L) ni es venta de pases, es un ingreso extraordinario/no operativo puntual.
//
// netInterest = Interest receivable and similar income (Nota 6) menos Interest
// payable and similar charges (Nota 7), NETO, con su signo (ver club-data-
// mapping sección 2). tax = el "Tax on loss/profit on ordinary activities" con
// el signo tal que pbt+tax=pat (2024 fue un CRÉDITO que redujo la pérdida;
// 2025 fue un CARGO que redujo la ganancia).
//
// grossDebt = deuda financiera de la Nota 15 "Interest-bearing loans and
// borrowings" (Secured bank loans netos de costos de emisión diferidos +
// Intercompany loan con la controlante FSG Football Group, LLC), NO el Total
// de "Creditors" completo (que incluye deuda comercial, impuestos, ingresos
// diferidos, etc. — mismo criterio de "línea más angosta" que Boca/Vélez, ver
// club-data-mapping sección 14). Coincide exacto con la propia "Consolidated
// Analysis of Net Debt" que imprime el Estado de Flujo de Efectivo de cada año.
// cash = "Cash at bank and in hand" del Balance consolidado.
//
// VERIFICACIÓN (node, hecha antes de cargar este archivo): para los 2 años,
// suma de revenueLines == officialTotalRevenue exacto; Math.abs(suma de
// expenseLines cash + suma de expenseLines no-cash) == officialTotalExpenses
// exacto; revenue+expenses+nonCash+netInterest+tax == officialPAT exacto
// (2024: -43.478 M GBP, la "Loss for the financial year" impresa; 2025:
// +8.273 M GBP, el "Profit for the financial year" impreso). Sin residuo en
// ningún año.
// ============================================================================

const liverpoolGbRevenueLinesByYear = {
  // Ejercicio 2023/24 (cerrado 31/5/2024). Fuente: Consolidated P&L pág. 12 +
  // Nota 2 "Turnover" (pág. 26), Estado de Resultados. Turnover = 613.764 M GBP
  // exacto (203.705+308.398+101.661).
  2024: [
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:203.705, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:308.398, disclosureLevel:'detailed' },
    { rawLabel:'Match day', normalizedCategory:'matchday_competition', amountNative:101.661, disclosureLevel:'detailed' },
    { rawLabel:"Profit on disposal of registrations", normalizedCategory:'player_sales', amountNative:22.017, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2024/25 (cerrado 31/5/2025). Fuente: Consolidated P&L pág. 14 +
  // Nota 2 "Turnover" (pág. 26). Turnover = 702.722 M GBP exacto
  // (263.659+323.472+115.591). "Other operating income" es línea nueva este
  // año (nil en 2024): 12.9 M GBP de un seguro por lucro cesante histórico.
  2025: [
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:263.659, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:323.472, disclosureLevel:'detailed' },
    { rawLabel:'Match day', normalizedCategory:'matchday_competition', amountNative:115.591, disclosureLevel:'detailed' },
    { rawLabel:"Profit on disposal of registrations", normalizedCategory:'player_sales', amountNative:53.268, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:12.892, disclosureLevel:'detailed', items:[
      ['Insurance settlement relating to historic loss of earnings', 12.892],
    ]},
  ],
};

const liverpoolGbExpenseLinesByYear = {
  // Ejercicio 2023/24. Fuente: Consolidated P&L pág. 12 (Cost of sales,
  // Administrative expenses) + Nota 3 "Administrative expenses" (pág. 26,
  // componentes) + Nota 4 "Staff numbers and costs" (pág. 27, sueldos+cargas
  // sociales+pensión, sin desglose por departamento — ver comentario de
  // cabecera). Cost of sales (83.483) + Administrative expenses (599.956) =
  // 683.439 M GBP, el total de costo operativo impreso (antes de profit on
  // disposal de pases/intereses/impuestos).
  2024: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-83.483, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs (wages and salaries, social security and pension costs — not split by department)', normalizedCategory:'wages_squad', amountNative:-386.086, disclosureLevel:'detailed', items:[
      ['Wages and salaries', -341.354], ['Social security costs', -40.141], ['Pension costs', -4.591],
    ]},
    { rawLabel:'Administrative expenses (other operating costs, not further disclosed by department)', normalizedCategory:'admin_general_expense', amountNative:-83.097, disclosureLevel:'partial', items:[
      ['Operating lease rentals', -2.751],
      ["Auditors' remuneration (audit, assurance and tax advisory fees)", -0.156],
      ['Profit on disposal of tangible fixed assets', 0.052],
      ['Other administrative costs (not itemised by the source)', -80.242],
    ]},
    { rawLabel:'Amortisation of registrations', normalizedCategory:'player_amortisation', amountNative:-114.479, disclosureLevel:'detailed' },
    { rawLabel:'Impairment loss on registrations', normalizedCategory:'player_impairment', amountNative:-0.618, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-15.218, disclosureLevel:'detailed' },
    { rawLabel:'Impairment loss on tangible fixed assets', normalizedCategory:'depreciation', amountNative:-0.458, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2024/25. Mismo criterio. Cost of sales (88.608) + Administrative
  // expenses (656.513) = 745.121 M GBP.
  2025: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-88.608, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs (wages and salaries, social security and pension costs — not split by department)', normalizedCategory:'wages_squad', amountNative:-427.727, disclosureLevel:'detailed', items:[
      ['Wages and salaries', -374.795], ['Social security costs', -48.881], ['Pension costs', -4.051],
    ]},
    { rawLabel:'Administrative expenses (other operating costs, not further disclosed by department)', normalizedCategory:'admin_general_expense', amountNative:-96.976, disclosureLevel:'partial', items:[
      ['Operating lease rentals', -3.093],
      ["Auditors' remuneration (audit and assurance fees)", -0.150],
      ['Profit on disposal of tangible fixed assets', 0.009],
      ['Other administrative costs (not itemised by the source)', -93.742],
    ]},
    { rawLabel:'Amortisation of registrations', normalizedCategory:'player_amortisation', amountNative:-117.165, disclosureLevel:'detailed' },
    { rawLabel:'Impairment loss on registrations', normalizedCategory:'player_impairment', amountNative:-0.183, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-14.462, disclosureLevel:'detailed' },
  ],
};

const liverpoolGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-05-31',
    sourceId:'liverpool-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = Nota 15 "Interest-bearing loans and borrowings": Secured bank
    // loans netos de costos diferidos (115.595) + Intercompany loan con FSG
    // Football Group, LLC (198.700) = 314.295, exacto contra la "Consolidated
    // Analysis of Net Debt" del Estado de Flujo de Efectivo. cash = "Cash at
    // bank and in hand" del Balance consolidado.
    grossDebt:314.295, cash:7.504,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest: Interest receivable (Nota 6, 3.162) menos Interest payable
    // (Nota 7, 12.608). tax: crédito impositivo del ejercicio (Nota 8), signo
    // tal que pbt(-57.104)+tax(+13.626)=pat(-43.478).
    netInterest:-9.446, tax:13.626,
    officialTotalRevenue:635.781, officialTotalExpenses:683.439, officialPAT:-43.478,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-05-31',
    sourceId:'liverpool-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = Secured bank loans netos (67.340) + Intercompany loan
    // (217.916) = 285.256, exacto contra la Nota 15 y la "Consolidated
    // Analysis of Net Debt".
    grossDebt:285.256, cash:2.541,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest: 2.846-11.395. tax: cargo impositivo del ejercicio, signo tal
    // que pbt(15.212)+tax(-6.939)=pat(8.273).
    netInterest:-8.549, tax:-6.939,
    officialTotalRevenue:768.882, officialTotalExpenses:745.121, officialPAT:8.273,
  },
};

// liverpoolGbPresupuestoOverlayByYear: sin presupuesto cargado (los 2
// documentos son balances auditados reales, no presupuestos), mismo criterio
// que riverPresupuestoOverlayByYear/racingPresupuestoOverlayByYear.
const liverpoolGbPresupuestoOverlayByYear = {};

// Mercado de pases / Resultados deportivos / Títulos: sin datos cargados en
// esta sesión (fuera de alcance de la tarea: onboardear los 2 ejercicios
// financieros). Arrays vacíos, mismo patrón que un club recién onboardeado sin
// esta info todavía (ver instituto-data.js primer registro en
// CLUB_GENERIC_DATA para el precedente de arrays vacíos).
const liverpoolGbPasesData = [];
const liverpoolGbResultadosData = {};
const liverpoolGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['liverpool-gb'] = {
  revenueLinesByYear: liverpoolGbRevenueLinesByYear, expenseLinesByYear: liverpoolGbExpenseLinesByYear,
  fiscalYearMeta: liverpoolGbFiscalYearMeta, pasesData: liverpoolGbPasesData,
  resultadosData: liverpoolGbResultadosData, titulosData: liverpoolGbTitulosData,
  presupuestoOverlayByYear: liverpoolGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'liverpool-gb-group-accounts-2024': {
    id:'liverpool-gb-group-accounts-2024', clubId:'liverpool-gb',
    title:'The Liverpool Football Club and Athletic Grounds Limited — Annual report and consolidated financial statements, year ended 31 May 2024',
    type:'official_balance_sheet', reliability:'primary_official',
    url:'https://find-and-update.company-information.service.gov.uk/company/00035668/filing-history',
    publicNote:'Balance auditado consolidado, depositado en Companies House (Reino Unido) por The Liverpool Football Club and Athletic Grounds Limited, sociedad n.° 00035668. El documento no separa el costo de personal por área (plantel profesional vs. resto del club), así que "Salarios del plantel" en este ejercicio refleja el costo de personal TOTAL del grupo (jugadores, cuerpo técnico y todo el resto del staff), no solo el plantel profesional.',
    note:'Transcripción completa en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2023-24.md (38 págs. escaneadas, con capa de texto vía pdftotext/OCR previo, ver fuentes/Inglaterra/Liverpool.md). Ejercicio cerrado el 31 de mayo (confirmado en carátula y Group Strategic Report). Auditor: Ernst & Young LLP. Controlante última: Fenway Sports Group, LLC (Nota 25).',
  },
  'liverpool-gb-group-accounts-2025': {
    id:'liverpool-gb-group-accounts-2025', clubId:'liverpool-gb',
    title:'The Liverpool Football Club and Athletic Grounds Limited — Annual report and consolidated financial statements, year ended 31 May 2025',
    type:'official_balance_sheet', reliability:'primary_official',
    url:'https://find-and-update.company-information.service.gov.uk/company/00035668/filing-history',
    publicNote:'Balance auditado consolidado, depositado en Companies House (Reino Unido) por The Liverpool Football Club and Athletic Grounds Limited, sociedad n.° 00035668. Mismo criterio de personal sin desglosar por área que el ejercicio 2023/24 (ver su nota).',
    note:'Transcripción completa en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2024-25.md. Ejercicio cerrado el 31 de mayo. Controlante última: Fenway Sports Group, LLC (Nota 25). Incluye "Other operating income" (12,9 M GBP) por un seguro de lucro cesante, cargado a other_income.',
  },
});

gestionesByClub['liverpool-gb'] = { actual: { nombre:'Fenway Sports Group', firstYear:2024, lastYear:2025 } };

memberCountByClub['liverpool-gb'] = null;
