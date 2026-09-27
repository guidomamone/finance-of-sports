#!/usr/bin/env node
// ============================================================================
// tools/fetch-fx-reference.mjs — baja UNA VEZ la serie histórica completa de un
// tipo de cambio y la guarda local, para que `tools/lookup-fx-close.js` pueda
// resolver la cotización de cualquier fecha sin salir a buscar en la web (to-do
// 91, 2026-09-27).
//
// EL PROBLEMA QUE RESUELVE: cada club nuevo que no declara su propio `fx` en el
// documento dispara una búsqueda web puntual de la cotización de SU fecha de
// cierre (`club-data-mapping/SKILL.md` sección 5) — pasó de nuevo onboardeando
// Almagro, 6 búsquedas para 6 cierres de 31/10 que la serie histórica completa
// ya tiene todas juntas en un solo lugar.
//
// MONEDAS SOPORTADAS HOY (las 3 con más clubes ya cargados en el sitio —
// agregar otra es sumarle una entrada a CURRENCIES con su propia fuente, no
// hay una API única que sirva para todos los países):
//   - ARS: API pública del BCRA (Comunicación A 3500 / "dólar mayorista").
//   - BRL: API pública del BCB, PTAX de cierre (venda).
//   - COP: API pública de datos.gov.co (dataset de la TRM, Banco de la
//     República / Superintendencia Financiera).
// Las 3 verificadas 2026-09-27 dígito por dígito contra los valores YA
// cargados a mano en FX_CLOSE (data/currency-map.js) para Almagro (ARS),
// y para BRL/COP contra las entradas ya existentes de otros clubes — coincide
// exacto en todos los casos probados.
//
// ARQUITECTURA (ver to-do 91, Admin/TODO.md): esta serie completa NUNCA va a
// `data/currency-map.js` — ese archivo es eager, se baja en cada pageview del
// sitio, y `FX_CLOSE` tiene que seguir siendo la lista CURADA y chica de
// cotizaciones que algún club realmente usa. La serie completa vive acá, en
// `tools/fx-reference/`, fuera de lo que el sitio sirve — es insumo de
// onboarding, no dato de producción. Un archivo de este directorio nunca se
// referencia desde `data/` ni desde ningún `<script src>` del sitio.
//
// USO:
//   node tools/fetch-fx-reference.mjs                  baja/actualiza las 3
//   node tools/fetch-fx-reference.mjs --currency ARS   solo una
//   node tools/fetch-fx-reference.mjs --currency COP --from 2015-01-01
//
// No necesita ninguna API key (los 3 endpoints son públicos). Volver a
// correrlo pisa el archivo con la serie más actualizada.
// ============================================================================

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outDir = resolve(projectRoot, 'tools', 'fx-reference');

// --- ARS: BCRA, Comunicación A 3500 -----------------------------------------
async function fetchARS(from, to) {
  const series = {};
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const url = `https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD` +
      `?fechadesde=${from}&fechahasta=${to}&offset=${offset}&limit=${limit}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`BCRA API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const json = await resp.json();
    for (const row of json.results ?? []) {
      const det = (row.detalle ?? []).find((d) => d.codigoMoneda === 'USD');
      if (det) series[row.fecha] = det.tipoCotizacion;
    }
    const total = json.metadata?.resultset?.count ?? 0;
    offset += limit;
    process.stdout.write(`  ${Math.min(offset, total)}/${total}\r`);
    if (offset >= total) break;
  }
  console.log('');
  return series;
}

