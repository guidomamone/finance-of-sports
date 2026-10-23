// tools/pais-club.mjs — el PAÍS y el IDIOMA de un club del sitio (de `country` en data/clubs.js), para que Jev y Claude sepan de qué país es el rubro y, entre ejemplos igual de
// parecidos por palabras, vengan primero los del mismo país y después los del mismo idioma. Gratis, solo lee data/clubs.js.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
// iso -> [nombre en español, idioma del documento]. Bélgica va con el neerlandés (la mayoría de los balances belgas cargados); Suiza y Austria con el alemán.
export const PAISES = {
  AR: ['Argentina', 'es'], ES: ['España', 'es'], CO: ['Colombia', 'es'], CL: ['Chile', 'es'], PE: ['Perú', 'es'], MX: ['México', 'es'], UY: ['Uruguay', 'es'], PY: ['Paraguay', 'es'], EC: ['Ecuador', 'es'],
  BR: ['Brasil', 'pt'], PT: ['Portugal', 'pt'], NL: ['Países Bajos', 'nl'], BE: ['Bélgica', 'nl'], IT: ['Italia', 'it'], GB: ['Reino Unido', 'en'], RU: ['Rusia', 'ru'], GR: ['Grecia', 'el'], DK: ['Dinamarca', 'da'],
  DE: ['Alemania', 'de'], AT: ['Austria', 'de'], CH: ['Suiza', 'de'], JP: ['Japón', 'ja'], EE: ['Estonia', 'et'], HR: ['Croacia', 'hr'], NO: ['Noruega', 'no'], TR: ['Turquía', 'tr'], SE: ['Suecia', 'sv'], PL: ['Polonia', 'pl'],
  CZ: ['Chequia', 'cs'], UA: ['Ucrania', 'uk'], KR: ['Corea del Sur', 'ko'], CN: ['China', 'zh'], FR: ['Francia', 'fr'], US: ['Estados Unidos', 'en'], IE: ['Irlanda', 'en'],
};
let _mapa = null;
function mapa() {
  if (_mapa) return _mapa;
  _mapa = new Map();
  for (const l of readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8').split('\n')) {
    const id = l.match(/\bid:'([^']+)'/); const c = l.match(/\bcountry:'([A-Z]{2})'/);
    if (id && c) _mapa.set(id[1], c[1]);
  }
  return _mapa;
}
export function paisDeClub(clubId) {
  const iso = mapa().get(clubId); if (!iso) return null;
  const [nombre, idioma] = PAISES[iso] || [iso, null];
  return { iso, nombre, idioma };
}
// 2 = mismo país, 1 = mismo idioma, 0 = nada en común (o no se sabe)
export function afinidad(clubA, clubB) {
  const a = paisDeClub(clubA); const b = paisDeClub(clubB);
  if (!a || !b) return 0;
  return a.iso === b.iso ? 2 : a.idioma && a.idioma === b.idioma ? 1 : 0;
}
