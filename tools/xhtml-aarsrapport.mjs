#!/usr/bin/env node
// ============================================================================
// tools/xhtml-aarsrapport.mjs — LOS INFORMES DANESES EN XHTML (ESEF / iXBRL) AL FORMATO DEL PIPELINE: .md fiel + PDF de ancla (to-do 345, diseño aprobado por la Auditora 4).
// Gratis, determinista, sin IA ni OCR.
//
// POR QUÉ. Clubes/Dinamarca/ trae informes `aarsrapport-AAAA-MM-DD.xhtml` (el formato oficial que presentan los clubes). El registro (transcripciones-estado.jsonl), lote.mjs y cargar.mjs
// están hechos sobre PDFs: una línea por PDF con su .md. Sin esta tool, un XHTML no entra a ninguna etapa.
//
// QUÉ HACE (por cada .xhtml):
//   1  El .md fiel (`aarsrapport-AAAA-MM-DD.md`): el texto visible del documento, títulos con #, tablas `| celda |`, las cifras TAL CUAL se imprimen (formato danés, signo, «tkr.»),
//      sin soft hyphens (U+00AD, el XHTML los trae entre sílabas) y sin lo oculto (ix:header, estilos, elementos con display:none). Los hechos iXBRL (ix:nonFraction) son
//      transparentes: se imprime su texto visible. No toca escala ni signos: eso lo lee localizar/extraer del propio texto.
//   2  El PDF de ancla (`aarsrapport-AAAA-MM-DD.pdf`, al lado): el MISMO XHTML impreso con Chrome sin ventana. Sirve para que el registro, lote.mjs, estado.mjs, la validación
//      numeros-vs-texto-pdf y «abrí el PDF en la página N del visor» funcionen sin cambiar ninguna tool. Es la impresión de Chrome del XHTML oficial, NO el documento oficial.
//   3  Las marcas `--- pág. N ---` (las usan localizar, caja-deuda y las preguntas a la cola): cada línea del .md se ubica en la página del PDF cuyo texto contiene el comienzo
//      normalizado de la línea (la primera entre la actual y las 3 siguientes; monótono).
// COMPUERTAS (las mismas para todos los documentos; si una falla, NO se escribe nada y se dice por qué):
//   (a) cada hecho iXBRL VISIBLE tiene su número impreso en el .md (multiconjunto de los números). Los hechos dentro de un elemento display:none (una fila de «Egenkapital»
//       repetida y oculta, por ejemplo) no se ven en el documento: se cuentan y se listan aparte, sin frenar. Faltantes visibles: 0.
//   (b) al menos el 98 % de las líneas con firma quedan ubicadas en una página del PDF. Menos: no se escribe (localizar, caja-deuda y la validación por páginas dependen de
//       las marcas y fallarían más adelante sin decir por qué); se dice cuántas y cuáles líneas quedaron sin página.
// HONESTIDAD DEL REGISTRO. El PDF sale del mismo XHTML: numeros-vs-texto-pdf es un control del CONVERSOR, no una segunda lectura independiente. Por eso el motor queda como
// «xhtml-ixbrl (determinista)» (Admin/registros/api/xhtml-ixbrl.jsonl, que lee inventario-transcripciones.mjs) y en la primera línea del .md. No decide categorías ni lados:
// eso sigue siendo localizar/extraer/verificar (la compuerta aritmética es la de siempre: suma de renglones contra el resultado impreso).
// Seguimiento posible: los hechos iXBRL (valor, escala y signo estructurados) como total oficial independiente para el tie-out.
//
// USO:
//   node tools/xhtml-aarsrapport.mjs "<xhtml>" [...]          ENSAYO: convierte en memoria, imprime el PDF en la carpeta temporal y dice qué pasa con cada compuerta
//   node tools/xhtml-aarsrapport.mjs "<xhtml>" --escribir     escribe el .md y el .pdf (no pisa los que ya existen; --rehacer sí) y anota el motor
//   node tools/xhtml-aarsrapport.mjs "Clubes/Dinamarca/<Club>" [...]   todos los .xhtml de esa carpeta
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, appendFileSync, statSync } from 'node:fs';
import { resolve, join, dirname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { leerXhtmlTexto } from './ixbrl-resultado.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MOTOR = 'xhtml-ixbrl (determinista)';
const MIN_UBICADAS = 0.98;
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', oslash: 'ø', aring: 'å', aelig: 'æ', Oslash: 'Ø', Aring: 'Å', AElig: 'Æ', euro: '€', copy: '©' };
const dec = (t) => t.replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d)).replace(/&([a-zA-Z]+);/g, (m, n) => ENT[n] ?? m);
const limpiar = (t) => t.replace(/­/g, '');

