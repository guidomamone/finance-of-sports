#!/usr/bin/env node
// ============================================================================
// tools/medir-ixbrl-consolidado.mjs — ¿alcanza lo cargado para decidir si el chequeo iXBRL FRENA también en el perímetro consolidado? (condición de la Auditora 5)
//
// POR QUÉ. `cargar.mjs` frena si el resultado cargado de un año INDIVIDUAL no coincide con el `ProfitLoss` etiquetado en el XHTML (medido: 9 clubes, 0 falsos frenos), pero en el CONSOLIDADO solo avisa: el
// ProfitLoss de un grupo con minoritarios incluye la parte no controladora y lo cargado podría ser la atribuible. Antes de pasarlo a freno hay que haberlo visto en dos años consolidados de clubes
// distintos, uno de ellos con minoritarios. Esta tool recorre los .xhtml de Clubes/, toma los que traen un `ProfitLoss` con el eje de grupo (el mismo que lee ixbrl-resultado.mjs) y, si el club tiene
// cargado ese cierre, compara con el resultado cargado.
//
// IMPRIME: cuántos años consolidados hay para comparar (cargados, de cuántos clubes, cuántos con minoritarios, cuántos coinciden) y si ya se puede decidir. Se corre de nuevo cuando se cargan clubes
// con cuentas de grupo (los británicos que esperan el conversor, Admin/TODO.md 356).
// USO: node tools/medir-ixbrl-consolidado.mjs [--detalle]
// ============================================================================
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, basename, dirname } from 'node:path';
import { hechos, grupo, leerXhtmlTexto } from './ixbrl-resultado.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const DETALLE = process.argv.includes('--detalle');
// carpeta de Clubes/ -> clubId, por la evidencia de carga (la primera ruta de Clubes/ que cita)
const carpetaClub = new Map();
for (const f of readdirSync(join(ROOT, 'Admin', 'carga-clubes'))) {
  const m = readFileSync(join(ROOT, 'Admin', 'carga-clubes', f), 'utf8').match(/Clubes\/([^/\n]+)\/([^/\n]+)\//);
  if (m) carpetaClub.set(`${m[1]}/${m[2]}`, f.replace(/\.md$/, ''));
}
const clubJson = (id) => { for (const d of readdirSync(join(ROOT, 'data'))) { const p = join(ROOT, 'data', d, `${id}.json`); if (existsSync(p)) return JSON.parse(readFileSync(p, 'utf8')); } return null; };
const xhtmls = [];
(function walk(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.xhtml')) xhtmls.push(f); } })(join(ROOT, 'Clubes'));

const filas = [];
for (const x of xhtmls) {
  let src; try { src = leerXhtmlTexto(x); } catch { continue; }
  if (!/ProfitLoss/.test(src)) continue;
  for (const fin of [...new Set([...src.matchAll(/<(?:[\w-]+:)?endDate>\s*([\d-]+)\s*</g)].map((m) => m[1]))].sort().reverse()) {
    const g = hechos(src, 'ProfitLoss', fin, grupo).filter((h) => h.valor != null);
    if (!g.length) continue;
    const id = carpetaClub.get(`${basename(dirname(dirname(x)))}/${basename(dirname(x))}`);
    const y = id ? (clubJson(id)?.years || []).find((a) => a.period_end === fin) : null;
    const minoritarios = hechos(src, 'ProfitLossAttributableToNoncontrollingInterests', fin, grupo).some((h) => h.valor) || /NoncontrollingInterestsMember/.test(src);
    filas.push({ archivo: x.slice(ROOT.length + 1), fin, grupo: g[0].valor / 1e6, tol: g[0].tolM, id, cargado: y?.official_totals?.net_result ?? null, minoritarios });
    break; // el cierre más reciente con hecho de grupo alcanza por archivo
  }
}
const comparables = filas.filter((r) => r.cargado != null);
const coinciden = comparables.filter((r) => Math.abs(r.cargado - r.grupo) <= (r.tol || 0) + 1e-6);
const clubes = new Set(comparables.map((r) => r.id)); const conMinoritarios = comparables.filter((r) => r.minoritarios);
if (DETALLE) for (const r of filas) console.log(`${r.archivo} | cierre ${r.fin} | grupo ${r.grupo} | club ${r.id ?? '(no cargado)'} | cargado ${r.cargado ?? '-'}${r.cargado != null ? (coinciden.includes(r) ? ' = IGUAL' : ' DIFIERE') : ''}${r.minoritarios ? ' | con minoritarios' : ''}`);
console.log(`XHTML con ProfitLoss de grupo: ${filas.length} de ${xhtmls.length} (${new Set(filas.map((r) => dirname(r.archivo))).size} carpetas de club)`);
console.log(`años consolidados con algo cargado para comparar: ${comparables.length} de ${clubes.size} clubes · coinciden ${coinciden.length} · con minoritarios ${conMinoritarios.length}`);
const listo = clubes.size >= 2 && conMinoritarios.length >= 1;
console.log(listo ? 'Se puede decidir si el consolidado frena (2 clubes o más y uno con minoritarios).' : 'TODAVÍA NO se puede decidir: hacen falta años consolidados cargados de al menos 2 clubes y uno con minoritarios. El consolidado sigue como aviso.');
