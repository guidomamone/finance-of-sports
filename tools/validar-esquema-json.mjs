#!/usr/bin/env node
// ============================================================================
// tools/validar-esquema-json.mjs — Valida los JSON de club contra el esquema de Admin/mediciones/245-esquema.md:
// claves permitidas y obligatorias, tipos, años ordenados y sin repetir, source_id y management_id que existan, moneda ISO, fechas, importes finitos y
// categorías que estén en data/category-map.js. Solo lectura.
//
// ERRORES (el JSON no cumple el esquema) y AVISOS (cumple, pero el dato tiene algo raro: una categoría de gasto en una línea de ingresos, una fuente o una gestión
// que vive fuera del archivo). Sale con código 1 solo si hay errores.
// USO: node tools/validar-esquema-json.mjs [carpeta | archivo.json ...] [--avisos]   (default: el JSON de cada club, data/<país>/<id>.json).
// ============================================================================
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { validar, categoriasDelSitio, referenciasExternas } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const lista = [];
const walk = (p) => { if (statSync(p).isDirectory()) for (const f of readdirSync(p).sort()) walk(join(p, f)); else if (p.endsWith('.json')) lista.push(p); };
if (args.length) args.forEach((a) => walk(resolve(a)));
else for (const d of readdirSync(resolve(ROOT, 'data'), { withFileTypes: true })) if (d.isDirectory() && /^[a-z]{2}$/.test(d.name)) walk(resolve(ROOT, 'data', d.name));
const categorias = categoriasDelSitio(); const externos = referenciasExternas(); let mal = 0, conAvisos = 0, totalAvisos = 0; const A = process.argv.slice(2);
for (const f of lista) {
  let r; try { r = validar(JSON.parse(readFileSync(f, 'utf8')), { categorias, externos }); } catch (x) { r = { errores: [`no se pudo leer: ${x.message}`], avisos: [] }; }
  if (r.errores.length) { mal++; console.log(`ERROR ${f.replace(ROOT + '/', '')}`); for (const m of r.errores.slice(0, 8)) console.log(`   ${m}`); if (r.errores.length > 8) console.log(`   ... y ${r.errores.length - 8} más`); }
  if (r.avisos.length) { conAvisos++; totalAvisos += r.avisos.length; if (A.includes('--avisos')) { console.log(`AVISO ${f.replace(ROOT + '/', '')}`); for (const m of r.avisos.slice(0, 5)) console.log(`   ${m}`); } }
}
console.log(`${lista.length} archivos, ${lista.length - mal} válidos, ${mal} con errores; ${conAvisos} con avisos (${totalAvisos} avisos; --avisos los lista)`);
process.exit(mal ? 1 : 0);
