#!/usr/bin/env node
// ============================================================================
// tools/ajustes.mjs — AJUSTES MANUALES: la base de consulta de las decisiones de Guido que fuerzan un dato de un documento.
//
// POR QUÉ (Versión 366, diseño aprobado por Guido el 2026-10-02). Hasta la 365 una decisión manual vivía como respuesta a un caso de la cola,
// atada al TEXTO de la pregunta (tools/cola.mjs: el id del caso es un hash de pdf|etapa|motivo|detalle, y en las dudas de la IA el detalle es
// la pregunta). Si el documento se volvía a extraer y la IA redactaba distinto, el caso volvía. Y la decisión "Fortaleza CEIF 2023 se cierra
// por la fuerza" terminó escrita en el HANDOFF, que ningún script lee. Guido: "no puede ir en handoff eso. debería ir en el script".
// Un ajuste está atado a cosas ESTABLES: el documento (pdf) y el campo.
//
// EN CADA ESCALERA, EL AJUSTE ES EL ESCALÓN 0: si hay un ajuste para ese documento y ese campo, gana siempre. Queda escrito en el
// .verificacion.json ("ajustes") y cargar.mjs lo copia como comentario en la meta del año.
//
// CAMPOS (cada uno existe por un caso real; un campo nuevo se agrega acá y en el script que lo aplica):
//   resultado-final   valor: el resultado del ejercicio TAL CUAL está impreso (en la escala del documento). verificar.mjs lo toma como
//                     resultado final y DEDUCE el impuesto (resultado antes de impuestos según las filas − final). Casos: Fortaleza CEIF
//                     2023 (1.021.768: el impuesto contable no es el "a cargo" de la conciliación) y 2017 (1.347.094: el documento no
//                     imprime el impuesto en ningún lado).
//                     Con --linea (la del .md donde está impreso), también es la PISTA para localizar (Versión 370): un documento que quedó
//                     como fuente y tiene este ajuste repite una vez "las notas hacen de estado" con ese dato (lote.mjs --reintentar).
//                     Casos: Fortaleza 2018 ("Resultado Año 2018 (639,077)", L542) y 2019 ("Utilidad Contable (52,122)", L455).
//   sin-dudas         sin valor: las dudas de localizar/extraer de ese documento quedan como nota y no van a la cola. Caso: Fortaleza
//                     CEIF 2023 ("que nunca más vuelva como problema o duda").
//   fila              (Versión 368) una fila del resultado que la extracción no trajo, o trajo mal: etiqueta, lado (ingreso, gasto,
//                     financiero, impuesto), valor TAL CUAL impreso (con su signo: un costo financiero en negativo), línea del .md y,
//                     opcional, `reemplaza` = la etiqueta de la fila extraída que sale. Varias por documento (la clave incluye la etiqueta).
//                     Casos: Fortaleza CEIF 2017, nota 23 "Otros gastos" 41.780 perdida en un salto de página, y "Total Otros Ingresos"
//                     3.581 que en el PDF rotula los costos financieros (etiquetas cruzadas en el propio documento).
//
// ARCHIVO: Admin/ajustes-manuales.jsonl, una línea por ajuste: { pdf, campo, valor, motivo, evidencia, autor, fecha }. Si hay dos para el
// mismo pdf y campo (y etiqueta, en `fila`), gana el último (para cambiar uno se agrega otro; el historial queda).
//
// USO:
//   node tools/ajustes.mjs                                     lista todos (club, año, campo, valor, motivo)
//   node tools/ajustes.mjs --agregar "<pdf>" <campo> [--valor "..."] --motivo "..." [--evidencia "pág. N del visor, .md L..."]
//        fila además: --etiqueta "..." --lado ingreso|gasto|financiero|impuesto [--linea N] [--reemplaza "etiqueta extraída"]
//   import { ajusteDe, ajustesDe } from './ajustes.mjs'        lo que usan los scripts
// ============================================================================

import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ARCHIVO = resolve(ROOT, 'Admin', 'ajustes-manuales.jsonl');
export const CAMPOS = ['resultado-final', 'sin-dudas', 'fila'];
export const LADOS = ['ingreso', 'gasto', 'financiero', 'impuesto'];

