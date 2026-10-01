#!/usr/bin/env node
// ============================================================================
// tools/localizar.mjs — ETAPA 3 del proceso nuevo: qué BLOQUES de la transcripción son el estado de resultados del ejercicio y qué bloques
// son las notas que desglosan sus ingresos y sus gastos. IA (Claude Opus 5.5, esfuerzo bajo), ~US$ 0,02 por documento.
//
// POR QUÉ (Versión 324; proceso completo en Admin/HANDOFF-pipeline.md, "El proceso nuevo"): la selección por palabras clave
// (proponer-carga.mjs seleccionarFilas) reproduce los ingresos de producción en 7-11% de los años ya cargados; el test por página
// (localizar-extraer.mjs) llegó a 42% de ingresos y 69% de gastos, pero Guido descartó elegir páginas enteras ("el estado de resultados puede
// arrancar por la mitad de la página"). Acá la IA ve el ÍNDICE DE BLOQUES (tools/indice-bloques.mjs: una ficha por tabla o bloque de texto con
// cifras) y elige bloques.
//
// QUÉ DEVUELVE (Generados/.../<doc>.ubicacion.json):
//   sin_estado          true si el documento NO tiene estado de resultados del ejercicio (memoria sola, dictamen del auditor, balance solo).
//                       No es un error: el documento queda como fuente. (En el test por página pasó 5 de 31 veces y las 5 tenía razón.)
//   estado              ids de los bloques del estado de resultados (en orden; más de uno si sigue en otro bloque)
//   notas_ingresos / notas_gastos   ids de los bloques que desglosan renglones del estado
//   escala, escala_evidencia        la unidad del estado y la frase que lo dice (se CONFIRMA en verificar.mjs, no se confía acá)
//   moneda, columna_ejercicio, columna_anterior   encabezados de las dos columnas (la del año anterior la usa el chequeo contra lo ya cargado)
//   perimetro           individual / consolidado / ambos / no se sabe (si "ambos", qué bloques son de cuál en `observaciones`)
//   necesito_ver        ids que la IA quiere ver enteros antes de decidir: se hace UNA segunda llamada con el texto completo de esos bloques
//   dudas               lo que no pudo resolver y tiene que mirar una persona (va a la cola humana, tools/cola.mjs)
//
// DESGLOSES ANIDADOS Y SEGMENTOS (Versión 335, diseño aprobado por Guido): una nota puede desglosar un renglón de OTRA nota, y un cuadro por
// segmento sirve cuando la columna de un segmento abre un renglón que nadie más abre. Caso real, UC 2021-2025: "Ingresos Comerciales" (nota 19)
// solo se abre en la nota de segmentos, columna "Comerciales" (socios, escuelas de fútbol, publicidad, tienda, merchandising); 2022-2024 se
// cargaron así. Los cuadros por jugador no se eligen: abrirían "Préstamo de jugadores" en nombres propios.
// QUÉ PUEDE SALIR MAL (riesgos de la etapa 3 en el HANDOFF): elegir el balance, un presupuesto, la conciliación del impuesto o el otro perímetro;
// quedarse con la mitad de un estado partido. Todo eso lo frena verificar.mjs (no cierra con totales, resultado ni el año anterior cargado).
//
// USO:
//   node tools/localizar.mjs "<pdf>" [...]          ENSAYO: arma el pedido y estima el costo, sin API
//   node tools/localizar.mjs "<pdf>" --ejecutar     llama a Claude (no repite si ya existe el .ubicacion.json; --rehacer lo fuerza)
//   node tools/localizar.mjs --lista <archivo> [--ejecutar]
// ============================================================================

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { indiceBloques, ficha, textoDeBloque } from './indice-bloques.mjs';
import { derivado } from './rutas.mjs';
import { llamarClaude, tokensDe, usdEstimado, MODELO } from './claude-llamada.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['sin_estado', 'estado', 'notas_ingresos', 'notas_gastos', 'escala', 'escala_evidencia', 'moneda', 'columna_ejercicio', 'columna_anterior', 'perimetro', 'necesito_ver', 'dudas', 'observaciones'],
  properties: {
    sin_estado: { type: 'boolean' },
    estado: { type: 'array', items: { type: 'string' } },
    notas_ingresos: { type: 'array', items: { type: 'string' } },
    notas_gastos: { type: 'array', items: { type: 'string' } },
    escala: { type: 'string', enum: ['unidades', 'miles', 'millones', 'no se sabe'] },
    escala_evidencia: { type: 'string' },
    moneda: { type: 'string' },
    columna_ejercicio: { type: 'string' },
    columna_anterior: { type: ['string', 'null'] },
    perimetro: { type: 'string', enum: ['individual', 'consolidado', 'ambos', 'no se sabe'] },
    necesito_ver: { type: 'array', items: { type: 'string' } },
    dudas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['pregunta', 'propuesta', 'texto', 'bloques', 'afecta_carga'], properties: { pregunta: { type: 'string' }, propuesta: { type: 'string', enum: ['sí', 'no'] }, texto: { type: 'string' }, bloques: { type: 'array', items: { type: 'string' } }, afecta_carga: { type: 'boolean' } } } },
    observaciones: { type: 'string' },
  },
};
export const SYSTEM = `Sos analista de estados financieros de clubes de fútbol. Te paso el ÍNDICE de los bloques (tablas y bloques de texto con cifras) de la transcripción de un documento (balance, cuentas anuales, memoria), en cualquier idioma. Cada bloque tiene: página, las líneas de texto que tiene arriba (títulos, "en miles de..."), su encabezado, sus primeras y últimas filas, y si continúa a otro bloque.

Elegí:
- estado: los bloques del ESTADO DE RESULTADOS del ejercicio pedido (cuenta de pérdidas y ganancias, estado de recursos y gastos, DRE, GuV, resultatregnskap, winst- en verliesrekening, conto economico...). Incluí los bloques que lo continúan.
- notas_ingresos / notas_gastos: los bloques de notas o anexos que DESGLOSAN renglones de ingresos o de gastos de ese estado, o renglones de otra nota (un desglose dentro de otro: la nota de ingresos tiene "Ingresos Comerciales" y otro cuadro lo abre en socios, publicidad, tienda...).
- Un cuadro POR SEGMENTO (columnas por unidad de negocio) se elige SOLO si la columna de un segmento desglosa un renglón que el estado o sus notas no abren (ej.: la columna "Comerciales" abre "Ingresos Comerciales"); si solo repite importes que ya están abiertos, no.
NO elijas: balance (activo/pasivo), flujo de efectivo, evolución del patrimonio, destino del resultado, cuadros de bienes de uso / activo fijo, conciliaciones de impuestos, presupuestos, indicadores, listas de deudas o contratos, ni cuadros de detalle POR JUGADOR, por contrato o por persona (venta o préstamo de cada jugador: no dicen nada de la categoría).
- Si el documento no tiene estado de resultados de ese ejercicio, sin_estado = true.
- Si hay estado consolidado e individual: elegí el consolidado salvo que te indique otro perímetro; poné perimetro "ambos" y explicá en observaciones qué bloque es de cuál.
- escala del estado (y la frase que lo dice en escala_evidencia), moneda (ISO), y los encabezados de la columna del ejercicio pedido y de la del año anterior.
- Si para decidir necesitás ver un bloque entero, ponelo en necesito_ver (máximo 6) y no lo elijas todavía.
- Lo que no puedas resolver con lo que ves, escribilo en dudas (una frase cada una): lo va a mirar una persona. No adivines. Cada duda: pregunta (UNA pregunta concreta que una persona contesta con sí o no mirando el PDF: qué tabla o fila, qué importe, qué se haría; ej. "¿Se deja afuera de la carga el cuadro 'Venta de jugadores al 31-12-2024' (L4070-L4072)?"), propuesta (sí o no: lo que harías vos), texto (por qué, una frase, con la línea si la hay), bloques (los ids que nombra) y afecta_carga: true SOLO si resolverla puede cambiar qué filas se cargan o un importe que se carga en más que el redondeo. NO son dudas (o van con afecta_carga false): una diferencia de 1 unidad impresa entre dos tablas (es redondeo), un total que el documento no imprime (se resuelve sumando), un cuadro de detalle de una fila que ya está en otra tabla.`;

