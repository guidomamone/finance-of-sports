const coritibaRevenueLinesByYear = {
  2023: [
    { rawLabel:'Direitos de Transmissão de TV', normalizedCategory:'broadcasting', amountNative:33.523841, disclosureLevel:'detailed' },
    { rawLabel:'Mensalidades de Sócios', normalizedCategory:'member_dues', amountNative:12.909871, disclosureLevel:'detailed' },
    { rawLabel:'Patrimoniais', normalizedCategory:'member_dues', amountNative:8.682417, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios/Subvenção', normalizedCategory:'sponsorship_commercial', amountNative:7.347865, disclosureLevel:'detailed' },
    { rawLabel:'Competições/Bilheteria', normalizedCategory:'matchday_competition', amountNative:3.840888, disclosureLevel:'detailed' },
    { rawLabel:'Transações de Atletas', normalizedCategory:'player_sales', amountNative:3.181675, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas', normalizedCategory:'other_income', amountNative:1.079841, disclosureLevel:'detailed' },
    { rawLabel:'Venda de Mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.046513, disclosureLevel:'detailed' },
    { rawLabel:'(-) Tributos sobre Receitas', normalizedCategory:'other_income', amountNative:-3.775655, disclosureLevel:'detailed' },
    { rawLabel:'(-) Taxas Federativas e Direito de Arena', normalizedCategory:'other_income', amountNative:-2.221018, disclosureLevel:'detailed' },
    { rawLabel:'Receita com cessão de 20% dos direitos comerciais à LCP/Liga Forte União (líquida da provisão do TEF de R$7.145.600)', normalizedCategory:'other_income', amountNative:152.034400, disclosureLevel:'aggregated' },
  ],
  2024: [
    { rawLabel:'Mensalidades de associados', normalizedCategory:'member_dues', amountNative:22.097260, disclosureLevel:'detailed' },
    { rawLabel:'Transações de atletas', normalizedCategory:'player_sales', amountNative:18.003566, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios/subvenção', normalizedCategory:'sponsorship_commercial', amountNative:17.252073, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:10.644365, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:9.752644, disclosureLevel:'detailed' },
    { rawLabel:'Patrimoniais', normalizedCategory:'member_dues', amountNative:9.494258, disclosureLevel:'detailed' },
    { rawLabel:'Competições/bilheteria', normalizedCategory:'matchday_competition', amountNative:3.603440, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com vendas de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.897827, disclosureLevel:'detailed' },
    { rawLabel:'(-) Tributos sobre receitas', normalizedCategory:'other_income', amountNative:-3.501142, disclosureLevel:'detailed' },
    { rawLabel:'(-) Taxas federativas/direito de arena', normalizedCategory:'other_income', amountNative:-1.241584, disclosureLevel:'detailed' },
  ],
};

const coritibaExpenseLinesByYear = {
  2023: [
    { rawLabel:'Pessoal, Benefícios e Encargos sociais (futebol)', normalizedCategory:'wages_squad', amountNative:-44.494312, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Uso de Imagem', normalizedCategory:'wages_squad', amountNative:-18.875392, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direitos Econômicos de Atletas', normalizedCategory:'player_amortisation', amountNative:-13.235967, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-12.684620, disclosureLevel:'detailed' },
    { rawLabel:'Pagamento de dívidas do Coritiba Foot Ball Club (recuperação judicial, parcelamentos tributários, empréstimos e serviços contratados)', normalizedCategory:'other_expenses', amountNative:-65.872826, disclosureLevel:'aggregated' },
    { rawLabel:'Pessoal, Benefícios e Encargos Sociais (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-6.197082, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com Cessão Temporária de Atletas', normalizedCategory:'player_amortisation', amountNative:-4.498408, disclosureLevel:'detailed' },
    { rawLabel:'Viagens e Estadias', normalizedCategory:'match_organisation_expense', amountNative:-3.762917, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Jogos', normalizedCategory:'match_organisation_expense', amountNative:-2.837899, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros (futebol)', normalizedCategory:'match_organisation_expense', amountNative:-2.338279, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Administrativa com Liga Forte', normalizedCategory:'admin_general_expense', amountNative:-1.083150, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-1.150626, disclosureLevel:'detailed' },
    { rawLabel:'Material Esportivo', normalizedCategory:'match_organisation_expense', amountNative:-0.950161, disclosureLevel:'detailed' },
    { rawLabel:'Energia Elétrica, Gás, Água e Telefonia (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.553767, disclosureLevel:'detailed' },
    { rawLabel:'Conservação de Bens Patrimoniais', normalizedCategory:'admin_general_expense', amountNative:-0.777025, disclosureLevel:'detailed' },
    { rawLabel:'Energia Elétrica, Gás, Água e Telefonia (futebol)', normalizedCategory:'match_organisation_expense', amountNative:-0.497097, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de Almoxarifado', normalizedCategory:'admin_general_expense', amountNative:-0.341869, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e Taxas (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.405673, disclosureLevel:'detailed' },
    { rawLabel:'Outros Custos (futebol)', normalizedCategory:'other_expenses', amountNative:-0.785037, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e Taxas (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.241472, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas Administrativas — Multas e Honorários / Encargos Legais', normalizedCategory:'admin_general_expense', amountNative:-0.136110, disclosureLevel:'detailed' },
    { rawLabel:'Propaganda, Publicidade e Eventos', normalizedCategory:'admin_general_expense', amountNative:-0.146927, disclosureLevel:'detailed' },
    { rawLabel:'Custos das Mercadorias Vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.025550, disclosureLevel:'detailed' },
    { rawLabel:'Formação de Atletas (reversão/crédito no exercício)', normalizedCategory:'youth_other_sports_expense', amountNative:0.293017, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Pessoal, benefícios e encargos sociais (futebol)', normalizedCategory:'wages_squad', amountNative:-56.065075, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal, benefícios e encargos sociais (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-32.419142, disclosureLevel:'detailed' },
    { rawLabel:'Direito de uso de imagem', normalizedCategory:'wages_squad', amountNative:-25.447114, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de direitos econômicos de atletas', normalizedCategory:'player_amortisation', amountNative:-21.918799, disclosureLevel:'detailed' },
    { rawLabel:'Outras (despesas) receitas operacionais e não operacionais (Recuperação Judicial, parcelamentos e repasses à Associação)', normalizedCategory:'other_expenses', amountNative:-33.761940, disclosureLevel:'aggregated' },
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-8.805760, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-6.656316, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Jogos', normalizedCategory:'match_organisation_expense', amountNative:-6.191641, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-4.692763, disclosureLevel:'detailed' },
    { rawLabel:'Conservação de bens patrimoniais', normalizedCategory:'admin_general_expense', amountNative:-3.950034, disclosureLevel:'detailed' },
    { rawLabel:'Viagens e estadias', normalizedCategory:'match_organisation_expense', amountNative:-3.609488, disclosureLevel:'detailed' },
    { rawLabel:'Multas e honorários / encargos legais', normalizedCategory:'admin_general_expense', amountNative:-3.591756, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com cessão temporária de atletas', normalizedCategory:'player_amortisation', amountNative:-2.987701, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (futebol)', normalizedCategory:'other_expenses', amountNative:-2.692548, disclosureLevel:'detailed' },
    { rawLabel:'Energia elétrica, gás, água e telefonia', normalizedCategory:'admin_general_expense', amountNative:-2.027238, disclosureLevel:'detailed' },
    { rawLabel:'Formação de atletas', normalizedCategory:'youth_other_sports_expense', amountNative:-1.505257, disclosureLevel:'detailed' },
    { rawLabel:'Locações de equipamentos e imóveis', normalizedCategory:'admin_general_expense', amountNative:-1.161786, disclosureLevel:'detailed' },
    { rawLabel:'Material esportivo', normalizedCategory:'match_organisation_expense', amountNative:-1.013156, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com nova filial (A&B)', normalizedCategory:'admin_general_expense', amountNative:-0.968111, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de almoxarifado', normalizedCategory:'admin_general_expense', amountNative:-0.844676, disclosureLevel:'detailed' },
    { rawLabel:'Propaganda, publicidade e eventos', normalizedCategory:'admin_general_expense', amountNative:-0.546315, disclosureLevel:'detailed' },
    { rawLabel:'Custos das mercadorias vendidas', normalizedCategory:'admin_general_expense', amountNative:-0.430587, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (futebol)', normalizedCategory:'match_organisation_expense', amountNative:-0.413043, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.119313, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.071025, disclosureLevel:'detailed' },
  ],
};

const coritibaFiscalYearMeta = {
  2023: {
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'coritiba-demonstracoes-2022-2023',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:0, cash:11.830912,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.359721, tax:0,
    officialTotalRevenue:216.650638, officialTotalExpenses:181.599150, officialPAT:34.691767,
  },
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'coritiba-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    grossDebt:49.400000, cash:3.623921,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.515749, tax:0,
    officialTotalRevenue:87.002707, officialTotalExpenses:221.889584, officialPAT:-139.402626,
  },
};

const coritibaPresupuestoOverlayByYear = {};

const coritibaPasesData = [];
const coritibaResultadosData = {};
const coritibaTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.coritiba = {
  revenueLinesByYear: coritibaRevenueLinesByYear, expenseLinesByYear: coritibaExpenseLinesByYear,
  fiscalYearMeta: coritibaFiscalYearMeta, pasesData: coritibaPasesData,
  resultadosData: coritibaResultadosData, titulosData: coritibaTitulosData,
  presupuestoOverlayByYear: coritibaPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'coritiba-demonstracoes-2022-2023': {
      id:'coritiba-demonstracoes-2022-2023', clubId:'coritiba',
      title:'Demonstrações Contábeis, Exercícios findos em 31 de dezembro de 2023 e 2022 (publicidade legal, Diário Indústria&Comércio)',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://coritiba.com.br/',
      note:'Publicação legal en el Diário Indústria&Comércio (12-14/4/2024, texto nativo) con Balanços patrimoniais, DRE, resultado abrangente, mutações do PL, fluxos de caixa y Notas Explicativas 1-27 de la Coritiba SAF. Se cargó el ejercicio 2023 (Lucro de R$34.691.767 sobre uma receita líquida de R$64.616.238). NO se cargó 2022: la SAF recién se constituyó el 3/2/2022 y quedó operacional desde el 1/7/2023 (la DRE 2022 muestra "-" en ingresos y costos operacionais, solo Prejuízo de R$16.381 de una sociedad sin actividad todavía). El ejercicio 2023 en sí es también un período PARCIAL (jul-dic 2023, aclarado explícitamente por la propia Nota 20), por la transferencia de operación del Coritiba Foot Ball Club a la SAF. Los costos se cargaron desde la Nota 21 "Custos Operacionais do Futebol" (por natureza) y la Nota 22 "Despesas administrativas e de Marketing" (distinta numeración de notas que el documento 2024). La Nota 23 ("Outras despesas/receitas operacionais") se desglosó en 2 líneas reales (receita de R$152.034.400 por ceder el 20% de los derechos comerciales del Campeonato Brasileiro a LCP vía la Liga Forte União, y despesa de R$65.872.826 por saldar deudas viejas del Coritiba Foot Ball Club) en vez de cargarla neta como una sola línea. grossDebt = 0 (sin nota de Empréstimos e financiamentos en este documento). Convertido a USD con el PTAX BCB de cierre del 29/12/2023 (R$4,8413). Transcripción completa en Clubes/Brasil/Coritiba/demonstracoes-contabeis-2022-2023.md.',
    },
  'coritiba-demonstracoes-2024': {
      id:'coritiba-demonstracoes-2024', clubId:'coritiba',
      title:'Demonstrações Contábeis, Exercícios findos em 31 de dezembro de 2024 e 2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://coritiba.com.br/',
      note:'PDF oficial (36 páginas, texto nativo, firmado por Docusign) con Balanços patrimoniais, DRE, mutações do PL, fluxos de caixa y Notas Explicativas 1-28. Coritiba ES SAF desde julio de 2023. Ejercicio 2024 con PREJUÍZO de R$ 139.402.626 sobre una receita líquida de R$ 87.002.707, y patrimônio líquido NEGATIVO de R$ (29.915.096) al cierre. Los costos del fútbol se cargaron desde el desglose POR NATUREZA de la Nota 22 (9 líneas con categoría real) y no desde las 2 líneas por destino de la DRE, que son un bolsón sin categoría. OJO: la Nota 22 suma R$ 999 más que esas 2 líneas de la DRE para el mismo concepto, una inconsistencia real del documento, documentada en data/coritiba-data.js y en la transcripción. grossDebt = las 2 líneas de Empréstimos e financiamentos (Nota 13). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Coritiba/demonstracoes-financeiras-2024.md.',
    },
});

gestionesByClub.coritiba = {
    sinconfirmar: { nombre:'Gestión actual', firstYear:2023, lastYear:2024 },
  };

memberCountByClub.coritiba = null;
