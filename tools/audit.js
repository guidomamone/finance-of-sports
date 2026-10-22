#!/usr/bin/env node
// ============================================================================
// tools/audit.js — auditoría determinista del proyecto entero, en Node.
//
// EL PROBLEMA QUE RESUELVE: `auditAll()` (js/principal.js; nació en index.html, Versión 118) verifica que
// cada ejercicio CIERRE contra el total que su propio documento imprime. Es la
// verificación más importante del sitio, pero solo ve una clase de error: la
// suma que no da. No ve al ejercicio que no tiene ningún total oficial contra
// qué compararse (y por lo tanto nunca se verifica), ni al que cierra perfecto
// con un error de escala heredado del documento, ni a la categoría con un typo
// que manda plata al catch-all sin cambiar ningún total, ni a la categoría que
// el motor directamente no suma. Todo eso cierra los tie-outs igual.
//
// Esta auditoría es el complemento: busca lo que un total correcto no delata, y
// lo que solo se ve mirando los 41 clubes JUNTOS (este club factura 300 veces lo
// que sus pares de la misma liga; estos 5 no tienen ningún check encima).
//
// LA REGLA HEREDADA DE `auditAll()`, QUE ACÁ SE RESPETA: cualquier verificación
// numérica pasa por `computeYearGeneric()`, el motor real. NUNCA se reimplementa
// la cascada del resultado (se probó una vez, y una fórmula simplificada tiró 12
// falsos positivos por no contemplar nonCash/profitOnPlayerSales/assetSales/tax).
// Por eso este script CARGA `js/finanzas-calc.js` en un contexto de `vm` y llama
// a las funciones de verdad, en vez de rehacer las cuentas por afuera.
//
// QUÉ NO HACE, A PROPÓSITO:
//   - No dice si un número está bien contra el PDF. Eso solo lo puede hacer quien
//     tiene el documento delante, al onboardear (ver el skill
//     `Admin/PANTALLA.md`, ex §8). Esto audita CONSISTENCIA, no fuente.
//   - No toca nada. Solo lee y reporta.
//   - No reemplaza a `auditAll()` en el navegador: los chequeos de consola,
//     listeners y Chart.js solo se ven con el sitio corriendo.
//
// USO:
//   node tools/audit.js              informe completo, agrupado por severidad
//   node tools/audit.js --json       el mismo resultado como JSON
//   node tools/audit.js --quiet      solo P0/P1 (sirve como gate antes de un push)
//
// Sale con código 1 si hay algún P0 o P1.
//
// HALLAZGOS YA CONFIRMADOS A MANO: `tools/audit-ignore.json` silencia lo que
// alguien YA revisó contra el documento y dio por bueno (ej. una deducción sobre
// la receita que parece un signo invertido y no lo es). Cada entrada es
// `{code, match, motivo}` — `match` es un pedazo del texto del hallazgo — y el
// informe dice cuántos se silenciaron. REGLA: solo se agrega una entrada después
// de MIRAR la fuente, nunca para bajar el número de hallazgos. Silenciar algo sin
// verificarlo es exactamente el atajo que este proyecto no se puede permitir.
//
// SEVERIDADES:
//   P0  un número publicado está mal, o puede estarlo. Se arregla antes que nada.
//   P1  algo roto o ausente que el visitante ve (dato en cero, conversión que falla).
//   P2  riesgo: no está mal hoy, pero se va a romper o no escala.
//   P3  limpieza / informativo.
// ============================================================================

const fs = require('fs');
const path = require('path');
const { archivosData, idDeArchivo, rutaData } = require('./data-clubes.js');
const { execFileSync } = require('child_process');
const vm = require('vm');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ARGS = process.argv.slice(2);
const JSON_OUT = ARGS.includes('--json');
const QUIET = ARGS.includes('--quiet');

const IGNORE_FILE = path.join(ROOT, 'tools/audit-ignore.json');
const IGNORADOS = fs.existsSync(IGNORE_FILE) ? JSON.parse(fs.readFileSync(IGNORE_FILE, 'utf8')) : [];

// ---------------------------------------------------------------------------
// 1. CARGA DEL MOTOR REAL
// ---------------------------------------------------------------------------
// OJO, DIFERENCIA CON `tools/generate-club-index.js`: ese script arma el sandbox
// con `window: {}` (un objeto aparte del global) y le alcanza, porque solo LEE
// los datos. Acá se llama al motor, y `computeYearGeneric()` lee
// `CLUB_GENERIC_DATA` SIN el prefijo `window.` — en el navegador son la misma
// cosa, en un contexto de `vm` no. Para que el `window.CLUB_GENERIC_DATA = ...`
// de cada data file cree también el global suelto que el motor busca, el objeto
// global del contexto tiene que ser su propio `window`.
function loadEngine() {
  const sandbox = { console };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);

  // Globals que `js/finanzas-calc.js` espera de js/principal.js, no de
  // los data files. Mismos valores que el sitio al cargar.
  vm.runInContext('var FX_RATE = 1450; var currentCurrency = "USD"; var simplifyFormat = true;',
    ctx, { filename: 'globals-de-index.html' });

  const files = [
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js',
    'data/sources-view.js', 'data/club-leagues.js', 'data/site-labels.js',
    // Versión 164: las filas de club-leagues se partieron en un archivo por país, que
    // en el navegador se cargan al abrir el selector. Acá no hay selector, así que se
    // cargan todos, siempre: la auditoría tiene que ver la tabla completa.
    ...fs.readdirSync(path.join(ROOT, 'data/club-leagues')).filter(f => f.endsWith('.js')).sort()
      .map(f => 'data/club-leagues/' + f),
    ...archivosData(),
    'js/finanzas-calc.js',
  ];
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) throw new Error(`Falta ${rel}`);
    try { vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: rel }); }
    catch (e) { throw new Error(`No se pudo cargar ${rel}: ${e.message}`); }
  }

  // `const`/`function` de un script de vm quedan en el scope léxico del contexto,
  // no como propiedades del global: se leen evaluando una expresión ahí adentro.
  return vm.runInContext(`({
    computeYearGeneric, toDisplayValue, bucketize, yearMetaFor, toleranciaTieOut, montosTieOut,
    REVENUE_CATEGORIES, EXPENSE_CATEGORIES,
    GENERIC_REVENUE_CATEGORIES, GENERIC_EXPENSE_CATEGORIES, SPORT_TAXONOMIES, genericCategoryOf,
    SPORT_LISTS: Object.fromEntries(Object.entries(SPORT_TAXONOMIES).map(([k, t]) => [k, { revenue: eval(t.lists.revenue[0]), expense: eval(t.lists.expense[0]) }])),
    REVENUE_BUCKETS: GENERIC_SIMPLIFIED_REVENUE_BUCKETS,
    EXPENSE_BUCKETS: GENERIC_SIMPLIFIED_EXPENSE_BUCKETS,
    clubs, sources, gestionesByClub, CURRENCY_META,
    fxMetaFor, FX_SOURCE, FX_CLOSE,
    CLUB_LEAGUE_BY_YEAR, clubLeagueCoverage,
    generic: window.CLUB_GENERIC_DATA || {},
  })`, ctx, { filename: 'leer-globals' });
}

// ---------------------------------------------------------------------------
// 2. HALLAZGOS
// ---------------------------------------------------------------------------
const findings = [];
const silenciados = [];
const reglasUsadas = new Set();
const add = (sev, code, msg) => {
  const regla = IGNORADOS.find(i => i.code === code && msg.includes(i.match));
  if (regla) reglasUsadas.add(regla);
  (regla ? silenciados : findings).push({ sev, code, msg, ...(regla ? { motivo: regla.motivo } : {}) });
};

const REPORT_TYPES_REALES = ['official_balance_sheet', 'official_budget', 'official_budget_and_balance', 'unofficial_mirror'];
const REPORT_TYPES_BALANCE = ['official_balance_sheet', 'official_budget_and_balance', 'unofficial_mirror'];
const REPORT_TYPES_CONOCIDOS = [...REPORT_TYPES_REALES, 'pending_official', 'press_estimate', 'placeholder'];

function* clubYears(api) {
  for (const clubId of Object.keys(api.generic).sort()) {
    const g = api.generic[clubId];
    const meta = g.fiscalYearMeta || {};
    for (const year of Object.keys(meta).map(Number).sort((a, b) => a - b)) {
      yield {
        clubId, year, ym: meta[year],
        rev: (g.revenueLinesByYear || {})[year] || [],
        exp: (g.expenseLinesByYear || {})[year] || [],
      };
    }
  }
}

const ref = (clubId, year) => `${clubId} ${year}`;
const sum = lines => lines.reduce((s, l) => s + (l.amountNative || 0), 0);

// ---------------------------------------------------------------------------
// 3. CHEQUEOS
// ---------------------------------------------------------------------------

// --- E: estructura e identidad -------------------------------------------
function checkEstructura(api) {
  for (const id of Object.keys(api.generic)) {
    if (!api.clubs[id]) add('P1', 'archivo-sin-club', `${id}: tiene ${rutaData(id)} pero no está en data/clubs.js, el sitio nunca lo muestra`);
  }
  for (const id of Object.keys(api.clubs)) {
    if (!fs.existsSync(path.join(ROOT, rutaData(id)))) {
      add('P1', 'club-sin-archivo', `${id}: está en clubs.js pero no existe ${rutaData(id)}, loadClubData() va a dar 404`);
    }
    const cur = api.clubs[id].reportingCurrency;
    if (cur && !api.CURRENCY_META[cur]) add('P2', 'moneda-sin-meta', `${id}: reportingCurrency '${cur}' no está en CURRENCY_META, cae al fallback de currency-map.js`);
    // Versión 179: `brandColor:null` es el resultado CERRADO de "se miró y no lleva color" (blanco
    // o ambiguo). El campo AUSENTE es otra cosa: nadie lo chequeó. Los dos se ven igual en pantalla
    // (`pintarCrest()` hace `if(!c)`), así que sin esta distinción la única forma de saber cuál es
    // cuál sería rebarrer todos los clubes, que es justo lo que el paso de onboarding evita.
    // (to-do 339) todo club declara su deporte (sport en data/clubs.js): las tools lo leen de ahí y ya no suponen fútbol; el sitio y audit.js todavía caen a fútbol si falta
    if (!api.clubs[id].sport || !api.SPORT_TAXONOMIES[api.clubs[id].sport]) add('P1', 'club-sin-deporte', `${id}: sport ${api.clubs[id].sport ? `«${api.clubs[id].sport}» no tiene taxonomía en SPORT_TAXONOMIES` : 'falta'} en data/clubs.js`);
    if (!('brandColor' in api.clubs[id])) add('P3', 'club-sin-color-ni-null', `${id}: sin brandColor ni brandColor:null en data/clubs.js — no se distingue "se miró y no lleva color" de "nadie lo chequeó" (ver club-or-year-onboarding/club-nuevo.md)`);
  }

  for (const { clubId, year, ym } of clubYears(api)) {
    if (!REPORT_TYPES_CONOCIDOS.includes(ym.reportType)) {
      add('P2', 'reportType-desconocido', `${ref(clubId, year)}: reportType '${ym.reportType}' no está en la lista conocida`);
    }
    const real = REPORT_TYPES_REALES.includes(ym.reportType);
    if (real && !ym.sourceId) {
      add('P2', 'sin-fuente', `${ref(clubId, year)}: ejercicio real (${ym.reportType}) sin sourceId, la pestaña Fuentes no lo puede citar`);
    }
    if (ym.sourceId && !api.sources[ym.sourceId]) {
      add('P1', 'fuente-inexistente', `${ref(clubId, year)}: sourceId '${ym.sourceId}' no existe en sources{}`);
    }
    const gestiones = api.gestionesByClub[clubId] || {};
    if (ym.gestionId && !gestiones[ym.gestionId]) {
      add('P2', 'gestion-inexistente', `${ref(clubId, year)}: gestionId '${ym.gestionId}' no existe en gestionesByClub.${clubId}`);
    }
  }
}

// --- D1/D2/D3: tie-outs y cobertura de verificación ------------------------
function checkTieOuts(api) {
  let conCheck = 0, sinCheck = 0;
  for (const { clubId, year, ym } of clubYears(api)) {
    const tiene = ym.officialTotalRevenue != null || ym.officialTotalExpenses != null || ym.officialPAT != null;
    if (!tiene) {
      sinCheck++;
      if (REPORT_TYPES_REALES.includes(ym.reportType)) {
        add('P2', 'sin-verificacion', `${ref(clubId, year)}: ejercicio real sin ningún total oficial cargado — nadie verifica nunca estos números`);
      }
      continue;
    }
    conCheck++;
    const c = api.computeYearGeneric(clubId, year);
    const cmp = (label, computed, official, que) => {
      const delta = +(computed - official).toFixed(3);
      if (Math.abs(delta) >= api.toleranciaTieOut(api.montosTieOut(c, que), official)) { // redondeo de la unidad impresa (js/finanzas-calc.js)
        add('P0', 'no-cierra', `${ref(clubId, year)} ${label}: calculado ${computed} vs. oficial ${official} (diferencia ${delta})`);
      }
    };
    if (ym.officialTotalRevenue != null) cmp('Revenue', c.revenue, ym.officialTotalRevenue, 'revenue');
    if (ym.officialTotalExpenses != null) cmp('Expenses', Math.abs(c.expenses + c.nonCash), Math.abs(ym.officialTotalExpenses), 'expenses');
    if (ym.officialPAT != null) cmp('PAT', c.pat, ym.officialPAT, 'pat');

    // OJO CON LA CONDICIÓN, Y POR QUÉ NO ALCANZA CON "es un balance y no tiene PAT" (to-do 20(a),
    // 2026-09-20). Este chequeo tiraba 11 hallazgos y 10 eran de la misma clase y no eran
    // accionables: los 10 clubes de la J.League publican el INGRESO de cada club y no su
    // estructura de costos, así que tienen `officialTotalExpenses: null`. Un ejercicio del que no
    // se publican los gastos NO PUEDE tener un resultado que cargar — pedirle el PAT es pedirle un
    // número que no existe en ninguna fuente, y el hallazgo iba a reaparecer en cada corrida para
    // siempre, creciendo con cada club japonés nuevo. Ahora solo se reporta cuando el documento SÍ
    // publica ingresos y gastos: ahí el resultado existe, y que falte es un hueco de carga real.
    if (REPORT_TYPES_BALANCE.includes(ym.reportType) && ym.officialPAT == null &&
        ym.officialTotalRevenue != null && ym.officialTotalExpenses != null) {
      add('P2', 'balance-sin-pat', `${ref(clubId, year)}: declara ingresos y gastos oficiales pero no officialPAT, el resultado del ejercicio no se verifica`);
    }
  }
  add('P3', 'cobertura', `Cobertura: ${conCheck} ejercicios con al menos un total oficial, ${sinCheck} sin ninguno`);
}

// --- D4/D5: taxonomía y categorías que el motor no suma --------------------
function checkCategorias(api) {
  // (to-do 339) las categorías válidas de un club son las de la taxonomía de SU deporte (SPORT_TAXONOMIES): una línea de rugby con lump_rugby_operations no es un typo.
  // Para el fútbol es la misma lista de siempre (REVENUE_CATEGORIES / EXPENSE_CATEGORIES). Un club sin deporte (o sin taxonomía) cae al fútbol acá y lo marca club-sin-deporte.
  const listasDe = (clubId) => { const t = api.SPORT_TAXONOMIES[(api.clubs[clubId] || {}).sport] || api.SPORT_TAXONOMIES.futbol; return { revOk: new Set(Object.keys(t.revenue)), expOk: new Set(Object.keys(t.expense)) }; };
  for (const { clubId, year, rev, exp } of clubYears(api)) {
    const { revOk, expOk } = listasDe(clubId);
    // Dos casos bien distintos, y conviene no confundirlos:
    //   - la categoría no existe en NINGUNA de las dos taxonomías: es un typo, y la
    //     línea cae al catch-all de Formato simplificado sin romper ningún total. P0.
    //   - la categoría existe, pero en la taxonomía de la otra sección (ej. una línea
    //     de INGRESO categorizada como 'exceptional_items', que es de gastos): el total
    //     sigue cerrando y la plata se muestra, pero en el catch-all. No es un número
    //     mal, es una categoría prestada que hoy funciona de casualidad. P2.
    for (const [sec, lines, propia, ajena] of [
      ['ingreso', rev, revOk, expOk], ['gasto', exp, expOk, revOk],
    ]) {
      for (const l of lines) {
        if (propia.has(l.normalizedCategory)) continue;
        if (ajena.has(l.normalizedCategory)) {
          add('P2', 'categoria-cruzada', `${ref(clubId, year)} ${sec} "${l.rawLabel}": usa '${l.normalizedCategory}', que es una categoría de la OTRA taxonomía — suma bien al total, pero en Formato simplificado cae al catch-all`);
        } else {
          add('P0', 'categoria-inexistente', `${ref(clubId, year)} ${sec} "${l.rawLabel}": normalizedCategory '${l.normalizedCategory}' no existe en ninguna taxonomía`);
        }
      }
    }
  }

  // SONDA DE COMPORTAMIENTO (no análisis estático): se arma un club sintético con
  // UNA línea de gasto de cada categoría declarada y se le pregunta al motor real
  // cuánto de eso terminó sumando. Una categoría que existe en la taxonomía pero
  // que `computeYearGeneric()` no toca en ninguna rama hace desaparecer plata de
  // TODO el sitio en silencio (KPI Gastos, EBITDA, PAT, deuda, comparar gestiones).
  // Es exactamente el bug de la Versión 53 con las 3 categorías nuevas de Racing,
  // que se encontró de casualidad; esto lo encuentra siempre.
  // (to-do 339) por cada deporte con taxonomía: el club sintético lleva su `sport` (el motor lee la genérica y el bloque de SPORT_TAXONOMIES[sport]).
  const PROBE = '__sonda_de_auditoria__', YEAR = 9999;
  for (const [dep, cat] of Object.entries(api.SPORT_TAXONOMIES).flatMap(([d, t]) => Object.keys(t.expense).map(c => [d, c]))) {
    api.clubs[PROBE] = { id: PROBE, sport: dep };
    api.generic[PROBE] = {
      revenueLinesByYear: { [YEAR]: [] },
      expenseLinesByYear: { [YEAR]: [{ rawLabel: 'sonda', normalizedCategory: cat, amountNative: -100 }] },
      fiscalYearMeta: { [YEAR]: { currency: 'USD', fx: 1, reportType: 'official_balance_sheet' } },
    };
    const c = api.computeYearGeneric(PROBE, YEAR);
    const visto = c.expenses + c.nonCash + c.exceptionalItems;
    if (Math.abs(visto - (-100)) > 0.01) {
      add('P0', 'categoria-huerfana', `la taxonomía de ${dep} incluye '${cat}' (gasto) pero computeYearGeneric() no la suma en ninguna rama: la plata de esa categoría desaparece de todo cálculo del sitio`);
    }
    // to-do 248: la rama del motor donde cayó tiene que ser el bloque de su genérica (data/category-map.js), que es lo que publica el JSON.
    const rama = c.expenses === -100 ? 'operating' : c.nonCash === -100 ? 'non_cash' : c.exceptionalItems === -100 ? 'exceptional' : null;
    const gen = api.SPORT_TAXONOMIES[dep].expense[cat];
    const bloque = (api.GENERIC_EXPENSE_CATEGORIES.find(g => g.id === gen) || {}).block;
    if (rama && bloque && rama !== bloque) {
      add('P1', 'bloque-motor-distinto', `(${dep}) '${cat}' -> genérica '${gen}' (bloque ${bloque}), pero computeYearGeneric() la suma en ${rama}: el resultado que publica la capa genérica no coincide con el del sitio`);
    }
  }
  delete api.generic[PROBE]; delete api.clubs[PROBE];

  checkTaxonomiaGenerica(api);

  const enBucket = new Set([...api.REVENUE_BUCKETS, ...api.EXPENSE_BUCKETS].flatMap(b => b.cats));
  const fuera = [...api.REVENUE_CATEGORIES, ...api.EXPENSE_CATEGORIES].filter(c => !enBucket.has(c));
  if (fuera.length) {
    add('P3', 'categoria-sin-bucket', `Categorías sin fila propia en Formato simplificado (caen al catch-all, puede ser a propósito): ${fuera.join(', ')}`);
  }
}

// --- to-do 248: la capa genérica (data/category-map.js, SPORT_TAXONOMIES) -----------------------------------------------------
// taxonomia-incompleta (P1): una subcategoría sin genérica, una genérica que no existe o sin bloque, o una línea cargada cuyo par
// (lado, subcategoría) no está en el mapa: su JSON no se podría escribir (tools/json-datos.mjs exige el par).
// fila-parte-generica (P2): una genérica cuyas subcategorías caen en dos filas de Formato simplificado; la pantalla y la capa genérica
// dejarían de agrupar igual.
function checkTaxonomiaGenerica(api) {
  for (const [dep, tax] of Object.entries(api.SPORT_TAXONOMIES)) checkTaxonomiaDeporte(api, dep, tax);
}
function checkTaxonomiaDeporte(api, dep, tax) {
  const listas = api.SPORT_LISTS[dep];
  const lados = [
    ['ingreso', listas.revenue, tax.revenue, api.GENERIC_REVENUE_CATEGORIES, api.REVENUE_BUCKETS],
    ['gasto', listas.expense, tax.expense, api.GENERIC_EXPENSE_CATEGORIES, api.EXPENSE_BUCKETS],
  ];
  for (const [lado, subs, mapa, genericas, buckets] of lados) {
    const ids = new Set(genericas.map(g => g.id));
    for (const g of genericas) if (!['revenue', 'operating', 'non_cash', 'exceptional'].includes(g.block)) add('P1', 'taxonomia-incompleta', `genérica de ${lado} '${g.id}' con bloque '${g.block}'`);
    for (const sub of subs) if (!mapa[sub]) add('P1', 'taxonomia-incompleta', `la subcategoría de ${lado} '${sub}' (${dep}) no tiene genérica en SPORT_TAXONOMIES.${dep}`);
    for (const sub of Object.keys(mapa)) if (!subs.includes(sub)) add('P1', 'taxonomia-incompleta', `'${sub}' (${lado}, ${dep}) tiene genérica pero no está en la lista de subcategorías de ${dep} (sin descripción para Jev y Claude)`);
    for (const [sub, gen] of Object.entries(mapa)) if (!ids.has(gen)) add('P1', 'taxonomia-incompleta', `'${sub}' (${lado}) apunta a la genérica '${gen}', que no existe`);
    const filaDe = (sub) => (buckets.find(b => b.gens.includes(mapa[sub])) || {}).label || '(catch-all)';
    const filas = new Map();
    for (const [sub, gen] of Object.entries(mapa)) { if (!filas.has(gen)) filas.set(gen, new Set()); filas.get(gen).add(filaDe(sub)); }
    for (const [gen, f] of filas) if (f.size > 1) add('P2', 'fila-parte-generica', `la genérica de ${lado} '${gen}' cae en ${f.size} filas de Formato simplificado: ${[...f].join(' / ')}`);
  }
  // Una línea con una subcategoría del otro lado tiene genérica (la catch-all de su lado, genericCategoryOf); una que no existe ya es P0
  // (categoria-inexistente). Acá queda solo el caso de una subcategoría declarada en category-map.js que el mapa no resuelve.
  for (const { clubId, year, rev, exp } of clubYears(api)) {
    if (((api.clubs[clubId] || {}).sport || 'futbol') !== dep) continue; // (to-do 339) cada club con la taxonomía de su deporte
    for (const [lado, side, lines] of [['ingreso', 'revenue', rev], ['gasto', 'expense', exp]]) {
      for (const l of lines) {
        const declarada = listas.revenue.includes(l.normalizedCategory) || listas.expense.includes(l.normalizedCategory);
        if (declarada && !api.genericCategoryOf(dep, side, l.normalizedCategory)) add('P1', 'taxonomia-incompleta', `${ref(clubId, year)} ${lado} "${l.rawLabel}": la subcategoría '${l.normalizedCategory}' no tiene genérica`);
      }
    }
  }
}

