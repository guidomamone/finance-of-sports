// GENERADO desde data/es/levante-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const levanteEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos deportivos","normalizedCategory":"competition_bonus","amountNative":1.73653,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":2.90677,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":6.59776,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por comercialización","normalizedCategory":"sponsorship_commercial","amountNative":2.47295,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por publicidad","normalizedCategory":"sponsorship_commercial","amountNative":1.37046,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos","normalizedCategory":"other_income","amountNative":0.04463,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos accesorios y otros de gestión corriente","normalizedCategory":"other_income","amountNative":0.13348,"disclosureLevel":"detailed"},
    {"rawLabel":"Subvenciones de explotación incorporadas al resultado del ejercicio","normalizedCategory":"grants_donations","amountNative":1.01511,"disclosureLevel":"detailed"},
  ],
};

const levanteEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aprovisionamientos (consumo de material deportivo y otros)","normalizedCategory":"other_expenses","amountNative":-1.77961,"disclosureLevel":"detailed","items":[["Consumo de material deportivo",-1.61923],["Otros consumos",-0.15933],["Deterioro de mercaderías, materias primas y otros aprovisionamientos",-0.00105]]},
    {"rawLabel":"Sueldos, salarios asociados a la plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-11.70934,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros sueldos, salarios y asimilados","normalizedCategory":"admin_general_expense","amountNative":-9.25035,"disclosureLevel":"detailed"},
    {"rawLabel":"Cargas sociales (prorrateo aprox., plantilla deportiva)","normalizedCategory":"wages_squad","amountNative":-1.39577,"disclosureLevel":"aggregated"},
    {"rawLabel":"Cargas sociales (prorrateo aprox., resto del personal)","normalizedCategory":"admin_general_expense","amountNative":-1.10298,"disclosureLevel":"aggregated"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-5.65616,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.42748,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-0.61673,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-2.61585,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-1.64298,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos en adquisición de jugadores","normalizedCategory":"other_expenses","amountNative":-1.96772,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de derechos de traspaso (jugadores)","normalizedCategory":"player_amortisation","amountNative":-0.78432,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de otro inmovilizado intangible (patentes/licencias/aplicaciones informáticas)","normalizedCategory":"other_amortisation","amountNative":-0.09047,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de inmovilizado material","normalizedCategory":"depreciation","amountNative":-1.13942,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros resultados","normalizedCategory":"other_expenses","amountNative":-1.32296,"disclosureLevel":"detailed"},
  ],
};

const levanteEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"levante-es-cuentas-anuales-consolidadas-2024-25","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":12.30188,"assetSales":-0.00292,"netInterest":-5.66908,"tax":4.39895,"grossDebt":121.12351,"cash":0.60815,"officialTotalRevenue":16.27769,"officialTotalExpenses":41.50214,"officialPAT":-14.19562,"baseIngreso":"full"},
};

const levanteEsPresupuestoOverlayByYear = {};

const levanteEsPasesData = [];
const levanteEsResultadosData = {};
const levanteEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["levante-es"] = {
  revenueLinesByYear: levanteEsRevenueLinesByYear, expenseLinesByYear: levanteEsExpenseLinesByYear,
  fiscalYearMeta: levanteEsFiscalYearMeta, pasesData: levanteEsPasesData,
  resultadosData: levanteEsResultadosData, titulosData: levanteEsTitulosData,
  presupuestoOverlayByYear: levanteEsPresupuestoOverlayByYear,
};

Object.assign(sources, {"levante-es-cuentas-anuales-consolidadas-2024-25":{"id":"levante-es-cuentas-anuales-consolidadas-2024-25","clubId":"levante-es","title":"Cuentas Anuales Consolidadas e Informe de Gestión Consolidado, Ejercicio anual terminado el 30 de junio de 2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["levante-es"] = {"actual":{"nombre":"Gestión actual","firstYear":2025,"lastYear":2025}};

memberCountByClub["levante-es"] = null;
