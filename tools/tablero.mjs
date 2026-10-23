#!/usr/bin/env node
// ============================================================================
// tools/tablero.mjs — los datos del tablero del pipeline, el artifact "Tablero del pipeline" de Claude que Guido abre desde
// el celular. GRATIS: corre estado.mjs y cola.mjs (que solo leen) y lee los registros de gasto de API y Admin/outreach/.
//
// Escribe un CSV por cuadro en Generados/tablero/ (no se trackean: Generados/** está en .gitignore salvo los .json, y netlify.toml borra
// Generados/ del deploy):
//   resumen.csv     clave,valor,detalle          las cuatro cifras de arriba
//   etapas.csv      orden,etapa,pdfs,detalle      dónde está cada PDF (las etapas de estado.mjs) y cuánto cuesta avanzar
//   cola.csv        tipo,casos                    los casos pendientes de la cola, por tipo
//   gasto_dia.csv   dia,mistral,gemini,claude     gasto de API por día y motor (últimos 30 días con gasto)
//   gasto_pais.csv  pais,usd                      gasto de API por país del documento (lo que el registro atribuye a un PDF de Clubes/)
//   mails.csv       estado,cantidad               mails a clubes: enviados, en revisión, aprobados; y preguntas abiertas
//   ligas.csv       liga,nombre,temporada,cargados,equipos,pct,tramo   cobertura de cada liga en su última temporada cerrada (data/faltantes/:
//                   la temporada `reciente`, que todavía no puede tener balances, no cuenta); tramo: completa, mas_mitad, menos_mitad
// EL TABLERO: https://claude.ai/artifact/ESc6PC7CUbQ8wV2ETgLVdb (tipo Dashboard, privado de Guido). Para actualizarlo, una sesión de
// Claude: (1) corre esta tool; (2) sube cada CSV como asset del artifact (Artifact, `asset: true`, un archivo por llamada); (3) en la
// base del artifact, hace `update` de `datasets/<nombre sin .csv>` con el `url` nuevo, `name` y `updated: {at, by}`. La página no se
// toca: lee los datasets. Conviene hacerlo al cerrar un lote o un merge.
//
// USO: node tools/tablero.mjs [--print]
// ============================================================================
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = resolve(ROOT, 'Generados', 'tablero');
const correr = (tool) => execFileSync(process.execPath, [resolve(ROOT, 'tools', tool)], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const num = (s) => Number(String(s).replace(/[^\d.]/g, '')) || 0;
const csv = (cols, filas) => [cols.join(','), ...filas.map((f) => cols.map((c) => { const v = f[c] == null ? '' : String(f[c]); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(','))].join('\n') + '\n';

// ESTADO: los títulos de etapa ("2. TRANSCRIBIR Y VALIDAR LA TRANSCRIPCIÓN  (8955 PDFs)") y sus filas ("   8280  Solo PDF, sin ...  ~US$ 1659
// falta: ..."). El costo de una etapa es la suma de sus filas; el total para llegar a "propuesta de carga" sale de la línea "Costo estimado".
const estado = correr('estado.mjs');
const etapas = []; let etapa = null; let costoTotal = null; let enSitio = 0, listos = 0, frenados = 0;
for (const l of estado.split('\n')) {
  const t = l.match(/^(\d(?:-\d)?)\.\s+(.+?)\s+\((\d+) PDFs\)\s*$/);
  if (t) { etapa = { orden: t[1], etapa: t[2].replace(/\s*\(.*$/, ''), pdfs: Number(t[3]), costo: 0, filas: [] }; etapas.push(etapa); continue; }
  const f = etapa && l.match(/^\s{2,6}(\d+)\s{2}(\S.*?)\s{2,}(~US\$ \d+|gratis)?\s*(falta:.*)?$/);
  if (f && !/^\s*tools:/.test(l)) {
    const n = Number(f[1]); if (!n) continue;
    etapa.filas.push(n + ' ' + f[2].trim().replace(/\s*\(escalón [^)]*\)/, '').toLowerCase());
    if (f[3] && f[3] !== 'gratis') etapa.costo += num(f[3]);
    if (/Propuesta lista/.test(f[2])) listos = n;
    if (/Propuesta frenada/.test(f[2])) frenados = n;
    if (/Ejercicio cargado/.test(f[2])) enSitio = n;
  }
  const c = l.match(/Costo estimado .*?~US\$ (\d+)/); if (c) costoTotal = Number(c[1]);
}
const totalPdfs = (estado.match(/INVENTARIO: (\d+) PDFs/) || [])[1];

// COLA: "COLA DE REVISIÓN: 49 caso(s) en 46 documento(s)" y una línea "etapa <e> · <motivo>" por caso.
const cola = correr('cola.mjs');
const [, casos, docs] = cola.match(/(\d+) caso\(s\) en (\d+) documento/) || [, 0, 0];
const NOMBRE = { gestion: 'Quién condujo el club (gestión)', categoria: 'Categoría de un rubro', name: 'Nombre legal de un club nuevo',
  perimetro: 'Perímetro (club o sociedad)', 'no-cierra': 'Verificación que no cierra' };
const porTipo = {};
for (const m of cola.matchAll(/etapa ([a-z0-9-]+) · ([a-z_-]+)/g)) { const k = NOMBRE[m[2]] || 'Otros de ' + m[1]; porTipo[k] = (porTipo[k] || 0) + 1; }

// GASTO: una línea por llamada en Admin/registros/api/<motor>.jsonl, con `ts` y `costUsd` (lo mismo que suma gasto.mjs). El país sale de la
// ruta del PDF (Clubes/<País>/...); una llamada sobre un archivo temporal no se atribuye.
const MOTORES = { mistral: 'mistral', gemini: 'gemini', 'claude-api': 'claude' };
const dias = {}, paises = {}; let gastoTotal = 0, atribuido = 0;
for (const [archivo, col] of Object.entries(MOTORES)) {
  const p = resolve(ROOT, 'Admin', 'registros', 'api', archivo + '.jsonl'); if (!existsSync(p)) continue;
  for (const l of readFileSync(p, 'utf8').split('\n')) {
    if (!l.trim()) continue; let j; try { j = JSON.parse(l); } catch { continue; }
    const usd = Number(j.costUsd) || 0; if (!usd) continue;
    gastoTotal += usd;
    const d = String(j.ts || '').slice(0, 10); if (d) (dias[d] ??= { dia: d, mistral: 0, gemini: 0, claude: 0 })[col] += usd;
    const pais = (String(j.pdf || '').match(/Clubes\/([^/]+)\//) || [])[1]; if (pais) { paises[pais] = (paises[pais] || 0) + usd; atribuido += usd; }
  }
}
const r2 = (v) => Math.round(v * 100) / 100;
const hoy = new Date().toISOString().slice(0, 10);
const gastoDia = Object.values(dias).sort((a, b) => a.dia.localeCompare(b.dia)).slice(-30).map((d) => ({ dia: d.dia, mistral: r2(d.mistral), gemini: r2(d.gemini), claude: r2(d.claude) }));

// MAILS: archivos de Admin/outreach/ por carpeta, y las preguntas abiertas de Admin/dudas-por-club.md (un título por pregunta o club).
const contar = (dir) => { const p = resolve(ROOT, 'Admin', 'outreach', dir); return existsSync(p) ? readdirSync(p).filter((f) => !f.startsWith('.')).length : 0; };
const dudas = (readFileSync(resolve(ROOT, 'Admin', 'dudas-por-club.md'), 'utf8').match(/^#{2,3} /gm) || []).length;

// LIGAS: de data/faltantes/<liga>.js (LEAGUE_GAPS[liga][temporada] = {size, cargados, reciente?}), la última temporada cerrada de cada liga.
const vm = await import('node:vm');
const ctx = { window: {} };
for (const f of readdirSync(resolve(ROOT, 'data', 'faltantes'))) vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'faltantes', f), 'utf8'), ctx);
const lc = { window: {} }; vm.runInNewContext(readFileSync(resolve(ROOT, 'data', 'leagues.js'), 'utf8').replace(/^const /gm, 'var '), lc);
const ligas = [];
for (const [liga, ys] of Object.entries(ctx.window.LEAGUE_GAPS || {})) {
  const t = Object.keys(ys).map(Number).filter((y) => !ys[y].reciente && ys[y].size).sort((a, b) => b - a)[0]; if (!t) continue;
  const v = ys[t], pct = v.cargados / v.size;
  ligas.push({ liga, nombre: (lc.window.LEAGUES[liga] || {}).name || liga, temporada: t, cargados: v.cargados, equipos: v.size,
    pct: Math.round(pct * 1000) / 10, tramo: pct >= 1 ? 'completa' : pct >= 0.5 ? 'mas_mitad' : 'menos_mitad' });
}
ligas.sort((a, b) => b.pct - a.pct || a.nombre.localeCompare(b.nombre));

const archivos = {
  'resumen.csv': csv(['clave', 'valor', 'detalle'], [
    { clave: 'en_sitio', valor: enSitio, detalle: 'ejercicios cargados' },
    { clave: 'listos', valor: listos, detalle: frenados + ' más frenados' },
    { clave: 'cola', valor: Number(casos), detalle: 'casos en ' + docs + ' documentos' },
    { clave: 'gasto', valor: r2(gastoTotal), detalle: 'US$ ' + r2((dias[hoy] || {}).mistral + (dias[hoy] || {}).gemini + (dias[hoy] || {}).claude || 0) + ' hoy' },
    { clave: 'pdfs', valor: Number(totalPdfs) || 0, detalle: 'PDFs en el inventario' },
    { clave: 'costo_avanzar', valor: costoTotal, detalle: 'US$ estimados para llevar todo a propuesta de carga' },
    { clave: 'gasto_atribuido', valor: r2(atribuido), detalle: 'US$ que el registro atribuye a un documento' },
  ]),
  'etapas.csv': csv(['orden', 'etapa', 'pdfs', 'costo', 'detalle'], etapas.map((e) => ({ orden: e.orden, etapa: e.etapa.charAt(0) + e.etapa.slice(1).toLowerCase(),
    pdfs: e.pdfs, costo: Math.round(e.costo), detalle: e.filas.slice(0, 3).join(' · ') }))),
  'cola.csv': csv(['tipo', 'casos'], Object.entries(porTipo).sort((a, b) => b[1] - a[1]).map(([tipo, n]) => ({ tipo, casos: n }))),
  'gasto_dia.csv': csv(['dia', 'mistral', 'gemini', 'claude'], gastoDia),
  'gasto_pais.csv': csv(['pais', 'usd'], Object.entries(paises).sort((a, b) => b[1] - a[1]).map(([pais, v]) => ({ pais, usd: r2(v) }))),
  'mails.csv': csv(['estado', 'cantidad'], [
    { estado: 'enviados', cantidad: contar('enviados') }, { estado: 'en revisión', cantidad: contar('cola') },
    { estado: 'aprobados', cantidad: contar('aprobados') }, { estado: 'preguntas abiertas para clubes', cantidad: dudas },
  ]),
  'ligas.csv': csv(['liga', 'nombre', 'temporada', 'cargados', 'equipos', 'pct', 'tramo'], ligas),
};
mkdirSync(OUT, { recursive: true });
for (const [f, t] of Object.entries(archivos)) writeFileSync(resolve(OUT, f), t);
if (process.argv.includes('--print')) for (const [f, t] of Object.entries(archivos)) console.log('== ' + f + '\n' + t);
console.log(`tablero: ${Object.keys(archivos).length} archivos en Generados/tablero/ (${etapas.length} etapas, ${casos} casos en la cola, gasto US$ ${r2(gastoTotal)})`);
