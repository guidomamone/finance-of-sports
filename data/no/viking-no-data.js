const vikingnoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Inntekt fra samarbeidsavtaler', normalizedCategory:'sponsorship_commercial', amountNative:82.33338, disclosureLevel:'aggregated' },
    { rawLabel:'Billettinntekt fra kamper', normalizedCategory:'matchday_competition', amountNative:27.464561, disclosureLevel:'aggregated' },
    { rawLabel:'Medieinntekter', normalizedCategory:'broadcasting', amountNative:47.909413, disclosureLevel:'aggregated' },
    { rawLabel:'Gevinst ved salg av spillerrettigheter', normalizedCategory:'player_sales', amountNative:61.756707, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'other_income', amountNative:48.667227, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Inntekt fra samarbeidsavtaler', normalizedCategory:'sponsorship_commercial', amountNative:53.861094, disclosureLevel:'aggregated' },
    { rawLabel:'Billettinntekt fra kamper', normalizedCategory:'matchday_competition', amountNative:15.588245, disclosureLevel:'aggregated' },
    { rawLabel:'Medieinntekter NTF', normalizedCategory:'broadcasting', amountNative:14.069055, disclosureLevel:'aggregated' },
    { rawLabel:'Gevinst ved salg av spillere', normalizedCategory:'player_sales', amountNative:37.384164, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'other_income', amountNative:42.339273, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Inntekter fra samarbeidsavtaler', normalizedCategory:'sponsorship_commercial', amountNative:37.350345, disclosureLevel:'aggregated' },
    { rawLabel:'Billettinntekter fra kamper', normalizedCategory:'matchday_competition', amountNative:7.320356, disclosureLevel:'aggregated' },
    { rawLabel:'Netto gevinst ved salag av spillere', normalizedCategory:'player_sales', amountNative:7.557137, disclosureLevel:'aggregated' },
    { rawLabel:'Medieinntekter NTF', normalizedCategory:'broadcasting', amountNative:8.962228, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'other_income', amountNative:11.139168, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Inntekt fra samarbeidsavtaler', normalizedCategory:'sponsorship_commercial', amountNative:46.427956, disclosureLevel:'aggregated' },
    { rawLabel:'Billettinntekt fra kamper', normalizedCategory:'matchday_competition', amountNative:12.756143, disclosureLevel:'aggregated' },
    { rawLabel:'Medieinntekter NTF', normalizedCategory:'broadcasting', amountNative:15.006455, disclosureLevel:'aggregated' },
    { rawLabel:'Netto gevinst ved salg av spillere', normalizedCategory:'player_sales', amountNative:0.878347, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'other_income', amountNative:28.196484, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Inntekt fra samarbeidsavtaler', normalizedCategory:'sponsorship_commercial', amountNative:40.010986, disclosureLevel:'aggregated' },
    { rawLabel:'Billettinntekt fra kamper', normalizedCategory:'matchday_competition', amountNative:4.904598, disclosureLevel:'aggregated' },
    { rawLabel:'Medieinntekter', normalizedCategory:'broadcasting', amountNative:14.813167, disclosureLevel:'aggregated' },
    { rawLabel:'Gevinst ved salg av spillere', normalizedCategory:'player_sales', amountNative:24.141848, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftsinntekt', normalizedCategory:'other_income', amountNative:27.915095, disclosureLevel:'aggregated' },
  ],
};
const vikingnoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-13.927807, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-2.101645, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkostnader fra Viking FK', normalizedCategory:'wages_squad', amountNative:-80.010132, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad (OTP)', normalizedCategory:'wages_squad', amountNative:-0.529119, disclosureLevel:'aggregated' },
    { rawLabel:'Andre personalkostnader', normalizedCategory:'wages_squad', amountNative:-0.325704, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-112.406643, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger spillerrettigheter', normalizedCategory:'player_amortisation', amountNative:-19.207686, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger markedsrettigheter', normalizedCategory:'other_amortisation', amountNative:-0.225, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger varige driftsmidler', normalizedCategory:'depreciation', amountNative:-9.022602, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-9.138793, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-1.262185, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkostnader fra Viking FK', normalizedCategory:'wages_squad', amountNative:-49.983934, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad (OTP)', normalizedCategory:'wages_squad', amountNative:-0.32419, disclosureLevel:'aggregated' },
    { rawLabel:'Andre personalkostnader', normalizedCategory:'wages_squad', amountNative:-1.025702, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning på varige driftsmidler og immaterielle eiendeler', normalizedCategory:'depreciation', amountNative:-11.320283, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivning av varige driftsmidler og immaterielle eiendeler', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-75.579739, disclosureLevel:'aggregated' },
  ],
  2018: [
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-5.781469, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-0.894568, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkostnader fra Viking FK', normalizedCategory:'wages_squad', amountNative:-23.23457, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad (OTP)', normalizedCategory:'wages_squad', amountNative:-0.596899, disclosureLevel:'aggregated' },
    { rawLabel:'Andre personalkostnader', normalizedCategory:'wages_squad', amountNative:-1.307115, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning på varige driftsmidler og immaterielle eiendeler', normalizedCategory:'depreciation', amountNative:-7.690523, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivning av varige driftsmidler og immaterielle eiendeler', normalizedCategory:'other_expenses', amountNative:-3.015783, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-36.197536, disclosureLevel:'aggregated' },
  ],
  2019: [
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-4.036896, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgivenavgift', normalizedCategory:'wages_squad', amountNative:-1.009076, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkostnader fra Viking FK', normalizedCategory:'wages_squad', amountNative:-33.182545, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad (OTP)', normalizedCategory:'wages_squad', amountNative:-0.163189, disclosureLevel:'aggregated' },
    { rawLabel:'Andre personalkostnader', normalizedCategory:'wages_squad', amountNative:-1.261783, disclosureLevel:'aggregated' },
    { rawLabel:'Ordinære avskrivninger', normalizedCategory:'depreciation', amountNative:-7.924786, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivninger', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-54.059334, disclosureLevel:'aggregated' },
  ],
  2020: [
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-7.462363, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-1.088367, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkostnader fra Viking FK', normalizedCategory:'wages_squad', amountNative:-34.804267, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad (OTP)', normalizedCategory:'wages_squad', amountNative:-0.283726, disclosureLevel:'aggregated' },
    { rawLabel:'Andre personalkostnader', normalizedCategory:'wages_squad', amountNative:-0.828483, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning på varige driftsmidler og immaterielle eiendeler', normalizedCategory:'depreciation', amountNative:-10.727885, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivning av varige driftsmidler og immaterielle eiendeler', normalizedCategory:'other_expenses', amountNative:-7.249771, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-39.315395, disclosureLevel:'aggregated' },
  ],
};
const vikingnoFiscalYearMeta = {
  2025: {
    currency:'NOK', fxRef:'NOK@2025-12-31',
    sourceId:'viking-no-aarsregnskap-viking-fotball-as-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.707366, tax:0,
    extraRows: [
      {label:'Renteinntekt', value:1.497338},
      {label:'Netto finansinntekt/kostnad', value:-2.138694},
      {label:'Rentekostnad', value:-5.06601},
      {label:'Skattekostnad på ordinært resultat', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:268.131288, officialTotalExpenses:237.756338, officialPAT:24.667584,
  },
  2022: {
    currency:'NOK', fxRef:'NOK@2022-12-31',
    sourceId:'viking-no-aarsregnskap-viking-fotball-as-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.8528, tax:0,
    extraRows: [
      {label:'Annen renteinntekt', value:0.258204},
      {label:'Annen finansinntekt', value:0.180387},
      {label:'Annen rentekostnad', value:-2.291391},
      {label:'Annen finanskostnad', value:0},
      {label:'Skattekostnad på ordinært resultat', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:163.241831, officialTotalExpenses:148.634826, officialPAT:12.754205,
  },
  2018: {
    currency:'NOK', fxRef:'NOK@2018-12-31',
    sourceId:'viking-no-aarsregnskap-viking-fotball-as-2018',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.040257, tax:0,
    extraRows: [
      {label:'Annen renteinntekt', value:0.03518},
      {label:'Annen rentekostnad', value:-3.070553},
      {label:'Annen finanskostnad', value:-0.004884},
      {label:'Skattekostnad på ordinært resultat', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:72.329234, officialTotalExpenses:78.718463, officialPAT:-9.429485,
  },
  2019: {
    currency:'NOK', fxRef:'NOK@2019-12-31',
    sourceId:'viking-no-aarsregnskap-viking-fotball-as-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-2.655345, tax:0,
    extraRows: [
      {label:'Annen renteinntekt', value:0.083976},
      {label:'Annen rentekostnad', value:-2.745855},
      {label:'Annen finanskostnad', value:0.006534},
      {label:'Skattekostnad på ordinært resultat', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:103.265385, officialTotalExpenses:101.637609, officialPAT:-1.027569,
  },
  2020: {
    currency:'NOK', fxRef:'NOK@2020-12-31',
    sourceId:'viking-no-aarsregnskap-viking-fotball-as-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.699123, tax:0,
    extraRows: [
      {label:'Annen renteinntekt', value:0.249369},
      {label:'Annen rentekostnad', value:-2.003935},
      {label:'Annen finanskostnad', value:0.055443},
      {label:'Skattekostnad på ordinært resultat', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:111.785694, officialTotalExpenses:101.760257, officialPAT:8.326314,
  },
};
const vikingnoPresupuestoOverlayByYear = {};

const vikingnoPasesData = [];
const vikingnoResultadosData = {};
const vikingnoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['viking-no'] = {
  revenueLinesByYear: vikingnoRevenueLinesByYear, expenseLinesByYear: vikingnoExpenseLinesByYear,
  fiscalYearMeta: vikingnoFiscalYearMeta, pasesData: vikingnoPasesData,
  resultadosData: vikingnoResultadosData, titulosData: vikingnoTitulosData,
  presupuestoOverlayByYear: vikingnoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'viking-no-aarsregnskap-viking-fotball-as-2025': {
    id:'viking-no-aarsregnskap-viking-fotball-as-2025', clubId:'viking-no',
    title:'Viking Fotball AS — aarsregnskap-viking-fotball-as-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'viking-no-aarsregnskap-viking-fotball-as-2022': {
    id:'viking-no-aarsregnskap-viking-fotball-as-2022', clubId:'viking-no',
    title:'Viking Fotball AS — aarsregnskap-viking-fotball-as-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'viking-no-aarsregnskap-viking-fotball-as-2018': {
    id:'viking-no-aarsregnskap-viking-fotball-as-2018', clubId:'viking-no',
    title:'Viking Fotball AS — aarsregnskap-viking-fotball-as-2018 (ejercicio 2018)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'viking-no-aarsregnskap-viking-fotball-as-2019': {
    id:'viking-no-aarsregnskap-viking-fotball-as-2019', clubId:'viking-no',
    title:'Viking Fotball AS — aarsregnskap-viking-fotball-as-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'viking-no-aarsregnskap-viking-fotball-as-2020': {
    id:'viking-no-aarsregnskap-viking-fotball-as-2020', clubId:'viking-no',
    title:'Viking Fotball AS — aarsregnskap-viking-fotball-as-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['viking-no'] = null;
