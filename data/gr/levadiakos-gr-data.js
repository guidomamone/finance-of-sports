const levadiakosgrRevenueLinesByYear = {
  2019: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.076361, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:2.37042, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.103883, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.015806, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:1.247265, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.069638, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.003081, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.963746, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.344553, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.036775, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:1.372613, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.559186, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.253444, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:3.233068, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.162258, disclosureLevel:'aggregated' },
  ],
};
const levadiakosgrExpenseLinesByYear = {
  2019: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-2.256353, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.141222, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.315689, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.11411, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-1.155648, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.033282, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.193974, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.01649, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-0.772825, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.003464, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.243569, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.292845, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-1.354066, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.025341, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.190877, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.073518, disclosureLevel:'aggregated' },
  ],
  2023: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-3.042119, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διάθεσης', normalizedCategory:'admin_general_expense', amountNative:-0.034185, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.334887, disclosureLevel:'aggregated' },
    { rawLabel:'Άλλα έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.046651, disclosureLevel:'aggregated' },
  ],
};
const levadiakosgrFiscalYearMeta = {
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'levadiakos-gr-fs-2019-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.001356, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000023},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.001379},
      {label:'Φόρος εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.076361, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:2.256353, motivo:'Levadiakos 2025: Κόστος πωλήσεων 4.664.283,37 sin desglose -> lump'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.550664, officialTotalExpenses:2.827374, officialPAT:-0.278066,
  },
  2020: {
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'levadiakos-gr-fs-2020-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000965, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000003},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.000968},
      {label:'Φόρος εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.015806, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:1.155648, motivo:'Levadiakos 2025: Κόστος πωλήσεων 4.664.283,37 sin desglose -> lump'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.332709, officialTotalExpenses:1.399393, officialPAT:-0.06765,
  },
  2021: {
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'levadiakos-gr-fs-2021-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000724, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000037},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.000761},
      {label:'Φόρος εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.003081, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:0.772825, motivo:'Levadiakos 2025: Κόστος πωλήσεων 4.664.283,37 sin desglose -> lump'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.311379, officialTotalExpenses:1.312703, officialPAT:-0.002047,
  },
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'levadiakos-gr-fs-2022-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.005185, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.005185},
      {label:'Φόρος εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.036775, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:1.354066, motivo:'Levadiakos 2022: Κόστος πωλήσεων 1.354.066,29 sin nota que lo abra -> lump (igual que AEL)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.968574, officialTotalExpenses:1.643803, officialPAT:0.319586,
  },
  2023: {
    currency:'EUR', fxRef:'EUR@2023-06-30',
    sourceId:'levadiakos-gr-fs-2023-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.007692, tax:-0.017175,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000001},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.007693},
      {label:'Φόρος εισοδήματος', value:-0.017175},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.253444, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:3.042119, motivo:'Levadiakos 2025: Κόστος πωλήσεων 4.664.283,37 sin desglose -> lump'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.648771, officialTotalExpenses:3.457842, officialPAT:0.166063,
  },
};
const levadiakosgrPresupuestoOverlayByYear = {};

const levadiakosgrPasesData = [];
const levadiakosgrResultadosData = {};
const levadiakosgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['levadiakos-gr'] = {
  revenueLinesByYear: levadiakosgrRevenueLinesByYear, expenseLinesByYear: levadiakosgrExpenseLinesByYear,
  fiscalYearMeta: levadiakosgrFiscalYearMeta, pasesData: levadiakosgrPasesData,
  resultadosData: levadiakosgrResultadosData, titulosData: levadiakosgrTitulosData,
  presupuestoOverlayByYear: levadiakosgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'levadiakos-gr-fs-2019-06-30': {
    id:'levadiakos-gr-fs-2019-06-30', clubId:'levadiakos-gr',
    title:'A.P.O. Levadiakos P.A.E. — Levadiakos_FS_2019-06-30 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'levadiakos-gr-fs-2020-06-30': {
    id:'levadiakos-gr-fs-2020-06-30', clubId:'levadiakos-gr',
    title:'A.P.O. Levadiakos P.A.E. — Levadiakos_FS_2020-06-30 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'levadiakos-gr-fs-2021-06-30': {
    id:'levadiakos-gr-fs-2021-06-30', clubId:'levadiakos-gr',
    title:'A.P.O. Levadiakos P.A.E. — Levadiakos_FS_2021-06-30 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'levadiakos-gr-fs-2022-06-30': {
    id:'levadiakos-gr-fs-2022-06-30', clubId:'levadiakos-gr',
    title:'A.P.O. Levadiakos P.A.E. — Levadiakos_FS_2022-06-30 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'levadiakos-gr-fs-2023-06-30': {
    id:'levadiakos-gr-fs-2023-06-30', clubId:'levadiakos-gr',
    title:'A.P.O. Levadiakos P.A.E. — Levadiakos_FS_2023-06-30 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['levadiakos-gr'] = null;
