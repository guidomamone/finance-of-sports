// ============================================================================
// tools/filas-rubro.mjs — funciones GRATIS (sin API, sin tokens) que limpian y ordenan las filas de una tabla ANTES de mandarlas a Jev.
// Lo usan tools/pipeline.mjs (etapa 3, al armar `<md>.rubros.json`) y tools/proponer-carga.mjs (el backtest).
//
// Por qué existe (piloto de 9 documentos, 2026-09-30, y análisis de los 14.246 rubros de la corrida de 50): Jev no era el problema, lo era lo que
// se le mandaba.
//   - El 27% de las etiquetas no tenían letras (cifras partidas como "8.206.844") y Jev les asignaba categoría con confianza >= 0,90.
//   - Subtotales y resultados ("DRIFTSRESULTAT", "Μικτό αποτέλεσμα", "Netto finans"), metadatos ("Forretningsadresse:", "Единица измерения:")
//     y nombres de persona llegaban como si fueran rubros: no tienen categoría correcta, así que Jev inventaba una.
//   - El 80% de las filas llegaban SIN el lado (ingreso o gasto): la tabla no traía palabras que lo dijeran y Jev tenía que elegir entre las 26
//     categorías juntas (con el lado conocido el acierto medido sube de 69,5% a 74,2%, y con ejemplos a 86,6%).
//
// Qué exporta:
//   numeroDe(txt)                       -> número o null, entiende "1.234,56", "(1 234)", "- 5", "€ 1,234", etc.
//   filasSuma(nums)                     -> las filas cuyo valor es la SUMA de las filas contiguas de arriba (subtotales/totales), sin mirar la etiqueta.
//   noEsRubro(etiqueta, esSuma)         -> true si la fila no es un rubro de ingresos/gastos (número suelto, símbolo, subtotal, resultado, metadato).
//   ladosPorEstructura(filas)           -> para cada fila 'revenue' | 'expense' | null, deducido de la estructura de la tabla: el subtotal que cierra
//                                          un bloque ("Sum driftsinntekter", "Total gastos") dice de qué lado son las filas de arriba.
//                                          Desde el test del 2026-09-30 combina estructura > posición > palabras (ver más abajo los números).
//   ladoPorPalabras(etiqueta)           -> lado por las palabras de la etiqueta (impuestos = gasto; deducciones de la receita = ingreso).
//   esResultado(etiqueta)               -> la etiqueta es un resultado/margen en cualquier parte ("Profit/(loss) before...", "Gewinn vor Steuern").
//   columnaDeImportes(cols, filas, año) -> la columna de importes, sin confundirla con la de "Notas" (para que pipeline.mjs la adopte).
//   REV_W / EXP_W                       -> palabras de ingreso / gasto en 29 idiomas (INGRESOS_RE / GASTOS_RE de tools/vocabulario.mjs).
//   norm(t)                             -> la normalización ÚNICA del pipeline (normalizar() de tools/vocabulario.mjs; la usa también chequeos-gratis).
//
// VOCABULARIO (Versión 316): las palabras (ingreso, gasto, impuesto, resultado, total, notas) ya no están acá sino en tools/vocabulario.mjs,
// un solo módulo con todos los idiomas y la notación de cada término (palabra entera / raíz / infijo). Lo que queda acá es la LÓGICA.
// ============================================================================

import { normalizar, INGRESOS_RE, GASTOS_RE, IMPUESTOS_RE, RESULTADO_INICIO_RE, GANANCIA_PERDIDA_RE, TOTAL_RE, NOTAS_COLUMNA_RE } from './vocabulario.mjs';

export const norm = normalizar;

export function numeroDe(raw) {
  let s = String(raw).trim().replace(/R\$|[$€£¥]/g, '').replace(/^\s*-\s+(?=\()/, '').trim();
  if (!/\d/.test(s)) return null;
  s = s.replace(/(\d)\s+(?=\d)/g, '$1');
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−')) { neg = true; s = s.slice(1); }
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c !== -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 3) s = s.replace(/\./g, '');
  const n = parseFloat(s.replace(/[^0-9.eE-]/g, ''));
  return Number.isNaN(n) ? null : (neg ? -n : n);
}

