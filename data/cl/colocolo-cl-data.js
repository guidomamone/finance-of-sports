const colocoloRevenueLinesByYear = {
  2024: [
    { rawLabel:'Ingresos por recaudaciones', normalizedCategory:'matchday_competition', amountNative:11552.069, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores comprado a terceros', normalizedCategory:'player_sales', amountNative:2271.929, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores formados por el Club', normalizedCategory:'player_sales', amountNative:4651.549, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:12259.949, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:12057.231, disclosureLevel:'detailed' },
    { rawLabel:'Otros (ingresos de actividades ordinarias)', normalizedCategory:'other_income', amountNative:4541.052, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos, por función', normalizedCategory:'other_income', amountNative:274.716, disclosureLevel:'detailed', items:[
      ['Devolución seguros', 222.779], ['Dividendos', 51.937],
    ]},
  ],
  2023: [
    { rawLabel:'Ingresos por recaudaciones', normalizedCategory:'matchday_competition', amountNative:8197.538, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores comprado a terceros', normalizedCategory:'player_sales', amountNative:827.026, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores formados por el Club', normalizedCategory:'player_sales', amountNative:996.125, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:10192.754, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:8367.460, disclosureLevel:'detailed' },
    { rawLabel:'Otros (ingresos de actividades ordinarias)', normalizedCategory:'other_income', amountNative:1079.122, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos, por función', normalizedCategory:'other_income', amountNative:2260.264, disclosureLevel:'detailed', items:[
      ['Condonación Intereses y Multas TGR', 1270.400], ['Provisión PPUA', 983.882], ['Otros Ingresos', 5.982],
    ]},
  ],
  2022: [
    { rawLabel:'Ingresos por recaudaciones', normalizedCategory:'matchday_competition', amountNative:5032.509, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores comprado a terceros', normalizedCategory:'player_sales', amountNative:4830.583, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por venta de jugadores formados por el Club', normalizedCategory:'player_sales', amountNative:694.804, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:8641.046, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por derechos de televisión', normalizedCategory:'broadcasting', amountNative:8812.894, disclosureLevel:'detailed' },
    { rawLabel:'Otros (ingresos de actividades ordinarias)', normalizedCategory:'other_income', amountNative:835.099, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos, por función', normalizedCategory:'other_income', amountNative:108.593, disclosureLevel:'detailed', items:[
      ['Dividendos', 99.545], ['Otros ingresos', 9.048],
    ]},
  ],
};

