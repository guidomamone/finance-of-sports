#!/usr/bin/env node
// ============================================================================
// tools/lote.mjs — el proceso de punta a punta sobre un LOTE de PDFs con .md (las etapas 1 y 2 ya están hechas), para ver dónde hace falta la cola humana. Riesgos y mitigaciones por etapa: Admin/PIPELINE.md.
// ETAPAS: 3 localizar.mjs (IA) · 4 validar-bloques.mjs (gratis; Gemini en un escaneo) · 5 extraer.mjs (IA) · 6 verificar.mjs (gratis; lo que no cierra va a la cola; + primer-anio-ia.mjs) ·
//   7 categorización (glosar-rubros, jev-categorizar, categorizar-claude: con precedente, familia y memoria) · 8 cargar.mjs --desde-verificacion (PROPUESTA: no escribe el sitio).
// Un documento que va a la cola en la 6 sigue igual hasta la 8 (para ver todo lo que le falta de una vez), pero la 8 lo frena.
// POR DEFECTO ES UN ENSAYO: no llama a ninguna API, dice qué haría y cuánto costaría. --ejecutar lo corre. Cada etapa guarda su resultado en Generados/ y no se repite (--rehacer fuerza las de IA):
//   cortar con Control+C y volver a correr sigue donde quedó. Al terminar: un resumen por documento y la cola humana (node tools/cola.mjs); las respuestas de Guido se toman en la próxima corrida.
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
import { negarSiSeMide } from './candado-medicion.mjs';
import { faseEnsayo, faseSumar, faseCategorizar, faseResumen, faseResultado, faseTabla } from './lote-final.mjs';
import { faseLeer } from './lote-leer.mjs';
import { fasePreparar } from './lote-preparar.mjs';
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
negarSiSeMide('lote.mjs', { si: argvAntes[1]?.endsWith('lote.mjs') && argvAntes.includes('--ejecutar'), argv: argvAntes }); // corre las etapas y reescribe el registro: no mientras medir pipeline mide
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
