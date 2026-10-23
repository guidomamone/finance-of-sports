#!/usr/bin/env node
// ============================================================================
// tools/cuadro-sobrante.mjs — UN CUADRO QUE LOCALIZAR ELIGIÓ Y EXTRAER NO USÓ ABRE UN RENGLÓN DEL ESTADO (diseño aprobado por la Auditora).
// Gratis, sin IA. Lo llama extraer.mjs DESPUÉS de la respuesta del modelo, solo en extracciones nuevas; el .filas.json guardado no se toca.
//
// POR QUÉ. Mafra 2023-24: localizar eligió el Anexo 3 de la Liga (b28/b29, «Contas Anuais ED*-1») y extraer lo dejó afuera («duplica el estado con otra estructura»).
// La nota b15 abre «Vendas e serviços prestados» en dos filas (Vendas 682,17 y Prestações de Serviço 1.274.461,66); el anexo lo abre en bilheteira, patrocínios, televisão,
// merchandising, competições UEFA y otros, que suman 1.275.143,83 exacto. Sin ese desglose la televisión y el estadio quedan en 0 y el lote pedía un reintento pago.
//
// LA ESCALERA, una sola compuerta para todos los documentos (cada parte tiene que cumplirse; si no, no se toca nada):
//   1  EL CUADRO: un bloque tabla de la ubicación (estado + notas de ingresos y gastos) del que extraer no sacó ninguna fila.
//   2  LA SECCIÓN: por columna, las filas con importe hasta una fila «Total»/«Subtotal» cuyo valor es la suma EXACTA (al centavo) de las filas acumuladas (≥ 3 filas).
//   3  LOS RENGLONES: existe UN solo subconjunto, de al menos 2 renglones, del estado (mismo documento, ejercicio actual, mismo lado) cuya suma es exactamente el total de la sección.
//   4  EL REPARTO: las filas de la sección se reparten en grupos, un grupo por renglón, cada uno con suma exacta; el reparto es único y no sobra ninguna fila.
//   5  MÁS FINO: el reparto de al menos un renglón tiene más filas que las hojas que ese renglón tiene hoy (FSE de Mafra, ya abierto en b25 en 40 filas, no se reemplaza por 6).
//   6  UNA COLUMNA: si dos columnas del cuadro cumplen todo lo anterior es ambiguo y no se toca (un anexo con ED*-1, ED*-2 y ED*-3 solo cierra en la del ejercicio).
// Si cumple, las filas del grupo pasan a ser hijas del renglón (detalla_a = renglón) y reemplazan a sus hijas de menor detalle; queda `cuadroSobrante` en el .filas.json.
// NO CUBRE un cuadro que redondea por fila (Sporting 2002-2007, en miles: 8.872 contra 8.873): la suma no es exacta y sigue a mano con ajustes `fila`.
//
// EJERCICIO YA CARGADO: el paso se SALTA si el año del documento ya está en el sitio (un --rehacer sobre un año publicado cambiaría sus líneas) y dice qué habría
// reemplazado. MEDIDO (backtest sobre los .filas.json): 2 coincidencias con la compuerta entera (Mafra 2023-24 y AS Roma 2009), 0 contra renglones de otro documento.
//
// USO:   node tools/cuadro-sobrante.mjs --doc "<pdf>" [--como-nuevo]    ENSAYO sobre el .filas.json guardado: qué haría (con --como-nuevo, ignora que el año esté cargado)
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { clubDeRuta } from './carpetas-clubes.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const eq = (a, b) => Math.abs(a - b) < 0.005;
// Una cifra chica coincide por azar (un total de 252 en miles contra un renglón de 252 de otro documento: el control de falsos positivos); una sección y un grupo valen desde 1.000 unidades del documento.
const MIN_IMPORTE = 1000;
// Dos filas que suman un renglón de otro documento también salen por azar (Juventus 2003-04 contra Celtic: 4.976 + 106 = 5.082): una sección y un grupo abierto valen desde 3 filas.
const MIN_FILAS = 3;
// Un total de sección que iguala UN solo renglón sale por azar una vez cada ~10.000 comparaciones con renglones ajenos (control de falsos positivos, tres semillas); que dos o más renglones se repartan la sección, cada uno exacto, no.
const MIN_RENGLONES = 2;

// «25.811,26 €», «- 425,25 €», «1,275,143.83», «7 003», «(1.234)» -> número (o null)
export function numero(t) {
  let s = String(t ?? '').replace(/[€$£%\s *]/g, '').replace(/^\((.*)\)$/, '-$1').replace(/^[−–]/, '-');
  if (!/\d/.test(s) || /[a-z]/i.test(s)) return null;
  const neg = s.startsWith('-'); s = s.replace(/^-/, '');
  const c = s.lastIndexOf(','), p = s.lastIndexOf('.');
  if (c >= 0 && p >= 0) { const dec = c > p ? ',' : '.'; s = dec === ',' ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, ''); }
  else if (c >= 0 || p >= 0) { const sep = c >= 0 ? ',' : '.'; if (new RegExp(`^\\d{1,3}(\\${sep}\\d{3})+$`).test(s)) s = s.split(sep).join(''); else s = s.replace(sep, '.'); }
  const v = Number(s); return Number.isFinite(v) ? (neg ? -v : v) : null;
}
// subconjuntos de `vals` (máscaras de bits) que suman `obj`; devuelve hasta 2 (null si hay demasiados elementos)
function subconjuntos(vals, obj) {
  const n = vals.length; if (n > 18) return null; const out = [];
  for (let m = 1; m < 1 << n; m++) { let s = 0; for (let k = 0; k < n; k++) if (m >> k & 1) s += vals[k]; if (eq(s, obj)) { out.push(m); if (out.length >= 2) break; } }
  return out;
}

