#!/usr/bin/env node
// ============================================================================
// tools/rarezas.mjs — LAS RAREZAS DEL DOCUMENTO YA REVISADAS: una errata (una fecha, un nombre o una cifra mal impresa) que alguien ya miró y
// explicó, registrada UNA vez donde la leen las tools, para que ningún chequeo ni subagente la vuelva a marcar (regla de Admin/CONVENCIONES.md,
// «UNA RAREZA DEL DOCUMENTO YA REVISADA…»; caso: Goiás 2018, el informe del auditor fechado «24 de abril de 2018» para el ejercicio 2018).
//
// POR QUÉ. Hasta acá la explicación quedaba en texto libre (la nota de Admin/registros/auditoria.jsonl, el motivo de un ajuste, la nota de una
// respuesta de la cola): sirve para quien la lee, pero ninguna tool la encuentra, y la próxima revisión del documento la volvía a reportar.
//
// EL ARCHIVO: Admin/registros/rarezas.jsonl (trackeado), una línea por rareza:
//   {md, linea, texto, tipo: fecha|nombre|cifra|otro, veredicto, cita, autor, fecha}
//   texto = lo que el documento imprime en esa línea (un pedazo alcanza); veredicto = qué es y qué vale en su lugar; cita = dónde se ve que es una
//   errata (otra línea del .md, otro año, el PDF).
//
// QUÉ CUBRE (veredicto de la Auditora 5, pregunta 3: que una errata registrada no tape un error nuevo). Una rareza cubre un hallazgo SOLO si
// es del MISMO .md, la línea del hallazgo está a ±3 de la registrada, esa zona del .md de hoy todavía contiene el texto registrado Y lo que
// cita el propio hallazgo (el número o el texto que marca) es lo registrado: ±3 líneas es la misma tabla, y otro número de esa tabla es otro
// problema. Otra línea, otro número, otro texto o el mismo texto en otro documento se marcan como siempre. Si una re-transcripción mueve el texto más de 3
// líneas, la rareza no cubre nada: audit.js lo dice (`rareza-sin-su-texto`) y hay que moverla.
// Una rareza de cifra dice que el documento está mal, no qué valor se carga: esa decisión sigue siendo un ajuste (tools/ajustes.mjs) o la
// respuesta de la cola. Por eso verificar.mjs no saca el caso de la cola: lo anota.
//
// QUIÉN LA LEE: audit.js (`coma-comida` no marca una línea cubierta; `rareza-sin-su-texto`), auditoria.mjs --extractos (el extracto del
// subagente termina con las rarezas de sus documentos) y cola.mjs (la muestra al lado del caso cuyas líneas la cubren).
//
// USO:
//   node tools/rarezas.mjs --agregar --md "<ruta del .md>" --linea N --texto "<lo impreso>" --tipo fecha|nombre|cifra|otro \
//        --veredicto "<qué es>" --cita "<dónde se ve>" [--autor "Claude"]         valida y agrega
//   node tools/rarezas.mjs [--md "<ruta del .md>"]                                   lista (todas, o las de ese documento)
//   node tools/rarezas.mjs --check                                                   sale con 1 si alguna perdió su texto (lo corre audit.js)
//   import { rarezaEn, rarezasDe, sinSuTexto } from './rarezas.mjs';
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
// firma quien corre el comando, como un ajuste (autorPorDefecto de ajustes.mjs; no se importa para que audit.js cargue este archivo liviano)
const autorPorDefecto = () => (process.env.CLAUDECODE === '1' ? 'Claude' : 'Guido');

const ROOT = resolve(import.meta.dirname, '..');
export const ARCHIVO = process.env.RAREZAS_ARCHIVO || resolve(ROOT, 'Admin', 'registros', 'rarezas.jsonl');
export const TIPOS = ['fecha', 'nombre', 'cifra', 'otro'];
const VENTANA = 3;

