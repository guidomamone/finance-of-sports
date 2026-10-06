#!/usr/bin/env node
// ============================================================================
// tools/check-transcripcion-fidelidad.js — ¿esta transcripción .md es fiel a su
// PDF fuente? Mira CONTENIDO, no solo cantidad de páginas.
//
// EL PROBLEMA QUE RESUELVE (to-do 90, encontrado resolviendo el to-do 71,
// 2026-09-27): el chequeo que se usó en el test de costo de transcripción
// (Admin/Archive/test-costo-transcripcion.md) solo contaba páginas, y eso dejó pasar dos
// fallas reales sin detectar:
//   (a) marcas de página `--- pág. N ---` CORRIDAS — páginas reales del PDF
//       fusionadas bajo menos marcas de las que corresponden. El conteo TOTAL de
//       marcas da bien igual, así que un chequeo de "¿hay N marcas para un PDF de
//       N páginas?" no lo agarra.
//   (b) bloques que un modelo barato (Haiku) reemplazó directamente por un
//       comentario placeholder EN INGLÉS describiendo la tabla en vez de
//       transcribirla (ej. "[Complex depreciation table with multiple asset
//       categories, showing gross values...]", encontrado real en
//       Clubes/Colombia/Envigado/estados-financieros-2023.md). El placeholder
//       ocupa una marca de página como cualquier contenido real, así que tampoco
//       lo agarra un conteo de páginas.
//
// QUÉ CHEQUEA, por cada .md bajo Clubes/ que tenga al menos una marca de página:
//   1. Cobertura de marcas de página contra la cantidad real de páginas del PDF
//      hermano (mismo nombre base), vía `pdfinfo`: páginas faltantes, marcas
//      duplicadas, marcas "colapsadas" (`--- pág. 15-17 ---`, un rango en vez de
//      una marca por página). SOLO para archivos cuyas marcas usan el formato
//      simple/estándar (`--- pág. N ---` o `--- pág. N-M ---`) — un archivo con
//      marcas anotadas a mano (`--- pág. 12: Anexo III — Detalle de gastos ---`,
//      `--- pág. N de N ---`, "pág. impresa") se marca como formato no estándar y
//      NO se le exige cobertura estricta, para no reventar de falsos positivos
//      sobre convenciones ad-hoc ya usadas en el proyecto.
//   2. Placeholders de contenido: una línea ENTERA entre corchetes, con
//      vocabulario en inglés de tabla/sección/resumen, en un documento que por lo
//      demás está en español/portugués/otro idioma. El inglés mismo es la señal:
//      nadie transcribe un balance colombiano describiéndolo en inglés, así que
//      una línea así es casi seguro un resumen del modelo, no contenido real. Se
//      excluyen a propósito los placeholders CORTOS ya usados como convención
//      legítima en el proyecto (`[LOGO]`, `[Firma]`, `[encabezado]`, notas de
//      procedencia tipo `[OCR, Tesseract ...]`, `[TRANSCRIPCION VERIFICADA...]`).
//   3. Páginas con muy poco texto comparadas con la mediana del propio documento
//      (señal DÉBIL, para revisión humana — una carátula o una página en blanco
//      real también da esto, no es un error por sí solo).
//
// QUÉ NO HACE, A PROPÓSITO (mismo espíritu que tools/audit.js): no dice si un
// NÚMERO está bien contra el PDF — esto es fidelidad de la TRANSCRIPCIÓN (¿está
// todo el texto?), no verificación de datos (eso es club-data-mapping, al
// onboardear). No reemplaza la verificación humana obligatoria de un documento
// marcado como escaneado (club-data-mapping sección 6, punto 6).
//
// LIMITACIÓN REAL DEL CHEQUEO DE COBERTURA (encontrada verificando este mismo
// script contra Clubes/Colombia/Atletico Bucaramanga/estados-financieros-2017.md,
// 2026-09-27): el chequeo asume que la marca "--- pág. N ---" es la página FÍSICA
// N del PDF (posición N en el archivo), pero no siempre es así — ese archivo
// puntual arrancó su numeración de marcas más adelante que la página física 1
// (offset constante de +4, probablemente por páginas de portada/legales al
// principio que no recibieron marca propia), así que un hueco DENTRO de la
// numeración de marcas (ej. de la 13 a la 18) puede no corresponder a ningún
// contenido real faltante — puede ser simplemente que las marcas más chicas
// numeran páginas físicas más grandes de lo que su propio número sugiere. Por
// eso `paginas-faltantes` es P2 (revisar), no P1 (confiar y bloquear): es
// evidencia de que algo no cuadra, no un veredicto de que falta contenido.
//
// USO:
//   node tools/check-transcripcion-fidelidad.js               todo Clubes/
//   node tools/check-transcripcion-fidelidad.js <path...>      solo esos archivos/carpetas
//   node tools/check-transcripcion-fidelidad.js --json
//   node tools/check-transcripcion-fidelidad.js --quiet         solo P1
//
// Sale con código 1 si hay algún P1.
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ARGS = process.argv.slice(2);
const JSON_OUT = ARGS.includes('--json');
const QUIET = ARGS.includes('--quiet');
const inputPaths = ARGS.filter(a => !a.startsWith('--'));

