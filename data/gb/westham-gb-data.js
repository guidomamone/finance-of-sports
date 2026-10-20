const westhamGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Match receipts and related football activities', normalizedCategory:'matchday_competition', amountNative:38.573, disclosureLevel:'detailed' },
    { rawLabel:'Broadcast and central sponsorship distributions', normalizedCategory:'broadcasting', amountNative:132.382, disclosureLevel:'detailed' },
    { rawLabel:'Commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:41.437, disclosureLevel:'detailed' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:13.666, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:3.896, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players', normalizedCategory:'player_sales', amountNative:19.954, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Match receipts and related football activities', normalizedCategory:'matchday_competition', amountNative:40.267, disclosureLevel:'aggregated' },
    { rawLabel:'Broadcast and central sponsorship distributions', normalizedCategory:'broadcasting', amountNative:147.584, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:34.534, disclosureLevel:'aggregated' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:12.976, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:2.495, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of players', normalizedCategory:'player_sales', amountNative:16.98, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Match receipts and related football activities', normalizedCategory:'matchday_competition', amountNative:22.431, disclosureLevel:'aggregated' },
    { rawLabel:'Broadcast and central sponsorship distributions', normalizedCategory:'broadcasting', amountNative:82.52, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:25.111, disclosureLevel:'aggregated' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:8.56, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:1.377, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on sale of players', normalizedCategory:'player_sales', amountNative:22.833, disclosureLevel:'aggregated' },
    { rawLabel:'Income from loan of players', normalizedCategory:'player_sales', amountNative:2.1, disclosureLevel:'aggregated' },
  ],
};

const westhamGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Employment costs', normalizedCategory:'wages_squad', amountNative:-173.335, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangible fixed assets', normalizedCategory:'player_amortisation', amountNative:-99.408, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation on tangible fixed assets', normalizedCategory:'depreciation', amountNative:-2.602, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Operating costs no desglosados por naturaleza, neto de employment costs/depreciación)', normalizedCategory:'other_expenses', amountNative:-64.079, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Operating costs', normalizedCategory:'other_expenses', amountNative:-253.776, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-224.542, disclosureLevel:'aggregated' },
  ],
};

const westhamGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-05-31',
    sourceId:'westham-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'sullivan',
    grossDebt:20.799, cash:0.422,
    profitOnPlayerSales:0, assetSales:0, netInterest:-19.326, tax:0.581,
    officialTotalRevenue:249.908, officialTotalExpenses:339.424, officialPAT:-108.261,
  },
  2023: {
    currency:'GBP', fxRef:'GBP@2023-05-31',
    sourceId:'westham-gb-full-accounts-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-18.446, tax:1.217,
    extraRows: [
      {label:'Interest receivable and similar income', value:0.579},
      {label:'Interest payable and similar expenses', value:-19.025},
      {label:'Tax on (loss)/profit', value:1.217},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:254.836, officialTotalExpenses:253.776, officialPAT:-16.169,
  },
  2020: {
    currency:'GBP', fxRef:'GBP@2020-05-31',
    sourceId:'westham-gb-full-accounts-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.134, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:0.031},
      {label:'Interest payable and similar expenses', value:-5.165},
      {label:'Tax on Loss', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:164.932, officialTotalExpenses:224.542, officialPAT:-64.744,
  },
};

const westhamGbPresupuestoOverlayByYear = {};

const westhamGbPasesData = [];
const westhamGbResultadosData = {};
const westhamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['westham-gb'] = {
  revenueLinesByYear: westhamGbRevenueLinesByYear, expenseLinesByYear: westhamGbExpenseLinesByYear,
  fiscalYearMeta: westhamGbFiscalYearMeta, pasesData: westhamGbPasesData,
  resultadosData: westhamGbResultadosData, titulosData: westhamGbTitulosData,
  presupuestoOverlayByYear: westhamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'westham-gb-full-accounts-2025': {
    id:'westham-gb-full-accounts-2025', clubId:'westham-gb',
    title:'West Ham United Football Club Limited — Annual Report and Financial Statements, year ended 31 May 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00066516/filing-history',
    publicNote:'Cuentas individuales auditadas de West Ham United Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2025 (temporada 2024/25, 14° en la Premier League).',
  },
  'westham-gb-full-accounts-2022-23': {
    id:'westham-gb-full-accounts-2022-23', clubId:'westham-gb',
    title:'West Ham United Football Club Limited — westham-full-accounts-2022-23 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'westham-gb-full-accounts-2019-20': {
    id:'westham-gb-full-accounts-2019-20', clubId:'westham-gb',
    title:'West Ham United Football Club Limited — westham-full-accounts-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['westham-gb'] = { sullivan: { nombre:'Sullivan / Kretinsky / Estate of Gold', firstYear:2025, lastYear:2025 } };

memberCountByClub['westham-gb'] = null;
