#!/usr/bin/env node
// ============================================================================
// tools/estimar.mjs — MODELO QUE ESTIMA EL INGRESO DE UN CLUB-AÑO SIN BALANCE (to-do 270). Por ahora SOLO MIDE: no escribe nada.
//
// POR QUÉ (pedido de Guido, 2026-10-17). Ligas con 3 clubes cargados de 20 no dicen cuánto mueve la liga. Una estimación puede llenar
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
//   tier  la división (1, 2, 3+), de data/leagues.js.
// MODELO: regresión lineal (mínimos cuadrados) del log ingreso. Con historia: log = a + b*M + c*H + d*tier2 + e*tier3. Sin historia
// (club nuevo): log = a + b*M + d*tier2 + e*tier3.
//
// VALIDACIÓN CRUZADA:
//   por año  saca UN club-año (simula un año que falta de un club que tenemos)
//   por club saca el club ENTERO (simula un club que nunca cargamos)
// Contra dos bases: la mediana de la liga-año (M sola) y, por año, el año real más cercano del propio club (log de ese año, en USD
// constantes). Métricas: error mediano en % (|estimado/real - 1|), cuántos caen a ±25%, y cuántos reales caen dentro del rango del 80%
// (cuantiles 10-90 de los residuos del ajuste de entrenamiento).
//
// USO:
//   node tools/estimar.mjs --medir
// ============================================================================
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');

