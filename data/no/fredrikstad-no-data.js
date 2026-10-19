const fredrikstadnoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'lump_football_operations', amountNative:92.725486, disclosureLevel:'aggregated' },
  ],
  2016: [
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'lump_football_operations', amountNative:33.801587, disclosureLevel:'aggregated' },
  ],
  2017: [
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'lump_football_operations', amountNative:28.452409, disclosureLevel:'aggregated' },
  ],
  2013: [
    { rawLabel:'Salgsinntekt', normalizedCategory:'lump_football_operations', amountNative:14.289455, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'lump_football_operations', amountNative:1.291506, disclosureLevel:'aggregated' },
  ],
};
const fredrikstadnoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-9.678901, disclosureLevel:'aggregated' },
    { rawLabel:'Lønnskostnad', normalizedCategory:'wages_squad', amountNative:-53.626147, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning', normalizedCategory:'depreciation', amountNative:-5.056889, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-21.50972, disclosureLevel:'aggregated' },
  ],
  2016: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-4.006214, disclosureLevel:'aggregated' },
    { rawLabel:'Lønnskostnad', normalizedCategory:'wages_squad', amountNative:-19.287756, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning', normalizedCategory:'depreciation', amountNative:-0.541479, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-9.977524, disclosureLevel:'aggregated' },
  ],
  2017: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-3.777036, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-14.794685, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-2.053884, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-0.249952, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-0.45711, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning', normalizedCategory:'depreciation', amountNative:-0.811054, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-6.350206, disclosureLevel:'aggregated' },
  ],
  2013: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-2.253392, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-13.093523, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-1.883764, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-0.182305, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-0.163735, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning', normalizedCategory:'depreciation', amountNative:-0.087835, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-17.181495, disclosureLevel:'aggregated' },
  ],
};
const fredrikstadnoFiscalYearMeta = {
  2024: {
    currency:'NOK', fxRef:'NOK@2024-12-31',
    sourceId:'fredrikstad-no-wf-src-ffk-arsmote-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.087325, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:0.223302},
      {label:'Annen finanskostnad', value:-0.310627},
    ],
    incluidoEn:{"member_dues":"lump_football_operations","broadcasting":{"en":"lump_football_operations","posible":true},"matchday_competition":{"en":"lump_football_operations","posible":true}},
    sinDesglose: [
      {renglon:'Annen driftsinntekt', lado:'revenue', importe:92.725486, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:92.725486, officialTotalExpenses:89.871657, officialPAT:2.766504,
  },
  2016: {
    currency:'NOK', fxRef:'NOK@2016-12-31',
    sourceId:'fredrikstad-no-aarsregnskap-fotballklubb-fli-2016',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.031955, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:0.042386},
      {label:'Annen finanskostnad', value:-0.010431},
    ],
    sinDesglose: [
      {renglon:'Annen driftsinntekt', lado:'revenue', importe:33.801587, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:33.801587, officialTotalExpenses:33.812973, officialPAT:0.020569,
  },
  2017: {
    currency:'NOK', fxRef:'NOK@2017-12-31',
    sourceId:'fredrikstad-no-aarsregnskap-fotballklubb-fli-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.009456, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:0.039931},
      {label:'Annen finanskostnad', value:-0.030475},
    ],
    sinDesglose: [
      {renglon:'Annen driftsinntekt', lado:'revenue', importe:28.452409, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:28.452409, officialTotalExpenses:28.493927, officialPAT:-0.032063,
  },
  2013: {
    currency:'NOK', fxRef:'NOK@2013-12-31',
    sourceId:'fredrikstad-no-aarsregnskap-fotballklubb-fli-2013',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:1.311729, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:1.468544},
      {label:'Annen finanskostnad', value:-0.156815},
    ],
    sinDesglose: [
      {renglon:'Salgsinntekt', lado:'revenue', importe:14.289455, motivo:'Claude 2026-10-19: mismo criterio que el FLI 2024 ya cargado (Annen driftsinntekt -> lump_football_operations)'},
      {renglon:'Annen driftsinntekt', lado:'revenue', importe:1.291506, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:15.580961, officialTotalExpenses:34.846049, officialPAT:-17.953359,
  },
};
const fredrikstadnoPresupuestoOverlayByYear = {};

const fredrikstadnoPasesData = [];
const fredrikstadnoResultadosData = {};
const fredrikstadnoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fredrikstad-no'] = {
  revenueLinesByYear: fredrikstadnoRevenueLinesByYear, expenseLinesByYear: fredrikstadnoExpenseLinesByYear,
  fiscalYearMeta: fredrikstadnoFiscalYearMeta, pasesData: fredrikstadnoPasesData,
  resultadosData: fredrikstadnoResultadosData, titulosData: fredrikstadnoTitulosData,
  presupuestoOverlayByYear: fredrikstadnoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fredrikstad-no-wf-src-ffk-arsmote-2025': {
    id:'fredrikstad-no-wf-src-ffk-arsmote-2025', clubId:'fredrikstad-no',
    title:'Fredrikstad Fotballklubb — wf-src-FFK_-_Årsmøte_2025 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'fredrikstad-no-aarsregnskap-fotballklubb-fli-2016': {
    id:'fredrikstad-no-aarsregnskap-fotballklubb-fli-2016', clubId:'fredrikstad-no',
    title:'Fredrikstad Fotballklubb — aarsregnskap-fotballklubb-fli-2016 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'fredrikstad-no-aarsregnskap-fotballklubb-fli-2017': {
    id:'fredrikstad-no-aarsregnskap-fotballklubb-fli-2017', clubId:'fredrikstad-no',
    title:'Fredrikstad Fotballklubb — aarsregnskap-fotballklubb-fli-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'fredrikstad-no-aarsregnskap-fotballklubb-fli-2013': {
    id:'fredrikstad-no-aarsregnskap-fotballklubb-fli-2013', clubId:'fredrikstad-no',
    title:'Fredrikstad Fotballklubb — aarsregnskap-fotballklubb-fli-2013 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['fredrikstad-no'] = null;