const ROOT = path.resolve(__dirname, '..');
const CLUBES_DIR = path.join(ROOT, 'Clubes');

const findings = [];
const add = (sev, code, file, msg) => findings.push({ sev, code, file, msg });

// ---------------------------------------------------------------------------
// listado de archivos
// ---------------------------------------------------------------------------
function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
}

function listMarkdownFiles(roots) {
  const out = [];
  const targets = roots.length ? roots.map(p => path.resolve(p)) : [CLUBES_DIR];
  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    const stat = fs.statSync(target);
    if (stat.isFile()) { if (target.endsWith('.md')) out.push(target); continue; }
    walk(target, out);
  }
  return out;
}

// ---------------------------------------------------------------------------
// 1. cobertura de marcas de página
// ---------------------------------------------------------------------------

// Formato ESTÁNDAR únicamente: "--- pág. N ---" o "--- pág. N-M ---" (con o sin
// acento en "pág", con "-" como separador de rango). Cualquier otra cosa (dos
// puntos + descripción, "de", "impresa", "a" como separador) se trata aparte.
const STANDARD_MARK_RE = /^--- *p[aá]g\.? *(\d+)(?:\s*-\s*(\d+))?\s*---\s*$/i;
const ANY_MARK_LINE_RE = /^--- *p[aá]g\.?/i;

function pdfPageCount(pdfPath) {
  try {
    // stdio: pipe para stdout, ignore para stderr — algunos PDF de este archivo
    // están mal formados (streams truncados, xref roto) y pdfinfo igual logra
    // imprimir "Pages:" en stdout después de volcar warnings/errores a stderr;
    // sin silenciar stderr, esos warnings inundan la consola de este script.
    const out = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const m = out.match(/^Pages:\s*(\d+)/m);
    return m ? parseInt(m[1], 10) : null;
  } catch (e) {
    const out = (e.stdout || '').toString();
    const m = out.match(/^Pages:\s*(\d+)/m);
    return m ? parseInt(m[1], 10) : null;
  }
}

function resumirRangos(nums) {
  const out = [];
  let start = nums[0], prev = nums[0];
  for (let i = 1; i <= nums.length; i++) {
    const n = nums[i];
    if (n === prev + 1) { prev = n; continue; }
    out.push(start === prev ? `${start}` : `${start}-${prev}`);
    start = prev = n;
  }
  return out.join(', ');
}

