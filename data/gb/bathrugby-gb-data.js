// GENERADO desde data/gb/bathrugby-gb.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const bathrugbyGbRevenueLinesByYear = {
  2021: [
    {"rawLabel":"Turnover","normalizedCategory":"lump_rugby_operations","amountNative":11.597938,"disclosureLevel":"aggregated"},
    {"rawLabel":"Fair value movements","normalizedCategory":"other_income","amountNative":6.664853,"disclosureLevel":"aggregated"},
    {"rawLabel":"Other operating income","normalizedCategory":"other_income","amountNative":0.153832,"disclosureLevel":"aggregated"},
  ],
};

const bathrugbyGbExpenseLinesByYear = {
  2021: [
    {"rawLabel":"Cost of sales","normalizedCategory":"lump_rugby_operations_expense","amountNative":-14.103734,"disclosureLevel":"aggregated"},
    {"rawLabel":"Administrative expenses","normalizedCategory":"lump_rugby_operations_expense","amountNative":-4.418764,"disclosureLevel":"aggregated"},
  ],
};

const bathrugbyGbFiscalYearMeta = {
  2021: {"currency":"GBP","sourceId":"bathrugby-gb-full-accounts-2020-21","reportType":"official_balance_sheet","gestionId":null,"fxRef":"GBP@2021-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.056372,"tax":-0.230837,"grossDebt":null,"cash":null,"officialTotalRevenue":18.416623,"officialTotalExpenses":18.522498,"officialPAT":-0.393084,"extraRows":[{"label":"Other interest receivable and similar income","value":0.000731},{"label":"Interest payable and similar expenses","value":-0.057103},{"label":"Tax on loss","value":-0.230837}],"sinDesglose":[{"renglon":"Turnover","lado":"revenue","importe":11.597938,"motivo":"el documento no desglosa este renglón"},{"renglon":"Cost of sales","lado":"expense","importe":14.103734,"motivo":"el documento no desglosa este renglón"},{"renglon":"Administrative expenses","lado":"expense","importe":4.418764,"motivo":"el documento no desglosa este renglón"}]},
};

const bathrugbyGbPresupuestoOverlayByYear = {};

const bathrugbyGbPasesData = [];
const bathrugbyGbResultadosData = {};
const bathrugbyGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["bathrugby-gb"] = {
  revenueLinesByYear: bathrugbyGbRevenueLinesByYear, expenseLinesByYear: bathrugbyGbExpenseLinesByYear,
  fiscalYearMeta: bathrugbyGbFiscalYearMeta, pasesData: bathrugbyGbPasesData,
  resultadosData: bathrugbyGbResultadosData, titulosData: bathrugbyGbTitulosData,
  presupuestoOverlayByYear: bathrugbyGbPresupuestoOverlayByYear,
};

Object.assign(sources, {"bathrugby-gb-full-accounts-2020-21":{"id":"bathrugby-gb-full-accounts-2020-21","clubId":"bathrugby-gb","title":"Bath Rugby Limited — bath-rugby-full-accounts-2020-21 (ejercicio 2021)","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["bathrugby-gb"] = null;
