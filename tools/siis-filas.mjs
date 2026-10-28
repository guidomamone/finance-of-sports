// tools/siis-filas.mjs — lo que `siis-estado.mjs` y `lote.mjs` se dicen sobre las FILAS de un estado de SIIS (Supersociedades, Colombia).
// POR QUÉ. Un `siis-estado-AAAA.md` puede quedar escrito SIN su `.filas.json` (un rubro de SIIS sin clase en CLASE, armar-a-mano que frena). Antes el resumen decía «Escritos N año(s)» y salía con 0, y el
// ensayo del lote lo estimaba como un documento cualquiera (localizar + extraer, ~US$ 0,2-0,4 por año) aunque SIIS es gratis y sus filas se arman sin IA.
// QUÉ HACE. `resumenSiis`: la línea final de siis-estado y su código de salida (distinto de 0 si algún año quedó sin filas). `faltaFilasSiis`: para un `siis-estado-AAAA.pdf` sin `.filas.json`, el comando que las arma
// (el lote lo imprime con costo 0 y no ofrece pagar localizar ni extraer); para cualquier otro documento, null.
// USO: import { resumenSiis, faltaFilasSiis } from './siis-filas.mjs'.  Prueba: node tools/probar-siis-filas.mjs
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado, ROOT } from './rutas.mjs';

export function resumenSiis({ escribir, escritos, frenados, sinFilas = [] }) {
  const cola = `${frenados ? `; ${frenados} año(s) frenado(s) por una compuerta` : ''}.`;
  if (!escribir) return { texto: `Ensayo: no se escribió nada (--escribir)${cola}`, codigo: 0 };
  if (!sinFilas.length) return { texto: `Escritos ${escritos} año(s)${cola}`, codigo: 0 };
  return { texto: `Escritos ${escritos} año(s): ${escritos - sinFilas.length} con filas, ${sinFilas.length} sin filas (${sinFilas.join(', ')}): el .md quedó escrito pero las filas no se armaron${cola}`, codigo: 1 };
}

export function faltaFilasSiis(pdf, raiz = ROOT) {
  const m = String(pdf).match(/^Clubes\/[^/]+\/([^/]+)\/siis-estado-(\d{4})\.pdf$/);
  if (!m) return null;
  const filas = derivado(pdf, '.filas.json', { crear: false });
  if (existsSync(resolve(raiz, filas))) return null;
  return { club: m[1], anio: m[2], aviso: `falta el .filas.json: node tools/siis-estado.mjs --club "${m[1]}" --anio ${m[2]} --rehacer --escribir (gratis; sin filas no se localiza ni se extrae, que se pagarían)` };
}
