// GENERADO desde data/no/aalesund-no.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const aalesundNoRevenueLinesByYear = {
  2018: [
    {"rawLabel":"Driftsinntekter","normalizedCategory":"lump_football_operations","amountNative":41.591465,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Salgsinntekter","normalizedCategory":"lump_football_operations","amountNative":58.461725,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsinntekter","normalizedCategory":"other_income","amountNative":3.667334,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Salgsinntekter","normalizedCategory":"lump_football_operations","amountNative":69.990515,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsinntekter","normalizedCategory":"other_income","amountNative":0.440395,"disclosureLevel":"aggregated"},
  ],
};

const aalesundNoExpenseLinesByYear = {
  2018: [
    {"rawLabel":"Varekostnad","normalizedCategory":"other_expenses","amountNative":-3.189119,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lønninger","normalizedCategory":"wages_squad","amountNative":-5.690818,"disclosureLevel":"aggregated"},
    {"rawLabel":"Arbeidsgiveravgift","normalizedCategory":"wages_squad","amountNative":-0.843734,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensjonskostnader","normalizedCategory":"wages_squad","amountNative":-0.095287,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre ytelser","normalizedCategory":"wages_squad","amountNative":-0.567861,"disclosureLevel":"aggregated"},
    {"rawLabel":"Avskrivning varige driftsmidler","normalizedCategory":"depreciation","amountNative":-1.445907,"disclosureLevel":"aggregated"},
    {"rawLabel":"Annen driftskostnad","normalizedCategory":"other_expenses","amountNative":-29.646338,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Varekostnad","normalizedCategory":"other_expenses","amountNative":-5.103577,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lønninger","normalizedCategory":"wages_squad","amountNative":-5.87314,"disclosureLevel":"aggregated"},
    {"rawLabel":"Arbeidsgiveravgift","normalizedCategory":"wages_squad","amountNative":-0.990694,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensjonskostnader","normalizedCategory":"wages_squad","amountNative":-0.164773,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre ytelser","normalizedCategory":"wages_squad","amountNative":-0.510002,"disclosureLevel":"aggregated"},
    {"rawLabel":"Avskrivning varige driftsmidler og immatrielle eiendeler","normalizedCategory":"depreciation","amountNative":-4.478254,"disclosureLevel":"aggregated"},
    {"rawLabel":"Annen driftskostnad","normalizedCategory":"other_expenses","amountNative":-49.163715,"disclosureLevel":"aggregated"},
  ],
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
  2018: {"currency":"NOK","sourceId":"aalesund-no-aarsregnskap-aalesund-fotball-as-2018","reportType":"official_balance_sheet","gestionId":null,"fxRef":"NOK@2018-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":1.089348,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":41.591465,"officialTotalExpenses":41.479064,"officialPAT":1.201748,"extraRows":[{"label":"Inntekt på investering i datterselskap","value":0.221485},{"label":"Annen renteinntekt","value":0.604107},{"label":"Annen finansinntekt","value":0.925471},{"label":"Nedskrivning av finansielle anleggsmidler","value":-0.54583},{"label":"Annen rentekostnad","value":-0.115885},{"label":"Annen finanskostnad","value":0}],"sinDesglose":[{"renglon":"Driftsinntekter","lado":"revenue","importe":41.591465,"motivo":"Claude 2026-10-26 (sesion): lineas 344-345: Driftsinntekter es el unico renglon de ingresos y la nota solo repite su importe: sin desglose","tipo":"net_sales"}],"baseIngreso":"sales_total"},
  2024: {"currency":"NOK","sourceId":"aalesund-no-aarsregnskap-aalesund-fotball-as-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"NOK@2024-02-29","profitOnPlayerSales":0,"assetSales":0,"netInterest":4.809395,"tax":-0.199261,"grossDebt":null,"cash":null,"officialTotalRevenue":62.129059,"officialTotalExpenses":66.284155,"officialPAT":0.455038,"extraRows":[{"label":"Inntekt på investering i datterselskap","value":0},{"label":"Renteinntekt fra foretak i samme konsern","value":0.45},{"label":"Annen renteinntekt","value":0.171575},{"label":"Annen finansinntekt","value":5.185079},{"label":"Nedskrivning av andre finansielle omløpsmidler","value":-0.96949},{"label":"Annen rentekostnad","value":-0.027769},{"label":"Skattekostnad på ordinært resultat","value":-0.199261}],"sinDesglose":[{"renglon":"Salgsinntekter","lado":"revenue","importe":58.461725,"motivo":"Claude 2026-10-18 (subagente Sonnet): Salgsinntekt es un unico renglon sin desglose en ninguna parte del documento (Note 3 repite 69 990 515 sin abrir; Note 2 solo da la transferencia de la cooperacion con el FLI, 27 578 215). Lump_football_operations es el caso correcto. Televisión y Estadio dan 0 por esto: estan incluidos en Salgsinntekter, no se puede abrir. [Salgsinntekter 69 990 515 (L302); Overførsel iht. avtale 27 578 215 (L296)]","tipo":"net_sales"}],"baseIngreso":"full"},
  2025: {"currency":"NOK","sourceId":"aalesund-no-aarsregnskap-aalesund-fotball-as-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"NOK@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.657928,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":70.43091,"officialTotalExpenses":69.574018,"officialPAT":1.51482,"extraRows":[{"label":"Renteinntekt fra foretak i samme konsern","value":0.45},{"label":"Annen renteinntekt","value":0.14761},{"label":"Annen finansinntekt","value":0.138252},{"label":"Nedskrivning av andre finansielle omløpsmidler","value":0},{"label":"Annen rentekostnad","value":-0.007004},{"label":"Annen finanskostnad","value":-0.07093},{"label":"Skattekostnad på ordinært resultat","value":0}],"sinDesglose":[{"renglon":"Salgsinntekter","lado":"revenue","importe":69.990515,"motivo":"Claude 2026-10-18 (subagente Sonnet): Salgsinntekt es un unico renglon sin desglose en ninguna parte del documento (Note 3 repite 69 990 515 sin abrir; Note 2 solo da la transferencia de la cooperacion con el FLI, 27 578 215). Lump_football_operations es el caso correcto. Televisión y Estadio dan 0 por esto: estan incluidos en Salgsinntekter, no se puede abrir. [Salgsinntekter 69 990 515 (L302); Overførsel iht. avtale 27 578 215 (L296)]","tipo":"net_sales"}],"baseIngreso":"full"},
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

Object.assign(sources, {"aalesund-no-aarsregnskap-aalesund-fotball-as-2025":{"id":"aalesund-no-aarsregnskap-aalesund-fotball-as-2025","clubId":"aalesund-no","title":"Ålesund Fotball AS — aarsregnskap-aalesund-fotball-as-2025 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2025.pdf"},"aalesund-no-aarsregnskap-aalesund-fotball-as-2018":{"id":"aalesund-no-aarsregnskap-aalesund-fotball-as-2018","clubId":"aalesund-no","title":"Ålesund Fotball AS — aarsregnskap-aalesund-fotball-as-2018 (ejercicio 2018)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2018.pdf"},"aalesund-no-aarsregnskap-aalesund-fotball-as-2024":{"id":"aalesund-no-aarsregnskap-aalesund-fotball-as-2024","clubId":"aalesund-no","title":"Ålesund Fotball AS — aarsregnskap-aalesund-fotball-as-2024 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Noruega/Aalesund/aarsregnskap-aalesund-fotball-as-2024.pdf"}});

memberCountByClub["aalesund-no"] = null;
