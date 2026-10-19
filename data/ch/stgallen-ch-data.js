const stgallenchRevenueLinesByYear = {
  2025: [
    { rawLabel:'Erträge aus Transfers und Leihgebühren', normalizedCategory:'player_sales', amountNative:3.353, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse Erträge inklusive Swiss Football League', normalizedCategory:'other_income', amountNative:9.512, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge aus FutureChampsOstschweiz', normalizedCategory:'youth_football', amountNative:1.416, disclosureLevel:'aggregated' },
    { rawLabel:'Erträge von Gönnern und Mitgliedern', normalizedCategory:'member_dues', amountNative:1.246, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Fussballspielen', normalizedCategory:'matchday_competition', amountNative:11.607, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Werbung und Sponsoring', normalizedCategory:'sponsorship_commercial', amountNative:9.547, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Hospitality und Logen', normalizedCategory:'stadium_other', amountNative:5.167, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:2.32, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Drittveranstaltungen', normalizedCategory:'other_income', amountNative:0.107, disclosureLevel:'aggregated' },
    { rawLabel:'Ertrag aus Conference Arena / Diverse Erträge', normalizedCategory:'other_income', amountNative:1.245, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher Ertrag', normalizedCategory:'other_income', amountNative:0.044, disclosureLevel:'aggregated' },
    { rawLabel:'Veränderung Wertberichtigungen', normalizedCategory:'other_income', amountNative:0.021, disclosureLevel:'aggregated' },
    { rawLabel:'Ertragsminderungen', normalizedCategory:'other_income', amountNative:-0.484, disclosureLevel:'aggregated' },
  ],
};
const stgallenchExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aufwand für Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-4.845, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Transfers', normalizedCategory:'other_expenses', amountNative:-1.378, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Spielorganisation Fussball', normalizedCategory:'match_organisation_expense', amountNative:-3.701, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Catering', normalizedCategory:'other_expenses', amountNative:-2.164, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Werbung und Sponsoring', normalizedCategory:'admin_general_expense', amountNative:-1.005, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Mechandising', normalizedCategory:'other_expenses', amountNative:-1.876, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Drittveranstaltungen', normalizedCategory:'other_expenses', amountNative:-0.012, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand für Conference Arena / Diverses', normalizedCategory:'other_expenses', amountNative:-0.074, disclosureLevel:'aggregated' },
    { rawLabel:'Personalaufwand', normalizedCategory:'wages_squad', amountNative:-20.833, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsaufwand', normalizedCategory:'admin_general_expense', amountNative:-5.372, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Sachanlagen', normalizedCategory:'depreciation', amountNative:-1.362, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-2.059, disclosureLevel:'aggregated' },
  ],
};
const stgallenchFiscalYearMeta = {
  2025: {
    currency:'CHF', fxRef:'CHF@2025-06-30',
    sourceId:'stgallen-ch-geschaeftsbericht-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.292, tax:-0.011,
    extraRows: [
      {label:'Finanzerfolg', value:-0.292},
      {label:'Steuern', value:-0.011},
    ],
    incluidoEn:{"broadcasting":{"en":"other_income","posible":true}},
    grossDebt:null, cash:null,
    officialTotalRevenue:45.101, officialTotalExpenses:44.681, officialPAT:0.117,
  },
};
const stgallenchPresupuestoOverlayByYear = {};

const stgallenchPasesData = [];
const stgallenchResultadosData = {};
const stgallenchTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['stgallen-ch'] = {
  revenueLinesByYear: stgallenchRevenueLinesByYear, expenseLinesByYear: stgallenchExpenseLinesByYear,
  fiscalYearMeta: stgallenchFiscalYearMeta, pasesData: stgallenchPasesData,
  resultadosData: stgallenchResultadosData, titulosData: stgallenchTitulosData,
  presupuestoOverlayByYear: stgallenchPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'stgallen-ch-geschaeftsbericht-2024-25': {
    id:'stgallen-ch-geschaeftsbericht-2024-25', clubId:'stgallen-ch',
    title:'FC St.Gallen AG — geschaeftsbericht-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['stgallen-ch'] = null;
