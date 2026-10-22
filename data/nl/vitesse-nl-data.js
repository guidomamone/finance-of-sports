// GENERADO desde data/nl/vitesse-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const vitesseNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":3.159999,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":6.61576,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":6.149612,"disclosureLevel":"aggregated"},
    {"rawLabel":"Prijzengeld","normalizedCategory":"competition_bonus","amountNative":1.067324,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"other_income","amountNative":0.655389,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.749809,"disclosureLevel":"aggregated"},
    {"rawLabel":"Subsidies en giften","normalizedCategory":"grants_donations","amountNative":0.245589,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":1.469442,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":1.988774,"disclosureLevel":"aggregated"},
  ],
};

const vitesseNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Lonen","normalizedCategory":"wages_squad","amountNative":-13.283424,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-1.161577,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.147177,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bedrijfsgebouwen en -terreinen","normalizedCategory":"depreciation","amountNative":-0.484191,"disclosureLevel":"aggregated"},
    {"rawLabel":"Inventarissen","normalizedCategory":"depreciation","amountNative":-0.181829,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-1.098869,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-4.830901,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-2.460514,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-1.897837,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"other_expenses","amountNative":-0.408692,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-3.177009,"disclosureLevel":"aggregated"},
  ],
};

const vitesseNlFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"vitesse-nl-wf-2023-2024-be6334b7","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-4.770651,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":22.101698,"officialTotalExpenses":29.13202,"officialPAT":-11.800973,"extraRows":[{"label":"Overige rentebaten en soortgelijke opbrengsten","value":0.006229},{"label":"Rentelasten en soortgelijke kosten","value":-4.77688}]},
};

const vitesseNlPresupuestoOverlayByYear = {};

const vitesseNlPasesData = [];
const vitesseNlResultadosData = {};
const vitesseNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["vitesse-nl"] = {
  revenueLinesByYear: vitesseNlRevenueLinesByYear, expenseLinesByYear: vitesseNlExpenseLinesByYear,
  fiscalYearMeta: vitesseNlFiscalYearMeta, pasesData: vitesseNlPasesData,
  resultadosData: vitesseNlResultadosData, titulosData: vitesseNlTitulosData,
  presupuestoOverlayByYear: vitesseNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"vitesse-nl-wf-2023-2024-be6334b7":{"id":"vitesse-nl-wf-2023-2024-be6334b7","clubId":"vitesse-nl","title":"B.V. Vitesse — wf-2023-2024-be6334b7 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["vitesse-nl"] = null;
