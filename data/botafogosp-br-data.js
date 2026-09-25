// ============================================================================
// data/botafogosp-br-data.js — Botafogo Futebol S.A. - SAF (Botafogo Futebol Clube,
// Ribeirão Preto, São Paulo, Brasil) — SAF (Sociedade Anônima do Futebol), 60% del
// capital del Botafogo Futebol Clube (associação, fundado 1918) + 40% de Trexx Sports
// Participações. NO es el Botafogo de Rio de Janeiro (ese es clubId 'botafogo', ya
// cargado). clubId 'botafogosp-br' (CON GUIÓN, bracket notation en clubs{}/
// CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub, mismo criterio que el resto de
// los clubes de Brasil). displayName sugerido 'Botafogo-SP' (NO 'Botafogo' a secas, para
// no chocar visualmente con el club carioca en el dropdown).
//
// 1 ejercicio cargado: 2024 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 —
// "DEMONSTRAÇÃO DO RESULTADO PARA OS EXERCÍCIOS FINDOS EM 31 DE DEZEMBRO DE 2024 E DE
// 2023"). Fuente: Demonstrações Contábeis auditadas, descargadas de
// botafogofutebolsa.com.br (ver fuentes/Brasil/Botafogo-SP.md — el archivo también
// incluye 2019/2020 y 2022/2023, NO cargados en esta sesión, ver nota de alcance al
// final). Transcripción completa (texto nativo, pdftotext -layout) en
// Clubes/Brasil/Botafogo-SP/demonstracoes-contabeis-2023-2024.md (1542 líneas).
//
// Escala: valores originales "Em reais" (reais completos, sin centavos en esta DRE) —
// acá en MILLONES de BRL nativos (dividir por 1.000.000).
//
// ESTRUCTURA REAL DEL DOCUMENTO: DRE muy bien desglosada, con notas numeradas 21-28. La
// 'RECEITA OPERACIONAL LÍQUIDA' impresa (Nota 21) ya viene neta de "Deduções da Receita
// Bruta" (impostos, despesas sócio torcedor, repasse de arrecadação de jogos — 3 líneas
// que acá se cargaron como líneas de ingreso NEGATIVAS, contra la categoría de la receita
// bruta que reducen, no como gasto aparte). La 'Nota 27' ("Outras Receitas (Despesas)
// Operacionais") está impresa DEBAJO del bloque de gastos operativos en la DRE (antes del
// resultado financiero), pero sus 4 componentes son ingresos genuinos (no gastos) —
// se cargaron como revenueLines igual, la posición en la página no cambia su naturaleza.
//
// Categorización (Ingresos), Nota 21:
// - 'Cotas de Participação' (montos determinados por la Federação Paulista de Futebol y la
//   CBF por participar en el Paulistão/Brasileirão) -> competition_bonus (distinto de
//   'Direito de Transmissão', que es un rubro separado en este mismo documento — ver nota
//   (i) de la Nota 21: "receitas... registradas... pelos valores determinados pela
//   Federação... e Confederação", más cerca de un pago por participación/avance que de un
//   contrato de TV directo).
// - 'Patrocínios e Publicidade' -> sponsorship_commercial.
// - 'Sócio Torcedor' -> member_dues.
// - 'Transação de Atletas' -> player_sales.
// - 'Arrecadação de Jogos' -> matchday_competition.
// - 'Receita com Eventos e Shows' -> stadium_other (nota (v) de la misma Nota 21 confirma
//   que estos eventos/shows usan "suítes, camarotes e o estádio").
// - 'Receita de Aluguel' -> stadium_other (nota (v): "alocação com aluguel de espaços...
//   como suítes, camarotes e o estádio" — nombra el estádio explícitamente, cumple el
//   criterio conservador de club-data-mapping sección 1).
// - 'Outras Receitas' (Nota 21) -> competition_bonus (nota (vi) aclara que es "premiação
//   de Campeonato em geral... programa de excelência FPF, premiação pela 9ª colocação
//   Paulista – FPF e premiação pela primeira fase da Copa do Brasil" — son premios de
//   competencia, no un catch-all genérico).
// - 'Direito de Transmissão' -> broadcasting.
// - 'Impostos Incidentes sobre Receitas (TEF)' (deducción) -> other_income (negativo; no
//   hay una categoría "impuesto sobre ingresos" del lado revenue, y no está atado a un
//   único rubro de receita bruta).
// - 'Despesas Sócio Torcedor' (deducción, costo de operar el programa a través de un
//   tercero) -> member_dues (negativo, reduce directamente esa misma línea de receita).
// - 'Repasse de Arrecadação de Jogos' (deducción — nota (iv): "relacionada às cadeiras
//   cativas e camarotes, é repassada ao acionista Botafogo Futebol Clube") ->
//   matchday_competition (negativo, reduce directamente esa misma línea).
// Categorización (Ingresos), Nota 27 ("Outras Receitas (Despesas) Operacionais"):
// - 'Cessão de Uso de Superfície' -> stadium_other (Nota 10 + Nota 33 del documento
//   completo confirman que el "Direito de Superfície" es del estádio Santa Cruz).
// - 'Bonificações' -> competition_bonus.
// - 'Ajuste a Valor Presente (AVP)' -> other_income (ajuste contable, el documento lo
//   clasifica como operacional, no financiero — se respeta esa clasificación propia).
// - 'Outras Receitas' (Nota 27) -> other_income.
//
// Categorización (Gastos), Nota 22 ("Custo com Atletas, Comissão Técnica e Jogos"),
// sub-bloque "Custo com Atletas e Comissão Técnica":
// - 'Salários', 'Direito de Imagem', 'Férias', 'INSS e FGTS', 'Prêmios e Gratificações',
//   '13º Salário', 'Alimentação', 'Assistência Médica Odontológica', 'Luvas Contratuais',
//   'Ajuda de Custo', 'Outros Custos' -> wages_squad (compensación del plantel/comisión
//   técnica en todas sus formas).
// - 'Amortização de Direito de Jogadores' -> player_amortisation.
// - 'Cessão de Atletas e Empréstimos' -> player_amortisation (costo de préstamos/cesiones
//   de jugadores, más cerca de un costo de mercado de pases que de una compensación fija).
// Resto de Nota 22:
// - 'Custos com Campeonato Estadual', 'Custos com Campeonato Nacional', 'Outros Custos com
//   Futebol' -> match_organisation_expense.
// - 'Custos com Futebol Base' -> youth_other_sports_expense.
// - 'Custos com Eventos e Shows' -> admin_general_expense (no hay categoría de gasto
//   específica para "estadio/eventos" del lado expense, a diferencia del lado revenue que
//   sí tiene stadium_other — es un costo comercial no-futbolístico, encaja en la
//   descripción de admin_general_expense).
// Nota 23 ("Despesas com Pessoal", personal administrativo NO vinculado al plantel):
// - Todas las líneas ('Salários', 'INSS e FGTS', 'Férias', '13º Salário', 'Alimentação',
//   'Outras Despesas') -> admin_general_expense.
// Nota 24 ("Despesas Administrativas e Gerais"): todas las líneas -> admin_general_expense
// (incluye 'Sócio Torcedor', la contraparte de gasto de administrar el programa — DISTINTA
// de 'Despesas Sócio Torcedor' de la Nota 21, que es una deducción de receita).
// Nota 25 ("Despesas Tributárias"): todas las líneas (incluye 'ICMS', único ítem positivo/
// crédito neto del grupo) -> admin_general_expense (club-data-mapping sección 17: impuestos
// SIEMPRE admin_general_expense).
// Nota 26 ("Despesas com Depreciações e Amortizações"): 'Amortização de Direito de Uso'
// (amortización de un derecho de uso de superfície/arrendamiento, CPC 06/IFRS16, no
// relacionada a jugadores) y 'Depreciações' -> depreciation.
// Nota 28 ("Receitas (Despesas) Financeiras Líquidas") = netInterest, NUNCA como línea
// (club-data-mapping sección 2) — a diferencia de Juventude, acá el documento SÍ la separa
// en su propia sección después de "LUCRO ANTES DO RESULTADO FINANCEIRO", coherente con el
// criterio del sitio.
//
// VERIFICACIÓN (a mano, contra los subtotales impresos de cada nota):
// Nota 21: receita bruta (9 líneas) suma 45,626920 M BRL = impreso, EXACTO. Deduções (3
// líneas) suman -2,608207 M BRL = impreso, EXACTO. Receita líquida = 43,018713 M BRL =
// 'RECEITA OPERACIONAL LÍQUIDA' impreso, EXACTO. Nota 22: 6 sub-bloques suman -37,374082 M
// BRL = 'Custo com Atletas, Comissão Técnica e Jogos' impreso, EXACTO (sub-bloque
// wages_squad+player_amortisation por separado: 24,107040 + 4,221710 = 28,328750 M BRL =
// 'Custo com Atletas e Comissão Técnica' impreso, EXACTO). Nota 23: 6 líneas suman
// -4,211141 M BRL = impreso, EXACTO. Nota 24: 11 líneas suman -5,346240 M BRL = impreso,
// EXACTO. Nota 25: 7 líneas (incluyendo el crédito de ICMS) suman -0,493843 M BRL =
// impreso, EXACTO. Nota 26: 2 líneas suman -2,074738 M BRL = impreso, EXACTO. Nota 27: 4
// líneas suman 3,013948 M BRL = impreso, EXACTO. officialTotalRevenue (suma de las 16
// revenueLines) = 46,032661 M BRL. officialTotalExpenses (suma de las 43 expenseLines,
// abs) = 49,500044 M BRL. netInterest = 'Receitas Financeiras' (0,002002) - 'Despesas
// Financeiras' (0,078496) = -0,076494 M BRL. Check final: 46,032661 - 49,500044 +
// (-0,076494) = -3,543877 M BRL = 'LUCRO (PREJUÍZO) DO EXERCÍCIO' impreso (R$-3.543.877),
// EXACTO.
//
// grossDebt = 'Partes Relacionadas' (circulante 0,166667 + não circulante 53,426590 =
// 53,593257 M BRL — préstamos del accionista/controlante, la línea más parecida a
// financiamiento real que separa el propio Balanço Patrimonial). OJO, criterio distinto de
// Palmeiras/Botafogo do Rio: este documento NO tiene una línea "Empréstimos e
// Financiamentos" separada — las 2 candidatas visibles son 'Partes Relacionadas' (elegida,
// financiamiento del controlante) y 'Obrigações com Arrendamento' (circulante 1,353056 +
// não circulante 10,237177 = 11,590233 M BRL, pasivo de arrendamiento IFRS16, más operativo
// que financiero). Pregunta para Admin/dudas-por-club.md: confirmar con el club/auditor si
// 'Partes Relacionadas' es efectivamente deuda financiera (con interés) o un aporte de
// capital de trabajo sin costo. cash = 'Caixa e Equivalentes de Caixa' (0,013588 M BRL).
//
// FX: el documento no declara su propio tipo de cambio de cierre — PTAX de cierre BCB,
// referenciado a FX_CLOSE (BRL@2024-12-31, ya existía antes de esta sesión, mismo valor
// que usan Palmeiras 2024/Amazonas 2024).
//
// Gestión: Wikipedia (pt) lista a Alessander De Martin (FC) / Adalberto Baptista (SA) como
// presidentes ACTUALES, pero no se confirmó que hayan presidido la totalidad del ejercicio
// 2024 -> gestionId:null, sin entrada en gestionesByClub (club-or-year-onboarding sección
// 16: ya no es obligatorio).
//
// memberCountByClub: null — no se encontró ninguna cifra de sócios/associados en el
// documento (es una SAF, no tiene programa de socios propio más allá de 'Sócio Torcedor',
// cuya cantidad tampoco se publica en este documento).
//
// brandColor: null — el club es TRICOLOR (vermelho/branco/preto, confirmado por
// pt.wikipedia.org: "Tem como cores o vermelho, branco e preto"), sin un hex oficial
// verificable en ninguna fuente chequeada (infobox de Wikipedia solo da los 2 colores de
// kit —branco/preto—, no el vermelho; sitio oficial y agregadores no dieron un hex
// confiable en la familia esperada). Ambiguo -> null (club-or-year-onboarding sección 3).
//
// ALCANCE DE ESTA SESIÓN: el archivo fuente de Botafogo-SP (ver fuentes/Brasil/
// Botafogo-SP.md) también tiene demonstracoes-financeiras-2019-2020.md y
// demonstracoes-contabeis-2022-2023.md, con los ejercicios 2019, 2020, 2022 y 2023 — NO
// cargados acá (esta sesión cargó solo 2024, el club era nuevo). Quedan como trabajo
// pendiente para una sesión futura de onboarding de más ejercicios de este mismo club.
// ============================================================================

const botafogospBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Cotas de Participação', normalizedCategory:'competition_bonus', amountNative:23.657248, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:3.793653, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:2.835215, disclosureLevel:'detailed' },
    { rawLabel:'Transação de Atletas', normalizedCategory:'player_sales', amountNative:2.556087, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de Jogos', normalizedCategory:'matchday_competition', amountNative:4.588867, disclosureLevel:'detailed' },
    { rawLabel:'Receita com Eventos e Shows', normalizedCategory:'stadium_other', amountNative:0.768144, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Aluguel', normalizedCategory:'stadium_other', amountNative:2.263418, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (premiações, Nota 21-vi)', normalizedCategory:'competition_bonus', amountNative:0.284288, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Transmissão', normalizedCategory:'broadcasting', amountNative:4.880000, disclosureLevel:'detailed' },
    { rawLabel:'Impostos Incidentes sobre Receitas (TEF)', normalizedCategory:'other_income', amountNative:-2.281858, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Sócio Torcedor (dedução da receita bruta)', normalizedCategory:'member_dues', amountNative:-0.303834, disclosureLevel:'detailed' },
    { rawLabel:'Repasse de Arrecadação de Jogos', normalizedCategory:'matchday_competition', amountNative:-0.022515, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de Uso de Superfície', normalizedCategory:'stadium_other', amountNative:0.332115, disclosureLevel:'detailed' },
    { rawLabel:'Bonificações', normalizedCategory:'competition_bonus', amountNative:0.237137, disclosureLevel:'detailed' },
    { rawLabel:'Ajuste a Valor Presente (AVP)', normalizedCategory:'other_income', amountNative:2.014732, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (Nota 27)', normalizedCategory:'other_income', amountNative:0.429964, disclosureLevel:'detailed' },
  ],
};

const botafogospBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Salários (plantel/comissão técnica)', normalizedCategory:'wages_squad', amountNative:-10.924615, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-5.636639, disclosureLevel:'detailed' },
    { rawLabel:'Férias (plantel)', normalizedCategory:'wages_squad', amountNative:-1.993080, disclosureLevel:'detailed' },
    { rawLabel:'INSS e FGTS (plantel)', normalizedCategory:'wages_squad', amountNative:-0.877373, disclosureLevel:'detailed' },
    { rawLabel:'Prêmios e Gratificações', normalizedCategory:'wages_squad', amountNative:-0.152000, disclosureLevel:'detailed' },
    { rawLabel:'13º Salário (plantel)', normalizedCategory:'wages_squad', amountNative:-1.009075, disclosureLevel:'detailed' },
    { rawLabel:'Alimentação (plantel)', normalizedCategory:'wages_squad', amountNative:-0.763787, disclosureLevel:'detailed' },
    { rawLabel:'Assistência Médica Odontológica', normalizedCategory:'wages_squad', amountNative:-0.023067, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direito de Jogadores', normalizedCategory:'player_amortisation', amountNative:-0.331506, disclosureLevel:'detailed' },
    { rawLabel:'Luvas Contratuais', normalizedCategory:'wages_squad', amountNative:-1.191683, disclosureLevel:'detailed' },
    { rawLabel:'Ajuda de Custo', normalizedCategory:'wages_squad', amountNative:-1.272313, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de Atletas e Empréstimos', normalizedCategory:'player_amortisation', amountNative:-3.890204, disclosureLevel:'detailed' },
    { rawLabel:'Outros Custos (com atletas e comissão técnica)', normalizedCategory:'wages_squad', amountNative:-0.263408, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Campeonato Estadual', normalizedCategory:'match_organisation_expense', amountNative:-2.305812, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Campeonato Nacional', normalizedCategory:'match_organisation_expense', amountNative:-2.926585, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Futebol Base', normalizedCategory:'youth_other_sports_expense', amountNative:-0.412463, disclosureLevel:'detailed' },
    { rawLabel:'Outros Custos com Futebol', normalizedCategory:'match_organisation_expense', amountNative:-2.981436, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Eventos e Shows', normalizedCategory:'admin_general_expense', amountNative:-0.419036, disclosureLevel:'detailed' },
    { rawLabel:'Salários (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-1.727666, disclosureLevel:'detailed' },
    { rawLabel:'INSS e FGTS (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.997701, disclosureLevel:'detailed' },
    { rawLabel:'Férias (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.629163, disclosureLevel:'detailed' },
    { rawLabel:'13º Salário (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.107875, disclosureLevel:'detailed' },
    { rawLabel:'Alimentação (pessoal administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.293466, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas (Nota 23, pessoal)', normalizedCategory:'admin_general_expense', amountNative:-0.455270, disclosureLevel:'detailed' },
    { rawLabel:'Bens de Pequeno Valor', normalizedCategory:'admin_general_expense', amountNative:-0.040118, disclosureLevel:'detailed' },
    { rawLabel:'Contingências', normalizedCategory:'admin_general_expense', amountNative:-0.332105, disclosureLevel:'detailed' },
    { rawLabel:'Energia Elétrica', normalizedCategory:'admin_general_expense', amountNative:-0.907065, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.633132, disclosureLevel:'detailed' },
    { rawLabel:'Material de Escritório, Limpeza e Consumo', normalizedCategory:'admin_general_expense', amountNative:-0.117516, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade e Propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.126434, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.985532, disclosureLevel:'detailed' },
    { rawLabel:'Sócio Torcedor (despesa administrativa)', normalizedCategory:'admin_general_expense', amountNative:-0.506276, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.501600, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com Alimentação (Nota 24)', normalizedCategory:'admin_general_expense', amountNative:-0.412307, disclosureLevel:'detailed' },
    { rawLabel:'Outras Despesas (Nota 24)', normalizedCategory:'admin_general_expense', amountNative:-0.784155, disclosureLevel:'detailed' },
    { rawLabel:'IPVA', normalizedCategory:'admin_general_expense', amountNative:-0.006417, disclosureLevel:'detailed' },
    { rawLabel:'ICMS', normalizedCategory:'admin_general_expense', amountNative:0.001959, disclosureLevel:'detailed' },
    { rawLabel:'Multas Fiscais', normalizedCategory:'admin_general_expense', amountNative:-0.036917, disclosureLevel:'detailed' },
    { rawLabel:'Juros Fiscais', normalizedCategory:'admin_general_expense', amountNative:-0.241062, disclosureLevel:'detailed' },
    { rawLabel:'Impostos Municipais', normalizedCategory:'admin_general_expense', amountNative:-0.002443, disclosureLevel:'detailed' },
    { rawLabel:'Taxas Diversas', normalizedCategory:'admin_general_expense', amountNative:-0.208963, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de Direito de Uso', normalizedCategory:'depreciation', amountNative:-0.482926, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-1.591812, disclosureLevel:'detailed' },
  ],
};

const botafogospBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'botafogosp-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    // grossDebt = 'Partes Relacionadas' (circulante 0,166667 + não circulante 53,426590).
    // Ver comentario de cabecera sobre la alternativa 'Obrigações com Arrendamento'
    // (11,590233 M BRL, no incluida). cash = 'Caixa e Equivalentes de Caixa'.
    grossDebt:53.593257, cash:0.013588,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receitas Financeiras' (0,002002) - 'Despesas Financeiras' (0,078496),
    // Nota 28.
    netInterest:-0.076494, tax:0,
    // officialTotalRevenue = suma revenueLines (46,032661 M BRL, incluye Nota 21 neta de
    // deduções + Nota 27). officialTotalExpenses = suma expenseLines (49,500044 M BRL,
    // Notas 22+23+24+25+26). officialPAT = 'LUCRO (PREJUÍZO) DO EXERCÍCIO' impreso
    // (-3,543877 M BRL / R$-3.543.877), EXACTO contra revenue-expenses+netInterest.
    officialTotalRevenue:46.032661, officialTotalExpenses:49.500044, officialPAT:-3.543877,
  },
};

const botafogospBrPresupuestoOverlayByYear = {};

const botafogospBrPasesData = [];
const botafogospBrResultadosData = {};
const botafogospBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['botafogosp-br'] = {
  revenueLinesByYear: botafogospBrRevenueLinesByYear, expenseLinesByYear: botafogospBrExpenseLinesByYear,
  fiscalYearMeta: botafogospBrFiscalYearMeta, pasesData: botafogospBrPasesData,
  resultadosData: botafogospBrResultadosData, titulosData: botafogospBrTitulosData,
  presupuestoOverlayByYear: botafogospBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'botafogosp-br-demonstracoes-2024': {
    id:'botafogosp-br-demonstracoes-2024', clubId:'botafogosp-br',
    title:'Demonstrações Contábeis (Auditadas) para os Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://botafogofutebolsa.com.br/',
    note:'PDF oficial (texto nativo), descargado del portal institucional de la SAF (botafogofutebolsa.com.br). DRE auditada con 8 notas de desglose (21-28) — ver comentario de cabecera de data/botafogosp-br-data.js. Prejuízo real de R$3.543.877 (2024), después de un lucro de R$906.642 en 2023. Patrimônio líquido negativo (R$-27.924.832 al cierre 2024). Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Botafogo-SP/demonstracoes-contabeis-2023-2024.md. El mismo archivo fuente también cubre 2019/2020 y 2022/2023 (NO cargados en esta sesión, ver nota de alcance de cabecera).',
  },
});

memberCountByClub['botafogosp-br'] = null; // no se encontró cifra de sócios/associados en el documento
