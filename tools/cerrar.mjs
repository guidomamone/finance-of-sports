#!/usr/bin/env node
// ============================================================================
// tools/cerrar.mjs — `fos cerrar <id>`: el cierre de una tarea en un comando
// ============================================================================
// Cada cierre repetía a mano los mismos pasos y alguno se olvidaba (el índice de los .md, la entrada del CHANGELOG, el ESTADO). Este comando:
//   1. corre la auditoría (antes) y cierra el punto del TODO (`todo.mjs --cerrar`; si su «Verificar:» no se cumple, lo dice y sigue con el resto),
//   2. regenera el índice de los .md y dice si algún .md nuevo no tiene la marca de primera línea,
//   3. vuelve a correr la auditoría: P0 y P1 en cero, y qué avisos aparecieron o desaparecieron por código,
//   4. comprueba que Admin/CHANGELOG.md tiene una entrada reciente que nombra el id,
//   5. avisa si cambió una tool que figura por nombre en Admin/ESTADO.md o Admin/PIPELINE.md y ninguno se tocó (--sin-doc "motivo" lo da por visto), si cambió una skill (commit aparte, y el diff con show_pane) o datos (trailer Corrige:),
//   6. imprime los pendientes con ✓ y ✗ y el `git add` sugerido. NO commitea.
// USO: node tools/fos.mjs cerrar <id> [--cerrar] [--forzar] [--sin-doc "motivo"]     (SIN --cerrar solo revisa: no toca el TODO ni regenera el índice; con --cerrar borra el punto del TODO y regenera el índice;
//      --forzar: cierra aunque su «Verificar:» no se cumpla; --sin-doc: ESTADO.md y PIPELINE.md se miraron y siguen siendo ciertos)
//      Por defecto no se cierra porque un cierre sin querer borra un punto con trabajo pendiente (pasó con el 407).
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const id = A.find((a) => /^\d+$/.test(a));
if (!id) { console.error('Uso: node tools/fos.mjs cerrar <id del punto> [--cerrar] [--forzar] [--sin-doc "motivo"]   (sin --cerrar solo revisa; con --cerrar borra el punto del TODO)'); process.exit(1); }
const ENSAYO = !A.includes('--cerrar');
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
  (p01 === 0 ? ok : mal)(`auditoría: P0 ${despues.sev('P0')} · P1 ${despues.sev('P1')} · P2 ${despues.sev('P2')} · P3 ${despues.sev('P3')} · P4 ${despues.sev('P4')}`);
  if (antes) {
    const dif = [];
    for (const k of new Set([...antes.por.keys(), ...despues.por.keys()])) { const d = (despues.por.get(k) || 0) - (antes.por.get(k) || 0); if (d) dif.push(`${k} ${d > 0 ? '+' : ''}${d}`); }
    lineas.push(`    avisos que cambiaron durante el cierre: ${dif.length ? dif.join(', ') : 'ninguno'}`);
  }
}

// 4. el CHANGELOG
const cl = readFileSync(resolve(ROOT, 'Admin/CHANGELOG.md'), 'utf8').split('\n').slice(0, 90).join('\n');
new RegExp(`(\\[[^\\]]*\\b${id}\\b[^\\]]*\\]|\\b(?:TODO|to-do|punto|puntos)s? ${id}\\b|\\b${id}[:·])`).test(cl) ? ok(`CHANGELOG: hay una entrada reciente que nombra el ${id}`) : mal(`CHANGELOG: ninguna entrada reciente nombra el ${id} (título con [${id}] al final, como las demás)`);

