// GENERADO desde data/dk/randers-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const randersDkRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","normalizedCategory":"lump_football_operations","amountNative":61.744974,"disclosureLevel":"aggregated"},
  ],
};

const randersDkExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Løn- og personaleomkostninger (Løn og gager + Pensioner + Andre omkostninger til social sikring)","normalizedCategory":"wages_squad","amountNative":-54.229295,"disclosureLevel":"detailed","items":[["Løn og gager",-47.872434],["Pensioner",-4.269825],["Andre omkostninger til social sikring",-2.087037]]},
    {"rawLabel":"Kontraktrettigheder mv. — årets af- og nedskrivninger (amortisation for the year, player registrations)","normalizedCategory":"player_amortisation","amountNative":-6.877926,"disclosureLevel":"detailed"},
    {"rawLabel":"Indretning af lejede lokaler + Andre anlæg, driftsmateriel og inventar — årets af- og nedskrivninger","normalizedCategory":"depreciation","amountNative":-1.066125,"disclosureLevel":"detailed","items":[["Indretning af lejede lokaler",-0.479431],["Andre anlæg, driftsmateriel og inventar",-0.586694]]},
  ],
};

const randersDkFiscalYearMeta = {
  2023: {"currency":"DKK","sourceId":"randers-dk-aarsrapport-2022-23","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2023-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":2.568178,"tax":0.054931,"grossDebt":2.062693,"cash":11.464548,"officialTotalRevenue":61.744974,"officialTotalExpenses":62.173346,"officialPAT":2.194737,"sinDesglose":[{"renglon":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","lado":"revenue","importe":61.744974,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}]},
};

const randersDkPresupuestoOverlayByYear = {};

const randersDkPasesData = [];
const randersDkResultadosData = {};
const randersDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["randers-dk"] = {
  revenueLinesByYear: randersDkRevenueLinesByYear, expenseLinesByYear: randersDkExpenseLinesByYear,
  fiscalYearMeta: randersDkFiscalYearMeta, pasesData: randersDkPasesData,
  resultadosData: randersDkResultadosData, titulosData: randersDkTitulosData,
  presupuestoOverlayByYear: randersDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"randers-dk-aarsrapport-2022-23":{"id":"randers-dk-aarsrapport-2022-23","clubId":"randers-dk","title":"Randers FC A/S — Årsrapport 1. juli 2022 - 30. juni 2023","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/61804938/amNsb3VkczovLzAzLzVmL2ZlL2JkLzA0L2Q2MmMtNGQwNi1iNzAwLTgyYTQ5YjEzNWRiOQ.pdf"}});

memberCountByClub["randers-dk"] = null;
