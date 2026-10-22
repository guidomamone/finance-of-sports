// GENERADO desde data/co/alianzafc-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const alianzafcCoRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Otros Ingresos","normalizedCategory":"other_income","amountNative":130.486351,"disclosureLevel":"aggregated"},
    {"rawLabel":"Taquilla - venta de boletería","normalizedCategory":"matchday_competition","amountNative":540.11225,"disclosureLevel":"aggregated"},
    {"rawLabel":"Venta derechos deportivos","normalizedCategory":"player_sales","amountNative":4136.673785,"disclosureLevel":"aggregated"},
    {"rawLabel":"Préstamo derechos deportivos","normalizedCategory":"player_sales","amountNative":365.756449,"disclosureLevel":"aggregated"},
    {"rawLabel":"Publicidad y patrocinios","normalizedCategory":"sponsorship_commercial","amountNative":1176.949586,"disclosureLevel":"aggregated"},
    {"rawLabel":"DIMAYOR (derechos de televisión)","normalizedCategory":"broadcasting","amountNative":7966.544302,"disclosureLevel":"aggregated"},
    {"rawLabel":"Federación Colombiana de Fútbol","normalizedCategory":"competition_bonus","amountNative":462.875,"disclosureLevel":"aggregated"},
    {"rawLabel":"Convenios","normalizedCategory":"other_income","amountNative":16,"disclosureLevel":"aggregated"},
    {"rawLabel":"Donaciones","normalizedCategory":"grants_donations","amountNative":20,"disclosureLevel":"aggregated"},
    {"rawLabel":"Venta artículos deportivos","normalizedCategory":"sponsorship_commercial","amountNative":2.415953,"disclosureLevel":"aggregated"},
  ],
};

const alianzafcCoExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Costos de Venta","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de personal","normalizedCategory":"admin_general_expense","amountNative":-1711.470936,"disclosureLevel":"aggregated"},
    {"rawLabel":"Honorarios","normalizedCategory":"admin_general_expense","amountNative":-155.981205,"disclosureLevel":"aggregated"},
    {"rawLabel":"Impuestos","normalizedCategory":"admin_general_expense","amountNative":-256.728447,"disclosureLevel":"aggregated"},
    {"rawLabel":"Arriendos","normalizedCategory":"admin_general_expense","amountNative":-10.194859,"disclosureLevel":"aggregated"},
    {"rawLabel":"seguros","normalizedCategory":"admin_general_expense","amountNative":-23.572277,"disclosureLevel":"aggregated"},
    {"rawLabel":"Servicios","normalizedCategory":"admin_general_expense","amountNative":-34.035571,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos Legales","normalizedCategory":"admin_general_expense","amountNative":-27.402747,"disclosureLevel":"aggregated"},
    {"rawLabel":"Mantenimiento y reparaciones","normalizedCategory":"admin_general_expense","amountNative":-2.272533,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diversos","normalizedCategory":"admin_general_expense","amountNative":-3264.244042,"disclosureLevel":"aggregated"},
    {"rawLabel":"Depreciaciones","normalizedCategory":"depreciation","amountNative":-114.253422,"disclosureLevel":"aggregated"},
    {"rawLabel":"Honorarios","normalizedCategory":"admin_general_expense","amountNative":-173.359999,"disclosureLevel":"aggregated"},
    {"rawLabel":"Servicios","normalizedCategory":"admin_general_expense","amountNative":-346.387164,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de Viaje","normalizedCategory":"match_organisation_expense","amountNative":-618.97871,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortizaciones derechos deportivos","normalizedCategory":"player_amortisation","amountNative":-291.439505,"disclosureLevel":"aggregated"},
    {"rawLabel":"Otro Gastos de actividades ordinarias","normalizedCategory":"other_expenses","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Devoluciones en ventas","normalizedCategory":"other_expenses","amountNative":-513.192677,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos de personal (deportivos)","normalizedCategory":"wages_squad","amountNative":-3513.100819,"disclosureLevel":"aggregated"},
  ],
};

const alianzafcCoFiscalYearMeta = {
  2023: {"currency":"COP","sourceId":"alianzafc-co-estados-financieros-2023","reportType":"official_balance_sheet","gestionId":null,"fxRef":"COP@2023-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1022.272932,"tax":-1220.153483,"grossDebt":null,"cash":null,"officialTotalRevenue":14817.813676,"officialTotalExpenses":11056.614913,"officialPAT":1518.772348,"extraRows":[{"label":"Ingresos Financiero","value":16.56701},{"label":"Costos Financieros","value":-1038.839942},{"label":"Gasto impuesto de renta y cree","value":-1051.401},{"label":"Impuesto diferido","value":-168.752483}]},
};

const alianzafcCoPresupuestoOverlayByYear = {};

const alianzafcCoPasesData = [];
const alianzafcCoResultadosData = {};
const alianzafcCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["alianzafc-co"] = {
  revenueLinesByYear: alianzafcCoRevenueLinesByYear, expenseLinesByYear: alianzafcCoExpenseLinesByYear,
  fiscalYearMeta: alianzafcCoFiscalYearMeta, pasesData: alianzafcCoPasesData,
  resultadosData: alianzafcCoResultadosData, titulosData: alianzafcCoTitulosData,
  presupuestoOverlayByYear: alianzafcCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"alianzafc-co-estados-financieros-2023":{"id":"alianzafc-co-estados-financieros-2023","clubId":"alianzafc-co","title":"Alianza FC S.A. — estados-financieros-2023 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["alianzafc-co"] = null;
