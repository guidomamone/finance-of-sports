const voltaredondaBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receita Líquida de Direitos de Transmissão e cota de TV', normalizedCategory:'broadcasting', amountNative:5.83544192, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:2.68317080, disclosureLevel:'detailed' },
    { rawLabel:'Direitos Federativos', normalizedCategory:'player_sales', amountNative:2.15495715, disclosureLevel:'detailed' },
    { rawLabel:'Premiações, Bilheterias e Outros', normalizedCategory:'matchday_competition', amountNative:1.36359741, disclosureLevel:'detailed' },
    { rawLabel:'Contribuições associados', normalizedCategory:'member_dues', amountNative:0.05095031, disclosureLevel:'detailed' },
    { rawLabel:'Receita Repasse Timemania', normalizedCategory:'other_income', amountNative:0.48623513, disclosureLevel:'detailed' },
    { rawLabel:'Doações recebidas, Franquias e Outros', normalizedCategory:'other_income', amountNative:0.06908416, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Receita Líquida de Direitos de Transmissão e cota de TV', normalizedCategory:'broadcasting', amountNative:12.26938381, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.37052755, disclosureLevel:'detailed' },
    { rawLabel:'Direitos Federativos', normalizedCategory:'player_sales', amountNative:4.98046552, disclosureLevel:'detailed' },
    { rawLabel:'Premiações, Bilheterias e Outros', normalizedCategory:'matchday_competition', amountNative:7.01597715, disclosureLevel:'detailed' },
    { rawLabel:'Contribuições associados', normalizedCategory:'member_dues', amountNative:0.07220813, disclosureLevel:'detailed' },
    { rawLabel:'Receita Repasse Timemania', normalizedCategory:'other_income', amountNative:0.65985353, disclosureLevel:'detailed' },
    { rawLabel:'Doações recebidas, Franquias e Outros', normalizedCategory:'other_income', amountNative:0.02851055, disclosureLevel:'detailed' },
  ],
};

const voltaredondaBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Despesas com pessoal e encargos (Futebol Profissional)', normalizedCategory:'wages_squad', amountNative:-5.57307949, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Profissional)', normalizedCategory:'admin_general_expense', amountNative:-2.11388681, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Profissional)', normalizedCategory:'match_organisation_expense', amountNative:-0.96620401, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-1.46905202, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.64985277, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.53681976, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.47456737, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.13570950, disclosureLevel:'detailed' },
    { rawLabel:'Ganho Mensuração a Valor Justo (reavaliação de imóveis, Nota 9)', normalizedCategory:'exceptional_items', amountNative:6.82475897, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Despesas com pessoal e encargos (Futebol Profissional)', normalizedCategory:'wages_squad', amountNative:-13.46611760, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Profissional)', normalizedCategory:'admin_general_expense', amountNative:-5.26560713, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Profissional)', normalizedCategory:'match_organisation_expense', amountNative:-2.16276302, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-1.08872313, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.95719786, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.74612937, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.70213927, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.25472726, disclosureLevel:'detailed' },
  ],
};

const voltaredondaBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'voltaredonda-br-balanco-2024',
    reportType:'official_balance_sheet',
    gestionId:'hortajardim',
    grossDebt:1.84648686, cash:0.06612846,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.28533224,
    tax:0,
    officialTotalRevenue:12.64343688, officialTotalExpenses:11.91917173, officialPAT:7.26369188,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'voltaredonda-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'hortajardim',
    grossDebt:1.73506244, cash:1.12316442,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.71628018,
    tax:0,
    officialTotalRevenue:26.39692624, officialTotalExpenses:25.64340464, officialPAT:0.03724142,
  },
};

const voltaredondaBrPresupuestoOverlayByYear = {};

const voltaredondaBrPasesData = [];
const voltaredondaBrResultadosData = {};
const voltaredondaBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['voltaredonda-br'] = {
  revenueLinesByYear: voltaredondaBrRevenueLinesByYear, expenseLinesByYear: voltaredondaBrExpenseLinesByYear,
  fiscalYearMeta: voltaredondaBrFiscalYearMeta, pasesData: voltaredondaBrPasesData,
  resultadosData: voltaredondaBrResultadosData, titulosData: voltaredondaBrTitulosData,
  presupuestoOverlayByYear: voltaredondaBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'voltaredonda-br-balanco-2024': {
      id:'voltaredonda-br-balanco-2024', clubId:'voltaredonda-br',
      title:'Demonstrações Financeiras do Volta Redonda Futebol Clube, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://servicos.fferj.com.br/ClubesLigas/ViewTeam?alias=134',
      note:'PDF escaneado sin capa de texto, transcripto vía OCR (Tesseract) — Clubes/Brasil/Volta Redonda/balanco-2024.md. Bajado del repositorio de la FERJ (Federação de Futebol do Estado do Rio de Janeiro), no del portal propio del club (que hoy no tiene histórico anterior a 2025). La transcripción OCR de la Nota 13.1(iii) (desglose de "Premiações, Bilheterias, Direitos Federativos e Outros") tenía un dígito mal leído; se corrigió cruzando contra la columna comparativa 2024 de demonstracoes-financeiras-2025.md (texto nativo), que sí reconcilia exacto — ver comentario de cabecera de data/voltaredonda-data.js. El resto de las cifras de 2024 reconcilia igual entre ambas fuentes.',
    },
  'voltaredonda-br-demonstracoes-2025': {
      id:'voltaredonda-br-demonstracoes-2025', clubId:'voltaredonda-br',
      title:'Demonstrações Financeiras do Volta Redonda Futebol Clube, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://voltaco.com.br/transparency',
      note:'PDF con texto nativo, descargado del portal propio de transparencia del club (API https://voltaco.com.br/api/documents, URLs firmadas MinIO/S3 con caducidad de 24 h). Transcripción completa en Clubes/Brasil/Volta Redonda/demonstracoes-financeiras-2025.md. Auditado por Activa Assessoria e Contabilidades Ltda., opinião com ressalvas (parecer-auditoria-externa-2025.md): la única salvedad real es depreciación del Imobilizado contabilizada solo parcialmente (sin control individual de bienes), sin impacto en las líneas de revenue/expense cargadas — no hay salvedad sobre ingresos ni gastos operativos. dre-2025.md (salida cruda del sistema contable, no auditada) reconcilia exacto contra el total de este balance (26.396.926,24 = Futebol Profissional + Administrativo del balance auditado) — mismo dato, más granular, no una fuente alternativa.',
    },
});

gestionesByClub['voltaredonda-br'] = {
  hortajardim: { nombre:'Flávio Cautiero Horta Jardim', firstYear:2024, lastYear:2025 },
};

memberCountByClub['voltaredonda-br'] = null;
