// ============================================================================
// data/fcbarcelona-data.js — Futbol Club Barcelona, Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Un solo ejercicio (el más reciente, 2024/25) por decisión de alcance de esta sesión: "ancho, no
// profundo" (sumar clubes, no profundizar años por club) aunque el archivo fuente tiene 22 años
// disponibles (2003-04 a 2024-25). Fuente: "Cuentas Anuales y Auditoría 2024-25" (documento oficial
// separado de la Memoria narrativa, más corto y enfocado en los estados financieros), descargado de
// fcbarcelona.es/es/club/transparencia/informacion-legal-institucional-y-economica — ver
// Clubes/España/FC Barcelona/cuentas-anuales-y-auditoria-2024-25.pdf y su transcripción en
// Clubes/España/FC Barcelona/cuentas-anuales-y-auditoria-2024-25-cuenta-resultados.md.
//
// GOTCHA DE EXTRACCIÓN (ver .md para el detalle completo): las páginas del balance y la cuenta de
// pérdidas y ganancias tienen el texto nativo del PDF deliberadamente ofuscado (ToUnicode CMap
// reordenado) — pdftotext devuelve gibberish para esas 2 páginas puntuales, aunque el resto del
// documento (memoria/notas) extrae texto normal. Se resolvió renderizando esas páginas a imagen
// (pdftoppm -r 300) y leyéndolas con el Read tool (el PDF se VE perfecto, solo la capa de texto de
// esas páginas está corrupta). Ver esa nota en el .md por si aparece el mismo patrón en otro club.
//
// Cifras en EUR MILLONES nativos, escala 1 (el propio "miles €" impreso, leído como decimal, ya
// equivale a millones — mismo criterio documentado en data/realmadrid-data.js). Tipo de cambio
// EUR/USD 1,172 al 30/6/2025 (cotización de cierre BCE, investigada vía web search, mismo valor que
// Real Madrid al ser la misma fecha de cierre) — solo para el toggle de display, EUR es la moneda de
// reporte real. `fx` en fiscalYearMeta va INVERTIDO (0,8532 = 1/1,172, EUR por 1 USD): mismo
// sentido que ARS/COP/BRL/MXN/JPY en el resto del sitio, ver comentario de cabecera de
// data/realmadrid-data.js para el detalle completo.
//
// Categorización de Ingresos (Nota 18.1 "Importe neto de la cifra de negocios", 5 líneas):
// - "Ingresos por competiciones" -> competition_bonus.
// - "Ingresos por abonados y socios" -> season_tickets (aproximación: mezcla abonados/season-ticket
//   holders con cuotas de socios, el documento no las separa; se priorizó "abonados" porque
//   encabeza la etiqueta y es el componente dominante en un club con más socios que abonados reales
//   a un asiento fijo, mismo tipo de aproximación documentada para Real Madrid).
// - "Ingresos por retransmisiones y derechos televisivos" -> broadcasting.
// - "Ingresos por comercialización y publicidad" -> sponsorship_commercial.
// - "Ingresos por prestación de servicios" + "Otros ingresos de explotación" + "Trabajos realizados
//   por la empresa para su activo" + "Exceso de provisiones" + "Dotación y aplicación de provisiones
//   y otros" (neto) -> other_income (ninguno tiene categoría propia en el esquema del sitio).
//
// Categorización de Gastos:
// - "Gastos de personal" (deportivo+no deportivo+cargas sociales+provisiones, el documento NO separa
//   plantel profesional de resto de personal) -> wages_squad.
// - "Aprovisionamientos" (consumos/material deportivo) -> other_expenses.
// - Dentro de "Otros gastos de explotación": "Servicios exteriores"+"Tributos"+"Otros gastos de
//   gestión corriente" -> admin_general_expense; "Desplazamientos" -> match_organisation_expense
//   (viajes de competición); "Pérdidas/deterioro operaciones comerciales"+"Gastos por adquisición de
//   jugadores" (comisiones, no amortización) -> other_expenses.
// - "Amortización del inmovilizado": SEPARADA por el propio documento en 2 líneas ya explícitas —
//   "Amortización de los derechos de adquisición de jugadores" (Nota 5) -> player_amortisation;
//   "Otras amortizaciones" (Notas 6 y 7) -> depreciation. A diferencia de Real Madrid, acá NO hizo
//   falta derivar el split de una nota de movimiento: el propio P&L ya lo desglosa en 2 líneas.
//
// "Deterioro y resultado por enajenaciones del inmovilizado" (13,470 M, ganancia neta dominada por
// "Beneficios procedentes del inmovilizado intangible deportivo" 42,712 M de venta de jugadores) NO
// va como revenueLine (club-data-mapping SKILL.md sección 2) -> fiscalYearMeta.profitOnPlayerSales.
// "Resultado por la pérdida de control de participaciones consolidadas" (-12,455 M, pérdida contable
// por deconsolidar una sociedad dependiente, ver Nota 1.3) -> fiscalYearMeta.assetSales (el campo
// más cercano disponible para un ítem no-operativo/corporativo que el documento SÍ suma al
// resultado de explotación; no es una venta de activo fijo en el sentido estricto, documentado acá
// para que quede claro que es una aproximación de encaje, no un error de categoría).
//
// VERIFICACIÓN (ver .md para el detalle): Revenue 996,365 M - Expenses cash 819,791 M - Non-cash
// 106,317 M = Operating profit 70,257 M; + profitOnPlayerSales 13,470 + assetSales -12,455 =
// 71,272 M = RESULTADO DE EXPLOTACIÓN impreso EXACTO; + netInterest -79,649 (= Resultado financiero
// -79,897 + Participación en sociedades PE +0,248) = -8,377 M = RESULTADO ANTES DE IMPUESTOS impreso
// EXACTO; + tax -8,572 = -16,949 M = RESULTADO DEL EJERCICIO impreso EXACTO (Barça cerró el
// ejercicio con pérdida neta real, consistente con la cobertura de prensa pública).
// ============================================================================

const fcbarcelonaRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos por competiciones', normalizedCategory:'competition_bonus', amountNative:118.598, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por abonados y socios', normalizedCategory:'season_tickets', amountNative:31.599, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por retransmisiones y derechos televisivos', normalizedCategory:'broadcasting', amountNative:250.499, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por comercialización y publicidad', normalizedCategory:'sponsorship_commercial', amountNative:556.844, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por prestación de servicios', normalizedCategory:'other_income', amountNative:6.663, disclosureLevel:'detailed' },
    { rawLabel:'Trabajos realizados por la empresa para su activo', normalizedCategory:'other_income', amountNative:1.284, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:21.708, disclosureLevel:'detailed' },
    { rawLabel:'Exceso de provisiones', normalizedCategory:'other_income', amountNative:1.250, disclosureLevel:'detailed' },
    { rawLabel:'Dotación y aplicación de provisiones y otros (neto)', normalizedCategory:'other_income', amountNative:7.920, disclosureLevel:'detailed' },
  ],
};

const fcbarcelonaExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aprovisionamientos (consumos y material deportivo)', normalizedCategory:'other_expenses', amountNative:-79.702, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de personal (deportivo, no deportivo, cargas sociales, provisiones)', normalizedCategory:'wages_squad', amountNative:-509.955, disclosureLevel:'detailed' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-163.102, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-6.061, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-1.543, disclosureLevel:'detailed' },
    { rawLabel:'Desplazamientos', normalizedCategory:'match_organisation_expense', amountNative:-14.248, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por adquisición de jugadores', normalizedCategory:'other_expenses', amountNative:-0.465, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-44.715, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de los derechos de adquisición de jugadores (Nota 5)', normalizedCategory:'player_amortisation', amountNative:-81.287, disclosureLevel:'detailed' },
    { rawLabel:'Otras amortizaciones (Notas 6 y 7)', normalizedCategory:'depreciation', amountNative:-25.030, disclosureLevel:'detailed' },
  ],
};

const fcbarcelonaFiscalYearMeta = {
  2025: {
    currency:'EUR', fx:0.8532, // 1/1,172 (ver comentario de cabecera)
    sourceId:'fcbarcelona-cuentas-anuales-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = Deudas a largo plazo (100,001 M) + Deudas a corto plazo (205,154 M) del balance
    // consolidado — incluye "deudas con entidades deportivas" (pases a pagar), no solo deuda
    // bancaria (el balance no separa un subtotal solo-bancario limpio, a diferencia de Real Madrid).
    // cash = Tesorería (Efectivo y otros activos líquidos equivalentes).
    grossDebt:305.155, cash:136.328,
    profitOnPlayerSales:13.470, assetSales:-12.455, netInterest:-79.649, tax:-8.572,
    officialTotalRevenue:996.365, officialTotalExpenses:926.108, officialPAT:-16.949,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito, mismo criterio que Vélez/Real Madrid.
const fcbarcelonaPasesData = [];
const fcbarcelonaResultadosData = {};
const fcbarcelonaTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.fcbarcelona = {
  revenueLinesByYear: fcbarcelonaRevenueLinesByYear, expenseLinesByYear: fcbarcelonaExpenseLinesByYear,
  fiscalYearMeta: fcbarcelonaFiscalYearMeta, pasesData: fcbarcelonaPasesData,
  resultadosData: fcbarcelonaResultadosData, titulosData: fcbarcelonaTitulosData,
};

Object.assign(sources, {
  'fcbarcelona-cuentas-anuales-2024-25': {
      id:'fcbarcelona-cuentas-anuales-2024-25', clubId:'fcbarcelona',
      title:'Cuentas Anuales y Auditoría 2024-25 (Consolidadas), Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.fcbarcelona.es/es/club/transparencia/informacion-legal-institucional-y-economica',
      note:'PDF oficial de 105 páginas. Texto nativo en casi todo el documento, PERO las páginas del balance y la cuenta de pérdidas y ganancias tienen el ToUnicode ofuscado (ver comentario largo arriba y el .md de transcripción) — se leyeron renderizando esas 2 páginas a imagen. Cuentas CONSOLIDADAS (Grupo FC Barcelona). Transcripción completa de la cuenta de resultados en Clubes/España/FC Barcelona/cuentas-anuales-y-auditoria-2024-25-cuenta-resultados.md.',
    },
});

gestionesByClub.fcbarcelona = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.fcbarcelona = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
