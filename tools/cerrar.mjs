#!/usr/bin/env node
// ============================================================================
// tools/cerrar.mjs — `fos cerrar <id>`: el cierre de una tarea en un comando
// ============================================================================
// Cada cierre repetía a mano los mismos pasos y alguno se olvidaba (el índice de los .md, la entrada del CHANGELOG, el ESTADO). Este comando:
//   1. corre la auditoría (antes) y cierra el punto del TODO (`todo.mjs --cerrar`; si su «Verificar:» no se cumple, lo dice y sigue con el resto),
//   2. regenera el índice de los .md y dice si algún .md nuevo no tiene la marca de primera línea,
//   3. vuelve a correr la auditoría: P0 y P1 en cero, y qué avisos aparecieron o desaparecieron por código,
//   4. comprueba que Admin/CHANGELOG.md tiene una entrada reciente que nombra el id,
//   5. avisa si cambió algo de tools/ y ni Admin/ESTADO.md ni Admin/PIPELINE.md se tocaron, si cambió una skill (commit aparte, y el diff con show_pane) o datos (trailer Corrige:),
//   6. imprime los pendientes con ✓ y ✗ y el `git add` sugerido. NO commitea.
// USO: node tools/fos.mjs cerrar <id> [--ensayo] [--forzar]     (--ensayo: no cierra el punto ni regenera el índice, solo revisa; --forzar: cierra aunque su «Verificar:» no se cumpla)
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const id = A.find((a) => /^\d+$/.test(a));
if (!id) { console.error('Uso: node tools/fos.mjs cerrar <id del punto> [--ensayo] [--forzar]'); process.exit(1); }
const ENSAYO = A.includes('--ensayo');
const node = (args) => spawnSync('node', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
const lineas = []; let faltan = 0;
const ok = (txt) => lineas.push(`  ✓ ${txt}`);
const mal = (txt) => { faltan++; lineas.push(`  ✗ ${txt}`); };
const aviso = (txt) => lineas.push(`  ⚠ ${txt}`);

const auditoria = () => {
  const r = node(['tools/audit.js', '--json']);
  try { const f = JSON.parse(r.stdout).findings; const por = new Map(); for (const x of f) por.set(`${x.sev} ${x.code}`, (por.get(`${x.sev} ${x.code}`) || 0) + 1); return { por, sev: (s) => f.filter((x) => x.sev === s).length }; } catch { return null; }
};

console.log(`Cerrando el punto ${id}${ENSAYO ? ' (ensayo)' : ''}…`);
const antes = auditoria();

// 1. el punto del TODO
if (!ENSAYO) {
  const c = node(['tools/todo.mjs', '--cerrar', id, ...(A.includes('--forzar') ? ['--forzar'] : [])]);
  const txt = (c.stdout + c.stderr).trim();
  if (/^Cerrado /m.test(txt)) ok(`TODO: ${txt.split('\n')[0]}`);
  else mal(`TODO: no se cerró el punto ${id}: ${txt.split('\n').slice(0, 3).join(' | ')}`);
} else {
  const v = node(['tools/todo.mjs', '--verificar']);
  const l = (v.stdout || '').split('\n').find((x) => new RegExp(`\\b${id} ·`).test(x));
  l ? (/CUMPLE/.test(l) ? ok(`TODO: el punto ${id} cumple su «Verificar:»`) : mal(`TODO: el punto ${id} no cumple su «Verificar:» (${l.trim().slice(0, 100)})`)) : mal(`TODO: no existe el punto ${id}`);
}

// 2. el índice de los .md
const ind = node(['tools/indice-md.mjs', ...(ENSAYO ? ['--check'] : ['--escribir'])]);
const sinMarca = Number((ind.stdout.match(/Sin marca \((\d+)\)/) || [])[1] || 0);
if (ENSAYO && ind.status !== 0) mal('índice de los .md desactualizado: node tools/indice-md.mjs --escribir'); else ok(ENSAYO ? 'índice de los .md al día' : 'índice de los .md regenerado');
if (sinMarca) mal(`${sinMarca} .md sin marca de primera línea (<!-- md: qué es | leer: cuándo -->)`);

// 3. la auditoría
const despues = auditoria();
if (!despues) mal('la auditoría no devolvió un JSON');
else {
  const p01 = despues.sev('P0') + despues.sev('P1');
  (p01 === 0 ? ok : mal)(`auditoría: P0 ${despues.sev('P0')} · P1 ${despues.sev('P1')} · P2 ${despues.sev('P2')} · P3 ${despues.sev('P3')}`);
  if (antes) {
    const dif = [];
    for (const k of new Set([...antes.por.keys(), ...despues.por.keys()])) { const d = (despues.por.get(k) || 0) - (antes.por.get(k) || 0); if (d) dif.push(`${k} ${d > 0 ? '+' : ''}${d}`); }
    lineas.push(`    avisos que cambiaron durante el cierre: ${dif.length ? dif.join(', ') : 'ninguno'}`);
  }
}

// 4. el CHANGELOG
const cl = readFileSync(resolve(ROOT, 'Admin/CHANGELOG.md'), 'utf8').split('\n').slice(0, 90).join('\n');
new RegExp(`(\\[[^\\]]*\\b${id}\\b[^\\]]*\\]|\\b(?:TODO|to-do|punto|puntos)s? ${id}\\b|\\b${id}[:·])`).test(cl) ? ok(`CHANGELOG: hay una entrada reciente que nombra el ${id}`) : mal(`CHANGELOG: ninguna entrada reciente nombra el ${id} (título con [${id}] al final, como las demás)`);

// 5. lo que cambió
const cambiados = git('status', '--porcelain', '-uall').split('\n').filter(Boolean).map((l) => l.slice(3).replace(/^"|"$/g, ''));
const tocoTools = cambiados.some((f) => /^tools\/[^/]+\.(mjs|js)$/.test(f));
const docs = cambiados.some((f) => f === 'Admin/ESTADO.md' || f === 'Admin/PIPELINE.md');
if (tocoTools) (docs ? ok : mal)(docs ? 'cambió tools/ y se tocó ESTADO.md o PIPELINE.md' : 'cambió algo de tools/ y ni Admin/ESTADO.md ni Admin/PIPELINE.md se tocaron (¿sigue siendo cierto lo que dicen?)');
if (cambiados.some((f) => f.startsWith('.claude/skills/'))) aviso('cambió una skill: commit APARTE y mostrale el diff a Guido con show_pane (pane diff, el hash)');
if (cambiados.some((f) => /^data\/(?!faltantes|estimados|rankings|auditoria|entidades|correcciones|sponsors)/.test(f))) aviso('cambió un dato publicado: el mensaje del commit lleva un trailer «Corrige: …» (qué dato y por qué)');
if (!cambiados.length) aviso('no hay nada para commitear');

console.log(`\n${lineas.join('\n')}\n`);
console.log(faltan ? `Faltan ${faltan} cosa(s) (✗). Después: git add -A y commit local (sin push).` : 'Todo en orden. Siguiente: git add -A y commit local (sin push).');
process.exit(faltan ? 1 : 0);
