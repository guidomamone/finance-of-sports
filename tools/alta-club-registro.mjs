// ============================================================================
// tools/alta-club-registro.mjs — las preguntas que van a Claude, el registro de altas (altas-club.jsonl) y los modos --todos, --resumen y --dudas
// Mudado de tools/alta-club.mjs sin cambiar una línea (salvo `export`); tools/alta-club.mjs lo importa y re-exporta lo que ya exportaba.
// ============================================================================
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, basename, join } from 'node:path';
import { createHash } from 'node:crypto';
import { clubDeCarpeta } from './carpetas-clubes.mjs';
import { deporteDeClub } from './deporte-club.mjs';
import { huellaEntradas, sha1Archivo, leerRegistro, guardarEnRegistro, resumenAltas, ESTADOS } from './altas-registro.mjs';
import { preguntarAClaude } from './alta-claude.mjs';
import { anioDelNombre, SERIES_FX } from './alta-club-lectura.mjs';
import { paisDe, MONEDAS, MONEDAS_A_LA_PAR, NO_BALANCE } from './alta-club-tablas.mjs';
import { ARGS, flagVal, ANIO_FORZADO, CLAUDE, FORZAR, MODELO, LIMITE, TOPE_USD, norm, rel, cargarSitio, analizar } from './alta-club.mjs';

const ROOT = resolve(import.meta.dirname, '..');


// ============================================================================
// PREGUNTAS PARA CLAUDE (tools/alta-claude.mjs): cuáles van, y qué se hace con la respuesta
// ============================================================================
// Campo de alta-club.mjs -> tipo de pregunta de alta-claude.mjs. Las de cierre (anio, cierre,
// fiscalYearStart) se juntan en UNA sola pregunta: son la misma fecha vista de tres lados.
const TIPO_DE_CAMPO = { perimetro: 'perimetro', reportType: 'reportType', anio: 'cierre', cierre: 'cierre', fiscalYearStart: 'cierre', currency: 'moneda', fx: 'fx', sport: 'sport', name: 'name' };

// ¿Esta pregunta se responde LEYENDO el documento (va a Claude, y si Claude no puede, es candidata a
// preguntarle al club), o es una decisión de PRODUCTO (id heredado a renombrar, país Escocia, liga fuera
// del catálogo, Panamá USD/PAB, dos entidades en la carpeta: las decide Guido, no un club)?
function clasePregunta(c, r) {
  const pais = paisDe((r.carpeta || '').split('/')[1]);
  if (!TIPO_DE_CAMPO[c.campo]) return 'producto';
  if (c.campo === 'perimetro' && c.dosEntidades) return 'producto';
  if (c.campo === 'currency' && pais && pais.preguntaMoneda) return 'producto';
  if (c.campo === 'fx' && /presupuesto/i.test(c.pregunta || '')) return 'producto'; // premisa de un presupuesto: otra pregunta
  return 'documento';
}

function preguntasParaClaude(r) {
  const porTipo = new Map();
  const todos = [...r.campos, ...r.ejercicio.campos];
  for (const c of todos) {
    const esNombre = c.campo === 'name' && c.estado === 'pendiente';
    if (c.estado !== 'pregunta' && !esNombre) continue;
    if (!esNombre && clasePregunta(c, r) !== 'documento') continue;
    const tipo = TIPO_DE_CAMPO[c.campo];
    const texto = esNombre ? `¿Cuál es el nombre legal completo de la entidad que emite estos estados (el script no lo encontró; candidato: "${c.valor}")?` : c.pregunta;
    const x = porTipo.get(tipo) || { id: tipo, tipo, textos: [], campos: [], contexto: [] };
    if (!x.textos.includes(texto)) x.textos.push(texto);
    x.campos.push(c.campo);
    if (c.fuente) x.contexto.push(`${c.campo}: ${String(c.fuente).slice(0, 300)}`);
    porTipo.set(tipo, x);
  }
  const moneda = (r.ejercicio.campos.find((c) => c.campo === 'currency') || {}).valor;
  return [...porTipo.values()].map((x) => ({
    id: x.id, tipo: x.tipo, campos: x.campos, texto: x.textos.join(' / '), contexto: x.contexto.join(' | '),
    ctxFx: x.tipo === 'fx' && MONEDAS[moneda] ? { moneda, rango: MONEDAS[moneda].rango, aLaPar: MONEDAS_A_LA_PAR.has(moneda) } : undefined,
  }));
}

