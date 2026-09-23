// ============================================================================
// data/tottenham-gb-data.js — Tottenham Hotspur Limited (clubId 'tottenham-gb'), Ejercicios
// 2023/24 y 2024/25 (cerrados el 30 de junio, confirmado en la carátula de los dos documentos:
// "Annual Report and Consolidated Financial Statements, 30 June 2024/2025" — OJO, el pedido
// original de sourcing asumía 31 de mayo como Arsenal/Liverpool, pero Tottenham cierra 30/6, ya
// confirmado antes de esta sesión en fuentes/Inglaterra/Tottenham Hotspur.md).
//
// ENTIDAD LEGAL: "Tottenham Hotspur Limited" — confirmado LITERAL en la carátula de los dos PDF.
// Company Registration No. 1706358 (Companies House, UK). Cuentas CONSOLIDADAS del grupo
// ("Consolidated income statement"/"Consolidated balance sheet"), no de una entidad individual.
//
// OJO PLANTEL MIXTO: el propio "Strategic report" de los dos ejercicios aclara que "The principal
// activities of the Group continue to be the operation of both a men's and a women's professional
// football club in England" — las cifras de este archivo son del GRUPO combinado, masculino +
// femenino, no solo del plantel masculino. Ídem Arsenal, mismo tipo de aclaración.
//
// Fuente: transcripciones completas en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-
// group-accounts-2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión, no se volvió a
// tocar el PDF).
//
// Cifras en GBP MILLONES nativos (el documento reporta en £'000, dividido por 1.000 al cargar).
// GBP es moneda NUEVA en el sitio (no existe todavía en data/currency-map.js/FX_CLOSE) — no se tocó
// ese archivo en esta sesión, a propósito (fuera de alcance, mismo criterio que arsenal-gb-data.js).
// Los dos ejercicios usan `fxRef` ('GBP@2024-06-30'/'GBP@2025-06-30') en vez de un `fx` literal:
// ninguno de los dos documentos declara un tipo de cambio propio GBP/USD de cierre para todo el
// balance (la Nota de "Financial risk management"/"Financial instruments" solo habla de exposición
// cualitativa a moneda extranjera por transferencias de jugadores, sin cotización de cierre), así
// que no aplica la regla #0 de club-data-mapping sección 5 y corresponde `market_close`/`fxRef` en
// vez de `fx` literal. El sitio va a tirar un console.warn hasta que se agreguen esas 2 entradas a
// FX_CLOSE — esperado, no es trabajo de esta sesión.
//
// ----------------------------------------------------------------------------------------------
// CATEGORIZACIÓN DE INGRESOS (Note 2 "Revenue and other income", 5 líneas idénticas en los dos
// ejercicios):
//   - "Match receipts" -> matchday_competition (recaudación de entradas de fútbol, EXCLUYE
//     merchandising, según aclara el propio Strategic report: "Matchday receipts excluding
//     merchandise from all competitions").
//   - "UEFA Prize money" -> competition_bonus (premio por participación/avance en competencia
//     europea, línea propia separada de la recaudación de entradas).
//   - "TV and media" -> broadcasting.
//   - "Commercial" -> sponsorship_commercial.
//   - "Other income" -> other_income (no cumple la definición de Revenue de IFRS 15 según el
//     propio documento; no tiene nota propia que explique de qué se compone más allá de la mención
//     genérica en el Strategic report).
//   DUDA GENUINA SIN RESOLVER, documentada en fuentes/Inglaterra/Tottenham Hotspur.md (no se pudo
//   escribir en Admin/dudas-por-club.md en esta sesión: ese archivo está fuera de alcance del
//   pedido): el Strategic report narra que "Commercial" (244,744 en 2024) incluye Sponsorship
//   revenue (£144,5 M), Merchandising revenue (£36,2 M) y "Other revenue" (£64,0 M, "driven by
//   hosting non-football events" — NFL, conciertos, F1 Drive, stadium tours, skywalk, conference &
//   events, memberships, catering), y ese "Other revenue" es justo la porción NO futbolística del
//   estadio que el pedido de esta tarea pedía evaluar para `stadium_other`. Pero la Nota 2
//   ("Revenue comprises") NO desglosa esa porción como línea propia con cifra exacta en £000: el
//   quiebre Sponsorship/Merchandising/Other revenue solo aparece en la prosa del Strategic report,
//   redondeado a £0,1 M, y sus tres partes no reconcilian centavo a centavo contra el "Commercial"
//   de la Nota 2 (244,5 vs. 244,744 en 2024). Por eso, siguiendo el criterio conservador de
//   club-data-mapping sección 1/13 ("stadium_other solo si el rótulo nombra el estadio
//   explícitamente"), NO se promovió "Other revenue" a `stadium_other`: el rótulo real de la Nota 2
//   es "Commercial" a secas, sin nombrar el estadio, y no hay cifra exacta que separar. Se cargó
//   "Commercial" como UNA sola línea (sponsorship_commercial) por su monto exacto de Nota 2. Si en
//   el futuro se consigue el desglose exacto (ej. de una nota interna, o preguntándole al club), se
//   puede promover la porción de eventos no futbolísticos a `stadium_other` sin tocar el resto.
//
// CATEGORIZACIÓN DE GASTOS (Note 3 "Operating expenses"):
//   - "Staff costs" (Note 5, un solo total agregado del grupo, sin desglose de costo por área —
//     igual que Arsenal) -> wages_squad.
//   - "Depreciation of property, plant and equipment" -> depreciation.
//   - "Loss/(profit) on disposal of property, plant and equipment" (línea chica, dentro del cuerpo
//     de "Operating expenses excluding football trading", no aparte) -> other_expenses.
//   - "Exceptional items - Onerous employment contracts" (2024) / "Onerous employment contracts and
//     other employment related payments" (2025): el propio documento la muestra como parte del
//     cuerpo de "Operating expenses excluding football trading" (no aparte del resultado
//     operativo, a diferencia del "Impairment of player registrations" de Arsenal 2024/25, que
//     tampoco es aparte). Se cargó a `admin_general_expense`, NO a `exceptional_items`: la fórmula
//     de officialTotalExpenses de este motor es `Math.abs(expenses+nonCash)`, que no suma
//     `exceptional_items` (ver plantilla de la tarea) — cargarla ahí habría dejado esa plata fuera
//     del total oficial impreso. Es la misma razón por la que Arsenal cargó su "Impairment of
//     player registrations" en `player_impairment` (adentro de nonCash) y no en `exceptional_items`.
//   - "Other operating costs" -> other_expenses (catch-all sin desglose adicional en las notas
//     transcriptas: incluye costos de operación del estadio, organización de partidos, marketing,
//     administración, etc. mezclados sin que ninguna nota los separe — a diferencia de Racing/
//     Vélez, este documento no tiene una matriz costo×área ni un desglose por departamento).
//   - "Amortisation, impairments and other net football trading income and expenditure" -> UNA sola
//     línea a `player_amortisation` (135,583 en 2024; 146,720 en 2025), SIN separar amortización de
//     deterioro. La Nota 4 ("Profit/(loss) from operations") sí da "Amortisation of intangible
//     fixed assets" y "Impairment of intangible fixed assets" por separado (136,287 + 1,822 =
//     138,109 en 2024), pero esa suma NO reconcilia contra el neto de 135,583 que imprime la Nota 3
//     como parte de "Total operating expenses" (diferencia de 2,526, probablemente algún ítem chico
//     de "football trading" no desglosado aparte, ej. comisiones de agentes u otro ajuste neto). Se
//     preferyó cargar el número EXACTO de la Nota 3 (el que sí reconcilia contra "Total operating
//     expenses" impreso) en una sola línea, en vez de forzar una separación amortización/deterioro
//     que introduciría un residuo sin explicación. 2025 no tuvo impairment según Nota 4 (£Nil), así
//     que para ese año la línea única es, en la práctica, pura amortización neta.
//
// "netInterest" = Nota 7 "Finance income and costs" (Finance income − Finance costs, NETO), con
// signo NEGATIVO en los dos ejercicios (costo neto). "tax" = Nota 8 "Total tax charge/(credit)",
// con signo tal que pbt + tax = pat: -0,196 M en 2024 (cargo), +25,962 M en 2025 (crédito).
// "profitOnPlayerSales" = Nota 6 "Profit on disposal of intangible fixed assets" (línea NETA
// separada del cuerpo de Operating expenses en la Cuenta de resultados, igual criterio que
// club-data-mapping sección 2/3). "assetSales" = 0: la ganancia/pérdida por venta de PPE ya está
// adentro de "Operating expenses" (ver arriba), no es una línea aparte del cuerpo principal.
//
// "grossDebt" = Nota 16 (2024) / Notas 15+16 (2025) "Interest-bearing loans and borrowings" (Bank
// loans secured + Other loans secured — el refinanciamiento del estadio, bonos privados a
// inversores de EE.UU. + préstamo de Bank of America Merrill Lynch), la línea angosta de deuda
// FINANCIERA que el propio balance separa de "Trade and other payables"/"Deferred income"/
// "Deferred tax liabilities"/"Provisions"/"FVTPL liabilities" (mismo criterio que Boca/Arsenal, ver
// club-data-mapping sección 14). En 2024 es 100% no corriente (851,448); en 2025 aparece por
// primera vez una porción CORRIENTE (3,986, Nota 15) además de la no corriente (847,666, Nota 16) —
// grossDebt 2025 = 3,986+847,666 = 851,652. "cash" = "Cash and cash equivalents" (Balance Sheet).
//
// VERIFICACIÓN (node -e, aritmética reproducible con los números de este archivo):
//   2023/24 (año ended 30/6/2024): revenue 528,191 M + expenses (-384,830 M) + nonCash
//     (-204,379 M) + profitOnPlayerSales (82,305 M) + netInterest (-47,317 M) + tax (-0,196 M) =
//     -26,226 M = officialPAT EXACTO ("Loss for the year" impreso, Nota 21/Cuenta de resultados).
//     officialTotalExpenses = |expenses+nonCash| = 589,209 M = "Total operating expenses" impreso
//     EXACTO (Nota 3).
//   2024/25 (año ended 30/6/2025): revenue 565,266 M + expenses (-464,561 M) + nonCash
//     (-203,668 M) + profitOnPlayerSales (52,565 M) + netInterest (-70,230 M) + tax (25,962 M) =
//     -94,666 M = officialPAT EXACTO ("Loss for the year" impreso). officialTotalExpenses =
//     |expenses+nonCash| = 668,229 M = "Total operating expenses" impreso EXACTO (Nota 3).
// Los dos cierran EXACTOS, sin residuo — no hizo falta forzar ningún número.
// ============================================================================

const tottenhamGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Match receipts', normalizedCategory:'matchday_competition', amountNative:105.847, disclosureLevel:'detailed' },
    { rawLabel:'UEFA Prize money', normalizedCategory:'competition_bonus', amountNative:1.262, disclosureLevel:'detailed' },
    { rawLabel:'TV and media', normalizedCategory:'broadcasting', amountNative:165.910, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:244.744, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:10.428, disclosureLevel:'not_disclosed' },
  ],
  2025: [
    { rawLabel:'Match receipts', normalizedCategory:'matchday_competition', amountNative:126.473, disclosureLevel:'detailed' },
    { rawLabel:'UEFA Prize money', normalizedCategory:'competition_bonus', amountNative:34.716, disclosureLevel:'detailed' },
    { rawLabel:'TV and media', normalizedCategory:'broadcasting', amountNative:126.993, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:276.699, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:0.385, disclosureLevel:'not_disclosed' },
  ],
};

const tottenhamGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-221.929, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment', normalizedCategory:'depreciation', amountNative:-68.796, disclosureLevel:'detailed' },
    { rawLabel:'Loss on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:-0.006, disclosureLevel:'detailed' },
    { rawLabel:'Exceptional items - Onerous employment contracts', normalizedCategory:'admin_general_expense', amountNative:-1.528, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-161.367, disclosureLevel:'not_disclosed' },
    { rawLabel:"Amortisation, impairments and other net football trading income and expenditure", normalizedCategory:'player_amortisation', amountNative:-135.583, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-255.811, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment', normalizedCategory:'depreciation', amountNative:-56.948, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:0.110, disclosureLevel:'detailed' },
    { rawLabel:'Exceptional items - Onerous employment contracts and other employment related payments', normalizedCategory:'admin_general_expense', amountNative:-11.601, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-197.259, disclosureLevel:'not_disclosed' },
    { rawLabel:"Amortisation, impairments and other net football trading income and expenditure", normalizedCategory:'player_amortisation', amountNative:-146.720, disclosureLevel:'detailed' },
  ],
};

const tottenhamGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'tottenham-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'levy',
    // grossDebt = Bank loans (secured) 80.908 + Other loans (secured) 770.540 (Nota 16, refinancia-
    // miento del estadio), 100% no corriente en este ejercicio. cash = Cash and cash equivalents.
    grossDebt:851.448, cash:78.974,
    profitOnPlayerSales:82.305, assetSales:0, netInterest:-47.317, tax:-0.196,
    officialTotalRevenue:528.191, officialTotalExpenses:589.209, officialPAT:-26.226,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'tottenham-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'levy',
    // grossDebt = porción corriente 3.986 (Nota 15, primera vez que aparece) + no corriente 847.666
    // (Nota 16) = 851.652.
    grossDebt:851.652, cash:20.413,
    profitOnPlayerSales:52.565, assetSales:0, netInterest:-70.230, tax:25.962,
    officialTotalRevenue:565.266, officialTotalExpenses:668.229, officialPAT:-94.666,
  },
};

const tottenhamGbPresupuestoOverlayByYear = {};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que arsenal-gb-data.js.
const tottenhamGbPasesData = [];
const tottenhamGbResultadosData = {};
const tottenhamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['tottenham-gb'] = {
  revenueLinesByYear: tottenhamGbRevenueLinesByYear, expenseLinesByYear: tottenhamGbExpenseLinesByYear,
  fiscalYearMeta: tottenhamGbFiscalYearMeta, pasesData: tottenhamGbPasesData,
  resultadosData: tottenhamGbResultadosData, titulosData: tottenhamGbTitulosData,
  presupuestoOverlayByYear: tottenhamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'tottenham-gb-group-accounts-2024': {
    id:'tottenham-gb-group-accounts-2024', clubId:'tottenham-gb',
    title:'Tottenham Hotspur Limited — Annual Report and Consolidated Financial Statements, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01706358/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Tottenham Hotspur Limited, depositado en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24). Las cifras del grupo incluyen la actividad del plantel masculino y del plantel femenino combinadas, tal como aclara el propio documento ("the operation of both a men\'s and a women\'s professional football club").',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2023-24.md. Cuentas consolidadas del grupo. No se encontró un tipo de cambio GBP/USD de cierre declarado por el documento para todo el balance (solo exposición cualitativa a moneda extranjera en transferencias de jugadores) — fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2024-06-30 (pendiente, fuera de alcance de esta sesión, mismo gotcha que arsenal-gb-data.js). Duda abierta sobre el desglose interno de "Commercial" (Sponsorship/Merchandising/Other revenue, este último con ingresos no futbolísticos del estadio) sin cifra exacta en la Nota 2 — ver comentario de cabecera de tottenham-gb-data.js.',
  },
  'tottenham-gb-group-accounts-2025': {
    id:'tottenham-gb-group-accounts-2025', clubId:'tottenham-gb',
    title:'Tottenham Hotspur Limited — Annual Report and Consolidated Financial Statements, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/01706358/filing-history',
    publicNote:'Balance consolidado auditado (Deloitte LLP, sin salvedades) de Tottenham Hotspur Limited, depositado en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25). Las cifras del grupo incluyen la actividad del plantel masculino y del plantel femenino combinadas, tal como aclara el propio documento ("the operation of both a men\'s and a women\'s professional football club").',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2024-25.md. Cuentas consolidadas del grupo. Mismo gotcha de fx que el ejercicio 2024: fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2025-06-30 (pendiente, fuera de alcance de esta sesión). Post balance sheet: el Executive Chairman Daniel Levy dejó el club el 4/9/2025, después del cierre de este ejercicio.',
  },
});

// gestionId 'levy': los dos ejercicios cargados confirman a Daniel Levy como Executive Chairman
// durante toda su duración ("Post year end the Executive Chairman, Daniel Levy, left the Club
// after nearly 25 years", Strategic report 2024/25; Levy figura como Director ejecutivo saliente
// el 4/9/2025 en el Directors' report). ENIC Sports Inc. (controlada por fideicomisos donde Levy y
// su familia tienen una participación del 29,88%) es la controlante última confirmada en los dos
// Directors' Reports. El rango firstYear/lastYear refleja SOLO los ejercicios efectivamente
// cargados (2024-2025), no una fecha de inicio de gestión (dato no confirmado por estos documentos
// puntuales). No se usa el nombre "Joe Lewis" acá: ninguno de los 2 documentos lo menciona por
// nombre (la trama de propiedad última de ENIC más allá de la familia Levy no está confirmada con
// solvencia por ESTA fuente).
gestionesByClub['tottenham-gb'] = { levy: { nombre:'Levy (Executive Chairman, ENIC)', firstYear:2024, lastYear:2025 } };

memberCountByClub['tottenham-gb'] = null;