// nums = [{ v: valor crudo (sin escala), ... }] en el orden de la tabla. Devuelve las filas que son suma de las de arriba: { ...fila, desde, n }.
export function filasSuma(nums) {
  const out = [];
  for (let i = 2; i < nums.length; i++) {
    const v = nums[i].v; if (!v || v <= 0) continue;
    const tol = Math.max(2, Math.abs(v) * 0.0005); let acc = 0;
    for (let k = i - 1; k >= Math.max(0, i - 60); k--) {
      acc += nums[k].v;
      if (i - k >= 2 && Math.abs(acc - v) <= tol) { out.push({ ...nums[i], desde: k, n: i - k }); break; }
    }
  }
  return out;
}

const LETRAS = /[a-zͰ-ϿЀ-ӿ぀-ヿ一-鿿가-힯]/g;
// Resultado / margen calculado: solo cuenta cuando la etiqueta ARRANCA así y es corta (una etiqueta larga como "Resultado por transacciones de
// atletas" es un rubro real en Brasil). Palabras: RESULTADO_INICIO de tools/vocabulario.mjs. Subtotales: TOTAL_INICIO y TOTAL_FIN (idiomas que
// ponen el total al final: "Tržby celkem", "Indtægter i alt", "Gelirler toplamı").
const RESULTADO_RE = RESULTADO_INICIO_RE;
const SUBTOTAL_RE = TOTAL_RE;

export function noEsRubro(label, esSuma) {
  if (esSuma) return true;
  const l = norm(label);
  if ((l.match(LETRAS) || []).length < 3) return true;              // números, códigos, símbolos
  if (/:\s*$/.test(String(label).trim())) return true;               // "Forretningsadresse:", "Единица измерения:" (metadato)
  if (SUBTOTAL_RE.test(l)) return true;
  // "(Loss) for the financial year", "Profit/(loss) before net finance charges": el paréntesis del comienzo y el "/(loss)" hacían que
  // RESULTADO_RE (que mira el comienzo) no los reconociera y llegaban a Jev como rubros (test de elección de tabla, 2026-09-30, Arsenal).
  const l2 = sinNumeracion(label).replace(/^\(([^)]*)\)\s*/, '$1 ').replace(/\/\s*\(?(loss|perdida|prejuizo|verlust)\)?/g, '').replace(/\s+/g, ' ').trim();
  if (l2.split(' ').length <= 5 && (RESULTADO_RE.test(l) || RESULTADO_RE.test(l2))) return true; // resultados y márgenes calculados
  // Resultado largo: "Resultado antes de depreciações, gastos de financiamentos e impostos" (Alverca) pasaba el límite de 5 palabras, que
  // existe para no descartar rubros reales como "Resultado por transacciones de atletas". Estos arrancan con resultado + antes/operacional/...
  if (RESULTADO_LARGO_RE.test(l2)) return true;
  return false;
}
const RESULTADO_LARGO_RE = /^(resultado|result|ergebnis|resultat|risultato|resultaat)\s+(antes|before|vor|prima|voor|operacional|operativo|operating|liquido|neto|netto|bruto|do periodo|do exercicio|del ejercicio|del periodo|financeiro|financiero|nach)\b/;

// ¿La etiqueta es un resultado o un margen (en cualquier parte, no solo al comienzo)? Lo usa tools/proponer-carga.mjs para no "abrir"
// un resultado en una nota: un resultado no tiene detalle de ingresos ni de gastos, y abrirlo traía tablas de impuestos diferidos o de
// cifras clave que sumaban lo mismo.
export const esResultado = (label) => { const l = sinNumeracion(label); return RESULTADO_RE.test(l) || RESULTADO_EN_CUALQUIER_LUGAR.test(l); };

