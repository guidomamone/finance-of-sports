const brightonGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:27.722, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:163.478, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:20.188, disclosureLevel:'detailed' },
    { rawLabel:'Other (Turnover)', normalizedCategory:'other_income', amountNative:9.905, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:2.450, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:110.295, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:27.534, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:150.638, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:22.414, disclosureLevel:'detailed' },
    { rawLabel:'Other (Turnover)', normalizedCategory:'other_income', amountNative:20.477, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:5.000, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:56.911, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:13.513, disclosureLevel:'aggregated' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:89.92, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:9.481, disclosureLevel:'aggregated' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:10.377, disclosureLevel:'aggregated' },
  ],
};

const brightonGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-142.235, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-39.342, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-2.784, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.397, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-63.567, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-158.679, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-81.840, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.410, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-72.350, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Operating expenses', normalizedCategory:'other_expenses', amountNative:-182.111, disclosureLevel:'aggregated' },
    { rawLabel:'(Loss)/profit on player trading', normalizedCategory:'other_expenses', amountNative:-0.599, disclosureLevel:'aggregated' },
  ],
};

const brightonGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'brighton-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'bloom',
    grossDebt:229.200, cash:14.966,
    profitOnPlayerSales:0, assetSales:0, netInterest:3.544, tax:-32.192,
    officialTotalRevenue:334.038, officialTotalExpenses:249.325, officialPAT:56.065,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'brighton-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'bloom',
    grossDebt:336.069, cash:39.836,
    profitOnPlayerSales:0, assetSales:0, netInterest:-0.700, tax:3.400,
    officialTotalRevenue:282.974, officialTotalExpenses:314.279, officialPAT:-28.605,
  },
  2020: {
    currency:'GBP', fxRef:'GBP@2020-06-30',
    sourceId:'brighton-gb-full-accounts-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.286, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:0.015},
      {label:'Interest payable and similar charges', value:-3.301},
      {label:'Tax on loss', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:123.291, officialTotalExpenses:182.71, officialPAT:-62.705,
  },
};

const brightonGbPresupuestoOverlayByYear = {};

const brightonGbPasesData = [];
const brightonGbResultadosData = {};
const brightonGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['brighton-gb'] = {
  revenueLinesByYear: brightonGbRevenueLinesByYear, expenseLinesByYear: brightonGbExpenseLinesByYear,
  fiscalYearMeta: brightonGbFiscalYearMeta, pasesData: brightonGbPasesData,
  resultadosData: brightonGbResultadosData, titulosData: brightonGbTitulosData,
  presupuestoOverlayByYear: brightonGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'brighton-gb-full-accounts-2024': {
    id:'brighton-gb-full-accounts-2024', clubId:'brighton-gb',
    title:'The Brighton and Hove Albion Football Club Limited — Report and Financial Statements, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00081077/filing-history',
    publicNote:'Cuentas individuales auditadas (BDO LLP, sin salvedades) de The Brighton and Hove Albion Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24, séptima temporada en la Premier League, 11° puesto, primera participación europea del club — UEFA Europa League).',
  },
  'brighton-gb-full-accounts-2025': {
    id:'brighton-gb-full-accounts-2025', clubId:'brighton-gb',
    title:'The Brighton and Hove Albion Football Club Limited — Annual Report and Financial Statements, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00081077/filing-history',
    publicNote:'Cuentas individuales auditadas (BDO LLP, sin salvedades) de The Brighton and Hove Albion Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25, octava temporada en la Premier League, 8° puesto, sin competencia europea).',
  },
  'brighton-gb-full-accounts-2019-20': {
    id:'brighton-gb-full-accounts-2019-20', clubId:'brighton-gb',
    title:'The Brighton and Hove Albion Football Club Limited — brighton-full-accounts-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['brighton-gb'] = { bloom: { nombre:'Bloom (2009-actual)', firstYear:2024, lastYear:2025 } };

memberCountByClub['brighton-gb'] = null;
