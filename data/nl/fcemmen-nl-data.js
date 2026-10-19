const fcemmennlRevenueLinesByYear = {
  2019: [
    { rawLabel:'Wedstrijdbaten', normalizedCategory:'matchday_competition', amountNative:1.193, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:3.475, disclosureLevel:'aggregated' },
    { rawLabel:'Media gerelateerde baten', normalizedCategory:'broadcasting', amountNative:1.768, disclosureLevel:'aggregated' },
    { rawLabel:'Prijzengeld', normalizedCategory:'competition_bonus', amountNative:0.325, disclosureLevel:'aggregated' },
    { rawLabel:'Horeca', normalizedCategory:'stadium_other', amountNative:0.579, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandise', normalizedCategory:'sponsorship_commercial', amountNative:0.114, disclosureLevel:'aggregated' },
    { rawLabel:'Subsidies & giften', normalizedCategory:'other_income', amountNative:0.056, disclosureLevel:'aggregated' },
    { rawLabel:'Overige baten', normalizedCategory:'other_income', amountNative:0.133, disclosureLevel:'aggregated' },
  ],
};
const fcemmennlExpenseLinesByYear = {
  2019: [
    { rawLabel:'Personeelskosten', normalizedCategory:'wages_squad', amountNative:-3.915, disclosureLevel:'aggregated' },
    { rawLabel:'Horeca', normalizedCategory:'other_expenses', amountNative:-0.43, disclosureLevel:'aggregated' },
    { rawLabel:'Verkoopkosten', normalizedCategory:'admin_general_expense', amountNative:-0.481, disclosureLevel:'aggregated' },
    { rawLabel:'Huisvestingskosten', normalizedCategory:'admin_general_expense', amountNative:-0.527, disclosureLevel:'aggregated' },
    { rawLabel:'Wedstrijd- en trainingskosten', normalizedCategory:'match_organisation_expense', amountNative:-0.67, disclosureLevel:'aggregated' },
    { rawLabel:'Algemene kosten', normalizedCategory:'admin_general_expense', amountNative:-0.304, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingskosten imm. & mat. vaste activa', normalizedCategory:'depreciation', amountNative:-0.203, disclosureLevel:'aggregated' },
    { rawLabel:'Som der afschr. bijz. waardevermindering en resultaat vergoedingsommen', normalizedCategory:'player_amortisation', amountNative:-0.062, disclosureLevel:'aggregated' },
  ],
};
const fcemmennlFiscalYearMeta = {
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'fcemmen-nl-f-04-fce-jaarverslag-2018-2019-incl-jaarcijfers-def',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.006, tax:-0.215,
    extraRows: [
      {label:'Som der rentebaten en rentelasten', value:-0.006},
      {label:'Som der belastingen resultaat uit gewone bedrijsvoering', value:-0.215},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:7.643, officialTotalExpenses:6.592, officialPAT:0.831,
  },
};
const fcemmennlPresupuestoOverlayByYear = {};

const fcemmennlPasesData = [];
const fcemmennlResultadosData = {};
const fcemmennlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fcemmen-nl'] = {
  revenueLinesByYear: fcemmennlRevenueLinesByYear, expenseLinesByYear: fcemmennlExpenseLinesByYear,
  fiscalYearMeta: fcemmennlFiscalYearMeta, pasesData: fcemmennlPasesData,
  resultadosData: fcemmennlResultadosData, titulosData: fcemmennlTitulosData,
  presupuestoOverlayByYear: fcemmennlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fcemmen-nl-f-04-fce-jaarverslag-2018-2019-incl-jaarcijfers-def': {
    id:'fcemmen-nl-f-04-fce-jaarverslag-2018-2019-incl-jaarcijfers-def', clubId:'fcemmen-nl',
    title:'FC Emmen B.V. — F.04-FCE-Jaarverslag-2018-2019-incl.-Jaarcijfers-DEF (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['fcemmen-nl'] = null;
