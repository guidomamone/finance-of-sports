#!/usr/bin/env node
// ============================================================================
// tools/generar-manifiesto.mjs — EL MANIFIESTO DE VERSIONES DE LOS DATOS.
//
// POR QUÉ. Antes, un solo número (ASSET_V) iba en cada página generada (club/, fuentes/, liga/) y lo leían todos los cargadores de data/: una carga de un club lo subía y
// reescribía unas 740 páginas (más con cada club). Ahora ASSET_V versiona SOLO el código (js/ y css/); la versión de cada archivo de data/ es el hash de su contenido y vive
// en data/manifiesto.js, UN archivo que se carga sin `?v=` (Netlify sirve data/ con must-revalidate y ETag: se revalida en cada visita). Cargar un club cambia el club, su
// club/, su fuentes/ y este manifiesto: no depende de cuántos clubes haya.
//
// QUÉ ESCRIBE. data/manifiesto.js: `window.DATA_VERS = { "data/ar/boca-ar-data.js": "ab12cd34", … };` con todo archivo de data/ que una página pide (.js de data/, y los .json
// de data/correcciones/). Sin los data/schema/ ni el JSON de cada club (dato abierto, ninguna página lo carga) ni el propio manifiesto. window.fosV(ruta) (js/i18n.js) devuelve
// `?v=<hash>` (o `?v=ASSET_V` si la ruta no está) para los cargadores.
//
// USO:  node tools/generar-manifiesto.mjs            (escribe)
//       node tools/generar-manifiesto.mjs --check    (exit 1 si quedó viejo; lo corre audit.js: `manifiesto-desfasado`)
// Va ÚLTIMO entre los generadores de data/ (tools/generadores.mjs): hashea lo que los demás escriben.
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = 'data/manifiesto.js';

function archivos(dir, acum = []) {
  for (const e of readdirSync(resolve(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`;
    if (e.isDirectory()) { if (rel !== 'data/schema') archivos(rel, acum); } else acum.push(rel);
  }
  return acum;
}

export function generar() {
  const rutas = archivos('data').filter((r) => r !== SALIDA && (r.endsWith('.js') || (r.startsWith('data/correcciones/') && r.endsWith('.json')))).sort();
  const filas = rutas.map((r) => `${JSON.stringify(r)}:${JSON.stringify(createHash('sha1').update(readFileSync(resolve(ROOT, r))).digest('hex').slice(0, 8))}`);
  return `// GENERADO por tools/generar-manifiesto.mjs: no editar a mano. La versión (hash del contenido) de cada archivo de data/ que una página pide; ASSET_V es solo del código.\nwindow.DATA_VERS = {\n${filas.join(',\n')}\n};\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const nuevo = generar();
  const actual = existsSync(resolve(ROOT, SALIDA)) ? readFileSync(resolve(ROOT, SALIDA), 'utf8') : null;
  if (process.argv.includes('--check')) {
    if (actual !== nuevo) { console.error(`${SALIDA} desactualizado: node tools/generar-manifiesto.mjs`); process.exit(1); }
    process.exit(0);
  }
  if (actual !== nuevo) { writeFileSync(resolve(ROOT, SALIDA), nuevo); console.log(`${SALIDA} escrito (${nuevo.split('\n').length - 4} archivos)`); } else console.log(`${SALIDA} sin cambios`);
}
