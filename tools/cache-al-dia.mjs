// ============================================================================
// tools/cache-al-dia.mjs — ¿el caché de las etapas 3-5 (localizar, validar, extraer) sigue sirviendo para el .md de HOY?
//
// POR QUÉ (Versión 445, punto 1.iv del HANDOFF, aprobado por Guido el 2026-10-04). Hasta acá el caché se reusaba con solo existir el archivo
// (`.ubicacion.json`, `.validacion.json`, `.filas.json`). Si el .md cambia después (el resolver de transcripciones o el rearmado con el
// texto propio del PDF reescriben páginas), las filas citan líneas que ya no son. Medido: Juventus 2021-22, 148 de 149 filas fuera de su
// línea (corridas -5, -9 y -12; "Ticket sales" 32,293,161 citada en L4855, hoy en L4850).
//
// LA ESCALERA (gratis):
//   ESCALÓN 0  la huella (sha1) del .md es la misma con la que se hizo el caché (`mdSha1`, se guarda desde la Versión 445) ──► al día
//   ESCALÓN 1  cada fila del .filas.json sigue en su línea (la línea citada tiene el comienzo de la etiqueta o el importe, y el importe
//              está ahí o en las 3 siguientes: etiquetas partidas en dos renglones) ──► al día
//              (sirve también para los cachés anteriores a la Versión 445, que no tienen huella)
//   nada ──► VIEJO. Qué se hace con eso lo decide lote.mjs: año cargado, solo aviso; sin cargar, se rehace (el ensayo dice el costo).
// Sin .filas.json (todavía no se extrajo) no hay nada que mirar: al día (lo que había antes).
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');

export const shaMd = (mdRel) => { try { return createHash('sha1').update(readFileSync(resolve(ROOT, mdRel))).digest('hex'); } catch { return null; } };

// { alDia, escalon, detalle }
export function cacheAlDia(mdRel) {
  const pf = resolve(ROOT, derivado(mdRel, '.filas.json', { crear: false }));
  if (!existsSync(pf) || !existsSync(resolve(ROOT, mdRel))) return { alDia: true, escalon: null, detalle: 'sin .filas.json' };
  let X; try { X = JSON.parse(readFileSync(pf, 'utf8')); } catch { return { alDia: true, escalon: null, detalle: '.filas.json ilegible' }; }
  const sha = shaMd(mdRel);
  if (X.mdSha1 && X.mdSha1 === sha) return { alDia: true, escalon: 0, detalle: 'misma huella del .md' };
  const lineas = readFileSync(resolve(ROOT, mdRel), 'utf8').split('\n');
  const filas = (X.filas || []).filter((f) => f.actual !== null && f.actual !== undefined && String(f.actual).trim() !== '' && f.linea);
  // Una fila "sigue en su línea" si la línea citada tiene el comienzo de la etiqueta o el importe, y el importe está en esa línea o en
  // las 3 siguientes: una etiqueta partida en dos renglones se cita en el primero y el número cae en el siguiente (UC 2010 y 2011, cuadro
  // por segmento: "Ingresos por Borderó (Recaudación" / "Entradas) ... 833.101"; sin esto daban "viejos" con el .md sin cambios).
  const plano = (t) => String(t).toLowerCase().replace(/[*|_]/g, ' ').replace(/\s+/g, ' ').trim();
  const enSuLinea = (f) => {
    const l0 = plano(lineas[f.linea - 1] || ''); const imp = String(f.actual); const cabeza = plano(f.etiqueta).slice(0, 12);
    if (!(cabeza && l0.includes(cabeza)) && !l0.includes(imp)) return false;
    return lineas.slice(f.linea - 1, f.linea + 3).some((l) => l.includes(imp));
  };
  const fuera = filas.filter((f) => !enSuLinea(f));
  if (!fuera.length) return { alDia: true, escalon: 1, detalle: `las ${filas.length} filas siguen en su línea` };
  const ej = fuera[0];
  return { alDia: false, escalon: null, detalle: `el .md cambió desde extraer: ${fuera.length} de ${filas.length} filas fuera de su línea (ej. "${String(ej.etiqueta).slice(0, 40)}" ${ej.actual}, citada en L${ej.linea})` };
}
