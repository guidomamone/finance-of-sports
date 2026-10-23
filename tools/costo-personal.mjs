// ============================================================================
// tools/costo-personal.mjs — EL COSTO DE PERSONAL (fiscalYearMeta.staffCost) de un club ya publicado: candidatos, Jev, plausibilidad, ajustes que parten la fila global
// y la medición contra Admin/mediciones/personal-verdad.tsv. Se mudó TAL CUAL de tools/caja-deuda.mjs (movimiento puro): se corre con
// `node tools/caja-deuda.mjs --personal …` (ver el despachador de caja-deuda.mjs). Usa los ayudantes de caja-deuda.mjs (sitio, pedirJev, filas del .md…) y caja-deuda.mjs
// importa de acá: el ciclo es a propósito y seguro porque ninguna constante de este módulo usa un ayudante al evaluarse (solo adentro de funciones).
// ============================================================================
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import * as EV from './evidencia-club.mjs';
import { esTotal } from './vocabulario.mjs';
import { modificarClub } from './club-json.mjs';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { categoriaDeSueldos, deporteDeClub, deporteEnFrase } from './deporte-club.mjs';
import { coincide, parseNumber, filasDelMd, r6, avisarRecorte, pedirJev, sitio, escalaDe, aniosDe, filasCache, HOY } from './caja-deuda.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// ============================================================================
// EL DATO "PERSONAL" (to-do 229 + 232 s, diseño aprobado por Guido el 2026-10-14): fiscalYearMeta.staffCost, el TOTAL del costo de personal
// del ejercicio (sueldos + cargas sociales + otros beneficios). Interno (el sitio no lo muestra): lo usan cargar.mjs para separar los sueldos
// de una fila global (229) y audit.js para avisar sueldos escondidos (232 s). Modo aparte (--personal), así caja y deuda no se tocan.
//   CANDIDATOS  las filas de TOTAL (esTotal, de vocabulario.mjs, ya multilingüe) de TODAS las tablas de TODOS los documentos del club con
//               el mismo cierre (Volos lo trae en Volos_notes, no en el estado), cada una con su tabla: el texto de arriba, el encabezado y
//               las primeras filas. Sin reglas por idioma.
//   ESCALÓN 1b  Jev elige UNA (opción cerrada, o "ninguna"). Sin IA cara: si no pasa, queda sin dato.
//   COMPUERTA   la cifra impresa x la escala de su documento, distinta de 0, y un vecino que coincide: la fila que Jev eligió en el año
//               SIGUIENTE trae este valor en su columna del año anterior, o staffCost ya cargado del año anterior es la columna del año
//               anterior de esta fila. En contra, cualquiera de los dos. El año ANTERIOR por Jev solo suma a favor (puede reexpresar).
//   Casos: Panetolikos 2022 "Σύνολο" de "Παροχές σε εργαζόμενους" 1.566.222,00 (L1470); Volos 2022 "Σύνολο κόστους μισθοδοσίας
//   περιόδου" 2.262.043,33 (Volos_notes_2022). PAOK no tiene una fila total (Αμοιβές προσωπικού por cuadro de función): sin dato.
// ============================================================================
const CACHE_JEV_P = resolve(ROOT, 'Generados', '_cache', 'jev-personal.jsonl');
const PERSONAL_MIN_SOBRE_INGRESOS = 0.15; // plausibilidad del costo de personal contra los ingresos del año (TODO 351)
export function candidatosPersonal(md) {
  const txt = readFileSync(resolve(ROOT, md), 'utf8'); const L = txt.split('\n');
  const porLinea = new Map(filasDelMd(txt).map((f) => [f.linea, f]));
  const celdas = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
  const out = [];
  for (let a = 0; a < L.length;) {
    if (!L[a].trim().startsWith('|')) { a++; continue; }
    let b = a; while (b < L.length && L[b].trim().startsWith('|')) b++;
    const enc = celdas(L[a]).filter((c) => c && !/^:?-+:?$/.test(c) && /\p{L}/u.test(c)).join(' / ');
    const arriba = []; for (let k = a - 1; k >= 0 && arriba.length < 2 && a - k < 6; k--) { const t = L[k].trim(); if (t && !t.startsWith('|') && !/^-+\s*p[aá]g/i.test(t) && !/^!\[/.test(t)) arriba.unshift(t.replace(/[#*>]/g, '').trim().slice(0, 160)); }
    const primeras = []; for (let k = a; k < b && primeras.length < 3; k++) { const f = porLinea.get(k + 1); if (f && !esTotal(f.etiqueta)) primeras.push(String(f.etiqueta).slice(0, 50)); }
    for (let k = a; k < b; k++) {
      const f = porLinea.get(k + 1);
      if (f && esTotal(f.etiqueta) && f.cifras.length) out.push({ md, linea: k + 1, etiqueta: f.etiqueta, cifras: f.cifras, tabla: (celdas(L[a]).find((c) => /\p{L}{3,}/u.test(c)) || '').slice(0, 80), contexto: [arriba.join(' '), enc && `encabezado: ${enc}`, primeras.length && `filas: ${primeras.join(' / ')}`].filter(Boolean).join(' · ').slice(0, 300) });
      // (to-do 339, frenado de Bath) TOTAL SIN RÓTULO: la última fila de una tabla que no tiene etiqueta ("| | 14,885,763 | 12,165,369 |" debajo de los tres renglones de la nota «Staff costs»).
      // Sin vocabulario ni idioma: es candidata SOLO si su primera cifra es la suma EXACTA de la primera cifra de las filas con etiqueta que tiene arriba en la misma tabla (al menos dos).
      if (k === b - 1) {
        const cs = celdas(L[k]); const sinRotulo = cs.length >= 2 && !cs[0] && cs.slice(1).some((c) => /\d/.test(c));
        const nums = sinRotulo ? cs.slice(1).map(parseNumber).filter((n) => n !== null) : [];
        if (nums.length) {
          const arribaFilas = []; for (let q = a; q < k; q++) { const g = porLinea.get(q + 1); if (g && g.etiqueta && !esTotal(g.etiqueta) && g.cifras.length) arribaFilas.push(Math.abs(g.cifras[0])); }
          const suma = arribaFilas.reduce((x, y) => x + y, 0);
          if (arribaFilas.length >= 2 && Math.abs(suma - Math.abs(nums[0])) <= Math.max(0.5, 5e-4 * Math.abs(nums[0]))) out.push({ md, linea: k + 1, etiqueta: '(total sin rótulo: suma las filas de arriba)', cifras: nums.map(Math.abs), tabla: (celdas(L[a]).find((c) => /\p{L}{3,}/u.test(c)) || '').slice(0, 80), contexto: [arriba.join(' '), enc && `encabezado: ${enc}`, primeras.length && `filas: ${primeras.join(' / ')}`].filter(Boolean).join(' · ').slice(0, 300) });
        }
      }
    }
    a = b;
  }
  return out;
}
// ESCALÓN 1 (TODO 368): la nota de personal por su ESTRUCTURA, sin preguntarle a Jev. Es candidata la tabla cuyo total sin rótulo es la suma EXACTA de las filas de arriba (la identidad que
// candidatosPersonal ya exige) y cuyas primeras filas son de personal: al menos dos de {sueldos, cargas sociales, pensiones}. Se prefieren las del propio documento del año; si hay más de una,
// no decide (Jev elige). La escala la dice el encabezado de la tabla (£000, £m…), no el documento.
const ROLES_PERSONAL = [/wages|salar|sueldo|gehalt|l[öo]hne|ordenado|remunera/i, /social (security|charges|insurance|contributions)|national insurance|cargas sociales|sociale (lasten|zekerheid)|encargos sociais/i, /pension|retirement|jubila|aposentad/i];
const REEXPRESADO_RE = /restat|reexpres|reformulad/i;
export function escalaDeEncabezado(ctx) {
  const enc = String(ctx || '').match(/encabezado: (.*?)(?: · filas:|$)/)?.[1] || '';
  if (/(?<!\d)['’]?000\b|thousand|tusind|tuhat|duizend/i.test(enc)) return 0.001;
  if (/(?:^|[\s£€$])m(?:$|\s)|million|millones/i.test(enc)) return 1;
  return null;
}
export function estructuraDePersonal(cands, md) {
  const esNota = (c) => /^\(total sin rótulo/.test(String(c.etiqueta)) && ROLES_PERSONAL.filter((re) => re.test(String(c.contexto).match(/filas: (.*)$/)?.[1] || '')).length >= 2;
  const propias = cands.filter((c) => c.md === md && esNota(c));
  const grupo = propias.length ? propias : cands.filter(esNota);
  if (grupo.length !== 1) return null;
  return { fila: grupo[0], factor: escalaDeEncabezado(grupo[0].contexto) };
}
async function jevPersonal(cands, ejecutar, deporte) {
  if (!cands.length) return { error: 'sin filas de total' };
  const cs = cands.slice(0, 150); avisarRecorte(cands[0].md, 'Jev (personal), filas de total', cs.length, cands.length);
  const criteria = { ...Object.fromEntries(cs.map((c, i) => [`c${i}`, `${c.md.split('/').pop()} L${c.linea}: ${String(c.etiqueta).slice(0, 80)} | ${c.cifras.slice(0, 2).join(' | ')} (${c.contexto})`])), ninguna: 'Ninguna de estas filas es el total del costo de personal del ejercicio' };
  const body = { state: 'Filas de TOTAL de las tablas de los documentos contables de UN ejercicio de un club de ' + deporteEnFrase(deporte) + ', cada una con su tabla (texto de arriba, encabezado, primeras filas). Cifras: del ejercicio | del anterior.', model: 'jev-latest',
    questions: { personal: { type: 'choice', instructions: '¿Cuál es el TOTAL del costo de personal del ejercicio: sueldos y salarios + cargas sociales + otros beneficios, de todo el personal (jugadores y empleados)? No es: una parte (solo cargas sociales, solo un sector), una provisión, una cantidad de empleados. Si ninguna fila lo es, elegí "ninguna".', criteria } } };
  const r = await pedirJev(body, CACHE_JEV_P, ejecutar, (a) => (a.personal?.choice ? { eleccion: a.personal.choice, conf: a.personal.confidence } : null));
  if (r.datos) { const i = /^c\d+$/.test(r.datos.eleccion) ? Number(r.datos.eleccion.slice(1)) : null; r.fila = i != null ? cs[i] : null; }
  return r;
}
// El cierre de un documento: el de periodo.mjs o, si no lo leyó, el deducido de sus vecinos (cierre-vecinos.mjs, el mismo de cargar.mjs y
// verificar.mjs): Volos_notes_2022 no trae la fecha legible y su total de personal está ahí.
export function cierreDeMd(md, reg) { const pdf = md.replace(/\.md$/i, '.pdf'); const e = reg.get(pdf); return e?.periodo?.cierre || cierrePorVecinos(pdf, [...reg.values()])?.cierre || null; }
async function personalDelClub(clubId, d, S, { ejecutar = false, reg }) {
  const anios = aniosDe(d, S).filter((x) => x.md); const filasDe = filasCache();
  const carpeta = (md) => md.split('/').slice(0, 3).join('/') + '/';
  const porAnio = new Map(); let usd = 0; let ensayos = 0;
  for (const a of anios) {
    const cierre = cierreDeMd(a.md, reg);
    const mds = [a.md, ...[...reg.values()].filter((e) => e.md && e.md !== a.md && e.pdf.startsWith(carpeta(a.md)) && cierre && cierreDeMd(e.md, reg) === cierre && existsSync(resolve(ROOT, e.md))).map((e) => e.md)];
    const cands = mds.flatMap(candidatosPersonal);
    // (to-do 339) la escala del año con la misma escalera que caja y deuda (ajuste `escala`, líneas cargadas, y la escala del estado que registró verificar.mjs si contradice a la escala 1).
    // La escala que imprime el encabezado de la propia tabla de personal manda sobre la del documento (una nota en £m dentro de un documento en £000).
    const escalaDeFila = (fila, delEncabezado) => (fila ? (delEncabezado ?? escalaDe(fila.md, a.anio, filasDe(fila.md), d.revenueLinesByYear?.[a.anio], anios) ?? escalaDe(a.md, a.anio, filasDe(a.md), d.revenueLinesByYear?.[a.anio], anios)) : null);
    const ingresos = ((d.revenueLinesByYear || {})[a.anio] || []).reduce((s, l) => s + Math.max(0, l.amountNative || 0), 0);
    const plausible = (fila, factor) => !fila || !factor || !(ingresos > 0) || (fila.cifras[0] * factor) / ingresos >= PERSONAL_MIN_SOBRE_INGRESOS;
    // ESCALÓN 1: la nota de personal por su estructura, en el documento del año. Si no pasa la plausibilidad (otra tabla con filas parecidas, o la sociedad sola sin los jugadores), Jev elige, pero SOLO entre las
    // filas de ese documento: la nota de OTRO documento del grupo es de otro perímetro que el cargado, y un costo de personal que no coincide con las líneas del año produce un aviso `sueldos-escondidos` falso (Aston Villa 2023-24).
    const est = estructuraDePersonal(cands, a.md);
    const factorEst = est ? escalaDeFila(est.fila, est.factor) : null;
    const usaEstructura = !!est && plausible(est.fila, factorEst);
    const r = usaEstructura ? { estructura: true, fila: est.fila, datos: { conf: 'estructura' } } : await jevPersonal(est ? cands.filter((c) => c.md === a.md) : cands, ejecutar, deporteDeClub(clubId));
    if (r.ensayo) { usd += r.usd; ensayos++; }
    else usd += r.costo || 0;
    const fila = r.fila || null;
    const factor = usaEstructura ? factorEst : escalaDeFila(fila, null);
    porAnio.set(a.anio, { a, fila, factor, jev: r, estructura: usaEstructura, ndocs: mds.length, ncands: cands.length });
  }
  const res = [];
  for (const [anio, x] of porAnio) {
    const base = { clubId, anio, real: x.a.m.staffCost ?? null };
    if (!x.fila) { res.push({ ...base, valor: null, como: x.jev.ensayo ? `ensayo Jev (~US$ ${x.jev.usd.toFixed(4)})` : x.jev.error || `Jev: ninguna (${x.ncands} filas de total en ${x.ndocs} doc.)` }); continue; }
    if (!x.factor) { res.push({ ...base, valor: null, como: 'sin escala del documento' }); continue; }
    const valor = r6(x.fila.cifras[0] * x.factor); const ant = x.fila.cifras.length > 1 ? r6(x.fila.cifras[1] * x.factor) : null;
    const cita = `${x.fila.md.split('/').pop()} L${x.fila.linea} "${String(x.fila.etiqueta).slice(0, 50)}"`;
    if (valor === 0) { res.push({ ...base, valor: null, como: `${cita}: suma 0` }); continue; }
    // COMPUERTA DE PLAUSIBILIDAD (TODO 351): el costo de personal de un club profesional es una parte grande de sus ingresos. Menos de PERSONAL_MIN_SOBRE_INGRESOS es casi seguro la nota de OTRA entidad
    // (la filial del grupo sin los jugadores: Aston Villa Football Club Limited 2019-20, personal 8,3 M£ contra ingresos de 130 M£) o solo una parte (directores). El vecino no alcanza: la misma nota
    // repetida en el documento siguiente coincide, y el valor es igual de equivocado.
    const ingresosAnio = ((d.revenueLinesByYear || {})[anio] || []).reduce((s, l) => s + Math.max(0, l.amountNative || 0), 0);
    if (ingresosAnio > 0 && valor / ingresosAnio < PERSONAL_MIN_SOBRE_INGRESOS) { res.push({ ...base, valor: null, como: `${cita} (${valor}): es ${(100 * valor / ingresosAnio).toFixed(1)} % de los ingresos (${r6(ingresosAnio)}); menos de ${PERSONAL_MIN_SOBRE_INGRESOS * 100} % no es el personal de un club profesional (¿nota de otra entidad del grupo o de una parte?). No se usa` }); continue; }
    const chequeos = [];
    // el documento siguiente que REEXPRESA el año («Restated» en el encabezado de su columna anterior) no contradice: la diferencia es una reexpresión, no un error de lectura
    const sig = porAnio.get(String(Number(anio) + 1)); if (sig?.fila && sig.factor && sig.fila.cifras.length > 1) { const c = coincide(r6(sig.fila.cifras[1] * sig.factor), valor); if (c || !REEXPRESADO_RE.test(sig.fila.contexto || '')) chequeos.push(['documento siguiente', c]); }
    // lo mismo hacia atrás: si el encabezado de la columna anterior de ESTA tabla dice «Restated», que no coincida con el año anterior ya cargado es una reexpresión
    const prevM = porAnio.get(String(Number(anio) - 1))?.a.m.staffCost; if (prevM != null && ant != null) { const c = coincide(prevM, ant); if (c || !REEXPRESADO_RE.test(x.fila.contexto || '')) chequeos.push(['año anterior', c]); }
    const antD = porAnio.get(String(Number(anio) - 1)); if (antD?.fila && antD.factor && ant != null && coincide(r6(antD.fila.cifras[0] * antD.factor), ant)) chequeos.push(['documento anterior', true]);
    const malos = chequeos.filter((c) => !c[1]); const buenos = chequeos.filter((c) => c[1]);
    // la estructura (la suma de la nota cierra, es la nota de personal, la escala la dice su encabezado y pasó la plausibilidad) no necesita vecino; si un vecino la contradice, no se usa
    if (malos.length || (!buenos.length && !x.estructura)) { res.push({ ...base, valor: null, como: `${cita} (${valor}): ${malos.length ? `no coincide con ${malos.map((c) => c[0]).join(' ni ')}` : 'ningún vecino para comparar'}` }); continue; }
    res.push({ ...base, valor, validacion: buenos[0]?.[0] || 'estructura de la nota', como: x.estructura ? `estructura de la nota (la suma cierra): ${cita}` : `Jev (confianza ${x.jev.datos?.conf ?? '?'}): ${cita}`, fila: x.fila, factor: x.factor, md: x.a.md });
  }
  return { res, usd, ensayos };
}
// PARTIR LA FILA GLOBAL (to-do 229, paso 2, aprobado por Guido el 2026-10-14): lo que se hizo a mano con Volos 2021-2025, como AJUSTES (fila +
// categoria) que después aplica cargar.mjs --reemplazar (el único que escribe filas). UNA compuerta: el año tiene staffCost confirmado por la
// compuerta del vecino, NO tiene ninguna fila wages_squad, y tiene UNA SOLA fila global de gasto (lump_*_expense o admin_general_expense)
// de monto >= staffCost (el resto no queda negativo). Esa fila pasa a valer el resto; una fila nueva = staffCost va a wages_squad con la cita.
// Dos o ninguna fila global: no decide (lo dice). Caso: Panetolikos 2022, "Κόστος πωλήσεων" 5,18 M -> 3,61 M + "Σύνολο — Παροχές σε
// εργαζόμενους" 1,566222 M (wages_squad, Panetolikos_FS_2022 L1471). Volos ya tiene wages_squad (sus ajustes a mano): no se parte.
async function partirFilaGlobal(clubId, d, res, { escribir }) {
  const fmt = (x) => { const [e, c] = Math.abs(x).toFixed(2).split('.'); return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${c}`; };
  const ajustesTxt = readFileSync(resolve(ROOT, 'Admin', 'registros', 'ajustes-manuales.jsonl'), 'utf8');
  const cmds = [];
  // (to-do 339) la categoría de los sueldos es la del deporte del club (wages_squad en fútbol, squad_wages en rugby)
  const SUELDOS = categoriaDeSueldos(deporteDeClub(clubId));
  if (!SUELDOS) { console.log(`  partir: el deporte de ${clubId} no tiene categoría de sueldos del primer equipo en su taxonomía; no decide`); return; }
  for (const x of res.filter((y) => y.valor != null && (y.real == null || coincide(y.real, y.valor)))) {
    const ls = (d.expenseLinesByYear || {})[x.anio] || [];
    if (ls.some((l) => l.normalizedCategory === SUELDOS)) { console.log(`  ${x.anio} partir: ya tiene ${SUELDOS}; no se parte`); continue; }
    const glob = ls.filter((l) => (/^lump_.*_expense$/.test(l.normalizedCategory) || l.normalizedCategory === 'admin_general_expense') && Math.abs(l.amountNative) >= x.valor);
    if (glob.length === 0) {
      // (TODO 351) Ninguna fila global alcanza (el estado por función reparte los sueldos entre costo de ventas, distribución y administración): partirlos sería inventar de cuál salen.
      // Se marca con `incluye` + `--posible` en la fila global más grande, que es lo que hizo Onboarding con los 10 británicos nuevos; el sitio dice «Posiblemente dentro de…».
      const g0 = ls.filter((l) => /^lump_.*_expense$/.test(l.normalizedCategory) || ['admin_general_expense', 'other_expenses'].includes(l.normalizedCategory)).sort((p, q) => Math.abs(q.amountNative) - Math.abs(p.amountNative))[0];
      if (!g0) { console.log(`  ${x.anio} partir: sin ninguna fila global de gasto; no decide`); continue; }
      const pdf0 = x.md.replace(/\.md$/i, '.pdf'); const cita0 = `${x.fila.md.split('/').pop()} L${x.fila.linea}`;
      if (ajustesTxt.split('\n').some((l) => l.includes(`"pdf":${JSON.stringify(pdf0)}`) && l.includes('"campo":"incluye"') && l.includes(`"valor":"${SUELDOS}"`))) { console.log(`  ${x.anio} partir: ya está marcado «incluye»`); continue; }
      console.log(`  ${x.anio} partir: ninguna fila global >= staffCost (${x.valor}); se marca ${SUELDOS} «posiblemente dentro de ${g0.normalizedCategory}» (${cita0})`);
      cmds.push([pdf0, 'incluye', '--valor', SUELDOS, '--categoria', g0.normalizedCategory, '--posible', '--motivo', `caja-deuda.mjs --personal --partir (TODO 351): el costo de personal (${x.valor}, ${cita0}) es mayor que cada fila global de gasto; el documento reparte los sueldos entre varias funciones y no dice cuánto va en cada una`, '--evidencia', cita0]);
      continue;
    }
    if (glob.length !== 1) { console.log(`  ${x.anio} partir: ${glob.length} filas globales de gasto >= staffCost (${x.valor}); no decide`); continue; }
    const g = glob[0]; const pdf = x.md.replace(/\.md$/i, '.pdf');
    const v = (() => { try { return JSON.parse(readFileSync(resolve(ROOT, derivado(x.md, '.verificacion.json', { crear: false })), 'utf8')); } catch { return null; } })();
    const lin = (v?.lineas || []).find((l) => String(l.etiqueta).trim() === String(g.rawLabel).trim())?.linea ?? null;
    const resto = Math.abs(g.amountNative) / x.factor - x.fila.cifras[0];
    // un total SIN RÓTULO (la suma de la nota «Staff costs» que no tiene etiqueta) no puede quedar como etiqueta publicada: se nombra por lo que es
    const etiq = /^\(total sin rótulo/.test(String(x.fila.etiqueta)) ? 'Staff costs (total de la nota de personal)' : /\s/.test(String(x.fila.etiqueta).trim()) || !x.fila.tabla ? String(x.fila.etiqueta).trim() : `${String(x.fila.etiqueta).trim()} — ${x.fila.tabla}`;
    const cita = `${x.fila.md.split('/').pop()} L${x.fila.linea}`;
    // (TODO 351) el pdf y la etiqueta tienen que estar en la MISMA línea: con dos `includes` sobre todo el archivo, el segundo año de un club (misma etiqueta, otro pdf) figuraba como «ya tiene los ajustes»
    if (ajustesTxt.split('\n').some((l) => l.includes(`"pdf":${JSON.stringify(pdf)}`) && l.includes(`"etiqueta":${JSON.stringify(etiq)}`))) { console.log(`  ${x.anio} partir: ya tiene los ajustes`); continue; }
    console.log(`  ${x.anio} partir: "${g.rawLabel}" ${fmt(Math.abs(g.amountNative) / x.factor)} -> ${fmt(resto)} + "${etiq}" ${fmt(x.fila.cifras[0])} (${SUELDOS}, ${cita})`);
    const mot = `caja-deuda.mjs --personal --partir (to-do 229): el año no tiene ${SUELDOS} y el costo de personal confirmado (staffCost, ${cita}) está dentro de "${g.rawLabel}"`;
    cmds.push([pdf, 'fila', '--valor', fmt(resto), '--etiqueta', `${g.rawLabel} (sin el costo de personal)`, '--lado', 'gasto', '--reemplaza', g.rawLabel, ...(lin ? ['--linea', String(lin)] : []), '--motivo', `${mot}: queda ${fmt(Math.abs(g.amountNative) / x.factor)} - ${fmt(x.fila.cifras[0])}`, '--evidencia', cita]);
    cmds.push([pdf, 'fila', '--valor', fmt(x.fila.cifras[0]), '--etiqueta', etiq, '--lado', 'gasto', ...(lin ? ['--linea', String(lin)] : []), '--motivo', `${mot}: el costo de personal va aparte`, '--evidencia', cita]);
    cmds.push([pdf, 'categoria', '--valor', SUELDOS, '--etiqueta', etiq, '--motivo', `${mot}: costo de personal -> ${SUELDOS}`, '--evidencia', cita]);
  }
  if (!escribir || !cmds.length) { if (cmds.length) console.log(`\n${cmds.length / 3} año(s) para partir. Agregá --escribir (escribe los ajustes; después: node tools/cargar.mjs "<pdf>" --desde-verificacion --reemplazar --escribir por año).`); return; }
  const { execFileSync } = await import('node:child_process');
  for (const c of cmds) execFileSync('node', [resolve(ROOT, 'tools/ajustes.mjs'), '--agregar', ...c, '--autor', 'caja-deuda --personal'], { cwd: ROOT, stdio: 'inherit' });
  console.log(`\nEscritos ${cmds.length} ajustes.`);
  // (TODO 351) LA CADENA ENTERA, sola: los ajustes los toma verificar.mjs, las filas nuevas hay que categorizarlas (etapa 5: Jev y, si no sabe, Claude) y recién ahí cargar.mjs reemplaza el año. Sin esto,
  // cargar frena con «el .categorias.json NO está al día» y el año queda con la fila global sin partir (así quedaron los 12 club-años de los británicos hasta que se corrió a mano).
  const pdfs = [...new Set(cmds.map((c) => c[0]))];
  const { mkdirSync, writeFileSync } = await import('node:fs');
  const lista = resolve(ROOT, 'Generados', '_cache', 'partir-lista.txt'); mkdirSync(resolve(ROOT, 'Generados', '_cache'), { recursive: true }); writeFileSync(lista, pdfs.join('\n') + '\n');
  const nodo = (args) => execFileSync('node', args.map((a) => (a.startsWith('tools/') ? resolve(ROOT, a) : a)), { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 27, stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    nodo(['tools/verificar.mjs', '--lista', lista, '--rubros']);
    nodo(['tools/jev-categorizar.mjs', '--listos', '--lista', lista]);
    nodo(['tools/categorizar-claude.mjs', '--listos', '--lista', lista]);
    for (const p of pdfs) { nodo(['tools/cargar.mjs', p, '--desde-verificacion', '--reemplazar', '--escribir']); console.log(`  ${p.split('/').pop()}: cargado (cargar.mjs sale con 1 si frena)`); }
  } catch (e) { console.log(`  la cadena frenó: ${String(e.stdout || e.message).slice(-300)}\n  A mano: verificar.mjs --lista, jev-categorizar.mjs --listos, categorizar-claude.mjs --listos y cargar.mjs <pdf> --desde-verificacion --reemplazar --escribir`); }
}
export function registroDocs() {
  const m = new Map();
  for (const l of readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; try { const e = JSON.parse(l); m.set(e.pdf, e); } catch { /* línea rota */ } }
  return m;
}
// --personal --medir: contra la verdad conocida (Admin/mediciones/personal-verdad.tsv: clubId, año, valor en millones, de dónde sale).
export async function medirPersonal({ ejecutar = false, club = null }) {
  const { G, S } = sitio(); const reg = registroDocs();
  const verdad = readFileSync(resolve(ROOT, 'Admin', 'mediciones', 'personal-verdad.tsv'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.split('\t'));
  const clubes = [...new Set(verdad.map((v) => v[0]))].filter((c) => !club || c === club);
  let usd = 0; let ensayos = 0; const t = { iguales: 0, distintos: 0, sinDato: 0 };
  for (const c of clubes) {
    const r = await personalDelClub(c, G[c], S, { ejecutar, reg }); usd += r.usd; ensayos += r.ensayos;
    for (const x of r.res) {
      const v = verdad.find((y) => y[0] === c && y[1] === x.anio); if (!v) continue;
      const real = Number(v[2]); const ok = x.valor != null && coincide(x.valor, real);
      if (x.valor == null) t.sinDato++; else if (ok) t.iguales++; else t.distintos++;
      console.log(`  ${c} ${x.anio}: ${x.valor ?? 'sin dato'} · verdad ${real} ${x.valor == null ? '' : ok ? 'IGUAL' : 'DISTINTO'} · ${x.como}`);
    }
  }
  console.log(`\nPERSONAL: ${JSON.stringify(t)}${ensayos ? ` · JEV (ENSAYO): ${ensayos} pedido(s), ~US$ ${usd.toFixed(3)} (cota alta); agregá --ejecutar` : ` · Jev US$ ${usd.toFixed(4)}`}`);
}
// --personal --club <id> [--ejecutar] [--escribir]: completa staffCost donde el año no lo tiene (nunca pisa uno cargado).
export async function completarPersonal(clubId, { ejecutar = false, escribir = false, partir = false }) {
  const { G, S } = sitio(); const d = G[clubId]; if (!d) { console.log(`no existe ${clubId}`); return; }
  const r = await personalDelClub(clubId, d, S, { ejecutar, reg: registroDocs() });
  const nuevos = r.res.filter((x) => x.valor != null && x.real == null);
  for (const x of r.res) console.log(`  ${x.anio} personal: ${x.valor ?? 'null'}${x.real != null ? ` (ya cargado: ${x.real})` : ''}  (${x.validacion ? `compuerta: ${x.validacion}; ` : ''}${x.como})`);
  console.log(`\n${clubId}: ${nuevos.length} dato(s) para completar.${r.ensayos ? ` Jev en ensayo: ~US$ ${r.usd.toFixed(3)}; agregá --ejecutar.` : ''}`);
  if (partir) return partirFilaGlobal(clubId, d, r.res, { escribir });
  if (!escribir || !nuevos.length) return;
  const { snapshot, revertir, publicarCambios } = await import('./cargar.mjs');
  const evRel = EV.rutaRel(clubId);
  const snap = snapshot([evRel]); const escritos = [evRel];
  try {
    let ev = EV.leer(clubId);
    // (to-do 245, fase 2) el costo de personal va al JSON del club (financial.staff_cost del año) y se regenera el data file
    const aEscribir = [];
    for (const x of nuevos) aEscribir.push(x);
    const [rj, rd] = modificarClub(clubId, (c) => {
      for (const x of aEscribir) {
        const m = c.datos.fiscalYearMeta[x.anio]; if (!m) throw new Error(`no encontré el año ${x.anio}`);
        if (m.staffCost !== undefined) continue;
        if (!('cash' in m)) throw new Error(`${x.anio}: el año no tiene cash`);
        m.staffCost = r6(x.valor);
        ev = EV.agregarTexto(ev, x.anio, 'Meta', [`tools/caja-deuda.mjs --personal (${HOY}): staffCost ${r6(x.valor)} (compuerta: ${x.validacion}): ${x.como}`]);
      }
    });
    escritos.push(rj, rd); EV.guardar(clubId, ev);
    const pr = publicarCambios(snap, [evRel], escritos);
    console.log(pr.ok ? `Escrito: ${pr.escritos.join(', ')} · ${pr.audit}` : `NO se escribió: ${pr.motivo}`);
  } catch (err) { const rv = revertir(snap, [evRel]); console.log(`NO se escribió: ${err.message} (se revirtió: ${rv.restaurados} restaurados)`); }
}
