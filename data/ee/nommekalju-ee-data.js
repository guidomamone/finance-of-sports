const nommekaljueeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:0.258836, disclosureLevel:'aggregated' },
    { rawLabel:'Sihtfinantseerimine tegevuskuludeks', normalizedCategory:'other_income', amountNative:0.025511, disclosureLevel:'aggregated' },
    { rawLabel:'Riigi ja omavalitsuste toetus', normalizedCategory:'other_income', amountNative:0.22119, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA solidaarsustoetus', normalizedCategory:'competition_bonus', amountNative:1.144759, disclosureLevel:'aggregated' },
    { rawLabel:'EJL toetused', normalizedCategory:'other_income', amountNative:0.056625, disclosureLevel:'aggregated' },
    { rawLabel:'Muud toetused ECA, LHV', normalizedCategory:'other_income', amountNative:0.010448, disclosureLevel:'aggregated' },
    { rawLabel:'Riiklik noorteraha', normalizedCategory:'youth_football', amountNative:0.002718, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu Eesti sisesed võistlused', normalizedCategory:'matchday_competition', amountNative:0.006652, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu UEFA klubisarjades osalemisest', normalizedCategory:'matchday_competition', amountNative:0.01411, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijaõiguste müük', normalizedCategory:'player_sales', amountNative:0.5829, disclosureLevel:'aggregated' },
    { rawLabel:'TV õiguste müük', normalizedCategory:'broadcasting', amountNative:0.014, disclosureLevel:'aggregated' },
    { rawLabel:'Renditulu', normalizedCategory:'other_income', amountNative:0.002247, disclosureLevel:'aggregated' },
    { rawLabel:'Muu äritegevus', normalizedCategory:'other_income', amountNative:0.020024, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu sponsoritelt', normalizedCategory:'sponsorship_commercial', amountNative:0.175, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi sümboolikaga toodete müügitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.000206, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.000209, disclosureLevel:'aggregated' },
  ],
};
const nommekaljueeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Sihtotstarbeliselt finantseeritud projektide otsesed kulud', normalizedCategory:'other_expenses', amountNative:-0.025511, disclosureLevel:'aggregated' },
    { rawLabel:'Maksuvabad stipendiumid', normalizedCategory:'wages_squad', amountNative:-0.04148, disclosureLevel:'aggregated' },
    { rawLabel:'Sportlastoetused', normalizedCategory:'wages_squad', amountNative:-0.221754, disclosureLevel:'aggregated' },
    { rawLabel:'Tasud vahendajatele/agenditasud', normalizedCategory:'other_expenses', amountNative:-0.0095, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijaõigused', normalizedCategory:'player_amortisation', amountNative:-0.0036, disclosureLevel:'aggregated' },
    { rawLabel:'Kodumängude korralduskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.044576, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti meistrivõistluste osavõtutasu', normalizedCategory:'match_organisation_expense', amountNative:-0.01144, disclosureLevel:'aggregated' },
    { rawLabel:'Võistkondade välissõitude kulud', normalizedCategory:'match_organisation_expense', amountNative:-0.159257, disclosureLevel:'aggregated' },
    { rawLabel:'Turundus-, sponsorlus- ja reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.009853, disclosureLevel:'aggregated' },
    { rawLabel:'Klubisümboolikaga toodete omahind', normalizedCategory:'other_expenses', amountNative:-0.002717, disclosureLevel:'aggregated' },
    { rawLabel:'Klubile kuuluvate ja tema kasutuses olevate hoonete ja rajatistega seotud kulud', normalizedCategory:'admin_general_expense', amountNative:-0.108918, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi administreerimiskulud', normalizedCategory:'admin_general_expense', amountNative:-0.250432, disclosureLevel:'aggregated' },
    { rawLabel:'Meditsiinitarvikud- ja teenused', normalizedCategory:'other_expenses', amountNative:-0.021097, disclosureLevel:'aggregated' },
    { rawLabel:'Mänguvormid jm varustus', normalizedCategory:'other_expenses', amountNative:-0.033801, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.203034, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate töötasudelt makstud maksud', normalizedCategory:'wages_squad', amountNative:-0.068444, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-0.303392, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali töötasudelt makstud maksud', normalizedCategory:'admin_general_expense', amountNative:-0.103032, disclosureLevel:'aggregated' },
    { rawLabel:'Puhkusereserv', normalizedCategory:'admin_general_expense', amountNative:0.001431, disclosureLevel:'aggregated' },
    { rawLabel:'Põhivarade kulum ja väärtuse langus', normalizedCategory:'depreciation', amountNative:-0.0216, disclosureLevel:'aggregated' },
    { rawLabel:'Muud kulud', normalizedCategory:'other_expenses', amountNative:-0.048985, disclosureLevel:'aggregated' },
  ],
};
const nommekaljueeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'nommekalju-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.011936, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.001384},
      {label:'Intressikulud', value:-0.011264},
      {label:'Muud finantstulud ja -kulud', value:-0.002056},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.535435, officialTotalExpenses:1.690992, officialPAT:0.832507,
  },
};
const nommekaljueePresupuestoOverlayByYear = {};

const nommekaljueePasesData = [];
const nommekaljueeResultadosData = {};
const nommekaljueeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['nommekalju-ee'] = {
  revenueLinesByYear: nommekaljueeRevenueLinesByYear, expenseLinesByYear: nommekaljueeExpenseLinesByYear,
  fiscalYearMeta: nommekaljueeFiscalYearMeta, pasesData: nommekaljueePasesData,
  resultadosData: nommekaljueeResultadosData, titulosData: nommekaljueeTitulosData,
  presupuestoOverlayByYear: nommekaljueePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'nommekalju-ee-aruanne-2025': {
    id:'nommekalju-ee-aruanne-2025', clubId:'nommekalju-ee',
    title:'Mittetulundusühing Nõmme Kalju FC — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['nommekalju-ee'] = null;
