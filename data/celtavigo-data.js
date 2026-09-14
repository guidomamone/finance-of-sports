// ============================================================================
// data/celtavigo-data.js — Real Club Celta de Vigo, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años; el club tenía 4
// ejercicios reales con huecos, ver fuentes/España/Celta de Vigo.md — se eligió el más reciente).
// Fuente: "Cuentas Anuales Individuales" (se prefirieron sobre las consolidadas, también
// disponibles, para ser consistente con el resto de los clubes de esta sesión) — ver
// Clubes/España/Celta de Vigo/cuentas-anuales-individual-2024-2025.pdf y su transcripción en
// cuentas-anuales-individual-2024-2025-cuenta-resultados.md (misma carpeta). Texto nativo, sin OCR.
//
// Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
// Tipo de cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 =
// 1/1,172, EUR por 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver
// comentario de cabecera de data/realmadrid-data.js para el detalle completo.
//
// Categorización de Ingresos (cifra de negocios, 5 líneas):
// - "Ingresos por competiciones" -> competition_bonus.
// - "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
// - "Ingresos por retransmisión" -> broadcasting.
// - "Ingresos por publicidad" + "Ingresos por comercialización y otros" -> sponsorship_commercial.
// - "Otros ingresos de explotación" + "Imputación de subvenciones" -> other_income.
//
// Categorización de Gastos:
// - "Sueldos y salarios plantilla deportiva" + "Cargas sociales" -> wages_squad.
// - "Sueldos y salarios personal no deportivo" -> admin_general_expense (el documento separa
//   plantel de resto del personal).
// - "Deterioro de mercaderías" + "Pérdidas/deterioro provisiones comerciales" + "Gastos de
//   adquisición de jugadores" (comisiones) + "Otros resultados" (NEGATIVO este año, -0,276404 M) ->
//   other_expenses.
// - "Otros consumos y gastos externos" + "Servicios exteriores" + "Tributos" + "Otros gastos de
//   gestión corriente" -> admin_general_expense.
// - "Desplazamientos" -> match_organisation_expense.
// - "Amortización del inmovilizado": el documento YA separa "Amortización derechos adquisición de
//   jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation), sin necesitar
//   derivar el split de una nota aparte.
//
// "Deterioro y resultado por enajenaciones del inmovilizado" (26,807049 M, casi enteramente
// "Resultados procedentes del traspaso de jugadores") -> fiscalYearMeta.profitOnPlayerSales (no
// revenueLine, ver club-data-mapping SKILL.md sección 2).
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 91,310690 M - Expenses cash 99,460748 M -
// Non-cash 18,927863 M = Operating profit -27,077921 M; + profitOnPlayerSales 26,807049 M =
// -0,270872 M ≈ RESULTADO DE EXPLOTACIÓN impreso (-270.870,08) EXACTO; + netInterest -6,223713 M =
// -6,494585 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (-6.494.582,58); + tax +1,868266 M =
// -4,626319 M ≈ RESULTADO DEL EJERCICIO impreso (-4.626.316,24), diferencias de pocos euros por
// redondeo acumulado de muchos componentes, dentro de tolerancia. Celta cerró el ejercicio con
// pérdida neta real de EUR 4,63 M.
// ============================================================================

const celtavigoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:3.789801, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:6.123352, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:46.285832, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:12.580024, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización y otros', normalizedCategory:'sponsorship_commercial', amountNative:4.151533, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:17.135032, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:1.245116, disclosureLevel:'detailed' },
  ],
};

const celtavigoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Otros consumos y gastos externos', normalizedCategory:'admin_general_expense', amountNative:-3.104200, disclosureLevel:'detailed' },
    { rawLabel:'Deterioro de mercaderías, materias primas y otros', normalizedCategory:'other_expenses', amountNative:-0.153973, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-52.601970, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-6.896169, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-2.851427, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-11.155595, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.024927, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.200261, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-3.054748, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-11.683761, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-7.457313, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados (negativo este ejercicio)', normalizedCategory:'other_expenses', amountNative:-0.276404, disclosureLevel:'detailed' },
    { rawLabel:'Amortización derechos adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-16.226064, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'depreciation', amountNative:-2.701799, disclosureLevel:'detailed' },
  ],
};

const celtavigoFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'celtavigo-cuentas-anuales-individual-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = Deudas a largo plazo (58,054988 M) + Deudas a corto plazo (2,260363 M) — incluye
    // "deudas con entidades deportivas" y "otros pasivos financieros", no hay un subtotal
    // solo-bancario a largo plazo en este balance (a corto plazo, "Deudas con entidades de crédito"
    // es 0 este ejercicio). cash = Efectivo y otros activos líquidos equivalentes (Tesorería).
    grossDebt:60.315351, cash:13.975070,
    profitOnPlayerSales:26.807049, assetSales:0, netInterest:-6.223713, tax:1.868266,
    officialTotalRevenue:91.310690, officialTotalExpenses:118.388611, officialPAT:-4.626316,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito.
const celtavigoPasesData = [];
const celtavigoResultadosData = {};
const celtavigoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.celtavigo = {
  revenueLinesByYear: celtavigoRevenueLinesByYear, expenseLinesByYear: celtavigoExpenseLinesByYear,
  fiscalYearMeta: celtavigoFiscalYearMeta, pasesData: celtavigoPasesData,
  resultadosData: celtavigoResultadosData, titulosData: celtavigoTitulosData,
};

Object.assign(sources, {
  'celtavigo-cuentas-anuales-individual-2024-25': {
      id:'celtavigo-cuentas-anuales-individual-2024-25', clubId:'celtavigo',
      title:'Cuentas Anuales Individuales 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, texto nativo (sin OCR). Cuentas individuales (no consolidadas, aunque el club también publicó consolidadas por separado). Transcripción completa de la cuenta de resultados en Clubes/España/Celta de Vigo/cuentas-anuales-individual-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.celtavigo = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.celtavigo = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
