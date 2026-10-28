// tools/sponsor-fka.mjs — los sponsors débiles o sin dato de un club, para verificarlos en Football Kit Archive (FKA), y el registro de lo verificado.
// POR QUÉ. Un sponsor de camiseta que llega de una sola base de aficionados (FKA leída por el resumen de una búsqueda) o que quedó `sin-fuente` no se da por confirmado, y FKA da 403 a las tools y a los subagentes y pone una
// verificación anti-bots y un anuncio («View a short ad») en el navegador: ninguno se abre a mano. La ficha se lee con Exa, que la tiene indexada; lo que Exa no trae se anota con --sin-ficha.
// `club-siis` lista estos años en el estado de cada club y al final de `--avanzar`, para que el paso no dependa de que alguien se acuerde. Débil = el sponsor tiene `sin-fuente.sponsor`, o su `fuente` nombra solo el resumen de una búsqueda de
// FKA («403», «resumen de la búsqueda», «una sola fuente», «débil»); deja de serlo cuando hay una línea en Admin/registros/sponsor-fka.jsonl.
// USO:
//   node tools/sponsor-fka.mjs <clubId>                         los años débiles del club y qué hacer (solo lee)
//   node tools/sponsor-fka.mjs <clubId> --buscar [--nombre "<Club>"] [--anio AAAA | --anios 2015-2022 | --todos]   busca esos años en FKA con Exa (programático, ~US$ 0,007 por año, anotado en Admin/registros/api/exa.jsonl) e imprime lo que dice cada ficha
//   node tools/sponsor-fka.mjs --registrar --club <clubId> --anio AAAA --url <ficha de FKA> --sponsor "<lo que dice FKA del frente>" [--distinto]
//                                                               anota la verificación; --distinto si FKA dice otro sponsor que contexto-manual.json (hay que corregirlo a mano)
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const REGISTRO = join(ROOT, 'Admin/registros/sponsor-fka.jsonl');
const DEBIL = /Football Kit Archive.*(403|resumen de la búsqueda)|una sola (fuente|base)|\bdébil\b/i;

const verificados = () => new Set(existsSync(REGISTRO) ? readFileSync(REGISTRO, 'utf8').split('\n').filter(Boolean).map((l) => { try { const j = JSON.parse(l); return `${j.clubId}|${j.anio}`; } catch { return null; } }) : []);

// los años del club con un sponsor débil o sin dato que todavía no se verificaron en FKA
export function debiles(clubId) {
  const ctx = JSON.parse(readFileSync(join(ROOT, 'tools/contexto-manual.json'), 'utf8'))[clubId] || {}; const ya = verificados();
  return Object.entries(ctx).filter(([a, m]) => /^\d{4}$/.test(a) && !ya.has(`${clubId}|${a}`) && (m?.['sin-fuente']?.sponsor || (m?.sponsor && DEBIL.test(m.fuente || '')))).map(([a, m]) => ({ anio: a, sponsor: m.sponsor || null, sinDato: !!m?.['sin-fuente']?.sponsor }));
}

// Los años que busca --buscar: sin opción, los débiles (como siempre); `--anios 2015-2022` (o `2015,2017-2019`) esos años, y `--todos` todos los años de contexto-manual.json del club. No escribe nada: un año sólido se busca
// para verificarlo en FKA sin tocar contexto-manual.json (antes había que escribirle «una sola fuente por año» para que corriera). Sin respuestas ya registradas en Admin/registros/sponsor-fka.jsonl se vuelve a buscar igual: cuesta ~US$ 0,007 por año.
export function aniosABuscar({ debilesAnios, todosAnios, anios = null, todos = false, soloAnio = null }) {
  if (todos) return [...todosAnios].sort();
  if (anios) {
    const out = new Set();
    for (const parte of String(anios).split(',').map((x) => x.trim()).filter(Boolean)) {
      const m = parte.match(/^(\d{4})(?:-(\d{4}))?$/); if (!m) throw new Error(`--anios: «${parte}» no es AAAA ni AAAA-AAAA`);
      const [a, b] = [Number(m[1]), Number(m[2] || m[1])]; if (b < a) throw new Error(`--anios: «${parte}» va al revés`);
      for (let y = a; y <= b; y++) out.add(String(y));
    }
    return [...out].sort();
  }
  return debilesAnios.filter((a) => !soloAnio || a === soloAnio);
}

