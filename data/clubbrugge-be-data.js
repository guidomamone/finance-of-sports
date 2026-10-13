const clubBruggeBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Wedstrijdopbrengsten', normalizedCategory:'matchday_competition', amountNative:27.588000, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengsten uit mediarechten', normalizedCategory:'broadcasting', amountNative:74.117000, disclosureLevel:'detailed', items:[
      ['Binnenlands', 12.968], ['Europees', 61.149],
    ]},
    { rawLabel:'Commerciële opbrengsten', normalizedCategory:'sponsorship_commercial', amountNative:18.784000, disclosureLevel:'detailed' },
    { rawLabel:'Overige opbrengsten', normalizedCategory:'other_income', amountNative:1.778000, disclosureLevel:'aggregated' },
    { rawLabel:'Meerwaarde bij de overdracht van spelersregistratierechten', normalizedCategory:'player_sales', amountNative:31.658000, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.272000, disclosureLevel:'detailed', items:[
      ['Lidgeld', 0.044], ['Giften', 0.030], ['Overige', 0.198],
    ]},
  ],
};

const clubBruggeBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankoop van materialen, benodigdheden en overige verbruiksgoederen', normalizedCategory:'other_expenses', amountNative:-4.985000, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfskosten — organisatie, apparatuur, beveiliging, reizen, hotels', normalizedCategory:'match_organisation_expense', amountNative:-13.693000, disclosureLevel:'detailed', items:[
      ['Organisatie, apparatuur en beveiliging', 8.636], ['Reiskosten', 2.174], ['Hotels, restaurants en recepties', 2.883],
    ]},
    { rawLabel:'Overige bedrijfskosten — administratie, huur, nutsvoorzieningen, consulting, interim, belastingen', normalizedCategory:'admin_general_expense', amountNative:-15.625000, disclosureLevel:'detailed', items:[
      ['Algemene administratie', 6.749], ['Huur en andere diensten', 2.708], ['Nutsvoorzieningen, onderhoud en reparatie', 3.332],
      ['Consulting- en andere advieskosten', 1.115], ['Interim', 0.513], ['Overige belastingen', 1.208],
    ]},
    { rawLabel:'Lonen van spelers en kosten van technische staf', normalizedCategory:'wages_squad', amountNative:-48.075000, disclosureLevel:'aggregated' },
    { rawLabel:'Overige personeelskosten', normalizedCategory:'admin_general_expense', amountNative:-10.060000, disclosureLevel:'detailed', items:[
      ['Overige personeelskosten', 7.716], ['Op aandelen gebaseerde betalingen', 0.078], ['Socialezekerheidsbijdragen', 1.980],
      ['Toegezegde-pensioenregelingskosten', 0.305], ['Overige kosten', -0.019],
    ]},
    { rawLabel:'Minderwaarde bij de overdracht van spelersregistratierechten', normalizedCategory:'player_impairment', amountNative:-9.024000, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen en waardeverminderingen van spelersregistratierechten', normalizedCategory:'player_amortisation', amountNative:-26.844000, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen en waardeverminderingen van overige immateriële activa en materiële vaste activa', normalizedCategory:'depreciation', amountNative:-3.293000, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen en waardevermindering van een recht-op-gebruik activa', normalizedCategory:'depreciation', amountNative:-1.731000, disclosureLevel:'detailed' },
    { rawLabel:'Overige niet-kaskosten', normalizedCategory:'exceptional_items', amountNative:0.335000, disclosureLevel:'aggregated' },
  ],
};

const clubBruggeBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'clubbrugge-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:1.755000,
    tax:-6.891000,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:98.745000, cash:21.401000,
    officialTotalRevenue:154.196000, officialTotalExpenses:133.331000,  officialPAT:16.064000,
  },
};

const clubBruggeBePresupuestoOverlayByYear = {};

const clubBruggeBePasesData = [];
const clubBruggeBeResultadosData = {};
const clubBruggeBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['clubbrugge-be'] = {
  revenueLinesByYear: clubBruggeBeRevenueLinesByYear, expenseLinesByYear: clubBruggeBeExpenseLinesByYear,
  fiscalYearMeta: clubBruggeBeFiscalYearMeta, pasesData: clubBruggeBePasesData,
  resultadosData: clubBruggeBeResultadosData, titulosData: clubBruggeBeTitulosData,
  presupuestoOverlayByYear: clubBruggeBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'clubbrugge-be-jaarrekening-2025': {
    id:'clubbrugge-be-jaarrekening-2025', clubId:'clubbrugge-be',
    title:'Geconsolideerde jaarrekening van Club Brugge NV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas CONSOLIDADAS (grupo, IFRS), preferidas sobre la versión individual disponible para el mismo año. Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Club Brugge/jaarrekening-2025-06-30-consolidado.md.',
  },
});

gestionesByClub['clubbrugge-be'] = {
  actual: { nombre:'Bart Verhaeghe (Voorzitter Raad van Bestuur)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['clubbrugge-be'] = null;
