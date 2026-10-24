#!/usr/bin/env node
// tools/probar-partir-fases.mjs — la prueba de partir-fases.mjs y lexico-js.mjs: parte una función de juguete y comprueba que la partida da lo mismo que la entera.
// La función cubre lo que se rompió en cortes reales: el spread `...x` como uso de un nombre, `function*`, una plantilla de varias líneas (no se sangra), un `let` que cambia
// entre fases (pasa a `ctx.N`), `await`, un `return` de salida temprana y el cuerpo sin sangría con `indentar`. Usa tools/_prueba-pf-*.{mjs,json} y los borra al terminar.
// Uso: node tools/probar-partir-fases.mjs   (un segundo; sale con 1 si algo falla)
import { writeFileSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const T = (f) => join(ROOT, 'tools', f);
const correr = (...a) => spawnSync('node', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

const FUNCION = [
  'export async function flujo(entrada) {',
  '  const tabla = [1, 2, 3];',
  '  let acumulado = 0;',
  '  const extra = [...tabla, 4];',
  '  function* gen(n) { for (let i = 0; i < n; i++) yield i * 2; }',
  '  // B',
  '  const copia = [...extra];',
  '  const doble = [...gen(3)];',
  '  for (const x of copia) acumulado += x;',
  '  const msg = `a',
  'b ${acumulado}',
  'c`;',
  '  const esperado = await Promise.resolve(entrada * 2);',
  '  // C',
  '  if (entrada < 0) {',
  "    return 'negativo';",
  '  }',
  "  return [msg, doble, esperado, acumulado].join('|');",
  '}',
];
// líneas del archivo (1 = el comentario de cabecera): la función va de la 2 a la 20
const ARCHIVO = ['// función de prueba de probar-partir-fases.mjs', ...FUNCION];
const SIN_SANGRIA = ARCHIVO.map((l, i) => (i >= 2 && i <= 18 && l.startsWith('  ') ? l.slice(2) : l)); // el cuerpo a columna 0; las líneas de la plantilla ya lo están
const cfg = (file, extra = {}) => ({ file, funcStart: 2, funcEnd: 20, setupEnd: 2, inicial: ['entrada'], salidaTemprana: "'negativo'", asincrona: true, indentar: false,
  fases: [{ name: 'faseA', from: 3, to: 6, comentario: 'A' }, { name: 'faseB', from: 8, to: 14, comentario: 'B' }, { name: 'faseC', from: 16, to: 18, comentario: 'C' }], ...extra });
const ARCHIVOS = ['_prueba-pf-s.mjs', '_prueba-pf-e.mjs', '_prueba-pf-orig.mjs', '_prueba-pf-a.mjs', '_prueba-pf-b.mjs', '_prueba-pf-c.mjs', '_prueba-pf-d.mjs', '_prueba-pf-cfg.json'];
const limpiar = () => { for (const f of ARCHIVOS) rmSync(T(f), { force: true }); };
const salidas = async (archivo) => { const m = await import(`${pathToFileURL(T(archivo)).href}?v=${Math.random()}`); const o = []; for (const e of [5, 0, -1]) o.push(await m.flujo(e)); return o; };
const partir = (origen, destino, c, ...flags) => {
  writeFileSync(T(destino), readFileSync(T(origen), 'utf8'));
  writeFileSync(T('_prueba-pf-cfg.json'), JSON.stringify(cfg(`tools/${destino}`, c)));
  return correr('tools/partir-fases.mjs', 'tools/_prueba-pf-cfg.json', ...flags);
};
try {
  limpiar();
  writeFileSync(T('_prueba-pf-orig.mjs'), ARCHIVO.join('\n') + '\n');
  const esperado = await salidas('_prueba-pf-orig.mjs');
  caso('la función de prueba corre y da tres salidas distintas', esperado.length === 3 && new Set(esperado).size === 3, JSON.stringify(esperado));

  let r = partir('_prueba-pf-orig.mjs', '_prueba-pf-a.mjs');
  const a = readFileSync(T('_prueba-pf-a.mjs'), 'utf8');
  caso('el corte en tres fases sale sin error y avisa del let que va al ctx', r.status === 0 && /en el ctx \(1\): acumulado/.test(r.stdout), r.stdout + r.stderr);
  caso('el spread y function* cuentan como uso: faseB lee extra, gen, y la salida temprana corta', /const \{[^}]*\bextra\b[^}]*\} = ctx/.test(a) && /const \{[^}]*\bgen\b[^}]*\} = ctx/.test(a) && /=== 'negativo'\) return 'negativo'/.test(a), a);
  caso('el let que cambia entre fases pasa a ctx.N en todos sus usos', /ctx\.acumulado = 0/.test(a) && /ctx\.acumulado \+= x/.test(a) && /b \$\{ctx\.acumulado\}/.test(a) && /\[msg, doble, esperado, ctx\.acumulado\]/.test(a), a);
  caso('la función partida (con await y salida temprana) da lo mismo que la entera', JSON.stringify(await salidas('_prueba-pf-a.mjs')) === JSON.stringify(esperado), JSON.stringify(await salidas('_prueba-pf-a.mjs')));

  r = partir('_prueba-pf-orig.mjs', '_prueba-pf-b.mjs', {}, '--proxy');
  caso('--proxy (un ctx que falla si una fase pide lo que nadie dejó) corre igual', r.status === 0 && JSON.stringify(await salidas('_prueba-pf-b.mjs')) === JSON.stringify(esperado), r.stdout + r.stderr);

  writeFileSync(T('_prueba-pf-c.mjs'), SIN_SANGRIA.join('\n') + '\n');
  const sinSangria = await salidas('_prueba-pf-c.mjs');
  caso('la versión con el cuerpo sin sangría da lo mismo que la sangrada', JSON.stringify(sinSangria) === JSON.stringify(esperado), JSON.stringify(sinSangria));
  r = partir('_prueba-pf-c.mjs', '_prueba-pf-d.mjs', { indentar: true });
  const d = readFileSync(T('_prueba-pf-d.mjs'), 'utf8');
  caso('indentar: el cuerpo gana 2 espacios y las líneas de la plantilla no se tocan', r.status === 0 && /\n  const tabla = \[1, 2, 3\];/.test(d) && /\nb \$\{ctx\.acumulado\}\nc`;/.test(d), r.stdout + r.stderr + d);
  caso('indentar: la función partida da lo mismo que la entera (la plantilla no cambió)', JSON.stringify(await salidas('_prueba-pf-d.mjs')) === JSON.stringify(esperado), JSON.stringify(await salidas('_prueba-pf-d.mjs')));

  writeFileSync(T('_prueba-pf-cfg.json'), JSON.stringify(cfg('tools/_prueba-pf-orig.mjs', { fases: [{ name: 'faseA', from: 3, to: 6, comentario: 'A' }, { name: 'faseB', from: 8, to: 14, comentario: 'B' }, { name: 'faseC', from: 17, to: 17, comentario: 'C' }] })));
  r = correr('tools/partir-fases.mjs', 'tools/_prueba-pf-cfg.json');
  caso('un corte en medio de un bloque se rechaza y no escribe', r.status === 1 && /corta en medio de un bloque/.test(r.stderr) && readFileSync(T('_prueba-pf-orig.mjs'), 'utf8') === ARCHIVO.join('\n') + '\n', r.stdout + r.stderr);

  writeFileSync(T('_prueba-pf-cfg.json'), JSON.stringify(cfg('tools/_prueba-pf-orig.mjs', { salidaTemprana: null })));
  r = correr('tools/partir-fases.mjs', 'tools/_prueba-pf-cfg.json');
  caso('un return propio de la función sin salidaTemprana se rechaza', r.status === 1 && /return propio/.test(r.stderr), r.stdout + r.stderr);

  r = correr('tools/partir-fases.mjs', 'tools/_prueba-pf-cfg.json', '--mapa');
  caso('--mapa lista las sentencias del nivel superior sin escribir', r.status === 0 && /^3: const tabla/m.test(r.stdout) && /^16: if \(entrada < 0\)/m.test(r.stdout), r.stdout + r.stderr);

  // envolver: un script de nivel de módulo (sin función) se envuelve y se parte en un solo paso; las líneas de la config son las del original
  const SCRIPT = [
    '// script de prueba de probar-partir-fases.mjs', 'const entrada = Number(process.argv[2]);', 'const tabla = [1, 2, 3];', 'let acumulado = 0;', 'const extra = [...tabla, 4];',
    'function* gen(n) { for (let i = 0; i < n; i++) yield i * 2; }', '// B', 'const copia = [...extra];', 'const doble = [...gen(3)];', 'for (const x of copia) acumulado += x;',
    'const msg = `a', 'b ${acumulado}', 'c`;', 'const esperado = await Promise.resolve(entrada * 2);', "console.log([msg, doble, esperado, acumulado].join('|'));",
  ];
  writeFileSync(T('_prueba-pf-s.mjs'), SCRIPT.join('\n') + '\n'); writeFileSync(T('_prueba-pf-e.mjs'), SCRIPT.join('\n') + '\n');
  writeFileSync(T('_prueba-pf-cfg.json'), JSON.stringify({ file: 'tools/_prueba-pf-e.mjs', envolver: { nombre: 'correr', desde: 3, comentario: 'El flujo entero, en una función.' }, inicial: ['entrada'], asincrona: true, indentar: true,
    fases: [{ name: 'faseA', from: 3, to: 6, comentario: 'A' }, { name: 'faseB', from: 8, to: 14, comentario: 'B' }] }));
  r = correr('tools/partir-fases.mjs', 'tools/_prueba-pf-cfg.json');
  const e = readFileSync(T('_prueba-pf-e.mjs'), 'utf8');
  caso('envolver: el script queda en una función, partida en fases, y se llama al final', r.status === 0 && /^async function correr\(\) \{$/m.test(e) && /^async function faseB\(ctx\)/m.test(e) && /^await correr\(\);$/m.test(e), r.stdout + r.stderr + e);
  caso('envolver: la plantilla no se sangra y la salida es la del script original', ['5', '0'].every((x) => { const o = correr('tools/_prueba-pf-s.mjs', x), n = correr('tools/_prueba-pf-e.mjs', x); return o.status === 0 && o.stdout === n.stdout && o.stdout.length > 5; }) && /\nb \$\{ctx\.acumulado\}\nc`;/.test(e), e);
  writeFileSync(T('_prueba-pf-e.mjs'), SCRIPT.join('\n') + '\n');
  r = correr('tools/partir-fases.mjs', 'tools/_prueba-pf-cfg.json', '--mapa');
  caso('envolver: --mapa da las líneas del original', r.status === 0 && /^3: const tabla/m.test(r.stdout) && /^8: const copia/m.test(r.stdout), r.stdout + r.stderr);
} finally { limpiar(); }
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
