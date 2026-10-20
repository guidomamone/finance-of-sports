const valerenganoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Sponsorinntekter', normalizedCategory:'sponsorship_commercial', amountNative:44.538148, disclosureLevel:'aggregated' },
    { rawLabel:'Markeds- og medieinntekter', normalizedCategory:'broadcasting', amountNative:28.53763, disclosureLevel:'aggregated' },
    { rawLabel:'Billettsalg', normalizedCategory:'matchday_competition', amountNative:25.505735, disclosureLevel:'aggregated' },
    { rawLabel:'Viderefakturert', normalizedCategory:'other_income', amountNative:0.19539, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse inntekter', normalizedCategory:'other_income', amountNative:1.047723, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Sponsorinntekter', normalizedCategory:'sponsorship_commercial', amountNative:45.190549, disclosureLevel:'aggregated' },
    { rawLabel:'Markeds- og medieinntekter', normalizedCategory:'broadcasting', amountNative:17.770123, disclosureLevel:'aggregated' },
    { rawLabel:'Billettsalg (ordinært)', normalizedCategory:'matchday_competition', amountNative:13.764508, disclosureLevel:'aggregated' },
    { rawLabel:'Økonomitjenester', normalizedCategory:'other_income', amountNative:0.15, disclosureLevel:'aggregated' },
    { rawLabel:'Viderefakturert', normalizedCategory:'other_income', amountNative:4.007054, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse inntekter', normalizedCategory:'other_income', amountNative:3.320415, disclosureLevel:'aggregated' },
    { rawLabel:'Salgsprovisjoner og diverse salg', normalizedCategory:'other_income', amountNative:0.021814, disclosureLevel:'aggregated' },
    { rawLabel:'Cupkasse', normalizedCategory:'competition_bonus', amountNative:0.172, disclosureLevel:'aggregated' },
    { rawLabel:'Billettandel hospitalitykunder', normalizedCategory:'matchday_competition', amountNative:0.017821, disclosureLevel:'aggregated' },
    { rawLabel:'Spillersalg', normalizedCategory:'player_sales', amountNative:12.809036, disclosureLevel:'aggregated' },
    { rawLabel:'Solidaritetsinntekter', normalizedCategory:'player_sales', amountNative:0.501113, disclosureLevel:'aggregated' },
    { rawLabel:'Viderefakturering', normalizedCategory:'other_income', amountNative:0.028372, disclosureLevel:'aggregated' },
    { rawLabel:'Andre avtaler', normalizedCategory:'other_income', amountNative:1.387, disclosureLevel:'aggregated' },
    { rawLabel:'Tilskudd', normalizedCategory:'other_income', amountNative:2.994421, disclosureLevel:'aggregated' },
    { rawLabel:'Medlemskontigenter', normalizedCategory:'member_dues', amountNative:0.279, disclosureLevel:'aggregated' },
    { rawLabel:'Andre inntekter', normalizedCategory:'other_income', amountNative:0.167179, disclosureLevel:'aggregated' },
  ],
};
const valerenganoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-12.565199, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-11.905657, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-1.802767, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-0.247852, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-2.302202, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning av driftsmidler', normalizedCategory:'depreciation', amountNative:-0.185432, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivning av varige driftsmidler og immaterielle eiendeler', normalizedCategory:'other_expenses', amountNative:-1.045077, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-98.900054, disclosureLevel:'aggregated' },
  ],
  2022: [
    { rawLabel:'Varekostnad', normalizedCategory:'other_expenses', amountNative:-0.175871, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-9.410081, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-1.612415, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-0.396783, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-0.198462, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivning av driftsmidler', normalizedCategory:'depreciation', amountNative:-1.075775, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-31.291505, disclosureLevel:'aggregated' },
    { rawLabel:'Lønninger', normalizedCategory:'wages_squad', amountNative:-51.102721, disclosureLevel:'aggregated' },
    { rawLabel:'Folketrygdavgift', normalizedCategory:'wages_squad', amountNative:-7.892534, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnader', normalizedCategory:'wages_squad', amountNative:-0.598856, disclosureLevel:'aggregated' },
    { rawLabel:'Andre lønns- og personalkostnader', normalizedCategory:'wages_squad', amountNative:-0.1785, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivning av varige driftsmidler og immaterielle eiendeler', normalizedCategory:'other_expenses', amountNative:-0.243818, disclosureLevel:'aggregated' },
    { rawLabel:'Kontorhold, hus og lokaler', normalizedCategory:'admin_general_expense', amountNative:-1.665801, disclosureLevel:'aggregated' },
    { rawLabel:'Bilgodtgjørelse, diett og transport', normalizedCategory:'match_organisation_expense', amountNative:-0.325448, disclosureLevel:'aggregated' },
    { rawLabel:'Trening, kurs og utdanning', normalizedCategory:'other_expenses', amountNative:-2.283968, disclosureLevel:'aggregated' },
    { rawLabel:'Utstyr, varekost', normalizedCategory:'other_expenses', amountNative:-0.524734, disclosureLevel:'aggregated' },
    { rawLabel:'Kjøp og leie av spillere', normalizedCategory:'other_expenses', amountNative:-23.24717, disclosureLevel:'aggregated' },
    { rawLabel:'Arrangementskostnader', normalizedCategory:'match_organisation_expense', amountNative:-1.521252, disclosureLevel:'aggregated' },
    { rawLabel:'Bane, anlegg og maskiner', normalizedCategory:'admin_general_expense', amountNative:-0.150133, disclosureLevel:'aggregated' },
    { rawLabel:'Annen driftskostnad', normalizedCategory:'other_expenses', amountNative:-3.143455, disclosureLevel:'aggregated' },
  ],
};
const valerenganoFiscalYearMeta = {
  2025: {
    currency:'NOK', fxRef:'NOK@2025-12-31',
    sourceId:'valerenga-no-aarsregnskap-valerenga-fotball-as-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:31.72628, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:70.10379},
      {label:'Annen finanskostnad', value:-38.37751},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:99.824626, officialTotalExpenses:128.95424, officialPAT:2.596666,
  },
  2022: {
    currency:'NOK', fxRef:'NOK@2022-12-31',
    sourceId:'valerenga-no-aarsregnskap-valerenga-fotball-as-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-8.22635, tax:0,
    extraRows: [
      {label:'Annen finansinntekt', value:11.287765},
      {label:'Annen finanskostnad', value:-30.151449},
      {label:'Annen renteinntekt', value:0.162892},
      {label:'Annen finansinntekt', value:21.840918},
      {label:'Annen rentekostnad', value:-0.005702},
      {label:'Annen finanskostnad', value:-11.360774},
      {label:'Skattekostnad', value:0},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:102.580405, officialTotalExpenses:137.039282, officialPAT:-42.685226,
  },
};
const valerenganoPresupuestoOverlayByYear = {};

const valerenganoPasesData = [];
const valerenganoResultadosData = {};
const valerenganoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['valerenga-no'] = {
  revenueLinesByYear: valerenganoRevenueLinesByYear, expenseLinesByYear: valerenganoExpenseLinesByYear,
  fiscalYearMeta: valerenganoFiscalYearMeta, pasesData: valerenganoPasesData,
  resultadosData: valerenganoResultadosData, titulosData: valerenganoTitulosData,
  presupuestoOverlayByYear: valerenganoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'valerenga-no-aarsregnskap-valerenga-fotball-as-2025': {
    id:'valerenga-no-aarsregnskap-valerenga-fotball-as-2025', clubId:'valerenga-no',
    title:'Vålerenga Fotball AS — aarsregnskap-valerenga-fotball-as-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'valerenga-no-aarsregnskap-valerenga-fotball-as-2022': {
    id:'valerenga-no-aarsregnskap-valerenga-fotball-as-2022', clubId:'valerenga-no',
    title:'Vålerenga Fotball AS — aarsregnskap-valerenga-fotball-as-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    publicNote:'Suma de dos entidades que no consolidan: aarsregnskap-valerenga-fotball-as-2022 y aarsregnskap-valerenga-fotball-elite-2022. La primera no imprime la transferencia a la segunda como renglón: el importe (64 millones) sale del ingreso «Overføring fra samarbeidsselskap» de la segunda y se resta de «Annen driftskostnad» de la primera (evidencia: Elite 2022, pág. 2 del visor: Overføring fra samarbeidsselskap 64 000 000; AS 2022, pág. 2 del visor: Annen driftskostnad 95 291 505, y la cláusula del contrato de colaboración: el AS recibe los ingresos del Elite a cambio de cubrir todos sus gastos); el resultado es la suma de los dos resultados impresos.',
  },
});

memberCountByClub['valerenga-no'] = null;
