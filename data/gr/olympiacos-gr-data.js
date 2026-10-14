const olympiacosgrRevenueLinesByYear = {
  2016: [
    { rawLabel:'Έσοδα από εισιτήρια', normalizedCategory:'matchday_competition', amountNative:6.387526, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:10.754917, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:6.441874, disclosureLevel:'aggregated' },
    { rawLabel:'Εμπορικά', normalizedCategory:'sponsorship_commercial', amountNative:0.91862, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από UEFA', normalizedCategory:'competition_bonus', amountNative:34.003783, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:0.499933, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από πωλήσεις ποδοσφαιριστών', normalizedCategory:'player_sales', amountNative:13.868, disclosureLevel:'aggregated' },
  ],
};
const olympiacosgrExpenseLinesByYear = {
  2016: [
    { rawLabel:'Μισθοί και δόσεις συμβολαίων', normalizedCategory:'wages_squad', amountNative:-22.910779, disclosureLevel:'aggregated' },
    { rawLabel:'Εισφορές κοινωνικής ασφάλισης', normalizedCategory:'wages_squad', amountNative:-0.11341, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπές παροχές', normalizedCategory:'wages_squad', amountNative:-5.71788, disclosureLevel:'aggregated' },
    { rawLabel:'Ημερομίσθια και μισθοί', normalizedCategory:'admin_general_expense', amountNative:-7.459767, disclosureLevel:'aggregated' },
    { rawLabel:'Εισφορές κοινωνικής ασφάλισης', normalizedCategory:'wages_squad', amountNative:-1.067857, disclosureLevel:'aggregated' },
    { rawLabel:'Πρόβλεψη αποζημίωσης προσωπικού', normalizedCategory:'admin_general_expense', amountNative:-0.106303, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση ενσώματων περιουσιακών στοιχείων', normalizedCategory:'depreciation', amountNative:-0.316771, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση λοιπών ασώματων περιουσιακών στοιχείων (εξαιρούνται οι εγγραφές ποδοσφαιριστών)', normalizedCategory:'other_amortisation', amountNative:-0.004244, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση δικαιωμάτων ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-10.097539, disclosureLevel:'aggregated' },
    { rawLabel:'Απομείωση δικαιωμάτων ποδοσφαιριστών', normalizedCategory:'player_impairment', amountNative:-0.219129, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα αγώνων', normalizedCategory:'match_organisation_expense', amountNative:-2.345941, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα χορηγιών και διαφημίσεων', normalizedCategory:'admin_general_expense', amountNative:-3.930768, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα ακινήτων & εγκαταστάσεων', normalizedCategory:'admin_general_expense', amountNative:-5.798469, disclosureLevel:'aggregated' },
    { rawLabel:'Έκτακτα Έξοδα', normalizedCategory:'exceptional_items', amountNative:-0.345721, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα ποδοσφαιρικού τμήματος', normalizedCategory:'lump_football_operations_expense', amountNative:-2.160603, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έξοδα', normalizedCategory:'other_expenses', amountNative:-11.25484, disclosureLevel:'aggregated' },
    { rawLabel:'Αναπόσβεστο κόστος ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-4.350212, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά άμεσα κόστη μετεγγραφής ποδοσφαιριστών', normalizedCategory:'other_expenses', amountNative:-1.585, disclosureLevel:'aggregated' },
  ],
};
const olympiacosgrFiscalYearMeta = {
  2016: {
    currency:'EUR', fxRef:'EUR@2016-06-30',
    sourceId:'olympiacos-gr-pae-olympiacos-chrimatooikonomikes-katastaseis-2016-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.479915, tax:-2.238583,
    extraRows: [
      {label:'Χρηματοοικονομικά έσοδα', value:1.189249},
      {label:'Χρηματοοικονομικά έξοδα', value:-0.709334},
      {label:'Φόρος εισοδήματος', value:-2.238583},
    ],
    sinDesglose: [
      {renglon:'Έξοδα ποδοσφαιρικού τμήματος', lado:'expense', importe:2.160603, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:72.874652, officialTotalExpenses:79.439512, officialPAT:-8.669249,
  },
};
const olympiacosgrPresupuestoOverlayByYear = {};

const olympiacosgrPasesData = [];
const olympiacosgrResultadosData = {};
const olympiacosgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['olympiacos-gr'] = {
  revenueLinesByYear: olympiacosgrRevenueLinesByYear, expenseLinesByYear: olympiacosgrExpenseLinesByYear,
  fiscalYearMeta: olympiacosgrFiscalYearMeta, pasesData: olympiacosgrPasesData,
  resultadosData: olympiacosgrResultadosData, titulosData: olympiacosgrTitulosData,
  presupuestoOverlayByYear: olympiacosgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'olympiacos-gr-pae-olympiacos-chrimatooikonomikes-katastaseis-2016-06-30': {
    id:'olympiacos-gr-pae-olympiacos-chrimatooikonomikes-katastaseis-2016-06-30', clubId:'olympiacos-gr',
    title:'Olympiakos Syndesmos Filathlon Peiraios P.A.E. — PAE_Olympiacos_Chrimatooikonomikes_katastaseis_2016-06-30 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['olympiacos-gr'] = null;
