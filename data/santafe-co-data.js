const santafecoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Taquilla Venta De Boletería/Abonos', normalizedCategory:'matchday_competition', amountNative:27252.794113, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1948.104553, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:8701.653103, disclosureLevel:'detailed' },
    { rawLabel:'Dimayor', normalizedCategory:'broadcasting', amountNative:13028.917487, disclosureLevel:'detailed' },
    { rawLabel:'Federación Colombiana De Futbol', normalizedCategory:'competition_bonus', amountNative:1226.151540, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos', normalizedCategory:'player_sales', amountNative:611.187078, disclosureLevel:'detailed' },
    { rawLabel:'Prestamos Jugadores', normalizedCategory:'player_sales', amountNative:234.084888, disclosureLevel:'detailed' },
    { rawLabel:'Exterior Mecanismo De Solidaridad', normalizedCategory:'player_sales', amountNative:198.169183, disclosureLevel:'detailed' },
    { rawLabel:'Regalías', normalizedCategory:'sponsorship_commercial', amountNative:22.096216, disclosureLevel:'detailed' },
    { rawLabel:'Divisiones Menores', normalizedCategory:'youth_football', amountNative:322.850328, disclosureLevel:'detailed' },
    { rawLabel:'Escuelas de formación', normalizedCategory:'youth_football', amountNative:4931.985002, disclosureLevel:'detailed' },
    { rawLabel:'Comercio al por mayor y al por menor (Ropa Deportiva)', normalizedCategory:'sponsorship_commercial', amountNative:452.838972, disclosureLevel:'detailed' },
    { rawLabel:'Equipo Profesional Femenino', normalizedCategory:'womens_football', amountNative:622.606265, disclosureLevel:'detailed' },
    { rawLabel:'Participación Eventos Internacionales', normalizedCategory:'competition_bonus', amountNative:3776.594500, disclosureLevel:'detailed' },
    { rawLabel:'Dev Venta de ropa deportiva', normalizedCategory:'sponsorship_commercial', amountNative:-8.968078, disclosureLevel:'detailed' },
    { rawLabel:'Dev Divisiones Menores', normalizedCategory:'youth_football', amountNative:-6.235100, disclosureLevel:'detailed' },
    { rawLabel:'Ajuste de reconciliación contra el total impreso de la Nota 21 (diferencia no explicada por ninguna línea visible en el documento)', normalizedCategory:'other_income', amountNative:-2294.550661, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos (ingresos método de participación, arrendamientos, recuperaciones, indemnizaciones, ejercicios anteriores, utilidad venta PP&E, comisiones, devoluciones, diversos)', normalizedCategory:'other_income', amountNative:6635.226012, disclosureLevel:'detailed', items:[
      ['Ingresos Método De Participación', 1015.586382], ['Arrendamientos', 745.757678], ['Recuperaciones', 2273.661424], ['Indemnizaciones', 1744.180308], ['Ingresos De Ejercicios Anteriores', 57.990332], ['Utilidad En Venta De Propiedades Planta Y Equipo', 0], ['Comisiones', 100.841128], ['Devoluciones, Rebajas Y Descuentos En Otras Ventas', -1446.000000], ['Diversos', 2143.208760],
    ]},
  ],
};

const santafecoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Gastos de Administración (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, servicios, legales, mantenimiento, reparaciones locativas, viajes)', normalizedCategory:'admin_general_expense', amountNative:-4429.482451, disclosureLevel:'detailed', items:[
      ['Gastos de Personal', -3179.845206], ['Honorarios', -137.069068], ['Impuestos', -664.712923], ['Arrendamientos', -19.908658], ['Contribuciones y Afiliaciones', -1.448500], ['Seguros', -0.830920], ['Servicios', -332.910657], ['Gastos Legales', -12.610490], ['Mantenimientos y Reparaciones', -15.940618], ['Reparaciones Locativas', -14.855706], ['Gastos de Viaje', -49.349705],
    ]},
    { rawLabel:'Gastos de Administración: Depreciación y Amortización (PP&E)', normalizedCategory:'depreciation', amountNative:-210.327775, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Diversos y Provisiones y Litigios', normalizedCategory:'other_expenses', amountNative:-69.732325, disclosureLevel:'detailed', items:[
      ['Diversos relacionados con la operación', -65.732325], ['Provisiones y Litigios', -4.000000],
    ]},
    { rawLabel:'Gastos de Venta: Gastos de Personal', normalizedCategory:'wages_squad', amountNative:-37547.995510, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: Bonificaciones y convenios (parte de "Diversos: Otros gastos de funcionamiento deportivo")', normalizedCategory:'wages_squad', amountNative:-3445.271359, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: transferencias de jugadores (amortización de intangibles, préstamos, % venta jugadores, acuerdos de colaboración y solidaridad, inscripciones y transferencias, derechos de formación)', normalizedCategory:'player_amortisation', amountNative:-1183.530642, disclosureLevel:'detailed', items:[
      ['Amortización Intangibles (Depreciaciones y Amortizaciones)', -639.500588], ['Prestamos Jugadores', -143.912000], ['% Venta de jugadores', -24.041934], ['Acuerdos de colaboración y solidaridad', -192.473675], ['Inscripciones y Transferencias', -113.988000], ['Derechos de Formación', -69.614445],
    ]},
    { rawLabel:'Gastos de Venta: organización y logística (impuestos IDRD, arrendamientos, contribuciones y tasas de arriendo, servicios, mantenimiento, adecuación, viajes, sanciones deportivas, inscripciones a torneos)', normalizedCategory:'match_organisation_expense', amountNative:-15094.452895, disclosureLevel:'detailed', items:[
      ['Impuestos', -2493.675011], ['Arrendamientos', -1643.079036], ['Contribuciones y Afiliaciones', -3955.882542], ['Servicios', -3746.057748], ['Mantenimiento y Reparaciones', -300.902063], ['Adecuación e instalación', -32.784703], ['Gastos de Viaje', -2444.563326], ['Sanciones Deportivas', -394.916116], ['Inscripciones a torneos', -82.592350],
    ]},
    { rawLabel:'Gastos de Venta: Imagen y publicidad', normalizedCategory:'admin_general_expense', amountNative:-144.000000, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: Auxilio deportivo Divisiones Menores', normalizedCategory:'youth_other_sports_expense', amountNative:-74.657600, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta: Depreciaciones (PP&E)', normalizedCategory:'depreciation', amountNative:-367.626469, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Venta (honorarios, seguros, legales, ARL, diversos no deportivos: comisiones, elementos de aseo, papelería, combustibles, casino, parqueaderos)', normalizedCategory:'admin_general_expense', amountNative:-1666.625367, disclosureLevel:'detailed', items:[
      ['Honorarios', -214.630180], ['Seguros', -256.523404], ['Gastos Legales', -23.889002], ['ARL Vigencias anteriores', -1.106900], ['Comisiones', -942.224905], ['Gastos De Representación Y Relaciones Publicas', -4.948472], ['Elementos De Aseo Y Cafetería', -23.203230], ['Útiles, Papelería Y Fotocopias', -13.285547], ['Combustibles Y Lubricantes', -75.378379], ['Taxis Y Buses', -0.110000], ['Casino Y Restaurante', -106.486518], ['Parqueaderos', -4.358830], ['Adecuaciones Sede Tenjo', -0.480000],
    ]},
    { rawLabel:'Otros Gastos (pérdidas método de participación, gastos extraordinarios, gastos diversos)', normalizedCategory:'other_expenses', amountNative:-922.400138, disclosureLevel:'detailed', items:[
      ['Pérdidas Método De Participación', -1.856881], ['Gastos Extraordinarios', -288.775653], ['Gastos Diversos', -631.767604],
    ]},
    { rawLabel:'Costo de venta de mercancía para la venta', normalizedCategory:'other_expenses', amountNative:-275.573900, disclosureLevel:'detailed' },
    { rawLabel:'Costo de venta de boletería', normalizedCategory:'match_organisation_expense', amountNative:-172.931543, disclosureLevel:'detailed' },
  ],
};

const santafecoFiscalYearMeta = {
  2025: {
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'santafe-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1052.293049,
    tax:972.728987,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:4645.154895, cash:684.927123,
    officialTotalRevenue:67655.505401, officialTotalExpenses:65604.607974, officialPAT:1971.333366,
  },
};

const santafecoPresupuestoOverlayByYear = {};

const santafecoPasesData = [];
const santafecoResultadosData = {};
const santafecoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['santafe-co'] = {
  revenueLinesByYear: santafecoRevenueLinesByYear, expenseLinesByYear: santafecoExpenseLinesByYear,
  fiscalYearMeta: santafecoFiscalYearMeta, pasesData: santafecoPasesData,
  resultadosData: santafecoResultadosData, titulosData: santafecoTitulosData,
  presupuestoOverlayByYear: santafecoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'santafe-co-estados-financieros-2025': {
      id:'santafe-co-estados-financieros-2025', clubId:'santafe-co',
      title:'Estado de Resultados Integral Separado y Notas a los Estados Financieros, al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 860009807). Texto nativo, incluye el Estado de Resultados Integral primario completo. El club está en proceso de reorganización (Ley 1116) ante Supersociedades; 11 registros distintos existen en SIIS bajo este NIT, solo se cargó el ejercicio más reciente (2025) esta sesión. El impuesto de renta diferido de 2025 fue un BENEFICIO neto (mayor al gasto corriente), lo que hizo que la Utilidad Neta terminara por encima de la Utilidad Operacional — ver comentario de cabecera de data/santafe-co-data.js. Transcripción completa en Clubes/Colombia/Independiente Santa Fe/estados-financieros-2025.md.',
    },
});

gestionesByClub['santafe-co'] = {
  actual: { nombre:'Gestión actual', firstYear:2025, lastYear:2025 },
};

memberCountByClub['santafe-co'] = null;
