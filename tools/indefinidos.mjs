#!/usr/bin/env node
// ============================================================================
// tools/indefinidos.mjs — `fos indefinidos`: los nombres que se usan y nadie definió en tools/ (eslint, solo la regla no-undef)
// ============================================================================
// POR QUÉ. Un ensayo no recorre las ramas que escriben (`--escribir`, `--ejecutar`): un nombre sin definir ahí rompe al correr de verdad (punto 401). eslint lo ve sin correr nada.
// Al partir `verificar`, `cargar`, `lote` y `audit` en módulos no apareció ninguno, pero el primer pase sobre todo tools/ encontró uno real: BIG_CHUNK en resolver-inventario.mjs.
// REQUIERE `cd tools && npm install` (eslint y globals son devDependencies de tools/package.json; tools/node_modules no se commitea). Sin eso lo dice y sale con 2 (el aviso de audit.js no aparece).
// USO:
//   node tools/fos.mjs indefinidos                 todo tools/ (mjs, js y hooks); sale con 1 si hay nombres sin definir
//   node tools/fos.mjs indefinidos tools/a.mjs …   solo esos archivos
//   --json                                          lo mismo como JSON [{archivo, linea, nombre}] (lo usa audit.js)
// ============================================================================
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const ESLINT = join(ROOT, 'tools', 'node_modules', '.bin', 'eslint');
const A = process.argv.slice(2);
const json = A.includes('--json');
const ERRORES_N = 14; // las reglas de ERRORES en tools/eslint.config.mjs (además de no-undef)
let archivos = A.filter((a) => !a.startsWith('--'));
if (!existsSync(ESLINT)) { console.error('Falta eslint: cd tools && npm install (es una devDependency de tools/package.json)'); process.exit(2); }
if (!archivos.length) {
  const enTools = readdirSync(join(ROOT, 'tools')).filter((f) => /\.(mjs|js)$/.test(f)).map((f) => `tools/${f}`);
  const hooks = readdirSync(join(ROOT, 'tools', 'hooks')).filter((f) => /\.mjs$/.test(f)).map((f) => `tools/hooks/${f}`);
  archivos = [...enTools, ...hooks];
}
let salida = '';
try { salida = execFileSync(ESLINT, ['-c', 'tools/eslint.config.mjs', '--format', 'json', ...archivos], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 }); }
catch (e) { salida = e.stdout || ''; if (!salida) { console.error(`eslint falló: ${String(e.stderr || e.message).slice(0, 300)}`); process.exit(2); } }
const hallazgos = [];
const importsSinUso = [];
for (const f of JSON.parse(salida)) {
  const archivo = f.filePath.replace(`${ROOT}/`, '');
  const lineasDe = () => { try { return readFileSync(f.filePath, 'utf8').split('\n'); } catch { return []; } };
  let fuente = null;
  for (const m of f.messages) {
    if (m.ruleId === 'no-undef') hallazgos.push({ archivo, linea: m.line, nombre: (m.message.match(/'([^']+)'/) || [])[1] || m.message });
    else if (m.fatal) hallazgos.push({ archivo, linea: m.line, nombre: `(no se pudo leer: ${m.message.slice(0, 80)})` });
    else if (m.ruleId === 'no-unused-vars') { fuente ??= lineasDe(); const l = fuente[m.line - 1] || ''; if (/^\s*import\b/.test(l) || /\bawait import\(/.test(l)) importsSinUso.push({ archivo, linea: m.line, nombre: (m.message.match(/'([^']+)'/) || [])[1] || m.message }); }
    else if (m.ruleId) hallazgos.push({ archivo, linea: m.line, regla: m.ruleId, nombre: m.message.slice(0, 100) });
  }
}
// --json: los errores (nombres sin definir, que llevan `nombre`, y las reglas de ERRORES, que llevan `regla`); --imports: los imports sin uso (información, no un error)
if (A.includes('--imports')) { console.log(json ? JSON.stringify(importsSinUso) : `${importsSinUso.length} import(s) sin uso en ${new Set(importsSinUso.map((h) => h.archivo)).size} archivos`); process.exit(0); }
if (json) console.log(JSON.stringify(hallazgos));
else if (!hallazgos.length) console.log(`Ningún error estático (nombres sin definir ni las ${ERRORES_N} reglas de ERRORES de eslint.config.mjs) en ${archivos.length} archivos.`);
else { console.log(`${hallazgos.length} hallazgo(s):`); for (const h of hallazgos) console.log(`  ${h.archivo}:${h.linea}  ${h.regla ? `[${h.regla}] ` : 'sin definir: '}${h.nombre}`); }
process.exit(hallazgos.length ? 1 : 0);
