// ============================================================================
// data/athleticclub-data.js — Athletic Club (Bilbao), Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
// Anuales" oficial 2024-2025, presentado en la Asamblea General de socios, descargado de
// cdn.athletic-club.eus/txoko-utils/ — ver Clubes/España/Athletic Club/cuentas-anuales-2024-2025.pdf
// y su transcripción completa en cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
// Texto nativo, sin OCR.
//
// Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
// Tipo de cambio EUR/USD 1,172 al 30/6/2025 (mismo que el resto de los clubes con este cierre).
// `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por 1 USD, mismo sentido que
// ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera de
// data/realmadrid-data.js para el detalle completo.
//
// Categorización de Ingresos (cifra de negocios, 2 líneas):
// - "Ingresos deportivos" -> matchday_competition.
// - "Ingresos por abonados y socios" -> season_tickets (mezcla abonos+cuotas, el documento no las
//   separa, mismo criterio que el resto de los clubes españoles cargados esta sesión).
// - "Otros ingresos de explotación" + "Imputación de subvenciones" + "Otros Resultados" -> other_income.
//
// Categorización de Gastos:
// - "Sueldos y salarios plantilla deportiva" + "Cargas sociales" -> wages_squad.
// - "Otros Sueldos, salarios y asimilados" (personal no deportivo, el documento SÍ lo separa) ->
//   admin_general_expense.
// - "Aprovisionamientos" (otros consumos y gastos externos) + "Servicios exteriores" + "Tributos" +
//   "Otros gastos de gestión corriente" -> admin_general_expense.
// - "Desplazamientos" -> match_organisation_expense.
// - "Variación de existencias" (pequeño, -0,007 M) + "Pérdidas/deterioro provisiones comerciales"
//   (crédito neto este año) -> other_expenses.
// - "Amortización del inmovilizado" (11,089739 M, UNA sola línea, sin separar jugadores del resto):
//   cargada ENTERA como `depreciation`, NO `player_amortisation` — decisión específica de este club,
//   ver nota abajo.
//
// NOTA IMPORTANTE (específica de Athletic Club, no un criterio general): a diferencia de los otros
// clubes cargados esta sesión, Athletic tiene la política de cantera (solo jugadores formados en el
// País Vasco/Athletic, prácticamente no compra pases de otros clubes), así que su línea única de
// "Amortización del inmovilizado" es casi con certeza mayormente depreciación de activos fijos
// (estadio San Mamés, instalaciones), no amortización de fichajes. Se cargó entera como
// `depreciation` en vez de intentar forzar una separación que el documento no ofrece y que
// probablemente sería ~0 de todos modos dado el modelo del club.
//
// "Deterioro y resultado por enajenaciones del inmovilizado" (2,391898 M) -> fiscalYearMeta.profitOnPlayerSales
// (mismo tratamiento que el resto de los clubes, aunque acá el mix real puede incluir más activos
// materiales que pases de jugadores dado el modelo de cantera — de todos modos no hay revenueLine
// mejor para esto, ver club-data-mapping SKILL.md sección 2, nunca va como línea de ingreso).
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 171,509353 M - Expenses cash 154,642157 M -
// Non-cash 11,089739 M = Operating profit 5,777457 M; + profitOnPlayerSales 2,391898 M = 8,169355 M
// ≈ RESULTADO DE EXPLOTACIÓN impreso (8.169.354,65) EXACTO; + netInterest -0,476968 = 7,692387 M ≈
// RESULTADO ANTES DE IMPUESTOS impreso (7.692.386,44); + tax -0,711651 = 6,980736 M ≈ RESULTADO DEL
// EJERCICIO impreso (6.980.735,78) EXACTO.
// ============================================================================

const athleticclubRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos deportivos', normalizedCategory:'matchday_competition', amountNative:139.462259, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:26.937099, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:3.922252, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.157316, disclosureLevel:'detailed' },
    { rawLabel:'Otros Resultados', normalizedCategory:'other_income', amountNative:1.030427, disclosureLevel:'detailed' },
  ],
};

const athleticclubExpenseLinesByYear = {
  2025: [
    { rawLabel:'Variación de existencias de productos terminados y en curso de fabricación', normalizedCategory:'other_expenses', amountNative:-0.007075, disclosureLevel:'detailed' },
    { rawLabel:'Aprovisionamientos (otros consumos y gastos externos)', normalizedCategory:'admin_general_expense', amountNative:-1.479335, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-100.826491, disclosureLevel:'detailed' },
    { rawLabel:'Otros Sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-16.375180, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-4.870866, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-15.926377, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.431788, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-4.222025, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:0.260109, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-10.763129, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (activos fijos, sin fichajes por política de cantera)', normalizedCategory:'depreciation', amountNative:-11.089739, disclosureLevel:'detailed' },
  ],
};

const athleticclubFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'athleticclub-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // No se encontró línea "Deudas con entidades de crédito" en el balance (consistente con el
    // modelo de Athletic Club, sin deuda bancaria significativa) -> grossDebt en 0. cash = Efectivo
    // y otros activos líquidos equivalentes.
    grossDebt:0, cash:46.086948,
    profitOnPlayerSales:2.391898, assetSales:0, netInterest:-0.476968, tax:-0.711651,
    officialTotalRevenue:171.509353, officialTotalExpenses:165.731896, officialPAT:6.980736,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito.
const athleticclubPasesData = [];
const athleticclubResultadosData = {};
const athleticclubTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.athleticclub = {
  revenueLinesByYear: athleticclubRevenueLinesByYear, expenseLinesByYear: athleticclubExpenseLinesByYear,
  fiscalYearMeta: athleticclubFiscalYearMeta, pasesData: athleticclubPasesData,
  resultadosData: athleticclubResultadosData, titulosData: athleticclubTitulosData,
};

Object.assign(sources, {
  'athleticclub-cuentas-anuales-2024-25': {
      id:'athleticclub-cuentas-anuales-2024-25', clubId:'athleticclub',
      title:'Cuentas Anuales 2024-2025 (presentadas en la Asamblea General de socios), Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://cdn.athletic-club.eus/txoko-utils/',
      note:'PDF oficial, texto nativo (sin OCR). Transcripción completa de la cuenta de resultados en Clubes/España/Athletic Club/cuentas-anuales-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.athleticclub = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.athleticclub = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
