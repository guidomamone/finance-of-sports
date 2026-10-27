#!/usr/bin/env node
// tools/probar-pruebas-de-tool.mjs — la prueba de pruebas-de-tool.mjs (qué pruebas corre cerrar-tool.mjs para lo que cambió) sobre un árbol de juguete en la carpeta temporal.
//   1. un archivo cambiado que una prueba nombra entre comillas · 2. un módulo que importa una tool que una prueba nombra (sube por los imports) · 3. la prueba que lleva su nombre (probar-x.mjs para x.mjs)
//   4. una tool que otra invoca como comando NO arrastra las pruebas de la otra (la mención no se propaga) · 5. una prueba cambiada se corre a sí misma · 6. un archivo sin prueba da lista vacía
//   7. tools/hooks/ cuenta y probar-todas.mjs nunca es una prueba · 8. prueba-escribir.mjs es una prueba
// Uso: node tools/probar-pruebas-de-tool.mjs    (menos de 1 segundo; sale con 1 si algún caso falla; no toca nada fuera de su carpeta temporal)
import { mkdirSync, writeFileSync, rmSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pruebasDe } from './pruebas-de-tool.mjs';

const T = join(realpathSync(tmpdir()), `probar-pruebas-de-tool-${process.pid}`);
rmSync(T, { recursive: true, force: true });
for (const d of ['tools/hooks']) mkdirSync(join(T, d), { recursive: true });
const w = (rel, txt) => writeFileSync(join(T, rel), txt);
w('tools/modulo.mjs', 'export const M = 1;\n');
w('tools/herramienta.mjs', "import { M } from './modulo.mjs';\nexport const H = M;\n");
w('tools/invoca.mjs', "import { spawnSync } from 'node:child_process';\nspawnSync('node', ['tools/invocada.mjs']);\n");
w('tools/invocada.mjs', 'export const I = 1;\n');
w('tools/suelta.mjs', 'export const S = 1;\n');
w('tools/pura.mjs', 'export const P = 1;\n');
w('tools/probar-pura.mjs', "console.log('prueba de pura');\n");
w('tools/probar-nombra.mjs', "import { spawnSync } from 'node:child_process';\nspawnSync('node', ['tools/herramienta.mjs']);\nspawnSync('node', ['tools/invoca.mjs']);\n");
w('tools/prueba-escribir.mjs', "const ESCRIBEN = [['x', ['tools/escribe.mjs']]];\n");
w('tools/escribe.mjs', 'export const E = 1;\n');
w('tools/probar-todas.mjs', "// corre todas: 'herramienta.mjs'\n");
w('tools/hooks/gancho.mjs', 'export const G = 1;\n');
w('tools/hooks/probar-gancho.mjs', "import { G } from './gancho.mjs';\nconsole.log(G);\n");

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const rutas = (c) => pruebasDe(c, T).map((x) => x.ruta).join(', ');

caso('una tool que una prueba nombra entre comillas corre esa prueba', rutas(['herramienta.mjs']) === 'tools/probar-nombra.mjs', rutas(['herramienta.mjs']));
caso('un módulo que importa esa tool sube por los imports y corre la misma prueba', rutas(['modulo.mjs']) === 'tools/probar-nombra.mjs', rutas(['modulo.mjs']));
caso('la prueba dice por qué: el archivo cambiado de donde viene', pruebasDe(['modulo.mjs'], T)[0]?.por === 'modulo.mjs');
caso('probar-<x>.mjs corre cuando cambia <x>.mjs aunque no lo nombre', rutas(['pura.mjs']) === 'tools/probar-pura.mjs', rutas(['pura.mjs']));
caso('la mención no se propaga: una tool que invoca a otra no hace que cambiar la invocada corra las pruebas de la que invoca', rutas(['invocada.mjs']) === '', rutas(['invocada.mjs']));
caso('una prueba cambiada se corre a sí misma', rutas(['probar-pura.mjs']) === 'tools/probar-pura.mjs', rutas(['probar-pura.mjs']));
caso('un archivo que ninguna prueba nombra da lista vacía', rutas(['suelta.mjs']) === '', rutas(['suelta.mjs']));
caso('lo de tools/hooks/ cuenta', rutas(['gancho.mjs']) === 'tools/hooks/probar-gancho.mjs', rutas(['gancho.mjs']));
caso('probar-todas.mjs nunca es una prueba, aunque nombre una tool', !rutas(['herramienta.mjs', 'probar-todas.mjs']).includes('probar-todas'), rutas(['herramienta.mjs', 'probar-todas.mjs']));
caso('prueba-escribir.mjs es una prueba: corre cuando cambia una tool que escribe y ella nombra', rutas(['escribe.mjs']) === 'tools/prueba-escribir.mjs', rutas(['escribe.mjs']));
caso('varios cambiados dan la unión sin repetir', rutas(['modulo.mjs', 'herramienta.mjs', 'pura.mjs']) === 'tools/probar-nombra.mjs, tools/probar-pura.mjs', rutas(['modulo.mjs', 'herramienta.mjs', 'pura.mjs']));
caso('un nombre que no existe se ignora', rutas(['no-existe.mjs']) === '', rutas(['no-existe.mjs']));

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
