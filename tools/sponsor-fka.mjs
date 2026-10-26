// tools/sponsor-fka.mjs — los sponsors débiles o sin dato de un club, para verificarlos en Football Kit Archive (FKA), y el registro de lo verificado.
// POR QUÉ. Un sponsor de camiseta que llega de una sola base de aficionados (FKA leída por el resumen de una búsqueda) o que quedó `sin-fuente` no se da por confirmado, y FKA da 403 a las tools y a los subagentes y pone una
// verificación anti-bots en el navegador interno. En el Chrome de Guido (Claude in Chrome, `mcp__claude-in-chrome__*`) la ficha del equipo abre; si pide «View a short ad» (Unlock more content) no se sigue: lo desbloquea Guido una vez.
// `club-siis` lista estos años en el estado de cada club y al final de `--avanzar`, para que el paso no dependa de que alguien se acuerde. Débil = el sponsor tiene `sin-fuente.sponsor`, o su `fuente` nombra solo el resumen de una búsqueda de
// FKA («403», «resumen de la búsqueda», «una sola fuente», «débil»); deja de serlo cuando hay una línea en Admin/registros/sponsor-fka.jsonl.
// USO:
//   node tools/sponsor-fka.mjs <clubId>                         los años débiles del club y qué hacer (solo lee)
//   node tools/sponsor-fka.mjs <clubId> --buscar [--nombre "<Club>"] [--anio AAAA]   busca esos años en FKA con Exa (programático, ~US$ 0,007 por año, anotado en Admin/registros/api/exa.jsonl) e imprime lo que dice cada ficha
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

// el texto del paso fijo, para imprimir
export function pasoFka(clubId, nombre) {
  const d = debiles(clubId); if (!d.length) return null;
  return `SPONSOR DÉBIL O SIN DATO (${d.map((x) => `${x.anio}${x.sinDato ? ' sin dato' : ` ${x.sponsor}`}`).join(', ')}): paso fijo, verificarlo en Football Kit Archive.\n`
    + `   1) Con Exa (programático, ~US$ 0,007 por año; trae las fichas de FKA con su campo Sponsor, sin el cartel del anuncio): node tools/sponsor-fka.mjs ${clubId} --buscar --nombre "${nombre}". No trae todos los años.\n`
    + `   2) Los años que Exa no trae: Claude in Chrome (mcp__claude-in-chrome__*; el navegador interno y los subagentes no pasan): https://www.footballkitarchive.com/search/?q=${encodeURIComponent(nombre)}, «${nombre} Kit History», pestaña Sponsors. Si pide «View a short ad» (Unlock more content), no sigas: queda pendiente.\n`
    + `   Por cada año: node tools/sponsor-fka.mjs --registrar --club ${clubId} --anio AAAA --url <ficha> --sponsor "<lo que dice>" [--distinto si no coincide: corregir tools/contexto-manual.json con esa fuente, clase base-camisetas]`;
}

