#!/usr/bin/env node
// ============================================================================
// tools/mover-notas-fuentes.mjs — saca el campo `note` (la nota INTERNA de una fuente) de `sources{}` en data/ y lo pasa a la evidencia
// del club, Admin/carga-clubes/<clubId>.md, "## Fuentes" / "### <sourceId>" (to-do 209). `publicNote` (la que ve el lector) no se toca.
//
//   node tools/mover-notas-fuentes.mjs                 escribe data/ y Admin/carga-clubes/
//   node tools/mover-notas-fuentes.mjs --ensayo <dir>  escribe todo en <dir>, no toca el repo
//
// SEGURIDAD: cada archivo se ejecuta antes y después en un contexto `vm` aislado y lo que define (sources, clubs, CLUB_GENERIC_DATA,
// memberCountByClub, gestionesByClub) tiene que dar idéntico salvo por los `note` que se sacaron; y cada nota tiene que estar, tal cual,
// en el .md de su club. Si algo no da, no escribe nada.
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import * as EV from './evidencia-club.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const ensayo = args.includes('--ensayo') ? args[args.indexOf('--ensayo') + 1] : null;

function evaluar(rel, src) {
  const esClubs = rel === 'data/clubs.js';
  const sb = esClubs ? { window: {} } : { window: {}, sources: {}, memberCountByClub: {}, gestionesByClub: {} };
  sb.window.CLUB_GENERIC_DATA = {};
  const ctx = vm.createContext(sb);
  return JSON.parse(vm.runInContext(`${src}\n;JSON.stringify({ s: typeof sources !== 'undefined' ? sources : null, c: typeof clubs !== 'undefined' ? clubs : null,
    g: window.CLUB_GENERIC_DATA, m: typeof memberCountByClub !== 'undefined' ? memberCountByClub : null, ge: typeof gestionesByClub !== 'undefined' ? gestionesByClub : null })`, ctx, { filename: rel }));
}
const desescapar = (t) => t.replace(/\\(.)/g, '$1');

const archivos = ['data/clubs.js', ...fs.readdirSync(path.join(ROOT, 'data')).filter((f) => f.endsWith('-data.js')).sort().map((f) => `data/${f}`)];
const errores = []; const nuevos = {}; const mds = {}; let n = 0; const saltados = [];
for (const rel of archivos) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const re = /\bnote\s*:\s*'((?:\\.|[^'\\])*)'\s*,?[ \t]*/g;
  const hits = [...src.matchAll(re)];
  if (!hits.length) continue;
  const antes = evaluar(rel, src);
  let nuevo = '', last = 0;
  for (const h of hits) {
    // el objeto que lo contiene: desde el último cierre de objeto ("},") antes del note; adentro tiene que estar su `id`
    const atras = src.slice(Math.max(0, h.index - 6000), h.index);
    const desde = Math.max(atras.lastIndexOf('},'), atras.lastIndexOf('{\n') - 200, 0);
    const idm = [...atras.slice(desde).matchAll(/\bid\s*:\s*'([^']+)'/g)].pop();
    const id = idm && idm[1]; const texto = desescapar(h[1]);
    const fuente = id && (antes.s || {})[id];
    // un `note` que no es de una fuente de sources{} (ej. la nota PÚBLICA de una card de presupuesto) no se toca
    if (!fuente || fuente.note !== texto) { saltados.push(`${rel}: ${texto.slice(0, 60)}`); continue; }
    const clubId = fuente.clubId || rel.replace(/^data\/|-data\.js$/g, '');
    mds[clubId] = EV.agregarFuente(mds[clubId] ?? EV.leer(clubId), id, [texto], 'note (data/)');
    if (!mds[clubId].includes(texto)) errores.push(`${rel}: el note de ${id} no llegó a ${clubId}.md`);
    // la línea entera si el note estaba solo; si no, solo `note:'…',`
    const ls = src.lastIndexOf('\n', h.index - 1) + 1; const le = src.indexOf('\n', h.index + h[0].length);
    const solo = src.slice(ls, h.index).trim() === '' && src.slice(h.index + h[0].length, le < 0 ? src.length : le).trim() === '';
    if (solo) { nuevo += src.slice(last, ls); last = le < 0 ? src.length : le + 1; }
    else { nuevo += src.slice(last, h.index); last = h.index + h[0].length; }
    n++;
  }
  nuevo += src.slice(last);
  const despues = evaluar(rel, nuevo);
  for (const f of Object.values(antes.s || {})) delete f.note;
  if (JSON.stringify(antes) !== JSON.stringify(despues)) errores.push(`${rel}: lo que define el archivo cambió más allá de los note`);
  nuevos[rel] = nuevo;
}
if (errores.length) { console.log(`NO se escribió nada:\n  ${errores.slice(0, 15).join('\n  ')}`); process.exit(1); }
const base = ensayo || ROOT;
const w = (r, t) => { const p = path.join(base, r); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); };
for (const [rel, t] of Object.entries(nuevos)) w(rel, t);
for (const [id, md] of Object.entries(mds)) w(EV.rutaRel(id), md);
console.log(`${n} notas de ${Object.keys(nuevos).length} archivos a ${Object.keys(mds).length} evidencias${ensayo ? ` (ENSAYO en ${ensayo})` : ''}.`);
console.log(`${saltados.length} \`note\` que no son de sources{} quedan donde están:`); for (const x of saltados) console.log(`  ${x}`);
