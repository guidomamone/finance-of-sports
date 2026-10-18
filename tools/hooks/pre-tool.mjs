#!/usr/bin/env node
// ============================================================================
// tools/hooks/pre-tool.mjs — HOOK PreToolUse de Claude Code (to-do 250). Lo llama .claude/settings.json antes de cada Bash, Edit y Write.
//
// POR QUÉ. Las reglas que una máquina puede chequear no dependen de que la sesión se acuerde: este script las aplica antes de que la
// herramienta corra. Corre en todas las sesiones (la principal y cada worktree, con su propia copia), así que tiene que ser rápido: lo que
// no le toca sale en milisegundos, sin llamar a git. Cuando frena, dice por qué y qué hacer.
//
// CHEQUEOS:
//   audit-antes-del-commit   un `git commit` con cambios publicables corre `audit.js --quiet` y se frena si da P0 o P1. Si los cambios son
//                            solo internos (Admin/, .claude/, CLAUDE.md, auditorias/, Prototyping/), no audita. `[sin-audit]` en el mensaje
//                            del commit lo saltea: solo con el ok de Guido, para un hallazgo que ya venía de main.
//   skills-con-ok            escribir en .claude/skills/ (Edit, Write o un Bash que escribe) le pide permiso a Guido, aun en modo automático:
//                            las skills no se editan sin mostrarle el texto y esperar su ok.
//
// Entrada: el JSON del hook por stdin. Salida: nada (sigue normal) o el JSON de PreToolUse con permissionDecision "deny" / "ask".
// ============================================================================
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');
const herramienta = entrada.tool_name || '';
const params = entrada.tool_input || {};
const cwd = entrada.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();

const decidir = (decision, motivo) => {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: motivo } }));
  process.exit(0);
};
const git = (args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });

// `git commit`, también con opciones antes del subcomando (`git -C x commit`) y dentro de `git add … && git commit …`.
const GIT_SUB = (sub) => new RegExp(`\\bgit(?:\\s+-[cC]\\s+\\S+|\\s+--?[\\w-]+(?:=\\S+)?)*\\s+${sub}\\b`);
// Lo que no se publica (netlify.toml lo borra del deploy) y no cambia nada que audit.js mire.
const INTERNO = /^(Admin\/|\.claude\/|CLAUDE\.md$|auditorias\/|Prototyping\/)/;

function auditAntesDelCommit(cmd) {
  if (!GIT_SUB('commit').test(cmd) || cmd.includes('[sin-audit]')) return;
  let raiz;
  try { raiz = git(['rev-parse', '--show-toplevel']).trim(); } catch { return; }
  if (!existsSync(join(raiz, 'tools', 'audit.js'))) return; // otro repo
  // Lo cambiado respecto de HEAD más lo nuevo sin trackear: el comando puede hacer el `git add` antes del commit.
  const cambiados = [...git(['diff', 'HEAD', '--name-only']).split('\n'), ...git(['ls-files', '--others', '--exclude-standard']).split('\n')]
    .filter(Boolean);
  if (!cambiados.some((f) => !INTERNO.test(f))) return;
  try {
    execFileSync('node', ['tools/audit.js', '--quiet'], { cwd: raiz, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 90_000 });
  } catch (e) {
    const salida = `${e.stdout || ''}${e.stderr || ''}`.trim().split('\n').slice(0, 40).join('\n');
    decidir('deny', `Commit frenado: node tools/audit.js no da P0 0 / P1 0.\n${salida}\n\n`
      + 'Arreglalo y volvé a commitear. Si el hallazgo no es de este cambio (ya venía de main), avisale a Guido; con su ok, '
      + 'agregá [sin-audit] al mensaje del commit.');
  }
}

// Un Bash que escribe: sed/perl en el lugar, redirección, tee, mv, cp, rm, o un intérprete que puede escribir cualquier cosa.
// (`2>/dev/null` y `>&2` no cuentan.)
const ESCRIBE = /\b(sed|perl)\s+(-\w+\s+)*-i|(^|[^0-9&])>>?\s*(?!\/dev\/null|&)|\btee\b|\b(mv|cp|rm|touch|truncate)\s|\b(python3?|node)\s+(-e|-c|-)\b/;
const EDITA = ['Edit', 'Write', 'MultiEdit', 'NotebookEdit'];
const rutaEditada = () => params.file_path || params.notebook_path || '';
const bashEscribeEn = (cmd, ruta) => ruta.test(cmd) && ESCRIBE.test(cmd);

function skillsConOk(cmd) {
  const SKILLS = /\.claude\/skills\//;
  const toca = EDITA.includes(herramienta) ? SKILLS.test(rutaEditada()) : bashEscribeEn(cmd, SKILLS);
  if (toca) decidir('ask', 'Esto escribe en .claude/skills/. Las skills no se editan sin el ok de Guido: ¿ya vio el texto del cambio en el chat?');
}

const cmd = herramienta === 'Bash' ? params.command || '' : '';
skillsConOk(cmd);
if (herramienta === 'Bash') auditAntesDelCommit(cmd);
