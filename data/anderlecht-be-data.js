const anderlechtBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:91.304983, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'player_sales', amountNative:19.517775, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.185851, disclosureLevel:'aggregated' },
  ],
};

const anderlechtBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankopen handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-3.983067, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-35.897374, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-53.328314, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'player_amortisation', amountNative:-10.832766, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen', normalizedCategory:'other_expenses', amountNative:-0.505416, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten', normalizedCategory:'other_expenses', amountNative:-1.662686, disclosureLevel:'aggregated' },
    { rawLabel:"Voorzieningen voor risico's en kosten", normalizedCategory:'exceptional_items', amountNative:-0.199000, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten', normalizedCategory:'player_impairment', amountNative:-2.948383, disclosureLevel:'aggregated' },
  ],
};

const anderlechtBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'anderlecht-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-1.309869,
    tax:-0.232140,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:57.066235, cash:1.516035,
    officialTotalRevenue:111.008609, officialTotalExpenses:109.158006,  officialPAT:0.109593,
  },
};

const anderlechtBePresupuestoOverlayByYear = {};

const anderlechtBePasesData = [];
const anderlechtBeResultadosData = {};
const anderlechtBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['anderlecht-be'] = {
  revenueLinesByYear: anderlechtBeRevenueLinesByYear, expenseLinesByYear: anderlechtBeExpenseLinesByYear,
  fiscalYearMeta: anderlechtBeFiscalYearMeta, pasesData: anderlechtBePasesData,
  resultadosData: anderlechtBeResultadosData, titulosData: anderlechtBeTitulosData,
  presupuestoOverlayByYear: anderlechtBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'anderlecht-be-jaarrekening-2025': {
    id:'anderlecht-be-jaarrekening-2025', clubId:'anderlecht-be',
    title:'Jaarrekening van Royal Sporting Club Anderlecht NV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Anderlecht/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet) y detalle numérico de "Andere bedrijfsopbrengsten" no fueron completados por el club en este filing.',
  },
});

memberCountByClub['anderlecht-be'] = null;
