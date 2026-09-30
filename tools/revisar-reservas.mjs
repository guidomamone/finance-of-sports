#!/usr/bin/env node
// ============================================================================
// tools/revisar-reservas.mjs — revisa, GRATIS, las páginas que tools/resolver-inventario.mjs dejó "con reserva" en documentos YA resueltos,
// y las decide con la aritmética del documento cuando se puede.
//
// QUÉ ES UNA PÁGINA "CON RESERVA": las voces (Mistral, Gemini, Claude) no se pusieron de acuerdo y el resolver se quedó con la lectura de
// Claude sin que nadie la confirmara. Hasta la Versión 312 el único desempate gratis era tieScore() (prepare-onboarding.mjs), que solo ve
// filas rotuladas "total", y casi nunca decidía (2 páginas de 1.190).
//
// LA VERSIÓN 313 cambió ese desempate por sumas genéricas de tools/chequeos-gratis.mjs: verticales (una fila = suma de las contiguas) y
// horizontales (en una fila, una celda = combinación con signo de las demás: saldo inicial + altas - bajas = saldo final). Gana la lectura
// con más celdas respaldadas por sumas, si es la única con ese máximo. Medido sobre el historial (2026-09-30): de 163 páginas con reserva
// en 31 documentos, 58 se deciden así; en 47 gana la lectura de Claude (la reserva se levanta) y en 11 gana la lectura ANTERIOR (el
// `previo-*.md`), o sea que el `.md` actual probablemente tiene un error en esas páginas.
//
// Qué hace, por documento (último registro de Admin/transcripciones-verificaciones.jsonl con `reserva` y un `previo` en disco):
//   - por cada página con reserva, compara el puntaje de la lectura actual contra la del `previo-*.md`;
//   - gana la actual -> la reserva se levanta (resolución `sumas`);
//   - gana el previo -> con --aplicar, la página del `.md` se reemplaza por la del previo (el `.md` de antes queda en
//     `<nombre>.antes-sumas.md`), la procedencia de esa página vuelve al motor base y la resolución queda `sumas`;
//   - empate o ninguna suma -> sigue con reserva.
//   Con --aplicar agrega un registro nuevo al historial (mismo formato que el resolver, `reserva` actualizada, sin el campo `jev` para que
//   la próxima corrida del pipeline rehaga la lista de rubros de ese documento, que cambió).
//
// USO:
//   node tools/revisar-reservas.mjs              ensayo: lista qué decidiría (no escribe nada)
//   node tools/revisar-reservas.mjs --aplicar    aplica
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { derivado, ubicar } from './rutas.mjs';
import { tablasDe, respaldoSumas, respaldoFilas } from './chequeos-gratis.mjs';

const root = resolve(import.meta.dirname, '..');
const APLICAR = process.argv.includes('--aplicar');
const verifPath = resolve(root, 'Admin', 'transcripciones-verificaciones.jsonl');
const sha1 = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');

// Mismo partido del .md que resolver-inventario.mjs (splitPages / joinPages), para no perder ni un carácter.
function split(text) {
  const marks = [...text.matchAll(/^--- pág\. (\d+) ---[ \t]*\r?\n?/gm)];
  if (!marks.length) return { pre: text, pages: [] };
  return { pre: text.slice(0, marks[0].index), pages: marks.map((m, i) => ({ n: Number(m[1]), body: text.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : text.length) })) };
}
const join = (pre, pages) => pre + pages.map((p) => `--- pág. ${p.n} ---\n${p.body}`).join('');
// MARGEN: una lectura gana solo si respalda al menos 3 celdas más que la otra (Rubin Kazan pág. 29: 12 contra 10 no alcanza para
// reemplazar una página). Mismo margen que settleByArithmetic() de resolver-inventario.mjs.
const MARGEN = 3;
const puntaje = (body) => { const t = tablasDe(body || ''); return new Set([...respaldoSumas(t).ok, ...respaldoFilas(t).ok]).size; };

const V = readFileSync(verifPath, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
const ultimo = {}; for (const v of V) if (v.md) ultimo[v.md] = v;
const tot = { docs: 0, paginas: 0, levantadas: 0, corregidas: 0, siguen: 0 };
for (const v of Object.values(ultimo)) {
  if (!v.reserva?.length || !v.previo) continue;
  const mdAbs = resolve(root, v.md); const prevAbs = resolve(root, ubicar(v.previo));
  if (!existsSync(mdAbs) || !existsSync(prevAbs) || sha1(mdAbs) !== v.mdSha1) continue; // el .md cambió después: lo revisa la próxima validación
  tot.docs++;
  const cur = split(readFileSync(mdAbs, 'utf8')); const prev = split(readFileSync(prevAbs, 'utf8'));
  const prevBy = new Map(prev.pages.map((p) => [p.n, p.body]));
  const sigue = []; const resol = { ...(v.resolucion || {}) }; const prov = JSON.parse(JSON.stringify(v.proveniencia || { base: null, paginas: {} }));
  const log = [];
  for (const n0 of v.reserva) {
    const n = Number(n0); tot.paginas++;
    const c = cur.pages.find((p) => p.n === n); const a = puntaje(c?.body); const b = puntaje(prevBy.get(n));
    if (a >= b + MARGEN) { tot.levantadas++; resol[n] = 'sumas'; log.push(`pág. ${n}: gana la actual (${a} vs ${b} celdas con sumas)`); }
    else if (b >= a + MARGEN && c && prevBy.has(n)) { tot.corregidas++; resol[n] = 'sumas'; c.body = prevBy.get(n); delete prov.paginas[n]; log.push(`pág. ${n}: gana la ANTERIOR (${b} vs ${a}) -> se reemplaza`); }
    else { tot.siguen++; sigue.push(n0); }
  }
  if (!log.length) continue;
  console.log(`${v.md}\n  ${log.join('\n  ')}${sigue.length ? `\n  siguen con reserva: ${sigue.join(', ')}` : ''}`);
  if (!APLICAR) continue;
  const cambioMd = log.some((l) => l.includes('ANTERIOR'));
  if (cambioMd) { const bak = derivado(mdAbs, '.antes-sumas.md'); if (!existsSync(bak)) copyFileSync(mdAbs, bak); writeFileSync(mdAbs, join(cur.pre, cur.pages)); }
  const { jev, rubros, tieOuts, ...base } = v;
  appendFileSync(verifPath, JSON.stringify({ ...(cambioMd ? base : v), ts: new Date().toISOString(), mdSha1: sha1(mdAbs), reserva: sigue, resolucion: resol, proveniencia: prov, detail: `${v.detail || ''} | revisar-reservas.mjs: ${log.length} página(s) decididas por sumas` }) + '\n');
}
console.log(`\n${tot.docs} documentos con reserva revisados: ${tot.paginas} páginas; ${tot.levantadas} confirmadas por sumas, ${tot.corregidas} corregidas (ganó la lectura anterior), ${tot.siguen} siguen con reserva.${APLICAR ? '' : '\nENSAYO: no se escribió nada. Agregá --aplicar.'}`);
