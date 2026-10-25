// GENERADO desde data/nl/feyenoord-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const feyenoordNlRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Wedstrijdopbrengsten","normalizedCategory":"matchday_competition","amountNative":67.316,"disclosureLevel":"detailed"},
    {"rawLabel":"Partnerships, business seats, units en boarding","normalizedCategory":"sponsorship_commercial","amountNative":39.593,"disclosureLevel":"detailed"},
    {"rawLabel":"Mediabaten","normalizedCategory":"broadcasting","amountNative":10.895,"disclosureLevel":"detailed"},
    {"rawLabel":"Merchandising & Business to Consumer activiteiten","normalizedCategory":"sponsorship_commercial","amountNative":3.539,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":4.332,"disclosureLevel":"detailed"},
    {"rawLabel":"Resultaat vergoedingssommen (transferopbrengsten)","normalizedCategory":"player_sales","amountNative":39.729,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Wedstrijdopbrengsten","normalizedCategory":"matchday_competition","amountNative":97.311,"disclosureLevel":"detailed"},
    {"rawLabel":"Partnerships, business seats, units en boarding","normalizedCategory":"sponsorship_commercial","amountNative":45.238,"disclosureLevel":"detailed"},
    {"rawLabel":"Mediabaten","normalizedCategory":"broadcasting","amountNative":11.716,"disclosureLevel":"detailed"},
    {"rawLabel":"Merchandising & Business to Consumer activiteiten","normalizedCategory":"sponsorship_commercial","amountNative":4.544,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige baten","normalizedCategory":"other_income","amountNative":1.648,"disclosureLevel":"detailed"},
    {"rawLabel":"Resultaat vergoedingssommen (transferopbrengsten)","normalizedCategory":"player_sales","amountNative":60.334,"disclosureLevel":"detailed"},
  ],
};

const feyenoordNlExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Kostprijs van de omzet","normalizedCategory":"other_expenses","amountNative":-11.231,"disclosureLevel":"detailed"},
    {"rawLabel":"Lonen, salarissen en sociale lasten","normalizedCategory":"wages_squad","amountNative":-66.139,"disclosureLevel":"detailed","items":[["Lonen en salarissen",61.035],["Pensioenen",0.943],["Sociale lasten",4.161]]},
    {"rawLabel":"Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten","normalizedCategory":"admin_general_expense","amountNative":-21.894,"disclosureLevel":"detailed","items":[["Overige personeelskosten",2.018],["Huisvestingskosten",8.5],["Beheer- en administratiekosten",11.376]]},
    {"rawLabel":"Wedstrijdkosten","normalizedCategory":"match_organisation_expense","amountNative":-11.302,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen materiële vaste activa","normalizedCategory":"depreciation","amountNative":-1.588,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen en bijzondere waardeverminderingen vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-37.715,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen goodwill","normalizedCategory":"other_amortisation","amountNative":-0.25,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Kostprijs van de omzet","normalizedCategory":"other_expenses","amountNative":-12.483,"disclosureLevel":"detailed"},
    {"rawLabel":"Lonen, salarissen en sociale lasten","normalizedCategory":"wages_squad","amountNative":-81.42,"disclosureLevel":"detailed","items":[["Lonen en salarissen",75.454],["Pensioenen",1.035],["Sociale lasten",4.931]]},
    {"rawLabel":"Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten","normalizedCategory":"admin_general_expense","amountNative":-26.48,"disclosureLevel":"detailed","items":[["Overige personeelskosten",4.399],["Huisvestingskosten",8.791],["Beheer- en administratiekosten",13.29]]},
    {"rawLabel":"Wedstrijdkosten","normalizedCategory":"match_organisation_expense","amountNative":-12.376,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen materiële vaste activa","normalizedCategory":"depreciation","amountNative":-1.559,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen en bijzondere waardeverminderingen vergoedingssommen","normalizedCategory":"player_amortisation","amountNative":-54.968,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen goodwill","normalizedCategory":"other_amortisation","amountNative":0,"disclosureLevel":"detailed"},
  ],
};

const feyenoordNlFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"feyenoord-nl-jaarverslag-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1.982,"tax":-3.756,"grossDebt":97.781,"cash":0.062,"officialTotalRevenue":165.404,"officialTotalExpenses":150.119,"officialPAT":9.547,"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"feyenoord-nl-jaarverslag-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.433,"tax":-8.017,"grossDebt":113.356,"cash":14.648,"officialTotalRevenue":220.791,"officialTotalExpenses":189.286,"officialPAT":23.055,"baseIngreso":"full"},
};

const feyenoordNlPresupuestoOverlayByYear = {};

const feyenoordNlPasesData = [];
const feyenoordNlResultadosData = {};
const feyenoordNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["feyenoord-nl"] = {
  revenueLinesByYear: feyenoordNlRevenueLinesByYear, expenseLinesByYear: feyenoordNlExpenseLinesByYear,
  fiscalYearMeta: feyenoordNlFiscalYearMeta, pasesData: feyenoordNlPasesData,
  resultadosData: feyenoordNlResultadosData, titulosData: feyenoordNlTitulosData,
  presupuestoOverlayByYear: feyenoordNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"feyenoord-nl-jaarverslag-2024":{"id":"feyenoord-nl-jaarverslag-2024","clubId":"feyenoord-nl","title":"Jaarverslag Feyenoord Rotterdam N.V. boekjaar 2023-2024 (1 juli 2023 - 30 juni 2024)","type":"official_balance_sheet","reliability":"primary"},"feyenoord-nl-jaarverslag-2025":{"id":"feyenoord-nl-jaarverslag-2025","clubId":"feyenoord-nl","title":"Jaarverslag Feyenoord Rotterdam N.V. boekjaar 2024-2025 (1 juli 2024 - 30 juni 2025)","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["feyenoord-nl"] = {"actual":{"nombre":"Gestión actual","firstYear":2024,"lastYear":2025}};

memberCountByClub["feyenoord-nl"] = null;
