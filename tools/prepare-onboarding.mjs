#!/usr/bin/env node
// ============================================================================
// tools/prepare-onboarding.mjs — to-do 105, punto 1. Corre TODO lo mecánico
// del pipeline de onboarding de una sola vez, ANTES de abrir una sesión de
// Claude, y deja UN solo archivo de briefing compacto.
//
// PENSADO PARA CORRER DESDE TU TERMINAL (Guido), no desde una sesión de
// Claude -- mismo criterio que la transcripción (CLAUDE.md "Cada PDF nuevo",
// Versiones 244-248): sacar de Claude cualquier paso 100% mecánico. Podés
// encadenarlo al final de mistral-ocr-transcribe.mjs/gemini-transcribe.mjs
// para que salga solo apenas termina de transcribir, sin comando extra.
//
// Orquesta, EN PROCESOS SEPARADOS (no reimplementa nada de estas tools, las
// llama tal cual ya están probadas):
//   1. tools/extract-table-rows.mjs   -- tablas del .md a JSON compacto
//   2. tools/sum-check.mjs            -- tie-out automático POR SEGMENTO: cada
//      fila de "Total"/"Subtotal"/"Sum" cierra los rubros vistos desde el
//      total anterior (una tabla real suele tener varios en cascada, ver
//      checkTieOuts() más abajo para el porqué de sumar por segmento)
//   3. tools/suggest-category-precedent.mjs -- precedente de categoría para
//      cada rawLabel de una tabla marcada relevante (solo si el club YA
//      tiene data/<clubId>-data.js; si es un club nuevo, no hay precedente
//      posible y se lo dice en vez de fallar)
//   4. tools/lookup-club-league.js    -- liga cacheada para ese club-año, SI
//      el club ya tiene entrada en data/clubs.js (país + nombre)
//
// Lo que NO hace, a propósito, porque no es mecanizable con confianza:
//   - Un total COMPUESTO (suma de subtotales previos, no de rubros nuevos --
//     ej. "Subtotal antes de amortizaciones" = Total recursos - Subtotal
//     gastos) queda marcado "sin rubros nuevos, revisar a mano" en vez de
//     intentar adivinar qué otros totales lo componen (ver sección 1 de
//     club-data-mapping/SKILL.md sobre por qué el bold no alcanza para esto).
//   - Elegir la normalizedCategory final -- solo sugiere precedente.
//   - Bajar una liga-temporada nueva de Wikipedia si no está cacheada -- eso
//     necesita confirmar el título exacto a mano (resolve-wikipedia-season-
//     page.mjs), un nombre ambiguo puede traer el torneo equivocado.
//   - El tipo de cambio a USD -- se lista dónde puede estar (fxHints), pero
//     leerlo sigue siendo de Claude (club-data-mapping sección 5, regla 0).
//
// USO:
//   node tools/prepare-onboarding.mjs oncecaldas 2025 "Clubes/Colombia/Once Caldas/estados-financieros-2025.md"
//   node tools/prepare-onboarding.mjs river 2021 "Clubes/Argentina/River/estados-contables-2020-2021.md" --out /tmp/briefing.json
//   node tools/prepare-onboarding.mjs river 2021 archivo.md --json   (imprime a stdout, no escribe archivo)
// ============================================================================

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, basename, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { derivado } from './rutas.mjs';
import vm from 'node:vm';

const projectRoot = resolve(import.meta.dirname, '..');

function usage() {
  console.error('Uso: node tools/prepare-onboarding.mjs <clubId> <año> <archivo.md> [--out <archivo.json>] [--json]');
  process.exit(1);
}

function runNode(scriptRelPath, args, input) {
  try {
    const stdout = execFileSync('node', [resolve(projectRoot, scriptRelPath), ...args], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      input,
      // BUG REAL encontrado probando esto contra River 2021: sin fijar `stdio` acá, cuando
      // sum-check.mjs revienta con una excepción no atrapada (un valor no numérico que se le
      // pasó por error), el stack trace completo del proceso hijo se imprimía DIRECTO en la
      // terminal de quien corre prepare-onboarding.mjs, mezclado con la salida propia de esta
      // tool -- 'pipe' en las 3 streams evita eso, todo lo que el hijo escriba queda en
      // err.stdout/err.stderr para que esta tool decida qué mostrar, nunca sale solo.
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '' };
  } catch (err) {
    // Varias de estas tools salen con código 1 cuando "no encontré nada" (comportamiento
    // normal, documentado en cada una, no un crash) -- su stdout sigue siendo válido.
    return { code: err.status ?? 1, stdout: err.stdout || '', stderr: err.stderr || String(err.message || '') };
  }
}

