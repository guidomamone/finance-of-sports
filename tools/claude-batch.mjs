// ============================================================================
// tools/claude-batch.mjs — MODO BATCH de las llamadas a Claude (Batch API de Anthropic: mitad de precio, respuesta en menos de una hora casi
// siempre y 24 horas como máximo; ok de Guido 2026-10-17). Librería: no corre nada al importarla. La usan claude-llamada.mjs (localizar,
// extraer, primer-anio, perimetro-a2) y categorizar-claude.mjs; el que manda las olas es tools/lote-batch.mjs.
//
// Se prende con FOS_CLAUDE_BATCH=1 (lo pone lote-batch.mjs; lo heredan los subprocesos del lote). Mismo modelo, mismo pedido:
//   - el id de un pedido (custom_id) es la huella sha1 de su cuerpo: el mismo pedido en otra pasada encuentra su respuesta;
//   - respuesta ya vuelta → Generados/_cache/claude-batch.jsonl (la tool la usa como si acabara de llegar, costo x0,5);
//   - sin respuesta → se anota en Generados/_cache/claude-batch-cola.jsonl y la tool devuelve { pendiente } (no es un error);
//   - enviarColaBatch() manda la cola, espera y guarda; los envíos quedan en claude-batch-envios.jsonl, así un lote cortado mientras
//     esperaba recoge el envío al volver a correr en vez de pagarlo otra vez. Un pedido vencido (24 h) no se cobra y vuelve a la cola.
// ============================================================================
import { appendFileSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { SESION } from './sesion.mjs'; // gasto por sesión
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '..');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const idBatch = (body) => createHash('sha1').update(JSON.stringify(body)).digest('hex');
// EL COSTO SE ANOTA UNA VEZ, AL RECOGER: anotarlo al USAR la respuesta lo repetía en cada pasada cuando una
// tool encadena dos llamadas (localizar → localizar-2: la primera se vuelve a leer hasta que vuelve la segunda). Una línea por pedido
// cobrado en Admin/registros/api/claude-api.jsonl, con el precio batch (la mitad de PRICES de categorizar-claude.mjs, copiado acá para no
// importarlo: categorizar-claude.mjs importa este módulo). Escritura y lectura de caché como costOf: 1,25 y 0,1 de la entrada.
const PRECIO = { 'claude-opus-5-5': { in: 4, out: 20 }, 'claude-sonnet-5-5': { in: 2, out: 10 } };
const costoBatch = (model, u = {}) => { const p = PRECIO[model] || PRECIO['claude-opus-5-5']; const inTok = (u.input_tokens || 0) + 1.25 * (u.cache_creation_input_tokens || 0) + 0.1 * (u.cache_read_input_tokens || 0); return ((inTok * p.in + (u.output_tokens || 0) * p.out) / 1e6) * FACTOR_BATCH; };
const registrarCosto = (m, meta, custom_id, envio) => appendFileSync(resolve(ROOT, 'Admin', 'registros', 'api', 'claude-api.jsonl'), JSON.stringify({ ts: new Date().toISOString(), sesion: SESION, tarea: meta.tarea, pdf: meta.pdf, model: m.model, promptTokenCount: m.usage?.input_tokens, cacheReadTokens: m.usage?.cache_read_input_tokens, candidatesTokenCount: m.usage?.output_tokens, costUsd: Number(costoBatch(m.model, m.usage).toFixed(6)), stopReason: m.stop_reason, batch: true, envio, custom_id }) + '\n');
export const enBatch = () => process.env.FOS_CLAUDE_BATCH === '1';
export const FACTOR_BATCH = 0.5;
const CACHE_DIR = resolve(ROOT, 'Generados', '_cache');
const RESPUESTAS = resolve(CACHE_DIR, 'claude-batch.jsonl');
const COLA = resolve(CACHE_DIR, 'claude-batch-cola.jsonl');
const ENVIOS = resolve(CACHE_DIR, 'claude-batch-envios.jsonl');
const leerJsonl = (f) => (existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter((l) => l.trim()).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
let respuestas = null;
export function respuestaBatch(id) {
  if (!respuestas) { respuestas = new Map(); for (const r of leerJsonl(RESPUESTAS)) respuestas.set(r.custom_id, r); }
  return respuestas.get(id) || null;
}
export function anotarEnCola(id, params, tarea, pdf) {
  if (leerJsonl(COLA).some((x) => x.custom_id === id)) return;
  mkdirSync(CACHE_DIR, { recursive: true }); appendFileSync(COLA, JSON.stringify({ custom_id: id, tarea, pdf, params }) + '\n');
}
export const pendientesEnCola = () => leerJsonl(COLA).length;

const API = 'https://api.anthropic.com/v1/messages/batches';
let clave = null;
function readKey() {
  const env = resolve(ROOT, 'Admin', 'api-keys', 'claude-api.env');
  const line = existsSync(env) ? readFileSync(env, 'utf8').split('\n').find((l) => l.startsWith('ANTHROPIC_API_KEY=')) : null;
  if (!line) throw new Error(`Falta ${env} con una línea ANTHROPIC_API_KEY=...`);
  return line.slice('ANTHROPIC_API_KEY='.length).trim();
}
const cabeceras = () => ({ 'Content-Type': 'application/json', 'x-api-key': (clave ||= readKey()), 'anthropic-version': '2023-06-01' });
async function pedir(url, opts = {}) {
  for (let intento = 0; intento < 6; intento++) {
    let res; try { res = await fetch(url, { ...opts, headers: cabeceras(), signal: AbortSignal.timeout(300000) }); } catch (e) { await sleep(5000 * (intento + 1)); continue; }
    if (res.ok) return res;
    const txt = (await res.text()).slice(0, 300);
    if (res.status === 429 || res.status >= 500) { await sleep(10000 * (intento + 1)); continue; }
    throw new Error(`Batch API HTTP ${res.status}: ${txt}`);
  }
  throw new Error(`Batch API: reintentos agotados (${url})`);
}
// Manda la cola (en envíos de hasta 5.000 pedidos), espera a que cada envío termine y guarda las respuestas. Un envío que quedó sin recoger
// (el lote se cortó mientras esperaba) se recoge primero: ENVIOS guarda los ids. Devuelve cuántas respuestas guardó.
export async function enviarColaBatch({ cadaSeg = 60, avisar = console.log } = {}) {
  mkdirSync(CACHE_DIR, { recursive: true });
  const cola = leerJsonl(COLA);
  for (let i = 0; i < cola.length; i += 5000) {
    const parte = cola.slice(i, i + 5000);
    // `fallbacks` (reintento del lado del servidor ante un rechazo) no se acepta en batch: se saca al mandar.
    // El custom_id sigue siendo la huella del pedido completo, así la tool encuentra su respuesta en la pasada siguiente.
    const sinFallbacks = ({ fallbacks, ...resto }) => resto;
    const res = await pedir(API, { method: 'POST', body: JSON.stringify({ requests: parte.map((x) => ({ custom_id: x.custom_id, params: sinFallbacks(x.params) })) }) });
    const b = await res.json();
    appendFileSync(ENVIOS, JSON.stringify({ id: b.id, pedidos: parte.map((x) => ({ custom_id: x.custom_id, tarea: x.tarea, pdf: x.pdf })), creado: new Date().toISOString() }) + '\n');
    avisar(`  Batch API: envío ${b.id} con ${parte.length} pedido(s)`);
  }
  writeFileSync(COLA, '');
  let guardadas = 0;
  const recogidos = new Set(leerJsonl(ENVIOS).filter((x) => x.recogido).map((x) => x.id));
  for (const env of leerJsonl(ENVIOS).filter((x) => x.id && !x.recogido && !recogidos.has(x.id))) {
    let b; const t0 = Date.now();
    for (;;) {
      b = await (await pedir(`${API}/${env.id}`)).json();
      if (b.processing_status === 'ended') break;
      avisar(`  Batch API: ${env.id} procesando (${JSON.stringify(b.request_counts)}), ${Math.round((Date.now() - t0) / 60000)} min`);
      await sleep(cadaSeg * 1000);
    }
    const txt = await (await pedir(b.results_url)).text();
    const porId = new Map((env.pedidos || []).map((x) => [x.custom_id, x]));
    let expirados = 0;
    for (const l of txt.split('\n').filter((x) => x.trim())) {
      const r = JSON.parse(l); const meta = porId.get(r.custom_id) || {};
      if (r.result?.type === 'succeeded') { registrarCosto(r.result.message, meta, r.custom_id, env.id); appendFileSync(RESPUESTAS, JSON.stringify({ custom_id: r.custom_id, tarea: meta.tarea, pdf: meta.pdf, mensaje: r.result.message }) + '\n'); guardadas++; }
      else if (r.result?.type === 'errored') { appendFileSync(RESPUESTAS, JSON.stringify({ custom_id: r.custom_id, tarea: meta.tarea, pdf: meta.pdf, error: JSON.stringify(r.result.error).slice(0, 300) }) + '\n'); guardadas++; }
      else expirados++; // expired / canceled: no se cobra y no se guarda; la pasada siguiente lo vuelve a anotar
    }
    appendFileSync(ENVIOS, JSON.stringify({ id: env.id, recogido: new Date().toISOString(), expirados }) + '\n');
    avisar(`  Batch API: ${env.id} terminado (${JSON.stringify(b.request_counts)})${expirados ? `; ${expirados} vencido(s) o cancelado(s), van en la ola siguiente` : ''}`);
  }
  respuestas = null;
  return guardadas;
}

