#!/usr/bin/env node
// ============================================================================
// tools/tablas-sesion.mjs — las dos tablas con las que se arranca una sesión de trabajo en un país. Gratis, sin API, solo lee.
//
// USO:
//   node tools/tablas-sesion.mjs --italia     un renglón por club de fútbol de Clubes/Italia: ejercicios cargados y, de lo que falta, en qué etapa
//                                             del pipeline está cada documento y por qué (lee Admin/transcripciones-estado.jsonl y Generados/)
//   node tools/tablas-sesion.mjs --todo       un renglón por punto de Admin/TODO.md: número, título y su estado
//   (sin flags: las dos)
//
// QUÉ ES "AÑO": el año de cierre del ejercicio (2020 = temporada 2019-20), como en el sitio. Los descartados (Admin/documentos-descartados.txt) no
// aparecen. Antes de leer la tabla: `node tools/estado.mjs --actualizar` (gratis) para que el registro esté al día.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { etapaDe } from './etapa-doc.mjs';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const queIta = A.includes('--italia') || !A.includes('--todo');
const queTodo = A.includes('--todo') || !A.includes('--italia');

// Los clubes de fútbol de Italia (el resto de Clubes/Italia es rugby, tenis y entes: otra decisión de alcance).
const FUTBOL = new Set(['AC Milan', 'AS Roma', 'Atalanta', 'Bologna', 'Catania', 'Chievo Verona', 'Como', 'Cremonese', 'Fiorentina', 'Genoa', 'Hellas Verona', 'Inter', 'Juve Stabia', 'Juventus', 'Lazio', 'Monza', 'Napoli', 'Parma', 'Salernitana', 'Sampdoria', 'Sassuolo', 'Torino', 'Udinese']);

const leerJson = (e, suf) => { try { const q = resolve(ROOT, derivado(e.md, suf, { crear: false })); return existsSync(q) ? JSON.parse(readFileSync(q, 'utf8')) : null; } catch { return null; } };

function motivoCorto(e, r) {
  if (r.clave === 'e6-no-cerro') {
    const v = leerJson(e, '.verificacion.json'); if (!v) return 'etapa 6: no cerró';
    const fallan = (v.chequeos || []).filter((c) => c.ok === false).map((c) => c.nombre);
    if (fallan.some((n) => /resultado|total de (gastos|ingresos)/.test(n))) return 'etapa 6: el resultado o el total no cierra';
    if (fallan.some((n) => /documento del año|año anterior/.test(n))) return 'etapa 6: falla el año vecino';
    const nCola = (v.cola || []).length; return nCola ? `etapa 6: ${nCola} pregunta(s) en la cola` : 'etapa 6: no cerró';
  }
  if (r.clave === 'e8-frenado') {
    const c = leerJson(e, '.carga.json'); const f = (c?.frena || []).map((x) => x.etapa);
    if (f.includes('club')) return 'etapa 8: falta el alta del club';
    if (f.includes('alta:currency') || f.includes('moneda')) return 'etapa 8: moneda legado (liras)';
    if (f.includes('categoria-en-cola')) return 'etapa 8: filas esperando categoría en la cola';
    if (f.includes('registro')) return 'etapa 8: falta correr el lote (registro)';
    return `etapa 8: frenado (${f.slice(0, 2).join(', ') || '?'})`;
  }
  if (r.clave === 'e8-lista') return 'etapa 8: lista para cargar';
  return r.texto.replace(/^Etapa (\d+) · /, 'etapa $1: ').replace(/ \(.*$/, '');
}

if (queIta) {
  const reg = readFileSync(resolve(ROOT, 'Admin', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const porClub = new Map();
  for (const e of reg) {
    const m = e.pdf.match(/^Clubes\/Italia\/([^/]+)\//); if (!m || !FUTBOL.has(m[1])) continue;
    const r = etapaDe(e); if (r.clave === 'descartado' || r.clave === 'e1-duplicado') continue;
    const anio = (e.periodo?.cierre || '').slice(0, 4) || (e.pdf.match(/(\d{4})/) || [])[1] || '?';
    const c = porClub.get(m[1]) || { cargados: new Set(), pend: [] };
    if (r.clave === 'e9-cargado') c.cargados.add(anio); else c.pend.push([anio, motivoCorto(e, r), e.pdf]);
    porClub.set(m[1], c);
  }
  console.log('## Ejercicios de fútbol de Italia (año = año de cierre)\n');
  console.log('| Club | Cargados | Pendientes: año y en qué etapa está |');
  console.log('|---|---|---|');
  let nc = 0; let np = 0;
  for (const [club, c] of [...porClub].sort((a, b) => a[0].localeCompare(b[0]))) {
    const car = [...c.cargados].sort(); nc += car.length; np += c.pend.length;
    const pend = c.pend.sort((a, b) => a[0].localeCompare(b[0])).map(([a, m]) => `${a} (${m})`);
    console.log(`| ${club} | ${car.length ? `${car.length}: ${car.join(', ')}` : '0'} | ${pend.length ? pend.join('; ') : '—'} |`);
  }
  console.log(`\nTotal: ${nc} ejercicios cargados (los años con consolidado y separato se cuentan una vez) y ${np} documentos pendientes.\n`);
}

if (queTodo) {
  const L = readFileSync(resolve(ROOT, 'Admin', 'TODO.md'), 'utf8').split('\n');
  const puntos = []; let cur = null;
  for (const l of L) { const m = l.match(/^(\d+)\.\s+(.*)$/); if (m) { cur = { n: m[1], texto: m[2] }; puntos.push(cur); } else if (cur && /^\s+\S/.test(l)) cur.texto += ' ' + l.trim(); else if (cur && !l.trim()) cur = null; }
  console.log('## Puntos de Admin/TODO.md\n');
  console.log('| # | Punto | Estado |');
  console.log('|---|---|---|');
  for (const p of puntos) {
    const t = p.texto;
    const titulo = t.split(/\.\s|\(/)[0].replace(/\*\*/g, '').slice(0, 95);
    const estado = /CON DAÑO/i.test(t) ? 'con daño hoy' : /SIN ARREGLO/i.test(t) ? 'conocido, sin arreglo (decisión de Guido)' : /SIN DAÑO HOY/i.test(t) ? 'conocido, sin daño hoy' : /Hecho|ya está|ya se hizo/i.test(t.slice(0, 400)) ? 'parcial' : 'abierto';
    console.log(`| ${p.n} | ${titulo} | ${estado} |`);
  }
}
