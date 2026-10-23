#!/usr/bin/env node
// ============================================================================
// tools/limpiar-comentarios.mjs — saca de los comentarios de tools/ la historia que se puede sacar sin leer: «(to-do N)», «(Versión N)»,
// una fecha entre paréntesis y un «TODO N:» al empezar un comentario. Toca SOLO texto de comentarios (los ubica
// `scan` de comparar-sin-comentarios.js); lo que no es un caso así queda para limpiar a mano (Admin/CONVENCIONES.md, «Comentarios en tools/»).
//
//   node tools/limpiar-comentarios.mjs                 ensayo: cuántas referencias saca en cada tool, sin escribir
//   node tools/limpiar-comentarios.mjs --escribir [a.mjs b.js …]   las reescribe (default: todas); después `node tools/comparar-sin-comentarios.js --tools`
//   node tools/limpiar-comentarios.mjs --revisar [--min 3] [--rev <commit>]   las líneas donde la limpieza quitaría al menos --min palabras que no son referencia, fecha ni atribución,
//                                                    para leerlas ANTES de --escribir (--rev las mira sobre las tools como estaban en ese commit)
//   node tools/limpiar-comentarios.mjs --perdidos [--desde <rev>] [--hasta <rev>] [--min 3] [a.mjs …]   mirando hacia atrás, de CUALQUIER cambio (no solo de esta tool): las líneas de
//                                                    comentario que había en --desde (HEAD) y ya no están en --hasta (el árbol), con las palabras con contenido que ningún comentario del archivo conserva.
//                                                    Lo corren solos `medir pipeline` (cambio de solo comentarios), `que-pide` y `cerrar`.
// ============================================================================
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const { scan, HISTORIA } = createRequire(import.meta.url)('./comparar-sin-comentarios.js');

const REF = '(?:Versi[oó]n(?:es)?|to-?dos?|TODO)\\s*(?:n[°º]\\s*)?\\d{1,4}(?:\\s*(?:,|y|e|/|·)\\s*\\d{1,4})*';
const FECHA = '20\\d\\d-\\d\\d-\\d\\d';
const ALGO = `(?:${REF}|${FECHA})`;
// un paréntesis que contiene solo referencias y fechas
const PAREN = new RegExp(`\\s*\\(\\s*${ALGO}(?:\\s*(?:,|;|·|y|/|—)?\\s*${ALGO})*\\s*\\)`, 'gi');
// un paréntesis corto con una referencia y algo más («Versión N, auditoría del pipeline»), sin citas ni paréntesis adentro
const PAREN_CON_RESTO = new RegExp(`\\s*\\((?=[^()]{0,90}\\))[^()«»"]*?(?:${REF}|${FECHA})[^()«»"]*\\)`, 'gi');
// «TODO N: …» o «to-do N — …» (con una letra de sub-punto) al empezar el comentario
const INICIO = new RegExp(`^((?://|/\\*+|\\*)\\s*)${REF}(?:\\s+[a-z]\\d?)?\\s*[:;,—-]\\s*`, 'i');
// el paréntesis con que empieza un comentario («// (Versión N, to-do N(i) paso 3) TEXTO»), con un paréntesis adentro como mucho: es la etiqueta de historia del comentario
const PAREN_INICIAL = new RegExp(`^((?://|/\\*+|\\*)\\s*)\\((?=(?:[^()]|\\([^()]*\\))*\\)\\s)(?:[^()«»"]|\\([^()]*\\))*?(?:${REF}|${FECHA})(?:[^()«»"]|\\([^()]*\\))*\\)\\s*`, 'i');

// El paréntesis se va solo si, sin las referencias, las fechas y quién lo aprobó, quedan 4 palabras o menos («fase 2», «cambio B»):
// con más es información («…, decisión de Guido, fecha») y se deja para limpiar a mano.
const ATRIBUCION = /\b(?:ok|aprobad[oa]s?|decidid[oa]s?|decisión|diseño|escalón|aprobación)\b[^,;:)]*\bGuido\b[^,;:)]*/gi;
function soloHistoria(paren) {
  const resto = paren.replace(new RegExp(ALGO, 'gi'), ' ').replace(ATRIBUCION, ' ').replace(/[(),;:·—-]/g, ' ');
  return resto.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length <= 4 ? '' : paren;
}

