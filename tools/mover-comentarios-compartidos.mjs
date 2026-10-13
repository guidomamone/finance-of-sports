#!/usr/bin/env node
// ============================================================================
// tools/mover-comentarios-compartidos.mjs — muda las notas de UN club que están en archivos compartidos de data/ (data/clubs.js y
// data/club-leagues/<país>.js) a la evidencia de ese club, Admin/carga-clubes/<clubId>.md (to-do 209).
//
//   node tools/mover-comentarios-compartidos.mjs                 escribe data/ y Admin/carga-clubes/
//   node tools/mover-comentarios-compartidos.mjs --ensayo <dir>  escribe todo en <dir>, no toca el repo; lista lo que queda
//   node tools/mover-comentarios-compartidos.mjs --resto-ligas [--ensayo <dir>]   ver abajo
//   node tools/mover-comentarios-compartidos.mjs --gestiones [--ensayo <dir>]     ver abajo
//
// QUÉ ES "UNA NOTA DE UN CLUB" (lo demás queda donde está, para limpiarse a mano: cabeceras de archivo, títulos por país):
//   - un bloque de líneas `//` pegado (sin línea en blanco) arriba de la fila de un club;
//   - un comentario al final de la fila de un club.
// A DÓNDE VA: en data/club-leagues/, una nota que empieza con un año ("2025: tools/cargar.mjs ..., verificado contra ...") va a
// "## 2025" / "### Liga"; una fila con varias ("// 2024: ... // 2025: ...") se parte en una por año. Todo lo demás va a "## Cabecera",
// con una línea "_de data/<archivo>:_" arriba.
// --resto-ligas: lo que queda en data/club-leagues/<país>.js después (la cabecera: reglas repetidas y verificaciones de varios clubes
// juntos, que no se pueden partir por club sin cortar mal) va TAL CUAL a Admin/ligas-por-pais/<país>.md, y el archivo queda sin comentarios.
// SEGURIDAD: el archivo sin comentarios tiene que dar el mismo código que antes (normalizar(scan()) de comparar-sin-comentarios.js) y
// cada línea mudada tiene que estar en el .md de su club; si no, no escribe nada.
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as EV from './evidencia-club.mjs';
import { archivosData, idDeArchivo } from './data-clubes.js';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { scan, normalizar } = require('./comparar-sin-comentarios.js');

