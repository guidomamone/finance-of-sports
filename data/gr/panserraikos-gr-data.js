const panserraikosgrRevenueLinesByYear = {
  2023: [
    { rawLabel:'Έσοδα από εισιτήρια', normalizedCategory:'matchday_competition', amountNative:0.173084, disclosureLevel:'aggregated' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:0.387016, disclosureLevel:'aggregated' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:0.077492, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:0.043795, disclosureLevel:'aggregated' },
    { rawLabel:'Αποζημίωση ειδικού σκοπού COVID', normalizedCategory:'other_income', amountNative:0.005336, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη/ζημίες από τη διάθεση (μετεγγραφών) και αποχώρηση ποδοσφαιριστών', normalizedCategory:'player_sales', amountNative:0.186319, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα/έξοδα μετεγγραφών', normalizedCategory:'player_sales', amountNative:0.1, disclosureLevel:'aggregated' },
  ],
};
const panserraikosgrExpenseLinesByYear = {
  2023: [
    { rawLabel:'Δαπάνη παροχών προς εργαζομένους (ποδοσφαιριστών και λοιπών εργαζομένων )', normalizedCategory:'wages_squad', amountNative:-0.514544, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση και απομείωση ενσωματών παγίων στοιχείων ενεργητικού', normalizedCategory:'depreciation', amountNative:-0.002435, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα λειτουργικά έξοδα', normalizedCategory:'other_expenses', amountNative:-0.495685, disclosureLevel:'aggregated' },
    { rawLabel:'Απόσβεση εγγραφών ποδοσφαιριστών και απομείωση εγγραφών ποδοσφαιριστών', normalizedCategory:'player_amortisation', amountNative:-0.63656, disclosureLevel:'aggregated' },
    { rawLabel:'Μη λειτουργικά έσοδα / έξοδα', normalizedCategory:'other_expenses', amountNative:-0.102569, disclosureLevel:'aggregated' },
  ],
};
const panserraikosgrFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'panserraikos-gr-income-stmt-2023-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.00318, tax:0,
    extraRows: [
      {label:'Χρηματοοικονομικά έσοδα και έξοδα', value:-0.00318},
      {label:'Φορολογικά έσοδα / δαπάνες', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.973043, officialTotalExpenses:1.751793, officialPAT:-0.78193,
  },
};
const panserraikosgrPresupuestoOverlayByYear = {};

const panserraikosgrPasesData = [];
const panserraikosgrResultadosData = {};
const panserraikosgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['panserraikos-gr'] = {
  revenueLinesByYear: panserraikosgrRevenueLinesByYear, expenseLinesByYear: panserraikosgrExpenseLinesByYear,
  fiscalYearMeta: panserraikosgrFiscalYearMeta, pasesData: panserraikosgrPasesData,
  resultadosData: panserraikosgrResultadosData, titulosData: panserraikosgrTitulosData,
  presupuestoOverlayByYear: panserraikosgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'panserraikos-gr-income-stmt-2023-06-30': {
    id:'panserraikos-gr-income-stmt-2023-06-30', clubId:'panserraikos-gr',
    title:'Mousikogymnastikos Syllogos Panserraikos P.A.E. — Panserraikos_income_stmt_2023-06-30 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['panserraikos-gr'] = null;
