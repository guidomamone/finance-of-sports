#!/usr/bin/env node
// ============================================================================
// tools/onboard.mjs — el UN comando que corre TODO el pipeline, pensado para
// que Guido lo pegue en su terminal y no tenga que tocar nada more. Encadena:
//   1. tools/mistral-ocr-transcribe.mjs        -- transcribe con Mistral
//   2. tools/gemini-transcribe.mjs (--out-suffix .gemini-check) -- transcribe
//      con Gemini EN PARALELO, siempre, no solo para lo marcado escaneado
//      (a partir de la Versión 302: una sesión en worktree corrió el
//      comparativo Mistral-vs-Gemini que pedía el to-do 106 y el resultado
//      fue "ninguna es mejor en general" -- cada motor se equivoca en celdas
//      DISTINTAS, así que la señal útil no es "cuál elegir de default" sino
//      "¿están de acuerdo en ESTE documento puntual?")
//   3. tools/compare-transcripts.mjs           -- ¿coinciden en los números?
//      - SI coinciden: sigue solo al paso 4, sin pausa.
//      - Si NO coinciden: PARA ACÁ. No corre prepare-onboarding, no llama a
//        Claude automáticamente -- deja los 2 .md listos para cuando Guido
//        convoque a Claude a resolverlo a mano contra el PDF. Los 2 archivos
//        quedan en el filesystem, nada se borra.
//   4. tools/prepare-onboarding.mjs            -- UN briefing.json, solo si
//      el paso 3 dio match.
//
// 0 tokens de Claude corriendo esto -- mismo criterio que las 2 tools de
// transcripción (CLAUDE.md "Cada PDF nuevo").
//
// ESTE COMANDO NO ES ESPECÍFICO DE NINGÚN CLUB -- corre sobre CUALQUIER PDF
// que le pases (el ejemplo de abajo con River es solo para mostrar la
// sintaxis). El uso real es: cada vez que tengas un PDF nuevo, pasale ESE
// archivo; o corré --all sobre una carpeta para procesar todo lo pendiente
// de una vez.
//
// SIN TOCAR NADA YA CARGADO (pedido explícito de Guido, 2026-09-29): antes
// de tocar Mistral o Gemini para NINGÚN documento, este script resuelve
// club+año y chequea si data/<clubId>-data.js YA tiene ese ejercicio cargado
// -- si sí, lo salta ENTERO (ni transcribe, ni compara, ni gasta un solo
// dólar de API) con el mensaje "Ya cargado ... no lo toco". Esto es lo que
// hace seguro correr `--all` sobre TODO Clubes/: los ~305 ejercicios ya
// onboardeados y verificados a mano NO se vuelven a mandar a Gemini solo
// porque nunca existió un archivo de chequeo para ellos -- el criterio es
// "¿está cargado en el sitio?", no "¿existe tal o cual archivo local?".
// Corré `--dry-run` primero sobre una carpeta grande si querés ver qué
// saltearía antes de gastar nada de verdad.
//
// USO:
//   Un solo documento nuevo (ejemplo de sintaxis, no literal -- reemplazá
//   por el PDF que tengas):
//     node tools/onboard.mjs "Clubes/Argentina/River/estados-contables-2021-2022.pdf" --club river --year 2022
//
//   Si no pasás --club, lo adivina comparando el nombre de la CARPETA del
//   club (`Clubes/<País>/<Carpeta>/archivo.pdf`) contra `data/clubs.js` --
//   solo si hay 1 sola coincidencia clara (avisa qué adivinó); con 0 o 2+
//   para y pide --club explícito (nunca adivina a ciegas un id que ya
//   existe -- probado con un caso real: "Racing" matchea tanto a Racing
//   Club como a Genk, cuyo nombre legal belga incluye "Racing").
//
//   Si no pasás --year, lo saca del NOMBRE DEL ARCHIVO (año de CIERRE si hay
//   un rango) -- a diferencia del club, esto SÍ se adivina siempre: además
//   de la búsqueda de liga cacheada (bajo riesgo si sale mal), ahora TAMBIÉN
//   decide si un ejercicio ya está cargado -- ver el párrafo de arriba. Si
//   el nombre del archivo no sugiere ningún año, hay que pasar --year.
//
//   Lote (todo lo que exista bajo Clubes/, o una subcarpeta con --dir --
//   SÍ es seguro correrlo sobre TODO Clubes/, ver el párrafo de arriba):
//     node tools/onboard.mjs --all [--dir Clubes/Colombia] [--limit 50]
//   En modo lote, --club/--year no aplican (cada documento adivina el suyo).
//   Un documento con discrepancia sin resolver se vuelve a listar cada vez
//   que se corre --all (no cuesta nada, es comparación local) hasta que
//   alguien lo resuelva.
//
//   --dry-run: no llama a ninguna API ni corre nada, solo muestra qué haría.
// ============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, basename, extname, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const projectRoot = resolve(import.meta.dirname, '..');
const GEMINI_CHECK_SUFFIX = '.gemini-check';

