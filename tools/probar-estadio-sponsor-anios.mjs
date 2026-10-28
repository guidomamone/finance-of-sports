#!/usr/bin/env node
// tools/probar-estadio-sponsor-anios.mjs — la prueba de estadio-sponsor-anios.mjs y de --anios en estadio-sponsor.mjs (ítem 15 del punto 478). Solo lee (el ensayo no escribe; las páginas ya están en la caché).
//   1. parseAnios · 2. la fila sale de la línea de porcentajes · 3. la tabla marca lo que falta · 4. --anios 2016-2022 de Envigado da, año por año, lo mismo que cada llamada suelta con --anio
// Uso: node tools/probar-estadio-sponsor-anios.mjs    (unos segundos; sale con 1 si algún caso falla)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { parseAnios, filaDe, tablaAnios } from './estadio-sponsor-anios.mjs';

const ROOT = resolve(import.meta.dirname, '..');
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const linea = (e, c, s, m) => `de 1 ejercicios: estadio ${e} (${e * 100}%) · capacidad ${c} (${c * 100}%) · sponsor ${s} (${s * 100}%) · marca ${m} (${m * 100}%)`;

caso('1. parseAnios: rango, lista y sin repetir', parseAnios('2018-2020,2019,2022').join() === '2018,2019,2020,2022');
let f = 0; for (const mala of ['2020-2018', 'x', '']) try { parseAnios(mala); } catch { f++; }
caso('1b. un rango al revés, mal escrito o vacío falla', f === 3, `${f} de 3`);
caso('2. filaDe lee los cuatro porcentajes', JSON.stringify(filaDe(linea(1, 1, 0, 1))) === JSON.stringify({ ejercicios: 1, estadio: 100, capacidad: 100, sponsor: 0, marca: 100 }));
const T = tablaAnios([2016, 2017], (a) => (a === 2016 ? linea(1, 1, 1, 1) : linea(1, 1, 0, 1)));
caso('3. la tabla marca el año que tiene algo en 0 %', T.length === 4 && !/falta completar/.test(T[1]) && /falta completar/.test(T[2]), T.join('|'));
caso('3b. un año sin la línea se dice, no se omite', tablaAnios([2016], () => 'nada').some((l) => /2016\s+sin datos/.test(l)));

// 4. contra las llamadas sueltas (datos reales, Envigado)
const correr = (...a) => spawnSync('node', ['tools/estadio-sponsor.mjs', '--ensayo', '--club', 'envigado-co', ...a], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 }).stdout;
const tabla = correr('--anios', '2016-2022');
const filas = tabla.split('\n').filter((l) => /^\d{4} /.test(l));
caso('4. --anios 2016-2022 imprime una fila por año', filas.length === 7, tabla.slice(0, 400));
let iguales = 0;
for (const a of [2016, 2017, 2018, 2019, 2020, 2021, 2022]) { const suelta = filaDe(correr('--anio', String(a))); const esperada = tablaAnios([a], () => correr('--anio', String(a)))[1]; if (suelta && filas.find((l) => l.startsWith(`${a} `)) === esperada) iguales++; }
caso('4b. cada fila es igual a la de la llamada suelta de ese año', iguales === 7, `${iguales} de 7`);

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
