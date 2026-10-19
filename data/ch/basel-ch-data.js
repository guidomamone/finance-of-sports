const baselchRevenueLinesByYear = {
  2021: [
    { rawLabel:'Aus Meisterschaft', normalizedCategory:'competition_bonus', amountNative:7.981134, disclosureLevel:'aggregated' },
    { rawLabel:'Aus UEFA Spielen', normalizedCategory:'competition_bonus', amountNative:1.048567, disclosureLevel:'aggregated' },
    { rawLabel:'Aus Cup Spielen', normalizedCategory:'matchday_competition', amountNative:0.0125, disclosureLevel:'aggregated' },
    { rawLabel:'Aus übrigen Spielen', normalizedCategory:'matchday_competition', amountNative:0.047434, disclosureLevel:'aggregated' },
    { rawLabel:'Business Seats', normalizedCategory:'matchday_competition', amountNative:3.999364, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoring, Werbung', normalizedCategory:'sponsorship_commercial', amountNative:7.330193, disclosureLevel:'aggregated' },
    { rawLabel:'Transferertrag', normalizedCategory:'player_sales', amountNative:6.646289, disclosureLevel:'aggregated' },
    { rawLabel:'TV-Entschädigungen', normalizedCategory:'broadcasting', amountNative:2.852589, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising, Licensing', normalizedCategory:'sponsorship_commercial', amountNative:1.92686, disclosureLevel:'aggregated' },
    { rawLabel:'Catering', normalizedCategory:'other_income', amountNative:0.452982, disclosureLevel:'aggregated' },
    { rawLabel:'Events Non-Matchday', normalizedCategory:'stadium_other', amountNative:1.272981, disclosureLevel:'aggregated' },
    { rawLabel:'Verbandseinnahmen', normalizedCategory:'competition_bonus', amountNative:10.224897, disclosureLevel:'aggregated' },
    { rawLabel:'Einnahmen Leistungsfussball Nachwuchs', normalizedCategory:'youth_football', amountNative:2.321983, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsertrag', normalizedCategory:'other_income', amountNative:13.436399, disclosureLevel:'aggregated' },
  ],
  2005: [
    { rawLabel:'aus Meisterschaft', normalizedCategory:'competition_bonus', amountNative:10.830075, disclosureLevel:'aggregated' },
    { rawLabel:'aus Champions-League / UEFA-Cup', normalizedCategory:'competition_bonus', amountNative:4.973398, disclosureLevel:'aggregated' },
    { rawLabel:'aus Cup-Spielen', normalizedCategory:'matchday_competition', amountNative:0.31707, disclosureLevel:'aggregated' },
    { rawLabel:'aus übrigen Spielen', normalizedCategory:'matchday_competition', amountNative:0.007435, disclosureLevel:'aggregated' },
    { rawLabel:'Business Seats', normalizedCategory:'matchday_competition', amountNative:6.330115, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoring, Werbung', normalizedCategory:'sponsorship_commercial', amountNative:4.87985, disclosureLevel:'aggregated' },
    { rawLabel:'TV-Entschädigungen', normalizedCategory:'broadcasting', amountNative:1.70406, disclosureLevel:'aggregated' },
    { rawLabel:'Leihertrag, Ausbildungsentschädigungen', normalizedCategory:'player_sales', amountNative:0.888822, disclosureLevel:'aggregated' },
    { rawLabel:'Mitglieder', normalizedCategory:'member_dues', amountNative:0.451475, disclosureLevel:'aggregated' },
    { rawLabel:'Verbandseinnahmen', normalizedCategory:'competition_bonus', amountNative:0.333841, disclosureLevel:'aggregated' },
    { rawLabel:'Diverses', normalizedCategory:'other_income', amountNative:7.501273, disclosureLevel:'aggregated' },
  ],
  2006: [
    { rawLabel:'aus Meisterschaft', normalizedCategory:'matchday_competition', amountNative:9.959965, disclosureLevel:'aggregated' },
    { rawLabel:'aus UEFA-Spielen', normalizedCategory:'competition_bonus', amountNative:3.714242, disclosureLevel:'aggregated' },
    { rawLabel:'aus Cup-Spielen', normalizedCategory:'matchday_competition', amountNative:0.080283, disclosureLevel:'aggregated' },
    { rawLabel:'aus übrigen Spielen', normalizedCategory:'matchday_competition', amountNative:0.004647, disclosureLevel:'aggregated' },
    { rawLabel:'Business Seats', normalizedCategory:'matchday_competition', amountNative:6.087139, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoring, Werbung', normalizedCategory:'sponsorship_commercial', amountNative:7.349048, disclosureLevel:'aggregated' },
    { rawLabel:'Transferertrag', normalizedCategory:'player_sales', amountNative:17.791559, disclosureLevel:'aggregated' },
    { rawLabel:'TV-Entschädigungen', normalizedCategory:'broadcasting', amountNative:3.367135, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising, Licensing', normalizedCategory:'sponsorship_commercial', amountNative:0.425898, disclosureLevel:'aggregated' },
    { rawLabel:'Verbandseinnahmen', normalizedCategory:'competition_bonus', amountNative:0.729116, disclosureLevel:'aggregated' },
    { rawLabel:'Einnahmen Leistungsfussball Nachwuchs', normalizedCategory:'youth_football', amountNative:0.453721, disclosureLevel:'aggregated' },
    { rawLabel:'Diverses', normalizedCategory:'other_income', amountNative:1.396069, disclosureLevel:'aggregated' },
  ],
};
const baselchExpenseLinesByYear = {
  2021: [
    { rawLabel:'Warenaufwand', normalizedCategory:'other_expenses', amountNative:-0.685847, disclosureLevel:'aggregated' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-35.343443, disclosureLevel:'aggregated' },
    { rawLabel:'Organisationskosten Heimspiele', normalizedCategory:'match_organisation_expense', amountNative:-10.229066, disclosureLevel:'aggregated' },
    { rawLabel:'Übriger Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-3.389036, disclosureLevel:'aggregated' },
    { rawLabel:'Transferaufwand', normalizedCategory:'player_amortisation', amountNative:-4.448168, disclosureLevel:'aggregated' },
    { rawLabel:'Werbung', normalizedCategory:'admin_general_expense', amountNative:-1.706478, disclosureLevel:'aggregated' },
    { rawLabel:'Administration', normalizedCategory:'admin_general_expense', amountNative:-4.526699, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand Leistungsfussball Nachwuchs', normalizedCategory:'youth_other_sports_expense', amountNative:-0.570728, disclosureLevel:'aggregated' },
    { rawLabel:'Defizitgarantie FC Basel 1893', normalizedCategory:'other_expenses', amountNative:-0.880296, disclosureLevel:'aggregated' },
    { rawLabel:'Übriger Aufwand', normalizedCategory:'other_expenses', amountNative:-0.631843, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen auf Transferrechte', normalizedCategory:'player_amortisation', amountNative:-3.991999, disclosureLevel:'aggregated' },
    { rawLabel:'Sonderabschreibungen auf Transferrechte', normalizedCategory:'player_impairment', amountNative:-5.386974, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen auf Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.354187, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen auf immaterielle Anlagen', normalizedCategory:'other_amortisation', amountNative:-0.35312, disclosureLevel:'aggregated' },
  ],
  2005: [
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-25.078668, disclosureLevel:'aggregated' },
    { rawLabel:'Organisationskosten Heimspiele', normalizedCategory:'match_organisation_expense', amountNative:-7.835065, disclosureLevel:'aggregated' },
    { rawLabel:'Übriger Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-1.847381, disclosureLevel:'aggregated' },
    { rawLabel:'Leihaufwand, Ausbildungsentschädigungen', normalizedCategory:'player_amortisation', amountNative:-0.09487, disclosureLevel:'aggregated' },
    { rawLabel:'Werbung', normalizedCategory:'admin_general_expense', amountNative:-1.099846, disclosureLevel:'aggregated' },
    { rawLabel:'Administration', normalizedCategory:'admin_general_expense', amountNative:-0.979456, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen', normalizedCategory:'depreciation', amountNative:-0.319066, disclosureLevel:'aggregated' },
    { rawLabel:'Übriger Aufwand', normalizedCategory:'other_expenses', amountNative:-1.590286, disclosureLevel:'aggregated' },
    { rawLabel:'Verlustabdeckung FC Basel Marketing AG', normalizedCategory:'exceptional_items', amountNative:0.47, disclosureLevel:'aggregated' },
  ],
  2006: [
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-24.096494, disclosureLevel:'aggregated' },
    { rawLabel:'Organisationskosten Heimspiele', normalizedCategory:'match_organisation_expense', amountNative:-9.16111, disclosureLevel:'aggregated' },
    { rawLabel:'Übriger Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-3.495099, disclosureLevel:'aggregated' },
    { rawLabel:'Transferaufwand', normalizedCategory:'player_amortisation', amountNative:-9.538502, disclosureLevel:'aggregated' },
    { rawLabel:'Werbung', normalizedCategory:'admin_general_expense', amountNative:-1.223833, disclosureLevel:'aggregated' },
    { rawLabel:'Administration', normalizedCategory:'admin_general_expense', amountNative:-1.848214, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen', normalizedCategory:'depreciation', amountNative:-0.268995, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand Leistungsfussball Nachwuchs', normalizedCategory:'youth_other_sports_expense', amountNative:-0.770873, disclosureLevel:'aggregated' },
    { rawLabel:'Übriger Aufwand', normalizedCategory:'other_expenses', amountNative:-0.877673, disclosureLevel:'aggregated' },
  ],
};
const baselchFiscalYearMeta = {
  2021: {
    currency:'CHF', fxRef:'CHF@2021-12-31',
    sourceId:'basel-ch-geschaeftsbericht-unternehmen-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.419465, tax:-0.002,
    extraRows: [
      {label:'Finanzertrag', value:1.800155},
      {label:'Finanzaufwand', value:-2.21962},
      {label:'Steuern', value:-0.002},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:59.554172, officialTotalExpenses:73.497884, officialPAT:-14.365177,
  },
  2005: {
    currency:'CHF', fxRef:'CHF@2005-12-31',
    sourceId:'basel-ch-geschaeftsbericht-2005',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.263711, tax:-0.005293,
    extraRows: [
      {label:'Finanzertrag', value:0.310974},
      {label:'Finanzaufwand', value:-0.047263},
      {label:'Steuern', value:-0.005293},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:38.217415, officialTotalExpenses:38.844639, officialPAT:0.101193,
  },
  2006: {
    currency:'CHF', fxRef:'CHF@2006-12-31',
    sourceId:'basel-ch-geschaeftsbericht-2006',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.046748, tax:-0.053385,
    extraRows: [
      {label:'Finanzertrag', value:0.222536},
      {label:'Finanzaufwand', value:-0.175788},
      {label:'Steuern', value:-0.053385},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:51.358822, officialTotalExpenses:51.280793, officialPAT:0.071392,
  },
};
const baselchPresupuestoOverlayByYear = {};

const baselchPasesData = [];
const baselchResultadosData = {};
const baselchTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['basel-ch'] = {
  revenueLinesByYear: baselchRevenueLinesByYear, expenseLinesByYear: baselchExpenseLinesByYear,
  fiscalYearMeta: baselchFiscalYearMeta, pasesData: baselchPasesData,
  resultadosData: baselchResultadosData, titulosData: baselchTitulosData,
  presupuestoOverlayByYear: baselchPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'basel-ch-geschaeftsbericht-unternehmen-2021': {
    id:'basel-ch-geschaeftsbericht-unternehmen-2021', clubId:'basel-ch',
    title:'FC Basel 1893 AG — geschaeftsbericht-unternehmen-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'basel-ch-geschaeftsbericht-2005': {
    id:'basel-ch-geschaeftsbericht-2005', clubId:'basel-ch',
    title:'FC Basel 1893 AG — geschaeftsbericht-2005 (ejercicio 2005)',
    type:'official_balance_sheet', reliability:'primary',
  },
  'basel-ch-geschaeftsbericht-2006': {
    id:'basel-ch-geschaeftsbericht-2006', clubId:'basel-ch',
    title:'FC Basel 1893 AG — geschaeftsbericht-2006 (ejercicio 2006)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['basel-ch'] = null;
