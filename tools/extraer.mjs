#!/usr/bin/env node
// ============================================================================
// tools/extraer.mjs — ETAPA 5 del proceso nuevo: las FILAS de los bloques que eligió localizar.mjs, tal cual están impresas. IA (Claude Opus
// 5.5, esfuerzo bajo), ~US$ 0,05-0,10 por documento.
//
// POR QUÉ (Versión 324; proceso en Admin/HANDOFF-pipeline.md, "El proceso nuevo"). La IA COPIA Y ETIQUETA; no suma, no convierte, no
// categoriza (eso lo hace un script en verificar.mjs: un LLM no sirve para verificar aritmética, FinVerBench, arXiv 2605.29586; y la categoría
// es la etapa 7). Lecciones del test por página (localizar-extraer.mjs) ya incorporadas:
//   - ESCALA POR BLOQUE, no por documento: en 1. FC Köln la nota de ingresos está en miles y el estado en euros con céntimos; con una escala
//     por documento la suma salía mil veces chica.
//   - LÍNEA DEL .md de cada fila (las líneas se le pasan numeradas): la cola humana dice "mirá la línea 412 del .md" sin buscar.
//   - TAMBIÉN la columna del AÑO ANTERIOR: verificar.mjs la compara con el año anterior ya cargado en el sitio (el chequeo más fuerte que
//     tenemos: confirma columna, escala y tablas de una vez).
//
// QUÉ DEVUELVE (Generados/.../<doc>.filas.json): por fila: bloque, linea, etiqueta e importe del ejercicio y del año anterior TAL CUAL impresos,
// tipo (renglon / subtotal / total / resultado), lado (ingreso / gasto / financiero / impuesto / resultado / otro) y detalla_a (la etiqueta del
// renglón del estado que la fila desglosa, si es de una nota). Además: escala de cada bloque con su evidencia, los totales y el resultado
// impresos, y `dudas` (lo que no pudo leer: va a la cola humana).
//
// QUÉ PUEDE SALIR MAL: fila del lado equivocado, "total" que es renglón o al revés, nota unida al renglón equivocado, filas salteadas. Lo
// frena verificar.mjs (los renglones no dan el resultado impreso / el año anterior). La respuesta se guarda: no se vuelve a pedir (no cambia
// entre corridas).
//
// USO:
//   node tools/extraer.mjs "<pdf>" [...]        ENSAYO (sin API)
//   node tools/extraer.mjs "<pdf>" --ejecutar   (necesita el .ubicacion.json de localizar.mjs; --rehacer fuerza)
//   node tools/extraer.mjs --lista <archivo> [--ejecutar]
// ============================================================================

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { llamarClaude, tokensDe, usdEstimado, MODELO } from './claude-llamada.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['escalas', 'filas', 'total_ingresos', 'total_gastos', 'resultado', 'dudas', 'observaciones'],
  properties: {
    escalas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['bloque', 'escala', 'evidencia'], properties: { bloque: { type: 'string' }, escala: { type: 'string', enum: ['unidades', 'miles', 'millones', 'no se sabe'] }, evidencia: { type: 'string' } } } },
    filas: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['bloque', 'linea', 'etiqueta', 'actual', 'anterior', 'tipo', 'lado', 'detalla_a'],
        properties: {
          bloque: { type: 'string' }, linea: { type: 'integer' }, etiqueta: { type: 'string' },
          actual: { type: 'string' }, anterior: { type: ['string', 'null'] },
          tipo: { type: 'string', enum: ['renglon', 'subtotal', 'total', 'resultado'] },
          lado: { type: 'string', enum: ['ingreso', 'gasto', 'financiero', 'impuesto', 'resultado', 'otro'] },
          detalla_a: { type: ['string', 'null'] },
        },
      },
    },
    total_ingresos: { type: ['object', 'null'], additionalProperties: false, required: ['linea', 'actual'], properties: { linea: { type: 'integer' }, actual: { type: 'string' } } },
    total_gastos: { type: ['object', 'null'], additionalProperties: false, required: ['linea', 'actual'], properties: { linea: { type: 'integer' }, actual: { type: 'string' } } },
    resultado: { type: ['object', 'null'], additionalProperties: false, required: ['linea', 'actual', 'anterior'], properties: { linea: { type: 'integer' }, actual: { type: 'string' }, anterior: { type: ['string', 'null'] } } },
    dudas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['pregunta', 'propuesta', 'texto', 'bloques', 'afecta_carga'], properties: { pregunta: { type: 'string' }, propuesta: { type: 'string', enum: ['sí', 'no'] }, texto: { type: 'string' }, bloques: { type: 'array', items: { type: 'string' } }, afecta_carga: { type: 'boolean' } } } },
    observaciones: { type: 'string' },
  },
};
export const SYSTEM = `Sos analista de estados financieros de clubes de fútbol. Te paso bloques de la transcripción de un documento: el estado de resultados de un ejercicio y las notas que desglosan sus ingresos y gastos. Cada línea viene con su número ("L412: ..."). Extraé TODAS las filas con importe, en orden.

Por fila:
- bloque y linea: de dónde sale.
- etiqueta: el texto del renglón TAL CUAL (sin traducir ni corregir).
- actual: el importe de la columna del ejercicio pedido TAL CUAL (puntos, comas, paréntesis, signo). anterior: el de la columna del año anterior, o null si no hay.
- tipo: renglon (una partida), subtotal (suma de las de arriba), total (total de ingresos o de gastos), resultado (operativo, antes de impuestos, del ejercicio).
- lado: ingreso, gasto, financiero (intereses, diferencias de cambio, resultado financiero, RECPAM), impuesto (impuesto a las ganancias), resultado, otro.
- detalla_a: si la fila es de una NOTA que desglosa un renglón del estado, la etiqueta EXACTA de ese renglón; si es del estado, null.
Además: la escala de CADA bloque (unidades, miles, millones; pueden ser distintas entre el estado y las notas) con la frase que lo dice; la línea y el importe del total de ingresos, del total de gastos y del resultado del ejercicio si están impresos (si no, null).
No sumes, no conviertas, no inventes. Si algo no se lee o es ambiguo, dejalo afuera y escribilo en dudas (una frase cada una, con la línea): lo va a mirar una persona. Cada duda: pregunta (UNA pregunta concreta que una persona contesta con sí o no mirando el PDF: qué tabla o fila, qué importe, qué se haría; ej. "¿Se deja afuera de la carga el cuadro 'Venta de jugadores al 31-12-2024' (L4070-L4072)?"), propuesta (sí o no: lo que harías vos), texto (por qué, una frase, con la línea si la hay), bloques (los ids que nombra) y afecta_carga: true SOLO si resolverla puede cambiar qué filas se cargan o un importe que se carga en más que el redondeo. NO son dudas (o van con afecta_carga false): una diferencia de 1 unidad impresa entre dos tablas (es redondeo), un total que el documento no imprime (se resuelve sumando), un cuadro de detalle de una fila que ya está en otra tabla.`;

