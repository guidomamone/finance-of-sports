#!/usr/bin/env node
// ============================================================================
// tools/estimar.mjs — MODELO QUE ESTIMA EL INGRESO DE UN CLUB-AÑO SIN BALANCE. Mide (--medir) y escribe data/estimados/.
//
// POR QUÉ. Ligas con 3 clubes cargados de 20 no dicen cuánto mueve la liga. Una estimación puede llenar
// el hueco, pero solo si su error está medido contra años reales y se muestra aparte, rotulada "estimado". Regla: si el modelo no le
// gana a la base simple, no se muestra.
//
// DATOS. Los club-años con ingreso de data/rankings/ (millones de USD con el tipo de cambio de cada documento, salidos de
// computeYearGeneric()), llevados a USD constantes con data/deflactores.js. Se modela el logaritmo (un club 10 veces más grande no
// tapa al resto).
//
// VARIABLES (cada una se calcula SIN el club-año que se está prediciendo, y sin el club entero en la validación por club):
//   M  liga-año: mediana del log ingreso de los OTROS clubes cargados de esa liga ese año (si hay menos de 2, la de la liga en todos sus
//      años, y si tampoco, la del país y la división).
//   H  historia del club: su distancia a la mediana de su liga en sus otros años (log ingreso - M de ese año), promediada con más peso a
//      los años cercanos. Sin otros años, no hay H.
//   I  el propio club interpolado entre su año real anterior y el siguiente (o el más cercano).
//   tier  la división (1, 2, 3+), de data/leagues.js.
//   q  posición final en la tabla, 0 = campeón, 1 = último (listas de Wikipedia, vía faltantes-liga.mjs), con una marca si no hay tabla.
// MODELO: regresión lineal (mínimos cuadrados) del log ingreso. Con historia: log = a + b*M + c*H + d*I + tier + q. Sin historia
// (club nuevo): log = a + b*M + tier + q.
//
// Lo demás de esta cabecera, tal cual: Admin/NOTAS-DE-TOOLS.md, «estimar.mjs».
//
// USO:
//   node tools/estimar.mjs --medir [--sin-posicion] [--detalle | --detalle-clubes]
//        --detalle: además de los totales, el error por país, por liga y por división, el sesgo con signo por país (+ = el modelo
//        sobreestima) y la dispersión del log ingreso dentro de la liga-año, en las dos validaciones. --detalle-clubes: lo mismo más una
//        línea por club-año (error del modelo y de la mediana de la liga). Solo lectura; sin la opción la salida no cambia.
//   node tools/estimar.mjs [--escribir | --check]   ver "estimaciones publicables", más abajo
// ============================================================================
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { calcular as faltantes } from './faltantes-liga.mjs';
const { cierreDelClub } = createRequire(import.meta.url)('./cierre-ejercicio.js');

const ROOT = resolve(import.meta.dirname, '..');

// PAÍSES SIN ESTIMADOS: el modelo erra demasiado ahí (Estonia 86%). Un país de esta lista no publica ningún estimado en Ligas
// (ni club nuevo ni año que falta); sus años reales siguen entrando al ajuste del resto. Es el único lugar donde se declara: sacar el país de acá
// y correr `node tools/estimar.mjs --escribir` lo vuelve a prender. Volver a medir cuando entren más años (`--medir --detalle`).
const PAISES_SIN_ESTIMAR = new Set(['ee']);

