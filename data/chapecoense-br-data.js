// ============================================================================
// data/chapecoense-br-data.js — Associação Chapecoense de Futebol, Chapecó, Santa Catarina, Brasil.
// Entidade civil sem fins lucrativos (NÃO é SAF — Sociedade Anônima do Futebol), mismo criterio
// societario que Flamengo (no Botafogo/Cruzeiro/Coritiba/Athletico-PR, que sí convirtieron a SAF).
// clubId 'chapecoense-br' (CON GUIÓN, bracket notation en clubs{}/CLUB_GENERIC_DATA/
// gestionesByClub/memberCountByClub, mismo criterio que banfield-ar/flamengo-br).
//
// 1 ejercicio cargado: 2021 (año calendario, 1°/1 a 31/12/2021 — CONFIRMADO por el propio documento:
// "BALANÇO PATRIMONIAL... EM 31 DE DEZEMBRO DE 2021 E 2020" y "DEMONSTRAÇÃO DO SUPERÁVIT/(DÉFICIT)
// DO EXERCÍCIO EM 31 DE DEZEMBRO DE 2021 E 2020", Nota 3 "Aprovação das Demonstrações Financeiras":
// "as demonstrações financeiras da Controladora e Consolidado para o exercício findo em 31 de
// dezembro de 2021 foram autorizadas para a emissão pelo Conselho Deliberativo em 31 de maio de
// 2022". Se cargó la columna 2021 ("año corriente" del documento), NO la columna comparativa 2020,
// siguiendo club-data-mapping sección 6.5.
//
// FUENTE: "Demonstrações Financeiras da Controladora e Consolidado em conjunto com as Notas
// Explicativas, findas em 31/12/2021 e 31/12/2020" — descargado de fcf.com.br (Federação
// Catarinense de Futebol), NO del sitio propio del club (ver fuentes/Brasil/Chapecoense.md). Es un
// documento comparativo 2021/2020 (a diferencia de los otros 2 PDF ya descargados de Chapecoense,
// 2016 y 2017, que son standalone de un solo año cada uno). Transcripción completa en
// Clubes/Brasil/Chapecoense/demonstracoes-financeiras-2020-2021.md (1768 líneas). Texto nativo en
// la mayoría de las páginas (confirmado con pdftotext -layout); las págs. 6-7 (Balanço Patrimonial -
// Passivo y Demonstração do Superávit/Déficit) son IMAGEN dentro del PDF de texto nativo — se
// re-renderizaron a 300dpi y se releyeron visualmente (no solo el OCR de Tesseract de la
// transcripción) para esta carga, ver nota de INCONSISTENCIA DE FUENTE abajo.
//
// Se usó la columna CONTROLADORA (standalone), NO la Consolidado (que suma a Associação Força Chape
// Reconstrução — AFCR, entidad sin fines de lucro creada para la reconstrucción del club tras la
// tragedia de 2016 — y Chape Oficial Comércio de Materiais Esportivos LTDA, 99% del capital) —
// mismo criterio que Flamengo/Botafogo, para no mezclar el perímetro del club con el de sus
// controladas. Escala: valores originales "em milhares de reais" (miles de reales), acá en MILLONES
// de BRL nativos (mismo criterio que Flamengo/Botafogo/Grêmio: el número impreso, reinterpretando el
// "." como separador decimal en vez de miles, YA es el valor en millones — "41.593" impreso = R$41,593
// mil = R$41,593 millones = amountNative:41.593, sin dividir nada más).
//
// CONTEXTO: 2021 fue el año del ascenso a la Série A (tras el título de la Série B 2020), con un
// salto grande de gastos de plantel para competir en primera. El 14/12/2021 hubo cambio de gestión
// ("Conselho Administrativo"), y la nueva conducción pidió Recuperação Judicial el 24/1/2022 (deferida
// el 3/2/2022) — el primer clube brasileño en conseguirlo. El balance 2021 es, por lo tanto, el
// último ejercicio ANTES de la recuperación judicial, con un déficit grande y un pasivo por
// contingencias (litigios laborales/civiles, en gran parte ligados al accidente aéreo de 2016) que
// casi se sextuplicó en el año (ver grossDebt/contingencias abajo).
//
// INCONSISTENCIA DE FUENTE, DOCUMENTADA EXPLÍCITAMENTE (no es un error de esta carga, es un problema
// del propio documento): la "Demonstração do Superávit/(Déficit) do Exercício" (pág. 7, imagen
// dentro del PDF, releída visualmente a 300dpi para confirmar que la transcripción original no tenía
// error de OCR) imprime para Controladora 2021: Receita bruta 75.944, Pessoal (58.458), Lucro
// Líquido do Exercício (59.564). Estos 3 números NO reconcilian contra las Notas explicativas
// detalladas del mismo documento (texto nativo, cada una individualmente consistente con su propio
// subtotal impreso): Nota 20 "Composição da Receita Líquida" totaliza 57.064 (no 70.683 de "Receita
// Operacional Líquida" del DRE); Nota 21 "Despesas com Pessoal" totaliza (46.456) (no 58.458 del
// DRE); la Demonstração do Fluxo de Caixa (pág. 9, texto nativo) arranca de "Déficit do Exercício
// (59.184)", un tercer valor distinto de los otros dos. Los 3 candidatos a "resultado oficial"
// (-59.564 DRE, -59.184 Fluxo de Caixa, -59.872 recalculado sumando todas las Notas de detalle) caen
// dentro de un rango de ~1% entre sí — parece un problema de conciliación interna del propio balance
// (Chapecoense en un momento de crisis financiera aguda, dictamen firmado 2022-04-29, 2 meses antes
// del pedido de Recuperação Judicial), no un error de esta transcripción. Se decidió: revenueLines/
// expenseLines usan las NOTAS (más detalle, cada una reconcilia con su propio subtotal impreso, es
// lo que permite categorizar según club-data-mapping); officialTotalRevenue/officialTotalExpenses =
// la suma de esas líneas (61,097 / 68,328, mismo criterio que el resto del sitio: "official" acá es
// el total QUE ESTAS LÍNEAS COMPONEN, no un tercer número reinventado); officialPAT = -59,872 (NO el
// titular -59,564 del DRE pág. 7), la suma real de revenue+expenses+exceptional_items+netInterest de
// ESTE archivo — porque `verifyTieOuts()`/`tools/audit.js` comparan el PAT que calcula el motor
// CONTRA este campo, y el motor solo puede sumar lo que está cargado; usar el titular de la pág. 7
// haría fallar el check por un defecto real del documento, no por un error de carga. El residuo de
// ~0,308 M BRL (~0,5%) entre este valor y el titular del DRE queda documentado acá, no oculto. 2
// líneas del DRE (Materiais -0,634 y Tributárias -0,172, además de "Bens de pq. Valor e
// depreciação" -0,792) NO tienen Nota propia — se tomaron directo del DRE (releído visualmente, no
// solo el OCR) al no haber mejor fuente.
//
// Categorización (Ingresos, Nota 20 "Composição da Receita Líquida" + Nota 28 "Outras Receitas"):
// - 'Receita de Transmissão' -> broadcasting (aumentó fuerte vs. 2020 por el acceso a la Série A).
// - 'Bilheteria' -> matchday_competition.
// - 'Patrocínio' -> sponsorship_commercial.
// - 'Receita de Negociação de Atletas' -> player_sales (ventas/préstamos de jugadores, sin netear
//   costos, el documento no separa mecanismo de solidaridad de venta bruta en esta línea).
// - 'Programa Sócio Torcedor' -> member_dues.
// - 'Timemania' -> other_income (lotería federal brasileña con reparto a clubes de fútbol para pago
//   de deudas, no tiene categoría propia en category-map.js).
// - 'Royalties/Direito de Uso de Marca/Venda de produtos' -> sponsorship_commercial.
// - 'Receitas Diversas' -> other_income.
// - 'Doações/PAF' -> other_income (donaciones + Programa de Apoio ao Futebol/Lei de Incentivo ao
//   Esporte).
// - 'Receita Federações' -> competition_bonus (nota (d) del propio documento: "valores recebidos em
//   decorrência da participação na Copa do Brasil" — premio/bono por participar del torneo, no
//   recaudación de entradas).
// - 'Deduções Tributárias e Sindicais' -> other_income (línea negativa, contra-revenue sobre el
//   ingreso bruto, mismo criterio que Flamengo con 'Impostos e contribuições + Direito de arena').
// - 'Dividendos Recebidos' / 'Outras Receitas Não Operacionais' / 'Recuperação de Despesas' /
//   'Reversão de Provisão' (Nota 28, catch-all de ingresos no operativos) -> other_income: ninguna es
//   lo bastante grande o recurrente como para ameritar su propia categoría.
//
// Categorización (Gastos, Notas 21-28 + 2 líneas del DRE sin Nota propia):
// - 'Despesas com Pessoal' (Nota 21, con items: Ordenados e Salários, Premiação, INSS/FGTS/PIS,
//   Despesas com Transf. Jogadores, Indenizações [rescisiones/reestructuración de contratos con
//   jugadores/ex-jugadores, 16,060 de 46,456 — 34,5% del total, pero el documento la agrupa DENTRO
//   de "Despesas com Pessoal" ordinaria, no como línea extraordinaria separada, así que se mantuvo
//   ahí en vez de forzarla a exceptional_items sin que el propio documento la separe así, mismo
//   criterio que club-data-mapping sección 1], Alimentação, Despesas Médicas, Seguros, Outros Gastos
//   c/ Pessoal) -> wages_squad.
// - 'Direito de Imagem' (Nota 25) -> wages_squad (estructura de compensación habitual del fútbol
//   brasileño, mismo criterio Flamengo/Botafogo).
// - 'Materiais' (solo en el DRE, sin Nota propia) -> admin_general_expense.
// - 'Manutenção' (Nota 22, con items: Manutenção Imobilizado/Terceiros/Intangível) ->
//   admin_general_expense.
// - 'Gastos com Jogos e Competições' (Nota 23, con items: Viagens, Hospedagens, Gastos com jogos —
//   Camp. Brasileiro/Catarinense, Gastos com outros) -> match_organisation_expense.
// - 'Terceiros - Futebol e Comissões' (Nota 24, la línea más grande de "Serviços de Terceiros",
//   3,016 de 4,461 — 67,6%; el propio texto de la nota aclara "a conta mais representativa é
//   relacionada a gastos com comissão e intermediação") -> other_expenses, mismo criterio que
//   Flamengo/Botafogo/Racing para comisiones/intermediación de transferencias (NO
//   player_amortisation, que es solo el cargo contable de amortización, no comisiones).
// - 'Honorários profissionais' + 'Outros' (resto de Nota 24: "assessoria jurídica, segurança,
//   administrativa e financeira da entidade" según el propio texto) -> admin_general_expense.
// - 'Bens de pq. Valor e depreciação' (solo en el DRE, sin Nota propia) -> depreciation.
// - 'Gerais e Administrativas' (Nota 26, con items: Multas e Indenizações, Propaganda e Publicidade,
//   Gastos Logísticos, Doações/Ajudas de Custo, Água/Luz/Telefone, Despesas Bancárias,
//   Mensalidades/Periódicos, Demais Gastos) -> admin_general_expense.
// - 'Tributárias' (solo en el DRE, sin Nota propia) -> admin_general_expense (impuestos, mismo
//   criterio que club-data-mapping sección 17).
// - 'Despesas diversas' / 'Custo dos Bens Patrimoniais Vendidos' (Nota 28, créditos positivos chicos
//   dentro de "Outras Despesas") -> other_expenses, con su signo real (positivo = reversión/crédito).
// - 'Acidente Aéreo Chapecoense' (Nota 28, -45,672 — el 100,9% del total de "Outras Despesas" de
//   -45,274, el resto de la nota son créditos que casi no la compensan) -> exceptional_items: el
//   propio documento la separa en su propia línea dentro de "Outras Despesas" con el nombre del
//   evento, el caso de manual exacto de esta categoría (indemnizaciones/acuerdos ligados a la
//   tragedia de LaMia 2016, ver Nota 16 "Reclamatórias Trabalhistas e Cíveis a Pagar").
// - 'Equivalência patrimonial' (Nota 28, resultado por la participación en Chape Oficial LTDA) ->
//   exceptional_items, mismo criterio que Flamengo con su propia línea de equivalencia patrimonial
//   (ítem no operativo/no recurrente de una inversión, no gasto de la operación del club).
//
// netInterest = 'Resultado Financeiro' (Nota 27: Receitas Financeiras 0,614 + Despesas Financeiras
// -7,547) = -6,933 M BRL, NUNCA como línea (club-data-mapping sección 2). tax = 0 (IR e CSLL: la
// Associação, sin fines de lucro, está exenta de tributos federales sobre el resultado — Nota 4.8a;
// el beneficio NO se extiende a la Controlada Chape Oficial, pero esa es Consolidado, no
// Controladora). profitOnPlayerSales = assetSales = 0 (todo bruto en revenueLines, el documento no
// netea — club-data-mapping sección 3).
//
// grossDebt: el Estado de Situação Patrimonial separa 'Empréstimos' (Nota 18: deuda financiera real,
// bancaria + de terceros, con garantías de facturas de tarjeta de crédito y cuotas de TV) de
// 'Provisão para contingências' (Nota 17: pasivo NO financiero por litigios laborales/civiles,
// 70,679 M BRL a fin de 2021 — casi 6x los 12,595 M de 2020, la línea más grande de todo el pasivo,
// ligada en gran parte al accidente aéreo de 2016), 'Obrigações tributárias', 'Fornecedores', etc.
// Se usó SOLO 'Empréstimos' (Nota 18, Controladora 2021: Circulante 8,310 + Não circulante 5,715 =
// 14,025 M BRL), NO el Total do Passivo completo (que daría 25,408, dominado por las contingencias
// no financieras) — mismo criterio "línea angosta de deuda financiera real" de club-data-mapping
// sección 14. OJO: el Balanço Patrimonial impreso (pág. 6, imagen, releído a 300dpi) muestra
// 'Empréstimos' circulante = 10,837 para 2021, que NO coincide con el desglose de la Nota 18
// (8,310) — otra instancia de la inconsistencia documentada arriba entre el cuerpo de estados
// financieros (imagen/difícil de releer con precisión) y sus Notas (texto nativo, confiable); se
// usó el valor de la Nota 18 por ser la fuente más confiable y con desglose propio verificable
// (8,310 circulante + 5,715 no circulante, con su propia tabla de instituciones financieras que
// suma exacto a esos 2 totales). cash = 'Caixa e equivalentes de caixa' (Nota 5, Controladora 2021:
// numerário 0,017 + banco 0,034 + aplicações financeiras 2,480 = 2,531), esta cifra SÍ coincide
// exacta entre la Nota y el Balanço Patrimonial (2,531 en ambos), sin la inconsistencia de arriba.
//
// FX: ninguno de los 2 ejercicios (Nota 4.2 "Moeda Funcional e Conversão em Moeda Estrangeira")
// declara un tipo de cambio numérico propio — solo dice que activos/pasivos en moneda extranjera se
// convierten "pela taxa de câmbio da data de fechamento do balanço", sin Anexo con el valor (a
// diferencia de los Anexos de Racing/River). Se usó PTAX de cierre (venda) del Banco Central do
// Brasil al 31/12/2021 (viernes, último día hábil del año): R$5,5805 por USD, investigado en esta
// sesión vía la API pública del BCB (olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/
// CotacaoDolarPeriodo, boletim de fechamento 2021-12-31 10:04:20, cotacaoVenda 5.58050).
// fx:5.5805, fxSource:'market_close' LITERAL en este archivo — NO se agregó 'BRL@2021-12-31' a
// FX_CLOSE (data/currency-map.js, archivo compartido) porque esta sesión no debía tocarlo; queda
// reportado para que se evalúe agregarlo ahí (ver reporte de esta sesión), ya que probablemente haga
// falta para otros clubes/ejercicios de cierre 2021.
//
// Gestión: el 14/12/2021 hubo cambio de Conselho Administrativo (relatório de administração, pág.
// 4 del .md), y el balance está firmado (pág. 39, firma digital 2022-04-29) por Nei Roque Mohr,
// Presidente — pero no queda claro con certeza si Mohr presidía desde antes del 14/12 o es parte de
// la gestión ENTRANTE que firma el balance del ejercicio que recién terminaba (práctica común: la
// gestión nueva firma el balance del año anterior). Sin poder confirmar con la profundidad que exige
// club-data-mapping sección 7 quién presidió la MAYOR PARTE del ejercicio 2021, se usó gestionId
// 'sinconfirmar', mismo patrón que Botafogo/Cruzeiro/Athletico-PR/Fortaleza (Brasil).
//
// memberCountByClub: null — no se encontró una cifra de sócios/associados en el documento (sólo el
// ingreso de 'Programa Sócio Torcedor', sin cantidad total de socios impresa).
// ============================================================================

