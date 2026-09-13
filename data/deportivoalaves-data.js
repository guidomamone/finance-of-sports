// ============================================================================
// data/deportivoalaves-data.js — Deportivo Alavés, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años; el club tenía 9
// ejercicios reales consecutivos disponibles 2016-17 a 2024-25, ver fuentes/España/Deportivo
// Alavés.md — se eligió el más reciente). Fuente: "Informe de Auditoría, Cuentas Anuales e Informe
// de Gestión" (auditor Sayma Auditores/HLB) — ver
// Clubes/España/Deportivo Alavés/cuentas-anuales-2024-2025.pdf y su transcripción en
// cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
//
// GOTCHA DE EXTRACCIÓN: PDF escaneado sin capa de texto (0 chars con pdftotext) — leído renderizando
// páginas a imagen (pdftoppm -r 150), calidad muy nítida, sin necesidad de Tesseract.
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
// - "Ingresos por comercialización" + "Ingresos por publicidad" -> sponsorship_commercial.
// - "Otros ingresos de explotación" + "Imputación de subvenciones" -> other_income.
//
// Categorización de Gastos:
// - "Sueldos y salarios de la plantilla deportiva" + "Cargas sociales" -> wages_squad.
// - "Otros sueldos, salarios y asimilados" -> admin_general_expense (el documento separa plantel de
//   resto del personal).
// - "Consumos de material deportivo" + "Variación de existencias" (crédito neto) + "Pérdidas/
//   deterioro provisiones comerciales" + "Gastos de adquisición de jugadores" -> other_expenses.
// - "Otros consumos" + "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" ->
//   admin_general_expense.
// - "Desplazamientos" -> match_organisation_expense.
// - "Amortización del inmovilizado": el documento YA separa "Amortización de derechos de adquisición
//   de jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation).
//
// "Deterioro y resultado por enajenaciones y otras" (15,096226 M) -> fiscalYearMeta.profitOnPlayerSales
// (no revenueLine, ver club-data-mapping SKILL.md sección 2).
//
// Alavés no tiene deuda bancaria en este balance (líneas "Deudas con entidades de crédito" en blanco
// tanto a largo como a corto plazo) — grossDebt se cargó en 0.
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 64,089611 M - Expenses cash 70,108822 M -
// Non-cash 6,061871 M = Operating profit -12,081082 M; + profitOnPlayerSales 15,096226 M =
// 3,015144 M = A.1) RESULTADO DE EXPLOTACIÓN impreso EXACTO; + netInterest -3,902985 M =
// -0,887841 M = A.3) RESULTADO ANTES DE IMPUESTOS impreso EXACTO; + tax +1,100000 M = 0,212159 M =
// A.5) RESULTADO DEL EJERCICIO impreso EXACTO.
// ============================================================================

const deportivoalavesRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:1.099404, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:4.850083, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:43.896471, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización', normalizedCategory:'sponsorship_commercial', amountNative:0.933491, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por publicidad', normalizedCategory:'sponsorship_commercial', amountNative:10.323112, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:2.780841, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.206209, disclosureLevel:'detailed' },
  ],
};

const deportivoalavesExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumos de material deportivo', normalizedCategory:'other_expenses', amountNative:-0.436733, disclosureLevel:'detailed' },
    { rawLabel:'Otros consumos', normalizedCategory:'admin_general_expense', amountNative:-1.737585, disclosureLevel:'detailed' },
    { rawLabel:'Variación de existencias', normalizedCategory:'other_expenses', amountNative:0.086784, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios de la plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-30.795231, disclosureLevel:'detailed' },
    { rawLabel:'Otros sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-8.867831, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-2.502813, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-12.513873, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.050063, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.030677, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-1.070689, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-3.879323, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-8.310788, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-5.257300, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'depreciation', amountNative:-0.804571, disclosureLevel:'detailed' },
  ],
};

const deportivoalavesFiscalYearMeta = {
  2025: {
    currency:'EUR', fx:0.8532, // 1/1,172 (ver comentario de cabecera)
    sourceId:'deportivoalaves-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // No hay línea "Deudas con entidades de crédito" con valor en el balance (ni a largo ni a corto
    // plazo) -> grossDebt en 0. cash = Tesorería.
    grossDebt:0, cash:5.216203,
    profitOnPlayerSales:15.096226, assetSales:0, netInterest:-3.902985, tax:1.100000,
    officialTotalRevenue:64.089611, officialTotalExpenses:76.170693, officialPAT:0.212159,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito.
const deportivoalavesPasesData = [];
const deportivoalavesResultadosData = {};
const deportivoalavesTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.deportivoalaves = {
  revenueLinesByYear: deportivoalavesRevenueLinesByYear, expenseLinesByYear: deportivoalavesExpenseLinesByYear,
  fiscalYearMeta: deportivoalavesFiscalYearMeta, pasesData: deportivoalavesPasesData,
  resultadosData: deportivoalavesResultadosData, titulosData: deportivoalavesTitulosData,
};

Object.assign(sources, {
  'deportivoalaves-cuentas-anuales-2024-25': {
      id:'deportivoalaves-cuentas-anuales-2024-25', clubId:'deportivoalaves',
      title:'Informe de Auditoría, Cuentas Anuales e Informe de Gestión 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://cms.bkndagroup.com/uploads/',
      note:'PDF oficial (auditor Sayma Auditores/HLB), escaneo sin capa de texto (leído renderizando a imagen). Transcripción completa de la cuenta de resultados en Clubes/España/Deportivo Alavés/cuentas-anuales-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.deportivoalaves = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.deportivoalaves = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
