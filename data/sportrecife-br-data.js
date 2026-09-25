// ============================================================================
// data/sportrecife-br-data.js — Sport Club do Recife, Recife, Pernambuco, Brasil. Associação sem
// fins lucrativos (mismo tipo de entidad que Flamengo/Palmeiras, NO es SAF), fundada em 13 de maio
// de 1905. clubId 'sportrecife-br' (CON GUIÓN, bracket notation en clubs{}/CLUB_GENERIC_DATA/
// gestionesByClub/memberCountByClub, mismo criterio que el resto de clubes brasileños).
//
// 1 ejercicio cargado: 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12, confirmado por la
// carátula "Balanço patrimonial ... Exercícios findos em 2025 e 2024" y "Exercício Social encerrado
// em 31 de dezembro de 2025"). Fuente: "Demonstrações Contábeis em 31 de Dezembro de 2025", PDF
// oficial (texto nativo) descargado de sportrecife.com.br/portal-transparencia/
// demonstracoes-financeiras/ (ver fuentes/Brasil/Sport Recife.md — el portal está detrás de
// Cloudflare, requiere browser real, ya resuelto en la sesión de sourcing). El documento trae
// columna comparativa 2024 completa, pero NO se cargó ese año acá: es la columna comparativa DENTRO
// del balance 2025, no el balance 2024 findo em 31/12/2024 propio del club (club-data-mapping
// sección 6.5, "usá siempre la columna año corriente del balance de ESE ejercicio") — el archivo de
// club tiene además 6 documentos más descargados (2019-2024) que quedan como to-do de una sesión
// futura si se quiere completar la serie histórica. Transcripción completa en
// Clubes/Brasil/Sport Recife/demonstracoes-financeiras-2025.md (2492 líneas).
//
// AUDITORÍA: BDO RCS Auditores Associados Ltda. emitió ABSTENÇÃO DE OPINIÃO (no una opinião limpia
// ni con ressalva: el auditor declara explícitamente que NO le fue posible obter evidência de
// auditoria apropriada e suficiente, y por lo tanto no expressa opinião alguna) por una lista larga
// de limitações de escopo simultáneas: ausência de confirmações externas (circularização) de contas
// correntes/aplicações financeiras/empréstimos; falta de evidência sobre créditos a receber
// (R$31.107 mil), contas a pagar (R$118.769 mil), obrigações sociais e trabalhistas (R$33.472 mil) y
// receitas a reconhecer/antecipadas (R$35.594 mil); ausência de confirmações de partes relacionadas
// (R$26.786 mil); ausência de revisão da vida útil do imobilizado; ausência de extratos de depósitos
// judiciais (R$6.169 mil); reapresentação de saldos de exercícios anteriores sem a retificação
// completa dos comparativos exigida por el CPC 23; y una limitação específica sobre el tratamento
// contábil de la recompra parcial de participação em direitos de transmissão junto a la Liga Forte
// União (LFU, R$74.625 mil intangível), bajo consulta técnica sin resolver ante el CFC — el MISMO
// asunto LFU que motivó la ressalva de Fluminense 2025 (ver data/fluminense-br-data.js), lo que
// sugiere una situación sectorial de 2025 y no algo específico de este club. Esta abstenção de
// opinião es la salvedad más fuerte encontrada hasta ahora entre los clubes brasileños cargados
// (peor que cualquier "ressalva" puntual) — documentada en el `note` de sources{} abajo, ya que
// `sourceCaveats()` (data/sources-view.js) no tiene un campo dedicado para tipo de opinião de
// auditoría, solo deriva salvedades de `fxSource`/`officialPAT`/`grossDebt`/`cash` nulos.
//
// CONTEXTO INSTITUCIONAL: el Clube está "Em Recuperação Judicial" (concurso de acreedores bajo la
// Lei nº 11.101/2005), con Plano de Recuperação Judicial homologado el 28/10/2025 con aprobación
// mayoritaria en las 3 clases de credores. Déficit do exercício de R$112.497 mil, 6,8 veces mayor
// que el de 2024 (R$16.587 mil), a pesar de que la receita bruta más que se duplicó (R$263,5 mi vs.
// R$139,9 mi) — el propio Relatório da Administração lo describe como "gestão que não conseguiu
// converter crescimento operacional em equilíbrio financeiro". Primer patrimônio líquido negativo de
// su historia reciente al cierre (-R$21.707 mil, vs. +R$82.307 mil en 2024), y caja reducida a
// R$2.388 mil (-93% interanual). Rebaixamento de la Série A para la Série B del Campeonato Brasileiro
// al cierre de la temporada esportiva 2025 (61 partidos: 14V/16E/31D, 4 técnicos distintos).
//
// CAMBIO DE PRESIDENCIA DENTRO DEL EJERCICIO: el então Presidente presentó renúncia el 12/12/2025;
// eleição suplementar el 15/12/2025; posse de la nueva Diretoria (Matheus Souto Maior) el
// 19/12/2025 — 12 días antes del cierre del ejercicio. La gestión SALIENTE gobernó prácticamente
// todo el ejercicio 2025 (11 meses y medio de 12), la gestión ENTRANTE menos de 2 semanas. Ninguna
// de las 2 puede atribuirse con confianza como "la" gestión de este ejercicio sin distorsionar el
// peso real de cada una — se dejó `gestionId: null` y NO se creó `gestionesByClub['sportrecife-br']`
// (club-data-mapping sección 7: "mejor un año sin gestión asignada que una gestión inventada"). El
// documento tampoco nombra al então Presidente (solo "o então Presidente", sin nombre propio en
// ningún pasaje transcripto), lo que hubiera hecho la atribución aún más incierta.
//
// Escala: valores originales "(Em milhares de reais)" en el Balanço/DRE/Notas — acá en MILLONES de
// BRL nativos. OJO, no es un simple "reinterpretar el '.' como decimal" a ciegas: un valor impreso
// SIN separador de miles (ej. "567", 3 dígitos) sigue siendo miles de reais y hay que dividirlo por
// 1.000 igual (567 mil = 0,567 M), a diferencia de un valor con "." (ej. "6.609" = 6.609 M, el punto
// YA lo deja en la posición correcta). Verificado: la línea "Outras receitas" de la Nota 18 se cargó
// como 0.567 (no 567) — con 567 en vez de 0,567 la suma de revenueLines no da 174,186 M BRL.
//
// ESTRUCTURA REAL DEL DOCUMENTO: DRE de un solo cuerpo (no segmentada por segmento/atividade, a
// diferencia de Palmeiras):
//   Receita operacional líquida (Nota 18 en el cuerpo de notas, referenciada como Nota "19" en el
//   propio DRE — el documento tiene un desfasaje de numeración de notas de 1 entre el DRE y el
//   cuerpo de notas explicativas para TODAS las notas 18-22, confirmado comparando cada título; se
//   usó el CONTENIDO de cada nota, no su número, para no arrastrar el desfasaje)
//   − Custos operacionais (Nota 19 del cuerpo / "20" en el DRE)
//   = Superávit (déficit) bruto
//   − Despesas gerais e administrativas (Nota 20 del cuerpo / "21" en el DRE)
//   − Outras receitas (despesas) (Nota 21 del cuerpo / "22" en el DRE)
//   = Superávit (déficit) operacional antes do resultado financeiro
//   + Receitas financeiras − Despesas financeiras (Nota 22 del cuerpo / "23" en el DRE)
//   = (Déficit) do exercício
//
// Categorización (Ingresos), Nota 18 "Receita operacional líquida":
// - 'Direitos televisivos e premiações' -> broadcasting: el propio texto de la nota aclara que esta
//   línea mezcla "transmissão de jogos em TV" Y "premiação por desempenho esportivo" SIN desglosar
//   en 2 líneas (a diferencia de Flamengo, que sí separa "Direitos de transmissão" de "Participação,
//   exposição e performance"). Se cargó todo como broadcasting (componente probablemente dominante
//   para un club brasileño) por ser la mejor aproximación disponible — esto deja la fila "Premios
//   por competencias" de Formato Simplificado en $0 para este club/año pese a haber algo de
//   competition_bonus real mezclado adentro; es una limitación de la fuente, no un error de carga,
//   documentado acá para que una sesión futura no lo lea como un bucket enterrado por error (ver
//   onboarding skill sección 8 sobre buckets en $0 sospechosos).
// - 'Comerciais, marketing e publicidade' -> sponsorship_commercial.
// - 'Receitas em jogos' -> matchday_competition (nota: "majoritariamente com venda de ingressos,
//   alimentação e bebida e estacionamento" — recaudación de partido, no uso del estadio fuera de él).
// - 'Contribuições de associados' -> member_dues.
// - 'Patrimoniais' -> other_income: la propia nota la describe junto a "outras explorações
//   comerciais do complexo do clube social", SIN nombrar el estádio explícitamente -> criterio
//   conservador de la sección 1 de club-data-mapping, no entra a stadium_other sin esa mención.
// - 'Outras receitas' -> other_income.
// - 'Cessão de direitos contratuais' -> player_sales: la nota combina "negociação de direitos
//   federativos e econômicos de atletas profissionais" (dominante, listado primero) +
//   "empréstimos de atletas" + "prêmios de solidariedade através do mecanismo de compensação na
//   formação de atletas" en una sola línea sin desglose (a diferencia de Flamengo, que sí separa el
//   mecanismo de solidariedade como youth_football). Se cargó todo como player_sales por no poder
//   separar el componente de solidaridad — mismo criterio de "mejor aproximación disponible, no una
//   certeza" que el resto de este skill.
// - 'Deduções de receita (i)' -> other_income (línea negativa, contra-revenue: retención INSS
//   Patronal del 5% sobre bilheteria/patrocínios/licenciamento/publicidade/transmissão — mismo
//   criterio que las deducciones fiscales de Botafogo/Flamengo).
//
// Categorización (Gastos):
// - Nota 19 "Custos operacionais": 'Gastos com pessoal do futebol' -> wages_squad. 'Competição e
//   viagens' -> match_organisation_expense. 'Outros custos' -> other_expenses. 'Despesas com
//   formação de atleta e amortização de despesas de anos anteriores' -> youth_other_sports_expense
//   (formación de atletas es el concepto dominante de la línea, pese a venir mezclado con
//   "amortização de despesas de anos anteriores" sin más desglose).
// - Nota 20 "Despesas gerais e administrativas": 'Serviços de terceiros', 'Gastos com pessoal'
//   (administrativo, distinto del "Gastos com pessoal do futebol" de la Nota 19), 'Despesas gerais',
//   'Despesas com alimentação', 'Despesas com manutenção', 'Despesas c/alugueis' (genérico, sin
//   nombrar el estádio -> admin_general_expense, no stadium_other) y 'Despesas tributárias'
//   (impuestos -> admin_general_expense, club-data-mapping sección 17) -> TODAS admin_general_expense.
//   'Depreciação' -> depreciation. ('Repasse financeiro de direito econômico' fue 0 en 2025, solo
//   tuvo valor en 2024 -R$22.177 mil, no aplica a este ejercicio.)
// - Nota 21 "Outras (Despesas)/Receitas Operacionais": se cargó como UNA sola línea combinada
//   (-35.739, el valor que imprime el propio DRE para esta nota), categorizada `other_expenses`
//   (CORREGIDO en la integración de esta sesión: el agente que cargó este club la había puesto
//   como `exceptional_items`, pero esta línea es parte del "Superávit/déficit operacional ANTES
//   do resultado financeiro" que imprime el propio DRE — el mismo nivel que Custos/Despesas
//   administrativas, no un ítem extraordinario por debajo del EBITDA. El motor
//   [computeYearGeneric(), js/finanzas-calc.js] suma `exceptional_items` DESPUÉS de `expenses`
//   [operatingProfit = ebitda + exceptionalItems + nonCash], así que con esa categoría el total
//   calculado quedaba R$35.739 mil por debajo de `officialTotalExpenses` — lo agarró
//   `node tools/audit.js` como P0 [no-cierra]) —
//   NO se cargaron los 3 sub-ítems de la nota por separado (Liga Forte União -24.993, Despesas com
//   provisão para contingências -97.459, Outras receitas/(despesas) +75.756) pese a estar impresos,
//   por la razón siguiente:
//
//   DISCREPANCIA ENCONTRADA (documentada, no resuelta): los 3 sub-ítems de la Nota 21 suman
//   EXACTO -46.696 (−24.993−97.459+75.756), pero el propio DRE (pág. 18) imprime -35.739 para esta
//   misma línea "Outras receitas (despesas)" — una diferencia de R$10.957 mil (~6,3% de la propia
//   Nota 21) que NO se explica por redondeo. El DRE es internamente consistente con SU PROPIO
//   -35.739 (Receita 174.186 − Custos 167.374 = 6.812 bruto; 6.812 − 69.629 − 35.739 = -98.556
//   "Superávit/déficit operacional antes do resultado financeiro", impreso exacto; -98.556 +
//   netInterest -13.941 = -112.497 "Déficit do exercício", impreso EXACTO) — así que se usó el
//   -35.739 del DRE (la cifra que efectivamente reconcilia contra el resultado auditado) en vez del
//   -46.696 de la Nota 21 (que, de usarse, haría que revenueLines+expenseLines+netInterest computen
//   un déficit de -123.454, R$10.957 mil MÁS negativo que el déficit real impreso). No se encontró
//   en el documento qué figura de la Nota 21 está mal (candidato: "Despesas com provisão para
//   contingências" podría ser -86.502 en vez de -97.459, lo que sí cerraría exacto, pero es una
//   hipótesis sin confirmar, no un número que aparezca impreso en ningún lado) — QUEDA COMO PREGUNTA
//   GENUINA para Admin/dudas-por-club.md. La nota (i) al lado de "Outras receitas/(despesas)" tampoco
//   tiene su texto explicativo en la transcripción (puede ser un footnote real faltante en el PDF
//   fuente, no un error de transcripción — no se confirmó cuál de las 2 causas es).
//
// netInterest = 'Receitas financeiras' (8.558) − 'Despesas financeiras' (22.499), Nota 22 (cuerpo) /
// "23" (DRE) = -13.941, NUNCA como línea (club-data-mapping sección 2). tax = 0 (associação sem fins
// lucrativos, sin línea de imposto de renda en la DRE). profitOnPlayerSales = assetSales = 0 (no se
// netea nada aparte de lo ya bruto en revenueLines/expenseLines, mismo criterio que Flamengo/
// Palmeiras: club-data-mapping sección 3).
//
// VERIFICACIÓN (a mano, antes de cargar — TODO cierra EXACTO, cero diferencia de redondeo):
// revenueLines suman EXACTO 174.186 M BRL = "Receita operacional líquida" impreso
// (88.708+47.335+19.682+16.626+3.319+0.567+6.609−8.660). expenseLines suman EXACTO -272.742 M BRL
// (Custos operacionais -167.374 [Nota 19: -116.898-14.094-1.447-34.935] + Despesas gerais e
// administrativas -69.629 [Nota 20: -23.234-15.648-7.826-8.659-3.884-2.985-1.525-5.868] + Outras
// receitas (despesas) -35.739 [ver discrepancia documentada arriba]). Revenue + Expenses = 174.186 −
// 272.742 = -98.556 = "Superávit (déficit) operacional antes do resultado financeiro" impreso,
// EXACTO. + netInterest (-13.941) = -112.497 = "(Déficit) do exercício" impreso, EXACTO (déficit
// real, coincide con el "prejuízo de R$ 112,4 milhões" del Relatório da Administração).
//
// grossDebt = 'Empréstimos e Financiamentos' (0 en 2025, la línea imprime un guión — el club canceló
// este saldo durante el ejercicio; era R$7 mil en 2024) + 'Empréstimos com terceiros e Mútuos'
// (circulante 17.661 + não circulante 9.125 = 26.786), las 2 líneas de deuda financiera angostas que
// el propio Balanço Patrimonial separa de Fornecedores/Obrigações tributárias/Provisão para
// contingências/Receitas antecipadas (mismo criterio "línea angosta" que Boca/Vélez/Palmeiras,
// club-data-mapping sección 14) = 26.786 M BRL. cash = 'Caixa e equivalentes de caixa' = 2.388 M BRL
// (coincide con el "Caixa ao Final do exercício R$ 2,3 mi" del Relatório da Administração).
//
// FX: el documento no declara un tipo de cambio de cierre propio en ningún Anexo dedicado (solo
// política contable genérica sobre "taxa de câmbio da operação" para partidas en moeda estrangeira,
// sin un valor numérico impreso) — PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2025,
// referenciado a FX_CLOSE (entrada 'BRL@2025-12-31', ya existía antes de esta sesión: R$5,5024, la
// misma que usan Palmeiras/Flamengo/Cruzeiro/Ceará 2025 — no se tocó data/currency-map.js).
//
// memberCountByClub: null — no se encontró una cifra total de sócios/associados en el documento (sí
// hay ingreso de "Contribuições de associados", pero ninguna cantidad total de sócios impresa).
//
// LIGA/CATEGORÍA: el club compitió el Campeonato Brasileiro Série A durante TODO el ejercicio 2025
// (el rebaixamento es el RESULTADO al cierre de la temporada, no la categoría en la que jugó), y
// desciende a la Série B recién para la temporada 2026 — no se tocó data/club-leagues/ (fuera de
// alcance de esta sesión), documentado en el reporte de handback para quien integre la liga.
// ============================================================================

const sportrecifeBrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Direitos televisivos e premiações', normalizedCategory:'broadcasting', amountNative:88.708, disclosureLevel:'detailed' },
    { rawLabel:'Comerciais, marketing e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:47.335, disclosureLevel:'detailed' },
    { rawLabel:'Receitas em jogos', normalizedCategory:'matchday_competition', amountNative:19.682, disclosureLevel:'detailed' },
    { rawLabel:'Contribuições de associados', normalizedCategory:'member_dues', amountNative:16.626, disclosureLevel:'detailed' },
    { rawLabel:'Patrimoniais', normalizedCategory:'other_income', amountNative:3.319, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.567, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de direitos contratuais (negociação de atletas, empréstimos e solidariedade)', normalizedCategory:'player_sales', amountNative:6.609, disclosureLevel:'detailed' },
    { rawLabel:'Deduções de receita (INSS Patronal, 5%)', normalizedCategory:'other_income', amountNative:-8.660, disclosureLevel:'detailed' },
  ],
};

const sportrecifeBrExpenseLinesByYear = {
  2025: [
    // Custos operacionais (Nota 19 do corpo de notas / "20" no DRE)
    { rawLabel:'Gastos com pessoal do futebol', normalizedCategory:'wages_squad', amountNative:-116.898, disclosureLevel:'detailed' },
    { rawLabel:'Competição e viagens', normalizedCategory:'match_organisation_expense', amountNative:-14.094, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos', normalizedCategory:'other_expenses', amountNative:-1.447, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com formação de atleta e amortização de despesas de anos anteriores', normalizedCategory:'youth_other_sports_expense', amountNative:-34.935, disclosureLevel:'detailed' },
    // Despesas gerais e administrativas (Nota 20 do corpo de notas / "21" no DRE)
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-23.234, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com pessoal (administrativo)', normalizedCategory:'admin_general_expense', amountNative:-15.648, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-7.826, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais', normalizedCategory:'admin_general_expense', amountNative:-8.659, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com alimentação', normalizedCategory:'admin_general_expense', amountNative:-3.884, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com manutenção', normalizedCategory:'admin_general_expense', amountNative:-2.985, disclosureLevel:'detailed' },
    { rawLabel:'Despesas c/alugueis', normalizedCategory:'admin_general_expense', amountNative:-1.525, disclosureLevel:'detailed' },
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-5.868, disclosureLevel:'detailed' },
    // Outras (Despesas)/Receitas Operacionais (Nota 21 do corpo de notas / "22" no DRE) — línea
    // combinada, valor tal cual lo imprime el DRE (ver discrepancia documentada en el comentario de
    // cabecera contra el desglose de la propia Nota 21, que suma -46.696 en vez de -35.739).
    { rawLabel:'Outras (despesas) receitas operacionais líquidas (Liga Forte União, provisão para contingências e outras)', normalizedCategory:'other_expenses', amountNative:-35.739, disclosureLevel:'detailed' },
  ],
};

