#!/usr/bin/env node
// ============================================================================
// tools/lookup-fx-close.js — busca LOCAL, contra la serie de tools/fx-reference/,
// el tipo de cambio de cierre de una fecha puntual (to-do 91). Reemplaza la
// búsqueda web ad-hoc que hasta ahora se repetía club por club (ver
// club-data-mapping/SKILL.md sección 5, regla 1).
//
// Si la fecha pedida no tiene cotización (fin de semana/feriado), devuelve la
// del día hábil anterior más cercano -- mismo criterio que ya usa el proyecto
// a mano (ver el comentario de ARS@2020-10-31/2021-10-31 en data/currency-map.js:
// "última rueda hábil antes del cierre").
//
// Si la fecha/moneda no está en la serie local (no se corrió
// fetch-fx-reference.mjs para esa moneda, o la fecha es más vieja que el rango
// bajado), lo dice explícito -- NUNCA inventa un número ni cae a un valor por
// default.
//
// USO:
//   node tools/lookup-fx-close.js 2018-10-31                cotización + fxRef listo para pegar
//   node tools/lookup-fx-close.js 2018-10-31 --currency ARS  (ARS es el default hoy, única serie bajada)
//   node tools/lookup-fx-close.js 2018-10-31 --json
//
// No llama a ninguna API -- lee el archivo local. Si ese archivo no existe o
// está desactualizado para la fecha que hace falta, correr primero:
//   node tools/fetch-fx-reference.mjs
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

const CURRENCIES = {
  ARS: { file: 'ars-usd.json' },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const date = args.find((a) => !a.startsWith('--'));
  const curFlag = args.indexOf('--currency');
  const currency = curFlag >= 0 ? args[curFlag + 1] : 'ARS';
  const json = args.includes('--json');
  return { date, currency, json };
}

function loadSeries(currency) {
  const cfg = CURRENCIES[currency];
  if (!cfg) throw new Error(`Moneda '${currency}' sin serie local configurada. Hoy solo: ${Object.keys(CURRENCIES).join(', ')}. Correr tools/fetch-fx-reference.mjs si hace falta agregarla.`);
  const path = resolve(projectRoot, 'tools', 'fx-reference', cfg.file);
  if (!existsSync(path)) throw new Error(`No existe ${path.replace(projectRoot + '/', '')} -- correr primero: node tools/fetch-fx-reference.mjs --currency ${currency}`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

// Busca la fecha exacta, o la más cercana ANTERIOR (nunca posterior -- un
// "cierre" no puede resolverse con una cotización de después de esa fecha).
function findClose(series, dateStr) {
  if (dateStr in series) return { date: dateStr, fx: series[dateStr], exact: true };
  let d = new Date(dateStr + 'T00:00:00Z');
  for (let i = 0; i < 10; i++) {
    d.setUTCDate(d.getUTCDate() - 1);
    const candidate = d.toISOString().slice(0, 10);
    if (candidate in series) return { date: candidate, fx: series[candidate], exact: false };
  }
  return null;
}

function main() {
  const { date, currency, json } = parseArgs();
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error('Uso: node tools/lookup-fx-close.js YYYY-MM-DD [--currency ARS] [--json]');
    process.exit(1);
  }
  let data;
  try {
    data = loadSeries(currency);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  if (date < data.rangeFrom || date > data.rangeTo) {
    console.error(`${date} está fuera del rango bajado (${data.rangeFrom} a ${data.rangeTo}). Correr de nuevo tools/fetch-fx-reference.mjs con --from/--to si hace falta una fecha fuera de ese rango.`);
    process.exit(1);
  }
  const found = findClose(data.series, date);
  if (!found) {
    console.error(`No se encontró cotización para ${date} ni en los 10 días hábiles anteriores -- revisar a mano.`);
    process.exit(1);
  }
  if (json) {
    console.log(JSON.stringify({ requested: date, ...found, currency, source: data.source }, null, 2));
    return;
  }
  const key = `${currency}@${date}`;
  if (found.exact) {
    console.log(`${key}: fx=${found.fx}  (${data.label}, exacto)`);
  } else {
    console.log(`${key}: fx=${found.fx}  (${data.label} -- ${date} no es día hábil, se usó el cierre de ${found.date})`);
  }
  console.log('');
  console.log('Para pegar en data/currency-map.js, FX_CLOSE:');
  const label = found.exact
    ? `Dólar mayorista BCRA al ${found.date}`
    : `Dólar mayorista BCRA, última rueda hábil antes del cierre (${found.date}, ${date} no es día hábil)`;
  console.log(`  '${key}': { fx:${found.fx}, source:'market_close', label:'${label}' },`);
  console.log('');
  console.log(`En el archivo del club: fxRef:'${key}'  (ver club-data-mapping/SKILL.md sección 5 para cuándo corresponde market_close vs. document_close).`);
}

main();