function leer() {
  if (!existsSync(ARCHIVO)) return [];
  return readFileSync(ARCHIVO, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}

// Todos los ajustes vigentes de un documento (el último por campo; en `fila`, por campo + etiqueta).
export function ajustesDe(pdf) {
  const m = new Map();
  for (const a of leer()) if (a.pdf === pdf) m.set(a.campo === 'fila' ? `fila|${a.etiqueta}` : a.campo, a);
  return [...m.values()];
}
export function ajusteDe(pdf, campo) {
  return ajustesDe(pdf).find((a) => a.campo === campo) || null;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (A.includes('--agregar')) {
    const i = A.indexOf('--agregar'); const pdf = A[i + 1]; const campo = A[i + 2];
    if (!pdf || !CAMPOS.includes(campo)) { console.error(`Uso: --agregar "<pdf>" <campo> (campos: ${CAMPOS.join(', ')})`); process.exit(1); }
    if (!existsSync(resolve(ROOT, pdf))) { console.error(`No existe ${pdf}`); process.exit(1); }
    if (['resultado-final', 'fila'].includes(campo) && !flag('--valor')) { console.error(`${campo} necesita --valor (el número tal cual está impreso)`); process.exit(1); }
    if (campo === 'fila' && (!flag('--etiqueta') || !LADOS.includes(flag('--lado')))) { console.error(`fila necesita --etiqueta y --lado (${LADOS.join(', ')})`); process.exit(1); }
    if (!flag('--motivo')) { console.error('Falta --motivo'); process.exit(1); }
    const a = { pdf, campo, valor: flag('--valor'), linea: flag('--linea') ? Number(flag('--linea')) : null, ...(campo === 'fila' ? { etiqueta: flag('--etiqueta'), lado: flag('--lado'), reemplaza: flag('--reemplaza') } : {}), motivo: flag('--motivo'), evidencia: flag('--evidencia'), autor: 'Guido', fecha: new Date().toISOString().slice(0, 10) };
    appendFileSync(ARCHIVO, JSON.stringify(a) + '\n');
    console.log(`Ajuste guardado: ${pdf.split('/').slice(-2).join('/')} · ${campo}${a.etiqueta ? ` "${a.etiqueta}" (${a.lado})` : ''}${a.valor ? ` = ${a.valor}` : ''}. Lo toma la próxima corrida de verificar.mjs.`);
  } else {
    const vigentes = [...new Set(leer().map((a) => a.pdf))].flatMap((p) => ajustesDe(p));
    console.log(`AJUSTES MANUALES (${vigentes.length}) — Admin/ajustes-manuales.jsonl\n`);
    // Al lado de cada documento con `resultado-final`, el IMPUESTO que calculó verificar.mjs por diferencia (Versión 372, pedido de Guido): el
    // ajuste no tiene compuerta, así que un error en las filas termina en el impuesto. Fortaleza 2018 daba 248.440 sobre una pérdida antes de
    // impuestos (un costo financiero sumado como ingreso); con el signo bien, 40.604, y el documento imprime 40.612.
    const impuestoDe = (pdf) => { try { const V = JSON.parse(readFileSync(resolve(ROOT, derivado(pdf.replace(/\.pdf$/i, '.md'), '.verificacion.json', { crear: false })), 'utf8')); const r = V.totales?.resultadoFinal; return r?.impuestoDeducido != null ? `impuesto calculado ${r.impuestoDeducido} (antes de impuestos ${Number((V.totales.resultadoParaCargar + r.impuestoDeducido).toFixed(3))}, resultado ${r.valor}; millones)` : null; } catch { return null; } };
    for (const a of vigentes.filter((x) => x.campo === 'resultado-final')) { const t = impuestoDe(a.pdf); if (t) a.calculo = t; }
    for (const a of vigentes) console.log(`  ${a.pdf.split('/').slice(-2).join('/')} · ${a.campo}${a.etiqueta ? ` "${a.etiqueta}" (${a.lado}${a.reemplaza ? `, reemplaza "${a.reemplaza}"` : ''})` : ''}${a.valor ? ` = ${a.valor}` : ''}  (${a.autor}, ${a.fecha})\n      motivo: ${a.motivo}${a.evidencia ? `\n      evidencia: ${a.evidencia}` : ''}${a.calculo ? `\n      → ${a.calculo}` : ''}`);
  }
}
