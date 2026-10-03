// ============================================================================
// data/novorizontino-br-data.js — Novorizontino (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2024.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "novorizontino-br" — slug de "Novorizontino" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               pendiente "Novorizontino" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
//   displayName        ok        "Novorizontino" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (contenido del .md (26 de 26 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2024-12-31 = 6.1923 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2024)
//   sourceId           ok        "novorizontino-br-demonstracoes-financeiras-2024" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2024 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Novorizontino"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2024-12-31","sourceId":"novorizontino-br-demonstracoes-financeiras-2024"}
// ============================================================================

const novorizontinobrRevenueLinesByYear = {
  // 2019: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Novorizontino/demonstracoes-financeiras-2019.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2019: [
    { rawLabel:'Repasse da federação', normalizedCategory:'broadcasting', amountNative:4.918, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'Negociação e empréstimo de atletas', normalizedCategory:'player_sales', amountNative:3.392, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Receita com patrocínios', normalizedCategory:'sponsorship_commercial', amountNative:0.728, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Vendas de ingressos e bar', normalizedCategory:'matchday_competition', amountNative:0.899, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.8
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0.639, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.92
    { rawLabel:'Recuperação de despesas', normalizedCategory:'other_income', amountNative:0.077, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Reversão de provisão de contingências', normalizedCategory:'other_income', amountNative:1.577, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
  ],
};
const novorizontinobrExpenseLinesByYear = {
  2019: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Salários, ordenados e outros custos com pessoal', normalizedCategory:'wages_squad', amountNative:-9.387, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Gastos com jogos', normalizedCategory:'match_organisation_expense', amountNative:-1.325, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Aluguéis', normalizedCategory:'admin_general_expense', amountNative:-0.545, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.257, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.98
    { rawLabel:'Serviços prestados', normalizedCategory:'admin_general_expense', amountNative:-1.419, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Provisão para contingências', normalizedCategory:'admin_general_expense', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 29, ? 0.6
    { rawLabel:'Despesas administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.867, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Manutenções', normalizedCategory:'admin_general_expense', amountNative:-0.776, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.95
    { rawLabel:'Salários, ordenados e outras despesas com pessoal', normalizedCategory:'admin_general_expense', amountNative:-0.591, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.85
    { rawLabel:'Gastos com negociação de atletas', normalizedCategory:'other_expenses', amountNative:-0.075, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
    { rawLabel:'Combustível e lubrificantes', normalizedCategory:'admin_general_expense', amountNative:-0.099, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.94
    { rawLabel:'Depreciação', normalizedCategory:'depreciation', amountNative:-0.074, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'Outros', normalizedCategory:'other_expenses', amountNative:-0.349, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.98
  ],
};
const novorizontinobrFiscalYearMeta = {
  2019: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2019-12-31',
    sourceId:'novorizontino-br-demonstracoes-financeiras-2019',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.226, tax:0,
    extraRows: [
      {label:'Despesas financeiras', value:-0.294},
      {label:'Receitas financeiras', value:0.068},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:12.23, officialTotalExpenses:15.787, officialPAT:-3.783,
  },
};
const novorizontinobrPresupuestoOverlayByYear = {};

const novorizontinobrPasesData = [];
const novorizontinobrResultadosData = {};
const novorizontinobrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['novorizontino-br'] = {
  revenueLinesByYear: novorizontinobrRevenueLinesByYear, expenseLinesByYear: novorizontinobrExpenseLinesByYear,
  fiscalYearMeta: novorizontinobrFiscalYearMeta, pasesData: novorizontinobrPasesData,
  resultadosData: novorizontinobrResultadosData, titulosData: novorizontinobrTitulosData,
  presupuestoOverlayByYear: novorizontinobrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'novorizontino-br-demonstracoes-financeiras-2019': {
    id:'novorizontino-br-demonstracoes-financeiras-2019', clubId:'novorizontino-br',
    title:'Grêmio Novorizontino Sociedade Anônima do Futebol — demonstracoes-financeiras-2019 (ejercicio 2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Brasil/Novorizontino/demonstracoes-financeiras-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['novorizontino-br'] = null;
