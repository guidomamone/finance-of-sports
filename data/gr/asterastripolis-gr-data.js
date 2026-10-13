const asterastripolisgrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Έσοδα αγώνων', normalizedCategory:'matchday_competition', amountNative:0.229394, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από τηλεοπτικές μεταδόσεις αγώνων', normalizedCategory:'broadcasting', amountNative:0.9, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από παραχώρηση ποδοσφαιριστών', normalizedCategory:'player_sales', amountNative:0.590284, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από πώληση λοιπών αποθεμάτων', normalizedCategory:'other_income', amountNative:0.006008, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορηγήσεις', normalizedCategory:'other_income', amountNative:0.752631, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έσοδα πωλήσεων', normalizedCategory:'other_income', amountNative:0.00079, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από παροχή υπηρεσιών σε τρίτους', normalizedCategory:'other_income', amountNative:1.008293, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:0.000099, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.051392, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Έσοδα αγώνων', normalizedCategory:'matchday_competition', amountNative:0.180624, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από τηλεοπτικές μεταδόσεις αγώνων', normalizedCategory:'broadcasting', amountNative:0.855, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από παραχώρηση ποδοσφαιριστών', normalizedCategory:'player_sales', amountNative:0.690353, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορηγήσεις', normalizedCategory:'other_income', amountNative:0.405879, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από παροχή υπηρεσιών σε τρίτους', normalizedCategory:'other_income', amountNative:1.239662, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από συνεισφορά αλληλεγγύης', normalizedCategory:'player_sales', amountNative:0.053814, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:0.000097, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά Έκτακτα και ανόργανα έσοδα', normalizedCategory:'other_income', amountNative:0.002855, disclosureLevel:'aggregated' },
  ],
};
const asterastripolisgrExpenseLinesByYear = {
  2019: [
    { rawLabel:'Αμοιβές και έξοδα προσωπικού', normalizedCategory:'wages_squad', amountNative:-2.659861, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές και έξοδα τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.30227, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.34136, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι και τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.094766, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-1.25543, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις παγίων στο λειτουργικό κόστος', normalizedCategory:'depreciation', amountNative:-0.174347, disclosureLevel:'aggregated' },
    { rawLabel:'Πρόβλεψη αποζημίωσης προσωπικού', normalizedCategory:'wages_squad', amountNative:-0.009071, disclosureLevel:'aggregated' },
    { rawLabel:'Αξία χορηγούμενων εισιτηρίων δωρεάν', normalizedCategory:'match_organisation_expense', amountNative:0.03226, disclosureLevel:'aggregated' },
    { rawLabel:'Πρόβλεψη για επισφαλείς απαιτήσεις', normalizedCategory:'other_amortisation', amountNative:-0.01, disclosureLevel:'aggregated' },
    { rawLabel:'Φορολογικά πρόστιμα και προσαυξήσεις', normalizedCategory:'other_expenses', amountNative:-0.000981, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις αποχωρησάντων ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-0.015034, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έκτακτα έξοδα', normalizedCategory:'exceptional_items', amountNative:-0.000131, disclosureLevel:'aggregated' },
    { rawLabel:'Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό)', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος)', normalizedCategory:'lump_football_operations_expense', amountNative:-3.147828, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-1.259543, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.037245, disclosureLevel:'aggregated' },
    { rawLabel:'Πρόβλεψη για επισφαλείς απαιτήσεις', normalizedCategory:'other_amortisation', amountNative:-0.031, disclosureLevel:'aggregated' },
    { rawLabel:'Φορολογικά πρόστιμα και προσαυξήσεις', normalizedCategory:'other_expenses', amountNative:-0.000007, disclosureLevel:'aggregated' },
    { rawLabel:'Προσαυξήσεις Εισφ. Ασφαλιστικών Ταμείων', normalizedCategory:'other_expenses', amountNative:-0.000844, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έκτακτα έξοδα', normalizedCategory:'exceptional_items', amountNative:-0.000025, disclosureLevel:'aggregated' },
    { rawLabel:'Απομειώσεις περιουσιακών στοιχείων (καθαρό ποσό)', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const asterastripolisgrFiscalYearMeta = {
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'asterastripolis-gr-asteras-fs-2019-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.012125, tax:0,
    extraRows: [
      {label:'Έσοδα συμμετοχών και επενδύσεων', value:0},
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.012125},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    grossDebt:0, cash:null,
    officialTotalRevenue:3.538891, officialTotalExpenses:4.830991, officialPAT:-1.305075,
  },
  2020: {
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'asterastripolis-gr-asteras-fs-2020-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.01184, tax:0,
    extraRows: [
      {label:'Έσοδα συμμετοχών και επενδύσεων', value:0},
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.01184},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κόστος πωλήσεων (Κόστος λειτουργίας ποδοσφαιρικού τμήματος)', lado:'expense', importe:3.147828, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.435971, officialTotalExpenses:4.476491, officialPAT:-1.05236,
  },
};
const asterastripolisgrPresupuestoOverlayByYear = {};

const asterastripolisgrPasesData = [];
const asterastripolisgrResultadosData = {};
const asterastripolisgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['asterastripolis-gr'] = {
  revenueLinesByYear: asterastripolisgrRevenueLinesByYear, expenseLinesByYear: asterastripolisgrExpenseLinesByYear,
  fiscalYearMeta: asterastripolisgrFiscalYearMeta, pasesData: asterastripolisgrPasesData,
  resultadosData: asterastripolisgrResultadosData, titulosData: asterastripolisgrTitulosData,
  presupuestoOverlayByYear: asterastripolisgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'asterastripolis-gr-asteras-fs-2019-06-30': {
    id:'asterastripolis-gr-asteras-fs-2019-06-30', clubId:'asterastripolis-gr',
    title:'A.G.S. Asteras Tripolis P.A.E. — Asteras_FS_2019-06-30 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'asterastripolis-gr-asteras-fs-2020-06-30': {
    id:'asterastripolis-gr-asteras-fs-2020-06-30', clubId:'asterastripolis-gr',
    title:'A.G.S. Asteras Tripolis P.A.E. — Asteras_FS_2020-06-30 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['asterastripolis-gr'] = null;
