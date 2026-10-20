const newcastleGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:51.560, disclosureLevel:'detailed' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:161.066, disclosureLevel:'detailed' },
    { rawLabel:'UEFA', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:120.179, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.517, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' and staff registrations', normalizedCategory:'player_sales', amountNative:19.875, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:27.529, disclosureLevel:'aggregated' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:124.111, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:26.545, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:1.801, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:5.832, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:37.914, disclosureLevel:'aggregated' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:165.485, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:43.915, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.951, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:2.836, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:50.095, disclosureLevel:'aggregated' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:153.95, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA', normalizedCategory:'broadcasting', amountNative:29.835, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:83.573, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.86, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of players\' and staff registrations', normalizedCategory:'player_sales', amountNative:69.816, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of tangible fixed assets', normalizedCategory:'other_income', amountNative:0.113, disclosureLevel:'aggregated' },
  ],
};

const newcastleGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-243.477, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residuo exacto, sin línea propia impresa)', normalizedCategory:'other_expenses', amountNative:-93.222, disclosureLevel:'estimated' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-8.182, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-99.502, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-0.366, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Operating expenses before amortisation and impairment', normalizedCategory:'other_expenses', amountNative:-206.343, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-49.721, disclosureLevel:'aggregated' },
    { rawLabel:'Impairment of intangible assets', normalizedCategory:'player_impairment', amountNative:-1.418, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Operating expenses before amortisation and impairment', normalizedCategory:'other_expenses', amountNative:-230.215, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation and impairment of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-89.343, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Operating expenses before amortisation and impairment', normalizedCategory:'other_expenses', amountNative:-291.484, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation of intangible assets', normalizedCategory:'player_amortisation', amountNative:-96.744, disclosureLevel:'aggregated' },
    { rawLabel:'Impairment of intangible assets', normalizedCategory:'player_impairment', amountNative:-0.801, disclosureLevel:'aggregated' },
  ],
};

const newcastleGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'newcastle-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'pifreuben',
    grossDebt:58.314, cash:12.701,
    profitOnPlayerSales:0, assetSales:133.133, netInterest:-8.853, tax:0,
    officialTotalRevenue:355.197, officialTotalExpenses:444.749, officialPAT:34.728,
  },
  2022: {
    currency:'GBP', fxRef:'GBP@2022-06-30',
    sourceId:'newcastle-gb-group-accounts-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.203, tax:2.217,
    extraRows: [
      {label:'Interest receivable and similar income', value:0.186},
      {label:'Interest payable and expenses', value:-1.389},
      {label:'Taxation', value:2.217},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:185.818, officialTotalExpenses:257.482, officialPAT:-70.65,
  },
  2023: {
    currency:'GBP', fxRef:'GBP@2023-06-30',
    sourceId:'newcastle-gb-group-accounts-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.873, tax:-0.091,
    extraRows: [
      {label:'Interest receivable and similar income', value:0.617},
      {label:'Interest payable and similar expenses', value:-7.49},
      {label:'Taxation', value:-0.091},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:253.101, officialTotalExpenses:319.558, officialPAT:-73.421,
  },
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'newcastle-gb-group-accounts-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-12.292, tax:-0.018,
    extraRows: [
      {label:'Interest receivable and similar income', value:2.127},
      {label:'Interest payable and similar expenses', value:-14.419},
      {label:'Taxation', value:-0.018},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:390.242, officialTotalExpenses:389.029, officialPAT:-11.097,
  },
};

const newcastleGbPresupuestoOverlayByYear = {};
const newcastleGbPasesData = [];
const newcastleGbResultadosData = {};
const newcastleGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['newcastle-gb'] = {
  revenueLinesByYear: newcastleGbRevenueLinesByYear, expenseLinesByYear: newcastleGbExpenseLinesByYear,
  fiscalYearMeta: newcastleGbFiscalYearMeta, pasesData: newcastleGbPasesData,
  resultadosData: newcastleGbResultadosData, titulosData: newcastleGbTitulosData,
  presupuestoOverlayByYear: newcastleGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'newcastle-gb-group-accounts-2025': {
    id:'newcastle-gb-group-accounts-2025', clubId:'newcastle-gb',
    title:'Report and Financial Statements (Newcastle United Limited — cuentas consolidadas del grupo), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02529667/filing-history',
    publicNote:'Cuentas consolidadas del grupo depositadas en Companies House (Reino Unido). Incluye 2 ganancias no operativas por reorganización societaria intra-grupo (venta de una subsidiaria y sale-and-leaseback de mejoras del estadio a una sociedad hermana), registradas aparte del resultado futbolístico.',
  },
  'newcastle-gb-group-accounts-2021-22': {
    id:'newcastle-gb-group-accounts-2021-22', clubId:'newcastle-gb',
    title:'Newcastle United Limited — newcastle-group-accounts-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'newcastle-gb-group-accounts-2022-23': {
    id:'newcastle-gb-group-accounts-2022-23', clubId:'newcastle-gb',
    title:'Newcastle United Limited — newcastle-group-accounts-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'newcastle-gb-group-accounts-2023-24': {
    id:'newcastle-gb-group-accounts-2023-24', clubId:'newcastle-gb',
    title:'Newcastle United Limited — newcastle-group-accounts-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['newcastle-gb'] = {
  pifreuben: { nombre:'Public Investment Fund / Reuben Brothers (tras salida de Staveley, jul-2024)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['newcastle-gb'] = null;
