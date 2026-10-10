// ============================================================================
// data/paysandu-br-data.js — Paysandu Sport Club (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-10), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Paysandu/dre-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "paysandu-br" — slug de "Paysandu" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Paysandu Sport Club" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Paysandu" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (4 de 4 documentos cierran en el mes 12); este documento no alcanza solo
//   sport              ok        "futbol" — el .md nombra el fútbol 3 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien)
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (los demás .md del club (4 de 4 documentos cierran en el mes 12); este documento no alcanza solo)
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2021-12-31 = 5.5805 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2021)
//   sourceId           ok        "paysandu-br-dre-2021" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieC" — roster cacheado de "2021 Campeonato Brasileiro Série C" (tools/club-league-reference/br.json), coincidencia exacta "Paysandu"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2021-12-31","sourceId":"paysandu-br-dre-2021"}
// ============================================================================

const paysandubrRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Paysandu/dre-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Futebol Profissional', normalizedCategory:'lump_football_operations', amountNative:10.868442, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Futebol de Base', normalizedCategory:'youth_football', amountNative:0.91543, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'other_sports', amountNative:0.260353, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:1.176437, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Sócio Proprietário', normalizedCategory:'member_dues', amountNative:0.32084, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:3.43231, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Royalties e Franquias', normalizedCategory:'sponsorship_commercial', amountNative:1.753659, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Outras receita', normalizedCategory:'other_income', amountNative:0.272893, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Aluguel', normalizedCategory:'other_income', amountNative:0.21745, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receita com Gratuidades', normalizedCategory:'other_income', amountNative:3.182285, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Recuperação de Receitas', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'(-) Deduções da Receita do Futebol', normalizedCategory:'other_income', amountNative:-0.423691, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.96
    { rawLabel:'Lojas Lobo', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.9
    { rawLabel:'(-) Deduções da Receita de Venda', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/Paysandu/dre-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Paysandu/dre-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Futebol Profissional', normalizedCategory:'lump_football_operations', amountNative:20.164819, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
    { rawLabel:'Futebol de Base', normalizedCategory:'youth_football', amountNative:0.0055, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Esportes Olímpicos', normalizedCategory:'other_sports', amountNative:0.843745, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Sócio Torcedor', normalizedCategory:'member_dues', amountNative:3.659352, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Sócio Proprietário', normalizedCategory:'member_dues', amountNative:0.500273, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.97
    { rawLabel:'Doações', normalizedCategory:'other_income', amountNative:1.683667, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Royalties e Franquias', normalizedCategory:'sponsorship_commercial', amountNative:3.191832, disclosureLevel:'aggregated' }, // pág. 1, Claude 0.8
    { rawLabel:'Patrocínio', normalizedCategory:'sponsorship_commercial', amountNative:8.11171, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Remissão de dívida', normalizedCategory:'other_income', amountNative:0.934741, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Time Mania', normalizedCategory:'other_income', amountNative:0.671711, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Outras receita', normalizedCategory:'other_income', amountNative:0.135599, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
    { rawLabel:'Aluguel', normalizedCategory:'other_income', amountNative:0.2507, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Receita com Gratuidades', normalizedCategory:'other_income', amountNative:5.360617, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'(-) Deduções da Receitas', normalizedCategory:'other_income', amountNative:-0.44134, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
  ],
};
const paysandubrExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Custo com Pessoal', normalizedCategory:'wages_squad', amountNative:-10.35281, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'CMV', normalizedCategory:'admin_general_expense', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Custo com Pessoal', normalizedCategory:'wages_squad', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'Despesa com Pessoal', normalizedCategory:'admin_general_expense', amountNative:-2.142472, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Gerais e Administrativas', normalizedCategory:'admin_general_expense', amountNative:-5.802959, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas com Gratuidades', normalizedCategory:'other_expenses', amountNative:-3.182285, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Depreciação/Amortização', normalizedCategory:'depreciation', amountNative:-0.287647, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Perdas Constituídas', normalizedCategory:'other_expenses', amountNative:-0.005, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'PECLD', normalizedCategory:'other_expenses', amountNative:-1.911802, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.003463, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Gerais e Administrativas', normalizedCategory:'admin_general_expense', amountNative:-0.033061, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Depreciação/Amortização', normalizedCategory:'depreciation', amountNative:-0.00088, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'PECLD', normalizedCategory:'other_expenses', amountNative:-0.090646, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Outras Despesas com Vendas', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.98
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Custo com Pessoal', normalizedCategory:'wages_squad', amountNative:-18.173344, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.91
    { rawLabel:'Despesa com Pessoal', normalizedCategory:'admin_general_expense', amountNative:-3.446076, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Gerais e Administrativas', normalizedCategory:'admin_general_expense', amountNative:-16.862975, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas com Gratuidades (i)', normalizedCategory:'other_expenses', amountNative:-5.360617, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Depreciação/Amortização', normalizedCategory:'depreciation', amountNative:-0.49864, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Perdas Constituídas (ii)', normalizedCategory:'other_expenses', amountNative:-0.005171, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'PECLD', normalizedCategory:'other_expenses', amountNative:-2.459373, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas Tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.043202, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
};
const paysandubrFiscalYearMeta = {
  2021: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'paysandu-br-dre-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.179298, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.000095},
      {label:'Despesas financeiras', value:-0.179393},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Futebol Profissional', lado:'revenue', importe:10.868442, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:21.976408, officialTotalExpenses:23.813025, officialPAT:-2.015915,
  },
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2023-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae 2022-12-31 (el primer año del encabezado 'Exercícios findos em 31 de dezembro 2022 e 2023'); el ejercicio del documento cierra el 2023-12-31
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'paysandu-br-dre-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.760701, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.009504},
      {label:'Despesas financeiras', value:-0.770205},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Futebol Profissional', lado:'revenue', importe:20.164819, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:45.072926, officialTotalExpenses:46.849398, officialPAT:-2.537173,
  },
};
const paysandubrPresupuestoOverlayByYear = {};

const paysandubrPasesData = [];
const paysandubrResultadosData = {};
const paysandubrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['paysandu-br'] = {
  revenueLinesByYear: paysandubrRevenueLinesByYear, expenseLinesByYear: paysandubrExpenseLinesByYear,
  fiscalYearMeta: paysandubrFiscalYearMeta, pasesData: paysandubrPasesData,
  resultadosData: paysandubrResultadosData, titulosData: paysandubrTitulosData,
  presupuestoOverlayByYear: paysandubrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'paysandu-br-dre-2021': {
    id:'paysandu-br-dre-2021', clubId:'paysandu-br',
    title:'Paysandu Sport Club — dre-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Paysandu/dre-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'paysandu-br-dre-2023': {
    id:'paysandu-br-dre-2023', clubId:'paysandu-br',
    title:'Paysandu Sport Club — dre-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/Paysandu/dre-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['paysandu-br'] = null;
