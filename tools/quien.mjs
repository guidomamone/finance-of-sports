// ============================================================================
// tools/quien.mjs — DE QUÉ CLUB Y EJERCICIO ES UN PDF, Y QUÉ PDF TODAVÍA NO ESTÁN CARGADOS.
//
// POR QUÉ: son las dos funciones que seguían vivas de tools/onboard.mjs, el onboarding viejo (transcribir con Mistral y Gemini,
// comparar, armar el briefing con prepare-onboarding.mjs), que se archivó en tools/archivo/ junto con prepare-onboarding.mjs. El pipeline es
// pipeline.mjs (etapa 2) + lote.mjs (3 a 8) + cargar.mjs. El código de las dos funciones es el de onboard.mjs, sin cambios.
//
//   --quien <pdf> [--club <clubId>]   JSON en una línea: { clubId, year } o { error }. El club sale de tools/carpetas-clubes.mjs (la cita en
//                                     data/<país>/<id>-data.js o el nombre IGUAL dentro del país; si no, el slug de la carpeta, club nuevo);
//                                     el año, del ajuste manual `anio` o del nombre del archivo (guessYear: el año de CIERRE). Lo usan
//                                     cargar.mjs y chequeos-gratis.mjs.
//   --pendientes [--dir <carpeta>]    una línea "=== <pdf> ===" por cada PDF bajo la carpeta (Clubes/ por defecto) cuyo club y año no están
//                                     cargados en el sitio (o cuyo club/año no se puede saber). Lo usa inventario-transcripciones.mjs.
// ============================================================================
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, basename, relative } from 'node:path';
import vm from 'node:vm';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { ajusteDe } from './ajustes.mjs';
import { rutaData } from './data-clubes.js';

const projectRoot = resolve(import.meta.dirname, '..');

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

// La carpeta del club es la que sigue directo a "Clubes/<País>/", sea cual sea la profundidad del
// archivo debajo de ella (ej. Clubes/Argentina/River/estados-contables-leads/algo.pdf -> "River").
function clubFolderName(absPath) {
  const rel = relative(resolve(projectRoot, 'Clubes'), absPath);
  const parts = rel.split('/');
  return parts.length >= 2 ? parts[1] : null;
}

// El año de CIERRE si el nombre trae un rango ("2021-2022" -> 2022, "2022-23" -> 2023), o el único
// año de 4 dígitos que encuentre.
function guessYear(filename) {
  // BUG REAL (2026-09-29, encontrado al correr las tools de onboarding sobre los 21 documentos del piloto del
  // inventario): "acta-...-2025-12-31.pdf" se leía como el rango "2025-12" -> 2012, y "jaarrekening-2011-06-30"
  // como 2006. Una fecha ISO (AAAA-MM-DD) es la fecha de CIERRE: el año es el primero. Y un sufijo de 2 dígitos solo
  // es "el final de un rango" (2021-22) si es el año siguiente: si no, es otra cosa (un mes, un día).
  const iso = filename.match(/(?<!\d)(\d{4})[-_](0[1-9]|1[0-2])[-_](0[1-9]|[12]\d|3[01])(?!\d)/);
  if (iso) return parseInt(iso[1], 10);
  const range = filename.match(/(\d{4})[-_](\d{2,4})(?!\d)/);
  if (range) {
    const start = parseInt(range[1], 10);
    if (range[2].length === 4) return parseInt(range[2], 10);
    const endYear = parseInt(range[1].slice(0, 2) + range[2], 10);
    if (endYear === start + 1) return endYear;
  }
  const single = filename.match(/(\d{4})/);
  return single ? parseInt(single[1], 10) : null;
}

function findPdfsUnder(dir) {
  const out = [];
  function walk(d) {
    for (const entry of readdirSync(d)) {
      const full = resolve(d, entry);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.pdf$/i.test(entry)) out.push(full);
    }
  }
  walk(dir);
  return out.sort();
}

