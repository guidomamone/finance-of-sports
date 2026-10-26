// tools/patrones-tools.mjs — el patrón del veredicto de las tools cambiadas, de la lista corta tools/patrones-tools.json (lo usan patron.mjs y cerrar-tool.mjs cuando no se pasa --patron ni --sin-documentos).
// patronDe(['cargar.mjs', …]) → { patron, sinDocumentos } (los que haya, unidos), o { falta: [tools sin entrada] }.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TABLA = resolve(import.meta.dirname, 'patrones-tools.json');
export function patronDe(nombres) {
  const t = JSON.parse(readFileSync(TABLA, 'utf8')); const patrones = []; const motivos = []; const falta = [];
  for (const n of nombres) { const e = t[n]; if (!e) falta.push(n); else if (e.patron) patrones.push(e.patron); else if (e.sinDocumentos) motivos.push(e.sinDocumentos); else falta.push(n); }
  if (falta.length) return { falta };
  return { patron: patrones.length ? patrones.join('|') : null, sinDocumentos: patrones.length ? null : [...new Set(motivos)].join('; ') };
}
