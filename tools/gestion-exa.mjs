// tools/gestion-exa.mjs — las gestiones (presidentes) que le faltan a un club, buscadas en prensa fechada: Gemini con búsqueda de Google (por defecto; el mismo comando sirve para un club de SIIS y uno que no) y, con --exa, las notas de Exa.
// (El nombre del archivo es el de la primera versión, que solo usaba Exa.)
// POR QUÉ. Una gestión sin fuente fechada no se muestra (`confirmada:false`) y la cola pregunta «¿quién condujo el club en AAAA?» por cada ejercicio sin cobertura. El subagente de gestiones buscaba a mano, con navegador, y las fuentes
// débiles (Wikipedia sin fecha) quedaban sin confirmar. Exa trae la nota de prensa con su fecha de publicación (renuncias y nombramientos), así que cada hueco sale con candidatos citables.
// QUÉ HACE. Lee data/gestiones/<iso>.js y los ejercicios del club (data/<iso>/<clubId>.json, o --anios AAAA-AAAA si todavía no está cargado), marca los cierres que ninguna gestión CONFIRMADA cubre, le pregunta a Gemini por esos
// cierres y ABRE cada nota que citó para ver qué dice de verdad (tools/gestion-evidencia.mjs). NO escribe data/gestiones ni decide `confirmada`: la sesión o el subagente elige la fuente y la carga con su fecha.
// LO QUE IMPRIME:
//   - las gestiones cargadas, el estado de cada cierre y los NOMBRES DEL CLUB con que se busca (el actual y los anteriores: --alias, si no data/club-aliases.js y los nombres que ya figuran en las fuentes de las gestiones).
//   - por afirmación de Gemini con fuente, cada nota: «abre · URL <fecha> · página <publicada> [· modificada <fecha>] [(posible actualización: …) | (distinta de la URL)] · club en la nota: <nombre con que salió>»
//     (posible actualización: la URL trae otra fecha y la de página es posterior en más de 30 días a la última fecha que mencionan los párrafos de la persona; sin fecha en la URL solo se imprimen las de la página).
//   - por persona y nota, TRES cosas separadas: «✓ nombra (completo | nombre y apellido | apellidos | solo el apellido)», «cargo: presidente | presidente ejecutivo | gerente | director ejecutivo | dueño | accionista mayoritario…»
//     (y «cerca también: …» si hay otro cargo a mano: gerente y presidente se confunden) y «fecha: asumió | dejó <AAAA-MM-DD o AAAA-MM (solo mes)>» si la misma frase o párrafo lo fecha; debajo, la frase más corta del cuerpo
//     que tiene el nombre Y el cargo (nunca el título de la página), o «sin frase con el cargo».
//   - «✗ no abrible (red social)»: x.com, twitter.com, t.co y otras que dan 402/403 no se intentan abrir y no cuentan como evidencia.
//   - CONCLUSIÓN por persona y cierre sin cobertura (determinista, según ARQUITECTURA «GESTIONES»; solo salida): «sin nota de inicio: cargar confirmada:false», «sin nota de salida: cargar confirmada:false» o
//     «inicio y fin fechados: confirmada:true posible», con desde/hasta (un mes solo se fija al día 01 o al último día; si el cierre cae en ese mes no sirve). Solo cuentan fechas de notas abiertas y fechadas con un cargo presidencial.
// Con --exa: además las notas de Exa (nombramiento y renuncia por año y por cada nombre del club; ~US$ 0,007 por consulta, en Admin/registros/api/exa.jsonl), sin abrir.
// USO: node tools/fos.mjs gestion-exa <clubId> [--nombre "Club"] [--alias "Nombre anterior|Otro"] [--anios 2016-2025 | "2016, 2017, 2019"] [--anio AAAA] [--resumen] [--exa]
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import vm from 'node:vm';
import { nombresDe } from './verificar-fuente-web.mjs';
import { abrirNota, lineasDe, conclusion, noAbrible, normL, esPersona } from './gestion-evidencia.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const v = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
const clubId = A.find((a, i) => !a.startsWith('--') && !['--nombre', '--anios', '--anio', '--alias'].includes(A[i - 1]));
if (!clubId || !/-[a-z]{2}$/.test(clubId)) { console.error('Uso: node tools/fos.mjs gestion-exa <clubId> [--nombre "Club"] [--alias "Nombre anterior|Otro"] [--anios 2016-2025] [--anio AAAA]'); process.exit(1); }
const iso = clubId.split('-').pop();
const RESUMEN = A.includes('--resumen'); // solo las afirmaciones del modelo que traen una fuente real de la búsqueda, sin el texto entero