const args = process.argv.slice(2);
const ensayo = args.includes('--ensayo') ? args[args.indexOf('--ensayo') + 1] : null;
const clubIds = new Set(archivosData().map(idDeArchivo));
const archivos = ['data/clubs.js', ...fs.readdirSync(path.join(ROOT, 'data/club-leagues')).filter((f) => f.endsWith('.js')).sort().map((f) => `data/club-leagues/${f}`)];
const RE_FILA = /^\s*['"]?([a-z0-9-]+)['"]?\s*:\s*\{/;
const texto = (t) => (t.startsWith('//') ? [t.replace(/^\/\/ ?/, '')] : t.replace(/^\/\*+ ?/, '').replace(/ ?\*+\/$/, '').split('\n').map((l) => l.replace(/^\s*\* ?/, '')));

// --gestiones: data/gestiones/<país>.js. La nota arriba de una gestión (o al lado) va a "## Gestiones" del .md de ese club, con una
// línea "_antes de <nombre> (data/gestiones/xx.js):_"; la de arriba de un club, "_del club (…):_"; la del final de la lista, "_al
// final de la lista (…):_". Lo que queda (la cabecera de cada archivo) va TAL CUAL a Admin/gestiones-por-pais/<país>.md.
if (args.includes('--gestiones')) {
  const errs = []; const salida = {}; const mdsG = {}; let n = 0;
  const dir = path.join(ROOT, 'data/gestiones');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
    const rel = `data/gestiones/${f}`; const iso = f.replace(/\.js$/, '');
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8'); const L = src.split('\n');
    const { comments } = scan(rel, src);
    if (!comments.length) continue;
    const lineOf = (p) => src.slice(0, p).split('\n').length;
    // contexto de cada línea: club abierto y la gestión de esa línea
    const ctx = []; let club = null;
    L.forEach((t, k) => {
      const a = /^\s{2}['"]?([a-z0-9-]+)['"]?\s*:\s*\[/.exec(t);
      if (a) club = a[1];
      const nom = /\bnombre\s*:\s*(['"])((?:\\.|(?!\1).)*)\1/.exec(t);
      ctx[k + 1] = { club, abre: !!a, nombre: nom ? nom[2] : null, cierra: /^\s{2}\],?\s*$/.test(t) };
      if (ctx[k + 1].cierra) club = null;
    });
    const mover = []; const resto = [];
    for (const c of comments) {
      const ln = lineOf(c.pos); const tl = L[ln - 1];
      const fin = tl.slice(0, tl.indexOf(c.text.split('\n')[0])).trim() !== '';
      const ult = ln + c.text.split('\n').length - 1;
      let dueno = null, nota = null;
      if (fin && ctx[ln].club) { dueno = ctx[ln].club; nota = ctx[ln].nombre ? `junto a ${ctx[ln].nombre}` : 'en la lista'; }
      else if (!fin) {
        let k = ult + 1; while (k <= L.length && /^\s*\/\//.test(L[k - 1])) k++; // salta el resto del bloque de comentarios
        const sig = ctx[k] || {};
        if (sig.abre && sig.club) { dueno = sig.club; nota = 'del club'; }
        else if (ctx[ln].club && sig.nombre) { dueno = ctx[ln].club; nota = `antes de ${sig.nombre}`; }
        else if (ctx[ln].club && sig.cierra) { dueno = ctx[ln].club; nota = 'al final de la lista'; }
      }
      // un club sin data file (gestiones cargadas antes que sus balances) no tiene .md: su nota va al .md del país, con su etiqueta
      if (dueno && !clubIds.has(dueno)) resto.push({ c, etiqueta: `${dueno}, ${nota}`, fin });
      else (dueno ? mover : resto).push({ c, dueno, nota, fin });
    }
    // al .md del club: bloques consecutivos con la misma nota, juntos
    for (let i = 0; i < mover.length;) {
      let j = i; while (j + 1 < mover.length && mover[j + 1].dueno === mover[i].dueno && mover[j + 1].nota === mover[i].nota && !mover[i].fin) j++;
      const id = mover[i].dueno; const lineas = mover.slice(i, j + 1).flatMap((x) => texto(x.c.text));
      mdsG[id] = EV.agregarSeccion(mdsG[id] ?? EV.leer(id), 'Gestiones', lineas, `${mover[i].nota} (${rel})`);
      for (const l of lineas) if (l.trim() && !mdsG[id].includes(l.trim())) errs.push(`${rel}: "${l.slice(0, 50)}" no llegó a ${id}.md`);
      n += j - i + 1; i = j + 1;
    }
    // el resto, tal cual, al .md del país
    const lineasR = resto.flatMap((x) => texto(x.c.text));
    const t = /```/.test(lineasR.join('\n')) ? '~~~' : '```';
    const bloquesR = [];
    for (let i = 0; i < resto.length;) {
      let j = i; while (j + 1 < resto.length && resto[j + 1].etiqueta === resto[i].etiqueta && !resto[i].fin) j++;
      bloquesR.push((resto[i].etiqueta ? `_${resto[i].etiqueta}:_\n\n` : '') + `${t}text\n${resto.slice(i, j + 1).flatMap((x) => texto(x.c.text)).join('\n')}\n${t}`);
      i = j + 1;
    }
    const mdPais = lineasR.length ? `# Gestiones por país: ${iso}\n\nLo que había como comentario en \`${rel}\` (data/ se publica: to-do 209), movido tal cual por\n`
      + '`tools/mover-comentarios-compartidos.mjs --gestiones`: el criterio de este país, y las notas de los clubes que todavía no tienen\n'
      + 'balances cargados. El formato de las gestiones está en `Admin/ARQUITECTURA.md`; las notas de cada gestión de un club cargado, en\n'
      + 'su `Admin/carga-clubes/<club>.md`.\n\n' + bloquesR.join('\n\n') + '\n' : null;
    for (const l of lineasR) if (l.trim() && !mdPais.includes(l)) errs.push(`${rel}: "${l.slice(0, 50)}" no llegó al .md del país`);
    let nuevo = '', last = 0;
    for (const c of comments) {
      const ls = src.lastIndexOf('\n', c.pos - 1) + 1; const end = c.pos + c.text.length;
      const rs = src.slice(end, (src.indexOf('\n', end) + 1 || src.length + 1) - 1);
      if (src.slice(ls, c.pos).trim() === '' && rs.trim() === '' && ls >= last) { nuevo += src.slice(last, ls); const nl = src.indexOf('\n', end); last = nl < 0 ? src.length : nl + 1; }
      else { let ini = c.pos; if (rs.trim() === '') while (ini > last && /[ \t]/.test(src[ini - 1])) ini--; nuevo += src.slice(last, ini); last = end; }
    }
    nuevo = (nuevo + src.slice(last)).replace(/^\s*\n/, '').replace(/\n{3,}/g, '\n\n');
    if (normalizar(scan(rel, nuevo).code) !== normalizar(scan(rel, src).code)) errs.push(`${rel}: el código no da igual`);
    salida[rel] = { nuevo, mdPais, mdRel: `Admin/gestiones-por-pais/${iso}.md`, club: mover.length, pais: resto.length, sinData: resto.filter((x) => x.etiqueta).length };
  }
  if (errs.length) { console.log(`NO se escribió nada:\n  ${errs.slice(0, 10).join('\n  ')}`); process.exit(1); }
  const base = ensayo || ROOT;
  const w = (r, t) => { const p = path.join(base, r); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); };
  for (const [rel, x] of Object.entries(salida)) { w(rel, x.nuevo); if (x.mdPais) w(x.mdRel, x.mdPais); console.log(`${rel}: ${x.club} a los clubes, ${x.pais} a ${x.mdPais ? x.mdRel : '-'} (${x.sinData} de clubes sin balances)`); }
  for (const [id, md] of Object.entries(mdsG)) w(EV.rutaRel(id), md);
  console.log(`${n} comentarios a "## Gestiones" de ${Object.keys(mdsG).length} clubes${ensayo ? ` (ENSAYO en ${ensayo})` : ''}.`);
  process.exit(0);
}

if (args.includes('--resto-ligas')) {
  const errs = []; const salida = {};
  for (const rel of archivos.filter((r) => r.startsWith('data/club-leagues/'))) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const { comments } = scan(rel, src);
    if (!comments.length) continue;
    const iso = path.basename(rel, '.js');
    const lineas = comments.flatMap((c) => texto(c.text));
    const t = /```/.test(lineas.join('\n')) ? '~~~' : '```';
    const md = `# Ligas por país: ${iso}\n\nLo que había como comentario en \`${rel}\` (data/ se publica: to-do 209), movido tal cual por\n`
      + '`tools/mover-comentarios-compartidos.mjs --resto-ligas`: cómo se verificó en qué liga jugó cada club. Las reglas del formato están en\n'
      + '`data/club-leagues.js`; las notas de UN club, en su `Admin/carga-clubes/<club>.md`.\n\n'
      + `${t}text\n${lineas.join('\n')}\n${t}\n`;
    let nuevo = '', last = 0;
    for (const c of comments) {
      const ls = src.lastIndexOf('\n', c.pos - 1) + 1; const end = c.pos + c.text.length;
      const resto = src.slice(end, (src.indexOf('\n', end) + 1 || src.length + 1) - 1);
      if (src.slice(ls, c.pos).trim() === '' && resto.trim() === '' && ls >= last) { nuevo += src.slice(last, ls); const nl = src.indexOf('\n', end); last = nl < 0 ? src.length : nl + 1; }
      else { let ini = c.pos; if (resto.trim() === '') while (ini > last && /[ \t]/.test(src[ini - 1])) ini--; nuevo += src.slice(last, ini); last = end; }
    }
    nuevo = (nuevo + src.slice(last)).replace(/^\s*\n/, '').replace(/\n{3,}/g, '\n\n');
    if (normalizar(scan(rel, nuevo).code) !== normalizar(scan(rel, src).code)) errs.push(`${rel}: el código no da igual`);
    for (const l of lineas) if (l.trim() && !md.includes(l)) errs.push(`${rel}: falta "${l.slice(0, 50)}"`);
    salida[rel] = { nuevo, md, mdRel: `Admin/ligas-por-pais/${iso}.md`, n: comments.length };
  }
  if (errs.length) { console.log(`NO se escribió nada:\n  ${errs.join('\n  ')}`); process.exit(1); }
  const base = ensayo || ROOT;
  for (const [rel, x] of Object.entries(salida)) {
    for (const [r, t] of [[rel, x.nuevo], [x.mdRel, x.md]]) { const p = path.join(base, r); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); }
    console.log(`${rel}: ${x.n} comentarios -> ${x.mdRel}`);
  }
  process.exit(0);
}

