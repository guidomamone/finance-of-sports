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

import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { agregarCaso, respuestaDe } from './cola.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { ajustesDe } from './ajustes.mjs';
import { validacionAlDia } from './cache-al-dia.mjs'; // (frenado de Sporting CP) la compuerta de cargar.mjs también en avisarRegistro
import { filasNBB, leerEstadoNBB } from './nbb.mjs';
import { faseResultadoFinal, faseSalida } from './verificar-salida.mjs';
import { faseDudas, faseRespuestas } from './verificar-dudas.mjs';
import { faseCierre, faseAnioAnterior } from './verificar-cierre.mjs';
import { faseEscalones, faseEscalonesD } from './verificar-escalones.mjs';
import { faseLecturas, faseEvaluar } from './verificar-lecturas.mjs';
import { faseVecinos } from './verificar-vecinos.mjs';
import { faseArmar } from './verificar-armar.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
export const { loadSite, parseNumber } = await import('./datos-sitio.mjs');
const { resolverDeporte, cerosDeDeporte } = await import('./deporte-club.mjs'); // la tabla de ceros del deporte del club
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
// Monedas legado con paridad fija al euro (PTE, ITL...: `euroFijo` en data/currency-map.js). Las usa el escalón de paridad del año vecino.
export const EURO_FIJO = (() => { try { return Object.fromEntries([...readFileSync(resolve(ROOT, 'data', 'currency-map.js'), 'utf8').matchAll(/^\s*([A-Z]{3}):\s*\{[^}\n]*euroFijo:\s*([\d.]+)/gm)].map((m) => [m[1], Number(m[2])])); } catch { return {}; } })();
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
export const MULT = { unidades: 1e-6, miles: 1e-3, millones: 1 };
const TOL = 0.01; // millones: la de audit.js
export const r6 = (x) => (x == null ? x : Number(Number(x).toFixed(6)));
export const cerca = (a, b, rel = 0.0005) => Math.abs(a - b) <= Math.max(TOL, rel * Math.abs(b));
// Resolución de un importe impreso en millones (para el redondeo): "155.315" en miles -> 0,001.
export const unidad = (txt, mult) => { const d = (String(txt).match(/[.,](\d{1,2})\)?$/) || [])[1]; return mult * (d ? Math.pow(10, -d.length) : 1); };

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
export const normalizarRenglon = (r) => String(r || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\(\s*[\d.,]+\s*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

// La página (marca "--- pág. N ---") en la que cae una línea del .md: para ubicar una duda que cita "L4157".
export function paginaDeLinea(md, linea) {
  try { const L = readFileSync(resolve(ROOT, md), 'utf8').split('\n'); for (let i = Math.min(linea, L.length) - 1; i >= 0; i--) { const m = L[i].match(/^---\s*pág\.\s*(\d+)\s*---/i); if (m) return Number(m[1]); } } catch { /* sin .md */ }
  return null;
}

// El .filas.json con el estado NBB leído por sus códigos (tools/nbb.mjs), o null si el escalón no corre: el .md no trae el
// estado con códigos, la columna del año no cierra exacto, o el documento tiene un ajuste `fila` (el ajuste manual es el escalón 0 y manda).
export function nbbDe(F, md, pdf, opciones = {}) {
  if (ajustesDe(pdf).some((a) => a.campo === 'fila')) return null;
  let txt; try { txt = readFileSync(resolve(ROOT, md), 'utf8'); } catch { return null; }
  const r = filasNBB(F, txt, opciones);
  if (r) r.bloque.pagina = paginaDeLinea(md, r.bloque.lineas[0]);
  return r;
}
// Los códigos NBB impresos del .md (para comparar con el año vecino), haya o no ajustes: null si no trae el estado con códigos.
export function codigosNBBde(md) { try { return leerEstadoNBB(readFileSync(resolve(ROOT, md), 'utf8')); } catch { return null; } }

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
  const ctx = { pdf, registro, sitio, escribirRubros, e, md, pF };
  Object.assign(ctx, faseEntrada(ctx));
  Object.assign(ctx, faseArmar(ctx));
  Object.assign(ctx, faseVecinos(ctx));
  Object.assign(ctx, faseLecturas(ctx));
  Object.assign(ctx, faseEvaluar(ctx));
  Object.assign(ctx, faseEscalones(ctx));
  Object.assign(ctx, faseEscalonesD(ctx));
  Object.assign(ctx, faseCierre(ctx));
  Object.assign(ctx, faseAnioAnterior(ctx));
  Object.assign(ctx, faseDudas(ctx));
  faseRespuestas(ctx);
  faseResultadoFinal(ctx);
  Object.assign(ctx, faseSalida(ctx));
  const { out } = ctx;
  return out;
}

// Las entradas del documento (.filas.json, .validacion.json, .ubicacion.json), el año y el club.
function faseEntrada(ctx) {
  const { pdf, e, sitio, pF, md, registro } = ctx;
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
  ctx.forzarNotaSub = false; ctx.totIngForz = 0; const notasNotaSub = []; // la nota del subtotal en la primera pasada, ver abajo
  const signoAcum = new Map(); const notasAcum = []; ctx.escalonAcum = false; // escalón "acumulados": fila del financiero (por línea) -> signo de su lado
  const signoFinBloque = new Map(); const notasFinBloque = []; ctx.escalonFinBloque = false; // fila del financiero (por línea) -> signo según el bloque que la contiene
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

  return { nbbV, F, nbbPropio, V, ladosCero, confirmadosPorSumas, notasNotaSub, signoAcum, notasAcum, signoFinBloque, notasFinBloque, partesSubRep, notasSubRep, notaSubtotalLados, U, year, clubId, cd, chequeos, cola, notas, reintentos, gruposAbiertos, pagDe, vigentes, caso };
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
export function avisarRegistro(md, nRubros, registro, out = null) {
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
