// GENERADO desde data/es/realoviedo-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const realoviedoEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones (Liga, Copa del Rey, otras competiciones y amistosos)","normalizedCategory":"competition_bonus","amountNative":1.972266,"disclosureLevel":"detailed","items":[["Liga",1.919717],["Otras competiciones y partidos amistosos",0.020007],["Otros",0.032541]]},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":5.068747,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":7.238523,"disclosureLevel":"summary"},
    {"rawLabel":"Ingresos por comercialización","normalizedCategory":"sponsorship_commercial","amountNative":3.039208,"disclosureLevel":"detailed","items":[["Venta tiendas",3.035735],["Otros",0.003474]]},
    {"rawLabel":"Ingresos por publicidad","normalizedCategory":"sponsorship_commercial","amountNative":5.780227,"disclosureLevel":"detailed","items":[["Publicidad estática",3.78746],["Publicidad dinámica",1.992767]]},
    {"rawLabel":"Otros ingresos (LFP, subvenciones, cesiones y varios)","normalizedCategory":"other_income","amountNative":0.881363,"disclosureLevel":"detailed","items":[["Ingresos LFP",0.080911],["Subvenciones a la explotación y otros",0.364786],["Cesiones",0.300455],["Otros",0.135212]]},
    {"rawLabel":"Imputación de subvenciones de inmovilizado no financiero y otras","normalizedCategory":"other_income","amountNative":0.752718,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros Resultados","normalizedCategory":"other_income","amountNative":0.428962,"disclosureLevel":"detailed"},
  ],
};

const realoviedoEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aprovisionamientos y variación de existencias","normalizedCategory":"other_expenses","amountNative":-2.321316,"disclosureLevel":"detailed","items":[["Consumos de material deportivo",-1.08796],["Variación de existencias",-1.233356]]},
    {"rawLabel":"Gastos de personal no deportivo","normalizedCategory":"admin_general_expense","amountNative":-3.006709,"disclosureLevel":"detailed","items":[["Sueldos y salarios del personal no deportivo",-2.394785],["Indemnizaciones al personal no deportivo",-0.017648],["Seguridad Social del personal no deportivo",-0.594276]]},
    {"rawLabel":"Gastos plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-16.599553,"disclosureLevel":"detailed","items":[["Gastos plantilla deportiva inscribible en la LFP",-15.076363,[["Sueldos y salarios",-9.023668],["Indemnizaciones",-0.996667],["Seguridad Social",-0.554041],["Primas colectivas",-4.5],["Otros",-0.001988]]],["Gastos plantilla deportiva no inscribible en la LFP",-1.52319,[["Sueldos y salarios",-1.170861],["Indemnizaciones",-0.000017],["Seguridad Social",-0.352312]]]]},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-6.979629,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.017966,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-0.012131,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-0.781633,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-0.860947,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos de adquisición de jugadores inscribible en la LFP","normalizedCategory":"other_expenses","amountNative":-0.61051,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortizaciones del inmovilizado material","normalizedCategory":"depreciation","amountNative":-0.600566,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortizaciones del inmovilizado inmaterial (excluido jugadores)","normalizedCategory":"other_amortisation","amountNative":-0.818956,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortizaciones de los derechos de adquisición de jugadores","normalizedCategory":"player_amortisation","amountNative":-0.599567,"disclosureLevel":"detailed"},
  ],
};

const realoviedoEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"realoviedo-es-cuentas-anuales-2024-25","reportType":"official_balance_sheet","gestionId":"sin_confirmar","fxRef":"EUR@2025-06-30","fxSource":"market_close","profitOnPlayerSales":2.771029,"assetSales":0,"netInterest":-0.077772,"tax":-0.224438,"grossDebt":8.124554,"cash":1.433716,"officialTotalRevenue":25.162014,"officialTotalExpenses":33.209483,"officialPAT":-5.57865,"baseIngreso":"full"},
};

const realoviedoEsPresupuestoOverlayByYear = {};

const realoviedoEsPasesData = [];
const realoviedoEsResultadosData = {};
const realoviedoEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["realoviedo-es"] = {
  revenueLinesByYear: realoviedoEsRevenueLinesByYear, expenseLinesByYear: realoviedoEsExpenseLinesByYear,
  fiscalYearMeta: realoviedoEsFiscalYearMeta, pasesData: realoviedoEsPasesData,
  resultadosData: realoviedoEsResultadosData, titulosData: realoviedoEsTitulosData,
  presupuestoOverlayByYear: realoviedoEsPresupuestoOverlayByYear,
};

Object.assign(sources, {"realoviedo-es-cuentas-anuales-2024-25":{"id":"realoviedo-es-cuentas-anuales-2024-25","clubId":"realoviedo-es","title":"Cuentas Anuales, Temporada 2024-25","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["realoviedo-es"] = {"sin_confirmar":{"nombre":"Sin confirmar","firstYear":2025,"lastYear":2025}};

memberCountByClub["realoviedo-es"] = null;
