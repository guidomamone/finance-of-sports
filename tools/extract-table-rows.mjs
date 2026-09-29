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

// BUG REAL encontrado probando prepare-onboarding.mjs contra Corinthians 2024-25 (portugués,
// transcripción Mistral de un PDF con capa de texto nativa MUY limpia): el documento entero NO usa
// tablas Markdown para sus estados financieros -- son líneas de texto plano, una por rubro, sin
// ningún "|" ("Receita Operacional 19 863.685 776.864": etiqueta, Nota, 2 valores, todo separado
// por espacios simples). Sin esto, el detector de tablas de arriba encontraba 0 tablas en un
// documento de 5000+ líneas con datos reales adentro -- fallaba en silencio, no en visible.
//
// Reconocer una fila así: escanear desde la DERECHA tomando tokens que parecen un VALOR monetario
// (dígito + separador de miles/decimal, o entre paréntesis) hasta el primer token que no lo es. Si
// el token que queda justo a la izquierda de esos valores es una referencia de Nota (entero
// suelto de 1-3 dígitos, sin separador), se descarta -- no es parte de la etiqueta.
//
// A PROPÓSITO exige que el valor tenga un separador (".", "," o paréntesis): un token puramente
// numérico sin separador (ej. "2025", el año de un encabezado "Nota 2025 2024") NO cuenta como
// valor -- si no fuera así, esa misma cabecera se leería como una fila de datos más, con "Nota"
// de etiqueta y el año colado como si fuera un monto. El costo de esta regla: un valor real
// MENOR A 1000 sin separador de miles (raro en un estado financiero en miles/millones) puede
// perderse -- aceptable frente al riesgo de leer un año como plata.
// BUG REAL #2 encontrado con el mismo documento: una SUB-nota tipo "24.1"/"24.2" (Brasil numera
// sub-ítems de una Nota así) TIENE un separador ("."), así que looksLikeMoneyToken la contaba como
// un valor más -- "Cessão definitiva de atletas 24.1 107.405 338.421" salía con 3 "valores"
// (24.1, 107.405, 338.421) en vez de 2, con la sub-nota colada como si fuera plata. La señal que
// las distingue de un valor real: un separador de miles real agrupa de a 3 dígitos ("107.405"),
// una sub-nota tiene UN solo dígito después del punto ("24.1").
function looksLikeSubNoteRef(tok) {
  return /^\d{1,2}\.\d$/.test(tok);
}

function looksLikeMoneyToken(tok) {
  const t = tok.replace(/^\(/, '').replace(/\)$/, '');
  if (looksLikeSubNoteRef(t)) return false;
  return /\d/.test(t) && /[.,]/.test(t);
}

function looksLikeNoteRef(tok) {
  return /^\d{1,3}$/.test(tok) || looksLikeSubNoteRef(tok);
}

