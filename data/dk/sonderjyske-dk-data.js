// GENERADO desde data/dk/sonderjyske-dk.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const sonderjyskeDkRevenueLinesByYear = {
  2022: [
    {"rawLabel":"Kompensation for aflyste arrangementer og lønomkostninger, COVID-19 (Note \"Særlige poster\")","normalizedCategory":"other_income","amountNative":16.311422,"disclosureLevel":"detailed"},
    {"rawLabel":"Bruttofortjeneste, resto (nettoomsætning, vareforbrug, andre driftsindtægter og eksterne omkostninger sammendraget, § 32 ÅRL — NO es revenue bruto)","normalizedCategory":"lump_football_operations","amountNative":5.153565,"disclosureLevel":"aggregated"},
  ],
  2024: [
    {"rawLabel":"Bruttofortjeneste/Bruttotab","normalizedCategory":"lump_football_operations","amountNative":37.431315,"disclosureLevel":"aggregated"},
  ],
};

const sonderjyskeDkExpenseLinesByYear = {
  2022: [
    {"rawLabel":"Personaleomkostninger","normalizedCategory":"wages_squad","amountNative":-50.298641,"disclosureLevel":"detailed","items":[["Lønninger",-45.442396],["Pensioner",-1.453435],["Andre omkostninger til social sikring",-0.607087],["Andre personaleomkostninger",-2.795723]]},
    {"rawLabel":"Årets afskrivninger — Kontraktrettigheder (immaterielle anlægsaktiver)","normalizedCategory":"player_amortisation","amountNative":-2.229341,"disclosureLevel":"detailed"},
    {"rawLabel":"Årets afskrivninger — materielle anlægsaktiver","normalizedCategory":"depreciation","amountNative":-0.397022,"disclosureLevel":"detailed","items":[["Andre anlæg, driftsmateriel og inventar",-0.297495],["Indretning af lejede lokaler",-0.099527]]},
  ],
  2024: [
    {"rawLabel":"Løn og gager","normalizedCategory":"wages_squad","amountNative":-36.933678,"disclosureLevel":"aggregated"},
    {"rawLabel":"Pensionsbidrag","normalizedCategory":"wages_squad","amountNative":-1.252567,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre omkostninger til social sikring","normalizedCategory":"wages_squad","amountNative":-0.671495,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre personaleomkostninger","normalizedCategory":"wages_squad","amountNative":-2.159485,"disclosureLevel":"aggregated"},
    {"rawLabel":"Kontraktsrettigheder","normalizedCategory":"player_amortisation","amountNative":-1.669092,"disclosureLevel":"aggregated"},
    {"rawLabel":"Indretning lejede lokaler","normalizedCategory":"depreciation","amountNative":-0.22706,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andre anlæg, driftsmateriel og inventar","normalizedCategory":"depreciation","amountNative":-0.171744,"disclosureLevel":"aggregated"},
  ],
};

const sonderjyskeDkFiscalYearMeta = {
  2022: {"currency":"DKK","sourceId":"sonderjyske-dk-aarsrapport-2022","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2022-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.522751,"tax":0,"grossDebt":14.080333,"cash":0.014547,"officialTotalRevenue":21.464987,"officialTotalExpenses":52.925004,"officialPAT":-31.982769},
  2024: {"currency":"DKK","sourceId":"sonderjyske-dk-aarsrapport-2024-09-30","reportType":"official_balance_sheet","gestionId":null,"fxRef":"DKK@2024-09-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.846555,"tax":1.746248,"grossDebt":null,"cash":null,"officialTotalRevenue":37.431315,"officialTotalExpenses":43.085121,"officialPAT":-4.754113,"extraRows":[{"label":"Andre finansielle indtægter","value":0.010526},{"label":"Øvrige finansielle omkostninger","value":-0.857081},{"label":"Skat af årets resultat","value":1.746248}],"sinDesglose":[{"renglon":"Bruttofortjeneste/Bruttotab","lado":"revenue","importe":37.431315,"motivo":"el documento no desglosa este renglón"}]},
};

const sonderjyskeDkPresupuestoOverlayByYear = {};

const sonderjyskeDkPasesData = [];
const sonderjyskeDkResultadosData = {};
const sonderjyskeDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["sonderjyske-dk"] = {
  revenueLinesByYear: sonderjyskeDkRevenueLinesByYear, expenseLinesByYear: sonderjyskeDkExpenseLinesByYear,
  fiscalYearMeta: sonderjyskeDkFiscalYearMeta, pasesData: sonderjyskeDkPasesData,
  resultadosData: sonderjyskeDkResultadosData, titulosData: sonderjyskeDkTitulosData,
  presupuestoOverlayByYear: sonderjyskeDkPresupuestoOverlayByYear,
};

Object.assign(sources, {"sonderjyske-dk-aarsrapport-2022":{"id":"sonderjyske-dk-aarsrapport-2022","clubId":"sonderjyske-dk","title":"Sønderjyske Fodbold A/S — Årsrapport 2021/22 (01.07.2021 - 30.06.2022)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzLzcyL2YwLzVlL2FiLzlkMGQtNDZlMy05ZGJhLWZhMjA5Y2E4MzcyMw.pdf"},"sonderjyske-dk-aarsrapport-2024-09-30":{"id":"sonderjyske-dk-aarsrapport-2024-09-30","clubId":"sonderjyske-dk","title":"Sønderjyske Fodbold A/S — aarsrapport-2024-09-30 (ejercicio 2024)","type":"official_balance_sheet","reliability":"primary","url":"http://regnskaber.virk.dk/11188513/amNsb3VkczovLzAzL2YxLzBjLzMxLzFmLzJjZWMtNDI3YS05OWUwLWM1Njc4ZjUyNjg4NQ.xhtml","documento":"Clubes/Dinamarca/SønderjyskE/aarsrapport-2024-09-30.pdf"}});

memberCountByClub["sonderjyske-dk"] = null;
