// GENERADO desde data/nl/telstar-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const telstarNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":0.929,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":2.354,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":0.825,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandising & Business to Consumer activiteiten","normalizedCategory":"sponsorship_commercial","amountNative":0.087,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food & Beverage","normalizedCategory":"stadium_other","amountNative":0.904,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":0.322,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":0.339,"disclosureLevel":"aggregated"},
  ],
};

const telstarNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-1.503,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-0.306,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.026,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige","normalizedCategory":"other_expenses","amountNative":-1.029,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bedrijfsgebouwen en -terreinen","normalizedCategory":"depreciation","amountNative":-0.284,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfsmiddelen","normalizedCategory":"depreciation","amountNative":-0.086,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kostprijs Food & Beverage","normalizedCategory":"other_expenses","amountNative":-0.504,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kostprijs merchandise","normalizedCategory":"other_expenses","amountNative":-0.052,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoop","normalizedCategory":"admin_general_expense","amountNative":-0.083,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige","normalizedCategory":"other_expenses","amountNative":-0.276,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huur","normalizedCategory":"admin_general_expense","amountNative":-0.145,"disclosureLevel":"aggregated"},
    {"rawLabel":"Onderhoud","normalizedCategory":"admin_general_expense","amountNative":-0.055,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gas, water en electra","normalizedCategory":"admin_general_expense","amountNative":-0.086,"disclosureLevel":"aggregated"},
    {"rawLabel":"Schoonmaakkosten","normalizedCategory":"admin_general_expense","amountNative":-0.055,"disclosureLevel":"aggregated"},
    {"rawLabel":"Belastingen en zakelijke lasten","normalizedCategory":"admin_general_expense","amountNative":-0.014,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-0.031,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-0.732,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-0.283,"disclosureLevel":"aggregated"},
  ],
};

const telstarNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"telstar-nl-jaarverslag-2024-2025-full","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.029,"tax":0.139,"grossDebt":null,"cash":null,"officialTotalRevenue":5.76,"officialTotalExpenses":5.55,"officialPAT":0.32,"extraRows":[{"label":"Som der financiële baten en lasten","value":-0.029},{"label":"Belasting","value":0.139}]},
};

const telstarNlPresupuestoOverlayByYear = {};

const telstarNlPasesData = [];
const telstarNlResultadosData = {};
const telstarNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["telstar-nl"] = {
  revenueLinesByYear: telstarNlRevenueLinesByYear, expenseLinesByYear: telstarNlExpenseLinesByYear,
  fiscalYearMeta: telstarNlFiscalYearMeta, pasesData: telstarNlPasesData,
  resultadosData: telstarNlResultadosData, titulosData: telstarNlTitulosData,
  presupuestoOverlayByYear: telstarNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"telstar-nl-jaarverslag-2024-2025-full":{"id":"telstar-nl-jaarverslag-2024-2025-full","clubId":"telstar-nl","title":"Telstar 1963 N.V. — Telstar-Jaarverslag-2024-2025-full (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Telstar/Telstar-Jaarverslag-2024-2025-full.pdf"}});

memberCountByClub["telstar-nl"] = null;
