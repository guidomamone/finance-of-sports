// ============================================================================
// tools/temporada.js — A QUÉ TEMPORADA DE UNA LIGA PERTENECE UN EJERCICIO. Una sola función, para que faltantes-liga.mjs y audit.js no usen dos convenciones.
//
// La lista de equipos de cada liga (tools/club-league-reference/) está por la temporada que TERMINA en `anio` ("2024–25" = 2025). `club-leagues` pone a cada club en la categoría
// que tenía al cierre del ejercicio. Entonces, en una liga de temporada partida: un ejercicio que cierra entre septiembre y diciembre del año y (Sassuolo, los rusos: 31/12) es de la
// temporada que termina en y+1; uno que cierra entre enero y agosto (Burnley cierra el 31/7), de la que termina en y. En una liga de un año, ejercicio y = temporada y.
// No tiene `main` y se puede importar (a diferencia de tools/faltantes-liga.mjs, que corre al importarlo).
// ============================================================================
const { cierreDelClub } = require('./cierre-ejercicio.js');

// club: la fila de data/clubs.js; y: fiscal_year; partida: ¿la liga es de temporada partida?; ci: el cierre real del ejercicio como MM-DD si se lo conoce (data/club-index.js, `ci`)
function temporada(club, y, partida, ci) {
  if (!partida) return y;
  const mes = Number((ci || cierreDelClub(club, y).slice(5)).slice(0, 2));
  return mes >= 9 ? y + 1 : y;
}

module.exports = { temporada };
