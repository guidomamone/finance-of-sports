// ============================================================================
// data/getafe-es-data.js — Getafe Club de Fútbol, S.A.D. Ejercicios 2023/2024
// (1/7/2023 a 30/6/2024) y 2024/2025 (1/7/2024 a 30/6/2025).
//
// Fuente: "Informe Auditoría de Cuentas Anuales", Grupo Pél Auditores, S.L.P.
// (`Clubes/España/Getafe CF/cuentas-anuales-informe-auditoria-2023-2024.pdf` y
// `-2024-2025.pdf`, 56-57 págs. cada uno, ambos escaneos sin capa de texto —
// transcriptos con pdftotext/OCR, ver los .md homónimos en la misma carpeta).
// Bajados de `getafecf.com/ley-de-transparencia-sad`, ver fuentes/España/Getafe CF.md.
//
// Cifras en EUR MILLONES nativos (documento en euros completos, dividido por
// 1.000.000 al cargar). Tipos de cambio: EUR/USD cierre BCE 30/6/2024 y
// 30/6/2025 (`EUR@2024-06-30`/`EUR@2025-06-30`, ya en data/currency-map.js,
// `fxSource:'market_close'` porque el documento no declara un tipo de cambio
// propio — no tiene partidas en moneda extranjera).
//
// GOTCHA DE TRANSCRIPCIÓN: las dos cuentas de pérdidas y ganancias vienen con
// las etiquetas de fila separadas de su columna de números (la tabla se leyó
// en dos bloques por el OCR/extracción del escaneo), así que cada número se
// re-asoció a su fila contando la posición en la lista y verificando contra
// los subtotales impresos en CADA nivel (rubro -> sub-total -> A.1/A.2/A.3/
// A.4/A.5) antes de cargar nada — ver club-data-mapping SKILL.md sección 6.
// Los dos ejercicios reconciliaron EXACTOS en todos los niveles una vez
// reordenados: Revenue, Expenses (cash+no-cash), profitOnPlayerSales,
// netInterest, tax y PAT, contra el Estado de Cambios en el Patrimonio Neto
// (fila "Resultado del ejercicio").
//
// CATEGORIZACIÓN (misma estructura los 2 años, rubros idénticos):
// - "Ingresos por competiciones" -> competition_bonus (Liga/Copa/UEFA/amistosos).
// - "Ingresos por abonados y socios" -> season_tickets.
// - "Ingresos por retransmisión" -> broadcasting.
// - "Ingresos de comercialización" + "Ingresos por publicidad" -> sponsorship_commercial
//   (2 líneas separadas, mismo criterio que Celta de Vigo).
// - "Otros ingresos de explotación": "Cesiones" (préstamo de jugadores, ingreso
//   por cesión) se promovió a línea propia `player_sales` (categoría real
//   distinta del resto, ver club-data-mapping sección 1); "Ingresos LNFP" +
//   "Subvenciones a la explotación" + "Otros" -> other_income.
// - "Imputación de subvenciones de inmov no financiero" + "Exceso de
//   provisiones" -> other_income.
// - "Deterioro y result. por enajenac. del inmov." (venta de jugadores, neto
//   de beneficios y pérdidas) -> fiscalYearMeta.profitOnPlayerSales, NUNCA
//   revenueLine (club-data-mapping sección 2).
// - "Otros Resultados" (positivo o negativo según el año) -> other_income si
//   positivo, other_expenses si negativo (2024: gasto -72,5K; 2025: gasto
//   -873,1K, ambos años negativos en la práctica).
// - "Gastos de personal no deportivo" -> admin_general_expense. "Gastos
//   plantilla deportiva" (7.1 inscribible + 7.2 no inscribible, sueldos +
//   indemnizaciones + SS + primas, todo el plantel) -> wages_squad.
// - "Otros gastos de explotación": sub-ítems con categoría real distinta
//   promovidos a líneas de primer nivel (sección 1 del skill) — "Servicios
//   exteriores"/"Tributos"/"Otros gastos de gestión corriente" ->
//   admin_general_expense; "Desplazamientos" -> match_organisation_expense;
//   "Gastos de adquisición y cesión de jugadores" (comisiones/intermediación,
//   inscribibles + no inscribibles, adquisición + cesión, las 4 sub-líneas
//   combinadas en 1) -> other_expenses (mismo criterio que Racing: Boca
//   tampoco separa comisiones dentro de "Compra de jugadores").
// - "Amortización del inmovilizado": el documento SÍ separa "Amortización de
//   dchos adquisición de jugadores" (inscribible+no inscribible, combinadas)
//   -> player_amortisation, de "Amortización otro inmov. inmaterial" ->
//   other_amortisation, y "Amortización inmovilizado material" -> depreciation.
//
// VERIFICACIÓN Ejercicio 2023/2024 (ver .md pág. 10-11 para el detalle):
// Revenue 64,451092 M - Expenses cash 73,517467 M - Non-cash 14,859485 M =
// -23,925860 M; + profitOnPlayerSales 16,561975 M = -7,363885 M ≈ A.1)
// RESULTADOS DE EXPLOTACIÓN impreso (-7.363.884,68) EXACTO; + netInterest
// -2,992409 M = -10,356294 M ≈ A.3) RESULTADO ANTES DE IMPUESTOS impreso
// (-10.356.294,00) EXACTO; + tax +1,783799 M = -8,572495 M ≈ A.5) RESULTADO
// DEL EJERCICIO impreso (-8.572.495,42) EXACTO, y coincide con "VII.
// Resultado del ejercicio" del balance.
//
// VERIFICACIÓN Ejercicio 2024/2025: Revenue 60,709312 M - Expenses cash
// 64,033517 M - Non-cash 11,590234 M = -14,914439 M; + profitOnPlayerSales
// 19,132289 M = 4,217850 M ≈ A.1 impreso (4.217.850,90) EXACTO; + netInterest
// -5,100524 M = -0,882673 M ≈ A.3 impreso (-882.672,64) EXACTO; + tax
// -0,808042 M = -1,690715 M ≈ A.5 impreso (-1.690.714,78) EXACTO, coincide con
// "VII. Resultado del ejercicio" del balance 24/25.
// ============================================================================

