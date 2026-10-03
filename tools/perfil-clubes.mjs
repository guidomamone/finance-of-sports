#!/usr/bin/env node
// ============================================================================
// tools/perfil-clubes.mjs — EL PERFIL DE CADA CLUB que hace falta para saber si un 0 en el formato simplificado es real o es un desglose que
// se perdió. Gratis (solo lee y escribe Admin/perfil-clubes.jsonl).
//
// POR QUÉ EXISTE (Versión 340, diseño aprobado por Guido el 2026-10-01). La etapa 8 (cargar.mjs) dispara un REINTENTO cuando una categoría
// da 0 en un año. Medido sobre 241 años ya cargados: salarios del plantel nunca da 0, televisión 2% y estadio 1% (un 0 ahí es casi seguro un
// desglose perdido: UC 2025 tenía salarios en 0 porque el costo de ventas no estaba abierto); pero cuotas sociales da 0 en el 46% (clubes que
// son sociedades sin socios) y "otras secciones deportivas" en el 63-68% (clubes sin básquet ni otros deportes). Para esas dos, el 0 solo
// dispara el reintento si el perfil dice que el club SÍ tiene socios / SÍ tiene otros deportes.
//
// EL ARCHIVO: Admin/perfil-clubes.jsonl (trackeado). Una línea por club y por fuente: {clubId, nombre, pais, socios, sociosEvidencia,
// otrosDeportes, otrosDeportesEvidencia, fuente, fecha}. Al leer, por club, cada campo toma el valor de la ÚLTIMA línea que lo trae (una
// respuesta de Guido en la cola, fuente 'guido-cola', pisa lo que armó el subagente). true / false / null (no se sabe).
// La primera versión (66 clubes sudamericanos) la armó un subagente con evidencia citada de data/ y de las transcripciones.
//
// USO:
//   import { perfilDe, guardarPerfil } from './perfil-clubes.mjs';
//   node tools/perfil-clubes.mjs                 resumen: cuántos con socios / otros deportes en true, false y null
//   node tools/perfil-clubes.mjs <clubId>        el perfil de un club
// ============================================================================

import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
export const ARCHIVO = resolve(ROOT, 'Admin', 'perfil-clubes.jsonl');
const CAMPOS = ['socios', 'otrosDeportes'];

function leer() {
  const por = new Map();
  if (!existsSync(ARCHIVO)) return por;
  for (const l of readFileSync(ARCHIVO, 'utf8').split('\n')) {
    if (!l.trim()) continue; let x; try { x = JSON.parse(l); } catch { continue; }
    const p = por.get(x.clubId) || { clubId: x.clubId };
    for (const [k, v] of Object.entries(x)) if (v !== undefined && (!CAMPOS.includes(k) || v !== null || !(k in p))) p[k] = v;
    por.set(x.clubId, p);
  }
  return por;
}

// El perfil de un club, o null si no está en el archivo.
export function perfilDe(clubId) { return leer().get(clubId) || null; }

// Guarda un campo (socios / otrosDeportes) para un club; lo usa cargar.mjs cuando Guido contesta la pregunta de la cola.
export function guardarPerfil(clubId, campo, valor, evidencia, fuente = 'guido-cola') {
  if (!CAMPOS.includes(campo)) throw new Error(`campo desconocido: ${campo}`);
  appendFileSync(ARCHIVO, JSON.stringify({ clubId, [campo]: valor, [`${campo}Evidencia`]: evidencia, fuente, fecha: new Date().toISOString().slice(0, 10) }) + '\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const id = process.argv[2]; const por = leer();
  if (id) { console.log(JSON.stringify(por.get(id) || null, null, 1)); process.exit(0); }
  for (const c of CAMPOS) { const t = { true: 0, false: 0, null: 0 }; for (const p of por.values()) t[String(p[c] ?? null)]++; console.log(`${c}: ${t.true} sí · ${t.false} no · ${t.null} no se sabe`); }
  console.log(`${por.size} clubes en ${ARCHIVO.replace(ROOT + '/', '')}`);
}
