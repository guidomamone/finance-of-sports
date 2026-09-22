#!/usr/bin/env node
// ============================================================================
// tools/audit.js — auditoría determinista del proyecto entero, en Node.
//
// EL PROBLEMA QUE RESUELVE: `auditAll()` (index.html, Versión 118) verifica que
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
//     `club-or-year-onboarding`, sección 8). Esto audita CONSISTENCIA, no fuente.
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

  // Globals que `js/finanzas-calc.js` espera del <script> de index.html, no de
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
    ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js')).sort().map(f => 'data/' + f),
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
    computeYearGeneric, toDisplayValue, bucketize, yearMetaFor,
    REVENUE_CATEGORIES, EXPENSE_CATEGORIES,
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
const add = (sev, code, msg) => {
  const regla = IGNORADOS.find(i => i.code === code && msg.includes(i.match));
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
    if (!api.clubs[id]) add('P1', 'archivo-sin-club', `${id}: tiene data/${id}-data.js pero no está en data/clubs.js, el sitio nunca lo muestra`);
  }
  for (const id of Object.keys(api.clubs)) {
    if (!fs.existsSync(path.join(ROOT, 'data', `${id}-data.js`))) {
      add('P1', 'club-sin-archivo', `${id}: está en clubs.js pero no existe data/${id}-data.js, loadClubData() va a dar 404`);
    }
    const cur = api.clubs[id].reportingCurrency;
    if (cur && !api.CURRENCY_META[cur]) add('P2', 'moneda-sin-meta', `${id}: reportingCurrency '${cur}' no está en CURRENCY_META, cae al fallback de currency-map.js`);
    // Versión 179: `brandColor:null` es el resultado CERRADO de "se miró y no lleva color" (blanco
    // o ambiguo). El campo AUSENTE es otra cosa: nadie lo chequeó. Los dos se ven igual en pantalla
    // (`pintarCrest()` hace `if(!c)`), así que sin esta distinción la única forma de saber cuál es
    // cuál sería rebarrer todos los clubes, que es justo lo que el paso de onboarding evita.
    if (!('brandColor' in api.clubs[id])) add('P3', 'club-sin-color-ni-null', `${id}: sin brandColor ni brandColor:null en data/clubs.js — no se distingue "se miró y no lleva color" de "nadie lo chequeó" (ver club-or-year-onboarding §3 punto 1b)`);
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
    const cmp = (label, computed, official) => {
      const delta = +(computed - official).toFixed(3);
      if (Math.abs(delta) >= 0.01) {
        add('P0', 'no-cierra', `${ref(clubId, year)} ${label}: calculado ${computed} vs. oficial ${official} (diferencia ${delta})`);
      }
    };
    if (ym.officialTotalRevenue != null) cmp('Revenue', c.revenue, ym.officialTotalRevenue);
    if (ym.officialTotalExpenses != null) cmp('Expenses', Math.abs(c.expenses + c.nonCash), Math.abs(ym.officialTotalExpenses));
    if (ym.officialPAT != null) cmp('PAT', c.pat, ym.officialPAT);

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
  const revOk = new Set(api.REVENUE_CATEGORIES), expOk = new Set(api.EXPENSE_CATEGORIES);
  for (const { clubId, year, rev, exp } of clubYears(api)) {
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
  const PROBE = '__sonda_de_auditoria__', YEAR = 9999;
  for (const cat of api.EXPENSE_CATEGORIES) {
    api.generic[PROBE] = {
      revenueLinesByYear: { [YEAR]: [] },
      expenseLinesByYear: { [YEAR]: [{ rawLabel: 'sonda', normalizedCategory: cat, amountNative: -100 }] },
      fiscalYearMeta: { [YEAR]: { currency: 'USD', fx: 1, reportType: 'official_balance_sheet' } },
    };
    const c = api.computeYearGeneric(PROBE, YEAR);
    const visto = c.expenses + c.nonCash + c.exceptionalItems;
    if (Math.abs(visto - (-100)) > 0.01) {
      add('P0', 'categoria-huerfana', `EXPENSE_CATEGORIES incluye '${cat}' pero computeYearGeneric() no la suma en ninguna rama: la plata de esa categoría desaparece de todo cálculo del sitio`);
    }
  }
  delete api.generic[PROBE];

  const enBucket = new Set([...api.REVENUE_BUCKETS, ...api.EXPENSE_BUCKETS].flatMap(b => b.cats));
  const fuera = [...api.REVENUE_CATEGORIES, ...api.EXPENSE_CATEGORIES].filter(c => !enBucket.has(c));
  if (fuera.length) {
    add('P3', 'categoria-sin-bucket', `Categorías sin fila propia en Formato simplificado (caen al catch-all, puede ser a propósito): ${fuera.join(', ')}`);
  }
}

// --- D6/D7/D8: higiene de las líneas ---------------------------------------
function checkLineas(api) {
  let signosMenores = 0;
  for (const { clubId, year, rev, exp } of clubYears(api)) {
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
          add('P2', 'signo-invertido', `${ref(clubId, year)} ${sec} "${l.rawLabel}": ${l.amountNative} (${(peso * 100).toFixed(1)}% de la sección) — confirmar que es una deducción real y no un signo dado vuelta`);
        } else {
          signosMenores++;
        }
      }
    }
    for (const [sec, lines] of [['ingreso', rev], ['gasto', exp]]) {
      const vistos = new Map();
      for (const l of lines) {
        const prev = vistos.get(l.rawLabel);
        if (prev != null) {
          const sev = prev === l.amountNative ? 'P1' : 'P3';
          add(sev, 'linea-duplicada', `${ref(clubId, year)} ${sec} "${l.rawLabel}": aparece dos veces${prev === l.amountNative ? ' con el MISMO monto (' + l.amountNative + '), probable copia pegada dos veces' : ' con montos distintos'}`);
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
}

// --- D9/D10/D11: moneda, escala y continuidad ------------------------------
function checkMoneda(api) {
  const porPais = {};
  const serie = {};
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
    if (usd < 0.2 || usd > 2000) {
      add('P0', 'escala-implausible', `${ref(clubId, year)}: revenue = ${usd.toFixed(2)} M USD, fuera de toda banda plausible — sospechar error de escala (documento en miles) o fx equivocado`);
    }
    const pais = (api.clubs[clubId] || {}).country || '??';
    (porPais[pais] = porPais[pais] || []).push({ clubId, year, usd });
    (serie[clubId] = serie[clubId] || []).push({ year, usd, currency: ym.currency });
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
        add('P2', 'outlier-liga', `${ref(x.clubId, x.year)}: ${x.usd.toFixed(1)} M USD contra una mediana de ${mediana.toFixed(1)} M USD en ${pais} (${ratio > 1 ? ratio.toFixed(0) + '×' : '1/' + (1 / ratio).toFixed(0)}) — revisar que no sea escala`);
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
      if (r > 5 || r < 1 / 5) {
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
    add('P3', 'liga-sin-verificar', `${cob.faltan} de ${cob.total} filas de data/club-leagues.js siguen en null, o sea sin verificar contra fuente`);
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
function checkPesoDocs() {
  const SKILL = '.claude/skills/start-session-finance-of-sports-project/SKILL.md';
  const abs = path.join(ROOT, SKILL);
  if (!fs.existsSync(abs)) return;
  const texto = fs.readFileSync(abs, 'utf8');
  // Cada fila de la tabla y cada bullet de "lo que NO hace falta leer" nombra un
  // archivo entre backticks y su peso en KB. Los `.claude/skills/<x>` sin
  // `/SKILL.md` se resuelven al SKILL.md, que es lo que se lee.
  // OJO CON EL `[^\n]` Y NO `[^|\n]`: en la tabla de §1 el nombre del archivo y su
  // peso están en CELDAS DISTINTAS de la misma fila, o sea que hay pipes en el medio.
  // La primera versión de esta regex los prohibía y el chequeo NO DISPARABA NUNCA. Se
  // detectó rompiendo un número a propósito y viendo que no se quejaba — si tocás esta
  // regex, volvé a hacer esa prueba antes de darla por buena: un chequeo que no dispara
  // se ve exactamente igual que un proyecto sano.
  const re = /`([A-Za-z0-9_.\/-]+\.md|\.claude\/skills\/[a-z0-9-]+)`[^\n]*?\(?(\d+) KB/g;
  const vistos = new Set();
  let m;
  while ((m = re.exec(texto)) !== null) {
    let rel = m[1];
    const prometido = Number(m[2]);
    if (rel.startsWith('.claude/skills/') && !rel.endsWith('.md')) rel += '/SKILL.md';
    if (vistos.has(rel)) continue;
    vistos.add(rel);
    const f = path.join(ROOT, rel);
    if (!fs.existsSync(f)) continue;
    const real = Math.round(fs.statSync(f).size / 1024);
    // 25% de margen: los docs crecen de a poco todas las sesiones y no tiene
    // sentido quejarse por 2 KB. Lo que importa es el orden de magnitud.
    if (prometido > 0 && Math.abs(real - prometido) / prometido > 0.25) {
      add('P3', 'doc-peso-desfasado',
        `${rel}: la guía de arranque dice ${prometido} KB y pesa ${real} KB — ese número es para decidir si abrirlo o no`);
    }
  }
}

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

// --- D18: rutas de archivo que ya no existen (Versión 198, to-do 46) --------
// POR QUÉ. La reorganización de la Versión 196 movió 11 documentos y actualizó 203
// referencias en 31 archivos. Esa verificación se hizo con un script de una sola
// corrida, y una sola referencia olvidada manda a una sesión futura a un archivo que
// no está, sin que nada se queje. No es hipotético: este chequeo, la primera vez que
// corrió, encontró 44 archivos (`fuentes/_indice/<País>.md`, uno por país) que
// seguían linkeando el viejo fuentes-por-club.md, renombrado a `fuentes/README.md` dos
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

function archivosVivos() {
  const hay = rel => fs.existsSync(path.join(ROOT, rel));
  const dir = (d, filtro) => {
    try {
      return fs.readdirSync(path.join(ROOT, d)).filter(filtro).map(n => `${d}/${n}`);
    } catch { return []; }
  };
  const js = n => n.endsWith('.js');
  return [
    'CLAUDE.md', 'index.html', 'netlify.toml', 'fuentes/README.md',
    ...dir('js', js), ...dir('tools', n => js(n) || n.endsWith('.json')),
    ...dir('data', js), ...dir('data/lang', js),
    ...dir('data/club-leagues', js), ...dir('data/rankings', js),
    ...dir('.claude/skills', () => true).map(d => `${d}/SKILL.md`),
    // Admin/ menos los dos históricos. Archive/ no entra: es una subcarpeta.
    ...dir('Admin', n => n.endsWith('.md') || n.endsWith('.html'))
      .filter(f => !/CHANGELOG\.md$|finance-of-sports-project\.md$/.test(f)),
    ...dir('fuentes/_indice', n => n.endsWith('.md')),
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
      if (e.name === '.git' || e.name === 'node_modules' || rel === 'Business Books') continue;
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

  for (const [ruta, archivos] of [...porRuta].sort((a, b) => b[1].size - a[1].size)) {
    const lista = [...archivos].sort();
    const muestra = lista.slice(0, 3).join(', ') + (lista.length > 3 ? `, +${lista.length - 3} más` : '');
    add('P2', 'ruta-muerta',
      `\`${ruta}\`: no existe, y lo nombran ${lista.length} archivo(s) vivo(s) (${muestra}). Si se renombró, actualizá la referencia; si se nombra para decir que NO existe, dejá una entrada en tools/audit-ignore.json con el motivo`);
  }
}

// --- D19: TODO LO GENERADO, AL DÍA (Versión 183) ---------------------------
// El proyecto tiene 4 generadores y los 4 dependen de que alguien se acuerde de
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
// fuentes vieja pide un asset que ya no existe; una sección generada de Admin/ESTADO.md
// vieja le miente a la próxima sesión sobre qué hay cargado.
const GENERADORES = [
  ['generate-rankings.js',      'data/rankings/',                      'rankings-desfasado'],
  ['generate-fuentes-page.js',  'fuentes.html y las 41 páginas de club', 'fuentes-desfasada'],
  ['generate-club-index.js',    'la sección generada de Admin/ESTADO.md',    'club-index-desfasado'],
  ['generate-fuentes-index.js', 'el índice de fuentes/README.md',    'fuentes-indice-desfasado'],
];
function checkGenerados() {
  for (const [script, que, code] of GENERADORES) {
    if (!fs.existsSync(path.join(ROOT, 'tools', script))) continue;
    try {
      execSync(`node tools/${script} --check`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      const detalle = String(e.stderr || e.stdout || '').trim().replace(/\s*\n\s*/g, ' ').slice(0, 220);
      add('P1', code, `${que} quedó desactualizado. Corré: node tools/${script}${detalle ? ' — ' + detalle : ''}`);
    }
  }
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

// --- D14: el espacio de nombres de clubId (Versión 129) --------------------
// `clubId` no lleva país, y no es una clave más: nombra el archivo de datos
// (`data/<clubId>-data.js`, por convención de loadClubData()) y prefija cada
// sourceId (`racing-balance-2009`). Los ids de hoy son `racing`, `independiente`,
// `union`, `sanlorenzo`: los cuatro nombres existen en varios países (Racing de
// Santander, Independiente del Valle y el de Medellín, Unión Española, Unión
// Magdalena). Ya pasa en `fuentes/`, con un Olimpia de Honduras y otro de
// Paraguay, y ahí no choca solo porque el país es una carpeta.
//
// La convención, desde la Versión 129 y escrita en Admin/CONVENCIONES.md: todo club
// NUEVO lleva el país al final del id (`racingsantander-es`). Los 41 de antes
// quedan como están, listados acá abajo: migrarlos tocaría sus archivos, sus
// sourceIds y el club guardado en el localStorage de cada visitante, y no
// arregla ninguna colisión real, porque todavía no hay ninguna.
const CLUB_IDS_SIN_PAIS_HEREDADOS = [
  "argentinosjuniors", "athleticclub", "atleticogoianiense", "atleticomadrid", "boca", "botafogo",
  "celtavigo", "cerezoosaka", "clubamerica", "coritiba", "cruzeiro", "deportivoalaves",
  "envigado", "estudianteslp", "fcbarcelona", "fctokyo", "gambaosaka", "gremio",
  "independiente", "instituto", "ituano", "kashimaantlers", "kawasakifrontale", "mirassol",
  "nagoyagrampus", "oncecaldas", "racing", "realbetis", "realmadrid", "river",
  "rosariocentral", "sanfreccehiroshima", "sanlorenzo", "sevillafc", "union", "urawareddiamonds",
  "valenciacf", "velez", "villarrealcf", "visselkobe", "yokohamafmarinos",
];

function checkClubIds(api) {
  const heredados = new Set(CLUB_IDS_SIN_PAIS_HEREDADOS);
  const paises = new Set(Object.values(api.clubs).map(c => (c.country || '').toLowerCase()).filter(Boolean));
  // El "nombre base" es el id sin su sufijo de país, para comparar peras con peras.
  const base = id => {
    const m = id.match(/^(.*)-([a-z]{2})$/);
    return (m && paises.has(m[2])) ? m[1] : id;
  };

  // El disparador de migración: mientras `racing` sea el único, "racing" significa
  // Racing Club sin ambigüedad. El día que entra `racing-es`, el id pelado pasa a ser
  // el único de la familia que no dice de qué país es, y ahí sí conviene renombrarlo a
  // `racing-ar`. O sea que esto no prohíbe la convivencia (es justamente la convención
  // funcionando): avisa cuándo un id heredado se volvió ambiguo, que es el único
  // momento en que migrarlo vale lo que cuesta.
  const porBase = {};
  for (const id of Object.keys(api.clubs)) (porBase[base(id)] = porBase[base(id)] || []).push(id);
  for (const b of Object.keys(porBase)) {
    if (porBase[b].length < 2) continue;
    const pelados = porBase[b].filter(id => id === b);
    const conPais = porBase[b].filter(id => id !== b);
    if (!pelados.length) continue;  // todos con país: no hay nada ambiguo
    for (const id of pelados) {
      const pais = (api.clubs[id].country || 'xx').toLowerCase();
      add('P2', 'clubid-heredado-ambiguo', `el id '${id}' (${api.clubs[id].country}) ya no es inequívoco: existe ${conPais.join(', ')} con el mismo nombre base. Es el momento de renombrarlo a '${id}-${pais}' (el archivo data/${id}-data.js, el clubId y el prefijo de sus sourceId)`);
    }
  }

  const sinPais = Object.keys(api.clubs).filter(id => !heredados.has(id) && !/-[a-z]{2}$/.test(id));
  for (const id of sinPais) {
    add('P2', 'clubid-sin-pais', `el club '${id}' es nuevo y su id no termina en el país (ej. '${id}-${(api.clubs[id].country || 'xx').toLowerCase()}'), que es la convención desde la Versión 129: ver Admin/CONVENCIONES.md`);
  }
  const heredadosVivos = Object.keys(api.clubs).filter(id => heredados.has(id)).length;
  if (heredadosVivos) {
    add('P3', 'clubid-heredado', `${heredadosVivos} clubes con id sin país, de antes de la convención. No es un error y no urge migrarlos: el chequeo de colisión de arriba avisa si alguna vez chocan de verdad`);
  }
}

// --- D12c: colisión de clubId adelantada al SOURCING (Versión 163) ----------
// checkClubIds() avisa cuando un id heredado sin país deja de ser inequívoco, pero recién
// cuando el club que colisiona YA ESTÁ CARGADO en clubs{}. Para entonces renombrar el
// viejo cuesta tres cosas (el archivo data/<id>-data.js, el clubId y el prefijo de cada
// sourceId) y encima ya se transcribió el documento del club nuevo. Esto mira el escalón
// anterior: los clubes que alguien está SOURCEANDO, que viven en fuentes/_indice/<País>.md
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
const INDICE_FUENTES = path.join(ROOT, 'fuentes/_indice');

// `clubs{}` guarda el país como código ISO ('AR'), y `fuentes/_indice/` lo nombra completo
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
      add('P2', 'carpeta-club-duplicada', `Clubes/${pais}/: ${porNombre[k].map(c => `"${c}"`).join(' y ')} son carpetas distintas que normalizan al mismo nombre. O es el mismo club transcripto dos veces con dos grafías, y sus documentos quedaron partidos entre las dos, o son dos clubes distintos que hay que desambiguar en el nombre de la carpeta (REGLA 3 de fuentes/README.md)`);
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
  if (sinNota) {
    add('P3', 'fuente-no-primaria-sin-nota', `${sinNota} documentos que no son fuente primaria y no tienen publicNote. El nivel solo dice "réplica" o "prensa": conviene una frase que diga por qué`);
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
  for (const { clubId, year, rev, exp } of clubYears(api)) {
    if (!exp.length && !rev.length) continue;
    const cat = c => exp.filter(l => l.normalizedCategory === c).reduce((s, l) => s + l.amountNative, 0);
    // Un ejercicio placeholder tiene sus líneas en cero: no es que falten los sueldos,
    // es que no hay datos todavía. Solo se mira donde hay plata cargada.
    if (sum(exp) !== 0 && cat('wages_squad') === 0 && cat('lump_football_operations_expense') === 0) {
      add('P2', 'sin-salarios', `${ref(clubId, year)}: no hay ni una línea en 'wages_squad' ni un bolsón sin desglosar — todo club paga sueldos, probablemente quedaron enterrados en otra categoría`);
    }
    for (const [sec, lines, buckets, catchAll] of [
      ['Ingresos', rev, api.REVENUE_BUCKETS, 'Otros ingresos'],
      ['Gastos', exp, api.EXPENSE_BUCKETS, 'Otros gastos'],
    ]) {
      if (!lines.length) continue;
      const total = Math.abs(sum(lines));
      if (!total) continue;
      const rows = api.bucketize(lines, buckets, catchAll);
      const resto = Math.abs((rows.find(r => r.label === catchAll) || {}).value || 0);
      const pct = resto / total;
      if (pct > 0.4) {
        add('P2', 'catchall-dominante', `${ref(clubId, year)} ${sec}: el catch-all "${catchAll}" se lleva ${(pct * 100).toFixed(0)}% del total — Formato simplificado no dice casi nada para este ejercicio`);
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
    // real): el comentario de cabecera de index.html son 50 KB de prosa donde nombrar
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

  const bytesData = fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js'))
    .reduce((s, f) => s + fs.statSync(path.join(ROOT, 'data', f)).size, 0);
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
  for (const [f, limite] of [['Admin/CHANGELOG.md', 400], ['Admin/finance-of-sports-project.md', 1200], ['index.html', 150], ['Admin/ESTADO.md', 60], ['Admin/TODO.md', 60]]) {
    const kb = fs.statSync(path.join(ROOT, f)).size / 1024;
    if (kb > limite) add('P3', 'archivo-pesado', `${f}: ${kb.toFixed(0)} KB (umbral ${limite} KB) — candidato a partir`);
  }
}

// --- H: higiene de runtime que sí se puede ver desde Node -------------------
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
    const tocaCodigo = st.some(f => f.startsWith('js/') || f.startsWith('data/'));
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
  // REGLA: todo archivo de `js/` que llame a `t()` va en esta lista.
  for (const rel of ['js/finanzas-render.js', 'js/finanzas-calc.js', 'js/selector.js', 'index.html']) {
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
  checkFxProcedencia(api);
  checkFuentesPublicas(api);
  checkClubIds(api);
  checkCarpetasClubes();
  checkColisionSourcing(api);
  checkLigasPorEjercicio(api);
  checkGenerados();
  checkRankings(api);
  checkCategorizacion(api);
  checkEscala(api);
  checkPesoDocs();
  checkDeployInterno();
  checkRutasMuertas();
  checkHigiene(api);

  if (JSON_OUT) console.log(JSON.stringify({ findings, silenciados }, null, 2));
  else imprimir(api);

  const bloqueantes = findings.filter(f => f.sev === 'P0' || f.sev === 'P1').length;
  process.exit(bloqueantes ? 1 : 0);
}

main();
