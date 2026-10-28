#!/usr/bin/env node
// ============================================================================
// tools/generar-ultimas-cargas.mjs — LO QUE SE CARGÓ ÚLTIMO: la fuente del card «Últimas cargas» de Inicio y de ultimas-cargas.html.
//
// Los datos públicos no dicen cuándo se cargó un año; sí lo dicen los commits de carga que deja cargar-lote.mjs (`<Club> <año> por el pipeline`, uno por
// año, con el JSON del club adentro). Se lee el historial como tools/generar-correcciones.mjs. Una «tanda» es lo que un club cargó el mismo día: el card
// muestra una fila por tanda («Real Santander, 2016 a 2025»), no una por año. Solo cuentan los ejercicios que siguen en el JSON del club en el HEAD actual
// (un año retirado después no figura) y solo cargas del pipeline: un año estimado o recalculado no es una carga.
//
// Escribe data/ultimas-cargas.js: `window.ULTIMAS_CARGAS = [{id, anios:[…], fecha:'YYYY-MM-DD'}, …]`, la más reciente primero (todas las tandas; el card toma 10).
// `--check` sale con 1 si quedó viejo; lo corre audit.js (`ultimas-cargas-desfasado`, P1) y lo escribe tools/generadores.mjs.
// Admin/registros/cargar-ultimo.jsonl es interno y no se lee acá.
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = 'data/ultimas-cargas.js';
const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 30 });

function aniosVigentes(id, iso, cache) {
  if (!cache.has(id)) {
    const ruta = resolve(ROOT, `data/${iso}/${id}.json`);
    cache.set(id, existsSync(ruta) ? new Set(JSON.parse(readFileSync(ruta, 'utf8')).years.map((y) => y.fiscal_year)) : new Set());
  }
  return cache.get(id);
}

export function generar() {
  const salida = git(['log', '--grep=por el pipeline', '--format=%x01%aI%x02%s', '--name-only', '--', 'data']);
  const tandas = new Map(); // `${id}|${fecha}` -> { id, fecha, ts, anios:Set }
  const vigentes = new Map();
  for (const bloque of salida.split('\x01').slice(1)) {
    const [cab, ...archivos] = bloque.split('\n');
    const [aI, asunto] = cab.split('\x02');
    const m = asunto.match(/^.+ (\d{4}) por el pipeline/);
    const json = archivos.map((a) => a.match(/^data\/([a-z]{2})\/([a-z0-9-]+)\.json$/)).find(Boolean);
    if (!m || !json) continue;
    const [, iso, id] = json, anio = Number(m[1]);
    if (!aniosVigentes(id, iso, vigentes).has(anio)) continue;
    const fecha = aI.slice(0, 10), k = `${id}|${fecha}`;
    const t = tandas.get(k) || { id, fecha, ts: aI, anios: new Set() };
    t.anios.add(anio);
    if (aI > t.ts) t.ts = aI;
    tandas.set(k, t);
  }
  const lista = [...tandas.values()].sort((a, b) => (a.ts < b.ts ? 1 : a.ts > b.ts ? -1 : a.id.localeCompare(b.id)))
    .map((t) => ({ id: t.id, anios: [...t.anios].sort((a, b) => a - b), fecha: t.fecha }));
  return `// GENERADO por tools/generar-ultimas-cargas.mjs: no editar a mano. Las tandas de carga (un club, un día), la más reciente primero.\nwindow.ULTIMAS_CARGAS = ${JSON.stringify(lista)};\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const nuevo = generar();
  const actual = existsSync(resolve(ROOT, SALIDA)) ? readFileSync(resolve(ROOT, SALIDA), 'utf8') : null;
  if (process.argv.includes('--check')) {
    if (actual !== nuevo) { console.error(`${SALIDA} desactualizado: node tools/generar-ultimas-cargas.mjs`); process.exit(1); }
    process.exit(0);
  }
  if (actual !== nuevo) { writeFileSync(resolve(ROOT, SALIDA), nuevo); console.log(`${SALIDA} escrito (${nuevo.split('"id"').length - 1} tandas)`); } else console.log(`${SALIDA} sin cambios`);
}