// Vocabulario de deducción fiscal SOBRE INGRESOS, en los idiomas de los países
// ya cargados (pt-BR, es). No es una lista inventada para esta corrida: es la
// generalización de 20+ entradas ya verificadas a mano una por una en
// tools/audit-ignore.json (auditoría de tokens del 2026-09-26) y del propio
// CLAUDE.md/sección 6 ("Un ingreso negativo... casi siempre es legítimo:
// deducciones sobre a receita en Brasil"). Cada club brasileño nuevo trae 1-3
// líneas de este tipo (impuestos/contribuciones sobre la receita bruta, según
// exige la propia norma contable de allá) y hasta hoy cada una se volvía a
// investigar y a silenciar a mano — mismo texto, mismo motivo, un club distinto.
// SOLO cubre el lado INGRESO: del lado gasto los casos verificados son todos
// distintos entre sí (rateo de gastos, recuperación de costos, revalúos), así
// que ahí NO hay patrón que generalizar y siguen yendo a revisión caso a caso.
// Si aparece un caso nuevo que matchea el texto pero NO es una deducción fiscal
// real, la salida es la de siempre: agregarlo a mano a `tools/audit-ignore.json`
// no alcanza (ya está fuera del P2) — hay que angostar este regex.
const DEDUCCION_FISCAL_INGRESO_RE = /imposto|tribut[oaã]|dedu[çc][aã]o|deduc(ci[oó]n|tion)|reten[cç][ãa]o|retenci[oó]n|devolu(ç[ãa]o|ci[oó]n)|rebaja|encargos sobre receitas|ertragsminderung|dedu[çc]/i;
const esDeduccionFiscalIngresoConocida = label => DEDUCCION_FISCAL_INGRESO_RE.test(label || '');
// Un gasto positivo cuyo rótulo dice que es neto (reversión de provisiones, reducciones, pérdidas netas de recuperos) no es un signo dado
// vuelta: el rótulo ya lo explica (Auditora 4, 4ª corrida de P2 y P3). Solo el lado gasto.
// El formato abreviado belga imprime como único ingreso el margen bruto (Brutomarge, Marge brute): no es la cifra de negocios.
const MARGEN_BRUTO_RE = /brutomarge|marge brute|bruttomarge|gross margin/i;
const GASTO_NETO_RE = /revers[õo]es|redu[çc][õo]es|reprises|terugnemingen|perdas\//i;

// ¿El lado (ingreso o gasto) del ejercicio suma, con el signo de cada línea, el total oficial que imprime el documento? Misma tolerancia que checkTieOuts.
function cierraContraOficial(api, clubId, year, ym, sec) {
  const oficial = sec === 'ingreso' ? ym.officialTotalRevenue : ym.officialTotalExpenses;
  if (oficial == null) return false;
  const c = api.computeYearGeneric(clubId, year);
  const calculado = sec === 'ingreso' ? c.revenue : Math.abs(c.expenses + c.nonCash);
  const objetivo = sec === 'ingreso' ? oficial : Math.abs(oficial);
  return Math.abs(+(calculado - objetivo).toFixed(3)) < api.toleranciaTieOut(api.montosTieOut(c, sec === 'ingreso' ? 'revenue' : 'expenses'), objetivo);
}

// --- D6/D7/D8: higiene de las líneas ---------------------------------------
function checkLineas(api) {
  let signosMenores = 0;
  let deduccionesFiscalesConocidas = 0;
  for (const { clubId, year, ym, rev, exp } of clubYears(api)) {
    // Un ingreso negativo o un gasto positivo casi siempre es legítimo (deducciones
    // sobre la receita en Brasil, variación de existencias en España). Lo que NO es
    // normal es que una línea así pese: se reporta solo cuando supera el 2% de su
    // sección, y el resto se cuenta agregado al final para no tapar el informe.
    for (const [sec, lines, esperado] of [['ingreso', rev, 1], ['gasto', exp, -1]]) {
      const total = Math.abs(sum(lines)) || 1;
      for (const l of lines) {
        if (!l.amountNative || Math.sign(l.amountNative) === esperado) continue;
        const peso = Math.abs(l.amountNative) / total;
        if (peso > 0.02) {
          if (sec === 'ingreso' && esDeduccionFiscalIngresoConocida(l.rawLabel)) {
            deduccionesFiscalesConocidas++;
          } else if (sec === 'gasto' && GASTO_NETO_RE.test(l.rawLabel || '')) {
            // rótulo neto: no se marca (ver GASTO_NETO_RE)
          } else if (cierraContraOficial(api, clubId, year, ym, sec)) {
            // el lado cierra con el total que imprime el documento, con el signo de cada línea: un signo dado vuelta de verdad rompería ese tie-out
            // antes que este aviso (Auditora 5: 20 de 20 hallazgos mirados contra el documento eran netos reales)
          } else {
            // sin total oficial del lado no hay con qué comparar: P3, no P2
            add('P3', 'signo-invertido', `${ref(clubId, year)} ${sec} "${l.rawLabel}": ${l.amountNative} (${(peso * 100).toFixed(1)}% de la sección) — confirmar que es una deducción real y no un signo dado vuelta`);
          }
        } else {
          signosMenores++;
        }
      }
    }
    for (const [sec, lines] of [['ingreso', rev], ['gasto', exp]]) {
      const vistos = new Map();
      for (const l of lines) {
        // (to-do 237 aa) "Diferencia de redondeo" no es una copia pegada: verificar.mjs agrega una por cada nota que abre un renglón y
        // no suma exacto al centavo (±media unidad impresa), así que dos con el mismo ±0,001 son legítimas. Caso: Sporting 2017-18
        // (personal −0,001, provisiones −0,001, otros gastos +0,001, plantel +0,001), que la guarda revertía aunque los totales cierran.
        if (l.rawLabel === 'Diferencia de redondeo') continue;
        const prev = vistos.get(l.rawLabel);
        // Solo el MISMO monto (probable copia pegada). Con montos distintos es un falso positivo (la Auditora 4 lo sacó tras la primera corrida de P2 y P3): el mismo rótulo en dos notas o dos tramos es normal.
        if (prev != null && prev === l.amountNative) {
          add('P1', 'linea-duplicada', `${ref(clubId, year)} ${sec} "${l.rawLabel}": aparece dos veces con el MISMO monto (${l.amountNative}), probable copia pegada dos veces`);
        }
        vistos.set(l.rawLabel, l.amountNative);
      }
      // `items` es el desglose de control que se muestra en el acordeón: si no
      // suma su propia línea, el visitante ve un desglose que se contradice.
      for (const l of lines) {
        if (!Array.isArray(l.items) || !l.items.length) continue;
        // Se comparan MAGNITUDES: los `items` de un gasto se guardan en positivo y la
        // línea en negativo (convención del proyecto), así que comparar con signo daría
        // un falso positivo en todas las líneas de gasto desglosadas.
        const s = Math.abs(l.items.reduce((a, it) => a + (Array.isArray(it) ? (it[1] || 0) : 0), 0));
        const objetivo = Math.abs(l.amountNative);
        const tol = Math.max(0.011, objetivo * 0.005);
        if (Math.abs(s - objetivo) > tol) {
          add('P1', 'items-no-cierran', `${ref(clubId, year)} ${sec} "${l.rawLabel}": sus items suman ${+s.toFixed(3)} pero la línea dice ${objetivo} — el acordeón de control se contradice con su propia fila`);
        }
      }
    }
  }
  if (signosMenores) {
    add('P3', 'signos-menores', `${signosMenores} líneas con el signo opuesto al de su sección, todas por debajo del 2% del total (deducciones, variaciones de existencias y similares). Se listan solo las que pesan.`);
  }
  if (deduccionesFiscalesConocidas) {
    add('P3', 'dedu-fiscal-conocida', `${deduccionesFiscalesConocidas} línea(s) de ingreso con signo invertido cuyo texto matchea vocabulario de deducción fiscal ya verificado en otros clubes (imposto/tributo/dedução/retención/devolución) — no se listan una por una porque el patrón, no el club, ya está confirmado. Si alguna resulta NO ser una deducción real, angostar DEDUCCION_FISCAL_INGRESO_RE en tools/audit.js.`);
  }
}

// --- D9/D10/D11: moneda, escala y continuidad ------------------------------
function checkMoneda(api) {
  const porPais = {};
  const serie = {};
  const fueraDeBanda = [];
  let placeholdersSinFx = 0;

  for (const { clubId, year, ym, rev } of clubYears(api)) {
    const real = REPORT_TYPES_REALES.includes(ym.reportType);
    const nativa = (api.clubs[clubId] || {}).reportingCurrency;

    // OJO: `yearMetaFor()` sustituye un `fx: null` por el FX_RATE placeholder global
    // (1450), así que un fx ausente NO rompe la conversión — la hace aproximada y
    // callada, que es distinto. Por eso acá se mira el dato CRUDO (dónde falta el fx
    // del documento) y se reserva el ruido para los ejercicios reales: un placeholder
    // ya se le anuncia al visitante como tal.
    // "Crudo" pero resuelto (Versión 125): un ejercicio puede traer `fxRef` en vez de
    // `fx`, con el número en FX_CLOSE. Leer `ym.fx` a secas daría "sin fx" para los 33
    // que usan la tabla.
    const fxCrudo = api.fxMetaFor(ym).fx;
    if (real && fxCrudo == null) {
      add(ym.currency === 'USD' ? 'P2' : 'P1', 'fx-ausente', `${ref(clubId, year)}: ejercicio real (${ym.reportType}${ym.currency === 'USD' ? ', guardado en USD' : ' en ' + ym.currency}) sin fx propio — se convierte con el FX_RATE placeholder global (1450)${nativa && nativa !== 'USD' ? `, así que la vista en ${nativa} es un número inventado` : ''}`);
    }
    if (!real && fxCrudo == null && nativa && nativa !== 'USD' && sum(rev) !== 0) placeholdersSinFx++;
    if (real && fxCrudo === 1450) {
      add('P2', 'fx-placeholder', `${ref(clubId, year)}: ejercicio real con fx 1450, que es el placeholder global FX_RATE, no un tipo de cambio del documento`);
    }

    const revenue = sum(rev);
    if (revenue === 0) continue;
    // `yearMetaFor()` y no `ym` a secas: es la meta que usa el sitio para convertir
    // (la que aplica el fallback de fx). Auditar contra otra cosa sería auditar un
    // número que nadie ve.
    const usd = api.toDisplayValue(revenue, api.yearMetaFor(clubId, year), 'USD');
    if (!isFinite(usd) || usd <= 0) {
      add('P1', 'revenue-no-convertible', `${ref(clubId, year)}: revenue no se puede convertir a USD (da ${usd})`);
      continue;
    }
    // Banda absoluta ancha a propósito: agarra el error de escala (×1.000 por un
    // documento "expresado en miles") sin opinar sobre si un club es grande o
    // chico. Un club profesional del mundo real no factura 0,2 M USD ni 2.000 M.
    // (to-do 237 e) La decisión se toma después del recorrido (fueraDeBanda, abajo): hace falta la serie entera del club.
    if (usd < 0.2 || usd > 2000) fueraDeBanda.push({ clubId, year, usd });
    // Un tramo corto de transición (period_months < 12, Admin/CONVENCIONES-DATOS.md) no se compara con años de 12 meses: fuera de outlier-liga y salto-interanual.
    if ((ym.periodMonths || 12) < 12) continue;
    const pais =(api.clubs[clubId] || {}).country || '??';
    (porPais[pais] = porPais[pais] || []).push({ clubId, year, usd });
    (serie[clubId] = serie[clubId] || []).push({ year, usd, currency: ym.currency, soloMargenBruto: rev.filter((l) => l.amountNative).length === 1 && MARGEN_BRUTO_RE.test(rev.find((l) => l.amountNative).rawLabel || '') });
  }

  // ESCALA FUERA DE BANDA, CONFIRMADA POR EL AÑO VECINO (to-do 237 e). La banda frena a clubes chicos reales de tercera división (Alverca
  // 2022, 152.299,54 € ≈ US$ 0,16 M; Novorizontino 2015; Felgueiras 2021-22) y hasta acá cada uno pedía una entrada en audit-ignore.json.
  // Un error de escala (×1.000 por "en miles") salta contra los otros años del club; un club chico, no. COMPUERTA: otro ejercicio del club a
  // 2 años o menos está DENTRO de la banda y a menos de 20 veces de este -> P3 (aviso); si no, P0 como siempre.
  for (const x of fueraDeBanda) {
    const vecino = (serie[x.clubId] || []).find((o) => o.year !== x.year && Math.abs(Number(o.year) - Number(x.year)) <= 2 && o.usd >= 0.2 && o.usd <= 2000 && Math.max(o.usd, x.usd) / Math.min(o.usd, x.usd) < 20);
    // Con año vecino ya no se avisa: el club chico y real no pide nada y repetía el aviso en cada corrida (Auditora 5, sacada la rama P3).
    if (!vecino) add('P0', 'escala-implausible', `${ref(x.clubId, x.year)}: revenue = ${x.usd.toFixed(2)} M USD, fuera de toda banda plausible — sospechar error de escala (documento en miles) o fx equivocado`);
  }

  // Comparación entre pares de la misma liga: un tie-out no puede ver esto, porque
  // cada club cierra contra su propio documento.
  for (const [pais, list] of Object.entries(porPais)) {
    if (list.length < 4) continue;
    const vals = list.map(x => x.usd).sort((a, b) => a - b);
    const mediana = vals[Math.floor(vals.length / 2)];
    for (const x of list) {
      const ratio = x.usd / mediana;
      if (ratio > 25 || ratio < 1 / 25) {
        // Un error de escala salta contra los otros años del club; un club realmente chico o grande de su liga, no. Mismo criterio que
        // `escala-implausible` (arriba): otro ejercicio del club a 2 años o menos, dentro de la banda y a menos de 20 veces -> no se marca.
        // Sin ese año vecino queda como aviso P3, no P2 (Auditora 5): la mediana de una liga con pocos clubes cargados no alcanza para
        // afirmar un error. Un error de escala de verdad ya lo frena `escala-implausible` (P0) o la compuerta de carga.
        const hayVecino = (serie[x.clubId] || []).some((o) => o.year !== x.year && Math.abs(Number(o.year) - Number(x.year)) <= 2 && o.usd >= 0.2 && o.usd <= 2000 && Math.max(o.usd, x.usd) / Math.min(o.usd, x.usd) < 20);
        if (hayVecino) continue;
        add('P3', 'outlier-liga', `${ref(x.clubId, x.year)}: ${x.usd.toFixed(1)} M USD contra una mediana de ${mediana.toFixed(1)} M USD en ${pais} (${ratio > 1 ? ratio.toFixed(0) + '×' : '1/' + (1 / ratio).toFixed(0)}) — revisar que no sea escala`);
      }
    }
  }

  if (placeholdersSinFx) {
    add('P3', 'placeholders-con-fx-global', `${placeholdersSinFx} ejercicios placeholder/pending en USD sin fx propio: su vista en moneda nativa se calcula con el FX_RATE global (1450), que no corresponde al año. No afecta ningún ejercicio real.`);
  }

  for (const [clubId, años] of Object.entries(serie)) {
    años.sort((a, b) => a.year - b.year);
    for (let i = 1; i < años.length; i++) {
      const a = años[i - 1], b = años[i];
      const r = b.usd / a.usd;
      if (b.year - a.year > 2) continue; // una brecha de años no es un salto interanual (Westerlo 2015 a 2025)
      if (r > 5 || r < 1 / 5) {
        // el formato abreviado belga solo imprime el margen bruto, no la cifra de negocios: no es un error de unidad (Auditora 5)
        if (a.soloMargenBruto || b.soloMargenBruto) {
          add('P3', 'cambio-de-formato', `${clubId}: revenue pasa de ${a.usd.toFixed(1)} M USD (${a.year}) a ${b.usd.toFixed(1)} M USD (${b.year}) porque un año imprime solo el margen bruto y el otro la cifra de negocios — no son comparables`);
          continue;
        }
        add('P2', 'salto-interanual', `${clubId}: revenue salta de ${a.usd.toFixed(1)} M USD (${a.year}) a ${b.usd.toFixed(1)} M USD (${b.year}), ${r > 1 ? r.toFixed(1) + '×' : '/' + (1 / r).toFixed(1)} — confirmar que es real y no un error de unidad`);
      }
    }
  }
}

// --- D12/D13: señales de categorización enterrada --------------------------
// El bug de `lump_football_operations` (ver club-data-mapping) pasó los 16
// tie-outs de su ejercicio sin problema: el total cerraba, la plata estaba, solo
// estaba en el bucket equivocado. Estas 2 señales son las que lo delatan.
// --- D15: la liga de cada ejercicio (Versión 132) ---------------------------
// `data/club-leagues.js` dice en qué categoría jugó cada club cada ejercicio, y
// nace con todas las filas en `null` a propósito: null es "nadie lo verificó
// todavía". Esto cuenta lo que falta (para que el pendiente no dependa de que
// alguien se acuerde) y avisa si un ejercicio real no tiene ni siquiera su fila.
// --- CAJA Y DEUDA DESPROPORCIONADAS (to-do 260 e) ---------------------------
// Un techo por proporción con los ingresos del mismo año, solo hacia arriba: caja más de 3 veces los ingresos o deuda más de 20 veces es un
// error de escala o de fila, no un dato. Medido (2026-10-17) en lo cargado: el máximo real de caja es 2,53 veces (Atlético Mineiro 2023) y
// el de deuda 13,7 veces (Novorizontino 2015). Casos que frena (corrida de caja-deuda.mjs del 2026-10-16, revertidos a mano): Hellas
// Verona 2024 deuda 1,8e16; Milan 2009 deuda 163.739 M; Inter 2021 caja 97.884 M; Lazio 2008-2019. P1: caja-deuda.mjs y cargar.mjs
// revierten solos lo que lo pase. (to-do 260 a, aprobado por Guido el 2026-10-17) PISO de caja, el mismo de caja-deuda.mjs: menos de 7e-5
// veces los ingresos es una tabla en miles leída en unidades (Porto 2016 4,8e-5, Milan 2008 2e-5, Lazio 2001 1,5e-6). Las cajas chicas de
// verdad quedan arriba: Nottingham Forest 2024 1,0e-4 (29 mil £ con 290 M), Casa Pia 2025 1,5e-4. Sin piso de deuda: puede ser casi 0.
const TECHO_CAJA = 3; const TECHO_DEUDA = 20; const PISO_CAJA = 7e-5;
function checkCajaDeudaProporcion(api) {
  for (const { clubId, year, ym, rev } of clubYears(api)) {
    const ingresos = sum(rev); if (!(ingresos > 0)) continue;
    if (ym.cash != null && ym.cash > TECHO_CAJA * ingresos) add('P1', 'caja-deuda-desproporcionada', `${ref(clubId, year)}: caja ${ym.cash} es ${(ym.cash / ingresos).toFixed(1)} veces los ingresos del año (${ingresos.toFixed(3)}); el techo es ${TECHO_CAJA}: sospechar escala o fila equivocada`);
    if (ym.cash > 0 && ym.cash < PISO_CAJA * ingresos) add('P1', 'caja-deuda-desproporcionada', `${ref(clubId, year)}: caja ${ym.cash} es ${(ym.cash / ingresos).toExponential(1)} veces los ingresos del año (${ingresos.toFixed(3)}); el piso es ${PISO_CAJA}: sospechar una tabla en miles leída en unidades`);
    if (ym.grossDebt != null && ym.grossDebt > TECHO_DEUDA * ingresos) add('P1', 'caja-deuda-desproporcionada', `${ref(clubId, year)}: deuda ${ym.grossDebt} es ${(ym.grossDebt / ingresos).toFixed(1)} veces los ingresos del año (${ingresos.toFixed(3)}); el techo es ${TECHO_DEUDA}: sospechar escala o fila equivocada`);
  }
}

function checkLigasPorEjercicio(api) {
  const cob = api.clubLeagueCoverage ? api.clubLeagueCoverage() : null;
  if (!cob) return;

  const sinFila = [];
  for (const { clubId, year, ym } of clubYears(api)) {
    if (!REPORT_TYPES_REALES.includes(ym.reportType)) continue;
    const delClub = api.CLUB_LEAGUE_BY_YEAR[clubId];
    if (!delClub || !(year in delClub)) sinFila.push(ref(clubId, year));
  }
  if (sinFila.length) {
    add('P2', 'liga-sin-fila', `${sinFila.length} ejercicios reales sin fila en data/club-leagues.js (${sinFila.slice(0, 6).join(', ')}${sinFila.length > 6 ? '…' : ''}): al cargar un ejercicio hay que agregarle su fila, si no el selector no sabe en qué categoría se jugó`);
  }
  if (cob.faltan) {
    add('P3', 'liga-sin-verificar', `${cob.faltan} de ${cob.total} filas de data/club-leagues/<iso2>.js siguen en null, o sea sin verificar contra fuente`);
  }
}

