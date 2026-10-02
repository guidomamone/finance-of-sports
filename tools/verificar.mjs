#!/usr/bin/env node
// ============================================================================
// tools/verificar.mjs — ETAPA 6 del proceso nuevo: ¿lo que extrajo extraer.mjs es el estado de resultados correcto, completo y con los
// números del papel? Script determinista, GRATIS, sin IA (un LLM no sirve para verificar aritmética: FinVerBench, arXiv 2605.29586).
//
// POR QUÉ (Versión 324; Admin/HANDOFF-pipeline.md, "El proceso nuevo", etapa 6). Es la red que ataja los errores de las etapas anteriores
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

import { readFileSync, writeFileSync, existsSync, appendFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { agregarCaso, respuestaDe, cerrarObsoletos, respuestaPorDetalle } from './cola.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { VERSION_AMPLIADO } from './indice-bloques.mjs';
import { norm as normNum } from './verify-numbers.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { loadSite, parseNumber } = await import('./proponer-carga.mjs');
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
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
// escala. Reescrita en la Versión 327; hasta la 326 sumaba TODOS los renglones que decían desglosar el renglón y comparaba con 0,5% de
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
// Medición antes de adoptarla (Versión 327, Admin/CHANGELOG.md): las 26 extracciones del test por página + UC 2025.
// ============================================================================
// Renglón normalizado para la clave de una duda por tema: minúsculas, sin acentos, sin "(1)" ni números de nota.
const normalizarRenglon = (r) => String(r || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\(\s*[\d.,]+\s*\)/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

// La página (marca "--- pág. N ---") en la que cae una línea del .md: para ubicar una duda que cita "L4157".
function paginaDeLinea(md, linea) {
  try { const L = readFileSync(resolve(ROOT, md), 'utf8').split('\n'); for (let i = Math.min(linea, L.length) - 1; i >= 0; i--) { const m = L[i].match(/^---\s*pág\.\s*(\d+)\s*---/i); if (m) return Number(m[1]); } } catch { /* sin .md */ }
  return null;
}

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

export function verificar(pdf, { registro, sitio, escribirRubros = false }) {
  const e = registro.find((x) => x.pdf === pdf) || {}; const md = e.md || pdf.replace(/\.pdf$/, '.md');
  const pF = resolve(ROOT, derivado(md, '.filas.json', { crear: false }));
  if (!existsSync(pF)) return { error: 'falta el .filas.json (extraer.mjs)' };
  const F = JSON.parse(readFileSync(pF, 'utf8'));
  const pV = resolve(ROOT, derivado(md, '.validacion.json', { crear: false }));
  const V = existsSync(pV) ? JSON.parse(readFileSync(pV, 'utf8')) : null;
  const pU = resolve(ROOT, derivado(md, '.ubicacion.json', { crear: false }));
  const U = existsSync(pU) ? JSON.parse(readFileSync(pU, 'utf8')) : {};
  // Sin fecha de cierre detectada: se deduce de los documentos vecinos del club (tools/cierre-vecinos.mjs, Versión 342), con nota.
  const cierreDeducido = e.periodo?.cierre ? null : cierrePorVecinos(pdf, registro);
  const year = e.periodo?.cierre ? Number(e.periodo.cierre.slice(0, 4)) : cierreDeducido?.anio ?? null;
  const clubId = clubDeRuta(pdf).clubId; const cd = clubId ? sitio.generic[clubId] : null;
  const chequeos = []; const cola = []; const notas = [];
  if (cierreDeducido) notas.push(`fecha de cierre ${cierreDeducido.cierre} ${cierreDeducido.evidencia}`);
  // REINTENTOS (Versión 336): desgloses (notas o anidados) con 2+ filas que no suman. No frenan (queda el renglón, que es correcto), pero
  // marcan el documento para el camino de error: lote.mjs --reintentar vuelve a localizar con el índice ampliado y a extraer con esta lista.
  const reintentos = [];
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

  // 2. notas: renglón del estado reemplazado por su desglose si cierra (escala deducida del cierre)
  // DESGLOSES ANIDADOS (Versión 335, diseño aprobado por Guido): una hoja de una nota puede, a su vez, estar desglosada por otro cuadro (filas
  // con detalla_a = la etiqueta de esa hoja). Se reemplaza con la MISMA regla (cerrarNota: tiene que sumar), hasta 3 niveles. Caso real, UC
  // 2021-2025: "Ingresos Comerciales" de la nota 19 se abre con la columna "Comerciales" de la nota de segmentos. Si no suma, queda la hoja.
  const abrirAnidadas = (hojas, campo, nivel) => {
    if (nivel > 3) return hojas;
    const usadas = new Set(hojas);
    return hojas.flatMap((h) => {
      const sub = filas.filter((x) => x.detalla_a && x !== h && !usadas.has(x) && x.detalla_a.trim() === String(h.etiqueta).trim());
      const c = sub.length >= 2 ? cerrarNota(Math.abs(h[campo] || 0), sub, campo, h.u || 0) : null;
      if (!c) { if (conNotas && sub.length >= 2 && campo === 'M') { if (!reintentos.some((x) => x.renglon === h.etiqueta)) notas.push(`el desglose de "${h.etiqueta}" (${sub.length} filas) no suma la fila: quedó la fila`); if (!reintentos.some((x) => x.renglon === h.etiqueta)) reintentos.push({ renglon: h.etiqueta, suma: r6(sub.filter((x) => x.tipo === 'renglon').reduce((a, x) => a + Math.abs(x.M || 0), 0)), objetivo: r6(Math.abs(h.M || 0)) }); } return [h]; }
      return abrirAnidadas(c.hojas.map((x) => ({ ...x, [campo]: x.valorNota * Math.sign(h[campo] || 1), origen: `${h.origen} > desglose de "${h.etiqueta}"` })), campo, nivel + 1);
    });
  };
  const lineasDeLado = (lado, campo = 'M') => {
    const out = [];
    const delLado = estado.filter((f) => f.lado === lado);
    for (const [k, f] of delLado.entries()) {
      // un total/subtotal cuenta como línea solo si NO es la suma de renglones de arriba del mismo lado (Forest: "Turnover" total + venta de jugadores)
      // (y tampoco la suma de los renglones que tiene ABAJO: el estilo "Ingresos 500" y debajo sus componentes)
      if (f.tipo !== 'renglon') {
        if (f.tipo === 'resultado') continue;
        const esSumaDe = (lista) => { let acc = 0; for (let j = 0; j < lista.length; j++) { acc += Math.abs(lista[j][campo] || 0); if (j >= 1 && cerca(acc, Math.abs(f[campo] || 0))) return true; } return false; };
        const arriba = delLado.slice(0, k).filter((x) => x.tipo === 'renglon').reverse(); const abajo = delLado.slice(k + 1).filter((x) => x.tipo === 'renglon');
        if (esSumaDe(arriba) || esSumaDe(abajo)) continue;
      }
      // Todas las filas de nota que dicen desglosar este renglón (renglones Y subtotales/totales: la estructura impresa hace falta para
      // saber qué suma qué; ver cerrarNota()).
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === f.etiqueta.trim());
      const obj = Math.abs(f[campo] || 0);
      const c = hijas.length >= 2 ? cerrarNota(obj, hijas, campo, f.u || 0) : null;
      if (c) out.push(...abrirAnidadas(c.hojas.map((h) => ({ ...h, [campo]: h.valorNota, origen: `nota que desglosa "${f.etiqueta}"` })), campo, 1));
      else { out.push({ ...f, [campo]: Math.abs(f[campo] || 0), origen: 'estado' }); if (conNotas && hijas.length >= 2 && campo === 'M') { const sr = r6(hijas.filter((h) => h.tipo === 'renglon').reduce((a, h) => a + Math.abs(h.M || 0), 0)); if (!reintentos.some((x) => x.renglon === f.etiqueta)) notas.push(`la nota de "${f.etiqueta}" no suma el renglón (${sr} contra ${r6(obj)}, sumando sus renglones): quedó el renglón del estado`); if (!reintentos.some((x) => x.renglon === f.etiqueta)) reintentos.push({ renglon: f.etiqueta, suma: sr, objetivo: r6(obj) }); } }
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
    // el año del otro documento: su fecha de cierre o, si no la tiene, la deducida de sus vecinos (Versión 344: UC 2010 contra 2011)
    const anioDe = (x) => (x.periodo?.cierre ? Number(x.periodo.cierre.slice(0, 4)) : cierrePorVecinos(x.pdf, registro)?.anio ?? null);
    // De los documentos del club con ese año, el que pasó por extraer. Hasta la Versión 361 se tomaba el PRIMERO del año y, si no tenía
    // .filas.json, no había chequeo: Fortaleza CEIF 2023 nunca se comparó con 2024 porque el primero de 2024 es certificacion-ef-2024.pdf.
    const filasDe = (x) => resolve(ROOT, derivado(x.md, '.filas.json', { crear: false }));
    const otro = registro.find((x) => x.pdf !== pdf && x.pdf.startsWith(carpeta + '/') && x.md && existsSync(filasDe(x)) && anioDe(x) === year + dy);
    if (!otro) return null;
    const pF2 = filasDe(otro);
    const pU2 = resolve(ROOT, derivado(otro.md, '.ubicacion.json', { crear: false })); const U2 = existsSync(pU2) ? JSON.parse(readFileSync(pU2, 'utf8')) : {};
    const pV2 = resolve(ROOT, derivado(otro.md, '.verificacion.json', { crear: false })); const esc2 = existsSync(pV2) ? JSON.parse(readFileSync(pV2, 'utf8')).escala : null;
    const k2 = !MULT[U2.escala] && esc2?.escalon === 1 ? esc2.factor : 1;
    return { otro, U2, k2, anclado: !!MULT[U2.escala] || esc2?.escalon === 1, A2: armar(JSON.parse(readFileSync(pF2, 'utf8')), U2, false, k2) };
  };
  // compara los ingresos del año en común (mi columna actual con la "año anterior" del siguiente, o al revés) con mi documento a escala k
  const compararVecino = (dy, V2, k) => {
    const [campoMio, campoSuyo] = dy === 1 ? ['M', 'A'] : ['A', 'M'];
    const sumaDe = (arr, c) => arr.reduce((a, f) => a + (f[c] || 0), 0);
    const mio = sumaDe(armar(F, U, false, k).lineasDeLado('ingreso', campoMio), campoMio); const suyo = sumaDe(V2.A2.lineasDeLado('ingreso', campoSuyo), campoSuyo);
    return { mio, suyo, ok: suyo ? cerca(mio, suyo, 0.02) : null };
  };
  const vecinosDoc = [[1, vecinoDe(1)], [-1, vecinoDe(-1)]].filter(([, v]) => v);

  // ESCALERA DE ESCALA (Versión 362, diseño aprobado por Guido el 2026-10-01). Caso que la originó: Fortaleza CEIF 2023 y 2024 dicen
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
  const fin = estado.filter((f) => f.lado === 'financiero' && f.tipo === 'renglon'); const imp = estado.filter((f) => f.lado === 'impuesto' && f.tipo === 'renglon');
  const suma = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);
  const conSigno = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);

  // 3. totales y resultado: LA ESCALERA DE LECTURAS (Versión 342, flujo aprobado por Guido el 2026-10-01). Se prueba una lectura; si no cierra
  // con un número impreso (resultado o totales), la siguiente, que agrega una interpretación más a la anterior. Gana la primera que cierra y
  // queda escrito cuál fue. El camino limpio es la lectura 0: si cierra, ningún escalón se usa. Ningún escalón se acepta si no cierra.
  //   0  las filas tal cual las extrajo la IA
  //   1  + si no hay resultado final, "resultado antes de impuestos" (sin el impuesto). UC 2011-2013: el estado elegido termina en el impuesto.
  //   2  + el total impreso puede ser un RENGLÓN más del estado (las otras líneas se suman aparte). UC 2012: "total de ingresos" era
  //        "Ingresos de actividades ordinarias 7.450.809" y aparte estaba "Otros ingresos por función 30.426".
  //   3  + los renglones del estado sin lado (lado 'otro') entran según su signo, con la misma convención de signos que los gastos del estado.
  //        UC 2010-2014: "Otras ganancias (pérdidas) (288.444)" quedaba afuera y el resultado no cerraba por exactamente ese importe.
  // Si ninguna cierra: queda la lectura 0 con sus chequeos fallidos (camino de error: reintento, después cola). Si el documento no tiene NINGÚN
  // número impreso para cerrar (ni totales, ni resultado, ni antes de impuestos), eso también es un fallo: antes pasaba como OK sin chequeo.
  const tI = F.total_ingresos ? Math.abs(parseNumber(F.total_ingresos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const tG = F.total_gastos ? Math.abs(parseNumber(F.total_gastos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const ANTES_RE = /antes\s+de(l)?\s+impuesto|before\s+(income\s+)?tax|vor\s+(ertrag)?steuern|antes\s+dos\s+impostos|avant\s+imp[oô]t|voor\s+belasting|ante\s+imposte/i;
  // EL RESULTADO IMPRESO SE LEE POR SU ETIQUETA (Versión 361): si la línea que extraer marcó como "resultado del ejercicio" dice "antes de
  // impuestos", es el resultado ANTES de impuestos (lectura 1), no el final. Caso real: Fortaleza CEIF 2023-2025 (las notas hacen de estado):
  // F.resultado apuntaba a L719 "Utilidad contable antes de impuesto" 1.609.817 y se le restaba el impuesto; sin restarlo cierra exacto.
  const filaDeRes = F.resultado ? estado.find((f) => f.linea === F.resultado.linea && f.tipo === 'resultado') : null;
  const resEsAntes = !!(filaDeRes && ANTES_RE.test(filaDeRes.etiqueta));
  const resFinal = F.resultado && !resEsAntes ? (parseNumber(F.resultado.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const filaAntes = estado.find((f) => f.tipo === 'resultado' && ANTES_RE.test(f.etiqueta) && isFinite(f.M));
  const gastosNeg = (() => { const g = estado.filter((f) => f.lado === 'gasto' && f.tipo === 'renglon' && isFinite(f.M) && f.M); return g.length ? g.filter((f) => f.M < 0).length >= g.length / 2 : true; })();
  const otros = estado.filter((f) => f.lado === 'otro' && f.tipo === 'renglon' && isFinite(f.M) && f.M);
  const ing0 = lineasDeLado('ingreso'); const gas0 = lineasDeLado('gasto');
  const NOMBRES_LECTURA = ['las filas tal cual', 'resultado antes de impuestos si no hay resultado final', 'el total impreso puede ser un renglón', 'renglones sin lado según su signo'];
  const evaluar = (nivel) => {
    const ch = []; let ing = [...ing0]; let gas = [...gas0];
    if (nivel >= 3) for (const f of otros) { const esGasto = gastosNeg ? f.M < 0 : f.M > 0; (esGasto ? gas : ing).push({ ...f, lado: esGasto ? 'gasto' : 'ingreso', M: Math.abs(f.M), origen: `estado (sin lado en el documento: entra como ${esGasto ? 'gasto' : 'ingreso'} por su signo, impreso ${f.M < 0 ? 'en negativo' : 'en positivo'}; lectura 3)` }); } // el origen le llega a Jev y a Claude como sección (Versión 346)
    const ajuste = (arr, total, nombre, lineaTotal) => {
      if (total == null || !isFinite(total)) { ch.push({ nombre: `total de ${nombre}`, ok: null, detalle: 'el documento no lo imprime' }); return arr; }
      const sm = suma(arr); const tolRed = Math.max(TOL, 0.5 * arr.reduce((a, f) => a + (f.u || 0), 0));
      if (cerca(sm, total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(sm)} = ${r6(total)}` }); return arr; }
      // Un total que es UNA fila (un total de verdad, o desde la lectura 2 también un renglón: la fila de la línea que extraer marcó como total),
      // con otras líneas del mismo lado fuera de ese total. Nottingham Forest: "Turnover" + "Profit on disposal" aparte.
      const filaTotal = estado.find((f) => f.tipo !== 'renglon' && cerca(Math.abs(f.M || 0), total)) || (nivel >= 2 ? estado.find((f) => (lineaTotal != null && f.linea === lineaTotal) || (f.tipo === 'renglon' && cerca(Math.abs(f.M || 0), total))) : null);
      if (filaTotal) {
        const deEsa = arr.filter((f) => f.etiqueta === filaTotal.etiqueta || String(f.origen || '').startsWith(`nota que desglosa "${filaTotal.etiqueta}"`));
        if (deEsa.length && cerca(suma(deEsa), total)) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `"${filaTotal.etiqueta}" ${r6(total)} cierra; además se suman ${arr.length - deEsa.length} línea(s) fuera de ese total (${r6(sm - total)})` }); return arr; }
      }
      if (Math.abs(sm - total) <= tolRed) { ch.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(sm)} contra ${r6(total)}: fila "Diferencia de redondeo" de ${r6(total - sm)}` }); return [...arr, { etiqueta: 'Diferencia de redondeo', lado: nombre === 'ingresos' ? 'ingreso' : 'gasto', M: total - sm, origen: 'redondeo' }]; }
      ch.push({ nombre: `total de ${nombre}`, ok: false, detalle: `las líneas suman ${r6(sm)} y el total impreso dice ${r6(total)}` });
      return arr;
    };
    ing = ajuste(ing, tI, 'ingresos', F.total_ingresos?.linea); gas = ajuste(gas, tG, 'gastos', F.total_gastos?.linea);
    // resultado: ingresos - gastos + financiero + impuesto, probando los signos de financiero e impuesto (cada documento los imprime a su manera)
    let objetivo = resFinal; let conImp = true; let nombreRes = 'resultado del ejercicio';
    if ((objetivo == null || !isFinite(objetivo)) && nivel >= 1 && filaAntes) { objetivo = filaAntes.M; conImp = false; nombreRes = 'resultado antes de impuestos'; }
    let okRes = null; let lect = null;
    if (objetivo != null && isFinite(objetivo)) {
      for (const [sf, si, nm] of [[1, 1, 'como impresos'], [-1, -1, 'financiero e impuesto invertidos'], [1, -1, 'impuesto invertido'], [-1, 1, 'financiero invertido']]) {
        if (!conImp && si === -1) continue;
        const pat = suma(ing) - suma(gas) + sf * conSigno(fin) + (conImp ? si * conSigno(imp) : 0);
        if (cerca(Math.abs(pat), Math.abs(objetivo))) { okRes = true; lect = nm; break; }
      }
      if (!okRes) okRes = false;
      ch.push({ nombre: nombreRes, ok: okRes, detalle: okRes ? `cierra (${lect})` : `ingresos ${r6(suma(ing))} - gastos ${r6(suma(gas))} ± financiero ${r6(conSigno(fin))}${conImp ? ` ± impuesto ${r6(conSigno(imp))}` : ''} no da el impreso ${r6(objetivo)}` });
    } else ch.push({ nombre: 'resultado del ejercicio', ok: null, detalle: 'extraer.mjs no encontró el resultado impreso' });
    const okTot = ch.filter((c) => c.nombre.startsWith('total')).map((c) => c.ok);
    const cierra = okRes === true ? !okTot.includes(false) : okRes === null && okTot.includes(true) && !okTot.includes(false);
    return { ing, gas, ch, okRes, lect, cierra, nivel, objetivo };
  };
  let E = null; let E0 = null;
  for (const n of [0, 1, 2, 3]) { const e = evaluar(n); if (!E0) E0 = e; if (e.cierra) { E = e; break; } }
  const sinNumero = !E && E0.ch.every((c) => c.ok === null) && !filaAntes;
  if (!E) E = E0;
  let ing = E.ing; let gas = E.gas; chequeos.push(...E.ch);
  let okRes = E.okRes; let lectura = E.lect; const res = E.objetivo ?? resFinal;
  if (E.cierra && E.nivel > 0) { chequeos.push({ nombre: 'lectura', ok: true, detalle: `cerró con la lectura ${E.nivel} (${NOMBRES_LECTURA.slice(1, E.nivel + 1).join(' + ')})` }); notas.push(`la lectura base no cerraba; cerró con la lectura ${E.nivel}`); }
  if (sinNumero) chequeos.push({ nombre: 'número impreso para cerrar', ok: false, detalle: 'el documento no imprime totales ni resultado en los bloques elegidos: no hay cómo confirmar las sumas' });

  // 1. números no confirmados contra el PDF: la aritmética los confirma si todo cerró; si no, se prueba con lo que leyó la segunda fuente
  const cerro = okRes === true || chequeos.filter((c) => c.nombre.startsWith('total')).some((c) => c.ok === true);
  const usadas = [...ing, ...gas, ...fin, ...imp];
  for (const nc of V?.noConfirmados || []) {
    const fila = usadas.find((f) => f.linea === nc.linea && normNum(String(f.actual || '')).includes(normNum(nc.numero)));
    if (!fila) continue; // número de otra columna o de una fila que no se usa
    if (cerro) { notas.push(`línea ${nc.linea}: ${nc.numero} no está en el ${V.modo === 'digital' ? 'texto del PDF' : 'segunda lectura'}, pero las sumas cierran con él`); continue; }
    const r = caso('numero-no-confirmado', `${nc.linea}:${nc.numero}`, `En "${fila.etiqueta}" la transcripción dice ${nc.numero}${nc.segundaLeyo ? ` y la segunda lectura del PDF dice ${nc.segundaLeyo}` : ` y no se pudo confirmar contra el PDF${nc.sinSegunda ? ' (sin segunda lectura de esa página)' : ''}`}. Las sumas no cierran.`, { pagina: nc.pagina, lineas: [nc.linea, nc.linea], propuesta: nc.segundaLeyo ? `usar ${nc.segundaLeyo}` : null });
    if (r?.decision === 'corregir' && r.valor) { fila.M = (parseNumber(r.valor) ?? fila.M / mult(fila.bloque)) * mult(fila.bloque); notas.push(`línea ${nc.linea}: valor corregido por Guido (${r.valor})`); }
  }

  // 4. año anterior: la columna comparativa contra lo ya cargado
  const prev = cd && year ? year - 1 : null; const metaPrev = prev ? cd.fiscalYearMeta?.[prev] : null;
  if (metaPrev) {
    const ingA = lineasDeLado('ingreso', 'A'); const sA = suma(ingA, 'A');
    const prodI = (cd.revenueLinesByYear?.[prev] || []).reduce((a, l) => a + l.amountNative, 0);
    const okA = prodI ? cerca(sA, prodI, 0.02) : null;
    chequeos.push({ nombre: 'año anterior cargado', ok: okA, detalle: prodI ? `la columna ${prev} de este documento suma ingresos ${r6(sA)}; el sitio tiene ${r6(prodI)}` : `el sitio tiene ${prev} sin líneas de ingresos` });
    if (okA === false) caso('anio-anterior', String(prev), `La columna del año anterior (${prev}) de este documento suma ingresos ${r6(sA)} y el sitio tiene ${r6(prodI)} para ese año. Puede ser: otra tabla u otro perímetro (revisar el documento), otra escala, o un error del año ya cargado (revisar producción).`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  }
  // 4b. AÑO VECINO EN OTRO DOCUMENTO (agregado el 2026-10-01 al medir: de los 159 años nuevos de clubes existentes solo 2 tienen el año
  // anterior cargado, porque casi todos son años VIEJOS que completan la serie hacia atrás; pero 101 tienen, en la misma carpeta y ya
  // transcripto, el documento del AÑO SIGUIENTE, cuya columna "año anterior" es este año). Si ese documento (o el del año anterior) ya pasó
  // por extraer.mjs, sus columnas se comparan con las de este. Por eso conviene procesar años CONSECUTIVOS del mismo club en el mismo lote.
  const vecinos = [];
  // (el documento vecino y su escala: vecinoDe(), arriba, junto a la escalera de escala)
  for (const [dy, v] of vecinosDoc) {
    const { otro } = v;
    const { mio, suyo, ok } = compararVecino(dy, v, kEsc);
    vecinos.push(ok);
    chequeos.push({ nombre: `documento del año ${year + dy}`, ok, detalle: `ingresos de ${dy === 1 ? year : year - 1}: ${r6(dy === 1 ? mio : suyo)} en ${dy === 1 ? 'este documento' : otro.pdf.split('/').pop()} y ${r6(dy === 1 ? suyo : mio)} en ${dy === 1 ? otro.pdf.split('/').pop() : 'este documento'} (columna del año anterior)` });
    if (ok === false) caso('anio-vecino', String(year + dy), `Los ingresos de ${dy === 1 ? year : year - 1} no coinciden entre este documento y ${otro.pdf.split('/').pop()} (${r6(mio)} contra ${r6(suyo)}). Puede ser una reexpresión del año en el documento siguiente (pasa), otra tabla u otro perímetro.`, { pagina: estado[0]?.pagina });
  }
  if (!metaPrev) {
    chequeos.push({ nombre: 'año anterior cargado', ok: null, detalle: prev ? `el sitio no tiene ${prev}: este chequeo no se puede hacer` : 'club nuevo' });
    if (vecinos.includes(true)) { /* un documento vecino confirmó las cifras: no hace falta el caso "primer año" */ } else
    caso('primer-anio', String(year), `Primer año automático de este club${clubId ? '' : ' (club nuevo)'}: no hay año anterior cargado para comparar. Revisar que los ingresos (${r6(suma(ing))}), los gastos (${r6(suma(gas))}) y el resultado coincidan con el estado de resultados impreso.`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  }
  // un total o el resultado que no cierran -> cola (salvo que Guido ya lo haya aceptado)
  for (const c of chequeos.filter((x) => x.ok === false && x.nombre !== 'año anterior cargado')) caso('no-cierra', c.nombre, `${c.nombre}: ${c.detalle}. Revisar si falta o sobra alguna fila, o si hay un renglón del lado equivocado.`, { pagina: estado[0]?.pagina, lineas: estado.length ? [Math.min(...estado.map((f) => f.linea)), Math.max(...estado.map((f) => f.linea))] : null });
  // DUDAS de localizar.mjs y de extraer.mjs (Versión 327). Hasta la 326 solo llegaban a la cola las de extraer, y todas con la página del
  // estado de resultados aunque hablaran de una nota de otra página; las de localizar quedaban en el .ubicacion.json sin que nadie las viera.
  // Caso real, UC 2025: localizar avisó que las notas 20 (pág. 75 del visor) y 21 (pág. 76) tenían la misma tabla —el club imprimió la de
  // gastos de administración bajo el título de costo de ventas— y la duda no llegó a Guido. Ahora:
  //   - llegan las dos, cada una con la página y las líneas del primer bloque que nombra (o de la línea "L4157" que cite el texto);
  //   - solo las que la IA marcó `afecta_carga` (puede cambiar qué filas o qué importe se carga, más que el redondeo); el resto queda en las
  //     notas del .verificacion.json. Caso real del otro lado, también UC 2025: "Remuneración 1.790.062 en una tabla y 1.790.063 en la otra"
  //     llegó a la cola y es un peso sobre 1,8 millones (pedido de Guido: una diferencia de esa magnitud no va a la cola).
  //   - las dudas en el formato viejo (texto suelto, archivos anteriores a la Versión 327) se tratan como afecta_carga = true.
  const dudaComoObjeto = (d) => (typeof d === 'string' ? { texto: d, bloques: [...new Set(d.match(/\bb\d+\b/g) || [])], afecta_carga: true } : d);
  for (const [origen, lista] of [['localizar', U.dudas || []], ['extraer', F.dudas || []]]) {
    for (const d of lista.map(dudaComoObjeto)) {
      if (!d.afecta_carga) { notas.push(`duda de ${origen} que no afecta la carga: ${d.texto}`); continue; }
      const b = (d.bloques || []).map((id) => U.bloques?.[id]).find(Boolean);
      const ls = (d.texto.match(/\bL(\d+)\b/g) || []).map((x) => Number(x.slice(1)));
      const lineas = ls.length ? [Math.min(...ls), Math.max(...ls)] : b ? b.lineas : null;
      const pagina = ls.length ? paginaDeLinea(md, ls[0]) ?? b?.pagina : b?.pagina ?? estado[0]?.pagina;
      // PREGUNTA DE SÍ O NO (pedido de Guido, 2026-10-01: "necesito que me hagas la pregunta concreta, no exploratoria"). Desde este cambio
      // localizar y extraer escriben cada duda como una pregunta que se contesta sí o no, con su propuesta; la cola muestra eso. Las dudas en
      // formato viejo (sin `pregunta`) se muestran con su texto, como antes.
      const que = d.pregunta ? `${d.pregunta}  (por qué: ${d.texto})` : `La IA de ${origen === 'localizar' ? 'localizar (qué bloques son el estado y sus notas)' : 'extraer (las filas)'} dejó esta duda: ${d.texto}`;
      // POR TEMA (Versión 341, diseño aprobado por Guido): si la IA clasificó la duda en un tema de la lista fija (no 'otro'), se reconoce por
      // club + tema + renglón, no por el texto. Si Guido ya la contestó en CUALQUIER año del club, se aplica sola y no vuelve a la cola.
      const propuesta = d.propuesta ? `${d.propuesta} (responder aceptar si estás de acuerdo; corregir --valor "${d.propuesta === 'sí' ? 'no' : 'sí'}" si no)` : null;
      if (d.tema && d.tema !== 'otro') {
        const club = clubId || pdf.split('/')[2];
        const det = `${club}|${d.tema}|${normalizarRenglon(d.renglon)}`;
        const ya = respuestaPorDetalle('verificar', 'duda-tema', det);
        if (ya) { notas.push(`duda de ${origen} ya contestada para el club (${d.tema}, "${d.renglon || '-'}"): ${ya.resp.decision}${ya.resp.valor ? ` ${ya.resp.valor}` : ''}, en ${ya.caso.pdf.split('/').pop()}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        // ESCALÓN 2 DE LAS DUDAS (Versión 346, diseño aprobado por Guido): la aritmética la confirma. Si la escalera de lecturas cerró con un
        // número impreso, ningún año vecino da distinto, el tema es de los que las sumas pueden confirmar y la propuesta de la IA es "sí" (lo que
        // extraer ya aplicó), se acepta sola. Perímetro, cuadro de otro año, fila ilegible y "otro" nunca: un perímetro equivocado cierra igual.
        // Caso real: de las 5 preguntas de UC 2010-2014 que Guido contestó "sí" en un minuto, 4 eran de este tipo.
        // TEMA "ESCALA" (Versión 363): las sumas NO la confirman (cerrar es invariante a la escala del documento entero; Fortaleza CEIF 2023 tenía
        // aceptadas a la vez "¿están en miles?" y "¿están en unidades y no en miles?", las dos con propuesta "sí"). La contesta la escalera de
        // escala: si el documento la tomó del año vecino (escalón 1), esa es la respuesta, sea cual sea la propuesta de la IA. Si no, a la cola.
        if (d.tema === 'escala' && escala.escalon === 1) { notas.push(`duda de ${origen} contestada por el año vecino (escala: ${escala.valor}, de ${escala.de}): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        if (E.cierra && !vecinos.includes(false) && ['usar-cuadro-por-segmento', 'cuadro-duplicado', 'columna'].includes(d.tema) && d.propuesta === 'sí') { notas.push(`duda de ${origen} confirmada por las sumas (${d.tema}, "${d.renglon || '-'}"): ${d.pregunta}`); vigentes.push(`${pdf}|verificar|duda-tema|${det}`); continue; }
        caso('duda-tema', det, que, { pagina, lineas, propuesta });
        continue;
      }
      caso(`duda-de-${origen}`, (d.pregunta || d.texto).slice(0, 80), que, { pagina, lineas, propuesta });
    }
  }

  // ESCALERA DEL RESULTADO FINAL (Versión 364, diseño aprobado por Guido el 2026-10-02). Si se cerró contra "resultado antes de impuestos"
  // (lectura 1), el resultado final es antes ± impuesto, y el signo con que el documento imprime el impuesto no lo dice: hasta la Versión 363
  // se SUMABA el impuesto tal como está impreso (UC 2013: 57.521 + 163.095 = 220.616), y en Fortaleza CEIF 2025 eso daba 685.847 + 372.407 =
  // 1.058.254 cuando la nota de patrimonio imprime "Resultados del ejercicio 313.440" (= 685.847 − 372.407, .md L1047).
  //   candidatos: antes + impuesto, antes − impuesto
  //   ESCALÓN 0  el candidato que está IMPRESO en el .md de este documento (cualquier número, a media unidad impresa de redondeo)
  //   ESCALÓN 1  el que imprime el documento del año SIGUIENTE en una columna que no es la primera (la del año anterior)
  //   COMPUERTA  un solo candidato coincide. Ninguno o los dos -> cola (Fortaleza 2023: impreso 1.021.768, ninguno de los dos).
  let resParaCargar = res; let resultadoFinal = null;
  if (E.cierra && E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok) && Math.abs(conSigno(imp)) > TOL) {
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
      const r = caso('resultado-final', String(year), `¿Ninguno de los dos es el resultado del ejercicio? El resultado antes de impuestos (${r6(res)}) cierra, pero ni ${r6(cands[1])} (restando el impuesto ${r6(Math.abs(conSigno(imp)))}; impreso sería ${enMd}) ni ${r6(cands[0])} (sumándolo) aparecen impresos${sig ? ` (tampoco en ${sig.otro.pdf.split('/').pop()}, columna del año anterior)` : ''}. Buscá en el .md el resultado del ejercicio impreso (nota de patrimonio, "Resultados del ejercicio"): si está, corregir --valor con ese número tal cual está impreso; si no, descartar.`, { pagina: pagDe(filaAntes?.bloque) });
      // Respuesta de Guido (corregir --valor con el resultado del ejercicio impreso): ese es el resultado final, y el IMPUESTO pasa a ser la
      // diferencia (antes de impuestos − final), con la misma convención que el escalón "restado" (2024-2025). Si no, cargar.mjs encontraría la
      // diferencia y frenaría. Caso real, decidido por Guido el 2026-10-02 ("que cierre por la fuerza"): Fortaleza CEIF 2023, final 1.021.768
      // (patrimonio, .md L1099; también el documento 2024, columna 2023), antes de impuestos 1.609.817, impuesto 588.049 en vez del "Total
      // impuesto a cargo" 589.589 de la conciliación (el contable no es el fiscal).
      if (r?.decision === 'corregir' && r.valor && isFinite(parseNumber(r.valor))) {
        resParaCargar = parseNumber(r.valor) * mImp; const impAntes = conSigno(imp);
        imp.splice(0, imp.length, { ...(imp[0] || {}), etiqueta: `${imp[0]?.etiqueta || 'Impuesto'} (deducido: antes de impuestos − resultado final impreso)`, M: res - resParaCargar, lado: 'impuesto', tipo: 'renglon' });
        resultadoFinal = { valor: r6(resParaCargar), impuesto: 'deducido', escalon: 'respuesta de Guido', donde: 'cola', impuestoImpreso: r6(impAntes), impuestoDeducido: r6(res - resParaCargar) };
        chequeos.push({ nombre: 'resultado final', ok: true, detalle: `${r6(resParaCargar)} por respuesta de Guido (${r.valor}); impuesto deducido ${r6(res - resParaCargar)} en vez de ${r6(impAntes)}` });
        notas.push(`resultado final ${r6(resParaCargar)}: respuesta de Guido en la cola (${r.valor}); el impuesto se dedujo como antes de impuestos − final`);
      }
      else { resParaCargar = null; chequeos.push({ nombre: 'resultado final', ok: false, detalle: `ni ${r6(cands[1])} (antes − impuesto) ni ${r6(cands[0])} (antes + impuesto) están impresos de una sola forma en este documento${sig ? ' ni en el del año siguiente' : ''}` }); }
    }
  } else if (E.ch.some((c) => c.nombre === 'resultado antes de impuestos' && c.ok)) resParaCargar = res + conSigno(imp);

  const obsoletos = cerrarObsoletos(pdf, 'verificar', vigentes);
  if (obsoletos) notas.push(`${obsoletos} caso(s) viejos de la cola se cerraron como obsoletos (esta corrida ya no los levanta)`);
  const yaReintentado = Number(U.indiceAmpliado === true ? 1 : U.indiceAmpliado || 0) >= VERSION_AMPLIADO; // reintentado con el índice ampliado vigente
  const out = { pdf, md, generado: new Date().toISOString(), estado: cola.length ? 'cola' : 'ok', clubId, year, escala, cola, chequeos, notas,
    reintentar: reintentos.length && !yaReintentado ? reintentos : null, reintentado: yaReintentado, faltasDesglose: reintentos.length ? reintentos : null, // faltasDesglose: siempre, para tools/diagnostico-desglose.mjs
    // resultadoParaCargar (Versión 344; desde la 364 sale de la escalera del resultado final): si cerró contra "resultado antes de impuestos",
    // el resultado del ejercicio es ese ± el impuesto, el que esté impreso; null si no se pudo confirmar (va a la cola). cargar.mjs hace su
    // tie-out contra este número.
    totales: { ingresos: r6(suma(ing)), gastos: r6(suma(gas)), financiero: r6(conSigno(fin)), impuesto: r6(conSigno(imp)), resultadoImpreso: r6(res), resultadoParaCargar: r6(resParaCargar), resultadoFinal, lecturaSignos: lectura },
    lineas: [...ing, ...gas].map((f) => ({ etiqueta: f.etiqueta, lado: f.lado, M: r6(f.M), pagina: f.pagina, linea: f.linea ?? null, origen: f.origen || 'estado' })),
    financiero: fin.map((f) => ({ etiqueta: f.etiqueta, M: r6(f.M), linea: f.linea })), impuesto: imp.map((f) => ({ etiqueta: f.etiqueta, M: r6(f.M), linea: f.linea })) };
  writeFileSync(resolve(ROOT, derivado(md, '.verificacion.json')), JSON.stringify(out, null, 1));
  // --rubros: la lista de rubros para la categorización de siempre (etapa 7), con las líneas verificadas. Club: el id del sitio o, si es nuevo,
  // el slug de la carpeta (el mismo id provisorio que usa el pipeline).
  if (escribirRubros) {
    const club = clubId || pdf.split('/')[2].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const rubros = out.lineas.filter((l) => l.origen !== 'redondeo').map((l) => ({ label: l.etiqueta, lado: l.lado === 'ingreso' ? 'revenue' : 'expense', page: l.pagina, section: l.origen, values: [l.M] }));
    writeFileSync(resolve(ROOT, derivado(md, '.rubros.json')), JSON.stringify({ md, pdf, club, year, generatedAt: new Date().toISOString(), origen: 'verificar.mjs (proceso nuevo, Versión 324)', rubros }, null, 1));
    if (out.estado === 'ok') avisarRegistro(md, rubros.length, registro);
  }
  return out;
}

// AVISO AL REGISTRO VIEJO (Versión 349, ok de Guido). Jev, Claude y cargar.mjs solo trabajan los documentos `listo-para-jev` del registro
// (Admin/transcripciones-estado.jsonl), que arma inventario-transcripciones.mjs con la ÚLTIMA línea del historial
// (Admin/transcripciones-verificaciones.jsonl) para la huella del .md actual. Esa línea la escribía solo el proceso viejo (pipeline.mjs, al
// preparar). Un documento que entra SOLO por el proceso nuevo, o cuyo .md cambió, quedaba "sin-verificar" aunque el proceso nuevo lo hubiera
// validado y verificado. Caso real: UC 2015, re-transcripto con Mistral en el reintento del lote 06 (validacion.json: 83 números
// confirmados, 0 sin confirmar; verificar ok), y la etapa 7 decía "0 documentos listo-para-jev" y cargar.mjs frenaba.
// Ahora, al terminar ok (y solo desde el lote, que es quien escribe los rubros), se agrega la MISMA línea que escribe pipeline.mjs, con un
// método y un detalle propios: "listo" acá quiere decir "lo que se carga está validado", NO "el .md entero está validado".
// Solo si se cumplen todas:
//   - el .md no está cargado ni ya es listo-para-jev para esta misma huella (no se pisa la validación entera de un documento del proceso viejo);
//   - validacion.json existe, es posterior al .md y no tiene números sin confirmar.
function avisarRegistro(md, nRubros, registro) {
  const e = (registro || []).find((x) => x.md === md);
  const mdAbs = resolve(ROOT, md);
  if (!e || e.cargado || !existsSync(mdAbs)) return false;
  const sha = createHash('sha1').update(readFileSync(mdAbs)).digest('hex');
  const histPath = resolve(ROOT, 'Admin', 'transcripciones-verificaciones.jsonl');
  const hist = existsSync(histPath) ? readFileSync(histPath, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter((v) => v && v.md === md && v.mdSha1 === sha) : [];
  const prev = hist[hist.length - 1] || {};
  if (prev.jev === 'listo-para-jev') return false;
  const vPath = resolve(ROOT, derivado(md, '.validacion.json'));
  if (!existsSync(vPath)) return false;
  let v; try { v = JSON.parse(readFileSync(vPath, 'utf8')); } catch { return false; }
  if ((v.noConfirmados || []).length || !v.generado || new Date(v.generado).getTime() < statSync(mdAbs).mtimeMs) return false;
  const jev = nRubros >= 5 ? 'listo-para-jev' : 'sin-rubros';
  appendFileSync(histPath, JSON.stringify({ ...prev, ts: new Date().toISOString(), md, mdSha1: sha, status: 'listo', method: 'validar-bloques (proceso nuevo)',
    detail: `validar-bloques: solo los bloques que se cargan (${v.confirmados ?? '?'} números confirmados, modo ${v.modo || '?'}); el resto del .md no se validó`, jev, rubros: nRubros }) + '\n');
  return true;
}

// UNA LISTA, CON LA CADENA DE ESCALA (Versión 362). Si algún documento resolvió su escala por el escalón 1 (la del año vecino), los que ya se
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
  const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const sitio = loadSite();
  for (const [pdf, r] of verificarLista(docs, { registro, sitio, escribirRubros: ARGS.includes('--rubros') })) {
    if (r.error) { console.log(`  ${pdf}: ${r.error}`); continue; }
    console.log(`\n## ${pdf}: ${r.estado.toUpperCase()}  (ingresos ${r.totales.ingresos} · gastos ${r.totales.gastos} · resultado impreso ${r.totales.resultadoImpreso})`);
    for (const c of r.chequeos) console.log(`   ${c.ok === true ? 'ok ' : c.ok === false ? 'NO ' : ' - '} ${c.nombre}: ${c.detalle}`);
    for (const n of r.notas) console.log(`   nota: ${n}`);
    if (r.cola.length) console.log(`   -> ${r.cola.length} caso(s) a la cola (node tools/cola.mjs)`);
  }
}
