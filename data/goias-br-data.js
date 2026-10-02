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
});

memberCountByClub['goias-br'] = null;
