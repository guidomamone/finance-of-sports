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
//   skills-con-ok            escribir en .claude/skills/ solo pasa si el texto exacto ya está en un archivo de Admin/propuestas/ commiteado en HEAD (Edit: el
//                            new_string entero; Write: cada párrafo de 40+ caracteres); si no, deny. Con el texto, ask: el permiso dice dónde está. Un Bash que
//                            escribe en skills pasa (una sola sesión).
//   archivar-con-ok          (ask) archive_session: una sesión se archiva solo con el sí de Guido (la Auditora queda abierta).
//   modelo-opus-con-ok       (ask) start_session o set_session_model con un modelo Opus.
//   worktree-sin-permission-mode  (ask) start_session con permission_mode distinto de auto.
//   memoria-no-es-regla      (ask) escribir en la memoria de una sesión un archivo type feedback o project: una regla de trabajo va a una convención,
//                            una skill o un chequeo; user y reference pasan.
//   comando-que-edita        (ask) sed -i, perl -i o python por Bash que escriben: usá Edit o Write. Cada disparo se anota en
//                            Admin/registros/.hooks-disparos.jsonl (gitignoreado) para medir cuántas veces pasa antes de pensar en deny.
//                            Las herramientas de sesiones (archivar, iniciar, cambiar modelo) necesitan su matcher en .claude/settings.json.
//   push-con-ok              `git push` le pide permiso a Guido cada vez: un push a main despliega en Netlify (free tier, ~25 deploys/mes).
//   docs-de-la-principal     en un worktree, escribir Admin/TODO.md, CHANGELOG.md o ESTADO.md se rechaza: los escribe solo la principal; el
//                            cierre de la rama va en Admin/sesiones/<rama>.md (Admin/Archive/modo-varias-sesiones.md). En la principal no hace nada.
//   pdfs-con-ok              (deny) borrar o pisar en Clubes/ (rm, unlink, trash, find -delete, mv sobre algo que existe) o un `git clean`
//                            con -x/-X: los PDF no se trackean y no hay copia. No le pregunta a Guido: dice qué usar (preparar, mv a un nombre
//                            nuevo, el scratchpad). Un mv a un destino que no existe y un Clubes/ del scratchpad pasan.
//
//   comandos-simples        (deny) un Bash con /tmp suelto, `cd … &&`, o `$(…)`/`${…}`/`$VAR` fuera de comillas simples: no se puede chequear antes de
//                            correr y pide permiso cada vez (to-do 327, C-1). Pasan el scratchpad de la sesión y el heredoc de `git commit`.
//   no-importar-tools       (deny) `node -e` con import()/require() de un archivo de tools/ (salvo data-clubes.js y rutas.mjs): lo ejecuta (C-5).
//   merge-en-worktree       (deny) `git merge` / `git pull` dentro de un worktree (menos `merge-tree`, `merge-base` y `--abort`): lo hace la principal (C-4).
//   plan-en-worktree        (deny) `EnterPlanMode` dentro de un worktree (el Exit pasa, para no atrapar una sesión que ya está en modo plan) (C-3).
//   subagente-con-regla     (deny) un Agent cuyo prompt no diga que Bash va «sin variables» (C-2).
//   rsync-sin-no-links      (deny) `rsync -a` sin `--no-links` (C-6). `pdfs-con-ok` ahora también cubre `mv` sobre Clubes/ (ask).
// Prueba con entradas simuladas (incluye los falsos positivos conocidos): node tools/hooks/probar-pre-tool.mjs
// Entrada: el JSON del hook por stdin. Salida: nada (sigue normal) o el JSON de PreToolUse con permissionDecision "deny" / "ask".
// ============================================================================
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
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

