// tools/audit-chequeos-1.js — checkEstructura, checkTieOuts, checkCategorias, checkTaxonomiaGenerica, checkTaxonomiaDeporte, checkLineas, checkMoneda, checkCajaDeudaProporcion. Mudados de tools/audit.js sin cambiar una línea; lo compartido (add, ROOT, fs, path…) está en tools/audit-base.js.

const { REPORT_TYPES_REALES, ROOT, add, clubYears, fs, path, ref, rutaData, sum } = require('./audit-base.js');

const REPORT_TYPES_BALANCE = ['official_balance_sheet', 'official_budget_and_balance', 'unofficial_mirror'];
const REPORT_TYPES_CONOCIDOS = [...REPORT_TYPES_REALES, 'pending_official', 'press_estimate', 'placeholder'];

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
    // `brandColor:null` es el resultado CERRADO de "se miró y no lleva color" (blanco
    // o ambiguo). El campo AUSENTE es otra cosa: nadie lo chequeó. Los dos se ven igual en pantalla
    // (`pintarCrest()` hace `if(!c)`), así que sin esta distinción la única forma de saber cuál es
    // cuál sería rebarrer todos los clubes, que es justo lo que el paso de onboarding evita.
    // todo club declara su deporte (sport en data/clubs.js): las tools lo leen de ahí y ya no suponen fútbol; el sitio y audit.js todavía caen a fútbol si falta
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

    // OJO CON LA CONDICIÓN, Y POR QUÉ NO ALCANZA CON "es un balance y no tiene PAT".
    // Este chequeo tiraba 11 hallazgos y 10 eran de la misma clase y no eran
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
  // las categorías válidas de un club son las de la taxonomía de SU deporte (SPORT_TAXONOMIES): una línea de rugby con lump_rugby_operations no es un typo.
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
  // Es exactamente el bug que ya hubo con las 3 categorías nuevas de Racing,
  // que se encontró de casualidad; esto lo encuentra siempre.
  // por cada deporte con taxonomía: el club sintético lleva su `sport` (el motor lee la genérica y el bloque de SPORT_TAXONOMIES[sport]).
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
    // la rama del motor donde cayó tiene que ser el bloque de su genérica (data/category-map.js), que es lo que publica el JSON.
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

// --- la capa genérica (data/category-map.js, SPORT_TAXONOMIES) -----------------------------------------------------
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
    if (((api.clubs[clubId] || {}).sport || 'futbol') !== dep) continue; // cada club con la taxonomía de su deporte
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
// tools/audit-ignore.json y del propio
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
        // "Diferencia de redondeo" no es una copia pegada: verificar.mjs agrega una por cada nota que abre un renglón y
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
    // "Crudo" pero resuelto: un ejercicio puede traer `fxRef` en vez de
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
    // La decisión se toma después del recorrido (fueraDeBanda, abajo): hace falta la serie entera del club.
    if (usd < 0.2 || usd > 2000) fueraDeBanda.push({ clubId, year, usd });
    // Un tramo corto de transición (period_months < 12, Admin/CONVENCIONES-DATOS.md) no se compara con años de 12 meses: fuera de outlier-liga y salto-interanual.
    if ((ym.periodMonths || 12) < 12) continue;
    const pais =(api.clubs[clubId] || {}).country || '??';
    (porPais[pais] = porPais[pais] || []).push({ clubId, year, usd });
    (serie[clubId] = serie[clubId] || []).push({ year, usd, currency: ym.currency, soloMargenBruto: rev.filter((l) => l.amountNative).length === 1 && MARGEN_BRUTO_RE.test(rev.find((l) => l.amountNative).rawLabel || '') });
  }

  // ESCALA FUERA DE BANDA, CONFIRMADA POR EL AÑO VECINO. La banda frena a clubes chicos reales de tercera división (Alverca
  // 2022, 152.299,54 € ≈ US$ 0,16 M; Novorizontino 2015; Felgueiras 2021-22) y hasta acá cada uno pedía una entrada en audit-ignore.json.
  // Un error de escala (×1.000 por "en miles") salta contra los otros años del club; un club chico, no. COMPUERTA: otro ejercicio del club a
  // 2 años o menos está DENTRO de la banda y a menos de 20 veces de este -> P3 (aviso); si no, P0 como siempre.
  for (const x of fueraDeBanda) {
    // Un año de margen bruto (`revenue_basis: gross_margin`) no es un ingreso: su cifra es chica por naturaleza (un margen de 0,09 M USD en un club que factura 100 veces más) y no dice nada de la escala.
    if (((api.generic[x.clubId] || {}).fiscalYearMeta || {})[x.year]?.baseIngreso === 'gross_margin') continue;
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
      // 100×: un error de escala de verdad (×1.000 por «en miles») deja a un club típico (0,2 a 5 veces la mediana) a 200× o más; entre 25× y 100× están los
      // clubes grandes y chicos reales de una liga con varias divisiones cargadas (la mediana mezcla divisiones).
      if (ratio > 100 || ratio < 1 / 100) {
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
// --- D15: la liga de cada ejercicio ---------------------------
// `data/club-leagues.js` dice en qué categoría jugó cada club cada ejercicio, y
// nace con todas las filas en `null` a propósito: null es "nadie lo verificó
// todavía". Esto cuenta lo que falta (para que el pendiente no dependa de que
// alguien se acuerde) y avisa si un ejercicio real no tiene ni siquiera su fila.
// --- CAJA Y DEUDA DESPROPORCIONADAS ---------------------------
// Un techo por proporción con los ingresos del mismo año, solo hacia arriba: caja más de 3 veces los ingresos o deuda más de 20 veces es un
// error de escala o de fila, no un dato. Medido en lo cargado: el máximo real de caja es 2,53 veces (Atlético Mineiro 2023) y
// el de deuda 13,7 veces (Novorizontino 2015). Casos que frena (corrida de caja-deuda.mjs, revertidos a mano): Hellas
// Verona 2024 deuda 1,8e16; Milan 2009 deuda 163.739 M; Inter 2021 caja 97.884 M; Lazio 2008-2019. P1: caja-deuda.mjs y cargar.mjs
// revierten solos lo que lo pase. PISO de caja, el mismo de caja-deuda.mjs: menos de 7e-5
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


module.exports = { checkEstructura, checkTieOuts, checkCategorias, checkTaxonomiaGenerica, checkTaxonomiaDeporte, checkLineas, checkMoneda, checkCajaDeudaProporcion };