export function limpiarTexto(texto) {
  const t = texto.split('\n').map((l) => l.replace(PAREN, '').replace(PAREN_CON_RESTO, soloHistoria).replace(PAREN_INICIAL, (m, a) => (soloHistoria(m.slice(a.length).trimEnd()) === '' ? a : m)).replace(INICIO, '$1')).join('\n');
  return t !== texto && /^\/\/\s*$/.test(t) ? '' : t; // un comentario que la limpieza dejó vacío se va (los «//» de separación que ya estaban, no)
}

// Las palabras que una limpieza quita y que NO son referencia, fecha ni atribución: lo que quedaría sin leer (--revisar).
const VACIAS = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'en', 'por', 'y', 'o', 'a', 'al', 'con', 'que', 'se', 'un', 'una', 'es', 'ok', 'hasta', 'desde']);
export function conContenido(viejo, nuevo) {
  const palabras = (t) => t.replace(new RegExp(ALGO, 'gi'), ' ').replace(ATRIBUCION, ' ').split(/[\s(),;:·—«»"]+/).map((w) => w.replace(/^[.¿¡]+|[.?!]+$/g, '')).filter((w) => /[\p{L}\p{N}]/u.test(w) && !VACIAS.has(w.toLowerCase()));
  const resto = new Map();
  for (const w of palabras(nuevo)) resto.set(w, (resto.get(w) || 0) + 1);
  return palabras(viejo).filter((w) => { if (resto.get(w) > 0) { resto.set(w, resto.get(w) - 1); return false; } return true; });
}

// Mirar hacia atrás: las líneas de comentario de `desde` (HEAD por defecto) que ya no están en `hasta` (el árbol de trabajo por defecto, o una revisión) y cuyas
// palabras con contenido tampoco aparecen en ningún otro comentario del archivo nuevo. Sirve para ver qué se perdió en cualquier limpieza o commit, no solo en la de esta tool.
export function perdidos(nombres, { desde = 'HEAD', hasta = null, min = 3 } = {}) {
  const git = (...a) => { try { return execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 }); } catch { return null; } };
  const lineasDe = (rel, src) => scan(rel, src).comments.flatMap((c) => { const l0 = src.slice(0, c.pos).split('\n').length; return c.text.split('\n').map((t, k) => ({ linea: l0 + k, texto: t.trim() })); });
  const sinPunt = (t) => t.replace(/^(?:\/\/+|\/\*+|\*+\/?)\s*/, '').trim();
  const out = [];
  for (const f of nombres) {
    const rel = `tools/${f}`;
    const viejo = git('show', `${desde}:${rel}`);
    const nuevo = hasta ? git('show', `${hasta}:${rel}`) : (() => { try { return readFileSync(join(ROOT, rel), 'utf8'); } catch { return null; } })();
    if (viejo === null || nuevo === null) continue;
    const L1 = lineasDe(rel, viejo), L2 = lineasDe(rel, nuevo);
    // lo que `acortar-cabecera` mandó a Admin/NOTAS-DE-TOOLS.md tampoco se perdió
    let notas = '';
    try { notas = (readFileSync(join(ROOT, 'Admin', 'NOTAS-DE-TOOLS.md'), 'utf8').split(/\n## /).find((s) => s.startsWith(`${f}\n`)) || ''); } catch { /* sin notas */ }
    const delNotas = notas.split('\n').map((t) => t.trim()).filter(Boolean);
    const esta = new Set([...L2.map((x) => sinPunt(x.texto)), ...delNotas]);
    const palabrasNuevas = new Set([...L2.map((x) => sinPunt(x.texto)), ...delNotas].flatMap((t) => conContenido(t, '')));
    for (const x of L1) {
      const t = sinPunt(x.texto);
      if (!t || esta.has(t)) continue;
      const perdidas = [...new Set(conContenido(t, ''))].filter((w) => !palabrasNuevas.has(w));
      if (perdidas.length >= min) out.push({ f, linea: x.linea, perdidas, texto: t });
    }
  }
  return out;
}

export function limpiar(rel, src) {
  const { comments } = scan(rel, src);
  let out = '', i = 0, sacadas = 0;
  const cambios = [];
  for (const c of comments) {
    const nuevo = limpiarTexto(c.text);
    if (nuevo !== c.text) {
      const l0 = src.slice(0, c.pos).split('\n').length, A = c.text.split('\n'), B = nuevo.split('\n');
      if (A.length === B.length) A.forEach((a, k) => { if (a !== B[k]) cambios.push({ linea: l0 + k, antes: a.trim(), despues: B[k].trim() }); });
      else cambios.push({ linea: l0, antes: c.text.trim(), despues: nuevo.trim() });
    }
    sacadas += (c.text.match(HISTORIA) || []).length - (nuevo.match(HISTORIA) || []).length;
    const antes = src.slice(i, c.pos);
    out += (nuevo === '' && c.text !== '' ? antes.replace(/[ \t]+$/, '') : antes) + nuevo; i = c.pos + c.text.length;
  }
  return { src: out + src.slice(i), sacadas, cambios };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  const escribir = A.includes('--escribir');
  const revisar = A.includes('--revisar');
  const rev = v('--rev');
  const dados = A.filter((a, k) => !a.startsWith('--') && !['--rev', '--min', '--desde', '--hasta'].includes(A[k - 1]));
  if (A.includes('--perdidos')) {
    const desde = v('--desde') || 'HEAD';
    const nombres = dados.length ? dados : [...new Set(execFileSync('git', ['diff', '--name-only', desde, ...(v('--hasta') ? [v('--hasta')] : []), '--', 'tools'], { cwd: ROOT, encoding: 'utf8' }).split('\n').map((x) => x.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter(Boolean))];
    const r = perdidos(nombres, { desde, hasta: v('--hasta') || null, min: Number(v('--min')) || 3 });
    for (const x of r) console.log(`${x.f}:${x.linea}: se perdió «${x.perdidas.join(' ')}»   (${x.texto.slice(0, 90)})`);
    console.log(`${r.length} línea(s) de comentario con contenido que ya no está (${nombres.length} tool(s) entre ${desde} y ${v('--hasta') || 'el árbol'}).`);
    process.exit(0);
  }
  const archivos = dados.length ? dados : readdirSync(join(ROOT, 'tools')).filter((f) => /\.(mjs|js)$/.test(f) && f !== 'limpiar-comentarios.mjs').sort();
  if (escribir && !A.includes('--forzar')) { // reescribe decenas de tools: con tools/ sin commitear no hay vuelta atrás limpia (un `git checkout -- tools` se llevaría también lo ajeno)
    const sucias = execFileSync('git', ['status', '--porcelain', '--', 'tools'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
    if (sucias.length) { console.error(`No se escribe: tools/ tiene ${sucias.length} archivo(s) sin commitear (${sucias.slice(0, 4).map((l) => l.slice(3)).join(', ')}${sucias.length > 4 ? ', …' : ''}). Commitealos primero, así la pasada se revierte sola con git; --forzar lo salta.`); process.exit(1); }
  }
  let total = 0, tocadas = 0, aLeer = 0;
  for (const f of archivos) {
    const ruta = join(ROOT, 'tools', f);
    let src;
    try { src = rev ? execFileSync('git', ['show', `${rev}:tools/${f}`], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 }) : readFileSync(ruta, 'utf8'); } catch { continue; }
    const r = limpiar(`tools/${f}`, src);
    if (revisar) {
      const min = Number(v('--min')) || 3;
      for (const c of r.cambios) {
        const q = conContenido(c.antes, c.despues);
        if (q.length >= min) { aLeer++; console.log(`${f}:${c.linea}: se perdería «${q.join(' ')}»`); }
      }
      continue;
    }
    if (r.src === src) continue;
    total += r.sacadas; tocadas++;
    if (escribir) writeFileSync(ruta, r.src);
    else console.log(`  ${f.padEnd(36)} -${r.sacadas}`);
  }
  console.log(`${escribir ? 'Reescritas' : 'Sacaría'} ${total} referencias en ${tocadas} tools.${escribir ? ' Probá: node tools/comparar-sin-comentarios.js --tools' : ' (--escribir las saca)'}`);
}
