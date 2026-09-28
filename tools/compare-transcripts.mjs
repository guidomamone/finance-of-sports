#!/usr/bin/env node
// ============================================================================
// tools/compare-transcripts.mjs — compara DOS transcripciones independientes
// del MISMO PDF (Mistral vs Gemini, corridas en paralelo por
// tools/onboard.mjs) para decidir si coinciden en los NÚMEROS antes de
// confiar el resto del pipeline mecánico a un solo motor de OCR.
//
// Por qué comparar por RUBRO en vez de diff de texto plano: dos
// transcripciones fieles del MISMO documento pueden diferir en formato/
// estructura sin que eso importe (una puede usar tablas Markdown, la otra
// texto plano; el orden de headings puede variar) -- lo que importa para
// onboarding es si LOS RUBROS Y SUS VALORES coinciden. Se apoya en
// tools/extract-table-rows.mjs (el mismo parser de prepare-onboarding.mjs)
// para sacar {rawLabel, values} de cada transcripción, empareja por
// rawLabel normalizado, y compara los valores numéricos.
//
// LO QUE CUENTA COMO DISCREPANCIA (exit code 1): un rawLabel que aparece UNA
// SOLA VEZ en cada transcripción (sin ambigüedad de cuál-con-cuál) con
// valores numéricos distintos. Un rawLabel que aparece en una transcripción
// y no en la otra, o que se repite dentro de la MISMA transcripción (ej.
// "Total", que aparece en decenas de Notas), queda listado como informativo
// pero NO bloquea -- exigir estructura idéntica entre 2 motores de OCR
// distintos daría falsos positivos en casi cualquier documento real, y el
// caso que de verdad importa (un rubro real, mismo texto, número distinto)
// es justo el que SÍ se puede comparar sin ambigüedad.
//
// USO:
//   node tools/compare-transcripts.mjs archivo.md archivo.gemini-check.md
//   node tools/compare-transcripts.mjs archivo.md archivo.gemini-check.md --json
//
// EXIT CODE: 0 = sin discrepancias de valor, listo para el resto del
// pipeline mecánico. 1 = al menos una discrepancia, necesita que alguien
// (Claude, cuando lo convoquen) la resuelva contra el PDF.
// ============================================================================

import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

function extractTables(mdPath) {
  const out = execFileSync('node', [resolve(projectRoot, 'tools/extract-table-rows.mjs'), mdPath, '--json'], {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'],
  });
  return JSON.parse(out).tables;
}

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

// Copia deliberada de tools/sum-check.mjs (parseNumber), NO un import: ese archivo corre su propio
// main() al cargarse (leería el argv de ESTE script, no el suyo). Mismo criterio de
// auto-detección de separador de miles/decimal, incluido el espacio escandinavo (Admin/CHANGELOG.md
// Versión 299) -- si se corrige un bug de parseo ahí, corregir acá también.
function parseNumber(raw) {
  let s = String(raw).trim();
  s = s.replace(/(\d)\s+(?=\d)/g, '$1');
  let negative = false;
  if (/^\(.*\)$/.test(s)) { negative = true; s = s.slice(1, -1); }
  if (s.startsWith('-')) { negative = true; s = s.slice(1); }
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma !== -1 && lastDot !== -1) {
    if (lastComma > lastDot) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (lastComma !== -1) {
    if (/,\d{3}$/.test(String(raw).trim().replace(/^\(|\)$/g, '').replace(/^-/, ''))) {
      s = String(raw).trim().replace(/^\(|\)$/g, '').replace(/^-/, '').replace(/,/g, '');
    } else {
      s = s.replace(',', '.');
    }
  } else if (lastDot !== -1) {
    if (/\.\d{3}$/.test(s) && (s.match(/\./g) || []).length >= 1 && s.replace(/\./g, '').length > 3) {
      s = s.replace(/\./g, '');
    }
  }
  const n = parseFloat(s);
  return Number.isNaN(n) ? null : (negative ? -n : n);
}

function buildLabelMap(tables) {
  const map = new Map(); // normalizado -> { rawLabel, occurrences: [{values, page, section}] }
  for (const table of tables) {
    for (const row of table.rows) {
      const label = (row.rawLabel || '').trim();
      const key = normalize(label);
      if (!key) continue;
      if (!map.has(key)) map.set(key, { rawLabel: label, occurrences: [] });
      map.get(key).occurrences.push({ values: row.values, page: table.page, section: table.section });
    }
  }
  return map;
}

function valuesEqual(valsA, valsB) {
  if (valsA.length !== valsB.length) return false;
  for (let i = 0; i < valsA.length; i++) {
    const a = parseNumber(valsA[i]);
    const b = parseNumber(valsB[i]);
    if (a === null && b === null) continue; // ninguno de los dos parseó -- no es una discrepancia de VALOR
    if (a === null || b === null) return false; // uno sí y el otro no -- eso sí importa
    if (Math.abs(a - b) > 0.005) return false;
  }
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const positional = args.filter((a) => !a.startsWith('--'));
  const [mdA, mdB] = positional;
  if (!mdA || !mdB) {
    console.error('Uso: node tools/compare-transcripts.mjs <transcripción1.md> <transcripción2.md> [--json]');
    process.exit(2);
  }

  const tablesA = extractTables(mdA);
  const tablesB = extractTables(mdB);
  const mapA = buildLabelMap(tablesA);
  const mapB = buildLabelMap(tablesB);

  const mismatches = [];
  const onlyInA = [];
  const onlyInB = [];
  const ambiguous = [];

  for (const key of new Set([...mapA.keys(), ...mapB.keys()])) {
    const a = mapA.get(key);
    const b = mapB.get(key);
    if (a && !b) { onlyInA.push(a.rawLabel); continue; }
    if (b && !a) { onlyInB.push(b.rawLabel); continue; }
    if (a.occurrences.length > 1 || b.occurrences.length > 1) { ambiguous.push(a.rawLabel); continue; }
    const occA = a.occurrences[0];
    const occB = b.occurrences[0];
    if (!valuesEqual(occA.values, occB.values)) {
      mismatches.push({ label: a.rawLabel, pageA: occA.page, valuesA: occA.values, pageB: occB.page, valuesB: occB.values });
    }
  }

  const result = {
    fileA: mdA, fileB: mdB,
    match: mismatches.length === 0,
    mismatches,
    onlyInA: onlyInA.sort(), onlyInB: onlyInB.sort(), ambiguous: ambiguous.sort(),
  };

  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`${mdA}\n  vs\n${mdB}\n`);
    if (result.match) {
      console.log(`MATCH -- ningún rubro compartido y sin ambigüedad tiene valores distintos.`);
    } else {
      console.log(`DISCREPANCIA -- ${mismatches.length} rubro(s) con el mismo texto y valores distintos:\n`);
      mismatches.forEach((m) => {
        console.log(`  "${m.label}"`);
        console.log(`    A (pág. ${m.pageA}): ${JSON.stringify(m.valuesA)}`);
        console.log(`    B (pág. ${m.pageB}): ${JSON.stringify(m.valuesB)}`);
      });
    }
    console.log(`\n(informativo, no bloquea) solo en A: ${onlyInA.length} · solo en B: ${onlyInB.length} · ambiguos (rubro repetido): ${ambiguous.length}`);
  }

  process.exit(result.match ? 0 : 1);
}

main();
