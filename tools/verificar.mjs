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

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { agregarCaso, respuestaDe } from './cola.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
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

export function verificar(pdf, { registro, sitio, escribirRubros = false }) {
  const e = registro.find((x) => x.pdf === pdf) || {}; const md = e.md || pdf.replace(/\.pdf$/, '.md');
  const pF = resolve(ROOT, derivado(md, '.filas.json', { crear: false }));
  if (!existsSync(pF)) return { error: 'falta el .filas.json (extraer.mjs)' };
  const F = JSON.parse(readFileSync(pF, 'utf8'));
  const pV = resolve(ROOT, derivado(md, '.validacion.json', { crear: false }));
  const V = existsSync(pV) ? JSON.parse(readFileSync(pV, 'utf8')) : null;
  const pU = resolve(ROOT, derivado(md, '.ubicacion.json', { crear: false }));
  const U = existsSync(pU) ? JSON.parse(readFileSync(pU, 'utf8')) : {};
  const year = e.periodo?.cierre ? Number(e.periodo.cierre.slice(0, 4)) : null;
  const clubId = clubDeRuta(pdf).clubId; const cd = clubId ? sitio.generic[clubId] : null;
  const chequeos = []; const cola = []; const notas = [];
  const pagDe = (bloque) => U.bloques?.[bloque]?.pagina ?? null;
  const caso = (motivo, detalle, que, extra = {}) => {
    const r = respuestaDe(pdf, 'verificar', motivo, detalle);
    if (r) return r;
    cola.push(agregarCaso({ pdf, md, etapa: 'verificar', motivo, detalle, que, ...extra }));
    return null;
  };

  // escala de cada bloque (la de extraer.mjs; si "no se sabe", la de localizar.mjs; si tampoco, unidades y se avisa)
  const escalaDe = new Map((F.escalas || []).map((x) => [x.bloque, x.escala]));
  const mult = (b) => MULT[escalaDe.get(b)] ?? MULT[U.escala] ?? 1e-6;
  if ([...escalaDe.values()].includes('no se sabe') && !MULT[U.escala]) notas.push('escala desconocida en algún bloque: se asumió unidades (lo confirma el chequeo del año anterior)');

  // filas con su valor en millones (año actual y anterior). armar() se usa también para el documento vecino (chequeo 4b).
  function armar(F, U, conNotas = false) {
  const escalaDe = new Map((F.escalas || []).map((x) => [x.bloque, x.escala]));
  const mult = (b) => MULT[escalaDe.get(b)] ?? MULT[U.escala] ?? 1e-6;
  const pagDe = (bloque) => U.bloques?.[bloque]?.pagina ?? null;
  const filas = (F.filas || []).map((f) => ({ ...f, pagina: pagDe(f.bloque), M: (parseNumber(f.actual) ?? NaN) * mult(f.bloque), A: f.anterior != null ? (parseNumber(f.anterior) ?? NaN) * mult(f.bloque) : null, u: unidad(f.actual, mult(f.bloque)) }));
  const estado = filas.filter((f) => !f.detalla_a && (F.ubicacion?.estado || []).includes(f.bloque));

  // 2. notas: renglón del estado reemplazado por su desglose si cierra (escala deducida del cierre)
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
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === f.etiqueta.trim() && h.tipo === 'renglon');
      const sh = hijas.reduce((a, h) => a + Math.abs(h[campo] || 0), 0); const obj = Math.abs(f[campo] || 0);
      const k2 = hijas.length >= 2 ? [1, 1000, 1e6, 1e-3, 1e-6].find((x) => cerca(sh * x, obj, 0.005)) : undefined;
      if (k2 !== undefined) out.push(...hijas.map((h) => ({ ...h, [campo]: Math.abs(h[campo]) * k2, origen: `nota que desglosa "${f.etiqueta}"` })));
      else { out.push({ ...f, [campo]: Math.abs(f[campo] || 0), origen: 'estado' }); if (conNotas && hijas.length >= 2 && campo === 'M') notas.push(`la nota de "${f.etiqueta}" no suma el renglón (${r6(sh)} contra ${r6(obj)}): quedó el renglón del estado`); }
    }
    return out;
  };
  return { filas, estado, lineasDeLado, mult };
  }
  const { filas, estado, lineasDeLado } = armar(F, U, true);
  let ing = lineasDeLado('ingreso'); let gas = lineasDeLado('gasto');
  const fin = estado.filter((f) => f.lado === 'financiero' && f.tipo === 'renglon'); const imp = estado.filter((f) => f.lado === 'impuesto' && f.tipo === 'renglon');
  const suma = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);
  const conSigno = (arr, c = 'M') => arr.reduce((a, f) => a + (f[c] || 0), 0);

  // 3. totales y resultado
  const tI = F.total_ingresos ? Math.abs(parseNumber(F.total_ingresos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const tG = F.total_gastos ? Math.abs(parseNumber(F.total_gastos.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const res = F.resultado ? (parseNumber(F.resultado.actual) ?? NaN) * mult(estado[0]?.bloque) : null;
  const ajuste = (arr, total, nombre) => {
    if (total == null || !isFinite(total)) { chequeos.push({ nombre: `total de ${nombre}`, ok: null, detalle: 'el documento no lo imprime' }); return arr; }
    const s = suma(arr); const tolRed = Math.max(TOL, 0.5 * arr.reduce((a, f) => a + (f.u || 0), 0));
    if (cerca(s, total)) { chequeos.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(s)} = ${r6(total)}` }); return arr; }
    // El total impreso puede ser el de UNA fila de total que se usó como línea (o cuyas filas de nota se usaron), con otras líneas aparte del
    // mismo lado: Nottingham Forest imprime "Turnover 189,552" y, fuera de ese total, "Profit on disposal of player registrations 100,531",
    // que producción suma al ingreso. Si esa fila (o su desglose) da el total, el total cierra contra ella y el resto se suma aparte.
    const filaTotal = estado.find((f) => f.tipo !== 'renglon' && cerca(Math.abs(f.M || 0), total));
    if (filaTotal) {
      const deEsa = arr.filter((f) => f.etiqueta === filaTotal.etiqueta || f.origen === `nota que desglosa "${filaTotal.etiqueta}"`);
      if (deEsa.length && cerca(suma(deEsa), total)) { chequeos.push({ nombre: `total de ${nombre}`, ok: true, detalle: `"${filaTotal.etiqueta}" ${r6(total)} cierra; además se suman ${arr.length - deEsa.length} línea(s) fuera de ese total (${r6(s - total)})` }); return arr; }
    }
    if (Math.abs(s - total) <= tolRed) { chequeos.push({ nombre: `total de ${nombre}`, ok: true, detalle: `${r6(s)} contra ${r6(total)}: fila "Diferencia de redondeo" de ${r6(total - s)}` }); return [...arr, { etiqueta: 'Diferencia de redondeo', lado: nombre === 'ingresos' ? 'ingreso' : 'gasto', M: total - s, origen: 'redondeo' }]; }
    chequeos.push({ nombre: `total de ${nombre}`, ok: false, detalle: `las líneas suman ${r6(s)} y el total impreso dice ${r6(total)}` });
    return arr;
  };
  ing = ajuste(ing, tI, 'ingresos'); gas = ajuste(gas, tG, 'gastos');
  // resultado: ingresos - gastos + financiero + impuesto, con los signos como vienen impresos y, si no cierra, con financiero/impuesto invertidos
  // (cada documento imprime sus signos a su manera; la lectura que cierra gana, como en cargar.mjs)
  let okRes = null; let lectura = null;
  if (res != null && isFinite(res)) {
    for (const [sf, si, nombre] of [[1, 1, 'como impresos'], [-1, -1, 'financiero e impuesto invertidos'], [1, -1, 'impuesto invertido'], [-1, 1, 'financiero invertido']]) {
      const pat = suma(ing) - suma(gas) + sf * conSigno(fin) + si * conSigno(imp);
      if (cerca(Math.abs(pat), Math.abs(res))) { okRes = true; lectura = nombre; break; }
    }
    if (!okRes) okRes = false;
    chequeos.push({ nombre: 'resultado del ejercicio', ok: okRes, detalle: okRes ? `cierra (${lectura})` : `ingresos ${r6(suma(ing))} - gastos ${r6(suma(gas))} ± financiero ${r6(conSigno(fin))} ± impuesto ${r6(conSigno(imp))} no da el resultado impreso ${r6(res)}` });
  } else chequeos.push({ nombre: 'resultado del ejercicio', ok: null, detalle: 'extraer.mjs no encontró el resultado impreso' });

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
  if (year) for (const [dy, campoMio, campoSuyo] of [[1, 'M', 'A'], [-1, 'A', 'M']]) {
    const carpeta = pdf.split('/').slice(0, 3).join('/');
    const otro = registro.find((x) => x.pdf !== pdf && x.pdf.startsWith(carpeta + '/') && x.md && Number(String(x.periodo?.cierre || '').slice(0, 4)) === year + dy);
    const pF2 = otro ? resolve(ROOT, derivado(otro.md, '.filas.json', { crear: false })) : null;
    if (!pF2 || !existsSync(pF2)) continue;
    const pU2 = resolve(ROOT, derivado(otro.md, '.ubicacion.json', { crear: false }));
    const A2 = armar(JSON.parse(readFileSync(pF2, 'utf8')), existsSync(pU2) ? JSON.parse(readFileSync(pU2, 'utf8')) : {});
    const mio = suma(lineasDeLado('ingreso', campoMio), campoMio); const suyo = suma(A2.lineasDeLado('ingreso', campoSuyo), campoSuyo);
    const ok = suyo ? cerca(mio, suyo, 0.02) : null;
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
  for (const d of F.dudas || []) caso('duda-de-extraer', d.slice(0, 80), `La IA que extrajo las filas dejó esta duda: ${d}`, { pagina: estado[0]?.pagina });

  const out = { pdf, md, generado: new Date().toISOString(), estado: cola.length ? 'cola' : 'ok', clubId, year, cola, chequeos, notas,
    totales: { ingresos: r6(suma(ing)), gastos: r6(suma(gas)), financiero: r6(conSigno(fin)), impuesto: r6(conSigno(imp)), resultadoImpreso: r6(res), lecturaSignos: lectura },
    lineas: [...ing, ...gas].map((f) => ({ etiqueta: f.etiqueta, lado: f.lado, M: r6(f.M), pagina: f.pagina, linea: f.linea ?? null, origen: f.origen || 'estado' })),
    financiero: fin.map((f) => ({ etiqueta: f.etiqueta, M: r6(f.M), linea: f.linea })), impuesto: imp.map((f) => ({ etiqueta: f.etiqueta, M: r6(f.M), linea: f.linea })) };
  writeFileSync(resolve(ROOT, derivado(md, '.verificacion.json')), JSON.stringify(out, null, 1));
  // --rubros: la lista de rubros para la categorización de siempre (etapa 7), con las líneas verificadas. Club: el id del sitio o, si es nuevo,
  // el slug de la carpeta (el mismo id provisorio que usa el pipeline).
  if (escribirRubros) {
    const club = clubId || pdf.split('/')[2].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const rubros = out.lineas.filter((l) => l.origen !== 'redondeo').map((l) => ({ label: l.etiqueta, lado: l.lado === 'ingreso' ? 'revenue' : 'expense', page: l.pagina, section: l.origen, values: [l.M] }));
    writeFileSync(resolve(ROOT, derivado(md, '.rubros.json')), JSON.stringify({ md, pdf, club, year, generatedAt: new Date().toISOString(), origen: 'verificar.mjs (proceso nuevo, Versión 324)', rubros }, null, 1));
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const docs = flag('--lista') ? readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : ARGS.filter((a) => !a.startsWith('--'));
  if (!docs.length) { console.error('Uso: node tools/verificar.mjs "<pdf>" [--rubros]  |  --lista <archivo> [--rubros]'); process.exit(1); }
  const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const sitio = loadSite();
  for (const pdf of docs) {
    const r = verificar(pdf, { registro, sitio, escribirRubros: ARGS.includes('--rubros') });
    if (r.error) { console.log(`  ${pdf}: ${r.error}`); continue; }
    console.log(`\n## ${pdf}: ${r.estado.toUpperCase()}  (ingresos ${r.totales.ingresos} · gastos ${r.totales.gastos} · resultado impreso ${r.totales.resultadoImpreso})`);
    for (const c of r.chequeos) console.log(`   ${c.ok === true ? 'ok ' : c.ok === false ? 'NO ' : ' - '} ${c.nombre}: ${c.detalle}`);
    for (const n of r.notas) console.log(`   nota: ${n}`);
    if (r.cola.length) console.log(`   -> ${r.cola.length} caso(s) a la cola (node tools/cola.mjs)`);
  }
}
