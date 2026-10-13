const kolnDeRevenueLinesByYear = {
  2024: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:25.560000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung', normalizedCategory:'sponsorship_commercial', amountNative:42.637000, disclosureLevel:'detailed' },
    { rawLabel:'Fernseh- u. Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:56.830000, disclosureLevel:'detailed' },
    { rawLabel:'Transfer', normalizedCategory:'player_sales', amountNative:3.232000, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:15.098000, disclosureLevel:'detailed' },
    { rawLabel:'Catering', normalizedCategory:'stadium_other', amountNative:3.667000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige', normalizedCategory:'other_income', amountNative:8.291000, disclosureLevel:'detailed' },
    { rawLabel:'sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:3.656789, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:23.713000, disclosureLevel:'detailed' },
    { rawLabel:'Werbung', normalizedCategory:'sponsorship_commercial', amountNative:40.519000, disclosureLevel:'detailed' },
    { rawLabel:'Fernseh- u. Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:32.481000, disclosureLevel:'detailed' },
    { rawLabel:'Transfer', normalizedCategory:'player_sales', amountNative:12.181000, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:17.023000, disclosureLevel:'detailed' },
    { rawLabel:'Catering', normalizedCategory:'stadium_other', amountNative:9.830000, disclosureLevel:'detailed' },
    { rawLabel:'Sonstige', normalizedCategory:'other_income', amountNative:9.854000, disclosureLevel:'detailed' },
    { rawLabel:'sonstige betriebliche Erträge', normalizedCategory:'other_income', amountNative:5.250221, disclosureLevel:'detailed' },
  ],
};

const kolnDeExpenseLinesByYear = {
  2024: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-10.945362, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-62.750772, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', 56.248597], ['soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', 6.502175],
    ]},
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte sowie Lizenzen an solchen Rechten und Werten; überwiegend Spielervermögen), laut Anlagenspiegel', normalizedCategory:'player_amortisation', amountNative:-6.676510, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-2.178390, disclosureLevel:'detailed', items:[
      ['Grundstücke, grundstücksgleiche Rechte und Bauten einschließlich der Bauten auf fremden Grundstücken', 0.900914],
      ['technische Anlagen und Maschinen', 0.244808],
      ['andere Anlagen, Betriebs- und Geschäftsausstattung', 0.808318],
      ['geleistete Anzahlungen und Anlagen im Bau', 0.224352],
    ]},
    { rawLabel:'sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-60.936524, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Materialaufwand', normalizedCategory:'other_expenses', amountNative:-14.802485, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-55.939221, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', 48.302650], ['soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung', 7.636572],
    ]},
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte sowie Lizenzen an solchen Rechten und Werten; überwiegend Spielervermögen), laut Anlagenspiegel', normalizedCategory:'player_amortisation', amountNative:-7.906983, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-2.552206, disclosureLevel:'detailed', items:[
      ['Grundstücke, grundstücksgleiche Rechte und Bauten einschließlich der Bauten auf fremden Grundstücken', 1.042212],
      ['technische Anlagen und Maschinen', 0.262673],
      ['andere Anlagen, Betriebs- und Geschäftsausstattung', 1.114992],
      ['geleistete Anzahlungen und Anlagen im Bau', 0.132328],
    ]},
    { rawLabel:'sonstige betriebliche Aufwendungen', normalizedCategory:'other_expenses', amountNative:-58.890161, disclosureLevel:'detailed' },
  ],
};

const kolnDeFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'koln-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-1.899231,
    tax:-1.804034,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:37.862442, cash:11.882740,
    officialTotalRevenue:158.971709, officialTotalExpenses:143.487558, officialPAT:11.780886,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'koln-de-jahresabschluss-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-4.209630,
    tax:-1.191767,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:31.996691, cash:6.197026,
    officialTotalRevenue:150.851886, officialTotalExpenses:140.091057, officialPAT:5.359433,
  },
};

const kolnDePresupuestoOverlayByYear = {};

const kolnDePasesData = [];
const kolnDeResultadosData = {};
const kolnDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['koln-de'] = {
  revenueLinesByYear: kolnDeRevenueLinesByYear, expenseLinesByYear: kolnDeExpenseLinesByYear,
  fiscalYearMeta: kolnDeFiscalYearMeta, pasesData: kolnDePasesData,
  resultadosData: kolnDeResultadosData, titulosData: kolnDeTitulosData,
  presupuestoOverlayByYear: kolnDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'koln-de-jahresabschluss-2024': {
    id:'koln-de-jahresabschluss-2024', clubId:'koln-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024 (Auszug aus dem Unternehmensregister)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la 1. FC Köln GmbH & Co. KGaA (HRB 37030, Amtsgericht Köln), no consolidado — no hay Konzernabschluss separado para este club en los años recientes. Descargado vía unternehmensregister.de. PDF con capa de texto nativa. Transcripción completa en Clubes/Alemania/1. FC Köln/jahresabschluss-2023-24.md.',
  },
  'koln-de-jahresabschluss-2025': {
    id:'koln-de-jahresabschluss-2025', clubId:'koln-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025 (Auszug aus dem Unternehmensregister)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jahresabschluss INDIVIDUAL de la 1. FC Köln GmbH & Co. KGaA (HRB 37030, Amtsgericht Köln), no consolidado. Descargado vía unternehmensregister.de. PDF con capa de texto nativa. Transcripción completa en Clubes/Alemania/1. FC Köln/jahresabschluss-2024-25.md.',
  },
});

gestionesByClub['koln-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['koln-de'] = null;
