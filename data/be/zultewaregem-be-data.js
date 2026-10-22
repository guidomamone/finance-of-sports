// GENERADO desde data/be/zultewaregem-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const zultewaregemBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":13.087991,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorraad goederen in bewerking: toename (afname)","normalizedCategory":"other_income","amountNative":-0.405752,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen","normalizedCategory":"grants_donations","amountNative":1.80018,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfsopbrengsten — resto sin desglosar","normalizedCategory":"other_income","amountNative":1.380334,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfsopbrengsten (probablemente venta de un inmueble comercial, según jaarverslag)","normalizedCategory":"other_income","amountNative":2.630436,"disclosureLevel":"aggregated"},
  ],
};

const zultewaregemBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-1.84072,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-3.571494,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-11.116049,"disclosureLevel":"detailed","items":[["Bezoldigingen en rechtstreekse sociale voordelen",7.13704],["Werkgeversbijdragen voor sociale verzekeringen",1.086382],["Werkgeverspremies voor bovenwettelijke verzekeringen",0.597252],["Andere personeelskosten",2.295375]]},
    {"rawLabel":"Afschrijvingen op immateriële vaste activa (spelersregistratierechten)","normalizedCategory":"player_amortisation","amountNative":-1.453102,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op materiële vaste activa","normalizedCategory":"depreciation","amountNative":-1.132129,"disclosureLevel":"detailed","items":[["Terreinen en gebouwen",0.986809],["Installaties, machines en uitrusting",0.139695],["Meubilair en rollend materieel",0.005625]]},
    {"rawLabel":"Waardeverminderingen op voorraden en handelsvorderingen (netto terugneming)","normalizedCategory":"other_expenses","amountNative":0.010309,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten","normalizedCategory":"exceptional_items","amountNative":-0.063715,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten — Bedrijfsbelastingen en -taksen","normalizedCategory":"admin_general_expense","amountNative":-0.151095,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfskosten — Andere","normalizedCategory":"other_expenses","amountNative":-0.026818,"disclosureLevel":"detailed"},
    {"rawLabel":"Niet-recurrente bedrijfskosten","normalizedCategory":"exceptional_items","amountNative":-0.023333,"disclosureLevel":"aggregated"},
  ],
};

const zultewaregemBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"zultewaregem-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-3.388994,"tax":0.020358,"grossDebt":29.448037,"cash":0.629659,"officialTotalRevenue":18.493189,"officialTotalExpenses":19.281098,"officialPAT":-4.243593},
};

const zultewaregemBePresupuestoOverlayByYear = {};

const zultewaregemBePasesData = [];
const zultewaregemBeResultadosData = {};
const zultewaregemBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["zultewaregem-be"] = {
  revenueLinesByYear: zultewaregemBeRevenueLinesByYear, expenseLinesByYear: zultewaregemBeExpenseLinesByYear,
  fiscalYearMeta: zultewaregemBeFiscalYearMeta, pasesData: zultewaregemBePasesData,
  resultadosData: zultewaregemBeResultadosData, titulosData: zultewaregemBeTitulosData,
  presupuestoOverlayByYear: zultewaregemBePresupuestoOverlayByYear,
};

Object.assign(sources, {"zultewaregem-be-jaarrekening-2025":{"id":"zultewaregem-be-jaarrekening-2025","clubId":"zultewaregem-be","title":"Jaarrekening van Grensverleggend NV (SV Zulte Waregem) voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["zultewaregem-be"] = null;
