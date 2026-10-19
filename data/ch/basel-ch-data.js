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
});

memberCountByClub['basel-ch'] = null;