// --- D16: los KB que la guía de arranque promete (Versión 171) --------------
// POR QUÉ ESTO ES UN CHEQUEO Y NO UN DETALLE COSMÉTICO. La tabla de
// `.claude/skills/start-session-finance-of-sports-project/SKILL.md` §1 existe
// para una sola cosa: que una sesión decida QUÉ ABRIR y qué no, antes de
// gastar el token de abrirlo. Un número 3 veces más chico que el archivo real
// hace exactamente lo contrario de lo que la tabla promete. Medido en la
// auditoría de docs del 2026-09-20: `club-sourcing` decía 33 KB y pesaba 91, y
// `Admin/CHANGELOG.md` decía 68 y pesaba 189 — los dos archivos que más conviene NO
// abrir de corrido, anunciados como si fueran livianos.
// Es P3 porque no rompe nada y no publica un número malo; sale igual en cada
// corrida porque el desfasaje vuelve solo (los docs crecen todas las sesiones).
// (Versión 546) checkPesoDocs() se borró: chequeaba los KB que la guía de arranque anotaba de cada
// documento, y Guido decidió sacar esos números de la guía para no tener que actualizarlos nunca más.

// --- D17: documentos internos que netlify.toml NO saca del deploy (V176) ----
// POR QUÉ ESTO ES UN CHEQUEO Y NO ALGO QUE SE MIRA A OJO. netlify.toml (Versión
// 173) explica su propia razón de ser con un caso real: `financeofsports.com/
// CLAUDE.md` devolvía 200 hasta que se armó el `rm` que lo saca del artefacto de
// deploy. Después hubo DOS casos más del mismo problema: la Versión 175 encontró
// `PROMPT-generador-indice-fuentes.md` (creado en la misma sesión que escribió la
// advertencia, nunca sumado a la lista), y la reorganización de la Versión 196
// encontró `COMO-CORRE-EL-PROYECTO.html` SERVIDO EN PRODUCCIÓN — un documento
// escrito para Guido, que este mismo chequeo no veía porque solo miraba `.md`.
// O sea: "acordate de agregarlo" ya falló tres veces.
//
// QUÉ VERIFICA DESDE LA VERSIÓN 196, que cambió la forma de excluir. Ya no hay una
// lista de nombres sueltos que mantener: los documentos internos viven todos en
// `Admin/` y sale una sola línea (`rm -rf Admin`). Así que son dos invariantes:
//   1. `Admin/` TIENE que estar cubierto por un `rm -rf` de netlify.toml. Si no,
//      se publica el proyecto entero por dentro. Eso es P1, no P2: no es un
//      archivo suelto que se escapa, son todos juntos.
//   2. Ningún documento suelto de la raíz (`.md` o `.html`) fuera de las páginas
//      del sitio. Su lugar es `Admin/`; la alternativa (sumarlo al `rm -f`) existe
//      pero es la que ya falló tres veces, así que el hallazgo empuja a mudarlo.
// El `.html` del punto 2 es la lección de `COMO-CORRE-EL-PROYECTO.html`: la
// extensión no dice nada sobre si un documento es para el visitante.
function checkDeployInterno() {
  const netlifyPath = path.join(ROOT, 'netlify.toml');
  if (!fs.existsSync(netlifyPath)) return;
  const toml = fs.readFileSync(netlifyPath, 'utf8');

  const excluidos = new Set();
  for (const m of toml.matchAll(/rm -f ([^\n|]+?)\s*\|\|\s*true/g)) {
    m[1].trim().split(/\s+/).forEach(f => excluidos.add(f));
  }
  const carpetasBorradas = new Set();
  for (const m of toml.matchAll(/rm -rf ([^\n|]+?)\s*\|\|\s*true/g)) {
    m[1].trim().split(/\s+/).forEach(d => carpetasBorradas.add(d.replace(/\/$/, '')));
  }

  // 1. La carpeta de documentos internos, entera.
  if (fs.existsSync(path.join(ROOT, 'Admin')) && !carpetasBorradas.has('Admin')) {
    add('P1', 'admin-no-excluido',
      'Admin/ existe pero netlify.toml no la saca del deploy: TODOS los documentos internos del proyecto quedarían servidos en financeofsports.com/Admin/... Sumá `rm -rf Admin || true` al command de netlify.toml');
  }

  // 2. Documentos sueltos en la raíz. Estas dos son las páginas del sitio, no
  //    documentación: son lo único que legítimamente vive acá con esta extensión.
  const PAGINAS_DEL_SITIO = new Set(['index.html', 'fuentes.html']);
  const sueltos = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isFile() && (d.name.endsWith('.md') || d.name.endsWith('.html')))
    .map(d => d.name).sort();

  for (const f of sueltos) {
    if (PAGINAS_DEL_SITIO.has(f) || excluidos.has(f)) continue;
    add('P2', 'doc-interno-no-excluido',
      `${f}: documento suelto en la raíz que netlify.toml no saca del deploy. Si es interno, movelo a Admin/ (no hay que tocar netlify.toml); si el contenido es para el visitante, dejá una entrada en tools/audit-ignore.json con el motivo`);
  }
}

// --- Las páginas de la raíz tienen que abrir como archivo (P1 index-file-roto) --------------------------------------------------------
// Un <base href="/"> en index.html rompió abrir el sitio suelto (file://): sin estilos ni scripts, y nadie lo vio. Las rutas las arma fosUrl() de js/i18n.js
// (Admin/PANTALLA.md, «Verificar en el browser de verdad»). En index.html y en cada .html suelto de la raíz: ninguna etiqueta <base> (ni escrita con document.write)
// y ningún src/href propio que empiece con «/» (los «//» externos y las #anclas valen). club/ y liga/ quedan fuera: se sirven solo detrás de Netlify.
function checkIndexFileRoto() {
  const htmls = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isFile() && d.name.endsWith('.html')).map(d => d.name).sort();
  for (const f of htmls) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
    const lineaDe = (i) => html.slice(0, i).split('\n').length;
    const base = html.match(/<base[\s>/]/i);
    if (base) add('P1', 'index-file-roto', `${f} (línea ${lineaDe(base.index)}): tiene una etiqueta <base> (o la escribe con document.write); rompe abrir el sitio como archivo (file://). Armá las rutas con fosUrl() de js/i18n.js`);
    const propios = [...html.replace(/<base\b[^>]*>/gi, m => ' '.repeat(m.length)).matchAll(/\b(?:src|href)\s*=\s*["']\/(?!\/)[^"']*/gi)];
    if (propios.length) add('P1', 'index-file-roto', `${f} (línea ${lineaDe(propios[0].index)}): ${propios.length} src/href propio(s) que empiezan con «/» (el primero: ${propios[0][0].replace(/\s+/g, '')}); no cargan al abrir el sitio como archivo (file://). Usá una ruta relativa o fosUrl()`);
  }
}

// --- El sponsor sin fuente lleva el registro de búsqueda (to-do 343, skill club-sourcing 0.5) -----------------------------------------------
// tools/contexto-manual.json: `sin-fuente.sponsor` solo vale como registro { buscado, por, intentos } con tres clases sin contar Wikipedia, o como { legacy: true, texto } de un club y
// año que están en tools/sponsor-legacy.json (la lista no crece). La compuerta de estadio-sponsor.mjs lo comprueba al cargar; esto no depende de que alguien la corra.
function checkSponsorBusqueda() {
  const f = path.join(ROOT, 'tools', 'contexto-manual.json');
  if (!fs.existsSync(f)) return;
  const { validar, listaLegacy } = require('./sponsor-busqueda.js');
  const manual = JSON.parse(fs.readFileSync(f, 'utf8')); const lista = listaLegacy();
  const malos = []; const fuera = []; let legacy = 0;
  for (const [club, anios] of Object.entries(manual)) {
    if (club.startsWith('_')) continue;
    for (const [anio, d] of Object.entries(anios)) {
      const v = d && d['sin-fuente'] && d['sin-fuente'].sponsor; if (v === undefined) continue;
      const r = validar(v, club, anio, lista);
      if (r.ok) { if (r.legacy) legacy++; } else if (v && v.legacy === true) fuera.push(`${club} ${anio}`); else malos.push(`${club} ${anio}: ${r.motivo}`);
    }
  }
  if (malos.length) add('P1', 'sponsor-sin-busqueda', `${malos.length} año(s) con sin-fuente.sponsor sin registro de búsqueda válido (skill club-sourcing 0.5): ${malos.slice(0, 3).join(' · ')}${malos.length > 3 ? ' · …' : ''}`);
  if (fuera.length) add('P1', 'sponsor-legacy-fuera-de-lista', `${fuera.length} año(s) con «legacy» que no están en tools/sponsor-legacy.json (la lista no crece; hay que hacer la búsqueda de la skill club-sourcing 0.5): ${fuera.slice(0, 5).join(', ')}`);
  if (legacy) add('P3', 'sponsor-sin-registro', `${legacy} año(s) con el sponsor sin fuente como texto libre de antes (tools/sponsor-legacy.json): completar con el registro de búsqueda cuando alguien toque el club`);
}

// --- Comentarios internos en lo que se publica (to-do 208 y 209) -------------
// Todo comentario de index.html, js/ y data/ viaja al visitante. La regla (Admin/PANTALLA.md, "Comentarios en lo que se publica") deja
// solo el porqué técnico: nada de nombres, "Versión N", "to-do N", fechas ni contadores de clubes. Un hallazgo por archivo, con el total y
// el primer caso; la lista completa sale con --json. Además, un data/<país>/<club>-data.js no lleva NINGÚN comentario (Admin/CONVENCIONES-DATOS.md):
// la evidencia de cada carga va a Admin/carga-clubes/<club>.md, y una nota de evidencia puede no tener nada que la regex reconozca.
const COMENTARIO_INTERNO = /\bGuido\b|\bVersi[oó]n(es)? \d+|\bto-do \d+|(?<!@)\b20\d\d-\d\d-\d\d\b|\b\d{2,} clubes\b/i;
function checkComentariosPublicados() {
  const { comentarios, publicados } = require('./comparar-sin-comentarios.js');
  const jsDe = dir => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(e => e.isDirectory() ? jsDe(dir + '/' + e.name) : e.name.endsWith('.js') ? [dir + '/' + e.name] : []);
  for (const rel of [...publicados(), ...jsDe('data')]) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // La cabecera fija que pone tools/generar-data.mjs ("GENERADO desde … no editar a mano") es el único comentario que un data file lleva.
    const todos = comentarios(rel, src).filter(c => !/^GENERADO desde data\/[a-z]{2}\/[a-z0-9-]+\.json por tools\/generar-data\.mjs/.test(String(c.text).trim().replace(/^\/\/\s*/, '')));
    if (/^data\/(?:[a-z]{2}\/)?[^/]+-data\.js$/.test(rel) && todos.length) {
      add('P2', 'comentario-en-data-club',
        `${rel}: ${todos.length} comentarios (el primero en la línea ${todos[0].line}). Un data/<país>/<club>-data.js no lleva comentarios: la nota va a Admin/carga-clubes/<club>.md (regla: Admin/CONVENCIONES-DATOS.md)`);
    }
    const malos = todos.filter(c => COMENTARIO_INTERNO.test(c.text));
    if (!malos.length) continue;
    const primero = malos[0].text.match(COMENTARIO_INTERNO)[0];
    add('P2', 'comentario-interno-publicado',
      `${rel}: ${malos.length} comentarios con historia interna que ve el visitante (el primero en la línea ${malos[0].line}: «${primero}»). Regla: Admin/PANTALLA.md, "Comentarios en lo que se publica"; limpiar con node tools/comparar-sin-comentarios.js`);
  }
}

// --- D17b: el párrafo que explica netlify.toml, copiado en 3 archivos, con -
//     números que se desincronizan (auditoría de docs, 2026-09-26) ----------
// POR QUÉ. `CLAUDE.md`, `Admin/ESTADO.md` y `Admin/CONVENCIONES.md` explican los
// tres la misma mecánica de netlify.toml ("YA NO ES CIERTO DESDE EL 2026-09-20:
// AHORA SÍ HAY netlify.toml...") con el mismo párrafo copiado a mano, y cada uno
// nombra cuántas páginas `fuentes/<clubId>.html` se publican y cuántas notas
// `fuentes/**/*.md` quedan afuera del deploy. Un crecimiento de clubes actualiza
// esos números en UN archivo (el que tocó la sesión que cargó el club) y dos
// quedan atrás — encontrado de verdad el 2026-09-26: `CONVENCIONES.md` seguía
// diciendo "41 páginas" / "613 notas" mientras `CLAUDE.md` ya decía 161/655.
// QUÉ VERIFICA: en cada archivo que tenga el párrafo, que sus dos números
// coincidan con el conteo real de `fuentes/*.html` y `fuentes/**/*.md`.
function checkParrafoNetlifyDuplicado() {
  const ARCHIVOS = ['CLAUDE.md', 'Admin/ESTADO.md', 'Admin/CONVENCIONES.md'];
  const ANCLA = 'AHORA SÍ HAY `netlify.toml`';
  let realPaginas = 0, realNotas = 0;
  try {
    realPaginas = fs.readdirSync(path.join(ROOT, 'fuentes')).filter(f => f.endsWith('.html')).length;
  } catch (e) { return; }
  const contarMd = (dir) => {
    let n = 0;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) n += contarMd(path.join(dir, e.name));
      else if (e.name.endsWith('.md')) n++;
    }
    return n;
  };
  try { realNotas = contarMd(path.join(ROOT, 'fuentes')); } catch (e) { /* sin fuentes/, no aplica */ }

  for (const rel of ARCHIVOS) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const texto = fs.readFileSync(abs, 'utf8');
    const idx = texto.indexOf(ANCLA);
    if (idx === -1) continue; // este archivo no (más) tiene el párrafo — no es un error
    const parrafo = texto.slice(idx, idx + 600);
    const mPaginas = parrafo.match(/Las (\d+) páginas/);
    const mNotas = parrafo.match(/las (\d+) notas/);
    if (mPaginas && Number(mPaginas[1]) !== realPaginas) {
      add('P2', 'doc-parrafo-netlify-desfasado',
        `${rel}: el párrafo de netlify.toml dice "${mPaginas[1]} páginas fuentes/<clubId>.html" pero hoy hay ${realPaginas} — mismo párrafo copiado en ${ARCHIVOS.join(', ')}, actualizalo en los 3`);
    }
    if (mNotas && Number(mNotas[1]) !== realNotas) {
      add('P2', 'doc-parrafo-netlify-desfasado',
        `${rel}: el párrafo de netlify.toml dice "${mNotas[1]} notas de fuentes/**/*.md" pero hoy hay ${realNotas} — mismo párrafo copiado en ${ARCHIVOS.join(', ')}, actualizalo en los 3`);
    }
  }
}

// --- D18: rutas de archivo que ya no existen (Versión 198, to-do 46) --------
// POR QUÉ. La reorganización de la Versión 196 movió 11 documentos y actualizó 203
// referencias en 31 archivos. Esa verificación se hizo con un script de una sola
// corrida, y una sola referencia olvidada manda a una sesión futura a un archivo que
// no está, sin que nada se queje. No es hipotético: este chequeo, la primera vez que
// corrió, encontró 44 archivos (`Admin/sourcing/_indice/<País>.md`, uno por país) que
// seguían linkeando el viejo fuentes-por-club.md, renombrado a `Admin/sourcing/README.md` dos
// versiones antes. El barrido a mano no los había mirado.
//
// QUÉ MIRA. Solo archivos VIVOS: los que una sesión lee para saber qué hacer. Quedan
// afuera a propósito `Admin/CHANGELOG.md`, `Admin/finance-of-sports-project.md`,
// `Admin/Archive/`, `auditorias/` y `Prototyping/`, que son HISTORIA: una entrada de
// septiembre que nombra `ESTADO.md` era verdad el día que se escribió, y "corregirla"
// sería falsear el registro.
//
// DOS FORMAS DE NOMBRAR UN ARCHIVO, y las dos se chequean: la ruta entre backticks
// (`data/clubs.js`) y el destino de un link Markdown, que se resuelve relativo a su
// propio archivo — que es justo como estaban escritos los 44 de arriba.
//
// LO QUE NO PUEDE DISTINGUIR SOLO, y por eso hay entradas en audit-ignore.json: este
// proyecto documenta lo que BORRÓ tanto como lo que tiene ("comparar-clubes.js ya no
// existe", "no hay un archivo de idioma para el castellano porque es el idioma fuente").
// Una ruta nombrada para decir que NO está se ve igual que un puntero roto. Se probó
// detectar la negación por contexto y cubría 5 de 7 casos: un chequeo que acierta a
// veces es peor que uno estricto, porque no sabés en cuál de los dos estás parado. La
// decisión va a mano, con el motivo escrito, como el resto de audit-ignore.json.
const RUTA_EN_TEXTO = /^[A-Za-z0-9_][A-Za-z0-9_./-]*\.(md|js|html|json|toml|xml)$/;

// Los .md de .claude/skills/, a cualquier profundidad, con su ruta relativa a la raíz.
function mdsDeSkills() {
  const out = [];
  (function walk(d) {
    let entradas;
    try { entradas = fs.readdirSync(path.join(ROOT, d), { withFileTypes: true }); } catch { return; }
    for (const e of entradas) {
      const rel = `${d}/${e.name}`;
      if (e.isDirectory()) walk(rel); else if (e.name.endsWith('.md')) out.push(rel);
    }
  })('.claude/skills');
  return out.sort();
}

function archivosVivos() {
  const hay = rel => fs.existsSync(path.join(ROOT, rel));
  const dir = (d, filtro) => {
    try {
      return fs.readdirSync(path.join(ROOT, d)).filter(filtro).map(n => `${d}/${n}`);
    } catch { return []; }
  };
  const js = n => n.endsWith('.js');
  return [
    'CLAUDE.md', 'index.html', 'netlify.toml', 'Admin/sourcing/README.md',
    ...dir('js', js), ...dir('tools', n => js(n) || n.endsWith('.json')),
    ...dir('data', js), ...dir('data/lang', js),
    ...dir('data/club-leagues', js), ...dir('data/rankings', js),
    // Todos los .md de las skills (to-do 327, C-10): paises/, referencia/, worktree.md… no solo cada SKILL.md.
    ...mdsDeSkills(),
    // Admin/ menos los dos históricos. Archive/ no entra: es una subcarpeta.
    ...dir('Admin', n => n.endsWith('.md') || n.endsWith('.html'))
      .filter(f => !/CHANGELOG\.md$|finance-of-sports-project\.md$/.test(f)),
    ...dir('Admin/sourcing/_indice', n => n.endsWith('.md')),
  ].filter(hay);
}

// Todo path real del repo, y todos sus sufijos: una mención abreviada como
// `club-data-mapping/SKILL.md` (sin el `.claude/skills/` adelante) es legítima y no
// tiene que dar hallazgo.
function sufijosDelRepo() {
  const todos = [];
  (function walk(d) {
    let entradas;
    try { entradas = fs.readdirSync(path.join(ROOT, d || '.'), { withFileTypes: true }); }
    catch { return; }
    for (const e of entradas) {
      const rel = d ? `${d}/${e.name}` : e.name;
      if (e.name === '.git' || e.name === 'node_modules') continue;
      if (e.isDirectory()) walk(rel); else todos.push(rel);
    }
  })('');
  const sufijos = new Set();
  for (const p of todos) {
    const partes = p.split('/');
    for (let i = 0; i < partes.length; i++) sufijos.add(partes.slice(i).join('/'));
  }
  return sufijos;
}

function checkRutasMuertas() {
  const sufijos = sufijosDelRepo();
  const porRuta = new Map();
  const anotar = (ruta, archivo) => {
    if (!porRuta.has(ruta)) porRuta.set(ruta, new Set());
    porRuta.get(ruta).add(archivo);
  };

  for (const f of archivosVivos()) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');

    for (const m of src.matchAll(/`([^`\n]{1,120})`/g)) {
      const t = m[1].trim();
      if (!RUTA_EN_TEXTO.test(t)) continue;          // deja afuera prosa, globs, <placeholders>, ${interpolaciones}
      const primero = t.split('/')[0];
      if (t.includes('/') && primero.includes('.') && !primero.startsWith('.')) continue;  // financeofsports.com/algo: es una URL
      if (!sufijos.has(t)) anotar(t, f);
    }

    // Links Markdown con destino relativo. Se resuelven desde la carpeta del archivo
    // que los contiene, no desde la raíz.
    if (!f.endsWith('.md')) continue;
    for (const m of src.matchAll(/\]\(([^)\s]+)\)/g)) {
      const destino = m[1].split('#')[0];
      if (!destino || /^(https?:|mailto:|#|\/)/.test(destino)) continue;
      if (!RUTA_EN_TEXTO.test(destino.replace(/^(\.\.?\/)+/, ''))) continue;
      const abs = path.resolve(path.dirname(path.join(ROOT, f)), destino);
      if (!fs.existsSync(abs)) anotar(`${destino} (link)`, f);
    }
  }

  // UNA RUTA GITIGNOREADA NO CUENTA (Versión 200). Su presencia no es una propiedad
  // del repo sino de ESTE checkout: `Clubes/Argentina/River/estados-contables-leads/`
  // (la fuente no oficial, que se guarda y no se trackea) está en el árbol principal y
  // NO en un worktree recién creado, así que el data file de River citándola daba
  // hallazgo en un lado y no en el otro. Peor que ruidoso: empujaba a "arreglar" el
  // comentario de un archivo de club que estaba bien. Lo destapó el worktree de
  // sourcing, que nace sin ninguno de los 2881 PDFs ni de los archivos ignorados.
  const candidatas = [...porRuta.keys()].filter(r => !r.endsWith(' (link)'));
  if (candidatas.length) {
    try {
      const salida = execFileSync('git', ['check-ignore', '--', ...candidatas],
        { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      for (const linea of salida.split('\n')) if (linea.trim()) porRuta.delete(linea.trim());
    } catch (e) {
      // exit 1 = ninguna está ignorada, que es el caso normal. Cualquier otro error
      // (sin git, sin repo) deja el chequeo como estaba: estricto.
    }
  }

  for (const [ruta, archivos] of [...porRuta].sort((a, b) => b[1].size - a[1].size)) {
    const lista = [...archivos].sort();
    const muestra = lista.slice(0, 3).join(', ') + (lista.length > 3 ? `, +${lista.length - 3} más` : '');
    add('P2', 'ruta-muerta',
      `\`${ruta}\`: no existe, y lo nombran ${lista.length} archivo(s) vivo(s) (${muestra}). Si se renombró, actualizá la referencia; si se nombra para decir que NO existe, dejá una entrada en tools/audit-ignore.json con el motivo`);
  }
}

