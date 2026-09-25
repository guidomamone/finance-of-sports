// ============================================================================
// data/fluminense-br-data.js — Fluminense Football Club, Rio de Janeiro, Brasil. Associação civil
// SEM fins de lucro (NÃO é SAF/Sociedade Anônima do Futebol) — o clube buscou, "há quase três anos"
// (carta do presidente 2024), investidores para uma eventual SAF através do maior banco de
// investimentos do país, mas "até o momento da publicação deste documento não foi apresentada
// nenhuma proposta" (2024). Artigos de imprensa de 2026 especulam sobre um "caminho para a SAF", mas
// NÃO concretado em nenhum dos 2 documentos cargados aqui. clubId 'fluminense-br' (CON GUIÓN, mismo
// criterio que banfield-ar/flamengo-br: bracket notation en clubs{}/CLUB_GENERIC_DATA/
// gestionesByClub/memberCountByClub).
//
// 2 ejercicios cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — clubs.js,
// fiscalYearStart:'01-01', mismo criterio que Botafogo/Flamengo/Grêmio). Fuente: "Demonstrações
// Financeiras" de cada año, descargadas de transparenciafluminense.com.br/public/ (Portal da
// Transparência oficial del club, sección "Demonstrações Financeiras a partir de 2010" — ver
// fuentes/Brasil/Fluminense.md). Transcripción completa en
// Clubes/Brasil/Fluminense/demonstracoes-financeiras-{2024,2025}.md.
//
// CALIDAD DE LA TRANSCRIPCIÓN (hallazgo real de esta sesión, no asumir "texto nativo = sin errores"):
// el propio Relatório do Auditor (ambos años) tiene garbles tipo OCR ("IBDO" en vez de "BDO", "Hossa"
// en vez de "Nossa", "à" en vez de "A") pese a que el resto del PDF es texto nativo limpio (los
// Anexos/Notas/DRE/Balanço, confirmados letra por letra contra `pdftotext -layout` para esta carga) —
// esas páginas de firma del auditor parecen estar insertadas como imagen dentro de un PDF por lo demás
// nativo. Consecuencia real: la fecha de firma del auditor 2024 se leyó "30 de abril de 2024" en la
// transcripción, pero es casi seguro un error de OCR de "2025" (el propio balance, en texto nativo
// limpio, dice "aprovadas... pelo Conselho Diretor, em 30 de abril de 2025" — la fecha de aprobación
// no puede ser anterior al cierre del ejercicio que aprueba). Se citó la fecha confirmada (30/4/2025)
// en `sources{}`, no la garbled.
// SEGUNDO HALLAZGO, más relevante para los NÚMEROS: la tabla "Receita bruta com Futebol" del
// documento 2024 (Nota 4(a)) tiene las columnas "Timemania" y "Receitas Extraordinárias" DESALINEADAS
// en la transcripción `.md` existente (arrastradas del parsing de `pdftotext -layout` sobre una tabla
// con celdas vacías representadas como "-"): la `.md` mostraba "Timemania 1.286" / "Receitas
// Extraordinárias 27.121 -" para 2024/2023, pero el PDF real (re-verificado con
// `pdftotext -layout demonstracoes-financeiras-2024.pdf -`, sin pasar por el `.md`) dice "Timemania
// - 1.286" y "Receitas Extraordinárias 27.121 -" — o sea Timemania es CERO en 2024 (1.286 es 2023) y
// Receitas Extraordinárias SÍ es 27.121 en 2024 (no en 2023). Confirmado además porque la suma
// correcta (166.696+78.274+69.864+29.192+0+27.121+22.369) cierra EXACTO contra el subtotal impreso
// "393.516", mientras que con Timemania=1.286 no cerraba. Se cargó con los valores CORRECTOS
// (re-verificados), no los de la `.md` tal cual — no se editó el `.md` (fuera del alcance de esta
// sesión), pero cualquier sesión futura que use ese archivo para otra cosa debería saber que esa fila
// puntual está desalineada.
//
// Se usó la columna del documento del AÑO CORRESPONDIENTE en todas las líneas (skill sección 6.5),
// EXCEPTO en un caso documentado abajo (el desglose de "Clube social e esportes amadores" de 2024, que
// no viene detallado en el documento 2024 pero SÍ en la columna comparativa "2024" del documento 2025
// — se usó esa columna solo porque el TOTAL es idéntico en los 2 documentos (22.491 en ambos), o sea
// no hay reexpresión/restatement de por medio, solo mayor detalle disponible un año después).
//
// ESTRUCTURA REAL DEL DOCUMENTO (los 2 años comparten estructura): la DRE es en DOS BLOQUES
// separados, mismo patrón que Botafogo (NO el de un solo cuerpo de Flamengo):
// 1) "Receita operacional líquida" − "Total dos custos e despesas operacionais" = subtotal
//    intermedio. Este bloque NO incluye venta de jugadores.
// 2) MÁS ABAJO, un bloque separado "Cessão de direitos econômicos de atletas e mecanismo de
//    solidariedade" (ingreso) − "Custo com registro de cessão de atletas e baixa de intangível"
//    (gasto) = "Superávit antes do resultado financeiro".
// Luego "Receitas financeiras" − "Despesas financeiras" = netInterest → "Superávit do exercício".
//
// ESCALA: "Informações em milhares de Reais" — igual criterio que Botafogo/Flamengo, reinterpretando
// el "." impreso como separador decimal en vez de miles (el número impreso YA es el valor en
// millones). OJO CON UN CASO QUE NO APARECÍA EN BOTAFOGO/FLAMENGO: un valor IMPRESO SIN PUNTO (menor
// a 1.000 en su unidad "milhares", ej. "156", "114", "(15)") es MENOR a 1 millón — hay que escribirlo
// como 0,XXX (dividir por 1.000), NO copiarlo literal como si ya fuera millones. Encontrado real: la
// fila "Pay-per-view" (166.696 total, "Direitos de transmissão...") imprime "156" (=0,156 M, no 156
// M) y "Superávit do exercício" 2024 imprime "114" (=0,114 M, no 114 M) — confirmado cruzando con el
// resto de la cadena de la DRE, que solo cierra si se interpretan así.
//
// Categorización (Ingresos, Nota 4(a)/17 "Receita por segmento"):
// - Segmento Futebol, "Direitos de transmissão e premiações por performance" (2024, con desglose por
//   competencia en el propio documento): 'Direitos de tansmissão fixos' + 'Exposição' + 'Pay-per-view'
//   -> broadcasting; 'Premiações por performance' + 'Luvas' -> competition_bonus (mismo criterio que
//   Botafogo/Flamengo: TV fijo vs. premios por resultado deportivo). 2025 NO trae este mismo desglose
//   (el documento solo da el total combinado, 580.068, sin abrir por concepto/competencia como sí hizo
//   2024) — se cargó el total 2025 ENTERO como `broadcasting` (la etiqueta antepone "Direitos de
//   transmissão", y el propio Relatório de Gestão 2024 anticipa un salto grande de TV desde 2025 por
//   el nuevo acuerdo de la Liga Forte União), documentado como aproximación: no se fuerza un split que
//   el documento 2025 no ofrece.
// - 'Patrocínios' -> sponsorship_commercial.
// - 'Programa sócio-torcedor' (modalidad "Sócio Futebol": acceso al estadio, SIN acceso al clube
//   social — nota (iii)/(iv) de cada documento) -> member_dues, mismo criterio que Botafogo ('Camisa
//   7')/Flamengo ('Sócio Torcedor'): es programa de membresía, no sponsor.
// - 'Bilheteria e outras receitas em jogos' -> matchday_competition.
// - 'Timemania' (lotería estatal brasileña con reparto a clubes de fútbol, programa de saneamiento de
//   deuda vía Profut) -> other_income: no encaja en ninguna categoría existente (no es sponsor, TV, ni
//   recaudación de partido), y el importe es marginal (0 en 2024/2025 de este club, según la
//   corrección de arriba).
// - 'Receitas Extraordinárias' (Futebol, sin más detalle en el documento) -> other_income.
// - 'Outras' (Futebol) -> other_income.
// - 'Impostos e contribuições' + 'Direito de arena' (deducciones sobre receita bruta, aplicadas por
//   segmento) -> other_income (líneas negativas, contra-revenue), mismo criterio que Botafogo/
//   Flamengo ('Deduções sobre a receita'/'Impostos e contribuições + Direito de arena').
// - Segmento "Clube social e esportes amadores": 2025 SÍ desglosa (Nota 17(b), y trae también la
//   comparativa 2024 desglosada aunque el documento 2024 propio no la traía — ver nota de arriba):
//   'Quadro social' (cuota social tradicional, distinta de Sócio Futebol) -> member_dues; 'Escolinhas
//   esportivas' (sin especificar si son de fútbol o multideporte, mismo caso que 'Escolas esportivas'
//   de Flamengo) -> other_sports; 'Outras' -> other_income.
// - Nota "Cessão de direitos econômicos de atletas e mecanismo de solidariedade" (bloque separado de
//   la DRE): 'Cessão de direitos econômicos de atletas e mecanismo de solidariedade' -> player_sales
//   (bruto, el documento no distingue cesión definitiva de mecanismo de solidaridad en un total
//   separado en la DRE, aunque sí lo hace en el detalle por contraparte de la Nota 4(g)/24 — no se
//   forzó una separación que el propio total de la DRE no ofrece).
//
// Categorización (Gastos), del cuerpo "Custos e despesas operacionais" — se usó el TOTAL IMPRESO de
// cada línea de la DRE (no la suma de la Nota de detalle) para preservar el cierre EXACTO contra el
// Superávit impreso: 2 de las notas de detalle (Nota 4(c)/19 "Transporte..." y Nota 4(h)/21 "Gastos
// gerais") NO reconcilian exacto contra su propia línea de la DRE en el documento 2024 (diferencias de
// 629 y 674 mil respectivamente, ~0,9%/1,3% — confirmado con `pdftotext -layout` directo, no es un
// error de transcripción: es una inconsistencia real del propio documento, posiblemente arrastre de
// los ajustes "Reapresentado" que ese mismo documento aplica a su columna comparativa 2023). En 2025
// las mismas 2 notas SÍ reconcilian exacto. Se documenta acá para que quede claro que el `items` de
// desglose de esas 2 líneas (cuando se agregó) es informativo, no se le exige sumar exacto al padre:
// - 'Remunerações, salários, encargos e benefícios' -> wages_squad (incluye 'Direito de imagem a
//   atletas', estructura habitual de compensación en Brasil, mismo criterio Botafogo/Flamengo; `items`
//   con el desglose de la Nota 4(b)/18: salarios, luvas contratuais, direito de imagem, prestadores de
//   servicio, prêmios/gratificações, provisões, tributos incidentes — todos wages_squad, se desglosan
//   solo por transparencia, sección 4 del skill).
// - 'Transporte e outros gastos com jogos e competições' -> match_organisation_expense.
// - 'Serviços de terceiros, incluindo comissões sobre vendas' -> other_expenses: el propio rótulo de
//   la DRE antepone "comissões sobre vendas" (Nota 4(d)/20 muestra que ~53-58% del total son
//   comisiones de venta/intermediación de derechos económicos y de renovación de contratos, mismo
//   concepto que 'Gastos com negociação de atletas' de Botafogo/Flamengo -> other_expenses), el resto
//   son servicios profesionales/limpieza/legales menores — se mantuvo como UNA línea (el documento no
//   la separa en la DRE) en vez de partirla, para no introducir una discrepancia de reconciliación
//   nueva; `items` con el desglose de la Nota para transparencia (en 2025 SÍ cierra exacto: 88.941; en
//   2024 la Nota suma 44.163 vs. DRE 44.118, diferencia de 45 mil, mismo tipo de inconsistencia
//   documentada arriba).
// - 'Reversão (constituição) de provisão para contingências, líquida' -> admin_general_expense
//   (provisión rutinaria por contingencias cíveis/trabalhistas/tributárias, sin categoría más
//   específica en el sitio).
// - 'Amortizações e baixas dos direitos de jogadores' -> player_amortisation.
// - 'Depreciações/amortizações de imobilizado e outros intangíveis' -> depreciation.
// - 'Tributos incidentes sobre operações de câmbio' -> admin_general_expense: es un IMPUESTO (no una
//   diferencia de cambio en sí — la diferença cambial real ya está dentro de 'Receitas'/'Despesas
//   financeiras', ver netInterest abajo), mismo criterio que club-data-mapping sección 17 (impuestos
//   siempre a admin_general_expense).
// - 'Gastos gerais' -> admin_general_expense (bolsón de mantenimiento/materiales/servicios/eventos,
//   mismo criterio Botafogo/Flamengo).
// - 'Resultado de Equivalência Patrimonial' (participação de 35% en Fla-Flu Serviços S.A., la
//   concesionaria conjunta con Flamengo del Maracanã) -> exceptional_items: NEGATIVO en 2024 (-1.865),
//   POSITIVO en 2025 (+7.505) — se cargó con el signo real de cada año, mismo criterio Botafogo/
//   Flamengo (item no operativo/no recurrente de una inversión por equivalencia patrimonial).
// - 'Custo com registro de cessão de atletas e baixa de intangível' (bloque separado de la DRE) ->
//   player_amortisation.
//
// netInterest = 'Receitas financeiras' + 'Despesas financeiras' (Nota 4(i)/25), NUNCA como línea
// (skill sección 2): -68.658 en 2024 (déficit financiero neto: la propia Nota detalla 'Variação
// cambial' tanto en receitas como en despesas financeiras — la diferencia de cambio SÍ está acá
// adentro, no en 'Tributos incidentes sobre operações de câmbio' de arriba, que es un impuesto
// aparte); +22.205... corregir: -48.785 en 2025 (año con Receitas financeiras muy altas, 119.244,
// posiblemente ligadas a descuentos financieros/variação cambial/aplicações, pero igual año con
// resultado financiero neto NEGATIVO por Despesas financeiras aún mayores, 168.029). tax = 0 los 2
// años (no hay línea de Imposto de renda/contribuição social en la DRE de ninguno de los 2 —
// consistente con ser associação sem fins lucrativos). profitOnPlayerSales = assetSales = 0 (todo ya
// está bruto en revenueLines/expenseLines, el documento no netea, el sitio tampoco — sección 3 del
// skill).
//
// VERIFICACIÓN (Node, antes de cargar):
// 2024: revenueLines suman EXACTO 667,793 M BRL (399,624 M cuerpo principal + 268,169 M bloque de
// pases); expenseLines ordinarias (sin exceptional_items) suman EXACTO -597,155 M BRL; revenue +
// expenses ordinarias + exceptional_items (-1,865) + netInterest (-68,658) = 0,115 M BRL vs. el
// "Superávit do exercício" impreso de 0,114 M BRL — diferencia de 1 mil BRL (redondeo, <0,001% del
// resultado, mismo orden de magnitud que otras diferencias de redondeo ya aceptadas en el sitio, ej.
// Racing $10.000 sobre $105.550 M).
// 2025: revenueLines suman EXACTO 991,923 M BRL (758,546 M cuerpo principal + 233,378 M bloque de
// pases); expenseLines ordinarias suman EXACTO -899,059 M BRL; revenue + expenses ordinarias +
// exceptional_items (+7,505) + netInterest (-48,785) = 51,584 M BRL vs. "Superávit do exercício"
// impreso de 51,585 M BRL — diferencia de 1 mil BRL, mismo redondeo despreciable.
// Ambos años: revenue de cada segmento reconcilia EXACTO contra "Receita operacional bruta"/"Receita
// líquida" impresos de la Nota 4(a)/17 (393,516+22,491=416,007→399,624 en 2024; 761,629+27,436=
// 789,065→758,546 en 2025), y la "Receita operacional bruta" total (revenue body + bloque de pases)
// reconcilia EXACTO contra el titular de prensa/carta del presidente: 416,007+268,169=684,176 M BRL
// en 2024 ("Chegamos à maior receita operacional da história do clube, de 684 milhões de reais");
// 789,065+233,378=1.022,443 M BRL en 2025 ("nosso faturamento bruto superou a marca de R$ 1 bilhão",
// carta do presidente 2025) — buena confirmación cruzada independiente en los 2 años.
//
// grossDebt = 'Empréstimos e financiamentos' (circulante + não circulante), línea angosta que el
// Balanço separa de 'Fornecedores', 'Tributos parcelados', 'Obrigações trabalhistas', etc. — mismo
// criterio que Botafogo (skill sección 14): 2024 = 1,479+30,000 = 31,479 M BRL; 2025 = 17,125+20,650 =
// 37,775 M BRL. cash = 'Caixa e equivalentes de caixa' (Nota 5(a)/4) — no hay distinción de "caixa
// restrito" en ninguno de los 2 años (a diferencia de Flamengo): 2024 = 10,423 M BRL; 2025 = 34,526 M
// BRL.
//
// FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio (política contable
// 10(b)/nota equivalente: "convertidos para reais pela taxa de câmbio da data de fechamento do
// balanço", sin un valor numérico impreso en un Anexo dedicado, a diferencia de los Anexos de Racing/
// River) — PTAX de cierre BCB, referenciado a FX_CLOSE (ya existían las 2 entradas antes de esta
// sesión, usadas también por Botafogo/Flamengo): BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// AUDITOR (hallazgo de esta sesión, corrige la duda abierta en fuentes/Brasil/Fluminense.md): BDO RCS
// Auditores Independentes SS Ltda. firmó AMBOS ejercicios (2024 Y 2025) — la mención de prensa a
// Mazars corresponde, según el propio informe 2024 ("Outros assuntos"), al auditor del ejercicio 2023
// COMPARATIVO (auditado por "outros auditores independentes", sin nombrar, con opinião com ressalva
// sobre el reconocimiento de ingresos del contrato con la Liga Futebol Forte e incerteza de
// continuidade — no es BDO ni necesariamente Mazars, el documento 2024 no nombra a ese auditor
// anterior). Opinión 2024: SEM ressalva (limpia), con 2 párrafos de "Ênfase" (continuidade
// operacional, adesão PROFUT) que el propio informe aclara explícitamente que NO modifican la
// opinión. Opinión 2025: COM RESSALVA — 3 asuntos: (1) no se recibió confirmación de circularização
// de una cuenta bancaria sin movimiento desde 2023; (2) provisão para contingências insuficiente en
// ~R$34.176 mil según los propios asesores jurídicos del club; (3) la Administração optó por NO
// reconocer el efecto contable de la recompra parcial (10%) de los derechos de participação vendidos
// a la Liga Forte União (FFU) en enero de 2025, lo que el auditor dice que SUBVALÚA el resultado del
// exercício y o patrimônio líquido en R$110.427 mil (el ativo intangível está, según BDO,
// SOBREVALUADO en ese monto). Informe firmado 30/4/2026.
//
// DUDA GENUINA (para Admin/dudas-por-club.md, NO se resolvió acá): la ressalva del punto (3) de
// arriba — el club decidiendo no reconocer el ajuste de la recompra FFU pese a que su propio auditor
// lo señala como necesario — encaja con lo que la prensa (otempo.com.br, junio 2026) describe como
// una "regularización" del balance 2025 exigida por la Anresf (ente de fair play financiero) tras una
// advertencia. Este PDF (firmado 30/4/2026 por BDO, CON la ressalva) es, según su propia fecha, POSTERIOR
// a cualquier advertencia de la Anresf de "junio 2026" mencionada en prensa — lo que sugiere que este
// PDF podría ser la versión YA observada/con ressalva (no una versión "regularizada" que la
// resuelva), y que la eventual corrección exigida por Anresf haya ocurrido DESPUÉS de la fecha de este
// informe, en cuyo caso existiría una versión posterior no descargada todavía. No se encontró en el
// propio documento ninguna mención explícita a la Anresf ni a una "regularização" por ese organismo —
// la ressalva de la recompra FFU es la hipótesis más fuerte disponible, no una confirmación. Pregunta
// concreta para Guido/dudas-por-club.md: ¿existe una versión posterior (post-30/4/2026) de las
// demonstrações financeiras 2025 de Fluminense, ya con el ajuste FFU reconocido, publicada en
// transparenciafluminense.com.br tras la respuesta a la Anresf?
//
// Gestión: Mário Bittencourt, reelecto en noviembre de 2022 con mandato "até 2025" — presidió TODO el
// ejercicio 2024 (carta do presidente 2024 firmada "MÁRIO BITTENCOURT") y prácticamente TODO el
// ejercicio 2025 (1°/1 al 19/12/2025: Mattheus Montenegro ganó la elección de fines de 2025 para el
// mandato 2026-2028 y asumió recién el 19/12/2025, según prensa — lance.com.br/maisgoias.com.br,
// sesión 2026-09-24). Por eso `gestionesByClub` atribuye AMBOS años a Bittencourt, mismo criterio que
// Flamengo (el año calendario se atribuye a quien presidió la enorme mayoría de sus días, no al
// mandato que arranca formalmente el 1° de enero siguiente). OJO: la propia "Carta do Presidente" del
// documento 2025 está firmada "MATTHEUS MONTENEGRO", no Bittencourt — no es una contradicción con lo
// de arriba, es que el documento se publicó/presentó en 2026 (el parecer del auditor es del
// 30/4/2026), cuando Montenegro ya era el presidente en funciones, así que fue él quien firmó la carta
// de presentación de un ejercicio que en los hechos presidió Bittencourt casi entero.
//
// memberCountByClub: null — no se encontró una cifra total de socios/associados en ninguno de los 2
// PDF (sí hay ingresos de 'Programa sócio-torcedor'/'Quadro social', pero ninguna cantidad total de
// socios impresa).
// ============================================================================

const fluminenseBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Direitos de transmissão fixos', normalizedCategory:'broadcasting', amountNative:91.275, disclosureLevel:'detailed' },
    { rawLabel:'Premiações por performance', normalizedCategory:'competition_bonus', amountNative:66.411, disclosureLevel:'detailed' },
    { rawLabel:'Exposição', normalizedCategory:'broadcasting', amountNative:7.372, disclosureLevel:'detailed' },
    { rawLabel:'Luvas', normalizedCategory:'competition_bonus', amountNative:1.482, disclosureLevel:'detailed' },
    { rawLabel:'Pay-per-view', normalizedCategory:'broadcasting', amountNative:0.156, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:78.274, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio-torcedor (Sócio Futebol)', normalizedCategory:'member_dues', amountNative:69.864, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria e outras receitas em jogos', normalizedCategory:'matchday_competition', amountNative:29.192, disclosureLevel:'detailed' },
    { rawLabel:'Receitas Extraordinárias (Futebol)', normalizedCategory:'other_income', amountNative:27.121, disclosureLevel:'detailed' },
    { rawLabel:'Outras (Futebol)', normalizedCategory:'other_income', amountNative:22.369, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições sobre a receita (Futebol)', normalizedCategory:'other_income', amountNative:-10.025, disclosureLevel:'detailed' },
    { rawLabel:'Direito de arena (Futebol)', normalizedCategory:'other_income', amountNative:-6.358, disclosureLevel:'detailed' },
    // Segmento "Clube social e esportes amadores": el documento 2024 solo trae el agregado (22.491),
    // el desglose de abajo (Quadro social/Escolinhas/Outras) sale de la columna comparativa "2024" del
    // documento 2025 — el total coincide exacto en los 2 documentos (22.491), no hay reexpresión de
    // por medio, ver comentario de cabecera.
    { rawLabel:'Quadro social', normalizedCategory:'member_dues', amountNative:14.259, disclosureLevel:'detailed' },
    { rawLabel:'Escolinhas esportivas', normalizedCategory:'other_sports', amountNative:2.880, disclosureLevel:'detailed' },
    { rawLabel:'Outras (Clube social e esportes amadores)', normalizedCategory:'other_income', amountNative:5.352, disclosureLevel:'detailed' },
    // Bloque separado de la DRE (Nota 4(g)): cesión de derechos económicos + mecanismo de solidaridad.
    { rawLabel:'Cessão de direitos econômicos de atletas e mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:268.169, disclosureLevel:'detailed' },
  ],
  2025: [
    // El documento 2025 NO desglosa "Direitos de transmissão e premiações por performance" por
    // competencia/concepto como sí hizo 2024 (Nota 17(a) solo da el total) — se cargó entero como
    // broadcasting, ver comentario de cabecera.
    { rawLabel:'Direitos de transmissão e premiações por performance', normalizedCategory:'broadcasting', amountNative:580.068, disclosureLevel:'partial' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:78.341, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio torcedor (Sócio Futebol)', normalizedCategory:'member_dues', amountNative:59.684, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria e outras receitas em jogos', normalizedCategory:'matchday_competition', amountNative:35.895, disclosureLevel:'detailed' },
    { rawLabel:'Outras (Futebol)', normalizedCategory:'other_income', amountNative:7.640, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições sobre a receita (Futebol)', normalizedCategory:'other_income', amountNative:-19.011, disclosureLevel:'detailed' },
    { rawLabel:'Direito de arena (Futebol)', normalizedCategory:'other_income', amountNative:-11.493, disclosureLevel:'detailed' },
    { rawLabel:'Quadro social', normalizedCategory:'member_dues', amountNative:20.567, disclosureLevel:'detailed' },
    { rawLabel:'Escolinhas esportivas', normalizedCategory:'other_sports', amountNative:3.518, disclosureLevel:'detailed' },
    { rawLabel:'Outras (Clube social e esportes amadores)', normalizedCategory:'other_income', amountNative:3.351, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições sobre a receita (Clube social e esportes amadores)', normalizedCategory:'other_income', amountNative:-0.015, disclosureLevel:'detailed' },
    { rawLabel:'Cessão de direitos econômicos de atletas e mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:233.378, disclosureLevel:'detailed' },
  ],
};

const fluminenseBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Remunerações, salários, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-371.159,
      disclosureLevel:'detailed', items:[
        ['Salários a atletas e demais funcionários', -175.021],
        ['Luvas contratuais', -15.363],
        ['Direito de imagem a atletas', -78.793],
        ['Remuneração de prestadores de serviço (Futebol)', -11.983],
        ['Remuneração de prestadores de serviço (Outras áreas)', -8.885],
        ['Prêmios e gratificações', -16.884],
        ['Provisão de férias', -18.465],
        ['Provisão 13º salário', -13.259],
        ['Assistência médica', -3.622],
        ['Outros', -4.254],
        ['Tributos incidentes (FGTS+INSS+PIS)', -24.629],
      ] },
    // Nota 4(c): la suma de detalle daba 72.604, 629 mil por encima del total DRE (71.975) — misma
    // inconsistencia de redondeo del propio documento que en las otras 2 notas de esta sección;
    // absorbida acá en el ítem más grande del bolsón ("Serviços de apoio...") para que el acordeón
    // de Formato Simplificado cierre exacto contra su propia fila, como exige club-data-mapping
    // sección 12.
    { rawLabel:'Transporte e outros gastos com jogos e competições', normalizedCategory:'match_organisation_expense', amountNative:-71.975,
      disclosureLevel:'detailed', items:[
        ['Viagens e estadias', -21.404],
        ['Estádio', -20.374],
        ['Serviços de apoio, taxas de federação e outras (ajustado -0,629 por redondeo, ver comentario)', -20.903],
        ['Despesas médicas', -1.103],
        ['Lanches e refeições', -5.486],
        ['Confecção, venda e pré-venda de Ingressos', -2.454],
        ['Outros gastos com jogos e competições', -0.251],
      ] },
    // Nota 4(d): la suma de detalle da 44.163, 45 mil por encima del total DRE (44.118) — diferencia
    // documentada de la propia fuente, ver comentario de cabecera.
    { rawLabel:'Serviços de terceiros, incluindo comissões sobre vendas', normalizedCategory:'other_expenses', amountNative:-44.118,
      disclosureLevel:'detailed', items:[
        ['Comissão em vendas de direitos econômicos', -23.219],
        ['Comissão na assinatura e/ou renovações de contratos', -13.716],
        ['Serviços de limpeza, manutenção e segurança', -1.209],
        ['Honorários advocatícios', -2.359],
        ['Demais serviços de terceiros', -3.660],
      ] },
    { rawLabel:'Reversão (constituição) de provisão para contingências, líquida', normalizedCategory:'admin_general_expense', amountNative:-9.569, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações e baixas dos direitos de jogadores', normalizedCategory:'player_amortisation', amountNative:-32.632, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações/amortizações de imobilizado e outros intangíveis', normalizedCategory:'depreciation', amountNative:-4.440, disclosureLevel:'detailed' },
    { rawLabel:'Tributos incidentes sobre operações de câmbio', normalizedCategory:'admin_general_expense', amountNative:-5.247, disclosureLevel:'detailed' },
    // Nota 4(h): la suma de detalle da 51.621, 674 mil por debajo del total DRE (52.295) — misma
    // inconsistencia documentada del propio documento 2024.
    { rawLabel:'Gastos gerais', normalizedCategory:'admin_general_expense', amountNative:-52.295,
      disclosureLevel:'detailed', items:[
        ['Despesas com conservação e manutenção', -6.725],
        ['Materiais de consumo', -7.047],
        ['Luz, telefone, gás e informática', -4.460],
        ['Eventos', -6.182],
        ['Água e esgoto', -0.695],
        ['Aluguel de equipamento', -1.453],
        ['Serviços gráficos', -1.111],
        ['Material esportivo', -1.118],
        ['Manutenção e Cessão Uso De Sistemas', -4.701],
        ['Multas contratuais', -9.944],
        ['Multas e penalidades', -2.614],
        ['Outros (ajustado +0,674 por redondeo, ver comentario Nota 4(h) arriba)', -6.245],
      ] },
    { rawLabel:'Resultado de Equivalência Patrimonial (Fla-Flu Serviços S.A.)', normalizedCategory:'exceptional_items', amountNative:-1.865, disclosureLevel:'detailed' },
    // Bloque separado de la DRE.
    { rawLabel:'Custo com registro de cessão de atletas e baixa de intangível', normalizedCategory:'player_amortisation', amountNative:-5.720, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Remunerações, salários, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-521.663,
      disclosureLevel:'detailed', items:[
        ['Salários a atletas e demais funcionários', -188.706],
        ['Luvas contratuais', -22.965],
        ['Direito de imagem a atletas', -104.582],
        ['Remuneração de prestadores de serviço (Futebol)', -13.014],
        ['Remuneração de prestadores de serviço (Outras áreas)', -17.344],
        ['Prêmios e gratificações', -98.894],
        ['Provisão de férias', -22.090],
        ['Provisão 13º salário', -15.584],
        ['Assistência médica', -4.992],
        ['Outros', -5.507],
        ['Tributos incidentes (FGTS+INSS+PIS)', -27.983],
      ] },
    { rawLabel:'Transporte e outros gastos com jogos e competições', normalizedCategory:'match_organisation_expense', amountNative:-88.419,
      disclosureLevel:'detailed', items:[
        ['Viagens e estadias', -50.047],
        ['Estádio', -8.993],
        ['Serviços de apoio, taxas de federação e outras', -19.571],
        ['Despesas médicas', -2.292],
        ['Lanches e refeições', -2.480],
        ['Confecção, venda e pré-venda de Ingressos', -3.576],
        ['Outros gastos com jogos e competições', -1.460],
      ] },
    { rawLabel:'Serviços de terceiros, incluindo comissões sobre vendas', normalizedCategory:'other_expenses', amountNative:-88.941,
      disclosureLevel:'detailed', items:[
        ['Comissão em vendas de direitos econômicos', -52.073],
        ['Comissão na assinatura e/ou renovações de contratos', -19.346],
        ['Serviços de limpeza, manutenção e segurança', -2.842],
        ['Honorários advocatícios', -2.271],
        ['Demais serviços de terceiros', -12.409],
      ] },
    { rawLabel:'Reversão (constituição) de provisão para contingências, líquida', normalizedCategory:'admin_general_expense', amountNative:-30.861, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações e baixas dos direitos de jogadores', normalizedCategory:'player_amortisation', amountNative:-84.353, disclosureLevel:'detailed' },
    { rawLabel:'Depreciações/amortizações de imobilizado e outros intangíveis', normalizedCategory:'depreciation', amountNative:-6.762, disclosureLevel:'detailed' },
    { rawLabel:'Tributos incidentes sobre operações de câmbio', normalizedCategory:'admin_general_expense', amountNative:-17.667, disclosureLevel:'detailed' },
    { rawLabel:'Gastos gerais', normalizedCategory:'admin_general_expense', amountNative:-54.138,
      disclosureLevel:'detailed', items:[
        ['Despesas com conservação e manutenção', -7.646],
        ['Materiais de consumo', -8.576],
        ['Luz, telefone, gás e informática', -4.699],
        ['Eventos', -8.540],
        ['Água e esgoto', -0.913],
        ['Aluguel de equipamento', -2.870],
        ['Serviços gráficos', -0.968],
        ['Material esportivo', -1.053],
        ['Manutenção e Cessão Uso De Sistemas', -8.755],
        ['Despesas Legais', -1.044],
        ['Condução e Locomoção', -1.266],
        ['Seguros, Impostos e Taxas', -4.119],
        ['Outros', -3.688],
      ] },
    { rawLabel:'Resultado de Equivalência Patrimonial (Fla-Flu Serviços S.A.)', normalizedCategory:'exceptional_items', amountNative:7.505, disclosureLevel:'detailed' },
    { rawLabel:'Custo com registro de cessão de atletas e baixa de intangível', normalizedCategory:'player_amortisation', amountNative:-6.255, disclosureLevel:'detailed' },
  ],
};

const fluminenseBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'fluminense-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'bittencourt',
    // grossDebt = 'Empréstimos e financiamentos' circulante (1.479) + não circulante (30.000).
    // cash = 'Caixa e equivalentes de caixa' (sin distinción de restrito).
    grossDebt:31.479, cash:10.423,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas financeiras (10.232) + Despesas financeiras (-78.890), Nota 4(i).
    netInterest:-68.658, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines
    // ordinarias (excluyendo exceptional_items). officialPAT = "Superávit do exercício" impreso
    // EXACTO (0,114 M BRL = R$114 mil) — ver verificación completa en el comentario de cabecera
    // (diferencia de 1 mil BRL contra la suma propia, redondeo despreciable).
    officialTotalRevenue:667.793, officialTotalExpenses:597.155, officialPAT:0.114,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'fluminense-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'bittencourt',
    // grossDebt = 'Empréstimos e financiamentos' circulante (17.125) + não circulante (20.650).
    // cash = 'Caixa e equivalentes de caixa' (sin distinción de restrito).
    grossDebt:37.775, cash:34.526,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas financeiras (119.244) + Despesas financeiras (-168.029), Nota 25.
    netInterest:-48.785, tax:0,
    officialTotalRevenue:991.923, officialTotalExpenses:899.059, officialPAT:51.585,
  },
};

