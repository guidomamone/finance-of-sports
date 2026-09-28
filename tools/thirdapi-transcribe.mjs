#!/usr/bin/env node
// ============================================================================
// tools/thirdapi-transcribe.mjs — PLACEHOLDER, todavía sin API real conectada.
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-29): Gemini rechaza ~1 de cada 4
// documentos con `finishReason: RECITATION` -- un falso positivo de copyright
// de Google, no un problema del documento (ver Admin/test-costo-transcripcion.md).
// Hasta ahora esos documentos quedaban en la cola de "pendientes de Claude"
// (`gemini-transcribe.mjs --pendientes-claude`). Con el flujo de comparación
// Mistral-vs-Gemini (Admin/CHANGELOG.md Versión 302), un rechazo de Gemini
// significa además que ESE documento se queda sin su 2do chequeo -- por eso
// hace falta una 3ra API que entre SOLO ahí, como reemplazo de Gemini para el
// subconjunto que Gemini no puede tocar. `tools/onboard.mjs` ya llama a esto
// automáticamente cuando detecta RECITATION (ver `runGeminiWithFallback()`
// ahí) -- lo único que falta es elegir la API y completar `callThirdApi()`
// acá abajo.
//
// CANDIDATAS PROPUESTAS (Guido decide cuál probar primero, ver el mensaje
// donde se armó esto para el detalle de cada una):
//   1. Claude (API de Anthropic, Mensajes con PDF/imagen) -- mismo modelo que
//      ya es la 3ra red de este pipeline como subagente, pero por API directa
//      en vez de una sesión agéntica completa: mucho más barato que los
//      70k-290k tokens de hoy, y sin filtro de "RECITATION" conocido para
//      documentos financieros/corporativos.
//   2. OpenAI GPT-4.1/GPT-5 con input de PDF -- proveedor distinto de Google
//      Y de Anthropic, para no repetir el mismo tipo de bloqueo si resultara
//      ser una política compartida de una familia de modelos.
//
// CUANDO SE ELIJA UNA, este archivo se puede directamente RENOMBRAR (ej. a
// `claude-api-transcribe.mjs`) y `Admin/thirdapi/.env` también, para que el
// nombre diga qué es -- `tools/onboard.mjs` solo necesita que el path de acá
// abajo (`THIRDAPI_SCRIPT` en tools/onboard.mjs) apunte al archivo correcto.
//
// INTERFAZ (mismo contrato que mistral-ocr-transcribe.mjs/gemini-transcribe.mjs,
// a propósito, para que tools/onboard.mjs no tenga que tratarla distinto):
//   node tools/thirdapi-transcribe.mjs "<archivo.pdf>" [--out-suffix -gemini-check]
//   node tools/thirdapi-transcribe.mjs --all [--dir Clubes/Colombia] [--limit N] [--concurrency N]
//
// HOY: sale con error claro en vez de hacer nada silencioso. Cuando se elija
// la API, completar `callThirdApi()` seguro el mismo patrón que
// `transcribeOne()` en gemini-transcribe.mjs (leer la key de Admin/thirdapi/.env,
// mandar el PDF en base64, escribir el .md con el out-suffix, loguear a
// Admin/thirdapi/resultados.jsonl y fallidos.jsonl con el mismo shape).
// ============================================================================

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, 'Admin', 'thirdapi', '.env');

// TODO: reemplazar por la llamada real una vez elegida la API (ver cabecera).
// Tiene que devolver { ok: true, record: {...} } o { ok: false, error: '...' },
// mismo shape que transcribeOne() en gemini-transcribe.mjs, para que
// tools/onboard.mjs no necesite ningún cambio cuando esto deje de ser un stub.
async function callThirdApi(pdfPath, outSuffix) {
  throw new Error(
    'tools/thirdapi-transcribe.mjs: todavía no se eligió/conectó la 3ra API (ver la cabecera del ' +
    'archivo para las 2 candidatas propuestas). Mientras tanto, este documento queda pendiente de ' +
    'un subagente de Claude, igual que antes de este flujo -- correr `node tools/gemini-transcribe.mjs ' +
    '--pendientes-claude` para verlo en esa lista.'
  );
}

async function main() {
  const args = process.argv.slice(2);
  if (!existsSync(envPath)) {
    console.error(`No existe ${envPath.replace(projectRoot + '/', '')} -- esta tool es un placeholder, todavía no tiene API key porque no se eligió ninguna API real. Ver la cabecera del archivo.`);
    process.exit(1);
  }
  if (args.includes('--all')) {
    console.error('tools/thirdapi-transcribe.mjs --all: no implementado todavía (placeholder). Ver la cabecera del archivo.');
    process.exit(1);
  }
  const pdfArg = args.find((a, idx) => !a.startsWith('--') && args[idx - 1] !== '--out-suffix');
  if (!pdfArg) {
    console.error('Uso: node tools/thirdapi-transcribe.mjs "<archivo.pdf>" [--out-suffix -gemini-check]');
    process.exit(1);
  }
  const pdfPath = resolve(projectRoot, pdfArg);
  if (!existsSync(pdfPath)) {
    console.error(`No existe: ${pdfPath}`);
    process.exit(1);
  }
  const suffixFlag = args.indexOf('--out-suffix');
  const outSuffix = suffixFlag >= 0 ? args[suffixFlag + 1] : '';
  try {
    const res = await callThirdApi(pdfPath, outSuffix);
    console.log(`OK ${res.record.pdf} -> ${res.record.md}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();
