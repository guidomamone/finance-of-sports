#!/usr/bin/env node
// PROTOTIPO para to-do 98, paso 4. No integrado a ningún flujo todavía.
//
// Lee un .md transcripto (Mistral/Gemini) y saca SOLO las filas de sus tablas
// Markdown a JSON compacto: {page, section, columns, rows:[{rawLabel,values,bold}]}.
// Objetivo: que Claude lea esto en vez del documento entero para encontrar los
// rubros de Recursos/Gastos — el resto del documento (actas, firmas, dictamen)
// no aporta ningún dato a cargar.
//
// A PROPÓSITO no convierte los números a float: la interpretación numérica
// (¿cuál rubro suma a qué total?) sigue siendo criterio de Claude. Lo que SÍ
// se puede resolver mecánicamente es de dónde salió el string — ver
// detectNumberFormat() abajo: qué separador es de miles y cuál es decimal,
// AUTODETECTADO del propio documento en vez de un mapeo por país (probado:
// Almagro, en Argentina, usa formato "21,597,931.54" (coma miles/punto
// decimal) mientras River y Boca, mismo país, usan "334.420.749" (punto
// miles/coma decimal) — depende de la plantilla del estudio contable, no
// del país, así que un mapeo país->formato se habría equivocado con Almagro).
//
// Uso: node tools/extract-table-rows.mjs <archivo.md> [--json] [--relevant]

import { readFileSync } from 'node:fs';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Uso: node tools/extract-table-rows.mjs <archivo.md> [--json] [--relevant]');
  process.exit(1);
}
const asJson = process.argv.includes('--json');
const onlyRelevant = process.argv.includes('--relevant');

const raw = readFileSync(filePath, 'utf8');
const lines = raw.split('\n');

function stripBold(s) {
  return s.replace(/\*\*/g, '').trim();
}

function splitRow(line) {
  // Filas tipo "|  a | b | c  |" -> ['a','b','c'], sacando los bordes vacíos.
  const cells = line.split('|').map((c) => c.trim());
  if (cells.length && cells[0] === '') cells.shift();
  if (cells.length && cells[cells.length - 1] === '') cells.pop();
  return cells;
}

function isSeparatorRow(cells) {
  return cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '');
}

// Un número con 2+ grupos de miles (ej. "1.234.567" o "1,234,567") SOLO puede
// ser separador de miles, nunca decimal — es la señal inequívoca. Cuenta cuál
// convención domina en el documento entero.
//
// "space" (agregado probando prepare-onboarding.mjs contra un documento noruego real,
// Rosenborg 2012: "159 113 159") es la 3ra convención real que aparece en el corpus del
// proyecto -- sin esto, un documento escandinavo (espacio como separador de miles) caía
// SIEMPRE del lado "eu" o "us" por descarte, aunque ninguno de los dos sea el correcto, y
// ese numberFormat erróneo terminaba en el briefing sin ninguna señal de que estaba mal.
function detectNumberFormat(text) {
  const counts = {
    us: (text.match(/\d{1,3}(,\d{3}){2,}(\.\d{1,2})?/g) || []).length,
    eu: (text.match(/\d{1,3}(\.\d{3}){2,}(,\d{1,2})?/g) || []).length,
    space: (text.match(/\d{1,3}( \d{3}){2,}(,\d{1,2})?/g) || []).length,
  };
  const labels = {
    us: 'us (coma miles, punto decimal)',
    eu: 'eu (punto miles, coma decimal)',
    space: 'espacio como separador de miles (escandinavo)',
  };
  const max = Math.max(counts.us, counts.eu, counts.space);
  if (max === 0) return { format: 'ambiguo', evidence: counts };
  const winners = Object.keys(counts).filter((k) => counts[k] === max);
  if (winners.length > 1) return { format: 'ambiguo', evidence: counts };
  return { format: labels[winners[0]], evidence: counts };
}

// Palabras clave de ingresos/gastos, multi-idioma (ES/IT/EN vistos en el
// corpus hasta ahora). Se usa para MARCAR relevancia, no para descartar filas
// — con --relevant se filtra, pero por default se conserva todo (una palabra
// clave que falta para un idioma nuevo no puede perder datos en silencio).
const RELEVANT_KEYWORDS = [
  // resultado / income statement
  'resultado', 'conto economico', 'income statement', 'profit and loss', 'regnskap',
  'resultatregnskap', 'αποτελεσμα',
  // ingresos
  'recaudac', 'ingreso', 'recurso', 'cuota', 'venta', 'ricavi', 'proventi', 'revenue',
  'income', 'inntekt', 'εσοδα',
  // gastos
  'gasto', 'egreso', 'costo', 'costi', 'oneri', 'expense', 'cost', 'kostnad', 'εξοδα',
];

function isLikelyRelevant(section, columns) {
  const hay = `${section || ''} ${(columns || []).join(' ')}`.toLowerCase();
  return RELEVANT_KEYWORDS.some((kw) => hay.includes(kw));
}