// XHTML -> { lineas: [texto], hechos: [{ txt, nombre, oculto }] }. Una línea del .md por elemento de bloque o fila de tabla. Los div.page del XHTML se ignoran (las páginas son las del PDF).
// Una tabla dentro de otra deja `tabla` en null en la lectura simple (Plymouth: «reading 'push'»). Los informes SIN tablas anidadas salen byte a byte igual que antes. Ver `capas` abajo.
export function xhtmlALineas(src) {
  // con una tabla DENTRO de otra se leen las tablas de maquetación como texto desde el principio: la lectura vieja perdía las primeras líneas de la portada («Registered number: …») y a veces tiraba una excepción (Plymouth)
  const anidada = (() => { let d = 0; for (const t of src.match(/<\/?table[\s>\/][^>]*>|<\/table>/gi) || []) { if (/^<\/table/i.test(t)) d--; else { d++; if (d > 1) return true; } } return false; })();
  try { return leerXhtml(src, anidada); } catch (e) { return leerXhtml(src, true); }
}
function leerXhtml(src, capas) {
  const i0 = src.search(/<body[\s>]/i); const body = (i0 >= 0 ? src.slice(i0) : src).replace(/<!--[\s\S]*?-->/g, '');
  const toks = body.match(/<[^>]+>|[^<]+/g) || [];
  const lineas = []; const hechos = []; let linea = ''; let tabla = null, fila = null, celda = null, oculto = 0; const pila = []; let hecho = null;
  // TABLAS DE MAQUETACIÓN: una tabla que tiene otra tabla adentro (Plymouth: todo el informe en una celda) no es una tabla de datos; sus etiquetas table/tr/td cuentan como salto de línea y las tablas de adentro salen como tablas.
  // Antes, el `</table>` de la de adentro dejaba `tabla` en null y el `</tr>` de la de afuera tiraba «Cannot read properties of null (reading 'push')». Sin tablas anidadas no cambia nada.
  const capa = new Set(); if (capas) { const st = []; toks.forEach((t, i) => { if (/^<table[\s>\/]/i.test(t)) { if (st.length) capa.add(st[st.length - 1]); st.push(i); } else if (/^<\/table\s*>/i.test(t)) st.pop(); }); }
  const pt = []; // pila de las tablas abiertas: ¿es de maquetación?
  const volcar = () => { const t = linea.replace(/\s+/g, ' ').trim(); if (t) lineas.push(t); linea = ''; };
  const celdaFin = () => { if (celda != null) { fila.push(celda.replace(/\s+/g, ' ').replace(/\|/g, '/').trim()); celda = null; } };
  for (const [ti, t] of toks.entries()) {
    if (t[0] !== '<') { if (oculto) { if (hecho) hecho.txt += limpiar(dec(t)); continue; } const x = limpiar(dec(t)); if (hecho) hecho.txt += x; const previo = celda != null ? celda : linea; const pega = /[\p{L}:]$/u.test(previo) && /^\d/.test(x) ? ' ' : ''; /* dos spans seguidos («t.kr.» «2025») no se pegan */ if (celda != null) celda += pega + x; else linea += pega + x; continue; }
    const m = t.match(/^<\s*(\/?)\s*([a-zA-Z0-9:_-]+)([^>]*?)(\/?)>$/); if (!m) continue;
    const [, cierra, nombre, attrs, auto] = m; const n = nombre.toLowerCase();
    if (!cierra) {
      const estilo = (attrs.match(/style="([^"]*)"/) || [])[1] || '';
      const oc = /display:\s*none/.test(estilo) || n === 'ix:header' || n === 'style' || n === 'script' || n === 'head';
      if (n === 'ix:nonfraction' && !auto) hecho = { txt: '', nombre: (attrs.match(/\bname="([^"]+)"/) || [])[1] || '', formato: (attrs.match(/\bformat="([^"]+)"/) || [])[1] || '', oculto: oculto > 0 || oc };
      if (!auto) pila.push({ n, oc, hecho: n === 'ix:nonfraction' ? hecho : null });
      if (oc && !auto) oculto++;
      if (oculto) continue;
      if (/^h[1-6]$/.test(n)) { volcar(); linea = '#'.repeat(+n[1]) + ' '; }
      // un span con position:absolute es una línea de texto puesta por coordenadas (las notas del consolidado PSE de København, hecho por ParsePort): el salto de línea está en el `top`, no en una etiqueta; sin esto las notas salen pegadas en una sola línea (Auditora 5)
      else if (['p', 'div', 'li', 'br', 'section'].includes(n) || (n === 'span' && /position:\s*absolute/.test(estilo))) { if (celda != null) celda += ' '; else volcar(); }
      else if (n === 'table') { pt.push(capa.has(ti)); volcar(); if (!capa.has(ti)) tabla = []; }
      else if ((n === 'tr' || n === 'td' || n === 'th') && pt[pt.length - 1]) { volcar(); }
      else if (n === 'tr') { fila = []; }
      else if (n === 'td' || n === 'th') { celda = ''; }
    } else {
      const top = pila.pop(); const eraOc = !!(top && top.oc); if (eraOc) oculto--;
      if (top && top.hecho) { const h = top.hecho; h.txt = h.txt.replace(/\s+/g, ' ').trim(); hechos.push(h); hecho = null; }
      if (oculto) continue;
      if ((n === 'tr' || n === 'td' || n === 'th') && pt[pt.length - 1] && !eraOc) { volcar(); }
      else if (n === 'table' && pt[pt.length - 1] && !eraOc) { pt.pop(); volcar(); }
      else if (n === 'td' || n === 'th') celdaFin();
      else if (n === 'tr') { if (fila && fila.some((c) => c)) tabla.push(fila); fila = null; }
      else if (n === 'table') { if (!eraOc) pt.pop(); if (tabla && tabla.length) { const w = Math.max(...tabla.map((r) => r.length)); tabla.forEach((r, i) => { while (r.length < w) r.push(''); lineas.push('| ' + r.join(' | ') + ' |'); if (i === 0) lineas.push('|' + ' --- |'.repeat(w)); }); } tabla = null; }
      else if (/^h[1-6]$/.test(n) || ['p', 'div', 'li'].includes(n)) { if (celda == null) volcar(); }
    }
  }
  volcar();
  return { lineas, hechos };
}

