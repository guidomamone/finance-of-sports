// tools/liga-decidir.mjs — la decisión de `club-siis.mjs --liga`: ¿se escribe la línea de liga del club?
// Se escribe SOLO si cada año sin liga tiene una liga con coincidencia exacta (ligasExactas ya descarta las «NO EXACTA»: pueden ser otro club con un nombre parecido). Con un solo año dudoso no se escribe
// ninguno (la línea de un club entera o nada) y se dice cuáles faltan. USO: import { decidirLigas } from './liga-decidir.mjs'.  Prueba: node tools/probar-club-siis.mjs
export function decidirLigas(anios, exactas) {
  const sin = anios.filter((a) => !exactas[a]);
  if (!anios.length) return { escribir: false, mapa: {}, sin, motivo: 'todos los años ya tienen liga' };
  if (sin.length) return { escribir: false, mapa: {}, sin, motivo: `sin coincidencia exacta en ${sin.join(', ')}: se confirma a mano (data/club-leagues/<iso>.js) y no se escribe ninguno` };
  return { escribir: true, mapa: Object.fromEntries(anios.map((a) => [a, exactas[a]])), sin: [], motivo: '' };
}
