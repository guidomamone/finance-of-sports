const rijekaHrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Prihodi od ulaznica — Nacionalna natjecanja + UEFA klupska natjecanja + ostalo nerazvrstano', normalizedCategory:'matchday_competition', amountNative:0.275748, disclosureLevel:'detailed', items:[
      ['Nacionalna natjecanja', 0.048809], ['UEFA klupska natjecanja', 0.216591], ['Ostali nerazvrstani prihodi od ulaznica', 0.010348],
    ]},
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:0.993248, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Članarine', normalizedCategory:'member_dues', amountNative:0.406278, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja', normalizedCategory:'sponsorship_commercial', amountNative:1.231950, disclosureLevel:'detailed', items:[
      ['Proizvođač opreme', 0.112113], ['Glavni sponzor', 0.312775], ['Ostali nerazvrstani prihodi od sponzorstva i oglašavanja', 0.807062],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:1.214000, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi — Prodaja proizvoda + Ostali nerazvrstani', normalizedCategory:'sponsorship_commercial', amountNative:0.791705, disclosureLevel:'detailed', items:[
      ['Prodaja proizvoda (merchandising)', 0.771956], ['Ostali nerazvrstani komercijalni prihodi', 0.019749],
    ]},
    { rawLabel:'Komercijalni prihodi - Korištenje objekata za vrijeme neodigravanja utakmica', normalizedCategory:'stadium_other', amountNative:0.597002, disclosureLevel:'detailed' },
    { rawLabel:'Uefine nagrade i solidarne uplate', normalizedCategory:'competition_bonus', amountNative:2.026304, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi', normalizedCategory:'other_income', amountNative:0.834045, disclosureLevel:'detailed', items:[
      ['Donacije/dotacije od države i lokalne samouprave', 0.195526], ['Donacije nepovezanih strana', 0.169500],
      ['Ostali nerazvrstani poslovni prihodi', 0.469019],
    ]},
  ],
};

const rijekaHrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Troškovi prodaje/materijala', normalizedCategory:'other_expenses', amountNative:-1.093209, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-8.284259, disclosureLevel:'detailed', items:[
      ['Troškovi primanja igrača', -6.224869], ['Troškovi primanja stručnog stožera', -2.059390],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika', normalizedCategory:'admin_general_expense', amountNative:-1.266194, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija i umanjenje vrijednosti dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-0.948359, disclosureLevel:'detailed' },
    { rawLabel:'Trošak imovine s pravom korištenja + Troškovi sponzorstva i oglašavanja + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-0.518001, disclosureLevel:'detailed', items:[
      ['Trošak imovine s pravom korištenja (operativni najam)', -0.162783], ['Troškovi sponzorstva i oglašavanja', -0.040761],
      ['Troškovi imovine i objekata', -0.314457],
    ]},
    { rawLabel:'Troškovi održavanja utakmica', normalizedCategory:'match_organisation_expense', amountNative:-0.645353, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-4.372293, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija dugotrajne nematerijalne imovine (registracije igrača)', normalizedCategory:'player_amortisation', amountNative:-0.502826, disclosureLevel:'detailed' },
  ],
};

const rijekaHrFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'rijeka-hr-financijsko-izvjesce-2024-kombinirani',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    profitOnPlayerSales:10.092795,
    assetSales:0,
    netInterest:-0.790187,
    tax:0,
    grossDebt:14.092288, cash:1.691323,
    officialTotalRevenue:8.370280, officialTotalExpenses:17.630494, officialPAT:0.042394,
  },
};

const rijekaHrPresupuestoOverlayByYear = {};

const rijekaHrPasesData = [];
const rijekaHrResultadosData = {};
const rijekaHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rijeka-hr'] = {
  revenueLinesByYear: rijekaHrRevenueLinesByYear, expenseLinesByYear: rijekaHrExpenseLinesByYear,
  fiscalYearMeta: rijekaHrFiscalYearMeta, pasesData: rijekaHrPasesData,
  resultadosData: rijekaHrResultadosData, titulosData: rijekaHrTitulosData,
  presupuestoOverlayByYear: rijekaHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rijeka-hr-financijsko-izvjesce-2024-kombinirani': {
    id:'rijeka-hr-financijsko-izvjesce-2024-kombinirani', clubId:'rijeka-hr',
    title:'Revidirani godišnji kombinirani financijski izvještaji za posebne namjene za 2024. godinu (HNK Rijeka s.d.d. i Stadion Kantrida d.o.o.)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado COMBINADO (HNK Rijeka s.d.d. + Stadion Kantrida d.o.o., la sociedad que administra el estadio y vende las entradas), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de octubre de 2024 de la HNS — combinación exigida desde esa fecha. Auditor: KPMG Croatia d.o.o. za reviziju. Dictamen limpio, sin salvedades. Se usó este informe combinado en vez del informe individual de HNK Rijeka s.d.d. a secas (también disponible en la misma carpeta) porque los ingresos de entradas/estadio se facturan a través de la subsidiaria: el individual habría subestimado el revenue real del club. Transcripción completa en Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-kombinirani.md.',
  },
});

gestionesByClub['rijeka-hr'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['rijeka-hr'] = null;
