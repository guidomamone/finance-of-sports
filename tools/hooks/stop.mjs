#!/usr/bin/env node
// ============================================================================
// tools/hooks/stop.mjs — HOOK Stop de Claude Code (TODO 388). Lo llama .claude/settings.json cuando termina un turno.
//
// Mira cómo queda el trabajo, con chequeos de segundos (nunca audit.js entero: eso es de `fos cerrar`):
//   - cambios sin commitear (cuántos y en qué carpetas);
//   - Admin/INDICE-md.md viejo, o un .md vivo sin marca (`indice-md.mjs --check` y `--problemas`);
//   - un punto del TODO que ya cumple su «Verificar:» y sigue abierto (solo las condiciones que no dependen de audit.js).
// Si algo falla, bloquea el cierre UNA vez con el motivo y el comando que lo arregla (stop_hook_active: ya está continuando, no repite).
// Un turno sin cambios (árbol limpio y ningún commit en los últimos 20 minutos) no dice nada. No exige ningún formato de mensaje final.
// Entrada: el JSON del hook por stdin. Salida: nada, o {"decision":"block","reason":…}. Prueba: node tools/hooks/probar-stop.mjs
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');
if (entrada.stop_hook_active) process.exit(0);
const raiz = entrada.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
const sh = (cmd, args) => { try { return { ok: true, out: execFileSync(cmd, args, { cwd: raiz, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 20_000 }) }; } catch (e) { return { ok: false, out: `${e.stdout || ''}` }; } };
if (!sh('git', ['rev-parse', '--show-toplevel']).ok) process.exit(0);
// una medición en curso (candado de medir-pipeline, TODO 394) deja el árbol sin commitear a propósito: no se avisa hasta que termine
try { process.kill(JSON.parse(readFileSync(join(raiz, 'Admin', 'mediciones', 'pipeline', '_corriendo'), 'utf8')).pid, 0); process.exit(0); } catch { /* sin candado, o de un pid muerto */ }
// trabajo en segundo plano sin terminar (un subagente o un comando con run_in_background que arrancó en este transcript y cuyo aviso de fin todavía no llegó): el turno no se cierra a medias, los archivos
// sin commitear son su salida en curso. Los monitores de espera no cuentan. Sin transcript, no se puede saber y se sigue de largo.
{
  let t = ''; try { t = entrada.transcript_path ? readFileSync(entrada.transcript_path, 'utf8') : ''; } catch { /* sin transcript */ }
  const ids = [...new Set([...t.matchAll(/(?:agentId: |running in background with ID: |moved to the background \(ID: )([a-z0-9]{8,20})/g)].map((m) => m[1]))];
  const sinTerminar = ids.filter((id) => !new RegExp(`<task-id>${id}</task-id>[\\s\\S]{0,400}?<status>(?:completed|failed|killed|stopped)</status>`).test(t.replace(/\\n/g, '\n')));
  if (sinTerminar.length) process.exit(0);
}

const sucios = sh('git', ['status', '--porcelain']).out.split('\n').filter(Boolean);
const ultimoCommit = Number(sh('git', ['log', '-1', '--format=%ct']).out.trim()) || 0;
const hayCambios = sucios.length > 0 || Date.now() / 1000 - ultimoCommit < 20 * 60;
if (!hayCambios) process.exit(0);

const fallas = [];
if (sucios.length) {
  const carpetas = {};
  for (const l of sucios) { const c = l.slice(3).replace(/^"/, '').split('/')[0]; carpetas[c] = (carpetas[c] || 0) + 1; }
  const top = Object.entries(carpetas).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c, n]) => `${c} ${n}`).join(', ');
  fallas.push(`${sucios.length} archivos sin commitear (${top}): commiteá, o decí en el mensaje que quedan así.`);
}
// DIFF SIN ABRIR: un commit de los últimos 30 minutos que cambió texto que Guido lee en el diff (skills, CLAUDE.md, convenciones, pantalla, pipeline, estado; la misma lista que post-tool.mjs)
// y cuyo hash no figura en el transcript junto a un show_pane. El aviso de post-tool.mjs es un consejo; esto lo comprueba al cerrar el turno.
{
  const paraGuido = (f) => f.startsWith('.claude/skills/') || f === 'CLAUDE.md' || /^Admin\/(CONVENCIONES(-DATOS)?|PANTALLA|PIPELINE|ESTADO)\.md$/.test(f);
  let transcript = ''; try { transcript = entrada.transcript_path ? readFileSync(entrada.transcript_path, 'utf8') : ''; } catch { /* sin transcript: no se puede comprobar */ }
  if (transcript) {
    const log = sh('git', ['log', '--since=30 minutes ago', '--name-only', '--format=@@%H']).out.split('@@').filter(Boolean);
    const sinAbrir = log.map((b) => { const [h, ...fs] = b.split('\n').filter(Boolean); return { h, fs }; }).filter((c) => c.fs.some(paraGuido) && !transcript.includes(`"diff_scope":"${c.h.slice(0, 7)}`) && !transcript.includes(`diff_scope\\":\\"${c.h.slice(0, 7)}`));
    if (sinAbrir.length) fallas.push(`el commit ${sinAbrir.map((c) => c.h.slice(0, 10)).join(', ')} cambia texto que Guido lee en el diff y no lo abriste: show_pane con pane diff y diff_scope el hash.`);
  }
}
if (existsSync(join(raiz, 'tools', 'indice-md.mjs'))) {
  if (!sh('node', ['tools/indice-md.mjs', '--check']).ok) fallas.push('Admin/INDICE-md.md quedó viejo: node tools/indice-md.mjs --escribir');
  const sinMarca = /Sin marca \((\d+)\)/.exec(sh('node', ['tools/indice-md.mjs', '--problemas']).out);
  if (sinMarca && Number(sinMarca[1]) > 0) fallas.push(`${sinMarca[1]} .md sin marca <!-- md: … | leer: … -->: node tools/indice-md.mjs --problemas`);
}
if (existsSync(join(raiz, 'tools', 'todo-verificar.js')) && existsSync(join(raiz, 'Admin', 'TODO.md'))) {
  const T = createRequire(import.meta.url)(join(raiz, 'tools', 'todo-verificar.js'));
  const cumplidos = T.puntos(readFileSync(join(raiz, 'Admin', 'TODO.md'), 'utf8'))
    .filter((p) => p.verificar.length && p.verificar.every((e) => !/^audit\s/.test(e) && T.evaluar(e, [], raiz).ok === true)).map((p) => p.id);
  if (cumplidos.length) fallas.push(`el punto ${cumplidos.join(', ')} del TODO ya cumple su «Verificar:» y sigue abierto: node tools/fos.mjs cerrar ${cumplidos[0]}`);
}
if (!fallas.length) process.exit(0);
process.stdout.write(JSON.stringify({ decision: 'block', reason: `Antes de cerrar el turno:\n${fallas.slice(0, 6).map((f) => `- ${f}`).join('\n')}` }));
