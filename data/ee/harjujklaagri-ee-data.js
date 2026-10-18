const harjujklaagrieeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Mittesihtotsatarbelised annetused ja toetused', normalizedCategory:'other_income', amountNative:0.005, disclosureLevel:'aggregated' },
    { rawLabel:'Sihtotstarbelised annetused ja toetused-Riigi ja KOV toetused', normalizedCategory:'other_income', amountNative:0.0025, disclosureLevel:'aggregated' },
    { rawLabel:'Sihtotstarvelised annetused ja toetused-EJL', normalizedCategory:'other_income', amountNative:0.288916, disclosureLevel:'aggregated' },
    { rawLabel:'Reklaamitulu', normalizedCategory:'sponsorship_commercial', amountNative:0.0782, disclosureLevel:'aggregated' },
    { rawLabel:'Teenuste müük', normalizedCategory:'other_income', amountNative:0.00022, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijaõiguste müük', normalizedCategory:'player_sales', amountNative:0.019, disclosureLevel:'aggregated' },
  ],
};
const harjujklaagrieeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Mängijatele makstav sportlasestipendium', normalizedCategory:'wages_squad', amountNative:-0.101532, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijatele makstav sportlasetoetus', normalizedCategory:'wages_squad', amountNative:-0.029933, disclosureLevel:'aggregated' },
    { rawLabel:'Üür ja rent', normalizedCategory:'admin_general_expense', amountNative:-0.026508, disclosureLevel:'aggregated' },
    { rawLabel:'Mitmesugused bürookulud', normalizedCategory:'admin_general_expense', amountNative:-0.002024, disclosureLevel:'aggregated' },
    { rawLabel:'Lähetuskulud', normalizedCategory:'match_organisation_expense', amountNative:-0.00332, disclosureLevel:'aggregated' },
    { rawLabel:'Muud tehnilisele personalile tehtud väljamaksed', normalizedCategory:'wages_squad', amountNative:-0.087609, disclosureLevel:'aggregated' },
    { rawLabel:'Konsultatsioonid, koolitused', normalizedCategory:'admin_general_expense', amountNative:-0.020146, disclosureLevel:'aggregated' },
    { rawLabel:'Ruumide kommunaalkulud', normalizedCategory:'admin_general_expense', amountNative:-0.013914, disclosureLevel:'aggregated' },
    { rawLabel:'Reklaamikulud', normalizedCategory:'admin_general_expense', amountNative:-0.00214, disclosureLevel:'aggregated' },
    { rawLabel:'Eesti meistrivõistluste osavõtutasud', normalizedCategory:'match_organisation_expense', amountNative:-0.00574, disclosureLevel:'aggregated' },
    { rawLabel:'Transpordikulud', normalizedCategory:'match_organisation_expense', amountNative:-0.015924, disclosureLevel:'aggregated' },
    { rawLabel:'Mängijate üleminekukulud', normalizedCategory:'player_amortisation', amountNative:-0.017904, disclosureLevel:'aggregated' },
    { rawLabel:'Varustus, mänguvormid', normalizedCategory:'other_expenses', amountNative:-0.014306, disclosureLevel:'aggregated' },
    { rawLabel:'Meditsiinitarvikud,-teenused', normalizedCategory:'admin_general_expense', amountNative:-0.013987, disclosureLevel:'aggregated' },
    { rawLabel:'Turvateenuste kulud', normalizedCategory:'match_organisation_expense', amountNative:-0.006311, disclosureLevel:'aggregated' },
    { rawLabel:'Muud', normalizedCategory:'other_expenses', amountNative:-0.044891, disclosureLevel:'aggregated' },
    { rawLabel:'Palgakulu', normalizedCategory:'wages_squad', amountNative:-0.063831, disclosureLevel:'aggregated' },
    { rawLabel:'Sotsiaalmaksud', normalizedCategory:'wages_squad', amountNative:-0.021575, disclosureLevel:'aggregated' },
    { rawLabel:'Muud kulud', normalizedCategory:'other_expenses', amountNative:-0.000023, disclosureLevel:'aggregated' },
  ],
};
const harjujklaagrieeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'harjujklaagri-ee-aruanne-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.001909, tax:0,
    extraRows: [
      {label:'Intressitulud', value:0.000113},
      {label:'Intressikulud', value:-0.002022},
      {label:'Muud finantstulud ja -kulud', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.393836, officialTotalExpenses:0.491618, officialPAT:-0.099691,
  },
};
const harjujklaagrieePresupuestoOverlayByYear = {};

const harjujklaagrieePasesData = [];
const harjujklaagrieeResultadosData = {};
const harjujklaagrieeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['harjujklaagri-ee'] = {
  revenueLinesByYear: harjujklaagrieeRevenueLinesByYear, expenseLinesByYear: harjujklaagrieeExpenseLinesByYear,
  fiscalYearMeta: harjujklaagrieeFiscalYearMeta, pasesData: harjujklaagrieePasesData,
  resultadosData: harjujklaagrieeResultadosData, titulosData: harjujklaagrieeTitulosData,
  presupuestoOverlayByYear: harjujklaagrieePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'harjujklaagri-ee-aruanne-2025': {
    id:'harjujklaagri-ee-aruanne-2025', clubId:'harjujklaagri-ee',
    title:'MTÜ Harju Jalgpalliklubi Laagri — aruanne-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['harjujklaagri-ee'] = null;
