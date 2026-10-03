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
// LA ESCALERA (Versión 357, rehecha a pedido de Guido: "SIEMPRE ESCALERA, sin reglas una encima de otra"). Cada dato por separado.
//
//   ESCALA   UNA por documento, para todos los escalones: la del estado de resultados de ESE documento, la que hace coincidir sus cifras con
//            los rubros ya cargados en el sitio (factorPorIngresos). Ningún escalón trae su propia escala.
//   ESCALÓN 0  precedente del club: qué filas del balance de otro año del club (con la escala de ESE documento) suman lo cargado; se
//              PROPONEN las filas con las mismas familias de etiqueta en este documento.
//   ESCALÓN 1  vocabulario (vocabulario.mjs CAJA / DEUDA_FINANCIERA): se PROPONEN las filas del balance con esos nombres (una sola por
//              familia). "Ninguna fila" es una propuesta para la deuda (= 0, decisión de Guido) si el balance está completo (tiene su total del
//              pasivo) y el club usa filas de deuda financiera en otros años.
//   ESCALÓN 2  IA (Claude, ~US$ 0,03 por documento, una llamada para caja y deuda, solo si 0 y 1 no pasaron): PROPONE números de línea del
//              balance. Nada más (ni importes, ni escala, ni "no hay").
//   COMPUERTA  la MISMA para los tres: valor = suma de las cifras de las filas propuestas x la escala; y un año vecino tiene que decir lo mismo:
//              el AÑO ANTERIOR CARGADO (las mismas filas, en su columna del año anterior, dan lo cargado) o el DOCUMENTO SIGUIENTE (las mismas
//              familias, en su columna del año anterior, dan este valor). Pasa si al menos uno coincide y ninguno contradice. Si no pasa, el
//              siguiente escalón. Si ninguno pasa: null. Nunca frena.
//   LEER UNA FILA: el importe en valor absoluto (hay balances que imprimen el pasivo entre paréntesis: Tottenham 2023-24).
// Respuesta de la IA guardada en Generados/<doc>.caja-deuda-ia.json.
// Solo se leen las páginas del BALANCE: las que tienen el título (TITULO_BALANCE) o un total del activo / del pasivo, sin el título del flujo
// de efectivo. La columna es la PRIMERA cifra de la fila que no sea una referencia a nota (un entero de 1-2 dígitos al principio).
//
// USO:
//   node tools/caja-deuda.mjs --medir [--club <clubId>] [--detalle]                           MEDICIÓN sobre los años ya cargados (ver abajo)
//   node tools/caja-deuda.mjs --medir --ia [--ejecutar]                                       ...con el escalón 2 (sin --ejecutar: ensayo; con: API)
//   node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]                       COMPLETAR un club ya publicado (ver abajo)
//
// --club (Versión 356, decisión de Guido 2026-10-01: "dos scripts"; caja y deuda NO van en el lote, se completan con el club ya en el sitio):
// recorre los años cargados del club, de más viejo a más nuevo, y lee caja y deuda SOLO donde el sitio tiene null (nunca pisa un valor cargado
// a mano). Corrido después de cargar, el año anterior ya está en el sitio y sirve de compuerta. Un valor que se completa en esta
// misma corrida cuenta como cargado para el año siguiente. Sin --ejecutar, el escalón 2 es ensayo (costo estimado). --escribir: lo escribe en
// data/<club>-data.js con un comentario de dónde salió cada dato, sube ASSET_V, corre los generadores y audit.js; si da P0/P1, revierte.
//
// --medir: para cada año ya cargado con grossDebt/cash y con transcripción (la fuente nombra el .md), lee el balance como si fuera un año nuevo
// y lo compara con lo cargado a mano. El precedente sale SOLO de los OTROS años del club (nunca del mismo: si no, se aprendería la respuesta).
// Misma escalera y misma compuerta que --club. No escribe nada.
// ============================================================================

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { readdirSync } from 'node:fs';
import { derivado } from './rutas.mjs';
import { ajusteDe } from './ajustes.mjs';
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
    // (Versión 383: un 0 no es un número de nota. Fortaleza 2023 "Caja | 0 | 2.152" se leía 2.152, la columna del año anterior.)
    // (Versión 421) UNA sola referencia a nota, no en bucle: el importe de al lado también puede ser un entero chico (miles). Caso:
    // Novorizontino 2020 "Caixa e equivalentes de caixa | 4 | 85 | 695 |" sacaba el 4 (nota) y el 85 (la caja, en miles) y leía 695 (2019).
    if (nums.length > 1 && Number.isInteger(nums[0]) && Math.abs(nums[0]) >= 1 && Math.abs(nums[0]) < 100 && !/[.,]/.test(String(crudos[0]))) { nums = nums.slice(1); crudos = crudos.slice(1); }
    if (!nums.length) continue;
    nums = nums.map(Math.abs); // LEER UNA FILA: valor absoluto (ver cabecera)
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
  // (Probado y DESCARTADO en la Versión 352: leer solo el "balance principal", el primer tramo de páginas seguidas: manta corta.)
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
const r6 = (x) => Math.round(x * 1e6) / 1e6;
const cita = (f) => ({ etiqueta: f.etiqueta, importe: f.valor, anterior: f.cifras.length > 1 ? f.cifras[1] : null, pagina: f.pagina, linea: f.linea });
const filtroDe = (cual) => (cual === 'cash' ? () => true : (f) => !CAJA_RE.test(f.norm));
const TOTAL_PASIVO_PLURAL_RE = /^[\s*]*total (?:de |del )?pasivos?\b/u;

