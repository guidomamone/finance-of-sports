// GENERADO desde data/be/antwerp-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const antwerpBeRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":43.351487,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":46.4609,"disclosureLevel":"aggregated","items":[["Exploitatiesubsidies en compenserende bedragen (Nota 6.10)",11.682618],["Overige (sin más desglose en la fuente)",34.778282]]},
  ],
};

const antwerpBeExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-4.236184,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-28.290772,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-42.479869,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen — immateriële vaste activa (pases)","normalizedCategory":"player_amortisation","amountNative":-6.162963,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen — materiële vaste activa (bienes de uso)","normalizedCategory":"depreciation","amountNative":-0.878187,"disclosureLevel":"detailed"},
    {"rawLabel":"Waardeverminderingen op voorraden en handelsvorderingen","normalizedCategory":"other_expenses","amountNative":-0.042904,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten (terugneming)","normalizedCategory":"exceptional_items","amountNative":0.213502,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten — bedrijfsbelastingen en -taksen","normalizedCategory":"admin_general_expense","amountNative":-0.189605,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfskosten — overige","normalizedCategory":"other_expenses","amountNative":-2.136177,"disclosureLevel":"detailed"},
    {"rawLabel":"Niet-recurrente bedrijfskosten (minderwaarde bij realisatie van immateriële vaste activa)","normalizedCategory":"player_impairment","amountNative":-0.074116,"disclosureLevel":"aggregated"},
  ],
};

const antwerpBeFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"antwerp-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-5.2483,"tax":-0.802638,"grossDebt":50.748888,"cash":4.159718,"officialTotalRevenue":89.812387,"officialTotalExpenses":84.490777,"officialPAT":-0.515827,"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":43.351487,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
};

const antwerpBePresupuestoOverlayByYear = {};

const antwerpBePasesData = [];
const antwerpBeResultadosData = {};
const antwerpBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["antwerp-be"] = {
  revenueLinesByYear: antwerpBeRevenueLinesByYear, expenseLinesByYear: antwerpBeExpenseLinesByYear,
  fiscalYearMeta: antwerpBeFiscalYearMeta, pasesData: antwerpBePasesData,
  resultadosData: antwerpBeResultadosData, titulosData: antwerpBeTitulosData,
  presupuestoOverlayByYear: antwerpBePresupuestoOverlayByYear,
};

Object.assign(sources, {"antwerp-be-jaarrekening-2025":{"id":"antwerp-be-jaarrekening-2025","clubId":"antwerp-be","title":"Jaarrekening van Royal Antwerp Football Club NV (RAFC) voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["antwerp-be"] = {"actual":{"nombre":"Paul Gheysens (hoofdaandeelhouder, via Goala BV)","firstYear":2025,"lastYear":2025}};

memberCountByClub["antwerp-be"] = null;
