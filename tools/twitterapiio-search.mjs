#!/usr/bin/env node
// Búsqueda en X/Twitter vía TwitterAPI.io — revendedor de terceros, no la API oficial de X (esa no
// tiene tier gratis y el archivo histórico completo arranca en el contrato Enterprise de
// USD 42.000+/mes, ver Admin/CHANGELOG.md Versión 269, to-do 80). TwitterAPI.io cobra $0,15 cada
// 1.000 tweets leídos, sin suscripción, y SÍ busca en el archivo histórico completo (no solo los
// últimos 7 días).
//
// Necesita Admin/twitterapiio/.env con TWITTERAPI_IO_KEY=... (gitignoreado, mismo criterio que
// Exa/Gemini/Mistral/Firecrawl).
//
// NO es parte de la escalera rutinaria de sourcing (decisión de Guido, to-do 80 cerrado): correrlo a
// mano, club por club, cuando las 4 familias de siempre (sitio oficial, Wayback CDX, búsqueda web,
// regulador) ya se agotaron y el club tiene una cuenta oficial de X activa — no por default en cada
// club nuevo (tiene costo por lectura, a diferencia de Arctic Shift/PullPush para Reddit).
//
// Uso:
//   node tools/twitterapiio-search.mjs "from:AAAJoficial balance"
//   node tools/twitterapiio-search.mjs "\"Racing Club\" (balance OR \"estados contables\" OR memoria)"

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, 'Admin', 'twitterapiio', '.env');

function readEnvKey() {
  const raw = readFileSync(envPath, 'utf8');
  const line = raw.split('\n').find((l) => l.startsWith('TWITTERAPI_IO_KEY='));
  if (!line) throw new Error(`No encontré TWITTERAPI_IO_KEY en ${envPath}`);
  return line.slice('TWITTERAPI_IO_KEY='.length).trim();
}

async function main() {
  const query = process.argv.slice(2).join(' ');
  if (!query) {
    console.error('Uso: node tools/twitterapiio-search.mjs "<query de búsqueda avanzada de X>"');
    process.exit(1);
  }

  const apiKey = readEnvKey();
  const url = `https://api.twitterapi.io/twitter/tweet/advanced_search?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'X-API-Key': apiKey } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TwitterAPI.io devolvió ${res.status}: ${text}`);
  }

  const data = await res.json();
  const tweets = data.tweets ?? [];
  console.log(`${tweets.length} resultados para: ${query}\n`);
  for (const t of tweets) {
    console.log(`@${t.author?.userName ?? '?'} (${t.createdAt})`);
    console.log(t.text?.replace(/\n/g, ' '));
    console.log(t.url);
    console.log('');
  }
}

main().catch((err) => {
  console.error(`\nERROR: ${err.message}\n`);
  process.exit(1);
});
