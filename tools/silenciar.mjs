#!/usr/bin/env node
// ============================================================================
// tools/silenciar.mjs — silencia un hallazgo de audit.js en tools/audit-ignore.json SIN escribir el JSON a mano, y exige lo que la regla del archivo pide:
// que alguien haya MIRADO la fuente. Un hallazgo silenciado no vuelve a aparecer, así que la entrada no se agrega sin verificación ni motivo.
//
// USO: node tools/silenciar.mjs <código> "<pedazo del texto del hallazgo>" --verificado "<qué documento y qué línea se miró>" --motivo "<por qué está bien>"
//   - El hallazgo tiene que disparar hoy (`node tools/audit.js --json`): si no dispara, no hay nada que silenciar.
//   - El pedazo de texto (`match`) tiene que identificar UN solo hallazgo de ese código; si coincide con varios, se pide uno más largo.
//   - La entrada queda como «VERIFICADO (<verificado>, <fecha>). <motivo>» y se anota en Admin/registros/auditoria-proceso.jsonl (como decision.mjs).
//   - Sin red ni IA. Después: `node tools/audit.js --quiet` para ver que bajó.
// ============================================================================
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const IGNORE = resolve(ROOT, 'tools', 'audit-ignore.json');
const REGISTRO = resolve(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl');
const A = process.argv.slice(2);
const uno = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const [codigo, match] = A.filter((a, i) => !a.startsWith('--') && !['--verificado', '--motivo'].includes(A[i - 1]));
const verificado = uno('--verificado'); const motivo = uno('--motivo');
if (!codigo || !match || !verificado || !motivo) {
  console.error('uso: node tools/silenciar.mjs <código> "<pedazo del texto>" --verificado "<documento y línea que se miró>" --motivo "<por qué está bien>"\nSilenciar sin mirar la fuente es el atajo que este proyecto no se puede permitir.');
  process.exit(1);
}
if (verificado.length < 15) { console.error('--verificado tiene que decir qué documento y qué línea se miró (al menos una frase).'); process.exit(1); }

const salida = execFileSync('node', [resolve(ROOT, 'tools', 'audit.js'), '--json'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const hallazgos = JSON.parse(salida).findings.filter((f) => f.code === codigo && f.msg.includes(match));
if (!hallazgos.length) { console.error(`Ningún hallazgo «${codigo}» disparando hoy contiene «${match}»: no hay nada que silenciar (¿ya está silenciado o el texto no coincide?).`); process.exit(1); }
if (hallazgos.length > 1) { console.error(`«${match}» coincide con ${hallazgos.length} hallazgos de ${codigo}; usá un pedazo más largo:\n${hallazgos.slice(0, 8).map((f) => `  ${f.msg.slice(0, 140)}`).join('\n')}`); process.exit(1); }

const fecha = new Date().toISOString().slice(0, 10);
const lista = JSON.parse(readFileSync(IGNORE, 'utf8'));
const entrada = { code: codigo, match, motivo: `VERIFICADO (${verificado}, ${fecha}). ${motivo}` };
lista.push(entrada);
writeFileSync(IGNORE, JSON.stringify(lista, null, 1) + '\n');
appendFileSync(REGISTRO, JSON.stringify({ fecha, sesion: 'unica', codigo_tratado: codigo, cambio: `silenciado en audit-ignore: ${match}`, veredicto: 'silenciado con verificación', motivo }) + '\n');
console.log(`silenciado: ${codigo} · ${match}\n  ${hallazgos[0].msg.slice(0, 160)}`);