const sportrecifeBrFiscalYearMeta = {
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'sportrecife-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:null, // ver comentario de cabecera: cambio de presidencia a 12 días del cierre, atribución ambigua a propósito
    // grossDebt = 'Empréstimos e Financiamentos' (0) + 'Empréstimos com terceiros e Mútuos'
    // (circulante 17.661 + não circulante 9.125). cash = 'Caixa e equivalentes de caixa'.
    grossDebt:26.786, cash:2.388,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receitas financeiras' (8.558) - 'Despesas financeiras' (22.499), Nota 22 do
    // corpo de notas / "23" no DRE.
    netInterest:-13.941, tax:0,
    // officialTotalRevenue = suma de revenueLines (174.186 M BRL) = 'Receita operacional líquida'
    // impreso, EXACTO. officialTotalExpenses = suma de expenseLines (272.742 M BRL = Custos
    // operacionais 167.374 + Despesas gerais e administrativas 69.629 + Outras despesas
    // operacionais 35.739, esta última el valor impreso do DRE, não o desglose da própria Nota 21
    // — ver comentario de cabecera). officialPAT = '(Déficit) do exercício' impreso (-112.497 M BRL,
    // déficit real, 6,8x maior que 2024) — revenue-expenses+netInterest da EXACTO -112.497, sem
    // diferença de redondeo.
    officialTotalRevenue:174.186, officialTotalExpenses:272.742, officialPAT:-112.497,
  },
};

