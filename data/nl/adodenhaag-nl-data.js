// GENERADO desde data/nl/adodenhaag-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const adodenhaagNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Wedstrijdbaten","normalizedCategory":"matchday_competition","amountNative":1.777882,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsoring","normalizedCategory":"sponsorship_commercial","amountNative":5.45522,"disclosureLevel":"aggregated"},
    {"rawLabel":"Media gerelateerde baten","normalizedCategory":"broadcasting","amountNative":1.135526,"disclosureLevel":"aggregated"},
    {"rawLabel":"Prijzengeld","normalizedCategory":"competition_bonus","amountNative":0.377553,"disclosureLevel":"aggregated"},
    {"rawLabel":"Horeca","normalizedCategory":"stadium_other","amountNative":2.287066,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.534193,"disclosureLevel":"aggregated"},
    {"rawLabel":"Subsidies en giften","normalizedCategory":"grants_donations","amountNative":0.048882,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":1.85163,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":1.098265,"disclosureLevel":"aggregated"},
  ],
};

const adodenhaagNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Lonen en salarissen","normalizedCategory":"wages_squad","amountNative":-7.443314,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sociale lasten","normalizedCategory":"wages_squad","amountNative":-1.258234,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioenlasten","normalizedCategory":"wages_squad","amountNative":-0.157357,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige personeelskosten","normalizedCategory":"admin_general_expense","amountNative":-1.296673,"disclosureLevel":"aggregated"},
    {"rawLabel":"Vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-0.369136,"disclosureLevel":"aggregated"},
    {"rawLabel":"Software","normalizedCategory":"other_amortisation","amountNative":-0.001083,"disclosureLevel":"aggregated"},
    {"rawLabel":"Goodwill","normalizedCategory":"other_amortisation","amountNative":-0.02,"disclosureLevel":"aggregated"},
    {"rawLabel":"Allocatie amortisatie vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":0.369136,"disclosureLevel":"aggregated"},
    {"rawLabel":"Materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.3782,"disclosureLevel":"aggregated"},
    {"rawLabel":"Huisvestingskosten","normalizedCategory":"admin_general_expense","amountNative":-3.127141,"disclosureLevel":"aggregated"},
    {"rawLabel":"Wedstrijd- en trainingskosten","normalizedCategory":"match_organisation_expense","amountNative":-1.870848,"disclosureLevel":"aggregated"},
    {"rawLabel":"Verkoopkosten","normalizedCategory":"admin_general_expense","amountNative":-2.986742,"disclosureLevel":"aggregated"},
    {"rawLabel":"Algemene kosten","normalizedCategory":"admin_general_expense","amountNative":-1.539528,"disclosureLevel":"aggregated"},
  ],
};

const adodenhaagNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"adodenhaag-nl-jaarrekening2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.005219,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":14.566217,"officialTotalExpenses":20.07912,"officialPAT":-5.507684,"extraRows":[{"label":"Financiële baten en lasten","value":0.005219},{"label":"Belastingen","value":null}]},
};

const adodenhaagNlPresupuestoOverlayByYear = {};

const adodenhaagNlPasesData = [];
const adodenhaagNlResultadosData = {};
const adodenhaagNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["adodenhaag-nl"] = {
  revenueLinesByYear: adodenhaagNlRevenueLinesByYear, expenseLinesByYear: adodenhaagNlExpenseLinesByYear,
  fiscalYearMeta: adodenhaagNlFiscalYearMeta, pasesData: adodenhaagNlPasesData,
  resultadosData: adodenhaagNlResultadosData, titulosData: adodenhaagNlTitulosData,
  presupuestoOverlayByYear: adodenhaagNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"adodenhaag-nl-jaarrekening2024-25":{"id":"adodenhaag-nl-jaarrekening2024-25","clubId":"adodenhaag-nl","title":"NV ADO Den Haag — jaarrekening2024-25 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/ADO Den Haag/jaarrekening2024-25.pdf"}});

memberCountByClub["adodenhaag-nl"] = null;
