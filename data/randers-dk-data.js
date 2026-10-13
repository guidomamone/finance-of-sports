const randersdkRevenueLinesByYear = {
  2023: [
    { rawLabel:'Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)', normalizedCategory:'lump_football_operations', amountNative:61.744974, disclosureLevel:'aggregated' },
  ],
};

const randersdkExpenseLinesByYear = {
  2023: [
    { rawLabel:'Løn- og personaleomkostninger (Løn og gager + Pensioner + Andre omkostninger til social sikring)', normalizedCategory:'wages_squad', amountNative:-54.229295, disclosureLevel:'detailed', items:[
      ['Løn og gager', -47.872434], ['Pensioner', -4.269825], ['Andre omkostninger til social sikring', -2.087037],
    ]},
    { rawLabel:'Kontraktrettigheder mv. — årets af- og nedskrivninger (amortisation for the year, player registrations)', normalizedCategory:'player_amortisation', amountNative:-6.877926, disclosureLevel:'detailed' },
    { rawLabel:'Indretning af lejede lokaler + Andre anlæg, driftsmateriel og inventar — årets af- og nedskrivninger', normalizedCategory:'depreciation', amountNative:-1.066125, disclosureLevel:'detailed', items:[
      ['Indretning af lejede lokaler', -0.479431], ['Andre anlæg, driftsmateriel og inventar', -0.586694],
    ]},
  ],
};

const randersdkFiscalYearMeta = {
  2023: {
    currency:'DKK', fxRef:'DKK@2023-06-30',
    sourceId:'randers-dk-aarsrapport-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    netInterest:2.568178,
    tax:0.054931,
    grossDebt:2.062693, cash:11.464548,
    officialTotalRevenue:61.744974, officialTotalExpenses:62.173346, officialPAT:2.194737,
  },
};

const randersdkPresupuestoOverlayByYear = {};

const randersdkPasesData = [];
const randersdkResultadosData = {};
const randersdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['randers-dk'] = {
  revenueLinesByYear: randersdkRevenueLinesByYear, expenseLinesByYear: randersdkExpenseLinesByYear,
  fiscalYearMeta: randersdkFiscalYearMeta, pasesData: randersdkPasesData,
  resultadosData: randersdkResultadosData, titulosData: randersdkTitulosData,
  presupuestoOverlayByYear: randersdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'randers-dk-aarsrapport-2022-23': {
    id:'randers-dk-aarsrapport-2022-23', clubId:'randers-dk',
    title:'Randers FC A/S — Årsrapport 1. juli 2022 - 30. juni 2023',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['randers-dk'] = null;