// q: posición final normalizada (0 = campeón, 1 = último) del club en esa liga-año, de las tablas de Wikipedia que une faltantes-liga.mjs.
// El año de rankings es el del ejercicio; la tabla es de la temporada (un cierre entre septiembre y diciembre en liga partida -> la
// temporada que termina al año siguiente, la regla de faltantes-liga.mjs).
let POS = null, CLUBS_ = null;
function posicion(id, liga, anio, S = null) {
  if (!POS) { POS = faltantes().posiciones; const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx); CLUBS_ = vm.runInContext('clubs', ctx); }
  const cand = S != null ? [S] : [anio, anio + 1];
  for (const t of cand) {
    const e = POS[`${liga}|${t}|${id}`]; if (!e) continue;
    if (S == null) { const mes = Number(cierreDelClub(CLUBS_[id], anio).slice(5, 7)); const t2 = e.partida && mes >= 9 ? anio + 1 : anio; if (t2 !== t) continue; }
    return e.de > 1 ? (e.pos - 1) / (e.de - 1) : null;
  }
  return null;
}
const CON_POS = !process.argv.includes('--sin-posicion');
const DETALLE = process.argv.includes('--detalle') || process.argv.includes('--detalle-clubes');
let RANK = {};
// El margen bruto de un club-año que generate-rankings.js sacó del ranking: { margen, ancla } en USD nominales, o null.
function margenDe(liga, anio, id) {
  const e = (((RANK[liga] || {})[anio] || {}).margen || []).find((x) => x[0] === id);
  return e ? { margen: e[1], ancla: e[2] } : null;
}
function datos() {
  const c = { window: {} };
  for (const f of readdirSync(resolve(ROOT, 'data', 'rankings'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'rankings', f), 'utf8'), c);
  RANK = c.window.RANKINGS;
  vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'deflactores.js'), 'utf8'), c);
  vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8').replace(/^const /gm, 'var '), c);
  const D = c.window.DEFLACTORES.USD.valores; const ultimo = Math.max(...Object.keys(D).map(Number));
  const rows = [];
  for (const [liga, ys] of Object.entries(c.window.RANKINGS)) for (const [y, v] of Object.entries(ys)) for (const cl of v.clubs) {
    if (!(cl.revenue > 0)) continue;
    const anio = +y; const real = cl.revenue * D[ultimo] / D[Math.min(anio, ultimo)];
    rows.push({ id: cl.id, liga, anio, pais: liga.slice(0, 2), tier: Math.min(3, c.window.LEAGUES[liga]?.tier || 1), y: Math.log(real), real, q: CON_POS ? posicion(cl.id, liga, anio) : null });
  }
  return rows;
}

const mediana = (a) => { if (!a.length) return null; const s = [...a].sort((x, z) => x - z); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const cuantil = (a, q) => { const s = [...a].sort((x, z) => x - z); const i = (s.length - 1) * q; const lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); };

// Índices para calcular las variables rápido, dejando afuera lo que no se puede ver.
function indices(rows) {
  const porLigaAnio = new Map(), porLiga = new Map(), porPaisTier = new Map(), porClub = new Map();
  for (const r of rows) {
    for (const [m, k] of [[porLigaAnio, `${r.liga}|${r.anio}`], [porLiga, r.liga], [porPaisTier, `${r.pais}|${r.tier}`], [porClub, r.id]]) (m.get(k) || m.set(k, []).get(k)).push(r);
  }
  return { porLigaAnio, porLiga, porPaisTier, porClub };
}
// M del club-año r sin el club r.id ni nada de `fuera` (un Set de filas o de ids de club)
function M(ix, r, fuera) {
  const ok = (o) => o.id !== r.id && !fuera.has(o) && !fuera.has(o.id);
  for (const lista of [ix.porLigaAnio.get(`${r.liga}|${r.anio}`), ix.porLiga.get(r.liga), ix.porPaisTier.get(`${r.pais}|${r.tier}`)]) {
    const v = (lista || []).filter(ok).map((o) => o.y); if (v.length >= 2) return mediana(v);
  }
  return null;
}
function H(ix, r, fuera) {
  const otros = (ix.porClub.get(r.id) || []).filter((o) => o !== r && !fuera.has(o) && !fuera.has(o.id));
  let s = 0, w = 0;
  for (const o of otros) { const m = M(ix, o, fuera); if (m == null) continue; const p = 1 / Math.max(1, Math.abs(o.anio - r.anio)); s += p * (o.y - m); w += p; }
  return w ? s / w : null;
}
// I: el propio club interpolado (log, USD constantes) entre su año anterior y su año siguiente; con uno solo de los dos, ese.
function I(ix, r, fuera) {
  const otros = (ix.porClub.get(r.id) || []).filter((o) => o !== r && !fuera.has(o) && !fuera.has(o.id));
  const antes = otros.filter((o) => o.anio < r.anio).sort((a, b) => b.anio - a.anio)[0], despues = otros.filter((o) => o.anio > r.anio).sort((a, b) => a.anio - b.anio)[0];
  if (antes && despues) return antes.y + (despues.y - antes.y) * (r.anio - antes.anio) / (despues.anio - antes.anio);
  return (antes || despues)?.y ?? null;
}
const cercano = (ix, r, fuera) => (ix.porClub.get(r.id) || []).filter((o) => o !== r && !fuera.has(o)).sort((a, b) => Math.abs(a.anio - r.anio) - Math.abs(b.anio - r.anio))[0];