function isStrongHeading(line) {
  if (/^#{1,6}\s/.test(line)) return true;
  // BUG REAL encontrado con prepare-onboarding.mjs contra River 2021: un título en negrita de
  // línea completa ("**Estado de Recursos y Gastos**") es tan claramente un heading como uno con
  // "#", pero en minúscula/mixto no pasaba el test de ALL-CAPS de abajo -- quedaba en el trail
  // DÉBIL, y una letra repetida de membrete ("# Club Atlético...") más vieja de la MISMA página o
  // de la página anterior (el trail no se resetea por página) le ganaba el lugar en el trail
  // FUERTE, que tiene prioridad. Resultado: la tabla de Recursos y Gastos -- la más importante del
  // documento -- salía marcada `likelyRelevant:false` porque su `section` terminaba siendo el
  // bloque de firmas de la página anterior, no su propio título.
  if (/^\*\*.+\*\*$/.test(line)) return true;
  const letters = line.replace(/[^a-zA-ZÀ-ÿ]/g, '');
  if (letters.length < 4) return false;
  const upper = letters.replace(/[^A-ZÀ-Ý]/g, '');
  return upper.length / letters.length > 0.8;
}

function looksLikeHeading(line) {
  const t = line.trim();
  if (!t) return false;
  if (t.startsWith('|')) return false;
  if (t.startsWith('---')) return false;
  if (/^los cuadros y anexos/i.test(t)) return false;
  if (/^scanned with/i.test(t)) return false;
  if (t.length > 90) return false;
  return true;
}

const tables = [];
let page = 1;
let strongHeadingTrail = [];
let weakHeadingTrail = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  const pageMatch = line.match(/^---\s*pág\.\s*(\d+)\s*---/i);
  if (pageMatch) {
    page = parseInt(pageMatch[1], 10);
    i++;
    continue;
  }

  if (line.trim().startsWith('|')) {
    // Bloque de tabla: junta líneas consecutivas que empiezan con '|'.
    const tableLines = [];
    while (i < lines.length && lines[i].trim().startsWith('|')) {
      tableLines.push(lines[i]);
      i++;
    }
    // Preferir headings "fuertes" (markdown # o ALL-CAPS); si no hay,
    // caer al último texto corto visto, aunque sea prosa suelta.
    const trail = strongHeadingTrail.length ? strongHeadingTrail : weakHeadingTrail;
    const section = stripBold(trail.slice(-2).join(' / ')) || null;
    strongHeadingTrail = [];
    weakHeadingTrail = [];

    // Una tabla real (en este estilo de transcripción) siempre trae su fila
    // separadora (`| --- | --- |`) pegada al encabezado. Si este bloque NO
    // tiene ninguna, es la CONTINUACIÓN de la tabla anterior cortada por un
    // salto de página (con o sin membrete repetido en el medio) — tratar su
    // primera fila como encabezado sería leer un dato real como si fuera un
    // nombre de columna. Encontrado real: Once Caldas 2024, Nota 20
    // (Ingresos), la tabla se corta en "DIMAYOR" y sigue en la página
    // siguiente con "PARTICIPACIONES FEDERACION COLOMBIANA" sin repetir el
    // encabezado — sin este chequeo, esa fila se leía como columna.
    const hasSeparator = tableLines.some((tLine) => isSeparatorRow(splitRow(tLine)));
    const prevTable = tables[tables.length - 1];
    const isContinuation = !hasSeparator && prevTable && prevTable.page <= page && page - prevTable.page <= 1;

    let columns = isContinuation ? prevTable.columns : null;
    const rows = [];
    for (const tLine of tableLines) {
      const cells = splitRow(tLine);
      if (isSeparatorRow(cells)) continue;
      if (!columns) {
        // Primera fila no-separadora de la tabla = encabezado de columnas.
        columns = cells.map(stripBold);
        continue;
      }
      const rawLabel = stripBold(cells[0] || '');
      const values = cells.slice(1).map(stripBold);
      const bold = /\*\*/.test(cells[0] || '');
      const hasContent = rawLabel !== '' || values.some((v) => v !== '');
      if (!hasContent) continue;
      rows.push({ rawLabel, values, bold });
    }
    if (isContinuation && rows.length) {
      prevTable.rows.push(...rows);
    } else if (rows.length) {
      tables.push({ page, section, columns, rows, likelyRelevant: isLikelyRelevant(section, columns) });
    }
    continue;
  }

  if (looksLikeHeading(line)) {
    const t = line.trim();
    if (isStrongHeading(t)) {
      strongHeadingTrail.push(t);
      if (strongHeadingTrail.length > 2) strongHeadingTrail.shift();
    } else {
      weakHeadingTrail.push(t);
      if (weakHeadingTrail.length > 2) weakHeadingTrail.shift();
    }
  }
  i++;
}

const numberFormat = detectNumberFormat(raw);
const output = {
  file: filePath,
  numberFormat: numberFormat.format,
  numberFormatEvidence: numberFormat.evidence,
  tables: onlyRelevant ? tables.filter((t) => t.likelyRelevant) : tables,
};

if (asJson) {
  console.log(JSON.stringify(output));
} else {
  const rowCount = output.tables.reduce((n, t) => n + t.rows.length, 0);
  const relevantCount = tables.filter((t) => t.likelyRelevant).length;
  console.log(`${filePath}`);
  console.log(`  formato numérico detectado: ${numberFormat.format} (evidencia US=${numberFormat.evidence.us} EU=${numberFormat.evidence.eu} ESPACIO=${numberFormat.evidence.space})`);
  console.log(`  ${tables.length} tablas totales, ${relevantCount} marcadas relevantes`);
  console.log(`  ${output.tables.length} tablas / ${rowCount} filas en la salida${onlyRelevant ? ' (--relevant)' : ''}`);
  const asStr = JSON.stringify(output);
  console.log(`  JSON: ${asStr.length} caracteres (vs. ${raw.length} del .md completo, ${Math.round((1 - asStr.length / raw.length) * 100)}% menos)`);
}
