// GENERADO desde data/br/vascodagama-br.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const vascodagamaBrRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Direitos de transmissão","normalizedCategory":"broadcasting","amountNative":98.697,"disclosureLevel":"detailed"},
    {"rawLabel":"Bilheteria","normalizedCategory":"matchday_competition","amountNative":25.533,"disclosureLevel":"detailed"},
    {"rawLabel":"Marketing","normalizedCategory":"sponsorship_commercial","amountNative":48.982,"disclosureLevel":"detailed"},
    {"rawLabel":"Repasse de direitos federativos","normalizedCategory":"player_sales","amountNative":123.739,"disclosureLevel":"detailed"},
    {"rawLabel":"Mecanismo de solidariedade","normalizedCategory":"youth_football","amountNative":1.282,"disclosureLevel":"detailed"},
    {"rawLabel":"Programa de sócio torcedor","normalizedCategory":"member_dues","amountNative":31.798,"disclosureLevel":"detailed"},
    {"rawLabel":"Tour da Colina","normalizedCategory":"stadium_other","amountNative":0.988,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas com premiação","normalizedCategory":"competition_bonus","amountNative":19.838,"disclosureLevel":"detailed"},
    {"rawLabel":"Licenciamento e royalties","normalizedCategory":"sponsorship_commercial","amountNative":8.638,"disclosureLevel":"detailed"},
    {"rawLabel":"Receitas diversas","normalizedCategory":"other_income","amountNative":4.159,"disclosureLevel":"detailed"},
    {"rawLabel":"Deduções sobre a receita (impostos e outras)","normalizedCategory":"other_income","amountNative":-18.323,"disclosureLevel":"detailed"},
  ],
};

const vascodagamaBrExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Salários, encargos e benefícios a funcionários (custo dos serviços)","normalizedCategory":"wages_squad","amountNative":-123.573,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortizações de direitos sobre atletas","normalizedCategory":"player_amortisation","amountNative":-58.783,"disclosureLevel":"detailed"},
    {"rawLabel":"Direitos de imagem","normalizedCategory":"wages_squad","amountNative":-36.235,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos com jogos e competições","normalizedCategory":"match_organisation_expense","amountNative":-30.314,"disclosureLevel":"detailed"},
    {"rawLabel":"Manutenção (custo dos serviços)","normalizedCategory":"admin_general_expense","amountNative":-7.47,"disclosureLevel":"detailed"},
    {"rawLabel":"Serviços profissionais (custo dos serviços)","normalizedCategory":"admin_general_expense","amountNative":-11.501,"disclosureLevel":"detailed"},
    {"rawLabel":"Custo de material esportivo","normalizedCategory":"admin_general_expense","amountNative":-2.924,"disclosureLevel":"detailed"},
    {"rawLabel":"Repasse de direitos econômicos","normalizedCategory":"other_expenses","amountNative":-27.232,"disclosureLevel":"detailed"},
    {"rawLabel":"Baixa de direitos econômicos de atletas profissionais","normalizedCategory":"player_amortisation","amountNative":-13.004,"disclosureLevel":"detailed"},
    {"rawLabel":"Baixa de direitos econômicos de atletas em formação","normalizedCategory":"player_amortisation","amountNative":-8.745,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos com negociação de atletas","normalizedCategory":"other_expenses","amountNative":-21.383,"disclosureLevel":"detailed"},
    {"rawLabel":"Outros (custo dos serviços)","normalizedCategory":"other_expenses","amountNative":-1.077,"disclosureLevel":"detailed"},
    {"rawLabel":"Salários, encargos e benefícios a funcionários (G&A)","normalizedCategory":"admin_general_expense","amountNative":-22.128,"disclosureLevel":"detailed"},
    {"rawLabel":"Despesas operacionais e de estruturação","normalizedCategory":"admin_general_expense","amountNative":-30.673,"disclosureLevel":"detailed"},
    {"rawLabel":"PECLD (recuperação líquida, valor reconciliado — ver cabecera)","normalizedCategory":"admin_general_expense","amountNative":0.02,"disclosureLevel":"detailed"},
    {"rawLabel":"Serviços profissionais (G&A)","normalizedCategory":"admin_general_expense","amountNative":-9.842,"disclosureLevel":"detailed"},
    {"rawLabel":"Manutenção (G&A)","normalizedCategory":"admin_general_expense","amountNative":-1.256,"disclosureLevel":"detailed"},
    {"rawLabel":"Provisão para riscos judiciais","normalizedCategory":"admin_general_expense","amountNative":-6.495,"disclosureLevel":"detailed"},
    {"rawLabel":"Outros (G&A)","normalizedCategory":"other_expenses","amountNative":-1.659,"disclosureLevel":"detailed"},
    {"rawLabel":"Outras receitas (despesas) operacionais","normalizedCategory":"other_expenses","amountNative":-0.579,"disclosureLevel":"detailed"},
  ],
};

const vascodagamaBrFiscalYearMeta = {
  2023: {"currency":"BRL","sourceId":"vascodagama-br-demonstracoes-2023","reportType":"official_balance_sheet","gestionId":"sinconfirmar","fxRef":"BRL@2023-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-53.976,"tax":0,"grossDebt":44.654,"cash":79.922,"officialTotalRevenue":345.331,"officialTotalExpenses":414.853,"officialPAT":-123.498,"baseIngreso":"full"},
};

const vascodagamaBrPresupuestoOverlayByYear = {};

const vascodagamaBrPasesData = [];
const vascodagamaBrResultadosData = {};
const vascodagamaBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["vascodagama-br"] = {
  revenueLinesByYear: vascodagamaBrRevenueLinesByYear, expenseLinesByYear: vascodagamaBrExpenseLinesByYear,
  fiscalYearMeta: vascodagamaBrFiscalYearMeta, pasesData: vascodagamaBrPasesData,
  resultadosData: vascodagamaBrResultadosData, titulosData: vascodagamaBrTitulosData,
  presupuestoOverlayByYear: vascodagamaBrPresupuestoOverlayByYear,
};

Object.assign(sources, {"vascodagama-br-demonstracoes-2023":{"id":"vascodagama-br-demonstracoes-2023","clubId":"vascodagama-br","title":"Vasco da Gama SAF — Demonstrações Contábeis 2023 (exercício findo em 31/12/2023 e período findo em 31/12/2022)","type":"official_balance_sheet","reliability":"primary","url":"https://media.vasco.com.br/transparencia"}});

gestionesByClub["vascodagama-br"] = {"sinconfirmar":{"nombre":"Vasco da Gama SAF (gestión no confirmada en detalle)","firstYear":2023,"lastYear":2023}};

memberCountByClub["vascodagama-br"] = null;
