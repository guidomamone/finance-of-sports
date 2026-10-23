#!/usr/bin/env node
// tools/hooks/probar-session-start.mjs — la prueba del hook SessionStart (TODO 389) sobre un repo de juguete en
// Admin/mediciones/pipeline/_prueba-inicio. Uso: node tools/hooks/probar-session-start.mjs (sale con 1 si un caso falla).
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const raiz = resolve(import.meta.dirname, '..', '..');
const T = join(raiz, 'Admin', 'mediciones', 'pipeline', '_prueba-inicio');
rmSync(T, { recursive: true, force: true });
for (const d of ['tools', 'Admin', '.claude']) mkdirSync(join(T, d), { recursive: true });
copyFileSync(join(raiz, 'tools', 'todo-verificar.js'), join(T, 'tools', 'todo-verificar.js'));
writeFileSync(join(T, '.claude', 'modo.json'), '{"modo":"una-sesion"}');
writeFileSync(join(T, 'Admin', 'TODO.md'), ['## A', '', ...[1, 2, 3, 4].flatMap((n) => [`### ${n}. 00${n} · (Orden): punto ${n}`, '', 'texto', ''])].join('\n'));
const g = (...a) => spawnSync('git', ['-c', 'user.email=p@p', '-c', 'user.name=p', ...a], { cwd: T, encoding: 'utf8' });
g('init', '-q'); g('add', '-A'); g('commit', '-q', '-m', 'base');
const correr = () => spawnSync('node', [join(raiz, 'tools', 'hooks', 'session-start.mjs')], { input: JSON.stringify({ hook_event_name: 'SessionStart', cwd: T }), encoding: 'utf8' }).stdout;
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

let s = correr();
caso('árbol limpio: el modo, los tres primeros puntos y los comandos, en 10 líneas o menos', /Modo: una-sesion/.test(s) && /001 punto 1/.test(s) && /003 punto 3/.test(s) && !/004/.test(s) && /fos mapa/.test(s) && s.trim().split('\n').length <= 10 && !/sin commitear/.test(s), s);
writeFileSync(join(T, 'nuevo.txt'), 'x');
s = correr();
caso('con cambios dice cuántos y dónde', /1 archivos sin commitear \(nuevo\.txt 1\)/.test(s), s);
mkdirSync(join(T, 'Admin', 'mediciones', 'pipeline', '_respaldo'), { recursive: true });
writeFileSync(join(T, 'Admin', 'mediciones', 'pipeline', '_respaldo', 'cargar.mjs'), 'x');
s = correr();
caso('con un respaldo de una medición muerta avisa y dice el comando', /murió a la mitad/.test(s) && /--restaurar/.test(s) && s.trim().split('\n').length <= 10, s);
rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
