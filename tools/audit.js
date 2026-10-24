#!/usr/bin/env node
// ============================================================================
// tools/audit.js — auditoría determinista del proyecto entero, en Node.
//
// EL PROBLEMA QUE RESUELVE: `auditAll()` verifica que
// cada ejercicio CIERRE contra el total que su propio documento imprime. Es la
// verificación más importante del sitio, pero solo ve una clase de error: la
// suma que no da. No ve al ejercicio que no tiene ningún total oficial contra
// qué compararse (y por lo tanto nunca se verifica), ni al que cierra perfecto
// con un error de escala heredado del documento, ni a la categoría con un typo
// que manda plata al catch-all sin cambiar ningún total, ni a la categoría que
// el motor directamente no suma. Todo eso cierra los tie-outs igual.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «audit.js».
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
// ============================================================================

const { ARGS, IGNORADOS, IGNORE_FILE, JSON_OUT, MUESTRAS, QUIET, ROOT, add, archivosData, clubYears, findings, fs, path, reglasUsadas, silenciados, vm } = require('./audit-base.js');
const { checkCajaDeudaProporcion, checkCategorias, checkEstructura, checkLineas, checkMoneda, checkTieOuts } = require('./audit-chequeos-1.js');
const { checkCabeceraLargaEnTools, checkComentarioHistoricoEnTools, checkComentariosPublicados, checkDeployInterno, checkGenerados, checkHistoriaEnDocs, checkIndexFileRoto, checkLigasPorEjercicio, checkParrafoNetlifyDuplicado, checkParrafosRepetidos, checkRayaLarga, checkRutasMuertas, checkSponsorBusqueda, checkToolGrande } = require('./audit-chequeos-2.js');
const { checkArchivoNoEsLoQueDice, checkCarpetasClubes, checkClubIds, checkColisionSourcing, checkCorreccionesSinMotivo, checkFuentesPublicas, checkRankings } = require('./audit-chequeos-3.js');
const { checkCategorizacion, checkEscala, checkEtiquetaSinRevisar, checkFxProcedencia, checkGestiones, checkImportsSinExport, checkLigaDosFuentes, checkPagoSobreDeterminista, checkRevisionTaxonomia, checkTodo } = require('./audit-chequeos-4.js');
const { checkComaComida, checkDatosJson, checkDeportes, checkDudasResueltas, checkEjercicioSinRastro, checkHigiene, checkMedicionesSinDestino, checkNombresSinDefinir, checkRarezas, checkRegistrosSinLector, checkReglasCategoria, checkRevisionPropiaPendiente } = require('./audit-chequeos-5.js');

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
    // las filas de club-leagues se partieron en un archivo por país, que
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
// 4. SALIDA
// ---------------------------------------------------------------------------
const SEV_TITULO = {
  P0: 'P0 — un número publicado está mal, o puede estarlo',
  P1: 'P1 — algo roto o ausente que el visitante ve',
  P2: 'P2 — riesgo: no está mal hoy, se rompe o no escala mañana',
  P3: 'P3 — limpieza: pide trabajo de una sesión',
  P4: 'P4 — informativo: no pide nada',
};

function imprimir(api) {
  const nClubes = Object.keys(api.generic).length;
  const nAños = [...clubYears(api)].length;
  const cuenta = s => findings.filter(f => f.sev === s).length;

  console.log(`\nAUDITORÍA finance-of-sports — ${nClubes} clubes, ${nAños} ejercicios`);
  console.log(`P0 ${cuenta('P0')} · P1 ${cuenta('P1')} · P2 ${cuenta('P2')} · P3 ${cuenta('P3')} · P4 ${cuenta('P4')}` +
    (silenciados.length ? ` · ${silenciados.length} silenciados por tools/audit-ignore.json` : '') + '\n');

  for (const sev of ['P0', 'P1', 'P2', 'P3', 'P4']) {
    if (QUIET && sev >= 'P2') continue;
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
// pregunta con la que nació el campo `fxSource` (Guido: "si yo
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
  checkEtiquetaSinRevisar(api);
  checkRevisionTaxonomia(api);
  checkEscala(api);
  checkDeployInterno();
  checkIndexFileRoto();
  checkSponsorBusqueda();
  checkComentariosPublicados();
  checkParrafoNetlifyDuplicado();
  checkRutasMuertas();
  checkHistoriaEnDocs();
  checkComentarioHistoricoEnTools();
  checkCabeceraLargaEnTools();
  checkToolGrande();
  checkNombresSinDefinir();
  checkRevisionPropiaPendiente();
  checkDudasResueltas();
  checkRegistrosSinLector();
  checkMedicionesSinDestino();
  checkParrafosRepetidos();
  checkRayaLarga();
  checkImportsSinExport();
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
  // P4, informativo: un código cuya acción es «nada» (quien: nada) no pide trabajo; se cuenta aparte para que P3 sea solo lo que sí lo pide
  for (const f of findings) if (f.sev === 'P3' && (ACCIONES[f.code] || {}).quien === 'nada') f.sev = 'P4';
  const sinAccion = [...new Set(findings.map((f) => f.code))].filter((c) => !ACCIONES[c] && c !== 'codigo-sin-accion');
  if (sinAccion.length) add('P3', 'codigo-sin-accion', `${sinAccion.length} códigos de audit.js sin entrada en tools/audit-acciones.json (qué hacer cuando disparan): ${sinAccion.join(', ')}`);
  if (ARGS.includes('--acciones')) { // la tabla de lo que dispara hoy: código · cuántos · quién · qué hacer
    const por = {}; for (const f of findings) { por[f.code] = por[f.code] || { sev: f.sev, n: 0 }; por[f.code].n++; }
    const orden = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 };
    for (const [c, v] of Object.entries(por).sort((x, y) => orden[x[1].sev] - orden[y[1].sev] || y[1].n - x[1].n)) {
      const a = ACCIONES[c]; console.log(`${v.sev} ${String(v.n).padStart(3)}  ${c.padEnd(28)} ${a ? `[${a.quien}] ${a.hacer}${a.donde ? ` (${a.donde})` : ''}` : '(sin acción en tools/audit-acciones.json)'}`);
    }
    return;
  }

  const bloqueantes = findings.filter(f => f.sev === 'P0' || f.sev === 'P1').length;
  // process.exit antes de vaciar stdout cortaba el JSON a los 64 KB en un pipe: con --json se sale cuando la escritura terminó.
  if (JSON_OUT) { process.stdout.write(JSON.stringify({ findings, silenciados }, null, 2) + '\n', () => process.exit(bloqueantes ? 1 : 0)); return; }
  imprimir(api);
  process.exit(bloqueantes ? 1 : 0);
}

main();

