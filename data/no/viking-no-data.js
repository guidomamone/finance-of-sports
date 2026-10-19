const vikingnoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Inntekt fra samarbeidsavtaler', normalizedCategory:'sponsorship_commercial', amountNative:82.33338, disclosureLevel:'aggregated' },
    { rawLabel:'Billettinntekt fra kamper', normalizedCategory:'matchday_competition', amountNative:27.464561, disclosureLevel:'aggregated' },
    { rawLabel:'Medieinntekter', normalizedCategory:'broadcasting', amountNative:47.909413, disclosureLevel:'aggregated' },
    { rawLabel:'Gevinst ved salg av spillerrettigheter', normalizedCategory:'player_sales', amountNative:61.756707, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'other_income', amountNative:48.667227, disclosureLevel:'aggregated' },
  ],
};
const vikingnoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-13.927807, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-2.101645, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkostnader fra Viking FK', normalizedCategory:'wages_squad', amountNative:-80.010132, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad (OTP)', normalizedCategory:'wages_squad', amountNative:-0.529119, disclosureLevel:'aggregated' },
    { rawLabel:'Andre personalkostnader', normalizedCategory:'wages_squad', amountNative:-0.325704, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-112.406643, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger spillerrettigheter', normalizedCategory:'player_amortisation', amountNative:-19.207686, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger markedsrettigheter', normalizedCategory:'other_amortisation', amountNative:-0.225, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger varige driftsmidler', normalizedCategory:'depreciation', amountNative:-9.022602, disclosureLevel:'aggregated' },
  ],
};
const vikingnoFiscalYearMeta = {
  2025: {
    currency:'NOK', fxRef:'NOK@2025-12-31',
    sourceId:'viking-no-aarsregnskap-viking-fotball-as-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.707366, tax:0,
    extraRows: [
      {label:'Renteinntekt', value:1.497338},
      {label:'Netto finansinntekt/kostnad', value:-2.138694},
      {label:'Rentekostnad', value:-5.06601},
      {label:'Skattekostnad på ordinært resultat', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:268.131288, officialTotalExpenses:237.756338, officialPAT:24.667584,
  },
};
const vikingnoPresupuestoOverlayByYear = {};

const vikingnoPasesData = [];
const vikingnoResultadosData = {};
const vikingnoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['viking-no'] = {
  revenueLinesByYear: vikingnoRevenueLinesByYear, expenseLinesByYear: vikingnoExpenseLinesByYear,
  fiscalYearMeta: vikingnoFiscalYearMeta, pasesData: vikingnoPasesData,
  resultadosData: vikingnoResultadosData, titulosData: vikingnoTitulosData,
  presupuestoOverlayByYear: vikingnoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'viking-no-aarsregnskap-viking-fotball-as-2025': {
    id:'viking-no-aarsregnskap-viking-fotball-as-2025', clubId:'viking-no',
    title:'Viking Fotball AS — aarsregnskap-viking-fotball-as-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['viking-no'] = null;
