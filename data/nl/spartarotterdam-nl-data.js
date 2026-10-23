// GENERADO desde data/nl/spartarotterdam-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const spartarotterdamNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Netto-omzet","normalizedCategory":"lump_football_operations","amountNative":18.058718,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":2.729133,"disclosureLevel":"aggregated"},
  ],
};

const spartarotterdamNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Lonen","normalizedCategory":"wages_squad","amountNative":-11.420257,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige lasten uit hoofde van personeelsbeloningen","normalizedCategory":"wages_squad","amountNative":-1.009513,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horecakosten","normalizedCategory":"other_expenses","amountNative":-0.285215,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-1.884033,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-2.083432,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-1.233579,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-1.028426,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijving op materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.983572,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijving vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-1.665423,"disclosureLevel":"aggregated"},
  ],
};

const spartarotterdamNlFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"spartarotterdam-nl-wf-2023-2024-7bc9c6f8","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.067737,"tax":0.938225,"grossDebt":null,"cash":null,"officialTotalRevenue":20.787851,"officialTotalExpenses":21.59345,"officialPAT":0.200363,"extraRows":[{"label":"Rentebaten en -lasten en soortgelijke kosten","value":-0.138885},{"label":"Aandeel in resultaat van deelnemingen","value":0.206622},{"label":"Belastingen","value":0.938225}],"sinDesglose":[{"renglon":"Netto-omzet","lado":"revenue","importe":18.058718,"motivo":"el documento no desglosa este renglón"}]},
};

const spartarotterdamNlPresupuestoOverlayByYear = {};

const spartarotterdamNlPasesData = [];
const spartarotterdamNlResultadosData = {};
const spartarotterdamNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["spartarotterdam-nl"] = {
  revenueLinesByYear: spartarotterdamNlRevenueLinesByYear, expenseLinesByYear: spartarotterdamNlExpenseLinesByYear,
  fiscalYearMeta: spartarotterdamNlFiscalYearMeta, pasesData: spartarotterdamNlPasesData,
  resultadosData: spartarotterdamNlResultadosData, titulosData: spartarotterdamNlTitulosData,
  presupuestoOverlayByYear: spartarotterdamNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"spartarotterdam-nl-wf-2023-2024-7bc9c6f8":{"id":"spartarotterdam-nl-wf-2023-2024-7bc9c6f8","clubId":"spartarotterdam-nl","title":"Sparta Beheer B.V. — wf-2023-2024-7bc9c6f8 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Sparta Rotterdam/wf-2023-2024-7bc9c6f8.pdf"}});

memberCountByClub["spartarotterdam-nl"] = null;
