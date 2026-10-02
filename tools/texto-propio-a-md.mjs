#!/usr/bin/env node
// ============================================================================
// tools/texto-propio-a-md.mjs — ETAPA 2 (transcribir), ESCALÓN 1 (Versión 395, escalera aprobada por Guido el 2026-10-02): rearma
// páginas del .md con el TEXTO PROPIO del PDF (el que escribió el programa que generó el PDF, no una lectura de imagen). Gratis, sin API.
//
// POR QUÉ. En un PDF digital, el texto propio es el original: no se "lee", así que no puede confundir un dígito. Mistral, en cambio,
// rasteriza la página y la lee como imagen; en páginas muy densas (balances publicados en diario, 3-4 columnas por página, letra chica)
// cambió dígitos y etiquetas. Caso real, Goiás 2008 (pág. 1 del visor): "Pessoal (15.643.605)" en el PDF, "Passas (15.845.699)" en el .md;
// 2015: "Receita líquida 70.333.324,50" contra "70.303.924.30". La etapa 4 (validar-bloques.mjs) lo detectaba ("48 cifras del .md casi
// iguales a una del PDF pero con un dígito distinto", "el .md tiene solo el 36% de los números del PDF") y el lote seguía igual.
//
// ESCALERA DE LA ETAPA 2:
//   ESCALÓN 0  la transcripción que hay (Mistral) ── ¿la etapa 4 dice que coincide con el texto propio del PDF? sí → sigue
//   ESCALÓN 1  (este script) PDF digital y no coincide → se rearman ESAS páginas con el texto propio
//   ESCALÓN 2  si tampoco pasa → Claude API sobre esas páginas (falta)
//   COMPUERTA  la etapa 4 vuelve a validar el .md nuevo y la etapa 6 tiene que cerrar con el resultado impreso
//
// CÓMO, por página (nada es específico de un club: no hay coordenadas fijas):
//   1. `pdftotext -bbox` da cada palabra con su caja (x, y).
//   2. COLUMNAS: se agrupan las palabras en renglones (misma altura) y se mide, para cada x, cuántos renglones la cubren. Un hueco ancho que
//      casi ningún renglón cruza es el espacio entre dos columnas de la página. Los huecos ENTRE la etiqueta y los importes de un cuadro no
//      cuentan, porque los títulos y los párrafos de esa misma columna los cruzan.
//   3. Dentro de cada columna, renglón por renglón: los importes del final (formato 1.234.567 / (1.234.567) / 1.234,56 / -) son celdas, lo de
//      antes es la etiqueta. Un renglón con importes sale como fila de tabla Markdown; uno sin importes, como texto.
//   4. En el .md se reemplaza SOLO el contenido de esas páginas (entre sus marcas `--- pág. N ---`), con una nota de que salió del texto
//      propio. El .md anterior queda en Generados/ como `<doc>.antes-texto-propio.md`.
//
// USO:
//   node tools/texto-propio-a-md.mjs "<pdf>" --paginas 1,2 [--metodo columnas|regiones]   muestra cómo quedarían (no escribe)
//   node tools/texto-propio-a-md.mjs "<pdf>" --paginas 1,2 --escribir
//   node tools/texto-propio-a-md.mjs "<pdf>" --auto [--escribir]    las páginas de los bloques con números no confirmados en la etapa 4
//                                                                    (Generados/.../<doc>.validacion.json), o todas si el .md casi no coincide
// ============================================================================

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const NUM_RE = /^\(?-?\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?\)?$|^-$|^\(?\d+\)?$/;

