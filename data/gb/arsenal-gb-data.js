const arsenalGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate and other match day revenues', normalizedCategory:'matchday_competition', amountNative:131.652, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:262.252, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:218.268, disclosureLevel:'detailed' },
    { rawLabel:'Property development', normalizedCategory:'other_income', amountNative:3.034, disclosureLevel:'detailed' },
    { rawLabel:'Player trading', normalizedCategory:'player_sales', amountNative:1.374, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:51.073, disclosureLevel:'detailed' },
    { rawLabel:'Share of joint venture operating loss', normalizedCategory:'other_income', amountNative:-1.934, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate and other match day revenues', normalizedCategory:'matchday_competition', amountNative:153.854, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:272.784, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:263.193, disclosureLevel:'detailed' },
    { rawLabel:'Property', normalizedCategory:'other_income', amountNative:0.713, disclosureLevel:'detailed' },
    { rawLabel:'Player trading', normalizedCategory:'player_sales', amountNative:0.454, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:81.237, disclosureLevel:'detailed' },
    { rawLabel:'Share of joint venture operating loss', normalizedCategory:'other_income', amountNative:-1.690, disclosureLevel:'detailed' },
  ],
};

const arsenalGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-327.822, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-171.099, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation and impairment charges (less amortisation of grants)', normalizedCategory:'depreciation', amountNative:-18.161, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-146.774, disclosureLevel:'detailed' },
    { rawLabel:'Cost of property sales', normalizedCategory:'other_expenses', amountNative:-1.118, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-346.804, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-171.627, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of player registrations', normalizedCategory:'player_impairment', amountNative:-15.241, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation and impairment charges (less amortisation of grants)', normalizedCategory:'depreciation', amountNative:-19.778, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-200.756, disclosureLevel:'detailed' },
  ],
};

const arsenalGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-05-31',
    sourceId:'arsenal-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'kroenke',
    grossDebt:341.784, cash:66.819,
    profitOnPlayerSales:0, assetSales:0, netInterest:-18.432, tax:0,
    officialTotalRevenue:665.719, officialTotalExpenses:664.974, officialPAT:-17.687,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-05-31',
    sourceId:'arsenal-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'kroenke',
    grossDebt:358.294, cash:55.994,
    profitOnPlayerSales:0, assetSales:0, netInterest:-17.687, tax:-0.029,
    officialTotalRevenue:770.545, officialTotalExpenses:754.206, officialPAT:-1.377,
  },
};

const arsenalGbPresupuestoOverlayByYear = {};

const arsenalGbPasesData = [];
const arsenalGbResultadosData = {};
const arsenalGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['arsenal-gb'] = {
  revenueLinesByYear: arsenalGbRevenueLinesByYear, expenseLinesByYear: arsenalGbExpenseLinesByYear,
  fiscalYearMeta: arsenalGbFiscalYearMeta, pasesData: arsenalGbPasesData,
  resultadosData: arsenalGbResultadosData, titulosData: arsenalGbTitulosData,
  presupuestoOverlayByYear: arsenalGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'arsenal-gb-group-accounts-2024': {
    id:'arsenal-gb-group-accounts-2024', clubId:'arsenal-gb',
    title:'Arsenal Holdings Limited — Annual Report and Financial Statements, year ended 31 May 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/04250459/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Arsenal Holdings Limited, la sociedad matriz del grupo, depositado en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2024 (temporada 2023/24).',
  },
  'arsenal-gb-group-accounts-2025': {
    id:'arsenal-gb-group-accounts-2025', clubId:'arsenal-gb',
    title:'Arsenal Holdings Limited — Annual Report and Financial Statements, year ended 31 May 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/04250459/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Arsenal Holdings Limited, la sociedad matriz del grupo, depositado en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2025 (temporada 2024/25).',
  },
});

gestionesByClub['arsenal-gb'] = { kroenke: { nombre:'Kroenke / KSE UK Inc.', firstYear:2024, lastYear:2025 } };

memberCountByClub['arsenal-gb'] = null;