// compuerta (a): hechos VISIBLES cuyo número no está impreso en el .md (multiconjunto)
// ESCALÓN 1: el texto del hecho, tal cual. ESCALÓN 2, solo para los que el 1 no encontró (después de que el 1 consumió los suyos): el mismo número con
// uno o dos ceros decimales de más, con el separador decimal que dice el `format` del hecho (num-comma-decimal: «,»; num-dot-decimal: «.»).
// Caso: FCK PSE consolidado 2023, «Resultat pr. aktie (EPS)» se ve «34,20» pero la etiqueta cubre «34,2» y el «0» quedó en el span de al lado
// (corte del conversor ParsePort): es el mismo valor, no una cifra que falta.
export function hechosFaltantes(lineas, hechos) {
  const bolsa = new Map(); for (const n of lineas.join('\n').match(/-?\d[\d.,]*/g) || []) { const k = n.replace(/^-/, ''); bolsa.set(k, (bolsa.get(k) || 0) + 1); }
  const toma = (k) => { const c = bolsa.get(k); if (!c) return false; bolsa.set(k, c - 1); return true; };
  const clave = (h) => h.txt.replace(/^[-–(]|\)$/g, '');
  const visibles = hechos.filter((x) => !x.oculto && /\d/.test(clave(x)));
  const sinEscalon1 = visibles.filter((h) => !toma(clave(h)));
  const faltan = sinEscalon1.filter((h) => {
    const sep = /comma-decimal|numcommadecimal/i.test(h.formato) ? ',' : /dot-decimal|numdotdecimal/i.test(h.formato) ? '.' : null;
    const k = clave(h); if (!sep || !k.includes(sep)) return true;
    return !(toma(`${k}0`) || toma(`${k}00`));
  });
  return { faltan, ocultos: hechos.filter((x) => x.oculto) };
}

