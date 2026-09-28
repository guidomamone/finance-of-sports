#!/usr/bin/env node
// ============================================================================
// tools/resolve-wikipedia-season-page.mjs — la pieza que faltaba en el
// pipeline del to-do 95: tools/fetch-club-league-reference.mjs necesita el
// TÍTULO EXACTO de la página de temporada en Wikipedia, y esa convención
// varía por liga ("2016 Categoría Primera A season" vs "2019 Eliteserien" vs
// "2025–26 Premier League", sin una fórmula única entre países). En vez de
// que Claude adivine o busque a mano cada vez, esto usa la propia API de
// búsqueda de Wikipedia (mecánico, no un modelo resumiendo).
//
// A PROPÓSITO no auto-elige el resultado #1 y se lo pasa solo al siguiente
// paso: imprime varios candidatos para que Claude confirme cuál es la
// temporada correcta antes de bajarla (una búsqueda ambigua puede traer la
// página de un torneo distinto con nombre parecido).
//
// USO:
//   node tools/resolve-wikipedia-season-page.mjs "Categoría Primera B" 2017 --lang en
//   node tools/resolve-wikipedia-season-page.mjs "Eliteserien" 2019
// ============================================================================

async function search(query, lang) {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=6`;
  const res = await fetch(url, { headers: { 'User-Agent': 'finance-of-sports-tool (research interno)' } });
  const data = await res.json();
  return data.query?.search || [];
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '');
}

async function main() {
  const args = process.argv.slice(2);
  const langFlag = args.indexOf('--lang');
  const lang = langFlag >= 0 ? args[langFlag + 1] : 'en';
  const positional = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--lang');
  const [leagueName, year] = positional;

  if (!leagueName || !year) {
    console.error('Uso: node tools/resolve-wikipedia-season-page.mjs "<nombre de la liga>" <año> [--lang en]');
    process.exit(1);
  }

  const query = `${year} ${leagueName} season`;
  console.log(`Buscando "${query}" en ${lang}.wikipedia.org...\n`);
  const results = await search(query, lang);
  if (!results.length) {
    console.log('Sin resultados. Probar con otro nombre de liga (el nombre en inglés de Wikipedia puede ser distinto al local) o --lang.');
    return;
  }
  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.title}`);
    console.log(`   ${stripHtml(r.snippet)}`);
  });
  console.log('\nConfirmar cuál es la temporada correcta (puede haber más de un torneo con nombre parecido) y pasar el título EXACTO a tools/fetch-club-league-reference.mjs.');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
