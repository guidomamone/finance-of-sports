// GENERADO desde data/be/cerclebrugge-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const cerclebruggeBeRevenueLinesByYear = {
  2019: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":7.390851,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":3.398891,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":9.736952,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":19.306482,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen","normalizedCategory":"grants_donations","amountNative":0.001619,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfsopbrengsten — resto sin desglosar","normalizedCategory":"other_income","amountNative":24.415131,"disclosureLevel":"aggregated"},
  ],
};

const cerclebruggeBeExpenseLinesByYear = {
  2019: [
    {"rawLabel":"Aankopen","normalizedCategory":"other_expenses","amountNative":-0.372407,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorraad: afname (toename) (+)/(-)","normalizedCategory":"other_expenses","amountNative":-0.001875,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-5.254442,"disclosureLevel":"aggregated"},
    {"rawLabel":"620","normalizedCategory":"wages_squad","amountNative":-10.193559,"disclosureLevel":"aggregated"},
    {"rawLabel":"621","normalizedCategory":"wages_squad","amountNative":-0.849578,"disclosureLevel":"aggregated"},
    {"rawLabel":"623","normalizedCategory":"wages_squad","amountNative":-1.397966,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"depreciation","amountNative":-1.240809,"disclosureLevel":"aggregated"},
    {"rawLabel":"Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)","normalizedCategory":"other_expenses","amountNative":-0.80669,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten: toevoegingen (bestellingen en terugnemingen) (+)/(-)","normalizedCategory":"exceptional_items","amountNative":0.016413,"disclosureLevel":"aggregated"},
    {"rawLabel":"640","normalizedCategory":"admin_general_expense","amountNative":-0.060585,"disclosureLevel":"aggregated"},
    {"rawLabel":"641/8","normalizedCategory":"other_expenses","amountNative":-0.04168,"disclosureLevel":"aggregated"},
  ],
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
  2019: {"currency":"EUR","sourceId":"cerclebrugge-be-jaarrekening-2019-06-30-individual","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2019-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.403388,"tax":-0.005969,"grossDebt":null,"cash":null,"officialTotalRevenue":20.526694,"officialTotalExpenses":20.219591,"officialPAT":-0.085842,"extraRows":[{"label":"Andere financiële opbrengsten","value":0.025558},{"label":"Kosten van schulden","value":-0.428416},{"label":"Andere financiële kosten","value":-0.00053},{"label":"Belastingen","value":-0.005969}],"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":7.390851,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
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

Object.assign(sources, {"cerclebrugge-be-jaarrekening-2025":{"id":"cerclebrugge-be-jaarrekening-2025","clubId":"cerclebrugge-be","title":"Jaarrekening van Cercle Brugge KSV BV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"},"cerclebrugge-be-jaarrekening-2019-06-30-individual":{"id":"cerclebrugge-be-jaarrekening-2019-06-30-individual","clubId":"cerclebrugge-be","title":"Cercle Brugge KSV — jaarrekening-2019-06-30-individual (ejercicio 2019)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Bélgica/Cercle Brugge/jaarrekening-2019-06-30-individual.pdf"}});

memberCountByClub["cerclebrugge-be"] = null;
