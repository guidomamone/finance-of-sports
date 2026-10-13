const hamburgersvDeRevenueLinesByYear = {
  2024: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:48.486000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:13.539000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus medialen Verwertungsrechten', normalizedCategory:'broadcasting', amountNative:21.539000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transferentschädigungen', normalizedCategory:'player_sales', amountNative:1.600000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Merchandising und Catering', normalizedCategory:'sponsorship_commercial', amountNative:19.553000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige Erlöse (Drittveranstaltungen, HSV-Fußballschule, Upfrontzahlung, EURO 2024)', normalizedCategory:'other_income', amountNative:18.409000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:2.793000, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:44.360000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:17.510000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus medialen Verwertungsrechten', normalizedCategory:'broadcasting', amountNative:18.482000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transferentschädigungen', normalizedCategory:'player_sales', amountNative:3.827000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Merchandising und Catering', normalizedCategory:'sponsorship_commercial', amountNative:23.753000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige Erlöse (Drittveranstaltungen, HSV-Fußballschule, Upfrontzahlung, EURO 2024/Taylor Swift)', normalizedCategory:'other_income', amountNative:18.589000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:2.525000, disclosureLevel:'detailed' },
  ],
};

const hamburgersvDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren, Bereich Merchandising)', normalizedCategory:'other_expenses', amountNative:-6.624000, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-44.311000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Spielernutzungsrechte', normalizedCategory:'player_amortisation', amountNative:-4.628000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.487000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Aufwendungen aus dem Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-30.114000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Verwaltungsaufwendungen', normalizedCategory:'admin_general_expense', amountNative:-6.327000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Vermarktungsprovisionen', normalizedCategory:'other_expenses', amountNative:-5.698000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Transferaufwendungen', normalizedCategory:'other_expenses', amountNative:-1.679000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen (resto, sin desglose adicional en el documento)', normalizedCategory:'other_expenses', amountNative:-18.198000, disclosureLevel:'aggregated_residual' },
  ],
  2025: [
    { rawLabel:'Materialaufwand (Aufwendungen für bezogene Waren, Bereich Merchandising)', normalizedCategory:'other_expenses', amountNative:-8.922000, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-46.816000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Spielernutzungsrechte', normalizedCategory:'player_amortisation', amountNative:-6.341000, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Sachanlagen', normalizedCategory:'depreciation', amountNative:-3.857000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Aufwendungen aus dem Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-23.862000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Verwaltungsaufwendungen', normalizedCategory:'admin_general_expense', amountNative:-5.999000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Vermarktungsprovisionen', normalizedCategory:'other_expenses', amountNative:-6.588000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen — Transferaufwendungen', normalizedCategory:'other_expenses', amountNative:-2.325000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige betriebliche Aufwendungen (resto, sin desglose adicional en el documento)', normalizedCategory:'other_expenses', amountNative:-18.589000, disclosureLevel:'aggregated_residual' },
  ],
};

const hamburgersvDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'hamburgersv-de-fussball-ag-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1.505000,
    tax:-1.201294,
    profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:125.919000, officialTotalExpenses:121.066000,
    officialPAT:2.146706,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'hamburgersv-de-fussball-ag-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1.110000,
    tax:-0.239952,
    profitOnPlayerSales:0, assetSales:0,
    officialTotalRevenue:129.046000, officialTotalExpenses:123.299000,
    officialPAT:4.397048,
  },
};

const hamburgersvDePresupuestoOverlayByYear = {};
const hamburgersvDePasesData = [];
const hamburgersvDeResultadosData = {};
const hamburgersvDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['hamburgersv-de'] = {
  revenueLinesByYear: hamburgersvDeRevenueLinesByYear, expenseLinesByYear: hamburgersvDeExpenseLinesByYear,
  fiscalYearMeta: hamburgersvDeFiscalYearMeta, pasesData: hamburgersvDePasesData,
  resultadosData: hamburgersvDeResultadosData, titulosData: hamburgersvDeTitulosData,
  presupuestoOverlayByYear: hamburgersvDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'hamburgersv-de-fussball-ag-jahresabschluss-2024': {
    id:'hamburgersv-de-fussball-ag-jahresabschluss-2024', clubId:'hamburgersv-de',
    title:'Jahresabschluss der Hamburger SV Fußball AG zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la Fußball AG (la sociedad que opera el fútbol profesional, distinta del Hamburger Sport-Verein e.V., club social — ver comentario de cabecera de hamburgersv-de-data.js). Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Hamburger SV/fussball-ag-jahresabschluss-2023-24.md. La tabla de GuV/Bilanz llegó muy garbled en la conversión PDF→Markdown; los datos se reconstruyeron cruzando el Lagebericht ("iii) Ertragslage"), que transcribió limpio en prosa.',
  },
  'hamburgersv-de-fussball-ag-jahresabschluss-2025': {
    id:'hamburgersv-de-fussball-ag-jahresabschluss-2025', clubId:'hamburgersv-de',
    title:'Jahresabschluss der HSV Fußball AG & Co. KGaA zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la entidad que opera el fútbol profesional — cambió de forma jurídica de "Fußball AG" a "Fußball AG & Co. KGaA" durante este ejercicio, el documento ya la nombra con la forma nueva. Bajado de unternehmensregister.de. Transcripción completa en Clubes/Alemania/Hamburger SV/fussball-ag-jahresabschluss-2024-25.md. Mismo problema de tabla garbled que el ejercicio 2023/24.',
  },
});

gestionesByClub['hamburgersv-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['hamburgersv-de'] = null;
