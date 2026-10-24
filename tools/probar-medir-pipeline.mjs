#!/usr/bin/env node
// ============================================================================
// tools/probar-medir-pipeline.mjs — LA PRUEBA DE medir-pipeline.mjs
// ============================================================================
// Todo el 371 depende de que «idéntico» sea cierto: un medidor que reutiliza un resultado viejo o deja un archivo escrito es peor que no medir. Esta prueba arma un repo de juguete (una tool falsa, un
// medidor falso, una tabla propia) en Admin/mediciones/pipeline/_prueba-repo, le copia medir-pipeline.mjs y lo hace correr contra cambios conocidos:
//   1. un cambio sin efecto da «idéntico», sale con 0, anota el registro y deja la tool como estaba editada;
//   2. un cambio que altera la salida da «sin explicar» y sale con 1; con --explicacion sale con 0 y la explicación queda en el registro;
//   3. cambiar un archivo de tools/ que NO es de la tabla (lo que lee el medidor) cambia la clave de la caché: no se reutiliza lo viejo;
//   4. lo que el medidor escribe en un archivo trackeado de tools/ se revierte;
//   5. una corrida que murió a la mitad deja un respaldo: la siguiente se niega, y --restaurar devuelve las tools;
//   6. sin tools cambiadas dice «nada que medir»;
//   7. mientras mide deja un candado con su pid (lo lee el hook para no dejar editar) y lo suelta al terminar;
//   8. un cambio de solo comentarios no corre el lote: pasa por la comparación sin comentarios y anota «idéntico» (lote «solo-comentarios»); si además cambia el código, va por los lotes.
// USO: node tools/probar-medir-pipeline.mjs    (menos de 1 minuto; sale con 1 si algún caso falla; no toca nada fuera de su carpeta de prueba)
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = resolve(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-repo');
rmSync(T, { recursive: true, force: true });
for (const d of ['tools', 'Admin/lotes', 'Admin/registros']) mkdirSync(join(T, d), { recursive: true });
for (const f of ['medir-pipeline.mjs', 'familias-docs.mjs', 'clasificar-tools.mjs', 'patron.mjs', 'comparar-sin-comentarios.js']) copyFileSync(join(ROOT, 'tools', f), join(T, 'tools', f));
const w = (rel, txt) => writeFileSync(join(T, rel), txt);
const leer = (rel) => readFileSync(join(T, rel), 'utf8');
const NP = Object.fromEntries(['medir-pipeline.mjs', 'familias-docs.mjs', 'clasificar-tools.mjs', 'patron.mjs', 'comparar-sin-comentarios.js', 'fake-medidor.mjs'].map((f) => [f, 'prueba']));
w('tools/pipeline-tools.json', JSON.stringify({
  lotes: { chico: 'Admin/lotes/prueba-rapida.txt', mediano: 'Admin/lotes/prueba-mediana.txt', completo: 'Admin/lotes/prueba-completa.txt' },
  medidores: { salida: { que: 'prueba', usaLista: false, correr: ['tools/fake-medidor.mjs'], comparar: 'texto' } },
  tools: { 'fake-tool.mjs': { alcance: 'etapa', medidores: ['salida'] } }, no_pipeline: NP,
}, null, 1));
for (const n of ['rapida', 'mediana', 'completa']) w(`Admin/lotes/prueba-${n}.txt`, 'Clubes/Pais/Club/doc.pdf\n');
w('Admin/registros/.gitkeep', ''); // que la carpeta del registro sobreviva a git clean
w('tools/fake-tool.mjs', 'export const VALOR = 1;\n');
w('tools/dato.json', '{"d":"A"}\n');
w('tools/escribe.json', '{"n":0}\n');
w('tools/fake-medidor.mjs', [
  "import { readFileSync, writeFileSync } from 'node:fs';",
  "import { VALOR } from './fake-tool.mjs';",
  "import { existsSync, copyFileSync } from 'node:fs';",
  "const candado = `${import.meta.dirname}/../Admin/mediciones/pipeline/_corriendo`; if (existsSync(candado)) copyFileSync(candado, `${import.meta.dirname}/../Admin/mediciones/pipeline/_candado-visto`);",
  "const dir = import.meta.dirname;",
  "const d = JSON.parse(readFileSync(`${dir}/dato.json`, 'utf8')).d;",
  "const e = JSON.parse(readFileSync(`${dir}/escribe.json`, 'utf8')); writeFileSync(`${dir}/escribe.json`, JSON.stringify({ n: e.n + 1 }) + '\\n'); // efecto al costado a propósito",
  "if (d === 'VACIO') process.exit(0); // un medidor que no imprime nada",
  "console.log(`valor=${VALOR} dato=${d}`);", ''].join('\n'));
const g = (...a) => spawnSync('git', ['-c', 'user.email=prueba@prueba', '-c', 'user.name=prueba', ...a], { cwd: T, encoding: 'utf8' });
g('init', '-q'); g('add', '-A'); g('commit', '-q', '-m', 'base');
const volver = () => { g('checkout', '--', '.'); g('clean', '-fdq', '--', 'tools', 'Admin/registros'); rmSync(join(T, 'Admin/mediciones/pipeline'), { recursive: true, force: true }); };
const medir = (...args) => { const r = spawnSync('node', ['tools/medir-pipeline.mjs', ...args], { cwd: T, encoding: 'utf8', maxBuffer: 1 << 26 }); return { status: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
const registro = () => (existsSync(join(T, 'Admin/registros/mediciones-pipeline.jsonl')) ? leer('Admin/registros/mediciones-pipeline.jsonl').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

// 1. cambio sin efecto
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 0; // un comentario\n');
let r = medir();
caso('un cambio sin efecto da idéntico y sale con 0', r.status === 0 && /idéntico/.test(r.out) && registro().at(-1)?.resultado === 'idéntico', r.out.slice(-300));
const visto = join(T, 'Admin/mediciones/pipeline/_candado-visto');
caso('mientras mide hay un candado con el pid de la corrida, y al terminar ya no está', existsSync(visto) && Number(JSON.parse(readFileSync(visto, 'utf8')).pid) > 0 && !existsSync(join(T, 'Admin/mediciones/pipeline/_corriendo')), existsSync(visto) ? readFileSync(visto, 'utf8') : 'el medidor no vio el candado');
caso('la tool queda como se editó (no la versión de git)', leer('tools/fake-tool.mjs').includes('un comentario'));
caso('lo que el medidor escribe en un archivo trackeado se revierte', g('status', '--porcelain', 'tools/escribe.json').stdout === '' && /revertido/.test(r.out), g('status', '--porcelain').stdout);
const claveUno = registro().at(-1)?.medidores?.[0]?.despues;

// 3. la clave de la caché incluye lo que no es de la tabla: dato.json cambia y la caché no se reutiliza
w('tools/dato.json', '{"d":"B"}\n');
r = medir();
const claveDos = registro().at(-1)?.medidores?.[0]?.despues;
caso('cambiar un archivo de tools/ que no es de la tabla cambia la clave de la caché', claveUno && claveDos && claveUno !== claveDos && !/antes reutilizado/.test(r.out), `${claveUno} / ${claveDos}`);
volver();

// 2. un cambio que altera la salida
w('tools/fake-tool.mjs', 'export const VALOR = 2;\n');
r = medir();
caso('un cambio que altera la salida da «sin explicar» y sale con 1', r.status === 1 && /sin explicar/.test(r.out), r.out.slice(-300));
caso('la tool queda con el valor editado', leer('tools/fake-tool.mjs').includes('VALOR = 2'));
volver();
w('tools/fake-tool.mjs', 'export const VALOR = 3;\n');
r = medir('--explicacion', 'cambié el valor a propósito');
const ultima = registro().at(-1);
caso('con --explicacion sale con 0 y la explicación queda en el registro', r.status === 0 && /todas explicadas/.test(ultima?.resultado || '') && ultima?.explicacion === 'cambié el valor a propósito', r.out.slice(-300));
volver();

// 5. una corrida que murió a la mitad
w('tools/fake-tool.mjs', 'export const VALOR = 4; // editada\n');
mkdirSync(join(T, 'Admin/mediciones/pipeline/_respaldo'), { recursive: true });
w('Admin/mediciones/pipeline/_respaldo/fake-tool.mjs', 'export const VALOR = 99; // la versión que había antes de morir\n');
r = medir();
caso('con un respaldo de una corrida muerta, la siguiente se niega y dice cómo', r.status === 1 && /--restaurar/.test(r.out), r.out.slice(-200));
r = medir('--restaurar');
caso('--restaurar devuelve las tools desde el respaldo', leer('tools/fake-tool.mjs').includes('VALOR = 99') && !existsSync(join(T, 'Admin/mediciones/pipeline/_respaldo/fake-tool.mjs')), leer('tools/fake-tool.mjs'));
volver();

// 6. nada cambió
r = medir();
caso('sin tools cambiadas dice «nada que medir»', r.status === 0 && /nada que medir/.test(r.out), r.out.slice(-200));

// 7. solo comentarios
w('tools/fake-tool.mjs', 'export const VALOR = 1; // otro comentario, más largo\n');
r = medir();
let ult = registro().at(-1);
caso('un cambio de solo comentarios pasa por la comparación y anota idéntico, sin lote', r.status === 0 && /Solo comentarios/.test(r.out) && ult?.resultado === 'idéntico' && ult?.lote?.nivel === 'solo-comentarios', r.out.slice(-300));
caso('un cambio de solo comentarios no corre el medidor', !/Lote chico/.test(r.out), r.out.slice(-200));
volver();
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 5; // otro comentario\n');
r = medir();
caso('si además cambia el código, va por los lotes', !/Solo comentarios/.test(r.out) && /Lote chico/.test(r.out), r.out.slice(-300));
volver();

// 9. un medidor que no imprime nada no da «idéntico»
w('tools/dato.json', '{"d":"VACIO"}\n');
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 7;\n');
r = medir();
caso('un medidor vacío antes y después no da idéntico: dice VACÍO, sale con 1 y no anota una línea buena', r.status === 1 && /VACÍO/.test(r.out) && !/idéntico/.test(r.out.split('Resultado')[1] || '') && !registro().some((l) => l.resultado === 'idéntico' && l.tools?.['fake-tool.mjs']), r.out.slice(-300));
volver();
w('tools/dato.json', '{"d":"VACIO"}\n');
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 8;\n');
r = medir('--explicacion', 'el medidor no tiene nada que imprimir en este caso');
caso('un medidor vacío con --explicacion sale con 0 y queda «diferencias, todas explicadas»', r.status === 0 && /^1 diferencias, todas explicadas$/.test(registro().at(-1)?.resultado || ''), r.out.slice(-300) + JSON.stringify(registro().at(-1)?.resultado));
volver();

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
