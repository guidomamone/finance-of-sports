// ============================================================================
// data/everton-gb-data.js — Everton (Inglaterra, Premier League), clubId 'everton-gb'.
//
// Fuente: "Report and Accounts" (cuentas CONSOLIDADAS del grupo) de Everton Football Club
// Company, Limited (Companies House n° 00036624), depositadas en Companies House UK. Ejercicio
// cerrado el 30 de junio, en inglés, en libras esterlinas (GBP). Los 2 ejercicios cargados:
//
//   2024: Annual Report & Accounts 2024, ejercicio cerrado 30/6/2024 (temporada 2023/24).
//         Transcripción: Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md
//   2025: Report and Accounts 2025, ejercicio cerrado 30/6/2025 (temporada 2024/25).
//         Transcripción: Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md
//
// Ambos son balances auditados reales (Crowe U.K. LLP), no presupuestos.
//
// amountNative en millones de GBP nativos (moneda NUEVA para el sitio, GBP no existe todavía en
// data/currency-map.js — no se agrega acá, es tarea de otra sesión/otro archivo). revenue positivo,
// expense NEGATIVO, mismo criterio que river-data.js/racing-data.js.
//
// GANANCIA POR VENTA DE JUGADORES: el P&L de Everton (Consolidated Profit and Loss Account) NO
// desglosa ingreso bruto por transferencias y costo bruto por separado, solo reporta un renglón
// NETO "Profit on player trading" (£48.545m en 2024, £31.325m en 2025), como línea propia, debajo
// del resultado operativo, antes de intereses e impuestos. Por eso se carga como línea de
// revenueLines con normalizedCategory:'player_sales' (ver club-data-mapping SKILL.md, "Profit/
// (loss) on disposal of players' registrations"), NO en el campo meta profitOnPlayerSales (que
// quedaría en 0 para no duplicar: revenue ya suma esa línea, ver computeYearGeneric en
// js/finanzas-calc.js).
//
// STAFF COSTS: el documento reporta headcount por departamento (Nota 7) pero el COSTO agregado
// ("Staff costs", Nota 3) es una sola cifra sin desglosar por departamento (a diferencia de Vélez,
// que sí separa el costo salarial por sector). No hay forma de aislar cuánto de ese total es plantel
// profesional vs. resto del personal, así que toda la línea "Staff costs" se carga a `wages_squad`
// completa (convención estándar de las cuentas Companies House de clubes ingleses: la línea "Staff
// costs" es la remuneración total del club, plantel incluido, sin desglose fino disponible).
//
// "OTHER COMMERCIAL ACTIVITIES" (turnover, nota 2): el documento la define como "hospitality,
// catering, events and all other revenue sources" — no nombra el estadio ni tampoco es sponsorship
// específico, así que va a `other_income` (catch-all), no a `stadium_other` (criterio conservador de
// club-data-mapping sección 1/13: `stadium_other` solo si el rótulo nombra el estadio o una parte).
//
// EXCEPCIONALES (`exceptional_items`, ninguno es CAPEX de estadio): 2024 = "Refinancing and legal
// costs" (£10.371m, relacionados a la refinanciación previa al cambio de dueño y a la defensa ante
// el Profit and Sustainability de la Premier League — NO son costo de construcción del estadio, el
// documento los separa explícitamente de los £312.7m de capital cost de Bramley-Moore Dock, que NO
// se cargan al sitio, ver más abajo). 2025 = 4 líneas (amounts payable a ex-empleados por cambio de
// cuerpo técnico, amounts payable a otros ex-empleados, revaluación del esquema de pensión de la
// Football League, y refinancing/legal costs por el cambio de control), tampoco relacionadas al
// CAPEX del estadio.
//
// CAPEX DEL ESTADIO — EXCLUIDO A PROPÓSITO: Everton incurrió £312.7m (2024) y £114.3m (2025) de
// "capital cost" en la construcción del nuevo estadio (Bramley-Moore Dock / Hill Dickinson Stadium).
// Esto NO aparece como revenueLine/expenseLine ni como ningún campo de fiscalYearMeta: es CAPEX
// (inversión de capital, activo bajo construcción en el balance — "Assets in the course of
// construction", Notas 11), no un gasto operativo del ejercicio, y el propio documento lo separa de
// "Operating expenses" en toda su Strategic Report. El financiamiento de esa obra (préstamos, la
// colocación privada de £350m con JPMorgan para Hill Dickinson Stadium) tampoco se carga: es
// financiamiento/capital, mismo criterio que club-data-mapping sección 16.
//
// PROFIT ON DISPOSAL OF INVESTMENTS (2025 solamente, £49.161m): ganancia por la venta de Everton
// Football Club Women Limited y Goodison Park Stadium Limited (subsidiarias) a Roundhouse Capital
// Holdings Limited (matriz última del grupo), el 27/6/2025 — una reestructuración societaria
// intra-grupo (desconsolidación), no una venta de jugadores ni un ingreso operativo del club. Se
// cargó en el campo meta `assetSales` (junto al "Profit on disposal of tangible fixed assets" de
// £0.004m, inmaterial, presente en los 2 años) en vez de como revenueLine, porque no es turnover ni
// resultado de la operación futbolística — es la aproximación más fiel disponible al concepto
// "ganancia por venta de activos" que ya usa el motor para este tipo de línea no operativa. Duda
// genuina: no hay una categoría dedicada a "ganancia por reestructuración societaria/venta de
// subsidiaria" distinta de "venta de activos tangibles", documentado en el reporte de esta sesión.
//
// GROSSDEBT: se usa la cifra de "Other loans" (Nota 16, Borrowings — deuda financiera pura, excluye
// trade creditors/accruals), la misma que el propio documento usa en su Nota "Net Debt
// Reconciliation" (Nota 26 en 2024, Nota 25 en 2025) para calcular el "net debt" que cita la
// Strategic Report (£567.3m en 2024, no citado literal en texto para 2025 pero £389.401m según la
// Nota de Net Debt Reconciliation). cash = "Cash at bank and in hand" (balance consolidado).
// ============================================================================