function stripAccents(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function isTotalLabel(label) {
  const norm = stripAccents(label || '').toLowerCase().trim();
  // "total(es)" cubre español/inglés/italiano/portugués. "sum" se agregó al probar esto contra un
  // documento noruego real (Clubes/Noruega/Rosenborg/aarsregnskap-2012.md, "Sum inntekter"/"Sum
  // kostnader") -- sin esto, CUALQUIER documento nórdico daba 0 tie-outs automáticos, no por un
  // error sino porque la palabra que buscábamos no existe en ese idioma. Sigue sin cubrir todos los
  // idiomas del proyecto (ej. griego "Σύνολο") -- si aparece un documento real donde este chequeo
  // da 0 tie-outs y la palabra correcta es otra, sumarla acá con el mismo criterio.
  return /^(sub)?(totale?s?|sum)\b/.test(norm);
}

function isBlankCell(v) {
  return !v || /^[-—–]$/.test(v.trim());
}

// BUG REAL encontrado probando esto contra el Anexo III de River 2021 (rollforward de bienes de
// uso, encabezado de 2 niveles: "Valor de origen"/"Amortización acumulada" arriba, "al inicio"/
// "Altas"/"Bajas"/"al cierre" abajo): extract-table-rows.mjs no sabe de encabezados de 2 niveles
// (las tablas Markdown solo soportan 1), así que la segunda fila de encabezado quedó adentro como
// si fuera una fila de datos más -- y en algunas filas, texto como "Créditos"/"Deudas (1)" terminó
// en una columna de VALORES en vez de en el rawLabel. Sin este chequeo, ese texto se le pasaba tal
// cual a sum-check.mjs, que revienta al no poder parsearlo como número (ver runNode() arriba).
// Filtrar ANTES de intentar sumar: mejor marcar la columna como "no numérico, revisar a mano" que
// intentar adivinar la estructura real de una tabla rotada/con encabezado compuesto.
function looksNumeric(v) {
  const s = String(v).trim().replace(/^\(|\)$/g, '').replace(/^[-+]/, '');
  return s.length > 0 && /\d/.test(s) && /^[\d.,\s]+$/.test(s);
}

function loadClubsTable() {
  const sandbox = { console, window: {} };
  sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const code = readFileSync(resolve(projectRoot, 'data', 'clubs.js'), 'utf8');
  vm.runInContext(code, ctx, { filename: 'data/clubs.js' });
  return vm.runInContext('clubs', ctx);
}

// ----------------------------------------------------------------------------
// Paso 1: tablas del .md a JSON compacto (tools/extract-table-rows.mjs)
// ----------------------------------------------------------------------------
function extractTables(mdPath) {
  const res = runNode('tools/extract-table-rows.mjs', [mdPath, '--json']);
  if (res.code !== 0) {
    throw new Error(`extract-table-rows.mjs falló (código ${res.code}): ${res.stderr || res.stdout}`);
  }
  return JSON.parse(res.stdout);
}

// ----------------------------------------------------------------------------
// Paso 2: tie-out automático (tools/sum-check.mjs), POR SEGMENTO dentro de
// cada tabla, no por tabla entera. Una tabla real de balance suele tener
// VARIAS filas de "total" en cascada (ej. River: "Total recursos ordinarios",
// "Subtotal gastos ordinarios", "Subtotal antes de amortizaciones...", "Total
// gastos ordinarios" -- las 4 en la MISMA tabla). Tratar "más de un total" como
// razón para no chequear nada (la primera versión de esta función) tira
// TODA la señal por la borda: en la práctica ninguna tabla real quedaba
// chequeada. En cambio: cada fila de total cierra el SEGMENTO de filas NO-total
// vistas desde el total anterior (o desde el principio de la tabla). Esto
// resuelve bien los casos simples (sumar los rubros de una sección) y falla
// limpio y sin inventar nada en los COMPUESTOS (un total que suma otros
// totales/subtotales, no rubros nuevos -- ahí el segmento da 0 filas, se
// marca aparte en vez de intentar sumar nada).
// ----------------------------------------------------------------------------
function checkTieOuts(tables) {
  const tieOuts = [];
  for (const table of tables) {
    let segmentStart = 0;
    for (let i = 0; i < table.rows.length; i++) {
      if (!isTotalLabel(table.rows[i].rawLabel)) continue;
      const totalRow = table.rows[i];
      const segmentRows = table.rows.slice(segmentStart, i);
      segmentStart = i + 1;

      if (!segmentRows.length) {
        tieOuts.push({
          page: table.page, section: table.section, likelyRelevant: table.likelyRelevant, totalLabel: totalRow.rawLabel, skipped: true,
          reason: 'Sin ningún rubro nuevo desde el total anterior -- probablemente combina subtotales previos, no rubros (revisar a mano).',
        });
        continue;
      }
      const numCols = Math.max(totalRow.values.length, ...segmentRows.map((r) => r.values.length));
      for (let col = 0; col < numCols; col++) {
        const targetRaw = totalRow.values[col];
        if (isBlankCell(targetRaw)) continue;
        if (!looksNumeric(targetRaw)) {
          tieOuts.push({ page: table.page, section: table.section, likelyRelevant: table.likelyRelevant, column: col, totalLabel: totalRow.rawLabel, skipped: true, reason: `El valor de la fila de total ("${targetRaw}") no parece un número -- probablemente encabezado de 2 niveles o tabla rotada, revisar a mano.` });
          continue;
        }
        const addendsRaw = segmentRows.map((r) => r.values[col]).filter((v) => !isBlankCell(v));
        if (!addendsRaw.length) continue;
        const nonNumeric = addendsRaw.filter((v) => !looksNumeric(v));
        if (nonNumeric.length) {
          tieOuts.push({ page: table.page, section: table.section, likelyRelevant: table.likelyRelevant, column: col, totalLabel: totalRow.rawLabel, skipped: true, reason: `${nonNumeric.length} de ${addendsRaw.length} valor(es) del segmento no parecen números (ej. "${nonNumeric[0]}") -- probablemente encabezado de 2 niveles o tabla rotada, revisar a mano.` });
          continue;
        }
        const addends = addendsRaw;
        const check = (list) => runNode('tools/sum-check.mjs', [...list, '--target', targetRaw]);
        let res = check(addends);
        const entry = {
          page: table.page, section: table.section, likelyRelevant: table.likelyRelevant, column: col,
          totalLabel: totalRow.rawLabel, target: targetRaw, addendCount: addends.length,
        };
        // BUG REAL (2026-09-29, corrida de estas tools sobre los 21 documentos del piloto del inventario): un
        // balance con jerarquía (CIRCULANTE + sus rubros, NÃO CIRCULANTE + sus rubros, TOTAL DO ATIVO) contaba cada
        // peso DOS veces (subtotal y rubros), y daba una "diferencia" exactamente igual al total: un falso fallo que
        // hacía pensar que la transcripción estaba mal (Goias, Ferro, São Paulo...). Si sumando todo no cierra, se
        // prueba también sin las filas en negrita (rubros solos) y solo con las filas en negrita (subtotales solos).
        // Se acepta solo un cierre EXACTO: con centavos, una coincidencia por casualidad es despreciable.
        if (!/CIERRA EXACTO/.test(res.stdout)) {
          const pick = (bold) => segmentRows.filter((r) => Boolean(r.bold) === bold).map((r) => r.values[col]).filter((v) => !isBlankCell(v) && looksNumeric(v));
          for (const [how, list] of [['sin-subtotales-en-negrita', pick(false)], ['solo-subtotales-en-negrita', pick(true)]]) {
            if (list.length < 2) continue;
            const r2 = check(list);
            if (/CIERRA EXACTO/.test(r2.stdout)) { res = r2; entry.how = how; entry.addendCount = list.length; break; }
          }
        }
        if (/CIERRA EXACTO/.test(res.stdout)) {
          entry.closes = true;
        } else {
          const diffMatch = res.stdout.match(/Diferencia:\s*([^\s(]+)/);
          if (diffMatch) {
            entry.closes = false;
            entry.diff = diffMatch[1];
            // Documentos en miles/unidades redondeadas: cada rubro se redondeó por separado, así que el total puede
            // diferir en ±1 (o unos pocos) sin que haya ningún error. Solo si TODOS los importes son enteros.
            const diffNum = Math.abs(parseFloat(String(diffMatch[1]).replace(/[^0-9.\-eE]/g, '')));
            const allInt = [targetRaw, ...addends].every((v) => !/[.,]\d{1,2}\)?\s*$/.test(String(v).trim()) || /[.,]\d{3}\)?\s*$/.test(String(v).trim()));
            if (allInt && diffNum > 0 && diffNum <= Math.max(1, Math.ceil(addends.length / 2))) { entry.closes = true; entry.how = `redondeo (diferencia ${diffMatch[1]} en ${addends.length} rubros enteros)`; }
          } else {
            entry.error = (res.stderr || res.stdout || 'sum-check.mjs no devolvió resultado reconocible').trim().split('\n').pop();
          }
        }
        tieOuts.push(entry);
      }
    }
  }
  return tieOuts;
}

