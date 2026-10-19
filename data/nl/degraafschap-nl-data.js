const degraafschapnlRevenueLinesByYear = {
  2022: [
    { rawLabel:'Netto-omzet', normalizedCategory:'lump_football_operations', amountNative:8.272005, disclosureLevel:'aggregated' },
    { rawLabel:'Resultaat vergoedingssommen', normalizedCategory:'player_sales', amountNative:0.05146, disclosureLevel:'aggregated' },
  ],
};
const degraafschapnlExpenseLinesByYear = {
  2022: [
    { rawLabel:'Lonen en salarissen', normalizedCategory:'wages_squad', amountNative:-3.492133, disclosureLevel:'aggregated' },
    { rawLabel:'Sociale lasten', normalizedCategory:'wages_squad', amountNative:-0.610169, disclosureLevel:'aggregated' },
    { rawLabel:'Pensioenlasten', normalizedCategory:'wages_squad', amountNative:-0.084659, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.261379, disclosureLevel:'aggregated' },
    { rawLabel:'Overige bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-4.324265, disclosureLevel:'aggregated' },
  ],
};
const degraafschapnlFiscalYearMeta = {
  2022: {
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'degraafschap-nl-wf-src-betaald-voetbal-de-graafschap-b-v-publicatierapport-2021-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.035869, tax:0,
    extraRows: [
      {label:'Rentelasten en soortgelijke kosten', value:-0.035869},
      {label:'Belastingen', value:null},
    ],
    sinDesglose: [
      {renglon:'Netto-omzet', lado:'revenue', importe:8.272005, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:8.323465, officialTotalExpenses:8.772605, officialPAT:-0.485009,
  },
};
const degraafschapnlPresupuestoOverlayByYear = {};

const degraafschapnlPasesData = [];
const degraafschapnlResultadosData = {};
const degraafschapnlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['degraafschap-nl'] = {
  revenueLinesByYear: degraafschapnlRevenueLinesByYear, expenseLinesByYear: degraafschapnlExpenseLinesByYear,
  fiscalYearMeta: degraafschapnlFiscalYearMeta, pasesData: degraafschapnlPasesData,
  resultadosData: degraafschapnlResultadosData, titulosData: degraafschapnlTitulosData,
  presupuestoOverlayByYear: degraafschapnlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'degraafschap-nl-wf-src-betaald-voetbal-de-graafschap-b-v-publicatierapport-2021-2022': {
    id:'degraafschap-nl-wf-src-betaald-voetbal-de-graafschap-b-v-publicatierapport-2021-2022', clubId:'degraafschap-nl',
    title:'Betaald Voetbal De Graafschap B.V. — wf-src-Betaald-Voetbal-De-Graafschap-B.V.-Publicatierapport-2021-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['degraafschap-nl'] = null;
