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
});

memberCountByClub['levadiakos-gr'] = null;
