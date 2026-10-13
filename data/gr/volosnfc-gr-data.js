const volosnfcgrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.405846, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.044524, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const volosnfcgrExpenseLinesByYear = {
  2019: [
    { rawLabel:'Μεταβολές αποθεμάτων (εμπορεύματα, προϊόντα, ημικατ/μένα)', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Αγορές εμπορευμάτων και υλικών', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές σε εργαζόμενους', normalizedCategory:'wages_squad', amountNative:-0.206288, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις ενσωμάτων παγίων και άυλων στοιχείων', normalizedCategory:'depreciation', amountNative:-0.00395, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.404707, disclosureLevel:'aggregated' },
  ],
};
const volosnfcgrFiscalYearMeta = {
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'volosnfc-gr-volos-income-stmt-2019-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.001046, tax:0,
    extraRows: [
      {label:'Τόκοι και συναφή κονδύλια (καθαρό ποσό)', value:-0.001046},
      {label:'Φόροι', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.405846, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.45037, officialTotalExpenses:0.614945, officialPAT:-0.165621,
  },
};
const volosnfcgrPresupuestoOverlayByYear = {};

const volosnfcgrPasesData = [];
const volosnfcgrResultadosData = {};
const volosnfcgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['volosnfc-gr'] = {
  revenueLinesByYear: volosnfcgrRevenueLinesByYear, expenseLinesByYear: volosnfcgrExpenseLinesByYear,
  fiscalYearMeta: volosnfcgrFiscalYearMeta, pasesData: volosnfcgrPasesData,
  resultadosData: volosnfcgrResultadosData, titulosData: volosnfcgrTitulosData,
  presupuestoOverlayByYear: volosnfcgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'volosnfc-gr-volos-income-stmt-2019-06-30': {
    id:'volosnfc-gr-volos-income-stmt-2019-06-30', clubId:'volosnfc-gr',
    title:'Volos N.P.S. P.A.E. — Volos_income_stmt_2019-06-30 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['volosnfc-gr'] = null;
