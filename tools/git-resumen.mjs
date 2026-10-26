// tools/git-resumen.mjs — `git status --short` sin las páginas generadas: lo que regeneran `publicar.mjs` y el alta de un club (club/, liga/, fuentes/, og/, los `-data.js`) sale como un renglón con su cuenta, el resto uno por archivo.
// POR QUÉ. Después de un alta o de subir ASSET_V, `git status --short` imprime unas 600 líneas de páginas generadas y tapa lo que importa. Solo lee git; no escribe.
// USO: node tools/git-resumen.mjs
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const salida = execFileSync('git', ['status', '--porcelain', '-uall'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });
const GENERADAS = [[/^club\/[^/]+\.html$/, 'club/*.html'], [/^liga\/[^/]+\.html$/, 'liga/*.html'], [/^fuentes\/[^/]+\.html$/, 'fuentes/*.html'], [/^og\//, 'og/*'], [/^data\/[^/]+\/[^/]+-data\.js$/, 'data/*/*-data.js']];
const cuentas = new Map(); const sueltas = [];
for (const l of salida.split('\n').filter(Boolean)) {
  const estado = l.slice(0, 2); const ruta = l.slice(3).replace(/^"|"$/g, '');
  const g = GENERADAS.find(([re]) => re.test(ruta));
  if (g) { const k = `${estado} ${g[1]}`; cuentas.set(k, (cuentas.get(k) || 0) + 1); } else sueltas.push(l);
}
if (!sueltas.length && !cuentas.size) { console.log('Árbol limpio.'); process.exit(0); }
for (const l of sueltas) console.log(l);
for (const [k, n] of cuentas) console.log(`${k}  (${n} generadas)`);
console.log(`\n${sueltas.length} archivo(s) sueltos · ${[...cuentas.values()].reduce((a, b) => a + b, 0)} generados`);
