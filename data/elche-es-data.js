// ============================================================================
// data/elche-es-data.js — Elche Club de Fútbol, S.A.D. Ejercicios 2023/2024
// (1/7/2023 a 30/6/2024) y 2024/2025 (1/7/2024 a 30/6/2025).
//
// Fuente: "Informe de Auditoría, Cuentas Anuales e Informe de Gestión" (Auren
// Auditores SP, S.L.P.), `Clubes/España/Elche CF/informe-auditoria-cuentas-anuales-2023-2024.pdf`
// y `cuentas-anuales-presupuesto-gestion-2024-2025.pdf` (PDF con texto nativo, no escaneo).
// Transcripciones completas en los .md homónimos, misma carpeta.
//
// Cifras en EUR MILLONES nativos. fx: `EUR@2024-06-30`/`EUR@2025-06-30` (ya en
// data/currency-map.js), el documento no declara un tipo de cambio propio.
//
// CONTEXTO: Elche jugó Primera División (La Liga) en 2022/23 (cifra de
// negocios 57,86 M) y descendió a Segunda al cierre de esa temporada. El
// Ejercicio 2023/2024 (cargado acá, cifra de negocios 14,0 M) es su primera
// temporada en Segunda. LaLiga paga una "ayuda al descenso" (11,8 M EUR,
// contrato formalizado el 3/11/2023) que domina el resultado positivo de ese
// año — ver "Otros resultados" abajo, es dinero real y documentado, no un
// error de carga. El Ejercicio 2024/2025 (cifra de negocios 14,4 M) es su
// segunda temporada en Segunda, con pérdida.
//
// GOTCHA DE TRANSCRIPCIÓN: la tabla "Balance de situación" del PDF 2024/2025
// perdió sus columnas de números en la extracción (quedaron solo las
// etiquetas de fila, ver el .md) — a diferencia de la Cuenta de pérdidas y
// ganancias del mismo documento, que sí extrajo bien. `cash`/`grossDebt` de
// 2025 se reconstruyeron cruzando la Nota 8.2.1 (Clasificación de los pasivos
// financieros, céntimo exacto) y la Nota 18.3 (Ratio de deuda neta, en miles
// de euros, para el efectivo) — ver el detalle en cada año abajo. El
// Ejercicio 2023/2024 SÍ tiene el balance completo en su propio PDF.
//
// CATEGORIZACIÓN (misma taxonomía que Getafe/Girona/Espanyol, mismo país y
// tipo de documento):
// - "Ingresos de taquillas Liga/Copa/amistosos" -> competition_bonus.
// - "Ingresos de abonados" -> season_tickets. "Derechos de retransmisión" ->
//   broadcasting. "Ingresos por publicidad y comercialización" + "Ingresos
//   por venta de tienda" -> sponsorship_commercial.
// - "Ingreso por traspaso/cesión de jugadores" (dentro de "Otros ingresos de
//   explotación") -> player_sales. "Ingreso por arrendamiento" (no nombra el
//   estadio) -> other_income, criterio conservador de stadium_other.
//   "Ingresos de campus y certámenes" (2025) -> youth_football.
// - "Deterioro y resultado por enajenaciones del inmovilizado" (venta neta de
//   derechos federativos) -> fiscalYearMeta.profitOnPlayerSales, NUNCA
//   revenueLine (mismo criterio que Getafe).
// - "Otros resultados" (partida excepcional, Nota 11.7): positivo los 2 años
//   -> revenueLine other_income. 2024 dominado por "Ayuda al descenso"
//   (11,8 M); 2025 son partidas chicas (sanciones, cancelación de créditos
//   concursales, quita de acreedores).
// - "Gastos de personal": sueldos plantilla deportiva (inscribible + no
//   inscribible LNFP) -> wages_squad; sueldos personal no deportivo ->
//   admin_general_expense; Seguridad Social + Indemnizaciones + Otros gastos
//   sociales, que el documento NO desglosa por área -> bolsón
//   `lump_football_operations_expense` (nunca forzar un prorrateo aproximado,
//   club-data-mapping sección 1).
// - "Otros gastos de gestión corriente" (Nota 11.6): Derechos de arbitraje +
//   Desplazamientos -> match_organisation_expense; Gastos adquisición
//   jugadores (comisiones) + Otros gastos de gestión -> other_expenses;
//   Cuotas a entidades deportivas + Sanciones deportivas -> admin_general_expense.
// - "Servicios exteriores" + "Tributos" -> admin_general_expense.
//   "Aprovisionamientos" + "Pérdidas/deterioro operaciones comerciales" ->
//   other_expenses.
// - "Amortización del inmovilizado": desglosada vía Nota 6 (movimientos de
//   inmovilizado intangible, columna "Adiciones" de la amortización
//   acumulada = dotación del ejercicio) en derechos de jugadores
//   (player_amortisation) y otro intangible (other_amortisation); el resto
//   hasta el total impreso es inmovilizado material (depreciation, Nota 5,
//   no desglosada aparte pero se obtiene por diferencia).
//
// VERIFICACIÓN Ejercicio 2023/2024 (ver .md, replicando la Cuenta de
// pérdidas y ganancias línea por línea): Revenue 34,073927 M - Expenses cash
// 26,991293 M - Non-cash 3,282670 M = 3,799964 M... (nota: el orden real es
// Revenue - |Expenses total| + profitOnPlayerSales) = 34,073927 - 30,273963
// + 5,126874 = 8,926838 M ≈ A.1) RESULTADO DE EXPLOTACIÓN impreso
// (8.926.838) EXACTO; + netInterest 0,118948 M = 9,045786 M ≈ A.3 impreso
// (9.045.786) EXACTO; + tax -0,035229 M = 9,010557 M ≈ A.5/PAT impreso
// (9.010.557) EXACTO.
//
// VERIFICACIÓN Ejercicio 2024/2025: Revenue 20,550790 M - Expenses cash
// 30,000399 M - Non-cash 2,606814 M + profitOnPlayerSales 3,961249 M =
// -8,095174 M ≈ A.1 impreso (-8.095.171, diff ~3 EUR de redondeo) OK;
// + netInterest 0,380862 M = -7,714312 M ≈ A.3 impreso (-7.714.310) OK;
// + tax 0,581891 M = -7,132421 M ≈ A.5/PAT impreso (-7.132.418) OK.
// ============================================================================