// De las respuestas verificadas, cuáles se APLICAN (desbloquean sin decidir nada de producto).
// Una respuesta verificada que no desbloquea (el documento es un intermedio; el club es de rugby; la
// moneda es la vieja, anterior al euro) queda guardada con su cita al lado de la pregunta, que sigue abierta.
export function aplicables(respuestas, r) {
  const ov = {};
  const pais = paisDe((r.carpeta || '').split('/')[1]);
  for (const x of respuestas || []) {
    if (!x.resuelta) continue;
    const c0 = (x.citas || [])[0] || {};
    const fuente = `pág. ${c0.pagina}: "${String(c0.texto || '').slice(0, 160)}" (confianza ${x.confianza})`;
    const v = { valor: x.valor, fuente };
    if (x.tipo === 'cierre') ov.cierre = v;
    else if (x.tipo === 'reportType' && ['official_balance_sheet', 'official_budget'].includes(x.valor)) ov.reportType = v;
    else if (x.tipo === 'perimetro' && x.valor !== 'otra_entidad') ov.perimetro = v;
    else if (x.tipo === 'moneda' && pais && x.valor === pais.moneda) ov.moneda = v;
    else if (x.tipo === 'sport' && x.valor === 'futbol') ov.sport = v;
    // Nombre en alfabeto no latino (griego, cirílico, hangul): verificado, pero NO se aplica. Los clubes
    // cargados usan la transliteración latina ("Panathinaikos Athlitikos Omilos P.A.E."; en el backtest
    // Claude devolvió el griego impreso, bien leído pero con otra convención) y una transliteración no se
    // puede verificar contra el documento. Queda en el registro, con su cita, para quien complete `name`.
    else if (x.tipo === 'name' && !/[^\u0000-\u024F\u1E00-\u1EFF\s]/.test(x.valor)) ov.name = v;
    else if (x.tipo === 'fx') ov.fx = v;
  }
  return ov;
}

// ============================================================================
// EL REGISTRO (Admin/registros/altas-club.jsonl, ver tools/altas-registro.mjs)
// ============================================================================
export const sha1 = (x) => createHash('sha1').update(x).digest('hex');
let _estadoTransc = null;
export function estadoTranscripciones() {
  if (_estadoTransc) return _estadoTransc;
  _estadoTransc = new Map();
  const p = resolve(ROOT, 'Admin/registros/transcripciones-estado.jsonl');
  if (existsSync(p)) for (const l of readFileSync(p, 'utf8').split('\n')) { try { const e = JSON.parse(l); if (e.md) _estadoTransc.set(e.md, e.estado); } catch { /* */ } }
  return _estadoTransc;
}

function mdsDeCarpeta(paisCarpeta, clubCarpeta) {
  const dir = resolve(ROOT, 'Clubes', paisCarpeta, clubCarpeta);
  const out = [];
  if (!existsSync(dir)) return out;
  (function walk(d) {
    for (const e of readdirSync(d)) {
      const f = join(d, e);
      if (statSync(f).isDirectory()) { walk(f); continue; }
      if (!/\.md$/i.test(e) || /\.(previo-[a-z]+|gemini-check|claude-check|mistral-redo|t-[a-z]+)\.md$/i.test(e) || /^readme/i.test(e)) continue;
      out.push(rel(f));
    }
  })(dir);
  return out.sort();
}

// Orden de preferencia del documento BASE de una carpeta (mismo criterio que la prueba de
// Admin/mediciones/test-alta-club.md, ahora por script): primero los que son un estado contable anual por el
// nombre (no presupuesto/acta/intermedio), después los de transcripción `listo`/`cargado` antes que los
// `revisar`/`pendiente-segunda-voz`, y dentro de eso el ejercicio más reciente.
function candidatosBase(mds) {
  const est = estadoTranscripciones();
  const rango = (m) => ({ listo: 0, cargado: 0, 'sin-verificar': 1 }[est.get(m)] ?? 2);
  return mds.map((m) => ({ m, nb: NO_BALANCE.test(norm(basename(m))) ? 1 : 0, rk: rango(m), y: anioDelNombre(basename(m)) || 0 }))
    .sort((a, b) => a.nb - b.nb || a.rk - b.rk || b.y - a.y || a.m.localeCompare(b.m)).map((x) => x.m);
}

