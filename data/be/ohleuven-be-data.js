const ohleuvenbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:34.487424, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:7.637273, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.192091, disclosureLevel:'aggregated' },
  ],
};
const ohleuvenbeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankopen', normalizedCategory:'other_expenses', amountNative:-1.52052, disclosureLevel:'aggregated' },
    { rawLabel:'Voorraad: afname (toename)', normalizedCategory:'other_expenses', amountNative:-0.006668, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-13.036915, disclosureLevel:'aggregated' },
    { rawLabel:'620', normalizedCategory:'wages_squad', amountNative:-22.959673, disclosureLevel:'aggregated' },
    { rawLabel:'621', normalizedCategory:'wages_squad', amountNative:-2.928919, disclosureLevel:'aggregated' },
    { rawLabel:'623', normalizedCategory:'wages_squad', amountNative:-0.76072, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen)', normalizedCategory:'other_expenses', amountNative:0.004378, disclosureLevel:'aggregated' },
    { rawLabel:'Voorzieningen voor risico\'s en kosten: toevoegingen (bestedingen en terugnemingen)', normalizedCategory:'exceptional_items', amountNative:0.316581, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.716869, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-1.141007, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen immateriële vaste activa (spelers)', normalizedCategory:'player_amortisation', amountNative:-4.196505, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.760631, disclosureLevel:'aggregated' },
  ],
};
const ohleuvenbeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'ohleuven-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.936107, tax:-0.207954,
    extraRows: [
      {label:'Andere financiële opbrengsten', value:0.066728},
      {label:'Kosten van schulden', value:-1.00085},
      {label:'Andere financiële kosten', value:-0.001985},
      {label:'Belastingen', value:-0.207954},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:34.487424, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:42.316788, officialTotalExpenses:46.883042, officialPAT:-6.53474,
  },
};
const ohleuvenbePresupuestoOverlayByYear = {};

const ohleuvenbePasesData = [];
const ohleuvenbeResultadosData = {};
const ohleuvenbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['ohleuven-be'] = {
  revenueLinesByYear: ohleuvenbeRevenueLinesByYear, expenseLinesByYear: ohleuvenbeExpenseLinesByYear,
  fiscalYearMeta: ohleuvenbeFiscalYearMeta, pasesData: ohleuvenbePasesData,
  resultadosData: ohleuvenbeResultadosData, titulosData: ohleuvenbeTitulosData,
  presupuestoOverlayByYear: ohleuvenbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'ohleuven-be-jaarrekening-2025-06-30-individual': {
    id:'ohleuven-be-jaarrekening-2025-06-30-individual', clubId:'ohleuven-be',
    title:'OH Leuven CV — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['ohleuven-be'] = null;
