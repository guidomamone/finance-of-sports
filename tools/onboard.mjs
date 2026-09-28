#!/usr/bin/env node
// ============================================================================
// tools/onboard.mjs — el UN comando que reemplaza la rutina de 2-3 pasos de
// Guido (Mistral, después Gemini para los escaneados, después nada -- ahora
// las tools del to-do 105 quedaban afuera). Encadena, en este orden:
//   1. tools/mistral-ocr-transcribe.mjs   -- transcribe el/los PDF nuevos
//   2. tools/gemini-transcribe.mjs --redo-mistral-scanned -- SIEMPRE se
//      corre (barre TODO lo marcado escaneado por Mistral que Gemini
//      todavía no re-hizo, no solo lo de este run -- mismo criterio que ya
//      usaba Guido a mano)
//   3. tools/prepare-onboarding.mjs      -- UN briefing.json por documento
//
// PENSADO PARA CORRER ENTERO DESDE TU TERMINAL, Guido -- 0 tokens de Claude,
// mismo criterio que las 2 tools de transcripción (CLAUDE.md "Cada PDF
// nuevo"). El paso 3 es el que agrega esto: antes tenías que abrir Claude
// para que orqueste extract-table-rows/sum-check/etc. una por una.
//
// USO:
//   Un solo documento nuevo (el caso más común, un ejercicio más de un club
//   que ya está en el sitio):
//     node tools/onboard.mjs "Clubes/Argentina/River/estados-contables-2021-2022.pdf" --club river --year 2022
//
//   Si no pasás --club, esto intenta adivinarlo comparando el nombre de la
//   CARPETA del club (`Clubes/<País>/<Carpeta>/archivo.pdf`) contra
//   `data/clubs.js` -- si hay 1 sola coincidencia clara, la usa (avisando
//   qué adivinó); si hay 0 o 2+, para y te pide `--club` explícito (nunca
//   adivina a ciegas un id que ya existe).
//
//   Si no pasás --year, lo intenta sacar del NOMBRE DEL ARCHIVO (el año de
//   CIERRE si hay un rango, ej. "2021-2022" -> 2022) -- a diferencia del
//   club, esto SÍ se adivina siempre y se avisa como adivinado ("yearGuessed":
//   true en el briefing): el único uso real de `year` en prepare-onboarding
//   es la búsqueda de liga cacheada, de bajo riesgo si sale mal (en el peor
//   caso, 0 coincidencias en vez de la liga correcta -- no corrompe ningún
//   dato financiero, eso lo sigue verificando Claude/vos contra el documento).
//
//   Lote (todo lo pendiente bajo Clubes/, o una subcarpeta con --dir):
//     node tools/onboard.mjs --all [--dir Clubes/Colombia] [--limit 50] [--concurrency 2]
//   En modo lote, --club/--year no aplican (cada documento adivina el suyo);
//   se salta el paso 3 para un .md cuyo .briefing.json ya sea más nuevo que
//   él (no re-procesa lo que no cambió).
//
//   --dry-run: no llama a ninguna API ni corre prepare-onboarding, solo
//   muestra qué haría (qué se transcribiría, qué club/año adivinaría para
//   cada uno). Útil para revisar un lote grande antes de tirarlo de verdad.
// ============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, basename, extname, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const projectRoot = resolve(import.meta.dirname, '..');

function usage() {
  console.error([
    'Uso: node tools/onboard.mjs "<archivo.pdf>" [--club <clubId>] [--year <año>] [--dry-run]',
    '   o: node tools/onboard.mjs --all [--dir Clubes/Colombia] [--limit 50] [--concurrency 2] [--dry-run]',
  ].join('\n'));
  process.exit(1);
}

