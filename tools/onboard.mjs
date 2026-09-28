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
//   Lote (todo lo que exista bajo Clubes/, o una subcarpeta con --dir):
//     node tools/onboard.mjs --all [--dir Clubes/Colombia] [--limit 50]
//   En modo lote, --club/--year no aplican (cada documento adivina el suyo).
//   Un documento con discrepancia sin resolver se vuelve a listar cada vez
//   que se corre --all (no cuesta nada, es comparación local) hasta que
//   alguien lo resuelva.
//
//   TOPE DE SEGURIDAD (pedido de Guido, 2026-09-29): si hay más de
//   DEFAULT_MAX_PENDING (50) documentos que todavía necesitan trabajo (ni
//   cargados en el sitio ni con briefing al día), el comando se NIEGA a
//   correr sin que se lo confirmes -- cada uno puede disparar Mistral Y
//   Gemini de una. Pasá `--limit <=50` para una tanda más chica, o
//   `--confirm` si de verdad querés procesar todos de una. Esto aplica
//   siempre, con o sin --dir: acotar la carpeta no destraba el tope solo,
//   sigue haciendo falta uno de los dos flags si la carpeta tiene más de 50
//   documentos pendientes.
//
//   --dry-run: no llama a ninguna API ni corre nada, solo muestra qué haría.
// ============================================================================

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, basename, extname, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const projectRoot = resolve(import.meta.dirname, '..');
const GEMINI_CHECK_SUFFIX = '.gemini-check';
// Tope de seguridad para --all SIN --limit/--confirm explícito (pedido de Guido, 2026-09-29,
// "ponele n=50"): más de esto y cada documento pendiente puede disparar Mistral Y Gemini, plata
// real -- mejor frenar y pedir confirmación explícita que barrer miles de una sola corrida.
const DEFAULT_MAX_PENDING = 50;

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

// Versión SIN console.log -- usada por el conteo de "cuántos documentos hace falta procesar" antes
// de arrancar un --all (ver DEFAULT_MAX_PENDING más abajo), para no imprimir dos veces los mismos
// avisos de club/año adivinado (una vez al contar, otra al procesar de verdad).
function resolveClubAndYearQuiet(pdfPath, club, year) {
  let clubId = club;
  if (!clubId) {
    const clubsTable = loadClubsTable();
    const folder = clubFolderName(pdfPath);
    const { matches } = guessClubId(folder, clubsTable);
    if (matches.length === 1) clubId = matches[0];
    else if (matches.length > 1) return { error: `"${folder}" matchea ${matches.length} clubes (${matches.join(', ')}) -- pasá --club explícito, no adivino.` };
    else clubId = normalize(folder || 'club-nuevo').replace(/\s+/g, '-') || 'club-nuevo';
  }
  let resolvedYear = year;
  if (!resolvedYear) {
    resolvedYear = guessYear(basename(pdfPath));
    if (!resolvedYear) return { error: 'No pude adivinar el año del nombre del archivo -- pasá --year explícito.' };
  }
  return { clubId, year: resolvedYear };
}

