// ============================================================================
// data/voltaredonda-br-data.js — Volta Redonda Futebol Clube (RJ, Brasil).
// Sigue siendo ASSOCIAÇÃO CIVIL SEM FINS LUCRATIVOS (CNPJ 29.444.957/0001-09,
// isenta de IRPJ/CSLL por el art. 195 CF, ver Nota 3.7.1), NO se convirtió a SAF — distinto de
// Botafogo/Cruzeiro/Coritiba (mismo país, ya SAF). 2 ejercicios cargados: 2024 y 2025, ambos
// ejercicio social = AÑO CALENDARIO completo (1°/1 a 31/12), mismo criterio que
// Grêmio/Botafogo (fiscalYearStart:'01-01').
//
// FUENTES (ver fuentes/Brasil/Volta Redonda.md para cómo se consiguieron, incluye 2 gotchas de
// portal encadenados):
// - 2024: `balanco-2024.pdf` (27 págs., bajado del repositorio de la FERJ — Federação de Futebol
//   do Estado do Rio de Janeiro —, NO del portal propio del club). Es un ESCANEO sin capa de
//   texto, transcripto vía OCR (Tesseract) en `balanco-2024.md`.
// - 2025: `demonstracoes-financeiras-2025.pdf` (23 págs., portal propio de transparencia del
//   club — voltaco.com.br/api/documents), "31 de dezembro de 2025 e 2024" — PDF con texto nativo,
//   transcripción completa (`pdftotext -layout`) en `demonstracoes-financeiras-2025.md`. Es la
//   fuente PRIMARIA de 2025. Trae también, como columna comparativa, el ejercicio 2024 completo.
//   Complementarios (mismo paquete de transparencia, no aportan líneas de datos nuevas):
//   `dre-2025.md` (salida cruda del sistema contable, más granular pero mezcla Futebol
//   Profissional + Administrativo en un solo bloque — ver cruce abajo) y
//   `parecer-auditoria-externa-2025.md` (dictamen del auditor externo, Activa Assessoria e
//   Contabilidades Ltda., "Opinião com ressalvas": la única salvedad real es que el Imobilizado
//   (Nota 9) se deprecia solo PARCIALMENTE — el Clube no tiene control individual de los bienes
//   registrados —, sin impacto en las líneas de revenue/expense que se cargan acá; ninguna
//   salvedad sobre ingresos/gastos operativos).
//
// HALLAZGO IMPORTANTE — LA TRANSCRIPCIÓN OCR DE balanco-2024.md TIENE UN ERROR DE UN DÍGITO,
// DETECTADO Y CORREGIDO CRUZANDO CONTRA demonstracoes-financeiras-2025.md: la Nota 13.1(iii) de
// balanco-2024.md (OCR) transcribe "Premiações, Bilheterias e Outros" = 933.597,41 (2024), que
// junto a "Direitos Federativos" (2.154.957,15) suma 3.088.554,56 — NO reconcilia contra el total
// de la propia nota (3.518.554,56) ni contra la línea de la DRE ("Premiações, Bilheterias,
// Direitos Federativos e Outros" = 3.518.554,56). La misma Nota 13.1(iii), leída en la columna
// comparativa "31/12/2024" de demonstracoes-financeiras-2025.md (texto nativo, sin OCR), da
// "Premiações, Bilheterias e Outros" = 1.363.597,41 — que SÍ reconcilia exacto (2.154.957,15 +
// 1.363.597,41 = 3.518.554,56). Es un dígito mal leído por el OCR (933 vs. 1.363, con las cifras
// visualmente parecidas en el escaneo). Se usó el valor de demonstracoes-financeiras-2025.md (más
// confiable, texto nativo) para las 2 líneas de esta nota en AMBOS ejercicios — el resto de
// balanco-2024.md (Balanço, DRE, Notas 4/7/8/9/10/11/12) reconcilia exacto entre las 2
// transcripciones, así que el resto de las cifras de 2024 son indistintas entre ambas fuentes.
//
// CRUCE dre-2025.md CONTRA demonstracoes-financeiras-2025.md (pedido explícito de la consigna):
// dre-2025.md es una salida CRUDA del sistema contable (no auditada, "RECEITA OPERACIONAL BRUTA"
// = 26.396.926,24) que junta en un solo bloque lo que el balance auditado separa en 2 secciones
// ("Receitas Operacionais Futebol Profissional" 25.636.354,03 + "Receitas Administrativas"
// 760.572,21 = 26.396.926,24 EXACTO). Es el MISMO dato del mismo ejercicio, presentado con más
// desglose (7 líneas: Receitas Sociais/Outras Receitas/Receita Loteria/Cota de TV/Receitas com
// Atletas/Receitas de Transmissão/Direito Comercial) pero SIN el corte Futebol
// Profissional/Administrativo del balance auditado — no es una fuente alternativa a promediar, es
// el mismo número visto con otro criterio de agrupación. Confirmación útil que aportó: la línea
// "RECEITAS COM ATLETAS" = 4.980.465,52 (2025) coincide EXACTO con "Direitos Federativos" de la
// Nota 13.1(iii) del balance auditado (2025) — confirma que "Direitos Federativos" es ingreso
// ligado a atletas (transferencias/mecanismo de solidaridad/direitos federativos de jogadores), no
// un ítem de recaudación de entradas o premios, y por eso se categorizó como player_sales (ver
// abajo), promovida a línea propia en vez de quedar enterrada junto con "Premiações/Bilheterias"
// (mismo criterio que club-data-mapping SKILL.md sección 1: sub-ítems con categoría real distinta
// se promueven a líneas de primer nivel).
//
// Escala: cifras del documento "Em reais" (reais completos, no milhares) — acá en MILLONES de BRL
// nativos (dividir por 1.000.000).
//
// Categorización:
// - 'Receita Líquida de Direitos de Transmissão e cota de TV' -> broadcasting (ya neta de Taxa
//   FERJ/Taxa LIBRA/INSS/SAFERJ, ver Nota 13.1(i) — se usa la cifra NETA impresa en la DRE, no la
//   bruta, para no inflar revenue con deducciones que el propio club ya descontó).
// - 'Patrocínio e Publicidade' -> sponsorship_commercial.
// - 'Direitos Federativos' (Nota 13.1(iii), promovida) -> player_sales: confirmado por el cruce
//   contra dre-2025.md ("Receitas com Atletas"), ver arriba.
// - 'Premiações, Bilheterias e Outros' (Nota 13.1(iii), promovida) -> matchday_competition, mismo
//   criterio que River/Racing para una línea de premios+entradas que el club no separa más
//   (club-data-mapping SKILL.md sección 1, tabla).
// - 'Contribuições associados' -> member_dues.
// - 'Receita Repasse Timemania' (recursos de la lotería federal Timemania, un programa de
//   financiamiento del deporte con partidas fijas a clubes con deuda federal parcelada, ver Nota
//   5) -> other_income: no es cuota social, sponsor ni televisación, es un ingreso de programa
//   estatal/lotería sin categoría propia en el sitio.
// - 'Doações recebidas, Franquias e Outros' -> other_income.
// - 'Despesas com pessoal e encargos' (Futebol Profissional) -> wages_squad.
// - 'Despesas gerais e administrativas' (Futebol Profissional, distinta de "Despesas com jogos",
//   que se reporta aparte) -> admin_general_expense, mismo criterio que Botafogo (Despesas G&A ->
//   admin_general_expense) — el documento no desglosa esta línea más, así que no se puede separar
//   qué parte es logística de partidos vs. administración pura del departamento de fútbol.
// - 'Despesas com jogos' (Futebol Profissional Y Futebol Amador) -> match_organisation_expense
//   para el bloque profesional; para el bloque Amador, ver el ítem siguiente (todo el bloque
//   Amador va junto).
// - 'Despesas com pessoal e encargos' / 'Despesas gerais e administrativas' / 'Despesas com jogos'
//   (bloque ADMINISTRATIVO E FUTEBOL AMADOR, sub-bloque Futebol Amador) -> las 3 líneas de
//   personal/generales/juegos del Futebol Amador van a youth_other_sports_expense (todo el
//   departamento de fútbol amateur/juvenil junto, el documento no separa más).
// - 'Despesas com pessoal e encargos' / 'Despesas gerais e administrativas' (sub-bloque
//   Administrativo, distinto de Futebol Amador) -> admin_general_expense.
// - 'Ganho Mensuração a Valor Justo' (2024 solamente: reavaliação a valor de mercado de 2 imóveis
//   del club, Nota 9 — un ítem no operativo, no recurrente, NO es venta de activo real, es un
//   ajuste contable de revalúo) -> línea de GASTO con normalizedCategory:'exceptional_items' y
//   amountNative POSITIVO (+6,824758997 M), mismo mecanismo que usó Botafogo para su "Resultado de
//   equivalência patrimonial" (ahí negativo): sumCat(expenseLines,['exceptional_items']) no aplica
//   Math.abs(), así que un valor positivo ahí SUMA a operatingProfit/PAT sin inflar el KPI
//   "Expenses" (que excluye exceptional_items) ni el KPI "Revenue" (que solo suma revenueLines).
//   2025 no tuvo revalúo (línea en $0 en la DRE), así que no se cargó ninguna línea equivalente
//   para 2025.
//
// Verificación (Node, antes de cargar — sección 6 club-data-mapping SKILL.md):
// 2024: revenueLines suma EXACTO 12,64343688 M BRL = "Receitas Operacionais Futebol Profissional"
//   (12,037167,28... es decir 12.037.167,28) + "Receitas Administrativas" (606.269,60) impresos por
//   separado en la DRE. expenseLines (sin exceptional_items) suma EXACTO -11,91917173 M BRL, y
//   revenue+expenses = 0,72426515 M = "Resultado Antes do Resultado Financeiro" (724.265,15)
//   EXACTO. + netInterest (-0,28533224) = 0,43893291 M = "Resultado Antes do Ganho de Mensuração a
//   Valor Justo" (438.932,91) EXACTO. + exceptional_items (+6,82475897) = 7,26369188 M =
//   "Superávit do exercício" (7.263.691,88) EXACTO.
// 2025: revenueLines suma EXACTO 26,39692624 M BRL = "Receitas Operacionais Futebol Profissional"
//   (25.636.354,03) + "Receitas Administrativas" (760.572,21), Y coincide con "RECEITA OPERACIONAL
//   BRUTA" de dre-2025.md (26.396.926,24, ver cruce arriba). expenseLines suma EXACTO
//   -25,64340464 M BRL. revenue+expenses = 0,7535216 M = "Resultado Antes do Resultado Financeiro"
//   (753.521,60) EXACTO. + netInterest (-0,71628018) = 0,03724142 M = "Resultado do exercício"
//   (37.241,42) EXACTO — 2025 no tuvo revalúo, así que ese es también el Superávit final.
//
// grossDebt = "Empréstimos e Financiamentos" (Passivo circulante, la única línea de deuda
// FINANCIERA del balance — distinta de "Tributos e Encargos Sociais"/"Regime Centralizado de
// Execução"/"Recursos Parceria em Projetos", que son deuda impositiva/laboral/de proyectos, no
// financiera, mismo criterio de sección 14 club-data-mapping SKILL.md). Para 2024 esta línea del
// Balanço (1.846.486,86) NO coincidía con el total de su propia Nota 10 en balanco-2024.md
// (1.671.326,45, solo "Empréstimos... Pessoas Físicas e Jurídicas") — la Nota 10 de
// demonstracoes-financeiras-2025.md (comparativo 2024) agrega una sub-línea "Conta Corrente FERJ"
// (175.160,41) que junto a la otra suma EXACTO el total del Balanço (1.846.486,86): mismo tipo de
// gap de OCR que la Nota 13.1(iii) de arriba, resuelto con la misma fuente más confiable. cash =
// "Caixa e Equivalentes de Caixa" (Ativo circulante, Nota 4).
//
// FX: el documento no declara tipo de cambio propio (es una associação brasileña con toda su
// operación en BRL, sin balance en moneda extranjera) -> PTAX de cierre BCB, ya en
// data/currency-map.js: BRL@2024-12-31 (6,1923) y BRL@2025-12-31 (5,5024).
//
// Gestión: los 2 balances (2024 y 2025) están firmados por "FLAVIO CAUTIERO HORTA JARDIM —
// PRESIDENTE" (mismo presidente que ya aparecía en 2017 según la Nota 1.3, "Presidente do VRFC
// Flávio Horta") — confirmación de fuente primaria suficiente para una entrada real en
// gestionesByClub (a diferencia de Botafogo, que quedó sin confirmar).
//
// Color de marca: NO se cargó (brandColor:null). Wikipedia (pt) y varias fuentes de prensa
// deportiva confirman que el club es tricolor (preto, amarelo e branco — "las mismas cores da
// cidade"), con camisa titular "predominantemente listrada em preto e amarelo" (a rayas
// negro/amarillo, blanco como color terciario) — sin una fuente que declare cuál de los 2 colores
// de la franja predomina, es el mismo caso "franja a rayas de 2 colores sin desempate confiable"
// de club-or-year-onboarding SKILL.md sección 3 (ahí para bicolores en partes iguales), así que
// queda en null en vez de adivinar. Ver fuentes/Brasil/Volta Redonda.md.
// ============================================================================

const voltaredondaBrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Receita Líquida de Direitos de Transmissão e cota de TV', normalizedCategory:'broadcasting', amountNative:5.83544192, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:2.68317080, disclosureLevel:'detailed' },
    { rawLabel:'Direitos Federativos', normalizedCategory:'player_sales', amountNative:2.15495715, disclosureLevel:'detailed' },
    { rawLabel:'Premiações, Bilheterias e Outros', normalizedCategory:'matchday_competition', amountNative:1.36359741, disclosureLevel:'detailed' },
    { rawLabel:'Contribuições associados', normalizedCategory:'member_dues', amountNative:0.05095031, disclosureLevel:'detailed' },
    { rawLabel:'Receita Repasse Timemania', normalizedCategory:'other_income', amountNative:0.48623513, disclosureLevel:'detailed' },
    { rawLabel:'Doações recebidas, Franquias e Outros', normalizedCategory:'other_income', amountNative:0.06908416, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Receita Líquida de Direitos de Transmissão e cota de TV', normalizedCategory:'broadcasting', amountNative:12.26938381, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínio e Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.37052755, disclosureLevel:'detailed' },
    { rawLabel:'Direitos Federativos', normalizedCategory:'player_sales', amountNative:4.98046552, disclosureLevel:'detailed' },
    { rawLabel:'Premiações, Bilheterias e Outros', normalizedCategory:'matchday_competition', amountNative:7.01597715, disclosureLevel:'detailed' },
    { rawLabel:'Contribuições associados', normalizedCategory:'member_dues', amountNative:0.07220813, disclosureLevel:'detailed' },
    { rawLabel:'Receita Repasse Timemania', normalizedCategory:'other_income', amountNative:0.65985353, disclosureLevel:'detailed' },
    { rawLabel:'Doações recebidas, Franquias e Outros', normalizedCategory:'other_income', amountNative:0.02851055, disclosureLevel:'detailed' },
  ],
};

const voltaredondaBrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Despesas com pessoal e encargos (Futebol Profissional)', normalizedCategory:'wages_squad', amountNative:-5.57307949, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Profissional)', normalizedCategory:'admin_general_expense', amountNative:-2.11388681, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Profissional)', normalizedCategory:'match_organisation_expense', amountNative:-0.96620401, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-1.46905202, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.64985277, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.53681976, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.47456737, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.13570950, disclosureLevel:'detailed' },
    { rawLabel:'Ganho Mensuração a Valor Justo (reavaliação de imóveis, Nota 9)', normalizedCategory:'exceptional_items', amountNative:6.82475897, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Despesas com pessoal e encargos (Futebol Profissional)', normalizedCategory:'wages_squad', amountNative:-13.46611760, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Profissional)', normalizedCategory:'admin_general_expense', amountNative:-5.26560713, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Profissional)', normalizedCategory:'match_organisation_expense', amountNative:-2.16276302, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-1.08872313, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Administrativo)', normalizedCategory:'admin_general_expense', amountNative:-0.95719786, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com pessoal e encargos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.74612937, disclosureLevel:'detailed' },
    { rawLabel:'Despesas gerais e administrativas (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-1.70213927, disclosureLevel:'detailed' },
    { rawLabel:'Despesas com jogos (Futebol Amador)', normalizedCategory:'youth_other_sports_expense', amountNative:-0.25472726, disclosureLevel:'detailed' },
  ],
};

const voltaredondaBrFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'voltaredonda-br-balanco-2024',
    reportType:'official_balance_sheet',
    gestionId:'hortajardim',
    // grossDebt = "Empréstimos e Financiamentos" (Passivo circulante, Nota 10 — ver comentario de
    // cabecera sobre el gap de OCR con la Nota 10 de balanco-2024.md, resuelto contra
    // demonstracoes-financeiras-2025.md). cash = "Caixa e Equivalentes de Caixa" (Nota 4).
    grossDebt:1.84648686, cash:0.06612846,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas Financeiras (810,98) - Despesas Financeiras (286.143,22), EXACTO
    // igual al "Receitas/Despesas Financeiras" impreso en la DRE.
    netInterest:-0.28533224,
    // Associação civil sem fins lucrativos: isenta de IRPJ/CSLL (Nota 3.7.1, art. 195 CF).
    tax:0,
    officialTotalRevenue:12.64343688, officialTotalExpenses:11.91917173, officialPAT:7.26369188,
  },
  2025: {
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'voltaredonda-br-demonstracoes-2025',
    reportType:'official_balance_sheet',
    gestionId:'hortajardim',
    grossDebt:1.73506244, cash:1.12316442,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = Receitas Financeiras (97,36) - Despesas Financeiras (716.377,54), EXACTO igual
    // al "Receitas/Despesas Financeiras" impreso en la DRE.
    netInterest:-0.71628018,
    tax:0,
    officialTotalRevenue:26.39692624, officialTotalExpenses:25.64340464, officialPAT:0.03724142,
  },
};

