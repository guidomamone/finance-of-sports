// ============================================================================
// data/udechile-cl-data.js — Universidad de Chile (Azul Azul S.A.), Santiago,
// Chile. clubId = 'udechile-cl' (sufijo de país, ver CONVENCIONES.md Versión
// 129 — 'udechile' a secas lo marca audit.js como clubid-sin-pais, P1). Primer
// club chileno cargado en finance-of-sports. 3 ejercicios REALES cargados:
// 2024, 2023, 2022 (balances auditados consecutivos, sin años faltantes en el
// medio).
//
// FUENTE: Estados Financieros Consolidados bajo IFRS, descargados de la CMF
// (Comisión para el Mercado Financiero de Chile, ficha
// cmfchile.cl/institucional/mercados/entidad.php?mercado=V&rut=76838140&tipoentidad=RVEMI,
// pestaña "Información Financiera"), auditados por KAM Auditores Consultores
// Ltda. Transcripciones completas (texto nativo vía pdftotext -layout) en
// `Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-<año>.md`.
// Cada documento trae el ejercicio propio + un comparativo del año anterior;
// se verificó cruzando los 3 documentos entre sí que el comparativo de un
// balance coincide EXACTO (sin reexpresar) con el año corriente del balance de
// ESE año — Chile no reexpresa por inflación entre ejercicios, a diferencia de
// los balances RT6 argentinos — así que no hay riesgo de mezclar columnas de
// dos fechas de cierre distintas (ver club-data-mapping SKILL.md sección 6.5).
//
// CIFRAS: el documento está en MILES de pesos chilenos (M$). Acá se guardan
// divididas por 1.000, en MILLONES de CLP nativos (mismo criterio que
// oncecaldas-data.js para COP).
//
// TIPO DE CAMBIO: ninguno de los 3 balances declara su propio tipo de cambio
// de cierre en un Anexo dedicado — se buscó explícito ("moneda extranjera"/
// "Riesgo de Tipo de Cambio" en la Nota de Análisis de Riesgo de los 3 años) y
// los 3 solo traen un análisis de SENSIBILIDAD (+/-10% sobre el tipo de cambio
// de cierre, sin publicar el valor del propio tipo de cambio usado) más el %
// de deuda en moneda extranjera sobre el total. Por eso se usa el dólar
// observado SII de cierre, `fx` LITERAL con `fxSource:'market_approx'`:
// 2022 $859,51; 2023 $884,59; 2024 $992,12 (fin de semana, sin publicación
// propia del 31/12 exacto en los 3 años) — NO un `fxRef` a FX_CLOSE en
// data/currency-map.js, que es solo para cotizaciones EXACTAS
// (`market_close`); ver la regla en el comentario de esa tabla.
//
// ESTRUCTURA DEL P&L: a diferencia de Boca/River/Racing (formato por
// naturaleza del gasto), Azul Azul reporta "por función" (Costo de Ventas +
// Gasto de Administración), formato IFRS estándar de sociedad anónima. El
// desglose por RUBRO real está en las notas:
//   - Nota "Ingresos de Actividades Ordinarias": 6 líneas (Borderó, Publicidad,
//     Participación torneos Internacionales, Derechos de T.V., Ingresos por
//     transferencias de pases de jugadores, Ingresos varios) — de ahí sale
//     revenueLines completo, no hace falta ningún catch-all no clasificable.
//   - Nota "Composición de Cuentas de Resultados Relevantes", parte a) Costo
//     de Ventas: Borderó (costos directos), Remuneraciones, Amortización de
//     pases, Costo de venta de pases de jugadores, Otros gastos de operación.
//   - Misma nota, parte b) Gastos de Administración: Servicios básicos,
//     Asesorías, Depreciaciones y amortizaciones, Arriendos, Mantenciones,
//     Remuneraciones Administración, Otros Gastos de Administración.
// Los 2 rubros (Costo de Ventas y Gasto de Administración) son subtotales de
// FUNCIÓN, no de naturaleza — se promovieron sus 12 líneas combinadas a
// primer nivel (ver club-data-mapping SKILL.md sección 1: si cada sub-ítem
// tiene una categoría real distinta, no un bolsón `lump_football_operations`).
//
// CATEGORIZACIÓN (rubros sin precedente exacto en otros clubes):
//   - "Borderó" (ingreso) = recaudación de partidos (Torneo Nacional, Copa
//     Chile, Torneos Internacionales, amistosos), término chileno para la
//     distribución de taquilla → matchday_competition.
//   - "Borderó (costos directos)" (gasto) = costos de organizar cada evento,
//     traslados y concentración del plantel (según la propia Nota de
//     Información por Segmentos, que separa esto de "Remuneraciones") →
//     match_organisation_expense.
//   - "Participación torneos Internacionales" (ingreso) = premio/bono por
//     participar en competencias internacionales, separado de Borderó por el
//     propio documento → competition_bonus.
//   - "Remuneraciones"/"Remuneraciones Administración" → wages_squad (plantel,
//     dentro de Costo de Ventas) / admin_general_expense (administración,
//     dentro de Gasto de Administración) respectivamente — mismo criterio de
//     "cargas/sueldos van con su sector" de club-data-mapping SKILL.md sección
//     17.
//   - "Amortización de pases" / "Costo de venta de pases de jugadores" →
//     player_amortisation (igual criterio que Once Caldas/Racing: costo de
//     adquirir/vender el derecho federativo del jugador).
//   - "Otros gastos de operación" (dentro de Costo de Ventas, sin desglose
//     adicional en la fuente) → other_expenses.
//   - Todo el resto de Gastos de Administración (servicios básicos, asesorías,
//     arriendos, mantenciones, otros gastos de administración) →
//     admin_general_expense; "Depreciaciones y amortizaciones" → depreciation.
//
// RESULTADO FINANCIERO (netInterest, NUNCA como línea, ver club-data-mapping
// SKILL.md sección 2): el propio Estado de Resultados imprime, debajo de
// "Gasto de administración", 4 líneas antes de "Ganancia (pérdida), antes de
// impuestos": Ingresos financieros, Otras ganancias o pérdidas, Costos
// financieros, Diferencia de cambio, Resultado por unidades de reajuste (este
// último es el ajuste por UF/inflación de partidas indexadas, típico de
// Chile). Las 5 se suman netas a `netInterest`. Confirmación fuerte de que
// esta agrupación es la correcta: la propia Nota de Información por Segmentos
// (Nota 23, 2024) suma estas mismas 5 líneas bajo su propia fila "Resultado
// no operacional" — o sea que el documento MISMO ya las trata como un bloque
// financiero/no-operacional separado de Ingresos/Costo de Ventas/Gasto de
// Administración.
//
// "(Gasto) utilidad por impuestos a las ganancias" → `tax` en fiscalYearMeta
// (mismo campo que Once Caldas), no como línea.
//
// grossDebt = "Otros pasivos financieros" corrientes + no corrientes (línea
// angosta de deuda financiera real, NO el Total Pasivos completo — mismo
// criterio que Boca/Vélez, ver club-data-mapping SKILL.md sección 14: el
// Estado de Situación Financiera de Azul Azul separa esta deuda financiera de
// "Cuentas por pagar comerciales"/"Otros pasivos no financieros"/
// "Provisiones", así que se usa la línea angosta). cash = "Efectivo y
// equivalentes al efectivo".
//
// VERIFICACIÓN (los 3 años, club-data-mapping SKILL.md sección 6): revenueLines
// suma EXACTO el total impreso de "Ingresos de Actividades Ordinarias" en los
// 3 años (24.057,808 / 18.684,003 / 14.515,925 M CLP — con una diferencia de
// redondeo de 0,001 M en 2022, ver nota puntual abajo). expenseLines suma
// EXACTO el total de Costo de Ventas + Gasto de Administración impreso en los
// 3 años. Revenue + Expenses + netInterest + tax reconstruye la "Ganancia
// (pérdida)" final impresa, exacto, en los 3 años:
//   2024: 24057,808 - 22260,627 - 1473,596 + 920,675 = 1244,260 (oficial: 1.244.260)
//   2023: 18684,003 - 16918,563 - 1391,540 + 1162,475 = 1536,375 (oficial: 1.536.375)
//   2022: 14515,925 - 16432,670 -  448,920 +  669,533 = -1696,132 (oficial: -1.696.132)
// ============================================================================

