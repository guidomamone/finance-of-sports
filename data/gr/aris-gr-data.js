const arisgrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:3.871541, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη και ζημίες από διάθεση μη κυκλοφορούντων στοιχείων (Πωλήσεις Ποδοσφαιριστών)', normalizedCategory:'player_sales', amountNative:0.3, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.071671, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:6.86235, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη και ζημιές από διάθεση μη κυκλοφορούντων στοιχείων (Πωλήσεις Ποδοσφαιριστών)', normalizedCategory:'player_sales', amountNative:1.07127, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.682348, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Έσοδα από εισιτήρια', normalizedCategory:'matchday_competition', amountNative:1.742726, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα χορηγιών και διαφημίσεων', normalizedCategory:'sponsorship_commercial', amountNative:2.420877, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα δικαιωμάτων μεταδόσεων', normalizedCategory:'broadcasting', amountNative:3.2, disclosureLevel:'aggregated' },
    { rawLabel:'Εμπορικά έσοδα', normalizedCategory:'sponsorship_commercial', amountNative:1.224047, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από UEFA αλληλεγγύη και χρηματικά έπαθλα', normalizedCategory:'competition_bonus', amountNative:1.167326, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:2.970337, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδος από την διάθεση άυλων περιουσιακών στοιχείων (εγγραφές παικτών)', normalizedCategory:'player_sales', amountNative:2.466, disclosureLevel:'aggregated' },
  ],
};
const arisgrExpenseLinesByYear = {
  2019: [
    { rawLabel:'Κόστος πωλήσεων (Έξοδα ποδοσφαιρικού τμήματος)', normalizedCategory:'lump_football_operations_expense', amountNative:-4.001248, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.309839, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.07626, disclosureLevel:'aggregated' },
    { rawLabel:'Φορολογικά πρόστιμα και προσαυξήσεις', normalizedCategory:'other_expenses', amountNative:-0.032558, disclosureLevel:'aggregated' },
    { rawLabel:'Προσαυξήσεις εισφορών ασφαλιστικών εισφορών', normalizedCategory:'other_expenses', amountNative:-0.009993, disclosureLevel:'aggregated' },
    { rawLabel:'Φορολογικά πρόστιμα και προσαυξήσεις προηγούμενων χρήσεων', normalizedCategory:'other_expenses', amountNative:-0.002081, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Κόστος πωλήσεων (Έξοδα ποδοσφαιρικού τμήματος)', normalizedCategory:'lump_football_operations_expense', amountNative:-6.267535, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.485331, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.119454, disclosureLevel:'aggregated' },
    { rawLabel:'Φορολογικά πρόστιμα και προσαυξήσεις', normalizedCategory:'other_expenses', amountNative:-0.077241, disclosureLevel:'aggregated' },
    { rawLabel:'Έκτακτα και ανόργανα έξοδα', normalizedCategory:'exceptional_items', amountNative:-1.271669, disclosureLevel:'aggregated' },
    { rawLabel:'Προβλέψεις για έκτακτους κινδύνους', normalizedCategory:'other_amortisation', amountNative:-1.386906, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Κόστος πωλήσεων / υλικών / μη διανεμηθέντα', normalizedCategory:'other_expenses', amountNative:-0.262718, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές ποδοσφαιρικού', normalizedCategory:'wages_squad', amountNative:-8.416861, disclosureLevel:'aggregated' },
    { rawLabel:'Εισφορές ποδοσφαιρικού', normalizedCategory:'wages_squad', amountNative:-0.180345, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπές παροχές ποδοσφαιρικού', normalizedCategory:'wages_squad', amountNative:-0.023528, disclosureLevel:'aggregated' },
    { rawLabel:'Αμοιβές προσωπικού', normalizedCategory:'admin_general_expense', amountNative:-0.078922, disclosureLevel:'aggregated' },
    { rawLabel:'Εισφορές & λοιπές παροχές προσωπικού', normalizedCategory:'admin_general_expense', amountNative:-0.127303, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση πάγιων ενσώματων στοιχείων του ενεργητικού', normalizedCategory:'depreciation', amountNative:-0.210141, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση λοιπών άυλων στοιχείων του ενεργητικού (εξαιρούνται οι εγγραφές ποδοσφαιριστών)', normalizedCategory:'other_amortisation', amountNative:-0.012, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα τέλεσης αγώνων', normalizedCategory:'match_organisation_expense', amountNative:-0.53, disclosureLevel:'aggregated' },
    { rawLabel:'Κόστη χορηγιών και διαφημίσεων', normalizedCategory:'admin_general_expense', amountNative:-0.453405, disclosureLevel:'aggregated' },
    { rawLabel:'Εμπορικές δαπάνες', normalizedCategory:'admin_general_expense', amountNative:-0.535728, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα εγκαταστάσεων', normalizedCategory:'admin_general_expense', amountNative:-0.736294, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα ποδοσφαιρικού & Λοιπά λειτουργικά Έξοδα (ταξίδια, ποσοστά Ε.Π.Ο. επί συμβολαίων, παράβολα, λοιπά λειτουργικά, κλπ)', normalizedCategory:'other_expenses', amountNative:-1.39867, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά Λειτουργικά Έξοδα & Προβλέψεις για έκτακτα και ανόργανα έξοδα', normalizedCategory:'other_expenses', amountNative:-1.849292, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση άυλων περιουσιακών στοιχείων (εγγραφές παικτών)', normalizedCategory:'player_amortisation', amountNative:-1.641821, disclosureLevel:'aggregated' },
  ],
};
const arisgrFiscalYearMeta = {
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'aris-gr-fs-notes-elp-2019-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.028381, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.028381},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:3.871541, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων (Έξοδα ποδοσφαιρικού τμήματος)', lado:'expense', importe:4.001248, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.243212, officialTotalExpenses:4.431979, officialPAT:-0.217148,
  },
  2021: {
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'aris-gr-fs-notes-elp-2021-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.018853, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000169},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.019022},
      {label:'Φόροι εισοδήματος', value:null},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:6.86235, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων (Έξοδα ποδοσφαιρικού τμήματος)', lado:'expense', importe:6.267535, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:8.615968, officialTotalExpenses:8.336467, officialPAT:-1.01102,
  },
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'aris-gr-fs-2023-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.241882, tax:0,
    extraRows: [
      {label:'Χρηματοοικονομικά έξοδα/δαπάνες', value:-0.241873},
      {label:'Καθαρές Συναλλαγματικές Διαφορές Κέρδη/(Ζημίες)', value:-0.000009},
      {label:'Φορολογικά έσοδα (δαπάνες)', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:15.191313, officialTotalExpenses:16.457028, officialPAT:-1.507598,
  },
};
const arisgrPresupuestoOverlayByYear = {};

const arisgrPasesData = [];
const arisgrResultadosData = {};
const arisgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['aris-gr'] = {
  revenueLinesByYear: arisgrRevenueLinesByYear, expenseLinesByYear: arisgrExpenseLinesByYear,
  fiscalYearMeta: arisgrFiscalYearMeta, pasesData: arisgrPasesData,
  resultadosData: arisgrResultadosData, titulosData: arisgrTitulosData,
  presupuestoOverlayByYear: arisgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'aris-gr-fs-notes-elp-2019-06-30': {
    id:'aris-gr-fs-notes-elp-2019-06-30', clubId:'aris-gr',
    title:'Athlitikos Syllogos Thessalonikis O Aris P.A.E. — Aris_FS_notes_ELP_2019-06-30 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'aris-gr-fs-notes-elp-2021-06-30': {
    id:'aris-gr-fs-notes-elp-2021-06-30', clubId:'aris-gr',
    title:'Athlitikos Syllogos Thessalonikis O Aris P.A.E. — Aris_FS_notes_ELP_2021-06-30 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'aris-gr-fs-2023-06-30': {
    id:'aris-gr-fs-2023-06-30', clubId:'aris-gr',
    title:'Athlitikos Syllogos Thessalonikis O Aris P.A.E. — Aris_FS_2023-06-30 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['aris-gr'] = null;
