// GENERADO desde data/nl/fcgroningen-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const fcgroningenNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdopbrengsten","normalizedCategory":"matchday_competition","amountNative":4.69755,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring en reclame","normalizedCategory":"sponsorship_commercial","amountNative":9.891505,"disclosureLevel":"aggregated"},
    {"rawLabel":"Mediarechten","normalizedCategory":"broadcasting","amountNative":4.357497,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandising","normalizedCategory":"sponsorship_commercial","amountNative":1.961748,"disclosureLevel":"aggregated"},
    {"rawLabel":"Food & Beverage","normalizedCategory":"stadium_other","amountNative":4.201114,"disclosureLevel":"aggregated"},
    {"rawLabel":"Uitkeringen","normalizedCategory":"competition_bonus","amountNative":1.72554,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":0.623973,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":0.081068,"disclosureLevel":"aggregated"},
    {"rawLabel":"Netto ontvangen afkoopsommen","normalizedCategory":"player_sales","amountNative":5.65993,"disclosureLevel":"aggregated"},
    {"rawLabel":"Boekwaarde contracten spelers","normalizedCategory":"player_sales","amountNative":-1.777607,"disclosureLevel":"aggregated"},
    {"rawLabel":"Ontvangen/(betaalde) opleidingsvergoedingen","normalizedCategory":"player_sales","amountNative":0.564294,"disclosureLevel":"aggregated"},
  ],
};

const fcgroningenNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Inkoopwaarde van de omzet","normalizedCategory":"other_expenses","amountNative":-2.368487,"disclosureLevel":"aggregated"},
    {"rawLabel":"Contractspelers","normalizedCategory":"wages_squad","amountNative":-6.438865,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige spelers","normalizedCategory":"wages_squad","amountNative":-0.558057,"disclosureLevel":"aggregated"},
    {"rawLabel":"Technische staf","normalizedCategory":"wages_squad","amountNative":-1.383071,"disclosureLevel":"aggregated"},
    {"rawLabel":"Medische staf","normalizedCategory":"wages_squad","amountNative":-0.371886,"disclosureLevel":"aggregated"},
    {"rawLabel":"Scouting","normalizedCategory":"other_expenses","amountNative":-0.485996,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige staf voetbalorganisatie","normalizedCategory":"wages_squad","amountNative":-1.002601,"disclosureLevel":"aggregated"},
    {"rawLabel":"Directie/management","normalizedCategory":"admin_general_expense","amountNative":-0.45724,"disclosureLevel":"aggregated"},
    {"rawLabel":"Commercie","normalizedCategory":"admin_general_expense","amountNative":-1.486851,"disclosureLevel":"aggregated"},
    {"rawLabel":"Operationeel","normalizedCategory":"admin_general_expense","amountNative":-1.113987,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"other_expenses","amountNative":-0.142673,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"other_expenses","amountNative":-1.317899,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gebouwen","normalizedCategory":"depreciation","amountNative":-0.054578,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere vaste bedrijfsmiddelen","normalizedCategory":"depreciation","amountNative":-0.560067,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijdkosten","normalizedCategory":"match_organisation_expense","amountNative":-2.265195,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-4.977639,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-1.11985,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kosten merchandise","normalizedCategory":"other_expenses","amountNative":-0.278963,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kosten horeca","normalizedCategory":"other_expenses","amountNative":-0.332762,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-1.234964,"disclosureLevel":"aggregated"},
    {"rawLabel":"Nagekomen baten en lasten","normalizedCategory":"exceptional_items","amountNative":0.081553,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-2.141771,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bijzondere waardeverminderingen","normalizedCategory":"player_impairment","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const fcgroningenNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"fcgroningen-nl-jaarverslag-2024-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.273082,"tax":-0.058336,"grossDebt":null,"cash":null,"officialTotalRevenue":31.986612,"officialTotalExpenses":30.093402,"officialPAT":1.643346,"extraRows":[{"label":"Financiële baten en lasten","value":-0.273082},{"label":"Belastingen resultaat uit gewone bedrijfsuitoefening","value":-0.058336}],"baseIngreso":"full"},
};

const fcgroningenNlPresupuestoOverlayByYear = {};

const fcgroningenNlPasesData = [];
const fcgroningenNlResultadosData = {};
const fcgroningenNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["fcgroningen-nl"] = {
  revenueLinesByYear: fcgroningenNlRevenueLinesByYear, expenseLinesByYear: fcgroningenNlExpenseLinesByYear,
  fiscalYearMeta: fcgroningenNlFiscalYearMeta, pasesData: fcgroningenNlPasesData,
  resultadosData: fcgroningenNlResultadosData, titulosData: fcgroningenNlTitulosData,
  presupuestoOverlayByYear: fcgroningenNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"fcgroningen-nl-jaarverslag-2024-2025":{"id":"fcgroningen-nl-jaarverslag-2024-2025","clubId":"fcgroningen-nl","title":"FC Groningen B.V. — FC-Groningen-Jaarverslag-2024-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2024-2025.pdf"}});

memberCountByClub["fcgroningen-nl"] = null;
