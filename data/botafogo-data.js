// ============================================================================
// data/botafogo-data.js — Botafogo Sociedade Anônima do Futebol (SAF), Rio de Janeiro, Brasil.
// El club tiene DOS entidades reales: la SAF (Botafogo Futebol S.A., el negocio de fútbol
// profesional, convertida en 2022) y a associação "Botafogo de Futebol e Regatas" (club social sin
// fines de lucro, entidad separada). Se cargó la SAF (ver fuentes/Brasil/_notas-generales.md y
// Botafogo.md: "la SAF sigue siendo la entidad principal a cargar" — es el negocio de fútbol). 1
// ejercicio cargado: 2024 (ejercicio social = AÑO CALENDARIO completo, 1°/1 a 31/12/2024 — ver
// clubs.js, fiscalYearStart:'01-01', mismo criterio que Grêmio/isCalendarYearClub()).
//
// Fuente: "Demonstrações Financeiras" da SAF Botafogo, exercícios findos em 31/12/2024 e 2023,
// descargado de botafogo.com/download/transparencia/balanco (portal oficial de transparencia del
// club). PDF con texto nativo, transcripción completa en
// Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md.
//
// Se usó la columna CONTROLADORA (la SAF standalone) en TODAS las líneas, no la columna Consolidado
// (que suma una subsidiaria menor) — mismo criterio en todo el ejercicio, para no mezclar 2
// perímetros de consolidación distintos en el mismo set de datos. Escala: valores originales "em
// milhares de reais" (miles de reales), acá en MILLONES de BRL nativos (dividir por 1.000, mismo
// criterio que Grêmio).
//
// ESTRUCTURA REAL DEL DOCUMENTO (importante para no duplicar plata al leer el código de abajo): la
// DRE tiene DOS bloques de revenue/expense separados, no uno solo:
// 1) "Receita Operacional" (607.322) − "Deduções sobre a receita" (55.051) = "Receita Operacional,
//    líquida" (552.271), con el detalle línea por línea en la Nota 20 ("Segregação das receitas por
//    natureza"). Este bloque NO incluye venta de jugadores.
// 2) MÁS ABAJO en la misma DRE, un bloque SEPARADO "Resultado com transações de direitos de
//    atletas" (Nota 24): "Receitas transações de direitos de atletas" (96.356, venta definitiva de
//    jugadores) y "Gastos na transação de direitos de atletas" (-45.832, que la Nota 24 desglosa en
//    3: mecanismo de solidaridad pagado, baja de intangibles, gastos de intermediación).
// La línea "Outras receitas e despesas operacionais (142.762)" que aparece ENTRE estos 2 bloques en
// la DRE impresa es un SUBTOTAL corrido (Resultado Operacional Antes da Alienação de Ativos +
// Receitas transações + Gastos transações = -193.286+96.356-45.832 = -142.762 exacto), NO una línea
// de gasto adicional — no se cargó como línea propia para no duplicar todo lo de arriba.
//
// Categorización:
// - 'Camisa 7' (Nota 20.5, título real de la nota: "Sócio torcedor (Camisa 7)") -> member_dues: es el
//   programa de socios-hinchas del club (superó 80 mil socios activos en 2024 según la nota), NO un
//   sponsor de camiseta como sugiere el nombre a primera vista — se confirmó leyendo el texto
//   completo de la nota antes de categorizar.
// - 'Premiação'/'Participação em competições' -> competition_bonus; 'Bilheteria' -> matchday_competition;
//   'Operação em estádio' (concesiones/operación del estadio Nilton Santos) -> matchday_competition,
//   mismo criterio que "Estadio" de River.
// - 'Venda de mercadorias'/'Licenciamento'/'Patrocínios'/'Publicidade em placas'/'Mídias digitais' ->
//   sponsorship_commercial (categoría que ya incluye merchandising).
// - 'Cessão temporária' (préstamos de jugadores) -> player_sales; 'Mecanismo de Solidariedade'
//   (recibido, Nota 20.6) -> youth_football, igual que Grêmio.
// - 'Cessão definitiva de atletas' (Nota 24.1, venta de jugadores) -> player_sales.
// - 'Deduções sobre a receita' (impuestos específicos del fútbol + direito de arena + otras, Nota 20)
//   -> other_income (línea negativa, contra-revenue, no atribuible a una sola categoría de arriba).
// - Costo de servicios (Nota 21): 'Salários, encargos e benefícios' -> wages_squad; 'Amortização de
//   atletas' -> player_amortisation; 'Direito de imagem' (pagos por derechos de imagen, estructura
//   habitual de compensación a jugadores en Brasil) -> wages_squad; 'Custo de campeonato'/'Custo de
//   logística' -> match_organisation_expense; 'Custo venda de mercadoria'/'Materiais' ->
//   admin_general_expense; 'Custo de transação de atletas'/'Outros custos' -> other_expenses.
// - Despesas G&A (Nota 22): TODAS admin_general_expense salvo 'Depreciação e amortização' ->
//   depreciation y 'Diversos' (catch-all de la propia nota) -> other_expenses — se respeta que el
//   documento ya decidió agrupar estas líneas como administrativas (incl. 'Viagens e estadas'/'Gastos
//   com atletas' de ESTA nota puntual, distintos de 'Custo de logística' de la Nota 21).
// - 'Outras despesas operacionais' (línea suelta de la DRE, 623) -> other_expenses.
// - 'Resultado de equivalência patrimonial' (-6.509, resultado de una inversión por equivalencia
//   patrimonial, un ítem no operativo/no recurrente) -> exceptional_items.
// - 'Outras receitas operacionais' (Nota 23: recuperación de gastos, valores CONMEBOL devueltos, etc.,
//   16.056) -> other_income.
// - Nota 24 (transacción de jugadores): 'Mecanismo de solidariedade' (pagado) -> other_expenses
//   (mismo criterio que Racing/Grêmio: comisiones/pagos de intermediación NO van a
//   player_amortisation, que es solo el cargo contable de amortización/deterioro); 'Baixa de atletas'
//   (baja del activo intangible del jugador transferido, un cargo contable real de derecognición) ->
//   player_amortisation; 'Despesa na cessão de atletas' (comisiones, honorarios legales) ->
//   other_expenses.
//
// Verificación (Node, antes de cargar): revenueLines suma EXACTO 664.683 M BRL (coincide, como
// chequeo cruzado independiente, con la línea "Receita" de R$664.683 mil del Relatório de Gestão/
// EBITDA Ajustado no auditado, pág. 10 del PDF); expenseLines suma EXACTO -807.445 M BRL;
// revenue+expenses = -142.762 M BRL = "Outras receitas e despesas operacionais" (el subtotal
// corrido); + netInterest (-157.221, Nota 25, Resultado financeiro líquido Controladora) =
// -299.983 M BRL = "Prejuízo do exercício" impreso, exacto (2024 fue un año de DÉFICIT real para la
// SAF, a pesar del título de Libertadores + Brasileirão de ese año — el propio balance lo explica por
// variación cambial y costos financieros de deuda en dólares, Nota 25).
//
// grossDebt = "Empréstimos e financiamentos" circulante, Controladora (48.112 — no hay porción no
// corriente de esta línea en este balance). cash = "Caixa e equivalentes de caixa" Controladora
// (128.951).
//
// FX: BRL/USD PTAX de cierre 31/12/2024 = R$6,1923 (venda), mismo tipo de cambio investigado
// externamente que Grêmio (mismo cierre de ejercicio) — el documento no declara un tipo de cambio
// propio.
//
// Gestión: no se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién
// preside la SAF Botafogo (distinto del presidente de la associação) — gestionId queda null, sin
// entrada en gestionesByClub, mismo criterio que Racing 2009-2011 (mejor sin gestión asignada que
// una inventada). Como gestionesByClub[clubId] tiene que existir igual (lo lee
// populateFinanzasSelectors sin chequeo), se declara con una gestión genérica "Sin gestión
// confirmada" que cubre el único año cargado.
// ============================================================================

const botafogoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Televisionamento', normalizedCategory:'broadcasting', amountNative:100.982, disclosureLevel:'detailed' },
    { rawLabel:'Premiação', normalizedCategory:'competition_bonus', amountNative:192.485, disclosureLevel:'detailed' },
    { rawLabel:'Participação em competições', normalizedCategory:'competition_bonus', amountNative:65.019, disclosureLevel:'detailed' },
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:36.356, disclosureLevel:'detailed' },
    { rawLabel:'Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:49.026, disclosureLevel:'detailed' },
    { rawLabel:'Publicidade em placas', normalizedCategory:'sponsorship_commercial', amountNative:6.655, disclosureLevel:'detailed' },
    { rawLabel:'Mídias digitais', normalizedCategory:'sponsorship_commercial', amountNative:0.230, disclosureLevel:'detailed' },
    { rawLabel:'Camisa 7 (programa Sócio Torcedor)', normalizedCategory:'member_dues', amountNative:48.620, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento', normalizedCategory:'sponsorship_commercial', amountNative:3.177, disclosureLevel:'detailed' },
    { rawLabel:'Cessão temporária (empréstimo de atletas)', normalizedCategory:'player_sales', amountNative:2.488, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidariedade (recebido)', normalizedCategory:'youth_football', amountNative:1.874, disclosureLevel:'detailed' },
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:66.379, disclosureLevel:'detailed' },
    { rawLabel:'Locações', normalizedCategory:'other_income', amountNative:17.040, disclosureLevel:'detailed' },
    { rawLabel:'Operação em estádio', normalizedCategory:'matchday_competition', amountNative:7.193, disclosureLevel:'detailed' },
    { rawLabel:'Outros (receita operacional bruta)', normalizedCategory:'other_income', amountNative:9.798, disclosureLevel:'detailed' },
    { rawLabel:'Deduções sobre a receita (impostos, direito de arena, outras)', normalizedCategory:'other_income', amountNative:-55.051, disclosureLevel:'detailed' },
    { rawLabel:'Cessão definitiva de atletas', normalizedCategory:'player_sales', amountNative:96.356, disclosureLevel:'detailed' },
    { rawLabel:'Outras receitas operacionais (recuperação de gastos, etc.)', normalizedCategory:'other_income', amountNative:16.056, disclosureLevel:'detailed' },
  ],
};

const botafogoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Custo venda de mercadoria', normalizedCategory:'admin_general_expense', amountNative:-22.533, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (custo dos serviços)', normalizedCategory:'wages_squad', amountNative:-289.999, disclosureLevel:'detailed' },
    { rawLabel:'Amortização de atletas', normalizedCategory:'player_amortisation', amountNative:-129.518, disclosureLevel:'detailed' },
    { rawLabel:'Custo de campeonato', normalizedCategory:'match_organisation_expense', amountNative:-23.907, disclosureLevel:'detailed' },
    { rawLabel:'Custo de transação de atletas (custo dos serviços)', normalizedCategory:'other_expenses', amountNative:-12.146, disclosureLevel:'detailed' },
    { rawLabel:'Custo de logística', normalizedCategory:'match_organisation_expense', amountNative:-35.683, disclosureLevel:'detailed' },
    { rawLabel:'Materiais (custo dos serviços)', normalizedCategory:'admin_general_expense', amountNative:-1.742, disclosureLevel:'detailed' },
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-82.501, disclosureLevel:'detailed' },
    { rawLabel:'Outros custos', normalizedCategory:'other_expenses', amountNative:-10.555, disclosureLevel:'detailed' },
    { rawLabel:'Salários, encargos e benefícios (G&A)', normalizedCategory:'admin_general_expense', amountNative:-67.512, disclosureLevel:'detailed' },
    { rawLabel:'Materiais (G&A)', normalizedCategory:'admin_general_expense', amountNative:-5.000, disclosureLevel:'detailed' },
    { rawLabel:'Locação (G&A)', normalizedCategory:'admin_general_expense', amountNative:-3.701, disclosureLevel:'detailed' },
    { rawLabel:'Serviços com terceiros', normalizedCategory:'admin_general_expense', amountNative:-29.053, disclosureLevel:'detailed' },
    { rawLabel:'Concessionárias', normalizedCategory:'admin_general_expense', amountNative:-5.835, disclosureLevel:'detailed' },
    { rawLabel:'Despesas comerciais', normalizedCategory:'admin_general_expense', amountNative:-9.907, disclosureLevel:'detailed' },
    { rawLabel:'Depreciação e amortização (G&A)', normalizedCategory:'depreciation', amountNative:-6.164, disclosureLevel:'detailed' },
    { rawLabel:'Impostos e taxas', normalizedCategory:'admin_general_expense', amountNative:-2.017, disclosureLevel:'detailed' },
    { rawLabel:'Viagens e estadas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-4.429, disclosureLevel:'detailed' },
    { rawLabel:'Gastos com atletas (G&A)', normalizedCategory:'admin_general_expense', amountNative:-2.653, disclosureLevel:'detailed' },
    { rawLabel:'Licenciamento de programas', normalizedCategory:'admin_general_expense', amountNative:-2.184, disclosureLevel:'detailed' },
    { rawLabel:'Despesa com contingências', normalizedCategory:'admin_general_expense', amountNative:-0.713, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (G&A)', normalizedCategory:'other_expenses', amountNative:-6.729, disclosureLevel:'detailed' },
    { rawLabel:'Outras despesas operacionais', normalizedCategory:'other_expenses', amountNative:-0.623, disclosureLevel:'detailed' },
    { rawLabel:'Resultado de equivalência patrimonial', normalizedCategory:'exceptional_items', amountNative:-6.509, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidariedade (pago, Nota 24.2)', normalizedCategory:'other_expenses', amountNative:-2.837, disclosureLevel:'detailed' },
    { rawLabel:'Baixa de atletas (Nota 24.3)', normalizedCategory:'player_amortisation', amountNative:-28.172, disclosureLevel:'detailed' },
    { rawLabel:'Despesa na cessão de atletas (Nota 24.4)', normalizedCategory:'other_expenses', amountNative:-14.823, disclosureLevel:'detailed' },
  ],
};

const botafogoFiscalYearMeta = {
  2024: {
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'botafogo-demonstracoes-2024',
    reportType:'official_balance_sheet',
    gestionId:'sinconfirmar',
    // grossDebt = "Empréstimos e financiamentos" circulante, Controladora (Nota 14) — no hay
    // porção não circulante de esta línea en este balance. cash = "Caixa e equivalentes de caixa"
    // Controladora (Nota 4).
    grossDebt:48.112, cash:128.951,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultado financeiro líquido" (Nota 25), columna Controladora.
    netInterest:-157.221, tax:0,
    // officialTotalRevenue = suma verificada de revenueLines (664.683 M BRL) — el documento no
    // imprime un único total en una sola fila (la DRE está en 2 bloques separados, ver comentario de
    // cabecera), pero 664.683 SÍ coincide, como chequeo cruzado independiente, con la línea "Receita"
    // del Relatório de Gestão no auditado (pág. 10 del PDF). officialTotalExpenses = 800.936 M BRL =
    // suma de expenseLines EXCLUYENDO 'Resultado de equivalência patrimonial' (-6.509,
    // exceptional_items) — mismo criterio que instituto-data.js: verifyTieOuts() compara "Expenses"
    // contra gasto ordinario + no-efectivo solamente, exceptional_items no participa de ese check
    // (sí de PAT, vía operatingProfit). officialPAT = "Prejuízo do exercício" impreso (negativo
    // real, sí incluye el ítem excepcional).
    officialTotalRevenue:664.683, officialTotalExpenses:800.936, officialPAT:-299.983,
  },
};

const botafogoPresupuestoOverlayByYear = {};

const botafogoPasesData = [];
const botafogoResultadosData = {};
const botafogoTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.botafogo = {
  revenueLinesByYear: botafogoRevenueLinesByYear, expenseLinesByYear: botafogoExpenseLinesByYear,
  fiscalYearMeta: botafogoFiscalYearMeta, pasesData: botafogoPasesData,
  resultadosData: botafogoResultadosData, titulosData: botafogoTitulosData,
  presupuestoOverlayByYear: botafogoPresupuestoOverlayByYear,
};


Object.assign(sources, {
  'botafogo-demonstracoes-2024': {
      id:'botafogo-demonstracoes-2024', clubId:'botafogo',
      title:'Demonstrações Financeiras da SAF Botafogo, Exercícios Findos em 31 de Dezembro de 2024 e de 2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://botafogo.com/download/transparencia/balanco',
      note:'PDF oficial (texto nativo), descargado del portal de transparencia oficial del club. Se cargó la columna CONTROLADORA (la SAF standalone), no la Consolidado (incluye una subsidiaria menor). Transcripción completa en Clubes/Brasil/Botafogo/demonstracoes-financeiras-2024.md. 2024 fue un ejercicio de DÉFICIT real (Prejuízo de R$299,983 mil), pese al título de Copa Libertadores y Campeonato Brasileiro de ese año — el propio balance lo atribuye a variación cambial y costos financieros de deuda en moneda extranjera (Nota 25). Convertido a USD con el PTAX BCB de cierre 31/12/2024 (R$6,1923), investigado externamente. Existe también un balance 2025 (demonstracoes-financeiras-2025.pdf, descargado pero no cargado esta sesión — ver "widen clubs" en la consigna, se priorizó agregar más clubes por sobre más años del mismo club) y un balance de la associação (demonstracoes-financeiras-associacao-2023.pdf, entidad social separada, complementaria, no cargada).',
    },
});

gestionesByClub.botafogo = {
    // No se confirmó con la profundidad que exige club-data-mapping SKILL.md sección 7 quién preside
    // la SAF Botafogo (distinto del presidente de la associação social) — entrada mínima para que el
    // selector "Por gestión" no rompa, cubre únicamente el año cargado.
    sinconfirmar: { nombre:'SAF Botafogo (gestión no confirmada en detalle)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.botafogo = null;
