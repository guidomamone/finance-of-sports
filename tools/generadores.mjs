// ============================================================================
// tools/generadores.mjs — LOS GENERADORES QUE SE CORREN ANTES DE LA AUDITORÍA al escribir en el sitio, en UN solo lugar.
//
// POR QUÉ. cargar.mjs (publicarCambios) y alta-club.mjs (el alta) tenían cada uno su lista. La del alta no tenía faltantes-liga.mjs ni
// estimar.mjs: un club nuevo deja desfasados data/faltantes/ y data/estimados/, audit.js da dos P1 (faltantes-desfasado,
// estimados-desfasado) y el alta se revierte entera. Caso: FC Volendam (lote 93), "Alta REVERTIDA ... P1 2"; frenaba toda alta nueva.
//
// tools/entidades.mjs va DESPUÉS de generate-rankings.js: los totales de ingresos de cada grupo multiclub
// salen de data/rankings/, así que al escribir un año de un club de un grupo (Lommel SK, de City Football Group) data/entidades/ queda viejo, la
// auditoría da `entidades-desfasado` (P1) y el año se revertía. Medido: cambiar el ingreso de Lommel 2025 en el ranking dejaba
// "data/entidades/ desactualizado: _grupos-detalle.js".
// (sesión única) Se sumaron generate-fuentes-index.js, auditoria.mjs (los dos los verifica audit.js como P1 pero no los corría nadie: una carga que los dejaba viejos se revertía entera)
// e indice-md.mjs (el índice de los .md, escribe por defecto). audit.js avisa `generador-sin-correr` si un generador que verifica no está en esta lista.
// tools/lotes-prueba.mjs: los lotes de prueba (Admin/lotes/prueba-*.txt) se regeneran solos al cerrar cada carga, estratificados por familia; antes se corría a mano y se olvidaba.
//            audit.js avisa `lote-prueba-desfasado` (P2) si una familia cargada no tiene documentos en la mediana.
// queFalla(salida de audit.js): las claves de los chequeos P0 y P1 que fallaron ("faltantes-desfasado"), para decir en el aviso CUÁL.
// ============================================================================

export const GENERADORES = ['tools/generate-club-index.js', 'tools/generate-fuentes-page.js', 'tools/generate-rankings.js', 'tools/generate-club-pages.js', 'tools/entidades.mjs', 'tools/generate-como-corre-stats.js', 'tools/faltantes-liga.mjs', 'tools/estimar.mjs', 'tools/generate-sponsors.js', 'tools/generate-glosas.mjs','tools/generar-correcciones.mjs', 'tools/generate-fuentes-index.js', 'tools/auditoria.mjs', 'tools/indice-md.mjs', 'tools/relevancia-filas.mjs', 'tools/lotes-prueba.mjs', 'tools/generar-manifiesto.mjs'];

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
