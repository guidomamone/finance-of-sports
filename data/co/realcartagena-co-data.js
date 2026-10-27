// GENERADO desde data/co/realcartagena-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const realcartagenaCoRevenueLinesByYear = {
  2017: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":4964.966,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":94.259,"disclosureLevel":"aggregated"},
  ],
};

const realcartagenaCoExpenseLinesByYear = {
  2017: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-3734.815,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1431.128,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-326.375,"disclosureLevel":"aggregated"},
  ],
};

const realcartagenaCoFiscalYearMeta = {
  2017: {"currency":"COP","sourceId":"realcartagena-co-siis-estado-2017","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2017-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":5059.225,"officialTotalExpenses":5492.318,"officialPAT":-433.093,"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":4964.966,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Costo de ventas","lado":"expense","importe":3734.815,"motivo":"Costo de ventas es 68% de los gastos: actividad deportiva (excepción por contenido de la regla de Colombia)","tipo":"cost_of_sales"}],"baseIngreso":"full"},
};

const realcartagenaCoPresupuestoOverlayByYear = {};

const realcartagenaCoPasesData = [];
const realcartagenaCoResultadosData = {};
const realcartagenaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["realcartagena-co"] = {
  revenueLinesByYear: realcartagenaCoRevenueLinesByYear, expenseLinesByYear: realcartagenaCoExpenseLinesByYear,
  fiscalYearMeta: realcartagenaCoFiscalYearMeta, pasesData: realcartagenaCoPasesData,
  resultadosData: realcartagenaCoResultadosData, titulosData: realcartagenaCoTitulosData,
  presupuestoOverlayByYear: realcartagenaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"realcartagena-co-siis-estado-2017":{"id":"realcartagena-co-siis-estado-2017","clubId":"realcartagena-co","title":"Real Cartagena Fútbol Club S.A. — siis-estado-2017 (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Real Cartagena/siis-estado-2017.pdf"}});

memberCountByClub["realcartagena-co"] = null;
