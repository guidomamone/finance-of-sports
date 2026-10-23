#!/usr/bin/env node
// ============================================================================
// tools/casos-sin-resolver.mjs — EL REGISTRO DE LO QUE UNA TOOL NO PUDO RESOLVER, CON SU CAUSA, y `fos causas`
// ============================================================================
// El aviso de audit.js dice QUÉ falta; el porqué (sin filas de total, Jev dijo «ninguna», la nota es de otra entidad…) se imprimía en una corrida y se perdía. Las tools lo anotan acá, con una causa de
// código FIJO (una lista corta por tool, no texto libre), y `fos causas` las cuenta: la causa con 3 o más casos de 2 o más clubes es candidata a una regla (el umbral del veredicto general o parche de la skill de
// auditoría, sección 8); la que no llega es un caso de a uno (ajuste manual). Casos → causas → regla medida → menos casos.
//
// Registro: Admin/registros/casos-sin-resolver.jsonl, una línea por cambio: { fecha, tool, club, anio, causa, detalle, doc } o { fecha, tool, club, anio, resuelto: true }.
// Una línea nueva solo si cambió la causa del último registro de ese club-año; un caso que se resuelve deja una línea «resuelto». Las tools escriben SOLO al escribir de verdad (nunca en un ensayo ni en una medición).
//
// USO:  node tools/fos.mjs causas [--tool <nombre>] [--todas] [--rapido] [--cerrar-resueltos]    cuenta los casos que siguen sin resolver por tool y causa (--todas: también las causas de a uno con su detalle).
//       Por defecto cruza con los datos: un caso cuyo año ya tiene el dato o un ajuste manual del documento se cuenta aparte como resuelto; --rapido no cruza; --cerrar-resueltos los cierra en el registro.
// DESDE UNA TOOL:  import { registrarCaso, resolverCaso } from './casos-sin-resolver.mjs';
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { leerJsonClub } from './club-json.mjs';
import { ajustesDe } from './ajustes.mjs';

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
// ¿SIGUE ABIERTO? El registro solo se limpia cuando la propia tool resuelve el año; un año que se resolvió por otra vía (un ajuste `incluye`, una partición
// por sector) quedaba listado como «de a uno» (Aston Villa 2019-20, Instituto 2025). La vara es el dato: el año de ese club tiene ya el dato del que se quejaba la tool
// (costo-personal: `staff_cost` cargado) o un ajuste manual del documento de ese año, posterior al registro, que lo resuelve (`incluye`, `categoria`, `fila`, `desglose`).
// El documento sale de la fuente del año (`sources[].document`); sin él no se afirma nada y el caso sigue abierto.
const AJUSTES_QUE_RESUELVEN = { 'costo-personal': ['incluye', 'categoria', 'fila', 'desglose'] };
function resueltoPorOtraVia(c) {
  const campos = AJUSTES_QUE_RESUELVEN[c.tool]; if (!campos) return false;
  let j; try { j = leerJsonClub(c.club); } catch { return false; }
  const y = (j.years || []).find((x) => String(x.fiscal_year) === String(c.anio)); if (!y) return false;
  if (y.financial?.staff_cost != null) return true;
  const pdf = (j.sources || []).find((s) => s.id === y.source_id)?.document; if (!pdf) return false;
  return ajustesDe(pdf).some((a) => campos.includes(a.campo) && String(a.fecha || '') >= String(c.fecha || ''));
}
// separa los casos abiertos en { vigentes, resueltos }
export function separarResueltos(casos) {
  const vigentes = [], resueltos = [];
  for (const c of casos) (resueltoPorOtraVia(c) ? resueltos : vigentes).push(c);
  return { vigentes, resueltos };
}
// los casos que siguen sin resolver, agrupados por tool y causa (con `auditar`, sin los que ya se resolvieron por otra vía)
export function causas({ tool = null, auditar = false } = {}) {
  const grupos = new Map();
  const abiertos = [...ultimos().values()].filter((c) => !c.resuelto && !(tool && c.tool !== tool));
  const { vigentes } = auditar ? separarResueltos(abiertos) : { vigentes: abiertos };
  for (const c of vigentes) {
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
  const rapido = A.includes('--rapido');
  if (!rapido) {
    const { resueltos } = separarResueltos([...ultimos().values()].filter((c) => !c.resuelto && !(tool && c.tool !== tool)));
    if (resueltos.length) {
      console.log(`${resueltos.length} caso(s) del registro ya resueltos por otra vía (dato cargado o ajuste manual del documento): ${resueltos.map((c) => `${c.club} ${c.anio}`).join(', ')}`);
      if (A.includes('--cerrar-resueltos')) { for (const c of resueltos) resolverCaso({ tool: c.tool, club: c.club, anio: c.anio }); console.log('   cerrados en el registro.'); } else console.log('   (--cerrar-resueltos los cierra en el registro)');
      console.log('');
    }
  }
  const gs = causas({ tool, auditar: !rapido });
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
