const bournemouthGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Match and season ticket income', normalizedCategory:'matchday_competition', amountNative:6.531, disclosureLevel:'detailed' },
    { rawLabel:'Premier League income', normalizedCategory:'broadcasting', amountNative:135.631, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:12.120, disclosureLevel:'detailed' },
    { rawLabel:'Hospitality and events', normalizedCategory:'other_income', amountNative:3.226, disclosureLevel:'detailed' },
    { rawLabel:'Shop merchandise', normalizedCategory:'sponsorship_commercial', amountNative:1.542, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:1.742, disclosureLevel:'not_disclosed' },
    { rawLabel:'Other operating income (amounts received for players on loan at other clubs)', normalizedCategory:'player_sales', amountNative:8.257, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (resto, sin especificar)', normalizedCategory:'other_income', amountNative:0.568, disclosureLevel:'not_disclosed' },
    { rawLabel:"Profit on disposal of players' registrations", normalizedCategory:'player_sales', amountNative:0.251, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Match and season ticket income', normalizedCategory:'matchday_competition', amountNative:6.738, disclosureLevel:'detailed' },
    { rawLabel:'Premier League income', normalizedCategory:'broadcasting', amountNative:147.999, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:18.107, disclosureLevel:'detailed' },
    { rawLabel:'Hospitality and events', normalizedCategory:'other_income', amountNative:4.672, disclosureLevel:'detailed' },
    { rawLabel:'Shop merchandise', normalizedCategory:'sponsorship_commercial', amountNative:1.868, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.332, disclosureLevel:'not_disclosed' },
    { rawLabel:'Other operating income (amounts received for players on loan at other clubs)', normalizedCategory:'player_sales', amountNative:15.199, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income (resto, sin especificar)', normalizedCategory:'other_income', amountNative:2.199, disclosureLevel:'not_disclosed' },
    { rawLabel:"Profit on disposal of players' registrations", normalizedCategory:'player_sales', amountNative:91.017, disclosureLevel:'detailed' },
  ],
};

const bournemouthGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-136.170, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses', normalizedCategory:'other_expenses', amountNative:-26.026, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciation of tangible assets', normalizedCategory:'depreciation', amountNative:-1.896, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangibles (jugadores + website/software, ~99,9% jugadores)', normalizedCategory:'player_amortisation', amountNative:-61.616, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-158.422, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses', normalizedCategory:'other_expenses', amountNative:-31.281, disclosureLevel:'not_disclosed' },
    { rawLabel:'Depreciation of tangible assets and right-of-use assets', normalizedCategory:'depreciation', amountNative:-2.989, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangibles (jugadores + website/software)', normalizedCategory:'player_amortisation', amountNative:-69.165, disclosureLevel:'detailed' },
  ],
};

const bournemouthGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'bournemouth-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'foley',
    grossDebt:122.779, cash:7.104,
    profitOnPlayerSales:0, assetSales:0, netInterest:-10.311, tax:0,
    officialTotalRevenue:169.868, officialTotalExpenses:225.708, officialPAT:-66.151,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'bournemouth-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'foley',
    grossDebt:48.905, cash:47.236,
    profitOnPlayerSales:0, assetSales:0, netInterest:-13.387, tax:0,
    officialTotalRevenue:290.131, officialTotalExpenses:261.857, officialPAT:14.887,
  },
};

const bournemouthGbPresupuestoOverlayByYear = {};

const bournemouthGbPasesData = [];
const bournemouthGbResultadosData = {};
const bournemouthGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['bournemouth-gb'] = {
  revenueLinesByYear: bournemouthGbRevenueLinesByYear, expenseLinesByYear: bournemouthGbExpenseLinesByYear,
  fiscalYearMeta: bournemouthGbFiscalYearMeta, pasesData: bournemouthGbPasesData,
  resultadosData: bournemouthGbResultadosData, titulosData: bournemouthGbTitulosData,
  presupuestoOverlayByYear: bournemouthGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'bournemouth-gb-full-accounts-2024': {
    id:'bournemouth-gb-full-accounts-2024', clubId:'bournemouth-gb',
    title:'AFC Bournemouth Limited — Full Accounts, year ended 30 June 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06632170/filing-history',
    publicNote:'Cuentas completas auditadas de AFC Bournemouth Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 30 de junio de 2024 (temporada 2023/24, Premier League, terminó 12°).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2023-24.md. No se encontró un tipo de cambio GBP/USD propio declarado por el documento — fxRef apunta a FX_CLOSE (GBP@2024-06-30).',
  },
  'bournemouth-gb-full-accounts-2025': {
    id:'bournemouth-gb-full-accounts-2025', clubId:'bournemouth-gb',
    title:'AFC Bournemouth Limited — Full Accounts, year ended 30 June 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/06632170/filing-history',
    publicNote:'Cuentas completas auditadas de AFC Bournemouth Limited. Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25, Premier League, terminó 9°).',
    note:'PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2024-25.md. Adopta una presentación nueva (leases/right-of-use assets) que restata levemente el comparativo 2024 — se usó SIEMPRE la presentación propia de cada ejercicio, nunca la comparativa del documento del año siguiente (ver comentario de cabecera de data/bournemouth-gb-data.js). fxRef apunta a FX_CLOSE (GBP@2025-06-30).',
  },
});

gestionesByClub['bournemouth-gb'] = { foley: { nombre:'William P. Foley II / Black Knight Football Club UK Limited', firstYear:2024, lastYear:2025 } };

memberCountByClub['bournemouth-gb'] = null;