const getafeesRevenueLinesByYear = {
  2024: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:1.087586, disclosureLevel:'detailed', items:[
      ['Liga', 1.027780], ['Copa de S.M. el Rey', 0.049744], ['UEFA', 0], ['Otras competiciones y partidos amistosos', 0.010062],
    ]},
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:2.737142, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:50.278077, disclosureLevel:'detailed', items:[
      ['Real Decreto-Ley 5/2015', 49.803625], ['Competiciones europeas (market pool)', 0], ['Derechos audiovisuales Copa del Rey', 0.474452],
    ]},
    { rawLabel:'Ingresos de comercialización', normalizedCategory:'sponsorship_commercial', amountNative:3.605035, disclosureLevel:'detailed', items:[
      ['Venta tiendas', 0.582592], ['Patrocinios', 3.022443], ['Otros', 0],
    ]},
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:2.835143, disclosureLevel:'detailed', items:[
      ['Publicidad estática', 0.456129], ['Publicidad dinámica', 2.379014], ['Otros', 0],
    ]},
    { rawLabel:'Cesiones (préstamo de jugadores)', normalizedCategory:'player_sales', amountNative:1.502000, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (LNFP, subvenciones, otros)', normalizedCategory:'other_income', amountNative:1.100401, disclosureLevel:'detailed', items:[
      ['Ingresos LNFP', 0.329944], ['Subvenciones a la explotación', 0.146773], ['Otros', 0.623684],
    ]},
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero', normalizedCategory:'other_income', amountNative:1.227042, disclosureLevel:'detailed' },
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.078666, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:1.700588, disclosureLevel:'detailed', items:[
      ['Liga', 1.536885], ['Copa de S.M. el Rey', 0], ['UEFA', 0], ['Otras competiciones y partidos amistosos', 0.163702],
    ]},
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:3.083642, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:45.950697, disclosureLevel:'detailed', items:[
      ['Real Decreto-Ley 5/2015', 45.467405], ['Competiciones europeas (market pool)', 0], ['Derechos audiovisuales Copa del Rey', 0.483292],
    ]},
    { rawLabel:'Ingresos de comercialización', normalizedCategory:'sponsorship_commercial', amountNative:4.542914, disclosureLevel:'detailed', items:[
      ['Venta tiendas', 0.571810], ['Patrocinios', 3.971104], ['Otros', 0],
    ]},
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:2.687618, disclosureLevel:'detailed', items:[
      ['Publicidad estática', 0.371635], ['Publicidad dinámica', 2.315983], ['Otros', 0],
    ]},
    { rawLabel:'Cesiones (préstamo de jugadores)', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (LNFP, subvenciones, otros)', normalizedCategory:'other_income', amountNative:1.516811, disclosureLevel:'detailed', items:[
      ['Ingresos LNFP', 0.361499], ['Subvenciones a la explotación', 0.355095], ['Otros', 0.800218],
    ]},
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero', normalizedCategory:'other_income', amountNative:1.227042, disclosureLevel:'detailed' },
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'detailed' },
  ],
};

const getafeesExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-1.907080, disclosureLevel:'detailed', items:[
      ['Consumo de material deportivo', -1.777181], ['Otros consumos y gastos externos', -0.129899],
    ]},
    { rawLabel:'Gastos de personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-4.063292, disclosureLevel:'detailed', items:[
      ['Sueldos, salarios del personal no deportivo', -3.389140], ['Indemnizaciones al personal no deportivo', -0.099136], ['Seguridad social del personal no deportivo', -0.575016],
    ]},
    { rawLabel:'Gastos plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-46.980638, disclosureLevel:'detailed', items:[
      ['Plantilla inscribible en la LNFP (sueldos, indemnizaciones, SS, primas)', -46.001679], ['Plantilla no inscribible (filial/categorías inferiores)', -0.978959],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-11.908540, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.221812, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-1.826565, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición y cesión de jugadores (comisiones e intermediación)', normalizedCategory:'other_expenses', amountNative:-4.697900, disclosureLevel:'detailed', items:[
      ['Adquisición inscribibles', -2.519400], ['Adquisición no inscribibles', -0.015000], ['Cesión inscribibles', -2.163000], ['Cesión no inscribibles', -0.000500],
    ]},
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-1.839165, disclosureLevel:'detailed' },
    { rawLabel:'Amortización derechos adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-12.865302, disclosureLevel:'detailed', items:[
      ['Inscribibles en la LNFP', -12.770302], ['No inscribibles en la LNFP', -0.095000],
    ]},
    { rawLabel:'Amortización de otro inmovilizado inmaterial', normalizedCategory:'other_amortisation', amountNative:-1.259920, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de inmovilizado material', normalizedCategory:'depreciation', amountNative:-0.734264, disclosureLevel:'detailed' },
    { rawLabel:'Otros Resultados', normalizedCategory:'other_expenses', amountNative:-0.072475, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-2.214931, disclosureLevel:'detailed', items:[
      ['Consumo de material deportivo', -2.101724], ['Otros consumos y gastos externos', -0.113206],
    ]},
    { rawLabel:'Gastos de personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-4.456015, disclosureLevel:'detailed', items:[
      ['Sueldos, salarios del personal no deportivo', -3.665430], ['Indemnizaciones al personal no deportivo', -0.084000], ['Seguridad social del personal no deportivo', -0.706585],
    ]},
    { rawLabel:'Gastos plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-38.553123, disclosureLevel:'detailed', items:[
      ['Plantilla inscribible en la LNFP (sueldos, indemnizaciones, SS, primas)', -37.261067], ['Plantilla no inscribible (filial/categorías inferiores)', -1.292055],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-9.491896, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.214967, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-1.854070, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición y cesión de jugadores (comisiones e intermediación)', normalizedCategory:'other_expenses', amountNative:-4.483654, disclosureLevel:'detailed', items:[
      ['Adquisición inscribibles', -3.035654], ['Adquisición no inscribibles', -0.036000], ['Cesión inscribibles', -1.412000], ['Cesión no inscribibles', 0],
    ]},
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-1.891754, disclosureLevel:'detailed' },
    { rawLabel:'Amortización derechos adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-9.533746, disclosureLevel:'detailed', items:[
      ['Inscribibles en la LNFP', -9.516496], ['No inscribibles en la LNFP', -0.017250],
    ]},
    { rawLabel:'Amortización de otro inmovilizado inmaterial', normalizedCategory:'other_amortisation', amountNative:-1.314717, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de inmovilizado material', normalizedCategory:'depreciation', amountNative:-0.741771, disclosureLevel:'detailed' },
    { rawLabel:'Otros Resultados', normalizedCategory:'other_expenses', amountNative:-0.873107, disclosureLevel:'detailed' },
  ],
};

const getafeesFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'getafe-es-cuentas-anuales-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt = "Deudas a largo plazo" (56,125741 M) + "Deudas a corto plazo" (21,808984 M) del
    // balance, sumando las columnas con etiqueta clara (crédito+préstamos participativos+entidades
    // deportivas para LP; crédito+préstamos participativos+entidades deportivas+otros pasivos
    // financieros para CP) — mismo criterio que Boca/Vélez (solo "Deudas", sin Provisiones ni
    // Periodificaciones). cash = "VII. Efect. y otros act. líquidos equivalentes" del balance,
    // coincide exacto con el cierre del Estado de Flujos de Efectivo.
    grossDebt:77.934725, cash:3.374345,
    netInterest:-2.992409, tax:1.783799, profitOnPlayerSales:16.561975, assetSales:0,
    officialTotalRevenue:64.451092, officialTotalExpenses:88.376952, officialPAT:-8.572495,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'getafe-es-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:85.300451, cash:6.450427,
    netInterest:-5.100524, tax:-0.808042, profitOnPlayerSales:19.132289, assetSales:0,
    officialTotalRevenue:60.709312, officialTotalExpenses:75.623750, officialPAT:-1.690715,
  },
};

const getafeesPresupuestoOverlayByYear = {};

const getafeesPasesData = [];
const getafeesResultadosData = {};
const getafeesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['getafe-es'] = {
  revenueLinesByYear: getafeesRevenueLinesByYear, expenseLinesByYear: getafeesExpenseLinesByYear,
  fiscalYearMeta: getafeesFiscalYearMeta, pasesData: getafeesPasesData,
  resultadosData: getafeesResultadosData, titulosData: getafeesTitulosData,
  presupuestoOverlayByYear: getafeesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'getafe-es-cuentas-anuales-2023-24': {
      id:'getafe-es-cuentas-anuales-2023-24', clubId:'getafe-es',
      title:'Informe Auditoría de Cuentas Anuales, Ejercicio finalizado a 30 de junio de 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (auditado por Grupo Pél Auditores, S.L.P.), escaneo sin capa de texto. Bajado de getafecf.com/ley-de-transparencia-sad. Transcripción completa en Clubes/España/Getafe CF/cuentas-anuales-informe-auditoria-2023-2024.md. La cuenta de pérdidas y ganancias venía con etiquetas y números en bloques separados por el OCR/extracción; se reordenó verificando cada subtotal impreso antes de cargar (reconcilió exacto en todos los niveles).',
    },
  'getafe-es-cuentas-anuales-2024-25': {
      id:'getafe-es-cuentas-anuales-2024-25', clubId:'getafe-es',
      title:'Informe Auditoría de Cuentas Anuales, Ejercicio finalizado a 30 de junio de 2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (auditado por Grupo Pél Auditores, S.L.P.), escaneo sin capa de texto. Bajado de getafecf.com/ley-de-transparencia-sad. Transcripción completa en Clubes/España/Getafe CF/cuentas-anuales-informe-auditoria-2024-2025.md. Mismo gotcha de reordenamiento que el ejercicio 2023-24 (ver esa entrada); reconcilió exacto en todos los niveles contra el Estado de Cambios en el Patrimonio Neto.',
    },
});

gestionesByClub['getafe-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['getafe-es'] = null; // no investigado en esta sesión (alcance: solo Finanzas)
