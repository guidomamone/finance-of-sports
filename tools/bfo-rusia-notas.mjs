#!/usr/bin/env node
// ============================================================================
// tools/bfo-rusia-notas.mjs — RUSIA, ESCALÓN 2: abrir los renglones del formulario 2 (2110 ingresos, 2340 otros ingresos, 2350 otros
// gastos, 2120+2210+2220 costos) con las tablas de las NOTAS EXPLICATIVAS (`<año>-poyasneniya.md`, transcriptas en el lote 60).
//
// POR QUÉ (Versión 646, ok de Guido el 2026-10-09: "si hay info útil, usémosla, no la descartes por no ser un json"). El escalón 1
// (tools/bfo-rusia.mjs) carga los ingresos del fútbol en un solo renglón (2110) y deja "otros ingresos" (2340) entero, que en Rusia suele ser
// más grande que los ingresos (aporte del dueño, venta de jugadores). Las notas de varios clubes los abren: Krasnodar 2025, tabla 12
// "Структура продаж по видам": sponsors 1.815.143, TV 1.199.719, publicidad 914.103, merchandising 525.112, entradas 519.266, abonos
// 419.637, otros 59.877 = 5.452.857, exacto el 2110. Y cada nota trae también la columna del año anterior.
//
// LA ESCALERA DE CADA TABLA:
//   1. ventana gratis: las líneas de la nota alrededor de los títulos que interesan (ventas por tipo, otros ingresos y gastos, gastos por
//      elemento), para no mandar las ~1.000 líneas enteras;
//   2. Claude (una llamada por nota, esfuerzo bajo) devuelve cada tabla con sus filas, la línea del .md y una categoría propuesta del sitio;
//   3. COMPUERTA, la misma para todas y sin IA: la suma de las filas da EXACTO (±2 miles) el código del formulario 2 de ese año, leído del
//      bfo-AAAA-datos.json. Si no da, la tabla no se usa y el año queda con el renglón entero del escalón 1.
// Lo que pasa la compuerta queda en Generados/Rusia/<Club>/<nota>.bfo-notas.json; tools/bfo-rusia.mjs lo usará para reescribir el año
// (pendiente de escribir: este script hoy es el ensayo y la extracción).
//
// USO:
//   node tools/bfo-rusia-notas.mjs                     # ENSAYO: qué notas hay, qué años cubren, ventanas y costo estimado (no llama a la API)
//   node tools/bfo-rusia-notas.mjs --club Krasnodar    # uno
//   node tools/bfo-rusia-notas.mjs --ejecutar          # de verdad (lo corre Guido)
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tokensDe, usdEstimado } from './claude-llamada.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const EJECUTAR = ARGS.includes('--ejecutar');
const SOLO = flag('--club');
const DIR = resolve(ROOT, 'Clubes', 'Rusia');

// Títulos que abren una tabla útil (ruso, como los escriben las notas). Ventana: VENTANA líneas después del título.
const TITULOS = [
  { tipo: 'ingresos_por_tipo', codigos: [2110], re: /(структура|состав|расшифровк\w*)\s+(продаж|выручк)|выручк\w*\s+(по видам|в разрезе)|доходы от обычных видов деятельности/i },
  { tipo: 'otros_ingresos', codigos: [2340], re: /прочи[ех]\s+доход/i },
  { tipo: 'otros_gastos', codigos: [2350], re: /прочи[ех]\s+расход/i },
  { tipo: 'gastos_por_elemento', codigos: [2120, 2210, 2220], re: /(расход\w*|затрат\w*)\s+(по элементам|по обычным видам деятельности)|структура расходов|элементы затрат|затраты на производство/i },
];
const VENTANA = 45;

function bfo(carpeta, anio) {
  const p = resolve(carpeta, `bfo-${anio}-datos.json`); if (!existsSync(p)) return null;
  const f = JSON.parse(readFileSync(p, 'utf8')).financialResult || {};
  return (c) => Math.abs(Number(f[`current${c}`] || 0));
}

const carpetas = readdirSync(DIR, { withFileTypes: true }).filter((d) => d.isDirectory() && (!SOLO || d.name === SOLO)).map((d) => d.name).sort();
let total = 0; let nNotas = 0; let nTablas = 0;
console.log(`\n=== Rusia, escalón 2 (${EJECUTAR ? 'DE VERDAD' : 'ENSAYO'}): tablas de las notas explicativas ===`);
for (const nombre of carpetas) {
  const carpeta = resolve(DIR, nombre);
  const notas = readdirSync(carpeta).filter((f) => /^\d{4}-poyasneniya\.md$/.test(f)).sort();
  for (const nota of notas) {
    const anio = Number(nota.slice(0, 4));
    const L = readFileSync(resolve(carpeta, nota), 'utf8').split('\n');
    const hallazgos = [];
    L.forEach((l, i) => { if (!/^\s*(#|\*\*|Таблица|\|)/.test(l) && !/^[А-ЯЁ]/.test(l.trim())) return; for (const t of TITULOS) if (t.re.test(l) && l.length < 200) hallazgos.push({ tipo: t.tipo, linea: i + 1 }); });
    // Ventanas fusionadas.
    const rangos = hallazgos.map((h) => [h.linea, Math.min(L.length, h.linea + VENTANA)]).sort((a, b) => a[0] - b[0]).reduce((acc, r) => { const u = acc[acc.length - 1]; if (u && r[0] <= u[1]) u[1] = Math.max(u[1], r[1]); else acc.push([...r]); return acc; }, []);
    const texto = rangos.map(([a, b]) => L.slice(a - 1, b).map((x, k) => `L${a + k}: ${x}`).join('\n')).join('\n...\n');
    const tipos = [...new Set(hallazgos.map((h) => h.tipo))];
    const cubre = [anio, anio - 1].filter((y) => bfo(carpeta, y));
    const usd = texto ? usdEstimado(tokensDe(texto) + 1800, 2500) : 0;
    total += usd; nNotas += texto ? 1 : 0; nTablas += tipos.length;
    console.log(`  ${`${nombre}/${nota}`.padEnd(46)} años ${cubre.join(', ') || '—'} · ${tipos.length ? tipos.join(', ') : 'sin tablas reconocibles'} · ${rangos.reduce((n, [a, b]) => n + b - a + 1, 0)} líneas · ~US$ ${usd.toFixed(3)}`);
    if (!EJECUTAR || !texto) continue;
    // (La llamada y la compuerta: pendiente del ok de Guido sobre el ensayo. Ver la cabecera.)
  }
}
console.log(`\n${nNotas} nota(s) con tablas reconocibles, ${nTablas} tabla(s) candidata(s). ENSAYO: ~US$ ${total.toFixed(2)} en total (Claude, una llamada por nota). No se llamó a ninguna API.`);