// ---------------------------------------------------------------- palabras de una página
function palabras(pdf, pag) {
  const html = execFileSync('pdftotext', ['-f', String(pag), '-l', String(pag), '-bbox', pdf, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const ancho = Number((html.match(/<page width="([\d.]+)"/) || [])[1] || 0);
  const out = [];
  for (const m of html.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/g)) {
    const t = m[5].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    out.push({ x0: +m[1], y0: +m[2], x1: +m[3], y1: +m[4], t });
  }
  return { ancho, out };
}

// renglones: palabras con la misma altura (centro vertical a menos de media altura de letra)
function renglones(ws) {
  const ord = [...ws].sort((a, b) => (a.y0 + a.y1) / 2 - (b.y0 + b.y1) / 2 || a.x0 - b.x0);
  const R = [];
  for (const w of ord) {
    const c = (w.y0 + w.y1) / 2; const h = w.y1 - w.y0;
    const r = R.length ? R[R.length - 1] : null;
    if (r && Math.abs(r.c - c) <= h * 0.45) { r.ws.push(w); r.c = (r.c * (r.ws.length - 1) + c) / r.ws.length; } else R.push({ c, ws: [w] });
  }
  for (const r of R) r.ws.sort((a, b) => a.x0 - b.x0);
  return R;
}

// huecos verticales de una región: x que casi ningún renglón cruza (ver cabecera, paso 2)
function cortesVerticales(ws) {
  const R = renglones(ws);
  const xMin = Math.floor(Math.min(...ws.map((w) => w.x0))); const xMax = Math.ceil(Math.max(...ws.map((w) => w.x1)));
  const cub = new Map();
  for (const r of R) {
    // un renglón "cruza" el espacio entre dos palabras suyas si están a menos de ~1 letra (texto corrido), no si hay un hueco de tabla
    const segs = []; let s = null;
    for (const w of r.ws) { const h = w.y1 - w.y0; if (s && w.x0 - s.x1 <= h * 1.2) s.x1 = Math.max(s.x1, w.x1); else { s = { x0: w.x0, x1: w.x1 }; segs.push(s); } }
    for (const g of segs) for (let x = Math.floor(g.x0); x <= Math.ceil(g.x1); x++) cub.set(x, (cub.get(x) || 0) + 1);
  }
  const umbral = Math.max(0, Math.round(R.length * 0.02));
  const cortes = [];
  for (let x = xMin + 1; x < xMax; x++) {
    if ((cub.get(x) || 0) <= umbral) { let j = x; while (j < xMax && (cub.get(j) || 0) <= umbral) j++; if (j - x >= 6 && j < xMax) cortes.push((x + j) / 2); x = j; }
  }
  return cortes;
}

// huecos horizontales de una región: espacios entre renglones bastante más altos que el interlineado normal
function cortesHorizontales(ws) {
  const R = renglones(ws).map((r) => ({ y0: Math.min(...r.ws.map((w) => w.y0)), y1: Math.max(...r.ws.map((w) => w.y1)) }));
  if (R.length < 2) return [];
  const gaps = R.slice(1).map((r, k) => r.y0 - R[k].y1);
  const h = R.map((r) => r.y1 - r.y0).sort((a, b) => a - b)[Math.floor(R.length / 2)];
  const cortes = [];
  gaps.forEach((g, k) => { if (g >= h * 1.5) cortes.push((R[k].y1 + R[k + 1].y0) / 2); });
  return cortes;
}

const soloImportes = (ws) => renglones(ws).every((r) => r.ws.every((w) => NUM_RE.test(w.t) || /^(19|20)\d{2}$/.test(w.t) || /^\d{2}\/\d{2}\/\d{4}$/.test(w.t)));

// MÉTODO "regiones" (escalón 1 del rearmado, Versión 397): cortes alternados (XY-cut), SOLO si el documento rearmado con "columnas" no
// cerró (lote.mjs, camino de error). Una página de diario no tiene columnas parejas en toda la altura
// (Goiás 2010, pág. 1: arriba el balance con sus columnas, abajo el estado de resultados y el flujo de caja con otras; un solo corte vertical
// para toda la página no existía y el estado salió mezclado con el flujo de caja, renglón por renglón). Se prueba un corte vertical; si no
// hay, uno horizontal; y se repite en cada parte. Una parte hecha solo de importes es la columna de OTRO AÑO del cuadro de su izquierda:
// se une a ella (Goiás 2008, la columna 2007 del estado de resultados).
function regiones(ws, prof = 0) {
  if (ws.length < 2 || prof > 12) return [ws];
  const cv = cortesVerticales(ws);
  if (cv.length) {
    const lim = [-Infinity, ...cv, Infinity];
    let partes = [];
    for (let k = 0; k < lim.length - 1; k++) partes.push(ws.filter((w) => (w.x0 + w.x1) / 2 > lim[k] && (w.x0 + w.x1) / 2 <= lim[k + 1]));
    partes = partes.filter((p) => p.length);
    for (let k = partes.length - 1; k >= 1; k--) if (soloImportes(partes[k])) { partes[k - 1].push(...partes[k]); partes.splice(k, 1); }
    if (partes.length > 1) return partes.flatMap((p) => regiones(p, prof + 1));
  }
  const ch = cortesHorizontales(ws);
  if (ch.length) {
    const lim = [-Infinity, ...ch, Infinity];
    const partes = [];
    for (let k = 0; k < lim.length - 1; k++) partes.push(ws.filter((w) => (w.y0 + w.y1) / 2 > lim[k] && (w.y0 + w.y1) / 2 <= lim[k + 1]));
    const ps = partes.filter((p) => p.length);
    if (ps.length > 1) return ps.flatMap((p) => regiones(p, prof + 1));
  }
  return [ws];
}

// MÉTODO "columnas" (escalón 0 del rearmado, Versión 395): huecos verticales que casi ningún renglón cruza EN TODA LA PÁGINA
function columnas(ws, ancho) {
  const R = renglones(ws);
  const W = Math.ceil(ancho || Math.max(...ws.map((w) => w.x1)) + 1);
  const cub = new Array(W + 1).fill(0);
  for (const r of R) {
    // un renglón "cruza" el espacio entre dos palabras suyas si están a menos de ~2 letras (es texto corrido), no si hay un hueco de tabla
    const segs = []; let s = null;
    for (const w of r.ws) { const h = w.y1 - w.y0; if (s && w.x0 - s.x1 <= h * 1.2) s.x1 = Math.max(s.x1, w.x1); else { s = { x0: w.x0, x1: w.x1 }; segs.push(s); } }
    for (const g of segs) for (let x = Math.floor(g.x0); x <= Math.ceil(g.x1) && x <= W; x++) cub[x]++;
  }
  const umbral = Math.max(1, Math.round(R.length * 0.02));
  const minHueco = 6;
  const cortes = []; let i = 0;
  const xMin = Math.floor(Math.min(...ws.map((w) => w.x0))); const xMax = Math.ceil(Math.max(...ws.map((w) => w.x1)));
  for (let x = xMin; x <= xMax; x++) {
    if (cub[x] <= umbral) { let j = x; while (j <= xMax && cub[j] <= umbral) j++; if (j - x >= minHueco && x > xMin && j < xMax) cortes.push((x + j) / 2); x = j; }
  }
  void i;
  // una columna con muy pocas palabras no es una columna (un número suelto de pie de página): se une a la vecina
  const lim = [xMin - 1, ...cortes, xMax + 1];
  let cols = [];
  for (let k = 0; k < lim.length - 1; k++) cols.push({ x0: lim[k], x1: lim[k + 1], ws: ws.filter((w) => (w.x0 + w.x1) / 2 > lim[k] && (w.x0 + w.x1) / 2 <= lim[k + 1]) });
  cols = cols.filter((c) => c.ws.length);
  // Una "columna" hecha solo de importes (y quizá su encabezado de año) es la columna de OTRO AÑO del cuadro de la izquierda, no otra
  // columna de la página: se une a la de su izquierda. Caso: Goiás 2008, la columna 2007 del estado de resultados quedaba suelta (los
  // títulos que cruzan ese hueco eran muy pocos para que cuente como parte de la misma columna).
  const soloImportes = (c) => { const R = renglones(c.ws); return R.length >= 3 && R.filter((r) => r.ws.every((w) => NUM_RE.test(w.t) || /^(19|20)\d{2}$/.test(w.t))).length >= R.length * 0.8; };
  for (let k = cols.length - 1; k >= 1; k--) if (soloImportes(cols[k])) { cols[k - 1].ws.push(...cols[k].ws); cols[k - 1].x1 = cols[k].x1; cols.splice(k, 1); }
  return cols;
}

// un renglón de una columna -> { etiqueta, importes[] }
function partir(r) {
  const toks = r.ws.map((w) => w.t);
  let k = toks.length;
  while (k > 0 && NUM_RE.test(toks[k - 1]) && !/^\d{4}$/.test(toks[k - 1])) k--;
  // Un número corto (1-2 cifras, sin separador de miles) seguido de 2 importes o más es el NÚMERO DE NOTA ("RECEITA LÍQUIDA 16 70.333.324,50
  // 62.602.773,13", Goiás 2015): va a la etiqueta como "(nota 16)", no como un importe que corre las columnas.
  if (toks.length - k >= 3 && /^\d{1,2}$/.test(toks[k])) return { etiqueta: `${toks.slice(0, k).join(' ')} (nota ${toks[k]})`, importes: toks.slice(k + 1) };
  return { etiqueta: toks.slice(0, k).join(' '), importes: toks.slice(k) };
}

export function paginaAMd(pdf, pag, metodo = 'columnas') {
  const { ancho, out } = palabras(pdf, pag);
  if (!out.length) return null;
  const cols = metodo === 'regiones' ? regiones(out) : columnas(out, ancho).map((c) => c.ws);
  const partes = [];
  for (const [ci, ws] of cols.entries()) {
    const R = renglones(ws);
    const lineas = [];
    let enTabla = false;
    for (const r of R) {
      const { etiqueta, importes } = partir(r);
      if (importes.length) {
        if (!enTabla) { const n = Math.max(importes.length, 1); lineas.push('', `|   | ${Array.from({ length: n }, () => ' ').join(' | ')} |`, `| --- | ${Array.from({ length: n }, () => '---').join(' | ')} |`); enTabla = true; }
        lineas.push(`| ${etiqueta.replace(/\|/g, '/')} | ${importes.join(' | ')} |`);
      } else { if (enTabla) lineas.push(''); enTabla = false; lineas.push(etiqueta); }
    }
    partes.push(`<!-- ${metodo === 'regiones' ? 'región' : 'columna'} ${ci + 1} de ${cols.length} -->\n${lineas.join('\n').replace(/\n{3,}/g, '\n\n').trim()}`);
  }
  return `> Página rearmada con el TEXTO PROPIO del PDF (tools/texto-propio-a-md.mjs, etapa 2 escalón 1, método ${metodo}): la transcripción de Mistral no coincidía con él.\n\n${partes.join('\n\n')}`;
}

function reemplazarPaginas(md, nuevas) {
  const L = md.split('\n'); const marcas = [];
  L.forEach((l, i) => { const m = l.match(/^---\s*pág\.\s*(\d+)\s*---/i); if (m) marcas.push({ i, pag: Number(m[1]) }); });
  let out = md;
  for (const [pag, txt] of [...nuevas].sort((a, b) => b[0] - a[0])) {
    const k = marcas.findIndex((m) => m.pag === pag);
    const L2 = out.split('\n'); const marcas2 = []; L2.forEach((l, i) => { const m = l.match(/^---\s*pág\.\s*(\d+)\s*---/i); if (m) marcas2.push({ i, pag: Number(m[1]) }); });
    const k2 = marcas2.findIndex((m) => m.pag === pag);
    if (k < 0 || k2 < 0) { // sin marca de esa página: si es la primera y el .md no tiene marcas, se reemplaza todo
      if (!marcas2.length) { out = `--- pág. ${pag} ---\n\n${txt}\n`; continue; }
      throw new Error(`el .md no tiene la marca "--- pág. ${pag} ---"`);
    }
    const desde = marcas2[k2].i + 1; const hasta = k2 + 1 < marcas2.length ? marcas2[k2 + 1].i : L2.length;
    out = [...L2.slice(0, desde), '', txt, '', ...L2.slice(hasta)].join('\n');
  }
  return out;
}

// ¿Hay que rearmar este documento? (lo usa lote.mjs). Sí si la etapa 4 dijo que el .md no coincide con el texto propio del PDF y todavía no
// se rearmó (el .md trae la marca). Páginas: las de los números no confirmados; si el .md casi no tiene nada en común con el PDF, todas.
// Devuelve { paginas, metodo } o null. ESCALERA DEL REARMADO (Versión 397, pedido de Guido: "una escalera en vez de cambiarlo para todos"):
//   ESCALÓN 0  método "columnas" (cortes verticales en toda la página) — el .md todavía no se rearmó
//   ESCALÓN 1  método "regiones" (cortes alternados) — el .md ya se rearmó con "columnas" y la etapa 6 SIGUE sin cerrar el resultado
//              impreso (Goiás 2010: el balance de arriba y el estado de abajo tienen columnas en lugares distintos)
//   COMPUERTA  la misma de siempre: etapa 4 y etapa 6 sobre el .md nuevo. Cada escalón, una vez por documento (la marca del .md lo dice).
export function paginasARearmar(pdfRel, mdRel) {
  const mdAbs = resolve(ROOT, mdRel);
  if (!existsSync(mdAbs)) return null;
  const md = readFileSync(mdAbs, 'utf8');
  if (md.includes('TEXTO PROPIO del PDF')) {
    if (md.includes('método regiones')) return null; // los dos escalones ya se usaron
    const vf = resolve(ROOT, derivado(mdRel, '.verificacion.json', { crear: false }));
    if (!existsSync(vf)) return null;
    const ver = JSON.parse(readFileSync(vf, 'utf8'));
    const res = (ver.chequeos || []).find((c) => /^resultado/.test(c.nombre) && c.ok !== null);
    if (!res || res.ok !== false) return null; // cerró (o no hay resultado con qué comparar): no se sube de escalón
    const pags = []; let pag = null;
    for (const l of md.split('\n')) { const m = l.match(/^---\s*pág\.\s*(\d+)\s*---/i); if (m) pag = Number(m[1]); else if (pag && l.includes('TEXTO PROPIO del PDF') && !pags.includes(pag)) pags.push(pag); }
    return pags.length ? { paginas: pags, metodo: 'regiones' } : null;
  }
  const v = resolve(ROOT, derivado(mdRel, '.validacion.json', { crear: false }));
  if (!existsSync(v)) return null;
  // CAMINO DE ERROR (regla de Guido: lo extra es "para cuando haya errores"): si la etapa 6 ya cerró con esta transcripción, no se toca.
  // Medido: UC 2015 tiene 2 números no confirmados en la pág. 59 y su verificación está ok; los años 2008-2016 de Goiás no.
  const vf = resolve(ROOT, derivado(mdRel, '.verificacion.json', { crear: false }));
  // (el estado final, no solo el resultado: Goiás 2015 "cerraba" con ingresos de 0,00007 millones leídos mal y el año vecino lo frenaba)
  if (existsSync(vf) && JSON.parse(readFileSync(vf, 'utf8')).estado === 'ok') return null;
  const o = JSON.parse(readFileSync(v, 'utf8')); const m = String(o.motivoModo || '');
  // "texto parcial" (Versión 395, medido en UC 2015: PDF híbrido, los estados en imagen) NO alcanza para rearmar todo: ahí manda la lista de
  // números no confirmados, y una página en imagen no tiene texto propio que usar (se descarta abajo).
  const casiNada = /no coincide con casi nada del \.md|solo tiene el \d+% de los números del PDF/.test(m);
  const digitos = /casi iguales a una del PDF pero con un dígito distinto|el PDF trae texto parcial/.test(m) && (o.noConfirmados || []).length > 0;
  if (!casiNada && !digitos) return null;
  const n = Number((execFileSync('pdfinfo', [resolve(ROOT, pdfRel)], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/) || [])[1] || 0);
  let pags = casiNada ? Array.from({ length: n }, (_, i) => i + 1) : [...new Set((o.noConfirmados || []).map((x) => x.pagina).filter(Boolean))].sort((a, b) => a - b);
  pags = pags.filter((p) => palabras(resolve(ROOT, pdfRel), p).out.length >= 50); // solo páginas con texto propio de verdad
  return pags.length ? { paginas: pags, metodo: 'columnas' } : null;
}

export function rearmar(pdfRel, pags, metodo = 'columnas') {
  const pdf = resolve(ROOT, pdfRel); const mdRel = pdfRel.replace(/\.pdf$/i, '.md'); const mdAbs = resolve(ROOT, mdRel);
  const nuevas = new Map(); for (const p of pags) { const t = paginaAMd(pdf, p, metodo); if (t) nuevas.set(p, t); }
  const respaldo = resolve(ROOT, derivado(mdRel, '.antes-texto-propio.md'));
  mkdirSync(dirname(respaldo), { recursive: true });
  if (!existsSync(respaldo)) copyFileSync(mdAbs, respaldo);
  writeFileSync(mdAbs, reemplazarPaginas(readFileSync(mdAbs, 'utf8'), nuevas));
  return { mdRel, respaldo: relative(ROOT, respaldo), paginas: [...nuevas.keys()] };
}

async function main() {
  const A = process.argv.slice(2);
  const pdfArg = A.find((a) => !a.startsWith('--') && /\.pdf$/i.test(a));
  if (!pdfArg) { console.error('Uso: node tools/texto-propio-a-md.mjs "<pdf>" (--paginas 1,2 | --auto) [--escribir]'); process.exit(1); }
  const pdf = resolve(ROOT, pdfArg); const pdfRel = relative(ROOT, pdf); const mdRel = pdfRel.replace(/\.pdf$/i, '.md');
  const iP = A.indexOf('--paginas');
  let pags = iP >= 0 ? A[iP + 1].split(',').map(Number) : null;
  const iM = A.indexOf('--metodo'); let metodo = iM >= 0 ? A[iM + 1] : 'columnas';
  if (!pags && A.includes('--auto')) { const r = paginasARearmar(pdfRel, mdRel); if (r) { pags = r.paginas; metodo = r.metodo; } }
  if (!pags || !pags.length) { console.error('Sin páginas: pasá --paginas, o --auto con un .validacion.json que tenga números no confirmados.'); process.exit(1); }
  const nuevas = new Map();
  for (const p of pags) { const t = paginaAMd(pdf, p, metodo); if (t) nuevas.set(p, t); else console.error(`pág. ${p}: el PDF no tiene texto propio en esa página (no se toca)`); }
  if (!A.includes('--escribir')) { for (const [p, t] of nuevas) console.log(`\n=========== pág. ${p} ===========\n${t}`); return; }
  const r = rearmar(pdfRel, [...nuevas.keys()], metodo);
  console.log(`Escrito ${r.mdRel}: págs. ${r.paginas.join(', ')} rearmadas con el texto propio del PDF. El .md anterior quedó en ${r.respaldo}.`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
