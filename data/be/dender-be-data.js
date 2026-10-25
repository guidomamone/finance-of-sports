// GENERADO desde data/be/dender-be.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const denderBeRevenueLinesByYear = {
  2017: [
    {"rawLabel":"Bedrijfsopbrengsten","normalizedCategory":"lump_football_operations","amountNative":0.339587,"disclosureLevel":"aggregated"},
    {"rawLabel":"Uitzonderlijke opbrengsten","normalizedCategory":"other_income","amountNative":0.72669,"disclosureLevel":"aggregated"},
  ],
  2019: [
    {"rawLabel":"Bedrijfsopbrengsten","normalizedCategory":"lump_football_operations","amountNative":0.694683,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Brutomarge","normalizedCategory":"lump_football_operations","amountNative":0.08355,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":7.116234,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfsopbrengsten","normalizedCategory":"other_income","amountNative":0.119704,"disclosureLevel":"detailed"},
    {"rawLabel":"Overige bedrijfsopbrengsten (impliciet in Brutomarge, niet als aparte code afgedrukt — zie koptekst)","normalizedCategory":"other_income","amountNative":1.926408,"disclosureLevel":"aggregated"},
  ],
};

const denderBeExpenseLinesByYear = {
  2017: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-0.230627,"disclosureLevel":"aggregated"},
    {"rawLabel":"620","normalizedCategory":"wages_squad","amountNative":-0.461799,"disclosureLevel":"aggregated"},
    {"rawLabel":"621","normalizedCategory":"wages_squad","amountNative":-0.074188,"disclosureLevel":"aggregated"},
    {"rawLabel":"623","normalizedCategory":"wages_squad","amountNative":-0.026402,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-0.027102,"disclosureLevel":"aggregated"},
    {"rawLabel":"Uitzonderlijke kosten","normalizedCategory":"exceptional_items","amountNative":-0.066989,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.143032,"disclosureLevel":"aggregated"},
  ],
  2019: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen","normalizedCategory":"other_expenses","amountNative":-0.521234,"disclosureLevel":"aggregated"},
    {"rawLabel":"620","normalizedCategory":"wages_squad","amountNative":-0.531002,"disclosureLevel":"aggregated"},
    {"rawLabel":"621","normalizedCategory":"wages_squad","amountNative":-0.10323,"disclosureLevel":"aggregated"},
    {"rawLabel":"623","normalizedCategory":"wages_squad","amountNative":-0.151798,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.141929,"disclosureLevel":"aggregated"},
    {"rawLabel":"Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen)","normalizedCategory":"exceptional_items","amountNative":0.226557,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-0.026266,"disclosureLevel":"aggregated"},
  ],
  2023: [
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-2.242191,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.191736,"disclosureLevel":"aggregated"},
    {"rawLabel":"Andere bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-0.02679,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen + Waardeverminderingen op handelsvorderingen + Andere bedrijfskosten","normalizedCategory":"other_expenses","amountNative":-4.396628,"disclosureLevel":"detailed","items":[["Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen",-4.318796],["Waardeverminderingen op voorraden/bestellingen/handelsvorderingen",-0.041123],["Andere bedrijfskosten",-0.036709]]},
    {"rawLabel":"Bezoldigingen, sociale lasten en pensioenen","normalizedCategory":"wages_squad","amountNative":-8.269828,"disclosureLevel":"aggregated"},
    {"rawLabel":"Afschrijvingen en waardeverminderingen op immateriële en materiële vaste activa","normalizedCategory":"depreciation","amountNative":-0.574659,"disclosureLevel":"aggregated"},
    {"rawLabel":"Niet-recurrente bedrijfskosten","normalizedCategory":"exceptional_items","amountNative":-0.037088,"disclosureLevel":"detailed"},
  ],
};

