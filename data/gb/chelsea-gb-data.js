const chelseaGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:203.230, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:200.865, disclosureLevel:'detailed' },
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:86.762, disclosureLevel:'detailed' },
    { rawLabel:'Research & development tax credit', normalizedCategory:'other_income', amountNative:0.500, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:57.906, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:182.546, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:170.387, disclosureLevel:'aggregated' },
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:54.469, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:142.645, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of tangible fixed assets', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
};

const chelseaGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Cost of sales (incluye salarios de plantel, sin desglose propio — ver duda)', normalizedCategory:'wages_squad', amountNative:-428.673, disclosureLevel:'summary' },
    { rawLabel:'Amounts payable in relation to legal and regulatory matters (incluye settlement UEFA por Financial Sustainability Regulations)', normalizedCategory:'exceptional_items', amountNative:-50.200, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-12.519, disclosureLevel:'detailed' },
    { rawLabel:'Administrative expenses (residual, sin más desglose)', normalizedCategory:'admin_general_expense', amountNative:-83.778, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation and impairment of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-224.344, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Cost of sales', normalizedCategory:'wages_squad', amountNative:-318.492, disclosureLevel:'aggregated' },
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-200.474, disclosureLevel:'aggregated' },
    { rawLabel:'Exceptional administrative expenses', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Fair value loss on investment properties', normalizedCategory:'other_expenses', amountNative:-0.1, disclosureLevel:'aggregated' },
  ],
};

const chelseaGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'chelsea-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'boehly-clearlake',
    grossDebt:0, cash:49.009,
    profitOnPlayerSales:0, assetSales:-2.985, netInterest:-9.208, tax:-0.203,
    officialTotalRevenue:549.263, officialTotalExpenses:749.314, officialPAT:-262.647,
  },
  2020: {
    currency:'GBP', fxRef:'GBP@2020-06-30',
    sourceId:'chelsea-gb-fc-holdings-group-accounts-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:4.671, tax:-3.179,
    extraRows: [
      {label:'Interest receivable and similar income', value:7.971},
      {label:'Interest payable and similar charges', value:-3.3},
      {label:'Taxation', value:-3.179},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:550.047, officialTotalExpenses:519.066, officialPAT:32.473,
  },
};

const chelseaGbPresupuestoOverlayByYear = {};
const chelseaGbPasesData = [];
const chelseaGbResultadosData = {};
const chelseaGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chelsea-gb'] = {
  revenueLinesByYear: chelseaGbRevenueLinesByYear, expenseLinesByYear: chelseaGbExpenseLinesByYear,
  fiscalYearMeta: chelseaGbFiscalYearMeta, pasesData: chelseaGbPasesData,
  resultadosData: chelseaGbResultadosData, titulosData: chelseaGbTitulosData,
  presupuestoOverlayByYear: chelseaGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'chelsea-gb-group-accounts-2025': {
    id:'chelsea-gb-group-accounts-2025', clubId:'chelsea-gb',
    title:'Group accounts (Chelsea FC Holdings Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02536231/filing-history',
    publicNote:'La venta de Chelsea FC Women a una parte relacionada (£198,7m de ganancia) ocurrió en el ejercicio anterior (2023-24), no en este.',
  },
  'chelsea-gb-fc-holdings-group-accounts-2019-20': {
    id:'chelsea-gb-fc-holdings-group-accounts-2019-20', clubId:'chelsea-gb',
    title:'Chelsea FC Holdings Limited — chelsea-fc-holdings-group-accounts-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['chelsea-gb'] = {
  'boehly-clearlake': { nombre:'Todd Boehly / Clearlake Capital', firstYear:2025, lastYear:2025 },
};

memberCountByClub['chelsea-gb'] = null;
