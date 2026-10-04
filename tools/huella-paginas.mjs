// ============================================================================
// tools/huella-paginas.mjs — la HUELLA DE CADA PÁGINA de una transcripción .md, para que cambiar una página no obligue a volver a
// validar (y pagar) las que no cambiaron.
//
// POR QUÉ (Versión 443, punto 1b.iii del HANDOFF, aprobado por Guido el 2026-10-04). Hasta acá la validación de una transcripción quedaba
// atada a la huella del .md ENTERO (inventario-transcripciones.mjs, `mdSha1`): cambiar una sola página la dejaba entera "sin verificar" y
// el resolver volvía a revisar todas. Caso: Juventus 2021-22. El 10-03 el resolver le pagó a Claude 17 páginas (US$ 1,13); el 10-04 se
// rearmaron las págs. 92, 93 y 100 con el texto propio del PDF, y el resolver volvió a pagar las MISMAS 17 páginas más la 233 (US$ 1,02).
//
// QUÉ GUARDA: el resolver (resolver-inventario.mjs) escribe en su línea de Admin/transcripciones-verificaciones.jsonl `paginasSha`:
// { "<n>": sha1 del cuerpo de la página n }. Una validación vieja no lo tiene: se comporta como antes (la primera vez nada se reusa).
//
// QUIÉN LO USA:
//   resolver-inventario.mjs   ETAPA 2, ESCALÓN 1a: una página con la misma huella que en la última validación "listo" no se vuelve a
//                             mandar a Claude ni a Gemini (se reusa lo resuelto). Las cambiadas siguen el camino de siempre.
//   inventario-transcripciones.mjs   el registro: si cambió la huella del archivo pero NINGUNA página (solo el encabezado o el final),
//                             el estado se conserva; si cambiaron páginas, "sin-verificar" dice cuáles.
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '..');
const VERIF = resolve(ROOT, 'Admin', 'transcripciones-verificaciones.jsonl');

// El .md partido por sus marcas "--- pág. N ---" (lo que estaba antes de la primera marca queda en `pre`). Era de resolver-inventario.mjs.
export function splitPages(text) {
  const re = /^--- pág\. (\d+) ---[ \t]*\r?\n?/gm;
  const marks = [...text.matchAll(re)];
  if (!marks.length) return { pre: text, pages: [] };
  const pages = marks.map((m, i) => ({ n: Number(m[1]), body: text.slice(m.index + m[0].length, i + 1 < marks.length ? marks[i + 1].index : text.length) }));
  return { pre: text.slice(0, marks[0].index), pages };
}

const sha = (s) => createHash('sha1').update(s).digest('hex');
// Espacios al final de cada renglón y renglones vacíos al final no cuentan: no cambian ningún número.
const cuerpo = (b) => String(b).replace(/[ \t]+$/gm, '').replace(/\s+$/, '');
export const huellasDePaginas = (pages) => Object.fromEntries(pages.map((p) => [String(p.n), sha(cuerpo(p.body))]));
export const huellasDelTexto = (text) => huellasDePaginas(splitPages(text).pages);

// La última validación "listo" de ese .md que guardó huellas por página (o null). El historial se lee una vez por proceso
// (inventario-transcripciones.mjs lo consulta para cientos de documentos); `releer` lo vuelve a leer (el resolver escribe mientras corre).
let _indice = null;
export function ultimaConPaginas(md, { releer = false } = {}) {
  if (!_indice || releer) {
    _indice = new Map();
    if (existsSync(VERIF)) for (const l of readFileSync(VERIF, 'utf8').split('\n')) {
      if (!l.includes('"paginasSha"')) continue;
      try { const v = JSON.parse(l); if (v.status === 'listo' && v.paginasSha) _indice.set(v.md, v); } catch { /* línea rota: se ignora */ }
    }
  }
  return _indice.get(md) || null;
}

// Páginas cuya huella cambió (o que no estaban) respecto de `previas`; y las que siguen iguales.
export function compararPaginas(previas, actuales) {
  const iguales = []; const cambiadas = [];
  for (const [n, h] of Object.entries(actuales)) (previas?.[n] === h ? iguales : cambiadas).push(Number(n));
  const borradas = Object.keys(previas || {}).filter((n) => !(n in actuales)).map(Number);
  return { iguales, cambiadas: [...cambiadas, ...borradas].sort((a, b) => a - b) };
}
