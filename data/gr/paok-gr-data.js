const paokgrRevenueLinesByYear = {
  2017: [
    { rawLabel:'Έσοδα από εισιτήρια-συνδρομές', normalizedCategory:'matchday_competition', amountNative:3.606321, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από τηλεοπτικά δικαιώματα', normalizedCategory:'broadcasting', amountNative:2.286571, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από παραχωρήσεις ποδοσφαιριστών', normalizedCategory:'player_sales', amountNative:6.203, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από επιχορηγήσεις', normalizedCategory:'other_income', amountNative:7.696539, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από χορηγίες-διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:5.007688, disclosureLevel:'aggregated' },
    { rawLabel:'Ενοίκια Έσοδα', normalizedCategory:'other_income', amountNative:0.166959, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά Έσοδα πάροχης Υπηρεσιών', normalizedCategory:'other_income', amountNative:0.028102, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων', normalizedCategory:'other_income', amountNative:6.040966, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έκτακτα έσοδα', normalizedCategory:'other_income', amountNative:0.376465, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα προηγούμενων χρήσεων', normalizedCategory:'other_income', amountNative:0.001158, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από αναστροφή προβλέψεων', normalizedCategory:'other_income', amountNative:0.12, disclosureLevel:'aggregated' },
  ],
};
const paokgrExpenseLinesByYear = {
  2017: [
    { rawLabel:'Αμοιβές προσωπικού', normalizedCategory:'wages_squad', amountNative:-2.978032, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'wages_squad', amountNative:-17.780205, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.841465, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι-Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.180134, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-3.245942, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'player_amortisation', amountNative:-3.329712, disclosureLevel:'aggregated' },
    { rawLabel:'Αγορές Αναλωσίμων', normalizedCategory:'other_expenses', amountNative:-0.757996, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές προσωπικού', normalizedCategory:'wages_squad', amountNative:-1.358423, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'wages_squad', amountNative:-0.60892, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.348409, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι-Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.309907, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-0.987638, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'player_amortisation', amountNative:-0.210917, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπές Προβλέψεις', normalizedCategory:'other_amortisation', amountNative:-0.119776, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές προσωπικού', normalizedCategory:'wages_squad', amountNative:-0.684527, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'wages_squad', amountNative:-0.119882, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.0931, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι-Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.118499, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-1.333431, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'player_amortisation', amountNative:-0.028145, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπές Προβλέψεις', normalizedCategory:'other_amortisation', amountNative:-0.037444, disclosureLevel:'aggregated' },
    { rawLabel:'Πρόστιμα αθλητικών φορέων', normalizedCategory:'other_expenses', amountNative:-0.810432, disclosureLevel:'aggregated' },
    { rawLabel:'Φορολογικά Πρόστιμα & προσαυξήσεις', normalizedCategory:'other_expenses', amountNative:-0.03146, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έκτακτα έξοδα', normalizedCategory:'exceptional_items', amountNative:-0.354914, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα προηγ.Χρήσεων', normalizedCategory:'exceptional_items', amountNative:-0.057285, disclosureLevel:'aggregated' },
  ],
};
const paokgrFiscalYearMeta = {
  2017: {
    currency:'EUR', fxRef:'EUR@2017-06-30',
    sourceId:'paok-gr-fs-2016-17',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.153251, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.020157},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.173408},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:31.533771, officialTotalExpenses:36.314396, officialPAT:-5.346075,
  },
};
const paokgrPresupuestoOverlayByYear = {};

const paokgrPasesData = [];
const paokgrResultadosData = {};
const paokgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['paok-gr'] = {
  revenueLinesByYear: paokgrRevenueLinesByYear, expenseLinesByYear: paokgrExpenseLinesByYear,
  fiscalYearMeta: paokgrFiscalYearMeta, pasesData: paokgrPasesData,
  resultadosData: paokgrResultadosData, titulosData: paokgrTitulosData,
  presupuestoOverlayByYear: paokgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'paok-gr-fs-2016-17': {
    id:'paok-gr-fs-2016-17', clubId:'paok-gr',
    title:'Panthessalonikeios Athlitikos Omilos Konstantinoupoliton P.A.E. — PAOK_FS_2016-17 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['paok-gr'] = null;
