#!/usr/bin/env node
// ============================================================================
// tools/comparar-sin-comentarios.js — saca los comentarios de un archivo publicado (index.html, js/*.js) y lo compara contra HEAD.
//
// Para qué: limpiar comentarios (regla de Admin/PANTALLA.md, "Comentarios en lo que se publica") sin tocar una sola línea que se
// ejecuta. Si el archivo sin comentarios da igual al de HEAD sin comentarios, la limpieza no cambió el código.
//
//   node tools/comparar-sin-comentarios.js index.html js/liga.js   # compara cada uno contra HEAD
//   node tools/comparar-sin-comentarios.js --todos                 # index.html y todo js/
//   node tools/comparar-sin-comentarios.js --tools                 # las tools/ cambiadas contra HEAD: mismo código sin comentarios y `node --check` (limpiar comentarios de tools/)
//   node tools/comparar-sin-comentarios.js --medir [N]             # por tool de tools/: bytes de comentarios, referencias a «Versión N», «to-do N» y fechas, cabecera larga; las N peores (default 15)
//
// Normalización: se borra cada comentario, se recorta el espacio al final de cada línea y se descartan las líneas vacías. Todo lo
// demás (indentación, espacios dentro de una línea, strings) tiene que coincidir byte a byte.
//
// También lo usa tools/audit.js (`comentarios()`) para el chequeo `comentario-interno-publicado`.
// ============================================================================
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

// Palabras después de las cuales una `/` abre un regex y no es una división.
const KW_REGEX = new Set(['return', 'typeof', 'case', 'in', 'of', 'delete', 'void', 'throw', 'new', 'else', 'do', 'yield', 'await', 'instanceof']);

// Recorre JS y devuelve { code, comments: [{ text, pos }] }. Respeta strings, templates (con `${}` anidados) y regex literales.
function scanJs(src) {
  let out = '';
  const comments = [];
  let i = 0;
  let prev = '';       // último carácter significativo emitido (no espacio)
  let prevWord = '';   // última palabra emitida, para decidir si `/` abre un regex
  const stack = [];    // por cada `${` abierto dentro de un template, la profundidad de llaves
  const n = src.length;
  const emit = s => { out += s; };
  const note = s => {
    const t = s.trimEnd();
    if (!t) return;
    prev = t[t.length - 1];
    const m = /([A-Za-z_$][\w$]*)$/.exec(t);
    prevWord = m ? m[1] : '';
  };
  function readTemplate() { // i apunta al carácter siguiente a la comilla invertida
    let s = '';
    while (i < n) {
      const c = src[i];
      if (c === '\\') { s += src.slice(i, i + 2); i += 2; continue; }
      if (c === '`') { s += c; i++; return { s, done: true }; }
      if (c === '$' && src[i + 1] === '{') { s += '${'; i += 2; stack.push(0); return { s, done: false }; }
      s += c; i++;
    }
    return { s, done: true };
  }
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') {
      const fin = src.indexOf('\n', i);
      const end = fin < 0 ? n : fin;
      comments.push({ text: src.slice(i, end), pos: i });
      i = end;
      continue;
    }
    if (c === '/' && d === '*') {
      const fin = src.indexOf('*/', i + 2);
      const end = fin < 0 ? n : fin + 2;
      comments.push({ text: src.slice(i, end), pos: i });
      i = end;
      continue;
    }
    if (c === "'" || c === '"') {
      let j = i + 1;
      while (j < n && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1;
      const s = src.slice(i, j + 1);
      emit(s); note(s); i = j + 1;
      continue;
    }
    if (c === '`') {
      i++;
      const r = readTemplate();
      emit('`' + r.s); note('`'); if (r.done) prev = '`';
      continue;
    }
    if (c === '}' && stack.length && stack[stack.length - 1] === 0) {
      stack.pop();
      i++;
      const r = readTemplate();
      emit('}' + r.s); prev = '`';
      continue;
    }
    if (stack.length && c === '{') stack[stack.length - 1]++;
    if (stack.length && c === '}') stack[stack.length - 1]--;
    if (c === '/') {
      // Después de un identificador, `)` o `]` es división; después de un operador, de `(`, o de return/typeof..., es un regex.
      const esRegex = prev === '' || '(,=:[!&|?{};+-*%<>~^'.includes(prev) || KW_REGEX.has(prevWord);
      if (esRegex) {
        let j = i + 1, enClase = false;
        while (j < n && src[j] !== '\n') {
          if (src[j] === '\\') { j += 2; continue; }
          if (src[j] === '[') enClase = true;
          else if (src[j] === ']') enClase = false;
          else if (src[j] === '/' && !enClase) break;
          j++;
        }
        j++;
        while (j < n && /[a-z]/i.test(src[j])) j++;
        const s = src.slice(i, j);
        emit(s); prev = '/'; prevWord = ''; i = j;
        continue;
      }
    }
    emit(c);
    if (!/\s/.test(c)) {
      prev = c;
      if (/[\w$]/.test(c)) prevWord = (/[\w$]/.test(out[out.length - 2] || '') ? prevWord : '') + c;
      else prevWord = '';
    }
    i++;
  }
  return { code: out, comments };
}

