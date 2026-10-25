// GENERADO desde data/br/rbbragantino-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const rbbragantinoBrRevenueLinesByYear = {
  2019: [
    {"rawLabel":"Receita Líquida","normalizedCategory":"lump_football_operations","amountNative":39.171,"disclosureLevel":"lump"},
  ],
  2024: [
    {"rawLabel":"Receita Líquida","normalizedCategory":"lump_football_operations","amountNative":425.224,"disclosureLevel":"lump"},
    {"rawLabel":"Outras receitas e despesas operacionais","normalizedCategory":"other_income","amountNative":80.992,"disclosureLevel":"summary"},
  ],
  2025: [
    {"rawLabel":"Receita de patrocínio e publicidade","normalizedCategory":"sponsorship_commercial","amountNative":397.569,"disclosureLevel":"aggregated"},
    {"rawLabel":"Campeonato Brasileiro","normalizedCategory":"competition_bonus","amountNative":109.528,"disclosureLevel":"aggregated"},
    {"rawLabel":"Campeonato Paulista","normalizedCategory":"competition_bonus","amountNative":15.6,"disclosureLevel":"aggregated"},
    {"rawLabel":"Receitas com repasses de direitos federativo","normalizedCategory":"player_sales","amountNative":11.214,"disclosureLevel":"aggregated"},
    {"rawLabel":"Outras Receitas","normalizedCategory":"other_income","amountNative":6.821,"disclosureLevel":"aggregated"},
    {"rawLabel":"Bilheteria","normalizedCategory":"matchday_competition","amountNative":3.911,"disclosureLevel":"aggregated"},
    {"rawLabel":"Copa do Brasil","normalizedCategory":"competition_bonus","amountNative":9.541,"disclosureLevel":"aggregated"},
    {"rawLabel":"( - ) Encargos sobre receitas","normalizedCategory":"other_income","amountNative":-54.984,"disclosureLevel":"aggregated"},
    {"rawLabel":"Outras receitas e Despesas operacionais","normalizedCategory":"other_income","amountNative":28.089,"disclosureLevel":"aggregated"},
  ],
};