function checkCobertura(relFile, absFile, lines) {
  const markLines = lines.filter(l => ANY_MARK_LINE_RE.test(l.trim()));
  if (!markLines.length) return;

  const noEstandar = markLines.filter(l => !STANDARD_MARK_RE.test(l.trim()));
  if (noEstandar.length) {
    add('P3', 'formato-marca-no-estandar', relFile,
      `${noEstandar.length} de ${markLines.length} marcas de página usan un formato distinto de "--- pág. N ---" ` +
      `(ej. "${noEstandar[0].trim()}") — no se le exige cobertura estricta, revisar a mano si hace falta`);
    return;
  }

  const marks = markLines.map(l => {
    const m = l.trim().match(STANDARD_MARK_RE);
    const a = parseInt(m[1], 10);
    const b = m[2] ? parseInt(m[2], 10) : a;
    return { a, b, raw: l.trim() };
  });

  for (const mk of marks) {
    if (mk.b > mk.a) add('P2', 'paginas-colapsadas', relFile, `Marca "${mk.raw}" cubre ${mk.b - mk.a + 1} páginas en una sola marca, en vez de una por página`);
  }

  const covered = new Map();
  for (const mk of marks) for (let p = mk.a; p <= mk.b; p++) covered.set(p, (covered.get(p) || 0) + 1);
  for (const [p, n] of covered) if (n > 1) add('P2', 'pagina-duplicada', relFile, `pág. ${p} tiene ${n} marcas`);

  const pdfPath = absFile.replace(/\.md$/, '.pdf');
  const realPages = fs.existsSync(pdfPath) ? pdfPageCount(pdfPath) : null;
  if (realPages == null) { add('P3', 'sin-pdf-para-comparar', relFile, 'No hay .pdf hermano local (o pdfinfo falló) para confirmar la cantidad real de páginas'); return; }

  const faltantes = [];
  for (let p = 1; p <= realPages; p++) if (!covered.has(p)) faltantes.push(p);
  if (faltantes.length) add('P2', 'paginas-faltantes', relFile,
    `El PDF tiene ${realPages} páginas, hay un hueco en las marcas: ${resumirRangos(faltantes)}. ` +
    `OJO: esto asume que la marca N es la página FÍSICA N del PDF — no siempre es así (ver cabecera ` +
    `del script), así que puede ser contenido faltante de verdad, o marcas que numeran distinto ` +
    `(offset constante por páginas de portada/legales sin marca propia). Revisar contra el PDF antes ` +
    `de asumir cuál de las dos es.`);
}

// ---------------------------------------------------------------------------
// 2. placeholders de contenido (bloque entero reemplazado por un resumen)
// ---------------------------------------------------------------------------

// Vocabulario visto en los placeholders reales (Envigado 2023, Versión 254):
// frases descriptivas EN INGLÉS sobre una tabla/sección, en documentos que por lo
// demás están en español/portugués. Un bracket corto y en el idioma del
// documento ("[LOGO]", "[Firma]", "[Escudo del Club X]") es una convención
// legítima ya usada en el proyecto para contenido no textual — no se flaguea.
const ENGLISH_HINTS = /\b(table|section|showing|detailed|complex|multiple|various|components|movements|balances|reconciliation|categories|omitted|summary|signatures|obligations|statement|breakdown|consolidated)\b/i;
const MIN_LEN = 15;

// Segunda familia, DISTINTA de la de arriba: un placeholder CORTO metido adentro
// de una celda de tabla en vez de la cifra/dato real (ej. "| Beneficios a
// empleados | 14 | [value] | [value] |", encontrado real en Envigado 2023,
// líneas 246/249). No son oraciones largas, son 1-2 palabras en inglés que
// reemplazan un dato puntual — más peligroso todavía porque una tabla con estos
// adentro se ve "casi completa" a simple vista. La convención sancionada del
// proyecto para un dato genuinamente ilegible es "[ilegible]" en ESPAÑOL (ver
// CLAUDE.md, "Cada PDF nuevo"), así que cualquiera de estas palabras en inglés,
// sueltas entre corchetes, es un invento del modelo, no la convención real.
const SHORT_PLACEHOLDER_RE = /^(value|not visible|not clear|missing|n\/a|unclear|unreadable|illegible|blank|empty|redacted|omitted|unknown)$/i;