const sportrecifeBrPresupuestoOverlayByYear = {};

const sportrecifeBrPasesData = [];
const sportrecifeBrResultadosData = {};
const sportrecifeBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sportrecife-br'] = {
  revenueLinesByYear: sportrecifeBrRevenueLinesByYear, expenseLinesByYear: sportrecifeBrExpenseLinesByYear,
  fiscalYearMeta: sportrecifeBrFiscalYearMeta, pasesData: sportrecifeBrPasesData,
  resultadosData: sportrecifeBrResultadosData, titulosData: sportrecifeBrTitulosData,
  presupuestoOverlayByYear: sportrecifeBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sportrecife-br-demonstracoes-2025': {
    id:'sportrecife-br-demonstracoes-2025', clubId:'sportrecife-br',
    title:'Demonstrações Contábeis, Exercícios Findos em 31 de Dezembro de 2025 e de 2024, com Relatório do Auditor Independente',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://sportrecife.com.br/portal-transparencia/demonstracoes-financeiras/',
    note:'PDF oficial (texto nativo), descargado del Portal de Transparência oficial del Clube (ver fuentes/Brasil/Sport Recife.md). Auditado por BDO RCS Auditores Associados Ltda., que emitió ABSTENÇÃO DE OPINIÃO (no una opinião limpia ni con ressalva: el auditor declara explícitamente que não expressa opinião) por múltiples limitações de escopo simultáneas: ausência de confirmações externas de contas correntes/aplicações/empréstimos; falta de evidência sobre créditos a receber (R$31.107 mil), contas a pagar (R$118.769 mil), obrigações sociais e trabalhistas (R$33.472 mil) e receitas a reconhecer/antecipadas (R$35.594 mil); ausência de confirmações de partes relacionadas (R$26.786 mil); ausência de revisão da vida útil do imobilizado; ausência de extratos de depósitos judiciais (R$6.169 mil); reapresentação de saldos de exercícios anteriores sem retificação completa dos comparativos (CPC 23); y una limitación específica sobre el tratamento contábil de la recompra parcial de participação em direitos de transmissão junto a la Liga Forte União (R$74.625 mil), bajo consulta técnica sin resolver ante el CFC — el mismo asunto LFU que motivó la ressalva de Fluminense 2025 (ver data/fluminense-br-data.js). El Clube está "Em Recuperação Judicial" (Lei nº 11.101/2005), con Plano homologado el 28/10/2025. Déficit do exercício de R$112.497 mil (6,8x mayor que 2024), primer patrimônio líquido negativo de su historia reciente (-R$21.707 mil) y caja reducida a R$2.388 mil (-93% interanual). Cambio de presidencia dentro del ejercicio: renuncia del então Presidente el 12/12/2025, eleição suplementar el 15/12/2025, posse de Matheus Souto Maior el 19/12/2025 (12 días antes del cierre) — no se cargó gestionesByClub por atribución ambigua, ver comentario de cabecera de data/sportrecife-br-data.js. Rebaixamento de la Série A para la Série B del Campeonato Brasileiro al cierre de la temporada esportiva 2025. Convertido a USD con PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2025 (R$5,5024) — el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Sport Recife/demonstracoes-financeiras-2025.md.',
  },
});

memberCountByClub['sportrecife-br'] = null; // no se encontró una cifra total de sócios/associados en el documento
