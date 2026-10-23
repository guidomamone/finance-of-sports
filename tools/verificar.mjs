#!/usr/bin/env node
// ============================================================================
// tools/verificar.mjs — ETAPA 6 del proceso nuevo: ¿lo que extrajo extraer.mjs es el estado de resultados correcto, completo y con los
// números del papel? Script determinista, GRATIS, sin IA (un LLM no sirve para verificar aritmética: FinVerBench, arXiv 2605.29586).
//
// POR QUÉ. Es la red que ataja los errores de las etapas anteriores
// (localizar eligió la tabla equivocada, extraer puso una fila del lado equivocado, Mistral inventó un número) sin confiar en ninguna IA.
//
// LOS CHEQUEOS, en orden (cada uno queda en `chequeos` con ok / detalle):
//   1. NÚMEROS CONFIRMADOS: los que validar-bloques.mjs no pudo confirmar contra el PDF. Si la tabla igual suma (chequeo 3), la aritmética los
//      confirma; si no suma pero suma con el número que leyó la segunda fuente, se usa ese y queda anotado; si nada suma -> cola humana.
//   2. NOTAS: cada renglón del estado que una nota desglosa (filas con `detalla_a`) se reemplaza por las filas de la nota SOLO si suman ese
//      renglón; la escala de la nota se DEDUCE del cierre (x1, x1.000, x1.000.000: 1. FC Köln tiene la nota en miles y el estado en euros).
//      Si no cierra, queda el renglón del estado (menos detalle, pero correcto).
//   3. TOTALES Y RESULTADO: ingresos (renglones de ingreso; también un "total" de ingresos que no es suma de renglones de arriba: Nottingham
//      Forest imprime "Turnover" como total y debajo "Profit on disposal" como renglón) contra el total impreso; gastos ídem; ingresos -
//      gastos ± financiero ± impuesto contra el resultado impreso. Diferencia de redondeo (menos de media unidad impresa por fila, decisión 3
//      de Guido) -> fila "Diferencia de redondeo". Si el documento no imprime totales, vale el resultado (decisión 2).
//   4. AÑO ANTERIOR: la columna del año anterior del MISMO documento contra el año anterior YA CARGADO en el sitio (suma de ingresos ±2% y
//      resultado). Confirma de una vez la columna, la escala (mismo documento: la inflación no la afecta) y que las tablas son las mismas. Si
//      el año anterior no está cargado, el chequeo no se puede hacer y el primer año de ese club va a la cola.
//   5. CONVENCIONES por grupo de países (tools/grupos-pais.mjs): todavía NO automatizadas; cuando una diferencia con producción huele a
//      convención (ganancia bruta danesa, venta de jugadores sumada al ingreso inglés), va a la cola y la respuesta de Guido se vuelve regla.
// Antes de mandar un caso a la cola se mira si Guido ya lo contestó (tools/cola.mjs respuestaDe): aceptar -> pasa; corregir -> se usa su valor.
//
// QUÉ DEJA: Generados/.../<doc>.verificacion.json con estado 'ok' o 'cola', las líneas finales (etiqueta, lado, importe en MILLONES de moneda
// nativa, página, línea del .md), financiero e impuesto aparte, los totales y los chequeos. Con --rubros además escribe el .rubros.json del
// documento con esas líneas (el formato de la etapa de categorización de siempre: jev-categorizar.mjs / categorizar-claude.mjs lo leen igual).
//
// USO:
//   node tools/verificar.mjs "<pdf>" [...] [--rubros]     (necesita .filas.json y, si existe, usa .validacion.json)
//   node tools/verificar.mjs --lista <archivo> [--rubros]
// ============================================================================

import { readFileSync, writeFileSync, existsSync, appendFileSync, statSync, readdirSync } from 'node:fs';
import { pedidoPrimerAnio, respuestaGuardada, compuertaPrimerAnio } from './primer-anio-ia.mjs';
import { createHash } from 'node:crypto';
import { resolve, dirname, basename, join } from 'node:path';
import { derivado } from './rutas.mjs';
import { huellaVerificar } from './huellas.mjs';
import { agregarCaso, respuestaDe, cerrarObsoletos, respuestaPorDetalle } from './cola.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { VERSION_AMPLIADO } from './indice-bloques.mjs';
import { norm as normNum } from './verify-numbers.mjs';
import { ajusteDe, ajustesDe, ajustePerimetroDe } from './ajustes.mjs';
import { validacionAlDia } from './cache-al-dia.mjs'; // (frenado de Sporting CP) la compuerta de cargar.mjs también en avisarRegistro
import { COBERTURA_PERDIDAS_RE, FIN_INGRESO_RE, FIN_GASTO_RE, INGRESOS_RE, GASTOS_RE, DE_LOS_CUALES_RE, normalizar } from './vocabulario.mjs';
import { DESCARTADOS, PARCIALES } from './etapa-doc.mjs';
import { filasNBB, leerEstadoNBB } from './nbb.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { loadSite, parseNumber } = await import('./datos-sitio.mjs');
const { resolverDeporte, cerosDeDeporte } = await import('./deporte-club.mjs'); // la tabla de ceros del deporte del club
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
// Monedas legado con paridad fija al euro (PTE, ITL...: `euroFijo` en data/currency-map.js). Las usa el escalón de paridad del año vecino.
const EURO_FIJO = (() => { try { return Object.fromEntries([...readFileSync(resolve(ROOT, 'data', 'currency-map.js'), 'utf8').matchAll(/^\s*([A-Z]{3}):\s*\{[^}\n]*euroFijo:\s*([\d.]+)/gm)].map((m) => [m[1], Number(m[2])])); } catch { return {}; } })();
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const MULT = { unidades: 1e-6, miles: 1e-3, millones: 1 };
const TOL = 0.01; // millones: la de audit.js
const r6 = (x) => (x == null ? x : Number(Number(x).toFixed(6)));
const cerca = (a, b, rel = 0.0005) => Math.abs(a - b) <= Math.max(TOL, rel * Math.abs(b));
// Resolución de un importe impreso en millones (para el redondeo): "155.315" en miles -> 0,001.
const unidad = (txt, mult) => { const d = (String(txt).match(/[.,](\d{1,2})\)?$/) || [])[1]; return mult * (d ? Math.pow(10, -d.length) : 1); };

