// ============================================================================
// data/atleticomadrid-data.js — Club Atlético de Madrid, S.A.D., Ejercicio 2024/2025 (1/7/2024 a
// 30/6/2025).
//
// Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
// Anuales 2024-2025" oficial, descargado de atleticodemadrid.com/pdf/cuentas_anuales_2025.pdf — ver
// Clubes/España/Atlético de Madrid/cuentas-anuales-2024-2025.pdf y su transcripción completa de la
// cuenta de pérdidas y ganancias en cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
// Texto nativo, sin necesidad de OCR.
//
// Cifras en EUR MILLONES nativos (el documento reporta en EUROS completos, ej. "416.050.923,92" —
// se dividió por 1.000.000 al cargar, a diferencia de Real Madrid/Barcelona que ya reportan en miles
// de euros). Tipo de cambio EUR/USD 1,172 al 30/6/2025 (mismo que Real Madrid/Barcelona, misma fecha
// de cierre). `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por 1 USD, mismo sentido
// que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera de
// data/realmadrid-data.js para el detalle completo.
//
// Categorización de Ingresos (cifra de negocios, 6 líneas propias):
// - "Ingresos deportivos" -> matchday_competition (recaudación de partidos + participación en
//   competiciones; el documento no desglosa más, pero "abonados y socios" ya está separado aparte,
//   así que este ítem es sobre todo venta de entradas puntuales + premios).
// - "Ingresos por abonados y socios" -> season_tickets (mezcla abonos + cuotas de socios, el
//   documento no las separa, mismo tipo de aproximación que Real Madrid/Barcelona).
// - "Ingresos por retransmisiones" -> broadcasting.
// - "Ingresos de comercialización y publicidad" -> sponsorship_commercial.
// - "Otros ingresos por ventas" (0 este año) + "Ingresos por prestación de servicios" + "Otros
//   ingresos de explotación" + "Imputación de subvenciones" + "Otros resultados" -> other_income.
//
// Categorización de Gastos:
// - "Sueldos y Salarios plantilla deportiva" + "Cargas Sociales" -> wages_squad (Cargas Sociales no
//   se puede separar entre plantilla deportiva/no deportiva, mismo criterio ya usado en
//   Racing/Boca: cargas sociales acompaña siempre a wages_squad).
// - "Otros sueldos, salarios y asimilados" -> admin_general_expense (a diferencia de Real
//   Madrid/Barcelona, ESTE documento SÍ separa limpio el personal deportivo del resto, así que se
//   aprovechó el desglose real en vez de lumpear todo en wages_squad).
// - "Consumo de material deportivo" + "Deterioro de mercaderías" + "Gastos de adquisición de
//   jugadores" (comisiones, no amortización) + "Pérdidas/deterioro provisiones comerciales" ->
//   other_expenses.
// - "Otros consumos y gastos externos" + "Trabajos realizados por otras empresas" + "Servicios
//   exteriores" + "Tributos" + "Otros gastos de gestión corriente" -> admin_general_expense.
// - "Desplazamientos" -> match_organisation_expense.
// - "Amortización del inmovilizado": el propio documento YA separa "Amortización derechos
//   adquisición jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation), sin
//   necesitar derivar el split de una nota aparte (a diferencia de Real Madrid).
//
// "Deterioro y resultado por enajenaciones de inmovilizado" (44,176920 M, dominado por "Resultados
// por traspasos y bajas de jugadores" +48,088010 M) -> fiscalYearMeta.profitOnPlayerSales (no
// revenueLine, ver club-data-mapping SKILL.md sección 2).
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 459,686364 M - Expenses cash 393,541424 M -
// Non-cash 92,443417 M = Operating profit -26,298477 M; + profitOnPlayerSales 44,176920 M =
// 17,878443 M ≈ RESULTADO DE EXPLOTACIÓN impreso (17,878442, diferencia de EUR 1 por redondeo de
// muchos componentes a 6 decimales); + netInterest -23,797408 = -5,918965 M ≈ RESULTADO ANTES DE
// IMPUESTOS impreso (-5,918966); + tax -0,072276 = -5,991241 M = RESULTADO DEL EJERCICIO impreso
// EXACTO. Atlético cerró el ejercicio con pérdida neta real de EUR 5,99 M.
// ============================================================================

const atleticomadridRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos deportivos', normalizedCategory:'matchday_competition', amountNative:134.956779, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:56.319660, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisiones', normalizedCategory:'broadcasting', amountNative:109.218501, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:113.460859, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por prestación de servicios', normalizedCategory:'other_income', amountNative:2.095125, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:31.338766, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.345591, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_income', amountNative:11.951083, disclosureLevel:'detailed' },
  ],
};

const atleticomadridExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumo de material deportivo', normalizedCategory:'other_expenses', amountNative:-3.872953, disclosureLevel:'detailed' },
    { rawLabel:'Otros consumos y gastos externos', normalizedCategory:'admin_general_expense', amountNative:-12.678877, disclosureLevel:'detailed' },
    { rawLabel:'Trabajos realizados por otras empresas', normalizedCategory:'admin_general_expense', amountNative:-17.472737, disclosureLevel:'detailed' },
    { rawLabel:'Deterioro de mercaderías, materias primas y otros aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-0.778669, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Salarios plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-229.311862, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-10.191500, disclosureLevel:'detailed' },
    { rawLabel:'Otros sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-40.435701, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-43.186087, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-3.478864, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-9.289851, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-9.352189, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:0.192813, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-13.684947, disclosureLevel:'detailed' },
    { rawLabel:'Amortización derechos adquisición jugadores', normalizedCategory:'player_amortisation', amountNative:-76.372748, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'depreciation', amountNative:-16.070669, disclosureLevel:'detailed' },
  ],
};

const atleticomadridFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'atleticomadrid-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = Deudas con entidades de crédito, largo (28,092989 M) + corto plazo (32,956291 M).
    // cash = Efectivo y otros activos líquidos equivalentes.
    grossDebt:61.049280, cash:130.176510,
    profitOnPlayerSales:44.176920, assetSales:0, netInterest:-23.797408, tax:-0.072276,
    officialTotalRevenue:459.686364, officialTotalExpenses:485.984841, officialPAT:-5.991241,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito, mismo criterio que Vélez/Real Madrid/Barcelona.
const atleticomadridPasesData = [];
const atleticomadridResultadosData = {};
const atleticomadridTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.atleticomadrid = {
  revenueLinesByYear: atleticomadridRevenueLinesByYear, expenseLinesByYear: atleticomadridExpenseLinesByYear,
  fiscalYearMeta: atleticomadridFiscalYearMeta, pasesData: atleticomadridPasesData,
  resultadosData: atleticomadridResultadosData, titulosData: atleticomadridTitulosData,
};

Object.assign(sources, {
  'atleticomadrid-cuentas-anuales-2024-25': {
      id:'atleticomadrid-cuentas-anuales-2024-25', clubId:'atleticomadrid',
      title:'Cuentas Anuales 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.atleticodemadrid.com/pdf/cuentas_anuales_2025.pdf',
      note:'PDF oficial de 96 páginas, texto nativo (sin OCR). Balance/PyG individuales (no consolidado — el club no reporta como grupo con este nivel de detalle en este documento). Transcripción completa de la cuenta de resultados en Clubes/España/Atlético de Madrid/cuentas-anuales-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.atleticomadrid = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.atleticomadrid = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
