#!/usr/bin/env node
// ============================================================================
// tools/glosar-rubros.mjs — agrega a cada rubro de `<md>.rubros.json` una GLOSA en español (`glosa`): la traducción contable de la etiqueta
// ("Annen driftskostnad" -> "Otros gastos de explotación"). Una sola llamada barata a Gemini por documento (~$0,001).
//
// Para qué: Jev recibe, junto con el rubro, 8 ejemplos parecidos ya categorizados en el sitio, y esos ejemplos se buscan por PALABRAS en común.
// Los 3.975 rubros cargados están en español, portugués, inglés, alemán, neerlandés y danés: un rubro noruego, griego, ruso, italiano o turco
// no comparte ninguna palabra con ninguno y Jev trabajaba SIN ejemplos justo en los países nuevos. Con la glosa, la búsqueda de ejemplos y el
// texto que lee Jev tienen palabras en común con el sitio. (Medición antes/después: Admin/CHANGELOG.md.)
//
// USO:
//   node tools/glosar-rubros.mjs <ruta/al/archivo.rubros.json> [...]      glosa esos documentos (los que ya la tienen se saltean)
//   node tools/glosar-rubros.mjs --listos                                  glosa todos los `.rubros.json` sin glosa cuyo `.jev.json` todavía no existe
// Necesita Admin/gemini/.env (el mismo de gemini-transcribe.mjs).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { derivado, ubicar } from './rutas.mjs';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const MODEL = 'gemini-3.8-flash';
const key = () => readFileSync(resolve(root, 'Admin', 'gemini', '.env'), 'utf8').split('\n').find((l) => l.startsWith('GEMINI_API_KEY=')).slice(15).trim();

async function glosar(labels, club) {
  const prompt = `Estas son etiquetas de filas de un estado financiero de un club de fútbol (${club}), en su idioma original. Devolvé un arreglo JSON con la traducción contable al ESPAÑOL de cada una, en el mismo orden y con la misma cantidad de elementos (${labels.length}). Usá el vocabulario contable estándar en español (ej. "Annen driftskostnad" -> "Otros gastos de explotación"; "Lønnskostnad" -> "Gastos de personal"; "Salgsinntekt" -> "Ingresos por ventas"). Si la etiqueta ya está en español o no tiene traducción posible (número, símbolo), devolvela igual.\n\n${JSON.stringify(labels)}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key()}`;
  for (let a = 0; a < 4; a++) {
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0 } }) });
      if (r.ok) { const t = (await r.json()).candidates?.[0]?.content?.parts?.[0]?.text; const arr = JSON.parse(t); if (Array.isArray(arr) && arr.length === labels.length) return arr.map(String); }
      else if (r.status !== 429 && r.status < 500) return null;
    } catch { /* reintenta */ }
    await new Promise((z) => setTimeout(z, 2500 * (a + 1)));
  }
  return null;
}

export async function glosarArchivo(path) {
  const rj = JSON.parse(readFileSync(path, 'utf8'));
  if (rj.rubros.every((r) => r.glosa)) return { skipped: true };
  const uniq = [...new Set(rj.rubros.map((r) => r.label))];
  const out = new Map();
  for (let i = 0; i < uniq.length; i += 120) { // lotes de 120 etiquetas
    const part = uniq.slice(i, i + 120); const g = await glosar(part, rj.club || '');
    if (!g) return { error: `Gemini no devolvió una glosa válida (lote ${i / 120 + 1})` };
    part.forEach((l, k) => out.set(l, g[k]));
  }
  for (const r of rj.rubros) r.glosa = out.get(r.label) || r.label;
  writeFileSync(path, JSON.stringify(rj, null, 2));
  return { ok: true, n: uniq.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let files = args.filter((a) => a.endsWith('.rubros.json')).map((a) => resolve(a));
  if (args.includes('--listos')) {
    // Todos los .rubros.json (el que ya tiene glosa se saltea solo, "ya tenía glosa"). Antes se salteaban los que ya tenían .jev.json,
    // y una lista re-preparada (sin glosa) con un .jev.json viejo quedaba sin glosar. `--lista <archivo>` = solo esos PDFs.
    const i = args.indexOf('--lista');
    if (i >= 0) {
      const lista = readFileSync(resolve(root, args[i + 1]), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
      files = lista.map((p) => resolve(root, derivado(p, '.rubros.json', { crear: false }))).filter((f) => existsSync(f));
    } else {
      const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.rubros.json') ? [join(d, e.name)] : []));
      files = existsSync(resolve(root, 'Generados')) ? walk(resolve(root, 'Generados')) : []; // los .rubros.json viven en Generados/ (tools/rutas.mjs)
    }
  }
  if (!files.length) { console.error('Uso: node tools/glosar-rubros.mjs <archivo.rubros.json>... | --listos'); process.exit(1); }
  for (const f of files) { const r = await glosarArchivo(f); console.log(`${f.replace(root + '/', '')}: ${r.skipped ? 'ya tenía glosa' : r.error || `${r.n} etiquetas glosadas`}`); }
}
