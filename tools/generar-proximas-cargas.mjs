#!/usr/bin/env node
// ============================================================================
// tools/generar-proximas-cargas.mjs — LO QUE SIGUE: la fuente del card «Próximas cargas» de Inicio.
//
// Sale del inventario de transcripciones (Admin/registros/transcripciones-estado.jsonl): un documento con estado `listo` (el .md está hecho y verificado, todavía no se cargó) cuyo
// ejercicio —el año del cierre del período— no está en el JSON del club es una carga que viene. Una fila por club, con esos ejercicios. El club se reconoce por el nombre de su carpeta en
// Clubes/ (sin acentos ni espacios) contra el nombre del club en data/; una carpeta que no coincide, o que coincide con dos clubes, se saltea: es un card de portada, no un inventario.
//
// Escribe data/proximas-cargas.js: `window.PROXIMAS_CARGAS = [{id, anios:[…]}, …]` (hasta MAX filas: los clubes con el ejercicio pendiente más reciente primero, y a igual año los que
// tienen más). `--check` sale con 1 si quedó viejo; lo corre audit.js (`proximas-cargas-desfasado`, P1) y lo escribe tools/generadores.mjs.
// ============================================================================
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = 'data/proximas-cargas.js';
const REGISTRO = 'Admin/registros/transcripciones-estado.jsonl';
const MAX = 20;
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');

function clubes() {
  const porNombre = new Map(); // nombre normalizado -> [{ id, years:Set }]
  for (const iso of readdirSync(resolve(ROOT, 'data')).filter((d) => /^[a-z]{2}$/.test(d)).sort()) {
    for (const f of readdirSync(resolve(ROOT, 'data', iso)).filter((x) => x.endsWith('.json')).sort()) {
      const j = JSON.parse(readFileSync(resolve(ROOT, 'data', iso, f), 'utf8'));
      const c = { id: j.club.id, years: new Set(j.years.map((y) => y.fiscal_year)) };
      for (const n of new Set([j.club.display_name, j.club.name].map(norm))) porNombre.set(n, [...(porNombre.get(n) || []), c]);
    }
  }
  return porNombre;
}

export function generar() {
  const porNombre = clubes();
  const hoy = new Date().getFullYear();
  const pend = new Map(); // id -> Set de años
  for (const l of readFileSync(resolve(ROOT, REGISTRO), 'utf8').split('\n').filter(Boolean)) {
    const o = JSON.parse(l);
    const cierre = o.periodo && o.periodo.cierre;
    if (o.estado !== 'listo' || !cierre) continue;
    const anio = Number(String(cierre).slice(0, 4));
    const carpeta = o.pdf.split('/')[2];
    const cs = porNombre.get(norm(carpeta)) || [];
    if (cs.length !== 1 || !anio || anio > hoy || cs[0].years.has(anio)) continue;
    pend.set(cs[0].id, (pend.get(cs[0].id) || new Set()).add(anio));
  }
  const lista = [...pend].map(([id, a]) => ({ id, anios: [...a].sort((x, y) => x - y) }))
    .sort((a, b) => b.anios.at(-1) - a.anios.at(-1) || b.anios.length - a.anios.length || a.id.localeCompare(b.id)).slice(0, MAX);
  return `// GENERADO por tools/generar-proximas-cargas.mjs: no editar a mano. Clubes con documentos transcritos y verificados (estado «listo») de ejercicios que todavía no están cargados.\nwindow.PROXIMAS_CARGAS = ${JSON.stringify(lista)};\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const nuevo = generar();
  const actual = existsSync(resolve(ROOT, SALIDA)) ? readFileSync(resolve(ROOT, SALIDA), 'utf8') : null;
  if (process.argv.includes('--check')) {
    if (actual !== nuevo) { console.error(`${SALIDA} desactualizado: node tools/generar-proximas-cargas.mjs`); process.exit(1); }
    process.exit(0);
  }
  if (actual !== nuevo) { writeFileSync(resolve(ROOT, SALIDA), nuevo); console.log(`${SALIDA} escrito (${nuevo.split('"id"').length - 1} clubes)`); } else console.log(`${SALIDA} sin cambios`);
}
