const floratallinneeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:1.086623, disclosureLevel:'aggregated' },
    { rawLabel:'Mittesihtotsatarbelised annetused ja toetused', normalizedCategory:'other_income', amountNative:0.111359, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA solidaarsustoetus osalemise eest UEFA klubivõistlustel', normalizedCategory:'competition_bonus', amountNative:1.017835, disclosureLevel:'aggregated' },
    { rawLabel:'Riigi ja/või KOV toetus', normalizedCategory:'other_income', amountNative:0.469597, disclosureLevel:'aggregated' },
    { rawLabel:'EJL toetused', normalizedCategory:'other_income', amountNative:0.064365, disclosureLevel:'aggregated' },
    { rawLabel:'Muud toetused', normalizedCategory:'other_income', amountNative:0.07276, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu piletimüügist', normalizedCategory:'matchday_competition', amountNative:0.027103, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu ülekandeõiguste müügist', normalizedCategory:'broadcasting', amountNative:0.005, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu mängijaõiguste müügist', normalizedCategory:'player_sales', amountNative:0.080714, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorlus- ja reklaamitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.273222, disclosureLevel:'aggregated' },
    { rawLabel:'Staadioni rent', normalizedCategory:'stadium_other', amountNative:0.053283, disclosureLevel:'aggregated' },
    { rawLabel:'Muu tulu ettevõtlusest', normalizedCategory:'other_income', amountNative:0.043385, disclosureLevel:'aggregated' },
    { rawLabel:'Turniiri liikmemaksud', normalizedCategory:'other_income', amountNative:0.018937, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.01644, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Liikmetelt saadud tasud', normalizedCategory:'member_dues', amountNative:0.403391, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA solidaarsus- ja auhinnaraha', normalizedCategory:'competition_bonus', amountNative:0.792735, disclosureLevel:'aggregated' },
    { rawLabel:'Riigi ja/või KOV toetus', normalizedCategory:'other_income', amountNative:0.386104, disclosureLevel:'aggregated' },
    { rawLabel:'EJL toetused', normalizedCategory:'other_income', amountNative:0.008618, disclosureLevel:'aggregated' },
    { rawLabel:'Muud toetused', normalizedCategory:'other_income', amountNative:0.012648, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu piletimüügist', normalizedCategory:'matchday_competition', amountNative:0.050478, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu ülekandeõiguste müügist', normalizedCategory:'broadcasting', amountNative:0.034, disclosureLevel:'aggregated' },
    { rawLabel:'Tulu mängijaõiguste müügist', normalizedCategory:'player_sales', amountNative:0.060297, disclosureLevel:'aggregated' },
    { rawLabel:'Väljaku äärde ja reklaamtahvlitele paigutatud reklaam', normalizedCategory:'sponsorship_commercial', amountNative:0.206729, disclosureLevel:'aggregated' },
    { rawLabel:'Staadioni rent', normalizedCategory:'stadium_other', amountNative:0.093811, disclosureLevel:'aggregated' },
    { rawLabel:'Muu tulu ettevõtlusest', normalizedCategory:'other_income', amountNative:0.10671, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tulud', normalizedCategory:'other_income', amountNative:0.00243, disclosureLevel:'aggregated' },
  ],
};
const floratallinneeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Mängijatele makstav sportlasetoetus', normalizedCategory:'wages_squad', amountNative:-0.248862, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstav sportlasestipendium', normalizedCategory:'wages_squad', amountNative:-0.10886, disclosureLevel:'aggregated' },
    { rawLabel:'Muud annetused', normalizedCategory:'other_expenses', amountNative:-0.010112, disclosureLevel:'aggregated' },
    { rawLabel:'Üür ja rent', normalizedCategory:'admin_general_expense', amountNative:-0.07133, disclosureLevel:'aggregated' },
    { rawLabel:'Energia', normalizedCategory:'admin_general_expense', amountNative:-0.011949, disclosureLevel:'aggregated' },
    { rawLabel:'Mitmesugused bürookulud', normalizedCategory:'admin_general_expense', amountNative:-0.031266, disclosureLevel:'aggregated' },
    { rawLabel:'Lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.116221, disclosureLevel:'aggregated' },
    { rawLabel:'Koolituskulud', normalizedCategory:'admin_general_expense', amountNative:-0.04794, disclosureLevel:'aggregated' },
    { rawLabel:'Riiklikud ja kohalikud maksud', normalizedCategory:'admin_general_expense', amountNative:-0.001178, disclosureLevel:'aggregated' },
    { rawLabel:'Kulu ebatõenäoliselt laekuvatest nõuetest', normalizedCategory:'other_expenses', amountNative:-0.001079, disclosureLevel:'aggregated' },
    { rawLabel:'Võistluste ja treeningutega seotud kulud', normalizedCategory:'match_organisation_expense', amountNative:-0.347059, disclosureLevel:'aggregated' },
    { rawLabel:'Kulud mängijate õiguste ostmisest', normalizedCategory:'player_amortisation', amountNative:-0.033275, disclosureLevel:'aggregated' },
    { rawLabel:'Reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.001237, disclosureLevel:'aggregated' },
    { rawLabel:'Konsultatsioonid', normalizedCategory:'admin_general_expense', amountNative:-0.162539, disclosureLevel:'aggregated' },
    { rawLabel:'Autokulud', normalizedCategory:'admin_general_expense', amountNative:-0.043314, disclosureLevel:'aggregated' },
    { rawLabel:'Kasutusrendikulud', normalizedCategory:'admin_general_expense', amountNative:-0.031035, disclosureLevel:'aggregated' },
    { rawLabel:'Pangateenused', normalizedCategory:'admin_general_expense', amountNative:-0.0054, disclosureLevel:'aggregated' },
    { rawLabel:'Staadioni halduskulud', normalizedCategory:'admin_general_expense', amountNative:-0.165637, disclosureLevel:'aggregated' },
    { rawLabel:'Müüdud kaup soetusmaksumuses', normalizedCategory:'admin_general_expense', amountNative:-0.050261, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.203076, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.261627, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.089054, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-1.365546, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks muu personali töötasudelt', normalizedCategory:'admin_general_expense', amountNative:-0.45063, disclosureLevel:'aggregated' },
    { rawLabel:'Põhivarade kulum ja väärtuse langus', normalizedCategory:'depreciation', amountNative:-0.070709, disclosureLevel:'aggregated' },
    { rawLabel:'Esinduskulud', normalizedCategory:'admin_general_expense', amountNative:-0.034829, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.015999, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Üür ja rent', normalizedCategory:'admin_general_expense', amountNative:-0.025281, disclosureLevel:'aggregated' },
    { rawLabel:'Elektrienergia', normalizedCategory:'admin_general_expense', amountNative:-0.008184, disclosureLevel:'aggregated' },
    { rawLabel:'Kütus', normalizedCategory:'admin_general_expense', amountNative:-0.002356, disclosureLevel:'aggregated' },
    { rawLabel:'Mitmesugused bürookulud', normalizedCategory:'admin_general_expense', amountNative:-0.041054, disclosureLevel:'aggregated' },
    { rawLabel:'Lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.194787, disclosureLevel:'aggregated' },
    { rawLabel:'Koolituskulud', normalizedCategory:'admin_general_expense', amountNative:-0.012582, disclosureLevel:'aggregated' },
    { rawLabel:'Riiklikud ja kohalikud maksud', normalizedCategory:'admin_general_expense', amountNative:-0.004488, disclosureLevel:'aggregated' },
    { rawLabel:'Kulu ebatõenäoliselt laekuvatest nõuetest', normalizedCategory:'other_expenses', amountNative:-0.002756, disclosureLevel:'aggregated' },
    { rawLabel:'Võistluste ja treeningutega seotud kulud', normalizedCategory:'match_organisation_expense', amountNative:-0.297589, disclosureLevel:'aggregated' },
    { rawLabel:'Kulud mängijate õiguste ostmisest', normalizedCategory:'player_amortisation', amountNative:-0.16685, disclosureLevel:'aggregated' },
    { rawLabel:'Reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.022236, disclosureLevel:'aggregated' },
    { rawLabel:'Liikmemaksud tütarklubidele', normalizedCategory:'other_expenses', amountNative:-0.009405, disclosureLevel:'aggregated' },
    { rawLabel:'Stipendiumid', normalizedCategory:'wages_squad', amountNative:-0.242295, disclosureLevel:'aggregated' },
    { rawLabel:'Konsultatsioonid', normalizedCategory:'admin_general_expense', amountNative:-0.092892, disclosureLevel:'aggregated' },
    { rawLabel:'Autokulud', normalizedCategory:'admin_general_expense', amountNative:-0.01075, disclosureLevel:'aggregated' },
    { rawLabel:'Kasutusrendikulud', normalizedCategory:'admin_general_expense', amountNative:-0.005681, disclosureLevel:'aggregated' },
    { rawLabel:'Pangateenused', normalizedCategory:'admin_general_expense', amountNative:-0.002089, disclosureLevel:'aggregated' },
    { rawLabel:'Staadioni halduskulud', normalizedCategory:'admin_general_expense', amountNative:-0.076518, disclosureLevel:'aggregated' },
    { rawLabel:'Müüdud kaup soetusmaksumuses', normalizedCategory:'admin_general_expense', amountNative:-0.043392, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.068261, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate palgakulu', normalizedCategory:'wages_squad', amountNative:-0.242961, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks mängijate töötasudelt', normalizedCategory:'wages_squad', amountNative:-0.083331, disclosureLevel:'aggregated' },
    { rawLabel:'Muu personali palgakulu', normalizedCategory:'admin_general_expense', amountNative:-0.997658, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaks muu personali töötasudelt', normalizedCategory:'admin_general_expense', amountNative:-0.337945, disclosureLevel:'aggregated' },
    { rawLabel:'Põhivarade kulum ja väärtuse langus', normalizedCategory:'depreciation', amountNative:-0.058417, disclosureLevel:'aggregated' },
    { rawLabel:'Trahvid, viivised ja hüvitised', normalizedCategory:'other_expenses', amountNative:-0.000018, disclosureLevel:'aggregated' },
    { rawLabel:'Esinduskulud', normalizedCategory:'admin_general_expense', amountNative:-0.024834, disclosureLevel:'aggregated' },
    { rawLabel:'Jalgpalliga mitteseotud tegevuste kulud', normalizedCategory:'other_expenses', amountNative:-0.010707, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.002351, disclosureLevel:'aggregated' },
  ],
};
const floratallinneeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'floratallinn-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.070853, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.004218},
      {label:'Intressikulud', value:-0.074971},
      {label:'Muud finantstulud ja -kulud', value:-0.0001},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.340623, officialTotalExpenses:3.980053, officialPAT:-0.710283,
  },
  2019: {
    currency:'EUR', fxRef:'EUR@2019-12-31',
    sourceId:'floratallinn-ee-aruanne-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.036368, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.011799},
      {label:'Intressikulud', value:-0.048167},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.157951, officialTotalExpenses:3.087668, officialPAT:-0.966085,
  },
};
const floratallinneePresupuestoOverlayByYear = {};

const floratallinneePasesData = [];
const floratallinneeResultadosData = {};
const floratallinneeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['floratallinn-ee'] = {
  revenueLinesByYear: floratallinneeRevenueLinesByYear, expenseLinesByYear: floratallinneeExpenseLinesByYear,
  fiscalYearMeta: floratallinneeFiscalYearMeta, pasesData: floratallinneePasesData,
  resultadosData: floratallinneeResultadosData, titulosData: floratallinneeTitulosData,
  presupuestoOverlayByYear: floratallinneePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'floratallinn-ee-aruanne-2025': {
    id:'floratallinn-ee-aruanne-2025', clubId:'floratallinn-ee',
    title:'Jalgpalliklubi FCF — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'floratallinn-ee-aruanne-2019': {
    id:'floratallinn-ee-aruanne-2019', clubId:'floratallinn-ee',
    title:'Jalgpalliklubi FCF — aruanne-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['floratallinn-ee'] = null;