// 4b. las tools que cambiaron desde la última entrada tienen que estar nombradas en el título de una entrada nueva ([ids · tools · clubes]; fos changelog historial <tool> las busca)
{
  let s = null; try { s = JSON.parse(execFileSync('node', ['tools/changelog.mjs', 'tools-sin-entrada'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch (e) { try { s = JSON.parse(e.stdout); } catch { /* sin respuesta */ } }
  if (!s) aviso('no pude calcular las tools cambiadas para el título del CHANGELOG');
  else if (!s.cambiadas.length) ok('CHANGELOG: no cambió ninguna tool desde la última entrada');
  else if (!s.faltan.length) ok(`CHANGELOG: los títulos nombran las ${s.cambiadas.length} tool(s) cambiadas`);
  else mal(`CHANGELOG: el título de la entrada no nombra ${s.faltan.join(', ')} (corchete: [${id} · ${s.cambiadas.join(', ')}])`);
}

// 4c. el archivado del CHANGELOG: al cerrar de verdad, si tiene más de 60 entradas se pasan las más viejas al archivo y quedan las 40 más nuevas (las entradas no llevan fecha: se archiva por cantidad)
{
  const { leer } = await import('./changelog.mjs'); const n = leer().entradas.length;
  if (n <= 60) ok(`CHANGELOG: ${n} entradas (se archiva al pasar de 60)`);
  else if (ENSAYO) aviso(`CHANGELOG: ${n} entradas; al cerrar con --cerrar se archivan las más viejas (quedan 40)`);
  else { const r = node(['tools/changelog.mjs', 'archivar', '--mantener', '40', '--escribir']); ok(`CHANGELOG archivado: ${(r.stdout || '').trim().split('\n')[0].slice(0, 160)}`); }
}

// 5. lo que cambió
const cambiados = git('status', '--porcelain', '-uall').split('\n').filter(Boolean).map((l) => l.slice(3).replace(/^"|"$/g, ''));
const tocoTools = cambiados.some((f) => /^tools\/[^/]+\.(mjs|js)$/.test(f));
const docs = cambiados.some((f) => f === 'Admin/ESTADO.md' || f === 'Admin/PIPELINE.md');
if (tocoTools) {
  // ESTADO y PIPELINE dicen cómo se usa cada tool: solo molestan si una tool cambiada figura en ellos por nombre y no se tocaron; --sin-doc "motivo" deja constancia de que se miraron
  const motivo = A.includes('--sin-doc') ? A[A.indexOf('--sin-doc') + 1] : null;
  const doc = (f) => { try { return readFileSync(resolve(ROOT, f), 'utf8'); } catch { return ''; } };
  const textoDocs = `${doc('Admin/ESTADO.md')}\n${doc('Admin/PIPELINE.md')}`;
  const nombradas = cambiados.map((f) => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter((n) => n && textoDocs.includes(n));
  if (docs) ok('cambió tools/ y se tocó ESTADO.md o PIPELINE.md');
  else if (motivo) ok(`ESTADO.md y PIPELINE.md revisados sin cambios: ${motivo}`);
  else if (!nombradas.length) ok('ninguna de las tools cambiadas figura por nombre en ESTADO.md ni en PIPELINE.md: no hay qué actualizar');
  else mal(`cambió ${nombradas.slice(0, 4).join(', ')}${nombradas.length > 4 ? ', …' : ''} (figura en ESTADO.md o PIPELINE.md) y no se tocaron: ¿sigue siendo cierto lo que dicen? Si sí: node tools/fos.mjs cerrar ${id} --sin-doc "por qué sigue siendo cierto"`);
}
if (cambiados.some((f) => f.startsWith('.claude/skills/'))) aviso('cambió una skill: commit APARTE y mostrale el diff a Guido con show_pane (pane diff, el hash)');
if (cambiados.some((f) => /^data\/(?!faltantes|estimados|rankings|auditoria|entidades|correcciones|sponsors)/.test(f))) aviso('cambió un dato publicado: el mensaje del commit lleva un trailer «Corrige: …» (qué dato y por qué)');
if (!cambiados.length) aviso('no hay nada para commitear');
// lo que va a pedir el commit (clasificación, medición, veredicto): tools/que-pide.mjs
if (tocoTools) {
  let pide = ''; try { pide = execFileSync('node', ['tools/que-pide.mjs'], { cwd: ROOT, encoding: 'utf8' }); } catch (e) { pide = e.stdout || ''; }
  for (const l of pide.split('\n').filter((x) => x.startsWith('✗'))) mal(`el commit va a pedir: ${l.slice(2)}`);
  for (const l of pide.split('\n').filter((x) => /comentario con contenido/.test(x))) aviso(`comentarios: ${l.slice(2)}`);
}

console.log(`\n${lineas.join('\n')}\n`);
console.log(faltan ? `Faltan ${faltan} cosa(s) (✗). Después: git add -A y commit local (sin push).` : 'Todo en orden. Siguiente: git add -A y commit local (sin push).');
process.exit(faltan ? 1 : 0);
