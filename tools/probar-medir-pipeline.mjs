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
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = resolve(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-repo');
rmSync(T, { recursive: true, force: true });
for (const d of ['tools', 'Admin/lotes', 'Admin/registros']) mkdirSync(join(T, d), { recursive: true });
for (const f of ['medir-pipeline.mjs', 'familias-docs.mjs', 'clasificar-tools.mjs', 'patron.mjs', 'comparar-sin-comentarios.js', 'registro-esquema.js', 'esquemas-registros.json', 'duraciones-lib.mjs', 'patrones-tools.mjs']) copyFileSync(join(ROOT, 'tools', f), join(T, 'tools', f));
const w = (rel, txt) => writeFileSync(join(T, rel), txt);
const leer = (rel) => readFileSync(join(T, rel), 'utf8');
const NP = Object.fromEntries(['medir-pipeline.mjs', 'familias-docs.mjs', 'clasificar-tools.mjs', 'patron.mjs', 'comparar-sin-comentarios.js', 'registro-esquema.js', 'fake-medidor.mjs'].map((f) => [f, 'prueba']));
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
  "const candado = `${import.meta.dirname}/../Admin/mediciones/pipeline/_corriendo`; if (existsSync(candado)) { copyFileSync(candado, `${import.meta.dirname}/../Admin/mediciones/pipeline/_candado-visto`); writeFileSync(`${import.meta.dirname}/../Admin/mediciones/pipeline/_env-visto`, String(process.env.FOS_MIDIENDO)); }",
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
{ const antes = registro().length; const r = medir('--ayuda');
  caso('un argumento desconocido frena sin medir ni anotar nada', r.status === 1 && /Argumento desconocido: --ayuda/.test(r.out) && registro().length === antes, r.out.slice(0, 160)); }

// 1. cambio sin efecto
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 0; // un comentario\n');
let r = medir();
caso('un cambio sin efecto da idéntico y sale con 0', r.status === 0 && /idéntico/.test(r.out) && registro().at(-1)?.resultado === 'idéntico', r.out.slice(-300));
const visto = join(T, 'Admin/mediciones/pipeline/_candado-visto');
caso('mientras mide hay un candado con el pid de la corrida, y al terminar ya no está', existsSync(visto) && Number(JSON.parse(readFileSync(visto, 'utf8')).pid) > 0 && !existsSync(join(T, 'Admin/mediciones/pipeline/_corriendo')), existsSync(visto) ? readFileSync(visto, 'utf8') : 'el medidor no vio el candado');
caso('los hijos de la medición ven FOS_MIDIENDO=1 (las tools que escriben registros no se niegan)', existsSync(join(T, 'Admin/mediciones/pipeline/_env-visto')) && leer('Admin/mediciones/pipeline/_env-visto') === '1');
caso('la tool queda como se editó (no la versión de git)', leer('tools/fake-tool.mjs').includes('un comentario'));
caso('lo que el medidor escribe en un archivo trackeado se revierte', g('status', '--porcelain', 'tools/escribe.json').stdout === '' && /revertido/.test(r.out), g('status', '--porcelain').stdout);
const claveUno = registro().at(-1)?.medidores?.[0]?.despues;

// 2b. la prueba de escritura se pide a una tool que LEE --escribir, no a una que lo nombra
w('tools/fake-tool.mjs', "export const VALOR = 1; export const OTRO = 0; // un comentario con --escribir\nexport const AYUDA = 'uso: node tools/x.mjs --escribir';\n");
r = medir();
caso('una tool que nombra --escribir en un comentario o en un mensaje no pide prueba de escritura', !/sin prueba de escritura/.test(r.out), r.out.slice(-300));
w('tools/fake-tool.mjs', "export const VALOR = 1; export const OTRO = 0; export const ESCRIBE = process.argv.includes('--escribir');\n");
r = medir();
caso('una tool que lee --escribir y no tiene su prueba no da idéntico', /sin prueba de escritura/.test(r.out), r.out.slice(-300));
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 0; // un comentario\n');

// 3. la clave de la caché incluye lo que no es de la tabla: dato.json cambia y la caché no se reutiliza
w('tools/dato.json', '{"d":"B"}\n');
r = medir();
const claveDos = registro().at(-1)?.medidores?.[0]?.despues;
caso('cambiar un archivo de tools/ que no es de la tabla cambia la clave de la caché', claveUno && claveDos && claveUno !== claveDos && !/antes reutilizado/.test(r.out), `${claveUno} / ${claveDos}`);
volver();

// un veredicto sin commitear (auditoria-proceso.jsonl: lo escribe patron.mjs, no un medidor) no frena la medición siguiente
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 2;\n');
w('Admin/registros/auditoria-proceso.jsonl', '{"veredicto":"RECHAZADA"}\n');
r = medir();
caso('un veredicto sin commitear en auditoria-proceso.jsonl no frena la medición', r.status === 0 && !/sin commitear/.test(r.out), r.out.slice(-300));
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

// 8b. una segunda medición se niega y NO borra el candado de la primera (antes lo pisaba y al salir lo borraba)
w('tools/fake-tool.mjs', 'export const VALOR = 1; export const OTRO = 9;\n');
mkdirSync(join(T, 'Admin/mediciones/pipeline'), { recursive: true });
w('Admin/mediciones/pipeline/_corriendo', JSON.stringify({ pid: process.pid }));
r = medir();
caso('con una medición en curso (pid vivo) otra se niega con 1 y dice el pid', r.status === 1 && r.out.includes(`pid ${process.pid}`), r.out.slice(-300));
caso('y el candado de la primera sigue ahí con su pid', existsSync(join(T, 'Admin/mediciones/pipeline/_corriendo')) && JSON.parse(leer('Admin/mediciones/pipeline/_corriendo')).pid === process.pid);
rmSync(join(T, 'Admin/mediciones/pipeline/_corriendo'), { force: true });
volver();

// 9. una tool que escribe registros se niega mientras hay una medición en curso (tools/candado-medicion.mjs)
copyFileSync(join(ROOT, 'tools', 'candado-medicion.mjs'), join(T, 'tools', 'candado-medicion.mjs'));
w('tools/fake-escritor.mjs', "import { writeFileSync } from 'node:fs';\nimport { negarSiSeMide } from './candado-medicion.mjs';\nnegarSiSeMide('fake-escritor.mjs', { si: !process.argv.includes('--solo-leer') });\nwriteFileSync(`${import.meta.dirname}/../escribio.txt`, 'si');\n");
const escritor = (...a) => { rmSync(join(T, 'escribio.txt'), { force: true }); const r = spawnSync('node', ['tools/fake-escritor.mjs', ...a], { cwd: T, encoding: 'utf8', env: { ...process.env, ...(a.includes('--hijo') ? { FOS_MIDIENDO: '1' } : {}) } }); return { status: r.status, out: (r.stdout || '') + (r.stderr || ''), escribio: existsSync(join(T, 'escribio.txt')) }; };
const candadoDir = join(T, 'Admin/mediciones/pipeline'); mkdirSync(candadoDir, { recursive: true });
r = escritor();
caso('sin medición en curso la tool escribe', r.status === 0 && r.escribio, r.out);
w('Admin/mediciones/pipeline/_corriendo', JSON.stringify({ pid: process.pid }));
r = escritor();
caso('con una medición en curso (pid vivo) la tool se niega con 3, dice el pid y no escribe', r.status === 3 && !r.escribio && r.out.includes(`pid ${process.pid}`), r.out);
caso('un modo que no escribe (la condición `si`) no se niega', escritor('--solo-leer').status === 0);
caso('--ignorar-medicion deja pasar (emergencia)', escritor('--ignorar-medicion').escribio);
caso('un hijo de la medición (FOS_MIDIENDO=1) no se niega', escritor('--hijo').escribio);
w('Admin/mediciones/pipeline/_corriendo', JSON.stringify({ pid: 2147483000 }));
caso('un candado de un pid muerto no cuenta', escritor().escribio);
rmSync(join(T, 'Admin/mediciones/pipeline/_corriendo'), { force: true });

// 10. el chequeo de nombres del veredicto corre antes de medir y frena: el código que nombra una ruta de Clubes/ no llega a la medición
volver();
mkdirSync(join(T, 'data'), { recursive: true });
w('data/clubs.js', "  'clubfalso-xx':{name:'Club Falso Ejemplo'},\n");
g('add', '-A'); g('commit', '-q', '-m', 'clubs');
w('tools/fake-tool.mjs', "export const VALOR = 1; export const RUTA = 'Clubes/Pais/Club/x.pdf';\n");
r = medir('--ensayo');
caso('el código que nombra una ruta de Clubes/ frena antes de medir y dice la línea', r.status === 1 && /nombra cosas/.test(r.out) && /ruta de Clubes\//.test(r.out), r.out.slice(-300));
w('tools/fake-tool.mjs', "export const VALOR = 1; export const OTRO = 2;\n");
r = medir('--ensayo');
caso('el código sin nombres pasa el chequeo', r.status === 0 && !/nombra cosas/.test(r.out), r.out.slice(-300));
volver();

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
