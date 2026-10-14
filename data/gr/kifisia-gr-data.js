const kifisiagrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:3.012039, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:1.807637, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.011132, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Έσοδα εισιτηρίων', normalizedCategory:'matchday_competition', amountNative:0.017152, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφήμιση', normalizedCategory:'sponsorship_commercial', amountNative:0.513533, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:0.04, disclosureLevel:'aggregated' },
    { rawLabel:'Εμπορικές δραστηριότητες', normalizedCategory:'sponsorship_commercial', amountNative:0.001904, disclosureLevel:'aggregated' },
    { rawLabel:'Επίδομα μηχανισμού αλληλεγγύης και χρηματικά έπαθλα UEFA', normalizedCategory:'competition_bonus', amountNative:0.3608, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση', normalizedCategory:'other_income', amountNative:0.244238, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:0.002643, disclosureLevel:'aggregated' },
    { rawLabel:'λοιπά έσοδα /έξοδα μεταγραφών', normalizedCategory:'player_sales', amountNative:0.06, disclosureLevel:'aggregated' },
  ],
};
const kifisiagrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Αγορές εμπορευμάτων και υλικών', normalizedCategory:'other_expenses', amountNative:-0.001353, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές σε εργαζόμενους', normalizedCategory:'wages_squad', amountNative:-0.757094, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'depreciation', amountNative:-0.02716, disclosureLevel:'aggregated' },
    { rawLabel:'ΑΜΟΙΒΕΣ ΚΑΙ ΕΞΟΔΑ ΤΡΙΤΩΝ', normalizedCategory:'admin_general_expense', amountNative:-0.496597, disclosureLevel:'aggregated' },
    { rawLabel:'ΠΑΡΟΧΕΣ ΤΡΙΤΩΝ', normalizedCategory:'admin_general_expense', amountNative:-2.115419, disclosureLevel:'aggregated' },
    { rawLabel:'ΦΟΡΟΙ - ΤΕΛΗ', normalizedCategory:'admin_general_expense', amountNative:-0.076914, disclosureLevel:'aggregated' },
    { rawLabel:'ΔΙΑΦΟΡΑ ΕΞΟΔΑ', normalizedCategory:'other_expenses', amountNative:-0.550423, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Κόστος πωλήσεων /υλικών', normalizedCategory:'other_expenses', amountNative:-0.006609, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές έμμισθου προσωπικού (μικτά ποσά)', normalizedCategory:'wages_squad', amountNative:-0.801916, disclosureLevel:'aggregated' },
    { rawLabel:'Κοινωνικές επιβαρύνσεις (εργοδοτικές εισφορές)', normalizedCategory:'wages_squad', amountNative:-0.125079, disclosureLevel:'aggregated' },
    { rawLabel:'Παρεπόμενες παροχές', normalizedCategory:'wages_squad', amountNative:-0.03, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση και απομείωση ενσώματων παγίων στοιχείων ενεργητικού', normalizedCategory:'depreciation', amountNative:-0.040201, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση και απομείωση λοιπών άυλων στοιχείων (εξαιρουμένων ποδοσφαιριστών)', normalizedCategory:'other_amortisation', amountNative:-0.004018, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έξοδα', normalizedCategory:'other_expenses', amountNative:-1.20541, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση εγγραφών παικτών και απομείωση εγγραφών παικτών', normalizedCategory:'player_amortisation', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const kifisiagrFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'kifisia-gr-notes-2024-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000949, tax:-0.013655,
    extraRows: [
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.000949},
      {label:'Φόροι εισοδήματος', value:-0.013655},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:3.012039, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.830808, officialTotalExpenses:4.024961, officialPAT:0.791242,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'kifisia-gr-notes-2025-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.001116, tax:-0.001,
    extraRows: [
      {label:'Χρηματοοικονομικά έσοδα / (έξοδα)', value:-0.001116},
      {label:'Φορολογικά έσοδα / (δαπάνες)', value:-0.001},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.240271, officialTotalExpenses:2.213233, officialPAT:-0.975079,
  },
};
const kifisiagrPresupuestoOverlayByYear = {};

const kifisiagrPasesData = [];
const kifisiagrResultadosData = {};
const kifisiagrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['kifisia-gr'] = {
  revenueLinesByYear: kifisiagrRevenueLinesByYear, expenseLinesByYear: kifisiagrExpenseLinesByYear,
  fiscalYearMeta: kifisiagrFiscalYearMeta, pasesData: kifisiagrPasesData,
  resultadosData: kifisiagrResultadosData, titulosData: kifisiagrTitulosData,
  presupuestoOverlayByYear: kifisiagrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'kifisia-gr-notes-2024-06-30': {
    id:'kifisia-gr-notes-2024-06-30', clubId:'kifisia-gr',
    title:'Kifisia - Athlitiki Enosis P.A.E. — Kifisia_notes_2024-06-30 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'kifisia-gr-notes-2025-06-30': {
    id:'kifisia-gr-notes-2025-06-30', clubId:'kifisia-gr',
    title:'Kifisia - Athlitiki Enosis P.A.E. — Kifisia_notes_2025-06-30 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['kifisia-gr'] = null;
