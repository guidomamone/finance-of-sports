// ============================================================================
// tools/memoria-categorias.mjs — lo que Claude por API resolvió y Jev no sabía, guardado para la próxima vez. Gratis (solo lee y escribe
// un archivo).
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30): "cuando Claude API resuelve algo que Jev no sabía resolver, debería quedar documentado en
// algún lado para que Jev la próxima vez sepa". Hasta la Versión 318, Jev (tools/jev-categorizar.mjs) y el escalón de precedente
// (categorizar-claude.mjs precedente()) solo aprendían de lo YA CARGADO en el sitio (data/*-data.js). Lo que Claude categorizaba quedaba en
// el `.categorias.json` de ese documento (Generados/) y nadie lo volvía a leer: el año siguiente del mismo club pagaba a Claude por el
// mismo rubro otra vez.
//
// EL ARCHIVO: Admin/categorias-aprendidas.jsonl (trackeado en git: es conocimiento, no un derivado). Una línea por rubro que Claude
// categorizó con confianza >= 0,80 (MIN_REGISTRO), con: club, año, lado, rubro, glosa, categoría, confianza, motivo, modelo, documento.
// La última respuesta para el mismo (club, lado, rubro) reemplaza a las anteriores al leer.
//
// CÓMO SE USA (y con qué cuidado, porque un error de Claude se propagaría):
//   - PRECEDENTE del mismo club (escalón 0, gratis, sin Jev ni Claude): solo lo aprendido con confianza >= 0,90 (MIN_PRECEDENTE). Medido en
//     el backtest de categorizar-claude (Admin/tests/test-categorizar-claude.md): Claude >= 0,90 acertó 98,5%.
//   - EJEMPLOS para Jev y para Claude (los "rubros parecidos de otros clubes"): lo aprendido con >= 0,80 (94,3% en el backtest).
//   - LO CARGADO EN EL SITIO SIEMPRE GANA: si producción ya tiene ese (club, lado, rubro), se usa producción y lo aprendido se ignora. Cuando
//     un ejercicio se carga (etapa 6), su versión curada pasa a mandar sola.
//   - Los BACKTESTS no lo usan (medirían con respuestas de Claude sobre esos mismos rubros: fuga).
//
// USO:
//   import { registrarAprendidas, lineasAprendidas } from './memoria-categorias.mjs';
//   node tools/memoria-categorias.mjs            resumen: cuántos rubros aprendidos, por club y por categoría
//   node tools/memoria-categorias.mjs --sembrar  carga la memoria con lo que Claude ya resolvió antes (todos los Generados/**/*.categorias.json);
//                                                se puede correr más de una vez: al leer gana la última respuesta por (club, lado, rubro).
// ============================================================================

import { readFileSync, appendFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { normalizar } from './vocabulario.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';

const ROOT = resolve(import.meta.dirname, '..');
export const ARCHIVO = resolve(ROOT, 'Admin', 'categorias-aprendidas.jsonl');
export const MIN_REGISTRO = 0.8;
export const MIN_PRECEDENTE = 0.9;
// EL RENGLÓN QUE DESGLOSA (padre, Versión 343: escalón "precedente con contexto" de la etapa 7, diseño aprobado por Guido). La misma etiqueta
// puede ser cosas distintas según dónde aparece ("Remuneración" dentro de gastos de administración = sueldos administrativos; "Remuneraciones"
// dentro del costo de ventas = sueldos del plantel, UC). Lo aprendido guarda el renglón del estado que su fila desglosa ('estado' si es un
// renglón del estado); la clave lo incluye, así dos respuestas de la misma etiqueta con padres distintos no se pisan.
export const padreDe = (section) => { const m = String(section || '').match(/desglosa "([^"]+)"/); return m ? m[1] : section ? 'estado' : null; };
const clave = (club, lado, label, padre = null) => `${club}|${lado}|${normalizar(label)}${padre ? `|${normalizar(padre)}` : ''}`;
// EL CLUB SE RECALCULA DESDE LA CARPETA DEL DOCUMENTO al leer, no se confía en el guardado (BUG REAL al sembrar, 2026-09-30): respuestas de
// Claude de antes de la Versión 309 traían el club EQUIVOCADO (el Athletic Club brasileño figuraba como 'athleticclub', que es el Athletic de
// Bilbao), y un club nuevo tiene un id PROVISORIO (el slug de su carpeta, 'vitoria-guimaraes') distinto del que recibe al darse de alta
// ('vitoriaguimaraes-pt'). Con la regla única de tools/carpetas-clubes.mjs: club del sitio si la carpeta resuelve, si no el mismo slug
// provisorio que usa el pipeline (onboard.mjs: nombre de la carpeta en minúsculas, sin acentos, espacios -> guiones).
const slug = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, '-');
function clubDe(x) {
  if (!x.md) return x.club;
  const r = clubDeRuta(x.md);
  return r.clubId || (r.carpeta ? slug(r.carpeta) : x.club);
}

