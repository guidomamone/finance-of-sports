#!/usr/bin/env node
// tools/hooks/probar-post-tool.mjs — prueba de tools/hooks/post-tool.mjs con entradas simuladas. No escribe nada.
// USO: node tools/hooks/probar-post-tool.mjs    (sale con código 1 si algún caso no da lo esperado)
// Usa dos commits reales del repo: 321bd3f1b7 (toca skills) y 83bbf62a97 (solo Admin/).
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..', '..');
const bash = (command, tool_name = 'Bash') => ({ tool_name, tool_input: { command }, cwd: raiz });
const casos = [
  ['un commit que toca una skill avisa del diff', bash('git commit -m "x"'), '321bd3f1b7', true],
  ['un commit que no toca skills no dice nada', bash('git commit -m "x"'), '83bbf62a97', false],
  ['un comando que no es commit no dice nada', bash('git status'), '321bd3f1b7', false],
  ['una herramienta que no es Bash no dice nada', bash('git commit -m "x"', 'Edit'), '321bd3f1b7', false],
  ['un commit que toca PANTALLA.md y PIPELINE.md también avisa', bash('git commit -m "x"'), '80867eb0c5', true],
  ['git -C … commit también cuenta', bash('git -C . commit -m "x"'), '321bd3f1b7', true],
];
let mal = 0;
for (const [nombre, entrada, commit, avisa] of casos) {
  let salida = '';
  try { salida = execFileSync('node', [`${raiz}/tools/hooks/post-tool.mjs`], { input: JSON.stringify(entrada), encoding: 'utf8', env: { ...process.env, FOS_COMMIT: commit } }); } catch (e) { salida = `ERROR ${e.message}`; }
  const ok = avisa ? salida.includes('show_pane') && salida.includes(commit.slice(0, 10)) : salida === '';
  if (!ok) mal++;
  console.log(`${ok ? 'ok ' : 'MAL'} ${nombre}`);
}
// aviso suave al editar una tool (412): la primera vez por tool y sesión, y solo si hay historial
const sesion = `prueba-${Date.now()}`;
const edita = (file_path, session_id = sesion, tool_name = 'Edit') => ({ tool_name, session_id, cwd: raiz, tool_input: { file_path } });
const corre = (entrada) => { try { return execFileSync('node', [`${raiz}/tools/hooks/post-tool.mjs`], { input: JSON.stringify(entrada), encoding: 'utf8' }); } catch (e) { return String(e.stdout || ''); } };
const avisos = [
  ['editar una tool con historial avisa la primera vez', edita(`${raiz}/tools/cola.mjs`), (s) => s.includes('changelog historial cola.mjs') && s.includes('no bloquea')],
  ['la segunda vez en la misma sesión no dice nada', edita(`${raiz}/tools/cola.mjs`), (s) => s === ''],
  ['otra sesión vuelve a avisar', edita(`${raiz}/tools/cola.mjs`, `${sesion}-b`), (s) => s.includes('cola.mjs')],
  ['una tool sin historial no dice nada', edita(`${raiz}/tools/zz-sin-historial-alguno.mjs`), (s) => s === ''],
  ['un archivo que no es de tools/ no dice nada', edita(`${raiz}/Admin/TODO.md`), (s) => s === ''],
  ['Write también avisa', edita(`${raiz}/tools/cargar.mjs`, `${sesion}-c`, 'Write'), (s) => s.includes('cargar.mjs')],
];
for (const [nombre, entrada, bien] of avisos) { const ok = bien(corre(entrada)); if (!ok) mal++; console.log(`${ok ? 'ok ' : 'MAL'} ${nombre}`); }
console.log(mal ? `\n${mal} caso(s) MAL` : `\n${casos.length + avisos.length} casos, todos ok`);
process.exit(mal ? 1 : 0);
