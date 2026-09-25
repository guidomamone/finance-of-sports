// ============================================================================
// data/palmeiras-br-data.js — Sociedade Esportiva Palmeiras, São Paulo, Brasil (CNPJ
// 61.750.345/0001-57). NO es SAF: es uma associação civil sem fins de lucro — publica balanços
// auditados por buena gobernanza propia (recibió premios de transparência según prensa), no por
// obligación de la Lei do SAF. Mismo tipo de entidad que Corinthians/Flamengo. clubId
// 'palmeiras-br' (CON GUIÓN, bracket notation en clubs{}/CLUB_GENERIC_DATA/gestionesByClub/
// memberCountByClub).
//
// 2 ejercicios cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — clubs.js,
// fiscalYearStart:'01-01', confirmado leyendo la carátula de CADA balance: "BALANÇOS PATRIMONIAIS EM
// 31 DE DEZEMBRO DE 2024 E 2023" / "...DE 2025 E DE 2024"). Fuente: "Demonstrações Financeiras e
// Relatório dos Auditores Independentes" oficiales, descargadas de
// palmeiras.com.br/balancetes-e-demonstrativos-financeiros/ (ver fuentes/Brasil/Palmeiras.md). 2024
// se cargó del documento demonstracoes-financeiras-2023-2024.pdf (SU PROPIO año corriente, no la
// columna comparativa de 2025 — club-data-mapping sección 6.5); 2025 del documento
// demonstracoes-financeiras-2024-2025.pdf (ídem). Transcripciones completas en
// Clubes/Brasil/Palmeiras/demonstracoes-financeiras-2023-2024.md (3576 líneas) y
// demonstracoes-financeiras-2024-2025.md (4391 líneas). NOTA DE TOOLING: la transcripción .md de
// AMBOS documentos tiene tablas con números pegados/corridos por la extracción original (OCR de una
// tabla ancha con 5 columnas de segmento) — para las líneas numéricas reales se re-extrajo cada
// página puntual directo del PDF con `pdftotext -layout -f <página> -l <página>`, que rinde las
// tablas de 5 columnas limpias (confirmado: cada fila re-extraída así reconcilia EXACTO contra el
// total impreso de su propia nota, ver verificación abajo) — anotado para que una sesión futura que
// vuelva a tocar estos 2 documentos sepa que el .md tiene ruido en las tablas y conviene re-extraer
// con -layout en vez de confiar en el .md a ojo.
//
// Escala: valores originales "em milhares de reais" en los 2 documentos — acá en MILLONES de BRL
// nativos (dividir por 1.000, mismo criterio que Corinthians/Flamengo/Botafogo).
//
// ESTRUCTURA REAL DE CADA DOCUMENTO: la DRE está SEGMENTADA EN 4 columnas (Futebol profissional /
// Futebol feminino / Futebol de base / Clube social e esportes amadores) + una columna Total, los 2
// años (a diferencia de Corinthians, que cambió de formato entre 2024 y 2025 — Palmeiras mantuvo
// esta misma estructura de 4 segmentos en los 2 documentos). Se aprovechó esta granularidad para
// categorizar según el SEGMENTO de origen, no solo el TIPO de ingreso/gasto:
// - Futebol profissional -> categorías normales (broadcasting, sponsorship_commercial,
//   matchday_competition, player_sales, member_dues, wages_squad, admin_general_expense,
//   match_organisation_expense, player_amortisation, depreciation, other_expenses).
// - Futebol feminino -> revenue: no tuvo línea de ingreso propia con peso relevante en ninguno de
//   los 2 años (aparece mezclado en Direitos de transmissão/Publicidade/Premiações, montos chicos,
//   se dejó en la MISMA categoría que la línea de futebol profissional correspondiente en vez de
//   crear una womens_football separada, porque el documento no la nombra como línea propia
//   diferenciada salvo en el desglose de Premiações, ver abajo); expense: youth_other_sports_expense
//   (personal, gastos gerais).
// - Futebol de base -> revenue: no tiene línea propia (las categorías con desglose por segmento no
//   muestran montos en esta columna salvo Negociações de Atletas, ya cargado como player_sales);
//   expense: youth_other_sports_expense (personal, gastos gerais, gastos com formação de atletas).
// - Clube social e esportes amadores -> revenue: member_dues (Arrecadação social) / other_sports
//   (Departamentos amadores) / other_income (Rendas/Outras receitas); expense:
//   youth_other_sports_expense (personal, gastos gerais — mismo criterio que Banfield/Corinthians
//   para "clube social").
//
// Categorización (Ingresos), notas 2.1.15-2.1.22 (numeración 2024) / 2.1.15-2.1.22 (numeración
// 2025, misma numeración los 2 años):
// - 'Direitos de transmissão' -> broadcasting. 'Publicidade e patrocínio' -> sponsorship_commercial.
//   'Arrecadação de jogos' -> matchday_competition. 'Sócio torcedor Avanti' (programa de
//   socio-hincha) -> member_dues. 'Incentivos Fiscais e outros' -> other_income. 'Premiações' ->
//   competition_bonus. 'Arrecadação social' (SOLO columna clube social: mensalidades + taxas de
//   atividades esportivas) -> member_dues. 'Licenciamentos da marca e franquias' ->
//   sponsorship_commercial. 'Departamentos amadores' (SOLO columna clube social, marginal) ->
//   other_sports.
// - 'Negociações com atletas'/'Negociações de Atletas' (nota 2.1.19 en 2024, reagrupada DENTRO de
//   'Outras Receitas' 2.1.22 en 2025 — el propio documento movió esta nota de lugar entre años, sin
//   cambiar su contenido): se cargó la RECEITA BRUTA (2024: R$504.345 mil; 2025: R$602.208 mil) como
//   player_sales, y la '(-) Baixa de Intangível' asociada (2024: R$63.996 mil; 2025: implícita en el
//   desglose de 'Gastos com comissões, atletas e baixas', ver Gastos abajo) como gasto
//   player_amortisation — SIN netear, mismo criterio que Botafogo/Corinthians (el documento de
//   Palmeiras SÍ muestra el "ganho líquido" ya neteado en su propia nota de detalle, pero se prefirió
//   cargar bruto+costo por separado para ser consistente con el resto de clubes brasileños cargados,
//   ver club-data-mapping sección 3).
// - 'Outras Receitas' (nota 2.1.22, columna clube social e esportes amadores, dominante en el total):
//   dentro de esta nota el documento separa 'Contrato de superfícies - Arena' (pago que Palmeiras
//   recibe de la SPV "Real Arenas" por la escritura pública de superficie del Allianz Parque — la
//   nota explicativa NOMBRA el estádio explícitamente: "receita amortizada em decorrência da
//   ativação do estádio Allianz Parque") -> stadium_other (criterio de la sección 1 de
//   club-data-mapping: solo entra si el rótulo/nota nombra el estádio, y acá lo nombra); 'Reversão de
//   contingências - Real Arena' (SOLO 2024, reversión no recurrente de una provisión legal) ->
//   other_income; 'Outros' -> other_income.
//
// Categorización (Gastos), notas 2.1.23-2.1.25 (Pessoal / Despesas gerais e administrativas / Gastos
// com comissões, atletas e baixas — ambos años, mismos números de nota):
// - 'Pessoal e encargos sociais': columna futebol profissional -> wages_squad; columnas futebol
//   feminino/futebol de base/clube social -> youth_other_sports_expense.
// - 'Despesas com direito de imagem' (TODAS las columnas, incluso feminino/de base — es
//   compensación real a atletas/comissão técnica, no un costo operativo del segmento) -> wages_squad.
// - 'Despesas com jogos' (TODAS las columnas) -> match_organisation_expense.
// - 'Despesas sócio torcedor Avanti' (solo futebol profissional, costo de operar el programa) ->
//   admin_general_expense.
// - 'Despesas gerais e administrativas': columna futebol profissional -> admin_general_expense;
//   columnas futebol feminino/futebol de base/clube social -> youth_other_sports_expense. (Nota: la
//   sub-línea "Acordos e despesas legais e judiciais" de esta nota fue R$73.910 mil en 2024,
//   ~47% del total de la columna futebol profissional — un monto grande de litigios/acuerdos legales
//   que podría justificar tratarse como exceptional_items en una sesión futura si se decide separar
//   esa sub-línea; se dejó dentro de admin_general_expense en esta carga por no tener un ítem
//   "exceptional" análogo ya establecido para Palmeiras, a diferencia de Corinthians, que sí separa
//   'Provisão de contingências'/'Despesas jurídicas e contingências' como línea propia del cuerpo
//   principal de la DRE — anotado como duda en Admin/dudas-por-club.md).
// - 'Depreciação e amortização' (TODAS las columnas combinadas, una sola línea) -> depreciation: el
//   documento la presenta SEPARADA de 'Amortização - direitos de atletas e comissão técnica' (línea
//   propia inmediatamente debajo), así que no hace falta separar bienes de uso de derechos
//   federativos como sí hubo que hacer con Corinthians — acá el propio documento ya viene separado.
// - 'Amortização - direitos de atletas e comissão técnica' (TODAS las columnas combinadas) ->
//   player_amortisation.
// - 'Gastos com comissões, atletas e baixas' (nota 2.1.27 en 2024 / 2.1.25 en 2025 — la numeración
//   de notas cambió entre años, mismo contenido): se desglosó en sus 4 componentes propios, con nota
//   de detalle en los 2 años: 'Baixa'/'Perdas líquidas - Negociações de Atletas' (valor contable
//   residual de jugadores dados de baja/vendidos con pérdida) -> player_amortisation; 'Gastos com
//   atletas/comissão técnica' -> other_expenses; 'Comissão' (comisiones de intermediación en
//   transferencias) -> other_expenses; 'Gastos com formação de atletas' (SOLO columna futebol de
//   base) -> youth_other_sports_expense.
//
// netInterest = 'Receitas financeiras' − 'Despesas financeiras' (Resultado financeiro, TOTAL de las
// 4 columnas): 2024 = 93,932 − 170,388 = −76,456 M BRL; 2025 = 154,573 − 244,287 = −89,714 M BRL —
// NUNCA como línea (club-data-mapping sección 2). tax = 0 los 2 años (associação sem fins de lucro,
// sin línea de imposto de renda en ninguna de las 2 DRE). profitOnPlayerSales = assetSales = 0 (no
// se netea nada aparte de lo ya bruto en revenueLines/expenseLines).
//
// VERIFICACIÓN (Node, antes de cargar):
// 2024: revenueLines suman 1.271,360 M BRL (mayor que el "Total da receita operacional" 4 colunas
// impreso de 1.207,361 M BRL en ~63,999 M BRL: la diferencia es la 'Baixa de Intangível' de
// Negociações com atletas, que acá se cargó como gasto separado —player_amortisation— en vez de
// netearla contra el ingreso, ver nota de categorización arriba; sobre esa base, ~3 mil BRL son
// ruido de redondeo de la propia nota "Outras Receitas"/"Rendas diversas"). expenseLines suman
// EXACTO 996,718 M BRL (= 932,722 M BRL "Total das despesas operacionais" impreso + los mismos
// 63,996 M BRL de la baixa recategorizada). Superávit operacional: 1.271,360 − 996,718 = 274,642 M
// BRL (impreso: 274,639, diferencia de R$3 mil, mismo ruido de redondeo). + netInterest (−76,456) =
// 198,186 M BRL (impreso: "Superávit do exercício" 198,183 M BRL, misma diferencia de R$3 mil,
// inmaterial e muy por debajo de la tolerancia de verifyTieOuts()).
// 2025: revenueLines suman EXACTO 1.628,486 M BRL = "RECEITAS OPERACIONAIS" impreso, EXACTO (en este
// año la recategorización bruto/neto de Negociações de Atletas coincidió con cómo el documento ya
// presentaba 'Outras Receitas' nota 2.1.22, sin diferencia contra el total impreso). expenseLines
// suman EXACTO 1.246,377 M BRL = "DESPESAS OPERACIONAIS" impreso, EXACTO. Superávit operacional:
// 1.628,486 − 1.246,377 = 382,109 M BRL = impreso, EXACTO. + netInterest (−89,714) = 292,395 M BRL =
// "SUPERÁVIT DO EXERCÍCIO" impreso, EXACTO.
//
// grossDebt = 'Empréstimos e financiamentos' (circulante + não circulante), línea angosta separada
// de Fornecedores/Contas a pagar/Antecipação de contratos/Provisão para contingências en el propio
// Balanço Patrimonial (mismo criterio que Corinthians/Botafogo/club-data-mapping sección 14): 2024 =
// 39,759 M BRL (circulante; não circulante = 0); 2025 = 0,234 M BRL (circulante; não circulante = 0)
// — OJO: Palmeiras financia una porción grande de su operación vía 'Antecipação de contratos'
// (factoring de recibíveis de transferencias/patrocinios: 2024 = 266,150 + 366,726 = 632,876 M BRL;
// 2025 = 105,590 + 347,340 = 452,930 M BRL), un pasivo financiero-símil MUCHO más grande que
// 'Empréstimos e financiamentos' pero que el propio balance categoriza aparte — no se incluyó en
// grossDebt por no ser la línea de "Empréstimos e financiamentos" propiamente dicha, pero se
// documenta acá para que una sesión futura no asuma que grossDebt captura toda la deuda financiera
// real del Clube. cash = 'Caixa e equivalentes de caixa': 2024 = 38,363 M BRL; 2025 = 118,371 M BRL.
//
// FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio en un Anexo dedicado —
// PTAX de cierre BCB, referenciado a FX_CLOSE (ya existían las 2 entradas antes de esta sesión):
// BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// Gestión: Leila Pereira, Presidente, eleita para o triênio 2022/2024 e REELEITA para o triênio
// 2025/2027 — presidiu TODO el ejercicio 2024 ("O terceiro ano da Diretoria presidida por Leila
// Pereira", documento 2023-2024) Y TODO el ejercicio 2025 ("O quarto ano da Diretoria presidida por
// Leila Pereira (reeleita para o triênio 2025/2027)", documento 2024-2025) — confirmado por el
// propio documento en los 2 años, sin ambigüedad de transición a diferencia de Corinthians.
//
// memberCountByClub: null — no se encontró una cifra total de sócios/associados en ninguno de los 2
// PDF (sí hay ingresos de "Arrecadação social"/"Sócio torcedor Avanti", pero ninguna cantidad total
// de sócios impresa).
// ============================================================================

const palmeirasBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:170.868, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade e patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:142.976, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:52.805, disclosureLevel:'detailed' },
    { rawLabel:'Negociações com atletas (receita bruta)', normalizedCategory:'player_sales', amountNative:504.345, disclosureLevel:'detailed' },
    { rawLabel:'Sócio torcedor Avanti', normalizedCategory:'member_dues', amountNative:74.192, disclosureLevel:'detailed' },
    { rawLabel:'Incentivos Fiscais e outros', normalizedCategory:'other_income', amountNative:1.854, disclosureLevel:'detailed' },
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:63.329, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação social', normalizedCategory:'member_dues', amountNative:67.659, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamentos da marca e franquias', normalizedCategory:'sponsorship_commercial', amountNative:36.634, disclosureLevel:'detailed' },
    { rawLabel:'Departamentos amadores', normalizedCategory:'other_sports', amountNative:0.792, disclosureLevel:'detailed' },
    { rawLabel:'Contrato de superfícies - Arena (Allianz Parque)', normalizedCategory:'stadium_other', amountNative:81.900, disclosureLevel:'detailed' },
    { rawLabel:'Reversão de contingências - Real Arena', normalizedCategory:'other_income', amountNative:71.162, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas (Rendas diversas, resto)', normalizedCategory:'other_income', amountNative:2.844, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:180.084, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade e patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:203.398, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação de jogos', normalizedCategory:'matchday_competition', amountNative:67.230, disclosureLevel:'detailed' },
    { rawLabel:'Sócio torcedor Avanti', normalizedCategory:'member_dues', amountNative:73.614, disclosureLevel:'detailed' },
    { rawLabel:'Incentivos fiscais e outros', normalizedCategory:'other_income', amountNative:3.125, disclosureLevel:'detailed' },
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:318.945, disclosureLevel:'detailed' },
    { rawLabel:'Arrecadação social', normalizedCategory:'member_dues', amountNative:71.100, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamentos da marca e franquias', normalizedCategory:'sponsorship_commercial', amountNative:33.458, disclosureLevel:'detailed' },
    { rawLabel:'Departamentos amadores', normalizedCategory:'other_sports', amountNative:0.899, disclosureLevel:'detailed' },
    { rawLabel:'Contrato de superfícies - Arena (Allianz Parque)', normalizedCategory:'stadium_other', amountNative:72.000, disclosureLevel:'detailed' },
    { rawLabel:'Negociações de Atletas (receita bruta, nota "Outras Receitas")', normalizedCategory:'player_sales', amountNative:602.208, disclosureLevel:'detailed' },
    { rawLabel:'Outras Receitas — Outros (nota "Outras Receitas")', normalizedCategory:'other_income', amountNative:2.429, disclosureLevel:'detailed' },
    { rawLabel:'Deduções da receita bruta (nota "Outras Receitas", INSS)', normalizedCategory:'other_income', amountNative:-0.004, disclosureLevel:'detailed' },
  ],
};

const palmeirasBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Pessoal e encargos sociais (futebol profissional)', normalizedCategory:'wages_squad', amountNative:-319.790, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (futebol feminino)', normalizedCategory:'youth_other_sports_expense', amountNative:-12.382, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (futebol de base)', normalizedCategory:'youth_other_sports_expense', amountNative:-29.563, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (clube social e esportes amadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-29.396, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com direito de imagem (todas as colunas)', normalizedCategory:'wages_squad', amountNative:-87.293, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (todas as colunas)', normalizedCategory:'match_organisation_expense', amountNative:-30.198, disclosureLevel:'detailed' },
    { rawLabel:'Despesas sócio torcedor Avanti', normalizedCategory:'admin_general_expense', amountNative:-5.794, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-158.331, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (futebol feminino)', normalizedCategory:'youth_other_sports_expense', amountNative:-4.014, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (futebol de base)', normalizedCategory:'youth_other_sports_expense', amountNative:-16.802, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (clube social e esportes amadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-24.141, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação e amortização (todas as colunas)', normalizedCategory:'depreciation', amountNative:-18.894, disclosureLevel:'detailed' },
    { rawLabel:'Amortização - direitos de atletas e comissão técnica (todas as colunas)', normalizedCategory:'player_amortisation', amountNative:-107.580, disclosureLevel:'detailed' },
    { rawLabel:'Negociações com atletas — Baixa de Intangível', normalizedCategory:'player_amortisation', amountNative:-63.996, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Baixa', normalizedCategory:'player_amortisation', amountNative:-5.098, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Gastos com atletas/comissão técnica', normalizedCategory:'other_expenses', amountNative:-4.885, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Comissão', normalizedCategory:'other_expenses', amountNative:-64.008, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Gastos com formação de atletas', normalizedCategory:'youth_other_sports_expense', amountNative:-14.553, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Pessoal e encargos sociais (futebol profissional)', normalizedCategory:'wages_squad', amountNative:-419.192, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (futebol feminino)', normalizedCategory:'youth_other_sports_expense', amountNative:-15.624, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (futebol de base)', normalizedCategory:'youth_other_sports_expense', amountNative:-42.380, disclosureLevel:'detailed' },
    { rawLabel:'Pessoal e encargos sociais (clube social e esportes amadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-48.633, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com direito de imagem (todas as colunas)', normalizedCategory:'wages_squad', amountNative:-113.843, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (todas as colunas)', normalizedCategory:'match_organisation_expense', amountNative:-53.922, disclosureLevel:'detailed' },
    { rawLabel:'Despesas sócio torcedor Avanti', normalizedCategory:'admin_general_expense', amountNative:-6.982, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (futebol profissional)', normalizedCategory:'admin_general_expense', amountNative:-123.056, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (futebol feminino)', normalizedCategory:'youth_other_sports_expense', amountNative:-7.623, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (futebol de base)', normalizedCategory:'youth_other_sports_expense', amountNative:-25.351, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (clube social e esportes amadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-35.465, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação e amortização (todas as colunas)', normalizedCategory:'depreciation', amountNative:-19.958, disclosureLevel:'detailed' },
    { rawLabel:'Amortização - direitos de atletas e comissão técnica (todas as colunas)', normalizedCategory:'player_amortisation', amountNative:-228.169, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Perdas líquidas Negociações de Atletas', normalizedCategory:'player_amortisation', amountNative:-16.296, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Gastos com atletas/comissão técnica', normalizedCategory:'other_expenses', amountNative:-8.773, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Comissão', normalizedCategory:'other_expenses', amountNative:-68.342, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com comissões, atletas e baixas — Gastos com formação de atletas', normalizedCategory:'youth_other_sports_expense', amountNative:-12.768, disclosureLevel:'detailed' },
  ],
};

const palmeirasBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'palmeiras-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'leila',
    // grossDebt = 'Empréstimos e financiamentos' (circulante 39,759 + não circulante 0). cash =
    // 'Caixa e equivalentes de caixa'. Ver comentário de cabeçalho sobre 'Antecipação de contratos'
    // (632,876 M BRL, não incluído).
    grossDebt:39.759, cash:38.363,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receitas financeiras' (93,932) - 'Despesas financeiras' (170,388), Resultado
    // financeiro TOTAL das 4 colunas.
    netInterest:-76.456, tax:0,
    // officialTotalRevenue = suma de revenueLines (1.271,360 M BRL, inclui a receita bruta de
    // Negociações com atletas em vez do valor líquido). officialTotalExpenses = suma de expenseLines
    // (996,718 M BRL, inclui a 'Baixa de Intangível' reclassificada como gasto). officialPAT =
    // 'Superávit do exercício' impreso (198,183 M BRL, superávit real) — revenue-expenses+netInterest
    // da 198,186 (diferença de 0,003 M BRL / R$3 mil contra o impreso, ruído de redondeo da própria
    // nota "Outras Receitas"/"Rendas diversas", muito abaixo da tolerância de verifyTieOuts()).
    officialTotalRevenue:1271.360, officialTotalExpenses:996.718, officialPAT:198.183,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'palmeiras-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'leila',
    // grossDebt = 'Empréstimos e financiamentos' (circulante 0,234 + não circulante 0). cash =
    // 'Caixa e equivalentes de caixa'. Ver comentário de cabeçalho sobre 'Antecipação de contratos'
    // (452,930 M BRL, não incluído).
    grossDebt:0.234, cash:118.371,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = 'Receitas financeiras' (154,573) - 'Despesas financeiras' (244,287).
    netInterest:-89.714, tax:0,
    // officialTotalRevenue = suma de revenueLines (1.628,486 M BRL) = 'RECEITAS OPERACIONAIS'
    // impreso, EXACTO. officialTotalExpenses = suma de expenseLines (1.246,377 M BRL) = 'DESPESAS
    // OPERACIONAIS' impreso, EXACTO. officialPAT = 'SUPERÁVIT DO EXERCÍCIO' impreso (292,395 M BRL).
    officialTotalRevenue:1628.486, officialTotalExpenses:1246.377, officialPAT:292.395,
  },
};

