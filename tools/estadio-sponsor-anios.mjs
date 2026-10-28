// tools/estadio-sponsor-anios.mjs — `estadio-sponsor.mjs --ensayo --club X --anios 2016-2022`: el ensayo de varios años en una llamada, como una tabla año por año (ítem 15 del punto 478).
// POR QUÉ. El brief de estadio y sponsor pedía una llamada por año (7 para Envigado, 8 para Nacional) y el subagente salteó tres. Cada fila sale de la MISMA llamada de un año (`--anio`), así que es igual a las llamadas sueltas.
// ENTRADA: la lista de años («2016-2022», «2016,2018-2020») y `correrUno(anio)` que devuelve la salida del ensayo de ese año. SALIDA: las líneas de la tabla. USO: import { parseAnios, tablaAnios } from './estadio-sponsor-anios.mjs'.
// Prueba: node tools/probar-estadio-sponsor-anios.mjs
export function parseAnios(txt) {
  const out = new Set();
  for (const parte of String(txt || '').split(',').map((x) => x.trim()).filter(Boolean)) {
    const m = parte.match(/^(\d{4})(?:-(\d{4}))?$/); if (!m) throw new Error(`--anios: «${parte}» no es AAAA ni AAAA-AAAA`);
    const [a, b] = [Number(m[1]), Number(m[2] || m[1])]; if (b < a) throw new Error(`--anios: «${parte}» va al revés`);
    for (let y = a; y <= b; y++) out.add(y);
  }
  if (!out.size) throw new Error('--anios pide al menos un año');
  return [...out].sort((a, b) => a - b);
}
const RE = /de (\d+) ejercicios: estadio (\d+) \((\d+)%\) · capacidad (\d+) \((\d+)%\) · sponsor (\d+) \((\d+)%\) · marca (\d+) \((\d+)%\)/;
export function filaDe(salida) {
  const m = String(salida).match(RE);
  return m ? { ejercicios: +m[1], estadio: +m[3], capacidad: +m[5], sponsor: +m[7], marca: +m[9] } : null;
}
export function tablaAnios(anios, correrUno) {
  const L = ['año   estadio  capacidad  sponsor  marca'];
  let incompletos = 0;
  for (const a of anios) {
    const f = filaDe(correrUno(a));
    if (!f) { L.push(`${a}   sin datos (el ensayo de ese año no dio la línea de porcentajes: corré --anio ${a} para ver por qué)`); incompletos++; continue; }
    const p = (n) => `${n}%`.padStart(5);
    L.push(`${a}   ${p(f.estadio)}    ${p(f.capacidad)}     ${p(f.sponsor)}  ${p(f.marca)}${f.ejercicios === 1 ? '' : `   (${f.ejercicios} ejercicios)`}${[f.estadio, f.capacidad, f.sponsor, f.marca].some((x) => x < 100) ? '   ← falta completar' : ''}`);
  }
  L.push(incompletos ? `${incompletos} año(s) sin datos.` : 'Lo que da 0 % es lo que se completa en tools/contexto-manual.json; lo que da 100 % no hace falta.');
  return L;
}
