#!/usr/bin/env node
// ============================================================================
// tools/jev-tipo-linea.mjs — Jev contesta QUÉ ES la línea única de ingresos cuyo rótulo ninguna regla reconoce (tools/tipo-sin-desglose.js): margen bruto, ventas totales u otra cosa.
//
//   node tools/jev-tipo-linea.mjs --rotulo "<rótulo del documento>"
//
// Imprime un JSON { tipo, confianza, tokens } o { error }. Lo llama cargar-ejercicio.mjs (centavos de API, aprobado por Guido): se le pregunta 3 veces solo el rótulo (sin club ni importe,
// que bajan su confianza sin aportar) y vale la respuesta si las 3 coinciden; `confianza` es la menor de las 3. Con menos, o sin clave o sin red, la pregunta va a la cola humana
// como antes. Misma API y misma clave que tools/jev-categorizar.mjs (Admin/api-keys/jev.env). No nombra ningún club ni rótulo.
// ============================================================================
import { readFileSync, existsSync, appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const val = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const rotulo = val('--rotulo');
const salir = (o) => { console.log(JSON.stringify(o)); process.exit(0); };
if (!rotulo) salir({ error: 'falta --rotulo' });
const envPath = resolve(ROOT, 'Admin', 'api-keys', 'jev.env');
const key = existsSync(envPath) ? (readFileSync(envPath, 'utf8').split('\n').find((l) => l.startsWith('JEV_API_KEY=')) || '').slice('JEV_API_KEY='.length).trim() : '';
if (!key) salir({ error: 'sin clave de Jev (Admin/api-keys/jev.env)' });

const criteria = {
  gross_margin: 'Margen bruto: ingresos menos costos directos o de compras ya descontados (Brutomarge, Marge brute, Bruttofortjeneste, lucro bruto, gross profit, Rohertrag). Es neto de costos: no es un ingreso.',
  net_sales: 'Ventas o ingresos totales del ejercicio, la facturación entera (Omzet, Nettoomsætning, Umsatz, Umsatzerlöse, turnover, net sales, receita líquida, cifra de negocios, chiffre d\'affaires, revenue). Es un ingreso real.',
  other: 'Otra cosa: el nombre de un departamento o de una parte del club, un total que no se reconoce, o una línea cuyo significado no queda claro.'
};
const state = ['Estado de resultados de un club de fútbol. El documento informa los ingresos del ejercicio en UNA sola línea, sin abrirlos por fuente.', `Rótulo de la línea, tal cual figura en el documento: "${rotulo}"`].join('\n');
const body = { state, model: 'jev-latest', questions: { tipo: { type: 'choice', instructions: 'Elegí qué es esa línea. Si hay duda entre margen bruto y ventas, elegí other.', criteria } } };
async function una() {
  const res = await fetch('https://api.typesafe.ai/v1/systemone', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
  const j = await res.json(); const a = j.answers?.tipo;
  if (!a) throw new Error(`respuesta sin answers.tipo: ${JSON.stringify(j).slice(0, 160)}`);
  return { tipo: a.choice, confianza: a.confidence, tokens: j.usage?.input_tokens ?? 0 };
}
let rs;
try { rs = await Promise.all([una(), una(), una()]); } catch (e) { salir({ error: String(e.message || e) }); }
const tokens = rs.reduce((s, r) => s + r.tokens, 0);
try { appendFileSync(resolve(ROOT, 'Admin', 'registros', 'api', 'jev.jsonl'), JSON.stringify({ ts: new Date().toISOString(), para: 'tipo-linea', tokens }) + '\n'); } catch { /* el registro de gasto no frena la respuesta */ }
const coinciden = rs.every((r) => r.tipo === rs[0].tipo);
salir(coinciden ? { tipo: rs[0].tipo, confianza: Math.min(...rs.map((r) => r.confianza)), tokens } : { tipo: null, confianza: 0, votos: rs.map((r) => r.tipo), tokens });
