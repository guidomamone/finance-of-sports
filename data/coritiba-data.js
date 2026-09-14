// ============================================================================
// data/coritiba-data.js — Coritiba Sociedade Anônima do Futebol - SAF
// (Curitiba, PR, Brasil). SÍ es SAF, desde julio de 2023: el Patrimônio Líquido
// tiene Capital social subscrito (no "Patrimonio Social" de associação) y la DRE
// informa "Lucro/(Prejuízo) por ação". Ejercicio social = ANO CALENDÁRIO
// (1/1/2024 a 31/12/2024), ver `fiscalYearStart:'01-01'` en data/clubs.js.
// 1 ejercicio cargado: 2024.
//
// FUENTE: `Clubes/Brasil/Coritiba/demonstracoes-financeiras-2024.pdf` (36
// páginas, texto nativo, vía pdftotext -layout), firmado por Docusign,
// transcripción completa en `demonstracoes-financeiras-2024.md` en la misma
// carpeta. Trae Balanços patrimoniais, DRE, resultado abrangente, mutações do PL,
// fluxos de caixa y Notas Explicativas 1-28.
//
// EJERCICIO MUY MALO: PREJUÍZO de R$ 139.402.626 sobre una receita líquida de
// R$ 87.002.707 (el club gastó 2,5 veces lo que ingresó), y cerró con PATRIMÔNIO
// LÍQUIDO NEGATIVO de R$ (29.915.096). Es, de lejos, el peor ejercicio de
// cualquier club cargado en el sitio hasta ahora.
//
// ESCALA: el documento está en reales enteros ("Em Reais"), NO en miles. Acá se
// guardan en MILLONES de BRL nativos, cada valor dividido por 1.000.000.
//
// DE DÓNDE SALE CADA LÍNEA (esto importa, no se copió la DRE tal cual):
// La DRE presenta los costos del fútbol en 2 líneas por DESTINO ("Futebol
// profissional" 86.642.166 y "Futebol das categorias de base" 11.895.914). Esas
// 2 líneas NO se cargaron: son un bolsón sin categoría real identificable, y
// cargarlas así dejaría el bucket "Salarios y primas" de Formato Simplificado en
// CERO para Coritiba, que es exactamente el bug que la REGLA de la Versión 38
// existe para evitar (ver club-data-mapping SKILL.md sección 1). En su lugar se
// cargaron las 9 líneas POR NATUREZA de la Nota 22, que sí tienen cada una una
// categoría real (pessoal, direito de imagem, jogos, viagens, etc.). Mismo
// criterio con las Despesas administrativas: se cargaron las 13 líneas de la
// Nota 23, no la única línea agregada de la DRE.
//
// DISCREPANCIA REAL DE LA FUENTE (documentada, no un error de lectura): la Nota
// 22 suma 98.539.079 (exacto contra su propio total impreso) mientras que las 2
// líneas de la DRE para el MISMO concepto suman 98.538.080. Son R$ 999 de
// diferencia sin explicación en el documento. Como acá se cargó el desglose de la
// Nota 22, la suma de expenseLines queda R$ 999 (0,000999 M) por encima de la
// cascada impresa de la DRE, y el PAT calculado queda en R$ (139.403.626) contra
// los R$ (139.402.626) impresos: R$ 1.000 de diferencia, contando también el
// redondeo de R$ 1 que la propia DRE ya arrastra. `officialTotalExpenses` y
// `officialPAT` guardan los números IMPRESOS por el documento, no los recalculados
// — la diferencia (0,001 M) cae dentro de la tolerancia de `verifyTieOuts()`
// (0,01 M), así que el check pasa, pero está documentada acá a propósito en vez de
// esconderla ajustando alguna línea para que cierre exacto.
//
// Categorización:
// - INGRESOS (DRE, RECEITA OPERACIONAL BRUTA): 'Direitos de transmissão de TV' ->
//   broadcasting; 'Mensalidades de associados' y 'Patrimoniais' -> member_dues
//   (mismo criterio que 'Receitas Patrimoniais' de Grêmio: mensalidad de sócio
//   patrimonial); 'Transações de atletas' -> player_sales;
//   'Competições/bilheteria' -> matchday_competition; 'Patrocínios/subvenção' y
//   'Receitas com vendas de mercadorias' -> sponsorship_commercial (la categoría
//   ya incluye merchandising); 'Outras receitas' -> other_income.
// - DEDUCCIONES de la receita bruta ('Tributos sobre receitas', 'Taxas
//   federativas/direito de arena') -> other_income NEGATIVO: son deducciones
//   DENTRO del bloque de ingresos del propio documento, dejarlas acá en negativo
//   es lo que hace que revenueLines sume la RECEITA OPERACIONAL LÍQUIDA impresa
//   (87.002.707). Mismo criterio que los impostos de Ituano y de Grêmio.
// - COSTOS (Nota 22, por natureza): 'Pessoal, benefícios e encargos sociais' y
//   'Direito de uso de imagem' -> wages_squad (en Brasil el direito de imagem es
//   parte de la remuneración del plantel, no un gasto comercial); 'Despesas com
//   Jogos', 'Viagens e estadias', 'Material esportivo' y 'Serviços de terceiros'
//   -> match_organisation_expense; 'Gastos com cessão temporária de atletas' ->
//   player_amortisation (costo de incorporar jugadores a préstamo: es adquisición
//   de plantel, va al bucket "Compra de jugadores", mismo criterio que Racing
//   expensando el costo de transferencia completo); 'Impostos e taxas' ->
//   admin_general_expense; 'Outros custos' -> other_expenses.
// - Resto de CUSTOS OPERACIONAIS de la DRE (no están en la Nota 22): 'Amortização
//   de direitos econômicos de atletas' -> player_amortisation; 'Formação de
//   atletas' -> youth_other_sports_expense; 'Custos das mercadorias vendidas' ->
//   admin_general_expense (mismo criterio que el CMV de Grêmio Mania).
// - DESPESAS ADMINISTRATIVAS (Nota 23, 13 líneas) -> admin_general_expense todas.
//   Se omitió 'Despesas administrativa com liga forte', que en 2024 está en "-"
//   (solo tuvo monto en 2023).
// - 'Outras (despesas) receitas operacionais e não operacionais' (Nota 24) ->
//   other_expenses. La Nota 24 NO trae tabla, solo un párrafo: dice que son el
//   pago de la Recuperação Judicial, parcelamentos de impostos y repasses a la
//   Associação que la SAF asumió al comprar el club. Sin desglose disponible, va
//   como una sola línea.
// - RESULTADO FINANCEIRO LÍQUIDO (Nota 25) -> NO va como línea, va neteado a
//   `netInterest` (-4.515.749), como manda SKILL.md sección 2.
//
// grossDebt = 'Empréstimos e financiamentos' circulante (20.854.479) + não
// circulante (28.545.521) = 49.400.000, ambos Nota 13. Quedan fuera Fornecedores,
// Obrigações trabalhistas/tributárias, Entidades desportivas y Outras obrigações:
// son pasivos operativos, no deuda financiera (mismo criterio que Grêmio e
// Ituano). cash = 'Caixa e equivalentes de caixa' (Nota 4) = 3.623.921, contra
// 11.830.912 en 2023.
//
// FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 — misma cotización oficial del
// Banco Central do Brasil que ya usan Grêmio, Botafogo, Ituano y Mirassol para ESE
// MISMO cierre. El documento no declara tipo de cambio propio.
//
// Gestión: el documento está firmado digitalmente vía Docusign y no identifica a
// un presidente en el texto extraíble. No se confirmó ninguna gestión, se cargó
// una entrada genérica (SKILL.md sección 7).
// ============================================================================

