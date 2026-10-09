// ============================================================================
// data/criciuma-br-data.js — Criciúma Esporte Clube (Brasil).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-09), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "criciuma-br" — slug de "Criciuma" + '-br' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Criciúma Esporte Clube" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): razón social tal como la dice el documento, si
//   displayName        ok        "Criciuma" — nombre de la carpeta del club en Clubes/
//   country            ok        "BR" — carpeta de país "Brasil" (tabla PAISES)
//   reportingCurrency  ok        "BRL" — moneda de curso legal de Brasil
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro de transcrip
//   sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2012 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre nul
//   cierre             ok        "2012-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): Revisión del alta (Claude, 2026-10-09): el registro
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "BRL" — moneda de curso legal de Brasil (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "BRL@2012-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene BRL@2012-12-31 = 2.0435 (PTAX de cierre (venda) del Banco Central do Brasil al 2012-12-31)
//   sourceId           ok        "criciuma-br-demonstrativo-financeiro-2012" — clubId + nombre del archivo en slug
//   liga               ok        "br-serieB" — roster cacheado de "2012 Campeonato Brasileiro Série B" (tools/club-league-reference/br.json), coincidencia exacta "Criciúma"
//
// FISCAL YEAR META PROPUESTO para 2012 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2012: {"reportType":"official_balance_sheet","currency":"BRL","fxRef":"BRL@2012-12-31","sourceId":"criciuma-br-demonstrativo-financeiro-2012"}
// ============================================================================

const criciumabrRevenueLinesByYear = {
  // 2012: cargado por tools/cargar.mjs (2026-10-09) desde Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Brasil/Criciuma/demonstrativo-financeiro-2012.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2012: [
    { rawLabel:'Futebol', normalizedCategory:'lump_football_operations', amountNative:13.684738, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.92
    { rawLabel:'Sócios', normalizedCategory:'member_dues', amountNative:5.624029, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Extraordinárias', normalizedCategory:'other_income', amountNative:0.303164, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Venda de mercadorias', normalizedCategory:'sponsorship_commercial', amountNative:0.655157, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.186412, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.95
    { rawLabel:'Subvenções', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Outras receitas', normalizedCategory:'other_income', amountNative:0.088605, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.99
  ],
};
const criciumabrExpenseLinesByYear = {
  2012: [ // tools/cargar.mjs (2026-10-09)
    { rawLabel:'Departamento profissional', normalizedCategory:'lump_football_operations_expense', amountNative:-15.56887, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Departamento amador', normalizedCategory:'youth_other_sports_expense', amountNative:-1.4443, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento administrativo', normalizedCategory:'admin_general_expense', amountNative:-0.318809, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento marketing e comercial', normalizedCategory:'admin_general_expense', amountNative:-0.714485, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento financeiro', normalizedCategory:'admin_general_expense', amountNative:-0.159496, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento de patrimônio', normalizedCategory:'admin_general_expense', amountNative:-2.558049, disclosureLevel:'aggregated' }, // pág. 6, Jev 0.98
    { rawLabel:'Departamento jurídico', normalizedCategory:'admin_general_expense', amountNative:-0.106247, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
    { rawLabel:'Departamento loja Tigre Maníacos', normalizedCategory:'admin_general_expense', amountNative:-0.180738, disclosureLevel:'aggregated' }, // pág. 6, precedente
    { rawLabel:'Despesas tributárias', normalizedCategory:'admin_general_expense', amountNative:-0.223862, disclosureLevel:'aggregated' }, // pág. 6, Jev 1
  ],
};
const criciumabrFiscalYearMeta = {
  // 2012: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-09): cierre = 2012-12-31. Revisión del alta (Claude, 2026-10-09): el registro de transcripciones trae cierre null; el ejercicio del documento cierra el 2012-12-31
  2012: { // tools/cargar.mjs (2026-10-09). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'BRL', fxRef:'BRL@2012-12-31',
    sourceId:'criciuma-br-demonstrativo-financeiro-2012',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-1.356051, tax:0,
    extraRows: [
      {label:'Receitas financeiras – nota 15', value:0.074328},
      {label:'Despesas financeiras – nota 15', value:-1.430379},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Futebol', lado:'revenue', importe:13.684738, motivo:'el documento no desglosa este renglón'},
      {renglon:'Departamento profissional', lado:'expense', importe:15.56887, motivo:'Claude 2026-10-09: el estado de Criciúma abre los gastos por departamento; \'Departamento (Futebol) Profissional\' es el gasto del fútbol profesional sin desglose por naturaleza'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:20.542105, officialTotalExpenses:21.274856, officialPAT:-2.088802,
  },
};
const criciumabrPresupuestoOverlayByYear = {};

const criciumabrPasesData = [];
const criciumabrResultadosData = {};
const criciumabrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['criciuma-br'] = {
  revenueLinesByYear: criciumabrRevenueLinesByYear, expenseLinesByYear: criciumabrExpenseLinesByYear,
  fiscalYearMeta: criciumabrFiscalYearMeta, pasesData: criciumabrPasesData,
  resultadosData: criciumabrResultadosData, titulosData: criciumabrTitulosData,
  presupuestoOverlayByYear: criciumabrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'criciuma-br-demonstrativo-financeiro-2012': {
    id:'criciuma-br-demonstrativo-financeiro-2012', clubId:'criciuma-br',
    title:'Criciúma Esporte Clube — demonstrativo-financeiro-2012 (ejercicio 2012)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-09) desde la transcripción Clubes/Brasil/Criciuma/demonstrativo-financeiro-2012.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['criciuma-br'] = null;
