#!/usr/bin/env node
// ============================================================================
// tools/mover-comentarios-data.mjs — muda los comentarios de data/<país>/<club>-data.js a Admin/carga-clubes/<clubId>.md (to-do 209).
//
// POR QUÉ: data/<país>/<club>-data.js se publica entero, y sus comentarios (la evidencia de cada carga: fuente, perímetro, unidades,
// categorización, ajustes, tie-out) los baja cada visitante. La regla está en Admin/CONVENCIONES-DATOS.md ("data/<país>/<club>-data.js NO
// LLEVA COMENTARIOS"). Este script los MUEVE, tal cual, sin resumir: el texto de cada comentario llega entero al .md.
//
//   node tools/mover-comentarios-data.mjs udinese-it racing          # muda esos clubes (escribe data/ y Admin/carga-clubes/)
//   node tools/mover-comentarios-data.mjs --todos                     # todos los data/*/*-data.js que tengan comentarios
//   node tools/mover-comentarios-data.mjs udinese-it --ensayo <dir>   # escribe los dos archivos en <dir>, no toca el repo
//
// A DÓNDE VA CADA COMENTARIO (el "ancla"), con las reglas del inventario del paso 0:
//   - antes de la primera declaración del archivo                 -> "## Cabecera"
//   - adentro de una estructura por año (ingresos, gastos, meta, presupuestos): a SU año ("## 2025" / "### Ingresos").
//     Un comentario entre dos años (en el nivel de las claves de año) explica el año que viene ABAJO; si no hay ninguno abajo,
//     el de arriba. Un bloque adentro de un array de filas dice antes de qué fila estaba (o "al final").
//   - al final de una fila ({ rawLabel:... }, // pág. 64, Jev 0.99): a la tabla de filas de su año, con el número de fila
//     (hay nombres repetidos en un mismo año, así que el nombre solo no alcanza).
//   - al final de un campo (fx: 5.2, // ...): al bloque de su año, con el campo.
//   - sources: "## Fuentes", una subsección por id. Lo demás (títulos, pases, memberCountByClub, gestionesByClub,
//     window.CLUB_GENERIC_DATA...) a "## Otros", por declaración. Un comentario entre dos declaraciones va con la de abajo.
//
// SEGURIDAD: antes de escribir, el archivo de datos sin comentarios tiene que dar EL MISMO código que el original sin comentarios
// (normalizar(scan()) de tools/comparar-sin-comentarios.js), y cada línea de texto de cada comentario tiene que aparecer en el .md.
// Si algo no da, no escribe nada de ese club y lo dice. Si Admin/carga-clubes/<clubId>.md ya existe, frena (salvo --forzar).
// No toca las `note:` de sources{} (son datos, no comentarios: van en un paso aparte).
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { archivosData, idDeArchivo, rutaData } from './data-clubes.js';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { scan, normalizar } = require('./comparar-sin-comentarios.js');

const SECCIONES_POR_ANIO = [
  [/RevenueLinesByYear$/, 'Ingresos'],
  [/ExpenseLinesByYear$/, 'Gastos'],
  [/FiscalYearMeta$/, 'Meta'],
  [/PresupuestoOverlayByYear$/, 'Presupuesto al lado del balance'],
  [/PresupuestoFinancieroByYear$/, 'Presupuesto financiero'],
  [/PresupuestoInversionesByYear$/, 'Presupuesto de inversiones'],
  [/PresupuestoSupuestosByYear$/, 'Supuestos del presupuesto'],
];
const seccionPorAnio = (stmt) => (SECCIONES_POR_ANIO.find(([re]) => re.test(stmt || '')) || [])[1] || null;

