#!/usr/bin/env node
// ============================================================================
// tools/dentro-de-otro.mjs — "POSIBLEMENTE DENTRO DE OTRO RUBRO" (to-do 140(i), Versión 517, diseño aprobado por Guido el 2026-10-05).
// Gratis, sin IA. No cambia ningún número: solo agrega fiscalYearMeta.incluidoEn, que cambia el TEXTO de una fila que hoy dice "—".
//
// POR QUÉ. Cuando el documento no desglosa un renglón, ese renglón entero va a "Fútbol profesional (sin desglosar por la fuente)"
// (lump_football_operations / _expense) y las filas que puede esconder (televisión, sueldos…) quedan en "—" (`unknown` en bucketize,
// js/finanzas-calc.js). Si el club tiene esa fila en TODOS sus otros balances desglosados, lo más probable es que esté adentro del
// renglón: la página lo dice ("Posiblemente dentro de otro rubro", con el rubro en el bocadillo; Versión 515).
//
// LA ESCALERA, por fila (club, año, lado, fila), solo si la fila está en "—" (el lado tiene un renglón sin desglosar con plata):
//   ESCALÓN 0  la decisión de Guido, en los dos sentidos (tools/ajustes.mjs): `incluye` ya está en incluidoEn (lo escribe cargar.mjs) y la
//              fila no llega acá; `cero-real` (el 0 es real) la deja en "—" y el escalón 1 no la toca. Se compara por la primera palabra
//              ("Salarios del plantel", como lo nombra cargar.mjs, es la fila "Salarios y primas (plantel y cuerpo técnico)").
//   ESCALÓN 1  PRECEDENTE DEL CLUB: al menos 2 OTROS años del club que son balance (reportType official_balance_sheet; un presupuesto
//              no cuenta, ni como precedente ni como año a marcar) con ese lado desglosado (ninguna fila en "—"), y la fila tiene plata en
//              TODOS. Propone
//              { en: <la categoría sin desglosar de ese lado>, posible: true, por: 'precedente' }.
//   ESCALÓN 2  la cola humana, para años nuevos del pipeline sin precedente: se diseña con el primer caso real (decisión de Guido).
//   Si ninguno: queda "—", como hoy.
// MEDIDO (--medir, backtest): aplicada a los años COMPLETOS, donde se sabe la verdad, la regla marcaría una fila que en realidad está en
// "—" el 1,1% de las veces (2026-10-05, antes de sacar los presupuestos: 17 de 1.493; casos: pandemia, premios que un año no hubo). La
// variante "en ALGÚN otro año" daba 7,4% (Premios 37%): descartada, Admin/HALLAZGOS-pipeline.md.
//
// REESCRIBE SUS PROPIAS MARCAS: en cada corrida saca TODAS las que escribió antes (`por:'precedente'`, más su comentario) y las vuelve a
// calcular; las de un ajuste manual (sin `por`) no se tocan. Correrla dos veces da lo mismo, y una marca que deja de cumplir la regla (se
// recargó un año, cambió un precedente, Guido dijo `cero-real`) desaparece sola.
//
// LAS FILAS SON LAS DE LA PÁGINA: corre js/finanzas-calc.js (simplifiedReportForClub, window.SIMPLIFIED_BUCKETS) en Node, con los mismos
// data/*.js que carga index.html. Nada de copiar listas de categorías acá.
//
// USO:
//   node tools/dentro-de-otro.mjs --medir                        backtest en los años completos (no escribe)
//   node tools/dentro-de-otro.mjs --todos | --club <id>          ENSAYO: lista lo que marcaría
//   node tools/dentro-de-otro.mjs --todos | --club <id> --escribir   lo escribe en data/<país>/<club>-data.js (la marca) y en
//                                                                Admin/carga-clubes/<club>.md (su nota, en la meta del año), sube ASSET_V,
//                                                                corre los generadores y audit.js; si da P0/P1, revierte todo.
// ============================================================================

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { ajustesDe } from './ajustes.mjs';
import * as EV from './evidencia-club.mjs';
import { archivosData, rutaData } from './data-clubes.js';
import { modificarClub, leerJsonClub, rutaJson } from './club-json.mjs'; // las marcas se escriben en el JSON del club

