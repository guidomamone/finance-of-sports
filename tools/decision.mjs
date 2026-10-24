#!/usr/bin/env node
// ============================================================================
// tools/decision.mjs — registra una decisión (de la Auditora, de una votación o de una corrida de P2 y P3) sin escribir el JSON a mano, y copia los pasos a aplicar al punto del TODO.
//
// POR QUÉ. Una decisión vivía como una línea larguísima de Admin/registros/auditoria-proceso.jsonl con los pasos a aplicar enterrados al final del texto, y el cuerpo del punto del TODO quedaba
// con el estado de antes de decidir: quien tomaba el punto tenía que ir a buscarlos al registro o al historial de git. Acá la decisión se escribe una vez y queda en los dos lugares.
//
// USO:
//   node tools/decision.mjs --veredicto "..." --resultado aprobado|aprobado-con-cambios|aprobado-como-aviso|rechazada|decidido|a-guido|confirmado --motivo "..." [--codigo <código de audit.js>] [--cambio "..."] [--antes "..."] [--despues "..."] [--commit <sha>] [--votos "C,B,C"]
//                           [--punto <id del TODO> --aplicar "paso 1" --aplicar "paso 2" ...]
//   Con --aplicar hace falta --punto: los pasos se agregan al final del cuerpo de ese punto en Admin/TODO.md, bajo «Aplicación (decidido <fecha>):», y quedan también en el registro
//   (`aplicacion`). Sin --punto solo se registra. El registro es una línea JSON por decisión, siempre válida (la tool la arma).
// ============================================================================
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validar } from './registro-esquema.js';

const ROOT = resolve(import.meta.dirname, '..');
const REGISTRO = resolve(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl');
const TODO = resolve(ROOT, 'Admin', 'TODO.md');
const A = process.argv.slice(2);
const uno = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const varios = (n) => A.flatMap((a, i) => (a === n ? [A[i + 1]] : []));

const veredicto = uno('--veredicto'); const motivo = uno('--motivo');
const punto = uno('--punto'); const pasos = varios('--aplicar');
if (!veredicto || !motivo) { console.error('Faltan --veredicto y --motivo (ver la cabecera de tools/decision.mjs).'); process.exit(1); }
if (pasos.length && !punto) { console.error('--aplicar necesita --punto <id del TODO>: los pasos se copian al cuerpo de ese punto.'); process.exit(1); }

const fecha = new Date().toISOString().slice(0, 10);
const RESULTADOS = ['aprobado', 'aprobado-con-cambios', 'aprobado-como-aviso', 'rechazada', 'decidido', 'a-guido', 'confirmado'];
const resultado = uno('--resultado');
if (!RESULTADOS.includes(resultado)) { console.error(`Falta --resultado, uno de: ${RESULTADOS.join(', ')} (el veredicto en una palabra; --veredicto sigue siendo el texto).`); process.exit(1); }
const fila = { esquema: 1, tipo: 'decision-auditora', veredicto_codigo: resultado, cambio: uno('--cambio') || veredicto, fecha, sesion: 'unica', ...(uno('--codigo') ? { codigo_tratado: uno('--codigo') } : {}), ...(uno('--cambio') ? { cambio: uno('--cambio') } : {}), veredicto,
  ...(uno('--antes') ? { antes: uno('--antes') } : {}), ...(uno('--despues') ? { despues: uno('--despues') } : {}), ...(uno('--commit') ? { commit: uno('--commit') } : {}),
  ...(uno('--votos') ? { votos: uno('--votos').split(',').map((v) => v.trim()) } : {}), ...(punto ? { punto } : {}), ...(pasos.length ? { aplicacion: pasos } : {}), motivo };

if (punto && pasos.length) {
  const L = readFileSync(TODO, 'utf8').split('\n');
  const i = L.findIndex((l) => new RegExp(`^### \\d+\\. ${punto} · `).test(l));
  if (i < 0) { console.error(`No hay un punto ${punto} en Admin/TODO.md.`); process.exit(1); }
  let f = i + 1; while (f < L.length && !/^##+ /.test(L[f])) f++;
  while (f > i + 1 && !L[f - 1].trim()) f--; // antes de las líneas en blanco finales
  const bloque = [`Aplicación (decidido ${fecha}, registro en Admin/registros/auditoria-proceso.jsonl):`, ...pasos.map((p, k) => `(${k + 1}) ${p}`)];
  // una decisión nueva reemplaza a la anterior del mismo punto
  const previa = L.slice(i + 1, f).findIndex((l) => l.startsWith('Aplicación (decidido'));
  if (previa >= 0) L.splice(i + 1 + previa, f - (i + 1 + previa), ...bloque); else L.splice(f, 0, '', ...bloque);
  writeFileSync(TODO, L.join('\n'), 'utf8');
  console.log(`Pasos copiados al punto ${punto} de Admin/TODO.md.`);
}
const fuera = validar('auditoria-proceso', fila);
if (fuera.length) { console.error(`La decisión no cumple el esquema de tools/esquemas-registros.json (${fuera.join('; ')}); no se registró.`); process.exit(1); }
const previo = readFileSync(REGISTRO, 'utf8');
appendFileSync(REGISTRO, (previo.endsWith('\n') ? '' : '\n') + JSON.stringify(fila) + '\n', 'utf8');
console.log('Decisión registrada en Admin/registros/auditoria-proceso.jsonl.');
