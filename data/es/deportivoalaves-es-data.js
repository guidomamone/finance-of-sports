// GENERADO desde data/es/deportivoalaves-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const deportivoalavesEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones","normalizedCategory":"competition_bonus","amountNative":1.099404,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":4.850083,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":43.896471,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por comercialización","normalizedCategory":"sponsorship_commercial","amountNative":0.933491,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por publicidad","normalizedCategory":"sponsorship_commercial","amountNative":10.323112,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":2.780841,"disclosureLevel":"detailed"},
    {"rawLabel":"Imputación de subvenciones de inmovilizado no financiero y otras","normalizedCategory":"other_income","amountNative":0.206209,"disclosureLevel":"detailed"},
  ],
};

const deportivoalavesEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Consumos de material deportivo","normalizedCategory":"other_expenses","amountNative":-0.436733,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros consumos","normalizedCategory":"admin_general_expense","amountNative":-1.737585,"disclosureLevel":"detailed"},
    {"rawLabel":"Variación de existencias","normalizedCategory":"other_expenses","amountNative":0.086784,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos y salarios de la plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-30.795231,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros sueldos, salarios y asimilados","normalizedCategory":"admin_general_expense","amountNative":-8.867831,"disclosureLevel":"detailed"},
    {"rawLabel":"Cargas sociales","normalizedCategory":"wages_squad","amountNative":-2.502813,"disclosureLevel":"detailed"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-12.513873,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.050063,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-0.030677,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-1.070689,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos de adquisición de jugadores","normalizedCategory":"other_expenses","amountNative":-3.879323,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-8.310788,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de derechos de adquisición de jugadores","normalizedCategory":"player_amortisation","amountNative":-5.2573,"disclosureLevel":"detailed"},
    {"rawLabel":"Otras amortizaciones","normalizedCategory":"depreciation","amountNative":-0.804571,"disclosureLevel":"detailed"},
  ],
};

const deportivoalavesEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"deportivoalaves-es-cuentas-anuales-2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":15.096226,"assetSales":0,"netInterest":-3.902985,"tax":1.1,"grossDebt":0,"cash":5.216203,"officialTotalRevenue":64.089611,"officialTotalExpenses":76.170693,"officialPAT":0.212159,"baseIngreso":"full"},
};

const deportivoalavesEsPasesData = [];
const deportivoalavesEsResultadosData = {};
const deportivoalavesEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["deportivoalaves-es"] = {
  revenueLinesByYear: deportivoalavesEsRevenueLinesByYear, expenseLinesByYear: deportivoalavesEsExpenseLinesByYear,
  fiscalYearMeta: deportivoalavesEsFiscalYearMeta, pasesData: deportivoalavesEsPasesData,
  resultadosData: deportivoalavesEsResultadosData, titulosData: deportivoalavesEsTitulosData,
};

Object.assign(sources, {"deportivoalaves-es-cuentas-anuales-2024-25":{"id":"deportivoalaves-es-cuentas-anuales-2024-25","clubId":"deportivoalaves-es","title":"Informe de Auditoría, Cuentas Anuales e Informe de Gestión 2024-2025, Ejercicio 1/7/2024 a 30/6/2025","type":"official_balance_sheet","reliability":"primary","url":"https://cms.bkndagroup.com/uploads/"}});

gestionesByClub["deportivoalaves-es"] = {"ejercicio2025":{"nombre":"Ejercicio 2024/25","firstYear":2025,"lastYear":2025}};

memberCountByClub["deportivoalaves-es"] = null;