function parsePlainTextRow(line) {
  const t = line.trim();
  if (!t || t.startsWith('|') || t.startsWith('---')) return null;
  const tokens = t.split(/\s+/);
  if (tokens.length < 2) return null;
  let end = tokens.length;
  const values = [];
  while (end > 0 && looksLikeMoneyToken(tokens[end - 1])) {
    values.unshift(tokens[end - 1]);
    end--;
  }
  if (!values.length) return null;
  if (end > 1 && looksLikeNoteRef(tokens[end - 1])) end--;
  const rawLabel = tokens.slice(0, end).join(' ').trim();
  if (!rawLabel || /^[\d.,()%-]+$/.test(rawLabel)) return null;
  return { rawLabel, values };
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

// Palabras clave de ingresos/gastos, multi-idioma. Se usa para MARCAR relevancia, no para descartar filas
// — con --relevant se filtra, pero por default se conserva todo (una palabra clave que falta para un idioma
// nuevo no puede perder datos en silencio).
// AMPLIADA el 2026-09-29: al correr prepare-onboarding sobre los 21 documentos del piloto del inventario, los balances
// en ALEMÁN (Mönchengladbach, Hamburger), CROATA (Dinamo, Gorica), GRIEGO con acentos, FRANCÉS/NEERLANDÉS (Anderlecht)
// y DANÉS no marcaban NINGUNA tabla como relevante (0 de 13-35), así que el precedente de categorías se saltaba en silencio.
// Los términos se comparan sin acentos ni diéresis (normalizeText), así "αποτέλεσμα"/"αποτελεσμα", "résultat"/"resultat"
// y "omsætning"/"omsaetning" no necesitan una entrada por variante.
const RELEVANT_KEYWORDS = [
  // resultado / income statement
  'resultado', 'conto economico', 'income statement', 'profit and loss', 'regnskap', 'resultatregnskap',
  'αποτελεσμα', 'gewinn- und verlust', 'gewinn und verlust', 'guv', 'ergebnis', 'erfolgsrechnung',
  'racun dobiti', 'dobiti i gubitka', 'compte de resultat', 'resultatenrekening', 'resultatopgor', 'resultatopgo',
  'demonstracao do resultado', 'demonstracao de resultado', 'profit or loss', 'comprehensive income', 'statement of operations',
  // ingresos
  'recaudac', 'ingreso', 'recurso', 'cuota', 'venta', 'ricavi', 'proventi', 'revenue', 'income', 'inntekt', 'εσοδα',
  'umsatz', 'ertrag', 'ertraege', 'prihod', 'produits', 'opbrengst', 'omsaetning', 'indtaegt', 'receita', 'faturamento',
  'vendas', 'sponsor', 'przychod', 'gelir', 'intaekt',
  // gastos
  'gasto', 'egreso', 'costo', 'costi', 'oneri', 'expense', 'cost', 'kostnad', 'εξοδα',
  'aufwand', 'aufwend', 'rashod', 'troskov', 'charges', 'kosten', 'omkostning', 'udgift', 'despesa', 'custo', 'koszt', 'gider',
];

// Minúsculas, sin acentos/diéresis y con los dígrafos alemanes/daneses reducidos a su forma sin signo.
function normalizeText(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a').replace(/ð/g, 'd').replace(/ł/g, 'l');
}

function isLikelyRelevant(section, columns) {
  const hay = normalizeText(`${section || ''} ${(columns || []).join(' ')}`);
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

// BUG REAL #3 (Corinthians 2024-25): esta letra repetida de membrete ("SPORT CLUB CORINTHIANS
// PAULISTA...", ALL-CAPS, aparece al pie de CADA página) calificaba como heading FUERTE, y como el
// trail fuerte nunca se reseteaba por página, bloqueaba PARA SIEMPRE que el trail débil (que sí
// tenía el título real, "Demonstração do Resultado do Exercício") se llegara a usar -- ninguna
// página de este documento tiene otro heading fuerte que lo desplace. Y aunque se resolviera eso,
// la ventana de solo 2 headings es angosta cuando hay varias líneas de metadata entre el título
// real y la tabla (rango de fechas, moneda, fila "Nota AÑO AÑO") -- acá eran 4, así que el título
// se perdía igual por pura acumulación. TRAIL_MAX más ancho + resetear en cada salto de página
// arregla las dos cosas a la vez, sin romper el caso ya arreglado de River (su heading relevante
// está en la MISMA página que la tabla, no depende de nada de la página anterior).
const TRAIL_MAX = 5;

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
    strongHeadingTrail = [];
    weakHeadingTrail = [];
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
    const section = stripBold(trail.join(' / ')) || null;
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

  const plainRow = parsePlainTextRow(line);
  if (plainRow) {
    // Junta líneas CONSECUTIVAS que también parsean como fila de texto plano. Exige 2+ para
    // considerarlo tabla -- una sola línea suelta que matchea (ej. una oración que termina en un
    // porcentaje, "45,2%") es más probablemente prosa con un número adentro que una tabla real.
    const blockRows = [plainRow];
    let j = i + 1;
    while (j < lines.length && !/^---\s*pág\.\s*\d+\s*---/i.test(lines[j])) {
      const nextRow = parsePlainTextRow(lines[j]);
      if (!nextRow) break;
      blockRows.push(nextRow);
      j++;
    }
    if (blockRows.length >= 2) {
      const trail = strongHeadingTrail.length ? strongHeadingTrail : weakHeadingTrail;
      const section = stripBold(trail.join(' / ')) || null;
      strongHeadingTrail = [];
      weakHeadingTrail = [];
      tables.push({
        page, section, columns: null,
        rows: blockRows.map((r) => ({ rawLabel: r.rawLabel, values: r.values, bold: false })),
        likelyRelevant: isLikelyRelevant(section, []),
      });
      i = j;
      continue;
    }
    // No llegó a 2 -- cae al tratamiento normal de heading/prosa de abajo, sin avanzar `i`.
  }

  if (looksLikeHeading(line)) {
    const t = line.trim();
    if (isStrongHeading(t)) {
      strongHeadingTrail.push(t);
      if (strongHeadingTrail.length > TRAIL_MAX) strongHeadingTrail.shift();
    } else {
      weakHeadingTrail.push(t);
      if (weakHeadingTrail.length > TRAIL_MAX) weakHeadingTrail.shift();
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