const ROOT = resolve(import.meta.dirname, '..');
const HOY = new Date().toISOString().slice(0, 10);
// el bolsón es el del deporte del club (la taxonomía lo declara: `lump`); para el fútbol, lump_football_operations / _expense
import { bolsonDeDeporte, deporteDeClub } from './deporte-club.mjs';
const lumpDe = (clubId, lado) => (bolsonDeDeporte(deporteDeClub(clubId)) || {})[lado === 'ingresos' ? 'revenue' : 'expense'];

// El motor de la página en un sandbox: los mismos scripts, en el mismo orden que index.html (sin el DOM: solo el cálculo).
export function motor() {
  const doc = { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), body: { appendChild() {} } };
  const sb = { console, document: doc, localStorage: { getItem: () => null, setItem() {} }, navigator: { language: 'es' }, location: { hostname: 'local', search: '' }, setTimeout };
  sb.window = sb; const ctx = vm.createContext(sb);
  const run = (f) => vm.runInContext(readFileSync(resolve(ROOT, f), 'utf8'), ctx, { filename: f });
  for (const f of ['data/lang/langs.js', 'js/i18n.js', 'data/clubs.js', 'data/club-index.js', 'data/leagues.js', 'data/club-leagues.js', 'data/category-map.js', 'data/site-labels.js', 'data/currency-map.js', 'data/sources-view.js']) run(f);
  for (const f of archivosData()) run(f);
  run('js/finanzas-calc.js');
  // Las marcas que escribió esta misma tool no cuentan: se recalculan (ver cabecera). Fuera de memoria, para que esas filas vuelvan a "—".
  for (const d of Object.values(sb.CLUB_GENERIC_DATA)) for (const m of Object.values(d.fiscalYearMeta || {})) {
    if (!m.incluidoEn) continue;
    for (const [c, v] of Object.entries(m.incluidoEn)) if (v && v.por === 'precedente') delete m.incluidoEn[c];
    if (!Object.keys(m.incluidoEn).length) delete m.incluidoEn;
  }
  const S = vm.runInContext('typeof sources !== "undefined" ? sources : {}', ctx);
  return { G: sb.CLUB_GENERIC_DATA, S, reporte: (id, y) => sb.simplifiedReportForClub(id, Number(y)), B: sb.SIMPLIFIED_BUCKETS };
}

