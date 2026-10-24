#!/usr/bin/env node
// ============================================================================
// tools/todo.mjs — leer y cerrar los puntos de Admin/TODO.md sin leer el archivo entero.
//
// POR QUÉ. TODO.md pesa ~25 KB y una sesión lo leía entero para saber qué sigue o cómo es un solo punto. Cada punto es un título
// `### <orden>. <id> · <qué>` con su cuerpo debajo (formato en la cabecera del propio TODO.md), así que esta tool lo parte por títulos.
//
// USO:
//   node tools/todo.mjs                 la lista: orden, id y título, agrupada como el TODO (gratis, ~3 KB)
//   node tools/todo.mjs 355             el cuerpo del punto con ese id y, al final, su contexto: una ruta y una línea por cada propuesta, medición,
//                                       votación, entrada del CHANGELOG, lista de lote y commit que lo nombra (--sin-contexto lo omite)
//   node tools/todo.mjs --verificar [id]   comprueba la línea «Verificar:» de cada punto (o de uno) con una máquina: cumple / falta / manual (corre audit.js, unos segundos)
//   node tools/todo.mjs --cerrar 355    borra el punto y renumera el orden de los de abajo (el historial va al CHANGELOG, a mano). Se NIEGA si el punto tiene una condición
//                                       «Verificar:» comprobable y no se cumple; --forzar lo cierra igual (para un punto descartado, no cumplido)
//   node tools/todo.mjs --nuevo --pos <n> --rol "Orden, prioridad alta" --titulo "…"   un punto nuevo con el id siguiente al más alto, en el lugar <n> (1..último+1);
//                                       renumera los de abajo y deja «Terminado cuando:» y «Verificar: manual» para completar. Rechaza una posición fuera de rango; avisa de un título repetido
//   node tools/todo.mjs --mover 357 --antes 337       cambia el lugar de un punto (--antes o --despues de otro; queda en el grupo del otro) y renumera el orden
// Las condiciones y cómo se escriben: tools/todo-verificar.js. No toca nada más que Admin/TODO.md.
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const T = createRequire(import.meta.url)('./todo-verificar.js');
const ROOT = resolve(import.meta.dirname, '..');

const RUTA = resolve(import.meta.dirname, '..', 'Admin', 'TODO.md');
const A = process.argv.slice(2);
const L = readFileSync(RUTA, 'utf8').split('\n');
const TITULO = /^### (\d+)\. (\d{3}) · (.*)$/;

