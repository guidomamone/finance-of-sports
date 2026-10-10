// ============================================================================
// data/vilanova-br-data.js — Vila Nova Futebol Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Vila Nova/notas-explicativas-2014.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "vilanova-br" — slug de "Vila Nova" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Vila Nova Futebol Clube" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Vila Nova" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral
//   sport              ok        "futbol" — el .md nombra el fútbol 6 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2014 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período par
//   cierre             ok        "2014-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Onboarding to-do 165 (Claude, 2026-10-09): el .md n
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2014-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2014-12-31 = 2.6562 (PTAX de cierre (venda) del Banco Central do Brasil al 2014-12-31)
//   sourceId           ok        "vilanova-br-notas-explicativas-2014" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2014 (br-serieA, br-paulistaA3): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2014 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2014: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2014-12-31","sourceId":"vilanova-br-notas-explicativas-2014"}
// ============================================================================

const vilanovabrRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/demonstrativo-financeiro-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Participação em competições, exposição e performance', normalizedCategory:'competition_bonus', amountNative:6.548, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Direitos de transmissão', normalizedCategory:'broadcasting', amountNative:0.995, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Patrocínios e publicidade', normalizedCategory:'sponsorship_commercial', amountNative:7.964, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Licenciamento e *royanties', normalizedCategory:'sponsorship_commercial', amountNative:1.394, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Bilheteria', normalizedCategory:'matchday_competition', amountNative:5.605, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Sócio Tigrão', normalizedCategory:'member_dues', amountNative:1.404, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Associações quadro social', normalizedCategory:'member_dues', amountNative:0.866, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'Repasse loterias', normalizedCategory:'other_income', amountNative:0.795, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Bares e lanchonetes', normalizedCategory:'stadium_other', amountNative:0.376, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.95
    { rawLabel:'Incentivos governamentais', normalizedCategory:'other_income', amountNative:0.277, disclosureLevel:'aggregated' }, // pág. 54, Jev 1
    { rawLabel:'(-) Impostos e deduções da receita', normalizedCategory:'other_income', amountNative:-0.717, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Venda de atletas e participações em direitos econômicos', normalizedCategory:'player_sales', amountNative:11.749, disclosureLevel:'aggregated' }, // pág. 56, Jev 1
    { rawLabel:'Mecanismo de solidariedade', normalizedCategory:'player_sales', amountNative:0.26, disclosureLevel:'aggregated' }, // pág. 56, precedente
    { rawLabel:'Estorno de provisões (ii)', normalizedCategory:'other_income', amountNative:2.555, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Multas contratuais recebidas (iii)', normalizedCategory:'other_income', amountNative:1.884, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:0.815, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Receita com aluguéis', normalizedCategory:'other_income', amountNative:0.146, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.85
    { rawLabel:'Arrecadação do futebol de base', normalizedCategory:'youth_football', amountNative:0.144, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Brindes recebidos', normalizedCategory:'other_income', amountNative:0.088, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.8
    { rawLabel:'Outros', normalizedCategory:'other_income', amountNative:0.057, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.9
    { rawLabel:'Reembolsos recebidos', normalizedCategory:'other_income', amountNative:0.052, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Taxa de avaliação base', normalizedCategory:'youth_football', amountNative:0.035, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.92
    { rawLabel:'Auxílio custos operacionais', normalizedCategory:'other_income', amountNative:0.033, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Estacionamentos', normalizedCategory:'other_income', amountNative:0.015, disclosureLevel:'aggregated' }, // pág. 55, Claude 0.8
  ],
  // 2015: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Vila Nova/balanco-patrimonial-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Vila Nova/balanco-patrimonial-2015.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2015: [
    { rawLabel:'Receitas Atividades Esportivas', normalizedCategory:'lump_football_operations', amountNative:2.338518, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Escolinha de Futebol', normalizedCategory:'youth_football', amountNative:0.081603, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Receitas Doações/Patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.193571, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'Receitas Publicidade', normalizedCategory:'sponsorship_commercial', amountNative:1.130904, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Receitas Direitos Federativos Atletas', normalizedCategory:'player_sales', amountNative:0.467925, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Alugueis', normalizedCategory:'other_income', amountNative:0.096017, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.93
    { rawLabel:'Receitas Contribuições Conselheiros', normalizedCategory:'member_dues', amountNative:0.500735, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Receitas Time mania', normalizedCategory:'other_income', amountNative:0.18172, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Receitas Diversas', normalizedCategory:'other_income', amountNative:1.899206, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
};
const vilanovabrExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Adesão ao condomínio LFU', normalizedCategory:'exceptional_items', amountNative:12.85, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'(-) Comissões', normalizedCategory:'other_expenses', amountNative:-3.121, disclosureLevel:'aggregated' }, // pág. 56, Claude 0.8
    { rawLabel:'(-) Gastos para viabilizar a venda', normalizedCategory:'other_expenses', amountNative:-0.52, disclosureLevel:'aggregated' }, // pág. 56, Jev 0.97
    { rawLabel:'Perdas na venda de ativos', normalizedCategory:'other_expenses', amountNative:-0.356, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Amortização de direitos sobre atletas (i)', normalizedCategory:'player_amortisation', amountNative:-12.077, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Premiações (ii)', normalizedCategory:'wages_squad', amountNative:-6.676, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Salários, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-6.076, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Gastos com jogos e competições', normalizedCategory:'match_organisation_expense', amountNative:-5.898, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Despesas com transações de atletas', normalizedCategory:'other_expenses', amountNative:-2.686, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.99
    { rawLabel:'Rescisões', normalizedCategory:'wages_squad', amountNative:-0.89, disclosureLevel:'aggregated' }, // pág. 54, precedente
    { rawLabel:'Perdas esperadas com processos trabalhistas', normalizedCategory:'other_expenses', amountNative:-0.681, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.93
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-0.535, disclosureLevel:'aggregated' }, // pág. 54, Jev 0.98
    { rawLabel:'Salários, encargos e benefícios', normalizedCategory:'wages_squad', amountNative:-1.708, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Férias e encargos', normalizedCategory:'admin_general_expense', amountNative:-0.942, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'13º salário e encargos', normalizedCategory:'admin_general_expense', amountNative:-0.578, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Rescisões', normalizedCategory:'wages_squad', amountNative:-0.016, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.713, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.97
    { rawLabel:'Uso e consumo', normalizedCategory:'admin_general_expense', amountNative:-2.717, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Depreciações', normalizedCategory:'depreciation', amountNative:-0.813, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Esportes olímpicos', normalizedCategory:'youth_other_sports_expense', amountNative:-0.774, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Publicidades', normalizedCategory:'admin_general_expense', amountNative:-0.767, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Manutenções de ativos', normalizedCategory:'admin_general_expense', amountNative:-0.743, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.97
    { rawLabel:'Gastos administrativos', normalizedCategory:'admin_general_expense', amountNative:-0.73, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Honorários jurídicos', normalizedCategory:'admin_general_expense', amountNative:-0.686, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Taxas associativas', normalizedCategory:'admin_general_expense', amountNative:-0.556, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.95
    { rawLabel:'Multas contratuais', normalizedCategory:'other_expenses', amountNative:-0.435, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Reembolsos', normalizedCategory:'admin_general_expense', amountNative:-0.325, disclosureLevel:'aggregated' }, // pág. 55, precedente
    { rawLabel:'Tecnologia da informação', normalizedCategory:'admin_general_expense', amountNative:-0.093, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Despesas com transporte', normalizedCategory:'match_organisation_expense', amountNative:-0.082, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.93
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.077, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.96
    { rawLabel:'Impostos estaduais', normalizedCategory:'admin_general_expense', amountNative:-0.069, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.99
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.063, disclosureLevel:'aggregated' }, // pág. 55, Jev 0.9
    { rawLabel:'Honorários contábeis', normalizedCategory:'admin_general_expense', amountNative:-0.061, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Impostos municipais', normalizedCategory:'admin_general_expense', amountNative:-0.013, disclosureLevel:'aggregated' }, // pág. 55, Jev 1
    { rawLabel:'Outros', normalizedCategory:'admin_general_expense', amountNative:-0.014, disclosureLevel:'aggregated' }, // pág. 55, precedente
  ],
  2015: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-4.361587, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Depto Esportes', normalizedCategory:'lump_football_operations_expense', amountNative:-3.649581, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.046495, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Serviços Terceiros', normalizedCategory:'admin_general_expense', amountNative:-0.541265, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
  ],
};
const vilanovabrFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2025-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2025-12-31
  2025: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fx:5.5, fxSource:'document_close',
    sourceId:'vilanova-br-demonstrativo-financeiro-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.541, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-4.804},
      {label:'Receitas financeiras', value:1.263},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:43.34, officialTotalExpenses:55.491, officialPAT:-2.842,
  },
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2015-12-31. Onboarding to-do 165 (Claude, 2026-10-09): el .md nuevo (Mistral) no tenía período para periodo.mjs; el DRE cierra el 31/12/2015
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = 38.324,22. Onboarding to-do 165 (Claude, 2026-10-09): ingreso financiero (suma): los 13 renglones de receita suman 6.928.521,06 = TOTAL DAS RECEITAS (L70), con las Receitas Financeiras 38.324,22 adentro; la extracción las sumaba con el mismo signo que el costo financiero
  // 2015: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-10): fila = -5.029,11. Onboarding to-do 165 (Claude, 2026-10-09): costo financiero (resta): 6.890.197 - 8.598.927 + 38.324 - 5.029 = -1.675.435 (L79, -1.675.435,38)
  2015: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2015-12-31',
    sourceId:'vilanova-br-balanco-patrimonial-2015',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.033295, tax:0,
    extraRows: [
      {label:'Receitas Financeiras', value:0.038324},
      {label:'Despesas Financeiras', value:-0.005029},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receitas Atividades Esportivas', lado:'revenue', importe:2.338518, motivo:'el documento no desglosa este renglón'},
      {renglon:'Despesas Depto Esportes', lado:'expense', importe:3.649581, motivo:'Claude 2026-10-09: Despesas Depto Esportes es el costo del departamento de fútbol sin desglose en el estado (renglón único): lump_football_operations_expense'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:6.890197, officialTotalExpenses:8.598927, officialPAT:-1.675435,
  },
};
const vilanovabrPresupuestoOverlayByYear = {};

const vilanovabrPasesData = [];
const vilanovabrResultadosData = {};
const vilanovabrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vilanova-br'] = {
  revenueLinesByYear: vilanovabrRevenueLinesByYear, expenseLinesByYear: vilanovabrExpenseLinesByYear,
  fiscalYearMeta: vilanovabrFiscalYearMeta, pasesData: vilanovabrPasesData,
  resultadosData: vilanovabrResultadosData, titulosData: vilanovabrTitulosData,
  presupuestoOverlayByYear: vilanovabrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'vilanova-br-demonstrativo-financeiro-2025': {
    id:'vilanova-br-demonstrativo-financeiro-2025', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — demonstrativo-financeiro-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/demonstrativo-financeiro-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'vilanova-br-balanco-patrimonial-2015': {
    id:'vilanova-br-balanco-patrimonial-2015', clubId:'vilanova-br',
    title:'Vila Nova Futebol Clube — balanco-patrimonial-2015 (ejercicio 2015)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Vila Nova/balanco-patrimonial-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['vilanova-br'] = null;
