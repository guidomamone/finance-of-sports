#!/usr/bin/env node
// ============================================================================
// tools/verify-numbers.mjs — ¿los números de una transcripción .md están en el PDF?
//
// Es la "segunda voz" GRATIS para PDFs con texto seleccionable: en vez de pedirle una segunda
// transcripción a otra IA, se compara cada número del .md contra el texto que el propio PDF trae
// adentro (pdftotext). Una IA de OCR puede leer mal un dígito (Mistral, Ponte Preta 2023-24:
// 150.399.811 en vez de 150.595.811); el texto interno del PDF no puede.
//
// Es independiente del formato de tablas: no mira rubros ni columnas, solo el CONJUNTO de números
// (sin separadores de miles ni decimales: "1.234,50" y "1,234.50" son ambos "123450").
//
// Tres preguntas:
//   1. ¿El PDF tiene texto usable?      -> si no (escaneo, o texto roto), esta tool NO aplica.
//   2. ¿Hay números en el .md que no están en el PDF?  -> lectura mal hecha (o inventada).
//   3. ¿Hay números del PDF que no están en el .md?    -> transcripción incompleta.
//
// USO:  node tools/verify-numbers.mjs <archivo.pdf> [<archivo.md>] [--json]
//       (sin .md, usa el .md con el mismo nombre al lado del PDF)
// EXIT: 0 = ok, 1 = revisar, 2 = no aplica (escaneo/texto roto) o error de uso.
// Se puede importar: import { verifyNumbers } from './verify-numbers.mjs'
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// Un número es: grupos de miles con punto o coma (1.234.567,89 / 1,234,567.89), o grupos con ESPACIO
// solo si no hay puntos ni comas de miles (formato escandinavo 1 234 567), o decimales sueltos, o 4+
// dígitos seguidos. El espacio NO se acepta como separador cuando hay puntos/comas: en una tabla, dos
// columnas contiguas ("133.816 189.064") son dos números, no uno (BUG del primer intento: los pegaba y
// marcaba el 38% de las páginas como dudosas por pura diferencia de formato). Tampoco pega una
// referencia de nota con el importe que le sigue ("13 228.106" son 13 y 228.106).
export const NUM_RE = /\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?|\d{1,3}(?: \d{3})+(?:,\d{1,2}(?!\d))?(?![.,]?\d)|\d+[.,]\d{2}\b|\d{4,}/g;
export const norm = (t) => t.replace(/[\s.,]/g, '');
const MIN_DIGITS = 4; // ignora "12", "3,5", páginas, notas: solo cifras de 4+ dígitos

export function extractNumbers(text) {
  const out = new Set();
  for (const m of text.matchAll(NUM_RE)) {
    const n = norm(m[0]);
    if (n.length >= MIN_DIGITS) out.add(n);
  }
  return out;
}

