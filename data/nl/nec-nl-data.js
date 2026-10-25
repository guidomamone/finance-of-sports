// GENERADO desde data/nl/nec-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const necNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":4.733426,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":6.363533,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":2.787462,"disclosureLevel":"aggregated"},
    {"rawLabel":"Subsidies","normalizedCategory":"grants_donations","amountNative":0.171847,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.937031,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"stadium_other","amountNative":1.446526,"disclosureLevel":"aggregated"},
    {"rawLabel":"Prijzengeld","normalizedCategory":"competition_bonus","amountNative":1.431144,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":0.803124,"disclosureLevel":"aggregated"},
    {"rawLabel":"Vergoedingssommen","normalizedCategory":"player_sales","amountNative":3.744788,"disclosureLevel":"aggregated"},
  ],
};

const necNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Afschrijving vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-0.620306,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-11.289577,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.939894,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.10972,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-1.377524,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kosten van ontwikkeling","normalizedCategory":"other_amortisation","amountNative":-0.024811,"disclosureLevel":"aggregated"},
    {"rawLabel":"Vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-0.620306,"disclosureLevel":"aggregated"},
    {"rawLabel":"Alloca e amor sa e vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":0.620306,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bedrijfsgebouwen en -terreinen","normalizedCategory":"depreciation","amountNative":-0.219065,"disclosureLevel":"aggregated"},
    {"rawLabel":"Machines en installa es","normalizedCategory":"depreciation","amountNative":-0.008747,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere vaste bedrijfsmiddelen","normalizedCategory":"depreciation","amountNative":-0.458133,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisves ngskosten","normalizedCategory":"admin_general_expense","amountNative":-1.488336,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-1.763309,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-4.686142,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-1.18686,"disclosureLevel":"aggregated"},
  ],
};

const necNlFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"nec-nl-holding-jaarrekening-2023-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.074353,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":22.418881,"officialTotalExpenses":24.172424,"officialPAT":-1.827896,"extraRows":[{"label":"Financiële baten en lasten","value":-0.074353},{"label":"Belas ngen","value":null}],"baseIngreso":"full"},
};

const necNlPresupuestoOverlayByYear = {};

const necNlPasesData = [];
const necNlResultadosData = {};
const necNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["nec-nl"] = {
  revenueLinesByYear: necNlRevenueLinesByYear, expenseLinesByYear: necNlExpenseLinesByYear,
  fiscalYearMeta: necNlFiscalYearMeta, pasesData: necNlPasesData,
  resultadosData: necNlResultadosData, titulosData: necNlTitulosData,
  presupuestoOverlayByYear: necNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"nec-nl-holding-jaarrekening-2023-2024":{"id":"nec-nl-holding-jaarrekening-2023-2024","clubId":"nec-nl","title":"NEC — NEC-Holding-Jaarrekening-2023-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/NEC/NEC-Holding-Jaarrekening-2023-2024.pdf"}});

memberCountByClub["nec-nl"] = null;
