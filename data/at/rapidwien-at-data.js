const rapidwienatRevenueLinesByYear = {
  2024: [
    { rawLabel:'Umsatzerlöse', normalizedCategory:'lump_football_operations', amountNative:41.436186, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge aus dem Abgang von Anlagevermögen', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge aus der Auflösung von Rückstellungen', normalizedCategory:'other_income', amountNative:0.934896, disclosureLevel:'aggregated' },
    { rawLabel:'Übrige', normalizedCategory:'other_income', amountNative:2.004412, disclosureLevel:'aggregated' },
  ],
};
const rapidwienatExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aufwendungen Spielbetrieb, Transfers etc.', normalizedCategory:'match_organisation_expense', amountNative:-3.921936, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwendungen für bezogene Leistungen', normalizedCategory:'other_expenses', amountNative:-7.940708, disclosureLevel:'aggregated' },
    { rawLabel:'Löhne & Gehälter', normalizedCategory:'wages_squad', amountNative:-16.405524, disclosureLevel:'aggregated' },
    { rawLabel:'Soziale Aufwendungen', normalizedCategory:'wages_squad', amountNative:-3.983233, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen', normalizedCategory:'depreciation', amountNative:-3.786141, disclosureLevel:'aggregated' },
    { rawLabel:'Steuern, soweit sie nicht unter Steuern vom Einkommen fallen', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Übrige', normalizedCategory:'other_expenses', amountNative:-6.950469, disclosureLevel:'aggregated' },
  ],
};
const rapidwienatFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'rapidwien-at-geschaeftsbericht-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.385647, tax:0.192648,
    extraRows: [
      {label:'Sonstige Zinsen und ähnliche Erträge', value:0.270282},
      {label:'Abschreibungen auf Finanzanlagen', value:-0.108977},
      {label:'Zinsen und ähnliche Aufwendungen', value:-1.546952},
      {label:'Steuern vom Einkommen', value:0.192648},
    ],
    sinDesglose: [
      {renglon:'Umsatzerlöse', lado:'revenue', importe:41.436186, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:44.375494, officialTotalExpenses:42.988011, officialPAT:0.194484,
  },
};
const rapidwienatPresupuestoOverlayByYear = {};

const rapidwienatPasesData = [];
const rapidwienatResultadosData = {};
const rapidwienatTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rapidwien-at'] = {
  revenueLinesByYear: rapidwienatRevenueLinesByYear, expenseLinesByYear: rapidwienatExpenseLinesByYear,
  fiscalYearMeta: rapidwienatFiscalYearMeta, pasesData: rapidwienatPasesData,
  resultadosData: rapidwienatResultadosData, titulosData: rapidwienatTitulosData,
  presupuestoOverlayByYear: rapidwienatPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rapidwien-at-geschaeftsbericht-2023-24': {
    id:'rapidwien-at-geschaeftsbericht-2023-24', clubId:'rapidwien-at',
    title:'SK Rapid GmbH — geschaeftsbericht-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['rapidwien-at'] = null;
