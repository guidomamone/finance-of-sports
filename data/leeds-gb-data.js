// ============================================================================
// data/leeds-gb-data.js — Leeds United (Inglaterra, Championship), clubId 'leeds-gb'.
//
// Fuente: "Consolidated Financial Statements" (cuentas de GRUPO) de Leeds United Football Club
// Limited (Companies House n° 06233875), auditadas por Gibson Booth, depositadas en Companies
// House UK. 2 ejercicios, ambos cerrados el 30 de junio:
//   2024: temporada 2023-24, Championship (perdió la final del playoff ante Southampton).
//         Transcripción: Clubes/Inglaterra/Leeds United/leeds-group-accounts-2023-24.md
//   2025: temporada 2024-25, Championship (campeón, 100 puntos, ascendido a Premier League para
//         2025/26 — temporada NO cubierta por este ejercicio). Transcripción:
//         Clubes/Inglaterra/Leeds United/leeds-group-accounts-2024-25.md
//
// OJO LIGA (verificado con WebSearch, no asumido): Leeds jugó Championship en LOS DOS ejercicios.
// Descendió de Premier League al cierre de 2022/23; el propio balance de 2024 dice literal "would
// remain in the Championship for the 2024/25 season", y el de 2025 dice "the main objective for the
// 2024/25 Sky Bet Championship campaign was to secure promotion". El ascenso a Premier League es
// RESULTADO del ejercicio 2025, para la temporada 2025/26 (no cargada acá).
//
// amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque ninguno
// de los 2 documentos declara un tipo de cambio propio.
//
// "Television and broadcasting income + Central distributions": incluye EFL basic award +
// solidarity payment de la Premier League + parachute payments (por el descenso reciente) — todo a
// `broadcasting`, es la naturaleza de la distribución, no depende de si la paga la EFL o la PL.
//
// "Educational services" (Leeds United College Limited, subsidiaria): -> `education` (colegio del
// club, categoría dedicada desde la Versión 189 de category-map.js).
//
// "Gain on disposal of players' registrations" es una línea NETA del P&L (no bruto), se suma al
// revenue total.
//
// "Other operating expenses" es un residual SIN desglose propio en la fuente: (Cost of sales +
// Administrative expenses) menos las 4 líneas ya identificadas. En 2024 incluye además la
// amortización NO-jugador (goodwill/trademarks/software, £0.231457m). En 2025 esa misma amortización
// no-jugador queda NETEADA contra el reverso de "negative goodwill" (-£0.921580m), dando un CRÉDITO
// neto de -£0.651431m que también quedó absorbido en este residual en vez de crear una línea propia
// con signo positivo — duda anotada en Admin/dudas-por-club.md sobre el criterio para casos futuros
// de negative goodwill.
//
// GROSSDEBT/CASH: Nota 24 "Analysis of changes in net debt" (Debt due within one year + due after
// one year), reconcilia EXACTO con el "net debt" que el propio documento imprime en esa misma nota.
//
// PROPIEDAD: 49ers Enterprises Global Football Group LLC (Paraag Marathe, Chairman). En FY2024 hubo
// cambio de control DENTRO del ejercicio: Aser Group Holding/Andrea Radrizzani controlaban hasta el
// 25/9/2023 (~3 meses), luego 49ers Enterprises asumió control total (~9 meses restantes, dueño al
// cierre). Se usa un solo gestionId para todo FY2024 (49ers, dueño ~75% del año y al cierre) —
// simplificación anotada como duda.
//
// brandColor: `null` — camiseta íntegramente blanca desde los 60 ("all-white strip in the style of
// Real Madrid"), mismo bucket que River/Vélez/Sevilla/Real Madrid/Valencia/Once Caldas/Fulham.
// ============================================================================