// --- BRL: BCB, PTAX de cierre (venda) ---------------------------------------
async function fetchBRL(from, to) {
  const series = {};
  const [fy, fm, fd] = from.split('-');
  const [ty, tm, td] = to.split('-');
  const dataInicial = `${fm}-${fd}-${fy}`;
  const dataFinal = `${tm}-${td}-${ty}`;
  let skip = 0;
  const top = 1000;
  for (;;) {
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)` +
      `?@dataInicial='${dataInicial}'&@dataFinalCotacao='${dataFinal}'&$format=json&$top=${top}&$skip=${skip}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`BCB API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const json = await resp.json();
    const rows = json.value ?? [];
    for (const row of rows) {
      const date = row.dataHoraCotacao.slice(0, 10);
      series[date] = row.cotacaoVenda;
    }
    process.stdout.write(`  +${rows.length} (skip=${skip})\r`);
    if (rows.length < top) break;
    skip += top;
  }
  console.log('');
  return series;
}

// --- COP: datos.gov.co, dataset de la TRM -----------------------------------
async function fetchCOP(from, to) {
  const series = {};
  const where = encodeURIComponent(`vigenciadesde between '${from}T00:00:00.000' and '${to}T00:00:00.000'`);
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const url = `https://www.datos.gov.co/resource/32sa-8pi3.json?$where=${where}&$order=vigenciadesde&$limit=${limit}&$offset=${offset}`;
    const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!resp.ok) throw new Error(`datos.gov.co API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const rows = await resp.json();
    for (const row of rows) {
      // vigenciadesde/vigenciahasta pueden abarcar varios días (fines de
      // semana/feriados): expandir a cada fecha del rango, así el lookup no
      // necesita reimplementar esta lógica de rango.
      let d = new Date(row.vigenciadesde.slice(0, 10) + 'T00:00:00Z');
      const end = new Date(row.vigenciahasta.slice(0, 10) + 'T00:00:00Z');
      while (d <= end) {
        series[d.toISOString().slice(0, 10)] = parseFloat(row.valor);
        d.setUTCDate(d.getUTCDate() + 1);
      }
    }
    process.stdout.write(`  +${rows.length} (offset=${offset})\r`);
    if (rows.length < limit) break;
    offset += limit;
  }
  console.log('');
  return series;
}

const CURRENCIES = {
  ARS: { file: 'ars-usd.json', label: 'ARS por 1 USD (BCRA, Comunicación A 3500 / dólar mayorista)', fetch: fetchARS, defaultFrom: '2003-01-01',
    source: 'BCRA API pública, api.bcra.gob.ar/estadisticascambiarias' },
  BRL: { file: 'brl-usd.json', label: 'BRL por 1 USD (Banco Central do Brasil, PTAX de cierre — venda)', fetch: fetchBRL, defaultFrom: '2010-01-01',
    source: 'BCB API pública (Olinda), olinda.bcb.gov.br/olinda/servico/PTAX' },
  COP: { file: 'cop-usd.json', label: 'COP por 1 USD (TRM oficial, Banco de la República / Superfinanciera de Colombia)', fetch: fetchCOP, defaultFrom: '2010-01-01',
    source: 'datos.gov.co, dataset 32sa-8pi3 (TRM)' },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, def) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : def;
  };
  const curFlag = get('--currency', null);
  return {
    currencies: curFlag ? [curFlag] : Object.keys(CURRENCIES),
    from: get('--from', null),
    to: get('--to', new Date().toISOString().slice(0, 10)),
  };
}

async function runOne(code, from, to) {
  const cfg = CURRENCIES[code];
  if (!cfg) {
    console.error(`Moneda '${code}' no configurada en CURRENCIES. Hoy solo: ${Object.keys(CURRENCIES).join(', ')}`);
    return;
  }
  const effectiveFrom = from ?? cfg.defaultFrom;
  console.log(`Bajando serie ${cfg.label} de ${effectiveFrom} a ${to}...`);
  const series = await cfg.fetch(effectiveFrom, to);
  const dates = Object.keys(series).sort();
  if (!dates.length) {
    console.error(`  ${code}: la API no devolvió ningún dato -- no piso el archivo existente.`);
    return;
  }
  mkdirSync(outDir, { recursive: true });
  const out = {
    label: cfg.label,
    source: cfg.source,
    fetchedAt: new Date().toISOString(),
    rangeFrom: dates[0],
    rangeTo: dates[dates.length - 1],
    count: dates.length,
    series,
  };
  const outPath = resolve(outDir, cfg.file);
  writeFileSync(outPath, JSON.stringify(out, null, 1), 'utf8');
  console.log(`  Listo: ${dates.length} cotizaciones (${dates[0]} a ${dates[dates.length - 1]}) -> ${outPath.replace(projectRoot + '/', '')}`);
}

async function main() {
  const { currencies, from, to } = parseArgs();
  for (const code of currencies) await runOne(code, from, to);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