export function quien(pdfPath, club = null, year = null) {
  // clubDeCarpeta: el club NO salió de carpetas-clubes.mjs (sin cita en un data file ni nombre igual en el sitio) y el id es
  // el nombre de la carpeta normalizado ("paok" para un club todavía sin alta). Ese id no es información sobre el club: cargar.mjs no lo
  // compara con el del alta (frenaba los 40 años de los 7 griegos nuevos con "carpetas-clubes.mjs dice paok-gr y quien.mjs dice paok").
  let clubId = club; let clubDeCarpeta = false;
  if (!clubId) {
    // el club sale de tools/carpetas-clubes.mjs (la cita en data/<país>/<id>-data.js, y si no, nombre IGUAL dentro del mismo país),
    // no de guessClubId() por substring y sin país. Esa regla vieja no reconocía 17 clubes del sitio (Racing, Botafogo, Gent...) y asignaba
    // 11 carpetas a un club EQUIVOCADO en silencio (Porto -> Grêmio, Inter -> Internacional, Lazio y Rubin Kazan -> AZ, Braga ->
    // Bragantino...): si ese club tenía el mismo año cargado, el PDF figuraba como "ya cargado" y el pipeline no lo tocaba nunca.
    const folder = clubFolderName(pdfPath);
    const r = clubDeRuta(pdfPath);
    if (r.clubId) clubId = r.clubId;
    else if (r.via === 'ambigua' && !String(folder).startsWith('_')) return { error: `"${folder}" es ambigua: ${r.fuente} -- pasá --club explícito, no adivino.` };
    else { clubId = normalize(folder || 'club-nuevo').replace(/\s+/g, '-') || 'club-nuevo'; clubDeCarpeta = true; }
  }
  let resolvedYear = year;
  if (!resolvedYear) {
    // escalón 0: ajuste manual `anio` (tools/ajustes.mjs), el mismo que lee alta-club.mjs
    const ajAnio = ajusteDe(relative(projectRoot, resolve(pdfPath)), 'anio');
    resolvedYear = ajAnio ? Number(ajAnio.valor) : guessYear(basename(pdfPath));
    if (!resolvedYear) return { error: 'No pude adivinar el año del nombre del archivo -- pasá --year explícito.' };
  }
  return clubDeCarpeta ? { clubId, year: resolvedYear, clubDeCarpeta } : { clubId, year: resolvedYear };
}

// "¿Esta combinación club+año YA tiene datos cargados en el sitio?" (no "¿existe tal o cual archivo?").
function loadClubYearData(clubId) {
  const dataFile = resolve(projectRoot, rutaData(clubId));
  if (!existsSync(dataFile)) return null;
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  for (const rel of ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js']) {
    const full = resolve(projectRoot, rel);
    if (existsSync(full)) vm.runInContext(readFileSync(full, 'utf8'), ctx, { filename: rel });
  }
  vm.runInContext(readFileSync(dataFile, 'utf8'), ctx, { filename: rutaData(clubId) });
  return vm.runInContext('window.CLUB_GENERIC_DATA', ctx);
}

function yaCargado(clubId, year) {
  try {
    const generic = loadClubYearData(clubId);
    const clubData = generic && generic[clubId];
    if (!clubData) return false;
    const y = String(year);
    return Boolean((clubData.revenueLinesByYear && clubData.revenueLinesByYear[y]) || (clubData.expenseLinesByYear && clubData.expenseLinesByYear[y]));
  } catch {
    return false; // si la carga falla por lo que sea, mejor seguir de largo (falso "no cargado") que frenar por un error de esta tool
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2); const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
  if (args.includes('--quien')) {
    console.log(JSON.stringify(quien(resolve(projectRoot, flag('--quien')), flag('--club'), null)));
  } else if (args.includes('--pendientes')) {
    const dir = resolve(projectRoot, flag('--dir') || 'Clubes');
    for (const pdfPath of findPdfsUnder(dir)) {
      const r = quien(pdfPath, null, null);
      if (r.error || !yaCargado(r.clubId, r.year)) console.log(`=== ${relative(projectRoot, pdfPath)} ===`);
    }
  } else {
    console.error('Uso: node tools/quien.mjs --quien "<pdf>" [--club <clubId>]  |  --pendientes [--dir <carpeta>]'); process.exit(1);
  }
}
