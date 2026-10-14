const arisgrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:3.871541, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Κέρδη και ζημίες από διάθεση μη κυκλοφορούντων στοιχείων (Πωλήσεις Ποδοσφαιριστών)', normalizedCategory:'player_sales', amountNative:0.3, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.071671, disclosureLevel:'aggregated' },
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
});

memberCountByClub['aris-gr'] = null;
