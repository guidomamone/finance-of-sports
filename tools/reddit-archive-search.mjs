#!/usr/bin/env node
// Búsqueda puntual en el archivo comunitario de Reddit (Arctic Shift / PullPush) — NO es parte de
// la escalera rutinaria de sourcing (ver Admin/CHANGELOG.md Versión 268, to-do 81 cerrado). Se probó
// en 12 clubes y el hallazgo fue: rinde solo en subreddits de ~20-25k miembros para arriba, y muy
// pocos clubes de fútbol del mundo tienen un subreddit así de grande — por eso este script queda
// guardado para una corrida ocasional/manual cuando un club puntual lo amerite, no para correrlo por
// default en cada club nuevo.
//
// Ninguna de las dos APIs pide cuenta ni API key: son archivos de terceros (sucesores de Pushshift)
// que indexan posts/comments públicos de Reddit, no la API oficial de Reddit (esa está cerrada para
// este caso de uso — ver el mismo Changelog).
//
// Uso:
//   node tools/reddit-archive-search.mjs subs boca
//     → lista subreddits candidatos que empiezan con "boca" y sus miembros, para chequear el umbral
//       de ~20-25k ANTES de gastar tiempo buscando adentro.
//   node tools/reddit-archive-search.mjs search --subreddit BocaJuniors --q "balance" [--size 15]
//     → busca la palabra en título+selftext de ese subreddit (usa PullPush: más confiable que Arctic
//       Shift en subreddits muy activos, que ahí tira timeout).

const ARCTIC_BASE = 'https://arctic-shift.photon-reddit.com';
const PULLPUSH_BASE = 'https://api.pullpush.io';

function parseArgs(argv) {
  const [cmd, ...rest] = argv;
  const opts = { _: [] };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg.startsWith('--')) {
      opts[arg.slice(2)] = rest[++i];
    } else {
      opts._.push(arg);
    }
  }
  return { cmd, opts };
}

async function subs(prefix, limit = 20) {
  const url = `${ARCTIC_BASE}/api/subreddits/search?subreddit_prefix=${encodeURIComponent(prefix)}&limit=${limit}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error(`Arctic Shift devolvió: ${data.error}`);
  for (const s of data.data ?? []) {
    console.log(`r/${s.display_name}  ·  ${s.subscribers ?? '?'} miembros`);
  }
  console.log(
    '\n(umbral encontrado en el piloto del to-do 81: ~20-25k miembros para arriba rinde, por debajo no — ver Admin/CHANGELOG.md Versión 268)'
  );
}

async function search(subreddit, query, size = 15) {
  if (!subreddit || !query) {
    throw new Error('Uso: search --subreddit <nombre> --q "<query>" [--size N]');
  }
  // PullPush es case-sensitive de una forma rara: solo funciona confiable en minúsculas.
  const url = `${PULLPUSH_BASE}/reddit/search/submission/?subreddit=${encodeURIComponent(subreddit.toLowerCase())}&q=${encodeURIComponent(query)}&size=${size}`;
  const res = await fetch(url);
  const data = await res.json();
  const rows = data.data ?? [];
  console.log(`${rows.length} resultados en r/${subreddit} para "${query}"\n`);
  for (const p of rows) {
    console.log(`- ${p.title}`);
    console.log(`  https://reddit.com${p.permalink}`);
  }
}

async function main() {
  const { cmd, opts } = parseArgs(process.argv.slice(2));
  if (cmd === 'subs') {
    await subs(opts._[0]);
  } else if (cmd === 'search') {
    await search(opts.subreddit, opts.q ?? opts._.join(' '), opts.size ? Number(opts.size) : undefined);
  } else {
    console.error('Uso:\n  node tools/reddit-archive-search.mjs subs <prefijo>\n  node tools/reddit-archive-search.mjs search --subreddit <nombre> --q "<query>" [--size N]');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\nERROR: ${err.message}\n`);
  process.exit(1);
});
