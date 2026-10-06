#!/usr/bin/env node
// ============================================================================
// tools/localizar-extraer.mjs — TEST de una forma distinta de hacer las etapas 3-4: "localizar, extraer, verificar" con IA, en vez de buscar
// las tablas de resultados por palabras. Es un test (Versión 323): todavía no reemplaza a nada del pipeline.
//
// POR QUÉ EXISTE (2026-10-01, propuesta aceptada por Guido: "dale"). Medido el mismo día sobre 266 años YA cargados: la selección de filas por
// palabras (`seleccionarFilas()` de proponer-carga.mjs, etapa 4) reproduce la suma de ingresos de producción (±2%) en 18 (7%); con "solo el
// estado principal y sus notas", en 28 (11%). Partir esas reglas por país mejora poco. La industria que hace lo mismo (bancos que pasan
// balances en PDF a una plantilla, el "financial spreading") primero UBICA las páginas que importan, después EXTRAE solo esas a una plantilla
// y después VERIFICA con identidades contables. Este test mide si eso, con Claude, reproduce lo cargado mejor que el 7-11%.
//
// LOS TRES PASOS (por documento):
//   1. LOCALIZAR (Claude, 1 llamada): recibe las primeras ~450 letras de cada página CON CIFRAS del .md (título, encabezados, primeras filas) y dice qué
//      páginas son el estado de resultados del ejercicio y cuáles las notas que desglosan sus ingresos y sus gastos; además la escala
//      (unidades / miles / millones) con la frase que lo dice, la moneda, el encabezado de la columna del ejercicio y el perímetro.
//      -> Generados/.../<doc>.localizar.json
//   2. EXTRAER (Claude, 1 llamada): recibe SOLO esas páginas completas (hasta 8) y devuelve cada fila de la columna del ejercicio: la etiqueta
//      y el importe TAL CUAL están impresos, si es renglón / subtotal / total / resultado, de qué lado es (ingreso, gasto, financiero,
//      impuesto) y, si la fila es de una nota, qué renglón del estado desglosa. -> Generados/.../<doc>.extraccion.json
//   3. VERIFICAR (gratis, sin IA): (a) cada importe tiene que estar LITERAL en el texto de su página (si no, el modelo lo inventó o lo leyó
//      mal: se cuenta y se muestra); (b) los ingresos = renglones de ingreso del estado, reemplazando cada renglón que una nota desglosa por
//      las filas de esa nota (lo mismo con los gastos); (c) esa suma contra el total impreso que el modelo encontró.
//
// LA VARA (modo --medir): igual que el test por grupo de la etapa 4 (HANDOFF): la suma de ingresos (y de gastos) a ±2% de la de las
// revenueLines / expenseLines de producción, por grupo de países. Producción tiene agrupaciones curadas, así que el 100% no es alcanzable;
// lo que importa es la comparación contra el 7-11% de la selección por palabras sobre los MISMOS años.
//
// MODELO: Claude Opus 5.5 (el modelo por defecto del proyecto, como categorizar-claude.mjs), esfuerzo bajo, salida en JSON con esquema
// (structured outputs) y `fallbacks: "default"` (si un clasificador de seguridad rechaza el pedido, lo reintenta otro modelo). Llamadas con
// fetch directo, sin SDK: el proyecto no tiene package.json (mismo criterio que categorizar-claude.mjs). Tope de 5 minutos por llamada: sin
// tope, una conexión colgada frena la corrida para siempre. Cada llamada queda en Admin/claude-api/resultados.jsonl (tarea 'localizar' /
// 'extraer'), así tools/gasto.mjs la cuenta.
//
// USO:
//   node tools/localizar-extraer.mjs --lista Admin/Archive/pilotos/piloto-localizar.txt              ENSAYO: tokens y costo estimados, sin API
//   node tools/localizar-extraer.mjs --lista Admin/Archive/pilotos/piloto-localizar.txt --ejecutar   localizar + extraer (API); los ya hechos no se repiten
//   node tools/localizar-extraer.mjs --lista Admin/Archive/pilotos/piloto-localizar.txt --medir      gratis: verificación y comparación con producción
// ============================================================================

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
// Los módulos que se importan leen process.argv al cargarse: se les pasa uno limpio (mismo truco que tools/cargar.mjs).
const ARGS = process.argv.slice(2);
process.argv = process.argv.slice(0, 2);
const { readKey, costOf } = await import('./categorizar-claude.mjs');
const { loadSite, parseNumber } = await import('./proponer-carga.mjs');
const { derivado } = await import('./rutas.mjs');
const { clubDeRuta } = await import('./carpetas-clubes.mjs');
const { grupoDe, GRUPOS } = await import('./grupos-pais.mjs');

