// ============================================================================
// tools/jev-llamada.mjs — UNA LLAMADA A JEV (typesafe.ai) con caché, ensayo y reintentos. Librería: no corre nada al importarla.
//
// POR QUÉ (to-do 233, 2026-10-17). Jev entra como escalón barato en más etapas del pipeline (perimetro-a2 primero). Es la misma función
// que `pedirJev` de tools/caja-deuda.mjs, sacada a un módulo para no copiarla en cada tool; caja-deuda.mjs todavía usa su copia (pasarla
// acá es un cambio aparte, medido con `caja-deuda.mjs --medir --jev`).
//
// pedirJev(body, archivo, ejecutar, extraer) → { datos, cache? } | { ensayo: true, usd } | { error }
//   body      el pedido tal cual va a la API ({ state, model, questions }); la clave de la caché es su sha1.
//   archivo   la caché (Generados/_cache/<tarea>.jsonl): una respuesta pagada no se vuelve a pagar.
//   ejecutar  false = ensayo: no llama, devuelve el costo estimado (Jev cobra la entrada una vez por pregunta, ~US$ 42 por mil millones).
//   extraer   (answers) → los datos que guarda la tool, o null si la respuesta no sirve.
// Necesita Admin/api-keys/jev.env con JEV_API_KEY=... (gitignoreado).
// ============================================================================
import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '..');
const cachesJev = new Map();
let claveJev = null;

export const USD_POR_TOKEN_JEV = 42e-9;
export const tokensEstimados = (body) => Math.ceil(JSON.stringify(body).length / 4) * (1 + Object.keys(body.questions).length);

export async function pedirJev(body, archivo, ejecutar, extraer) {
  const clave = createHash('sha1').update(JSON.stringify(body)).digest('hex');
  if (!cachesJev.has(archivo)) {
    const m = new Map();
    if (existsSync(archivo)) for (const l of readFileSync(archivo, 'utf8').split('\n')) { if (!l.trim()) continue; try { const j = JSON.parse(l); m.set(j.clave, j); } catch { /* línea rota */ } }
    cachesJev.set(archivo, m);
  }
  const cache = cachesJev.get(archivo);
  if (cache.has(clave)) return { datos: cache.get(clave).datos, cache: true };
  const tokens = tokensEstimados(body);
  if (!ejecutar) return { ensayo: true, usd: tokens * USD_POR_TOKEN_JEV };
  if (!claveJev) {
    const env = resolve(ROOT, 'Admin', 'api-keys', 'jev.env');
    const line = existsSync(env) ? readFileSync(env, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')) : null;
    if (!line) return { error: `falta ${env} con JEV_API_KEY=...` };
    claveJev = line.slice(12).trim();
  }
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${claveJev}` }, body: JSON.stringify(body) }); }
    catch { await new Promise((r) => setTimeout(r, 2000 * (intento + 1))); continue; }
    if (res.ok) {
      const j = await res.json(); const datos = extraer(j.answers || {});
      if (!datos) return { error: `Jev sin respuesta: ${JSON.stringify(j).slice(0, 160)}` };
      const usd = (j.usage?.input_tokens ?? tokens) * USD_POR_TOKEN_JEV;
      mkdirSync(dirname(archivo), { recursive: true }); appendFileSync(archivo, JSON.stringify({ clave, datos, usd }) + '\n'); cache.set(clave, { datos });
      return { datos, costo: usd };
    }
    const txt = (await res.text()).slice(0, 160);
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 3000 * (intento + 1))); continue; }
    return { error: `Jev HTTP ${res.status}: ${txt}` };
  }
  return { error: 'Jev: reintentos agotados' };
}