function runVisible(scriptRelPath, args) {
  // A diferencia de prepare-onboarding.mjs (que captura todo para decidir qué mostrar), acá
  // Mistral/Gemini corren con la salida VISIBLE en vivo -- son pasos largos (minutos en --all) y
  // Guido quiere ver el progreso en su terminal, no esperar a que termine todo para enterarse.
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

// Nunca adivina a ciegas: si hay 0 o 2+ coincidencias, devuelve null y quien llama tiene que pedir
// --club explícito. Compara contra `name` Y `displayName` de cada club ya en data/clubs.js -- un
// club que todavía NO está onboardeado (folder sourceado sin clubId todavía) da 0 coincidencias a
// propósito, no es un bug: para ESE caso no hay nada que adivinar, y prepare-onboarding.mjs ya
// maneja bien un clubId que no tiene data/<id>-data.js (lo dice, no revienta).
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
// año de 4 dígitos que encuentre. Ver la cabecera del archivo para por qué esto SÍ se adivina
// siempre (bajo riesgo: solo afecta la búsqueda de liga cacheada en el briefing).
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

function runPrepareOnboarding(mdPath, clubId, year, dryRun) {
  if (dryRun) {
    console.log(`  [dry-run] node tools/prepare-onboarding.mjs ${clubId} ${year} "${mdPath}"`);
    return;
  }
  const res = runCapture('tools/prepare-onboarding.mjs', [clubId, String(year), mdPath]);
  if (res.code !== 0) {
    console.error(`  prepare-onboarding.mjs falló para ${mdPath}: ${res.stderr || res.stdout}`);
    return;
  }
  // Reimprime el resumen humano de prepare-onboarding.mjs (no le paso --json, así que esto nunca
  // trae el briefing completo, solo el resumen de consola).
  console.log(res.stdout);
}

function processOne(pdfPath, { club, year, dryRun }) {
  const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
  const relPdf = relative(projectRoot, pdfPath);

  console.log(`\n=== ${relPdf} ===`);

  if (!existsSync(mdPath)) {
    if (dryRun) {
      console.log('  [dry-run] node tools/mistral-ocr-transcribe.mjs "' + relPdf + '"');
    } else {
      console.log('  Transcribiendo con Mistral OCR...');
      const res = runVisible('tools/mistral-ocr-transcribe.mjs', [pdfPath]);
      if (res.code !== 0 && !existsSync(mdPath)) {
        console.error('  Mistral falló y no quedó .md -- no sigo con este documento.');
        return;
      }
    }
  } else {
    console.log('  Ya tiene .md, no vuelvo a transcribir.');
  }

  // clubId: nunca se adivina en modo lote sin evidencia; folderName siempre se intenta.
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
      return;
    } else {
      // 0 coincidencias: probablemente un club todavía no onboardeado. Uso el nombre de carpeta
      // normalizado como clubId PROVISORIO solo para que prepare-onboarding.mjs tenga algo que
      // etiquetar -- no es el clubId real que se vaya a usar cuando se onboardee de verdad, y
      // prepare-onboarding.mjs ya avisa "no existe data/<id>-data.js" en ese caso, así que no hay
      // riesgo de que esto se confunda con un club ya cargado.
      clubId = normalize(folder || 'club-nuevo').replace(/\s+/g, '-') || 'club-nuevo';
      console.log(`  "${folder}" no matchea ningún club ya cargado -- club nuevo, uso "${clubId}" como etiqueta provisoria.`);
    }
  }

  let resolvedYear = year;
  if (!resolvedYear) {
    resolvedYear = guessYear(basename(pdfPath));
    if (!resolvedYear) {
      console.error('  No pude adivinar el año del nombre del archivo -- pasá --year explícito.');
      return;
    }
    console.log(`  año adivinado del nombre del archivo: ${resolvedYear} (sin verificar contra el documento)`);
  }

  runPrepareOnboarding(mdPath, clubId, resolvedYear, dryRun);
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  if (args.includes('--all')) {
    const dirFlag = args.indexOf('--dir');
    const dir = resolve(projectRoot, dirFlag >= 0 ? args[dirFlag + 1] : 'Clubes');
    const limitFlag = args.indexOf('--limit');
    const limit = limitFlag >= 0 ? parseInt(args[limitFlag + 1], 10) : Infinity;
    const concFlag = args.indexOf('--concurrency');
    const concurrency = concFlag >= 0 ? args[concFlag + 1] : null;

    console.log('--- Paso 1: Mistral OCR (todo lo pendiente) ---');
    if (dryRun) {
      console.log(`[dry-run] node tools/mistral-ocr-transcribe.mjs --all --dir ${dir.replace(projectRoot + '/', '')}${concurrency ? ' --concurrency ' + concurrency : ''}`);
    } else {
      const mistralArgs = ['--all', '--dir', dir];
      if (concurrency) mistralArgs.push('--concurrency', concurrency);
      runVisible('tools/mistral-ocr-transcribe.mjs', mistralArgs);
    }

    console.log('\n--- Paso 2: Gemini, redo de lo que Mistral marcó escaneado ---');
    if (dryRun) {
      console.log('[dry-run] node tools/gemini-transcribe.mjs --redo-mistral-scanned');
    } else {
      runVisible('tools/gemini-transcribe.mjs', ['--redo-mistral-scanned']);
    }

    console.log('\n--- Paso 3: prepare-onboarding.mjs por cada .md (salteando los ya al día) ---');
    let pdfs = findPdfsUnder(dir);
    pdfs = pdfs.slice(0, limit);
    let processed = 0;
    for (const pdfPath of pdfs) {
      const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
      if (!existsSync(mdPath)) continue; // no se pudo transcribir (Tesseract a mano, etc.)
      if (briefingIsFresh(mdPath)) continue;
      processOne(pdfPath, { club: null, year: null, dryRun });
      processed++;
    }
    console.log(`\n${processed} documento(s) procesados por prepare-onboarding.mjs (de ${pdfs.length} PDF encontrados).`);
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
  processOne(pdfPath, { club, year, dryRun });
}

main();
