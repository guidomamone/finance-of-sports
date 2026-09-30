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
// ============================================================================

export const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/\s+/g, ' ').trim();

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
// atletas" es un rubro real en Brasil).
const RESULTADO_RE = /^\**\s*(\(?[=+\-]\)?\s*)?(ebit|ebitda|ebt|gross (profit|margin|result)|operating (profit|result|income|loss)|net (profit|income|loss|result|finance|financial)|profit (before|after|for)|(loss|profit) for|resultado|resultat|result\b|ergebnis|rohergebnis|betriebsergebnis|jahresueberschuss|jahresfehlbetrag|risultato|utile|resultaat|bedrijfsresultaat|aarsresultat|arsresultat|driftsresultat|ordinaert|netto finans|finansresultat|ganancia|lucro|superavit|deficit|margen|zisk|ztrata|dobit|gubitak|zysk|strata|kar\b|zarar|tulos|αποτελεσμα|αποτελεσματα|μικτο|κερδη|ζημι|καθαρ|результат|прибыл|убыт|чистая|валовая)/;
const SUBTOTAL_RE = /^\**\s*(\(?[=+\-]\)?\s*)?(sub ?total|total\b|totale\b|totaal|totales|sum\b|suma\b|gesamt|summe|ukupno|celkem|σύνολο|συνολο|итого|всего)/;

export function noEsRubro(label, esSuma) {
  if (esSuma) return true;
  const l = norm(label);
  if ((l.match(LETRAS) || []).length < 3) return true;              // números, códigos, símbolos
  if (/:\s*$/.test(String(label).trim())) return true;               // "Forretningsadresse:", "Единица измерения:" (metadato)
  if (SUBTOTAL_RE.test(l)) return true;
  if (l.split(' ').length <= 5 && RESULTADO_RE.test(l)) return true; // resultados y márgenes calculados
  return false;
}

// ---- lado (ingreso o gasto) por la estructura de la tabla
const REV_W = /inntekt|omsaetning|omsetning|indtaegt|umsatz|ertrag|ertraeg|ricavi|proventi|revenue|income|turnover|sales|ingres|recurso|receita|rendimento|vendas|εσοδ|έσοδ|доход|выручк|prihod|prodej|trzb|opbrengst|omzet|tulot|przychod/;
const EXP_W = /kostnad|omkostning|utgift|udgift|aufwand|aufwend|costi|oneri|expens|cost|gasto|egreso|despesa|custo|εξοδ|έξοδ|расход|затрат|rashod|troskov|naklad|kosten|charges|wydatk|koszt|menot|giderler|gider/;
// filas = [{ label, v }] (v = valor crudo o null). Devuelve un arreglo paralelo de 'revenue' | 'expense' | null.
export function ladosPorEstructura(filas) {
  const lados = filas.map(() => null);
  const numericas = filas.map((f, i) => ({ ...f, i })).filter((f) => f.v !== null && f.v !== undefined);
  for (const s of filasSuma(numericas)) {
    const l = norm(s.label); const r = REV_W.test(l); const x = EXP_W.test(l);
    const side = r && !x ? 'revenue' : x && !r ? 'expense' : null;
    if (!side) continue;
    const desde = numericas[numericas.findIndex((f) => f.i === s.i) - s.n].i;
    for (let i = desde; i < s.i; i++) if (lados[i] === null) lados[i] = side;
  }
  return lados;
}
