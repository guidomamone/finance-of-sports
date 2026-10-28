#!/usr/bin/env node
// tools/probar-diferencia-de-fila.mjs — la prueba de diferencia-de-fila.mjs (ítem 2 del punto 478): «presentación distinta» por una fila de gasto o de lado `otro`, y nunca por una reexpresión.
//   1. fila de lado `otro` idéntica en los dos documentos cuyo importe es la diferencia · 2. la fila solo está en uno · 3. está en los dos con otro importe · 4. la diferencia no es ninguna fila (reexpresión)
//   5. una fila de gasto sigue explicando (Olympiacos/Cuiabá) · 6. una fila de total no cuenta · 7. importes con paréntesis (negativos) y en otra escala · 8. verificar-cierre.mjs usa filaQueExplica
// Uso: node tools/probar-diferencia-de-fila.mjs    (menos de 1 segundo; sale con 1 si algún caso falla; no toca nada)
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { filaQueExplica } from './diferencia-de-fila.mjs';

let mal = 0;
const caso = (nombre, cond, detalle = '') => { if (!cond) mal++; console.log(`${cond ? 'ok ' : 'MAL'} ${nombre}${cond ? '' : ` — ${detalle}`}`); };
const fila = (etiqueta, lado, actual, anterior) => ({ etiqueta, lado, actual, anterior, tipo: 'renglon' });

// dos estados de juguete: el del año Y (actual = Y, anterior = Y-1) y el de Y+1 (actual = Y+1, anterior = Y)
const docY = [fila('Ingresos de actividades ordinarias', 'ingreso', '100.000', '90.000'), fila('Otras ganancias (pérdidas)', 'otro', '14.900', '13.700'), fila('Gastos de ventas', 'gasto', '50.000', '48.000')];
const docY1 = [fila('Ingresos de actividades ordinarias', 'ingreso', '120.000', '85.100'), fila('Otras ganancias (pérdidas)', 'otro', '5.600', '14.900'), fila('Gastos de ventas', 'gasto', '55.000', '50.000')];
const base = { filasA: docY, filasB: docY1, colA: 'actual', colB: 'anterior' };

const r1 = filaQueExplica({ ...base, dif: 14900 });
caso('1. la fila `otro` idéntica en los dos documentos explica la diferencia', r1?.f.etiqueta === 'Otras ganancias (pérdidas)' && r1.f.lado === 'otro', JSON.stringify(r1));
caso('1b. el sentido contrario (A es el siguiente, B el del año) también', filaQueExplica({ dif: 14900, filasA: docY1, filasB: docY, colA: 'anterior', colB: 'actual' })?.f.lado === 'otro');
caso('2. la fila `otro` solo en un documento no explica nada', filaQueExplica({ ...base, filasB: docY1.filter((f) => f.lado !== 'otro'), dif: 14900 }) === null);
caso('3. la fila `otro` con otro importe en el segundo documento no explica (es una reexpresión de esa fila)', filaQueExplica({ ...base, filasB: [fila('Otras ganancias (pérdidas)', 'otro', '5.600', '14.800')], dif: 14900 }) === null);
caso('3b. otra etiqueta en el segundo documento no explica', filaQueExplica({ ...base, filasB: [fila('Otros resultados', 'otro', '5.600', '14.900')], dif: 14900 }) === null);
caso('4. una diferencia que no es ninguna fila (reexpresión) da null', filaQueExplica({ ...base, dif: 13826 }) === null);
caso('4b. dif 0 da null', filaQueExplica({ ...base, dif: 0 }) === null);
const g = filaQueExplica({ dif: 7645.06467, filasA: [fila('Δαπάνες πώλησης', 'gasto', '7.645.064,67', '0')], filasB: [], colA: 'actual', colB: 'anterior' });
caso('5. una fila de gasto de uno solo de los documentos sigue explicando', g?.f.lado === 'gasto' && g.otroLado === undefined, JSON.stringify(g));
caso('5b. el gasto se halla en cualquiera de las dos columnas', filaQueExplica({ ...base, dif: 48000 })?.f.etiqueta === 'Gastos de ventas');
caso('6. una fila de total no cuenta', filaQueExplica({ dif: 500, filasA: [fila('Total gastos', 'gasto', '500', '0')], filasB: [], colA: 'actual', colB: 'anterior' }) === null);
caso('6b. un `otro` que es un total tampoco', filaQueExplica({ dif: 500, filasA: [fila('Total otros', 'otro', '500', '0')], filasB: [fila('Total otros', 'otro', '0', '500')], colA: 'actual', colB: 'anterior' }) === null);
const n = filaQueExplica({ dif: 14.9, filasA: [fila('Otras ganancias (pérdidas)', 'otro', '(14.900.000)', '0')], filasB: [fila('Otras ganancias (pérdidas)', 'otro', '0', '(14.900.000)')], colA: 'actual', colB: 'anterior' });
caso('7. importes negativos entre paréntesis y la diferencia en otra escala (millones)', n?.f.lado === 'otro', JSON.stringify(n));
caso('8. verificar-cierre.mjs decide con filaQueExplica', /filaQueExplica\(/.test(readFileSync(resolve(import.meta.dirname, 'verificar-cierre.mjs'), 'utf8')));

console.log(mal ? `\n${mal} caso(s) MAL` : '\ntodos los casos ok');
process.exit(mal ? 1 : 0);
