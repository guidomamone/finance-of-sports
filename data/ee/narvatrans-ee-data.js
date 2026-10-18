const narvatranseeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:0.100436, disclosureLevel:'aggregated' },
    { rawLabel:'sh eraldis riigieelarvest', normalizedCategory:'other_income', amountNative:0.042848, disclosureLevel:'aggregated' },
    { rawLabel:'sh eraldis kohaliku omavalitsuse eelarvest', normalizedCategory:'other_income', amountNative:0.109938, disclosureLevel:'aggregated' },
    { rawLabel:'EJLiidu toetused', normalizedCategory:'other_income', amountNative:0.14693, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA solidaarsustoetus noorte- ja kogukonnatööle', normalizedCategory:'youth_football', amountNative:0.2601, disclosureLevel:'aggregated' },
    { rawLabel:'Mitteseotud osapoolte toetused/annetused', normalizedCategory:'other_income', amountNative:0.014319, disclosureLevel:'aggregated' },
    { rawLabel:'Seotud osapoolte toetused/annetused', normalizedCategory:'other_income', amountNative:0.013537, disclosureLevel:'aggregated' },
    { rawLabel:'Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam', normalizedCategory:'sponsorship_commercial', amountNative:0.046494, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu', normalizedCategory:'matchday_competition', amountNative:0.005966, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi sümboolikaga toodete müügitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.001251, disclosureLevel:'aggregated' },
    { rawLabel:'Muud klassifitseerimata äritulud', normalizedCategory:'other_income', amountNative:0.011389, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu mängijaõiguste müügist', normalizedCategory:'player_sales', amountNative:0.233, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu turniiride/laagrite korraldamisest', normalizedCategory:'other_income', amountNative:0.003385, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi peasponsorilt saadud tulu', normalizedCategory:'sponsorship_commercial', amountNative:0.012, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.002196, disclosureLevel:'aggregated' },
  ],
};
const narvatranseeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Kulu mängija]iguste soetamisest ja ülemineku registreerimitsudest', normalizedCategory:'player_amortisation', amountNative:-0.0048, disclosureLevel:'aggregated' },
    { rawLabel:'Kodumängu korralduskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.004711, disclosureLevel:'aggregated' },
    { rawLabel:'Võistkondade välissõitude- ja lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.060036, disclosureLevel:'aggregated' },
    { rawLabel:'Klubisümboolikaga toodete omahind', normalizedCategory:'admin_general_expense', amountNative:-0.00052, disclosureLevel:'aggregated' },
    { rawLabel:'Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud', normalizedCategory:'admin_general_expense', amountNative:-0.026178, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi administreerimiskulud', normalizedCategory:'admin_general_expense', amountNative:-0.034733, disclosureLevel:'aggregated' },
    { rawLabel:'Mänguvormid ja varustus', normalizedCategory:'other_expenses', amountNative:-0.031036, disclosureLevel:'aggregated' },
    { rawLabel:'Muu tegevuse kulu/koolitus, riigilõiv', normalizedCategory:'admin_general_expense', amountNative:-0.007887, disclosureLevel:'aggregated' },
    { rawLabel:'Muud klassifitseerimata tegevuskulud/ehitus', normalizedCategory:'other_expenses', amountNative:-0.002239, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti Meistrivõistluste osavõtu tasu', normalizedCategory:'match_organisation_expense', amountNative:-0.0107, disclosureLevel:'aggregated' },
    { rawLabel:'Meditsiinitarvikud-ja teenused', normalizedCategory:'admin_general_expense', amountNative:-0.010532, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.16184, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.054491, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstav sportlasetoetus', normalizedCategory:'wages_squad', amountNative:-0.119317, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstav EJL ja klubi poolt arengustipendium', normalizedCategory:'wages_squad', amountNative:-0.0486, disclosureLevel:'aggregated' },
    { rawLabel:'Tehnilise personali palgakulu', normalizedCategory:'wages_squad', amountNative:-0.12754, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks tehnilise personali töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.039892, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-0.061193, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks muu personaali', normalizedCategory:'admin_general_expense', amountNative:-0.020684, disclosureLevel:'aggregated' },
    { rawLabel:'Põhivarade kulum ja väärtuse langus', normalizedCategory:'depreciation', amountNative:-0.000774, disclosureLevel:'aggregated' },
    { rawLabel:'Muud kulud', normalizedCategory:'other_expenses', amountNative:-0.008123, disclosureLevel:'aggregated' },
  ],
};
const narvatranseeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'narvatrans-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.001883, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.001917},
      {label:'Intressikulud', value:-0.000034},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.003789, officialTotalExpenses:0.835826, officialPAT:0.169846,
  },
};
const narvatranseePresupuestoOverlayByYear = {};

const narvatranseePasesData = [];
const narvatranseeResultadosData = {};
const narvatranseeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['narvatrans-ee'] = {
  revenueLinesByYear: narvatranseeRevenueLinesByYear, expenseLinesByYear: narvatranseeExpenseLinesByYear,
  fiscalYearMeta: narvatranseeFiscalYearMeta, pasesData: narvatranseePasesData,
  resultadosData: narvatranseeResultadosData, titulosData: narvatranseeTitulosData,
  presupuestoOverlayByYear: narvatranseePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'narvatrans-ee-aruanne-2025': {
    id:'narvatrans-ee-aruanne-2025', clubId:'narvatrans-ee',
    title:'Jalgpalliklubi Narva Trans — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['narvatrans-ee'] = null;
