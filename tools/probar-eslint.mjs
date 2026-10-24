#!/usr/bin/env node
// tools/probar-eslint.mjs — la prueba de las reglas de tools/eslint.config.mjs (punto 440): cada regla de ERRORES, no-undef y los imports sin uso tienen que dar el hallazgo en un
// archivo de juguete que tiene exactamente ese defecto, y un archivo limpio no tiene que dar ninguno. Sin la prueba, una regla mal escrita en la configuración da «0 hallazgos» para siempre.
// Los archivos de juguete se escriben en tools/_prueba-eslint/ (no se versionan; se borran al terminar).
// Uso: node tools/probar-eslint.mjs   (sale con 1 si un caso falla)
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ESLINT = join(ROOT, 'tools', 'node_modules', '.bin', 'eslint');
if (!existsSync(ESLINT)) { console.error('Falta eslint: npm install --prefix tools'); process.exit(2); }
const D = join(ROOT, 'tools', '_prueba-eslint');
rmSync(D, { recursive: true, force: true }); mkdirSync(D, { recursive: true });

// regla -> un archivo con ese defecto y nada más
const CASOS = {
  'no-undef': 'export const a = nombreQueNadieDefinio + 1;\n',
  'no-dupe-keys': 'export const a = { x: 1, x: 2 };\n',
  'no-unreachable': 'export function f() { return 1; console.log(2); }\n',
  'no-redeclare': 'var x = 1; var x = 2; export { x };\n',
  'no-const-assign': 'const x = 1; x = 2; export { x };\n',
  'no-self-assign': 'let x = 1; x = x; export { x };\n',
  'no-dupe-else-if': 'export function f(a) { if (a) { return 1; } else if (a) { return 2; } return 3; }\n',
  'no-case-declarations': 'export function f(a) { switch (a) { case 1: let y = 2; return y; } return 0; }\n',
  'no-fallthrough': 'export function f(a) { switch (a) { case 1: a++; case 2: return a; } return 0; }\n',
  'no-cond-assign': 'export function f(a) { let b; if (b = a) { return b; } return 0; }\n',
  'no-prototype-builtins': 'export const f = (o) => o.hasOwnProperty("x");\n',
  'no-unsafe-finally': 'export function f() { try { return 1; } finally { return 2; } }\n',
  'no-loss-of-precision': 'export const a = 9007199254740993;\n',
  'no-async-promise-executor': 'export const p = new Promise(async (res) => { res(1); });\n',
  'no-unused-labels': 'export function f() { etiqueta: for (;;) { break; } }\n',
};
let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const correr = (archivo, extra = []) => {
  let salida = ''; try { salida = execFileSync(ESLINT, ['-c', 'tools/eslint.config.mjs', '--format', 'json', ...extra, `tools/_prueba-eslint/${archivo}`], { cwd: ROOT, encoding: 'utf8' }); } catch (e) { salida = e.stdout || ''; }
  try { return JSON.parse(salida)[0].messages; } catch { return null; }
};
for (const [regla, codigo] of Object.entries(CASOS)) {
  writeFileSync(join(D, `${regla}.mjs`), codigo);
  const m = correr(`${regla}.mjs`);
  caso(`${regla} encuentra su defecto`, m && m.some((x) => x.ruleId === regla), JSON.stringify(m)?.slice(0, 200));
}
writeFileSync(join(D, 'limpio.mjs'), 'import { join } from "node:path";\nexport const a = join("x", "y");\nexport function f(o) { return Object.prototype.hasOwnProperty.call(o, "x") ? 1 : 2; }\n');
const limpio = correr('limpio.mjs');
caso('un archivo limpio no da ningún hallazgo', limpio && limpio.length === 0, JSON.stringify(limpio)?.slice(0, 200));
writeFileSync(join(D, 'import-sin-uso.mjs'), 'import { join, resolve } from "node:path";\nexport const a = join("x");\n');
const imp = correr('import-sin-uso.mjs');
caso('no-unused-vars ve un import sin uso (el nombre `resolve`) y la configuración lo deja en warn, no en error', imp && imp.some((x) => x.ruleId === 'no-unused-vars' && /resolve/.test(x.message) && x.severity === 1), JSON.stringify(imp)?.slice(0, 200));
rmSync(D, { recursive: true, force: true });
console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
