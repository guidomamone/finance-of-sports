#!/usr/bin/env node
// ============================================================================
// tools/lote-batch.mjs — EL LOTE CON LA BATCH API DE ANTHROPIC: mismo lote, mismo modelo de cada tarea, mitad de precio (ok de Guido:
// "Batch API con el mismo modelo"; el paso de Opus a Sonnet es un cambio aparte, medido tarea por tarea).
//
// CÓMO: corre `tools/lote.mjs` TAL CUAL, con FOS_CLAUDE_BATCH=1 (tools/claude-batch.mjs). En esa pasada, cada llamada a Claude que todavía no
// tiene respuesta se anota en una cola y su documento se corta en esa etapa ("esperando la Batch API"). Al terminar la pasada, manda la cola
// en un envío, espera a que vuelva (casi siempre menos de una hora) y corre el lote otra vez: como cada etapa guarda su resultado en disco, el
// lote "sigue donde quedó" y cada documento avanza hasta la etapa siguiente que necesita a Claude (la ola siguiente). Termina cuando una
// pasada no anota nada. Olas típicas: perímetro A2 · localizar · localizar-2 · extraer · primer año · categorizar.
// Más lento que el lote directo (varias olas de hasta ~1 hora): para lotes grandes; uno chico o urgente va con lote.mjs.
//
// USO (los mismos argumentos que lote.mjs, salvo --reintentar):
//   node tools/lote-batch.mjs --lista Admin/lotes/lote-NN.txt                       ensayo: el costo a precio batch (una pasada, sin API)
//   caffeinate -i node tools/lote-batch.mjs --lista Admin/lotes/lote-NN.txt --ejecutar [--cargar]
// --reintentar no va: sus caminos (relocalizar con las notas como estado, re-transcribir, texto propio) encadenan varias llamadas en la
// misma pasada; esos documentos van con lote.mjs --reintentar.
// Si se corta (Ctrl+C, la Mac se durmió), volver a correr el mismo comando: recoge el envío que estaba esperando, sin pagarlo dos veces.
// ============================================================================
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { enviarColaBatch, pendientesEnCola } from './claude-batch.mjs';
import { tomarCandado } from './candado.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
if (args.includes('--reintentar')) { console.error('lote-batch.mjs no acepta --reintentar: esos documentos van con node tools/lote.mjs --reintentar (ver la cabecera).'); process.exit(1); }
// UNA CORRIDA A LA VEZ (prueba de Rapid Wien: el mismo comando lanzado dos veces mandó cada pedido dos veces). Candado propio: el
// lote.mjs hijo toma el de siempre (Admin/registros/.candado.lock). Un candado de una corrida cortada se reemplaza con aviso (candado.mjs).
tomarCandado('lote-batch.mjs', { lista: args[args.indexOf('--lista') + 1] || null, modo: args.includes('--ejecutar') ? '--ejecutar' : 'ensayo', archivo: resolve(ROOT, 'Generados', '_cache', 'claude-batch.lock') });
const env = { ...process.env, FOS_CLAUDE_BATCH: '1' };
const pasada = () => spawnSync('node', [resolve(ROOT, 'tools/lote.mjs'), ...args], { cwd: ROOT, stdio: 'inherit', env }).status;

if (!args.includes('--ejecutar')) {
  console.log('LOTE CON BATCH API — ensayo (precios a mitad, una pasada, sin API)');
  process.exit(pasada() ?? 1);
}
const MAX_OLAS = 15;
// Un envío que quedó sin recoger de una corrida cortada se recoge antes de la primera pasada.
await enviarColaBatch();
for (let ola = 1; ola <= MAX_OLAS; ola++) {
  console.log(`\n######## LOTE CON BATCH API · pasada ${ola} ########`);
  const st = pasada();
  if (st !== 0) { console.error(`lote.mjs terminó con código ${st}: se frena acá (lo anotado en la cola se manda al volver a correr).`); process.exit(st ?? 1); }
  const n = pendientesEnCola();
  if (!n) { console.log(`\nLote con Batch API terminado en ${ola} pasada(s): no quedan pedidos a Claude.`); process.exit(0); }
  console.log(`\n######## ola ${ola}: ${n} pedido(s) a Claude a la Batch API ########`);
  await enviarColaBatch();
}
console.error(`Se cortó a las ${MAX_OLAS} pasadas con pedidos todavía pendientes: algo se repite (revisar la cola en Generados/_cache/claude-batch-cola.jsonl).`);
process.exit(1);
