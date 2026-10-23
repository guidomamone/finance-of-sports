#!/usr/bin/env node
// ============================================================================
// tools/partir-amortizacion.mjs — parte SOLA la línea de depreciación y amortización junta del estado de resultados con los importes de las notas.
//
// POR QUÉ. REGLA de Admin/CONVENCIONES-DATOS.md («una línea de depreciación y amortización junta se parte con las notas», votación 3 a 0): cuando el estado junta la amortización de los derechos de
// jugadores y la depreciación de bienes de uso («Abschreibungen auf immaterielle Vermögensgegenstände … und Sachanlagen», «Depreciation, amortisation and impairment») pero las notas las abren, se parte:
// jugadores a player_amortisation, el resto a depreciation. Ninguna tool lo aplicaba: se hacía a mano con ajustes `fila` (Silkeborg y Viborg 2025, Mönchengladbach 2022-24) y la cola proponía «sí» para
// la línea entera como amortización de jugadores.
//
// CÓMO. Solo propone si la aritmética CIERRA al importe: (T) el cuadro de movimiento del inmovilizado (Anlagenspiegel, «Kumulierte Abschreibungen»): la columna del cargo del ejercicio (más la columna
// de la depreciación extraordinaria) sumada sobre todas sus filas es la línea junta, y la parte de jugadores es la suma de las filas de jugadores; (N) dos notas separadas (una de jugadores, otra de bienes
// de uso) cuyos cargos del ejercicio suman la línea junta. Con una sola solución exacta escribe los ajustes `fila` + `categoria` de cada parte con su cita; si no cierra o hay más de una, NO escribe nada y lo
// dice (el caso queda en la cola, que es donde lo mira la sesión). Cualquier escala del documento (euros, miles) se prueba.
//
// USO:  node tools/partir-amortizacion.mjs <pdf …> | --lista <archivo> [--escribir]     (ensayo por defecto; lo corre lote.mjs antes de verificar)
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { filasDelMd } from './caja-deuda-md.mjs';
import { parseNumber } from './datos-sitio.mjs';
import { esTotal } from './vocabulario.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const JUNTA_RE = /(abschreibung|depreciation|amorti[sz]ation|afskriv|avskriv|depreciaci|amortizaci).*(sachanlagen|tangible|property|plant|equipment|materiel|bienes|inmoviliz|intangible|immateriell|vermögensgegenst|immaterielle)|depreciation,? (and |&)?(amorti[sz]ation|impairment)|amorti[sz]ation,? (and |&)?(depreciation|impairment)|af- og nedskrivninger/i;
const NO_JUNTA_RE = /accumulated|cumulat|kumuliert|nettobuchwert|net book|carrying|buchwert|reversal|zuschreibung|resultat|profit|result\b|ebit|before|før|vor |tilbageførsel/i;
const JUGADORES_RE = /spielerwert|player registration|players'? registrations?|registrations? of players|spillerrettigh|spelers?contract|derechos? (federativos|de jugadores)|jugadores|atletas|giocatori|diritti pluriennali|transfer fee|spillere|player contracts/i;
const CARGO_RE = /abschreibung des gesch|depreciation (charge )?for the (year|period)|charge for the (year|period)|(amortisation|amortization) (charge )?for the (year|period)|årets afskrivning|dotaci[óo]n|cargo del ejercicio|ammortament.*esercizio/i;
const EXTRAORD_RE = /a\.?\s?o\.?|außerplanm|impairment|nedskriv|deterioro|svalutaz/i;
const FILA_CARGO_RE = /(amorti[sz]ation|depreciation|afskrivninger?|abschreibung(en)?)[^|]*\b(for the (year|period)|during the (year|period)|i året)\b|charge for the (year|period)/i;