// el texto del paso fijo, para imprimir
export function pasoFka(clubId, nombre) {
  const d = debiles(clubId); if (!d.length) return null;
  return `SPONSOR DÉBIL O SIN DATO (${d.map((x) => `${x.anio}${x.sinDato ? ' sin dato' : ` ${x.sponsor}`}`).join(', ')}): paso fijo, verificarlo en Football Kit Archive.\n`
    + `   1) Con Exa (programático, ~US$ 0,007 por año; trae las fichas de FKA con su campo Sponsor, sin el cartel del anuncio): node tools/sponsor-fka.mjs ${clubId} --buscar --nombre "${nombre}". No trae todos los años.\n`
    + `   2) Los años que Exa no trae: otro nombre del club (--nombre "A|B", separados por «|») y, si ninguno trae la ficha, anotarlo sin ficha: node tools/sponsor-fka.mjs --registrar --club ${clubId} --anio AAAA --sin-ficha "<qué se probó>". FKA no se abre a mano: da 403 a las tools y pone un anuncio («View a short ad») que no se clickea.\n`
    + `   Por cada año: node tools/sponsor-fka.mjs --registrar --club ${clubId} --anio AAAA --url <ficha> --sponsor "<lo que dice>" [--distinto si no coincide: corregir tools/contexto-manual.json con esa fuente, clase base-camisetas]`;
}

// El texto de una ficha de FKA según Exa viene en dos formatos: una tabla de markdown («| Sponsor | Cotrafa |») o rótulo y valor en renglones sueltos (Brand, y el valor siguiente: marca y sponsor, el sponsor sin rótulo).
export function leerFicha(t) {
  const celda = (k) => t.match(new RegExp(`\\|\\s*${k}\\s*\\|\\s*([^|\\n]+?)\\s*\\|`))?.[1];
  if (/\|\s*Team\s*\|/.test(t)) return { sponsor: celda('Sponsor') || 'sin campo Sponsor', marca: celda('Brand') || '?', liga: celda('League') || '?' };
  const b = t.match(/\n\s*Brand\s*\n+([\s\S]*?)\n\s*(?:Competitions|League|Rating|Added)\b/);
  if (!b) return { sponsor: 'no se pudo leer la ficha', marca: '?', liga: '?' };
  const v = b[1].split(/\n+/).map((x) => x.trim()).filter(Boolean);
  const s = v[1] === 'Sponsor' ? v[2] : v[1]; // con rótulo («Sponsor» y el valor debajo) o sin él (el valor suelto detrás de la marca)
  return { sponsor: s && !/^(?:categor|copa|liga|league|cup|primera|division|\d)/i.test(s) ? s : 'sin campo Sponsor', marca: v[0] || '?', liga: t.match(/\n\s*Competitions\s*\n+\s*([^\n]+)/)?.[1].trim() || '?' };
}

