#!/usr/bin/env node
// tools/probar-sponsor-fka.mjs — la prueba de sponsor-fka.mjs (ítem 3 del punto 478): qué años busca --buscar, sin red ni gasto.
//   1. sin opción, los débiles · 2. --anio uno solo de los débiles · 3. --anios AAAA-AAAA busca esos años aunque sean sólidos · 4. --anios con listas y rangos, sin repetir · 5. --todos busca todos los del club
//   6. un rango al revés o mal escrito falla · 7. buscar no escribe contexto-manual.json (el módulo no lo importa para escribir) · 8. el brief usa --todos
// Uso: node tools/probar-sponsor-fka.mjs    (menos de 1 segundo; sale con 1 si algún caso falla; no llama a Exa)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { aniosABuscar } from './sponsor-fka.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const D = ['2018', '2020'], T = ['2015', '2016', '2018', '2019', '2020'];
const j = (x) => JSON.stringify(x);

caso('1. sin opción: los débiles', j(aniosABuscar({ debilesAnios: D, todosAnios: T })) === j(D));
caso('2. --anio: solo ese, si es débil', j(aniosABuscar({ debilesAnios: D, todosAnios: T, soloAnio: '2020' })) === j(['2020']));
caso('3. --anios 2015-2017 busca esos años aunque ninguno sea débil', j(aniosABuscar({ debilesAnios: D, todosAnios: T, anios: '2015-2017' })) === j(['2015', '2016', '2017']));
caso('4. --anios con lista y rango, sin repetir y ordenado', j(aniosABuscar({ debilesAnios: [], todosAnios: T, anios: '2019,2015-2016,2016' })) === j(['2015', '2016', '2019']));
caso('5. --todos: todos los del club', j(aniosABuscar({ debilesAnios: D, todosAnios: T, todos: true })) === j(T));
let fallo = 0; for (const mala of ['2020-2018', 'abc', '15-2016']) try { aniosABuscar({ debilesAnios: [], todosAnios: [], anios: mala }); } catch { fallo++; }
caso('6. un rango al revés o mal escrito falla', fallo === 3, `${fallo} de 3`);
const t = readFileSync(resolve(import.meta.dirname, 'sponsor-fka.mjs'), 'utf8');
caso('7. buscar no escribe contexto-manual.json', !/writeFileSync\([^)]*contexto-manual/.test(t));
caso('8. el brief de estadio-sponsor usa --todos y no el truco de «una sola fuente»', (() => { const b = readFileSync(resolve(import.meta.dirname, '../Admin/briefs-subagentes-siis.md'), 'utf8'); return /sponsor-fka\.mjs \{\{CLUBID\}\} --buscar --todos/.test(b) && !/una sola fuente por año/.test(b); })());

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