// Por club: cada año con sus filas (de la página) por lado, y si es balance.
function aniosDe(M, id) {
  const d = M.G[id]; const out = [];
  for (const y of Object.keys(d.fiscalYearMeta || {})) {
    if (!(d.revenueLinesByYear?.[y] || []).length) continue;
    let r; try { r = M.reporte(id, y); } catch { continue; }
    if (!r) continue;
    out.push({ y, balance: d.fiscalYearMeta[y].reportType === 'official_balance_sheet', meta: d.fiscalYearMeta[y], lados: { ingresos: r.ingresos || [], gastos: r.gastos || [] } });
  }
  return out;
}
const completo = (filas) => !filas.some((f) => f.unknown);
// ESCALÓN 0, "no": los `cero-real` del documento del año (la fuente nombra su .md; el ajuste es del .pdf de al lado).
const sinAcento = (x) => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const primera = (x) => sinAcento(x).split(/\s+/)[0];
function ceroRealDe(M, a) {
  const md = (EV.textoFuenteCompleto(M.S[a.meta.sourceId]).match(/Clubes\/[^"`\n]+?\.md/) || [])[0]; if (!md) return []; // la nota de la fuente está en la evidencia
  return ajustesDe(md.replace(/\.md$/i, '.pdf')).filter((x) => x.campo === 'cero-real' && x.valor).map((x) => primera(x.valor));
}
const conPlata = (f) => f && f.value !== 0 && !f.unknown && !f.incluidoEn;

// La escalera (escalón 1) para un año: { lado: [{ fila, cats }] }.
export function propuestasDe(M, anios, a) {
  const res = {}; if (!a.balance) return res; // un presupuesto tampoco se marca (en el backtest, 10 de las 21 marcas falsas eran presupuestos)
  for (const lado of ['ingresos', 'gastos']) {
    const enRaya = a.lados[lado].filter((f) => f.unknown); if (!enRaya.length) continue;
    const otros = anios.filter((o) => o.y !== a.y && o.balance && completo(o.lados[lado]));
    if (otros.length < 2) continue;
    const ceros = ceroRealDe(M, a);
    for (const f of enRaya) {
      if (ceros.includes(primera(f.label))) continue; // escalón 0: Guido dijo que el 0 es real
      if (!otros.every((o) => conPlata(o.lados[lado].find((x) => x.label === f.label)))) continue;
      const b = M.B[lado].find((x) => x.label === f.label); if (!b) continue;
      (res[lado] ||= []).push({ fila: f.label, cats: b.cats, otros: otros.map((o) => o.y) });
    }
  }
  return res;
}

function medir(M) {
  let total = 0; let falsas = 0; const ej = [];
  for (const id of Object.keys(M.G)) {
    const anios = aniosDe(M, id);
    for (const a of anios) for (const lado of ['ingresos', 'gastos']) {
      if (!a.balance || !completo(a.lados[lado])) continue; // solo donde se sabe la verdad, y solo balances (como la regla)
      const otros = anios.filter((o) => o.y !== a.y && o.balance && completo(o.lados[lado])); if (otros.length < 2) continue;
      for (const f of a.lados[lado]) {
        if (!M.B[lado].some((b) => b.label === f.label) || M.B[lado].find((b) => b.label === f.label).cats.includes(lumpDe(id, lado))) continue;
        if (!otros.every((o) => conPlata(o.lados[lado].find((x) => x.label === f.label)))) continue;
        total++; if (f.value === 0) { falsas++; ej.push(`${id} ${a.y} ${lado}: ${f.label}${a.balance ? '' : ` (${a.meta.reportType})`}`); }
      }
    }
  }
  console.log(`BACKTEST (años completos): ${falsas} de ${total} filas con precedente están en 0 de verdad = ${(100 * falsas / total).toFixed(1)}% de marcas falsas`);
  for (const e of ej) console.log(`  ${e}`);
}

function cierreDe(txt, abre) { let n = 0; for (let i = abre; i < txt.length; i++) { if (txt[i] === '{') n++; else if (txt[i] === '}') { n--; if (!n) return i; } } return -1; }

// Las marcas de esta tool viven en el JSON del club: `adjustments.included_in.<categoría> = { in, possible: true, by: 'precedente' }` (en el data file
// generado, `incluidoEn:{ <categoría>:{ en, posible:true, por:'precedente' } }`). Las de un ajuste manual (`incluye`) no llevan `by: 'precedente'` y no se tocan.
const esMarca = (v) => v && typeof v === 'object' && v.posible === true && v.por === 'precedente';
const contarMarcas = (j) => (j.years || []).reduce((k, y) => k + Object.values(y.adjustments?.included_in || {}).filter((v) => v && typeof v === 'object' && v.possible === true && v.by === 'precedente').length, 0);

// La marca no lleva comentario; la nota que explica de dónde sale cada marca la devuelve, por año,
// para la evidencia del club (marcarClub la escribe en Admin/carga-clubes/<club>.md).
function escribirClub(id, porAnio) {
  const notas = {};
  modificarClub(id, (c) => {
    // saca TODAS las marcas de esta tool (se recalculan); las de un ajuste manual quedan
    for (const m of Object.values(c.datos.fiscalYearMeta)) {
      if (!m.incluidoEn) continue;
      for (const [cat, v] of Object.entries(m.incluidoEn)) if (esMarca(v)) delete m.incluidoEn[cat];
      if (!Object.keys(m.incluidoEn).length) delete m.incluidoEn;
    }
    for (const [y, marcas] of Object.entries(porAnio)) {
      const m = c.datos.fiscalYearMeta[y]; if (!m) throw new Error(`${id} ${y}: no encontré el año`);
      const pares = marcas.flatMap((x) => x.cats.map((cat) => [cat, { en: x.en, posible: true, por: 'precedente' }]));
      // un ajuste `incluye` manda: sus claves no se tocan
      const nuevos = pares.filter(([cat]) => !(m.incluidoEn && Object.prototype.hasOwnProperty.call(m.incluidoEn, cat)));
      if (!nuevos.length) continue;
      m.incluidoEn = { ...(m.incluidoEn || {}), ...Object.fromEntries(nuevos) };
      notas[y] = `tools/dentro-de-otro.mjs (${HOY}): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados ${[...new Set(marcas.flatMap((x) => x.otros))].sort().join(', ')})`;
    }
  });
  return notas;
}

// LO QUE USA tools/cargar.mjs: recalcula y escribe las marcas de UN club con el motor sobre lo que hay en disco
// (el año recién escrito incluido). Sin publicar: quien llama sube ASSET_V, corre los generadores y audit.js, y revierte si falla.
// Devuelve { cambio, antes, despues, lineas } (cambio = si el archivo quedó distinto).
export function marcarClub(id, { M = motor(), log = () => {} } = {}) {
  if (!M.G[id]) return { cambio: false, antes: 0, despues: 0, lineas: [] };
  const anios = aniosDe(M, id); const porAnio = {}; const lineas = [];
  for (const a of anios) {
    const pr = propuestasDe(M, anios, a);
    for (const lado of Object.keys(pr)) {
      lineas.push(`${id} ${a.y} ${lado}: ${pr[lado].map((x) => x.fila).join(', ')}  [precedente: ${pr[lado][0].otros.join(', ')}]`);
      (porAnio[a.y] ||= []).push(...pr[lado].map((x) => ({ ...x, en: lumpDe(id, lado) })));
    }
  }
  const antes = contarMarcas(leerJsonClub(id));
  const despues = Object.values(porAnio).flat().reduce((k, x) => k + x.cats.length, 0);
  if (!antes && !despues) return { cambio: false, antes, despues, lineas };
  const jsonAntes = readFileSync(resolve(ROOT, rutaJson(id)), 'utf8');
  const notas = escribirClub(id, porAnio);
  // la evidencia: saca TODAS las notas de esta tool en el club (como las marcas: se recalculan) y pone las de ahora en la meta de cada año
  const ev0 = EV.leer(id);
  let ev = EV.quitarLineas(ev0, null, 'Meta', [/^tools\/dentro-de-otro\.mjs \(/]);
  for (const [y, nota] of Object.entries(notas)) ev = EV.agregarTexto(ev, y, 'Meta', [nota]);
  if (ev !== ev0) EV.guardar(id, ev);
  const cambio = readFileSync(resolve(ROOT, rutaJson(id)), 'utf8') !== jsonAntes || ev !== ev0;
  for (const l of lineas) log(l);
  return { cambio, antes, despues, lineas };
}

async function main() {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  const M = motor();
  if (A.includes('--medir')) return medir(M);
  const club = flag('--club'); if (!club && !A.includes('--todos')) { console.error('Uso: --medir | --todos | --club <id> [--escribir]'); process.exit(1); }
  if (club && !M.G[club]) { console.error(`no existe ${club}`); process.exit(1); }
  const ids = club ? [club] : Object.keys(M.G).sort();
  const escribir = A.includes('--escribir');
  let snap = null; let revertir = null; let publicarCambios = null;
  if (escribir) ({ snapshot: snap, revertir, publicarCambios } = await import('./cargar.mjs'));
  // las evidencias de Admin/carga-clubes/ entran en el snapshot: un P0/P1 también las revierte
  const evExtra = escribir ? ids.map((id) => EV.rutaRel(id)) : [];
  const s0 = escribir ? snap(evExtra) : null; const escritos = []; let antes = 0; let despues = 0; let filas = 0;
  try {
    for (const id of ids) {
      if (escribir) { const r = marcarClub(id, { M, log: (l) => console.log(`  ${l}`) }); antes += r.antes; despues += r.despues; filas += r.lineas.length; if (r.cambio) escritos.push(rutaJson(id), rutaData(id), EV.rutaRel(id)); continue; }
      // ensayo: lo mismo sin tocar el archivo
      const anios = aniosDe(M, id);
      antes += contarMarcas(leerJsonClub(id));
      for (const a of anios) { const pr = propuestasDe(M, anios, a); for (const lado of Object.keys(pr)) { console.log(`  ${id} ${a.y} ${lado.padEnd(8)}: ${pr[lado].map((x) => x.fila).join(', ')}  [precedente: ${pr[lado][0].otros.join(', ')}]`); despues += pr[lado].reduce((k, x) => k + x.cats.length, 0); filas++; } }
    }
    console.log(`\nMarcas por precedente en los archivos: ${antes} hoy → ${despues} después (por categoría; una fila puede ser varias). ${filas} lado(s)-año.${escribir ? '' : ' ENSAYO: agregá --escribir.'}`);
    if (!escribir) return;
    if (!escritos.length) { console.log('Nada cambió: no se escribe ni se publica.'); return; }
    const r = publicarCambios(s0, evExtra, escritos);
    console.log(r.ok ? `Escrito: ${r.escritos.join(', ')} · ${r.audit}` : `NO se escribió: ${r.motivo}`);
  } catch (err) { if (escribir) { const rv = revertir(s0, evExtra); console.log(`NO se escribió: ${err.message} (se revirtió: ${rv.restaurados} restaurados)`); } else throw err; }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