// Búsqueda programática con Exa (tools/exa-search.mjs, Admin/api-keys/exa.env): Exa tiene indexadas las fichas de camisetas de FKA (`<club>-<año>-home-kit`) con su tabla «| Sponsor |» y «| Brand |», sin el cartel de «View a short ad»; también oldfootballshirts.com.
// Una consulta por año débil (centavos; cada una se anota en Admin/registros/api/exa.jsonl). Imprime lo que encontró por año y el comando para registrarlo; la sesión decide (el sponsor de la ficha es el de la camiseta local de esa temporada).
async function buscarConExa(clubId, nombre, soloAnio) {
  const clave = readFileSync(join(ROOT, 'Admin/api-keys/exa.env'), 'utf8').split('\n').find((l) => l.startsWith('EXA_API_KEY='))?.slice(12).trim();
  if (!clave) throw new Error('Falta EXA_API_KEY en Admin/api-keys/exa.env');
  const slug = nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  for (const { anio } of debiles(clubId).filter((d) => !soloAnio || d.anio === soloAnio)) {
    const res = await fetch('https://api.exa.ai/search', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': clave }, body: JSON.stringify({ query: `${nombre} ${anio} Home Kit footballkitarchive Sponsor Brand`, type: 'auto', numResults: 10, includeDomains: ['footballkitarchive.com', 'oldfootballshirts.com'], contents: { text: { maxCharacters: 1800 } } }) });
    if (!res.ok) { console.log(`${anio}: Exa devolvió ${res.status}`); continue; }
    const j = await res.json(); appendFileSync(join(ROOT, 'Admin/registros/api/exa.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tool: 'sponsor-fka', clubId, anio, costUsd: j.costDollars?.total ?? null }) + '\n');
    const hallazgos = [];
    for (const r of j.results || []) {
      const ficha = (r.url || '').match(/footballkitarchive\.com\/(?:[a-z]{2}\/)?([a-z0-9-]+)-(\d{4})(?:-\d{2})?-(home|away|third)-kit\//);
      if (ficha && ficha[2] === anio && (ficha[1].includes(slug) || slug.includes(ficha[1]))) { const t = r.text || ''; hallazgos.push(`FKA ${ficha[3]}: sponsor «${t.match(/\|\s*Sponsor\s*\|\s*([^|\n]+?)\s*\|/)?.[1] || 'sin campo Sponsor'}», marca ${t.match(/\|\s*Brand\s*\|\s*([^|\n]+?)\s*\|/)?.[1] || '?'} — ${r.url}`); }
      else if (/oldfootballshirts\.com/.test(r.url || '') && new RegExp(`\\b${anio}\\b`).test(r.text || '')) { const s = (r.text || '').match(new RegExp(`${anio}[^.]{0,80}[Ss]ponsored by ([^.\\n]+)`))?.[1]; if (s) hallazgos.push(`oldfootballshirts: sponsor «${s.trim()}» — ${r.url}`); }
    }
    console.log(`${anio}: ${hallazgos.length ? '\n   ' + hallazgos.join('\n   ') : 'Exa no trae la ficha de ese año (queda para Claude in Chrome)'}`);
  }
  console.log(`\nSi coincide con tools/contexto-manual.json: node tools/sponsor-fka.mjs --registrar --club ${clubId} --anio AAAA --url <ficha de FKA> --sponsor "<sponsor>"  (--distinto si no: corregí contexto-manual.json con esa fuente, clase base-camisetas).`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const v = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--buscar')) { const clubId = A.find((a) => !a.startsWith('--') && a !== v('--nombre') && a !== v('--anio')); if (!clubId) { console.error('Uso: node tools/sponsor-fka.mjs <clubId> --buscar [--nombre "<Club>"] [--anio AAAA]'); process.exit(1); } await buscarConExa(clubId, v('--nombre') || clubId.replace(/-[a-z]{2}$/, ''), v('--anio')); process.exit(0); }
  if (A.includes('--registrar')) {
    const [clubId, anio, url, sponsor] = [v('--club'), v('--anio'), v('--url'), v('--sponsor')];
    if (!clubId || !/^\d{4}$/.test(anio || '') || !/^https:\/\/www\.footballkitarchive\.com\//.test(url || '') || !sponsor) { console.error('Uso: --registrar --club <clubId> --anio AAAA --url https://www.footballkitarchive.com/… --sponsor "<lo que dice FKA>" [--distinto]'); process.exit(1); }
    appendFileSync(REGISTRO, JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), clubId, anio: Number(anio), url, sponsor, coincide: !A.includes('--distinto') }) + '\n');
    console.log(`Anotado ${clubId} ${anio} en Admin/registros/sponsor-fka.jsonl${A.includes('--distinto') ? ' (distinto: corregí tools/contexto-manual.json)' : ''}.`); process.exit(0);
  }
  const clubId = A.find((a) => !a.startsWith('--'));
  if (!clubId) { console.error('Uso: node tools/sponsor-fka.mjs <clubId>  |  --registrar …'); process.exit(1); }
  console.log(pasoFka(clubId, v('--nombre') || clubId.replace(/-[a-z]{2}$/, '')) || `${clubId}: ningún sponsor débil sin verificar en FKA.`);
}
