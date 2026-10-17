const boyacachicocoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Taquilla Venta Boletería Masculina', normalizedCategory:'matchday_competition', amountNative:460.308700, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla Venta Boletería Femenina', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de Televisión', normalizedCategory:'broadcasting', amountNative:6463.513089, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auxilio Hotelero – Dimayor', normalizedCategory:'broadcasting', amountNative:416.434550, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auxilio de Transportes – Dimayor', normalizedCategory:'broadcasting', amountNative:85.470260, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auxilio de Arbitraje – Dimayor', normalizedCategory:'broadcasting', amountNative:255.763849, disclosureLevel:'detailed' },
    { rawLabel:'Ventas por Auxilio de Logística – Dimayor', normalizedCategory:'broadcasting', amountNative:152.900000, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Auxilio de Mejoramientos – Dimayor', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Fondo de Equipos', normalizedCategory:'broadcasting', amountNative:216.862481, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Auxilios – Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Patrocinios recibidos de terceros', normalizedCategory:'sponsorship_commercial', amountNative:16.635000, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Servicios de Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1475.415287, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Videos Oficiales Apuestas 2024', normalizedCategory:'sponsorship_commercial', amountNative:84.434550, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Abonados con Boyacá', normalizedCategory:'season_tickets', amountNative:225.882354, disclosureLevel:'detailed' },
    { rawLabel:'Menos: Devoluciones (sin atribuir)', normalizedCategory:'other_income', amountNative:-1726.052997, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos no operacionales (descuentos, pasarelas, indemnizaciones, diversos)', normalizedCategory:'other_income', amountNative:137.020364, disclosureLevel:'detailed', items:[
      ['Descuentos comerciales', 0.000001], ['Pasarelas', 2.489681], ['Indemnizaciones', 36.551426], ['Diversos', 97.979256],
    ]},
  ],
};

const boyacachicocoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Costos Nóminas Jugadores Masculinos', normalizedCategory:'wages_squad', amountNative:-4303.480269, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración (personal, honorarios, arrendamientos, seguros, servicios, legales, mantenimiento, diversos)', normalizedCategory:'admin_general_expense', amountNative:-2056.497355, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1169.847444], ['Diversos', 558.297251], ['Honorarios', 202.789588], ['Gastos legales', 98.860419], ['Arrendamientos', 5.821140], ['Seguros', 2.044611], ['Servicios', 17.949902], ['Mantenimiento y reparaciones', 0.887000],
    ]},
    { rawLabel:'Gastos de Administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-458.451061, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Depreciación', normalizedCategory:'depreciation', amountNative:-88.526496, disclosureLevel:'detailed' },
    { rawLabel:'Otros egresos no operacionales: Gastos diversos', normalizedCategory:'other_expenses', amountNative:-11.266696, disclosureLevel:'detailed' },
  ],
};

const boyacachicocoFiscalYearMeta = {
  2024: {
    currency:'COP', fxRef:'COP@2024-12-31',
    sourceId:'boyacachico-co-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-257.027005,
    tax:-381.268512,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:666.527066, cash:441.174314,
    officialTotalRevenue:8264.587487, officialTotalExpenses:6918.221877, officialPAT:708.070093,
  },
};

const boyacachicocoPresupuestoOverlayByYear = {};

const boyacachicocoPasesData = [];
const boyacachicocoResultadosData = {};
const boyacachicocoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['boyacachico-co'] = {
  revenueLinesByYear: boyacachicocoRevenueLinesByYear, expenseLinesByYear: boyacachicocoExpenseLinesByYear,
  fiscalYearMeta: boyacachicocoFiscalYearMeta, pasesData: boyacachicocoPasesData,
  resultadosData: boyacachicocoResultadosData, titulosData: boyacachicocoTitulosData,
  presupuestoOverlayByYear: boyacachicocoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'boyacachico-co-estados-financieros-2024': {
      id:'boyacachico-co-estados-financieros-2024', clubId:'boyacachico-co',
      title:'Estados Financieros (Notas), al 31 de diciembre de 2024 y 2023',
      type:'official_balance_sheet', reliability:'primary',
    },
});

gestionesByClub['boyacachico-co'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['boyacachico-co'] = null;
