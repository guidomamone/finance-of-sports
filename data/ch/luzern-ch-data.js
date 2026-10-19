const luzernchRevenueLinesByYear = {
  2025: [
    { rawLabel:'Matchorganisation', normalizedCategory:'matchday_competition', amountNative:10.630351, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoring, Werbung', normalizedCategory:'sponsorship_commercial', amountNative:4.88661, disclosureLevel:'aggregated' },
    { rawLabel:'TV-Entschädigungen Übertragungsrechte', normalizedCategory:'broadcasting', amountNative:1.725586, disclosureLevel:'aggregated' },
    { rawLabel:'Transferertrag', normalizedCategory:'player_sales', amountNative:6.448988, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsoren- und Spendenbeiträge', normalizedCategory:'youth_football', amountNative:0.778095, disclosureLevel:'aggregated' },
    { rawLabel:'SFV-Verbandsbeiträge', normalizedCategory:'youth_football', amountNative:0.842667, disclosureLevel:'aggregated' },
    { rawLabel:'Sport Toto- und J+S-Entschädigungen', normalizedCategory:'youth_football', amountNative:0.273597, disclosureLevel:'aggregated' },
    { rawLabel:'Ausbildungs- und Materialbeiträge Eltern', normalizedCategory:'youth_football', amountNative:0.489205, disclosureLevel:'aggregated' },
    { rawLabel:'Anlässe (FCL-Fussballcamp, Pfingstmaster)', normalizedCategory:'youth_football', amountNative:0.220951, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse Einnahmen', normalizedCategory:'other_income', amountNative:0.184691, disclosureLevel:'aggregated' },
    { rawLabel:'Konferenzen, Events swissporarena', normalizedCategory:'stadium_other', amountNative:0.262196, disclosureLevel:'aggregated' },
    { rawLabel:'Grossevents', normalizedCategory:'stadium_other', amountNative:0.027198, disclosureLevel:'aggregated' },
    { rawLabel:'Fanshop Präsenzgeschäft', normalizedCategory:'sponsorship_commercial', amountNative:0.40506, disclosureLevel:'aggregated' },
    { rawLabel:'Onlineshop, Distanzgeschäft', normalizedCategory:'sponsorship_commercial', amountNative:0.400903, disclosureLevel:'aggregated' },
    { rawLabel:'Ausmietung Stewards', normalizedCategory:'other_income', amountNative:0.320125, disclosureLevel:'aggregated' },
    { rawLabel:'Anpassung Delkredere', normalizedCategory:'other_income', amountNative:-0.165577, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiges', normalizedCategory:'other_income', amountNative:0.151866, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher, einmaliger oder periodenfremder Ertrag', normalizedCategory:'other_income', amountNative:1.995241, disclosureLevel:'aggregated' },
    { rawLabel:'Erfolg aus Equity-Beteiligungen', normalizedCategory:'other_income', amountNative:0.106206, disclosureLevel:'aggregated' },
    { rawLabel:'Minderheitsanteil am Jahresergebnis', normalizedCategory:'other_income', amountNative:0.894582, disclosureLevel:'aggregated' },
  ],
};
const luzernchExpenseLinesByYear = {
  2025: [
    { rawLabel:'Personalkosten inkl. Spesen', normalizedCategory:'wages_squad', amountNative:-7.801561, disclosureLevel:'aggregated' },
    { rawLabel:'Sozialabgaben', normalizedCategory:'wages_squad', amountNative:-0.731539, disclosureLevel:'aggregated' },
    { rawLabel:'Unfallversicherungsprämien', normalizedCategory:'admin_general_expense', amountNative:-0.656243, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkosten inkl. Spesen', normalizedCategory:'wages_squad', amountNative:-2.295763, disclosureLevel:'aggregated' },
    { rawLabel:'Sozialabgaben', normalizedCategory:'wages_squad', amountNative:-0.476048, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkosten inkl. Spesen', normalizedCategory:'wages_squad', amountNative:-2.698085, disclosureLevel:'aggregated' },
    { rawLabel:'Sozialabgaben', normalizedCategory:'wages_squad', amountNative:-0.388641, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkosten inkl. Spesen', normalizedCategory:'wages_squad', amountNative:-0.264083, disclosureLevel:'aggregated' },
    { rawLabel:'Sozialabgaben', normalizedCategory:'wages_squad', amountNative:-0.043278, disclosureLevel:'aggregated' },
    { rawLabel:'Personalkosten inkl. Spesen', normalizedCategory:'wages_squad', amountNative:-0.702108, disclosureLevel:'aggregated' },
    { rawLabel:'Sozialabgaben', normalizedCategory:'wages_squad', amountNative:-0.072929, disclosureLevel:'aggregated' },
    { rawLabel:'Diferencia de redondeo', normalizedCategory:'other_expenses', amountNative:-0.000001, disclosureLevel:'aggregated' },
    { rawLabel:'Miete und Unterhalt Stadion', normalizedCategory:'match_organisation_expense', amountNative:-1.85216, disclosureLevel:'aggregated' },
    { rawLabel:'Sicherheitskosten Matchtag (ohne Stewards)', normalizedCategory:'match_organisation_expense', amountNative:-0.898386, disclosureLevel:'aggregated' },
    { rawLabel:'Abgaben öffentlicher Verkehr', normalizedCategory:'match_organisation_expense', amountNative:-0.35729, disclosureLevel:'aggregated' },
    { rawLabel:'Material und Medical', normalizedCategory:'match_organisation_expense', amountNative:-0.741765, disclosureLevel:'aggregated' },
    { rawLabel:'Ticketing und Vorverkaufsgebühren', normalizedCategory:'match_organisation_expense', amountNative:-0.255265, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand 1. Mannschaften', normalizedCategory:'match_organisation_expense', amountNative:-0.451447, disclosureLevel:'aggregated' },
    { rawLabel:'Diverse Kosten Spielbetrieb', normalizedCategory:'match_organisation_expense', amountNative:-0.519321, disclosureLevel:'aggregated' },
    { rawLabel:'VIP-Cateringkosten Spieltag', normalizedCategory:'match_organisation_expense', amountNative:-1.409829, disclosureLevel:'aggregated' },
    { rawLabel:'Aufwand übrige Wettbewerbe', normalizedCategory:'match_organisation_expense', amountNative:-0.054474, disclosureLevel:'aggregated' },
    { rawLabel:'Rückvergütungen Lieferanten', normalizedCategory:'match_organisation_expense', amountNative:0.451037, disclosureLevel:'aggregated' },
    { rawLabel:'Transferaufwand definitive Übertritte', normalizedCategory:'player_amortisation', amountNative:-0.14906, disclosureLevel:'aggregated' },
    { rawLabel:'Spielervermittlungen und Beratungen', normalizedCategory:'other_expenses', amountNative:-0.714138, disclosureLevel:'aggregated' },
    { rawLabel:'Ausleih- und Ausbildungsentschädigungen', normalizedCategory:'other_expenses', amountNative:-0.248658, disclosureLevel:'aggregated' },
    { rawLabel:'Medien, Kommunikation, Inserate', normalizedCategory:'admin_general_expense', amountNative:-0.766209, disclosureLevel:'aggregated' },
    { rawLabel:'Inhouse TV Spieltag', normalizedCategory:'admin_general_expense', amountNative:-0.12642, disclosureLevel:'aggregated' },
    { rawLabel:'LED-Bandenwerbung Produktion', normalizedCategory:'admin_general_expense', amountNative:-0.20241, disclosureLevel:'aggregated' },
    { rawLabel:'Diverses', normalizedCategory:'admin_general_expense', amountNative:-0.169993, disclosureLevel:'aggregated' },
    { rawLabel:'Nachwuchs-Akademie', normalizedCategory:'youth_other_sports_expense', amountNative:-0.186631, disclosureLevel:'aggregated' },
    { rawLabel:'Anlässe (FCL-Fussballcamp, Pfingstmasters)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.088929, disclosureLevel:'aggregated' },
    { rawLabel:'Materialkosten', normalizedCategory:'youth_other_sports_expense', amountNative:-0.490803, disclosureLevel:'aggregated' },
    { rawLabel:'Spielbetrieb und Mannschaftsaufwand', normalizedCategory:'youth_other_sports_expense', amountNative:-0.483271, disclosureLevel:'aggregated' },
    { rawLabel:'Konferenzen / Events', normalizedCategory:'other_expenses', amountNative:-0.185769, disclosureLevel:'aggregated' },
    { rawLabel:'Grossevents', normalizedCategory:'other_expenses', amountNative:-0.029811, disclosureLevel:'aggregated' },
    { rawLabel:'Merchandising', normalizedCategory:'admin_general_expense', amountNative:-0.434443, disclosureLevel:'aggregated' },
    { rawLabel:'Energie, Wasser und Entsorgung', normalizedCategory:'admin_general_expense', amountNative:-0.356408, disclosureLevel:'aggregated' },
    { rawLabel:'Verwaltungsaufwand', normalizedCategory:'admin_general_expense', amountNative:-0.314164, disclosureLevel:'aggregated' },
    { rawLabel:'IT, Telefon, Internet und Applikationen', normalizedCategory:'admin_general_expense', amountNative:-0.744382, disclosureLevel:'aggregated' },
    { rawLabel:'Sachversicherungen, Abgaben und Gebühren', normalizedCategory:'admin_general_expense', amountNative:-0.088571, disclosureLevel:'aggregated' },
    { rawLabel:'Fahrzeug/Treibstoff', normalizedCategory:'admin_general_expense', amountNative:-0.217991, disclosureLevel:'aggregated' },
    { rawLabel:'Sonstiger Betriebsaufwand', normalizedCategory:'other_expenses', amountNative:-0.066492, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen mobile Sachanlagen', normalizedCategory:'depreciation', amountNative:-0.211164, disclosureLevel:'aggregated' },
    { rawLabel:'Ausserordentlicher, einmaliger oder periodenfremder Aufwand', normalizedCategory:'exceptional_items', amountNative:-0.135065, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Spielerwerte', normalizedCategory:'player_amortisation', amountNative:-1.025811, disclosureLevel:'aggregated' },
    { rawLabel:'Abschreibungen Software, E-Commerce und Markenrechte', normalizedCategory:'other_amortisation', amountNative:-0.171207, disclosureLevel:'aggregated' },
  ],
};
const luzernchFiscalYearMeta = {
  2025: {
    currency:'CHF', fxRef:'CHF@2025-06-30',
    sourceId:'luzern-ch-geschaeftsbericht-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.497769, tax:0.001102,
    extraRows: [
      {label:'Finanzergebnis', value:-0.497769},
      {label:'Direkte Steuern', value:0.001102},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:30.878541, officialTotalExpenses:29.691914, officialPAT:0.554894,
  },
};
const luzernchPresupuestoOverlayByYear = {};

const luzernchPasesData = [];
const luzernchResultadosData = {};
const luzernchTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['luzern-ch'] = {
  revenueLinesByYear: luzernchRevenueLinesByYear, expenseLinesByYear: luzernchExpenseLinesByYear,
  fiscalYearMeta: luzernchFiscalYearMeta, pasesData: luzernchPasesData,
  resultadosData: luzernchResultadosData, titulosData: luzernchTitulosData,
  presupuestoOverlayByYear: luzernchPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'luzern-ch-geschaeftsbericht-2024-25': {
    id:'luzern-ch-geschaeftsbericht-2024-25', clubId:'luzern-ch',
    title:'FCL Holding AG — geschaeftsbericht-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['luzern-ch'] = null;
