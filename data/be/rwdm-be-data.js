const rwdmbeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:4.269374, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:10.904952, disclosureLevel:'aggregated' },
  ],
};
const rwdmbeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankopen', normalizedCategory:'other_expenses', amountNative:-0.74886, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-7.016079, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen en rechtstreekse sociale voordelen', normalizedCategory:'wages_squad', amountNative:-7.691859, disclosureLevel:'aggregated' },
    { rawLabel:'Werkgeversbijdragen voor sociale verzekeringen', normalizedCategory:'wages_squad', amountNative:-1.231501, disclosureLevel:'aggregated' },
    { rawLabel:'Andere personeelskosten', normalizedCategory:'wages_squad', amountNative:-1.046765, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'depreciation', amountNative:-2.5493, disclosureLevel:'aggregated' },
    { rawLabel:'Voorzieningen voor risico\'s en kosten: toevoegingen (bestedingen en terugnemingen) (+)/(-)', normalizedCategory:'exceptional_items', amountNative:-1.1895, disclosureLevel:'aggregated' },
    { rawLabel:'Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.002771, disclosureLevel:'aggregated' },
    { rawLabel:'Andere', normalizedCategory:'other_expenses', amountNative:-0.338987, disclosureLevel:'aggregated' },
    { rawLabel:'Minderwaarden bij de realisatie van immateriële en materiële vaste activa', normalizedCategory:'exceptional_items', amountNative:-0.934104, disclosureLevel:'aggregated' },
    { rawLabel:'Andere niet-recurrente bedrijfskosten', normalizedCategory:'exceptional_items', amountNative:-0.00067, disclosureLevel:'aggregated' },
  ],
};
const rwdmbeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'rwdm-be-jaarrekening-2025-06-30-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.390847, tax:-0.57858,
    extraRows: [
      {label:'Andere financiële opbrengsten', value:0.010508},
      {label:'Kosten van schulden', value:-6.145338},
      {label:'Waardeverminderingen op vlottende activa andere dan voorraden, bestellingen in uitvoering en handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)', value:-0.133987},
      {label:'Andere financiële kosten', value:-0.06703},
      {label:'Niet-recurrente financiële kosten', value:-0.055},
      {label:'Belastingen', value:-0.57858},
    ],
    sinDesglose: [
      {renglon:'Omzet', lado:'revenue', importe:4.269374, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:15.174326, officialTotalExpenses:20.626122, officialPAT:-14.545496,
  },
};
const rwdmbePresupuestoOverlayByYear = {};

const rwdmbePasesData = [];
const rwdmbeResultadosData = {};
const rwdmbeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rwdm-be'] = {
  revenueLinesByYear: rwdmbeRevenueLinesByYear, expenseLinesByYear: rwdmbeExpenseLinesByYear,
  fiscalYearMeta: rwdmbeFiscalYearMeta, pasesData: rwdmbePasesData,
  resultadosData: rwdmbeResultadosData, titulosData: rwdmbeTitulosData,
  presupuestoOverlayByYear: rwdmbePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rwdm-be-jaarrekening-2025-06-30-individual': {
    id:'rwdm-be-jaarrekening-2025-06-30-individual', clubId:'rwdm-be',
    title:'RWDM — jaarrekening-2025-06-30-individual (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['rwdm-be'] = null;
