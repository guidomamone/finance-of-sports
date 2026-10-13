const gironaesRevenueLinesByYear = {
  2020: [
    { rawLabel:'Importe neto de la cifra de negocios (ventas + prestación de servicios, sin desglosar por concepto)', normalizedCategory:'lump_football_operations', amountNative:14.998072, disclosureLevel:'summary', items:[
      ['Ventas', 1.912708], ['Prestación de servicios', 13.085364],
    ]},
    { rawLabel:'Ingresos accesorios y otros de gestión corriente', normalizedCategory:'other_income', amountNative:11.542128, disclosureLevel:'summary' },
    { rawLabel:'Subvenciones de explotación incorporadas al resultado del ejercicio', normalizedCategory:'other_income', amountNative:0.140148, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.205030, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_income', amountNative:0.021034, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Importe neto de la cifra de negocios (ventas + prestación de servicios, sin desglosar por concepto)', normalizedCategory:'lump_football_operations', amountNative:110.914404, disclosureLevel:'summary', items:[
      ['Ventas', 12.231604], ['Prestación de servicios', 98.682799],
    ]},
    { rawLabel:'Ingresos accesorios y otros de gestión corriente', normalizedCategory:'other_income', amountNative:32.239210, disclosureLevel:'summary' },
    { rawLabel:'Subvenciones de explotación incorporadas al resultado del ejercicio', normalizedCategory:'other_income', amountNative:0.586357, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.205030, disclosureLevel:'detailed' },
  ],
};

const gironaesExpenseLinesByYear = {
  2020: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-0.646276, disclosureLevel:'detailed', items:[
      ['Consumo de mercaderías', -0.241531], ['Consumo de materias primas y otras materias consumibles', -0.051202], ['Deterioro de mercaderías, materias primas y otros aprovisionamientos', -0.353543],
    ]},
    { rawLabel:'Gastos de personal (sin separar plantel deportivo/no deportivo)', normalizedCategory:'wages_squad', amountNative:-24.012792, disclosureLevel:'summary', items:[
      ['Sueldos, salarios y asimilados', -22.924071], ['Cargas sociales', -1.088722],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-7.704090, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.185053, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales (residuo contra el subtotal impreso, ver comentario de cabecera)', normalizedCategory:'other_expenses', amountNative:-5.957272, disclosureLevel:'summary' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-0.353500, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (sin separar jugadores del resto)', normalizedCategory:'player_amortisation', amountNative:-5.016471, disclosureLevel:'summary' },
  ],
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-1.904535, disclosureLevel:'detailed', items:[
      ['Consumo de mercaderías', -1.329562], ['Consumo de materias primas y otras materias consumibles', -0.199452], ['Deterioro de mercaderías, materias primas y otros aprovisionamientos', -0.375520],
    ]},
    { rawLabel:'Gastos de personal (sin separar plantel deportivo/no deportivo)', normalizedCategory:'wages_squad', amountNative:-76.622458, disclosureLevel:'summary', items:[
      ['Sueldos, salarios y asimilados', -73.538510], ['Cargas sociales', -3.083948],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-20.849309, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.646909, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-24.883181, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (sin separar jugadores del resto; CORREGIDO por OCR, ver comentario de cabecera)', normalizedCategory:'player_amortisation', amountNative:-18.423581, disclosureLevel:'summary' },
    { rawLabel:'Otros resultados (negativo este ejercicio)', normalizedCategory:'other_expenses', amountNative:-0.174023, disclosureLevel:'detailed' },
  ],
};

const gironaesFiscalYearMeta = {
  2020: {
    currency:'EUR', fxRef:'EUR@2020-06-30',
    sourceId:'girona-es-cuentas-anuales-2019-20',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:3.167000, cash:3.856412,
    netInterest:-0.041956, tax:-0.025772, profitOnPlayerSales:17.002692, assetSales:0,
    officialTotalRevenue:26.906411, officialTotalExpenses:43.875455, officialPAT:-0.034080,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'girona-es-informe-auditoria-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:47.221000, cash:11.121773,
    netInterest:-1.004234, tax:-5.502496, profitOnPlayerSales:22.560578, assetSales:0,
    officialTotalRevenue:143.945001, officialTotalExpenses:143.503997, officialPAT:16.494852,
  },
};

const gironaesPresupuestoOverlayByYear = {};

const gironaesPasesData = [];
const gironaesResultadosData = {};
const gironaesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['girona-es'] = {
  revenueLinesByYear: gironaesRevenueLinesByYear, expenseLinesByYear: gironaesExpenseLinesByYear,
  fiscalYearMeta: gironaesFiscalYearMeta, pasesData: gironaesPasesData,
  resultadosData: gironaesResultadosData, titulosData: gironaesTitulosData,
  presupuestoOverlayByYear: gironaesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'girona-es-cuentas-anuales-2019-20': {
      id:'girona-es-cuentas-anuales-2019-20', clubId:'girona-es',
      title:'Cuentas Anuales, Ejercicio cerrado el 30 de junio de 2020 (depósito estándar Registro Mercantil)',
      type:'official_balance_sheet', reliability:'primary',
    },
  'girona-es-informe-auditoria-cuentas-anuales-2024-25': {
      id:'girona-es-informe-auditoria-cuentas-anuales-2024-25', clubId:'girona-es',
      title:'Informe de Auditoría y Cuentas Anuales 2024-2025',
      type:'official_balance_sheet', reliability:'primary',
    },
});

gestionesByClub['girona-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2020, lastYear:2025 },
};

memberCountByClub['girona-es'] = null;
