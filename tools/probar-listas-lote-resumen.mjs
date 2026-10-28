#!/usr/bin/env node
// tools/probar-listas-lote-resumen.mjs — la prueba de listas-lote-resumen.mjs (ítem 9 del punto 478). Sin red.
//   1. sin --lote el resumen es el de siempre · 2. con --lote el aviso de otro club no entra en las líneas «  NO:» del lote · 3. el lote sin fallos dice «1 de 1» y nada de be-* en las líneas que muestra lote-final
//   4. listas-lote.mjs usa lineasResumen y marca delLote en lo que viene de la lista
// Uso: node tools/probar-listas-lote-resumen.mjs    (menos de 1 segundo; sale con 1 si algún caso falla)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { lineasResumen } from './listas-lote-resumen.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const f = (txt, delLote) => ({ txt, delLote });
const lote = [...lineasResumen({ esLote: false, ok: [{}], fallan: [f('be-div1amateur 2013: x', true)], ensayo: true })];
caso('1. sin --lote: «1 de 2 liga-años pasaron la compuerta (ensayo…)» y la línea NO de siempre', /1 de 2 liga-años pasaron la compuerta \(ensayo: no se escribió nada\)\.$/.test(lote[0]) && lote[1] === '  NO: be-div1amateur 2013: x', lote.join('|'));
const L = lineasResumen({ esLote: true, ok: [{ delLote: true }], fallan: [f('be-div1amateur 2013: x', false)], ensayo: true });
const mostradas = L.filter((l) => /^listas-lote:|^ {2}NO:/.test(l.trim() ? l.replace(/^\n/, '') : l));
caso('2. con --lote: el fallo de otro club no está en las líneas que muestra lote-final', !mostradas.join('\n').includes('be-div1amateur'), mostradas.join('|'));
caso('3. el lote dice «1 de 1» y el aviso de otro club queda aparte como «(fuera del lote) NO:»', /1 de 1 liga-años pasaron la compuerta \(los de la lista del lote\)/.test(L[0]) && L.some((l) => l.startsWith('  (fuera del lote) NO: be-div1amateur')), L.join('|'));
caso('3b. un fallo del propio lote sí se muestra como «  NO:»', lineasResumen({ esLote: true, ok: [], fallan: [f('co-primeraA 2024: y', true)], ensayo: false }).includes('  NO: co-primeraA 2024: y'));
const src = readFileSync(resolve(import.meta.dirname, 'listas-lote.mjs'), 'utf8');
caso('4. listas-lote.mjs usa lineasResumen y marca delLote', /lineasResumen\(/.test(src) && /delLote/.test(src));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