// --- HISTORIA EN LOS DOCUMENTOS DE CRITERIO (to-do 327, C-9) -----------------
// Las skills, CLAUDE.md y los documentos de criterio dicen cómo se trabaja y qué hay HOY: sin «Versión N», sin fechas de decisión y
// sin «to-do N» (eso va a Admin/CHANGELOG.md y Admin/TODO.md; ver CLAUDE.md, «Al empezar»). P3: es la lista de limpieza, no una alarma.
// No mira contadores fijos («58 clubes»): el patrón da falsos positivos y no se midió su precisión.
const DOCS_DE_CRITERIO = ['CLAUDE.md', 'Admin/ESTADO.md', 'Admin/PIPELINE.md', 'Admin/CONVENCIONES.md', 'Admin/CONVENCIONES-DATOS.md', 'Admin/PANTALLA.md'];
const HISTORIA_EN_DOCS = [
  ['version', /\bVersi[óo]n \d+/g, '«Versión N»'],
  ['fecha', /\b20\d\d-\d\d-\d\d\b/g, 'fechas AAAA-MM-DD'],
  ['todo', /\bto-?dos? (?:n[°º] ?)?\d{2,3}\b/gi, '«to-do N»'],
];

function checkHistoriaEnDocs() {
  const archivos = [...DOCS_DE_CRITERIO, ...mdsDeSkills()].filter(f => fs.existsSync(path.join(ROOT, f)));
  for (const [clave, re, nombre] of HISTORIA_EN_DOCS) {
    const porArchivo = new Map();
    const primera = new Map();   // la primera línea con el patrón: dónde empezar a limpiar
    for (const f of archivos) {
      const texto = fs.readFileSync(path.join(ROOT, f), 'utf8');
      const n = (texto.match(re) || []).length;
      if (!n) continue;
      porArchivo.set(f, n);
      primera.set(f, texto.slice(0, texto.search(re)).split('\n').length);
    }
    if (!porArchivo.size) continue;
    const total = [...porArchivo.values()].reduce((a, b) => a + b, 0);
    const top = [...porArchivo].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([f, n]) => `${f}:${primera.get(f)} (${n})`).join(', ');
    add('P3', 'historia-en-doc-de-criterio', `${nombre}: ${total} en ${porArchivo.size} documentos de criterio (skills, CLAUDE.md, ESTADO, PIPELINE, CONVENCIONES*, PANTALLA); los que más (archivo:primera línea): ${top}. Esos documentos dicen qué hay HOY: la historia va a Admin/CHANGELOG.md y los pendientes a Admin/TODO.md`);
  }
}

// --- PÁRRAFOS REPETIDOS ENTRE DOCUMENTOS VIVOS (to-do 327, C-11) -------------
// Una regla escrita en dos lugares se desincroniza: es lo que ensució las skills antes de la consolidación del 255. Compara párrafos de
// 200 caracteres o más (normalizados) entre CLAUDE.md, las skills y los Admin/*.md de primer nivel. Las subcarpetas de Admin/ (plantillas
// por país o por club, instrucciones de tandas, archivo) repiten texto a propósito y quedan afuera. P3.
const PARRAFO_MIN = 200;
const PARRAFO_SIMILITUD = 0.8;   // de las ventanas de 6 palabras del párrafo más corto, la fracción que está en el otro

function checkParrafosRepetidos() {
  const archivos = ['CLAUDE.md', ...mdsDeSkills(),
    ...fs.readdirSync(path.join(ROOT, 'Admin')).filter(f => f.endsWith('.md') && !/^(CHANGELOG|TODO|ESTADO-clubes)\.md$/.test(f)).sort().map(f => `Admin/${f}`)]
    .filter(f => fs.existsSync(path.join(ROOT, f)));
  const norm = s => s.toLowerCase().replace(/[`*_>#|-]/g, ' ').replace(/\s+/g, ' ').trim();
  const parrafos = [];
  for (const f of archivos) {
    for (const p of fs.readFileSync(path.join(ROOT, f), 'utf8').split(/\n\s*\n/)) {
      const n = norm(p);
      if (n.length < PARRAFO_MIN) continue;
      const w = n.split(' ');
      const ventanas = new Set();
      for (let i = 0; i + 6 <= w.length; i++) ventanas.add(w.slice(i, i + 6).join(' '));
      parrafos.push({ f, n, ventanas });
    }
  }
  const pares = [];
  for (let i = 0; i < parrafos.length; i++) {
    for (let j = i + 1; j < parrafos.length; j++) {
      const a = parrafos[i], b = parrafos[j];
      if (a.f === b.f) continue;
      const [chico, grande] = a.ventanas.size <= b.ventanas.size ? [a, b] : [b, a];
      let comunes = 0;
      for (const v of chico.ventanas) if (grande.ventanas.has(v)) comunes++;
      if (chico.ventanas.size && comunes / chico.ventanas.size >= PARRAFO_SIMILITUD) pares.push(`${a.f} ~ ${b.f}: «${a.n.slice(0, 60)}…»`);
    }
  }
  for (const par of pares) {
    add('P3', 'parrafo-repetido', `${par}. El mismo texto (≥${PARRAFO_MIN} caracteres) en dos documentos vivos: dejalo en uno y en el otro poné un puntero`);
  }
}

// --- RAYA LARGA EN EL TEXTO VISIBLE (to-do 327, C-12) -------------------------
// Regla de estilo de Admin/CONVENCIONES.md: ni un em dash (—, U+2014) en el texto que ve el visitante. Mira data/lang/, js/, las páginas
// .html de la raíz y las generadas (club/, liga/). Sin comentarios (JS y HTML) ni <script>/<style>. Permitido: «—» como símbolo de
// «sin dato» (solo entre comillas, solo en una celda `>—<` o como leyenda `— = …`). No mira data/<país>/*.js: ahí un «—» es el texto
// literal de un rubro del documento (rawLabel) y no se reescribe.
// P2 y no P3: el visitante lo lee.
function rayasLargasVisibles() {
  const lista = (d, ext) => { const out = []; (function walk(r) {
    let es; try { es = fs.readdirSync(path.join(ROOT, r), { withFileTypes: true }); } catch { return; }
    for (const e of es) { const rel = `${r}/${e.name}`; if (e.isDirectory()) walk(rel); else if (rel.endsWith(ext)) out.push(rel); }
  })(d); return out; };
  const archivos = [...lista('data/lang', '.js'), ...lista('js', '.js'), ...lista('club', '.html'), ...lista('liga', '.html'),
    ...fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))];
  const SIMBOLO = /(["'`“”‘’])—\1|[“"'`]—[”"'`]|>\s*—\s*<|["'`“>]\s*—\s*=/g;
  const hallazgos = [];
  for (const f of archivos) {
    const vacia = m => m.replace(/[^\n]/g, '');
    let s = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (f.endsWith('.html')) s = s.replace(/<!--[\s\S]*?-->/g, vacia).replace(/<script[\s\S]*?<\/script>/g, vacia).replace(/<style[\s\S]*?<\/style>/g, vacia);
    else s = s.replace(/\/\*[\s\S]*?\*\//g, vacia).split('\n').map(l => l.replace(/(^|\s)\/\/.*$/, '$1')).join('\n');
    s.replace(SIMBOLO, '').split('\n').forEach((l, i) => { if (l.includes('—')) hallazgos.push(`${f}:${i + 1}`); });
  }
  return hallazgos;
}

function checkRayaLarga() {
  const hallazgos = rayasLargasVisibles();
  if (!hallazgos.length) return;
  add('P2', 'raya-larga-visible', `${hallazgos.length} línea(s) del texto visible del sitio con raya larga (—): ${hallazgos.slice(0, 8).join(', ')}${hallazgos.length > 8 ? ', …' : ''}. Regla de estilo de Admin/CONVENCIONES.md: punto, coma, dos puntos o paréntesis. Solo se permite «—» entre comillas como símbolo de «sin dato»`);
}

// --- D19: TODO LO GENERADO, AL DÍA (Versión 183) ---------------------------
// El proyecto tiene 6 generadores (estos 5 tienen --check; el sexto es generate-como-corre-stats.js) y dependen de que alguien se acuerde de
// correrlos. "Acordate" ya falló antes acá (ver `checkDeployInterno`), y esta
// sesión encontró el caso más silencioso de todos: `generate-fuentes-page.js`
// LEE `ASSET_V` de index.html y lo escribe en las 42 páginas de fuentes, así que
// cualquier subida de ASSET_V las desactualiza a todas — sin tocar un solo dato,
// sin que nada se vea roto, y dejando al visitante con el JS nuevo en el sitio y
// el viejo de su caché en la página de fuentes, que es EXACTAMENTE el estado en
// el que la Versión 125 tiró `ReferenceError` en toda la página.
//
// Cuesta 0,2s para los 4 (cada uno levanta su propio proceso). Medido.
//
// P1 y no P2: lo que queda desfasado está PUBLICADO. Un `data/rankings/` viejo
// publica el ingreso de un club con el balance del año pasado; una página de
// fuentes vieja pide un asset que ya no existe; un Admin/ESTADO-clubes.md
// viejo le miente a la próxima sesión sobre qué hay cargado.
const GENERADORES = [
  ['generate-rankings.js',      'data/rankings/',                      'rankings-desfasado'],
  ['generate-fuentes-page.js',  'fuentes.html y sus páginas de club', 'fuentes-desfasada'],
  ['generate-club-pages.js',    'club/, liga/ y sitemap.xml (links propios con tarjeta, to-do 241)', 'club-pages-desfasado'],
  ['generate-club-index.js',    'Admin/ESTADO-clubes.md (generado)',         'club-index-desfasado'],
  ['generate-fuentes-index.js', 'el índice de Admin/sourcing/README.md',    'fuentes-indice-desfasado'],
  ['faltantes-liga.mjs',        'data/faltantes/ y Admin/sourcing/pendientes.md', 'faltantes-desfasado'], // to-do 266: cambia con cada carga y cada sourcing
  ['auditoria.mjs',             'data/auditoria/ (quién audita cada balance, to-do 282)', 'auditoria-desfasado'],
  ['entidades.mjs',             'data/entidades/ (estructura de cada club, to-do 280)', 'entidades-desfasado'],
  ['estimar.mjs',               'data/estimados/ (y ningún estimado al lado de un año real)', 'estimados-desfasado'], // to-do 270; sin la carpeta, no chequea
  ['generate-sponsors.js',      'data/sponsors.js (sponsors y marcas de cada liga)', 'sponsors-desfasado'], // to-do 273; une equipos a clubes del sitio
  ['generar-data.mjs',          'los data/<país>/<id>-data.js (se generan de su JSON: nunca a mano)', 'json-js-desfasado'], // to-do 245: el JSON es la fuente
  ['validar-esquema-json.mjs',  'el JSON de algún club (no valida contra data/schema/club-v2.json)', 'json-no-valida'],
  ['generar-correcciones.mjs',  'data/correcciones/ (el registro público de correcciones, to-do 247)', 'correcciones-desfasado'],
];
function checkGenerados() {
  for (const [script, que, code] of GENERADORES) {
    if (!fs.existsSync(path.join(ROOT, 'tools', script))) continue;
    try {
      execSync(`node tools/${script} --check`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      const detalle = String(e.stderr || e.stdout || '').trim().replace(/\s*\n\s*/g, ' ').slice(0, 220);
      // faltantes-liga.mjs --check (Auditora 5): 2 = las entradas no cambiaron pero se calculó hace más de 30 días; 3 = solo faltan en este worktree los enlaces a PDF (corré preparar). Ninguno de los dos
      // es un dato roto que el visitante vea: P3, para que ni el calendario ni un worktree sin preparar frenen commits ajenos. Con 1 (cambiaron las entradas) sigue siendo P1.
      if (script === 'faltantes-liga.mjs' && (e.status === 2 || e.status === 3)) add('P3', code, `${que}: ${detalle || (e.status === 3 ? 'corré node tools/worktree.mjs preparar .' : 'regenerá: node tools/faltantes-liga.mjs')}`);
      else add('P1', code, `${que} quedó desactualizado. Corré: node tools/${script}${detalle ? ' — ' + detalle : ''}`);
    }
  }
  // LA LISTA QUE CORRE Y LA QUE SE VERIFICA TIENEN QUE SER LA MISMA: un generador que audit.js verifica como P1 y que `publicarCambios()` (tools/generadores.mjs) no corre deja desfasada su salida
  // en cada carga, y la carga se revierte entera (caso FC Volendam, faltantes-liga y estimar). generar-data lo corre publicar.mjs aparte y validar-esquema-json no genera nada.
  try {
    const corre = [...fs.readFileSync(path.join(ROOT, 'tools/generadores.mjs'), 'utf8').matchAll(/'tools\/([^']+)'/g)].map((m) => m[1]);
    const sinCorrer = GENERADORES.map((g) => g[0]).filter((s) => !corre.includes(s) && !['generar-data.mjs', 'validar-esquema-json.mjs'].includes(s));
    if (sinCorrer.length) add('P2', 'generador-sin-correr', `audit.js verifica ${sinCorrer.join(', ')} pero tools/generadores.mjs no lo corre al cerrar una carga: una carga que lo deje viejo se revierte. Sumalo a la lista de tools/generadores.mjs`);
  } catch { /* sin generadores.mjs: otro chequeo lo dice */ }
  // el índice de documentos (Admin/INDICE-md.md) no frena un commit: P3
  try { execSync('node tools/indice-md.mjs --check', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { add('P3', 'indice-md-desfasado', 'Admin/INDICE-md.md quedó desactualizado (se creó, movió o borró un .md). Corré: node tools/indice-md.mjs'); }
}

// to-do 247: un commit que corrige un dato publicado (importe, categoría, filas, totales, caja/deuda, moneda, fuente, perímetro) lleva el trailer
// `Corrige: <motivo en una frase>` (o una línea en Admin/registros/correcciones.jsonl). Sin eso el registro público dice «Motivo no registrado».
function checkCorreccionesSinMotivo() {
  if (!fs.existsSync(path.join(ROOT, 'tools/generar-correcciones.mjs'))) return;
  try {
    const lista = JSON.parse(execSync('node tools/generar-correcciones.mjs --sin-motivo', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 26 }).toString());
    for (const { commit, clubs } of lista) add('P2', 'correccion-sin-motivo', `el commit ${commit} corrige datos publicados (${clubs.slice(0, 4).join(', ')}${clubs.length > 4 ? `, +${clubs.length - 4} más` : ''}) sin trailer \`Corrige:\` ni línea en Admin/registros/correcciones.jsonl: el registro público dirá «Motivo no registrado»`);
  } catch (e) { /* si el generador falla, lo dice correcciones-desfasado */ }
}

// --- D18: los rankings precalculados (Versión 182, to-dos 23(c) y 33) ------
// POR QUÉ ESTE CHEQUEO ES LA CONDICIÓN PARA QUE `data/rankings/` PUEDA EXISTIR.
// Ese directorio es lo único del proyecto que guarda NÚMEROS DE PLATA copiados
// de otro lado: `data/club-index.js` también es generado, pero copia metadatos
// (cuántos ejercicios, cuál es el más nuevo), y un metadato desactualizado se
// nota. Un INGRESO desactualizado no se nota: se publica, en la portada, con
// pinta de verificado. O sea que `data/rankings/` es una segunda verdad sobre
// exactamente lo que el sitio existe para no equivocar.
//
// El seguro es que no se pueda pushear con el archivo viejo. Por eso es P1 y no
// P2, y por eso `audit.js` no reimplementa la comparación: le PREGUNTA AL
// GENERADOR (`--check`), que es el único que sabe qué debería decir cada
// archivo. Dos implementaciones de la misma cuenta serían el problema otra vez,
// un escalón más arriba.
//
// Cuesta ~1s más que el resto de la auditoría porque el generador vuelve a
// levantar el motor en su propio proceso. Es barato al lado de publicar el
// ingreso de un club con el balance del año pasado.
function checkRankings(api) {
  const dir = path.join(ROOT, 'data/rankings');
  if (!fs.existsSync(dir)) {
    add('P1', 'rankings-sin-generar',
      'data/rankings/ no existe: la pestaña Ligas y los rankings de Inicio no tienen de dónde leer. Corré: node tools/generate-rankings.js');
    return;
  }


  // LA LISTA CURADA DE INICIO (`data/destacados.js`). Es el único archivo de
  // esta feature que se edita a mano, así que es el único que puede apuntar a
  // algo que ya no existe: se borra un club, cambia una membresía, y el bloque
  // de la portada queda vacío o con un ranking de uno. El archivo no puede
  // chequearse solo, así que lo chequea esto.
  const destacadosPath = path.join(ROOT, 'data/destacados.js');
  if (!fs.existsSync(destacadosPath)) {
    add('P1', 'destacados-sin-archivo',
      'Falta data/destacados.js: Inicio no sabe qué rankings mostrar');
    return;
  }

  const sandbox = { console };
  sandbox.window = sandbox;
  const ctx = vm.createContext(sandbox);
  try {
    vm.runInContext(fs.readFileSync(destacadosPath, 'utf8'), ctx, { filename: 'data/destacados.js' });
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
      vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: 'data/rankings/' + f });
    }
  } catch (e) {
    add('P1', 'rankings-no-cargan', `data/destacados.js o data/rankings/*.js no se pueden evaluar: ${e.message}`);
    return;
  }

  const destacados = sandbox.DESTACADOS || [];
  const rankings = sandbox.RANKINGS || {};

  // "Hasta 10" es la decisión de Guido del 2026-09-22, y es editorial: una
  // portada con 20 rankings deja de ser una vidriera. P2 porque nada está MAL,
  // simplemente dejó de cumplirse el criterio con el que se diseñó la pantalla.
  if (destacados.length > 10) {
    add('P2', 'destacados-de-mas',
      `data/destacados.js tiene ${destacados.length} entradas y el criterio es hasta 10: Inicio se vuelve una lista en vez de una vidriera`);
  }

  const vistos = new Set();
  for (const d of destacados) {
    const clave = `${d.league} ${d.year}`;
    if (vistos.has(clave)) {
      add('P2', 'destacado-repetido', `data/destacados.js repite ${clave}: Inicio dibujaría el mismo ranking dos veces`);
      continue;
    }
    vistos.add(clave);

    const nombre = (api.LEAGUES && api.LEAGUES[d.league] ? api.LEAGUES[d.league].name : d.league);
    const r = (rankings[d.league] || {})[d.year];
    if (!r) {
      add('P1', 'destacado-sin-ranking',
        `data/destacados.js pide ${nombre} ${d.year} pero no hay ranking precalculado para esa liga-ejercicio: ese bloque de Inicio queda vacío`);
      continue;
    }
    // Un "ranking" de un club es una barra sola, y en la portada se lee como si
    // esa fuera la liga. No se prohíbe (la lista es discrecional), se avisa.
    if (r.clubs.length < 2) {
      add('P2', 'destacado-de-un-club',
        `data/destacados.js pone ${nombre} ${d.year} en la portada con ${r.clubs.length} club cargado: una barra sola no se lee como un ranking`);
    }
  }
}

// --- D14: el espacio de nombres de clubId ---------------------------------
// `clubId` nombra el archivo de datos (`data/<país>/<clubId>-data.js`, por convención de loadClubData()) y prefija cada sourceId.
// Formato: `<slug>-<iso2>`, con el `country` de clubs.js (Admin/CONVENCIONES-DATOS.md, "Identidad del club"). Los ids que no lo cumplían
// se renombraron en el to-do 246; los viejos viven en `data/club-aliases.js` para siempre, y `alias-roto` vigila ese mapa.
function checkClubIds(api) {
  for (const id of Object.keys(api.clubs)) {
    const iso = (api.clubs[id].country || 'xx').toLowerCase();
    if (!id.endsWith('-' + iso)) {
      add('P1', 'clubid-sin-pais', `el club '${id}' tiene un id que no termina en su país (esperado '${id.replace(/-[a-z]{2}$/, '')}-${iso}'): la convención de ids es <slug>-<iso2>, ver Admin/CONVENCIONES-DATOS.md`);
    }
  }
  let aliases = {};
  try {
    const txt = fs.readFileSync(path.join(ROOT, 'data/club-aliases.js'), 'utf8');
    aliases = JSON.parse(txt.match(/CLUB_ALIASES\s*=\s*(\{[\s\S]*?\});/)[1]);
  } catch (e) {
    add('P1', 'alias-roto', `no se pudo leer data/club-aliases.js: ${e.message}`);
    return;
  }
  for (const [viejo, nuevo] of Object.entries(aliases)) {
    if (!api.clubs[nuevo]) add('P1', 'alias-roto', `el alias '${viejo}' apunta a '${nuevo}', que no es un club del sitio`);
    else if (api.clubs[viejo]) add('P1', 'alias-roto', `el alias '${viejo}' es también un id vivo de club: un alias nunca se reutiliza`);
    else if (aliases[nuevo]) add('P1', 'alias-roto', `el alias '${viejo}' apunta a '${nuevo}', que a su vez es un alias (sin cadenas)`);
  }
  checkReferenciaAClub(api, aliases);
}

