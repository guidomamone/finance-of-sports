// GENERADO desde data/nl/excelsior-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const excelsiorNlRevenueLinesByYear = {
  2019: [
    {"rawLabel":"netto-omzet","normalizedCategory":"lump_football_operations","amountNative":7.819403,"disclosureLevel":"aggregated"},
  ],
  2020: [
    {"rawLabel":"Netto-omzet","normalizedCategory":"lump_football_operations","amountNative":6.359107,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"netto-omzet","normalizedCategory":"lump_football_operations","amountNative":10.082985,"disclosureLevel":"aggregated"},
  ],
};

const excelsiorNlExpenseLinesByYear = {
  2019: [
    {"rawLabel":"lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-3.864794,"disclosureLevel":"aggregated"},
    {"rawLabel":"sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.406311,"disclosureLevel":"aggregated"},
    {"rawLabel":"pensioenen","normalizedCategory":"wages_squad","amountNative":-0.073518,"disclosureLevel":"aggregated"},
    {"rawLabel":"afschrijving vaste activa","normalizedCategory":"depreciation","amountNative":-0.491478,"disclosureLevel":"aggregated"},
    {"rawLabel":"overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-2.816981,"disclosureLevel":"aggregated"},
  ],
  2020: [
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-2.534578,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.40344,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenen","normalizedCategory":"wages_squad","amountNative":-0.080244,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijving vaste activa","normalizedCategory":"depreciation","amountNative":-0.357495,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-2.249105,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-4.879159,"disclosureLevel":"aggregated"},
    {"rawLabel":"sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.690253,"disclosureLevel":"aggregated"},
    {"rawLabel":"pensioenen","normalizedCategory":"wages_squad","amountNative":-0.052281,"disclosureLevel":"aggregated"},
    {"rawLabel":"afschrijving vaste activa","normalizedCategory":"depreciation","amountNative":-0.402815,"disclosureLevel":"aggregated"},
    {"rawLabel":"overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-4.101825,"disclosureLevel":"aggregated"},
  ],
};

const excelsiorNlFiscalYearMeta = {
  2019: {"currency":"EUR","sourceId":"excelsior-nl-jaarverslag-2018-2019","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2019-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.047474,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":7.819403,"officialTotalExpenses":7.653082,"officialPAT":0.118847,"extraRows":[{"label":"financiële baten en lasten","value":-0.047474},{"label":"belastingen","value":0}],"sinDesglose":[{"renglon":"netto-omzet","lado":"revenue","importe":7.819403,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"sales_total"},
  2020: {"currency":"EUR","sourceId":"excelsior-nl-jaarverslag-2019-2020","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2020-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.074506,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":6.359107,"officialTotalExpenses":5.624862,"officialPAT":0.659739,"extraRows":[{"label":"Financiële baten en lasten","value":-0.030937},{"label":"Resultaat deelneming","value":-0.043569},{"label":"Belastingen","value":0}],"sinDesglose":[{"renglon":"Netto-omzet","lado":"revenue","importe":6.359107,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"sales_total"},
  2024: {"currency":"EUR","sourceId":"excelsior-nl-jaarverslag-2023-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.090304,"tax":0.409864,"grossDebt":null,"cash":null,"officialTotalRevenue":10.082985,"officialTotalExpenses":10.126333,"officialPAT":0.45682,"extraRows":[{"label":"financiële baten en lasten","value":-0.018713},{"label":"resultaat deelneming","value":0.109017},{"label":"belastingen","value":0.409864}],"sinDesglose":[{"renglon":"netto-omzet","lado":"revenue","importe":10.082985,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"sales_total"},
};

const excelsiorNlPresupuestoOverlayByYear = {};

const excelsiorNlPasesData = [];
const excelsiorNlResultadosData = {};
const excelsiorNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["excelsior-nl"] = {
  revenueLinesByYear: excelsiorNlRevenueLinesByYear, expenseLinesByYear: excelsiorNlExpenseLinesByYear,
  fiscalYearMeta: excelsiorNlFiscalYearMeta, pasesData: excelsiorNlPasesData,
  resultadosData: excelsiorNlResultadosData, titulosData: excelsiorNlTitulosData,
  presupuestoOverlayByYear: excelsiorNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"excelsior-nl-jaarverslag-2023-2024":{"id":"excelsior-nl-jaarverslag-2023-2024","clubId":"excelsior-nl","title":"Stichting Betaald Voetbal Excelsior — Excelsior-Jaarverslag-2023-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.pdf"},"excelsior-nl-jaarverslag-2018-2019":{"id":"excelsior-nl-jaarverslag-2018-2019","clubId":"excelsior-nl","title":"Stichting Betaald Voetbal Excelsior — Excelsior-Jaarverslag-2018-2019 (ejercicio 2019)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2018-2019.pdf"},"excelsior-nl-jaarverslag-2019-2020":{"id":"excelsior-nl-jaarverslag-2019-2020","clubId":"excelsior-nl","title":"Stichting Betaald Voetbal Excelsior — Excelsior-Jaarverslag-2019-2020 (ejercicio 2020)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2019-2020.pdf"}});

memberCountByClub["excelsior-nl"] = null;
