// tools/verificar-fuente-web.mjs — abre una URL citada por un modelo y comprueba que la nota diga lo que se le atribuye: que se abra, que el nombre de la persona aparezca en la página y cuál es su fecha.
// POR QUÉ. Gemini con búsqueda de Google (tools/gestion-exa.mjs) devuelve cada afirmación con la URL real que encontró, pero la afirmación puede decir más que la nota (una nota que solo «habría pactado» un patrocinio se contó como patrocinio;
// una nota que no menciona a nadie se contó como «sin patrocinador»). Esto es lo que se hacía a mano con WebFetch: abrir cada nota y mirar el nombre y la fecha. No decide nada: marca y muestra la frase de la nota.
// QUÉ DA, por URL: si abre (o el código con que no abre: 403, 404…), la fecha de la URL (/2020/07/10/), la fecha que declara la página (meta, JSON-LD, <time>) y, por cada nombre de persona del texto, si su apellido aparece y la frase donde aparece.
//   Una fecha de página que difiere en años de la de la URL se marca («la página muestra otra fecha»: una nota vieja con la fecha de una actualización).
// USO: node tools/fos.mjs verificar-url <url> --nombre "Gustavo Moreno Arango" [--nombre "Otro Nombre"]     (gratis)
import { fileURLToPath } from 'node:url';

const MESES = 'enero febrero marzo abril mayo junio julio agosto septiembre setiembre octubre noviembre diciembre'.split(' ');
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const htmlATexto = (h) => String(h).replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ').replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(Number(d))).replace(/\s+/g, ' ');
const NO_ES_PERSONA = new Set(['presidente', 'fecha', 'nota', 'club', 'real', 'atletico', 'dimayor', 'promotora', 'alcaldia', 'superintendencia', 'federacion', 'gobernacion', 'diario', 'liga', 'torneo', 'junta', 'directiva', 'sociedad', 'colombia', 'cartagena', 'cali', 'bogota', 'medellin', 'bolivar', 'primertiempo', 'universal', 'tiempo', 'zona', 'cero', 'bolivarense', 'galactica', 'radio', 'caracol', 'espectador', 'noticias', 'marca', 'sponsor', 'patrocinador', 'camiseta', 'comunicado', 'reunion', 'resolucion', 'cargos', 'pliego', 'representante', 'legal', 'gerente', 'tecnico', 'desvinculacion', 'declaraciones', 'condicion', 'durante', 'cuando', 'desde', 'hasta', 'sin', 'dato', ...MESES]);

// Los nombres de persona del texto: secuencias de 2 a 5 palabras con mayúscula inicial que no son meses, cargos ni medios.
export function nombresDe(texto) {
  const out = new Set();
  for (const m of String(texto).matchAll(/[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+(?:de|del|la)\s+|\s+)[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){0,3}/g)) {
    const palabras = m[0].split(/\s+/); if (palabras.filter((p) => !NO_ES_PERSONA.has(norm(p)) && !/^(de|del|la)$/i.test(p)).length >= 2 && !NO_ES_PERSONA.has(norm(palabras[0]))) out.add(m[0]);
  }
  return [...out];
}

function fechaDePagina(html) {
  const patrones = [/property=["']article:published_time["'][^>]*content=["']([^"']+)/i, /content=["']([^"']+)["'][^>]*property=["']article:published_time["']/i, /"datePublished"\s*:\s*"([^"]+)"/i, /<time[^>]*datetime=["']([^"']+)/i, /itemprop=["']datePublished["'][^>]*content=["']([^"']+)/i];
  for (const p of patrones) { const m = html.match(p); if (m) { const f = m[1].match(/(\d{4})-(\d{2})-(\d{2})/); if (f) return f[0]; } }
  const v = htmlATexto(html).match(/Publicad[oa]\s+(?:el\s+)?(\d{1,2})\s+de\s+([a-záéíóú]+)\s+de\s+(\d{4})/i);
  if (v && MESES.includes(norm(v[2]))) return `${v[3]}-${String(MESES.indexOf(norm(v[2])) + 1).padStart(2, '0')}-${v[1].padStart(2, '0')}`;
  return null;
}

export async function verificarUrl(url, nombres = []) {
  const fechaUrl = (url.match(/\/(20\d\d)\/(\d\d)\/(\d\d)\//) || []).slice(1).join('-') || null;
  let res; try { res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; finance-of-sports-verificador)', accept: 'text/html' }, signal: AbortSignal.timeout(12000) }); } catch (e) { return { url, abre: false, motivo: `no se pudo abrir (${e.name === 'TimeoutError' ? 'tiempo' : 'red'})`, fechaUrl }; }
  if (!res.ok) return { url, abre: false, motivo: `no abre (HTTP ${res.status})`, fechaUrl };
  const html = await res.text(); const texto = htmlATexto(html); const t = norm(texto);
  const fechaPagina = fechaDePagina(html);
  const hallados = nombres.map((n) => {
    const apellido = norm(n.split(/\s+/).filter((p) => !/^(de|del|la)$/i.test(p)).slice(-1)[0]); const i = apellido.length >= 4 ? t.indexOf(apellido) : -1;
    return { nombre: n, aparece: i >= 0, frase: i >= 0 ? texto.slice(Math.max(0, i - 90), i + 130).trim() : null };
  });
  const distinta = fechaUrl && fechaPagina && Math.abs(Number(fechaUrl.slice(0, 4)) - Number(fechaPagina.slice(0, 4))) >= 1;
  return { url, abre: true, fechaUrl, fechaPagina, distinta, hallados };
}

export function lineaDe(v) {
  if (!v.abre) return `✗ ${v.motivo}${v.fechaUrl ? ` · fecha en la URL ${v.fechaUrl}` : ''}`;
  const fechas = `${v.fechaUrl ? `URL ${v.fechaUrl}` : 'URL sin fecha'} · ${v.fechaPagina ? `página ${v.fechaPagina}` : 'página sin fecha'}${v.distinta ? ' (¡la página muestra otro año: puede ser la fecha de una actualización!)' : ''}`;
  const con = v.hallados.filter((h) => h.aparece), sin = v.hallados.filter((h) => !h.aparece);
  const marca = v.hallados.length ? (con.length ? '✓' : '✗') : '·';
  return `${marca} abre · ${fechas}${con.length ? `\n         «${con[0].frase}» (${con[0].nombre})` : v.hallados.length ? `\n         ningún nombre del texto aparece en la nota (${sin.map((h) => h.nombre).slice(0, 3).join(', ')})` : ''}`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const A = process.argv.slice(2); const url = A.find((a) => /^https?:/.test(a));
  const nombres = A.flatMap((a, i) => (a === '--nombre' ? [A[i + 1]] : []));
  if (!url) { console.error('Uso: node tools/fos.mjs verificar-url <url> --nombre "Nombre Apellido" [--nombre "Otro"]'); process.exit(1); }
  console.log(lineaDe(await verificarUrl(url, nombres)));
}
