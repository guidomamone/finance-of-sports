const rayovallecanoesRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:1.990519, disclosureLevel:'summary' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:3.155612, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:43.206514, disclosureLevel:'summary' },
    { rawLabel:'Ingresos por comercialización', normalizedCategory:'sponsorship_commercial', amountNative:0.557798, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:7.107280, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (accesorios, gestión corriente y subvenciones)', normalizedCategory:'other_income', amountNative:1.974943, disclosureLevel:'detailed', items:[
      ['Ingresos accesorios y otros de gestión corriente', 0.472629], ['Subvenciones de explotación incorporadas al resultado del ejercicio', 1.502314],
    ]},
    { rawLabel:'Excesos de provisiones', normalizedCategory:'other_income', amountNative:0.470250, disclosureLevel:'detailed' },
  ],
};

const rayovallecanoesExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-1.291365, disclosureLevel:'detailed', items:[
      ['Compras de material deportivo', -1.042489], ['Otros consumos', -0.248876],
    ]},
    { rawLabel:'Gastos de personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-0.503022, disclosureLevel:'detailed', items:[
      ['Sueldos y salarios del personal no deportivo', -0.358913], ['Indemnizaciones al personal no deportivo', -0.003500], ['Seguridad social del personal no deportivo', -0.132114], ['Cargas Sociales', -0.008494],
    ]},
    { rawLabel:'Gastos plantilla deportiva (inscribible y no inscribible en la LFP)', normalizedCategory:'wages_squad', amountNative:-34.816465, disclosureLevel:'detailed', items:[
      ['Plantilla deportiva inscribible en la LFP', -32.444508, [
        ['Sueldos y salarios', -30.615356], ['Seguridad social', -0.545327], ['Primas colectivas', -1.283825],
      ]],
      ['Plantilla deportiva no inscribible en la LFP', -2.371957, [
        ['Sueldos y salarios', -1.837668], ['Indemnizaciones', -0.004000], ['Seguridad social', -0.286647], ['Primas colectivas', -0.243642],
      ]],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-6.783907, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.015975, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-0.513980, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores (plantilla inscribible y no inscribible en la LFP)', normalizedCategory:'other_expenses', amountNative:-4.643000, disclosureLevel:'detailed', items:[
      ['Inscribible en la LFP', -4.625000], ['No inscribible en la LFP', -0.018000],
    ]},
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-1.338815, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-1.280966, disclosureLevel:'detailed' },
    { rawLabel:'Amortización derechos adquisición de jugadores (inscribible y no inscribible en la LFP)', normalizedCategory:'player_amortisation', amountNative:-7.038446, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'other_amortisation', amountNative:-0.003330, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_expenses', amountNative:-0.230713, disclosureLevel:'detailed' },
  ],
};

const rayovallecanoesFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30', fxSource:'market_close',
    sourceId:'rayovallecano-es-informe-auditoria-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'martinpresa',
    netInterest:-0.043410, tax:0.053444, profitOnPlayerSales:1.500000, assetSales:0,
    grossDebt:1.202364, cash:39.714987,
    officialTotalRevenue:58.462916, officialTotalExpenses:58.459984, officialPAT:1.512965,
  },
};

const rayovallecanoesPresupuestoOverlayByYear = {};

const rayovallecanoesPasesData = [];
const rayovallecanoesResultadosData = {};
const rayovallecanoesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rayovallecano-es'] = {
  revenueLinesByYear: rayovallecanoesRevenueLinesByYear, expenseLinesByYear: rayovallecanoesExpenseLinesByYear,
  fiscalYearMeta: rayovallecanoesFiscalYearMeta, pasesData: rayovallecanoesPasesData,
  resultadosData: rayovallecanoesResultadosData, titulosData: rayovallecanoesTitulosData,
  presupuestoOverlayByYear: rayovallecanoesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rayovallecano-es-informe-auditoria-cuentas-anuales-2024-25': {
    id:'rayovallecano-es-informe-auditoria-cuentas-anuales-2024-25', clubId:'rayovallecano-es',
    title:'Informe de Auditoría, Cuentas Anuales e Informe de Gestión del ejercicio cerrado a 30 de junio de 2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'PDF oficial (50 págs., con capa de texto real, sin necesidad de OCR). OPINIÓN DE AUDITORÍA CON SALVEDADES (AUDRIA, S.L.): el auditor no pudo confirmar la valoración del derecho de uso sobre el Campo de Fútbol de Vallecas (Convenio con la Comunidad de Madrid, 5/7/2019) por no haber recibido una tasación de un experto independiente — es una salvedad de VALORACIÓN DE ACTIVO (posible derecho de concesión del estadio no reconocido o mal valorado en el Balance), no afecta directamente los ingresos/gastos operativos cargados en este archivo. La Cuenta de Pérdidas y Ganancias perdió los números de su sección financiera/impositiva en la transcripción (quedaron solo etiquetas); netInterest se reconstruyó por residuo cruzando el Resultado del Ejercicio (impreso 2 veces) contra el gasto/ingreso por impuesto de la memoria — ver comentario de cabecera de data/rayovallecano-es-data.js para el detalle completo. Encontrado por búsqueda directa del PDF, host statics-maker.llt-services.com/ray/. Transcripción completa en Clubes/España/Rayo Vallecano/informe-auditoria-cuentas-anuales-2024-2025.md.',
  },
});

gestionesByClub['rayovallecano-es'] = {
  martinpresa: { nombre:'Martín Presa', firstYear:2025, lastYear:2025 },
};

memberCountByClub['rayovallecano-es'] = null;
