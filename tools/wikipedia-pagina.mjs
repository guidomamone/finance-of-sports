// tools/wikipedia-pagina.mjs — baja una página de Wikipedia SIN confundir «no existe» con «no se pudo bajar», y decide qué se guarda en el caché de estadio-sponsor.
// POR QUÉ: antes una falla de red devolvía null igual que una página inexistente, y el caché de tools/club-league-reference/contexto/ la guardaba como «no existe» (sin reintento, con el estadio y la capacidad de esos años vacíos y sin error).
// USO: import { pagina, entradaDeCache } from './wikipedia-pagina.mjs' (estadio-sponsor-wikipedia.mjs las re-exporta).  Prueba: node tools/probar-pagina-wikipedia.mjs
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

// Tres resultados que NO se confunden: la página (wikitext, revid, título); `null` si Wikipedia dice que NO EXISTE (missingtitle / invalidtitle: p. ej. la temporada en curso de una liga sin página todavía); y
// `{ falloRed: true, motivo }` si después de los reintentos no se pudo saber (corte de red, límite de pedidos, error del servidor). `opciones.fetch` y `opciones.esperar` se inyectan para probarla sin red.
const NO_EXISTE = new Set(['missingtitle', 'invalidtitle', 'nosuchpageid']);
export async function pagina(title, lang, { fetch: pedir = globalThis.fetch, esperar = dormir } = {}) {
  let motivo = 'sin respuesta';
  for (let i = 0; i < 4; i++) {
    await esperar(1500 * (i ? 4 * i : 1));
    try {
      const r = await pedir(`https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext|revid&format=json&redirects=1`, { headers: { 'User-Agent': 'finance-of-sports/1.0 (https://financeofsports.com; research, pocas consultas)' } });
      const j = JSON.parse(await r.text());
      if (j.error) { if (NO_EXISTE.has(j.error.code)) return null; motivo = `Wikipedia respondió ${j.error.code || 'error'}`; continue; }
      return { wikitext: j.parse.wikitext['*'], revid: j.parse.revid, titulo: j.parse.title };
    } catch (e) { motivo = String(e?.message || e).slice(0, 80); /* corte por exceso: reintenta */ }
  }
  return { falloRed: true, motivo };
}

// Qué se guarda en el caché de una página de temporada: la entrada con lo leído; la de «no existe» (solo si Wikipedia lo dijo); y NADA (null) si falló la red, para que la próxima corrida la vuelva a pedir.
export function entradaDeCache(x, p, leer) {
  if (p?.falloRed) return null;
  return p ? { pagina: p.titulo, lang: x.lang, revid: p.revid, ...leer(p.wikitext) } : { pagina: null, pedida: x.page, estadios: [], kits: [] };
}