const elcheesRevenueLinesByYear = {
  2024: [
    { rawLabel:'Ingresos de taquillas (Liga y Copa del Rey)', normalizedCategory:'competition_bonus', amountNative:0.755930, disclosureLevel:'detailed', items:[
      ['Liga', 0.575862], ['Copa del Rey', 0.180068],
    ]},
    { rawLabel:'Derechos de retransmisión', normalizedCategory:'broadcasting', amountNative:8.820915, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad y comercialización', normalizedCategory:'sponsorship_commercial', amountNative:1.909411, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de abonados', normalizedCategory:'season_tickets', amountNative:2.316558, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por traspaso / cesión jugadores', normalizedCategory:'player_sales', amountNative:6.864554, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (arrendamiento, royalties, cesión de superficies, quinielas, subvenciones, otros)', normalizedCategory:'other_income', amountNative:0.857454, disclosureLevel:'detailed', items:[
      ['Ingreso por arrendamiento', 0.199628], ['Ingresos royalties', 0.002957], ['Ingreso por derechos cesión de superficies', 0.075000], ['Ingresos por quinielas', 0.074603], ['Otros', 0.156870], ['Subvenciones de explotación', 0.348396],
    ]},
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.311552, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados (excepcionales, incl. ayuda al descenso de LaLiga)', normalizedCategory:'other_income', amountNative:12.237553, disclosureLevel:'detailed', items:[
      ['Ayuda al descenso (LaLiga, contrato 3/11/2023)', 11.800000], ['Regularización de deudas salariales prescritas', 0.582000], ['Otros ingresos/gastos excepcionales y regularizaciones', -0.144447],
    ]},
  ],
  2025: [
    { rawLabel:'Ingresos de taquillas (Liga, Copa del Rey y amistosos)', normalizedCategory:'competition_bonus', amountNative:1.995933, disclosureLevel:'detailed', items:[
      ['Liga', 1.091998], ['Copa del Rey', 0.890380], ['Partidos amistosos', 0.013555],
    ]},
    { rawLabel:'Derechos de retransmisión', normalizedCategory:'broadcasting', amountNative:6.357113, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad, comercialización y venta de tienda', normalizedCategory:'sponsorship_commercial', amountNative:3.027589, disclosureLevel:'detailed', items:[
      ['Publicidad y comercialización', 2.248231], ['Venta de tienda', 0.779358],
    ]},
    { rawLabel:'Ingresos de abonados', normalizedCategory:'season_tickets', amountNative:2.653795, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de campus y certámenes', normalizedCategory:'youth_football', amountNative:0.050914, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por arrendamiento', normalizedCategory:'other_income', amountNative:0.312719, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por traspaso / cesión jugadores', normalizedCategory:'player_sales', amountNative:4.682839, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación (quinielas, subvenciones, otros)', normalizedCategory:'other_income', amountNative:0.827282, disclosureLevel:'detailed', items:[
      ['Ingresos por quinielas', 0.075526], ['Subvenciones de explotación', 0.491543], ['Otros', 0.260213],
    ]},
    { rawLabel:'Otros resultados (excepcionales)', normalizedCategory:'other_income', amountNative:0.642606, disclosureLevel:'detailed', items:[
      ['Ingreso cancelación créditos concursales', 0.789184], ['Quita acreedores fin. concurso', 0.237606], ['Ingresos ejercicios anteriores', 0.323058], ['Otras sanciones (Nota 15)', -0.682865], ['Otros ingresos/gastos excepcionales y regularizaciones menores', -0.024377],
    ]},
  ],
};

const elcheesExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-0.733807, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos plantilla deportiva (inscribible y no inscribible LNFP)', normalizedCategory:'wages_squad', amountNative:-10.532990, disclosureLevel:'detailed', items:[
      ['Inscribible LNFP', -9.976224], ['No inscribible LNFP', -0.556766],
    ]},
    { rawLabel:'Sueldos personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-3.087086, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad Social, indemnizaciones y otros gastos sociales (sin desglosar por área)', normalizedCategory:'lump_football_operations_expense', amountNative:-2.036231, disclosureLevel:'not_disclosed', items:[
      ['Seguridad Social', -1.349957], ['Indemnizaciones', -0.674711], ['Otros gastos sociales', -0.011563],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-4.228367, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.035335, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.188117, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de arbitraje y desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-1.529443, disclosureLevel:'detailed', items:[
      ['Derechos de arbitraje', -0.491448], ['Desplazamientos', -1.037995],
    ]},
    { rawLabel:'Gastos de adquisición de jugadores y otros gastos de gestión', normalizedCategory:'other_expenses', amountNative:-4.388232, disclosureLevel:'detailed', items:[
      ['Gastos adquisición jugadores (comisiones)', -3.905664], ['Otros gastos de gestión', -0.482568],
    ]},
    { rawLabel:'Cuotas a entidades deportivas y sanciones deportivas', normalizedCategory:'admin_general_expense', amountNative:-0.231685, disclosureLevel:'detailed', items:[
      ['Cuotas a entidades deportivas', -0.205382], ['Sanciones deportivas', -0.026303],
    ]},
    { rawLabel:'Amortización de derechos de adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-2.559007, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de otro inmovilizado intangible', normalizedCategory:'other_amortisation', amountNative:-0.002788, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de inmovilizado material', normalizedCategory:'depreciation', amountNative:-0.720875, disclosureLevel:'not_disclosed' },
  ],
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-0.801095, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos plantilla deportiva (inscribible y no inscribible LNFP)', normalizedCategory:'wages_squad', amountNative:-14.467372, disclosureLevel:'detailed', items:[
      ['Inscribible LNFP', -13.646985], ['No inscribible LNFP', -0.820387],
    ]},
    { rawLabel:'Sueldos personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-2.805166, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad Social y otros gastos sociales (sin desglosar por área)', normalizedCategory:'lump_football_operations_expense', amountNative:-1.441676, disclosureLevel:'not_disclosed', items:[
      ['Seguridad Social', -1.435608], ['Otros gastos sociales', -0.006068],
    ]},
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-4.483572, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.033651, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.010588, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de arbitraje y desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-1.447448, disclosureLevel:'detailed', items:[
      ['Derechos de arbitraje', -0.504345], ['Desplazamientos', -0.943103],
    ]},
    { rawLabel:'Gastos de adquisición de jugadores y otros gastos de gestión', normalizedCategory:'other_expenses', amountNative:-4.178481, disclosureLevel:'detailed', items:[
      ['Gastos adquisición jugadores (comisiones)', -3.488035], ['Otros gastos de gestión', -0.690446],
    ]},
    { rawLabel:'Cuotas a entidades deportivas y sanciones deportivas', normalizedCategory:'admin_general_expense', amountNative:-0.331350, disclosureLevel:'detailed', items:[
      ['Cuotas a entidades deportivas', -0.302171], ['Sanciones deportivas', -0.029179],
    ]},
    { rawLabel:'Amortización de derechos de adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-1.962429, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de otro inmovilizado intangible', normalizedCategory:'other_amortisation', amountNative:-0.001932, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de inmovilizado material', normalizedCategory:'depreciation', amountNative:-0.642453, disclosureLevel:'not_disclosed' },
  ],
};

const elcheesFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'elche-es-informe-auditoria-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = Ingresos financieros (0.515336) + Gastos financieros (-0.383046) + Diferencias
    // de cambio (-0.013342), EXACTO igual al "A.2) RESULTADO FINANCIERO" implícito (0.118948).
    netInterest:0.118948, tax:-0.035229,
    // profitOnPlayerSales = "11. Deterioro y resultado por enajenaciones del inmovilizado" impreso
    // (venta de derechos federativos, 5.229.239 EUR de beneficio bruto - 102.365 EUR de baja de un
    // jugador con extinción laboral de mutuo acuerdo = 5.126.874 EUR neto, Nota 6.1).
    profitOnPlayerSales:5.126874, assetSales:0,
    // grossDebt = deuda financiera (arrendamiento financiero + otros pasivos financieros, LP+CP),
    // NO el total del pasivo (excluye acreedores comerciales). cash = Efectivo y otros activos
    // líquidos equivalentes. Ambos del propio balance de este ejercicio (Balance de situación,
    // pág. 3 del PDF).
    grossDebt:13.134695, cash:23.896009,
    officialTotalRevenue:34.073927, officialTotalExpenses:30.273963, officialPAT:9.010557,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'elche-es-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // netInterest = Ingresos financieros (0.471469) + Gastos financieros (-0.126900) + Diferencias
    // de cambio (0.036293) = 0.380862, ≈ A.2 implícito (A.3 9,045786... acá A.3 es -7,714310, A.1
    // es -8,095171, diferencia 0,380861).
    netInterest:0.380862, tax:0.581891,
    // profitOnPlayerSales = "11. Deterioro y resultado por enajenaciones del inmovilizado" impreso.
    profitOnPlayerSales:3.961249, assetSales:0,
    // grossDebt: la tabla "Balance de situación" de ESTE documento perdió sus números en la
    // extracción (ver comentario de cabecera) — reconstruido EXACTO desde la Nota 8.2.1
    // (Clasificación de los pasivos financieros al 30/6/2025): LP arrendamiento 0.804541 + LP otros
    // pasivos financieros 11.104318 + CP arrendamiento 0.146888 + CP otros pasivos financieros
    // 0.992196 = 13.047943 (excluye acreedores comerciales, que no son deuda financiera).
    // cash: la Nota 18.3 (Ratio de deuda neta) da "Efectivo y otros activos líquidos equivalentes"
    // en MILES de euros (14.550 en 2025, 23.896 en 2024 — este último coincide exacto con el
    // balance del ejercicio 2024 de arriba), así que 2025 queda con la precisión de miles, no de
    // céntimos como el resto de los campos de este archivo.
    grossDebt:13.047943, cash:14.550,
    officialTotalRevenue:20.550790, officialTotalExpenses:32.607213, officialPAT:-7.132418,
  },
};

const elcheesPresupuestoOverlayByYear = {};
const elcheesPasesData = [];
const elcheesResultadosData = {};
const elcheesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['elche-es'] = {
  revenueLinesByYear: elcheesRevenueLinesByYear, expenseLinesByYear: elcheesExpenseLinesByYear,
  fiscalYearMeta: elcheesFiscalYearMeta, pasesData: elcheesPasesData,
  resultadosData: elcheesResultadosData, titulosData: elcheesTitulosData,
  presupuestoOverlayByYear: elcheesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'elche-es-informe-auditoria-2023-24': {
      id:'elche-es-informe-auditoria-2023-24', clubId:'elche-es',
      title:'Informe de Auditoría, Cuentas Anuales e Informe de Gestión, ejercicio terminado el 30 de junio de 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF con texto nativo (no escaneo, 64 páginas, Auren Auditores SP S.L.P.), transcripción completa en Clubes/España/Elche CF/informe-auditoria-cuentas-anuales-2023-2024.md. Primera temporada de Elche en Segunda División tras el descenso de 2022/23 — el resultado positivo del ejercicio está dominado por una "ayuda al descenso" de LaLiga de 11,8 M EUR (Nota 11.7), no por la actividad futbolística ordinaria.',
    },
  'elche-es-cuentas-anuales-2024-25': {
      id:'elche-es-cuentas-anuales-2024-25', clubId:'elche-es',
      title:'Cuentas Anuales, Informe de Gestión y Presupuesto, ejercicio terminado el 30 de junio de 2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF con texto nativo (70 páginas), transcripción completa en Clubes/España/Elche CF/cuentas-anuales-presupuesto-gestion-2024-2025.md. La tabla "Balance de situación" perdió sus columnas de números en la extracción del PDF (quedaron solo las etiquetas de fila) — grossDebt/cash de este ejercicio se reconstruyeron cruzando la Nota 8.2.1 (pasivos financieros, céntimo exacto) y la Nota 18.3 (Ratio de deuda neta, en miles de euros para el efectivo), documentado en el comentario de cabecera de elche-es-data.js. La Cuenta de pérdidas y ganancias sí se extrajo completa y reconcilia exacta.',
    },
});

gestionesByClub['elche-es'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['elche-es'] = null;
