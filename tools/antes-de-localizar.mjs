// ============================================================================
// tools/antes-de-localizar.mjs — ETAPA 3, COMPUERTA ANTES DE PAGAR: ¿está fijado todo lo que cambia lo que localizar elige?
//
// POR QUÉ (Versión 441, punto 1b.i del HANDOFF, aprobado por Guido el 2026-10-04: "una dinámica que no haga pasar lo mismo por las APIs
// varias veces"). Con Juventus, el lote 13 localizó 2020-21 a 2024-25 antes de que el perímetro llegara a localizar (cambio H): localizar
// eligió el consolidado (su default), no cerró ninguna lectura, y hubo que pagar localizar y extraer otra vez con el individual (~US$ 2,8).
// Lo que cambia la elección de localizar es el PERÍMETRO (consolidado o individual) y el CIERRE (qué columna es el ejercicio). Si alguno de
// los dos no está fijado y el documento lo necesita, ESE documento no se localiza: el lote imprime el ajuste que falta (una línea de
// tools/ajustes.mjs, gratis) y el resto sigue. Se fija una vez y se paga una vez.
//
// LA ESCALERA (gratis; solo para documentos SIN .ubicacion.json: si ya se localizó, no hay nada que pagar y la compuerta no se mete):
//
//  CIERRE     ajuste `cierre` ─► el período del registro (periodo.mjs) ── hay → sigue · no hay → FRENA (sugiere el de los vecinos si lo hay)
//             (es lo mismo que recibe localizar: sin esto le llega "Ejercicio pedido: el que cierra el ?")
//  PERÍMETRO  ajuste del documento o del club ─► el .md trae uno solo (el detector de alta-club.mjs, el mismo que usa cargar.mjs)
//             ─► el .md trae el consolidado y el año cargado más cercano es consolidado (lo que cargar.mjs hereda; localizar elige el
//                consolidado por defecto) ── pasa → sigue · no → FRENA con el comando de ajustes.mjs
//
// Si el análisis del documento falla (alta-club no puede leerlo), no frena: la compuerta es un ahorro, no un chequeo de datos.
//
// USO (dentro de lote.mjs; también suelto, para ver qué frenaría):
//   node tools/antes-de-localizar.mjs --lista Admin/lote-NN.txt [--todos]   (--todos: aunque ya tengan .ubicacion.json)
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { analizar } = await import('./alta-club.mjs');
const { perimetroHeredado, perimetroCercano, cargarSitio } = await import('./cargar.mjs');
const { ajusteDe, ajustePerimetroDe } = await import('./ajustes.mjs');
const { cierrePorVecinos } = await import('./cierre-vecinos.mjs');
process.argv = argvAntes;

const ROOT = resolve(import.meta.dirname, '..');
// El sitio con tipos de cambio y datos de clubes (el mismo que usa cargar.mjs; analizar() necesita FX_CLOSE): se carga una vez.
let _sitio = null; const sitioCargar = () => (_sitio ??= cargarSitio());
const carpetaClub = (pdf) => pdf.split('/').slice(0, 3).join('/') + '/';

// Devuelve null si el documento puede localizarse, { falta: 'cierre' | 'perimetro', detalle, comando } si frena, o { aviso } si no se pudo
// analizar (no frena).
export function faltaAntesDeLocalizar(pdf, { registro, todos = false }) {
  const sitio = sitioCargar();
  const e = registro.find((x) => x.pdf === pdf) || {};
  if (!todos && e.md && existsSync(resolve(ROOT, derivado(e.md, '.ubicacion.json', { crear: false })))) return null;
  // CIERRE
  const cierre = ajusteDe(pdf, 'cierre')?.valor || e.periodo?.cierre || null;
  if (!cierre) {
    const cv = cierrePorVecinos(pdf, registro);
    return { falta: 'cierre', detalle: `sin fecha de cierre (ni ajuste ni periodo.mjs)${cv ? `; los vecinos dicen ${cv.cierre} (${cv.evidencia})` : ''}`,
      comando: `node tools/ajustes.mjs --agregar "${pdf}" cierre --valor ${cv?.cierre || 'AAAA-MM-DD'} --motivo "..."` };
  }
  // PERÍMETRO
  if (ajustePerimetroDe(pdf)) return null;
  let alta; try { alta = analizar(pdf, sitio); } catch (err) { return { aviso: `no se pudo analizar el documento (${err.message}); no frena` }; }
  if (alta?.error) return { aviso: `alta-club: ${alta.error}; no frena` };
  const perC = alta.ejercicio.campos.find((c) => c.campo === 'perimetro') || {};
  if (perC.estado !== 'pregunta') return null;
  const docTipo = perC.dosEntidades ? 'dos-entidades' : /solo del GRUPO/.test(perC.pregunta || '') ? 'consolidado' : /CONSOLIDADOS y también individuales/.test(perC.pregunta || '') ? 'ambos' : '?';
  const clubId = alta.club?.clubId;
  const cerc = clubId && sitio.generic[clubId] ? perimetroCercano(perimetroHeredado(sitio, clubId), alta.ejercicio.anio) : null;
  if (cerc?.perimetro === 'consolidado' && (docTipo === 'consolidado' || docTipo === 'ambos')) return null;
  return { falta: 'perimetro', detalle: `${perC.fuente}${cerc ? `; año cargado más cercano: ${cerc.anio} ${cerc.perimetro || '?'}` : '; el club no tiene años cargados'}`,
    // Dos entidades en la carpeta (Molde: "fotballklubb-fli" y "molde-fotball-as" del mismo año): el perímetro solo no alcanza, primero hay
    // que elegir cuál es el club; los documentos de la otra van a Admin/documentos-descartados.txt (el lote los saltea).
    comando: `${docTipo === 'dos-entidades' ? 'elegir la entidad que es el club (los documentos de la otra van a Admin/documentos-descartados.txt) y después: ' : ''}node tools/ajustes.mjs --agregar "${carpetaClub(pdf)}" perimetro --valor individual|consolidado --motivo "..."   (del club; o el pdf, solo ese año)` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const i = A.indexOf('--lista');
  if (i < 0) { console.error('Uso: node tools/antes-de-localizar.mjs --lista <archivo> [--todos]'); process.exit(1); }
  const docs = readFileSync(resolve(ROOT, A[i + 1]), 'utf8').split('\n').map((l) => l.trim().replace(/^testigo\s+/i, '')).filter((l) => l && !l.startsWith('#'));
  const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  let n = 0;
  for (const pdf of docs) { const f = faltaAntesDeLocalizar(pdf, { registro, todos: A.includes('--todos') }); if (!f) continue; if (f.aviso) { console.log(`  aviso: ${pdf}: ${f.aviso}`); continue; } n++; console.log(`  FALTA ${f.falta}: ${pdf}\n     ${f.detalle}\n     ${f.comando}`); }
  console.log(`${n} de ${docs.length} documento(s) frenarían antes de localizar.`);
}