// CSS: solo comentarios /* */ y strings.
function scanCss(src) {
  let out = '';
  const comments = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '*') {
      const fin = src.indexOf('*/', i + 2);
      const end = fin < 0 ? src.length : fin + 2;
      comments.push({ text: src.slice(i, end), pos: i });
      i = end;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1;
      out += src.slice(i, j + 1); i = j + 1;
      continue;
    }
    out += c; i++;
  }
  return { code: out, comments };
}

// HTML: <!-- --> afuera de script/style; adentro de <script> se escanea como JS y adentro de <style> como CSS.
function scanHtml(src) {
  let out = '';
  const comments = [];
  let i = 0;
  const lower = src.toLowerCase();
  while (i < src.length) {
    if (src.startsWith('<!--', i)) {
      const fin = src.indexOf('-->', i + 4);
      const end = fin < 0 ? src.length : fin + 3;
      comments.push({ text: src.slice(i, end), pos: i });
      i = end;
      continue;
    }
    const tag = /^<(script|style)\b[^>]*>/i.exec(src.slice(i, i + 300));
    if (tag) {
      const nombre = tag[1].toLowerCase();
      const ini = i + tag[0].length;
      let fin = lower.indexOf(`</${nombre}`, ini);
      if (fin < 0) fin = src.length;
      const r = (nombre === 'script' ? scanJs : scanCss)(src.slice(ini, fin));
      out += tag[0] + r.code;
      r.comments.forEach(c => comments.push({ text: c.text, pos: c.pos + ini }));
      i = fin;
      continue;
    }
    out += src[i]; i++;
  }
  return { code: out, comments };
}

function scan(rel, src) {
  if (rel.endsWith('.html')) return scanHtml(src);
  if (rel.endsWith('.css')) return scanCss(src);
  return scanJs(src);
}

function normalizar(code) {
  return code.split('\n').map(l => l.trimEnd()).filter(l => l !== '').join('\n');
}

// Comentarios de un archivo, con su número de línea (para audit.js).
function comentarios(rel, src) {
  const { comments } = scan(rel, src);
  return comments.map(c => ({ text: c.text, line: src.slice(0, c.pos).split('\n').length }));
}

function publicados() {
  return ['index.html', ...fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).sort().map(f => 'js/' + f)];
}

function comparar(rel) {
  const ahora = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  let antes;
  try { antes = execFileSync('git', ['show', `HEAD:${rel}`], { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 }).toString(); }
  catch { return { rel, ok: false, msg: 'no está en HEAD' }; }
  const a = normalizar(scan(rel, antes).code).split('\n');
  const b = normalizar(scan(rel, ahora).code).split('\n');
  const max = Math.max(a.length, b.length);
  for (let k = 0; k < max; k++) {
    if (a[k] !== b[k]) {
      return { rel, ok: false, msg: `difiere en la línea normalizada ${k + 1}:\n  HEAD:  ${a[k] === undefined ? '(nada)' : a[k]}\n  ahora: ${b[k] === undefined ? '(nada)' : b[k]}` };
    }
  }
  const nAntes = scan(rel, antes).comments.length, nAhora = scan(rel, ahora).comments.length;
  return { rel, ok: true, msg: `mismo código (comentarios: ${nAntes} → ${nAhora})` };
}

