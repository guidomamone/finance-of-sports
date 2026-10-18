const tallinnakaleveeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:0.837426, disclosureLevel:'aggregated' },
    { rawLabel:'Sihtfinantseerimine tegevuskuludeks', normalizedCategory:'other_income', amountNative:1.033337, disclosureLevel:'aggregated' },
    { rawLabel:'Mittesihtotsatarbelised annetused ja toetused', normalizedCategory:'other_income', amountNative:0.013105, disclosureLevel:'aggregated' },
    { rawLabel:'Renditulu staadioni või selle rajatiste väljarentimisest', normalizedCategory:'stadium_other', amountNative:0.111873, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu', normalizedCategory:'matchday_competition', amountNative:0.006859, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu turniiride korraldamisest', normalizedCategory:'other_income', amountNative:0.0096, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu mängijaõiguste müügist', normalizedCategory:'player_sales', amountNative:0.05325, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi peasponsorilt saadud tulu', normalizedCategory:'sponsorship_commercial', amountNative:0.1128, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu teistelt sponsoritelt', normalizedCategory:'sponsorship_commercial', amountNative:0.152783, disclosureLevel:'aggregated' },
    { rawLabel:'Muud klassifitseerimata äritulud', normalizedCategory:'other_income', amountNative:0.024047, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.019337, disclosureLevel:'aggregated' },
  ],
};
const tallinnakaleveeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Sportlasetoetus', normalizedCategory:'wages_squad', amountNative:-0.065918, disclosureLevel:'aggregated' },
    { rawLabel:'Sportlase stipendium', normalizedCategory:'wages_squad', amountNative:-0.04238, disclosureLevel:'aggregated' },
    { rawLabel:'Elektrienergia', normalizedCategory:'admin_general_expense', amountNative:-0.034384, disclosureLevel:'aggregated' },
    { rawLabel:'Soojusenergia', normalizedCategory:'admin_general_expense', amountNative:-0.012347, disclosureLevel:'aggregated' },
    { rawLabel:'Veevarustusteenused', normalizedCategory:'admin_general_expense', amountNative:-0.001978, disclosureLevel:'aggregated' },
    { rawLabel:'Mitmesugused bürookulud', normalizedCategory:'admin_general_expense', amountNative:-0.02682, disclosureLevel:'aggregated' },
    { rawLabel:'Lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.020302, disclosureLevel:'aggregated' },
    { rawLabel:'Koolituskulud', normalizedCategory:'admin_general_expense', amountNative:-0.074376, disclosureLevel:'aggregated' },
    { rawLabel:'Reklaam', normalizedCategory:'admin_general_expense', amountNative:-0.002869, disclosureLevel:'aggregated' },
    { rawLabel:'Liiga liikmemaksud', normalizedCategory:'match_organisation_expense', amountNative:-0.0152, disclosureLevel:'aggregated' },
    { rawLabel:'Proportsiooniga tagastamatu käibemaks', normalizedCategory:'admin_general_expense', amountNative:-0.041896, disclosureLevel:'aggregated' },
    { rawLabel:'Staadioni ja saali rent', normalizedCategory:'match_organisation_expense', amountNative:-0.162752, disclosureLevel:'aggregated' },
    { rawLabel:'Transport', normalizedCategory:'match_organisation_expense', amountNative:-0.05125, disclosureLevel:'aggregated' },
    { rawLabel:'Meditsiinitarvikud- ja teenused', normalizedCategory:'other_expenses', amountNative:-0.029317, disclosureLevel:'aggregated' },
    { rawLabel:'Spordivarustus', normalizedCategory:'other_expenses', amountNative:-0.022656, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijaõiguste ülemineku kulud', normalizedCategory:'player_amortisation', amountNative:-0.0248, disclosureLevel:'aggregated' },
    { rawLabel:'Laagrite-ja turniiride korralduskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.01892, disclosureLevel:'aggregated' },
    { rawLabel:'Ruumide rent', normalizedCategory:'admin_general_expense', amountNative:-0.085659, disclosureLevel:'aggregated' },
    { rawLabel:'Autodega seotud kulud', normalizedCategory:'admin_general_expense', amountNative:-0.045727, disclosureLevel:'aggregated' },
    { rawLabel:'Turvateenused', normalizedCategory:'match_organisation_expense', amountNative:-0.008586, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.058028, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.105413, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaksud mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.03563, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-0.856109, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaksukulu muu personali töötasudelt', normalizedCategory:'admin_general_expense', amountNative:-0.291648, disclosureLevel:'aggregated' },
    { rawLabel:'Puhkusekohustuse reserv', normalizedCategory:'admin_general_expense', amountNative:-0.007082, disclosureLevel:'aggregated' },
    { rawLabel:'Põhivarade kulum ja väärtuse langus', normalizedCategory:'depreciation', amountNative:-0.036283, disclosureLevel:'aggregated' },
    { rawLabel:'Muud kulud', normalizedCategory:'other_expenses', amountNative:-0.010834, disclosureLevel:'aggregated' },
  ],
};
const tallinnakaleveeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'tallinnakalev-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.000002, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.000311},
      {label:'Intressikulud', value:-0.000313},
      {label:'Muud finantstulud ja -kulud', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.374417, officialTotalExpenses:2.189164, officialPAT:0.185251,
  },
};
const tallinnakaleveePresupuestoOverlayByYear = {};

const tallinnakaleveePasesData = [];
const tallinnakaleveeResultadosData = {};
const tallinnakaleveeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['tallinnakalev-ee'] = {
  revenueLinesByYear: tallinnakaleveeRevenueLinesByYear, expenseLinesByYear: tallinnakaleveeExpenseLinesByYear,
  fiscalYearMeta: tallinnakaleveeFiscalYearMeta, pasesData: tallinnakaleveePasesData,
  resultadosData: tallinnakaleveeResultadosData, titulosData: tallinnakaleveeTitulosData,
  presupuestoOverlayByYear: tallinnakaleveePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'tallinnakalev-ee-aruanne-2025': {
    id:'tallinnakalev-ee-aruanne-2025', clubId:'tallinnakalev-ee',
    title:'Jalgpalliklubi Tallinna Kalev — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['tallinnakalev-ee'] = null;
