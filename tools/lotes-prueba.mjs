#!/usr/bin/env node
// ============================================================================
// tools/lotes-prueba.mjs — ARMA LOS LOTES DE PRUEBA a partir de lo que hoy tiene verificación, ESTRATIFICADOS por familia (TODO 371)
//
// POR QUÉ: las tres listas (Admin/lotes/prueba-rapida.txt, prueba-mediana.txt, prueba-completa.txt) son la vara de cualquier cambio de script
// (skill club-or-year-onboarding, `mejorar-script.md` sección 5: «lo cargado tiene que dar idéntico»). Armadas a mano o corridas «cuando entran
// clubes o años nuevos», quedaron viejas: la mediana y la completa no tenían ni un documento de Inglaterra, Escocia, Dinamarca, Turquía ni Croacia
// aunque estaban cargados, y un cambio podía romper un país entero sin que la medición lo viera. Ahora corre sola (entra a tools/generadores.mjs,
// o sea al cerrar cada carga), es determinista (semilla fija, sin azar) y cubre cada familia.
//
// FAMILIA = país × formato del documento (tools/familias-docs.mjs). ESTRATO = familia × época (tercio más viejo, del medio y más nuevo de los años
// de esa familia) × moneda del ejercicio × deporte del club.
//
// LAS TRES LISTAS (cada una contiene a la anterior, sin repetidos):
//   rápida    la parte A MANO (los casos que ya rompieron algo, cada uno con su motivo en un comentario; este script no la toca) + un bloque AUTOMÁTICO
//             al final con UN documento de cada familia. Los del bloque se conservan mientras sigan existiendo, así la lista no cambia sola.
//   mediana   la rápida + tres documentos por club (el ejercicio más viejo, el del medio y el más nuevo) + un documento de cada estrato que
//             todavía no esté + los que falten para que cada familia tenga al menos 3 (o todos, si tiene menos).
//   completa  TODOS los documentos con verificación (Generados/<País>/<Club>/<doc>.verificacion.json con su PDF en Clubes/).
// Los desempates se resuelven por sha1("lotes-prueba-1|" + ruta): el mismo estado del repo da siempre las mismas listas.
//
// USO (desde la raíz, gratis):
//   node tools/lotes-prueba.mjs            reescribe las listas (así lo corre generadores.mjs)
//   node tools/lotes-prueba.mjs --ensayo   cuántos documentos y familias tendría cada lista, sin escribir
//   node tools/lotes-prueba.mjs --check    sale con 1 si hay una familia cargada sin documentos en la mediana, o un club cuyo último año con
//                                          verificación no está en la mediana (lo corre audit.js: `lote-prueba-desfasado`)
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join, relative } from 'node:path';
import { familiaDe } from './familias-docs.mjs';
import { deporteDePdf } from './deporte-club.mjs';
import { loadSite } from './datos-sitio.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const GEN = resolve(ROOT, 'Generados');
const LOTES = resolve(ROOT, 'Admin', 'lotes');
const A = process.argv.slice(2);
const MARCA_AUTO = '# === AUTOMÁTICO: un documento de cada familia (lo escribe tools/lotes-prueba.mjs; no se edita) ===';
const hash = (pdf) => createHash('sha1').update(`lotes-prueba-1|${pdf}`).digest('hex');
const porHash = (a, b) => (hash(a.pdf) < hash(b.pdf) ? -1 : 1);

