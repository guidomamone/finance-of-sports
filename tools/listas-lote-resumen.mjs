// tools/listas-lote-resumen.mjs — las líneas finales de `listas-lote.mjs`: con --lote separa los liga-años del lote de los de otros clubes (ítem 9 del punto 478).
// POR QUÉ. Con --lote la corrida suma al lote el modo de siempre (todas las liga-años que faltan de todos los clubes), y su fallo «0 de 1 liga-años pasaron la compuerta. NO: be-div1amateur 2013…» salía en el resumen
// de cada lote, también en uno colombiano. Ahora el resumen del lote cuenta SOLO los liga-años de los documentos de su lista (los mismos que antes), y lo de otros clubes va aparte, en líneas que
// lote-final.mjs no muestra (empiezan con «  (fuera del lote) NO:»). La descarga de listas no cambia: se siguen procesando todos.
// ENTRADA: { esLote, ok, fallan: [{ txt, delLote }], ensayo }. SALIDA: las líneas a imprimir. USO: import { lineasResumen } from './listas-lote-resumen.mjs'.  Prueba: node tools/probar-listas-lote-resumen.mjs
export function lineasResumen({ esLote, ok, fallan, ensayo }) {
  const suyos = esLote ? fallan.filter((f) => f.delLote) : fallan, otros = esLote ? fallan.filter((f) => !f.delLote) : [];
  const okSuyos = esLote ? ok.filter((o) => o.delLote).length : ok.length, okOtros = ok.length - okSuyos;
  const sufijo = ensayo ? ' (ensayo: no se escribió nada)' : '';
  const L = [`\nlistas-lote: ${okSuyos} de ${okSuyos + suyos.length} liga-años pasaron la compuerta${esLote ? ' (los de la lista del lote)' : ''}${sufijo}.`];
  for (const f of suyos) L.push(`  NO: ${f.txt}`);
  if (esLote && (otros.length || okOtros)) {
    L.push(`  (además, de otros clubes y fuera de este lote: ${okOtros} pasaron y ${otros.length} no; \`node tools/listas-lote.mjs\` sin --lote los muestra)`);
    for (const f of otros) L.push(`  (fuera del lote) NO: ${f.txt}`);
  }
  return L;
}
