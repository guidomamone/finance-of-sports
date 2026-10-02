// ============================================================================
// data/goias-br-data.js — Goiás Esporte Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-02), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Goias/demonstracoes-contabeis-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "goias-br" — slug de "Goias" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Goiás Esporte Clube" — claude-api con cita verificada: pág. 11: "O Goiás Esporte Clube é uma associação civil de prática desportiva, sem fins lucrativos, de natureza não emp
//   displayName        ok        "Goias" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (56 de 56 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 8 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (56 de 56 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — claude-api con cita verificada: pág. 3: "Examinamos as demonstrações contábeis do Goiás Esporte Clube (“Clube”), que compreendem o balanço patrimonial
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2025-12-31 = 5.5024 (PTAX de cierre (venda) del Banco Central do Brasil, boletín del 30/
//   sourceId           ok        "goias-br-demonstracoes-contabeis-2025" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2025 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Goiás"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2025-12-31","sourceId":"goias-br-demonstracoes-contabeis-2025"}
// ============================================================================

const goiasbrRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Bilheterias', normalizedCategory:'matchday_competition', amountNative:0.620535, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Direitos de transmissão de TV', normalizedCategory:'broadcasting', amountNative:29.197496, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Premiação/participações', normalizedCategory:'competition_bonus', amountNative:0.798176, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Transação de atletas (a)', normalizedCategory:'player_sales', amountNative:8.428754, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Patrocínio/publicidade/propaganda', normalizedCategory:'sponsorship_commercial', amountNative:4.875064, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Associados', normalizedCategory:'member_dues', amountNative:0.8888, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'other_sports', amountNative:0.540095, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.96
    { rawLabel:'Iniciação Esportiva', normalizedCategory:'youth_football', amountNative:1.353467, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Nação Esmeraldina', normalizedCategory:'member_dues', amountNative:0.361836, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:1.633783, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.98
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.140464, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:1.561124, disclosureLevel:'aggregated' }, // pág. 36, Jev 1
    { rawLabel:'(-) INSS Receitas de Bilheterias', normalizedCategory:'other_income', amountNative:-0.031027, disclosureLevel:'aggregated' }, // pág. 36, ? 0.6
    { rawLabel:'(-) Cortez. Ingressos - Campeonato Brasileiro', normalizedCategory:'matchday_competition', amountNative:-0.04021, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) INSS Competições/Torneios', normalizedCategory:'matchday_competition', amountNative:-1.485264, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Direito de Arena Competições/Torneios', normalizedCategory:'broadcasting', amountNative:-1.430108, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) INSS Patrocínio/Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:-0.199908, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Deduções de mensalidades', normalizedCategory:'member_dues', amountNative:-0.009696, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Custos e Despesas Nacao Esmeraldina', normalizedCategory:'member_dues', amountNative:-0.05953, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) IRRF Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.154392, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) INSS Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.081689, disclosureLevel:'aggregated' }, // pág. 36, precedente
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-0.048247, disclosureLevel:'aggregated' }, // pág. 36, Jev 0.99
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Bilheterias (a)', normalizedCategory:'matchday_competition', amountNative:5.555661, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Direitos de transmissão de TV (a)', normalizedCategory:'broadcasting', amountNative:67.433772, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Premiação/participações (a)', normalizedCategory:'competition_bonus', amountNative:7.209466, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Transação de atletas', normalizedCategory:'player_sales', amountNative:2.997223, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Patrocínio/publicidade/propaganda (a)', normalizedCategory:'sponsorship_commercial', amountNative:13.127705, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Associados', normalizedCategory:'member_dues', amountNative:1.3104, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'other_sports', amountNative:0.864432, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.97
    { rawLabel:'Iniciação Esportiva', normalizedCategory:'youth_football', amountNative:2.45936, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Nação Esmeraldina', normalizedCategory:'member_dues', amountNative:1.225879, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Jogos lotéricos', normalizedCategory:'other_income', amountNative:2.0918, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Receitas patrimoniais', normalizedCategory:'other_income', amountNative:0.200862, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:2.180431, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.98
    { rawLabel:'(-) INSS Competições/Torneios', normalizedCategory:'matchday_competition', amountNative:-3.939121, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Cortez. Ingressos - Campeonato Brasileiro', normalizedCategory:'matchday_competition', amountNative:-0.37701, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Cortez. Ingressos - Copa Verde', normalizedCategory:'matchday_competition', amountNative:-0.002005, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'(-) Direito de Arena Competições/Torneios', normalizedCategory:'broadcasting', amountNative:-3.658099, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Ressarcimento / Reembolso de Ingressos', normalizedCategory:'matchday_competition', amountNative:-0.025706, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.95
    { rawLabel:'(-) INSS Patrocínio/Publicidade/Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:-0.616538, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Deduções de mensalidades', normalizedCategory:'member_dues', amountNative:-0.25688, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Custos e Despesas Nação Esmeraldina', normalizedCategory:'member_dues', amountNative:-0.207005, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) IRRF Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.197675, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) INSS Jogos Lotéricos', normalizedCategory:'other_income', amountNative:-0.10459, disclosureLevel:'aggregated' }, // pág. 30, precedente
    { rawLabel:'(-) Demais deduções da receita', normalizedCategory:'other_income', amountNative:-0.100303, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.99
    { rawLabel:'Outras Receitas e Despesas', normalizedCategory:'other_income', amountNative:8.9181, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
};
const goiasbrExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.193143, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.94
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.015808, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Custos e despesas c/ pessoal - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.07314, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Outros custos e despesas - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.660325, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.19065, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.96
    { rawLabel:'Transportes', normalizedCategory:'match_organisation_expense', amountNative:-0.523624, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Alimentação e estadias', normalizedCategory:'match_organisation_expense', amountNative:-0.697646, disclosureLevel:'aggregated' }, // pág. 37, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'wages_squad', amountNative:-23.812163, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.8
    { rawLabel:'Amortização de custo de atletas contratados (a)', normalizedCategory:'player_amortisation', amountNative:-1.379051, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Amortização de custo de atletas formados (a)', normalizedCategory:'player_amortisation', amountNative:-2.664482, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Cessão de Direitos Imagem', normalizedCategory:'wages_squad', amountNative:-0.734997, disclosureLevel:'aggregated' }, // pág. 37, Claude 0.85
    { rawLabel:'Despesas administrativas e gerais', normalizedCategory:'admin_general_expense', amountNative:-16.69661, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Despesas com materiais', normalizedCategory:'admin_general_expense', amountNative:-1.524441, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'Despesas com serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-3.487771, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.143501, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
  2022: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Arbitragens', normalizedCategory:'match_organisation_expense', amountNative:-0.657179, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'Exames antidoping', normalizedCategory:'match_organisation_expense', amountNative:-0.1109, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Custos e despesas c/ pessoal - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.286464, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Outros custos e despesas - Jogos', normalizedCategory:'match_organisation_expense', amountNative:-0.827396, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Taxas confederações e federações', normalizedCategory:'match_organisation_expense', amountNative:-0.591855, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.95
    { rawLabel:'Despesa com pessoal (a)', normalizedCategory:'wages_squad', amountNative:-32.758514, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'Amortização de custo de atletas contratados', normalizedCategory:'player_amortisation', amountNative:-1.649192, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Amortização de custo de atletas formados', normalizedCategory:'player_amortisation', amountNative:-1.684105, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.95
    { rawLabel:'Baixa Custo de Atletas', normalizedCategory:'player_amortisation', amountNative:-7.033136, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Cessão de Direitos Econômicos', normalizedCategory:'other_expenses', amountNative:-0.750987, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Cessão de Direitos Imagem (a)', normalizedCategory:'wages_squad', amountNative:-5.298443, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.97
    { rawLabel:'Outros custos com atletas', normalizedCategory:'wages_squad', amountNative:-0.431632, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Demais custos e despesas operacionais', normalizedCategory:'other_expenses', amountNative:-5.502994, disclosureLevel:'aggregated' }, // pág. 31, precedente
    { rawLabel:'Despesa com pessoal', normalizedCategory:'admin_general_expense', amountNative:-8.21312, disclosureLevel:'aggregated' }, // pág. 31, Claude 0.85
    { rawLabel:'Despesas legais e judiciais', normalizedCategory:'admin_general_expense', amountNative:-2.424251, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.99
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-3.641203, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Água, telefone, energia e internet', normalizedCategory:'admin_general_expense', amountNative:-1.035401, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Depreciação e amortização', normalizedCategory:'depreciation', amountNative:-2.097297, disclosureLevel:'aggregated' }, // pág. 31, Jev 1
    { rawLabel:'Provisões para contingências', normalizedCategory:'admin_general_expense', amountNative:-2.720925, disclosureLevel:'aggregated' }, // pág. 31, Jev 0.98
    { rawLabel:'Despesas com serviços de terceiros', normalizedCategory:'admin_general_expense', amountNative:-5.283848, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-6.764942, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
};
const goiasbrFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.473957, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:46.859523, officialTotalExpenses:52.797352, officialPAT:-7.412038,
  },
  2022: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'goias-br-demonstracoes-contabeis-2022-fgf-go',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.16834, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:1.371401},
      {label:'Despesas financeiras', value:-4.539741},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:106.090159, officialTotalExpenses:89.763784, officialPAT:13.158035,
  },
};
const goiasbrPresupuestoOverlayByYear = {};

const goiasbrPasesData = [];
const goiasbrResultadosData = {};
const goiasbrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['goias-br'] = {
  revenueLinesByYear: goiasbrRevenueLinesByYear, expenseLinesByYear: goiasbrExpenseLinesByYear,
  fiscalYearMeta: goiasbrFiscalYearMeta, pasesData: goiasbrPasesData,
  resultadosData: goiasbrResultadosData, titulosData: goiasbrTitulosData,
  presupuestoOverlayByYear: goiasbrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'goias-br-demonstracoes-contabeis-2021': {
    id:'goias-br-demonstracoes-contabeis-2021', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'goias-br-demonstracoes-contabeis-2022-fgf-go': {
    id:'goias-br-demonstracoes-contabeis-2022-fgf-go', clubId:'goias-br',
    title:'Goiás Esporte Clube — demonstracoes-contabeis-2022-fgf-go (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Brasil/Goias/demonstracoes-contabeis-2022-fgf-go.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['goias-br'] = null;
