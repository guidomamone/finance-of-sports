// GENERADO desde data/co/atleticohuila-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const atleticohuilaCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":9848.946,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":374.049,"disclosureLevel":"aggregated"},
  ],
};

const atleticohuilaCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-6480.451,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1530.096,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-987.102,"disclosureLevel":"aggregated"},
  ],
};

const atleticohuilaCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"atleticohuila-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":10222.995,"officialTotalExpenses":8997.649,"officialPAT":1225.346,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":9848.946,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":6480.451,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const atleticohuilaCoPresupuestoOverlayByYear = {};

const atleticohuilaCoPasesData = [];
const atleticohuilaCoResultadosData = {};
const atleticohuilaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["atleticohuila-co"] = {
  revenueLinesByYear: atleticohuilaCoRevenueLinesByYear, expenseLinesByYear: atleticohuilaCoExpenseLinesByYear,
  fiscalYearMeta: atleticohuilaCoFiscalYearMeta, pasesData: atleticohuilaCoPasesData,
  resultadosData: atleticohuilaCoResultadosData, titulosData: atleticohuilaCoTitulosData,
  presupuestoOverlayByYear: atleticohuilaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"atleticohuila-co-siis-estado-2016":{"id":"atleticohuila-co-siis-estado-2016","clubId":"atleticohuila-co","title":"Atletico Huila — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Atletico Huila/siis-estado-2016.pdf"}});

memberCountByClub["atleticohuila-co"] = null;