// índices de los títulos de punto y fin de cada cuerpo (el siguiente título de punto o de grupo)
const puntos = [];
for (let i = 0; i < L.length; i++) {
  const m = TITULO.exec(L[i]);
  if (m) puntos.push({ i, orden: Number(m[1]), id: m[2], titulo: m[3] });
}
for (const p of puntos) {
  let f = p.i + 1;
  while (f < L.length && !/^##+ /.test(L[f])) f++;
  p.fin = f;
}

if (!A.length) {
  let grupo = '';
  for (const l of L) { if (/^## [A-Z]\. /.test(l) && l !== grupo) { grupo = l; console.log(`\n${l.slice(3)}`); } const m = TITULO.exec(l); if (m) console.log(`${m[1].padStart(2)}. ${m[2]} · ${m[3].slice(0, 150)}`); }
  process.exit(0);
}

// los hallazgos de audit.js (sin silenciar), para las condiciones «audit <código> ...»
function hallazgos() {
  let out; try { out = execFileSync('node', ['tools/audit.js', '--json'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 }); } catch (e) { out = e.stdout; }
  return JSON.parse(out).findings;
}
const condiciones = (p) => T.puntos(L.join('\n')).find((x) => x.id === p.id)?.verificar || [];
function estadoDe(p, hs) {
  const rs = condiciones(p).map((e) => T.evaluar(e, hs, ROOT));
  const auto = rs.filter((r) => r.ok !== null);
  return { rs, cumple: rs.length > 0 && rs.every((r) => r.ok === true), manual: rs.length > 0 && rs.every((r) => r.ok === null), falta: auto.some((r) => r.ok === false), sinCondicion: rs.length === 0 };
}
if (A[0] === '--verificar') {
  const hs = hallazgos(); const solo = A[1];
  for (const p of puntos.filter((x) => !solo || x.id === solo)) {
    const e = estadoDe(p, hs);
    const marca = e.sinCondicion ? '? sin «Verificar:»' : e.cumple ? '✓ CUMPLE: cerrarlo' : e.manual ? '· manual' : e.falta ? '✗ falta' : '· manual';
    console.log(`${String(p.orden).padStart(2)}. ${p.id} · ${marca}${e.rs.filter((r) => r.ok !== null).map((r) => `\n      ${r.ok ? '✓' : '✗'} ${r.detalle}`).join('')}`);
  }
  process.exit(0);
}

if (A[0] === '--nuevo') {
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const pos = Number(v('--pos')), rol = v('--rol'), titulo = v('--titulo');
  if (!rol || !titulo || !Number.isInteger(pos)) { console.error('Uso: --nuevo --pos <n> --rol "…" --titulo "…"'); process.exit(1); }
  if (pos < 1 || pos > puntos.length + 1) { console.error(`--pos ${pos} fuera de rango: va de 1 a ${puntos.length + 1}.`); process.exit(1); }
  const igual = puntos.find((x) => x.titulo.toLowerCase().includes(titulo.toLowerCase()));
  if (igual) console.error(`Aviso: ya hay un punto con ese título (${igual.id}).`);
  // el id siguiente al más alto USADO alguna vez: los de los puntos abiertos y los que los títulos del CHANGELOG (y su archivo) ya citaron entre corchetes
  const citados = [resolve(ROOT, 'Admin', 'CHANGELOG.md'), ...['CHANGELOG-v300-v672.md', 'CHANGELOG-v010-v299.md'].map((f) => resolve(ROOT, 'Admin', 'Archive', f))]
    .flatMap((f) => { try { return [...readFileSync(f, 'utf8').matchAll(/^## .*\[(\d{3}[^\]]*)\]\s*$/gm)].flatMap((m) => m[1].match(/\b\d{3}\b/g) || []); } catch { return []; } }).map(Number);
  const id = String(Math.max(...puntos.map((x) => Number(x.id)), ...citados) + 1);
  const bloque = [`### ${pos}. ${id} · (${rol}): ${titulo}`, '', '…', 'Terminado cuando: …', '', 'Verificar: manual', ''];
  // antes del punto que hoy ocupa ese lugar; al final, después del cuerpo del último
  let en = pos <= puntos.length ? puntos[pos - 1].i : puntos[puntos.length - 1].fin;
  while (en > 0 && L[en - 1].trim() === '' && pos > puntos.length) en--;
  if (pos > puntos.length) bloque.unshift('');
  L.splice(en, 0, ...bloque);
  let n = 0;
  for (let i = 0; i < L.length; i++) { const m = TITULO.exec(L[i]); if (m) L[i] = `### ${++n}. ${m[2]} · ${m[3]}`; }
  writeFileSync(RUTA, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
  console.log(`Punto ${id} creado en el lugar ${pos}. Completá el cuerpo, «Terminado cuando:» y «Verificar:».`);
  process.exit(0);
}

if (A[0] === '--mover') { // --mover <id> --antes <otro id> | --despues <otro id>: cambia el lugar de un punto (y su grupo) y renumera el orden
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const id = A[1], destino = v('--antes') ?? v('--despues'), antes = v('--antes') !== undefined;
  const p = puntos.find((x) => x.id === id), d = puntos.find((x) => x.id === destino);
  if (!p || !d || p === d || (!antes && v('--despues') === undefined)) { console.error('Uso: --mover <id> --antes <id> | --despues <id> (dos ids de puntos distintos).'); process.exit(1); }
  const bloque = L.slice(p.i, p.fin);
  L.splice(p.i, p.fin - p.i);
  const dd = puntos.filter((x) => x !== p).map((x) => ({ ...x, i: x.i > p.i ? x.i - bloque.length : x.i, fin: x.fin > p.i ? x.fin - bloque.length : x.fin })).find((x) => x.id === destino);
  L.splice(antes ? dd.i : dd.fin, 0, ...(antes || bloque.at(-1)?.trim() === '' ? bloque : ['', ...bloque]));
  let n = 0;
  for (let i = 0; i < L.length; i++) { const m = TITULO.exec(L[i]); if (m) L[i] = `### ${++n}. ${m[2]} · ${m[3]}`; }
  writeFileSync(RUTA, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
  console.log(`Movido ${id} ${antes ? 'antes' : 'después'} de ${destino}.`);
  process.exit(0);
}

const cerrar = A[0] === '--cerrar';
const id = cerrar ? A[1] : A[0];
const p = puntos.find((x) => x.id === id);
if (!p) { console.error(`No hay un punto con id ${id}. Los ids: ${puntos.map((x) => x.id).join(', ')}`); process.exit(1); }

// el contexto de un punto: una ruta y una línea por cada cosa que lo nombra (propuestas, mediciones, votaciones, CHANGELOG, listas de lote, commits)
function contexto(id) {
  const corto = (s) => s.replace(/\s+/g, ' ').trim().slice(0, 110);
  const enNombre = new RegExp(`(?<![\\d.,])${id}(?![\\d.,]?\\d)`);
  const enTexto = new RegExp(`(?:punto|puntos|TODO|to-do|#|\\[|\\()\\s*${id}(?![\\d.,]?\\d)`, 'i');
  const sec = [];
  const leer = (f) => { try { return readFileSync(f, 'utf8'); } catch { return null; } };
  const carpeta = (dir, filtro) => {
    let ns; try { ns = readdirSync(resolve(ROOT, dir), { withFileTypes: true }); } catch { return []; }
    return ns.filter((d) => d.isFile() && filtro(d.name)).map((d) => `${dir}/${d.name}`).flatMap((r) => {
      const t = statSync(resolve(ROOT, r)).size < 3e6 ? leer(resolve(ROOT, r)) : null;
      if (!(enNombre.test(r.split('/').pop()) || (t && enTexto.test(t)))) return [];
      return [`  ${r}${t ? ` — ${corto(t.split('\n').find((x) => x.trim()) || '')}` : ''}`];
    });
  };
  const jsonl = (rel, campo) => (leer(resolve(ROOT, rel)) || '').split('\n').flatMap((l, n) => {
    if (!l.trim()) return [];
    let o; try { o = JSON.parse(l); } catch { return []; }
    const t = campo(o); return t && (enTexto.test(l) || enNombre.test(t.split(/\s/)[0])) ? [`  ${rel}:${n + 1} — ${o.fecha || ''} ${corto(t)}`] : [];
  });
  const cl = ['CHANGELOG.md', ...['v957-v977', 'v673-v956', 'v300-v672', 'v010-v299'].map((v) => `Archive/CHANGELOG-${v}.md`)].flatMap((f) =>
    (leer(resolve(ROOT, 'Admin', f)) || '').split('\n').flatMap((l, n) => { const m = /^## (.*)\[([^\]]*)\]\s*$/.exec(l); return m && (m[2].match(/\b\d{3}\b/g) || []).includes(id) ? [`  Admin/${f}:${n + 1} — ${corto(l.slice(3))}`] : []; }));
  let git = [];
  try { git = execFileSync('git', ['log', '--grep', `(^|[^0-9.,])${id}([^0-9]|$)`, '--extended-regexp', '--format=%h %s'], { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').filter((l) => enNombre.test(l.replace(/^\S+ /, '')) && !new RegExp(`Versi[óo]n ${id}`).test(l)).slice(0, 8).map((l) => `  ${corto(l)}`); } catch {}
  const grupos = [
    ['Propuestas', carpeta('Admin/propuestas', (n) => /\.(md|txt)$/.test(n))],
    ['Mediciones', carpeta('Admin/mediciones', (n) => /\.(md|txt|tsv)$/.test(n))],
    ['Votaciones y decisiones (auditoria-proceso.jsonl)', jsonl('Admin/registros/auditoria-proceso.jsonl', (o) => o.cambio)],
    ['Mediciones del pipeline (mediciones-pipeline.jsonl)', jsonl('Admin/registros/mediciones-pipeline.jsonl', (o) => typeof o.explicacion === 'string' ? o.explicacion : JSON.stringify(o.explicacion || ''))],
    ['CHANGELOG', cl],
    ['Listas de lote', carpeta('Admin/lotes', (n) => /\.txt$/.test(n))],
    ['Commits', git],
  ];
  for (const [t, ls] of grupos) if (ls.length) sec.push(`${t}:`, ...ls);
  return sec.length ? `\n\nContexto de este punto (rutas; se lee lo que haga falta):\n${sec.join('\n')}` : '\n\nContexto de este punto: nada lo cita todavía.';
}

if (!cerrar) { console.log(L.slice(p.i, p.fin).join('\n').trimEnd() + (A.includes('--sin-contexto') ? '' : contexto(p.id))); process.exit(0); }

if (!A.includes('--forzar')) {
  const e = estadoDe(p, hallazgos());
  if (e.falta) { console.error(`No se cierra ${id}: su «Verificar:» no se cumple.\n${e.rs.filter((r) => r.ok === false).map((r) => `  ✗ ${r.detalle}`).join('\n')}\n(--forzar lo cierra igual, si el punto se descartó en vez de cumplirse)`); process.exit(1); }
  if (e.manual) console.log('Su «Verificar:» es manual: confirmá contra «Terminado cuando:» del punto que está hecho.');
}
L.splice(p.i, p.fin - p.i);
let n = 0;
for (let i = 0; i < L.length; i++) {
  const m = TITULO.exec(L[i]);
  if (m) L[i] = `### ${++n}. ${m[2]} · ${m[3]}`;
}
writeFileSync(RUTA, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
console.log(`Cerrado ${id}. Quedan ${n} puntos. Falta la entrada en Admin/CHANGELOG.md.`);