// las gestiones del club: el archivo es un script de navegador (window.CLUB_GESTIONES)
const archivo = join(ROOT, 'data', 'gestiones', `${iso}.js`); const win = {};
if (existsSync(archivo)) vm.runInNewContext(readFileSync(archivo, 'utf8'), { window: win });
const gestiones = (win.CLUB_GESTIONES || {})[clubId] || [];

// los cierres de ejercicio: los del JSON del club o un rango de años (cierre supuesto al 31-12)
const rutaJson = join(ROOT, 'data', iso, `${clubId}.json`); let cierres = [];
if (v('--anios')) { // un rango «2016-2025» o una lista «2016, 2017, 2019»
  const lista = v('--anios').split(/[,\s]+/).filter(Boolean); const [a, b] = lista.length === 1 ? lista[0].split('-').map(Number) : [null, null];
  for (const y of a ? Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i) : lista.map(Number)) cierres.push({ anio: y, cierre: `${y}-12-31` });
}
else if (existsSync(rutaJson)) cierres = (JSON.parse(readFileSync(rutaJson, 'utf8')).years || []).map((y) => ({ anio: y.fiscal_year, cierre: y.period_end || `${y.fiscal_year}-12-31` }));
else { console.error(`No existe ${rutaJson.slice(ROOT.length + 1)}: pasá --anios AAAA-AAAA.`); process.exit(1); }
if (v('--anio')) cierres = cierres.filter((c) => String(c.anio) === v('--anio'));

const cubre = (g, f) => g.desde <= f && (!g.hasta || f <= g.hasta);
const estado = (c) => (gestiones.some((g) => g.confirmada && cubre(g, c.cierre)) ? 'confirmada' : gestiones.some((g) => cubre(g, c.cierre)) ? 'sin confirmar' : 'sin gestión');
console.log(`${clubId}: ${gestiones.length} gestión(es) en data/gestiones/${iso}.js`);
for (const g of gestiones) console.log(`  ${g.desde} a ${g.hasta || 'hoy'}  ${g.nombre}  ${g.confirmada ? 'confirmada' : 'SIN CONFIRMAR'}`);
const huecos = cierres.filter((c) => estado(c) !== 'confirmada');
console.log(`Cierres: ${cierres.map((c) => `${c.anio} ${estado(c)}`).join(' · ')}`);
if (!huecos.length) { console.log('Ningún cierre sin cobertura confirmada: nada que buscar.'); process.exit(0); }

