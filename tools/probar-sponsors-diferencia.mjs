#!/usr/bin/env node
// tools/probar-sponsors-diferencia.mjs — LA PRUEBA de sponsors-diferencia.js (lo que generate-sponsors.js imprime sobre qué cambió respecto del data/sponsors.js anterior)
// Casos: lo nuevo se cuenta por liga y por sponsor; lo que desaparece o cambia de fuente se avisa como PERDIDA (con ATENCIÓN); sin cambios lo dice; sin archivo anterior no falla.
// USO: node tools/probar-sponsors-diferencia.mjs   (sale con 1 si algún caso falla; no toca nada)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { leerLista, diferencia, resumen } = require('./sponsors-diferencia.js');

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };

const v = { alfa: { n: 'Alfa', roles: ['c'], e: [['at-bundesliga', 2022, 'LASK', null, 'c'], ['at-bundesliga', 2021, 'LASK', null, 'c']] }, beta: { n: 'Beta', roles: ['m'], e: [['dk-1division', 2024, 'OB', null, 'm']] } };
const n = {
  alfa: { n: 'Alfa', roles: ['c'], e: [['at-bundesliga', 2023, 'LASK', null, 'c'], ['at-bundesliga', 2022, 'LASK', null, 'c'], ['at-bundesliga', 2021, 'LASK', null, 'c']] },
  beta: { n: 'Beta', roles: ['m'], e: [['dk-1division', 2024, 'OB', null, 'm']] },
  gama: { n: 'Gama', roles: ['c'], e: [['gb-scottishpremiership', 2023, 'Dundee', null, 'c'], ['gb-scottishpremiership', 2022, 'Dundee', null, 'c']] },
};
let d = diferencia(v, n);
caso('cuenta las entradas nuevas y por liga', d.nuevas === 3 && d.porLiga['at-bundesliga'] === 1 && d.porLiga['gb-scottishpremiership'] === 2, JSON.stringify(d));
caso('cuenta los sponsors nuevos (con su nombre)', d.sponsorsNuevos.length === 1 && d.sponsorsNuevos[0] === 'Gama', JSON.stringify(d.sponsorsNuevos));
caso('sin pérdidas no avisa ATENCIÓN', d.perdidas.length === 0 && !/ATENCIÓN/.test(resumen(d)), resumen(d));
caso('el resumen dice las entradas, las ligas y los sponsors nuevos', /\+3 entradas/.test(resumen(d)) && /gb-scottishpremiership 2/.test(resumen(d)) && /\+1 sponsor/.test(resumen(d)), resumen(d));

// una entrada que desaparece, una que cambia de fuente (misma clave, otro texto) y un sponsor entero que desaparece
const n2 = { alfa: { n: 'Alfa', roles: ['c'], e: [['at-bundesliga', 2022, 'LASK', null, 'c', 'https://x/otra']] } };
d = diferencia(v, n2);
caso('lo que desaparece o cambia de fuente cuenta como perdida', d.perdidas.length === 3, JSON.stringify(d.perdidas));
caso('un sponsor que desaparece entero se nombra', d.sponsorsPerdidos.length === 1 && d.sponsorsPerdidos[0] === 'Beta', JSON.stringify(d.sponsorsPerdidos));
caso('con pérdidas el resumen empieza con ATENCIÓN y nombra una', /^ATENCIÓN/.test(resumen(d)) && /Beta/.test(resumen(d)), resumen(d));

d = diferencia(v, v);
caso('sin cambios lo dice y no inventa nada', d.nuevas === 0 && d.perdidas.length === 0 && /sin cambios/.test(resumen(d)), resumen(d));
caso('sin archivo anterior (null) todo es nuevo y no falla', diferencia(null, n).nuevas === 6 && !/ATENCIÓN/.test(resumen(diferencia(null, n))));

const txt = 'window.SPONSORS = {\n  actuales: {},\n  fuentes: {},\n  lista: {\n    "alfa": {"n":"Alfa","roles":["c"],"e":[["at-bundesliga",2022,"LASK",null,"c"]]},\n  },\n};\n';
caso('lee la lista de un data/sponsors.js', leerLista(txt)?.alfa?.e?.length === 1);
caso('un texto roto da null, no una excepción', leerLista('esto no es js (') === null && leerLista('') === null);

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