const evertonGbRevenueLinesByYear = {
  // Ejercicio 2024 (30/6/2024). Fuente: Nota 2 "Turnover" (pág. 22-23 del PDF) + P&L account
  // (Profit on player trading, pág. 14). Suma exacta a £235.447m (186.902 de Turnover + 48.545 de
  // Profit on player trading).
  2024: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:129.218, disclosureLevel:'detailed' },
    { rawLabel:'Gate Receipts', normalizedCategory:'matchday_competition', amountNative:19.145, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship, advertising and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:21.625, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:16.914, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:48.545, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025 (30/6/2025). Fuente: Nota 2 "Turnover" (pág. 26) + P&L account (Profit on player
  // trading, pág. 17). Suma exacta a £228.022m (196.697 de Turnover + 31.325 de Profit on player
  // trading).
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:129.235, disclosureLevel:'detailed' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:20.309, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship, advertising and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:24.325, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:22.828, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:31.325, disclosureLevel:'detailed' },
  ],
};

const evertonGbExpenseLinesByYear = {
  // Ejercicio 2024. Fuente: Nota 3 "Operating expenses" (pág. 23) + su desglose de exceptional
  // costs. Suma de todas las líneas de abajo (sin exceptional_items) = -£269.219m = officialTotal-
  // Expenses. Con exceptional_items (-10.371) el "Total operating expenses" impreso da -£279.590m.
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-156.631, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-44.270, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-64.581, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-3.737, disclosureLevel:'detailed' },
    { rawLabel:'Refinancing and legal costs', normalizedCategory:'exceptional_items', amountNative:-10.371, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025. Fuente: Nota 3 (pág. 27) + su desglose de exceptional costs (4 líneas). Suma sin
  // exceptional_items = -£261.415m = officialTotalExpenses. Con exceptional_items (-11.215) el
  // "Total operating expenses" impreso da -£272.630m.
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-152.064, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-55.837, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-50.901, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-2.613, disclosureLevel:'detailed' },
    { rawLabel:'Amounts payable to former employees in relation to the change in coaching staff', normalizedCategory:'exceptional_items', amountNative:-4.145, disclosureLevel:'detailed' },
    { rawLabel:'Amounts payable to former employees', normalizedCategory:'exceptional_items', amountNative:-5.133, disclosureLevel:'detailed' },
    { rawLabel:'Revaluation of Football League Pension Scheme', normalizedCategory:'exceptional_items', amountNative:-0.265, disclosureLevel:'detailed' },
    { rawLabel:'Refinancing and legal costs', normalizedCategory:'exceptional_items', amountNative:-1.672, disclosureLevel:'detailed' },
  ],
};

const evertonGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'everton-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'moshiri',
    // grossDebt = "Other loans" (Nota 16, Borrowings: dentro de 1 año 229.736 + entre 1-5 años
    // 364.036 = 593.772), NO el total de "Creditors" (que incluye trade creditors/accruals) — mismo
    // criterio que Boca/Vélez (club-data-mapping sección 14). Coincide EXACTO con la propia Nota 26
    // "Net Debt Reconciliation" del documento. cash = "Cash at bank and in hand" (balance
    // consolidado, pág. 15).
    grossDebt:593.772, cash:26.423,
    profitOnPlayerSales:0, assetSales:0.004, netInterest:-9.083, tax:0,
    officialTotalRevenue:235.447, officialTotalExpenses:269.219, officialPAT:-53.222,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'everton-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'friedkin',
    // grossDebt = "Other loans" (Nota 16, Borrowings: dentro de 1 año 127.571 + más de 5 años
    // 340.971 = 468.542), coincide EXACTO con la Nota 25 "Net Debt Reconciliation" del documento.
    // cash = "Cash at bank and in hand" (balance consolidado, pág. 18).
    grossDebt:468.542, cash:79.141,
    // assetSales = 0.004 (Profit on disposal of tangible fixed assets) + 49.161 (Profit on disposal
    // of investments — venta de Everton FC Women Ltd y Goodison Park Stadium Ltd a la matriz
    // Roundhouse, ver comentario de cabecera). netInterest = 1.471 (interest receivable, Nota 5) -
    // 14.637 (interest payable, Nota 6).
    profitOnPlayerSales:0, assetSales:49.165, netInterest:-13.166, tax:0,
    officialTotalRevenue:228.022, officialTotalExpenses:261.415, officialPAT:-8.609,
  },
};

