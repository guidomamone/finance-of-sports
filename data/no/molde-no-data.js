const moldenoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Medlemskontigent', normalizedCategory:'member_dues', amountNative:0.31832, disclosureLevel:'aggregated' },
    { rawLabel:'Egenandeler/deltakeravgift', normalizedCategory:'other_income', amountNative:2.920111, disclosureLevel:'aggregated' },
    { rawLabel:'Markedsmidler NFF, NTF og UEFA', normalizedCategory:'broadcasting', amountNative:60.287629, disclosureLevel:'aggregated' },
    { rawLabel:'Andre tilskudd', normalizedCategory:'other_income', amountNative:13.448947, disclosureLevel:'aggregated' },
    { rawLabel:'Inntekter seriekamper', normalizedCategory:'matchday_competition', amountNative:13.248227, disclosureLevel:'aggregated' },
    { rawLabel:'Inntekter NM Cup', normalizedCategory:'matchday_competition', amountNative:0.177551, disclosureLevel:'aggregated' },
    { rawLabel:'Inntekter E-Cup', normalizedCategory:'competition_bonus', amountNative:1.135289, disclosureLevel:'aggregated' },
    { rawLabel:'Oppgjør NM Cup', normalizedCategory:'matchday_competition', amountNative:0.545067, disclosureLevel:'aggregated' },
    { rawLabel:'Andre inntekter privatkamper etc.', normalizedCategory:'matchday_competition', amountNative:0.36, disclosureLevel:'aggregated' },
    { rawLabel:'Reklame/ sponsorinntekter', normalizedCategory:'sponsorship_commercial', amountNative:27.936741, disclosureLevel:'aggregated' },
    { rawLabel:'Andre driftsinntekter', normalizedCategory:'other_income', amountNative:3.650788, disclosureLevel:'aggregated' },
    { rawLabel:'Salg spillere/ utleie', normalizedCategory:'player_sales', amountNative:5.116762, disclosureLevel:'aggregated' },
  ],
  2009: [
    { rawLabel:'Medlemskontigent', normalizedCategory:'member_dues', amountNative:0.22895, disclosureLevel:'aggregated' },
    { rawLabel:'Egenandeler/deltakeravgift', normalizedCategory:'other_income', amountNative:1.470227, disclosureLevel:'aggregated' },
    { rawLabel:'Markedsmidler NFF, NTF og UEFA', normalizedCategory:'broadcasting', amountNative:8.474181, disclosureLevel:'aggregated' },
    { rawLabel:'Andre tilskudd', normalizedCategory:'other_income', amountNative:0.374614, disclosureLevel:'aggregated' },
    { rawLabel:'Inntekter Seriekamper', normalizedCategory:'matchday_competition', amountNative:16.24667, disclosureLevel:'aggregated' },
    { rawLabel:'Inntekter NM Cup', normalizedCategory:'matchday_competition', amountNative:3.4133, disclosureLevel:'aggregated' },
    { rawLabel:'Oppgjør NM Cup', normalizedCategory:'matchday_competition', amountNative:1.191959, disclosureLevel:'aggregated' },
    { rawLabel:'Andre inntekter privatkamper etc.', normalizedCategory:'matchday_competition', amountNative:0.068553, disclosureLevel:'aggregated' },
    { rawLabel:'Avtale MF/sponsor', normalizedCategory:'sponsorship_commercial', amountNative:20.110076, disclosureLevel:'aggregated' },
    { rawLabel:'Andre driftsinntekter', normalizedCategory:'other_income', amountNative:3.61533, disclosureLevel:'aggregated' },
    { rawLabel:'Salg spillere/Utleie', normalizedCategory:'player_sales', amountNative:0, disclosureLevel:'aggregated' },
  ],
};
const moldenoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Administrasjon', normalizedCategory:'admin_general_expense', amountNative:-5.501592, disclosureLevel:'aggregated' },
    { rawLabel:'Lønn spillere, trenere, støtteapparat og administrasjon', normalizedCategory:'wages_squad', amountNative:-132.651613, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-18.035924, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad', normalizedCategory:'wages_squad', amountNative:-1.684061, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-2.387713, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter treningsleir/privatkamper', normalizedCategory:'match_organisation_expense', amountNative:-4.636767, disclosureLevel:'aggregated' },
    { rawLabel:'Leie treningsbaner etc.', normalizedCategory:'other_expenses', amountNative:-2.499857, disclosureLevel:'aggregated' },
    { rawLabel:'Sportsrekvisita', normalizedCategory:'other_expenses', amountNative:-4.4567, disclosureLevel:'aggregated' },
    { rawLabel:'Medisinske tjenester og rekvisita', normalizedCategory:'other_expenses', amountNative:-0.209554, disclosureLevel:'aggregated' },
    { rawLabel:'Andre sportslige kostnader', normalizedCategory:'other_expenses', amountNative:-5.780798, disclosureLevel:'aggregated' },
    { rawLabel:'Avgift Norges Fotballforbund', normalizedCategory:'match_organisation_expense', amountNative:-0.795934, disclosureLevel:'aggregated' },
    { rawLabel:'Annonsering seriekamper', normalizedCategory:'match_organisation_expense', amountNative:-0.507366, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter billettsalg', normalizedCategory:'match_organisation_expense', amountNative:-0.513412, disclosureLevel:'aggregated' },
    { rawLabel:'Andre arrangementkostnader', normalizedCategory:'match_organisation_expense', amountNative:-2.300605, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter cupkamper', normalizedCategory:'match_organisation_expense', amountNative:-0.881392, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter E-cup', normalizedCategory:'match_organisation_expense', amountNative:-4.528245, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter andre arrangement', normalizedCategory:'match_organisation_expense', amountNative:-1.894239, disclosureLevel:'aggregated' },
    { rawLabel:'Reisekostnader seriekamper', normalizedCategory:'match_organisation_expense', amountNative:-5.705333, disclosureLevel:'aggregated' },
    { rawLabel:'Kjøp og leie spillere', normalizedCategory:'other_expenses', amountNative:-8.983537, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter Prosjekt/Tiltak', normalizedCategory:'other_expenses', amountNative:-0.906949, disclosureLevel:'aggregated' },
    { rawLabel:'Andre driftskostnader', normalizedCategory:'other_expenses', amountNative:-4.442223, disclosureLevel:'aggregated' },
    { rawLabel:'Varekjøp og andre kostnader kiosker', normalizedCategory:'other_expenses', amountNative:-1.171795, disclosureLevel:'aggregated' },
    { rawLabel:'Anleggskostnader', normalizedCategory:'admin_general_expense', amountNative:-0.136803, disclosureLevel:'aggregated' },
    { rawLabel:'Nedskrivninger', normalizedCategory:'player_impairment', amountNative:-11.738298, disclosureLevel:'aggregated' },
    { rawLabel:'Tap på fordringer', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger spillerrettigheter', normalizedCategory:'player_amortisation', amountNative:-66.692397, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger varige driftsmidler', normalizedCategory:'depreciation', amountNative:-0.644466, disclosureLevel:'aggregated' },
  ],
  2009: [
    { rawLabel:'Administrasjon', normalizedCategory:'admin_general_expense', amountNative:-1.377829, disclosureLevel:'aggregated' },
    { rawLabel:'Lønn spillere, trenere, støtteapparat og administrasjon', normalizedCategory:'wages_squad', amountNative:-31.009228, disclosureLevel:'aggregated' },
    { rawLabel:'Arbeidsgiveravgift', normalizedCategory:'wages_squad', amountNative:-4.552833, disclosureLevel:'aggregated' },
    { rawLabel:'Pensjonskostnad', normalizedCategory:'wages_squad', amountNative:-0.252, disclosureLevel:'aggregated' },
    { rawLabel:'Andre ytelser', normalizedCategory:'wages_squad', amountNative:-2.95741, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter treningsleir/privatkamper', normalizedCategory:'match_organisation_expense', amountNative:-1.081905, disclosureLevel:'aggregated' },
    { rawLabel:'Leie treningsbaner etc.', normalizedCategory:'other_expenses', amountNative:-0.890371, disclosureLevel:'aggregated' },
    { rawLabel:'Sportsrekvisita', normalizedCategory:'other_expenses', amountNative:-1.020292, disclosureLevel:'aggregated' },
    { rawLabel:'Medisinske tjenester og rekvisita', normalizedCategory:'other_expenses', amountNative:-0.117126, disclosureLevel:'aggregated' },
    { rawLabel:'Andre sportslige kostnader', normalizedCategory:'other_expenses', amountNative:-1.250621, disclosureLevel:'aggregated' },
    { rawLabel:'Baneleie serie- og cupkamper', normalizedCategory:'match_organisation_expense', amountNative:-1.998646, disclosureLevel:'aggregated' },
    { rawLabel:'Avgift Norges Fotballforbund', normalizedCategory:'match_organisation_expense', amountNative:-0.375, disclosureLevel:'aggregated' },
    { rawLabel:'Annonsering seriekamper', normalizedCategory:'match_organisation_expense', amountNative:-0.770853, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter billettsalg', normalizedCategory:'match_organisation_expense', amountNative:-0.635544, disclosureLevel:'aggregated' },
    { rawLabel:'Andre arrangementskostnader', normalizedCategory:'match_organisation_expense', amountNative:-0.95189, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter Cup kamper', normalizedCategory:'match_organisation_expense', amountNative:-1.784291, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter andre arrangement', normalizedCategory:'match_organisation_expense', amountNative:-0.052208, disclosureLevel:'aggregated' },
    { rawLabel:'Reisekostnader seriekamper', normalizedCategory:'match_organisation_expense', amountNative:-1.426654, disclosureLevel:'aggregated' },
    { rawLabel:'Kjøp spillere/Leie spillere', normalizedCategory:'other_expenses', amountNative:-0.041443, disclosureLevel:'aggregated' },
    { rawLabel:'Utgifter Prosjekt/Tiltak', normalizedCategory:'other_expenses', amountNative:-0.366984, disclosureLevel:'aggregated' },
    { rawLabel:'Andre driftskostnader', normalizedCategory:'other_expenses', amountNative:-0.000388, disclosureLevel:'aggregated' },
    { rawLabel:'Varekjøp og andre kostnader kiosker', normalizedCategory:'other_expenses', amountNative:-1.196562, disclosureLevel:'aggregated' },
    { rawLabel:'Anleggskostnader', normalizedCategory:'admin_general_expense', amountNative:-0.058082, disclosureLevel:'aggregated' },
    { rawLabel:'Avskrivninger', normalizedCategory:'depreciation', amountNative:-0.252668, disclosureLevel:'aggregated' },
    { rawLabel:'Tap på fordringer', normalizedCategory:'other_expenses', amountNative:-0.011566, disclosureLevel:'aggregated' },
  ],
};
const moldenoFiscalYearMeta = {
  2025: {
    currency:'NOK', fxRef:'NOK@2025-12-31',
    sourceId:'molde-no-aarsregnskap-fotballklubb-fli-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:81.320126, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:129.145432, officialTotalExpenses:289.687573, officialPAT:-79.222013,
  },
  2009: {
    currency:'NOK', fxRef:'NOK@2009-12-31',
    sourceId:'molde-no-aarsregnskap-fotballklubb-fli-2009',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.003848, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:55.19386, officialTotalExpenses:54.432394, officialPAT:0.757619,
  },
};
const moldenoPresupuestoOverlayByYear = {};

const moldenoPasesData = [];
const moldenoResultadosData = {};
const moldenoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['molde-no'] = {
  revenueLinesByYear: moldenoRevenueLinesByYear, expenseLinesByYear: moldenoExpenseLinesByYear,
  fiscalYearMeta: moldenoFiscalYearMeta, pasesData: moldenoPasesData,
  resultadosData: moldenoResultadosData, titulosData: moldenoTitulosData,
  presupuestoOverlayByYear: moldenoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'molde-no-aarsregnskap-fotballklubb-fli-2025': {
    id:'molde-no-aarsregnskap-fotballklubb-fli-2025', clubId:'molde-no',
    title:'Molde Fotballklubb — aarsregnskap-fotballklubb-fli-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'molde-no-aarsregnskap-fotballklubb-fli-2009': {
    id:'molde-no-aarsregnskap-fotballklubb-fli-2009', clubId:'molde-no',
    title:'Molde Fotballklubb — aarsregnskap-fotballklubb-fli-2009 (ejercicio 2009)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['molde-no'] = null;