const ROOT = resolve(import.meta.dirname, '..');
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const LISTA = flag('--lista');
const EJECUTAR = ARGS.includes('--ejecutar');
const MEDIR = ARGS.includes('--medir');
const MODELO = 'claude-opus-5-5';
const CHARS_PAGINA = 450; // de cada página con cifras, para localizar: título, encabezados y primeras filas (con 700 el ensayo daba US$ 5 para 31 documentos)
const MAX_PAGINAS = 8; // páginas completas que se mandan a extraer
if (!LISTA) { console.error('Uso: node tools/localizar-extraer.mjs --lista <archivo> [--ejecutar | --medir]'); process.exit(1); }

const docs = readFileSync(resolve(ROOT, LISTA), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const sitio = loadSite();

// Páginas del .md: { numero -> texto }. Las transcripciones marcan cada página con "--- pág. N ---".
function paginas(md) {
  const out = new Map(); const partes = md.split(/^--- pág\. (\d+) ---$/m);
  for (let i = 1; i < partes.length; i += 2) out.set(Number(partes[i]), partes[i + 1].trim());
  return out;
}
// Qué ejercicio es (año de la clave del sitio y fecha de cierre): el cierre que leyó tools/periodo.mjs del contenido.
function ejercicioDe(pdf) {
  const e = registro.find((x) => x.pdf === pdf); const cierre = e?.periodo?.cierre || null;
  return { md: e?.md || pdf.replace(/\.pdf$/, '.md'), cierre, year: cierre ? Number(cierre.slice(0, 4)) : null };
}

// ---------------------------------------------------------------- llamada a la API (mismo pedido que categorizar-claude.mjs, con tope de tiempo)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function llamar({ apiKey, system, user, schema, tarea, pdf }) {
  const body = { model: MODELO, max_tokens: 16000, system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }], output_config: { effort: 'low', format: { type: 'json_schema', schema } }, fallbacks: 'default' };
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'server-side-fallback-2026-07-01' };
  let ultimo = null; const t0 = Date.now();
  for (let intento = 0; intento < 4; intento++) {
    let res;
    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(300000) }); }
    catch (e) { ultimo = String(e); await sleep(3000 * (intento + 1)); continue; }
    if (res.ok) {
      const j = await res.json(); const costo = costOf(MODELO, j.usage);
      appendFileSync(resolve(ROOT, 'Admin', 'claude-api', 'resultados.jsonl'), JSON.stringify({ ts: new Date().toISOString(), tarea, pdf, model: j.model, promptTokenCount: j.usage?.input_tokens, cacheReadTokens: j.usage?.cache_read_input_tokens, candidatesTokenCount: j.usage?.output_tokens, costUsd: Number(costo.toFixed(6)), elapsedMs: Date.now() - t0, stopReason: j.stop_reason }) + '\n');
      if (j.stop_reason === 'refusal') return { error: `refusal: ${JSON.stringify(j.stop_details)}`, costo };
      const texto = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
      try { return { datos: JSON.parse(texto), costo }; } catch { return { error: `JSON inválido (stop=${j.stop_reason})`, costo }; }
    }
    ultimo = `HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`;
    if (res.status === 429 || res.status >= 500) { await sleep(5000 * (intento + 1)); continue; }
    return { error: ultimo, costo: 0 };
  }
  return { error: ultimo || 'reintentos agotados', costo: 0 };
}

