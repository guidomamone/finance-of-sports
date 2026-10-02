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
//   ESCALÓN 2  IA (Claude por API, ~US$ 0,02 por documento, una llamada para caja y deuda juntas, solo si 0 y 1 no dieron nada): elige las
//              LÍNEAS del balance y dice la escala con la frase del documento que la dice. Las sumas las hace el script, con las cifras de esas
//              líneas en el .md (nunca un número de la IA); se descarta si una línea no es una fila del balance o la frase de la escala no está en
//              el balance. Se acepta confirmada por el año anterior cargado o por el documento siguiente (la escala ya viene con su evidencia).
//              "No hay deuda financiera" + total del pasivo en el balance = 0. Respuesta guardada en Generados/<doc>.caja-deuda-ia.json.
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
//   node tools/caja-deuda.mjs --medir --ia [--ejecutar]                                       ...con el escalón 2 (sin --ejecutar: ensayo; con: API)
//   node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]                       COMPLETAR un club ya publicado (ver abajo)
//
// --club (Versión 356, decisión de Guido 2026-10-01: "dos scripts"; caja y deuda NO van en el lote, se completan con el club ya en el sitio):
// recorre los años cargados del club, de más viejo a más nuevo, y lee caja y deuda SOLO donde el sitio tiene null (nunca pisa un valor cargado
// a mano). Corrido después de cargar, el año anterior ya está en el sitio, y eso es lo que confirma el escalón 1. Un valor que se completa en esta
// misma corrida cuenta como cargado para el año siguiente. Sin --ejecutar, el escalón 2 es ensayo (costo estimado). --escribir: lo escribe en
// data/<club>-data.js con un comentario de dónde salió cada dato, sube ASSET_V, corre los generadores y audit.js; si da P0/P1, revierte.
//
// --medir: para cada año ya cargado con grossDebt/cash y con transcripción (la fuente nombra el .md), lee el balance como si fuera un año nuevo
// y lo compara con lo cargado a mano. El precedente sale SOLO de los OTROS años del club (nunca del mismo: si no, se aprendería la respuesta).
// El factor del escalón 1 sale de la escala del estado de resultados de ese documento contra lo cargado (la misma información que en el lote
// trae verificar.mjs). No escribe nada.
// ============================================================================

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { readdirSync } from 'node:fs';
import { derivado } from './rutas.mjs';
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
  const descartes = []; const familiasPrecedente = [];
  for (const p of precedentes) {
    if (p.valor == null || p.valor === 0) continue;
    const prec = aprender(p.filas, p.valor, { max: cual === 'cash' ? 2 : 3, filtro });
    if (!prec || prec.ambiguo) continue;
    familiasPrecedente.push(...prec.familias);
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
  // DEUDA 0 (Versión 353, decisión de Guido 2026-10-01: "0"). Un balance COMPLETO sin ninguna fila de deuda financiera es deuda 0, no "sin dato"
  // (UC 2015: el pasivo son cuentas por pagar, provisiones e impuestos, .md L236-248). Condiciones: el balance tiene su total del pasivo; ninguna
  // fila del balance es deuda financiera (vocabulario); y el club tiene un precedente aprendido de deuda financiera que acá no aparece.
  if (cual === 'deuda' && !v && !descartes.length) {
    const conTotalPasivo = filas.some((f) => f.balance && (TOTAL_PASIVO_RE.test(f.norm) || /^[\s*]*total (?:de |del )?pasivos?\b/u.test(f.norm)) && esTotalBalance(f.norm));
    // Hace falta un precedente APRENDIDO del club, todo de deuda financiera, que en este documento no aparece. Sin precedente no alcanza: medido
    // (Versión 353) "sin filas de vocabulario" daba 0 en 25 años con deuda real (Boca, Flamengo, Talleres: su deuda se llama de otra forma).
    const conPrecedente = familiasPrecedente.length > 0 && familiasPrecedente.every((fam) => DEUDA_FINANCIERA_RE.test(fam));
    if (conTotalPasivo && conPrecedente) return { valor: 0, escalon: 1, validacion: 'balance completo', factor: null, filas: [], como: 'balance completo sin filas de deuda financiera' };
  }
  return { valor: null, escalon: null, familiasPrecedente, como: descartes.length ? descartes.join('; ') : v?.ambiguo ? `ambiguo: ${v.ambiguo.slice(0, 4).join('; ')}` : 'sin filas en el balance' };
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

// ---------------------------------------------------------------- ESCALÓN 2: IA
const FACTOR_ESCALA = { unidades: 1e-6, miles: 1e-3, millones: 1 };
const SCHEMA_IA = {
  type: 'object', additionalProperties: false, required: ['escala', 'escala_evidencia', 'caja', 'deuda', 'observaciones'],
  properties: {
    escala: { type: 'string', enum: ['unidades', 'miles', 'millones'] }, escala_evidencia: { type: 'string' },
    caja: { type: 'object', additionalProperties: false, required: ['lineas', 'ninguna'], properties: { lineas: { type: 'array', items: { type: 'integer' } }, ninguna: { type: 'boolean' } } },
    deuda: { type: 'object', additionalProperties: false, required: ['lineas', 'ninguna'], properties: { lineas: { type: 'array', items: { type: 'integer' } }, ninguna: { type: 'boolean' } } },
    observaciones: { type: 'string' },
  },
};
const SYSTEM_IA = `Sos analista de estados financieros de clubes de fútbol. Te paso las páginas del BALANCE (estado de situación patrimonial / financiera) de un documento, con cada línea numerada ("L123: ..."), en cualquier idioma.

Elegí, para la columna del ejercicio pedido (la del cierre más reciente):
- caja.lineas: la o las líneas del EFECTIVO Y EQUIVALENTES (caja y bancos, disponibilidades, caixa e equivalentes, cash and cash equivalents...). Normalmente una sola; nunca un total del activo.
- deuda.lineas: las líneas de DEUDA FINANCIERA según el criterio que te indico abajo. Corriente Y no corriente si aparecen por separado. Nunca un total del pasivo, ni subtotales que ya incluyen otra línea elegida.
- Si el balance está completo y no hay ninguna línea de deuda financiera, deuda.ninguna = true (lo mismo para caja).
- escala del balance (unidades, miles o millones) y en escala_evidencia la frase EXACTA del documento que lo dice ("Miles de pesos", "en miles de reales", "€'000"...), copiada tal cual.
- observaciones: una frase si algo es dudoso. No inventes líneas: si no está, dejá la lista vacía.`;

// Pide a la IA las líneas (una llamada por documento). ejecutar=false: ensayo (tokens y costo estimados).
export async function porIA({ md, mdText, filas, criterioDeuda, ejecutar = false, rehacer = false }) {
  const out = resolve(ROOT, derivado(md, '.caja-deuda-ia.json'));
  if (!rehacer && existsSync(out)) return { datos: JSON.parse(readFileSync(out, 'utf8')), costo: 0, guardado: true };
  const paginas = [...new Set(filas.filter((f) => f.balance).map((f) => f.pagina))];
  if (!paginas.length) return { error: 'sin páginas de balance' };
  const L = mdText.split('\n'); const PAG = /^---\s*pág\.\s*(\d+)\s*---/i; let pag = 1; const lineas = [];
  for (let i = 0; i < L.length; i++) { const m = L[i].match(PAG); if (m) { pag = Number(m[1]); continue; } if (paginas.includes(pag) && L[i].trim()) lineas.push(`L${i + 1}: ${L[i].slice(0, 220)}`); }
  const texto = lineas.join('\n').slice(0, 60000);
  const user = `Documento: ${md.split('/').slice(1).join(' / ')}.\nCriterio de deuda de este club: ${criterioDeuda}\n\nPÁGINAS DEL BALANCE (${paginas.join(', ')} del visor):\n${texto}`;
  const { llamarClaude, tokensDe, usdEstimado } = await import('./claude-llamada.mjs');
  if (!ejecutar) return { ensayo: true, usd: usdEstimado(tokensDe(SYSTEM_IA + user), 400) };
  const r = await llamarClaude({ system: SYSTEM_IA, user, schema: SCHEMA_IA, tarea: 'caja-deuda', pdf: md.replace(/\.md$/, '.pdf'), maxTokens: 2000 });
  if (r.error) return { error: r.error, costo: r.costo || 0 };
  writeFileSync(out, JSON.stringify({ md, generado: new Date().toISOString(), criterioDeuda, ...r.datos }, null, 1));
  return { datos: r.datos, costo: r.costo || 0 };
}

// De la respuesta de la IA a un dato: las cifras salen de las filas del .md (no de la IA), con chequeos y confirmación por año vecino.
// El texto de las páginas del balance (normalizado), para comprobar la frase de la escala.
export function textoBalance(mdText, filas) {
  const paginas = new Set(filas.filter((f) => f.balance).map((f) => f.pagina)); const PAG = /^---\s*pág\.\s*(\d+)\s*---/i; let pag = 1; const out = [];
  for (const l of mdText.split('\n')) { const m = l.match(PAG); if (m) { pag = Number(m[1]); continue; } if (paginas.has(pag)) out.push(l); }
  return normalizar(out.join(' ').replace(/[|*#_]/g, ' '));
}

export function datoDeIA(ia, filas, cual, { anterior = null, siguiente = null, balanceTxt = '' } = {}) {
  const parte = cual === 'cash' ? ia.caja : ia.deuda; const factor = FACTOR_ESCALA[ia.escala];
  const ev = normalizar(ia.escala_evidencia || '');
  if (parte.ninguna && !parte.lineas.length) {
    const conTotalPasivo = filas.some((f) => f.balance && esTotalBalance(f.norm) && (TOTAL_PASIVO_RE.test(f.norm) || /^[\s*]*total (?:de |del )?pasivos?\b/u.test(f.norm)));
    if (cual === 'deuda' && conTotalPasivo) return { valor: 0, escalon: 2, validacion: 'balance completo', filas: [], como: 'IA: el balance no tiene deuda financiera' };
    return { valor: null, escalon: null, como: 'IA: ninguna (sin total del pasivo para dar 0)' };
  }
  const elegidas = parte.lineas.map((n) => filas.find((f) => f.linea === n && f.balance));
  if (!elegidas.length || elegidas.some((f) => !f)) return { valor: null, escalon: null, como: `IA: línea que no es una fila del balance (${parte.lineas.join(', ')})` };
  if (!factor) return { valor: null, escalon: null, como: 'IA: sin escala' };
  // La frase de la escala tiene que estar en el documento (en el balance, o en el encabezado de sus columnas, que filasDelMd no guarda como fila).
  if (!ev || !balanceTxt.includes(ev.replace(/[|*#_]/g, ' ').replace(/\s+/g, ' ').trim())) return { valor: null, escalon: null, como: 'IA: la frase de la escala no está en el balance' };
  const r = { valor: r6(elegidas.reduce((a, f) => a + f.valor, 0) * factor), factor, filas: elegidas.map(cita) };
  const a = validarAnterior(r, anterior); const b = validarSiguiente(r, siguiente);
  if (a.startsWith('no-coincide') || b.startsWith('no-coincide')) return { valor: null, escalon: null, como: `IA ${r.valor}: ${[a, b].filter((x) => x.startsWith('no-')).join('; ')}` };
  if (a !== 'ok' && b !== 'ok') return { valor: null, escalon: null, como: `IA ${r.valor}: ningún año vecino para confirmar` };
  return { ...r, escalon: 2, validacion: a === 'ok' ? 'año anterior' : 'documento siguiente', como: `IA (escala ${ia.escala}: "${ia.escala_evidencia}")` };
}

// El criterio de deuda que se le pasa a la IA: el del club si hay precedente aprendido, si no el por defecto (sección 14).
export function criterioDeudaDe(familias) {
  return familias.length ? `el que el club usa en otros años: la suma de las líneas "${familias.join('" + "')}" (o sus equivalentes en este documento).`
    : 'DEUDA FINANCIERA: préstamos y obligaciones bancarias o financieras, corriente + no corriente (no el total del pasivo, no las cuentas por pagar comerciales).';
}

async function medir({ club = null, detalle = false, ia = false, ejecutar = false } = {}) {
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
        casos.push({ clubId, anio: a.anio, cual, real, ...r, ok, _md: a.md, _anterior: anterior, _sig: sig ? sig.md : null, _filasDe: filasDe });
      }
    }
  }
  // ESCALÓN 2 (--ia): una llamada por documento con algún dato sin resolver. Sin --ejecutar, solo el ensayo.
  if (ia) {
    const porMd = new Map(); for (const c of casos.filter((x) => x.valor == null)) { if (!porMd.has(c._md)) porMd.set(c._md, []); porMd.get(c._md).push(c); }
    let usd = 0; let n = 0; let hechos = 0;
    // De a 6 llamadas a la vez (Versión 355, pedido de Guido: la medición con IA tardaba ~45 minutos de a una).
    const uno = async ([md, cs]) => {
      const filas = cs[0]._filasDe(md); const fams = cs.find((c) => c.cual === 'grossDebt')?.familiasPrecedente || [];
      const r = await porIA({ md, mdText: readFileSync(resolve(ROOT, md), 'utf8'), filas, criterioDeuda: criterioDeudaDe(fams), ejecutar });
      if (ejecutar && ++hechos % 10 === 0) process.stderr.write(`  IA: ${hechos}/${porMd.size}\n`);
      if (r.ensayo) { usd += r.usd; n++; return; }
      usd += r.costo || 0; if (r.error) { for (const c of cs) c.como += ` · IA: ${r.error}`; return; }
      const balanceTxt = textoBalance(readFileSync(resolve(ROOT, md), 'utf8'), filas).replace(/\s+/g, ' ');
      for (const c of cs) { const d = datoDeIA(r.datos, filas, c.cual === 'cash' ? 'cash' : 'deuda', { anterior: c._anterior, siguiente: c._sig ? c._filasDe(c._sig) : null, balanceTxt }); Object.assign(c, d, { ok: d.valor != null && Math.abs(d.valor - c.real) <= TOL(c.real) }); }
    };
    const cola = [...porMd]; await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await uno(cola.shift()); }));
    console.log(ejecutar ? `\nIA: gastado US$ ${usd.toFixed(2)} en ${porMd.size} documentos` : `\nIA (ENSAYO): ${n} documentos, ~US$ ${usd.toFixed(2)}. Agregá --ejecutar (lo corre Guido).`);
  }
  const res = (xs) => ({ total: xs.length, aciertos: xs.filter((x) => x.ok).length, distintos: xs.filter((x) => x.valor != null && !x.ok).length, sinDato: xs.filter((x) => x.valor == null).length });
  for (const cual of ['grossDebt', 'cash']) {
    const xs = casos.filter((c) => c.cual === cual);
    console.log(`\n## ${cual === 'cash' ? 'CAJA' : 'DEUDA'}: ${JSON.stringify(res(xs))}`);
    for (const e of [0, 1, 2]) console.log(`   escalón ${e}: ${JSON.stringify(res(xs.filter((x) => x.escalon === e)))}`);
    for (const v of ['año anterior', 'documento siguiente']) console.log(`   confirmado por ${v}: ${JSON.stringify(res(xs.filter((x) => x.validacion === v)))}`);
    const mal = xs.filter((x) => x.valor != null && !x.ok);
    if (mal.length) { console.log(`   DISTINTOS de lo cargado (${mal.length}):`); for (const x of mal.slice(0, detalle ? 999 : 12)) console.log(`     ${x.clubId} ${x.anio}: script ${x.valor} (escalón ${x.escalon}, ${x.como}) · sitio ${x.real} · filas: ${x.filas.map((f) => `"${String(f.etiqueta).slice(0, 40)}" ${f.importe} (pág. ${f.pagina}, L${f.linea})`).join(' + ')}`); }
    if (detalle) for (const x of xs.filter((y) => y.valor == null)) console.log(`     sin dato: ${x.clubId} ${x.anio} (sitio ${x.real}): ${x.como}`);
  }
  return casos;
}

// ---------------------------------------------------------------- COMPLETAR UN CLUB PUBLICADO (--club)
function cierreDe(txt, abre) { let n = 0; for (let i = abre; i < txt.length; i++) { if (txt[i] === '{') n++; else if (txt[i] === '}') { n--; if (!n) return i; } } return -1; }
const HOY = new Date().toISOString().slice(0, 10);

export async function completarClub(clubId, { ejecutar = false, escribir = false } = {}) {
  const { G, S } = sitio(); const d = G[clubId];
  if (!d) return { error: `no existe ${clubId} en el sitio` };
  const anios = Object.entries(d.fiscalYearMeta || {}).map(([y, m]) => ({ anio: y, m, md: mdDeFuente(S, m.sourceId) })).sort((a, b) => Number(a.anio) - Number(b.anio));
  const cache = new Map(); const filasDe = (md) => { if (!cache.has(md)) cache.set(md, filasDelMd(readFileSync(resolve(ROOT, md), 'utf8'))); return cache.get(md); };
  const conocidos = { grossDebt: {}, cash: {} };
  for (const a of anios) for (const k of ['grossDebt', 'cash']) if (a.m[k] != null) conocidos[k][a.anio] = a.m[k];
  const propuestas = []; let usd = 0;
  for (const a of anios) {
    const faltan = ['grossDebt', 'cash'].filter((k) => a.m[k] == null); if (!faltan.length) continue;
    if (!a.md) { for (const k of faltan) propuestas.push({ anio: a.anio, cual: k, valor: null, como: 'la fuente no nombra la transcripción' }); continue; }
    const filas = filasDe(a.md); const sig = anios.find((o) => Number(o.anio) === Number(a.anio) + 1 && o.md);
    const factor = factorPorIngresos(filas, d.revenueLinesByYear?.[a.anio]);
    const res = {};
    for (const k of faltan) {
      const precedentes = Object.entries(conocidos[k]).filter(([y]) => y !== a.anio).sort(([x], [y]) => Math.abs(x - a.anio) - Math.abs(y - a.anio)).slice(0, 3)
        .map(([y, v]) => ({ anio: y, valor: v, filas: (anios.find((o) => o.anio === y)?.md) ? filasDe(anios.find((o) => o.anio === y).md) : [] }));
      res[k] = { ...leerDato(filas, k === 'cash' ? 'cash' : 'deuda', { precedentes, factor, anterior: conocidos[k][String(Number(a.anio) - 1)] ?? null, siguiente: sig ? filasDe(sig.md) : null }), _anterior: conocidos[k][String(Number(a.anio) - 1)] ?? null };
    }
    // escalón 2: una llamada por documento para lo que siga sin dato
    const sinDato = faltan.filter((k) => res[k].valor == null);
    if (sinDato.length) {
      const mdText = readFileSync(resolve(ROOT, a.md), 'utf8');
      const r = await porIA({ md: a.md, mdText, filas, criterioDeuda: criterioDeudaDe(res.grossDebt?.familiasPrecedente || []), ejecutar });
      if (r.ensayo) { usd += r.usd; for (const k of sinDato) res[k].como += ` · IA: ensayo (~US$ ${r.usd.toFixed(3)})`; }
      else if (r.error) { for (const k of sinDato) res[k].como += ` · IA: ${r.error}`; }
      else { usd += r.costo || 0; const balanceTxt = textoBalance(mdText, filas).replace(/\s+/g, ' ');
        for (const k of sinDato) { const x = datoDeIA(r.datos, filas, k === 'cash' ? 'cash' : 'deuda', { anterior: res[k]._anterior, siguiente: sig ? filasDe(sig.md) : null, balanceTxt }); res[k] = x.valor != null ? x : { ...res[k], como: `${res[k].como} · ${x.como}` }; } }
    }
    for (const k of faltan) { if (res[k].valor != null) conocidos[k][a.anio] = res[k].valor; propuestas.push({ anio: a.anio, cual: k, ...res[k] }); }
  }
  for (const p of propuestas) console.log(`  ${p.anio} ${p.cual === 'cash' ? 'caja ' : 'deuda'}: ${p.valor ?? 'null'}  (${p.escalon != null ? `escalón ${p.escalon}, ${p.validacion}; ` : ''}${p.como})${(p.filas || []).map((f) => `\n        "${String(f.etiqueta).slice(0, 60)}" ${f.importe} · pág. ${f.pagina} del visor · L${f.linea}`).join('')}`);
  const conValor = propuestas.filter((p) => p.valor != null);
  console.log(`\n${clubId}: ${conValor.length} dato(s) para completar de ${propuestas.length} vacío(s).${!ejecutar && usd ? ` Escalón 2 (IA) en ensayo: ~US$ ${usd.toFixed(2)}; agregá --ejecutar.` : ejecutar ? ` IA: US$ ${usd.toFixed(3)}.` : ''}`);
  if (!escribir || !conValor.length) return { propuestas };
  // ESCRIBIR: solo reemplaza `grossDebt:null` / `cash:null` adentro del bloque del año en <club>FiscalYearMeta, con un comentario de la fuente.
  const { snapshot, revertir, publicarCambios } = await import('./cargar.mjs');
  const dataPath = resolve(ROOT, `data/${clubId}-data.js`); const snap = snapshot(); const escritos = [`data/${clubId}-data.js`];
  try {
    let t = readFileSync(dataPath, 'utf8');
    const ini = t.search(/const \w+FiscalYearMeta\s*=\s*\{/); if (ini < 0) throw new Error('no encontré <club>FiscalYearMeta');
    for (const anio of [...new Set(conValor.map((p) => p.anio))]) {
      const abreObj = t.indexOf('{', ini); const cierraObj = cierreDe(t, abreObj);
      const m = new RegExp(`\\n(\\s*)['"]?${anio}['"]?\\s*:\\s*\\{`).exec(t.slice(abreObj, cierraObj)); if (!m) throw new Error(`no encontré el año ${anio}`);
      const abre = abreObj + m.index + m[0].length - 1; const cierra = cierreDe(t, abre); let bloque = t.slice(abre, cierra);
      const notas = [];
      for (const p of conValor.filter((x) => x.anio === anio)) {
        const re = new RegExp(`\\b${p.cual}\\s*:\\s*null\\b`); if (!re.test(bloque)) throw new Error(`${anio}: no encontré ${p.cual}:null (¿ya tiene valor?)`);
        bloque = bloque.replace(re, `${p.cual}:${r6(p.valor)}`);
        notas.push(`${p.cual} escalón ${p.escalon} (${p.validacion}): ${p.filas.length ? p.filas.map((f) => `"${String(f.etiqueta).slice(0, 50)}" pág. ${f.pagina}`).join(' + ') : p.como}`);
      }
      bloque = bloque.replace(/(\n(\s*)(?=[^\n]*\b(?:grossDebt|cash)\s*:))/, `\n$2// tools/caja-deuda.mjs (${HOY}): ${notas.join('; ').replace(/\n/g, ' ')}$1`);
      t = t.slice(0, abre) + bloque + t.slice(cierra);
    }
    writeFileSync(dataPath, t);
    const r = publicarCambios(snap, [], escritos);
    console.log(r.ok ? `Escrito: ${r.escritos.join(', ')} · ${r.audit}` : `NO se escribió: ${r.motivo}`);
    return { propuestas, escrito: r };
  } catch (err) { const rv = revertir(snap, []); console.log(`NO se escribió: ${err.message} (se revirtió: ${rv.restaurados} restaurados)`); return { propuestas, error: err.message }; }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (flag('--club') && !A.some((x) => !x.startsWith('--') && x !== flag('--club') && x !== flag('--anio') && x !== flag('--factor'))) {
    const r = await completarClub(flag('--club'), { ejecutar: A.includes('--ejecutar'), escribir: A.includes('--escribir') }); process.exit(r.error ? 1 : 0);
  }
  if (A.includes('--medir')) { await medir({ club: flag('--club'), detalle: A.includes('--detalle'), ia: A.includes('--ia'), ejecutar: A.includes('--ejecutar') }); process.exit(0); }
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
