#!/usr/bin/env node
// ============================================================================
// tools/bfo-rusia-notas.mjs — RUSIA, ESCALÓN 2: abrir los renglones del formulario 2 (2110 ingresos, 2340 otros ingresos, 2350 otros
// gastos, 2120+2210+2220 costos) con las tablas de las NOTAS EXPLICATIVAS (`<año>-poyasneniya.md`, transcriptas en el lote 60).
//
// POR QUÉ (ok de Guido: "si hay info útil, usémosla, no la descartes por no ser un json"). El escalón 1
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
// Lo que pasa la compuerta queda en Generados/Rusia/<Club>/<nota>.bfo-notas.json (cada tabla con `pasa: {<año>: true|false}`);
// `node tools/bfo-rusia.mjs --club <Club> --escribir --reemplazar` reescribe los años ya cargados con esas filas en lugar del renglón entero.
// GASTOS POR ELEMENTO: la tabla estándar "Затраты на производство" (códigos 5610-5660) se lee SIN IA (regex por código); su compuerta pide
// además que el total de elementos (5660) sea igual a 2120+2210+2220 de ese año (si hubo cambio de existencias, no lo es, y no se usa).
//
// USO:
//   node tools/bfo-rusia-notas.mjs                     # ENSAYO: qué notas hay, qué años cubren, ventanas y costo estimado (no llama a la API)
//   node tools/bfo-rusia-notas.mjs --club Krasnodar    # uno
//   node tools/bfo-rusia-notas.mjs --ejecutar          # de verdad (lo corre Guido)
//   node tools/bfo-rusia-notas.mjs --ejecutar --sin-ia # solo las tablas que se leen sin IA (gastos por elemento): gratis
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tokensDe, usdEstimado, llamarClaude } from './claude-llamada.mjs';
import { derivado } from './rutas.mjs';

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

const num = (x) => { const t = String(x || '').replace(/\s|\u00a0/g, '').replace(/^\((.*)\)$/, '-$1').replace(/,/g, '.'); if (!t || t === '-' || t === '—') return null; const n = Number(t); return Number.isFinite(n) ? n : null; };
let gastado = 0;
const CATS_ING = ['member_dues', 'season_tickets', 'matchday_competition', 'stadium_other', 'broadcasting', 'competition_bonus', 'sponsorship_commercial', 'player_sales', 'youth_football', 'womens_football', 'other_sports', 'other_income'];
const CATS_GAS = ['wages_squad', 'player_amortisation', 'player_impairment', 'depreciation', 'other_amortisation', 'match_organisation_expense', 'youth_other_sports_expense', 'admin_general_expense', 'other_expenses', 'exceptional_items'];
const SCHEMA = { type: 'object', additionalProperties: false, required: ['tablas'], properties: { tablas: { type: 'array', items: { type: 'object', additionalProperties: false,
  required: ['tipo', 'titulo', 'linea_titulo', 'filas', 'total_actual', 'total_anterior'],
  properties: { tipo: { type: 'string', enum: ['ingresos_por_tipo', 'otros_ingresos', 'otros_gastos', 'gastos_por_elemento'] }, titulo: { type: 'string' }, linea_titulo: { type: 'integer' },
    total_actual: { type: ['number', 'null'] }, total_anterior: { type: ['number', 'null'] },
    filas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['etiqueta', 'linea', 'valor_actual', 'valor_anterior', 'categoria'],
      properties: { etiqueta: { type: 'string' }, linea: { type: 'integer' }, valor_actual: { type: ['number', 'null'] }, valor_anterior: { type: ['number', 'null'] }, categoria: { type: 'string', enum: [...CATS_ING, ...CATS_GAS] } } } } } } } } };
