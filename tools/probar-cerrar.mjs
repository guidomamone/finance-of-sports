#!/usr/bin/env node
// tools/probar-cerrar.mjs — la prueba del aviso de flags desconocidos de cerrar.mjs (ítem 11 del punto 478).
//   1. un flag que no se conoce da el mensaje, con la sugerencia · 2. los flags conocidos pasan · 3. cerrar.mjs con --escribir sale con 1 y dice «Argumento desconocido: --escribir (¿--cerrar?)» sin tocar nada
// Uso: node tools/probar-cerrar.mjs    (menos de 1 segundo; sale con 1 si algún caso falla)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { argumentoDesconocido } from './args-desconocidos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const CONOCIDOS = ['--cerrar', '--forzar', '--verificado', '--sin-doc'];

caso('1. un flag desconocido da el mensaje con la sugerencia', /^Argumento desconocido: --escribir \(¿--cerrar\?\)/.test(argumentoDesconocido(['401', '--escribir'], CONOCIDOS, { '--escribir': '--cerrar' }) || ''));
caso('1b. sin sugerencia, solo el flag', /^Argumento desconocido: --x\./.test(argumentoDesconocido(['--x'], CONOCIDOS) || ''));
caso('2. los flags conocidos y los valores pasan', argumentoDesconocido(['401', '--cerrar', '--verificado', 'se miró eso', '--forzar'], CONOCIDOS) === null);
const r = spawnSync('node', [resolve(ROOT, 'tools/cerrar.mjs'), '401', '--escribir'], { cwd: ROOT, encoding: 'utf8' });
caso('3. cerrar.mjs 401 --escribir sale con 1 y dice «Argumento desconocido: --escribir (¿--cerrar?)»', r.status === 1 && /Argumento desconocido: --escribir \(¿--cerrar\?\)/.test(r.stderr), `${r.status} ${r.stderr.slice(0, 200)}`);

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