// mínimos cuadrados por ecuaciones normales con un poco de ridge (estabilidad, no regularización de verdad)
function ajustar(X, y) {
  const k = X[0].length; const A = Array.from({ length: k }, () => Array(k).fill(0)); const b = Array(k).fill(0);
  for (let i = 0; i < X.length; i++) for (let p = 0; p < k; p++) { b[p] += X[i][p] * y[i]; for (let q = 0; q < k; q++) A[p][q] += X[i][p] * X[i][q]; }
  for (let p = 1; p < k; p++) A[p][p] += 1e-6;
  for (let p = 0; p < k; p++) { // Gauss-Jordan
    let mx = p; for (let r = p + 1; r < k; r++) if (Math.abs(A[r][p]) > Math.abs(A[mx][p])) mx = r;
    [A[p], A[mx]] = [A[mx], A[p]]; [b[p], b[mx]] = [b[mx], b[p]];
    for (let r = 0; r < k; r++) { if (r === p) continue; const f = A[r][p] / A[p][p]; for (let q = p; q < k; q++) A[r][q] -= f * A[p][q]; b[r] -= f * b[p]; }
  }
  return b.map((v, p) => v / A[p][p]);
}
const vector = (m, h, i, tier, q) => [...(h == null ? [1, m] : [1, m, h, i]), tier === 2 ? 1 : 0, tier === 3 ? 1 : 0, ...(CON_POS ? [q ?? 0.5, q == null ? 1 : 0] : [])];
const predecir = (w, x) => w.reduce((s, v, i) => s + v * x[i], 0);

// Una validación: para cada fila, `fuera` = lo que no se puede ver; ajusta con el resto (variables recalculadas sin `fuera`) y predice.
function validar(rows, ix, modo) {
  const res = { modelo: [], base: [], cercano: [], interp: [], entre: [], afuera: [], cubre: 0, n: 0, det: [] };
  const porClub = modo === 'club';
  const hechos = new Set();
  for (const r of rows) {
    if (porClub && hechos.has(r.id)) continue;
    const objetivo = porClub ? ix.porClub.get(r.id) : [r];
    if (porClub) hechos.add(r.id);
    const fuera = new Set(porClub ? [r.id] : [r]);
    const conH = !porClub;
    // entrenamiento
    const X = [], Y = [];
    for (const o of rows) {
      if (fuera.has(o) || fuera.has(o.id)) continue;
      const m = M(ix, o, fuera); if (m == null) continue;
      const h = conH ? H(ix, o, fuera) : null; if (conH && h == null) continue;
      X.push(vector(m, conH ? h : null, conH ? I(ix, o, fuera) : null, o.tier, o.q)); Y.push(o.y);
    }
    const w = ajustar(X, Y);
    const resid = X.map((x, i) => Y[i] - predecir(w, x)); const lo = cuantil(resid, 0.1), hi = cuantil(resid, 0.9);
    for (const t of objetivo) {
      const m = M(ix, t, fuera); if (m == null) continue;
      const h = conH ? H(ix, t, fuera) : null; if (conH && h == null) continue;
      const p = predecir(w, vector(m, conH ? h : null, conH ? I(ix, t, fuera) : null, t.tier, t.q));
      if (conH) res.interp.push(I(ix, t, fuera) - t.y);
      res.modelo.push(p - t.y); res.base.push(m - t.y); res.n++;
      res.det.push({ id: t.id, liga: t.liga, pais: t.pais, tier: t.tier, anio: t.anio, q: t.q, y: t.y, e: p - t.y, b: m - t.y }); // para --detalle
      if (conH) { const ys = (ix.porClub.get(t.id) || []).filter((o) => o !== t).map((o) => o.anio); (Math.min(...ys) < t.anio && Math.max(...ys) > t.anio ? res.entre : res.afuera).push(p - t.y); }
      if (t.y >= p + lo && t.y <= p + hi) res.cubre++;
      if (!porClub) { const c = cercano(ix, t, fuera); if (c) res.cercano.push(c.y - t.y); }
    }
  }
  return res;
}