// ----------------------------------------------------------------------------
// Paso 3: precedente de categoría (tools/suggest-category-precedent.mjs),
// solo si el club ya tiene data/<clubId>-data.js. Junta rawLabels ÚNICOS de
// las tablas marcadas "likelyRelevant", sin las filas de total (no son un
// rubro categorizable, son un agregado).
// ----------------------------------------------------------------------------
function suggestCategories(clubId, tables) {
  const hasClubData = existsSync(resolve(projectRoot, 'data', `${clubId}-data.js`));
  if (!hasClubData) {
    return { skipped: true, reason: `data/${clubId}-data.js no existe todavía -- club nuevo, sin precedente posible. Categorización 100% a mano (club-data-mapping/SKILL.md sección 1).` };
  }
  const labels = [];
  const seen = new Set();
  for (const table of tables) {
    if (!table.likelyRelevant) continue;
    for (const row of table.rows) {
      const label = (row.rawLabel || '').trim();
      if (!label || isTotalLabel(label) || seen.has(label)) continue;
      seen.add(label);
      labels.push(label);
    }
  }
  if (!labels.length) {
    return { skipped: true, reason: 'Ninguna tabla se marcó "likelyRelevant" -- revisar a mano si el documento tiene una sección de Recursos/Gastos que extract-table-rows.mjs no reconoció (ver RELEVANTE en tools/vocabulario.mjs).' };
  }
  const res = runNode('tools/suggest-category-precedent.mjs', [clubId, '--stdin', '--json'], labels.join('\n'));
  if (res.code !== 0 && !res.stdout.trim()) {
    return { skipped: true, reason: `suggest-category-precedent.mjs falló: ${res.stderr || 'sin salida'}` };
  }
  let results;
  try {
    results = JSON.parse(res.stdout);
  } catch {
    return { skipped: true, reason: `suggest-category-precedent.mjs no devolvió JSON parseable: ${res.stdout.slice(0, 200)}` };
  }
  return { labelsChecked: labels.length, results };
}

