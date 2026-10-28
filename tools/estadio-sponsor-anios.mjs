// tools/estadio-sponsor-anios.mjs — `estadio-sponsor.mjs --ensayo --club X --anios 2016-2022`: el ensayo de varios años en una llamada, como una tabla año por año (ítem 15 del punto 478).
// POR QUÉ. El brief de estadio y sponsor pedía una llamada por año (7 para Envigado, 8 para Nacional) y el subagente salteó tres. Cada fila sale de la MISMA llamada de un año (`--anio`), así que es igual a las llamadas sueltas.
// La fila dice «falta completar» solo si la compuerta del año frena (línea «compuerta:» del ensayo) y «sin-fuente válido» si el año pasa con `sin-fuente`; los % cuentan lo que tiene valor.
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
// lo que dijo la compuerta en ese año (la línea «compuerta:» del ensayo con --club) y los campos con sin-fuente válido: con eso la fila dice
// «falta completar» solo cuando la compuerta frena, como la llamada suelta. Una salida sin esas líneas (otra versión) usa los porcentajes.
export function compuertaDe(salida) {
  const s = String(salida); const c = s.match(/^compuerta: (completo|falta (.+?)) \(|^compuerta: (completo)$/m);
  const sf = s.match(/^sin-fuente válido[^:]*: (.+)$/m);
  return { compuerta: c ? (c[1] === 'completo' || c[3] ? 'completo' : 'falta') : null, falta: c?.[2] || null, sinFuente: sf ? sf[1] : null };
}
export function tablaAnios(anios, correrUno) {
  const L = ['año   estadio  capacidad  sponsor  marca   (los % cuentan lo que tiene valor con fuente)'];
  let incompletos = 0; const cuenta = { conFuente: 0, sinFuente: 0, falta: 0 };
  for (const a of anios) {
    const salida = correrUno(a); const f = filaDe(salida);
    if (!f) { L.push(`${a}   sin datos (el ensayo de ese año no dio la línea de porcentajes: corré --anio ${a} para ver por qué)`); incompletos++; continue; }
    const p = (n) => `${n}%`.padStart(5); const c = compuertaDe(salida);
    const sfSp = /sponsor/.test(c.sinFuente || '');
    let nota;
    if (!c.compuerta) nota = [f.estadio, f.capacidad, f.sponsor, f.marca].some((x) => x < 100) ? '   ← falta completar' : '';
    else if (c.compuerta === 'falta') nota = `   ← falta completar (${c.falta})`;
    else {
      const sueltos = [['capacidad', f.capacidad], ['marca', f.marca]].filter(([k, x]) => x < 100 && !(c.sinFuente || '').includes(k)).map(([k]) => k);
      nota = `${c.sinFuente ? `   sin-fuente válido: ${c.sinFuente}` : ''}${sueltos.length ? `   sin ${sueltos.join(' ni ')} (no frena la compuerta)` : ''}`;
    }
    if (f.sponsor === 100) cuenta.conFuente++; else if (c.compuerta === 'falta' || (!c.compuerta && f.sponsor < 100)) cuenta.falta++; else if (sfSp) cuenta.sinFuente++;
    L.push(`${a}   ${p(f.estadio)}    ${p(f.capacidad)}     ${p(f.sponsor)}  ${p(f.marca)}${f.ejercicios === 1 ? '' : `   (${f.ejercicios} ejercicios)`}${nota}`);
  }
  // una sola línea de cierre (la prueba cuenta las líneas de la tabla)
  const n = anios.length - incompletos;
  const sp = n ? `sponsor: ${cuenta.conFuente} de ${n} año(s) con fuente (${Math.round((100 * cuenta.conFuente) / n)} %), ${cuenta.sinFuente} con sin-fuente válido, ${cuenta.falta} por completar. ` : '';
  L.push(sp + (incompletos ? `${incompletos} año(s) sin datos.` : 'Lo que dice «falta completar» se completa en tools/contexto-manual.json; «sin-fuente válido» ya pasa la compuerta.'));
  return L;
}