export async function extraer(pdf, { registro, ejecutar = false, rehacer = false } = {}) {
  const e = registro.find((x) => x.pdf === pdf) || {}; const md = e.md || pdf.replace(/\.pdf$/, '.md');
  const pUb = resolve(ROOT, derivado(md, '.ubicacion.json', { crear: false }));
  if (!existsSync(pUb)) return { error: 'falta el .ubicacion.json (correr localizar.mjs antes)' };
  const ub = JSON.parse(readFileSync(pUb, 'utf8'));
  if (ub.sin_estado) return { sinEstado: true };
  const out = resolve(ROOT, derivado(md, '.filas.json'));
  if (!rehacer && existsSync(out)) return { hecho: true, archivo: out, datos: JSON.parse(readFileSync(out, 'utf8')), costo: 0 };
  const L = readFileSync(resolve(ROOT, md), 'utf8').split('\n');
  const ids = [...new Set([...ub.estado, ...ub.notas_ingresos, ...ub.notas_gastos])].filter((id) => ub.bloques[id]);
  if (!ids.length) return { error: 'localizar no eligió ningún bloque' };
  // Cada bloque con sus 3 líneas de arriba (el título y la escala suelen estar ahí), numeradas.
  const texto = ids.map((id) => { const b = ub.bloques[id]; const desde = Math.max(1, b.lineas[0] - 3); return `[${id}] pág. ${b.pagina}\n${L.slice(desde - 1, b.lineas[1]).map((l, k) => `L${desde + k}: ${l}`).join('\n')}`; }).join('\n\n');
  const user = `Documento: ${pdf.split('/').slice(1).join(' / ')}. Ejercicio pedido: columna "${ub.columna_ejercicio}" (cierre ${e.periodo?.cierre || '?'}); año anterior: columna "${ub.columna_anterior || '?'}". Bloques del estado: ${ub.estado.join(', ')}; notas de ingresos: ${ub.notas_ingresos.join(', ') || '-'}; notas de gastos: ${ub.notas_gastos.join(', ') || '-'}.\n\n${texto}`;
  if (!ejecutar) { const t = tokensDe(SYSTEM + user); return { ensayo: true, tokens: t, usd: usdEstimado(t, 4000) }; }
  const r = await llamarClaude({ system: SYSTEM, user, schema: SCHEMA, tarea: 'extraer', pdf, maxTokens: 32000 });
  if (r.error) return { error: r.error, costo: r.costo };
  const datos = { pdf, md, modelo: MODELO, generado: new Date().toISOString(), ubicacion: { estado: ub.estado, notas_ingresos: ub.notas_ingresos, notas_gastos: ub.notas_gastos }, ...r.datos };
  writeFileSync(out, JSON.stringify(datos, null, 1));
  return { hecho: true, archivo: out, datos, costo: r.costo };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const docs = flag('--lista') ? readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : ARGS.filter((a) => !a.startsWith('--'));
  if (!docs.length) { console.error('Uso: node tools/extraer.mjs "<pdf>" [--ejecutar] [--rehacer]  |  --lista <archivo>'); process.exit(1); }
  const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  let usd = 0;
  for (const pdf of docs) {
    const r = await extraer(pdf, { registro, ejecutar: ARGS.includes('--ejecutar'), rehacer: ARGS.includes('--rehacer') });
    if (r.ensayo) { usd += r.usd; console.log(`  ensayo ${pdf}: ~${r.tokens} tokens, ~US$ ${r.usd.toFixed(3)}`); }
    else if (r.sinEstado) console.log(`  ${pdf}: sin estado de resultados (queda como fuente)`);
    else if (r.error) console.log(`  ${pdf}: ${r.error}`);
    else { usd += r.costo; console.log(`  ${pdf}: ${r.datos.filas.length} filas${r.datos.dudas?.length ? ` · DUDAS: ${r.datos.dudas.map((x) => (typeof x === 'string' ? x : `${x.pregunta || x.texto} [propuesta: ${x.propuesta || '?'}]${x.afecta_carga ? '' : ' (no afecta la carga)'}`)).join(' | ')}` : ''}`); }
  }
  console.log(`\n${ARGS.includes('--ejecutar') ? 'Gastado' : 'Costo estimado'}: US$ ${usd.toFixed(2)}`);
}
