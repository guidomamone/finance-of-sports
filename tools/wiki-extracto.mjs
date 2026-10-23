#!/usr/bin/env node
// ============================================================================
// tools/wiki-extracto.mjs — UN EXTRACTO CORTO DE UNA PÁGINA DE WIKIPEDIA: la ficha (infobox) o una sección, no la página entera.
//
// POR QUÉ. Para las gestiones los subagentes abrían la página completa de un club en Wikipedia y se caían por tamaño. Casi
// siempre alcanza con la ficha (presidente, fundación) o con UNA sección ("History", "Presidents", "Historia", "Presidentes"). Esto baja
// SOLO eso, por la API de MediaWiki (HTML renderizado, para que las plantillas ya vengan expandidas; sin resumen de un modelo: mismo criterio que fetch-club-league-reference.mjs) y lo
// devuelve como texto plano corto, con la URL de la página y la sección como fuente.
//
// USO:
//   node tools/wiki-extracto.mjs "<título>" [--lang en|es|pt|...] --ficha            la infobox, un "campo: valor" por línea
//   node tools/wiki-extracto.mjs "<título>" --seccion "<texto del título>"           una sección (por coincidencia de texto, sin importar mayúsculas)
//   node tools/wiki-extracto.mjs "<título>" --secciones                              solo la lista de títulos de sección
//   ... --max <caracteres>   tope del extracto (default 6000); si se corta lo dice
//   ... --json               una línea JSON { titulo, url, lang, seccion, texto, cortado }
// Sin --ficha, --seccion ni --secciones: la sección de arriba (introducción), también acotada por --max.
//
// Una sola consulta (dos si es una sección). Sin dependencias: Node 22 y fetch.
// ============================================================================
import { pathToFileURL } from 'node:url';

