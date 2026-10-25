// GENERADO desde data/nl/excelsior-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const excelsiorNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"netto-omzet","normalizedCategory":"lump_football_operations","amountNative":10.082985,"disclosureLevel":"aggregated"},
  ],
};

const excelsiorNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-4.879159,"disclosureLevel":"aggregated"},
    {"rawLabel":"sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.690253,"disclosureLevel":"aggregated"},
    {"rawLabel":"pensioenen","normalizedCategory":"wages_squad","amountNative":-0.052281,"disclosureLevel":"aggregated"},
    {"rawLabel":"afschrijving vaste activa","normalizedCategory":"depreciation","amountNative":-0.402815,"disclosureLevel":"aggregated"},
    {"rawLabel":"overige bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-4.101825,"disclosureLevel":"aggregated"},
  ],
};

const excelsiorNlFiscalYearMeta = {
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

Object.assign(sources, {"excelsior-nl-jaarverslag-2023-2024":{"id":"excelsior-nl-jaarverslag-2023-2024","clubId":"excelsior-nl","title":"Stichting Betaald Voetbal Excelsior — Excelsior-Jaarverslag-2023-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Excelsior/Excelsior-Jaarverslag-2023-2024.pdf"}});

memberCountByClub["excelsior-nl"] = null;
