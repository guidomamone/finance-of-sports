// GENERADO desde data/no/aalesund-no.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const aalesundNoRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Salgsinntekter","normalizedCategory":"lump_football_operations","amountNative":69.990515,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsinntekter","normalizedCategory":"other_income","amountNative":0.440395,"disclosureLevel":"aggregated"},
  ],
};

const aalesundNoExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Varekostnad","normalizedCategory":"other_expenses","amountNative":-6.366043,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lønninger","normalizedCategory":"wages_squad","amountNative":-5.45678,"disclosureLevel":"aggregated"},
    {"rawLabel":"Arbeidsgiveravgift","normalizedCategory":"wages_squad","amountNative":-0.854926,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensjonskostnader","normalizedCategory":"wages_squad","amountNative":-0.151065,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre ytelser","normalizedCategory":"wages_squad","amountNative":-0.43456,"disclosureLevel":"aggregated"},
    {"rawLabel":"Avskrivning varige driftsmidler og immaterielle eiendeler","normalizedCategory":"depreciation","amountNative":-6.632698,"disclosureLevel":"aggregated"},
    {"rawLabel":"Annen driftskostnad","normalizedCategory":"other_expenses","amountNative":-49.677946,"disclosureLevel":"aggregated"},
  ],
};

const aalesundNoFiscalYearMeta = {
  2025: {"currency":"NOK","sourceId":"aalesund-no-aarsregnskap-aalesund-fotball-as-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"NOK@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.657928,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":70.43091,"officialTotalExpenses":69.574018,"officialPAT":1.51482,"extraRows":[{"label":"Renteinntekt fra foretak i samme konsern","value":0.45},{"label":"Annen renteinntekt","value":0.14761},{"label":"Annen finansinntekt","value":0.138252},{"label":"Nedskrivning av andre finansielle omløpsmidler","value":0},{"label":"Annen rentekostnad","value":-0.007004},{"label":"Annen finanskostnad","value":-0.07093},{"label":"Skattekostnad på ordinært resultat","value":0}],"sinDesglose":[{"renglon":"Salgsinntekter","lado":"revenue","importe":69.990515,"motivo":"Claude 2026-10-18 (subagente Sonnet): Salgsinntekt es un unico renglon sin desglose en ninguna parte del documento (Note 3 repite 69 990 515 sin abrir; Note 2 solo da la transferencia de la cooperacion con el FLI, 27 578 215). Lump_football_operations es el caso correcto. Televisión y Estadio dan 0 por esto: estan incluidos en Salgsinntekter, no se puede abrir. [Salgsinntekter 69 990 515 (L302); Overførsel iht. avtale 27 578 215 (L296)]"}]},
};

const aalesundNoPresupuestoOverlayByYear = {};

const aalesundNoPasesData = [];
const aalesundNoResultadosData = {};
const aalesundNoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["aalesund-no"] = {
  revenueLinesByYear: aalesundNoRevenueLinesByYear, expenseLinesByYear: aalesundNoExpenseLinesByYear,
  fiscalYearMeta: aalesundNoFiscalYearMeta, pasesData: aalesundNoPasesData,
  resultadosData: aalesundNoResultadosData, titulosData: aalesundNoTitulosData,
  presupuestoOverlayByYear: aalesundNoPresupuestoOverlayByYear,
};

Object.assign(sources, {"aalesund-no-aarsregnskap-aalesund-fotball-as-2025":{"id":"aalesund-no-aarsregnskap-aalesund-fotball-as-2025","clubId":"aalesund-no","title":"Ålesund Fotball AS — aarsregnskap-aalesund-fotball-as-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.pdf"}});

memberCountByClub["aalesund-no"] = null;
