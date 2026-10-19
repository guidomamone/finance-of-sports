const valerenganoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Sponsorinntekter', normalizedCategory:'sponsorship_commercial', amountNative:44.538148, disclosureLevel:'aggregated' },
    { rawLabel:'Markeds- og medieinntekter', normalizedCategory:'broadcasting', amountNative:28.53763, disclosureLevel:'aggregated' },
    { rawLabel:'Billettsalg', normalizedCategory:'matchday_competition', amountNative:25.505735, disclosureLevel:'aggregated' },
    { rawLabel:'Viderefakturert', normalizedCategory:'other_income', amountNative:0.19539, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse inntekter', normalizedCategory:'other_income', amountNative:1.047723, disclosureLevel:'aggregated' },
  ],
};
const valerenganoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-12.565199, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-11.905657, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-1.802767, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-0.247852, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-2.302202, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning av driftsmidler', normalizedCategory:'depreciation', amountNative:-0.185432, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivning av varige driftsmidler og immaterielle eiendeler', normalizedCategory:'other_expenses', amountNative:-1.045077, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-98.900054, disclosureLevel:'aggregated' },
  ],
};
const valerenganoFiscalYearMeta = {
  2025: {
    currency:'NOK', fxRef:'NOK@2025-12-31',
    sourceId:'valerenga-no-aarsregnskap-valerenga-fotball-as-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:31.72628, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:70.10379},
      {label:'Annen finanskostnad', value:-38.37751},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:99.824626, officialTotalExpenses:128.95424, officialPAT:2.596666,
  },
};
const valerenganoPresupuestoOverlayByYear = {};

const valerenganoPasesData = [];
const valerenganoResultadosData = {};
const valerenganoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['valerenga-no'] = {
  revenueLinesByYear: valerenganoRevenueLinesByYear, expenseLinesByYear: valerenganoExpenseLinesByYear,
  fiscalYearMeta: valerenganoFiscalYearMeta, pasesData: valerenganoPasesData,
  resultadosData: valerenganoResultadosData, titulosData: valerenganoTitulosData,
  presupuestoOverlayByYear: valerenganoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'valerenga-no-aarsregnskap-valerenga-fotball-as-2025': {
    id:'valerenga-no-aarsregnskap-valerenga-fotball-as-2025', clubId:'valerenga-no',
    title:'Vålerenga Fotball AS — aarsregnskap-valerenga-fotball-as-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['valerenga-no'] = null;
