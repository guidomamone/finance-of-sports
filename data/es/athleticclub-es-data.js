// GENERADO desde data/es/athleticclub-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const athleticclubEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competición","normalizedCategory":"competition_bonus","amountNative":38.981106,"disclosureLevel":"detailed","items":[["Liga",3.725443],["Copa",3.044278],["UEFA",31.99281],["Otros",0.218576]]},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":72.713424,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos de comercialización y publicidad","normalizedCategory":"sponsorship_commercial","amountNative":14.675772,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos San Mamés VIP Area","normalizedCategory":"stadium_other","amountNative":8.847445,"disclosureLevel":"detailed"},
    {"rawLabel":"Eventos y otros (incluye la final de la UEFA Europa League en San Mamés)","normalizedCategory":"other_income","amountNative":4.244512,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":26.937099,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":3.922252,"disclosureLevel":"detailed"},
    {"rawLabel":"Imputación de subvenciones de inmovilizado no financiero y otras","normalizedCategory":"other_income","amountNative":0.157316,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros Resultados","normalizedCategory":"other_income","amountNative":1.030427,"disclosureLevel":"detailed"},
  ],
};

const athleticclubEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Variación de existencias de productos terminados y en curso de fabricación","normalizedCategory":"other_expenses","amountNative":-0.007075,"disclosureLevel":"detailed"},
    {"rawLabel":"Aprovisionamientos (otros consumos y gastos externos)","normalizedCategory":"admin_general_expense","amountNative":-1.479335,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos y salarios plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-100.826491,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros Sueldos, salarios y asimilados","normalizedCategory":"admin_general_expense","amountNative":-16.37518,"disclosureLevel":"detailed"},
    {"rawLabel":"Cargas sociales","normalizedCategory":"wages_squad","amountNative":-4.870866,"disclosureLevel":"detailed"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-15.926377,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.431788,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-4.222025,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":0.260109,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-10.763129,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización del inmovilizado (activos fijos, sin fichajes por política de cantera)","normalizedCategory":"depreciation","amountNative":-11.089739,"disclosureLevel":"detailed"},
  ],
};

const athleticclubEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"athleticclub-es-cuentas-anuales-2024-25","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":2.391898,"assetSales":0,"netInterest":-0.476968,"tax":-0.711651,"grossDebt":0,"cash":46.086948,"officialTotalRevenue":171.509353,"officialTotalExpenses":165.731896,"officialPAT":6.980736,"baseIngreso":"full"},
};

const athleticclubEsPasesData = [];
const athleticclubEsResultadosData = {};
const athleticclubEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["athleticclub-es"] = {
  revenueLinesByYear: athleticclubEsRevenueLinesByYear, expenseLinesByYear: athleticclubEsExpenseLinesByYear,
  fiscalYearMeta: athleticclubEsFiscalYearMeta, pasesData: athleticclubEsPasesData,
  resultadosData: athleticclubEsResultadosData, titulosData: athleticclubEsTitulosData,
};

Object.assign(sources, {"athleticclub-es-cuentas-anuales-2024-25":{"id":"athleticclub-es-cuentas-anuales-2024-25","clubId":"athleticclub-es","title":"Cuentas Anuales 2024-2025 (presentadas en la Asamblea General de socios), Ejercicio 1/7/2024 a 30/6/2025","type":"official_balance_sheet","reliability":"primary","url":"https://cdn.athletic-club.eus/txoko-utils/"}});

gestionesByClub["athleticclub-es"] = {"ejercicio2025":{"nombre":"Ejercicio 2024/25","firstYear":2025,"lastYear":2025}};

memberCountByClub["athleticclub-es"] = null;
