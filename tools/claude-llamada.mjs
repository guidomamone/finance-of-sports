// ============================================================================
// tools/claude-llamada.mjs — UNA llamada a Claude por API con salida en JSON con esquema, para las tools del proceso "localizar, validar,
// extraer, verificar" (Versión 324: localizar.mjs, extraer.mjs). No es un comando: se importa.
//
// POR QUÉ UN MÓDULO APARTE: categorizar-claude.mjs y localizar-extraer.mjs (el test) tenían cada una su copia del pedido HTTP. Las tools nuevas
// usan esta, con las lecciones ya aprendidas:
//   - TOPE DE TIEMPO por llamada (5 minutos por defecto). Sin tope, una conexión colgada frena la corrida para siempre (el 2026-09-30 la Mac se
//     durmió a mitad de una corrida y quedaron huecos de 46 y 125 minutos).
//   - REINTENTOS solo para lo transitorio (red, 429, 5xx), con espera creciente; un 4xx de pedido mal armado no se reintenta.
//   - `fallbacks: "default"`: si un clasificador de seguridad rechaza el pedido (stop_reason "refusal"), la API lo reintenta con otro modelo.
//   - REGISTRO de cada llamada en Admin/registros/api/claude-api.jsonl con su tarea y su costo, para que tools/gasto.mjs la cuente.
//   - `stream: true` (to-do 197): la respuesta llega por streaming (SSE). Hace falta para topes de salida grandes (más de ~16.000 tokens): sin
//     streaming, una respuesta larga puede pasar el tiempo máximo de la conexión. La usa el escalón 1 de extraer.mjs (128.000 tokens).
// Modelo: Claude Opus 5.5 (el del proyecto), esfuerzo bajo por defecto. Sin SDK: el proyecto no tiene package.json (mismo criterio que
// categorizar-claude.mjs, que tiene la clave en Admin/api-keys/claude-api.env y la tabla de precios).
//
// USO:
//   import { llamarClaude } from './claude-llamada.mjs';
//   const r = await llamarClaude({ system, user, schema, tarea: 'localizar', pdf });   // r = { datos, costo } o { error, costo }
// ============================================================================

import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { readKey, costOf } = await import('./categorizar-claude.mjs');
process.argv = argvAntes;

export const MODELO = 'claude-opus-5-5';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let clave = null;

// Lee una respuesta en streaming (SSE) y la arma con la misma forma que la respuesta sin streaming: { model, usage, stop_reason, content }.
async function leerStream(res) {
  const j = { model: null, usage: {}, stop_reason: null, stop_details: null, content: [{ type: 'text', text: '' }] };
  const dec = new TextDecoder(); let buf = '';
  for await (const trozo of res.body) {
    buf += dec.decode(trozo, { stream: true });
    let i; while ((i = buf.indexOf('\n\n')) >= 0) {
      const evento = buf.slice(0, i); buf = buf.slice(i + 2);
      const datos = evento.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim()).join('');
      if (!datos) continue; let e; try { e = JSON.parse(datos); } catch { continue; }
      if (e.type === 'message_start') { j.model = e.message?.model; Object.assign(j.usage, e.message?.usage || {}); }
      else if (e.type === 'content_block_delta' && e.delta?.type === 'text_delta') j.content[0].text += e.delta.text;
      else if (e.type === 'message_delta') { j.stop_reason = e.delta?.stop_reason ?? j.stop_reason; j.stop_details = e.delta?.stop_details ?? j.stop_details; Object.assign(j.usage, e.usage || {}); }
      else if (e.type === 'error') throw new Error(`error en el stream: ${JSON.stringify(e.error)}`);
    }
  }
  return j;
}

export async function llamarClaude({ system, user, schema, tarea, pdf = null, esfuerzo = 'low', maxTokens = 16000, timeoutMs = 300000, stream = false }) {
  clave ||= readKey();
  const body = { model: MODELO, ...(stream ? { stream: true } : {}), max_tokens: maxTokens, system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }], output_config: { effort: esfuerzo, format: { type: 'json_schema', schema } }, fallbacks: 'default' };
  const headers = { 'Content-Type': 'application/json', 'x-api-key': clave, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'server-side-fallback-2026-07-01' };
  let ultimo = null; const t0 = Date.now();
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs) }); }
    catch (e) { ultimo = String(e); await sleep(3000 * (intento + 1)); continue; }
    if (res.ok) {
      let j; try { j = stream ? await leerStream(res) : await res.json(); } catch (e) { ultimo = String(e); await sleep(3000 * (intento + 1)); continue; }
      const costo = costOf(MODELO, j.usage);
      appendFileSync(resolve(ROOT, 'Admin', 'registros', 'api', 'claude-api.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tarea, pdf, model: j.model, promptTokenCount: j.usage?.input_tokens, cacheReadTokens: j.usage?.cache_read_input_tokens, candidatesTokenCount: j.usage?.output_tokens, costUsd: Number(costo.toFixed(6)), elapsedMs: Date.now() - t0, stopReason: j.stop_reason }) + '\n');
      if (j.stop_reason === 'refusal') return { error: `refusal: ${JSON.stringify(j.stop_details)}`, costo };
      if (j.stop_reason === 'max_tokens') return { error: 'respuesta cortada por el tope de salida (max_tokens)', costo };
      const texto = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
      try { return { datos: JSON.parse(texto), costo }; } catch { return { error: `JSON inválido (stop=${j.stop_reason})`, costo }; }
    }
    ultimo = `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`;
    if (res.status === 429 || res.status >= 500) { await sleep(5000 * (intento + 1)); continue; }
    return { error: ultimo, costo: 0 };
  }
  return { error: ultimo || 'reintentos agotados', costo: 0 };
}

// Estimación grosera de tokens de un texto (para los ensayos): ~3,5 caracteres por token en los idiomas del corpus.
export const tokensDe = (texto) => Math.ceil(String(texto).length / 3.5);
// Precio de Opus 5.5 por millón de tokens (el mismo de categorizar-claude.mjs PRICES): entrada 4, salida 20.
export const usdEstimado = (tokEntrada, tokSalida) => (tokEntrada * 4 + tokSalida * 20) / 1e6;
