#!/usr/bin/env node
// ============================================================================
// tools/dato-publico.mjs — datos públicos de un club (fundación, estadio y capacidad por año, sitio web) desde WIKIDATA: estructurado, gratis, sin IA y con la fuente (el permalink de la entidad).
//
// POR QUÉ. Estadio, capacidad y fundación se completaban a mano buscando en la web (una búsqueda de IA, con tokens, que a veces busca mal: 185 club-años de `tools/contexto-manual.json` salieron así). Una
// persona lo googlea en dos segundos porque busca corto («Lierse Kempenzonen founded») y abre la ficha de Wikipedia; Wikidata es esa ficha en datos: un club tiene `inception` (P571), `home venue` (P115)
// con fechas de inicio y fin, y cada estadio su `capacity` (P1083). Esta tool hace esa escalera sola y devuelve el valor con su cita.
//
// ESCALERA: (1) buscar la entidad por el nombre del club y quedarse con la que es un club deportivo del país (no con una persona, un estadio o un homónimo); si hay más de una, no elige y lista las
// candidatas; (2) leer sus declaraciones; (3) el estadio del año pedido es el de `home venue` cuyo período lo incluye (o el único); (4) la capacidad, la del estadio (la más cercana al año si hay varias).
// Lo que no encuentra, lo dice: nunca inventa. El valor se escribe en `tools/contexto-manual.json` con la cita que imprime esta tool.
//
// USO:
//   node tools/dato-publico.mjs "<nombre del club>" [--pais <iso2>] [--anio <año>] [--qid Q123]   un club (--qid fuerza la entidad si el nombre es ambiguo)
//   node tools/dato-publico.mjs --club <clubId> --anio <año>                                    el club del sitio (nombre y país de data/clubs.js)
//   --json imprime el resultado como JSON (lo usa estadio-sponsor.mjs)
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const UA = { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; datos publicos de clubes, pocas consultas)' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (url) => { for (let i = 0; i < 3; i++) { const r = await fetch(url, { headers: UA }); if (r.ok) return r.json(); if (r.status !== 429 && r.status < 500) return null; await dormir(1500 * (i + 1)); } return null; };
const API = 'https://www.wikidata.org/w/api.php';
export const TOL_CAPACIDAD = 0.05; // medido (tools/medir-segunda-fuente.mjs); Admin/HALLAZGOS-pipeline.md

// clases que aceptamos como «un club deportivo» (association football club, sports club, rugby union club, basketball club, ...) y se resuelven por P31 y su cadena P279 corta
const CLASES_CLUB = new Set(['Q476028', 'Q847017', 'Q5265', 'Q1051948', 'Q13027888', 'Q4438121', 'Q2088357', 'Q18558301', 'Q6519043', 'Q27547636', 'Q10484395']);
const PAISES_ISO = {}; // iso2 de un país (Q...) a pedido, con caché
const cacheEnt = new Map();
async function entidad(q) {
  if (cacheEnt.has(q)) return cacheEnt.get(q);
  const j = await get(`https://www.wikidata.org/wiki/Special:EntityData/${q}.json`); await dormir(250);
  const e = j?.entities?.[q] || null; cacheEnt.set(q, e); return e;
}
const ids = (e, p) => (e?.claims?.[p] || []).map((c) => c.mainsnak?.datavalue?.value?.id).filter(Boolean);
const etiqueta = (e) => e?.labels?.en?.value || Object.values(e?.labels || {})[0]?.value || null;
const sinAcentos = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ');
const anioDe = (t) => { const m = String(t || '').match(/([+-]\d{4})-/); return m ? Number(m[1]) : null; };

async function isoDe(qPais) {
  if (PAISES_ISO[qPais] !== undefined) return PAISES_ISO[qPais];
  const e = await entidad(qPais); const v = e?.claims?.P297?.[0]?.mainsnak?.datavalue?.value || null;
  return (PAISES_ISO[qPais] = v);
}
async function esClubDelPais(e, pais) {
  const clases = ids(e, 'P31');
  if (!clases.some((q) => CLASES_CLUB.has(q))) {
    // una clase más específica (p. ej. «Belgian football club») cuelga de la general: se mira un nivel arriba
    let arriba = false;
    for (const q of clases.slice(0, 4)) { const c = await entidad(q); if (ids(c, 'P279').some((s) => CLASES_CLUB.has(s))) { arriba = true; break; } }
    if (!arriba) return false;
  }
  if (!pais) return true;
  const paises = [...ids(e, 'P17'), ...ids(e, 'P495')];
  for (const q of paises) if ((await isoDe(q)) === pais.toUpperCase()) return true;
  return paises.length === 0;
}