// REFERENCIA A UN CLUB QUE NO EXISTE (regla de CONVENCIONES-DATOS: el id lo pone alta-club.mjs, y una referencia a un club va en el commit del alta
// o después; aprobado por la Auditora 5, sección 7). P1 por cada alias de tools/club-league-reference/alias.json con `clubId` y cada fila de
// data/club-leagues/ que apunta a un id que no está en data/clubs.js. Un id viejo que data/club-aliases.js resuelve a un club que sí está (`boca`,
// o el de una unión de fichas) no cuenta: si no, una migración de ids con el alias puesto dejaría en P1 las filas viejas hasta migrarlas.
// Caso: «Omonia 29M» = omonia29maiou-cy en alias.json antes del alta (7a3e3aa363, sacado). Los alias de `carpeta`/`sourcing` los vigila faltantes-liga.
function checkReferenciaAClub(api, aliasesDeIds) {
  const existe = (id) => !!api.clubs[id] || (!!aliasesDeIds[id] && !!api.clubs[aliasesDeIds[id]]);
  let alias = {}; try { alias = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'club-league-reference', 'alias.json'), 'utf8')); } catch { /* sin alias.json: nada que mirar */ }
  for (const [iso, m] of Object.entries(alias)) {
    if (!m || typeof m !== 'object') continue;
    for (const [nombre, a] of Object.entries(m)) if (a && a.clubId && !existe(a.clubId)) add('P1', 'referencia-a-club-inexistente', `tools/club-league-reference/alias.json (${iso}) «${nombre}» apunta a '${a.clubId}', que no está en data/clubs.js: la referencia va en el commit del alta o después (Admin/CONVENCIONES-DATOS.md)`);
  }
  for (const id of Object.keys(api.CLUB_LEAGUE_BY_YEAR || {}).sort()) {
    if (existe(id)) continue;
    const iso = (id.match(/-([a-z]{2})$/) || [])[1];
    add('P1', 'referencia-a-club-inexistente', `${iso ? `data/club-leagues/${iso}.js` : 'data/club-leagues/'}: la fila de '${id}' apunta a un club que no está en data/clubs.js: la referencia va en el commit del alta o después (Admin/CONVENCIONES-DATOS.md)`);
  }
}

// --- D12c: colisión de clubId adelantada al SOURCING (Versión 163) ----------
// checkClubIds() avisa cuando un id heredado sin país deja de ser inequívoco, pero recién
// cuando el club que colisiona YA ESTÁ CARGADO en clubs{}. Para entonces renombrar el
// viejo cuesta tres cosas (el archivo data/<país>/<id>-data.js, el clubId y el prefijo de cada
// sourceId) y encima ya se transcribió el documento del club nuevo. Esto mira el escalón
// anterior: los clubes que alguien está SOURCEANDO, que viven en Admin/sourcing/_indice/<País>.md
// desde la Versión 158, y avisa el día que uno de ellos empieza a amenazar a un id pelado.
//
// QUÉ SE REPORTA Y QUÉ NO, que es la parte que se midió antes de escribirlo:
//   - Comparación EXACTA del nombre normalizado, nunca difusa. Medido sobre los 530 clubes
//     trackeados: exacta da 3 pares entre países (Everton, Nacional, Olimpia); por primera
//     palabra da 119 clubes en 23 grupos, casi todos "Deportivo", "Atlético", "FC" y
//     "Unión". O sea que el ruido que preocupaba no se resuelve con una lista de
//     excepciones, se resuelve no haciendo matching difuso. Por eso no hay lista.
//   - El P3 que importa es el club trackeado que volvería AMBIGUO un id pelado ya cargado:
//     ese es el que obliga a una migración. Hoy son 0 y el chequeo calla, que es lo
//     correcto.
//   - Los pares entre dos clubes trackeados (ninguno cargado) van en UNA línea agregada,
//     no una por par: no obligan a nada hoy, y desde la Versión 129 un club nuevo ya nace
//     con el país en el id.
const INDICE_FUENTES = path.join(ROOT, 'Admin/sourcing/_indice');

// `clubs{}` guarda el país como código ISO ('AR'), y `Admin/sourcing/_indice/` lo nombra completo
// ('Argentina.md'), así que hay que traducir para poder compararlos. Es el mismo mapa que
// tiene tools/generate-fuentes-page.js. Si un club tiene un código que no está acá, se usa
// el código tal cual: no va a coincidir con ningún índice, o sea que el chequeo se calla en
// vez de inventar un choque.
const PAIS_CLUB = {
  AR: 'Argentina', BR: 'Brasil', CL: 'Chile', CO: 'Colombia', EC: 'Ecuador',
  ES: 'España', JP: 'Japón', MX: 'México', PE: 'Perú', UY: 'Uruguay',
};

function checkColisionSourcing(api) {
  if (!fs.existsSync(INDICE_FUENTES)) return;

  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');

  // Una línea de club del índice es `- [Nombre](../<País>/<Club>.md) — estado — fecha`.
  // OJO: el mismo patrón matchea `- [Notas generales de X](../X/_notas-generales.md)`, que
  // hay una por país. Sin excluirlas el conteo da 569 en vez de los 530 clubes reales y
  // aparece un choque fantasma de "Notas" en 39 países. Se excluyen por el DESTINO del
  // link, que empieza con `_`, no por el texto, que cambia de país a país.
  const trackeados = [];
  for (const f of fs.readdirSync(INDICE_FUENTES).filter(f => f.endsWith('.md')).sort()) {
    const pais = f.replace(/\.md$/, '');
    for (const line of fs.readFileSync(path.join(INDICE_FUENTES, f), 'utf8').split('\n')) {
      const m = line.match(/^- \[([^\]]+)\]\(<?([^)>]+)>?\)/);
      if (!m) continue;
      if (path.basename(m[2]).startsWith('_')) continue;
      trackeados.push({ pais, nombre: m[1], n: norm(m[1]) });
    }
  }
  if (!trackeados.length) return;

  // Los 41 ids heredados son los únicos que una colisión obliga a migrar: un id que ya
  // termina en país no se vuelve ambiguo nunca.
  const pelados = Object.keys(api.clubs).filter(id => !/-[a-z]{2}$/.test(id));
  const yaReportados = new Set();
  for (const id of pelados) {
    const c = api.clubs[id];
    const paisClub = PAIS_CLUB[c.country] || c.country;
    const nombre = c.displayName || c.name || '';
    for (const t of trackeados) {
      if (t.pais === paisClub || t.n !== norm(nombre)) continue;
      yaReportados.add(t.n);
      add('P3', 'clubid-amenazado-por-sourcing', `se está sourceando "${t.nombre}" (${t.pais}) y coincide con '${id}' (${paisClub}), que tiene id heredado sin país. Si ese club se llega a cargar, hay que renombrar '${id}' a '${id}-${(c.country || 'xx').toLowerCase()}' primero: el id nombra data/${id}-data.js y prefija cada uno de sus sourceId. Conviene decidirlo ANTES de transcribir nada`);
    }
  }

  // Pares entre clubes que todavía no está cargado ninguno de los dos.
  const porNombre = {};
  for (const t of trackeados) (porNombre[t.n] = porNombre[t.n] || []).push(t);
  const pares = [];
  for (const k of Object.keys(porNombre).sort()) {
    // Un nombre que ya salió en el P3 de arriba NO se repite acá: ese caso sí tiene un club
    // cargado detrás, así que la frase "ninguno está cargado" sería falsa justo para él.
    if (yaReportados.has(k)) continue;
    const paises = [...new Set(porNombre[k].map(t => t.pais))];
    if (paises.length < 2) continue;
    pares.push(`${porNombre[k][0].nombre} (${paises.join(' / ')})`);
  }
  if (pares.length) {
    add('P3', 'nombres-repetidos-sourcing', `${pares.length} ${pares.length === 1 ? 'nombre de club trackeado se repite' : 'nombres de club trackeados se repiten'} en países distintos: ${pares.join(', ')}. No obliga a nada hoy (ninguno está cargado, y desde la Versión 129 un club nuevo ya nace con el país en el id): es para que el día que se carguen no se elija un id pelado`);
  }
}

// --- D12b: carpetas de Clubes/<País>/<Club>/ (Versión 160) ------------------
// OJO CON QUÉ PUEDE Y QUÉ NO PUEDE DETECTAR ESTO, porque el punto del plan de escala que lo
// pidió lo planteaba de otra manera. La idea original era "avisar si dos clubes del mismo país
// comparten nombre corto y sus carpetas chocan". Eso NO es detectable por construcción: un
// filesystem no admite dos carpetas con el mismo nombre en el mismo directorio, así que el
// segundo club cae ADENTRO de la carpeta del primero, en silencio, y después no queda ningún
// estado que distinga "dos clubes compartiendo carpeta" de "un club con muchos documentos".
// Por eso NO es el equivalente de checkClubIds() para carpetas: ese sí avisa antes del daño,
// porque dos ids conviven sin problema en un objeto JS y dos nombres de carpeta no.
//
// Lo que SÍ se puede detectar, y es el error más probable de los dos, es la casi-colisión: dos
// carpetas del mismo país cuyos nombres normalizan igual. O sea el mismo club transcripto dos
// veces con dos grafías ("Atlético Goianiense" y "Atletico Goianiense"), con sus documentos
// partidos entre las dos carpetas y ninguna señal de que pasó.
//
// ALCANCE: escanea TODO Clubes/ en disco, no solo los clubes que ya están en clubs{}. Son 336
// carpetas contra 41 (12%), y sobre todo la duplicación nace al SOURCEAR, mucho antes de que el
// club entre al sitio. El costo es que el árbol en disco no es el mismo en toda máquina (de las
// 336 carpetas, 129 tienen algún archivo trackeado en git; el resto son transcripciones que
// todavía no existen y PDFs, que están en .gitignore), así que en un clone limpio esto revisa
// menos carpetas. Degrada bien: menos carpetas escaneadas es menos cobertura, nunca un hallazgo
// falso.
const CLUBES_DIR = path.join(ROOT, 'Clubes');