const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
// el PDF que imprime Chrome del XHTML; devuelve las páginas (texto normalizado) o lanza si Chrome no está
export function imprimirPdf(xhtmlAbs, pdfAbs) {
  if (!existsSync(CHROME)) throw new Error(`no encuentro Chrome en ${CHROME}: sin él no hay PDF de ancla ni marcas de página; la tool no escribe el .md solo`);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfAbs}`, pathToFileURL(xhtmlAbs).href], { stdio: 'ignore', timeout: 300000 });
  const n = Number(execFileSync('pdfinfo', [pdfAbs]).toString().match(/Pages:\s+(\d+)/)[1]);
  const paginas = []; for (let p = 1; p <= n; p++) paginas.push(norm(execFileSync('pdftotext', ['-f', String(p), '-l', String(p), pdfAbs, '-'], { maxBuffer: 1e8 }).toString()));
  return paginas;
}
// las mismas páginas en orden del flujo del contenido (`pdftotext -raw`), para el escalón 2 de la compuerta (b)
export function paginasRaw(pdfAbs, n) { const out = []; for (let p = 1; p <= n; p++) out.push(norm(execFileSync('pdftotext', ['-raw', '-f', String(p), '-l', String(p), pdfAbs, '-'], { maxBuffer: 1e8 }).toString())); return out; }
// compuerta (b): la página de cada línea (monótona; la primera entre la actual y las 3 siguientes que contiene la firma). -> { pagina: [n|0], con, ubicadas, sinPagina: [linea] }
export function alinear(lineas, paginas) {
  const pagina = []; let pag = 1, con = 0, ubicadas = 0; const sin = [];
  for (const l of lineas) {
    const celdas = l.startsWith('|') ? l.split('|').map((c) => c.trim()).filter((c) => c && !/^-+$/.test(c)) : [l]; const firma = norm(celdas.find((c) => norm(c).length >= 6) || '');
    if (firma.length < 6 || (firma.match(/\p{L}/gu) || []).length < 4) { pagina.push(pag); continue; } // una cabecera «2021 tkr.» no dice nada: el PDF separa año y unidad
    con++; const clave = firma.slice(0, 24); let q = -1;
    for (let p = pag; p <= Math.min(paginas.length, pag + 3); p++) if (paginas[p - 1].includes(clave)) { q = p; break; }
    // un texto con cifras al lado («Inden for 1 år: 31.915 31.212»): el PDF separa la etiqueta de las cifras, se busca la etiqueta (lo que hay antes de la primera cifra, desde 6 caracteres)
    const etiqueta = norm((celdas.find((c) => norm(c).length >= 6) || '').split(/\d/)[0]);
    if (q < 0 && etiqueta.length >= 6) for (let p = pag; p <= Math.min(paginas.length, pag + 3); p++) if (paginas[p - 1].includes(etiqueta)) { q = p; break; }
    if (q > 0) { ubicadas++; pag = q; } else sin.push(l.slice(0, 90));
    pagina.push(pag);
  }
  return { pagina, con, ubicadas, sinPagina: sin };
}
// ESCALÓN 2 de la compuerta (b), solo cuando `alinear` no llega al piso (Auditora 5): la misma firma de cada línea, el mismo piso, pero la asignación de páginas es la mejor posible en vez de la primera
// coincidencia. `alinear` avanza de a una y se desfasa para siempre tras unas pocas coincidencias falsas (en el consolidado PSE de København, 12 % de líneas ubicadas); acá se elige la secuencia NO
// DECRECIENTE de páginas que ubica más líneas (programación dinámica, líneas × páginas). Las páginas salen de `pdftotext -raw` (orden del flujo del contenido, no el supuesto orden de lectura).
// Una línea sin lugar en esa secuencia queda sin página: lleva la de la línea ubicada anterior, nunca una inventada.
const esFirmable = (l) => { const celdas = l.startsWith('|') ? l.split('|').map((c) => c.trim()).filter((c) => c && !/^-+$/.test(c)) : [l]; const firma = norm(celdas.find((c) => norm(c).length >= 6) || ''); return firma.length >= 6 && (firma.match(/\p{L}/gu) || []).length >= 4; };
export function alinearOptimo(lineas, paginas) {
  const P = paginas.length; const mejor = Array.from({ length: P + 1 }, () => ({ val: 0 })); let con = 0; const cands = [];
  lineas.forEach((l, i) => {
    const celdas = l.startsWith('|') ? l.split('|').map((c) => c.trim()).filter((c) => c && !/^-+$/.test(c)) : [l]; const firma = norm(celdas.find((c) => norm(c).length >= 6) || '');
    if (firma.length < 6 || (firma.match(/\p{L}/gu) || []).length < 4) return;
    con++; const clave = firma.slice(0, 24); const etiqueta = norm((celdas.find((c) => norm(c).length >= 6) || '').split(/\d/)[0]);
    const c = []; for (let p = 1; p <= P; p++) if (paginas[p - 1].includes(clave) || (etiqueta.length >= 6 && paginas[p - 1].includes(etiqueta))) c.push(p);
    cands[i] = c;
  });
  lineas.forEach((l, i) => {
    const c = cands[i]; if (!c || !c.length) return;
    let pref = { val: 0 }; const nuevos = []; let k = 0;
    for (let p = 1; p <= P; p++) { if (mejor[p].val > pref.val) pref = mejor[p]; if (c[k] === p) { nuevos.push([p, { val: pref.val + 1, i, p, prev: pref }]); k++; } }
    for (const [p, nodo] of nuevos) if (nodo.val > mejor[p].val) mejor[p] = nodo;
  });
  let fin = mejor[1]; for (let p = 1; p <= P; p++) if (mejor[p].val > fin.val) fin = mejor[p];
  const asign = new Map(); for (let nd = fin; nd && nd.i !== undefined; nd = nd.prev) asign.set(nd.i, nd.p);
  const pagina = []; const sin = []; let pag = 1;
  lineas.forEach((l, i) => { if (asign.has(i)) pag = asign.get(i); else if (esFirmable(l)) sin.push(l.slice(0, 90)); pagina.push(pag); });
  return { pagina, con, ubicadas: asign.size, sinPagina: sin };
}
export function armarMd(xhtmlNombre, lineas, pagina) {
  const out = [`> Generado de ${xhtmlNombre} por tools/xhtml-aarsrapport.mjs · motor: ${MOTOR}. El PDF de al lado es la impresión de Chrome del XHTML oficial, no el documento oficial.`, ''];
  let actual = 0;
  lineas.forEach((l, i) => { if (pagina[i] !== actual) { actual = pagina[i]; out.push('', `--- pág. ${actual} ---`, ''); } out.push(l); if (l.startsWith('|') && !(lineas[i + 1] || '').startsWith('|')) out.push(''); });
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

export function convertir(xhtmlAbs, { pdfDestino }) {
  const src = leerXhtmlTexto(xhtmlAbs); const nombre = basename(xhtmlAbs);
  // Chrome imprime desde un archivo: si el .xhtml viene comprimido con gzip, se imprime una copia descomprimida en la carpeta temporal (el original no se toca)
  const comprimido = (() => { const b = readFileSync(xhtmlAbs).subarray(0, 2); return b[0] === 0x1f && b[1] === 0x8b; })();
  const paraChrome = comprimido ? (() => { const d = join(tmpdir(), 'xhtml-aarsrapport', 'gunzip'); mkdirSync(d, { recursive: true }); const p = join(d, nombre); writeFileSync(p, src); return p; })() : xhtmlAbs;
  const { lineas, hechos } = xhtmlALineas(src); const { faltan, ocultos } = hechosFaltantes(lineas, hechos);
  const r = { nombre, lineas: lineas.length, hechos: hechos.length, ocultos, faltan, errores: [] };
  if (faltan.length) r.errores.push(`(a) ${faltan.length} hecho(s) visible(s) sin su número en el .md: ${faltan.slice(0, 5).map((h) => `«${h.txt}» ${h.nombre}`).join(', ')}${faltan.length > 5 ? ', …' : ''}`);
  if (r.errores.length) return r;
  let paginas; try { paginas = imprimirPdf(paraChrome, pdfDestino); } catch (e) { r.errores.push(e.message); return r; }
  let al = alinear(lineas, paginas); r.paginasPdf = paginas.length; r.con = al.con; r.ubicadas = al.ubicadas;
  if (al.con && al.ubicadas / al.con < MIN_UBICADAS) { // escalón 2: la misma compuerta con la mejor asignación de páginas (solo si el codicioso no llega)
    const op = alinearOptimo(lineas, paginasRaw(pdfDestino, paginas.length)); r.escalon = 'óptimo'; r.ubicadasCodicioso = al.ubicadas;
    if (op.ubicadas > al.ubicadas) { al = op; r.ubicadas = op.ubicadas; }
  }
  if (al.con === 0 || al.ubicadas / al.con < MIN_UBICADAS) { r.errores.push(`(b) ${al.con - al.ubicadas} de ${al.con} líneas sin página en el PDF (${al.con ? Math.round(100 * al.ubicadas / al.con) : 0} % ubicadas, hace falta ${Math.round(MIN_UBICADAS * 100)} %): ${al.sinPagina.slice(0, 5).join(' | ')}`); return r; }
  r.md = armarMd(nombre, lineas, al.pagina); return r;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const ESCRIBIR = A.includes('--escribir'); const REHACER = A.includes('--rehacer');
  const entradas = A.filter((a) => !a.startsWith('--'));
  if (!entradas.length) { console.error('Uso: node tools/xhtml-aarsrapport.mjs "<xhtml>|<carpeta>" [...] [--escribir] [--rehacer]'); process.exit(1); }
  const xs = entradas.flatMap((e) => { const abs = resolve(ROOT, e); return existsSync(abs) && statSync(abs).isDirectory() ? readdirSync(abs).filter((f) => f.endsWith('.xhtml')).map((f) => join(abs, f)) : [abs]; });
  const tmp = join(tmpdir(), 'xhtml-aarsrapport'); mkdirSync(tmp, { recursive: true }); let mal = 0;
  for (const x of xs) {
    const rel = x.replace(ROOT + '/', ''); const mdAbs = x.replace(/\.xhtml$/, '.md'); const pdfAbs = x.replace(/\.xhtml$/, '.pdf');
    // CANDADO: la tool NUNCA escribe, ni con --rehacer, un .md o un .pdf que no generó ella. Un .md es suyo si empieza con su encabezado («Generado de … por tools/xhtml-aarsrapport.mjs»); un .pdf,
    // solo si el .md hermano lo es (el PDF sale del mismo XHTML y no lleva marca propia). Así un .xhtml con el mismo nombre que el PDF oficial de Companies House no lo pisa: se renombra el .xhtml (-ixbrl.xhtml).
    const mdPropio = existsSync(mdAbs) && /xhtml-aarsrapport\.mjs/.test(readFileSync(mdAbs, 'utf8').slice(0, 400));
    const ajeno = (existsSync(mdAbs) && !mdPropio) ? mdAbs : (existsSync(pdfAbs) && !mdPropio) ? pdfAbs : null;
    if (ajeno) { console.log(`${rel}: ${ajeno.replace(ROOT + '/', '')} no lo generó xhtml-aarsrapport.mjs: no se pisa (ni con --rehacer). Renombrá el .xhtml (por ejemplo -ixbrl.xhtml) y volvé a correr.`); mal++; continue; }
    if (!REHACER && (existsSync(mdAbs) || existsSync(pdfAbs))) { console.log(`${rel}: ya tiene ${existsSync(mdAbs) ? '.md' : '.pdf'}: no se toca (--rehacer)`); continue; }
    const tmpPdf = ESCRIBIR ? pdfAbs : join(tmp, basename(pdfAbs));
    let r; try { r = convertir(x, { pdfDestino: tmpPdf }); } catch (e) { console.log(`${rel}: ERROR ${e.message}`); mal++; continue; }
    console.log(`${rel}: ${r.lineas} líneas · ${r.hechos} hechos iXBRL (${r.ocultos.length} ocultos${r.ocultos.length ? `: ${[...new Set(r.ocultos.map((h) => h.nombre))].slice(0, 4).join(', ')}` : ''}) · ${r.paginasPdf ? `PDF ${r.paginasPdf} págs, ${r.ubicadas}/${r.con} líneas ubicadas${r.escalon ? ` (escalón ${r.escalon}; el codicioso ubicaba ${r.ubicadasCodicioso})` : ''}` : 'sin PDF'}`);
    if (r.errores.length) { for (const e of r.errores) console.log(`   NO SE ESCRIBE: ${e}`); mal++; continue; }
    if (!ESCRIBIR) { console.log('   ok (ensayo: no se escribió nada)'); continue; }
    writeFileSync(mdAbs, r.md);
    mkdirSync(join(ROOT, 'Admin', 'registros', 'api'), { recursive: true });
    appendFileSync(join(ROOT, 'Admin', 'registros', 'api', 'xhtml-ixbrl.jsonl'), JSON.stringify({ ts: new Date().toISOString(), md: rel.replace(/\.xhtml$/, '.md'), model: MOTOR, costUsd: 0, hechos: r.hechos, ocultos: r.ocultos.length }) + '\n');
    console.log(`   escrito: ${rel.replace(/\.xhtml$/, '.md')} y ${rel.replace(/\.xhtml$/, '.pdf')} (motor ${MOTOR})`);
  }
  process.exit(mal ? 1 : 0);
}