export async function datoPublico(nombre, { pais, anio, qid } = {}) {
  let candidatas = [];
  if (qid) candidatas = [qid];
  else {
    // `nombre` puede ser una lista (nombre para mostrar y nombre legal); se prueba cada uno y también sin la sigla final (FC, SK...)
    const lista = [].concat(nombre).flatMap((n) => [n, n.replace(/\s+(FC|CF|SC|AC|SK|KV|KRC|BK|FK|IF|IK|SV|VfL|VfB|Limited|Ltd|VZW|NV|SAD)$/i, '')]);
    const variantes = [...new Set(lista)]; for (const n of [...variantes]) if (!/^(FC|CF|SC|AC|SK|KV|KRC|BK|FK|IF|IK|SV|VfL|VfB|Sporting|Club)\b/i.test(n)) variantes.push(`FC ${n}`); // «Luzern» es «FC Luzern» en Wikidata
    for (const q of variantes) {
      const b = await get(`${API}?action=wbsearchentities&search=${encodeURIComponent(q)}&language=en&type=item&limit=8&format=json`); await dormir(250);
      for (const r of b?.search || []) if (!candidatas.includes(r.id)) candidatas.push(r.id);
    }
  }
  const buenas = [];
  for (const q of candidatas) { const e = await entidad(q); if (e && (qid || (await esClubDelPais(e, pais)))) buenas.push(e); }
  if (!buenas.length) return { error: `no hay un club de ${pais || 'ningún país'} llamado «${[].concat(nombre).join(' / ')}» en Wikidata (candidatas: ${candidatas.join(', ') || 'ninguna'})` };
  if (buenas.length > 1) {
    // varias candidatas: la que se llama EXACTAMENTE como el club (sin acentos ni mayúsculas) gana a una cantera o un equipo B que lo contiene
    const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const nombres = [].concat(nombre).map(norm);
    const exactas = buenas.filter((e) => nombres.includes(norm(etiqueta(e))));
    if (exactas.length === 1) buenas.splice(0, buenas.length, exactas[0]);
  }
  if (buenas.length > 1) { // un club de fútbol gana a uno de otro deporte con el mismo nombre (Spartak Moscow tiene fútbol, hockey y básquet)
    const futbol = buenas.filter((e) => ids(e, 'P31').includes('Q476028'));
    if (futbol.length === 1) buenas.splice(0, buenas.length, futbol[0]);
  }
  if (buenas.length > 1) { // fuera los equipos femeninos, filiales y canteras (Burton Albion F.C. y Burton Albion L.F.C.; Borussia Dortmund y Borussia Dortmund II)
    const principal = buenas.filter((e) => !/\b(women|ladies|femen\w*|L\.?F\.?C\.?|W\.?F\.?C\.?|academy|development|reserves?|youth|juniors?|II|III|B|U-?\d{2})\b|\bU-?\d{2}\b/i.test(etiqueta(e) || ''));
    if (principal.length === 1) buenas.splice(0, buenas.length, principal[0]);
  }
  if (buenas.length > 1) return { error: `ambiguo: ${buenas.map((e) => `${e.id} «${etiqueta(e)}»`).join(' · ')} (repetí con --qid)` };
  const e = buenas[0];
  const out = { qid: e.id, nombre: etiqueta(e), fuente: `https://www.wikidata.org/wiki/${e.id}` };
  const inc = e.claims?.P571?.[0]?.mainsnak?.datavalue?.value?.time; if (inc) out.fundacion = anioDe(inc);
  const web = e.claims?.P856?.[0]?.mainsnak?.datavalue?.value; if (web) out.web = web;
  // estadios con período
  const estadios = [];
  for (const c of e.claims?.P115 || []) {
    const q = c.mainsnak?.datavalue?.value?.id; if (!q) continue;
    const desde = anioDe(c.qualifiers?.P580?.[0]?.datavalue?.value?.time); const hasta = anioDe(c.qualifiers?.P582?.[0]?.datavalue?.value?.time);
    const v = await entidad(q);
    const caps = (v?.claims?.P1083 || []).map((x) => ({ n: Number(x.mainsnak?.datavalue?.value?.amount), en: anioDe(x.qualifiers?.P585?.[0]?.datavalue?.value?.time) })).filter((x) => x.n > 0);
    estadios.push({ qid: q, nombre: etiqueta(v), desde, hasta, capacidades: caps, enwiki: v?.sitelinks?.enwiki?.title || null });
  }
  out.estadios = estadios;
  if (anio) {
    const vigente = estadios.filter((s) => (s.desde == null || s.desde <= anio) && (s.hasta == null || s.hasta >= anio));
    const el = vigente.length === 1 ? vigente[0] : (estadios.length === 1 ? estadios[0] : null);
    if (el) {
      const cap = el.capacidades.length ? el.capacidades.reduce((a, b) => (Math.abs((b.en ?? anio) - anio) < Math.abs((a.en ?? anio) - anio) ? b : a)) : null;
      out.delAnio = { anio, estadio: el.nombre, capacidad: cap ? cap.n : null, fuenteEstadio: `https://www.wikidata.org/wiki/${el.qid}` };
      // la capacidad que dice el artículo del ESTADIO en Wikipedia (ficha, «capacity»): otra edición que la de Wikidata; se compara con la de Wikidata (regla medida del TODO 367)
      if (el.enwiki) {
        const j = await get(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(el.enwiki)}&prop=wikitext&format=json&redirects=1`); await dormir(250);
        const lin = (j?.parse?.wikitext?.['*'] || '').match(/\|\s*capacity\s*=\s*([^\n]*)/i)?.[1];
        const num = lin ? Number(((lin.replace(/<ref[\s\S]*?(<\/ref>|\/>)/g, '').replace(/\{\{[^}]*\}\}/g, (m) => (/\d/.test(m) ? m.replace(/[^\d,.]/g, ' ') : '')).match(/\d[\d,.]*\d|\d/) || [''])[0]).replace(/[,.]/g, '')) : null;
        if (num && num >= 100) out.delAnio.capacidadWikipedia = num;
      }
      // REGLA DE TOLERANCIA (TODO 367, medida sobre 73 club-años en Admin/HALLAZGOS-pipeline.md): si Wikidata y el artículo del estadio difieren menos de TOL_CAPACIDAD, se toma el del artículo
      // (con ese corte, 76 % queda a menos de 3 % de lo revisado a mano y 90 % a menos de 10 %); si difieren más, o solo una fuente da el número, lo resuelve el agente (`--prompt capacidad`).
      const wd = out.delAnio.capacidad; const wp = out.delAnio.capacidadWikipedia;
      out.delAnio.capacidadDecidida = wd && wp && Math.abs(wd - wp) / Math.max(wd, wp) <= TOL_CAPACIDAD
        ? { valor: wp, regla: `Wikidata (${wd}) y el artículo del estadio (${wp}) difieren menos de ${TOL_CAPACIDAD * 100} %`, fuente: `https://en.wikipedia.org/wiki/${encodeURIComponent(String(el.enwiki).replace(/ /g, '_'))}` }
        : { agente: true, motivo: wd && wp ? `Wikidata (${wd}) y el artículo (${wp}) difieren más de ${TOL_CAPACIDAD * 100} %` : (wd || wp) ? 'una sola fuente da la capacidad' : 'ninguna fuente da la capacidad' };
      // SEGUNDA FUENTE: el artículo del club en Wikipedia (otra base que la de Wikidata) tiene que nombrar ese estadio; si no, es solo un candidato
      const titulo = e.sitelinks?.enwiki?.title;
      if (titulo) {
        const j = await get(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(titulo)}&prop=wikitext&format=json&redirects=1`); await dormir(250);
        const txt = j?.parse?.wikitext?.['*'];
        if (txt) out.delAnio.confirmadoPorWikipedia = sinAcentos(txt).includes(sinAcentos(el.nombre)) ? `https://en.wikipedia.org/wiki/${encodeURIComponent(titulo.replace(/ /g, '_'))}` : false;
      }
    } else out.delAnio = { anio, error: estadios.length ? `${vigente.length} estadios posibles ese año: ${vigente.map((s) => s.nombre).join(', ') || 'ninguno'}` : 'sin «home venue» (P115)' };
  }
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  let nombre = A.find((a, i) => !a.startsWith('--') && !['--pais', '--anio', '--qid', '--club', '--prompt'].includes(A[i - 1])); let pais = flag('--pais'); const anio = flag('--anio') ? Number(flag('--anio')) : undefined;
  const club = flag('--club');
  if (club) {
    const ctx = vm.createContext({ window: {} }); vm.runInContext(readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8'), ctx);
    const c = vm.runInContext('clubs', ctx)[club]; if (!c) { console.error(`No hay ${club} en data/clubs.js`); process.exit(1); }
    nombre = [c.displayName, c.name].filter(Boolean); pais = c.country;
  }
  if (!nombre) { console.error('uso: node tools/dato-publico.mjs "<club>" [--pais iso2] [--anio año] [--qid Q..] | --club <clubId> --anio <año> [--json]'); process.exit(1); }
  // --prompt <estadio|capacidad|fundacion>: el PROMPT FIJO del agente que resuelve lo que las fuentes de la tool no resolvieron (TODO 367). Se pasa tal cual a un Agent (Sonnet, no Opus).
  if (flag('--prompt')) {
    const campo = flag('--prompt'); const quien = [].concat(nombre).join(' / ');
    console.log(`Tarea: encontrar ${campo === 'estadio' ? `el estadio donde jugó de local ${quien} (${pais}) en ${anio}` : campo === 'capacidad' ? `la capacidad del estadio de ${quien} (${pais}) en ${anio}` : `el año de fundación de ${quien} (${pais})`}.
Reglas, en este orden y sin saltarte ninguna:
1. Buscá CORTO, como lo haría una persona: el nombre del club más una palabra (${campo === 'fundacion' ? '"founded"' : campo === 'capacidad' ? '"stadium capacity"' : '"stadium"'}). Nada de consultas largas. Hasta TRES reformulaciones; recién entonces "no encontrado".
2. Abrí la ficha del club en Wikipedia (WebFetch) y leé el dato ahí; no te quedes con el resumen del buscador.
3. Confirmalo en UNA fuente que no sea Wikipedia ni Wikidata: la web oficial del club, la federación o liga, o un informe anual. ${campo === 'capacidad' ? 'La capacidad cambia con los años: tiene que ser la de ' + anio + ' (o la más cercana, diciendo cuál año).' : ''}
4. Si las dos fuentes no coinciden, devolvé las dos y no elijas.
5. No inventes ni completes de memoria. Sin fuente leída en esta tarea, el valor es null.
6. No escribas ningún archivo ni le preguntes nada al club: es un dato público.
Devolvé solo este JSON: {"campo":"${campo}","valor":<valor o null>,"fuentes":[{"url":"...","dice":"lo que dice textual"}],"coinciden":true|false|null,"estado":"encontrado"|"no encontrado"|"fuentes en conflicto"}`);
    process.exit(0);
  }
  const r = await datoPublico(nombre, { pais, anio, qid: flag('--qid') });
  if (A.includes('--json')) console.log(JSON.stringify(r, null, 1));
  else if (r.error) console.log(`${[].concat(nombre).join(' / ')}: ${r.error}`);
  else {
    console.log(`${r.nombre} (${r.qid}) · ${r.fuente}`);
    console.log(`  fundación: ${r.fundacion ?? '(sin dato)'} · web: ${r.web ?? '(sin dato)'}`);
    for (const s of r.estadios) console.log(`  estadio: ${s.nombre} (${s.desde ?? '?'}-${s.hasta ?? 'hoy'}) · capacidad ${s.capacidades.map((c) => `${c.n}${c.en ? ` (${c.en})` : ''}`).join(', ') || '(sin dato)'}`);
    if (r.delAnio?.capacidadDecidida) console.log(`  capacidad: ${r.delAnio.capacidadDecidida.valor ? `${r.delAnio.capacidadDecidida.valor} (${r.delAnio.capacidadDecidida.regla})` : `AGENTE: ${r.delAnio.capacidadDecidida.motivo}  →  node tools/dato-publico.mjs --club <clubId> --anio ${r.delAnio.anio} --prompt capacidad`}`);
    if (r.delAnio) console.log(`  ${r.delAnio.anio}: ${r.delAnio.error || `${r.delAnio.estadio}, capacidad ${r.delAnio.capacidad ?? '(sin dato)'} ·${r.delAnio.confirmadoPorWikipedia ? `confirmado por ${r.delAnio.confirmadoPorWikipedia}` : 'SOLO Wikidata (el artículo de Wikipedia no lo nombra o no hay)'}`}`);
  }
}