// -> { aplicar: [{ renglon, lado, bloque, columna, total, nuevas: [fila], reemplaza: [fila] }], descartes: [motivo] }
export function proponer({ filas, ub, L }) {
  const aplicar = []; const descartes = [];
  const extraidos = new Set(filas.map((r) => r.bloque));
  const candidatos = [...new Set([...(ub.estado || []), ...(ub.notas_ingresos || []), ...(ub.notas_gastos || [])])].filter((id) => !extraidos.has(id) && ub.bloques?.[id]?.tipo === 'tabla');
  if (!candidatos.length) return { aplicar, descartes };
  const estado = filas.filter((r) => (ub.estado || []).includes(r.bloque) && r.tipo === 'renglon' && numero(r.actual));
  const descendientes = (et) => { const out = []; const cola = [et]; const vistos = new Set([et]); while (cola.length) { const e = cola.pop(); for (const h of filas.filter((x) => x.detalla_a === e && x.etiqueta !== e)) { out.push(h); if (!vistos.has(h.etiqueta)) { vistos.add(h.etiqueta); cola.push(h.etiqueta); } } } return out; };
  const hojasDe = (et) => { const d = descendientes(et).filter((h) => !['total', 'subtotal'].includes(h.tipo) && !/^\s*total\s*$/i.test(h.etiqueta)); return d.filter((h) => !d.some((x) => x !== h && x.detalla_a === h.etiqueta)).length || 1; };
  for (const lado of ['ingreso', 'gasto']) {
    const delLado = (r) => (lado === 'ingreso' ? ['ingreso', 'financiero', 'otro'].includes(r.lado) : ['gasto', 'financiero', 'impuesto', 'otro'].includes(r.lado));
    const rengs = estado.filter(delLado).map((r) => ({ fila: r, e: r.etiqueta, v: Math.abs(numero(r.actual)), hojas: hojasDe(r.etiqueta) }));
    if (!rengs.length || rengs.length > 18) continue;
    for (const id of candidatos) {
      const [desde, hasta] = ub.bloques[id].lineas;
      const celdas = []; for (let i = desde - 1; i < hasta; i++) { const l = (L[i] || '').trim(); if (!l.startsWith('|') || /^\|[\s:|-]+\|?$/.test(l)) continue; celdas.push({ linea: i + 1, c: l.replace(/^\||\|$/g, '').split('|').map((x) => x.trim()) }); }
      const ncol = Math.max(0, ...celdas.map((x) => x.c.length)); const validas = [];
      for (let j = 1; j < ncol; j++) {
        let acum = [];
        for (const { linea, c } of celdas) {
          const x = numero(c[j]); const et = (c[0] || '').replace(/\*/g, '').trim(); if (x == null || x === 0) continue;
          if (/^(sub)?total|^suma|^tot\./i.test(et)) {
            const S = acum.reduce((a, r) => a + Math.abs(r.v), 0);
            if (acum.length >= MIN_FILAS && eq(S, Math.abs(x)) && Math.abs(x) >= MIN_IMPORTE) {
              const Q = subconjuntos(rengs.map((r) => r.v), Math.abs(x));
              if (Q && Q.length === 1 && [...Q[0].toString(2)].filter((c) => c === "1").length >= MIN_RENGLONES) {
                const qs = rengs.filter((r, k) => Q[0] >> k & 1); let ok = true; const resto = acum.slice(); const grupos = [];
                for (const q of qs.slice().sort((a, b) => a.v - b.v)) {
                  const sol = subconjuntos(resto.map((r) => Math.abs(r.v)), q.v); if (!sol || sol.length !== 1) { ok = false; break; }
                  const tomadas = resto.filter((r, k) => sol[0] >> k & 1); grupos.push({ q, tomadas }); for (const t of tomadas) resto.splice(resto.indexOf(t), 1);
                }
                if (ok && !resto.length) validas.push({ columna: j, total: Math.abs(x), grupos });
              }
            }
            acum = []; continue;
          }
          acum.push({ et, v: x, linea, crudo: c[j] });
        }
      }
      if (!validas.length) continue;
      if (validas.length > 1) { descartes.push(`${id}: ${validas.length} secciones/columnas cumplen (ambiguo)`); continue; }
      const { columna, total, grupos } = validas[0];
      const finos = grupos.filter((g) => g.tomadas.length > g.q.hojas && g.tomadas.length >= MIN_FILAS && g.q.v >= MIN_IMPORTE);
      if (!finos.length) { descartes.push(`${id}: no es más fino que lo que ya hay (${grupos.map((g) => `«${g.q.e}» ${g.tomadas.length} filas contra ${g.q.hojas}`).join(', ')})`); continue; }
      for (const g of finos) {
        const nuevas = g.tomadas.map((t) => ({ bloque: id, linea: t.linea, etiqueta: t.et, actual: String(t.crudo).replace(/[€$£\s *]/g, ''), anterior: null, tipo: 'renglon', lado: g.q.fila.lado, detalla_a: g.q.e }));
        aplicar.push({ renglon: g.q.e, lado, bloque: id, columna, total, nuevas, reemplaza: descendientes(g.q.e) });
      }
    }
  }
  return { aplicar, descartes };
}