// ---- lado (ingreso o gasto) por la estructura de la tabla
// Versión 312 (piloto D): ucraniano (дохід, виручка, витрати, собівартість), checo con y sin diacríticos (výnosy, tržby, náklady) y turco
// (hasılat, gelir, gider, maliyet): Karpaty Lviv tenía lado en 11 de 41 filas porque solo estaban las palabras en ruso.
export const REV_W = INGRESOS_RE;
export const EXP_W = GASTOS_RE;
// Impuestos: "Income tax", "Imposto sobre o rendimento", "Steuern vom Einkommen und vom Ertrag" tienen una palabra de ingreso adentro
// (income/rendimento/Ertrag) pero son un GASTO. Sin esta regla, la regla de palabras los mandaba a ingresos.
const TAX_W = IMPUESTOS_RE;
// "19. Ergebnis nach Steuern", "a) Löhne", "IV - Receitas": la numeración del renglón no deja que las reglas que miran el COMIENZO de la
// etiqueta (resultado, total) la reconozcan. Stuttgart: "19. Ergebnis nach Steuern" no se reconocía como resultado y, por "Steuern", mandaba
// a gastos las 21 filas de arriba (incluidos "1. Umsatzerlöse" y "4. Sonstige betriebliche Erträge").
const sinNumeracion = (label) => norm(label).replace(/^\**\s*(\(?[0-9]{1,2}[a-z]?[.)]|[a-z][.)]|[ivxl]{1,5}[.)]?\s*[-–.])\s*/, '');
// Deducciones de la receta ("Deduções da receita", "Impostos incidentes sobre a receita", "Rebates"): en el sitio van del lado de los
// INGRESOS (restan dentro de la receita líquida, convención de Bahia y los brasileños). Sin esta regla, "impostos" y "custo" los mandaban a gastos.
const DEDUCCION_W = /dedu[cç]|(impostos|tributos|contribuicoes) (e contribuicoes )?incidentes sobre (a )?(receita|venda|faturamento)|impostos e contribuicoes incidentes$|sobre (a |la )?(receita|venta|ventas)|rebates|discounts allowed/;
const RESULTADO_EN_CUALQUIER_LUGAR = GANANCIA_PERDIDA_RE;
export function ladoPorPalabras(label) {
  const l = sinNumeracion(label);
  if (DEDUCCION_W.test(l)) return 'revenue';
  if (TAX_W.test(l)) return 'expense';
  const r = REV_W.test(l); const x = EXP_W.test(l);
  return r && !x ? 'revenue' : x && !r ? 'expense' : null;
}

// LADO DE CADA FILA (test del 2026-09-30 contra producción, detalle en Admin/tests/test-eleccion-tabla.md). Verdad: 913 filas de 150 documentos
// (los .rubros.json del pipeline + los ejercicios ya cargados) cuyo importe coincide con una línea de producción del mismo club (año o año
// anterior): esa línea da el lado. 70 de esas 913 son coincidencias de importe sin ninguna palabra en común ("verdad dudosa").
//   Cada regla sola (cubre = cuántas filas decide; acierto sobre las que decide):
//     lado de la tabla (tools/pipeline.mjs)          571, 89%   (en tablas que mezclan los dos lados, "RENDIMENTOS E GASTOS" de Alverca,
//                                                                manda TODO al mismo lado; además SIDE_REV no tiene "rendimento")
//     estructura, versión anterior                   ver abajo el bug
//     estructura, corregida                          122, 98%
//     posición ("Total X" le da su lado a las filas desde el total anterior, cierre o no la suma)   201, 98%
//     palabras de la etiqueta                        309, 95%
//     signo del importe (solo tablas con + y -)      428, 88%   <- descartado: la peor regla (gastos en positivo, deducciones en negativo)
//   Combinadas, con la tabla como último recurso (como las usa tools/pipeline.mjs: `lados[i] || ladoTabla`):
//     VIEJO  (estructura vieja || tabla)             626 decididas, 67 contradicen producción (89%)   | verdad confiable: 574, 37 (94%)
//     NUEVO  (estructura > posición > palabras || tabla)  778 decididas, 27 contradicen (97%)        | verdad confiable: 718, 8 (99%)
//     palabras primero (palabras > estructura > posición) da 30 errores: la estructura le gana a las palabras ("Custo e deduções de venda"
//     está dentro del bloque de la receita).
//   BUGS de la estructura vieja que explican los errores medidos:
//     1. Un subtotal que es un RESULTADO ("Profit/(loss) before net finance charges", "19. Ergebnis nach Steuern") tiene una palabra de gasto
//        adentro ("charges", "Steuern") y le ponía 'expense' a todas las filas de arriba, incluidos los ingresos (Arsenal, Stuttgart: "1.
//        Umsatzerlöse" quedaba como gasto). Ahora un resultado no decide el lado, y la numeración "19." / "a)" no esconde el comienzo.
//     2. Marcaba también filas SIN importe en esa columna que quedaban en el medio del bloque. Ahora solo filas con importe.
//     3. Con la columna de NOTAS (4, 6, 17...) sumaba números de nota: si los valores son todos enteros chicos, no se usa la estructura.
//   Palabras: impuestos ("Income tax", "Imposto sobre o rendimento") van a gasto aunque tengan "income/rendimento"; deducciones de la receita
//   ("Deduções", "Impostos incidentes sobre a receita") van a ingresos; subsidios/subvenciones a ingresos.
// filas = [{ label, v }] (v = valor crudo o null). Devuelve un arreglo paralelo de 'revenue' | 'expense' | null.
export function ladosPorEstructura(filas, orden = ['estructura', 'posicion', 'palabras']) {
  const estructura = filas.map(() => null);
  const numericas = filas.map((f, i) => ({ ...f, i })).filter((f) => f.v !== null && f.v !== undefined);
  // Columna de NOTAS en vez de importes (tools/pipeline.mjs elige "la primera columna con números en el 40% de las filas", y en Fluminense
  // y Alverca esa es la columna "Nota": 4, 6, 17.2.3...): las "sumas" que salen de ahí son casualidades entre números de nota. Si todos los
  // valores son enteros chicos, la estructura no se usa (posición y palabras sí, no dependen de los importes).
  const esColumnaDeNotas = numericas.length >= 3 && numericas.every((f) => Number.isInteger(f.v) && Math.abs(f.v) <= 60);
  for (const s of esColumnaDeNotas ? [] : filasSuma(numericas)) {
    const l = sinNumeracion(s.label);
    // un resultado/margen no dice de qué lado son sus sumandos, empiece como empiece ("Profit/(loss) before net finance charges" no lo
    // agarraba RESULTADO_RE, que mira el comienzo, y por "charges" mandaba a gastos "Share of joint venture operating loss" de Arsenal)
    if (RESULTADO_RE.test(l) || RESULTADO_EN_CUALQUIER_LUGAR.test(l)) continue;
    const side = ladoPorPalabras(s.label);
    if (!side) continue;
    const p = numericas.findIndex((f) => f.i === s.i);
    for (let k = p - s.n; k < p; k++) { const i = numericas[k].i; if (estructura[i] === null) estructura[i] = side; }
  }
  // posición: cada renglón "Total X" / "Sum X" (o "Rendimentos" / "Gastos" solos) con lado le da ese lado a las filas desde el total anterior
  const posicion = filas.map(() => null); let start = 0;
  filas.forEach((f, i) => {
    const l = sinNumeracion(f.label);
    if (!(SUBTOTAL_RE.test(l) || /^\**\s*(rendimentos|gastos|ingresos|egresos|receitas|despesas|revenues?|expenses|income|costs)\s*(totais|totales|totals?)?\s*$/.test(l))) return;
    const s = RESULTADO_RE.test(l) ? null : ladoPorPalabras(l.replace(SUBTOTAL_RE, ''));
    if (s) for (let k = start; k < i; k++) if (filas[k].v !== null && filas[k].v !== undefined) posicion[k] = s;
    start = i + 1;
  });
  const reglas = { estructura: (i) => estructura[i], posicion: (i) => posicion[i], palabras: (i) => ladoPorPalabras(filas[i].label) };
  return filas.map((_, i) => { for (const o of orden) { const s = reglas[o](i); if (s) return s; } return null; });
}