const nombre = v('--nombre') || (existsSync(rutaJson) && JSON.parse(readFileSync(rutaJson, 'utf8')).club?.display_name) || clubId.replace(/-[a-z]{2}$/, '');
// LOS OTROS NOMBRES DEL CLUB (Real Santander jugó 2019 y 2020 como «Real San Andrés»): --alias, o los ids viejos de data/club-aliases.js y los nombres que ya figuran en las fuentes de sus gestiones
// (una URL cuyo último tramo es el nombre, como dimayor.com.co/real-san-andres-2/, o una frase con mayúsculas que empieza con la primera palabra del nombre actual).
function aliasDelClub() {
  if (v('--alias')) return v('--alias').split('|').map((s) => s.trim()).filter(Boolean);
  const out = new Set(); const base = clubId.replace(/-[a-z]{2}$/, ''); const primera = normL(nombre).split(/\s+/)[0];
  const rutaA = join(ROOT, 'data', 'club-aliases.js'); const w = {};
  if (existsSync(rutaA)) { vm.runInNewContext(readFileSync(rutaA, 'utf8'), { window: w }); for (const [k, x] of Object.entries(w.CLUB_ALIASES || {})) if (x === clubId && k !== base) out.add(k); }
  const titulo = (s) => s.split(/\s+/).map((p) => (/^(de|del|la)$/.test(p) ? p : p[0].toUpperCase() + p.slice(1))).join(' ');
  for (const g of gestiones) {
    for (const u of String(g.fuente || '').match(/https?:\/\/\S+/g) || []) { const seg = u.replace(/[).,;]+$/, '').replace(/\/$/, '').split('/').pop().replace(/-\d+$/, '');
      if (new RegExp(`^${primera}(-[a-z]+){1,3}$`).test(seg)) out.add(titulo(seg.replace(/-/g, ' '))); }
    for (const m of String(g.fuente || '').replace(/https?:\/\/\S+/g, ' ').matchAll(/\b([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+(?:de\s+|del\s+)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,3})/g)) if (normL(m[1]).split(/\s+/)[0] === primera) out.add(m[1]);
  }
  return [...out].filter((a) => normL(a) !== normL(nombre) && !normL(a).startsWith(`${normL(nombre)} `));
}
const alias = aliasDelClub(); const nombresClub = [nombre, ...alias];
console.log(`Nombres del club con que se busca: ${nombre}${alias.length ? ` · anteriores u otros: ${alias.join(' · ')}` : ' (ningún nombre anterior conocido; --alias "Nombre anterior" para sumar uno)'}`);

