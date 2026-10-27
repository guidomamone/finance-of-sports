// GENERADO desde data/co/cortulua-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const cortuluaCoRevenueLinesByYear = {
  2020: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":7080.765,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":2247.941,"disclosureLevel":"aggregated"},
  ],
  2021: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":6535.977,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":14056.427,"disclosureLevel":"aggregated"},
  ],
  2022: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":6947.961,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":2234.329,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":16332.259,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":1921.86,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":7547.079,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":739.432,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Ingresos de actividades ordinarias","normalizedCategory":"lump_football_operations","amountNative":12746.474,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":1060.907,"disclosureLevel":"aggregated"},
  ],
};

const cortuluaCoExpenseLinesByYear = {
  2020: [
    {"rawLabel":"Gastos de administración","normalizedCategory":"lump_football_operations_expense","amountNative":-8859.297,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
  ],
  2021: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-16242.59,"disclosureLevel":"aggregated"},
  ],
  2022: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-46.997,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-12360.61,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-1679.893,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":-14.049,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-11609.063,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-4883.202,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Costo de ventas","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-9349.196,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-3703.956,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Gastos de ventas","normalizedCategory":"lump_football_operations_expense","amountNative":-10424.556,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de administración","normalizedCategory":"admin_general_expense","amountNative":-2549.589,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otros gastos","normalizedCategory":"other_expenses","amountNative":-42.357,"disclosureLevel":"aggregated"},
  ],
};

const cortuluaCoFiscalYearMeta = {
  2020: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2020","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2020-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-157.58,"tax":-100.465,"grossDebt":488.847,"cash":215.892,"officialTotalRevenue":9328.706,"officialTotalExpenses":8859.297,"officialPAT":211.364,"extraRows":[{"label":"Costos financieros","value":-157.58},{"label":"Ingreso (gasto) por impuestos","value":-100.465}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":7080.765,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de administración","lado":"expense","importe":8859.297,"motivo":"el documento no desglosa este renglón","tipo":"other"}],"baseIngreso":"full"},
  2021: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2021","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2021-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-258.149,"tax":-513.877,"grossDebt":373.404,"cash":3498.031,"officialTotalRevenue":20592.404,"officialTotalExpenses":16242.59,"officialPAT":3577.788,"extraRows":[{"label":"Costos financieros","value":-258.149},{"label":"Ingreso (gasto) por impuestos","value":-513.877}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":6535.977,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":16242.59,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2022: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2022","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2022-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-80.208,"tax":0,"grossDebt":56.962,"cash":15.355,"officialTotalRevenue":9182.29,"officialTotalExpenses":14087.5,"officialPAT":-4985.418,"extraRows":[{"label":"Costos financieros","value":-80.208},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":6947.961,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":12360.61,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2023: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2023","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2023-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-127.359,"tax":-360.316,"grossDebt":28.201,"cash":220.641,"officialTotalRevenue":18254.119,"officialTotalExpenses":16506.314,"officialPAT":1260.13,"extraRows":[{"label":"Costos financieros","value":-127.359},{"label":"Ingreso (gasto) por impuestos","value":-360.316}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":16332.259,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":11609.063,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2024: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-182.651,"tax":0,"grossDebt":732.686,"cash":229.976,"officialTotalRevenue":8286.511,"officialTotalExpenses":13053.152,"officialPAT":-4949.292,"extraRows":[{"label":"Costos financieros","value":-182.651},{"label":"Ingreso (gasto) por impuestos","value":0}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":7547.079,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":9349.196,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
  2025: {"currency":"COP","sourceId":"cortulua-co-siis-estado-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-181.587,"tax":-228.077,"grossDebt":381.803,"cash":56.238,"officialTotalRevenue":13807.381,"officialTotalExpenses":13016.502,"officialPAT":381.215,"extraRows":[{"label":"Costos financieros","value":-181.587},{"label":"Ingreso (gasto) por impuestos","value":-228.077}],"sinDesglose":[{"renglon":"Ingresos de actividades ordinarias","lado":"revenue","importe":12746.474,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"Gastos de ventas","lado":"expense","importe":10424.556,"motivo":"Gastos de ventas sin abrir: la actividad deportiva del club (regla de Colombia, CONVENCIONES-DATOS.md)","tipo":"other"}],"baseIngreso":"full"},
};

const cortuluaCoPresupuestoOverlayByYear = {};

const cortuluaCoPasesData = [];
const cortuluaCoResultadosData = {};
const cortuluaCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["cortulua-co"] = {
  revenueLinesByYear: cortuluaCoRevenueLinesByYear, expenseLinesByYear: cortuluaCoExpenseLinesByYear,
  fiscalYearMeta: cortuluaCoFiscalYearMeta, pasesData: cortuluaCoPasesData,
  resultadosData: cortuluaCoResultadosData, titulosData: cortuluaCoTitulosData,
  presupuestoOverlayByYear: cortuluaCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"cortulua-co-siis-estado-2020":{"id":"cortulua-co-siis-estado-2020","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2020 (ejercicio 2020)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2020.pdf"},"cortulua-co-siis-estado-2021":{"id":"cortulua-co-siis-estado-2021","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2021 (ejercicio 2021)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2021.pdf"},"cortulua-co-siis-estado-2022":{"id":"cortulua-co-siis-estado-2022","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2022 (ejercicio 2022)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2022.pdf"},"cortulua-co-siis-estado-2023":{"id":"cortulua-co-siis-estado-2023","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2023 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2023.pdf"},"cortulua-co-siis-estado-2024":{"id":"cortulua-co-siis-estado-2024","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2024.pdf"},"cortulua-co-siis-estado-2025":{"id":"cortulua-co-siis-estado-2025","clubId":"cortulua-co","title":"Cortuluá Fútbol Club S.A. — siis-estado-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Cortulua/siis-estado-2025.pdf"}});

memberCountByClub["cortulua-co"] = null;
