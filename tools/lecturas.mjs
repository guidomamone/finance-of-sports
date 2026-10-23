#!/usr/bin/env node
// ============================================================================
// tools/lecturas.mjs — `fos lecturas`: qué documentos lee una sesión, cuántos tokens cuestan y cuáles se leyeron en vano (el eje `tokens` de la Auditora).
//
// POR QUÉ. El costo más repetido del proyecto es el arranque en frío y lo que una sesión lee «por si acaso». Sin una cifra, recortar es opinión. Esto lee los
// transcripts de las sesiones (~/.claude/projects/<proyecto>/*.jsonl) y cuenta, por archivo, los Read, las skills cargadas y los tokens aproximados (caracteres / 4) de lo que volvió.
// «En vano» = leído y después ningún Edit, Write ni comando nombra ese archivo (por su nombre): una aproximación; la decisión de recortar la toma una sesión mirando el documento.
//
// USO:  node tools/lecturas.mjs [--ultimas N] [--sesion <id>] [--top K] [--json]     (por defecto las 5 sesiones más recientes y el tope de 20)
// Lee solo los transcripts; no escribe nada. Con --json deja la tabla para Admin/registros/lecturas.jsonl (antes y después de recortar).
// ============================================================================
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { homedir } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const val = (k, d) => { const i = A.indexOf(k); return i < 0 ? d : A[i + 1]; };
const DIR = join(homedir(), '.claude', 'projects', ROOT.replace(/[/.]/g, '-'));
const sesiones = val('--sesion', null) ? [join(DIR, `${val('--sesion')}.jsonl`)]
  : readdirSync(DIR).filter((f) => f.endsWith('.jsonl')).map((f) => join(DIR, f)).sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs).slice(0, Number(val('--ultimas', 5)));
const texto = (c) => (typeof c === 'string' ? c : Array.isArray(c) ? c.map((x) => x.text || '').join('') : '');

const porArchivo = new Map(); // ruta relativa -> { lecturas, tokens, usado, sesiones:Set }
for (const s of sesiones) {
  const pendientes = new Map(); // tool_use_id -> { clave }
  const escritos = []; // texto de todo lo que vino después: Edit, Write, Bash
  const lecturas = []; // { clave, tokens, posicion }
  let pos = 0;
  for (const l of readFileSync(s, 'utf8').split('\n')) {
    if (!l.trim()) continue;
    let j; try { j = JSON.parse(l); } catch { continue; }
    const c = j.message?.content; if (!Array.isArray(c)) continue;
    for (const x of c) {
      pos++;
      if (x.type === 'tool_use') {
        const inp = x.input || {};
        if (x.name === 'Read' && inp.file_path) pendientes.set(x.id, { clave: relativo(inp.file_path) });
        else if (x.name === 'Skill' && inp.skill) pendientes.set(x.id, { clave: `skill:${inp.skill}` });
        else if (['Edit', 'Write', 'Bash'].includes(x.name)) escritos.push({ pos, txt: JSON.stringify(inp) });
      } else if (x.type === 'tool_result' && pendientes.has(x.tool_use_id)) {
        lecturas.push({ clave: pendientes.get(x.tool_use_id).clave, tokens: Math.round(texto(x.content).length / 4), pos });
      }
    }
  }
  for (const r of lecturas) {
    const e = porArchivo.get(r.clave) || { lecturas: 0, tokens: 0, usado: 0, sesiones: new Set() };
    e.lecturas++; e.tokens += r.tokens; e.sesiones.add(basename(s));
    const nombre = basename(r.clave).replace(/^skill:/, '').replace(/\.md$/, '');
    if (escritos.some((w) => w.pos > r.pos && w.txt.includes(nombre))) e.usado++;
    porArchivo.set(r.clave, e);
  }
}
function relativo(p) { return p.startsWith(ROOT) ? p.slice(ROOT.length + 1) : p; }

const filas = [...porArchivo].map(([archivo, e]) => ({ archivo, lecturas: e.lecturas, tokens: e.tokens, usado: e.usado, sesiones: e.sesiones.size })).sort((a, b) => b.tokens - a.tokens);
const total = filas.reduce((s, f) => s + f.tokens, 0);
if (A.includes('--json')) { console.log(JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), sesiones: sesiones.length, total, filas: filas.slice(0, Number(val('--top', 20))) })); process.exit(0); }
console.log(`${sesiones.length} sesión(es), ${filas.length} archivos/skills leídos, ~${total.toLocaleString('es')} tokens en total.\n`);
console.log('tokens  %     lecturas usadas sesiones  archivo');
for (const f of filas.slice(0, Number(val('--top', 20)))) console.log(`${String(f.tokens).padStart(6)} ${String(Math.round(100 * f.tokens / total)).padStart(3)}% ${String(f.lecturas).padStart(8)} ${String(f.usado).padStart(6)} ${String(f.sesiones).padStart(8)}  ${f.archivo}${f.usado === 0 ? '   ← sin uso después' : ''}`);
console.log('\n«usadas»: lecturas después de las cuales un Edit, Write o comando nombró el archivo. «sin uso después» es una pista, no un veredicto.');
