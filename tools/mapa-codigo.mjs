#!/usr/bin/env node
// ============================================================================
// tools/mapa-codigo.mjs — EL MAPA DE UN ARCHIVO DE CÓDIGO: funciones con su rango de líneas, regiones por banner, cabecera e imports (TODO 373)
//
// POR QUÉ: un archivo de tools/ de más de 50 KB no se lee entero (CLAUDE.md). El mapa dice dónde está cada cosa para leer solo ese tramo con
// Read (offset y límite). Es lo que indice-md.mjs hace con los .md, pero para código.
//
// USO (gratis, no escribe nada):
//   node tools/fos.mjs mapa tools/caja-deuda.mjs          el mapa
//   node tools/fos.mjs mapa tools/caja-deuda.mjs --buscar personal   solo las funciones y regiones cuyo nombre o título lo contiene
//
// CÓMO: sin parser (no hay acorn en tools/). Una función de nivel superior empieza en la columna 0 (`function`, `async function`, `export …`,
// `const f = (…) =>`) y termina en el primer renglón que empieza con `}` (o con `)`/`]`/`;` para un `const` de varias líneas). Una región es un
// banner (`// =====` o `// -----`) y el primer comentario que le sigue. Los rangos son aproximados: si una función cierra distinto, el mapa
// la marca con «?». Un archivo que es un script lineal (casi sin funciones) lo dice y lista solo las regiones.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const A = process.argv.slice(2);
const archivo = A.find((a) => !a.startsWith('--'));
const buscar = A.includes('--buscar') ? (A[A.indexOf('--buscar') + 1] || '').toLowerCase() : null;
if (!archivo) { console.error('Uso: node tools/fos.mjs mapa <archivo> [--buscar <texto>]'); process.exit(1); }

const texto = readFileSync(resolve(archivo), 'utf8');
const L = texto.split('\n');
const kb = (Buffer.byteLength(texto) / 1024).toFixed(0);

const DECL = /^(?:export\s+(?:default\s+)?)?(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)|^(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>|^(?:export\s+)?class\s+([A-Za-z_$][\w$]*)/;
const BANNER = /^\/\/\s*([=\-])\1{3,}\s*$/;
const funciones = [];
for (let i = 0; i < L.length; i++) {
  const m = L[i].match(DECL);
  if (!m) continue;
  const nombre = m[1] || m[2] || m[3];
  const esFuncion = /function|class/.test(L[i].slice(0, 40)) || /=>/.test(L[i]);
  let fin = i; let seguro = true;
  const unaLinea = /\}\s*;?\s*$/.test(L[i]) && (L[i].match(/\{/g) || []).length === (L[i].match(/\}/g) || []).length && /\{/.test(L[i]);
  if (!unaLinea && !(/=>/.test(L[i]) && /;\s*$/.test(L[i]) && !/\{\s*$/.test(L[i]))) {
    seguro = false;
    for (let j = i + 1; j < L.length; j++) {
      if (/^[}\])]/.test(L[j])) { fin = j; seguro = true; break; }
      if (DECL.test(L[j]) && j > i + 1) { fin = j - 1; break; } // otra declaración antes de cerrar: rango dudoso
    }
  }
  funciones.push({ nombre, desde: i + 1, hasta: fin + 1, seguro, esFuncion, firma: L[i].trim().slice(0, 90) });
  i = Math.max(i, fin);
}

const regiones = [];
for (let i = 0; i < L.length; i++) {
  if (!BANNER.test(L[i])) continue;
  let j = i + 1;
  while (j < L.length && (BANNER.test(L[j]) || /^\/\/\s*$/.test(L[j]))) j++;
  if (j < L.length && /^\/\//.test(L[j])) {
    const t = L[j].replace(/^\/\/\s*/, '').replace(/\s+/g, ' ').trim();
    if (t && !regiones.some((r) => r.linea === j + 1)) regiones.push({ linea: i + 1, titulo: t.slice(0, 110) });
  }
}

// cabecera: el primer bloque de comentarios (después del shebang)
let k = L[0]?.startsWith('#!') ? 1 : 0; const cab0 = k;
while (k < L.length && (/^\/\//.test(L[k]) || !L[k].trim())) k++;
const cabecera = L.slice(cab0, k).filter((l) => /^\/\/\s*\S/.test(l) && !BANNER.test(l)).map((l) => l.replace(/^\/\/\s*/, '').trim());

const imports = [];
for (let i = 0; i < L.length; i++) {
  const m = L[i].match(/^import\s+(.+?)\s+from\s+['"]([^'"]+)['"]/) || L[i].match(/^import\s+['"]([^'"]+)['"]/);
  if (m) imports.push(m[2] ? `${m[2]}` : m[1]);
  const r = L[i].match(/^(?:const|let|var)\s+.+=\s*require\(['"]([^'"]+)['"]\)/); if (r) imports.push(r[1]);
}

// adentro de una función larga (más de 150 líneas, como verificar()): sus tramos, por los comentarios con sangría de 2 y la primera palabra en MAYÚSCULAS («// ESCALÓN …»)
const MARCA_INTERIOR = /^  \/\/\s+([A-ZÁÉÍÓÚÑ]{4,}(?:[\s:(].*)?)$/;
for (const f of funciones) {
  if (f.hasta - f.desde < 150) continue;
  f.interior = [];
  for (let i = f.desde; i < f.hasta - 1; i++) {
    const m = L[i].match(MARCA_INTERIOR);
    if (m) f.interior.push({ linea: i + 1, titulo: m[1].replace(/\((?:Versión|to-do)[^)]*\)/g, '').replace(/\s+/g, ' ').trim().slice(0, 70) });
  }
}
console.log(`${archivo} — ${kb} KB, ${L.length} líneas, ${funciones.filter((f) => f.esFuncion).length} funciones de nivel superior`);
if (cabecera.length) console.log(`cabecera (líneas ${cab0 + 1} a ${k}): ${cabecera.slice(0, 3).join(' · ').slice(0, 300)}`);
if (imports.length) console.log(`imports: ${[...new Set(imports)].join(', ')}`);
const pocas = funciones.filter((f) => f.esFuncion).length < 3 && L.length > 300;
if (pocas) console.log('AVISO: casi sin funciones de nivel superior; es un script lineal. El mapa solo puede mostrar las regiones por banner: leelo por tramos con Read (offset y límite).');

const coincide = (s) => !buscar || s.toLowerCase().includes(buscar);
const items = [...regiones.filter((r) => r.linea > k).map((r) => ({ linea: r.linea, txt: `§ ${r.titulo}` })), ...funciones.map((f) => ({ linea: f.desde, txt: `${f.esFuncion ? 'f' : 'k'} ${f.nombre}  ${f.desde}-${f.hasta}${f.seguro ? '' : ' ?'}  (${f.hasta - f.desde + 1} l)`, interior: f.interior }))]
  .filter((x) => coincide(x.txt) || x.interior?.some((s) => coincide(s.titulo))).sort((a, b) => a.linea - b.linea);
for (const x of items) {
  console.log(`${String(x.linea).padStart(5)}  ${x.txt}`);
  for (const s of x.interior || []) if (coincide(x.txt) || coincide(s.titulo)) console.log(`${String(s.linea).padStart(5)}      · ${s.titulo}`);
}
if (buscar && !items.length) console.log(`nada coincide con «${buscar}»`);
