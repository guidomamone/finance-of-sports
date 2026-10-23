#!/usr/bin/env node
// ============================================================================
// tools/casos-sin-resolver.mjs — EL REGISTRO DE LO QUE UNA TOOL NO PUDO RESOLVER, CON SU CAUSA, y `fos causas` (TODO 387)
// ============================================================================
// El aviso de audit.js dice QUÉ falta; el porqué (sin filas de total, Jev dijo «ninguna», la nota es de otra entidad…) se imprimía en una corrida y se perdía. Las tools lo anotan acá, con una causa de
// código FIJO (una lista corta por tool, no texto libre), y `fos causas` las cuenta: la causa con 3 o más casos de 2 o más clubes es candidata a una regla (el umbral del veredicto general o parche de la skill de
// auditoría, sección 8); la que no llega es un caso de a uno (ajuste manual). Casos → causas → regla medida → menos casos.
//
// Registro: Admin/registros/casos-sin-resolver.jsonl, una línea por cambio: { fecha, tool, club, anio, causa, detalle, doc } o { fecha, tool, club, anio, resuelto: true }.
// Una línea nueva solo si cambió la causa del último registro de ese club-año; un caso que se resuelve deja una línea «resuelto». Las tools escriben SOLO al escribir de verdad (nunca en un ensayo ni en una medición).
//
// USO:  node tools/fos.mjs causas [--tool <nombre>] [--todas]    cuenta los casos que siguen sin resolver por tool y causa (--todas: también las causas de a uno con su detalle)
// DESDE UNA TOOL:  import { registrarCaso, resolverCaso } from './casos-sin-resolver.mjs';
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const ARCHIVO = resolve(ROOT, 'Admin', 'registros', 'casos-sin-resolver.jsonl');
export const UMBRAL = { casos: 3, clubes: 2 }; // el mismo de la sección 8 de auditoria-finance-of-sports: 3 documentos de 2 clubes o más
const hoy = () => new Date().toISOString().slice(0, 10);

export function leerCasos() {
  if (!existsSync(ARCHIVO)) return [];
  return readFileSync(ARCHIVO, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
}
// el último registro de cada (tool, club, año)
function ultimos() {
  const m = new Map();
  for (const c of leerCasos()) m.set(`${c.tool}|${c.club}|${c.anio}`, c);
  return m;
}
export function registrarCaso({ tool, club, anio, causa, detalle = '', doc = null }) {
  if (!tool || !club || !anio || !causa) throw new Error('registrarCaso: faltan tool, club, anio o causa');
  const u = ultimos().get(`${tool}|${club}|${anio}`);
  if (u && !u.resuelto && u.causa === causa) return false;
  appendFileSync(ARCHIVO, JSON.stringify({ fecha: hoy(), tool, club, anio: String(anio), causa, detalle: String(detalle).slice(0, 300), doc }) + '\n');
  return true;
}
export function resolverCaso({ tool, club, anio }) {
  const u = ultimos().get(`${tool}|${club}|${anio}`);
  if (!u || u.resuelto) return false;
  appendFileSync(ARCHIVO, JSON.stringify({ fecha: hoy(), tool, club, anio: String(anio), resuelto: true }) + '\n');
  return true;
}
// los casos que siguen sin resolver, agrupados por tool y causa
export function causas({ tool = null } = {}) {
  const grupos = new Map();
  for (const c of ultimos().values()) {
    if (c.resuelto || (tool && c.tool !== tool)) continue;
    const k = `${c.tool}|${c.causa}`;
    if (!grupos.has(k)) grupos.set(k, { tool: c.tool, causa: c.causa, casos: [] });
    grupos.get(k).casos.push(c);
  }
  return [...grupos.values()].map((g) => {
    const clubes = new Set(g.casos.map((c) => c.club));
    return { ...g, n: g.casos.length, clubes: clubes.size, candidata: g.casos.length >= UMBRAL.casos && clubes.size >= UMBRAL.clubes };
  }).sort((a, b) => b.n - a.n);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const A = process.argv.slice(2);
  const tool = A.includes('--tool') ? A[A.indexOf('--tool') + 1] : null;
  const gs = causas({ tool });
  if (!gs.length) { console.log('No hay casos sin resolver registrados.'); process.exit(0); }
  const total = gs.reduce((s, g) => s + g.n, 0);
  console.log(`${total} casos sin resolver en ${new Set(gs.flatMap((g) => g.casos.map((c) => c.club))).size} clubes\n`);
  for (const g of gs) {
    console.log(`${g.candidata ? 'CANDIDATA A REGLA' : 'de a uno (ajuste manual)'} · ${g.tool} · ${g.causa}: ${g.n} casos de ${g.clubes} club(es)`);
    const ver = A.includes('--todas') || g.candidata ? g.casos : g.casos.slice(0, 2);
    for (const c of ver) console.log(`    ${c.club} ${c.anio}: ${c.detalle.slice(0, 140)}`);
    if (ver.length < g.casos.length) console.log(`    … y ${g.casos.length - ver.length} más (--todas)`);
  }
  console.log(`\nUmbral de regla: ${UMBRAL.casos} casos de ${UMBRAL.clubes} clubes o más (skill de auditoría, sección 8). Una regla es un escalón nuevo, medido con node tools/fos.mjs medir pipeline.`);
}
