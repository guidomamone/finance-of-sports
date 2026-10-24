#!/usr/bin/env node
// ============================================================================
// tools/lote.mjs — EL PROCESO NUEVO de punta a punta sobre un LOTE CHICO (5 PDFs), para ir refinando y viendo dónde hace falta la cola humana.
//
// POR QUÉ (pedido de Guido: "la idea es hacer 5 PDFs juntos e ir refinando y viendo dónde se necesita cola humana;
// vos me podés decir 'revisar tal cosa en el PDF y tal otra en el md' y yo abro el PDF por mi cuenta o la transcripción; arrancar por los
// clubes para los cuales ya tenemos transcripción pero no están cargados"). El proceso entero, con riesgos y mitigaciones etapa por etapa,
// está en Admin/PIPELINE.md.
//
// LAS ETAPAS QUE CORRE (las 1 conseguir y 2 transcribir ya están hechas para los documentos del lote: se eligen PDFs con .md):
//   3  localizar.mjs        qué bloques son el estado de resultados y sus notas                      IA, ~US$ 0,05
//   4  validar-bloques.mjs  cada número de esos bloques contra el PDF (texto propio o Gemini)         gratis / ~US$ 0,003 por página escaneada
//   5  extraer.mjs          las filas tal cual, con escala por bloque y la columna del año anterior   IA, ~US$ 0,20 (mediana de lo gastado; hasta ~0,35 en documentos largos)
//   6  verificar.mjs        chequeos gratis; lo que no cierra va a la cola; deja el .rubros.json     gratis
//      + primer-anio-ia.mjs el primer año de un club cuando solo coincide el resultado: Claude revisa las filas  ~US$ 0,02
//   7  categorización de siempre: glosar-rubros.mjs, jev-categorizar.mjs, categorizar-claude.mjs (con precedente, familia y memoria)  ~US$ 0,03
//   8  cargar.mjs --desde-verificacion   PROPUESTA (no escribe el sitio): qué cargaría y por qué frena                gratis
// Un documento que va a la cola en la 6 sigue igual hasta la 8 (para ver todo lo que le falta de una vez), pero la 8 lo frena.
//
// POR DEFECTO ES UN ENSAYO: no llama a ninguna API, dice qué haría y cuánto costaría. --ejecutar lo corre. Cada etapa guarda su resultado en
// Generados/ y no se repite (--rehacer para forzar las de IA): cortar con Control+C y volver a correr sigue donde quedó.
//
// AL TERMINAR: un resumen por documento (en qué etapa quedó y por qué) y la cola humana con qué mirar en el PDF y en el .md
// (node tools/cola.mjs). Las respuestas de Guido se toman en la próxima corrida del mismo lote.
//
// USO:
//   node tools/lote.mjs --lista Admin/lotes/lote-NN.txt                 ensayo con costo
//   caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar
//   En la lista, "testigo <pdf>" = documento que solo sirve para verificar a otro (ver TESTIGOS abajo).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync, statSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { localizar } from './localizar.mjs';
import { validar } from './validar-bloques.mjs';
import { extraer, estimarExtraerSinBloques } from './extraer.mjs';
import { pendientes, respuestaPosterior } from './cola.mjs';
import { derivado } from './rutas.mjs';
import { etapaDe } from './etapa-doc.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { resolverDeporte, olvidarDeportes } from './deporte-club.mjs'; // el deporte de cada documento antes de Jev y Claude
import { paginasARearmar, rearmar } from './texto-propio-a-md.mjs';
import { tomarCandado, soltarCandado } from './candado.mjs';
import { faseEnsayo, faseSumar, faseCategorizar, faseResumen, faseResultado, faseTabla } from './lote-final.mjs';
import { faseLeer } from './lote-leer.mjs';
import { fasePreparar } from './lote-preparar.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
export const { verificarLista } = await import('./verificar.mjs');
export const { ajusteDe, ajustePerimetroDe } = await import('./ajustes.mjs');
export const { loadSite } = await import('./datos-sitio.mjs');
export const { faltaAntesDeLocalizar } = await import('./antes-de-localizar.mjs');
export const { cacheAlDia, validacionAlDia, ubicacionAlDia } = await import('./cache-al-dia.mjs');
export const { gastoPorDocumento, lineasGasto } = await import('./gasto-doc.mjs');
export const { categoriasAlDia, jevAlDia } = await import('./huellas.mjs');
process.argv = argvAntes;

// El flujo entero, en una función: se parte en fases con un ctx (tools/partir-fases.mjs).
async function correrLote() {
  const ctx = {  };
  Object.assign(ctx, await fasePreparar(ctx));
  Object.assign(ctx, await faseLeer(ctx));
  await faseEnsayo(ctx);
  await faseSumar(ctx);
  await faseCategorizar(ctx);
  Object.assign(ctx, await faseResumen(ctx));
  Object.assign(ctx, await faseResultado(ctx));
  await faseTabla(ctx);
}

await correrLote();
