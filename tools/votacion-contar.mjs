#!/usr/bin/env node
// ============================================================================
// tools/votacion-contar.mjs — cuenta los votos de una votación de criterios (skill votacion-de-criterios, sección 4) y verifica sus citas
//
// Cada voto es un JSON (lo arma el votante con la forma de `fos votacion nueva`): { opcion, criterios: { "1".."9": { valor, cita: { ref, texto, mismo_hecho } } }, anios_que_cambian: [...], no_abri: [...] }.
// Reglas de la skill:
//   - Una cita se verifica con votacion-citas.mjs. Un precedente (criterios 1 a 3) cuya cita no se verifica, o que no dice `mismo_hecho: true`, NO suma.
//   - DECIDIDO: 3 a 0, o 2 a 1 si el voto en minoría no tiene ningún precedente 1 a 3 verificado y del mismo hecho a su favor.
//   - A GUIDO: empate, un 2 a 1 con un precedente 1 a 3 verificado del mismo hecho en minoría, o una opción que cambia más de 10 años ya cargados.
//
// USO: node tools/votacion-contar.mjs <voto1.json> <voto2.json> <voto3.json> [--caso "texto"] [--sesion unica] [--escribir]
//   --escribir anota la línea en Admin/registros/auditoria-proceso.jsonl (votos como letras, como las anteriores, más `esquema`, `tipo: votacion` y `veredicto_codigo`).
// ============================================================================
import { readFileSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { verificarCita } from './votacion-citas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const MAX_ANIOS = 10;

// Cuenta una lista de votos ya leídos. Devuelve { veredicto, motivo, tally, ganadora, noSuman, sinAbrir }.
export function contar(votos, { verificar = verificarCita } = {}) {
  const noSuman = [], sinAbrir = [];
  const conPrecedente = votos.map((v, i) => {
    const cuenta = [];
    for (const k of ['1', '2', '3']) {
      const c = v.criterios?.[k];
      if (!c || c.valor !== 'a favor') continue;
      const r = verificar(c.cita);
      if (!r.ok) { noSuman.push(`voto ${i + 1} (${v.opcion}), criterio ${k}: ${r.motivo}`); continue; }
      if (c.cita.mismo_hecho !== true) { noSuman.push(`voto ${i + 1} (${v.opcion}), criterio ${k}: la cita no dice mismo_hecho: true (el precedente tiene que ser el mismo hecho económico)`); continue; }
      cuenta.push(k);
    }
    for (const r of v.no_abri || []) sinAbrir.push(`voto ${i + 1} (${v.opcion}): no abrió ${r}`);
    return cuenta.length > 0;
  });
  const tally = {}; for (const v of votos) tally[v.opcion] = (tally[v.opcion] || 0) + 1;
  const orden = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const [ganadora, n] = orden[0];
  if (orden.length > 1 && orden[1][1] === n) return { veredicto: 'A GUIDO', motivo: `empate (${orden.map(([o, c]) => `${o} ${c}`).join(', ')})`, tally, ganadora: null, noSuman, sinAbrir };
  if (n <= votos.length / 2) return { veredicto: 'A GUIDO', motivo: `ninguna opción tiene mayoría (${orden.map(([o, c]) => `${o} ${c}`).join(', ')})`, tally, ganadora: null, noSuman, sinAbrir };
  const anios = Math.max(0, ...votos.filter((v) => v.opcion === ganadora).map((v) => (v.anios_que_cambian || []).length));
  if (anios > MAX_ANIOS) return { veredicto: 'A GUIDO', motivo: `la opción ${ganadora} cambia ${anios} años ya cargados (más de ${MAX_ANIOS})`, tally, ganadora, noSuman, sinAbrir };
  if (n < votos.length) {
    const minoriaConPrecedente = votos.some((v, i) => v.opcion !== ganadora && conPrecedente[i]);
    if (minoriaConPrecedente) return { veredicto: 'A GUIDO', motivo: `${orden.map(([o, c]) => `${o} ${c}`).join(' a ')} y el voto en minoría tiene un precedente 1 a 3 verificado del mismo hecho`, tally, ganadora, noSuman, sinAbrir };
    return { veredicto: 'DECIDIDO', motivo: `${orden.map(([o, c]) => `${o} ${c}`).join(' a ')}; el voto en minoría no tiene un precedente 1 a 3 verificado del mismo hecho`, tally, ganadora, noSuman, sinAbrir };
  }
  return { veredicto: 'DECIDIDO', motivo: `${votos.length} a 0 por ${ganadora}`, tally, ganadora, noSuman, sinAbrir };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const val = (k) => { const i = A.indexOf(k); return i < 0 ? undefined : A[i + 1]; };
  const archivos = A.filter((a, i) => !a.startsWith('--') && !['--caso', '--sesion'].includes(A[i - 1]));
  if (archivos.length < 1) { console.error('Uso: node tools/votacion-contar.mjs <voto.json …> [--caso "texto"] [--sesion unica] [--escribir]'); process.exit(1); }
  const votos = archivos.map((f) => JSON.parse(readFileSync(resolve(f), 'utf8')));
  const r = contar(votos);
  console.log(`Votos: ${votos.map((v) => v.opcion).join(' ')}  →  ${r.veredicto}: ${r.motivo}`);
  if (r.noSuman.length) console.log(`Precedentes que NO suman (${r.noSuman.length}):\n  ${r.noSuman.join('\n  ')}`);
  if (r.sinAbrir.length) console.log(`Rutas que un votante dijo no haber abierto (${r.sinAbrir.length}):\n  ${r.sinAbrir.join('\n  ')}`);
  if (A.includes('--escribir')) {
    const caso = val('--caso'); if (!caso) { console.error('--escribir pide --caso "<el caso>"'); process.exit(1); }
    const linea = { fecha: new Date().toISOString().slice(0, 10), sesion: val('--sesion') || 'unica', cambio: `votación: ${caso}`, veredicto: r.veredicto, motivo: r.motivo, votos: votos.map((v) => v.opcion), esquema: 1, tipo: 'votacion', veredicto_codigo: r.veredicto === 'DECIDIDO' ? 'decidido' : 'a-guido', anios_cargados_que_cambian: Math.max(0, ...votos.map((v) => (v.anios_que_cambian || []).length)) };
    appendFileSync(resolve(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl'), `${JSON.stringify(linea)}\n`);
    console.log('Anotado en Admin/registros/auditoria-proceso.jsonl.');
  }
  process.exit(0);
}
