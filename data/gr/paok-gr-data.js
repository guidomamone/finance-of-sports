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
  2019: [
    { rawLabel:'Κύκλος εργασιών', normalizedCategory:'lump_football_operations', amountNative:33.922723, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.283655, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων', normalizedCategory:'other_income', amountNative:9.992336, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:2.480573, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κύκλος εργασιών', normalizedCategory:'lump_football_operations', amountNative:17.768593, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:3.341295, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη & ζημιές από διάθεση μη κυκλοφορούντων στοιχείων', normalizedCategory:'other_income', amountNative:3.566975, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.528165, disclosureLevel:'aggregated' },
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
  2019: [
    { rawLabel:'Αμοιβές προσωπικού', normalizedCategory:'wages_squad', amountNative:-3.902159, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'wages_squad', amountNative:-27.2064, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.992365, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι-Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.188225, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-3.96633, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'player_amortisation', amountNative:-5.946594, disclosureLevel:'aggregated' },
    { rawLabel:'Αγορές Αναλωσίμων', normalizedCategory:'other_expenses', amountNative:-0.520419, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές προσωπικού', normalizedCategory:'wages_squad', amountNative:-1.447252, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'wages_squad', amountNative:-0.848495, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.393115, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι-Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.458273, disclosureLevel:'aggregated' },
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-1.44743, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'player_amortisation', amountNative:-0.244356, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπές Προβλέψεις', normalizedCategory:'other_amortisation', amountNative:-0.025219, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-2.997523, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-1.2005, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κόστος Λειτουργίας Ποδοσφαιρικού Τμήματος', normalizedCategory:'lump_football_operations_expense', amountNative:-43.188601, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-4.528406, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-2.482523, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-1.777332, disclosureLevel:'aggregated' },
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
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'paok-gr-fs-2019-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.172458, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.025076},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.197534},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών', lado:'revenue', importe:33.922723, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:46.679287, officialTotalExpenses:51.784655, officialPAT:-5.277826,
  },
  2020: {
    incluidoEn:{ player_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, player_impairment:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, wages_squad:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, depreciation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' }, other_amortisation:{ en:'lump_football_operations_expense', posible:true, por:'precedente' } },
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'paok-gr-fs-2020-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.132817, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.057784},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.190601},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών', lado:'revenue', importe:17.768593, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος Λειτουργίας Ποδοσφαιρικού Τμήματος', lado:'expense', importe:43.188601, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:25.205029, officialTotalExpenses:51.976862, officialPAT:-26.904651,
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
  'paok-gr-fs-2019-06-30': {
    id:'paok-gr-fs-2019-06-30', clubId:'paok-gr',
    title:'Panthessalonikeios Athlitikos Omilos Konstantinoupoliton P.A.E. — PAOK_FS_2019-06-30 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'paok-gr-fs-2020-06-30': {
    id:'paok-gr-fs-2020-06-30', clubId:'paok-gr',
    title:'Panthessalonikeios Athlitikos Omilos Konstantinoupoliton P.A.E. — PAOK_FS_2020-06-30 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['paok-gr'] = null;
