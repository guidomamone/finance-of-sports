const udechileRevenueLinesByYear = {
  2024: [
    { rawLabel:'Borderó', normalizedCategory:'matchday_competition', amountNative:9574.716, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:7599.088, disclosureLevel:'detailed' },
    { rawLabel:'Participación torneos Internacionales', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:5050.756, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de pases de jugadores', normalizedCategory:'player_sales', amountNative:38.069, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:1795.179, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Borderó', normalizedCategory:'matchday_competition', amountNative:2806.350, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:5304.156, disclosureLevel:'detailed' },
    { rawLabel:'Participación torneos Internacionales', normalizedCategory:'competition_bonus', amountNative:46.861, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:4835.724, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de pases de jugadores', normalizedCategory:'player_sales', amountNative:4790.420, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:900.492, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Borderó', normalizedCategory:'matchday_competition', amountNative:2575.833, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:6052.638, disclosureLevel:'detailed' },
    { rawLabel:'Participación torneos Internacionales', normalizedCategory:'competition_bonus', amountNative:7.004, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:4377.614, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de pases de jugadores', normalizedCategory:'player_sales', amountNative:448.862, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:1053.975, disclosureLevel:'detailed' },
  ],
};

const udechileExpenseLinesByYear = {
  2024: [
    { rawLabel:'Costo de Ventas: Borderó (costos directos)', normalizedCategory:'match_organisation_expense', amountNative:-2746.903, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Remuneraciones', normalizedCategory:'wages_squad', amountNative:-8937.407, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2269.652, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Costo de venta de pases de jugadores', normalizedCategory:'player_amortisation', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Otros gastos de operación', normalizedCategory:'other_expenses', amountNative:-4092.156, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Servicios básicos', normalizedCategory:'admin_general_expense', amountNative:-65.390, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Asesorías', normalizedCategory:'admin_general_expense', amountNative:-610.772, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Depreciaciones y amortizaciones', normalizedCategory:'depreciation', amountNative:-377.541, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Arriendos', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Mantenciones', normalizedCategory:'admin_general_expense', amountNative:-196.665, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-1674.160, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Otros Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-1289.981, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Costo de Ventas: Borderó (costos directos)', normalizedCategory:'match_organisation_expense', amountNative:-1104.130, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Remuneraciones', normalizedCategory:'wages_squad', amountNative:-7255.110, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2375.002, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Costo de venta de pases de jugadores', normalizedCategory:'player_amortisation', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Otros gastos de operación', normalizedCategory:'other_expenses', amountNative:-2646.483, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Servicios básicos', normalizedCategory:'admin_general_expense', amountNative:-118.769, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Asesorías', normalizedCategory:'admin_general_expense', amountNative:-538.959, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Depreciaciones y amortizaciones', normalizedCategory:'depreciation', amountNative:-353.272, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Arriendos', normalizedCategory:'admin_general_expense', amountNative:-0.350, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Mantenciones', normalizedCategory:'admin_general_expense', amountNative:-162.117, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-1230.957, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Otros Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-1133.414, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Costo de Ventas: Borderó (costos directos)', normalizedCategory:'match_organisation_expense', amountNative:-961.223, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Remuneraciones', normalizedCategory:'wages_squad', amountNative:-7144.464, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2121.734, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Costo de venta de pases de jugadores (indemnización por término anticipado de contrato)', normalizedCategory:'player_amortisation', amountNative:-25.341, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Otros gastos de operación', normalizedCategory:'other_expenses', amountNative:-2256.954, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Servicios básicos', normalizedCategory:'admin_general_expense', amountNative:-87.160, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Asesorías', normalizedCategory:'admin_general_expense', amountNative:-539.389, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Depreciaciones y amortizaciones', normalizedCategory:'depreciation', amountNative:-565.863, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Arriendos', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Mantenciones', normalizedCategory:'admin_general_expense', amountNative:-199.486, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-1387.777, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Otros Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-1143.279, disclosureLevel:'detailed' },
  ],
};

const udechileFiscalYearMeta = {
  2024: {
    currency:'CLP', fx:992.12, fxSource:'market_approx',
    sourceId:'udechile-cl-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1473.596,
    tax:920.675,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:13716.241,
    cash:2024.494,
    officialTotalRevenue:24057.808, officialTotalExpenses:22260.627, officialPAT:1244.260,
  },
  2023: {
    currency:'CLP', fx:884.59, fxSource:'market_approx',
    sourceId:'udechile-cl-estados-financieros-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1391.540,
    tax:1162.475,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:14497.179,
    cash:812.088,
    officialTotalRevenue:18684.003, officialTotalExpenses:16918.563, officialPAT:1536.375,
  },
  2022: {
    currency:'CLP', fx:859.51, fxSource:'market_approx',
    sourceId:'udechile-cl-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-448.920,
    tax:669.533,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:14307.914,
    cash:1665.904,
    officialTotalRevenue:14515.925, officialTotalExpenses:16432.670, officialPAT:-1696.132,
  },
};

const udechilePresupuestoOverlayByYear = {};

const udechilePasesData = [];
const udechileResultadosData = {};
const udechileTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['udechile-cl'] = {
  revenueLinesByYear: udechileRevenueLinesByYear, expenseLinesByYear: udechileExpenseLinesByYear,
  fiscalYearMeta: udechileFiscalYearMeta, pasesData: udechilePasesData,
  resultadosData: udechileResultadosData, titulosData: udechileTitulosData,
  presupuestoOverlayByYear: udechilePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'udechile-cl-estados-financieros-2024': {
    id:'udechile-cl-estados-financieros-2024', clubId:'udechile-cl',
    title:'Estados Financieros Consolidados bajo IFRS al 31 de diciembre de 2024 y 2023',
    type:'official_balance_sheet', reliability:'primary',
  },
  'udechile-cl-estados-financieros-2023': {
    id:'udechile-cl-estados-financieros-2023', clubId:'udechile-cl',
    title:'Estados Financieros Consolidados bajo IFRS al 31 de diciembre de 2023 y 2022',
    type:'official_balance_sheet', reliability:'primary',
  },
  'udechile-cl-estados-financieros-2022': {
    id:'udechile-cl-estados-financieros-2022', clubId:'udechile-cl',
    title:'Estados Financieros Consolidados bajo IFRS al 31 de diciembre de 2022 y 2021',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['udechile-cl'] = {
  actual: { nombre:'Gestión actual', firstYear:2022, lastYear:2024 },
};

memberCountByClub['udechile-cl'] = null;
