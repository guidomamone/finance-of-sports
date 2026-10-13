const oficretegrRevenueLinesByYear = {
  2018: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.527893, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.122035, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.080266, disclosureLevel:'aggregated' },
  ],
};
const oficretegrExpenseLinesByYear = {
  2018: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-1.577619, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.095472, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.079767, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.211419, disclosureLevel:'aggregated' },
  ],
};
const oficretegrFiscalYearMeta = {
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'oficrete-gr-ofi-income-stmt-2018-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.00358, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.00358},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.527893, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:1.577619, motivo:'OFI 2023: Κόστος πωλήσεων 7.782.645,53 sin nota que lo abra (notas 2023 sin cuadros) -> lump'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.730194, officialTotalExpenses:1.964276, officialPAT:-1.237662,
  },
};
const oficretegrPresupuestoOverlayByYear = {};

const oficretegrPasesData = [];
const oficretegrResultadosData = {};
const oficretegrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['oficrete-gr'] = {
  revenueLinesByYear: oficretegrRevenueLinesByYear, expenseLinesByYear: oficretegrExpenseLinesByYear,
  fiscalYearMeta: oficretegrFiscalYearMeta, pasesData: oficretegrPasesData,
  resultadosData: oficretegrResultadosData, titulosData: oficretegrTitulosData,
  presupuestoOverlayByYear: oficretegrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'oficrete-gr-ofi-income-stmt-2018-06-30': {
    id:'oficrete-gr-ofi-income-stmt-2018-06-30', clubId:'oficrete-gr',
    title:'Omilos Filathlon Irakleiou P.A.E. OFI 1925 — OFI_income_stmt_2018-06-30 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['oficrete-gr'] = null;