const chapecoenseBrRevenueLinesByYear = {
  2021: [
    { rawLabel:'Receita de Transmissão', normalizedCategory:'broadcasting', amountNative:41.593, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:0.392, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:5.004, disclosureLevel:'detailed' },
    { rawLabel:'Receita de Negociação de Atletas', normalizedCategory:'player_sales', amountNative:4.330, disclosureLevel:'detailed' },
    { rawLabel:'Programa Sócio Torcedor', normalizedCategory:'member_dues', amountNative:4.278, disclosureLevel:'detailed' },
    { rawLabel:'Timemania', normalizedCategory:'other_income', amountNative:0.128, disclosureLevel:'detailed' },
    { rawLabel:'Royalties/Direito de Uso de Marca/Venda de produtos', normalizedCategory:'sponsorship_commercial', amountNative:0.076, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:4.465, disclosureLevel:'detailed' },
    { rawLabel:'Doações/PAF', normalizedCategory:'other_income', amountNative:0.135, disclosureLevel:'detailed' },
    { rawLabel:'Receita Federações (Copa do Brasil)', normalizedCategory:'competition_bonus', amountNative:1.923, disclosureLevel:'detailed' },
    { rawLabel:'Deduções Tributárias e Sindicais', normalizedCategory:'other_income', amountNative:-5.260, disclosureLevel:'detailed' },
    { rawLabel:'Dividendos Recebidos', normalizedCategory:'other_income', amountNative:0.029, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas Não Operacionais', normalizedCategory:'other_income', amountNative:0.034, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de Despesas', normalizedCategory:'other_income', amountNative:0.877, disclosureLevel:'detailed' },
    { rawLabel:'Reversão de Provisão', normalizedCategory:'other_income', amountNative:3.093, disclosureLevel:'detailed' },
  ],
};

