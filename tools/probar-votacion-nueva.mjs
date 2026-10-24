#!/usr/bin/env node
// tools/probar-votacion-nueva.mjs — la prueba de votacion-nueva.mjs: el cuánto mueve, la lista fija de qué abrir, el formato del voto y que no pisa un archivo.
// Uso: node tools/probar-votacion-nueva.mjs (sale con 1 si un caso falla; escribe un caso de prueba en Admin/mediciones/ y lo borra al terminar).
import { existsSync, rmSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = resolve(ROOT, 'Admin', 'mediciones', '999-votacion-prueba.md');
if (existsSync(SALIDA)) { console.error(`${SALIDA} ya existe: borralo antes de probar`); process.exit(1); }
const correr = (...a) => { const r = spawnSync('node', ['tools/votacion-nueva.mjs', '--id', '999', '--slug', 'prueba', '--titulo', 'caso de prueba', ...a], { cwd: ROOT, encoding: 'utf8' }); return { status: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

let r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|100,5', '--total', '1000');
caso('el ensayo imprime el caso y no escribe', r.status === 0 && /Votación 999/.test(r.out) && !existsSync(SALIDA), r.out.slice(0, 300));
caso('0,05 % del total: 1 % o menos, no se vota', /0,05 % del total 1000: 1 % o menos/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--total', '1000', '--club', 'sonderjyske-dk', '--palabras', 'Bruttofortjeneste');
caso('20 % del total: votan tres', /20 % del total 1000: más de 1 %, votan tres/.test(r.out), r.out);
caso('la lista fija trae la regla de CONVENCIONES-DATOS.md con su línea y el precedente del club', /CONVENCIONES-DATOS\.md:\d+ — /.test(r.out) && /data\/dk\/sonderjyske-dk\.json/.test(r.out), r.out);
caso('el voto se pide en JSON con criterios 1 a 9 y no_abri', /"criterios"/.test(r.out) && /"no_abri"/.test(r.out) && /Conclusión:/.test(r.out) && /Destino:/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--escribir');
caso('--escribir crea el archivo con la marca de primera línea', r.status === 0 && existsSync(SALIDA) && readFileSync(SALIDA, 'utf8').startsWith('<!-- md:'), r.out);
r = correr('--opcion', 'A=uno|100', '--opcion', 'B=dos|300', '--escribir');
caso('no pisa un archivo que ya existe', r.status === 1 && /no se pisa/.test(r.out), r.out);
r = correr('--opcion', 'A=uno|100');
caso('con una sola opción se rechaza', r.status === 1 && /al menos dos/.test(r.out), r.out);
rmSync(SALIDA, { force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
