#!/usr/bin/env node
// ============================================================================
// tools/hooks/pre-tool.mjs — HOOK PreToolUse de Claude Code (to-do 250). Lo llama .claude/settings.json antes de cada Bash, Edit y Write.
//
// POR QUÉ. Las reglas que una máquina puede chequear no dependen de que la sesión se acuerde: este script las aplica antes de que la
// herramienta corra. Corre en todas las sesiones (la principal y cada worktree, con su propia copia), así que tiene que ser rápido: lo que
// no le toca sale en milisegundos, sin llamar a git. Cuando frena, dice por qué y qué hacer.
//
// MODO. `.claude/modo.json` dice si el proyecto trabaja en «una-sesion» o en «varias-sesiones» (cambiar: `node tools/modo.mjs <modo>`). Los chequeos marcados
// [varias] solo se aplican en ese modo (el candado de las skills, archivar, Opus, permission_mode, docs de la principal, merge, plan y rsync de
// worktrees); los demás valen siempre. `FOS_MODO=<modo>` en el entorno gana sobre el archivo (lo usa la prueba).
//
// CHEQUEOS:
//   audit-antes-del-commit  un `git commit` con cambios publicables corre `audit.js --quiet` y se frena si da P0 o P1. Si los cambios son
//                            solo internos (Admin/, .claude/, CLAUDE.md, auditorias/, Prototyping/), no audita. `[sin-audit]` en el mensaje
//                            del commit lo saltea: solo con el ok de Guido, para un hallazgo que ya venía de main.
//   skills-con-ok [varias]   escribir en .claude/skills/ solo pasa si el texto exacto ya está en un archivo de Admin/propuestas/ commiteado en HEAD (Edit: el
//                            new_string entero; Write: cada párrafo de 40+ caracteres); si no, deny. Con el texto, ask: el permiso dice dónde está. Un Bash que
//                            escribe en skills se rechaza. En una sola sesión no hay candado: el texto de una skill lo ve Guido en el diff del commit (CLAUDE.md).
//   archivar-con-ok [varias]  (ask) archive_session: una sesión se archiva solo con el sí de Guido (la Auditora queda abierta).
//   modelo-opus-con-ok [varias]  (ask) start_session o set_session_model con un modelo Opus.
//   worktree-sin-permission-mode [varias]  (ask) start_session con permission_mode distinto de auto.
//   memoria-no-es-regla      (ask) escribir en la memoria de una sesión un archivo type feedback o project: una regla de trabajo va a una convención,
//                            una skill o un chequeo; user y reference pasan.
//   lote-existente           (deny) un Write sobre un Admin/lotes/lote-NN.txt que ya existe: dice `fos lote-nuevo` (el próximo número libre).
//   regla-de-pais-en-doc-general  (deny) un Edit/Write que agrega a Admin/CONVENCIONES-DATOS.md un `## REGLA:` cuyo título nombra un país: va a Admin/paises/<iso>.md.
//   comando-que-edita        (ask) sed -i, perl -i o python por Bash que escriben: usá Edit o Write. Cada disparo se anota en
//                            Admin/registros/.hooks-disparos.jsonl (gitignoreado) para medir cuántas veces pasa antes de pensar en deny.
//                            Las herramientas de sesiones (archivar, iniciar, cambiar modelo) necesitan su matcher en .claude/settings.json.
//   push-con-ok              `git push` le pide permiso a Guido cada vez: un push a main despliega en Netlify (free tier, ~25 deploys/mes).
//   docs-de-la-principal [varias]  en un worktree, escribir Admin/TODO.md, CHANGELOG.md o ESTADO.md se rechaza: los escribe solo la principal; el
//                            cierre de la rama va en Admin/sesiones/<rama>.md (Admin/Archive/modo-varias-sesiones.md). En la principal no hace nada.
//   pdfs-con-ok              (deny) borrar o pisar en Clubes/ (rm, unlink, trash, find -delete, mv sobre algo que existe) o un `git clean`
//                            con -x/-X: los PDF no se trackean y no hay copia. No le pregunta a Guido: dice qué usar (preparar, mv a un nombre
//                            nuevo, el scratchpad). Un mv a un destino que no existe y un Clubes/ del scratchpad pasan.
//
//   comandos-simples        (deny) un Bash con /tmp suelto, `cd … &&`, o `$(…)`/`${…}`/`$VAR` fuera de comillas simples: no se puede chequear antes de
//                            correr y pide permiso cada vez (to-do 327, C-1). Pasan el scratchpad de la sesión y el heredoc de `git commit`.
//                            También `node -e`/`-p` y `python -c` (el código suelto no se puede revisar): un script va con Write en el scratchpad.
//   no-importar-tools       (deny) `node -e` con import()/require() de un archivo de tools/ (salvo data-clubes.js y rutas.mjs): lo ejecuta (C-5).
//   merge-en-worktree [varias]  (deny) `git merge` / `git pull` dentro de un worktree (menos `merge-tree`, `merge-base` y `--abort`): lo hace la principal (C-4).
//   plan-en-worktree [varias]  (deny) `EnterPlanMode` dentro de un worktree (el Exit pasa, para no atrapar una sesión que ya está en modo plan) (C-3).
//   subagente-con-regla     (deny) un Agent cuyo prompt no diga que Bash va «sin variables» (C-2).
//   rsync-sin-no-links [varias]  (deny) `rsync -a` sin `--no-links` (C-6). `pdfs-con-ok` ahora también cubre `mv` sobre Clubes/ (ask).
//   medicion-antes-del-commit  (deny) un `git commit` con una tool de tools/pipeline-tools.json sin una línea en Admin/registros/mediciones-pipeline.jsonl
//                            con la huella de esa versión y resultado idéntico o explicado (TODO 371). `[sin-medicion]` en el mensaje lo saltea:
//                            solo con el ok de Guido, igual que `[sin-audit]`. Va antes que audit-antes-del-commit.
// Prueba con entradas simuladas (incluye los falsos positivos conocidos): node tools/hooks/probar-pre-tool.mjs
// Entrada: el JSON del hook por stdin. Salida: nada (sigue normal) o el JSON de PreToolUse con permissionDecision "deny" / "ask".
// ============================================================================
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { clasificar } from '../clasificar-tools.mjs';
import { createRequire } from 'node:module';
const selloVale = (raiz) => { try { return createRequire(import.meta.url)('../sello-audit.js').selloVale(raiz); } catch { return false; } };

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');
const herramienta = entrada.tool_name || '';
const params = entrada.tool_input || {};
const cwd = entrada.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
const MODO = process.env.FOS_MODO || (() => { try { return JSON.parse(readFileSync(join(cwd, '.claude', 'modo.json'), 'utf8')).modo; } catch { return 'una-sesion'; } })();
const VARIAS = MODO === 'varias-sesiones';

