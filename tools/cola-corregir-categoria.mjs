// tools/cola-corregir-categoria.mjs — `node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta tal cual>" <categoría> [--nota "..."]` (movido de cola.mjs, que pasaba los 40 KB).
// Guido fija la categoría de UNA fila de un documento aunque la categorización no haya tenido dudas (UC 2025: "Costo de ventas" sin desglose -> "sin desglosar por la fuente", no "Otros gastos").
// Crea el caso y su respuesta de una vez; la toma cargar.mjs en la próxima corrida (respuestaCat) y queda como precedente del club. La etiqueta se escribe como en el documento.
// Si esa fila ya quedó fijada con esa misma categoría (club-siis --avanzar la repite en cada corrida) no agrega otra respuesta idéntica: dice que ya estaba.
import { readFileSync, appendFileSync } from 'node:fs';
import { lineaDeRespuesta } from './cola-respuesta.mjs';

export async function corregirCategoria({ A, flag, ARCHIVO, agregarCaso }) {
  const i = A.indexOf('--corregir-categoria'); const [pdf, etiqueta, categoria] = A.slice(i + 1, i + 4);
  if (!pdf || !etiqueta || !categoria) { console.error('Uso: node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta tal cual>" <categoría> [--nota "..."]'); process.exit(1); }
  // la categoría tiene que ser de la taxonomía del deporte del club del documento (data/category-map.js, SPORT_TAXONOMIES)
  const { clubDeRuta } = await import('./carpetas-clubes.mjs'); const { categoriasDeDeporte, resolverDeporte, MENSAJE_SIN_DEPORTE } = await import('./deporte-club.mjs');
  const deporteDoc = resolverDeporte({ club: clubDeRuta(pdf).clubId, pdf });
  if (!deporteDoc) { console.error(MENSAJE_SIN_DEPORTE(pdf.split('/').slice(1, 3).join('/'))); process.exit(1); }
  if (!categoriasDeDeporte(deporteDoc)?.todas.has(categoria)) { console.error(`"${categoria}" no es una categoría de ${deporteDoc} (SPORT_TAXONOMIES de data/category-map.js)`); process.exit(1); }
  const { normalizar } = await import('./vocabulario.mjs');
  const id = agregarCaso({ pdf, md: pdf.replace(/\.pdf$/i, '.md'), etapa: 'cargar', motivo: 'categoria', detalle: normalizar(etiqueta), categoriaPropuesta: categoria, que: `Corrección de Guido: "${etiqueta}" va como ${categoria}.` });
  const previas = readFileSync(ARCHIVO, 'utf8').split('\n').filter((l) => l.includes(`"id":"${id}"`) && l.includes('"tipo":"respuesta"')).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  if (previas.length && previas[previas.length - 1].decision === 'corregir' && previas[previas.length - 1].valor === categoria) { console.log(`Ya estaba fijada (${id}): "${etiqueta}" -> ${categoria}. No se agregó nada.`); return; }
  // 'corregir' con la categoría, no 'aceptar': agregarCaso devuelve el caso YA ABIERTO de esa fila, con SU categoriaPropuesta;
  // 'aceptar' aceptaba esa propuesta vieja y no la corrección.
  appendFileSync(ARCHIVO, JSON.stringify(lineaDeRespuesta({ id, decision: 'corregir', valor: categoria, nota: flag('--nota'), evidencia: 'ninguna', seguridad: 'alta', causa: 'decision-de-guido' }).linea) + '\n');
  console.log(`Categoría fijada (${id}): "${etiqueta}" -> ${categoria}. La toma cargar.mjs en la próxima corrida.`);
}
