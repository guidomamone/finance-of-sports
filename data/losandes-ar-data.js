// ============================================================================
// data/losandes-ar-data.js — Club Atlético Los Andes (Lomas de Zamora, Buenos
// Aires, Asociación Civil). 2 ejercicios cargados: 2019/2020 (Ejercicio
// Económico N° 104, cerrado el 30/6/2020) y 2020/2021 (Ejercicio Económico
// N° 105, cerrado el 30/6/2021), ambos balances reales.
//
// FUENTE: Clubes/Argentina/Los Andes/balance-ejercicio-104-2019-20.md y
// balance-ejercicio-105-2020-21.md (transcripciones OCR, documentos escaneados
// con CamScanner). NOTA: la carpeta tiene una serie completa 1993-2020/21
// transcripta — estas 2 sesiones cargaron los Ejercicios 104 y 105; los demás
// ejercicios quedan disponibles para una sesión futura de onboarding.
//
// CALIDAD DE OCR (ambos ejercicios): el "Estado de Recursos y Gastos" y el
// "Balance General" transcribieron limpio. El "Cuadro de Gastos" (Anexo)
// transcribió con texto ilegible/invertido/desalineado en el .md (páginas
// rotadas o con columnas desalineadas — confirmado con `tesseract --psm 0`
// para 105; para 104, la página del Cuadro de Gastos está rotada 90° pero el
// texto de `pdftotext` sale con las columnas mezcladas). Se re-renderizaron a
// 300dpi, se rotaron con PIL y se leyeron visualmente con el Read tool — los
// valores de esta tabla NO salen del .md tal cual está (que sigue con el texto
// garbled/desalineado de la transcripción original), salen de la relectura
// directa de las imágenes rotadas. Recomendado: re-OCRear y reemplazar esas
// páginas en los .md en una sesión futura para que los archivos queden fieles
// (fuera de alcance de estas sesiones, que se enfocaron en cargar el dato).
//
// ESTRUCTURA DEL "CUADRO DE GASTOS" (ambos ejercicios): matriz 2 ejes, CUENTAS
// (concepto) x ESTADIO/FUTBOL/GASTOS ADMIN-SEDE/GASTOS OTROS DPTOS (sector),
// mismo patrón que Vélez/Gimnasia y Esgrima LP (club-data-mapping SKILL.md
// sección 14). Cada celda no vacía se cargó como línea propia, con el sector
// aclarado entre paréntesis en el rawLabel. Criterio de sector -> categoría
// (igual espíritu que Gimnasia y Esgrima LP, sección "CRITERIO DE SECTOR" de
// gimnasiaesgrima-ar-data.js): columna FUTBOL -> wages_squad para sueldos/
// cargas/honorarios/plantel profesional/seguros del plantel (incluye
// "Departamento Médico"-style costos no salariales del plantel, aunque acá no
// hay línea de médico separada — "Seguros (Fútbol)" del Ejercicio 104 se
// categorizó con este mismo criterio, no hay línea de médico separada tampoco
// ese año), match_organisation_expense para "Seguridad Deportiva"/"Egresos
// por Encuentros AFA" (organización de partidos), youth_other_sports_expense
// para "Gastos Plantel Inferiores" (override: aunque cae en la columna FUTBOL,
// el concepto es plantel INFERIOR, no profesional); columna ESTADIO/ADMIN-SEDE
// -> admin_general_expense (salvo "Amortización del Ejercicio" -> depreciation,
// que solo tiene valor en la columna Estadio); columna OTROS DPTOS ->
// youth_other_sports_expense. Las filas "Egresos Varios" y "Gastos Otros
// Dptos" (catch-all por nombre propio, en cualquier columna) -> other_expenses,
// sin aplicar el criterio de columna, porque su propio rótulo ya es "varios/
// otros" sin concepto identificable.
//
// RESULTADOS FINANCIEROS: 3 filas del Cuadro de Gastos son financieras y se
// sacaron a fiscalYearMeta[year].netInterest en vez de expenseLines: "Gastos
// Financieros e Intereses", "intereses sobre prestamos" y "diferencia de
// cotizacion" — club-data-mapping SKILL.md sección 2. El Estado de Recursos y
// Gastos además trae "REPCAM" (RECPAM, resultado por exposición a la
// inflación — el documento está en moneda homogénea RT6, ver Nota 1) como una
// línea propia, sumada DESPUÉS de Gastos Administrativos, que también va neta a
// netInterest (mismo criterio "incluye RECPAM" que Vélez/Gimnasia).
// netInterest 2021 = 27.414.122,16 (REPCAM) - 0,00 - 357.253,94 - 35.230,96 =
// 27.021.637,26. netInterest 2020 = 11.674.283,99 (REPCAM) - 1.595.850,00
// (Gastos Financieros e Intereses, Estadio) - 1.429.500,00 (intereses sobre
// prestamos, Estadio) - 581.786,61 (diferencia de cotizacion, Estadio) =
// 8.067.147,38 (en 2020 las 3 filas financieras cayeron todas en la columna
// Estadio, a diferencia de 2021 donde se repartían entre Estadio y Fútbol).
//
// VERIFICACIÓN 2021: revenueLines suma exacto 125.444.731,23 (= TOTAL RECURSOS
// impreso, el documento no mezcla nada financiero en Recursos). expenseLines
// suma 114.751.101,38 (= "Gastos s/ Anexo IV" + "Gastos Administrativos" del
// Estado de Recursos y Gastos, 115.143.586,27, menos las 3 filas financieras de
// arriba, 392.484,90 — diff de 1 centavo por redondeo, irrelevante).
// 125.444.731,23 - 114.751.101,38 + 27.021.637,26 = 37.715.267,11 ≈
// RESULTADO FINAL EJERCICIO impreso ($37.715.267,12, diff de 1 centavo).
//
// VERIFICACIÓN 2020: revenueLines suma EXACTO 96.851.408,45 (= TOTAL RECURSOS
// impreso; 2 filas de Recursos, "ingresos otras actividades" y "concesiones",
// solo tienen valor en la columna comparativa 2019, blanco/$0 en 2020 — no se
// cargaron para ese año, confirmado en pág. 4 del PDF). El "Cuadro de Gastos"
// (pág. 6) cierra EXACTO por columna Y por fila contra sus propios totales
// impresos (ESTADIO 28.558.922,20; FUTBOL 33.350.777,53; ADMIN/SEDE
// 17.490.794,00 [redondeo de 1 centavo]; OTROS DPTOS 24.919.933,29; TOTAL
// 104.320.427,02) — se verificaron los 4 totales de columna sumando cada
// celda antes de cargar. De ese total, restando las 3 filas financieras
// (3.607.136,61) da expenseLines = 100.713.290,41 (=  "Gastos s/ Anexo IV"
// 75.761.504,82 + "Gastos Administrativos" 28.558.922,20 del Estado de
// Recursos y Gastos, menos esas mismas 3 filas). Nota de nomenclatura: en el
// Estado de Recursos y Gastos de ESTE ejercicio, "Gastos Administrativos"
// coincide numéricamente con el total de la columna ESTADIO del Cuadro de
// Gastos (28.558.922,20 exacto), y "Gastos s/ Anexo IV" con la suma de
// FUTBOL+ADMIN/SEDE+OTROS DPTOS (75.761.504,82 exacto) — la categorización
// real de cada línea sigue el criterio de COLUMNA de arriba, no estas 2
// etiquetas agregadas del resumen.
// 96.851.408,45 - 100.713.290,41 + 8.067.147,38 = 4.205.265,42, EXACTO contra
// el RESULTADO FINAL EJERCICIO impreso ($4.205.265,42).
//
// TIPO DE CAMBIO: no se encontró Anexo de moneda extranjera con TC propio en
// ninguno de los 2 ejercicios (a diferencia de Godoy Cruz, no hay Anexo de
// inversiones en USD). fxSource:'market_close' para los 2: dólar mayorista
// BCRA de cierre — 2021: $95,72 (fuente: Ámbito Financiero, nota "Dólar hoy: a
// cuánto cerró este miércoles 30 de junio", 30/6/2021). 2020: $70,46 (dólar
// mayorista BCRA al 30/6/2020, YA EXISTÍA en FX_CLOSE de una sesión anterior —
// data/currency-map.js, entrada 'ARS@2020-06-30'). Los dos referenciados vía
// fxRef contra FX_CLOSE (data/currency-map.js), sin escribir el número literal
// en este archivo.
//
// grossDebt/cash: del Balance General de cada ejercicio. 2021: cash = Caja
// (169.809,00) + Bancos (7.990.010,11) = 8.159.819,11. grossDebt = Deudas
// (Operativas + Soc. y previsionales, corriente y no corriente, + Otras
// Deudas), EXCLUYENDO "Provisiones para Juicios" (10.026.535,49, es una
// previsión contingente, no deuda financiera real — mismo criterio que excluye
// "Obligaciones de hacer"/Previsiones de Boca, club-data-mapping sección 14):
// 12.919.866,02 + 28.048.575,07 + 24.393.663,95 + 2.634.848,27 = 67.996.953,31.
// 2020: cash = Caja (74.976,00) + Bancos (2.401.240,39) = 2.476.216,39.
// grossDebt = Deudas Operativas corriente (16.824.397,70) + Soc. y
// previsionales (13.904.109,29) + Deudas Operativas no corriente
// (25.994.689,39) + Otras Deudas (2.634.848,27), mismo criterio de excluir
// Provisiones para Juicios (10.026.535,49): 16.824.397,70 + 13.904.109,29 +
// 25.994.689,39 + 2.634.848,27 = 59.358.044,65.
//
// GESTIÓN: "Sr. GROSI, Victor — Presidente" firma los 2 balances (2020: pág. 4
// y 6, junto con Miguel Mallamace -Tesorero- y Ariel Roseto -Secretario-;
// 2021: pág. 4 y 6-7), fuente primaria directa en ambos casos — gestionId
// 'grosi' cubre 2020-2021 (firstYear:2020, lastYear:2021). Sin más info sobre
// el rango completo de su gestión (cuándo empezó/terminó fuera de estos 2
// ejercicios confirmados).
// ============================================================================

