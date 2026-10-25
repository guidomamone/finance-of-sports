// GENERADO desde data/dk/vejle-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const vejleDkRevenueLinesByYear = {
  2022: [
    {"rawLabel":"Bruttofortjeneste","normalizedCategory":"lump_football_operations","amountNative":41.571,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa explícitamente la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","normalizedCategory":"lump_football_operations","amountNative":47.596,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Bruttofortjeneste","normalizedCategory":"lump_football_operations","amountNative":53.447,"disclosureLevel":"aggregated"},
    {"rawLabel":"Indtægter af kapitalandele i tilknyttede virksomheder","normalizedCategory":"other_income","amountNative":0.783,"disclosureLevel":"aggregated"},
  ],
};

const vejleDkExpenseLinesByYear = {
  2022: [
    {"rawLabel":"Lønninger","normalizedCategory":"wages_squad","amountNative":-42.159,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioner","normalizedCategory":"wages_squad","amountNative":-2.254,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-0.631,"disclosureLevel":"aggregated"},
    {"rawLabel":"Af- og nedskrivninger af immaterielle og materielle anlægsaktiver","normalizedCategory":"player_amortisation","amountNative":-3.603,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Personaleomkostninger (Lønninger + Pensioner + Andre omkostninger til social sikring)","normalizedCategory":"wages_squad","amountNative":-48.591,"disclosureLevel":"detailed","items":[["Lønninger",-45.433],["Pensioner",-2.471],["Andre omkostninger til social sikring",-0.687]]},
    {"rawLabel":"Andre driftsomkostninger (residual, sin nota propia)","normalizedCategory":"other_expenses","amountNative":-0.082,"disclosureLevel":"aggregated"},
    {"rawLabel":"Immaterielle anlægsaktiver — afskrivninger (amortisation for the year, registraciones de jugadores)","normalizedCategory":"player_amortisation","amountNative":-2.392,"disclosureLevel":"detailed"},
    {"rawLabel":"Materielle anlægsaktiver — afskrivninger (Andre anlæg, driftsmateriel og inventar + Indretning af lejede lokaler)","normalizedCategory":"depreciation","amountNative":-0.962,"disclosureLevel":"detailed","items":[["Andre anlæg, driftsmateriel og inventar",-0.828],["Indretning af lejede lokaler",-0.134]]},
  ],
  2025: [
    {"rawLabel":"Lønninger","normalizedCategory":"wages_squad","amountNative":-50.539,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensioner","normalizedCategory":"wages_squad","amountNative":-3.219,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-0.733,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre driftsomkostninger","normalizedCategory":"other_expenses","amountNative":-0.07,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortización derechos de jugadores","normalizedCategory":"player_amortisation","amountNative":-2.322,"disclosureLevel":"aggregated"},
    {"rawLabel":"Depreciación de materiales","normalizedCategory":"depreciation","amountNative":-1.012,"disclosureLevel":"aggregated"},
  ],
};

const vejleDkFiscalYearMeta = {
  2022: {"currency":"DKK","sourceId":"vejle-dk-aarsrapport-2022-12-31","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2022-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.275,"tax":0.181,"grossDebt":null,"cash":null,"officialTotalRevenue":41.571,"officialTotalExpenses":48.647,"officialPAT":-6.62,"extraRows":[{"label":"Indtægter af kapitalandele i tilknyttede virksomheder","value":0.545},{"label":"Finansielle omkostninger","value":-0.27},{"label":"Skat af årets resultat","value":0.181}],"sinDesglose":[{"renglon":"Bruttofortjeneste","lado":"revenue","importe":41.571,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}],"baseIngreso":"gross_margin"},
  2024: {"currency":"DKK","sourceId":"vejle-dk-aarsrapport-2024","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":0.456,"tax":0.31,"grossDebt":24.128,"cash":4.548,"officialTotalRevenue":47.596,"officialTotalExpenses":52.027,"officialPAT":-3.665,"sinDesglose":[{"renglon":"Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa explícitamente la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)","lado":"revenue","importe":47.596,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}],"baseIngreso":"gross_margin"},
  2025: {"currency":"DKK","sourceId":"vejle-dk-aarsrapport-2025-12-31","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.212,"tax":0.34,"grossDebt":27.822,"cash":6.699,"officialTotalRevenue":54.23,"officialTotalExpenses":57.895,"officialPAT":-3.537,"extraRows":[{"label":"Finansielle indtægter","value":0.046},{"label":"Finansielle omkostninger","value":-0.258},{"label":"Skat af årets resultat","value":0.34}],"sinDesglose":[{"renglon":"Bruttofortjeneste","lado":"revenue","importe":53.447,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}],"baseIngreso":"gross_margin"},
};

const vejleDkPresupuestoOverlayByYear = {};

const vejleDkPasesData = [];
const vejleDkResultadosData = {};
const vejleDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["vejle-dk"] = {
  revenueLinesByYear: vejleDkRevenueLinesByYear, expenseLinesByYear: vejleDkExpenseLinesByYear,
  fiscalYearMeta: vejleDkFiscalYearMeta, pasesData: vejleDkPasesData,
  resultadosData: vejleDkResultadosData, titulosData: vejleDkTitulosData,
  presupuestoOverlayByYear: vejleDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"vejle-dk-aarsrapport-2024":{"id":"vejle-dk-aarsrapport-2024","clubId":"vejle-dk","title":"VB Alliancen A/S — Årsrapport 1. januar - 31. december 2024","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/97158013/amNsb3VkczovLzAzLzYwL2I4L2MxLzdhLzcyYWItNGQyOC04ZDAwLTNkN2I5OGM3MGNmNA.pdf"},"vejle-dk-aarsrapport-2025-12-31":{"id":"vejle-dk-aarsrapport-2025-12-31","clubId":"vejle-dk","title":"VB Alliancen A/S — aarsrapport-2025-12-31 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/97158013/amNsb3VkczovLzAzL2YzLzUzL2VhLzRiL2NjNzQtNDlkNC04YmM5LTEzYWU3OTU4MzQwYw.xhtml","documento":"Clubes/Dinamarca/Vejle/aarsrapport-2025-12-31.pdf"},"vejle-dk-aarsrapport-2022-12-31":{"id":"vejle-dk-aarsrapport-2022-12-31","clubId":"vejle-dk","title":"VB Alliancen A/S — aarsrapport-2022-12-31 (ejercicio 2022)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Dinamarca/Vejle/aarsrapport-2022-12-31.pdf"}});

memberCountByClub["vejle-dk"] = null;
