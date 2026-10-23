#!/usr/bin/env node
// ============================================================================
// tools/armar-a-mano.mjs — Arma el `.ubicacion.json` y el `.filas.json` de un documento desde una ESPECIFICACIÓN corta que escribe la sesión
// (cargar con tokens de sesión, sin localizar ni extraer por API; procedimiento en Admin/carga-con-tokens-328.md). Gratis: no llama a nadie.
//
// QUÉ HACE: (1) lee la especificación (JSON), (2) toma del índice de bloques del .md (indice-bloques.mjs) la página y las líneas de cada bloque elegido,
// (3) VALIDA cada fila contra el .md antes de escribir nada (la regla de cacheAlDia(): la etiqueta o el importe en su línea, y el importe en esa línea o en las 3
// siguientes; la línea dentro del bloque; el bloque elegido; `lado` y `tipo` conocidos; `detalla_a` = la etiqueta exacta de otra fila; una escala por bloque),
// (4) escribe los dos archivos con SUS HUELLAS (`mdSha1` en ambos, `ubicacionSha1` en las filas: la de huellaUbicacion()), con `generado` igual en los dos, y
// (5) con --escribir (sin --salida) agrega el ajuste `filas-a-mano`, que protege los dos archivos de un --rehacer.
//
// USO:
//   node tools/armar-a-mano.mjs <especificacion.json>                       ensayo: valida y dice qué escribiría (no escribe nada)
//   node tools/armar-a-mano.mjs <especificacion.json> --escribir            escribe los dos archivos y el ajuste filas-a-mano
//   node tools/armar-a-mano.mjs <especificacion.json> --escribir --salida <carpeta>   escribe en otra carpeta, sin ajuste (para comparar)
//   --sesion "AAAA-MM-DD"   para el campo `modelo` (default hoy)
//
// ESPECIFICACIÓN (JSON):
//   pdf                        "Clubes/<País>/<Club>/<doc>.pdf"
//   estado, notas_ingresos, notas_gastos     listas de ids de bloque ("b3"); salen de `node tools/indice-bloques.mjs "<pdf>" --json`
//   bloques                    opcional: { "b3": {"pagina":11,"lineas":[433,455],"tipo":"tabla"} } para pisar lo que dice el índice
//   escala, escala_evidencia, moneda, columna_ejercicio, columna_anterior, perimetro ("individual" | "consolidado")
//   escalas                    [ {"bloque":"b3","escala":"unidades","evidencia":"L433: ..."} ]  una por bloque elegido
//   filas                      [ {"bloque","linea","etiqueta","actual","anterior","tipo","lado","detalla_a"} ]  importes TAL CUAL impresos
//   total_ingresos, total_gastos, resultado    {"linea","actual"[,"anterior"]} o null
//   observaciones (y `observaciones_filas` si las del .filas.json son otras), dudas [], necesito_ver [], estadoDesdeNotas (true si las notas hacen de estado)
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { derivado } from './rutas.mjs';
import { indiceBloques } from './indice-bloques.mjs';
import { shaMd, huellaUbicacion, filaEnSuLinea } from './cache-al-dia.mjs';
import { agregarAjuste } from './ajustes.mjs';
import { esAMano } from './extraer.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const TIPOS = new Set(['renglon', 'subtotal', 'total', 'resultado']);
const LADOS = new Set(['ingreso', 'gasto', 'financiero', 'impuesto', 'resultado', 'otro']);
const ESCALAS = new Set(['unidades', 'miles', 'millones']);