function datos() {
  const c = { window: {} };
  for (const f of readdirSync(resolve(ROOT, 'data', 'rankings'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'rankings', f), 'utf8'), c);
  vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'deflactores.js'), 'utf8'), c);
  vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8').replace(/^const /gm, 'var '), c);
  const D = c.window.DEFLACTORES.USD.valores; const ultimo = Math.max(...Object.keys(D).map(Number));
  const rows = [];
  for (const [liga, ys] of Object.entries(c.window.RANKINGS)) for (const [y, v] of Object.entries(ys)) for (const cl of v.clubs) {
    if (!(cl.revenue > 0)) continue;
    const anio = +y; const real = cl.revenue * D[ultimo] / D[Math.min(anio, ultimo)];
    rows.push({ id: cl.id, liga, anio, pais: liga.slice(0, 2), tier: Math.min(3, c.window.LEAGUES[liga]?.tier || 1), y: Math.log(real), real });
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
const vector = (m, h, i, tier) => (h == null ? [1, m, tier === 2 ? 1 : 0, tier === 3 ? 1 : 0] : [1, m, h, i, tier === 2 ? 1 : 0, tier === 3 ? 1 : 0]);
const predecir = (w, x) => w.reduce((s, v, i) => s + v * x[i], 0);

// Una validación: para cada fila, `fuera` = lo que no se puede ver; ajusta con el resto (variables recalculadas sin `fuera`) y predice.
function validar(rows, ix, modo) {
  const res = { modelo: [], base: [], cercano: [], interp: [], entre: [], afuera: [], cubre: 0, n: 0 };
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
      X.push(vector(m, conH ? h : null, conH ? I(ix, o, fuera) : null, o.tier)); Y.push(o.y);
    }
    const w = ajustar(X, Y);
    const resid = X.map((x, i) => Y[i] - predecir(w, x)); const lo = cuantil(resid, 0.1), hi = cuantil(resid, 0.9);
    for (const t of objetivo) {
      const m = M(ix, t, fuera); if (m == null) continue;
      const h = conH ? H(ix, t, fuera) : null; if (conH && h == null) continue;
      const p = predecir(w, vector(m, conH ? h : null, conH ? I(ix, t, fuera) : null, t.tier));
      if (conH) res.interp.push(I(ix, t, fuera) - t.y);
      res.modelo.push(p - t.y); res.base.push(m - t.y); res.n++;
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
// SOLO el caso "falta un año de un club que tenemos" (el de club nuevo pierde contra la mediana de la liga: no se publica), y solo a 2
// años o menos de un balance real (más lejos no está medido). El año es el del EJERCICIO, el mismo de data/rankings/: así el día que se
// carga el real el choque se ve directo. LO REAL GANA: nunca se escribe un estimado para un club-año cargado (data/club-index.js), y
// como cargar.mjs vuelve a correr esto después de cada carga, el estimado de un año que se acaba de cargar desaparece solo.
// INTERRUPTOR: mientras data/estimados/ no exista, nada se publica y --check pasa. Se prende con --escribir (decisión de Guido).
const DIR_EST = resolve(ROOT, 'data', 'estimados');
const ERROR_MEDIDO = { entre: 19, afuera: 26 }; // error mediano de la validación por año (node tools/estimar.mjs --medir)
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
  // el modelo, ajustado con todos los años reales
  const X = [], Y = [];
  for (const o of rows) { const m = M(ix, o, vacio), h = H(ix, o, vacio); if (m == null || h == null) continue; X.push(vector(m, h, I(ix, o, vacio), o.tier)); Y.push(o.y); }
  const w = ajustar(X, Y); const resid = X.map((x, i) => Y[i] - predecir(w, x)); const lo = cuantil(resid, 0.1), hi = cuantil(resid, 0.9);
  const out = {}; const r3 = (v) => Math.round(v * 1000) / 1000;
  for (const [liga, ys] of Object.entries(g.window.LEAGUE_GAPS || {})) for (const [S, v] of Object.entries(ys)) {
    if (v.reciente) continue;
    const partida = /[–-]\d{2,4}\b/.test(paginas[`${liga}|${S}`] || '');
    for (const f of v.faltan) {
      if (!f.id || !CLUBS[f.id]) continue;
      const mes = Number((CLUBS[f.id].fiscalYearStart || '07-01').slice(0, 2)); const cierreMes = mes === 1 ? 12 : mes - 1;
      const anio = partida && cierreMes >= 9 ? +S - 1 : +S; // la temporada que termina en S -> el ejercicio (inverso de faltantes-liga)
      if ((CI[f.id]?.yrs || []).some(([y]) => y === anio)) continue; // lo real gana
      const propios = ix.porClub.get(f.id) || []; if (!propios.length) continue;
      const dist = Math.min(...propios.map((o) => Math.abs(o.anio - anio))); if (dist > 2) continue;
      const t = { id: f.id, liga, anio, pais: liga.slice(0, 2), tier: Math.min(3, lc.window.LEAGUES[liga]?.tier || 1) };
      const m = M(ix, t, vacio), h = H(ix, t, vacio), i = I(ix, t, vacio); if (m == null || h == null || i == null) continue;
      const p = predecir(w, vector(m, h, i, t.tier)); const nom = (x) => r3(Math.exp(x) * D[Math.min(anio, ultimo)] / D[ultimo]);
      const entre = propios.some((o) => o.anio < anio) && propios.some((o) => o.anio > anio);
      ((out[liga] ??= {})[anio] ??= []).push({ id: f.id, revenue: nom(p), lo: nom(p + lo), hi: nom(p + hi), caso: entre ? 'entre' : 'afuera', error: ERROR_MEDIDO[entre ? 'entre' : 'afuera'] });
    }
  }
  return { out, CI };
}
function archivosEstimados(out) {
  const files = {};
  for (const [liga, ys] of Object.entries(out)) {
    const cuerpo = Object.keys(ys).sort().map((y) => `  ${y}: ${JSON.stringify(ys[y].sort((a, b) => a.id.localeCompare(b.id)))},`).join('\n');
    files[`${liga}.js`] = `// GENERADO por tools/estimar.mjs: no editar a mano. ESTIMACIONES, no datos reales: ingreso en millones de USD del año, rango del 80% (lo-hi) y error mediano medido (%).\nwindow.ESTIMADOS = window.ESTIMADOS || {};\nwindow.ESTIMADOS[${JSON.stringify(liga)}] = {\n${cuerpo}\n};\n`;
  }
  return files;
}

if (import.meta.url === `file://${process.argv[1]}` && !process.argv.includes('--medir')) {
  const { out, CI } = estimaciones(); const files = archivosEstimados(out);
  const n = Object.values(out).reduce((s, ys) => s + Object.values(ys).reduce((t, l) => t + l.length, 0), 0);
  if (process.argv.includes('--check')) {
    if (!existsSync(DIR_EST)) { console.log('estimar: data/estimados/ no existe (no se publican estimaciones): nada que chequear'); process.exit(0); }
    // un estimado al lado de un año real es el error que este archivo existe para evitar
    const chocan = [];
    for (const f of readdirSync(DIR_EST)) { const c = { window: {} }; vm.runInNewContext(readFileSync(resolve(DIR_EST, f), 'utf8'), c); for (const [, ys] of Object.entries(c.window.ESTIMADOS || {})) for (const [y, l] of Object.entries(ys)) for (const e of l) if ((CI[e.id]?.yrs || []).some(([a]) => a === +y)) chocan.push(`${e.id} ${y}`); }
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
  console.log(`${rows.length} club-años con ingreso real, ${new Set(rows.map((r) => r.id)).size} clubes, ${ix.porLigaAnio.size} liga-años\n`);
  for (const modo of ['anio', 'club']) {
    const r = validar(rows, ix, modo);
    console.log(modo === 'anio' ? 'POR AÑO (falta un año de un club que tenemos)' : 'POR CLUB (club que nunca cargamos)');
    console.log(`  modelo               ${pct(r.modelo)} · el real cae en el rango del 80%: ${(r.cubre / r.n * 100).toFixed(0)}%`);
    if (r.entre.length) console.log(`    entre dos reales   ${pct(r.entre)}\n    antes o después    ${pct(r.afuera)}`);
    console.log(`  base: mediana liga   ${pct(r.base)}`);
    if (r.cercano.length) console.log(`  base: año cercano    ${pct(r.cercano)}`);
    if (r.interp.length) console.log(`  base: interpolado    ${pct(r.interp)}`);
    console.log('');
  }
}
