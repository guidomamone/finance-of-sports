// tools/audit-cache.js — guarda lo que un chequeo de audit.js calculó de un archivo, para no recalcularlo mientras el archivo no cambie.
// POR QUÉ. Cargar un año toca unos pocos archivos de un club, pero cada auditoría releía miles (checkComaComida lee cada .md de Clubes/, checkArchivoNoEsLoQueDice abre cada PDF, checkNombresSinDefinir corre eslint sobre tools/):
// ~6 de los ~15 s de `audit.js`. Un chequeo que depende solo del CONTENIDO de un archivo da siempre lo mismo para ese contenido, así que se guarda su resultado y no se repite.
// NO CAMBIA NINGÚN CHEQUEO NI SU MENSAJE: el resultado guardado es el mismo cálculo; los hallazgos se vuelven a emitir con `add` en cada corrida.
// LA CLAVE de cada archivo es tamaño + fecha de modificación (el criterio de tools/sello-audit.js) más lo que más influya en el resultado; una tabla entera se descarta si cambia el código de los chequeos (VERSION: el texto de sus
// fuentes), así que tocar un chequeo, rarezas.mjs o la configuración de eslint invalida todo. Un archivo que cambia de contenido cambia de tamaño o de fecha: se recalcula. Un archivo que ya no está se saca de la caja al guardar.
// DÓNDE: .git/fos-audit-cache.json (nunca se commitea). `--sin-cache` (o FOS_SIN_CACHE=1) apaga la caja y hace la auditoría completa, como siempre; `node tools/fos.mjs probar-cache-audit` compara las dos salidas.
// Un cálculo que lanza una excepción no se guarda.
const crypto = require('crypto');
const { fs, path, ROOT, ARGS } = require('./audit-base.js');

const ARCHIVO = path.join(ROOT, '.git', 'fos-audit-cache.json');
const APAGADA = ARGS.includes('--sin-cache') || process.env.FOS_SIN_CACHE === '1';
const FUENTES = ['audit-cache.js', 'audit-chequeos-3.js', 'audit-chequeos-5.js', 'rarezas.mjs', 'indefinidos.mjs', 'eslint.config.mjs', 'package.json'];

let version = null;
const versionDelCodigo = () => version ??= crypto.createHash('sha1').update(FUENTES.map((f) => { try { return fs.readFileSync(path.join(ROOT, 'tools', f)); } catch { return ''; } }).join('\0')).digest('hex');

let datos = null; let sucio = false; const vistos = {};
function caja() {
  if (datos) return datos;
  try { datos = JSON.parse(fs.readFileSync(ARCHIVO, 'utf8')); } catch { datos = {}; }
  if (datos.version !== versionDelCodigo() || typeof datos.tablas !== 'object') { datos = { version: versionDelCodigo(), tablas: {} }; sucio = true; }
  return datos;
}
const firma = (p) => { const st = fs.statSync(p); return `${st.size}:${Math.round(st.mtimeMs)}`; };

// El resultado de `calcular()` para el archivo `p`, de la caja si el archivo no cambió. `extra`: lo demás que influya en el resultado y no sea el contenido de `p` (se suma a la clave).
function porArchivo(tabla, p, extra, calcular) {
  if (APAGADA) return calcular();
  let f; try { f = `${firma(p)}|${extra}`; } catch { return calcular(); }
  const t = (caja().tablas[tabla] ??= {}); (vistos[tabla] ??= new Set()).add(p);
  const e = t[p]; if (e && e.f === f) return e.r;
  const r = calcular(); t[p] = { f, r }; sucio = true; return r;
}

// Un resultado global (no por archivo) para una clave que resume todas sus entradas (p. ej. la firma de todos los archivos de tools/). `sirve(r)`: falso = no se guarda.
function unico(tabla, clave, calcular, sirve = () => true) {
  if (APAGADA) return calcular();
  const t = (caja().tablas[tabla] ??= {}); const e = t.unico;
  if (e && e.f === clave) return e.r;
  const r = calcular(); if (sirve(r)) { t.unico = { f: clave, r }; sucio = true; } return r;
}

// La clave de un conjunto de archivos: el hash de su firma (tamaño + fecha) de cada uno.
function firmaDeArchivos(rutas) {
  const h = crypto.createHash('sha1');
  for (const p of rutas) { try { h.update(`${p}:${firma(p)}\n`); } catch { h.update(`${p}:falta\n`); } }
  return h.digest('hex');
}

function guardar() {
  if (APAGADA || !datos || !sucio) return;
  for (const [tabla, t] of Object.entries(datos.tablas)) if (vistos[tabla]) for (const p of Object.keys(t)) if (p !== 'unico' && !vistos[tabla].has(p)) delete t[p]; // un archivo que ya no está
  try { fs.writeFileSync(`${ARCHIVO}.tmp`, JSON.stringify(datos)); fs.renameSync(`${ARCHIVO}.tmp`, ARCHIVO); } catch { /* sin .git escribible: sin caja */ }
}
process.on('exit', guardar);

module.exports = { porArchivo, unico, firmaDeArchivos, APAGADA };
