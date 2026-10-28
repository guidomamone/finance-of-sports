// tools/gestion-evidencia.mjs — la evidencia que una nota de prensa da sobre quién condujo un club: la usa tools/gestion-exa.mjs con cada URL que citó Gemini. No escribe nada ni decide qué se carga.
// POR QUÉ. «El nombre aparece en la página» no alcanza: jaguaresfc.com/historia y notas de La Lengua Caribe y El Extra salían ✓ sin decir «presidente», la frase mostrada era el título de la página, Gemini confundía
// gerente con presidente, la fecha de página era a veces la de una ACTUALIZACIÓN (Wikipedia, elmeridiano) y los links de x.com daban 402. Esto separa tres cosas por persona y nota:
//   NOMBRA (aparece el nombre, y con qué forma: completo, nombre y apellido, apellidos o solo el apellido) · CARGO (presidente, presidente ejecutivo, gerente, director ejecutivo, dueño, accionista mayoritario…, en la ventana de texto
//   más corta que incluye el nombre y el cargo; esa ventana es la frase que se muestra, nunca el título) · FECHA (asumió o dejó el cargo con una fecha o un mes en la misma frase o párrafo).
// Por nota: la fecha de la URL (/AAAA/MM/DD/, AAAA-MM-DD, AAAAMMDD, /AAAA/MM/ = mes, /AAAA/ = año), la de publicación de la página, la de modificación, y, si la URL trae otra fecha, si la de página parece una actualización (posterior en más de
// 30 días a la última fecha que mencionan los párrafos donde aparece la persona) y con qué nombre del club sale (el actual o uno anterior). Las redes sociales (x.com, twitter.com, t.co…) no se abren: «no abrible (red social)», no son evidencia.
// Las partes puras (extraer, evidenciaDe, fechaDeUrl, conclusion) se prueban sin red; abrirNota es la única que va a la web.
export const MESES = 'enero febrero marzo abril mayo junio julio agosto septiembre setiembre octubre noviembre diciembre'.split(' ');
const mesN = (m) => { const i = MESES.indexOf(m); return i < 0 ? null : i >= 9 ? i : i + 1; }; // «setiembre» (índice 9) es septiembre
// minúsculas y sin tildes, CONSERVANDO el largo (para cortar el texto original con los índices del normalizado)
export const normL = (s) => String(s || '').split('').map((c) => (c.normalize('NFD')[0] || c).toLowerCase()[0] || c).join('');
const re = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Lo que no se abre: red social (pide sesión o da 402/403 a un cliente sin navegador). Lista corta; una URL que ya se sabe que da 402/403 se suma acá.
export const NO_ABRIBLES = ['x.com', 'twitter.com', 't.co', 'facebook.com', 'fb.com', 'instagram.com', 'tiktok.com', 'threads.net'];
export const noAbrible = (url) => { try { const h = new URL(url).hostname.replace(/^(www|m|mobile)\./, ''); return NO_ABRIBLES.some((d) => h === d || h.endsWith(`.${d}`)); } catch { return false; } };

// Los cargos, del más específico al más general. PRESIDENCIALES: los que cuentan como «quién condujo el club» (ARQUITECTURA, GESTIONES: presidente; en una sociedad, el dueño si es una persona).
export const CARGOS = [
  ['presidente ejecutivo', /\bpresident[ae] ejecutiv[oa]\b/g], ['vicepresidente', /\bvice ?president[ae]s?\b/g], ['expresidente', /\bex ?president[ae]s?\b/g], ['presidente', /\bpresident[ae]s?\b/g],
  ['gerente', /\bgerente(?: general| deportivo)?\b/g], ['director ejecutivo', /\bdirector[a]? ejecutiv[oa]\b/g], ['accionista mayoritario', /\b(?:accionista mayoritari[oa]|maximo accionista|socio mayoritari[oa])\b/g],
  ['dueño', /\bduen[oa]s?\b/g], ['propietario', /\bpropietari[oa]s?\b/g], ['mandamás', /\bmandamas\b/g],
];
export const PRESIDENCIALES = new Set(['presidente', 'presidente ejecutivo', 'accionista mayoritario', 'dueño', 'propietario']);
const INICIO = /\b(?:asumi[oa]|asume|asumira|fue (?:elegid[oa]|designad[oa]|nombrad[oa]|ratificad[oa]|posesionad[oa]|escogid[oa])|se posesion[oa]|tomo (?:posesion|las riendas|el mando)|llego a la presidencia|nuev[oa] president[ae]|nuevo gerente|nuevo dueno)\b/g;
const FIN = /\b(?:renuncio|renuncia|presento su renuncia|dimitio|dejo (?:el cargo|la presidencia|la gerencia|el club)|deja (?:el cargo|la presidencia)|fue (?:destituid[oa]|reemplazad[oa]|removid[oa]|apartad[oa])|salida|salio del club|fallecio|murio|vendio el club|vendio sus acciones)\b/g;
const FECHA = new RegExp(`\\b(?:(\\d{1,2}) de (${MESES.join('|')})(?:,? del? (\\d{4}))?|(${MESES.join('|')}) del? (\\d{4})|(\\d{1,2})/(\\d{1,2})/(\\d{4}))\\b`, 'g');

