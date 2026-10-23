#!/usr/bin/env node
// ============================================================================
// tools/cargar-lote.mjs — ETAPA 8 DE PUNTA A PUNTA: escribe en el sitio cada documento de una lista que quedó "listo para cargar", con el
// alta del club si es nuevo, y un commit por año.
//
// POR QUÉ (pedido de Guido: "¿por qué cuando dice 'listo para cargar' no se carga solo directamente si es todo
// muy mecánico ya?"). Hasta acá el lote terminaba en una PROPUESTA y una sesión hacía a mano lo que faltaba: el alta del club nuevo, el color
// de marca, `cargar.mjs --escribir` y el commit. En el onboarding de Brasil eso se hizo con un script de scratchpad, y
// su paso del color falló una vez y dejó un alta a medias. Nada de eso es una decisión: el alta la propone `alta-club.mjs`, el color ya lo
// eligió la revisión del alta (Admin/registros/altas-revision.jsonl) y `cargar.mjs --escribir` corre la auditoría y revierte solo si da P0/P1.
//
// LA ESCALERA DE CADA DOCUMENTO (gratis salvo lo que ya hace cargar.mjs, que es gratis):
//   0. descartado (Admin/registros/documentos-descartados.txt), parcial (Admin/registros/documentos-parciales.txt) o el año ya está en el
//      sitio                                                                             -> no se toca
//   1. el ensayo de cargar.mjs (--desde-verificacion) frena por algo que no es el club  -> queda frenado, con su primer motivo
//   2. frena SOLO por el club (club nuevo)                                              -> candidato con alta
//   3. no frena                                                                         -> candidato
// LA COMPUERTA, una sola y la misma para todos: la de `cargar.mjs --escribir` (auditoría con 0 P0 / 0 P1, y si no, revierte). Si escribió,
// commit de ese año; si no, nada.
//
// CLUB NUEVO. El alta se hace con el primer candidato del club (el año más viejo) y va en el MISMO commit que ese año (regla del proyecto).
// Solo si el registro de altas lo da `listo-para-alta` y la revisión del alta tiene su color (un hex, o `null` = "se miró y no lleva color").
// Sin eso, el club no se da de alta: queda frenado con el motivo. Si después del alta ningún año escribe (con el club dado de alta pueden
// aparecer frenos que el ensayo no mostraba: cargar.mjs corta el análisis en el club), el alta se revierte: no queda un club vacío.
//
// GIT. Exige `data/`, `index.html` y `fuentes/` sin cambios al empezar (si no, no escribe nada: el revertir del alta no puede pisar
// trabajo ajeno). Cada commit lleva los archivos del sitio y los de Admin/ y Generados/ que toca la carga. Sin push (cada push a main es un
// deploy y lo hace Guido).
//
// USO:
//   node tools/cargar-lote.mjs --lista Admin/lotes/lote-NN.txt              # ENSAYO: qué haría con cada documento (no escribe nada)
//   node tools/cargar-lote.mjs --lista Admin/lotes/lote-NN.txt --escribir   # de verdad: altas, cargas y commits
//   node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --cargar # lo mismo al final del lote
// ============================================================================
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { derivado, TOCA_UNA_CARGA } from './rutas.mjs';
import * as EV from './evidencia-club.mjs';
import { rutaData } from './data-clubes.js';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const LISTA = flag('--lista');
const ESCRIBIR = ARGS.includes('--escribir');
if (!LISTA) { console.error('Uso: node tools/cargar-lote.mjs --lista <archivo> [--escribir]'); process.exit(1); }

