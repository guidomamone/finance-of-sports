// Parte tools/audit.js (CommonJS) en audit-base.js (lo compartido), audit-chequeos-N.js (los check*) y audit.js (la entrada), sin cambiar el texto de ninguna declaración.
// USO: node tools/archivo/partir-cjs.mjs [--escribir]    sin --escribir solo dice cómo repartiría (y sale con 1 si una dependencia cruza módulos)
// Está pensado para un solo archivo CommonJS de nivel superior con `check*` (ENTRADA, el prefijo `check` y OBJETIVO_KB son los de audit.js: ajustarlos para otro).
import { readFileSync, writeFileSync } from 'node:fs';
import { lexico } from '../lexico-js.mjs';
const ROOT = import.meta.dirname + '/../';
const ESCRIBIR = process.argv.includes('--escribir');
const OBJETIVO_KB = 27;
const ENTRADA = new Set(['main', 'imprimir', 'listarFx', 'SEV_TITULO', 'loadEngine', 'montarMuestras', 'pruebaDeDeporte']);
const src = readFileSync(ROOT + 'audit.js', 'utf8'); const L = src.split('\n');
const lex = lexico(src, 1, 0);
// --- chunks
const porLinea = new Map(); for (const d of lex.declaradas) { if (!porLinea.has(d.linea)) porLinea.set(d.linea, []); porLinea.get(d.linea).push(d); }
const lineas = [...porLinea.keys()].sort((a, b) => a - b);
const chunks = lineas.map((ln, i) => ({ ini: ln, fin: (lineas[i + 1] ?? L.length) - 1, nombres: [...new Set(porLinea.get(ln).map((d) => d.nombre))], tipo: porLinea.get(ln)[0].tipo }));
for (const c of chunks) { let k = c.ini; while (k > 0 && /^\s*\/\//.test(L[k - 1])) k--; c.ini = k; }
for (let i = 0; i < chunks.length; i++) if (i + 1 < chunks.length) chunks[i].fin = chunks[i + 1].ini - 1; else chunks[i].fin = L.length - 1;
const cabecera = L.slice(0, chunks[0].ini); // shebang y comentario inicial
// un archivo sin línea final vacía: el último chunk llega hasta el final
for (const c of chunks) { c.texto = L.slice(c.ini, c.fin + 1).join('\n'); c.bytes = Buffer.byteLength(c.texto); const t = lexico(c.texto); c.ids = new Set(t.ids); }
const dueño = new Map(); chunks.forEach((c, i) => { c.i = i; for (const n of c.nombres) dueño.set(n, c); });
for (const c of chunks) c.usa = new Set([...c.ids].filter((n) => dueño.has(n) && !c.nombres.includes(n)).map((n) => dueño.get(n)));
const usuarios = new Map(chunks.map((c) => [c, new Set()])); for (const c of chunks) for (const d of c.usa) usuarios.get(d).add(c);
// --- clasificación
for (const c of chunks) c.rol = c.nombres.some((n) => ENTRADA.has(n)) ? 'entrada' : (c.tipo === 'function' && /^check/.test(c.nombres[0]) ? 'check' : 'infra');
// grupos de checks: se unen los que dependen unos de otros (directa o por infra exclusiva), después se empaquetan en orden
const padre = chunks.map((c) => c.i); const raiz = (x) => (padre[x] === x ? x : (padre[x] = raiz(padre[x])));
const unir = (a, b) => { padre[raiz(a)] = raiz(b); };
for (const c of chunks) if (c.rol === 'check') for (const d of c.usa) if (d.rol === 'check') unir(c.i, d.i);
const checks = chunks.filter((c) => c.rol === 'check');
const grupos = []; const visto = new Set(); for (const c of checks) { const r = raiz(c.i); if (visto.has(r)) continue; visto.add(r); grupos.push(checks.filter((x) => raiz(x.i) === r)); }
const modulos = []; let actual = { chunks: [], bytes: 0 };
for (const g of grupos) { const b = g.reduce((a, c) => a + c.bytes, 0); if (actual.bytes + b > OBJETIVO_KB * 1024 && actual.chunks.length) { modulos.push(actual); actual = { chunks: [], bytes: 0 }; } actual.chunks.push(...g); actual.bytes += b; }
if (actual.chunks.length) modulos.push(actual);
modulos.forEach((m, k) => { m.n = k + 1; for (const c of m.chunks) c.mod = m; });
// --- infra: exclusiva de un módulo si todos sus usuarios (checks o infra) están en él; si no, base. Punto fijo.
const infra = chunks.filter((c) => c.rol === 'infra'); for (const c of infra) c.mod = undefined; // undefined = sin decidir
let cambio = true;
const dondeVa = (c) => { // módulo único de los usuarios, 'base' si hay entrada u otros módulos, null si no hay usuarios
  let mod = null; for (const u of usuarios.get(c)) { const um = u.rol === 'entrada' ? 'base' : u.mod === undefined ? 'indef' : (u.mod || 'base'); if (um === 'indef') continue; if (um === 'base') return 'base'; if (mod && mod !== um) return 'base'; mod = um; } return mod;
};
for (let vuelta = 0; vuelta < 20 && cambio; vuelta++) { cambio = false; for (const c of infra) { const d = dondeVa(c); const nuevo = d === null ? 'base' : d; if (c.mod !== nuevo) { c.mod = nuevo === 'base' ? 'base' : nuevo; cambio = true; } } }
for (const c of infra) if (c.mod === undefined) c.mod = 'base';
// los checks que usan algo declarado en otro módulo (check→check entre módulos) o infra de otro módulo: avisar
const problemas = [];
for (const c of chunks) { if (c.rol === 'entrada') continue; for (const d of c.usa) { const cm = c.mod === 'base' ? 'base' : c.mod; const dm = d.rol === 'entrada' ? 'entrada' : d.mod; if (dm === 'entrada') problemas.push(`${c.nombres[0]} usa ${d.nombres[0]} (entrada)`); else if (cm !== dm && dm !== 'base') problemas.push(`${c.nombres[0]} (${cm?.n ?? cm}) usa ${d.nombres[0]} (${dm?.n ?? dm})`); else if (cm === 'base' && dm !== 'base') problemas.push(`${c.nombres[0]} (base) usa ${d.nombres[0]} (${dm?.n ?? dm})`); } }
const base = chunks.filter((c) => c.rol === 'infra' && c.mod === 'base');
const entrada = chunks.filter((c) => c.rol === 'entrada');
const kb = (b) => (b / 1024).toFixed(1);
console.log(`base: ${base.length} declaraciones, ${kb(base.reduce((a, c) => a + c.bytes, 0))} KB`);
for (const m of modulos) { const ex = chunks.filter((c) => c.rol === 'infra' && c.mod === m); const total = m.chunks.reduce((a, c) => a + c.bytes, 0) + ex.reduce((a, c) => a + c.bytes, 0); console.log(`módulo ${m.n}: ${m.chunks.length} checks + ${ex.length} declaraciones propias, ${kb(total)} KB`); }
console.log(`entrada: ${entrada.length} declaraciones, ${kb(entrada.reduce((a, c) => a + c.bytes, 0))} KB + cabecera ${cabecera.length} líneas`);
if (problemas.length) { console.log('PROBLEMAS (dependencias que cruzan):\n  ' + problemas.slice(0, 20).join('\n  ')); }
if (!ESCRIBIR) process.exit(problemas.length ? 1 : 0);
if (problemas.length) { console.error('no se escribe con problemas'); process.exit(1); }
// --- emitir
const nombresDe = (cs) => cs.flatMap((c) => c.nombres);
const requireDe = (cs, desde, fuente) => { // nombres usados por los chunks cs que están declarados en `desde` (lista de chunks)
  const set = new Set(desde.flatMap((c) => c.nombres)); const usados = new Set(); for (const c of cs) for (const n of c.ids) if (set.has(n) && !c.nombres.includes(n)) usados.add(n);
  const propios = new Set(nombresDe(cs)); return [...usados].filter((n) => !propios.has(n)).sort();
};
const orden = (cs) => cs.slice().sort((a, b) => a.ini - b.ini);
writeFileSync(ROOT + 'audit-base.js', ['// tools/audit-base.js — lo que comparten los chequeos de tools/audit.js (los requires, la raíz, `add` y los hallazgos, las constantes y los ayudantes). Mudado de audit.js sin cambiar una línea;', '// audit.js y audit-chequeos-N.js lo requieren (Node lo evalúa una sola vez: `findings` y `silenciados` son los mismos para todos).', '', ...orden(base).map((c) => c.texto), '', `module.exports = { ${base.flatMap((c) => c.nombres).join(', ')} };`, ''].join('\n'));
for (const m of modulos) {
  const propias = orden([...m.chunks, ...chunks.filter((c) => c.rol === 'infra' && c.mod === m)]);
  const deBase = requireDe(propias, base);
  const checksM = m.chunks.map((c) => c.nombres[0]);
  writeFileSync(ROOT + `audit-chequeos-${m.n}.js`, [`// tools/audit-chequeos-${m.n}.js — ${checksM.join(', ')}. Mudados de tools/audit.js sin cambiar una línea; lo compartido (add, ROOT, fs, path…) está en tools/audit-base.js.`, '', `const { ${deBase.join(', ')} } = require('./audit-base.js');`, '', ...propias.map((c) => c.texto), '', `module.exports = { ${m.chunks.flatMap((c) => c.nombres).join(', ')} };`, ''].join('\n'));
}
const deBaseEntrada = requireDe(entrada, base);
const reqMods = modulos.map((m) => { const usados = requireDe(entrada, m.chunks); return usados.length ? `const { ${usados.join(', ')} } = require('./audit-chequeos-${m.n}.js');` : null; }).filter(Boolean);
writeFileSync(ROOT + 'audit.js', [...cabecera, `const { ${deBaseEntrada.join(', ')} } = require('./audit-base.js');`, ...reqMods, '', ...orden(entrada).map((c) => c.texto), ''].join('\n'));
console.log('escrito');
