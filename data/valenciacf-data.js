// ============================================================================
// data/valenciacf-data.js — Valencia Club de Fútbol, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
// Anuales e Informe de Gestión" (cuentas INDIVIDUALES, auditadas por Ernst & Young), descargado de
// valenciacf.com/public/Attachment/ — ver Clubes/España/Valencia CF/cuentas-anuales-2024-2025.pdf y
// su transcripción en cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
//
// GOTCHA DE EXTRACCIÓN: PDF escaneado (imagen, sin capa de texto) — leído renderizando páginas a
// imagen (pdftoppm -r 150) con el Read tool, calidad suficiente para transcribir sin Tesseract.
//
// Cifras en EUR MILLONES nativos (documento en miles de €, dividido por 1.000 al cargar). Tipo de
// cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por
// 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera
// de data/realmadrid-data.js para el detalle completo.
//
// Categorización de Ingresos (cifra de negocios, 4 líneas):
// - "Ingresos por competiciones" -> competition_bonus.
// - "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
// - "Ingresos por retransmisión" -> broadcasting.
// - "Ingresos de comercialización y publicidad" -> sponsorship_commercial.
// - "Otros ingresos de explotación" + "Imputación de subvenciones" + "Otros resultados" -> other_income.
//
// Categorización de Gastos:
// - "Sueldos y salarios plantilla deportiva" + "Cargas sociales" -> wages_squad.
// - "Otros sueldos, salarios y asimilados" -> admin_general_expense (el documento separa plantel de
//   resto de personal).
// - "Consumo de material deportivo" + "Otros consumos" + "Deterioro de material deportivo" (crédito
//   neto) + "Pérdidas/deterioro provisiones comerciales" -> other_expenses.
// - "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" -> admin_general_expense.
// - "Desplazamientos" -> match_organisation_expense.
// - "Amortización del inmovilizado": el documento ya separa "Amortización de derechos de adquisición
//   de jugadores" (-> player_amortisation) de "Otras amortizaciones" (-> depreciation).
//
// "Deterioro y resultado por enajenaciones del inmovilizado" (41,572 M, dominado por "Resultados por
// enajenaciones y otras de jugadores" 24,763 M + una reversión de deterioro 16,809 M) ->
// fiscalYearMeta.profitOnPlayerSales (no revenueLine, ver club-data-mapping SKILL.md sección 2).
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 103,266 M - Expenses cash 109,271 M - Non-cash
// 12,481 M = Operating profit -18,486 M; + profitOnPlayerSales 41,572 M = 23,086 M = RESULTADO DE
// EXPLOTACIÓN impreso EXACTO; + netInterest -21,458 M = 1,628 M = RESULTADO ANTES DE IMPUESTOS
// impreso EXACTO; + tax -1,132 M = 0,496 M = RESULTADO DEL EJERCICIO impreso EXACTO.
// ============================================================================

const valenciacfRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:9.544, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:16.821, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:53.247, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:17.994, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:0.734, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.116, disclosureLevel:'detailed' },
    { rawLabel:'Otros resultados', normalizedCategory:'other_income', amountNative:4.810, disclosureLevel:'detailed' },
  ],
};

const valenciacfExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumo de material deportivo', normalizedCategory:'other_expenses', amountNative:-0.780, disclosureLevel:'detailed' },
    { rawLabel:'Otros consumos', normalizedCategory:'other_expenses', amountNative:-0.603, disclosureLevel:'detailed' },
    { rawLabel:'Deterioro de material deportivo, comercialización y otros', normalizedCategory:'other_expenses', amountNative:0.011, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y salarios plantilla deportiva', normalizedCategory:'wages_squad', amountNative:-70.708, disclosureLevel:'detailed' },
    { rawLabel:'Otros sueldos, salarios y asimilados', normalizedCategory:'admin_general_expense', amountNative:-8.054, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales', normalizedCategory:'wages_squad', amountNative:-4.475, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-18.172, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.463, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-1.545, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.004, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-4.478, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de adquisición de jugadores', normalizedCategory:'player_amortisation', amountNative:-10.354, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones', normalizedCategory:'depreciation', amountNative:-2.127, disclosureLevel:'detailed' },
  ],
};

const valenciacfFiscalYearMeta = {
  2025: {
    currency:'EUR', fx:0.8532, // 1/1,172 (ver comentario de cabecera)
    sourceId:'valenciacf-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = Deudas con entidades de crédito, largo (116,269 M) + corto plazo (5,424 M). cash =
    // Tesorería.
    grossDebt:121.693, cash:31.752,
    profitOnPlayerSales:41.572, assetSales:0, netInterest:-21.458, tax:-1.132,
    officialTotalRevenue:103.266, officialTotalExpenses:121.752, officialPAT:0.496,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito.
const valenciacfPasesData = [];
const valenciacfResultadosData = {};
const valenciacfTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.valenciacf = {
  revenueLinesByYear: valenciacfRevenueLinesByYear, expenseLinesByYear: valenciacfExpenseLinesByYear,
  fiscalYearMeta: valenciacfFiscalYearMeta, pasesData: valenciacfPasesData,
  resultadosData: valenciacfResultadosData, titulosData: valenciacfTitulosData,
};

Object.assign(sources, {
  'valenciacf-cuentas-anuales-2024-25': {
      id:'valenciacf-cuentas-anuales-2024-25', clubId:'valenciacf',
      title:'Cuentas Anuales e Informe de Gestión 2024-2025 (Individuales, Informe de Auditoría de EY), Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.valenciacf.com/public/Attachment/',
      note:'PDF oficial de 64 páginas, escaneo sin capa de texto (leído renderizando a imagen). Cuentas individuales, auditadas por Ernst & Young sin salvedades. Transcripción completa de la cuenta de resultados en Clubes/España/Valencia CF/cuentas-anuales-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.valenciacf = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.valenciacf = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
