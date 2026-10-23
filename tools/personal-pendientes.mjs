#!/usr/bin/env node
// ============================================================================
// tools/personal-pendientes.mjs — `fos personal`: el costo de personal de los clubes que tienen un aviso `sin-salarios`, en un comando (TODO 368)
// ============================================================================
// Para cada club con `sin-salarios` o `sueldos-escondidos` en audit.js corre, en orden, lo que antes se hacía a mano:
//   1. caja-deuda.mjs --personal --club <id> --escribir     completa staffCost donde la nota de personal lo da (estructura de la nota; Jev solo con --ejecutar)
//   2. caja-deuda.mjs --personal --club <id> --partir --escribir   parte o marca los sueldos y recarga el año (verificar, categorizar, cargar)
// y al final cuenta los avisos que quedan. NO commitea: lo que cambia son datos publicados, así que el commit lleva el trailer `Corrige:`.
// El enganche es aparte a propósito: cargar.mjs no puede correr esto adentro (una carga abierta dentro de otra, con dos snapshots).
// USO: node tools/fos.mjs personal [--ejecutar] [--club <id>]     (--ejecutar deja que Jev conteste lo que la estructura no resuelve; cuesta centavos)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const EJECUTAR = A.includes('--ejecutar');
const SOLO = A.includes('--club') ? A[A.indexOf('--club') + 1] : null;
const node = (args) => spawnSync('node', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
const pendientes = () => {
  const r = node(['tools/audit.js', '--json']);
  const clubs = new Map();
  for (const f of JSON.parse(r.stdout).findings) {
    const m = (f.code === 'sin-salarios' || f.code === 'sueldos-escondidos') && f.msg.match(/^(\S+) (\d{4}):/);
    if (m) clubs.set(m[1], [...(clubs.get(m[1]) || []), m[2]]);
  }
  return clubs;
};
const antes = pendientes();
const clubes = [...antes.keys()].filter((c) => !SOLO || c === SOLO);
console.log(`sin-salarios: ${[...antes.values()].flat().length} club-años en ${antes.size} clubes${SOLO ? ` (solo ${SOLO})` : ''}`);
for (const club of clubes) {
  const extra = EJECUTAR ? ['--ejecutar'] : [];
  const a = node(['tools/caja-deuda.mjs', '--personal', '--club', club, '--escribir', ...extra]);
  const b = node(['tools/caja-deuda.mjs', '--personal', '--club', club, '--partir', '--escribir', ...extra]);
  const resumen = (o) => (o.stdout || '').split('\n').filter((l) => /dato\(s\) para completar|Escrit|NO se escribió|cadena frenó|ya está marcado/.test(l)).map((l) => l.trim().slice(0, 90)).join(' | ');
  console.log(`  ${club} (${antes.get(club).join(', ')}): ${resumen(a)} || ${resumen(b)}`);
}
const despues = pendientes();
console.log(`\nquedan ${[...despues.values()].flat().length} club-años con sin-salarios en ${despues.size} clubes: ${[...despues].map(([c, y]) => `${c} ${y.join(',')}`).join('; ')}`);
console.log('Los que quedan no tienen nota de personal que cierre ni valor plausible: son casos de a uno (ajuste a mano en Admin/registros/ajustes-manuales.jsonl con motivo y cita). Commit con trailer `Corrige:`.');
