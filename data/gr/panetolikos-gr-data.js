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
  2020: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:1.111543, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:2.521303, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.013314, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Ευρωπαϊκή αγορά', normalizedCategory:'player_sales', amountNative:0.6, disclosureLevel:'aggregated' },
    { rawLabel:'Αγορές τρίτων χωρών', normalizedCategory:'lump_football_operations', amountNative:0.004192, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:3.839185, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.036941, disclosureLevel:'aggregated' },
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
  2020: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-4.428104, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.555211, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.029052, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.029196, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-4.498578, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.274993, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.021783, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.02477, disclosureLevel:'aggregated' },
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
  2020: {
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'panetolikos-gr-fs-2019-20',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.005408, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000761},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.006169},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:1.111543, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:4.428104, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Κόστος πωλήσεων es la línea de costo por función que contiene la operación del fútbol, incluidos los sueldos del plantel y personal (el estado no los separa; to-do 229). Se mantiene como fútbol sin desglosar, sin inventar un desglose. Precedente: AEL Larissa 2016 y 2017, misma línea -> lump_football_operations_expense. La nota de personal da 1.959.575,41 € (L1086). [Clubes/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.md L501 (pág. 15) "Κόστος πωλήσεων | -6.274.036,89". Nota de personal: L1079-1086, "Σύνολο" 1.959.575,41]'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.64616, officialTotalExpenses:5.041563, officialPAT:-1.400811,
  },
  2021: {
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'panetolikos-gr-fs-2021-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.004455, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000457},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.004912},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Αγορές τρίτων χωρών', lado:'revenue', importe:0.004192, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad media): Es el resto del Κύκλος εργασιών (604.192 = 600.000 + 4.192), clasificado por el documento como prestación de servicios sin más detalle y sin entradas (covid); no hay forma de saber qué servicio es. Queda como fútbol sin desglosar, igual que el Κύκλος εργασιών de 2020 y 2022 (lump_football_operations). Importe chico (4 mil euros). [Clubes/Grecia/Panetolikos/Panetolikos_FS_2021-06-30.md L1471 (pág. 35) "Αγορές τρίτων χωρών | 4.192,00 | 6.880,00"; L1465 "Παροχή υπηρεσιών Σύνολο | 604.192,00"; L1475 "στην τρέχουσα χρήση δεν εκδόθηκαν εισιτήρια λόγω covid"]'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:4.498578, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Κόστος πωλήσεων es la línea de costo por función que contiene la operación del fútbol, incluidos los sueldos del plantel y personal (el estado no los separa; to-do 229). Se mantiene como fútbol sin desglosar, sin inventar un desglose. Precedente: AEL Larissa 2016 y 2017, misma línea -> lump_football_operations_expense. La nota de personal da 1.959.575,41 € (L1086). [Clubes/Grecia/Panetolikos/Panetolikos_FS_2025-06-30.md L501 (pág. 15) "Κόστος πωλήσεων | -6.274.036,89". Nota de personal: L1079-1086, "Σύνολο" 1.959.575,41]'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.480318, officialTotalExpenses:4.820124, officialPAT:-0.344261,
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
  'panetolikos-gr-fs-2019-20': {
    id:'panetolikos-gr-fs-2019-20', clubId:'panetolikos-gr',
    title:'Panaitolikos G.F.S. P.A.E. — Panetolikos_FS_2019-20 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'panetolikos-gr-fs-2021-06-30': {
    id:'panetolikos-gr-fs-2021-06-30', clubId:'panetolikos-gr',
    title:'Panaitolikos G.F.S. P.A.E. — Panetolikos_FS_2021-06-30 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['panetolikos-gr'] = null;