function usage() {
  console.error([
    'Uso: node tools/onboard.mjs "<archivo.pdf>" [--club <clubId>] [--year <año>] [--dry-run]',
    '   o: node tools/onboard.mjs --all [--dir Clubes/Colombia] [--limit 50] [--concurrency 2] [--dry-run]',
  ].join('\n'));
  process.exit(1);
}

function runVisible(scriptRelPath, args) {
  // A diferencia de las tools que corren capturado (ver runCapture), Mistral/Gemini corren con la
  // salida VISIBLE en vivo -- son pasos largos (minutos en --all) y Guido quiere ver el progreso.
  try {
    execFileSync('node', [resolve(projectRoot, scriptRelPath), ...args], { stdio: 'inherit' });
    return { code: 0 };
  } catch (err) {
    return { code: err.status ?? 1 };
  }
}

function runCapture(scriptRelPath, args) {
  try {
    const stdout = execFileSync('node', [resolve(projectRoot, scriptRelPath), ...args], {
      encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '' };
  } catch (err) {
    return { code: err.status ?? 1, stdout: err.stdout || '', stderr: err.stderr || String(err.message || '') };
  }
}

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function loadClubsTable() {
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const code = readFileSync(resolve(projectRoot, 'data', 'clubs.js'), 'utf8');
  vm.runInContext(code, ctx, { filename: 'data/clubs.js' });
  return vm.runInContext('clubs', ctx);
}

// La carpeta del club es la que sigue directo a "Clubes/<País>/", sea cual sea la profundidad del
// archivo debajo de ella (ej. Clubes/Argentina/River/estados-contables-leads/algo.pdf -> "River").
function clubFolderName(absPath) {
  const rel = relative(resolve(projectRoot, 'Clubes'), absPath);
  const parts = rel.split('/');
  return parts.length >= 2 ? parts[1] : null;
}

// Nunca adivina a ciegas: si hay 0 o 2+ coincidencias, devuelve [] y quien llama tiene que pedir
// --club explícito. Un club que todavía NO está onboardeado da 0 coincidencias a propósito.
function guessClubId(folderName, clubsTable) {
  if (!folderName) return { matches: [] };
  const target = normalize(folderName);
  const matches = [];
  for (const [id, club] of Object.entries(clubsTable)) {
    const candidates = [club.displayName, club.name].filter(Boolean).map(normalize);
    if (candidates.some((c) => c === target || c.includes(target) || target.includes(c))) matches.push(id);
  }
  return { matches: [...new Set(matches)] };
}

// El año de CIERRE si el nombre trae un rango ("2021-2022" -> 2022, "2022-23" -> 2023), o el único
// año de 4 dígitos que encuentre.
function guessYear(filename) {
  const range = filename.match(/(\d{4})[-_](\d{2,4})(?!\d)/);
  if (range) {
    const endYear = range[2].length === 2 ? range[1].slice(0, 2) + range[2] : range[2];
    return parseInt(endYear, 10);
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

function briefingIsFresh(mdPath) {
  const briefingPath = resolve(dirname(mdPath), `${basename(mdPath, extname(mdPath))}.briefing.json`);
  if (!existsSync(briefingPath)) return false;
  return statSync(briefingPath).mtimeMs >= statSync(mdPath).mtimeMs;
}

function resolveClubAndYear(pdfPath, club, year) {
  let clubId = club;
  if (!clubId) {
    const clubsTable = loadClubsTable();
    const folder = clubFolderName(pdfPath);
    const { matches } = guessClubId(folder, clubsTable);
    if (matches.length === 1) {
      clubId = matches[0];
      console.log(`  club adivinado por carpeta ("${folder}"): ${clubId}`);
    } else if (matches.length > 1) {
      console.error(`  "${folder}" matchea ${matches.length} clubes (${matches.join(', ')}) -- pasá --club explícito, no adivino.`);
      return null;
    } else {
      // 0 coincidencias: probablemente un club todavía no onboardeado. Nombre de carpeta
      // normalizado como clubId PROVISORIO, solo para etiquetar -- prepare-onboarding.mjs ya avisa
      // "no existe data/<id>-data.js" en ese caso, no hay riesgo de confundirlo con uno real.
      clubId = normalize(folder || 'club-nuevo').replace(/\s+/g, '-') || 'club-nuevo';
      console.log(`  "${folder}" no matchea ningún club ya cargado -- club nuevo, uso "${clubId}" como etiqueta provisoria.`);
    }
  }

  let resolvedYear = year;
  if (!resolvedYear) {
    resolvedYear = guessYear(basename(pdfPath));
    if (!resolvedYear) {
      console.error('  No pude adivinar el año del nombre del archivo -- pasá --year explícito.');
      return null;
    }
    console.log(`  año adivinado del nombre del archivo: ${resolvedYear} (sin verificar contra el documento)`);
  }
  return { clubId, year: resolvedYear };
}

// BUG REAL DE DISEÑO encontrado por Guido antes de correr esto de verdad: sin este chequeo, un
// `--all` sobre TODO Clubes/ mandaría a transcribir con Gemini (plata real) cada PDF ya
// onboardeado y verificado hace tiempo, solo porque nunca existió un .gemini-check.md para esos --
// el criterio "¿existe el archivo de chequeo?" no distingue "nunca se hizo la comparación" de "está
// verificado desde antes de que este flujo existiera". El criterio real tiene que ser "¿esta
// combinación club+año YA tiene datos cargados en el sitio?", no "¿existe tal o cual archivo".
function loadClubYearData(clubId) {
  const dataFile = resolve(projectRoot, 'data', `${clubId}-data.js`);
  if (!existsSync(dataFile)) return null;
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  for (const rel of ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js']) {
    const full = resolve(projectRoot, rel);
    if (existsSync(full)) vm.runInContext(readFileSync(full, 'utf8'), ctx, { filename: rel });
  }
  vm.runInContext(readFileSync(dataFile, 'utf8'), ctx, { filename: `data/${clubId}-data.js` });
  return vm.runInContext('window.CLUB_GENERIC_DATA', ctx);
}

function isAlreadyOnboarded(clubId, year) {
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

function transcribeIfMissing(pdfPath, mdPath, { dryRun, label, scriptRelPath, extraArgs, alreadyMsg }) {
  if (existsSync(mdPath)) {
    console.log(`  ${alreadyMsg}`);
    return true;
  }
  if (dryRun) {
    const extra = extraArgs.length ? ' ' + extraArgs.join(' ') : '';
    console.log(`  [dry-run] node ${scriptRelPath} "${relative(projectRoot, pdfPath)}"${extra}`);
    return false; // en dry-run nunca "existe" de verdad, no sigas a los pasos de después
  }
  console.log(`  ${label}...`);
  runVisible(scriptRelPath, [pdfPath, ...extraArgs]);
  return existsSync(mdPath);
}

function processOne(pdfPath, { club, year, dryRun, verbose = true }) {
  const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
  const geminiCheckPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + GEMINI_CHECK_SUFFIX + '.md');
  const relPdf = relative(projectRoot, pdfPath);

  console.log(`\n=== ${relPdf} ===`);

  // Resolver club/año PRIMERO, antes de tocar ninguna API: es lo único que permite chequear si
  // esto ya está cargado y verificado, y no tiene sentido gastar en Gemini si la respuesta es sí.
  const resolved = resolveClubAndYear(pdfPath, club, year);
  if (!resolved) return;
  if (isAlreadyOnboarded(resolved.clubId, resolved.year)) {
    console.log(`  Ya cargado en data/${resolved.clubId}-data.js, ejercicio ${resolved.year} -- no lo toco (ni Mistral ni Gemini).`);
    return;
  }

  const hasMistral = transcribeIfMissing(pdfPath, mdPath, {
    dryRun, label: 'Transcribiendo con Mistral OCR', scriptRelPath: 'tools/mistral-ocr-transcribe.mjs',
    extraArgs: [], alreadyMsg: 'Ya tiene .md de Mistral, no vuelvo a transcribir.',
  });
  const hasGemini = transcribeIfMissing(pdfPath, geminiCheckPath, {
    dryRun, label: 'Transcribiendo con Gemini (chequeo en paralelo)', scriptRelPath: 'tools/gemini-transcribe.mjs',
    extraArgs: ['--out-suffix', GEMINI_CHECK_SUFFIX], alreadyMsg: 'Ya tiene el chequeo de Gemini, no vuelvo a transcribir.',
  });

  if (dryRun) {
    console.log(`  [dry-run] node tools/compare-transcripts.mjs "${mdPath}" "${geminiCheckPath}"`);
    console.log(`  [dry-run] si coinciden: node tools/prepare-onboarding.mjs ${resolved.clubId} ${resolved.year} "${mdPath}"`);
    return;
  }
  if (!hasMistral || !hasGemini) {
    console.error('  Falta alguna de las 2 transcripciones -- no puedo comparar, no sigo con este documento.');
    return;
  }

  const cmp = runCapture('tools/compare-transcripts.mjs', [mdPath, geminiCheckPath, '--json']);
  let cmpResult;
  try { cmpResult = JSON.parse(cmp.stdout); } catch {
    console.error(`  compare-transcripts.mjs no devolvió JSON parseable: ${cmp.stderr || cmp.stdout}`.slice(0, 500));
    return;
  }

  if (!cmpResult.match) {
    console.log(`  DISCREPANCIA: Mistral y Gemini no coinciden en ${cmpResult.mismatches.length} rubro(s).`);
    if (verbose) {
      cmpResult.mismatches.forEach((m) => {
        console.log(`    "${m.label}" -- Mistral: ${JSON.stringify(m.valuesA)} | Gemini: ${JSON.stringify(m.valuesB)}`);
      });
    } else {
      cmpResult.mismatches.slice(0, 3).forEach((m) => console.log(`    "${m.label}"`));
      if (cmpResult.mismatches.length > 3) console.log(`    ... y ${cmpResult.mismatches.length - 3} más.`);
    }
    console.log(`  PENDIENTE DE REVISIÓN -- no corro las tools de onboarding todavía. Los 2 archivos quedan`);
    console.log(`  listos (${basename(mdPath)} / ${basename(geminiCheckPath)}) para cuando convoques a Claude a resolverlo contra el PDF.`);
    return;
  }

  console.log('  Mistral y Gemini coinciden -- sigo con las tools de onboarding.');
  const res = runCapture('tools/prepare-onboarding.mjs', [resolved.clubId, String(resolved.year), mdPath]);
  if (res.code !== 0) {
    console.error(`  prepare-onboarding.mjs falló: ${res.stderr || res.stdout}`);
    return;
  }
  console.log(res.stdout);
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  if (args.includes('--all')) {
    const dirFlag = args.indexOf('--dir');
    const dir = resolve(projectRoot, dirFlag >= 0 ? args[dirFlag + 1] : 'Clubes');
    const limitFlag = args.indexOf('--limit');
    const limit = limitFlag >= 0 ? parseInt(args[limitFlag + 1], 10) : Infinity;

    let pdfs = findPdfsUnder(dir);
    pdfs = pdfs.slice(0, limit);
    console.log(`${pdfs.length} PDF encontrados bajo ${dir.replace(projectRoot + '/', '')}.`);

    let processed = 0;
    let pending = 0;
    const pendingFiles = [];
    for (const pdfPath of pdfs) {
      const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
      if (briefingIsFresh(mdPath)) continue; // ya procesado y ya coincidía
      processOne(pdfPath, { club: null, year: null, dryRun, verbose: false });
      processed++;
      if (!dryRun && existsSync(mdPath) && !briefingIsFresh(mdPath)) {
        pending++;
        pendingFiles.push(relative(projectRoot, pdfPath));
      }
    }
    console.log(`\n${processed} documento(s) tocados.`);
    if (pending) {
      console.log(`${pending} quedaron PENDIENTES de revisión (Mistral/Gemini no coincidieron, o falta alguna transcripción):`);
      pendingFiles.forEach((f) => console.log(`  - ${f}`));
    }
    return;
  }

  const clubFlag = args.indexOf('--club');
  const yearFlag = args.indexOf('--year');
  const club = clubFlag >= 0 ? args[clubFlag + 1] : null;
  const year = yearFlag >= 0 ? args[yearFlag + 1] : null;
  const pdfArg = args.find((a, idx) => !a.startsWith('--') && args[idx - 1] !== '--club' && args[idx - 1] !== '--year');
  if (!pdfArg) usage();
  const pdfPath = resolve(projectRoot, pdfArg);
  if (!existsSync(pdfPath)) {
    console.error(`No existe: ${pdfPath}`);
    process.exit(1);
  }
  processOne(pdfPath, { club, year, dryRun, verbose: true });
}

main();
