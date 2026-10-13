const denderBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:7.116234, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.119704, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfsopbrengsten (impliciet in Brutomarge, niet als aparte code afgedrukt — zie koptekst)', normalizedCategory:'other_income', amountNative:1.926408, disclosureLevel:'aggregated' },
  ],
};

const denderBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen + Waardeverminderingen op handelsvorderingen + Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-4.396628, disclosureLevel:'detailed', items:[
      ['Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen', -4.318796],
      ['Waardeverminderingen op voorraden/bestellingen/handelsvorderingen', -0.041123],
      ['Andere bedrijfskosten', -0.036709],
    ]},
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-8.269828, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op immateriële en materiële vaste activa', normalizedCategory:'depreciation', amountNative:-0.574659, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.037088, disclosureLevel:'detailed' },
  ],
};

const denderBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'dender-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.623547,
    tax:-0.213846,
    grossDebt:21.682470, cash:0.044976,
    officialTotalRevenue:9.162346, officialTotalExpenses:13.241115, officialPAT:-4.953248,
  },
};

const denderBePresupuestoOverlayByYear = {};

const denderBePasesData = [];
const denderBeResultadosData = {};
const denderBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dender-be'] = {
  revenueLinesByYear: denderBeRevenueLinesByYear, expenseLinesByYear: denderBeExpenseLinesByYear,
  fiscalYearMeta: denderBeFiscalYearMeta, pasesData: denderBePasesData,
  resultadosData: denderBeResultadosData, titulosData: denderBeTitulosData,
  presupuestoOverlayByYear: denderBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'dender-be-jaarrekening-2025': {
    id:'dender-be-jaarrekening-2025', clubId:'dender-be',
    title:"Jaarrekening FCV Dender EH VZW voor het boekjaar van 01-07-2024 tot 30-06-2025",
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas de la VZW (asociación sin fines de lucro) individual, NO consolidadas con NV Dender Foot (sociedad comercial hermana que, per nota de la propia jaarrekening, absorberá parte de la actividad desde el ejercicio 2025-26). Esquema estatutario ABREVIADO (VKT-VZW): no desglosa Omzet por categoría de ingreso, a diferencia del esquema completo de otros clubes belgas cargados. PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Dender EH/jaarrekening-2025-06-30-individual.md.',
  },
});

memberCountByClub['dender-be'] = null;