const rbbragantinoBrExpenseLinesByYear = {
  2019: [
    {"rawLabel":"Comissão técnica","normalizedCategory":"wages_squad","amountNative":-3.189,"disclosureLevel":"summary"},
    {"rawLabel":"Custo do departamento de futebol","normalizedCategory":"wages_squad","amountNative":-23.807,"disclosureLevel":"summary"},
    {"rawLabel":"Gastos com jogos e bonificações","normalizedCategory":"match_organisation_expense","amountNative":-2.47,"disclosureLevel":"summary"},
    {"rawLabel":"Custo com departamento amador","normalizedCategory":"youth_other_sports_expense","amountNative":0,"disclosureLevel":"summary"},
    {"rawLabel":"Despesas gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-7.559,"disclosureLevel":"summary"},
  ],
  2024: [
    {"rawLabel":"Comissão técnica","normalizedCategory":"wages_squad","amountNative":-68.656,"disclosureLevel":"summary"},
    {"rawLabel":"Custo do departamento de futebol","normalizedCategory":"wages_squad","amountNative":-311.878,"disclosureLevel":"summary"},
    {"rawLabel":"Gastos com jogos e bonificações","normalizedCategory":"match_organisation_expense","amountNative":-13.822,"disclosureLevel":"summary"},
    {"rawLabel":"Custo com departamento amador","normalizedCategory":"youth_other_sports_expense","amountNative":-37.316,"disclosureLevel":"summary"},
    {"rawLabel":"Despesas gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-38.253,"disclosureLevel":"summary"},
  ],
  2025: [
    {"rawLabel":"Comissão técnica","normalizedCategory":"wages_squad","amountNative":-41.85,"disclosureLevel":"aggregated"},
    {"rawLabel":"Custo do departamento de futebol","normalizedCategory":"wages_squad","amountNative":-325.62,"disclosureLevel":"aggregated"},
    {"rawLabel":"Gastos com jogos e bonificações","normalizedCategory":"match_organisation_expense","amountNative":-9.675,"disclosureLevel":"aggregated"},
    {"rawLabel":"Custo com departamento amador","normalizedCategory":"youth_other_sports_expense","amountNative":-50.7,"disclosureLevel":"aggregated"},
    {"rawLabel":"Despesas gerais e administrativas","normalizedCategory":"admin_general_expense","amountNative":-49.965,"disclosureLevel":"aggregated"},
  ],
};

const rbbragantinoBrFiscalYearMeta = {
  2019: {"currency":"BRL","sourceId":"rbbragantino-br-balanco-2019","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2019-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.002,"tax":0,"grossDebt":0.564,"cash":4.256,"officialTotalRevenue":39.171,"officialTotalExpenses":37.025,"officialPAT":0.144,"sinDesglose":[{"renglon":"Receita Líquida","lado":"revenue","importe":39.171,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"sales_total"},
  2024: {"currency":"BRL","sourceId":"rbbragantino-br-balanco-2024","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2024-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":9.094,"tax":-14.384,"grossDebt":0,"cash":29.015,"officialTotalRevenue":506.216,"officialTotalExpenses":469.925,"officialPAT":31.001,"sinDesglose":[{"renglon":"Receita Líquida","lado":"revenue","importe":425.224,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"}],"baseIngreso":"full"},
  2025: {"currency":"BRL","sourceId":"rbbragantino-br-balanco-2025-auditado","reportType":"official_balance_sheet","gestionId":null,"fxRef":"BRL@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-2.763,"tax":-14.941,"grossDebt":null,"cash":null,"officialTotalRevenue":527.289,"officialTotalExpenses":477.81,"officialPAT":31.773,"extraRows":[{"label":"Receitas financeiras","value":0.357},{"label":"Despesas financeiras","value":-3.12},{"label":"Imposto de renda e contribuição social","value":-14.941}],"baseIngreso":"full"},
};

const rbbragantinoBrPresupuestoOverlayByYear = {};

const rbbragantinoBrPasesData = [];
const rbbragantinoBrResultadosData = {};
const rbbragantinoBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["rbbragantino-br"] = {
  revenueLinesByYear: rbbragantinoBrRevenueLinesByYear, expenseLinesByYear: rbbragantinoBrExpenseLinesByYear,
  fiscalYearMeta: rbbragantinoBrFiscalYearMeta, pasesData: rbbragantinoBrPasesData,
  resultadosData: rbbragantinoBrResultadosData, titulosData: rbbragantinoBrTitulosData,
  presupuestoOverlayByYear: rbbragantinoBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"rbbragantino-br-balanco-2019":{"id":"rbbragantino-br-balanco-2019","clubId":"rbbragantino-br","title":"Red Bull Bragantino — Balanço Patrimonial e Demonstração do Resultado, Exercícios Findos em 31 de Dezembro de 2019 e de 2018","type":"official_balance_sheet","reliability":"primary","url":"https://web.archive.org/web/2019*/https://www.redbullbragantino.com.br/balanco/2019.pdf","documento":"Clubes/Brasil/RB Bragantino/balanco-2019.pdf"},"rbbragantino-br-balanco-2024":{"id":"rbbragantino-br-balanco-2024","clubId":"rbbragantino-br","title":"Red Bull Bragantino Futebol Ltda. — Balanços Patrimoniais e Demonstrações do Resultado, Exercícios Findos em 31 de Dezembro de 2024 e de 2023","type":"official_balance_sheet","reliability":"primary","url":"https://web.archive.org/web/2025*/https://www.redbullbragantino.com.br/balanco/Red_Bull_Bragantino_(BDO...11_de_Fevereiro_de_2025).pdf"},"rbbragantino-br-balanco-2025-auditado":{"id":"rbbragantino-br-balanco-2025-auditado","clubId":"rbbragantino-br","title":"Red Bull Bragantino Futebol Ltda. — balanco-2025-auditado (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Brasil/RB Bragantino/balanco-2025-auditado.pdf"}});

gestionesByClub["rbbragantino-br"] = {"sinconfirmar":{"nombre":"Red Bull Bragantino Futebol Ltda. (controlada por Red Bull GmbH, sin gestión/presidencia electa)","firstYear":2019,"lastYear":2024}};

memberCountByClub["rbbragantino-br"] = null;
