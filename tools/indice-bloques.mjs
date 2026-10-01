#!/usr/bin/env node
// ============================================================================
// tools/indice-bloques.mjs — ETAPA 3a del proceso nuevo (localizar): el ÍNDICE DE BLOQUES de una transcripción. Gratis, sin IA.
//
// POR QUÉ EXISTE (Versión 324, diseño acordado con Guido el 2026-10-01; ver Admin/HANDOFF-pipeline.md, "El proceso nuevo"). El test
// localizar-extraer.mjs elegía PÁGINAS enteras, y Guido lo descartó con razón: "a veces el estado de resultados puede arrancar por la mitad de
// la página". Una página puede tener el final del balance y el comienzo del resultado, y un estado puede seguir en la página siguiente.
// Entonces se localiza por BLOQUE: cada tabla de la transcripción (y cada bloque de texto con cifras que no quedó como tabla) es una unidad,
// con una FICHA corta que es lo único que ve la IA de localizar (tools/localizar.mjs):
//   id          'b1', 'b2'... en el orden del documento
//   tipo        'tabla' (líneas que empiezan con "|") o 'texto' (3+ líneas seguidas con importes y sin "|": estados que Mistral transcribió
//               como texto plano, como Corinthians 2024-25, o listas con viñetas como el Einzelabschluss de Bayern)
//   pagina      la de la marca "--- pág. N ---" anterior
//   lineas      [desde, hasta] en el .md (1 = primera línea): con esto la cola humana dice "abrí el .md en las líneas X-Y"
//   arriba      las 3 líneas de texto no vacías de arriba (el título, "en miles de pesos", "Nota 20 - Ingresos"...)
//   encabezado  las celdas de la primera fila (tablas)
//   filas       cuántas filas con contenido
//   primeras / ultimas   las 3 primeras y las 2 últimas etiquetas de fila
//   cifras      cuántos importes tiene
//   continuaDe  el id del bloque anterior si este parece su continuación en la página siguiente (tabla sin fila separadora "| --- |" y con la
//               misma cantidad de columnas, inmediatamente después de otra tabla de la página anterior o la misma)
//
// CÓMO PUEDE FALLAR (y dónde se ataja):
//   - Mistral partió una tabla en dos por un membrete o una imagen en el medio: quedan dos bloques; el segundo se marca `continuaDe` si no
//     repite el encabezado. Si lo repite, son dos bloques y la IA de localizar ve que tienen el mismo encabezado.
//   - Dos tablas distintas pegadas sin línea en el medio: quedan como una. La IA lo ve en `primeras` / `ultimas` y puede pedir ver el bloque
//     entero; la etapa 6 (verificar) lo frena si mezcla cosas (no cierra).
//   - Un estado transcripto como texto con los importes en otra línea que la etiqueta: no forma bloque (cada línea tiene que tener su importe).
//     Lo detecta localizar ("no encuentro el estado") -> cola humana con la página para mirar.
//   - Cifras sin separador (menos de 1.000, o años): se cuentan como cifras si tienen 4+ dígitos; un "25" suelto no.
//
// USO:
//   node tools/indice-bloques.mjs "<pdf o md>"            imprime el índice (lo que vería la IA)
//   node tools/indice-bloques.mjs "<pdf o md>" --json     el JSON
//   import { indiceBloques } from './indice-bloques.mjs';  indiceBloques(textoDelMd) -> { bloques }
// ============================================================================

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PAG_RE = /^---\s*pág\.\s*(\d+)\s*---/i;
// Un importe: dígitos con separador de miles/decimal ("1.234", "12,345.67", "(3.743)", "1 234 567") o 4+ dígitos seguidos.
const IMPORTE_RE = /\(?-?\d{1,3}(?:[.,' ]\d{3})+(?:[.,]\d{1,2})?\)?|\(?-?\d+[.,]\d{1,2}\)?|\b\d{4,}\b/g;
const celdas = (l) => { const c = l.split('|').map((x) => x.trim()); if (c[0] === '') c.shift(); if (c.length && c[c.length - 1] === '') c.pop(); return c; };
const esSeparador = (l) => celdas(l).every((c) => /^:?-{2,}:?$/.test(c) || c === '');
const limpia = (s) => String(s || '').replace(/\*\*/g, '').replace(/<br\s*\/?>/gi, ' ').trim();
const cuantas = (s) => (String(s).match(IMPORTE_RE) || []).length;

export function indiceBloques(md) {
  const L = md.split('\n'); const bloques = []; let pagina = 1; const textoReciente = [];
  const empuja = (b) => { b.id = `b${bloques.length + 1}`; bloques.push(b); };
  let i = 0;
  while (i < L.length) {
    const linea = L[i]; const m = linea.match(PAG_RE);
    if (m) { pagina = Number(m[1]); i++; continue; }
    if (linea.trim().startsWith('|')) {
      const desde = i; const filasTxt = [];
      while (i < L.length && L[i].trim().startsWith('|')) { filasTxt.push(L[i]); i++; }
      const conSep = filasTxt.some(esSeparador);
      const datos = filasTxt.filter((l) => !esSeparador(l)).map(celdas);
      const encabezado = conSep ? datos[0] || [] : [];
      const cuerpo = conSep ? datos.slice(1) : datos;
      const etiquetas = cuerpo.map((c) => limpia(c[0])).filter(Boolean);
      const previo = bloques[bloques.length - 1];
      const continuaDe = !conSep && previo && previo.tipo === 'tabla' && pagina - previo.pagina <= 1 && previo.columnas === (datos[0] || []).length ? previo.id : null;
      empuja({ tipo: 'tabla', pagina, lineas: [desde + 1, i], arriba: textoReciente.slice(-3), encabezado: encabezado.map(limpia), columnas: (datos[0] || []).length, filas: cuerpo.length, primeras: etiquetas.slice(0, 3), ultimas: etiquetas.slice(-2), cifras: cuerpo.reduce((a, c) => a + cuantas(c.slice(1).join(' ')), 0), continuaDe });
      textoReciente.length = 0; continue;
    }
    // Bloque de texto con importes: 3+ líneas seguidas (se tolera una línea en blanco en el medio) que terminan en importes.
    const conImporte = (l) => l.trim() && !l.trim().startsWith('|') && !PAG_RE.test(l) && /\p{L}{2,}/u.test(l) && (l.match(IMPORTE_RE) || []).length >= 1 && /[\d)]\s*$/.test(l.trim());
    if (conImporte(linea)) {
      let j = i; const desde = i; const filas = [];
      while (j < L.length && (conImporte(L[j]) || (!L[j].trim() && j + 1 < L.length && conImporte(L[j + 1])))) { if (L[j].trim()) filas.push(L[j]); j++; }
      if (filas.length >= 3) {
        // etiqueta = la línea sin los importes ni los números sueltos del final ("Eigenkapital     0", "Gewinnrücklagen 0   -250")
        const etiquetas = filas.map((l) => limpia(l.replace(IMPORTE_RE, ' ').replace(/^\s*[-•*·–]\s/, '').replace(/(\s+[-+(]?\d[\d.,]*\)?%?)+\s*$/, '')).slice(0, 80));
        // Continuación de un bloque de texto: arranca a 3 líneas o menos del anterior, en la misma página. Caso real, 1. FC Köln 2023-24: la
        // GuV quedaba partida en dos bloques porque "4. Personalaufwand" (un encabezado de grupo, sin importe) cortaba la racha.
        const previo = bloques[bloques.length - 1];
        const continuaDe = previo && previo.tipo === 'texto' && previo.pagina === pagina && desde + 1 - previo.lineas[1] <= 4 ? previo.id : null;
        empuja({ tipo: 'texto', pagina, lineas: [desde + 1, j], arriba: textoReciente.slice(-3), encabezado: [], columnas: 0, filas: filas.length, primeras: etiquetas.slice(0, 3), ultimas: etiquetas.slice(-2), cifras: filas.reduce((a, l) => a + cuantas(l), 0), continuaDe });
        textoReciente.length = 0; i = j; continue;
      }
    }
    if (linea.trim()) { textoReciente.push(limpia(linea).slice(0, 120)); if (textoReciente.length > 6) textoReciente.shift(); }
    i++;
  }
  return { bloques };
}

// El texto de un bloque, tal cual está en el .md (lo que reciben extraer.mjs y la cola humana).
export function textoDeBloque(md, b) { return md.split('\n').slice(b.lineas[0] - 1, b.lineas[1]).join('\n'); }

// La ficha en una línea, como la ve la IA de localizar.
export function ficha(b) {
  return `[${b.id}] pág. ${b.pagina} · ${b.tipo} · ${b.filas} filas · ${b.cifras} importes${b.continuaDe ? ` · CONTINÚA ${b.continuaDe}` : ''}\n  arriba: ${b.arriba.join(' / ') || '-'}\n  encabezado: ${b.encabezado.join(' | ') || '-'}\n  primeras: ${b.primeras.join(' / ') || '-'}  ...  últimas: ${b.ultimas.join(' / ') || '-'}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv[2];
  if (!arg) { console.error('Uso: node tools/indice-bloques.mjs "<pdf o md>" [--json]'); process.exit(1); }
  const md = resolve(arg.replace(/\.pdf$/i, '.md'));
  const { bloques } = indiceBloques(readFileSync(md, 'utf8'));
  if (process.argv.includes('--json')) console.log(JSON.stringify(bloques, null, 1));
  else { for (const b of bloques.filter((x) => x.cifras >= 2)) console.log(ficha(b)); console.log(`\n${bloques.length} bloques (${bloques.filter((x) => x.cifras >= 2).length} con 2+ importes, que son los que ve la IA).`); }
}