// El candado de las skills: lo que se escribe en .claude/skills/ tiene que estar ya, palabra por palabra, en un archivo de Admin/propuestas/ commiteado
// en HEAD (no cuenta el árbol de trabajo). Sin eso se rechaza; con eso se pide el ok de Guido y el permiso dice dónde está el texto que aprueba.
// Edit: el `new_string` entero, en un solo archivo de propuesta. Write: cada párrafo de 40 caracteres o más, en algún archivo. Un Bash que escribe
// en skills se rechaza ("usá Edit"); los comandos de git que reescriben el árbol (merge, checkout, restore, rebase, cherry-pick, reset, pull, stash)
// pasan: traen texto que ya pasó por una propuesta en otra rama. Lo que garantiza: que no hay cambio de skill sin texto exacto commiteado. Lo que no:
// que Guido lo haya leído.
const normalizarTexto = (s) => String(s || '').replace(/^\s*>\s?/gm, '').replace(/\s+/g, ' ').trim();
function propuestasEnHead() {
  let lista;
  try { lista = git(['ls-tree', '-r', 'HEAD', '--name-only', '--', 'Admin/propuestas']).split('\n').filter((f) => f.endsWith('.md')); } catch { return []; }
  return lista.map((f) => { try { return { f, t: normalizarTexto(git(['show', `HEAD:${f}`])) }; } catch { return null; } }).filter(Boolean);
}
const GIT_REESCRIBE = /\bgit(?:\s+-[cC]\s+\S+)*\s+(?:merge|checkout|restore|rebase|cherry-pick|reset|pull|stash|apply|am)\b/;

