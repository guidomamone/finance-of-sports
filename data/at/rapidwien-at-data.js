const rapidwienatRevenueLinesByYear = {
  2024: [
    { rawLabel:'Umsatzerlöse', normalizedCategory:'lump_football_operations', amountNative:41.436186, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge aus dem Abgang von Anlagevermögen', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge aus der Auflösung von Rückstellungen', normalizedCategory:'other_income', amountNative:0.934896, disclosureLevel:'aggregated' },
    { rawLabel:'Übrige', normalizedCategory:'other_income', amountNative:2.004412, disclosureLevel:'aggregated' },
  ],
  2013: [
    { rawLabel:'Ticketing', normalizedCategory:'matchday_competition', amountNative:6.671377, disclosureLevel:'aggregated' },
    { rawLabel:'+ Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:7.582439, disclosureLevel:'aggregated' },
    { rawLabel:'+ Hospitality (VIP)', normalizedCategory:'matchday_competition', amountNative:0.924482, disclosureLevel:'aggregated' },
    { rawLabel:'+ Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:2.057954, disclosureLevel:'aggregated' },
    { rawLabel:'+ Rechteverwertung', normalizedCategory:'broadcasting', amountNative:3.992629, disclosureLevel:'aggregated' },
    { rawLabel:'+ Sonstige Erlöse', normalizedCategory:'other_income', amountNative:2.401842, disclosureLevel:'aggregated' },
    { rawLabel:'Transfererlöse', normalizedCategory:'player_sales', amountNative:1.291147, disclosureLevel:'aggregated' },
    { rawLabel:'a.o. Ergebnis', normalizedCategory:'other_income', amountNative:0.500094, disclosureLevel:'aggregated' },
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
  2013: [
    { rawLabel:'Personalaufwand Sport', normalizedCategory:'wages_squad', amountNative:-10.232786, disclosureLevel:'aggregated' },
    { rawLabel:'+ Sonstiger Personalaufwand', normalizedCategory:'wages_squad', amountNative:-2.267346, disclosureLevel:'aggregated' },
    { rawLabel:'Umsetzung Sponsorleistungen', normalizedCategory:'admin_general_expense', amountNative:-0.585346, disclosureLevel:'aggregated' },
    { rawLabel:'+ Aufwand Heimspiele', normalizedCategory:'match_organisation_expense', amountNative:-2.00637, disclosureLevel:'aggregated' },
    { rawLabel:'+ Aufwand Hospitality VIP', normalizedCategory:'other_expenses', amountNative:-0.569035, disclosureLevel:'aggregated' },
    { rawLabel:'+ Wareneinsatz Merchandising', normalizedCategory:'other_expenses', amountNative:-1.202881, disclosureLevel:'aggregated' },
    { rawLabel:'+ Eigene Medien und Produktionskosten', normalizedCategory:'other_expenses', amountNative:-0.323565, disclosureLevel:'aggregated' },
    { rawLabel:'Abgaben, Gebühren & Strafen', normalizedCategory:'admin_general_expense', amountNative:-0.146398, disclosureLevel:'aggregated' },
    { rawLabel:'+ Spiel- und Trainingsbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-1.921012, disclosureLevel:'aggregated' },
    { rawLabel:'+ Management-Gebühren und Vermittlungsprovisionen', normalizedCategory:'other_expenses', amountNative:-0.50205, disclosureLevel:'aggregated' },
    { rawLabel:'+ Stadion-, Miet- und Instandhaltungsaufwand', normalizedCategory:'admin_general_expense', amountNative:-2.022204, disclosureLevel:'aggregated' },
    { rawLabel:'+ Klubservice, Events, PR und Marketing', normalizedCategory:'admin_general_expense', amountNative:-0.867967, disclosureLevel:'aggregated' },
    { rawLabel:'+ Verwaltung-, Versicherungs- und sonst. Aufwand', normalizedCategory:'admin_general_expense', amountNative:-1.304881, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen für Abnutzung', normalizedCategory:'depreciation', amountNative:-0.494352, disclosureLevel:'aggregated' },
    { rawLabel:'Transferaufwendungen', normalizedCategory:'player_amortisation', amountNative:-0.636162, disclosureLevel:'aggregated' },
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
  2013: {
    currency:'EUR', fxRef:'EUR@2013-06-30',
    sourceId:'rapidwien-at-geschaeftsbericht-2010-11-2012-13',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.001471, tax:-0.003,
    extraRows: [
      {label:'Finanzergebnis', value:0.001471},
      {label:'Steuern aus Erträgen', value:-0.003},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:25.421964, officialTotalExpenses:25.082355, officialPAT:0.33808,
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
  'rapidwien-at-geschaeftsbericht-2010-11-2012-13': {
    id:'rapidwien-at-geschaeftsbericht-2010-11-2012-13', clubId:'rapidwien-at',
    title:'SK Rapid GmbH — geschaeftsbericht-2010-11-2012-13 (ejercicio 2013)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['rapidwien-at'] = null;
