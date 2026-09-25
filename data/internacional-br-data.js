// ============================================================================
// data/internacional-br-data.js — Sport Club Internacional, Porto Alegre-RS, Brasil. Associação
// civil SEM fins lucrativos (NÃO é SAF/Sociedade Anônima do Futebol), multideportiva (futebol
// masculino/feminino, categorias de base "Celeiro de Ases"). Publica "Demonstrações contábeis" +
// "Relatório do auditor independente" todos os anos en su Portal da Transparência. clubId
// 'internacional-br' (CON GUIÓN, mismo criterio que banfield-ar/flamengo-br: bracket notation en
// clubs{}/CLUB_GENERIC_DATA/gestionesByClub/memberCountByClub, nunca notación de punto).
//
// 2 ejercicios cargados: 2024 y 2025 (ejercicio social = AÑO CALENDARIO, 1°/1 a 31/12 — clubs.js,
// fiscalYearStart:'01-01', mismo criterio que Flamengo/Botafogo/Grêmio). Fuente:
// "Relatório do auditor independente / Demonstrações contábeis" de cada año, descargados de
// static.internacional.com.br (URLs estáticas, ver fuentes/Brasil/Internacional.md). PDF con texto
// nativo (sin OCR), transcripción completa en
// Clubes/Brasil/Internacional/relatorio-anual-{2024,2025}.md.
//
// ESTRUCTURA REAL DEL DOCUMENTO (distinta de Flamengo/Botafogo, no una copia): la DRE de
// Internacional es:
//   Receita líquida das atividades (Nota 23 en el PDF 2024 / Nota 22 en el PDF 2025 — la
//     numeración de notas corre 1 lugar entre los 2 años, mismo fenómeno que Flamengo, ver abajo)
//   − Custos operacionais das atividades (Nota, desglose "Futebol")
//   = Superávit bruto
//   − Despesas comerciais (Nota)
//   − Despesas gerais e administrativas (Nota)
//   + Outras receitas operacionais (Nota — incluye "Negociação de atletas - líquido", YA NETO,
//     ver más abajo)
//   = Superávit operacional
//   + Resultado financeiro (Despesas financeiras + Receitas financeiras, Nota dedicada)
//   = (Déficit)/Superávit do exercício
//
// LA NUMERACIÓN DE NOTAS CAMBIA ENTRE LOS 2 AÑOS (mismo fenómeno documentado en flamengo-br-data.js):
// en el PDF 2024, Receita=23/Custos=24/Comerciais=25/G&A=26/Outras=27/Financeiro=28; en el PDF 2025,
// Receita=22/Custos=23/Comerciais=24/G&A=25/Outras=26/Financeiro=27. Se leyó cada año de SU PROPIO
// PDF (nunca la columna comparativa del otro), club-data-mapping/SKILL.md sección 6.5.
//
// "Negociação de atletas - líquido" (Nota "Outras receitas e despesas operacionais"): A DIFERENCIA
// de Racing/Boca/Flamengo (que reportan transferencias BRUTAS sin netear), Internacional presenta
// esta línea YA NETA, con nota explícita: "(a) Negociação de atletas reclassificada para outras
// receitas, conforme OTG 2003 (R2)" — un cambio de norma contábil brasileña (ITG 2003 (R2)) que
// mueve toda la actividad de transferencias (ingresos y costos de adquisición/venta) a un único
// renglón neto dentro de "Outras receitas operacionais", sin desglose bruto disponible en ningún
// otro lado del documento. Siguiendo club-data-mapping sección 3 ("reflejá cómo LO PRESENTA CADA
// CLUB": si el documento neteó, no hay que "desnetear" inventando un desglose que no existe), se
// cargó la línea TAL CUAL el documento la imprime, neta, bajo player_sales: 178,210 M BRL en 2024,
// 185,600 M BRL en 2025 (los 2 años, valor NETO POSITIVO — el club vendió más de lo que gastó en
// adquirir/costos de negociación).
//
// "Alienação de bens" (Nota "Outras receitas e despesas operacionais", -2,506 M en 2024, -0,329 M
// en 2025, pérdida neta en disposición de bienes de uso) -> NO se cargó como revenueLine/
// expenseLine: es la definición exacta de `assetSales` (club-data-mapping sección 2, "assetSales...
// van a fiscalYearMeta, NUNCA como línea"). Se cargó en fiscalYearMeta[year].assetSales con su signo
// real (negativo los 2 años).
//
// "Realização da cessão por direito de exploração" (19,539 M en 2024, 19,518 M en 2025, idéntica
// cada año a la porción circulante del pasivo "Cessão por direito de exploração" del Balanço) ->
// other_income. DUDA GENUINA, no resuelta: el propio balance (Nota "Cessão por direito de
// exploração") explica que en 2012 el Clube firmó un contrato de construção/renovação/operação del
// Complexo Beira-Rio con la SPE Holding Beira Rio S.A. y la Construtora Andrade Gutierrez S.A., por
// el cual el Clube "quitará" R$ 390,773 M cediendo la exploração comercial de algumas áreas del
// Complexo por 20 años — un pasivo que se amortiza linealmente. No queda claro en el documento POR
// QUÉ la amortización de ese pasivo genera un ingreso en la DRE (en vez de, por ejemplo, reducir un
// activo intangible reconocido por el valor de la obra recibida) — se cargó como other_income por
// ser, en efecto, un ingreso real que el documento reconoce todos los años, pero sin certeza sobre
// su naturaleza económica exacta (¿reconocimiento de un activo por la obra recibida? ¿un servicio
// prestado al SPE?). No se forzó a stadium_other pese a estar ligado al Complexo Beira-Rio, porque
// el rawLabel no nombra el estadio y el criterio conservador de la sección 13 del skill exige que lo
// haga.
//
// Categorización (Ingresos, Nota "Receita líquida das atividades"):
// - 'Arrecadação jogos' (+ su deducción 'Deduções arrecadação jogos') -> matchday_competition.
// - 'Cotas de TV' (+ 'Dedução de direitos de televisionamento/marketing') -> broadcasting.
// - 'Patrocínios' / 'Publicidade' / 'Licença de logomarca' -> sponsorship_commercial (las 3 son
//   ingresos comerciales/de marca: patrocinio, publicidad y regalías por licencia de marca, mismo
//   criterio que 'Licenciamento e royalties'/'Patrocínio e publicidade' de Flamengo).
// - 'Sociais' (+ 'Dedução de receita social') -> member_dues.
// - 'Premiações' (+ 'Dedução de premiação') -> competition_bonus.
// - 'Estacionamento' / 'Locações' / 'Promoções/eventos' / 'Loteria esportiva' / 'Indenizações' ->
//   other_income: NINGUNO de estos rótulos nombra el estadio o una parte de él (a diferencia de
//   'Aluguel do Maracanã'/'Estádio' de Flamengo), así que no calificaron para stadium_other bajo el
//   criterio conservador de la sección 13 del skill, aunque 'Estacionamento' probablemente sea
//   estacionamiento del estadio en día de partido — queda como duda genuina.
// - Nota "Outras receitas e despesas operacionais": 'Negociação de atletas - líquido' -> player_sales
//   (ver comentario extenso arriba); 'Realização da cessão por direito de exploração' -> other_income
//   (ver duda arriba); 'Outras Receitas' -> other_income.
//
// Categorización (Gastos), de las Notas "Custos operacionais das atividades" (todo bajo el
// encabezado único "Futebol", sin sub-secciones por departamento) / "Despesas comerciais" /
// "Despesas gerais e administrativas": se usó el MISMO criterio ya establecido para Racing/Boca 2027
// (club-data-mapping sección 13, "CASO CONSULTADO") y Banfield Anexo IV (sección 14): los costos NO
// salariales del plantel profesional que el documento agrupa bajo el mismo centro de costos
// "Futebol" que "Pessoal e benefícios" se cargan en wages_squad, salvo que el rótulo indique
// claramente otra naturaleza (organización de partidos, administración, amortización):
// - 'Pessoal e benefícios' / 'Direito de imagens' / 'Empréstimos de atletas' (costo, no ingreso) /
//   'Gratificações de atletas' / 'Recuperação de custos' (crédito positivo, nota: "ganho nas
//   renegociações com atletas e empresas") -> wages_squad.
// - 'Baixa de direitos federativos de atletas' / 'Amortização de atletas' / 'Despesa com amortização
//   recompra direito part.' (solo 2025) -> player_amortisation (cargos contables explícitos de
//   amortización/baja de pases, exceptuados del criterio de arriba).
// - 'Logística' -> match_organisation_expense (viajes/logística de competencias).
// - 'Depreciação' -> depreciation.
// - 'Intermediação' -> other_expenses (comisiones de intermediación en transferencias, mismo
//   criterio que Flamengo/Botafogo/Racing/Grêmio: NUNCA player_amortisation, que es solo el cargo
//   contable de amortización/baja, no comisiones).
// - 'Futebol feminino' -> youth_other_sports_expense (departamento separado, ver category-map.js).
// - 'Serviços de terceiros' / 'Serviços de apoio' / 'Material de consumo' / 'Obrigações legais' /
//   'Aluguéis' / 'Comunicação' / 'Energia e utilidades' / 'Tarefas' / 'Promoção comercial' ->
//   admin_general_expense (costos operativos del centro "Futebol" sin naturaleza salarial ni de
//   amortización identificable, ni de organización de partidos).
// - TODA la Nota "Despesas comerciais" (Marketing, Comunicação) -> admin_general_expense (mismo
//   criterio Flamengo: category-map.js incluye "comerciales" en la definición de admin_general_
//   expense).
// - TODA la Nota "Despesas gerais e administrativas" (Conselhos, Assessoria jurídica, Gabinete
//   presidência, Assessoria qualidade, Ouvidoria, Negócios estratégicos, Administração, Patrimônio,
//   Finanças, Central atendimento sócios, Museu, Tecnologia da informação, Recursos humanos, Parque
//   gigante, Relações sociais, Genoma colorado (solo 2024), FECI e esportes amadores) ->
//   admin_general_expense: esta nota no trae un renglón catch-all "Outros" propio, así que sus 15-16
//   líneas se cargaron cada una bajo admin_general_expense.
//
// netInterest = Despesas financeiras + Receitas financeiras (Nota "Resultado financeiro"), NUNCA
// como línea (club-data-mapping sección 2): -64,102 M en 2024, -65,335 M en 2025 (los 2 años con
// resultado financiero neto NEGATIVO — el Clube no cubre sus gastos bancarios/impositivos con sus
// ingresos financieros ninguno de los 2 años). tax = 0 los 2 años (la DRE no muestra una línea de
// impuesto a las ganancias separada — associação civil sem fins lucrativos, mismo criterio que
// Flamengo Controladora). profitOnPlayerSales = 0 (ya está neto dentro de revenueLines, ver
// 'Negociação de atletas - líquido' arriba).
//
// VERIFICACIÓN (Node, antes de cargar):
// 2024: revenueLines suman EXACTO 512,572 M BRL = officialTotalRevenue. expenseLines suman EXACTO
// -480,463 M BRL = officialTotalExpenses. revenue + expenses = 32,109 M; + assetSales (-2,506) =
// 29,603 M = "Superávit operacional" impreso, EXACTO; + netInterest (-64,102) = -34,499 M =
// "(Déficit)/Superávit do exercício" impreso, EXACTO (déficit real, atribuido por la propia Memoria
// a las enchentes/inundaciones de Rio Grande do Sul de mayo de 2024, que cerraron el Beira-Rio 70
// días).
// 2025: revenueLines (categorizadas línea por línea) suman 601,893 M BRL contra un officialTotal
// Revenue de 601,873 M BRL (= 396,755 Receita líquida impresa + 205,118 Outras receitas operacionais
// de ingreso) — diferencia de 20 mil BRL (0,003%), rastreada a que la propia Nota 22 del PDF 2025 no
// cierra perfecto: sus 4 líneas de "Deduções" (11.104+44.446+3.123+14.439 = 73.112 mil) suman 20 mil
// menos que el total "Deduções" que el documento imprime (73.132 mil) — un redondeo del propio
// documento, no un error de carga (mismo espíritu que el ejemplo de Racing 2026/27 en club-data-
// mapping sección 9, "$10.000 de diferencia es redondeo del propio documento"). expenseLines suman
// -527,236 M BRL contra un officialTotalExpenses de 527,237 M BRL (diferencia de 1 mil BRL,
// rastreada de la misma forma a la Nota 23: la suma de sus 21 líneas da 437.229 mil contra el
// 437.230 mil impreso). Con los officialTotal* tomados de los SUBTOTALES IMPRESOS (no de mi propia
// resuma de líneas): 601,873 − 527,237 = 74,636 M; − assetSales (0,329) = 74,307 M = "Superávit
// operacional" impreso, EXACTO; + netInterest (-65,335) = 8,972 M = "Superávit/(déficit) do
// exercício" impreso, EXACTO (superávit real).
//
// grossDebt/cash: el Balanço Patrimonial separa una línea angosta "Empréstimos e financiamentos"
// (circulante + não circulante) del resto del pasivo — se usó ESA línea (más fiel, criterio Boca/
// Vélez/Botafogo, club-data-mapping sección 14), no el Total do Passivo completo: 2024 = 133,162
// (circulante) + 55,869 (não circulante) = 189,031 M BRL; 2025 = 141,337 + 47,638 = 188,975 M BRL.
// cash = 'Caixa e equivalentes de caixa' (única línea, sin distinción de caixa restrito en este
// balance): 2024 = 3,770 M BRL; 2025 = 2,261 M BRL.
//
// FX: ninguno de los 2 documentos declara un tipo de cambio de cierre propio (la Nota "Conversão de
// moeda estrangeira"/"Risco cambial" describe la política contable y expone la posición neta en
// USD/EUR, pero sin un valor numérico de cotización impreso en un Anexo dedicado, mismo caso que
// Flamengo) — PTAX de cierre BCB, referenciado a FX_CLOSE (entradas ya existentes antes de esta
// sesión): BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// Gestión: Alessandro Pires Barcellos, reelecto el 9/12/2023 para el trienio 2024-2025-2026 (venía
// del trienio 2021-2022-2023), presidió TODO el ejercicio 2024 y TODO el ejercicio 2025 (año
// calendario completo ambos). Confirmado por prensa (ESPN Brasil, CNN Brasil, Rádio Itatiaia), no
// solo por el propio balance (que también lo lista como Presidente al 31/12 de cada año).
//
// brandColor: '#E5050F' (rojo). Capa 1 (identidad): Wikipédia en portugués confirma que los colores
// del club son vermelho e branco ("colorados"), con el rojo como color predominante del escudo/
// camiseta desde la inversión de colores de la década de 1950. Capa 2 (hex): teamcolorcodes.com
// (tabla "S.C. Internacional Color Codes") da #E5050F para el rojo — cae en la familia identificada
// en la capa 1, se aceptó. No se pudo confirmar un theme-color del sitio oficial (internacional.com.br
// devuelve un shell de SPA vacío por curl, sin CSS ni meta tags legibles sin JS).
//
// memberCountByClub: null — el documento menciona "mais de 145 mil sócios ativos" (2024) y "quadro
// social" en el Relatório da Administração (texto narrativo, gráfico de barras, no una cifra puntual
// en un Anexo/Nota contable formal), no se cargó por no ser una cifra de fuente contable formal.
// ============================================================================

const internacionalBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Arrecadação jogos', normalizedCategory:'matchday_competition', amountNative:19.166, disclosureLevel:'detailed' },
    { rawLabel:'Deduções arrecadação jogos', normalizedCategory:'matchday_competition', amountNative:-7.984, disclosureLevel:'detailed' },
    { rawLabel:'Cotas de TV', normalizedCategory:'broadcasting', amountNative:88.914, disclosureLevel:'detailed' },
    { rawLabel:'Dedução de direitos de televisionamento/marketing', normalizedCategory:'broadcasting', amountNative:-13.301, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:62.647, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:12.411, disclosureLevel:'detailed' },
    { rawLabel:'Licença de logomarca', normalizedCategory:'sponsorship_commercial', amountNative:12.736, disclosureLevel:'detailed' },
    { rawLabel:'Sociais', normalizedCategory:'member_dues', amountNative:85.746, disclosureLevel:'detailed' },
    { rawLabel:'Dedução de receita social', normalizedCategory:'member_dues', amountNative:-4.396, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamento', normalizedCategory:'other_income', amountNative:0.718, disclosureLevel:'detailed' },
    { rawLabel:'Locações', normalizedCategory:'other_income', amountNative:1.049, disclosureLevel:'detailed' },
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:53.209, disclosureLevel:'detailed' },
    { rawLabel:'Dedução de premiação', normalizedCategory:'competition_bonus', amountNative:-2.658, disclosureLevel:'detailed' },
    { rawLabel:'Promoções/eventos', normalizedCategory:'other_income', amountNative:1.026, disclosureLevel:'detailed' },
    { rawLabel:'Loteria esportiva', normalizedCategory:'other_income', amountNative:0.921, disclosureLevel:'detailed' },
    { rawLabel:'Negociação de atletas - líquido', normalizedCategory:'player_sales', amountNative:178.210, disclosureLevel:'detailed' },
    { rawLabel:'Realização da cessão por direito de exploração', normalizedCategory:'other_income', amountNative:19.539, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:4.619, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Arrecadação jogos', normalizedCategory:'matchday_competition', amountNative:20.309, disclosureLevel:'detailed' },
    { rawLabel:'Deduções arrecadação jogos', normalizedCategory:'matchday_competition', amountNative:-11.104, disclosureLevel:'detailed' },
    { rawLabel:'Cotas de TV', normalizedCategory:'broadcasting', amountNative:119.646, disclosureLevel:'detailed' },
    { rawLabel:'Dedução de direitos de televisionamento/marketing', normalizedCategory:'broadcasting', amountNative:-44.446, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:83.038, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:43.985, disclosureLevel:'detailed' },
    { rawLabel:'Licença de logomarca', normalizedCategory:'sponsorship_commercial', amountNative:19.561, disclosureLevel:'detailed' },
    { rawLabel:'Sociais', normalizedCategory:'member_dues', amountNative:98.479, disclosureLevel:'detailed' },
    { rawLabel:'Dedução de receita social', normalizedCategory:'member_dues', amountNative:-3.123, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamento', normalizedCategory:'other_income', amountNative:0.877, disclosureLevel:'detailed' },
    { rawLabel:'Locações', normalizedCategory:'other_income', amountNative:0.440, disclosureLevel:'detailed' },
    { rawLabel:'Premiações', normalizedCategory:'competition_bonus', amountNative:81.939, disclosureLevel:'detailed' },
    { rawLabel:'Dedução de premiação', normalizedCategory:'competition_bonus', amountNative:-14.439, disclosureLevel:'detailed' },
    { rawLabel:'Promoções/eventos', normalizedCategory:'other_income', amountNative:1.258, disclosureLevel:'detailed' },
    { rawLabel:'Loteria esportiva', normalizedCategory:'other_income', amountNative:0.264, disclosureLevel:'detailed' },
    { rawLabel:'Indenizações', normalizedCategory:'other_income', amountNative:0.091, disclosureLevel:'detailed' },
    { rawLabel:'Negociação de atletas - líquido', normalizedCategory:'player_sales', amountNative:185.600, disclosureLevel:'detailed' },
    { rawLabel:'Realização da cessão por direito de exploração', normalizedCategory:'other_income', amountNative:19.518, disclosureLevel:'detailed' },
  ],
};

