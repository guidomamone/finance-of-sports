const burnleyGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Match income', normalizedCategory:'matchday_competition', amountNative:8.869, disclosureLevel:'detailed' },
    { rawLabel:'Television rights', normalizedCategory:'broadcasting', amountNative:110.564, disclosureLevel:'detailed' },
    { rawLabel:'Catering sales', normalizedCategory:'stadium_other', amountNative:0.836, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:10.681, disclosureLevel:'not_disclosed' },
    { rawLabel:'Retail sales', normalizedCategory:'sponsorship_commercial', amountNative:2.615, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (excluding player trading)', normalizedCategory:'other_income', amountNative:0.804, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (player trading — loan fees receivable)', normalizedCategory:'player_sales', amountNative:5.494, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player/staff registrations', normalizedCategory:'player_sales', amountNative:15.059, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Match income', normalizedCategory:'matchday_competition', amountNative:9.095, disclosureLevel:'detailed' },
    { rawLabel:'Television rights', normalizedCategory:'broadcasting', amountNative:55.219, disclosureLevel:'detailed' },
    { rawLabel:'Catering sales', normalizedCategory:'stadium_other', amountNative:0.351, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:4.358, disclosureLevel:'not_disclosed' },
    { rawLabel:'Retail sales', normalizedCategory:'sponsorship_commercial', amountNative:2.723, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (excluding player trading)', normalizedCategory:'other_income', amountNative:0.980, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (player trading — loan fees receivable)', normalizedCategory:'player_sales', amountNative:4.596, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player/staff registrations', normalizedCategory:'player_sales', amountNative:58.954, disclosureLevel:'detailed' },
  ],
};

const burnleyGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-27.744, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-93.420, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-2.629, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-42.615, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-30.401, disclosureLevel:'not_disclosed' },
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-82.263, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-2.606, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-36.679, disclosureLevel:'detailed' },
  ],
};

const burnleyGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-07-31',
    sourceId:'burnley-gb-holdings-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'pace',
    grossDebt:112.393, cash:8.910,
    profitOnPlayerSales:0, assetSales:0, netInterest:-16.961, tax:4.016,
    officialTotalRevenue:154.922, officialTotalExpenses:166.408, officialPAT:-24.431,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-07-31',
    sourceId:'burnley-gb-holdings-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'pace',
    grossDebt:142.372, cash:12.909,
    profitOnPlayerSales:0, assetSales:0, netInterest:-13.489, tax:0.632,
    officialTotalRevenue:136.276, officialTotalExpenses:151.949, officialPAT:-28.530,
  },
};

const burnleyGbPresupuestoOverlayByYear = {};

const burnleyGbPasesData = [];
const burnleyGbResultadosData = {};
const burnleyGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['burnley-gb'] = {
  revenueLinesByYear: burnleyGbRevenueLinesByYear, expenseLinesByYear: burnleyGbExpenseLinesByYear,
  fiscalYearMeta: burnleyGbFiscalYearMeta, pasesData: burnleyGbPasesData,
  resultadosData: burnleyGbResultadosData, titulosData: burnleyGbTitulosData,
  presupuestoOverlayByYear: burnleyGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'burnley-gb-holdings-group-accounts-2024': {
    id:'burnley-gb-holdings-group-accounts-2024', clubId:'burnley-gb',
    title:'Burnley FC Holdings Limited — Annual Report and Financial Statements, year ended 31 July 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/08335231/filing-history',
    publicNote:'Balance consolidado auditado (BDO LLP, con énfasis de negocio en marcha) de Burnley FC Holdings Limited, la sociedad matriz del grupo (ALK Capital / Alan Pace), depositado en Companies House (Reino Unido). Ejercicio cerrado el 31 de julio de 2024 (temporada 2023/24, Premier League — recién ascendido, descendió al terminar 19°).',
  },
  'burnley-gb-holdings-group-accounts-2025': {
    id:'burnley-gb-holdings-group-accounts-2025', clubId:'burnley-gb',
    title:'Burnley FC Holdings Limited — Annual Report and Financial Statements, year ended 31 July 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/08335231/filing-history',
    publicNote:'Balance consolidado auditado (BDO LLP) de Burnley FC Holdings Limited. Ejercicio cerrado el 31 de julio de 2025 (temporada 2024/25, CHAMPIONSHIP — recién descendido, ascendió de nuevo terminando 2°, no Premier League como los otros 4 clubes onboardeados en esta sesión).',
  },
});

gestionesByClub['burnley-gb'] = { pace: { nombre:'Alan Pace / ALK Capital LLC', firstYear:2024, lastYear:2025 } };

memberCountByClub['burnley-gb'] = null;
