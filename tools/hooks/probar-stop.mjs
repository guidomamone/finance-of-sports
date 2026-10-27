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
mkdirSync(join(T, 'Admin', 'mediciones', 'pipeline'), { recursive: true });
writeFileSync(join(T, 'Admin', 'mediciones', 'pipeline', '_corriendo'), JSON.stringify({ pid: process.pid }));
s = correr();
caso('con una medición corriendo (candado con un pid vivo) no dice nada', s === null, JSON.stringify(s));
writeFileSync(join(T, 'Admin', 'mediciones', 'pipeline', '_corriendo'), JSON.stringify({ pid: 2147483000 }));
s = correr();
caso('el candado de un pid muerto no cuenta: avisa', s?.decision === 'block', JSON.stringify(s));
rmSync(join(T, 'Admin', 'mediciones'), { recursive: true, force: true });
// trabajo en segundo plano: un subagente lanzado y sin su aviso de fin no deja bloquear; con el aviso, sí; un monitor de espera no cuenta
const trans = (contenido) => { const p = join(T, 'transcript.jsonl'); writeFileSync(p, contenido); return p; };
const lanzado = '{"type":"user","content":"Async agent launched successfully.\\nagentId: abc123def456abc12 (internal ID)"}\n';
const terminado = '{"type":"user","content":"<task-notification>\\n<task-id>abc123def456abc12</task-id>\\n<status>completed</status>\\n</task-notification>"}\n';
s = correr({ transcript_path: trans(lanzado) });
caso('un subagente en curso no deja bloquear el cierre', s === null, JSON.stringify(s));
s = correr({ transcript_path: trans(lanzado + terminado) });
caso('con el aviso de fin del subagente vuelve a avisar', s?.decision === 'block', JSON.stringify(s));
s = correr({ transcript_path: trans('{"type":"user","content":"Monitor started (task bmon12345678, expires in 5m)"}\n') });
caso('un monitor de espera no cuenta como trabajo en curso', s?.decision === 'block', JSON.stringify(s));
s = correr({ transcript_path: trans('{"type":"user","content":"Command running in background with ID: bcmd12345678. Output"}\n') });
caso('un comando en segundo plano sin terminar tampoco deja bloquear', s === null, JSON.stringify(s));
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
