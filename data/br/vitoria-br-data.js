// GENERADO desde data/br/vitoria-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const vitoriaBrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Direitos de transmissão de TV","normalizedCategory":"broadcasting","amountNative":114.552,"disclosureLevel":"detailed"},
    {"rawLabel":"Patrocínios e publicidades","normalizedCategory":"sponsorship_commercial","amountNative":38.129,"disclosureLevel":"detailed"},
    {"rawLabel":"Arrecadação de jogos","normalizedCategory":"matchday_competition","amountNative":9.077,"disclosureLevel":"detailed"},
    {"rawLabel":"Premiações e outras (prêmios de copa + sócio torcedor, sem desglose — ver duda)","normalizedCategory":"competition_bonus","amountNative":32.404,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas diversas (royalties, aluguéis de bares do estádio)","normalizedCategory":"other_income","amountNative":4.523,"disclosureLevel":"detailed"},
    {"rawLabel":"(-) Impostos e contribuições","normalizedCategory":"other_income","amountNative":-15.155,"disclosureLevel":"detailed"},
    {"rawLabel":"(-) Descontos concedidos","normalizedCategory":"other_income","amountNative":-0.64,"disclosureLevel":"detailed"},
    {"rawLabel":"Transações com atletas (Nota 29, venda de atletas)","normalizedCategory":"player_sales","amountNative":52.98,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras receitas e despesas líquidas (Nota 29, segmento clube social)","normalizedCategory":"other_income","amountNative":0.742,"disclosureLevel":"detailed"},
  ],
};

const vitoriaBrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Pessoal (segmento futebol)","normalizedCategory":"wages_squad","amountNative":-86.85,"disclosureLevel":"detailed"},
    {"rawLabel":"Gerais e administrativas (segmento futebol)","normalizedCategory":"admin_general_expense","amountNative":-28.052,"disclosureLevel":"detailed"},
    {"rawLabel":"Serviços (segmento futebol)","normalizedCategory":"admin_general_expense","amountNative":-9.959,"disclosureLevel":"detailed"},
    {"rawLabel":"Tributárias (segmento futebol)","normalizedCategory":"admin_general_expense","amountNative":-13.934,"disclosureLevel":"detailed"},
    {"rawLabel":"Direito de imagem (Diretas)","normalizedCategory":"wages_squad","amountNative":-45.717,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas com jogos (Diretas)","normalizedCategory":"match_organisation_expense","amountNative":-16.755,"disclosureLevel":"detailed"},
    {"rawLabel":"Empréstimos de atletas (Diretas)","normalizedCategory":"other_expenses","amountNative":-4.498,"disclosureLevel":"detailed"},
    {"rawLabel":"Intermediação (Diretas)","normalizedCategory":"other_expenses","amountNative":-2.938,"disclosureLevel":"detailed"},
    {"rawLabel":"Multas contratuais (Diretas)","normalizedCategory":"other_expenses","amountNative":-3.5,"disclosureLevel":"detailed"},
    {"rawLabel":"Luvas (Diretas)","normalizedCategory":"other_expenses","amountNative":-2.256,"disclosureLevel":"detailed"},
    {"rawLabel":"Rateio de despesas administrativas (Diretas)","normalizedCategory":"admin_general_expense","amountNative":-1.629,"disclosureLevel":"detailed"},
    {"rawLabel":"Taxas e registros federações (Diretas)","normalizedCategory":"match_organisation_expense","amountNative":-0.941,"disclosureLevel":"detailed"},
    {"rawLabel":"Aquisições de direitos econômicos (Diretas)","normalizedCategory":"player_amortisation","amountNative":-1.917,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras despesas diretas (Diretas)","normalizedCategory":"other_expenses","amountNative":-2.032,"disclosureLevel":"detailed"},
    {"rawLabel":"Custo das transações com atletas (Nota 29a, reclassificado dentro de Diretas — ver gotcha)","normalizedCategory":"other_expenses","amountNative":-10.208,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortização intangível - Atletas profissionais","normalizedCategory":"player_amortisation","amountNative":-10.902,"disclosureLevel":"detailed"},
    {"rawLabel":"Contingências cíveis e trabalhistas (reversão líquida)","normalizedCategory":"exceptional_items","amountNative":1.272,"disclosureLevel":"detailed"},
    {"rawLabel":"Resultado de equivalência patrimonial","normalizedCategory":"exceptional_items","amountNative":4.149,"disclosureLevel":"detailed"},
    {"rawLabel":"Pessoal (segmento clube social e esportes olímpicos)","normalizedCategory":"youth_other_sports_expense","amountNative":-8.378,"disclosureLevel":"detailed"},
    {"rawLabel":"Gerais e administrativas (segmento clube social e esportes olímpicos)","normalizedCategory":"youth_other_sports_expense","amountNative":-6.698,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortização intangível - Atletas da base (segmento clube social)","normalizedCategory":"youth_other_sports_expense","amountNative":-0.077,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciação e amortização (segmento clube social)","normalizedCategory":"youth_other_sports_expense","amountNative":-1.123,"disclosureLevel":"detailed"},
  ],
};

const vitoriaBrFiscalYearMeta = {
  2025: {"currency":"BRL","sourceId":"vitoria-br-demonstracoes-2025","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-9.089,"tax":0,"grossDebt":10.273,"cash":0.066,"officialTotalRevenue":236.612,"officialTotalExpenses":258.364,"officialPAT":-25.418,"incluidoEn":{"member_dues":"competition_bonus"},"baseIngreso":"full"},
};

const vitoriaBrPresupuestoOverlayByYear = {};

const vitoriaBrPasesData = [];
const vitoriaBrResultadosData = {};
const vitoriaBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["vitoria-br"] = {
  revenueLinesByYear: vitoriaBrRevenueLinesByYear, expenseLinesByYear: vitoriaBrExpenseLinesByYear,
  fiscalYearMeta: vitoriaBrFiscalYearMeta, pasesData: vitoriaBrPasesData,
  resultadosData: vitoriaBrResultadosData, titulosData: vitoriaBrTitulosData,
  presupuestoOverlayByYear: vitoriaBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"vitoria-br-demonstracoes-2025":{"id":"vitoria-br-demonstracoes-2025","clubId":"vitoria-br","title":"Demonstrações financeiras individuais e consolidadas acompanhadas do Relatório do Auditor Independente, Esporte Clube Vitória, Em 31 de dezembro de 2025","type":"official_balance_sheet","reliability":"primary","url":"https://ecvitoria.com.br/transparencia/demonstracao-financeira/"}});

gestionesByClub["vitoria-br"] = {"sinconfirmar":{"nombre":"Gestión sin confirmar en detalle (firma 2025: Fabio Rios Mota, Presidente)","firstYear":2025,"lastYear":2025}};

memberCountByClub["vitoria-br"] = null;