export function armar(spec, { sesion = new Date().toISOString().slice(0, 10), ahora = new Date().toISOString() } = {}) {
  const errores = [];
  const err = (m) => errores.push(m);
  if (!spec.pdf) { err('falta `pdf`'); return { errores }; }
  const mdRel = spec.pdf.replace(/\.pdf$/i, '.md'); const mdAbs = resolve(ROOT, mdRel);
  if (!existsSync(mdAbs)) { err(`no existe ${mdRel}`); return { errores }; }
  const md = readFileSync(mdAbs, 'utf8'); const lineas = md.split('\n');
  const indice = new Map(indiceBloques(md).bloques.map((b) => [b.id, b]));
  const lista = (k) => (Array.isArray(spec[k]) ? spec[k] : []);
  const estado = lista('estado'); const notasI = lista('notas_ingresos'); const notasG = lista('notas_gastos');
  const elegidos = [...new Set([...estado, ...notasI, ...notasG, ...Object.keys(spec.bloques || {})])];
  if (!estado.length && !spec.estadoDesdeNotas) err('falta `estado` (ids de bloque del estado de resultados)');
  const bloques = {};
  for (const id of elegidos) {
    const b = spec.bloques?.[id] || (indice.get(id) ? { pagina: indice.get(id).pagina, lineas: indice.get(id).lineas, tipo: indice.get(id).tipo } : null);
    if (!b) { err(`el bloque ${id} no está en el índice del .md ni en \`bloques\``); continue; }
    bloques[id] = b;
  }
  for (const k of ['escala', 'moneda', 'columna_ejercicio', 'perimetro']) if (!spec[k]) err(`falta \`${k}\``);
  if (spec.escala && !ESCALAS.has(spec.escala)) err(`escala "${spec.escala}": unidades | miles | millones`);
  if (spec.perimetro && !['individual', 'consolidado'].includes(spec.perimetro)) err(`perimetro "${spec.perimetro}": individual | consolidado`);
  const escalas = lista('escalas');
  for (const id of Object.keys(bloques)) if (!escalas.some((e) => e.bloque === id)) err(`falta la escala del bloque ${id} (\`escalas\`)`);
  for (const e of escalas) if (!ESCALAS.has(e.escala) || !e.evidencia) err(`escala del bloque ${e.bloque}: unidades | miles | millones, con su evidencia`);
  // UN SUBTOTAL O TOTAL IMPRESO SIN RÓTULO («| | (100,113) |» debajo de las filas de una nota) no tiene etiqueta que citar y la tool lo rechazaba («falta etiqueta o
  // importe»). Solo ese caso (tipo subtotal o total, con línea e importe) recibe una etiqueta sintética «subtotal L671» / «total L671»; la validación contra la línea del .md sigue siendo por
  // el importe. Un renglón sin etiqueta sigue siendo un error.
  const filas = lista('filas').map((f) => (!String(f.etiqueta ?? '').trim() && (f.tipo === 'subtotal' || f.tipo === 'total') && f.linea && f.actual !== undefined && f.actual !== null && String(f.actual).trim() !== '' ? { ...f, etiqueta: `${f.tipo} L${f.linea}` } : f));
  if (!filas.length) err('`filas` está vacío');
  const etiquetas = new Set(filas.map((f) => String(f.etiqueta ?? '').trim()));
  filas.forEach((f, i) => {
    const q = `fila ${i + 1} (L${f.linea} "${String(f.etiqueta ?? '').slice(0, 30)}")`;
    if (!f.etiqueta || f.actual === undefined || f.actual === null || String(f.actual).trim() === '') { err(`${q}: falta etiqueta o importe`); return; }
    if (!bloques[f.bloque]) { err(`${q}: el bloque ${f.bloque} no es de los elegidos`); return; }
    const [d, h] = bloques[f.bloque].lineas;
    if (!(f.linea >= d && f.linea <= h)) err(`${q}: la línea ${f.linea} está fuera del bloque ${f.bloque} (L${d}-L${h})`);
    if (!filaEnSuLinea(lineas, f)) err(`${q}: no está en su línea (la línea citada no tiene el comienzo de la etiqueta ni el importe ${f.actual}, o el importe no está en esa línea ni en las 3 siguientes)`);
    if (!TIPOS.has(f.tipo)) err(`${q}: tipo "${f.tipo}" (${[...TIPOS].join(' | ')})`);
    if (!LADOS.has(f.lado)) err(`${q}: lado "${f.lado}" (${[...LADOS].join(' | ')})`);
    if (f.detalla_a != null && !etiquetas.has(String(f.detalla_a).trim())) err(`${q}: detalla_a "${f.detalla_a}" no es la etiqueta de ninguna fila`);
  });
  for (const k of ['total_ingresos', 'total_gastos', 'resultado']) {
    const t = spec[k]; if (t == null) continue;
    if (!t.linea || !t.actual) { err(`\`${k}\` necesita linea y actual (o null)`); continue; }
    if (!filaEnSuLinea(lineas, { linea: t.linea, etiqueta: '', actual: t.actual })) err(`\`${k}\`: el importe ${t.actual} no está en la línea ${t.linea} ni en las 3 siguientes`);
  }
  if (errores.length) return { errores };
  const ub = {
    pdf: spec.pdf, md: mdRel, mdSha1: shaMd(mdRel), modelo: `a mano (Claude Code, sesión ${sesion})`, generado: ahora,
    ...(spec.perimetroClub ? { perimetroClub: spec.perimetroClub } : {}),
    bloques, sin_estado: false, estado, notas_ingresos: notasI, notas_gastos: notasG,
    ...(spec.estadoDesdeNotas ? { estadoDesdeNotas: true } : {}),
    escala: spec.escala, escala_evidencia: spec.escala_evidencia || '', moneda: spec.moneda, columna_ejercicio: spec.columna_ejercicio, columna_anterior: spec.columna_anterior ?? null,
    perimetro: spec.perimetro, necesito_ver: lista('necesito_ver'), dudas: lista('dudas'),
    observaciones: spec.observaciones || 'Armado a mano (tokens de sesión).',
  };
  const fj = {
    pdf: spec.pdf, md: mdRel, mdSha1: ub.mdSha1, ubicacionSha1: huellaUbicacion(ub), modelo: ub.modelo, generado: ahora, salida: 'a mano',
    ubicacion: { estado, notas_ingresos: notasI, notas_gastos: notasG }, escalas,
    filas: filas.map((f) => ({ bloque: f.bloque, linea: f.linea, etiqueta: f.etiqueta, actual: f.actual, anterior: f.anterior ?? null, tipo: f.tipo, lado: f.lado, detalla_a: f.detalla_a ?? null })),
    total_ingresos: spec.total_ingresos ?? null, total_gastos: spec.total_gastos ?? null, resultado: spec.resultado ?? null, dudas: lista('dudas'), observaciones: spec.observaciones_filas || spec.observaciones || 'Armado a mano (tokens de sesión).',
  };
  return { errores, ubicacion: ub, filas: fj, mdRel };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  const especificacion = A.find((a, i) => !a.startsWith('--') && !['--salida', '--sesion'].includes(A[i - 1]));
  if (!especificacion) { console.error('uso: node tools/armar-a-mano.mjs <especificacion.json> [--escribir] [--salida <carpeta>] [--sesion AAAA-MM-DD]'); process.exit(1); }
  let spec; try { spec = JSON.parse(readFileSync(resolve(especificacion), 'utf8')); } catch (e) { console.error(`no se pudo leer la especificación: ${e.message}`); process.exit(1); }
  const r = armar(spec, { sesion: flag('--sesion') || undefined });
  if (r.errores.length) { console.error(`NO SE ESCRIBE NADA: ${r.errores.length} problema(s)\n  - ${r.errores.join('\n  - ')}`); process.exit(1); }
  const salida = flag('--salida');
  const pu = salida ? resolve(salida, basename(derivado(r.mdRel, '.ubicacion.json', { crear: false }))) : resolve(ROOT, derivado(r.mdRel, '.ubicacion.json'));
  const pf = salida ? resolve(salida, basename(derivado(r.mdRel, '.filas.json', { crear: false }))) : resolve(ROOT, derivado(r.mdRel, '.filas.json'));
  console.log(`${r.filas.filas.length} filas validadas contra ${r.mdRel}; bloques ${Object.keys(r.ubicacion.bloques).join(', ')}; ubicacionSha1 ${r.filas.ubicacionSha1.slice(0, 12)}`);
  if (!A.includes('--escribir')) { console.log(`ENSAYO: escribiría\n  ${pu}\n  ${pf}${salida ? '' : '\n  y el ajuste filas-a-mano (si no lo tiene)'}`); process.exit(0); }
  mkdirSync(dirname(pu), { recursive: true });
  writeFileSync(pu, JSON.stringify(r.ubicacion, null, 1)); writeFileSync(pf, JSON.stringify(r.filas, null, 1));
  console.log(`escritos:\n  ${pu}\n  ${pf}`);
  if (!salida) {
    if (esAMano(spec.pdf)) console.log('el ajuste filas-a-mano ya estaba');
    else { agregarAjuste({ pdf: spec.pdf, campo: 'filas-a-mano', motivo: `Claude ${new Date().toISOString().slice(0, 10)} (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs`, evidencia: `${basename(r.mdRel)} L${Math.min(...r.filas.filas.map((f) => f.linea))}-L${Math.max(...r.filas.filas.map((f) => f.linea))}`, autor: 'Claude' }); console.log('ajuste filas-a-mano agregado'); }
  }
}
