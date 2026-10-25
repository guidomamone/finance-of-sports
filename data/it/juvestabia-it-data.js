// GENERADO desde data/it/juvestabia-it.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const juvestabiaItRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Sponsorships","normalizedCategory":"sponsorship_commercial","amountNative":2.023466,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsorships - Related party","normalizedCategory":"sponsorship_commercial","amountNative":0.15,"disclosureLevel":"aggregated"},
    {"rawLabel":"Ticketing","normalizedCategory":"matchday_competition","amountNative":0.727035,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gain on transfer of players","normalizedCategory":"player_sales","amountNative":0.23,"disclosureLevel":"aggregated"},
    {"rawLabel":"Revenue from Television rights","normalizedCategory":"broadcasting","amountNative":0.05,"disclosureLevel":"aggregated"},
    {"rawLabel":"Revenue from Contributions","normalizedCategory":"grants_donations","amountNative":0.538644,"disclosureLevel":"aggregated"},
    {"rawLabel":"Revenue from store","normalizedCategory":"sponsorship_commercial","amountNative":0.074261,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other incomes","normalizedCategory":"other_income","amountNative":0.116954,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other incomes","normalizedCategory":"other_income","amountNative":0.190721,"disclosureLevel":"aggregated"},
  ],
};

const juvestabiaItExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Ticketing","normalizedCategory":"match_organisation_expense","amountNative":-0.111591,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sports equipment","normalizedCategory":"other_expenses","amountNative":-0.659782,"disclosureLevel":"aggregated"},
    {"rawLabel":"Player salaries","normalizedCategory":"wages_squad","amountNative":-2.463183,"disclosureLevel":"aggregated"},
    {"rawLabel":"Accomodation and transportation","normalizedCategory":"match_organisation_expense","amountNative":-0.053867,"disclosureLevel":"aggregated"},
    {"rawLabel":"Insurance","normalizedCategory":"admin_general_expense","amountNative":-0.014157,"disclosureLevel":"aggregated"},
    {"rawLabel":"Loan of players","normalizedCategory":"other_expenses","amountNative":-0.0075,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other cost of revenues","normalizedCategory":"other_expenses","amountNative":-0.193876,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortization of multi-year football players rights","normalizedCategory":"player_amortisation","amountNative":-0.166,"disclosureLevel":"aggregated"},
    {"rawLabel":"Salaries and social security contributions","normalizedCategory":"admin_general_expense","amountNative":-1.010865,"disclosureLevel":"aggregated"},
    {"rawLabel":"Rental expenses","normalizedCategory":"admin_general_expense","amountNative":-0.043785,"disclosureLevel":"aggregated"},
    {"rawLabel":"Impairment of receivables","normalizedCategory":"other_expenses","amountNative":-0.090272,"disclosureLevel":"aggregated"},
    {"rawLabel":"Penalties and fines","normalizedCategory":"other_expenses","amountNative":-0.11377,"disclosureLevel":"aggregated"},
    {"rawLabel":"Operating and administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-0.816133,"disclosureLevel":"aggregated"},
    {"rawLabel":"Impairment loss on intangible assets","normalizedCategory":"player_impairment","amountNative":-0.082667,"disclosureLevel":"aggregated"},
    {"rawLabel":"Depreciation costs","normalizedCategory":"depreciation","amountNative":-0.007872,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortization on Intangible assets","normalizedCategory":"player_amortisation","amountNative":-0.004474,"disclosureLevel":"aggregated"},
  ],
};

const juvestabiaItFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"juvestabia-it-bilancio-2024-ifrs-sec-6k","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.120093,"tax":-0.127938,"grossDebt":0.510448,"cash":0.049496,"officialTotalRevenue":4.101081,"officialTotalExpenses":5.839794,"officialPAT":-1.986746,"extraRows":[{"label":"Finance costs","value":-0.120093},{"label":"Provision for income taxes","value":-0.127938}],"baseIngreso":"full"},
};

const juvestabiaItPresupuestoOverlayByYear = {};

const juvestabiaItPasesData = [];
const juvestabiaItResultadosData = {};
const juvestabiaItTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["juvestabia-it"] = {
  revenueLinesByYear: juvestabiaItRevenueLinesByYear, expenseLinesByYear: juvestabiaItExpenseLinesByYear,
  fiscalYearMeta: juvestabiaItFiscalYearMeta, pasesData: juvestabiaItPasesData,
  resultadosData: juvestabiaItResultadosData, titulosData: juvestabiaItTitulosData,
  presupuestoOverlayByYear: juvestabiaItPresupuestoOverlayByYear,
};

Object.assign(sources, {"juvestabia-it-bilancio-2024-ifrs-sec-6k":{"id":"juvestabia-it-bilancio-2024-ifrs-sec-6k","clubId":"juvestabia-it","title":"Società Sportiva Juve Stabia S.r.l. — Juve Stabia-bilancio-2024-IFRS-SEC-6K (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Italia/Juve Stabia/Juve Stabia-bilancio-2024-IFRS-SEC-6K.pdf"}});

memberCountByClub["juvestabia-it"] = null;