// la misma normalización que auditoria.mjs para sus citas: comillas tipográficas y espacios
const norm = (s) => String(s).normalize('NFC').replace(/[‘’´`]/g, "'").replace(/[“”«»]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
const clave = (md) => String(md).normalize('NFC');

let cache = null;
export function leer() {
  if (cache) return cache;
  cache = !existsSync(ARCHIVO) ? [] : readFileSync(ARCHIVO, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
  return cache;
}
export const rarezasDe = (md) => leer().filter((r) => clave(r.md) === clave(md));

const lineasMd = new Map();
function lineas(md) {
  const k = clave(md);
  if (!lineasMd.has(k)) { const abs = resolve(ROOT, k); lineasMd.set(k, existsSync(abs) ? readFileSync(abs, 'utf8').split('\n') : null); }
  return lineasMd.get(k);
}
// ¿el texto registrado sigue en su línea ±3 del .md de hoy?
const conSuTexto = (r) => { const ls = lineas(r.md); return !!ls && norm(ls.slice(Math.max(0, r.linea - 1 - VENTANA), r.linea + VENTANA).join(' ')).includes(norm(r.texto)); };

// ¿lo que cita el hallazgo es lo registrado? Un número tiene que estar ENTERO en el texto registrado («32» no es «322», ni «458» es «3.458.890»);
// un texto, contenido en el registrado o conteniéndolo.
const NUM = /^[(\-]?[\d.,\s]*\d[\d.,\s]*\)?$/;
function citaLoRegistrado(r, citado) {
  const c = norm(citado); if (!c) return false; const t = norm(r.texto);
  if (NUM.test(c)) { const n = c.replace(/[()\-\s]/g, ''); return new RegExp(`(?<![\\d.,])${n.replace(/[.]/g, '\\.')}(?![\\d.,]*\\d)`).test(t); }
  return t.includes(c) || c.includes(t);
}
// La rareza que cubre un hallazgo en `md`, línea `linea` (1-based), que cita `citado` (el número o el texto que marca), o null. Ver QUÉ CUBRE.
// Sin `citado` no cubre nada: la proximidad sola taparía un error nuevo de la fila de al lado (Auditora 5, cambio 1).
export function rarezaEn(md, linea, citado) {
  return rarezasDe(md).find((r) => Math.abs(Number(linea) - r.linea) <= VENTANA && conSuTexto(r) && citaLoRegistrado(r, citado)) || null;
}
// Las que cubren alguna línea de un rango [desde, hasta] (un caso de la cola).
export const rarezasEnRango = (md, desde, hasta) => rarezasDe(md).filter((r) => r.linea >= desde - VENTANA && r.linea <= hasta + VENTANA && conSuTexto(r));
export const sinSuTexto = () => leer().filter((r) => !conSuTexto(r));
export const describir = (r) => `${r.md}:${r.linea} «${r.texto}» (${r.tipo}): ${r.veredicto}. Cita: ${r.cita}. ${r.autor}, ${r.fecha}`;

function agregar(o) {
  const errores = [];
  if (!o.md || !existsSync(resolve(ROOT, o.md))) errores.push(`--md: ${o.md || '(falta)'} no existe`);
  if (!Number.isInteger(o.linea) || o.linea < 1) errores.push('--linea: un número de línea del .md (desde 1)');
  if (!o.texto) errores.push('--texto: lo que el documento imprime en esa línea');
  if (!TIPOS.includes(o.tipo)) errores.push(`--tipo: ${TIPOS.join(' | ')}`);
  if (!o.veredicto) errores.push('--veredicto: qué es y qué vale en su lugar');
  if (!o.cita) errores.push('--cita: dónde se ve que es una errata');
  // (Auditora 5, cambio 2) una errata se prueba con la línea que dice el valor o la suma: la cita nombra una línea (L1023) o una página (pág. 41)
  else if (!/\bL\d+|p[áa]g\.?\s*\d+/i.test(o.cita)) errores.push('--cita: tiene que decir la línea (L<número>) o la página (pág. <número>) donde se ve que es una errata');
  if (!errores.length && !conSuTexto(o)) errores.push(`«${o.texto}» no está en ${o.md}:${o.linea} (±${VENTANA})`);
  if (!errores.length && rarezasDe(o.md).some((r) => norm(r.texto) === norm(o.texto))) errores.push(`ya está registrada: ${o.md} «${o.texto}»`);
  if (errores.length) { console.error(`No se agregó:\n  ${errores.join('\n  ')}`); process.exit(1); }
  // se guarda la línea EXACTA donde está el texto (la más cercana a la dada), así la ventana de ±3 se mide desde ahí
  const ls = lineas(o.md); let exacta = o.linea;
  for (let d = 0; d <= VENTANA; d++) { const c = [o.linea - d, o.linea + d].find((n) => ls[n - 1] != null && norm(ls[n - 1]).includes(norm(o.texto))); if (c) { exacta = c; break; } }
  const r = { md: clave(o.md), linea: exacta, texto: o.texto, tipo: o.tipo, veredicto: o.veredicto, cita: o.cita, autor: o.autor, fecha: new Date().toISOString().slice(0, 10) };
  appendFileSync(ARCHIVO, JSON.stringify(r) + '\n'); cache = null;
  console.log(`Agregada: ${describir(r)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2);
  const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : undefined; };
  if (A.includes('--agregar')) agregar({ md: flag('--md'), linea: Number(flag('--linea')), texto: flag('--texto'), tipo: flag('--tipo'), veredicto: flag('--veredicto'), cita: flag('--cita'), autor: flag('--autor') || autorPorDefecto() });
  else if (A.includes('--check')) {
    const malas = sinSuTexto();
    for (const r of malas) console.error(`${r.md}:${r.linea} «${r.texto}»: el texto ya no está en esa línea ±${VENTANA} (¿se re-transcribió?); movela o sacala`);
    if (malas.length) process.exit(1);
    console.log(`${leer().length} rarezas, todas con su texto en su línea.`);
  } else {
    const rs = flag('--md') ? rarezasDe(flag('--md')) : leer();
    for (const r of rs) console.log(describir(r));
    if (!rs.length) console.log('Sin rarezas registradas' + (flag('--md') ? ` para ${flag('--md')}` : '') + '.');
  }
}
