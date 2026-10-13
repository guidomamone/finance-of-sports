const aekathensgrRevenueLinesByYear = {
  2016: [
    { rawLabel:'Έσοδα εισιτηρίων εγχώριων διοργανώσεων', normalizedCategory:'matchday_competition', amountNative:1.433204, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από πωλήσεις εισιτηρίων διαρκείας', normalizedCategory:'season_tickets', amountNative:1.310568, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:3.249289, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:1.733019, disclosureLevel:'aggregated' },
    { rawLabel:'Αλληλεγγύη UEFA και χρηματικά έπαθλα', normalizedCategory:'competition_bonus', amountNative:0.34697, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:1.99825, disclosureLevel:'aggregated' },
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
});

memberCountByClub['aekathens-gr'] = null;