const UA = { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' };

async function api(lang, params) {
  const url = `https://${lang}.wikipedia.org/w/api.php?${new URLSearchParams({ format: 'json', redirects: '1', ...params })}`;
  const res = await fetch(url, { headers: UA });
  const data = await res.json();
  if (data.error) throw new Error(`Wikipedia API: ${data.error.info}`);
  return data;
}

// wikitext -> texto plano corto: sin <ref>, comentarios, tablas, archivos ni categorías; [[a|b]] -> b; {{plantillas}} se quedan con su texto útil
export function limpiar(w) {
  let t = String(w);
  t = t.replace(/<!--[\s\S]*?-->/g, '').replace(/<ref[^>]*\/>/gi, '').replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  t = t.replace(/<br\s*\/?>/gi, ', ').replace(/<\/?(small|sup|sub|nowiki|div|span|center|big)[^>]*>/gi, '');
  t = t.replace(/\[\[(?:File|Image|Archivo|Imagen|Ficheiro|Imagem):[^\]]*(?:\[\[[^\]]*\]\][^\]]*)*\]\]/gi, '').replace(/\[\[(?:Category|Categoría|Categoria):[^\]]*\]\]/gi, '');
  for (let i = 0; i < 4; i++) t = t.replace(/\{\{(?:flagicon|flag|bandera|banderaicon)[^{}]*\}\}/gi, '');
  for (let i = 0; i < 6; i++) t = t.replace(/\{\{(?:nowrap|small|lang|transl|hlist|plainlist|ubl|unbulleted list|flatlist)\s*\|([^{}]*)\}\}/gi, (m, a) => a.replace(/^[a-z-]+\|/i, '').replace(/\|/g, ', '));
  for (let i = 0; i < 6; i++) t = t.replace(/\{\{(?:Start date|Fecha|Birth date|Death date|Fecha de inicio|Dtlink|Date)[^{}]*\|(\d{4})\|(\d{1,2})\|(\d{1,2})[^{}]*\}\}/gi, '$1-$2-$3');
  // plantilla de fecha o de número ({{Dtlink|1921|1|2}}, {{Data|2|1|1921}}): se queda con sus números unidos por "-"
  for (let i = 0; i < 6; i++) t = t.replace(/\{\{[^{}|]*((?:\|\s*\d{1,4}\s*)+)\}\}/g, (m, a) => a.split('|').map((x) => x.trim()).filter(Boolean).join('-'));
  // plantillas que quedan: las de citas, navegación y mantenimiento se sacan; las demás conservan el texto de sus argumentos
  // ({{Diretoria|presidente=X|vice=Y}} -> "X; Y"), en vez de desaparecer con su dato adentro
  const RUIDO = /^\s*(cite|citar|cita|ref|reflist|notelist|efn|sfn|refn|portal|commons|wikidata|authority|coord|navbox|navega|esbo|stub|clear|-|br|col|div|main|ver |see |further|dablink|about|short description|use |good article|featured|redirect|hatnote|more|sidebar|footer)/i;
  for (let i = 0; i < 6; i++) t = t.replace(/\{\{([^{}|]*)((?:\|[^{}]*)?)\}\}/g, (m, nombre, args) => RUIDO.test(nombre) ? '' : args.split('|').slice(1).map((x) => x.replace(/^\s*[\w\u00C0-\u017F -]{1,30}=\s*/, '').trim()).filter((x) => /[\p{L}\d]/u.test(x)).join('; '));
  t = t.replace(/\{\|[^\n]*\n([\s\S]*?)\n\|\}/g, (m, cuerpo) => cuerpo.split(/\n\|-[^\n]*/).map((fila) => fila.split(/\n[|!]|\|\||!!/).map((c) => c.replace(/^[|!]\s*/, '').replace(/^[^|\n]*\|(?!\|)(?=[^|]*$)/, '').trim()).filter(Boolean).join(' | ')).filter(Boolean).join('\n'));
  t = t.replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, '$2').replace(/\[\[([^\]]*)\]\]/g, '$1').replace(/\[https?:\/\/\S+\s+([^\]]*)\]/g, '$1').replace(/\[https?:\/\/\S+\]/g, '');
  t = t.replace(/'{2,5}/g, '').replace(/&nbsp;/g, ' ').replace(/&ndash;/g, '–').replace(/&amp;/g, '&');
  return t.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

// la infobox: busca "{{Infobox ..." / "{{Ficha de ..." y lee sus "| campo = valor" con llaves balanceadas
export function ficha(wikitext) {
  const m = wikitext.match(/\{\{\s*(?:Infobox|Ficha|Info|Caixa)[^|{}\n]*/i);
  if (!m) return null;
  let i = m.index, prof = 0, fin = wikitext.length;
  for (let j = i; j < wikitext.length - 1; j++) {
    if (wikitext[j] === '{' && wikitext[j + 1] === '{') { prof++; j++; } else if (wikitext[j] === '}' && wikitext[j + 1] === '}') { prof--; j++; if (prof === 0) { fin = j + 1; break; } }
  }
  const cuerpo = wikitext.slice(i, fin).replace(/^\{\{[^|\n]*/, '').replace(/\}\}$/, '');
  const campos = []; let prof2 = 0, actual = '';
  const pedazos = [];
  for (let j = 0; j < cuerpo.length; j++) {
    const c = cuerpo[j], n = cuerpo[j + 1];
    if ((c === '{' && n === '{') || (c === '[' && n === '[')) { prof2++; actual += c + n; j++; continue; }
    if ((c === '}' && n === '}') || (c === ']' && n === ']')) { prof2--; actual += c + n; j++; continue; }
    if (c === '|' && prof2 === 0) { pedazos.push(actual); actual = ''; continue; }
    actual += c;
  }
  pedazos.push(actual);
  for (const p of pedazos) {
    const k = p.indexOf('='); if (k < 0) continue;
    const clave = p.slice(0, k).trim(); const valor = limpiar(p.slice(k + 1)).replace(/\n+/g, '; ').trim();
    if (/^(img|res_img|modelo|skin|corpo|bra[cç]o|cal[cç][oõ]es|meias|pattern|leftarm|rightarm|body|shorts|socks|image|logo|alt|caption|upright|size)/i.test(clave)) continue; // camisetas e imágenes: no son datos
    if (clave && valor) campos.push(`${clave}: ${valor}`);
  }
  return campos.join('\n');
}

// HTML renderizado -> texto: las plantillas ya vienen expandidas (la lista de presidentes de un club suele ser una plantilla transcluida
// que el wikitext crudo no trae). Tablas: una fila por línea, celdas separadas por " | ".
export function htmlATexto(h) {
  let t = String(h);
  t = t.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<sup[^>]*class="[^"]*reference[^"]*"[\s\S]*?<\/sup>/gi, '').replace(/<span class="mw-editsection"[\s\S]*?<\/span><\/span>/gi, '');
  t = t.replace(/(<(?:td|th)[^>]*>)([\s\S]*?)(<\/(?:td|th)>)/gi, (m, a, c, z) => a + c.replace(/<\/(p|li|div)>/gi, ' ').replace(/\n/g, ' ') + z); // una celda = una línea
  t = t.replace(/<br\s*\/?>/gi, ', ').replace(/<\/(td|th)>/gi, ' | ').replace(/<\/(tr|li|p|h\d|div|caption|dd|dt)>/gi, '\n').replace(/<[^>]+>/g, '');
  t = t.replace(/&nbsp;|&#160;/g, ' ').replace(/&ndash;|&#8211;/g, '–').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n))).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return t.replace(/\[\d+\]|\[nota \d+\]|\[editar\]/gi, '').split('\n').map((l) => l.replace(/[ \t]+/g, ' ').replace(/\s*\|\s*(\|\s*)+/g, ' | ').replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim()).filter((l) => l && !l.startsWith('↑')).join('\n'); // sin las notas al pie
}

// la ficha: la primera tabla "infobox" renderizada, una fila "campo: valor" por línea
export function fichaHtml(html) {
  const m = html.match(/<table[^>]*class="[^"]*infobox[^"]*"[\s\S]*?<\/table>/i) || html.match(/<table[^>]*class="[^"]*(?:vcard|infocaja)[^"]*"[\s\S]*?<\/table>/i);
  if (!m) return null;
  const filas = [...m[0].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => r[1]);
  const out = [];
  for (const f of filas) {
    const th = f.match(/<th[^>]*>([\s\S]*?)<\/th>/i); const td = f.match(/<td[^>]*>([\s\S]*?)<\/td>/i);
    const k = th ? htmlATexto(th[1]).replace(/\n/g, ' ') : ''; const v = td ? htmlATexto(td[1]).replace(/\n/g, '; ') : '';
    if (/<img|\.svg|\.png|\.jpg/i.test(f) && !v.replace(/[^\p{L}\d]/gu, '')) continue;
    if (k && v) out.push(`${k}: ${v}`); else if (v) out.push(v); else if (k && !td) out.push(`\n${k}`);
  }
  return out.join('\n').trim();
}

export async function extracto(titulo, { lang = 'en', modo = 'intro', seccion = null, max = 6000 } = {}) {
  const idx = await api(lang, { action: 'parse', page: titulo, prop: 'sections' });
  const tituloReal = idx.parse.title; const url = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(tituloReal.replace(/ /g, '_'))}`;
  const secciones = idx.parse.sections.map((s) => ({ n: s.index, nivel: s.level, titulo: limpiar(s.line) }));
  if (modo === 'secciones') return { titulo: tituloReal, url, lang, seccion: null, texto: secciones.map((s) => `${'  '.repeat(Math.max(0, s.nivel - 2))}${s.n}. ${s.titulo}`).join('\n'), cortado: false };
  const html = async (sec) => (await api(lang, { action: 'parse', page: titulo, prop: 'text', section: String(sec), disablelimitreport: '1', disableeditsection: '1' })).parse.text['*'];
  let nombre = 'introducción'; let h = await html(0);
  if (modo === 'ficha') return { titulo: tituloReal, url, lang, seccion: 'ficha', texto: fichaHtml(h) || '(la página no tiene ficha)', cortado: false };
  if (modo === 'seccion') {
    const q = String(seccion).toLowerCase();
    const s = secciones.find((x) => x.titulo.toLowerCase() === q) || secciones.find((x) => x.titulo.toLowerCase().includes(q));
    if (!s) return { titulo: tituloReal, url, lang, seccion, texto: `(no hay una sección que diga "${seccion}"; las hay: ${secciones.map((x) => x.titulo).join(' | ')})`, cortado: false };
    h = await html(s.n); nombre = s.titulo;
  } else h = h.replace(/<table[^>]*class="[^"]*infobox[\s\S]*?<\/table>/i, ''); // la introducción sin la ficha (para eso está --ficha)
  let texto = htmlATexto(h); const cortado = texto.length > max; if (cortado) texto = texto.slice(0, max) + `\n[... cortado en ${max} caracteres; usá --max o una sección más chica]`;
  return { titulo: tituloReal, url, lang, seccion: nombre, texto, cortado };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const A = process.argv.slice(2); const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
  const titulo = A.find((a, i) => !a.startsWith('--') && !['--lang', '--seccion', '--max'].includes(A[i - 1]));
  if (!titulo) { console.error('Uso: node tools/wiki-extracto.mjs "<título>" [--lang en] (--ficha | --seccion "<texto>" | --secciones) [--max 6000] [--json]'); process.exit(1); }
  const modo = A.includes('--ficha') ? 'ficha' : A.includes('--secciones') ? 'secciones' : flag('--seccion') ? 'seccion' : 'intro';
  extracto(titulo, { lang: flag('--lang') || 'en', modo, seccion: flag('--seccion'), max: Number(flag('--max')) || 6000 }).then((r) => {
    if (A.includes('--json')) console.log(JSON.stringify(r)); else console.log(`# ${r.titulo} (${r.lang}.wikipedia.org) · ${r.seccion || 'secciones'}\n# fuente: ${r.url}\n\n${r.texto}`);
  }).catch((e) => { console.error(e.message); process.exit(1); });
}