// ----------------------------------------------------------------------------
// Paso 4: liga cacheada (tools/lookup-club-league.js), solo si el club ya
// tiene entrada en data/clubs.js (de ahí sale el país y el nombre a buscar).
// NUNCA baja una liga-temporada nueva -- eso necesita confirmar el título
// exacto de Wikipedia a mano (ver tools/club-league-reference/README.md).
// ----------------------------------------------------------------------------
function lookupLeague(clubId, year) {
  let clubsTable;
  try {
    clubsTable = loadClubsTable();
  } catch (err) {
    return { skipped: true, reason: `No pude cargar data/clubs.js: ${err.message}` };
  }
  const club = clubsTable[clubId];
  if (!club) {
    return { skipped: true, reason: `"${clubId}" no tiene entrada en data/clubs.js todavía (club nuevo) -- sin país/nombre para buscar automático.` };
  }
  const pais = String(club.country || '').toLowerCase();
  if (!pais) return { skipped: true, reason: `data/clubs.js no tiene "country" para "${clubId}".` };
  const query = club.displayName || club.name;
  const res = runNode('tools/lookup-club-league.js', [query, '--pais', pais, '--anio', String(year), '--json']);
  let matches = [];
  try { matches = JSON.parse(res.stdout || '[]'); } catch { /* cae a [] */ }
  return { pais, query, matches, cached: matches.length > 0 };
}

// ----------------------------------------------------------------------------
// Bonus barato: dónde puede estar el tipo de cambio declarado por el propio
// documento (club-data-mapping sección 5, regla 0) -- no lo interpreta, solo
// dice en qué página buscar en vez de que Claude lea el documento entero.
// ----------------------------------------------------------------------------
function findFxHints(raw) {
  const lines = raw.split('\n');
  const hints = [];
  let page = 1;
  const kw = /(tipo de cambio|cotizaci[oó]n|moneda extranjera|exchange rate)/i;
  for (const line of lines) {
    const pageMatch = line.match(/^---\s*pág\.\s*(\d+)\s*---/i);
    if (pageMatch) { page = parseInt(pageMatch[1], 10); continue; }
    if (kw.test(line) && line.trim().length < 300) {
      hints.push({ page, line: line.trim() });
    }
  }
  return hints;
}

