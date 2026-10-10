// ============================================================================
// data/cuiaba-br-data.js — Cuiabá Esporte Clube - Sociedade Anônima do Futebol (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Cuiaba/balanco-financeiro-2022.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "cuiaba-br" — slug de "Cuiaba" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Cuiabá Esporte Clube - Sociedade Anônima do Futebol" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Cuiaba" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (22 de 23 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 25 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2022 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (contenido del .md (22 de 23 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2022-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2022-12-31 = 5.2177 (PTAX de cierre (venda) del Banco Central do Brasil, 30/12/2022 (últ
//   sourceId           ok        "cuiaba-br-balanco-financeiro-2022" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieA" — roster cacheado de "2022 Campeonato Brasileiro Série A" (tools/club-league-reference/br.json), coincidencia exacta "Cuiabá"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2022-12-31","sourceId":"cuiaba-br-balanco-financeiro-2022"}
// ============================================================================

const cuiababrRevenueLinesByYear = {
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Cuiaba/balanco-financeiro-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'PATROCÍNIOS', normalizedCategory:'sponsorship_commercial', amountNative:17.147045, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'PLACAS DE PUBLICIDADE', normalizedCategory:'sponsorship_commercial', amountNative:5.5001, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'DIREITOS ECONÔMICOS DE ATLETAS', normalizedCategory:'player_sales', amountNative:1.276842, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.9
    { rawLabel:'SOCIO TORCEDOR', normalizedCategory:'member_dues', amountNative:3.017469, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.88
    { rawLabel:'COTAS/TV', normalizedCategory:'broadcasting', amountNative:87.560832, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'BILHETERIA', normalizedCategory:'matchday_competition', amountNative:16.116301, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'OUTRAS RECEITAS C/ FUTEBOL', normalizedCategory:'other_income', amountNative:0.03446, disclosureLevel:'aggregated' }, // pág. 2, Jev 0.92
    { rawLabel:'LICENCIAMENTOS', normalizedCategory:'sponsorship_commercial', amountNative:0.287757, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'ESCOLINHA', normalizedCategory:'youth_football', amountNative:0.874757, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'LOTERIAS', normalizedCategory:'other_income', amountNative:0.981819, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'OUTRAS RECEITAS', normalizedCategory:'other_income', amountNative:0.545413, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Cuiaba/balanco-financeiro-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Cuiaba/balanco-financeiro-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'PATROCÍNIOS', normalizedCategory:'sponsorship_commercial', amountNative:20.363084, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'PLACAS DE PUBLICIDADE', normalizedCategory:'sponsorship_commercial', amountNative:10.5, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DIREITOS ECONÔMICOS DE ATLETAS', normalizedCategory:'player_sales', amountNative:114.423113, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.9
    { rawLabel:'SÓCIO TORCEDOR', normalizedCategory:'member_dues', amountNative:1.626578, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.88
    { rawLabel:'COTAS/TV', normalizedCategory:'broadcasting', amountNative:56.035752, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'BILHETERIA/JOGOS', normalizedCategory:'matchday_competition', amountNative:13.075506, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'OUTRAS RECEITAS C/ FUTEBOL', normalizedCategory:'other_income', amountNative:2.860312, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.92
    { rawLabel:'LICENCIAMENTOS', normalizedCategory:'sponsorship_commercial', amountNative:0.294877, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'ESCOLINHA', normalizedCategory:'youth_football', amountNative:1.395352, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'LOTERIAS', normalizedCategory:'other_income', amountNative:0.757616, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'OUTRAS RECEITAS', normalizedCategory:'other_income', amountNative:2.83456, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
};
const cuiababrExpenseLinesByYear = {
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-9.604853, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'CUSTOS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-68.268443, disclosureLevel:'aggregated' }, // pág. 2, Claude 0.8
    { rawLabel:'CUSTOS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-8.318707, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'OUTROS CUSTOS COM FUTEBOL', normalizedCategory:'wages_squad', amountNative:-6.863131, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'DESPESAS COM PESSOAL', normalizedCategory:'admin_general_expense', amountNative:-2.238022, disclosureLevel:'aggregated' }, // pág. 2, precedente
    { rawLabel:'DESPESAS ADMINISTRATIVAS', normalizedCategory:'admin_general_expense', amountNative:-12.36934, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'DESPESAS COM VENDAS', normalizedCategory:'admin_general_expense', amountNative:-0.015268, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-0.153237, disclosureLevel:'aggregated' }, // pág. 2, Jev 1
  ],
  2024: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'(-) DIREITOS ECONÔMICOS/ CUSTO INTANGÍVEL', normalizedCategory:'player_amortisation', amountNative:-11.845753, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-7.268369, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'CUSTOS COM PESSOAL', normalizedCategory:'wages_squad', amountNative:-92.403479, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.8
    { rawLabel:'CUSTOS COM JOGOS', normalizedCategory:'match_organisation_expense', amountNative:-15.683748, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'CUSTOS COM AMORTIZAÇÃO DE CONTRATOS', normalizedCategory:'player_amortisation', amountNative:-10.29473, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.95
    { rawLabel:'OUTROS CUSTOS COM FUTEBOL', normalizedCategory:'wages_squad', amountNative:-10.975688, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'DESPESAS COM PESSOAL', normalizedCategory:'admin_general_expense', amountNative:-3.355965, disclosureLevel:'aggregated' }, // pág. 9, precedente
    { rawLabel:'DESPESAS ADMINISTRATIVAS', normalizedCategory:'admin_general_expense', amountNative:-4.577698, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DESPESAS DEPRECIAÇÃO', normalizedCategory:'depreciation', amountNative:-0.80115, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DESPESAS GERAIS CATEGORIA DE BASE', normalizedCategory:'youth_other_sports_expense', amountNative:-3.182101, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.99
    { rawLabel:'DESPESAS GERAIS ESCOLINHA', normalizedCategory:'youth_other_sports_expense', amountNative:-0.819815, disclosureLevel:'aggregated' }, // pág. 9, Claude 0.85
    { rawLabel:'DESPESAS GERAIS FUTEBOL FEMININO', normalizedCategory:'youth_other_sports_expense', amountNative:-0.222635, disclosureLevel:'aggregated' }, // pág. 9, Jev 0.96
    { rawLabel:'DESPESAS COM VENDAS', normalizedCategory:'admin_general_expense', amountNative:-0.096191, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
    { rawLabel:'DESPESAS TRIBUTÁRIAS', normalizedCategory:'admin_general_expense', amountNative:-0.624905, disclosureLevel:'aggregated' }, // pág. 9, Jev 1
  ],
};
const cuiababrFiscalYearMeta = {
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'cuiaba-br-balanco-financeiro-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.278683, tax:0,
    extraRows: [
      {label:'DESPESAS/(RECEITAS) FINANCEIRAS', value:0.278683},
      {label:'(-) PROVISÃO PARA IMPOSTO DE RENDA', value:null},
      {label:'(-) PROVISÃO PARA CONTRIBUIÇÃO SOCIAL', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:133.342795, officialTotalExpenses:107.831001, officialPAT:25.790477,
  },
  2024: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'cuiaba-br-balanco-financeiro-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:2.738057, tax:0,
    extraRows: [
      {label:'DESPESAS/(RECEITAS) FINANCEIRAS', value:2.738057},
      {label:'(-) PROVISÃO PARA IMPOSTO DE RENDA', value:null},
      {label:'(-) PROVISÃO PARA CONTRIBUIÇÃO SOCIAL', value:null},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:224.16675, officialTotalExpenses:162.152227, officialPAT:64.752582,
  },
};
const cuiababrPresupuestoOverlayByYear = {};

const cuiababrPasesData = [];
const cuiababrResultadosData = {};
const cuiababrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['cuiaba-br'] = {
  revenueLinesByYear: cuiababrRevenueLinesByYear, expenseLinesByYear: cuiababrExpenseLinesByYear,
  fiscalYearMeta: cuiababrFiscalYearMeta, pasesData: cuiababrPasesData,
  resultadosData: cuiababrResultadosData, titulosData: cuiababrTitulosData,
  presupuestoOverlayByYear: cuiababrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'cuiaba-br-balanco-financeiro-2022': {
    id:'cuiaba-br-balanco-financeiro-2022', clubId:'cuiaba-br',
    title:'Cuiabá Esporte Clube - Sociedade Anônima do Futebol — balanco-financeiro-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'cuiaba-br-balanco-financeiro-2024': {
    id:'cuiaba-br-balanco-financeiro-2024', clubId:'cuiaba-br',
    title:'Cuiabá Esporte Clube - Sociedade Anônima do Futebol — balanco-financeiro-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Cuiaba/balanco-financeiro-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['cuiaba-br'] = null;
