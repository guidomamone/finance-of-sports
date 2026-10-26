#!/usr/bin/env node
// ============================================================================
// tools/segunda-fuente-wikipedia-local.mjs — la SEGUNDA FUENTE de la lista de equipos de una liga-temporada, desde la Wikipedia en el IDIOMA LOCAL del país.
//
// POR QUÉ. La lista de equipos (tools/club-league-reference/<iso>.json) sale de la Wikipedia en inglés. Para las ligas locales, la Wikipedia en el idioma del país
// la escriben otros editores y suele estar más completa; es una segunda mirada sobre el mismo hecho (Guido). La página local se encuentra por los enlaces entre
// idiomas de la página en inglés (la misma temporada de la misma liga), no por búsqueda. Sin IA. Lo que se compara lo dice audit.js (`liga-una-fuente`,
// `liga-fuentes-no-coinciden`); esta tool no asigna ni corrige ninguna liga.
//
// QUÉ GUARDA. En `fuentes` de esa liga-temporada: { tipo: 'wikipedia-local', lang, url, pagina, equipos: [nombres] }. Los nombres son el texto y el título de los
// enlaces de las primeras columnas de las tablas de 5 filas o más (descartando archivos, categorías y plantillas), unidas: una liga en grupos tiene una tabla por
// grupo. COMPUERTA: tiene que dar al menos tantos equipos como la lista en inglés menos dos; si no, no escribe nada y lo dice.
//
// USO:
//   node tools/segunda-fuente-wikipedia-local.mjs <ligaId> <año> --pais <iso2> [--lang <código>] [--escribir]      sin --escribir solo dice qué leyó
// ============================================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const UA = 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)';
// idioma de la Wikipedia local por país (--lang lo cambia)
export const IDIOMA = { gr: 'el', cy: 'el', pt: 'pt', br: 'pt', es: 'es', ar: 'es', cl: 'es', co: 'es', pe: 'es', it: 'it', de: 'de', at: 'de', ch: 'de', fr: 'fr', nl: 'nl', be: 'nl', ru: 'ru', ua: 'uk', tr: 'tr', dk: 'da', no: 'no', se: 'sv', fi: 'fi', ee: 'et', hr: 'hr', cz: 'cs', pl: 'pl', hu: 'hu', ro: 'ro', rs: 'sr', bg: 'bg' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(host, params) {
  const url = `https://${host}.wikipedia.org/w/api.php?${new URLSearchParams({ format: 'json', formatversion: '2', ...params })}`;
  await dormir(1000);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${host}.wikipedia.org respondió ${res.status}`);
  return res.json();
}
const entidades = (s) => s.replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

// Los equipos de una página: por cada tabla `wikitable`, el primer enlace de artículo de cada fila (sin archivos, categorías ni plantillas: el título lleva «:»).
export function equiposDeHtml(html) {
  const tablas = [...html.matchAll(/<table[^>]*class="[^"]*wikitable[^"]*"[\s\S]*?<\/table>/g)].map((m) => m[0]);
  const mejores = tablas.map((t) => {
    const nombres = [];
    for (const fila of t.split(/<tr[\s>]/).slice(1)) {
      const celdas = [...fila.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((m) => m[1]).slice(0, 3); // el equipo está en las primeras columnas
      let hallado = null;
      for (const c of celdas) {
        for (const a of c.matchAll(/<a\s+href="\/wiki\/[^"]+"[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
          const titulo = entidades(a[1]); const texto = entidades(a[2].replace(/<[^>]+>/g, '')).trim();
          if (/:/.test(titulo) || !texto || /^\d+$/.test(texto)) continue; // archivo, categoría, plantilla o un número
          hallado = { titulo, corto: titulo.replace(/\s*\([^)]*\)\s*$/, ''), texto }; break; // `titulo` es el de la página (para su Wikidata); `corto`, sin la desambiguación
        }
        if (hallado) break;
      }
      if (hallado) nombres.push(hallado);
    }
    return nombres;
  });
  // la unión de las tablas de 5 filas o más (una liga en dos grupos tiene una tabla por grupo); los nombres repetidos van una vez
  const vistos = new Set(); const union = [];
  for (const t of mejores.filter((x) => x.length >= 5)) for (const x of t) if (!vistos.has(x.titulo)) { vistos.add(x.titulo); union.push(x); }
  // (los de `mejores` ya traen `corto`)
  return union;
}

// El identificador de Wikidata de cada título de una Wikipedia (propiedad de página `wikibase_item`), de a 40 títulos; sigue las redirecciones y las normalizaciones.
async function qidsDe(host, titulos) {
  const salida = new Map();
  for (let i = 0; i < titulos.length; i += 40) {
    const lote = titulos.slice(i, i + 40);
    const r = await api(host, { action: 'query', prop: 'pageprops', ppprop: 'wikibase_item', titles: lote.join('|'), redirects: '1' });
    const alias = new Map(); for (const x of [...(r.query?.normalized || []), ...(r.query?.redirects || [])]) alias.set(x.from, x.to);
    const final = (t) => { let c = t; for (let k = 0; k < 3 && alias.has(c); k++) c = alias.get(c); return c; };
    const porTitulo = new Map((r.query?.pages || []).map((p) => [p.title, p.pageprops?.wikibase_item || null]));
    for (const t of lote) salida.set(t, porTitulo.get(final(t)) || null);
  }
  return salida;
}
const nrm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
  const [liga, anio] = A.filter((a, i) => !a.startsWith('--') && !['--pais', '--lang'].includes(A[i - 1]));
  const pais = flag('--pais'); const lang = flag('--lang') || IDIOMA[pais];
  const falla = (m) => { console.error(m); process.exit(1); };
  if (!liga || !anio || !pais) falla('Uso: node tools/segunda-fuente-wikipedia-local.mjs <ligaId> <año> --pais <iso2> [--lang <código>] [--escribir]');
  if (!lang) falla(`No sé el idioma de «${pais}»: pasalo con --lang <código>.`);
  const archivo = resolve(REF, `${pais}.json`); if (!existsSync(archivo)) falla(`No existe ${archivo}`);
  const C = JSON.parse(readFileSync(archivo, 'utf8')); const e = C.leagues?.[liga]?.[anio];
  if (!e) falla(`La caché de ${pais} no tiene ${liga} ${anio}.`);
  if (lang === (e.lang || 'en')) falla('La página de la lista ya está en ese idioma: no es una segunda mirada.');
  const ll = await api(e.lang || 'en', { action: 'query', prop: 'langlinks', titles: e.wikipediaPage, lllang: lang, redirects: '1' });
  const local = ll.query?.pages?.[0]?.langlinks?.[0]?.title;
  if (!local) falla(`«${e.wikipediaPage}» no tiene versión en «${lang}» (enlaces entre idiomas): no hay segunda fuente por este camino.`);
  const p = await api(lang, { action: 'parse', page: local, prop: 'text', redirects: '1' });
  const equipos = equiposDeHtml(p.parse?.text || '');
  // la MISMA página en inglés: sus equipos, para unir las dos listas por su identificador de Wikidata y no por el nombre (el griego o el cirílico no se pueden comparar por letras)
  const pe = await api(e.lang || 'en', { action: 'parse', page: e.wikipediaPage, prop: 'text', redirects: '1' });
  const enItems = equiposDeHtml(pe.parse?.text || '');
  const qLocal = await qidsDe(lang, equipos.map((x) => x.titulo)); const qEn = await qidsDe(e.lang || 'en', enItems.map((x) => x.titulo));
  // el nombre de la lista en inglés → su Q: el nombre igual al texto o al título del enlace; si no, un único enlace que lo tenga como prefijo de palabras enteras («Lommel» y «Lommel SK»)
  const qidDeClub = (nombre) => {
    const c = nrm(nombre); const nom = (i) => [nrm(i.texto), nrm(i.titulo), nrm(i.corto)];
    let x = enItems.find((i) => nom(i).includes(c));
    if (!x) { const pref = enItems.filter((i) => nom(i).some((s) => s.startsWith(`${c} `) || c.startsWith(`${s} `))); if (pref.length === 1) x = pref[0]; }
    return x ? qEn.get(x.titulo) : null;
  };
  const enPorQid = new Map(); for (const nombre of e.clubs || []) { const q = qidDeClub(nombre); if (q) enPorQid.set(q, nombre); }
  const qidsLocales = new Set(equipos.map((x) => qLocal.get(x.titulo)).filter(Boolean));
  const coinciden = [...enPorQid.keys()].filter((q) => qidsLocales.has(q)).length;
  const sinPar = (e.clubs || []).filter((n) => !enPorQid.has(qidDeClub(n)) || !qidsLocales.has(qidDeClub(n)));
  const minimo = (e.clubs || []).length - 2;
  if (A.includes('--detalle')) { console.log('en:', enItems.map((x) => `${x.texto}|${x.titulo}|${qEn.get(x.titulo)}`).join(' ; ')); console.log('local:', equipos.map((x) => `${x.texto}|${x.titulo}|${qLocal.get(x.titulo)}`).join(' ; ')); }
  console.log(`${liga} ${anio}: «${local}» (${lang}.wikipedia.org): ${equipos.length} equipos; ${coinciden} de los ${(e.clubs || []).length} de la lista en inglés están también en la local (por Wikidata)`);
  console.log(`  local: ${equipos.map((x) => x.texto).join(', ')}`);
  if (sinPar.length) console.log(`  de la lista en inglés sin par en la local: ${sinPar.join(', ')}`);
  if (coinciden < minimo) falla(`Compuerta: coinciden ${coinciden}, menos que ${minimo}; no se escribe nada.`);
  if (!A.includes('--escribir')) { console.log('Ensayo: no se escribió nada (--escribir).'); process.exit(0); }
  const url = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(local.replace(/ /g, '_'))}`;
  const resto = (e.fuentes && e.fuentes.length ? e.fuentes : [{ tipo: 'wikipedia', url: `https://${e.lang || 'en'}.wikipedia.org/wiki/${encodeURIComponent(e.wikipediaPage.replace(/ /g, '_'))}` }]).filter((x) => x.tipo !== 'wikipedia-local');
  // los nombres guardados: los de la lista en inglés de los equipos que están en las dos (así el auditor los compara como cualquier otra fuente) y los locales
  const nombres = equipos.flatMap((x) => { const q = qLocal.get(x.titulo); return [x.texto, x.corto, ...(q && enPorQid.has(q) ? [enPorQid.get(q)] : [])]; });
  e.fuentes = [...resto, { tipo: 'wikipedia-local', lang, url, pagina: local, equipos: [...new Set(nombres)] }];
  writeFileSync(archivo, JSON.stringify(C, null, 2) + '\n');
  console.log('Guardada en la caché.');
}