const denderBeFiscalYearMeta = {
  2017: {"currency":"EUR","sourceId":"dender-be-jaarrekening-2017-06-30-individual-correction","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2017-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.034388,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":1.066277,"officialTotalExpenses":0.96315,"officialPAT":0.001749,"extraRows":[{"label":"Financiële opbrengsten","value":0.000195},{"label":"Financiële kosten","value":-0.034583}],"sinDesglose":[{"renglon":"Bedrijfsopbrengsten","lado":"revenue","importe":0.339587,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full","derivacionIngreso":{"method":"margin_plus_costs","sources":["dender-be-jaarrekening-2017-06-30-individual-correction"]}},
  2019: {"currency":"EUR","sourceId":"dender-be-jaarrekening-2019-06-30-individual","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2019-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.044639,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":0.694683,"officialTotalExpenses":1.475459,"officialPAT":-0.598858,"extraRows":[{"label":"Financiële opbrengsten","value":0.00001},{"label":"Financiële kosten","value":-0.044649}],"sinDesglose":[{"renglon":"Bedrijfsopbrengsten","lado":"revenue","importe":0.694683,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"sales_total","derivacionIngreso":{"method":"margin_plus_costs","sources":["dender-be-jaarrekening-2019-06-30-individual"]}},
  2023: {"currency":"EUR","sourceId":"dender-be-jaarrekening-2023-06-30-individual","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2023-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.28194,"tax":-0.000362,"grossDebt":null,"cash":null,"officialTotalRevenue":0.08355,"officialTotalExpenses":2.460717,"officialPAT":-2.659468,"extraRows":[{"label":"Recurrente financiële opbrengsten","value":0.000009},{"label":"Recurrente financiële kosten","value":-0.281949},{"label":"Belastingen op het resultaat","value":-0.000362}],"sinDesglose":[{"renglon":"Brutomarge","lado":"revenue","importe":0.08355,"motivo":"el documento no desglosa este renglón","tipo":"gross_margin"}],"baseIngreso":"gross_margin"},
  2025: {"currency":"EUR","sourceId":"dender-be-jaarrekening-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.623547,"tax":-0.213846,"grossDebt":21.68247,"cash":0.044976,"officialTotalRevenue":9.162346,"officialTotalExpenses":13.241115,"officialPAT":-4.953248,"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":7.116234,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full","derivacionIngreso":{"method":"margin_plus_costs","sources":["dender-be-jaarrekening-2025"]}},
};

const denderBePresupuestoOverlayByYear = {};

const denderBePasesData = [];
const denderBeResultadosData = {};
const denderBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["dender-be"] = {
  revenueLinesByYear: denderBeRevenueLinesByYear, expenseLinesByYear: denderBeExpenseLinesByYear,
  fiscalYearMeta: denderBeFiscalYearMeta, pasesData: denderBePasesData,
  resultadosData: denderBeResultadosData, titulosData: denderBeTitulosData,
  presupuestoOverlayByYear: denderBePresupuestoOverlayByYear,
};

Object.assign(sources, {"dender-be-jaarrekening-2025":{"id":"dender-be-jaarrekening-2025","clubId":"dender-be","title":"Jaarrekening FCV Dender EH VZW voor het boekjaar van 01-07-2024 tot 30-06-2025","type":"official_balance_sheet","reliability":"primary"},"dender-be-jaarrekening-2017-06-30-individual-correction":{"id":"dender-be-jaarrekening-2017-06-30-individual-correction","clubId":"dender-be","title":"Football Club Verbroedering Dender EH VZW — jaarrekening-2017-06-30-individual-correction (ejercicio 2017)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Bélgica/Dender EH/jaarrekening-2017-06-30-individual-correction.pdf"},"dender-be-jaarrekening-2019-06-30-individual":{"id":"dender-be-jaarrekening-2019-06-30-individual","clubId":"dender-be","title":"Football Club Verbroedering Dender EH VZW — jaarrekening-2019-06-30-individual (ejercicio 2019)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Bélgica/Dender EH/jaarrekening-2019-06-30-individual.pdf"},"dender-be-jaarrekening-2023-06-30-individual":{"id":"dender-be-jaarrekening-2023-06-30-individual","clubId":"dender-be","title":"Football Club Verbroedering Dender EH VZW — jaarrekening-2023-06-30-individual (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Bélgica/Dender EH/jaarrekening-2023-06-30-individual.pdf"}});

memberCountByClub["dender-be"] = null;
