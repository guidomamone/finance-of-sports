const atromitosgrRevenueLinesByYear = {
  2016: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:4.214679, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.878168, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.109951, disclosureLevel:'aggregated' },
  ],
};
const atromitosgrExpenseLinesByYear = {
  2016: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-4.938658, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.653858, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.111137, disclosureLevel:'aggregated' },
  ],
};
const atromitosgrFiscalYearMeta = {
  2016: {
    currency:'EUR', fxRef:'EUR@2016-06-30',
    sourceId:'atromitos-gr-notes-2015-16',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000859, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.016146},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.017005},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:4.214679, motivo:'el documento no desglosa este renglón'},
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:4.938658, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Atromitos_notes_2015-16.md: Κόστος πωλήσεων 4.938.658 (estado por función). Κόστος πωλήσεων es el costo por función sin nota que lo abra; precedente griego aceptado (AEL, Asteras, Panserraikos) lump_football_operations_expense; es la categoría \'Fútbol profesional (sin desglosar por la fuente)\'.'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5.202798, officialTotalExpenses:5.703653, officialPAT:-0.501714,
  },
};
const atromitosgrPresupuestoOverlayByYear = {};

const atromitosgrPasesData = [];
const atromitosgrResultadosData = {};
const atromitosgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['atromitos-gr'] = {
  revenueLinesByYear: atromitosgrRevenueLinesByYear, expenseLinesByYear: atromitosgrExpenseLinesByYear,
  fiscalYearMeta: atromitosgrFiscalYearMeta, pasesData: atromitosgrPasesData,
  resultadosData: atromitosgrResultadosData, titulosData: atromitosgrTitulosData,
  presupuestoOverlayByYear: atromitosgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'atromitos-gr-notes-2015-16': {
    id:'atromitos-gr-notes-2015-16', clubId:'atromitos-gr',
    title:'A.P.S. Atromitos Athinon 1923 P.A.E. — Atromitos_notes_2015-16 (ejercicio 2016)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['atromitos-gr'] = null;
