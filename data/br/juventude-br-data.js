// GENERADO desde data/br/juventude-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const juventudeBrRevenueLinesByYear = {
  2020: [
    {"rawLabel":"Venda/Empréstimo de Atletas","normalizedCategory":"player_sales","amountNative":9.5302679,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas Patrimoniais","normalizedCategory":"other_income","amountNative":1.53487736,"disclosureLevel":"detailed"},
    {"rawLabel":"Receita de Transmissão","normalizedCategory":"broadcasting","amountNative":15.42508914,"disclosureLevel":"detailed"},
    {"rawLabel":"Receita jogos de Futebol","normalizedCategory":"matchday_competition","amountNative":0.52843655,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas Publicitária","normalizedCategory":"sponsorship_commercial","amountNative":3.26438183,"disclosureLevel":"detailed"},
    {"rawLabel":"Receita Loteria Esportiva","normalizedCategory":"other_income","amountNative":0.70944628,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras Receitas (Nota 18)","normalizedCategory":"other_income","amountNative":0.8390216,"disclosureLevel":"detailed"},
    {"rawLabel":"Receita de Royalties","normalizedCategory":"sponsorship_commercial","amountNative":0.0177714,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas Diversas","normalizedCategory":"other_income","amountNative":0.53415641,"disclosureLevel":"detailed"},
  ],
  2021: [
    {"rawLabel":"Venda/Empréstimo de Atletas","normalizedCategory":"player_sales","amountNative":2.863945,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receitas Patrimoniais","normalizedCategory":"other_income","amountNative":2.522335,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receita de transmissão","normalizedCategory":"broadcasting","amountNative":55.760074,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receita jogos de Futebol","normalizedCategory":"matchday_competition","amountNative":0.458635,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receitas Publicitária","normalizedCategory":"sponsorship_commercial","amountNative":5.144984,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receita Loteria Esportiva","normalizedCategory":"other_income","amountNative":0.693485,"disclosureLevel":"aggregated"},
    {"rawLabel":"Outras Receitas","normalizedCategory":"other_income","amountNative":0.729818,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receita de Royalties","normalizedCategory":"sponsorship_commercial","amountNative":0.014645,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receitas Diversas","normalizedCategory":"other_income","amountNative":0.074639,"disclosureLevel":"aggregated"},
  ],
};

const juventudeBrExpenseLinesByYear = {
  2020: [
    {"rawLabel":"Remuneração, Benefícios, Encargos e amortização de direitos e de custos de formação","normalizedCategory":"lump_football_operations_expense","amountNative":-22.55193562,"disclosureLevel":"lump"},
    {"rawLabel":"Federação, viagem, imagem, serviços, material esportivo e outras","normalizedCategory":"match_organisation_expense","amountNative":-4.84499961,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas Gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-6.00835769,"disclosureLevel":"detailed"},
  ],
  2021: [
    {"rawLabel":"Remuneração, Benefícios, Encargos, Intermediação, Contratação, Empréstimos e Outros","normalizedCategory":"lump_football_operations_expense","amountNative":-33.655777,"disclosureLevel":"aggregated"},
    {"rawLabel":"Amortização de direitos e de formação de atletas","normalizedCategory":"player_amortisation","amountNative":-6.880703,"disclosureLevel":"aggregated"},
    {"rawLabel":"Jogos, Federação, viagem, serviços, material esportivo e outros","normalizedCategory":"match_organisation_expense","amountNative":-8.93362,"disclosureLevel":"aggregated"},
    {"rawLabel":"Despesas Gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-8.891961,"disclosureLevel":"aggregated"},
  ],
};

const juventudeBrFiscalYearMeta = {
  2020: {"currency":"BRL","sourceId":"juventude-br-demonstracoes-2020","reportType":"official_balance_sheet","gestionId":null,"fxRef":"BRL@2020-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-1.70489589,"tax":0,"grossDebt":0.73381295,"cash":0.02633058,"officialTotalRevenue":32.38344847,"officialTotalExpenses":33.40529292,"officialPAT":-2.72674034},
  2021: {"currency":"BRL","sourceId":"juventude-br-demonstracoes-financeiras-2021","reportType":"official_balance_sheet","gestionId":null,"fxRef":"BRL@2021-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":7.880879,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":68.262559,"officialTotalExpenses":58.362061,"officialPAT":17.781376,"sinDesglose":[{"renglon":"Remuneração, Benefícios, Encargos, Intermediação, Contratação, Empréstimos e Outros","lado":"expense","importe":33.655777,"motivo":"el documento no desglosa este renglón"}]},
};

const juventudeBrPresupuestoOverlayByYear = {};

const juventudeBrPasesData = [];
const juventudeBrResultadosData = {};
const juventudeBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["juventude-br"] = {
  revenueLinesByYear: juventudeBrRevenueLinesByYear, expenseLinesByYear: juventudeBrExpenseLinesByYear,
  fiscalYearMeta: juventudeBrFiscalYearMeta, pasesData: juventudeBrPasesData,
  resultadosData: juventudeBrResultadosData, titulosData: juventudeBrTitulosData,
  presupuestoOverlayByYear: juventudeBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"juventude-br-demonstracoes-2020":{"id":"juventude-br-demonstracoes-2020","clubId":"juventude-br","title":"Relatório dos Auditores Independentes sobre as Demonstrações Financeiras, 31 de Dezembro de 2020 e 2019","type":"official_balance_sheet","reliability":"primary","url":"https://fgf.com.br/demonstracoes-financeiras-filiados/2020"},"juventude-br-demonstracoes-financeiras-2021":{"id":"juventude-br-demonstracoes-financeiras-2021","clubId":"juventude-br","title":"Esporte Clube Juventude — demonstracoes-financeiras-2021 (ejercicio 2021)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Brasil/Juventude/demonstracoes-financeiras-2021.pdf"}});

memberCountByClub["juventude-br"] = null;
