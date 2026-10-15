const midtjyllandDkRevenueLinesByYear = {
  2019: [
    { rawLabel:'Nettoomsætning', normalizedCategory:'lump_football_operations', amountNative:107.921, disclosureLevel:'aggregate' },
    { rawLabel:'Andre driftsindtægter (avance por venta de derechos federativos)', normalizedCategory:'player_sales', amountNative:161.960, disclosureLevel:'detailed' },
  ],
};

const midtjyllandDkExpenseLinesByYear = {
  2019: [
    { rawLabel:'Andre eksterne omkostninger', normalizedCategory:'other_expenses', amountNative:-73.974, disclosureLevel:'aggregate' },
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-93.592, disclosureLevel:'detailed' },
    { rawLabel:'Afskrivninger af immaterielle anlægsaktiver', normalizedCategory:'player_amortisation', amountNative:-29.319, disclosureLevel:'detailed' },
    { rawLabel:'Afskrivninger af materielle anlægsaktiver', normalizedCategory:'depreciation', amountNative:-3.291, disclosureLevel:'detailed' },
    { rawLabel:'Andre driftsomkostninger', normalizedCategory:'other_expenses', amountNative:-3.244, disclosureLevel:'aggregate' },
  ],
};

const midtjyllandDkFiscalYearMeta = {
  2019: {
    currency:'DKK', fxRef:'DKK@2019-06-30',
    sourceId:'midtjylland-dk-aarsrapport-2019',
    reportType:'official_balance_sheet',
    gestionId:'benham',
    grossDebt:null, cash:null,
    profitOnPlayerSales:0, assetSales:0, netInterest:-0.043, tax:-10.649,
    officialTotalRevenue:269.881, officialTotalExpenses:203.420, officialPAT:55.769,
  },
};

const midtjyllandDkPresupuestoOverlayByYear = {};
const midtjyllandDkPasesData = [];
const midtjyllandDkResultadosData = {};
const midtjyllandDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['midtjylland-dk'] = {
  revenueLinesByYear: midtjyllandDkRevenueLinesByYear, expenseLinesByYear: midtjyllandDkExpenseLinesByYear,
  fiscalYearMeta: midtjyllandDkFiscalYearMeta, pasesData: midtjyllandDkPasesData,
  resultadosData: midtjyllandDkResultadosData, titulosData: midtjyllandDkTitulosData,
  presupuestoOverlayByYear: midtjyllandDkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'midtjylland-dk-aarsrapport-2019': {
    id:'midtjylland-dk-aarsrapport-2019', clubId:'midtjylland-dk',
    title:'Årsrapport FC Midtjylland A/S, 1. juli 2018 - 30. juni 2019',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['midtjylland-dk'] = {
  benham: { nombre:'Matthew Benham', firstYear:2019, lastYear:2019 },
};

memberCountByClub['midtjylland-dk'] = null;