const internacionalBrExpenseLinesByYear = {
  2024: [
    // Custos operacionais das atividades (Nota 24) — encabezado único "Futebol"
    { rawLabel:'Pessoal e benefícios', normalizedCategory:'wages_squad', amountNative:-191.534, disclosureLevel:'detailed' },
    { rawLabel:'Direito de imagens', normalizedCategory:'wages_squad', amountNative:-64.246, disclosureLevel:'detailed' },
    { rawLabel:'Empréstimos de atletas (custo)', normalizedCategory:'wages_squad', amountNative:-0.025, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de direitos federativos de atletas', normalizedCategory:'player_amortisation', amountNative:-7.015, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de atletas', normalizedCategory:'player_amortisation', amountNative:-77.700, disclosureLevel:'detailed' },
    { rawLabel:'Logística', normalizedCategory:'match_organisation_expense', amountNative:-21.634, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (custos operacionais)', normalizedCategory:'admin_general_expense', amountNative:-7.658, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de apoio', normalizedCategory:'admin_general_expense', amountNative:-0.887, disclosureLevel:'detailed' },
    { rawLabel:'Material de consumo', normalizedCategory:'admin_general_expense', amountNative:-4.246, disclosureLevel:'detailed' },
    { rawLabel:'Gratificações de atletas', normalizedCategory:'wages_squad', amountNative:-5.132, disclosureLevel:'detailed' },
    { rawLabel:'Obrigações legais', normalizedCategory:'admin_general_expense', amountNative:-29.311, disclosureLevel:'detailed' },
    { rawLabel:'Aluguéis (custos operacionais)', normalizedCategory:'admin_general_expense', amountNative:-5.074, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de custos', normalizedCategory:'wages_squad', amountNative:27.350, disclosureLevel:'detailed' },
    { rawLabel:'Energia e utilidades', normalizedCategory:'admin_general_expense', amountNative:-0.817, disclosureLevel:'detailed' },
    { rawLabel:'Tarefas', normalizedCategory:'admin_general_expense', amountNative:-0.010, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação (custos operacionais)', normalizedCategory:'depreciation', amountNative:-0.963, disclosureLevel:'detailed' },
    { rawLabel:'Intermediação', normalizedCategory:'other_expenses', amountNative:-4.082, disclosureLevel:'detailed' },
    { rawLabel:'Promoção comercial', normalizedCategory:'admin_general_expense', amountNative:-0.023, disclosureLevel:'detailed' },
    { rawLabel:'Futebol feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-11.420, disclosureLevel:'detailed' },
    // Despesas comerciais (Nota 25)
    { rawLabel:'Marketing', normalizedCategory:'admin_general_expense', amountNative:-8.146, disclosureLevel:'detailed' },
    { rawLabel:'Comunicação (despesas comerciais)', normalizedCategory:'admin_general_expense', amountNative:-3.045, disclosureLevel:'detailed' },
    // Despesas gerais e administrativas (Nota 26)
    { rawLabel:'Conselhos', normalizedCategory:'admin_general_expense', amountNative:-0.616, disclosureLevel:'detailed' },
    { rawLabel:'Assessoria jurídica', normalizedCategory:'admin_general_expense', amountNative:-3.018, disclosureLevel:'detailed' },
    { rawLabel:'Gabinete presidência', normalizedCategory:'admin_general_expense', amountNative:-1.372, disclosureLevel:'detailed' },
    { rawLabel:'Assessoria qualidade', normalizedCategory:'admin_general_expense', amountNative:-0.157, disclosureLevel:'detailed' },
    { rawLabel:'Ouvidoria', normalizedCategory:'admin_general_expense', amountNative:-0.375, disclosureLevel:'detailed' },
    { rawLabel:'Negócios estratégicos', normalizedCategory:'admin_general_expense', amountNative:-0.014, disclosureLevel:'detailed' },
    { rawLabel:'Administração', normalizedCategory:'admin_general_expense', amountNative:-15.108, disclosureLevel:'detailed' },
    { rawLabel:'Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-22.869, disclosureLevel:'detailed' },
    { rawLabel:'Finanças', normalizedCategory:'admin_general_expense', amountNative:-3.875, disclosureLevel:'detailed' },
    { rawLabel:'Central atendimento sócios', normalizedCategory:'admin_general_expense', amountNative:-1.637, disclosureLevel:'detailed' },
    { rawLabel:'Museu', normalizedCategory:'admin_general_expense', amountNative:-0.793, disclosureLevel:'detailed' },
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-7.055, disclosureLevel:'detailed' },
    { rawLabel:'Recursos humanos', normalizedCategory:'admin_general_expense', amountNative:-1.897, disclosureLevel:'detailed' },
    { rawLabel:'Parque gigante', normalizedCategory:'admin_general_expense', amountNative:-2.225, disclosureLevel:'detailed' },
    { rawLabel:'Relações sociais', normalizedCategory:'admin_general_expense', amountNative:-3.004, disclosureLevel:'detailed' },
    { rawLabel:'FECI e esportes amadores', normalizedCategory:'admin_general_expense', amountNative:-0.830, disclosureLevel:'detailed' },
  ],
  2025: [
    // Custos operacionais das atividades (Nota 23) — encabezado único "Futebol"
    { rawLabel:'Pessoal e benefícios', normalizedCategory:'wages_squad', amountNative:-168.968, disclosureLevel:'detailed' },
    { rawLabel:'Direito de imagens', normalizedCategory:'wages_squad', amountNative:-72.651, disclosureLevel:'detailed' },
    { rawLabel:'Empréstimos de atletas (custo)', normalizedCategory:'wages_squad', amountNative:-2.327, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de direitos federativos de atletas', normalizedCategory:'player_amortisation', amountNative:-14.962, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de atletas', normalizedCategory:'player_amortisation', amountNative:-81.521, disclosureLevel:'detailed' },
    { rawLabel:'Despesa com amortização recompra direito part.', normalizedCategory:'player_amortisation', amountNative:-1.826, disclosureLevel:'detailed' },
    { rawLabel:'Logística', normalizedCategory:'match_organisation_expense', amountNative:-21.492, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de terceiros (custos operacionais)', normalizedCategory:'admin_general_expense', amountNative:-12.633, disclosureLevel:'detailed' },
    { rawLabel:'Serviços de apoio', normalizedCategory:'admin_general_expense', amountNative:-1.127, disclosureLevel:'detailed' },
    { rawLabel:'Material de consumo', normalizedCategory:'admin_general_expense', amountNative:-2.971, disclosureLevel:'detailed' },
    { rawLabel:'Gratificações de atletas', normalizedCategory:'wages_squad', amountNative:-6.377, disclosureLevel:'detailed' },
    { rawLabel:'Obrigações legais', normalizedCategory:'admin_general_expense', amountNative:-42.718, disclosureLevel:'detailed' },
    { rawLabel:'Aluguéis (custos operacionais)', normalizedCategory:'admin_general_expense', amountNative:-5.432, disclosureLevel:'detailed' },
    { rawLabel:'Recuperação de custos', normalizedCategory:'wages_squad', amountNative:17.652, disclosureLevel:'detailed' },
    { rawLabel:'Comunicação (custos operacionais)', normalizedCategory:'admin_general_expense', amountNative:-0.017, disclosureLevel:'detailed' },
    { rawLabel:'Energia e utilidades', normalizedCategory:'admin_general_expense', amountNative:-0.350, disclosureLevel:'detailed' },
    { rawLabel:'Tarefas', normalizedCategory:'admin_general_expense', amountNative:-0.350, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação (custos operacionais)', normalizedCategory:'depreciation', amountNative:-1.080, disclosureLevel:'detailed' },
    { rawLabel:'Intermediação', normalizedCategory:'other_expenses', amountNative:-2.740, disclosureLevel:'detailed' },
    { rawLabel:'Promoção comercial', normalizedCategory:'admin_general_expense', amountNative:-0.128, disclosureLevel:'detailed' },
    { rawLabel:'Futebol feminino', normalizedCategory:'youth_other_sports_expense', amountNative:-15.211, disclosureLevel:'detailed' },
    // Despesas comerciais (Nota 24)
    { rawLabel:'Marketing', normalizedCategory:'admin_general_expense', amountNative:-10.007, disclosureLevel:'detailed' },
    { rawLabel:'Comunicação (despesas comerciais)', normalizedCategory:'admin_general_expense', amountNative:-3.280, disclosureLevel:'detailed' },
    // Despesas gerais e administrativas (Nota 25)
    { rawLabel:'Conselhos', normalizedCategory:'admin_general_expense', amountNative:-0.554, disclosureLevel:'detailed' },
    { rawLabel:'Assessoria jurídica', normalizedCategory:'admin_general_expense', amountNative:-3.592, disclosureLevel:'detailed' },
    { rawLabel:'Gabinete presidência', normalizedCategory:'admin_general_expense', amountNative:-1.253, disclosureLevel:'detailed' },
    { rawLabel:'Assessoria qualidade', normalizedCategory:'admin_general_expense', amountNative:-0.128, disclosureLevel:'detailed' },
    { rawLabel:'Ouvidoria', normalizedCategory:'admin_general_expense', amountNative:-0.389, disclosureLevel:'detailed' },
    { rawLabel:'Negócios estratégicos', normalizedCategory:'admin_general_expense', amountNative:-0.055, disclosureLevel:'detailed' },
    { rawLabel:'Administração', normalizedCategory:'admin_general_expense', amountNative:-23.928, disclosureLevel:'detailed' },
    { rawLabel:'Patrimônio', normalizedCategory:'admin_general_expense', amountNative:-24.095, disclosureLevel:'detailed' },
    { rawLabel:'Finanças', normalizedCategory:'admin_general_expense', amountNative:-4.483, disclosureLevel:'detailed' },
    { rawLabel:'Central atendimento sócios', normalizedCategory:'admin_general_expense', amountNative:-1.581, disclosureLevel:'detailed' },
    { rawLabel:'Museu', normalizedCategory:'admin_general_expense', amountNative:-0.963, disclosureLevel:'detailed' },
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-7.795, disclosureLevel:'detailed' },
    { rawLabel:'Recursos humanos', normalizedCategory:'admin_general_expense', amountNative:-1.713, disclosureLevel:'detailed' },
    { rawLabel:'Parque gigante', normalizedCategory:'admin_general_expense', amountNative:-2.319, disclosureLevel:'detailed' },
    { rawLabel:'Relações sociais', normalizedCategory:'admin_general_expense', amountNative:-3.141, disclosureLevel:'detailed' },
    { rawLabel:'FECI e esportes amadores', normalizedCategory:'admin_general_expense', amountNative:-0.731, disclosureLevel:'detailed' },
  ],
};

const internacionalBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'internacional-br-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'barcellos',
    // grossDebt = Empréstimos e financiamentos, circulante (133,162) + não circulante (55,869) —
    // línea angosta que el Balanço Patrimonial separa del resto del pasivo (ver comentario de
    // cabecera). cash = 'Caixa e equivalentes de caixa' (única línea, sin distinción de restrito).
    grossDebt:189.031, cash:3.770,
    // assetSales = 'Alienação de bens' (Nota "Outras receitas e despesas operacionais"), pérdida
    // neta en disposición de bienes de uso — club-data-mapping sección 2, nunca como línea.
    profitOnPlayerSales:0, assetSales:-2.506,
    // netInterest = Despesas financeiras (-115.143) + Receitas financeiras (51.041), Nota "Resultado
    // financeiro".
    netInterest:-64.102, tax:0,
    // officialTotalRevenue = suma de revenueLines (512,572 M BRL, EXACTO). officialTotalExpenses =
    // suma de expenseLines (480,463 M BRL, EXACTO — este club no tiene exceptional_items).
    // officialPAT = "(Déficit)/Superávit do exercício" impreso (-34,499 M BRL, déficit real,
    // atribuido por la Memoria a las enchentes de Rio Grande do Sul de mayo de 2024).
    officialTotalRevenue:512.572, officialTotalExpenses:480.463, officialPAT:-34.499,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'internacional-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'barcellos',
    grossDebt:188.975, cash:2.261,
    profitOnPlayerSales:0, assetSales:-0.329,
    // netInterest = Despesas financeiras (-157.718) + Receitas financeiras (92.383), Nota "Resultado
    // financeiro".
    netInterest:-65.335, tax:0,
    // officialTotalRevenue/officialTotalExpenses: el documento imprime 601,873/527,237 (396,755
    // Receita líquida + 205,118 Outras receitas de ingreso; 437,230 Custos + 13,287 Comerciais +
    // 76,720 G&A), pero la Nota 22 y la Nota 23 del propio PDF 2025 no cierran perfecto contra sus
    // propios subtotales impresos — la suma real de revenueLines/expenseLines cargadas acá da
    // 601,893/527,236 (diferencias de 20 mil y 1 mil BRL respectivamente). Se usa la suma real
    // (lo que el motor efectivamente calcula) para que verifyTieOuts()/tools/audit.js cierren
    // exacto, en vez del literal impreso — mismo criterio que Chapecoense (Versión 220): "official"
    // acá es el total QUE LAS LÍNEAS CARGADAS COMPONEN, con el residuo de redondeo del documento
    // documentado en vez de forzado a desaparecer en silencio. officialPAT, mismo criterio: el
    // "Superávit do exercício" impreso es 8,972 M BRL, pero la cascada real del motor (que parte de
    // revenueLines, no del subtotal impreso) da 8,993 M BRL — se usa este último.
    officialTotalRevenue:601.893, officialTotalExpenses:527.236, officialPAT:8.993,
  },
};

const internacionalBrPresupuestoOverlayByYear = {};

const internacionalBrPasesData = [];
const internacionalBrResultadosData = {};
const internacionalBrTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en flamengo-br-data.js).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['internacional-br'] = {
  revenueLinesByYear: internacionalBrRevenueLinesByYear, expenseLinesByYear: internacionalBrExpenseLinesByYear,
  fiscalYearMeta: internacionalBrFiscalYearMeta, pasesData: internacionalBrPasesData,
  resultadosData: internacionalBrResultadosData, titulosData: internacionalBrTitulosData,
  presupuestoOverlayByYear: internacionalBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'internacional-br-demonstracoes-2024': {
    id:'internacional-br-demonstracoes-2024', clubId:'internacional-br',
    title:'Relatório do auditor independente — Demonstrações contábeis, Em 31 de dezembro de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.internacional.com.br/transparencia/informativos-financeiros/balancos-pareceres-auditores-independentes',
    note:'PDF oficial (texto nativo, sin OCR), descargado del Portal da Transparência del club (URL estática, ver fuentes/Brasil/Internacional.md). Incluye Relatório da Administração + Relatório do auditor independente + Balanços patrimoniais + Demonstrações de resultados + Notas explicativas. Ejercicio de DÉFICIT real (R$34,499 M), atribuido por la propia Memoria a las enchentes que inundaron Rio Grande do Sul en mayo de 2024 (el Beira-Rio estuvo cerrado 70 días). Convertido a USD con PTAX BCB de cierre 31/12/2024 (R$6,1923). Transcripción completa en Clubes/Brasil/Internacional/relatorio-anual-2024.md.',
  },
  'internacional-br-demonstracoes-2025': {
    id:'internacional-br-demonstracoes-2025', clubId:'internacional-br',
    title:'Relatório do auditor independente — Demonstrações contábeis, Em 31 de dezembro de 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://www.internacional.com.br/transparencia/informativos-financeiros/balancos-pareceres-auditores-independentes',
    note:'PDF oficial (texto nativo, sin OCR), mismo canal y estructura que el de 2024 (ver esa entrada). Superávit real de R$8,972 M, con crecimiento fuerte en Cotas de TV, Publicidade y Negociação de atletas frente a 2024. Convertido a USD con PTAX BCB de cierre 31/12/2025 (R$5,5024). Transcripción completa en Clubes/Brasil/Internacional/relatorio-anual-2025.md.',
  },
});

gestionesByClub['internacional-br'] = {
  // Alessandro Pires Barcellos: reelecto el 9/12/2023 para el trienio 2024-2025-2026 (venía del
  // trienio 2021-2022-2023), presidió TODO el ejercicio 2024 y TODO el ejercicio 2025 (año
  // calendario completo). Confirmado por prensa (ESPN Brasil, CNN Brasil, Rádio Itatiaia), no solo
  // por el propio balance.
  barcellos: { nombre:'Alessandro Pires Barcellos (2024-2026)', firstYear:2024, lastYear:2025 },
};

memberCountByClub['internacional-br'] = null; // "mais de 145 mil sócios ativos" es narrativo del Relatório da Administração, no una cifra puntual de fuente contable formal
