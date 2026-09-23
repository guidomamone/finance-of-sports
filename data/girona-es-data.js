// ============================================================================
// data/girona-es-data.js — Girona Futbol Club, S.A.D. Ejercicios 2019/2020
// (1/7/2019 a 30/6/2020) y 2024/2025 (1/7/2024 a 30/6/2025).
//
// AÑOS NO CONSECUTIVOS a propósito: son los 2 únicos ejercicios reales
// descargados en esta sesión (ver fuentes/España/Girona FC.md), con un hueco
// grande en el medio (2020-21 a 2023-24 pendientes). El ejercicio 2019/2020
// (Segunda División, ver data/club-leagues/es.js) muestra a Girona recién
// descendido de LaLiga con un revenue de apenas EUR 27 M; el 2024/2025
// (LaLiga, clasificado a Champions League por su 3° puesto en 2023/24) muestra
// un salto a EUR 144 M — el contraste es real, no un error de carga.
//
// Fuente: `Clubes/España/Girona FC/cuentas-anuales-2019-2020.pdf` (30 págs.,
// depósito estándar Registro Mercantil) e `informe-auditoria-cuentas-anuales-
// 2024-2025.pdf` (177 págs., firmado electrónicamente vía Signaturit). Los dos
// son escaneos con bastante ruido de OCR en la transcripción (`.md` homónimos,
// misma carpeta) — varios números de la cuenta de pérdidas y ganancias no
// reconciliaban contra su propio subtotal impreso por dígitos mal leídos; se
// resolvieron usando el subtotal impreso como ancla y despejando el residuo
// (ver comentarios puntuales abajo), método de club-data-mapping SKILL.md
// sección 6.
//
// Cifras en EUR MILLONES nativos. Tipo de cambio: el ejercicio 2024/2025 usa
// `fxRef:'EUR@2025-06-30'` (ya en data/currency-map.js). El ejercicio
// 2019/2020 (cierre 30/6/2020) usa `fxRef:'EUR@2020-06-30'`, que TODAVÍA NO
// EXISTE en FX_CLOSE — queda un `console.warn` hasta que se agregue esa
// entrada centralmente (avisado en el reporte de esta sesión, NO se edita acá
// data/currency-map.js).
//
// CATEGORIZACIÓN (documento de BAJO desglose los 2 años, distinto de Getafe/
// Espanyol): "Importe neto de la cifra de negocios" solo separa "Ventas" de
// "Prestaciones de servicios", sin desglosar por concepto (TV/sponsors/
// matchday) -> se cargó como bolsón `lump_football_operations` (mismo criterio
// que Villarreal CF, único documento español previo con esta misma limitación).
// "Ingresos accesorios y otros de gestión corriente" es una línea MUY grande
// los 2 años (11,5 M en 2019/20, un 43% del revenue; 32,2 M en 2024/25, un 22%)
// sin más desglose disponible en el documento -> other_income, con una duda
// abierta en Admin/dudas-por-club.md sobre qué compone este monto (posible
// distribución de derechos de TV agrupada, o ingresos comerciales del CFG).
// "Gastos de personal" no separa plantel deportivo del resto -> wages_squad
// entero (mismo criterio que Villarreal). "Amortización del inmovilizado" no
// separa jugadores del resto -> player_amortisation entero (mismo criterio que
// Villarreal, aproximación documentada, no una separación real). "Deterioro y
// resultado por enajenaciones del inmovilizado" (ganancia neta, casi
// enteramente "Resultados por enajenaciones y otras") -> profitOnPlayerSales.
//
// CORRECCIONES DE OCR (usando el subtotal impreso como ancla, ver arriba):
// - 2019/20: dentro de "Otros gastos de explotación" (-14.199.915,22 impreso),
//   el sub-ítem sin etiqueta legible ("Pérdidas, deterioro y variación de
//   provisiones por operaciones comerciales") se leyó -5.967.271,79, pero la
//   suma con los otros 3 sub-ítems legibles daba -14.209.915,22 (10.000,00 de
//   más) — se usó el residuo exacto, -5.957.271,79, probable transposición de
//   dígitos "6"/"5" en el escaneo.
// - 2024/25: "Amortización del inmovilizado" se leyó -15.423.581,30, pero A.1)
//   RESULTADO DE EXPLOTACIÓN solo reconcilia exacto (23.001.581,87 impreso) con
//   -18.423.581,30 (3.000.000,00 de diferencia, primer dígito "1"/"8" mal
//   leído) — se usó el valor reconciliado.
// - 2024/25: "13. Otros resultados" imprime -174.023,44 (gasto, a diferencia
//   de 2019/20 donde era ingreso) — verificado contra la cadena A.1->A.2->A.3
//   completa, sin ajuste necesario ahí.
//
// VERIFICACIÓN Ejercicio 2019/2020: Revenue 26,906411 M - Expenses cash
// 38,858983 M - Non-cash 5,016471 M = -16,969043 M; + profitOnPlayerSales
// 17,002692 M = 0,033649 M ≈ A.1) RESULTADO DE EXPLOTACIÓN impreso (33.647,37)
// EXACTO (dentro de redondeo); + netInterest -0,041956 M = -0,008307 M ≈ A.3)
// RESULTADO ANTES DE IMPUESTOS impreso (-8.308,52) EXACTO; + tax -0,025772 M =
// -0,034079 M ≈ A.5) RESULTADO DEL EJERCICIO impreso (-34.080,18) EXACTO.
//
// VERIFICACIÓN Ejercicio 2024/2025 (con la corrección de amortización de
// arriba): Revenue 143,945001 M - Expenses cash 125,080416 M - Non-cash
// 18,423581 M = 0,441004 M; + profitOnPlayerSales 22,560578 M = 23,001582 M ≈
// A.1) impreso (23.001.581,87) EXACTO; + netInterest -1,004234 M =
// 21,997348 M ≈ A.3) impreso (21.997.348,15) EXACTO; + tax -5,502496 M =
// 16,494852 M ≈ A.5) RESULTADO DEL EJERCICIO impreso (16.494.851,95) EXACTO.
// ============================================================================

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
    currency:'EUR', fxRef:'EUR@2020-06-30', // OJO: esta entrada TODAVÍA NO EXISTE en FX_CLOSE (data/currency-map.js) — console.warn hasta que se agregue.
    sourceId:'girona-es-cuentas-anuales-2019-20',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = "Deudas a largo plazo" (0,195 M) + "Deudas a corto plazo" (2,972 M), del Balance
    // Abreviado (tabla en miles de EUR, Anexo comparativo 30/06/2019 vs 30/06/2020, columna 2020).
    // cash = "Efectivo y otros activos líquidos equivalentes" del balance principal.
    grossDebt:3.167000, cash:3.856412,
    netInterest:-0.041956, tax:-0.025772, profitOnPlayerSales:17.002692, assetSales:0,
    officialTotalRevenue:26.906411, officialTotalExpenses:43.875455, officialPAT:-0.034080,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'girona-es-informe-auditoria-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = "Deudas a largo plazo" (26,675 M) + "Deudas a corto plazo" (20,546 M), del cuadro
    // comparativo en miles de EUR (Balance Abreviado, columna 30/06/2025). Una nota de deuda
    // financiera aparte del documento cita 42,210250 M para "Deudas a largo plazo" en un contexto
    // distinto (posible neto de una porción, no investigado a fondo esta sesión) — se usó la cifra
    // del Balance principal por consistencia con el resto de los clubes cargados. cash = "Efectivo y
    // otros activos líquidos equivalentes" del balance principal.
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
      note:'PDF oficial, escaneo con ruido de OCR en la transcripción. Un sub-ítem de "Otros gastos de explotación" se reconstruyó por residuo contra el subtotal impreso (probable dígito mal leído, ver comentario de cabecera de data/girona-es-data.js). Bajado vía statics-maker.llt-services.com/gir/ (mismo backend de CMS que otros clubes de LaLiga). Transcripción completa en Clubes/España/Girona FC/cuentas-anuales-2019-2020.md.',
    },
  'girona-es-informe-auditoria-cuentas-anuales-2024-25': {
      id:'girona-es-informe-auditoria-cuentas-anuales-2024-25', clubId:'girona-es',
      title:'Informe de Auditoría y Cuentas Anuales 2024-2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, escaneo con ruido de OCR en la transcripción. "Amortización del inmovilizado" se corrigió por residuo contra RESULTADO DE EXPLOTACIÓN impreso (diferencia de exactamente EUR 3.000.000, ver comentario de cabecera de data/girona-es-data.js). Bajado vía statics-maker.llt-services.com/gir/. Transcripción completa en Clubes/España/Girona FC/informe-auditoria-cuentas-anuales-2024-2025.md.',
    },
});

gestionesByClub['girona-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2020, lastYear:2025 },
};

memberCountByClub['girona-es'] = null; // no investigado en esta sesión (alcance: solo Finanzas)
