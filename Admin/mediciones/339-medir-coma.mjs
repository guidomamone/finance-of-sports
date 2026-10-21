import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const R = new URL("../../Clubes", import.meta.url).pathname; // node Admin/mediciones/339-medir-coma.mjs
const num = (t) => { const neg = /^\(.*\)$/.test(t) || t.startsWith('-'); const v = parseFloat(t.replace(/[()\-,]/g, '')); return neg ? -v : v; };
const TOK = '(\\(?-?\\d+\\.\\d\\)?|\\(?-?\\d+\\)?)';
const re = new RegExp('^[|\\s]*([A-Za-z][^|\\d]{2,60}?)[|\\s]+' + TOK + '[|\\s]+' + TOK + '[|\\s]+' + TOK + '[|\\s]*$');
let filas = 0, ok = 0, fallan = 0, flag = [], docs = 0;
function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); const s = statSync(f); if (s.isDirectory()) walk(f); else if (f.endsWith('.md')) { docs++; leer(f); } } }
function leer(f) {
  const ls = readFileSync(f, 'utf8').split('\n');
  ls.forEach((l, i) => {
    const m = l.match(re); if (!m) return;
    const t = [m[2], m[3], m[4]];
    if (!t.some((x) => x.includes('.'))) return; // al menos una cifra con decimal: tabla en £m / M con un decimal
    const [a, b, c] = t.map(num); filas++;
    const cierra = (a, b, c) => Math.abs(a - b - c) <= 0.051 || Math.abs(b - a - c) <= 0.051;
    if (cierra(a, b, c)) { ok++; return; }
    fallan++;
    for (const k of [0, 1]) { const v = [a, b]; v[k] = v[k] / 10; if (!t[k].includes('.') && cierra(v[0], v[1], c)) flag.push(`${f.replace(R + '/', '')}:${i + 1}: ${l.trim().slice(0, 80)}  (÷10 en la cifra ${k + 1})`); }
  });
}
walk(R);
console.log(`${docs} .md; filas de 3 cifras con un decimal: ${filas}; la tercera es la diferencia de las otras dos: ${ok}; no: ${fallan}; marcadas (÷10 de un entero sin coma la hace cerrar): ${flag.length}`);
console.log(flag.join('\n'));
