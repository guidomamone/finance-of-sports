const atromitosgrRevenueLinesByYear = {
  2016: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:4.214679, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά συνήθη έσοδα', normalizedCategory:'other_income', amountNative:0.878168, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.109951, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Από εισιτήρια αγώνων', normalizedCategory:'matchday_competition', amountNative:0.155532, disclosureLevel:'aggregated' },
    { rawLabel:'Από τηλεοπτικά δικαιώματα', normalizedCategory:'broadcasting', amountNative:2.352325, disclosureLevel:'aggregated' },
    { rawLabel:'Από χορηγίες-διαφήμιση', normalizedCategory:'sponsorship_commercial', amountNative:0.234735, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορήγηση από Super League-ΕΠΟ', normalizedCategory:'competition_bonus', amountNative:0.201512, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορήγηση από συμμετοχή UEFA', normalizedCategory:'competition_bonus', amountNative:0.377719, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορήγηση από UEFA Ακαδημιών', normalizedCategory:'youth_football', amountNative:0.331917, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από αποζημιώσεις', normalizedCategory:'other_income', amountNative:0.001588, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από ΕΠΟ - Κύπελλο Ελλάδος', normalizedCategory:'competition_bonus', amountNative:0.064189, disclosureLevel:'aggregated' },
    { rawLabel:'Ενοίκια Κυλικείου', normalizedCategory:'other_income', amountNative:0.024, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.019555, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Από εισιτήρια αγώνων', normalizedCategory:'matchday_competition', amountNative:0.140609, disclosureLevel:'aggregated' },
    { rawLabel:'Από τηλεοπτικά δικαιώματα', normalizedCategory:'broadcasting', amountNative:2.187, disclosureLevel:'aggregated' },
    { rawLabel:'Από χορηγίες-διαφήμιση', normalizedCategory:'sponsorship_commercial', amountNative:0.480736, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορήγηση από Super League-ΕΠΟ', normalizedCategory:'competition_bonus', amountNative:0.263893, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορήγηση από συμμετοχή UEFA', normalizedCategory:'competition_bonus', amountNative:0.625816, disclosureLevel:'aggregated' },
    { rawLabel:'Επιχορήγηση από UEFA Ακαδημιών', normalizedCategory:'youth_football', amountNative:0.349805, disclosureLevel:'aggregated' },
    { rawLabel:'Έσοδα από ΕΠΟ - Κύπελλο Ελλάδος', normalizedCategory:'competition_bonus', amountNative:0.02027, disclosureLevel:'aggregated' },
    { rawLabel:'Ενοίκια Κυλικείου', normalizedCategory:'other_income', amountNative:0.0208, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.023731, disclosureLevel:'aggregated' },
  ],
};
const atromitosgrExpenseLinesByYear = {
  2016: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-4.938658, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.653858, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.111137, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-5.233558, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.304293, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.038471, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Κόστος πωλήσεων', normalizedCategory:'lump_football_operations_expense', amountNative:-5.065443, disclosureLevel:'aggregated' },
    { rawLabel:'Έξοδα διοίκησης', normalizedCategory:'admin_general_expense', amountNative:-0.290308, disclosureLevel:'aggregated' },
    { rawLabel:'Λοιπά έξοδα και ζημίες', normalizedCategory:'other_expenses', amountNative:-0.041713, disclosureLevel:'aggregated' },
  ],
};
const atromitosgrFiscalYearMeta = {
  2016: {
    incluidoEn:{ sponsorship_commercial:{ en:'lump_football_operations', posible:true, por:'precedente' }, matchday_competition:{ en:'lump_football_operations', posible:true, por:'precedente' }, season_tickets:{ en:'lump_football_operations', posible:true, por:'precedente' }, stadium_other:{ en:'lump_football_operations', posible:true, por:'precedente' }, broadcasting:{ en:'lump_football_operations', posible:true, por:'precedente' }, competition_bonus:{ en:'lump_football_operations', posible:true, por:'precedente' }, other_sports:{ en:'lump_football_operations', posible:true, por:'precedente' }, youth_football:{ en:'lump_football_operations', posible:true, por:'precedente' }, womens_football:{ en:'lump_football_operations', posible:true, por:'precedente' } },
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
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'atromitos-gr-fs-2019-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.135736, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000001},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.135737},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:5.233558, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Atromitos_notes_2021-06-30.md: Κόστος πωλήσεων 5.668.240 (estado por función). Κόστος πωλήσεων es el costo por función sin nota que lo abra; precedente griego aceptado (AEL, Asteras, Panserraikos) lump_football_operations_expense; es la categoría \'Fútbol profesional (sin desglosar por la fuente)\'.'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.763073, officialTotalExpenses:5.576322, officialPAT:-1.948985,
  },
  2020: {
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'atromitos-gr-notes-2020-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.186933, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000001},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.186934},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    sinDesglose: [
      {renglon:'Κόστος πωλήσεων', lado:'expense', importe:5.065443, motivo:'Claude 2026-10-14 (subagente Sonnet, seguridad alta): Atromitos_notes_2020-06-30.md: Κόστος πωλήσεων 5.065.443 (estado por función). Κόστος πωλήσεων es el costo por función sin nota que lo abra; precedente griego aceptado (AEL, Asteras, Panserraikos) lump_football_operations_expense; es la categoría \'Fútbol profesional (sin desglosar por la fuente)\'.'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.112661, officialTotalExpenses:5.397464, officialPAT:-1.471737,
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
  'atromitos-gr-fs-2019-06-30': {
    id:'atromitos-gr-fs-2019-06-30', clubId:'atromitos-gr',
    title:'A.P.S. Atromitos Athinon 1923 P.A.E. — Atromitos_FS_2019-06-30 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'atromitos-gr-notes-2020-06-30': {
    id:'atromitos-gr-notes-2020-06-30', clubId:'atromitos-gr',
    title:'A.P.S. Atromitos Athinon 1923 P.A.E. — Atromitos_notes_2020-06-30 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['atromitos-gr'] = null;