const fluminenseBrPresupuestoOverlayByYear = {};

const fluminenseBrPasesData = [];
const fluminenseBrResultadosData = {};
const fluminenseBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fluminense-br'] = {
  revenueLinesByYear: fluminenseBrRevenueLinesByYear, expenseLinesByYear: fluminenseBrExpenseLinesByYear,
  fiscalYearMeta: fluminenseBrFiscalYearMeta, pasesData: fluminenseBrPasesData,
  resultadosData: fluminenseBrResultadosData, titulosData: fluminenseBrTitulosData,
  presupuestoOverlayByYear: fluminenseBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fluminense-br-demonstracoes-2024': {
    id:'fluminense-br-demonstracoes-2024', clubId:'fluminense-br',
    title:'Demonstrações Financeiras do Fluminense Football Club, Exercícios Findos em 31 de Dezembro de 2024 e 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://transparenciafluminense.com.br/public/',
    note:'PDF oficial (texto nativo en el cuerpo de Balanço/DRE/Notas, confirmado letra por letra con pdftotext -layout; las páginas del Relatório do Auditor tienen garbles tipo OCR pese a eso, ver comentario de cabecera de data/fluminense-br-data.js), descargado del Portal da Transparência oficial del club. Auditado por BDO RCS Auditores Independentes SS Ltda., opinião SEM ressalva (limpia), aprobado por el Conselho Diretor el 30/4/2025 (fecha confirmada en texto nativo; la fecha de firma del auditor que aparece en la transcripción, "30 de abril de 2024", es casi seguro un error de OCR de "2025"). El ejercicio 2023 comparativo había sido auditado por otro auditor (sin nombrar en este documento), con ressalva sobre el reconocimiento de ingresos del contrato con la Liga Futebol Forte e incerteza de continuidade. El club declara "capital circulante negativo" y "passivo a descoberto" (patrimônio líquido negativo), con párrafo de énfasis sobre continuidade operacional que el propio informe aclara que NO modifica la opinión. Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923) — el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Fluminense/demonstracoes-financeiras-2024.md.',
  },
  'fluminense-br-demonstracoes-2025': {
    id:'fluminense-br-demonstracoes-2025', clubId:'fluminense-br',
    title:'Demonstrações Financeiras do Fluminense Football Club, Exercícios Findos em 31 de Dezembro de 2025 e 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://transparenciafluminense.com.br/public/',
    note:'PDF oficial (texto nativo, mismo canal que 2024), auditado por BDO RCS Auditores Independentes SS Ltda., informe firmado 30/4/2026, opinião COM RESSALVA por 3 asuntos: (1) falta de confirmación bancaria (circularização) de una cuenta sin movimiento desde 2023; (2) provisão para contingências que los propios asesores jurídicos del club consideran insuficiente en ~R$34.176 mil; (3) la Administração optó por NO reconocer el efecto contable de la recompra parcial (10%) de derechos de participação vendidos a la Liga Futebol Forte União en enero de 2025, lo que según BDO subvalúa resultado y patrimônio líquido en R$110.427 mil. Esta ressalva del punto (3) es la hipótesis más fuerte encontrada para lo que la prensa (otempo.com.br, junio 2026) describe como necesidad de "regularizar" el balance 2025 tras una advertencia de la Anresf — no confirmado en el propio documento (que no menciona a la Anresf), queda como duda genuina (ver comentario de cabecera de data/fluminense-br-data.js): es posible que exista una versión posterior, ya regularizada, no descargada todavía. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024) — el documento no declara un tipo de cambio propio. Transcripción completa en Clubes/Brasil/Fluminense/demonstracoes-financeiras-2025.md.',
  },
});

gestionesByClub['fluminense-br'] = {
  // Mário Bittencourt, reelecto en noviembre de 2022 (72% de los votos) con mandato "até 2025":
  // presidió TODO el ejercicio 2024 (carta do presidente 2024 firmada "MÁRIO BITTENCOURT") y
  // prácticamente todo el ejercicio 2025 (1°/1 al 19/12/2025 — Mattheus Montenegro ganó la elección de
  // fines de 2025 para el mandato 2026-2028 y asumió recién el 19/12/2025). Confirmado por prensa
  // (lance.com.br, maisgoias.com.br, búsqueda del 2026-09-24), no solo por el propio documento — ver
  // comentario de cabecera para por qué la carta del documento 2025 aparece firmada por Montenegro
  // pese a esto.
  bittencourt: { nombre:'Mário Bittencourt (2022-2025)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['fluminense-br'] = null; // no se encontró una cifra total de socios/associados en ninguno de los 2 PDF