const losandesRevenueLinesByYear = {
  // Ejercicio 104 (2019/2020, cerrado 30/6/2020). Fuente: balance-ejercicio-104-2019-20.md, pág. 4.
  // "ingresos otras actividades" y "concesiones" no tienen valor en la columna 2020 (solo en la
  // comparativa 2019) — no se cargan como línea de este ejercicio.
  2020: [
    { rawLabel:'cuotas sociales', normalizedCategory:'member_dues', amountNative:8.271273, disclosureLevel:'detailed' },
    { rawLabel:'futbol', normalizedCategory:'matchday_competition', amountNative:0.805561, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Afa', normalizedCategory:'broadcasting', amountNative:13.727357, disclosureLevel:'detailed' },
    { rawLabel:'colegio', normalizedCategory:'education', amountNative:13.397354, disclosureLevel:'detailed' },
    { rawLabel:'Sponsors planteles', normalizedCategory:'sponsorship_commercial', amountNative:57.769495, disclosureLevel:'detailed' },
    { rawLabel:'otros ingresos', normalizedCategory:'other_income', amountNative:2.880368, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'cuotas sociales', normalizedCategory:'member_dues', amountNative:12.546372, disclosureLevel:'detailed' },
    { rawLabel:'futbol', normalizedCategory:'matchday_competition', amountNative:9.797831, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Afa', normalizedCategory:'broadcasting', amountNative:16.310609, disclosureLevel:'detailed' },
    { rawLabel:'ingresos otras actividades', normalizedCategory:'other_income', amountNative:3.391620, disclosureLevel:'detailed' },
    { rawLabel:'colegio', normalizedCategory:'education', amountNative:22.448725, disclosureLevel:'detailed' },
    { rawLabel:'Sponsors planteles', normalizedCategory:'sponsorship_commercial', amountNative:40.672385, disclosureLevel:'detailed' },
    { rawLabel:'concesiones', normalizedCategory:'stadium_other', amountNative:2.019331, disclosureLevel:'detailed' },
    { rawLabel:'ingresos por ATP', normalizedCategory:'other_income', amountNative:16.003398, disclosureLevel:'detailed' },
    { rawLabel:'otros ingresos', normalizedCategory:'other_income', amountNative:2.254461, disclosureLevel:'detailed' },
  ],
};

const losandesExpenseLinesByYear = {
  // Ejercicio 104 (2019/2020). Fuente: balance-ejercicio-104-2019-20.md, "Cuadro de Gastos" (pág. 6
  // del PDF, transcripción garbled en el .md, releída visualmente — ver comentario de cabecera).
  // Cada celda no vacía de la matriz CUENTAS x ESTADIO/FUTBOL/ADMIN-SEDE/OTROS DPTOS es su propia
  // línea. Las 3 filas financieras (Gastos Financieros e Intereses, intereses sobre prestamos,
  // diferencia de cotizacion) NO están acá, van a fiscalYearMeta[2020].netInterest.
  2020: [
    { rawLabel:'Sueldos y Jornales (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-6.510399, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-20.833278, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-5.642346, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-10.416639, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-3.300246, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-0.660049, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-1.861974, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-3.607004, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.384000, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-1.437580, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.662500, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad Deportiva Pol. Ad (Fútbol)', normalizedCategory:'match_organisation_expense', amountNative:-1.215410, disclosureLevel:'detailed' },
    { rawLabel:'Conservación y Mantenimiento (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-1.715926, disclosureLevel:'detailed' },
    { rawLabel:'Conservación y Mantenimiento (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-1.354824, disclosureLevel:'detailed' },
    { rawLabel:'Conservación y Mantenimiento (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.815302, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y Comisiones Bancarias (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.139990, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y Comisiones Bancarias (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.815230, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Funcionamiento Adm (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-2.715358, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Funcionamiento Adm (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-2.312924, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Varios (Fútbol)', normalizedCategory:'other_expenses', amountNative:-3.870405, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Varios (Otros Dptos)', normalizedCategory:'other_expenses', amountNative:-5.135288, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Otros Dptos (Estadio)', normalizedCategory:'other_expenses', amountNative:-0.244154, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Otros Dptos (Admin/Sede)', normalizedCategory:'other_expenses', amountNative:-1.428312, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Otros Dptos (Otros Dptos)', normalizedCategory:'other_expenses', amountNative:-0.138450, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Públicos (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.614315, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Públicos (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-0.415218, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Públicos (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.329520, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Plantel Profesional (Fútbol)', normalizedCategory:'wages_squad', amountNative:-5.315840, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Encuentros AFA (Fútbol)', normalizedCategory:'match_organisation_expense', amountNative:-0.506325, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del Ejercicio (Estadio)', normalizedCategory:'depreciation', amountNative:-9.327397, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (Fútbol)', normalizedCategory:'wages_squad', amountNative:-0.832018, disclosureLevel:'detailed' },
    { rawLabel:'Juicios Honorarios (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-0.530000, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Plantel Inferiores (Fútbol)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.117452, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones Tarjetas de Crédito (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-2.351895, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos Varios (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-0.155720, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Sueldos y Jornales (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-7.746312, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-24.788199, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-6.713470, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-12.394099, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-2.733153, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-0.546631, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-2.215445, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-2.313779, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.240000, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Fútbol)', normalizedCategory:'wages_squad', amountNative:-9.209105, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios (Otros Dptos)', normalizedCategory:'youth_other_sports_expense', amountNative:-9.736530, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad Deportiva Pol. Ad. (Fútbol)', normalizedCategory:'match_organisation_expense', amountNative:-0.764518, disclosureLevel:'detailed' },
    { rawLabel:'Conservación y Mantenimiento (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-2.011749, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y Comisiones Bancarias (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.450567, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Funcionamiento Adm (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.114447, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Funcionamiento Adm (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-0.534593, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Varios (Otros Dptos)', normalizedCategory:'other_expenses', amountNative:-8.525557, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Otros Dptos (Estadio)', normalizedCategory:'other_expenses', amountNative:-0.049236, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Otros Dptos (Fútbol)', normalizedCategory:'other_expenses', amountNative:-1.597084, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Otros Dptos (Otros Dptos)', normalizedCategory:'other_expenses', amountNative:-1.852240, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Públicos (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.097540, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Públicos (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-0.528981, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Plantel Profesional (Fútbol)', normalizedCategory:'wages_squad', amountNative:-1.182661, disclosureLevel:'detailed' },
    { rawLabel:'Egresos por Encuentros AFA (Fútbol)', normalizedCategory:'match_organisation_expense', amountNative:-0.886767, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del Ejercicio (Estadio)', normalizedCategory:'depreciation', amountNative:-14.839652, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.033637, disclosureLevel:'detailed' },
    { rawLabel:'Juicios Honorarios (Estadio)', normalizedCategory:'admin_general_expense', amountNative:-0.497900, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Plantel Inferiores (Fútbol)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.136203, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones Tarjetas de Crédito (Admin/Sede)', normalizedCategory:'admin_general_expense', amountNative:-2.011045, disclosureLevel:'detailed' },
  ],
};

const losandesFiscalYearMeta = {
  2020: {
    currency:'ARS', fxRef:'ARS@2020-06-30',
    sourceId:'losandes-ar-balance-ejercicio-104-2019-20',
    reportType:'official_balance_sheet',
    gestionId:'grosi',
    netInterest:11.674284 - 1.595850 - 1.429500 - 0.581787, // REPCAM - Gastos financieros e intereses - intereses s/préstamos - diferencia de cotización (las 3 en columna Estadio este ejercicio)
    tax:0, profitOnPlayerSales:0, assetSales:0,
    grossDebt:59.358045, cash:2.476216,
    officialTotalRevenue:96.851408, officialTotalExpenses:100.713290, officialPAT:4.205265,
  },
  2021: {
    currency:'ARS', fxRef:'ARS@2021-06-30', // ahora centralizado en FX_CLOSE (data/currency-map.js)
    sourceId:'losandes-ar-balance-ejercicio-105-2020-21',
    reportType:'official_balance_sheet',
    gestionId:'grosi',
    netInterest:27.414122 - 0 - 0.357254 - 0.035231, // REPCAM - Gastos financieros e intereses - intereses s/préstamos - diferencia de cotización
    tax:0, profitOnPlayerSales:0, assetSales:0,
    grossDebt:67.996953, cash:8.159819,
    officialTotalRevenue:125.444731, officialTotalExpenses:114.751101, officialPAT:37.715267,
  },
};

const losandesPresupuestoOverlayByYear = {};

const losandesPasesData = [];
const losandesResultadosData = {};
const losandesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['losandes-ar'] = {
  revenueLinesByYear: losandesRevenueLinesByYear, expenseLinesByYear: losandesExpenseLinesByYear,
  fiscalYearMeta: losandesFiscalYearMeta, pasesData: losandesPasesData,
  resultadosData: losandesResultadosData, titulosData: losandesTitulosData,
  presupuestoOverlayByYear: losandesPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'losandes-ar-balance-ejercicio-104-2019-20': {
      id:'losandes-ar-balance-ejercicio-104-2019-20', clubId:'losandes-ar',
      title:'Balance General, Ejercicio Económico N° 104 (finalizado el 30/6/2020), Club Atlético Los Andes',
      type:'official_balance_sheet', reliability:'primary',
      note:'Transcripción OCR en Clubes/Argentina/Los Andes/balance-ejercicio-104-2019-20.md. El "Cuadro de Gastos" (pág. 6 del PDF) transcribió con columnas desalineadas en el .md — los valores cargados salen de una relectura visual de la página re-renderizada a 300dpi en esta sesión, no del .md tal cual está (ver comentario de cabecera de losandes-ar-data.js); se verificaron los 4 totales de columna y el total general contra lo impreso antes de cargar. Tipo de cambio: dólar mayorista de cierre (el documento no declara uno propio). Hay una serie completa 1993-2020/21 transcripta en la misma carpeta; con este ejercicio y el 105 ya hay 2 cargados, el resto sigue disponible para una sesión futura.',
    },
  'losandes-ar-balance-ejercicio-105-2020-21': {
      id:'losandes-ar-balance-ejercicio-105-2020-21', clubId:'losandes-ar',
      title:'Balance General, Ejercicio Económico N° 105 (finalizado el 30/6/2021), Club Atlético Los Andes',
      type:'official_balance_sheet', reliability:'primary',
      note:'Transcripción OCR en Clubes/Argentina/Los Andes/balance-ejercicio-105-2020-21.md. El "Cuadro de Gastos" (Anexo, pág. 7-8) transcribió garbled por rotación de página no corregida — los valores cargados salen de una relectura visual de las páginas re-rotadas en esta sesión, no del .md tal cual está (ver comentario de cabecera de losandes-ar-data.js). Tipo de cambio: dólar mayorista de cierre (el documento no declara uno propio). Hay una serie completa 1993-2020/21 transcripta en la misma carpeta, con el Ejercicio 104 también cargado.',
    },
});

gestionesByClub['losandes-ar'] = {
  grosi: { nombre:'Grosi (firma los balances 2019/2020 y 2020/2021)', firstYear:2020, lastYear:2021 },
};

memberCountByClub['losandes-ar'] = null;
