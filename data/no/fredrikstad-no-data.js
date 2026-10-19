const fredrikstadnoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'lump_football_operations', amountNative:92.725486, disclosureLevel:'aggregated' },
  ],
  2016: [
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'lump_football_operations', amountNative:33.801587, disclosureLevel:'aggregated' },
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
});

memberCountByClub['fredrikstad-no'] = null;