// Guarda las respuestas de Claude de UN documento (las filas de su .categorias.json con escalón 2).
export function registrarAprendidas({ club, year, md, modelo, rubros }) {
  const lineas = [];
  for (const r of rubros || []) {
    if (r.escalon !== 2 || r.desdeCache || !r.categoria || r.categoria === 'no_es_rubro' || !(r.confianza >= MIN_REGISTRO) || !r.lado) continue;
    lineas.push(JSON.stringify({ ts: new Date().toISOString(), club, year: year != null ? String(year) : null, lado: r.lado, label: r.label, padre: padreDe(r.section), glosa: r.glosa || null, categoria: r.categoria, confianza: r.confianza, motivo: r.motivo || null, jevDecia: r.jev || null, jevConf: r.jevConf ?? null, modelo: modelo || null, md }));
  }
  if (lineas.length) appendFileSync(ARCHIVO, lineas.join('\n') + '\n');
  return lineas.length;
}

// Lo aprendido, en el MISMO formato que allLines() de categorizar-claude.mjs ({club, year, side, label, cat}), sin lo que producción ya
// tiene (`produccion`: esas mismas líneas de data/*-data.js), con confianza >= minConf. La última respuesta por (club, lado, rubro) gana.
export function lineasAprendidas({ produccion = [], minConf = MIN_REGISTRO } = {}) {
  if (!existsSync(ARCHIVO)) return [];
  const enProd = new Set(produccion.map((l) => clave(l.club, l.side, l.label)));
  const ultima = new Map();
  for (const l of readFileSync(ARCHIVO, 'utf8').split('\n')) {
    if (!l.trim()) continue;
    let x; try { x = JSON.parse(l); } catch { continue; }
    x.club = clubDe(x);
    ultima.set(clave(x.club, x.lado, x.label, x.padre), x);
  }
  const out = [];
  for (const [k, x] of ultima) {
    if (enProd.has(clave(x.club, x.lado, x.label)) || !(x.confianza >= minConf)) continue;
    out.push({ club: x.club, year: x.year || 'aprendido', side: x.lado, label: x.label, padre: x.padre || null, cat: x.categoria, fuente: x.modelo === 'guido' ? 'guido' : 'claude-api', conf: x.confianza });
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--sembrar')) {
    const base = resolve(ROOT, 'Generados'); let docs = 0; let n = 0;
    const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.categorias.json')) { try { const j = JSON.parse(readFileSync(p, 'utf8')); if (!j.error) { n += registrarAprendidas({ club: j.club, year: j.year, md: j.md, modelo: j.modelo, rubros: j.rubros }); docs++; } } catch { /* archivo roto: se saltea */ } } } };
    if (existsSync(base)) walk(base);
    console.log(`Sembrado: ${n} rubros de ${docs} documentos ya categorizados por Claude.`);
  }
  const L = lineasAprendidas({ minConf: 0 });
  const porClub = {}; const porCat = {};
  for (const l of L) { porClub[l.club] = (porClub[l.club] || 0) + 1; porCat[l.cat] = (porCat[l.cat] || 0) + 1; }
  console.log(`${L.length} rubros aprendidos de Claude (${L.filter((l) => l.conf >= MIN_PRECEDENTE).length} con confianza >= ${MIN_PRECEDENTE}, usables como precedente del mismo club).`);
  console.log('Por club:', Object.entries(porClub).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([k, v]) => `${k} ${v}`).join(' · '));
  console.log('Por categoría:', Object.entries(porCat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '));
}
