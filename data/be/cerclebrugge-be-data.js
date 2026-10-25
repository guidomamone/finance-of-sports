// GENERADO desde data/be/cerclebrugge-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const cerclebruggeBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":19.306482,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen","normalizedCategory":"grants_donations","amountNative":0.001619,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfsopbrengsten — resto sin desglosar","normalizedCategory":"other_income","amountNative":24.415131,"disclosureLevel":"aggregated"},
  ],
};

const cerclebruggeBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-0.793617,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-14.011456,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-19.290772,"disclosureLevel":"detailed","items":[["Bezoldigingen en rechtstreekse sociale voordelen",15.983999],["Werkgeversbijdragen voor sociale verzekeringen",2.406575],["Werkgeverspremies voor bovenwettelijke verzekeringen",0.751715],["Andere personeelskosten",0.148483]]},
    {"rawLabel":"Afschrijvingen op immateriële vaste activa (spelersregistratierechten)","normalizedCategory":"player_amortisation","amountNative":-2.820298,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op materiële vaste activa (incl. diferencia sin explicar contra el total impreso)","normalizedCategory":"depreciation","amountNative":-0.527259,"disclosureLevel":"aggregated"},
    {"rawLabel":"Waardeverminderingen op handelsvorderingen","normalizedCategory":"other_expenses","amountNative":-0.0035,"disclosureLevel":"detailed"},
    {"rawLabel":"Voorzieningen voor risico's en kosten (netto terugneming recurrente)","normalizedCategory":"exceptional_items","amountNative":0.089665,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfskosten — Bedrijfsbelastingen en -taksen","normalizedCategory":"admin_general_expense","amountNative":-0.269439,"disclosureLevel":"detailed"},
    {"rawLabel":"Niet-recurrente bedrijfskosten","normalizedCategory":"exceptional_items","amountNative":-6.012965,"disclosureLevel":"aggregated"},
  ],
};

const cerclebruggeBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"cerclebrugge-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.169022,"tax":-0.162946,"grossDebt":19.177608,"cash":6.900418,"officialTotalRevenue":43.723231,"officialTotalExpenses":37.716341,"officialPAT":0.089666,"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":19.306482,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const cerclebruggeBePresupuestoOverlayByYear = {};

const cerclebruggeBePasesData = [];
const cerclebruggeBeResultadosData = {};
const cerclebruggeBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["cerclebrugge-be"] = {
  revenueLinesByYear: cerclebruggeBeRevenueLinesByYear, expenseLinesByYear: cerclebruggeBeExpenseLinesByYear,
  fiscalYearMeta: cerclebruggeBeFiscalYearMeta, pasesData: cerclebruggeBePasesData,
  resultadosData: cerclebruggeBeResultadosData, titulosData: cerclebruggeBeTitulosData,
  presupuestoOverlayByYear: cerclebruggeBePresupuestoOverlayByYear,
};

Object.assign(sources, {"cerclebrugge-be-jaarrekening-2025":{"id":"cerclebrugge-be-jaarrekening-2025","clubId":"cerclebrugge-be","title":"Jaarrekening van Cercle Brugge KSV BV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["cerclebrugge-be"] = null;
