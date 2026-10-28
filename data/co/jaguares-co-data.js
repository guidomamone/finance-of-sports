// GENERADO desde data/co/jaguares-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const jaguaresCoRevenueLinesByYear = {
  2016: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":2264.919,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":3.451,"disclosureLevel":"aggregated"},
  ],
};

const jaguaresCoExpenseLinesByYear = {
  2016: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-13.709,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2177.516,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-3.596,"disclosureLevel":"aggregated"},
    {"rawLabel":"Ganancia (pérdida) procedente de operaciones discontinuadas","normalizedCategory":"exceptional_items","amountNative":-4.005,"disclosureLevel":"aggregated"},
  ],
};

const jaguaresCoFiscalYearMeta = {
  2016: {"currency":"COP","sourceId":"jaguares-co-siis-estado-2016","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2016-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-3.434,"tax":-30.062,"grossDebt":null,"cash":null,"officialTotalRevenue":2268.37,"officialTotalExpenses":2194.821,"officialPAT":36.048,"extraRows":[{"label":"Ingresos financieros","value":0.346},{"label":"Costos financieros","value":-3.78},{"label":"Ingreso (gasto) por impuestos","value":-30.062}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":2264.919,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":13.709,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const jaguaresCoPresupuestoOverlayByYear = {};

const jaguaresCoPasesData = [];
const jaguaresCoResultadosData = {};
const jaguaresCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["jaguares-co"] = {
  revenueLinesByYear: jaguaresCoRevenueLinesByYear, expenseLinesByYear: jaguaresCoExpenseLinesByYear,
  fiscalYearMeta: jaguaresCoFiscalYearMeta, pasesData: jaguaresCoPasesData,
  resultadosData: jaguaresCoResultadosData, titulosData: jaguaresCoTitulosData,
  presupuestoOverlayByYear: jaguaresCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"jaguares-co-siis-estado-2016":{"id":"jaguares-co-siis-estado-2016","clubId":"jaguares-co","title":"Jaguares Fútbol Club S.A. — siis-estado-2016 (ejercicio 2016)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Jaguares/siis-estado-2016.pdf"}});

memberCountByClub["jaguares-co"] = null;
