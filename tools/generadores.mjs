// ============================================================================
// tools/generadores.mjs — LOS GENERADORES QUE SE CORREN ANTES DE LA AUDITORÍA al escribir en el sitio (to-do 298 x), en UN solo lugar.
//
// POR QUÉ. cargar.mjs (publicarCambios) y alta-club.mjs (el alta) tenían cada uno su lista. La del alta no tenía faltantes-liga.mjs ni
// estimar.mjs: un club nuevo deja desfasados data/faltantes/ y data/estimados/, audit.js da dos P1 (faltantes-desfasado,
// estimados-desfasado) y el alta se revierte entera. Caso: FC Volendam (lote 93), "Alta REVERTIDA ... P1 2"; frenaba toda alta nueva.
//
// queFalla(salida de audit.js): las claves de los chequeos P0 y P1 que fallaron ("faltantes-desfasado"), para decir en el aviso CUÁL.
// ============================================================================

export const GENERADORES = ['tools/generate-club-index.js', 'tools/generate-fuentes-page.js', 'tools/generate-rankings.js', 'tools/generate-como-corre-stats.js', 'tools/faltantes-liga.mjs', 'tools/estimar.mjs', 'tools/generate-sponsors.js'];

export function queFalla(salida) {
  const claves = []; let enP01 = false;
  for (const l of String(salida || '').split('\n')) {
    if (/^P[01] —/.test(l)) { enP01 = true; continue; }
    if (/^P[23] —/.test(l)) { enP01 = false; continue; }
    const m = enP01 && l.match(/^\s*\[([a-z0-9-]+)\]/);
    if (m) claves.push(m[1]);
  }
  return claves;
}