// ---------------------------------------------------------------- 1. LOCALIZAR
const SCHEMA_LOCALIZAR = {
  type: 'object', additionalProperties: false,
  required: ['paginas_resultados', 'paginas_notas_ingresos', 'paginas_notas_gastos', 'escala', 'escala_evidencia', 'moneda', 'columna_ejercicio', 'perimetro', 'observaciones'],
  properties: {
    paginas_resultados: { type: 'array', items: { type: 'integer' } },
    paginas_notas_ingresos: { type: 'array', items: { type: 'integer' } },
    paginas_notas_gastos: { type: 'array', items: { type: 'integer' } },
    escala: { type: 'string', enum: ['unidades', 'miles', 'millones', 'no se sabe'] },
    escala_evidencia: { type: 'string' },
    moneda: { type: 'string' },
    columna_ejercicio: { type: 'string' },
    perimetro: { type: 'string', enum: ['individual', 'consolidado', 'ambos', 'no se sabe'] },
    observaciones: { type: 'string' },
  },
};
const SYSTEM_LOCALIZAR = `Sos analista de estados financieros de clubes de fútbol. Te paso el COMIENZO de cada página de la transcripción de un documento (balance, cuentas anuales, memoria), en cualquier idioma. Tenés que ubicar dónde están los números del estado de resultados de UN ejercicio.

Devolvé:
- paginas_resultados: las páginas con el estado de resultados (o de recursos y gastos, cuenta de pérdidas y ganancias, DRE, GuV, resultatregnskap...) del ejercicio pedido. Si está partido en dos páginas, las dos. Si hay consolidado e individual, las del perímetro que más detalle tenga y decilo en observaciones.
- paginas_notas_ingresos / paginas_notas_gastos: las páginas de las notas o anexos que DESGLOSAN renglones de ingresos o de gastos de ese estado (ej. "Nota 3 - Ingresos por actividades", "Anexo III - Gastos"). No incluyas balance, flujo de efectivo, evolución del patrimonio, cuadros de bienes de uso / activo fijo, conciliaciones de impuestos, presupuestos ni listas de deudas.
- escala: la unidad de los importes del estado de resultados (unidades, miles, millones), y en escala_evidencia la frase exacta que lo dice (ej. "en miles de pesos", "£'000", "T€"). Si ninguna página lo dice, "no se sabe".
- moneda: código ISO (ARS, BRL, EUR, GBP...).
- columna_ejercicio: el encabezado de la columna que corresponde al ejercicio pedido (ej. "2024", "30.06.2024", "Ejercicio actual").
- perimetro: individual, consolidado, ambos o no se sabe.
Solo con lo que ves en el texto. Si una página no muestra lo suficiente, no la incluyas.`;

