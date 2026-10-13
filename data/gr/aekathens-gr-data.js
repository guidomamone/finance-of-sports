const aekathensgrRevenueLinesByYear = {
  2016: [
    { rawLabel:'Έσοδα εισιτηρίων εγχώριων διοργανώσεων', normalizedCategory:'matchday_competition', amountNative:1.433204, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από πωλήσεις εισιτηρίων διαρκείας', normalizedCategory:'season_tickets', amountNative:1.310568, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:3.249289, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:1.733019, disclosureLevel:'aggregated' },
    { rawLabel:'Αλληλεγγύη UEFA και χρηματικά έπαθλα', normalizedCategory:'competition_bonus', amountNative:0.34697, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:1.99825, disclosureLevel:'aggregated' },
  ],
  2017: [
    { rawLabel:'Έσοδα εισιτηρίων εγχώριων διοργανώσεων', normalizedCategory:'matchday_competition', amountNative:1.624053, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από πωλήσεις εισιτηρίων διαρκείας', normalizedCategory:'season_tickets', amountNative:0.946397, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:4.429282, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:3.57, disclosureLevel:'aggregated' },
    { rawLabel:'Αλληλεγγύη UEFA και χρηματικά έπαθλα', normalizedCategory:'competition_bonus', amountNative:0.505, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:2.509757, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Έσοδα εισιτηρίων εγχώριων διοργανώσεων', normalizedCategory:'matchday_competition', amountNative:3.16156, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από πωλήσεις εισιτηρίων διαρκείας', normalizedCategory:'season_tickets', amountNative:1.120048, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:5.547441, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:2.558038, disclosureLevel:'aggregated' },
    { rawLabel:'Εμπορικά', normalizedCategory:'sponsorship_commercial', amountNative:0.013405, disclosureLevel:'aggregated' },
    { rawLabel:'Αλληλεγγύη UEFA και χρηματικά έπαθλα', normalizedCategory:'competition_bonus', amountNative:9.021521, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:2.722672, disclosureLevel:'aggregated' },
  ],
};
const aekathensgrExpenseLinesByYear = {
  2016: [
    { rawLabel:'Ανάλωση αθλητικού υλικού', normalizedCategory:'other_expenses', amountNative:-0.247042, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα φαρμακείου αθλητών', normalizedCategory:'other_expenses', amountNative:-0.0359, disclosureLevel:'aggregated' },
    { rawLabel:'Μισθοδοσία', normalizedCategory:'wages_squad', amountNative:-4.184563, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις συμβολαίων ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-4.023216, disclosureLevel:'aggregated' },
    { rawLabel:'Απομείωση και απόσβεση', normalizedCategory:'player_amortisation', amountNative:-0.1659, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις πάγιων περιουσιακών στοιχείων', normalizedCategory:'depreciation', amountNative:-0.11158, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις λοιπών άυλων περιουσιακών στοιχείων', normalizedCategory:'other_amortisation', amountNative:-0.009478, disclosureLevel:'aggregated' },
    { rawLabel:'Μισθώματα', normalizedCategory:'other_expenses', amountNative:-0.758882, disclosureLevel:'aggregated' },
    { rawLabel:'Τηλεφωνικά - Ταχυδρομικά', normalizedCategory:'admin_general_expense', amountNative:-0.108147, disclosureLevel:'aggregated' },
    { rawLabel:'Ασφάλιστρα', normalizedCategory:'admin_general_expense', amountNative:-0.056481, disclosureLevel:'aggregated' },
    { rawLabel:'Επισκευές και συντηρήσεις', normalizedCategory:'admin_general_expense', amountNative:-0.041066, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα μετακινήσεων', normalizedCategory:'match_organisation_expense', amountNative:-0.471878, disclosureLevel:'aggregated' },
    { rawLabel:'Διαφημίσεις και εκδηλώσεις', normalizedCategory:'admin_general_expense', amountNative:-0.344256, disclosureLevel:'aggregated' },
    { rawLabel:'Συνδρομές', normalizedCategory:'admin_general_expense', amountNative:-0.005483, disclosureLevel:'aggregated' },
    { rawLabel:'Δωρεές', normalizedCategory:'other_expenses', amountNative:-0.002, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα δημοσιεύσεων', normalizedCategory:'admin_general_expense', amountNative:-0.014789, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι - Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.18308, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-1.633842, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα αγώνων', normalizedCategory:'match_organisation_expense', amountNative:-0.525103, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έξοδα', normalizedCategory:'other_expenses', amountNative:-1.305961, disclosureLevel:'aggregated' },
  ],
  2017: [
    { rawLabel:'Ανάλυση αθλητικού υλικού', normalizedCategory:'other_expenses', amountNative:-0.009173, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα φαρμακείου αθλητών', normalizedCategory:'other_expenses', amountNative:-0.021445, disclosureLevel:'aggregated' },
    { rawLabel:'Μισθοδοσία', normalizedCategory:'wages_squad', amountNative:-4.654981, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις συμβολαίων ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-4.618873, disclosureLevel:'aggregated' },
    { rawLabel:'Απομείωση και απόσβεση', normalizedCategory:'player_amortisation', amountNative:-0.618686, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις πάγιων περιουσιακών στοιχείων', normalizedCategory:'depreciation', amountNative:-0.154383, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις λοιπών άυλων περιουσιακών στοιχείων', normalizedCategory:'other_amortisation', amountNative:-0.009451, disclosureLevel:'aggregated' },
    { rawLabel:'Μισθώματα', normalizedCategory:'other_expenses', amountNative:-0.709355, disclosureLevel:'aggregated' },
    { rawLabel:'Τηλεφωνικά - Ταχυδρομικά', normalizedCategory:'admin_general_expense', amountNative:-0.092914, disclosureLevel:'aggregated' },
    { rawLabel:'Ασφάλιστρα', normalizedCategory:'admin_general_expense', amountNative:-0.067758, disclosureLevel:'aggregated' },
    { rawLabel:'Επισκευές και συντηρήσεις', normalizedCategory:'admin_general_expense', amountNative:-0.125189, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα μετακινήσεων', normalizedCategory:'match_organisation_expense', amountNative:-0.865053, disclosureLevel:'aggregated' },
    { rawLabel:'Διαφημίσεις και εκδηλώσεις', normalizedCategory:'admin_general_expense', amountNative:-0.343806, disclosureLevel:'aggregated' },
    { rawLabel:'Συνδρομές', normalizedCategory:'admin_general_expense', amountNative:-0.00412, disclosureLevel:'aggregated' },
    { rawLabel:'Δωρεές', normalizedCategory:'other_expenses', amountNative:-0.0145, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα δημοσιεύσεων', normalizedCategory:'admin_general_expense', amountNative:-0.014363, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι - Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.09727, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-1.514175, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα αγώνων', normalizedCategory:'match_organisation_expense', amountNative:-0.280463, disclosureLevel:'aggregated' },
    { rawLabel:'Προβλέψεις επισφαλειών', normalizedCategory:'other_amortisation', amountNative:-0.237005, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έξοδα', normalizedCategory:'other_expenses', amountNative:-2.77285, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Ανάλυση αθλητικού υλικού', normalizedCategory:'other_expenses', amountNative:-0.092073, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα φαρμακείου αθλητών', normalizedCategory:'other_expenses', amountNative:-0.047105, disclosureLevel:'aggregated' },
    { rawLabel:'Μισθοδοσία', normalizedCategory:'wages_squad', amountNative:-6.48456, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις συμβολαίων ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-6.166567, disclosureLevel:'aggregated' },
    { rawLabel:'Απομείωση και απόσβεση', normalizedCategory:'player_amortisation', amountNative:-1.147411, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις πάγιων περιουσιακών στοιχείων', normalizedCategory:'depreciation', amountNative:-0.16782, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις λοιπών άυλων περιουσιακών στοιχείων', normalizedCategory:'other_amortisation', amountNative:-0.009451, disclosureLevel:'aggregated' },
    { rawLabel:'Μισθώματα', normalizedCategory:'other_expenses', amountNative:-0.805435, disclosureLevel:'aggregated' },
    { rawLabel:'Τηλεφωνικά - Ταχυδρομικά', normalizedCategory:'admin_general_expense', amountNative:-0.09827, disclosureLevel:'aggregated' },
    { rawLabel:'Ασφάλιστρα', normalizedCategory:'admin_general_expense', amountNative:-0.05564, disclosureLevel:'aggregated' },
    { rawLabel:'Επισκευές και συντηρήσεις', normalizedCategory:'admin_general_expense', amountNative:-0.039303, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα μετακινήσεων', normalizedCategory:'match_organisation_expense', amountNative:-0.893568, disclosureLevel:'aggregated' },
    { rawLabel:'Διαφημίσεις και εκδηλώσεις', normalizedCategory:'admin_general_expense', amountNative:-0.192323, disclosureLevel:'aggregated' },
    { rawLabel:'Συνδρομές', normalizedCategory:'admin_general_expense', amountNative:-0.009582, disclosureLevel:'aggregated' },
    { rawLabel:'Δωρεές', normalizedCategory:'other_expenses', amountNative:-0.119345, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα δημοσιεύσεων', normalizedCategory:'admin_general_expense', amountNative:-0.009731, disclosureLevel:'aggregated' },
    { rawLabel:'Φόροι - Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.266988, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-1.791327, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα αγώνων', normalizedCategory:'match_organisation_expense', amountNative:-0.723027, disclosureLevel:'aggregated' },
    { rawLabel:'Προβλέψεις επισφαλειών', normalizedCategory:'other_amortisation', amountNative:-0.319785, disclosureLevel:'aggregated' },
    { rawLabel:'Ζημιές από εκποίηση παγίων', normalizedCategory:'exceptional_items', amountNative:-0.001342, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έξοδα', normalizedCategory:'other_expenses', amountNative:-3.360533, disclosureLevel:'aggregated' },
  ],
};
const aekathensgrFiscalYearMeta = {
  2016: {
    currency:'EUR', fxRef:'EUR@2016-06-30',
    sourceId:'aekathens-gr-aek-oikonomikes-katastaseis',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.039777, tax:0,
    extraRows: [
      {label:'Χρηματοοικονομικά Έξοδα', value:-0.039777},
      {label:'Χρηματοοικονομικά Έσοδα', value:0},
      {label:'Φόρος εισοδήματος', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:10.0713, officialTotalExpenses:14.228647, officialPAT:-4.197125,
  },
  2017: {
    currency:'EUR', fxRef:'EUR@2017-06-30',
    sourceId:'aekathens-gr-aek-fs-2016-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.107864, tax:-0.308649,
    extraRows: [
      {label:'Χρηματοοικονομικά Έξοδα', value:-0.107864},
      {label:'Φόρος εισοδήματος', value:0},
      {label:'Αναβαλλόμενος Φόρος', value:-0.308649},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:13.584488, officialTotalExpenses:17.225812, officialPAT:-4.057837,
  },
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'aekathens-gr-aek-notes-2018-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.083685, tax:0.335886,
    extraRows: [
      {label:'Χρηματοοικονομικά Έξοδα', value:-0.083685},
      {label:'Φόρος εισοδήματος', value:0},
      {label:'Αναβαλλόμενος Φόρος', value:0.335886},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:24.144686, officialTotalExpenses:22.801188, officialPAT:1.5957,
  },
};
const aekathensgrPresupuestoOverlayByYear = {};

const aekathensgrPasesData = [];
const aekathensgrResultadosData = {};
const aekathensgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['aekathens-gr'] = {
  revenueLinesByYear: aekathensgrRevenueLinesByYear, expenseLinesByYear: aekathensgrExpenseLinesByYear,
  fiscalYearMeta: aekathensgrFiscalYearMeta, pasesData: aekathensgrPasesData,
  resultadosData: aekathensgrResultadosData, titulosData: aekathensgrTitulosData,
  presupuestoOverlayByYear: aekathensgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'aekathens-gr-aek-oikonomikes-katastaseis': {
    id:'aekathens-gr-aek-oikonomikes-katastaseis', clubId:'aekathens-gr',
    title:'Athlitiki Enosis Konstantinoupoleos P.A.E. — AEK_oikonomikes_katastaseis (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'aekathens-gr-aek-fs-2016-2017': {
    id:'aekathens-gr-aek-fs-2016-2017', clubId:'aekathens-gr',
    title:'Athlitiki Enosis Konstantinoupoleos P.A.E. — AEK_FS_2016-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'aekathens-gr-aek-notes-2018-06-30': {
    id:'aekathens-gr-aek-notes-2018-06-30', clubId:'aekathens-gr',
    title:'Athlitiki Enosis Konstantinoupoleos P.A.E. — AEK_Notes_2018-06-30 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['aekathens-gr'] = null;
