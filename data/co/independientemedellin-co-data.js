// GENERADO desde data/co/independientemedellin-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const independientemedellinCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":48833.823,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":409.046,"disclosureLevel":"aggregated"},
  ],
};

const independientemedellinCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-43361.762,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-1856.236,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2326.954,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-1542.121,"disclosureLevel":"aggregated"},
    {"rawLabel":"Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9","normalizedCategory":"other_expenses","amountNative":-42.902,"disclosureLevel":"aggregated"},
    {"rawLabel":"Ganancias (pérdidas) que surgen de la baja en cuentas de activos financieros medidos al costo amortizado","normalizedCategory":"other_expenses","amountNative":-41.828,"disclosureLevel":"aggregated"},
  ],
};

const independientemedellinCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"independientemedellin-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-4891.316,"tax":-113.61,"grossDebt":null,"cash":null,"officialTotalRevenue":49242.869,"officialTotalExpenses":49171.803,"officialPAT":-4933.86,"extraRows":[{"label":"Ingresos financieros","value":637.113},{"label":"Costos financieros","value":-5528.429},{"label":"Ingreso (gasto) por impuestos","value":-113.61}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":48833.823,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":1856.236,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const independientemedellinCoPresupuestoOverlayByYear = {};

const independientemedellinCoPasesData = [];
const independientemedellinCoResultadosData = {};
const independientemedellinCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["independientemedellin-co"] = {
  revenueLinesByYear: independientemedellinCoRevenueLinesByYear, expenseLinesByYear: independientemedellinCoExpenseLinesByYear,
  fiscalYearMeta: independientemedellinCoFiscalYearMeta, pasesData: independientemedellinCoPasesData,
  resultadosData: independientemedellinCoResultadosData, titulosData: independientemedellinCoTitulosData,
  presupuestoOverlayByYear: independientemedellinCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"independientemedellin-co-siis-estado-2016":{"id":"independientemedellin-co-siis-estado-2016","clubId":"independientemedellin-co","title":"El Equipo del Pueblo S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Independiente Medellin/siis-estado-2016.pdf"}});

memberCountByClub["independientemedellin-co"] = null;
