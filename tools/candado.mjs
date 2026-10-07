// ============================================================================
// tools/candado.mjs — UN SOLO PROCESO A LA VEZ ESCRIBIENDO EL REGISTRO (to-dos 162 y 164, ok de Guido).
//
// POR QUÉ. lote.mjs, pipeline.mjs y cargar.mjs --escribir reescriben enteros el registro (Admin/transcripciones-estado.jsonl) y otros
// archivos compartidos (la lista temporal del lote, el historial, la cola). Dos a la vez se pisan. Caso: el lote 20 se lanzó dos veces
// seguidas (2026-10-07). El candado nació en lote.mjs (to-do 162) y se sacó acá para que lo usen las tres (to-do 164).
//
// CÓMO. El candado (Admin/.candado.lock, en .gitignore) se crea atómico ('wx': si existe, falla) con herramienta, PID, lista, modo y hora.
//   - Si ya existe y su proceso sigue vivo y es esa herramienta (`ps`: el PID puede haberse reusado), este proceso sale sin tocar nada.
//   - Si está muerto (lote 14: se reinició la terminal), se avisa y se reemplaza.
//   - Al terminar (fin normal, error o process.exit) se borra, solo si sigue siendo el de este proceso.
// Un Ctrl+C o el cierre de la terminal NO lo borran, a propósito: un manejador de SIGINT haría que Ctrl+C dejara de cortar el proceso en el
// código sincrónico (spawnSync de las etapas 5 a 8 del lote: moría la tool hija y el lote seguía con la siguiente; medido al armar el
// candado). El candado que queda es el de un proceso muerto, y la corrida siguiente lo reemplaza con el aviso de que ese proceso se cortó.
//
// QUIÉN LO TOMA. lote.mjs (siempre, también en el ensayo: reescribe el registro), pipeline.mjs (siempre, por lo mismo) y cargar.mjs solo con
// --escribir (la propuesta la corre el lote como hija mientras tiene el candado). Ninguna de las tres llama a otra que lo tome.
// ============================================================================

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { spawnSync } from 'node:child_process';

const LOCK = resolve(import.meta.dirname, '..', 'Admin', '.candado.lock');
const hora = (iso) => (iso ? new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }) : '?');
const vivo = (pid, herramienta) => {
  try { process.kill(pid, 0); } catch (err) { if (err.code !== 'EPERM') return false; }
  const cmd = spawnSync('ps', ['-p', String(pid), '-o', 'command='], { encoding: 'utf8' }).stdout || '';
  return cmd.includes(herramienta || '.mjs');
};

export function tomarCandado(herramienta, { lista = null, modo = null } = {}) {
  const mio = { herramienta: basename(herramienta), pid: process.pid, lista, modo, inicio: new Date().toISOString() };
  for (let intento = 0; ; intento++) {
    try { writeFileSync(LOCK, JSON.stringify(mio) + '\n', { flag: 'wx' }); break; } catch (err) { if (err.code !== 'EEXIST' || intento > 0) throw err; }
    let otro = {}; try { otro = JSON.parse(readFileSync(LOCK, 'utf8')); } catch { /* candado ilegible: se trata como muerto */ }
    const quien = otro.herramienta || 'lote.mjs';
    const desc = `PID ${otro.pid ?? '?'}${otro.lista ? `, ${otro.lista}` : ''}${otro.modo ? `, ${otro.modo}` : ''}, desde las ${hora(otro.inicio)}`;
    if (otro.pid && vivo(otro.pid, quien)) { console.error(`Ya hay un ${quien} corriendo (${desc}). Esperá a que termine; este ${mio.herramienta} no hizo nada.`); process.exit(1); }
    console.log(`Quedó el candado de un ${quien} que se cortó (${desc}): lo reemplazo. Ese ${quien} no terminó; lo que dejó a medias se completa al correrlo de nuevo.`);
    try { unlinkSync(LOCK); } catch { /* ya no está */ }
  }
  process.on('exit', () => { try { if (JSON.parse(readFileSync(LOCK, 'utf8')).pid === process.pid) unlinkSync(LOCK); } catch { /* sin candado */ } });
}