const palmeirasBrPresupuestoOverlayByYear = {};

const palmeirasBrPasesData = [];
const palmeirasBrResultadosData = {};
const palmeirasBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['palmeiras-br'] = {
  revenueLinesByYear: palmeirasBrRevenueLinesByYear, expenseLinesByYear: palmeirasBrExpenseLinesByYear,
  fiscalYearMeta: palmeirasBrFiscalYearMeta, pasesData: palmeirasBrPasesData,
  resultadosData: palmeirasBrResultadosData, titulosData: palmeirasBrTitulosData,
  presupuestoOverlayByYear: palmeirasBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'palmeiras-br-demonstracoes-2024': {
    id:'palmeiras-br-demonstracoes-2024', clubId:'palmeiras-br',
    title:'Demonstrações Financeiras e Relatório dos Auditores Independentes, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.palmeiras.com.br/balancetes-e-demonstrativos-financeiros/',
    note:'PDF oficial (texto nativo), descarregado do portal de transparência oficial do Clube. DRE auditada segmentada em 4 colunas (Futebol profissional / Futebol feminino / Futebol de base / Clube social e esportes amadores) + Total — ver comentário de cabeçalho de data/palmeiras-br-data.js. Superávit real de R$198.183 mil, ano de venda grande de jogadores (Endrick para o Real Madrid, Luis Guilherme para o West Ham, entre outros — R$504.345 mil em receita bruta de Negociações com atletas). Convertido a USD com PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcrição completa em Clubes/Brasil/Palmeiras/demonstracoes-financeiras-2023-2024.md.',
  },
  'palmeiras-br-demonstracoes-2025': {
    id:'palmeiras-br-demonstracoes-2025', clubId:'palmeiras-br',
    title:'Demonstrações Financeiras e Relatório dos Auditores Independentes, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.palmeiras.com.br/balancetes-e-demonstrativos-financeiros/',
    note:'PDF oficial (texto nativo), mesmo canal que o de 2024, mesma estrutura de DRE em 4 colunas + Total. Superávit real de R$292.395 mil, novo recorde do Clube, impulsionado por Premiações (R$318.945 mil — vice-campeonato do Brasileirão e da Libertadores, participação na primeira Copa do Mundo de Clubes FIFA) e por receita bruta de Negociações de Atletas de R$602.208 mil. Convertido a USD com PTAX BCB de cierre 31/12/2025 (R$5,5024). Transcrição completa em Clubes/Brasil/Palmeiras/demonstracoes-financeiras-2024-2025.md.',
  },
});

gestionesByClub['palmeiras-br'] = {
  // Leila Pereira, Presidente, eleita para o triênio 2022/2024 e reeleita para o triênio 2025/2027 —
  // presidiu TODO o exercício 2024 e TODO o exercício 2025, confirmado pelo próprio documento nos 2
  // anos ("terceiro ano da Diretoria" em 2024, "quarto ano... reeleita" em 2025).
  leila: { nombre:'Leila Pereira (2022-2024, reeleita 2025-2027)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['palmeiras-br'] = null; // não se encontrou uma cifra total de sócios/associados em nenhum dos 2 PDF
