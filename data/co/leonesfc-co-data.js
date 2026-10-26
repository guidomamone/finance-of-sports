// GENERADO desde data/co/leonesfc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const leonesfcCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":3552.748,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":21.516,"disclosureLevel":"aggregated"},
  ],
};

const leonesfcCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-3.502,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-357.23,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-3107.352,"disclosureLevel":"aggregated"},
  ],
};

const leonesfcCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"leonesfc-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.416,"tax":-25.941,"grossDebt":null,"cash":null,"officialTotalRevenue":3574.264,"officialTotalExpenses":3468.084,"officialPAT":77.823,"extraRows":[{"label":"Costos financieros","value":-2.416},{"label":"Ingreso (gasto) por impuestos","value":-25.941}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":3552.748,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":357.23,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const leonesfcCoPresupuestoOverlayByYear = {};

const leonesfcCoPasesData = [];
const leonesfcCoResultadosData = {};
const leonesfcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["leonesfc-co"] = {
  revenueLinesByYear: leonesfcCoRevenueLinesByYear, expenseLinesByYear: leonesfcCoExpenseLinesByYear,
  fiscalYearMeta: leonesfcCoFiscalYearMeta, pasesData: leonesfcCoPasesData,
  resultadosData: leonesfcCoResultadosData, titulosData: leonesfcCoTitulosData,
  presupuestoOverlayByYear: leonesfcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"leonesfc-co-siis-estado-2016":{"id":"leonesfc-co-siis-estado-2016","clubId":"leonesfc-co","title":"Leones Fútbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Leones FC/siis-estado-2016.pdf"}});

memberCountByClub["leonesfc-co"] = null;