// evertonGbPresupuestoOverlayByYear: vacío, no hay presupuesto oficial cargado para ningún
// ejercicio de Everton, solo balances auditados reales.
const evertonGbPresupuestoOverlayByYear = {};

// Sin datos reales de mercado de pases/resultados deportivos/títulos para Everton todavía (fuera
// de alcance de esta carga, que es solo financiera) — mismo criterio que otros clubes recién
// onboardeados sin este desglose: arrays vacíos, no placeholders inventados.
const evertonGbPasesData = [];
const evertonGbResultadosData = {};
const evertonGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['everton-gb'] = {
  revenueLinesByYear: evertonGbRevenueLinesByYear, expenseLinesByYear: evertonGbExpenseLinesByYear,
  fiscalYearMeta: evertonGbFiscalYearMeta, pasesData: evertonGbPasesData,
  resultadosData: evertonGbResultadosData, titulosData: evertonGbTitulosData,
  presupuestoOverlayByYear: evertonGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'everton-gb-group-accounts-2024': {
    id:'everton-gb-group-accounts-2024', clubId:'everton-gb',
    title:'Annual Report & Accounts 2024 (Everton Football Club Company, Limited — cuentas consolidadas del grupo), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00036624/filing-history',
    publicNote:'Cuentas consolidadas del grupo, auditadas por Crowe U.K. LLP, depositadas en Companies House (Reino Unido). El tipo de cambio GBP/USD usado para el toggle de moneda es una referencia de mercado al cierre del ejercicio, no uno declarado por el propio documento (que reporta todo en libras esterlinas sin necesidad de convertir).',
    note:'PDF de 37 páginas, "Report and accounts" depositado en Companies House, entidad Everton Football Club Company, Limited n° 00036624. Transcripción completa en Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md. Ver el comentario de cabecera de data/everton-gb-data.js para el detalle completo de categorización (staff costs sin desglose por departamento, profit on player trading como línea neta, CAPEX del estadio excluido a propósito).',
  },
  'everton-gb-group-accounts-2025': {
    id:'everton-gb-group-accounts-2025', clubId:'everton-gb',
    title:'Report and Accounts 2025 (Everton Football Club Company, Limited — cuentas consolidadas del grupo), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00036624/filing-history',
    publicNote:'Cuentas consolidadas del grupo, auditadas por Crowe U.K. LLP, depositadas en Companies House (Reino Unido). El tipo de cambio GBP/USD usado para el toggle de moneda es una referencia de mercado al cierre del ejercicio, no uno declarado por el propio documento. Incluye una ganancia no operativa por la venta de dos subsidiarias (el club de fútbol femenino y la sociedad del viejo estadio Goodison Park) a la matriz del grupo, registrada aparte del resultado futbolístico.',
    note:'PDF de 44 páginas, "Report and accounts" depositado en Companies House, entidad Everton Football Club Company, Limited n° 00036624. Transcripción completa en Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md. Cambio de control societario (Moshiri -> Friedkin/Roundhouse Capital Holdings, completado 18/12/2024) ocurrido DENTRO de este ejercicio. Ver el comentario de cabecera de data/everton-gb-data.js para el detalle completo de categorización.',
  },
});

gestionesByClub['everton-gb'] = {
  // Ejercicio 2024 (cerrado 30/6/2024): Farhad Moshiri controlaba el club en toda su extensión (vía
  // Blue Horizon Investments Limited, 94.1%) — el acuerdo de venta a The Friedkin Group se firmó el
  // 22/9/2024 (posterior al cierre) y se completó el 18/12/2024 (posterior también, evento
  // subsecuente al balance de este ejercicio, ver Nota 21 "Post balance sheet events").
  moshiri: { nombre:'Moshiri (2016-2024)', firstYear:2024, lastYear:2024 },
  // Ejercicio 2025 (cerrado 30/6/2025): el cambio de control se completó el 18/12/2024, DENTRO de
  // este ejercicio (jul-2024 a jun-2025) — al cierre del 30/6/2025 el dueño es Roundhouse Capital
  // Holdings Limited (99.5%), controlada por Dan Friedkin.
  friedkin: { nombre:'Friedkin / Roundhouse Capital Holdings (2024-actual)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['everton-gb'] = null;
