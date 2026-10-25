// GENERADO desde data/es/rcdmallorca-es.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const rcdmallorcaEsRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Ingresos por competiciones (Liga, Copa del Rey, Supercopa de España, amistosos)","normalizedCategory":"competition_bonus","amountNative":4.927512,"disclosureLevel":"detailed","items":[["Liga",2.423124],["Supercopa de España",2.443429],["Otras competiciones y partidos amistosos",0.06096]]},
    {"rawLabel":"Ingresos por abonados y socios","normalizedCategory":"season_tickets","amountNative":7.661479,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por explotación de instalaciones","normalizedCategory":"stadium_other","amountNative":3.03608,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por retransmisión","normalizedCategory":"broadcasting","amountNative":44.349607,"disclosureLevel":"detailed","items":[["Real Decreto-Ley 5/2015",43.876906],["Otros",0.472701]]},
    {"rawLabel":"Ingresos por comercialización","normalizedCategory":"sponsorship_commercial","amountNative":0.043799,"disclosureLevel":"detailed"},
    {"rawLabel":"Ingresos por publicidad","normalizedCategory":"sponsorship_commercial","amountNative":12.551615,"disclosureLevel":"detailed","items":[["Publicidad estática",6.903299],["Publicidad dinámica",5.648316]]},
    {"rawLabel":"Otros ingresos (LFP, subvenciones, cesiones y varios)","normalizedCategory":"other_income","amountNative":1.513622,"disclosureLevel":"detailed","items":[["Ingresos LFP",0.301183],["Subvenciones a la explotación y otros",0.283956],["Cesiones",0.233],["Otros",0.695483]]},
    {"rawLabel":"Imputación de subvenciones de inmovilizado no financiero y otras","normalizedCategory":"other_income","amountNative":0.419249,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros resultados","normalizedCategory":"other_income","amountNative":1.025872,"disclosureLevel":"detailed"},
  ],
};

const rcdmallorcaEsExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Aprovisionamientos y variación de existencias","normalizedCategory":"other_expenses","amountNative":-0.843819,"disclosureLevel":"detailed","items":[["Consumos de material deportivo y tiendas",-0.734218],["Consumos medicinas y material sanitario",-0.109601]]},
    {"rawLabel":"Gastos de personal no deportivo","normalizedCategory":"admin_general_expense","amountNative":-7.862703,"disclosureLevel":"detailed","items":[["Sueldos y salarios personal no deportivo",-6.641955],["Seguridad Social del personal no deportivo",-1.173945],["Otros",-0.046803]]},
    {"rawLabel":"Gastos de personal de plantilla deportiva","normalizedCategory":"wages_squad","amountNative":-45.642816,"disclosureLevel":"detailed","items":[["Gastos plantilla deportiva inscribible en la Liga",-42.763846,[["Sueldos y salarios",-38.749609],["Seguridad social",-0.614236],["Primas colectivas",-3.4]]],["Gastos plantilla deportiva no inscribible en la Liga",-2.87897,[["Sueldos y salarios",-2.337383],["Seguridad social",-0.541587]]]]},
    {"rawLabel":"Servicios exteriores","normalizedCategory":"admin_general_expense","amountNative":-10.813982,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributos","normalizedCategory":"admin_general_expense","amountNative":-0.074673,"disclosureLevel":"detailed"},
    {"rawLabel":"Pérdidas, deterioro y variación de provisiones por operaciones comerciales","normalizedCategory":"other_expenses","amountNative":-0.00605,"disclosureLevel":"detailed"},
    {"rawLabel":"Desplazamientos","normalizedCategory":"match_organisation_expense","amountNative":-3.657023,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros gastos de gestión corriente","normalizedCategory":"admin_general_expense","amountNative":-0.408524,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos de adquisición de jugadores (inscribibles y no inscribibles en la Liga)","normalizedCategory":"other_expenses","amountNative":-1.688745,"disclosureLevel":"detailed","items":[["Inscribibles en la Liga",-0.748738],["No inscribibles en la Liga",-0.940007]]},
    {"rawLabel":"Otros (gastos de gestión corriente)","normalizedCategory":"other_expenses","amountNative":-5.272207,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización del inmovilizado material","normalizedCategory":"depreciation","amountNative":-2.310358,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortizaciones del intangible (excluido jugadores)","normalizedCategory":"other_amortisation","amountNative":-0.426126,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización derechos adquisición de jugadores (inscribibles y no inscribibles en la Liga)","normalizedCategory":"player_amortisation","amountNative":-13.006063,"disclosureLevel":"detailed","items":[["Inscribibles en la Liga",-12.683201],["No inscribibles en la Liga",-0.322861]]},
  ],
};

const rcdmallorcaEsFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"rcdmallorca-es-cuentas-anuales-informe-gestion-2024-25","reportType":"official_balance_sheet","gestionId":"sin_confirmar","fxRef":"EUR@2025-06-30","fxSource":"market_close","profitOnPlayerSales":7.768888,"assetSales":0,"netInterest":-1.151946,"tax":-0.132013,"grossDebt":59.60432,"cash":3.599131,"officialTotalRevenue":75.528837,"officialTotalExpenses":92.01309,"officialPAT":-9.999324,"baseIngreso":"full"},
};

const rcdmallorcaEsPresupuestoOverlayByYear = {};

const rcdmallorcaEsPasesData = [];
const rcdmallorcaEsResultadosData = {};
const rcdmallorcaEsTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["rcdmallorca-es"] = {
  revenueLinesByYear: rcdmallorcaEsRevenueLinesByYear, expenseLinesByYear: rcdmallorcaEsExpenseLinesByYear,
  fiscalYearMeta: rcdmallorcaEsFiscalYearMeta, pasesData: rcdmallorcaEsPasesData,
  resultadosData: rcdmallorcaEsResultadosData, titulosData: rcdmallorcaEsTitulosData,
  presupuestoOverlayByYear: rcdmallorcaEsPresupuestoOverlayByYear,
};

Object.assign(sources, {"rcdmallorca-es-cuentas-anuales-informe-gestion-2024-25":{"id":"rcdmallorca-es-cuentas-anuales-informe-gestion-2024-25","clubId":"rcdmallorca-es","title":"Cuentas Anuales e Informe de Gestión, Temporada 2024-25","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["rcdmallorca-es"] = {"sin_confirmar":{"nombre":"Sin confirmar","firstYear":2025,"lastYear":2025}};

memberCountByClub["rcdmallorca-es"] = null;
