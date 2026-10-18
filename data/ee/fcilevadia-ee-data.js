const fcilevadiaeeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Piletitulu Eesti-siseste võistlustustel', normalizedCategory:'matchday_competition', amountNative:0.018498, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu UEFA klubisarjades osalemisest', normalizedCategory:'matchday_competition', amountNative:0.035304, disclosureLevel:'aggregated' },
    { rawLabel:'Hooajapiletite müügitulu', normalizedCategory:'season_tickets', amountNative:0.00115, disclosureLevel:'aggregated' },
    { rawLabel:'Reklaamitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.265208, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu ülekandeõiguste müügist', normalizedCategory:'broadcasting', amountNative:0.014, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi sümboolikaga toodete müügitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.006751, disclosureLevel:'aggregated' },
    { rawLabel:'Staadioni rent', normalizedCategory:'stadium_other', amountNative:0.013416, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.00496, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu mängijate üleminekutest klubist välja', normalizedCategory:'player_sales', amountNative:0.075136, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA toetused', normalizedCategory:'competition_bonus', amountNative:1.119198, disclosureLevel:'aggregated' },
    { rawLabel:'Riigi ja/või KOV toetused', normalizedCategory:'other_income', amountNative:0.141954, disclosureLevel:'aggregated' },
    { rawLabel:'Toetus kogukonnajuht', normalizedCategory:'other_income', amountNative:0.00864, disclosureLevel:'aggregated' },
    { rawLabel:'Riiklik treenerite tööjōukulude toetus', normalizedCategory:'other_income', amountNative:0.073752, disclosureLevel:'aggregated' },
    { rawLabel:'EJL toetused', normalizedCategory:'other_income', amountNative:0.050925, disclosureLevel:'aggregated' },
    { rawLabel:'Seotud osapoolte toetused/annetused', normalizedCategory:'other_income', amountNative:0.2535, disclosureLevel:'aggregated' },
    { rawLabel:'Mitteseotud osapoolte toetused/annetused', normalizedCategory:'other_income', amountNative:0.018108, disclosureLevel:'aggregated' },
    { rawLabel:'Noormängijate osavõtutasud', normalizedCategory:'youth_football', amountNative:0.575148, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu liikmemaksudest', normalizedCategory:'member_dues', amountNative:0.00003, disclosureLevel:'aggregated' },
  ],
};
const fcilevadiaeeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.344085, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.116593, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstav sportlasetoetus', normalizedCategory:'wages_squad', amountNative:-0.422455, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstud stipendiumid', normalizedCategory:'wages_squad', amountNative:-0.0554, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-1.026003, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks muu personali töötasudelt', normalizedCategory:'admin_general_expense', amountNative:-0.346401, disclosureLevel:'aggregated' },
    { rawLabel:'Kulutused turvalisusele', normalizedCategory:'match_organisation_expense', amountNative:-0.030277, disclosureLevel:'aggregated' },
    { rawLabel:'Trükised jm materjalid', normalizedCategory:'match_organisation_expense', amountNative:-0.010105, disclosureLevel:'aggregated' },
    { rawLabel:'Muud klassifitseerimata kodumängu korralduskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.034304, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti meistrivōistluste osavōtutasu', normalizedCategory:'match_organisation_expense', amountNative:-0.01274, disclosureLevel:'aggregated' },
    { rawLabel:'Lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.430603, disclosureLevel:'aggregated' },
    { rawLabel:'Turundus-, sponsorlus- ja reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.008768, disclosureLevel:'aggregated' },
    { rawLabel:'Klubisümboolikaga toodete omahind', normalizedCategory:'other_expenses', amountNative:-0.01079, disclosureLevel:'aggregated' },
    { rawLabel:'Klubile kuuluvate ja tema poolt renditud hoonete ja rajatisega seotud kulud', normalizedCategory:'admin_general_expense', amountNative:-0.178571, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi administeerimiskulud', normalizedCategory:'admin_general_expense', amountNative:-0.049258, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tegevuskulud', normalizedCategory:'other_expenses', amountNative:-0.307809, disclosureLevel:'aggregated' },
    { rawLabel:'Kulu mängijate üleminekutest klubisse', normalizedCategory:'player_amortisation', amountNative:-0.104323, disclosureLevel:'aggregated' },
    { rawLabel:'Pōhivara kulum', normalizedCategory:'depreciation', amountNative:-0.135535, disclosureLevel:'aggregated' },
    { rawLabel:'Ärikulud', normalizedCategory:'other_expenses', amountNative:-0.000016, disclosureLevel:'aggregated' },
  ],
};
const fcilevadiaeeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'fcilevadia-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.271253, tax:0,
    extraRows: [
      {label:'Finantstulud', value:0.008037},
      {label:'Finantskulud', value:-0.27929},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.675678, officialTotalExpenses:3.624036, officialPAT:-1.219611,
  },
};
const fcilevadiaeePresupuestoOverlayByYear = {};

const fcilevadiaeePasesData = [];
const fcilevadiaeeResultadosData = {};
const fcilevadiaeeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fcilevadia-ee'] = {
  revenueLinesByYear: fcilevadiaeeRevenueLinesByYear, expenseLinesByYear: fcilevadiaeeExpenseLinesByYear,
  fiscalYearMeta: fcilevadiaeeFiscalYearMeta, pasesData: fcilevadiaeePasesData,
  resultadosData: fcilevadiaeeResultadosData, titulosData: fcilevadiaeeTitulosData,
  presupuestoOverlayByYear: fcilevadiaeePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fcilevadia-ee-aruanne-2025': {
    id:'fcilevadia-ee-aruanne-2025', clubId:'fcilevadia-ee',
    title:'FCI Levadia MTÜ — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['fcilevadia-ee'] = null;
