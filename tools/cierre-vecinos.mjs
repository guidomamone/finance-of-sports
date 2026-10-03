#!/usr/bin/env node
// ============================================================================
// tools/cierre-vecinos.mjs — LA FECHA DE CIERRE DE UN DOCUMENTO QUE NO LA DICE, deducida de los documentos vecinos del mismo club. Gratis.
//
// POR QUÉ (Versión 342, idea de Guido el 2026-10-01: "fijate cuándo cierra 2010 y cuándo abre 2012 y eso te sirve como best guess"). UC 2011
// no tiene la fecha de cierre detectada por tools/periodo.mjs (campo `periodo.cierre` vacío en el registro), y sin fecha no hay año: la
// verificación no podía hacer el chequeo de años vecinos y la carga no sabía qué ejercicio era.
//
// LA REGLA: si en la misma carpeta hay un documento del año ANTERIOR y uno del año SIGUIENTE (por el año del nombre del archivo), los dos con
// fecha de cierre detectada y EL MISMO día y mes, este documento cierra ese mismo día y mes de su año. Si falta alguno de los dos vecinos o no
// coinciden, no se deduce nada (null): no se adivina. Es una deducción, no una lectura: quien la usa la deja anotada como aviso.
//
// USO:
//   import { cierrePorVecinos } from './cierre-vecinos.mjs';   cierrePorVecinos(pdf, registro) -> { cierre, anio, evidencia } | null
//   node tools/cierre-vecinos.mjs "<pdf>"
// ============================================================================

import { readFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';

const anioDelNombre = (p) => { const m = basename(p).match(/(19|20)\d{2}(?!.*(19|20)\d{2})/); return m ? Number(m[0]) : null; };

export function cierrePorVecinos(pdf, registro) {
  const anio = anioDelNombre(pdf); if (!anio) return null;
  const carpeta = dirname(pdf);
  const vecino = (a) => registro.find((x) => x.pdf !== pdf && dirname(x.pdf) === carpeta && anioDelNombre(x.pdf) === a && x.periodo?.cierre && Number(x.periodo.cierre.slice(0, 4)) === a);
  const ant = vecino(anio - 1); const sig = vecino(anio + 1);
  if (!ant || !sig || ant.periodo.cierre.slice(5) !== sig.periodo.cierre.slice(5)) return null;
  return { cierre: `${anio}-${ant.periodo.cierre.slice(5)}`, anio, evidencia: `deducida: ${basename(ant.pdf)} cierra ${ant.periodo.cierre} y ${basename(sig.pdf)} cierra ${sig.periodo.cierre}` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const registro = readFileSync(resolve(import.meta.dirname, '..', 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  console.log(JSON.stringify(cierrePorVecinos(process.argv[2], registro), null, 1));
}
