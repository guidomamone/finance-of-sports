const llaneroscoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Cesion de Derechos de TV', normalizedCategory:'broadcasting', amountNative:2557.762933, disclosureLevel:'aggregated' },
    { rawLabel:'Contratos Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:6388.932082, disclosureLevel:'aggregated' },
    { rawLabel:'Auxilio Transporte Dimayor', normalizedCategory:'competition_bonus', amountNative:673.77927, disclosureLevel:'aggregated' },
    { rawLabel:'Auxilio Arbitraje Dimayor', normalizedCategory:'competition_bonus', amountNative:96.254181, disclosureLevel:'aggregated' },
    { rawLabel:'Auxilio Hotelero Dimayor', normalizedCategory:'competition_bonus', amountNative:192.508363, disclosureLevel:'aggregated' },
    { rawLabel:'Mecanismo de Solidaridad', normalizedCategory:'player_sales', amountNative:120, disclosureLevel:'aggregated' },
    { rawLabel:'Taquillas', normalizedCategory:'matchday_competition', amountNative:1826.318189, disclosureLevel:'aggregated' },
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:1.294537, disclosureLevel:'aggregated' },
  ],
};
const llaneroscoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-186.887168, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos por beneficios a empleados', normalizedCategory:'wages_squad', amountNative:-6616.106802, disclosureLevel:'aggregated' },
    { rawLabel:'Honorarios', normalizedCategory:'admin_general_expense', amountNative:-304.3695, disclosureLevel:'aggregated' },
    { rawLabel:'Impuestos', normalizedCategory:'admin_general_expense', amountNative:-243.29674, disclosureLevel:'aggregated' },
    { rawLabel:'Arrendamientos', normalizedCategory:'admin_general_expense', amountNative:-15.574139, disclosureLevel:'aggregated' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-38.49822, disclosureLevel:'aggregated' },
    { rawLabel:'Servicios', normalizedCategory:'admin_general_expense', amountNative:-478.950141, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos legales', normalizedCategory:'admin_general_expense', amountNative:-385.4103, disclosureLevel:'aggregated' },
    { rawLabel:'Mantenimiento y reparaciones', normalizedCategory:'admin_general_expense', amountNative:-0.31, disclosureLevel:'aggregated' },
    { rawLabel:'Adecuacion e instalacion', normalizedCategory:'admin_general_expense', amountNative:-816.568181, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos de Viaje', normalizedCategory:'match_organisation_expense', amountNative:-1408.304135, disclosureLevel:'aggregated' },
    { rawLabel:'Otros Gstos', normalizedCategory:'other_expenses', amountNative:-228.43519, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos extraordinarios', normalizedCategory:'exceptional_items', amountNative:-38.083024, disclosureLevel:'aggregated' },
    { rawLabel:'Gastos diversos', normalizedCategory:'other_expenses', amountNative:-44.283671, disclosureLevel:'aggregated' },
  ],
};
const llaneroscoFiscalYearMeta = {
  2025: {
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'llaneros-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:-10.205,
    extraRows: [
      {label:'Gastos Financieros', value:null},
      {label:'Diferido', value:-10.205},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:11856.849555, officialTotalExpenses:10766.994187, officialPAT:1041.567343,
  },
};
const llaneroscoPresupuestoOverlayByYear = {};

const llaneroscoPasesData = [];
const llaneroscoResultadosData = {};
const llaneroscoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['llaneros-co'] = {
  revenueLinesByYear: llaneroscoRevenueLinesByYear, expenseLinesByYear: llaneroscoExpenseLinesByYear,
  fiscalYearMeta: llaneroscoFiscalYearMeta, pasesData: llaneroscoPasesData,
  resultadosData: llaneroscoResultadosData, titulosData: llaneroscoTitulosData,
  presupuestoOverlayByYear: llaneroscoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'llaneros-co-estados-financieros-2025': {
    id:'llaneros-co-estados-financieros-2025', clubId:'llaneros-co',
    title:'Club Llaneros S.A. — estados-financieros-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['llaneros-co'] = null;
