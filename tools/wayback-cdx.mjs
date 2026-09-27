#!/usr/bin/env node
// Cliente CDX de Wayback Machine — to-do 78 (Admin/TODO.md). La CDX API se cae en silencio con
// dominios grandes: en la sesión del 2026-09-26 devolvió 504 Gateway Timeout para
// bocajuniors.com.ar (100k+ URLs archivadas), racingclub.com.ar y riverplate.com, y en un caso un
// subagente Haiku interpretó ese 504 como "0 documentos, dominio no indexado" — un falso negativo
// con la misma confianza que un resultado real (ver .claude/skills/club-sourcing/SKILL.md, familia 3
// de la sección 0.1).
//
// Este cliente resuelve dos cosas:
//   - Pagina con `resumeKey` en vez de traer solo la primera página (1000 filas) de un dominio
//     grande y asumir que eso es todo.
//   - Reintenta con backoff exponencial ante 5xx/429/timeout de red, y si TODOS los reintentos
//     fallan, TIRA UN ERROR — nunca devuelve un array vacío en ese caso. `queryCdx` solo devuelve
//     `[]` cuando la CDX API respondió que de verdad no hay snapshots, nunca cuando la consulta en
//     sí falló. El llamador (una sesión de sourcing, u otro script) tiene que distinguir "consulté y
//     no hay nada" de "la consulta falló" — con esta API eso significa: `catch` la excepción antes
//     de escribir "0 PDFs archivados" en `fuentes/<País>/<Club>.md`.
//
// Uso como script:
//   node tools/wayback-cdx.mjs bocajuniors.com.ar
//   node tools/wayback-cdx.mjs bocajuniors.com.ar --matchType domain --filter statuscode:200
//   node tools/wayback-cdx.mjs "racingclub.com.ar/balance.pdf" --matchType exact --json
//
// Uso como módulo, desde otro script de tools/:
//   import { queryCdx } from './wayback-cdx.mjs';
//   const rows = await queryCdx('bocajuniors.com.ar', { matchType: 'domain' });
//   // rows: [urlkey, timestamp, original, mimetype, statuscode, digest, length][]

const CDX_ENDPOINT = 'https://web.archive.org/cdx/search/cdx';
const PAGE_LIMIT = 1000;
const MAX_RETRIES = 5;
const BASE_BACKOFF_MS = 1000;
const REQUEST_TIMEOUT_MS = 60000;
const MAX_PAGES = 500; // salvaguarda: si resumeKey no converge en 500 páginas, algo está mal

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchPage(url, attempt = 0) {
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  } catch (err) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(
        `CDX API: fallo de red tras ${MAX_RETRIES + 1} intentos (${err.message}). ` +
          `Esto es una consulta FALLIDA, no "0 resultados" — no lo registres como dominio sin ` +
          `snapshots. URL: ${url}`
      );
    }
    await sleep(BASE_BACKOFF_MS * 2 ** attempt);
    return fetchPage(url, attempt + 1);
  }

  if (RETRYABLE_STATUSES.has(res.status)) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(
        `CDX API devolvió ${res.status} tras ${MAX_RETRIES + 1} intentos. ` +
          `Esto es una consulta FALLIDA (probable timeout del lado de archive.org con un dominio ` +
          `grande), no "0 resultados" — no lo registres como dominio sin snapshots. Reintentar más ` +
          `tarde, o acotar con --filter/--from/--to. URL: ${url}`
      );
    }
    await sleep(BASE_BACKOFF_MS * 2 ** attempt);
    return fetchPage(url, attempt + 1);
  }

  if (!res.ok) {
    throw new Error(`CDX API devolvió ${res.status} (no es reintentable) — URL: ${url}`);
  }

  const text = await res.text();
  if (!text.trim()) return []; // respuesta vacía real de la API: 0 resultados, sin error
  return JSON.parse(text);
}

/**
 * Consulta la CDX API completa (todas las páginas) para un dominio o URL.
 * Tira una excepción si la consulta falla incluso después de reintentar — nunca devuelve
 * silenciosamente un array vacío por una falla de red/servidor.
 */
export async function queryCdx(urlOrDomain, opts = {}) {
  const { matchType = 'domain', filter, collapse, from, to } = opts;
  const allRows = [];
  let resumeKey = null;
  let pageCount = 0;

  while (true) {
    const params = new URLSearchParams({
      url: urlOrDomain,
      matchType,
      output: 'json',
      limit: String(PAGE_LIMIT),
      showResumeKey: 'true',
    });
    for (const f of [].concat(filter ?? [])) params.append('filter', f);
    if (collapse) params.append('collapse', collapse);
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (resumeKey) params.append('resumeKey', resumeKey);

    const page = await fetchPage(`${CDX_ENDPOINT}?${params.toString()}`);
    pageCount++;

    if (page.length === 0) break;

    // El header (nombres de campo) va primero en CADA página, no solo la primera.
    let rows = page.slice(1);
    resumeKey = null;

    // Página con más resultados por venir: las últimas 2 filas son [[], [resumeKey]].
    if (rows.length >= 2) {
      const last = rows[rows.length - 1];
      const secondLast = rows[rows.length - 2];
      if (Array.isArray(last) && last.length === 1 && Array.isArray(secondLast) && secondLast.length === 0) {
        resumeKey = last[0];
        rows = rows.slice(0, rows.length - 2);
      }
    }

    allRows.push(...rows);

    if (!resumeKey) break;
    if (pageCount >= MAX_PAGES) {
      throw new Error(
        `CDX API: ${MAX_PAGES} páginas para "${urlOrDomain}" sin terminar — el resumeKey no ` +
          `converge. Abortando en vez de paginar para siempre; revisar a mano.`
      );
    }
  }

  return allRows;
}

function parseArgs(argv) {
  const args = { target: null, matchType: 'domain', filter: [], json: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--matchType') args.matchType = argv[++i];
    else if (a === '--filter') args.filter.push(argv[++i]);
    else if (a === '--json') args.json = true;
    else rest.push(a);
  }
  args.target = rest.join(' ');
  return args;
}

async function main() {
  const { target, matchType, filter, json } = parseArgs(process.argv.slice(2));
  if (!target) {
    console.error(
      'Uso: node tools/wayback-cdx.mjs <dominio-o-url> [--matchType domain|exact|prefix|host] ' +
        '[--filter statuscode:200] [--json]'
    );
    process.exit(1);
  }

  console.error(`Consultando CDX (matchType=${matchType}) para: ${target} ...`);
  const rows = await queryCdx(target, { matchType, filter });

  if (json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (rows.length === 0) {
    console.log('0 resultados — consulta EXITOSA (la CDX API respondió, no encontró snapshots).');
    return;
  }

  console.log(`${rows.length} snapshots encontrados:\n`);
  for (const [, timestamp, original, mimetype, statuscode, , length] of rows) {
    console.log(`${timestamp}  [${statuscode}]  ${String(length).padStart(9)} B  ${mimetype.padEnd(24)}  ${original}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(`\nERROR: ${err.message}\n`);
    process.exit(1);
  });
}
