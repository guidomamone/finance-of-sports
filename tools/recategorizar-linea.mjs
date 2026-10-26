#!/usr/bin/env node
// ============================================================================
// tools/recategorizar-linea.mjs — cambia la categoría de UNA línea de ingresos de un ejercicio YA CARGADO, con la cita del documento que lo justifica.
//
// POR QUÉ. cargar.mjs no recarga un ejercicio ya publicado, y recategorizar-etiquetas.mjs decide por etiqueta, no por documento. Una ganancia en
// inmovilizado depende del documento de cada año (REGLA de Admin/CONVENCIONES-DATOS.md, «una ganancia en inmovilizado…»), así que se corrige línea por línea.
// El monto no cambia; sí el JSON del club (y su -data.js, regenerado) y queda una línea en Admin/registros/recategorizaciones-linea.jsonl.
//
// USO:
//   node tools/recategorizar-linea.mjs --club benfica-pt --anio 2007 --etiqueta "Ganhos em imobilizações" --a player_sales \
//        --cita "Clubes/Portugal/Benfica/relatorio-contas-2006-07.md:361" --regla "ganancia en inmovilizado ligada a jugadores por el documento" [--escribir]
//   Sin --escribir solo dice qué cambiaría. Después: node tools/publicar.mjs y un commit con «Corrige:».
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { leerJsonClub, modificarClub } from './club-json.mjs';
import { deJson } from './json-datos.mjs';
import { negarSiSeMide } from './candado-medicion.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i < 0 ? null : (A[i + 1] ?? null); };
const falla = (m) => { console.error(m); process.exit(1); };
negarSiSeMide('recategorizar-linea.mjs', { si: A.includes('--escribir') });

const club = flag('--club'), anio = Number(flag('--anio')), etiqueta = flag('--etiqueta'), a = flag('--a'), cita = flag('--cita'), regla = flag('--regla');
if (!club || !anio || !etiqueta || !a || !cita || !regla) falla('Uso: node tools/recategorizar-linea.mjs --club <id> --anio <AAAA> --etiqueta "<tal cual>" --a <categoría> --cita "ruta.md:línea" --regla "…" [--escribir]');

// la cita tiene que existir y la línea citada, no estar vacía
const m = /^(.+\.md):(\d+)$/.exec(cita); if (!m) falla(`--cita «${cita}» no es ruta.md:línea`);
const rutaMd = resolve(ROOT, m[1]); if (!existsSync(rutaMd)) falla(`No existe ${m[1]}`);
if (!(readFileSync(rutaMd, 'utf8').split('\n')[Number(m[2]) - 1] || '').trim()) falla(`La línea ${m[2]} de ${m[1]} está vacía.`);

const lineas = (c) => (c.datos.revenueLinesByYear || {})[anio] || [];
const hallar = (c) => lineas(c).filter((l) => l.rawLabel === etiqueta);
const hay = hallar(deJson(leerJsonClub(club)));
if (hay.length !== 1) falla(`${club} ${anio}: ${hay.length} línea(s) de ingresos con la etiqueta «${etiqueta}» (tiene que haber exactamente una).`);
const antes = hay[0];
console.log(`${club} ${anio}: «${etiqueta}» ${antes.amountNative}: ${antes.normalizedCategory} -> ${a}`);
if (antes.normalizedCategory === a) falla('Ya está en esa categoría.');
if (!A.includes('--escribir')) { console.log('Ensayo: no se escribió nada (--escribir).'); process.exit(0); }

modificarClub(club, (c) => { const l = hallar(c)[0]; l.normalizedCategory = a; });
appendFileSync(resolve(ROOT, 'Admin', 'registros', 'recategorizaciones-linea.jsonl'), JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), club, anio, etiqueta, monto: antes.amountNative, de: antes.normalizedCategory, a, cita, regla }) + '\n');
console.log('Escrito. Ahora: node tools/publicar.mjs y un commit con «Corrige:».');