// ================================================================ LA ESCALERA (ver cabecera)

// Qué filas (1 a `max`) del balance de un año del club, con la escala de ESE documento, suman lo cargado. Las familias si hay UNA sola
// combinación (la más chica); si hay varias, ninguna (ambiguo).
export function aprender(filas, valorSitio, factor, { max = 3, filtro = () => true } = {}) {
  if (!factor) return null;
  const cand = dedupe(filas.filter((f) => f.balance && !esTotal(f.etiqueta) && f.valor > 0 && filtro(f))).slice(0, 80);
  for (let k = 1; k <= max; k++) {
    if (k === 3 && cand.length > 45) continue; // combinatoria: con muchas filas, solo 1 y 2
    const hallados = new Map();
    const rec = (desde, elegidas, suma) => {
      if (elegidas.length === k) { if (Math.abs(suma * factor - valorSitio) <= TOL(valorSitio)) { const fams = [...new Set(elegidas.map((f) => f.familia))].sort(); if (fams.length === k) hallados.set(fams.join(' + '), fams); } return; }
      for (let j = desde; j < cand.length; j++) rec(j + 1, [...elegidas, cand[j]], suma + cand[j].valor);
    };
    rec(0, [], 0);
    if (hallados.size === 1) return [...hallados.values()][0];
    if (hallados.size > 1) return null;
  }
  return null;
}
// Las familias que usa el club: las del primer precedente (el año cargado más cercano) que se puede aprender.
export function familiasDelClub(precedentes, cual) {
  for (const p of precedentes) {
    if (!p.valor) continue;
    const familias = aprender(p.filas, p.valor, p.factor, { max: cual === 'cash' ? 2 : 3, filtro: filtroDe(cual) });
    if (familias) return { familias, anio: p.anio };
  }
  return null;
}

