const patroeisdenbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Brutomarge (+)/(-)', normalizedCategory:'lump_football_operations', amountNative:1.841008, disclosureLevel:'aggregated' },
    { rawLabel:'Waarvan: niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.00181, disclosureLevel:'aggregated' },
  ],
};
const patroeisdenbeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen (+)/(-)', normalizedCategory:'wages_squad', amountNative:-6.166674, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.002006, disclosureLevel:'aggregated' },
    { rawLabel:'Voorzieningen voor risico\'s en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-)', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.092926, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.0435, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen immateriële vaste activa (spelers)', normalizedCategory:'player_amortisation', amountNative:-0.092871, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.159525, disclosureLevel:'aggregated' },
  ],
};
const patroeisdenbeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'patroeisden-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:10.685877, tax:-0.027259,
    extraRows: [
      {label:'Recurrente financiële opbrengsten', value:0.128946},
      {label:'Niet-recurrente financiële opbrengsten', value:10.85},
      {label:'Recurrente financiële kosten', value:-0.293069},
      {label:'Belastingen op het resultaat (+)/(-)', value:-0.027259},
    ],
    sinDesglose: [
      {renglon:'Brutomarge (+)/(-)', lado:'revenue', importe:1.841008, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:0.011997,
    officialTotalRevenue:1.842818, officialTotalExpenses:6.514002, officialPAT:5.946137,
  },
};
const patroeisdenbePresupuestoOverlayByYear = {};

const patroeisdenbePasesData = [];
const patroeisdenbeResultadosData = {};
const patroeisdenbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['patroeisden-be'] = {
  revenueLinesByYear: patroeisdenbeRevenueLinesByYear, expenseLinesByYear: patroeisdenbeExpenseLinesByYear,
  fiscalYearMeta: patroeisdenbeFiscalYearMeta, pasesData: patroeisdenbePasesData,
  resultadosData: patroeisdenbeResultadosData, titulosData: patroeisdenbeTitulosData,
  presupuestoOverlayByYear: patroeisdenbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'patroeisden-be-jaarrekening-2025-06-30-individual': {
    id:'patroeisden-be-jaarrekening-2025-06-30-individual', clubId:'patroeisden-be',
    title:'Patro Eisden Maasmechelen VZW — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['patroeisden-be'] = null;