const udechileRevenueLinesByYear = {
  2024: [
    { rawLabel:'Borderó', normalizedCategory:'matchday_competition', amountNative:9574.716, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:7599.088, disclosureLevel:'detailed' },
    { rawLabel:'Participación torneos Internacionales', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:5050.756, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de pases de jugadores', normalizedCategory:'player_sales', amountNative:38.069, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:1795.179, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Borderó', normalizedCategory:'matchday_competition', amountNative:2806.350, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:5304.156, disclosureLevel:'detailed' },
    { rawLabel:'Participación torneos Internacionales', normalizedCategory:'competition_bonus', amountNative:46.861, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:4835.724, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de pases de jugadores', normalizedCategory:'player_sales', amountNative:4790.420, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:900.492, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Borderó', normalizedCategory:'matchday_competition', amountNative:2575.833, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:6052.638, disclosureLevel:'detailed' },
    { rawLabel:'Participación torneos Internacionales', normalizedCategory:'competition_bonus', amountNative:7.004, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de T.V.', normalizedCategory:'broadcasting', amountNative:4377.614, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por transferencias de pases de jugadores', normalizedCategory:'player_sales', amountNative:448.862, disclosureLevel:'detailed' },
    // 1.053,975 M impreso (pág. 76 del documento propio de 2022) — la suma de las 6 líneas da
    // 14.515,926 M contra el total impreso de 14.515,925 M (diferencia de 0,001 M = 1.000 pesos,
    // redondeo del propio documento entre esta cifra y su comparativo en el balance 2023, que
    // imprime 1.053,974 M para el mismo concepto). Se usa el valor tal cual imprime CADA documento
    // en su propio año corriente (regla de club-data-mapping SKILL.md sección 6.5); el
    // officialTotalRevenue de abajo usa el total impreso (14.515,925), no esta suma.
    { rawLabel:'Ingresos varios', normalizedCategory:'other_income', amountNative:1053.975, disclosureLevel:'detailed' },
  ],
};