function checkPlaceholders(relFile, lines) {
  lines.forEach((line, i) => {
    const brackets = line.match(/\[([^\]]+)\]/g) || [];
    for (const b of brackets) {
      const inner = b.slice(1, -1).trim();
      const isFullLine = line.trim() === b;
      if (isFullLine && inner.length >= MIN_LEN && ENGLISH_HINTS.test(inner)) {
        add('P1', 'placeholder-de-contenido', relFile,
          `Línea ${i + 1}: "${line.trim().slice(0, 110)}${line.trim().length > 110 ? '…' : ''}" — pinta de resumen en inglés en vez de transcripción real`);
      } else if (SHORT_PLACEHOLDER_RE.test(inner)) {
        add('P1', 'placeholder-corto-en-celda', relFile,
          `Línea ${i + 1}: "${b}" dentro de "${line.trim().slice(0, 90)}${line.trim().length > 90 ? '…' : ''}" — placeholder en inglés en vez del dato real (la convención del proyecto para ilegible es "[ilegible]" en español)`);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// 3. páginas cortas vs. la mediana del propio documento (señal débil)
// ---------------------------------------------------------------------------

function checkPaginasCortas(relFile, text) {
  const parts = text.split(/^--- *p[aá]g\.?.*?---\s*$/gim).map(s => s.trim()).filter(Boolean);
  if (parts.length < 6) return; // documento chico, la mediana no dice mucho
  const lens = parts.map(s => s.length).sort((a, b) => a - b);
  const mediana = lens[Math.floor(lens.length / 2)];
  if (mediana < 150) return; // documento ya de por sí ralo (ej. mayormente imágenes)
  const cortas = parts.filter(s => s.length < mediana * 0.15).length;
  if (cortas) add('P3', 'paginas-cortas', relFile,
    `${cortas} página(s) con menos del 15% del texto mediano del documento (mediana ${mediana} caracteres) — puede ser legítimo (carátula, página en blanco), revisar si no`);
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function main() {
  const files = listMarkdownFiles(inputPaths);
  let scanned = 0;
  for (const absFile of files) {
    const text = fs.readFileSync(absFile, 'utf8');
    const lines = text.split('\n');
    if (!lines.some(l => ANY_MARK_LINE_RE.test(l.trim()))) continue; // no es una transcripción paginada
    scanned++;
    const relFile = path.relative(ROOT, absFile);
    checkCobertura(relFile, absFile, lines);
    checkPlaceholders(relFile, lines);
    checkPaginasCortas(relFile, text);
  }

  const bySev = { P1: [], P2: [], P3: [] };
  for (const f of findings) bySev[f.sev].push(f);

  if (JSON_OUT) {
    console.log(JSON.stringify({ scanned, totalMarkdown: files.length, findings }, null, 2));
  } else {
    console.log(`Escaneados ${scanned} archivos con marcas de página, de ${files.length} .md encontrados bajo ${inputPaths.length ? inputPaths.join(', ') : 'Clubes/'}.\n`);
    for (const sev of ['P1', 'P2', 'P3']) {
      if (QUIET && sev !== 'P1') continue;
      if (!bySev[sev].length) continue;
      console.log(`--- ${sev} (${bySev[sev].length}) ---`);
      for (const f of bySev[sev]) console.log(`[${f.code}] ${f.file}\n    ${f.msg}`);
      console.log('');
    }
    if (!findings.length) console.log('Sin hallazgos.');
    else {
      const resumen = ['P1', 'P2', 'P3'].map(s => `${bySev[s].length} ${s}`).join(', ');
      console.log(`Total: ${resumen}.`);
    }
  }

  process.exit(bySev.P1.length ? 1 : 0);
}

main();