function checkCarpetasClubes() {
  // Sin Clubes/ no hay nada que chequear y eso NO es un defecto del proyecto (pasa en cualquier
  // clone sin las transcripciones locales). Se sale callado a propósito: un hallazgo de "no se
  // pudo chequear" en cada corrida es ruido que entrena a ignorar la lista.
  if (!fs.existsSync(CLUBES_DIR)) return;

  const subdirs = dir => fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => d.name).sort();

  // Sin acentos, en minúscula y sin separadores: es lo que hace que "Atlético Goianiense" y
  // "Atletico Goianiense" colapsen al mismo string, que es justo el par que buscamos.
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');

  const paises = subdirs(CLUBES_DIR);

  for (const pais of paises) {
    const porNombre = {};
    for (const club of subdirs(path.join(CLUBES_DIR, pais))) {
      (porNombre[norm(club)] = porNombre[norm(club)] || []).push(club);
    }
    for (const k of Object.keys(porNombre).sort()) {
      if (porNombre[k].length < 2) continue;
      add('P2', 'carpeta-club-duplicada', `Clubes/${pais}/: ${porNombre[k].map(c => `"${c}"`).join(' y ')} son carpetas distintas que normalizan al mismo nombre. O es el mismo club transcripto dos veces con dos grafías, y sus documentos quedaron partidos entre las dos, o son dos clubes distintos que hay que desambiguar en el nombre de la carpeta (REGLA 3 de Admin/sourcing/README.md)`);
    }
  }

  // (to-do 287) Dos carpetas de club de un mismo país con PDFs de la MISMA huella: el club quedó con dos carpetas por una grafía distinta
  // (la que no atrapa 'carpeta-club-duplicada', que solo mira nombres). Se compara por tamaño y solo si coincide se calcula el sha1.
  // Sigue los symlinks (en un worktree, `worktree.mjs preparar` enlaza Clubes/ a la carpeta principal); las carpetas de agregado ("_...") alimentan varios clubes y quedan afuera.
  for (const pais of paises) {
    const porTam = {};
    for (const club of subdirs(path.join(CLUBES_DIR, pais))) {
      if (club.startsWith('_')) continue;
      const base = path.join(CLUBES_DIR, pais, club);
      const rec = d => fs.readdirSync(d).flatMap(n => { const p = path.join(d, n); let st; try { st = fs.statSync(p); } catch { return []; } return st.isDirectory() ? rec(p) : (st.isFile() && /\.pdf$/i.test(n) ? [p] : []); });
      for (const f of rec(base)) (porTam[fs.statSync(f).size] = porTam[fs.statSync(f).size] || []).push({ club, f });
    }
    const porHuella = {};
    for (const grupo of Object.values(porTam)) {
      if (new Set(grupo.map(g => g.club)).size < 2) continue;
      for (const g of grupo) {
        const h = require('crypto').createHash('sha1').update(fs.readFileSync(g.f)).digest('hex');
        (porHuella[h] = porHuella[h] || []).push(g);
      }
    }
    for (const g of Object.values(porHuella)) {
      const clubes = [...new Set(g.map(x => x.club))];
      if (clubes.length < 2) continue;
      add('P2', 'carpeta-doble', `Clubes/${pais}/: ${clubes.map(c => `"${c}"`).join(' y ')} tienen un PDF idéntico (${path.basename(g[0].f)}). O es el mismo club con dos carpetas (unirlas en la que ya resuelve a un club, tools/carpetas-clubes.mjs, y no abrir una segunda), o un documento que pertenece a uno solo y quedó guardado en el otro, o uno compartido a propósito (un informe de liga): ese se silencia en tools/audit-ignore.json`);
    }
  }

  // CLAUDE.md prohíbe una carpeta de club colgando directo de Clubes/, sin país en el medio.
  // Se detecta por el contenido y no por el nombre: una carpeta de PAÍS tiene subcarpetas de
  // club adentro, una de CLUB tiene los documentos sueltos.
  for (const pais of paises) {
    const docs = fs.readdirSync(path.join(CLUBES_DIR, pais), { withFileTypes: true })
      .filter(d => d.isFile() && /\.(md|pdf)$/i.test(d.name))
      .map(d => d.name).sort();
    if (!docs.length) continue;
    add('P2', 'carpeta-sin-pais', `Clubes/${pais}/ tiene ${docs.length} documento(s) sueltos (${docs.slice(0, 3).join(', ')}${docs.length > 3 ? ', ...' : ''}) en vez de subcarpetas de club. Si es un club, le falta la carpeta de país en el medio: la convención es Clubes/<País>/<Club>/, nunca una carpeta de club al nivel de arriba (ver CLAUDE.md)`);
  }

  // Versión 309: ¿cada carpeta de club resuelve a UN club sin ambigüedad? La regla vive en tools/carpetas-clubes.mjs (cita en
  // data/<país>/<id>-data.js, y si no, nombre IGUAL dentro del mismo país) y la usan onboard.mjs, el registro de transcripciones y el pipeline.
  // Con la regla vieja (substring, sin país) 17 clubes del sitio no se reconocían y 11 carpetas caían en un club EQUIVOCADO (Porto ->
  // Grêmio, Inter -> Internacional): el registro marcaba "ya cargado" PDFs que no lo estaban, y al revés. Si una carpeta vuelve a ser
  // ambigua (la citan dos clubes, o su nombre es igual a dos clubes del país), es P1: el pipeline no puede saber de quién es.
  // Las carpetas de agregado ("_J.League", "_DFL-Finanzkennzahlen") alimentan varios clubes a propósito y no cuentan.
  let carpetas = [];
  try { carpetas = JSON.parse(execFileSync('node', [path.join(ROOT, 'tools', 'carpetas-clubes.mjs'), '--json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })); }
  catch (e) { add('P1', 'carpetas-clubes-fallo', `tools/carpetas-clubes.mjs falló: ${String(e.message).slice(0, 200)}. Sin esa regla el registro de transcripciones no sabe qué PDF es de qué club`); return; }
  for (const c of carpetas) {
    if (c.via === 'ambigua' && !c.carpeta.startsWith('_')) add('P1', 'carpeta-club-ambigua', `Clubes/${c.pais}/${c.carpeta}/ no resuelve a un solo club (${c.fuente}). Que la cite UN solo data/<país>/<id>-data.js (o renombrar la carpeta): mientras tanto el pipeline y el registro no saben de quién son sus PDFs`);
  }
  // Y al revés: un club del sitio cuyos PDFs ninguna carpeta identifica (no cita su carpeta ni se llama igual). Sus PDFs figurarían como
  // de un club nuevo y el pipeline los procesaría aunque el ejercicio ya esté cargado.
  const resueltos = new Set(carpetas.filter(c => c.clubId).map(c => c.clubId));
  for (const f of archivosData()) {
    const id = idDeArchivo(f);
    if (resueltos.has(id)) continue;
    // (to-do 209) la cita de la carpeta puede estar en la evidencia del club y no en data/: se leen los dos, como carpetas-clubes.mjs
    const ev = path.join(ROOT, 'Admin', 'carga-clubes', `${id}.md`);
    const txt = fs.readFileSync(path.join(ROOT, f), 'utf8') + (fs.existsSync(ev) ? `\n${fs.readFileSync(ev, 'utf8')}` : '');
    if (/Clubes\/[^/\n`'"]+\/_/.test(txt)) continue; // se alimenta de una carpeta de agregado (J.League)
    if (!/Clubes\//.test(txt)) continue; // club cargado solo de fuentes externas (prensa): no tiene PDFs en Clubes/
    add('P2', 'club-sin-carpeta', `${f} cita Clubes/ pero ninguna carpeta de Clubes/ resuelve a '${id}' (tools/carpetas-clubes.mjs): sus PDFs se tratarían como de un club nuevo`);
  }
}

// Un archivo bajado que no es lo que dice su extensión (Admin/propuestas/archivo-no-es-lo-que-dice.md, ok de Guido). Caso: Brøndby 2025,
// aarsrapport-2025-06-30.xhtml venía comprimido con gzip (el depósito lo sirvió así) y ninguna tool lo leía; nadie lo vio hasta medir los XHTML.
// Un .pdf, .xhtml o .xml de Clubes/ cuyos primeros bytes son gzip (1f 8b) o Zip (PK\3\4), o un .pdf que es una página HTML (de error o de login),
// salvo que al lado exista <base>-descomprimido.<ext> (la copia que se lee; el original queda). Solo esas tres firmas: un PDF con basura antes
// de %PDF lo lee poppler igual y no es este caso. Lee 64 bytes por archivo (sigue los enlaces de un worktree preparado).
// Un .xhtml en gzip NO es hallazgo (Auditora 5): xhtml-aarsrapport.mjs e ixbrl-resultado.mjs lo descomprimen en memoria (`leerXhtmlTexto`) y la copia
// no hace falta; si esas tools dejaran de leerlo, vuelve a serlo. Un .xhtml en Zip sí: ninguna tool lo abre.
function checkArchivoNoEsLoQueDice() {
  if (!fs.existsSync(CLUBES_DIR)) return;
  const buf = Buffer.alloc(64);
  (function walk(d) {
    let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    const nombres = new Set(es.map(e => e.name));
    for (const e of es) {
      const p = path.join(d, e.name);
      if (e.isDirectory() || (e.isSymbolicLink() && (() => { try { return fs.statSync(p).isDirectory(); } catch { return false; } })())) { walk(p); continue; }
      const m = /^(.*)\.(pdf|xhtml|xml)$/i.exec(e.name); if (!m) continue;
      if (nombres.has(`${m[1]}-descomprimido.${m[2]}`)) continue;
      let n = 0; try { const fd = fs.openSync(p, 'r'); try { n = fs.readSync(fd, buf, 0, 64, 0); } finally { fs.closeSync(fd); } } catch { continue; }
      const cab = buf.subarray(0, n);
      const real = cab[0] === 0x1f && cab[1] === 0x8b ? (m[2].toLowerCase() === 'xhtml' ? null : 'gzip') : (cab[0] === 0x50 && cab[1] === 0x4b && cab[2] === 0x03 && cab[3] === 0x04) ? 'Zip'
        : (m[2].toLowerCase() === 'pdf' && /^(\xEF\xBB\xBF)?\s*<(!doctype html|html)/i.test(cab.toString('latin1'))) ? 'HTML' : null;
      if (!real) continue;
      const rel = path.relative(ROOT, p);
      add('P2', 'archivo-no-es-lo-que-dice', `${rel} es ${real}, no ${m[2].toLowerCase()}: ${real === 'HTML' ? 'es una página de error o de login, no el documento; se vuelve a bajar' : `el depósito lo sirvió comprimido; se descomprime a ${m[1]}-descomprimido.${m[2]} al lado y el original queda`} (skill club-sourcing, «Gotchas de tooling»)`);
    }
  })(CLUBES_DIR);
}

// --- D13: qué de las fuentes se le muestra al visitante (Versión 127) -------
// `sources[].note` es una nota INTERNA: una sesión se la escribe a la siguiente, con
// rutas del repo, cómo se leyó el PDF y qué quedó pendiente. En la Versión 126 se
// publicó tal cual, y el visitante terminó leyendo "PDF subido directamente por Guido"
// y rutas de su disco. Esto vigila las dos mitades de ese arreglo: que lo público no
// filtre nada interno, y que nadie vuelva a renderizar `note` sin darse cuenta.
function checkFuentesPublicas(api) {
  const INTERNO = /\bGuido\b|Clubes\/|\.pdf\b|\.md\b|pdftotext|pdftoppm|Tesseract|\bOCR\b|transcripci[oó]n|transcript/i;
  let sinNota = 0;

  for (const id of Object.keys(api.sources)) {
    const s = api.sources[id];
    if (s.publicNote && INTERNO.test(s.publicNote)) {
      add('P1', 'nota-publica-con-interno', `sources['${id}'].publicNote menciona algo interno (nombre propio, ruta del repo o detalle de transcripción): "${s.publicNote.match(INTERNO)[0]}". Esa nota la lee el visitante`);
    }
    if (s.reliability !== 'primary' && !s.publicNote) sinNota++;
  }
  // (to-do 209) la nota INTERNA de una fuente ya no vive en data/ (que se publica entero): va a "## Fuentes" del
  // Admin/carga-clubes/<club>.md (tools/evidencia-club.mjs, agregarFuente). Un `note` que vuelva a aparecer en sources{} viaja al visitante.
  const conNote = Object.keys(api.sources).filter((id) => 'note' in api.sources[id]);
  if (conNote.length) add('P2', 'note-interna-en-data', `${conNote.length} fuentes con \`note\` en data/ (ej. ${conNote.slice(0, 3).join(', ')}): la nota interna va a "## Fuentes" de Admin/carga-clubes/<club>.md, no a sources{}`);
  if (sinNota) {
    add('P3', 'fuente-no-primaria-sin-nota', `${sinNota} documentos que no son fuente primaria y no tienen publicNote. El nivel solo dice "réplica" o "prensa": conviene una frase que diga por qué`);
  }

  // (to-do 345, Auditora 5) UNA FUENTE QUE SALIÓ DE UN INFORME XHTML (iXBRL) Y NO TIENE LA URL DEL DEPÓSITO OFICIAL (Virk o el club). Se la reconoce por el mismo cruce que
  // `fuente.mjs --propuesta`: el id de la fuente es <clubId>-<nombre del .md sin el club>, y el encabezado del .md dice que lo escribió xhtml-aarsrapport.mjs. La url nunca puede ser
  // nuestro PDF de ancla (la impresión de Chrome, no el original): P1 si termina en .pdf o empieza con Clubes/. Sin url: P3.
  const slugN = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const mdsXhtml = [];
  (function walk(d) { let es; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } if (es.some((e) => e.name.endsWith('.xhtml'))) for (const e of es) if (e.name.endsWith('.md') && es.some((x) => x.name === e.name.replace(/\.md$/, '.xhtml'))) mdsXhtml.push({ dir: path.basename(d), slug: slugN(e.name.replace(/\.md$/, '')), abs: path.join(d, e.name) }); for (const e of es) if (e.isDirectory()) walk(path.join(d, e.name)); })(path.join(ROOT, 'Clubes'));
  for (const id of Object.keys(api.sources)) {
    const s = api.sources[id]; const url = s.url || '';
    const cand = mdsXhtml.filter((m) => id.endsWith('-' + m.slug) && String(s.clubId || '').startsWith(slugN(m.dir).split('-')[0]));
    const md = cand.find((m) => /xhtml-aarsrapport\.mjs/.test(fs.readFileSync(m.abs, 'utf8').slice(0, 400)));
    if (!md) continue;
    if (/\.pdf(\?|#|$)/i.test(url) || url.startsWith('Clubes/')) add('P1', 'fuente-xhtml-sin-url', `sources['${id}'].url apunta a ${url}: el PDF de ancla es la impresión de Chrome de un XHTML, no el documento oficial; la url tiene que ser la del depósito oficial (Virk o el club)`);
    else if (!url) add('P3', 'fuente-xhtml-sin-url', `sources['${id}'] salió de un informe XHTML (iXBRL) y no tiene la url del depósito oficial. Reino Unido y Dinamarca: node tools/fuente-url-xhtml.mjs ${s.clubId} --escribir (la busca en Companies House o Virk y comprueba que sea el mismo informe; cargar.mjs la corre sola al terminar una carga). Otro país: node tools/fuente.mjs ${s.clubId} ${id} --url "…" --nota "Informe oficial en formato XHTML (iXBRL)" --escribir`);
  }

  // El guardarraíl del bug de la 126: `note` no se renderiza en ningún lado.
  for (const rel of ['js/finanzas-render.js', 'tools/generate-fuentes-page.js']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const usos = [...src.matchAll(/\$\{[^}]*\b[a-z]\.note\b/gi)];
    if (usos.length) {
      add('P1', 'note-interna-renderizada', `${rel} interpola \`.note\` dentro de HTML (${usos.length} ${usos.length === 1 ? 'vez' : 'veces'}): esa es la nota interna, la que ve el visitante es publicNote`);
    }
  }
}

// --- LOS PUNTOS DEL TODO: ¿ya se cumplieron? ¿declaran cómo se comprueba? ---------
// Cada punto de Admin/TODO.md lleva líneas `Verificar: ...` (formato en tools/todo-verificar.js). Corre AL FINAL, con todos los hallazgos ya calculados, porque una condición puede ser
// «audit <código> = 0». P3: un punto cumplido hay que cerrarlo (`node tools/todo.mjs --cerrar <id>`) y uno sin condición hay que completarlo (o `Verificar: manual`).
function checkTodo() {
  let T; try { T = require('./todo-verificar.js'); } catch { return; }
  let texto; try { texto = fs.readFileSync(path.join(ROOT, 'Admin/TODO.md'), 'utf8'); } catch { return; }
  const hasta = findings.slice();
  for (const p of T.puntos(texto)) {
    if (!p.verificar.length) { add('P3', 'todo-sin-verificar', `Admin/TODO.md, punto ${p.id}: sin línea «Verificar:». Agregá una condición que una máquina compruebe (audit <código> = 0, existe <ruta>, contiene <ruta> | <texto>) o «Verificar: manual»`); continue; }
    const rs = p.verificar.map((e) => T.evaluar(e, hasta, ROOT));
    const mal = rs.filter((r) => r.ok === null && !/^manual$/.test(r.detalle));
    if (mal.length) add('P3', 'todo-verificar-ilegible', `Admin/TODO.md, punto ${p.id}: ${mal[0].detalle}`);
    else if (rs.every((r) => r.ok === true)) add('P3', 'todo-cumplido', `Admin/TODO.md, punto ${p.id} («${p.titulo.slice(0, 60)}»): cumple su Verificar (${rs.map((r) => r.detalle).join('; ')}). Cerralo: node tools/todo.mjs --cerrar ${p.id}`);
  }
}

// --- D12: procedencia del tipo de cambio (Versión 125) ---------------------
// `checkMoneda()` revisa que el fx EXISTA y sea plausible. Esto revisa de DÓNDE
// SALIÓ: si lo declara el documento, si es una cotización de mercado, o si nadie
// lo sabe. Antes de la Versión 125 eso vivía en prosa y no se podía chequear.
function checkFxProcedencia(api) {
  const fueraDeTabla = [];
  let sinProcedencia = 0;

  // Las entradas de FX_CLOSE, indexadas por moneda+año, para comparar contra
  // ellas cualquier cotización de mercado que un club haya cargado por su cuenta.
  const tabla = {};
  for (const [key, entry] of Object.entries(api.FX_CLOSE || {})) {
    const [moneda, fecha] = key.split('@');
    (tabla[`${moneda}|${fecha.slice(0, 4)}`] = tabla[`${moneda}|${fecha.slice(0, 4)}`] || []).push({ key, ...entry });
  }

  for (const { clubId, year, ym } of clubYears(api)) {
    const real = REPORT_TYPES_REALES.includes(ym.reportType);
    const f = api.fxMetaFor(ym);

    // Una referencia rota es grave: el ejercicio se queda sin tipo de cambio y se
    // convierte con el placeholder global, en silencio.
    if (ym.fxRef && !(api.FX_CLOSE || {})[ym.fxRef]) {
      add('P1', 'fx-ref-rota', `${ref(clubId, year)}: fxRef '${ym.fxRef}' no existe en FX_CLOSE (data/currency-map.js)`);
      continue;
    }
    if (!real || f.fx == null) continue;

    if (f.source === 'unknown') {
      sinProcedencia++;
      add('P2', 'fx-sin-procedencia', `${ref(clubId, year)}: fx ${f.fx} sin procedencia declarada (fxSource), no se sabe si lo declara el documento o si es una cotización externa`);
    }

    // Una cotización de mercado cargada a mano en el archivo de un club, en vez
    // de salir de FX_CLOSE. Si además difiere de la que la tabla declara para esa
    // moneda y ese año, hay una contradicción publicada: dos clubes convirtiendo
    // el mismo cierre con números distintos.
    if ((f.source === 'market_close' || f.source === 'market_approx') && !f.ref) {
      const enTabla = tabla[`${ym.currency}|${year}`] || [];
      const choque = enTabla.find(e => Math.abs(f.fx - e.fx) / e.fx > 0.02);
      if (choque) {
        add('P2', 'fx-mercado-discrepante', `${ref(clubId, year)}: usa ${f.fx} ${ym.currency}/USD como cotización de mercado, pero FX_CLOSE declara ${choque.fx} para esa fecha (${choque.key}, ${choque.label}), ${((Math.abs(f.fx - choque.fx) / choque.fx) * 100).toFixed(1)}% de diferencia`);
      } else if (f.source === 'market_close') {
        fueraDeTabla.push(`${clubId} ${year} (${f.fx} ${ym.currency})`);
      }
    }
  }

  if (fueraDeTabla.length) {
    add('P3', 'fx-mercado-fuera-de-tabla', `${fueraDeTabla.length} cotizaciones de mercado escritas en el archivo de un club en vez de FX_CLOSE: ${fueraDeTabla.join(', ')}. Mientras las use un solo club no duplica nada, pero es el estado del que nace la duplicación, mover a la tabla al confirmar su fecha exacta de cierre.`);
  }
  if (sinProcedencia) {
    add('P3', 'fx-procedencia-pendiente', `${sinProcedencia} ejercicios reales con fx sin procedencia verificada. Es la lista de to-dos que dejó la migración de la Versión 125, no un error de carga: cada uno se resuelve mirando el Anexo de moneda extranjera de su propio documento.`);
  }
}

function checkCategorizacion(api) {
  for (const { clubId, year, ym, rev, exp } of clubYears(api)) {
    if (!exp.length && !rev.length) continue;
    const cat = c => exp.filter(l => l.normalizedCategory === c).reduce((s, l) => s + l.amountNative, 0);
    // (to-do 339) los sueldos del primer equipo y el bolsón sin desglosar son los de la taxonomía del deporte del club (wages_squad / lump_football_operations_expense en fútbol)
    const tx = api.SPORT_TAXONOMIES[(api.clubs[clubId] || {}).sport || 'futbol'] || api.SPORT_TAXONOMIES.futbol;
    const SUELDOS = Object.keys(tx.expense).find(k => tx.expense[k] === 'first_team_staff'); const BOLSON = (tx.lump || {}).expense;
    // Un ejercicio placeholder tiene sus líneas en cero: no es que falten los sueldos,
    // es que no hay datos todavía. Solo se mira donde hay plata cargada.
    if (SUELDOS && sum(exp) !== 0 && cat(SUELDOS) === 0 && (!BOLSON || cat(BOLSON) === 0)) {
      add('P2', 'sin-salarios', `${ref(clubId, year)}: no hay ni una línea en '${SUELDOS}' ni un bolsón sin desglosar — todo club paga sueldos, probablemente quedaron enterrados en otra categoría`);
    }
    // SUELDOS POSIBLEMENTE ESCONDIDOS (to-do 232 s): con el costo de personal del ejercicio ya leído de su nota (fiscalYearMeta.staffCost,
    // caja-deuda.mjs --personal), las líneas wages_squad suman menos de la mitad. Caso que lo motivó: PAOK, 42 M en "Αμοιβές τρίτων" del
    // cuadro de fútbol contra 9,2 M de costo de personal en la nota 17; un subagente lo notó leyendo, esto lo hace aparecer solo.
    if (SUELDOS && ym.staffCost > 0 && Math.abs(cat(SUELDOS)) < ym.staffCost / 2) {
      add('P2', 'sueldos-escondidos', `${ref(clubId, year)}: el costo de personal de la nota es ${ym.staffCost} y '${SUELDOS}' suma ${Math.abs(cat(SUELDOS))}: los sueldos pueden estar dentro de otra línea (caja-deuda.mjs --personal --partir, o la cola por renglón)`);
    }
    for (const [sec, lines, buckets, catchAll] of [
      ['Ingresos', rev, api.REVENUE_BUCKETS, 'Otros ingresos'],
      ['Gastos', exp, api.EXPENSE_BUCKETS, 'Otros gastos'],
    ]) {
      if (!lines.length) continue;
      const total = Math.abs(sum(lines));
      if (!total) continue;
      const rows = api.bucketize(lines, buckets, catchAll, null, (api.clubs[clubId] || {}).sport);
      const resto = Math.abs((rows.find(r => r.label === catchAll) || {}).value || 0);
      const pct = resto / total;
      // P3, no P2 (Auditora 4, 2ª corrida de P2 y P3): un catch-all grande es un dato para mirar, no un error de carga; el total cierra y la
      // línea figura tal cual la fuente. Y no se cuenta cuando en esa fila caen una o dos líneas: ahí no hay nada que desglosar (una sola
      // línea del documento, como "Otros ingresos" o "Otros gastos", ES el catch-all).
      const lineasEnLaFila = ((rows.find(r => r.label === catchAll) || {}).items || []).length;
      if (pct > 0.4 && lineasEnLaFila > 2) {
        add('P3', 'catchall-dominante', `${ref(clubId, year)} ${sec}: el catch-all "${catchAll}" se lleva ${(pct * 100).toFixed(0)}% del total — Formato simplificado no dice casi nada para este ejercicio`);
      }
    }
  }
}

// --- S: escalabilidad -------------------------------------------------------
function checkEscala(api) {
  // El invariante del proyecto desde la Versión 102 es que NO hay ramas por club
  // en el código. Un `clubId` literal en index.html o en js/ es la primera grieta.
  const archivos = ['index.html', ...fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).map(f => 'js/' + f)];
  const ids = Object.keys(api.clubs);
  const hits = [];
  for (const rel of archivos) {
    // Los comentarios HTML se blanquean ANTES de buscar (Versión 129, falso positivo
    // real): el comentario de cabecera de index.html eran 50 KB de prosa donde nombrar
    // `racing` o `boca` es lo normal, y cada mención se reportaba como si fuera una
    // rama por club en el código. Se reemplaza por líneas vacías, no se borra, para
    // que los números de línea que se reportan sigan siendo los del archivo.
    const crudo = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const limpio = crudo.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
    limpio.split('\n').forEach((linea, i) => {
      const t = linea.trim();
      if (!t) return;
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('-')) return;
      for (const id of ids) {
        // Comillas simples o dobles, NO backticks: en prosa un `id` entre backticks es
        // markdown, no código, y era la otra mitad del mismo falso positivo.
        if (new RegExp(`['"]${id}['"]`).test(linea)) {
          hits.push({ rel, line: i + 1, id, texto: crudo.split('\n')[i].trim().slice(0, 110) });
        }
      }
    });
  }
  for (const h of hits) {
    add('P2', 'clubid-hardcodeado', `${h.rel}:${h.line}: literal '${h.id}' en código — revisar que no sea una rama por club (${h.texto})`);
  }

  const bytesData = archivosData()
    .reduce((s, f) => s + fs.statSync(path.join(ROOT, f)).size, 0);
  const n = Object.keys(api.generic).length;
  const porClub = Math.round(bytesData / n);
  add('P3', 'proyeccion', `data/*.js: ${(bytesData / 1024).toFixed(0)} KB en ${n} clubes (~${(porClub / 1024).toFixed(1)} KB/club). A 1000 clubes: ~${(porClub * 1000 / 1024 / 1024).toFixed(1)} MB en disco; el que se baja por visita sigue siendo 1 (lazy load), pero clubs.js se carga entero SIEMPRE (hoy ${(fs.statSync(path.join(ROOT, 'data/clubs.js')).size / 1024).toFixed(0)} KB).`);

  // UMBRALES POR CÓMO SE LEE EL ARCHIVO, no por tamaño a secas (Versión 140, decisión de
  // Guido después de plantearle el trade-off). Un archivo que se lee ENTERO paga su tamaño
  // en cada lectura: `index.html` lo baja cada visitante en cada pageview, y `Admin/ESTADO.md` y
  // `Admin/TODO.md` los lee entera cada sesión que arranca acá. Esos tienen umbral apretado.
  // `Admin/CHANGELOG.md` y `Admin/finance-of-sports-project.md` son de CONSULTA PUNTUAL: se entra con un
  // grep, se lee un bloque y se sale, y para ese uso 459 KB en un archivo cuestan lo mismo
  // que 459 KB repartidos en cinco. Partirlos tendría un costo real y concreto: hoy "¿dónde
  // está la historia?" tiene una respuesta de una palabra, y con CHANGELOG-2026/2027/... cada
  // búsqueda arranca eligiendo archivo y cada tanto alguien escribe en el viejo. Sus umbrales
  // son deliberadamente altos y solo existen para avisar si algún día se van de escala.
  // EL DÍA QUE SÍ HAYA QUE PARTIRLOS no va a ser por el tamaño: va a ser cuando un grep
  // devuelva decenas de bloques irrelevantes, y eso se arregla con un índice, no partiendo.
  // (Versión 598, 2026-10-08, decisión de Guido) `Admin/CHANGELOG.md` llegó a 724 KB con dos mitades en orden contrario y se partió UNA vez, por
  // ÉPOCA y no por tamaño ni por año: las Versiones 10 a 299 (sourcing y onboarding manual, antes del pipeline) viven en
  // `Admin/Archive/CHANGELOG-v010-v299.md`, de la más nueva a la más vieja; el CHANGELOG sigue desde la 300 y su cabecera dice dónde está lo anterior.
  // No se parte en rangos: una búsqueda tiene que elegir entre dos archivos como mucho.
  for (const [f, limite] of [['Admin/CHANGELOG.md', 400], ['Admin/finance-of-sports-project.md', 1200], ['index.html', 150], ['Admin/ESTADO.md', 60], ['Admin/TODO.md', 60],
    // (to-do 325 c) el resto de Admin/*.md con un umbral común: avisa si alguno se va de escala.
    ...fs.readdirSync(path.join(ROOT, 'Admin')).filter(n => /\.md$/.test(n) && !/^(CHANGELOG|finance-of-sports-project|ESTADO|TODO)\.md$/.test(n)).map(n => ['Admin/' + n, 250])]) {
    const kb = fs.statSync(path.join(ROOT, f)).size / 1024;
    if (kb > limite) add('P3', 'archivo-pesado', `${f}: ${kb.toFixed(0)} KB (umbral ${limite} KB) — candidato a partir`);
  }
}

// --- H: higiene de runtime que sí se puede ver desde Node -------------------
// GESTIONES (to-do 147, paso 12): data/gestiones/<país>.js. Lo que el sitio muestra como botón y como
// franja tiene que ser verificable: una gestión confirmada sin fuente es un dato sin respaldo (P1);
// una fecha mal escrita, un "hasta" antes del "desde" o dos gestiones del mismo club que se pisan
// asignan mal los ejercicios en silencio (P1); un club que no existe es una gestión que nunca se ve
// (P2). Y la lista PAISES de js/finanzas-anios.js tiene que nombrar exactamente los archivos que hay:
// un archivo que no está en la lista nunca se carga (P1).
// LA LIGA DE UN AÑO NECESITA DOS FUENTES (regla de Guido en Admin/CONVENCIONES-DATOS.md; diseño aprobado por la Auditora 5, sección 7). La lista de
// equipos de cada liga-temporada (tools/club-league-reference/<iso>.json) es una fuente (Wikipedia); `fuentes` suma las otras (tools/segunda-fuente-liga.mjs).
// ALCANCE (cambio 1 de la Auditora): no los 1.300 club-años cargados (un P3 permanente que nadie baja), solo las asignaciones del alta que (a) son
// desde LIGA_DOS_FUENTES_DESDE o (b) salieron de una coincidencia NO exacta (ni el nombre igual ni un alias de alias.json). El rastro es el de
// alta-club.mjs en Admin/carga-clubes/<id>.md («roster cacheado de "<página>" (…/<iso>.json), coincidencia exacta "X"» o «… única por palabras "X" =
// "Y"», con la fecha si la línea la trae). Cuenta solo si la fila de data/club-leagues/ de ese año (o del anterior) sigue siendo esa liga.
//   liga-una-fuente (P3, UNA línea por liga): club-años de ese alcance cuya liga-temporada tiene una sola fuente.
//   liga-fuentes-no-coinciden (P2, por club-año): hay dos fuentes y el club (por el nombre de la lista, el de su carpeta o un alias, nunca por
//   parecido) no está en la otra. Lo decide la Auditora o se vota; no se corrige solo.
const LIGA_DOS_FUENTES_DESDE = '2026-10-22';
function checkLigaDosFuentes(api) {
  const dirEv = path.join(ROOT, 'Admin', 'carga-clubes'); const dirRef = path.join(ROOT, 'tools', 'club-league-reference');
  if (!fs.existsSync(dirEv) || !fs.existsSync(dirRef)) return;
  const n = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  let alias = {}; try { alias = JSON.parse(fs.readFileSync(path.join(dirRef, 'alias.json'), 'utf8')); } catch { /* sin alias: solo el nombre */ }
  const caches = {}; const cache = (iso) => { if (!(iso in caches)) { try { caches[iso] = JSON.parse(fs.readFileSync(path.join(dirRef, `${iso}.json`), 'utf8')); } catch { caches[iso] = null; } } return caches[iso]; };
  const RE = /roster cacheado de "([^"]+)" \(tools\/club-league-reference\/([a-z]{2})\.json\), coincidencia (exacta "([^"]+)"|única por palabras "([^"]+)" = "([^"]+)")/;
  const casos = new Map();
  for (const f of fs.readdirSync(dirEv).filter((x) => x.endsWith('.md')).sort()) {
    const clubId = f.replace(/\.md$/, '');
    for (const l of fs.readFileSync(path.join(dirEv, f), 'utf8').split('\n')) {
      const m = RE.exec(l); if (!m) continue;
      const [, pagina, iso, , exacta, lista2, carpeta] = m; const lista = exacta || lista2;
      const fecha = (/alta-club\.mjs, (\d{4}-\d{2}-\d{2})/.exec(l) || [])[1] || null;
      const k = `${clubId}|${pagina}`; const prev = casos.get(k) || {};
      casos.set(k, { clubId, pagina, iso, lista, carpeta: carpeta || prev.carpeta || null, exacta: !!exacta, fecha: fecha || prev.fecha || null });
    }
  }
  const unaFuente = {};
  for (const c of casos.values()) {
    const aliasDelClub = Object.entries(alias[c.iso] || {}).filter(([, a]) => a && a.clubId === c.clubId).map(([x]) => n(x));
    const noExacta = !c.exacta && n(c.lista) !== n(c.carpeta) && !aliasDelClub.includes(n(c.lista));
    if (!noExacta && !(c.fecha && c.fecha >= LIGA_DOS_FUENTES_DESDE)) continue;
    const C = cache(c.iso); let liga = null; let anio = null; let entrada = null;
    for (const [lid, ys] of Object.entries(C?.leagues || {})) for (const [y, e] of Object.entries(ys)) if (e.wikipediaPage === c.pagina) { liga = lid; anio = Number(y); entrada = e; }
    if (!entrada) continue;
    const filas = api.CLUB_LEAGUE_BY_YEAR[c.clubId] || {};
    if (![anio, anio - 1].some((y) => String(filas[y] || '').toLowerCase() === liga.toLowerCase())) continue; // la fila ya no es esa liga (corregida)
    const fuentes = entrada.fuentes && entrada.fuentes.length ? entrada.fuentes : [{ tipo: 'wikipedia' }];
    const otras = fuentes.filter((x) => x.tipo !== 'wikipedia' && Array.isArray(x.equipos));
    if (!otras.length) { (unaFuente[liga] = unaFuente[liga] || []).push(`${c.clubId} ${anio}`); continue; }
    const nombres = new Set([n(c.lista), n(c.carpeta), ...aliasDelClub].filter(Boolean));
    for (const o of otras) if (!o.equipos.some((e) => nombres.has(n(e)))) add('P2', 'liga-fuentes-no-coinciden', `${c.clubId} ${anio} en ${liga}: está en la lista de Wikipedia («${c.lista}», ${c.pagina}) y no en la de ${o.tipo} (${o.url}) por su nombre ni por un alias de alias.json. Si es el mismo club con otro nombre, va a alias.json; si no, lo decide la Auditora o se vota (no se corrige solo)`);
  }
  for (const [liga, cs] of Object.entries(unaFuente).sort()) add('P3', 'liga-una-fuente', `${liga}: ${cs.length} club-año(s) con la liga de una sola fuente (Wikipedia) que salieron de una coincidencia no exacta o son nuevos: ${cs.slice(0, 6).join(', ')}${cs.length > 6 ? ', …' : ''}. La segunda: node tools/segunda-fuente-liga.mjs`);
}

// (Auditora 5, to-do 356; regla de Guido: lo que ya viene estructurado no se paga con IA) PAGO DE IA SOBRE UN DOCUMENTO DETERMINISTA. Un .md que escribió tools/xhtml-aarsrapport.mjs (primera línea: «motor: xhtml-ixbrl»)
// trae sus cifras etiquetadas. P1 si un log de API (los que lee tools/gasto.mjs) registra, desde FRENO_DESDE, una llamada de localizar o extraer sobre uno de esos documentos sin que Admin/registros/pagar-ia-xhtml.jsonl
// tenga antes la bandera `--pagar-ia-xhtml "<motivo>"` de lote.mjs para ese documento. Cuando exista el escalón que lee las etiquetas, el «sin la bandera» pasa a ser «sin haber corrido el escalón».
const FRENO_DESDE = '2026-10-22T00:00:00Z';
function checkPagoSobreDeterminista() {
  const dir = path.join(ROOT, 'Admin', 'registros');
  const autorizados = []; // { pdf, ts }
  try { for (const l of fs.readFileSync(path.join(dir, 'pagar-ia-xhtml.jsonl'), 'utf8').split('\n').filter(Boolean)) { const o = JSON.parse(l); if (!o.cierre) for (const d of o.docs || []) autorizados.push({ pdf: d, ts: o.ts }); } } catch (e) { /* sin bandera usada */ }
  const esDet = {}; const det = (pdf) => (pdf in esDet ? esDet[pdf] : (esDet[pdf] = (() => { try { return /motor: xhtml-ixbrl/.test(fs.readFileSync(path.join(ROOT, pdf.replace(/\.pdf$/i, '.md')), 'utf8').slice(0, 400)); } catch (e) { return false; } })()));
  const malos = new Set();
  for (const log of ['claude-api.jsonl', 'gemini.jsonl', 'mistral.jsonl']) {
    let t; try { t = fs.readFileSync(path.join(dir, 'api', log), 'utf8'); } catch (e) { continue; }
    for (const l of t.split('\n')) {
      if (!l.includes('"pdf"')) continue;
      let o; try { o = JSON.parse(l); } catch (e) { continue; }
      if (!o.pdf || !o.ts || o.ts < FRENO_DESDE || !o.costUsd || o.pdf.startsWith('/') || !det(o.pdf)) continue;
      if (!autorizados.some((a) => a.pdf === o.pdf && a.ts <= o.ts)) malos.add(o.pdf);
    }
  }
  if (malos.size) add('P1', 'pago-ia-sobre-determinista', `${malos.size} documento(s) de motor xhtml-ixbrl (determinista) con una llamada paga de IA (${log0(malos)}) sin --pagar-ia-xhtml "<motivo>" registrado antes en Admin/registros/pagar-ia-xhtml.jsonl: sus cifras ya vienen etiquetadas y no se pagan con IA`);
}
const log0 = (set) => [...set].slice(0, 3).map((p) => p.split('/').pop()).join(', ') + (set.size > 3 ? `, +${set.size - 3} más` : '');
function checkGestiones(api) {
  const dir = path.join(ROOT, 'data', 'gestiones');
  if (!fs.existsSync(dir)) return;
  const archivos = fs.readdirSync(dir).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, '')).sort();
  const anios = fs.readFileSync(path.join(ROOT, 'js', 'finanzas-anios.js'), 'utf8');
  const m = anios.match(/const PAISES = \[([^\]]*)\]/);
  const lista = m ? [...m[1].matchAll(/'([a-z]+)'/g)].map(x => x[1]).sort() : [];
  for (const f of archivos) if (!lista.includes(f)) add('P1', 'gestiones-sin-cargar', `data/gestiones/${f}.js existe pero '${f}' no está en PAISES de js/finanzas-anios.js: el sitio nunca lo carga`);
  for (const f of lista) if (!archivos.includes(f)) add('P2', 'gestiones-pais-sin-archivo', `PAISES de js/finanzas-anios.js nombra '${f}' y no existe data/gestiones/${f}.js (404 al elegir un club de ese país)`);
  const sandbox = { window: {} };
  for (const f of archivos) {
    try { vm.runInNewContext(fs.readFileSync(path.join(dir, f + '.js'), 'utf8'), sandbox, { filename: `data/gestiones/${f}.js` }); }
    catch (e) { add('P1', 'gestiones-no-carga', `data/gestiones/${f}.js no carga: ${e.message}`); }
  }
  const fecha = /^\d{4}-\d{2}-\d{2}$/;
  const sinBalance = [];
  for (const [club, gs] of Object.entries(sandbox.window.CLUB_GESTIONES || {})) {
    // P3 (to-do 219): las gestiones se cargan por país antes que los balances; un club sin balance todavía es esperable, no un riesgo.
    // Una línea por país en vez de una por club (Auditora 5): son 26 avisos del mismo hecho. Y un id sin balance que se parece a uno cargado
    // (mismo país y mismos cinco primeros caracteres del slug) sí puede ser un id mal escrito: ese es P1 (`gestion-id-sospechoso`).
    if (!api.clubs[club]) sinBalance.push(club);
    const orden = gs.slice().sort((a, b) => a.desde < b.desde ? -1 : 1);
    orden.forEach((g, i) => {
      const quien = `${club} · ${g.nombre || '?'}`;
      if (!g.nombre || !g.corto || !g.cargo) add('P1', 'gestion-incompleta', `${quien}: falta nombre, corto o cargo`);
      if (!fecha.test(g.desde || '') || (g.hasta != null && !fecha.test(g.hasta))) add('P1', 'gestion-fecha', `${quien}: desde/hasta tienen que ser AAAA-MM-DD (hasta puede ser null)`);
      else if (g.hasta != null && g.hasta <= g.desde) add('P1', 'gestion-fecha', `${quien}: "hasta" (${g.hasta}) no es posterior a "desde" (${g.desde})`);
      if (g.confirmada && !g.fuente) add('P1', 'gestion-sin-fuente', `${quien}: confirmada sin fuente; o se le pone la fuente o confirmada:false`);
      const sig = orden[i + 1];
      if (sig && (g.hasta == null || g.hasta > sig.desde)) add('P1', 'gestiones-superpuestas', `${club}: ${g.nombre} (hasta ${g.hasta || 'hoy'}) se pisa con ${sig.nombre} (desde ${sig.desde})`);
    });
  }
  const partes = (id) => { const i = id.lastIndexOf('-'); return { slug: id.slice(0, i), pais: id.slice(i + 1) }; };
  const porPais = {};
  for (const id of sinBalance) (porPais[partes(id).pais] = porPais[partes(id).pais] || []).push(id);
  for (const [pais, ids] of Object.entries(porPais)) {
    add('P3', 'gestion-club-inexistente', `${ids.length} clubes con gestión y sin balance (${pais}): ${ids.join(', ')} — las gestiones se cargan por país antes que los balances`);
    for (const id of ids) {
      const { slug } = partes(id);
      // «se parece» = mismo país, mismos cinco primeros caracteres del slug (Auditora 5) Y a lo sumo 2 letras de distancia: sin lo segundo,
      // «deportestolima» y «deportivopereira» (dos clubes distintos de Colombia) comparten «depor» y darían un P1 falso, que frena los commits.
      const dist = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
      const parecido = Object.keys(api.clubs).find((c) => { const p = partes(c); return p.pais === pais && p.slug.slice(0, 5) === slug.slice(0, 5) && dist(p.slug, slug) <= 2; });
      if (parecido) add('P1', 'gestion-id-sospechoso', `data/gestiones: '${id}' no está en data/clubs.js pero se parece a '${parecido}' (mismo país y mismos cinco primeros caracteres): ¿id mal escrito?`);
    }
  }
}

