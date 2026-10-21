#!/usr/bin/env node
// tools/hooks/probar-pre-tool.mjs — prueba de tools/hooks/pre-tool.mjs con entradas simuladas. No escribe nada ni llama a nada.
// USO: node tools/hooks/probar-pre-tool.mjs    (sale con código 1 si algún caso no da lo esperado)
// Cada caso: [nombre, entrada del hook, decisión esperada ('pasa', 'ask' o 'deny'), texto que tiene que contener el motivo (opcional)].
// Los casos de skills usan `Admin/propuestas/257-skills.md` commiteado en HEAD (el texto propuesto del primer caso 'ask').
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const raiz = resolve(import.meta.dirname, '..', '..');
const skill = `${raiz}/.claude/skills/club-sourcing/SKILL.md`;
const bash = (command) => ({ tool_name: 'Bash', tool_input: { command } });
const casos = [
  ['skill: texto que nadie propuso', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: 'Un texto que nadie propuso nunca en ningún archivo de propuestas.' } }, 'deny', 'no está en ningún archivo'],
  ['skill: texto propuesto y commiteado', { tool_name: 'Edit', tool_input: { file_path: skill, old_string: 'x', new_string: '**Un club extinto o refundado vale** si sus balances siguen publicados: se bajan y se documentan como los de cualquier otro.' } }, 'ask', 'Admin/propuestas/'],
  ['skill: sed -i a skills', bash("sed -i 's/a/b/' .claude/skills/club-sourcing/SKILL.md"), 'deny', 'Bash no escribe'],
  ['skill: redirección a skills', bash("cat > .claude/skills/a/SKILL.md <<'EOF'\nhola\nEOF"), 'deny', 'Bash no escribe'],
  ['skill: python que abre skills', bash("python3 -c \"open('.claude/skills/a/SKILL.md','w').write('x')\""), 'deny', 'Bash no escribe'],
  ['skill: pathlib y shutil a skills', bash("python3 -c \"from pathlib import Path; Path('.claude/skills/a/SKILL.md').write_text('x')\""), 'deny', 'Bash no escribe'],
  ['skill: shutil.copy a skills', bash("python3 -c \"import shutil; shutil.copy('a.md', '.claude/skills/a/SKILL.md')\""), 'deny', 'Bash no escribe'],
  ['skill: tee y cp a skills', bash('echo x | tee .claude/skills/a/SKILL.md'), 'deny', 'Bash no escribe'],
  ['skill: git checkout pasa', bash('git checkout main -- .claude/skills/club-sourcing/SKILL.md'), 'pasa'],
  // Falsos positivos: el texto que se escribe nombra la ruta, pero el destino es otro archivo.
  ['FP: python escribe otro archivo y nombra skills', bash("python3 - <<'EOF'\nopen('Admin/x.md','w').write('ver .claude/skills/ y más')\nEOF"), 'ask', 'sed -i'],
  ['FP: echo a otro archivo que nombra skills', bash('echo ".claude/skills/ nombrada" > Admin/x.md'), 'pasa'],
  ['FP: heredoc a otro archivo con "> .claude/skills/" en el texto', bash("cat > Admin/x.md <<'EOF'\ntexto > .claude/skills/a/SKILL.md\nEOF"), 'pasa'],
  ['archivar una sesión', { tool_name: 'mcp__ccd_session_mgmt__archive_session', tool_input: { session_id: 'local_x' } }, 'ask', 'Archivar'],
  ['Opus en una sesión nueva', { tool_name: 'mcp__ccd_session__start_session', tool_input: { model: 'claude-opus-5-5' } }, 'ask', 'Opus'],
  ['Sonnet en una sesión nueva', { tool_name: 'mcp__ccd_session__start_session', tool_input: { model: 'claude-sonnet-5-5' } }, 'pasa'],
  ['permission_mode distinto de auto', { tool_name: 'mcp__ccd_session__start_session', tool_input: { permission_mode: 'acceptEdits' } }, 'ask', 'permission_mode'],
  ['memoria de regla (feedback)', { tool_name: 'Write', tool_input: { file_path: '/Users/x/.claude/projects/p/memory/a.md', content: '---\nname: a\nmetadata:\n  type: feedback\n---\nx' } }, 'ask', 'memoria'],
  ['memoria de trato (user)', { tool_name: 'Write', tool_input: { file_path: '/Users/x/.claude/projects/p/memory/b.md', content: '---\nname: b\nmetadata:\n  type: user\n---\nx' } }, 'pasa'],
  ['sed -i fuera de skills', bash("sed -i 's/a/b/' Admin/x.md"), 'ask', 'Edit o Write'],
  ['comando normal', bash('git status'), 'pasa'],
];

let mal = 0;
for (const [nombre, entrada, esperado, texto] of casos) {
  let salida = '';
  try { salida = execFileSync('node', [`${raiz}/tools/hooks/pre-tool.mjs`], { input: JSON.stringify({ ...entrada, cwd: raiz }), encoding: 'utf8' }); }
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
