#!/usr/bin/env node
// ============================================================================
// tools/hooks/post-tool.mjs — HOOK PostToolUse de Claude Code (TODO 378). Lo llama .claude/settings.json después de cada Bash.
//
// skill-con-diff: si el comando fue un `git commit` y el commit toca archivos de .claude/skills/, devuelve contexto adicional: el diff de un cambio de skill se le muestra a Guido con
// show_pane (pane diff, diff_scope el hash), porque el texto de una skill lo lee él en el diff y esa regla depende de acordarse. Si el commit no toca skills, no dice nada.
// Entrada: el JSON del hook por stdin. Salida: nada, o el JSON de PostToolUse con additionalContext. FOS_COMMIT=<hash> reemplaza el último commit (lo usa la prueba).
// Prueba con entradas simuladas: node tools/hooks/probar-post-tool.mjs
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');
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
if (!archivos.some((f) => f.startsWith('.claude/skills/'))) process.exit(0);
process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse',
  additionalContext: `El commit ${hash.slice(0, 10)} cambia una skill (${archivos.filter((f) => f.startsWith('.claude/skills/')).join(', ')}). Mostrale a Guido el diff con show_pane (pane diff, diff_scope ${hash.slice(0, 10)}) en este mismo turno: el texto de una skill lo lee él en el diff.` } }));
