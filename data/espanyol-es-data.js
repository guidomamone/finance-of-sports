// ============================================================================
// data/espanyol-es-data.js — R.C.D. Espanyol de Barcelona, S.A.D. Ejercicios
// 2023/2024 (1/7/2023 a 30/6/2024, jugado en Segunda División) y 2024/2025
// (1/7/2024 a 30/6/2025, jugado en LaLiga).
//
// Fuente: `Clubes/España/RCD Espanyol/cuentas-anuales-gestion-auditoria-2023-2024.pdf`
// (192 págs., texto nativo, sin OCR) y `cuentas-anuales-2024-2025.pdf` (199
// págs., escaneo con bastante ruido de OCR en la cuenta de pérdidas y
// ganancias transcripta a .md). Bajados de
// rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones, ver
// fuentes/España/RCD Espanyol.md.
//
// GOTCHA DE VERIFICACIÓN (2024/2025): la transcripción .md de este ejercicio
// tenía errores de OCR reales en varias cifras (algunos dígitos sueltos mal
// leídos, ej. "65.908.539,94" en vez de "66.968.539,94" en Prestaciones de
// servicios, o "8.722.640,49" en vez de "3.722.640,49" en Cargas sociales), y
// la parte final de la cuenta (Impuestos/Resultado del ejercicio) salió
// directamente ilegible en el .md ("ZBOIZASO", "22OBOUOTS"). Se re-renderizó
// la página 12 del PDF a imagen (pdftoppm -r 300) y se leyó directo con el
// Read tool para confirmar cada cifra — ver club-data-mapping SKILL.md
// sección 9. Todos los números de abajo para el ejercicio 2025 salen de esa
// lectura directa de imagen, no de la transcripción .md original (que sigue
// teniendo las cifras viejas sin corregir, uso interno solamente).
//
// Cifras en EUR MILLONES nativos. Tipo de cambio: `fxRef:'EUR@2024-06-30'` y
// `fxRef:'EUR@2025-06-30'` (ambas ya en data/currency-map.js), el documento no
// declara un tipo de cambio propio.
//
// CATEGORIZACIÓN (misma estructura los 2 años):
// - "Importe neto de la cifra de negocios" (Ventas + Prestaciones de
//   servicios, sin desglosar por concepto) -> lump_football_operations, mismo
//   criterio que Villarreal/Girona (documento de bajo desglose en este rubro).
// - "Otros ingresos de explotación" ("Ingresos accesorios y otros de gestión
//   corriente" + "Subvenciones de explotación") -> other_income.
// - "Excesos de provisiones" -> other_income.
// - "Deterioro y resultado por enajenaciones de inmovilizado" ("Resultados
//   por enajenaciones y otras", ganancia neta por venta de jugadores) ->
//   fiscalYearMeta.profitOnPlayerSales, NUNCA revenueLine.
// - "Otros resultados" (negativo los 2 años) -> other_expenses.
// - "Aprovisionamientos" (consumo de mercaderías/materias primas +/- deterioro)
//   -> other_expenses.
// - "Gastos de personal" (sin separar plantel deportivo/no deportivo, sueldos
//   + cargas sociales) -> wages_squad entero.
// - "Otros gastos de explotación": "Servicios exteriores"/"Tributos"/"Otros
//   gastos de gestión corriente" -> admin_general_expense; "Pérdidas,
//   deterioro y variación de provisiones por operaciones comerciales" ->
//   other_expenses (categoría real distinta, promovida a línea propia).
// - "Amortización del inmovilizado" (una sola cifra, sin separar jugadores del
//   resto) -> player_amortisation, aproximación documentada (mismo criterio
//   que Villarreal/Girona).
//
// VERIFICACIÓN Ejercicio 2023/2024 (documento de texto nativo, sin ambigüedad):
// Revenue 43,063621 M - Expenses cash 63,729789 M - Non-cash 13,940683 M =
// -34,606851 M; + profitOnPlayerSales 17,856025 M = -16,750826 M ≈ RESULTADO
// DE EXPLOTACIÓN impreso (-16.750.825,96) EXACTO; + netInterest -1,679707 M =
// -18,430533 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (-18.430.532,82)
// EXACTO; + tax +4,669345 M = -13,761188 M ≈ RESULTADO DEL EJERCICIO impreso
// (-13.761.188,15) EXACTO.
//
// VERIFICACIÓN Ejercicio 2024/2025 (re-leído de imagen, ver gotcha arriba):
// Revenue 71,996866 M - Expenses cash 78,027435 M - Non-cash 11,130548 M =
// -17,161117 M; + profitOnPlayerSales 22,620529 M = 5,459412 M ≈ RESULTADO DE
// EXPLOTACIÓN impreso (5.459.412,27) EXACTO; + netInterest -2,909888 M =
// 2,549524 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (2.549.524,59) EXACTO;
// + tax -0,252534 M = 2,296990 M ≈ RESULTADO DEL EJERCICIO impreso
// (2.296.990,73) EXACTO. Espanyol volvió a superávit en su primer ejercicio
// de vuelta en LaLiga.
// ============================================================================

