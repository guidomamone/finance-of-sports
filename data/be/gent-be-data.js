// GENERADO desde data/be/gent-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const gentBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet (ticketing, sponsoring en publiciteit)","normalizedCategory":"lump_football_operations","amountNative":37.503463,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten","normalizedCategory":"player_sales","amountNative":43.656204,"disclosureLevel":"aggregated"},
  ],
};

const gentBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-0.357352,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-22.217207,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-34.923563,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"player_amortisation","amountNative":-13.616725,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten (terugneming/reversión)","normalizedCategory":"exceptional_items","amountNative":0.349285,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten (onroerende voorheffing en sell-on fees op transfers)","normalizedCategory":"other_expenses","amountNative":-6.717525,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfskosten (dading en afhandeling CEPANI)","normalizedCategory":"exceptional_items","amountNative":-0.988421,"disclosureLevel":"aggregated"},
  ],
};

const gentBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"gent-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.673941,"tax":-0.118355,"grossDebt":70.411806,"cash":9.057614,"officialTotalRevenue":81.159667,"officialTotalExpenses":77.832372,"officialPAT":1.895863,"sinDesglose":[{"renglon":"Omzet (ticketing, sponsoring en publiciteit)","lado":"revenue","importe":37.503463,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}]},
};

const gentBePresupuestoOverlayByYear = {};

const gentBePasesData = [];
const gentBeResultadosData = {};
const gentBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["gent-be"] = {
  revenueLinesByYear: gentBeRevenueLinesByYear, expenseLinesByYear: gentBeExpenseLinesByYear,
  fiscalYearMeta: gentBeFiscalYearMeta, pasesData: gentBePasesData,
  resultadosData: gentBeResultadosData, titulosData: gentBeTitulosData,
  presupuestoOverlayByYear: gentBePresupuestoOverlayByYear,
};

Object.assign(sources, {"gent-be-jaarrekening-2025":{"id":"gent-be-jaarrekening-2025","clubId":"gent-be","title":"Jaarrekening van K.A.A. Gent NV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["gent-be"] = null;
