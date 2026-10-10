// ============================================================================
// data/remo-br-data.js — Clube do Remo (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Remo/demonstracoes-contabeis-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "remo-br" — slug de "Remo" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Clube do Remo" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Remo" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (29 de 30 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [brasil] clube de remo: #0F141F Black, #FEFEFE White | [italia] cremonese: #ED1C24 Red, #808285 Grey, #CF9C
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (29 de 30 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
//   sourceId           ok        "remo-br-demonstracoes-contabeis-2021" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2021 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Remo"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"remo-br-demonstracoes-contabeis-2021"}
// ============================================================================

const remobrRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Remo/demonstracoes-contabeis-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Remo/demonstracoes-contabeis-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Receita de Aluguéis', normalizedCategory:'other_income', amountNative:0.757191, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
    { rawLabel:'Receita de Estacionamento', normalizedCategory:'other_income', amountNative:0.054236, disclosureLevel:'aggregated' }, // pág. 16, Claude 0.85
    { rawLabel:'Receita de Bilheteria', normalizedCategory:'matchday_competition', amountNative:9.533278, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita Royalties / Lojas', normalizedCategory:'sponsorship_commercial', amountNative:3.209878, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita Patrimoniais/Sociais', normalizedCategory:'other_sports', amountNative:0.83101, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita da Atividade Social', normalizedCategory:'other_income', amountNative:7.212591, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.96
    { rawLabel:'Receita Programa Timemania', normalizedCategory:'other_income', amountNative:0.604689, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Receita Programa Socio Torcedor', normalizedCategory:'member_dues', amountNative:0.882386, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita de Patrocínio / Marketing', normalizedCategory:'sponsorship_commercial', amountNative:4.35011, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receita de Direito de Transmissão', normalizedCategory:'broadcasting', amountNative:0.046421, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Receitas Royalties / Licenciados', normalizedCategory:'other_income', amountNative:1.627466, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.95
    { rawLabel:'Receita com Vendas Materiais', normalizedCategory:'sponsorship_commercial', amountNative:0.13301, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Demais Receitas', normalizedCategory:'other_income', amountNative:0.224168, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Receita com redução juros/multa - Perse', normalizedCategory:'other_income', amountNative:13.490829, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
  ],
};
const remobrExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Despesas Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.385967, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Comissões', normalizedCategory:'other_expenses', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Materiais', normalizedCategory:'admin_general_expense', amountNative:-0.134117, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.91
    { rawLabel:'Manutenção', normalizedCategory:'admin_general_expense', amountNative:-0.880265, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Programa Sócio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-0.036547, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Serviço de Terceiros', normalizedCategory:'admin_general_expense', amountNative:-2.427815, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.95
    { rawLabel:'Materiais esportivos e premiações', normalizedCategory:'other_expenses', amountNative:-0.101857, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Despesas com Amortização dos Débitos Trabalhistas', normalizedCategory:'admin_general_expense', amountNative:-0.003, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Despesas com tributos', normalizedCategory:'admin_general_expense', amountNative:-0.173537, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Despesas com depreciação e amortização', normalizedCategory:'depreciation', amountNative:-0.075833, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.98
    { rawLabel:'Outras Despesas', normalizedCategory:'other_expenses', amountNative:-0.660346, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Despesas com Pessoal', normalizedCategory:'wages_squad', amountNative:-6.537288, disclosureLevel:'aggregated' }, // pág. 16, precedente
    { rawLabel:'Direito de imagem', normalizedCategory:'wages_squad', amountNative:-4.643626, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Despesas com Jogos e Competições', normalizedCategory:'match_organisation_expense', amountNative:-3.014827, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
    { rawLabel:'Despesas Programa Socio Torcedor', normalizedCategory:'admin_general_expense', amountNative:-0.321113, disclosureLevel:'aggregated' }, // pág. 16, Jev 1
    { rawLabel:'Despesas com Passagens e Hospedagens', normalizedCategory:'match_organisation_expense', amountNative:-0.468095, disclosureLevel:'aggregated' }, // pág. 16, Jev 0.99
  ],
};
const remobrFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'remo-br-demonstracoes-contabeis-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.250527, tax:0,
    grossDebt:null, cash:null,
    officialTotalRevenue:42.957263, officialTotalExpenses:19.887233, officialPAT:22.819501,
  },
};
const remobrPresupuestoOverlayByYear = {};

const remobrPasesData = [];
const remobrResultadosData = {};
const remobrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['remo-br'] = {
  revenueLinesByYear: remobrRevenueLinesByYear, expenseLinesByYear: remobrExpenseLinesByYear,
  fiscalYearMeta: remobrFiscalYearMeta, pasesData: remobrPasesData,
  resultadosData: remobrResultadosData, titulosData: remobrTitulosData,
  presupuestoOverlayByYear: remobrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'remo-br-demonstracoes-contabeis-2021': {
    id:'remo-br-demonstracoes-contabeis-2021', clubId:'remo-br',
    title:'Clube do Remo — demonstracoes-contabeis-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Remo/demonstracoes-contabeis-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['remo-br'] = null;
