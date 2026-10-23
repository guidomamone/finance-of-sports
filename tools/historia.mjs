#!/usr/bin/env node
// ============================================================================
// tools/historia.mjs — `fos historia`: cada fecha y cada «to-do N» / «Versión N» de los documentos de criterio, con su frase, para reescribirlos sin la historia.
//
// POR QUÉ. Los documentos que dicen cómo se trabaja y qué hay HOY (skills, CLAUDE.md, ESTADO, PIPELINE, CONVENCIONES*, PANTALLA) no llevan historia: la fecha de una decisión,
// el número de versión y el de tarea van al CHANGELOG (CLAUDE.md, «Al empezar»). `audit.js` solo cuenta (`historia-en-doc-de-criterio`); esto da la lista con la línea y la clase:
//   decisión  la frase habla de una decisión, un cierre o una persona («decidió», «Guido», «votación», «cerrado»…): se reescribe sin la fecha
//   dato      la fecha es un dato del mundo (un vencimiento, un cierre de ejercicio, un ejemplo de formato): se queda
// USO:  node tools/historia.mjs [--decision] [--archivo <ruta>] [--json]     (solo lee; la reescritura es con `fos reemplazar --lista`, ensayo primero)
// ============================================================================
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const val = (k) => { const i = A.indexOf(k); return i < 0 ? null : A[i + 1]; };
const archivos = [];
const recorrer = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? recorrer(p) : /\.md$/.test(f) && archivos.push(p); } };
recorrer(join(ROOT, '.claude', 'skills'));
for (const f of ['CLAUDE.md', 'Admin/ESTADO.md', 'Admin/PIPELINE.md', 'Admin/PANTALLA.md', 'Admin/CONVENCIONES.md', 'Admin/CONVENCIONES-DATOS.md']) if (existsSync(join(ROOT, f))) archivos.push(join(ROOT, f));

const FECHA = /\b20\d\d-\d\d-\d\d\b/g, TODO_N = /\bto-?do\s+\d{1,3}\b/gi, VERSION = /\bVersi[óo]n\s+\d{1,3}\b/g;
const DECISION = /decid|decisi[óo]n|Guido|votaci[óo]n|cerr[óo]|cerrad|aprob|pidi[óo]|pedido|corrigi[óo]|resuelt|se hizo|hecho|verificado|REVISADO|medi[óo]/i;
const DATO = /desde el|hasta el|a partir del|cierre|vence|ejercicio|fiscal|formato|ejemplo|p\. ej\.|como en|2026-10-30|[ú]ltimo chequeo|chequeo \d|\w[\w/-]*\d{4}-\d\d-\d\d[\w-]*\.md|`fxRef/i; // incluye el nombre de un archivo con fecha
const filas = [];
for (const f of archivos) {
  const rel = relative(ROOT, f);
  if (val('--archivo') && rel !== val('--archivo')) continue;
  readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
    const marcas = [...(l.match(FECHA) || []), ...(l.match(TODO_N) || []), ...(l.match(VERSION) || [])];
    if (!marcas.length) return;
    // una fecha de documento de criterio es historia salvo que la frase la use como dato del mundo (DATO); si además habla de una decisión, la mira una sesión
    const clase = !DATO.test(l) ? 'decisión' : DECISION.test(l) ? 'revisar' : 'dato';
    filas.push({ archivo: rel, linea: i + 1, marcas, clase, frase: l.trim().slice(0, 200) });
  });
}
const mostrar = A.includes('--decision') ? filas.filter((x) => x.clase !== 'dato') : filas;
if (A.includes('--json')) { console.log(JSON.stringify(mostrar)); process.exit(0); }
const por = new Map(); for (const x of mostrar) por.set(x.archivo, [...(por.get(x.archivo) || []), x]);
for (const [arch, xs] of [...por].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${arch} (${xs.length})`);
  for (const x of xs) console.log(`  L${x.linea} [${x.clase}] ${x.marcas.join(', ')} · ${x.frase}`);
}
const cuenta = (c) => filas.filter((x) => x.clase === c).length;
console.log(`\n${filas.length} líneas con historia en ${por.size} documentos: decisión ${cuenta('decisión')}, dato ${cuenta('dato')}, a revisar ${cuenta('revisar')}.`);