// ---------------------------------------------------------------------------
// 1. Recorrer el archivo: cada comentario con su contexto (declaración, claves abiertas, fila).
// ---------------------------------------------------------------------------
function analizar(src, rel) {
  const { comments } = scan(rel, src);
  const m = src.split('');
  for (const c of comments) for (let k = c.pos; k < c.pos + c.text.length; k++) if (m[k] !== '\n') m[k] = ' ';
  { let q = null; for (let k = 0; k < m.length; k++) { const ch = m[k];
      if (q) { if (ch === '\\') { if (m[k + 1] !== '\n') m[k + 1] = 'x'; k++; continue; } if (ch === q) { q = null; continue; } if (ch !== '\n') m[k] = 'x'; continue; }
      if (ch === "'" || ch === '"' || ch === '`') q = ch; } }
  const mask = m.join('');
  const lineStarts = [0]; for (let k = 0; k < src.length; k++) if (src[k] === '\n') lineStarts.push(k + 1);
  const lineOf = (p) => { let lo = 0, hi = lineStarts.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= p) lo = mid; else hi = mid - 1; } return lo + 1; };
  const claveAntes = (p) => {
    const mm = /(?:^|[\s,{\[(])(?:'([^']*)'|"([^"]*)"|([A-Za-z_$][\w$]*|\d+))\s*:\s*$/.exec(src.slice(Math.max(0, p - 200), p));
    return mm ? (mm[1] ?? mm[2] ?? mm[3]) : null;
  };
  // declaraciones de nivel 0: [pos, nombre]
  const decls = [];
  const out = [];
  const stack = [];
  let stmt = null, ultimaFila = null, ultimaClaveNivel1 = null;
  const cpos = comments.map((c) => c.pos); let ci = 0;
  for (let p = 0; p <= mask.length; p++) {
    while (ci < cpos.length && cpos[ci] === p) {
      out.push({ c: comments[ci], stmt, depth: stack.length, path: stack.map((s) => ({ tipo: s.tipo, clave: s.clave, n: s.n, rawLabel: s.rawLabel })),
                 ultimaFila, ultimaClaveNivel1 });
      ci++;
    }
    const ch = mask[p];
    if (ch === undefined) break;
    if (stack.length === 0 && (p === 0 || /\s|;/.test(mask[p - 1]))) {
      const rest = mask.slice(p, p + 160);
      const d = /^(?:const|let|var)\s+([A-Za-z_$][\w$]*)/.exec(rest) || /^Object\.assign\(\s*([A-Za-z_$.][\w$.]*)/.exec(rest)
        || /^((?:window\.)?[A-Za-z_$][\w$.]*(?:\[[^\]\n]*\])?)\s*=/.exec(rest);
      if (d) { stmt = src.slice(p + d[0].indexOf(d[1]), p + d[0].indexOf(d[1]) + d[1].length); decls.push({ pos: p, nombre: stmt }); ultimaClaveNivel1 = null; }
    }
    if (ch === '{' || ch === '[') {
      const padre = stack[stack.length - 1];
      if (padre && padre.tipo === '[') padre.n++;
      let rawLabel;
      if (ch === '{') { const rl = /^\{\s*rawLabel\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/.exec(src.slice(p, p + 600)); if (rl) rawLabel = rl[2].replace(/\\(.)/g, '$1'); }
      const clave = padre && padre.tipo === '[' ? null : claveAntes(p);
      if (stack.length === 1) ultimaClaveNivel1 = clave;
      stack.push({ tipo: ch, clave, n: 0, rawLabel });
    } else if (ch === '}' || ch === ']') {
      const cerrado = stack.pop();
      if (cerrado && cerrado.rawLabel !== undefined) { const padre = stack[stack.length - 1]; ultimaFila = { linea: lineOf(p), n: padre ? padre.n : null, rawLabel: cerrado.rawLabel }; }
    } else if (stack.length === 1 && /[\w'"]/.test(ch) && !/[\w$'"]/.test(mask[p - 1] || '')) {
      // una clave de nivel 1 que no abre objeto/array (ej. `2025: null`)
      const mm = /^(?:'([^']*)'|"([^"]*)"|(\d+|[A-Za-z_$][\w$]*))\s*:/.exec(src.slice(p, p + 80));
      if (mm) ultimaClaveNivel1 = mm[1] ?? mm[2] ?? mm[3];
    }
  }
  return { comments: out, decls, mask, lineOf, lineStarts };
}

// la próxima clave de nivel 1 después de `pos` dentro del mismo objeto (o null si lo próximo es el cierre)
function proximaClave(src, mask, pos) {
  let depth = 0;
  for (let p = pos; p < mask.length; p++) {
    const ch = mask[p];
    if (ch === '{' || ch === '[') { if (depth === 0) { const mm = /(?:'([^']*)'|"([^"]*)"|([A-Za-z_$][\w$]*|\d+))\s*:\s*$/.exec(src.slice(Math.max(0, p - 120), p)); return mm ? (mm[1] ?? mm[2] ?? mm[3]) : null; } depth++; }
    else if (ch === '}' || ch === ']') { if (depth === 0) return null; depth--; }
    else if (depth === 0 && /[\w'"]/.test(ch) && /[\s,{]/.test(mask[p - 1] || ' ')) {
      const mm = /^(?:'([^']*)'|"([^"]*)"|(\d+|[A-Za-z_$][\w$]*))\s*:/.exec(src.slice(p, p + 80));
      if (mm) return mm[1] ?? mm[2] ?? mm[3];
    }
  }
  return null;
}
// la próxima fila ({ rawLabel }) en el mismo array, desde `pos`; null si el array se cierra antes
function proximaFila(src, mask, pos) {
  let depth = 0;
  for (let p = pos; p < mask.length; p++) {
    const ch = mask[p];
    if (ch === '{' || ch === '[') { if (depth === 0 && ch === '{') { const rl = /^\{\s*rawLabel\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/.exec(src.slice(p, p + 600)); return rl ? rl[2].replace(/\\(.)/g, '$1') : '(fila sin rawLabel)'; } depth++; }
    else if (ch === '}' || ch === ']') { if (depth === 0) return null; depth--; }
  }
  return null;
}

// texto de un comentario sin marcadores, línea por línea
function textoDe(t) {
  if (t.startsWith('//')) return [t.replace(/^\/\/ ?/, '')];
  return t.replace(/^\/\*+ ?/, '').replace(/ ?\*+\/$/, '').split('\n').map((l) => l.replace(/^\s*\* ?/, ''));
}

// ---------------------------------------------------------------------------
// 2. Asignar cada comentario a su ancla y armar el .md.
// ---------------------------------------------------------------------------
function mudar(clubId, src) {
  const rel = rutaData(clubId);
  const { comments, decls, mask, lineOf } = analizar(src, rel);
  const L = src.split('\n');
  const piezas = []; // { grupo:'cabecera'|'anio'|'fuentes'|'otros', anio, seccion, sub, tipo:'texto'|'fila', lineas, fila, rawLabel, orden }
  const primerDecl = decls.length ? decls[0].pos : Infinity;
  comments.forEach(({ c, stmt, depth, path: pth, ultimaFila, ultimaClaveNivel1 }, orden) => {
    const linea = lineOf(c.pos);
    const tl = L[linea - 1];
    const antes = tl.slice(0, tl.indexOf(c.text.split('\n')[0]));
    const finDeLinea = antes.trim() !== '';
    const lineas = textoDe(c.text);
    const base = { orden, lineas };
    if (c.pos < primerDecl) return piezas.push({ ...base, grupo: 'cabecera' });
    if (depth === 0) { // entre declaraciones: va con la de abajo (o la de arriba si es el pie)
      const sig = decls.find((d) => d.pos > c.pos);
      const nombre = sig ? sig.nombre : stmt;
      const sec = seccionPorAnio(nombre);
      if (nombre === 'sources') return piezas.push({ ...base, grupo: 'fuentes', sub: '(general)' });
      return piezas.push({ ...base, grupo: 'otros', sub: sec ? `${sec} (${nombre}), en general` : nombre });
    }
    const sec = seccionPorAnio(stmt);
    // clave de nivel 1: el año (o el id de la fuente)
    let clave1;
    if (depth === 1) clave1 = proximaClave(src, mask, c.pos + c.text.length) ?? ultimaClaveNivel1;
    else clave1 = pth[1] ? pth[1].clave : null;
    if (depth === 1 && finDeLinea) clave1 = ultimaClaveNivel1 ?? clave1; // `2025: { // tools/cargar.mjs ...` cuando el objeto ya se abrió: depth 2; esto cubre `2025: null, // ...`
    if (stmt === 'sources') {
      const extra = depth > 2 ? ` (dentro de ${pth.slice(2).map((s) => s.clave ?? `[${s.n}]`).join('.')})` : '';
      const campo = finDeLinea ? (/^\s*([A-Za-z_$][\w$]*)\s*:/.exec(tl) || [])[1] : null;
      return piezas.push({ ...base, grupo: 'fuentes', sub: clave1 || '(general)', nota: campo ? `campo \`${campo}\`` : extra ? extra.trim() : null });
    }
    if (sec) {
      const anio = clave1 && /^\d{4}$/.test(String(clave1)) ? String(clave1) : null;
      const grupoAnio = anio || `(fuera de un año: ${clave1 ?? 'nivel 1'})`;
      // fin de línea de una fila -> tabla
      if (finDeLinea && ultimaFila && ultimaFila.linea === linea && pth.length === 2 && pth[1].tipo === '[') {
        return piezas.push({ ...base, grupo: 'anio', anio: grupoAnio, seccion: sec, tipo: 'fila', fila: ultimaFila.n, rawLabel: ultimaFila.rawLabel });
      }
      let nota = null;
      if (finDeLinea) {
        const campo = (/^\s*['"]?([A-Za-z_$][\w$]*|\d{4})['"]?\s*:/.exec(tl) || [])[1];
        nota = campo && !/^\d{4}$/.test(campo) ? `al lado del campo \`${campo}\`` : (/^\s*['"]?\d{4}['"]?\s*:/.test(tl) ? null : `al final de la línea \`${antes.trim().slice(0, 60)}\``);
      } else if (depth >= 2 && pth[1] && pth[1].tipo === '[' && pth.length === 2) {
        const sig = proximaFila(src, mask, c.pos + c.text.length);
        nota = sig === null ? 'al final de las filas' : `antes de la fila ${pth[1].n + 1} (\`${sig}\`)`;
      } else if (depth > 2) {
        nota = `dentro de ${pth.slice(2).map((s) => s.clave ?? (s.rawLabel !== undefined ? `fila \`${s.rawLabel}\`` : `[${s.n}]`)).join(' › ')}`;
      }
      return piezas.push({ ...base, grupo: 'anio', anio: grupoAnio, seccion: sec, tipo: 'texto', nota });
    }
    const donde = [stmt, ...pth.slice(1).map((s) => s.clave ?? `[${s.n}]`)].filter(Boolean).join(' › ');
    return piezas.push({ ...base, grupo: 'otros', sub: stmt || '(sin declaración)', nota: depth > 1 ? `en ${donde}` : null });
  });

  // ---- armar el .md ----
  const fence = (lineas) => { const t = lineas.join('\n'); const f = /```/.test(t) ? '~~~' : '```'; return `${f}text\n${t}\n${f}`; };
  const celda = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  // texto: comentarios consecutivos (en el archivo) con la misma ancla y nota se juntan en un bloque
  function bloques(lista) {
    const out = []; let cur = null;
    for (const p of lista) {
      const k = `${p.nota || ''}`;
      if (cur && cur.k === k && p.orden === cur.ultimo + 1) { cur.lineas.push(...p.lineas); cur.ultimo = p.orden; }
      else { cur = { k, nota: p.nota, lineas: [...p.lineas], ultimo: p.orden }; out.push(cur); }
    }
    return out.map((b) => (b.nota ? `_${b.nota}:_\n\n` : '') + fence(b.lineas)).join('\n\n');
  }
  const md = [];
  md.push(`# ${clubId} — evidencia de carga`, '',
    `Lo que había como comentario en \`data/${clubId}-data.js\`, movido tal cual por \`tools/mover-comentarios-data.mjs\` (la regla:`,
    '`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y',
    'meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).');
  const cab = piezas.filter((p) => p.grupo === 'cabecera');
  if (cab.length) md.push('', '## Cabecera', '', bloques(cab));
  const anios = [...new Set(piezas.filter((p) => p.grupo === 'anio').map((p) => p.anio))]
    .sort((a, b) => (/^\d{4}$/.test(b) ? +b : -1) - (/^\d{4}$/.test(a) ? +a : -1));
  const ordenSec = SECCIONES_POR_ANIO.map(([, s]) => s);
  for (const a of anios) {
    md.push('', `## ${a}`);
    const delAnio = piezas.filter((p) => p.grupo === 'anio' && p.anio === a);
    for (const s of ordenSec) {
      const ps = delAnio.filter((p) => p.seccion === s);
      if (!ps.length) continue;
      md.push('', `### ${s}`);
      const tx = ps.filter((p) => p.tipo === 'texto');
      if (tx.length) md.push('', bloques(tx));
      const fs_ = ps.filter((p) => p.tipo === 'fila');
      if (fs_.length) {
        md.push('', '| Fila | Rubro | Nota |', '|---|---|---|');
        for (const f of fs_) md.push(`| ${f.fila} | ${celda(f.rawLabel)} | ${celda(f.lineas.join(' '))} |`);
      }
    }
  }
  const fu = piezas.filter((p) => p.grupo === 'fuentes');
  if (fu.length) {
    md.push('', '## Fuentes');
    for (const sub of [...new Set(fu.map((p) => p.sub))]) md.push('', `### ${sub}`, '', bloques(fu.filter((p) => p.sub === sub)));
  }
  const ot = piezas.filter((p) => p.grupo === 'otros');
  if (ot.length) {
    md.push('', '## Otros');
    for (const sub of [...new Set(ot.map((p) => p.sub))]) md.push('', `### ${sub}`, '', bloques(ot.filter((p) => p.sub === sub)));
  }
  const mdTxt = md.join('\n') + '\n';

  // ---- el archivo de datos sin comentarios ----
  let nuevo = '', last = 0;
  for (const { c } of comments) {
    const ls = src.lastIndexOf('\n', c.pos - 1) + 1;
    const end = c.pos + c.text.length;
    const resto = src.slice(end, (src.indexOf('\n', end) + 1 || src.length + 1) - 1);
    const soloEnLinea = src.slice(ls, c.pos).trim() === '' && resto.trim() === '';
    if (soloEnLinea && ls >= last) {
      nuevo += src.slice(last, ls);
      const nl = src.indexOf('\n', end); last = nl < 0 ? src.length : nl + 1;
    } else {
      // al final de la línea: también el espacio de antes; en el medio (`a, /* x */ b`), solo el comentario, para que el código dé igual byte a byte
      let ini = c.pos; if (resto.trim() === '') while (ini > last && /[ \t]/.test(src[ini - 1])) ini--;
      nuevo += src.slice(last, ini); last = end;
    }
  }
  nuevo += src.slice(last);
  nuevo = nuevo.replace(/^\s*\n/, '').replace(/\n{3,}/g, '\n\n');

  // ---- verificaciones ----
  const errores = [];
  if (normalizar(scan(rel, nuevo).code) !== normalizar(scan(rel, src).code)) errores.push('el código sin comentarios no da igual al original');
  if (scan(rel, nuevo).comments.length) errores.push(`quedaron ${scan(rel, nuevo).comments.length} comentarios en el archivo de datos`);
  const faltan = comments.flatMap(({ c }) => textoDe(c.text)).filter((l) => l.trim() && !mdTxt.includes(l.trim().replace(/\|/g, '\\|')) && !mdTxt.includes(l.trim()));
  if (faltan.length) errores.push(`${faltan.length} líneas de comentario no aparecen en el .md (ej.: ${JSON.stringify(faltan[0].slice(0, 80))})`);
  return { nuevo, mdTxt, errores, n: comments.length, piezas };
}

// ---------------------------------------------------------------------------
// 3. CLI
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const ensayo = args.includes('--ensayo') ? args[args.indexOf('--ensayo') + 1] : null;
const forzar = args.includes('--forzar');
let ids = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--ensayo');
if (args.includes('--todos')) ids = archivosData().map(idDeArchivo).sort();
if (!ids.length) { console.error('uso: node tools/mover-comentarios-data.mjs <clubId...> | --todos [--ensayo <dir>] [--forzar]'); process.exit(2); }

let mal = 0, hechos = 0, sinComentarios = 0;
for (const id of ids) {
  const dataPath = path.join(ROOT, rutaData(id));
  if (!fs.existsSync(dataPath)) { console.log(`MAL ${id}: no existe ${rutaData(id)}`); mal++; continue; }
  const src = fs.readFileSync(dataPath, 'utf8');
  const mdPath = path.join(ROOT, 'Admin', 'carga-clubes', `${id}.md`);
  const r = mudar(id, src);
  if (!r.n) { sinComentarios++; continue; }
  if (!ensayo && fs.existsSync(mdPath) && !forzar) { console.log(`MAL ${id}: ya existe Admin/carga-clubes/${id}.md (usar --forzar)`); mal++; continue; }
  if (r.errores.length) { console.log(`MAL ${id}: ${r.errores.join('; ')}`); mal++; continue; }
  const destData = ensayo ? path.join(ensayo, rutaData(id)) : dataPath;
  const destMd = ensayo ? path.join(ensayo, 'Admin', 'carga-clubes', `${id}.md`) : mdPath;
  fs.mkdirSync(path.dirname(destData), { recursive: true }); fs.mkdirSync(path.dirname(destMd), { recursive: true });
  fs.writeFileSync(destData, r.nuevo); fs.writeFileSync(destMd, r.mdTxt);
  console.log(`OK  ${id}: ${r.n} comentarios -> ${path.relative(ensayo || ROOT, destMd)} (data: ${(src.length / 1024).toFixed(0)} -> ${(r.nuevo.length / 1024).toFixed(0)} KB)`);
  hechos++;
}
console.log(`${hechos} mudados, ${sinComentarios} sin comentarios, ${mal} con problemas${ensayo ? ` (ENSAYO en ${ensayo})` : ''}`);
process.exit(mal ? 1 : 0);
