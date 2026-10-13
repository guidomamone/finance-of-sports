const evertonGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:129.218, disclosureLevel:'detailed' },
    { rawLabel:'Gate Receipts', normalizedCategory:'matchday_competition', amountNative:19.145, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship, advertising and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:21.625, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:16.914, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:48.545, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:129.235, disclosureLevel:'detailed' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:20.309, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship, advertising and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:24.325, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:22.828, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:31.325, disclosureLevel:'detailed' },
  ],
};

const evertonGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-156.631, disclosureLevel:'detailed' },
    { rawLabel:'Other operating costs', normalizedCategory:'other_expenses', amountNative:-44.270, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-64.581, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-3.737, disclosureLevel:'detailed' },
    { rawLabel:'Refinancing and legal costs', normalizedCategory:'exceptional_items', amountNative:-10.371, disclosureLevel:'detailed' },
  ],
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
    grossDebt:593.772, cash:26.423,
    profitOnPlayerSales:0, assetSales:0.004, netInterest:-9.083, tax:0,
    officialTotalRevenue:235.447, officialTotalExpenses:269.219, officialPAT:-53.222,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'everton-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'friedkin',
    grossDebt:468.542, cash:79.141,
    profitOnPlayerSales:0, assetSales:49.165, netInterest:-13.166, tax:0,
    officialTotalRevenue:228.022, officialTotalExpenses:261.415, officialPAT:-8.609,
  },
};

const evertonGbPresupuestoOverlayByYear = {};

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
  moshiri: { nombre:'Moshiri (2016-2024)', firstYear:2024, lastYear:2024 },
  friedkin: { nombre:'Friedkin / Roundhouse Capital Holdings (2024-actual)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['everton-gb'] = null;
