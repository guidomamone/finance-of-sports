const lokerentemsebeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Waarvan: niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.844978, disclosureLevel:'aggregated' },
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:0.282823, disclosureLevel:'aggregated' },
    { rawLabel:'Overige bedrijfsopbrengsten (implícito en la Brutomarge)', normalizedCategory:'other_income', amountNative:0.050197, disclosureLevel:'aggregated' },
  ],
};
const lokerentemsebeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-0.298662, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen (+)/(-)', normalizedCategory:'wages_squad', amountNative:-0.036731, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'depreciation', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', normalizedCategory:'other_expenses', amountNative:-0.003377, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.00313, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const lokerentemsebeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'lokerentemse-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.011136, tax:0,
    extraRows: [
      {label:'Recurrente financiële opbrengsten', value:0.00012},
      {label:'Niet-recurrente financiële opbrengsten', value:0},
      {label:'Recurrente financiële kosten', value:-0.011142},
      {label:'Niet-recurrente financiële kosten', value:-0.000114},
      {label:'Belastingen op het resultaat (+)/(-)', value:0},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:0.282823, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.177998, officialTotalExpenses:0.3419, officialPAT:0.824961,
  },
};
const lokerentemsebePresupuestoOverlayByYear = {};

const lokerentemsebePasesData = [];
const lokerentemsebeResultadosData = {};
const lokerentemsebeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['lokerentemse-be'] = {
  revenueLinesByYear: lokerentemsebeRevenueLinesByYear, expenseLinesByYear: lokerentemsebeExpenseLinesByYear,
  fiscalYearMeta: lokerentemsebeFiscalYearMeta, pasesData: lokerentemsebePasesData,
  resultadosData: lokerentemsebeResultadosData, titulosData: lokerentemsebeTitulosData,
  presupuestoOverlayByYear: lokerentemsebePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'lokerentemse-be-jaarrekening-2025-06-30-individual': {
    id:'lokerentemse-be-jaarrekening-2025-06-30-individual', clubId:'lokerentemse-be',
    title:'Koninklijke Sporting Club Lokeren - Temse VZW — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['lokerentemse-be'] = null;
