#!/usr/bin/env node
// ============================================================================
// tools/reemplazar.mjs — reemplazos en varios archivos sin un script ad hoc (TODO 392). El hook rechaza `sed -i`, `python` y `node -e`; Edit hace una
// sola sustitución. Esto cubre las dos formas que hicieron falta: el mismo texto en muchos archivos y una lista de cambios exactos por línea.
//
//   node tools/reemplazar.mjs <archivo …> --de "<texto>" --a "<texto>" [--regex] [--solo-comentarios] [--escribir]
//       en cada archivo, todas las apariciones de --de (literal, o regex JS con --regex; $1 en --a); --solo-comentarios: solo dentro de comentarios
//       (los ubica `scan` de comparar-sin-comentarios.js: .js, .mjs, .html, .css).
//   node tools/reemplazar.mjs --lista cambios.json [--escribir]
//       cambios.json: [{ "file": "tools/x.mjs", "edits": [[linea, "viejo", "nuevo"], [linea, "regex", "nuevo", "re"]] }]: cada "viejo" tiene que estar en esa
//       línea (una vez, o que el regex coincida); si alguno falla no se escribe ningún archivo.
// Sin --escribir es un ensayo: dice qué cambiaría (archivo:línea, antes y después). Se niega a escribir con cambios sin commitear en el archivo
// (se pisaría lo que no está respaldado): commitealo antes. Sale con 1 si no hay nada que reemplazar o algo falla.
// ============================================================================
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const { scan } = createRequire(import.meta.url)('./comparar-sin-comentarios.js');

const sucio = (rel) => { try { return execFileSync('git', ['status', '--porcelain', '--', rel], { cwd: ROOT, encoding: 'utf8' }).trim() !== ''; } catch { return false; } };
const lineaDe = (src, pos) => src.slice(0, pos).split('\n').length;

// reemplaza todas las apariciones en `texto`; devuelve { texto, n }
function reemplazarEn(texto, de, a) {
  let n = 0;
  const out = texto.replace(de, (...m) => { n++; return typeof a === 'function' ? a(...m) : a; });
  return { texto: out, n };
}

export function reemplazarTodo(rel, src, { de, a, regex, soloComentarios }) {
  const re = regex ? new RegExp(de, 'g') : new RegExp(de.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const aFn = regex ? (...m) => String(a).replace(/\$(\d)/g, (_, k) => m[Number(k)] ?? '') : () => a;
  if (!soloComentarios) { const r = reemplazarEn(src, re, aFn); return { src: r.texto, n: r.n }; }
  const { comments } = scan(rel, src);
  let out = '', i = 0, n = 0;
  for (const c of comments) {
    const r = reemplazarEn(c.text, re, aFn);
    n += r.n; out += src.slice(i, c.pos) + r.texto; i = c.pos + c.text.length;
  }
  return { src: out + src.slice(i), n };
}

// cambios exactos por línea; devuelve { src, n, errores[] }
export function reemplazarLineas(src, edits) {
  const L = src.split('\n'), errores = [];
  let n = 0;
  for (const [num, viejo, nuevo, modo] of edits) {
    const l = L[num - 1];
    if (l === undefined) { errores.push(`línea ${num}: no existe`); continue; }
    if (modo === 're') {
      const re = new RegExp(viejo);
      if (!re.test(l)) { errores.push(`línea ${num}: /${viejo.slice(0, 50)}/ no coincide`); continue; }
      L[num - 1] = l.replace(re, nuevo); n++; continue;
    }
    if (l.split(viejo).length !== 2) { errores.push(`línea ${num}: «${viejo.slice(0, 50)}» ${l.includes(viejo) ? 'está más de una vez' : 'no está'}`); continue; }
    L[num - 1] = l.replace(viejo, () => nuevo); n++;
  }
  return { src: L.join('\n'), n, errores };
}

function mostrar(rel, antes, despues) {
  const A = antes.split('\n'), B = despues.split('\n');
  let k = 0;
  for (let i = 0; i < Math.max(A.length, B.length) && k < 4; i++) if (A[i] !== B[i]) { k++; console.log(`  ${rel}:${i + 1}\n    - ${(A[i] ?? '').trim().slice(0, 150)}\n    + ${(B[i] ?? '').trim().slice(0, 150)}`); }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const escribir = A.includes('--escribir');
  const trabajos = []; // { rel, antes, despues, n }
  let fallo = false;
  if (v('--lista')) {
    const J = JSON.parse(readFileSync(resolve(ROOT, v('--lista')), 'utf8'));
    for (const { file, edits } of Array.isArray(J) ? J : [J]) {
      const antes = readFileSync(resolve(ROOT, file), 'utf8');
      const r = reemplazarLineas(antes, edits);
      if (r.errores.length) { fallo = true; for (const e of r.errores) console.error(`MAL ${file} ${e}`); continue; }
      trabajos.push({ rel: file, antes, despues: r.src, n: r.n });
    }
  } else {
    const de = v('--de'), a = v('--a');
    const archivos = A.filter((x, k) => !x.startsWith('--') && !['--de', '--a'].includes(A[k - 1]));
    if (de === undefined || a === undefined || !archivos.length) { console.error('Uso: node tools/reemplazar.mjs <archivo …> --de "<texto>" --a "<texto>" [--regex] [--solo-comentarios] [--escribir]   |   --lista cambios.json'); process.exit(1); }
    for (const f of archivos) {
      const rel = relative(ROOT, resolve(ROOT, f));
      const antes = readFileSync(resolve(ROOT, rel), 'utf8');
      const r = reemplazarTodo(rel, antes, { de, a, regex: A.includes('--regex'), soloComentarios: A.includes('--solo-comentarios') });
      if (r.n) trabajos.push({ rel, antes, despues: r.src, n: r.n });
    }
  }
  if (fallo) { console.error('No se escribe nada.'); process.exit(1); }
  if (!trabajos.length) { console.error('Nada que reemplazar.'); process.exit(1); }
  for (const t of trabajos) { console.log(`${t.rel}: ${t.n} reemplazo(s)`); mostrar(t.rel, t.antes, t.despues); }
  const total = trabajos.reduce((s, t) => s + t.n, 0);
  if (!escribir) { console.log(`\nEnsayo: ${total} reemplazo(s) en ${trabajos.length} archivo(s). --escribir los aplica.`); process.exit(0); }
  const sucios = trabajos.filter((t) => sucio(t.rel));
  if (sucios.length) { console.error(`\nNo se escribe: ${sucios.map((t) => t.rel).join(', ')} tiene cambios sin commitear que se pisarían. Commitealos primero.`); process.exit(1); }
  for (const t of trabajos) writeFileSync(resolve(ROOT, t.rel), t.despues);
  console.log(`\nEscritos ${total} reemplazo(s) en ${trabajos.length} archivo(s).`);
}