function checkHigiene(api) {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  // ASSET_V: si hay cambios sin commitear en js/ o data/ y index.html no se tocó,
  // el `?v=` quedó viejo y un visitante que ya entró antes se queda con el JS viejo.
  try {
    // stdio: la stderr se descarta a propósito — fuera de un repo git esto tira
    // "fatal: not a git repository" y ese ruido no es un hallazgo de auditoría.
    const st = execSync('git status --porcelain', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().split('\n').filter(Boolean)
      .map(l => l.slice(3).trim());
    // data/schema/ (el JSON Schema del 245) no lo carga ninguna página: no hay caché del navegador que invalidar
    const tocaCodigo = st.some(f => f.startsWith('js/') || (f.startsWith('data/') && !f.startsWith('data/schema/')));
    const tocaIndex = st.some(f => f === 'index.html');
    if (tocaCodigo && !tocaIndex) {
      add('P1', 'asset-v-sin-subir', `Hay cambios sin commitear en js/ o data/ pero index.html no se tocó: ASSET_V quedó igual y el visitante recurrente se queda con el archivo viejo cacheado`);
    }
  } catch { /* sin git, no es un error de datos */ }

  // ASSET_V, la otra mitad (Versión 125): los `?v=` de los <script src> estáticos
  // son LITERALES, no salen de la constante, subir `window.ASSET_V` y olvidarse
  // de los tags deja al navegador sirviendo los archivos viejos de su caché, con
  // el HTML nuevo. Pasó de verdad al migrar los fx: `currency-map.js` llegó
  // cacheado sin `fxMetaFor()` mientras `finanzas-calc.js` ya lo llamaba, y la
  // página entera tiró ReferenceError. Es invisible salvo que se compare.
  try {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const declarada = (html.match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1];
    const enTags = [...new Set([...html.matchAll(/<script src="(?:js|data)\/[^"]*\?v=([^"]+)"/g)].map(m => m[1]))];
    const desfasados = enTags.filter(v => v !== declarada);
    if (declarada && desfasados.length) {
      add('P1', 'asset-v-desfasado', `index.html declara ASSET_V '${declarada}' pero sus <script src> piden ?v=${desfasados.join(', ?v=')}, el visitante recibe el HTML nuevo con los js/data viejos de su caché`);
    }
  } catch { /* sin index.html legible no hay nada que comparar */ }

  // i18n: una clave usada y no definida degrada al castellano en silencio.
  const usadas = new Set();
  for (const m of html.matchAll(/data-i18n(?:-title)?="([^"]+)"/g)) usadas.add(m[1]);
  // Versión 162: `tools/generate-fuentes-page.js` también EMITE atributos data-i18n, para
  // `fuentes.html` y para las N páginas por club. No estaba en ningún escaneo, así que una
  // clave nueva de esas páginas quedaba invisible: el chequeo pasaba en verde mientras el
  // visitante de habla inglesa las leía en castellano. Es la misma regla que ya existía para
  // los archivos de `js/` que llaman a `t()`, extendida a quien genera HTML.
  // Se saltean las claves interpoladas (`data-i18n="${...}"`): el valor real se arma en
  // runtime, igual que las que terminan en "." más abajo.
  {
    const gen = fs.readFileSync(path.join(ROOT, 'tools/generate-fuentes-page.js'), 'utf8');
    for (const m of gen.matchAll(/data-i18n(?:-title)?="([^"$]+)"/g)) usadas.add(m[1]);
  }
  // Versión 137: se suma js/selector.js (js/comparar-clubes.js estuvo en esta lista
  // hasta la Versión 152, cuando ese archivo se borró). Sin esto el chequeo
  // miraba 3 archivos fijos y las claves nuevas del selector y de la comparación no
  // se contaban, o sea que el chequeo pasaba mientras el visitante veía castellano.
  // Hoy se leen TODOS los `js/*.js` más index.html, así un archivo nuevo de js/ (js/principal.js, js/cuenta.js) no queda afuera. Salvo
  // js/i18n.js: es el motor de t() y sus `t('clave', ...)` son ejemplos de su cabecera, no claves del sitio.
  for (const rel of [...fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js') && f !== 'i18n.js').sort().map(f => 'js/' + f), 'index.html']) { // (Versión 515) + js/liga.js, que llamaba a t() y no estaba; (Versión 535) + los dos archivos del to-do 147
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // Una clave que termina en "." no es una clave sino un PREFIJO de clave dinámica
    // (`t('fx.source.' + meta.fxSource, ...)`): el valor real se arma en runtime y no se
    // puede resolver leyendo el código. Se saltea en vez de reportarla como sin traducir.
    for (const m of src.matchAll(/\bt\(\s*'([a-z0-9_.]+)'/gi)) { if (!m[1].endsWith('.')) usadas.add(m[1]); }
  }
  for (const f of fs.readdirSync(path.join(ROOT, 'data/lang')).filter(f => f.endsWith('.js') && f !== 'langs.js')) {
    const src = fs.readFileSync(path.join(ROOT, 'data/lang', f), 'utf8');
    // Comillas simples O dobles (arreglado en la Versión 125): el regex solo aceptaba
    // simples y `data/lang/en.js` escribe sus 134 claves con dobles, así que `definidas`
    // quedaba VACÍO y el chequeo reportaba como "sin traducir" absolutamente todas las
    // claves usadas, de ahí las "88 claves" de la primera corrida, que no era el número real.
    const definidas = new Set([...src.matchAll(/^\s*['"]([^'"]+)['"]\s*:/gm)].map(m => m[1]));
    const faltan = [...usadas].filter(k => !definidas.has(k)).sort();
    if (faltan.length) {
      add('P3', 'i18n-incompleto', `data/lang/${f}: ${faltan.length} claves usadas en el sitio sin traducción (el visitante las ve en castellano): ${faltan.slice(0, 6).join(', ')}${faltan.length > 6 ? '…' : ''}`);
    }
  }

  // Chart.js: un chart que se recrea sin destruir el anterior es la fuga clásica.
  const render = fs.readFileSync(path.join(ROOT, 'js/finanzas-render.js'), 'utf8');
  const news = (render.match(/new Chart\(/g) || []).length;
  const destroys = (render.match(/\.destroy\(\)/g) || []).length;
  if (news > destroys) {
    add('P2', 'chart-sin-destroy', `js/finanzas-render.js: ${news} \`new Chart(\` contra ${destroys} \`.destroy()\` — revisar que todo re-render destruya la instancia anterior`);
  }
}

// ---------------------------------------------------------------------------
// 4. SALIDA
// ---------------------------------------------------------------------------
const SEV_TITULO = {
  P0: 'P0 — un número publicado está mal, o puede estarlo',
  P1: 'P1 — algo roto o ausente que el visitante ve',
  P2: 'P2 — riesgo: no está mal hoy, se rompe o no escala mañana',
  P3: 'P3 — limpieza e informativo',
};

function imprimir(api) {
  const nClubes = Object.keys(api.generic).length;
  const nAños = [...clubYears(api)].length;
  const cuenta = s => findings.filter(f => f.sev === s).length;

  console.log(`\nAUDITORÍA finance-of-sports — ${nClubes} clubes, ${nAños} ejercicios`);
  console.log(`P0 ${cuenta('P0')} · P1 ${cuenta('P1')} · P2 ${cuenta('P2')} · P3 ${cuenta('P3')}` +
    (silenciados.length ? ` · ${silenciados.length} silenciados por tools/audit-ignore.json` : '') + '\n');

  for (const sev of ['P0', 'P1', 'P2', 'P3']) {
    if (QUIET && (sev === 'P2' || sev === 'P3')) continue;
    const list = findings.filter(f => f.sev === sev);
    if (!list.length) continue;
    console.log(`${'='.repeat(78)}\n${SEV_TITULO[sev]}  (${list.length})\n${'='.repeat(78)}`);
    const porCodigo = {};
    for (const f of list) (porCodigo[f.code] = porCodigo[f.code] || []).push(f);
    for (const [code, fs_] of Object.entries(porCodigo)) {
      console.log(`\n  [${code}] ${fs_.length}`);
      for (const f of fs_.slice(0, 8)) console.log(`    · ${f.msg}`);
      if (fs_.length > 8) console.log(`    · … y ${fs_.length - 8} más (usá --json para la lista completa)`);
    }
    console.log('');
  }
}

// `--fx`: la planilla de tipos de cambio, un renglón por club-ejercicio. El
// resto del script reporta lo que está MAL; esto muestra lo que HAY, que es la
// pregunta con la que nació el campo `fxSource` (Guido, Versión 125: "si yo
// mañana quiero auditar los tipos de cambio usado para cada club para cada año
// y entender si salieron de internet o del club"). Sale ordenado por moneda y
// año para que dos clubes con el mismo cierre queden uno al lado del otro, que
// es como se ve a simple vista si alguno desentona.
function listarFx(api) {
  const filas = [];
  const fila = (clubId, year, meta, sufijo) => {
    const f = api.fxMetaFor(meta);
    if (f.fx == null) return;
    filas.push({
      moneda: meta.currency, year, clubId: clubId + (sufijo || ''), fx: f.fx,
      procedencia: f.source,
      origen: f.ref ? `${f.ref}, ${f.label}` : (api.FX_SOURCE[f.source] || {}).label || f.source,
    });
  };
  for (const { clubId, year, ym } of clubYears(api)) fila(clubId, year, ym);
  // Un ejercicio con balance Y presupuesto cargados tiene DOS tipos de cambio, y el
  // del presupuesto suele ser una premisa distinta a la del cierre del mismo año
  // (Racing 2020: el balance declara 73,98 y el presupuesto asumió 70). El overlay
  // pinta una columna que el visitante ve, así que también se audita.
  for (const clubId of Object.keys(api.generic).sort()) {
    const ov = api.generic[clubId].presupuestoOverlayByYear || {};
    for (const year of Object.keys(ov).map(Number).sort((a, b) => a - b)) fila(clubId, year, ov[year], ' (presup.)');
  }
  filas.sort((a, b) => a.moneda.localeCompare(b.moneda) || a.year - b.year || a.clubId.localeCompare(b.clubId));

  const w = k => Math.max(...filas.map(f => String(f[k]).length));
  const [wc, wf, wp] = [w('clubId'), w('fx'), w('procedencia')];
  let monedaActual = null;
  console.log(`TIPOS DE CAMBIO, ${filas.length} club-ejercicios (moneda nativa por 1 USD)\n`);
  for (const f of filas) {
    if (f.moneda !== monedaActual) { console.log(`${monedaActual ? '\n' : ''}${f.moneda}`); monedaActual = f.moneda; }
    console.log(`  ${f.year}  ${f.clubId.padEnd(wc)}  ${String(f.fx).padStart(wf)}  ${f.procedencia.padEnd(wp)}  ${f.origen}`);
  }
  const porFuente = filas.reduce((a, f) => ({ ...a, [f.procedencia]: (a[f.procedencia] || 0) + 1 }), {});
  console.log('\nPor procedencia: ' + Object.entries(porFuente).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '));
  console.log('Lo que declara un documento va literal en el archivo del club; lo que es cotización de mercado sale de FX_CLOSE (data/currency-map.js).');
}

// ---------------------------------------------------------------------------
// DATOS COMO JSON CON ESQUEMA (to-do 245, fase 2): el JSON de cada club (data/<país>/<id>.json) es la FUENTE. Que valide contra el esquema (`json-no-valida`)
// y que el data file generado coincida con él (`json-js-desfasado`) lo chequean, como P1, los generadores de checkGenerados() (validar-esquema-json.mjs y
// generar-data.mjs --check). Acá van solo los AVISOS del validador (el JSON valida pero tiene algo raro: una fuente o una gestión que vive fuera del archivo),
// P2 que no frenan.
// ---------------------------------------------------------------------------
function checkDatosJson() {
  let J;
  try { J = require('./json-datos.mjs'); } catch (e) { add('P2', 'json-aviso', `no se pudo cargar tools/json-datos.mjs: ${e.message}`); return; }
  const categorias = J.categoriasDelSitio(); const externos = J.referenciasExternas();
  for (const rel of archivosData()) {
    const id = idDeArchivo(rel); const rj = rel.replace(/-data\.js$/, '.json');
    if (!fs.existsSync(path.join(ROOT, rj))) { add('P1', 'json-no-valida', `${id}: no tiene su JSON fuente (${rj}); el data file se genera de ahí`); continue; }
    let j; try { j = JSON.parse(fs.readFileSync(path.join(ROOT, rj), 'utf8')); } catch (e) { continue; }
    const r = J.validar(j, { categorias, externos });
    for (const m of r.avisos.slice(0, 3)) add('P2', 'json-aviso', `${id}: ${m}`);
  }
}

// (to-do 329) Las reglas de categoría de Admin/CONVENCIONES-DATOS.md (líneas «CATEGORÍA (prompt)» y «EJEMPLO-CATEGORÍA») tienen que ser válidas y sus ejemplos tienen que estar
// registrados en categorias-aprendidas.jsonl (tools/reglas-categoria.mjs --escribir). Aviso, no frena.
function checkReglasCategoria() {
  let out = ''; let fallo = false;
  try { out = execSync('node tools/reglas-categoria.mjs', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString(); }
  catch (e) { out = String(e.stdout || e.stderr || ''); fallo = true; }
  const lineas = out.split('\n').map((l) => l.trim()).filter(Boolean);
  if (fallo) add('P2', 'regla-categoria-invalida', lineas.filter((l) => l.startsWith('ERROR')).slice(0, 3).join(' | ') || lineas.slice(-1)[0] || 'tools/reglas-categoria.mjs falló');
  else if (lineas.filter((l) => l.startsWith('falta registrar')).length) add('P2', 'regla-categoria-sin-registrar', `${lineas.filter((l) => l.startsWith('falta registrar')).length} ejemplo(s) de reglas de categoría sin registrar: node tools/reglas-categoria.mjs --escribir`);
}

// (to-do 339) Cada deporte activo (o con taxonomía) tiene su tabla de «ceros que no pueden ser cero» en tools/deporte-club.mjs (CEROS_POR_DEPORTE; [] si la vacía es a propósito) y su taxonomía.
function checkDeportes() {
  let out = ''; let fallo = false;
  try { out = execSync('node tools/deporte-club.mjs', { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString(); }
  catch (e) { out = String(e.stdout || e.stderr || ''); fallo = true; }
  const lineas = out.split('\n').map((l) => l.trim()).filter(Boolean);
  if (fallo) add('P2', 'deporte-sin-tabla', lineas.filter((l) => l.startsWith('ERROR')).slice(0, 3).join(' | ') || lineas.slice(-1)[0] || 'tools/deporte-club.mjs falló');
}

// (to-do 339 c) LA COMA DECIMAL QUE EL OCR SE COME. Una tabla en £m / M con un decimal sale de la transcripción con «Central income 5.3 74 (2.1)» por 7.4 (Bath 2023-24 L162).
// Regla: una fila de tres cifras A B C con al menos una con decimal, donde C NO es la diferencia de A y B, pero SÍ lo es si un entero sin coma (A o B) se divide por 10.
// Aviso P2, no frena nada: Admin/mediciones/339-condicion-coma.md (medida: 4 marcadas en 3.677 .md, 0 falsas). Se silencia con tools/audit-ignore.json (code coma-comida) tras mirar la fuente.
// Una cifra registrada en Admin/registros/rarezas.jsonl (tools/rarezas.mjs: ya se miró y es así en el documento) no se marca; otra cifra de la misma tabla, sí.
function checkComaComida() {
  const R = path.join(ROOT, 'Clubes'); const R_ = require('./rarezas.mjs');
  const num = (t) => { const neg = /^\(.*\)$/.test(t) || t.startsWith('-'); const v = parseFloat(t.replace(/[()\-,]/g, '')); return neg ? -v : v; };
  const TOK = '(\\(?-?\\d+\\.\\d\\)?|\\(?-?\\d+\\)?)';
  const re = new RegExp('^[|\\s]*([A-Za-z][^|\\d]{2,60}?)[|\\s]+' + TOK + '[|\\s]+' + TOK + '[|\\s]+' + TOK + '[|\\s]*$');
  const cierra = (a, b, c) => Math.abs(a - b - c) <= 0.051 || Math.abs(b - a - c) <= 0.051;
  const walk = (d) => { for (const e of fs.readdirSync(d)) { const f = path.join(d, e); const st = fs.statSync(f, { throwIfNoEntry: false }); if (!st) continue; /* un enlace a un PDF que ya no está (worktree) */ if (st.isDirectory()) walk(f); else if (f.endsWith('.md')) leer(f); } };
  const leer = (f) => {
    fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
      const m = l.match(re); if (!m) return;
      const t = [m[2], m[3], m[4]]; if (!t.some((x) => x.includes('.'))) return;
      const [a, b, c] = t.map(num); if (cierra(a, b, c)) return;
      for (const k of [0, 1]) {
        const v = [a, b]; v[k] = v[k] / 10;
        if (!t[k].includes('.') && cierra(v[0], v[1], c) && !R_.rarezaEn(path.relative(ROOT, f), i + 1, t[k])) { add('P2', 'coma-comida', `${path.relative(ROOT, f)} L${i + 1}: «${l.trim().slice(0, 80)}» — la cifra ${k + 1} (${t[k]}) parece haber perdido la coma decimal (con ÷10 la fila cierra); corregir el .md o silenciar tras mirar el documento`); break; }
      }
    });
  };
  if (fs.existsSync(R)) walk(R);
}

// LAS RAREZAS QUE PERDIERON SU TEXTO (tools/rarezas.mjs, regla de CONVENCIONES «UNA RAREZA DEL DOCUMENTO YA REVISADA…»). Una rareza cubre un hallazgo
// solo si su texto sigue en su línea ±3; si una re-transcripción lo movió, ya no cubre nada (no tapa, pero la revisión se pierde): hay que moverla.
function checkRarezas() {
  const R_ = require('./rarezas.mjs');
  for (const r of R_.sinSuTexto()) add('P3', 'rareza-sin-su-texto', `Admin/registros/rarezas.jsonl: ${r.md}:${r.linea} «${r.texto}» ya no está en esa línea ±3 (¿se re-transcribió?). Buscá el texto en el .md y registrala de nuevo con tools/rarezas.mjs, o sacala`);
}

// (to-do 339) PRUEBA DE DEPORTE: por cada deporte con taxonomía distinto del fútbol se arma EN MEMORIA un club de muestra (una línea por subcategoría de ingreso y de gasto) y se
// corren con él TODOS los chequeos. Nada de lo que la muestra provoque como P0 o P1 puede ser por el deporte: si pasa, es un chequeo con una lista o un id del fútbol fijo y sale como
// P1 `deporte-muestra`. Los P2 y P3 de la muestra (sin fuente, sin total oficial...) son ruido de ser sintético y no se publican. Cuando se cargue un club real de ese deporte
// (Bath Rugby), el mismo `node tools/audit.js` lo audita con la misma exigencia.
const MUESTRAS = [];
function montarMuestras(api) {
  for (const [dep, t] of Object.entries(api.SPORT_TAXONOMIES)) {
    if (dep === 'futbol') continue;
    const id = `muestra${dep}-gb`; const lineas = (lado, signo) => Object.keys(t[lado]).map((c, i) => ({ rawLabel: `muestra ${c}`, normalizedCategory: c, amountNative: signo * (i + 1) }));
    api.clubs[id] = { id, name: `Muestra ${dep}`, displayName: `Muestra ${dep}`, country: 'GB', reportingCurrency: 'GBP', fiscalYearStart: '07-01', sport: dep, brandColor: null };
    api.generic[id] = { revenueLinesByYear: { 2024: lineas('revenue', 1) }, expenseLinesByYear: { 2024: lineas('expense', -1) }, fiscalYearMeta: { 2024: { currency: 'GBP', fx: 1.25, reportType: 'official_balance_sheet' } } };
    MUESTRAS.push(id);
  }
}
// Segunda pasada, DESPUÉS de todos los chequeos reales y sin mezclarse con ellos (la muestra no cuenta como club en ningún total): se arma la muestra, se corren los chequeos que miran
// datos de clubes, y de lo que da solo se conserva lo P0/P1 que nombra a la muestra. `club-sin-archivo` es de ser sintética (no tiene data file) y no cuenta.
function pruebaDeDeporte(api) {
  const n0 = findings.length, s0 = silenciados.length;
  montarMuestras(api);
  if (!MUESTRAS.length) return;
  // Un chequeo que tira una excepción con un deporte nuevo no puede tirar abajo el informe de los datos reales: sale como P1 deporte-muestra con el nombre del chequeo.
  const excepciones = [];
  try {
    for (const chequeo of [checkEstructura, checkTieOuts, checkCategorias, checkLineas, checkMoneda, checkCajaDeudaProporcion, checkFxProcedencia, checkFuentesPublicas, checkClubIds, checkLigasPorEjercicio, checkRankings, checkCategorizacion, checkEscala, checkHigiene, checkGestiones]) {
      try { chequeo(api); } catch (e) { excepciones.push({ chequeo: chequeo.name, mensaje: String((e && e.message) || e).slice(0, 200) }); }
    }
  } finally {
    // limpieza pase lo que pase: la muestra y la sonda nunca quedan en los datos que usa el resto de la corrida
    for (const id of MUESTRAS) { delete api.clubs[id]; delete api.generic[id]; }
    delete api.clubs['__sonda_de_auditoria__']; delete api.generic['__sonda_de_auditoria__'];
  }
  const malos = findings.slice(n0).filter(f => MUESTRAS.some(id => f.msg.includes(id)) && (f.sev === 'P0' || f.sev === 'P1') && f.code !== 'club-sin-archivo');
  findings.length = n0; silenciados.length = s0;
  for (const x of excepciones) findings.push({ sev: 'P1', code: 'deporte-muestra', msg: `el chequeo ${x.chequeo}() tiró una excepción con el club de muestra (${MUESTRAS.join(', ')}): ${x.mensaje}` });
  for (const f of malos) findings.push({ sev: 'P1', code: 'deporte-muestra', msg: `el club de muestra de ${MUESTRAS.find(id => f.msg.includes(id)).replace(/^muestra|-gb$/g, '')} da ${f.sev} ${f.code}: ${f.msg.slice(0, 220)}` });
}

// (to-do 317, aprobado por la Auditora 4) EJERCICIO SIN RASTRO. Un club-año entre el primer ejercicio cargado de un club y el más reciente cargado de su país que ni está
// cargado ni figura en data/faltantes/ con ningún estado (buscado, en-mano, sin-buscar: esos ya tienen su lugar). Cubre el hueco entre dos ejercicios y la cola hasta el último año del país.
// P3 por club, con la lista de años. Se silencia por club en tools/audit-ignore.json, con motivo, después de mirarlo. Medido al nacer: 84 club-años en 51 clubes (24 de hueco y 60 de cola).
const { temporada: temporadaDe } = require('./temporada.js'); // la misma que usa tools/faltantes-liga.mjs
function checkEjercicioSinRastro() {
  const RECIENTE_MESES = 9; // el mismo de tools/faltantes-liga.mjs (Guido, 2026-10-17): si cambia allá, cambia acá (el .mjs corre su main al importarlo)
  const dirFal = path.join(ROOT, 'data/faltantes');
  if (!fs.existsSync(dirFal)) return;
  const enFaltantes = {}; // clubId -> Set de años, con cualquier estado
  for (const f of fs.readdirSync(dirFal).filter((x) => x.endsWith('.js'))) {
    const w = { window: {} };
    try { vm.runInNewContext(fs.readFileSync(path.join(dirFal, f), 'utf8'), w); } catch (e) { continue; }
    for (const liga of Object.values(w.window.LEAGUE_GAPS || {})) {
      for (const [y, o] of Object.entries(liga)) for (const x of (o.faltan || [])) if (x.id) (enFaltantes[x.id] = enFaltantes[x.id] || new Set()).add(Number(y));
    }
  }
  const clubes = []; const maxPais = {};
  for (const rel of archivosData()) {
    const rj = path.join(ROOT, rel.replace(/-data\.js$/, '.json'));
    let j; try { j = JSON.parse(fs.readFileSync(rj, 'utf8')); } catch (e) { continue; }
    const anios = (j.years || []).map((y) => y.fiscal_year).filter((y) => Number.isFinite(y));
    if (!anios.length) continue;
    const iso = path.basename(path.dirname(rj));
    clubes.push({ id: j.club.id, iso, anios, cruza: j.club.fiscal_year_start !== '01-01', fys: j.club.fiscal_year_start });
    // El máximo del país no cuenta presupuestos puros (official_budget): un presupuesto no es un balance cargado (Auditora 4: 51 -> 38 clubes).
    const reales = (j.years || []).filter((y) => y.report_type !== 'official_budget').map((y) => y.fiscal_year).filter((y) => Number.isFinite(y));
    maxPais[iso] = Math.max(maxPais[iso] || 0, ...reales);
  }
  for (const c of clubes.sort((a, b) => a.id.localeCompare(b.id))) {
    const tiene = new Set(c.anios); const fal = enFaltantes[c.id] || new Set();
    // data/faltantes/ está por TEMPORADA (la que termina en el año de la lista); el ejercicio, por fiscal_year. La misma función que faltantes-liga.mjs (tools/temporada.js) los traduce: un ejercicio que cierra
    // entre septiembre y diciembre de y (FCK, 31/12) es de la temporada y+1 en una liga de temporada partida (Auditora 5). Se busca en data/faltantes/ con la clave del año y con la de la temporada.
    const enFal = (y) => fal.has(y) || fal.has(temporadaDe({ fiscalYearStart: c.fys }, y, true));
    const ultimo = Math.max(...c.anios); const hueco = []; const cola = [];
    for (let y = Math.min(...c.anios); y <= maxPais[c.iso]; y++) {
      if (tiene.has(y) || enFal(y)) continue;
      // Un año cerrado hace menos de RECIENTE_MESES todavía no lo publicó nadie: no es una falta (misma cuenta que tools/faltantes-liga.mjs). La salida depende de la fecha de hoy.
      const cierre = new Date(Date.UTC(y, c.cruza ? 5 : 11, c.cruza ? 30 : 31));
      if ((new Date() - cierre) / (1000 * 60 * 60 * 24 * 30.44) < RECIENTE_MESES) continue;
      (y < ultimo ? hueco : cola).push(y);
    }
    if (!hueco.length && !cola.length) continue;
    const partes = [];
    if (hueco.length) partes.push(`hueco ${hueco.join(', ')}`);
    if (cola.length) partes.push(`sin cargar después de ${ultimo}: ${cola.join(', ')}`);
    add('P3', 'ejercicio-sin-rastro', `${c.id}: ${partes.join('; ')}. Ni cargado ni en data/faltantes/ (buscado, en-mano o sin-buscar). Si no hay documento publicado, silenciarlo en tools/audit-ignore.json con el motivo`);
  }
}

// --- DÓNDE QUEDA LO QUE SE DECIDE O SE DESCUBRE (Admin/propuestas/330-donde-se-pierde.md; los tres, P3) ----------------------------------
// duda-resuelta-en-dudas: una pregunta resuelta se mueve a la evidencia del club (Admin/carga-clubes/<id>.md) y se borra de dudas-por-club.md;
// la lista es lo que Guido usa para escribirle a los clubes, y una respuesta escrita adentro de la pregunta la esconde entre las abiertas.
function checkDudasResueltas() {
  const f = path.join(ROOT, 'Admin', 'dudas-por-club.md');
  if (!fs.existsSync(f)) return;
  const lineas = fs.readFileSync(f, 'utf8').split('\n');
  const hits = [];
  lineas.forEach((l, i) => { if (/\bRESUELT[OA]\b|Sin preguntas pendientes/.test(l)) hits.push(i + 1); });
  if (hits.length) add('P3', 'duda-resuelta-en-dudas', `Admin/dudas-por-club.md: ${hits.length} línea(s) con una pregunta ya resuelta (${hits.slice(0, 8).join(', ')}${hits.length > 8 ? ', …' : ''}). Pasá la respuesta a Admin/carga-clubes/<clubId>.md (y el criterio, si sirve a otros clubes, a CONVENCIONES-DATOS.md) y borrá la pregunta de la lista`);
}

// Quién "lee" un archivo: una tool (tools/, js/), una skill o un documento de criterio. ESTADO, TODO y CHANGELOG no cuentan: nombrar no es leer.
const LECTORES_DOCS = ['PIPELINE', 'CONVENCIONES', 'CONVENCIONES-DATOS', 'ARQUITECTURA', 'PANTALLA', 'HALLAZGOS-pipeline'];
function textoDeLectores() {
  const partes = [];
  const leerCarpeta = (rel, ext) => {
    let es; try { es = fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true }); } catch { return; }
    for (const e of es) {
      const r = `${rel}/${e.name}`;
      if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'archivo') leerCarpeta(r, ext); }
      else if (ext.test(e.name)) { try { partes.push(fs.readFileSync(path.join(ROOT, r), 'utf8')); } catch { /* enlace roto */ } }
    }
  };
  leerCarpeta('tools', /\.(mjs|js|json)$/);
  leerCarpeta('js', /\.js$/);
  for (const f of mdsDeSkills()) partes.push(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  for (const d of LECTORES_DOCS) { try { partes.push(fs.readFileSync(path.join(ROOT, 'Admin', `${d}.md`), 'utf8')); } catch { /* falta */ } }
  return partes.join('\n');
}

// registro-sin-lector: cada archivo de Admin/registros/ lo escribe y lo lee alguien. Uno que ninguna tool, skill ni documento de criterio nombra es un
// registro que se llena sin que nadie lo vea. Los que empiezan con punto son listas de corrida de lote.mjs y quedan afuera.
function checkRegistrosSinLector() {
  const dir = path.join(ROOT, 'Admin', 'registros');
  if (!fs.existsSync(dir)) return;
  const texto = textoDeLectores();
  const sin = fs.readdirSync(dir).filter(n => !n.startsWith('.') && !texto.includes(n)).sort();
  for (const n of sin) add('P3', 'registro-sin-lector', `Admin/registros/${n}: ninguna tool, skill ni documento de criterio lo nombra. Si alguien lo lee, que lo diga (una línea en PIPELINE.md); si no, archivalo`);
}

// medicion-sin-destino: cada archivo de Admin/mediciones/ lo cita una tool, una skill o un documento de criterio (HALLAZGOS, PIPELINE,
// CONVENCIONES*, ARQUITECTURA, PANTALLA), o está listado con su destino en Admin/mediciones/README.md. Una medición que no cambió nada y no
// dejó una línea en HALLAZGOS se paga otra vez en la próxima sesión.
function checkMedicionesSinDestino() {
  const dir = path.join(ROOT, 'Admin', 'mediciones');
  if (!fs.existsSync(dir)) return;
  const texto = textoDeLectores();
  let indice = ''; try { indice = fs.readFileSync(path.join(dir, 'README.md'), 'utf8'); } catch { /* sin índice */ }
  const sin = fs.readdirSync(dir).filter(n => n !== 'README.md' && !n.startsWith('.') && !texto.includes(n) && !indice.includes(n)).sort();
  if (sin.length) add('P3', 'medicion-sin-destino', `Admin/mediciones/: ${sin.length} archivo(s) sin destino: ${sin.slice(0, 6).join(', ')}${sin.length > 6 ? ', …' : ''}. Cada medición queda citada por HALLAZGOS-pipeline.md, PIPELINE.md o una regla, o listada con su destino en Admin/mediciones/README.md`);
}

function main() {
  let api;
  try { api = loadEngine(); }
  catch (e) { console.error(`ERROR cargando el motor: ${e.message}`); process.exit(2); }

  if (ARGS.includes('--fx')) { listarFx(api); return; }

  checkEstructura(api);
  checkTieOuts(api);
  checkCategorias(api);
  checkLineas(api);
  checkMoneda(api);
  checkCajaDeudaProporcion(api);
  checkFxProcedencia(api);
  checkFuentesPublicas(api);
  checkClubIds(api);
  checkCarpetasClubes();
  checkArchivoNoEsLoQueDice();
  checkColisionSourcing(api);
  checkLigasPorEjercicio(api);
  checkGenerados();
  checkCorreccionesSinMotivo();
  checkRankings(api);
  checkCategorizacion(api);
  checkEscala(api);
  checkDeployInterno();
  checkIndexFileRoto();
  checkSponsorBusqueda();
  checkComentariosPublicados();
  checkParrafoNetlifyDuplicado();
  checkRutasMuertas();
  checkHistoriaEnDocs();
  checkDudasResueltas();
  checkRegistrosSinLector();
  checkMedicionesSinDestino();
  checkParrafosRepetidos();
  checkRayaLarga();
  checkHigiene(api);
  checkGestiones(api);
  checkPagoSobreDeterminista();
  checkLigaDosFuentes(api);
  checkDatosJson();
  checkReglasCategoria();
  checkDeportes();
  checkComaComida();
  checkRarezas();
  checkEjercicioSinRastro();
  pruebaDeDeporte(api);
  checkTodo();
  // una entrada de audit-ignore.json que ya no silencia nada (el hallazgo se arregló o el chequeo cambió) es peso muerto y esconde un silencio viejo: P3
  const sinUso = IGNORADOS.filter((i) => !reglasUsadas.has(i) && i.code !== '_ejemplo_no_activo');
  if (ARGS.includes('--podar-ignore') && sinUso.length) { // saca esas entradas del archivo (el historial queda en git); el resto se escribe tal cual
    fs.writeFileSync(IGNORE_FILE, JSON.stringify(IGNORADOS.filter((i) => !sinUso.includes(i)), null, 1) + '\n', 'utf8');
    console.error(`audit-ignore.json: ${sinUso.length} entradas sin uso sacadas`);
  }
  if (sinUso.length) add('P3', 'audit-ignore-sin-uso', `${sinUso.length} entradas de tools/audit-ignore.json no silencian nada hoy (sacarlas): ${sinUso.slice(0, 6).map((i) => `${i.code} «${String(i.match).slice(0, 40)}»`).join('; ')}${sinUso.length > 6 ? '; …' : ''}`);

  // CUANDO PASA X, SE HACE Y: cada código que dispara tiene su acción en tools/audit-acciones.json (qué hacer, quién, dónde está cubierto). Uno que dispara sin entrada da P3.
  let ACCIONES = {}; try { ACCIONES = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/audit-acciones.json'), 'utf8')); } catch { /* sin archivo: todos los códigos dan codigo-sin-accion */ }
  const sinAccion = [...new Set(findings.map((f) => f.code))].filter((c) => !ACCIONES[c] && c !== 'codigo-sin-accion');
  if (sinAccion.length) add('P3', 'codigo-sin-accion', `${sinAccion.length} códigos de audit.js sin entrada en tools/audit-acciones.json (qué hacer cuando disparan): ${sinAccion.join(', ')}`);
  if (ARGS.includes('--acciones')) { // la tabla de lo que dispara hoy: código · cuántos · quién · qué hacer
    const por = {}; for (const f of findings) { por[f.code] = por[f.code] || { sev: f.sev, n: 0 }; por[f.code].n++; }
    const orden = { P0: 0, P1: 1, P2: 2, P3: 3 };
    for (const [c, v] of Object.entries(por).sort((x, y) => orden[x[1].sev] - orden[y[1].sev] || y[1].n - x[1].n)) {
      const a = ACCIONES[c]; console.log(`${v.sev} ${String(v.n).padStart(3)}  ${c.padEnd(28)} ${a ? `[${a.quien}] ${a.hacer}${a.donde ? ` (${a.donde})` : ''}` : '(sin acción en tools/audit-acciones.json)'}`);
    }
    return;
  }

  const bloqueantes = findings.filter(f => f.sev === 'P0' || f.sev === 'P1').length;
  // (to-do 301) process.exit antes de vaciar stdout cortaba el JSON a los 64 KB en un pipe: con --json se sale cuando la escritura terminó.
  if (JSON_OUT) { process.stdout.write(JSON.stringify({ findings, silenciados }, null, 2) + '\n', () => process.exit(bloqueantes ? 1 : 0)); return; }
  imprimir(api);
  process.exit(bloqueantes ? 1 : 0);
}

main();
