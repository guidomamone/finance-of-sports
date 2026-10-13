const dinamozagrebHrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Prihodi od ulaznica — Nacionalna natjecanja + UEFA klupska natjecanja + VIP ulaznice i hospitality + ostalo nerazvrstano', normalizedCategory:'matchday_competition', amountNative:4.411945, disclosureLevel:'detailed', items:[
      ['Nacionalna natjecanja', 1.174982], ['UEFA klupska natjecanja', 2.585754],
      ['VIP ulaznice i hospitality', 0.630476], ['Ostali nerazvrstani prihodi od ulaznica', 0.020733],
    ]},
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:1.356000, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Članarine', normalizedCategory:'member_dues', amountNative:0.888330, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja', normalizedCategory:'sponsorship_commercial', amountNative:2.904304, disclosureLevel:'detailed', items:[
      ['Sponzor za opremu (proizvođač sprava)', 1.107500], ['Glavni sponzor na opremi', 0.765809],
      ['Ostali nerazvrstani prihodi od sponzorstva i oglašavanja', 1.030995],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:1.265400, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi — Nacionalna natjecanja + Prodaja proizvoda', normalizedCategory:'sponsorship_commercial', amountNative:6.275858, disclosureLevel:'detailed', items:[
      ['Komercijalni prihodi - Nacionalna natjecanja', 1.147826], ['Komercijalni prihodi - Prodaja proizvoda (merchandising)', 5.128032],
    ]},
    { rawLabel:'Komercijalni prihodi - Ugostiteljske usluge za vrijeme odigravanja utakmica', normalizedCategory:'stadium_other', amountNative:0.104691, disclosureLevel:'detailed' },
    { rawLabel:'Uefine nagrade i solidarne uplate', normalizedCategory:'competition_bonus', amountNative:32.430730, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi', normalizedCategory:'other_income', amountNative:7.924977, disclosureLevel:'detailed', items:[
      ['Donacije od nacionalnih nogometnih tijela', 0.014000], ['Donacije/dotacije od države i lokalne samouprave', 1.697500],
      ['Donacije nepovezanih strana', 0.150000], ['Ostali nerazvrstani poslovni prihodi', 6.063477],
    ]},
  ],
};

const dinamozagrebHrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Troškovi prodaje/materijala', normalizedCategory:'other_expenses', amountNative:-5.073592, disclosureLevel:'detailed', items:[
      ['Troškovi prodaje robe/proizvoda - izravni', -2.189318], ['Troškovi prodaje robe/proizvoda - ostali nerazvrstani', -2.884274],
    ]},
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-32.001727, disclosureLevel:'detailed', items:[
      ['Troškovi primanja igrača', -25.469684], ['Troškovi primanja stručnog stožera', -6.532043],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika', normalizedCategory:'admin_general_expense', amountNative:-6.238624, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-0.341710, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija ostale nematerijalne imovine (bez registracija igrača)', normalizedCategory:'other_amortisation', amountNative:-0.299380, disclosureLevel:'detailed' },
    { rawLabel:'Trošak imovine s pravom korištenja + Troškovi sponzorstva i oglašavanja + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-1.011024, disclosureLevel:'detailed', items:[
      ['Trošak imovine s pravom korištenja (operativni najam)', -0.439748], ['Troškovi sponzorstva i oglašavanja', -0.210882],
      ['Troškovi imovine i objekata', -0.360394],
    ]},
    { rawLabel:'Troškovi utakmica', normalizedCategory:'match_organisation_expense', amountNative:-2.565436, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-6.662775, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija nematerijalne imovine (registracije igrača)', normalizedCategory:'player_amortisation', amountNative:-6.117746, disclosureLevel:'detailed' },
  ],
};

const dinamozagrebHrFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'dinamozagreb-hr-financijsko-izvjesce-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    profitOnPlayerSales:11.606208,
    assetSales:-0.154714,
    netInterest:-0.532036,
    tax:-0.784561,
    grossDebt:3.700000, cash:0.562542,
    officialTotalRevenue:57.562235, officialTotalExpenses:60.312014, officialPAT:7.385118,
  },
};

const dinamozagrebHrPresupuestoOverlayByYear = {};

const dinamozagrebHrPasesData = [];
const dinamozagrebHrResultadosData = {};
const dinamozagrebHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['dinamozagreb-hr'] = {
  revenueLinesByYear: dinamozagrebHrRevenueLinesByYear, expenseLinesByYear: dinamozagrebHrExpenseLinesByYear,
  fiscalYearMeta: dinamozagrebHrFiscalYearMeta, pasesData: dinamozagrebHrPasesData,
  resultadosData: dinamozagrebHrResultadosData, titulosData: dinamozagrebHrTitulosData,
  presupuestoOverlayByYear: dinamozagrebHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'dinamozagreb-hr-financijsko-izvjesce-2024': {
    id:'dinamozagreb-hr-financijsko-izvjesce-2024', clubId:'dinamozagreb-hr',
    title:'Revidirani konsolidirani financijski izvještaji za posebne namjene za 2024. godinu',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['dinamozagreb-hr'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['dinamozagreb-hr'] = null;
