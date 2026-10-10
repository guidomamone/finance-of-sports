#!/usr/bin/env node
// ============================================================================
// tools/bfo-rusia.mjs — RUSIA DESDE LOS DATOS OFICIALES DEL FISCO (GIR BO, bo.nalog.gov.ru): de cada `bfo-AAAA-datos.json` al año cargado.
//
// POR QUÉ (Versión 645, pedido y ok de Guido el 2026-10-09: "si rusia es muy distinto pero tiene info de revenue y costs, avisame y planeamos algo
// aunque no sea parecido al script de siempre"). En Clubes/Rusia/<Club>/ no hay un PDF de estados contables por año: hay informes del auditor
// (muchos de 3 páginas, solo la opinión) y notas explicativas. Lo que sí está, para los 16 clubes y 2021-2025, es el JSON que publica el
// Servicio Federal de Impuestos (GIR BO) con el FORMULARIO 2 ruso (Отчет о финансовых результатах): renglones de código fijo, iguales para
// todos los clubes y años, en miles de rublos. Medido antes de escribir esto: en los 79 años, los renglones suman exacto el 2300 impreso
// (resultado antes de impuestos). Es un dato oficial y estructurado: sin OCR ni IA, y la compuerta de la suma la trae el propio formulario.
//
// LA ESCALERA DE CADA AÑO:
//   escalón 1 (este script, gratis y determinista): el formulario 2 con un mapa FIJO de código a categoría (abajo, MAPA). Los ingresos (2110)
//     no vienen abiertos: van a "fútbol sin desglosar" con "posiblemente incluido en" TV, entradas, socios y sponsors (decisión de Guido).
//     Compuerta: la suma de los renglones da el 2300 impreso y, con el impuesto, el 2400. Si no cierra, el año NO se carga.
//   escalón 2 (pendiente, con IA barata): donde las notas explicativas (poyasneniya) abren los ingresos o los "otros ingresos" (2340: suele
//     ser el aporte del dueño o la venta de jugadores), reemplazar el renglón por su desglose con la misma compuerta. Los PDFs ya están
//     transcriptos (lote 60). Decisión de Guido: si hay información útil fuera del JSON, se usa.
//
// QUÉ ESCRIBE. Por cada JSON, una TRANSCRIPCIÓN `bfo-AAAA-datos.md` al lado (generada, fiel al JSON: es el documento fuente legible y lo
// que lee `analizar()` de alta-club.mjs para el nombre, el cierre, la moneda, el tipo de cambio y la liga). Después, con --escribir:
//   - club nuevo: `alta-club.mjs --escribir` con el año más viejo y el color de `Admin/altas-revision.jsonl` (sin color, no hay alta);
//   - cada año: la propuesta P con el mismo formato que arma cargar.mjs, escrita con `escribir(P)` de cargar.mjs (que corre los
//     generadores y la auditoría y revierte si da P0/P1), y un commit por año (el alta en el del primer año). Sin push.
//
// USO:
//   node tools/bfo-rusia.mjs                               # ENSAYO: todos los clubes de Clubes/Rusia (qué cargaría, sumas, sin escribir)
//   node tools/bfo-rusia.mjs --club Krasnodar              # uno
//   node tools/bfo-rusia.mjs --club Krasnodar --escribir   # de verdad
// ============================================================================
import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
const SOLO = flag('--club');
const HOY = new Date().toISOString().slice(0, 10);
const DIR = resolve(ROOT, 'Clubes', 'Rusia');

