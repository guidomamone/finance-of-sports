// GENERADO desde data/es/realbetis-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const realbetisEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones nacionales","normalizedCategory":"competition_bonus","amountNative":5.986473,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por competiciones europeas","normalizedCategory":"competition_bonus","amountNative":20.73069,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":21.663176,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":64.957035,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos de comercialización y publicidad","normalizedCategory":"sponsorship_commercial","amountNative":37.291523,"disclosureLevel":"detailed"},
    {"rawLabel":"Trabajos realizados por la empresa para su activo","normalizedCategory":"other_income","amountNative":0.546884,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":7.146189,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros resultados (Nota 15.8, principalmente traspasos de jugadores de Cantera)","normalizedCategory":"other_income","amountNative":36.89785,"disclosureLevel":"detailed"},
  ],
};

const realbetisEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Consumo de material deportivo","normalizedCategory":"other_expenses","amountNative":-3.979839,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros consumos y gastos externos","normalizedCategory":"admin_general_expense","amountNative":-8.73717,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos y salarios de plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-85.404892,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros sueldos, salarios y asimilados","normalizedCategory":"admin_general_expense","amountNative":-12.5444,"disclosureLevel":"detailed"},
    {"rawLabel":"Cargas sociales","normalizedCategory":"wages_squad","amountNative":-4.780469,"disclosureLevel":"detailed"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-28.652025,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.481227,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-7.787003,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos cesión de jugadores","normalizedCategory":"other_expenses","amountNative":-5.725,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-2.46177,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-2.490471,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de derechos federativos de jugadores (Nota 4/5)","normalizedCategory":"player_amortisation","amountNative":-23.343953,"disclosureLevel":"detailed"},
    {"rawLabel":"Otras amortizaciones (propiedad industrial, aplicaciones informáticas, material)","normalizedCategory":"depreciation","amountNative":-3.913101,"disclosureLevel":"detailed"},
  ],
};

const realbetisEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"realbetis-es-informe-auditoria-2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":10.101484,"assetSales":0,"netInterest":-9.44245,"tax":-1.008801,"grossDebt":129.106402,"cash":15.954506,"officialTotalRevenue":195.21982,"officialTotalExpenses":190.30132,"officialPAT":4.568734,"baseIngreso":"full"},
};

const realbetisEsPasesData = [];
const realbetisEsResultadosData = {};
const realbetisEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["realbetis-es"] = {
  revenueLinesByYear: realbetisEsRevenueLinesByYear, expenseLinesByYear: realbetisEsExpenseLinesByYear,
  fiscalYearMeta: realbetisEsFiscalYearMeta, pasesData: realbetisEsPasesData,
  resultadosData: realbetisEsResultadosData, titulosData: realbetisEsTitulosData,
};

Object.assign(sources, {"realbetis-es-informe-auditoria-2024-25":{"id":"realbetis-es-informe-auditoria-2024-25","clubId":"realbetis-es","title":"Informe de Auditoría, Memoria y Estado de Información No Financiera 2024-2025, Ejercicio 1/7/2024 a 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["realbetis-es"] = {"ejercicio2025":{"nombre":"Ejercicio 2024/25","firstYear":2025,"lastYear":2025}};

memberCountByClub["realbetis-es"] = null;