// ¿Un Bash escribe EN .claude/skills/? Se mira el destino del comando, no si la ruta aparece en algún texto: un script que escribe otro archivo y
// nombra `.claude/skills/` en lo que escribe no toca las skills. Sin los cuerpos de heredoc, el destino es el de una redirección, `tee`, `sed -i`/
// `perl -i`, o el argumento de mv, cp, rm, touch o truncate; un python o node que abre o escribe esa ruta con open() o writeFile también cuenta.
function bashEscribeEnSkills(cmd) {
  const S = '[^\\s|;&<>]*\\.claude\\/skills\\/';
  const sinCuerpos = cmd.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n\s*\2\b/g, (m) => m.split('\n')[0].replace(/<<-?\s*['"]?\w+['"]?/, ''));
  const destino = [
    new RegExp(`(^|[^0-9&])>>?\\s*(?!&|/dev/null)["']?${S}`),
    new RegExp(`\\btee\\b[^|;&\\n]*${S}`),
    new RegExp(`\\b(?:sed|perl)\\s+(?:-\\w+\\s+)*-i\\b[^|;&\\n]*${S}`),
    new RegExp(`\\b(?:mv|cp|rm|touch|truncate)\\s+[^|;&\\n]*${S}`),
  ];
  if (destino.some((re) => re.test(sinCuerpos))) return true;
  return /\b(?:python3?|node)\b/.test(cmd)
    && /\b(?:open|writeFileSync|writeFile|write_text|appendFileSync|Path|shutil\.\w+|os\.(?:rename|replace|remove))\s*\([^)]*\.claude\/skills\//.test(cmd);
}

function skillsConOk(cmd) {
  const SKILLS = /\.claude\/skills\//;
  const porBash = herramienta === 'Bash';
  const toca = EDITA.includes(herramienta) ? SKILLS.test(rutaEditada()) : bashEscribeEnSkills(cmd);
  if (!toca) return;
  if (porBash) return; // una sola sesión: Bash puede escribir en las skills (el candado de texto en propuestas/ era del modo de varios worktrees); Edit y Write siguen pidiendo
  const textos = herramienta === 'Write' ? String(params.content || '').split(/\n\s*\n/).map(normalizarTexto).filter((p) => p.length >= 40)
    : herramienta === 'MultiEdit' ? (params.edits || []).map((e) => normalizarTexto(e.new_string)).filter(Boolean)
    : [normalizarTexto(params.new_string)].filter(Boolean);
  if (!textos.length) decidir('ask', 'Esto borra texto de .claude/skills/ o no agrega nada. Las skills no se editan sin el ok de Guido: ¿ya vio qué se saca?');
  const props = propuestasEnHead();
  const donde = new Set();
  const faltantes = [];
  for (const t of textos) {
    const p = props.find((x) => x.t.includes(t));
    if (p) donde.add(p.f); else faltantes.push(t);
  }
  if (faltantes.length) {
    decidir('deny', `Este texto no está en ningún archivo de Admin/propuestas/ commiteado: «${faltantes[0].slice(0, 140)}${faltantes[0].length > 140 ? '…' : ''}». `
      + 'Escribí el texto exacto en Admin/propuestas/<tema>.md, commitealo, mostráselo a Guido en el texto final del turno y volvé con su ok (las skills no se editan sin que él haya visto el texto).');
  }
  let corto = '';
  try { corto = git(['log', '-1', '--format=%h', 'HEAD']).trim(); } catch { /* sin git */ }
  decidir('ask', `Esto escribe en .claude/skills/. El texto está en ${[...donde].join(', ')} (HEAD ${corto}). ¿Guido lo vio y dijo que sí a este texto?`);
}

// Las herramientas de sesiones de la app no pasan por el matcher de Bash: se agregan a `matcher` de .claude/settings.json.
const HERRAMIENTA_ARCHIVAR = 'mcp__ccd_session_mgmt__archive_session';
const HERRAMIENTA_INICIAR = 'mcp__ccd_session__start_session';
const HERRAMIENTA_MODELO = 'mcp__ccd_session_mgmt__set_session_model';

// archivar-con-ok: una sesión terminada se archiva solo con el sí de Guido; la Auditora tiene que quedar abierta para que le escriban.
function archivarConOk() {
  if (herramienta !== HERRAMIENTA_ARCHIVAR) return;
  decidir('ask', `Archivar la sesión ${params.session_id || ''}: ¿Guido dijo que sí a archivar esta sesión en este turno? (La Auditora queda abierta.)`);
}

// modelo-opus-con-ok: las sesiones nuevas van en Sonnet sin consultar; una en Opus solo con el ok de Guido.
function modeloOpusConOk() {
  if (herramienta !== HERRAMIENTA_INICIAR && herramienta !== HERRAMIENTA_MODELO) return;
  if (/opus/i.test(String(params.model || ''))) decidir('ask', 'Una sesión en Opus pide el ok de Guido: ¿lo dijo? Onboarding, pipeline, auditoría y votaciones van en Sonnet.');
}

// worktree-sin-permission-mode: una sesión de worktree hereda el modo auto; con otro modo (acceptEdits) pide permiso para todo.
function worktreeSinPermissionMode() {
  if (herramienta !== HERRAMIENTA_INICIAR) return;
  if (params.permission_mode && params.permission_mode !== 'auto') {
    try { appendFileSync(join(cwd, 'Admin', 'registros', '.hooks-disparos.jsonl'), JSON.stringify({ ts: new Date().toISOString(), chequeo: 'worktree-sin-permission-mode', modo: params.permission_mode }) + '\n'); } catch { /* sin carpeta */ }
    decidir('deny', `start_session con permission_mode «${params.permission_mode}»: una sesión de worktree va en auto (con acceptEdits pide permiso para todo). Usá auto u omitilo.`);
  }
}

// memoria-no-es-regla: una regla de trabajo no vive en la memoria de una sesión. Una preferencia de trato (type user o reference) sí.
function memoriaNoEsRegla() {
  if (!EDITA.includes(herramienta)) return;
  const ruta = rutaEditada();
  if (!/\/\.claude\/projects\/[^/]+\/memory\/[^/]+\.md$/.test(ruta) || /\/MEMORY\.md$/.test(ruta)) return;
  let texto = String(params.content || params.new_string || '');
  if (!/^\s*type:\s*/m.test(texto)) { try { texto = readFileSync(ruta, 'utf8'); } catch { /* archivo nuevo */ } }
  if (/^\s*type:\s*(feedback|project)\b/m.test(texto)) {
    decidir('ask', 'Una regla de trabajo no vive en la memoria: va a Admin/CONVENCIONES.md, a una skill (texto en Admin/propuestas/) o a un chequeo (audit.js o este hook). '
      + '¿Esto es una preferencia de trato con Guido y no una regla de trabajo?');
  }
}

// comando-que-edita (deny: corrige a la sesión, no le pregunta a Guido): sed -i, perl -i y un python en línea que ESCRIBE archivos se reemplazan por
// Edit o Write. Un python que solo lee (contar, filtrar una salida) pasa, y uno que escribe solo en el scratchpad de la sesión también. Cada disparo se anota.
const PY_ESCRIBE = /\bopen\([^)]*,\s*['"][wax]|\.write_text\(|\.write_bytes\(|\bshutil\.|\bos\.(?:rename|replace|remove|unlink)\b/;
function comandoQueEdita(cmd) {
  if (/^\s*git\s+commit\b/.test(cmd) || /\/tmp\/claude-\d+\//.test(cmd)) return; // un mensaje de commit no edita; el scratchpad no es el repo
  // Solo cuando sed, perl o python es el comando (al principio o después de ; && || |), no cuando el texto aparece dentro de un grep o un mensaje.
  const sedPerl = /(?:^|[;&|]\s*)(?:sed|perl)\s+(?:-\w+\s+)*-i\b/.test(cmd);
  const py = /(?:^|[;&|]\s*)python3?\s+(?:-[ce]\b|-\s*<<)/.test(cmd) && PY_ESCRIBE.test(cmd);
  if (!sedPerl && !py) return;
  try { appendFileSync(join(cwd, 'Admin', 'registros', '.hooks-disparos.jsonl'), JSON.stringify({ ts: new Date().toISOString(), chequeo: 'comando-que-edita', cmd: cmd.slice(0, 120) }) + '\n'); } catch { /* sin carpeta */ }
  decidir('deny', 'Editá con Edit o Write; una transformación en masa va en un archivo de script que se corre.');
}

function pushConOk(cmd) {
  if (GIT_SUB('push').test(cmd)) decidir('ask', 'git push necesita el ok explícito de Guido cada vez (un push a main despliega el sitio en Netlify).');
}

// Un worktree tiene su propio git-dir; la principal, no. Si git falla (otro repo, sin git) se asume que no.
function estaEnWorktree() {
  try { return git(['rev-parse', '--path-format=absolute', '--git-dir']).trim() !== git(['rev-parse', '--path-format=absolute', '--git-common-dir']).trim(); }
  catch { return false; }
}

function docsDeLaPrincipal(cmd) {
  const DOCS = /Admin\/(TODO|CHANGELOG|ESTADO)\.md\b/;
  const toca = EDITA.includes(herramienta) ? DOCS.test(rutaEditada()) : bashEscribeEn(cmd, DOCS);
  if (!toca) return;
  if (!estaEnWorktree()) return;
  let rama = '<rama>';
  try { rama = git(['rev-parse', '--abbrev-ref', 'HEAD']).trim(); } catch {}
  decidir('deny', `Esto es un worktree: Admin/TODO.md, CHANGELOG.md y ESTADO.md los escribe solo la principal. Lo que iba ahí va en `
    + `Admin/sesiones/${rama}.md (qué cambió, qué queda, qué deja de ser cierto en ESTADO). Ver Admin/Archive/modo-varias-sesiones.md.`);
}

// `rsync -a` copia los symlinks como symlinks: en un worktree recién creado apuntan a carpetas que no existen. Con `--no-links` se saltean (to-do 327, C-6).
function rsyncSinNoLinks(cmd) {
  if (!/\brsync\b/.test(cmd) || /--no-links\b/.test(cmd)) return;
  if (/\s-[A-Za-z]*a[A-Za-z]*\b|--archive\b/.test(cmd)) {
    decidir('deny', 'rsync -a copia los symlinks tal cual y en el destino quedan rotos. Agregá --no-links (o --no-links junto con -rt en vez de -a).');
  }
}

// Un `mv <origen> <destino>` cuyo destino todavía no existe es un renombre: no pisa nada, así que no borra un PDF. Solo pasa si TODOS los
// mv del comando son así y no hay rm, unlink, trash ni -delete; con flags, más de dos argumentos o un destino existente, sigue preguntando.
function soloRenombres(cmd) {
  if (/\b(rm|unlink|trash)\s|\s-delete\b/.test(cmd)) return false;
  const ARG = String.raw`("[^"]*"|'[^']*'|[^\s;&|"']+)`;
  const mvs = [...cmd.matchAll(new RegExp(String.raw`(?:^|[;&|]\s*)mv\s+([^;&|]*)`, 'g'))];
  if (!mvs.length) return false;
  return mvs.every((m) => {
    const args = [...m[1].trim().matchAll(new RegExp(ARG, 'g'))].map((a) => a[1].replace(/^["']|["']$/g, ''));
    return args.length === 2 && !args[0].startsWith('-') && !existsSync(args[1]);
  });
}

function pdfsConOk(cmd) {
  // Un `Clubes/` dentro del scratchpad de una sesión es una copia de prueba (los worktrees de mentira), no los PDFs reales.
  const sinScratchpad = cmd.replace(/(?:\/private)?\/tmp\/claude-\d+\/[^\s"']*/g, '');
  const borraEnClubes = /\bClubes\b/.test(sinScratchpad) && /\b(rm|unlink|trash|mv)\s|\s-delete\b/.test(cmd) && !soloRenombres(cmd);
  const gitCleanIgnorados = GIT_SUB('clean').test(cmd) && /\s-\w*[xX]/.test(cmd);
  // No se le pregunta a Guido: una sesión nunca borra en Clubes/ (si él quiere borrar un PDF, lo hace él). Se frena y se dice qué usar.
  if (borraEnClubes || gitCleanIgnorados) {
    decidir('deny', 'Una sesión no borra ni pisa nada en Clubes/: los PDF no se trackean y no hay copia. En su lugar: enlaces rotos de un worktree, '
      + '`node tools/worktree.mjs preparar <carpeta>` (los saca solo); renombrar, `mv` a un nombre que todavía no existe (pasa); un archivo que '
      + 'no es lo que dice, se renombra con -pagina-html y se baja el real; una prueba, en un Clubes/ del scratchpad. Si de verdad hay que borrar, se le '
      + 'pide a la principal, que se lo pide a Guido.');
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

// En un worktree no se mergea ni se hace pull: ni la rama a main ni main a la rama; el merge lo hace la sesión principal (to-do 327, C-4).
// `merge-tree` y `merge-base` no tocan nada y sirven para anticipar conflictos; `merge --abort` deshace. `git merge --ff-only main` sí pasa:
// solo adelanta la rama hasta main, sin mezclar nada (si la rama tiene commits propios, git lo rechaza y la sesión le pide el merge a la principal).
function mergeEnWorktree(cmd) {
  if (!GIT_SUB('(?:merge|pull)(?![-\\w])').test(cmd) || /--abort\b/.test(cmd) || !estaEnWorktree()) return;
  if (/^\s*git(?:\s+-C\s+\S+)?\s+merge\s+--ff-only\s+main\s*$/.test(cmd)) return;
  decidir('deny', 'Esto es un worktree: el merge (y el pull) lo hace la sesión principal. Lo único que pasa es traer main sin mezclar: '
    + '`git merge --ff-only main`, solo, en un comando aparte. Si git lo rechaza porque la rama tiene commits propios, pedile el merge a la principal. '
    + 'Para anticipar conflictos, git merge-tree (no toca nada).');
}

// `EnterPlanMode` en un worktree: aprobar un plan pasa la sesión a acceptEdits y pide permiso para todo (to-do 327, C-3). Solo el Enter: si la
// sesión ya está en modo plan, el Exit tiene que poder salir. Diseños y preguntas van en el chat.
function planEnWorktree() {
  if (herramienta === 'EnterPlanMode' && estaEnWorktree()) {
    decidir('deny', 'Las sesiones de worktree no usan modo plan ni el panel Plan: aprobar un plan las pasa a acceptEdits y piden permiso para todo. Diseños y preguntas van en el chat.');
  }
}

// Todo prompt de subagente lleva la regla de comandos: sin ella cada Bash del subagente le pide permiso a Guido (to-do 327, C-2).
function subagenteConReglaDeComandos() {
  if (herramienta !== 'Agent' && herramienta !== 'Task') return;
  const prompt = String(params.prompt || '');
  if (/\bBash\b/i.test(prompt) && /sin variables/i.test(prompt)) return;
  decidir('deny', 'Al prompt del subagente le falta la regla de comandos. Pegá esta instrucción: "Leé con Read y escribí con Write. Bash solo para comandos simples '
    + 'con la ruta completa entre comillas, sin variables, sin cd, sin ; ni &&." Sin ella, cada comando del subagente le pide permiso a Guido.');
}

const cmd = herramienta === 'Bash' ? params.command || '' : '';
if (herramienta === 'Bash') { comandosSimples(cmd); noImportarTools(cmd); mergeEnWorktree(cmd); }
planEnWorktree();
if (herramienta === 'Bash') rsyncSinNoLinks(cmd);
subagenteConReglaDeComandos();
archivarConOk();
modeloOpusConOk();
worktreeSinPermissionMode();
memoriaNoEsRegla();
skillsConOk(cmd);
if (herramienta === 'Bash') comandoQueEdita(cmd);
pushConOk(cmd);
docsDeLaPrincipal(cmd);
pdfsConOk(cmd);
if (herramienta === 'Bash') auditAntesDelCommit(cmd);