// ---------------------------------------------------------------- 2. EXTRAER
const SCHEMA_EXTRAER = {
  type: 'object', additionalProperties: false,
  required: ['escala', 'filas', 'total_ingresos_impreso', 'total_gastos_impreso', 'resultado_impreso', 'observaciones'],
  properties: {
    escala: { type: 'string', enum: ['unidades', 'miles', 'millones'] },
    filas: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['pagina', 'etiqueta', 'importe_impreso', 'tipo', 'lado', 'detalla_a'],
        properties: {
          pagina: { type: 'integer' },
          etiqueta: { type: 'string' },
          importe_impreso: { type: 'string' },
          tipo: { type: 'string', enum: ['renglon', 'subtotal', 'total', 'resultado'] },
          lado: { type: 'string', enum: ['ingreso', 'gasto', 'financiero', 'impuesto', 'resultado', 'otro'] },
          detalla_a: { type: ['string', 'null'] },
        },
      },
    },
    total_ingresos_impreso: { type: ['string', 'null'] },
    total_gastos_impreso: { type: ['string', 'null'] },
    resultado_impreso: { type: ['string', 'null'] },
    observaciones: { type: 'string' },
  },
};
const SYSTEM_EXTRAER = `Sos analista de estados financieros de clubes de fútbol. Te paso páginas completas de la transcripción de un documento: el estado de resultados de un ejercicio y las notas o anexos que desglosan sus ingresos y gastos. Extraé TODAS las filas con importe de la columna del ejercicio pedido, en el orden en que aparecen.

Para cada fila:
- etiqueta: el texto del renglón TAL CUAL está impreso (sin traducir, sin corregir).
- importe_impreso: el importe de la columna del ejercicio TAL CUAL está impreso, con sus puntos, comas, paréntesis o signo menos (ej. "1.234.567", "(12,345)", "-3.743"). No conviertas ni redondees. Si la celda está vacía o con guion, no incluyas la fila.
- tipo: renglon (una partida), subtotal (suma de las de arriba dentro del estado), total (total de ingresos, total de gastos), resultado (resultado operativo, antes de impuestos, del ejercicio).
- lado: ingreso, gasto, financiero (intereses, diferencias de cambio, resultado financiero, RECPAM), impuesto (impuesto a las ganancias), resultado, otro.
- detalla_a: si la fila es de una NOTA o ANEXO que desglosa un renglón del estado, la etiqueta EXACTA de ese renglón del estado; si es una fila del estado mismo, null.
Además: escala (unidades, miles o millones) de la columna, y los importes impresos del total de ingresos, del total de gastos y del resultado del ejercicio si el documento los imprime (si no, null).
No inventes filas ni importes: si algo no se lee, dejalo afuera y decilo en observaciones.`;

// ---------------------------------------------------------------- 3. VERIFICAR (gratis)
const MULT = { unidades: 1e-6, miles: 1e-3, millones: 1 };
const digitos = (s) => String(s || '').replace(/[^\d]/g, '');
function verificar(ext, pags) {
  const filas = ext.filas || []; const mult = MULT[ext.escala] ?? 1e-6;
  // (a) literal: los dígitos del importe tienen que aparecer, seguidos, en el texto de la página (sin espacios ni separadores)
  const noLiterales = filas.filter((f) => { const d = digitos(f.importe_impreso); const t = digitos(pags.get(f.pagina) || ''); return d.length && !t.includes(d); });
  // (b) ingresos y gastos: renglones del estado, reemplazando cada renglón que una nota desglosa por las filas de esa nota.
  // ESCALA DE LA NOTA DEDUCIDA DEL CIERRE (arreglo tras la primera medición, 1. FC Köln 2023-24): el esquema pide UNA escala por documento,
  // pero la nota de "Umsatzerlöse" está en miles (155.315) y el estado en euros con céntimos (155.314.920,05); el modelo lo dijo en
  // `observaciones` y la suma salió mil veces chica (3,81 en vez de 158,97). Ahora las filas de la nota se escalan con el factor (1, 1.000 o
  // 1.000.000) que las hace sumar el renglón que desglosan (±0,5%); si ninguno cierra, queda el renglón del estado.
  const v = (f) => Math.abs(parseNumber(f.importe_impreso) ?? 0);
  const estado = filas.filter((f) => !f.detalla_a);
  let reemplazos = 0;
  const suma = (lado) => {
    let total = 0;
    for (const f of estado.filter((x) => x.lado === lado && x.tipo === 'renglon')) {
      const hijas = filas.filter((h) => h.detalla_a && h.detalla_a.trim() === f.etiqueta.trim() && h.tipo === 'renglon');
      const sh = hijas.reduce((a, h) => a + v(h), 0); const objetivo = v(f);
      const k = hijas.length >= 2 ? [1, 1000, 1e6, 1e-3].find((x) => Math.abs(sh * x - objetivo) <= 0.005 * objetivo) : undefined;
      if (k !== undefined) { total += sh * k * mult; reemplazos++; } else total += objetivo * mult;
    }
    return total;
  };
  const rev = suma('ingreso'); const exp = suma('gasto');
  // (c) contra los totales que el propio documento imprime
  const imp = (s) => (s ? Math.abs(parseNumber(s) ?? NaN) * mult : null);
  const cierra = (x, t) => (t == null || !isFinite(t) ? null : Math.abs(x - t) <= Math.max(0.01, 0.005 * t));
  return { rev, exp, reemplazos, noLiterales: noLiterales.length, filas: filas.length, ejemplosNoLiterales: noLiterales.slice(0, 3).map((f) => `p${f.pagina} "${f.etiqueta.slice(0, 40)}" ${f.importe_impreso}`), cierraIngresos: cierra(rev, imp(ext.total_ingresos_impreso)), cierraGastos: cierra(exp, imp(ext.total_gastos_impreso)) };
}

