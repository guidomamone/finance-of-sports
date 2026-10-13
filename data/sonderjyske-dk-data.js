const sonderjyskeDkRevenueLinesByYear = {
  2022: [
    { rawLabel:'Kompensation for aflyste arrangementer og lønomkostninger, COVID-19 (Note "Særlige poster")', normalizedCategory:'other_income', amountNative:16.311422, disclosureLevel:'detailed' },
    { rawLabel:'Bruttofortjeneste, resto (nettoomsætning, vareforbrug, andre driftsindtægter og eksterne omkostninger sammendraget, § 32 ÅRL — NO es revenue bruto)', normalizedCategory:'lump_football_operations', amountNative:5.153565, disclosureLevel:'aggregated' },
  ],
};

const sonderjyskeDkExpenseLinesByYear = {
  2022: [
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-50.298641, disclosureLevel:'detailed', items:[
      ['Lønninger', -45.442396], ['Pensioner', -1.453435], ['Andre omkostninger til social sikring', -0.607087], ['Andre personaleomkostninger', -2.795723],
    ]},
    { rawLabel:'Årets afskrivninger — Kontraktrettigheder (immaterielle anlægsaktiver)', normalizedCategory:'player_amortisation', amountNative:-2.229341, disclosureLevel:'detailed' },
    { rawLabel:'Årets afskrivninger — materielle anlægsaktiver', normalizedCategory:'depreciation', amountNative:-0.397022, disclosureLevel:'detailed', items:[
      ['Andre anlæg, driftsmateriel og inventar', -0.297495], ['Indretning af lejede lokaler', -0.099527],
    ]},
  ],
};

const sonderjyskeDkFiscalYearMeta = {
  2022: {
    currency:'DKK',
    fxRef:'DKK@2022-06-30',
    sourceId:'sonderjyske-dk-aarsrapport-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.522751,
    tax:0,
    grossDebt:14.080333, cash:0.014547,
    officialTotalRevenue:21.464987, officialTotalExpenses:52.925004, officialPAT:-31.982769,
  },
};

const sonderjyskeDkPresupuestoOverlayByYear = {};

const sonderjyskeDkPasesData = [];
const sonderjyskeDkResultadosData = {};
const sonderjyskeDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sonderjyske-dk'] = {
  revenueLinesByYear: sonderjyskeDkRevenueLinesByYear, expenseLinesByYear: sonderjyskeDkExpenseLinesByYear,
  fiscalYearMeta: sonderjyskeDkFiscalYearMeta, pasesData: sonderjyskeDkPasesData,
  resultadosData: sonderjyskeDkResultadosData, titulosData: sonderjyskeDkTitulosData,
  presupuestoOverlayByYear: sonderjyskeDkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sonderjyske-dk-aarsrapport-2022': {
    id:'sonderjyske-dk-aarsrapport-2022', clubId:'sonderjyske-dk',
    title:'Sønderjyske Fodbold A/S — Årsrapport 2021/22 (01.07.2021 - 30.06.2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['sonderjyske-dk'] = null;
