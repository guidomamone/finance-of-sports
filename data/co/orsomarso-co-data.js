// GENERADO desde data/co/orsomarso-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const orsomarsoCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":1658.113,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":84.46,"disclosureLevel":"aggregated"},
  ],
};

const orsomarsoCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-2029.82,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1117.246,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-291.577,"disclosureLevel":"aggregated"},
  ],
};

const orsomarsoCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"orsomarso-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":-17.337,"grossDebt":null,"cash":null,"officialTotalRevenue":1742.573,"officialTotalExpenses":3438.643,"officialPAT":-1713.407,"extraRows":[{"label":"Ingresos financieros","value":0},{"label":"Costos financieros","value":0},{"label":"Ingreso (gasto) por impuestos","value":-17.337}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":1658.113,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":2029.82,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const orsomarsoCoPresupuestoOverlayByYear = {};

const orsomarsoCoPasesData = [];
const orsomarsoCoResultadosData = {};
const orsomarsoCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["orsomarso-co"] = {
  revenueLinesByYear: orsomarsoCoRevenueLinesByYear, expenseLinesByYear: orsomarsoCoExpenseLinesByYear,
  fiscalYearMeta: orsomarsoCoFiscalYearMeta, pasesData: orsomarsoCoPasesData,
  resultadosData: orsomarsoCoResultadosData, titulosData: orsomarsoCoTitulosData,
  presupuestoOverlayByYear: orsomarsoCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"orsomarso-co-siis-estado-2016":{"id":"orsomarso-co-siis-estado-2016","clubId":"orsomarso-co","title":"Orsomarso Sport Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Orsomarso/siis-estado-2016.pdf"}});

memberCountByClub["orsomarso-co"] = null;
