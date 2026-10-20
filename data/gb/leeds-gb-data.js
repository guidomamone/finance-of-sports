const leedsGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:30.633661, disclosureLevel:'detailed' },
    { rawLabel:'Television and broadcasting income + Central distributions', normalizedCategory:'broadcasting', amountNative:53.643430, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:25.410723, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:9.496047, disclosureLevel:'detailed' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:8.314712, disclosureLevel:'detailed' },
    { rawLabel:'Educational services', normalizedCategory:'education', amountNative:0.059707, disclosureLevel:'detailed' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:33.694289, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:31.647912, disclosureLevel:'detailed' },
    { rawLabel:'Television and broadcasting income + Central distributions', normalizedCategory:'broadcasting', amountNative:47.228520, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:24.560557, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:25.890452, disclosureLevel:'detailed' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:7.614479, disclosureLevel:'detailed' },
    { rawLabel:'Educational services', normalizedCategory:'education', amountNative:0.047410, disclosureLevel:'detailed' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:24.765848, disclosureLevel:'detailed' },
  ],
  2019: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:12.612796, disclosureLevel:'aggregated' },
    { rawLabel:'Television and broadcasting income', normalizedCategory:'broadcasting', amountNative:1.486, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:9.436899, disclosureLevel:'aggregated' },
    { rawLabel:'Central distributions', normalizedCategory:'broadcasting', amountNative:7.649, disclosureLevel:'aggregated' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:11.937394, disclosureLevel:'aggregated' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:5.797676, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:0.00286, disclosureLevel:'aggregated' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:15.649423, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Turnover', normalizedCategory:'lump_football_operations', amountNative:54.18398, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:3.528322, disclosureLevel:'aggregated' },
    { rawLabel:'Gain on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:10.128024, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:24.579185, disclosureLevel:'aggregated' },
    { rawLabel:'Television and broadcasting income', normalizedCategory:'broadcasting', amountNative:19.802631, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising income', normalizedCategory:'sponsorship_commercial', amountNative:25.05464, disclosureLevel:'aggregated' },
    { rawLabel:'Central distributions', normalizedCategory:'broadcasting', amountNative:95.870294, disclosureLevel:'aggregated' },
    { rawLabel:'Other commercial revenue', normalizedCategory:'sponsorship_commercial', amountNative:18.935151, disclosureLevel:'aggregated' },
    { rawLabel:'Catering income', normalizedCategory:'other_income', amountNative:4.693913, disclosureLevel:'aggregated' },
    { rawLabel:'Educational services', normalizedCategory:'education', amountNative:0.270955, disclosureLevel:'aggregated' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Gain/ (loss) on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:0.889647, disclosureLevel:'aggregated' },
  ],
};

const leedsGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-84.030436, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-59.358850, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations (First Team Squad review)', normalizedCategory:'player_impairment', amountNative:-7.475305, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-4.855858, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residual, sin desglose propio en la fuente)', normalizedCategory:'other_expenses', amountNative:-48.091406, disclosureLevel:'estimated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-102.724254, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-46.379060, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-3.014241, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-6.200495, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residual, incluye crédito neto por negative goodwill — ver comentario de cabecera)', normalizedCategory:'other_expenses', amountNative:-47.072661, disclosureLevel:'estimated' },
  ],
  2019: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-9.970908, disclosureLevel:'aggregated' },
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-75.099771, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-13.885858, disclosureLevel:'aggregated' },
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-108.398516, disclosureLevel:'aggregated' },
    { rawLabel:'Television and broadcasting rebate', normalizedCategory:'other_expenses', amountNative:-7, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Cost of sales', normalizedCategory:'other_expenses', amountNative:-20.174675, disclosureLevel:'aggregated' },
    { rawLabel:'Administrative expenses', normalizedCategory:'admin_general_expense', amountNative:-203.502431, disclosureLevel:'aggregated' },
    { rawLabel:'Settlement of transfer dispute', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' },
  ],
};

const leedsGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'leeds-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'marathe49ers',
    grossDebt:60.297537, cash:5.008994,
    netInterest:-18.252199, assetSales:0, tax:0, profitOnPlayerSales:0,
    officialTotalRevenue:161.252569, officialTotalExpenses:203.811855, officialPAT:-60.811485,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'leeds-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'marathe49ers',
    grossDebt:58.824929, cash:33.952665,
    netInterest:-5.542355, assetSales:0, tax:0, profitOnPlayerSales:0,
    officialTotalRevenue:161.755178, officialTotalExpenses:205.390711, officialPAT:-49.177888,
  },
  2019: {
    currency:'GBP', fxRef:'GBP@2019-06-30',
    sourceId:'leeds-gb-group-accounts-2018-19',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.900363, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:1.062},
      {label:'Interest payable and similar expenses', value:-1.962363},
      {label:'Tax on loss', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:64.572048, officialTotalExpenses:85.070679, officialPAT:-21.398994,
  },
  2020: {
    incluidoEn:{ sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' } },
    currency:'GBP', fxRef:'GBP@2020-07-31',
    sourceId:'leeds-gb-group-accounts-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.977936, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:1.05751},
      {label:'Interest payable and similar expenses', value:-2.035446},
      {label:'Tax on loss', value:null},
    ],
    sinDesglose: [
      {renglon:'Turnover', lado:'revenue', importe:54.18398, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:67.840326, officialTotalExpenses:129.284374, officialPAT:-62.421984,
  },
  2022: {
    currency:'GBP', fxRef:'GBP@2022-06-30',
    sourceId:'leeds-gb-group-accounts-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.129737, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:6.598522},
      {label:'Interest payable and similar expenses', value:-9.728259},
      {label:'Tax on loss', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:190.096416, officialTotalExpenses:223.677106, officialPAT:-36.710427,
  },
};

const leedsGbPresupuestoOverlayByYear = {};
const leedsGbPasesData = [];
const leedsGbResultadosData = {};
const leedsGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['leeds-gb'] = {
  revenueLinesByYear: leedsGbRevenueLinesByYear, expenseLinesByYear: leedsGbExpenseLinesByYear,
  fiscalYearMeta: leedsGbFiscalYearMeta, pasesData: leedsGbPasesData,
  resultadosData: leedsGbResultadosData, titulosData: leedsGbTitulosData,
  presupuestoOverlayByYear: leedsGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'leeds-gb-group-accounts-2024': {
    id:'leeds-gb-group-accounts-2024', clubId:'leeds-gb',
    title:'Consolidated Financial Statements (Leeds United Football Club Limited), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06233875/filing-history',
  },
  'leeds-gb-group-accounts-2025': {
    id:'leeds-gb-group-accounts-2025', clubId:'leeds-gb',
    title:'Consolidated Financial Statements (Leeds United Football Club Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06233875/filing-history',
    publicNote:'Campeón del Championship 2024-25 (100 puntos), ascendido a la Premier League para la temporada 2025-26 (fuera del alcance de este ejercicio).',
  },
  'leeds-gb-group-accounts-2018-19': {
    id:'leeds-gb-group-accounts-2018-19', clubId:'leeds-gb',
    title:'Leeds United Football Club Limited — leeds-group-accounts-2018-19 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'leeds-gb-group-accounts-2019-20': {
    id:'leeds-gb-group-accounts-2019-20', clubId:'leeds-gb',
    title:'Leeds United Football Club Limited — leeds-group-accounts-2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'leeds-gb-group-accounts-2021-22': {
    id:'leeds-gb-group-accounts-2021-22', clubId:'leeds-gb',
    title:'Leeds United Football Club Limited — leeds-group-accounts-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['leeds-gb'] = {
  marathe49ers: { nombre:'49ers Enterprises Global Football Group LLC (Paraag Marathe, Chairman)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['leeds-gb'] = null;
