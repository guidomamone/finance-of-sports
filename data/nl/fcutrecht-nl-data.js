// GENERADO desde data/nl/fcutrecht-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const fcutrechtNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":5.325396,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":10.79637,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":8.762104,"disclosureLevel":"aggregated"},
    {"rawLabel":"Prijzengeld","normalizedCategory":"competition_bonus","amountNative":2.121984,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"stadium_other","amountNative":4.397454,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.730759,"disclosureLevel":"aggregated"},
    {"rawLabel":"Subsidies en giften","normalizedCategory":"grants_donations","amountNative":1.728019,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":2.133908,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":6.187523,"disclosureLevel":"aggregated"},
  ],
};

const fcutrechtNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-20.416669,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-2.106476,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.271006,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-1.999935,"disclosureLevel":"aggregated"},
    {"rawLabel":"Vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-2.705623,"disclosureLevel":"aggregated"},
    {"rawLabel":"Goodwill","normalizedCategory":"other_amortisation","amountNative":-0.08,"disclosureLevel":"aggregated"},
    {"rawLabel":"Website","normalizedCategory":"other_amortisation","amountNative":-0.041092,"disclosureLevel":"aggregated"},
    {"rawLabel":"Allocatie amortisatie vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":2.705623,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bedrijfsgebouwen en -terreinen","normalizedCategory":"depreciation","amountNative":-0.923278,"disclosureLevel":"aggregated"},
    {"rawLabel":"Machines en installaties","normalizedCategory":"depreciation","amountNative":-0.118183,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere vaste bedrijfsmiddelen","normalizedCategory":"depreciation","amountNative":-0.404511,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-3.841782,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-5.219209,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten merchandising","normalizedCategory":"admin_general_expense","amountNative":-0.001709,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-4.111885,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-2.425392,"disclosureLevel":"aggregated"},
  ],
};

const fcutrechtNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"fcutrecht-nl-jaarverslag-2024-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.550837,"tax":0.378447,"grossDebt":null,"cash":null,"officialTotalRevenue":42.183517,"officialTotalExpenses":41.961127,"officialPAT":0.05,"extraRows":[{"label":"Financiële baten en lasten","value":-0.550837},{"label":"Belastingen","value":0.378447}]},
};

const fcutrechtNlPresupuestoOverlayByYear = {};

const fcutrechtNlPasesData = [];
const fcutrechtNlResultadosData = {};
const fcutrechtNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["fcutrecht-nl"] = {
  revenueLinesByYear: fcutrechtNlRevenueLinesByYear, expenseLinesByYear: fcutrechtNlExpenseLinesByYear,
  fiscalYearMeta: fcutrechtNlFiscalYearMeta, pasesData: fcutrechtNlPasesData,
  resultadosData: fcutrechtNlResultadosData, titulosData: fcutrechtNlTitulosData,
  presupuestoOverlayByYear: fcutrechtNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"fcutrecht-nl-jaarverslag-2024-2025":{"id":"fcutrecht-nl-jaarverslag-2024-2025","clubId":"fcutrecht-nl","title":"Football Club Utrecht BV — FC-Utrecht-Jaarverslag-2024-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/FC Utrecht/FC-Utrecht-Jaarverslag-2024-2025.pdf"}});

memberCountByClub["fcutrecht-nl"] = null;