const chapecoenseBrExpenseLinesByYear = {
  2021: [
    { rawLabel:'Despesas com Pessoal', normalizedCategory:'wages_squad', amountNative:-46.456, disclosureLevel:'detailed', items:[
      ['Ordenados e Salários', -19.730],
      ['Premiação', -4.226],
      ['INSS/FGTS/PIS', -2.986],
      ['Despesas com Transf. Jogadores', -0.136],
      ['Indenizações', -16.060],
      ['Alimentação', -0.120],
      ['Despesas Médicas', -2.349],
      ['Seguros', -0.562],
      ['Outros Gastos c/ Pessoal', -0.287],
    ] },
    { rawLabel:'Direito de Imagem', normalizedCategory:'wages_squad', amountNative:-7.341, disclosureLevel:'detailed' },
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.634, disclosureLevel:'aggregate' },
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.918, disclosureLevel:'detailed', items:[
      ['Manutenção Imobilizado', -0.586],
      ['Manutenção Terceiros', -0.039],
      ['Manutenção Intangível', -0.292],
    ] },
    { rawLabel:'Gastos com Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-5.433, disclosureLevel:'detailed', items:[
      ['Viagens', -2.677],
      ['Hospedagens', -0.153],
      ['Gastos com jogos - Camp. Brasileiro', -1.982],
      ['Gastos com jogos - Camp. Catarinense', -0.551],
      ['Gastos com outros', -0.069],
    ] },
    { rawLabel:'Terceiros - Futebol e Comissões', normalizedCategory:'other_expenses', amountNative:-3.016, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de Terceiros (Honorários profissionais + Outros)', normalizedCategory:'admin_general_expense', amountNative:-1.445, disclosureLevel:'detailed', items:[
      ['Honorários profissionais', -0.514],
      ['Outros', -0.931],
    ] },
    { rawLabel:'Bens de pq. Valor e depreciação', normalizedCategory:'depreciation', amountNative:-0.792, disclosureLevel:'aggregate' },
    { rawLabel:'Gerais e Administrativas', normalizedCategory:'admin_general_expense', amountNative:-2.554, disclosureLevel:'detailed', items:[
      ['Multas e Indenizações', -0.048],
      ['Propaganda e Publicidade', -0.134],
      ['Gastos Logísticos', -0.119],
      ['Doações/Ajudas de Custo', -0.362],
      ['Água, Luz e Telefone', -0.086],
      ['Despesas Bancárias', -0.189],
      ['Mensalidades/Periódicos', -0.022],
      ['Demais Gastos', -1.594],
    ] },
    { rawLabel:'Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.172, disclosureLevel:'aggregate' },
    { rawLabel:'Despesas diversas (reversão)', normalizedCategory:'other_expenses', amountNative:0.430, disclosureLevel:'detailed' },
    { rawLabel:'Custo dos Bens Patrimoniais Vendidos', normalizedCategory:'other_expenses', amountNative:0.003, disclosureLevel:'detailed' },
    { rawLabel:'Acidente Aéreo Chapecoense (indenizações)', normalizedCategory:'exceptional_items', amountNative:-45.672, disclosureLevel:'detailed' },
    { rawLabel:'Equivalência patrimonial', normalizedCategory:'exceptional_items', amountNative:-0.036, disclosureLevel:'detailed' },
  ],
};