function pdfText(pdfPath) {
  // Buffer -> string a mano: pdftotext puede traer bytes raros y no queremos que nada explote.
  const buf = execFileSync('pdftotext', ['-layout', pdfPath, '-'], { maxBuffer: 512 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  return buf.toString('utf8');
}

function pageCount(pdfPath) {
  const out = execFileSync('pdfinfo', [pdfPath], { maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString('latin1');
  const m = out.match(/^Pages:\s+(\d+)/m);
  return m ? Number(m[1]) : null;
}

// Umbrales (calibrados con los 15 documentos del test de motores del 2026-09-29 -- ver
// Admin/tests/test-motores-resultados.md; si se cambian, volver a correr ese test):
export const THRESHOLDS = {
  minPdfNumbers: 30,       // menos números que esto en el PDF: no hay base para comparar
  minCharsPerPage: 150,    // menos texto por página que esto: escaneo (o casi)
  maxUnmatchedAbs: 3,      // tolerancia de números del .md ausentes del PDF (texto que el OCR lee de una
  maxUnmatchedRel: 0.05,   // imagen: direcciones, sellos): lo que sea mayor entre 3 y este % del .md
  maxTextRatio: 2.5,       // si el .md tiene más de 2,5x los números que el texto del PDF: el PDF trae texto PARCIAL
  garbledCoverage: 0.25,   // si el .md tiene menos que este % de los números del PDF, el texto del PDF es ilegible (fuente sin mapa Unicode), no el .md el que está mal
  minCoverage: 0.85,       // % de los números del PDF que tienen que estar en el .md
};

// Distancia de Hamming (solo sustituciones: así se equivoca un OCR con un dígito) entre dos
// cadenas de igual largo. Devuelve Infinity si el largo difiere.
function hamming(a, b) {
  if (a.length !== b.length) return Infinity;
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

// Un número del .md que NO está en el PDF pero es casi igual a uno que SÍ está = lectura mal hecha
// (150.399.811 vs 150.595.811). Es la señal real; un número sin parecido es más bien texto de imagen.
function nearMisses(unmatched, pdfNums) {
  const byLen = new Map();
  for (const n of pdfNums) { if (!byLen.has(n.length)) byLen.set(n.length, []); byLen.get(n.length).push(n); }
  const strong = []; const weak = [];
  // Una cifra redonda (580.000.000, 21.500.000) se parece a otra redonda por pura casualidad: no dice
  // nada de una lectura mal hecha. Solo cuentan cifras con varios dígitos distintos de cero.
  const sig = (n) => n.replace(/0/g, '').length;
  for (const u of unmatched) {
    const cands = byLen.get(u.length) || [];
    for (const c of cands) {
      const d = hamming(u, c);
      if (u.length >= 7 && d <= 2 && sig(u) >= 5 && sig(c) >= 5) { strong.push([u, c]); break; }
      if (u.length < 7 && d === 1 && sig(u) >= 4 && sig(c) >= 4) { weak.push([u, c]); break; }
    }
  }
  return { strong, weak };
}

export function verifyNumbers(pdfPath, mdPath) {
  const T = THRESHOLDS;
  const pages = pageCount(pdfPath);
  let text = '';
  try { text = pdfText(pdfPath); } catch { /* sigue: text vacío = sin texto */ }
  const pdfNums = extractNumbers(text);
  const charsPerPage = pages ? text.replace(/\s/g, '').length / pages : 0;

  if (pdfNums.size < T.minPdfNumbers || charsPerPage < T.minCharsPerPage) {
    return { applicable: false, verdict: 'no-aplica', reason: `el PDF no trae texto usable (${pdfNums.size} números, ${Math.round(charsPerPage)} caracteres/pág): escaneo o texto roto`, pages, pdfNumbers: pdfNums.size };
  }
  const mdNums = extractNumbers(readFileSync(mdPath, 'utf8'));
  if (mdNums.size > T.maxTextRatio * pdfNums.size) {
    return { applicable: false, verdict: 'no-aplica', reason: `el PDF trae texto parcial (${pdfNums.size} números contra ${mdNums.size} en el .md)`, pages, pdfNumbers: pdfNums.size };
  }
  const unmatched = [...mdNums].filter((n) => !pdfNums.has(n));
  const missing = [...pdfNums].filter((n) => !mdNums.has(n));
  const coverage = 1 - missing.length / pdfNums.size;
  if (coverage < T.garbledCoverage) {
    // Caso real (Ferro Carril Oeste, ejercicio 121): pdftotext devuelve "texto" que no es el contenido
    // (mojibake, ver CLAUDE.md "Gotchas de tooling"). Comparar contra eso no sirve: se trata como escaneo.
    return { applicable: false, verdict: 'no-aplica', reason: `el texto del PDF no coincide con casi nada del .md (${(coverage * 100).toFixed(0)}% de cobertura): texto ilegible, se trata como escaneo`, pages, pdfNumbers: pdfNums.size };
  }
  const allowed = Math.max(T.maxUnmatchedAbs, Math.ceil(T.maxUnmatchedRel * mdNums.size));
  const { strong, weak } = nearMisses(unmatched, pdfNums);
  const reasons = [];
  if (strong.length >= 1 || weak.length >= 2) reasons.push(`${strong.length + weak.length} cifra(s) del .md casi iguales a una del PDF pero con un dígito distinto (lectura mal hecha): ${[...strong, ...weak].slice(0, 3).map(([a, b]) => `${a} vs ${b}`).join(', ')}`);
  if (unmatched.length > allowed) reasons.push(`${unmatched.length} números del .md no están en el PDF (tolerancia ${allowed})`);
  if (coverage < T.minCoverage) reasons.push(`el .md solo tiene el ${(coverage * 100).toFixed(0)}% de los números del PDF (mínimo ${T.minCoverage * 100}%): incompleto`);
  return {
    applicable: true,
    verdict: reasons.length ? 'revisar' : 'ok',
    reason: reasons.join('; '),
    pages, pdfNumbers: pdfNums.size, mdNumbers: mdNums.size,
    unmatchedCount: unmatched.length, unmatchedSample: unmatched.slice(0, 8), nearMissCount: strong.length + weak.length,
    missingCount: missing.length, missingSample: missing.slice(0, 8),
    coverage: Number(coverage.toFixed(3)),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const pos = args.filter((a) => !a.startsWith('--'));
  if (!pos[0]) { console.error('Uso: node tools/verify-numbers.mjs <archivo.pdf> [<archivo.md>] [--json]'); process.exit(2); }
  const md = pos[1] || pos[0].replace(/\.pdf$/i, '.md');
  if (!existsSync(pos[0]) || !existsSync(md)) { console.error(`No existe ${!existsSync(pos[0]) ? pos[0] : md}`); process.exit(2); }
  const r = verifyNumbers(pos[0], md);
  if (args.includes('--json')) console.log(JSON.stringify(r, null, 2));
  else console.log(`${r.verdict.toUpperCase()}${r.reason ? ' -- ' + r.reason : ''}${r.applicable ? `\n  números: PDF ${r.pdfNumbers} / .md ${r.mdNumbers}, cobertura ${(r.coverage * 100).toFixed(0)}%, del .md sin respaldo: ${r.unmatchedCount} ${JSON.stringify(r.unmatchedSample)}` : ''}`);
  process.exit(r.verdict === 'ok' ? 0 : r.verdict === 'revisar' ? 1 : 2);
}
