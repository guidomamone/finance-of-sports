// ============================================================================
// data/cruzeiro-data.js — Cruzeiro Esporte Clube SAF (Belo Horizonte, MG, Brasil).
// 4 ejercicios cargados: 2025, 2024, 2023 y 2022 (ejercicio social = AÑO CALENDARIO completo, 1°/1
// a 31/12 — ver clubs.js, fiscalYearStart:'01-01', isCalendarYearClub() en js/finanzas-calc.js).
//
// Fuente 2025: "Informativo Financeiro 2025" (Demonstrações Financeiras), exercícios findos em
// 31/12/2025 e 2024, bajado del bucket S3 propio del club
// (cruzeiro-website-project-documents.s3.us-east-1.amazonaws.com). PDF con texto nativo,
// transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2025.md. A diferencia de
// Botafogo, este documento NO separa Controladora/Consolidado — una sola columna de valores.
//
// Fuente 2024: "Informativo Financeiro" (Demonstrações Financeiras) da SAF Cruzeiro, exercícios
// findos em 31/12/2024 e 2023 (documento DISTINTO del de 2025, con su propio comparativo 2023 no
// cargado). Transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2024.md. Mismo
// criterio de moneda/escala. Categorización rubro por rubro comparada palabra por palabra contra el
// ejercicio 2025 ya cargado (club-or-year-onboarding SKILL.md sección 9): donde el rótulo coincide
// exacto, misma normalizedCategory; donde el documento 2024 agrupa distinto (ej. "Patrocínio e
// publicidade" en una sola línea, vs. "Patrocínio"/"Publicidade" separadas en 2025), se cargó tal
// cual lo reporta ESE documento, misma categoría de destino igual. La numeración de Notas de este
// documento tiene una inconsistencia propia entre su índice (26-30) y sus encabezados de cuerpo
// (25-29, un desfasaje de 1 que arrastra el propio PDF) — los comentarios de abajo usan la
// numeración del CUERPO (la que efectivamente encabeza cada nota).
//
// ESCALA: valores originales "em milhares de reais" (miles de reales), acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Grêmio/Botafogo).
//
// ESTRUCTURA REAL DEL DOCUMENTO: la DRE tiene 2 bloques de revenue/expense:
// 1) "RECEITA OPERACIONAL LIQUIDA" (599.175, detalle en Nota 26) − "Custo das atividades esportivas"
//    (-680.223, Nota 27) − "Despesas gerais e administrativas" (-10.224, Nota 28) + "Outras
//    receitas/despesas" (20.867, Nota 29, con líneas de venta de jugadores adentro) = "PREJUÍZO ANTES
//    DO RESULTADO FINANCEIRO" (-70.405).
// 2) Resultado financeiro líquido (Nota 30, -44.495) → "PREJUÍZO (LUCRO) DO EXERCÍCIO" (-114.900).
// Ningún subtotal intermedio se cargó como línea propia (serían duplicados).
//
// Categorización:
// - Nota 26 (revenue): 'Bilheteria' -> matchday_competition; 'Programa sócio torcedor' ->
//   member_dues; 'Patrocínio'/'Publicidade'/'Royalties e licenciamento' -> sponsorship_commercial;
//   'Direitos de transmissão fixos e premiações por performance' -> broadcasting (el documento
//   combina TV + bonos de rendimiento en UNA sola línea por competencia, sin desglosar cada
//   componente — se mantiene entera bajo broadcasting, es lo que MÁS pesa conceptualmente en esta
//   línea según el propio nombre); 'Outros' -> other_income; 'Impostos e contribuições/Vendas
//   canceladas' (deducción) -> other_income.
// - Sub-nota (iii) 'Mecanismo de solidariedade e outros' SE PROMOVIÓ a 3 líneas de primer nivel
//   (mismo criterio que Racing, club-data-mapping SKILL.md sección 1: cada sub-ítem tiene categoría
//   real distinta) — 'Mecanismo de solidariedade' (recebido) -> youth_football; 'Cessão temporária'
//   -> player_sales; 'Outros' (de esa sub-nota) -> other_income.
// - Nota 27 (Custo das atividades esportivas): 'Salários, direito de imagem, encargos e benefícios'
//   -> wages_squad; 'Amortizações do intangível' -> player_amortisation; 'Baixa do ativo intangível'
//   -> player_impairment (deterioro, distinto de la amortización regular); 'Custos diretos e
//   indiretos com jogos'/'Custos com viagens e hospedagens'/'Custos com Fretamentos e
//   Passagens'/'Custos com alimentação'/'Direito de Arena'/'Manutenção campos de futebol'/'Serviço de
//   segurança e vigilância' -> match_organisation_expense (todos costos operativos de competir);
//   'Serviços de assessoria e consultoria' -> admin_general_expense; 'Depreciação' -> depreciation;
//   'Manutenção geral' -> admin_general_expense (mantenimiento de instalaciones más amplio que solo
//   canchas); 'Taxas de legalização de jogadores'/'Outros custos' -> other_expenses.
// - Nota 28 (Despesas G&A): 'Salários, encargos e benefícios'/'Serviços contratados de
//   terceiros'/'Despesas Comerciais'/'Outros' -> admin_general_expense; 'Amortizações' ->
//   other_amortisation (intangibles administrativos, distinto de la amortización de pases de la
//   Nota 27).
// - Nota 29 (Outras receitas/despesas, debajo del resultado operativo principal): 'Receita de
//   transferência de atletas' -> player_sales; 'Baixa do custo de atletas pela venda de direitos
//   intangíveis' -> player_amortisation (costo contable asociado a la venta, mismo criterio que
//   Botafogo Nota 24.3); 'Outras receitas' -> other_income; 'Outras despesas' -> other_expenses.
//
// Verificación (Node, antes de cargar): revenueLines suma EXACTO 627.899 M BRL; expenseLines suma
// EXACTO -698.305 M BRL (con un redondeo interno de ~R$1.000 sobre una base de cientos de millones,
// el propio documento también arrastra ese mismo redondeo entre sus notas — ver Nota 27, suma propia
// de sus 15 líneas da 680.224 contra el 680.223 impreso, diferencia de R$1.000 irrelevante);
// revenue+expenses = -70.406 M BRL ≈ "PREJUÍZO ANTES DO RESULTADO FINANCEIRO" impreso (-70.405,
// misma diferencia de redondeo); + netInterest (-44.495, Nota 30) = -114.901 ≈ "PREJUÍZO DO
// EXERCÍCIO" impreso (-114.900) — dentro de la tolerancia de verifyTieOuts() (<0.01 M = R$10.000).
// officialPAT se cargó con el número EXACTO impreso (-114.900), no la reconstrucción propia.
//
// grossDebt = "Títulos emitidos" circulante (1.801) + não circulante (10.844) = 12.645 M BRL — es la
// única línea de pasivo que representa deuda financiera clásica (el resto del pasivo de Cruzeiro son
// obrigações operativas/con partes relacionadas: luvas a pagar, contas a pagar por transferencias,
// "Auxílio financeiro Cruzeiro Associação", etc., que NO son deuda financiera en el sentido
// tradicional). cash = "Caixa e equivalentes de caixa" (0.702 M BRL) — NO se sumaron "Aplicações
// financeiras e recursos vinculados" (2.700), mismo criterio estricto de "solo caja y bancos" que el
// resto del sitio.
//
// FX: BRL/USD PTAX de cierre 31/12/2025 = R$5,5024 (venda) — investigado externamente (el BCB no
// calculó una PTAX nueva el 31/12, aplicó la regla especial de usar el boletín del 30/12/2025, mismo
// valor). El documento no declara un tipo de cambio propio.
//
// Gestión: no se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién
// preside la SAF Cruzeiro — gestionId queda con una entrada mínima "sin confirmar", mismo criterio
// que Botafogo.
//
// ---------------------------------------------------------------------------------------------
// EJERCICIO 2024 (informativo-financeiro-2024.md) — categorización y verificación
// ---------------------------------------------------------------------------------------------
// Nota 25 (Receita operacional líquida, columna 31/12/2024): 'Bilheteria' -> matchday_competition;
// 'Programa sócio torcedor' -> member_dues; 'Patrocínio e publicidade' (UNA sola línea en este
// documento, a diferencia de 2025 que las separa) -> sponsorship_commercial; 'Direitos de
// transmissão fixos e premiações por performance' -> broadcasting; 'Receitas com royalties e
// licenciamento' -> sponsorship_commercial; 'Outros' -> other_income; '(-) Impostos e
// contribuições/Vendas canceladas' -> other_income (deducción). Sub-nota (iii) 'Mecanismo de
// solidariedade e outros' promovida a líneas de primer nivel, mismo criterio que 2025: 'Mecanismo de
// solidariedade' -> youth_football (7.684); 'Cessão temporária' -> player_sales (3.182);
// 'Rescisão contratual' y 'Outros' de esa sub-nota son $0 en 2024 (solo tuvieron valor en la columna
// comparativa 2023), no se cargó línea para ellos.
// Nota 26 (Custos das atividades esportivas): mismo mapeo que 2025 rubro por rubro donde el rótulo
// coincide ('Salários, direito de imagem, encargos e benefícios' -> wages_squad; 'Amortizações do
// intangível' -> player_amortisation; 'Baixa do ativo intangível' -> player_impairment;
// 'Depreciação' -> depreciation; 'Serviços de assessoria e consultoria' -> admin_general_expense;
// 'Manutenção geral' -> admin_general_expense; 'Taxas de legalização de jogadores'/'Outros custos' ->
// other_expenses); 'Custos diretos e indiretos com jogos'/'Custos com viagens e
// hospedagens'/'Custos com alimentação'/'Direito de Arena' -> match_organisation_expense (2024 no
// desglosa 'Fretamentos e Passagens' ni 'Segurança e vigilância' como líneas propias, a diferencia de
// 2025 — quedan implícitas en las líneas de arriba de esta misma categoría).
// Nota 27 (Despesas gerais e administrativas): 'Salários, encargos e benefícios'/'Serviços
// contratados de terceiros'/'Outros' -> admin_general_expense; 'Amortizações' -> other_amortisation
// (mismo criterio que 2025). 'Despesas comerciais'/'Rescisão de contratos comerciais'/'Assessores –
// Venda de Direitos' son $0 en 2024 (solo en la columna comparativa 2023), no se cargó línea.
// Nota 28 (Outras receitas (despesas), debajo del resultado operativo): 'Receita de transferência de
// atletas' -> player_sales; 'Baixa do custo de atletas pela venda de direitos intangíveis' ->
// player_amortisation; 'Outras receitas' -> other_income; 'Outras despesas' -> other_expenses;
// 'Baixa de ativo imobilizado' (línea nueva, no presente en 2025) -> other_expenses, mismo criterio
// de catch-all que el resto de bajas/ajustes chicos sin categoría propia. 'Receita na venda de
// direitos intangíveis' y 'Provisão para demandas judiciais' son $0 en 2024 (LFU y la provisión de
// RJ fueron eventos de 2023), no se cargó línea.
//
// ESCALA de esta nota, importante para no repetir el error: el documento imprime valores "em
// milhares de reais" con separador de miles brasileño (punto). Un valor de 3 dígitos SIN separador
// (ej. "331", "874", "7", "228", "16") es 0,331/0,874/0,007/0,228/0,016 MILLONES, no 331/874/etc.
// millones — se verificó explícitamente sumando cada nota contra su propio subtotal impreso antes de
// cargar (ver abajo), que es lo que atrapó este error en el primer intento de esta sesión.
//
// Verificación (a mano, antes de cargar, cada nota contra su propio subtotal impreso):
// - Nota 25: 51.069+32.439+57.860+138.072+10.866+15.365+1.920 = 307.591 (Total receita operacional
//   bruta impreso) − 24.878 = 282.713 = RECEITA OPERACIONAL LIQUIDA impresa. ✓
// - Nota 26: suma de las 12 líneas = 395.089 = Custo das atividades esportivas impreso. ✓
// - Nota 27: 13.367+12.358+26.644+12.549 = 64.918 = Despesas G&A impresas. ✓
// - Nota 28: −32.886+0.007+63.978−0.228−0.016 = 30.855 = Outras receitas/despesas impresas. ✓
// - revenueLines[2024] suma 346.698 M BRL (282.713 de Nota 25 + 63.978 player_sales + 0.007
//   other_income de Nota 28). expenseLines[2024] suma −493.137 M BRL (395.089 Nota 26 + 64.918 Nota
//   27 + 32.886+0.228+0.016 de Nota 28, todo en negativo). 346.698 − 493.137 = −146.439 = "LUCRO
//   (PREJUÍZO) ANTES DO RESULTADO FINANCEIRO" impreso, EXACTO (sin redondeo esta vez, a diferencia de
//   2025). + netInterest (−23.469, Nota 29: Receita financeira 6.568 − Despesa financeira 30.037) =
//   −169.908 = "LUCRO (PREJUÍZO) DO EXERCICIO" impreso, EXACTO. officialPAT se cargó con este mismo
//   número exacto (−169.908, coincide con la reconstrucción propia, no hizo falta usar el impreso
//   por separado).
//
// grossDebt 2024 = "Títulos emitidos" circulante (28.082) + não circulante (9.247) = 37.329 M BRL,
// mismo criterio que 2025 (única línea de deuda financiera clásica del pasivo). cash 2024 = "Caixa e
// equivalentes de caixa" (7.024 M BRL), sin sumar "Aplicações financeiras e recursos vinculados"
// (10.650), mismo criterio estricto que 2025.
//
// FX 2024: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 (venda), ya estaba en FX_CLOSE
// (data/currency-map.js, 'BRL@2024-12-31') de una carga de otro club — se reusó esa entrada
// compartida, no se agregó una nueva. El documento de Cruzeiro no declara un tipo de cambio propio.
//
// ---------------------------------------------------------------------------------------------
// EJERCICIO 2023 (informativo-financeiro-2023.md, documento PROPIO, distinto del 2024) —
// categorización y verificación
// ---------------------------------------------------------------------------------------------
// A diferencia de 2024/2025, este documento tiene MENOS notas (solo llega a la Nota 19) y su DRE
// tiene una estructura distinta: "Receita operacional líquida" (Nota 15, incluye adentro la
// transferência de atletas, no aparte) − "Custo das atividades desportivas" (Nota 16) = "Lucro
// Bruto" − "Despesas gerais e administrativas" (Nota 17) + "Outras receitas (despesas)" (Nota 18,
// incluye la venta de 20% de la participación en la LFU) = "Lucro antes do resultado financeiro" +
// "Receitas (despesas) financeiras, líquidas" (Nota 19) = "Resultado do exercício" (LUCRO real de
// R$260.116 mil, a diferencia de 2024/2025 que fueron déficit).
// Nota 15 (Receita operacional bruta): 'Bilheteria' -> matchday_competition; 'Programa sócio
// torcedor' -> member_dues; 'Patrocínio e publicidade' (una sola línea, como en 2024) ->
// sponsorship_commercial; 'Direitos de transmissão fixos e premiações por performance' ->
// broadcasting; 'Receitas com royalties e licenciamento' -> sponsorship_commercial; 'Outros' ->
// other_income; '(-) Impostos e contribuições' -> other_income (deducción). Sub-nota (iii)
// 'Transferência de atletas e mecanismo de solidariedade' promovida a líneas de primer nivel (mismo
// criterio que 2024/2025): 'Rescisão contratual' -> player_sales (compensación por rescisión
// unilateral de contrato de un jugador, mismo espíritu que "Cessão temporária"); 'Venda de direitos
// econômicos de atletas' -> player_sales; 'Mecanismo de solidariedade' -> youth_football; 'Cessão
// temporária' -> player_sales; 'Outros' -> other_income.
// Nota 16 (Custos do Futebol): mismo mapeo rubro por rubro que 2024/2025 ('Salários...' ->
// wages_squad; 'Custos diretos e indiretos com jogos'/'Custos com viagens e hospedagens'/'Custos com
// alimentação'/'Direito de Arena'/'Manutenção geral' -> ojo, en ESTE documento 'Manutenção geral' se
// mapeó a admin_general_expense igual que 2024/2025; 'Amortizações' -> player_amortisation; 'Baixa
// do ativo intangível' -> player_impairment; 'Serviços de assessoria e consultoria' ->
// admin_general_expense; 'Depreciação' -> depreciation; 'Taxas de legalização de jogadores'/'Outros
// custos' -> other_expenses).
// Nota 17 (Despesas G&A): 'Salários, encargos e benefícios'/'Despesas comerciais'/'Serviços
// contratados de terceiros'/'Rescisão de contratos comerciais'/'Assessores – Venda de Direitos'/
// 'Outras despesas' -> admin_general_expense (mismo criterio que 2024/2025 para el catch-all de
// G&A); 'Amortizações' -> other_amortisation.
// Nota 18 (Outras receitas (despesas), debajo del resultado operativo): 'Receita pela venda de
// direitos intangíveis' (venta del 20% de la participación del club en la LFU — Liga Forte União,
// contrato de comercialización de derechos de TV 2025-2074 — NO es venta de un jugador, es venta de
// un derecho de participación intangible distinto; sin categoría específica en REVENUE_CATEGORIES
// para esto, mismo criterio catch-all que el resto del skill) -> other_income; 'Outras receitas' ->
// other_income; 'Provisão para demandas judiciais' (cargo de previsión por demandas judiciales, un
// solo evento de tamaño excepcional) -> exceptional_items (única categoría de gasto para
// previsiones/eventos excepcionales, ver club-data-mapping SKILL.md sección 1); 'Outras despesas' ->
// other_expenses.
//
// Verificación (a mano, antes de cargar, cada nota contra su propio subtotal impreso):
// - Nota 15: 28.624+31.045+48.580+101.728+(0.108+16.809+2.401+1.148+0.248)+11.813+0.865 = 243.369 =
//   Total da receita operacional bruta impreso. ✓ − 18.877 = 224.492 = Receita operacional líquida
//   impresa. ✓
// - Nota 16: suma de las 12 líneas = 190.188 = Custo das atividades desportivas impreso. ✓
// - Nota 17: 25.056+8.522+10.488+5.000+4.409+51.216+10.137 = 114.828 = Despesas G&A impresas. ✓
// - Nota 18: 192.780+0.032−25.540−0.025 = 167.247 = Outras receitas (despesas) impresas. ✓
// - revenueLines[2023] suma 417.304 M BRL (224.492 Nota 15 + 192.780+0.032 de Nota 18).
//   expenseLines[2023] suma −330.581 M BRL (190.188 Nota 16 + 114.828 Nota 17 + 25.540+0.025 de Nota
//   18). 417.304 − 330.581 = 86.723 = "Lucro antes do resultado financeiro" impreso, EXACTO. +
//   netInterest (173.393, Nota 19: Receita financeira 183.685 − Despesa financeira 10.292) = 260.116
//   = "Resultado do exercício" impreso, EXACTO. officialPAT = 260.116 (LUCRO, no déficit).
//
// NOTA IMPORTANTE sobre netInterest 2023: incluye un ingreso financiero extraordinario de R$181.913
// mil ("Redução dívida - RJ Cruzeiro Associação", Nota 19(a)) por la homologación del Plano de
// Recuperação Judicial del Cruzeiro Associação en agosto 2023, que redujo el saldo a pagar por
// "auxílio financeiro" y generó una ganancia financeira. El documento lo presenta DENTRO de "Receita
// financeira" (Nota 19), sin una línea propia en el cuerpo del DRE (la DRE solo muestra "Receitas
// (despesas) financeiras, líquidas" como una sola línea) — se mantiene en netInterest tal cual lo
// declara el documento, mismo criterio de club-data-mapping SKILL.md sección 2 (nunca se abre el
// resultado financiero en revenueLines, siempre neto en fiscalYearMeta).
//
// grossDebt 2023 = "Empréstimos e financiamentos" circulante (15.009) + não circulante (0) +
// "Títulos emitidos" não circulante (1.505) = 16.514 M BRL — a diferencia de 2024/2025, este balance
// usa "Empréstimos e financiamentos" como la línea de deuda financiera clásica (no "Títulos
// emitidos", que acá es chica y solo no circulante); se excluye "AFAC – Adiantamento para futuro
// aumento de capital" (70.000, aporte de accionista para futuro aumento de capital, no es deuda) y
// las obrigações com partes relacionadas (Cruzeiro Associação/centros de treinamento), mismo
// criterio estricto que 2024/2025. cash = "Caixa e equivalentes de caixa" (67.239 M BRL).
//
// FX 2023: BRL/USD PTAX de cierre 29/12/2023 (último día hábil, 30 y 31/12 cayeron fin de semana) =
// R$4,8413, ya estaba en FX_CLOSE ('BRL@2023-12-31'). El documento no declara un tipo de cambio
// propio.
//
// ---------------------------------------------------------------------------------------------
// EJERCICIO 2022 (informativo-financeiro-2022.md, documento PROPIO de ese año, período
// 04/02/2022-31/12/2022, primer ejercicio social de la SAF) — categorización y verificación
// ---------------------------------------------------------------------------------------------
// OJO — REGLA IMPORTANTE: el documento de 2023 (informativo-financeiro-2023.md) reexpresa este
// mismo período 2022 como columna comparativa "Reapresentado – Nota 1.4", con un resultado distinto
// (Prejuízo de R$55.071 mil, contra los R$24.642 mil de este documento original). La Nota 1.4 del
// documento 2023 explica que la Administração revisó en 2023 el criterio contable de la combinación
// de negocios del fútbol (reconoció pasivo financiero + intangibles adicionales por R$668-698
// millones que no estaban en los libros originales, reconoció una amortización adicional de
// intangibles de R$55.890 mil, y revirtió parte del gasto de "auxílio financeiro" original). Este
// archivo carga el 2022 tal cual lo publicó el documento ORIGINAL de ese año (no la versión
// reexpresada), por instrucción explícita de la sesión de onboarding — queda como pregunta para
// Admin/dudas-por-club.md si conviene migrar a la versión reexpresada (más prolija con el criterio
// contable vigente, pero un resultado -55.071 en vez de -24.642 solo por un cambio de criterio, sin
// que haya cambiado ningún hecho económico real del período).
// Nota 15 (Receita operacional bruta): mismo mapeo que 2023 rubro por rubro ('Bilheteria e outras
// receitas em jogos' -> matchday_competition; 'Programa sócio-torcedor' -> member_dues; 'Patrocínio
// e publicidade' -> sponsorship_commercial; 'Direitos de transmissão fixos e premiações por
// performance' -> broadcasting; 'Receitas com royalties e licenciamento' -> sponsorship_commercial;
// 'Outros' -> other_income; 'Impostos e contribuições' -> other_income deducción). Sub-nota (iii)
// promovida a líneas de primer nivel, igual que 2023: 'Rescisão contratual' (rescisión unilateral
// del atleta Vitor Hugo Roque Ferreira) -> player_sales; 'Venda de direitos econômicos de atletas'
// (Igor Thiago + Jadsom) -> player_sales; 'Mecanismo de solidariedade' (venta de Fabrício Bruno) ->
// youth_football; 'Outros' -> other_income.
// Nota 16 (Custos do Futebol, 108.703 este documento — DISTINTO de los 108.227 "reapresentado" que
// muestra la columna comparativa del documento 2023, ver nota de arriba): mismo mapeo rubro por
// rubro que 2023/2024 ('Salários...' -> wages_squad; 'Custos diretos e indiretos com jogos'/'Custos
// com viagens e hospedagens'/'Custos com alimentação' -> match_organisation_expense; 'Amortizações'
// -> player_amortisation; 'Serviços de assessoria e consultoria'/'Manutenção geral' ->
// admin_general_expense; 'Baixa do ativo intangível' -> player_impairment; 'Depreciação' ->
// depreciation; 'Taxas de legalização jogadores'/'Outros custos' -> other_expenses). Este documento
// no tiene línea "Direito de Arena" (aparece recién desde 2023).
// Nota 17 (Despesas G&A, 37.392): 'Salários, encargos e benefícios'/'Despesas comerciais'/'Outras
// despesas' -> admin_general_expense (no hay línea "Amortizações" separada en G&A este año).
// Nota 18 (Outras receitas (despesas) operacionais, líquidas, -24.964 neto): 'Pagamento de dívidas
// do Cruzeiro Associação, sem ressarcimento' (pago de deudas del Cruzeiro Associação ante clubes del
// exterior por transferencias de jugadores, sin derecho a resarcimiento, para evitar sanciones
// deportivas que amenazaban la continuidad del negocio — Nota 18(i)) -> exceptional_items (mismo
// criterio que la previsión judicial de 2023, evento excepcional de tamaño relevante ligado a la
// reestructuración del club); 'Outras despesas (receitas)' (neto, en la tabla aparece entre
// paréntesis = crédito neto de R$604) -> other_income (ingreso).
//
// Verificación (a mano, antes de cargar, cada nota contra su propio subtotal impreso):
// - Nota 15: 31.937+30.324+28.817+28.710+(10.800+4.431+0.962+0.040)+14.153+0.180 = 150.354 = Total
//   da receita operacional bruta impreso. ✓ − 4.226 = 146.128 = Receita operacional líquida impresa
//   (y DRE). ✓
// - Nota 16: suma de las 11 líneas = 108.703 = Custo das atividades desportivas impreso. ✓
// - Nota 17: 26.890+7.410+3.092 = 37.392 = Despesas G&A impresas. ✓
// - Nota 18: −25.568+0.604 = −24.964 = Outras receitas (despesas) impresas. ✓
// - revenueLines[2022] suma 146.732 M BRL (146.128 Nota 15 + 0.604 Nota 18). expenseLines[2022] suma
//   −171.663 M BRL (108.703 Nota 16 + 37.392 Nota 17 + 25.568 Nota 18). 146.732 − 171.663 = −24.931 =
//   "Prejuízo antes do resultado financeiro" impreso, EXACTO. + netInterest (0.289, Nota 19: Receita
//   financeira 1.422 − Despesa financeira 1.133) = −24.642 = "Prejuízo do período" impreso, EXACTO
//   (officialPAT).
//
// grossDebt 2022 = "Empréstimos e financiamentos" circulante (5.000) + não circulante (14.719) =
// 19.719 M BRL (no hay línea "Títulos emitidos" en este balance, es de 2023 en adelante). cash =
// "Caixa e equivalentes de caixa" (15.598 M BRL).
//
// FX 2022: BRL/USD PTAX de cierre 30/12/2022 (último día hábil, 31/12 cayó sábado) = R$5,2177, ya
// estaba en FX_CLOSE ('BRL@2022-12-31'). El documento no declara un tipo de cambio propio.
// ============================================================================

