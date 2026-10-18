const paidelinnameeskondeeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:0.153759, disclosureLevel:'aggregated' },
    { rawLabel:'Sihtfinantseerimine tegevuskuludeks', normalizedCategory:'other_income', amountNative:0.032842, disclosureLevel:'aggregated' },
    { rawLabel:'Sihtfinantseerimine põhivarade soetamiseks', normalizedCategory:'other_income', amountNative:0.483102, disclosureLevel:'aggregated' },
    { rawLabel:'Türi Spordikluubide Liit MTÜ', normalizedCategory:'other_income', amountNative:0.001, disclosureLevel:'aggregated' },
    { rawLabel:'LHV', normalizedCategory:'other_income', amountNative:0.004653, disclosureLevel:'aggregated' },
    { rawLabel:'Spordikoolituse ja-teabe SA Spordikoolituse ja-teabe S', normalizedCategory:'other_income', amountNative:0.084895, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA solidarsustoetus', normalizedCategory:'competition_bonus', amountNative:1.288571, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti Jalgpalliliidu toetused', normalizedCategory:'other_income', amountNative:0.04074, disclosureLevel:'aggregated' },
    { rawLabel:'KOV toetus', normalizedCategory:'other_income', amountNative:0.112611, disclosureLevel:'aggregated' },
    { rawLabel:'FIFA RSTP', normalizedCategory:'player_sales', amountNative:0.002122, disclosureLevel:'aggregated' },
    { rawLabel:'Väljaku äärde ja reklaamtahvlitele paigaldatud reklaam', normalizedCategory:'sponsorship_commercial', amountNative:0.474835, disclosureLevel:'aggregated' },
    { rawLabel:'Tulud mängijaõiguste müügist', normalizedCategory:'player_sales', amountNative:1.263734, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu', normalizedCategory:'matchday_competition', amountNative:0.035985, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.019694, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu ülekandeõiguste müügist', normalizedCategory:'broadcasting', amountNative:0.075, disclosureLevel:'aggregated' },
    { rawLabel:'Renditulu', normalizedCategory:'other_income', amountNative:0.025844, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.000335, disclosureLevel:'aggregated' },
  ],
};
const paidelinnameeskondeeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Sihtotstarbeliselt finantseeritud projektide otsesed kulud', normalizedCategory:'other_expenses', amountNative:-0.164939, disclosureLevel:'aggregated' },
    { rawLabel:'Stipendiumid', normalizedCategory:'wages_squad', amountNative:-0.0403, disclosureLevel:'aggregated' },
    { rawLabel:'Toetused', normalizedCategory:'wages_squad', amountNative:-0.391099, disclosureLevel:'aggregated' },
    { rawLabel:'Lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.490359, disclosureLevel:'aggregated' },
    { rawLabel:'Koolituskulud', normalizedCategory:'admin_general_expense', amountNative:-0.111662, disclosureLevel:'aggregated' },
    { rawLabel:'mängijate soetuskulud', normalizedCategory:'player_amortisation', amountNative:-0.435571, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi administreerimiskulud', normalizedCategory:'admin_general_expense', amountNative:-0.138621, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti meistrivõistluste osavõtutasu', normalizedCategory:'match_organisation_expense', amountNative:-0.0139, disclosureLevel:'aggregated' },
    { rawLabel:'Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud', normalizedCategory:'admin_general_expense', amountNative:-0.191538, disclosureLevel:'aggregated' },
    { rawLabel:'Kodumängu korralduskulud (v.a staadioni rent)', normalizedCategory:'match_organisation_expense', amountNative:-0.111367, disclosureLevel:'aggregated' },
    { rawLabel:'Turundus-, sponsorlus- ja reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.013289, disclosureLevel:'aggregated' },
    { rawLabel:'Müüdud toodete ja muu varustuse maksumus', normalizedCategory:'other_expenses', amountNative:-0.070645, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.08299, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulud', normalizedCategory:'wages_squad', amountNative:-0.31557, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.111421, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-0.912946, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks muu personali töötasudelt', normalizedCategory:'admin_general_expense', amountNative:-0.309395, disclosureLevel:'aggregated' },
    { rawLabel:'Muud kulud', normalizedCategory:'other_expenses', amountNative:-0.020332, disclosureLevel:'aggregated' },
  ],
};
const paidelinnameeskondeeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'paidelinnameeskond-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.053316, tax:0,
    extraRows: [
      {label:'Intressikulud', value:-0.063186},
      {label:'Muud finantstulud ja -kulud', value:0.00987},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:4.099722, officialTotalExpenses:3.925944, officialPAT:0.120462,
  },
};
const paidelinnameeskondeePresupuestoOverlayByYear = {};

const paidelinnameeskondeePasesData = [];
const paidelinnameeskondeeResultadosData = {};
const paidelinnameeskondeeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['paidelinnameeskond-ee'] = {
  revenueLinesByYear: paidelinnameeskondeeRevenueLinesByYear, expenseLinesByYear: paidelinnameeskondeeExpenseLinesByYear,
  fiscalYearMeta: paidelinnameeskondeeFiscalYearMeta, pasesData: paidelinnameeskondeePasesData,
  resultadosData: paidelinnameeskondeeResultadosData, titulosData: paidelinnameeskondeeTitulosData,
  presupuestoOverlayByYear: paidelinnameeskondeePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'paidelinnameeskond-ee-aruanne-2025': {
    id:'paidelinnameeskond-ee-aruanne-2025', clubId:'paidelinnameeskond-ee',
    title:'Jalgpalliklubi Paide Linnameeskond — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['paidelinnameeskond-ee'] = null;
