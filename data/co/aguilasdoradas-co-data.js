// GENERADO desde data/co/aguilasdoradas-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const aguilasdoradasCoRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":26735.986,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":723.998,"disclosureLevel":"aggregated"},
  ],
};

const aguilasdoradasCoExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-117.156,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-17658.317,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2744.462,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-478.829,"disclosureLevel":"aggregated"},
  ],
};

const aguilasdoradasCoFiscalYearMeta = {
  2024: {"currency":"COP","sourceId":"aguilasdoradas-co-siis-estado-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":323.344,"tax":-1292.477,"grossDebt":null,"cash":null,"officialTotalRevenue":27459.984,"officialTotalExpenses":20998.764,"officialPAT":5492.087,"extraRows":[{"label":"Ingresos financieros","value":453.755},{"label":"Costos financieros","value":-130.411},{"label":"Ingreso (gasto) por impuestos","value":-1292.477}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":26735.986,"motivo":"Línea única de ingresos sin abrir: lump_football_operations (regla de Colombia, 463, 2026-10-26)","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":17658.317,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
};

const aguilasdoradasCoPresupuestoOverlayByYear = {};

const aguilasdoradasCoPasesData = [];
const aguilasdoradasCoResultadosData = {};
const aguilasdoradasCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["aguilasdoradas-co"] = {
  revenueLinesByYear: aguilasdoradasCoRevenueLinesByYear, expenseLinesByYear: aguilasdoradasCoExpenseLinesByYear,
  fiscalYearMeta: aguilasdoradasCoFiscalYearMeta, pasesData: aguilasdoradasCoPasesData,
  resultadosData: aguilasdoradasCoResultadosData, titulosData: aguilasdoradasCoTitulosData,
  presupuestoOverlayByYear: aguilasdoradasCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"aguilasdoradas-co-siis-estado-2024":{"id":"aguilasdoradas-co-siis-estado-2024","clubId":"aguilasdoradas-co","title":"Talento Dorado S.A. — siis-estado-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Aguilas Doradas/siis-estado-2024.pdf"}});

memberCountByClub["aguilasdoradas-co"] = null;
