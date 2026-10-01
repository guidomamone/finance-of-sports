#!/usr/bin/env node
// ============================================================================
// tools/caja-deuda.mjs — ETAPA 6b del proceso nuevo: CAJA y DEUDA del balance (fiscalYearMeta.cash y .grossDebt). Gratis, sin IA. NUNCA FRENA.
//
// POR QUÉ (Versión 352, plan aprobado por Guido el 2026-10-01: "enrich the process para tener caja y debt, pero que no tenerlo NO FRENE").
// cargar.mjs escribía grossDebt y cash en null ("sin dato no es cero"), así que todo año cargado por el script quedaba sin el cuadro "Deuda
// bruta / Caja / Deuda neta" del sitio (UC 2018-2021 y 2025), mientras 289 de los 310 años cargados a mano los tienen.
//
// QUÉ ES CADA COSA (club-data-mapping, sección 14). El criterio de "deuda" es POR CLUB: Boca usa "Deudas", River "Préstamos", UC "Otros pasivos
// financieros" (corriente + no corriente), Racing el TOTAL del pasivo. Por eso el primer escalón aprende del propio club; para un club sin
// precedente, el criterio por defecto es DEUDA FINANCIERA (préstamos y obligaciones bancarias/financieras, corriente + no corriente), nunca el
// total del pasivo (ok de Guido, 2026-10-01). Caja: efectivo y equivalentes / caja y bancos / disponibilidades.
//
// LA ESCALERA (cada dato por separado; si ninguno da, null y un aviso, y la carga sigue):
//   ESCALÓN 0  precedente del club: en otro año ya cargado del club, qué filas del balance suman lo que tiene el sitio (1 a 3 filas, por
//              familia de etiqueta: tools/vocabulario.mjs claveFamilia). En este documento se buscan las mismas filas y se suman.
//   ESCALÓN 1  vocabulario (tools/vocabulario.mjs CAJA / DEUDA_FINANCIERA) en las páginas del balance: si hay UNA sola lectura posible.
//   ESCALÓN 2  (falta, paso 2 del plan) IA que elige las filas con cita.
//   nada       null + aviso.
// Solo se leen las páginas del BALANCE: las que tienen el título (TITULO_BALANCE) o un total del activo / del pasivo, sin el título del flujo
// de efectivo. La columna es la PRIMERA cifra de la fila que no sea una referencia a nota (un entero de 1-2 dígitos al principio).
//
// LA ESCALA. El sitio guarda millones de la moneda del documento. El escalón 0 usa la escala con la que el precedente cerró; el escalón 1 la que
// le pasa quien llama (`factor`: la del estado de resultados de ese documento, que verificar.mjs ya conoce). Sin factor, el escalón 1 no da número.
//
// USO:
//   node tools/caja-deuda.mjs "<pdf o md>" --club <clubId> [--anio 2024] [--factor 0.001]    qué leería (con el precedente de los otros años)
//   node tools/caja-deuda.mjs --medir [--club <clubId>] [--detalle]                           MEDICIÓN sobre los años ya cargados (ver abajo)
//
// --medir: para cada año ya cargado con grossDebt/cash y con transcripción (la fuente nombra el .md), lee el balance como si fuera un año nuevo
// y lo compara con lo cargado a mano. El precedente sale SOLO de los OTROS años del club (nunca del mismo: si no, se aprendería la respuesta).
// El factor del escalón 1 sale de la escala del estado de resultados de ese documento contra lo cargado (la misma información que en el lote
// trae verificar.mjs). No escribe nada.
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { readdirSync } from 'node:fs';
import { normalizar, claveFamilia, CAJA_RE, DEUDA_FINANCIERA_RE, TITULO_BALANCE_RE, TOTAL_ACTIVO_RE, TOTAL_PASIVO_RE, FLUJO_O_PATRIMONIO_RE, esTotal } from './vocabulario.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const PAG_RE = /^---\s*pág\.\s*(\d+)\s*---/i;
const IMPORTE_RE = /\(?-?\d{1,3}(?:[.,' ]\d{3})+(?:[.,]\d{1,2})?\)?|\(?-?\d+[.,]\d{1,2}\)?|\(?-?\b\d{1,}\b\)?/g;
const FACTORES = [1e-6, 1e-3, 1];
const TOL = (v) => Math.max(0.0015, Math.abs(v) * 1e-4);

function parseNumber(raw) {
  let s = String(raw).trim().replace(/R\$|[$€£¥]/g, '').trim();
  if (!/\d/.test(s)) return null;
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−')) { neg = true; s = s.slice(1); }
  s = s.replace(/(\d)[ '](?=\d{3}\b)/g, '$1');
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c !== -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 3) s = s.replace(/\./g, '');
  const n = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? null : (neg ? -n : n);
}

// Las filas de la transcripción: etiqueta + cifras (tablas markdown y renglones de texto), con su página y su línea.
export function filasDelMd(md) {
  const L = md.split('\n'); const filas = []; let pagina = 1; const textoPag = new Map();
  for (let i = 0; i < L.length; i++) {
    const l = L[i]; const m = l.match(PAG_RE); if (m) { pagina = Number(m[1]); continue; }
    textoPag.set(pagina, (textoPag.get(pagina) || '') + '\n' + l);
    let etiqueta = null; let crudos = [];
    if (l.trim().startsWith('|')) {
      const celdas = l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
      if (celdas.every((c) => /^:?-{2,}:?$/.test(c) || !c)) continue;
      const iEt = celdas.findIndex((c) => /\p{L}{3,}/u.test(c)); if (iEt < 0) continue;
      etiqueta = celdas[iEt]; crudos = celdas.slice(iEt + 1).filter((c) => /\d/.test(c) && !/\p{L}{2,}/u.test(c));
    } else {
      const t = l.replace(/\*\*/g, ''); if (!/\p{L}{3,}/u.test(t) || !/\d/.test(t)) continue;
      const mm = t.match(/^(.*?\p{L}[^\d(]*?)\s{2,}([-(\d].*)$/u) || t.match(/^(.*?\p{L}[^\d(]*?)\s+([-(]?\d[\d.,' ]*\)?(?:\s+[-(]?\d[\d.,' ]*\)?)*)\s*$/u);
      if (!mm) continue; etiqueta = mm[1].trim(); crudos = (mm[2].match(IMPORTE_RE) || []);
    }
    let nums = crudos.map(parseNumber).filter((n) => n !== null);
    // Referencia a nota: un entero chico (1-2 dígitos, sin separador) al principio, seguido de más cifras.
    while (nums.length > 1 && Number.isInteger(nums[0]) && Math.abs(nums[0]) < 100 && !/[.,]/.test(String(crudos[0]))) { nums = nums.slice(1); crudos = crudos.slice(1); }
    if (!nums.length) continue;
    filas.push({ linea: i + 1, pagina, etiqueta, norm: normalizar(etiqueta), familia: claveFamilia(etiqueta), valor: nums[0], cifras: nums });
  }
  // Páginas del balance: título o total del activo/pasivo, y sin el título del flujo de efectivo / cambios en el patrimonio.
  // Dos ajustes PROPIOS de esta tool (no se tocaron las regex compartidas de vocabulario.mjs, que usan otras tools): (1) plurales: UC 2024
  // titula "Estados de Situación Financiera Consolidados" y su total es "TOTAL DE ACTIVOS", que TITULO_BALANCE / TOTAL_ACTIVO no reconocían
  // (la página 7 del visor, el balance, quedaba afuera); (2) un total con muchas palabras de más no es el del balance: "Total Activos Líquidos en
  // Moneda Extranjera" (UC 2024, Nota 25, págs. 46 y 94 del visor) marcaba como balance una nota con la caja partida por moneda.
  const balance = new Set();
  for (const [p, txt] of textoPag) {
    const n = normalizar(txt.slice(0, 1500));
    const conTotal = filas.some((f) => f.pagina === p && esTotalBalance(f.norm));
    if ((TITULO_BALANCE_RE.test(n) || TITULO_BALANCE_PLURAL_RE.test(n) || conTotal) && !FLUJO_O_PATRIMONIO_RE.test(n)) balance.add(p);
  }
  // La página siguiente a una del balance también (el pasivo suele seguir), si no es el flujo.
  for (const p of [...balance]) { const n = normalizar((textoPag.get(p + 1) || '').slice(0, 1500)); if (textoPag.has(p + 1) && !FLUJO_O_PATRIMONIO_RE.test(n)) balance.add(p + 1); }
  // (Probado y DESCARTADO en la Versión 352: leer solo el "balance principal", el primer tramo de páginas seguidas. Arreglaba U. de Chile 2022,
  // pero 13 cajas que salían bien dejaban de salir: manta corta. Ver la deduplicación por importe en porVocabulario.)
  for (const f of filas) f.balance = balance.has(f.pagina);
  return filas;
}

const TITULO_BALANCE_PLURAL_RE = /\bestados? (consolidados? )?de situacion|\bbalances? generale?s?\b|\bbalancos? patrimoniai?s?\b|\bbalance sheets?\b|\bstatements? of financial position/u;
const TOTAL_BALANCE_RE = /^[\s*]*(?:\(?[=+-]\)?\s*)?total (?:de |del |do |da |dos |das )?(?:los |las )?(activos?|ativos?|pasivos?|passivos?|assets|liabilities|equity and liabilities)\b/u;
function esTotalBalance(n) {
  if (!(TOTAL_ACTIVO_RE.test(n) || TOTAL_PASIVO_RE.test(n) || TOTAL_BALANCE_RE.test(n))) return false;
  const resto = n.replace(TOTAL_BALANCE_RE, '').replace(TOTAL_ACTIVO_RE, '').replace(TOTAL_PASIVO_RE, '').trim().split(/\s+/).filter(Boolean);
  return resto.length <= 3; // "y patrimonio", "corrientes", "e patrimonio liquido": sí; "liquidos en moneda extranjera": no
}
const dedupe = (fs) => { const vistos = new Set(); return fs.filter((f) => { const k = `${f.familia}|${f.valor}`; if (vistos.has(k)) return false; vistos.add(k); return true; }); };

// ESCALÓN 0, aprender: qué filas del balance (1 a `max`) suman el valor cargado. Devuelve {familias, factor} si hay UNA sola combinación (la más
// chica); si hay varias del mismo tamaño con familias distintas, no hay precedente (ambiguo).
export function aprender(filas, valorSitio, { max = 3, filtro = () => true } = {}) {
  const cand = dedupe(filas.filter((f) => f.balance && !esTotal(f.etiqueta) && f.valor > 0 && filtro(f))).slice(0, 80);
  for (let k = 1; k <= max; k++) {
    const hallados = new Map();
    const rec = (desde, elegidas, suma) => {
      if (elegidas.length === k) {
        for (const fac of FACTORES) if (Math.abs(suma * fac - valorSitio) <= TOL(valorSitio)) {
          const fams = [...new Set(elegidas.map((f) => f.familia))].sort(); if (fams.length !== k) continue;
          hallados.set(fams.join(' + ') + '|' + fac, { familias: fams, factor: fac, filas: elegidas });
        }
        return;
      }
      for (let j = desde; j < cand.length; j++) rec(j + 1, [...elegidas, cand[j]], suma + cand[j].valor);
    };
    if (k === 3 && cand.length > 45) continue; // combinatoria: con muchas filas, solo 1 y 2
    rec(0, [], 0);
    const distintos = new Map([...hallados.values()].map((h) => [h.familias.join(' + '), h]));
    if (distintos.size === 1) return [...distintos.values()][0];
    if (distintos.size > 1) return { ambiguo: [...distintos.keys()] };
  }
  return null;
}

// ESCALÓN 0, aplicar: las mismas familias en este documento (cada una, su primera aparición en el balance) sumadas, por el factor.
function aplicarPrecedente(filas, prec) {
  const elegidas = [];
  for (const fam of prec.familias) { const f = filas.find((x) => x.balance && x.familia === fam); if (!f) return null; elegidas.push(f); }
  // Una misma familia corriente y no corriente (UC: "Otros pasivos financieros, corrientes" / ", no corrientes") ya son familias distintas.
  return { valor: r6(elegidas.reduce((a, f) => a + f.valor, 0) * prec.factor), factor: prec.factor, filas: elegidas.map(cita) };
}

// ESCALÓN 1: vocabulario. Caja: UN solo valor distinto entre las filas que matchean. Deuda: la suma de las filas distintas que matchean (corriente
// + no corriente), solo si ninguna familia aparece con dos valores distintos (eso sería columna del año anterior o una nota que la repite).
function porVocabulario(filas, cual, factor) {
  if (!factor) return null;
  const re = cual === 'cash' ? CAJA_RE : DEUDA_FINANCIERA_RE;
  const m = filas.filter((f) => f.balance && re.test(f.norm) && !esTotal(f.etiqueta) && f.valor >= 0);
  if (!m.length) return null;
  const unicas = dedupe(m);
  if (cual === 'cash') {
    const valores = [...new Set(unicas.map((f) => f.valor))];
    if (valores.length !== 1) return { ambiguo: unicas.map((f) => `${f.etiqueta} ${f.valor}`) };
    return { valor: r6(valores[0] * factor), factor, filas: [cita(unicas[0])] };
  }
  const porFam = new Map(); for (const f of unicas) { if (!porFam.has(f.familia)) porFam.set(f.familia, []); porFam.get(f.familia).push(f); }
  if ([...porFam.values()].some((xs) => xs.length > 1)) return { ambiguo: unicas.map((f) => `${f.etiqueta} ${f.valor}`) };
  // El mismo importe con otra etiqueta es el mismo renglón repetido (una nota que lo vuelve a mostrar): cuenta una vez. U. de Chile 2022: "Otros
  // pasivos financieros, corrientes" 490.377 (pág. 6 del visor) y "Otros pasivos financieros" 490.377 (nota, pág. 82): la deuda iba dos veces.
  const porImporte = []; for (const f of unicas) if (!porImporte.some((g) => g.valor === f.valor)) porImporte.push(f);
  return { valor: r6(porImporte.reduce((a, f) => a + f.valor, 0) * factor), factor, filas: porImporte.map(cita) };
}

const r6 = (x) => Math.round(x * 1e6) / 1e6;
const cita = (f) => ({ etiqueta: f.etiqueta, importe: f.valor, anterior: f.cifras.length > 1 ? f.cifras[1] : null, pagina: f.pagina, linea: f.linea });

// VALIDACIÓN (año anterior). Las mismas filas, en su columna del año anterior, por el mismo factor, tienen que dar el valor del año anterior
// (el cargado en el sitio, o la lectura del documento de ese año). Es lo que ataja los errores de escala (Alianza Lima 2023: 1.776 leído en
// millones cuando el sitio tiene 3,37) y de columna. Sin valor del año anterior para comparar: 'sin-referencia'.
function validarAnterior(r, anterior) {
  if (anterior == null) return 'sin-referencia';
  if (r.filas.some((f) => f.anterior == null)) return 'sin-columna';
  const prev = r.filas.reduce((a, f) => a + f.anterior, 0) * r.factor;
  return Math.abs(prev - anterior) <= TOL(anterior) ? 'ok' : `no-coincide (${r6(prev)} contra ${anterior})`;
}
// La otra punta (año vecino): en el documento del AÑO SIGUIENTE, las mismas filas (por familia, en su balance) en la columna del año anterior,
// por el mismo factor, tienen que dar esta lectura. Es el chequeo de año vecino de verificar.mjs, para el balance.
function validarSiguiente(r, filasSig) {
  if (!filasSig) return 'sin-referencia';
  const sig = []; for (const f of r.filas) { const g = filasSig.find((x) => x.balance && x.familia === claveFamilia(f.etiqueta) && x.cifras.length > 1); if (!g) return 'sin-columna'; sig.push(g); }
  const prev = sig.reduce((a, g) => a + g.cifras[1], 0) * r.factor;
  return Math.abs(prev - r.valor) <= TOL(r.valor) ? 'ok' : `no-coincide (${r6(prev)} en el documento siguiente)`;
}

// La escalera para un dato. `precedentes`: [{anio, valor, filas}] de OTROS años del club con el dato cargado. `anterior`: el valor del año
// anterior (sitio o documento vecino), para validar.
// Qué se acepta: escalón 0 validado o sin referencia (el precedente del club ya es la confirmación: midió 45/48 en caja); escalón 1 SOLO validado
// (sin validar midió 4/28 en deuda y 20/52 en caja, sobre todo por la escala). Lo que no se acepta queda null con el motivo: nunca frena.
export function leerDato(filas, cual, { precedentes = [], factor = null, anterior = null, siguiente = null } = {}) {
  // Confirmado = un año vecino (el anterior cargado o el documento siguiente) lo confirma, y ninguno lo contradice.
  // El escalón 1 necesita el AÑO ANTERIOR CARGADO: el documento siguiente usa el mismo factor y no ataja un error de escala (medición: Flamengo
  // 2024, caja 70.557.234 en vez de 70,557, "confirmada" por el documento de 2025). El escalón 0 trae la escala del precedente, que ya cerró.
  const confirmar = (r, escalon) => { const a = validarAnterior(r, anterior); const b = validarSiguiente(r, siguiente);
    if (a.startsWith('no-coincide') || b.startsWith('no-coincide')) return { ok: false, motivo: [a, b].filter((x) => x.startsWith('no-')).join('; ') };
    if (escalon === 1) return { ok: a === 'ok', motivo: a === 'ok' ? 'año anterior' : 'el vocabulario necesita el año anterior cargado para confirmar la escala' };
    return { ok: a === 'ok' || b === 'ok', motivo: a === 'ok' ? 'año anterior' : b === 'ok' ? 'documento siguiente' : 'ningún año vecino para confirmar' }; };
  const filtro = cual === 'cash' ? () => true : (f) => !CAJA_RE.test(f.norm);
  const descartes = [];
  for (const p of precedentes) {
    if (p.valor == null || p.valor === 0) continue;
    const prec = aprender(p.filas, p.valor, { max: cual === 'cash' ? 2 : 3, filtro });
    if (!prec || prec.ambiguo) continue;
    const r = aplicarPrecedente(filas, prec);
    if (!r) continue;
    const c = confirmar(r, 0);
    if (c.ok) return { ...r, escalon: 0, validacion: c.motivo, como: `precedente del club (${p.anio}: ${prec.familias.join(' + ')})` };
    descartes.push(`escalón 0 ${r.valor}: ${c.motivo}`);
  }
  const v = porVocabulario(filas, cual, factor);
  if (v && !v.ambiguo) {
    const c = confirmar(v, 1);
    if (c.ok) return { ...v, escalon: 1, validacion: c.motivo, como: 'vocabulario' };
    descartes.push(`escalón 1 ${v.valor}: ${c.motivo}`);
  }
  return { valor: null, escalon: null, como: descartes.length ? descartes.join('; ') : v?.ambiguo ? `ambiguo: ${v.ambiguo.slice(0, 4).join('; ')}` : 'sin filas en el balance' };
}

// ---------------------------------------------------------------- el sitio y los documentos de cada año cargado
function sitio() {
  const sb = { console, window: {} }; sb.window.window = sb.window; const ctx = vm.createContext(sb);
  for (const f of ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...readdirSync(resolve(ROOT, 'data')).filter((x) => x.endsWith('-data.js')).sort().map((x) => 'data/' + x)]) vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx);
  return { G: vm.runInContext('window.CLUB_GENERIC_DATA', ctx), S: vm.runInContext('typeof sources !== "undefined" ? sources : {}', ctx) };
}
// El .md de un año cargado: la ruta que nombra su fuente (220 de los 284 años con deuda/caja la tienen).
const mdDeFuente = (S, sourceId) => { const m = JSON.stringify(S[sourceId] || {}).match(/Clubes\/[^"]+?\.md/); return m && existsSync(resolve(ROOT, m[0])) ? m[0] : null; };

// Factor del estado de resultados de un documento contra lo cargado (para el escalón 1 en la medición): la escala con la que más rubros de
// ingresos cargados aparecen tal cual entre las cifras del documento.
function factorPorIngresos(filas, lineas) {
  let mejor = null;
  for (const fac of FACTORES) {
    const n = (lineas || []).filter((l) => l.amountNative && filas.some((f) => f.cifras.some((c) => Math.abs(Math.abs(c) * fac - Math.abs(l.amountNative)) <= TOL(l.amountNative)))).length;
    if (n && (!mejor || n > mejor.n)) mejor = { fac, n };
  }
  return mejor?.fac || null;
}

function medir({ club = null, detalle = false } = {}) {
  const { G, S } = sitio();
  const casos = [];
  for (const [clubId, d] of Object.entries(G)) {
    if (club && clubId !== club) continue;
    const anios = Object.entries(d.fiscalYearMeta || {}).map(([y, m]) => ({ anio: y, m, md: mdDeFuente(S, m.sourceId) })).filter((x) => x.md);
    const cache = new Map(); const filasDe = (md) => { if (!cache.has(md)) cache.set(md, filasDelMd(readFileSync(resolve(ROOT, md), 'utf8'))); return cache.get(md); };
    for (const a of anios) {
      for (const cual of ['grossDebt', 'cash']) {
        const real = a.m[cual]; if (real == null) continue;
        const filas = filasDe(a.md);
        const precedentes = anios.filter((o) => o.anio !== a.anio && o.m[cual] != null).sort((x, y) => Math.abs(x.anio - a.anio) - Math.abs(y.anio - a.anio)).slice(0, 3).map((o) => ({ anio: o.anio, valor: o.m[cual], filas: filasDe(o.md) }));
        const factor = factorPorIngresos(filas, d.revenueLinesByYear?.[a.anio]);
        const anterior = d.fiscalYearMeta?.[String(Number(a.anio) - 1)]?.[cual] ?? null;
        const sig = anios.find((o) => Number(o.anio) === Number(a.anio) + 1);
        const r = leerDato(filas, cual === 'cash' ? 'cash' : 'deuda', { precedentes, factor, anterior, siguiente: sig ? filasDe(sig.md) : null });
        const ok = r.valor != null && Math.abs(r.valor - real) <= TOL(real);
        casos.push({ clubId, anio: a.anio, cual, real, ...r, ok });
      }
    }
  }
  const res = (xs) => ({ total: xs.length, aciertos: xs.filter((x) => x.ok).length, distintos: xs.filter((x) => x.valor != null && !x.ok).length, sinDato: xs.filter((x) => x.valor == null).length });
  for (const cual of ['grossDebt', 'cash']) {
    const xs = casos.filter((c) => c.cual === cual);
    console.log(`\n## ${cual === 'cash' ? 'CAJA' : 'DEUDA'}: ${JSON.stringify(res(xs))}`);
    for (const e of [0, 1]) console.log(`   escalón ${e}: ${JSON.stringify(res(xs.filter((x) => x.escalon === e)))}`);
    for (const v of ['año anterior', 'documento siguiente']) console.log(`   confirmado por ${v}: ${JSON.stringify(res(xs.filter((x) => x.validacion === v)))}`);
    const mal = xs.filter((x) => x.valor != null && !x.ok);
    if (mal.length) { console.log(`   DISTINTOS de lo cargado (${mal.length}):`); for (const x of mal.slice(0, detalle ? 999 : 12)) console.log(`     ${x.clubId} ${x.anio}: script ${x.valor} (escalón ${x.escalon}, ${x.como}) · sitio ${x.real} · filas: ${x.filas.map((f) => `"${String(f.etiqueta).slice(0, 40)}" ${f.importe} (pág. ${f.pagina}, L${f.linea})`).join(' + ')}`); }
    if (detalle) for (const x of xs.filter((y) => y.valor == null)) console.log(`     sin dato: ${x.clubId} ${x.anio} (sitio ${x.real}): ${x.como}`);
  }
  return casos;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--medir')) { medir({ club: flag('--club'), detalle: A.includes('--detalle') }); process.exit(0); }
  const arg = A.find((x) => !x.startsWith('--') && x !== flag('--club') && x !== flag('--anio') && x !== flag('--factor'));
  if (!arg || !flag('--club')) { console.error('Uso: node tools/caja-deuda.mjs "<pdf o md>" --club <clubId> [--anio 2024] [--factor 0.001]  |  --medir [--club x] [--detalle]'); process.exit(1); }
  const md = arg.replace(/\.pdf$/i, '.md'); const filas = filasDelMd(readFileSync(resolve(ROOT, md), 'utf8'));
  const { G, S } = sitio(); const d = G[flag('--club')] || {};
  const anio = flag('--anio');
  const precedentes = (cual) => Object.entries(d.fiscalYearMeta || {}).filter(([y, m]) => y !== anio && m[cual] != null && mdDeFuente(S, m.sourceId)).map(([y, m]) => ({ anio: y, valor: m[cual], filas: filasDelMd(readFileSync(resolve(ROOT, mdDeFuente(S, m.sourceId)), 'utf8')) })).slice(-3);
  for (const [cual, k] of [['deuda', 'grossDebt'], ['cash', 'cash']]) {
    const r = leerDato(filas, cual, { precedentes: precedentes(k), factor: flag('--factor') ? Number(flag('--factor')) : null });
    console.log(`${k}: ${r.valor ?? 'null'}  (${r.escalon != null ? `escalón ${r.escalon}, ` : ''}${r.como})`);
    for (const f of r.filas || []) console.log(`   "${f.etiqueta}" ${f.importe} · pág. ${f.pagina} del visor · L${f.linea}`);
  }
}
