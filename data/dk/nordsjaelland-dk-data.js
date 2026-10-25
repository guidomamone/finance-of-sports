// GENERADO desde data/dk/nordsjaelland-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const nordsjaellandDkRevenueLinesByYear = {
  2024: [
    {"rawLabel":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","normalizedCategory":"lump_football_operations","amountNative":366.004057,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Bruttofortjeneste Gross profit","normalizedCategory":"lump_football_operations","amountNative":460.800148,"disclosureLevel":"aggregated"},
  ],
};

const nordsjaellandDkExpenseLinesByYear = {
  2024: [
    {"rawLabel":"Personaleomkostninger (Staff costs)","normalizedCategory":"wages_squad","amountNative":-175.02707,"disclosureLevel":"detailed"},
    {"rawLabel":"Transferrettigheder — årets afskrivninger (amortisation for the year, transfer rights)","normalizedCategory":"player_amortisation","amountNative":-32.965556,"disclosureLevel":"detailed"},
    {"rawLabel":"Andre anlæg, driftsmateriel og inventar — årets afskrivninger (depreciation for the year, PP&E)","normalizedCategory":"depreciation","amountNative":-10.684047,"disclosureLevel":"detailed"},
    {"rawLabel":"Residuo no explicado entre las Notas 5+6 y el total impreso de \"Depreciation, amortisation and impairment\" (-45.144.140)","normalizedCategory":"other_amortisation","amountNative":-1.494537,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Lønninger og gager Salaries and wages","normalizedCategory":"wages_squad","amountNative":-138.376504,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioner Pension costs","normalizedCategory":"wages_squad","amountNative":-1.834516,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring Other costs for social security","normalizedCategory":"wages_squad","amountNative":-1.838843,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortización derechos de jugadores","normalizedCategory":"player_amortisation","amountNative":-19.889197,"disclosureLevel":"aggregated"},
    {"rawLabel":"Depreciación de materiales","normalizedCategory":"depreciation","amountNative":-2.320184,"disclosureLevel":"aggregated"},
    {"rawLabel":"Baja de derechos de jugadores y otros (resto de la línea de amortizaciones)","normalizedCategory":"other_amortisation","amountNative":-13.511776,"disclosureLevel":"aggregated"},
  ],
};

const nordsjaellandDkFiscalYearMeta = {
  2024: {"currency":"DKK","sourceId":"nordsjaelland-dk-aarsrapport-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.576407,"tax":-31.778343,"grossDebt":20.625,"cash":16.943338,"officialTotalRevenue":366.004057,"officialTotalExpenses":220.17121,"officialPAT":111.478097,"sinDesglose":[{"renglon":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","lado":"revenue","importe":366.004057,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}]},
  2025: {"currency":"DKK","sourceId":"nordsjaelland-dk-aarsrapport-2025-12-31","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-8.778991,"tax":-65.011162,"grossDebt":null,"cash":102.641669,"officialTotalRevenue":460.800148,"officialTotalExpenses":177.77102,"officialPAT":209.238975,"extraRows":[{"label":"Andre finansielle indtægter fra tilknyttede virksomheder Other financial income from group enterprises","value":1.137518},{"label":"Andre finansielle indtægter Other financial income","value":1.590029},{"label":"Øvrige finansielle omkostninger Other financial costs","value":-11.506538},{"label":"Skat af årets resultat Tax on net profit or loss for the year","value":-65.011162}],"sinDesglose":[{"renglon":"Bruttofortjeneste Gross profit","lado":"revenue","importe":460.800148,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}]},
};

const nordsjaellandDkPresupuestoOverlayByYear = {};

const nordsjaellandDkPasesData = [];
const nordsjaellandDkResultadosData = {};
const nordsjaellandDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["nordsjaelland-dk"] = {
  revenueLinesByYear: nordsjaellandDkRevenueLinesByYear, expenseLinesByYear: nordsjaellandDkExpenseLinesByYear,
  fiscalYearMeta: nordsjaellandDkFiscalYearMeta, pasesData: nordsjaellandDkPasesData,
  resultadosData: nordsjaellandDkResultadosData, titulosData: nordsjaellandDkTitulosData,
  presupuestoOverlayByYear: nordsjaellandDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"nordsjaelland-dk-aarsrapport-2024":{"id":"nordsjaelland-dk-aarsrapport-2024","clubId":"nordsjaelland-dk","title":"FC Nordsjælland A/S — Årsrapport 2024 / Annual report 2024 (01.01.2024 - 31.12.2024)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/30775242/amNsb3VkczovLzAzLzgwL2QwLzkzL2Q4LzY0ODQtNGRlZi1hOWFhLTFhYWM1NzdjNjFhZA.pdf"},"nordsjaelland-dk-aarsrapport-2025-12-31":{"id":"nordsjaelland-dk-aarsrapport-2025-12-31","clubId":"nordsjaelland-dk","title":"FC Nordsjælland A/S — aarsrapport-2025-12-31 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/30775242/amNsb3VkczovLzAzL2ZhLzhjLzdjLzNjLzkwMjMtNDhhYS05YTc1LTJiMzUwZTVmMzAzZQ.xhtml","documento":"Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2025-12-31.pdf"}});

memberCountByClub["nordsjaelland-dk"] = null;
