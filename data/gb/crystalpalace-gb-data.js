const crystalpalaceGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:145.451, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:16.104, disclosureLevel:'detailed' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:13.809, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:10.167, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:4.693, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:1.341, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:142.296, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:19.350, disclosureLevel:'detailed' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:15.634, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:11.369, disclosureLevel:'detailed' },
    { rawLabel:'Other income (incluye £4,4m de prize money FA Cup, sin línea propia)', normalizedCategory:'other_income', amountNative:7.974, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:66.078, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:126.49, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:11.642, disclosureLevel:'aggregated' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:11.462, disclosureLevel:'aggregated' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:8.706, disclosureLevel:'aggregated' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:1.699, disclosureLevel:'aggregated' },
    { rawLabel:'Profit on disposal of players', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'aggregated' },
  ],
};

const crystalpalaceGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-133.712, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-28.038, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-45.951, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-3.241, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-148.292, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-33.032, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-54.147, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-3.676, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Wages and salaries', normalizedCategory:'wages_squad', amountNative:-108.701, disclosureLevel:'aggregated' },
    { rawLabel:'Social security costs', normalizedCategory:'wages_squad', amountNative:-14.955, disclosureLevel:'aggregated' },
    { rawLabel:'Other pension costs', normalizedCategory:'wages_squad', amountNative:-0.179, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-19.458, disclosureLevel:'aggregated' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-2.396, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisation', normalizedCategory:'player_amortisation', amountNative:-34.151, disclosureLevel:'aggregated' },
  ],
};

const crystalpalaceGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'crystalpalace-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'parish-blitzer-harris-textor',
    grossDebt:157.905, cash:9.036,
    profitOnPlayerSales:0, assetSales:0.007, netInterest:-13.561, tax:0,
    officialTotalRevenue:191.565, officialTotalExpenses:210.942, officialPAT:-32.931,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'crystalpalace-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'parish-blitzer-harris-textor',
    grossDebt:121.918, cash:13.715,
    profitOnPlayerSales:0, assetSales:-0.161, netInterest:-15.128, tax:0,
    officialTotalRevenue:262.701, officialTotalExpenses:239.147, officialPAT:8.265,
  },
  2022: {
    currency:'GBP', fxRef:'GBP@2022-06-30',
    sourceId:'crystalpalace-gb-cpfc-2010-group-accounts-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.388, tax:0,
    extraRows: [
      {label:'Interest receivable', value:0.018},
      {label:'Interest payable and similar charges', value:-4.406},
      {label:'Taxation', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:159.999, officialTotalExpenses:179.84, officialPAT:-24.229,
  },
};

const crystalpalaceGbPresupuestoOverlayByYear = {};
const crystalpalaceGbPasesData = [];
const crystalpalaceGbResultadosData = {};
const crystalpalaceGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['crystalpalace-gb'] = {
  revenueLinesByYear: crystalpalaceGbRevenueLinesByYear, expenseLinesByYear: crystalpalaceGbExpenseLinesByYear,
  fiscalYearMeta: crystalpalaceGbFiscalYearMeta, pasesData: crystalpalaceGbPasesData,
  resultadosData: crystalpalaceGbResultadosData, titulosData: crystalpalaceGbTitulosData,
  presupuestoOverlayByYear: crystalpalaceGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'crystalpalace-gb-group-accounts-2024': {
    id:'crystalpalace-gb-group-accounts-2024', clubId:'crystalpalace-gb',
    title:'Group accounts (CPFC 2010 Limited), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/07206409/filing-history',
  },
  'crystalpalace-gb-group-accounts-2025': {
    id:'crystalpalace-gb-group-accounts-2025', clubId:'crystalpalace-gb',
    title:'Group accounts (CPFC 2010 Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/07206409/filing-history',
    publicNote:'Temporada de la primera FA Cup de la historia del club (2024-25).',
  },
  'crystalpalace-gb-cpfc-2010-group-accounts-2021-22': {
    id:'crystalpalace-gb-cpfc-2010-group-accounts-2021-22', clubId:'crystalpalace-gb',
    title:'CPFC 2010 Limited — cpfc-2010-group-accounts-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['crystalpalace-gb'] = {
  'parish-blitzer-harris-textor': { nombre:'Parish / Blitzer-Harris / Textor', firstYear:2024, lastYear:2025 },
};

memberCountByClub['crystalpalace-gb'] = null;