function main() {
  const args = process.argv.slice(2);
  const outFlag = args.indexOf('--out');
  const asJson = args.includes('--json');
  const positional = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
  const [clubId, year, mdPath] = positional;
  if (!clubId || !year || !mdPath) usage();
  if (!existsSync(mdPath)) {
    console.error(`No existe el archivo: ${mdPath}`);
    process.exit(1);
  }

  const raw = readFileSync(mdPath, 'utf8');
  const scannedWarning = raw.slice(0, 400).includes('ESCANEADO, TRANSCRIPTO CON MISTRAL OCR');

  const extracted = extractTables(mdPath);
  const tieOuts = checkTieOuts(extracted.tables);
  const categoryPrecedent = suggestCategories(clubId, extracted.tables);
  const league = lookupLeague(clubId, year);
  const fxHints = findFxHints(raw);

  const warnings = [];
  if (scannedWarning) warnings.push('Documento marcado como ESCANEADO por Mistral OCR -- verificar a mano contra el PDF antes de cargar cualquier número (CLAUDE.md, club-data-mapping/SKILL.md sección 15).');
  const noCierran = tieOuts.filter((t) => t.closes === false || t.error);
  const noCierranRelevantes = noCierran.filter((t) => t.likelyRelevant);
  if (noCierranRelevantes.length) warnings.push(`${noCierranRelevantes.length} tabla(s)/columna(s) MARCADAS RELEVANTES (Recursos/Gastos) no cerraron el tie-out automático o dieron error -- prioridad alta, revisar antes de cargar (ver "tieOuts").`);
  if (noCierran.length > noCierranRelevantes.length) warnings.push(`${noCierran.length - noCierranRelevantes.length} tabla(s)/columna(s) más no cerraron fuera de las relevantes (notas de balance, etc.) -- prioridad baja, puede ser estructura de la nota que esta heurística no capta bien.`);
  const multiTotal = tieOuts.filter((t) => t.skipped);
  if (multiTotal.length) warnings.push(`${multiTotal.length} fila(s) de total sin chequeo automático (más de un nivel de subtotal, o valor no numérico) -- agrupación/lectura a mano.`);

  const briefing = {
    club: clubId,
    year: Number(year) || year,
    sourceFile: mdPath,
    generatedAt: new Date().toISOString(),
    numberFormat: extracted.numberFormat,
    numberFormatEvidence: extracted.numberFormatEvidence,
    scannedWarning,
    tableCount: extracted.tables.length,
    relevantTableCount: extracted.tables.filter((t) => t.likelyRelevant).length,
    tables: extracted.tables,
    tieOuts,
    categoryPrecedent,
    league,
    fxHints,
    warnings,
  };

  if (asJson) {
    console.log(JSON.stringify(briefing, null, 2));
    return;
  }

  const outPath = outFlag >= 0 ? args[outFlag + 1] : derivado(resolve(mdPath), '.briefing.json');
  writeFileSync(outPath, JSON.stringify(briefing, null, 2) + '\n', 'utf8');

  console.log(`${mdPath}`);
  console.log(`  formato numérico: ${extracted.numberFormat}`);
  console.log(`  ${extracted.tables.length} tablas (${briefing.relevantTableCount} relevantes)`);
  console.log(`  tie-outs automáticos: ${tieOuts.length} chequeados (${tieOuts.filter((t) => t.closes).length} cierran, ${noCierran.length} no cierran/error, ${multiTotal.length} sin chequear)`);
  if (categoryPrecedent.skipped) {
    console.log(`  precedente de categoría: SALTEADO -- ${categoryPrecedent.reason}`);
  } else {
    const counts = categoryPrecedent.results.reduce((acc, r) => ((acc[r.tier] = (acc[r.tier] || 0) + 1), acc), {});
    console.log(`  precedente de categoría: ${categoryPrecedent.labelsChecked} rubro(s) -- ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ')}`);
  }
  console.log(`  liga: ${league.skipped ? 'SALTEADO -- ' + league.reason : (league.cached ? `${league.matches.length} coincidencia(s) en caché` : 'sin coincidencias en caché')}`);
  console.log(`  pistas de tipo de cambio: ${fxHints.length}`);
  if (warnings.length) {
    console.log(`\n  AVISOS:`);
    warnings.forEach((w) => console.log(`   - ${w}`));
  }
  console.log(`\nBriefing guardado en ${outPath.replace(projectRoot + '/', '')}`);
}

main();
