// ============================================================================
// tools/etapa-doc.mjs — EN QUÉ ETAPA Y ESCALÓN DEL PROCESO NUEVO está cada documento del registro. Gratis: solo lee el registro
// (Admin/transcripciones-estado.jsonl) y lo que las etapas 3-8 dejaron en Generados/.
//
// POR QUÉ (Versiones 447-448, pedido de Guido el 2026-10-04: "que marquen en qué etapa o escalón está"). La usan los DOS que muestran estados,
// para que nunca digan cosas distintas: tools/inventario-transcripciones.mjs (el resumen "Por estado") y tools/estado.mjs (el tablero).
// Las etapas son las de Admin/HANDOFF-pipeline.md, "El proceso nuevo": 1 conseguir, 2 transcribir, 3 localizar, 4 validar, 5 extraer,
// 6 verificar, 7 categorizar, 8 cargar, 9 en el sitio. "listo" en el registro solo dice que la transcripción terminó (etapa 2); hasta dónde
// llegó el documento se ve en Generados/.
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// clave -> [etapa, texto]. La clave es estable (la usa el tablero para sus filas); el texto es lo que se lee.
export const ETAPAS_DOC = {
  'e1-roto': [1, 'Etapa 1 · conseguir: llegó roto (volver a bajarlo)'],
  'e2-sin-md': [2, 'Etapa 2 · transcribir, escalón 0 (Mistral)'],
  'e2-sin-tablas': [2, 'Etapa 2 · transcribir, escalón 0: transcripción vieja sin tablas (rehacer con Mistral)'],
  'e2-sin-verificar': [2, 'Etapa 2 · validación gratis pendiente (el .md cambió o nunca se validó)'],
  'e2-revisar': [2, 'Etapa 2 · escalón 1a: cifras distintas del texto del PDF (resolver: Claude en las páginas dudosas)'],
  'e2-segunda-voz': [2, 'Etapa 2 · escalón 1a: escaneo, falta la segunda voz (Gemini en las páginas con cifras)'],
  'e2-reintentar': [2, 'Etapa 2 · escalón 1a cortado por crédito, red o límite (se retoma solo)'],
  'e3-localizar': [3, 'Etapa 3 · localizar (pendiente)'],
  'e3-fuente': [3, 'Etapa 3 · sin estado de resultados: queda como fuente (memoria, dictamen, balance solo)'],
  'e5-extraer': [5, 'Etapa 5 · extraer (pendiente)'],
  'e6-verificar': [6, 'Etapa 6 · verificar (pendiente)'],
  'e6-no-cerro': [6, 'Etapa 6 · verificar: no cerró (cola humana o reintento)'],
  'e7-categorizar': [7, 'Etapa 7 · categorizar (pendiente)'],
  'e8-frenado': [8, 'Etapa 8 · cargar: propuesta frenada'],
  'e8-lista': [8, 'Etapa 8 · cargar: propuesta lista (falta escribir)'],
  'e9-cargado': [9, 'Etapa 9 · en el sitio'],
  descartado: [0, 'descartado como fuente (Admin/documentos-descartados.txt)'],
};
const DE_ESTADO = { 'no-es-pdf': 'e1-roto', 'sin-md': 'e2-sin-md', 'sin-tablas': 'e2-sin-tablas', 'sin-verificar': 'e2-sin-verificar', revisar: 'e2-revisar', 'pendiente-segunda-voz': 'e2-segunda-voz', reintentar: 'e2-reintentar', cargado: 'e9-cargado' };
export const claveDeEstado = (estado) => DE_ESTADO[estado] || null;

const leerGen = (e, suf) => { try { const q = resolve(ROOT, derivado(e.md, suf, { crear: false })); return existsSync(q) ? JSON.parse(readFileSync(q, 'utf8')) : null; } catch { return null; } };
// Descartados por Guido como fuente: lote.mjs los saltea; no son "pendientes".
export const DESCARTADOS = new Set((existsSync(resolve(ROOT, 'Admin', 'documentos-descartados.txt')) ? readFileSync(resolve(ROOT, 'Admin', 'documentos-descartados.txt'), 'utf8') : '').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter((l) => l && !l.startsWith('#')));

// { clave, etapa, texto, motivo? } de una entrada del registro.
export function etapaDe(e) {
  const r = (clave, motivo = null) => ({ clave, etapa: ETAPAS_DOC[clave][0], texto: ETAPAS_DOC[clave][1] + (motivo ? ` por "${motivo}"` : ''), motivo });
  if (e.cargado || e.estado === 'cargado') return r('e9-cargado');
  if (DESCARTADOS.has(e.pdf)) return r('descartado');
  if (e.estado !== 'listo') return DE_ESTADO[e.estado] ? r(DE_ESTADO[e.estado]) : { clave: `estado-${e.estado}`, etapa: 2, texto: `estado ${e.estado}` };
  const ub = leerGen(e, '.ubicacion.json');
  if (!ub) return r('e3-localizar');
  if (ub.sin_estado) return r('e3-fuente');
  if (!leerGen(e, '.filas.json')) return r('e5-extraer');
  const v = leerGen(e, '.verificacion.json');
  if (!v) return r('e6-verificar');
  if (v.estado !== 'ok') return r('e6-no-cerro');
  const c = leerGen(e, '.carga.json');
  if (!c) return r('e7-categorizar');
  if ((c.frena || []).length) return r('e8-frenado', c.frena[0].etapa);
  return r('e8-lista');
}

// .rubros.json del PROCESO VIEJO (pipeline.mjs): el del proceso nuevo lo escribe verificar.mjs con `origen`. Solo para la línea de referencia
// del tablero: el nombre del archivo es el mismo y la categorización lee los dos.
export const rubrosViejo = (e) => { const x = leerGen(e, '.rubros.json'); return !!(x && !x.origen); };