// todos los .verificacion.json de Generados/ (sin _cache) con su PDF -> { pdf, club, clubId, year, familia, estrato }
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
      let j = {}; try { j = JSON.parse(readFileSync(p, 'utf8')); } catch { /* sin datos: va al final del club */ }
      const [pais, club] = rel.split('/');
      out.push({ pdf, club: `${pais}/${club}`, clubId: j.clubId || null, year: Number(j.year) || null, familia: familiaDe(pdf).clave });
    }
  };
  recorrer(GEN);
  // época: el tercio de los años de su familia (viejo, medio, nuevo); moneda y deporte del ejercicio / del club
  const { generic } = loadSite();
  const porFam = new Map();
  for (const d of out) { if (!porFam.has(d.familia)) porFam.set(d.familia, []); porFam.get(d.familia).push(d); }
  for (const docs of porFam.values()) {
    docs.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.pdf.localeCompare(b.pdf));
    docs.forEach((d, i) => { d.epoca = ['viejo', 'medio', 'nuevo'][Math.min(2, Math.floor((3 * i) / docs.length))]; });
  }
  for (const d of out) {
    const moneda = (d.clubId && generic[d.clubId]?.fiscalYearMeta?.[d.year]?.currency) || '?';
    d.estrato = `${d.familia}|${d.epoca}|${moneda}|${deporteDePdf(d.pdf) || '?'}`;
  }
  return out;
}

const leerArchivo = (n) => readFileSync(resolve(LOTES, `prueba-${n}.txt`), 'utf8').split('\n');
const sinComentarios = (lineas) => lineas.map((l) => l.trim().normalize('NFC')).filter((l) => l && !l.startsWith('#'));

function armar(todos) {
  const archivoRapida = leerArchivo('rapida');
  const iAuto = archivoRapida.findIndex((l) => l.startsWith('# === AUTOMÁTICO'));
  const aMano = iAuto >= 0 ? archivoRapida.slice(0, iAuto) : archivoRapida;
  const previosAuto = new Set(iAuto >= 0 ? sinComentarios(archivoRapida.slice(iAuto)) : []);
  const manoDocs = sinComentarios(aMano);
  const existentes = new Set(todos.map((d) => d.pdf));
  const faltanRapida = manoDocs.filter((p) => !existsSync(resolve(ROOT, p)));

  const porFam = new Map();
  for (const d of todos) { if (!porFam.has(d.familia)) porFam.set(d.familia, []); porFam.get(d.familia).push(d); }
  // rápida: un documento por familia (el que ya estaba, si sigue; si no, el de menor hash)
  const enMano = new Set(manoDocs);
  const auto = [];
  for (const [, docs] of [...porFam].sort((a, b) => a[0].localeCompare(b[0]))) {
    const previo = docs.find((d) => previosAuto.has(d.pdf));
    const elegido = previo || [...docs].sort(porHash)[0];
    if (!enMano.has(elegido.pdf)) auto.push(elegido.pdf);
  }
  const rapida = [...manoDocs, ...auto];
  const enRapida = new Set(rapida);

  // mediana: la rápida + 3 por club + uno por estrato + hasta 3 por familia
  const porClub = new Map();
  for (const d of todos) { if (!porClub.has(d.club)) porClub.set(d.club, []); porClub.get(d.club).push(d); }
  const elegidos = new Set(rapida.filter((p) => existentes.has(p)));
  for (const docs of porClub.values()) {
    docs.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.pdf.localeCompare(b.pdf));
    for (const i of new Set([0, Math.floor((docs.length - 1) / 2), docs.length - 1])) elegidos.add(docs[i].pdf);
  }
  const estratos = new Map();
  for (const d of todos) { if (!estratos.has(d.estrato)) estratos.set(d.estrato, []); estratos.get(d.estrato).push(d); }
  let porEstrato = 0;
  for (const docs of estratos.values()) if (!docs.some((d) => elegidos.has(d.pdf))) { elegidos.add([...docs].sort(porHash)[0].pdf); porEstrato++; }
  for (const docs of porFam.values()) {
    let n = docs.filter((d) => elegidos.has(d.pdf)).length;
    for (const d of [...docs].sort(porHash)) { if (n >= Math.min(3, docs.length)) break; if (!elegidos.has(d.pdf)) { elegidos.add(d.pdf); n++; } }
  }
  const orden = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b));
  const mediana = [...rapida, ...orden([...elegidos].filter((p) => !enRapida.has(p)))];
  const enMediana = new Set(mediana);
  const completa = [...mediana, ...orden(todos.map((d) => d.pdf).filter((p) => !enMediana.has(p)))];
  return { aMano, rapida, auto, mediana, completa, porFam, estratos, porEstrato, faltanRapida };
}