const run = (cmd, args) => spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
const node = (script, args) => run('node', [resolve(ROOT, script), ...args]);
const git = (...args) => run('git', args);
const leerLineas = (p) => (existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), 'utf8').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')) : []);
const leerJsonl = (p) => (existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const jsonDe = (salida) => { const s = String(salida || ''); const i = s.indexOf('{'); if (i < 0) return null; try { return JSON.parse(s.slice(i)); } catch { return null; } };
// La línea de cierre de cargar.mjs ("Escrito (...). Auditoría: ...") y la de alta-club.mjs ("Alta escrita ...") salen por stderr y el JSON
// por stdout: se busca en las dos (primera prueba de --escribir: se miraba solo stdout y no se escribió nada).
const ultimaLinea = (r) => { const ls = `${r.stdout || ''}\n${r.stderr || ''}`.split('\n').map((l) => l.trim()).filter(Boolean); return ls.find((l) => /^(Escrito|Alta escrita|No se escribe)/.test(l)) || ls.pop() || ''; };

// Los archivos que toca un alta o una carga (generadores incluidos), para el commit y para revertir un alta.
const { SITIO, ADMIN } = TOCA_UNA_CARGA; // tools/rutas.mjs: la misma lista imprime cargar.mjs --escribir

const descartados = new Set(leerLineas('Admin/registros/documentos-descartados.txt'));
// PARCIALES: un balance de menos de 12 meses no se carga solo (regla de los 12 meses, Admin/CONVENCIONES-DATOS.md). lote.mjs
// ya lo salteaba al empezar, pero acá se leía la lista entera: si el documento tenía un .carga.json de una corrida anterior, se escribía
// igual. Caso: Kifisia 2022 (9/8/2021-30/6/2022), marcado parcial antes del lote 71 y publicado por la corrida (be8e6849b; se sacó a mano).
const parciales = new Set(leerLineas('Admin/registros/documentos-parciales.txt'));
const docs = leerLineas(LISTA).filter((d) => !descartados.has(d) && !parciales.has(d));
let altas = new Map(leerJsonl('Admin/registros/altas-club.jsonl').map((o) => [o.carpeta, o]));
const revision = new Map(leerJsonl('Admin/registros/altas-revision.jsonl').map((o) => [o.clubId, o]));

// 1) El ensayo de cada documento (cargar.mjs sin --escribir: no toma el candado ni escribe el sitio).
const clubes = new Map(); // carpeta -> [{ pdf, year, alta }]
const frenados = []; let yaEnSitio = 0;
for (const pdf of docs) {
  const j = jsonDe(node('tools/cargar.mjs', [pdf, '--desde-verificacion']).stdout);
  if (!j) { frenados.push({ pdf, motivo: 'cargar.mjs no devolvió una propuesta' }); continue; }
  const fr = j.frena || [];
  if (fr.some((f) => f.etapa === 'año' && /ya tiene el ejercicio/.test(f.motivo))) { yaEnSitio++; continue; }
  const otros = fr.filter((f) => f.etapa !== 'club');
  if (otros.length) { frenados.push({ pdf, motivo: `[${otros[0].etapa}] ${String(otros[0].motivo).slice(0, 140)}${otros.length > 1 ? ` (y ${otros.length - 1} más)` : ''}` }); continue; }
  const carpeta = pdf.split('/').slice(0, 3).join('/') + '/';
  if (!clubes.has(carpeta)) clubes.set(carpeta, []);
  // el año: el de la propuesta; en un club nuevo (la propuesta frena antes de saberlo), el que dejó verificar.mjs; si no, el del nombre del
  // archivo. Antes un archivo sin año en el nombre salía como "0" en el ensayo (AEK_oikonomikes_katastaseis.pdf, que verificar fecha en 2016).
  const anioVer = (() => { try { return JSON.parse(readFileSync(resolve(ROOT, derivado(pdf.replace(/\.pdf$/i, '.md'), '.verificacion.json', { crear: false })), 'utf8')).year || null; } catch { return null; } })();
  clubes.get(carpeta).push({ pdf, year: j.year || anioVer || Number((pdf.match(/(\d{4})(?!.*\d{4})/) || [])[1]) || 0, alta: fr.some((f) => f.etapa === 'club') });
}

// 2) Por club: si hace falta alta, ¿se puede? (registro de altas listo + color elegido en la revisión).
// ANTES DE DECIDIR, EL REGISTRO DE ALTAS AL DÍA para los clubes de la lista que necesitan alta: `alta-club.mjs --todos --solo
// "<país>/<club>"` (gratis, recalcula solo si la huella de la carpeta cambió). Se leía el registro viejo: en el lote 79 el alta frenó por
// "faltan-datos" dos veces (Sporting; después Porto, Braga y Benfica) aunque ya estaba lista, y correr --todos a mano la destrababa.
const paraAlta = [...clubes].filter(([, xs]) => xs.some((x) => x.alta)).map(([carpeta]) => carpeta.split('/').slice(1, 3).join('/'));
for (const solo of paraAlta) node('tools/alta-club.mjs', ['--todos', '--solo', solo]);
if (paraAlta.length) altas = new Map(leerJsonl('Admin/registros/altas-club.jsonl').map((o) => [o.carpeta, o]));
const plan = [];
for (const [carpeta, xs] of clubes) {
  xs.sort((a, b) => a.year - b.year || a.pdf.localeCompare(b.pdf));
  const alta = xs.some((x) => x.alta);
  if (!alta) { plan.push({ carpeta, xs }); continue; }
  const reg = altas.get(carpeta);
  if (!reg || reg.estado !== 'listo-para-alta' || !reg.clubId) { for (const x of xs) frenados.push({ pdf: x.pdf, motivo: `[alta] el registro de altas da "${reg?.estado || 'sin línea'}" (node tools/alta-club.mjs --todos)` }); continue; }
  const rev = revision.get(reg.clubId);
  const color = rev && Object.prototype.hasOwnProperty.call(rev, 'brandColor') ? rev.brandColor : undefined;
  if (!(color === null || /^#[0-9A-F]{6}$/i.test(String(color)))) { for (const x of xs) frenados.push({ pdf: x.pdf, motivo: `[alta] ${reg.clubId} sin color elegido en Admin/registros/altas-revision.jsonl (${color === undefined ? 'no está' : JSON.stringify(color)})` }); continue; }
  plan.push({ carpeta, xs, alta: { clubId: reg.clubId, color, club: reg.club, pais: reg.pais } });
}

console.log(`\n=== 5/5 · Escribir en el sitio (etapa 8)${ESCRIBIR ? ': un commit por año, sin push' : ' — ENSAYO: no escribe nada'} ===`);
for (const p of plan) console.log(`  ${p.carpeta.split('/').slice(1).join('/')}${p.alta ? `  [alta ${p.alta.clubId}, color ${p.alta.color === null ? 'null' : p.alta.color}]` : ''}: ${p.xs.map((x) => x.year).join(', ')}`);
if (yaEnSitio) console.log(`  (${yaEnSitio} documento(s) con el año ya en el sitio: no se tocan)`);
if (frenados.length) { console.log(`Frenados ${frenados.length}:`); for (const f of frenados) console.log(`   ${f.pdf.split('/').slice(2).join('/')}: ${f.motivo}`); }
if (!ESCRIBIR) { const n = plan.reduce((a, p) => a + p.xs.length, 0); console.log(`\nEnsayo terminado: se ${n === 1 ? 'escribiría 1 año' : `escribirían ${n} años`}. Para ${n === 1 ? 'escribirlo' : 'escribirlos'}: agregá --escribir.`); process.exit(0); }

// 3) De verdad.
const sucio = String(git('status', '--porcelain', '--', ...SITIO).stdout || '').trim();
if (sucio) { console.error(`\nNo escribo: hay cambios sin commitear en el sitio o en las notas de sourcing (data/, index.html, fuentes/ o Admin/sourcing/). Commitealos o descartalos primero:\n${sucio.split('\n').slice(0, 10).join('\n')}`); process.exit(1); }

// El color de marca en la entrada del club recién escrita por alta-club.mjs (que lo deja AUSENTE a propósito).
function ponerColor({ clubId, color, club, pais }) {
  const p = resolve(ROOT, 'data', 'clubs.js'); const L = readFileSync(p, 'utf8').split('\n');
  const k = L.findIndex((l) => l.startsWith(`  '${clubId}': {`));
  if (k < 0 || !L[k].trimEnd().endsWith(' },') || L[k].includes('brandColor')) return false;
  L[k] = `${L[k].trimEnd().slice(0, -3)}, brandColor:${color === null ? 'null' : `'${color}'`} },`;
  writeFileSync(p, L.join('\n'));
  // la nota del alta está en la evidencia del club, no en data/clubs.js
  let ev = EV.leer(clubId);
  ev = EV.reemplazarTexto(ev, 'brandColor AUSENTE a propósito', color === null ? 'brandColor:null a propósito' : `brandColor ${color}`);
  ev = EV.reemplazarTexto(ev, '(nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).', `(procedencia en Admin/sourcing/${pais}/${club}.md; tools/cargar-lote.mjs).`);
  EV.guardar(clubId, ev);
  return true;
}
function revertirAlta(clubId) {
  git('checkout', '-q', '--', ...SITIO.filter((x) => x !== 'fuentes' && x !== 'Admin/sourcing'), 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html');
  git('checkout', '-q', '--', 'fuentes', 'Admin/sourcing');
  for (const f of [rutaData(clubId), `fuentes/${clubId}.html`, EV.rutaRel(clubId)]) { try { unlinkSync(resolve(ROOT, f)); } catch { /* no estaba */ } }
  // Y TODO LO NUEVO que dejó el alta en data/ y fuentes/, no solo los tres archivos de arriba: el checkout restaura lo que
  // existía, pero un archivo NUEVO (el de ligas de un país nuevo, data/club-leagues/pt.js con Alverca) quedaba sin trackear y el alta
  // siguiente de la misma corrida (Rio Ave 2018, lista) frenaba por "cambios sin commitear en el sitio". Seguro: la corrida exige data/ y
  // fuentes/ sin cambios ni archivos nuevos al empezar (git status --porcelain, arriba), así que lo que hay sin trackear lo creó la corrida.
  // `git clean` sin -x no toca lo que está en .gitignore.
  git('clean', '-fdq', '--', 'data', 'fuentes');
}

let commits = 0; const noEscritos = []; const escritosTodos = []; const mdsEscritos = [];
for (const p of plan) {
  const nombre = p.carpeta.split('/')[2];
  if (p.alta) {
    const r = node('tools/alta-club.mjs', [p.xs[0].pdf, '--escribir']);
    console.log(`  alta ${p.alta.clubId}: ${ultimaLinea(r).slice(0, 200)}`);
    // revertir también acá: alta-club.mjs puede haber escrito clubs.js y los generadores aunque falte el data file (lote 67)
    if (!existsSync(resolve(ROOT, rutaData(p.alta.clubId)))) { revertirAlta(p.alta.clubId); for (const x of p.xs) noEscritos.push({ pdf: x.pdf, motivo: 'el alta no se escribió: alta revertida' }); continue; }
    if (!ponerColor(p.alta)) { revertirAlta(p.alta.clubId); for (const x of p.xs) noEscritos.push({ pdf: x.pdf, motivo: 'no pude poner el color en data/clubs.js: alta revertida' }); continue; }
  }
  let escritos = 0;
  for (const x of p.xs) {
    const r = node('tools/cargar.mjs', [x.pdf, '--desde-verificacion', '--escribir']);
    const fin = ultimaLinea(r);
    if (!/^Escrito/.test(fin) || !/P0 0 · P1 0/.test(fin)) { const j = jsonDe(r.stdout); noEscritos.push({ pdf: x.pdf, motivo: (j?.frena || []).map((f) => `[${f.etapa}] ${String(f.motivo).slice(0, 120)}`)[0] || fin.slice(0, 160) }); continue; }
    git('add', '-A', '--', ...SITIO, ...ADMIN.filter((a) => existsSync(resolve(ROOT, a))), `Generados/${p.carpeta.split('/').slice(1).join('/')}`);
    const msg = `${nombre} ${x.year} por el pipeline${p.alta && !escritos ? ` (alta de ${p.alta.clubId}, color ${p.alta.color === null ? 'null' : p.alta.color})` : ''} — tools/cargar-lote.mjs, ${LISTA}`;
    const c = git('commit', '-q', '-m', msg);
    if (c.status !== 0) { noEscritos.push({ pdf: x.pdf, motivo: `escrito pero el commit falló: ${String(c.stderr).slice(0, 120)}` }); continue; }
    escritos++; commits++; escritosTodos.push(`${nombre} ${x.year}`); mdsEscritos.push(x.pdf.replace(/\.pdf$/i, '.md'));
    console.log(`  ${nombre} ${x.year}: escrito y commiteado (${String(git('log', '--oneline', '-1').stdout).slice(0, 9)})`);
  }
  if (p.alta && !escritos) { revertirAlta(p.alta.clubId); console.log(`  ${nombre}: ningún año se escribió; alta de ${p.alta.clubId} revertida`); }
}
console.log(`\nEscritos en el sitio: ${commits === 1 ? '1 año' : `${commits} años`}${commits ? ` (${escritosTodos.join(', ')})` : ''}${commits ? ', un commit cada uno' : ''}. No se pusheó nada.`);
if (noEscritos.length) { console.log(`No escritos ${noEscritos.length}:`); for (const x of noEscritos) console.log(`   ${x.pdf.split('/').slice(2).join('/')}: ${x.motivo}`); }
// QUIÉN AUDITA: NO FRENA LA CARGA, PERO AVISA. Los años que se acaban de escribir y todavía no tienen su línea en Admin/registros/auditoria.jsonl
// (la escribe un subagente que lee el informe del auditor) quedan listados acá, con sus extractos ya armados en Generados/auditoria/<club>-<año>.txt (gratis).
if (mdsEscritos.length) {
  const pend = String(node('tools/auditoria.mjs', ['--pendientes']).stdout || '').split('\n').map((l) => l.split('\t')).filter(([k, mds]) => k && mds && mds.split(' | ').some((m) => mdsEscritos.includes(m)));
  if (pend.length) {
    const ids = pend.map(([k]) => k);
    node('tools/auditoria.mjs', ['--extractos', '--solo', ids.join(',')]);
    console.log(`\nSin línea del auditor (${ids.length}): ${ids.join(', ')}. Extractos armados en Generados/auditoria/ (lista: _lista.txt): falta que un subagente lea el informe y escriba la línea en Admin/registros/auditoria.jsonl (node tools/auditoria.mjs --pendientes). No frena nada.`);
  } else console.log('\nAuditor: todos los años escritos ya tienen su línea.');
}
