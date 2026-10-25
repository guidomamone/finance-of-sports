// GENERADO desde data/de/hoffenheim-de.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const hoffenheimDeRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Medienrechte","normalizedCategory":"broadcasting","amountNative":58.005,"disclosureLevel":"detailed"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":23.109,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfers","normalizedCategory":"player_sales","amountNative":44.873,"disclosureLevel":"detailed"},
    {"rawLabel":"Handel","normalizedCategory":"sponsorship_commercial","amountNative":2.98,"disclosureLevel":"detailed"},
    {"rawLabel":"Spielbetrieb","normalizedCategory":"matchday_competition","amountNative":15.145,"disclosureLevel":"detailed"},
    {"rawLabel":"Umsatzerlöse (resto, sin desglose adicional en el documento)","normalizedCategory":"other_income","amountNative":5.104596,"disclosureLevel":"aggregated_residual"},
    {"rawLabel":"Sonstige betriebliche Erträge","normalizedCategory":"other_income","amountNative":1.57509,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Medienrechte","normalizedCategory":"broadcasting","amountNative":84.099,"disclosureLevel":"detailed"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":22.986,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfers","normalizedCategory":"player_sales","amountNative":37.679,"disclosureLevel":"detailed"},
    {"rawLabel":"Handel","normalizedCategory":"sponsorship_commercial","amountNative":3.589,"disclosureLevel":"detailed"},
    {"rawLabel":"Spielbetrieb","normalizedCategory":"matchday_competition","amountNative":17.312,"disclosureLevel":"detailed"},
    {"rawLabel":"Umsatzerlöse (resto, sin desglose adicional en el documento)","normalizedCategory":"other_income","amountNative":6.276496,"disclosureLevel":"aggregated_residual"},
    {"rawLabel":"Sonstige betriebliche Erträge","normalizedCategory":"other_income","amountNative":1.456315,"disclosureLevel":"detailed"},
  ],
};

const hoffenheimDeExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Materialaufwand","normalizedCategory":"other_expenses","amountNative":-3.389566,"disclosureLevel":"detailed"},
    {"rawLabel":"Personalaufwand","normalizedCategory":"wages_squad","amountNative":-90.996243,"disclosureLevel":"detailed","items":[["Löhne und Gehälter",-85.06454],["soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung",-5.931703]]},
    {"rawLabel":"Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen; überwiegend Spielervermögen), laut Konzern-Anlagenspiegel","normalizedCategory":"player_amortisation","amountNative":-25.823,"disclosureLevel":"detailed"},
    {"rawLabel":"Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Konzern-Anlagenspiegel","normalizedCategory":"depreciation","amountNative":-4.315809,"disclosureLevel":"detailed","items":[["Grundstücke, grundstücksgleiche Rechte etc.",-3.143],["technische Anlagen und Maschinen",-0.391],["andere Anlagen, Betriebs- und Geschäftsausstattung",-0.783]]},
    {"rawLabel":"Sonstige betriebliche Aufwendungen","normalizedCategory":"other_expenses","amountNative":-54.148713,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Materialaufwand","normalizedCategory":"other_expenses","amountNative":-3.996119,"disclosureLevel":"detailed"},
    {"rawLabel":"Personalaufwand","normalizedCategory":"wages_squad","amountNative":-94.870639,"disclosureLevel":"detailed","items":[["Löhne und Gehälter",-88.032356],["soziale Abgaben und Aufwendungen für Altersversorgung und für Unterstützung",-6.838283]]},
    {"rawLabel":"Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — I. Immaterielle Vermögensgegenstände (entgeltlich erworbene Konzessionen; überwiegend Spielervermögen), laut Konzern-Anlagenspiegel","normalizedCategory":"player_amortisation","amountNative":-39.445,"disclosureLevel":"detailed"},
    {"rawLabel":"Abschreibungen auf immaterielle Vermögensgegenstände des Anlagevermögens und Sachanlagen — II. Sachanlagen, laut Konzern-Anlagenspiegel","normalizedCategory":"depreciation","amountNative":-4.440434,"disclosureLevel":"detailed","items":[["Grundstücke, grundstücksgleiche Rechte etc.",-3.187],["technische Anlagen und Maschinen",-0.263],["andere Anlagen, Betriebs- und Geschäftsausstattung",-0.991]]},
    {"rawLabel":"Sonstige betriebliche Aufwendungen","normalizedCategory":"other_expenses","amountNative":-60.442856,"disclosureLevel":"detailed"},
  ],
};

const hoffenheimDeFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"hoffenheim-de-konzernabschluss-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":4.718732,"tax":24.430913,"grossDebt":58.277885,"cash":35.578492,"officialTotalRevenue":150.791686,"officialTotalExpenses":178.673331,"officialPAT":1.268,"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"hoffenheim-de-konzernabschluss-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":3.512087,"tax":27.38542,"grossDebt":79.418182,"cash":41.681699,"officialTotalRevenue":173.397811,"officialTotalExpenses":203.195048,"officialPAT":1.10027,"baseIngreso":"full"},
};

const hoffenheimDePresupuestoOverlayByYear = {};

const hoffenheimDePasesData = [];
const hoffenheimDeResultadosData = {};
const hoffenheimDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["hoffenheim-de"] = {
  revenueLinesByYear: hoffenheimDeRevenueLinesByYear, expenseLinesByYear: hoffenheimDeExpenseLinesByYear,
  fiscalYearMeta: hoffenheimDeFiscalYearMeta, pasesData: hoffenheimDePasesData,
  resultadosData: hoffenheimDeResultadosData, titulosData: hoffenheimDeTitulosData,
  presupuestoOverlayByYear: hoffenheimDePresupuestoOverlayByYear,
};

Object.assign(sources, {"hoffenheim-de-konzernabschluss-2024":{"id":"hoffenheim-de-konzernabschluss-2024","clubId":"hoffenheim-de","title":"Konzernabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024","type":"official_balance_sheet","reliability":"primary"},"hoffenheim-de-konzernabschluss-2025":{"id":"hoffenheim-de-konzernabschluss-2025","clubId":"hoffenheim-de","title":"Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["hoffenheim-de"] = {"actual":{"nombre":"Gestión actual (Dr. Markus Schütz, Vorsitzender der Geschäftsführung desde 8/7/2024)","firstYear":2024,"lastYear":2025}};

memberCountByClub["hoffenheim-de"] = null;
