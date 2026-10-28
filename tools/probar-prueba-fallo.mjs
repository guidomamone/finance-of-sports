#!/usr/bin/env node
// tools/probar-prueba-fallo.mjs — la prueba de prueba-fallo.mjs y de su uso en probar-todas.mjs: al fallar una prueba se ve por qué, también si no usa la convención «MAL».
//   1. una prueba con líneas MAL: se muestran (hasta 3) y el código · 2. una sin MAL (prueba-escribir): la cola de stdout y stderr, sin el ruido de git · 3. tiempo agotado se dice · 4. probar-todas.mjs usa resumenFallo
// Uso: node tools/probar-prueba-fallo.mjs    (menos de 1 segundo; sale con 1 si algún caso falla)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { resumenFallo } from './prueba-fallo.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const a = resumenFallo({ status: 1, stdout: 'ok uno\nMAL caso A — x\nMAL caso B\nMAL caso C\nMAL caso D\n', stderr: 'ruido' });
caso('1. con líneas MAL: las 3 primeras y el código, sin la cola', a.filter((l) => l.startsWith('MAL')).length === 3 && a.at(-1) === '(salió con código 1)' && !a.some((l) => l.includes('ruido')), a.join('|'));
const b = resumenFallo({ status: 1, stdout: 'Preparing worktree (detached HEAD abc)\nUpdating files:  10% (1/10)\n  ok algo\nprueba-escribir: FALLÓ: REVERTIDO: audit dio P1\n', stderr: 'Error: boom\n' });
caso('2. sin MAL: la cola de stdout y stderr, sin el ruido de git', b.some((l) => l.includes('prueba-escribir: FALLÓ: REVERTIDO')) && b.some((l) => l.includes('Error: boom')) && !b.some((l) => /Updating files|Preparing worktree/.test(l)), b.join('|'));
const c = resumenFallo({ status: null, stdout: '', stderr: '', error: Object.assign(new Error('spawnSync node ETIMEDOUT'), { code: 'ETIMEDOUT' }) });
caso('3. tiempo agotado se dice', c.includes('(no terminó: tiempo agotado)'), c.join('|'));
caso('3b. un largo de más se corta al máximo pedido', resumenFallo({ status: 1, stdout: Array.from({ length: 30 }, (_, i) => `línea ${i}`).join('\n') }, { max: 5 }).filter((l) => l.startsWith('  |')).length === 5);
caso('4. probar-todas.mjs usa resumenFallo', /resumenFallo\(r/.test(readFileSync(resolve(import.meta.dirname, 'probar-todas.mjs'), 'utf8')));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
