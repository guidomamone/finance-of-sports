// GENERADO desde data/es/fcbarcelona-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const fcbarcelonaEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones","normalizedCategory":"competition_bonus","amountNative":118.598,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":31.599,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisiones y derechos televisivos","normalizedCategory":"broadcasting","amountNative":250.499,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por comercialización y publicidad","normalizedCategory":"sponsorship_commercial","amountNative":556.844,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por prestación de servicios","normalizedCategory":"other_income","amountNative":6.663,"disclosureLevel":"detailed"},
    {"rawLabel":"Trabajos realizados por la empresa para su activo","normalizedCategory":"other_income","amountNative":1.284,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":21.708,"disclosureLevel":"detailed"},
    {"rawLabel":"Exceso de provisiones","normalizedCategory":"other_income","amountNative":1.25,"disclosureLevel":"detailed"},
    {"rawLabel":"Dotación y aplicación de provisiones y otros (neto)","normalizedCategory":"other_income","amountNative":7.92,"disclosureLevel":"detailed"},
  ],
};

const fcbarcelonaEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aprovisionamientos (consumos y material deportivo)","normalizedCategory":"other_expenses","amountNative":-79.702,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos de personal (deportivo, no deportivo, cargas sociales, provisiones)","normalizedCategory":"wages_squad","amountNative":-509.955,"disclosureLevel":"detailed"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-163.102,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-6.061,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-1.543,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-14.248,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos por adquisición de jugadores","normalizedCategory":"other_expenses","amountNative":-0.465,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-44.715,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de los derechos de adquisición de jugadores (Nota 5)","normalizedCategory":"player_amortisation","amountNative":-81.287,"disclosureLevel":"detailed"},
    {"rawLabel":"Otras amortizaciones (Notas 6 y 7)","normalizedCategory":"depreciation","amountNative":-25.03,"disclosureLevel":"detailed"},
  ],
};

const fcbarcelonaEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"fcbarcelona-es-cuentas-anuales-2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":13.47,"assetSales":-12.455,"netInterest":-79.649,"tax":-8.572,"grossDebt":305.155,"cash":136.328,"officialTotalRevenue":996.365,"officialTotalExpenses":926.108,"officialPAT":-16.949,"baseIngreso":"full"},
};

const fcbarcelonaEsPasesData = [];
const fcbarcelonaEsResultadosData = {};
const fcbarcelonaEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["fcbarcelona-es"] = {
  revenueLinesByYear: fcbarcelonaEsRevenueLinesByYear, expenseLinesByYear: fcbarcelonaEsExpenseLinesByYear,
  fiscalYearMeta: fcbarcelonaEsFiscalYearMeta, pasesData: fcbarcelonaEsPasesData,
  resultadosData: fcbarcelonaEsResultadosData, titulosData: fcbarcelonaEsTitulosData,
};

Object.assign(sources, {"fcbarcelona-es-cuentas-anuales-2024-25":{"id":"fcbarcelona-es-cuentas-anuales-2024-25","clubId":"fcbarcelona-es","title":"Cuentas Anuales y Auditoría 2024-25 (Consolidadas), Ejercicio 1/7/2024 a 30/6/2025","type":"official_balance_sheet","reliability":"primary","url":"https://www.fcbarcelona.es/es/club/transparencia/informacion-legal-institucional-y-economica"}});

gestionesByClub["fcbarcelona-es"] = {"ejercicio2025":{"nombre":"Ejercicio 2024/25","firstYear":2025,"lastYear":2025}};

memberCountByClub["fcbarcelona-es"] = null;
