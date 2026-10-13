// ============================================================================
// tools/data-clubes.js — DÓNDE vive el data file de cada club. La única regla, para todas las tools.
//
// Por qué existe: antes, cada tool armaba `data/${id}-data.js` a mano o listaba `data/` buscando `*-data.js` (~70 lugares en 26 tools).
// Con los data files en carpetas por país (`data/<país>/<clubId>-data.js`, país = código ISO de `clubs.js` en minúscula, igual que
// `data/club-leagues/` y `data/gestiones/`), esa ruta vive SOLO acá. El sitio arma la misma ruta en `loadClubData()` de `index.html`.
//
// USO (CommonJS y ESM):
//   const { rutaData, archivosData, idDeArchivo } = require('./data-clubes.js');
//   import { rutaData, archivosData, idDeArchivo } from './data-clubes.js';
//   rutaData('boca')                        -> 'data/ar/boca-data.js' (relativa a la raíz del repo)
//   rutaData('nuevo-xx', { pais: 'XX' })    -> para un alta, cuando el club todavía no está en clubs.js
//   archivosData()                          -> todos los data files de club, ordenados por nombre de archivo (el orden de siempre)
//   idDeArchivo('data/ar/boca-data.js')     -> 'boca'
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

let paises = null;
function paisDe(clubId) {
  if (!paises) {
    paises = {};
    const s = fs.readFileSync(path.join(DATA, 'clubs.js'), 'utf8');
    for (const m of s.matchAll(/\bid:\s*'([a-z0-9-]+)'[^\n]*?\bcountry:\s*'([A-Z]{2})'/g)) paises[m[1]] = m[2].toLowerCase();
  }
  return paises[clubId] || null;
}

// Un club que no está en clubs.js (y sin `pais`) devuelve la ruta plana, que no existe: un existsSync da false, que es lo correcto.
function rutaData(clubId, { pais } = {}) {
  const p = (pais || '').toLowerCase() || paisDe(clubId);
  return p ? `data/${p}/${clubId}-data.js` : `data/${clubId}-data.js`;
}

function idDeArchivo(rel) {
  return path.basename(rel).replace(/-data\.js$/, '');
}

// Lee los dos lugares posibles (data/ y data/<país>/), así sirve igual antes y después de la mudanza. Orden: por nombre de archivo
// (`<clubId>-data.js`), el mismo que daba el readdirSync().sort() de data/ antes de las carpetas por país.
function archivosData() {
  const out = [];
  for (const e of fs.readdirSync(DATA, { withFileTypes: true })) {
    if (e.isFile() && e.name.endsWith('-data.js')) out.push(`data/${e.name}`);
    else if (e.isDirectory() && /^[a-z]{2}$/.test(e.name)) {
      for (const f of fs.readdirSync(path.join(DATA, e.name))) if (f.endsWith('-data.js')) out.push(`data/${e.name}/${f}`);
    }
  }
  const nombre = (r) => path.basename(r);
  return out.sort((a, b) => (nombre(a) < nombre(b) ? -1 : nombre(a) > nombre(b) ? 1 : 0));
}

exports.rutaData = rutaData;
exports.archivosData = archivosData;
exports.idDeArchivo = idDeArchivo;
exports.paisDe = paisDe;
