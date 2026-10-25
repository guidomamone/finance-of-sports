// GENERADO desde data/es/rayovallecano-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const rayovallecanoEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones","normalizedCategory":"competition_bonus","amountNative":1.990519,"disclosureLevel":"summary"},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":3.155612,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":43.206514,"disclosureLevel":"summary"},
    {"rawLabel":"Ingresos por comercialización","normalizedCategory":"sponsorship_commercial","amountNative":0.557798,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por publicidad","normalizedCategory":"sponsorship_commercial","amountNative":7.10728,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos de explotación (accesorios, gestión corriente y subvenciones)","normalizedCategory":"other_income","amountNative":1.974943,"disclosureLevel":"detailed","items":[["Ingresos accesorios y otros de gestión corriente",0.472629],["Subvenciones de explotación incorporadas al resultado del ejercicio",1.502314]]},
    {"rawLabel":"Excesos de provisiones","normalizedCategory":"other_income","amountNative":0.47025,"disclosureLevel":"detailed"},
  ],
};

const rayovallecanoEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aprovisionamientos","normalizedCategory":"other_expenses","amountNative":-1.291365,"disclosureLevel":"detailed","items":[["Compras de material deportivo",-1.042489],["Otros consumos",-0.248876]]},
    {"rawLabel":"Gastos de personal no deportivo","normalizedCategory":"admin_general_expense","amountNative":-0.503022,"disclosureLevel":"detailed","items":[["Sueldos y salarios del personal no deportivo",-0.358913],["Indemnizaciones al personal no deportivo",-0.0035],["Seguridad social del personal no deportivo",-0.132114],["Cargas Sociales",-0.008494]]},
    {"rawLabel":"Gastos plantilla deportiva (inscribible y no inscribible en la LFP)","normalizedCategory":"wages_squad","amountNative":-34.816465,"disclosureLevel":"detailed","items":[["Plantilla deportiva inscribible en la LFP",-32.444508,[["Sueldos y salarios",-30.615356],["Seguridad social",-0.545327],["Primas colectivas",-1.283825]]],["Plantilla deportiva no inscribible en la LFP",-2.371957,[["Sueldos y salarios",-1.837668],["Indemnizaciones",-0.004],["Seguridad social",-0.286647],["Primas colectivas",-0.243642]]]]},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-6.783907,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.015975,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-0.51398,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos de adquisición de jugadores (plantilla inscribible y no inscribible en la LFP)","normalizedCategory":"other_expenses","amountNative":-4.643,"disclosureLevel":"detailed","items":[["Inscribible en la LFP",-4.625],["No inscribible en la LFP",-0.018]]},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-1.338815,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-1.280966,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización derechos adquisición de jugadores (inscribible y no inscribible en la LFP)","normalizedCategory":"player_amortisation","amountNative":-7.038446,"disclosureLevel":"detailed"},
    {"rawLabel":"Otras amortizaciones","normalizedCategory":"other_amortisation","amountNative":-0.00333,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros resultados","normalizedCategory":"other_expenses","amountNative":-0.230713,"disclosureLevel":"detailed"},
  ],
};

const rayovallecanoEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"rayovallecano-es-informe-auditoria-cuentas-anuales-2024-25","reportType":"official_balance_sheet","gestionId":"martinpresa","fxRef":"EUR@2025-06-30","fxSource":"market_close","profitOnPlayerSales":1.5,"assetSales":0,"netInterest":-0.04341,"tax":0.053444,"grossDebt":1.202364,"cash":39.714987,"officialTotalRevenue":58.462916,"officialTotalExpenses":58.459984,"officialPAT":1.512965,"baseIngreso":"full"},
};

const rayovallecanoEsPresupuestoOverlayByYear = {};

const rayovallecanoEsPasesData = [];
const rayovallecanoEsResultadosData = {};
const rayovallecanoEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["rayovallecano-es"] = {
  revenueLinesByYear: rayovallecanoEsRevenueLinesByYear, expenseLinesByYear: rayovallecanoEsExpenseLinesByYear,
  fiscalYearMeta: rayovallecanoEsFiscalYearMeta, pasesData: rayovallecanoEsPasesData,
  resultadosData: rayovallecanoEsResultadosData, titulosData: rayovallecanoEsTitulosData,
  presupuestoOverlayByYear: rayovallecanoEsPresupuestoOverlayByYear,
};

Object.assign(sources, {"rayovallecano-es-informe-auditoria-cuentas-anuales-2024-25":{"id":"rayovallecano-es-informe-auditoria-cuentas-anuales-2024-25","clubId":"rayovallecano-es","title":"Informe de Auditoría, Cuentas Anuales e Informe de Gestión del ejercicio cerrado a 30 de junio de 2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["rayovallecano-es"] = {"martinpresa":{"nombre":"Martín Presa","firstYear":2025,"lastYear":2025}};

memberCountByClub["rayovallecano-es"] = null;