const pct = (errs) => {
  const ape = errs.map((e) => Math.abs(Math.exp(e) - 1));
  return `error mediano ${(mediana(ape) * 100).toFixed(0)}% · a ±25%: ${(ape.filter((x) => x <= 0.25).length / ape.length * 100).toFixed(0)}% (n ${ape.length})`;
};

// ---------------------------------------------------------------------------- estimaciones publicables
// Dos casos. (1) "Falta un año de un club que tenemos", a 2 años o menos de un balance real: la INTERPOLACIÓN SIMPLE entre sus años
// reales (la regresión empata con ella). (2) Todo otro club de la lista de la liga sin balance ese año (club que nunca cargamos, o uno
// cargado pero a más de 2 años): la regresión sin historia (`caso: "nuevo"`: mediana de la liga-año, división y posición en la tabla),
// con ~50% de error medido. Prendido por Guido: en Ligas todo club sin balance figura como estimado. Un club que no está en
// el sitio va por su nombre (`n`, sin `id`) y su ejercicio es la temporada (cierre a mitad de año, el de casi todos los clubes de liga
// partida). El año es el del EJERCICIO, el mismo de data/rankings/: así el día que se
// carga el real el choque se ve directo. LO REAL GANA: nunca se escribe un estimado para un club-año cargado (data/club-index.js), y
// como cargar.mjs vuelve a correr esto después de cada carga, el estimado de un año que se acaba de cargar desaparece solo.
// INTERRUPTOR: mientras data/estimados/ no exista, nada se publica y --check pasa. Se prende con --escribir (decisión de Guido).
const DIR_EST = resolve(ROOT, 'data', 'estimados');
function estimaciones() {
  const rows = datos(); const ix = indices(rows); const vacio = new Set();
  const ci = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), ci); const CI = ci.window.CLUB_INDEX;
  const s = { window: {} }; s.window.window = s.window; const ctx = vm.createContext(s); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx); const CLUBS = vm.runInContext('clubs', ctx);
  const g = { window: {} }; for (const f of readdirSync(resolve(ROOT, 'data', 'faltantes'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'faltantes', f), 'utf8'), g);
  const paginas = {}; for (const f of readdirSync(resolve(ROOT, 'tools', 'club-league-reference')).filter((f) => /^[a-z]{2}\.json$/.test(f))) {
    for (const [l, ys] of Object.entries(JSON.parse(readFileSync(resolve(ROOT, 'tools', 'club-league-reference', f), 'utf8')).leagues)) for (const [y, r] of Object.entries(ys)) paginas[`${l}|${y}`] = r.wikipediaPage || '';
  }
  const lc = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8').replace(/^const /gm, 'var '), lc);
  const dc = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'deflactores.js'), 'utf8'), dc);
  const D = dc.window.DEFLACTORES.USD.valores; const ultimo = Math.max(...Object.keys(D).map(Number));
  // INTERPOLACIÓN SIMPLE (decisión de Guido: la regresión empata con ella, 22% contra 22%, y esta se explica en una línea).
  // Su error y su rango salen de los años reales: cada club-año real a 2 años o menos de otro, interpolado SIN él (validación por año),
  // separado en "entre dos reales" y "antes o después" (en ese caso, el año real más cercano).
  const errs = { entre: [], afuera: [] };
  for (const r of rows) {
    const otros = (ix.porClub.get(r.id) || []).filter((o) => o !== r); if (!otros.length) continue;
    if (Math.min(...otros.map((o) => Math.abs(o.anio - r.anio))) > 2) continue;
    const i = I(ix, r, new Set([r])); if (i == null) continue;
    errs[otros.some((o) => o.anio < r.anio) && otros.some((o) => o.anio > r.anio) ? 'entre' : 'afuera'].push(r.y - i);
  }
  const banda = Object.fromEntries(Object.entries(errs).map(([k, e]) => [k, { lo: cuantil(e, 0.1), hi: cuantil(e, 0.9), error: Math.round(mediana(e.map((x) => Math.abs(Math.exp(-x) - 1))) * 100), n: e.length }]));
  const nuevo = modeloNuevo(rows, ix);
  const out = {}; const r3 = (v) => Math.round(v * 1000) / 1000;
  for (const [liga, ys] of Object.entries(g.window.LEAGUE_GAPS || {})) for (const [S, v] of Object.entries(ys)) {
    if (v.reciente || PAISES_SIN_ESTIMAR.has(liga.slice(0, 2))) continue;
    const partida = /[–-]\d{2,4}\b/.test(paginas[`${liga}|${S}`] || '');
    for (const f of v.faltan) {
      const enSitio = !!(f.id && CLUBS[f.id]);
      const mes = enSitio ? Number((CLUBS[f.id].fiscalYearStart || '07-01').slice(0, 2)) : 7; const cierreMes = mes === 1 ? 12 : mes - 1;
      const anio = partida && cierreMes >= 9 ? +S - 1 : +S; // la temporada que termina en S -> el ejercicio (inverso de faltantes-liga)
      if (enSitio && (CI[f.id]?.yrs || []).some(([y]) => y === anio) && !(CI[f.id].gm || []).includes(anio)) continue; // lo real gana (un año de margen bruto no es real: se estima)
      // Un año de margen bruto (`gm` del índice; generate-rankings.js lo saca del ranking real): [margen en USD, ingreso real en USD si un informe posterior lo trae]. El real pisa
      // al estimado; el margen positivo es su piso (el ingreso nunca es menor).
      const mg = enSitio ? margenDe(liga, anio, f.id) : null;
      const conMargen = (row) => {
        if (!mg) return row;
        if (mg.ancla != null) return { ...row, revenue: mg.ancla, lo: mg.ancla, hi: mg.ancla, caso: 'ancla', error: 0, de: [], margen: true };
        if (mg.margen > 0) { const rev = Math.max(row.revenue, mg.margen); return { ...row, revenue: rev, lo: Math.max(row.lo, mg.margen), hi: Math.max(row.hi, rev), margen: true }; }
        return { ...row, margen: true };
      };
      if (mg && mg.ancla != null) { ((out[liga] ??= {})[anio] ??= []).push(conMargen({ id: f.id, revenue: mg.ancla, lo: mg.ancla, hi: mg.ancla })); continue; }
      const nom = (x) => r3(Math.exp(x) * D[Math.min(anio, ultimo)] / D[ultimo]);
      const tier = Math.min(3, lc.window.LEAGUES[liga]?.tier || 1);
      const propios = enSitio ? (ix.porClub.get(f.id) || []) : [];
      if (!propios.length || Math.min(...propios.map((o) => Math.abs(o.anio - anio))) > 2) {
        // club nuevo: la regresión sin historia. M sin el propio club; q de la tabla de la temporada.
        const t = { id: enSitio ? f.id : '#' + f.n, liga, anio, pais: liga.slice(0, 2), tier };
        const m = M(ix, t, vacio); if (m == null) continue;
        const q = CON_POS ? posicion(t.id, liga, anio, +S) : null;
        const p = predecir(nuevo.w, vector(m, null, null, tier, q)); const b = nuevo.banda;
        ((out[liga] ??= {})[anio] ??= []).push(conMargen({ ...(enSitio ? { id: f.id } : { n: f.n }), revenue: nom(p), lo: nom(p + b.lo), hi: nom(p + b.hi), caso: 'nuevo', error: b.error, de: [] }));
        continue;
      }
      const t = { id: f.id, liga, anio, pais: liga.slice(0, 2), tier };
      const p = I(ix, t, vacio); if (p == null) continue;
      const antes = propios.filter((o) => o.anio < anio).sort((a, b) => b.anio - a.anio)[0], despues = propios.filter((o) => o.anio > anio).sort((a, b) => a.anio - b.anio)[0];
      const caso = antes && despues ? 'entre' : 'afuera'; const b = banda[caso];
      // `de`: los ejercicios reales de los que sale (para el "por qué" en pantalla)
      ((out[liga] ??= {})[anio] ??= []).push(conMargen({ id: f.id, revenue: nom(p), lo: nom(p + b.lo), hi: nom(p + b.hi), caso, error: b.error, de: [antes?.anio, despues?.anio].filter(Boolean) }));
    }
  }
  return { out, CI, banda: { ...banda, nuevo: nuevo.banda } };
}
// La regresión sin historia (club nuevo), ajustada con todos los club-años reales. Su error y su rango del 80% salen de una validación
// por club en 10 grupos (cada grupo de clubes ENTEROS afuera, variables recalculadas sin ellos): lo mismo que mide --medir por club
// (uno por vez), en 10 ajustes en vez de uno por club, para que --check siga siendo rápido.
function modeloNuevo(rows, ix) {
  const filas = (fuera) => { const X = [], Y = []; for (const o of rows) { if (fuera.has(o.id)) continue; const m = M(ix, o, fuera); if (m == null) continue; X.push(vector(m, null, null, o.tier, o.q)); Y.push(o.y); } return { X, Y }; };
  const ids = [...new Set(rows.map((r) => r.id))].sort(); const errs = [];
  for (let k = 0; k < 10; k++) {
    const fuera = new Set(ids.filter((_, i) => i % 10 === k)); const { X, Y } = filas(fuera); const w = ajustar(X, Y);
    for (const t of rows) { if (!fuera.has(t.id)) continue; const m = M(ix, t, fuera); if (m == null) continue; errs.push(t.y - predecir(w, vector(m, null, null, t.tier, t.q))); }
  }
  const { X, Y } = filas(new Set());
  return { w: ajustar(X, Y), banda: { lo: cuantil(errs, 0.1), hi: cuantil(errs, 0.9), error: Math.round(mediana(errs.map((x) => Math.abs(Math.exp(-x) - 1))) * 100), n: errs.length } };
}
function archivosEstimados(out) {
  const files = {};
  for (const [liga, ys] of Object.entries(out)) {
    const cuerpo = Object.keys(ys).sort().map((y) => `  ${y}: ${JSON.stringify(ys[y].sort((a, b) => (a.id || a.n).localeCompare(b.id || b.n)))},`).join('\n');
    files[`${liga}.js`] = `// GENERADO por tools/estimar.mjs: no editar a mano. ESTIMACIONES, no datos reales: ingreso en millones de USD del año, rango del 80% (lo-hi) y error mediano medido (%).\nwindow.ESTIMADOS = window.ESTIMADOS || {};\nwindow.ESTIMADOS[${JSON.stringify(liga)}] = {\n${cuerpo}\n};\n`;
  }
  return files;
}