const mds = {}; // clubId -> texto del .md
const leerMd = (id) => (mds[id] ??= EV.leer(id));
const quedan = []; const nuevos = {}; let mudadas = 0; const errores = [];

for (const rel of archivos) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const L = src.split('\n');
  const { comments } = scan(rel, src);
  const lineOf = (p) => src.slice(0, p).split('\n').length;
  const filaDe = (n) => { const m = RE_FILA.exec(L[n - 1] || ''); return m && clubIds.has(m[1]) ? m[1] : null; };
  const esLigas = rel.startsWith('data/club-leagues/');
  // dueño de cada comentario
  const info = comments.map((c) => {
    const ln = lineOf(c.pos); const tl = L[ln - 1];
    const fin = tl.slice(0, tl.indexOf(c.text.split('\n')[0])).trim() !== '';
    return { c, ln, fin, ultima: ln + c.text.split('\n').length - 1 };
  });
  for (let i = 0; i < info.length; i++) {
    const x = info[i];
    if (x.fin) { x.dueno = filaDe(x.ln); continue; }
    // bloque de comentarios de línea completa consecutivos: el dueño es la fila pegada abajo del último
    let j = i; while (j + 1 < info.length && !info[j + 1].fin && info[j + 1].ln === info[j].ultima + 1) j++;
    const dueno = filaDe(info[j].ultima + 1);
    for (let k = i; k <= j; k++) info[k].dueno = dueno;
    i = j;
  }
  const mover = info.filter((x) => x.dueno);
  for (const x of info.filter((y) => !y.dueno)) quedan.push(`${rel}:${x.ln}  ${x.c.text.split('\n')[0].slice(0, 110)}`);
  if (!mover.length) continue;
  // al .md de cada club (los bloques consecutivos juntos, en orden)
  const lineasMovidas = [];
  for (let i = 0; i < mover.length;) {
    let j = i; while (j + 1 < mover.length && mover[j + 1].dueno === mover[i].dueno && !mover[j + 1].fin && !mover[i].fin && mover[j + 1].ln === mover[j].ultima + 1) j++;
    const id = mover[i].dueno; const lineas = mover.slice(i, j + 1).flatMap((x) => texto(x.c.text));
    let md = leerMd(id);
    const porAnio = esLigas ? lineas.join(' ').split(/\s*\/\/\s*(?=\d{4}:)/).filter(Boolean) : [];
    if (esLigas && porAnio.length && porAnio.every((p) => /^\d{4}:/.test(p.trim()))) {
      for (const p of porAnio) { md = EV.agregarTexto(md, p.trim().slice(0, 4), 'Liga', [p.trim()]); lineasMovidas.push([id, p.trim()]); }
    } else { md = EV.agregarCabecera(md, lineas, `de ${rel}`); lineasMovidas.push(...lineas.map((l) => [id, l])); }
    mds[id] = md; mudadas += j - i + 1; i = j + 1;
  }
  // el archivo sin esos comentarios
  let nuevo = '', last = 0;
  for (const { c } of mover) {
    const ls = src.lastIndexOf('\n', c.pos - 1) + 1; const end = c.pos + c.text.length;
    const resto = src.slice(end, (src.indexOf('\n', end) + 1 || src.length + 1) - 1);
    if (src.slice(ls, c.pos).trim() === '' && resto.trim() === '' && ls >= last) { nuevo += src.slice(last, ls); const nl = src.indexOf('\n', end); last = nl < 0 ? src.length : nl + 1; }
    else { let ini = c.pos; if (resto.trim() === '') while (ini > last && /[ \t]/.test(src[ini - 1])) ini--; nuevo += src.slice(last, ini); last = end; }
  }
  nuevo += src.slice(last);
  if (normalizar(scan(rel, nuevo).code) !== normalizar(scan(rel, src).code)) errores.push(`${rel}: el código sin comentarios no da igual`);
  nuevos[rel] = nuevo;
  for (const [id, l] of lineasMovidas) if (l.trim() && !mds[id].includes(l.trim())) errores.push(`${rel}: "${l.slice(0, 60)}" no llegó a ${id}.md`);
}

if (errores.length) { console.log(`NO se escribió nada:\n  ${errores.slice(0, 10).join('\n  ')}`); process.exit(1); }
const base = ensayo || ROOT;
for (const [rel, t] of Object.entries(nuevos)) { const p = path.join(base, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); }
for (const [id, md] of Object.entries(mds)) {
  if (ensayo) { const p = path.join(base, EV.rutaRel(id)); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, md); }
  else EV.guardar(id, md);
}
console.log(`${mudadas} comentarios de ${Object.keys(mds).length} clubes mudados desde ${Object.keys(nuevos).length} archivos${ensayo ? ` (ENSAYO en ${ensayo})` : ''}.`);
console.log(`Quedan ${quedan.length} comentarios que no son de un club puntual:`);
for (const q of quedan) console.log(`  ${q}`);
