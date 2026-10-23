#!/usr/bin/env node
// tools/probar-mover-bloque.mjs — la prueba de mover-bloque.mjs (TODO 379): rehace la mudanza del 368 (el bloque del costo de personal de caja-deuda.mjs,
// líneas 1245-1457 de la versión anterior a 2ac49ffb5f) sobre una copia y comprueba que el bloque es idéntico salvo `export` y que la tool partida
// da, con tres comandos de --personal, EXACTAMENTE la misma salida que la copia sin partir. Usa tools/_prueba-*.mjs y los borra al terminar.
// Uso: node tools/probar-mover-bloque.mjs (unos segundos; sale con 1 si algo falla).
import { writeFileSync, rmSync } from 'node:fs';
import { spawnSync, execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = (f) => join(ROOT, 'tools', f);
const REV = '2ac49ffb5f^';
const correr = (...a) => spawnSync('node', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const limpiar = () => { for (const f of ['_prueba-orig.mjs', '_prueba-caja-deuda.mjs', '_prueba-costo.mjs']) rmSync(T(f), { force: true }); };
try {
  limpiar();
  const viejo = execFileSync('git', ['show', `${REV}:tools/caja-deuda.mjs`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });
  writeFileSync(T('_prueba-orig.mjs'), viejo); writeFileSync(T('_prueba-caja-deuda.mjs'), viejo);
  let r = correr('tools/mover-bloque.mjs', '_prueba-caja-deuda.mjs', '1245-1457', '_prueba-costo.mjs', 'prueba');
  caso('el ensayo planea sin problemas y deja los dos nombres de la mudanza del 368', r.status === 0 && /candidatosPersonal/.test(r.stdout) && /ROOT/.test(r.stdout) && !/✗/.test(r.stdout), r.stdout + r.stderr);
  r = correr('tools/mover-bloque.mjs', '_prueba-caja-deuda.mjs', '1245-1457', '_prueba-costo.mjs', 'prueba', '--escribir');
  caso('--escribir escribe el módulo y la tool partida', r.status === 0 && /Escrito/.test(r.stdout), r.stdout + r.stderr);
  for (const args of [['--personal', '--club', 'brighton-gb'], ['--personal', '--club', 'celtic-gb', '--partir'], ['--personal', '--ver-candidatos', '--club', 'newcastle-gb', '--anio', '2023']]) {
    const a = correr('tools/_prueba-orig.mjs', ...args), b = correr('tools/_prueba-caja-deuda.mjs', ...args);
    caso(`la tool partida da la misma salida que la entera: ${args.slice(1).join(' ')}`, a.status === b.status && a.stdout === b.stdout && a.stderr === b.stderr && a.stdout.length > 100, `${a.status}/${b.status} ${b.stderr.slice(0, 300)}`);
  }
  r = correr('tools/mover-bloque.mjs', '_prueba-caja-deuda.mjs', '1245-1457', '_prueba-costo.mjs');
  caso('un destino que ya existe no se pisa', correr('tools/mover-bloque.mjs', '_prueba-orig.mjs', '1245-1457', '_prueba-costo.mjs', 'x', '--escribir').status === 1);
  r = correr('tools/mover-bloque.mjs', '_prueba-orig.mjs', '1300-1310', '_prueba-otro.mjs');
  caso('un rango que no empieza y termina a nivel de módulo se rechaza', r.status === 1 && /nivel de módulo/.test(r.stderr), r.stdout + r.stderr);
} finally { limpiar(); }
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
