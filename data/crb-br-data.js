// ============================================================================
// data/crb-br-data.js — Clube de Regatas Brasil (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-09), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/CRB/balanco-patrimonial-2020.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "crb-br" — slug de "CRB" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Clube de Regatas Brasil" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "CRB" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 0 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2020 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2020-12-31" — año del ejercicio + mes de cierre (contenido del .md (4 de 4 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2020-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2020-12-31 = 5.1967 (PTAX de cierre (venda) del Banco Central do Brasil al 31/12/2020)
//   sourceId           ok        "crb-br-balanco-patrimonial-2020" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2020 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "CRB"
//
// FISCAL YEAR META PROPUESTO para 2020 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2020: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2020-12-31","sourceId":"crb-br-balanco-patrimonial-2020"}
// ============================================================================

const crbbrRevenueLinesByYear = {
  // 2020: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/balanco-patrimonial-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/CRB/balanco-patrimonial-2020.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2020: [
    { rawLabel:'Receita operacional líquida', normalizedCategory:'lump_football_operations', amountNative:14.902901, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/balanco-patrimonial-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/CRB/balanco-patrimonial-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Receita operacional líquida', normalizedCategory:'lump_football_operations', amountNative:23.41935, disclosureLevel:'aggregated' }, // pág. 1, Jev 0.99
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/demonstracoes-contabeis-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/CRB/demonstracoes-contabeis-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Receita operacional líquida', normalizedCategory:'lump_football_operations', amountNative:60.144551, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
  // 2025: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/CRB/demonstracoes-contabeis-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/CRB/demonstracoes-contabeis-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Receita operacional líquida', normalizedCategory:'lump_football_operations', amountNative:47.471422, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/CRB/balanco-patrimonial-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/CRB/balanco-patrimonial-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'Receita operacional líquida', normalizedCategory:'lump_football_operations', amountNative:28.583332, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
  // 2023: cargado por tools/cargar.mjs (2026-10-10) desde Clubes/Brasil/CRB/balanco-patrimonial-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/CRB/balanco-patrimonial-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Receita operacional líquida', normalizedCategory:'lump_football_operations', amountNative:45.563569, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const crbbrExpenseLinesByYear = {
  2020: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Custo das atividades sociais e esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-2.969625, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas com pessoal', normalizedCategory:'wages_squad', amountNative:-4.08824, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-6.384108, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.013794, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2021: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Custo das atividades sociais e esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-6.628417, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas com pessoal', normalizedCategory:'wages_squad', amountNative:-13.029931, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-2.5048, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.0687, disclosureLevel:'aggregated' }, // pág. 1, Jev 1
  ],
  2024: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Custo das atividades sociais e esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-16.557833, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Despesas com pessoal', normalizedCategory:'wages_squad', amountNative:-31.531998, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-7.923325, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.071413, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
  2025: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Custo das atividades sociais e esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-43.365002, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Despesas com pessoal', normalizedCategory:'admin_general_expense', amountNative:-0.754228, disclosureLevel:'aggregated' }, // pág. 7, precedente
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-4.349905, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.189484, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
  ],
  2022: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Custo das atividades sociais e esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-6.974826, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas com pessoal', normalizedCategory:'admin_general_expense', amountNative:-18.425275, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-3.217749, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.070314, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
  2023: [ // tools/cargar.mjs (2026-10-10)
    { rawLabel:'Custo das atividades sociais e esportivas', normalizedCategory:'lump_football_operations_expense', amountNative:-8.358054, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas com pessoal', normalizedCategory:'admin_general_expense', amountNative:-27.068659, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas gerais e administrativas', normalizedCategory:'admin_general_expense', amountNative:-5.038184, disclosureLevel:'aggregated' }, // pág. 1, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.050353, disclosureLevel:'aggregated' }, // pág. 1, precedente
  ],
};
const crbbrFiscalYearMeta = {
  2020: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2020-12-31',
    sourceId:'crb-br-balanco-patrimonial-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.227878, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.013621},
      {label:'Despesas financeiras', value:-0.241499},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita operacional líquida', lado:'revenue', importe:14.902901, motivo:'el documento no desglosa este renglón'},
      {renglon:'Custo das atividades sociais e esportivas', lado:'expense', importe:2.969625, motivo:'Claude 2026-10-09: CRB es un club de fútbol y todos sus ingresos son del fútbol (mídia, patrocínio, bilheteria, campeonatos: nota 8 de 2025); el costo de sus actividades deportivas es el del fútbol, no de otros deportes'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:14.902901, officialTotalExpenses:13.455767, officialPAT:1.219256,
  },
  2021: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2021-12-31',
    sourceId:'crb-br-balanco-patrimonial-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.027842, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.050497},
      {label:'Despesas financeiras', value:-0.022655},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita operacional líquida', lado:'revenue', importe:23.41935, motivo:'el documento no desglosa este renglón'},
      {renglon:'Custo das atividades sociais e esportivas', lado:'expense', importe:6.628417, motivo:'Claude 2026-10-09: CRB es un club de fútbol y todos sus ingresos son del fútbol (mídia, patrocínio, bilheteria, campeonatos: nota 8 de 2025); el costo de sus actividades deportivas es el del fútbol, no de otros deportes'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:23.41935, officialTotalExpenses:22.231848, officialPAT:1.215344,
  },
  2024: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2024-12-31',
    sourceId:'crb-br-demonstracoes-contabeis-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.140106, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.165118},
      {label:'Despesas financeiras', value:-0.025012},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita operacional líquida', lado:'revenue', importe:60.144551, motivo:'el documento no desglosa este renglón'},
      {renglon:'Custo das atividades sociais e esportivas', lado:'expense', importe:16.557833, motivo:'Claude 2026-10-09: CRB es un club de fútbol y todos sus ingresos son del fútbol (mídia, patrocínio, bilheteria, campeonatos: nota 8 de 2025); el costo de sus actividades deportivas es el del fútbol, no de otros deportes'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:60.144551, officialTotalExpenses:56.084569, officialPAT:4.20009,
  },
  2025: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2025-12-31',
    sourceId:'crb-br-demonstracoes-contabeis-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.080129, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:null},
      {label:'Despesas financeiras', value:-0.080129},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita operacional líquida', lado:'revenue', importe:47.471422, motivo:'el documento no desglosa este renglón'},
      {renglon:'Custo das atividades sociais e esportivas', lado:'expense', importe:43.365002, motivo:'Claude 2026-10-09: CRB es un club de fútbol y todos sus ingresos son del fútbol (mídia, patrocínio, bilheteria, campeonatos: nota 8 de 2025); el costo de sus actividades deportivas es el del fútbol, no de otros deportes'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:47.471422, officialTotalExpenses:48.658619, officialPAT:-1.267325,
  },
  2022: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2022-12-31',
    sourceId:'crb-br-balanco-patrimonial-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.129574, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.147148},
      {label:'Despesas financeiras', value:-0.017574},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita operacional líquida', lado:'revenue', importe:28.583332, motivo:'el documento no desglosa este renglón'},
      {renglon:'Custo das atividades sociais e esportivas', lado:'expense', importe:6.974826, motivo:'Claude 2026-10-09: CRB es un club de fútbol y todos sus ingresos son del fútbol (mídia, patrocínio, bilheteria, campeonatos: nota 8 de 2025); el costo de sus actividades deportivas es el del fútbol, no de otros deportes'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:28.583332, officialTotalExpenses:28.688164, officialPAT:0.024743,
  },
  2023: { // tools/cargar.mjs (2026-10-10). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2023-12-31',
    sourceId:'crb-br-balanco-patrimonial-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.252817, tax:0,
    extraRows: [
      {label:'Receitas financeiras', value:0.131346},
      {label:'Despesas financeiras', value:-0.384163},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Receita operacional líquida', lado:'revenue', importe:45.563569, motivo:'el documento no desglosa este renglón'},
      {renglon:'Custo das atividades sociais e esportivas', lado:'expense', importe:8.358054, motivo:'Claude 2026-10-09: CRB es un club de fútbol y todos sus ingresos son del fútbol (mídia, patrocínio, bilheteria, campeonatos: nota 8 de 2025); el costo de sus actividades deportivas es el del fútbol, no de otros deportes'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:45.563569, officialTotalExpenses:40.51525, officialPAT:4.795503,
  },
};
const crbbrPresupuestoOverlayByYear = {};

const crbbrPasesData = [];
const crbbrResultadosData = {};
const crbbrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['crb-br'] = {
  revenueLinesByYear: crbbrRevenueLinesByYear, expenseLinesByYear: crbbrExpenseLinesByYear,
  fiscalYearMeta: crbbrFiscalYearMeta, pasesData: crbbrPasesData,
  resultadosData: crbbrResultadosData, titulosData: crbbrTitulosData,
  presupuestoOverlayByYear: crbbrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'crb-br-balanco-patrimonial-2020': {
    id:'crb-br-balanco-patrimonial-2020', clubId:'crb-br',
    title:'Clube de Regatas Brasil — balanco-patrimonial-2020 (ejercicio 2020)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'crb-br-balanco-patrimonial-2021': {
    id:'crb-br-balanco-patrimonial-2021', clubId:'crb-br',
    title:'Clube de Regatas Brasil — balanco-patrimonial-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'crb-br-demonstracoes-contabeis-2024': {
    id:'crb-br-demonstracoes-contabeis-2024', clubId:'crb-br',
    title:'Clube de Regatas Brasil — demonstracoes-contabeis-2024 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/demonstracoes-contabeis-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'crb-br-demonstracoes-contabeis-2025': {
    id:'crb-br-demonstracoes-contabeis-2025', clubId:'crb-br',
    title:'Clube de Regatas Brasil — demonstracoes-contabeis-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/CRB/demonstracoes-contabeis-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'crb-br-balanco-patrimonial-2022': {
    id:'crb-br-balanco-patrimonial-2022', clubId:'crb-br',
    title:'Clube de Regatas Brasil — balanco-patrimonial-2022 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'crb-br-balanco-patrimonial-2023': {
    id:'crb-br-balanco-patrimonial-2023', clubId:'crb-br',
    title:'Clube de Regatas Brasil — balanco-patrimonial-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-10) desde la transcripción Clubes/Brasil/CRB/balanco-patrimonial-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['crb-br'] = null;
