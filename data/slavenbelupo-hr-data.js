const slavenbelupoHrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Prihodi od ulaznica (Nacionalno prvenstvo te godišnje ulaznice, combinados)', normalizedCategory:'matchday_competition', amountNative:0.303770, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja — Glavni sponzor + Ostali sponzori', normalizedCategory:'sponsorship_commercial', amountNative:1.819373, disclosureLevel:'detailed', items:[
      ['Glavni sponzor', 1.210000], ['Ostali sponzori', 0.609373],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:0.942000, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi od članstva', normalizedCategory:'member_dues', amountNative:0.041777, disclosureLevel:'detailed' },
    { rawLabel:'UEFA klupska natjecanja (Prihodi od UEFE)', normalizedCategory:'competition_bonus', amountNative:1.873750, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi — donacije', normalizedCategory:'other_income', amountNative:0.485933, disclosureLevel:'detailed', items:[
      ['Donacije od nacionalnih nogometnih tijela', 0.068298], ['Donacije i dotacije od države i lokalne samouprave', 0.232224],
      ['Donacije - ostale', 0.005645], ['Ostali poslovni prihodi', 0.179766],
    ]},
    { rawLabel:'Prihodi od raspolaganja registracijama igrača', normalizedCategory:'player_sales', amountNative:0.221147, disclosureLevel:'detailed' },
  ],
};

const slavenbelupoHrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Troškovi prodaje/materijala - Ukupno', normalizedCategory:'other_expenses', amountNative:-0.574354, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi primanja igrača - ukupno', normalizedCategory:'wages_squad', amountNative:-2.659402, disclosureLevel:'detailed', items:[
      ['Plaće igrača', -2.345051], ['Ostali nerazvrstani troškovi primanja igrača', -0.314351],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika - Ukupno', normalizedCategory:'admin_general_expense', amountNative:-1.289397, disclosureLevel:'detailed', items:[
      ['Plaće ostalih zaposlenika', -0.923111], ['Porezi i doprinosi - ostali zaposlenici', -0.293454],
      ['Ostali nerazvrstani troškovi za primanja ostalih zaposlenika', -0.072832],
    ]},
    { rawLabel:'Amortizacija nematerijalne imovine (bez registracija igrača)', normalizedCategory:'other_amortisation', amountNative:-0.043876, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija materijalne ili ostale nematerijalne imovine', normalizedCategory:'depreciation', amountNative:-0.036672, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi održavanja utakmica', normalizedCategory:'match_organisation_expense', amountNative:-0.127641, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi imovine i objekta', normalizedCategory:'admin_general_expense', amountNative:-0.235711, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi za ne-nogometne djelatnosti', normalizedCategory:'admin_general_expense', amountNative:-0.566675, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi komercijalnih aktivnosti', normalizedCategory:'admin_general_expense', amountNative:-0.113975, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-0.537906, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi za stjecanje registracija igrača', normalizedCategory:'player_amortisation', amountNative:-0.101836, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi agenata / posrednika', normalizedCategory:'other_expenses', amountNative:-0.140345, disclosureLevel:'detailed' },
  ],
};

const slavenbelupoHrFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'slavenbelupo-hr-financijsko-izvjesce-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    netInterest:-0.048007,
    tax:0,
    grossDebt:1.179036, cash:0.026003,
    officialTotalRevenue:5.687750, officialTotalExpenses:6.427790, officialPAT:-0.788047,
  },
};

const slavenbelupoHrPresupuestoOverlayByYear = {};

const slavenbelupoHrPasesData = [];
const slavenbelupoHrResultadosData = {};
const slavenbelupoHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['slavenbelupo-hr'] = {
  revenueLinesByYear: slavenbelupoHrRevenueLinesByYear, expenseLinesByYear: slavenbelupoHrExpenseLinesByYear,
  fiscalYearMeta: slavenbelupoHrFiscalYearMeta, pasesData: slavenbelupoHrPasesData,
  resultadosData: slavenbelupoHrResultadosData, titulosData: slavenbelupoHrTitulosData,
  presupuestoOverlayByYear: slavenbelupoHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'slavenbelupo-hr-financijsko-izvjesce-2025': {
    id:'slavenbelupo-hr-financijsko-izvjesce-2025', clubId:'slavenbelupo-hr',
    title:'NK Slaven Belupo, Koprivnica — Godišnji financijski izvještaji za 2025. godinu',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['slavenbelupo-hr'] = null;
