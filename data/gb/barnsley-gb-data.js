// GENERADO desde data/gb/barnsley-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const barnsleyGbRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Football League distributions","normalizedCategory":"broadcasting","amountNative":3.103726,"disclosureLevel":"aggregated"},
    {"rawLabel":"Match day","normalizedCategory":"matchday_competition","amountNative":3.86421,"disclosureLevel":"aggregated"},
    {"rawLabel":"TV and broadcasting","normalizedCategory":"broadcasting","amountNative":0.168616,"disclosureLevel":"aggregated"},
    {"rawLabel":"Merchandise","normalizedCategory":"sponsorship_commercial","amountNative":0.238544,"disclosureLevel":"aggregated"},
    {"rawLabel":"Sponsorship & advertising","normalizedCategory":"sponsorship_commercial","amountNative":1.039282,"disclosureLevel":"aggregated"},
    {"rawLabel":"Catering","normalizedCategory":"other_income","amountNative":0.818572,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other receipts","normalizedCategory":"other_income","amountNative":1.00783,"disclosureLevel":"aggregated"},
    {"rawLabel":"Donation income","normalizedCategory":"other_income","amountNative":0.036136,"disclosureLevel":"aggregated"},
    {"rawLabel":"Profit on player sales and compensation","normalizedCategory":"player_sales","amountNative":0.910655,"disclosureLevel":"aggregated"},
  ],
};

const barnsleyGbExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Cost of sales","normalizedCategory":"other_expenses","amountNative":-13.968,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"admin_general_expense","amountNative":-2.591165,"disclosureLevel":"aggregated"},
    {"rawLabel":"Player registrations amortisation","normalizedCategory":"player_amortisation","amountNative":-1.021082,"disclosureLevel":"aggregated"},
    {"rawLabel":"Add on fees, sell on fees and unrecoverable transfer levies","normalizedCategory":"other_expenses","amountNative":-0.060737,"disclosureLevel":"aggregated"},
  ],
};

const barnsleyGbFiscalYearMeta = {
  2025: {"currency":"GBP","sourceId":"barnsley-gb-medium-accounts-2024-25-ixbrl","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.128927,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":11.187571,"officialTotalExpenses":17.640984,"officialPAT":-6.58234,"extraRows":[{"label":"Interest receivable and similar income","value":0.028266},{"label":"Interest payable and similar expenses","value":-0.157193},{"label":"Tax on loss","value":null}],"incluidoEn":{"wages_squad":{"en":"other_expenses","posible":true}}},
};

const barnsleyGbPresupuestoOverlayByYear = {};

const barnsleyGbPasesData = [];
const barnsleyGbResultadosData = {};
const barnsleyGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["barnsley-gb"] = {
  revenueLinesByYear: barnsleyGbRevenueLinesByYear, expenseLinesByYear: barnsleyGbExpenseLinesByYear,
  fiscalYearMeta: barnsleyGbFiscalYearMeta, pasesData: barnsleyGbPasesData,
  resultadosData: barnsleyGbResultadosData, titulosData: barnsleyGbTitulosData,
  presupuestoOverlayByYear: barnsleyGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"barnsley-gb-medium-accounts-2024-25-ixbrl":{"id":"barnsley-gb-medium-accounts-2024-25-ixbrl","clubId":"barnsley-gb","title":"Barnsley Football Club Limited — barnsley-medium-accounts-2024-25-ixbrl (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","publicNote":"Informe oficial en formato XHTML (iXBRL)"}});

memberCountByClub["barnsley-gb"] = null;
