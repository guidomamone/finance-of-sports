const unionmagdalenaCoRevenueLinesByYear = {
  2018: [
    { rawLabel:'Taquilla - Venta de Boletería', normalizedCategory:'matchday_competition', amountNative:1997.253, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:167.202, disclosureLevel:'detailed' },
    { rawLabel:'Préstamo Derechos Deportivos', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Participación Dimayor', normalizedCategory:'broadcasting', amountNative:4016.426, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de Ingreso Dimayor', normalizedCategory:'broadcasting', amountNative:239.521, disclosureLevel:'detailed' },
    { rawLabel:'Participación Federación Colombiana de Fútbol', normalizedCategory:'competition_bonus', amountNative:485.600, disclosureLevel:'detailed' },
    { rawLabel:'Venta de Artículos Deportivos', normalizedCategory:'sponsorship_commercial', amountNative:77.798, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de partido', normalizedCategory:'matchday_competition', amountNative:66.190, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (recuperaciones, descuento comercial, diversos)', normalizedCategory:'other_income', amountNative:113.286, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 40.496], ['Descuento comercial', 0.500], ['Diversos', 72.290],
    ]},
  ],
};

const unionmagdalenaCoExpenseLinesByYear = {
  2018: [
    { rawLabel:'Gastos Operacionales: Gastos del Personal (plantel)', normalizedCategory:'wages_squad', amountNative:-3250.748, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales: Organización y logística (arriendos, servicios, mantenimiento, viajes, logística de eventos)', normalizedCategory:'match_organisation_expense', amountNative:-1210.410, disclosureLevel:'detailed', items:[
      ['Arriendos', 192.226], ['Servicios', 41.378], ['Mantenimiento', 1.300], ['Gastos de viaje', 230.720], ['Diversos - Logística y preparación eventos', 744.786],
    ]},
    { rawLabel:'Gastos Operacionales: Administración del plantel (impuestos, contribuciones y afiliaciones, legales)', normalizedCategory:'admin_general_expense', amountNative:-784.796, disclosureLevel:'detailed', items:[
      ['Impuestos', 193.835], ['Contribuciones y Afiliaciones', 577.808], ['Gastos Legales', 13.153],
    ]},
    { rawLabel:'Gastos Operacionales: Amortizaciones Derechos Deportivos (costo transferencia de jugadores)', normalizedCategory:'player_amortisation', amountNative:-113.988, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales: Costo de Venta Mercancía no Fabricada', normalizedCategory:'other_expenses', amountNative:-40.600, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, servicios, legales, mantenimiento, adecuaciones, viajes)', normalizedCategory:'admin_general_expense', amountNative:-903.738, disclosureLevel:'detailed', items:[
      ['Gasto de Personal', 462.732], ['Honorarios', 92.298], ['Impuestos', 116.035], ['Arrendamientos', 14.769], ['Contribuciones y Afiliaciones', 0], ['Seguros', 9.580], ['Servicios', 94.931], ['Gastos Legales', 3.859], ['Mantenimiento y Reparaciones', 38.337], ['Adecuaciones e Instalaciones', 0], ['Gastos de Viaje', 71.197],
    ]},
    { rawLabel:'Depreciaciones y Amortizaciones (combinado, sin desglosar en el documento)', normalizedCategory:'depreciation', amountNative:-81.367, disclosureLevel:'detailed' },
    { rawLabel:'Otros Gastos (diversos, provisiones, bancarios, extraordinarios)', normalizedCategory:'other_expenses', amountNative:-84.585, disclosureLevel:'detailed', items:[
      ['Diversos', 28.040], ['Provisiones', 0], ['Gastos Bancarios', 22.468], ['Gastos Extraordinarios', 34.077], ['Gastos Diversos', 0],
    ]},
  ],
};

const unionmagdalenaCoFiscalYearMeta = {
  2018: {
    currency:'COP', fxRef:'COP@2018-12-31',
    sourceId:'unionmagdalena-co-estados-financieros-2018',
    reportType:'official_balance_sheet',
    gestionId:'sin_confirmar',
    netInterest:-59.188,
    tax:-348.114,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:1058.314, cash:1494.693,
    officialTotalRevenue:7163.276, officialTotalExpenses:6470.232, officialPAT:285.742,
  },
};

const unionmagdalenaCoPresupuestoOverlayByYear = {};

const unionmagdalenaCoPasesData = [];
const unionmagdalenaCoResultadosData = {};
const unionmagdalenaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['unionmagdalena-co'] = {
  revenueLinesByYear: unionmagdalenaCoRevenueLinesByYear, expenseLinesByYear: unionmagdalenaCoExpenseLinesByYear,
  fiscalYearMeta: unionmagdalenaCoFiscalYearMeta, pasesData: unionmagdalenaCoPasesData,
  resultadosData: unionmagdalenaCoResultadosData, titulosData: unionmagdalenaCoTitulosData,
  presupuestoOverlayByYear: unionmagdalenaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'unionmagdalena-co-estados-financieros-2018': {
      id:'unionmagdalena-co-estados-financieros-2018', clubId:'unionmagdalena-co',
      title:'Estados Financieros (Situación Financiera, Resultado Integral, Cambios en el Patrimonio y Flujo de Efectivo), al 31 de diciembre de 2018 y 2017',
      type:'official_balance_sheet', reliability:'primary',
    },
});

gestionesByClub['unionmagdalena-co'] = {
  sin_confirmar: { nombre:'Sin confirmar', firstYear:2018, lastYear:2018 },
};

memberCountByClub['unionmagdalena-co'] = null;
