const kuressaareeeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:0.20187, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA solidaarsustoetus', normalizedCategory:'competition_bonus', amountNative:0.2241, disclosureLevel:'aggregated' },
    { rawLabel:'EJL toetused', normalizedCategory:'other_income', amountNative:0.159819, disclosureLevel:'aggregated' },
    { rawLabel:'Riigi ja/või kohaliku omavalitsuse toetused', normalizedCategory:'other_income', amountNative:0.08998, disclosureLevel:'aggregated' },
    { rawLabel:'Muud toetused', normalizedCategory:'other_income', amountNative:0.005561, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorlus- ja reklaamitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.012186, disclosureLevel:'aggregated' },
    { rawLabel:'Piletitulu', normalizedCategory:'matchday_competition', amountNative:0.00536, disclosureLevel:'aggregated' },
    { rawLabel:'Klubi sümboolikaga toodete müügitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.00006, disclosureLevel:'aggregated' },
    { rawLabel:'Muu tulu ettevõtlusest', normalizedCategory:'other_income', amountNative:0.039157, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const kuressaareeeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Mängijatele makstav sportlasetoetus', normalizedCategory:'wages_squad', amountNative:-0.023349, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstav sportlasestipendium', normalizedCategory:'wages_squad', amountNative:-0.086471, disclosureLevel:'aggregated' },
    { rawLabel:'Muud annetused', normalizedCategory:'other_expenses', amountNative:-0.000575, disclosureLevel:'aggregated' },
    { rawLabel:'Üür ja rent', normalizedCategory:'admin_general_expense', amountNative:-0.005363, disclosureLevel:'aggregated' },
    { rawLabel:'Mitmesugused bürookulud', normalizedCategory:'admin_general_expense', amountNative:-0.017631, disclosureLevel:'aggregated' },
    { rawLabel:'Koolituskulud', normalizedCategory:'admin_general_expense', amountNative:-0.002819, disclosureLevel:'aggregated' },
    { rawLabel:'Riiklikud ja kohalikud maksud', normalizedCategory:'admin_general_expense', amountNative:-0.00042, disclosureLevel:'aggregated' },
    { rawLabel:'Kodumängu korralduskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.036194, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti meistrivõistluste osavõtutasu', normalizedCategory:'match_organisation_expense', amountNative:-0.00984, disclosureLevel:'aggregated' },
    { rawLabel:'Võistkondade välissõitude- ja lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.047585, disclosureLevel:'aggregated' },
    { rawLabel:'Turundus-, sponsorlus- ja reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.001253, disclosureLevel:'aggregated' },
    { rawLabel:'Müüdud toodete ja muu varustuse maksumus', normalizedCategory:'admin_general_expense', amountNative:-0.05455, disclosureLevel:'aggregated' },
    { rawLabel:'Klubile kuuluvate ja tema poolt renditud hoonete ja rajatistega seotud kulud', normalizedCategory:'admin_general_expense', amountNative:-0.039195, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijaõiguste ost', normalizedCategory:'player_amortisation', amountNative:-0.0027, disclosureLevel:'aggregated' },
    { rawLabel:'Liikmemaksud', normalizedCategory:'admin_general_expense', amountNative:-0.000015, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.020116, disclosureLevel:'aggregated' },
    { rawLabel:'EJL litsentsiga töötajate (v.a. mängijad) palgakulu', normalizedCategory:'wages_squad', amountNative:-0.30799, disclosureLevel:'aggregated' },
    { rawLabel:'EJL litsentsiga töötajate (v.a. mängijad) maksud', normalizedCategory:'wages_squad', amountNative:-0.104127, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.04156, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.014047, disclosureLevel:'aggregated' },
    { rawLabel:'Põhivarade kulum ja väärtuse langus', normalizedCategory:'depreciation', amountNative:-0.000596, disclosureLevel:'aggregated' },
    { rawLabel:'Muud kulud', normalizedCategory:'other_expenses', amountNative:-0.007593, disclosureLevel:'aggregated' },
  ],
};
const kuressaareeeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'kuressaare-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.0138, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.000006},
      {label:'Intressikulud', value:-0.013806},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.738093, officialTotalExpenses:0.823989, officialPAT:-0.099696,
  },
};
const kuressaareeePresupuestoOverlayByYear = {};

const kuressaareeePasesData = [];
const kuressaareeeResultadosData = {};
const kuressaareeeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['kuressaare-ee'] = {
  revenueLinesByYear: kuressaareeeRevenueLinesByYear, expenseLinesByYear: kuressaareeeExpenseLinesByYear,
  fiscalYearMeta: kuressaareeeFiscalYearMeta, pasesData: kuressaareeePasesData,
  resultadosData: kuressaareeeResultadosData, titulosData: kuressaareeeTitulosData,
  presupuestoOverlayByYear: kuressaareeePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'kuressaare-ee-aruanne-2025': {
    id:'kuressaare-ee-aruanne-2025', clubId:'kuressaare-ee',
    title:'Jalgpalliklubi FC Kuressaare — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['kuressaare-ee'] = null;
