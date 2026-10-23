// ============================================================================
// tools/sponsor-busqueda.js — ¿el registro de búsqueda del sponsor de camiseta vale? (skill club-sourcing, sección 0.5)
//
// Un año sin sponsor solo pasa la compuerta de estadio-sponsor.mjs si `sin-fuente.sponsor` (en tools/contexto-manual.json) es:
//   - { legacy: true, texto } y el club y el año están en tools/sponsor-legacy.json (los años que ya tenían un texto libre cuando se puso la regla; la lista no crece), o
//   - { buscado: 'AAAA-MM-DD', por, intentos: [{ clase, donde, resultado }] } con al menos tres clases distintas sin contar Wikipedia, una de ellas informe-anual,
//     club-oficial o archivo-web con resultado «sin-dato», y a lo sumo una de las tres inaccesible.
// Solo comprueba la FORMA: que la búsqueda ocurrió lo mira la auditoría (eje datos, muestra por país). Lo usan estadio-sponsor.mjs y audit.js.
// ============================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const CLASES = ['informe-anual', 'club-oficial', 'archivo-web', 'prensa', 'base-camisetas', 'patrocinador', 'wikipedia'];
const ANCLAS = ['informe-anual', 'club-oficial', 'archivo-web'];
const RESULTADOS = ['sin-dato', 'inaccesible'];

function listaLegacy() {
  const f = path.join(ROOT, 'tools', 'sponsor-legacy.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
}

// -> { ok: true, legacy: boolean, texto? } | { ok: false, motivo }
function validar(valor, club, anio, legacy = listaLegacy()) {
  if (valor == null || typeof valor !== 'object' || Array.isArray(valor)) return { ok: false, motivo: 'es un texto suelto: hace falta el registro de búsqueda (skill club-sourcing 0.5)' };
  if (valor.legacy === true) {
    if (typeof valor.texto !== 'string' || !valor.texto.trim()) return { ok: false, motivo: '«legacy» sin «texto»' };
    if (!(legacy[club] || []).map(Number).includes(Number(anio))) return { ok: false, motivo: `«legacy» fuera de tools/sponsor-legacy.json (${club} ${anio}): la lista no crece` };
    return { ok: true, legacy: true, texto: valor.texto };
  }
  const problemas = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(valor.buscado || ''))) problemas.push('falta «buscado» (AAAA-MM-DD)');
  if (typeof valor.por !== 'string' || !valor.por.trim()) problemas.push('falta «por» (quién lo corrió)');
  const intentos = Array.isArray(valor.intentos) ? valor.intentos : [];
  if (!intentos.length) problemas.push('faltan los «intentos»');
  intentos.forEach((x, i) => {
    if (!CLASES.includes(x && x.clase)) problemas.push(`intento ${i + 1}: clase «${x && x.clase}» (${CLASES.join(', ')})`);
    if (!x || typeof x.donde !== 'string' || !x.donde.trim()) problemas.push(`intento ${i + 1}: falta «donde» (la URL o la consulta exacta)`);
    if (!RESULTADOS.includes(x && x.resultado)) problemas.push(`intento ${i + 1}: resultado «${x && x.resultado}» (${RESULTADOS.join(' | ')}; si algo lo encontró, se escribe el sponsor)`);
  });
  if (problemas.length) return { ok: false, motivo: problemas.join('; ') };
  const validos = intentos.filter((x) => x.clase !== 'wikipedia');
  const sinDato = new Set(validos.filter((x) => x.resultado === 'sin-dato').map((x) => x.clase));
  const todas = new Set(validos.map((x) => x.clase));
  if (todas.size < 3) return { ok: false, motivo: `el registro tiene ${todas.size} clase(s) sin contar Wikipedia (${[...todas].join(', ') || 'ninguna'}), hacen falta 3 (skill club-sourcing 0.5)` };
  if (sinDato.size < 2) return { ok: false, motivo: `a lo sumo una de las tres clases puede ser inaccesible; con resultado «sin-dato» hay ${sinDato.size} (${[...sinDato].join(', ') || 'ninguna'})` };
  if (![...sinDato].some((c) => ANCLAS.includes(c))) return { ok: false, motivo: `ninguna de ${ANCLAS.join(', ')} con resultado «sin-dato»` };
  return { ok: true, legacy: false };
}

module.exports = { validar, listaLegacy, CLASES };
