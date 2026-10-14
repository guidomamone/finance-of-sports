const panetolikosgrRevenueLinesByYear = {
  2017: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.712062, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:2.575265, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.030629, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.377138, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:2.122479, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.009284, disclosureLevel:'aggregated' },
  ],
};
const panetolikosgrExpenseLinesByYear = {
  2017: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-3.807846, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.385561, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.035004, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.058673, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-3.850553, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.331746, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.045497, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.040496, disclosureLevel:'aggregated' },
  ],
};
const panetolikosgrFiscalYearMeta = {
  2017: {
    currency:'EUR', fxRef:'EUR@2017-06-30',
    sourceId:'panetolikos-gr-fs-2016-17',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.004497, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.001262},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.005759},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.712062, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:3.807846, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Κόστος πωλήσεων es la línea de costo por función que contiene la operación del fútbol, incluidos los sueldos del plantel y personal (el estado no los separa; to-do 229). Se mantiene como fútbol sin desglosar, sin inventar un desglose. Precedente: AEL Larissa 2016 y 2017, misma línea -> lump_football_operations_expense. La nota de personal da 1.959.575,41 € (L1086). [Clubes/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.md L501 (pág. 15) "Κόστος πωλήσεων | -6.274.036,89". Nota de personal: L1079-1086, "Σύνολο" 1.959.575,41]'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.317956, officialTotalExpenses:4.287083, officialPAT:-0.973625,
  },
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'panetolikos-gr-fs-2017-18',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.008301, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000858},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.009159},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.377138, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:3.850553, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Κόστος πωλήσεων es la línea de costo por función que contiene la operación del fútbol, incluidos los sueldos del plantel y personal (el estado no los separa; to-do 229). Se mantiene como fútbol sin desglosar, sin inventar un desglose. Precedente: AEL Larissa 2016 y 2017, misma línea -> lump_football_operations_expense. La nota de personal da 1.959.575,41 € (L1086). [Clubes/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.md L501 (pág. 15) "Κόστος πωλήσεων | -6.274.036,89". Nota de personal: L1079-1086, "Σύνολο" 1.959.575,41]'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.508901, officialTotalExpenses:4.268291, officialPAT:-1.767691,
  },
};
const panetolikosgrPresupuestoOverlayByYear = {};

const panetolikosgrPasesData = [];
const panetolikosgrResultadosData = {};
const panetolikosgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['panetolikos-gr'] = {
  revenueLinesByYear: panetolikosgrRevenueLinesByYear, expenseLinesByYear: panetolikosgrExpenseLinesByYear,
  fiscalYearMeta: panetolikosgrFiscalYearMeta, pasesData: panetolikosgrPasesData,
  resultadosData: panetolikosgrResultadosData, titulosData: panetolikosgrTitulosData,
  presupuestoOverlayByYear: panetolikosgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'panetolikos-gr-fs-2016-17': {
    id:'panetolikos-gr-fs-2016-17', clubId:'panetolikos-gr',
    title:'Panaitolikos G.F.S. P.A.E. — Panetolikos_FS_2016-17 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'panetolikos-gr-fs-2017-18': {
    id:'panetolikos-gr-fs-2017-18', clubId:'panetolikos-gr',
    title:'Panaitolikos G.F.S. P.A.E. — Panetolikos_FS_2017-18 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['panetolikos-gr'] = null;