// El formulario 2 ruso. lado: ingreso / gasto / financiero (+ o -) / total. cat: la categoría del sitio (data/category-map.js).
const MAPA = [
  { cod: 2110, ru: 'Выручка', es: 'Ingresos (выручка)', lado: 'ingreso', cat: 'lump_football_operations' },
  { cod: 2120, ru: 'Себестоимость продаж', es: 'Costo de ventas', lado: 'gasto', cat: 'lump_football_operations_expense' },
  { cod: 2100, ru: 'Валовая прибыль (убыток)', lado: 'total' },
  { cod: 2210, ru: 'Коммерческие расходы', es: 'Gastos comerciales', lado: 'gasto', cat: 'admin_general_expense' },
  { cod: 2220, ru: 'Управленческие расходы', es: 'Gastos de administración', lado: 'gasto', cat: 'admin_general_expense' },
  { cod: 2200, ru: 'Прибыль (убыток) от продаж', lado: 'total' },
  { cod: 2310, ru: 'Доходы от участия в других организациях', es: 'Ingresos por participaciones', lado: 'fin+' },
  { cod: 2320, ru: 'Проценты к получению', es: 'Intereses cobrados', lado: 'fin+' },
  { cod: 2330, ru: 'Проценты к уплате', es: 'Intereses pagados', lado: 'fin-' },
  { cod: 2340, ru: 'Прочие доходы', es: 'Otros ingresos', lado: 'ingreso', cat: 'other_income' },
  { cod: 2350, ru: 'Прочие расходы', es: 'Otros gastos', lado: 'gasto', cat: 'other_expenses' },
  { cod: 2300, ru: 'Прибыль (убыток) до налогообложения', lado: 'total' },
  { cod: 2410, ru: 'Налог на прибыль', lado: 'info' },
  { cod: 2400, ru: 'Чистая прибыль (убыток)', lado: 'total' },
];
const INCLUIDO = { broadcasting: 'lump_football_operations', matchday_competition: 'lump_football_operations', member_dues: 'lump_football_operations', sponsorship_commercial: 'lump_football_operations', wages_squad: 'lump_football_operations_expense' };

const r6 = (x) => Math.round(x * 1e6) / 1e6;
const fmt = (v) => (v == null ? '—' : Number(v).toLocaleString('es-AR', { maximumFractionDigits: 0 }));
const leerJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const run = (cmd, args) => spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
const git = (...a) => run('git', a);

// Un año del JSON: valores del formulario 2 (miles de RUB, current) y la cuenta.
function leerAnio(jsonPath) {
  const j = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const f = j.financialResult || {};
  const v = (c) => (f[`current${c}`] == null ? null : Number(f[`current${c}`]));
  const p = (c) => (f[`previous${c}`] == null ? null : Number(f[`previous${c}`]));
  const abs = (c) => Math.abs(v(c) || 0);
  // Los JSON viejos traen los gastos en positivo y los nuevos en negativo: se usan magnitudes por lado (medido: así cierran los 79 años).
  const ing = abs(2110) + abs(2340); const gas = abs(2120) + abs(2210) + abs(2220) + abs(2350);
  const fin = abs(2310) + abs(2320) - abs(2330);
  const pre = ing - gas + fin;
  return { j, v, p, ing, gas, fin, pre, pre2300: v(2300), neto: v(2400), cierra: v(2300) != null && Math.abs(pre - v(2300)) <= 2 };
}

// La transcripción legible del JSON (el "documento" que lee analizar() y que queda como fuente).
function transcribir(jsonPath, mdPath, anio) {
  const A = leerAnio(jsonPath); const o = A.j.bfoOrganizationInfo || {};
  const L = [];
  L.push(`<!-- TRANSCRIPCIÓN GENERADA por tools/bfo-rusia.mjs (${HOY}) desde ${jsonPath.split('/').pop()}: datos de la Государственный информационный ресурс бухгалтерской (финансовой) отчетности (ГИР БО, bo.nalog.gov.ru). Fiel al JSON; no es OCR. -->`, '');
  L.push(`# ${o.fullName || '?'}`, '', `ИНН ${o.inn || '?'} · ОКВЭД ${o.okved2?.id || '?'} (${o.okved2?.name || ''}) · ${o.okopf?.name || ''}`, '');
  L.push(`Бухгалтерская (финансовая) отчетность за ${anio} год (отчетный период: 12 месяцев, с 1 января по 31 декабря ${anio} г.). Дата представления: ${String(A.j.datePresent || '').slice(0, 10)}. Единица измерения: тыс. руб.`, '');
  L.push(`## Отчет о финансовых результатах за ${anio} год (форма 0710002)`, '', `| Код | Показатель | За ${anio} г. | За ${anio - 1} г. |`, '| --- | --- | ---: | ---: |');
  for (const m of MAPA) L.push(`| ${m.cod} | ${m.ru} | ${fmt(A.v(m.cod))} | ${fmt(A.p(m.cod))} |`);
  const b = A.j.balance || {}; const bv = (c, k = 'current') => (b[`${k}${c}`] == null ? null : Number(b[`${k}${c}`]));
  L.push('', `## Бухгалтерский баланс на 31 декабря ${anio} г. (форма 0710001, итоги)`, '', `| Код | Показатель | На 31.12.${anio} | На 31.12.${anio - 1} |`, '| --- | --- | ---: | ---: |');
  for (const [c, t] of [[1100, 'Итого внеоборотных активов'], [1250, 'Денежные средства и денежные эквиваленты'], [1200, 'Итого оборотных активов'], [1600, 'БАЛАНС (актив)'], [1300, 'Итого капитал и резервы'], [1410, 'Заемные средства (долгосрочные)'], [1400, 'Итого долгосрочных обязательств'], [1510, 'Заемные средства (краткосрочные)'], [1500, 'Итого краткосрочных обязательств'], [1700, 'БАЛАНС (пассив)']]) L.push(`| ${c} | ${t} | ${fmt(bv(c))} | ${fmt(bv(c, 'previous'))} |`);
  L.push('', `Аудитор: ${A.j.auditReport?.name || '—'}. Обязательный аудит: ${A.j.requiredAudit ? 'да' : 'нет'}.`, '');
  writeFileSync(mdPath, L.join('\n'));
  return A;
}