function huellaCarpeta(paisCarpeta, clubCarpeta, mds, docForzado) {
  const pais = paisDe(paisCarpeta) || {};
  const iso = (pais.iso2 || 'xx').toLowerCase();
  const archivos = [...mds, 'data/clubs.js', 'data/currency-map.js', 'data/leagues.js', `data/club-leagues/${iso}.js`, `tools/club-league-reference/${iso}.json`, 'tools/alta-club.mjs', 'tools/alta-claude.mjs', 'tools/carpetas-clubes.mjs'];
  if (pais.moneda && SERIES_FX[pais.moneda]) archivos.push(`tools/fx-reference/${SERIES_FX[pais.moneda]}`);
  const res = clubDeCarpeta(paisCarpeta, clubCarpeta);
  const est = estadoTranscripciones();
  return huellaEntradas({ archivos, extra: { resolucion: [res.via, res.clubId || null], docForzado: docForzado || null, anioForzado: ANIO_FORZADO, transcripcion: mds.map((m) => est.get(m) || null) } });
}

// Una entrada del registro a partir del análisis (ya con las respuestas de Claude aplicadas).
function armarEntrada({ paisCarpeta, clubCarpeta, r, huella, detalle, claude, probados, error }) {
  const carpeta = `Clubes/${paisCarpeta}/${clubCarpeta}/`;
  const base = { carpeta, pais: paisCarpeta, club: clubCarpeta, fecha: new Date().toISOString(), huella, entradas: detalle };
  if (error || !r) return { ...base, clubId: null, estado: 'faltan-datos', documento: null, detalle: error || 'sin análisis', preguntas: [], pendientes: [], resueltas: [], claude: null };
  if (r.error) return { ...base, clubId: null, estado: 'faltan-datos', documento: r.documento, detalle: r.error, preguntas: [], pendientes: [], resueltas: [], claude: null };
  const todos = [...r.campos, ...r.ejercicio.campos];
  const clubId = r.club.existe ? r.club.clubId : (r.campos.find((c) => c.campo === 'id') || {}).valor;
  const respPorTipo = new Map(((claude && claude.respuestas) || []).map((x) => [x.tipo, x]));
  const preguntas = todos.filter((c) => c.estado === 'pregunta').map((c) => {
    const clase = clasePregunta(c, r);
    const x = clase === 'documento' ? respPorTipo.get(TIPO_DE_CAMPO[c.campo]) : null;
    return {
      campo: c.campo, clase, pregunta: c.pregunta,
      claude: x ? { valor: x.valor, respuesta: x.respuesta, confianza: x.confianza, verificada: x.resuelta, motivoNoResuelta: x.motivoNoResuelta, citas: x.citas } : null,
      // Candidata a Admin/dudas-por-club.md (preguntarle al CLUB): solo si es de lectura del documento y
      // Claude ya la leyó y no la pudo sostener con una cita. Si Claude la contestó con cita pero la
      // respuesta no desbloquea (intermedio, otro deporte, moneda vieja), no hay nada que preguntarle al
      // club: la decisión es de Guido (usar otro documento, ¿entra ese deporte?, ¿se convierte?).
      candidataDudas: clase === 'documento' && !!x && !x.resuelta,
    };
  });
  const fxOk = todos.some((c) => (c.campo === 'fx' || c.campo === 'fxRef') && c.estado === 'ok');
  const faltaFx = !fxOk && !preguntas.some((p) => p.campo === 'fx' || p.campo === 'currency');
  const pendientes = todos.filter((c) => c.estado === 'pendiente').map((c) => ({ campo: c.campo, fuente: String(c.fuente || '').slice(0, 240), bloquea: (c.campo === 'fx' || c.campo === 'fxRef') && faltaFx }));
  const resueltas = todos.filter((c) => /^claude-api/.test(String(c.fuente || '')) && c.estado === 'ok').map((c) => {
    const x = respPorTipo.get(TIPO_DE_CAMPO[c.campo]) || {};
    return { campo: c.campo, valor: c.valor, fuente: 'claude-api', modelo: claude && claude.modelo, confianza: x.confianza, respuesta: x.respuesta, citas: (x.citas || []).map(({ pagina, texto }) => ({ pagina, texto })) };
  });
  // El deporte que el alta calculó, para el registro: lo leen Jev, Claude y la cola de un club que todavía no tiene ficha (tools/deporte-club.mjs, deporteDeCarpeta).
  // `origen` dice de dónde salió (ficha, liga, menciones del .md o claude); `pregunta` = se preguntó y nadie contestó (valor null). Una entrada sin `sport` = nadie lo calculó.
  const spC = r.campos.find((c) => c.campo === 'sport');
  const sport = r.club.existe ? { valor: deporteDeClub(clubId), origen: 'ficha' }
    : !spC ? undefined
    : spC.estado === 'pregunta' ? { valor: null, origen: 'pregunta' }
    : { valor: spC.valor ?? null, origen: /^la ficha/.test(spC.fuente) ? 'ficha' : /^la liga/.test(spC.fuente) ? 'liga' : /^claude-api/.test(spC.fuente) ? 'claude' : 'menciones' };
  let estado;
  if (r.club.existe) estado = 'existe';
  else if (preguntas.length) estado = 'con-preguntas';
  else if (faltaFx) estado = 'faltan-datos';
  else estado = 'listo-para-alta';
  return {
    ...base, clubId, estado, ...(sport ? { sport } : {}), documento: r.documento, anio: r.ejercicio.anio, cierre: r.ejercicio.cierre,
    detalle: estado === 'faltan-datos' ? 'sin tipo de cambio para el cierre: ni declarado por el documento, ni en FX_CLOSE, ni en tools/fx-reference/ (correr fetch-fx-reference.mjs)' : undefined,
    documentosProbados: probados && probados.length > 1 ? probados : undefined,
    resumen: { ok: r.resumen.ok, pregunta: r.resumen.pregunta, pendiente: r.resumen.pendiente },
    preguntas, pendientes, resueltas,
    claude: claude ? { preguntasHuella: claude.preguntasHuella, fecha: claude.fecha, modelo: claude.modelo, costUsd: claude.costUsd, paginasEnviadas: claude.paginasEnviadas, entero: claude.entero, error: claude.error, respuestas: claude.respuestas } : null,
  };
}

