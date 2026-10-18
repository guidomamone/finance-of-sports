const beerschotbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ticketing en abonnementen', normalizedCategory:'matchday_competition', amountNative:2.21594, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:2.778568, disclosureLevel:'aggregated' },
    { rawLabel:'TV rechten', normalizedCategory:'broadcasting', amountNative:2.506463, disclosureLevel:'aggregated' },
    { rawLabel:'Commercieel', normalizedCategory:'sponsorship_commercial', amountNative:2.903758, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:7.180163, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.00244, disclosureLevel:'aggregated' },
  ],
};
const beerschotbeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankopen', normalizedCategory:'other_expenses', amountNative:-0.925607, disclosureLevel:'aggregated' },
    { rawLabel:'Voorraad: afname (toename) (+)/(-)', normalizedCategory:'other_expenses', amountNative:0.021134, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-7.523193, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen en rechtstreekse sociale voordelen', normalizedCategory:'wages_squad', amountNative:-9.380292, disclosureLevel:'aggregated' },
    { rawLabel:'Werkgeversbijdragen voor sociale verzekeringen', normalizedCategory:'wages_squad', amountNative:-1.435486, disclosureLevel:'aggregated' },
    { rawLabel:'Andere personeelskosten', normalizedCategory:'wages_squad', amountNative:-0.238832, disclosureLevel:'aggregated' },
    { rawLabel:'Voorzieningen voor risico\'s en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-)', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.158064, disclosureLevel:'aggregated' },
    { rawLabel:'Andere', normalizedCategory:'other_expenses', amountNative:-0.428022, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.002623, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen immateriële vaste activa (spelers)', normalizedCategory:'player_amortisation', amountNative:-0.223703, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen goodwill', normalizedCategory:'other_amortisation', amountNative:-0.169559, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.498321, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', normalizedCategory:'other_expenses', amountNative:0.064834, disclosureLevel:'aggregated' },
  ],
};
const beerschotbeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'beerschot-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.223637, tax:-0.00958,
    extraRows: [
      {label:'Andere financiële opbrengsten', value:0.104225},
      {label:'Kosten van schulden', value:-0.006684},
      {label:'Andere financiële kosten', value:-0.321178},
      {label:'Belastingen', value:-0.035016},
      {label:'Regularisering van belastingen en terugneming van voorzieningen voor belastingen', value:0.025436},
    ],
    grossDebt:null, cash:0.20365,
    officialTotalRevenue:17.587332, officialTotalExpenses:20.897734, officialPAT:-3.543618,
  },
};
const beerschotbePresupuestoOverlayByYear = {};

const beerschotbePasesData = [];
const beerschotbeResultadosData = {};
const beerschotbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['beerschot-be'] = {
  revenueLinesByYear: beerschotbeRevenueLinesByYear, expenseLinesByYear: beerschotbeExpenseLinesByYear,
  fiscalYearMeta: beerschotbeFiscalYearMeta, pasesData: beerschotbePasesData,
  resultadosData: beerschotbeResultadosData, titulosData: beerschotbeTitulosData,
  presupuestoOverlayByYear: beerschotbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'beerschot-be-jaarrekening-2025-06-30-individual': {
    id:'beerschot-be-jaarrekening-2025-06-30-individual', clubId:'beerschot-be',
    title:'Beerschot — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['beerschot-be'] = null;