const leedsGbRevenueLinesByYear = {
  // Ejercicio 2024. Fuente: Nota 4 "Turnover" + P&L (gain on disposal). Turnover puro (6 líneas) =
  // 127.558280 exacto. Con el gain, total = 161.252569 = officialTotalRevenue.
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:30.633661, disclosureLevel:'detailed' },
    { rawLabel:'Television and broadcasting income + Central distributions', normalizedCategory:'broadcasting', amountNative:53.643430, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:25.410723, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:9.496047, disclosureLevel:'detailed' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:8.314712, disclosureLevel:'detailed' },
    { rawLabel:'Educational services', normalizedCategory:'education', amountNative:0.059707, disclosureLevel:'detailed' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:33.694289, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025. Turnover puro = 136.989330 exacto. Total = 161.755178 = officialTotalRevenue.
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:31.647912, disclosureLevel:'detailed' },
    { rawLabel:'Television and broadcasting income + Central distributions', normalizedCategory:'broadcasting', amountNative:47.228520, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:24.560557, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:25.890452, disclosureLevel:'detailed' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:7.614479, disclosureLevel:'detailed' },
    { rawLabel:'Educational services', normalizedCategory:'education', amountNative:0.047410, disclosureLevel:'detailed' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:24.765848, disclosureLevel:'detailed' },
  ],
};

const leedsGbExpenseLinesByYear = {
  // Ejercicio 2024. Suma = -203.811855 exacto = -(Cost of sales + Administrative expenses) impreso.
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-84.030436, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-59.358850, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations (First Team Squad review)', normalizedCategory:'player_impairment', amountNative:-7.475305, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-4.855858, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-48.091406, disclosureLevel:'estimated' },
  ],
  // Ejercicio 2025. Suma = -205.390711 exacto.
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-102.724254, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-46.379060, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-3.014241, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-6.200495, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residual, incluye crédito neto por negative goodwill — ver comentario de cabecera)', normalizedCategory:'other_expenses', amountNative:-47.072661, disclosureLevel:'estimated' },
  ],
};

const leedsGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'leeds-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'marathe49ers',
    // Nota 24 "Analysis of changes in net debt": Debt due within one year 37.177167 + due after one
    // year 23.120370 = 60.297537, reconcilia EXACTO con cash-grossDebt=-55.288543 impreso.
    grossDebt:60.297537, cash:5.008994,
    netInterest:-18.252199, assetSales:0, tax:0, profitOnPlayerSales:0,
    officialTotalRevenue:161.252569, officialTotalExpenses:203.811855, officialPAT:-60.811485,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'leeds-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'marathe49ers',
    // Nota 24: Debt due within one year 22.958559 + due after one year 35.866370 = 58.824929,
    // reconcilia exacto con cash-grossDebt=-24.872264.
    grossDebt:58.824929, cash:33.952665,
    netInterest:-5.542355, assetSales:0, tax:0, profitOnPlayerSales:0,
    officialTotalRevenue:161.755178, officialTotalExpenses:205.390711, officialPAT:-49.177888,
  },
};

const leedsGbPresupuestoOverlayByYear = {};
const leedsGbPasesData = [];
const leedsGbResultadosData = {};
const leedsGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['leeds-gb'] = {
  revenueLinesByYear: leedsGbRevenueLinesByYear, expenseLinesByYear: leedsGbExpenseLinesByYear,
  fiscalYearMeta: leedsGbFiscalYearMeta, pasesData: leedsGbPasesData,
  resultadosData: leedsGbResultadosData, titulosData: leedsGbTitulosData,
  presupuestoOverlayByYear: leedsGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'leeds-gb-group-accounts-2024': {
    id:'leeds-gb-group-accounts-2024', clubId:'leeds-gb',
    title:'Consolidated Financial Statements (Leeds United Football Club Limited), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06233875/filing-history',
    note:'Cuentas consolidadas del grupo, auditadas por Gibson Booth, depositadas en Companies House (Reino Unido). Championship (no Premier League), verificado contra el propio documento y WebSearch. Transcripción completa en Clubes/Inglaterra/Leeds United/leeds-group-accounts-2023-24.md. Ver comentario de cabecera de data/leeds-gb-data.js.',
  },
  'leeds-gb-group-accounts-2025': {
    id:'leeds-gb-group-accounts-2025', clubId:'leeds-gb',
    title:'Consolidated Financial Statements (Leeds United Football Club Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06233875/filing-history',
    publicNote:'Campeón del Championship 2024-25 (100 puntos), ascendido a la Premier League para la temporada 2025-26 (fuera del alcance de este ejercicio).',
    note:'Transcripción completa en Clubes/Inglaterra/Leeds United/leeds-group-accounts-2024-25.md.',
  },
});

gestionesByClub['leeds-gb'] = {
  marathe49ers: { nombre:'49ers Enterprises Global Football Group LLC (Paraag Marathe, Chairman)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['leeds-gb'] = null;