const colocoloExpenseLinesByYear = {
  2024: [
    { rawLabel:'Costo de ventas jugadores', normalizedCategory:'player_amortisation', amountNative:-1603.044, disclosureLevel:'detailed' },
    { rawLabel:'Remuneración plantel profesional y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-18468.781, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos en concesión', normalizedCategory:'depreciation', amountNative:-228.205, disclosureLevel:'detailed' },
    { rawLabel:'Amortización pases jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-4588.745, disclosureLevel:'detailed' },
    { rawLabel:'Costos de concentración traslados y otros', normalizedCategory:'match_organisation_expense', amountNative:-8362.036, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos (costo de ventas)', normalizedCategory:'other_expenses', amountNative:-2289.846, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración', normalizedCategory:'admin_general_expense', amountNative:-7857.352, disclosureLevel:'detailed', items:[
      ['Servicios básicos', 336.507], ['Asesorías', 860.634], ['Gastos Legales', 715.785], ['Mantenciones', 45.392], ['Remuneración administración', 3703.869], ['Otros gastos de administración', 2195.165],
    ]},
    { rawLabel:'Depreciaciones (gastos de administración)', normalizedCategory:'depreciation', amountNative:-522.938, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-39.860, disclosureLevel:'detailed' },
    { rawLabel:'Intereses y Multas (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-855.267, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Costo de ventas jugadores', normalizedCategory:'player_amortisation', amountNative:-173.974, disclosureLevel:'detailed' },
    { rawLabel:'Remuneración plantel profesional y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-12347.555, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos en concesión', normalizedCategory:'depreciation', amountNative:-228.205, disclosureLevel:'detailed' },
    { rawLabel:'Amortización pases jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-3249.301, disclosureLevel:'detailed' },
    { rawLabel:'Costos de concentración traslados y otros', normalizedCategory:'match_organisation_expense', amountNative:-5090.641, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos (costo de ventas)', normalizedCategory:'other_expenses', amountNative:-1373.570, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración', normalizedCategory:'admin_general_expense', amountNative:-6080.220, disclosureLevel:'detailed', items:[
      ['Servicios básicos', 323.036], ['Asesorías', 765.707], ['Gastos Legales', 426.937], ['Mantenciones', 42.637], ['Remuneración administración', 3250.798], ['Otros gastos de administración', 1271.105],
    ]},
    { rawLabel:'Depreciaciones (gastos de administración)', normalizedCategory:'depreciation', amountNative:-507.507, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-30.963, disclosureLevel:'detailed' },
    { rawLabel:'Intereses y Multas (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-701.853, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Costo de ventas jugadores', normalizedCategory:'player_amortisation', amountNative:-2614.370, disclosureLevel:'detailed' },
    { rawLabel:'Remuneración plantel profesional y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-11057.918, disclosureLevel:'detailed' },
    { rawLabel:'Amortización Activos en concesión', normalizedCategory:'depreciation', amountNative:-228.204, disclosureLevel:'detailed' },
    { rawLabel:'Amortización pases jugadores profesionales', normalizedCategory:'player_amortisation', amountNative:-2537.550, disclosureLevel:'detailed' },
    { rawLabel:'Costos de concentración traslados y otros', normalizedCategory:'match_organisation_expense', amountNative:-4167.757, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos (costo de ventas)', normalizedCategory:'other_expenses', amountNative:-695.903, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración', normalizedCategory:'admin_general_expense', amountNative:-4998.150, disclosureLevel:'detailed', items:[
      ['Servicios básicos', 200.893], ['Asesorías', 550.526], ['Gastos Legales', 399.975], ['Mantenciones', 49.131], ['Remuneración administración', 2430.000], ['Otros gastos de administración', 1367.625],
    ]},
    { rawLabel:'Depreciaciones (gastos de administración)', normalizedCategory:'depreciation', amountNative:-543.459, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-27.731, disclosureLevel:'detailed' },
    { rawLabel:'Intereses y Multas (otros gastos por función)', normalizedCategory:'other_expenses', amountNative:-376.828, disclosureLevel:'detailed' },
  ],
};

const colocoloFiscalYearMeta = {
  2024: {
    currency:'CLP', fx:992.12, fxSource:'market_approx',
    sourceId:'colocolo-cl-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'mosa3',
    netInterest:0.609 - 1794.667 - 700.471,
    tax:370.515, profitOnPlayerSales:0, assetSales:0,
    grossDebt:1872.558, cash:3435.024,
    officialTotalRevenue:47608.495, officialTotalExpenses:44816.074, officialPAT:668.407,
  },
  2023: {
    currency:'CLP', fx:884.59, fxSource:'market_approx',
    sourceId:'colocolo-cl-estados-financieros-2023',
    reportType:'official_balance_sheet',
    gestionId:'stohwing',
    netInterest:0.273 - 1005.992 - 278.728,
    tax:-34.283, profitOnPlayerSales:0, assetSales:0,
    grossDebt:2804.415, cash:43.523,
    officialTotalRevenue:31920.289, officialTotalExpenses:29783.789, officialPAT:817.770,
  },
  2022: {
    currency:'CLP', fx:859.51, fxSource:'market_approx',
    sourceId:'colocolo-cl-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:'stohwing',
    netInterest:80.129 - 1408.430 - 1211.160,
    tax:1623.264, profitOnPlayerSales:0, assetSales:0,
    grossDebt:410.88, cash:1293.536,
    officialTotalRevenue:28955.528, officialTotalExpenses:27247.870, officialPAT:791.461,
  },
};

const colocoloPresupuestoOverlayByYear = {};

const colocoloPasesData = [];
const colocoloResultadosData = {};
const colocoloTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['colocolo-cl'] = {
  revenueLinesByYear: colocoloRevenueLinesByYear, expenseLinesByYear: colocoloExpenseLinesByYear,
  fiscalYearMeta: colocoloFiscalYearMeta, pasesData: colocoloPasesData,
  resultadosData: colocoloResultadosData, titulosData: colocoloTitulosData,
  presupuestoOverlayByYear: colocoloPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'colocolo-cl-estados-financieros-2024': {
      id:'colocolo-cl-estados-financieros-2024', clubId:'colocolo-cl',
      title:'Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales, ejercicios terminados al 31 de diciembre de 2024 y 2023',
      type:'official_balance_sheet', reliability:'primary',
    },
  'colocolo-cl-estados-financieros-2023': {
      id:'colocolo-cl-estados-financieros-2023', clubId:'colocolo-cl',
      title:'Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales, ejercicios terminados al 31 de diciembre de 2023 y 2022',
      type:'official_balance_sheet', reliability:'primary',
    },
  'colocolo-cl-estados-financieros-2022': {
      id:'colocolo-cl-estados-financieros-2022', clubId:'colocolo-cl',
      title:'Estados Financieros Consolidados de Blanco y Negro S.A. y Filiales, ejercicios terminados al 31 de diciembre de 2022 y 2021',
      type:'official_balance_sheet', reliability:'primary',
    },
});

gestionesByClub['colocolo-cl'] = {
  stohwing: { nombre:'Stohwing (2022-2024)', firstYear:2022, lastYear:2023 },
  mosa3: { nombre:'Mosa (2024-actual, 3er período)', firstYear:2024, lastYear:2024 },
};

memberCountByClub['colocolo-cl'] = null;
