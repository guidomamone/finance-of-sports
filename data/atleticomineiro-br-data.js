// ============================================================================
// data/atleticomineiro-br-data.js — Clube Atlético Mineiro SAF (Sociedade Anônima do Futebol),
// Belo Horizonte-MG, Brasil ("Galo"). 3 ejercicios cargados: 2023, 2024, 2025.
//
// Fuente: "Demonstrações contábeis individuais e consolidadas" da Atlético Mineiro S.A.F.,
// auditadas por BDO RCS Auditores Independentes, descargadas del Portal da Transparência SAF
// (atletico.com.br/institucional/portal-da-transparencia/portal-da-transparencia-saf/, PDFs reales
// en atletico.com.br/informacoes-relatorios/). PDF con texto nativo (pdftotext -layout funciona
// limpio, tablas bien alineadas), no son escaneos. Transcripción completa (y, para las tablas
// numéricas, cruce directo contra `pdftotext -layout` página por página, más confiable que la
// transcripción flotante para leer columnas) en:
// - Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2023.md
// - Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2024.md
// - Clubes/Brasil/Atletico Mineiro/relatorio-integrado-saf-2025.md (el único de los 3 que es un
//   "Relatório Integrado": financiero + sustentabilidad + gobernanza en un solo PDF de 200+
//   páginas; las demonstrações financeiras están en su sección propia, Balanço/DRE en pág. 122-123,
//   Notas explicativas de detalle en pág. 168-171).
//
// EJERCICIO 2023, ACLARACIÓN IMPORTANTE (la consigna especulaba "10 meses associação + 2 meses
// SAF" según prensa; el propio documento lo desmiente): el balance 2023 cubre EXCLUSIVAMENTE el
// período 14/set/2023 a 31/dic/2023 (~3,5 meses), la vida de la SAF desde su constitución —
// confirmado literal en el propio DRE ("Demonstrações do resultado... Período de 14 de setembro à
// 31 de dezembro de 2023") y repetido en cada Nota explicativa. NO incluye los meses previos de
// actividad de fútbol bajo la associação (Clube Atlético Mineiro, entidad social separada, que
// aportó el "acervo líquido" del departamento de fútbol a la SAF recién el 1°/11/2023 vía Acordo de
// Investimento con Galo Holding S.A., que se quedó con el 75% de las acciones). Por eso 2023 es
// estructuralmente MÁS CHICO que 2024/2025 (revenue ~75-86 M BRL vs. ~400-500 M BRL) — no es un
// error de carga, es un ejercicio de duración real distinta (un "stub period" de constitución), y
// se documenta así en `sources{}` para que no se lea como una caída interanual real.
//
// COLUMNA ELEGIDA: CONTROLADORA (no Consolidado), mismo criterio que Botafogo (data/botafogo-
// data.js) y por el mismo motivo: la entidad "Atlético Mineiro S.A.F." ES la Controladora (el
// negocio de fútbol standalone). El Consolidado suma 3 controladas que NO son el negocio de
// fútbol en sí — confirmado leyendo la Nota 1 de los 3 balances (Nota "Contexto operacional" /
// "Estrutura societária"): Fundo de Investimento Imobiliário AVM FII (dueño de la Arena MRV/
// estadio, registrado ante la CVM bajo la Instrução CVM 175 como fundo de investimento
// imobiliário), Arena Vencer Complexo Esportivo Multiuso SPE Ltda. (locación del estadio) y Arena
// Vencer Eventos SPE Ltda. (organización de eventos no futbolísticos en el estadio). Mezclar el
// Consolidado habría sumado al "negocio de fútbol" el financiamiento inmobiliario del estadio (la
// diferencia de "Empréstimos e financiamentos" entre columnas es enorme: 465,387 M Controladora vs.
// 992,753 M Consolidado en 2023) y una línea "Receitas Patrimoniais" que en 2023 es CERO en
// Controladora pero 11,211 M en Consolidado — exactamente el tipo de mezcla de perímetros que
// club-data-mapping SKILL.md pide evitar. Mismo criterio aplicado a los 3 ejercicios por igual.
//
// DUDA DE SOURCING RESUELTA (ver fuentes/Brasil/Atletico Mineiro.md, que especulaba sobre una
// posible relación con la CVM vía debêntures): la relación con la CVM que aparece en el documento
// es por DOS vías, ninguna es una oferta pública de la propia SAF: (1) el AVM FII (fondo
// inmobiliario dueño de la Arena, ver arriba) está registrado ante la CVM como fundo de
// investimento imobiliário — pero es una CONTROLADA, no la SAF misma, y por eso no entra en la
// columna Controladora igual; (2) la propia SAF SÍ emitió debêntures reales: 60.000 debêntures de
// R$1.000 de valor nominal cada una (R$60.000 M nominal), emitidas 25/09/2024, quirografárias (sin
// garantía real), 3,50% a.a., vencimiento 25/09/2027 (Nota de "Operações de debêntures" del balance
// 2024) — una colocación privada/restringida (no se confirmó el número exacto de instrução CVM que
// la ampara, probablemente Instrução CVM 476 de oferta restrita a investidores profissionais, mismo
// patrón que otros clubes-SAF brasileños, pero esto no se confirmó línea por línea en el documento).
// Esta deuda de debêntures SÍ se sumó a `grossDebt` (ver abajo), por ser deuda financiera real de
// la Controladora.
//
// CAMBIO DE PRESIDENCIA ENTRE 2024 Y 2025 (encontrado en la firma de cada balance, no en prensa):
// Bruno Muzzi firma como "Diretor Presidente" los balances 2023 y 2024; el Relatório Integrado 2025
// lo firma "Pedro Daniel" como Diretor Presidente — un cambio real de gestión entre el cierre 2024 y
// el cierre 2025, confirmado por la propia fuente primaria (no investigado en prensa externa). Ver
// `gestionesByClub` abajo.
//
// SITUACIÓN FINANCIERA 2025 — DÉFICIT SEVERO, CON ÉNFASIS DE AUDITORÍA (no ressalva): el "Prejuízo
// do exercício" 2025 (-882,109 M BRL) casi triplica el de 2024 (-299,354 M), explicado
// principalmente por: "Perda com Valor Justo" de R$572,161 M dentro de Despesas financeiras (un
// impairment puntual, la propia Nota 1 lo caracteriza como "natureza não financeira e pontual") y un
// salto en "Resultado equivalência patrimonial" (-180,320 M, resultado negativo de una inversión por
// equivalencia patrimonial). El informe del auditor (BDO) incluye 2 párrafos de "Ênfase" (no
// ressalva/salvedad, opinión limpia igual): (1) transacciones significativas con partes
// relacionadas (cesión no onerosa de ingresos de boletería y sócio torcedor a la controlada Arena
// Vencer, Nota 16); (2) deficiencia de capital circulante neto de R$817,991 M (individual) al
// cierre 2025, con lenguaje de dependencia de que la Administración logre las medidas de
// reestructuración financiera en curso. Se documenta en `sources{}`.
//
// "OUTRAS RECEITAS" 2025 (98,056 M, dentro de Receita operacional bruta, NO dentro de "Receita
// futebol profissional"): NO es ingreso recurrente de TV — la Nota 26(a) explica que es el
// reconocimiento, en 2025, de la cesión PARCIAL (10%) de los derechos económicos sobre ingresos
// FUTUROS de transmisión, por las Temporadas 2030 a 2074 (45 años), a un inversor — una
// monetización anticipada de derechos futuros, evento no recurrente. Se cargó igual como
// `other_income` (no `broadcasting`, que ya tiene su propia línea con el ingreso de TV recurrente
// del año) para no inflar esa categoría con un ingreso de naturaleza distinta.
//
// CATEGORIZACIÓN (misma estructura de Notas en los 3 años — Nota "Receita futebol profissional" +
// Nota "Custo com atividades esportivas", ambas con las MISMAS 19 líneas rubro por rubro en los 3
// ejercicios, lo que permitió categorizar por nombre de rubro consistente):
// - 'Receitas de bilheteria' -> matchday_competition.
// - 'Receitas de transmissão e imagem/Premiação' (línea compuesta, el propio documento no separa TV
//   de premios) -> broadcasting.
// - 'Outras receitas atividades esportivas' (Nota: "substancialmente" receita de Timemania, lotería
//   federal de clubes brasileños) -> other_income.
// - 'Receitas com sócio torcedor' -> member_dues (programa de socios-hinchas, mismo criterio que
//   Botafogo "Camisa 7").
// - 'Receitas com patrocínios/marketing' -> sponsorship_commercial.
// - 'Receitas Patrimoniais' (Controladora, aparece desde 2024 — en 2023 era 0 en esta columna) ->
//   other_income (alquileres/patrimonio, sin más desglose).
// - 'Receita De Venda No Manto' (venta de camisetas) -> sponsorship_commercial (merchandising,
//   mismo criterio que Botafogo "Venda de mercadorias").
// - 'Receitas com Projetos' -> other_income.
// - '(-) Impostos e contribuições' -> other_income (línea negativa, contra-revenue, mismo criterio
//   que Botafogo/América Mineiro "Deduções sobre a receita").
// - 'Custo de mercadorias e produtos' (costo de lo vendido, dentro de "Deduções da receita" del
//   propio documento) -> admin_general_expense (mismo criterio que Botafogo "Custo venda de
//   mercadoria").
// - 'Outras receitas operacionais' (Nota separada, DRE: venda/empréstimo de direitos econômicos de
//   jogadores) -> player_sales, las 3 sub-líneas (Empréstimos atletas, Vendas de atletas, Outras
//   receitas c/transf. atletas).
// - Nota "Custo com atividades esportivas" (19 líneas, idénticas en estructura los 3 años): las
//   líneas de plantel/staff (Direito de imagem/comissão técnica, Salários/encargos sociais) ->
//   wages_squad; 'Amortização dos direitos econômicos' -> player_amortisation; 'Custo com atletas
//   negociados' -> other_expenses (costo asociado a jugadores transferidos, no amortización propia);
//   'Despesas com competições' -> match_organisation_expense; el resto de líneas NO salariales
//   propias del plantel (Outros custos com futebol, Lanches e refeições, Materiais esportivos,
//   Materiais médico-cirúrgicos e medicamento, Serviços médicos/exames PJ) -> wages_squad, mismo
//   criterio que Banfield Anexo IV / Boca 2027 / Racing (club-data-mapping sección 13, "CASO
//   CONSULTADO": costos no salariales del plantel profesional mezclados en el mismo departamento
//   de fútbol van con Sueldos); las líneas claramente administrativas/de oficina/instalaciones
//   (Custo Sócio Torcedor, Energia elétrica, Licenciamento de Software, Manutenção –
//   equipamentos/imóveis, Marketing/Publicidade/Mídias Sociais, Materiais de escritório e
//   expediente, Outros custos gerais) -> admin_general_expense; 'Impostos e taxas' -> SIEMPRE
//   admin_general_expense (regla ya establecida, club-data-mapping sección 17).
// - Nota "Custos com pessoal" (atividades patrimoniais, personal FUERA del plantel de fútbol) ->
//   admin_general_expense completo.
// - Nota "Custos gerais" (atividades patrimoniais) -> admin_general_expense completo (a diferencia
//   de la nota homónima de fútbol, ésta es del sector patrimonial, no hay línea de plantel que
//   separar).
// - 'Custo com projetos' (línea suelta del DRE, sin nota de detalle propia) -> other_expenses.
// - Nota "Despesas gerais e administrativas": 'Despesas com depreciação' -> depreciation; el resto
//   (Despesas administrativas, Despesas com pessoal, Despesas indenizações trabalhistas) ->
//   admin_general_expense.
// - 'Despesas com contingências' (línea suelta del DRE, provisión por litigios) ->
//   admin_general_expense (mismo criterio que Banfield "Juicios").
// - 'Resultado equivalência patrimonial' -> exceptional_items (mismo criterio que Botafogo).
//
// netInterest/tax: 'Receitas/(despesas) financeiras, líquidas' (Nota dedicada, Controladora) ->
// netInterest. 'Imposto de renda e contribuição social' -> tax (fue 0 en Controladora los 3 años;
// el Consolidado tuvo -3 en 2023, irrelevante para esta columna).
//
// grossDebt = 'Empréstimos e financiamentos' (circulante + não circulante) + 'Operações de
// debêntures' (circulante + não circulante, existe desde el balance 2024), Controladora — el
// balance separa estas líneas de "Fornecedores e outras obrigações"/"Tributos e contribuições
// sociais"/"Contas a pagar na transferência de jogadores", mismo criterio de sección 14 de
// club-data-mapping (preferir la línea angosta de deuda financiera real). cash = "Caixa e
// equivalentes de caixa", Controladora.
//
// Escala: documento "Em milhares de Reais" (miles de reales) los 3 años — acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Botafogo/América Mineiro/Grêmio).
//
// FX: ningún año declara un tipo de cambio de cierre propio (se buscó explícitamente
// "cotação"/"câmbio"/"dólar" en los 3 documentos — la única mención es la política contable
// genérica de IFRS sobre convertir activos/pasivos en moeda estrangeira a la tasa de cierre, sin
// declarar la cifra). Se usó PTAX BCB de cierre (venda), vía fxRef a data/currency-map.js (ya
// existían las 3 entradas antes de esta sesión): 'BRL@2023-12-31' (4,8413), 'BRL@2024-12-31'
// (6,1923), 'BRL@2025-12-31' (5,5024). fxSource: 'market_close' los 3 años.
//
// VERIFICACIÓN (Node, antes de cargar) — Controladora, columna año corriente de cada balance:
// - 2023 (14/set-31/dic): revenueLines suma EXACTO 75,572 M BRL (75,343 Receita líquida + 0,229
//   Outras receitas operacionais). expenseLines suma EXACTO -91,235 M BRL. Revenue + Expenses +
//   netInterest(-25,520) = -41,183 M BRL = "Prejuízo do exercício" impreso, EXACTO.
// - 2024: revenueLines suma EXACTO 580,132 M BRL (397,294 + 182,838). expenseLines suma EXACTO
//   -739,558 M BRL (incluye Nota Custos esportivos -611,159 + Custos pessoal patrimonial -3,800 +
//   Custos gerais patrimonial -20,578 + Custo com projetos -1,159 + Despesas G&A -35,592 +
//   Despesas contingências -15,532 + Resultado equivalência patrimonial -51,738). Revenue +
//   Expenses + netInterest(-139,928) = -299,354 M BRL = "Prejuízo do exercício" impreso, EXACTO.
// - 2025: revenueLines suma EXACTO 664,760 M BRL (461,795 Receita líquida + 202,965 Outras receitas
//   operacionais). expenseLines suma EXACTO -886,354 M BRL. Revenue + Expenses +
//   netInterest(-660,515) = -882,109 M BRL = "Prejuízo do exercício" impreso, EXACTO. (Nota: la
//   propia Nota 26 del balance 2025 imprime "Receita líquida 461.7956" — dígito de más, typo del
//   propio documento; se usó 461,795, que es el valor que reconcilia contra el DRE y contra la
//   comparativa "2025" que trae el propio balance en su encabezado de Nota. Además, dentro de esa
//   misma Nota 26, las 2 líneas de "Deduções da receita" (Impostos e contribuições -50,537 + Custo
//   de mercadorias e produtos -4,487) suman -55,024 impreso a mano, pero el propio documento
//   imprime el subtotal de esa sección como -55,124 (100 mil de diferencia) — y es ESE subtotal
//   impreso el que reconcilia exacto contra la Receita líquida (516,919 - 55,124 = 461,795). Se
//   ajustó la línea "Impostos e contribuições" a -50,637 (en vez del -50,537 impreso) para que la
//   suma de revenueLines cierre contra el subtotal impreso, documentado en el propio `rawLabel` de
//   esa línea — mismo tipo de typo de imprenta de un dígito que el "461.7956" de arriba, no un
//   error de carga.)
//
// Gestión: ver "CAMBIO DE PRESIDENCIA" arriba — Bruno Muzzi (2023-2024), Pedro Daniel (2025),
// ambos confirmados por firma en el propio balance (fuente primaria).
// ============================================================================

