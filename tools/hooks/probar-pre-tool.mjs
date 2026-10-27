#!/usr/bin/env node
// tools/hooks/probar-pre-tool.mjs — prueba de tools/hooks/pre-tool.mjs con entradas simuladas. No escribe nada ni llama a nada.
// USO: node tools/hooks/probar-pre-tool.mjs    (sale con código 1 si algún caso no da lo esperado)
// Cada caso: [nombre, entrada del hook, decisión esperada ('pasa', 'ask' o 'deny'), texto que tiene que contener el motivo (opcional), modo (opcional: 'varias-sesiones'; si no, 'una-sesion')].
// Los casos de skills usan `Admin/propuestas/257-skills.md` commiteado en HEAD (el texto propuesto del primer caso 'ask').
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..', '..');
const skill = `${raiz}/.claude/skills/club-sourcing/SKILL.md`;
const bash = (command) => ({ tool_name: 'Bash', tool_input: { command } });

// medicion-antes-del-commit (TODO 371): el registro de cada caso es un archivo de prueba (gitignoreado) y los cambios del commit se simulan con
// FOS_CAMBIADOS; la huella es la real de la tool, así que la prueba falla si la versión de la tool no es la que el caso espera.
const SIN_CLASIFICAR = 'zz-prueba-hook-sin-clasificar.mjs'; // se crea para la prueba y se borra al final
function casosMedicion() {
  const dir = `${raiz}/Admin/mediciones/pipeline`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${raiz}/tools/${SIN_CLASIFICAR}`, '// archivo de prueba del hook\n');
  const huella = (n) => execFileSync('git', ['hash-object', `tools/${n}`], { cwd: raiz, encoding: 'utf8' }).trim();
  const registro = (nombre, lineas) => { const p = `${dir}/_prueba-hook-${nombre}.jsonl`; writeFileSync(p, lineas.map((l) => JSON.stringify(l)).join('\n') + (lineas.length ? '\n' : '')); return p; };
  const linea = (resultado, despues) => ({ fecha: '2026-10-22', tools: { 'cargar.mjs': { antes: 'x', despues } }, lote: { nivel: 'completo' }, resultado });
  const commit = (msg) => bash(`git commit -m "${msg}"`);
  const env = (reg, cambiados = 'tools/cargar.mjs') => ({ FOS_REGISTRO: reg, FOS_CAMBIADOS: cambiados, FOS_EXENTO: 'si' });
  const h = huella('cargar.mjs');
  return [
    ['medición: tool del pipeline sin registro frena y dice el comando', commit('x [sin-audit]'), 'deny', 'node tools/medir-pipeline.mjs', 'una-sesion', env(registro('vacio', []))],
    ['medición: con su línea idéntica pasa', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', env(registro('ok', [linea('idéntico', h)]))],
    ['medición: diferencias explicadas pasa', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', env(registro('explicada', [linea('3 diferencias, todas explicadas', h)]))],
    ['medición: diferencias sin explicar frena', commit('x [sin-audit]'), 'deny', 'cargar.mjs', 'una-sesion', env(registro('sin', [linea('3 diferencias sin explicar', h)]))],
    ['medición: una tool editada después de medir frena', commit('x [sin-audit]'), 'deny', 'editada después de medir', 'una-sesion', env(registro('vieja', [linea('idéntico', 'a'.repeat(40))]))],
    ['medición: [sin-medicion] lo saltea', commit('x [sin-audit] [sin-medicion]'), 'pasa', undefined, 'una-sesion', env(registro('vacio2', []))],
    ['medición: una tool que no es del pipeline pasa', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', env(registro('vacio3', []), 'tools/fos.mjs,Admin/TODO.md')],
    ['medición: un módulo que usa una tool del pipeline sin medición frena', commit('x [sin-audit]'), 'deny', 'vocabulario.mjs', 'una-sesion', env(registro('modulo', []), 'tools/vocabulario.mjs')],
    ['medición: una tool nueva sin clasificar frena y dice cómo clasificarla', commit('x [sin-audit]'), 'deny', 'no_pipeline', 'una-sesion', env(registro('nueva', []), `tools/${SIN_CLASIFICAR}`)],
    ['medición: una tool de no_pipeline pasa', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', env(registro('afuera', []), 'tools/mapa-codigo.mjs')],
    // TODO 384: un cambio de código a una tool del pipeline ya medida necesita la línea GENERAL de patron.mjs con su huella
    ['veredicto: código cambiado sin línea de veredicto frena y dice el comando', commit('x [sin-audit]'), 'deny', 'node tools/patron.mjs', 'una-sesion', { ...env(registro('v1', [linea('idéntico', h)])), FOS_EXENTO: 'no', FOS_VEREDICTOS: registro('v1v', []) }],
    ['veredicto: con su línea GENERAL pasa', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', { ...env(registro('v2', [linea('idéntico', h)])), FOS_EXENTO: 'no', FOS_VEREDICTOS: registro('v2v', [{ veredicto: 'GENERAL: SE COMMITEA', tools: { 'cargar.mjs': h } }]) }],
    ['veredicto: una línea RECHAZADA no alcanza', commit('x [sin-audit]'), 'deny', 'cargar.mjs', 'una-sesion', { ...env(registro('v3', [linea('idéntico', h)])), FOS_EXENTO: 'no', FOS_VEREDICTOS: registro('v3v', [{ veredicto: 'RECHAZADA', tools: { 'cargar.mjs': h } }]) }],
    ['veredicto: una línea de otra versión de la tool no alcanza', commit('x [sin-audit]'), 'deny', 'cargar.mjs', 'una-sesion', { ...env(registro('v4', [linea('idéntico', h)])), FOS_EXENTO: 'no', FOS_VEREDICTOS: registro('v4v', [{ veredicto: 'GENERAL: SE COMMITEA', tools: { 'cargar.mjs': 'b'.repeat(40) } }]) }],
    ['veredicto: solo comentarios o mudanza (exento) pasa sin línea', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', { ...env(registro('v5', [linea('idéntico', h)])), FOS_EXENTO: 'si', FOS_VEREDICTOS: registro('v5v', []) }],
    ['veredicto: [sin-veredicto] lo saltea', commit('x [sin-audit] [sin-veredicto]'), 'pasa', undefined, 'una-sesion', { ...env(registro('v6', [linea('idéntico', h)])), FOS_EXENTO: 'no', FOS_VEREDICTOS: registro('v6v', []) }],
    // TODO 385: el hook mira lo staged (aunque el árbol de trabajo tenga una tool sin medir) y dice qué hacer cuando la auditoría frena
    ['staged: un commit de datos pasa aunque haya una tool sin medir sin stagear', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', { FOS_REGISTRO: registro('staged1', []), FOS_STAGED: 'data/gb/x.json' }],
    ['staged: una tool staged sin medición frena', commit('x [sin-audit]'), 'deny', 'cargar.mjs', 'una-sesion', { FOS_REGISTRO: registro('staged2', []), FOS_STAGED: 'tools/cargar.mjs' }],
    ['staged: la huella es la del blob del índice (HEAD) y pasa con su línea', commit('x [sin-audit]'), 'pasa', undefined, 'una-sesion', { FOS_REGISTRO: registro('staged3', [linea('idéntico', execFileSync('git', ['rev-parse', ':tools/cargar.mjs'], { cwd: raiz, encoding: 'utf8' }).trim())]), FOS_STAGED: 'tools/cargar.mjs' }],
    ['staged: git add de una ruta de datos + commit pasa aunque haya una tool sin medir sin agregar', bash('git add data/gb/x.json && git commit -m "x [sin-audit]"'), 'pasa', undefined, 'una-sesion', { FOS_REGISTRO: registro('staged4', []), FOS_STAGED: '' }],
    ['staged: git add -A + commit mira todo el árbol (usa FOS_CAMBIADOS en la prueba)', bash('git add -A && git commit -m "x [sin-audit]"'), 'deny', 'cargar.mjs', 'una-sesion', { FOS_REGISTRO: registro('staged5', []), FOS_CAMBIADOS: 'tools/cargar.mjs' }],
    ['staged: git add -A <ruta de registros> + commit pasa aunque haya una tool sin medir en el árbol', bash('git add -A Admin/registros && git commit -m "x [sin-audit]"'), 'pasa', undefined, 'una-sesion', { FOS_REGISTRO: registro('staged6', []), FOS_STAGED: '', FOS_ARBOL: 'Admin/registros/a.jsonl,tools/cargar.mjs' }],
    ['staged: git add -A -- . con exclusión de tools pasa aunque haya una tool sin medir', bash('git add -A -- . \':!tools\' && git commit -m "x [sin-audit]"'), 'pasa', undefined, 'una-sesion', { FOS_REGISTRO: registro('staged7', []), FOS_STAGED: '', FOS_ARBOL: 'data/gb/x.json,tools/cargar.mjs' }],
    ['staged: git add -A sin rutas mira todo el árbol y frena por la tool sin medir', bash('git add -A && git commit -m "x [sin-audit]"'), 'deny', 'cargar.mjs', 'una-sesion', { FOS_REGISTRO: registro('staged8', []), FOS_STAGED: '', FOS_ARBOL: 'data/gb/x.json,tools/cargar.mjs' }],
    ['staged: git add . mira todo el árbol y frena por la tool sin medir', bash('git add . && git commit -m "x [sin-audit]"'), 'deny', 'cargar.mjs', 'una-sesion', { FOS_REGISTRO: registro('staged9', []), FOS_STAGED: '', FOS_ARBOL: 'data/gb/x.json,tools/cargar.mjs' }],
    ['staged: git add de la ruta de la tool sin medir frena', bash('git add -A tools && git commit -m "x [sin-audit]"'), 'deny', 'cargar.mjs', 'una-sesion', { FOS_REGISTRO: registro('staged10', []), FOS_STAGED: '', FOS_ARBOL: 'data/gb/x.json,tools/cargar.mjs' }],
    ['auditoría que frena: el hook dice qué hacer con el código', commit('x'), 'deny', 'node tools/publicar.mjs', 'una-sesion', { FOS_REGISTRO: registro('audit1', []), FOS_STAGED: 'data/gb/x.js', FOS_AUDIT_SALIDA: 'P1 1\n  [asset-v-sin-subir] 1\n    · Hay cambios sin commitear en js/ o data/' }],
    ['medición: un comando que no es commit pasa', bash('git status'), 'pasa', undefined, 'una-sesion', env(registro('vacio4', []))],
  ];
}
// texto-de-guido-aparte: el registro de lo visto de cada caso es un archivo de prueba (se borra con los demás `_prueba-hook-`); FOS_CAMBIADOS simula lo que entra al commit
function casosTextoDeGuido() {
  const dir = `${raiz}/Admin/mediciones/pipeline`;
  mkdirSync(dir, { recursive: true });
  const env = (cambiados, visto) => ({ FOS_CAMBIADOS: cambiados, FOS_VISTO: `${dir}/_prueba-hook-visto-${visto}.json` });
  const c = (msg = 'x') => bash(`git commit -m "${msg}"`);
  return [
    ['texto de Guido: un doc de criterio con una tool en el mismo commit frena', c(), 'deny', 'solo', 'una-sesion', env('Admin/CONVENCIONES.md,tools/todo.mjs', 'a')],
    ['texto de Guido: un doc de criterio con datos frena', c(), 'deny', 'solo', 'una-sesion', env('Admin/PIPELINE.md,data/co/x.json', 'b')],
    ['texto de Guido: los briefs de SIIS cuentan', c(), 'deny', 'solo', 'una-sesion', env('Admin/briefs-subagentes-siis.md,tools/todo.mjs', 'c')],
    ['texto de Guido: la regla de un país cuenta', c(), 'deny', 'solo', 'una-sesion', env('Admin/paises/co.md,data/co/x.json', 'd')],
    ['texto de Guido: dos skills en un commit frenan', c(), 'deny', 'una skill por commit', 'una-sesion', env('.claude/skills/club-sourcing/SKILL.md,.claude/skills/club-data-mapping/SKILL.md', 'e')],
    ['texto de Guido: una skill con un doc de criterio frena', c(), 'deny', 'una skill por commit', 'una-sesion', env('.claude/skills/club-sourcing/SKILL.md,Admin/PANTALLA.md', 'f')],
    ['texto de Guido: solo, el primer intento pide el show_pane', c(), 'deny', 'show_pane', 'una-sesion', env('Admin/CONVENCIONES.md,Admin/CHANGELOG.md,Admin/TODO.md', 'g')],
    ['texto de Guido: el mismo commit con el mismo texto pasa', c(), 'pasa', undefined, 'una-sesion', env('Admin/CONVENCIONES.md,Admin/CHANGELOG.md,Admin/TODO.md', 'g')],
    ['texto de Guido: una regla de país sola también pide el show_pane', c(), 'deny', 'show_pane', 'una-sesion', env('Admin/paises/co.md', 'h')],
    ['texto de Guido: [texto-junto] lo saltea', c('x [texto-junto] [sin-audit]'), 'pasa', undefined, 'una-sesion', env('Admin/CONVENCIONES.md,tools/mapa-codigo.mjs', 'i')],
    ['texto de Guido: CHANGELOG y TODO solos no piden nada', c(), 'pasa', undefined, 'una-sesion', env('Admin/CHANGELOG.md,Admin/TODO.md', 'j')],
  ];
}
const casos = [
  ['skill: texto que nadie propuso', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: 'Un texto que nadie propuso nunca en ningún archivo de propuestas.' } }, 'deny', 'no está en ningún archivo', 'varias-sesiones'],
  ['skill: texto propuesto y commiteado', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: '**Un club extinto o refundado vale** si sus balances siguen publicados: se bajan y se documentan como los de cualquier otro.' } }, 'ask', 'Admin/propuestas/', 'varias-sesiones'],
  ['lote: Write sobre un lote que existe se rechaza y dice fos lote-nuevo', { tool_name: 'Write', tool_input: { file_path: `${raiz}/Admin/lotes/lote-100.txt`, content: 'x' } }, 'deny', 'lote-nuevo'],
  ['lote: Write de un lote que no existe pasa', { tool_name: 'Write', tool_input: { file_path: `${raiz}/Admin/lotes/lote-99999.txt`, content: 'x' } }, 'pasa'],
  ['regla de país: un ## REGLA con un país en el título en el general se rechaza y dice el archivo', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/CONVENCIONES-DATOS.md`, old_string: 'x', new_string: '## REGLA: en un balance turco, el rubro va a otra parte\n\ntexto' } }, 'deny', 'Admin/paises/tr.md'],
  ['regla de país: el país solo en el paréntesis del caso pasa', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/CONVENCIONES-DATOS.md`, old_string: 'x', new_string: '## REGLA: una línea junta se parte con las notas (votación 3 a 0, Silkeborg y Viborg 2025)\n\ntexto' } }, 'pasa'],
  ['sección de país: un ## con un país en PIPELINE.md se rechaza y dice el archivo', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/PIPELINE.md`, old_string: 'x', new_string: '## Bélgica: otro camino\n\ntexto' } }, 'deny', 'Admin/paises/be.md'],
  ['sección de país: un ### con un país en ESTADO.md se rechaza', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/ESTADO.md`, old_string: 'x', new_string: '### Lo de Colombia\n\ntexto' } }, 'deny', 'Admin/paises/co.md'],
  ['sección de país: un título general aceptado con su motivo pasa', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/PIPELINE.md`, old_string: 'x', new_string: '## Dinamarca: los informes en XHTML (ESEF / iXBRL)\n\ntexto' } }, 'pasa'],
  ['sección de país: un título sin país pasa', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/PIPELINE.md`, old_string: 'x', new_string: '## Un deporte nuevo\n\ntexto' } }, 'pasa'],
  ['sección de país: el mismo título en otro documento (PANTALLA.md) no se mira', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/PANTALLA.md`, old_string: 'x', new_string: '## Bélgica: otro camino\n\ntexto' } }, 'pasa'],
  ['regla de país: en Admin/paises pasa',{ tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/paises/tr.md`, old_string: 'x', new_string: '## REGLA: en un balance turco, el rubro va a otra parte\n\ntexto' } }, 'pasa'],
  ['lote: Edit de un lote que existe pasa', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/lotes/lote-100.txt`, old_string: 'a', new_string: 'b' } }, 'pasa'],
  ['tmp: Write a /private/tmp suelto', { tool_name: 'Write', tool_input: { file_path: '/private/tmp/claude-501/-Users-x-proyecto/prueba.mjs', content: 'x' } }, 'deny', 'archivo suelto'],
  ['tmp: Write a /tmp', { tool_name: 'Write', tool_input: { file_path: '/tmp/prueba.txt', content: 'x' } }, 'deny', 'archivo suelto'],
  ['tmp: Write al scratchpad de la sesión', { tool_name: 'Write', tool_input: { file_path: '/private/tmp/claude-501/-Users-x-proyecto/0469c398-7116-46dd/scratchpad/prueba.mjs', content: 'x' } }, 'pasa'],
  ['tmp: Edit de un archivo del proyecto', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/TODO.md`, old_string: 'zzzz-no-existe', new_string: 'y' } }, 'pasa'],
  ['skill: sed -i a skills', bash("sed -i 's/a/b/' .claude/skills/club-sourcing/SKILL.md"), 'deny', 'Editá con Edit'],
  ['skill: redirección a skills', bash("cat > .claude/skills/a/SKILL.md <<'EOF'\nhola\nEOF"), 'pasa'],
  ['skill: python que abre skills', bash("python3 -c \"open('.claude/skills/a/SKILL.md','w').write('x')\""), 'deny', 'Editá con Edit'],
  ['skill: pathlib y shutil a skills', bash("python3 -c \"from pathlib import Path; Path('.claude/skills/a/SKILL.md').write_text('x')\""), 'deny', 'Editá con Edit'],
  ['skill: shutil.copy a skills', bash("python3 -c \"import shutil; shutil.copy('a.md', '.claude/skills/a/SKILL.md')\""), 'deny', 'Editá con Edit'],
  ['skill: tee y cp a skills', bash('echo x | tee .claude/skills/a/SKILL.md'), 'pasa'],
  ['skill: git checkout pasa', bash('git checkout main -- .claude/skills/club-sourcing/SKILL.md'), 'pasa'],
  // Falsos positivos: el texto que se escribe nombra la ruta, pero el destino es otro archivo.
  ['FP: python escribe otro archivo y nombra skills', bash("python3 - <<'EOF'\nopen('Admin/x.md','w').write('ver .claude/skills/ y más')\nEOF"), 'deny', 'Editá con Edit'],
  ['FP: echo a otro archivo que nombra skills', bash('echo ".claude/skills/ nombrada" > Admin/x.md'), 'pasa'],
  ['FP: heredoc a otro archivo con "> .claude/skills/" en el texto', bash("cat > Admin/x.md <<'EOF'\ntexto > .claude/skills/a/SKILL.md\nEOF"), 'pasa'],
  ['Clubes: mv a un destino que no existe pasa', bash('mv "Clubes/X/a.pdf" "Clubes/X/a-pagina-html-no-existe.html" && file Clubes/X/a*'), 'pasa'],
  ['Clubes: mv que pisa un archivo existente frena', bash(`mv "Clubes/X/a.pdf" "${raiz}/tools/audit.js"`), 'deny', 'no borra ni pisa'],
  ['Clubes: find -xtype l -delete frena y manda a preparar', bash('find Clubes -xtype l -delete'), 'deny', 'preparar'],
  ['Clubes: rm en un Clubes/ del scratchpad pasa', bash('mkdir -p "/private/tmp/claude-501/x/scratchpad/wt/Clubes/Z" && rm -f "/private/tmp/claude-501/x/scratchpad/wt/Clubes/Z/a.pdf"'), 'pasa'],
  ['Clubes: rm frena', bash('rm "Clubes/X/a.pdf"'), 'deny', 'no borra ni pisa'],
  ['archivar una sesión', { tool_name: 'mcp__ccd_session_mgmt__archive_session', tool_input: { session_id: 'local_x' } }, 'ask', 'Archivar', 'varias-sesiones'],
  ['Opus en una sesión nueva', { tool_name: 'mcp__ccd_session__start_session', tool_input: { model: 'claude-opus-5-5' } }, 'ask', 'Opus', 'varias-sesiones'],
  ['Sonnet en una sesión nueva', { tool_name: 'mcp__ccd_session__start_session', tool_input: { model: 'claude-sonnet-5-5' } }, 'pasa'],
  ['permission_mode distinto de auto', { tool_name: 'mcp__ccd_session__start_session', tool_input: { permission_mode: 'acceptEdits' } }, 'deny', 'permission_mode', 'varias-sesiones'],
  ['memoria de regla (feedback)', { tool_name: 'Write', tool_input: { file_path: '/Users/x/.claude/projects/p/memory/a.md', content: '---\nname: a\nmetadata:\n  type: feedback\n---\nx' } }, 'ask', 'memoria'],
  ['memoria de trato (user)', { tool_name: 'Write', tool_input: { file_path: '/Users/x/.claude/projects/p/memory/b.md', content: '---\nname: b\nmetadata:\n  type: user\n---\nx' } }, 'pasa'],
  ['sed -i fuera de skills', bash("sed -i 's/a/b/' Admin/x.md"), 'deny', 'Edit o Write'],
  ['python -c que solo lee ya no pasa (448: el código suelto no se revisa)', bash("node tools/audit.js --json | python3 -c \"import json,sys;print(len(json.load(sys.stdin)))\""), 'deny', 'python'],
  ['sed -i en el scratchpad pasa', bash("sed -i '' 's/a/b/' /private/tmp/claude-501/x/scratchpad/a.py"), 'pasa'],
  ['grep que nombra sed -i pasa', bash('grep -n "sed -i" tools/hooks/probar-pre-tool.mjs'), 'pasa'],
  ['comando normal', bash('git status'), 'pasa'],
  ['una sesión: editar una skill con Edit pasa sin propuesta', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: 'Un texto que nadie propuso nunca en ningún archivo de propuestas.' } }, 'pasa'],
  ['una sesión: archivar una sesión pasa', { tool_name: 'mcp__ccd_session_mgmt__archive_session', tool_input: { session_id: 'local_x' } }, 'pasa'],
  ['varias: un Bash que escribe en skills se rechaza', bash("cat > .claude/skills/a/SKILL.md <<'EOF'\nhola\nEOF"), 'deny', 'Editá la skill', 'varias-sesiones'],
  // TODO 394: con una medición corriendo (pid vivo) no se edita un archivo trackeado del repo
  ['medición en curso: editar un archivo trackeado se rechaza', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/TODO.md`, old_string: 'x', new_string: 'y' } }, 'deny', 'medición corriendo', 'una-sesion', { FOS_PID_MEDICION: String(process.pid) }],
  ['medición en curso: un Write de un archivo trackeado también', { tool_name: 'Write', tool_input: { file_path: `${raiz}/tools/todo.mjs`, content: 'x' } }, 'deny', 'medición corriendo', 'una-sesion', { FOS_PID_MEDICION: String(process.pid) }],
  ['medición en curso: el candado de un pid muerto no cuenta', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/TODO.md`, old_string: 'x', new_string: 'y' } }, 'pasa', undefined, 'una-sesion', { FOS_PID_MEDICION: '2147483000' }],
  ['medición en curso: un archivo afuera del repo (scratchpad) pasa', { tool_name: 'Write', tool_input: { file_path: '/private/tmp/claude-501/x/scratchpad/a.json', content: 'x' } }, 'pasa', undefined, 'una-sesion', { FOS_PID_MEDICION: String(process.pid) }],
  ['medición en curso: un archivo sin trackear pasa', { tool_name: 'Write', tool_input: { file_path: `${raiz}/Admin/archivo-que-no-existe-ni-esta-trackeado.txt`, content: 'x' } }, 'pasa', undefined, 'una-sesion', { FOS_PID_MEDICION: String(process.pid) }],
  ['sin medición corriendo se edita lo trackeado', { tool_name: 'Edit', tool_input: { file_path: `${raiz}/Admin/TODO.md`, old_string: 'x', new_string: 'y' } }, 'pasa'],
  // directorio-no-es-la-raiz: un cd anterior dejó la shell en una subcarpeta del proyecto
  ['directorio: una subcarpeta del proyecto frena y dice cómo volver', { ...bash('node tools/todo.mjs'), cwd: `${raiz}/Clubes/Colombia/Tigres FC` }, 'deny', `cd ${raiz}`],
  ['directorio: un cd a la raíz, solo, pasa', { ...bash(`cd ${raiz}`), cwd: `${raiz}/Clubes` }, 'pasa'],
  ['directorio: en la raíz no dice nada', { ...bash('node tools/todo.mjs'), cwd: raiz }, 'pasa'],
  ['directorio: una carpeta fuera del proyecto no se toca', { ...bash('ls'), cwd: '/private/tmp/otra-carpeta' }, 'pasa'],
  // --ayuda en una tool: manda a fos ayuda
  ['node tools/x.mjs --ayuda se rechaza y manda a fos ayuda', bash('node tools/medir-pipeline.mjs --ayuda'), 'deny', 'fos.mjs ayuda medir-pipeline.mjs'],
  ['node tools/x.mjs --help también', bash('node tools/cola.mjs --help'), 'deny', 'fos.mjs ayuda cola.mjs'],
  ['fos ayuda pasa', bash('node tools/fos.mjs ayuda medir-pipeline.mjs'), 'pasa'],
  ['un script que nombra --ayuda en un texto no se rechaza', bash('grep -n "--ayuda" tools/fos.mjs'), 'pasa'],
  // & al final: segundo plano de la shell
  ['un & al final de un comando se rechaza y dice run_in_background', bash('node tools/todo.mjs 463 > /dev/null 2>&1 &'), 'deny', 'run_in_background'],
  ['un & al final de una línea, con otro comando después, también', bash('node tools/todo.mjs 463 &\nsleep 1'), 'deny', 'run_in_background'],
  ['&& entre dos comandos pasa', bash('git status && git log -1'), 'pasa'],
  ['2>&1 no es un & al final', bash('node tools/todo.mjs 463 2>&1 | head -3'), 'pasa'],
  ['un & dentro de comillas no cuenta', bash('grep -n "a &" Admin/TODO.md'), 'pasa'],
  ['node -e se rechaza', bash('node -e "console.log(1)"'), 'deny', 'node -e'],
  ['node -p se rechaza', bash('node -p 1+1'), 'deny', 'node -e'],
  ['python3 -c se rechaza', bash("python3 -c 'print(1)'"), 'deny', 'python'],
  ['una tubería con node -e se rechaza', bash('echo 1 | node -e "process.stdin.pipe(process.stdout)"'), 'deny', 'node -e'],
  ['grep de "node -e" entre comillas pasa', bash('grep -n "node -e" Admin/TODO.md'), 'pasa'],
  ['node con un script pasa', bash('node tools/todo.mjs 442'), 'pasa'],
  ['python3 -I con un script pasa', bash('python3 -I /private/tmp/claude-501/x/scratchpad/a.py'), 'pasa'],
  ...casosMedicion(),
  ...casosTextoDeGuido(),
];

let mal = 0;
for (const [nombre, entrada, esperado, texto, modo, extra] of casos) {
  let salida = '';
  try { salida = execFileSync('node', [`${raiz}/tools/hooks/pre-tool.mjs`], { input: JSON.stringify({ cwd: raiz, ...entrada }), encoding: 'utf8', env: { ...process.env, FOS_MODO: modo || 'una-sesion', FOS_RAIZ: raiz, ...(extra || {}) } }); }
  catch (e) { salida = `ERROR ${e.message}`; }
  const j = salida && !salida.startsWith('ERROR') ? JSON.parse(salida).hookSpecificOutput : null;
  const real = j ? j.permissionDecision : 'pasa';
  const motivo = j ? j.permissionDecisionReason : salida;
  const ok = real === esperado && (!texto || motivo.includes(texto));
  if (!ok) mal++;
  console.log(`${ok ? 'ok ' : 'MAL'} ${nombre}: ${real}${ok ? '' : ` (esperado ${esperado}${texto ? ` con «${texto}»` : ''}): ${motivo.slice(0, 160)}`}`);
}
unlinkSync(`${raiz}/tools/${SIN_CLASIFICAR}`);
for (const f of readdirSync(`${raiz}/Admin/mediciones/pipeline`)) if (f.startsWith('_prueba-hook-')) unlinkSync(`${raiz}/Admin/mediciones/pipeline/${f}`);
console.log(mal ? `\n${mal} caso(s) MAL` : `\n${casos.length} casos, todos ok`);
process.exit(mal ? 1 : 0);
