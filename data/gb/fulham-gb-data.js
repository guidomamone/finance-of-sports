const fulhamGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate Receipts', normalizedCategory:'matchday_competition', amountNative:18.392, disclosureLevel:'detailed' },
    { rawLabel:'Central Awards', normalizedCategory:'broadcasting', amountNative:123.316, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:11.190, disclosureLevel:'detailed' },
    { rawLabel:'Compensation', normalizedCategory:'other_income', amountNative:0.873, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and other Commercial Activities', normalizedCategory:'sponsorship_commercial', amountNative:27.788, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:32.735, disclosureLevel:'detailed' },
    { rawLabel:'Other income (R&D tax credits)', normalizedCategory:'other_income', amountNative:4.624, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate Receipts (forzado por el total — ver duda de OCR en el comentario de cabecera)', normalizedCategory:'matchday_competition', amountNative:15.010, disclosureLevel:'estimated' },
    { rawLabel:'Central Awards', normalizedCategory:'broadcasting', amountNative:128.837, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:12.748, disclosureLevel:'detailed' },
    { rawLabel:'Compensation', normalizedCategory:'other_income', amountNative:4.013, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and other Commercial Activities', normalizedCategory:'sponsorship_commercial', amountNative:34.182, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:41.035, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Gate Receipts', normalizedCategory:'matchday_competition', amountNative:0.231, disclosureLevel:'aggregated' },
    { rawLabel:'Central Awards', normalizedCategory:'broadcasting', amountNative:90.504, disclosureLevel:'aggregated' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:14.413, disclosureLevel:'aggregated' },
    { rawLabel:'Compensation', normalizedCategory:'other_income', amountNative:0.025, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorship and other Commercial Activities', normalizedCategory:'sponsorship_commercial', amountNative:10.938, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:0.146, disclosureLevel:'aggregated' },
  ],
};

const fulhamGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-154.754, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos operativos (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-37.504, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-57.400, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of fixed assets', normalizedCategory:'depreciation', amountNative:-1.364, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-166.507, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos operativos (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-45.628, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-61.521, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of fixed assets', normalizedCategory:'depreciation', amountNative:-1.700, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Operating expenses before depreciation, amortisation & impairment', normalizedCategory:'other_expenses', amountNative:-132.621, disclosureLevel:'aggregated' },
    { rawLabel:'- Owned fixed assets', normalizedCategory:'depreciation', amountNative:-0.658, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-56.452, disclosureLevel:'aggregated' },
    { rawLabel:'Impairment', normalizedCategory:'player_impairment', amountNative:-20.906, disclosureLevel:'aggregated' },
    { rawLabel:'Loss on disposal of other assets', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' },
  ],
};

const fulhamGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'fulham-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'khan',
    grossDebt:44.398, cash:32.768,
    netInterest:0.905, tax:-1.009, assetSales:-0.007, profitOnPlayerSales:0,
    officialTotalRevenue:218.918, officialTotalExpenses:251.022, officialPAT:-32.215,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'fulham-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'khan',
    grossDebt:0, cash:13.172,
    netInterest:0.518, tax:0, assetSales:0, profitOnPlayerSales:0,
    officialTotalRevenue:235.825, officialTotalExpenses:275.355, officialPAT:-39.012,
  },
  2021: {
    currency:'GBP', fxRef:'GBP@2021-06-30',
    sourceId:'fulham-gb-full-accounts-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.002, tax:0.026,
    extraRows: [
      {label:'Net interest receivable', value:0.002},
      {label:'Taxation on loss', value:0.026},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:116.257, officialTotalExpenses:210.637, officialPAT:-94.352,
  },
};

const fulhamGbPresupuestoOverlayByYear = {};
const fulhamGbPasesData = [];
const fulhamGbResultadosData = {};
const fulhamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fulham-gb'] = {
  revenueLinesByYear: fulhamGbRevenueLinesByYear, expenseLinesByYear: fulhamGbExpenseLinesByYear,
  fiscalYearMeta: fulhamGbFiscalYearMeta, pasesData: fulhamGbPasesData,
  resultadosData: fulhamGbResultadosData, titulosData: fulhamGbTitulosData,
  presupuestoOverlayByYear: fulhamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fulham-gb-full-accounts-2024': {
    id:'fulham-gb-full-accounts-2024', clubId:'fulham-gb',
    title:'Full accounts (Fulham Football Club Limited, standalone), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02114486/filing-history',
  },
  'fulham-gb-full-accounts-2025': {
    id:'fulham-gb-full-accounts-2025', clubId:'fulham-gb',
    title:'Full accounts (Fulham Football Club Limited, standalone), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02114486/filing-history',
  },
  'fulham-gb-full-accounts-2020-21': {
    id:'fulham-gb-full-accounts-2020-21', clubId:'fulham-gb',
    title:'Fulham Football Club Limited — fulham-full-accounts-2020-21 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['fulham-gb'] = {
  khan: { nombre:'Shahid Khan (2013-actual)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['fulham-gb'] = null;