// La propuesta P con el formato de cargar.mjs (ver P.ejercicio en tools/cargar.mjs).
function proponer({ carpeta, anio, A, clubId, club, alta }) {
  const campo = (k) => (alta.ejercicio?.campos || []).find((c) => c.campo === k) || {};
  const fxRef = campo('fxRef'); const liga = campo('liga'); const sourceId = campo('sourceId').valor;
  const M = (c) => r6(Math.abs(A.v(c) || 0) / 1000);
  const rev = MAPA.filter((m) => m.lado === 'ingreso' && A.v(m.cod)).map((m) => ({ rawLabel: `${m.ru} (${m.cod})`, normalizedCategory: m.cat, amountNative: M(m.cod), disclosureLevel: 'aggregated' }));
  const exp = MAPA.filter((m) => m.lado === 'gasto' && A.v(m.cod)).map((m) => ({ rawLabel: `${m.ru} (${m.cod})`, normalizedCategory: m.cat, amountNative: -M(m.cod), disclosureLevel: 'aggregated' }));
  const netInterest = r6(A.fin / 1000); const pat = r6(A.neto / 1000); const tax = r6(pat - A.pre / 1000);
  const extraRows = MAPA.filter((m) => /^fin/.test(m.lado) && A.v(m.cod)).map((m) => ({ label: `${m.ru} (${m.cod})`, value: (m.lado === 'fin-' ? -1 : 1) * M(m.cod) }));
  if (Math.abs(tax) > 1e-6) extraRows.push({ label: `Налог на прибыль и прочее (2300 − 2400)`, value: tax });
  const incluidoEn = Object.fromEntries(Object.entries(INCLUIDO).map(([k, en]) => [k, { en, posible: true }]));
  const sinDesglose = [...rev, ...exp].filter((l) => /^lump_football_operations/.test(l.normalizedCategory)).map((l) => ({ renglon: l.rawLabel, lado: l.amountNative < 0 ? 'gasto' : 'ingreso', importe: Math.abs(l.amountNative), motivo: 'el formulario 2 ruso no abre este renglón (bfo-rusia.mjs, escalón 1)' }));
  const md = `${carpeta}/bfo-${anio}-datos.md`;
  return {
    pdf: `${carpeta}/bfo-${anio}-datos.json`, md, reemplaza: false, ajustes: [],
    fxCloseNuevo: fxRef.fxClose ? { key: fxRef.valor, ...fxRef.fxClose } : null,
    liga: { valor: liga.valor ?? null, fuente: liga.fuente || 'sin caché de la liga', estado: liga.estado || 'pendiente' },
    ejercicio: {
      clubId, year: anio, cierre: `${anio}-12-31`, perimetro: 'individual', revenueLines: rev, expenseLines: exp,
      fiscalYearMeta: { currency: 'RUB', ...(fxRef.valor ? { fxRef: fxRef.valor } : {}), sourceId, reportType: 'official_balance_sheet', gestionId: null, profitOnPlayerSales: 0, assetSales: 0, netInterest, tax, extraRows, incluidoEn, sinDesglose, grossDebt: null, cash: null, officialTotalRevenue: null, officialTotalExpenses: null, officialPAT: pat },
      source: { id: sourceId, clubId, title: `${club.name || club.displayName} — отчетность ${anio} в ГИР БО (bo.nalog.gov.ru), ejercicio ${anio}`, type: 'official_balance_sheet', reliability: 'primary', note: `Cargado por tools/bfo-rusia.mjs (${HOY}) desde ${carpeta}/bfo-${anio}-datos.json: datos oficiales del Servicio Federal de Impuestos (GIR BO), formulario 2 en miles de rublos; la suma de los renglones da el 2300 impreso. Transcripción legible: ${md}.` },
    },
  };
}

