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
//   --a asset_sales   la línea sale de los ingresos y va al meta `assetSales` del año (venta de una filial o participación)
//   --mirada          no cambia nada: anota que la línea se miró y queda como está (el aviso `ganancia-inmovilizado-sin-mirar` de audit.js deja de pedirla)
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
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
const MIRADA = A.includes('--mirada'); // «la miré y queda como está»: no cambia nada, deja la decisión anotada
const A_ACTIVOS = a === 'asset_sales'; // la venta de una filial o participación sale de los ingresos y va al meta `assetSales` del año (REGLA de las inversiones o filiales)
console.log(`${club} ${anio}: «${etiqueta}» ${antes.amountNative}: ${antes.normalizedCategory} -> ${MIRADA ? `queda en ${antes.normalizedCategory} (mirada)` : a}`);
if (!MIRADA && !A_ACTIVOS && antes.normalizedCategory === a) falla('Ya está en esa categoría.');
if (!A.includes('--escribir')) { console.log('Ensayo: no se escribió nada (--escribir).'); process.exit(0); }

if (!MIRADA) modificarClub(club, (c) => {
  const l = hallar(c)[0];
  if (!A_ACTIVOS) { l.normalizedCategory = a; return; }
  const ys = c.datos.revenueLinesByYear[anio]; ys.splice(ys.indexOf(l), 1);
  const meta = c.datos.fiscalYearMeta[anio]; meta.assetSales = Math.round(((meta.assetSales || 0) + l.amountNative) * 1e6) / 1e6;
  // el total impreso de ingresos de esta base incluía la línea: sale también, y el resultado sigue cerrando porque assetSales entra en él
  if (typeof meta.officialTotalRevenue === 'number') meta.officialTotalRevenue = Math.round((meta.officialTotalRevenue - l.amountNative) * 1e6) / 1e6;
  // un año con filas propias debajo de Gastos (meta.extraRows) no arma «Venta de activos» solo: sin esa fila el resultado neto de la tabla no suma lo que suma el motor
  if (Array.isArray(meta.extraRows)) meta.extraRows.unshift({ label: 'Venta de activos', value: l.amountNative });
});
appendFileSync(resolve(ROOT, 'Admin', 'registros', 'recategorizaciones-linea.jsonl'), JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), club, anio, etiqueta, monto: antes.amountNative, de: antes.normalizedCategory, a: MIRADA ? antes.normalizedCategory : a, ...(MIRADA ? { mirada: true } : {}), cita, regla }) + '\n');
// la respuesta de la cola: si alguien recarga ese documento, cargar.mjs la toma y no deshace el cambio (solo para una categoría de la taxonomía; no para assetSales ni para «mirada»)
if (!MIRADA && !A_ACTIVOS) {
  const pdf = m[1].replace(/\.md$/i, '.pdf');
  const r = spawnSync('node', [resolve(ROOT, 'tools/cola.mjs'), '--corregir-categoria', pdf, etiqueta, a, '--nota', `recategorizar-linea: ${regla} (${cita})`], { cwd: ROOT, encoding: 'utf8' });
  console.log(r.status === 0 ? 'Respuesta de la cola anotada (una recarga la respeta).' : `Aviso: no se pudo anotar la respuesta de la cola: ${(r.stderr || r.stdout).trim().split('\n')[0]}`);
}
console.log(MIRADA ? 'Anotada.' : `Escrito. Ahora: node tools/dentro-de-otro.mjs --club ${club} --escribir (una marca «posiblemente dentro de otro rubro» de la categoría que acaba de tener línea propia deja de valer), node tools/publicar.mjs y un commit con «Corrige:».`);
