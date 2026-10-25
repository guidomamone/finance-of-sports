// GENERADO desde data/de/dortmund-de.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const dortmundDeRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Match operations","normalizedCategory":"matchday_competition","amountNative":52.582,"disclosureLevel":"detailed"},
    {"rawLabel":"Advertising","normalizedCategory":"sponsorship_commercial","amountNative":146.609,"disclosureLevel":"detailed"},
    {"rawLabel":"TV marketing","normalizedCategory":"broadcasting","amountNative":206.05,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfer deals","normalizedCategory":"player_sales","amountNative":129.678,"disclosureLevel":"detailed"},
    {"rawLabel":"Conference, catering, miscellaneous","normalizedCategory":"other_income","amountNative":27.492,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":9.498,"disclosureLevel":"aggregated_residual"},
  ],
  2025: [
    {"rawLabel":"Match operations","normalizedCategory":"matchday_competition","amountNative":55.221,"disclosureLevel":"detailed"},
    {"rawLabel":"Advertising","normalizedCategory":"sponsorship_commercial","amountNative":153.557,"disclosureLevel":"detailed"},
    {"rawLabel":"TV marketing","normalizedCategory":"broadcasting","amountNative":227.2,"disclosureLevel":"detailed"},
    {"rawLabel":"Transfer deals","normalizedCategory":"player_sales","amountNative":71.223,"disclosureLevel":"detailed"},
    {"rawLabel":"Conference, catering, miscellaneous","normalizedCategory":"other_income","amountNative":21.462,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":6.831,"disclosureLevel":"aggregated_residual"},
  ],
};

const dortmundDeExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Personnel expenses — Match operations (professional squad)","normalizedCategory":"wages_squad","amountNative":-208.191,"disclosureLevel":"detailed"},
    {"rawLabel":"Personnel expenses — Retail and administration","normalizedCategory":"admin_general_expense","amountNative":-26.426,"disclosureLevel":"detailed"},
    {"rawLabel":"Personnel expenses — Amateur and youth football","normalizedCategory":"youth_other_sports_expense","amountNative":-16.133,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortisation of intangible fixed assets — player registrations (incl. write-downs)","normalizedCategory":"player_amortisation","amountNative":-91.025,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciation of tangible fixed assets","normalizedCategory":"depreciation","amountNative":-10.188,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Match operations","normalizedCategory":"match_organisation_expense","amountNative":-74.633,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Advertising","normalizedCategory":"admin_general_expense","amountNative":-14.275,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Transfer deals","normalizedCategory":"player_amortisation","amountNative":-39.754,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Retail","normalizedCategory":"admin_general_expense","amountNative":-2.248,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Administration","normalizedCategory":"admin_general_expense","amountNative":-54.032,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Other","normalizedCategory":"other_expenses","amountNative":-7.084,"disclosureLevel":"detailed"},
  ],
  2025: [
    {"rawLabel":"Personnel expenses — Match operations (professional squad)","normalizedCategory":"wages_squad","amountNative":-201.171,"disclosureLevel":"detailed"},
    {"rawLabel":"Personnel expenses — Retail and administration","normalizedCategory":"admin_general_expense","amountNative":-32.909,"disclosureLevel":"detailed"},
    {"rawLabel":"Personnel expenses — Amateur and youth football","normalizedCategory":"youth_other_sports_expense","amountNative":-14.707,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortisation of intangible fixed assets — player registrations (incl. write-downs)","normalizedCategory":"player_amortisation","amountNative":-90.759,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciation of tangible fixed assets","normalizedCategory":"depreciation","amountNative":-10.67,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Match operations","normalizedCategory":"match_organisation_expense","amountNative":-77.185,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Advertising","normalizedCategory":"admin_general_expense","amountNative":-15.808,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Transfer deals","normalizedCategory":"player_amortisation","amountNative":-31.662,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Retail","normalizedCategory":"admin_general_expense","amountNative":-1.859,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Administration","normalizedCategory":"admin_general_expense","amountNative":-51.157,"disclosureLevel":"detailed"},
    {"rawLabel":"Other operating expenses — Other","normalizedCategory":"other_expenses","amountNative":-8.97,"disclosureLevel":"detailed"},
  ],
};

const dortmundDeFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"dortmund-de-geschaeftsbericht-2024","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":14.5,"tax":-4.562,"grossDebt":28.701,"cash":4.36,"officialTotalRevenue":571.908,"officialTotalExpenses":543.991,"officialPAT":37.857,"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"dortmund-de-geschaeftsbericht-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":12.355,"tax":-3.339,"grossDebt":34.173,"cash":20.633,"officialTotalRevenue":535.495,"officialTotalExpenses":536.857,"officialPAT":7.653,"baseIngreso":"full"},
};

const dortmundDePresupuestoOverlayByYear = {};

const dortmundDePasesData = [];
const dortmundDeResultadosData = {};
const dortmundDeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["dortmund-de"] = {
  revenueLinesByYear: dortmundDeRevenueLinesByYear, expenseLinesByYear: dortmundDeExpenseLinesByYear,
  fiscalYearMeta: dortmundDeFiscalYearMeta, pasesData: dortmundDePasesData,
  resultadosData: dortmundDeResultadosData, titulosData: dortmundDeTitulosData,
  presupuestoOverlayByYear: dortmundDePresupuestoOverlayByYear,
};

Object.assign(sources, {"dortmund-de-geschaeftsbericht-2024":{"id":"dortmund-de-geschaeftsbericht-2024","clubId":"dortmund-de","title":"Annual Report 2023/2024 (Geschäftsbericht) — Annual Financial Statements (HGB) of Borussia Dortmund GmbH & Co. KGaA","type":"official_balance_sheet","reliability":"primary"},"dortmund-de-geschaeftsbericht-2025":{"id":"dortmund-de-geschaeftsbericht-2025","clubId":"dortmund-de","title":"Annual Report 2024/2025 (Geschäftsbericht) — Annual Financial Statements (HGB) of Borussia Dortmund GmbH & Co. KGaA","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["dortmund-de"] = {"actual":{"nombre":"Gestión actual (Hans-Joachim Watzke, Chairman de la Geschäftsführung)","firstYear":2024,"lastYear":2025}};

memberCountByClub["dortmund-de"] = null;
