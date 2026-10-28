// tools/args-desconocidos.mjs — el aviso de «Argumento desconocido» para las tools que antes ignoraban un flag mal escrito y corrían igual (ítem 11 del punto 478).
// POR QUÉ. `node tools/fos.mjs cerrar 401 --escribir` corrió en ensayo sin decirlo (el flag correcto es `--cerrar`): quien escribe espera que escriba. Igual que medir-pipeline.mjs: un flag que no se conoce frena con 1.
// `sugerencias` = { '--escribir': '--cerrar' } suma el «¿…?» al mensaje. USO: import { argumentoDesconocido } from './args-desconocidos.mjs'.  Prueba: node tools/probar-cerrar.mjs
export function argumentoDesconocido(argv, conocidos, sugerencias = {}) {
  const raros = argv.filter((a) => a.startsWith('--') && !conocidos.includes(a));
  if (!raros.length) return null;
  return `Argumento desconocido: ${raros.map((a) => (sugerencias[a] ? `${a} (¿${sugerencias[a]}?)` : a)).join(', ')}. Los que acepta: ${conocidos.join(' ')}. No se hizo nada.`;
}
