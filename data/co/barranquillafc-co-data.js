// GENERADO desde data/co/barranquillafc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const barranquillafcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":2800.484,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":4.49,"disclosureLevel":"aggregated"},
  ],
};

const barranquillafcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-2599.428,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-93.753,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-125.275,"disclosureLevel":"aggregated"},
  ],
};

const barranquillafcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"barranquillafc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":-9.704,"grossDebt":null,"cash":null,"officialTotalRevenue":2804.974,"officialTotalExpenses":2818.456,"officialPAT":-23.186,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":2800.484,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":2599.428,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const barranquillafcCoPresupuestoOverlayByYear = {};

const barranquillafcCoPasesData = [];
const barranquillafcCoResultadosData = {};
const barranquillafcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["barranquillafc-co"] = {
  revenueLinesByYear: barranquillafcCoRevenueLinesByYear, expenseLinesByYear: barranquillafcCoExpenseLinesByYear,
  fiscalYearMeta: barranquillafcCoFiscalYearMeta, pasesData: barranquillafcCoPasesData,
  resultadosData: barranquillafcCoResultadosData, titulosData: barranquillafcCoTitulosData,
  presupuestoOverlayByYear: barranquillafcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"barranquillafc-co-siis-estado-2016":{"id":"barranquillafc-co-siis-estado-2016","clubId":"barranquillafc-co","title":"Barranquilla Futbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Barranquilla FC/siis-estado-2016.pdf"}});

memberCountByClub["barranquillafc-co"] = null;
