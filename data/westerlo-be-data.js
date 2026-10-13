const westerloBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:14.373418, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:16.309398, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.046566, disclosureLevel:'aggregated' },
  ],
};

const westerloBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-3.495560, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-12.257662, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-17.858655, disclosureLevel:'detailed', items:[
      ['Bezoldigingen en rechtstreekse sociale voordelen', 14.675317], ['Werkgeversbijdragen voor sociale verzekeringen', 2.250854], ['Werkgeverspremies voor bovenwettelijke verzekeringen', 0.138962], ['Andere personeelskosten', 0.793522],
    ]},
    { rawLabel:'Afschrijvingen op immateriële vaste activa (spelersregistratierechten)', normalizedCategory:'player_amortisation', amountNative:-6.801978, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-1.196318, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen — residuo no explicado entre Nota 6.2.1/6.3.x y el código 630 impreso (redondeo)', normalizedCategory:'other_amortisation', amountNative:-0.003058, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden en bestellingen (netto)', normalizedCategory:'other_expenses', amountNative:-0.003645, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten — Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.273750, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfskosten — Andere', normalizedCategory:'other_expenses', amountNative:-0.034178, disclosureLevel:'detailed' },
    { rawLabel:'Niet-recurrente bedrijfskosten (minderwaarden bij realisatie van immateriële en materiële vaste activa)', normalizedCategory:'player_impairment', amountNative:-0.201673, disclosureLevel:'aggregated' },
  ],
};

const westerloBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'westerlo-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-0.087489,
    tax:-0.283163,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:39.407332, cash:0.135090,
    officialTotalRevenue:30.729382, officialTotalExpenses:42.126477, officialPAT:-11.767747,
  },
};

const westerloBePresupuestoOverlayByYear = {};

const westerloBePasesData = [];
const westerloBeResultadosData = {};
const westerloBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['westerlo-be'] = {
  revenueLinesByYear: westerloBeRevenueLinesByYear, expenseLinesByYear: westerloBeExpenseLinesByYear,
  fiscalYearMeta: westerloBeFiscalYearMeta, pasesData: westerloBePasesData,
  resultadosData: westerloBeResultadosData, titulosData: westerloBeTitulosData,
  presupuestoOverlayByYear: westerloBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'westerlo-be-jaarrekening-2025': {
    id:'westerlo-be-jaarrekening-2025', clubId:'westerlo-be',
    title:'Jaarrekening van KVC Westerlo BV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Westerlo/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet y de subsidios dentro de Andere bedrijfsopbrengsten) no fue completada por el club en este filing. Patrimonio neto negativo al cierre (-EUR 1,85 M), mejorado desde -EUR 3,59 M el ejercicio anterior vía un aumento de capital (Inbreng de EUR 56,1 M a EUR 69,6 M).',
  },
});

memberCountByClub['westerlo-be'] = null;
