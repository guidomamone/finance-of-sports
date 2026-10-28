#!/usr/bin/env node
// tools/probar-pagina-wikipedia.mjs — la prueba de pagina() y entradaDeCache() de estadio-sponsor-wikipedia.mjs. Sin red: fetch y la espera se inyectan.
//   1. la página existe: wikitext, revid y título · 2. Wikipedia dice «missingtitle»: null (no existe) · 3. la red falla siempre: { falloRed } y NO null · 4. un error del servidor (ratelimited) se reintenta y, si sigue, es falloRed
//   5. falla dos veces y la tercera anda: devuelve la página · 6. entradaDeCache: una falla de red NO se guarda; «no existe» sí; una página se guarda con lo leído · 7. los tres llamadores de pagina() tratan falloRed
// Uso: node tools/probar-pagina-wikipedia.mjs    (menos de 1 segundo; sale con 1 si algún caso falla)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pagina, entradaDeCache } from './wikipedia-pagina.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const res = (obj) => async () => ({ text: async () => JSON.stringify(obj) });
const sinEsperar = async () => {};
const OK = { parse: { wikitext: { '*': 'texto' }, revid: 42, title: 'T' } };

const a = await pagina('T', 'en', { fetch: res(OK), esperar: sinEsperar });
caso('1. la página existe', a?.wikitext === 'texto' && a.revid === 42 && a.titulo === 'T' && !a.falloRed, JSON.stringify(a));
caso('2. missingtitle: null (no existe)', (await pagina('T', 'en', { fetch: res({ error: { code: 'missingtitle' } }), esperar: sinEsperar })) === null);
let n = 0;
const b = await pagina('T', 'en', { fetch: async () => { n++; throw new Error('fetch failed'); }, esperar: sinEsperar });
caso('3. la red falla siempre: falloRed (no null) después de 4 intentos', b?.falloRed === true && n === 4 && /fetch failed/.test(b.motivo), JSON.stringify(b) + n);
const c = await pagina('T', 'en', { fetch: res({ error: { code: 'ratelimited' } }), esperar: sinEsperar });
caso('4. ratelimited no es «no existe»: falloRed', c?.falloRed === true && /ratelimited/.test(c.motivo), JSON.stringify(c));
let k = 0;
const d = await pagina('T', 'en', { fetch: async () => { if (++k < 3) throw new Error('corte'); return { text: async () => JSON.stringify(OK) }; }, esperar: sinEsperar });
caso('5. falla dos veces y la tercera anda: devuelve la página', d?.wikitext === 'texto' && k === 3);

const x = { lang: 'en', page: 'P' }; const leer = (w) => ({ estadios: [w], kits: [] });
caso('6. entradaDeCache: una falla de red no se guarda', entradaDeCache(x, { falloRed: true, motivo: 'm' }, leer) === null);
caso('6b. «no existe» sí se guarda, con lo pedido', entradaDeCache(x, null, leer)?.pagina === null && entradaDeCache(x, null, leer).pedida === 'P');
const e = entradaDeCache(x, a, leer);
caso('6c. una página se guarda con título, revid y lo leído', e.pagina === 'T' && e.revid === 42 && e.estadios[0] === 'texto' && e.lang === 'en');
const es = readFileSync(resolve(import.meta.dirname, 'estadio-sponsor.mjs'), 'utf8'), wk = readFileSync(resolve(import.meta.dirname, 'estadio-sponsor-wikipedia.mjs'), 'utf8');
caso('7. los llamadores de pagina() tratan falloRed (estadio-sponsor y paginaLocal)', (es.match(/falloRed/g) || []).length >= 2 && /entradaDeCache\(x, p, leerPagina\)/.test(es) && /p\.falloRed\) continue/.test(wk), String((es.match(/falloRed/g) || []).length));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