const voltaredondaBrPresupuestoOverlayByYear = {};

const voltaredondaBrPasesData = [];
const voltaredondaBrResultadosData = {};
const voltaredondaBrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['voltaredonda-br'] = {
  revenueLinesByYear: voltaredondaBrRevenueLinesByYear, expenseLinesByYear: voltaredondaBrExpenseLinesByYear,
  fiscalYearMeta: voltaredondaBrFiscalYearMeta, pasesData: voltaredondaBrPasesData,
  resultadosData: voltaredondaBrResultadosData, titulosData: voltaredondaBrTitulosData,
  presupuestoOverlayByYear: voltaredondaBrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'voltaredonda-br-balanco-2024': {
      id:'voltaredonda-br-balanco-2024', clubId:'voltaredonda-br',
      title:'Demonstrações Financeiras do Volta Redonda Futebol Clube, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://servicos.fferj.com.br/ClubesLigas/ViewTeam?alias=134',
      note:'PDF escaneado sin capa de texto, transcripto vía OCR (Tesseract) — Clubes/Brasil/Volta Redonda/balanco-2024.md. Bajado del repositorio de la FERJ (Federação de Futebol do Estado do Rio de Janeiro), no del portal propio del club (que hoy no tiene histórico anterior a 2025). La transcripción OCR de la Nota 13.1(iii) (desglose de "Premiações, Bilheterias, Direitos Federativos e Outros") tenía un dígito mal leído; se corrigió cruzando contra la columna comparativa 2024 de demonstracoes-financeiras-2025.md (texto nativo), que sí reconcilia exacto — ver comentario de cabecera de data/voltaredonda-data.js. El resto de las cifras de 2024 reconcilia igual entre ambas fuentes.',
    },
  'voltaredonda-br-demonstracoes-2025': {
      id:'voltaredonda-br-demonstracoes-2025', clubId:'voltaredonda-br',
      title:'Demonstrações Financeiras do Volta Redonda Futebol Clube, Exercícios Findos em 31 de Dezembro de 2025 e de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://voltaco.com.br/transparency',
      note:'PDF con texto nativo, descargado del portal propio de transparencia del club (API https://voltaco.com.br/api/documents, URLs firmadas MinIO/S3 con caducidad de 24 h). Transcripción completa en Clubes/Brasil/Volta Redonda/demonstracoes-financeiras-2025.md. Auditado por Activa Assessoria e Contabilidades Ltda., opinião com ressalvas (parecer-auditoria-externa-2025.md): la única salvedad real es depreciación del Imobilizado contabilizada solo parcialmente (sin control individual de bienes), sin impacto en las líneas de revenue/expense cargadas — no hay salvedad sobre ingresos ni gastos operativos. dre-2025.md (salida cruda del sistema contable, no auditada) reconcilia exacto contra el total de este balance (26.396.926,24 = Futebol Profissional + Administrativo del balance auditado) — mismo dato, más granular, no una fuente alternativa.',
    },
});

gestionesByClub['voltaredonda-br'] = {
  // Los 2 balances cargados (2024 y 2025) están firmados por el mismo presidente, y la Nota 1.3
  // de ambos documentos ya lo menciona presidiendo el club en 2017 — confirmación de fuente
  // primaria directa, no una atribución genérica.
  hortajardim: { nombre:'Flávio Cautiero Horta Jardim', firstYear:2024, lastYear:2025 },
};

memberCountByClub['voltaredonda-br'] = null;