// ESCALÓN 0: las filas de este documento con las familias del club.
function propuestaPrecedente(filas, club) {
  if (!club) return null;
  const elegidas = []; for (const fam of club.familias) { const f = filas.find((x) => x.balance && x.familia === fam); if (!f) return null; elegidas.push(f); }
  return { escalon: 0, filas: elegidas, como: `precedente del club (${club.anio}: ${club.familias.join(' + ')})` };
}
// En OTRO documento del club, el total de su nota de efectivo (la tabla con una fila de caja que termina en un total que suma sus filas):
// lo usa la compuerta para la propuesta "partes de la nota" (Versión 383), porque las filas cambian de nombre entre años (Fortaleza 2025:
// "Bancos nacionales" / "Bancos en el exterior"), y el total no. Devuelve [fila del total] o null.
function totalDeNotaDeCaja(filas) {
  for (const f of filas.filter((x) => x.balance && CAJA_RE.test(x.norm) && !esTotal(x.etiqueta))) {
    const i = filas.indexOf(f); let a = i; while (a > 0 && filas[a - 1].linea === filas[a].linea - 1) a--;
    let b = i; while (b < filas.length - 1 && filas[b + 1].linea === filas[b].linea + 1) b++;
    const tabla = filas.slice(a, b + 1); const tot = tabla.find((x) => x.linea > f.linea && esTotal(x.etiqueta));
    const partes = tot ? tabla.filter((x) => x.linea < tot.linea && !esTotal(x.etiqueta)) : [];
    if (tot && partes.length > 1 && Math.abs(partes.reduce((s, x) => s + x.valor, 0) - tot.valor) <= 1) return [tot];
  }
  return null;
}
// ESCALÓN 1: las filas del balance con nombre de caja / deuda financiera (una por familia), o "ninguna fila" de deuda (= 0).
function propuestaVocabulario(filas, cual, club) {
  const re = cual === 'cash' ? CAJA_RE : DEUDA_FINANCIERA_RE;
  const m = dedupe(filas.filter((f) => f.balance && re.test(f.norm) && !esTotal(f.etiqueta)));
  // EL TOTAL DE LA NOTA DE DEUDA (Versión 385): si no hay filas de deuda pero sí el TOTAL de una nota de deuda financiera, se propone ese
  // total (misma compuerta). Antes caía en "ninguna fila = 0". Caso: Fortaleza 2018 y 2019, cuya nota es solo "Total Prestamos y Sobregiros
  // Bancarios 4,398 / 794" (2018 L396, 2019 L582): se escribía deuda 0, y la compuerta lo dejaba pasar porque 2017 también es 0.
  if (!m.length && cual === 'deuda') {
    // En cualquier página (no solo las del balance): Fortaleza trae solo notas, y la nota 12 de 2018 no está en una página "de balance".
    const tots = dedupe(filas.filter((f) => esTotal(f.etiqueta) && re.test(f.norm.replace(/^[\s*]*total(es)?\s+(de\s+|del\s+)?/u, ''))));
    if (tots.length === 1) return { escalon: 1, filas: tots, como: `vocabulario: el total de la nota de deuda ("${tots[0].etiqueta}")` };
    if (tots.length > 1) return null;
  }
  if (!m.length) {
    const conTotalPasivo = filas.some((f) => f.balance && esTotalBalance(f.norm) && (TOTAL_PASIVO_RE.test(f.norm) || TOTAL_PASIVO_PLURAL_RE.test(f.norm)));
    if (cual === 'deuda' && conTotalPasivo && club && club.familias.every((fam) => DEUDA_FINANCIERA_RE.test(fam))) return { escalon: 1, ninguna: true, familias: club.familias, filas: [], como: 'vocabulario: ninguna fila de deuda financiera (balance completo) = 0' };
    return null;
  }
  const porFam = new Map(); for (const f of m) porFam.set(f.familia, [...(porFam.get(f.familia) || []), f]);
  if ([...porFam.values()].some((xs) => xs.length > 1)) return null; // una familia con dos importes: no hay UNA propuesta
  if (cual === 'cash' && m.length > 1) return null;
  // UNA PARTE DE LA NOTA DE EFECTIVO (Versión 383, aprobado por Guido el 2026-10-02): si la fila de caja está en una tabla que termina en un
  // total y las filas de esa tabla suman ese total, se PROPONEN todas esas filas (la caja es una parte, el efectivo es el total). Pasa por la
  // misma compuerta (cada fila conserva su familia, así se busca igual en el documento vecino). Caso: Fortaleza 2024, nota 6: "Bancos 97.365 /
  // Caja 430 / TOTAL 97.795" (L520-522); se proponía "Caja 430" y la compuerta lo dejaba pasar porque el documento 2025 repite la misma fila.
  if (cual === 'cash') {
    const f = m[0]; const i = filas.indexOf(f);
    let a = i; while (a > 0 && filas[a - 1].linea === filas[a].linea - 1) a--;
    let b = i; while (b < filas.length - 1 && filas[b + 1].linea === filas[b].linea + 1) b++;
    const tabla = filas.slice(a, b + 1); const tot = tabla.find((x) => x.linea > f.linea && esTotal(x.etiqueta));
    const partes = tot ? tabla.filter((x) => x.linea < tot.linea && !esTotal(x.etiqueta)) : [];
    if (tot && partes.length > 1 && Math.abs(partes.reduce((s, x) => s + x.valor, 0) - tot.valor) <= 1) return { escalon: 1, filas: partes, enOtroDoc: totalDeNotaDeCaja, como: `vocabulario: "${f.etiqueta}" es una parte de la nota; se proponen sus filas, que suman "${tot.etiqueta}" ${tot.valor}` };
  }
  return { escalon: 1, filas: m, como: 'vocabulario' };
}
// ESCALÓN 2: las líneas que eligió la IA (tienen que ser filas del balance).
function propuestaIA(filas, ia, cual) {
  const lineas = (cual === 'cash' ? ia?.caja : ia?.deuda)?.lineas || []; if (!lineas.length) return null;
  const elegidas = lineas.map((n) => filas.find((f) => f.linea === n && f.balance)); if (elegidas.some((f) => !f)) return null;
  return { escalon: 2, filas: elegidas, como: 'IA' };
}

