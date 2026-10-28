// tools/patrones-tools.mjs — el patrón del veredicto de las tools cambiadas, de la lista tools/patrones-tools.json (lo usan patron.mjs y cerrar-tool.mjs cuando no se pasa --patron ni --sin-documentos).
// Cada tool del pipeline tiene UNA entrada: `patron` (regex sobre los .md de Clubes/ que el cambio a esa tool deja ver), `sinDocumentos` (el motivo de una tool que no lee documentos) o `porCambio` (lee documentos y lo que
// se ve cambia con cada cambio: el patrón se pasa con --patron). Una tool del pipeline SIN entrada es un error (clasificar-tools.mjs --check, que corre audit.js): antes frenaba `cerrar-tool` recién al querer cerrar.
// patronDe(['cargar.mjs', …]) → { patron, sinDocumentos } (los que haya, unidos), o { falta: [tools sin patrón ni motivo], sinEntrada: [las que ni entrada tienen] }.
// sinEntrada(nombres) → las tools de la lista que no tienen ninguna entrada.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TABLA = resolve(import.meta.dirname, 'patrones-tools.json');
const leer = () => JSON.parse(readFileSync(TABLA, 'utf8'));
export function sinEntrada(nombres, t = leer()) { return nombres.filter((n) => !t[n]); }
export function patronDe(nombres, t = leer()) {
  const patrones = []; const motivos = []; const falta = [];
  for (const n of nombres) { const e = t[n]; if (!e) falta.push(n); else if (e.patron) patrones.push(e.patron); else if (e.sinDocumentos) motivos.push(e.sinDocumentos); else falta.push(n); }
  if (falta.length) return { falta, sinEntrada: sinEntrada(falta, t) };
  return { patron: patrones.length ? patrones.join('|') : null, sinDocumentos: patrones.length ? null : [...new Set(motivos)].join('; ') };
}
