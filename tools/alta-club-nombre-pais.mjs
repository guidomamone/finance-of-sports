// ============================================================================
// tools/alta-club-nombre-pais.mjs — la PROPUESTA de nombre legal del alta, normalizada por país (hoy solo Colombia). La usa decidirNombre()
// de tools/alta-club-lectura.mjs. NO contesta nada: la pregunta va a la cola igual y la cola decide; esto solo cambia el texto propuesto.
// POR QUÉ. Jaguares 2025: la portada dice «JAGUARES FUTBOL CLUB SA» y la propuesta salía «Jaguares Futbol Club Sa» («Sa» por «S.A.», «Futbol»
// sin tilde); el nombre que quedó en data/clubs.js es «Jaguares Fútbol Club S.A.».
// QUÉ HACE (solo si el país del club es CO y el nombre termina en SA, S A, S.A. o S.A.S.; si no, devuelve el nombre sin tocar):
//   1) el sufijo pasa a «S.A.» o «S.A.S.»;
//   2) si el documento lo escribe en mayúsculas, el resto va en mayúsculas de título («de», «del», «y», «e» en minúscula; «FC», «F.C.» y
//      lo que tiene números, como está);
//   3) acentos de una lista CERRADA: una palabra sin tilde toma la tilde solo si esa misma palabra ya figura acentuada en un nombre de
//      data/clubs.js de un club del mismo país («Futbol» → «Fútbol», «Atletico» → «Atlético»). Sin diccionario general: si data/clubs.js no la
//      tiene acentuada, queda como está; si la tiene con dos acentos distintos, también.
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { paisDe } from './alta-club-tablas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const sinTilde = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
// sin artículos: «Los Toros», «El Equipo del Pueblo» los llevan en mayúscula (Toros de Córdoba 2023, «BEISBOL PROFESIONAL LOS TOROS S.A.»)
const CONECTORES = new Set(['de', 'del', 'y', 'e']);
const SUFIJO = /^(.*?)[\s,]+(S\s?A|S\.A\.?|S\.A\.S\.?)$/i;

// Los nombres (name, displayName y names[].name) de data/clubs.js por país: { iso2: [{ id, nombres: [] }] }. Se lee una vez.
let CLUBS = null;
function clubsPorPais() {
  if (CLUBS) return CLUBS;
  CLUBS = {};
  let txt = ''; try { txt = readFileSync(resolve(ROOT, 'data/clubs.js'), 'utf8'); } catch { return CLUBS; }
  for (const l of txt.split('\n')) {
    const id = l.match(/^\s*'([^']+)':\s*\{/); const pais = l.match(/country:'([A-Z]{2})'/); if (!id || !pais) continue;
    const nombres = [...l.matchAll(/\b(?:name|displayName):'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1].replace(/\\'/g, "'"));
    (CLUBS[pais[1]] ||= []).push({ id: id[1], nombres });
  }
  return CLUBS;
}

// Palabra sin tilde (minúsculas) → la forma acentuada que ya usa data/clubs.js para ese país. `excluirId` saca un club de la lista (para medir
// sin que el propio nombre del club se dé la respuesta).
export function acentosDelPais(iso2, { excluirId = null } = {}) {
  const mapa = new Map();
  for (const c of clubsPorPais()[iso2] || []) {
    if (c.id === excluirId) continue;
    for (const n of c.nombres) for (const w of n.split(/[\s\-/]+/)) {
      const p = w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ''); if (!p || sinTilde(p) === p) continue;
      const k = sinTilde(p).toLowerCase(); const forma = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
      if (!mapa.has(k)) mapa.set(k, forma); else if (mapa.get(k) !== forma) mapa.set(k, null); // dos acentos distintos: no se usa
    }
  }
  return mapa;
}

// El país del club a partir de la carpeta "Clubes/<País>/<Club>".
export const isoDeCarpeta = (carpeta) => { const p = String(carpeta || '').split('/')[1]; const x = p ? paisDe(p) : null; return x && x.iso2 ? x.iso2 : null; };

// nombre: la propuesta como sale hoy (nombreBienEscrito); crudo: el candidato tal como está en el documento (portada o lo más frecuente).
// Devuelve { nombre, notas }: notas dice qué se normalizó (vacío si nada), para el texto de la pregunta.
export function normalizarPropuesta(nombre, { iso2, crudo = nombre, excluirId = null } = {}) {
  if (iso2 !== 'CO' || !nombre) return { nombre, notas: [] };
  const m = nombre.match(SUFIJO); const mc = String(crudo || '').match(SUFIJO); if (!m) return { nombre, notas: [] };
  const sufijo = /s\.?\s*$/i.test(m[2].replace(/^s\.?\s?a/i, '')) ? 'S.A.S.' : 'S.A.';
  const notas = []; if (m[2] !== sufijo) notas.push(`sufijo ${sufijo}`);
  // mayúsculas de título solo si el documento lo escribe en mayúsculas (o casi todo en minúsculas: Bogotá FC 2025, «Bogota futbol club sa»; o casi todo en
  // mayúsculas, con una letra suelta del OCR: Leones FC 2025, «lLEONES FUTBOL CLUB SA»). Con mayúsculas y minúsculas, es la escritura del documento.
  const cuerpoCrudo = mc ? mc[1] : m[1];
  const may = (cuerpoCrudo.match(/[A-ZÀ-Ý]/g) || []).length; const min = (cuerpoCrudo.match(/[a-zà-ÿ]/g) || []).length;
  const titulo = !may || !min || may / (may + min) >= 0.8 || may / (may + min) <= 0.15;
  let palabras = (titulo ? cuerpoCrudo : m[1]).split(/\s+/);
  if (titulo) palabras = palabras.map((w, i) => {
    if (/[.\d&]/.test(w) || (w.length <= 2 && i > 0 && w === w.toUpperCase() && !CONECTORES.has(w.toLowerCase()))) return w;
    if (i > 0 && CONECTORES.has(w.toLowerCase())) return w.toLowerCase();
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });
  const acentos = acentosDelPais(iso2, { excluirId }); let acentuo = false;
  palabras = palabras.map((w) => {
    if (sinTilde(w) !== w || !/^\p{L}+$/u.test(w)) return w;
    const f = acentos.get(w.toLowerCase()); if (!f) return w;
    acentuo = true; return w === w.toUpperCase() && w.length > 1 ? f.toUpperCase() : (w.charAt(0) === w.charAt(0).toLowerCase() ? f.toLowerCase() : f);
  });
  if (acentuo) notas.push('acento como en data/clubs.js');
  return { nombre: `${palabras.join(' ')} ${sufijo}`, notas };
}
