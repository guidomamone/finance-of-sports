const astonvillaGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:38.452, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:170.717, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship', normalizedCategory:'sponsorship_commercial', amountNative:28.646, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:51.230, disclosureLevel:'not_disclosed' },
    { rawLabel:'UEFA', normalizedCategory:'broadcasting', amountNative:70.232, disclosureLevel:'detailed' },
  ],
};

const astonvillaGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-20.578, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-8.737, disclosureLevel:'detailed' },
    { rawLabel:'Operating expenses (resto sin desglosar — ver limitación en el comentario de cabecera: casi con certeza incluye el costo del plantel profesional, que esta entidad no reporta por separado)', normalizedCategory:'lump_football_operations_expense', amountNative:-404.092, disclosureLevel:'not_disclosed' },
  ],
};

const astonvillaGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'astonvilla-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'nswe',
    grossDebt:110.571, cash:6.299,
    profitOnPlayerSales:0, assetSales:-0.084, netInterest:-0.262, tax:1.171,
    officialTotalRevenue:359.277, officialTotalExpenses:433.407, officialPAT:-73.305,
  },
};

const astonvillaGbPresupuestoOverlayByYear = {};

const astonvillaGbPasesData = [];
const astonvillaGbResultadosData = {};
const astonvillaGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['astonvilla-gb'] = {
  revenueLinesByYear: astonvillaGbRevenueLinesByYear, expenseLinesByYear: astonvillaGbExpenseLinesByYear,
  fiscalYearMeta: astonvillaGbFiscalYearMeta, pasesData: astonvillaGbPasesData,
  resultadosData: astonvillaGbResultadosData, titulosData: astonvillaGbTitulosData,
  presupuestoOverlayByYear: astonvillaGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'astonvilla-gb-full-accounts-2025': {
    id:'astonvilla-gb-full-accounts-2025', clubId:'astonvilla-gb',
    title:'Aston Villa Football Club Limited — Full Accounts, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/03375789/filing-history',
    publicNote:'Cuentas completas auditadas (BDO LLP) de Aston Villa Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25, Premier League, con participación en competencia UEFA).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Aston Villa/aston-villa-full-accounts-2024-25.md. Entidad individual, no consolidada — NO reporta activos intangibles ni compraventa de jugadores en absoluto, ver limitación documentada en el comentario de cabecera de data/astonvilla-gb-data.js y en Admin/dudas-por-club.md. El ejercicio anterior (13 meses, no comparable) no se cargó. fxRef apunta a FX_CLOSE (GBP@2025-06-30).',
  },
});

gestionesByClub['astonvilla-gb'] = { nswe: { nombre:'V Sports S.C.S. (Nassef Sawiris / Wes Edens) — NSWE UK Limited', firstYear:2025, lastYear:2025 } };

memberCountByClub['astonvilla-gb'] = null;