// ============================================================================
// cerrarNota(): ¿las filas de una nota desglosan el renglón del estado? Si sí, cuáles son las LÍNEAS FINALES (las hojas) y con qué factor de
// escala. Antes sumaba TODOS los renglones que decían desglosar el renglón y comparaba con 0,5% de
// tolerancia. Caso real que la rompió, Universidad Católica 2025 (nota 19, págs. 73-74 del visor):
//   - "Ingresos por Préstamo de Jugadores 29.807" es un renglón de la nota, y en la página siguiente hay OTRO cuadro con el detalle por
//     jugador (Sebastián Pérez 19.876 + Fernanda Ramírez 9.931 = 29.807). Sumar todo contaba esos 29.807 dos veces.
//   - "Ingresos Comerciales 7.940.492" viene marcado "subtotal" pero no suma nada: es un renglón suelto sin desglose. Quedaba afuera.
//   La nota sí cerraba (8 renglones = 17.490.522 "Recaudación y otros", + Comerciales = 25.431.014) y se perdía el desglose entero.
// LA REGLA NUEVA lee la ESTRUCTURA IMPRESA en vez de sumar todo, en dos pasos generales (ninguno es específico de UC):
//   1. ÁRBOL. Se recorren las filas en el orden del documento. Un renglón es una hoja. Un subtotal/total "cierra" las filas inmediatamente
//      anteriores todavía sueltas cuya suma da su importe (la racha más corta, 1 o más) y pasa a ser un nodo con esas hojas adentro. Si no
//      cierra nada de arriba, queda ABIERTO y cierra las filas que vienen debajo si suman su importe (subtotal impreso arriba de sus
//      componentes, Levante). Si tampoco, es un renglón suelto que el documento puso en negrita: una hoja ("Ingresos Comerciales").
//   2. QUÉ NODOS DE ARRIBA SE SUMAN. Quedan unos pocos nodos de primer nivel (en UC: el "Total Ingresos" con sus 9 hojas, y el cuadro de
//      préstamos de 29.807). Se prueban, en este orden, y gana el primero que da el renglón del estado: (a) todos; (b) sin los que REPITEN un
//      importe que ya está adentro de otro nodo (un cuadro de detalle de una hoja, como el de préstamos; o la misma nota impresa dos veces,
//      como las notas 20 y 21 de UC 2025); (c) cada nodo solo.
//   Tolerancia: media unidad impresa por fila (redondeo; decisión 3 de Guido), no un porcentaje: el 0,5% de antes podía dar por buena una
//   nota a la que le faltaba un renglón chico. El factor de escala se deduce del cierre (x1, x1.000, x1.000.000: 1. FC Köln tiene la nota
//   en miles y el estado en euros). Signos: se prueba primero la suma con los signos impresos (un descuento en una nota de ingresos resta);
//   si no, en valor absoluto (notas de gastos con unas filas entre paréntesis y otras no). Hojas en 0 o sin importe ("-") no se cargan.
// Medición antes de adoptarla: las 26 extracciones del test por página + UC 2025.
// ============================================================================
// Renglón normalizado para la clave de una duda por tema: minúsculas, sin acentos, sin "(1)" ni números de nota.
const normalizarRenglon = (r) => String(r || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\(\s*[\d.,]+\s*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

// La página (marca "--- pág. N ---") en la que cae una línea del .md: para ubicar una duda que cita "L4157".
function paginaDeLinea(md, linea) {
  try { const L = readFileSync(resolve(ROOT, md), 'utf8').split('\n'); for (let i = Math.min(linea, L.length) - 1; i >= 0; i--) { const m = L[i].match(/^---\s*pág\.\s*(\d+)\s*---/i); if (m) return Number(m[1]); } } catch { /* sin .md */ }
  return null;
}

// El .filas.json con el estado NBB leído por sus códigos (tools/nbb.mjs), o null si el escalón no corre: el .md no trae el
// estado con códigos, la columna del año no cierra exacto, o el documento tiene un ajuste `fila` (el ajuste manual es el escalón 0 y manda).
function nbbDe(F, md, pdf, opciones = {}) {
  if (ajustesDe(pdf).some((a) => a.campo === 'fila')) return null;
  let txt; try { txt = readFileSync(resolve(ROOT, md), 'utf8'); } catch { return null; }
  const r = filasNBB(F, txt, opciones);
  if (r) r.bloque.pagina = paginaDeLinea(md, r.bloque.lineas[0]);
  return r;
}
// Los códigos NBB impresos del .md (para comparar con el año vecino), haya o no ajustes: null si no trae el estado con códigos.
function codigosNBBde(md) { try { return leerEstadoNBB(readFileSync(resolve(ROOT, md), 'utf8')); } catch { return null; } }

export function cerrarNota(obj, hijas, campo = 'M', uObj = 0) {
  const val = (h) => h[campo];
  const filas = hijas.filter((h) => isFinite(val(h)));
  const tolDe = (us) => 1e-9 + 0.5 * us;
  // 1. árbol
  const nodos = [];
  for (const h of filas) {
    const v = val(h); const u = h.u || 0;
    if (h.tipo !== 'renglon') {
      let acc = 0; let accAbs = 0; let us = 0; let desde = -1; let firmado = false;
      for (let j = nodos.length - 1; j >= 0; j--) {
        acc += nodos[j].valor; accAbs += Math.abs(nodos[j].valor); us += nodos[j].u;
        const tol = tolDe(us + u);
        if (Math.abs(Math.abs(acc) - Math.abs(v)) <= tol) { desde = j; firmado = true; break; }
        if (Math.abs(accAbs - Math.abs(v)) <= tol) { desde = j; break; }
      }
      if (desde >= 0) {
        const hijos = nodos.splice(desde);
        nodos.push({ valor: firmado ? acc : Math.sign(v || 1) * accAbs, u: hijos.reduce((a, n) => a + n.u, 0), hojas: hijos.flatMap((n) => n.hojas), valores: [...hijos.flatMap((n) => n.valores), v], bloque: h.bloque });
        continue;
      }
      // No cierra nada de arriba: puede ser un subtotal impreso ARRIBA de sus componentes (Levante 2024-25, nota de ingresos: "Ingresos por
      // competiciones 1.736,53" y debajo Liga 841,36 + competiciones 552,58 + otros 342,59). Queda ABIERTO: por ahora es una hoja, y si las
      // filas que vienen debajo suman su importe, pasa a ser su nodo. Si no, se queda como hoja (el renglón suelto en negrita de UC).
      nodos.push({ valor: v, u, hojas: [h], valores: [v], bloque: h.bloque, abierto: true });
      continue;
    }
    nodos.push({ valor: v, u, hojas: [h], valores: [v], bloque: h.bloque });
    // ¿cierra este renglón el subtotal abierto más cercano de arriba?
    const ia = nodos.findLastIndex((n) => n.abierto);
    if (ia >= 0 && nodos.length - ia >= 2) {
      const hijos = nodos.slice(ia + 1); const cab = nodos[ia];
      const firm = hijos.reduce((a, n) => a + n.valor, 0); const abs = hijos.reduce((a, n) => a + Math.abs(n.valor), 0); const tol = tolDe(hijos.reduce((a, n) => a + n.u, 0) + cab.u);
      const okF = Math.abs(Math.abs(firm) - Math.abs(cab.valor)) <= tol; const okA = Math.abs(abs - Math.abs(cab.valor)) <= tol;
      if (okF || okA) nodos.splice(ia, nodos.length - ia, { valor: okF ? firm : Math.sign(cab.valor || 1) * abs, u: hijos.reduce((a, n) => a + n.u, 0), hojas: hijos.flatMap((n) => n.hojas), valores: [...hijos.flatMap((n) => n.valores), cab.valor], bloque: cab.bloque });
    }
  }
  // 2. qué nodos de primer nivel se suman
  // (b): de mayor a menor (por cantidad de hojas), un nodo se descarta si su importe ya está adentro de uno que se quedó. Así, de dos notas
  // idénticas queda la primera, y un cuadro de detalle cae porque su total es una hoja del cuadro principal.
  const repite = (n, o) => o.valores.some((x) => Math.abs(Math.abs(x) - Math.abs(n.valor)) <= tolDe(n.u + o.u));
  const sinRepetidos = [];
  for (const n of [...nodos].sort((a, b) => b.hojas.length - a.hojas.length)) if (!sinRepetidos.some((o) => repite(n, o))) sinRepetidos.push(n);
  sinRepetidos.sort((a, b) => nodos.indexOf(a) - nodos.indexOf(b));
  const candidatos = [nodos, sinRepetidos, ...nodos.map((n) => [n])];
  for (const cand of candidatos) {
    const hojas = cand.flatMap((n) => n.hojas).filter((h) => val(h));
    if (hojas.length < 2) continue;
    const firm = hojas.reduce((a, h) => a + val(h), 0); const abs = hojas.reduce((a, h) => a + Math.abs(val(h)), 0);
    const us = hojas.reduce((a, h) => a + (h.u || 0), 0);
    for (const k of [1, 1000, 1e6, 1e-3, 1e-6]) {
      const tol = tolDe(us * k + uObj);
      if (Math.abs(Math.abs(firm) * k - obj) <= tol) { const s = Math.sign(firm) || 1; return { k, hojas: hojas.map((h) => ({ ...h, valorNota: val(h) * k * s })) }; }
      if (Math.abs(abs * k - obj) <= tol) return { k, hojas: hojas.map((h) => ({ ...h, valorNota: Math.abs(val(h)) * k })) };
    }
  }
  return null;
}

// (frenado de Benfica 2014-15 pos-AG) Una fila SIN LADO que viene DESPUÉS de una fila de resultado y repite su importe exacto es la ATRIBUCIÓN del resultado («ATRIBUÍVEL A:
// ACIONISTAS DA EMPRESA-MÃE 7.072» debajo de «RESULTADO LÍQUIDO DO PERÍODO 7.072»), no un renglón: las lecturas 3 y 6 la sumaban como ingreso y el resultado no cerraba.
// `campo` es la columna que se compara ('M' el año, 'A' el anterior).
export const repiteResultado = (estado, f, campo = 'M') => estado.some((r) => r !== f && r.tipo === 'resultado' && r.linea < f.linea && isFinite(r[campo]) && isFinite(f[campo]) && Math.abs(r[campo] - f[campo]) <= 0.5 * (f.u || 0) + 1e-12);

export function verificar(pdf, { registro, sitio, escribirRubros = false }) {
  const e = registro.find((x) => x.pdf === pdf) || {}; const md = e.md || pdf.replace(/\.pdf$/, '.md');
  const pF = resolve(ROOT, derivado(md, '.filas.json', { crear: false }));
  if (!existsSync(pF)) return { error: 'falta el .filas.json (extraer.mjs)' };
  // ESCALÓN "códigos NBB": un estado belga que cierra por sus códigos legales reemplaza al estado que
  // extrajo la IA (tools/nbb.mjs, con la escalera y los casos). No corre si no cierra exacto ni si el documento tiene ajustes `fila` (manda el ajuste).
  // un año ya publicado no parte el 630 por la nota: sus filas son las que se categorizaron y se publicaron
  const publicado = (() => { const id = clubDeRuta(pdf).clubId; const y = e.periodo?.cierre ? Number(e.periodo.cierre.slice(0, 4)) : null; return !!(id && y && sitio.generic?.[id]?.fiscalYearMeta?.[y]); })();
  const nbbV = nbbDe(JSON.parse(readFileSync(pF, 'utf8')), md, pdf, { partir630: !publicado });
  const F = nbbV ? nbbV.F : JSON.parse(readFileSync(pF, 'utf8'));
  const nbbPropio = nbbV ? nbbV.N : codigosNBBde(md); // para el chequeo del año vecino
  const pV = resolve(ROOT, derivado(md, '.validacion.json', { crear: false }));
  const V = existsSync(pV) ? JSON.parse(readFileSync(pV, 'utf8')) : null;
  // CAMINO DE ERROR: la última propuesta de carga marcó categorías en 0 que deberían tener número ("Televisión en 0"). Solo así
  // se prueba el escalón de la nota del subtotal (abajo): donde el estado ya trae la TV con número (Atalanta 2024, Parma 2023) la nota no
  // agrega nada y repartía distinto (Atalanta: TV 107,5 -> 101,8 M y dejaba de cerrar).
  const pC = resolve(ROOT, derivado(md, '.carga.json', { crear: false }));
  // Solo del LADO de la categoría en 0 (TV -> ingresos): en Udinese 2021-22 abría también personal y amortizaciones, 1 a 1 con otro nombre.
  const LADO_CERO = Object.fromEntries((cerosDeDeporte(resolverDeporte({ club: clubDeRuta(pdf).clubId, pdf })) || []).filter((x) => x.lado).map((x) => [x.nombre, x.lado])); // propuestas anteriores, sin `lado` (la tabla del deporte del club)
  const ladosCero = (() => { try { return new Set(existsSync(pC) ? (JSON.parse(readFileSync(pC, 'utf8')).reintentar || []).filter((x) => x.categoria).map((x) => x.lado || LADO_CERO[x.categoria]).filter(Boolean) : []); } catch { return new Set(); } })();
  // La señal se queda prendida: cuando el escalón abrió la nota del subtotal, la propuesta siguiente ya no marca la categoría en 0 y, sin
  // esto, la corrida siguiente lo apagaba y la TV volvía a 0 (oscilaba; medido en Bologna 2019-20). La verificación anterior lo anota.
  { const pVf = resolve(ROOT, derivado(md, '.verificacion.json', { crear: false })); try { if (existsSync(pVf)) for (const l of JSON.parse(readFileSync(pVf, 'utf8')).notaSubtotal || []) ladosCero.add(l); } catch { /* sin verificación anterior */ } }
  const confirmadosPorSumas = []; // números de filas que se cargan confirmados por las sumas
  let forzarNotaSub = false; let totIngForz = 0; const notasNotaSub = []; // la nota del subtotal en la primera pasada, ver abajo
  const signoAcum = new Map(); const notasAcum = []; let escalonAcum = false; // escalón "acumulados": fila del financiero (por línea) -> signo de su lado
  const signoFinBloque = new Map(); const notasFinBloque = []; let escalonFinBloque = false; // fila del financiero (por línea) -> signo según el bloque que la contiene
  const partesSubRep = new Map(); // línea del total que salteó el patrón B -> etiquetas de las filas de arriba que suma
  const notasSubRep = []; // las notas del escalón "subtotal repetido": se escriben solo si gana
  const notaSubtotalLados = new Set(); // lados donde este escalón abrió la nota del subtotal (se escribe en el .verificacion.json)
  const pU = resolve(ROOT, derivado(md, '.ubicacion.json', { crear: false }));
  const U = existsSync(pU) ? JSON.parse(readFileSync(pU, 'utf8')) : {};
  if (nbbV) U.bloques = { ...(U.bloques || {}), nbb: nbbV.bloque }; // el bloque de las filas NBB: su página y sus líneas (solo en memoria)
  // Sin fecha de cierre detectada: se deduce de los documentos vecinos del club, con nota.
  const cierreDeducido = e.periodo?.cierre ? null : cierrePorVecinos(pdf, registro);
  const year = e.periodo?.cierre ? Number(e.periodo.cierre.slice(0, 4)) : cierreDeducido?.anio ?? null;
  const clubId = clubDeRuta(pdf).clubId; const cd = clubId ? sitio.generic[clubId] : null;
  const chequeos = []; const cola = []; const notas = [];
  if (cierreDeducido) notas.push(`fecha de cierre ${cierreDeducido.cierre} ${cierreDeducido.evidencia}`);
  if (nbbV) notas.push(`escalón "códigos NBB": el estado se lee por sus códigos (L${nbbV.bloque.lineas[0]}-L${nbbV.bloque.lineas[1]}, esquema ${nbbV.N.actual.abreviado ? 'abreviado' : 'completo'}); cierran exacto todos sus totales impresos${nbbV.N.aLaAnterior ? `; ${nbbV.N.aLaAnterior} línea(s) de un solo importe van a la columna del año anterior (la única asignación que cierra)` : ''}`);
  // REINTENTOS: desgloses (notas o anidados) con 2+ filas que no suman. No frenan (queda el renglón, que es correcto), pero
  // marcan el documento para el camino de error: lote.mjs --reintentar vuelve a localizar con el índice ampliado y a extraer con esta lista.
  const reintentos = [];
  const gruposAbiertos = new Set(); // bloques de nota abiertos por el escalón 1 de las notas (un grupo de renglones; ver notaDeGrupo)
  const pagDe = (bloque) => U.bloques?.[bloque]?.pagina ?? null;
  const vigentes = []; // claves que levanta esta corrida (para cerrar los casos viejos que ya no aparecen: cola.mjs cerrarObsoletos)
  const caso = (motivo, detalle, que, extra = {}) => {
    vigentes.push(`${pdf}|verificar|${motivo}|${detalle || ''}`);
    const r = respuestaDe(pdf, 'verificar', motivo, detalle);
    if (r) return r;
    cola.push(agregarCaso({ pdf, md, etapa: 'verificar', motivo, detalle, que, ...extra }));
    return null;
  };

  // filas con su valor en millones (año actual y anterior). armar() se usa también para el documento vecino (chequeo 4b). `k` es el factor
  // de la escalera de escala (abajo): multiplica TODO el documento, así que las diferencias entre bloques (1. FC Köln) se conservan.
  function armar(F, U, conNotas = false, k = 1) {
  const escalaDe = new Map((F.escalas || []).map((x) => [x.bloque, x.escala]));
  const mult = (b) => (MULT[escalaDe.get(b)] ?? MULT[U.escala] ?? 1e-6) * k;
  const pagDe = (bloque) => U.bloques?.[bloque]?.pagina ?? null;
  const filas = (F.filas || []).map((f) => ({ ...f, pagina: pagDe(f.bloque), M: (parseNumber(f.actual) ?? NaN) * mult(f.bloque), A: f.anterior != null ? (parseNumber(f.anterior) ?? NaN) * mult(f.bloque) : null, u: unidad(f.actual, mult(f.bloque)) }));
  const estado = filas.filter((f) => !f.detalla_a && (F.ubicacion?.estado || []).includes(f.bloque));
  // COBERTURA DE PÉRDIDAS DE UN SOCIO O DEL HOLDING: no es un ingreso operativo. Una fila SIN LADO cuyo rótulo dice "cobertura de pérdidas"
  // ("Verlustabdeckung FC Basel Marketing AG" +470.000 entre el "Ergebnis vor Verlustabdeckung" y el "Ergebnis vor Steuern") entraba como ingreso por su signo (lectura 3) y
  // los ingresos no daban el "Total Ertrag" impreso. Ahora cuenta en el resultado, como el financiero, y queda afuera de los ingresos y de los gastos.
  // También si el año actual es 0 y solo el anterior tiene importe (Basel 2020: "Defizitgarantie FC Basel Holding AG" 0,00 | 18,7 M): la columna del año anterior
  // que se compara con el documento vecino la contaba como ingreso.
  for (const f of estado) if (f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f.M) && (f.M || f.A) && COBERTURA_PERDIDAS_RE.test(String(f.etiqueta || ''))) { f.lado = 'financiero'; notas.push(`"${f.etiqueta}" (L${f.linea}) es una cobertura de pérdidas del socio o del holding, no un ingreso operativo: cuenta en el resultado, fuera de los ingresos y de los gastos`); }

  // (perímetro consolidado AG + Event AG decidido por Guido: "elegilo vos") COMPENSACIÓN INTRAGRUPO EN UN ESTADO DE VARIAS SOCIEDADES. FC St. Gallen AG + FC St. Gallen
  // Event AG: "Entschädigung von FCSG Event AG" (+9.800, columna AG) y "Entschädigung an FCSG AG" (-9.800, columna Event AG) suman cero en el total del grupo y el total impreso de ingresos
  // ("Erträge netto") no la incluye, pero la carga la contaba como ingreso y como gasto. COMPUERTA: dos renglones del mismo bloque, uno de ingreso y otro de gasto, con el mismo importe en
  // el año y en el anterior, y la primera palabra de su rótulo igual: se eliminan (lado 'intragrupo'), como en una consolidación.
  { const norm1 = (t) => normalizar(String(t || '')).split(/\s+/)[0] || '';
    const cand = estado.filter((f) => f.tipo === 'renglon' && ['ingreso', 'gasto', 'otro'].includes(f.lado) && isFinite(f.M) && f.M && f.A != null && isFinite(f.A));
    const igual = (x, y, f) => Math.abs(Math.abs(x) - Math.abs(y)) <= 0.5 * Math.max(f.u || 0, 0) + 1e-12;
    for (const a of cand) { if (a.lado === 'intragrupo' || a.M < 0) continue;
      const b = cand.find((x) => x !== a && x.lado !== 'intragrupo' && x.M < 0 && x.bloque === a.bloque && Math.abs(x.M + a.M) <= 0.5 * Math.max(a.u || 0, x.u || 0) + 1e-12 && Math.abs(x.A + a.A) <= 0.5 * Math.max(a.u || 0, x.u || 0) + 1e-12 && norm1(x.etiqueta).length >= 6 && norm1(x.etiqueta) === norm1(a.etiqueta));
      if (b) { a.lado = 'intragrupo'; b.lado = 'intragrupo'; notas.push(`"${a.etiqueta}" (L${a.linea}) y "${b.etiqueta}" (L${b.linea}) son una compensación intragrupo del mismo importe en el año y en el anterior, de signo opuesto: se eliminan, como en una consolidación`); } } }
  // 2. notas: renglón del estado reemplazado por su desglose si cierra (escala deducida del cierre)
  // DESGLOSES ANIDADOS: una hoja de una nota puede, a su vez, estar desglosada por otro cuadro (filas
  // con detalla_a = la etiqueta de esa hoja). Se reemplaza con la MISMA regla (cerrarNota: tiene que sumar), hasta 3 niveles. Caso real, UC
  // 2021-2025: "Ingresos Comerciales" de la nota 19 se abre con la columna "Comerciales" de la nota de segmentos. Si no suma, queda la hoja.
  // AJUSTE MANUAL `desglose`: escalón 0 del cierre de una nota (se prueba ANTES de cerrarNota(): una nota que cierra solo por
  // redondeo dentro de la tolerancia reemplazaba el renglón y la diferencia que Guido había dicho se perdía; Bath 2022-23, 44.435 £). Si el desglose de un renglón no suma por un
  // error del PROPIO documento, Guido dice cuánto es la diferencia impresa; la nota se abre igual, con una fila más ("Diferencia en el
  // documento") por esa diferencia. COMPUERTA: la diferencia entre el renglón y la suma de sus filas es la que dijo Guido (media unidad
  // impresa de tolerancia); si no, queda el renglón como siempre. Solo la columna del año. Caso: Fortaleza 2022, "Patrocinios (1)" 2.334.630
  // (L1219) y su detalle suma 2.280.630 (L1229-1240): sin abrirlo, la televisión (1.208.394) quedaba escondida adentro.
  const cerrarConAjuste = (h, sub, campo) => {
    if (campo !== 'M') return null;
    const aj = ajustesDe(pdf).find((x) => x.campo === 'desglose' && String(x.etiqueta).trim() === String(h.etiqueta).trim());
    if (!aj || !isFinite(parseNumber(aj.valor))) return null;
    const hojasNota = sub.filter((x) => x.tipo === 'renglon' && isFinite(x.M) && x.M);
    const dif = Math.abs(h.M || 0) - hojasNota.reduce((a, x) => a + Math.abs(x.M), 0);
    const m = mult(h.bloque);
    if (Math.abs(Math.abs(dif) - Math.abs(parseNumber(aj.valor) * m)) > 0.5 * m + 1e-9) return null;
    if (conNotas && !notas.some((n) => n.startsWith(`ajuste manual: el desglose de "${h.etiqueta}"`))) notas.push(`ajuste manual: el desglose de "${h.etiqueta}" se abre con una fila "${aj.etiquetaDiferencia || 'Diferencia en el documento'}" de ${aj.valor} (${aj.fecha}, ${aj.motivo})`);
    return { hojas: [...hojasNota.map((x) => ({ ...x, valorNota: Math.abs(x.M) })), { etiqueta: aj.etiquetaDiferencia || 'Diferencia en el documento', lado: h.lado, tipo: 'renglon', valorNota: dif, pagina: h.pagina, linea: aj.linea ?? h.linea, bloque: h.bloque, u: h.u, catAjuste: aj.categoria || null }] };
  };
  // DESGLOSE TRIVIAL: una nota con UNA sola fila con importe (o ninguna) que da
  // exacto su renglón no es un desglose que falló: cerrarNota() pide 2 hojas y la rechaza, queda el renglón (mismo importe) y antes se marcaba
  // el documento para reintento (~US$ 0,30 para nada). Ahora deja una nota y no marca reintento. Solo toca el aviso: lo cargado no cambia.
  // Casos: AEL Larissa 2022 "Κύκλος εργασιών" (venta de mercadería 0,00 + servicios 2.068.146,00 = total, .md L566-570); 2023 "Λοιπά
  // έξοδα" 0 con su nota en 0.
  const desgloseTrivial = (r, hijas) => {
    const conImporte = hijas.filter((x) => x.tipo === 'renglon' && isFinite(x.M) && x.M);
    if (conImporte.length > 1) return false;
    const s = conImporte.reduce((a, x) => a + Math.abs(x.M), 0);
    if (Math.abs(s - Math.abs(r.M || 0)) > 1e-9 + 0.5 * ((r.u || 0) + conImporte.reduce((a, x) => a + (x.u || 0), 0))) return false;
    const n = `la nota de "${r.etiqueta}" tiene ${conImporte.length ? 'una sola fila con importe' : 'todas sus filas en 0'} y da el renglón: queda el renglón, sin reintento`;
    if (!notas.includes(n)) notas.push(n);
    return true;
  };
  const abrirAnidadas = (hojas, campo, nivel) => {
    if (nivel > 3) return hojas;
    const usadas = new Set(hojas);
    return hojas.flatMap((h) => {
      const sub = filas.filter((x) => x.detalla_a && x !== h && !usadas.has(x) && x.detalla_a.trim() === String(h.etiqueta).trim());
      const c = sub.length >= 2 ? (cerrarConAjuste(h, sub, campo) || cerrarNota(Math.abs(h[campo] || 0), sub, campo, h.u || 0)) : null;
      if (!c) { if (conNotas && sub.length >= 2 && campo === 'M' && !desgloseTrivial(h, sub)) { if (!reintentos.some((x) => x.renglon === h.etiqueta)) notas.push(`el desglose de "${h.etiqueta}" (${sub.length} filas) no suma la fila: quedó la fila`); if (!reintentos.some((x) => x.renglon === h.etiqueta)) reintentos.push({ renglon: h.etiqueta, suma: r6(sub.filter((x) => x.tipo === 'renglon').reduce((a, x) => a + Math.abs(x.M || 0), 0)), objetivo: r6(Math.abs(h.M || 0)) }); } return [h]; }
      return abrirAnidadas(c.hojas.map((x) => ({ ...x, [campo]: x.valorNota * Math.sign(h[campo] || 1), origen: `${h.origen} > desglose de "${h.etiqueta}"` })), campo, nivel + 1);
    });
  };
  // conOtros (lectura 3 de la escalera de lecturas): los renglones SIN LADO (lado 'otro') cuentan como componentes al decidir
  // si un subtotal es la suma de los renglones de arriba o de abajo, con su signo impreso o en valor absoluto. Caso real, Goiás 2022-2024:
  // "Despesas (34.610.029)" está impreso ARRIBA de administrativas (27.382.857) + tributárias (323.384) + "Outras Receitas e Despesas"
  // (6.903.788, sin lado); sin esa fila los de abajo no sumaban el subtotal, y se contaba el subtotal y además sus componentes. En 2022 y
  // 2023 "Outras" es positivo (8.918.100, 140.214.785) y el subtotal solo cierra con la suma con signo. Los renglones sin lado los ubica
  // después la propia lectura 3, por su signo.
  // firmado (LECTURA 4 de la escalera de lecturas): los renglones del estado conservan su SIGNO IMPRESO respecto del signo
  // normal de su lado (un renglón negativo dentro de los ingresos resta: "(-) Dedução da receita (1.290.613)"), y los subtotales se
  // reconocen por la suma con signo. Caso: Goiás 2008, los renglones de "Futebol profissional e de base" con la deducción restando dan
  // 19.389.721 (el subtotal impreso); en valor absoluto daban 21.970.947, el subtotal no se reconocía y se contaba además de sus renglones.
  // ESCALÓN 1 DE LAS NOTAS: una nota que no dice qué renglón abre (ninguna fila con
  // detalla_a) puede desglosar un GRUPO de renglones del estado. Caso real, AEL Larissa (Grecia) 2019-2025: el estado presenta el gasto por
  // función (costo de ventas, administración, comercialización) y la nota "Έξοδα" lo abre por naturaleza (personal, terceros, amortizaciones)
  // con un total igual a la suma de los TRES renglones (2022: 1.221.827,55 + 505.583,81 + 379.187,86 = 2.106.599,22, .md L236-245 y
  // L584-590). Sin esto la nota quedaba afuera y los salarios en 0.
  //   ESCALÓN 0  la nota dice su renglón (detalla_a) ── propone ese renglón (lineasDeLado, abajo)
  //   ESCALÓN 1  la nota no dice ninguno ── propone el ÚNICO conjunto de 2+ renglones de GASTO del estado (sin nota propia) cuya suma da el
  //              total impreso de la nota; si hay dos conjuntos posibles o ninguno, no propone nada
  //   COMPUERTA  la misma de siempre, cerrarNota(): las filas de la nota tienen que sumar el grupo ── pasa → la nota reemplaza el grupo
  //   nada → quedan los renglones del estado (como antes) y la duda de extraer va a la cola
  // Solo gasto y solo renglones del estado sin nota propia. AEL 2023 no pasa a propósito: su nota suma los tres renglones MÁS los intereses
  // (lado financiero), así que no hay conjunto de gasto que dé el total.
  const notaDeGrupo = (delLado, campo) => {
    const bloquesEstado = new Set(F.ubicacion?.estado || []);
    const conNotaPropia = (f) => filas.some((h) => h.detalla_a && h.detalla_a.trim() === String(f.etiqueta).trim());
    const cands = delLado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] && !conNotaPropia(f));
    if (cands.length < 2 || cands.length > 14) return null;
    const porBloque = new Map();
    for (const h of filas) { if (bloquesEstado.has(h.bloque)) continue; if (!porBloque.has(h.bloque)) porBloque.set(h.bloque, []); porBloque.get(h.bloque).push(h); }
    for (const [bloque, rows] of porBloque) {
      if (rows.some((h) => h.detalla_a) || !rows.every((h) => h.lado === 'gasto')) continue;
      if (rows.filter((h) => h.tipo === 'renglon').length < 2) continue;
      const tot = [...rows].reverse().find((h) => h.tipo !== 'renglon' && isFinite(h[campo]) && h[campo]);
      if (!tot) continue;
      const T = Math.abs(tot[campo]);
      const conjuntos = [];
      for (let mask = 1; mask < (1 << cands.length) && conjuntos.length < 2; mask++) {
        const sel = cands.filter((_, i) => mask & (1 << i));
        if (sel.length < 2) continue;
        const s = sel.reduce((a, f) => a + Math.abs(f[campo]), 0);
        if (Math.abs(s - T) <= 1e-9 + 0.5 * (sel.reduce((a, f) => a + (f.u || 0), 0) + (tot.u || 0))) conjuntos.push(sel);
      }
      if (conjuntos.length !== 1) continue;
      const grupo = conjuntos[0];
      const c = cerrarNota(grupo.reduce((a, f) => a + Math.abs(f[campo]), 0), rows, campo, grupo.reduce((a, f) => a + (f.u || 0), 0));
      if (c) return { bloque, renglones: grupo, hojas: c.hojas };
    }
    return null;
  };
  // cada hoja de una nota abierta recuerda de qué línea(s) del .md venía su renglón del estado, para que un ajuste
  // `fila` con `reemplazaLinea` saque las hojas si el renglón estaba abierto. Propiedad NO enumerable: no se escribe en el .verificacion.json
  // ni cambia nada de lo que se carga (se pierde en un {...spread}, y no hace falta después de aplicarAjustesFila).
  const conLineas = (hojas, renglones) => { const ls = renglones.map((x) => Number(x.linea)).filter(Number.isFinite); for (const h of hojas) Object.defineProperty(h, 'desdeLineas', { value: ls, enumerable: false, configurable: true }); return hojas; };
  const lineasDeLado = (lado, campo = 'M', conOtros = false, firmado = false, subRepetido = false, finEnBloque = false, acumulados = false) => {
    const out = [];
    const delLado = estado.filter((f) => f.lado === lado || (conOtros && f.lado === 'otro' && f.tipo === 'renglon'));
    const grupo = lado === 'gasto' ? notaDeGrupo(delLado, campo) : null;
    if (grupo && conNotas && campo === 'M' && !gruposAbiertos.has(grupo.bloque)) {
      gruposAbiertos.add(grupo.bloque);
      notas.push(`escalón 1 de las notas: la nota ${grupo.bloque} (sin renglón) suma el grupo "${grupo.renglones.map((r) => r.etiqueta).join('" + "')}" (${r6(grupo.renglones.reduce((a, r) => a + Math.abs(r.M), 0))}); se usa si la lectura que gana abre notas`);
    }
    const rengs = delLado.filter((f) => f.lado === lado && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo]);
    const signoNormal = rengs.filter((f) => f[campo] < 0).length > rengs.length / 2 ? -1 : 1;
    const salidaDe = new Map(); // renglón del estado -> lo que dejó en `out` (él mismo, o las hojas de su nota)
    const saltar = new Set(); // renglones de ABAJO de un subtotal cuya nota ya los reemplazó (subtotal impreso arriba)
    for (const [k, f] of delLado.entries()) {
      if (saltar.has(f)) continue;
      const antes = out.length;
      if (f.lado === 'otro') continue; // (conOtros) solo cuenta como componente; lo ubica la lectura 3
      // escalón 1 de las notas: el grupo entero se reemplaza por las filas de la nota en el lugar de su primer renglón
      if (grupo && grupo.renglones.includes(f)) {
        if (f === grupo.renglones[0]) out.push(...conLineas(abrirAnidadas(grupo.hojas.map((h) => ({ ...h, [campo]: h.valorNota, origen: `nota que desglosa "${grupo.renglones.map((r) => r.etiqueta).join('" + "')}" (escalón 1: grupo de renglones)` })), campo, 1), grupo.renglones));
        continue;
      }
      // un total/subtotal cuenta como línea solo si NO es la suma de renglones de arriba del mismo lado (Forest: "Turnover" total + venta de jugadores)
      // (y tampoco la suma de los renglones que tiene ABAJO: el estilo "Ingresos 500" y debajo sus componentes)
      if (f.tipo !== 'renglon') {
        if (f.tipo === 'resultado') continue;
        // ESCALÓN "columna anterior con signo" (Lazio 2016-17 y Milan 2018-19): en la columna del año anterior (`campo` 'A') un total también es la suma
        // de sus renglones si cierra CON SU SIGNO impreso (como la lectura 4 para la actual): una "Variazione delle rimanenze (608.641)" negativa suma en valor
        // absoluto 95,04 M contra el total impreso de 93,82 M, y el total se contaba además de sus renglones (188,86 M). La compuerta es la misma suma exacta.
        const esSumaDe = (lista) => { let acc = 0; let accF = 0; for (let j = 0; j < lista.length; j++) { acc += Math.abs(lista[j][campo] || 0); accF += lista[j][campo] || 0; if (j >= 1 && (cerca(acc, Math.abs(f[campo] || 0)) || ((conOtros || firmado || campo === 'A') && cerca(Math.abs(accF), Math.abs(f[campo] || 0))))) return true; } return false; };
        // UN SUBTOTAL CON SUS HIJOS ES UN COMPONENTE DEL TOTAL: "Matcheinnahmen" 16,13 M (Basel 2005) es un subtotal con 4 filas
        // debajo (aus Meisterschaft…, que detallan_a Matcheinnahmen) que suman exacto su importe; el "Total Ertrag" 38,22 M suma ese subtotal y 7 renglones más. Las filas
        // hijas no están en `delLado`, así que con solo renglones daba 22,09 y el total se contaba además de sus componentes (ingresos 76,43 M). Cuenta como
        // componente un subtotal de arriba con 2 hijas o más que suman su importe (así no entra un subtotal que suma renglones de arriba).
        const esCompuesto = (x) => { if (x.tipo !== 'subtotal') return false; const hs = filas.filter((h) => h.detalla_a && String(h.detalla_a).trim() === String(x.etiqueta).trim() && h.lado === x.lado); return hs.length >= 2 && cerca(hs.reduce((a, h) => a + Math.abs(h[campo] || 0), 0), Math.abs(x[campo] || 0)); };
        const arriba = delLado.slice(0, k).filter((x) => x.tipo === 'renglon').reverse(); const abajo = delLado.slice(k + 1).filter((x) => x.tipo === 'renglon');
        const arribaConCompuestos = delLado.slice(0, k).filter((x) => x.tipo === 'renglon' || esCompuesto(x)).reverse(); // solo para la decisión final de abajo, no para los escalones previos
        // ESCALÓN "SUBTOTAL REPETIDO" (escalón 1, aprobado por Guido; solo con `subRepetido`, que se prueba después
        // de que falla la lectura 4). Un subtotal con el MISMO importe que el renglón INMEDIATO de arriba (del mismo lado) es ese renglón
        // repetido, no una línea más (esSumaDe pide dos renglones y la lectura 4 junta todos los de arriba hasta un encabezado, que a veces no
        // se extrae). Si el renglón ya se abrió con su propia nota, el subtotal se saltea; si no, el subtotal ocupa su lugar (y se abre con SU
        // nota si la tiene, o entra entero: el mismo importe). Casos: Parma 2025 (.md L525 "altri" 118.887.215, L526 "Totale altri ricavi e
        // proventi" 118.887.215; "altri" abierto con la nota b31) y Parma 2024 (la nota b46, L1527-L1534, cuelga del subtotal): sin esto los
        // ingresos daban el doble, ninguna lectura 0-4 cerraba y ganaba la 5, que no abre notas (Televisión en 0).
        // Y una fila que no es renglón con el MISMO importe que la fila INMEDIATA DE ABAJO del estado (mismo lado, nada
        // en el medio: ni otra fila de otro lado) es el mismo número impreso dos veces: no se cuenta y queda la de abajo (la más detallada, o el
        // total). Casos: Remo 2023 y 2024 ("Receita Operacional Bruta" 33.831.604 y "Receita Operacional Líquida" 33.831.604, sin deducciones,
        // L10 y L12); Remo 2020 (total "(+) Receita Bruta Operacional" 12.351.668,08, L191, y su único renglón con el mismo importe, L192).
        // esSumaDe pide dos renglones, así que un subtotal de un solo renglón o repetido por el total se contaba además.
        // Y una fila que no es renglón y es la suma CON SIGNO de las filas de arriba de su lado CONTANDO LOS SUBTOTALES
        // (esSumaDe(arriba) mira solo renglones): "RECEITA LÍQUIDA" = "RECEITA OPERACIONAL BRUTA" (subtotal, abierto con su nota) − "Deduções".
        // No se cuenta: sus partes ya están. Caso: Ferroviária 2016 (.md L113-115: 9.221.750 − 10.553 = 9.211.197), se sumaba además de la nota.
        if (subRepetido && !esSumaDe(arriba) && !esSumaDe(abajo) && esSumaDe(delLado.slice(0, k).filter((x) => x.tipo !== 'resultado' && x.lado === lado).reverse())) {
          if (campo === 'M') { const n = `escalón "subtotal repetido": "${f.etiqueta}" (L${f.linea}) es la suma de las filas de arriba (con su subtotal); se saltea`; if (!notasSubRep.includes(n)) notasSubRep.push(n); }
          if (campo === 'M') partesSubRep.set(f.linea, delLado.slice(0, k).filter((x) => x.tipo !== 'resultado' && x.lado === lado).map((x) => x.etiqueta));
          continue;
        }
        // Y una fila que no es renglón y es la suma de los RENGLONES DE ABAJO DE CUALQUIER LADO, cuando esa suma incluye
        // una fila del financiero distinta de cero (esSumaDe(abajo) mira solo su lado): un subtotal de ingresos o de gastos que tiene adentro
        // una fila del financiero. No se cuenta (cada parte está en su lado) y esa fila del financiero toma el signo de su bloque: suma dentro
        // de los ingresos, resta dentro de los gastos (impresas las dos en positivo). Caso: Avaí 2021 (.md L121-148): "Receitas do Futebol
        // Profissional" 25.303.151 = ingresos + "Receita Financeira" 27.397; "Custos Futebol Profissional total" 41.707.360 incluye
        // "Despesas financeiras deságio" 3.995.456; "Despesas Operacionais" 15.142.893 incluye "Despesas Financeiras" 2.690.087.
        if (finEnBloque && campo === 'M' && (lado === 'ingreso' || lado === 'gasto') && !esSumaDe(arriba) && !esSumaDe(abajo)) {
          const abajoTodo = estado.slice(estado.indexOf(f) + 1).filter((x) => x.tipo === 'renglon' && x.lado !== 'resultado');
          let acc = 0; let n = -1; const obj = Math.abs(f.M || 0); const tolS = Math.max(TOL, 0.5 * (f.u || 0));
          for (let j = 0; j < abajoTodo.length; j++) { acc += Math.abs(abajoTodo[j].M || 0) * (abajoTodo[j].lado === lado || abajoTodo[j].lado === 'financiero' ? Math.sign(abajoTodo[j].M || 0) || 1 : 1); if (j >= 1 && Math.abs(Math.abs(acc) - obj) <= tolS + 0.5 * abajoTodo.slice(0, j + 1).reduce((a, x) => a + (x.u || 0), 0)) { n = j; break; } }
          const tramo = n >= 0 ? abajoTodo.slice(0, n + 1) : [];
          const finAdentro = tramo.filter((x) => x.lado === 'financiero' && Math.abs(x.M || 0) > 0);
          if (finAdentro.length) {
            for (const x of finAdentro) signoFinBloque.set(x.linea, lado === 'ingreso' ? 1 : -1);
            const n2 = `escalón "financiero dentro de un subtotal": "${f.etiqueta}" (L${f.linea}) es la suma de los renglones de abajo con ${finAdentro.length} fila(s) del financiero adentro; no se cuenta y esas filas del financiero ${lado === 'ingreso' ? 'suman' : 'restan'}`;
            if (!notasFinBloque.includes(n2)) notasFinBloque.push(n2);
            continue;
          }
        }
        // ESCALÓN "ACUMULADOS": el estado del POC portugués (antes de 2010) imprime totales que ACUMULAN: (C) = (A) + juros,
        // (E) = (C) + extraordinarios, (G) = (E) + imposto; (D) = (B) + juros obtidos, (F) = (D) + extraordinarios. Ninguno es la suma de
        // renglones de su lado (esSumaDe), así que se contaban como filas. Un subtotal/total que es EXACTO el subtotal/total anterior de su
        // lado + los renglones de su lado que hay entre los dos + algunas filas del financiero o del impuesto de ese tramo no se cuenta; esas
        // filas del financiero toman el signo de su lado (las dos columnas imprimen los juros en positivo: los de "Custos" restan, los de
        // "Proveitos" suman). Se miran solo las filas de su lado, del financiero y del impuesto porque el estado en dos columnas intercala
        // los lados por línea (Sporting 2004-05, L402-L423). Compuerta: el resultado impreso EXACTO, al final de la escalera (como el
        // patrón C). Casos: Benfica 2005-06 y 2006-07 (L902-941), Sporting 1999 a 2006-07.
        if (acumulados && (lado === 'ingreso' || lado === 'gasto') && !esSumaDe(arriba) && !esSumaDe(abajo)) { // también en la columna anterior (chequeos del año vecino y anterior)
          const iF = estado.indexOf(f);
          let iX = -1; for (let i = iF - 1; i >= 0; i--) { const x = estado[i]; if (x.lado === lado && x.tipo !== 'renglon' && x.tipo !== 'resultado' && isFinite(x[campo])) { iX = i; break; } }
          if (iX >= 0) {
            const X = estado[iX]; const entre = estado.slice(iX + 1, iF).filter((x) => x.tipo === 'renglon' && isFinite(x[campo]));
            const propios = entre.filter((x) => x.lado === lado); const sueltas = entre.filter((x) => (x.lado === 'financiero' || x.lado === 'impuesto') && Math.abs(x[campo] || 0) > 0);
            const abs = (arr) => arr.reduce((a, x) => a + Math.abs(x[campo] || 0), 0); const uDe = (arr) => arr.reduce((a, x) => a + (x.u || 0), 0);
            const obj = Math.abs(f[campo] || 0); const base = Math.abs(X[campo] || 0) + abs(propios);
            let elegido = null; let ambiguo = false;
            if (sueltas.length <= 4) for (let m = 0; m < (1 << sueltas.length); m++) {
              const sub = sueltas.filter((_, b) => m & (1 << b));
              if (Math.abs(base + abs(sub) - obj) <= Math.max(TOL, 0.5 * (f.u || 0)) + 0.5 * uDe([X, ...propios, ...sub])) { if (elegido) { ambiguo = true; break; } elegido = sub; }
            }
            if (elegido && !ambiguo) {
              if (campo === 'M' && conNotas) { // solo la lectura del documento propio anota (armar() también lee el documento vecino)
              for (const x of elegido) if (x.lado === 'financiero') signoAcum.set(x.linea, lado === 'ingreso' ? 1 : -1);
              const n3 = `escalón "acumulados": "${f.etiqueta}" (L${f.linea}) es "${X.etiqueta}" (L${X.linea})${propios.length ? ` + ${propios.length} renglón(es) de su lado` : ''}${elegido.length ? ` + ${elegido.map((x) => `"${x.etiqueta}" (L${x.linea})`).join(' + ')}` : ''}; no se cuenta`;
              if (!notasAcum.includes(n3)) notasAcum.push(n3);
              }
              continue;
            }
          }
        }
        const sigEst = subRepetido ? estado[estado.indexOf(f) + 1] : null;
        if (sigEst && sigEst.lado === lado && sigEst.tipo !== 'resultado' && Math.abs(f[campo] || 0) > 0 && cerca(Math.abs(sigEst[campo] || 0), Math.abs(f[campo] || 0)) && !esSumaDe(arriba) && !esSumaDe(abajo)) {
          if (campo === 'M') { const n = `escalón "subtotal repetido": "${f.etiqueta}" (L${f.linea}) repite la fila de abajo "${sigEst.etiqueta}" (L${sigEst.linea}); se saltea`; if (!notasSubRep.includes(n)) notasSubRep.push(n); }
          continue;
        }
        const previo = subRepetido && k > 0 ? delLado[k - 1] : null;
        if (previo && previo.tipo === 'renglon' && previo.lado === lado && !esSumaDe(arriba) && !esSumaDe(abajo) && cerca(Math.abs(previo[campo] || 0), Math.abs(f[campo] || 0))) {
          const salio = salidaDe.get(previo) || [];
          const abierto = salio.length !== 1 || !String(salio[0].origen || '').startsWith('estado');
          if (campo === 'M') { const n = `escalón "subtotal repetido": "${f.etiqueta}" (L${f.linea}) repite "${previo.etiqueta}" (L${previo.linea})${abierto ? '; se saltea' : '; ocupa su lugar'}`; if (!notasSubRep.includes(n)) notasSubRep.push(n); }
          if (abierto) continue;
          const quitar = new Set(salio); for (let i = out.length - 1; i >= 0; i--) if (quitar.has(out[i])) out.splice(i, 1);
        } else if (esSumaDe(arriba) || esSumaDe(abajo) || esSumaDe(arribaConCompuestos)) {
          // ESCALÓN: LA NOTA DEL SUBTOTAL. La extracción puede asignar las filas de una nota
          // al SUBTOTAL del grupo ("Totale altri ricavi e proventi") y no a un renglón: la nota reparte el grupo distinto que el estado
          // (Sassuolo 2025: a) 50,29 M y f) 15,41 M en el estado; sponsors, TV, Lega... en la nota) y no cierra ningún renglón. Hasta acá el
          // subtotal se salteaba (es la suma de los de arriba) y su nota no se usaba nunca: TV y sponsors quedaban en "otros ingresos". Si 2+
          // filas de la nota, del mismo lado, suman el subtotal IMPRESO (cerrarNota, la compuerta de siempre) y los renglones que lo componen
          // no se abrieron con una nota propia, esos renglones se reemplazan por las filas de la nota. Casos: Bologna 2019-20 y 2021-22,
          // Sassuolo 2025, Udinese 2021-22. SOLO EN EL CAMINO DE ERROR (`ladosCero`, decisión de Guido) y del lado de la categoría en 0: donde el estado ya viene desglosado
          // la nota repartía distinto (Atalanta 2024) o repetía lo mismo con otro nombre (Parma 2023).
          const hijasSub = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === String(f.etiqueta).trim() && h.lado === lado);
          const componentes = (lista) => { let acc = 0; for (let j = 0; j < lista.length; j++) { acc += Math.abs(lista[j][campo] || 0); if (j >= 1 && cerca(acc, Math.abs(f[campo] || 0))) return lista.slice(0, j + 1); } return null; };
          // componentes ARRIBA (Bologna: renglones y después "Totale altri ricavi e proventi") o, si no, ABAJO (Sassuolo 2025: "5) Altri ricavi
          // e proventi: 68.086.429" impreso arriba de a), b) y f)). Los de abajo todavía no pasaron: se exige que ninguno tenga nota propia.
          let comp = componentes(arriba); const deAbajo = !comp && (comp = componentes(abajo));
          const sueltos = comp && (deAbajo ? comp.every((x) => !filas.some((h) => h.detalla_a && h.detalla_a.trim() === String(x.etiqueta).trim())) : comp.every((x) => (salidaDe.get(x) || []).length === 1 && String(salidaDe.get(x)[0].origen || '').startsWith('estado')));
          // en la primera pasada, solo un grupo que el estado NO desglosa: 3 renglones o menos y uno de ellos de 20% o
          // más de los ingresos (Cremonese 2024: "altri" 42,8 + contributi 13,1; Sassuolo: a), b), f)). Un grupo ya desglosado en el estado
          // (Atalanta 2022/2024 y Genoa 2022: ~9 renglones) no se toca: su nota reparte distinto (Atalanta 2024: la TV 107,5 -> 101,8 M).
          const forzOk = forzarNotaSub && lado === 'ingreso' && comp && comp.length <= 3 && comp.some((x) => Math.abs(x[campo] || 0) >= 0.2 * totIngForz);
          let cn = (ladosCero.has(lado) || forzOk) && hijasSub.length >= 2 && sueltos ? cerrarNota(Math.abs(f[campo] || 0), hijasSub, campo, f.u || 0) : null;
          // GANA EL ESTADO SI ABRE MÁS: la nota reemplaza a los renglones del estado solo si trae al menos
          // tantas filas como las que reemplaza. Si trae menos es más gruesa que el estado y pierde el desglose. Caso: Sarpsborg 08 2024, la Note 1
          // trae 2 áreas (Arrangement 69,1 M y Salg/utleie spillere 134,6 M) para los 8 renglones de ingresos del estado (L116-124).
          if (cn && comp && cn.hojas.length < comp.length) cn = null;
          if (cn) {
            if (deAbajo) for (const x of comp) saltar.add(x);
            const quitar = new Set(deAbajo ? [] : comp.flatMap((x) => salidaDe.get(x))); const pos = deAbajo ? out.length : Math.min(...[...quitar].map((x) => out.indexOf(x)));
            for (let i = out.length - 1; i >= 0; i--) if (quitar.has(out[i])) out.splice(i, 1);
            out.splice(pos, 0, ...conLineas(abrirAnidadas(cn.hojas.map((h) => ({ ...h, [campo]: h.valorNota, origen: `nota que desglosa "${f.etiqueta}" (escalón: la nota del subtotal)` })), campo, 1), comp));
            if (campo === 'M' && !(forzarNotaSub && !ladosCero.has(lado))) notaSubtotalLados.add(lado);
            const n = `la nota del subtotal "${f.etiqueta}" suma el subtotal impreso (${r6(Math.abs(f[campo] || 0))}): reemplaza a "${comp.map((x) => x.etiqueta).join('" + "')}"`;
            const destinoN = forzarNotaSub && !ladosCero.has(lado) ? notasNotaSub : notas; if (campo === 'M' && !destinoN.includes(n)) destinoN.push(n);
          }
          continue;
        }
        // (solo en la lectura 4) un subtotal igual al ÚNICO renglón que tiene arriba desde el total/subtotal anterior del mismo
        // lado es ese renglón repetido, no una fila más (esSumaDe pide dos o más). Caso: Novorizontino 2024, "Impostos incidentes sobre a
        // receita" (1.303.783) y debajo "(-) Deduções da receita bruta" (1.303.783): se restaba una vez y se sumaba otra.
        if (firmado) {
          let i = k - 1; const solos = [];
          while (i >= 0 && delLado[i].tipo === 'renglon') { if (delLado[i].lado === lado) solos.push(delLado[i]); i--; }
          if (solos.length === 1 && cerca(Math.abs(solos[0][campo] || 0), Math.abs(f[campo] || 0))) continue;
        }
      }
      // Todas las filas de nota que dicen desglosar este renglón (renglones Y subtotales/totales: la estructura impresa hace falta para
      // saber qué suma qué; ver cerrarNota()).
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === f.etiqueta.trim());
      const obj = Math.abs(f[campo] || 0);
      let c = hijas.length >= 2 ? (cerrarConAjuste(f, hijas, campo) || cerrarNota(obj, hijas, campo, f.u || 0)) : null;
      // (frenado de Beşiktaş 2018) NOTA CON UN SUBTOTAL QUE TIENE FILAS PROPIAS: si las filas que dicen abrir este renglón no lo cierran y alguna
      // es un subtotal que a su vez tiene filas propias (detalla_a = ese subtotal), se prueba otra vez con esas filas también, en el orden del documento
      // (hasta 3 niveles). Misma compuerta (cerrarNota). Caso: Beşiktaş 2018, nota 18: "Satışların maliyeti" = mercaderías 68,3 + "Satılan hizmet maliyeti"
      // 552,1 (subtotal con 11 filas: salarios 393,9...) = 620,3; con las hijas directas sumaba 68,3 y quedaba el total como una línea. (La nota de ese año no suma por un error del documento, 98.157: se abre con el ajuste `desglose`.)
      if (!c && hijas.some((h) => h.tipo !== 'renglon')) {
        const conjunto = new Set(hijas); let frontera = hijas.filter((h) => h.tipo !== 'renglon');
        for (let nivel = 0; nivel < 3 && frontera.length; nivel++) {
          const nuevas = filas.filter((h) => !conjunto.has(h) && h.detalla_a && frontera.some((s) => s.etiqueta.trim() === h.detalla_a.trim()));
          nuevas.forEach((h) => conjunto.add(h)); frontera = nuevas.filter((h) => h.tipo !== 'renglon');
        }
        if (conjunto.size > hijas.length) { const ampliadas = filas.filter((h) => conjunto.has(h)); c = cerrarConAjuste(f, ampliadas, campo) || cerrarNota(obj, ampliadas, campo, f.u || 0); }
      }
      // ESCALÓN DEL LADO: si las filas que dicen abrir este renglón no lo cierran, se prueba SOLO con las
      // del mismo lado que el renglón. Nombres repetidos: en el formato italiano "altri" es el renglón de ingresos 5), el 16) y el 17), y las
      // notas de intereses (lado financiero) también dicen abrir "altri" (Bologna 2020-21: 9 filas de ingresos 79.927.218 + 8 de intereses =
      // 81.433.661 contra 79.927.219). Escalón y no regla: probado como regla, rompía Goiás 2025 (cargado), cuya nota "Outras Receitas e
      // Despesas" mezcla un gasto y un ingreso que juntos dan el renglón neto. La compuerta es la de siempre: cerrarNota().
      if (!c && hijas.length >= 2) {
        const ladoOk = (h) => !h.lado || !f.lado || h.lado === f.lado || h.lado === 'otro' || f.lado === 'otro';
        const mismas = hijas.filter(ladoOk);
        if (mismas.length >= 2 && mismas.length < hijas.length) { c = cerrarConAjuste(f, mismas, campo) || cerrarNota(obj, mismas, campo, f.u || 0); if (c) { const n = `la nota de "${f.etiqueta}" cierra solo con sus filas del lado ${f.lado} (${hijas.length - mismas.length} filas de otro lado dicen abrir un renglón con el mismo nombre)`; if (!notas.includes(n)) notas.push(n); } }
      }
      // en la lectura 4 (signos impresos) un renglón que RESTA en su lado le pasa ese signo
      // a las filas de su nota: cerrarNota() las devuelve relativas al renglón en valor absoluto, y sin esto la nota de una deducción sumaba.
      // Caso: St. Gallen 2024-25, "Ertragsminderungen" −463 (L260) abierto en +21 (L330) y −484 (L403): se leían −21 y +484.
      if (c) { const sg = firmado && f.tipo === 'renglon' && (f[campo] || 0) * signoNormal < 0 ? -1 : 1; out.push(...conLineas(abrirAnidadas(c.hojas.map((h) => ({ ...h, [campo]: h.valorNota * sg, origen: `nota que desglosa "${f.etiqueta}"` })), campo, 1), [f])); }
      else { out.push({ ...f, [campo]: firmado && f.tipo === 'renglon' ? (f[campo] || 0) * signoNormal : Math.abs(f[campo] || 0), origen: firmado && f.tipo === 'renglon' && (f[campo] || 0) * signoNormal < 0 ? 'estado (lectura 4: signo impreso, resta en su lado)' : 'estado' }); if (conNotas && hijas.length >= 2 && campo === 'M' && !desgloseTrivial(f, hijas)) { const sr = r6(hijas.filter((h) => h.tipo === 'renglon').reduce((a, h) => a + Math.abs(h.M || 0), 0)); if (!reintentos.some((x) => x.renglon === f.etiqueta)) notas.push(`la nota de "${f.etiqueta}" no suma el renglón (${sr} contra ${r6(obj)}, sumando sus renglones): quedó el renglón del estado`); if (!reintentos.some((x) => x.renglon === f.etiqueta)) reintentos.push({ renglon: f.etiqueta, suma: sr, objetivo: r6(obj) }); } }
      if (f.tipo === 'renglon') salidaDe.set(f, out.slice(antes));
    }
    return out;
  };
  return { filas, estado, lineasDeLado, mult };
  }

  // EL DOCUMENTO VECINO DEL CLUB (año siguiente dy=1 o anterior dy=-1), si ya pasó por extraer.mjs: lo usan la escalera de escala y el
  // chequeo 4b. Su factor es el que resolvió SU propia escalera (queda en su .verificacion.json); `anclado` = su escala es conocida (la
  // declara, escalón 0, o la resolvió por el escalón 1). Uno que dice "no se sabe" y no la resolvió no puede proponerle escala a otro.
  const vecinoDe = (dy) => {
    if (!year) return null;
    const carpeta = pdf.split('/').slice(0, 3).join('/');
    // el año del otro documento: su fecha de cierre o, si no la tiene, la deducida de sus vecinos
    const anioDe = (x) => (x.periodo?.cierre ? Number(x.periodo.cierre.slice(0, 4)) : cierrePorVecinos(x.pdf, registro)?.anio ?? null);
    // De los documentos del club con ese año, el que pasó por extraer. Antes se tomaba el PRIMERO del año y, si no tenía
    // .filas.json, no había chequeo: Fortaleza CEIF 2023 nunca se comparó con 2024 porque el primero de 2024 es certificacion-ef-2024.pdf.
    const filasDe = (x) => resolve(ROOT, derivado(x.md, '.filas.json', { crear: false }));
    // un documento descartado o parcial no es vecino: no es del club o no cubre el año (Rio Ave 2014-15, de la asociación).
    // en una carpeta con dos entidades que se suman (ajuste `suma-con`: Vålerenga AS y Elite) el vecino es de la MISMA entidad: el documento que es la
    // "otra entidad" de una suma solo se compara con otros de su rol, y los demás no se comparan con él.
    const esOtra = (p) => registro.some((r) => r.pdf.startsWith(carpeta + '/') && ajusteDe(r.pdf, 'suma-con')?.valor === p);
    const miRol = esOtra(pdf);
    const otro = registro.find((x) => x.pdf !== pdf && x.pdf.startsWith(carpeta + '/') && !DESCARTADOS.has(x.pdf) && !PARCIALES.has(x.pdf) && x.md && existsSync(filasDe(x)) && anioDe(x) === year + dy && esOtra(x.pdf) === miRol);
    if (!otro) return null;
    const pF2 = filasDe(otro);
    // el vecino también por sus códigos NBB (si los trae y cierran)
    const F2 = JSON.parse(readFileSync(pF2, 'utf8')); const n2 = nbbDe(F2, otro.md, otro.pdf);
    const pU2 = resolve(ROOT, derivado(otro.md, '.ubicacion.json', { crear: false })); const U2 = existsSync(pU2) ? JSON.parse(readFileSync(pU2, 'utf8')) : {};
    if (n2) U2.bloques = { ...(U2.bloques || {}), nbb: n2.bloque };
    const pV2 = resolve(ROOT, derivado(otro.md, '.verificacion.json', { crear: false })); const esc2 = existsSync(pV2) ? JSON.parse(readFileSync(pV2, 'utf8')).escala : null;
    const k2 = !MULT[U2.escala] && esc2?.escalon === 1 ? esc2.factor : 1;
    // la lectura con la que cerró el vecino: su columna se lee igual que se leyó la suya
    const lect2 = existsSync(pV2) ? Number(((JSON.parse(readFileSync(pV2, 'utf8')).chequeos || []).find((c) => c.nombre === 'lectura')?.detalle?.match(/lectura (\d)/) || [])[1] || 0) : 0;
    const subRep2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).some((n) => String(n).startsWith('escalón "subtotal repetido"')) : false;
    const ventana2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).some((n) => String(n).startsWith('escalón "gestión de jugadores neta"')) : false;
    const acumNotas2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).filter((n) => String(n).startsWith('escalón "acumulados"')) : []; const otrosRes2 = existsSync(pV2) ? (JSON.parse(readFileSync(pV2, 'utf8')).notas || []).some((n) => String(n).startsWith('escalón "otros con el signo del resultado"')) : false; const acum2 = acumNotas2.length ? (acumNotas2.some((n) => n.includes('(sin-otros)')) ? 'sin-otros' : true) : otrosRes2 ? 'otros-resultado' : false;
    return { otro, U2, k2, lect2, subRep2, ventana2, acum2, anclado: !!MULT[U2.escala] || esc2?.escalon === 1, nbb2: n2 ? n2.N : codigosNBBde(otro.md), A2: armar(n2 ? n2.F : F2, U2, false, k2) };
  };
  // Los ingresos de un documento leídos con UNA lectura de la escalera: 3 suma los renglones sin lado por su signo (y lee los
  // subtotales con ellos), 4 además conserva los signos impresos. Lo usa el chequeo del año vecino: hasta la 397 leía los dos documentos con
  // la lectura 0 aunque hubieran cerrado con otra. Caso: Goiás 2011 cerró con la lectura 4 (ingresos 17.096.667, igual al total impreso y a
  // la columna 2011 del documento 2012), y el chequeo comparaba 52.419.680 (lectura 0) contra 17.096.667.
  // VENTANA de las filas sin lado: las que están entre el total de costos y el "resultado antes de impuestos" del estado de A. La usa el
  // escalón "gestión de jugadores neta" de la lectura 6, en la columna actual y en la del año anterior (y la del documento vecino).
  const enVentanaOtros = (A) => { const e = A.estado; const tc = e.filter((f) => f.tipo === 'total' && f.lado === 'gasto' && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0]; const an = e.filter((f) => f.tipo === 'resultado' && /antes\s+de(l)?\s+impuesto|before\s+(income\s+)?tax|vor\s+(ertrag)?steuern|antes\s+dos\s+impostos|avant\s+imp[oô]t|voor\s+belasting|ante\s+imposte|prima\s+delle\s+imposte/i.test(f.etiqueta) && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0]; return (f) => !!(tc && an && f.linea > tc.linea && f.linea < an.linea); };
  const ingresosConLectura = (A, campo, nivel, subRep = false, ventana = false, acum = false) => { // acum: cerró con el escalón "acumulados" // subRep: la lectura 4 cerró con el escalón "subtotal repetido"
    if (nivel < 3) return A.lineasDeLado('ingreso', campo);
    if (nivel >= 5) { // las mismas hojas con signo C/D de la lectura 5, en la columna pedida (actual o año anterior)
      const r = A.estado.filter((f) => f.lado === 'ingreso' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo]); const normal = r.filter((f) => f[campo] < 0).length > r.length / 2 ? -1 : 1;
      const hojas = r.map((f) => { const m = String((campo === 'A' ? f.anterior : f.actual) ?? '').trim().match(/\s([CD])$/i); return { ...f, [campo]: m ? (m[1].toUpperCase() === 'D' ? -Math.abs(f[campo]) : Math.abs(f[campo])) : f[campo] * normal }; });
      if (nivel < 6) return hojas;
      const g6 = A.estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); const neg6 = g6.length ? g6.filter((f) => f.M < 0).length >= g6.length / 2 : true;
      const enV = ventana ? enVentanaOtros(A) : () => true;
      return [...hojas, ...A.estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] && enV(f) && !repiteResultado(A.estado, f, campo) && (neg6 ? f[campo] > 0 : f[campo] < 0)).map((f) => ({ ...f, [campo]: Math.abs(f[campo]) }))]; // lectura 6
    }
    const g = A.estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); const neg = g.length ? g.filter((f) => f.M < 0).length >= g.length / 2 : true;
    const otrosI = A.estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] && !repiteResultado(A.estado, f, campo) && (neg ? f[campo] > 0 : f[campo] < 0)).map((f) => ({ ...f, [campo]: Math.abs(f[campo]) }));
    const acumB = acum === true || acum === 'sin-otros'; // 'sin-otros': el escalón "acumulados" cerró sin las filas sin lado; 'otros-resultado': cerró con ellas al signo del resultado
    const otrosV = nivel !== 4 ? otrosI : acum === 'sin-otros' ? [] : acum === 'otros-resultado' ? A.estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f[campo]) && f[campo] > 0 && !repiteResultado(A.estado, f, campo)).map((f) => ({ ...f, [campo]: Math.abs(f[campo]) })) : otrosI;
    return [...A.lineasDeLado('ingreso', campo, true, nivel >= 4, (subRep || acumB) && nivel === 4, false, acumB && nivel === 4), ...otrosV];
  };
  // compara los ingresos del año en común (mi columna actual con la "año anterior" del siguiente, o al revés) con mi documento a escala k
  const saleDelAjuste = (a, f) => (a.reemplaza ? String(f.etiqueta).trim() === a.reemplaza.trim() || String(f.origen || '').includes(`desglosa "${a.reemplaza.trim()}"`) : false)
    || (a.reemplazaLinea != null && (Number(f.linea) === Number(a.reemplazaLinea) || (f.desdeLineas || []).includes(Number(a.reemplazaLinea))));
  const signoNormalDe = (lado, pdfDoc = pdf) => { const r = ajustesDe(pdfDoc).filter((x) => x.campo === 'fila' && x.lado === lado && isFinite(parseNumber(x.valor)) && parseNumber(x.valor)); return r.filter((x) => parseNumber(x.valor) < 0).length > r.length / 2 ? -1 : 1; };
  // (ESCALÓN 1 de los chequeos del año vecino y del año anterior cargado; aprobado por Guido) Los ingresos de una columna con los
  // ajustes `fila` del documento al que pertenece. COLUMNA ACTUAL ('M'): los que reemplazan y los que agregan, a la escala de ese documento (A.mult).
  // COLUMNA ANTERIOR ('A'): un ajuste `fila` solo trae la actual, así que acá solo cuenta el que SOLO saca una fila (valor 0 con reemplaza: una fila
  // repetida lo está en las dos columnas). El escalón 0 (las columnas crudas) corre siempre primero: este solo se prueba si el 0 falla, con la misma
  // compuerta (2%). Caso: Roma 2007 contra 2008, crudo 157.589 contra 162.017 (2,7%); con el ajuste de gestión de jugadores de 2007, 162.255 (0,15%).
  const ingresosConAjustes = (A, pdfDoc, lineas, campo, firmado = false) => {
    const m = A.mult(A.estado[0]?.bloque); let out = [...lineas];
    for (const a of ajustesDe(pdfDoc).filter((x) => x.campo === 'fila' && isFinite(parseNumber(x.valor)))) {
      const v = parseNumber(a.valor) * m; const saca = a.reemplaza || a.reemplazaLinea != null;
      if (saca && (campo === 'M' || v === 0)) out = out.filter((f) => !saleDelAjuste(a, f));
      if (campo !== 'M' || (v === 0 && saca)) continue;
      if (a.lado === 'ingreso') out.push({ etiqueta: a.etiqueta, lado: 'ingreso', tipo: 'renglon', M: firmado ? v * signoNormalDe(a.lado, pdfDoc) : Math.abs(v), u: unidad(a.valor, m), linea: a.linea ?? null, origen: 'ajuste manual' });
    }
    return out;
  };
  // ESCALÓN 2 de los chequeos del año en común: la columna del año en común leída con LAS MISMAS FILAS que cerraron la columna
  // que se carga (las líneas finales, con el signo con que contaron), en vez de volver a armarla con la lectura. Hace falta cuando esa columna
  // no suma su propio total (la reconstrucción no reconoce los subtotales y los cuenta además). Caso: Ferroviária 2024, la columna 2023 de
  // sus renglones da 38.582.080 contra el total impreso 39.134.471; la reconstrucción contaba total y "Receita líquida" (114,4 M); con las
  // filas que cerraron 2024 (renglones − "Impostos incidentes") da 37.009.979 contra 37.562.370 cargados (1,5%). Misma compuerta (2%).
  // Una fila sin esa columna (un ajuste `fila`) cuenta 0; si ninguna la trae, no decide.
  const colConFilas = (lineas, buscar) => { let s = 0; let alguna = false; for (const l of lineas) { const f = buscar(l); const a = f?.A; if (a == null || !isFinite(a)) continue; alguna = true; s += (l.M < 0 ? -1 : 1) * Math.abs(a); } return alguna ? s : null; };
  const compararVecino = (dy, V2, k, nivelMio = 0, subRepMio = false, ventanaMio = false, lineasMio = null, acumMio = false) => {
    const [campoMio, campoSuyo] = dy === 1 ? ['M', 'A'] : ['A', 'M'];
    const sumaDe = (arr, c) => arr.reduce((a, f) => a + (f[c] || 0), 0);
    const Amio = armar(F, U, false, k);
    const linMio = ingresosConLectura(Amio, campoMio, nivelMio, subRepMio, ventanaMio, acumMio); const linSuyo = ingresosConLectura(V2.A2, campoSuyo, V2.lect2 || 0, V2.subRep2, V2.ventana2, V2.acum2);
    let mio = sumaDe(linMio, campoMio); let suyo = sumaDe(linSuyo, campoSuyo);
    // escalón 1: solo si las columnas crudas no coinciden, cada una con los ajustes `fila` de su documento.
    if (!(suyo && cerca(mio, suyo, 0.02))) {
      const m1 = sumaDe(ingresosConAjustes(Amio, pdf, linMio, campoMio, nivelMio === 4), campoMio); const s1 = sumaDe(ingresosConAjustes(V2.A2, V2.otro.pdf, linSuyo, campoSuyo, V2.lect2 === 4), campoSuyo);
      if (s1 && cerca(m1, s1, 0.02)) { mio = m1; suyo = s1; }
    }
    // escalón 2: con las filas que cerraron cada columna que se carga (la mía, `lineasMio`; la del vecino, su .verificacion.json)
    if (lineasMio && !(suyo && cerca(mio, suyo, 0.02))) {
      let V2v = null; try { V2v = JSON.parse(readFileSync(resolve(ROOT, derivado(V2.otro.md, '.verificacion.json', { crear: false })), 'utf8')); } catch {}
      const lin2 = (V2v?.lineas || []).filter((l) => l.lado === 'ingreso');
      const m2 = campoMio === 'M' ? lineasMio.reduce((a, f) => a + (f.M || 0), 0) : colConFilas(lineasMio, (f) => f);
      const s2 = campoSuyo === 'M' ? (V2v?.totales?.ingresos ?? null) : colConFilas(lin2, (l) => V2.A2.estado.find((f) => f.linea === l.linea));
      if (m2 != null && s2 && cerca(m2, s2, 0.02)) { mio = m2; suyo = s2; }
    }
    // COMPUERTA DEL ESCALÓN 0: la columna del año en común ("año anterior", la mía o
    // la del siguiente) tiene que existir: alguna fila del estado la trae leída. Si no, "no se puede comparar" (null), como sin vecino. Caso:
    // Novorizontino 2014 y 2015, balancetes de una sola columna: se comparaba 0 contra 1.060.016 y mandaba un falso "no coincide" a la cola.
    // ESCALÓN 3: UN DOCUMENTO EN MONEDA LEGADO Y EL OTRO EN EUROS. Sporting 2001 (miles de escudos, ajuste `moneda`
    // PTE) contra la columna 2001 del documento 2002 (euros): 6.419,453 M PTE contra 32,02 M EUR; con la paridad fija, 6.419,453 / 200,482 =
    // 32,02. COMPUERTA: solo uno de los dos tiene ajuste `moneda` y esa moneda tiene `euroFijo` en data/currency-map.js; con la conversión,
    // la misma del escalón 0 (2%). Dos documentos en la misma moneda nunca pasan por acá.
    // ESCALÓN "códigos NBB": si los dos documentos traen el estado NBB con códigos, la columna del año en común se compara por
    // sus resultados impresos, el 9904 (del ejercicio) y el 9901 (operativo), no por los ingresos: el esquema abreviado abre o no la
    // Brutomarge según lo que imprima cada año y un documento puede reclasificar el año anterior entre la Brutomarge y otros gastos con el
    // mismo 9901 (Patro Eisden 2023: 9900 −246.781, y −232.016 en la columna 2023 de 2024); el año siguiente puede pasar del esquema
    // abreviado al completo (RWDM 2024 y 2025). Compuerta: 9904 y 9901 impresos en las dos columnas e iguales a una unidad. Solo si las
    // columnas no coinciden con los escalones de arriba; vale también para un documento con ajustes (compara lo impreso, no lo que se carga).
    if (!(suyo && cerca(mio, suyo, 0.02)) && nbbPropio && V2.nbb2) {
      const cM = campoMio === 'M' ? 'actual' : 'anterior'; const cS = campoSuyo === 'M' ? 'actual' : 'anterior';
      const iguales = ['9904', '9901'].every((c) => nbbPropio.filas[c]?.[cM] != null && V2.nbb2.filas[c]?.[cS] != null && Math.abs(nbbPropio.filas[c][cM] - V2.nbb2.filas[c][cS]) <= 1);
      if (iguales) return { mio, suyo, ok: true, codigosNBB: ['9904', '9901'] };
    }
    let paridad = null;
    if (!(suyo && cerca(mio, suyo, 0.02))) {
      const mA = ajusteDe(pdf, 'moneda')?.valor || null; const mB = ajusteDe(V2.otro.pdf, 'moneda')?.valor || null;
      const fA = mA && !mB ? EURO_FIJO[mA] : null; const fB = mB && !mA ? EURO_FIJO[mB] : null;
      if (fA || fB) { const m3 = fA ? mio / fA : mio; const s3 = fB ? suyo / fB : suyo; if (s3 && cerca(m3, s3, 0.02)) { mio = m3; suyo = s3; paridad = mA || mB; } }
    }
    const conAnterior = (A) => A.estado.some((f) => f.lado === 'ingreso' && f.A != null && isFinite(f.A) && f.A);
    if (!conAnterior(campoMio === 'A' ? Amio : V2.A2)) return { mio, suyo, ok: null, sinColumna: true };
    // uno de los dos documentos cuenta la gestión de jugadores NETA como ingreso (escalón "gestión de jugadores neta") y el otro no: no
    // definen "ingresos" igual, no se pueden comparar. Caso: Roma 2017 (254.076 con la neta) contra la columna 2017 del documento 2018 (175.000, sin ella).
    if (!!ventanaMio !== !!V2.ventana2) return { mio, suyo, ok: null, otroRegimen: true };
    return { mio, suyo, ok: suyo ? cerca(mio, suyo, 0.02) : null, paridad };
  };
  const vecinosDoc = [[1, vecinoDe(1)], [-1, vecinoDe(-1)]].filter(([, v]) => v);

  // ESCALERA DE ESCALA. Caso que la originó: Fortaleza CEIF 2023 y 2024 dicen
  // "Expresados en pesos colombianos" (.md 2024 L1125) y las cifras son miles; extraer/localizar dejaron "no se sabe" y se leían en unidades
  // (ingresos 2024 = 12,2 millones). El documento de 2025 declara miles (L1149) y repite 2024 como 12.206 millones. Peligro: 2023 y 2024
  // coinciden ENTRE SÍ en la escala equivocada; por eso solo propone un vecino ANCLADO (la declara o ya la resolvió acá), y la cadena se arma
  // procesando los años desde el que declara (2025 -> 2024 -> 2023, el orden de la lista del lote).
  //   ESCALÓN 0  la declarada: la de cada bloque (extraer.mjs); si "no se sabe", la del documento (localizar.mjs). Si el documento la
  //              declara, manda: el escalón 1 nunca la pisa.
  //   ESCALÓN 1  solo si el documento dice "no se sabe": PROPONE la del año vecino anclado, si sus importes dan exactamente x1.000 o
  //              x1.000.000 (todo el documento por ese factor).
  //   COMPUERTA  la misma del chequeo 4b: con la escala propuesta, la columna del año vecino coincide (ingresos ±2%). El resultado no
  //              cambia de veredicto (cerrar es invariante a la escala del documento entero). Pasa -> se adopta; no -> unidades, como antes.
  // Queda escrito en el .verificacion.json: escala { valor, escalon, factor, de }.
  let kEsc = 1; let escala = { valor: MULT[U.escala] ? U.escala : 'no se sabe', escalon: 0, factor: 1, de: null };
  if (!MULT[U.escala]) {
    for (const [dy, v] of vecinosDoc.filter(([, v]) => v.anclado)) {
      const base = compararVecino(dy, v, 1);
      if (base.ok !== false || !base.mio) continue;
      const k = [1000, 1e6].find((x) => cerca(base.mio * x, base.suyo, 0.02));
      if (!k) continue;
      if (compararVecino(dy, v, k).ok !== true) continue; // la compuerta
      kEsc = k; escala = { valor: k === 1000 ? 'miles' : 'millones', escalon: 1, factor: k, de: v.otro.pdf.split('/').pop() };
      notas.push(`escala: el documento no la declara; se tomó ${escala.valor} del año vecino (${escala.de}), con el que coincide x${k} (escalón 1)`);
      break;
    }
  }
  // escala de cada bloque para los totales impresos (la misma de armar)
  const escalaDe = new Map((F.escalas || []).map((x) => [x.bloque, x.escala]));
  const mult = (b) => (MULT[escalaDe.get(b)] ?? MULT[U.escala] ?? 1e-6) * kEsc;
  if (escala.escalon === 0 && [...escalaDe.values()].includes('no se sabe') && !MULT[U.escala]) notas.push('escala desconocida en algún bloque: se asumió unidades (lo confirma el chequeo del año anterior)');

  const { filas, estado, lineasDeLado } = armar(F, U, true, kEsc);
  // financiero e impuesto: sus renglones; SI NO HAY NINGUNO, su subtotal/total impreso si es UNO solo. Caso: Goiás 2023, el
  // estado trae solo "Resultado financeiro líquido (1.425.102)" (pág. 7 del visor, .md L221), sin receitas/despesas financeiras: el
  // financiero se tomaba como 0 y el resultado no cerraba. Si hay renglones, el subtotal no se usa (no se cuenta dos veces).
  const renglonesOTotal = (lado) => { const r = estado.filter((f) => f.lado === lado && f.tipo === 'renglon'); if (r.length) return r; const t = estado.filter((f) => f.lado === lado && ['subtotal', 'total'].includes(f.tipo) && isFinite(f.M)); return t.length === 1 ? t : []; };
  const fin = renglonesOTotal('financiero'); const imp = renglonesOTotal('impuesto');
  const suma = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);
  const conSigno = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);
  // SIGNO DE UNA FILA DEL FINANCIERO POR SU RÓTULO: +1 si dice ingreso financiero (intereses cobrados, receitas financeiras,
  // finance income...), -1 si dice gasto financiero, 0 si no dice o dice las dos cosas ("Ingresos y gastos financieros", "Oneri e proventi
  // finanziari": queda con su signo impreso). Las listas están en tools/vocabulario.mjs (FIN_INGRESO / FIN_GASTO).
  const signoRotulo = (f) => {
    const t = normalizar(f.etiqueta || '');
    const ing = FIN_INGRESO_RE.test(t) && !GASTOS_RE.test(t); const gas = FIN_GASTO_RE.test(t) && !INGRESOS_RE.test(t);
    return ing && !gas ? 1 : gas && !ing ? -1 : 0;
  };
  const conSignoRotulo = (arr, conSig = false) => arr.reduce((a, f) => { const sg = signoRotulo(f); return a + (sg ? sg * (conSig ? (f.M || 0) : Math.abs(f.M || 0)) : (f.M || 0)); }, 0);
  // el efecto del financiero y el signo del impuesto según la lectura que cerró (los mismos nombres que COMBOS, más "financiero por rótulo")
  const finSegun = (lect, arr) => (/por rótulo/.test(String(lect)) ? conSignoRotulo(arr, /con signo/.test(String(lect))) : (/financiero e impuesto invertidos|financiero invertido/.test(String(lect)) ? -1 : 1) * conSigno(arr));
  const siSegun = (lect) => (/financiero e impuesto invertidos|impuesto invertido/.test(String(lect)) ? -1 : 1);

  // 3. totales y resultado: LA ESCALERA DE LECTURAS. Se prueba una lectura; si no cierra
  // con un número impreso (resultado o totales), la siguiente, que agrega una interpretación más a la anterior. Gana la primera que cierra y
  // queda escrito cuál fue. El camino limpio es la lectura 0: si cierra, ningún escalón se usa. Ningún escalón se acepta si no cierra.
  //   0  las filas tal cual las extrajo la IA
  //   1  + si no hay resultado final, "resultado antes de impuestos" (sin el impuesto). UC 2011-2013: el estado elegido termina en el impuesto.
  //   2  + el total impreso puede ser un RENGLÓN más del estado (las otras líneas se suman aparte). UC 2012: "total de ingresos" era
  //        "Ingresos de actividades ordinarias 7.450.809" y aparte estaba "Otros ingresos por función 30.426".
  //   3  + los renglones del estado sin lado (lado 'otro') entran según su signo, con la misma convención de signos que los gastos del estado.
  //        UC 2010-2014: "Otras ganancias (pérdidas) (288.444)" quedaba afuera y el resultado no cerraba por exactamente ese importe.
  //   4  + signos impresos: un renglón negativo dentro de su lado resta, y los subtotales se reconocen por la suma con signo.
  //        Goiás 2008-2011: "(-) Dedução da receita" sumaba en vez de restar y el subtotal se contaba dos veces.
  // Si ninguna cierra: queda la lectura 0 con sus chequeos fallidos (camino de error: reintento, después cola). Si el documento no tiene NINGÚN
  // número impreso para cerrar (ni totales, ni resultado, ni antes de impuestos), eso también es un fallo: antes pasaba como OK sin chequeo.
  const tI = F.total_ingresos ? Math.abs(parseNumber(F.total_ingresos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const tG = F.total_gastos ? Math.abs(parseNumber(F.total_gastos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const ANTES_RE = /antes\s+de(l)?\s+impuesto|before\s+(income\s+)?tax|vor\s+(ertrag)?steuern|antes\s+dos\s+impostos|avant\s+imp[oô]t|voor\s+belasting|ante\s+imposte|prima\s+delle\s+imposte|p[řr]ed\s+zdan[ěe]n[íi]m|προ\s+φ[οό]ρων(?![\s,]*(και\s+)?(τόκων|τοκων|χρηματοδοτ))/i;
  // Checo "před zdaněním" (Výsledek hospodaření před zdaněním) y griego "προ φόρων" (Αποτέλεσμα / Κέρδη προ φόρων): antes de los
  // lotes 64 y 65. El griego excluye "προ φόρων, χρηματοδοτικών..." y "προ φόρων και τόκων" (resultado operativo / EBIT, no el resultado antes
  // de impuestos), igual que "antes de impuestos" no toma "antes de intereses e impuestos". Mayúsculas griegas sin acento: φ[οό]ρων.
  // EL RESULTADO IMPRESO SE LEE POR SU ETIQUETA: si la línea que extraer marcó como "resultado del ejercicio" dice "antes de
  // impuestos", es el resultado ANTES de impuestos (lectura 1), no el final. Caso real: Fortaleza CEIF 2023-2025 (las notas hacen de estado):
  // F.resultado apuntaba a L719 "Utilidad contable antes de impuesto" 1.609.817 y se le restaba el impuesto; sin restarlo cierra exacto.
  const filaDeRes = F.resultado ? estado.find((f) => f.linea === F.resultado.linea && f.tipo === 'resultado') : null;
  const resEsAntes = !!(filaDeRes && ANTES_RE.test(filaDeRes.etiqueta));
  // RESULTADO IMPRESO, ESCALÓN 2: si extraer no encontró el resultado en los bloques (ni el
  // de antes de impuestos), una línea PREJUÍZO / SUPERÁVIT / DÉFICIT / LUCRO con un número, pegada al último bloque del estado (hasta 4
  // líneas después), PROPONE el resultado. COMPUERTA: alguna lectura tiene que cerrar con él EXACTO (a media unidad por fila, como la
  // lectura 5), no con la tolerancia de siempre. Casos: Novorizontino 2015 ("PREJUIZO: 5.598.142,50", L158; el bloque termina en L156) y
  // 2013 ("PREJUÍZO 728.230,75", L225; el bloque termina en L223).
  let resCerca = null;
  if (!F.resultado && !estado.some((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.M))) { // (sin resultado antes de impuestos, como filaAntes más abajo)
    const finEstado = Math.max(...(F.ubicacion?.estado || []).map((b) => U.bloques?.[b]?.lineas?.[1] ?? -1), -1);
    if (finEstado > 0) {
      const L = (() => { try { return readFileSync(resolve(ROOT, md), 'utf8').split('\n'); } catch { return []; } })();
      for (let i = finEstado; i < Math.min(finEstado + 4, L.length); i++) { // L[i] es la línea i+1 del .md
        const m = L[i].match(/(PREJU[IÍ]ZO|D[EÉ]FICIT|SUPER[AÁ]VIT|LUCRO)[^0-9(]{0,40}(\(?-?\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?\)?)/i);
        // italiano: "UTILE (PERDITA) DELL'ESERCIZIO" trae las dos palabras, así que el signo lo da el importe impreso (entre paréntesis o con
        // menos = pérdida). Caso: Napoli 2021 (L299, tabla de una fila pegada al bloque b13) y 2022 (L309).
        const mi = m ? null : L[i].match(/UTILE\s*\(\s*PERDITA\s*\)\s*DELL.\s*ESERCIZIO[^0-9(\-]{0,20}(\(?-?\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?\)?)/i);
        if (!m && !mi) continue;
        const k = mult((F.ubicacion?.estado || []).slice(-1)[0]);
        const v = mi ? (parseNumber(mi[1]) ?? NaN) * k : Math.abs(parseNumber(m[2]) ?? NaN) * k;
        if (isFinite(v) && v) { resCerca = { M: mi ? v : /PREJU|D[EÉ]FICIT/i.test(m[1]) ? -v : v, linea: i + 1, texto: L[i].trim().slice(0, 80) }; break; }
      }
    }
  }
  const resFinal = F.resultado && !resEsAntes ? (parseNumber(F.resultado.actual) ?? NaN) * mult(estado[0]?.bloque) : resCerca ? resCerca.M : null;
  const filaAntes = estado.find((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.M));
  const gastosNeg = (() => { const g = estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); return g.length ? g.filter((f) => f.M < 0).length >= g.length / 2 : true; })();
  const otros = estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f.M) && f.M && !repiteResultado(estado, f, 'M'));
  const ing0 = lineasDeLado('ingreso'); const gas0 = lineasDeLado('gasto');
  // AJUSTES MANUALES DE FILAS: escalón 0, antes de la escalera de lecturas. Agrega la fila
  // que la extracción no trajo, o reemplaza la que trajo mal (`reemplaza`), en la escala del documento; los chequeos corren igual sobre el
  // resultado. Caso: Fortaleza CEIF 2017 (nota 23 "Otros gastos" 41.780 perdida en un salto de página; costos financieros rotulados
  // "Total Otros Ingresos" en el PDF).
  // la misma pasada se aplica también a la base de la lectura 3 (ing3/gas3); ahí solo ingresos y gastos, sin repetir notas.
  // `firmado` = la base de la lectura 4: ahí el ajuste lleva su signo impreso relativo al signo
  // normal de los AJUSTES de su lado (la mayoría), igual que un renglón respecto de su lado en lineasDeLado(firmado): un ingreso impreso en
  // negativo entre ingresos positivos resta. El signo normal sale de los ajustes y no del estado porque vienen de otra tabla (una nota que
  // imprime los gastos entre paréntesis bajo un estado que los imprime en positivo). En las demás lecturas sigue el valor absoluto. No es una
  // regla nueva: la escalera de lecturas prueba las dos formas y gana la que cierra. Caso: Goiás 2016, "(-) Deduções das receitas"
  // (7.401.426,19) entre las partes de la nota 17 (lectura 1: ingresos 97,8 M contra 83,0 M impresos; lectura 4: cierra).
  const aplicarAjustesFila = (ingB, gasB, primera, firmado = false) => { for (const a of ajustesDe(pdf).filter((x) => x.campo === 'fila' && isFinite(parseNumber(x.valor)))) {
    const destino = { ingreso: ingB, gasto: gasB, financiero: primera ? fin : null, impuesto: primera ? imp : null }[a.lado];
    if (!destino) continue;
    // sale la fila con esa etiqueta Y, si estaba abierta en su nota, las filas de la nota (si no, se contaría dos veces)
    // `reemplazaLinea`: sale SOLO la fila de esa línea del .md (o las hojas de su nota, si estaba abierta). `reemplaza` por etiqueta
    // saca todas las homónimas: en el formato italiano "altri" es a la vez ingreso (5), financiero + (16) y financiero − (17) (Bologna 2020-21,
    // L833, L871 y L875).
    const sale = (f) => saleDelAjuste(a, f);
    if (a.reemplaza || a.reemplazaLinea != null) for (const arr of [ingB, gasB, fin, imp]) for (let i = arr.length - 1; i >= 0; i--) if (sale(arr[i])) arr.splice(i, 1);
    const m = mult(estado[0]?.bloque); const v = parseNumber(a.valor) * m;
    // con valor 0 y `reemplaza`, el ajuste SOLO saca la fila: no agrega una línea en cero (Juventus 2018-19, la fila
    // de la ganancia por acción "(0,040)", .md L1160, no es un importe del estado)
    if (v === 0 && (a.reemplaza || a.reemplazaLinea != null)) { if (primera) notas.push(`ajuste manual: sale la fila "${a.reemplaza ?? `L${a.reemplazaLinea}`}" (${a.fecha}, ${a.motivo})`); continue; }
    destino.push({ etiqueta: a.etiqueta, lado: a.lado, tipo: 'renglon', M: ['ingreso', 'gasto'].includes(a.lado) ? (firmado === 'estado' ? v * signoDelEstado(a.lado) : firmado ? v * signoNormalDe(a.lado) : Math.abs(v)) : v, u: unidad(a.valor, m), linea: a.linea ?? null, pagina: a.linea ? paginaDeLinea(md, a.linea) : null, origen: 'ajuste manual', ...(a.destino ? { destino: a.destino } : {}) });
    if (primera) notas.push(`ajuste manual: fila "${a.etiqueta}" (${a.lado}) ${a.valor}${a.reemplaza ? `, en lugar de "${a.reemplaza}"` : ''}${a.reemplazaLinea != null ? `, en lugar de la fila de L${a.reemplazaLinea}` : ''} (${a.fecha}, ${a.motivo})`);
  } };
  aplicarAjustesFila(ing0, gas0, true);
  // base de la lectura 3: los subtotales se leen con los renglones sin lado como componentes (lineasDeLado, conOtros)
  const ing3 = otros.length ? lineasDeLado('ingreso', 'M', true) : ing0; const gas3 = otros.length ? lineasDeLado('gasto', 'M', true) : gas0;
  if (otros.length) aplicarAjustesFila(ing3, gas3, false);
  // base de la lectura 4: signos impresos (lineasDeLado, firmado), con los renglones sin lado como en la lectura 3
  const ing4 = lineasDeLado('ingreso', 'M', true, true); const gas4 = lineasDeLado('gasto', 'M', true, true);
  // base del escalón "subtotal repetido": la lectura 4 con los subtotales que repiten el renglón de arriba sin contar
  const ing4r = lineasDeLado('ingreso', 'M', true, true, true); const gas4r = lineasDeLado('gasto', 'M', true, true, true);
  aplicarAjustesFila(ing4, gas4, false, true);
  aplicarAjustesFila(ing4r, gas4r, false, true);
  // base del escalón "financiero dentro de un subtotal" (el último de la escalera) y el financiero con el signo de su bloque
  const ing4c = lineasDeLado('ingreso', 'M', true, true, true, true); const gas4c = lineasDeLado('gasto', 'M', true, true, true, true);
  aplicarAjustesFila(ing4c, gas4c, false, true);
  const finBloque = signoFinBloque.size ? fin.map((f) => (signoFinBloque.has(f.linea) ? { ...f, M: signoFinBloque.get(f.linea) * Math.abs(f.M), origen: `${f.origen || 'estado'} (signo de su bloque)` } : f)) : null;
  // base del escalón "acumulados" (el último de la escalera, después del patrón C) y el financiero con el signo de su lado
  const ing4a = lineasDeLado('ingreso', 'M', true, true, true, false, true); const gas4a = lineasDeLado('gasto', 'M', true, true, true, false, true);
  aplicarAjustesFila(ing4a, gas4a, false, true);
  const finAcum = notasAcum.length ? fin.map((f) => (signoAcum.has(f.linea) ? { ...f, M: signoAcum.get(f.linea) * Math.abs(f.M), origen: `${f.origen || 'estado'} (signo de su lado, escalón acumulados)` } : f)) : null;
  // ESCALÓN "signo del documento" en los ajustes `fila`, después de la lectura 4 (y de su escalón del subtotal repetido) y antes
  // de la 5. La 4 compara el signo de cada ajuste con la MAYORÍA DE LOS AJUSTES de su lado (signoNormalDe): con un solo ajuste en el lado,
  // ese ajuste es la mayoría y nunca resta. Este escalón lo compara con cómo IMPRIME EL ESTADO ese lado (la mayoría de sus renglones): un
  // ajuste con el valor tal cual impreso y el signo contrario al de su lado resta. Misma compuerta que la 4 (totales impresos y resultado).
  // Solo se prueba si cambia algún signo. Caso: Criciúma 2022 (.md L241-248), gastos impresos entre paréntesis y "Outras receitas
  // Operacionais" 32.222 sin paréntesis dentro de CUSTOS E DESPESAS OPERACIONAIS (23.790.402 = 23.822.624 − 32.222).
  const signoDelEstado = (lado) => (lado === 'gasto' ? (gastosNeg ? -1 : 1) : (() => { const r = estado.filter((f) => f.lado === 'ingreso' && f.tipo === 'renglon' && isFinite(f.M) && f.M); return r.length && r.filter((f) => f.M < 0).length > r.length / 2 ? -1 : 1; })());
  const ing4e = lineasDeLado('ingreso', 'M', true, true); const gas4e = lineasDeLado('gasto', 'M', true, true);
  aplicarAjustesFila(ing4e, gas4e, false, 'estado');
  const cambiaSigno4e = ajustesDe(pdf).some((a) => a.campo === 'fila' && ['ingreso', 'gasto'].includes(a.lado) && parseNumber(a.valor) && signoDelEstado(a.lado) !== signoNormalDe(a.lado));
  const hayRepetido = notasSubRep.length > 0;
  const NOMBRES_LECTURA = ['las filas tal cual', 'resultado antes de impuestos si no hay resultado final', 'el total impreso puede ser un renglón', 'renglones sin lado según su signo', 'signos impresos (un renglón negativo resta en su lado)', 'solo las hojas con su signo (C/D del balancete), sin subtotales ni totales', 'la 5 más los renglones sin lado según su signo'];
  // LECTURA 5: SOLO LAS HOJAS del estado (renglones), ningún subtotal ni total, cada
  // una con su signo: la marca C/D de un balancete si la trae (D en ingresos resta, C en gastos resta, financiero C suma y D resta) y si no,
  // el signo impreso como en la lectura 4. No adivina qué subtotal suma qué: los ignora a todos. Tampoco usa los totales como chequeo (en un
  // balancete jerárquico mezclan lados): su ÚNICA compuerta es el resultado impreso, EXACTO (a media unidad por fila). Casos (diagnóstico
  // de Novorizontino 2013-2017): grupos de un solo renglón repetidos como subtotal y total (2017: 8.019.563,48 contado 3 veces), subtotales
  // que mezclan lados (2017: "(-) DESPESAS OPERACIONAIS" incluye el financiero y la recuperação), marcas C/D descartadas (2014: "DEV. DE
  // CONVÊNIO" 14.754,86 D sumaba dentro de ingresos).
  const cdDe = (f) => { const m = String(f.actual ?? '').trim().match(/\s([CD])$/i); return m ? m[1].toUpperCase() : null; };
  // el ajuste manual `fila` (escalón 0) actúa también en las lecturas 5 y 6: la
  // fila que nombra `reemplaza` sale de las hojas (y de los renglones sin lado de la 6) y, si el ajuste trae un valor, entra la suya.
  const reemplazadas = new Set(ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.reemplaza).map((x) => String(x.reemplaza).trim()));
  const lineasReemplazadas = new Set(ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.reemplazaLinea != null).map((x) => Number(x.reemplazaLinea)));
  const reemplazada = (f) => reemplazadas.has(String(f.etiqueta).trim()) || lineasReemplazadas.has(Number(f.linea));
  const hojas5 = (lado) => estado.filter((f) => f.lado === lado && f.tipo === 'renglon' && isFinite(f.M) && f.M && !reemplazada(f));
  const conSigno5 = (lado, cdResta) => { const r = hojas5(lado); const normal = r.filter((f) => f.M < 0).length > r.length / 2 ? -1 : 1;
    return r.map((f) => { const cd = cdDe(f); return { ...f, M: cd ? (cd === cdResta ? -Math.abs(f.M) : Math.abs(f.M)) : f.M * normal, origen: `estado (lectura 5: hoja${cd ? ` con ${cd}` : ''})` }; }); };
  const ing5 = conSigno5('ingreso', 'D'); const gas5 = conSigno5('gasto', 'C');
  if (reemplazadas.size || lineasReemplazadas.size) aplicarAjustesFila(ing5, gas5, false);
  // ESCALÓN "financiero sin hojas": si el estado trae el financiero como UNA fila impresa como subtotal ("Oneri
  // finanziari netti e differenze cambio (1.866.421)") y no hay hojas debajo, las lecturas 5 y 6 (solo hojas) lo dejaban en 0 y el resultado
  // no cerraba. Una sola compuerta: sin hojas de financiero, se usan los renglones o el total único de `fin` (el resultado impreso sigue siendo
  // la compuerta de la lectura).
  const fin5 = (hojas5('financiero').length ? hojas5('financiero') : fin.filter((f) => isFinite(f.M) && f.M && !reemplazada(f))).map((f) => { const cd = cdDe(f); return { ...f, M: cd ? (cd === 'D' ? -Math.abs(f.M) : Math.abs(f.M)) : f.M }; });
  // un ajuste `fila` del lado financiero con `reemplaza` también ENTRA en la lectura 5/6 (antes solo salía la
  // fila vieja). Caso: Juventus 2003-2006, gastos financieros impresos en positivo bajo "17) INTEREST AND OTHER FINANCIAL EXPENSES".
  for (const a of ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.lado === 'financiero' && (x.reemplaza || x.reemplazaLinea != null) && isFinite(parseNumber(x.valor)) && parseNumber(x.valor) !== 0)) {
    const m = mult(estado[0]?.bloque); fin5.push({ etiqueta: a.etiqueta, lado: 'financiero', tipo: 'renglon', M: parseNumber(a.valor) * m, u: unidad(a.valor, m), linea: a.linea ?? null, pagina: a.linea ? paginaDeLinea(md, a.linea) : null, origen: 'ajuste manual', ...(a.destino ? { destino: a.destino } : {}) });
  }
  // ESCALÓN "ajustes del financiero sin reemplaza": la lectura 5 de arriba solo suma los ajustes del
  // financiero que reemplazan una fila. fin5Todos les suma también los que no reemplazan nada (una fila que la extracción no trajo). No es
  // una regla de la lectura 5 (así rompía Roma 2018, que cierra el resultado desde la lectura 0 y falla solo por los totales): es un
  // escalón aparte, que corre SOLO si ninguna lectura 0-6 cerró el RESULTADO (lo único que el financiero puede arreglar). Compuerta: la
  // de la lectura 5, el resultado impreso exacto. Caso: Inter 2024-25, "rivalutazioni di partecipazioni (18)" +780.928 (.md L976):
  // 567.012.038 − 482.024.122 − 35.879.464 + 780.928 − 14.491.102 = 35.398.278 (L986).
  const fin5Todos = [...fin5];
  for (const a of ajustesDe(pdf).filter((x) => x.campo === 'fila' && x.lado === 'financiero' && !(x.reemplaza || x.reemplazaLinea != null) && isFinite(parseNumber(x.valor)) && parseNumber(x.valor) !== 0)) {
    const m = mult(estado[0]?.bloque); fin5Todos.push({ etiqueta: a.etiqueta, lado: 'financiero', tipo: 'renglon', M: parseNumber(a.valor) * m, u: unidad(a.valor, m), linea: a.linea ?? null, pagina: a.linea ? paginaDeLinea(md, a.linea) : null, origen: 'ajuste manual', ...(a.destino ? { destino: a.destino } : {}) });
  }
  const evaluar = (nivel, conAjustesFin = false, finForzado = null, bases = null, excluirOtros = null) => {
    const ch = []; let ing = [...(bases ? bases.ing : nivel >= 5 ? ing5 : nivel >= 4 ? ing4 : nivel >= 3 ? ing3 : ing0)]; let gas = [...(bases ? bases.gas : nivel >= 5 ? gas5 : nivel >= 4 ? gas4 : nivel >= 3 ? gas3 : gas0)];
    const finL = finForzado || (nivel >= 5 ? (conAjustesFin ? fin5Todos : fin5) : fin);
    // LECTURA 6: la 5 (solo hojas, sin totales, resultado impreso EXACTO) + los
    // renglones sin lado según su signo, como la lectura 3. Caso: Juventus 2015-16 a 2019-20, "Other non-recurring revenues and costs"
    // (+10.638.769, 2015-16 .md L1880) y "Group's share of results of associates" (−661.133, L1884) quedan sin lado; las lecturas 3-4 los
    // suman pero fallan por el total impreso de ingresos, y la 5 no los suma. Solo se llega acá si fallaron la 0 a la 5.
    // un ajuste `fila` que saca un renglón sin lado se respeta también en las lecturas 3 y 4
    // (antes, solo en la 6): la fila volvía a entrar por su signo. Caso: St. Gallen 2024-25, la compensación entre sociedades "Entschädigung"
    // +11.500 / −11.500 (L268-269), sacada con ajustes: entraba igual como ingreso y como gasto e inflaba los dos lados.
    if ((nivel >= 3 && nivel < 5) || nivel >= 6) for (const f of otros) { if (excluirOtros && excluirOtros.has(f)) continue; if (reemplazada(f)) continue; const esGasto = bases?.otrosResultado ? f.M < 0 : gastosNeg ? f.M < 0 : f.M > 0; (esGasto ? gas : ing).push({ ...f, lado: esGasto ? 'gasto' : 'ingreso', M: Math.abs(f.M), origen: `estado (sin lado en el documento: entra como ${esGasto ? 'gasto' : 'ingreso'} por su signo, impreso ${f.M < 0 ? 'en negativo' : 'en positivo'}; lectura ${nivel >= 6 ? 6 : 3})` }); } // el origen le llega a Jev y a Claude como sección
    const ajuste = (arr, total, nombre, lineaTotal) => {
      if (total == null || !isFinite(total)) { ch.push({ nombre: `total de ${nombre}`, ok: null, detalle: 'el documento no lo imprime' }); return arr; }
      const sm = suma(arr); const tolRed = Math.max(TOL, 0.5 * arr.reduce((a, f) => a + (f.u || 0), 0));
      if (cerca(sm, total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(sm)} = ${r6(total)}`, suma: sm, impreso: total }); return arr; } // suma/impreso: los usa el escalón del primer año
      // Un total que es UNA fila (un total de verdad, o desde la lectura 2 también un renglón: la fila de la línea que extraer marcó como total),
      // con otras líneas del mismo lado fuera de ese total. Nottingham Forest: "Turnover" + "Profit on disposal" aparte.
      const filaTotal = estado.find((f) => f.tipo !== 'renglon' && cerca(Math.abs(f.M || 0), total)) || (nivel >= 2 ? estado.find((f) => (lineaTotal != null && f.linea === lineaTotal) || (f.tipo === 'renglon' && cerca(Math.abs(f.M || 0), total))) : null);
      if (filaTotal) {
        // si el escalón "subtotal repetido" (patrón B) salteó ese total por ser la suma de
        // las filas de arriba, el total cierra con lo que salió de ESAS filas (ellas mismas o las hojas de su nota). Caso: St. Gallen 2024-25,
        // "Erträge netto" 45.057 (L261) = "Erträge brutto" (abierto en su nota) + "Ertragsminderungen"; "Ausserordentlicher Ertrag" queda afuera.
        const partes = (!arr.some((f) => f.etiqueta === filaTotal.etiqueta) && partesSubRep.get(filaTotal.linea)) || [filaTotal.etiqueta];
        const deEsa = arr.filter((f) => partes.some((p) => f.etiqueta === p || String(f.origen || '').startsWith(`nota que desglosa "${p}"`)));
        if (deEsa.length && cerca(suma(deEsa), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `"${filaTotal.etiqueta}" ${r6(total)} cierra; además se suman ${arr.length - deEsa.length} línea(s) fuera de ese total (${r6(sm - total)})` }); return arr; }
      }
      // (cambio C, aprobado por Guido; desde la lectura 2) el total impreso puede ser el TOTAL DE UNA NOTA que
      // abrió el escalón 1 de las notas (grupo de renglones): las filas de esa nota suman el total y el resto del lado queda afuera, como el
      // renglón de arriba. La compuerta sigue siendo el resultado impreso. Caso: AEL Larissa 2019, extraer tomó como "total de gastos" el
      // total de la nota 15 (3.534.818,85, .md L432 = costo de ventas + administración + comercialización); "Λοιπά έξοδα" (21.600, L83) va
      // afuera. Antes no cerraba ninguna lectura que abre notas y ganaba la lectura 5 (gasto por función).
      if (nivel >= 2) {
        const porBloque = new Map();
        for (const f of arr) if (String(f.origen || '').includes('escalón 1: grupo')) { if (!porBloque.has(f.bloque)) porBloque.set(f.bloque, []); porBloque.get(f.bloque).push(f); }
        for (const [b, filasNota] of porBloque) {
          const lin = U.bloques?.[b]?.lineas;
          if (lineaTotal != null && lin && (lineaTotal < lin[0] || lineaTotal > lin[1])) continue; // el total impreso tiene que ser de esa nota
          if (cerca(suma(filasNota), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `el total de la nota ${b} (${r6(total)}) cierra con sus filas; además se suman ${arr.length - filasNota.length} línea(s) fuera de esa nota (${r6(sm - total)})` }); return arr; }
        }
      }
      if (Math.abs(sm - total) <= tolRed) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(sm)} contra ${r6(total)}: fila "Diferencia de redondeo" de ${r6(total - sm)}` }); return [...arr, { etiqueta: 'Diferencia de redondeo', lado: nombre === 'ingresos' ? 'ingreso' : 'gasto', M: total - sm, origen: 'redondeo' }]; }
      // (solo en la lectura 4) el total impreso puede ser el BRUTO: los renglones con el signo normal del lado suman el total y
      // los negativos (deducciones) restan aparte. La compuerta sigue siendo el resultado impreso (sin él la lectura no cierra). Caso:
      // Novorizontino 2024, "Receita bruta" 40.157.783 y debajo "Impostos incidentes sobre a receita" (1.303.783).
      if (nivel >= 4) {
        const pos = arr.filter((f) => (f.M || 0) > 0); const neg = arr.filter((f) => (f.M || 0) < 0);
        if (neg.length && cerca(suma(pos), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `total bruto ${r6(total)} cierra con los renglones de signo normal; ${neg.length} deducción(es) restan aparte (${r6(suma(neg))})` }); return arr; }
      }
      ch.push({ nombre: `total de ${nombre}`, ok: false, detalle: `las líneas suman ${r6(sm)} y el total impreso dice ${r6(total)}` });
      return arr;
    };
    if (nivel >= 5) for (const nm of ['ingresos', 'gastos']) ch.push({ nombre: `total de ${nm}`, ok: null, detalle: 'la lectura 5 no usa totales (en un balancete mezclan lados): la compuerta es el resultado impreso' });
    // con filas del financiero adentro de los subtotales, los totales impresos también mezclan lados: como en la lectura 5,
    // no son compuerta y el resultado tiene que cerrar EXACTO
    else if (bases?.sinTotales) for (const nm of ['ingresos', 'gastos']) ch.push({ nombre: `total de ${nm}`, ok: null, detalle: 'el total impreso incluye filas del financiero (escalón "subtotal repetido"): la compuerta es el resultado impreso exacto' });
    else if (!bases?.sinTotales) { ing = ajuste(ing, tI, 'ingresos', F.total_ingresos?.linea); gas = ajuste(gas, tG, 'gastos', F.total_gastos?.linea); }
    // resultado: ingresos - gastos + financiero + impuesto, probando los signos de financiero e impuesto (cada documento los imprime a su manera)
    let objetivo = resFinal; let conImp = true; let nombreRes = 'resultado del ejercicio';
    if ((objetivo == null || !isFinite(objetivo)) && nivel >= 1 && filaAntes) { objetivo = filaAntes.M; conImp = false; nombreRes = 'resultado antes de impuestos'; }
    let okRes = null; let lect = null; let exactoRes = false; let difRes = null; // difRes: lo usa el escalón del primer año
    if (objetivo != null && isFinite(objetivo)) {
      // ESCALERA DE LA COMPUERTA DEL RESULTADO: primero las 4 combinaciones de signo
      // pidiendo el resultado EXACTO (media unidad impresa por fila, como la lectura 5); solo si ninguna es exacta, la tolerancia de siempre
      // (cerca). Antes ganaba la primera que entraba en la tolerancia aunque otra fuera exacta. Caso: Cremonese 2025 (.md L183-198),
      // ingresos − gastos −8.054.278; "financiero e impuesto invertidos" daba −6.976.885 (8.522 EUR de diferencia, dentro de la tolerancia) y
      // ganaba, con el financiero cargado +4.261 contra (4.261) impreso; "impuesto invertido" da −6.985.407, el impreso exacto.
      // UN RESULTADO IMPRESO NEGATIVO TRAE SU SIGNO: tiene que cerrar con signo. La comparación en valor
      // absoluto queda para el impreso positivo o sin signo (la pérdida impresa sin signo, escalera más abajo). Antes una lectura con
      // las filas dadas vuelta cerraba contra un negativo impreso. Caso: Lierse Kempenzonen 2022, impreso −4.591; Brutomarge −2.369 leída como
      // ingreso +2.369 y el financiero invertido daban +4.590 y "cierra (financiero invertido)". Medido: 376 documentos idénticos (prueba-completa,
      // Bélgica y Estonia); comparar siempre con signo cambiaba Novorizontino 2014-b, AVS 2023-24 y Portimonense 2022-23 (pérdidas sin signo).
      const cierraRes = (x, exacto, tol) => (objetivo < 0 ? (exacto ? Math.abs(x - objetivo) <= tol : cerca(x, objetivo)) : (exacto ? Math.abs(Math.abs(x) - Math.abs(objetivo)) <= tol : cerca(Math.abs(x), Math.abs(objetivo))));
      const COMBOS = [[1, 1, 'como impresos'], [-1, -1, 'financiero e impuesto invertidos'], [1, -1, 'impuesto invertido'], [-1, 1, 'financiero invertido']];
      const tol5 = Math.max(1e-6, 0.5 * [...ing, ...gas, ...finL].reduce((a, f) => a + (f.u || 0), 0)); // exacto, a media unidad por fila
      const patDe = (sf, si) => suma(ing) - suma(gas) + sf * conSigno(finL) + (conImp ? si * conSigno(imp) : 0);
      for (const exacto of nivel >= 5 || resCerca || bases?.sinTotales ? [true] : [true, false]) {
        for (const [sf, si, nm] of COMBOS) {
          if (!conImp && si === -1) continue;
          const pat = patDe(sf, si);
          if (cierraRes(pat, exacto, tol5)) { okRes = true; difRes = Math.abs(Math.abs(pat) - Math.abs(objetivo)); lect = nm; exactoRes = exacto; break; }
        }
        if (okRes) break;
        // EL SIGNO DE CADA FILA DEL FINANCIERO POR SU RÓTULO, entre los signos en
        // bloque exactos (arriba) y la tolerancia (la vuelta siguiente). Volos 2023-24 imprime "Πιστωτικοί τόκοι" 5.104,81 y "Χρεωστικοί
        // τόκοι" 5.967,01, los dos en positivo: en bloque daba 482.369,93 o 504.513,57 contra 492.579,55 impreso; por rótulo, 493.441,75 +
        // 5.104,81 − 5.967,01 = 492.579,55 exacto. Y en Volos 2020-21 "los dos como gasto" entraba en la tolerancia (125,6 = 2 × 62,83 de
        // diferencia) y se cargaba mal. Misma compuerta: resultado EXACTO. Solo si algún rótulo cambia algo respecto de lo impreso.
        if (exacto && finL.some((f) => signoRotulo(f)) && Math.abs(conSignoRotulo(finL) - conSigno(finL)) > 1e-9) {
          for (const si of conImp ? [1, -1] : [1]) {
            const pat = suma(ing) - suma(gas) + conSignoRotulo(finL) + (conImp ? si * conSigno(imp) : 0);
            if (cierraRes(pat, true, tol5)) { okRes = true; difRes = Math.abs(Math.abs(pat) - Math.abs(objetivo)); lect = si === 1 ? 'financiero por rótulo' : 'financiero por rótulo, impuesto invertido'; exactoRes = true; break; }
          }
          if (okRes) break;
        }
        // EL SIGNO POR RÓTULO, CON EL VALOR IMPRESO CON SU SIGNO: el escalón de arriba toma el valor absoluto
        // de cada fila, y una reversión negativa dentro de los costos ("Annen finanskostnad" −136.202, dentro de "Sum finanskostnader" 1.313.085)
        // debe restar de verdad, no sumar. Mismo orden y misma compuerta (resultado EXACTO), antes de la tolerancia. Caso: Sarpsborg 08 2023,
        // netInterest 2,63 M en vez de 8.446 (L136-145 del .md; 0,1809 + 1,1406 − 1,4493 + 0,1362). Medido: 722 documentos, 721 idénticos.
        if (exacto && finL.some((f) => signoRotulo(f)) && Math.abs(conSignoRotulo(finL, true) - conSignoRotulo(finL)) > 1e-9) {
          for (const si of conImp ? [1, -1] : [1]) {
            const pat = suma(ing) - suma(gas) + conSignoRotulo(finL, true) + (conImp ? si * conSigno(imp) : 0);
            if (cierraRes(pat, true, tol5)) { okRes = true; difRes = Math.abs(Math.abs(pat) - Math.abs(objetivo)); lect = si === 1 ? 'financiero por rótulo con signo' : 'financiero por rótulo con signo, impuesto invertido'; exactoRes = true; break; }
          }
          if (okRes) break;
        }
      }
      if (!okRes) okRes = false;
      ch.push({ nombre: nombreRes, ok: okRes, detalle: okRes ? `cierra (${lect})` : `ingresos ${r6(suma(ing))} - gastos ${r6(suma(gas))} ± financiero ${r6(conSigno(fin))}${conImp ? ` ± impuesto ${r6(conSigno(imp))}` : ''} no da el impreso ${r6(objetivo)}`, dif: difRes });
    } else ch.push({ nombre: 'resultado del ejercicio', ok: null, detalle: 'extraer.mjs no encontró el resultado impreso' });
    const okTot = ch.filter((c) => c.nombre.startsWith('total')).map((c) => c.ok);
    const cierra = okRes === true ? !okTot.includes(false) : okRes === null && okTot.includes(true) && !okTot.includes(false);
    return { ing, gas, ch, okRes, lect, cierra, nivel, objetivo, exacto: exactoRes };
  };
  let E = null; let E0 = null;
  let algunaCierraRes = false; let escalonAjFin = false;
  let escalonSubRep = false; let escalonSignoDoc = false;
  // con las filas NBB, primero la lectura 4 (signo impreso: una reversión "(+)/(-)" negativa resta en su lado). La 0 lee en
  // valor absoluto y, con la tolerancia, podía dar por bueno un estado con una reversión sumada (Patro Eisden 2025 cerraba así).
  for (const n of nbbV ? [4, 0, 1, 2, 3, 5, 6] : [0, 1, 2, 3, 4, 5, 6]) {
    const e = evaluar(n); if (!E0) E0 = e; if (e.okRes) algunaCierraRes = true; if (e.cierra) { E = e; break; }
    // después de la lectura 4 y antes de la 5: la 4 sin los subtotales que repiten el renglón de arriba. Misma
    // compuerta que la 4 (totales impresos y resultado). Solo si la base cambia (hay un subtotal repetido).
    if (n === 4 && hayRepetido) { const er = evaluar(4, false, null, { ing: ing4r, gas: gas4r }); if (er.okRes) algunaCierraRes = true; if (er.cierra) { E = er; escalonSubRep = true; break; } }
    if (n === 4 && cambiaSigno4e) { const es = evaluar(4, false, null, { ing: ing4e, gas: gas4e }); if (es.okRes) algunaCierraRes = true; if (es.cierra) { E = es; escalonSignoDoc = true; notas.push('escalón "signo del documento": los ajustes `fila` con el signo contrario al de su lado en el estado restan; cerró la lectura 4'); break; } }
  }
  // ESCALÓN "de los cuales". Una fila que empieza con "Waarvan:" / "dont" / "davon" / "of which" /
  // "de los cuales" (vocabulario.mjs DE_LOS_CUALES) es una PARTE de la de arriba: sumada aparte, cuenta dos veces. No se saca siempre (manta
  // corta): solo si NINGUNA lectura cerró, se prueban las lecturas 4 y 5 sin esas filas. Compuerta: cierra EXACTO. Caso: Lierse SK 2025 (L255-256),
  // Brutomarge 2.706.155 y debajo "Waarvan: niet-recurrente bedrijfsopbrengsten" 82.200; Patro Eisden 2025 (1.810). Antes, un ajuste `fila` en 0.
  let escalonDeLosCuales = false;
  // También una fila que el .md imprime debajo de un encabezado "Analysed as" (hasta 3 líneas antes, en la misma tabla): el
  // desglose del renglón de arriba ("Exceptional items" ya dentro de "Administrative expenses", West Ham 2020-21 a 2023-24). Misma compuerta.
  const lineasMdAs = (() => { try { return readFileSync(resolve(ROOT, md), 'utf8').split('\n'); } catch { return []; } })();
  const bajoAnalysedAs = (f) => { for (let i = f.linea - 2; i >= Math.max(0, f.linea - 4); i--) { const t = lineasMdAs[i] || ''; if (!t.startsWith('|')) return false; if (/^\|\s*[*_]*\s*analysed as\b/i.test(t)) return true; } return false; };
  const esDeLosCuales = (f) => f.tipo === 'renglon' && (DE_LOS_CUALES_RE.test(normalizar(f.etiqueta || '')) || (f.linea && bajoAnalysedAs(f)));
  if (!E && [...ing4, ...gas4, ...ing5, ...gas5].some(esDeLosCuales)) {
    for (const [n, i0, g0] of [[4, ing4, gas4], [5, ing5, gas5]]) {
      const e = evaluar(n, false, null, { ing: i0.filter((f) => !esDeLosCuales(f)), gas: g0.filter((f) => !esDeLosCuales(f)) });
      if (e.cierra && e.exacto) { E = e; escalonDeLosCuales = true; break; }
    }
    if (escalonDeLosCuales) notas.push(`escalón "de los cuales": cerró la lectura ${E.nivel} sin las filas ${[...ing4, ...gas4, ...ing5, ...gas5].filter(esDeLosCuales).map((f) => `"${String(f.etiqueta).slice(0, 50)}" L${f.linea}`).filter((x, i, a) => a.indexOf(x) === i).join(', ')} (una parte de la fila de arriba)`);
  }
  if (!E && !algunaCierraRes && fin5Todos.length > fin5.length) { const e = evaluar(5, true); if (e.cierra) { E = e; escalonAjFin = true; } }
  // ESCALÓN "17) resta". El formato del Codice Civile imprime el renglón 17)
  // "interessi e altri oneri finanziari" en positivo y lo resta por POSICIÓN ("TOTALE (C) (15+16-17)"); el financiero se lee con el signo
  // impreso y lo suma. Solo corre si el resultado no cerró EXACTO en ninguna lectura. Propone: el 17) y lo que cuelga de él (hasta el 17-bis o
  // el total de C) como −|valor|; 16) y 17-bis con su signo. Compuerta ÚNICA: la suma da EXACTO el total de C impreso (el último subtotal del
  // financiero antes de que la extracción salga de la sección). Si pasa, las lecturas 0-6 otra vez con ese financiero, y gana la primera que
  // cierra el resultado exacto. Caso: Torino 2024 (.md L515-520), 16) 438.730, 17) 3.226.978, TOTALE (C) (2.788.248): 438.730 − 3.226.978 =
  // −2.788.248; resultado 19.682.867 − 2.788.248 − 6.496.317 = 10.398.302. No corre donde el 17) ya viene entre paréntesis y cierra
  // (Atalanta, Sassuolo, Monza, Lazio, Roma 2022). No mira la etiqueta del renglón ("oneri"), solo la numeración del formato; el nombre fijo del 17) en las filas vale solo si el .md no
  // trae el 17).
  let escalon17 = false; let fin17 = null; let nota17bis = null; let nota17D = null;
  const finEst = estado.filter((f) => f.lado === 'financiero');
  // El encabezado del 17) se busca en el .md, no en las filas: la extracción a veces no lo trae (Cremonese 2025: "17) interessi e altri oneri
  // finanziari" sin importe, L189) o lo trae sin el número (Torino 2018, L568). Se reconoce por la numeración del formato o por su nombre fijo
  // (art. 2425 del Codice Civile; "17) INTEREST AND OTHER FINANCIAL EXPENSES" en los de Juventus en inglés).
  const RX17 = /(^|\|)\s*(\*\*)?\s*17\s*\)|interessi\s+e(d)?\s+altri\s+oneri\s+finanziari|interest\s+and\s+other\s+financial\s+(expenses|charges)/i;
  const RX17NOMBRE = /interessi\s+e(d)?\s+altri\s+oneri\s+finanziari|interest\s+and\s+other\s+financial\s+(expenses|charges)/i;
  const RX17BIS = /17\s*[-\s]?\s*bis|utili\s+e\s+(\()?perdite\)?\s+su\s+cambi|exchange\s+(gains|differences)/i;
  const lineasMd = (() => { try { return readFileSync(resolve(ROOT, md), 'utf8').split('\n'); } catch { return []; } })();
  const iniC = finEst.length ? Math.min(...finEst.map((f) => f.linea || Infinity)) : null;
  let cab17 = null;
  if (iniC != null && isFinite(iniC)) for (let i = iniC - 1; i < Math.min(lineasMd.length, iniC + 80); i++) if (RX17.test(lineasMd[i] || '')) { cab17 = { linea: i + 1, etiqueta: lineasMd[i].trim().slice(0, 60) }; break; }
  // Si el .md no trae el 17) a la altura de la tabla (Torino 2019: la transcripción dejó las etiquetas como texto arriba,
  // L600-612, y los importes en una tabla sin nombres, L644-650), vale el nombre fijo del renglón que le puso la extracción a la fila del
  // financiero ("Interessi e altri oneri finanziari", L646). Misma compuerta de abajo.
  if (!cab17) { const h = finEst.filter((f) => isFinite(f.linea) && RX17NOMBRE.test(String(f.etiqueta))).sort((a, b) => a.linea - b.linea)[0]; if (h) cab17 = { linea: h.linea, etiqueta: String(h.etiqueta).slice(0, 60), deFilas: true }; }
  if (cab17 && (!E || !E.exacto)) {
    // fin de la sección C: el primer encabezado de D (rettifiche), del 18), del E) del formato viejo o el resultado antes de impuestos en el
    // .md; si no hay, la primera fila de otro lado. El total de C es el último subtotal del financiero antes de ese fin (Torino 2018: la D
    // vino como financiero, L571-572, y su total 0 no es el de C, L570).
    const RXFINC = /rettifiche\s+di\s+valor|(^|\|)\s*(\*\*)?\s*18\s*\)|risultato\s+prima\s+delle\s+imposte|adjustments\s+to\s+(the\s+)?(value|financial)|extraordinary|before\s+tax/i;
    const RXDE = /(^|\|)\s*(\*\*)?\s*[DE]\s*\)/; // D) / E) en mayúscula: "d) oneri diversi" es un renglón del 17)
    let finC = null; for (let i = cab17.linea; i < Math.min(lineasMd.length, cab17.linea + 80); i++) if (RXFINC.test(lineasMd[i] || '') || RXDE.test(lineasMd[i] || '')) { finC = i + 1; break; }
    const finSeccion = finC ?? estado.find((f) => f.linea > cab17.linea && f.lado !== 'financiero')?.linea;
    // El total de C es el último subtotal antes del fin de la sección; si con él la compuerta no cierra, se prueban los
    // anteriores, del último al primero, y vale el primero que cierra. Hace falta cuando el .md no tiene etiquetas y no se sabe dónde termina C
    // (Torino 2019: el último es el 0 de la D, L650; el de C es (108.044), L648). La compuerta es la misma: el total impreso, exacto.
    const candTotC = finEst.filter((f) => f.tipo !== 'renglon' && isFinite(f.M) && f.linea > cab17.linea && (!finSeccion || f.linea < finSeccion)).sort((a, b) => b.linea - a.linea);
    for (const totC of candTotC) {
    let bis = null; for (let i = cab17.linea; i < totC.linea - 1; i++) if (RX17BIS.test(lineasMd[i] || '')) { bis = i + 1; break; }
    {
      const hasta = bis || totC.linea;
      let prop = fin5Todos.map((f) => (f.origen !== 'ajuste manual' && f.linea >= cab17.linea && f.linea < hasta ? { ...f, M: -Math.abs(f.M), origen: 'estado (escalón 17) resta)' } : f));
      const tolC = Math.max(1e-6, 0.5 * [...prop, totC].reduce((a, f) => a + (f.u || 0), 0));
      // si no da el total de C, LAS SUMAS ELIGEN EL SIGNO de las filas del 17-bis (utili suma, perdite resta, pero impreso
      // las dos en positivo; o el 17-bis metido dentro del total del 17): se prueban las combinaciones de signo de esas filas (hasta 4) y se
      // usa la ÚNICA que da exacto el total de C impreso. Casos: Napoli 2024 (L287 a) utili 30, L288 b) perdite 4.559, 17bis impreso (4.529));
      // Atalanta 2019 (L429 "17-bis" 923 dentro de "Totale 17)" 1.027.884). Sin combinación única, como antes.
      // la compuerta de C mira solo las filas de C: si la extracción dejó filas de la D en el financiero (Bologna 2023-24,
      // L1279), quedan después del total de C y no entran en esta suma.
      const sumaC = () => conSigno(prop.filter((f) => !(f.linea > totC.linea)));
      if (bis && Math.abs(sumaC() - totC.M) > tolC) {
        const amb = prop.filter((f) => f.origen !== 'ajuste manual' && f.linea >= bis && f.linea < totC.linea && isFinite(f.M) && f.M);
        if (amb.length >= 1 && amb.length <= 4) {
          const resto = sumaC() - conSigno(amb); const sirven = [];
          for (let m = 0; m < 1 << amb.length; m++) { const v = amb.reduce((a, f, i) => a + ((m >> i) & 1 ? -1 : 1) * Math.abs(f.M), 0); if (Math.abs(resto + v - totC.M) <= tolC) sirven.push(m); }
          if (sirven.length === 1) { const m = sirven[0]; const ids = new Map(amb.map((f, i) => [f, (m >> i) & 1 ? -1 : 1])); prop = prop.map((f) => (ids.has(f) ? { ...f, M: ids.get(f) * Math.abs(f.M), origen: 'estado (escalón 17) resta, 17-bis por las sumas)' } : f)); nota17bis = (`escalón "17) resta": el signo del 17-bis lo eligen las sumas (${amb.map((f) => `L${f.linea} ${ids.get(f) < 0 ? 'resta' : 'suma'}`).join(', ')}): única combinación que da el total de C impreso`); }
        }
      }
      // La D que la extracción dejó en el FINANCIERO (Bologna 2023-24 y 2024-25: "19) svalutazioni, a) di partecipazioni
      // 259.314" impreso en positivo y restado por posición: "Totale delle rettifiche (18-19) (259.314)"). Después del total de C, una fila que cuelga
      // de un 19) resta y una de un 18) suma (el encabezado se busca en el .md, hacia arriba hasta el total de C). COMPUERTA: la suma de esas filas
      // con ese signo da EXACTO el total de D impreso (el último subtotal del financiero antes de salir de la sección). Si no cierra, la D queda como estaba.
      { const dFin = prop.filter((f) => f.origen !== 'ajuste manual' && f.linea > totC.linea && isFinite(f.M) && f.M);
        const salida = estado.find((f) => f.linea > totC.linea && f.lado !== 'financiero')?.linea;
        const dTot = dFin.length ? finEst.filter((f) => f.tipo !== 'renglon' && isFinite(f.M) && f.linea > totC.linea && (!salida || f.linea < salida)).sort((a, b) => a.linea - b.linea).pop() : null;
        if (dTot) {
          const sg = (f) => { for (let i = f.linea - 1; i > totC.linea; i--) { const t = lineasMd[i - 1] || ''; if (/(^|\|)\s*#*\s*(\*\*)?\s*E\s*\)\s*(\*\*)?\s*(PROVENTI E ONERI STRAORDINARI|Proventi e oneri straordinari)/.test(t)) return 0; if (/(^|\|)\s*(\*\*)?\s*19\s*\)?\s+(svalutaz|write)|svalutazion|write-?downs?|impairment/i.test(t)) return -1; if (/(^|\|)\s*(\*\*)?\s*18\s*\)?\s+(rivalutaz|revaluat)|rivalutazion|revaluation/i.test(t)) return 1; } return 0; };
          const ORD = 'estado (escalón 17) resta, D por posición)';
          const conD = prop.map((f) => (dFin.includes(f) ? { ...f, M: sg(f) ? sg(f) * Math.abs(f.M) : f.M, origen: ORD } : f));
          if (Math.abs(conSigno(conD.filter((f) => f.origen === ORD)) - dTot.M) <= Math.max(1e-6, 0.5 * [...dFin, dTot].reduce((a, f) => a + (f.u || 0), 0))) { prop = conD; nota17D = `escalón "17) resta": la D que quedó en el financiero va con el signo de su encabezado (${dFin.map((f) => `L${f.linea} ${sg(f) < 0 ? 'resta' : sg(f) > 0 ? 'suma' : 'como impresa'}`).join(', ')}): su suma da el total de D impreso (L${dTot.linea})`; }
        } }
      // Compuerta: toda la propuesta da el total de C (como siempre) o, si hay filas de D en el financiero, la parte de C lo da y el escalón cambió algo.
      if (Math.abs(conSigno(prop) - totC.M) <= tolC || (Math.abs(sumaC() - totC.M) <= tolC && prop.some((f, i) => f.M !== fin5Todos[i].M))) {
        fin17 = prop;
        for (const n of [0, 1, 2, 3, 4, 5, 6]) {
          const e = evaluar(n, false, fin17); if (e.cierra && e.exacto) { E = e; escalon17 = true; escalonSubRep = false; break; }
          // la escalera completa también acá: después de la 4, la base del escalón "subtotal repetido" (Parma 2018, 2024 y 2025 necesitan los dos)
          if (n === 4 && hayRepetido) { const er = evaluar(4, false, fin17, { ing: ing4r, gas: gas4r }); if (er.cierra && er.exacto) { E = er; escalon17 = true; escalonSubRep = true; break; } }
        }
        break; // la compuerta cerró con este total de C: no se prueban los anteriores
      }
    }
    }
  }
  // ESCALÓN "sección D". Las rettifiche di valore di attività finanziarie (D del Codice
  // Civile: 18) rivalutazioni suma, 19) svalutazioni resta) llegan de la extracción sin lado y la lectura 3 las suma como ingreso o gasto
  // por su signo, o la tolerancia las tapa. Solo corre si el resultado no cerró EXACTO. Propone: las filas sin lado entre la última fila del
  // financiero y "Risultato prima delle imposte" van al financiero; las que cuelgan de un 18) (encabezado buscado en el .md) suman |valor|,
  // las de un 19) restan |valor|, las demás con su signo impreso; salen de los renglones sin lado (no se cuentan dos veces). Compuerta: si el
  // documento imprime el total de D, la suma da exacto ese total; después las lecturas 0-6 con ese financiero (y el del escalón "17) resta"
  // si pasó su compuerta) y gana la primera que cierra EXACTO. Casos: Bologna 2019-20 (L958 "a) di partecipazioni" 1.868.716 bajo "19)
  // svalutazioni", total D (1.868.716) L960), Inter 2024-25 (L976 780.928 bajo "18)"), AC Milan 2017-18 y 2021-22, Como 2024 (L530 (8.695)).
  let escalonD = false; let finD = null;
  // Gatillo: hay filas sin lado en la posición de la D (entre la última fila del financiero y el primer resultado de abajo) y la lectura que
  // ganó no las tiene en el financiero. No alcanza con "no cerró exacto": con las notas en miles la tolerancia exacta (media unidad por
  // fila) tapa una D chica (Como 2024: 8.695 dentro de ~20 mil).
  const finLinD = estado.filter((f) => f.lado === 'financiero' && isFinite(f.linea)).map((f) => f.linea);
  const ultFin = finLinD.length ? Math.max(...finLinD) : null;
  const resD = ultFin ? estado.filter((f) => f.tipo === 'resultado' && f.linea > ultFin).sort((a, b) => a.linea - b.linea)[0] : null;
  // Solo con una sección D del Codice Civile impresa (su encabezado en el .md entre el financiero y el resultado): los IFRS en inglés
  // (Juventus 2015-16 a 2024-25) traen filas sin lado en esa zona que no son la D. Y no si ya hay un ajuste `fila` del financiero en esa zona
  // (la D ya está resuelta a mano: Como 2024 la contaba dos veces).
  // (Chievo 2014-16 e Inter 2023-24) El encabezado también vale con la "D)" y el título en celdas separadas de la tabla (Inter 2023:
  // "| **D)** | **VALUE ADJUSTMENTS ...") y con el "E) Proventi e oneri straordinari" (Chievo: sin D impresa); en la zona, un "21) oneri" resta.
  const RXDHEAD = /(^|\|)\s*#*\s*(\*\*)?\s*D\s*\)\s*(\*\*)?\s*\|?\s*(\*\*)?\s*(RETTIFICHE|Rettifiche|VALUE ADJUSTMENTS|Value adjustments|VALUATION ADJUSTMENTS|Valuation adjustments)|rettifiche\s+di\s+valore|(^|\|)\s*#*\s*(\*\*)?\s*E\s*\)\s*(\*\*)?\s*(PROVENTI E ONERI STRAORDINARI|Proventi e oneri straordinari)/;
  const conSeccionD = resD && lineasMd.slice(ultFin, resD.linea - 1).some((t) => RXDHEAD.test(t || ''));
  const ajusteEnD = resD && ajustesDe(pdf).some((a) => a.campo === 'fila' && a.lado === 'financiero' && [a.linea, a.reemplazaLinea].some((l) => l != null && Number(l) > ultFin && Number(l) <= resD.linea));
  if (resD && conSeccionD && !ajusteEnD) {
    const dRows = otros.filter((f) => f.linea > ultFin && f.linea < resD.linea);
    if (dRows.length) {
      // con una sección E (proventi e oneri straordinari) a continuación de la D, el total a igualar es la SUMA de los totales de D y de E
      // ("TOTALE ... (D)" y "TOTALE ... (E)"); sin E, el último subtotal como siempre. Caso: AC Milan 2008 a 2013 (D y E al final de cada estado).
      const totalesZona = estado.filter((f) => f.lado === 'otro' && f.tipo !== 'renglon' && isFinite(f.M) && f.M && f.linea > ultFin && f.linea < resD.linea).sort((a, b) => a.linea - b.linea);
      const totDE = totalesZona.filter((f) => /\(\s*[DE]\s*\)\s*$/i.test(String(f.etiqueta).trim()));
      const dTot = totDE.length >= 2 ? { ...totDE[totDE.length - 1], M: totDE.reduce((a, f) => a + f.M, 0), combinadoDE: totDE.map((f) => f.linea) } : totalesZona.pop();
      const RX18 = /(^|\|)\s*(\*\*)?\s*18\s*\)?\s+(rivalutaz|revaluat)|rivalutazion|revaluation/i;
      const RX19 = /(^|\|)\s*(\*\*)?\s*19\s*\)?\s+(svalutaz|write)|svalutazion|write-?downs?|impairment/i;
      // la búsqueda hacia arriba se corta en el encabezado de la sección E (proventi e oneri straordinari): sus filas llevan el signo impreso, no el
      // del 19) de la D que queda más arriba. Caso: AC Milan 2008 a 2013 (plusvalenze +40 contadas como −40).
      const RXE = /(^|\|)\s*#*\s*(\*\*)?\s*E\s*\)\s*(\*\*)?\s*(PROVENTI E ONERI STRAORDINARI|Proventi e oneri straordinari)/;
      const RX21 = /(^|\|)\s*#*\s*(\*\*)?\s*21\s*\)\s*(\*\*)?\s*oneri/i; const signoD = (f) => { for (let i = f.linea - 1; i > ultFin; i--) { const t = lineasMd[i - 1] || ''; if (RX21.test(t)) return -1; if (RXE.test(t)) return 0; if (RX19.test(t)) return -1; if (RX18.test(t)) return 1; } return 0; };
      const prop = dRows.map((f) => { const sg = signoD(f); return { ...f, lado: 'financiero', M: sg ? sg * Math.abs(f.M) : f.M, origen: 'estado (escalón sección D)' }; });
      const tolD = Math.max(1e-6, 0.5 * [...prop, ...(dTot ? [dTot] : [])].reduce((a, f) => a + (f.u || 0), 0));
      if (!dTot || Math.abs(conSigno(prop) - dTot.M) <= tolD) {
        finD = [...(fin17 || fin), ...prop]; const excl = new Set(dRows);
        for (const n of [0, 1, 2, 3, 4, 5, 6]) {
          const e = evaluar(n, false, finD, null, excl); if (e.cierra && e.exacto) { E = e; escalonD = true; escalonSubRep = false; break; }
          if (n === 4 && hayRepetido) { const er = evaluar(4, false, finD, { ing: ing4r, gas: gas4r }, excl); if (er.cierra && er.exacto) { E = er; escalonD = true; escalonSubRep = true; break; } }
        }
        if (escalonD) { notas.push(`escalón "sección D": ${prop.length} fila(s) de rettifiche${dTot?.combinadoDE ? ' y straordinari' : ''} (L${prop.map((f) => f.linea).join(', L')}) al financiero${dTot ? `; su suma da el total impreso (${r6(dTot.M)}, L${dTot.combinadoDE ? dTot.combinadoDE.join(' + L') : dTot.linea})` : ''}${fin17 ? ', con el 17) restando' : ''}; cerró la lectura ${E.nivel}`); escalon17 = false; }
      }
    }
  }
  // ESCALÓN "gestión de jugadores neta". En la tabla reclasificada de la relación de gestión
  // (AS Roma 2012-2017) la compraventa de jugadores sale NETA en una fila sin lado ("Gestione operativa netta calciatori") entre el total de
  // costos y el EBITDA, y debajo del resultado vienen otras filas sin lado ("Risultato di terzi", "Utili/perdite attuariali", otro resultado
  // integral) que la lectura 6 también suma. Solo corre si ninguna lectura cerró. Propone: de las filas sin lado, SOLO las que están entre el
  // total de costos y el "resultado antes de impuestos" (ese es el lugar de la gestión de jugadores); las demás salen. Compuerta: las lecturas
  // 0-6 con esa selección y gana la primera que cierra el resultado EXACTO. Un valor positivo entra como ingreso y uno negativo como gasto
  // (la misma convención de signos de la lectura 6). Caso: Roma 2015 (.md L1932-L1957): 180.626 + 27.651 − 196.660 − 40.215 − 820 − 7.800
  // − 3.846 = −41.064 exacto; sumando también el "Risultato di terzi" (+102) y las "perdite attuariali" (−147) no cierra.
  let escalonVentanaOtros = false;
  if (!E) {
    const totCostos = estado.filter((f) => f.tipo === 'total' && f.lado === 'gasto' && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0];
    const antesFila = estado.filter((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.linea)).sort((a, b) => a.linea - b.linea)[0];
    if (totCostos && antesFila && antesFila.linea > totCostos.linea) {
      const dentro = otros.filter((f) => f.linea > totCostos.linea && f.linea < antesFila.linea);
      const fuera = otros.filter((f) => !dentro.includes(f));
      if (dentro.length && fuera.length) {
        const excl = new Set(fuera);
        for (const n of [0, 1, 2, 3, 4, 5, 6]) {
          const e = evaluar(n, false, null, null, excl); if (e.cierra && e.exacto) { E = e; escalonVentanaOtros = true; escalonSubRep = false; break; }
        }
        if (escalonVentanaOtros) notas.push(`escalón "gestión de jugadores neta": de las filas sin lado, solo las de L${dentro.map((f) => f.linea).join(', L')} (entre el total de costos L${totCostos.linea} y "${antesFila.etiqueta.trim().slice(0, 40)}" L${antesFila.linea}); las ${fuera.length} de abajo salen; cerró la lectura ${E.nivel}`);
      }
    }
  }
  // ESCALÓN "renglón grande sin abrir". La nota del subtotal solo
  // corría en el camino de error (la propuesta de carga marcó una categoría en 0), y un lump_* apaga esa marca: un renglón agregado del
  // modelo italiano ("altri" 42,8 M, el 74% de los ingresos de Cremonese 2024) quedaba entero aunque el documento traiga su desglose.
  // Solo corre si la lectura que ganó deja un renglón de ingresos del estado de 20% o más del total. Propone: la MISMA lectura con la nota
  // del subtotal abierta del lado de los ingresos. Compuerta: esa lectura cierra igual (exacto si antes era exacto) y el renglón grande se
  // abrió. No depende de la categorización. Casos: Cremonese 2022 y 2024 (hoy abiertas por el camino de error), Sassuolo 2021 y 2024,
  // Sampdoria 2018 (abiertos por el reintento pago). No toca Atalanta 2024 ni Parma 2023: su estado ya viene desglosado (ningún renglón
  // llega al 20%) o su nota no suma el subtotal.
  let escalonGrande = false;
  if (E && E.cierra && E.nivel <= 4 && !escalonFinBloque && !ladosCero.has('ingreso')) {
    const totIng = E.ing.reduce((a, f) => a + Math.abs(f.M || 0), 0);
    const grande = totIng ? E.ing.find((f) => String(f.origen || '').startsWith('estado') && Math.abs(f.M || 0) >= 0.2 * totIng) : null;
    if (grande) {
      forzarNotaSub = true; totIngForz = totIng; let ingF; let gasF;
      try {
        if (E.nivel >= 4) { ingF = lineasDeLado('ingreso', 'M', true, true, escalonSubRep); gasF = lineasDeLado('gasto', 'M', true, true, escalonSubRep); aplicarAjustesFila(ingF, gasF, false, escalonSignoDoc ? 'estado' : true); }
        else if (E.nivel === 3 && otros.length) { ingF = lineasDeLado('ingreso', 'M', true); gasF = lineasDeLado('gasto', 'M', true); aplicarAjustesFila(ingF, gasF, false); }
        else { ingF = lineasDeLado('ingreso'); gasF = lineasDeLado('gasto'); aplicarAjustesFila(ingF, gasF, false); }
      } finally { forzarNotaSub = false; }
      const abrio = !ingF.some((f) => f.linea === grande.linea && String(f.origen || '').startsWith('estado'));
      if (abrio) {
        const e = evaluar(E.nivel, false, escalonD ? finD : escalon17 ? fin17 : null, { ing: ingF, gas: gasF }, escalonD ? new Set(finD.filter((f) => f.origen === 'estado (escalón sección D)').map((f) => otros.find((o) => o.linea === f.linea)).filter(Boolean)) : null);
        if (e.cierra && (e.exacto || !E.exacto)) { E = e; escalonGrande = true; notaSubtotalLados.add('ingreso'); notas.push(...notasNotaSub, `escalón "renglón grande sin abrir": "${grande.etiqueta}" (L${grande.linea}) era el ${Math.round(100 * Math.abs(grande.M) / totIng)}% de los ingresos; la misma lectura cierra con la nota del subtotal abierta`); }
      }
    }
  }
  // ESCALÓN "FINANCIERO DENTRO DE UN SUBTOTAL" (patrón C; el último: solo si ninguna lectura ni ningún escalón cerró). Un subtotal de
  // ingresos o de gastos que es la suma de los renglones de abajo con una fila del financiero adentro no se cuenta (cada parte está en su
  // lado), esa fila del financiero toma el signo de su bloque, y como los totales impresos mezclan lados, la compuerta es el resultado impreso
  // EXACTO (como en la lectura 5). Caso: Avaí 2021 sin sus ajustes a mano: cierra exacto con lo mismo que dejaron los ajustes. Más arriba en
  // la escalera (dentro del "subtotal repetido") le ganaba a la lectura 5 en Ferroviária 2012 y le cambiaba el signo del financiero.
  if (!E && finBloque) { const ec = evaluar(4, false, finBloque, { ing: ing4c, gas: gas4c, sinTotales: true }); if (ec.cierra && ec.exacto) { E = ec; escalonFinBloque = true; } }
  // ESCALÓN "ACUMULADOS" (el último: solo si nada cerró). Los totales (A)-(G) del POC no se cuentan y el financiero toma el
  // signo de su lado (ver lineasDeLado). Como los totales impresos acumulan lados, la compuerta es el resultado impreso EXACTO.
  if (!E && finAcum) { let ea = evaluar(4, false, finAcum, { ing: ing4a, gas: gas4a, sinTotales: true }); let sinOtros = false; if (!(ea.cierra && ea.exacto) && otros.length) { ea = evaluar(4, false, finAcum, { ing: ing4a, gas: gas4a, sinTotales: true }, new Set(otros)); sinOtros = true; } if (ea.cierra && ea.exacto) { E = ea; escalonAcum = sinOtros ? 'sin-otros' : true; } }
  // ESCALÓN "OTROS CON EL SIGNO DEL RESULTADO" (después de "acumulados"): una fila sin lado cuyo rótulo es neto, "(Custos)/Proveitos
  // com transacções de passes de jogadores", se imprime con el signo del RESULTADO (negativo = costo) y no con el de los gastos; y el total
  // de costos impreso excluye la amortización de pases, así que no es compuerta. Compuerta: resultado impreso EXACTO.
  let escalonOtrosRes = false;
  if (!E && otros.length) { const eo = evaluar(4, false, null, { ing: ing4, gas: gas4, sinTotales: true, otrosResultado: true }); if (eo.cierra && eo.exacto) { E = eo; escalonOtrosRes = true; } }
  const sinNumero = !E && E0.ch.every((c) => c.ok === null) && !filaAntes;
  if (!E) E = E0;
  let ing = E.ing; let gas = E.gas; chequeos.push(...E.ch);
  // LA NOTA EXACTA TAMBIÉN EN LAS LECTURAS 5 Y 6. Esas lecturas (pensadas para los
  // balancetes) leen solo los renglones del estado y nunca abren notas. Si cerraron el resultado, un renglón se reemplaza igual por las filas
  // de la nota que extraer.mjs marcó como su desglose (detalla_a) cuando esas filas suman el renglón AL CENTAVO (cerrarNota() y además
  // diferencia cero: con la media unidad por fila de cerrarNota, el redondeo corría los totales de 42 documentos). Totales y resultado no
  // cambian; solo el detalle. Medido: 22 documentos ganan detalle (Roma 2006-2022, AC Milan, Avaí, Ferroviária, Remo, Vila Nova, AEK
  // 2022-2025), 0 con totales distintos; los ya cargados no cambian hasta que se recarguen. Caso:
  // AEK 2023, "Αμοιβές ποδοσφαιρικού και λοιπές δαπάνες" 25.364.542 (L481) = Μισθοδοσία 10.744.231 + Αποσβέσεις συμβολαίων ποδοσφαιριστών
  // 14.620.311 (nota 6.19, L1462-1463): la nómina y la amortización de pases dejan de cargarse juntas como salarios, como en 2016-2021.
  if (E.cierra && E.nivel >= 5) {
    const abrirExacta = (arr) => arr.flatMap((f) => {
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === String(f.etiqueta).trim());
      const c = hijas.length >= 2 ? cerrarNota(Math.abs(f.M || 0), hijas, 'M', f.u || 0) : null;
      if (!c) return [f];
      // al centavo; o a UNA unidad impresa como máximo, con la diferencia como fila
      // "Diferencia de redondeo" para que los totales no cambien. Caso: AEK 2024, 16.703.249 + 19.075.580 = 35.778.829 contra 35.778.830.
      const dif = Math.abs(f.M || 0) - c.hojas.reduce((t, h) => t + h.valorNota, 0);
      if (Math.abs(dif) > 1e-9 && Math.abs(dif) > (f.u || 0) + 1e-12) return [f];
      if (Math.abs(dif) > 1e-9) c.hojas.push({ etiqueta: 'Diferencia de redondeo', lado: f.lado, valorNota: dif, linea: f.linea, bloque: f.bloque, tipo: 'renglon', origen: 'redondeo' });
      notas.push(`escalón "nota exacta en la lectura ${E.nivel}": "${f.etiqueta}" (L${f.linea}) se abre en las ${c.hojas.length} filas de su nota, que suman exacto el renglón`);
      return c.hojas.map((h) => ({ ...h, M: h.valorNota * (f.M < 0 ? -1 : 1), lado: f.lado, origen: `nota que desglosa "${f.etiqueta}"` }));
    });
    ing = abrirExacta(ing); gas = abrirExacta(gas);
  }
  if (resCerca) notas.push(`resultado impreso fuera de los bloques (escalón 2): "${resCerca.texto}" (L${resCerca.linea}); ${E.okRes ? 'cierra exacto' : 'no cierra exacto: no se usa para confirmar'}`);
  if (escalonSubRep) notas.push(...notasSubRep, 'escalón "subtotal repetido": cerró la lectura 4 sin contar dos veces el subtotal que repite el renglón de arriba');
  if (escalonD) fin.splice(0, fin.length, ...finD);
  if (escalonFinBloque) { fin.splice(0, fin.length, ...finBloque); notas.push(...notasFinBloque, 'escalón "financiero dentro de un subtotal": cerró el resultado exacto (los totales impresos mezclan lados)'); }
  if (escalonOtrosRes) notas.push('escalón "otros con el signo del resultado": las filas sin lado (rótulo neto "(Custos)/Proveitos ...") se leen con el signo del resultado (negativo = costo) y el total de costos impreso no es compuerta; cerró el resultado impreso exacto (to-do 237 q)');
  if (escalonAcum) { fin.splice(0, fin.length, ...finAcum); notas.push(...notasAcum, `escalón "acumulados": cerró el resultado exacto sin contar los totales que acumulan el anterior${escalonAcum === 'sin-otros' ? ' ni las filas sin lado (sin-otros)' : ''} (to-do 237 q)`); }
  if ((escalon17 || escalonD) && nota17bis) notas.push(nota17bis);
  if (escalon17 && nota17D) notas.push(nota17D);
  if (escalon17) { fin.splice(0, fin.length, ...fin17); notas.push(`escalón "17) resta": el financiero con el 17) restando da el total de C impreso; cerró la lectura ${E.nivel}`); }
  else if (E.cierra && E.nivel >= 5) fin.splice(0, fin.length, ...(escalonAjFin ? fin5Todos : fin5));
  if (escalonAjFin) notas.push('escalón "ajustes del financiero sin reemplaza": ninguna lectura cerraba el resultado; cerró la lectura 5 con todos los ajustes del financiero'); // lectura 5: el financiero también con el signo C/D
  let okRes = E.okRes; let lectura = E.lect; const res = E.objetivo ?? resFinal;
  if (E.cierra && E.nivel > 0) { chequeos.push({ nombre: 'lectura', ok: true, detalle: `cerró con la lectura ${E.nivel} (${NOMBRES_LECTURA.slice(1, E.nivel + 1).join(' + ')})` }); notas.push(`la lectura base no cerraba; cerró con la lectura ${E.nivel}`); }
  if (sinNumero) chequeos.push({ nombre: 'número impreso para cerrar', ok: false, detalle: 'el documento no imprime totales ni resultado en los bloques elegidos: no hay cómo confirmar las sumas' });

  // AJUSTES MANUALES: el escalón 0 de cada escalera. Una decisión de Guido
  // atada al documento y al campo, no al texto de una pregunta de la cola.
  // resultado-final: el resultado del ejercicio impreso que fijó Guido. El IMPUESTO pasa a ser la diferencia con el resultado antes de
  // impuestos (el impreso si la lectura 1 cerró; si no, el de las filas: ingresos − gastos ± financiero como impreso), con la convención
  // del escalón "restado" (Fortaleza 2024-2025). Los chequeos de resultado que no cerraban quedan aceptados por el ajuste, con su detalle.
  // Casos: Fortaleza CEIF 2023 (el impuesto contable no es el "a cargo") y 2017 (el documento no imprime el impuesto).
  const ajustes = ajustesDe(pdf);
  const ajRes = ajusteDe(pdf, 'resultado-final');
  let forzado = null;
  if (ajRes && isFinite(parseNumber(ajRes.valor))) {
    const finalM = parseNumber(ajRes.valor) * mult(filaAntes?.bloque ?? estado[0]?.bloque);
    const cerroAntes = E.cierra && E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok);
    const antes = cerroAntes ? E.objetivo : suma(ing) - suma(gas) + conSigno(fin);
    const impImpreso = conSigno(imp);
    imp.splice(0, imp.length, { ...(imp[0] || {}), etiqueta: `${imp[0]?.etiqueta || 'Impuesto'} (deducido: antes de impuestos − resultado final, por ajuste manual)`, M: antes - finalM, lado: 'impuesto', tipo: 'renglon' });
    for (const c of chequeos) if (/^resultado|^número impreso/.test(c.nombre) && c.ok === false) { c.ok = true; c.detalle += ` → aceptado por ajuste manual (resultado final ${ajRes.valor})`; }
    okRes = true;
    forzado = { final: finalM, antes, impImpreso };
    chequeos.push({ nombre: 'resultado final', ok: true, detalle: `${r6(finalM)} por ajuste manual (${ajRes.valor}: ${ajRes.motivo}); impuesto deducido ${r6(antes - finalM)} (antes de impuestos ${r6(antes)}; el documento imprimía ${r6(impImpreso)})` });
    notas.push(`ajuste manual: resultado final ${ajRes.valor} (${ajRes.fecha}, ${ajRes.motivo})`);
  }

  // 1. números no confirmados contra el PDF: la aritmética los confirma si todo cerró; si no, se prueba con lo que leyó la segunda fuente
  const cerro = okRes === true || chequeos.filter((c) => c.nombre.startsWith('total')).some((c) => c.ok === true);
  const usadas = [...ing, ...gas, ...fin, ...imp];
  const confirmadosAManoZ = ajustesDe(pdf).filter((a) => a.campo === 'confirmado');
  for (const nc of V?.noConfirmados || []) {
    // un número confirmado a mano (ajuste `confirmado`, misma línea y mismo valor: la compuerta de avisarRegistro) no vuelve a
    // la cola como "número no confirmado" (Santa Clara 2024-25, L1542 "40 646").
    if (confirmadosAManoZ.some((a) => Number(a.linea) === Number(nc.linea) && String(a.valor).trim() === String(nc.numero).trim())) continue;
    const fila = usadas.find((f) => f.linea === nc.linea && normNum(String(f.actual || '')).includes(normNum(nc.numero)));
    if (!fila) continue; // número de otra columna o de una fila que no se usa
    // con la etapa 6 cerrada, LAS SUMAS ELIGEN ENTRE LAS DOS LECTURAS: el número de
    // una fila que se carga queda confirmado si el resultado cierra con él y deja de cerrar con el de la segunda lectura (misma compuerta del
    // resultado: exacta si la lectura cerró exacto, la tolerancia de siempre si no). Sin segunda lectura con un número parecido, solo un cierre
    // EXACTO lo confirma. Si las dos lecturas cierran (o no hay con qué distinguir), va a la cola como pregunta en vez de frenar en silencio.
    // Caso: Torino 2023, L493 "e) proventi da cessione diritti audiovisivi": transcripción 52.376.963 (resultado a 684 EUR del impreso),
    // segunda lectura 52.176.963 (a 200 mil): las sumas eligen la transcripción.
    if (cerro) {
      const alt = nc.segundaLeyo != null ? parseNumber(String(nc.segundaLeyo)) : null; const actualN = parseNumber(String(nc.numero));
      let confirma = false; let porque = '';
      const objetivo = E.objetivo; const conImpR = !chequeos.some((c) => c.nombre === 'resultado antes de impuestos');
      if (objetivo != null && isFinite(objetivo) && alt != null && isFinite(alt) && isFinite(actualN) && alt !== actualN) {
        const sf = /por rótulo/.test(String(lectura)) ? 1 : (/financiero e impuesto invertidos|financiero invertido/.test(String(lectura)) ? -1 : 1); const si = siSegun(lectura);
        const pat = suma(ing) - suma(gas) + finSegun(lectura, fin) + (conImpR ? si * conSigno(imp) : 0);
        const dM = Math.sign(fila.M || 1) * (Math.abs(alt) - Math.abs(actualN)) * mult(fila.bloque);
        const efecto = ing.includes(fila) ? dM : gas.includes(fila) ? -dM : fin.includes(fila) ? sf * dM : imp.includes(fila) && conImpR ? si * dM : 0;
        const tolR = Math.max(1e-6, 0.5 * [...ing, ...gas, ...fin].reduce((a, f) => a + (f.u || 0), 0));
        const cierraCon = (x) => (objetivo < 0 ? (E.exacto ? Math.abs(x - objetivo) <= tolR : cerca(x, objetivo)) : (E.exacto ? Math.abs(Math.abs(x) - Math.abs(objetivo)) <= tolR : cerca(Math.abs(x), Math.abs(objetivo)))); // como cierraRes
        if (efecto && cierraCon(pat) && !cierraCon(pat + efecto)) { confirma = true; porque = `con la segunda lectura (${nc.segundaLeyo}) el resultado daría ${r6(pat + efecto)} y no cierra`; }
      } else if (alt == null && E.exacto) { confirma = true; porque = 'sin segunda lectura parecida, y el resultado cierra exacto con él'; }
      if (confirma) { confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero }); notas.push(`línea ${nc.linea}: ${nc.numero} no está en el ${V.modo === 'digital' ? 'texto del PDF' : 'segunda lectura'}; las sumas lo confirman (${porque})`); continue; }
      const r2 = caso('numero-no-confirmado', `${nc.linea}:${nc.numero}`, `En "${fila.etiqueta}" la transcripción dice ${nc.numero}${nc.segundaLeyo ? ` y la segunda lectura del PDF dice ${nc.segundaLeyo}` : ' y no se pudo confirmar contra el PDF'}. Las sumas cierran, pero no alcanzan para elegir: ${nc.segundaLeyo ? 'con los dos números el resultado cierra' : 'no hay otra lectura y el cierre no es exacto'}. ¿El PDF dice ${nc.numero}?`, { pagina: nc.pagina, lineas: [nc.linea, nc.linea], propuesta: 'sí' });
      if (r2?.decision === 'aceptar') confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero });
      else if (r2?.decision === 'corregir' && r2.valor) { fila.M = (parseNumber(r2.valor) ?? fila.M / mult(fila.bloque)) * mult(fila.bloque); confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero }); notas.push(`línea ${nc.linea}: valor corregido por Guido (${r2.valor})`); }
      continue;
    }
    const r = caso('numero-no-confirmado', `${nc.linea}:${nc.numero}`, `En "${fila.etiqueta}" la transcripción dice ${nc.numero}${nc.segundaLeyo ? ` y la segunda lectura del PDF dice ${nc.segundaLeyo}` : ` y no se pudo confirmar contra el PDF${nc.sinSegunda ? ' (sin segunda lectura de esa página)' : ''}`}. Las sumas no cierran.`, { pagina: nc.pagina, lineas: [nc.linea, nc.linea], propuesta: nc.segundaLeyo ? `usar ${nc.segundaLeyo}` : null });
    // (frenado de Molde FLI 2016 y 2024) un número cuya pregunta se contestó con un valor (`corregir`) quedó confirmado contra el PDF igual que con `aceptar`: sin esto
    // avisarRegistro() lo seguía contando como sin confirmar y el registro no pasaba a listo-para-jev.
    if (r?.decision === 'corregir' && r.valor) { fila.M = (parseNumber(r.valor) ?? fila.M / mult(fila.bloque)) * mult(fila.bloque); confirmadosPorSumas.push({ linea: nc.linea, numero: nc.numero }); notas.push(`línea ${nc.linea}: valor corregido por Guido (${r.valor})`); }
  }

  // 4. año anterior: la columna comparativa contra lo ya cargado
  const prev = cd && year ? year - 1 : null; const metaPrev = prev ? cd.fiscalYearMeta?.[prev] : null;
  if (metaPrev) {
    // la columna del año anterior se lee con LA MISMA LECTURA con la que cerró este año: si cerró con la lectura 3, los
    // renglones sin lado entran por su signo (y los subtotales se leen con ellos). Caso: Goiás 2024, la columna 2023 sumaba 89.972.753
    // (sin "Outras Receitas e Despesas" 140.214.785) y el sitio tiene 230.187.538 (cargado con la lectura 3): falsa alarma.
    const otrosA = E.nivel >= 3 ? otros.filter((f) => isFinite(f.A) && f.A && (escalonOtrosRes ? f.A > 0 : gastosNeg ? f.A > 0 : f.A < 0)).map((f) => ({ ...f, A: Math.abs(f.A) })) : [];
    const ingA = E.nivel >= 5 ? ingresosConLectura({ estado, lineasDeLado }, 'A', E.nivel, false, escalonVentanaOtros) : E.nivel >= 3 ? [...lineasDeLado('ingreso', 'A', true, E.nivel >= 4, (escalonSubRep || escalonAcum) && E.nivel === 4, false, escalonAcum && E.nivel === 4), ...(escalonAcum === 'sin-otros' && E.nivel === 4 ? [] : otrosA)] : lineasDeLado('ingreso', 'A'); let sA = suma(ingA, 'A'); // la lectura 5 también acá
    const prodI = (cd.revenueLinesByYear?.[prev] || []).reduce((a, l) => a + l.amountNative, 0);
    // Una GANANCIA extraordinaria que un ajuste `categoria` sacó de los ingresos del año anterior (exceptional_items en positivo) también
    // cuenta: el documento la sigue sumando como ingreso. Caso: Goiás 2024 contra 2023 (venta del 20% de la Liga Forte União, 140.214.785).
    const extraPrev = (cd.expenseLinesByYear?.[prev] || []).filter((l) => l.normalizedCategory === 'exceptional_items' && l.amountNative > 0).reduce((a, l) => a + l.amountNative, 0);
    // COMPUERTA (la misma del año vecino): si ninguna fila trae la columna del año anterior, no se puede comparar. Caso:
    // Novorizontino 2023 (su extracción no trajo la columna 2022): sumaba 0 contra los 30.003.234 de 2022 ya cargados.
    const sinColA = !estado.some((f) => f.lado === 'ingreso' && f.A != null && isFinite(f.A) && f.A);
    let okA = sinColA ? null : prodI ? (cerca(sA, prodI, 0.02) || (extraPrev > 0 && cerca(sA, prodI + extraPrev, 0.02))) : null;
    // escalón 1: si la columna cruda no coincide, con los ajustes `fila` que solo sacan una fila (la columna anterior no tiene otros).
    if (okA === false) { const sA1 = suma(ingresosConAjustes({ estado, mult }, pdf, ingA, 'A'), 'A'); if (cerca(sA1, prodI, 0.02) || (extraPrev > 0 && cerca(sA1, prodI + extraPrev, 0.02))) { okA = true; sA = sA1; } }
    // escalón 2: la columna anterior con las mismas filas que cerraron la actual (ver colConFilas)
    if (okA === false) { const sA2 = colConFilas(E.ing, (f) => f); if (sA2 != null && (cerca(sA2, prodI, 0.02) || (extraPrev > 0 && cerca(sA2, prodI + extraPrev, 0.02)))) { okA = true; sA = sA2; } }
    chequeos.push({ nombre: 'año anterior cargado', ok: okA, detalle: sinColA ? `no se puede comparar: este documento no trae la columna ${prev}` : prodI ? `la columna ${prev} de este documento suma ingresos ${r6(sA)}; el sitio tiene ${r6(prodI)}` : `el sitio tiene ${prev} sin líneas de ingresos` });
    if (okA === false) caso('anio-anterior', String(prev), `La columna del año anterior (${prev}) de este documento suma ingresos ${r6(sA)} y el sitio tiene ${r6(prodI)} para ese año. Puede ser: otra tabla u otro perímetro (revisar el documento), otra escala, o un error del año ya cargado (revisar producción).`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  }
  // 4b. AÑO VECINO EN OTRO DOCUMENTO (agregado al medir: de los 159 años nuevos de clubes existentes solo 2 tienen el año
  // anterior cargado, porque casi todos son años VIEJOS que completan la serie hacia atrás; pero 101 tienen, en la misma carpeta y ya
  // transcripto, el documento del AÑO SIGUIENTE, cuya columna "año anterior" es este año). Si ese documento (o el del año anterior) ya pasó
  // por extraer.mjs, sus columnas se comparan con las de este. Por eso conviene procesar años CONSECUTIVOS del mismo club en el mismo lote.
  const vecinos = [];
  // (el documento vecino y su escala: vecinoDe(), arriba, junto a la escalera de escala)
  for (const [dy, v] of vecinosDoc) {
    const { otro } = v;
    const { mio, suyo, ok, sinColumna, otroRegimen, paridad, codigosNBB } = compararVecino(dy, v, kEsc, E.nivel, escalonSubRep, escalonVentanaOtros, E.ing, escalonAcum || (escalonOtrosRes ? 'otros-resultado' : false));
    vecinos.push(ok);
    if (otroRegimen) { chequeos.push({ nombre: `documento del año ${year + dy}`, ok: null, detalle: `no se puede comparar: uno de los dos cuenta la gestión de jugadores neta como ingreso y el otro no` }); continue; }
    if (sinColumna) { chequeos.push({ nombre: `documento del año ${year + dy}`, ok: null, detalle: `no se puede comparar: ${dy === 1 ? otro.pdf.split('/').pop() : 'este documento'} no trae la columna del año anterior` }); continue; }
    if (codigosNBB) { chequeos.push({ nombre: `documento del año ${year + dy}`, ok, detalle: `códigos NBB del año ${dy === 1 ? year : year - 1} iguales en este documento y en ${otro.pdf.split('/').pop()} (${codigosNBB.join(', ')}); los ingresos se presentan distinto (${r6(dy === 1 ? mio : suyo)} y ${r6(dy === 1 ? suyo : mio)})` }); continue; }
    chequeos.push({ nombre: `documento del año ${year + dy}`, ok, detalle: `${paridad ? `en euros, con la paridad fija de ${paridad} (1 EUR = ${EURO_FIJO[paridad]}): ` : ''}ingresos de ${dy === 1 ? year : year - 1}: ${r6(dy === 1 ? mio : suyo)} en ${dy === 1 ? 'este documento' : otro.pdf.split('/').pop()} y ${r6(dy === 1 ? suyo : mio)} en ${dy === 1 ? otro.pdf.split('/').pop() : 'este documento'} (columna del año anterior)` });
    // PRESENTACIÓN DISTINTA: la diferencia es exactamente UNA fila de GASTO (no un total) de
    // uno de los dos documentos: uno la presenta y el otro la netea. Casos: Olympiacos 2020 (82,46 M bruto) contra la columna anterior de 2021
    // (74,81 M neto): "Δαπάνες πώλησης/λύσεις συμβολαίων ποδοσφαιριστών" 7.645.064,67; Cuiabá 2022 y 2023, "(-) Deduções das receitas" (bruto
    // contra neto). Medido sobre los 112 casos de año vecino de la cola: 5 aciertos, 0 errores; con "una fila cualquiera" entraban 3 descartados
    // (UC 2009, Juventus 2005 x2) por coincidir con una fila de TOTAL. Se lee como en la medición: las cifras tal cual de los dos .filas.json, en
    // unidades, miles o millones.
    if (ok === false) {
      const dif = Math.abs(mio - suyo); const TOT = /^\s*(?:total|totale|σύνολο|συνολο|subtotal|sub-total|ingresos de actividades|receita l)/i;
      const filasDoc = (m) => { try { return JSON.parse(readFileSync(resolve(ROOT, derivado(m, '.filas.json', { crear: false })), 'utf8')).filas || []; } catch { return []; } };
      const neteada = dif > 0 && [...filasDoc(md), ...filasDoc(otro.md)].filter((f) => f.lado === 'gasto' && !TOT.test(f.etiqueta || ''))
        .flatMap((f) => [f.actual, f.anterior].map((x) => ({ f, v: Math.abs(parseNumber(x) ?? 0) }))).find(({ v }) => v && [1e6, 1e3, 1].some((e) => Math.abs(v / e - dif) <= Math.max(2e-6, dif * 1e-7)));
      if (neteada) { chequeos[chequeos.length - 1] = { ...chequeos[chequeos.length - 1], ok: null, detalle: `presentación distinta: ingresos de ${dy === 1 ? year : year - 1} ${r6(mio)} y ${r6(suyo)}; la diferencia es exactamente "${neteada.f.etiqueta}" (${neteada.f.lado}, ${neteada.f.actual}), que uno de los dos documentos netea` }; vecinos[vecinos.length - 1] = null; continue; }
    }
    // PERÍMETROS DISTINTOS: si no coinciden y los dos documentos tienen perímetro fijado (ajuste del
    // documento o del club) distinto, la columna del año anterior es de otro perímetro: no se puede comparar (como `otroRegimen`). Solo
    // baja una comparación que FALLA; una que coincide sigue valiendo (Roma 2005, Benfica 2005-06). Casos: FCI Levadia 2020 (la MTÜ sola,
    // 786.551) contra la columna del consolidado 2021 (1.073.554), 15 casos estonios todos aceptados; Benfica 2018-19 y Aris 2021.
    if (ok === false) {
      const perMio = ajustePerimetroDe(pdf)?.valor; const perOtro = ajustePerimetroDe(otro.pdf)?.valor;
      if (perMio && perOtro && perMio !== perOtro) { chequeos[chequeos.length - 1] = { ...chequeos[chequeos.length - 1], ok: null, detalle: `no se puede comparar: perímetros distintos (este documento ${perMio}, ${otro.pdf.split('/').pop()} ${perOtro}); ingresos ${r6(mio)} y ${r6(suyo)}` }; vecinos[vecinos.length - 1] = null; continue; }
    }
    if (ok === false) caso('anio-vecino', String(year + dy), `Los ingresos de ${dy === 1 ? year : year - 1} no coinciden entre este documento y ${otro.pdf.split('/').pop()} (${r6(mio)} contra ${r6(suyo)}). Puede ser una reexpresión del año en el documento siguiente (pasa), otra tabla u otro perímetro.`, { pagina: estado[0]?.pagina });
  }
  let primerAnio = null; // el pedido a Claude y su estado, para tools/primer-anio-ia.mjs
  let primerAnio214 = null; // hace falta el caso "primer año" salvo que lo confirme el escalón 3 (se decide abajo)
  // El escalón 3 del primer año: arma el pedido con las líneas del estado y lo que se carga, y aplica la compuerta si la respuesta está guardada.
  // `filas`: lo que se carga, con los signos de la carga (financiero e impuesto como su efecto en el resultado): se arma abajo, junto al
  // .verificacion.json, porque esos signos salen de la lectura que cerró el resultado.
  const escalon3_214 = (filas) => {
    const ped = pedidoPrimerAnio(readFileSync(resolve(ROOT, md), 'utf8'), estado, filas);
    if (!ped) return null;
    const datos = respuestaGuardada(md, ped.clave); const g = datos ? compuertaPrimerAnio(datos, ped) : null;
    primerAnio = { escalon: 3, estado: !datos ? 'pendiente' : g.ok ? 'confirmado' : 'alarma', clave: ped.clave, rango: ped.rango, lineasCargadas: ped.lineasCargadas, user: ped.user, ...(g && !g.ok ? { problemas: g.problemas } : {}) };
    return g;
  };
  if (!metaPrev) {
    chequeos.push({ nombre: 'año anterior cargado', ok: null, detalle: prev ? `el sitio no tiene ${prev}: este chequeo no se puede hacer` : 'club nuevo' });
    // (escalón 1, aprobado por Guido: "no quiero revisar yo el primer año del club") Lo que pedía el caso es mirar
    // que ingresos, gastos y resultado coincidan con lo impreso. Si el documento imprime los TRES y lo que se carga (las filas finales,
    // después de los ajustes) da cada uno a 0,01% o menos (los redondeos de las notas en miles; la tolerancia de siempre, `cerca`, deja pasar
    // hasta 1% en un club chico: Novorizontino 2010, gastos 163.946 contra 165.637), el caso no hace falta. Si falta alguno impreso o uno no
    // da, a la cola como antes. Medido sobre los 115 "primer-anio" que pasaron por la cola: ninguno terminó en una corrección; cierra 24 de
    // los 77 aceptados (Parma 2018: ingresos 11.457.715 contra 11.457.714, gastos 33.744.261 contra 33.744.262) y ninguno de los 2 descartados.
    const REL214 = 1e-4;
    const tot214 = (n, final) => { const c = chequeos.find((x) => x.nombre === `total de ${n}`); return c?.ok === true && c.impreso != null && Math.abs(final - c.impreso) <= REL214 * Math.abs(c.impreso) ? c.impreso : null; };
    const ti214 = tot214('ingresos', suma(ing)); const tg214 = tot214('gastos', suma(gas));
    const res214 = chequeos.find((x) => x.nombre === 'resultado del ejercicio');
    const resOk214 = (base) => res214?.ok === true && res214.dif != null && res214.dif <= REL214 * Math.abs(base);
    const imprime3 = ti214 != null && tg214 != null && resOk214(ti214);
    // imprime UN total y el resultado, los dos a 0,01%, y el otro total NO está
    // impreso: ese otro queda determinado por la cuenta. Solo la suma directa (`suma`/`impreso`), no las variantes interpretadas (un renglón
    // como total, deducciones aparte). Medido: 7 más de los 77 aceptados (Volos 2024: ingresos 5.872.569 = impreso, sin total de gastos,
    // resultado 383.182,45 exacto), ninguno de los 2 descartados.
    const sinImp214 = (n) => { const c = chequeos.find((x) => x.nombre === `total de ${n}`); return c?.ok === null && /no lo imprime/.test(c.detalle || ''); };
    const imprime1 = !imprime3 && ((ti214 != null && sinImp214('gastos') && resOk214(ti214)) || (tg214 != null && sinImp214('ingresos') && resOk214(tg214)));
    if (imprime3) chequeos.push({ nombre: 'primer año', ok: true, detalle: 'ingresos, gastos y resultado coinciden con lo impreso a 0,01% o menos: no hace falta la revisión del primer año (to-do 214)' });
    if (imprime1) chequeos.push({ nombre: 'primer año', ok: true, detalle: `${ti214 != null ? 'ingresos' : 'gastos'} y resultado coinciden con lo impreso a 0,01% o menos y el otro total no está impreso (queda determinado): no hace falta la revisión del primer año (to-do 214, escalón 2)` });
    // SOLO EL RESULTADO coincide a 0,01% (de los ingresos): con el resultado exacto,
    // lo único que se escapa es un error que se compensa (la misma cifra en los dos lados, una fila que falta de un lado y sobra del otro).
    // Se le pregunta a Claude con las líneas del estado y lo que se carga (tools/primer-anio-ia.mjs): sin ninguna fila marcada, no hace
    // falta el caso; con alguna, el caso lleva la cita. Sin respuesta guardada, el caso queda como antes y el pedido queda "pendiente".
    // El escalón 3 y el caso "primer año" se resuelven abajo, con los signos de la carga (ver escalon3_214).
    // el estado salió de sus códigos NBB y cerró exacto: cada código tiene UN lado y todos los totales impresos cierran, así
    // que el error que se compensa que busca esta revisión no puede pasar (una fila del lado equivocado rompe el 9901 o el 70/76A y 60/66A).
    const porNBB = !!(nbbV && E?.exacto && E?.okRes && !imprime3 && !imprime1);
    if (porNBB) chequeos.push({ nombre: 'primer año', ok: true, detalle: 'el estado salió de sus códigos NBB y todos sus totales impresos cierran exacto: no hace falta la revisión del primer año (to-do 298 t)' });
    if (!(vecinos.includes(true) || imprime3 || imprime1 || porNBB)) primerAnio214 = { escalon3: resOk214(suma(ing)) };
  }
  // un total o el resultado que no cierran -> cola (salvo que Guido ya lo haya aceptado)
  for (const c of chequeos.filter((x) => x.ok === false && x.nombre !== 'año anterior cargado')) caso('no-cierra', c.nombre, `${c.nombre}: ${c.detalle}. Revisar si falta o sobra alguna fila, o si hay un renglón del lado equivocado.`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  // DUDAS de localizar.mjs y de extraer.mjs. Hasta la 326 solo llegaban a la cola las de extraer, y todas con la página del
  // estado de resultados aunque hablaran de una nota de otra página; las de localizar quedaban en el .ubicacion.json sin que nadie las viera.
  // Caso real, UC 2025: localizar avisó que las notas 20 (pág. 75 del visor) y 21 (pág. 76) tenían la misma tabla —el club imprimió la de
  // gastos de administración bajo el título de costo de ventas— y la duda no llegó a Guido. Ahora:
  //   - llegan las dos, cada una con la página y las líneas del primer bloque que nombra (o de la línea "L4157" que cite el texto);
  //   - solo las que la IA marcó `afecta_carga` (puede cambiar qué filas o qué importe se carga, más que el redondeo); el resto queda en las
  //     notas del .verificacion.json. Caso real del otro lado, también UC 2025: "Remuneración 1.790.062 en una tabla y 1.790.063 en la otra"
  //     llegó a la cola y es un peso sobre 1,8 millones (pedido de Guido: una diferencia de esa magnitud no va a la cola).
  //   - las dudas en el formato viejo (texto suelto, archivos viejos) se tratan como afecta_carga = true.
  const dudaComoObjeto = (d) => (typeof d === 'string' ? { texto: d, bloques: [...new Set(d.match(/\bb\d+\b/g) || [])], afecta_carga: true } : d);
  // CITA DE MONEDA EN OTRO DOCUMENTO DEL CLUB: un importe del estado (6 cifras o más, mismos dígitos y decimales) impreso en otro
  // .md de la misma carpeta pegado a un símbolo o código de moneda, en una línea que no habla de miles. Prueba literal de que ese número está
  // en UNIDADES. Caso: OFI 2018, el estado dice Κύκλος εργασιών 527.892,56 y OFI_board_report_2018 L20 "…ανήλθε στο ποσό των 527.892,56€".
  let citaMonedaMemo;
  const citaMoneda = () => {
    if (citaMonedaMemo !== undefined) return citaMonedaMemo;
    citaMonedaMemo = null;
    const nums = [...new Set(estado.map((f) => String(f.actual ?? '').replace(/[()\s−-]/g, '')).filter((t) => (t.match(/\d/g) || []).length >= 6))];
    if (!nums.length) return null;
    const dir = dirname(resolve(ROOT, md)); const propio = basename(md);
    const MON = '€|eur\\b|euros?\\b|ευρω|ευρώ|r\\$|us\\$|usd\\b|£|gbp\\b|kč|czk\\b|kr\\.?(?![\\p{L}])|dkk\\b|nok\\b|sek\\b|chf\\b|₽|руб|rub\\b|¥|円|\\$';
    const MILES = /miles|\bmil\b|thousand|χιλ|tausend|tsd|teur|migliaia|milhares|tusind|tusen|тыс|k€|€k|'000/;
    const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let hermanos = [];
    try { hermanos = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== propio && !/\.(t-[a-z]+|previo-[^.]*|mistral-redo|gemini-check|claude-check|antes-sumas)\.md$/.test(f)); } catch { return null; }
    const res = nums.map((n) => new RegExp(`(?<![\\d.,])${esc(n)}(?!\\d|[.,]\\d)\\s?(?:${MON})|(?:${MON})\\s?${esc(n)}(?!\\d|[.,]\\d)`, 'iu'));
    for (const h of hermanos.sort()) {
      let L; try { L = readFileSync(join(dir, h), 'utf8').split('\n'); } catch { continue; }
      for (let i = 0; i < L.length; i++) {
        if (MILES.test(normalizar(L[i]))) continue;
        const k = res.findIndex((re) => re.test(L[i]));
        if (k >= 0) { citaMonedaMemo = { doc: h, linea: i + 1, numero: nums[k] }; return citaMonedaMemo; }
      }
    }
    return null;
  };
  // CUADRO POR NATURALEZA: "¿Se carga <cuadro> como desglose conjunto / por naturaleza /
  // transversal…?" lo decide una cuenta, no una persona. Hasta acá siempre se contestó así a mano (Asteras 2020-2025, OFI 2020 y 2025, Levadiakos
  // 2020). El cuadro es el PRIMER bloque de la duda (no del estado); su total es su fila de total o subtotal de un lado (si hay varias, todas con
  // el mismo importe: Asteras imprime "Σύνολο" bajo el cuadro y bajo su "Κατανομή ανά κατηγορία"); a ese total se le restan sus filas de otro
  // lado. Se prueban TODAS las combinaciones de renglones del estado de ese lado, más las filas del financiero del mismo signo (AEL 2023: el
  // cuadro 2.745.139,63 = costo de ventas + administración + comercialización + intereses 7.608,42). COMPUERTA, exacto a media unidad por fila:
  //   - UNA sola combinación da el total y la propuesta de la IA es "sí": sí (Asteras 2020: 4.444.615,37 = L862 + L866 + L867);
  //   - NINGUNA da y la carga no usa filas de ese cuadro: no (OFI 2020 gastos: 5.716.721,43 sin los intereses; ninguna combinación);
  //   - si no, a la cola. Solo esa forma de pregunta: "¿Se carga la nota 30 solo como detalle alternativo, sin reemplazar…?" (Cuiabá 2022) es
  //     otra pregunta, donde "sí" quiere decir que NO entra.
  // Medido en las 17 dudas de esta forma de Generados/: decide 14; las 7 contestadas, con la misma respuesta; 0 distintas.
  const cuadroNaturaleza = (d) => {
    if (!/^¿\s*Se\s+cargan?\b[^?]*\bcomo\s+(?:un\s+)?(?:desglose|detalle)\s+(?:conjunto|por\s+naturaleza|transversal)/i.test(d.pregunta || '')) return null;
    const C = (d.bloques || [])[0]; const est = new Set(U.estado || []); if (!C || est.has(C)) return null;
    const num = (f) => Math.abs(parseNumber(f.actual) ?? NaN); const sg = (f) => Math.sign(parseNumber(f.actual) || 0);
    const filasC = (F.filas || []).filter((f) => f.bloque === C);
    const tots = filasC.filter((f) => (f.tipo === 'total' || f.tipo === 'subtotal') && (f.lado === 'ingreso' || f.lado === 'gasto'));
    if (!tots.length) return null;
    const lado = tots[0].lado; const T = num(tots[0]);
    if (!isFinite(T) || tots.some((f) => f.lado !== lado || Math.abs(num(f) - T) > 0.01)) return null;
    const otros = filasC.filter((f) => f.tipo === 'renglon' && f.lado !== lado && isFinite(num(f)));
    const P = T - otros.reduce((a, f) => a + num(f), 0);
    const cand = (F.filas || []).filter((f) => est.has(f.bloque) && f.tipo === 'renglon' && (f.lado === lado || (f.lado === 'financiero' && sg(f) === (lado === 'gasto' ? -1 : 1)))).map((f) => ({ f, v: num(f) })).filter((x) => isFinite(x.v) && x.v > 0);
    if (!cand.length || cand.length > 14) return null;
    const dec = (String(tots[0].actual).split(/[.,]/).pop() || '').length; const u = dec > 0 && dec <= 2 ? 10 ** -dec : 1;
    const dan = [];
    for (let m = 1; m < (1 << cand.length); m++) { let s = 0; let k = 0; for (let i = 0; i < cand.length; i++) if ((m >> i) & 1) { s += cand[i].v; k++; } if (Math.abs(s - P) <= 0.5 * u * (k + 1 + otros.length)) dan.push(m); }
    if (dan.length === 1 && d.propuesta === 'sí') return { decision: 'sí', porque: `el cuadro ${C} (${String(tots[0].actual)}) es la suma de ${cand.filter((x, i) => (dan[0] >> i) & 1).map((x) => `L${x.f.linea}`).join(' + ')}` };
    if (!dan.length && ![...ing, ...gas].some((f) => f.bloque === C)) return { decision: 'no', porque: `el cuadro ${C} (${String(tots[0].actual)}) no es la suma de ningún grupo de renglones del estado, y la carga no usa sus filas` };
    return null;
  };
  // EL CUADRO DE INVENTARIOS. "Apuramento do custo das mercadorias vendidas" (inicial + compras ± regularizações − final = costo)
  // no es un desglose aditivo y abría 2 dudas por club con la misma respuesta (Porto b102, Santa Clara b20, Braga b38; 31 en la cola). La
  // respuesta es siempre la misma, aunque la pregunta venga redactada al revés ("¿se cargan…?" / "¿se dejan afuera…?"): el cuadro queda afuera
  // y se carga el renglón del estado. COMPUERTA, una sola: el bloque de la duda tiene UNA fila de inventario inicial, UNA de final, compras y
  // UNA de costo, la identidad da exacta (media unidad por fila), el estado tiene un renglón con ese costo y la carga no usa ninguna fila del
  // cuadro. Entonces la duda no cambia nada de lo que se carga: se cierra con nota. Si algo no se cumple, sigue a la cola como siempre.
  const cuadroInventario = (d) => {
    const est = new Set(U.estado || []); const num = (f) => Math.abs(parseNumber(f.actual) ?? NaN);
    for (const C of (d.bloques || []).slice(0, 1)) { // el cuadro es el PRIMER bloque de la duda (como en cuadroNaturaleza): una duda de escala de "todos los bloques" no es sobre el cuadro
      if (est.has(C)) continue;
      const filasC = (F.filas || []).filter((f) => f.bloque === C && isFinite(parseNumber(f.actual) ?? NaN));
      const nl = (f) => normalizar(String(f.etiqueta ?? f.label ?? ''));
      const ini = filasC.filter((f) => /inicia|no inicio|saldo inicial|existencias? inicia/.test(nl(f)));
      const fin = filasC.filter((f) => /\bfina(l|is)\b|no fim|fim do periodo|saldo final/.test(nl(f)));
      const comp = filasC.filter((f) => /\bcompras?\b|purchases/.test(nl(f)) && !ini.includes(f) && !fin.includes(f));
      const reg = filasC.filter((f) => /regulariza|reclassifica/.test(nl(f)) && !ini.includes(f) && !fin.includes(f));
      const cmv = filasC.filter((f) => /custo|c\.?m\.?v|mercadorias vendidas|consumid|cost of (goods|sales)/.test(nl(f)) && ![...ini, ...fin, ...comp, ...reg].includes(f));
      if (ini.length !== 1 || fin.length !== 1 || cmv.length !== 1 || comp.length < 1) continue;
      const dec = (String(cmv[0].actual).split(/[.,]/).pop() || '').length; const u = dec > 0 && dec <= 2 ? 10 ** -dec : 1;
      const calc = num(ini[0]) + comp.reduce((a, f) => a + num(f), 0) + reg.reduce((a, f) => a + (parseNumber(f.actual) || 0), 0) - num(fin[0]);
      const n = 3 + comp.length + reg.length;
      if (Math.abs(calc - num(cmv[0])) > 0.5 * u * n) continue;
      if (!(F.filas || []).some((f) => est.has(f.bloque) && f.tipo === 'renglon' && Math.abs(num(f) - num(cmv[0])) <= 0.5 * u)) continue;
      if ([...ing, ...gas].some((f) => f.bloque === C)) continue;
      return `el bloque ${C} es el cuadro de inventarios: inicial ${ini[0].actual} + compras ${comp.map((f) => f.actual).join(' + ')}${reg.length ? ` ± regularizações ${reg.map((f) => f.actual).join(', ')}` : ''} − final ${fin[0].actual} = costo ${cmv[0].actual} (L${cmv[0].linea}), el renglón del estado; la carga no usa sus filas`;
    }
    return null;
  };
  const pendientes = []; const contestadas = []; // las dudas que irían a la cola se juntan por cuadro antes de escribirlas (abajo)
  for (const [origen, lista] of [['localizar', U.dudas || []], ['extraer', F.dudas || []]]) {
    for (const d of lista.map(dudaComoObjeto)) {
      // ajuste manual sin-dudas: Guido cerró el documento; sus dudas quedan como nota y no van a la cola (las viejas se cierran
      // como obsoletas porque esta corrida ya no las levanta).
      if (ajusteDe(pdf, 'sin-dudas')) { notas.push(`duda de ${origen} cerrada por ajuste manual (sin-dudas): ${d.pregunta || d.texto}`); continue; }
      if (!d.afecta_carga) { notas.push(`duda de ${origen} que no afecta la carga: ${d.texto}`); continue; }
      // la nota de la duda la abrió el escalón 1 de las notas (grupo de renglones, cerrarNota la confirmó): se cierra con nota
      // (solo si la lectura que ganó usó esa nota: AEL 2019 cerró con la lectura 5, que lee las hojas del estado y no abre notas)
      if (gas.some((f) => (d.bloques || []).includes(f.bloque) && String(f.origen || '').includes('escalón 1: grupo'))) { notas.push(`duda de ${origen} resuelta por el escalón 1 de las notas (la nota suma el grupo): ${d.pregunta || d.texto}`); continue; }
      const b = (d.bloques || []).map((id) => U.bloques?.[id]).find(Boolean);
      const ls = (d.texto.match(/\bL(\d+)\b/g) || []).map((x) => Number(x.slice(1)));
      const lineas = ls.length ? [Math.min(...ls), Math.max(...ls)] : b ? b.lineas : null;
      const pagina = ls.length ? paginaDeLinea(md, ls[0]) ?? b?.pagina : b?.pagina ?? estado[0]?.pagina;
      // PREGUNTA DE SÍ O NO (pedido de Guido: "necesito que me hagas la pregunta concreta, no exploratoria"). Desde este cambio
      // localizar y extraer escriben cada duda como una pregunta que se contesta sí o no, con su propuesta; la cola muestra eso. Las dudas en
      // formato viejo (sin `pregunta`) se muestran con su texto, como antes.
      const que = d.pregunta ? `${d.pregunta}  (por qué: ${d.texto})` : `La IA de ${origen === 'localizar' ? 'localizar (qué bloques son el estado y sus notas)' : 'extraer (las filas)'} dejó esta duda: ${d.texto}`;
      // POR TEMA: si la IA clasificó la duda en un tema de la lista fija (no 'otro'), se reconoce por
      // club + tema + renglón, no por el texto. Si Guido ya la contestó en CUALQUIER año del club, se aplica sola y no vuelve a la cola.
      const propuesta = d.propuesta ? `${d.propuesta} (responder aceptar si estás de acuerdo; corregir --valor "${d.propuesta === 'sí' ? 'no' : 'sí'}" si no)` : null;
      if (d.tema && d.tema !== 'otro') {
        const club = clubId || pdf.split('/')[2];
        const det = `${club}|${d.tema}|${normalizarRenglon(d.renglon)}`;
        // UN SOLO ESTADO DE RESULTADOS: la IA de localizar vio un único perímetro en el documento (perimetro individual o consolidado, no "ambos") y
        // pregunta, sin nombrar un renglón, si se carga aunque los años ya cargados sean del otro. La regla 1 de perímetro (CONVENCIONES-DATOS) ya lo decide: un ejercicio publicado con un solo
        // perímetro se carga con ese. Medido sobre 3.702 documentos: cierra 17 dudas, todas las que tenían respuesta guardada (7) eran "aceptar"; ningún caso contestado "no" (AS Roma 2005 y 2011 separato, Juventus 2022-23, Narva Trans, Kuressaare) se cierra. COMPUERTA: ningún otro documento de la carpeta del club cierra el mismo día (AS Roma 2011: el separato se descartó porque existe el consolidado del mismo ejercicio). La pregunta del perímetro DEL CLUB sigue en la etapa de cargar.
        if (origen === 'localizar' && d.tema === 'perimetro' && !String(d.renglon || '').trim() && d.propuesta === 'sí' && ['individual', 'consolidado'].includes(U.perimetro) && !registro.some((x) => x.pdf !== pdf && x.pdf.split('/').slice(0, 3).join('/') === pdf.split('/').slice(0, 3).join('/') && x.estado !== 'duplicado' && x.md && (e.periodo?.cierre ? x.periodo?.cierre === e.periodo.cierre : false))) { notas.push(`duda de localizar cerrada por la regla 1 de perímetro (el documento trae un solo estado, ${U.perimetro}): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        // ESCALÓN 1: la respuesta dada ANTES DEL ALTA del club. Sin alta, la clave lleva el nombre de la carpeta
        // ("Hellas Verona|escala|"); con alta, el id del sitio ("hellasverona-it|escala|"), y la respuesta vieja no se encontraba: la pregunta
        // volvía con otro id (56 repetidas en Goiás, Lazio, Hellas Verona...). Compuerta: el caso respondido es de la MISMA carpeta de club
        // (un "Nacional" de otro país no cuenta). Solo decisiones de verdad: una respuesta automática 'obsoleto' no contesta nada.
        const mismaCarpeta = (c) => c.pdf.split('/').slice(0, 3).join('/') === pdf.split('/').slice(0, 3).join('/');
        const antesDelAlta = clubId && clubId !== pdf.split('/')[2] ? respuestaPorDetalle('verificar', 'duda-tema', `${pdf.split('/')[2]}|${d.tema}|${normalizarRenglon(d.renglon)}`, mismaCarpeta) : null;
        const ya = respuestaPorDetalle('verificar', 'duda-tema', det) || (antesDelAlta && antesDelAlta.resp.decision !== 'obsoleto' ? antesDelAlta : null);
        if (ya) { notas.push(`duda de ${origen} ya contestada para el club${ya === antesDelAlta ? ' (antes de su alta)' : ''} (${d.tema}, "${d.renglon || '-'}"): ${ya.resp.decision}${ya.resp.valor ? ` ${ya.resp.valor}` : ''}, en ${ya.caso.pdf.split('/').pop()}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); contestadas.push({ origen, bloques: d.bloques || [], lineas, tema: d.tema, resp: ya.resp, que: ya.caso.que, propuesta: ya.caso.propuesta }); continue; }
        // DUDA DE ESCALA QUE OTRO DOCUMENTO DEL CLUB RESPONDE: si la carga usó UNIDADES para
        // el estado y otro .md de la carpeta imprime uno de sus importes con su moneda (citaMoneda, arriba), la duda se cierra con la cita. Si la
        // carga usó miles o no hay cita, sigue a la cola como siempre. Sin vigentes.push: un caso viejo abierto se cierra como obsoleto.
        if (d.tema === 'escala' && Math.abs(mult(estado[0]?.bloque) - 1e-6) < 1e-12) {
          const c = citaMoneda();
          if (c) { notas.push(`duda de ${origen} de escala confirmada por otro documento del club (to-do 213): ${c.doc} L${c.linea} imprime ${c.numero} con su moneda; la carga usó unidades`); continue; }
        }
        // ESCALÓN 2 DE LAS DUDAS: la aritmética la confirma. Si la escalera de lecturas cerró con un
        // número impreso, ningún año vecino da distinto, el tema es de los que las sumas pueden confirmar y la propuesta de la IA es "sí" (lo que
        // extraer ya aplicó), se acepta sola. Perímetro, cuadro de otro año, fila ilegible y "otro" nunca: un perímetro equivocado cierra igual.
        // Caso real: de las 5 preguntas de UC 2010-2014 que Guido contestó "sí" en un minuto, 4 eran de este tipo.
        // TEMA "ESCALA" (parte B sacada por decisión de Guido: era un desvío entre escaleras, no un escalón): las sumas
        // NO confirman una escala (cerrar es invariante a la escala del documento entero; Fortaleza CEIF 2023 tenía aceptadas a la vez "¿están
        // en miles?" y "¿están en unidades y no en miles?"), así que el tema 'escala' no está en la lista de abajo y va a la cola (o a un ajuste).
        { const inv = cuadroInventario(d); if (inv) { notas.push(`duda de ${origen} decidida por la identidad de inventarios (to-do 237 v): ${inv}. "${d.pregunta}"`); continue; } }
        if (E.cierra && !vecinos.includes(false) && ['usar-cuadro-por-segmento', 'cuadro-duplicado', 'columna'].includes(d.tema) && d.propuesta === 'sí') { notas.push(`duda de ${origen} confirmada por las sumas (${d.tema}, "${d.renglon || '-'}"): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        // ESCALÓN 2b: lo mismo cuando lo ÚNICO que frenó al escalón 2 es un año vecino que da distinto.
        // En estos 3 temas la duda es qué cuadro o qué columna del MISMO documento se usa, y eso lo confirma la suma del propio documento; el
        // vecino falla por reexpresiones o columnas perdidas (Juventus 2005-06, Inter 2019-21, Roma 2012 y 2018, Lazio 2006-07). Compuerta: la del
        // escalón 2 sin la condición del vecino (la escalera de lecturas cerró el resultado). Medido contra las respuestas de Guido en los 242 documentos
        // con verificación: 21 dudas de este grupo, 21 aceptadas tal cual (Roma 2011 separato se descartó por el documento entero, no por la duda).
        if (E.cierra && vecinos.includes(false) && ['usar-cuadro-por-segmento', 'cuadro-duplicado', 'columna'].includes(d.tema) && d.propuesta === 'sí') { notas.push(`duda de ${origen} confirmada por las sumas aunque un año vecino da distinto (escalón 2b; ${d.tema}, "${d.renglon || '-'}"): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        pendientes.push({ origen, motivo: 'duda-tema', detalle: det, que, pregunta: d.pregunta || d.texto, bloques: d.bloques || [], extra: { pagina, lineas, propuesta } });
        continue;
      }
      const inv = cuadroInventario(d);
      if (inv) { notas.push(`duda de ${origen} decidida por la identidad de inventarios (to-do 237 v): ${inv}. "${d.pregunta}"`); continue; }
      const cn = cuadroNaturaleza(d);
      if (cn) { notas.push(`duda de ${origen} decidida por las sumas (to-do 222): ${cn.decision}, ${cn.porque}. "${d.pregunta}"`); continue; }
      pendientes.push({ origen, motivo: `duda-de-${origen}`, detalle: (d.pregunta || d.texto).slice(0, 80), que, pregunta: d.pregunta || d.texto, bloques: d.bloques || [], extra: { pagina, lineas, propuesta } });
    }
  }
  // MISMO CUADRO: LA RESPUESTA A UNA DUDA CONTESTA LA OTRA. localizar y extraer preguntan
  // por separado sobre el mismo cuadro: AEK 2016-17, cuadro 6.23 'Παροχές στο προσωπικό' (L1612-1618), "¿se carga como desglose?" y "¿se deja
  // afuera?". Las dos siguen yendo a la cola; este escalón solo CIERRA una cuando Guido ya contestó la otra y esa respuesta la contesta.
  //   - Mismo cuadro = mismo PRIMER bloque de las dos dudas (los demás son contexto), y que no sea un bloque del estado de resultados (casi
  //     todas lo nombran: Volos 2019-2022 juntaba "¿unidades?" con "¿se carga el interés de L21?"). Solo entre orígenes distintos.
  //   - COMPUERTA: las dos preguntas son sobre la MISMA decisión, si el cuadro entra o no a la carga: una "¿Se carga…?" con una "¿Se deja
  //     afuera…?" (respuestas opuestas) o dos "¿Se deja afuera…?" (la misma). Dos "¿Se carga…?" pueden ser maneras distintas de cargar el
  //     mismo cuadro (Levadiakos 2019: "¿solo?" -> no; "¿junto con su continuación de la pág. 16?" -> sí): no se cierra ninguna.
  //   - Medido en la cola de Grecia (59 dudas de verificar, todas contestadas): cierra 9, las 9 con la respuesta que Guido había dado; 0 perdidas.
  //   - Contestar una duda no cambia lo que se carga (solo libera el caso), así que este escalón no cambia ningún dato.
  // MEDIDO Y DESCARTADO (HALLAZGOS-pipeline.md): JUNTAR las dos en un caso escondía una pregunta genuina (Levadiakos), y cerrar sola la duda
  // sobre un cuadro que la carga no usa se equivocaba en 6 de 26 (Asteras 2020-2023: la nota suma un GRUPO de renglones).
  const estadoB = new Set(F.ubicacion?.estado || []);
  const cuadroDe = (x) => { const b = (x.bloques || [])[0]; return b && !estadoB.has(b) ? b : null; };
  const mismoCuadro = (x, y) => { const c = cuadroDe(x); return !!c && c === cuadroDe(y); };
  const tipoDecision = (q) => (/^¿\s*Se\s+cargan?\b/i.test(q) ? 'carga' : /^¿\s*Se\s+dejan?\s+afuera\b/i.test(q) ? 'afuera' : null);
  const propDe = (txt) => (/^\s*no(?=[\s(.,]|$)/i.test(String(txt || '')) ? 'no' : /^\s*s[ií](?=[\s(.,]|$)/i.test(String(txt || '')) ? 'sí' : null); // sin \b: en JS la í no cuenta como letra
  // ¿entra el cuadro a la carga, según la respuesta de Guido a esa pregunta? null si no se puede saber
  const entra = (pregunta, resp, propuesta) => {
    const t = tipoDecision(pregunta); if (!t || !resp) return null;
    const v = resp.decision === 'aceptar' ? propDe(propuesta) : resp.decision === 'corregir' ? propDe(resp.valor) : null;
    if (!v) return null;
    return t === 'carga' ? v === 'sí' : v === 'no';
  };
  const respondidas = [
    ...contestadas.map((c) => ({ origen: c.origen, bloques: c.bloques, pregunta: c.que, entra: entra(c.que, c.resp, c.propuesta) })),
    ...pendientes.map((a) => { const r = respuestaDe(pdf, 'verificar', a.motivo, a.detalle); return r ? { origen: a.origen, bloques: a.bloques, pregunta: a.que, entra: entra(a.que, r, a.extra.propuesta) } : null; }).filter(Boolean),
  ];
  for (const a of pendientes) {
    const ta = tipoDecision(a.que);
    const otra = ta && !respuestaDe(pdf, 'verificar', a.motivo, a.detalle)
      ? respondidas.find((x) => x.origen !== a.origen && mismoCuadro(x, a) && x.entra !== null && (ta === 'afuera' || tipoDecision(x.pregunta) === 'afuera'))
      : null;
    if (otra) { notas.push(`duda de ${a.origen} contestada por la respuesta de Guido sobre el mismo cuadro (${cuadroDe(a)}, to-do 211): el cuadro ${otra.entra ? 'entra' : 'queda afuera'}. "${a.pregunta}" | respondida: "${otra.pregunta.split('  (por qué')[0]}"`); continue; }
    caso(a.motivo, a.detalle, a.que, a.extra);
  }

  // ESCALERA DEL RESULTADO FINAL. Si se cerró contra "resultado antes de impuestos"
  // (lectura 1), el resultado final es antes ± impuesto, y el signo con que el documento imprime el impuesto no lo dice: antes
  // se SUMABA el impuesto tal como está impreso (UC 2013: 57.521 + 163.095 = 220.616), y en Fortaleza CEIF 2025 eso daba 685.847 + 372.407 =
  // 1.058.254 cuando la nota de patrimonio imprime "Resultados del ejercicio 313.440" (= 685.847 − 372.407, .md L1047).
  //   candidatos: antes + impuesto, antes − impuesto
  //   ESCALÓN 0  el candidato que está IMPRESO en el .md de este documento (cualquier número, a media unidad impresa de redondeo)
  //   ESCALÓN 1  el que imprime el documento del año SIGUIENTE en una columna que no es la primera (la del año anterior)
  //   COMPUERTA  un solo candidato coincide. Ninguno o los dos -> cola (Fortaleza 2023: impreso 1.021.768, ninguno de los dos).
  let resParaCargar = res; let resultadoFinal = null;
  if (forzado) { resParaCargar = forzado.final; resultadoFinal = { valor: r6(forzado.final), impuesto: 'deducido', escalon: 'ajuste manual', donde: 'Admin/registros/ajustes-manuales.jsonl', impuestoImpreso: r6(forzado.impImpreso), impuestoDeducido: r6(forzado.antes - forzado.final) }; }
  else if (E.cierra && E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok) && Math.abs(conSigno(imp)) > TOL) {
    const NUM_RE = /\(?-?\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?\)?|\d{4,}/g;
    const cands = [res + conSigno(imp), res - conSigno(imp)];
    // ¿el candidato (millones) aparece impreso en el .md, a escala m (millones por unidad impresa)? soloNoPrimera: en una fila de tabla, no
    // en la primera columna con cifras (la del año actual), para leer la columna del año anterior del documento siguiente.
    const impreso = (mdRel, m, cand, soloNoPrimera) => {
      let L; try { L = readFileSync(resolve(ROOT, mdRel), 'utf8').split('\n'); } catch { return null; }
      const objetivo = Math.abs(cand / m);
      for (const [i, l] of L.entries()) {
        let nums = [];
        if (soloNoPrimera) { if (!l.trim().startsWith('|')) continue; nums = l.split('|').map((c) => c.trim()).map((c) => c.match(NUM_RE) || []).filter((m) => m.length).slice(1).flat(); }
        else nums = l.match(NUM_RE) || [];
        if (nums.some((t) => Math.abs(Math.abs(parseNumber(t) ?? NaN) - objetivo) <= 0.5)) return i + 1;
      }
      return null;
    };
    const mImp = mult(filaAntes?.bloque ?? estado[0]?.bloque);
    const sig = vecinosDoc.find(([dy]) => dy === 1)?.[1];
    const mSig = sig ? (MULT[sig.U2.escala] ?? 1e-6) * sig.k2 : null;
    const pruebas = [
      ['escalón 0', 'este documento', (c) => impreso(md, mImp, c, false)],
      ['escalón 1', sig ? sig.otro.pdf.split('/').pop() : null, (c) => (sig ? impreso(sig.otro.md, mSig, c, true) : null)],
    ];
    for (const [escalon, donde, buscar] of pruebas) {
      if (!donde) continue;
      const hits = cands.map((c) => buscar(c));
      if (hits.filter((h) => h != null).length !== 1) continue;
      const i = hits.findIndex((h) => h != null);
      resParaCargar = cands[i]; resultadoFinal = { valor: r6(cands[i]), impuesto: i === 0 ? 'sumado' : 'restado', escalon, donde, linea: hits[i] };
      break;
    }
    if (resultadoFinal) chequeos.push({ nombre: 'resultado final', ok: true, detalle: `antes de impuestos ${r6(res)} con el impuesto ${resultadoFinal.impuesto} = ${resultadoFinal.valor}, impreso en ${resultadoFinal.donde} (L${resultadoFinal.linea}; ${resultadoFinal.escalon})` });
    else {
      const enMd = Math.abs(cands[1] / mImp).toLocaleString('es-AR', { maximumFractionDigits: 2 });
      // detalle con "ajuste": la respuesta va en tools/ajustes.mjs, no en la cola (una respuesta de la cola a este caso lo
      // silenciaría con el resultado en null); el detalle nuevo hace que las respuestas viejas no apliquen.
      caso('resultado-final', `${year}|ajuste`, `¿Ninguno de los dos es el resultado del ejercicio? El resultado antes de impuestos (${r6(res)}) cierra, pero ni ${r6(cands[1])} (restando el impuesto ${r6(Math.abs(conSigno(imp)))}; impreso sería ${enMd}) ni ${r6(cands[0])} (sumándolo) aparecen impresos${sig ? ` (tampoco en ${sig.otro.pdf.split('/').pop()}, columna del año anterior)` : ''}. Buscá en el .md el resultado del ejercicio impreso (nota de patrimonio, "Resultados del ejercicio"): si está, node tools/ajustes.mjs --agregar "${pdf}" resultado-final --valor "<el número tal cual>" --motivo "..." (el impuesto se deduce solo); si no, descartar.`, { pagina: pagDe(filaAntes?.bloque) });
      resParaCargar = null; chequeos.push({ nombre: 'resultado final', ok: false, detalle: `ni ${r6(cands[1])} (antes − impuesto) ni ${r6(cands[0])} (antes + impuesto) están impresos de una sola forma en este documento${sig ? ' ni en el del año siguiente' : ''}` });
    }
  } else if (E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok)) resParaCargar = res + conSigno(imp);

  // SIGNO DEL RESULTADO IMPRESO. La compuerta del resultado (evaluar) compara valores ABSOLUTOS, así que un resultado impreso sin
  // el signo de la pérdida cierra igual, pero se le pasaba a la carga positivo y cargar.mjs frenaba por tie-out hasta un ajuste
  // `resultado-final` a mano. Casos: Ferroviária 2013-b, 2014-b y 2017 ("= Prejuízo 1.222.442,07 D"), Novorizontino 2014-b ("PREJUIZO
  // 3.108.722,71"), Paysandu 2025 (DRE entero con signos de balancete: receitas "- 69.580.477,67", déficit "2.175.575,20").
  //   ESCALÓN 0  ajuste manual resultado-final (forzado, arriba)
  //   ESCALÓN 1  el resultado impreso tal cual
  //   ESCALÓN 2  el signo de las filas, SOLO si: (compuerta) el resultado del ejercicio cerró EXACTO en valor absoluto con el signo opuesto,
  //              y (señal) el documento dice que el impreso es una pérdida sin signo: la etiqueta es de pérdida y no de las dos cosas
  //              ("Prejuízo", sí; "Superávit/Déficit", no), o el importe lleva la marca D de balancete, o los ingresos vienen impresos en
  //              negativo (más de la mitad del dinero de los renglones de ingreso). Sin señal no decide: frena como antes (un lado mal
  //              extraído no se arregla dando vuelta el resultado).
  if (!forzado && !resultadoFinal && resParaCargar != null && res && E.cierra && E.exacto && E.ch.some((c) => c.nombre === 'resultado del ejercicio' && c.ok)) {
    const pat = suma(E.ing) - suma(E.gas) + finSegun(lectura, fin) + siSegun(lectura) * conSigno(imp);
    if (Math.sign(pat) === -Math.sign(res)) {
      let etRes = ''; try { etRes = readFileSync(resolve(ROOT, md), 'utf8').split('\n')[(F.resultado?.linea ?? 0) - 1] || ''; } catch {}
      etRes = etRes.split('|').filter((c) => /[a-zà-ú]/i.test(c)).slice(0, 1).join(' ');
      const PERDIDA = /preju[ií]zo|d[ée]ficit|\bperdas?\b|p[ée]rdidas?|perdita|\bloss\b/i; const GANANCIA = /super[aá]vit|lucro|ganancia|utilidad|utile|profit|gain/i;
      const ingImpresos = (F.filas || []).filter((f) => f.lado === 'ingreso' && f.tipo === 'renglon');
      const dinero = (xs) => xs.reduce((a, f) => a + Math.abs(parseNumber(String(f.actual)) || 0), 0);
      const senales = [];
      if (res > 0 && PERDIDA.test(etRes) && !GANANCIA.test(etRes)) senales.push(`la etiqueta "${etRes.trim().replace(/\*/g, '')}" es de pérdida`);
      if (res > 0 && /\bD\s*$/.test(String(F.resultado?.actual || ''))) senales.push(`el importe impreso "${F.resultado.actual}" lleva la marca D`);
      if (ingImpresos.length && dinero(ingImpresos.filter((f) => /^\s*[-(−]/.test(String(f.actual)))) > dinero(ingImpresos) / 2) senales.push('los ingresos vienen impresos en negativo (signos de balancete)');
      // señales nuevas: el signo VA AL FINAL del importe impreso ("3 041 302,19 € -", AVS 2023-24), o el MISMO resultado
      // (misma etiqueta, mismo importe) está impreso en otra línea del documento con signo negativo explícito (el estado, el resumen o el
      // patrimonio: AVS L229/L513, Portimonense L1036). Misma compuerta de arriba: el resultado cerró EXACTO con el signo opuesto.
      if (res > 0 && /\d[\s€*]*[-−]\s*\**\s*$/.test(String(F.resultado?.actual || ''))) senales.push(`el importe impreso "${F.resultado.actual}" lleva el signo menos al final`);
      if (res > 0 && !senales.length && etRes.trim()) {
        try {
          const abs0 = Math.abs(parseNumber(String(F.resultado?.actual)) ?? NaN); const et0 = normalizar(etRes);
          const otra = readFileSync(resolve(ROOT, md), 'utf8').split('\n').map((t, i) => [t, i + 1]).find(([t, n]) => n !== F.resultado?.linea && t.includes('|') && normalizar(t.split('|').filter((c) => /[a-zà-ú]/i.test(c))[0] || '') === et0
            && t.split('|').slice(1).some((c) => { const v = parseNumber(c); return v != null && v < 0 && Math.abs(Math.abs(v) - abs0) < 0.005 + 1e-9; }));
          if (otra) senales.push(`la misma etiqueta imprime el importe en negativo en L${otra[1]}`);
        } catch {}
      }
      if (senales.length) {
        resParaCargar = -res;
        chequeos.push({ nombre: 'signo del resultado', ok: true, detalle: `escalón 2: las filas dan ${r6(pat)} y el impreso es ${r6(res)}; se carga ${r6(-res)} porque ${senales.join('; ')}` });
        notas.push(`resultado impreso sin el signo de la pérdida: se carga ${r6(-res)} (${senales.join('; ')})`);
      }
    }
  }

  // SIGNOS DE FINANCIERO E IMPUESTO PARA LA CARGA (escalón de la etapa 8 aprobado por Guido: "lo que cerró en la
  // etapa 6 no se vuelve a decidir en la 8"). Hasta la 374 se escribían TAL COMO ESTÁN IMPRESOS y cargar.mjs los sumaba: si el resultado
  // cerró invirtiendo un signo (lectura "financiero e impuesto invertidos", escalón "impuesto restado", ajuste con impuesto deducido), la
  // carga sumaba al revés. Caso: Fortaleza 2025, impuesto 372.407 restado para llegar a 313.440; la carga lo sumaba y daba 1.054.344.
  // Ahora se escriben como su EFECTO EN EL RESULTADO (final = ingresos − gastos + financiero + impuesto). Si cerró "como impresos", no
  // cambia nada (UC).
  const lect = String(lectura || '');
  const sfCarga = forzado ? 1 : /financiero e impuesto invertidos|financiero invertido/.test(lect) ? -1 : 1;
  // "financiero por rótulo": cada fila con el signo de su rótulo (las que no dicen nada, como están impresas)
  const porRotulo = !forzado && /por rótulo/.test(lect);
  const finCarga = (f) => (porRotulo ? (signoRotulo(f) ? signoRotulo(f) * (/con signo/.test(lect) ? (f.M || 0) : Math.abs(f.M || 0)) : f.M) : sfCarga * f.M);
  const siCarga = forzado || resultadoFinal?.impuesto === 'restado' ? -1 : resultadoFinal?.impuesto === 'sumado' ? 1 : /financiero e impuesto invertidos|impuesto invertido/.test(lect) ? -1 : 1;

  // SOLO EL RESULTADO coincide a 0,01% (de los ingresos): con el resultado exacto,
  // lo único que se escapa es un error que se compensa (la misma cifra en los dos lados, una fila que falta de un lado y sobra del otro).
  // Se le pregunta a Claude con las líneas del estado y lo que se carga (tools/primer-anio-ia.mjs), con los signos de la carga: sin ninguna
  // fila marcada, no hace falta el caso; con alguna, el caso lleva la cita. Sin respuesta guardada, el caso queda como antes y el pedido queda
  // "pendiente". MEDICIÓN (PRIMER_ANIO_SIMULAR=1): un año con el anterior ya cargado arma igual el pedido (no abre casos ni cambia chequeos).
  const r214 = chequeos.find((x) => x.nombre === 'resultado del ejercicio');
  const simular214 = metaPrev && process.env.PRIMER_ANIO_SIMULAR === '1' && r214?.ok === true && r214.dif != null && r214.dif <= 1e-4 * Math.abs(suma(ing));
  if (primerAnio214 || simular214) {
    let alarma214 = null;
    if (primerAnio214?.escalon3 || simular214) {
      const num = (v) => (Number.isFinite(v) ? r6(v) : 0);
      const filas214 = [...ing.map((f) => ({ f, lado: 'ingreso' })), ...gas.map((f) => ({ f, lado: 'gasto' }))].map(({ f, lado }) => { const vuelta = f.lado && f.lado !== lado && f.M < 0; return { lado: vuelta ? f.lado : lado, etiqueta: f.etiqueta, M: num(vuelta ? -f.M : f.M), linea: f.linea ?? null }; }) // como en `lineas` del .verificacion.json: una deducción en su lado y en positivo
        .concat(fin.map((f) => ({ lado: 'financiero', etiqueta: f.etiqueta, M: num(finCarga(f)), linea: f.linea ?? null })), imp.map((f) => ({ lado: 'impuesto', etiqueta: f.etiqueta, M: num(siCarga * f.M), linea: f.linea ?? null })));
      const g = escalon3_214(filas214);
      if (g?.ok && !simular214) chequeos.push({ nombre: 'primer año', ok: true, detalle: 'solo el resultado coincide con lo impreso, y Claude no encontró ninguna fila del estado que falte, sobre, se repita o esté del lado equivocado (to-do 214, escalón 3)' });
      if (g && !g.ok) alarma214 = g.detalle;
    }
    if (primerAnio214 && primerAnio?.estado !== 'confirmado')
    caso('primer-anio', String(year), `Primer año automático de este club${clubId ? '' : ' (club nuevo)'}: no hay año anterior cargado para comparar. Revisar que los ingresos (${r6(suma(ing))}), los gastos (${r6(suma(gas))}) y el resultado coincidan con el estado de resultados impreso.${alarma214 ? ` Claude (escalón 3) marcó: ${alarma214}` : ''}`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  }
  const obsoletos = cerrarObsoletos(pdf, 'verificar', vigentes);
  if (obsoletos) notas.push(`${obsoletos} caso(s) viejos de la cola se cerraron como obsoletos (esta corrida ya no los levanta)`);
  const yaReintentado = Number(U.indiceAmpliado === true ? 1 : U.indiceAmpliado || 0) >= VERSION_AMPLIADO; // reintentado con el índice ampliado vigente
  const out = { pdf, md, generado: new Date().toISOString(), scriptHuella: huellaVerificar(), estado: cola.length ? 'cola' : 'ok', clubId, year, escala, ajustes: ajustes.length ? ajustes : null, cola, chequeos, notas,
    reintentar: reintentos.length && !yaReintentado ? reintentos : null, reintentado: yaReintentado, faltasDesglose: reintentos.length ? reintentos : null, // faltasDesglose: siempre, para tools/diagnostico-desglose.mjs
    // resultadoParaCargar (sale de la escalera del resultado final y un ajuste manual gana): si cerró contra "resultado antes de impuestos",
    // el resultado del ejercicio es ese ± el impuesto, el que esté impreso; null si no se pudo confirmar (va a la cola). cargar.mjs hace su
    // tie-out contra este número.
    totales: { ingresos: r6(suma(ing)), gastos: r6(suma(gas)), financiero: r6(conSigno(fin)), impuesto: r6(conSigno(imp)), resultadoImpreso: r6(res), resultadoParaCargar: r6(resParaCargar), resultadoFinal, lecturaSignos: lectura },
    // una hoja de nota de un lado que quedó RESTANDO dentro del otro (Goiás 2025: "Outras Receitas (b)" 1.439.848, ingreso,
    // dentro de "Outras Receitas e Despesas", renglón de gastos) se escribe en SU lado y en positivo: es lo mismo que cerró, sin decidir
    // nada nuevo. Hasta la 391 salía como ingreso negativo y la carga no cerraba.
    lineas: [...ing.map((f) => [f, 'ingreso']), ...gas.map((f) => [f, 'gasto'])].map(([f0, lista]) => { const opuesto = lista === 'ingreso' ? 'gasto' : 'ingreso'; const f1 = f0.lado === opuesto && f0.M < 0 ? { ...f0, M: -f0.M } : f0; return f1.lado === 'financiero' ? { ...f1, lado: lista } : f1; /* una fila del financiero que suma dentro de los ingresos o de los gastos (una nota de Outros rendimentos que trae 'Juros') se escribe con el lado de esa lista: cargar.mjs manda a gasto todo lo que no es 'ingreso' (Marítimo 2023-24, Paços 2021-22, Santa Clara) */ }).map((f) => ({ etiqueta: f.etiqueta, lado: f.lado, M: r6(f.M), pagina: f.pagina, linea: f.linea ?? null, origen: f.origen || 'estado', ...(f.catAjuste ? { categoria: f.catAjuste } : {}) })),
    // financiero / impuesto: su efecto en el resultado (ver SIGNOS ... PARA LA CARGA arriba); `signosCarga` dice qué se invirtió.
    signosCarga: { financiero: porRotulo ? 'rótulo' : sfCarga, impuesto: siCarga },
    // `destino` (ajuste `fila` del lado financiero con --destino profit_on_player_sales, Auditora 5): cargar.mjs la manda a profitOnPlayerSales y no a netInterest
    financiero: fin.map((f) => ({ etiqueta: f.etiqueta, M: r6(finCarga(f)), linea: f.linea, ...(f.destino ? { destino: f.destino } : {}) })), impuesto: imp.map((f) => ({ etiqueta: f.etiqueta, M: r6(siCarga * f.M), linea: f.linea })) };
  if (primerAnio) out.primerAnio = primerAnio; // lo lee tools/primer-anio-ia.mjs
  if (notaSubtotalLados.size) out.notaSubtotal = [...notaSubtotalLados]; // la señal que se queda prendida, ver ladosCero
  if (confirmadosPorSumas.length) out.confirmadosPorSumas = confirmadosPorSumas; // los lee avisarRegistro()
  writeFileSync(resolve(ROOT, derivado(md, '.verificacion.json')), JSON.stringify(out, null, 1));
  // --rubros: la lista de rubros para la categorización de siempre (etapa 7), con las líneas verificadas. Club: el id del sitio o, si es nuevo,
  // el slug de la carpeta (el mismo id provisorio que usa el pipeline).
  if (escribirRubros) {
    const club = clubId || pdf.split('/')[2].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const rubros = out.lineas.filter((l) => l.origen !== 'redondeo').map((l) => ({ label: l.etiqueta, lado: l.lado === 'ingreso' ? 'revenue' : 'expense', page: l.pagina, section: l.origen, values: [l.M] }));
    // Si el .rubros.json que ya está tiene EXACTAMENTE lo mismo (md, pdf, club, año y cada rubro) salvo la fecha y las glosas,
    // no se reescribe: reescribirlo borraba las glosas y glosar-rubros.mjs volvía a pagar a Gemini por cada documento de cada corrida del lote
    // (~19 s por documento), aunque no hubiera cambiado nada. Jev y Claude ya no se rehacían (huellas.mjs excluye la glosa y la fecha).
    const pR = resolve(ROOT, derivado(md, '.rubros.json'));
    const sinGlosa = (arr) => JSON.stringify((arr || []).map(({ glosa, ...r }) => r));
    let igual = false; try { const v = JSON.parse(readFileSync(pR, 'utf8')); igual = v.md === md && v.pdf === pdf && v.club === club && v.year === year && sinGlosa(v.rubros) === sinGlosa(rubros); } catch { /* no hay */ }
    if (!igual) writeFileSync(pR, JSON.stringify({ md, pdf, club, year, generatedAt: new Date().toISOString(), origen: 'verificar.mjs (proceso nuevo, Versión 324)', rubros }, null, 1));
    if (out.estado === 'ok') avisarRegistro(md, rubros.length, registro, out);
  }
  return out;
}

// AVISO AL REGISTRO VIEJO. Jev, Claude y cargar.mjs solo trabajan los documentos `listo-para-jev` del registro
// (Admin/registros/transcripciones-estado.jsonl), que arma inventario-transcripciones.mjs con la ÚLTIMA línea del historial
// (Admin/registros/transcripciones-verificaciones.jsonl) para la huella del .md actual. Esa línea la escribía solo el proceso viejo (pipeline.mjs, al
// preparar). Un documento que entra SOLO por el proceso nuevo, o cuyo .md cambió, quedaba "sin-verificar" aunque el proceso nuevo lo hubiera
// validado y verificado. Caso real: UC 2015, re-transcripto con Mistral en el reintento del lote 06 (validacion.json: 83 números
// confirmados, 0 sin confirmar; verificar ok), y la etapa 7 decía "0 documentos listo-para-jev" y cargar.mjs frenaba.
// Ahora, al terminar ok (y solo desde el lote, que es quien escribe los rubros), se agrega la MISMA línea que escribe pipeline.mjs, con un
// método y un detalle propios: "listo" acá quiere decir "lo que se carga está validado", NO "el .md entero está validado".
// Solo si se cumplen todas:
//   - el .md no está cargado ni ya es listo-para-jev para esta misma huella (no se pisa la validación entera de un documento del proceso viejo);
//   - validacion.json existe, es posterior al .md y no tiene números sin confirmar.
function avisarRegistro(md, nRubros, registro, out = null) {
  const e = (registro || []).find((x) => x.md === md);
  const mdAbs = resolve(ROOT, md);
  if (!e || e.cargado || !existsSync(mdAbs)) return false;
  const sha = createHash('sha1').update(readFileSync(mdAbs)).digest('hex');
  const histPath = resolve(ROOT, 'Admin', 'registros', 'transcripciones-verificaciones.jsonl');
  const hist = existsSync(histPath) ? readFileSync(histPath, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter((v) => v && v.md === md && v.mdSha1 === sha) : [];
  const prev = hist[hist.length - 1] || {};
  if (prev.jev === 'listo-para-jev') return false;
  const vPath = resolve(ROOT, derivado(md, '.validacion.json'));
  if (!existsSync(vPath)) return false;
  let v; try { v = JSON.parse(readFileSync(vPath, 'utf8')); } catch { return false; }
  const confirmadosAMano = ajustesDe(md.replace(/\.md$/i, '.pdf')).filter((a) => a.campo === 'confirmado'); // ajuste manual
  // SOLO LOS BLOQUES QUE SE CARGAN: se exigen confirmados los números de
  // los bloques que usa la lectura que cerró (los de las filas que se cargan: ingresos, gastos, financiero e impuesto, por su línea en el
  // .filas.json); un número de un bloque que no se carga no frena. Caso: Juventus 2021-22, 30 números sin confirmar, todos de notas que la
  // lectura no usó (ej. L6462, b133, "Ticket sales | 32,293 | 7,752 | 24,541" en miles): se destrabó con 29 ajustes `confirmado` que con
  // esta regla no hacían falta. Si no se puede saber qué bloques usa (sin .filas.json), como antes: todos.
  const usados = (() => {
    if (!out) return null;
    try {
      const X = JSON.parse(readFileSync(resolve(ROOT, derivado(md, '.filas.json', { crear: false })), 'utf8'));
      const lineas = new Set([...(out.lineas || []), ...(out.financiero || []), ...(out.impuesto || [])].map((l) => Number(l.linea)));
      const bs = new Set((X.filas || []).filter((f) => lineas.has(Number(f.linea))).map((f) => f.bloque));
      return bs.size ? bs : null;
    } catch { return null; }
  })();
  // COMPUERTA DEL ESCALÓN 2b DE LA ETAPA 4: validar-bloques.mjs marca `propuesta: 'anio-encabezado'` en un año
  // de la fila de encabezado de una tabla. La marca sola no alcanza: el número deja de frenar solo si su línea NO es la de ninguna fila que
  // se carga (ingresos, gastos, financiero, impuesto de la lectura que cerró). Sin `out` no se puede saber qué se carga: frena como antes.
  // Caso: Napoli 2024, "2023" en L276 (encabezado); las filas que se cargan están en L280, L281, L284...
  const lineasCargadas = out ? new Set([...(out.lineas || []), ...(out.financiero || []), ...(out.impuesto || [])].map((l) => Number(l.linea))) : null;
  const pasaCompuerta = (n) => n.propuesta === 'anio-encabezado' && lineasCargadas && !lineasCargadas.has(Number(n.linea));
  // UN NÚMERO QUE NO ENTRA EN LA CARGA NO FRENA: el que no es el valor del año de una
  // fila que se carga (una fila del resultado, el total de una nota, la columna del año anterior). Si fuera el resultado impreso o un total mal
  // leído, la etapa 6 no habría cerrado (avisarRegistro solo corre con la etapa 6 en "ok"). Caso: AS Roma 2021, 13 números sin confirmar,
  // ninguno de una fila que se carga (L2157-L2165, el resultado; L4204-L4616, totales de notas). Y (escalón b) los que verificar() confirmó
  // con las sumas (out.confirmadosPorSumas).
  const filasX = (() => { try { return JSON.parse(readFileSync(resolve(ROOT, derivado(md, '.filas.json', { crear: false })), 'utf8')).filas || []; } catch { return null; } })();
  const nn = (x) => String(x ?? '').replace(/[^0-9]/g, '');
  const entraEnLaCarga = (n) => !lineasCargadas || !filasX || filasX.some((f) => Number(f.linea) === Number(n.linea) && lineasCargadas.has(Number(n.linea)) && nn(f.actual) === nn(n.numero));
  const porSumas = (n) => (out?.confirmadosPorSumas || []).some((c) => Number(c.linea) === Number(n.linea) && nn(c.numero) === nn(n.numero));
  // SIN NINGUNA SEGUNDA LECTURA: la página es una imagen y Gemini y Claude la rechazaron los dos (RECITATION,
  // poco probable pero posible), así que no hay contra qué confirmar. Ahí manda el escalón 3 de la etapa 4: las sumas de la etapa 6, y
  // avisarRegistro() solo corre con la etapa 6 en "ok". Si las sumas no cierran, verificar() ya manda cada número a la cola
  // ('numero-no-confirmado', "no se pudo confirmar contra el PDF").
  const sinConfirmar = (v.noConfirmados || []).filter((n) => (!usados || usados.has(n.bloque)) && !pasaCompuerta(n) && entraEnLaCarga(n) && !porSumas(n) && !n.sinSegunda && !confirmadosAMano.some((a) => Number(a.linea) === Number(n.linea) && String(a.valor).trim() === String(n.numero).trim()));
  // (frenado de Sporting CP 2008-09 y 2009-10) "al día" = la misma compuerta que usa cargar.mjs: la huella del .md si la validación la tiene (validacionAlDia); la fecha solo es el respaldo. Con la fecha sola,
  // un `touch` del .md (misma huella) dejaba el registro sin actualizar y cargar.mjs repetía «el registro no se actualizó».
  if (sinConfirmar.length || !v.generado || !validacionAlDia(md)) return false;
  // ESCALERA DE LA MARCA (ok de Guido: "como escalón, no manta corta").
  //   escalón 1 (el de siempre): 5 rubros o más -> listo-para-jev.
  //   escalón 2 (nuevo): menos de 5 rubros, pero la etapa 6 cerró CONTRA EL RESULTADO IMPRESO (el chequeo "resultado del ejercicio" en ok, no
  //     uno forzado por ajuste) -> listo-para-jev. Un documento de pocos renglones cuya suma da exacto el resultado que imprime no es una
  //     extracción a medias: es un DRE de una página. Caso: Remo dre-2019, 2 renglones (ingresos 17.903.353 y gastos 20.686.217) + el
  //     financiero, y cierra con el déficit impreso de 3.008.290; quedaba `sin-rubros` y cargar.mjs frenaba para siempre.
  //   si no -> sin-rubros (como antes).
  const cerroContraImpreso = !!(out?.chequeos || []).find((c) => c.nombre === 'resultado del ejercicio' && c.ok === true);
  const jev = nRubros >= 5 || (nRubros >= 1 && cerroContraImpreso) ? 'listo-para-jev' : 'sin-rubros';
  appendFileSync(histPath, JSON.stringify({ ...prev, ts: new Date().toISOString(), md, mdSha1: sha, status: 'listo', method: 'validar-bloques (proceso nuevo)',
    detail: `validar-bloques: solo los bloques que se cargan (${v.confirmados ?? '?'} números confirmados, modo ${v.modo || '?'}); el resto del .md no se validó`, jev, rubros: nRubros }) + '\n');
  return true;
}

// UNA LISTA, CON LA CADENA DE ESCALA. Si algún documento resolvió su escala por el escalón 1 (la del año vecino), los que ya se
// verificaron antes en la misma lista se compararon contra él SIN resolver: se repite la pasada entera, una vez (gratis, determinista). Caso
// real: Fortaleza CEIF, lista 2025 -> 2024 -> 2023; en la primera pasada 2024 se comparó con el 2023 todavía en unidades.
export function verificarLista(docs, opts) {
  const pasada = () => docs.map((pdf) => [pdf, verificar(pdf, opts)]);
  const rs = pasada();
  return rs.some(([, r]) => r.escala?.escalon === 1) ? pasada() : rs;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const docs = flag('--lista') ? readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : ARGS.filter((a) => !a.startsWith('--'));
  if (!docs.length) { console.error('Uso: node tools/verificar.mjs "<pdf>" [--rubros]  |  --lista <archivo> [--rubros]'); process.exit(1); }
  const registro = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const sitio = loadSite();
  for (const [pdf, r] of verificarLista(docs, { registro, sitio, escribirRubros: ARGS.includes('--rubros') })) {
    if (r.error) { console.log(`  ${pdf}: ${r.error}`); continue; }
    console.log(`\n## ${pdf}: ${r.estado.toUpperCase()}  (ingresos ${r.totales.ingresos} · gastos ${r.totales.gastos} · resultado impreso ${r.totales.resultadoImpreso})`);
    for (const c of r.chequeos) console.log(`   ${c.ok === true ? 'ok ' : c.ok === false ? 'NO ' : ' - '} ${c.nombre}: ${c.detalle}`);
    for (const n of r.notas) console.log(`   nota: ${n}`);
    if (r.cola.length) console.log(`   -> ${r.cola.length} caso(s) a la cola (node tools/cola.mjs)`);
  }
}
