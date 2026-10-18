const lierseskbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Brutomarge (+)/(-)', normalizedCategory:'lump_football_operations', amountNative:2.706155, disclosureLevel:'aggregated' },
  ],
};
const lierseskbeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen (+)/(-)', normalizedCategory:'wages_squad', amountNative:-3.139021, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-0.050448, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.023792, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen immateriële vaste activa (spelers)', normalizedCategory:'player_amortisation', amountNative:-0.24728, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.159809, disclosureLevel:'aggregated' },
  ],
};
const lierseskbeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'liersesk-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.033226, tax:-0.014803,
    extraRows: [
      {label:'Recurrente financiële opbrengsten', value:0.000698},
      {label:'Recurrente financiële kosten', value:-0.033924},
      {label:'Belastingen op het resultaat (+)/(-)', value:-0.014803},
    ],
    sinDesglose: [
      {renglon:'Brutomarge (+)/(-)', lado:'revenue', importe:2.706155, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:0.002984,
    officialTotalRevenue:2.706155, officialTotalExpenses:3.596558, officialPAT:-0.962223,
  },
};
const lierseskbePresupuestoOverlayByYear = {};

const lierseskbePasesData = [];
const lierseskbeResultadosData = {};
const lierseskbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['liersesk-be'] = {
  revenueLinesByYear: lierseskbeRevenueLinesByYear, expenseLinesByYear: lierseskbeExpenseLinesByYear,
  fiscalYearMeta: lierseskbeFiscalYearMeta, pasesData: lierseskbePasesData,
  resultadosData: lierseskbeResultadosData, titulosData: lierseskbeTitulosData,
  presupuestoOverlayByYear: lierseskbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'liersesk-be-jaarrekening-2025-06-30-individual': {
    id:'liersesk-be-jaarrekening-2025-06-30-individual', clubId:'liersesk-be',
    title:'Lierse SK — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['liersesk-be'] = null;
