// GENERADO desde data/es/villarrealcf-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const villarrealcfEsRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Importe neto de la cifra de negocios (ventas, sin desglosar por concepto)","normalizedCategory":"lump_football_operations","amountNative":119.721562,"disclosureLevel":"summary"},
    {"rawLabel":"Otros ingresos de explotación","normalizedCategory":"other_income","amountNative":8.564334,"disclosureLevel":"detailed"},
  ],
};

const villarrealcfEsExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Aprovisionamientos (consumo de mercaderías y materias primas)","normalizedCategory":"other_expenses","amountNative":-5.542115,"disclosureLevel":"detailed"},
    {"rawLabel":"Sueldos, salarios y asimilados + Cargas sociales (sin separar plantel deportivo/no deportivo)","normalizedCategory":"wages_squad","amountNative":-108.089071,"disclosureLevel":"summary"},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-21.563438,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.24245,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-0.001407,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-6.44751,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización del inmovilizado (sin separar jugadores del resto, ver comentario arriba)","normalizedCategory":"player_amortisation","amountNative":-27.897705,"disclosureLevel":"summary"},
  ],
};

const villarrealcfEsFiscalYearMeta = {
  2024: {"currency":"EUR","sourceId":"villarrealcf-es-estados-financieros-2023-24","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2024-06-30","profitOnPlayerSales":26.425834,"assetSales":0,"netInterest":-0.945099,"tax":1.895827,"grossDebt":116.355224,"cash":47.616789,"officialTotalRevenue":128.285896,"officialTotalExpenses":169.783696,"officialPAT":-14.121238,"sinDesglose":[{"renglon":"Importe neto de la cifra de negocios (ventas, sin desglosar por concepto)","lado":"revenue","importe":119.721562,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const villarrealcfEsPasesData = [];
const villarrealcfEsResultadosData = {};
const villarrealcfEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["villarrealcf-es"] = {
  revenueLinesByYear: villarrealcfEsRevenueLinesByYear, expenseLinesByYear: villarrealcfEsExpenseLinesByYear,
  fiscalYearMeta: villarrealcfEsFiscalYearMeta, pasesData: villarrealcfEsPasesData,
  resultadosData: villarrealcfEsResultadosData, titulosData: villarrealcfEsTitulosData,
};

Object.assign(sources, {"villarrealcf-es-estados-financieros-2023-24":{"id":"villarrealcf-es-estados-financieros-2023-24","clubId":"villarrealcf-es","title":"Estados Financieros correspondientes al ejercicio anual terminado el 30 de junio de 2024","type":"official_balance_sheet","reliability":"primary","url":"https://web.archive.org/web/2024/https://villarrealcf.es/wp-content/uploads/2.b.ii-CCAA-Villarreal-firmadas.pdf"}});

gestionesByClub["villarrealcf-es"] = {"ejercicio2024":{"nombre":"Ejercicio 2023/24","firstYear":2024,"lastYear":2024}};

memberCountByClub["villarrealcf-es"] = null;
