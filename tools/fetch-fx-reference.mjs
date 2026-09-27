#!/usr/bin/env node
// ============================================================================
// tools/fetch-fx-reference.mjs — baja UNA VEZ la serie histórica completa de un
// tipo de cambio y la guarda local, para que `tools/lookup-fx-close.js` pueda
// resolver la cotización de cualquier fecha sin salir a buscar en la web (to-do
// 91, 2026-09-27).
//
// EL PROBLEMA QUE RESUELVE: cada club nuevo que no declara su propio `fx` en el
// documento dispara una búsqueda web puntual de la cotización mayorista de SU
// fecha de cierre (`club-data-mapping/SKILL.md` sección 5) — pasó de nuevo
// onboardeando Almagro, 6 búsquedas para 6 cierres de 31/10 que la serie
// histórica completa ya tiene todas juntas en un solo lugar.
//
// FUENTE: la API pública "Estadísticas Cambiarias" del BCRA
// (api.bcra.gob.ar/estadisticascambiarias), serie de la Comunicación A 3500
// (el tipo de cambio de referencia oficial, lo que el proyecto ya venía
// llamando "dólar mayorista BCRA"). Verificado 2026-09-27 contra los 6 valores
// ya cargados a mano en FX_CLOSE (data/currency-map.js) para Almagro
// (31/10/2018 a 31/10/2023): coincide EXACTO en los 6, dígito por dígito.
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
//   node tools/fetch-fx-reference.mjs                  baja/actualiza ARS (USD)
//   node tools/fetch-fx-reference.mjs --currency ARS   explícito (única soportada hoy)
//   node tools/fetch-fx-reference.mjs --from 2005-01-01 --to 2026-12-31
//
// No necesita API key (endpoint público del BCRA). Volver a correrlo pisa el
// archivo con la serie más actualizada -- barato, no hay motivo para no
// recorrerlo de nuevo cada tanto en vez de intentar solo "agregar lo nuevo".
// ============================================================================

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outDir = resolve(projectRoot, 'tools', 'fx-reference');

const CURRENCIES = {
  // codigoMoneda de la API BCRA -> nombre de archivo local. Hoy solo ARS
  // (vía USD, ver de abajo -- el proyecto SIEMPRE modela el toggle como
  // [moneda nativa <-> USD], nunca ARS<->otra cosa directo, ver
  // club-data-mapping sección 5) -- agregar otra moneda acá si hace falta
  // (ej. si algún día se necesita la serie de otro país con API pública
  // propia, no tiene por qué ser la misma API).
  ARS: { bcraCode: 'USD', file: 'ars-usd.json', label: 'ARS por 1 USD (BCRA, Comunicación A 3500 / dólar mayorista)' },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, def) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : def;
  };
  return {
    currency: get('--currency', 'ARS'),
    from: get('--from', '2003-01-01'),
    to: get('--to', new Date().toISOString().slice(0, 10)),
  };
}

async function fetchAll(bcraCode, from, to) {
  const series = {};
  let offset = 0;
  const limit = 1000;
  for (;;) {
    const url = `https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/${bcraCode}` +
      `?fechadesde=${from}&fechahasta=${to}&offset=${offset}&limit=${limit}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`BCRA API HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
    const json = await resp.json();
    for (const row of json.results ?? []) {
      const det = (row.detalle ?? []).find((d) => d.codigoMoneda === bcraCode);
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

async function main() {
  const { currency, from, to } = parseArgs();
  const cfg = CURRENCIES[currency];
  if (!cfg) {
    console.error(`Moneda '${currency}' no configurada en CURRENCIES. Hoy solo: ${Object.keys(CURRENCIES).join(', ')}`);
    process.exit(1);
  }
  console.log(`Bajando serie ${cfg.label} de ${from} a ${to}...`);
  const series = await fetchAll(cfg.bcraCode, from, to);
  const dates = Object.keys(series).sort();
  if (!dates.length) {
    console.error('La API no devolvió ningún dato -- no piso el archivo existente.');
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const out = {
    label: cfg.label,
    source: 'BCRA API pública, api.bcra.gob.ar/estadisticascambiarias (Comunicación A 3500)',
    fetchedAt: new Date().toISOString(),
    rangeFrom: dates[0],
    rangeTo: dates[dates.length - 1],
    count: dates.length,
    series,
  };
  const outPath = resolve(outDir, cfg.file);
  writeFileSync(outPath, JSON.stringify(out, null, 1), 'utf8');
  console.log(`Listo: ${dates.length} cotizaciones (${dates[0]} a ${dates[dates.length - 1]}) -> ${outPath.replace(projectRoot + '/', '')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
