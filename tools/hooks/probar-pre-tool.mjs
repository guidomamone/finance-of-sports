#!/usr/bin/env node
// tools/hooks/probar-pre-tool.mjs — prueba de tools/hooks/pre-tool.mjs con entradas simuladas. No escribe nada ni llama a nada.
// USO: node tools/hooks/probar-pre-tool.mjs    (sale con código 1 si algún caso no da lo esperado)
// Cada caso: [nombre, entrada del hook, decisión esperada ('pasa', 'ask' o 'deny'), texto que tiene que contener el motivo (opcional), modo (opcional: 'varias-sesiones'; si no, 'una-sesion')].
// Los casos de skills usan `Admin/propuestas/257-skills.md` commiteado en HEAD (el texto propuesto del primer caso 'ask').
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..', '..');
const skill = `${raiz}/.claude/skills/club-sourcing/SKILL.md`;
const bash = (command) => ({ tool_name: 'Bash', tool_input: { command } });
const casos = [
  ['skill: texto que nadie propuso', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: 'Un texto que nadie propuso nunca en ningún archivo de propuestas.' } }, 'deny', 'no está en ningún archivo', 'varias-sesiones'],
  ['skill: texto propuesto y commiteado', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: '**Un club extinto o refundado vale** si sus balances siguen publicados: se bajan y se documentan como los de cualquier otro.' } }, 'ask', 'Admin/propuestas/', 'varias-sesiones'],
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
  ['python que solo lee pasa', bash("node tools/audit.js --json | python3 -c \"import json,sys;print(len(json.load(sys.stdin)))\""), 'pasa'],
  ['sed -i en el scratchpad pasa', bash("sed -i '' 's/a/b/' /private/tmp/claude-501/x/scratchpad/a.py"), 'pasa'],
  ['grep que nombra sed -i pasa', bash('grep -n "sed -i" tools/hooks/probar-pre-tool.mjs'), 'pasa'],
  ['comando normal', bash('git status'), 'pasa'],
  ['una sesión: editar una skill con Edit pasa sin propuesta', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: 'Un texto que nadie propuso nunca en ningún archivo de propuestas.' } }, 'pasa'],
  ['una sesión: archivar una sesión pasa', { tool_name: 'mcp__ccd_session_mgmt__archive_session', tool_input: { session_id: 'local_x' } }, 'pasa'],
  ['varias: un Bash que escribe en skills se rechaza', bash("cat > .claude/skills/a/SKILL.md <<'EOF'\nhola\nEOF"), 'deny', 'Editá la skill', 'varias-sesiones'],
];

let mal = 0;
for (const [nombre, entrada, esperado, texto, modo] of casos) {
  let salida = '';
  try { salida = execFileSync('node', [`${raiz}/tools/hooks/pre-tool.mjs`], { input: JSON.stringify({ ...entrada, cwd: raiz }), encoding: 'utf8', env: { ...process.env, FOS_MODO: modo || 'una-sesion' } }); }
  catch (e) { salida = `ERROR ${e.message}`; }
  const j = salida && !salida.startsWith('ERROR') ? JSON.parse(salida).hookSpecificOutput : null;
  const real = j ? j.permissionDecision : 'pasa';
  const motivo = j ? j.permissionDecisionReason : salida;
  const ok = real === esperado && (!texto || motivo.includes(texto));
  if (!ok) mal++;
  console.log(`${ok ? 'ok ' : 'MAL'} ${nombre}: ${real}${ok ? '' : ` (esperado ${esperado}${texto ? ` con «${texto}»` : ''}): ${motivo.slice(0, 160)}`}`);
}
console.log(mal ? `\n${mal} caso(s) MAL` : `\n${casos.length} casos, todos ok`);
process.exit(mal ? 1 : 0);
