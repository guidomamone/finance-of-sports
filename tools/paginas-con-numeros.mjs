// ============================================================================
// tools/paginas-con-numeros.mjs — decide, GRATIS (sin API, sin tokens), qué páginas de un documento son "de carga": las que tienen cifras
// que pueden terminar en el sitio (estado de resultados, anexos de ingresos/gastos, notas con tablas). El resto (prosa, carta del
// presidente, informe del auditor, fotos) no se manda a la segunda voz.
//
// Por qué existe (decisión de Guido, 2026-09-30): el pipeline transcribe CADA PDF entero con Mistral OCR (eso no cambia, es barato). La
// segunda voz (Gemini, y Claude por API como desempate) cuesta bastante más por página, y su único trabajo es confirmar o desmentir
// NÚMEROS. En la prosa no hay nada que confirmar. Esta función es el filtro que decide a qué páginas va esa segunda voz.
//
// ----------------------------------------------------------------------------------------------------------------------------------
// LA MEDICIÓN (Admin/tests/test-seleccion-paginas.md tiene la tabla completa y los casos que se pierden)
// ----------------------------------------------------------------------------------------------------------------------------------
// Dos "verdades", las dos gratis y ya en el repo:
//   A) 222 ejercicios YA CARGADOS en producción (Admin/transcripciones-estado.jsonl, cargado:true, sin memorias ni presupuestos),
//      10.956 páginas. "Página útil" = página del .md que contiene >= 2 importes de ese club-año tal como están en data/*-data.js
//      (a escala 1, 1e3 o 1e6). 1.121 páginas útiles, 4.103 importes distintos encontrados en algún lado del .md.
//   B) 420 `Clubes/**/*.rubros.json` con `page` por rubro: 15.858 páginas, 2.173 páginas con rubros, 20.407 rubros.
//
// Regla elegida (sobre el .md):   (>= 8 cifras y cifras/palabras >= 0,05)   o   (tabla markdown de >= 5 filas y >= 5 cifras)
//   - "cifra" = número de >= 3 dígitos con valor >= 100 ("1.234", "(12 345)", "2024", "123456"): mismo regex que la medición previa.
//   - "palabras" NO cuenta los separadores de tabla ("|", "---", ":--"): con ellos una tabla con muchas columnas vacías parecía prosa.
//   - la segunda mitad (tabla con cifras) rescata las tablas cortas de 2 columnas que la densidad sola perdía.
//     Selecciona 45,7% de las páginas | cubre 96,5% de las páginas útiles y 98,7% de los importes (A) | 98,0% de las páginas con rubros
//     y 98,7% de los rubros (B).
//   + vecinas "suaves" (DEFAULT): se agrega la página anterior y la siguiente de cada seleccionada SI tienen >= 3 cifras (una tabla que
//     sigue en la página de al lado, el título del estado arriba y las cifras abajo).
//     Selecciona 58,3% | 99,0% de las páginas útiles y 99,7% de los importes (A) | 98,9% de las páginas con rubros y 99,0% de los rubros (B).
//     Por motor del .md (con vecinas): legado 58,5% -> 99,0% / 99,7% (A); mistral 55,8% -> 100% / 99,5% (A, 14 docs), 99,2% pág. B (205 docs).
//
// Lo que se probó y NO se eligió:
//   - Palabras clave de estado de resultados (STATEMENT_RE de tools/pipeline.mjs, en la página + >= 3 cifras): +12 puntos de páginas
//     seleccionadas para ganar ~1 punto de cobertura. No paga.
//   - Umbrales más duros (densidad 0,08 o 0,10): bajan a 36-38% de páginas pero pierden 7-14 puntos de páginas útiles.
//   - pdftotext -layout página por página (ANTES de tener el .md): en los PDFs con capa de texto sana selecciona lo mismo (45%) con
//     menos cobertura (92,4% de las útiles vs 97,2% con el .md, mismos documentos), y el 23% de los PDFs medidos (233 de 1.005) no
//     tiene capa de texto usable (escaneo o mojibake, incluidos dígitos: Ferro 2024-25 sale como "!""#$%"). Además hay PDFs "mixtos"
//     que pasan el chequeo por documento pero traen justo el estado financiero como imagen (Flamengo 2024, Sevilla 2024-25, Alianza
//     Lima). Como el .md de Mistral se hace SIEMPRE y antes de la segunda voz, no hay razón para decidir con pdftotext. Queda solo
//     como plan B cuando se llama sin .md (ver abajo).
//
// Qué se pierde (los ~1% de importes): casi todo es prosa con cifras sueltas — el Lagebericht alemán ("die Umsatzerlöse stiegen auf
// TEUR 123.456"), notas de políticas contables inglesas, el informe del auditor que cita el resultado. Esas cifras casi siempre están
// también en el estado financiero, que sí se selecciona.
//
// ----------------------------------------------------------------------------------------------------------------------------------
// CÓMO SE USA
// ----------------------------------------------------------------------------------------------------------------------------------
//   import { paginasConNumeros } from './paginas-con-numeros.mjs';
//   const { paginas, metodo, detalle } = paginasConNumeros({ mdText });            // lo normal: el .md de Mistral ya está hecho
//   const r = paginasConNumeros({ pdfPath: 'Clubes/X/Y/balance.pdf' });             // plan B, sin .md: pdftotext
//   const r = paginasConNumeros({ mdText, vecinas: false });                        // sin vecinas (45,7% de las páginas en vez de 58,3%)
//
//   paginas  -> números de página (1-based, los de "--- pág. N ---" del .md = página física del PDF), ordenados.
//   metodo   -> 'md' | 'pdftotext' | 'sin-capa-de-texto' (con pdfPath y un PDF escaneado/mojibake: paginas = TODAS, no se puede filtrar
//               gratis; lo correcto ahí es transcribir con Mistral primero y volver a llamar con mdText).
//   detalle  -> { total, seleccionadas, porRegla: {densidad, tabla, vecina}, porPagina: [{n, cifras, palabras, filasTabla, motivo}] }
//
//   CLI:  node tools/paginas-con-numeros.mjs <archivo.md | archivo.pdf> [--sin-vecinas] [--json]
//         Con un .pdf usa el .md hermano si existe (mismo nombre base); si no, pdftotext.
// ============================================================================

import { readFileSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

// Umbrales medidos (ver cabecera). Si se tocan, volver a medir: el script de la medición está descripto en Admin/tests/test-seleccion-paginas.md.
export const UMBRALES = {
  minCifras: 8,          // cifras de >= 3 dígitos en la página
  minDensidad: 0.05,     // cifras / palabras (sin separadores de tabla)
  minFilasTabla: 5,      // filas de tabla markdown ("| ... |") ...
  minCifrasTabla: 5,     // ... con al menos estas cifras
  minCifrasVecina: 3,    // una vecina se agrega solo si tiene al menos esto
};

// Mismo regex que la medición: miles agrupados ("1.234.567", "1 234", "1'234", "(12.345)") o >= 4 dígitos seguidos. Valor >= 100.
const NUM = /\(?-?\d{1,3}(?:[.,\s']\d{3})+(?:[.,]\d+)?\)?|\(?-?\d{4,}(?:[.,]\d+)?\)?/g;
function valor(s) {
  s = s.replace(/[()\s']/g, '');
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c > -1 && d > -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c > -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d > -1 && /\.\d{3}$/.test(s)) s = s.replace(/\./g, '');
  return Math.abs(parseFloat(s));
}
const contarCifras = (t) => (t.match(NUM) || []).map(valor).filter((n) => n >= 100).length;
// Palabras "limpias": un separador de tabla markdown no es una palabra (con ellos, una tabla ancha parecía prosa).
const contarPalabras = (t) => t.split(/\s+/).filter((w) => w && !/^[|:\-*#]+$/.test(w)).length;
const contarFilasTabla = (t) => (t.match(/^\s*\|/gm) || []).length;

// Parte un .md en páginas por sus marcas "--- pág. N ---" (las que escriben todos los motores del proyecto). Devuelve Map n -> texto.
export function paginasDelMd(mdText) {
  const re = /^---\s*p[aá]g\.\s*(\d+)\s*---.*$/gmi;
  const marcas = []; let m;
  while ((m = re.exec(mdText))) marcas.push({ n: Number(m[1]), ini: m.index, fin: m.index + m[0].length });
  const out = new Map();
  marcas.forEach((k, i) => {
    const t = mdText.slice(k.fin, i + 1 < marcas.length ? marcas[i + 1].ini : mdText.length);
    out.set(k.n, (out.get(k.n) || '') + t); // una página partida en dos marcas iguales se junta
  });
  return out;
}

// Texto por página con pdftotext -layout. Un solo proceso para todo el PDF: el form feed (\f) separa las páginas, que es lo mismo que
// correr -f N -l N página por página pero sin arrancar N procesos. -q silencia los "Syntax Error" de poppler en PDFs dañados.
export function paginasDePdftotext(pdfPath) {
  const txt = execFileSync('pdftotext', ['-q', '-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  const partes = txt.split('\f');
  if (partes.length && partes[partes.length - 1].trim() === '') partes.pop();
  return new Map(partes.map((t, i) => [i + 1, t]));
}

// ¿La capa de texto del PDF sirve para contar cifras? Chequeo por DOCUMENTO, sin .md:
//   - >= 150 caracteres (sin espacios) por página en promedio y no más de la mitad de las páginas vacías -> no es un escaneo;
//   - < 6% de símbolos raros (!"#$%&*+/;<=>?@[]^_{}~) y > 2% de dígitos -> no es mojibake (fuentes Type 3 / sin ToUnicode, donde hasta
//     los dígitos salen como símbolos; ver CLAUDE.md, "Gotchas de tooling").
// Medido: 772 de 1.005 PDFs pasan (76,8%). No detecta los PDFs mixtos (texto + estados financieros pegados como imagen): por eso con
// pdftotext las páginas SIN texto se seleccionan siempre (pueden ser justo la tabla escaneada).
export function capaDeTextoSirve(paginasTxt) {
  let chars = 0; let sym = 0; let dig = 0; let vacias = 0;
  for (const t of paginasTxt.values()) {
    const c = t.replace(/\s/g, '').length;
    if (c < 40) { vacias++; continue; }
    chars += c; sym += (t.match(/[!"#$%&*+/;<=>?@[\]^_{}~\\`]/g) || []).length; dig += (t.match(/\d/g) || []).length;
  }
  const n = Math.max(1, paginasTxt.size);
  const r = { charsPorPagina: chars / n, fraccionVacias: vacias / n, simbolos: sym / Math.max(1, chars), digitos: dig / Math.max(1, chars) };
  r.sirve = r.charsPorPagina >= 150 && r.fraccionVacias <= 0.5 && r.simbolos < 0.06 && r.digitos > 0.02;
  r.motivo = r.sirve ? 'ok' : (r.charsPorPagina < 150 || r.fraccionVacias > 0.5) ? 'escaneo (sin capa de texto)' : 'mojibake (capa de texto ilegible)';
  return r;
}

function elegir(paginas, { vecinas, tablas, incluirVacias }) {
  const U = UMBRALES;
  const porPagina = [];
  for (const [n, t] of [...paginas.entries()].sort((a, b) => a[0] - b[0])) {
    const cifras = contarCifras(t); const palabras = contarPalabras(t); const filasTabla = tablas ? contarFilasTabla(t) : 0;
    const vacia = t.replace(/\s/g, '').length < 40;
    let motivo = null;
    if (cifras >= U.minCifras && cifras / Math.max(1, palabras) >= U.minDensidad) motivo = 'densidad';
    else if (tablas && filasTabla >= U.minFilasTabla && cifras >= U.minCifrasTabla) motivo = 'tabla';
    else if (incluirVacias && vacia) motivo = 'sin-texto';
    porPagina.push({ n, cifras, palabras, filasTabla, motivo });
  }
  if (vecinas) {
    const idx = new Map(porPagina.map((p) => [p.n, p]));
    for (const p of porPagina.filter((q) => q.motivo && q.motivo !== 'vecina')) {
      for (const m of [p.n - 1, p.n + 1]) {
        const q = idx.get(m);
        if (q && !q.motivo && q.cifras >= U.minCifrasVecina) q.motivo = 'vecina';
      }
    }
  }
  const sel = porPagina.filter((p) => p.motivo).map((p) => p.n);
  const porRegla = {};
  for (const p of porPagina) if (p.motivo) porRegla[p.motivo] = (porRegla[p.motivo] || 0) + 1;
  return { paginas: sel, detalle: { total: porPagina.length, seleccionadas: sel.length, porRegla, porPagina } };
}

/**
 * Páginas "con números" de un documento.
 * @param {{mdText?: string, pdfPath?: string, vecinas?: boolean}} o  mdText (preferido) o pdfPath. vecinas default true.
 * @returns {{paginas: number[], metodo: 'md'|'pdftotext'|'sin-capa-de-texto', detalle: object}}
 */
export function paginasConNumeros({ mdText, pdfPath, vecinas = true } = {}) {
  if (mdText != null) {
    const pags = paginasDelMd(mdText);
    if (pags.size === 0) throw new Error('el .md no tiene marcas "--- pág. N ---": no se puede saber qué página es cuál');
    const r = elegir(pags, { vecinas, tablas: true, incluirVacias: false });
    return { paginas: r.paginas, metodo: 'md', detalle: r.detalle };
  }
  if (!pdfPath) throw new Error('hace falta mdText o pdfPath');
  const pags = paginasDePdftotext(pdfPath);
  const capa = capaDeTextoSirve(pags);
  if (!capa.sirve) {
    // No se puede filtrar gratis: se devuelven TODAS (nunca perder una página de carga por no saber leerla).
    const todas = [...pags.keys()].sort((a, b) => a - b);
    return { paginas: todas, metodo: 'sin-capa-de-texto', detalle: { total: todas.length, seleccionadas: todas.length, capa } };
  }
  // pdftotext no tiene tablas markdown: solo la regla de densidad; las páginas sin texto entran (pueden ser una tabla pegada como imagen).
  const r = elegir(pags, { vecinas, tablas: false, incluirVacias: true });
  return { paginas: r.paginas, metodo: 'pdftotext', detalle: { ...r.detalle, capa } };
}

// Rangos compactos para imprimir: [1,2,3,7,9,10] -> "1-3, 7, 9-10".
export function rangos(ns) {
  const out = []; let a = null; let b = null;
  for (const n of ns) { if (a === null) { a = b = n; } else if (n === b + 1) { b = n; } else { out.push(a === b ? `${a}` : `${a}-${b}`); a = b = n; } }
  if (a !== null) out.push(a === b ? `${a}` : `${a}-${b}`);
  return out.join(', ');
}

// ---- CLI ----
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith('--'));
  if (!file) { console.error('uso: node tools/paginas-con-numeros.mjs <archivo.md | archivo.pdf> [--sin-vecinas] [--json]'); process.exit(1); }
  const vecinas = !args.includes('--sin-vecinas');
  let r;
  if (/\.md$/i.test(file)) r = paginasConNumeros({ mdText: readFileSync(file, 'utf8'), vecinas });
  else {
    const md = file.replace(/\.pdf$/i, '.md');
    r = existsSync(md) ? paginasConNumeros({ mdText: readFileSync(md, 'utf8'), vecinas }) : paginasConNumeros({ pdfPath: file, vecinas });
  }
  if (args.includes('--json')) { console.log(JSON.stringify(r)); process.exit(0); }
  const d = r.detalle;
  console.log(`${file}`);
  console.log(`  método: ${r.metodo}${d.capa && !d.capa.sirve ? ` (${d.capa.motivo})` : ''}`);
  console.log(`  ${d.seleccionadas} de ${d.total} páginas (${(100 * d.seleccionadas / Math.max(1, d.total)).toFixed(0)}%)${d.porRegla ? '  ' + JSON.stringify(d.porRegla) : ''}`);
  console.log(`  páginas: ${rangos(r.paginas) || '(ninguna)'}`);
}
