const nordsjaellanddkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)', normalizedCategory:'lump_football_operations', amountNative:366.004057, disclosureLevel:'aggregated' },
  ],
};

const nordsjaellanddkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Personaleomkostninger (Staff costs)', normalizedCategory:'wages_squad', amountNative:-175.027070, disclosureLevel:'detailed' },
    { rawLabel:'Transferrettigheder — årets afskrivninger (amortisation for the year, transfer rights)', normalizedCategory:'player_amortisation', amountNative:-32.965556, disclosureLevel:'detailed' },
    { rawLabel:'Andre anlæg, driftsmateriel og inventar — årets afskrivninger (depreciation for the year, PP&E)', normalizedCategory:'depreciation', amountNative:-10.684047, disclosureLevel:'detailed' },
    { rawLabel:'Residuo no explicado entre las Notas 5+6 y el total impreso de "Depreciation, amortisation and impairment" (-45.144.140)', normalizedCategory:'other_amortisation', amountNative:-1.494537, disclosureLevel:'aggregated' },
  ],
};

const nordsjaellanddkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'nordsjaelland-dk-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    netInterest:-2.576407,
    tax:-31.778343,
    grossDebt:20.625000, cash:16.943338,
    officialTotalRevenue:366.004057, officialTotalExpenses:220.171210, officialPAT:111.478097,
  },
};

const nordsjaellanddkPresupuestoOverlayByYear = {};

const nordsjaellanddkPasesData = [];
const nordsjaellanddkResultadosData = {};
const nordsjaellanddkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['nordsjaelland-dk'] = {
  revenueLinesByYear: nordsjaellanddkRevenueLinesByYear, expenseLinesByYear: nordsjaellanddkExpenseLinesByYear,
  fiscalYearMeta: nordsjaellanddkFiscalYearMeta, pasesData: nordsjaellanddkPasesData,
  resultadosData: nordsjaellanddkResultadosData, titulosData: nordsjaellanddkTitulosData,
  presupuestoOverlayByYear: nordsjaellanddkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'nordsjaelland-dk-aarsrapport-2024': {
    id:'nordsjaelland-dk-aarsrapport-2024', clubId:'nordsjaelland-dk',
    title:'FC Nordsjælland A/S — Årsrapport 2024 / Annual report 2024 (01.01.2024 - 31.12.2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['nordsjaelland-dk'] = null;