// Analiza una carpeta: elige el documento base (o usa el forzado), consulta/reusa a Claude, arma la entrada.
// Devuelve { entrada, pendienteClaude } — `pendienteClaude` es la tarea a mandar a Claude si hace falta
// (se corren todas juntas después, con concurrencia y tope de gasto).
export function analizarCarpeta(paisCarpeta, clubCarpeta, sitio, previo, docForzado = null) {
  const mds = mdsDeCarpeta(paisCarpeta, clubCarpeta);
  const { huella, detalle } = huellaCarpeta(paisCarpeta, clubCarpeta, mds, docForzado);
  const ctxBase = { paisCarpeta, clubCarpeta, huella, detalle };
  if (!mds.length && !docForzado) return { entrada: armarEntrada({ ...ctxBase, error: 'la carpeta no tiene ningún .md: falta transcribir (tools/pipeline.mjs / mistral-ocr-transcribe.mjs)' }) };
  let r = null; const probados = [];
  const orden = docForzado ? [docForzado] : candidatosBase(mds).slice(0, 4);
  for (const m of orden) {
    const x = analizar(m, sitio);
    probados.push(x.documento);
    if (!r) r = x;
    // Un documento que no sirve de base (no es un balance anual, o no se le puede sacar el ejercicio)
    // se cambia por el siguiente candidato: "usar otro documento de la misma carpeta" era la respuesta
    // más frecuente a esas preguntas en la prueba de Admin/mediciones/test-alta-club.md.
    const malBase = x.error || (x.preguntas || []).some((p) => ['reportType', 'anio', 'cierre', 'fiscalYearStart'].includes(p.campo));
    if (!malBase) { r = x; break; }
  }
  if (r.error || r.club.existe) return { entrada: armarEntrada({ ...ctxBase, r, probados }) };
  const pregs = preguntasParaClaude(r);
  const mdSha = sha1Archivo(r.md);
  const preguntasHuella = sha1(JSON.stringify({ mdSha, pregs: pregs.map((p) => [p.tipo, p.texto]), MODELO }));
  // Respuestas de Claude reusables si se hicieron sobre el MISMO .md y las MISMAS preguntas (y modelo).
  // Un cambio del prompt de alta-claude.mjs NO las invalida solo (costaría volver a pagar todo): para
  // rehacerlas, --forzar-claude.
  // BUG REAL: una corrida que no reusaba las respuestas (otra versión de las preguntas, o un recálculo de otra sesión) escribía
  // la entrada SIN el campo `claude`, y las respuestas ya pagadas se perdían del registro (quedaron 12 de 36; se recuperaron de git). Ahora
  // las respuestas anteriores viajan siempre en `claudeAnterior` hasta que una corrida con --claude las reemplace, y se reusan desde ahí si
  // la huella de las preguntas coincide.
  const anterior = (previo && (previo.claude || previo.claudeAnterior)) || null;
  let claude = anterior && anterior.preguntasHuella === preguntasHuella && !anterior.error && !ARGS.includes('--forzar-claude') ? anterior : null;
  if (claude || !pregs.length) return { entrada: finalizar({ ...ctxBase, r, probados, claude }), sinClaude: false };
  const e0 = armarEntrada({ ...ctxBase, r, probados });
  return { entrada: anterior ? { ...e0, claudeAnterior: anterior } : e0, pendienteClaude: { ...ctxBase, r, probados, pregs, preguntasHuella } };
}

