#!/usr/bin/env node
// tools/probar-todo-contexto.mjs — la prueba del «Contexto de este punto» de todo.mjs, en un repo de juguete en Admin/mediciones/pipeline/_prueba-todo-contexto.
// Uso: node tools/probar-todo-contexto.mjs (sale con 1 si un caso falla; no toca nada fuera de su carpeta).
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const T = join(ROOT, 'Admin', 'mediciones', 'pipeline', '_prueba-todo-contexto');
rmSync(T, { recursive: true, force: true });
for (const d of ['tools', 'Admin/propuestas', 'Admin/mediciones', 'Admin/registros', 'Admin/lotes', 'Admin/Archive']) mkdirSync(join(T, d), { recursive: true });
for (const f of ['todo.mjs', 'todo-verificar.js']) copyFileSync(join(ROOT, 'tools', f), join(T, 'tools', f));
const w = (rel, txt) => writeFileSync(join(T, rel), txt);
w('Admin/TODO.md', '## A. En marcha\n\n### 1. 420 · (Onboarding): cargar los británicos\n\nCuerpo del 420.\nTerminado cuando: listo.\n\nVerificar: manual\n\n### 2. 421 · (Orden): otro\n\nCuerpo del 421.\n\nVerificar: manual\n');
w('Admin/propuestas/420-propuesta.md', '# Propuesta del 420\n\nTexto.\n');
w('Admin/propuestas/421-otra.md', '# Propuesta del 421\n');
w('Admin/mediciones/medicion-x.md', '# Medición de lo que pidió el punto 420\n');
w('Admin/mediciones/ruido.md', '# Importes\n\n1.420 y 4200 y 1420,5 no son el punto.\n');
w('Admin/registros/auditoria-proceso.jsonl', JSON.stringify({ fecha: '2026-10-24', cambio: '420 af: algo', motivo: 'ok' }) + '\n' + JSON.stringify({ fecha: '2026-10-24', cambio: 'otra cosa', motivo: 'se vio en el punto 421' }) + '\n');
w('Admin/registros/mediciones-pipeline.jsonl', JSON.stringify({ fecha: '2026-10-24', explicacion: 'cambio del TODO 420: 0 diferencias' }) + '\n');
w('Admin/CHANGELOG.md', '# Changelog\n\n## Versión 9 — algo del 420 [420 · ~x.mjs]\n\n- cuerpo\n\n## Versión 10 — nada [421]\n');
w('Admin/lotes/lote-1.txt', '# lista del punto 420\nClubes/A/a.pdf\n');
const g = (...a) => spawnSync('git', ['-c', 'user.email=p@p', '-c', 'user.name=p', ...a], { cwd: T, encoding: 'utf8' });
g('init', '-q'); g('add', '-A'); g('commit', '-q', '-m', '420: primer commit'); g('commit', '-q', '--allow-empty', '-m', 'Versión 420 vieja'); g('commit', '-q', '--allow-empty', '-m', 'importe 1.420');
const correr = (...args) => { const r = spawnSync('node', ['tools/todo.mjs', ...args], { cwd: T, encoding: 'utf8' }); return (r.stdout || '') + (r.stderr || ''); };
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

let o = correr('420');
const ctx = o.slice(o.indexOf('Contexto de este punto'));
caso('termina con el contexto después del cuerpo', o.includes('Cuerpo del 420.') && ctx.length > 0 && o.indexOf('Cuerpo del 420.') < o.indexOf('Contexto de este punto'), o);
caso('lista la propuesta, la medición y la lista de lote que lo citan', /propuestas\/420-propuesta\.md — # Propuesta del 420/.test(ctx) && /mediciones\/medicion-x\.md/.test(ctx) && /lotes\/lote-1\.txt/.test(ctx), ctx);
caso('lista la votación, la medición del pipeline y el CHANGELOG', /auditoria-proceso\.jsonl:1 /.test(ctx) && /mediciones-pipeline\.jsonl:1 /.test(ctx) && /CHANGELOG\.md:3 /.test(ctx), ctx);
caso('lista el commit del punto', /420: primer commit/.test(ctx), ctx);
caso('no mete lo de otro punto ni los importes parecidos', !/421/.test(ctx) && !/ruido\.md/.test(ctx) && !/Versión 420 vieja/.test(ctx) && !/importe 1\.420/.test(ctx), ctx);
o = correr('421');
caso('el 421 lista solo lo suyo', /421-otra\.md/.test(o) && /auditoria-proceso\.jsonl:2 /.test(o) && !/420-propuesta/.test(o), o);
o = correr('420', '--sin-contexto');
caso('--sin-contexto lo omite', !o.includes('Contexto de este punto') && o.includes('Cuerpo del 420.'), o);
rmSync(T, { recursive: true, force: true });
console.log(mal ? `${mal} caso(s) mal` : 'todos los casos ok');
process.exit(mal ? 1 : 0);