const udechileExpenseLinesByYear = {
  2024: [
    // Nota "Composición de Cuentas de Resultados Relevantes" a) Costo de Ventas ($18.046,118 M impreso):
    { rawLabel:'Costo de Ventas: Borderó (costos directos)', normalizedCategory:'match_organisation_expense', amountNative:-2746.903, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Remuneraciones', normalizedCategory:'wages_squad', amountNative:-8937.407, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2269.652, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Costo de venta de pases de jugadores', normalizedCategory:'player_amortisation', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Otros gastos de operación', normalizedCategory:'other_expenses', amountNative:-4092.156, disclosureLevel:'detailed' },
    // b) Gasto de Administración ($4.214,509 M impreso):
    { rawLabel:'Gasto de Administración: Servicios básicos', normalizedCategory:'admin_general_expense', amountNative:-65.390, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Asesorías', normalizedCategory:'admin_general_expense', amountNative:-610.772, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Depreciaciones y amortizaciones', normalizedCategory:'depreciation', amountNative:-377.541, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Arriendos', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Mantenciones', normalizedCategory:'admin_general_expense', amountNative:-196.665, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-1674.160, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Otros Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-1289.981, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Costo de Ventas: Borderó (costos directos)', normalizedCategory:'match_organisation_expense', amountNative:-1104.130, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Remuneraciones', normalizedCategory:'wages_squad', amountNative:-7255.110, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2375.002, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Costo de venta de pases de jugadores', normalizedCategory:'player_amortisation', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Otros gastos de operación', normalizedCategory:'other_expenses', amountNative:-2646.483, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Servicios básicos', normalizedCategory:'admin_general_expense', amountNative:-118.769, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Asesorías', normalizedCategory:'admin_general_expense', amountNative:-538.959, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Depreciaciones y amortizaciones', normalizedCategory:'depreciation', amountNative:-353.272, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Arriendos', normalizedCategory:'admin_general_expense', amountNative:-0.350, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Mantenciones', normalizedCategory:'admin_general_expense', amountNative:-162.117, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-1230.957, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Otros Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-1133.414, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Costo de Ventas: Borderó (costos directos)', normalizedCategory:'match_organisation_expense', amountNative:-961.223, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Remuneraciones', normalizedCategory:'wages_squad', amountNative:-7144.464, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Amortización de pases', normalizedCategory:'player_amortisation', amountNative:-2121.734, disclosureLevel:'detailed' },
    // Este año SÍ tuvo costo de venta de pases real (indemnización por término anticipado de
    // contrato de un jugador, ver Nota de detalle): -25.341, a diferencia de 2023/2024 (ambos $0).
    { rawLabel:'Costo de Ventas: Costo de venta de pases de jugadores (indemnización por término anticipado de contrato)', normalizedCategory:'player_amortisation', amountNative:-25.341, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Ventas: Otros gastos de operación', normalizedCategory:'other_expenses', amountNative:-2256.954, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Servicios básicos', normalizedCategory:'admin_general_expense', amountNative:-87.160, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Asesorías', normalizedCategory:'admin_general_expense', amountNative:-539.389, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Depreciaciones y amortizaciones', normalizedCategory:'depreciation', amountNative:-565.863, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Arriendos', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Mantenciones', normalizedCategory:'admin_general_expense', amountNative:-199.486, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Remuneraciones Administración', normalizedCategory:'admin_general_expense', amountNative:-1387.777, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de Administración: Otros Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-1143.279, disclosureLevel:'detailed' },
  ],
};

const udechileFiscalYearMeta = {
  2024: {
    currency:'CLP', fx:992.12, fxSource:'market_approx',
    sourceId:'udechile-cl-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (85,232) + Otras ganancias o pérdidas (0) + Costos financieros (-833,835)
    // + Diferencia de cambio (23,090) + Resultado por unidades de reajuste (-748,083) — el propio
    // documento agrupa estas 5 líneas bajo "Resultado no operacional" en su Nota de Información por
    // Segmentos, ver comentario de cabecera.
    netInterest:-1473.596,
    tax:920.675,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Otros pasivos financieros corrientes (1.471,735) + no corrientes (12.244,506).
    grossDebt:13716.241,
    cash:2024.494, // Efectivo y equivalentes al efectivo
    officialTotalRevenue:24057.808, officialTotalExpenses:22260.627, officialPAT:1244.260,
  },
  2023: {
    currency:'CLP', fx:884.59, fxSource:'market_approx',
    sourceId:'udechile-cl-estados-financieros-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (88,441) + Otras ganancias o pérdidas (8,078) + Costos financieros
    // (-854,683) + Diferencia de cambio (39,647) + Resultado por unidades de reajuste (-673,023).
    netInterest:-1391.540,
    tax:1162.475,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:14497.179, // 1.394,004 (corriente) + 13.103,175 (no corriente)
    cash:812.088,
    officialTotalRevenue:18684.003, officialTotalExpenses:16918.563, officialPAT:1536.375,
  },
  2022: {
    currency:'CLP', fx:859.51, fxSource:'market_approx',
    sourceId:'udechile-cl-estados-financieros-2022',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (142,003) + Otras ganancias o pérdidas (0,181) + Costos financieros
    // (+1.507,393 NETO POSITIVO este año: incluye una condonación de multas e intereses por prepago
    // de una deuda tributaria heredada de la concesión de Corfuch a la Tesorería General, ver la
    // propia Nota de "Composición de Cuentas de Resultados Relevantes" c) Costos Financieros del
    // documento 2022 — no es un error de signo, el documento lo imprime así) + Diferencia de cambio
    // (-519,700) + Resultado por unidades de reajuste (-1.578,797).
    netInterest:-448.920,
    tax:669.533,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:14307.914, // 490,377 (corriente) + 13.817,537 (no corriente)
    cash:1665.904,
    officialTotalRevenue:14515.925, officialTotalExpenses:16432.670, officialPAT:-1696.132,
  },
};

const udechilePresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
// club (fuera de alcance de esta sesión, enfocada en Finanzas 2022-2024). Arrays vacíos en vez de
// placeholders inventados.
const udechilePasesData = [];
const udechileResultadosData = {};
const udechileTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['udechile-cl'] = {
  revenueLinesByYear: udechileRevenueLinesByYear, expenseLinesByYear: udechileExpenseLinesByYear,
  fiscalYearMeta: udechileFiscalYearMeta, pasesData: udechilePasesData,
  resultadosData: udechileResultadosData, titulosData: udechileTitulosData,
  presupuestoOverlayByYear: udechilePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'udechile-cl-estados-financieros-2024': {
    id:'udechile-cl-estados-financieros-2024', clubId:'udechile-cl',
    title:'Estados Financieros Consolidados bajo IFRS al 31 de diciembre de 2024 y 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de la CMF (Comisión para el Mercado Financiero de Chile), ficha de Azul Azul S.A. (RUT 76.838.140-0), pestaña "Información Financiera". Auditado por KAM Auditores Consultores Ltda. (Freddy Lizana S.), opinión sin salvedades. Cifras impresas en miles de pesos (M$); ninguna nota declara un tipo de cambio propio de cierre (solo un análisis de sensibilidad +/-10%, sin valor puntual), se usó el dólar observado SII de mercado (ver data/currency-map.js). Transcripción completa en Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2024.md.',
  },
  'udechile-cl-estados-financieros-2023': {
    id:'udechile-cl-estados-financieros-2023', clubId:'udechile-cl',
    title:'Estados Financieros Consolidados bajo IFRS al 31 de diciembre de 2023 y 2022',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de la CMF, misma ficha que el ejercicio 2024. Cifras confirmadas idénticas (sin reexpresar) contra el comparativo "2023" que trae el balance 2024. Transcripción completa en Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2023.md.',
  },
  'udechile-cl-estados-financieros-2022': {
    id:'udechile-cl-estados-financieros-2022', clubId:'udechile-cl',
    title:'Estados Financieros Consolidados bajo IFRS al 31 de diciembre de 2022 y 2021',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado de la CMF, misma ficha. Cifras confirmadas idénticas (sin reexpresar) contra el comparativo "2022" que trae el balance 2023, salvo una diferencia de redondeo de 0,001 M CLP en "Ingresos varios" (1.053,975 M en el documento propio de 2022 vs. 1.053,974 M en el comparativo del documento 2023) — redondeo del propio emisor, no un error de transcripción. Transcripción completa en Clubes/Chile/Universidad de Chile (Azul Azul)/estados-financieros-2022.md.',
  },
});

// gestionesByClub: Azul Azul S.A. es una sociedad anónima deportiva profesional (no un club
// asociativo con presidente electo) — no se pudo confirmar con confianza una atribución de
// "gestión"/directorio específica por ejercicio en esta sesión. Se agrega una entrada genérica
// "Gestión actual" (mismo criterio que Once Caldas/Envigado, club-data-mapping SKILL.md sección 7).
gestionesByClub['udechile-cl'] = {
  actual: { nombre:'Gestión actual', firstYear:2022, lastYear:2024 },
};

memberCountByClub['udechile-cl'] = null;
