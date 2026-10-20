const wolvesGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:16.193, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:14.538, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting rights', normalizedCategory:'broadcasting', amountNative:15.569, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:12.288, disclosureLevel:'detailed' },
    { rawLabel:'League distributions', normalizedCategory:'broadcasting', amountNative:117.135, disclosureLevel:'detailed' },
    { rawLabel:'Other turnover', normalizedCategory:'other_income', amountNative:1.974, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:64.631, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:21.766, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:19.830, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting rights', normalizedCategory:'broadcasting', amountNative:125.591, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:4.788, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (incl. seguros)', normalizedCategory:'other_income', amountNative:1.424, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:116.984, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:12.703, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:11.922, disclosureLevel:'aggregated' },
    { rawLabel:'Broadcasting rights', normalizedCategory:'broadcasting', amountNative:23.329, disclosureLevel:'aggregated' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:10.541, disclosureLevel:'aggregated' },
    { rawLabel:'League distributions', normalizedCategory:'broadcasting', amountNative:72.484, disclosureLevel:'aggregated' },
    { rawLabel:'Other turnover', normalizedCategory:'other_income', amountNative:1.63, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:9.52, disclosureLevel:'aggregated' },
  ],
};

const wolvesGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-141.284, disclosureLevel:'detailed' },
    { rawLabel:"Amortisation of player's registrations", normalizedCategory:'player_amortisation', amountNative:-64.168, disclosureLevel:'detailed' },
    { rawLabel:'Provision for impairment of intangible assets', normalizedCategory:'player_impairment', amountNative:-3.024, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of assets', normalizedCategory:'depreciation', amountNative:-1.477, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of other intangible assets', normalizedCategory:'other_amortisation', amountNative:-0.067, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Operating expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-37.547, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-162.087, disclosureLevel:'detailed' },
    { rawLabel:"Amortisation of player's registrations", normalizedCategory:'player_amortisation', amountNative:-75.426, disclosureLevel:'detailed' },
    { rawLabel:'Provision for impairment of intangible assets', normalizedCategory:'player_impairment', amountNative:-12.365, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of assets', normalizedCategory:'depreciation', amountNative:-1.535, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of other intangible assets', normalizedCategory:'other_amortisation', amountNative:-0.012, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Operating expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-39.273, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Operating expenses', normalizedCategory:'other_expenses', amountNative:-174.79, disclosureLevel:'aggregated' },
  ],
};

const wolvesGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-05-31',
    sourceId:'wolves-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'fosun',
    grossDebt:100.609, cash:30.563,
    profitOnPlayerSales:0, assetSales:0, netInterest:-5.639, tax:0,
    officialTotalRevenue:242.328, officialTotalExpenses:247.567, officialPAT:-10.878,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'wolves-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'fosun',
    grossDebt:101.394, cash:33.439,
    profitOnPlayerSales:0, assetSales:0, netInterest:-11.316, tax:0,
    officialTotalRevenue:290.383, officialTotalExpenses:290.698, officialPAT:-11.631,
  },
  2020: {
    currency:'GBP', fxRef:'GBP@2020-05-31',
    sourceId:'wolves-gb-full-accounts-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.691, tax:0.681,
    extraRows: [
      {label:'Interest receivable and similar income', value:0.121},
      {label:'Interest payable and similar charges', value:-4.812},
      {label:'Tax on (loss)/profit', value:0.681},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:142.129, officialTotalExpenses:174.79, officialPAT:-36.671,
  },
};

const wolvesGbPresupuestoOverlayByYear = {};

const wolvesGbPasesData = [];
const wolvesGbResultadosData = {};
const wolvesGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['wolves-gb'] = {
  revenueLinesByYear: wolvesGbRevenueLinesByYear, expenseLinesByYear: wolvesGbExpenseLinesByYear,
  fiscalYearMeta: wolvesGbFiscalYearMeta, pasesData: wolvesGbPasesData,
  resultadosData: wolvesGbResultadosData, titulosData: wolvesGbTitulosData,
  presupuestoOverlayByYear: wolvesGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'wolves-gb-full-accounts-2024': {
    id:'wolves-gb-full-accounts-2024', clubId:'wolves-gb',
    title:'Wolverhampton Wanderers Football Club (1986) Limited — Report and Financial Statements, year ended 31 May 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01989823/filing-history',
    publicNote:'Cuentas individuales auditadas de Wolverhampton Wanderers Football Club (1986) Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2024 (temporada 2023/24), 12 meses.',
  },
  'wolves-gb-full-accounts-2025': {
    id:'wolves-gb-full-accounts-2025', clubId:'wolves-gb',
    title:'Wolverhampton Wanderers Football Club (1986) Limited — Report and Financial Statements, period ended 30 June 2025 (13 meses)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01989823/filing-history',
    publicNote:'Cuentas individuales auditadas de Wolverhampton Wanderers Football Club (1986) Limited, depositadas en Companies House (Reino Unido). PERÍODO DE TRANSICIÓN DE 13 MESES (1° de junio de 2024 a 30 de junio de 2025) por un cambio de fecha de cierre de ejercicio de 31/5 a 30/6 — NO es un ejercicio normal de 12 meses, ver aviso completo en el comentario de cabecera de data/wolves-gb-data.js.',
  },
  'wolves-gb-full-accounts-2019-20': {
    id:'wolves-gb-full-accounts-2019-20', clubId:'wolves-gb',
    title:'Wolverhampton Wanderers Football Club (1986) Limited — wolves-full-accounts-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['wolves-gb'] = { fosun: { nombre:'Fosun International', firstYear:2024, lastYear:2025 } };

memberCountByClub['wolves-gb'] = null;
