#!/usr/bin/env node
// ============================================================================
// tools/hooks/post-tool.mjs — HOOK PostToolUse de Claude Code (TODO 378). Lo llama .claude/settings.json después de cada Bash.
//
// skill-con-diff: si el comando fue un `git commit` y el commit toca una skill, CLAUDE.md o un documento de criterio (Admin/CONVENCIONES*, PANTALLA, PIPELINE, ESTADO), devuelve contexto adicional:
// el diff se le muestra a Guido con show_pane (pane diff, diff_scope el hash), porque ese texto lo lee él en el diff y la regla dependía de acordarse. Si el commit no toca eso, no dice nada.
// Entrada: el JSON del hook por stdin. Salida: nada, o el JSON de PostToolUse con additionalContext. FOS_COMMIT=<hash> reemplaza el último commit (lo usa la prueba).
// Prueba con entradas simuladas: node tools/hooks/probar-post-tool.mjs
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');

// aviso-al-editar-una-tool (412, aviso SUAVE: no bloquea ni pregunta): la primera vez que una sesión edita tools/<x>.mjs, si hay entradas del CHANGELOG o hallazgos que la nombran,
// se le dice cuántos y con qué comando verlos. Una vez por tool y por sesión (el estado vive en la carpeta temporal del sistema); sin historial no dice nada.
if (['Edit', 'Write', 'MultiEdit'].includes(entrada.tool_name)) {
  const m = String(entrada.tool_input?.file_path || '').match(/\/tools\/([a-z0-9][a-z0-9-]*\.(?:mjs|js))$/);
  if (!m) process.exit(0);
  const raiz = entrada.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd(); const tool = m[1];
  const estado = join(tmpdir(), `fos-aviso-tool-${String(entrada.session_id || 'sin-sesion').replace(/[^\w-]/g, '')}.json`);
  let vistos = []; try { vistos = JSON.parse(readFileSync(estado, 'utf8')); } catch { /* primera vez */ }
  if (vistos.includes(tool)) process.exit(0);
  try { writeFileSync(estado, JSON.stringify([...vistos, tool])); } catch { /* sin carpeta temporal */ }
  const re = new RegExp(`(^|[^\\w-])~?${tool.replace(/\./g, '\\.')}\\b`);
  const lineas = (f, soloTitulos) => { try { return readFileSync(join(raiz, f), 'utf8').split('\n').filter((l) => (!soloTitulos || l.startsWith('## ')) && re.test(l)).length; } catch { return 0; } };
  let entradas = lineas('Admin/CHANGELOG.md', true);
  try { for (const f of readdirSync(join(raiz, 'Admin', 'Archive'))) if (/^CHANGELOG-.*\.md$/.test(f)) entradas += lineas(`Admin/Archive/${f}`, true); } catch { /* sin archivo */ }
  const hallazgos = lineas('Admin/HALLAZGOS-pipeline.md', false);
  if (!entradas && !hallazgos) process.exit(0);
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse',
    additionalContext: `Aviso (no bloquea): ${tool} figura en ${entradas} título(s) del CHANGELOG y ${hallazgos} línea(s) de HALLAZGOS-pipeline.md. Antes de cambiar su comportamiento: node tools/fos.mjs changelog historial ${tool}.` } }));
  process.exit(0);
}
if (entrada.tool_name !== 'Bash') process.exit(0);
const cmd = entrada.tool_input?.command || '';
if (!/\bgit(?:\s+-[cC]\s+\S+|\s+--?[\w-]+(?:=\S+)?)*\s+commit\b/.test(cmd)) process.exit(0);
const cwd = entrada.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
const git = (args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
let hash; let archivos;
try {
  hash = process.env.FOS_COMMIT || git(['rev-parse', 'HEAD']).trim();
  archivos = git(['show', '--name-only', '--format=', hash]).split('\n').filter(Boolean);
  // un commit que no ocurrió (el comando falló) deja el HEAD de antes: solo se avisa de uno hecho hace menos de 2 minutos
  if (!process.env.FOS_COMMIT && Date.now() / 1000 - Number(git(['show', '-s', '--format=%ct', hash]).trim()) > 120) process.exit(0);
} catch { process.exit(0); }
// lo que Guido lee en el diff: las skills y los documentos que dicen cómo se trabaja (CLAUDE.md, convenciones, pantalla, pipeline, estado)
const paraGuido = (f) => f.startsWith('.claude/skills/') || f === 'CLAUDE.md' || /^Admin\/(CONVENCIONES(-DATOS)?|PANTALLA|PIPELINE|ESTADO)\.md$/.test(f);
const leidos = archivos.filter(paraGuido);
if (!leidos.length) process.exit(0);
process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse',
  additionalContext: `El commit ${hash.slice(0, 10)} cambia texto que Guido lee en el diff (${leidos.join(', ')}). ABRÍ EL DIFF AHORA, antes de seguir con otra cosa: ToolSearch "select:mcp__ccd_view__show_pane" si la herramienta no está cargada, y show_pane con pane diff y diff_scope ${hash.slice(0, 10)}. No lo dejes para el cierre.` } }));
