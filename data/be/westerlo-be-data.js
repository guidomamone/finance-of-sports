// GENERADO desde data/be/westerlo-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const westerloBeRevenueLinesByYear = {
  2015: [
    {"rawLabel":"Brutomarge (+)/(-)","normalizedCategory":"lump_football_operations","amountNative":4.882931,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":14.373418,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":16.309398,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":0.046566,"disclosureLevel":"aggregated"},
  ],
};

const westerloBeExpenseLinesByYear = {
  2015: [
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen (+)/(-)","normalizedCategory":"wages_squad","amountNative":-4.221367,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.375183,"disclosureLevel":"aggregated"},
    {"rawLabel":"Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-)","normalizedCategory":"other_expenses","amountNative":0.019506,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten: toevoegingen (bestellingen en terugnemingen) (+)/(-)","normalizedCategory":"exceptional_items","amountNative":-0.041553,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-0.013432,"disclosureLevel":"aggregated"},
    {"rawLabel":"Uitzonderlijke kosten","normalizedCategory":"exceptional_items","amountNative":-0.052751,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen","normalizedCategory":"other_expenses","amountNative":-3.49556,"disclosureLevel":"aggregated"},
    {"rawLabel":"Diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-12.257662,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-17.858655,"disclosureLevel":"detailed","items":[["Bezoldigingen en rechtstreekse sociale voordelen",14.675317],["Werkgeversbijdragen voor sociale verzekeringen",2.250854],["Werkgeverspremies voor bovenwettelijke verzekeringen",0.138962],["Andere personeelskosten",0.793522]]},
    {"rawLabel":"Afschrijvingen op immateriële vaste activa (spelersregistratierechten)","normalizedCategory":"player_amortisation","amountNative":-6.801978,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen op materiële vaste activa","normalizedCategory":"depreciation","amountNative":-1.196318,"disclosureLevel":"detailed"},
    {"rawLabel":"Afschrijvingen — residuo no explicado entre Nota 6.2.1/6.3.x y el código 630 impreso (redondeo)","normalizedCategory":"other_amortisation","amountNative":-0.003058,"disclosureLevel":"aggregated"},
    {"rawLabel":"Waardeverminderingen op voorraden en bestellingen (netto)","normalizedCategory":"other_expenses","amountNative":-0.003645,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten — Bedrijfsbelastingen en -taksen","normalizedCategory":"admin_general_expense","amountNative":-0.27375,"disclosureLevel":"detailed"},
    {"rawLabel":"Andere bedrijfskosten — Andere","normalizedCategory":"other_expenses","amountNative":-0.034178,"disclosureLevel":"detailed"},
    {"rawLabel":"Niet-recurrente bedrijfskosten (minderwaarden bij realisatie van immateriële en materiële vaste activa)","normalizedCategory":"player_impairment","amountNative":-0.201673,"disclosureLevel":"aggregated"},
  ],
};

const westerloBeFiscalYearMeta = {
  2015: {"currency":"EUR","sourceId":"westerlo-be-jaarrekening-2015-06-30-individual","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2015-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.003796,"tax":-0.068497,"grossDebt":null,"cash":null,"officialTotalRevenue":4.882931,"officialTotalExpenses":4.590476,"officialPAT":0.125859,"extraRows":[{"label":"Financiële opbrengsten","value":-0.000001},{"label":"Financiële kosten","value":-0.003795},{"label":"Belastingen op het resultaat (+)/(-)","value":-0.068497}],"sinDesglose":[{"renglon":"Brutomarge (+)/(-)","lado":"revenue","importe":4.882931,"motivo":"el documento no desglosa este renglón"}]},
  2025: {"currency":"EUR","sourceId":"westerlo-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.087489,"tax":-0.283163,"grossDebt":39.407332,"cash":0.13509,"officialTotalRevenue":30.729382,"officialTotalExpenses":42.126477,"officialPAT":-11.767747},
};

const westerloBePresupuestoOverlayByYear = {};

const westerloBePasesData = [];
const westerloBeResultadosData = {};
const westerloBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["westerlo-be"] = {
  revenueLinesByYear: westerloBeRevenueLinesByYear, expenseLinesByYear: westerloBeExpenseLinesByYear,
  fiscalYearMeta: westerloBeFiscalYearMeta, pasesData: westerloBePasesData,
  resultadosData: westerloBeResultadosData, titulosData: westerloBeTitulosData,
  presupuestoOverlayByYear: westerloBePresupuestoOverlayByYear,
};

Object.assign(sources, {"westerlo-be-jaarrekening-2025":{"id":"westerlo-be-jaarrekening-2025","clubId":"westerlo-be","title":"Jaarrekening van KVC Westerlo BV voor het boekjaar van 1/7/2024 tot 30/6/2025","type":"official_balance_sheet","reliability":"primary"},"westerlo-be-jaarrekening-2015-06-30-individual":{"id":"westerlo-be-jaarrekening-2015-06-30-individual","clubId":"westerlo-be","title":"KVC Westerlo BV — jaarrekening-2015-06-30-individual (ejercicio 2015)","type":"official_balance_sheet","reliability":"primary","publicNote":"Ejercicio de transición por cambio de fecha de cierre: del 01/01/2014 al 30/06/2015 (18 meses).","documento":"Clubes/Bélgica/Westerlo/jaarrekening-2015-06-30-individual.pdf"}});

memberCountByClub["westerlo-be"] = null;
