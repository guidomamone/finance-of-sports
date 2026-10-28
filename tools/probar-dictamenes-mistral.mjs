#!/usr/bin/env node
// tools/probar-dictamenes-mistral.mjs — la prueba de dictamenes-mistral.mjs y del flag --mistral de dictamenes-md.mjs (ítem 7 del punto 478). No llama a Mistral.
//   1. suma el costo de cada «OK … costo=$X» · 2. un fallo no suma y se marca · 3. sin escaneos no corre nada · 4. dictamenes-md.mjs solo llama a Mistral con --mistral
// Uso: node tools/probar-dictamenes-mistral.mjs    (menos de 1 segundo; sale con 1 si algún caso falla)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pasarEscaneos } from './dictamenes-mistral.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const llamadas = [];
const falso = (pdf) => { llamadas.push(pdf); if (/malo/.test(pdf)) throw Object.assign(new Error('boom'), { stdout: 'FALLÓ' }); return `OK ${pdf} -> ${pdf}.md | páginas=3 costo=$0.014 tiempo=900ms`; };

const r = pasarEscaneos(['a.pdf', 'b.pdf'], falso);
caso('1. suma el costo de cada documento', Math.abs(r.costo - 0.028) < 1e-9 && r.resultados.every((x) => x.ok), JSON.stringify(r));
const r2 = pasarEscaneos(['a.pdf', 'malo.pdf'], falso);
caso('2. un fallo no suma costo y queda marcado', r2.resultados[1].ok === false && Math.abs(r2.costo - 0.014) < 1e-9, JSON.stringify(r2));
llamadas.length = 0; const r3 = pasarEscaneos([], falso);
caso('3. sin escaneos no corre nada y el costo es 0', llamadas.length === 0 && r3.costo === 0);
const src = readFileSync(resolve(import.meta.dirname, 'dictamenes-md.mjs'), 'utf8');
caso('4. dictamenes-md.mjs llama a Mistral solo detrás de --mistral', /A\.includes\('--mistral'\)/.test(src) && /pasarEscaneos\(/.test(src) && src.indexOf("A.includes('--mistral')") < src.indexOf('pasarEscaneos('));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