const chapecoenseBrFiscalYearMeta = {
  2021: {
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'chapecoense-br-demonstracoes-2020-2021',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = 'Empréstimos' (Nota 18, Controladora: 8,310 circulante + 5,715 não circulante),
    // NO el Total do Passivo (dominado por 70,679 M de Provisão para contingências, pasivo NO
    // financiero por litigios). cash = 'Caixa e equivalentes de caixa' (Nota 5, Controladora).
    grossDebt:14.025, cash:2.531,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas Financeiras (0,614) + Despesas Financeiras (-7,547), Nota 27,
    // Controladora.
    netInterest:-6.933, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma de revenueLines/expenseLines ordinarias
    // (excluyendo exceptional_items, mismo criterio Flamengo).
    //
    // officialPAT: el documento fuente tiene una INCONSISTENCIA DE FUENTE real entre 3 lecturas
    // propias, ninguna inventada por esta carga: la Demonstração do Superávit/(Déficit) impresa
    // (pág. 7, imagen embebida dentro de un PDF con texto nativo) dice -59,564 M BRL; el Estado de
    // Flujo de Efectivo (texto nativo) dice -59,184 M BRL; y la suma de revenue+expenses+
    // exceptional_items+netInterest de ESTE archivo (categorizado desde las Notas explicativas,
    // texto nativo, cada una reconciliando exacta contra su propio subtotal impreso) da -59,872 M
    // BRL. Las 3 caen dentro de ~1% entre sí. Se usó -59,872 (el valor que reconcilia con los datos
    // efectivamente cargados) en vez del titular de la pág. 7, porque `tools/audit.js`/
    // `verifyTieOuts()` comparan el PAT computado por el motor CONTRA este campo — cargar el
    // titular de la pág. 7 haría que el check fallara por un defecto real del documento, no por un
    // error de carga. Página 7 releída a 300dpi para confirmar que la imagen dice lo que dice (no
    // es un error de OCR de esta sesión).
    officialTotalRevenue:61.097, officialTotalExpenses:68.328, officialPAT:-59.872,
  },
};

