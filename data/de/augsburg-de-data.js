// GENERADO desde data/de/augsburg-de.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const augsburgDeRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Erlöse aus dem Spielbetrieb","normalizedCategory":"matchday_competition","amountNative":15.541,"disclosureLevel":"detailed"},
    {"rawLabel":"Werbung","normalizedCategory":"sponsorship_commercial","amountNative":17.331,"disclosureLevel":"detailed"},
    {"rawLabel":"TV-Einnahmen","normalizedCategory":"broadcasting","amountNative":48.991,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfers","normalizedCategory":"player_sales","amountNative":15.142,"disclosureLevel":"detailed"},
    {"rawLabel":"Handel","normalizedCategory":"sponsorship_commercial","amountNative":3.426,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstiges","normalizedCategory":"other_income","amountNative":1.806,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstige betriebliche Erträge","normalizedCategory":"other_income","amountNative":5.735098,"disclosureLevel":"detailed"},
    {"rawLabel":"Auflösung Unterschiedsbetrag aus der Kapitalkonsolidierung","normalizedCategory":"other_income","amountNative":1.016697,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Erlöse aus dem Spielbetrieb","normalizedCategory":"matchday_competition","amountNative":18.957,"disclosureLevel":"detailed"},
    {"rawLabel":"Werbung","normalizedCategory":"sponsorship_commercial","amountNative":17.88,"disclosureLevel":"detailed"},
    {"rawLabel":"TV-Einnahmen","normalizedCategory":"broadcasting","amountNative":54.185,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfers","normalizedCategory":"player_sales","amountNative":44.985,"disclosureLevel":"detailed"},
    {"rawLabel":"Handel","normalizedCategory":"sponsorship_commercial","amountNative":8.669,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstiges","normalizedCategory":"other_income","amountNative":1.386,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstige betriebliche Erträge","normalizedCategory":"other_income","amountNative":2.983403,"disclosureLevel":"detailed"},
    {"rawLabel":"Auflösung Unterschiedsbetrag aus der Kapitalkonsolidierung","normalizedCategory":"other_income","amountNative":1.070795,"disclosureLevel":"detailed"},
  ],
};

const augsburgDeExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und für bezogene Waren","normalizedCategory":"other_expenses","amountNative":-9.542689,"disclosureLevel":"detailed"},
    {"rawLabel":"Aufwendungen für bezogene Leistungen","normalizedCategory":"other_expenses","amountNative":-7.71499,"disclosureLevel":"detailed"},
    {"rawLabel":"Personalaufwand","normalizedCategory":"wages_squad","amountNative":-59.59975,"disclosureLevel":"detailed","items":[["Löhne und Gehälter",-55.164649],["soziale Abgaben",-4.435101]]},
    {"rawLabel":"Abschreibungen auf Spielerwerte","normalizedCategory":"player_amortisation","amountNative":-13.878242,"disclosureLevel":"detailed"},
    {"rawLabel":"Abschreibungen auf Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte","normalizedCategory":"other_amortisation","amountNative":-0.02529,"disclosureLevel":"detailed"},
    {"rawLabel":"Abschreibungen auf Sachanlagen","normalizedCategory":"depreciation","amountNative":-3.304668,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstige betriebliche Aufwendungen","normalizedCategory":"other_expenses","amountNative":-22.899545,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstige Steuern","normalizedCategory":"admin_general_expense","amountNative":-0.11763,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Aufwendungen für Roh-, Hilfs- und Betriebsstoffe und für bezogene Waren","normalizedCategory":"other_expenses","amountNative":-10.170114,"disclosureLevel":"detailed"},
    {"rawLabel":"Aufwendungen für bezogene Leistungen","normalizedCategory":"other_expenses","amountNative":-15.460372,"disclosureLevel":"detailed"},
    {"rawLabel":"Personalaufwand","normalizedCategory":"wages_squad","amountNative":-62.294068,"disclosureLevel":"detailed","items":[["Löhne und Gehälter",-57.555509],["soziale Abgaben",-4.73856]]},
    {"rawLabel":"Abschreibungen auf Spielerwerte","normalizedCategory":"player_amortisation","amountNative":-10.974193,"disclosureLevel":"detailed"},
    {"rawLabel":"Abschreibungen auf Konzessionen, gewerbliche Schutzrechte und ähnliche Rechte und Werte","normalizedCategory":"other_amortisation","amountNative":-0.018288,"disclosureLevel":"detailed"},
    {"rawLabel":"Abschreibungen auf Sachanlagen","normalizedCategory":"depreciation","amountNative":-3.617957,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstige betriebliche Aufwendungen","normalizedCategory":"other_expenses","amountNative":-26.082291,"disclosureLevel":"detailed"},
    {"rawLabel":"Sonstige Steuern","normalizedCategory":"admin_general_expense","amountNative":-0.976323,"disclosureLevel":"detailed"},
  ],
};

const augsburgDeFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"augsburg-de-konzernabschluss-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.783082,"tax":0,"grossDebt":35.487566,"cash":15.706786,"officialTotalRevenue":108.989355,"officialTotalExpenses":117.082804,"officialPAT":-7.310368,"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"augsburg-de-konzernabschluss-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.512983,"tax":-2.990126,"grossDebt":27.810112,"cash":14.134535,"officialTotalRevenue":150.115906,"officialTotalExpenses":129.593606,"officialPAT":18.045158,"baseIngreso":"full"},
};

const augsburgDePresupuestoOverlayByYear = {};

const augsburgDePasesData = [];
const augsburgDeResultadosData = {};
const augsburgDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["augsburg-de"] = {
  revenueLinesByYear: augsburgDeRevenueLinesByYear, expenseLinesByYear: augsburgDeExpenseLinesByYear,
  fiscalYearMeta: augsburgDeFiscalYearMeta, pasesData: augsburgDePasesData,
  resultadosData: augsburgDeResultadosData, titulosData: augsburgDeTitulosData,
  presupuestoOverlayByYear: augsburgDePresupuestoOverlayByYear,
};

Object.assign(sources, {"augsburg-de-konzernabschluss-2024":{"id":"augsburg-de-konzernabschluss-2024","clubId":"augsburg-de","title":"Konzernabschluss zum Geschäftsjahr vom 01.07.2023 bis zum 30.06.2024 (Fußball-Club Augsburg 1907 GmbH & Co. KGaA)","type":"official_balance_sheet","reliability":"primary"},"augsburg-de-konzernabschluss-2025":{"id":"augsburg-de-konzernabschluss-2025","clubId":"augsburg-de","title":"Konzernabschluss zum Geschäftsjahr vom 01.07.2024 bis zum 30.06.2025 (Fußball-Club Augsburg 1907 GmbH & Co. KGaA)","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["augsburg-de"] = {"actual":{"nombre":"Gestión actual","firstYear":2024,"lastYear":2025}};

memberCountByClub["augsburg-de"] = null;
