#!/usr/bin/env node
// ============================================================================
// tools/mudar-carpetas.mjs — mueve archivos entre carpetas de Clubes/ SIN BORRAR NADA.
//
// POR QUÉ: los PDFs no se trackean (.gitignore), así que no hay git para recuperarlos y un borrado se pierde. Esta tool unifica
// carpetas duplicadas de un club con tres garantías: (1) un archivo se mueve, nunca se borra; (2) un duplicado idéntico (misma huella
// sha1 que otro archivo de la carpeta destino) va a Admin/Archive/pdfs-duplicados/<ruta de la carpeta>/, no se tira; (3) si dos archivos
// de igual nombre difieren en contenido, para sin tocar nada.
//
// MANIFIESTO (Admin/registros/mudanzas-carpetas.json): una lista de { "de": "Clubes/<País>/<Carpeta>", "a": "Clubes/<País>/<Destino>",
// "archivos": "todos" | ["nombre.pdf", ...] }. Por cada archivo de `de`:
//   - hay en `a` un archivo con la misma huella  -> va a Admin/Archive/pdfs-duplicados/<de sin "Clubes/">/ (duplicado)
//   - `a` no tiene uno con ese nombre            -> va a `a` (unir)
//   - `a` tiene uno con ese nombre y otra huella -> la entrada entera se frena, sin mover nada
// Al final, una carpeta `de` que quedó vacía se saca (solo vacía: nunca se borra un archivo). Un archivo que ya no está en `de` se saltea
// (se puede volver a correr). Con `archivos: "todos"` la carpeta se vacía; con una lista, solo esos nombres.
//
// SOLO EN LA CARPETA PRINCIPAL: en un worktree los archivos de Clubes/ son enlaces a la principal; mover un enlace no mueve el archivo.
// Si el origen es un enlace simbólico, la tool se niega.
//
// USO (desde la raíz de la carpeta principal):
//   node tools/mudar-carpetas.mjs                      ensayo: qué movería (no toca nada)
//   node tools/mudar-carpetas.mjs --escribir           mueve
//   --manifiesto <archivo>   otro manifiesto      --raiz <carpeta>   otra raíz (para probar)
// Después: node tools/inventario-transcripciones.mjs (recalcula el registro) y node tools/audit.js.
// ============================================================================

import { readFileSync, readdirSync, existsSync, renameSync, mkdirSync, lstatSync, rmdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const ESCRIBIR = args.includes('--escribir');
const ROOT = resolve(flag('--raiz') || resolve(import.meta.dirname, '..'));
const MANIFIESTO = resolve(ROOT, flag('--manifiesto') || 'Admin/registros/mudanzas-carpetas.json');
const ARCHIVO_DUP = 'Admin/Archive/pdfs-duplicados';

const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');
const archivosDe = (dir) => (existsSync(dir) ? readdirSync(dir).filter((n) => { const l = lstatSync(join(dir, n)); return !n.startsWith('.') && (l.isFile() || l.isSymbolicLink()); }) : []);

if (!existsSync(MANIFIESTO)) { console.error(`Falta el manifiesto: ${MANIFIESTO}`); process.exit(1); }
const entradas = JSON.parse(readFileSync(MANIFIESTO, 'utf8'));
let movidos = 0, duplicados = 0, frenadas = 0, saltados = 0;

for (const e of entradas) {
  const de = resolve(ROOT, e.de), a = resolve(ROOT, e.a);
  console.log(`\n${e.de}  ->  ${e.a}`);
  if (!existsSync(de)) { console.log('  (la carpeta de origen ya no existe: nada que hacer)'); continue; }
  const nombres = e.archivos === 'todos' ? archivosDe(de) : e.archivos;
  const enDestino = archivosDe(a).map((n) => ({ n, h: sha1(join(a, n)) }));
  const plan = []; let parar = null;
  for (const n of nombres) {
    const origen = join(de, n);
    if (!existsSync(origen)) { saltados++; console.log(`  - ${n}: ya no está (se saltea)`); continue; }
    if (lstatSync(origen).isSymbolicLink()) { parar = `${n} es un enlace simbólico: correr esta tool en la carpeta principal, no en un worktree`; break; }
    const h = sha1(origen);
    const igual = enDestino.find((x) => x.h === h);
    if (igual) { plan.push({ n, origen, destino: join(ROOT, ARCHIVO_DUP, e.de.replace(/^Clubes\//, ''), n), tipo: `duplicado de "${igual.n}"` }); continue; }
    const mismoNombre = enDestino.find((x) => x.n === n);
    if (mismoNombre) { parar = `${n} existe en el destino con otro contenido`; break; }
    plan.push({ n, origen, destino: join(a, n), tipo: 'unir' });
  }
  if (parar) { frenadas++; console.log(`  FRENADA, no se mueve nada de esta entrada: ${parar}`); continue; }
  for (const p of plan) {
    console.log(`  ${ESCRIBIR ? 'mueve' : 'movería'}  ${p.n}  [${p.tipo}]  ->  ${p.destino.replace(ROOT + '/', '')}`);
    if (p.tipo === 'unir') movidos++; else duplicados++;
    if (!ESCRIBIR) continue;
    if (existsSync(p.destino)) { console.error(`  ERROR: ya existe ${p.destino}; no se pisa`); process.exit(1); }
    mkdirSync(resolve(p.destino, '..'), { recursive: true });
    renameSync(p.origen, p.destino);
  }
  if (ESCRIBIR && readdirSync(de).length === 0) { rmdirSync(de); console.log('  carpeta de origen vacía: sacada'); }
}

console.log(`\n${ESCRIBIR ? 'Hecho' : 'Ensayo'}: ${movidos} a unir, ${duplicados} duplicados al archivo, ${saltados} ya movidos, ${frenadas} entradas frenadas.${ESCRIBIR ? '' : ' Para mover: --escribir.'}`);