if (import.meta.url === `file://${process.argv[1]}` && !process.argv.includes('--medir')) {
  const { out, CI, banda } = estimaciones(); const files = archivosEstimados(out);
  if (!process.argv.includes("--check")) console.log(`estimados medidos con los años reales: ${Object.entries(banda).map(([k, b]) => `${{ entre: "entre dos reales", afuera: "antes o después", nuevo: "club nuevo (regresión)" }[k]} error mediano ${b.error}% (n ${b.n}, rango del 80% x${Math.exp(b.lo).toFixed(2)} a x${Math.exp(b.hi).toFixed(2)})`).join(" · ")}`);
  const n = Object.values(out).reduce((s, ys) => s + Object.values(ys).reduce((t, l) => t + l.length, 0), 0);
  if (process.argv.includes('--check')) {
    if (!existsSync(DIR_EST)) { console.log('estimar: data/estimados/ no existe (no se publican estimaciones): nada que chequear'); process.exit(0); }
    // un estimado al lado de un año real es el error que este archivo existe para evitar
    const chocan = [];
    for (const f of readdirSync(DIR_EST)) { const c = { window: {} }; vm.runInNewContext(readFileSync(resolve(DIR_EST, f), 'utf8'), c); for (const [, ys] of Object.entries(c.window.ESTIMADOS || {})) for (const [y, l] of Object.entries(ys)) for (const e of l) if ((CI[e.id]?.yrs || []).some(([a]) => a === +y) && !(CI[e.id].gm || []).includes(+y)) chocan.push(`${e.id} ${y}`); }
    const viejos = Object.entries(files).filter(([f, t]) => !existsSync(resolve(DIR_EST, f)) || readFileSync(resolve(DIR_EST, f), 'utf8') !== t).map(([f]) => f);
    const sobran = readdirSync(DIR_EST).filter((f) => !files[f]);
    if (chocan.length || viejos.length || sobran.length) { console.log(`estimar: ${chocan.length ? `ESTIMADO JUNTO A UN AÑO REAL (${chocan.join(', ')}); ` : ''}${viejos.length + sobran.length} archivos viejos: node tools/estimar.mjs --escribir`); process.exit(1); }
    console.log('estimar: al día'); process.exit(0);
  }
  if (process.argv.includes('--escribir') || existsSync(DIR_EST)) {
    mkdirSync(DIR_EST, { recursive: true });
    for (const [f, t] of Object.entries(files)) writeFileSync(resolve(DIR_EST, f), t);
    for (const f of readdirSync(DIR_EST)) if (!files[f]) unlinkSync(resolve(DIR_EST, f));
    console.log(`estimar: ${n} club-años estimados en ${Object.keys(files).length} ligas`);
  } else console.log(`estimar: ${n} club-años se estimarían en ${Object.keys(files).length} ligas (data/estimados/ no existe: no se escribe nada; --escribir lo prende)`);
}