const decidir = (decision, motivo) => {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: motivo } }));
  process.exit(0);
};
const git = (args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });

// `git commit`, también con opciones antes del subcomando (`git -C x commit`) y dentro de `git add … && git commit …`.
const GIT_SUB = (sub) => new RegExp(`\\bgit(?:\\s+-[cC]\\s+\\S+|\\s+--?[\\w-]+(?:=\\S+)?)*\\s+${sub}\\b`);
// Lo que no se publica (netlify.toml lo borra del deploy) y no cambia nada que audit.js mire.
const INTERNO = /^(Admin\/|\.claude\/|CLAUDE\.md$|auditorias\/|Prototyping\/)/;

// Qué entra en el commit (TODO 385). Si el comando no agrega nada (ni `git add` ni `-a`) y hay algo staged, es lo staged; si no, lo cambiado respecto de HEAD más lo nuevo sin trackear
// (el comando puede hacer el `git add` antes del commit). FOS_CAMBIADOS y FOS_STAGED reemplazan lo que se lee de git: los usa la prueba.
function archivosDelCommit(cmd) {
  if (process.env.FOS_CAMBIADOS) return { archivos: process.env.FOS_CAMBIADOS.split(',').filter(Boolean), staged: false };
  const sinTextos = cmd.replace(/"(?:[^"\\]|\\.)*"|'[^']*'/g, '""');
  const staged = (process.env.FOS_STAGED !== undefined ? process.env.FOS_STAGED.split(',') : git(['diff', '--cached', '--name-only']).split('\n')).filter(Boolean);
  const arbolEntero = () => (process.env.FOS_ARBOL !== undefined ? process.env.FOS_ARBOL.split(',') : [...git(['diff', 'HEAD', '--name-only']).split('\n'), ...git(['ls-files', '--others', '--exclude-standard']).split('\n')]).filter(Boolean);
  const todoElArbol = () => ({ archivos: arbolEntero(), staged: false });
  if (/\bcommit\b[^|;&]*\s(-[a-zA-Z]*a[a-zA-Z]*|--all)(\s|$)/.test(sinTextos)) return todoElArbol(); // commit -a
  // `git add <rutas> && git commit`: entra lo staged más esas rutas. Sin rutas (`-A`, `-u`) o con `.` entra todo el árbol, menos lo que excluya un pathspec (`':!tools'`).
  // Las rutas se leen del comando tal cual, antes del `git commit` (el mensaje del commit no cuenta).
  const iCommit = cmd.search(/\bgit\b[^|;&]*\bcommit\b/);
  const antesDelCommit = iCommit >= 0 ? cmd.slice(0, iCommit) : cmd;
  const adds = [...antesDelCommit.matchAll(/\bgit\b[^|;&]*?\badd\b([^|;&]*)/g)].map((m) => m[1].trim().split(/\s+/).filter(Boolean).map((x) => x.replace(/^["']|["']$/g, '')));
  const PATHSPEC_EXCLUYE = /^:(!|\^|\(exclude\))/;
  const rutasDe = (t) => t.filter((x) => x !== '--' && !x.startsWith('-'));
  const conRutas = (t) => rutasDe(t).filter((x) => !PATHSPEC_EXCLUYE.test(x));
  const enteroMenos = (t) => { const fuera = rutasDe(t).filter((x) => PATHSPEC_EXCLUYE.test(x)).map((x) => x.replace(PATHSPEC_EXCLUYE, '').replace(/\/$/, '')); return { archivos: arbolEntero().filter((f) => !fuera.some((e) => f === e || f.startsWith(`${e}/`))), staged: false }; };
  const quePideTodo = adds.find((t) => !conRutas(t).length || conRutas(t).includes('.'));
  if (quePideTodo) return enteroMenos(quePideTodo);
  if (adds.length) {
    const rutas = adds.flatMap(conRutas).map((x) => x.replace(/\/$/, ''));
    const todos = todoElArbol().archivos;
    return { archivos: [...new Set([...staged, ...todos.filter((f) => rutas.some((r) => f === r || f.startsWith(`${r}/`)))])], staged: true };
  }
  if (staged.length) return { archivos: staged, staged: true };
  return todoElArbol();
}
// Lo que dice tools/audit-acciones.json que se hace con cada código que frenó: el hook lo imprime al lado del hallazgo.
function queHacer(raiz, salida) {
  let acciones = {}; try { acciones = JSON.parse(readFileSync(join(raiz, 'tools', 'audit-acciones.json'), 'utf8')); } catch { return ''; }
  const codigos = [...new Set([...String(salida).matchAll(/^\s*\[([a-z0-9-]+)\]\s+\d+/gm)].map((m) => m[1]))];
  const lineas = codigos.map((c) => acciones[c]?.hacer && `  [${c}] ${acciones[c].hacer}`).filter(Boolean);
  return lineas.length ? `\nQué hacer (tools/audit-acciones.json):\n${lineas.join('\n')}\n` : '';
}

function auditAntesDelCommit(cmd) {
  if (!GIT_SUB('commit').test(cmd) || cmd.includes('[sin-audit]')) return;
  let raiz;
  try { raiz = git(['rev-parse', '--show-toplevel']).trim(); } catch { return; }
  if (!existsSync(join(raiz, 'tools', 'audit.js'))) return; // otro repo
  const cambiados = archivosDelCommit(cmd).archivos;
  if (!cambiados.some((f) => !INTERNO.test(f))) return;
  let falla = null;
  if (process.env.FOS_AUDIT_SALIDA) falla = process.env.FOS_AUDIT_SALIDA; // la prueba simula un audit que frena
  else if (selloVale(raiz)) return; // una auditoría con P0 0 y P1 0 acaba de pasar sobre este mismo estado del árbol (tools/sello-audit.js): repetirla da lo mismo
  else {
    try { execFileSync('node', ['tools/audit.js', '--quiet'], { cwd: raiz, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 90_000 }); }
    catch (e) { falla = `${e.stdout || ''}${e.stderr || ''}`.trim(); }
  }
  if (falla != null) {
    const salida = falla.split('\n').slice(0, 40).join('\n');
    decidir('deny', `Commit frenado: node tools/audit.js no da P0 0 / P1 0.\n${salida}\n${queHacer(raiz, falla)}\n`
      + 'Arreglalo y volvé a commitear. Si el hallazgo no es de este cambio (ya venía de main), avisale a Guido; con su ok, '
      + 'agregá [sin-audit] al mensaje del commit.');
  }
}

// medicion-antes-del-commit (TODO 371): un commit que incluye una tool de tools/pipeline-tools.json necesita, en
// Admin/registros/mediciones-pipeline.jsonl, una línea de `node tools/medir-pipeline.mjs` cuya huella de esa tool coincida con la que se commitea
// (una tool editada después de medir no tiene medición) y cuyo resultado sea «idéntico» o «N diferencias, todas explicadas».
// FOS_CAMBIADOS y FOS_REGISTRO (coma / ruta) reemplazan lo que se lee de git y el registro: los usa la prueba.
function medicionAntesDelCommit(cmd) {
  if (!GIT_SUB('commit').test(cmd) || cmd.includes('[sin-medicion]')) return;
  let raiz;
  try { raiz = git(['rev-parse', '--show-toplevel']).trim(); } catch { return; }
  const tabla = join(raiz, 'tools', 'pipeline-tools.json');
  if (!existsSync(tabla)) return; // otro repo
  const { archivos: cambiados, staged } = archivosDelCommit(cmd);
  const nombresCambiados = [...new Set(cambiados.filter(Boolean))].map((f) => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter((n) => n && existsSync(join(raiz, 'tools', n)));
  if (!nombresCambiados.length) return;
  // una tool de la tabla o un módulo que ellas usan (tools/clasificar-tools.mjs); una tool sin clasificar tampoco se commitea sin decir qué es
  const C = clasificar(raiz);
  const sinClasificar = nombresCambiados.filter((n) => C.clase(n) === 'sin_clasificar');
  if (sinClasificar.length) decidir('deny', `Commit frenado: ${sinClasificar.join(', ')} no ${sinClasificar.length > 1 ? 'están clasificadas' : 'está clasificada'} respecto del pipeline. Sumá cada una a «tools» (con medidores y alcance) o a «no_pipeline» (con el motivo) en tools/pipeline-tools.json; node tools/clasificar-tools.mjs <archivo> dice en qué clase está.`);
  const tocadas = nombresCambiados.filter((n) => ['tools', 'modulo'].includes(C.clase(n)));
  if (!tocadas.length) return;
  const registro = process.env.FOS_REGISTRO || join(raiz, 'Admin', 'registros', 'mediciones-pipeline.jsonl');
  const lineas = existsSync(registro) ? readFileSync(registro, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const BUENO = /^(idéntico|\d+ diferencias, todas explicadas)$/;
  const sinMedir = tocadas.filter((n) => {
    // lo staged se compara por el blob del índice (lo que entra al commit), no por lo que haya hoy en el archivo
    const huella = git(staged ? ['rev-parse', `:tools/${n}`] : ['hash-object', `tools/${n}`]).trim();
    return !lineas.some((l) => BUENO.test(l.resultado || '') && l.tools?.[n]?.despues === huella);
  });
  if (!sinMedir.length) return veredictoAntesDelCommit(cmd, raiz, tocadas, staged);
  decidir('deny', `Commit frenado: ${sinMedir.join(', ')} ${sinMedir.length > 1 ? 'son tools del pipeline y no tienen' : 'es una tool del pipeline y no tiene'} una medición con su versión actual en Admin/registros/mediciones-pipeline.jsonl `
    + '(una tool editada después de medir no cuenta). Ningún cambio al pipeline se commitea sin medir antes y después (CLAUDE.md).\n'
    + 'Todo lo que pide este commit, por archivo: node tools/fos.mjs que-pide\n'
    + 'Corré: node tools/medir-pipeline.mjs   (en segundo plano; elige medidor y lote por tools/pipeline-tools.json; si hay diferencias esperadas: --explicacion "cuáles y por qué").\n'
    + 'Si es un caso de emergencia, con el ok de Guido agregá [sin-medicion] al mensaje del commit.');
}

// veredicto-antes-del-commit (TODO 384): un cambio de código a una tool del pipeline ya medida necesita, en Admin/registros/auditoria-proceso.jsonl, una línea
// GENERAL de `node tools/patron.mjs --escribir` con la huella de esa tool. No la necesita un cambio de solo comentarios ni una mudanza (`patron.mjs --exento`).
// FOS_EXENTO (si/no) y FOS_VEREDICTOS (ruta) reemplazan lo que se calcula y el registro: los usa la prueba.
function veredictoAntesDelCommit(cmd, raiz, tocadas, staged) {
  if (cmd.includes('[sin-veredicto]')) return;
  let exento = process.env.FOS_EXENTO;
  if (!exento) {
    try { exento = execFileSync('node', ['tools/patron.mjs', '--exento', tocadas.join(','), ...(staged ? ['--indice'] : [])], { cwd: raiz, encoding: 'utf8' }).trim(); }
    catch { return; } // sin la tool no hay con qué juzgar: no frena
  }
  if (exento === 'si') return;
  const registro = process.env.FOS_VEREDICTOS || join(raiz, 'Admin', 'registros', 'auditoria-proceso.jsonl');
  const lineas = existsSync(registro) ? readFileSync(registro, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  // una tool que SOLA es solo comentarios o una mudanza (`patron.mjs --exento <tool>`) no necesita su línea aunque otras del mismo commit sí
  const exentaSola = (n) => { if (process.env.FOS_EXENTO) return false; try { return execFileSync('node', ['tools/patron.mjs', '--exento', n, ...(staged ? ['--indice'] : [])], { cwd: raiz, encoding: 'utf8' }).trim() === 'si'; } catch { return false; } };
  const sinVeredicto = tocadas.filter((n) => {
    const huella = git(staged ? ['rev-parse', `:tools/${n}`] : ['hash-object', `tools/${n}`]).trim();
    return !lineas.some((l) => /^GENERAL/.test(l.veredicto || '') && l.tools?.[n] === huella) && !exentaSola(n);
  });
  if (!sinVeredicto.length) return;
  decidir('deny', `Commit frenado: el cambio de código a ${sinVeredicto.join(', ')} no tiene la línea de veredicto «general» en Admin/registros/auditoria-proceso.jsonl con su versión actual.\n`
    + 'Todo lo que pide este commit, por archivo: node tools/fos.mjs que-pide\n'
    + 'Corré: node tools/patron.mjs --cambio "<qué hace>" --patron "<regex sobre los .md>" --tools <todas las tools del commit, separadas por coma> --escribir   (una línea cubre solo las tools que lista; cuenta documentos y clubes, mira que el código no nombre nada y toma la medición). '
    + 'Si da PARCHE o RECHAZADA, el cambio no va al código: va como ajuste (la tool imprime el comando).\n'
    + 'Si el cambio no lee documentos (infraestructura de la tool: cuándo escribe, cómo mide, cómo cierra), en vez de --patron: --sin-documentos "por qué no lee documentos" (sigue exigiendo sin nombres y medición buena).\n'
    + 'Si es una mudanza o solo comentarios y la tool no lo vio así, o es un caso de emergencia, con el ok de Guido agregá [sin-veredicto] al mensaje del commit.');
}

// medicion-en-curso (TODO 394): mientras corre `medir-pipeline` (deja Admin/mediciones/pipeline/_corriendo con su pid) revierte lo trackeado que cambie, así que un
// Edit/Write de un archivo trackeado de la carpeta se rechaza hasta que termine. Un pid muerto (la medición cayó) no cuenta; lo que está afuera del repo
// (el scratchpad) o sin trackear tampoco. FOS_PID_MEDICION reemplaza el pid del candado: lo usa la prueba.
function edicionMientrasSeMide() {
  if (!EDITA.includes(herramienta)) return;
  const ruta = rutaEditada();
  if (!ruta) return;
  let pid;
  try { pid = Number(process.env.FOS_PID_MEDICION) || JSON.parse(readFileSync(join(cwd, 'Admin', 'mediciones', 'pipeline', '_corriendo'), 'utf8')).pid; } catch { return; }
  if (!process.env.FOS_PID_MEDICION && !existsSync(join(cwd, 'Admin', 'mediciones', 'pipeline', '_corriendo'))) return;
  try { process.kill(pid, 0); } catch { return; }
  const rel = relative(cwd, resolve(cwd, ruta));
  if (rel.startsWith('..')) return;
  try { git(['ls-files', '--error-unmatch', '--', rel]); } catch { return; }
  decidir('deny', `Hay una medición corriendo (node tools/medir-pipeline.mjs, pid ${pid}): revierte lo trackeado que cambie mientras mide, y ${rel} está trackeado. Esperá la notificación de que terminó y editá después. (Si cayó y quedó el candado, borrá Admin/mediciones/pipeline/_corriendo.)`);
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
  if (porBash) decidir('deny', 'Editá la skill con Edit o Write (con el texto ya en Admin/propuestas/): en varias sesiones un Bash no escribe en .claude/skills/.');
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

// escritura-en-tmp-suelto (deny): un Write/Edit a /tmp o /private/tmp que NO sea la carpeta scratchpad de la sesión (/private/tmp/claude-<uid>/<proyecto>/<sesión>/scratchpad/)
// deja un archivo perdido fuera del proyecto (pasó: un .mjs de prueba en /private/tmp/claude-501/<proyecto>/ sin la carpeta de sesión). El Bash ya tiene la misma regla.
function escrituraEnTmpSuelto() {
  if (!EDITA.includes(herramienta)) return;
  const ruta = rutaEditada();
  if (!/^\/(?:private\/)?tmp(?:\/|$)/.test(ruta)) return;
  if (/^\/private\/tmp\/claude-\d+\/.+\/scratchpad\//.test(ruta)) return;
  decidir('deny', `Escribir en ${ruta} deja un archivo suelto fuera del proyecto. Usá la carpeta scratchpad de esta sesión (/private/tmp/claude-<uid>/<proyecto>/<sesión>/scratchpad/, la que da el sistema) o una ruta del proyecto.`);
}

// lote-existente (deny): un Write sobre un Admin/lotes/lote-NN.txt que ya existe lo pisa (pasó con el lote del 413). El número libre lo da `fos lote-nuevo`.
function loteExistente() {
  if (herramienta !== 'Write') return;
  const ruta = rutaEditada();
  if (!/\/Admin\/lotes\/lote-[^/]+\.txt$/.test(ruta) || !existsSync(ruta)) return;
  decidir('deny', `${ruta} ya existe: escribirlo lo pisa. Para una lista nueva: node tools/fos.mjs lote-nuevo "<motivo>" (crea el próximo número libre); para sumarle rutas a esta, Edit.`);
}

// regla-de-pais-en-doc-general (deny): un Edit/Write que AGREGA a Admin/CONVENCIONES-DATOS.md un `## REGLA:`, o a ESTADO.md o PIPELINE.md una sección (`##` o `###`), cuyo título nombra un país (fuera del paréntesis del caso) va a Admin/paises/<iso>.md.
// La cuenta es la de tools/reglas-pais.mjs (nuevosTitulosConPais), la misma del aviso `regla-de-pais-en-doc-general` de audit.js: un título que ya está en el archivo no cuenta, y uno general se acepta con su motivo en tools/titulos-pais-aceptados.json.
async function reglaDePaisEnDocGeneral() {
  if (!EDITA.includes(herramienta)) return;
  const { nuevosTitulosConPais, PAISES } = await import('../reglas-pais.mjs');
  for (const x of nuevosTitulosConPais(rutaEditada(), params.new_string || params.content || '')) {
    decidir('deny', `Este título de ${x.doc} nombra a ${PAISES[x.iso][0]}: lo que solo vale para un país va en Admin/paises/${x.iso}.md (el mismo formato; si el archivo no existe, se crea con la marca de leer de los otros). ${x.doc.split('/').pop()} es solo de lo general; si el título es general (un formato, un deporte), agregalo con su motivo a tools/titulos-pais-aceptados.json.`);
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
  decidir('deny', 'Editá con Edit o Write. Para el mismo texto en muchos archivos, o una lista de cambios exactos por línea: node tools/fos.mjs reemplazar (ensayo por defecto; --de/--a, --regex, --solo-comentarios, --lista cambios.json, --escribir).');
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
    decidir('deny', 'Nada de `cd … &&` ni `cd …;`: el comando con cd no se puede chequear y pide permiso. Escribí la ruta completa en el comando; git y node se corren directo desde la carpeta de la sesión. Para un script de una sola vez: Write en el scratchpad y `node <ruta completa>` (nada de `node -e`).');
  }
  if (/\$\(|\$\{|\$[A-Za-z_]/.test(sinTextos)) {
    decidir('deny', 'Nada de `$(…)`, `${…}` ni `$VARIABLE` en un comando: una ruta que se resuelve al correr pide permiso cada vez. Escribí la ruta o el valor entero; para encadenar dos pasos, un pipe o dos llamadas. (Pasa el heredoc de `git commit -m "$(cat <<\'EOF\' … EOF)"`.)');
  }
}

// `node -e`/`-p` y `python -c`: el código va suelto en la línea de comandos y nadie lo puede revisar antes de correr; un script va con Write en el scratchpad.
// Corre DESPUÉS de las reglas que protegen skills y PDFs (un python que escribe en una skill recibe su mensaje, «Editá con Edit»). Lo que va entre comillas dobles se
// ignora: `grep "node -e"` pasa.
function codigoSueltoEnLinea(cmd) {
  const sinComillas = cmd.replace(/'[^']*'/g, "''").replace(/"(?:[^"\\]|\\.)*"/g, '""');
  if (/(^|[\s;&|(])(node|python3?)\s+(-e|-p|--eval|--print|-c)(\s|$)/.test(sinComillas)) {
    decidir('deny', 'Nada de `node -e`, `node -p` ni `python -c`: el código suelto en la línea de comandos no se puede revisar antes de correr. Escribí el script con Write en la carpeta de scratchpad de la sesión y corré `node <ruta completa>` (o `python3 -I <ruta completa>`).');
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
if (herramienta === 'Bash') { comandosSimples(cmd); noImportarTools(cmd); if (VARIAS) mergeEnWorktree(cmd); }
if (VARIAS) planEnWorktree();
if (herramienta === 'Bash' && VARIAS) rsyncSinNoLinks(cmd);
subagenteConReglaDeComandos();
if (VARIAS) { archivarConOk(); modeloOpusConOk(); worktreeSinPermissionMode(); }
memoriaNoEsRegla();
await reglaDePaisEnDocGeneral();
escrituraEnTmpSuelto();
loteExistente();
if (VARIAS) skillsConOk(cmd);
if (herramienta === 'Bash') comandoQueEdita(cmd);
pushConOk(cmd);
if (VARIAS) docsDeLaPrincipal(cmd);
pdfsConOk(cmd);
if (herramienta === 'Bash') codigoSueltoEnLinea(cmd);
if (herramienta === 'Bash') { medicionAntesDelCommit(cmd); auditAntesDelCommit(cmd); }
edicionMientrasSeMide();
