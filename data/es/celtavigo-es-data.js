// GENERADO desde data/es/celtavigo-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const celtavigoEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones","normalizedCategory":"competition_bonus","amountNative":3.789801,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":6.123352,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":46.285832,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por publicidad","normalizedCategory":"sponsorship_commercial","amountNative":12.580024,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por comercialización y otros","normalizedCategory":"sponsorship_commercial","amountNative":4.151533,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":17.135032,"disclosureLevel":"detailed"},
    {"rawLabel":"Imputación de subvenciones de inmovilizado no financiero y otras","normalizedCategory":"other_income","amountNative":1.245116,"disclosureLevel":"detailed"},
  ],
};

const celtavigoEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Otros consumos y gastos externos","normalizedCategory":"admin_general_expense","amountNative":-3.1042,"disclosureLevel":"detailed"},
    {"rawLabel":"Deterioro de mercaderías, materias primas y otros","normalizedCategory":"other_expenses","amountNative":-0.153973,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos y salarios plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-52.60197,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos y salarios personal no deportivo","normalizedCategory":"admin_general_expense","amountNative":-6.896169,"disclosureLevel":"detailed"},
    {"rawLabel":"Cargas sociales","normalizedCategory":"wages_squad","amountNative":-2.851427,"disclosureLevel":"detailed"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-11.155595,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.024927,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-0.200261,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-3.054748,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos de adquisición de jugadores","normalizedCategory":"other_expenses","amountNative":-11.683761,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-7.457313,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros resultados (negativo este ejercicio)","normalizedCategory":"other_expenses","amountNative":-0.276404,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización derechos adquisición de jugadores","normalizedCategory":"player_amortisation","amountNative":-16.226064,"disclosureLevel":"detailed"},
    {"rawLabel":"Otras amortizaciones","normalizedCategory":"depreciation","amountNative":-2.701799,"disclosureLevel":"detailed"},
  ],
};

const celtavigoEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"celtavigo-es-cuentas-anuales-individual-2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":26.807049,"assetSales":0,"netInterest":-6.223713,"tax":1.868266,"grossDebt":60.315351,"cash":13.97507,"officialTotalRevenue":91.31069,"officialTotalExpenses":118.388611,"officialPAT":-4.626316,"baseIngreso":"full"},
};

const celtavigoEsPasesData = [];
const celtavigoEsResultadosData = {};
const celtavigoEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["celtavigo-es"] = {
  revenueLinesByYear: celtavigoEsRevenueLinesByYear, expenseLinesByYear: celtavigoEsExpenseLinesByYear,
  fiscalYearMeta: celtavigoEsFiscalYearMeta, pasesData: celtavigoEsPasesData,
  resultadosData: celtavigoEsResultadosData, titulosData: celtavigoEsTitulosData,
};

Object.assign(sources, {"celtavigo-es-cuentas-anuales-individual-2024-25":{"id":"celtavigo-es-cuentas-anuales-individual-2024-25","clubId":"celtavigo-es","title":"Cuentas Anuales Individuales 2024-2025, Ejercicio 1/7/2024 a 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["celtavigo-es"] = {"ejercicio2025":{"nombre":"Ejercicio 2024/25","firstYear":2025,"lastYear":2025}};

memberCountByClub["celtavigo-es"] = null;