// GEMINI CON BÚSQUEDA DE GOOGLE (lo que va por defecto): una consulta por club con todos sus huecos; el modelo busca en Google las veces que haga falta (nombramientos, renuncias, muertes) y devuelve el texto con las fuentes de la búsqueda.
// OJO: las URLs que el modelo ESCRIBE en el texto pueden ser inventadas (una dio 404); las que valen son las de `groundingChunks` (las que de verdad encontró la búsqueda), que acá se resuelven a su URL final y se asocian a cada afirmación.
// Y aun esas pueden no decir lo que el modelo afirma (gerente contado como presidente, una nota que solo nombra a la persona): por eso cada una se abre y se separa nombra / cargo / fecha.
// Costo: ~US$ 0,014 a 0,035 por consulta de búsqueda más unos centavos de tokens; cada llamada queda en Admin/registros/api/gemini-busqueda.jsonl.
async function gemini() {
  const claveG = readFileSync(join(ROOT, 'Admin/api-keys/gemini.env'), 'utf8').split('\n').find((l) => l.startsWith('GEMINI_API_KEY='))?.slice(15).trim();
  if (!claveG) { console.error('Falta GEMINI_API_KEY en Admin/api-keys/gemini.env'); return; }
  const modelo = 'gemini-3.8-flash'; const anios = huecos.map((c) => c.anio).join(', ');
  const conocidas = gestiones.map((g) => `${g.nombre} (${g.desde} a ${g.hasta || 'hoy'}, ${g.confirmada ? 'confirmada' : 'sin confirmar'})`).join('; ') || 'ninguna';
  const otros = alias.length ? ` El club también se llamó o jugó como: ${alias.map((a) => `«${a}»`).join(', ')}; buscá también con esos nombres y decí con qué nombre del club sale cada nota.` : '';
  const pregunta = `Club de fútbol «${nombre}» (país ${iso.toUpperCase()}; id ${clubId}).${otros} Para cada uno de estos cierres de ejercicio (31 de diciembre): ${anios}, ¿quién presidía el club (o, si es una sociedad sin presidente, quién era su dueño o gerente)? Decí el cargo exacto con las palabras de la nota (presidente, presidente ejecutivo, gerente, director ejecutivo, dueño, accionista mayoritario) y no lo cambies: un gerente no es el presidente. Decí cuándo asumió y cuándo dejó el cargo cada persona (nombramiento, renuncia, muerte, reemplazo), con la fecha de cada nota de prensa. Distinguí al padre del hijo si comparten nombre. Gestiones que ya tenemos (verificalas, no las repitas sin fuente): ${conocidas}. Respondé corto y solo con lo que las notas dicen; lo que ninguna nota fecha, decilo como sin fecha.`;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${claveG}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: pregunta }] }], tools: [{ google_search: {} }] }) });
  const j = await r.json(); if (!r.ok) { console.log(`Gemini devolvió ${r.status}: ${JSON.stringify(j).slice(0, 200)}`); return; }
  const c = j.candidates?.[0]; const g = c?.groundingMetadata; const chunks = g?.groundingChunks || [];
  appendFileSync(join(ROOT, 'Admin/registros/api/gemini-busqueda.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'gestion-exa', clubId, modelo, anios, busquedas: (g?.webSearchQueries || []).length, tokens: j.usageMetadata }) + '\n');
  const finales = await Promise.all(chunks.map(async (x) => { try { return (await fetch(x.web.uri, { redirect: 'manual' })).headers.get('location') || x.web.uri; } catch { return x.web.uri; } }));
  const conFuente = (g?.groundingSupports || []).filter((s) => (s.groundingChunkIndices || []).length && String(s.segment?.text || '').replace(/[\s*#\-:.]/g, '').length > 25);
  console.log(`\n=== GEMINI CON BÚSQUEDA DE GOOGLE (${(g?.webSearchQueries || []).length} búsquedas, ${conFuente.length} afirmaciones con fuente) ===`);
  if (!RESUMEN) console.log((c?.content?.parts || []).map((p) => p.text).join(''));
  console.log(`\nAFIRMACIONES CON SU FUENTE REAL${RESUMEN ? ' (solo las que tienen fuente; lo demás del texto del modelo se descarta)' : ' (las URLs del texto de arriba NO sirven: usá estas)'}:`);
  // cada URL citada se abre (salvo las redes sociales) y se mira, por persona, si la nombra, con qué cargo y si fecha su inicio o su fin (tools/gestion-evidencia.mjs): una afirmación puede decir más que su nota.
  // Se buscan los nombres de las afirmaciones que la citan y, además, los de las gestiones cargadas (esos solo se imprimen si aparecen).
  const porUrl = new Map(); const deGestiones = new Set(gestiones.map((x) => x.nombre));
  for (const s of conFuente) for (const u of new Set(s.groundingChunkIndices.map((i) => finales[i]).filter(Boolean))) { const e = porUrl.get(u) || new Set(); for (const n of nombresDe(s.segment.text).filter(esPersona)) e.add(n); porUrl.set(u, e); }
  const soloSiNombra = (u) => new Set([...deGestiones].filter((n) => !porUrl.get(u).has(n)));
  const notas = new Map(); const urls = [...porUrl.keys()];
  for (let i = 0; i < urls.length; i += 6) await Promise.all(urls.slice(i, i + 6).map(async (u) => notas.set(u, await abrirNota(u, [...new Set([...porUrl.get(u), ...deGestiones])], nombresClub))));
  for (const s of conFuente) {
    console.log(`  «${String(s.segment.text).replace(/\s+/g, ' ').replace(/\*+/g, '').slice(0, RESUMEN ? 260 : 170)}»`);
    for (const u of new Set(s.groundingChunkIndices.map((i) => finales[i]).filter(Boolean))) console.log(`     <- ${u}\n${lineasDe(notas.get(u), { soloSiNombra: soloSiNombra(u) }).map((l) => `        ${l}`).join('\n')}`);
  }
  console.log('\n  Por persona: «✓ nombra» = el nombre está en el cuerpo de la nota (no en el título ni en el menú) · «cargo» = el que dice la frase más corta con el nombre y el cargo (sin esa frase: «sin frase con el cargo») ·'
    + '\n  «fecha: asumió/dejó» = la misma frase o párrafo fecha el inicio o el fin. ✗ no abre, no la nombra o es red social: NO sirve de fuente.');
  console.log('\nCONCLUSIÓN POR PERSONA Y CIERRE SIN COBERTURA (regla de Admin/ARQUITECTURA.md, GESTIONES; solo salida: carga y confirmada los decide la sesión):');
  for (const l of conclusion([...notas.values()], huecos, gestiones)) console.log(l);
}
await gemini();
if (!A.includes('--exa')) { console.log('\nLa sesión elige la nota que dice CUÁNDO asumió o dejó el cargo (la de «fecha:» con un cargo presidencial) y la carga en data/gestiones/' + iso + '.js con confirmada:true y esa URL (la real de arriba); lo que ninguna nota fecha queda confirmada:false. Con --exa se suman las notas de Exa (más homónimos).'); process.exit(0); }

const clave = readFileSync(join(ROOT, 'Admin/api-keys/exa.env'), 'utf8').split('\n').find((l) => l.startsWith('EXA_API_KEY='))?.slice(12).trim();
if (!clave) { console.error('Falta EXA_API_KEY en Admin/api-keys/exa.env'); process.exit(1); }
async function buscar(query, anio) {
  const res = await fetch('https://api.exa.ai/search', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': clave }, body: JSON.stringify({ query, type: 'auto', numResults: 6, contents: { text: { maxCharacters: 400 } } }) });
  if (!res.ok) { console.log(`  Exa devolvió ${res.status} para «${query}»`); return []; }
  const j = await res.json(); appendFileSync(join(ROOT, 'Admin/registros/api/exa.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'gestion-exa', clubId, anio, costUsd: j.costDollars?.total ?? null }) + '\n');
  return j.results || [];
}
// las notas de Exa NO se abren: son pistas (título y extracto); una red social se marca y no cuenta. Cada consulta se repite con cada nombre del club, y la línea dice con cuál salió.
const linea = (r, club) => `  - ${(r.publishedDate || 's/f').slice(0, 10)} · ${r.url}${noAbrible(r.url) ? ' · ✗ no abrible (red social): no cuenta como evidencia' : ''}${nombresClub.length > 1 ? ` · buscada como «${club}»` : ''}\n      ${String(r.title || '').slice(0, 110)} :: ${String(r.text || '').replace(/\s+/g, ' ').slice(0, 200)}`;
console.log(`\nLISTA DE PRESIDENTES (pista, sin fecha de publicación):`);
for (const r of (await buscar(`Anexo presidentes del ${nombre}`, null)).filter((x) => /wikipedia/.test(x.url)).slice(0, 2)) console.log(linea(r, nombre));
for (const c of huecos) {
  console.log(`\n=== ${c.anio} (cierre ${c.cierre}): ${estado(c)} ===`);
  for (const club of nombresClub) for (const q of [`${club} nuevo presidente ${c.anio}`, `${club} presidente renunció ${c.anio}`]) {
    const rs = (await buscar(q, c.anio)).filter((r) => r.publishedDate && Math.abs(Number(r.publishedDate.slice(0, 4)) - c.anio) <= 1);
    console.log(` «${q}»${rs.length ? '' : ': nada con fecha de ese año'}`); for (const r of rs) console.log(linea(r, club));
  }
}
console.log('\nLa sesión elige la nota que dice CUÁNDO asumió o dejó el cargo y la carga en data/gestiones/' + iso + '.js con confirmada:true y esa URL; lo que ninguna nota fecha queda confirmada:false.');
