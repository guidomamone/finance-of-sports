#!/usr/bin/env node
// tools/hooks/probar-stop.mjs — la prueba del hook Stop (TODO 388), con entradas simuladas sobre un repo de juguete en
// Admin/mediciones/pipeline/_prueba-stop. Uso: node tools/hooks/probar-stop.mjs (sale con 1 si un caso falla).
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const raiz = resolve(import.meta.dirname, '..', '..');
const T = join(raiz, 'Admin', 'mediciones', 'pipeline', '_prueba-stop');
rmSync(T, { recursive: true, force: true });
for (const d of ['tools', 'Admin']) mkdirSync(join(T, d), { recursive: true });
copyFileSync(join(raiz, 'tools', 'todo-verificar.js'), join(T, 'tools', 'todo-verificar.js'));
writeFileSync(join(T, 'Admin', 'TODO.md'), '## A. En marcha\n\n### 1. 001 · (Orden): un punto que ya cumple\n\ntexto\n\nVerificar: existe tools/todo-verificar.js\n');
const g = (...a) => spawnSync('git', ['-c', 'user.email=p@p', '-c', 'user.name=p', ...a], { cwd: T, encoding: 'utf8' });
const commitViejo = () => spawnSync('git', ['-c', 'user.email=p@p', '-c', 'user.name=p', 'commit', '-q', '-m', 'base'], { cwd: T, env: { ...process.env, GIT_COMMITTER_DATE: '2020-01-01T00:00:00', GIT_AUTHOR_DATE: '2020-01-01T00:00:00' } });
g('init', '-q'); g('add', '-A'); commitViejo();

const correr = (extra = {}) => {
  const r = spawnSync('node', [join(raiz, 'tools', 'hooks', 'stop.mjs')], { input: JSON.stringify({ hook_event_name: 'Stop', cwd: T, ...extra }), encoding: 'utf8' });
  return r.stdout ? JSON.parse(r.stdout) : null;
};
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

// el único aviso posible con el árbol limpio y un commit viejo es nada: el turno no cambió nada
let s = correr();
caso('turno sin cambios (árbol limpio, commit viejo) no dice nada', s === null, JSON.stringify(s));

writeFileSync(join(T, 'cambio.txt'), 'x\n');
s = correr();
caso('con cambios y un punto cumplido bloquea', s?.decision === 'block' && /sin commitear/.test(s.reason) && /punto 001/.test(s.reason), JSON.stringify(s));
caso('la salida no pasa de 8 líneas', (s?.reason || '').split('\n').length <= 8, s?.reason);
s = correr({ stop_hook_active: true });
caso('si ya está continuando por un bloqueo, no repite', s === null, JSON.stringify(s));

g('add', '-A'); g('-c', 'user.email=p@p', 'commit', '-q', '-m', 'cambio');
s = correr();
caso('árbol limpio pero commit reciente: avisa del punto cumplido, sin hablar de commits', s?.decision === 'block' && /punto 001/.test(s.reason) && !/sin commitear/.test(s.reason), JSON.stringify(s));

writeFileSync(join(T, 'Admin', 'TODO.md'), '## A. En marcha\n\n### 1. 001 · (Orden): un punto abierto\n\ntexto\n\nVerificar: existe tools/no-existe.mjs\n');
g('add', '-A'); g('commit', '-q', '-m', 'abierto');
s = correr();
caso('commit reciente, árbol limpio y nada que avisar: no dice nada', s === null, JSON.stringify(s));

rmSync(T, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
