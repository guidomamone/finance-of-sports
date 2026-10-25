// GENERADO desde data/es/valenciacf-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const valenciacfEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones","normalizedCategory":"competition_bonus","amountNative":9.544,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":16.821,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":53.247,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos de comercialización y publicidad","normalizedCategory":"sponsorship_commercial","amountNative":17.994,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":0.734,"disclosureLevel":"detailed"},
    {"rawLabel":"Imputación de subvenciones de inmovilizado no financiero y otras","normalizedCategory":"other_income","amountNative":0.116,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros resultados","normalizedCategory":"other_income","amountNative":4.81,"disclosureLevel":"detailed"},
  ],
};

const valenciacfEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Consumo de material deportivo","normalizedCategory":"other_expenses","amountNative":-0.78,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros consumos","normalizedCategory":"other_expenses","amountNative":-0.603,"disclosureLevel":"detailed"},
    {"rawLabel":"Deterioro de material deportivo, comercialización y otros","normalizedCategory":"other_expenses","amountNative":0.011,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos y salarios plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-70.708,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros sueldos, salarios y asimilados","normalizedCategory":"admin_general_expense","amountNative":-8.054,"disclosureLevel":"detailed"},
    {"rawLabel":"Cargas sociales","normalizedCategory":"wages_squad","amountNative":-4.475,"disclosureLevel":"detailed"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-18.172,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.463,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-1.545,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-0.004,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-4.478,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de derechos de adquisición de jugadores","normalizedCategory":"player_amortisation","amountNative":-10.354,"disclosureLevel":"detailed"},
    {"rawLabel":"Otras amortizaciones","normalizedCategory":"depreciation","amountNative":-2.127,"disclosureLevel":"detailed"},
  ],
};

const valenciacfEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"valenciacf-es-cuentas-anuales-2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":41.572,"assetSales":0,"netInterest":-21.458,"tax":-1.132,"grossDebt":121.693,"cash":31.752,"officialTotalRevenue":103.266,"officialTotalExpenses":121.752,"officialPAT":0.496,"baseIngreso":"full"},
};

const valenciacfEsPasesData = [];
const valenciacfEsResultadosData = {};
const valenciacfEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["valenciacf-es"] = {
  revenueLinesByYear: valenciacfEsRevenueLinesByYear, expenseLinesByYear: valenciacfEsExpenseLinesByYear,
  fiscalYearMeta: valenciacfEsFiscalYearMeta, pasesData: valenciacfEsPasesData,
  resultadosData: valenciacfEsResultadosData, titulosData: valenciacfEsTitulosData,
};

Object.assign(sources, {"valenciacf-es-cuentas-anuales-2024-25":{"id":"valenciacf-es-cuentas-anuales-2024-25","clubId":"valenciacf-es","title":"Cuentas Anuales e Informe de Gestión 2024-2025 (Individuales, Informe de Auditoría de EY), Ejercicio 1/7/2024 a 30/6/2025","type":"official_balance_sheet","reliability":"primary","url":"https://www.valenciacf.com/public/Attachment/"}});

gestionesByClub["valenciacf-es"] = {"ejercicio2025":{"nombre":"Ejercicio 2024/25","firstYear":2025,"lastYear":2025}};

memberCountByClub["valenciacf-es"] = null;
