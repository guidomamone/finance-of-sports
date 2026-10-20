const liersekempenzonenbeRevenueLinesByYear = {
  2018: [
    { rawLabel:'Brutomarge (+)/(-)', normalizedCategory:'lump_football_operations', amountNative:0.367044, disclosureLevel:'aggregated' },
    { rawLabel:'Uitzonderlijke opbrengsten', normalizedCategory:'other_income', amountNative:0.05, disclosureLevel:'aggregated' },
  ],
};
const liersekempenzonenbeExpenseLinesByYear = {
  2018: [
    { rawLabel:'Bezoldigingen en rechtstreekse sociale voordelen', normalizedCategory:'wages_squad', amountNative:-0.368819, disclosureLevel:'aggregated' },
    { rawLabel:'Werkgeversbijdragen voor sociale verzekeringen', normalizedCategory:'wages_squad', amountNative:-0.040562, disclosureLevel:'aggregated' },
    { rawLabel:'Andere personeelskosten', normalizedCategory:'wages_squad', amountNative:-0.03074, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.087351, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.016167, disclosureLevel:'aggregated' },
    { rawLabel:'Uitzonderlijke kosten', normalizedCategory:'exceptional_items', amountNative:-0.005559, disclosureLevel:'aggregated' },
  ],
};
const liersekempenzonenbeFiscalYearMeta = {
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'liersekempenzonen-be-jaarrekening-2018-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.000437, tax:0,
    extraRows: [
      {label:'Financiële opbrengsten', value:0.000275},
      {label:'Financiële kosten', value:0.000162},
    ],
    sinDesglose: [
      {renglon:'Brutomarge (+)/(-)', lado:'revenue', importe:0.367044, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.417044, officialTotalExpenses:0.549198, officialPAT:-0.140014,
  },
};
const liersekempenzonenbePresupuestoOverlayByYear = {};

const liersekempenzonenbePasesData = [];
const liersekempenzonenbeResultadosData = {};
const liersekempenzonenbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['liersekempenzonen-be'] = {
  revenueLinesByYear: liersekempenzonenbeRevenueLinesByYear, expenseLinesByYear: liersekempenzonenbeExpenseLinesByYear,
  fiscalYearMeta: liersekempenzonenbeFiscalYearMeta, pasesData: liersekempenzonenbePasesData,
  resultadosData: liersekempenzonenbeResultadosData, titulosData: liersekempenzonenbeTitulosData,
  presupuestoOverlayByYear: liersekempenzonenbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'liersekempenzonen-be-jaarrekening-2018-06-30-individual': {
    id:'liersekempenzonen-be-jaarrekening-2018-06-30-individual', clubId:'liersekempenzonen-be',
    title:'Lierse Kempenzonen VZW — jaarrekening-2018-06-30-individual (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['liersekempenzonen-be'] = null;