// Con las respuestas de Claude (nuevas o reusadas): vuelve a analizar el documento con lo que desbloquea.
export function finalizar({ paisCarpeta, clubCarpeta, huella, detalle, r, probados, claude }) {
  let r2 = r;
  if (claude && claude.respuestas) {
    const ov = aplicables(claude.respuestas, r);
    if (Object.keys(ov).length) r2 = analizar(r.documento, cargarSitioCache(), ov);
  }
  return armarEntrada({ paisCarpeta, clubCarpeta, r: r2, huella, detalle, claude, probados });
}

let _sitio = null;
export function cargarSitioCache() { return (_sitio ??= cargarSitio()); }

export async function correrClaude(tareas) {
  // Tope de gasto con concurrencia: cada trabajador reserva el costo estimado de su llamada ANTES de
  // hacerla (bug de la primera corrida: con 4 en paralelo y el chequeo solo contra lo ya gastado, un tope
  // de US$ 1,45 terminó en US$ 1,72).
  let gastado = 0; let hechas = 0; let enCurso = 0; const out = [];
  const estimado = () => (hechas ? gastado / hechas : 0.09);
  const cola = [...tareas];
  async function trabajador() {
    while (cola.length) {
      if (gastado + (enCurso + 1) * estimado() > TOPE_USD) return;
      const t = cola.shift(); enCurso++;
      const moneda = (t.r.ejercicio.campos.find((c) => c.campo === 'currency') || {}).valor;
      const res = await preguntarAClaude({ md: readFileSync(resolve(ROOT, t.r.md), 'utf8'), preguntas: t.pregs, modelo: MODELO,
        ctx: { carpeta: `${t.paisCarpeta}/${t.clubCarpeta}`, documento: basename(t.r.documento), pais: t.paisCarpeta, anio: t.r.ejercicio.anio, moneda } });
      gastado += res.costUsd || 0; hechas++; enCurso--;
      const claude = { preguntasHuella: t.preguntasHuella, fecha: new Date().toISOString(), modelo: res.model || MODELO, costUsd: Number((res.costUsd || 0).toFixed(5)), paginasEnviadas: res.paginasEnviadas, entero: res.entero, error: res.error, respuestas: res.respuestas };
      out.push({ t, claude });
      console.error(`  claude ${hechas}/${tareas.length} ${t.paisCarpeta}/${t.clubCarpeta}: ${res.respuestas.filter((x) => x.resuelta).length}/${t.pregs.length} resueltas, $${(res.costUsd || 0).toFixed(4)} (acumulado $${gastado.toFixed(3)})${res.error ? ' ERROR ' + res.error.slice(0, 120) : ''}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, trabajador));
  if (cola.length) console.error(`  Tope de gasto (--tope-usd ${TOPE_USD}) alcanzado: ${cola.length} carpetas quedaron sin preguntar.`);
  return { resultados: out, gastado };
}

// ============================================================================
// MODOS DE LA LÍNEA DE COMANDOS
// ============================================================================
export async function modoTodos() {
  const sitio = cargarSitioCache();
  const { todasLasCarpetas } = await import('./carpetas-clubes.mjs');
  let carpetas = todasLasCarpetas().filter((c) => c.via === 'nuevo' && !c.carpeta.startsWith('_'));
  const solo = flagVal('--solo');
  if (solo) carpetas = carpetas.filter((c) => `${c.pais}/${c.carpeta}`.includes(solo));
  const previo = leerRegistro();
  // SIN DOCUMENTO QUE SIRVA. Athens Kallithea (su único documento es el balance del municipio, descartado) y Catania
  // (su único documento está en una de las dos listas) salían "listo-para-alta". Escalón antes de la huella, con UNA compuerta: TODOS los .md de la carpeta
  // están en Admin/registros/documentos-descartados.txt o documentos-parciales.txt (la misma lectura que cargar-lote.mjs, 232 j). Si
  // pasa, la carpeta no se analiza y queda `faltan-datos` con la lista (no se borra: un parcial espera el otro tramo). Una carpeta con
  // ALGÚN documento en esas listas (Atromitos, 1 de 24) no cambia. La huella guardada lleva el prefijo `sin-doc-util:` para que, si un
  // documento sale de la lista, la corrida siguiente no la dé por "sin cambios" y la analice.
  const leerLineas = (f) => (existsSync(resolve(ROOT, f)) ? readFileSync(resolve(ROOT, f), 'utf8').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')) : []);
  const fueraDeCarga = new Set([...leerLineas('Admin/registros/documentos-descartados.txt'), ...leerLineas('Admin/registros/documentos-parciales.txt')].map((d) => d.replace(/\.(pdf|md)$/i, '')));
  const nuevas = []; const tareas = []; let sinCambio = 0;
  for (const c of carpetas) {
    const k = `Clubes/${c.pais}/${c.carpeta}/`;
    const p = previo.get(k);
    const mds = mdsDeCarpeta(c.pais, c.carpeta);
    const { huella, detalle: entradas } = huellaCarpeta(c.pais, c.carpeta, mds, null);
    if (mds.length && mds.every((m) => fueraDeCarga.has(m.replace(/\.md$/i, '')))) {
      if (p && p.huella === `sin-doc-util:${huella}` && !FORZAR) { sinCambio++; continue; }
      nuevas.push({ carpeta: k, pais: c.pais, club: c.carpeta, fecha: new Date().toISOString(), huella: `sin-doc-util:${huella}`, entradas, clubId: null, estado: 'faltan-datos', documento: null, detalle: `todos sus documentos están descartados o son parciales (Admin/registros/documentos-descartados.txt / documentos-parciales.txt): ${mds.join('; ')}`, preguntas: [], pendientes: [], resueltas: [], claude: null });
      continue;
    }
    // Sin cambios de huella: la línea sigue valiendo. Solo se rehace si se pide Claude y a esa carpeta
    // todavía le quedan preguntas de documento sin preguntar.
    const faltaClaude = CLAUDE && p && (p.preguntas || []).some((q) => q.clase === 'documento' && !q.claude) || (CLAUDE && p && (p.pendientes || []).some((q) => q.campo === 'name') && !p.claude);
    if (p && p.huella === huella && !FORZAR && !faltaClaude) { sinCambio++; continue; }
    const x = analizarCarpeta(c.pais, c.carpeta, sitio, p);
    if (x.pendienteClaude && CLAUDE) tareas.push(x.pendienteClaude);
    nuevas.push(x.entrada);
  }
  // Las de Claude, en tanda (con tope de gasto) y después se rehace su entrada con lo que desbloquea.
  if (tareas.length) {
    // Primero las carpetas que Claude puede dejar LISTAS: sin preguntas de producto (que Claude no
    // desbloquea) y con menos preguntas. Con tope de gasto, así rinde más cada dólar.
    const prodCount = (t) => [...t.r.campos, ...t.r.ejercicio.campos].filter((c) => c.estado === 'pregunta' && clasePregunta(c, t.r) === 'producto').length;
    // Las que solo tienen `name` pendiente (no bloquea) van al final.
    const soloNombre = (t) => (t.pregs.every((p) => p.tipo === 'name') ? 1 : 0);
    tareas.sort((a, b) => soloNombre(a) - soloNombre(b) || prodCount(a) - prodCount(b) || a.pregs.length - b.pregs.length || a.r.carpeta.localeCompare(b.r.carpeta));
    const lim = LIMITE !== null ? tareas.slice(0, LIMITE) : tareas;
    console.error(`Claude: ${lim.length} carpetas con preguntas de documento (modelo ${MODELO}, tope US$ ${TOPE_USD}).`);
    const { resultados, gastado } = await correrClaude(lim);
    for (const { t, claude } of resultados) {
      const e = finalizar({ ...t, claude });
      const i = nuevas.findIndex((n) => n.carpeta === e.carpeta);
      nuevas[i] = e;
    }
    console.error(`Claude: gastado US$ ${gastado.toFixed(3)}.`);
  }
  // YA DADAS DE ALTA. Una carpeta deja de ser `nuevo` cuando su club entra al sitio, y
  // desde ahí este bucle no la mira: su línea vieja ("listo-para-alta" del día del ensayo) quedaba congelada y el resumen del pipeline
  // seguía ofreciendo dar de alta a Atalanta, Inter, Lazio... (25 líneas así al medirlo, 21 italianas y 4 de Brasil). Escalón nuevo,
  // gratis y sin analizar nada: si la carpeta ya resuelve a un club del sitio, su línea pasa a `existe` con ese clubId. Las demás no cambian.
  const yaEnSitio = todasLasCarpetas().filter((c) => c.via !== 'nuevo' && c.clubId && !c.carpeta.startsWith('_') && (!solo || `${c.pais}/${c.carpeta}`.includes(solo)));
  let pasanAExiste = 0;
  for (const c of yaEnSitio) {
    const p = previo.get(`Clubes/${c.pais}/${c.carpeta}/`);
    if (!p || p.estado === 'existe') continue;
    nuevas.push({ ...p, clubId: c.clubId, estado: 'existe', detalle: `el club ya está en el sitio (${c.clubId}, ${c.via}: ${c.fuente || ''}); la línea anterior era "${p.estado}"`, fecha: new Date().toISOString() });
    pasanAExiste++;
  }
  guardarEnRegistro(nuevas);
  console.log(`${carpetas.length} carpetas de club nuevo: ${nuevas.length - pasanAExiste} recalculadas, ${sinCambio} sin cambios de huella.${pasanAExiste ? ` ${pasanAExiste} carpeta(s) de clubes ya dados de alta pasan a "existe".` : ''}`);
  imprimirResumen();
}

export function imprimirResumen() {
  const s = resumenAltas();
  console.log(`\nAdmin/registros/altas-club.jsonl: ${s.total} carpetas — ${ESTADOS.map((e) => `${e} ${s.porEstado[e] || 0}`).join(' · ')}`);
  console.log(`Preguntas abiertas por campo: ${Object.entries(s.preguntasPorCampo).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', ') || 'ninguna'}`);
  console.log(`Campos resueltos por Claude con cita verificada: ${s.resueltasPorClaude}`);
  if (s.listos.length) {
    console.log(`\nListos para alta (${s.listos.length}):`);
    for (const l of s.listos) console.log(`  ${String(l.clubId).padEnd(26)} ${l.documento}`);
  }
}

// Candidatas a Admin/dudas-por-club.md: preguntas de LECTURA del documento que Claude leyó y no pudo
// sostener con una cita (o dijo que el documento no lo dice). NO se escriben en dudas-por-club.md: la
// lista es para que Guido decida. Con qué páginas se revisaron, para no volver a leerlas.
export function modoDudas() {
  const reg = leerRegistro();
  let n = 0; let sinPreguntar = 0; let producto = 0;
  for (const e of [...reg.values()].sort((a, b) => a.carpeta.localeCompare(b.carpeta))) {
    for (const q of e.preguntas || []) {
      if (q.clase === 'producto') { producto++; continue; }
      if (!q.claude) { sinPreguntar++; continue; }
      if (!q.candidataDudas) continue;
      n++;
      console.log(`\n${e.carpeta}  (${e.clubId}, documento ${e.documento})`);
      console.log(`  ? ${q.campo}: ${q.pregunta}`);
      console.log(`    Claude (${e.claude && e.claude.modelo}): ${q.claude.valor || '(sin valor)'} — ${q.claude.respuesta || ''} [confianza ${q.claude.confianza}; ${q.claude.motivoNoResuelta}]`);
      for (const c of q.claude.citas || []) console.log(`      cita pág. ${c.pagina} ${c.ok ? 'VERIFICADA' : 'NO verificada (' + c.motivo + ')'}: "${String(c.texto).slice(0, 160)}"`);
      console.log(`    Páginas revisadas: ${e.claude && e.claude.entero ? 'el documento entero' : (e.claude && e.claude.paginasEnviadas || []).join(', ')}`);
    }
  }
  console.log(`\n${n} preguntas candidatas a Admin/dudas-por-club.md (NO se escribieron: decide Guido). Además: ${sinPreguntar} de documento todavía sin preguntar a Claude (correr --todos --claude) y ${producto} de producto (las decide Guido, no un club).`);
}