// LA COMPUERTA, la misma para los tres escalones.
// (Versión 418) las cifras del documento SIGUIENTE se pasan a millones con la escala de ESE documento (factorSiguiente), no con la de este;
// si no se conoce (su año no está cargado), la de este, como antes. Caso: Novorizontino 2021 (en miles): caja 0,952 contra 951.927 del 2022
// (en reales), el mismo número.
export function compuerta(prop, { factor, anterior = null, siguiente = null, factorSiguiente = null, cual = null }) {
  if (!factor) return { ok: false, valor: null, motivo: 'sin escala del documento' };
  // (Versión 420) LA FAMILIA DE LA FILA: deuda nunca con una fila de caja, caja nunca con una fila de deuda financiera (el mismo filtro que
  // los escalones 0 y 1 aplican al buscar, ahora también para la propuesta de la IA). La comparación con el vecino no lo atrapa: si el error
  // se repite en los dos años, coincide. Caso: Novorizontino 2024 y 2025, la IA propuso "Caixa e equivalentes de caixa" como deuda.
  const otraFamilia = (prop.filas || []).find((f) => (cual === 'deuda' ? CAJA_RE : cual === 'cash' ? DEUDA_FINANCIERA_RE : null)?.test(f.norm || ''));
  if (otraFamilia) return { ok: false, valor: null, motivo: `la fila "${otraFamilia.etiqueta}" es de ${cual === 'deuda' ? 'caja' : 'deuda'}, no de ${cual === 'deuda' ? 'deuda' : 'caja'}` };
  const valor = prop.ninguna ? 0 : r6(prop.filas.reduce((a, f) => a + f.valor, 0) * factor);
  const chequeos = []; // [nombre, coincide, detalle]
  if (anterior != null) {
    if (prop.ninguna) chequeos.push(['año anterior', Math.abs(anterior) <= TOL(0), `cargado ${anterior}`]);
    else if (prop.filas.every((f) => f.cifras.length > 1)) { const prev = r6(prop.filas.reduce((a, f) => a + f.cifras[1], 0) * factor); chequeos.push(['año anterior', Math.abs(prev - anterior) <= TOL(anterior), `${prev} contra ${anterior} cargado`]); }
  }
  // (Versión 385) una fila que no está en las páginas del balance (una nota) se busca también en las notas del documento vecino.
  if (siguiente) {
    if (prop.ninguna) { const fs = siguiente.filter((x) => x.balance && prop.familias.includes(x.familia) && x.cifras.length > 1); chequeos.push(['documento siguiente', fs.every((x) => x.cifras[1] === 0), fs.length ? `${fs.map((x) => x.cifras[1]).join(' + ')} en el siguiente` : 'el siguiente tampoco tiene esas filas']); }
    else { const fs = prop.enOtroDoc ? (prop.enOtroDoc(siguiente) || [null]) : prop.filas.map((f) => siguiente.find((x) => (x.balance || !f.balance) && x.familia === f.familia && x.cifras.length > 1)); if (fs.every(Boolean)) { const prev = r6(fs.reduce((a, x) => a + x.cifras[1], 0) * (factorSiguiente ?? factor)); chequeos.push(['documento siguiente', Math.abs(prev - valor) <= TOL(valor), `${prev} en el siguiente`]); } }
  }
  const malos = chequeos.filter((c) => !c[1]); const buenos = chequeos.filter((c) => c[1]);
  if (malos.length) return { ok: false, valor, motivo: `no coincide con ${malos.map((c) => `${c[0]} (${c[2]})`).join(' ni ')}` };
  if (!buenos.length) return { ok: false, valor, motivo: 'ningún año vecino para comparar' };
  return { ok: true, valor, validacion: buenos[0][0] };
}

