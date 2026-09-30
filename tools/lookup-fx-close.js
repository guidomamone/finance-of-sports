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
// default. CUALQUIER caso de estos queda anotado en
// tools/fx-reference/misses.jsonl (pedido de Guido, 2026-09-27): la idea es
// que él pueda revisar ese archivo de vez en cuando y correr
// fetch-fx-reference.mjs para la moneda/rango que haga falta, en vez de que
// cada sesión se tope con el mismo hueco por separado sin dejar rastro.
//
// USO:
//   node tools/lookup-fx-close.js 2018-10-31                cotización + fxRef listo para pegar
//   node tools/lookup-fx-close.js 2018-10-31 --currency ARS  (ARS es el default; ver --list-monedas)
//   node tools/lookup-fx-close.js 2018-10-31 --json
//   node tools/lookup-fx-close.js --list-monedas             qué monedas hay cacheadas
//   node tools/lookup-fx-close.js --misses                   huecos pendientes de prepopular
//
// No llama a ninguna API -- lee el archivo local. Si ese archivo no existe o
// está desactualizado para la fecha que hace falta, correr primero:
//   node tools/fetch-fx-reference.mjs
// ============================================================================

import { readFileSync, existsSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const missesPath = resolve(projectRoot, 'tools', 'fx-reference', 'misses.jsonl');

const CURRENCIES = {
  ARS: { file: 'ars-usd.json', fuente: 'Dólar mayorista BCRA' },
  BRL: { file: 'brl-usd.json', fuente: 'PTAX de cierre (venda) del Banco Central do Brasil' },
  COP: { file: 'cop-usd.json', fuente: 'TRM oficial (Banco de la República / Superfinanciera de Colombia)' },
  // Agregadas el 2026-09-30 (ver fetch-fx-reference.mjs para qué tasa es cada una).
  NOK: { file: 'nok-usd.json', fuente: 'Tipo medio de referencia de Norges Bank' },
  CZK: { file: 'czk-usd.json', fuente: 'Fixing del Česká národní banka' },
  CHF: { file: 'chf-usd.json', fuente: 'Noon buying rate de Nueva York (Reserva Federal, H.10)' },
  TRY: { file: 'try-usd.json', fuente: 'Döviz alış del TCMB' },
  RUB: { file: 'rub-usd.json', fuente: 'Tipo oficial del Banco de Rusia' },
  UAH: { file: 'uah-usd.json', fuente: 'Tipo oficial del Banco Nacional de Ucrania' },
  KRW: { file: 'krw-usd.json', fuente: 'Noon buying rate de Nueva York (Reserva Federal, H.10)' },
};

function logMiss(reason, currency, date) {
  mkdirSync(resolve(projectRoot, 'tools', 'fx-reference'), { recursive: true });
  appendFileSync(missesPath, JSON.stringify({ ts: new Date().toISOString(), currency, date, reason }) + '\n', 'utf8');
}

function parseArgs() {
  const args = process.argv.slice(2);
  const date = args.find((a) => !a.startsWith('--'));
  const curFlag = args.indexOf('--currency');
  const currency = curFlag >= 0 ? args[curFlag + 1] : 'ARS';
  const json = args.includes('--json');
  const misses = args.includes('--misses');
  const listMonedas = args.includes('--list-monedas');
  return { date, currency, json, misses, listMonedas };
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

function printMisses() {
  if (!existsSync(missesPath)) { console.log('Sin misses registrados todavía.'); return; }
  const lines = readFileSync(missesPath, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const seen = new Map();
  for (const l of lines) {
    const key = `${l.currency}@${l.date ?? '?'}`;
    seen.set(key, l); // se queda con el más reciente por combinación
  }
  console.log(`${seen.size} hueco(s) distintos pendientes de prepopular (${lines.length} intentos en total):\n`);
  for (const [key, l] of seen) console.log(`  ${key} -- ${l.reason} (última vez: ${l.ts.slice(0, 10)})`);
}

function main() {
  const { date, currency, json, misses, listMonedas } = parseArgs();
  if (misses) return printMisses();
  if (listMonedas) {
    for (const [code, cfg] of Object.entries(CURRENCIES)) {
      const path = resolve(projectRoot, 'tools', 'fx-reference', cfg.file);
      console.log(existsSync(path) ? `${code}: ${cfg.fuente} (cacheada)` : `${code}: ${cfg.fuente} (configurada, sin bajar -- correr fetch-fx-reference.mjs)`);
    }
    return;
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error('Uso: node tools/lookup-fx-close.js YYYY-MM-DD [--currency ARS] [--json]\n   o: node tools/lookup-fx-close.js --list-monedas\n   o: node tools/lookup-fx-close.js --misses');
    process.exit(1);
  }
  let data;
  try {
    data = loadSeries(currency);
  } catch (err) {
    console.error(err.message);
    logMiss(err.message, currency, date);
    console.error(`\n(quedó anotado en tools/fx-reference/misses.jsonl -- avisale a Guido para que lo prepopule)`);
    process.exit(1);
  }
  if (date < data.rangeFrom || date > data.rangeTo) {
    const reason = `fuera de rango (bajado: ${data.rangeFrom} a ${data.rangeTo})`;
    console.error(`${date} está ${reason}. Correr de nuevo tools/fetch-fx-reference.mjs con --from/--to si hace falta una fecha fuera de ese rango.`);
    logMiss(reason, currency, date);
    console.error(`(quedó anotado en tools/fx-reference/misses.jsonl -- avisale a Guido para que lo prepopule)`);
    process.exit(1);
  }
  const found = findClose(data.series, date);
  if (!found) {
    const reason = 'sin cotización ni en los 10 días hábiles anteriores';
    console.error(`No se encontró cotización para ${date} ni en los 10 días hábiles anteriores -- revisar a mano.`);
    logMiss(reason, currency, date);
    console.error(`(quedó anotado en tools/fx-reference/misses.jsonl -- avisale a Guido para que lo prepopule)`);
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
  const fuente = CURRENCIES[currency].fuente;
  const label = found.exact
    ? `${fuente} al ${found.date}`
    : `${fuente}, última rueda hábil antes del cierre (${found.date}, ${date} no es día hábil)`;
  console.log(`  '${key}': { fx:${found.fx}, source:'market_close', label:'${label}' },`);
  console.log('');
  console.log(`En el archivo del club: fxRef:'${key}'  (ver club-data-mapping/SKILL.md sección 5 para cuándo corresponde market_close vs. document_close).`);
}

main();