function pedido(pdf, registro, sitio) {
  const e = registro.find((x) => x.pdf === pdf) || {};
  const cierre = e.periodo?.cierre || null;
  return { md: e.md || pdf.replace(/\.pdf$/, '.md'), texto: `Documento: ${pdf.split('/').slice(1).join(' / ')}. Ejercicio pedido: el que cierra el ${cierre || '?'}.${sitio ? ` Perímetro que el club usa en sus años ya cargados: ${sitio}.` : ''}` };
}

export async function localizar(pdf, { registro, perimetroClub = null, ejecutar = false, rehacer = false, ampliado = false, reintento = null } = {}) {
  const { md, texto } = pedido(pdf, registro, perimetroClub);
  const out = resolve(ROOT, derivado(md, '.ubicacion.json'));
  if (!rehacer && existsSync(out)) return { hecho: true, archivo: out, datos: JSON.parse(readFileSync(out, 'utf8')), costo: 0 };
  const mdText = readFileSync(resolve(ROOT, md), 'utf8');
  const { bloques } = indiceBloques(mdText, { ampliado }); // ampliado: solo en el reintento (lote.mjs --reintentar)
  const visibles = bloques.filter((b) => b.cifras >= 2);
  // REINTENTO (Versión 340): qué faltó en el intento anterior, para que elija también el cuadro que lo abre (por ejemplo, uno por segmento).
  const faltas = (reintento || []).map((x) => (x.categoria ? `no apareció ninguna fila de "${x.categoria}"` : `el desglose de "${x.renglon}" no sumó (${x.suma} contra ${x.objetivo})`));
  const user = `${texto}${faltas.length ? `\n\nREINTENTO: en el intento anterior ${faltas.join('; ')}. Elegí también los cuadros que abren esos renglones (notas, anexos o cuadros por segmento).` : ''}\n\nÍNDICE (${visibles.length} bloques con cifras):\n\n${visibles.map(ficha).join('\n\n')}`;
  if (!ejecutar) return { ensayo: true, tokens: tokensDe(SYSTEM + user), usd: usdEstimado(tokensDe(SYSTEM + user), 1500) };
  let r = await llamarClaude({ system: SYSTEM, user, schema: SCHEMA, tarea: 'localizar', pdf }); let costo = r.costo || 0;
  if (r.error) return { error: r.error, costo };
  // Paso intermedio: la IA pidió ver bloques enteros antes de decidir -> una segunda llamada con su texto completo.
  if (r.datos.necesito_ver?.length) {
    const ver = r.datos.necesito_ver.map((id) => bloques.find((b) => b.id === id)).filter(Boolean).slice(0, 6);
    const r2 = await llamarClaude({ system: SYSTEM, user: `${user}\n\nTEXTO COMPLETO de los bloques que pediste ver:\n\n${ver.map((b) => `[${b.id}] pág. ${b.pagina}\n${textoDeBloque(mdText, b)}`).join('\n\n')}\n\nAhora decidí (necesito_ver tiene que quedar vacío).`, schema: SCHEMA, tarea: 'localizar-2', pdf });
    costo += r2.costo || 0; if (!r2.error) r = r2;
  }
  const datos = { pdf, md, modelo: MODELO, generado: new Date().toISOString(), ...(ampliado ? { indiceAmpliado: true } : {}), bloques: Object.fromEntries(bloques.map((b) => [b.id, { pagina: b.pagina, lineas: b.lineas, tipo: b.tipo }])), ...r.datos };
  writeFileSync(out, JSON.stringify(datos, null, 1));
  return { hecho: true, archivo: out, datos, costo };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const docs = flag('--lista') ? readFileSync(resolve(ROOT, flag('--lista')), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')) : ARGS.filter((a) => !a.startsWith('--'));
  if (!docs.length) { console.error('Uso: node tools/localizar.mjs "<pdf>" [--ejecutar] [--rehacer]  |  --lista <archivo>'); process.exit(1); }
  const registro = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  let usd = 0;
  for (const pdf of docs) {
    const r = await localizar(pdf, { registro, ejecutar: ARGS.includes('--ejecutar'), rehacer: ARGS.includes('--rehacer') });
    if (r.ensayo) { usd += r.usd; console.log(`  ensayo ${pdf}: ~${r.tokens} tokens, ~US$ ${r.usd.toFixed(3)}`); }
    else if (r.error) console.log(`  ERROR ${pdf}: ${r.error}`);
    else { usd += r.costo; const d = r.datos; console.log(`  ${pdf}: ${d.sin_estado ? 'SIN ESTADO DE RESULTADOS' : `estado ${d.estado.join(',')} · notas ingresos ${d.notas_ingresos.join(',') || '-'} · notas gastos ${d.notas_gastos.join(',') || '-'} · ${d.escala} (${d.escala_evidencia}) · ${d.perimetro}`}${d.dudas?.length ? ` · DUDAS: ${d.dudas.map((x) => (typeof x === 'string' ? x : `${x.pregunta || x.texto} [propuesta: ${x.propuesta || '?'}]${x.afecta_carga ? '' : ' (no afecta la carga)'}`)).join(' | ')}` : ''}`); }
  }
  console.log(`\n${ARGS.includes('--ejecutar') ? 'Gastado' : 'Costo estimado'}: US$ ${usd.toFixed(2)}${ARGS.includes('--ejecutar') ? '' : ' (ensayo: agregá --ejecutar)'}`);
}
