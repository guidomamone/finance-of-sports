const monchengladbachDeRevenueLinesByYear = {
  2023: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:21.268000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:40.189000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Fernseh- und Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:68.206000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transfer', normalizedCategory:'player_sales', amountNative:38.054000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:21.555000, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:8.449000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge (incluye una aproximación del resultado financiero neto — ver comentario de cabecera de este archivo)', normalizedCategory:'other_income', amountNative:0.614710, disclosureLevel:'aggregated_residual' },
  ],
  2024: [
    { rawLabel:'Erlöse aus dem Spielbetrieb', normalizedCategory:'matchday_competition', amountNative:23.407000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Werbung', normalizedCategory:'sponsorship_commercial', amountNative:42.149000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Fernseh- und Hörfunkverwertung', normalizedCategory:'broadcasting', amountNative:64.958000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Transfer', normalizedCategory:'player_sales', amountNative:18.909000, disclosureLevel:'detailed' },
    { rawLabel:'Erlöse aus Handel', normalizedCategory:'sponsorship_commercial', amountNative:24.184000, disclosureLevel:'detailed' },
    { rawLabel:'Umsatzerlöse (resto, sin desglose adicional en el documento)', normalizedCategory:'other_income', amountNative:8.681000, disclosureLevel:'aggregated_residual' },
    { rawLabel:'Sonstige betriebliche Erträge (incluye una aproximación del resultado financiero neto — ver comentario de cabecera de este archivo)', normalizedCategory:'other_income', amountNative:0.104068, disclosureLevel:'aggregated_residual' },
  ],
};

const monchengladbachDeExpenseLinesByYear = {
  2023: [
    { rawLabel:'Aufwendungen für bezogene Waren (Materialaufwand)', normalizedCategory:'other_expenses', amountNative:-12.949497, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-102.008369, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -94.607140], ['Soziale Abgaben', -7.401229],
    ]},
    { rawLabel:'Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres)', normalizedCategory:'player_amortisation', amountNative:-28.187753, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Entgeltlich erworbene Konzessionen + Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-6.445541, disclosureLevel:'detailed', items:[
      ['Entgeltlich erworbene Konzessionen', -0.631081], ['Grundstücke, grundstücksgleiche Rechte und Bauten', -4.529307], ['Andere Anlagen, Betriebs- und Geschäftsausstattung', -1.285153],
    ]},
    { rawLabel:'Sonstige betriebliche Aufwendungen (por diferencia contra el combinado "Material- und sonstige betriebliche Aufwendungen" del Lagebericht)', normalizedCategory:'other_expenses', amountNative:-38.634503, disclosureLevel:'aggregated_residual' },
  ],
  2024: [
    { rawLabel:'Aufwendungen für bezogene Waren (Materialaufwand)', normalizedCategory:'other_expenses', amountNative:-12.918763, disclosureLevel:'detailed' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-98.505634, disclosureLevel:'detailed', items:[
      ['Löhne und Gehälter', -90.415952], ['Soziale Abgaben', -8.089682],
    ]},
    { rawLabel:'Abschreibungen — Spielerwerte, laut Anlagenspiegel (Abschreibung des Geschäftsjahres)', normalizedCategory:'player_amortisation', amountNative:-24.656798, disclosureLevel:'detailed' },
    { rawLabel:'Abschreibungen — Entgeltlich erworbene Konzessionen + Sachanlagen, laut Anlagenspiegel', normalizedCategory:'depreciation', amountNative:-6.132014, disclosureLevel:'detailed', items:[
      ['Entgeltlich erworbene Konzessionen', -0.682733], ['Grundstücke, grundstücksgleiche Rechte und Bauten', -4.306189], ['Andere Anlagen, Betriebs- und Geschäftsausstattung', -1.143093],
    ]},
    { rawLabel:'Sonstige betriebliche Aufwendungen (por diferencia contra el combinado "Material- und sonstige betriebliche Aufwendungen" del Lagebericht)', normalizedCategory:'other_expenses', amountNative:-42.691237, disclosureLevel:'aggregated_residual' },
  ],
};

const monchengladbachDeFiscalYearMeta = {
  2023: {
    currency:'EUR', fxRef:'EUR@2023-12-31',
    sourceId:'monchengladbach-de-jahresabschluss-2023',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:0,
    tax:-5.823501,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:107.105528, cash:0.493335,
    officialTotalRevenue:198.335710, officialTotalExpenses:188.225663,
    officialPAT:4.286546,
  },
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'monchengladbach-de-jahresabschluss-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:0,
    tax:0.079976,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:107.921968, cash:0.740841,
    officialTotalRevenue:182.392068, officialTotalExpenses:184.904447,
    officialPAT:-2.432403,
  },
};

const monchengladbachDePresupuestoOverlayByYear = {};
const monchengladbachDePasesData = [];
const monchengladbachDeResultadosData = {};
const monchengladbachDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['monchengladbach-de'] = {
  revenueLinesByYear: monchengladbachDeRevenueLinesByYear, expenseLinesByYear: monchengladbachDeExpenseLinesByYear,
  fiscalYearMeta: monchengladbachDeFiscalYearMeta, pasesData: monchengladbachDePasesData,
  resultadosData: monchengladbachDeResultadosData, titulosData: monchengladbachDeTitulosData,
  presupuestoOverlayByYear: monchengladbachDePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'monchengladbach-de-jahresabschluss-2023': {
    id:'monchengladbach-de-jahresabschluss-2023', clubId:'monchengladbach-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.01.2023 bis zum 31.12.2023',
    type:'official_balance_sheet', reliability:'primary',
  },
  'monchengladbach-de-jahresabschluss-2024': {
    id:'monchengladbach-de-jahresabschluss-2024', clubId:'monchengladbach-de',
    title:'Jahresabschluss zum Geschäftsjahr vom 01.01.2024 bis zum 31.12.2024',
    type:'official_balance_sheet', reliability:'primary',
  },
});

gestionesByClub['monchengladbach-de'] = {
  actual: { nombre:'Gestión actual', firstYear:2023, lastYear:2024 },
};

memberCountByClub['monchengladbach-de'] = null;
