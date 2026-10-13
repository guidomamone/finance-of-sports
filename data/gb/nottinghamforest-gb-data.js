const nottinghamforestGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:14.408, disclosureLevel:'detailed' },
    { rawLabel:'Media related activity', normalizedCategory:'broadcasting', amountNative:130.019, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:8.550, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial', normalizedCategory:'sponsorship_commercial', amountNative:21.088, disclosureLevel:'detailed' },
    { rawLabel:'Loan fees received', normalizedCategory:'player_sales', amountNative:15.487, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:100.531, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:20.251, disclosureLevel:'detailed' },
    { rawLabel:'Media related activity', normalizedCategory:'broadcasting', amountNative:158.600, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:10.090, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial', normalizedCategory:'sponsorship_commercial', amountNative:28.421, disclosureLevel:'detailed' },
    { rawLabel:'Loan fees received', normalizedCategory:'player_sales', amountNative:4.384, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:7.017, disclosureLevel:'detailed' },
  ],
};

const nottinghamforestGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-166.399, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-61.685, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.159, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Administrative expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-33.564, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-166.651, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-68.883, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of player registrations', normalizedCategory:'player_impairment', amountNative:-5.322, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-1.894, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Administrative expenses no desglosados por naturaleza, neto de staff/amortización/impairment/depreciación)', normalizedCategory:'other_expenses', amountNative:-43.923, disclosureLevel:'aggregated' },
  ],
};

const nottinghamforestGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'nottinghamforest-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'marinakis',
    grossDebt:95.847, cash:0.029,
    profitOnPlayerSales:0, assetSales:0, netInterest:-15.177, tax:0,
    officialTotalRevenue:290.083, officialTotalExpenses:262.807, officialPAT:12.099,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'nottinghamforest-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'marinakis',
    grossDebt:146.485, cash:13.224,
    profitOnPlayerSales:0, assetSales:0, netInterest:-21.011, tax:0,
    officialTotalRevenue:228.763, officialTotalExpenses:286.673, officialPAT:-78.921,
  },
};

const nottinghamforestGbPresupuestoOverlayByYear = {};

const nottinghamforestGbPasesData = [];
const nottinghamforestGbResultadosData = {};
const nottinghamforestGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['nottinghamforest-gb'] = {
  revenueLinesByYear: nottinghamforestGbRevenueLinesByYear, expenseLinesByYear: nottinghamforestGbExpenseLinesByYear,
  fiscalYearMeta: nottinghamforestGbFiscalYearMeta, pasesData: nottinghamforestGbPasesData,
  resultadosData: nottinghamforestGbResultadosData, titulosData: nottinghamforestGbTitulosData,
  presupuestoOverlayByYear: nottinghamforestGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'nottinghamforest-gb-full-accounts-2024': {
    id:'nottinghamforest-gb-full-accounts-2024', clubId:'nottinghamforest-gb',
    title:'Nottingham Forest Football Club Limited — Annual Report and Financial Statements, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01630402/filing-history',
    publicNote:'Cuentas individuales auditadas (Azets Audit Services, sin salvedades) de Nottingham Forest Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24, 2ª temporada de retorno a la Premier League).',
  },
  'nottinghamforest-gb-full-accounts-2025': {
    id:'nottinghamforest-gb-full-accounts-2025', clubId:'nottinghamforest-gb',
    title:'Nottingham Forest Football Club Limited — Annual Report and Financial Statements, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01630402/filing-history',
    publicNote:'Cuentas individuales auditadas (Azets Audit Services, sin salvedades) de Nottingham Forest Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25).',
  },
});

gestionesByClub['nottinghamforest-gb'] = { marinakis: { nombre:'Marinakis / NF Football Investments', firstYear:2024, lastYear:2025 } };

memberCountByClub['nottinghamforest-gb'] = null;
