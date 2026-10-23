#!/usr/bin/env node
// ============================================================================
// tools/publicar.mjs — PUBLICAR después de editar a mano.
//
// POR QUÉ. cargar.mjs y alta-club.mjs suben ASSET_V y corren los generadores solos al escribir. Pero una edición a mano del JSON de un club
// (la fuente de un año: título, url, nota pública; un dato corregido) deja el data file, las páginas de fuentes y club/, y el ASSET_V
// desfasados: audit.js da P1 (asset-v-sin-subir, fuentes y páginas desactualizadas) y no había un comando para ponerlo al día. Se hacía a
// mano: sed sobre index.html (la constante y cada ?v=) y cada generador, uno por uno. Este comando es lo mismo que hace el cierre de una carga.
//
// QUÉ HACE (en este orden, el mismo de cargar.mjs):
//   1. node tools/generar-data.mjs          el data file de cada club desde su JSON (la fuente es el JSON)
//   2. sube ASSET_V UNA vez (la constante y cada ?v= literal), salvo que ya esté subido respecto de HEAD
//   3. los generadores de tools/generadores.mjs (índices, fuentes, rankings, páginas de club y liga...)
//   4. node tools/audit.js --quiet; si da P0 o P1 REVIERTE lo que cambió desde que arrancó este comando (los pasos 1-3), NO tu edición a mano
//
// USO:   node tools/publicar.mjs            (hace los 4 pasos)
//        node tools/publicar.mjs --ensayo   (dice qué haría: ASSET_V actual contra HEAD y la lista de generadores; no escribe)
// ============================================================================
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { GENERADORES } from './generadores.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ENSAYO = process.argv.includes('--ensayo'); // ANTES de importar cargar.mjs: al importarse recorta process.argv
const { snapshot, publicarCambios, revertir, runNode } = await import('./cargar.mjs');
const asset = (txt) => ((txt || '').match(/window\.ASSET_V\s*=\s*'([^']+)'/) || [])[1] || null;

const actual = asset(readFileSync(resolve(ROOT, 'index.html'), 'utf8'));
let enHead = null;
try { enHead = asset(execFileSync('git', ['show', 'HEAD:index.html'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] })); } catch { /* sin HEAD */ }
const sube = actual && (enHead === null || enHead === actual);

if (ENSAYO) {
  console.log(`ENSAYO de publicar: generar-data.mjs; ASSET_V ${actual} (HEAD ${enHead}) → ${sube ? 'se sube una vez' : 'ya está subido: no se toca'}; generadores: ${GENERADORES.filter((g) => existsSync(resolve(ROOT, g))).join(', ')}; node tools/audit.js --quiet.`);
  process.exit(0);
}

const snap = snapshot();
const escritos = [];
const gd = runNode('tools/generar-data.mjs', []);
if (gd.code !== 0) { const rv = revertir(snap, []); console.error(`generar-data.mjs falló (código ${gd.code}): ${gd.out.slice(-500)}\nSe revirtió lo que cambió (${rv.restaurados} restaurados, ${rv.borrados} borrados).`); process.exit(1); }
let r;
try { r = publicarCambios(snap, [], escritos); }
catch (e) { const rv = revertir(snap, []); console.error(`${e.message}\nSe revirtió lo que cambió (${rv.restaurados} restaurados, ${rv.borrados} borrados).`); process.exit(1); }
if (!r.ok) { console.error(`NO publicado: ${r.motivo}`); process.exit(1); }
console.log(`Publicado. ${escritos.join('; ') || 'ASSET_V ya estaba subido'}. Auditoría: ${r.audit}.`);
