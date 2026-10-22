// ============================================================================
// tools/familias-docs.mjs — la FAMILIA de un documento: país × formato (TODO 371).
//
// POR QUÉ: un cambio a una tool puede romper un país o un formato entero sin que una lista de prueba lo vea si esa familia casi no está en la
// lista. `medir-pipeline.mjs` exige al menos 3 documentos de cada familia afectada, y `lotes-prueba.mjs` arma las listas con cupo por familia.
// Una sola definición para los dos.
//
// País: la carpeta de Clubes/<País>/. Formato: `xhtml` si el documento viene de un informe XHTML/iXBRL (hay un .xhtml con el mismo nombre, o
// el nombre dice ixbrl), `pdf` en el resto.
// ============================================================================
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

export function familiaDe(pdf) {
  const partes = pdf.split('/');
  const pais = partes[1] || '?';
  const tronco = pdf.replace(/\.[^.]+$/, '');
  const xhtml = /ixbrl/i.test(pdf) || existsSync(resolve(ROOT, `${tronco}.xhtml`)) || existsSync(resolve(ROOT, `${tronco}-ixbrl.xhtml`));
  return { pais, formato: xhtml ? 'xhtml' : 'pdf', clave: `${pais} · ${xhtml ? 'xhtml' : 'pdf'}` };
}
