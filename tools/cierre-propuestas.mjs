#!/usr/bin/env node
// ============================================================================
// tools/cierre-propuestas.mjs — `fos cierre-propuestas`: abre en la cola una pregunta por cada documento anual sin fecha de cierre, con el cierre del país como propuesta
//
// POR QUÉ. Votación (opción C, 2 a 1): para un documento anual sin fecha de cierre que los vecinos del club no deducen (cierre-vecinos.mjs), el cierre por defecto del
// país (tools/cierre-por-defecto.json: los países donde domina el mismo día y mes en 98 % o más de los anuales con cierre) NO se asume: se propone en una pregunta de cola
// (motivo `cierre-por-pais`) que un revisor confirma mirando el documento. cargar-inicio.mjs toma la respuesta: `aceptar` = la propuesta, `corregir --valor AAAA-MM-DD` = esa fecha.
//
// USO:
//   node tools/cierre-propuestas.mjs               ensayo: cuántas preguntas abriría, por país, y un ejemplo de cada una
//   node tools/cierre-propuestas.mjs --escribir    las abre en la cola (las que ya existen no se duplican)
// Una pregunta por documento. Sin año en el nombre del archivo no hay propuesta. En un país de cierre 30-06 el año de la propuesta es el del cierre de la temporada («2023-24» → 2024).
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { cierrePorVecinos } from './cierre-vecinos.mjs';
import { agregarCaso, casoYRespuesta } from './cola.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const paises = JSON.parse(readFileSync(resolve(ROOT, 'tools', 'cierre-por-defecto.json'), 'utf8')).paises;
const reg = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l)).filter((x) => x.tieneMd && x.periodo);

// El año que dice el nombre del archivo: el último año de cuatro cifras, o el segundo de una temporada abreviada («2023-24»).
export function anioDelNombre(nombre) {
  const abreviada = [...nombre.matchAll(/(?<!\d)((?:19|20)\d{2})[-_](\d{2})(?!\d)/g)].map((m) => ({ ini: Number(m[1]), fin: Number(m[1].slice(0, 2) + m[2]) })).filter((a) => a.fin === a.ini + 1).map((a) => a.fin);
  const cuatro = [...nombre.matchAll(/(?<!\d)(?:19|20)\d{2}(?!\d)/g)].map((m) => Number(m[0]));
  return abreviada.at(-1) ?? cuatro.at(-1) ?? null;
}

export function propuestas() {
  const out = [];
  for (const x of reg) {
    if (x.periodo.cierre || x.periodo.tipo !== 'anual') continue;
    const pais = x.pdf.split('/')[1]; const dm = paises[pais]; if (!dm) continue;
    if (cierrePorVecinos(x.pdf, reg)) continue;
    const anio = anioDelNombre(basename(x.pdf)); if (!anio) continue;
    out.push({ pdf: x.pdf, md: x.md, pais, cierre: `${anio}-${dm}` });
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const lista = propuestas();
  const pendientes = lista.filter((p) => { const { caso, resp } = casoYRespuesta(p.pdf, 'cargar', 'cierre-por-pais', 'cierre'); return !caso && !resp; });
  const porPais = {}; for (const p of pendientes) porPais[p.pais] = (porPais[p.pais] || 0) + 1;
  console.log(`Documentos anuales sin cierre, con propuesta del país y sin vecinos que lo deduzcan: ${lista.length}; sin pregunta todavía: ${pendientes.length}\n  ${Object.entries(porPais).sort((a, b) => b[1] - a[1]).map(([p, n]) => `${p} ${n}`).join(' · ')}`);
  for (const p of pendientes.slice(0, 3)) console.log(`  ejemplo: ${p.pdf} → propone ${p.cierre}`);
  if (process.argv.includes('--escribir')) {
    for (const p of pendientes) agregarCaso({ pdf: p.pdf, md: p.md, etapa: 'cargar', motivo: 'cierre-por-pais', detalle: 'cierre', cierrePropuesto: p.cierre, que: `¿El documento cierra el ${p.cierre}? El registro no encontró la fecha de cierre ni la deducen los vecinos del club; ${p.pais} cierra casi siempre en ese día y mes (tools/cierre-por-defecto.json). Buscá en el documento la fecha del balance («al 31 de diciembre de …», «30 de junio de …») y confirmala.`, propuesta: `aceptar si cierra el ${p.cierre}; si no, corregir --valor AAAA-MM-DD con la fecha del documento` });
    console.log(`Abiertas ${pendientes.length} pregunta(s) de cola (motivo cierre-por-pais).`);
  } else console.log('(ensayo: --escribir las abre en la cola)');
}
