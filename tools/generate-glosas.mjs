// tools/generate-glosas.mjs — generador: las glosas es/en de las etiquetas de cada club (data/<país>/<club>-glosas.js y data/glosas-indice.js), sin red.
// Lo corre la lista de tools/generadores.mjs al escribir un año; lo que falta de inglés (y de español en los clubes sin glosa en Generados/) lo pide
// `node tools/fos.mjs glosas-etiquetas --completar` y lo avisa audit.js (`etiqueta-sin-glosa`). El detalle está en tools/glosas-etiquetas.mjs.
process.argv.push('--escribir');
await import('./glosas-etiquetas.mjs');
