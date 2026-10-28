// tools/sponsors-diferencia.js — qué cambió en data/sponsors.js respecto de la versión anterior, para que generate-sponsors.js lo imprima al regenerar
// (antes había que comparar el diff a mano: las líneas de ese archivo tienen más de mil caracteres). Una entrada es la fila entera ([liga, temporada, equipo, clubId, rol, fuente?]):
// una que desaparece o cambia de fuente cuenta como PERDIDA y se avisa; lo nuevo se cuenta por liga y por sponsor. Solo lee.
const vm = require('node:vm');

// la lista de sponsors de un data/sponsors.js (texto); null si no hay o está roto
function leerLista(texto) {
  if (!texto) return null;
  try { const w = {}; vm.runInNewContext(texto, { window: w }); return w.SPONSORS?.lista || null; } catch { return null; }
}

function diferencia(vieja, nueva) {
  const V = vieja || {}; const N = nueva || {};
  const claves = (s) => new Set((s?.e || []).map((x) => JSON.stringify(x)));
  const d = { nuevas: 0, porLiga: {}, sponsorsNuevos: [], perdidas: [], sponsorsPerdidos: [] };
  for (const [id, s] of Object.entries(N)) {
    if (!V[id]) d.sponsorsNuevos.push(s.n);
    const antes = claves(V[id]);
    for (const e of s.e || []) if (!antes.has(JSON.stringify(e))) { d.nuevas++; d.porLiga[e[0]] = (d.porLiga[e[0]] || 0) + 1; }
  }
  for (const [id, s] of Object.entries(V)) {
    if (!N[id]) d.sponsorsPerdidos.push(s.n);
    const ahora = claves(N[id]);
    for (const e of s.e || []) if (!ahora.has(JSON.stringify(e))) d.perdidas.push(`${s.n}: ${e.slice(0, 4).join(' · ')}${e[5] ? ' (otra fuente)' : ''}`);
  }
  return d;
}

function resumen(d, { max = 10 } = {}) {
  const lineas = [];
  if (d.perdidas.length || d.sponsorsPerdidos.length) {
    lineas.push(`ATENCIÓN: se PIERDEN ${d.perdidas.length} entrada(s) que estaban${d.sponsorsPerdidos.length ? ` y ${d.sponsorsPerdidos.length} sponsor(s) entero(s) (${d.sponsorsPerdidos.slice(0, max).join(', ')})` : ''}:`);
    for (const p of d.perdidas.slice(0, max)) lineas.push(`  - ${p}`);
    if (d.perdidas.length > max) lineas.push(`  … y ${d.perdidas.length - max} más`);
  }
  if (!d.nuevas && !d.perdidas.length) lineas.push('respecto del archivo anterior: sin cambios.');
  else {
    const ligas = Object.entries(d.porLiga).sort((a, b) => b[1] - a[1]).map(([l, n]) => `${l} ${n}`).join(', ');
    lineas.push(`respecto del archivo anterior: +${d.nuevas} entradas${ligas ? ` (${ligas})` : ''}, +${d.sponsorsNuevos.length} sponsor(s) nuevo(s)${d.sponsorsNuevos.length ? `: ${d.sponsorsNuevos.slice(0, max).join(', ')}${d.sponsorsNuevos.length > max ? ` … y ${d.sponsorsNuevos.length - max} más` : ''}` : ''}.`);
  }
  return lineas.join('\n');
}

module.exports = { leerLista, diferencia, resumen };