// Búsqueda programática con Exa (tools/exa-search.mjs, Admin/api-keys/exa.env): Exa tiene indexadas las fichas de camisetas de FKA (`<club>-<año>-home-kit`) con su tabla «| Sponsor |» y «| Brand |», sin el cartel de «View a short ad»; también oldfootballshirts.com.
// Una consulta por año débil (centavos; cada una se anota en Admin/registros/api/exa.jsonl). Imprime lo que encontró por año y el comando para registrarlo; la sesión decide (el sponsor de la ficha es el de la camiseta local de esa temporada).
async function buscarConExa(clubId, nombre, soloAnio, { anios = null, todos = false } = {}) {
  const clave = readFileSync(join(ROOT, 'Admin/api-keys/exa.env'), 'utf8').split('\n').find((l) => l.startsWith('EXA_API_KEY='))?.slice(12).trim();
  if (!clave) throw new Error('Falta EXA_API_KEY en Admin/api-keys/exa.env');
  // --nombre admite varios nombres del club separados por «|» (Alianza FC fue «Alianza Petrolera» y «Alianza Valledupar»): cada uno es un slug válido y una consulta
  const nombres = nombre.split('|').map((x) => x.trim()).filter(Boolean); const aSlug = (n) => n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); const slugs = nombres.map(aSlug);
  const ctxClub = JSON.parse(readFileSync(join(ROOT, 'tools/contexto-manual.json'), 'utf8'))[clubId] || {};
  const lista = aniosABuscar({ debilesAnios: debiles(clubId).map((d) => d.anio), todosAnios: Object.keys(ctxClub).filter((a) => /^\d{4}$/.test(a)), anios, todos, soloAnio });
  if (!lista.length) console.log(`${clubId}: ningún año para buscar (ninguno débil; --anios 2015-2022 o --todos buscan también los sólidos, sin tocar contexto-manual.json).`);
  for (const anio of lista) {
    const hallazgos = []; const vistas = new Set();
    // se prueban consultas distintas hasta que alguna trae una ficha del año (cada una cuesta ~US$ 0,007): la ficha local, la visitante, la tercera y el nombre de la página
    const consultas = nombres.flatMap((n) => [`${n} ${anio} Home Kit footballkitarchive Sponsor Brand`, `${n} ${anio} Home Kit - Football Kit Archive`, `${n} ${anio} Away Kit - Football Kit Archive`, `${n} ${anio} Third Kit Football Kit Archive`]);
    for (const query of consultas) {
    if (hallazgos.length) break;
    const res = await fetch('https://api.exa.ai/search', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': clave }, body: JSON.stringify({ query, type: 'auto', numResults: 10, includeDomains: ['footballkitarchive.com', 'oldfootballshirts.com'], contents: { text: { maxCharacters: 1800 } } }) });
    if (!res.ok) { console.log(`${anio}: Exa devolvió ${res.status}`); break; }
    const j = await res.json(); appendFileSync(join(ROOT, 'Admin/registros/api/exa.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'sponsor-fka', clubId, anio, costUsd: j.costDollars?.total ?? null }) + '\n');
    for (const r of j.results || []) {
      const ficha = (r.url || '').match(/footballkitarchive\.com\/(?:[a-z]{2}\/)?([a-z0-9-]+)-(\d{4})(?:-\d{2})?-(home|away|third)-kit\//);
      // el slug de la ficha es el del club sin «cd»/«fc» (o con ellos de más): «colombia» (la selección) no es «alianza-fc-colombia»
      const sinSiglas = (s) => s.replace(/(^|-)(cd|fc|ca|club)(?=-|$)/g, '$1').replace(/--+/g, '-').replace(/^-+|-+$/g, '');
      if (ficha && ficha[2] === anio && slugs.some((slug) => { const a = sinSiglas(ficha[1]), b = sinSiglas(slug); return a.includes(b) || (b.includes(a) && a.length >= b.length * 0.7); })) {
        // la ficha en otro idioma (/el/, /zh/, /ar/…) traduce los rótulos de la tabla y el campo Sponsor no aparece: se lee la misma ficha SIN el prefijo de idioma (Exa /contents, US$ 0,001), que trae la tabla en inglés
        const ingles = r.url.replace(/footballkitarchive\.com\/[a-z]{2}\//, 'footballkitarchive.com/'); if (vistas.has(ingles)) continue; vistas.add(ingles);
        let t = r.text || '', url = r.url;
        if (ingles !== r.url) { const c = await fetch('https://api.exa.ai/contents', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': clave }, body: JSON.stringify({ urls: [ingles], text: { maxCharacters: 1800 } }) }).then((x) => x.json()).catch(() => null); if (c?.results?.[0]?.text) { t = c.results[0].text; url = ingles; appendFileSync(join(ROOT, 'Admin/registros/api/exa.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'sponsor-fka', clubId, anio, costUsd: c.costDollars?.total ?? null, contents: true }) + '\n'); } }
        let f = leerFicha(t); const f0 = leerFicha(r.text || ''); const real = (x) => !/^(?:sin campo|no se pudo)/.test(x.sponsor) && x.sponsor !== '-';
        if (!real(f) && real(f0)) { f = f0; url = r.url; } // la ficha en inglés no trae el campo y la de otro idioma sí: vale la que lo trae
        hallazgos.push(`FKA ${ficha[3]}: sponsor «${f.sponsor}», marca ${f.marca}, liga ${f.liga} — ${url}`); }
      else if (/oldfootballshirts\.com/.test(r.url || '') && new RegExp(`\\b${anio}\\b`).test(r.text || '')) { const s = (r.text || '').match(new RegExp(`${anio}[^.]{0,80}[Ss]ponsored by ([^.\\n]+)`))?.[1]; if (s) hallazgos.push(`oldfootballshirts: sponsor «${s.trim()}» — ${r.url}`); }
    }
    }
    console.log(`${anio}: ${hallazgos.length ? '\n   ' + hallazgos.join('\n   ') : 'Exa no trae la ficha de ese año (con el nombre dado): probar otro --nombre, o anotar --registrar --sin-ficha'}`);
  }
  console.log(`\nSi coincide con tools/contexto-manual.json: node tools/sponsor-fka.mjs --registrar --club ${clubId} --anio AAAA --url <ficha de FKA> --sponsor "<sponsor>"  (--distinto si no: corregí contexto-manual.json con esa fuente, clase base-camisetas).`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const v = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--buscar')) { const clubId = A.find((a) => !a.startsWith('--') && a !== v('--nombre') && a !== v('--anio') && a !== v('--anios')); if (!clubId) { console.error('Uso: node tools/sponsor-fka.mjs <clubId> --buscar [--nombre "<Club>"] [--anio AAAA | --anios 2015-2022 | --todos]'); process.exit(1); } await buscarConExa(clubId, v('--nombre') || clubId.replace(/-[a-z]{2}$/, ''), v('--anio'), { anios: v('--anios'), todos: A.includes('--todos') }); process.exit(0); }
  if (A.includes('--registrar')) {
    const [clubId, anio, url, sponsor] = [v('--club'), v('--anio'), v('--url'), v('--sponsor')];
    if (A.includes('--sin-ficha')) { // Exa no trae ninguna ficha del año con los nombres probados: queda anotado y deja de listarse como débil
      const motivo = v('--sin-ficha'); if (!clubId || !/^\d{4}$/.test(anio || '') || !motivo) { console.error('Uso: --registrar --club <clubId> --anio AAAA --sin-ficha "<nombres y consultas que se probaron>"'); process.exit(1); }
      appendFileSync(REGISTRO, JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), clubId, anio: Number(anio), sinFicha: motivo, coincide: null }) + '\n');
      console.log(`Anotado ${clubId} ${anio}: sin ficha en FKA (${motivo}).`); process.exit(0);
    }
    if (!clubId || !/^\d{4}$/.test(anio || '') || !/^https:\/\/www\.footballkitarchive\.com\//.test(url || '') || !sponsor) { console.error('Uso: --registrar --club <clubId> --anio AAAA --url https://www.footballkitarchive.com/… --sponsor "<lo que dice FKA>" [--distinto]'); process.exit(1); }
    appendFileSync(REGISTRO, JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), clubId, anio: Number(anio), url, sponsor, coincide: !A.includes('--distinto') }) + '\n');
    console.log(`Anotado ${clubId} ${anio} en Admin/registros/sponsor-fka.jsonl${A.includes('--distinto') ? ' (distinto: corregí tools/contexto-manual.json)' : ''}.`); process.exit(0);
  }
  const clubId = A.find((a) => !a.startsWith('--'));
  if (!clubId) { console.error('Uso: node tools/sponsor-fka.mjs <clubId>  |  --registrar …'); process.exit(1); }
  console.log(pasoFka(clubId, v('--nombre') || clubId.replace(/-[a-z]{2}$/, '')) || `${clubId}: ningún sponsor débil sin verificar en FKA.`);
}