// ---------------------------------------------------------------- correr
const estimTok = (s) => Math.ceil(s.length / 3.5);
let apiKey = null; let costoTotal = 0; let tokEstim = 0;
const medidos = [];
for (const pdf of docs) {
  const { md, cierre, year } = ejercicioDe(pdf);
  if (!existsSync(resolve(ROOT, md))) { console.log(`  (sin .md) ${pdf}`); continue; }
  const pags = paginas(readFileSync(resolve(ROOT, md), 'utf8'));
  const clubId = clubDeRuta(pdf).clubId; const club = sitio.clubs?.[clubId];
  const pedido = `Club: ${club?.name || clubId || '?'}. Ejercicio pedido: el que cierra el ${cierre || '?'} (año ${year || '?'}).`;
  const pLoc = derivado(md, '.localizar.json'); const pExt = derivado(md, '.extraccion.json');
  // Solo páginas con cifras (al menos 4 importes de 3 dígitos o más): la prosa no puede ser el estado de resultados, y en las memorias de
  // 100-200 páginas era casi todo el costo (el primer ensayo con todas las páginas daba US$ 5,3 para 31 documentos).
  const conCifras = [...pags].filter(([, t]) => (t.match(/\d[\d.,' ]{2,}\d/g) || []).length >= 4);
  const userLoc = `${pedido}\n\n${conCifras.map(([n, t]) => `--- pág. ${n} ---\n${t.slice(0, CHARS_PAGINA)}`).join('\n\n')}`;
  if (!EJECUTAR && !MEDIR) { tokEstim += estimTok(SYSTEM_LOCALIZAR + userLoc) + 600 + estimTok(SYSTEM_EXTRAER) + 6 * 1500 + 3000; continue; }
  if (EJECUTAR) {
    apiKey ||= readKey();
    let loc = existsSync(resolve(ROOT, pLoc)) ? JSON.parse(readFileSync(resolve(ROOT, pLoc), 'utf8')) : null;
    if (!loc) {
      const r = await llamar({ apiKey, system: SYSTEM_LOCALIZAR, user: userLoc, schema: SCHEMA_LOCALIZAR, tarea: 'localizar', pdf }); costoTotal += r.costo || 0;
      if (r.error) { console.log(`  ERROR localizar ${pdf}: ${r.error}`); continue; }
      loc = { pdf, md, cierre, modelo: MODELO, generado: new Date().toISOString(), ...r.datos }; writeFileSync(resolve(ROOT, pLoc), JSON.stringify(loc, null, 1));
    }
    if (!existsSync(resolve(ROOT, pExt))) {
      const elegidas = [...new Set([...loc.paginas_resultados, ...loc.paginas_notas_ingresos, ...loc.paginas_notas_gastos])].filter((n) => pags.has(n)).sort((a, b) => a - b).slice(0, MAX_PAGINAS);
      if (!elegidas.length) { console.log(`  localizar no encontró páginas: ${pdf} (${loc.observaciones?.slice(0, 120)})`); continue; }
      const userExt = `${pedido} Columna del ejercicio: "${loc.columna_ejercicio}". Escala según el documento: ${loc.escala} (${loc.escala_evidencia}).\n\n${elegidas.map((n) => `--- pág. ${n} ---\n${pags.get(n)}`).join('\n\n')}`;
      const r = await llamar({ apiKey, system: SYSTEM_EXTRAER, user: userExt, schema: SCHEMA_EXTRAER, tarea: 'extraer', pdf }); costoTotal += r.costo || 0;
      if (r.error) { console.log(`  ERROR extraer ${pdf}: ${r.error}`); continue; }
      writeFileSync(resolve(ROOT, pExt), JSON.stringify({ pdf, md, cierre, paginas: elegidas, modelo: MODELO, generado: new Date().toISOString(), ...r.datos }, null, 1));
    }
    console.log(`  ok ${pdf.split('/').slice(1).join('/')}  (gastado hasta ahora US$ ${costoTotal.toFixed(2)})`);
  }
  if (MEDIR && existsSync(resolve(ROOT, pExt))) {
    const ext = JSON.parse(readFileSync(resolve(ROOT, pExt), 'utf8')); const v = verificar(ext, pags);
    const cd = sitio.generic[clubId]; const prod = cd && year ? { rev: (cd.revenueLinesByYear?.[year] || []).reduce((a, l) => a + l.amountNative, 0), exp: (cd.expenseLinesByYear?.[year] || []).reduce((a, l) => a + Math.abs(l.amountNative), 0) } : null;
    medidos.push({ pdf, grupo: grupoDe(pdf), year, prod, ...v });
  }
}
if (!EJECUTAR && !MEDIR) {
  const usd = (tokEstim * 4 + docs.length * 4000 * 20) / 1e6;
  console.log(`ENSAYO (sin API): ${docs.length} documentos, ~${Math.round(tokEstim / 1000)} mil tokens de entrada; costo estimado ~US$ ${usd.toFixed(2)} con ${MODELO} (esfuerzo bajo). Agregá --ejecutar para correrlo.`);
}
if (EJECUTAR) console.log(`\nGasto de esta corrida: US$ ${costoTotal.toFixed(2)}. Después: node tools/localizar-extraer.mjs --lista ${LISTA} --medir`);
if (MEDIR) {
  const cerca = (a, b) => b && Math.abs(a - Math.abs(b)) <= 0.02 * Math.abs(b);
  console.log('grupo   años | ingresos ±2% de producción | gastos ±2% | importes que NO están literales en su página (de cuántos)');
  for (const g of [...GRUPOS.map((x) => x.id), 'TOTAL']) {
    const X = g === 'TOTAL' ? medidos : medidos.filter((x) => x.grupo === g); if (!X.length) continue;
    console.log(`${g.padEnd(13)} ${String(X.length).padStart(3)} | ${String(X.filter((x) => x.prod && cerca(x.rev, x.prod.rev)).length).padStart(5)} | ${String(X.filter((x) => x.prod && cerca(x.exp, x.prod.exp)).length).padStart(5)} | ${X.reduce((a, x) => a + x.noLiterales, 0)} de ${X.reduce((a, x) => a + x.filas, 0)}`);
  }
  console.log('\nPor documento (ingresos / gastos: extraído contra producción):');
  for (const x of medidos) console.log(`  ${(cerca(x.rev, x.prod?.rev) ? 'OK ' : '-- ')}${x.pdf.split('/').slice(1).join('/').slice(0, 62).padEnd(62)} ${x.rev.toFixed(2)} / ${x.prod?.rev?.toFixed(2)}   ${x.exp.toFixed(2)} / ${x.prod?.exp?.toFixed(2)}${x.noLiterales ? `   no literales ${x.noLiterales}: ${x.ejemplosNoLiterales[0]}` : ''}`);
}
