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
//   push-con-ok              `git push` le pide permiso a Guido cada vez: un push a main despliega en Netlify (free tier, ~25 deploys/mes).
//   docs-de-la-principal     en un worktree, escribir Admin/TODO.md, CHANGELOG.md o ESTADO.md se rechaza: los escribe solo la principal; el
//                            cierre de la rama va en Admin/sesiones/<rama>.md (skill de arranque, worktree.md). En la principal no hace nada.
//   pdfs-con-ok              borrar en Clubes/ (rm, unlink, trash, find -delete) o un `git clean` con -x/-X le pide permiso a Guido: los PDF
//                            no se trackean y no hay copia de dónde recuperarlos; antes hay que chequear las referencias del pipeline.
//
//   comandos-simples        (deny) un Bash con /tmp suelto, `cd … &&`, o `$(…)`/`${…}`/`$VAR` fuera de comillas simples: no se puede chequear antes de
//                            correr y pide permiso cada vez (to-do 327, C-1). Pasan el scratchpad de la sesión y el heredoc de `git commit`.
//   no-importar-tools       (deny) `node -e` con import()/require() de un archivo de tools/ (salvo data-clubes.js y rutas.mjs): lo ejecuta (C-5).
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

function pushConOk(cmd) {
  if (GIT_SUB('push').test(cmd)) decidir('ask', 'git push necesita el ok explícito de Guido cada vez (un push a main despliega el sitio en Netlify).');
}

function docsDeLaPrincipal(cmd) {
  const DOCS = /Admin\/(TODO|CHANGELOG|ESTADO)\.md\b/;
  const toca = EDITA.includes(herramienta) ? DOCS.test(rutaEditada()) : bashEscribeEn(cmd, DOCS);
  if (!toca) return;
  let enWorktree;
  try { enWorktree = git(['rev-parse', '--path-format=absolute', '--git-dir']).trim() !== git(['rev-parse', '--path-format=absolute', '--git-common-dir']).trim(); }
  catch { return; }
  if (!enWorktree) return;
  let rama = '<rama>';
  try { rama = git(['rev-parse', '--abbrev-ref', 'HEAD']).trim(); } catch {}
  decidir('deny', `Esto es un worktree: Admin/TODO.md, CHANGELOG.md y ESTADO.md los escribe solo la principal. Lo que iba ahí va en `
    + `Admin/sesiones/${rama}.md (qué cambió, qué queda, qué deja de ser cierto en ESTADO). Ver la skill de arranque, worktree.md.`);
}

function pdfsConOk(cmd) {
  const borraEnClubes = /\bClubes\b/.test(cmd) && /\b(rm|unlink|trash)\s|\s-delete\b/.test(cmd);
  const gitCleanIgnorados = GIT_SUB('clean').test(cmd) && /\s-\w*[xX]/.test(cmd);
  if (borraEnClubes || gitCleanIgnorados) {
    decidir('ask', 'Esto puede borrar PDFs de Clubes/. No se trackean y no hay copia de dónde recuperarlos: ¿Guido lo pidió y se chequearon '
      + 'las referencias del pipeline (tools/quien.mjs, el registro)?');
  }
}

// Comandos que no se pueden chequear antes de correr y le piden permiso a Guido cada vez (to-do 327, C-1). Se mira el comando sin los
// textos que el shell no expande: los heredoc con delimitador entre comillas y lo que va entre comillas simples. El heredoc de
// `git commit -m "$(cat <<'EOF' … EOF\n)"` es la forma estándar de mensaje largo y pasa.
function comandosSimples(cmd) {
  const sinHeredocDeCommit = cmd.replace(/\$\(\s*cat\s+<<-?\s*['"]?(\w+)['"]?[\s\S]*?\n\s*\1\s*\n?\s*\)/g, '');
  // El mensaje de un commit es texto, no una ruta: puede nombrar /tmp o $(…) sin que el comando los use.
  const sinMensaje = GIT_SUB('commit').test(cmd) ? sinHeredocDeCommit.replace(/(?:-m|--message)\s+"(?:[^"\\]|\\.)*"/g, '-m ""') : sinHeredocDeCommit;
  const sinTextos = sinMensaje
    .replace(/<<-?\s*(['"])(\w+)\1[\s\S]*?\n\s*\2\b/g, '')
    .replace(/'[^']*'/g, "''");
  // El scratchpad de la sesión vive en /private/tmp/claude-501/: es la carpeta que el sistema indica, no un /tmp suelto.
  const tmpSuelto = sinTextos.replace(/\/private\/tmp\/claude-501\//g, '').match(/(^|[\s"'=:(<>])\/(?:private\/)?tmp(?:\/|\b)/);
  if (tmpSuelto) decidir('deny', 'Nada de /tmp: usá la carpeta de scratchpad de la sesión (la que da el sistema) o una ruta del proyecto. /tmp pide permiso cada vez.');
  if (/(^|\n|&&|;|\|)\s*cd\s+\S+\s*(&&|;)/.test(sinTextos)) {
    decidir('deny', 'Nada de `cd … &&` ni `cd …;`: el comando con cd no se puede chequear y pide permiso. Escribí la ruta completa en el comando; git y node se corren directo desde la carpeta de la sesión.');
  }
  if (/\$\(|\$\{|\$[A-Za-z_]/.test(sinTextos)) {
    decidir('deny', 'Nada de `$(…)`, `${…}` ni `$VARIABLE` en un comando: una ruta que se resuelve al correr pide permiso cada vez. Escribí la ruta o el valor entero; para encadenar dos pasos, un pipe o dos llamadas. (Pasa el heredoc de `git commit -m "$(cat <<\'EOF\' … EOF)"`.)');
  }
}

// `node -e "import('./tools/x.mjs')"` o `require('./tools/x.js')` para chequear una tool la EJECUTA (to-do 327, C-5). Se chequea con `node --check`.
// `data-clubes.js` y `rutas.mjs` son librerías sin efectos: esas sí se pueden importar.
function noImportarTools(cmd) {
  if (!/\bnode\b/.test(cmd)) return;
  for (const m of cmd.matchAll(/\b(?:import|require)\s*\(\s*\\?['"`][^'"`]*?tools\/([^'"`\\]+)/g)) {
    if (/(^|\/)(data-clubes\.js|rutas\.mjs)$/.test(m[1])) continue;
    decidir('deny', `Importar o hacer require de tools/${m[1]} la ejecuta de verdad (muchas escriben datos o llaman a APIs). Para chequear que no tenga errores de sintaxis: node --check tools/${m[1]}. Solo data-clubes.js y rutas.mjs se pueden importar.`);
  }
}

const cmd = herramienta === 'Bash' ? params.command || '' : '';
if (herramienta === 'Bash') { comandosSimples(cmd); noImportarTools(cmd); }
skillsConOk(cmd);
pushConOk(cmd);
docsDeLaPrincipal(cmd);
pdfsConOk(cmd);
if (herramienta === 'Bash') auditAntesDelCommit(cmd);
