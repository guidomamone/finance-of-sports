#!/usr/bin/env node
// tools/probar-gestion-cubre.mjs — la prueba de gestion-cubre.mjs y de su uso en club-siis.mjs (ítem 4 del punto 478): el subagente de gestiones se lista si algún cierre no cae en una gestión confirmada.
//   1. todos los cierres caen · 2. el club no tiene clave · 3. una gestión sin confirmar no cubre (Envigado/Ruiz) · 4. dos confirmadas en el mismo cierre no cubren (exige exactamente una) · 5. hasta null es hoy
//   6. club-siis.mjs usa cierresSinGestion
// Uso: node tools/probar-gestion-cubre.mjs    (menos de 1 segundo; sale con 1 si algún caso falla; no toca nada)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cierresSinGestion } from './gestion-cubre.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const js = (obj) => `window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};\nObject.assign(window.CLUB_GESTIONES, ${JSON.stringify(obj)});\n`;
const g = (desde, hasta, confirmada = true) => ({ nombre: 'X', desde, hasta, confirmada });
const C = ['2018-12-31', '2019-12-31'];

caso('1. todos los cierres caen en una gestión confirmada: nada sin gestión', cierresSinGestion(js({ 'a-co': [g('2018-01-01', null)] }), 'a-co', C).length === 0);
caso('2. el club sin clave: todos los cierres sin gestión', cierresSinGestion(js({ 'otro-co': [g('2018-01-01', null)] }), 'a-co', C).join() === C.join());
caso('3. una gestión sin confirmar no cubre', cierresSinGestion(js({ 'a-co': [g('2013-10-01', '2025-10-22', false)] }), 'a-co', C).join() === C.join());
caso('4. dos confirmadas en el mismo cierre no cubren (cargar exige exactamente una)', cierresSinGestion(js({ 'a-co': [g('2018-01-01', '2019-12-31'), g('2019-06-01', null)] }), 'a-co', C).join() === '2019-12-31');
caso('4b. un hueco entre dos gestiones deja ese cierre', cierresSinGestion(js({ 'a-co': [g('2018-01-01', '2018-12-30'), g('2019-01-01', null)] }), 'a-co', C).join() === '2018-12-31');
caso('5. hasta null es hasta hoy; hasta igual al cierre cuenta', cierresSinGestion(js({ 'a-co': [g('2018-01-01', '2018-12-31'), g('2019-01-01', null)] }), 'a-co', C).length === 0);
caso('6. club-siis.mjs lista gestiones con cierresSinGestion', /cierresSinGestion\(/.test(readFileSync(resolve(import.meta.dirname, 'club-siis.mjs'), 'utf8')));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
