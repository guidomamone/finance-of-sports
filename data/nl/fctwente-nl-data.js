const fctwentenlRevenueLinesByYear = {
  2025: [
    { rawLabel:'Wedstrijdbaten', normalizedCategory:'matchday_competition', amountNative:10.592, disclosureLevel:'aggregated' },
    { rawLabel:'Bijdragen in giften en geld', normalizedCategory:'other_income', amountNative:30.21, disclosureLevel:'aggregated' },
    { rawLabel:'Televisiebaten', normalizedCategory:'broadcasting', amountNative:7.941, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:0.382, disclosureLevel:'aggregated' },
    { rawLabel:'Catering', normalizedCategory:'stadium_other', amountNative:11.451, disclosureLevel:'aggregated' },
    { rawLabel:'Overige baten', normalizedCategory:'other_income', amountNative:1.114, disclosureLevel:'aggregated' },
    { rawLabel:'Resultaat vergoedingssommen', normalizedCategory:'player_sales', amountNative:16.469, disclosureLevel:'aggregated' },
  ],
};
const fctwentenlExpenseLinesByYear = {
  2025: [
    { rawLabel:'Inkoopwaarde van de omzet', normalizedCategory:'other_expenses', amountNative:-5.413, disclosureLevel:'aggregated' },
    { rawLabel:'Lonen en salarissen', normalizedCategory:'wages_squad', amountNative:-19.504, disclosureLevel:'aggregated' },
    { rawLabel:'Sociale lasten', normalizedCategory:'wages_squad', amountNative:-1.548, disclosureLevel:'aggregated' },
    { rawLabel:'Pensioenpremies', normalizedCategory:'wages_squad', amountNative:-0.224, disclosureLevel:'aggregated' },
    { rawLabel:'Autokosten', normalizedCategory:'admin_general_expense', amountNative:-0.875, disclosureLevel:'aggregated' },
    { rawLabel:'Inhuur personeel', normalizedCategory:'wages_squad', amountNative:-0.993, disclosureLevel:'aggregated' },
    { rawLabel:'Overige personeelskosten', normalizedCategory:'admin_general_expense', amountNative:-1.07, disclosureLevel:'aggregated' },
    { rawLabel:'Wedstrijd- en trainingskosten', normalizedCategory:'match_organisation_expense', amountNative:-6.307, disclosureLevel:'aggregated' },
    { rawLabel:'Verkoopkosten', normalizedCategory:'admin_general_expense', amountNative:-2.831, disclosureLevel:'aggregated' },
    { rawLabel:'Huisvestingskosten', normalizedCategory:'admin_general_expense', amountNative:-6.06, disclosureLevel:'aggregated' },
    { rawLabel:'Algemene kosten', normalizedCategory:'admin_general_expense', amountNative:-3.98, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen (im)materiële vaste activa', normalizedCategory:'depreciation', amountNative:-3.332, disclosureLevel:'aggregated' },
    { rawLabel:'Vergoedingssommen', normalizedCategory:'player_amortisation', amountNative:-4.695, disclosureLevel:'aggregated' },
    { rawLabel:'Hand- en tekengelden', normalizedCategory:'player_amortisation', amountNative:-0.37, disclosureLevel:'aggregated' },
    { rawLabel:'Kosten intermediairs', normalizedCategory:'player_amortisation', amountNative:-0.878, disclosureLevel:'aggregated' },
  ],
};
const fctwentenlFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'fctwente-nl-jaarrekening-2024-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.151, tax:-5.149,
    extraRows: [
      {label:'Financiële baten en lasten', value:-0.151},
      {label:'Belastingen resultaat uit gewone bedrijfsuitoefening', value:-5.149},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:78.159, officialTotalExpenses:58.08, officialPAT:14.779,
  },
};
const fctwentenlPresupuestoOverlayByYear = {};

const fctwentenlPasesData = [];
const fctwentenlResultadosData = {};
const fctwentenlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fctwente-nl'] = {
  revenueLinesByYear: fctwentenlRevenueLinesByYear, expenseLinesByYear: fctwentenlExpenseLinesByYear,
  fiscalYearMeta: fctwentenlFiscalYearMeta, pasesData: fctwentenlPasesData,
  resultadosData: fctwentenlResultadosData, titulosData: fctwentenlTitulosData,
  presupuestoOverlayByYear: fctwentenlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fctwente-nl-jaarrekening-2024-2025': {
    id:'fctwente-nl-jaarrekening-2024-2025', clubId:'fctwente-nl',
    title:'FC Twente ‘65 B.V. — FC-Twente-Jaarrekening-2024-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['fctwente-nl'] = null;
