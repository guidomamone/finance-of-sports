const sarpsborg08noRevenueLinesByYear = {
  2025: [
    { rawLabel:'Billetinntekter', normalizedCategory:'matchday_competition', amountNative:11.408125, disclosureLevel:'aggregated' },
    { rawLabel:'Medlemsinntekter', normalizedCategory:'member_dues', amountNative:0.712295, disclosureLevel:'aggregated' },
    { rawLabel:'Andre salgsinntekter', normalizedCategory:'other_income', amountNative:13.051656, disclosureLevel:'aggregated' },
    { rawLabel:'Andre inntekter', normalizedCategory:'other_income', amountNative:9.289541, disclosureLevel:'aggregated' },
    { rawLabel:'Reklame- og sponsorinntekter', normalizedCategory:'sponsorship_commercial', amountNative:34.435007, disclosureLevel:'aggregated' },
    { rawLabel:'Mediainntekter', normalizedCategory:'broadcasting', amountNative:18.235206, disclosureLevel:'aggregated' },
    { rawLabel:'Tilskudd', normalizedCategory:'other_income', amountNative:0.76705, disclosureLevel:'aggregated' },
    { rawLabel:'Salg/utleie spillere', normalizedCategory:'player_sales', amountNative:134.979734, disclosureLevel:'aggregated' },
  ],
};
const sarpsborg08noExpenseLinesByYear = {
  2025: [
    { rawLabel:'Trening, matriell, kamp kostn.', normalizedCategory:'other_expenses', amountNative:-16.41132, disclosureLevel:'aggregated' },
    { rawLabel:'Reise- og oppholdskostnader bortekamper', normalizedCategory:'match_organisation_expense', amountNative:-5.456484, disclosureLevel:'aggregated' },
    { rawLabel:'Salgskostnader', normalizedCategory:'other_expenses', amountNative:-65.871707, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-52.008396, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-10.475799, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-1.053321, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-0.907956, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning av driftsmidler og immaterielle eiendeler', normalizedCategory:'depreciation', amountNative:-14.599445, disclosureLevel:'aggregated' },
    { rawLabel:'Andre kostnader', normalizedCategory:'other_expenses', amountNative:-17.315133, disclosureLevel:'aggregated' },
    { rawLabel:'Reklame- og sponsorkostnader', normalizedCategory:'admin_general_expense', amountNative:-10.371944, disclosureLevel:'aggregated' },
    { rawLabel:'Admkost', normalizedCategory:'admin_general_expense', amountNative:-10.759014, disclosureLevel:'aggregated' },
  ],
};
const sarpsborg08noFiscalYearMeta = {
  2025: {
    currency:'NOK', fxRef:'NOK@2025-12-31',
    sourceId:'sarpsborg08-no-aarsregnskap-fotballforening-fli-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.165402, tax:0,
    extraRows: [
      {label:'Annen renteinntekt', value:0.70662},
      {label:'Annen finansinntekt', value:1.238687},
      {label:'Annen rentekostnad', value:-1.132192},
      {label:'Annen finanskostnad', value:-1.978517},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:222.878614, officialTotalExpenses:205.230519, officialPAT:16.482693,
  },
};
const sarpsborg08noPresupuestoOverlayByYear = {};

const sarpsborg08noPasesData = [];
const sarpsborg08noResultadosData = {};
const sarpsborg08noTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sarpsborg08-no'] = {
  revenueLinesByYear: sarpsborg08noRevenueLinesByYear, expenseLinesByYear: sarpsborg08noExpenseLinesByYear,
  fiscalYearMeta: sarpsborg08noFiscalYearMeta, pasesData: sarpsborg08noPasesData,
  resultadosData: sarpsborg08noResultadosData, titulosData: sarpsborg08noTitulosData,
  presupuestoOverlayByYear: sarpsborg08noPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sarpsborg08-no-aarsregnskap-fotballforening-fli-2025': {
    id:'sarpsborg08-no-aarsregnskap-fotballforening-fli-2025', clubId:'sarpsborg08-no',
    title:'Sarpsborg 08 Fotballforening — aarsregnskap-fotballforening-fli-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['sarpsborg08-no'] = null;