// La escalera para un dato: cada escalón propone, la compuerta decide, y si no pasa se baja. `ia`: la respuesta de la IA (o null).
export function escalera(filas, cual, { precedentes = [], factor = null, anterior = null, siguiente = null, factorSiguiente = null, ia = null } = {}) {
  const club = familiasDelClub(precedentes, cual);
  const propuestas = [propuestaPrecedente(filas, club), propuestaVocabulario(filas, cual, club), ia ? propuestaIA(filas, ia, cual) : null];
  const intentos = [];
  for (let e = 0; e < propuestas.length; e++) {
    const p = propuestas[e];
    if (!p) { if (e < 2 || ia) intentos.push(`escalón ${e}: sin propuesta`); continue; }
    const c = compuerta(p, { factor, anterior, siguiente, factorSiguiente, cual });
    if (c.ok) return { valor: c.valor, escalon: e, validacion: c.validacion, como: p.como, filas: p.filas.map(cita), club };
    intentos.push(`escalón ${e} (${c.valor}): ${c.motivo}`);
  }
  return { valor: null, escalon: null, como: intentos.join('; '), club };
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
// El criterio de deuda que se le pasa a la IA: el del club si hay precedente aprendido, si no el por defecto (sección 14).
export function criterioDeudaDe(familias) {
  return familias.length ? `el que el club usa en otros años: la suma de las líneas "${familias.join('" + "')}" (o sus equivalentes en este documento).`
    : 'DEUDA FINANCIERA: préstamos y obligaciones bancarias o financieras, corriente + no corriente (no el total del pasivo, no las cuentas por pagar comerciales).';
}

// El contexto de un año para la escalera: sus filas, su escala, los precedentes del club (con la escala de cada uno), el año anterior cargado
// y las filas del documento siguiente. `conocidos[cual][anio]` = el valor cargado (o completado en esta corrida).
function contexto({ d, anios, a, cual, filasDe, conocidos }) {
  const filas = filasDe(a.md);
  const factor = factorPorIngresos(filas, d.revenueLinesByYear?.[a.anio]);
  const precedentes = Object.entries(conocidos[cual]).filter(([y]) => y !== a.anio).sort(([x], [y]) => Math.abs(x - a.anio) - Math.abs(y - a.anio)).slice(0, 3)
    .map(([y, v]) => { const o = anios.find((z) => z.anio === y && z.md); return o ? { anio: y, valor: v, filas: filasDe(o.md), factor: factorPorIngresos(filasDe(o.md), d.revenueLinesByYear?.[y]) } : null; }).filter(Boolean);
  const sig = anios.find((o) => Number(o.anio) === Number(a.anio) + 1 && o.md);
  return { filas, factor, precedentes, anterior: conocidos[cual][String(Number(a.anio) - 1)] ?? null, siguiente: sig ? filasDe(sig.md) : null,
    factorSiguiente: sig ? factorPorIngresos(filasDe(sig.md), d.revenueLinesByYear?.[sig.anio]) : null };
}
const aniosDe = (d, S) => Object.entries(d.fiscalYearMeta || {}).map(([y, m]) => ({ anio: y, m, md: mdDeFuente(S, m.sourceId) })).sort((a, b) => Number(a.anio) - Number(b.anio));
const filasCache = () => { const c = new Map(); return (md) => { if (!c.has(md)) c.set(md, filasDelMd(readFileSync(resolve(ROOT, md), 'utf8'))); return c.get(md); }; };

// La IA de un documento (guardada o, con ejecutar, pedida). Devuelve { datos } | { ensayo, usd } | { error }.
async function iaDe(md, filas, club) {
  return porIA({ md, mdText: readFileSync(resolve(ROOT, md), 'utf8'), filas, criterioDeuda: criterioDeudaDe(club?.familias || []), ejecutar: iaDe.ejecutar });
}

async function medir({ club = null, detalle = false, ia = false, ejecutar = false } = {}) {
  const { G, S } = sitio(); iaDe.ejecutar = ejecutar;
  const casos = [];
  for (const [clubId, d] of Object.entries(G)) {
    if (club && clubId !== club) continue;
    const anios = aniosDe(d, S).filter((x) => x.md); const filasDe = filasCache();
    // Cada año se lee como nuevo: los conocidos son lo cargado en el sitio, SIN el propio año (no se aprende la respuesta).
    for (const a of anios) for (const cual of ['grossDebt', 'cash']) {
      const real = a.m[cual]; if (real == null) continue;
      const conocidos = { [cual]: Object.fromEntries(anios.filter((o) => o.anio !== a.anio && o.m[cual] != null).map((o) => [o.anio, o.m[cual]])) };
      const ctx = contexto({ d, anios, a, cual, filasDe, conocidos });
      casos.push({ clubId, anio: a.anio, cual, real, ctx, md: a.md, ...escalera(ctx.filas, cual === 'cash' ? 'cash' : 'deuda', ctx) });
    }
  }
  // Escalón 2: solo para lo que quedó null, una llamada (o la respuesta guardada) por documento, de a 6.
  if (ia) {
    const porMd = new Map(); for (const c of casos.filter((x) => x.valor == null)) porMd.set(c.md, [...(porMd.get(c.md) || []), c]);
    let usd = 0; let ensayos = 0; let hechos = 0;
    const uno = async ([md, cs]) => {
      const r = await iaDe(md, cs[0].ctx.filas, cs.find((c) => c.cual === 'grossDebt')?.club);
      if (ejecutar && ++hechos % 10 === 0) process.stderr.write(`  IA: ${hechos}/${porMd.size}\n`);
      if (r.ensayo) { usd += r.usd; ensayos++; return; }
      usd += r.costo || 0; if (r.error) return;
      for (const c of cs) Object.assign(c, escalera(c.ctx.filas, c.cual === 'cash' ? 'cash' : 'deuda', { ...c.ctx, ia: r.datos }));
    };
    const cola = [...porMd]; await Promise.all(Array.from({ length: 6 }, async () => { while (cola.length) await uno(cola.shift()); }));
    console.log(ensayos ? `\nIA (ENSAYO): ${ensayos} documentos sin respuesta guardada, ~US$ ${usd.toFixed(2)}. Agregá --ejecutar (lo corre Guido).` : `\nIA: US$ ${usd.toFixed(2)} (las respuestas guardadas no se vuelven a pagar)`);
  }
  for (const c of casos) c.ok = c.valor != null && Math.abs(c.valor - c.real) <= TOL(c.real);
  const res = (xs) => ({ total: xs.length, iguales: xs.filter((x) => x.ok).length, distintos: xs.filter((x) => x.valor != null && !x.ok).length, sinDato: xs.filter((x) => x.valor == null).length });
  for (const cual of ['grossDebt', 'cash']) {
    const xs = casos.filter((c) => c.cual === cual);
    console.log(`\n## ${cual === 'cash' ? 'CAJA' : 'DEUDA'}: ${JSON.stringify(res(xs))}`);
    for (const e of [0, 1, 2]) console.log(`   escalón ${e}: ${JSON.stringify(res(xs.filter((x) => x.escalon === e)))}`);
    for (const v of ['año anterior', 'documento siguiente']) console.log(`   pasó la compuerta por ${v}: ${JSON.stringify(res(xs.filter((x) => x.validacion === v)))}`);
    const mal = xs.filter((x) => x.valor != null && !x.ok);
    if (mal.length) { console.log(`   DISTINTOS de lo cargado (${mal.length}):`); for (const x of mal) console.log(`     ${x.clubId} ${x.anio}: script ${x.valor} (escalón ${x.escalon}, ${x.validacion}, ${x.como}) · sitio ${x.real} · filas: ${x.filas.map((f) => `"${String(f.etiqueta).slice(0, 40)}" ${f.importe} (pág. ${f.pagina}, L${f.linea})`).join(' + ') || '(ninguna)'}`); }
    if (detalle) for (const x of xs.filter((y) => y.valor == null)) console.log(`     sin dato: ${x.clubId} ${x.anio} (sitio ${x.real}): ${x.como}`);
  }
  return casos;
}

// ---------------------------------------------------------------- COMPLETAR UN CLUB PUBLICADO (--club)
function cierreDe(txt, abre) { let n = 0; for (let i = abre; i < txt.length; i++) { if (txt[i] === '{') n++; else if (txt[i] === '}') { n--; if (!n) return i; } } return -1; }
const HOY = new Date().toISOString().slice(0, 10);

export async function completarClub(clubId, { ejecutar = false, escribir = false } = {}) {
  const { G, S } = sitio(); const d = G[clubId]; iaDe.ejecutar = ejecutar;
  if (!d) return { error: `no existe ${clubId} en el sitio` };
  const anios = aniosDe(d, S); const filasDe = filasCache();
  const conocidos = { grossDebt: {}, cash: {} };
  for (const a of anios) for (const k of ['grossDebt', 'cash']) if (a.m[k] != null) conocidos[k][a.anio] = a.m[k];
  const propuestas = []; let usd = 0;
  for (const a of anios) {
    const faltan = ['grossDebt', 'cash'].filter((k) => a.m[k] == null); if (!faltan.length) continue;
    if (!a.md) { for (const k of faltan) propuestas.push({ anio: a.anio, cual: k, valor: null, como: 'la fuente no nombra la transcripción' }); continue; }
    const res = {};
    for (const k of faltan) {
      const ctx = contexto({ d, anios, a, cual: k, filasDe, conocidos });
      // ESCALÓN 0 DE TODO (Versión 419): ajuste manual `caja` (tools/ajustes.mjs), el número TAL CUAL impreso en el documento del año; se pasa
      // a millones con la escala del documento. Gana sobre la escalera y no pasa por la compuerta (es una decisión de Guido). Caso:
      // Novorizontino 2022, el documento dice 721.730 (con aplicaciones de proyectos incentivados) y el 2023 lo reclasificó a 146.924.
      const aj = k === 'cash' ? ajusteDe(a.md.replace(/\.md$/i, '.pdf'), 'caja') : null;
      if (aj && ctx.factor) { res[k] = { ctx, valor: r6(Math.abs(parseNumber(aj.valor)) * ctx.factor), escalon: 0, validacion: 'ajuste manual', como: `ajuste manual (${aj.fecha}): ${aj.motivo}`, filas: [] }; continue; }
      res[k] = { ctx, ...escalera(ctx.filas, k === 'cash' ? 'cash' : 'deuda', ctx) };
    }
    const sinDato = faltan.filter((k) => res[k].valor == null);
    if (sinDato.length) {
      const r = await iaDe(a.md, filasDe(a.md), res.grossDebt?.club);
      if (r.ensayo) { usd += r.usd; for (const k of sinDato) res[k].como += ` · escalón 2: ensayo (~US$ ${r.usd.toFixed(3)})`; }
      else if (r.error) { for (const k of sinDato) res[k].como += ` · escalón 2: ${r.error}`; }
      else { usd += r.costo || 0; for (const k of sinDato) res[k] = { ctx: res[k].ctx, ...escalera(res[k].ctx.filas, k === 'cash' ? 'cash' : 'deuda', { ...res[k].ctx, ia: r.datos }) }; }
    }
    for (const k of faltan) { if (res[k].valor != null) conocidos[k][a.anio] = res[k].valor; const { ctx, ...x } = res[k]; propuestas.push({ anio: a.anio, cual: k, ...x }); }
  }
  for (const p of propuestas) console.log(`  ${p.anio} ${p.cual === 'cash' ? 'caja ' : 'deuda'}: ${p.valor ?? 'null'}  (${p.escalon != null ? `escalón ${p.escalon}, compuerta: ${p.validacion}; ` : ''}${p.como})${(p.filas || []).map((f) => `\n        "${String(f.etiqueta).slice(0, 60)}" ${f.importe} · pág. ${f.pagina} del visor · L${f.linea}`).join('')}`);
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
        notas.push(`${p.cual} escalón ${p.escalon} (compuerta: ${p.validacion}): ${p.filas.length ? p.filas.map((f) => `"${String(f.etiqueta).slice(0, 50)}" pág. ${f.pagina}`).join(' + ') : p.como}`);
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
  if (A.includes('--medir')) { await medir({ club: flag('--club'), detalle: A.includes('--detalle'), ia: A.includes('--ia'), ejecutar: A.includes('--ejecutar') }); process.exit(0); }
  if (flag('--club')) { const r = await completarClub(flag('--club'), { ejecutar: A.includes('--ejecutar'), escribir: A.includes('--escribir') }); process.exit(r.error ? 1 : 0); }
  console.error('Uso: node tools/caja-deuda.mjs --club <clubId> [--ejecutar] [--escribir]  |  --medir [--club x] [--ia [--ejecutar]] [--detalle]'); process.exit(1);
}