if (import.meta.url === `file://${process.argv[1]}` && process.argv.includes('--medir')) {
  const rows = datos(); const ix = indices(rows);
  console.log(`${rows.length} club-años con ingreso real, ${new Set(rows.map((r) => r.id)).size} clubes, ${ix.porLigaAnio.size} liga-años; con posición final: ${rows.filter((r) => r.q != null).length}${CON_POS ? '' : ' (--sin-posicion: no se usa)'}\n`);
  for (const modo of ['anio', 'club']) {
    const r = validar(rows, ix, modo);
    console.log(modo === 'anio' ? 'POR AÑO (falta un año de un club que tenemos)' : 'POR CLUB (club que nunca cargamos)');
    console.log(`  modelo               ${pct(r.modelo)} · el real cae en el rango del 80%: ${(r.cubre / r.n * 100).toFixed(0)}%`);
    if (r.entre.length) console.log(`    entre dos reales   ${pct(r.entre)}\n    antes o después    ${pct(r.afuera)}`);
    console.log(`  base: mediana liga   ${pct(r.base)}`);
    if (r.cercano.length) console.log(`  base: año cercano    ${pct(r.cercano)}`);
    if (r.interp.length) console.log(`  base: interpolado    ${pct(r.interp)}`);
    console.log('');
    if (DETALLE) detalle(r.det);
  }
}

