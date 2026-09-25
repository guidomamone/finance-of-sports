// ============================================================================
// data/losandes-ar-data.js — Club Atlético Los Andes (Lomas de Zamora, Buenos
// Aires, Asociación Civil). Club nuevo, primer ejercicio cargado: 2020/2021
// (Ejercicio Económico N° 105, cerrado el 30/6/2021), balance real.
//
// FUENTE: Clubes/Argentina/Los Andes/balance-ejercicio-105-2020-21.md
// (transcripción OCR, documento escaneado con CamScanner). NOTA: la carpeta
// tiene una serie completa 1993-2020/21 transcripta y SIN CARGAR — esta sesión
// cargó SOLO el Ejercicio 105 (2020-21) asignado; los demás ejercicios quedan
// disponibles para una sesión futura de onboarding (ver reporte de esta sesión).
//
// CALIDAD DE OCR: el "Estado de Recursos y Gastos" (pág. 4) y el "Balance
// General" (pág. 3) transcribieron limpio. El "Cuadro de Gastos" (Anexo,
// pág. 7-8) transcribió con texto ilegible/invertido en el .md (páginas 7 y 8
// del PDF están rotadas 90°/180° respectivamente — confirmado con
// `tesseract --psm 0`). Se re-renderizaron a 300dpi, se rotaron con PIL
// (pág. 7: -90°; pág. 8: 180°) y se leyeron visualmente con el Read tool para
// esta sesión — los valores de esta tabla NO salen del .md tal cual está (que
// sigue con el texto garbled de la transcripción original), salen de la
// relectura directa de las imágenes rotadas. Recomendado: re-OCRear y
// reemplazar esas 2 páginas en el .md en una sesión futura para que el archivo
// quede fiel (fuera de alcance de esta sesión, que se enfocó en cargar el dato).
//
// ESTRUCTURA DEL "CUADRO DE GASTOS": matriz 2 ejes, CUENTAS (concepto) x
// ESTADIO/FUTBOL/GASTOS ADMIN-SEDE/GASTOS OTROS DPTOS (sector), mismo patrón
// que Vélez/Gimnasia y Esgrima LP (club-data-mapping SKILL.md sección 14). Cada
// celda no vacía se cargó como línea propia, con el sector aclarado entre
// paréntesis en el rawLabel. Criterio de sector -> categoría (igual espíritu
// que Gimnasia y Esgrima LP, sección "CRITERIO DE SECTOR" de
// gimnasiaesgrima-ar-data.js): columna FUTBOL -> wages_squad para sueldos/
// cargas/honorarios/plantel profesional (incluye "Departamento Médico"-style
// costos no salariales del plantel, aunque acá no hay línea de médico
// separada), match_organisation_expense para "Seguridad Deportiva"/"Egresos
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
// sacaron a fiscalYearMeta[2021].netInterest en vez de expenseLines: "Gastos
// Financieros e Intereses" (Estadio, $0,00 en 2021), "intereses sobre
// prestamos" (Estadio, $357.253,94) y "diferencia de cotizacion" (Fútbol,
// $35.230,96) — club-data-mapping SKILL.md sección 2. El Estado de Recursos y
// Gastos (pág. 4) además trae "REPCAM" (RECPAM, resultado por exposición a la
// inflación — el documento está en moneda homogénea RT6, ver Nota 1) como una
// línea propia, sumada DESPUÉS de Gastos Administrativos, que también va neta a
// netInterest (mismo criterio "incluye RECPAM" que Vélez/Gimnasia).
// netInterest 2021 = 27.414.122,16 (REPCAM) - 0,00 - 357.253,94 - 35.230,96 =
// 27.021.637,26.
//
// VERIFICACIÓN: revenueLines suma exacto 125.444.731,23 (= TOTAL RECURSOS
// impreso, el documento no mezcla nada financiero en Recursos). expenseLines
// suma 114.751.101,38 (= "Gastos s/ Anexo IV" + "Gastos Administrativos" del
// Estado de Recursos y Gastos, 115.143.586,27, menos las 3 filas financieras de
// arriba, 392.484,90 — diff de 1 centavo por redondeo, irrelevante).
// 125.444.731,23 - 114.751.101,38 + 27.021.637,26 = 37.715.267,11 ≈
// RESULTADO FINAL EJERCICIO impreso ($37.715.267,12, diff de 1 centavo).
//
// TIPO DE CAMBIO: no se encontró Anexo de moneda extranjera con TC propio en
// este documento (a diferencia de Godoy Cruz, no hay Anexo de inversiones en
// USD). fxSource:'market_close': dólar mayorista BCRA de cierre del 30/6/2021,
// $95,72 (fuente: Ámbito Financiero, nota "Dólar hoy: a cuánto cerró este
// miércoles 30 de junio", 30/6/2021 — verificado con WebFetch en esta sesión).
// NOTA para la sesión de consolidación: este valor debería migrar a FX_CLOSE
// (data/currency-map.js, entrada 'ARS@2021-06-30') en vez de quedar literal
// acá, pero currency-map.js estaba fuera de alcance de esta sesión (archivo
// compartido, otros agentes trabajando en paralelo).
//
// grossDebt/cash: del Balance General (pág. 3). cash = Caja (169.809,00) +
// Bancos (7.990.010,11) = 8.159.819,11. grossDebt = Deudas (Operativas +
// Soc. y previsionales, corriente y no corriente, + Otras Deudas),
// EXCLUYENDO "Provisiones para Juicios" (10.026.535,49, es una previsión
// contingente, no deuda financiera real — mismo criterio que excluye
// "Obligaciones de hacer"/Previsiones de Boca, club-data-mapping sección 14):
// 12.919.866,02 + 28.048.575,07 + 24.393.663,95 + 2.634.848,27 = 67.996.953,31.
//
// GESTIÓN: "Sr. GROSI, Victor — Presidente" firma el balance (pág. 4, 6-7),
// fuente primaria directa. Sin más info sobre el rango de su gestión en esta
// sesión, se cargó solo para este ejercicio.
// ============================================================================

const losandesRevenueLinesByYear = {
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
  'losandes-ar-balance-ejercicio-105-2020-21': {
      id:'losandes-ar-balance-ejercicio-105-2020-21', clubId:'losandes-ar',
      title:'Balance General, Ejercicio Económico N° 105 (finalizado el 30/6/2021), Club Atlético Los Andes',
      type:'official_balance_sheet', reliability:'primary',
      note:'Transcripción OCR en Clubes/Argentina/Los Andes/balance-ejercicio-105-2020-21.md. El "Cuadro de Gastos" (Anexo, pág. 7-8) transcribió garbled por rotación de página no corregida — los valores cargados salen de una relectura visual de las páginas re-rotadas en esta sesión, no del .md tal cual está (ver comentario de cabecera de losandes-ar-data.js). Tipo de cambio: dólar mayorista de cierre (el documento no declara uno propio). Hay una serie completa 1993-2020/21 transcripta en la misma carpeta, sin cargar todavía.',
    },
});

gestionesByClub['losandes-ar'] = {
  grosi: { nombre:'Grosi (firma el balance 2020/2021)', firstYear:2021, lastYear:2021 },
};

memberCountByClub['losandes-ar'] = null;
