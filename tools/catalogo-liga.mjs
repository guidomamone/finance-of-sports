#!/usr/bin/env node
// ============================================================================
// tools/catalogo-liga.mjs — PROPONE (y, con aprobación, ESCRIBE) la liga de un club en el catálogo data/leagues.js, y el deporte si es nuevo.
//
// POR QUÉ. alta-club.mjs deja la fila de liga en null cuando la caché de rosters ubica al club en una liga que no está en LEAGUES («liga no catalogada»), y nunca
// toca SPORTS. Cada liga y cada deporte nuevo se armaban a mano (Bath: gb-premiershiprugby y rugby active:true), sin que nadie viera de dónde salía cada dato ni qué
// reglas de categoría quedaban inválidas al activar el deporte.
//
// DE DÓNDE SALE CADA DATO (Wikipedia en inglés, API de wikitext, sin IA; la revisión exacta queda en la propuesta):
//   full / name  el título de la página de temporada de la caché (tools/club-league-reference/<iso>.json) sin la temporada ni «season»: «2023–24 Premiership Rugby» da
//                «Premiership Rugby». Wikipedia titula sin sponsor. `name` (el corto del selector) se propone igual a `full`: acortarlo es decisión de quien aprueba.
//   país         el prefijo del id de la liga (<iso2>-<slug>); se comprueba contra `country` del infobox de la liga (Inglaterra, Escocia... = GB). Si no coincide, pregunta.
//   deporte      `sport` del infobox de la liga, o la plantilla (Infobox football/rugby...). Si no es un id de SPORTS, pregunta (y es un deporte nuevo).
//   tier         `level` del infobox («Level 1»); si no, el de la liga de `promotion` más uno (en la misma lista); sin `promotion` ni `level` se propone 1 con la marca
//                «confirmar». Si nada responde, pregunta: no se inventa un nivel. El tier se compara dentro de un deporte y un país.
// ESCALERA: 1) caché local de la liga (gratis) -> 2) el artículo de la liga en Wikipedia -> 3) pregunta. Las preguntas salen en la propuesta; sin respuesta no se escribe.
//
// DEPORTE NUEVO (inactivo o ausente en SPORTS). Para proponer activarlo hace falta: taxonomía en SPORT_TAXONOMIES, clave en CEROS_POR_DEPORTE, al menos un club cargado de ese
// deporte, y que NINGUNA regla CATEGORÍA (prompt) de todos los deportes quede inválida con el deporte activo (reglas-categoria.mjs, validarReglasPrompt). La propuesta lista
// lo que falta y, una por una, las reglas inválidas. Activar un deporte aparece en el selector del sitio: lo aprueba Guido (hoja de una pantalla = esta salida). Una liga
// nueva de un deporte ya activo la aprueba la Auditora.
//
// USO:
//   node tools/catalogo-liga.mjs --liga <id> [--pagina "<título de una temporada>"] [--json]       propuesta (gratis salvo la lectura de Wikipedia)
//   node tools/catalogo-liga.mjs --liga <id> --escribir --full "<nombre>" --name "<corto>" --aprobado-ref <línea>
//                                                                                                escribe la línea de LEAGUES (deporte ya activo)
//   ... --activar-deporte --deporte-ref <línea>                                                   además active:true en SPORTS (solo si no falta nada)
//   Opcionales que contestan una pregunta de la propuesta: --tier <n>, --pais <ISO2>.
// APROBACIONES. Quien aprueba deja una línea en Admin/registros/auditoria-proceso.jsonl y el script la VERIFICA (no alcanza escribir un nombre): para la liga, una línea de una sesión
// «auditora*» con veredicto APROBADO… (o DECIDIDO) cuyo `cambio` nombra el id de la liga; para activar el deporte, una línea con veredicto DECIDIDO que nombra el deporte. --full y --name los
// da quien aprueba: el catálogo usa nombres locales o cortos y la propuesta (título inglés de Wikipedia) no se escribe sin confirmar.
// Después: node tools/ligas-sin-verificar.mjs --escribir (completa las filas null de data/club-leagues/) y node tools/publicar.mjs.
// ============================================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { deportes, categoriasDeDeporte, CEROS_POR_DEPORTE, deportesActivos } from './deporte-club.mjs';
import { validarReglasPrompt } from './reglas-categoria.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REF = resolve(ROOT, 'tools', 'club-league-reference');
const UA = { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' };
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Wikipedia ----
export async function articulo(titulo, lang = 'en') {
  for (let i = 0; i < 3; i++) {
    await dormir(1200 * (i + 1));
    try {
      const r = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(titulo)}&prop=wikitext|revid&format=json&redirects=1`, { headers: UA });
      const j = JSON.parse(await r.text()); if (j.error) return null;
      return { wikitext: j.parse.wikitext['*'], revid: j.parse.revid, titulo: j.parse.title, lang };
    } catch { /* reintenta */ }
  }
  return null;
}
// «2023–24 Premiership Rugby» -> «Premiership Rugby»; «2016 Categoría Primera A season» -> «Categoría Primera A»
export const sinTemporada = (t) => String(t || '').replace(/^\d{4}(?:\s*[–-]\s*\d{2,4})?\s+/, '').replace(/\s+season$/i, '').trim();
const limpio = (v) => String(v || '').replace(/<!--[\s\S]*?-->/g, '').replace(/<ref[^>]*\/>|<ref[^>]*>[\s\S]*?<\/ref>/g, '').replace(/\{\{\s*(?:flag(?:icon)?|nowrap|small|efn)\s*\|([^{}|]*)[^{}]*\}\}/gi, '$1').replace(/\{\{[^{}]*\}\}/g, '').replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, '$1').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
// el primer infobox del artículo: { plantilla, campos: { nombre: valorCrudo } }
export function infobox(wikitext) {
  const m = wikitext.match(/\{\{\s*(Infobox[^|\n{}]*)/i); if (!m) return null;
  const ini = m.index; let prof = 0, fin = ini;
  for (let i = ini; i < wikitext.length; i++) { if (wikitext.startsWith('{{', i)) { prof++; i++; } else if (wikitext.startsWith('}}', i)) { prof--; i++; if (!prof) { fin = i + 1; break; } } }
  const campos = {}; let k = null;
  for (const l of wikitext.slice(ini, fin).split('\n').slice(1)) {
    const c = l.match(/^\s*\|\s*([\w \-/]+?)\s*=\s*(.*)$/);
    if (c) { k = c[1].toLowerCase(); campos[k] = c[2]; } else if (k && !/^\s*\|/.test(l) && !/^\s*\}\}\s*$/.test(l)) campos[k] += ' ' + l;
  }
  return { plantilla: m[1].trim(), campos };
}
// ---- el catálogo ----
function catalogo() {
  const ctx = vm.createContext({ window: {} });
  vm.runInContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8'), ctx, { filename: 'data/leagues.js' });
  return { LEAGUES: vm.runInContext('LEAGUES', ctx), COUNTRIES: vm.runInContext('COUNTRIES', ctx), SPORTS: vm.runInContext('SPORTS', ctx) };
}
const ISO_DE = (() => { const n = new Intl.DisplayNames(['en'], { type: 'region' }); const m = {}; for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) { const c = String.fromCharCode(a, b); const nom = n.of(c); if (nom && nom !== c) m[nom.toLowerCase()] = c; } for (const x of ['england', 'scotland', 'wales', 'northern ireland', 'united kingdom', 'great britain']) m[x] = 'GB'; return m; })();
const paisDe = (texto) => { const t = limpio(texto).toLowerCase().replace(/^(the)\s+/, ''); return ISO_DE[t] || ISO_DE[t.split(/[,/]| and /)[0].trim()] || null; };
// el id interno de SPORTS que describe el infobox (plantilla + campo sport)
export function deporteDeInfobox(ib) {
  const t = `${ib?.plantilla || ''} ${limpio(ib?.campos?.sport)}`.toLowerCase();
  if (/american football|gridiron|\bnfl\b/.test(t)) return 'nfl';
  if (/rugby/.test(t)) return 'rugby';
  if (/basketball/.test(t)) return 'basquet';
  if (/tennis/.test(t)) return 'tenis';
  if (/association football|football|soccer|fútbol/.test(t)) return 'futbol';
  return null;
}
// el escalón: { tier, como, confirmar? } o null
async function tierDe(ib, iso, profundidad = 0) {
  const level = limpio(ib?.campos?.level).match(/(?:level|tier|division)?\s*(\d+)/i);
  if (level) return { tier: Number(level[1]), como: `«level» del infobox: ${limpio(ib.campos.level)}` };
  const prom = (ib?.campos?.promotion || '').match(/\[\[([^\]|#]+)/);
  if (!ib?.campos?.promotion || !limpio(ib.campos.promotion)) {
    if (!ib) return null;
    return limpio(ib.campos.relegation) ? { tier: 1, como: 'el infobox tiene «relegation» y no «promotion»: la primera' } : { tier: 1, como: 'sin «promotion» ni «level» en el infobox: se propone la primera', confirmar: true };
  }
  if (!prom || profundidad >= 4) return null;
  const sup = await articulo(prom[1]); const ibs = sup && infobox(sup.wikitext); if (!ibs) return null;
  const p = await tierDe(ibs, iso, profundidad + 1);
  return p ? { tier: p.tier + 1, como: `«promotion» del infobox apunta a «${sup.titulo}» (escalón ${p.tier}), más uno`, confirmar: p.confirmar } : null;
}

// ---- la propuesta ----
export async function proponer(ligaId, { pagina = null, tier = null, pais = null } = {}) {
  const iso = ligaId.split('-')[0]; const { LEAGUES, SPORTS } = catalogo();
  const fichaCache = existsSync(resolve(REF, `${iso}.json`)) ? JSON.parse(readFileSync(resolve(REF, `${iso}.json`), 'utf8')).leagues?.[ligaId] : null;
  const ult = fichaCache ? Object.keys(fichaCache).map(Number).sort((a, b) => b - a)[0] : null;
  const titulo = pagina || (fichaCache ? fichaCache[ult].wikipediaPage : null);
  const out = { id: ligaId, yaEnCatalogo: !!LEAGUES[ligaId], preguntas: [], notas: [], fuentes: [], campos: {} }; const paisDado = pais ? String(pais).toUpperCase() : null;
  if (!titulo) { out.preguntas.push(`sin página de temporada: ni la caché de ${iso} tiene «${ligaId}» ni se pasó --pagina. Bajala con tools/fetch-club-league-reference.mjs`); return out; }
  const full = sinTemporada(titulo); out.fuentes.push(`página de temporada: «${titulo}» (${fichaCache ? `tools/club-league-reference/${iso}.json` : '--pagina'})`);
  const art = await articulo(full); const ib = art ? infobox(art.wikitext) : null;
  if (art) out.fuentes.push(`artículo de la liga: https://en.wikipedia.org/w/index.php?oldid=${art.revid} («${art.titulo}»)`); else out.preguntas.push(`no encontré el artículo «${full}» en Wikipedia: nombre, país, deporte y escalón quedan sin comprobar`);
  const c = out.campos;
  c.full = { valor: full, de: 'el título de la página de temporada sin la temporada' };
  c.name = { valor: null, de: 'lo da quien aprueba con --name (corto, sin sponsor; el catálogo usa nombres locales)', confirmar: true };
  c.full = { valor: full, de: `título inglés de la página de temporada sin la temporada; --full da el nombre del catálogo`, confirmar: true };
  c.country = { valor: iso.toUpperCase(), de: 'el prefijo del id' };
  const paisIb = paisDe(ib?.campos?.country || ib?.campos?.countries);
  if (paisDado) c.country = { valor: paisDado, de: '--pais, dado por quien aprueba' };
  else if (ib && paisIb && paisIb !== c.country.valor) out.preguntas.push(`el infobox dice país ${paisIb} y el id ${c.country.valor}: contestá con --pais`);
  else if (ib && !paisIb) out.notas.push(`el infobox no dice un país reconocible (${limpio(ib.campos.country || ib.campos.countries) || 'sin campo'}): se usa el del id`);
  const dep = deporteDeInfobox(ib);
  if (dep) c.sport = { valor: dep, de: `infobox (${ib.plantilla}${ib.campos.sport ? `, sport = ${limpio(ib.campos.sport)}` : ''})` };
  else out.preguntas.push(`no sé de qué deporte es la liga (${ib ? `${ib.plantilla}; sport = ${limpio(ib.campos.sport) || 'sin campo'}` : 'sin infobox'}): ¿cuál de ${SPORTS.map((s) => s.id).join(', ')}, o es un deporte nuevo?`);
  const t = tier != null ? { tier: Number(tier), como: '--tier, dado por quien aprueba' } : await tierDe(ib, iso);
  if (t) { c.tier = { valor: t.tier, de: t.como, confirmar: !!t.confirmar }; if (t.confirmar) out.preguntas.push(`escalón ${t.tier} sin que el infobox lo diga: confirmar`); }
  else out.preguntas.push('no pude deducir el escalón (tier): sin «level» ni cadena de «promotion» en el infobox');
  // el deporte
  const d = c.sport?.valor; const sp = SPORTS.find((s) => s.id === d);
  out.deporte = { id: d || null, enSPORTS: !!sp, activo: !!sp?.active };
  if (d && !(sp && sp.active)) {
    const falta = [];
    if (!sp) falta.push(`«${d}» no está en SPORTS (data/leagues.js)`);
    if (!categoriasDeDeporte(d)) falta.push(`no hay taxonomía de «${d}» en SPORT_TAXONOMIES (data/category-map.js)`);
    if (!CEROS_POR_DEPORTE[d]) falta.push(`no hay clave «${d}» en CEROS_POR_DEPORTE (tools/deporte-club.mjs; [] vale)`);
    const clubs = [...readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8').matchAll(new RegExp(`\\bid:'([^']+)'[^\\n]*\\bsport:'${d}'`, 'g'))].map((m) => m[1]);
    out.deporte.clubsCargados = clubs; if (!clubs.length) falta.push(`ningún club de «${d}» cargado en data/clubs.js (un club de prueba de punta a punta alcanza)`);
    // #14: las reglas de categoría que quedarían inválidas con el deporte activo, ANTES de activarlo
    const v = validarReglasPrompt({ activos: [...new Set([...deportesActivos(), d])] });
    out.deporte.reglasInvalidas = v.errores; if (v.errores.length) falta.push(`${v.errores.length} regla(s) de categoría quedarían inválidas con «${d}» activo`);
    out.deporte.falta = falta;
  }
  return out;
}

function mostrar(p) {
  const L = [`LIGA ${p.id}${p.yaEnCatalogo ? ' (YA está en el catálogo: se compara)' : ''}`];
  for (const [k, v] of Object.entries(p.campos)) L.push(`  ${k.padEnd(8)} ${String(v.valor).padEnd(28)} ${v.de}${v.confirmar ? '  [confirmar]' : ''}`);
  for (const f of p.fuentes) L.push(`  fuente: ${f}`);
  if (p.deporte?.id) {
    L.push(`DEPORTE ${p.deporte.id}: ${p.deporte.activo ? 'activo' : p.deporte.enSPORTS ? 'inactivo' : 'no está en SPORTS'}`);
    if (p.deporte.clubsCargados) L.push(`  clubes cargados: ${p.deporte.clubsCargados.join(', ') || 'ninguno'}`);
    for (const f of p.deporte.falta || []) L.push(`  FALTA: ${f}`);
    for (const e of p.deporte.reglasInvalidas || []) L.push(`  REGLA INVÁLIDA con el deporte activo: ${e}`);
    if (p.deporte.falta && !p.deporte.falta.length) L.push('  Se puede proponer activarlo (lo aprueba Guido).');
  }
  for (const q of p.notas || []) L.push(`nota: ${q}`);
  for (const q of p.preguntas) L.push(`PREGUNTA: ${q}`);
  return L.join('\n');
}

// ---- aprobaciones: una línea de Admin/registros/auditoria-proceso.jsonl (número de línea, desde 1) ----
export function leerAprobacion(ref, { nombra, decidido = false }) {
  const f = resolve(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl');
  if (!existsSync(f)) return { error: 'no existe Admin/registros/auditoria-proceso.jsonl' };
  const l = readFileSync(f, 'utf8').split('\n')[Number(ref) - 1];
  if (!l) return { error: `no hay línea ${ref} en auditoria-proceso.jsonl` };
  let e; try { e = JSON.parse(l); } catch { return { error: `la línea ${ref} de auditoria-proceso.jsonl no es JSON` }; }
  const v = String(e.veredicto || '');
  if (decidido ? !/^DECIDIDO/i.test(v) : !/^(APROBADO|DECIDIDO)/i.test(v)) return { error: `la línea ${ref} tiene veredicto «${v}», hace falta ${decidido ? 'DECIDIDO' : 'APROBADO o DECIDIDO'}` };
  if (!decidido && !/^auditora/i.test(String(e.sesion || '')) && !/^DECIDIDO/i.test(v)) return { error: `la línea ${ref} no es de una sesión auditora (${e.sesion})` };
  if (!new RegExp(`(^|[^a-z0-9-])${nombra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9-]|$)`, 'i').test(String(e.cambio || ''))) return { error: `el «cambio» de la línea ${ref} no nombra «${nombra}»` };
  return { ok: true, quien: e.sesion, fecha: e.fecha };
}

// ---- escribir ----
function lineaLiga(id, c) {
  const q = (s) => `'${String(s).replace(/'/g, "\\'")}'`;
  return `  ${q(id)}: { name:${q(c.name.valor)}, full:${q(c.full.valor)}, country:${q(c.country.valor)}, sport:${q(c.sport.valor)}, tier:${c.tier.valor} },\n`;
}
export function escribirCatalogo(p, { activar = false } = {}) {
  const f = resolve(ROOT, 'data', 'leagues.js'); let s = readFileSync(f, 'utf8');
  const a = s.indexOf('const LEAGUES = {'); const fin = s.indexOf('\n};', a);
  const bloque = s.slice(a, fin);
  const mismas = [...bloque.matchAll(new RegExp(`^.*country:'${p.campos.country.valor}'.*$`, 'gm'))];
  const tras = mismas.length ? a + mismas.at(-1).index + mismas.at(-1)[0].length + 1 : fin + 1;
  s = s.slice(0, tras) + lineaLiga(p.id, p.campos) + s.slice(tras);
  if (activar) { const r = new RegExp(`(\\{\\s*id:'${p.campos.sport.valor}'[^}]*?active:)false`); if (!r.test(s)) throw new Error(`SPORTS no tiene ${p.campos.sport.valor} con active:false`); s = s.replace(r, '$1true '); }
  writeFileSync(f, s);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  const liga = flag('--liga');
  if (!liga) { console.error('Uso: node tools/catalogo-liga.mjs --liga <id> [--pagina "<título>"] [--tier <n>] [--pais <ISO2>] [--json] [--escribir --full "<nombre>" --name "<corto>" --aprobado-ref <línea> [--activar-deporte --deporte-ref <línea>]]'); process.exit(1); }
  const p = await proponer(liga, { pagina: flag('--pagina'), tier: flag('--tier'), pais: flag('--pais') });
  console.log(A.includes('--json') ? JSON.stringify(p, null, 1) : mostrar(p));
  if (A.includes('--escribir')) {
    const motivos = [];
    if (p.yaEnCatalogo) motivos.push('la liga ya está en el catálogo');
    if (p.preguntas.length) motivos.push('hay preguntas sin responder (la propuesta no está completa)');
    if (!p.campos.sport || !p.campos.tier) motivos.push('faltan deporte o escalón');
    // el nombre lo da quien aprueba: la propuesta es el título inglés de Wikipedia y el catálogo usa nombres locales o cortos
    if (!flag('--full') || !flag('--name')) motivos.push('faltan --full "<nombre completo>" y --name "<nombre corto, sin sponsor>" (los da quien aprueba)');
    else { p.campos.full = { valor: flag('--full') }; p.campos.name = { valor: flag('--name') }; }
    const ap = flag('--aprobado-ref') ? leerAprobacion(flag('--aprobado-ref'), { nombra: liga }) : { error: 'falta --aprobado-ref <línea de Admin/registros/auditoria-proceso.jsonl>: una línea de la Auditora con veredicto APROBADO (o DECIDIDO) que nombre la liga' };
    if (ap.error) motivos.push(ap.error);
    const activo = p.deporte?.activo; let apD = null;
    if (p.deporte?.id && !activo) {
      if (!A.includes('--activar-deporte')) motivos.push(`el deporte «${p.deporte.id}» no está activo: hace falta --activar-deporte --deporte-ref <línea>`);
      else { apD = flag('--deporte-ref') ? leerAprobacion(flag('--deporte-ref'), { nombra: p.deporte.id, decidido: true }) : { error: 'falta --deporte-ref <línea de auditoria-proceso.jsonl con veredicto DECIDIDO que nombre el deporte (la decisión de Guido)>' }; if (apD.error) motivos.push(apD.error); }
      for (const f of p.deporte.falta || []) motivos.push(f);
    }
    if (motivos.length) { console.error('\nNO se escribió nada:\n' + motivos.map((m) => `  - ${m}`).join('\n')); process.exit(1); }
    escribirCatalogo(p, { activar: !activo && A.includes('--activar-deporte') });
    console.log(`\nEscrito en data/leagues.js: ${p.id}${!activo && A.includes('--activar-deporte') ? ` y SPORTS ${p.deporte.id} active:true` : ''} (liga: ${ap.quien} ${ap.fecha}${apD ? `; deporte: ${apD.quien} ${apD.fecha}` : ''}).`);
    console.log('Siguiente: node tools/ligas-sin-verificar.mjs --escribir (las filas en null de data/club-leagues/) y node tools/publicar.mjs.');
  }
}
