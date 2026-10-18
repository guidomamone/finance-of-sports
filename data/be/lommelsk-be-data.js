const lommelskbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:3.689259, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:3.872782, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:2.003764, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Brutomarge (+)/(-)', normalizedCategory:'lump_football_operations', amountNative:0.891255, disclosureLevel:'aggregated' },
  ],
};
const lommelskbeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankopen', normalizedCategory:'other_expenses', amountNative:-0.205706, disclosureLevel:'aggregated' },
    { rawLabel:'Voorraad: afname (toename) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.000086, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-5.599006, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen en rechtstreekse sociale voordelen', normalizedCategory:'wages_squad', amountNative:-13.80824, disclosureLevel:'aggregated' },
    { rawLabel:'Werkgeversbijdragen voor sociale verzekeringen', normalizedCategory:'wages_squad', amountNative:-1.953435, disclosureLevel:'aggregated' },
    { rawLabel:'Andere personeelskosten', normalizedCategory:'wages_squad', amountNative:-1.10555, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.012546, disclosureLevel:'aggregated' },
    { rawLabel:'Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.00491, disclosureLevel:'aggregated' },
    { rawLabel:'Andere', normalizedCategory:'other_expenses', amountNative:-0.641219, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen immateriële vaste activa (spelers)', normalizedCategory:'player_amortisation', amountNative:-5.674313, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.590106, disclosureLevel:'aggregated' },
    { rawLabel:'Minderwaarden bij de realisatie van immateriële vaste activa (spelers)', normalizedCategory:'player_impairment', amountNative:-0.573455, disclosureLevel:'aggregated' },
    { rawLabel:'Andere niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.1757, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen (+)/(-)', normalizedCategory:'wages_squad', amountNative:-0.990199, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'player_amortisation', amountNative:-0.519, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.002679, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.00732, disclosureLevel:'aggregated' },
  ],
};
const lommelskbeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'lommelsk-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.071835, tax:-0.022238,
    extraRows: [
      {label:'Andere financiële opbrengsten', value:0.026045},
      {label:'Kosten van schulden', value:-0.007455},
      {label:'Andere financiële kosten', value:-0.090425},
      {label:'Belastingen', value:-0.022238},
      {label:'Regularisering van belastingen en terugneming van voorzieningen voor belastingen', value:0},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:3.689259, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:9.565805, officialTotalExpenses:30.168572, officialPAT:-20.872368,
  },
  2018: {
    currency:'EUR', fxRef:'EUR@2018-06-30',
    sourceId:'lommelsk-be-jaarrekening-2018-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0, tax:0,
    sinDesglose: [
      {renglon:'Brutomarge (+)/(-)', lado:'revenue', importe:0.891255, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:0.891255, officialTotalExpenses:1.519198, officialPAT:-0.628125,
  },
};
const lommelskbePresupuestoOverlayByYear = {};

const lommelskbePasesData = [];
const lommelskbeResultadosData = {};
const lommelskbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['lommelsk-be'] = {
  revenueLinesByYear: lommelskbeRevenueLinesByYear, expenseLinesByYear: lommelskbeExpenseLinesByYear,
  fiscalYearMeta: lommelskbeFiscalYearMeta, pasesData: lommelskbePasesData,
  resultadosData: lommelskbeResultadosData, titulosData: lommelskbeTitulosData,
  presupuestoOverlayByYear: lommelskbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'lommelsk-be-jaarrekening-2025-06-30-individual': {
    id:'lommelsk-be-jaarrekening-2025-06-30-individual', clubId:'lommelsk-be',
    title:'Voetbalclub Lommel SK NV — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'lommelsk-be-jaarrekening-2018-06-30-individual': {
    id:'lommelsk-be-jaarrekening-2018-06-30-individual', clubId:'lommelsk-be',
    title:'Voetbalclub Lommel SK NV — jaarrekening-2018-06-30-individual (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['lommelsk-be'] = null;
