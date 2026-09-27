#!/usr/bin/env node
// Búsqueda semántica con Exa — 3er barrido de sourcing (ver .claude/skills/club-sourcing/SKILL.md
// sección 0.1b): búsqueda por CONTENIDO, no por nombre de archivo, para cuando el barrido mecánico
// (sitio oficial, Wayback CDX, búsqueda web genérica) ya se agotó pero hay señal de que vale la pena
// seguir (club grande, prensa confirma que el documento existe).
//
// Uso:
//   node tools/exa-search.mjs "balance auditado 2024 Club Atlético Banfield"
//   node tools/exa-search.mjs "memoria y balance River Plate" --numResults 5
//
// Necesita Admin/exa/.env con EXA_API_KEY=... (gitignoreado, mismo criterio que Gemini/Mistral/Resend).

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const envPath = resolve(projectRoot, 'Admin', 'exa', '.env');

function readEnvKey() {
  const raw = readFileSync(envPath, 'utf8');
  const line = raw.split('\n').find((l) => l.startsWith('EXA_API_KEY='));
  if (!line) throw new Error(`No encontré EXA_API_KEY en ${envPath}`);
  return line.slice('EXA_API_KEY='.length).trim();
}

function parseArgs(argv) {
  const args = { query: null, numResults: undefined };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--numResults') {
      args.numResults = Number(argv[++i]);
    } else {
      rest.push(argv[i]);
    }
  }
  args.query = rest.join(' ');
  return args;
}

async function main() {
  const { query, numResults } = parseArgs(process.argv.slice(2));
  if (!query) {
    console.error('Uso: node tools/exa-search.mjs "<query>" [--numResults N]');
    process.exit(1);
  }

  const apiKey = readEnvKey();

  // Request recomendado por el skill build-with-exa: query + highlights, nada más por default.
  // numResults solo se agrega si se pidió explícitamente (default del server: 10).
  const body = {
    query,
    type: 'auto',
    contents: { highlights: true },
  };
  if (numResults) body.numResults = numResults;

  const res = await fetch('https://api.exa.ai/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Exa devolvió ${res.status}: ${text}`);
  }

  const data = await res.json();
  for (const item of data.results ?? []) {
    console.log(`\n${item.title ?? '(sin título)'}`);
    console.log(item.url);
    if (item.publishedDate) console.log(`  publicado: ${item.publishedDate}`);
    for (const h of item.highlights ?? []) {
      console.log(`  · ${h}`);
    }
  }
}

main().catch((err) => {
  console.error(`\nERROR: ${err.message}\n`);
  process.exit(1);
});
