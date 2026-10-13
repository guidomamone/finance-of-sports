const volosnfcgrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.405846, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.044524, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:1.454697, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.063431, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Κύκλος εργασιών', normalizedCategory:'lump_football_operations', amountNative:2.177347, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.879813, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Κύκλος εργασιών', normalizedCategory:'lump_football_operations', amountNative:3.574025, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.631156, disclosureLevel:'aggregated' },
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
  2020: [
    { rawLabel:'Μεταβολές αποθεμάτων (εμπορεύματα, προϊόντα, ημικατ/μένα)', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Αγορές εμπορευμάτων και υλικών', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές σε εργαζόμενους', normalizedCategory:'wages_squad', amountNative:-0.481983, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις ενσωμάτων παγίων και άυλων στοιχείων', normalizedCategory:'depreciation', amountNative:-0.046583, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-1.246395, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-2.739218, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.001935, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-4.080745, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.003871, disclosureLevel:'aggregated' },
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
  2020: {
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'volosnfc-gr-volos-income-stmt-2020-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.001781, tax:0,
    extraRows: [
      {label:'Τόκοι και συναφή κονδύλια (καθαρό ποσό)', value:-0.001781},
      {label:'Φόροι', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:1.454697, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.518128, officialTotalExpenses:1.774961, officialPAT:-0.258615,
  },
  2021: {
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'volosnfc-gr-volos-income-stmt-2021-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.003162, tax:-0.025264,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000063},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.003225},
      {label:'Φόροι εισοδήματος', value:-0.025264},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών', lado:'revenue', importe:2.177347, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.05716, officialTotalExpenses:2.741153, officialPAT:0.28758,
  },
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'volosnfc-gr-volos-income-stmt-2022-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.007586, tax:-0.027855,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000099},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.007685},
      {label:'Φόροι εισοδήματος', value:-0.027855},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών', lado:'revenue', importe:3.574025, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.205181, officialTotalExpenses:4.084616, officialPAT:0.085124,
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
  'volosnfc-gr-volos-income-stmt-2020-06-30': {
    id:'volosnfc-gr-volos-income-stmt-2020-06-30', clubId:'volosnfc-gr',
    title:'Volos N.P.S. P.A.E. — Volos_income_stmt_2020-06-30 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'volosnfc-gr-volos-income-stmt-2021-06-30': {
    id:'volosnfc-gr-volos-income-stmt-2021-06-30', clubId:'volosnfc-gr',
    title:'Volos N.P.S. P.A.E. — Volos_income_stmt_2021-06-30 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'volosnfc-gr-volos-income-stmt-2022-06-30': {
    id:'volosnfc-gr-volos-income-stmt-2022-06-30', clubId:'volosnfc-gr',
    title:'Volos N.P.S. P.A.E. — Volos_income_stmt_2022-06-30 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['volosnfc-gr'] = null;
