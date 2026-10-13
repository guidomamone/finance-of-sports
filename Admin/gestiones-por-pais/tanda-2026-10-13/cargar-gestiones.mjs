// uso (desde la raíz del repo): node Admin/gestiones-por-pais/tanda-2026-10-13/cargar-gestiones.mjs Admin/gestiones-por-pais/tanda-2026-10-13 [--lotes 7,8,9,10] [--escribir]
// Sin --escribir es un ensayo. Ya se corrió con los lotes 1 a 6 (2026-10-13, 48 clubes). Frena si un club ya tiene gestiones en su archivo:
// los de la tanda 2 que ya tienen algunas cargadas (Criciúma, CRB, Vila Nova, Remo, Paysandu, Goiás, Cruzeiro...) hay que REEMPLAZARLOS a mano.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import * as EV from '../../../tools/evidencia-club.mjs';
const [D] = process.argv.slice(2); const ESCRIBIR = process.argv.includes('--escribir');
const HOLD = new Set(['americamineiro-br','coritiba','vascodagama-br','fortaleza-br','rbbragantino-br','ferroviaria-br','novorizontino-br','cuiaba-br',
  'lokomotivmoscow-ru','dynamomoscow-ru','baltikakaliningrad-ru','parinizhnynovgorod-ru','sochi-ru','rubinkazan-ru',
  'koln-de','hamburgersv-de','rbleipzig-de','monchengladbach-de','clubamerica','alianzalima-pe']);
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const porPais = {}; const evid = []; const criterios = {}; let n = 0, clubes = 0;
const iL = process.argv.indexOf('--lotes'); const LOTES = iL > 0 ? process.argv[iL + 1].split(',').map(Number) : [1, 2, 3, 4, 5, 6];
for (const k of LOTES) {
  const L = JSON.parse(readFileSync(`${D}/lote-${k}.json`)); const R = JSON.parse(readFileSync(`${D}/resultado-${k}.json`));
  Object.assign(criterios, R.criterioPais || {});
  for (const [pais, cs] of Object.entries(L)) for (const c of cs) {
    if (LOTES.some((x) => x <= 6) && HOLD.has(c.clubId)) continue; // HOLD: los que en la tanda 1 esperaban una decisión de criterio (ya tomada)
    const V = (R.clubes || {})[c.clubId]; if (!V) continue;
    const G = (V.gestiones || []).filter((g) => g.confirmada === true).sort((a, b) => a.desde.localeCompare(b.desde));
    if (!G.length) continue;
    clubes++; n += G.length;
    const iso = pais.toLowerCase();
    const lin = G.map((g) => `    { nombre:${q(g.nombre)}, corto:${q(g.corto)}, cargo:${q(g.cargo)}, desde:${q(g.desde)}, hasta:${g.hasta ? q(g.hasta) : 'null'},\n      fuente:${q(g.fuente)}, confirmada:true },`);
    (porPais[iso] ||= []).push(`  ${q(c.clubId)}: [\n${lin.join('\n')}\n  ],`);
    const notas = G.map((g) => `${g.nombre} (${g.desde} a ${g.hasta || 'hoy'}): ${(V.notas || {})[g.nombre] || 'sin nota'}`);
    const sinConf = (V.gestiones || []).filter((g) => g.confirmada !== true).map((g) => `SIN CONFIRMAR, no cargada: ${g.nombre} (${g.desde} a ${g.hasta || 'hoy'}), ${g.fuente}: ${(V.notas || {})[g.nombre] || ''}`);
    const dudas = (V.dudas || []).map((d) => `Duda: ${d}`);
    evid.push({ id: c.clubId, lineas: [...notas, ...sinConf, ...dudas] });
  }
}
for (const [iso, bloques] of Object.entries(porPais)) {
  const f = `data/gestiones/${iso}.js`;
  const nuevo = !existsSync(f);
  let s = nuevo ? `window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};\n\nObject.assign(window.CLUB_GESTIONES, {\n});\n` : readFileSync(f, 'utf8');
  for (const b of bloques) { const id = b.match(/^  '([^']+)'/)[1]; if (s.includes(`'${id}': [`)) throw new Error(`${id} ya tiene gestiones en ${f}`); }
  const i = s.lastIndexOf('});'); s = s.slice(0, i) + bloques.join('\n') + '\n' + s.slice(i);
  console.log(`${f}${nuevo ? ' (NUEVO)' : ''}: ${bloques.length} clubes`);
  if (ESCRIBIR) writeFileSync(f, s);
}
for (const e of evid) if (ESCRIBIR) EV.guardar(e.id, EV.agregarSeccion(EV.leer(e.id), 'Gestiones', e.lineas, 'investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195'));
console.log(`${clubes} clubes, ${n} gestiones confirmadas; evidencia en ${evid.length} .md${ESCRIBIR ? '' : '  (ENSAYO)'}`);
writeFileSync(`${D}/criterios.json`, JSON.stringify(criterios, null, 1));