function resolveClubAndYear(pdfPath, club, year) {
  const res = resolveClubAndYearQuiet(pdfPath, club, year);
  if (res.error) {
    console.error(`  ${res.error}`);
    return null;
  }
  if (!club) {
    const folder = clubFolderName(pdfPath);
    const clubsTable = loadClubsTable();
    const { matches } = guessClubId(folder, clubsTable);
    if (matches.length === 1) console.log(`  club adivinado por carpeta ("${folder}"): ${res.clubId}`);
    else console.log(`  "${folder}" no matchea ningún club ya cargado -- club nuevo, uso "${res.clubId}" como etiqueta provisoria.`);
  }
  if (!year) console.log(`  año adivinado del nombre del archivo: ${res.year} (sin verificar contra el documento)`);
  return res;
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

// El marcador que deja CLAUDE (a mano, con el Edit tool) en el .md CANÓNICO cuando resuelve una
// discrepancia contra el PDF -- NO lo escribe ninguna tool. Responde la pregunta real de Guido
// ("¿el script sabe si el match es porque Mistral y Gemini coincidieron solos, o porque Claude
// arregló algo?"): el criterio de "listo para onboardear" sigue siendo el mismo siempre (correr
// compare-transcripts.mjs de nuevo y que dé match), nunca un flag guardado aparte que se puede
// desincronizar del contenido real -- pero esta marca, cuando está, le dice a cualquiera que lea el
// .md (una sesión futura, Guido) que ese match no es casualidad de que las 2 IAs acertaron solas,
// es la firma de una revisión humana contra el documento. Convención, no mecanismo: buscar este
// texto (o alguno con este formato) al principio del archivo.
const RESOLVED_MARKER_REGEX = /DISCREPANCIA MISTRAL\/GEMINI RESUELTA/;

function processOne(pdfPath, { club, year, dryRun, verbose = true, stage = 'full' }) {
  const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
  const geminiCheckPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + GEMINI_CHECK_SUFFIX + '.md');
  const relPdf = relative(projectRoot, pdfPath);

  console.log(`\n=== ${relPdf} ===`);

  // Resolver club/año PRIMERO, antes de tocar ninguna API: es lo único que permite chequear si
  // esto ya está cargado y verificado, y no tiene sentido gastar en Gemini si la respuesta es sí.
  const resolved = resolveClubAndYear(pdfPath, club, year);
  if (!resolved) return;
  // Este salto es para no GASTAR EN API (Mistral/Gemini) algo ya cargado -- por eso solo aplica a
  // las etapas que las tocan. `--check-only`/`--onboard-only` son gratis (comparación local +
  // prepare-onboarding.mjs), y Guido puede querer usarlos a propósito sobre un documento puntual ya
  // cargado para probar algo (ver cabecera del archivo) -- no tiene sentido bloqueárselo. En modo
  // lote (`--all`), el filtro de `needsWork` en main() ya saca los ya-cargados ANTES de llegar acá,
  // así que esto no le cambia nada a esa ruta.
  if ((stage === 'transcribe' || stage === 'full') && isAlreadyOnboarded(resolved.clubId, resolved.year)) {
    console.log(`  Ya cargado en data/${resolved.clubId}-data.js, ejercicio ${resolved.year} -- no lo toco (ni Mistral ni Gemini).`);
    return;
  }

  if (stage === 'transcribe' || stage === 'full') {
    const hasMistral = transcribeIfMissing(pdfPath, mdPath, {
      dryRun, label: 'Transcribiendo con Mistral OCR', scriptRelPath: 'tools/mistral-ocr-transcribe.mjs',
      extraArgs: [], alreadyMsg: 'Ya tiene .md de Mistral, no vuelvo a transcribir.',
    });
    const hasGemini = transcribeIfMissing(pdfPath, geminiCheckPath, {
      dryRun, label: 'Transcribiendo con Gemini (chequeo en paralelo)', scriptRelPath: 'tools/gemini-transcribe.mjs',
      extraArgs: ['--out-suffix', GEMINI_CHECK_SUFFIX], alreadyMsg: 'Ya tiene el chequeo de Gemini, no vuelvo a transcribir.',
    });
    if (stage === 'transcribe') return; // --transcribe-only: hasta acá nomás, no compara ni onboardea
    if (dryRun) {
      console.log(`  [dry-run] node tools/compare-transcripts.mjs "${mdPath}" "${geminiCheckPath}"`);
      console.log(`  [dry-run] si coinciden: node tools/prepare-onboarding.mjs ${resolved.clubId} ${resolved.year} "${mdPath}"`);
      return;
    }
    if (!hasMistral || !hasGemini) {
      console.error('  Falta alguna de las 2 transcripciones -- no puedo comparar, no sigo con este documento.');
      return;
    }
  } else {
    // stage 'check' u 'onboard': asume que la transcripción YA se hizo aparte (--transcribe-only,
    // o a mano). Si falta alguna, no hay nada que comparar todavía.
    if (!existsSync(mdPath) || !existsSync(geminiCheckPath)) {
      console.log(`  Falta alguna de las 2 transcripciones -- corré --transcribe-only primero (o node tools/mistral-ocr-transcribe.mjs / gemini-transcribe.mjs a mano).`);
      return;
    }
  }

  if (dryRun) {
    console.log(`  [dry-run] node tools/compare-transcripts.mjs "${mdPath}" "${geminiCheckPath}"`);
    if (stage === 'onboard') console.log(`  [dry-run] si coinciden: node tools/prepare-onboarding.mjs ${resolved.clubId} ${resolved.year} "${mdPath}"`);
    return;
  }

  // El chequeo SIEMPRE se corre de nuevo acá, nunca se confía en un resultado guardado de una
  // corrida anterior -- así, si Claude editó el .md canónico para resolver una discrepancia, este
  // mismo comando ve el match apenas se lo vuelve a correr, sin que nadie tenga que avisarle nada.
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
    console.log(`  Cuando Claude lo resuelva (corrigiendo el .md canónico contra el PDF), que deje al principio del`);
    console.log(`  archivo: "DISCREPANCIA MISTRAL/GEMINI RESUELTA (ver tools/compare-transcripts.mjs), <fecha>,`);
    console.log(`  <qué celda cambió y por qué>" -- así el próximo que lea el .md sabe que el match no fue casualidad.`);
    return;
  }

  const mdContent = readFileSync(mdPath, 'utf8').slice(0, 600);
  if (RESOLVED_MARKER_REGEX.test(mdContent)) {
    console.log('  Mistral y Gemini coinciden (marca de resolución a mano encontrada en el .md) -- sigo con las tools de onboarding.');
  } else {
    console.log('  Mistral y Gemini coinciden -- sigo con las tools de onboarding.');
  }
  if (stage === 'check') return; // --check-only: hasta acá, no onboardea aunque haya dado match
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
  // Control de etapa (pedido de Guido, 2026-09-29: poder correr el proceso en partes para probar
  // algo puntual, no siempre de punta a punta). Sin ninguno de los 3 flags, corre las 4 etapas
  // seguidas (comportamiento de siempre). Los 3 son excluyentes entre sí.
  //   --transcribe-only : solo Mistral + Gemini en paralelo. No compara, no onboardea.
  //   --check-only       : solo compara (asume que las 2 transcripciones ya existen). No onboardea.
  //   --onboard-only     : compara de nuevo (nunca confía en un resultado viejo) y, si coincide,
  //                        onboardea. Asume que las 2 transcripciones ya existen.
  const stage = args.includes('--transcribe-only') ? 'transcribe'
    : args.includes('--check-only') ? 'check'
    : args.includes('--onboard-only') ? 'onboard'
    : 'full';
  // Las 2 etapas que NO llaman a ninguna API paga (check/onboard son comparación local +
  // prepare-onboarding.mjs, ambos gratis) no necesitan el tope de costo de abajo -- ese tope existe
  // específicamente para no disparar Mistral/Gemini de una sobre miles de documentos sin querer.
  const costsMoney = stage === 'transcribe' || stage === 'full';

  if (args.includes('--all')) {
    const dirFlag = args.indexOf('--dir');
    const dir = resolve(projectRoot, dirFlag >= 0 ? args[dirFlag + 1] : 'Clubes');
    const limitFlag = args.indexOf('--limit');
    const explicitLimit = limitFlag >= 0 ? parseInt(args[limitFlag + 1], 10) : null;
    const confirmed = args.includes('--confirm');

    const allPdfs = findPdfsUnder(dir);
    // "Necesita trabajo" = no tiene un briefing al día NI ya está cargado en el sitio -- calculado
    // ACÁ, antes de procesar nada, para poder frenar si el número es grande (ver DEFAULT_MAX_PENDING
    // abajo). Encontrado real, 2026-09-29 (Guido, antes de correr esto de verdad): Clubes/ tiene 3358
    // PDF en total, de los cuales solo ~290 ya están cargados -- un `--all` sin este freno mandaría
    // los otros ~3068 (sourceados pero nunca onboardeados) a Mistral Y Gemini de una sola vez, plata
    // real sin que nadie lo haya decidido a propósito.
    const needsWork = allPdfs.filter((pdfPath) => {
      const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
      if (briefingIsFresh(mdPath)) return false;
      const resolved = resolveClubAndYearQuiet(pdfPath, null, null);
      if (resolved.error) return true; // no se puede adivinar club/año -- se va a frenar solo al procesarlo, pero cuenta como pendiente
      return !isAlreadyOnboarded(resolved.clubId, resolved.year);
    });

    console.log(`${allPdfs.length} PDF encontrados bajo ${dir.replace(projectRoot + '/', '')}, ${needsWork.length} necesitan trabajo.`);

    const effectiveLimit = explicitLimit ?? Infinity;
    if (costsMoney && !confirmed && effectiveLimit > DEFAULT_MAX_PENDING && needsWork.length > DEFAULT_MAX_PENDING) {
      console.error(`\n${needsWork.length} documentos pendientes es más de ${DEFAULT_MAX_PENDING} -- cada uno puede disparar Mistral Y Gemini (plata real), así que no corro esto sin que lo confirmes.`);
      console.error(`Pasá --limit <=${DEFAULT_MAX_PENDING} para una tanda más chica, o --confirm si de verdad querés procesar los ${needsWork.length} de una.`);
      process.exit(1);
    }

    const toProcess = needsWork.slice(0, effectiveLimit === Infinity ? needsWork.length : effectiveLimit);
    let pending = 0;
    const pendingFiles = [];
    for (const pdfPath of toProcess) {
      const mdPath = resolve(dirname(pdfPath), basename(pdfPath, extname(pdfPath)) + '.md');
      processOne(pdfPath, { club: null, year: null, dryRun, verbose: false, stage });
      if (!dryRun && existsSync(mdPath) && !briefingIsFresh(mdPath)) {
        pending++;
        pendingFiles.push(relative(projectRoot, pdfPath));
      }
    }
    console.log(`\n${toProcess.length} documento(s) tocados.`);
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
  processOne(pdfPath, { club, year, dryRun, verbose: true, stage });
}

main();