const atleticomineiroBrRevenueLinesByYear = {
  2023: [
    { rawLabel:'Receitas de bilheteria', normalizedCategory:'matchday_competition', amountNative:5.069, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de transmissão e imagem/Premiação', normalizedCategory:'broadcasting', amountNative:67.453, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas atividades esportivas (Timemania)', normalizedCategory:'other_income', amountNative:0.196, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com sócio torcedor', normalizedCategory:'member_dues', amountNative:5.971, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com patrocínios/marketing', normalizedCategory:'sponsorship_commercial', amountNative:7.749, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos e contribuições', normalizedCategory:'other_income', amountNative:-11.095, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais (venda/empréstimo de direitos de jogadores)', normalizedCategory:'player_sales', amountNative:0.229, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Receitas de bilheteria', normalizedCategory:'matchday_competition', amountNative:80.684, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de transmissão e imagem/Premiação', normalizedCategory:'broadcasting', amountNative:247.742, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas atividades esportivas (Timemania)', normalizedCategory:'other_income', amountNative:11.223, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com sócio torcedor', normalizedCategory:'member_dues', amountNative:32.193, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com patrocínios/marketing', normalizedCategory:'sponsorship_commercial', amountNative:58.463, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Patrimoniais', normalizedCategory:'other_income', amountNative:7.480, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com Projetos', normalizedCategory:'other_income', amountNative:0.196, disclosureLevel:'detailed' },
    { rawLabel:'Receita De Venda No Manto', normalizedCategory:'sponsorship_commercial', amountNative:1.003, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos e contribuições', normalizedCategory:'other_income', amountNative:-40.587, disclosureLevel:'detailed' },
    { rawLabel:'Custo de mercadorias e produtos (custo do manto vendido)', normalizedCategory:'admin_general_expense', amountNative:-1.103, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais — Empréstimos atletas', normalizedCategory:'player_sales', amountNative:0.326, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais — Vendas de atletas', normalizedCategory:'player_sales', amountNative:146.837, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais — Outras receitas c/transf. atletas', normalizedCategory:'player_sales', amountNative:35.675, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Receitas de bilheteria', normalizedCategory:'matchday_competition', amountNative:50.868, disclosureLevel:'detailed' },
    { rawLabel:'Receitas de transmissão e imagem/Premiação', normalizedCategory:'broadcasting', amountNative:183.519, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas atividades esportivas (Timemania)', normalizedCategory:'other_income', amountNative:77.064, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com sócio torcedor', normalizedCategory:'member_dues', amountNative:36.538, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com patrocínios/marketing', normalizedCategory:'sponsorship_commercial', amountNative:47.819, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Patrimoniais', normalizedCategory:'other_income', amountNative:12.662, disclosureLevel:'detailed' },
    { rawLabel:'Receita De Venda No Manto', normalizedCategory:'sponsorship_commercial', amountNative:10.393, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (cessão parcial de direitos de transmissão futuros, Temporadas 2030-2074 — Nota 26a, ver comentario de cabecera)', normalizedCategory:'other_income', amountNative:98.056, disclosureLevel:'detailed' },
    { rawLabel:'(-) Impostos e contribuições (ver nota de redondeo en comentario de cabecera: 50,637 en vez del 50,537 impreso en la línea, para que la suma cierre contra el subtotal impreso de Deduções da receita, -55,124)', normalizedCategory:'other_income', amountNative:-50.637, disclosureLevel:'detailed' },
    { rawLabel:'Custo de mercadorias e produtos (custo do manto vendido)', normalizedCategory:'admin_general_expense', amountNative:-4.487, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais — Empréstimos atletas', normalizedCategory:'player_sales', amountNative:2.433, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais — Vendas de atletas', normalizedCategory:'player_sales', amountNative:174.046, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais — Outras receitas c/transf. atletas', normalizedCategory:'player_sales', amountNative:26.486, disclosureLevel:'detailed' },
  ],
};

const atleticomineiroBrExpenseLinesByYear = {
  2023: [
    { rawLabel:'Direito de imagem atletas / comissão técnica', normalizedCategory:'wages_squad', amountNative:-11.036, disclosureLevel:'detailed' },
    { rawLabel:'Salários / encargos sociais (futebol)', normalizedCategory:'wages_squad', amountNative:-32.418, disclosureLevel:'detailed' },
    { rawLabel:'Amortização dos direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-16.904, disclosureLevel:'detailed' },
    { rawLabel:'Custo com atletas negociados', normalizedCategory:'other_expenses', amountNative:-1.567, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com competições', normalizedCategory:'match_organisation_expense', amountNative:-5.332, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos com futebol', normalizedCategory:'wages_squad', amountNative:-3.453, disclosureLevel:'detailed' },
    { rawLabel:'Energia elétrica (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.076, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.154, disclosureLevel:'detailed' },
    { rawLabel:'Lanches e refeições', normalizedCategory:'wages_squad', amountNative:-0.533, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento de Software (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.614, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – equipamentos (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.029, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – imóveis (futebol)', normalizedCategory:'admin_general_expense', amountNative:-1.833, disclosureLevel:'detailed' },
    { rawLabel:'Marketing/Publicidade/Mídias Sociais (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.178, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de escritório e expediente (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.122, disclosureLevel:'detailed' },
    { rawLabel:'Materiais esportivos', normalizedCategory:'wages_squad', amountNative:-0.714, disclosureLevel:'detailed' },
    { rawLabel:'Materiais médico-cirúrgicos e medicamento', normalizedCategory:'wages_squad', amountNative:-0.061, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos gerais (futebol)', normalizedCategory:'admin_general_expense', amountNative:-3.932, disclosureLevel:'detailed' },
    { rawLabel:'Serviços médicos/exames PJ', normalizedCategory:'wages_squad', amountNative:-0.144, disclosureLevel:'detailed' },
    { rawLabel:'Salários / encargos sociais (atividades patrimoniais)', normalizedCategory:'admin_general_expense', amountNative:-0.592, disclosureLevel:'detailed' },
    { rawLabel:'Ações, acordos e Indenizações trabalhistas (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.013, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – equipamentos (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.032, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos gerais (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.027, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-9.230, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com depreciação', normalizedCategory:'depreciation', amountNative:-0.085, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal (G&A)', normalizedCategory:'admin_general_expense', amountNative:-2.103, disclosureLevel:'detailed' },
    { rawLabel:'Despesas indenizações trabalhistas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.053, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Direito de imagem atletas / comissão técnica', normalizedCategory:'wages_squad', amountNative:-79.720, disclosureLevel:'detailed' },
    { rawLabel:'Salários / encargos sociais (futebol)', normalizedCategory:'wages_squad', amountNative:-243.646, disclosureLevel:'detailed' },
    { rawLabel:'Amortização dos direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-112.578, disclosureLevel:'detailed' },
    { rawLabel:'Custo com atletas negociados', normalizedCategory:'other_expenses', amountNative:-66.898, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com competições', normalizedCategory:'match_organisation_expense', amountNative:-50.723, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos com futebol', normalizedCategory:'wages_squad', amountNative:-16.047, disclosureLevel:'detailed' },
    { rawLabel:'Custo Sócio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-0.107, disclosureLevel:'detailed' },
    { rawLabel:'Energia elétrica (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.652, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.490, disclosureLevel:'detailed' },
    { rawLabel:'Lanches e refeições', normalizedCategory:'wages_squad', amountNative:-4.184, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento de Software (futebol)', normalizedCategory:'admin_general_expense', amountNative:-3.617, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – equipamentos (futebol)', normalizedCategory:'admin_general_expense', amountNative:-1.339, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – imóveis (futebol)', normalizedCategory:'admin_general_expense', amountNative:-1.651, disclosureLevel:'detailed' },
    { rawLabel:'Marketing/Publicidade/Mídias Sociais (futebol)', normalizedCategory:'admin_general_expense', amountNative:-1.744, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de escritório e expediente (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.522, disclosureLevel:'detailed' },
    { rawLabel:'Materiais esportivos', normalizedCategory:'wages_squad', amountNative:-6.300, disclosureLevel:'detailed' },
    { rawLabel:'Materiais médico-cirúrgicos e medicamento', normalizedCategory:'wages_squad', amountNative:-0.906, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos gerais (futebol)', normalizedCategory:'admin_general_expense', amountNative:-20.035, disclosureLevel:'detailed' },
    { rawLabel:'Salários / encargos sociais (atividades patrimoniais)', normalizedCategory:'admin_general_expense', amountNative:-3.707, disclosureLevel:'detailed' },
    { rawLabel:'Ações, acordos e Indenizações trabalhistas (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.093, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.017, disclosureLevel:'detailed' },
    { rawLabel:'Lanches e refeições (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.054, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento de Software (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-2.204, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – equipamentos (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-5.890, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – imóveis (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.303, disclosureLevel:'detailed' },
    { rawLabel:'Marketing/Publicidade/Mídias Sociais (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-2.527, disclosureLevel:'detailed' },
    { rawLabel:'Assessorias e consultorias (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-3.323, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de vigilância e segurança (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-3.048, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos gerais (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-3.081, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de escritório e expediente (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.049, disclosureLevel:'detailed' },
    { rawLabel:'Materiais esportivos (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.081, disclosureLevel:'detailed' },
    { rawLabel:'Materiais medico-cirúrgicos e medicamento (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.001, disclosureLevel:'detailed' },
    { rawLabel:'Custo com projetos', normalizedCategory:'other_expenses', amountNative:-1.159, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-21.681, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com depreciação', normalizedCategory:'depreciation', amountNative:-0.629, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal (G&A)', normalizedCategory:'admin_general_expense', amountNative:-12.853, disclosureLevel:'detailed' },
    { rawLabel:'Despesas indenizações trabalhistas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.429, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com contingências', normalizedCategory:'admin_general_expense', amountNative:-15.532, disclosureLevel:'detailed' },
    { rawLabel:'Resultado equivalência patrimonial', normalizedCategory:'exceptional_items', amountNative:-51.738, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Direito de imagem atletas / comissão técnica', normalizedCategory:'wages_squad', amountNative:-126.064, disclosureLevel:'detailed' },
    { rawLabel:'Salários / encargos sociais (futebol)', normalizedCategory:'wages_squad', amountNative:-236.374, disclosureLevel:'detailed' },
    { rawLabel:'Amortização dos direitos econômicos', normalizedCategory:'player_amortisation', amountNative:-118.554, disclosureLevel:'detailed' },
    { rawLabel:'Custo com atletas negociados', normalizedCategory:'other_expenses', amountNative:-30.979, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com competições', normalizedCategory:'match_organisation_expense', amountNative:-60.300, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos com futebol', normalizedCategory:'wages_squad', amountNative:-9.292, disclosureLevel:'detailed' },
    { rawLabel:'Custo Sócio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-3.038, disclosureLevel:'detailed' },
    { rawLabel:'Energia elétrica (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.554, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (futebol)', normalizedCategory:'admin_general_expense', amountNative:-1.086, disclosureLevel:'detailed' },
    { rawLabel:'Lanches e refeições', normalizedCategory:'wages_squad', amountNative:-4.134, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento de Software (futebol)', normalizedCategory:'admin_general_expense', amountNative:-3.841, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – equipamentos (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.680, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – imóveis (futebol)', normalizedCategory:'admin_general_expense', amountNative:-1.935, disclosureLevel:'detailed' },
    { rawLabel:'Marketing/Publicidade/Mídias Sociais (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.614, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de escritório e expediente (futebol)', normalizedCategory:'admin_general_expense', amountNative:-0.116, disclosureLevel:'detailed' },
    { rawLabel:'Materiais esportivos', normalizedCategory:'wages_squad', amountNative:-4.106, disclosureLevel:'detailed' },
    { rawLabel:'Materiais médico-cirúrgicos e medicamento', normalizedCategory:'wages_squad', amountNative:-1.442, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos gerais (futebol)', normalizedCategory:'admin_general_expense', amountNative:-21.702, disclosureLevel:'detailed' },
    { rawLabel:'Serviços médicos/exames PJ', normalizedCategory:'wages_squad', amountNative:-0.002, disclosureLevel:'detailed' },
    { rawLabel:'Salários / encargos sociais (atividades patrimoniais)', normalizedCategory:'admin_general_expense', amountNative:-5.025, disclosureLevel:'detailed' },
    { rawLabel:'Ações, acordos e Indenizações trabalhistas (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.015, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.049, disclosureLevel:'detailed' },
    { rawLabel:'Lanches e refeições (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.024, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento de software (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-5.464, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – equipamentos (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-9.190, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção – imóveis (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-1.109, disclosureLevel:'detailed' },
    { rawLabel:'Marketing/publicidade/mídias sociais (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-1.129, disclosureLevel:'detailed' },
    { rawLabel:'Assessorias e consultorias (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-3.957, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de vigilância e segurança (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-3.887, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos gerais (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-2.951, disclosureLevel:'detailed' },
    { rawLabel:'Materiais de escritório e expediente (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.021, disclosureLevel:'detailed' },
    { rawLabel:'Materiais esportivos (patrimonial)', normalizedCategory:'admin_general_expense', amountNative:-0.007, disclosureLevel:'detailed' },
    { rawLabel:'Custo com projetos', normalizedCategory:'other_expenses', amountNative:-0.852, disclosureLevel:'detailed' },
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-26.740, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com depreciação', normalizedCategory:'depreciation', amountNative:-1.189, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal (G&A)', normalizedCategory:'admin_general_expense', amountNative:-13.191, disclosureLevel:'detailed' },
    { rawLabel:'Despesas indenizações trabalhistas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.137, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com contingências', normalizedCategory:'admin_general_expense', amountNative:-6.284, disclosureLevel:'detailed' },
    { rawLabel:'Resultado equivalência patrimonial', normalizedCategory:'exceptional_items', amountNative:-180.320, disclosureLevel:'detailed' },
  ],
};

const atleticomineiroBrFiscalYearMeta = {
  2023: {
    currency:'BRL', fxRef:'BRL@2023-12-31', fxSource:'market_close',
    sourceId:'atleticomineiro-br-demonstracoes-2023',
    reportType:'official_balance_sheet',
    gestionId:'muzzi',
    // grossDebt = "Empréstimos e financiamentos" (circulante 145,102 + não circulante 320,285),
    // Controladora — todavía sin debêntures en 2023 (línea "Operações de debêntures" aparece recién
    // en el balance 2024, con comparativo 2023 en cero). cash = "Caixa e equivalentes de caixa".
    grossDebt:465.387, cash:191.231,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Receitas/(despesas) financeiras, líquidas", Controladora (31,370 - 56,890).
    netInterest:-25.520, tax:0,
    officialTotalRevenue:75.572, officialTotalExpenses:91.235, officialPAT:-41.183,
  },
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31', fxSource:'market_close',
    sourceId:'atleticomineiro-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'muzzi',
    // grossDebt = "Empréstimos e financiamentos" (285,563 + 210,168 = 495,731) + "Operações de
    // debêntures" (13,548 + 45,423 = 58,971, emitidas 25/09/2024), Controladora = 554,702.
    // cash = "Caixa e equivalentes de caixa".
    grossDebt:554.702, cash:3.382,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Receitas/(despesas) financeiras, líquidas", Controladora (35,037 - 174,965).
    netInterest:-139.928, tax:0,
    // officialTotalExpenses EXCLUYE 'Resultado equivalência patrimonial' (-51,738, exceptional_items)
    // — mismo criterio que Botafogo (data/botafogo-data.js): verifyTieOuts()/tools/audit.js comparan
    // "Expenses" contra gasto ordinario + no-efectivo solamente (expenses+nonCash), exceptional_items
    // no participa de ese check (sí de officialPAT, vía operatingProfit). Documento imprime 739,558
    // como total de despesas INCLUYENDO ese ítem; acá va 687,820 (739,558 - 51,738) para que cierre
    // contra la fórmula real del motor.
    officialTotalRevenue:580.132, officialTotalExpenses:687.820, officialPAT:-299.354,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31', fxSource:'market_close',
    sourceId:'atleticomineiro-br-relatorio-integrado-2025',
    reportType:'official_balance_sheet',
    gestionId:'pedrodaniel',
    // grossDebt = "Empréstimos e financiamentos" (355,698 + 318,479 = 674,177) + "Operações de
    // debêntures" (47,580 circulante + 0 não circulante = 47,580), Controladora = 721,757.
    // cash = "Caixa e equivalentes de caixa".
    grossDebt:721.757, cash:5.939,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Receitas/(despesas) financeiras, líquidas", Controladora (152,216 - 812,731) —
    // incluye la "Perda com Valor Justo" de R$572,161 M (impairment puntual, ver comentario de
    // cabecera). tax = 0 (Controladora).
    netInterest:-660.515, tax:0,
    // officialTotalExpenses EXCLUYE 'Resultado equivalência patrimonial' (-180,320, exceptional_items),
    // mismo criterio que 2024 (ver comentario de ese año) y que Botafogo. Documento imprime 886,354
    // incluyendo ese ítem; acá va 706,034 (886,354 - 180,320).
    officialTotalRevenue:664.760, officialTotalExpenses:706.034, officialPAT:-882.109,
  },
};

const atleticomineiroBrPresupuestoOverlayByYear = {};

const atleticomineiroBrPasesData = [];
const atleticomineiroBrResultadosData = {};
const atleticomineiroBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (bracket notation, clubId con guión — mismo patrón que
// banfield-ar/americamineiro-br desde la Versión 82).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['atleticomineiro-br'] = {
  revenueLinesByYear: atleticomineiroBrRevenueLinesByYear, expenseLinesByYear: atleticomineiroBrExpenseLinesByYear,
  fiscalYearMeta: atleticomineiroBrFiscalYearMeta, pasesData: atleticomineiroBrPasesData,
  resultadosData: atleticomineiroBrResultadosData, titulosData: atleticomineiroBrTitulosData,
  presupuestoOverlayByYear: atleticomineiroBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'atleticomineiro-br-demonstracoes-2023': {
    id:'atleticomineiro-br-demonstracoes-2023', clubId:'atleticomineiro-br',
    title:'Demonstrações contábeis individuais e consolidadas do Atlético Mineiro S.A.F., período de 14 de setembro a 31 de dezembro de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://atletico.com.br/informacoes-relatorios/',
    note:'PDF oficial (texto nativo), descargado del Portal da Transparência SAF (atletico.com.br/institucional/portal-da-transparencia/portal-da-transparencia-saf/). Se cargó la columna CONTROLADORA (la SAF standalone), no la Consolidado (que suma 3 controladas ajenas al negocio de fútbol: un fundo de investimento imobiliário dueño de la Arena MRV, y 2 SPE de locación/eventos del estadio). Este ejercicio cubre SOLO el período 14/set-31/dic/2023 (~3,5 meses desde la constitución de la SAF), no un año completo — ver comentario de cabecera de data/atleticomineiro-br-data.js. Firmado por Bruno Muzzi como Diretor Presidente. Convertido a USD con PTAX BCB de cierre 31/12/2023 (R$4,8413), el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2023.md.',
  },
  'atleticomineiro-br-demonstracoes-2024': {
    id:'atleticomineiro-br-demonstracoes-2024', clubId:'atleticomineiro-br',
    title:'Demonstrações contábeis individuais e consolidadas do Atlético Mineiro S.A.F., exercício findo em 31 de dezembro de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://atletico.com.br/informacoes-relatorios/',
    note:'PDF oficial (texto nativo). Columna CONTROLADORA. Primer ejercicio con emisión de debêntures reales (60.000 debêntures de R$1.000 nominal cada una, emitidas 25/09/2024, quirografárias, 3,50% a.a., vencimiento 25/09/2027) — sumadas a grossDebt. Firmado por Bruno Muzzi como Diretor Presidente. Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923), ya existente en data/currency-map.js. Transcripción completa en Clubes/Brasil/Atletico Mineiro/demonstracoes-financeiras-saf-2024.md.',
  },
  'atleticomineiro-br-relatorio-integrado-2025': {
    id:'atleticomineiro-br-relatorio-integrado-2025', clubId:'atleticomineiro-br',
    title:'Relatório Integrado 2025 do Atlético Mineiro S.A.F. (demonstrações financeiras + sustentabilidade + governança corporativa)',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://atletico.com.br/informacoes-relatorios/',
    note:'A diferencia de 2023/2024 (PDFs solo-financieros), 2025 se publicó como "Relatório Integrado", un documento único y más amplio (financiero + sustentabilidad + gobernanza corporativa) que incluye las demonstrações financeiras en su propia sección (Balanço/DRE pág. 122-123, Notas explicativas de detalle pág. 168-171 del PDF). Columna CONTROLADORA. Prejuízo do exercício de R$882,109 M (casi triplica 2024), explicado principalmente por una "Perda com Valor Justo" de R$572,161 M (impairment puntual, no recurrente según la propia Nota 1) y un resultado negativo de equivalencia patrimonial de R$180,320 M. El informe del auditor (BDO) incluye 2 párrafos de Ênfase sin salvedad: transacciones con partes relacionadas (Nota 16, cesión no onerosa de ingresos de boletería/sócio torcedor a la controlada Arena Vencer) y deficiencia de capital circulante neto de R$817,991 M al cierre. Firmado por Pedro Daniel como Diretor Presidente (cambio de gestión respecto de 2023-2024, cuando firmaba Bruno Muzzi). Incluye además una cesión parcial (10%) de derechos económicos de transmisión futuros (Temporadas 2030-2074, R$98,056 M reconocidos en 2025) — ver comentario de cabecera de data/atleticomineiro-br-data.js sobre por qué se cargó como other_income y no como broadcasting. Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024), ya existente en data/currency-map.js. Transcripción completa en Clubes/Brasil/Atletico Mineiro/relatorio-integrado-saf-2025.md.',
  },
});

gestionesByClub['atleticomineiro-br'] = {
  // Confirmado por firma en el propio balance (fuente primaria, no prensa externa).
  muzzi: { nombre:'Bruno Muzzi (Diretor Presidente)', firstYear:2023, lastYear:2024 },
  pedrodaniel: { nombre:'Pedro Daniel (Diretor Presidente)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['atleticomineiro-br'] = null; // no se encontró una cifra total de sócios/sócio torcedor en los documentos