const coritibaRevenueLinesByYear = {
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
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'coritiba-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = Empréstimos e financiamentos circulante (20.854479) + não
    // circulante (28.545521), ambos Nota 13. cash = Caixa e equivalentes (Nota 4).
    grossDebt:49.400000, cash:3.623921,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = RESULTADO FINANCEIRO LÍQUIDO (Nota 25): receitas financeiras
    // 4.791274 - despesas financeiras 9.307023.
    netInterest:-4.515749, tax:0,
    // Los 3 campos guardan los números IMPRESOS por el documento, no los que da
    // sumar las líneas cargadas (ver la discrepancia de R$ 999 entre la Nota 22 y
    // la DRE, explicada en el comentario de cabecera). officialTotalRevenue =
    // RECEITA OPERACIONAL LÍQUIDA; officialTotalExpenses = CUSTOS OPERACIONAIS
    // (122.392.722) + (DESPESAS) RECEITAS OPERACIONAIS (99.496.862);
    // officialPAT = LUCRO/(PREJUÍZO) DO EXERCÍCIO.
    officialTotalRevenue:87.002707, officialTotalExpenses:221.889584, officialPAT:-139.402626,
  },
};

const coritibaPresupuestoOverlayByYear = {};

const coritibaPasesData = [];
const coritibaResultadosData = {};
const coritibaTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.coritiba = {
  revenueLinesByYear: coritibaRevenueLinesByYear, expenseLinesByYear: coritibaExpenseLinesByYear,
  fiscalYearMeta: coritibaFiscalYearMeta, pasesData: coritibaPasesData,
  resultadosData: coritibaResultadosData, titulosData: coritibaTitulosData,
  presupuestoOverlayByYear: coritibaPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'coritiba-demonstracoes-2024': {
      id:'coritiba-demonstracoes-2024', clubId:'coritiba',
      title:'Demonstrações Contábeis, Exercícios findos em 31 de dezembro de 2024 e 2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://coritiba.com.br/',
      note:'PDF oficial (36 páginas, texto nativo, firmado por Docusign) con Balanços patrimoniais, DRE, mutações do PL, fluxos de caixa y Notas Explicativas 1-28. Coritiba ES SAF desde julio de 2023. Ejercicio 2024 con PREJUÍZO de R$ 139.402.626 sobre una receita líquida de R$ 87.002.707, y patrimônio líquido NEGATIVO de R$ (29.915.096) al cierre. Los costos del fútbol se cargaron desde el desglose POR NATUREZA de la Nota 22 (9 líneas con categoría real) y no desde las 2 líneas por destino de la DRE, que son un bolsón sin categoría. OJO: la Nota 22 suma R$ 999 más que esas 2 líneas de la DRE para el mismo concepto, una inconsistencia real del documento, documentada en data/coritiba-data.js y en la transcripción. grossDebt = las 2 líneas de Empréstimos e financiamentos (Nota 13). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Coritiba/demonstracoes-financeiras-2024.md.',
    },
});

gestionesByClub.coritiba = {
    // El documento está firmado por Docusign y no identifica presidente en el texto.
    sinconfirmar: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.coritiba = null; // no se encontró una cifra confiable en esta sesión
