// ============================================================================
// data/sevillafc-data.js — Sevilla Fútbol Club, S.A.D., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Un solo ejercicio (alcance de esta sesión: sumar clubes, no profundizar años). Fuente: "Cuentas
// Anuales" oficiales, descargadas de la página de la Junta General de Accionistas
// (sevillafc.es/el-club/la-entidad/accionista/jga) — ver
// Clubes/España/Sevilla FC/cuentas-anuales-2024-2025.pdf y su transcripción en
// cuentas-anuales-2024-2025-cuenta-resultados.md (misma carpeta).
//
// GOTCHA DE EXTRACCIÓN: este PDF es un escaneo sin capa de texto (pdftotext devuelve ~1 char por
// página desde la página 6 en adelante) — se leyó renderizando páginas a imagen (pdftoppm -r 150) y
// usando el Read tool, no hizo falta Tesseract porque la imagen es nítida y se pudo transcribir
// directo. Página impresa 3 del documento = Cuenta de Pérdidas y Ganancias.
//
// Cifras en EUR MILLONES nativos (documento en miles de €, dividido por 1.000 al cargar — el número
// impreso leído como decimal ya da millones, mismo criterio que Real Madrid/Barcelona). Tipo de
// cambio EUR/USD 1,172 al 30/6/2025. `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por
// 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio) — ver comentario de cabecera
// de data/realmadrid-data.js para el detalle completo.
//
// Sevilla tuvo un ejercicio 2024/25 MUY MALO: pérdida neta de EUR 54,061 M, revenue cayó de 174,970
// a 115,185 M (caída de ~34%, consistente con no clasificar a competición europea esa temporada,
// "Ingresos por competiciones" cayó de 61,775 a solo 7,193 M), y Patrimonio Neto NEGATIVO (-122,813
// M) al cierre — situación patrimonial muy comprometida.
//
// Categorización de Ingresos (cifra de negocios, 4 líneas):
// - "Ingresos por competiciones" -> competition_bonus.
// - "Ingresos por abonados y socios" -> season_tickets (mezcla, el documento no separa).
// - "Ingresos por retransmisión" -> broadcasting.
// - "Ingresos por comercialización y publicidad" -> sponsorship_commercial.
// - "Otros ingresos de explotación" + "Imputación de subvenciones" + "Exceso de provisiones" +
//   "Otros Resultados" -> other_income.
//
// Categorización de Gastos:
// - "Gastos plantilla deportiva" (inscribible+no inscribible en LFP) -> wages_squad.
// - "Gastos de personal no deportivo" -> admin_general_expense (el documento SÍ separa plantel de
//   resto del personal).
// - "Aprovisionamientos" + "Pérdidas/deterioro provisiones comerciales" (crédito neto este año) +
//   "Gastos de adquisición de jugadores" (comisiones, ambas categorías LFP/no-LFP) -> other_expenses.
// - "Servicios exteriores" + "Tributos" + "Otros gastos de gestión corriente" -> admin_general_expense.
// - "Desplazamientos" -> match_organisation_expense.
// - "Amortización del inmovilizado": el documento YA separa "De derechos de adquisición de
//   jugadores" (inscribible+no inscribible en LFP, -> player_amortisation) de "Del inmovilizado
//   material" + "Del inmovilizado inmaterial excluido jugadores" (-> depreciation).
//
// "Resultados procedentes del traspaso de jugadores" (5,690) + "Deterioro y resultado por
// enajenaciones del inmovilizado" (0,015) -> fiscalYearMeta.profitOnPlayerSales (neto 5,705 M, no
// revenueLine, ver club-data-mapping SKILL.md sección 2).
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 122,574 M - Expenses cash 150,078 M - Non-cash
// 27,455 M = Operating profit -54,959 M; + profitOnPlayerSales 5,705 M = -49,254 M = RESULTADO DE
// EXPLOTACIÓN impreso EXACTO; + netInterest -4,807 M = -54,061 M = RESULTADO ANTES DE IMPUESTOS
// impreso EXACTO; + tax 0 = -54,061 M = RESULTADO DEL PERIODO impreso EXACTO.
// ============================================================================

const sevillafcRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:7.193, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:14.365, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisión', normalizedCategory:'broadcasting', amountNative:64.758, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:28.869, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:2.657, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.106, disclosureLevel:'detailed' },
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:0.349, disclosureLevel:'detailed' },
    { rawLabel:'Otros Resultados', normalizedCategory:'other_income', amountNative:4.277, disclosureLevel:'detailed' },
  ],
};

const sevillafcExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aprovisionamientos', normalizedCategory:'other_expenses', amountNative:-10.424, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de personal no deportivo', normalizedCategory:'admin_general_expense', amountNative:-20.889, disclosureLevel:'detailed' },
    { rawLabel:'Gastos plantilla deportiva inscribible en la LFP', normalizedCategory:'wages_squad', amountNative:-84.988, disclosureLevel:'detailed' },
    { rawLabel:'Gastos plantilla deportiva no inscribible en la LFP', normalizedCategory:'wages_squad', amountNative:-8.080, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-20.850, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.418, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:2.548, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-2.070, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-1.368, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores inscribibles en la LFP', normalizedCategory:'other_expenses', amountNative:-3.343, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de adquisición de jugadores no inscribibles en la LFP', normalizedCategory:'other_expenses', amountNative:-0.196, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado material', normalizedCategory:'depreciation', amountNative:-2.862, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado inmaterial (excluido jugadores)', normalizedCategory:'depreciation', amountNative:-0.161, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de adquisición de jugadores inscribibles en la LFP', normalizedCategory:'player_amortisation', amountNative:-24.122, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de adquisición de jugadores no inscribibles en la LFP', normalizedCategory:'player_amortisation', amountNative:-0.310, disclosureLevel:'detailed' },
  ],
};

const sevillafcFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'sevillafc-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = Deudas a largo plazo (233,433 M, incluye un préstamo participativo grande de
    // entidades deportivas de 116,896 M) + Deudas a corto plazo (34,920 M). cash = Efectivo y otros
    // activos líquidos equivalentes.
    grossDebt:268.353, cash:39.247,
    profitOnPlayerSales:5.705, assetSales:0, netInterest:-4.807, tax:0,
    officialTotalRevenue:122.574, officialTotalExpenses:177.533, officialPAT:-54.061,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito.
const sevillafcPasesData = [];
const sevillafcResultadosData = {};
const sevillafcTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.sevillafc = {
  revenueLinesByYear: sevillafcRevenueLinesByYear, expenseLinesByYear: sevillafcExpenseLinesByYear,
  fiscalYearMeta: sevillafcFiscalYearMeta, pasesData: sevillafcPasesData,
  resultadosData: sevillafcResultadosData, titulosData: sevillafcTitulosData,
};

Object.assign(sources, {
  'sevillafc-cuentas-anuales-2024-25': {
      id:'sevillafc-cuentas-anuales-2024-25', clubId:'sevillafc',
      title:'Cuentas Anuales 2024-2025, Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://sevillafc.es/el-club/la-entidad/accionista/jga',
      note:'PDF oficial, escaneo sin capa de texto (leído renderizando páginas a imagen). Patrimonio Neto NEGATIVO al cierre (-122,813 M EUR) — club en situación financiera comprometida. Transcripción completa de la cuenta de resultados en Clubes/España/Sevilla FC/cuentas-anuales-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.sevillafc = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.sevillafc = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
