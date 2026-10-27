#!/usr/bin/env node
// ============================================================================
// tools/color-candidatos.mjs — los colores CANDIDATOS de un club cuando footylogos no lo tiene (`lookup-brand-color.js` dice «Sin coincidencias»): la capa 1 de `club-or-year-onboarding/club-nuevo.md` («¿de qué color es el club?»)
// hecha por programa. NO decide el `brandColor`: lo elige la sesión con las reglas de club-nuevo.md (bicolor, blanco, no retocar el hex) y lo anota en Admin/sourcing/<País>/<Club>.md.
// QUÉ HACE. 1) Busca el artículo del club en la Wikipedia del idioma del país (la API de búsqueda, gratis) y lee del infobox `Colores` (con el hex de los cuadros) y el apodo; 2) con --gemini le pregunta a Gemini con búsqueda
// de Google de qué color es la camiseta local y cuál predomina, citando fuentes (unos US$ 0,02; queda en Admin/registros/api/gemini-busqueda.jsonl). El infobox da la identidad y el hex; Gemini desempata el orden y trae la camiseta.
// PROBADO con Orsomarso, Atlético Huila, Barranquilla FC y Bogotá FC: el infobox dio hex para Huila (#FFE900, #009846) y Bogotá (#FFE900, #FF0000); Orsomarso y Barranquilla no lo traen y salen de Gemini y del apodo («Los Blanquiazules»,
// «Los Rojos de Curramba»). Exa encontró las páginas oficiales pero no hace falta para esto; Firecrawl no está configurado.
// USO: node tools/color-candidatos.mjs "<Club>" [--lang es|pt|en|it] [--pagina "<título exacto>"] [--gemini]
// ============================================================================
import { readFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const v = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
const nombre = A.find((a, i) => !a.startsWith('--') && !['--lang', '--pagina'].includes(A[i - 1]));
if (!nombre) { console.error('Uso: node tools/color-candidatos.mjs "<Club>" [--lang es] [--pagina "<título>"] [--gemini]'); process.exit(1); }
const lang = v('--lang') || 'es';
const UA = { 'user-agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' };
const api = async (params) => (await fetch(`https://${lang}.wikipedia.org/w/api.php?format=json&${new URLSearchParams(params)}`, { headers: UA })).json();

// 1) el artículo: el título dado, o el mejor resultado de buscar «<club> club de fútbol»
let titulo = v('--pagina');
if (!titulo) {
  const s = await api({ action: 'query', list: 'search', srsearch: `${nombre} club de fútbol`, srlimit: '5' });
  const lista = (s.query?.search || []).map((x) => x.title);
  console.log(`Artículos encontrados en ${lang}.wikipedia: ${lista.join(' | ') || 'ninguno'}`);
  titulo = lista[0];
}
if (titulo) {
  const j = await api({ action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main', redirects: '1', titles: titulo });
  const p = Object.values(j.query?.pages || {})[0]; const t = p?.revisions?.[0]?.slots?.main?.['*'] || '';
  const linea = (re) => t.split('\n').filter((l) => re.test(l)).slice(0, 2).map((l) => l.replace(/<ref[^>]*>.*?<\/ref>/g, '').replace(/\{\{Cuadro color\|(#[0-9A-Fa-f]{3,6})\}\}/g, '$1 ').trim().slice(0, 200));
  console.log(`\nWikipedia (${lang}) «${p?.title}»:`);
  console.log(`  colores: ${linea(/^\|\s*(colores|colours?|colors?|cores)\s*=/i).join(' ; ') || '(el infobox no trae colores)'}`);
  console.log(`  apodo:   ${linea(/^\|\s*(apodos?|nickname)/i).join(' ; ') || '(sin apodo)'}`);
  console.log(`  https://${lang}.wikipedia.org/wiki/${encodeURIComponent(String(p?.title || titulo).replace(/ /g, '_'))}`);
}
// 2) Gemini con búsqueda de Google: la camiseta local y cuál predomina (opcional)
if (A.includes('--gemini')) {
  const clave = readFileSync(resolve(ROOT, 'Admin/api-keys/gemini.env'), 'utf8').split('\n').find((l) => l.startsWith('GEMINI_API_KEY='))?.slice(15).trim();
  if (!clave) { console.error('Falta GEMINI_API_KEY en Admin/api-keys/gemini.env'); process.exit(1); }
  const modelo = 'gemini-3.8-flash';
  const pregunta = `Club de fútbol «${nombre}». ¿De qué colores es su camiseta local actual y su escudo, y cuál predomina? ¿Hubo cambios históricos de color? Respondé en 4 líneas como máximo, con los colores en orden de predominio en la camiseta local. Citá las fuentes; si no hay fuente, decí «sin fuente».`;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${clave}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: pregunta }] }], tools: [{ google_search: {} }] }) });
  const j = await r.json(); if (!r.ok) { console.error(`Gemini devolvió ${r.status}: ${JSON.stringify(j).slice(0, 200)}`); process.exit(1); }
  const c = j.candidates?.[0]; const g = c?.groundingMetadata;
  appendFileSync(resolve(ROOT, 'Admin/registros/api/gemini-busqueda.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'color-candidatos', club: nombre, modelo, busquedas: (g?.webSearchQueries || []).length, tokens: j.usageMetadata }) + '\n');
  console.log(`\nGemini con búsqueda de Google (${(g?.webSearchQueries || []).length} búsquedas):\n${(c?.content?.parts || []).map((x) => x.text).join('').trim()}`);
  console.log(`  fuentes: ${(g?.groundingChunks || []).slice(0, 4).map((x) => x.web?.title).filter(Boolean).join(' | ') || '(ninguna)'}`);
}
console.log('\nNo decide el brandColor: identidad primero, el hex solo si cae en esa familia, bicolor y blanco por las reglas de club-or-year-onboarding/club-nuevo.md.');
