// ============================================================================
// data/chelsea-gb-data.js — Chelsea (Inglaterra, Premier League), clubId 'chelsea-gb'.
//
// Fuente: cuentas consolidadas de Chelsea FC Holdings Limited (Companies House n° 02536231),
// único ejercicio disponible: cerrado 30/6/2025 (temporada 2024-25). Transcripción completa en
// Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md (3079 líneas, texto
// nativo, sin necesidad de OCR).
//
// amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. fxRef porque el
// documento no declara un tipo de cambio propio.
//
// PROPIEDAD: matriz inmediata Blueco 22 Midco Limited; matriz última Blues Investment Holdings
// Parent, L.P. (Cayman Islands), consorcio liderado por Todd Boehly y Clearlake Capital.
//
// OJO — LA VENTA DE LA ACADEMIA FEMENINA (Chelsea FC Women a Blueco 22 Midco, £200m, ganancia de
// £198.7m) OCURRIÓ EN EL EJERCICIO 2023-24 (comparativo), NO EN ESTE (2024-25) — el propio
// documento lo dice explícito (Nota 12: "recognised in the Group profit or loss account to 30 June
// 2024"). En el P&L de 2025 esa línea da £0. Lo único de partes vinculadas en este ejercicio es
// menor: la venta de Kingsmeadow (antes de Chelsea FC Women) a la propia Chelsea FC Women Limited,
// con una PÉRDIDA de £2.985m (no ganancia) dentro de "(Loss)/profit on disposal of fixed assets" ->
// campo meta `assetSales`, no revenueLine.
//
// "Cost of sales" (£428.673m) SIN desglose de wages vs. resto en ninguna nota — a diferencia de
// Everton/Arsenal, que sí tienen una línea "Staff costs" propia. Se cargó a `wages_squad` completo
// (aproximación más fiel al texto narrativo, que dice explícito que el aumento de esta línea es
// "principally... increased cost of sales including player wages"), pero es una decisión discutible
// — duda anotada en Admin/dudas-por-club.md.
//
// "Amortisation and impairment of players' registrations" es la columna combinada tal cual la
// imprime el P&L account (-224.344) — la Nota 6 la desglosa en amortización (213.893) + deterioro
// (12.097) = 225.990, un gap de £1.646m (0,7%) no explicado en el documento. Se usó el número del
// P&L porque es el único que hace cerrar Gross profit -> Operating loss -> PAT exacto — duda anotada.
//
// GROSSDEBT: Chelsea no tiene ninguna línea "Bank loans"/"Borrowings" en el balance. Lo único
// remotamente "deuda" son trade creditors por pases de jugadores a pagar (£396.135m) y "amounts
// owed to group undertakings" (£0 al cierre 2025). Se usa `grossDebt:0` (criterio estricto de
// excluir trade creditors, club-data-mapping sección 14) — duda anotada sobre si conviene el
// tratamiento alternativo (tratar transfer fees payable como deuda económica real).
// ============================================================================

const chelseaGbRevenueLinesByYear = {
  // Ejercicio 2025. Fuente: Nota "Turnover" + P&L (Profit on disposal of player registrations).
  // Total Turnover impreso = 490.857. Con player_sales, total = 549.263 = officialTotalRevenue.
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:203.230, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:200.865, disclosureLevel:'detailed' },
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:86.762, disclosureLevel:'detailed' },
    { rawLabel:'Research & development tax credit', normalizedCategory:'other_income', amountNative:0.500, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player registrations', normalizedCategory:'player_sales', amountNative:57.906, disclosureLevel:'detailed' },
  ],
};

const chelseaGbExpenseLinesByYear = {
  // Ejercicio 2025. Fuente: P&L account + Nota 5 "Impairment and other expenses" + Nota 6
  // "Operating loss". Suma = -799.514 (con exceptional_items) = -749.314 (sin, que es lo que compara
  // el motor) + -50.200 de exceptional_items.
  2025: [
    { rawLabel:'Cost of sales (incluye salarios de plantel, sin desglose propio — ver duda)', normalizedCategory:'wages_squad', amountNative:-428.673, disclosureLevel:'summary' },
    { rawLabel:'Amounts payable in relation to legal and regulatory matters (incluye settlement UEFA por Financial Sustainability Regulations)', normalizedCategory:'exceptional_items', amountNative:-50.200, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of owned tangible fixed assets', normalizedCategory:'depreciation', amountNative:-12.519, disclosureLevel:'detailed' },
    { rawLabel:'Administrative expenses (residual, sin más desglose)', normalizedCategory:'admin_general_expense', amountNative:-83.778, disclosureLevel:'estimated' },
    { rawLabel:'Amortisation and impairment of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-224.344, disclosureLevel:'detailed' },
  ],
};

const chelseaGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'chelsea-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'boehly-clearlake',
    grossDebt:0, cash:49.009,
    // assetSales = "(Loss)/profit on disposal of fixed assets" (venta de Kingsmeadow a Chelsea FC
    // Women Limited, related party). netInterest = interest receivable (11.149) - interest payable
    // (20.357). tax = Nota 13, "Total tax charge".
    profitOnPlayerSales:0, assetSales:-2.985, netInterest:-9.208, tax:-0.203,
    // officialTotalExpenses EXCLUYE exceptional_items (-50.200), mismo criterio que el resto del
    // sitio desde Botafogo (el motor no los cuenta en verifyTieOuts() de Expenses, sino que llegan
    // al PAT por otro camino) — el total CON exceptionales que imprime el documento es £799,514m.
    officialTotalRevenue:549.263, officialTotalExpenses:749.314, officialPAT:-262.647,
  },
};

const chelseaGbPresupuestoOverlayByYear = {};
const chelseaGbPasesData = [];
const chelseaGbResultadosData = {};
const chelseaGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chelsea-gb'] = {
  revenueLinesByYear: chelseaGbRevenueLinesByYear, expenseLinesByYear: chelseaGbExpenseLinesByYear,
  fiscalYearMeta: chelseaGbFiscalYearMeta, pasesData: chelseaGbPasesData,
  resultadosData: chelseaGbResultadosData, titulosData: chelseaGbTitulosData,
  presupuestoOverlayByYear: chelseaGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'chelsea-gb-group-accounts-2025': {
    id:'chelsea-gb-group-accounts-2025', clubId:'chelsea-gb',
    title:'Group accounts (Chelsea FC Holdings Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02536231/filing-history',
    publicNote:'La venta de Chelsea FC Women a una parte relacionada (£198,7m de ganancia) ocurrió en el ejercicio anterior (2023-24), no en este.',
    note:'Cuentas consolidadas del grupo, depositadas en Companies House (Reino Unido). Transcripción completa en Clubes/Inglaterra/Chelsea/chelsea-fc-holdings-group-accounts-2024-25.md. Ver comentario de cabecera de data/chelsea-gb-data.js para el detalle completo de categorización y las dudas abiertas (Cost of sales sin desglose, gap de amortización/deterioro, grossDebt).',
  },
});

gestionesByClub['chelsea-gb'] = {
  'boehly-clearlake': { nombre:'Todd Boehly / Clearlake Capital', firstYear:2025, lastYear:2025 },
};

memberCountByClub['chelsea-gb'] = null;