// HTML -> {titulo, texto}: el texto es el CUERPO (sin <head>, menús, encabezado, pie ni columnas laterales), con un salto de línea por párrafo.
export function extraer(html) {
  const h = String(html || ''); const titulo = (h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const ent = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&rsquo;|&lsquo;/g, "'").replace(/&laquo;/g, '«').replace(/&raquo;/g, '»').replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&([aeiou])acute;/gi, (m, v) => ({ a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú' })[v]).replace(/&ntilde;/g, 'ñ').replace(/&Ntilde;/g, 'Ñ')
    .replace(/&#x([0-9a-f]+);/gi, (m, x) => String.fromCodePoint(parseInt(x, 16))).replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(Number(d)));
  const cuerpo = h.replace(/<head[\s\S]*?<\/head>/i, ' ').replace(/<(script|style|noscript|nav|header|footer|aside|form|svg)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<title[\s\S]*?<\/title>/gi, ' ')
    .replace(/<\/(p|h\d|li|div|tr|blockquote|section|article)>|<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ');
  const texto = ent(cuerpo).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
  return { titulo: ent(titulo).replace(/\s+/g, ' ').trim(), texto };
}

const valida = (y, m, d) => y >= 1950 && y <= 2100 && m >= 1 && m <= 12 && (d == null || (d >= 1 && d <= 31));
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}${d == null ? '' : `-${String(d).padStart(2, '0')}`}`;
// La fecha que trae la URL: día (/AAAA/MM/DD/, AAAA-MM-DD, AAAAMMDD), mes (/AAAA/MM/) o año (/AAAA/). null si no trae.
export function fechaDeUrl(url) {
  let p; try { p = new URL(url).pathname; } catch { p = String(url); }
  for (const [rx, conDia] of [[/\/((?:19|20)\d\d)\/(\d\d)\/(\d\d)(?:\/|$)/, 1], [/((?:19|20)\d\d)-(\d\d)-(\d\d)(?!\d)/, 1], [/(?:^|[\/_-])((?:19|20)\d\d)(\d\d)(\d\d)(?!\d)/, 1], [/\/((?:19|20)\d\d)\/(\d\d)(?:\/|$)/, 0]]) {
    const m = p.match(rx); if (m && valida(+m[1], +m[2], conDia ? +m[3] : null)) return iso(+m[1], +m[2], conDia ? +m[3] : null);
  }
  const y = p.match(/\/((?:19|20)\d\d)\//); return y && valida(+y[1], 1) ? y[1] : null; // solo el año (lalenguacaribe.co/2017/deportes/…)
}
// Lo que nombresDe (verificar-fuente-web) toma por persona y no lo es: un medio («La Lengua Caribe», «El Extra», «Código Fútbol»).
const NO_PERSONA = new Set(['el', 'la', 'los', 'las', 'lo', 'un', 'una', 'codigo', 'diario', 'radio', 'canal', 'revista', 'semana', 'noticias', 'gol', 'win', 'futbol', 'deportes', 'club']);
export const esPersona = (n) => !NO_PERSONA.has(normL(n).split(/\s+/)[0]);
// Las fechas que declara la página: publicación y modificación (meta, JSON-LD, <time>, «Publicado el …»).
export function fechasDePagina(html) {
  const h = String(html || ''); const primera = (pats) => { for (const p of pats) { const m = h.match(p); const f = m && m[1].match(/(\d{4})-(\d{2})-(\d{2})/); if (f) return f[0]; } return null; };
  let publicada = primera([/property=["']article:published_time["'][^>]*content=["']([^"']+)/i, /content=["']([^"']+)["'][^>]*property=["']article:published_time["']/i, /"datePublished"\s*:\s*"([^"]+)"/i,
    /itemprop=["']datePublished["'][^>]*content=["']([^"']+)/i, /name=["'](?:date|pubdate|publishdate|DC\.date(?:\.issued)?)["'][^>]*content=["']([^"']+)/i, /<time[^>]*datetime=["']([^"']+)/i]);
  const modificada = primera([/property=["'](?:article:modified_time|og:updated_time)["'][^>]*content=["']([^"']+)/i, /content=["']([^"']+)["'][^>]*property=["'](?:article:modified_time|og:updated_time)["']/i, /"dateModified"\s*:\s*"([^"]+)"/i]);
  if (!publicada) { const v = normL(extraer(h).texto).match(/publicad[oa]:?\s+(?:el\s+)?(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/); if (v && mesN(v[2])) publicada = iso(+v[3], mesN(v[2]), +v[1]); }
  return { publicada, modificada };
}

// Las ocurrencias de una persona en el texto normalizado, con la forma más fuerte que aparece: «completo», «nombre y apellido», «apellidos» o «solo el apellido».
function ocurrencias(t, nombre) {
  const tk = normL(nombre).split(/\s+/).filter((p) => p && !/^(de|del|la|las|los|y)$/.test(p)); if (tk.length < 2) return { forma: null, pos: [] };
  const buscar = (frase) => { const out = []; const rx = new RegExp(`\\b${frase}\\b`, 'g'); let m; while ((m = rx.exec(t))) out.push([m.index, m.index + m[0].length]); return out; };
  const sep = '(?:\\s+(?:de|del|la|y)\\s+|\\s+)';
  const formas = [['completo', [tk.map(re).join(sep)]], ['nombre y apellido', tk.slice(1).filter((x) => x.length >= 4).map((x) => `${re(tk[0])}${sep}(?:[a-z]+\\s+){0,2}${re(x)}`)],
    ['apellidos', tk.slice(1).map((x, i, a) => (a[i + 1] ? `${re(x)}${sep}${re(a[i + 1])}` : null)).filter(Boolean)],
    ['solo el apellido', [tk.length >= 4 ? tk[tk.length - 2] : tk[tk.length - 1]].filter((x) => x.length >= 4).map(re)]];
  for (const [forma, pats] of formas) { const pos = pats.flatMap(buscar); if (pos.length) return { forma, pos, apellido: tk.length >= 4 ? tk[tk.length - 2] : tk[tk.length - 1] }; }
  return { forma: null, pos: [] };
}
const todas = (t, rx) => { const out = []; rx.lastIndex = 0; let m; while ((m = rx.exec(t))) out.push({ s: m.index, e: m.index + m[0].length, m }); return out; };
const fechaDe = (m, anioNota) => {
  if (m[2]) { const y = m[3] ? +m[3] : anioNota; return y && valida(y, mesN(m[2]), +m[1]) ? { fecha: iso(y, mesN(m[2]), +m[1]), precision: 'día', anioSupuesto: !m[3] } : null; }
  if (m[4]) return valida(+m[5], mesN(m[4])) ? { fecha: iso(+m[5], mesN(m[4])), precision: 'mes', anioSupuesto: false } : null;
  return valida(+m[8], +m[7], +m[6]) ? { fecha: iso(+m[8], +m[7], +m[6]), precision: 'día', anioSupuesto: false } : null;
};
// el párrafo (línea) que contiene la posición i, recortado a ±400 caracteres
const parrafo = (t, i) => { const a = Math.max(t.lastIndexOf('\n', i) + 1, i - 400); let b = t.indexOf('\n', i); if (b < 0) b = t.length; return [a, Math.min(b, i + 400)]; };

// La evidencia de UNA persona en el texto de una nota: nombra, cargo, frase, fecha de inicio o fin. `anioNota`: el año de la nota, para «el pasado 3 de mayo».
export function evidenciaDe(texto, nombre, anioNota = null) {
  const t = normL(texto); const oc = ocurrencias(t, nombre);
  const ev = { nombre, nombra: !!oc.forma, forma: oc.forma, cargo: null, otrosCargos: [], frase: null, evento: null, contexto: [] };
  if (!oc.forma) return ev;
  const cargos = CARGOS.flatMap(([c, rx]) => todas(t, rx).map((x) => ({ c, s: x.s, e: x.e })));
  // la ventana más corta que incluye el nombre y un cargo (a lo sumo 250 caracteres)
  let mejor = null; const cerca = new Set();
  for (const [a, b] of oc.pos) for (const k of cargos) {
    if (k.c === 'presidente' && cargos.some((o) => o !== k && o.s <= k.s && o.e >= k.e)) continue; // «presidente» dentro de «presidente ejecutivo» o «vicepresidente» no cuenta aparte
    const s = Math.min(a, k.s), e = Math.max(b, k.e); if (e - s > 250) continue; cerca.add(k.c);
    if (!mejor || e - s < mejor.e - mejor.s) mejor = { s, e, c: k.c };
  }
  for (const [a] of oc.pos) { const [p, q] = parrafo(t, a); ev.contexto.push([p, q]); }
  if (!mejor) { ev.sinFraseCargo = true; return ev; }
  ev.cargo = mejor.c; ev.otrosCargos = [...cerca].filter((c) => c !== mejor.c);
  // la frase: la ventana, sin salir de su párrafo, desde el comienzo de la oración (hasta 60 caracteres antes) hasta el punto siguiente (hasta 120 después)
  // (una ficha con «Presidente» y el nombre en renglones distintos cruza párrafos: el final se acota con el párrafo del final; « | » marca el salto)
  const [p, q] = parrafo(t, mejor.s); const q2 = mejor.e > q ? parrafo(t, mejor.e - 1)[1] : q;
  const ini = Math.max(p, mejor.s - 60, ...[...texto.slice(Math.max(p, mejor.s - 60), mejor.s).matchAll(/[.;!?]\s/g)].map((m) => Math.max(p, mejor.s - 60) + m.index + 2));
  const fin0 = texto.slice(mejor.e, Math.min(q2, mejor.e + 120)).search(/[.;!?](\s|$)/); const fin = fin0 >= 0 ? mejor.e + fin0 + 1 : Math.min(q2, mejor.e + 120);
  const desde = ini > p ? Math.max(p, texto.lastIndexOf(' ', ini) + 1) : p; // sin cortar una palabra
  ev.frase = texto.slice(desde, Math.max(fin, mejor.e)).replace(/\n/g, ' | ').replace(/\s+/g, ' ').trim();
  // fecha de inicio o de fin: un verbo de asunción o de salida y una fecha (día o mes) a menos de 160 caracteres, en el párrafo de la frase
  const zona = t.slice(p, q); const fechas = todas(zona, FECHA);
  let ev2 = null;
  for (const [tipo, rx] of [['asumió', INICIO], ['dejó', FIN]]) for (const v of todas(zona, rx)) for (const f of fechas) {
    const d = Math.abs(f.s - v.s); if (d > 160) continue; const fe = fechaDe(f.m, anioNota); if (!fe) continue;
    if (!ev2 || d < ev2.d) ev2 = { tipo, ...fe, d, verbo: v.m[0], frase: texto.slice(p + Math.min(f.s, v.s), p + Math.max(f.e, v.e)).replace(/\s+/g, ' ').trim() };
  }
  if (ev2) { delete ev2.d; ev.evento = ev2; }
  return ev;
}

// Las fechas (con año) que mencionan los párrafos de contexto: la más tardía sirve para ver si la fecha de la página es la de una actualización. Un año suelto cuenta como su 31-12.
// conAnios=false: solo fechas con día o mes.
export function ultimaFechaDeContexto(texto, rangos, conAnios = true) {
  const t = normL(texto); let max = null;
  for (const [p, q] of rangos) { const z = t.slice(p, q);
    for (const f of todas(z, FECHA)) { const fe = fechaDe(f.m, null); if (fe) { const x = fe.precision === 'mes' ? `${fe.fecha}-28` : fe.fecha; if (!max || x > max) max = x; } }
    if (conAnios) for (const y of z.matchAll(/\b(19[5-9]\d|20\d\d)\b/g)) { const x = `${y[1]}-12-31`; if (!max || x > max) max = x; } }
  return max;
}
const dias = (a, b) => (Date.parse(a.length === 7 ? `${a}-01` : a) - Date.parse(b.length === 7 ? `${b}-01` : b)) / 864e5;

// Abre una nota (la única función con red) y arma su evidencia para cada nombre de persona y de club.
export async function abrirNota(url, personas = [], clubes = []) {
  const fechaUrl = fechaDeUrl(url);
  if (noAbrible(url)) return { url, abre: false, noAbrible: true, motivo: 'no abrible (red social)', fechaUrl, personas: [] };
  let res; try { res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; finance-of-sports-verificador)', accept: 'text/html' }, signal: AbortSignal.timeout(12000) }); }
  catch (e) { return { url, abre: false, motivo: `no se pudo abrir (${e.name === 'TimeoutError' ? 'tiempo' : 'red'})`, fechaUrl, personas: [] }; }
  if (!res.ok) return { url, abre: false, motivo: `no abre (HTTP ${res.status})`, fechaUrl, personas: [] };
  if (/pdf/i.test(res.headers.get('content-type') || '') || /\.pdf($|\?)/i.test(new URL(res.url || url).pathname)) return { url, abre: false, motivo: 'es un PDF: acá no se lee (abrilo a mano)', fechaUrl, personas: [] };
  return notaDesdeHtml(url, await res.text(), personas, clubes);
}
// Lo mismo sin red (para probar): el HTML ya bajado.
export function notaDesdeHtml(url, html, personas = [], clubes = []) {
  const fechaUrl = fechaDeUrl(url); const { titulo, texto } = extraer(html); const { publicada, modificada } = fechasDePagina(html);
  // la fecha de la nota: la de la URL; si la URL solo trae el año y la página una fecha de ese año, la de la página
  const fechaNota = (fechaUrl && fechaUrl.length === 4 && (publicada || '').startsWith(fechaUrl) ? publicada : fechaUrl || publicada) || null; const anioNota = fechaNota ? +fechaNota.slice(0, 4) : null;
  const ps = personas.map((n) => evidenciaDe(texto, n, anioNota));
  // POSIBLE ACTUALIZACIÓN. Con la URL fechada y la página con otra fecha: la de página (publicada o, si no hay, la de modificación) es posterior en más de 30 días a la última fecha (o año) que mencionan los párrafos donde aparece la persona.
  // Sin fecha en la URL no se decide (solo se imprimen la publicada y la modificada): compararla con el cuerpo marcaba como actualización a notas de La Lengua Caribe y El Extra que son de su fecha y cuentan el pasado.
  const fp = publicada || modificada; let ultima = null, posibleActualizacion = false;
  if (fp && fechaUrl && !fp.startsWith(fechaUrl)) { ultima = ultimaFechaDeContexto(texto, ps.flatMap((p) => p.contexto)); posibleActualizacion = !!(ultima && dias(fp, ultima) > 30); }
  const tn = normL(`${titulo}\n${texto}\n${decodeURIComponent(url).replace(/[-_\/]/g, ' ')}`);
  const clubEnNota = clubes.filter((c) => new RegExp(`\\b${re(normL(c)).replace(/\s+/g, '\\s+')}\\b`).test(tn));
  for (const p of ps) delete p.contexto;
  return { url, abre: true, titulo, fechaUrl, publicada, modificada, fechaNota, ultimaDeContexto: ultima, posibleActualizacion, clubEnNota, personas: ps };
}

// Las líneas que imprime gestion-exa por nota (sangría de 8).
export function lineasDe(n, { soloSiNombra = new Set() } = {}) {
  const L = [];
  if (!n.abre) { L.push(`✗ ${n.motivo}${n.noAbrible ? ': no cuenta como evidencia' : ''}${n.fechaUrl ? ` · fecha en la URL ${n.fechaUrl}` : ''}`); return L; }
  const fp = n.publicada ? `página ${n.publicada}` : n.modificada ? `página (modificada) ${n.modificada}` : 'página sin fecha';
  const mod = n.publicada && n.modificada && n.modificada !== n.publicada ? ` · modificada ${n.modificada}` : '';
  const dif = n.fechaUrl && (n.publicada || n.modificada) && !(n.publicada || n.modificada).startsWith(n.fechaUrl);
  L.push(`abre · ${n.fechaUrl ? `URL ${n.fechaUrl}${n.fechaUrl.length === 4 ? ' (solo año)' : ''}` : 'URL sin fecha'} · ${fp}${mod}${n.posibleActualizacion ? ` (posible actualización: sus párrafos llegan a ${n.ultimaDeContexto.slice(0, n.ultimaDeContexto.endsWith('-12-31') ? 4 : 10)})` : dif ? ' (distinta de la URL)' : ''}${n.clubEnNota.length ? ` · club en la nota: ${n.clubEnNota.join(' / ')}` : ' · no nombra al club'}`);
  for (const p of n.personas) {
    if (!p.nombra) { if (!soloSiNombra.has(p.nombre)) L.push(`${p.nombre}: ✗ no aparece en la nota`); continue; }
    const cargo = p.cargo ? `cargo: ${p.cargo}${p.otrosCargos.length ? ` (cerca también: ${p.otrosCargos.join(', ')})` : ''}` : 'sin cargo';
    const fe = p.evento ? `fecha: ${p.evento.tipo} ${p.evento.fecha}${p.evento.precision === 'mes' ? ' (solo mes)' : ''}${p.evento.anioSupuesto ? ' (año de la nota)' : ''}` : 'sin fecha de inicio ni fin';
    L.push(`${p.nombre}: ✓ nombra (${p.forma}) · ${cargo} · ${fe}`);
    L.push(p.frase ? `  «${p.frase.slice(0, 300)}»` : '  sin frase con el cargo');
    if (p.evento && !(p.frase || '').includes(p.evento.frase)) L.push(`  fecha en: «${p.evento.frase.slice(0, 200)}»`);
  }
  return L;
}

// ---- conclusión por persona y cierre (solo salida; la sesión decide) ----
const finDeMes = (ym) => { const [y, m] = ym.split('-').map(Number); return `${ym}-${String(new Date(Date.UTC(y, m, 0)).getUTCDate()).padStart(2, '0')}`; };
// agrupa nombres de la misma persona: mismo primer nombre y los apellidos de uno contenidos en los del otro («Roberto Rodríguez» va con el primer grupo que lo contiene;
// «Roberto Rodríguez Hernández», el padre, NO se junta con «Roberto Enrique Rodríguez Ruiz», el hijo). El orden importa: van primero los de las gestiones cargadas.
export function agrupar(nombres) {
  const g = [];
  for (const n of nombres.filter(esPersona)) { const tk = normL(n).split(/\s+/).filter((p) => !/^(de|del|la|y)$/.test(p));
    const sub = (a, b) => a.slice(1).every((p) => b.slice(1).includes(p));
    const x = g.find((o) => o.tk[0] === tk[0] && tk.length > 1 && (sub(tk, o.tk) || sub(o.tk, tk)));
    if (x) { x.alias.add(n); if (n.length > x.nombre.length) { x.nombre = n; x.tk = tk; } } else g.push({ nombre: n, tk, alias: new Set([n]) }); }
  return g;
}
// notas: las de abrirNota. cierres: [{anio, cierre}]. gestiones: las de data/gestiones del club. Devuelve líneas.
export function conclusion(notas, cierres, gestiones = []) {
  const grupos = agrupar([...new Set([...gestiones.map((g) => g.nombre), ...notas.flatMap((n) => (n.personas || []).filter((p) => p.nombra).map((p) => p.nombre))])]);
  const L = [];
  for (const c of cierres) {
    const y = Number(c.cierre.slice(0, 4)); let alguna = false;
    for (const gr of grupos) {
      const ev = notas.filter((n) => n.abre).flatMap((n) => n.personas.filter((p) => gr.alias.has(p.nombre) && p.nombra).map((p) => ({ ...p, nota: n })));
      const cubreGestion = gestiones.some((g) => gr.alias.has(g.nombre) && g.desde <= c.cierre && (!g.hasta || c.cierre <= g.hasta));
      const delAnio = ev.filter((e) => e.cargo && e.nota.fechaNota && Math.abs(+e.nota.fechaNota.slice(0, 4) - y) <= 1);
      const fechadas = ev.filter((e) => e.evento && e.nota.fechaNota && PRESIDENCIALES.has(e.cargo));
      const inicios = fechadas.filter((e) => e.evento.tipo === 'asumió' && e.evento.fecha <= c.cierre.slice(0, e.evento.fecha.length));
      const fines = fechadas.filter((e) => e.evento.tipo === 'dejó' && e.evento.fecha >= c.cierre.slice(0, e.evento.fecha.length));
      // dejó el cargo (nota fechada) antes del cierre y después de su último inicio fechado: no es candidato para este cierre
      const ultIni = inicios.map((e) => e.evento.fecha).sort().pop() || '';
      const seFue = fechadas.filter((e) => e.evento.tipo === 'dejó' && e.evento.fecha < c.cierre.slice(0, e.evento.fecha.length) && e.evento.fecha > ultIni)[0];
      if (seFue && !fines.length) { if (cubreGestion) { alguna = true; L.push(`  ${c.anio} (cierre ${c.cierre}) · ${gr.nombre}: la gestión cargada cubre el cierre, pero una nota dice que dejó el cargo antes (${seFue.evento.fecha}, ${seFue.nota.url}): revisar`); } continue; }
      if (!cubreGestion && !delAnio.length && !inicios.length && !fines.length) continue;
      alguna = true;
      // regla de ARQUITECTURA (GESTIONES): una fecha solo de mes vale si el cierre no cae en ese mes
      const mesDelCierre = (e) => e.evento.precision === 'mes' && e.evento.fecha === c.cierre.slice(0, 7);
      const ini = inicios.filter((e) => !mesDelCierre(e)).sort((a, b) => (a.evento.fecha < b.evento.fecha ? 1 : -1))[0];
      const fin = fines.filter((e) => !mesDelCierre(e)).sort((a, b) => (a.evento.fecha > b.evento.fecha ? 1 : -1))[0];
      const desde = ini && (ini.evento.precision === 'mes' ? `${ini.evento.fecha}-01` : ini.evento.fecha), hasta = fin && (fin.evento.precision === 'mes' ? finDeMes(fin.evento.fecha) : fin.evento.fecha);
      // el cargo con que lo nombran las notas de ese año (±1): gerente y presidente se confunden
      const cargos = [...new Set(delAnio.map((e) => e.cargo))]; const soloOtro = cargos.length && !cargos.some((k) => PRESIDENCIALES.has(k));
      const nota = (soloOtro ? ` (las notas de esos años lo llaman ${cargos.join(', ')}, no presidente)` : '') + ([...inicios, ...fines].some(mesDelCierre) ? ' (hay una fecha solo de mes que cae en el mes del cierre: no sirve)' : '');
      let linea;
      if (!ini) linea = `sin nota de inicio: cargar confirmada:false${fin ? ` (salida fechada: hasta ${hasta}, ${fin.nota.url})` : ''}`;
      else if (!fin) linea = `sin nota de salida: cargar confirmada:false (inicio fechado: desde ${desde}, ${ini.nota.url}; si sigue en el cargo hoy, hasta:null con ese inicio: lo decide la sesión)`;
      else linea = `inicio y fin fechados: confirmada:true posible (desde ${desde}, ${ini.nota.url}; hasta ${hasta}, ${fin.nota.url})`;
      L.push(`  ${c.anio} (cierre ${c.cierre}) · ${gr.nombre}: ${linea}${nota}`);
    }
    if (!alguna) L.push(`  ${c.anio} (cierre ${c.cierre}): ninguna persona con una nota abierta que la nombre con un cargo cerca de ese año: cargar confirmada:false y preguntar`);
  }
  return L;
}