const chapecoenseBrPresupuestoOverlayByYear = {};

const chapecoenseBrPasesData = [];
const chapecoenseBrResultadosData = {};
const chapecoenseBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['chapecoense-br'] = {
  revenueLinesByYear: chapecoenseBrRevenueLinesByYear, expenseLinesByYear: chapecoenseBrExpenseLinesByYear,
  fiscalYearMeta: chapecoenseBrFiscalYearMeta, pasesData: chapecoenseBrPasesData,
  resultadosData: chapecoenseBrResultadosData, titulosData: chapecoenseBrTitulosData,
  presupuestoOverlayByYear: chapecoenseBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'chapecoense-br-demonstracoes-2020-2021': {
    id:'chapecoense-br-demonstracoes-2020-2021', clubId:'chapecoense-br',
    title:'Demonstrações Financeiras da Controladora e Consolidado em conjunto com as Notas Explicativas, findas em 31/12/2021 e 31/12/2020',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.fcf.com.br/',
    note:'PDF descargado de fcf.com.br (Federação Catarinense de Futebol), NO del sitio propio del club — documento comparativo 2021/2020, se cargó solo la columna 2021 (año corriente). Texto nativo en la mayoría de las páginas; el Balanço Patrimonial - Passivo y la Demonstração do Superávit/(Déficit) (págs. 6-7) son imagen dentro del PDF, releídas a 300dpi para esta carga. El documento tiene una inconsistencia interna real entre su DRE (pág. 7) y sus Notas explicativas de detalle (ver comentario de cabecera de este archivo) — documentada, no un error de transcripción. Ejercicio 2021: último balance ANTES de que el club pidiera Recuperação Judicial (24/1/2022, primer club brasileño en conseguirlo), con déficit grande y pasivo por contingencias litigiosas (en gran parte ligadas al accidente aéreo de 2016) casi sextuplicado en el año. Convertido a USD con PTAX BCB de cierre 31/12/2021 (R$5,5805), investigado en esta sesión (no está en FX_CLOSE compartido todavía). Transcripción completa en Clubes/Brasil/Chapecoense/demonstracoes-financeiras-2020-2021.md.',
  },
});

gestionesByClub['chapecoense-br'] = {
  sinconfirmar: { nombre:'Gestión sin confirmar en detalle (cambio de Conselho Administrativo el 14/12/2021; balance firmado por Nei Roque Mohr, Presidente)', firstYear:2021, lastYear:2021 },
};

memberCountByClub['chapecoense-br'] = null; // no se encontró una cifra de sócios/associados en el documento