export const esLineaJunta = (etiqueta) => JUNTA_RE.test(String(etiqueta)) && !NO_JUNTA_RE.test(String(etiqueta));
const celdas = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
const num = (c) => { const n = parseNumber(c); return n === null || n === undefined || Number.isNaN(n) ? null : Math.abs(n); };
const fmt = (x) => { const [e, c] = Math.abs(x).toFixed(2).split('.'); return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${c}`; };
const cierra = (a, b, filas = 1) => Math.abs(a - b) <= Math.max(1, 0.5 * filas);

// bloques de tabla ('|') del md: { desde, filas:[{linea, cs}] }
function tablas(L) {
  const out = [];
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    out.push({ desde: a + 1, filas: L.slice(a, b).map((l, i) => ({ linea: a + i + 1, cs: celdas(l) })) });
    a = b;
  }
  return out;
}

// (T) el cuadro de movimiento: la columna del cargo del ejercicio (+ la extraordinaria) sumada sobre todas sus filas
function porCuadro(L, total) {
  const T = tablas(L); const sol = [];
  for (let i = 0; i < T.length; i++) {
    const cab = T[i].filas.find((f) => f.cs.some((c) => CARGO_RE.test(c))); if (!cab) continue;
    const c = cab.cs.findIndex((x) => CARGO_RE.test(x)); const c2 = EXTRAORD_RE.test(cab.cs[c + 1] || '') ? c + 1 : -1;
    // el cuadro se corta en páginas: las tablas siguientes (hasta 45 líneas) con el mismo encabezado son la continuación
    const grupo = [T[i]]; for (let j = i + 1; j < T.length && T[j].desde - (grupo[grupo.length - 1].filas.at(-1).linea) <= 45; j++) { if (T[j].filas.some((f) => f.cs.some((x) => CARGO_RE.test(x)))) grupo.push(T[j]); else break; }
    const filas = []; const vistos = new Set();
    for (const t of grupo) for (const f of t.filas) {
      const et = f.cs[0]; if (!et || /^:?-+:?$/.test(et) || f.cs.some((x) => CARGO_RE.test(x)) || esTotal(et) || /^(summe|total)\b/i.test(et)) continue;
      const v = num(f.cs[c]); if (v === null) continue;
      const v2 = c2 >= 0 ? (num(f.cs[c2]) || 0) : 0; if (vistos.has(f.linea)) continue; vistos.add(f.linea);
      filas.push({ linea: f.linea, etiqueta: et, valor: v + v2 });
    }
    if (filas.length < 2) continue;
    const suma = filas.reduce((s, f) => s + f.valor, 0);
    for (const k of [1, 1000, 0.001]) {
      if (!cierra(suma * k, total, filas.length)) continue;
      const jug = filas.filter((f) => JUGADORES_RE.test(f.etiqueta)); if (!jug.length) continue;
      const pj = jug.reduce((s, f) => s + f.valor, 0) * k;
      sol.push({ via: 'cuadro de movimiento', jugadores: pj, resto: total - pj, cita: `L${jug.map((f) => f.linea).join(', L')} (jugadores) y el cuadro de L${grupo[0].desde} a L${grupo.at(-1).filas.at(-1).linea}` });
    }
  }
  return sol;
}

// (N) dos notas: un cargo del ejercicio en el contexto de jugadores y otro fuera de él que suman la línea junta
function porNotas(texto, L, total) {
  const cand = [];
  // la fila «Amortisation for the year» / «Depreciation during the year» / «Afskrivninger i året …» de una nota; su valor es la suma de sus columnas (clases de activo)
  L.forEach((l, i) => {
    if (!l.trim().startsWith('|')) return;
    const cs = celdas(l); const et = cs[0] || '';
    if (!FILA_CARGO_RE.test(et) || /beginning|01\.\d\d\.|as at|reversal|tilbageførsel/i.test(et)) return;
    const vs = cs.slice(1).map(num).filter((v) => v !== null); if (!vs.length) return;
    // a qué nota pertenece la fila: la mención más cercana hacia arriba (18 líneas) de «intangibles» o de «bienes de uso»; «jugadores» explícito en 40 líneas también cuenta
    const vent = L.slice(Math.max(0, i - 18), i + 1); const ult = (re) => vent.reduce((a, x, k) => (re.test(x) ? k : a), -1);
    const iInt = ult(/intangible|immaterielle|immateriell|rettigheder/i); const iTan = ult(/property, plant|(?<!in)tangible assets|materielle|sachanlagen|leasehold|land and buildings/i);
    const jugExpl = JUGADORES_RE.test(L.slice(Math.max(0, i - 40), i + 1).join(' '));
    cand.push({ linea: i + 1, valor: vs.reduce((s, v) => s + v, 0), jug: jugExpl || iInt > iTan, intangible: iInt > iTan });
  });
  // las notas de intangibles valen como «jugadores» solo si el documento habla de jugadores o de derechos contractuales en algún lado
  const habla = JUGADORES_RE.test(texto) || /contractual rights|transfer(s)? of players|spillere/i.test(texto);
  if (!habla) return [];
  const sol = [];
  for (const p of cand.filter((x) => x.jug)) for (const r of cand.filter((x) => !x.jug && x.linea !== p.linea)) for (const k of [1, 1000, 0.001]) {
    if (cierra((p.valor + r.valor) * k, total)) sol.push({ via: 'dos notas', jugadores: p.valor * k, resto: r.valor * k, cita: `L${p.linea} (jugadores) y L${r.linea} (bienes de uso)` });
  }
  return sol;
}

export function proponer(pdf) {
  const md = pdf.replace(/\.pdf$/i, '.md'); if (!existsSync(resolve(ROOT, md))) return { pdf, error: 'sin .md' };
  const texto = readFileSync(resolve(ROOT, md), 'utf8'); const L = texto.split('\n');
  const junta = filasDelMd(texto).find((f) => f.cifras.length && JUNTA_RE.test(String(f.etiqueta)) && !NO_JUNTA_RE.test(String(f.etiqueta)) && L[f.linea - 1].trim().startsWith('|'));
  if (!junta) return { pdf, sin: 'no hay una línea de depreciación y amortización junta en el estado' };
  const total = Math.abs(junta.cifras[0]);
  const soluciones = [...porCuadro(L, total), ...porNotas(texto, L, total)];
  // una solución repetida (el mismo partido por dos vías) cuenta una vez
  const unicas = soluciones.filter((s, i) => soluciones.findIndex((t) => cierra(t.jugadores, s.jugadores)) === i);
  if (unicas.length !== 1) return { pdf, junta: { linea: junta.linea, etiqueta: junta.etiqueta, total }, sin: unicas.length ? `${unicas.length} formas distintas de partirla: no decide` : 'las notas no abren la línea con una suma que cierre' };
  return { pdf, md, junta: { linea: junta.linea, etiqueta: String(junta.etiqueta).trim(), total }, ...unicas[0] };
}

function ajustesDe(pdf) { try { return readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8').split('\n').filter((l) => l.includes(JSON.stringify(pdf))); } catch { return []; } }

export function aplicar(p, { escribir }) {
  const J = p.junta; const base = J.etiqueta.replace(/^\d+\.\s*/, '');
  const eJug = `${base} — derechos de jugadores (según ${p.via})`; const eResto = `${base} — resto: bienes de uso y licencias (según ${p.via})`;
  if (ajustesDe(p.pdf).some((l) => l.includes('"campo":"fila"') && (l.includes(`"reemplazaLinea":${J.linea}`) || l.includes(JSON.stringify(eJug))))) return 'ya partida';
  const motivo = `partir-amortizacion.mjs (REGLA de la línea de depreciación y amortización junta): «${J.etiqueta}» (${fmt(J.total)}, L${J.linea}) = jugadores ${fmt(p.jugadores)} + resto ${fmt(p.resto)}, según ${p.via}: ${p.cita}`;
  const cmds = [
    [p.pdf, 'fila', '--valor', fmt(p.jugadores), '--etiqueta', eJug, '--lado', 'gasto', '--reemplaza-linea', String(J.linea), '--motivo', motivo, '--evidencia', p.cita],
    [p.pdf, 'fila', '--valor', fmt(p.resto), '--etiqueta', eResto, '--lado', 'gasto', '--linea', String(J.linea), '--motivo', motivo, '--evidencia', p.cita],
    [p.pdf, 'categoria', '--valor', 'player_amortisation', '--etiqueta', eJug, '--motivo', motivo, '--evidencia', p.cita],
    [p.pdf, 'categoria', '--valor', 'depreciation', '--etiqueta', eResto, '--motivo', motivo, '--evidencia', p.cita],
  ];
  if (!escribir) return `partiría en ${fmt(p.jugadores)} + ${fmt(p.resto)}`;
  for (const c of cmds) execFileSync('node', [resolve(ROOT, 'tools/ajustes.mjs'), '--agregar', ...c, '--autor', 'partir-amortizacion'], { cwd: ROOT, stdio: 'ignore' });
  return `partida en ${fmt(p.jugadores)} + ${fmt(p.resto)} (4 ajustes)`;
}

// para lote.mjs: devuelve cuántos documentos partió
export function partirDocumentos(pdfs, { escribir, avisar = true }) {
  let n = 0;
  for (const pdf of pdfs) {
    const p = proponer(pdf);
    if (p.error || p.sin) { if (avisar && p.sin && p.junta) console.log(`  ${pdf.split('/').slice(2).join('/')}: línea junta «${p.junta.etiqueta}» (${fmt(p.junta.total)}): ${p.sin}`); continue; }
    const r = aplicar(p, { escribir }); if (r !== 'ya partida') n++;
    console.log(`  ${pdf.split('/').slice(2).join('/')}: «${p.junta.etiqueta}» ${r}: jugadores ${fmt(p.jugadores)} + resto ${fmt(p.resto)} = ${fmt(p.junta.total)} (${p.via}; ${p.cita})`);
  }
  return n;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const i = A.indexOf('--lista');
  const pdfs = i >= 0 ? readFileSync(resolve(ROOT, A[i + 1]), 'utf8').split('\n').map((s) => s.trim()).filter(Boolean) : A.filter((a) => !a.startsWith('--'));
  if (!pdfs.length) { console.error('Uso: node tools/partir-amortizacion.mjs <pdf …> | --lista <archivo> [--escribir]'); process.exit(1); }
  const n = partirDocumentos(pdfs, { escribir: A.includes('--escribir') });
  console.log(`${n} documento(s) ${A.includes('--escribir') ? 'partidos' : 'que se partirían (--escribir los parte)'}.`);
}