// Columna de IMPORTES de una tabla del briefing (para que tools/pipeline.mjs la use en vez de "la primera columna con números en el 40% de
// las filas", que en Alverca y Fluminense es la columna "Notas" -> 9, 15, "7/8" leído 78, "17.2.3"...). No se usa todavía desde pipeline.mjs
// (esta sesión no podía editarlo): ver Admin/tests/test-eleccion-tabla.md, "Lo que queda sin resolver".
//   1. si un encabezado dice el año del ejercicio (2024, 2023/24, 30/06/2024), esa columna;
//   2. si no, la primera columna con números en el 40% de las filas cuyo encabezado NO es de notas y cuyos valores no son todos enteros chicos.
export function columnaDeImportes(columns, rows, year) {
  const cols = columns || [];
  if (year) {
    const y = String(year); const y1 = String(year - 1); const yy = y.slice(2);
    const re = new RegExp(`(^|\\D)(${y}|${y1}[-/ ]${yy}|${y1}[-/]${y})(\\D|$)`);
    for (let j = 1; j < cols.length; j++) if (re.test(String(cols[j]))) return j - 1;
  }
  const width = Math.max(0, ...rows.map((r) => (r.values || []).length));
  for (let j = 0; j < width; j++) {
    const head = norm(cols[j + 1] || '');
    if (NOTAS_COLUMNA_RE.test(head)) continue; // notas / anexo / código de fila, en 29 idiomas (tools/vocabulario.mjs)
    const vals = rows.map((r) => numeroDe((r.values || [])[j] ?? '')).filter((v) => v !== null);
    if (vals.length < Math.max(3, rows.length * 0.4)) continue;
    if (vals.every((v) => Number.isInteger(v) && Math.abs(v) <= 60)) continue; // números de nota sin encabezado
    return j;
  }
  return null;
}