// --detalle: el error de cada validación agrupado (solo lectura; usa lo que validar() ya calculó, no cambia el modelo).
function detalle(det) {
  const ape = (e) => Math.abs(Math.exp(e) - 1);
  const resumen = (l, f = (d) => d.e) => { const a = l.map((d) => ape(f(d))); return { n: a.length, med: Math.round(mediana(a) * 100), p25: Math.round(a.filter((x) => x <= 0.25).length / a.length * 100) }; };
  const grupos = (clave) => { const m = new Map(); for (const d of det) { const k = clave(d); (m.get(k) || m.set(k, []).get(k)).push(d); } return [...m].sort((a, b) => b[1].length - a[1].length); };
  const sd = (a) => { const m = a.reduce((s, v) => s + v, 0) / a.length; return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length); };
  const linea = (k, l) => { const r = resumen(l), b = resumen(l, (d) => d.b); return `    ${String(k).padEnd(18)} n ${String(r.n).padStart(4)}  clubes ${String(new Set(l.map((d) => d.id)).size).padStart(3)}  modelo ${String(r.med).padStart(3)}% (a ±25%: ${String(r.p25).padStart(3)}%)  mediana liga ${String(b.med).padStart(3)}%`; };
  console.log('  DETALLE (error mediano |estimado/real - 1|; el modelo contra la mediana de la liga)');
  console.log('  por país (8 club-años o más):'); for (const [k, l] of grupos((d) => d.pais)) if (l.length >= 8) console.log(linea(k, l));
  console.log('  por liga (12 club-años o más):'); for (const [k, l] of grupos((d) => d.liga)) if (l.length >= 12) console.log(linea(k, l));
  console.log('  por división:'); for (const [k, l] of grupos((d) => d.tier).sort((a, b) => a[0] - b[0])) console.log(linea(`división ${k}`, l));
  const sesgo = (l) => Math.round(mediana(l.map((d) => Math.exp(d.e) - 1)) * 100);
  console.log(`  sesgo con signo por país (mediana del error en %; + = el modelo sobreestima): ${grupos((d) => d.pais).filter(([, l]) => l.length >= 8).map(([k, l]) => `${k} ${sesgo(l) > 0 ? '+' : ''}${sesgo(l)}`).join(', ')}`);
  const disp = [];
  for (const [k, l] of grupos((d) => d.pais)) {
    if (l.length < 8) continue;
    const porLigaAnio = new Map(); for (const d of l) { const c = `${d.liga}|${d.anio}`; (porLigaAnio.get(c) || porLigaAnio.set(c, []).get(c)).push(d.y); }
    const sds = [...porLigaAnio.values()].filter((a) => a.length >= 3).map(sd); if (sds.length) disp.push([k, mediana(sds)]);
  }
  console.log(`  dispersión del log ingreso dentro de la liga-año (mediana por país): ${disp.sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v.toFixed(2)}`).join(', ')}`);
  if (process.argv.includes('--detalle-clubes')) {
    console.log('  por club-año (liga, año, club, posición normalizada, error del modelo, error de la mediana de la liga; + = sobreestima):');
    for (const d of [...det].sort((a, b) => a.liga.localeCompare(b.liga) || a.anio - b.anio || a.id.localeCompare(b.id))) {
      console.log(`    ${d.liga.padEnd(18)} ${d.anio} ${d.id.padEnd(30)} q ${d.q == null ? ' -- ' : d.q.toFixed(2)}  modelo ${((Math.exp(d.e) - 1) * 100).toFixed(0).padStart(5)}%  mediana liga ${((Math.exp(d.b) - 1) * 100).toFixed(0).padStart(5)}%`);
    }
  }
  console.log('');
}
