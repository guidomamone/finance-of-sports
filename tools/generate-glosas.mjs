// tools/generate-glosas.mjs — generador: las glosas es/en de las etiquetas de cada club (data/<país>/<club>-glosas.js y data/glosas-indice.js).
// Lo corre la lista de tools/generadores.mjs al escribir un año. Primero escribe lo que ya hay (sin red); después traduce con Claude lo que falte, con un tope de
// etiquetas por corrida (un año nuevo trae unas decenas; el atraso se come de a poco). Si la API no responde o no hay clave, deja lo escrito y sigue: nunca frena una carga.
// El detalle está en tools/glosas-etiquetas.mjs; audit.js avisa `etiqueta-sin-glosa` con lo que todavía falta.
import { estadoActual, escribirTodo, completar } from './glosas-etiquetas.mjs';

escribirTodo(estadoActual());
try {
  const r = await completar({ maxEtiquetas: 400, log: () => {} });
  if (r.pedidas) console.log(`glosas: ${r.traducidas} de ${r.pedidas} etiquetas traducidas (US$ ${r.usd})${r.errores.length ? `; sin traducir: ${[...new Set(r.errores)][0]}` : ''}`);
} catch (e) { console.log(`glosas: no se tradujo nada (${String(e.message || e).slice(0, 120)})`); }
