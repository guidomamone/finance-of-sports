// ============================================================================
// tools/claude-llamada.mjs — UNA llamada a Claude por API con salida en JSON con esquema, para las tools del proceso "localizar, validar,
// extraer, verificar". No es un comando: se importa.
//
// POR QUÉ UN MÓDULO APARTE: categorizar-claude.mjs y localizar-extraer.mjs (el test) tenían cada una su copia del pedido HTTP. Las tools nuevas
// usan esta, con las lecciones ya aprendidas:
//   - TOPE DE TIEMPO por llamada (5 minutos por defecto). Sin tope, una conexión colgada frena la corrida para siempre (la Mac se
//     durmió a mitad de una corrida y quedaron huecos de 46 y 125 minutos).
//   - REINTENTOS solo para lo transitorio (red, 429, 5xx), con espera creciente; un 4xx de pedido mal armado no se reintenta.
//   - `fallbacks: "default"`: si un clasificador de seguridad rechaza el pedido (stop_reason "refusal"), la API lo reintenta con otro modelo.
//   - REGISTRO de cada llamada en Admin/registros/api/claude-api.jsonl con su tarea y su costo, para que tools/gasto.mjs la cuente.
//   - `stream: true`: la respuesta llega por streaming (SSE). Hace falta para topes de salida grandes (más de ~16.000 tokens): sin
//     streaming, una respuesta larga puede pasar el tiempo máximo de la conexión. La usa el escalón 1 de extraer.mjs (128.000 tokens).
// Modelo: Claude Opus 5.5 (el del proyecto), esfuerzo bajo por defecto. `modelo` cambia el de UNA llamada (el pedido, el costo y
// la estimación); sin `modelo`, Opus como siempre. Cada tarea pasa a Sonnet solo después de medirla. Sin SDK: el proyecto no tiene package.json (mismo criterio que
// categorizar-claude.mjs, que tiene la clave en Admin/api-keys/claude-api.env y la tabla de precios).
//
// USO:
//   import { llamarClaude } from './claude-llamada.mjs';
//   const r = await llamarClaude({ system, user, schema, tarea: 'localizar', pdf });   // r = { datos, costo } o { error, costo } o { pendiente }
//
// MODO BATCH (Batch API de Anthropic, mitad de precio; ok de Guido). Se prende con la variable FOS_CLAUDE_BATCH=1, que pone
// tools/lote-batch.mjs y heredan los subprocesos del lote. Mismo modelo y mismo pedido; cambia solo cómo se manda:
//   - si la respuesta de ESE pedido (huella sha1 del cuerpo = custom_id) ya volvió de la Batch API, está en Generados/_cache/claude-batch.jsonl
//     y se devuelve como si acabara de llegar (mismo registro en claude-api.jsonl, con el costo x0,5 y `batch: true`);
//   - si no, el pedido se anota en Generados/_cache/claude-batch-cola.jsonl y vuelve { pendiente: true }. NO es un error: la tool no escribe
//     su archivo ni manda nada a la cola humana; ese documento se corta en esa etapa hasta la ola siguiente.
//   - enviarColaBatch() (lo llama lote-batch.mjs entre pasadas) manda la cola en un envío, espera a que termine y guarda las respuestas.
//   Con stream: true (el escalón de tope largo de extraer) la llamada sigue directa: la Batch API no hace streaming.
// ============================================================================

import { appendFileSync } from 'node:fs';
import { SESION } from './sesion.mjs'; // gasto por sesión
import { resolve } from 'node:path';
import { enBatch, FACTOR_BATCH, idBatch, respuestaBatch, anotarEnCola } from './claude-batch.mjs';
export { enviarColaBatch, pendientesEnCola, enBatch } from './claude-batch.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const argvAntes = process.argv; process.argv = process.argv.slice(0, 2);
const { readKey, costOf, PRICES } = await import('./categorizar-claude.mjs');
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

// Lo que se hace con una respuesta de la API (directa o de la Batch API): registro, costo y { datos } / { error }.
// `registrar: false` en el modo batch: el costo ya lo anotó claude-batch.mjs al recoger el envío (una vez por pedido).
function procesar(j, { tarea, pdf, t0, factor = 1, registrar = true, modelo = MODELO }) {
  const costo = costOf(modelo, j.usage) * factor;
  if (registrar) appendFileSync(resolve(ROOT, 'Admin', 'registros', 'api', 'claude-api.jsonl'), JSON.stringify({ ts: new Date().toISOString(), sesion: SESION, tarea, pdf, model: j.model, promptTokenCount: j.usage?.input_tokens, cacheReadTokens: j.usage?.cache_read_input_tokens, candidatesTokenCount: j.usage?.output_tokens, costUsd: Number(costo.toFixed(6)), elapsedMs: Date.now() - t0, stopReason: j.stop_reason, ...(factor !== 1 ? { batch: true } : {}) }) + '\n');
  if (j.stop_reason === 'refusal') return { error: `refusal: ${JSON.stringify(j.stop_details)}`, costo };
  if (j.stop_reason === 'max_tokens') return { error: 'respuesta cortada por el tope de salida (max_tokens)', costo };
  const texto = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
  try { return { datos: JSON.parse(texto), costo }; } catch { return { error: `JSON inválido (stop=${j.stop_reason})`, costo }; }
}

export async function llamarClaude({ system, user, schema, tarea, pdf = null, esfuerzo = 'low', maxTokens = 16000, timeoutMs = 300000, stream = false, modelo = MODELO }) {
  clave ||= readKey();
  const body = { model: modelo, ...(stream ? { stream: true } : {}), max_tokens: maxTokens, system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }], output_config: { effort: esfuerzo, format: { type: 'json_schema', schema } }, fallbacks: 'default' };
  if (enBatch() && !stream) {
    const id = idBatch(body);
    const r = respuestaBatch(id);
    if (r?.mensaje) return procesar(r.mensaje, { tarea, pdf, t0: Date.now(), factor: FACTOR_BATCH, registrar: false, modelo });
    if (r?.error) return { error: `Batch API: ${r.error}`, costo: 0 };
    anotarEnCola(id, body, tarea, pdf); return { pendiente: true, costo: 0 };
  }
  const headers = { 'Content-Type': 'application/json', 'x-api-key': clave, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'server-side-fallback-2026-07-01' };
  let ultimo = null; const t0 = Date.now();
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs) }); }
    catch (e) { ultimo = String(e); await sleep(3000 * (intento + 1)); continue; }
    if (res.ok) {
      let j; try { j = stream ? await leerStream(res) : await res.json(); } catch (e) { ultimo = String(e); await sleep(3000 * (intento + 1)); continue; }
      return procesar(j, { tarea, pdf, t0, modelo });
    }
    ultimo = `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`;
    if (res.status === 429 || res.status >= 500) { await sleep(5000 * (intento + 1)); continue; }
    return { error: ultimo, costo: 0 };
  }
  return { error: ultimo || 'reintentos agotados', costo: 0 };
}

// Estimación grosera de tokens de un texto (para los ensayos): ~3,5 caracteres por token en los idiomas del corpus.
export const tokensDe = (texto) => Math.ceil(String(texto).length / 3.5);
// Precio por millón de tokens del modelo (categorizar-claude.mjs PRICES; Opus 5.5: entrada 4, salida 20). En modo batch, la mitad.
export const usdEstimado = (tokEntrada, tokSalida, modelo = MODELO) => { const p = PRICES[modelo] || PRICES[MODELO]; return ((tokEntrada * p.in + tokSalida * p.out) / 1e6) * (enBatch() ? FACTOR_BATCH : 1); };
