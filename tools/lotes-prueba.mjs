#!/usr/bin/env node
// ============================================================================
// tools/lotes-prueba.mjs — ARMA LOS LOTES DE PRUEBA MEDIANO Y COMPLETO a partir de lo que hoy tiene verificación (pedido de Guido,
// 2026-10-19: "actualizá los lotes chico, mediano y grande para que sean más representativos del total").
//
// POR QUÉ: los tres lotes (Admin/lotes/prueba-rapida.txt, prueba-mediana.txt, prueba-completa.txt) son la vara de cualquier cambio de script
// (skill club-or-year-onboarding, sección 5: "lo cargado tiene que dar idéntico"). Armados a mano, quedaron viejos: el 2026-10-19 cubrían 358
// de los 720 documentos con verificación, sin ninguno de Bélgica, Estonia, Países Bajos, Noruega ni Suiza. Un cambio podía romper un país
// entero sin que la medición lo viera.
//
// LAS TRES LISTAS:
//   rápida    a mano: los casos que ya rompieron algo una vez, con su motivo en un comentario. Este script no la toca; la lee.
//   mediana   la rápida + TRES documentos por club (el ejercicio más viejo, el del medio y el más nuevo con verificación).
//   completa  TODOS los documentos con verificación (Generados/<País>/<Club>/<doc>.verificacion.json con su PDF en Clubes/).
// Sin repetidos; cada lista contiene a la anterior. El año de cada documento sale de su .verificacion.json (`year`).
//
// USO (desde la raíz, gratis):
//   node tools/lotes-prueba.mjs              # ensayo: cuántos documentos por país tendría cada lista
//   node tools/lotes-prueba.mjs --escribir   # reescribe prueba-mediana.txt y prueba-completa.txt
// Correrlo con --escribir cuando entran clubes o años nuevos, y antes de medir un cambio grande.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const GEN = resolve(ROOT, 'Generados');
const ESCRIBIR = process.argv.includes('--escribir');
const LOTES = resolve(ROOT, 'Admin', 'lotes');

// todos los .verificacion.json de Generados/ (sin _cache) -> { pdf, club, pais, year }
function verificados() {
  const out = [];
  const recorrer = (dir) => {
    for (const d of readdirSync(dir, { withFileTypes: true })) {
      if (d.name.startsWith('_')) continue;
      const p = join(dir, d.name);
      if (d.isDirectory()) { recorrer(p); continue; }
      if (!d.name.endsWith('.verificacion.json')) continue;
      const rel = relative(GEN, p).replace(/\.verificacion\.json$/, '');
      // NFC: el disco puede devolver los nombres descompuestos ("Å" de Årsmøte) y la rápida los trae compuestos; sin esto, el mismo documento entra dos veces
      const pdf = ['.pdf', '.PDF'].map((x) => `Clubes/${rel}${x}`).find((x) => existsSync(resolve(ROOT, x)))?.normalize('NFC');
      if (!pdf) continue;
      let year = null; try { year = Number(JSON.parse(readFileSync(p, 'utf8')).year) || null; } catch { /* sin año: va al final del club */ }
      const [pais, club] = rel.split('/');
      out.push({ pdf, pais, club: `${pais}/${club}`, year });
    }
  };
  recorrer(GEN);
  return out;
}

const leerLista = (n) => readFileSync(resolve(LOTES, `prueba-${n}.txt`), 'utf8').split('\n').map((l) => l.trim().normalize('NFC')).filter((l) => l && !l.startsWith('#'));

const todos = verificados();
const rapida = leerLista('rapida');
const faltanRapida = rapida.filter((p) => !existsSync(resolve(ROOT, p)));
if (faltanRapida.length) console.log(`Aviso: ${faltanRapida.length} documento(s) de la rápida no están en Clubes/: ${faltanRapida.join(', ')}`);

// tres por club: el más viejo, el del medio y el más nuevo (por año; a igual año, por nombre)
const porClub = new Map();
for (const d of todos) { if (!porClub.has(d.club)) porClub.set(d.club, []); porClub.get(d.club).push(d); }
const tres = [];
for (const docs of porClub.values()) {
  docs.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.pdf.localeCompare(b.pdf));
  const idx = [...new Set([0, Math.floor((docs.length - 1) / 2), docs.length - 1])];
  for (const i of idx) tres.push(docs[i].pdf);
}
const orden = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b));
const mediana = [...rapida, ...orden(tres.filter((p) => !rapida.includes(p)))];
const enMediana = new Set(mediana);
const completa = [...mediana, ...orden(todos.map((d) => d.pdf).filter((p) => !enMediana.has(p)))];

// resumen por país
const pais = (p) => p.split('/')[1];
const cuenta = (arr) => arr.reduce((m, p) => m.set(pais(p), (m.get(pais(p)) || 0) + 1), new Map());
const [cR, cM, cC] = [cuenta(rapida), cuenta(mediana), cuenta(completa)];
for (const p of [...cC.keys()].sort((a, b) => cC.get(b) - cC.get(a))) console.log(`${p.padEnd(16)} rápida ${String(cR.get(p) || 0).padStart(3)} · mediana ${String(cM.get(p) || 0).padStart(3)} · completa ${String(cC.get(p)).padStart(4)}`);
console.log(`TOTAL           rápida ${rapida.length} · mediana ${mediana.length} · completa ${completa.length} (${porClub.size} clubes con verificación)`);

if (!ESCRIBIR) { console.log('\nEnsayo: no se escribió nada. Para reescribir las listas: --escribir'); process.exit(0); }
const cabecera = (que) => [
  '# Lista de PRUEBA (Versión 450, pedido de Guido 2026-10-04): para medir cualquier cambio de script antes y después. Sin repetidos.',
  '# GENERADA por `node tools/lotes-prueba.mjs --escribir`: no se edita a mano (los casos a mano van en prueba-rapida.txt).',
  '# Cómo medir un cambio de verificar.mjs o cargar.mjs: node tools/medir-verificar.mjs --lista <esta lista> antes y después (gratis, deja los registros como estaban).',
  `# ${que}`,
].join('\n');
writeFileSync(resolve(LOTES, 'prueba-mediana.txt'), `${cabecera('MEDIANA: la rápida + tres documentos por club con verificación (el ejercicio más viejo, el del medio y el más nuevo).')}\n${mediana.join('\n')}\n`);
writeFileSync(resolve(LOTES, 'prueba-completa.txt'), `${cabecera('COMPLETA: la mediana + todos los demás documentos con verificación.')}\n${completa.join('\n')}\n`);
console.log('\nEscritas Admin/lotes/prueba-mediana.txt y Admin/lotes/prueba-completa.txt.');