const espanyolesRevenueLinesByYear = {
  2024: [
    { rawLabel:'Importe neto de la cifra de negocios (ventas + prestación de servicios, sin desglosar por concepto)', normalizedCategory:'lump_football_operations', amountNative:23.732370, disclosureLevel:'summary', items:[
      ['Ventas', 1.414299], ['Prestaciones de servicios', 22.318072],
    ]},
    { rawLabel:'Otros ingresos de explotación (ingresos accesorios y de gestión corriente, subvenciones)', normalizedCategory:'other_income', amountNative:19.268946, disclosureLevel:'summary', items:[
      ['Ingresos accesorios y otros de gestión corriente', 18.825139], ['Subvenciones de explotación incorporadas al resultado del ejercicio', 0.443807],
    ]},
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.062304, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Importe neto de la cifra de negocios (ventas + prestación de servicios, sin desglosar por concepto)', normalizedCategory:'lump_football_operations', amountNative:68.557925, disclosureLevel:'summary', items:[
      ['Ventas', 1.589385], ['Prestaciones de servicios', 66.968540],
    ]},
    { rawLabel:'Otros ingresos de explotación (ingresos accesorios y de gestión corriente, subvenciones)', normalizedCategory:'other_income', amountNative:3.428051, disclosureLevel:'summary', items:[
      ['Ingresos accesorios y otros de gestión corriente', 2.212119], ['Subvenciones de explotación incorporadas al resultado del ejercicio', 1.215933],
    ]},
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.010890, disclosureLevel:'detailed' },
  ],
};

const espanyolesExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-2.260991, disclosureLevel:'detailed', items:[
      ['Consumo de mercaderías', -0.907399], ['Consumo de materias primas y otras materias consumibles', -1.449377], ['Deterioro de mercaderías, materias primas y otros aprovisionamientos', 0.095785],
    ]},
    { rawLabel:'Gastos de personal (sin separar plantel deportivo/no deportivo)', normalizedCategory:'wages_squad', amountNative:-44.498181, disclosureLevel:'summary', items:[
      ['Sueldos, salarios y asimilados', -41.574489], ['Cargas sociales', -2.923691],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-11.858471, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.554577, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.597187, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-3.888957, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (sin separar jugadores del resto)', normalizedCategory:'player_amortisation', amountNative:-13.940683, disclosureLevel:'summary' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_expenses', amountNative:-0.071425, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-2.477044, disclosureLevel:'detailed', items:[
      ['Consumo de mercaderías', -0.842192], ['Consumo de materias primas y otras materias consumibles', -1.473525], ['Deterioro de mercaderías, materias primas y otros aprovisionamientos', -0.161328],
    ]},
    { rawLabel:'Gastos de personal (sin separar plantel deportivo/no deportivo)', normalizedCategory:'wages_squad', amountNative:-51.467612, disclosureLevel:'summary', items:[
      ['Sueldos, salarios y asimilados', -47.744971], ['Cargas sociales', -3.722640],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-15.892378, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.603953, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.017128, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-7.442544, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (sin separar jugadores del resto)', normalizedCategory:'player_amortisation', amountNative:-11.130548, disclosureLevel:'summary' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_expenses', amountNative:-0.126776, disclosureLevel:'detailed' },
  ],
};

const espanyolesFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'espanyol-es-cuentas-anuales-gestion-auditoria-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = "Deudas a largo plazo" (0,061700 M) + "Deudas a corto plazo" (0,364016 M) del
    // balance — muy baja porque Espanyol financia gran parte de su operación vía "deudas con
    // empresas del grupo y asociadas" (Rastar Group), una línea de pasivo distinta de "Deudas" que
    // no se incluye acá, mismo criterio que Boca/Vélez (solo "Deudas" financieras). cash = "Efectivo
    // y otros activos líquidos equivalentes / Tesorería" del balance.
    grossDebt:0.425716, cash:3.174782,
    netInterest:-1.679707, tax:4.669345, profitOnPlayerSales:17.856025, assetSales:0,
    officialTotalRevenue:43.063621, officialTotalExpenses:77.670472, officialPAT:-13.761188,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'espanyol-es-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:0.041700, cash:13.950791,
    netInterest:-2.909888, tax:-0.252534, profitOnPlayerSales:22.620529, assetSales:0,
    officialTotalRevenue:71.996866, officialTotalExpenses:89.157983, officialPAT:2.296991,
  },
};

const espanyolesPresupuestoOverlayByYear = {};

const espanyolesPasesData = [];
const espanyolesResultadosData = {};
const espanyolesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['espanyol-es'] = {
  revenueLinesByYear: espanyolesRevenueLinesByYear, expenseLinesByYear: espanyolesExpenseLinesByYear,
  fiscalYearMeta: espanyolesFiscalYearMeta, pasesData: espanyolesPasesData,
  resultadosData: espanyolesResultadosData, titulosData: espanyolesTitulosData,
  presupuestoOverlayByYear: espanyolesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'espanyol-es-cuentas-anuales-gestion-auditoria-2023-24': {
      id:'espanyol-es-cuentas-anuales-gestion-auditoria-2023-24', clubId:'espanyol-es',
      title:'Cuentas Anuales e Informe de Gestión del Ejercicio Anual Cerrado el 30 de junio de 2024, junto con el Informe de Auditoría Independiente',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, texto nativo (sin OCR). Auditado por TAC Tax and Auditing Consultants, S.L. Ejercicio jugado en Segunda División (Espanyol descendió de LaLiga al cierre de 2022-23, ascendió de vuelta al ganar el playoff en junio de 2024). Bajado de rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones. Transcripción completa en Clubes/España/RCD Espanyol/cuentas-anuales-gestion-auditoria-2023-2024.md.',
    },
  'espanyol-es-cuentas-anuales-2024-25': {
      id:'espanyol-es-cuentas-anuales-2024-25', clubId:'espanyol-es',
      title:'Cuentas Anuales del Ejercicio Económico Anual Cerrado el 30 de Junio de 2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, escaneo con ruido de OCR real en la transcripción .md (varios dígitos mal leídos, incluida la sección final de impuestos/resultado, que salió ilegible). Los montos de este archivo salen de una relectura directa de la página 12 del PDF renderizada a imagen (300 DPI), no de la transcripción .md original. Bajado de rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones. Transcripción completa (con las cifras sin corregir) en Clubes/España/RCD Espanyol/cuentas-anuales-2024-2025.md.',
    },
});

gestionesByClub['espanyol-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['espanyol-es'] = null; // no investigado en esta sesión (alcance: solo Finanzas)
