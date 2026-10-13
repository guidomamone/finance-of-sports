const sunderlandGbRevenueLinesByYear = {
  2024: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:11.537, disclosureLevel:'detailed' },
    { rawLabel:'Television and media', normalizedCategory:'broadcasting', amountNative:10.443, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and royalties', normalizedCategory:'sponsorship_commercial', amountNative:2.315, disclosureLevel:'detailed' },
    { rawLabel:'Conference and banqueting', normalizedCategory:'other_income', amountNative:8.713, disclosureLevel:'detailed' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:2.997, disclosureLevel:'detailed' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:1.447, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:0.025, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player contracts', normalizedCategory:'player_sales', amountNative:8.818, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:13.020, disclosureLevel:'detailed' },
    { rawLabel:'TV, Media and FL distribution', normalizedCategory:'broadcasting', amountNative:12.005, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and royalties', normalizedCategory:'sponsorship_commercial', amountNative:3.888, disclosureLevel:'detailed' },
    { rawLabel:'Conference and banqueting', normalizedCategory:'other_income', amountNative:7.613, disclosureLevel:'detailed' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:1.180, disclosureLevel:'detailed' },
    { rawLabel:'Other', normalizedCategory:'other_income', amountNative:1.716, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of player contracts', normalizedCategory:'player_sales', amountNative:45.843, disclosureLevel:'detailed' },
  ],
};

const sunderlandGbExpenseLinesByYear = {
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-30.463, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players contracts', normalizedCategory:'player_amortisation', amountNative:-3.983, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation - owned assets', normalizedCategory:'depreciation', amountNative:-0.916, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-19.421, disclosureLevel:'aggregated' },
  ],
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-52.899, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players contracts', normalizedCategory:'player_amortisation', amountNative:-10.409, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation - owned assets', normalizedCategory:'depreciation', amountNative:-1.315, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Cost of sales + Operating expenses no desglosados por naturaleza, neto de staff/amortización/depreciación)', normalizedCategory:'other_expenses', amountNative:-20.973, disclosureLevel:'aggregated' },
  ],
};

const sunderlandGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-07-31',
    sourceId:'sunderland-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'louisdreyfus',
    grossDebt:8.289, cash:0,
    profitOnPlayerSales:0, assetSales:0, netInterest:-0.583, tax:0,
    officialTotalRevenue:46.295, officialTotalExpenses:54.783, officialPAT:-9.071,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-07-31',
    sourceId:'sunderland-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'louisdreyfus',
    grossDebt:25.217, cash:20.711,
    profitOnPlayerSales:0, assetSales:0, netInterest:-2.948, tax:0,
    officialTotalRevenue:85.265, officialTotalExpenses:85.596, officialPAT:-3.279,
  },
};

const sunderlandGbPresupuestoOverlayByYear = {};

const sunderlandGbPasesData = [];
const sunderlandGbResultadosData = {};
const sunderlandGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sunderland-gb'] = {
  revenueLinesByYear: sunderlandGbRevenueLinesByYear, expenseLinesByYear: sunderlandGbExpenseLinesByYear,
  fiscalYearMeta: sunderlandGbFiscalYearMeta, pasesData: sunderlandGbPasesData,
  resultadosData: sunderlandGbResultadosData, titulosData: sunderlandGbTitulosData,
  presupuestoOverlayByYear: sunderlandGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sunderland-gb-full-accounts-2024': {
    id:'sunderland-gb-full-accounts-2024', clubId:'sunderland-gb',
    title:'Sunderland Association Football Club, Limited (The) — Strategic Report, Report of the Directors and Financial Statements, year ended 31 July 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00049116/filing-history',
    publicNote:'Cuentas individuales auditadas (Constantin, sin salvedades) de Sunderland Association Football Club, Limited (The), depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de julio de 2024 (temporada 2023/24, EFL Championship).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2023-24.md. Cuentas individuales, exenta de consolidar bajo Section 400 (Companies Act 2006). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE, entrada GBP@2024-07-31 agregada en esta sesión).',
  },
  'sunderland-gb-full-accounts-2025': {
    id:'sunderland-gb-full-accounts-2025', clubId:'sunderland-gb',
    title:'Sunderland Association Football Club, Limited (The) — Strategic Report, Report of the Directors and Financial Statements, year ended 31 July 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00049116/filing-history',
    publicNote:'Cuentas individuales auditadas (Constantin, sin salvedades) de Sunderland Association Football Club, Limited (The), depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de julio de 2025 (temporada 2024/25, EFL Championship — el ascenso a la Premier League vía playoff ocurrió al FINAL de este ejercicio, para la temporada SIGUIENTE, 2025/26).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/Sunderland/sunderland-full-accounts-2024-25.md. La fila "Other operating income" de 2025 no aparece en el Income Statement transcripto (nil, confirmado contra Nota 5); ver comentario de cabecera de este archivo. Mismo criterio de categorización que el ejercicio 2024. fxRef apunta a FX_CLOSE, entrada GBP@2025-07-31 agregada en esta sesión.',
  },
});

gestionesByClub['sunderland-gb'] = { louisdreyfus: { nombre:'Louis-Dreyfus / Mercator Investments', firstYear:2024, lastYear:2025 } };

memberCountByClub['sunderland-gb'] = null;