// Lo que un comentario de una tool no debería llevar: historia («Versión N», «to-do N», fechas AAAA-MM-DD). audit.js lo cuenta (`comentario-historico-en-tools`).
// Las fechas son las de 2026 (el año del proyecto: lo anterior es un dato, un ejemplo o el nombre de un documento) y no cuentan dentro de un nombre, una ruta ni un flag.
const HISTORIA = /Versi[oó]n \d+|\bto-?do \d{1,3}\b|\bTODO \d{1,3}\b|(?<![-\w/@])(?<!--desde )(?<!--hasta )(?<!--fecha )\b2026-\d\d-\d\d\b/gi;
function herramientas() {
  return fs.readdirSync(path.join(ROOT, 'tools')).filter(f => /\.(mjs|js)$/.test(f)).sort();
}
function medirTool(f) {
  const rel = 'tools/' + f;
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const { comments } = scan(rel, src);
  const bytes = comments.reduce((a, c) => a + Buffer.byteLength(c.text), 0);
  const historia = comments.flatMap(c => (c.text.match(HISTORIA) || []).map(t => ({ t, line: src.slice(0, c.pos).split('\n').length })));
  let cabecera = 0;
  for (const l of src.split('\n')) { if (l.startsWith('//') || l.startsWith('#!') || l.trim() === '') cabecera++; else break; }
  return { f, total: Buffer.byteLength(src), bytes, historia, cabecera };
}

// Más líneas que esto en la cabecera de una tool es mucho para leer en cada sesión que la abre (aviso `cabecera-larga-en-tools` de audit.js; excepciones con motivo: tools/cabeceras-aceptadas.json).
const CABECERA_MAX = 40;

module.exports = { scan, comentarios, normalizar, publicados, herramientas, medirTool, HISTORIA, CABECERA_MAX };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--medir')) {
    const filas = herramientas().map(medirTool);
    const T = filas.reduce((a, r) => [a[0] + r.total, a[1] + r.bytes, a[2] + r.historia.length], [0, 0, 0]);
    console.log(`${filas.length} tools · ${T[0]} bytes, ${T[1]} de comentarios (${(100 * T[1] / T[0]).toFixed(1)} %) · ${T[2]} referencias históricas en ${filas.filter(r => r.historia.length).length} tools · ${filas.filter(r => r.cabecera > 25).length} cabeceras de más de 25 líneas`);
    const n = Number(args[args.indexOf('--medir') + 1]) || 15;
    for (const r of filas.sort((a, b) => b.historia.length - a.historia.length || b.bytes - a.bytes).slice(0, n)) console.log(`  ${r.f.padEnd(34)} ${String(r.total).padStart(7)} B · comentarios ${String(Math.round(100 * r.bytes / r.total)).padStart(2)} % · historia ${String(r.historia.length).padStart(3)} · cabecera ${r.cabecera} líneas`);
    process.exit(0);
  }
  if (args.includes('--tools')) { // las tools cambiadas contra HEAD (más las nuevas): mismo código y sintaxis; la salida no cambia con los comentarios, para usarla de medidor
    const cambiadas = [...new Set((execFileSync('git', ['diff', '--name-only', 'HEAD', '--', 'tools'], { cwd: ROOT }).toString() + '\n' + execFileSync('git', ['ls-files', '--others', '--exclude-standard', 'tools'], { cwd: ROOT }).toString()).split('\n').map(f => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter(Boolean))];
    let mal = 0;
    for (const f of cambiadas) {
      const r = comparar('tools/' + f);
      let sintaxis = true; try { execFileSync('node', ['--check', path.join(ROOT, 'tools', f)], { stdio: 'ignore' }); } catch { sintaxis = false; }
      if (!r.ok && r.msg !== 'no está en HEAD') { console.log(`MAL tools/${f}: ${r.msg}`); mal++; }
      if (!sintaxis) { console.log(`MAL tools/${f}: node --check falla`); mal++; }
    }
    console.log(mal ? `${mal} problema(s)` : `${cambiadas.length} tools cambiadas: mismo código sin comentarios y sintaxis válida`);
    process.exit(mal ? 1 : 0);
  }
  const files = args.includes('--todos') ? publicados() : args.filter(a => !a.startsWith('--'));
  if (!files.length) { console.error('uso: node tools/comparar-sin-comentarios.js <archivo...> | --todos'); process.exit(2); }
  let mal = 0;
  for (const rel of files) {
    const r = comparar(rel);
    console.log(`${r.ok ? 'OK ' : 'MAL'} ${rel}: ${r.msg}`);
    if (!r.ok) mal++;
  }
  process.exit(mal ? 1 : 0);
}