// ¿el ejercicio de este documento ya está en el sitio? true | false | null (no se sabe: el paso se salta)
export function ejercicioCargado(pdf, periodoCierre = null, anioAjuste = null) {
  const club = clubDeRuta(pdf).clubId; const anio = anioAjuste ? Number(anioAjuste) : periodoCierre ? Number(String(periodoCierre).slice(0, 4)) : null;
  if (!club || !anio) return null;
  const ctx = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'club-index.js'), 'utf8'), ctx);
  const c = ctx.window.CLUB_INDEX?.[club]; return !!c && (c.yrs || []).some(([y]) => Number(y) === anio);
}

// Lo que llama extraer.mjs: aplica la propuesta a `datos` (filas y cuadroSobrante) salvo que el año ya esté cargado. -> { aplicados, saltados: [texto] }
export function aplicarCuadroSobrante(datos, { ub, L, pdf, cierre = null, anio = null, comoNuevo = false }) {
  const { aplicar, descartes } = proponer({ filas: datos.filas, ub, L });
  const dice = (a) => `«${a.renglon}» por ${a.nuevas.length} filas del cuadro ${a.bloque} (columna ${a.columna}, total ${a.total}), en lugar de ${a.reemplaza.length} fila(s)`;
  if (!aplicar.length) return { aplicados: [], saltados: [], descartes };
  const cargado = comoNuevo ? false : ejercicioCargado(pdf, cierre, anio);
  if (cargado !== false) return { aplicados: [], saltados: aplicar.map((a) => `${cargado === null ? 'no se sabe si el año está cargado' : 'el año ya está cargado en el sitio'}: habría reemplazado ${dice(a)}`), descartes };
  const quitar = new Set(); for (const a of aplicar) for (const f of a.reemplaza) quitar.add(f);
  datos.filas = [...datos.filas.filter((f) => !quitar.has(f)), ...aplicar.flatMap((a) => a.nuevas)];
  datos.cuadroSobrante = aplicar.map((a) => ({ renglon: a.renglon, bloque: a.bloque, columna: a.columna, total: a.total, filas: a.nuevas.length, reemplaza: a.reemplaza.map((f) => `${f.bloque} L${f.linea} ${f.etiqueta}`) }));
  datos.observaciones = `${datos.observaciones || ''} [cuadro sobrante (237 al): ${aplicar.map(dice).join('; ')}]`.trim();
  return { aplicados: aplicar.map(dice), saltados: [], descartes };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const i = A.indexOf('--doc'); const pdf = i >= 0 ? A[i + 1] : null;
  if (!pdf) { console.error('Uso: node tools/cuadro-sobrante.mjs --doc "<pdf>" [--como-nuevo]'); process.exit(1); }
  const md = pdf.replace(/\.pdf$/, '.md'); const base = resolve(ROOT, 'Generados', pdf.split('/').slice(1).join('/').replace(/\.pdf$/, ''));
  const fp = base + '.filas.json'; const up = base + '.ubicacion.json';
  if (![fp, up].every(existsSync)) { console.error(`falta ${fp} o ${up}`); process.exit(1); }
  const datos = JSON.parse(readFileSync(fp, 'utf8')); const ub = JSON.parse(readFileSync(up, 'utf8')); const L = readFileSync(resolve(ROOT, md), 'utf8').split('\n');
  const registro = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l)).find((x) => x.pdf === pdf);
  const antes = datos.filas.length;
  const r = aplicarCuadroSobrante(datos, { ub, L, pdf, cierre: registro?.periodo?.cierre || null, comoNuevo: A.includes('--como-nuevo') });
  console.log(`${pdf}: ${antes} filas`);
  for (const x of r.aplicados) console.log(`  APLICA: ${x}`);
  for (const x of r.saltados) console.log(`  SE SALTA: ${x}`);
  for (const x of r.descartes) console.log(`  descarta: ${x}`);
  if (r.aplicados.length) console.log(`  quedan ${datos.filas.length} filas (no se escribe: es un ensayo)`);
  if (!r.aplicados.length && !r.saltados.length && !r.descartes.length) console.log('  nada que hacer');
}