const SYSTEM = `Sos analista de estados financieros de clubes de fútbol rusos. Te paso fragmentos (con su número de línea "Lnnn:") de las notas explicativas (пояснения) de un ejercicio. Devolvé SOLO las tablas que abren estos renglones del estado de resultados:
- ingresos_por_tipo: la выручка (código 2110) por tipo de venta (sponsors, TV, entradas, abonos, merchandising, publicidad...).
- otros_ingresos: los прочие доходы (2340) por concepto.
- otros_gastos: los прочие расходы (2350) por concepto.
- gastos_por_elemento: los gastos por elemento (материальные затраты, оплата труда, отчисления, амортизация, прочие).
Reglas: los importes tal cual están impresos, en miles de rublos, como número (paréntesis = negativo; "-" = null). Solo las filas de detalle del nivel más bajo que suman el total, sin la fila de total ni subtotales (si una fila es "в том числе" de otra, no la sumes dos veces: quedate con el nivel que suma el total). total_actual/total_anterior: el total que imprime la tabla (o null). categoria, con estas definiciones: ingresos: member_dues (cuotas de socios), season_tickets (abonos), matchday_competition (entradas), stadium_other (uso del estadio fuera del partido), broadcasting (TV y derechos de transmisión), competition_bonus (premios por competencia), sponsorship_commercial (sponsors, publicidad, merchandising), player_sales (venta/cesión de jugadores, compensaciones de transferencia), youth_football, womens_football, other_sports, other_income (resto: aportes, subsidios, diferencias de cambio, intereses, venta de activos, multas...); gastos: wages_squad (salarios y cargas), player_amortisation, player_impairment, depreciation, other_amortisation, match_organisation_expense (viajes, organización de partidos), youth_other_sports_expense, admin_general_expense, other_expenses, exceptional_items. Si una tabla no está en los fragmentos, no la inventes.`;

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
    const salida = derivado(`Clubes/Rusia/${nombre}/${nota}`, '.bfo-notas.json');
    if (existsSync(salida) && !ARGS.includes('--rehacer')) { console.log('      ya extraída (--rehacer para volver a pagar)'); continue; }
    const tablas = [];
    // a) Gastos por elemento, sin IA: códigos 5610-5650 y el total 5660.
    const porCodigo = {}; for (const [i, l] of L.entries()) { const m = l.match(/^\|\s*([^|]+?)\s*\|\s*(56[1-6]0)\s*\|\s*([^|]*)\|\s*([^|]*)\|/); if (m) porCodigo[m[2]] = { etiqueta: m[1].trim(), linea: i + 1, vals: [num(m[3]), num(m[4])] }; }
    if (porCodigo['5660'] && porCodigo['5620']) {
      const ELEM = { 5610: 'other_expenses', 5620: 'wages_squad', 5630: 'wages_squad', 5640: 'depreciation', 5650: 'other_expenses' };
      tablas.push({ tipo: 'gastos_por_elemento', titulo: 'Затраты на производство (códigos 5610-5660)', origen: 'regex', columnas: [anio, anio - 1],
        filas: Object.entries(ELEM).filter(([c]) => porCodigo[c]).map(([c, cat]) => ({ etiqueta: `${porCodigo[c].etiqueta} (${c})`, linea: porCodigo[c].linea, categoria: cat, valores: porCodigo[c].vals })),
        total: porCodigo['5660'].vals });
    }
    // b) El resto, con Claude (una llamada, solo las ventanas).
    const tiposIA = tipos.filter((t) => t !== 'gastos_por_elemento' || !tablas.length);
    if (tiposIA.length && !ARGS.includes('--sin-ia')) {
      const r = await llamarClaude({ system: SYSTEM, user: `Nota explicativa de ${nombre}, ejercicio ${anio} (columnas: ${anio} y ${anio - 1}). Tablas buscadas: ${tiposIA.join(', ')}.\n\n${texto}`, schema: SCHEMA, tarea: 'bfo-rusia-notas', pdf: `Clubes/Rusia/${nombre}/${nota}`, maxTokens: 12000 });
      if (r.error) { console.log(`      Claude: ${r.error}`); } else for (const t of r.datos.tablas || []) tablas.push({ ...t, origen: 'claude', columnas: [anio, anio - 1], filas: t.filas.map((f) => ({ ...f, valores: [f.valor_actual, f.valor_anterior] })), total: [t.total_actual, t.total_anterior] });
      gastado += r.costo || 0;
    }
    // c) La compuerta, sin IA: la suma de las filas = el código del formulario 2 de ese año (± 2 miles).
    for (const t of tablas) {
      const def = TITULOS.find((x) => x.tipo === t.tipo); t.pasa = {}; t.detalle = {};
      for (const [k, y] of t.columnas.entries()) {
        const v = bfo(carpeta, y); if (!v || !def) { t.pasa[y] = false; continue; }
        const suma = t.filas.reduce((a, f) => a + Math.abs(Number(f.valores?.[k] || 0)), 0);
        const objetivo = def.codigos.reduce((a, c) => a + v(c), 0);
        const totalOk = t.total?.[k] == null || Math.abs(Math.abs(t.total[k]) - suma) <= 2;
        t.pasa[y] = suma > 0 && totalOk && Math.abs(suma - objetivo) <= 2;
        t.detalle[y] = `filas ${suma} · objetivo ${def.codigos.join('+')} = ${objetivo}${t.total?.[k] != null ? ` · total impreso ${Math.abs(t.total[k])}` : ''}`;
      }
      console.log(`      ${t.tipo} (${t.origen}): ${t.columnas.map((y) => `${y} ${t.pasa[y] ? 'PASA' : 'no'} (${t.detalle[y] || 'sin formulario'})`).join(' · ')}`);
    }
    if (ARGS.includes('--sin-ia') && tiposIA.length) { console.log('      (--sin-ia: la nota tiene tablas que necesitan IA; no se guarda, la corrida paga la hace entera)'); continue; }
    mkdirSync(dirname(salida), { recursive: true });
    writeFileSync(salida, JSON.stringify({ nota: `Clubes/Rusia/${nombre}/${nota}`, generado: new Date().toISOString(), tablas }, null, 1));
  }
}
console.log(EJECUTAR ? `\nGastado: US$ ${gastado.toFixed(3)}. Siguiente: node tools/bfo-rusia.mjs --escribir --reemplazar (reescribe los años con las tablas que pasaron la compuerta).` : `\n${nNotas} nota(s) con tablas reconocibles, ${nTablas} tabla(s) candidata(s). ENSAYO: ~US$ ${total.toFixed(2)} en total (Claude, una llamada por nota). No se llamó a ninguna API.`);
