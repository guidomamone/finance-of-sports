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
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js', 'data/site-labels.js',
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

    if (REPORT_TYPES_BALANCE.includes(ym.reportType) && ym.officialPAT == null) {
      add('P2', 'balance-sin-pat', `${ref(clubId, year)}: es un balance real pero no declara officialPAT, el resultado del ejercicio no se verifica`);
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
    if (real && ym.fx == null) {
      add(ym.currency === 'USD' ? 'P2' : 'P1', 'fx-ausente', `${ref(clubId, year)}: ejercicio real (${ym.reportType}${ym.currency === 'USD' ? ', guardado en USD' : ' en ' + ym.currency}) sin fx propio — se convierte con el FX_RATE placeholder global (1450)${nativa && nativa !== 'USD' ? `, así que la vista en ${nativa} es un número inventado` : ''}`);
    }
    if (!real && ym.fx == null && nativa && nativa !== 'USD' && sum(rev) !== 0) placeholdersSinFx++;
    if (real && ym.fx === 1450) {
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
      ['Ingresos', rev, api.REVENUE_BUCKETS, 'Otras secciones deportivas y otros ingresos'],
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
    const lineas = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
    lineas.forEach((linea, i) => {
      const t = linea.trim();
      if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('-')) return;
      for (const id of ids) {
        if (new RegExp(`['"\`]${id}['"\`]`).test(linea)) hits.push({ rel, line: i + 1, id, texto: t.slice(0, 110) });
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

  for (const [f, limite] of [['CHANGELOG.md', 100], ['finance-of-sports-project.md', 400], ['index.html', 150]]) {
    const kb = fs.statSync(path.join(ROOT, f)).size / 1024;
    if (kb > limite) add('P3', 'archivo-pesado', `${f}: ${kb.toFixed(0)} KB (umbral ${limite} KB) — candidato a partir, ver to-do 0`);
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

  // i18n: una clave usada y no definida degrada al castellano en silencio.
  const usadas = new Set();
  for (const m of html.matchAll(/data-i18n(?:-title)?="([^"]+)"/g)) usadas.add(m[1]);
  for (const rel of ['js/finanzas-render.js', 'js/finanzas-calc.js', 'index.html']) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    for (const m of src.matchAll(/\bt\(\s*'([a-z0-9_.]+)'/gi)) usadas.add(m[1]);
  }
  for (const f of fs.readdirSync(path.join(ROOT, 'data/lang')).filter(f => f.endsWith('.js') && f !== 'langs.js')) {
    const src = fs.readFileSync(path.join(ROOT, 'data/lang', f), 'utf8');
    const definidas = new Set([...src.matchAll(/^\s*'([^']+)'\s*:/gm)].map(m => m[1]));
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

function main() {
  let api;
  try { api = loadEngine(); }
  catch (e) { console.error(`ERROR cargando el motor: ${e.message}`); process.exit(2); }

  checkEstructura(api);
  checkTieOuts(api);
  checkCategorias(api);
  checkLineas(api);
  checkMoneda(api);
  checkCategorizacion(api);
  checkEscala(api);
  checkHigiene(api);

  if (JSON_OUT) console.log(JSON.stringify({ findings, silenciados }, null, 2));
  else imprimir(api);

  const bloqueantes = findings.filter(f => f.sev === 'P0' || f.sev === 'P1').length;
  process.exit(bloqueantes ? 1 : 0);
}

main();
