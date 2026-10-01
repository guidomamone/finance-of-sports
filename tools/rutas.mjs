// ============================================================================
// tools/rutas.mjs — DÓNDE viven los archivos GENERADOS de cada documento. La única regla, para todas las tools.
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30: "hay miles de files de pilotos... re-organizate y seguimos sobre un pipeline limpio";
// to-do 109): hasta la Versión 316 cada tool escribía sus derivados AL LADO del PDF, en Clubes/<País>/<Club>/, armando la ruta a mano
// (`md.replace(/\.md$/, '.rubros.json')` en ~45 lugares de 19 tools). Resultado: ~2.700 archivos generados mezclados con los PDFs y sus
// transcripciones (1.018 .briefing.json, 754 .rubros.json, 412 .jev.json, 175 .previo-*.md, 113 .mistral-redo.md, 130 -check.md...).
//
// LA REGLA:
//   Clubes/<País>/<Club>/...  = SOLO el documento: el PDF y su transcripción `.md` (lo que manda CLAUDE.md).
//   Generados/<País>/<Club>/... = todo lo que una tool deriva de ese documento, con la MISMA ruta relativa y el mismo nombre base:
//       Clubes/Brasil/Botafogo/demonstracoes-2025.md  ->  Generados/Brasil/Botafogo/demonstracoes-2025.rubros.json
//   Generados/ está gitignoreado (igual que lo estaban esos archivos en Clubes/): se regenera, o es caché de APIs ya pagadas.
//
// Qué es "derivado" (SUFIJOS de abajo): lista de rubros, briefing, respuestas de Jev y de Claude, las transcripciones de otras voces
// (-check, -redo, de tests) y los respaldos (`.previo-*.md`, `.antes-sumas.md`). OJO: varios son CACHÉ de plata ya gastada
// (`.mistral-redo.md`, `.gemini-check.md`, `.claude-check.md`: resolver-inventario.mjs los reusa si existen) o EVIDENCIA de una corrección
// (`.previo-*.md`: lo que había antes de que el resolver reemplazara páginas). Nunca se borran.
//
// COMPATIBILIDAD: el historial (Admin/transcripciones-verificaciones.jsonl, solo se agrega) guarda rutas viejas ("Clubes/.../x.previo-
// mistral.md"). `ubicar(ruta)` traduce cualquier ruta vieja de un derivado a su lugar nuevo; los lectores la usan en vez de la ruta cruda.
//
// USO:
//   import { derivado, ubicar } from './rutas.mjs';
//   derivado('Clubes/X/Y/doc.md', '.rubros.json')   -> 'Generados/X/Y/doc.rubros.json'   (relativa si entra relativa, absoluta si entra absoluta)
//   derivado(pdfAbs, '.gemini-check.md')            -> '/.../Generados/X/Y/doc.gemini-check.md'  (crea la carpeta)
//   ubicar('Clubes/X/Y/doc.previo-mistral.md')        -> 'Generados/X/Y/doc.previo-mistral.md'
//   Una ruta que NO está debajo de Clubes/ (un PDF temporal del resolver en /var/folders) se deja al lado del archivo, como antes.
//
//   node tools/rutas.mjs --mudar [--aplicar]   mueve los derivados que todavía estén en Clubes/ a Generados/ (ensayo sin --aplicar)
// ============================================================================

import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from 'node:fs';
import { resolve, dirname, relative, join, isAbsolute } from 'node:path';

export const ROOT = resolve(import.meta.dirname, '..');
const CLUBES = resolve(ROOT, 'Clubes');
const GENERADOS = resolve(ROOT, 'Generados');

// Terminaciones de archivo que son DERIVADOS (no el documento). El orden no importa; `.md` a secas es el documento y NO está.
export const SUFIJOS_RE = /(\.briefing\.json|\.rubros\.json|\.jev\.json|\.categorias\.json|\.localizar\.json|\.extraccion\.json|\.ubicacion\.json|\.validacion\.json|\.filas\.json|\.verificacion\.json|\.carga\.json|\.previo-[^/]*\.md|\.antes-sumas\.md|\.mistral-redo\.md|\.gemini-check\.md|\.claude-check\.md|\.t-[a-z]+\.md|-mistral-test\.md)$/;

// Nombre base del documento: sin .pdf / .md / sufijo de derivado.
function base(ruta) {
  return String(ruta).replace(SUFIJOS_RE, '').replace(/\.(md|pdf)$/i, '');
}

// Ruta del derivado `sufijo` del documento `ruta` (PDF, .md o cualquier derivado del mismo documento).
export function derivado(ruta, sufijo, { crear = true } = {}) {
  const abs = isAbsolute(ruta) ? ruta : resolve(ROOT, ruta);
  const b = base(abs);
  const rel = relative(CLUBES, b);
  if (rel.startsWith('..') || isAbsolute(rel)) return (isAbsolute(ruta) ? b : relative(ROOT, b)) + sufijo; // fuera de Clubes/: al lado, como antes
  const nuevo = join(GENERADOS, rel) + sufijo;
  if (crear) mkdirSync(dirname(nuevo), { recursive: true });
  return isAbsolute(ruta) ? nuevo : relative(ROOT, nuevo);
}

// Traduce una ruta (posiblemente vieja, guardada en el historial) de un derivado a su lugar actual. Si no es un derivado, la devuelve igual.
export function ubicar(ruta) {
  if (!ruta) return ruta;
  const m = String(ruta).match(SUFIJOS_RE);
  if (!m) return ruta;
  const nuevo = derivado(ruta, m[1], { crear: false });
  const absNuevo = isAbsolute(nuevo) ? nuevo : resolve(ROOT, nuevo);
  const absViejo = isAbsolute(ruta) ? ruta : resolve(ROOT, ruta);
  return existsSync(absNuevo) || !existsSync(absViejo) ? nuevo : ruta;
}

// ---------------------------------------------------------------- mudanza (una vez)
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (!args.includes('--mudar')) { console.error('Uso: node tools/rutas.mjs --mudar [--aplicar]'); process.exit(1); }
  const APLICAR = args.includes('--aplicar');
  const lista = [];
  const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) walk(p); else if (SUFIJOS_RE.test(e.name)) lista.push(p); } };
  walk(CLUBES);
  const por = {}; let choques = 0;
  for (const p of lista) {
    const suf = p.match(SUFIJOS_RE)[1].replace(/previo-[^.]*/, 'previo-*').replace(/\.t-[a-z]+/, '.t-*');
    por[suf] = (por[suf] || 0) + 1;
    const dest = derivado(p, p.match(SUFIJOS_RE)[1], { crear: APLICAR });
    if (existsSync(dest)) { choques++; console.log(`  YA EXISTE, no se mueve: ${relative(ROOT, dest)}`); continue; }
    if (APLICAR) renameSync(p, dest);
  }
  console.log(`${lista.length} derivados en Clubes/ ${APLICAR ? 'movidos' : 'a mover'} a Generados/: ${Object.entries(por).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · ')}${choques ? `; ${choques} ya existían en destino (no se tocaron)` : ''}`);
  if (!APLICAR) console.log('ENSAYO: no se movió nada. Agregá --aplicar.');
}