// ---------------------------------------------------------------------------
const carpetas = readdirSync(DIR, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_') && (!SOLO || d.name === SOLO)).map((d) => d.name).sort();
const { analizar } = await import('./alta-club.mjs');
const { cargarSitio, escribir } = await import('./cargar.mjs');
let sitio = cargarSitio();
const altas = new Map(leerJsonl(resolve(ROOT, 'Admin', 'altas-club.jsonl')).map((o) => [o.carpeta, o]));
const revision = new Map(leerJsonl(resolve(ROOT, 'Admin', 'altas-revision.jsonl')).map((o) => [o.clubId, o]));

if (ESCRIBIR) {
  const sucio = String(git('status', '--porcelain', '--', 'data', 'index.html', 'fuentes').stdout || '').trim();
  if (sucio) { console.error(`No escribo: hay cambios sin commitear en data/, index.html o fuentes/:\n${sucio.split('\n').slice(0, 8).join('\n')}`); process.exit(1); }
}
console.log(`\n=== bfo-rusia (${ESCRIBIR ? 'DE VERDAD' : 'ENSAYO'}): ${carpetas.length} club(es) ===`);
let commits = 0;
for (const nombre of carpetas) {
  const carpeta = `Clubes/Rusia/${nombre}`;
  const anios = readdirSync(resolve(ROOT, carpeta)).map((f) => (f.match(/^bfo-(\d{4})-datos\.json$/) || [])[1]).filter(Boolean).map(Number).sort();
  if (!anios.length) { console.log(`  ${nombre}: sin bfo-*-datos.json`); continue; }
  const filas = anios.map((y) => ({ y, A: transcribir(resolve(ROOT, carpeta, `bfo-${y}-datos.json`), resolve(ROOT, carpeta, `bfo-${y}-datos.md`), y) }));
  const reg = altas.get(`${carpeta}/`);
  let clubId = Object.entries(sitio.clubs).find(([, c]) => c && reg && c.id === reg.clubId)?.[0] || null;
  const esNuevo = !clubId;
  if (esNuevo) clubId = reg?.clubId || null;
  const rev = revision.get(clubId);
  const color = rev && Object.prototype.hasOwnProperty.call(rev, 'brandColor') ? rev.brandColor : undefined;
  const okColor = color === null || /^#[0-9A-F]{6}$/i.test(String(color));
  const yaEnSitio = (y) => !!sitio.generic?.[clubId]?.fiscalYearMeta?.[y];
  const linea = filas.map(({ y, A }) => `${y}${A.cierra ? '' : ' (NO CIERRA)'}${yaEnSitio(y) ? ' (ya está)' : ''}: ingresos ${fmt(A.v(2110))} + otros ${fmt(Math.abs(A.v(2340) || 0))}; neto ${fmt(A.neto)}`).join(' | ');
  // Las preguntas del alta se miran sobre la transcripción del JSON (no sobre el registro, que analiza el documento "base" de la carpeta: en
  // Krylia y Rubin es una nota explicativa con varios tipos de cambio declarados, una duda que no existe en el JSON).
  const preguntasAlta = esNuevo && clubId ? (() => { try { const a = analizar(`${carpeta}/bfo-${anios[anios.length - 1]}-datos.md`, sitio, {}); return [...(a.campos || []), ...(a.ejercicio?.campos || [])].filter((c) => c.estado === 'pregunta').map((c) => c.campo); } catch (e) { return [`analizar falló: ${e.message.slice(0, 80)}`]; } })() : [];
  const freno = !clubId ? 'sin clubId en el registro de altas (node tools/alta-club.mjs --todos)' : preguntasAlta.length ? `alta: preguntas sin resolver (${preguntasAlta.join(', ')})` : esNuevo && !okColor ? `alta: sin color elegido en Admin/altas-revision.jsonl (${JSON.stringify(color)})` : null;
  console.log(`  ${nombre} → ${clubId || '?'}${esNuevo ? ` [alta, color ${okColor ? (color === null ? 'null' : color) : '—'}]` : ''}${freno ? `  FRENA: ${freno}` : ''}\n      ${linea}`);
  if (!ESCRIBIR || freno) continue;

  // Alta (club nuevo) con el año más viejo que cierra.
  const aCargar = filas.filter(({ y, A }) => A.cierra && !yaEnSitio(y));
  if (!aCargar.length) continue;
  let altaHecha = false;
  if (esNuevo) {
    const r = run('node', [resolve(ROOT, 'tools/alta-club.mjs'), `${carpeta}/bfo-${aCargar[0].y}-datos.md`, '--escribir']);
    if (!existsSync(resolve(ROOT, 'data', `${clubId}-data.js`))) { console.log(`      alta NO escrita: ${String(r.stdout + r.stderr).trim().split('\n').pop().slice(0, 200)}`); continue; }
    const p = resolve(ROOT, 'data', 'clubs.js'); const L = readFileSync(p, 'utf8').split('\n');
    const k = L.findIndex((l) => l.startsWith(`  '${clubId}': {`));
    if (k < 0 || L[k].includes('brandColor')) { console.log('      no pude poner el color: revierto'); git('checkout', '-q', '--', 'data', 'index.html', 'fuentes.html', 'sitemap.xml'); git('checkout', '-q', '--', 'fuentes'); try { unlinkSync(resolve(ROOT, 'data', `${clubId}-data.js`)); } catch { /* */ } continue; }
    L[k] = `${L[k].trimEnd().slice(0, -3)}, brandColor:${color === null ? 'null' : `'${color}'`} },`;
    for (const n of [k - 2, k - 1]) if (n >= 0) L[n] = L[n].replace('brandColor AUSENTE a propósito', color === null ? 'brandColor:null a propósito' : `brandColor ${color}`).replace('// (nadie lo chequeó todavía: club-or-year-onboarding/club-nuevo.md, identidad primero).', `// (procedencia en fuentes/Rusia/${nombre}.md; tools/bfo-rusia.mjs).`);
    writeFileSync(p, L.join('\n')); altaHecha = true; sitio = cargarSitio();
  }
  let escritos = 0;
  for (const { y, A } of aCargar) {
    const alta = analizar(`${carpeta}/bfo-${y}-datos.md`, sitio, {});
    const club = sitio.clubs[clubId] || {};
    const P = proponer({ carpeta, anio: y, A, clubId, club, alta });
    if (!P.ejercicio.fiscalYearMeta.sourceId || (!P.ejercicio.fiscalYearMeta.fxRef)) { console.log(`      ${y}: sin sourceId o sin tipo de cambio (${JSON.stringify(alta.ejercicio?.campos?.find((c) => c.campo === 'fxRef') || {}).slice(0, 160)})`); continue; }
    const res = escribir(P);
    if (!res.ok) { console.log(`      ${y}: NO escrito: ${res.motivo.slice(0, 200)}`); continue; }
    git('add', '-A', '--', 'data', 'index.html', 'fuentes', 'fuentes.html', 'sitemap.xml', 'Admin/ESTADO-clubes.md', 'Admin/COMO-CORRE-EL-PROYECTO.html', 'Admin/altas-club.jsonl', `${carpeta}/bfo-${y}-datos.md`);
    const c = git('commit', '-q', '-m', `${nombre} ${y} desde el GIR BO (tools/bfo-rusia.mjs)${altaHecha && !escritos ? ` — alta de ${clubId}, color ${color === null ? 'null' : color}` : ''}`);
    if (c.status === 0) { escritos++; commits++; sitio = cargarSitio(); console.log(`      ${y}: escrito y commiteado (${String(git('log', '--oneline', '-1').stdout).slice(0, 9)}) — ${res.audit}`); }
    else console.log(`      ${y}: escrito pero el commit falló: ${String(c.stderr).slice(0, 160)}`);
  }
  if (altaHecha && !escritos) { git('checkout', '-q', '--', 'data', 'index.html', 'fuentes.html', 'sitemap.xml'); git('checkout', '-q', '--', 'fuentes'); try { unlinkSync(resolve(ROOT, 'data', `${clubId}-data.js`)); } catch { /* */ } console.log(`      ningún año se escribió: alta de ${clubId} revertida`); }
}
console.log(ESCRIBIR ? `\nEscritos y commiteados: ${commits} año(s). Sin push.` : '\nENSAYO: no se escribió nada en el sitio (sí las transcripciones bfo-AAAA-datos.md). Agregá --escribir.');
