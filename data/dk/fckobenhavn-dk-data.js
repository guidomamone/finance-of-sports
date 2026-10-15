const fckobenhavndkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Entréindtægter', normalizedCategory:'matchday_competition', amountNative:85.544, disclosureLevel:'detailed' },
    { rawLabel:'TV- og præmie-indtægter (TV y premios por competencia, combinados por la fuente)', normalizedCategory:'broadcasting', amountNative:110.836, disclosureLevel:'detailed' },
    { rawLabel:'Samarbejdspartnere', normalizedCategory:'sponsorship_commercial', amountNative:127.594, disclosureLevel:'detailed' },
    { rawLabel:'Merchandiseindtægter', normalizedCategory:'sponsorship_commercial', amountNative:57.327, disclosureLevel:'detailed' },
    { rawLabel:'Food & Beverage, konferencecenter m.v.', normalizedCategory:'stadium_other', amountNative:30.869, disclosureLevel:'detailed' },
    { rawLabel:'Ejendomsudlejning', normalizedCategory:'other_income', amountNative:32.190, disclosureLevel:'detailed' },
    { rawLabel:'Øvrige indtægter', normalizedCategory:'other_income', amountNative:22.199, disclosureLevel:'detailed' },
    { rawLabel:'Andre driftsindtægter (fortjeneste ved afhændelse af kontraktrettigheder — venta de Orri Oskarsson y Elias Jelert)', normalizedCategory:'player_sales', amountNative:287.954, disclosureLevel:'detailed' },
  ],
};

const fckobenhavndkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Vareforbrug', normalizedCategory:'other_expenses', amountNative:-106.193, disclosureLevel:'detailed' },
    { rawLabel:'Andre eksterne omkostninger (distribution, salg, reklame, administration, lokaler, tab på debitorer, leasing)', normalizedCategory:'admin_general_expense', amountNative:-181.906, disclosureLevel:'detailed' },
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-293.556, disclosureLevel:'detailed' },
    { rawLabel:'Amortiseringer af kontraktrettigheder', normalizedCategory:'player_amortisation', amountNative:-113.241, disclosureLevel:'detailed' },
    { rawLabel:'Nedskrivninger af kontraktrettigheder', normalizedCategory:'player_impairment', amountNative:-7.128, disclosureLevel:'detailed' },
    { rawLabel:'Afskrivning på materielle anlægsaktiver (bygninger, indretning af lejede lokaler, produktionsanlæg og maskiner)', normalizedCategory:'depreciation', amountNative:-16.873, disclosureLevel:'detailed', items:[
      ['Afskrivning på bygninger', 4.683], ['Afskrivning på indretning af lejede lokaler', 2.409], ['Afskrivning på produktionsanlæg og maskiner', 9.781],
    ]},
  ],
};

const fckobenhavndkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'fckobenhavn-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:10.620,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:754.513, officialTotalExpenses:718.897, officialPAT:46.236,
  },
};

const fckobenhavndkPresupuestoOverlayByYear = {};

const fckobenhavndkPasesData = [];
const fckobenhavndkResultadosData = {};
const fckobenhavndkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fckobenhavn-dk'] = {
  revenueLinesByYear: fckobenhavndkRevenueLinesByYear, expenseLinesByYear: fckobenhavndkExpenseLinesByYear,
  fiscalYearMeta: fckobenhavndkFiscalYearMeta, pasesData: fckobenhavndkPasesData,
  resultadosData: fckobenhavndkResultadosData, titulosData: fckobenhavndkTitulosData,
  presupuestoOverlayByYear: fckobenhavndkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fckobenhavn-aarsrapport-2024': {
      id:'fckobenhavn-aarsrapport-2024', clubId:'fckobenhavn-dk',
      title:'F.C. København P/S — Årsrapport for 2024 (1. januar - 31. december 2024)',
      type:'official_balance_sheet', reliability:'primary',
    },
});

memberCountByClub['fckobenhavn-dk'] = null;
