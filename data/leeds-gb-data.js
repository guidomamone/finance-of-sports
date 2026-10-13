const leedsGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:30.633661, disclosureLevel:'detailed' },
    { rawLabel:'Television and broadcasting income + Central distributions', normalizedCategory:'broadcasting', amountNative:53.643430, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:25.410723, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:9.496047, disclosureLevel:'detailed' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:8.314712, disclosureLevel:'detailed' },
    { rawLabel:'Educational services', normalizedCategory:'education', amountNative:0.059707, disclosureLevel:'detailed' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:33.694289, disclosureLevel:'detailed' },
  ],
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
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-84.030436, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-59.358850, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations (First Team Squad review)', normalizedCategory:'player_impairment', amountNative:-7.475305, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-4.855858, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-48.091406, disclosureLevel:'estimated' },
  ],
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
    grossDebt:60.297537, cash:5.008994,
    netInterest:-18.252199, assetSales:0, tax:0, profitOnPlayerSales:0,
    officialTotalRevenue:161.252569, officialTotalExpenses:203.811855, officialPAT:-60.811485,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'leeds-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'marathe49ers',
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
  },
  'leeds-gb-group-accounts-2025': {
    id:'leeds-gb-group-accounts-2025', clubId:'leeds-gb',
    title:'Consolidated Financial Statements (Leeds United Football Club Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06233875/filing-history',
    publicNote:'Campeón del Championship 2024-25 (100 puntos), ascendido a la Premier League para la temporada 2025-26 (fuera del alcance de este ejercicio).',
  },
});

gestionesByClub['leeds-gb'] = {
  marathe49ers: { nombre:'49ers Enterprises Global Football Group LLC (Paraag Marathe, Chairman)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['leeds-gb'] = null;
