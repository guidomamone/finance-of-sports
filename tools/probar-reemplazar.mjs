#!/usr/bin/env node
// tools/probar-reemplazar.mjs — la prueba de reemplazar.mjs en un repo de juguete en Admin/mediciones/pipeline/_prueba-reemplazar.
// Uso: node tools/probar-reemplazar.mjs (sale con 1 si un caso falla; no toca nada fuera de su carpeta).
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = join(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-reemplazar');
rmSync(T, { recursive: true, force: true });
mkdirSync(join(T, 'tools'), { recursive: true });
for (const f of ['reemplazar.mjs', 'comparar-sin-comentarios.js']) copyFileSync(join(ROOT, 'tools', f), join(T, 'tools', f));
const w = (rel, txt) => writeFileSync(join(T, rel), txt);
const leer = (rel) => readFileSync(join(T, rel), 'utf8');
w('a.js', "const x = 'hola mundo'; // hola mundo en un comentario\nconst y = 1;\n");
w('b.js', "// hola mundo\nconsole.log('adiós');\n");
w('c.txt', 'hola mundo\n');
const g = (...a) => spawnSync('git', ['-c', 'user.email=p@p', '-c', 'user.name=p', ...a], { cwd: T, encoding: 'utf8' });
g('init', '-q'); g('add', '-A'); g('commit', '-q', '-m', 'base');
const correr = (...args) => { const r = spawnSync('node', ['tools/reemplazar.mjs', ...args], { cwd: T, encoding: 'utf8' }); return { status: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

let r = correr('a.js', 'b.js', 'c.txt', '--de', 'hola mundo', '--a', 'chau');
caso('el ensayo cuenta y no escribe', r.status === 0 && /Ensayo: 4 reemplazo/.test(r.out) && leer('a.js').includes("'hola mundo'"), r.out);
r = correr('a.js', 'b.js', 'c.txt', '--de', 'hola mundo', '--a', 'chau', '--escribir');
caso('--escribir cambia todas las apariciones en todos los archivos', r.status === 0 && !leer('a.js').includes('hola') && !leer('b.js').includes('hola') && leer('c.txt') === 'chau\n', r.out);
g('checkout', '--', '.');
r = correr('a.js', 'b.js', '--de', 'hola mundo', '--a', 'chau', '--solo-comentarios', '--escribir');
caso('--solo-comentarios no toca el texto de un string', r.status === 0 && leer('a.js').includes("'hola mundo'") && leer('a.js').includes('// chau en un comentario') && leer('b.js').startsWith('// chau'), r.out + leer('a.js'));
g('checkout', '--', '.');
r = correr('c.txt', '--regex', '--de', '(hola) (\\w+)', '--a', '$2 $1', '--escribir');
caso('--regex usa $1 y $2', r.status === 0 && leer('c.txt') === 'mundo hola\n', r.out + leer('c.txt'));
g('checkout', '--', '.');
w('cambios.json', JSON.stringify([{ file: 'a.js', edits: [[2, 'const y = 1;', 'const y = 2;']] }, { file: 'b.js', edits: [[2, 'no está esto', 'x']] }]));
r = correr('--lista', 'cambios.json', '--escribir');
caso('--lista con un cambio que falla no escribe ningún archivo', r.status === 1 && leer('a.js').includes('const y = 1;') && /no está/.test(r.out), r.out);
w('cambios.json', JSON.stringify([{ file: 'a.js', edits: [[2, 'const y = 1;', 'const y = 2;']] }, { file: 'b.js', edits: [[2, "adi.s", 'adeu', 're']] }]));
r = correr('--lista', 'cambios.json', '--escribir');
caso('--lista aplica los cambios exactos y los de regex', r.status === 0 && leer('a.js').includes('const y = 2;') && leer('b.js').includes("'adeu'"), r.out + leer('b.js'));
r = correr('a.js', '--de', 'const y = 2;', '--a', 'const y = 3;', '--escribir');
caso('se niega a escribir un archivo con cambios sin commitear', r.status === 1 && /sin commitear/.test(r.out) && leer('a.js').includes('const y = 2;'), r.out);
r = correr('c.txt', '--de', 'nadie', '--a', 'x');
caso('sin apariciones sale con 1', r.status === 1 && /Nada que reemplazar/.test(r.out), r.out);

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
