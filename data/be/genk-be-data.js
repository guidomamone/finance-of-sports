// GENERADO desde data/be/genk-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const genkBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":33.51509,"disclosureLevel":"aggregated"},
    {"rawLabel":"Lidgeld, schenkingen, legaten en subsidies","normalizedCategory":"member_dues","amountNative":13.483361,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten","normalizedCategory":"player_sales","amountNative":55.955475,"disclosureLevel":"aggregated"},
  ],
};

const genkBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-1.332069,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-18.864068,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-53.540132,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"player_amortisation","amountNative":-16.300826,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten (netto de una reversión de waardeverminderingen op voorraden/vorderingen de +0,452 M)","normalizedCategory":"other_expenses","amountNative":-1.878734,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfskosten","normalizedCategory":"exceptional_items","amountNative":-0.231,"disclosureLevel":"aggregated"},
  ],
};

const genkBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"genk-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1.439869,"tax":-0.199845,"grossDebt":34.505065,"cash":3.500316,"officialTotalRevenue":102.953926,"officialTotalExpenses":91.915829,"officialPAT":9.167383,"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":33.51509,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}]},
};

const genkBePresupuestoOverlayByYear = {};

const genkBePasesData = [];
const genkBeResultadosData = {};
const genkBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["genk-be"] = {
  revenueLinesByYear: genkBeRevenueLinesByYear, expenseLinesByYear: genkBeExpenseLinesByYear,
  fiscalYearMeta: genkBeFiscalYearMeta, pasesData: genkBePasesData,
  resultadosData: genkBeResultadosData, titulosData: genkBeTitulosData,
  presupuestoOverlayByYear: genkBePresupuestoOverlayByYear,
};

Object.assign(sources, {"genk-be-jaarrekening-2025":{"id":"genk-be-jaarrekening-2025","clubId":"genk-be","title":"Jaarrekening van K. Racing Club Genk 322 VZW voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["genk-be"] = null;
