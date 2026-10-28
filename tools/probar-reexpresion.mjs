#!/usr/bin/env node
// tools/probar-reexpresion.mjs — la prueba de reexpresion.mjs (ítem 12 del punto 478): reexpresión real, fila de lado `otro`, redondeo y sin diferencias; y el resultado sobre Atlético Nacional.
// Uso: node tools/probar-reexpresion.mjs    (menos de 1 segundo; solo lee; sale con 1 si algún caso falla)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { analizarPar } from './reexpresion.mjs';

const ROOT = resolve(import.meta.dirname, '..');
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const reg = (o, col) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { [col]: v }]));
const A = reg({ ingresosActividadesOrdinarias: 100, otrosIngresos: 50, gananciaPerdida: 7 }, 'corte');
const fila = (etiqueta, lado, actual, anterior) => ({ etiqueta, lado, actual, anterior, tipo: 'renglon' });

caso('1. reexpresión: cambia un rubro más de 5 miles', analizarPar(A, reg({ ingresosActividadesOrdinarias: 100, otrosIngresos: 10, gananciaPerdida: 7 }, 'corteAnterior')).tipo === 'reexpresion');
caso('1b. y dice si el resultado coincide', analizarPar(A, reg({ ingresosActividadesOrdinarias: 100, otrosIngresos: 10, gananciaPerdida: 7 }, 'corteAnterior')).resultadoCoincide === true);
caso('1c. el resultado que difiere se marca', analizarPar(A, reg({ ingresosActividadesOrdinarias: 100, otrosIngresos: 50, gananciaPerdida: 9 }, 'corteAnterior')).resultadoCoincide === false);
const igual = reg({ ingresosActividadesOrdinarias: 100, otrosIngresos: 50, gananciaPerdida: 7 }, 'corteAnterior');
caso('2. sin diferencias ni fila de lado otro: sin diferencias', analizarPar(A, igual, [fila('Ingresos', 'ingreso', '100', '90')], [fila('Ingresos', 'ingreso', '120', '100')]).tipo === 'sin-diferencias');
const r = analizarPar(A, igual, [fila('Otras ganancias', 'otro', '14.900', '1')], [fila('Otras ganancias', 'otro', '2', '14.900')]);
caso('3. cifras iguales y una fila otro idéntica en los dos estados: FILA con su etiqueta', r.tipo === 'fila' && r.otroFila.etiqueta === 'Otras ganancias', JSON.stringify(r));
caso('3b. la fila con otro importe en el segundo estado no es la misma', analizarPar(A, igual, [fila('Otras ganancias', 'otro', '14.900', '1')], [fila('Otras ganancias', 'otro', '2', '9')]).tipo === 'sin-diferencias');
caso('4. una diferencia de 4 miles es redondeo (y con fila otro sigue siendo FILA)', analizarPar(A, reg({ ingresosActividadesOrdinarias: 100, otrosIngresos: 54, gananciaPerdida: 7 }, 'corteAnterior')).tipo === 'redondeo');

// Atlético Nacional (datos reales, solo lectura): reexpresiones 2015/2016 y 2018/2019; filas en 2019/2020, 2020/2021, 2023/2024 y 2024/2025
const o = spawnSync('node', [resolve(ROOT, 'tools/reexpresion.mjs'), 'Atletico Nacional', '2015', '2025'], { cwd: ROOT, encoding: 'utf8' }).stdout;
const tipoDe = (par) => (o.split('\n').find((l) => l.startsWith(`${par}:`)) || '').match(/^\S+ (REEXPRESIÓN|FILA|solo redondeo|sin diferencias)/)?.[1];
for (const [par, tipo] of [['2015/2016', 'REEXPRESIÓN'], ['2018/2019', 'REEXPRESIÓN'], ['2019/2020', 'FILA'], ['2020/2021', 'FILA'], ['2023/2024', 'FILA'], ['2024/2025', 'FILA'], ['2016/2017', 'sin diferencias']]) caso(`5. Atlético Nacional ${par}: ${tipo}`, tipoDe(par) === tipo, tipoDe(par));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