const cruzeiroRevenueLinesByYear = {
  2025: [
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:69.430, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio torcedor', normalizedCategory:'member_dues', amountNative:51.008, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:280.010, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:26.403, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de transmissão fixos e premiações por performance', normalizedCategory:'broadcasting', amountNative:176.486, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidariedade (recebido)', normalizedCategory:'youth_football', amountNative:1.855, disclosureLevel:'detailed' },
    { rawLabel:'Cessão temporária (empréstimo de atletas)', normalizedCategory:'player_sales', amountNative:1.449, disclosureLevel:'detailed' },
    { rawLabel:'Outros (mecanismo de solidariedade e outros)', normalizedCategory:'other_income', amountNative:3.596, disclosureLevel:'detailed' },
    { rawLabel:'Royalties e licenciamento', normalizedCategory:'sponsorship_commercial', amountNative:25.470, disclosureLevel:'detailed' },
    { rawLabel:'Outros (receita operacional bruta)', normalizedCategory:'other_income', amountNative:13.137, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições / Vendas canceladas', normalizedCategory:'other_income', amountNative:-49.669, disclosureLevel:'detailed' },
    { rawLabel:'Receita de transferência de atletas', normalizedCategory:'player_sales', amountNative:28.364, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (Nota 29)', normalizedCategory:'other_income', amountNative:0.360, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:51.069, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio torcedor', normalizedCategory:'member_dues', amountNative:32.439, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:57.860, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de transmissão fixos e premiações por performance', normalizedCategory:'broadcasting', amountNative:138.072, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidariedade (recebido)', normalizedCategory:'youth_football', amountNative:7.684, disclosureLevel:'detailed' },
    { rawLabel:'Cessão temporária (empréstimo de atletas)', normalizedCategory:'player_sales', amountNative:3.182, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com royalties e licenciamento', normalizedCategory:'sponsorship_commercial', amountNative:15.365, disclosureLevel:'detailed' },
    { rawLabel:'Outros (receita operacional bruta)', normalizedCategory:'other_income', amountNative:1.920, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições / Vendas canceladas', normalizedCategory:'other_income', amountNative:-24.878, disclosureLevel:'detailed' },
    { rawLabel:'Receita de transferência de atletas', normalizedCategory:'player_sales', amountNative:63.978, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (Nota 28)', normalizedCategory:'other_income', amountNative:0.007, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:28.624, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio torcedor', normalizedCategory:'member_dues', amountNative:31.045, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:48.580, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de transmissão fixos e premiações por performance', normalizedCategory:'broadcasting', amountNative:101.728, disclosureLevel:'detailed' },
    { rawLabel:'Rescisão contratual (transferência de atletas)', normalizedCategory:'player_sales', amountNative:0.108, disclosureLevel:'detailed' },
    { rawLabel:'Venda de direitos econômicos de atletas', normalizedCategory:'player_sales', amountNative:16.809, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidariedade (recebido)', normalizedCategory:'youth_football', amountNative:2.401, disclosureLevel:'detailed' },
    { rawLabel:'Cessão temporária (empréstimo de atletas)', normalizedCategory:'player_sales', amountNative:1.148, disclosureLevel:'detailed' },
    { rawLabel:'Outros (transferência de atletas e mecanismo de solidariedade)', normalizedCategory:'other_income', amountNative:0.248, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com royalties e licenciamento', normalizedCategory:'sponsorship_commercial', amountNative:11.813, disclosureLevel:'detailed' },
    { rawLabel:'Outros (receita operacional bruta)', normalizedCategory:'other_income', amountNative:0.865, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições', normalizedCategory:'other_income', amountNative:-18.877, disclosureLevel:'detailed' },
    { rawLabel:'Receita pela venda de direitos intangíveis (participação na LFU)', normalizedCategory:'other_income', amountNative:192.780, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas (Nota 18)', normalizedCategory:'other_income', amountNative:0.032, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Bilheteria e outras receitas em jogos', normalizedCategory:'matchday_competition', amountNative:31.937, disclosureLevel:'detailed' },
    { rawLabel:'Programa sócio-torcedor', normalizedCategory:'member_dues', amountNative:30.324, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:28.817, disclosureLevel:'detailed' },
    { rawLabel:'Direitos de transmissão fixos e premiações por performance', normalizedCategory:'broadcasting', amountNative:28.710, disclosureLevel:'detailed' },
    { rawLabel:'Rescisão contratual (transferência de atletas)', normalizedCategory:'player_sales', amountNative:10.800, disclosureLevel:'detailed' },
    { rawLabel:'Venda de direitos econômicos de atletas', normalizedCategory:'player_sales', amountNative:4.431, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidariedade (recebido)', normalizedCategory:'youth_football', amountNative:0.962, disclosureLevel:'detailed' },
    { rawLabel:'Outros (transferência de atletas e mecanismo de solidariedade)', normalizedCategory:'other_income', amountNative:0.040, disclosureLevel:'detailed' },
    { rawLabel:'Receitas com royalties e licenciamento', normalizedCategory:'sponsorship_commercial', amountNative:14.153, disclosureLevel:'detailed' },
    { rawLabel:'Outros (receita operacional bruta)', normalizedCategory:'other_income', amountNative:0.180, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e contribuições', normalizedCategory:'other_income', amountNative:-4.226, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (receitas) — Nota 18, efecto neto positivo', normalizedCategory:'other_income', amountNative:0.604, disclosureLevel:'detailed' },
  ],
};

const cruzeiroExpenseLinesByYear = {
  2025: [
    { rawLabel:'Salários, direito de imagem, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-362.276, disclosureLevel:'detailed' },
    { rawLabel:'Custos diretos e indiretos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-28.384, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações do intangível (atletas)', normalizedCategory:'player_amortisation', amountNative:-186.647, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de assessoria e consultoria', normalizedCategory:'admin_general_expense', amountNative:-2.593, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do ativo intangível (Nota 27)', normalizedCategory:'player_impairment', amountNative:-5.704, disclosureLevel:'detailed' },
    { rawLabel:'Custos com viagens e hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-11.290, disclosureLevel:'detailed' },
    { rawLabel:'Custos com Fretamentos e Passagens', normalizedCategory:'match_organisation_expense', amountNative:-18.288, disclosureLevel:'detailed' },
    { rawLabel:'Custos com alimentação', normalizedCategory:'match_organisation_expense', amountNative:-8.053, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-5.459, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Arena (custo)', normalizedCategory:'match_organisation_expense', amountNative:-8.904, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção campos de futebol', normalizedCategory:'match_organisation_expense', amountNative:-1.666, disclosureLevel:'detailed' },
    { rawLabel:'Serviço de segurança e vigilância', normalizedCategory:'match_organisation_expense', amountNative:-9.249, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção geral', normalizedCategory:'admin_general_expense', amountNative:-26.552, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de legalização de jogadores', normalizedCategory:'other_expenses', amountNative:-0.798, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (atividades esportivas)', normalizedCategory:'other_expenses', amountNative:-4.361, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (G&A)', normalizedCategory:'admin_general_expense', amountNative:-4.601, disclosureLevel:'detailed' },
    { rawLabel:'Serviços contratados de terceiros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.587, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações (G&A)', normalizedCategory:'other_amortisation', amountNative:-1.608, disclosureLevel:'detailed' },
    { rawLabel:'Despesas Comerciais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-0.367, disclosureLevel:'detailed' },
    { rawLabel:'Outros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-3.061, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do custo de atletas pela venda de direitos intangíveis', normalizedCategory:'player_amortisation', amountNative:-7.324, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (Nota 29)', normalizedCategory:'other_expenses', amountNative:-0.533, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Salários, direito de imagem, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-200.355, disclosureLevel:'detailed' },
    { rawLabel:'Custos diretos e indiretos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-20.788, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações do intangível (atletas)', normalizedCategory:'player_amortisation', amountNative:-82.317, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de assessoria e consultoria', normalizedCategory:'admin_general_expense', amountNative:-0.331, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do ativo intangível (Nota 26)', normalizedCategory:'player_impairment', amountNative:-8.375, disclosureLevel:'detailed' },
    { rawLabel:'Custos com viagens e hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-47.867, disclosureLevel:'detailed' },
    { rawLabel:'Custos com alimentação', normalizedCategory:'match_organisation_expense', amountNative:-5.707, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-4.601, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Arena (custo)', normalizedCategory:'match_organisation_expense', amountNative:-6.881, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção geral', normalizedCategory:'admin_general_expense', amountNative:-15.787, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de legalização de jogadores', normalizedCategory:'other_expenses', amountNative:-0.874, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (atividades esportivas)', normalizedCategory:'other_expenses', amountNative:-1.206, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (G&A)', normalizedCategory:'admin_general_expense', amountNative:-13.367, disclosureLevel:'detailed' },
    { rawLabel:'Serviços contratados de terceiros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-12.358, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações (G&A)', normalizedCategory:'other_amortisation', amountNative:-26.644, disclosureLevel:'detailed' },
    { rawLabel:'Outros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-12.549, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do custo de atletas pela venda de direitos intangíveis', normalizedCategory:'player_amortisation', amountNative:-32.886, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (Nota 28)', normalizedCategory:'other_expenses', amountNative:-0.228, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de ativo imobilizado (Nota 28)', normalizedCategory:'other_expenses', amountNative:-0.016, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Salários, direito de imagem, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-94.709, disclosureLevel:'detailed' },
    { rawLabel:'Custos diretos e indiretos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-21.216, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações (Nota 16)', normalizedCategory:'player_amortisation', amountNative:-30.665, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de assessoria e consultoria (Nota 16)', normalizedCategory:'admin_general_expense', amountNative:-4.220, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do ativo intangível (Nota 16)', normalizedCategory:'player_impairment', amountNative:-15.186, disclosureLevel:'detailed' },
    { rawLabel:'Custos com viagens e hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-4.604, disclosureLevel:'detailed' },
    { rawLabel:'Custos com alimentação', normalizedCategory:'match_organisation_expense', amountNative:-3.316, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação (Nota 16)', normalizedCategory:'depreciation', amountNative:-3.320, disclosureLevel:'detailed' },
    { rawLabel:'Direito de Arena (custo)', normalizedCategory:'match_organisation_expense', amountNative:-4.947, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção geral (Nota 16)', normalizedCategory:'admin_general_expense', amountNative:-2.274, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de legalização de jogadores', normalizedCategory:'other_expenses', amountNative:-0.564, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (atividades esportivas)', normalizedCategory:'other_expenses', amountNative:-5.167, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (G&A)', normalizedCategory:'admin_general_expense', amountNative:-25.056, disclosureLevel:'detailed' },
    { rawLabel:'Despesas comerciais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-8.522, disclosureLevel:'detailed' },
    { rawLabel:'Serviços contratados de terceiros (G&A)', normalizedCategory:'admin_general_expense', amountNative:-10.488, disclosureLevel:'detailed' },
    { rawLabel:'Rescisão de contratos comerciais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-5.000, disclosureLevel:'detailed' },
    { rawLabel:'Assessores – Venda de Direitos (G&A)', normalizedCategory:'admin_general_expense', amountNative:-4.409, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações (G&A, Nota 17)', normalizedCategory:'other_amortisation', amountNative:-51.216, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-10.137, disclosureLevel:'detailed' },
    { rawLabel:'Provisão para demandas judiciais (Nota 18)', normalizedCategory:'exceptional_items', amountNative:-25.540, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (Nota 18)', normalizedCategory:'other_expenses', amountNative:-0.025, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Salários, direitos de imagem, encargos e beneficios', normalizedCategory:'wages_squad', amountNative:-57.400, disclosureLevel:'detailed' },
    { rawLabel:'Custos diretos e indiretos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-22.032, disclosureLevel:'detailed' },
    { rawLabel:'Amortizações (Nota 16)', normalizedCategory:'player_amortisation', amountNative:-9.431, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de assessoria e consultoria (Nota 16)', normalizedCategory:'admin_general_expense', amountNative:-4.823, disclosureLevel:'detailed' },
    { rawLabel:'Baixa do ativo intangivel (Nota 16)', normalizedCategory:'player_impairment', amountNative:-3.386, disclosureLevel:'detailed' },
    { rawLabel:'Custos com viagens e hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-2.649, disclosureLevel:'detailed' },
    { rawLabel:'Custos com alimentação', normalizedCategory:'match_organisation_expense', amountNative:-1.878, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação (Nota 16)', normalizedCategory:'depreciation', amountNative:-1.777, disclosureLevel:'detailed' },
    { rawLabel:'Manutenção geral (Nota 16)', normalizedCategory:'admin_general_expense', amountNative:-1.124, disclosureLevel:'detailed' },
    { rawLabel:'Taxas de legalização jogadores', normalizedCategory:'other_expenses', amountNative:-0.808, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos (Nota 16)', normalizedCategory:'other_expenses', amountNative:-3.395, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (G&A)', normalizedCategory:'admin_general_expense', amountNative:-26.890, disclosureLevel:'detailed' },
    { rawLabel:'Despesas comerciais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-7.410, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-3.092, disclosureLevel:'detailed' },
    { rawLabel:'Pagamento de dívidas do Cruzeiro Associação, sem ressarcimento (Nota 18)', normalizedCategory:'exceptional_items', amountNative:-25.568, disclosureLevel:'detailed' },
  ],
};

const cruzeiroFiscalYearMeta = {
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'cruzeiro-informativo-financeiro-2025',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Títulos emitidos" circulante (1.801) + não circulante (10.844) — única línea de
    // deuda financiera clásica del balance (el resto son obrigações operativas/con partes
    // relacionadas). cash = "Caixa e equivalentes de caixa" (Nota 3), sin sumar aplicações
    // financeiras.
    grossDebt:12.645, cash:0.702,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultado financeiro líquido" (Nota 30): Receitas financeiras 8.068 - Despesas
    // financeiras 52.563.
    netInterest:-44.495, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines
    // (627.899 / 698.305 M BRL) — el documento no imprime un total único de cada lado en una sola
    // fila (la DRE está en 2 bloques, ver comentario de cabecera). officialPAT = "PREJUÍZO DO
    // EXERCÍCIO" impreso, el número EXACTO del documento (no la reconstrucción propia, que arrastra
    // ~R$1.000 de redondeo del propio documento, ver comentario de cabecera).
    officialTotalRevenue:627.899, officialTotalExpenses:698.305, officialPAT:-114.900,
  },
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'cruzeiro-informativo-financeiro-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Títulos emitidos" circulante (28.082) + não circulante (9.247) — única línea de
    // deuda financiera clásica del balance 2024 (mismo criterio que 2025). cash = "Caixa e
    // equivalentes de caixa" (Nota 3), sin sumar aplicações financeiras (10.650).
    grossDebt:37.329, cash:7.024,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Receitas (despesas) financeiras líquidas" (Nota 29): Receita financeira 6.568 -
    // Despesa financeira 30.037.
    netInterest:-23.469, tax:0,
    // officialTotalRevenue/officialTotalExpenses = suma verificada de revenueLines/expenseLines
    // (346.698 / 493.137 M BRL, ver comentario de cabecera). officialPAT = "LUCRO (PREJUÍZO) DO
    // EXERCICIO" impreso (-169.908, prejuízo/pérdida) — coincide EXACTO con la reconstrucción propia
    // (346.698 - 493.137 - 23.469 = -169.908), sin redondeo.
    officialTotalRevenue:346.698, officialTotalExpenses:493.137, officialPAT:-169.908,
  },
  2023: {
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'cruzeiro-informativo-financeiro-2023',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos e financiamentos" circulante (15.009) + não circulante (0) +
    // "Títulos emitidos" não circulante (1.505) — a diferencia de 2024/2025, acá "Empréstimos e
    // financiamentos" es la línea de deuda financiera clásica dominante. cash = "Caixa e
    // equivalentes de caixa" (Nota 3).
    grossDebt:16.514, cash:67.239,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Receitas (despesas) financeiras líquidas" (Nota 19): Receita financeira
    // 183.685 (incluye R$181.913 mil de ganancia extraordinaria por reducción de deuda del Cruzeiro
    // Associación tras su Plano de Recuperação Judicial, Nota 19(a)) - Despesa financeira 10.292.
    netInterest:173.393, tax:0,
    // officialTotalRevenue = suma verificada de revenueLines (417.304 M BRL, ver comentario de
    // cabecera). officialTotalExpenses (305.041) EXCLUYE la línea exceptional_items (-25.540,
    // "Provisão para demandas judiciais") del total de gastos, mismo criterio "Chelsea" que otros
    // clubes de esta sesión (Charleroi/Antwerp/Standard Liège/Union SG): 330.581 - 25.540 = 305.041
    // — es el total que compara verifyTieOuts() (Math.abs(expenses+nonCash), que no suma
    // exceptional_items). officialPAT = "Resultado do exercício" impreso (260.116, LUCRO real, a
    // diferencia de 2024/2025 que fueron déficit) — coincide EXACTO con la reconstrucción propia
    // (que SÍ incluye exceptional_items, vía operatingProfit = ebitda + exceptionalItems + nonCash).
    officialTotalRevenue:417.304, officialTotalExpenses:305.041, officialPAT:260.116,
  },
  2022: {
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'cruzeiro-informativo-financeiro-2022',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos e financiamentos" circulante (5.000) + não circulante (14.719) — no
    // hay línea "Títulos emitidos" en este balance (aparece recién desde 2023). cash = "Caixa e
    // equivalentes de caixa".
    grossDebt:19.719, cash:15.598,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Receitas (despesas) financeiras, líquidas" (Nota 19): Receita financeira 1.422
    // - Despesa financeira 1.133.
    netInterest:0.289, tax:0,
    // officialTotalRevenue = suma verificada de revenueLines (146.732 M BRL, ver comentario de
    // cabecera). officialTotalExpenses (146.095) EXCLUYE la línea exceptional_items (-25.568,
    // "Pagamento de dívidas do Cruzeiro Associação, sem ressarcimento") del total de gastos, mismo
    // criterio "Chelsea" que el resto de los clubes de esta sesión: 171.663 - 25.568 = 146.095 — es
    // el total que compara verifyTieOuts(). officialPAT = "Prejuízo do período" impreso (-24.642),
    // EXACTO contra el documento ORIGINAL de 2022 (no la versión "Reapresentado" de -55.071 que
    // muestra la columna comparativa del documento 2023 — ver comentario de cabecera, Nota 1.4).
    officialTotalRevenue:146.732, officialTotalExpenses:146.095, officialPAT:-24.642,
  },
};

const cruzeiroPresupuestoOverlayByYear = {};

const cruzeiroPasesData = [];
const cruzeiroResultadosData = {};
const cruzeiroTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.cruzeiro = {
  revenueLinesByYear: cruzeiroRevenueLinesByYear, expenseLinesByYear: cruzeiroExpenseLinesByYear,
  fiscalYearMeta: cruzeiroFiscalYearMeta, pasesData: cruzeiroPasesData,
  resultadosData: cruzeiroResultadosData, titulosData: cruzeiroTitulosData,
  presupuestoOverlayByYear: cruzeiroPresupuestoOverlayByYear,
};


Object.assign(sources, {
  'cruzeiro-informativo-financeiro-2025': {
      id:'cruzeiro-informativo-financeiro-2025', clubId:'cruzeiro',
      title:'Informativo Financeiro (Demonstrações Financeiras) da SAF Cruzeiro, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (52 páginas, texto nativo), bajado del bucket S3 propio del club (cruzeiro-website-project-documents.s3.us-east-1.amazonaws.com). Transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2025.md. 2025 fue un ejercicio de DÉFICIT real (Prejuízo de R$114,900 mil), aunque menor que el déficit de 2024 (R$169,908 mil) del mismo documento comparativo. Convertido a USD con el PTAX BCB de cierre 31/12/2025 (R$5,5024), investigado externamente. El club tiene también informativo-financeiro-2022.pdf/2023.pdf descargados pero no cargados esta sesión.',
    },
  'cruzeiro-informativo-financeiro-2024': {
      id:'cruzeiro-informativo-financeiro-2024', clubId:'cruzeiro',
      title:'Informativo Financeiro (Demonstrações Financeiras) da SAF Cruzeiro, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, texto nativo, documento DISTINTO del informativo-financeiro-2025 (con su propio comparativo 2023, no cargado). Transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2024.md. 2024 fue un ejercicio de DÉFICIT real (Prejuízo de R$169,908 mil), mayor que el déficit de 2025 (R$114,900 mil). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923), ya presente en FX_CLOSE de data/currency-map.js de una carga anterior de otro club.',
    },
  'cruzeiro-informativo-financeiro-2023': {
      id:'cruzeiro-informativo-financeiro-2023', clubId:'cruzeiro',
      title:'Informativo Financeiro (Demonstrações Financeiras) da SAF Cruzeiro, Exercício Findo em 31 de Dezembro de 2023',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, texto nativo, documento DISTINTO del informativo-financeiro-2024/2025 (con su propio comparativo del período 04/02/2022-31/12/2022, no cargado — se usó en su lugar el documento propio de 2022). Transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2023.md. 2023 fue un ejercicio de LUCRO real (R$260,116 mil), a diferencia de 2024/2025 que fueron déficit — impulsado en gran parte por un ingreso financiero extraordinario de R$181,913 mil por reducción de la deuda del Cruzeiro Associação (Plano de Recuperação Judicial homologado en agosto 2023) y por la venta de una participación del 20% en la Liga Forte União (LFU, R$192,780 mil). Convertido a USD con el PTAX BCB de cierre 29/12/2023 (R$4,8413), ya presente en FX_CLOSE.',
    },
  'cruzeiro-informativo-financeiro-2022': {
      id:'cruzeiro-informativo-financeiro-2022', clubId:'cruzeiro',
      title:'Informativo Financeiro (Demonstrações Financeiras) da SAF Cruzeiro, Período de 04 de Fevereiro a 31 de Dezembro de 2022',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial, texto nativo, primer ejercicio social de la SAF Cruzeiro (constituida 04/02/2022). Transcripción completa en Clubes/Brasil/Cruzeiro/informativo-financeiro-2022.md. 2022 fue un ejercicio de DÉFICIT real (Prejuízo de R$24,642 mil) SEGÚN EL DOCUMENTO ORIGINAL de 2022 — el documento de 2023 reexpresó este mismo período como Prejuízo de R$55,071 mil (Nota 1.4, cambio de criterio contable en la combinación de negocios del fútbol), pero este archivo carga la versión ORIGINAL, no la reexpresada (ver comentario de cabecera de este archivo para el detalle y la pregunta pendiente para Admin/dudas-por-club.md). Convertido a USD con el PTAX BCB de cierre 30/12/2022 (R$5,2177), ya presente en FX_CLOSE.',
    },
});

gestionesByClub.cruzeiro = {
    sinconfirmar: { nombre:'SAF Cruzeiro (gestión no confirmada en detalle)', firstYear:2022, lastYear:2025 },
  };

memberCountByClub.cruzeiro = null;
