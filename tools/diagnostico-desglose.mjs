#!/usr/bin/env node
// ============================================================================
// tools/diagnostico-desglose.mjs — TROUBLESHOOTING de un desglose que sigue sin sumar DESPUÉS del reintento. Gratis, sin IA.
//
// POR QUÉ (Versión 346, pedido de Guido el 2026-10-01: "si al momento de cargar da error, arreglar el índice ampliado sea parte del
// troubleshooting", en vez de cambiar a ciegas lo que se transcribe). Caso real: UC 2013, el cuadro por segmento sumaba 319.134 contra 2.354.149
// en "Ingresos Comerciales". Las filas ESTABAN en la transcripción: las etiquetas partidas en dos renglones cortaban el bloque. Hubo que mirarlo
// a mano para saber si era un problema del índice (etapa 3) o de la transcripción (etapa 2). Esta tool hace esa primera mirada.
//
// QUÉ HACE: para cada renglón que la verificación marcó como "no suma" (verificacion.reintentar), toma los bloques de donde salieron sus filas
// y mira 40 líneas alrededor en el .md. Lista las líneas CON CIFRAS que quedaron FUERA de los bloques elegidos, y para cada una dice por qué el
// índice la dejó afuera (renglón solo de números debajo de una etiqueta, renglón que termina en "-", renglón separado por más de 3 líneas...).
//   - Si hay líneas con cifras fuera del bloque: probablemente es el ÍNDICE (etapa 3). Se mejora el índice ampliado en tools/indice-bloques.mjs,
//     se MIDE en todas las transcripciones (ningún documento puede perder filas), se sube VERSION_AMPLIADO y se reintenta.
//   - Si no hay: probablemente es la TRANSCRIPCIÓN (etapa 2): el escalón 1 de la etapa 2 (re-transcribir con Mistral) o mirar el PDF.
//
// USO: node tools/diagnostico-desglose.mjs "<pdf>"
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const pdf = process.argv[2];
if (!pdf) { console.error('Uso: node tools/diagnostico-desglose.mjs "<pdf>"'); process.exit(1); }
const md = pdf.replace(/\.pdf$/i, '.md');
const leer = (suf) => { const p = resolve(ROOT, derivado(md, suf, { crear: false })); return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null; };
const V = leer('.verificacion.json'); const F = leer('.filas.json'); const U = leer('.ubicacion.json');
if (!V || !F || !U) { console.error('Faltan .verificacion.json, .filas.json o .ubicacion.json de este documento.'); process.exit(1); }
const L = readFileSync(resolve(ROOT, md), 'utf8').split('\n');
const IMP = /\(?-?\d{1,3}(?:[.,]\d{3})+\)?/g;
const enBloque = new Set(); for (const b of Object.values(U.bloques || {})) if ([...(U.estado || []), ...(U.notas_ingresos || []), ...(U.notas_gastos || [])].some((id) => U.bloques[id] === b)) for (let k = b.lineas[0]; k <= b.lineas[1]; k++) enBloque.add(k);
const faltas = V.faltasDesglose || V.reintentar || [];
if (!faltas.length) { console.log('La verificación no marca desgloses que no sumen.'); process.exit(0); }
for (const f of faltas) {
  console.log(`\n"${f.renglon || f.categoria}": ${f.categoria ? 'categoría en 0' : `las filas suman ${f.suma}, el renglón es ${f.objetivo} (faltan ${Math.round((f.objetivo - f.suma) * 1000) / 1000})`}`);
  const lineas = F.filas.filter((x) => x.detalla_a && x.detalla_a.trim() === String(f.renglon || '').trim()).map((x) => x.linea);
  if (!lineas.length) { console.log('  Ninguna fila extraída desglosa ese renglón: localizar no eligió el cuadro (ver la etapa 3).'); continue; }
  const desde = Math.max(1, Math.min(...lineas) - 40); const hasta = Math.min(L.length, Math.max(...lineas) + 40);
  const fuera = [];
  for (let k = desde; k <= hasta; k++) {
    const t = L[k - 1] || ''; if (enBloque.has(k) || !(t.match(IMP) || []).length || /^---\s*pág/.test(t)) continue;
    const ant = (L[k - 2] || '').trim();
    const motivo = !/\p{L}/u.test(t) && /\p{L}{2,}/u.test(ant) && !/\d/.test(ant) ? 'renglón solo de números debajo de una etiqueta (etiqueta partida en dos)' : /[-–—]\s*$/.test(t.trim()) ? 'termina en "-"' : 'fuera del bloque (hueco de más de 3 líneas u otro corte)';
    fuera.push(`  L${k}: ${t.trim().slice(0, 110)}   <- ${motivo}`);
  }
  if (fuera.length) { console.log(`  ${fuera.length} línea(s) con cifras FUERA de los bloques elegidos, cerca del desglose -> probablemente es el ÍNDICE (etapa 3):`); console.log(fuera.slice(0, 15).join('\n')); console.log('  Qué hacer: mejorar el índice ampliado (tools/indice-bloques.mjs), medir en todas las transcripciones, subir VERSION_AMPLIADO y reintentar.'); }
  else console.log('  No hay cifras fuera de los bloques cerca del desglose -> probablemente es la TRANSCRIPCIÓN (etapa 2) o el PDF: mirar la página.');
}
