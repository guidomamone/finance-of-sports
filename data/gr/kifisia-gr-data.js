const kifisiagrRevenueLinesByYear = {
  2022: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.396935, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.0775, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.000767, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:3.012039, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:1.807637, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.011132, disclosureLevel:'aggregated' },
  ],
};
const kifisiagrExpenseLinesByYear = {
  2022: [
    { rawLabel:'Αγορές εμπορευμάτων και υλικών', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές σε εργαζόμενους', normalizedCategory:'wages_squad', amountNative:-0.418349, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'depreciation', amountNative:-0.004741, disclosureLevel:'aggregated' },
    { rawLabel:'ΑΜΟΙΒΕΣ ΚΑΙ ΕΞΟΔΑ ΤΡΙΤΩΝ', normalizedCategory:'admin_general_expense', amountNative:-0.119817, disclosureLevel:'aggregated' },
    { rawLabel:'ΠΑΡΟΧΕΣ ΤΡΙΤΩΝ', normalizedCategory:'admin_general_expense', amountNative:-0.088497, disclosureLevel:'aggregated' },
    { rawLabel:'ΦΟΡΟΙ - ΤΕΛΗ', normalizedCategory:'admin_general_expense', amountNative:-0.071219, disclosureLevel:'aggregated' },
    { rawLabel:'ΔΙΑΦΟΡΑ ΕΞΟΔΑ', normalizedCategory:'other_expenses', amountNative:-0.219801, disclosureLevel:'aggregated' },
    { rawLabel:'ΛΟΙΠΑ ΕΚΤΑΚΤΑ & ΑΝΟΡΓ.ΕΞΟΔΑ', normalizedCategory:'exceptional_items', amountNative:-0.003327, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Αγορές εμπορευμάτων και υλικών', normalizedCategory:'other_expenses', amountNative:-0.001353, disclosureLevel:'aggregated' },
    { rawLabel:'Παροχές σε εργαζόμενους', normalizedCategory:'wages_squad', amountNative:-0.757094, disclosureLevel:'aggregated' },
    { rawLabel:'Αποσβέσεις', normalizedCategory:'depreciation', amountNative:-0.02716, disclosureLevel:'aggregated' },
    { rawLabel:'ΑΜΟΙΒΕΣ ΚΑΙ ΕΞΟΔΑ ΤΡΙΤΩΝ', normalizedCategory:'admin_general_expense', amountNative:-0.496597, disclosureLevel:'aggregated' },
    { rawLabel:'ΠΑΡΟΧΕΣ ΤΡΙΤΩΝ', normalizedCategory:'admin_general_expense', amountNative:-2.115419, disclosureLevel:'aggregated' },
    { rawLabel:'ΦΟΡΟΙ - ΤΕΛΗ', normalizedCategory:'admin_general_expense', amountNative:-0.076914, disclosureLevel:'aggregated' },
    { rawLabel:'ΔΙΑΦΟΡΑ ΕΞΟΔΑ', normalizedCategory:'other_expenses', amountNative:-0.550423, disclosureLevel:'aggregated' },
  ],
};
const kifisiagrFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'kifisia-gr-notes-2022-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000738, tax:-0.000917,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.000738},
      {label:'Φόροι εισοδήματος', value:-0.000917},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.396935, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.475202, officialTotalExpenses:0.925751, officialPAT:-0.452204,
  },
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
  'kifisia-gr-notes-2022-06-30': {
    id:'kifisia-gr-notes-2022-06-30', clubId:'kifisia-gr',
    title:'Kifisia - Athlitiki Enosis P.A.E. — Kifisia_notes_2022-06-30 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'kifisia-gr-notes-2024-06-30': {
    id:'kifisia-gr-notes-2024-06-30', clubId:'kifisia-gr',
    title:'Kifisia - Athlitiki Enosis P.A.E. — Kifisia_notes_2024-06-30 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['kifisia-gr'] = null;
