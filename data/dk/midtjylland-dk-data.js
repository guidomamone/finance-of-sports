// GENERADO desde data/dk/midtjylland-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const midtjyllandDkRevenueLinesByYear = {
  2019: [
    {"rawLabel":"Nettoomsætning","normalizedCategory":"lump_football_operations","amountNative":107.921,"disclosureLevel":"aggregate"},
    {"rawLabel":"Andre driftsindtægter (avance por venta de derechos federativos)","normalizedCategory":"player_sales","amountNative":161.96,"disclosureLevel":"detailed"},
  ],
  2020: [
    {"rawLabel":"Nettoomsætning Revenue","normalizedCategory":"lump_football_operations","amountNative":87.61,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsindtægter Other operating income","normalizedCategory":"other_income","amountNative":98.637,"disclosureLevel":"aggregated"},
  ],
};

const midtjyllandDkExpenseLinesByYear = {
  2019: [
    {"rawLabel":"Andre eksterne omkostninger","normalizedCategory":"other_expenses","amountNative":-73.974,"disclosureLevel":"aggregate"},
    {"rawLabel":"Personaleomkostninger","normalizedCategory":"wages_squad","amountNative":-93.592,"disclosureLevel":"detailed"},
    {"rawLabel":"Afskrivninger af immaterielle anlægsaktiver","normalizedCategory":"player_amortisation","amountNative":-29.319,"disclosureLevel":"detailed"},
    {"rawLabel":"Afskrivninger af materielle anlægsaktiver","normalizedCategory":"depreciation","amountNative":-3.291,"disclosureLevel":"detailed"},
    {"rawLabel":"Andre driftsomkostninger","normalizedCategory":"other_expenses","amountNative":-3.244,"disclosureLevel":"aggregate"},
  ],
  2020: [
    {"rawLabel":"Andre eksterne omkostninger Other external expenses","normalizedCategory":"other_expenses","amountNative":-61.833,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lønninger","normalizedCategory":"wages_squad","amountNative":-93.413,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioner","normalizedCategory":"wages_squad","amountNative":-7.544,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-2.363,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afskrivninger af immaterielle anlægsaktiver","normalizedCategory":"player_amortisation","amountNative":-36.929,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afskrivninger af materielle anlægsaktiver","normalizedCategory":"depreciation","amountNative":-3.126,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsomkostninger Other operating expenses","normalizedCategory":"other_expenses","amountNative":-0.056,"disclosureLevel":"aggregated"},
  ],
};

const midtjyllandDkFiscalYearMeta = {
  2019: {"currency":"DKK","sourceId":"midtjylland-dk-aarsrapport-2019","reportType":"official_balance_sheet","gestionId":"benham","fxRef":"DKK@2019-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.043,"tax":-10.649,"grossDebt":1.22,"cash":53.452,"officialTotalRevenue":269.881,"officialTotalExpenses":203.42,"officialPAT":55.769,"sinDesglose":[{"renglon":"Nettoomsætning","lado":"revenue","importe":107.921,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
  2020: {"currency":"DKK","sourceId":"midtjylland-dk-aarsrapport-2020-06-30","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2020-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.507,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":186.247,"officialTotalExpenses":205.264,"officialPAT":-19.524,"extraRows":[{"label":"Finansielle indtægter Financial income","value":0.059},{"label":"Finansielle omkostninger Financial expenses","value":-0.566},{"label":"Skat af årets resultat Tax on profit/loss for the year","value":0}],"sinDesglose":[{"renglon":"Nettoomsætning Revenue","lado":"revenue","importe":87.61,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const midtjyllandDkPresupuestoOverlayByYear = {};

const midtjyllandDkPasesData = [];
const midtjyllandDkResultadosData = {};
const midtjyllandDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["midtjylland-dk"] = {
  revenueLinesByYear: midtjyllandDkRevenueLinesByYear, expenseLinesByYear: midtjyllandDkExpenseLinesByYear,
  fiscalYearMeta: midtjyllandDkFiscalYearMeta, pasesData: midtjyllandDkPasesData,
  resultadosData: midtjyllandDkResultadosData, titulosData: midtjyllandDkTitulosData,
  presupuestoOverlayByYear: midtjyllandDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"midtjylland-dk-aarsrapport-2019":{"id":"midtjylland-dk-aarsrapport-2019","clubId":"midtjylland-dk","title":"Årsrapport FC Midtjylland A/S, 1. juli 2018 - 30. juni 2019","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/65167513/ZG9rdW1lbnRsYWdlcjovLzAzL2E1LzYzLzFiL2RjL2RhZDMtNGZiMC1iNzUyLWZjNTFiNDAyNWIwMg.pdf"},"midtjylland-dk-aarsrapport-2020-06-30":{"id":"midtjylland-dk-aarsrapport-2020-06-30","clubId":"midtjylland-dk","title":"FC Midtjylland A/S — aarsrapport-2020-06-30 (ejercicio 2020)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/65167513/amNsb3VkczovLzAzLzIyLzY4L2MxLzhjLzliMDgtNDEwZS1hYThiLTg1NDNhYTMyYjgyMQ.pdf","documento":"Clubes/Dinamarca/FC Midtjylland/aarsrapport-2020-06-30.pdf"}});

gestionesByClub["midtjylland-dk"] = {"benham":{"nombre":"Matthew Benham","firstYear":2019,"lastYear":2019}};

memberCountByClub["midtjylland-dk"] = null;
