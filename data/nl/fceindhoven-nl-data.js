// GENERADO desde data/nl/fceindhoven-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const fceindhovenNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":0.245796,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":2.594104,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":0.864691,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.053163,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"stadium_other","amountNative":0.505989,"disclosureLevel":"aggregated"},
    {"rawLabel":"Prijzengeld","normalizedCategory":"competition_bonus","amountNative":0.219257,"disclosureLevel":"aggregated"},
    {"rawLabel":"Subsidies","normalizedCategory":"grants_donations","amountNative":0.131255,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":0.792862,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":0.561077,"disclosureLevel":"aggregated"},
  ],
};

const fceindhovenNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-2.075105,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.447548,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.054277,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-0.79855,"disclosureLevel":"aggregated"},
    {"rawLabel":"Vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-0.03,"disclosureLevel":"aggregated"},
    {"rawLabel":"Allocatie amortisatie vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":0.03,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bedrijfsgebouwen en -terreinen","normalizedCategory":"depreciation","amountNative":-0.027797,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere vaste bedrijfsmiddelen","normalizedCategory":"depreciation","amountNative":-0.150301,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-0.370103,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-0.702204,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-0.801964,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-0.489312,"disclosureLevel":"aggregated"},
  ],
};

const fceindhovenNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"fceindhoven-nl-wf-2024-2025-a6019b8e","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.01924,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":5.968194,"officialTotalExpenses":5.917161,"officialPAT":0.031793,"extraRows":[{"label":"Financië le baten en lasten","value":-0.01924},{"label":"Belastingen","value":null}],"baseIngreso":"full"},
};

const fceindhovenNlPresupuestoOverlayByYear = {};

const fceindhovenNlPasesData = [];
const fceindhovenNlResultadosData = {};
const fceindhovenNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["fceindhoven-nl"] = {
  revenueLinesByYear: fceindhovenNlRevenueLinesByYear, expenseLinesByYear: fceindhovenNlExpenseLinesByYear,
  fiscalYearMeta: fceindhovenNlFiscalYearMeta, pasesData: fceindhovenNlPasesData,
  resultadosData: fceindhovenNlResultadosData, titulosData: fceindhovenNlTitulosData,
  presupuestoOverlayByYear: fceindhovenNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"fceindhoven-nl-wf-2024-2025-a6019b8e":{"id":"fceindhoven-nl-wf-2024-2025-a6019b8e","clubId":"fceindhoven-nl","title":"Stichting FC Eindhoven — wf-2024-2025-a6019b8e (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/FC Eindhoven/wf-2024-2025-a6019b8e.pdf"}});

memberCountByClub["fceindhoven-nl"] = null;