const todos = verificados();

if (A.includes('--check')) {
  const mediana = new Set(sinComentarios(leerArchivo('mediana')));
  const problemas = [];
  const sinDocs = [...new Set(todos.map((d) => d.familia))].filter((f) => !todos.some((d) => d.familia === f && mediana.has(d.pdf)));
  if (sinDocs.length) problemas.push(`familias cargadas sin documentos en la mediana: ${sinDocs.join(', ')}`);
  const clubes = new Map();
  for (const d of todos) { if (d.year == null) continue; if (!clubes.has(d.club)) clubes.set(d.club, []); clubes.get(d.club).push(d); }
  const sinUltimo = [...clubes].filter(([, docs]) => { const max = Math.max(...docs.map((d) => d.year)); return !docs.some((d) => d.year === max && mediana.has(d.pdf)); }).map(([c]) => c);
  if (sinUltimo.length) problemas.push(`${sinUltimo.length} club(es) cuyo último año con verificación no está en la mediana (${sinUltimo.slice(0, 4).join(', ')}${sinUltimo.length > 4 ? ', …' : ''})`);
  if (problemas.length) { console.error(`${problemas.join('; ')}. Corré: node tools/lotes-prueba.mjs`); process.exit(1); }
  console.log(`lotes de prueba al día (${mediana.size} documentos en la mediana, ${new Set(todos.map((d) => d.familia)).size} familias)`);
  process.exit(0);
}

const L = armar(todos);
if (L.faltanRapida.length) console.log(`Aviso: ${L.faltanRapida.length} documento(s) de la rápida a mano no están en Clubes/: ${L.faltanRapida.join(', ')}`);
const cuenta = (arr) => arr.reduce((m, p) => m.set(familiaDe(p).clave, (m.get(familiaDe(p).clave) || 0) + 1), new Map());
const [cR, cM, cC] = [cuenta(L.rapida), cuenta(L.mediana), cuenta(L.completa)];
for (const f of [...cC.keys()].sort((a, b) => cC.get(b) - cC.get(a))) console.log(`${f.padEnd(24)} rápida ${String(cR.get(f) || 0).padStart(3)} · mediana ${String(cM.get(f) || 0).padStart(3)} · completa ${String(cC.get(f)).padStart(4)}`);
console.log(`TOTAL                    rápida ${L.rapida.length} · mediana ${L.mediana.length} · completa ${L.completa.length} (${L.porFam.size} familias, ${L.estratos.size} estratos, ${L.porEstrato} agregados a la mediana por estrato)`);
if (A.includes('--ensayo')) { console.log('\nEnsayo: no se escribió nada.'); process.exit(0); }

const cabecera = (que) => [
  '# Lista de PRUEBA para medir cualquier cambio de script antes y después (node tools/medir-pipeline.mjs). Sin repetidos.',
  '# GENERADA por `node tools/lotes-prueba.mjs` (la corre tools/generadores.mjs al cerrar cada carga): no se edita a mano; los casos a mano van en prueba-rapida.txt.',
  `# ${que}`,
].join('\n');
const escribir = (n, txt) => { const f = resolve(LOTES, `prueba-${n}.txt`); if (!existsSync(f) || readFileSync(f, 'utf8') !== txt) writeFileSync(f, txt); };
escribir('rapida', `${L.aMano.join('\n').replace(/\n+$/, '')}\n${MARCA_AUTO}\n${L.auto.join('\n')}${L.auto.length ? '\n' : ''}`);
escribir('mediana', `${cabecera('MEDIANA: la rápida + tres documentos por club (el más viejo, el del medio y el más nuevo) + uno de cada estrato (familia × época × moneda × deporte) + al menos 3 por familia.')}\n${L.mediana.join('\n')}\n`);
escribir('completa', `${cabecera('COMPLETA: la mediana + todos los demás documentos con verificación.')}\n${L.completa.join('\n')}\n`);
console.log('\nListas al día: Admin/lotes/prueba-rapida.txt, prueba-mediana.txt y prueba-completa.txt.');
