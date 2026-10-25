// GENERADO desde data/be/sinttruiden-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const sinttruidenBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":20.175525,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten — Exploitatiesubsidies en vanwege de overheid ontvangen compenserende bedragen","normalizedCategory":"grants_donations","amountNative":3.319965,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfsopbrengsten — resto sin desglosar","normalizedCategory":"other_income","amountNative":12.684099,"disclosureLevel":"aggregated"},
  ],
};

const sinttruidenBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-0.543434,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-10.439201,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-16.332861,"disclosureLevel":"detailed","items":[["Bezoldigingen en rechtstreekse sociale voordelen",13.201481],["Werkgeversbijdragen voor sociale verzekeringen",1.962508],["Werkgeverspremies voor bovenwettelijke verzekeringen",0.093944],["Andere personeelskosten",1.074929]]},
    {"rawLabel":"Afschrijvingen op immateriële vaste activa (spelersregistratierechten)","normalizedCategory":"player_amortisation","amountNative":-1.043877,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.217114,"disclosureLevel":"detailed","items":[["Terreinen en gebouwen",0.119448],["Installaties, machines en uitrusting",0.073697],["Meubilair en rollend materieel",0.023969]]},
    {"rawLabel":"Waardeverminderingen op voorraden en handelsvorderingen","normalizedCategory":"other_expenses","amountNative":-0.092231,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten — Bedrijfsbelastingen en -taksen","normalizedCategory":"admin_general_expense","amountNative":-0.222326,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfskosten — Andere","normalizedCategory":"other_expenses","amountNative":-0.01378,"disclosureLevel":"detailed"},
    {"rawLabel":"Niet-recurrente bedrijfskosten","normalizedCategory":"exceptional_items","amountNative":-2.3,"disclosureLevel":"aggregated"},
  ],
};

const sinttruidenBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"sinttruiden-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.481145,"tax":-0.873978,"grossDebt":24.290111,"cash":3.805795,"officialTotalRevenue":36.179589,"officialTotalExpenses":28.904823,"officialPAT":3.619642,"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":20.175525,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}]},
};

const sinttruidenBePresupuestoOverlayByYear = {};

const sinttruidenBePasesData = [];
const sinttruidenBeResultadosData = {};
const sinttruidenBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["sinttruiden-be"] = {
  revenueLinesByYear: sinttruidenBeRevenueLinesByYear, expenseLinesByYear: sinttruidenBeExpenseLinesByYear,
  fiscalYearMeta: sinttruidenBeFiscalYearMeta, pasesData: sinttruidenBePasesData,
  resultadosData: sinttruidenBeResultadosData, titulosData: sinttruidenBeTitulosData,
  presupuestoOverlayByYear: sinttruidenBePresupuestoOverlayByYear,
};

Object.assign(sources, {"sinttruiden-be-jaarrekening-2025":{"id":"sinttruiden-be-jaarrekening-2025","clubId":"sinttruiden-be","title":"Jaarrekening van Koninklijke Sint-Truidense Voetbalvereniging NV (STVV) voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

memberCountByClub["sinttruiden-be"] = null;
