const ohleuvenbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:34.487424, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:7.637273, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.192091, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:1.536938, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:1.263823, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.001179, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:6.418595, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:4.163893, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.816864, disclosureLevel:'aggregated' },
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
  2019: [
    { rawLabel:'Aankopen', normalizedCategory:'other_expenses', amountNative:-0.144926, disclosureLevel:'aggregated' },
    { rawLabel:'Voorraad: afname (toename) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.013825, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-3.422019, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen (+)/(-)', normalizedCategory:'wages_squad', amountNative:-5.341597, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'player_amortisation', amountNative:-1.375507, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.027639, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.115146, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.038126, disclosureLevel:'aggregated' },
  ],
  2021: [
    { rawLabel:'Aankopen', normalizedCategory:'other_expenses', amountNative:-0.141318, disclosureLevel:'aggregated' },
    { rawLabel:'Voorraad: afname (toename) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.014214, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-8.407269, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen (+)/(-)', normalizedCategory:'wages_squad', amountNative:-15.530659, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'player_amortisation', amountNative:-3.872247, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.000224, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.239968, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.073868, disclosureLevel:'aggregated' },
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
  2019: {
    currency:'EUR', fxRef:'EUR@2019-06-30',
    sourceId:'ohleuven-be-jaarrekening-2019-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.182588, tax:-0.000638,
    extraRows: [
      {label:'Andere financiële opbrengsten', value:0.000755},
      {label:'Kosten van schulden', value:-0.14675},
      {label:'Andere financiële kosten', value:-0.036593},
      {label:'Belastingen', value:-0.000638},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:1.536938, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:2.80194, officialTotalExpenses:10.440659, officialPAT:-7.86007,
  },
  2021: {
    currency:'EUR', fxRef:'EUR@2021-06-30',
    sourceId:'ohleuven-be-jaarrekening-2021-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.181103, tax:0,
    extraRows: [
      {label:'Andere financiële opbrengsten', value:0.001861},
      {label:'Kosten van schulden', value:-0.177635},
      {label:'Andere financiële kosten', value:-0.005329},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:6.418595, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:11.399352, officialTotalExpenses:28.205899, officialPAT:-17.061519,
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
  'ohleuven-be-jaarrekening-2019-06-30-individual': {
    id:'ohleuven-be-jaarrekening-2019-06-30-individual', clubId:'ohleuven-be',
    title:'OH Leuven CV — jaarrekening-2019-06-30-individual (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    publicNote:'Ejercicio de transición por cambio de fecha de cierre: del 01/01/2019 al 30/06/2019 (6 meses).',
  },
  'ohleuven-be-jaarrekening-2021-06-30-individual': {
    id:'ohleuven-be-jaarrekening-2021-06-30-individual', clubId:'ohleuven-be',
    title:'OH Leuven CV — jaarrekening-2021-06-30-individual (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['ohleuven-be'] = null;
