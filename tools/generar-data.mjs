#!/usr/bin/env node
// ============================================================================
// tools/generar-data.mjs — Genera `data/<país>/<id>-data.js` (lo que carga el sitio) desde `data/<país>/<id>.json` (la fuente).
// El JS generado no se edita a mano: si cambia el JSON, se corre esto (las tools de carga ya lo hacen solas al escribir).
//
// USO: node tools/generar-data.mjs               regenera el JS de todos los clubes
//      node tools/generar-data.mjs --club <id>   uno
//      node tools/generar-data.mjs --check       no escribe: sale con 1 si algún JS no es lo que sale de su JSON (lo corre audit.js)
//      node tools/generar-data.mjs --identidad   antes de generar, vuelve a copiar la identidad del club (nombre, país, moneda…) de data/clubs.js a su JSON
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { generarJs, clubes, clubDeFicha } from './json-datos.mjs';
import { serializar } from './club-json.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const check = A.includes('--check'); const solo = flag('--club'); const identidad = A.includes('--identidad');
let n = 0; const viejos = []; const sinJs = [];
for (const d of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true })) {
  if (!d.isDirectory() || !/^[a-z]{2}$/.test(d.name)) continue;
  for (const f of readdirSync(resolve(ROOT, 'data', d.name))) {
    if (!f.endsWith('.json')) continue;
    const id = f.replace(/\.json$/, ''); if (solo && id !== solo) continue;
    const rj = `data/${d.name}/${f}`; const rd = `data/${d.name}/${id}-data.js`;
    const j = JSON.parse(readFileSync(resolve(ROOT, rj), 'utf8')); n++;
    if (identidad) { const c = clubes()[id]; if (c) { j.club = { id, ...clubDeFicha(id, c) }; writeFileSync(resolve(ROOT, rj), serializar(j) + '\n'); } }
    const txt = generarJs(j, { ruta: rj });
    const actual = existsSync(resolve(ROOT, rd)) ? readFileSync(resolve(ROOT, rd), 'utf8') : null;
    if (actual === txt) continue;
    if (check) (actual === null ? sinJs : viejos).push(rd); else writeFileSync(resolve(ROOT, rd), txt);
  }
}
if (check) {
  for (const r of sinJs) console.log(`  ${r}: falta (corré node tools/generar-data.mjs)`);
  for (const r of viejos) console.log(`  ${r}: no es lo que sale de su JSON (se editó a mano, o el JSON cambió sin regenerar: node tools/generar-data.mjs)`);
  // El JSON lleva copia de la identidad del club: la fuente de verdad es data/clubs.js (hace falta antes de elegir un club).
  const cl = clubes(); let desfasados = 0;
  for (const d of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true })) if (d.isDirectory() && /^[a-z]{2}$/.test(d.name)) for (const f of readdirSync(resolve(ROOT, 'data', d.name))) if (f.endsWith('.json')) {
    const id = f.replace(/\.json$/, ''); const j = JSON.parse(readFileSync(resolve(ROOT, 'data', d.name, f), 'utf8')); const c = cl[id];
    if (!c) { console.log(`  data/${d.name}/${f}: el club no está en data/clubs.js`); desfasados++; continue; }
    const mapa = clubDeFicha(id, c);
    for (const [k, v] of Object.entries(mapa)) if (v !== undefined && JSON.stringify(j.club[k]) !== JSON.stringify(v)) { console.log(`  data/${d.name}/${f}: club.${k} = ${JSON.stringify(j.club[k])} y data/clubs.js dice ${JSON.stringify(v)} (regenerá el JSON con tools/generar-data.mjs --identidad)`); desfasados++; break; }
  }
  // El camino inverso: un -data.js sin su JSON (quedó huérfano, o alguien lo escribió a mano) y un id de clubs.js sin JSON.
  let huerfanos = 0; const conJson = new Set();
  for (const d of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true })) if (d.isDirectory() && /^[a-z]{2}$/.test(d.name)) {
    const fs = readdirSync(resolve(ROOT, 'data', d.name));
    for (const f of fs) if (f.endsWith('.json')) conJson.add(f.replace(/\.json$/, ''));
    for (const f of fs) if (f.endsWith('-data.js') && !fs.includes(f.replace(/-data\.js$/, '.json'))) { console.log(`  data/${d.name}/${f}: no tiene su JSON (la fuente es data/${d.name}/${f.replace(/-data\.js$/, '.json')})`); huerfanos++; }
  }
  for (const id of Object.keys(cl)) if (!conJson.has(id)) { console.log(`  data/clubs.js: el club ${id} no tiene data/<país>/${id}.json`); huerfanos++; }
  const mal = sinJs.length + viejos.length + desfasados + huerfanos;
  console.log(mal ? `${mal} desfase(s) entre el JSON, el JS generado y data/clubs.js.` : `${n} clubes: cada JS es lo que sale de su JSON.`);
  process.exit(mal ? 1 : 0);
}
console.log(`${n} data files generados desde su JSON.`);
