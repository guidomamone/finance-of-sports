#!/usr/bin/env node
// ============================================================================
// tools/gestiones-tanda.mjs — LAS TANDAS DE GESTIONES (quién condujo cada club en cada cierre) desde la cola, y su carga. Gratis: la
// investigación la hacen subagentes de la sesión, con WebSearch, uno por club.
//
// POR QUÉ. Cada año cargado de un club sin gestión que cubra su cierre deja un caso
// "cargar · gestion" en la cola (cargar.mjs, PRESIDENTES; no frena). Hasta acá cada tanda se armaba a mano (Admin/gestiones-por-pais/
// tanda-2026-10-13 y tanda-2026-10-14: un lote-N.json por club, unas instrucciones copiadas con el criterio del país adentro), el cargador
// y el validador vivían sueltos en la carpeta de la primera tanda (con una lista fija de clubes en espera de esa tanda), y los casos de la
// cola no se contestaban solos: quedaban pendientes aunque la gestión ya estuviera cargada.
//
// COBERTURA: la MISMA regla que cargar.mjs usa para decidir si pregunta: una gestión confirmada con desde <= cierre <= hasta (hasta null =
// sigue), o el año en su `firmo`.
//
// USO:
//   node tools/gestiones-tanda.mjs --armar [--pais gr] [--club <id>] [--escribir]
//        cierra como `obsoleto` los casos de gestión pendientes que ya cubre una gestión confirmada de data/gestiones/<país>.js y, con los que
//        quedan, arma Admin/gestiones-por-pais/tanda-<hoy>/ (un lote-N.json por club y un instrucciones.md que manda a leer el criterio del
//        país en Admin/gestiones-por-pais/<iso>.md). Sin --escribir es ensayo: dice qué cerraría y qué lotes armaría.
//   node tools/gestiones-tanda.mjs --validar <carpeta>
//        cada resultado-N.json contra su lote-N.json (lo que hacía tanda-2026-10-13/validar.js, para todos los lotes).
//   node tools/gestiones-tanda.mjs --cargar <carpeta> [--lotes 1,2] [--escribir]   (solo una tanda armada por --armar: tanda.json)
//        suma las gestiones CONFIRMADAS a data/gestiones/<iso>.js (las que ya están, misma persona y mismo desde, no se repiten; lo cargado no
//        se reemplaza), la evidencia a Admin/carga-clubes/<club>.md, publica con publicarCambios() de cargar.mjs (ASSET_V, generadores,
//        audit.js; un P0/P1 revierte todo) y contesta en la cola los casos cuyo cierre quedó cubierto. Sin --escribir es ensayo.
// ============================================================================

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, appendFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import * as EV from './evidencia-club.mjs';
import { pendientes, ARCHIVO as COLA } from './cola.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const ARGS = process.argv.slice(2);
const flag = (n) => { const i = ARGS.indexOf(n); return i >= 0 ? ARGS[i + 1] : null; };
const ESCRIBIR = ARGS.includes('--escribir');
const HOY = new Date().toISOString().slice(0, 10);
const { cargarSitio, snapshot, revertir, publicarCambios } = await import('./cargar.mjs');

const cubre = (gs, cierre) => (gs || []).some((g) => g.confirmada && ((g.desde && g.desde <= cierre && (!g.hasta || g.hasta >= cierre)) || (g.firmo || []).includes(Number(cierre.slice(0, 4)))));
// El club de un caso de gestión: cargar.mjs escribe el detalle como "<clubId>" el primer caso del club y "<clubId>:<año>" los siguientes
// (L957, cuando ya hubo una respuesta). Sin esto la tanda no encontraba el club de esos casos y los dejaba como estaban.
const clubDeCaso = (c) => String(c.detalle || '').split(':')[0];
const cierreDe = (c) => (String(c.que || '').match(/\(cierre (\d{4}-\d{2}-\d{2})\)/) || [])[1] || null;
const responder = (id, decision, nota) => appendFileSync(COLA, JSON.stringify({ tipo: 'respuesta', id, ts: new Date().toISOString(), decision, nota }) + '\n');

function armar() {
  const sitio = cargarSitio(); const gest = sitio.gestiones || {};
  const casos = pendientes().filter((c) => c.etapa === 'cargar' && c.motivo === 'gestion' && (!flag('--club') || clubDeCaso(c) === flag('--club')));
  const yaCubiertos = []; const porClub = new Map();
  for (const c of casos) {
    const id = clubDeCaso(c); const club = Array.isArray(sitio.clubs) ? sitio.clubs.find((x) => x.id === id) : sitio.clubs[id]; const cierre = cierreDe(c);
    if (!club || !cierre) { console.log(`  ${id}: caso ${c.id} sin club en data/clubs.js o sin cierre en la pregunta; queda como está`); continue; }
    const iso = String(club.country || '').toLowerCase();
    if (flag('--pais') && iso !== flag('--pais').toLowerCase()) continue;
    if (cubre(gest[id], cierre)) { yaCubiertos.push({ c, id, cierre }); continue; }
    if (!porClub.has(id)) porClub.set(id, { iso, club, carpeta: c.pdf.split('/').slice(0, 3).join('/') + '/', cierres: new Set() });
    porClub.get(id).cierres.add(cierre);
  }
  console.log(`${casos.length} caso(s) de gestión pendientes. Ya cubiertos por una gestión confirmada (se cierran): ${yaCubiertos.length}. Clubes para investigar: ${porClub.size}.`);
  for (const y of yaCubiertos) console.log(`  cerrar ${y.c.id}: ${y.id} ${y.cierre}`);
  // Una tanda por carpeta: si ya hay una de hoy, la siguiente es tanda-<hoy>-2, -3... (cargar una carpeta no vuelve a tocar otra tanda).
  let dir = resolve(ROOT, 'Admin', 'gestiones-por-pais', `tanda-${HOY}`); for (let i = 2; existsSync(dir); i++) dir = resolve(ROOT, 'Admin', 'gestiones-por-pais', `tanda-${HOY}-${i}`);
  let n = 0;
  const lotes = [];
  for (const [id, x] of [...porClub].sort((a, b) => a[1].iso.localeCompare(b[1].iso) || a[0].localeCompare(b[0]))) {
    n++; lotes.push({ n, id, x });
    console.log(`  lote-${n}.json: ${id} (${x.iso}) cierres ${[...x.cierres].sort().join(', ')}`);
  }
  if (!ESCRIBIR) { console.log(`\nENSAYO. Con --escribir: cierra ${yaCubiertos.length} caso(s) y escribe ${lotes.length} lote(s) en ${relative(ROOT, dir)}/.`); return; }
  for (const y of yaCubiertos) responder(y.c.id, 'obsoleto', `ya cubierto por una gestión confirmada de data/gestiones (tools/gestiones-tanda.mjs --armar, ${HOY})`);
  if (!lotes.length) return;
  mkdirSync(dir, { recursive: true });
  for (const { n: k, id, x } of lotes) writeFileSync(resolve(dir, `lote-${k}.json`), JSON.stringify({ [x.iso.toUpperCase()]: [{ clubId: id, nombre: x.club.name || null, displayName: x.club.displayName || null, carpeta: x.carpeta, cierres: [...x.cierres].sort() }] }, null, 1) + '\n');
  writeFileSync(resolve(dir, 'tanda.json'), JSON.stringify({ armadoPor: 'tools/gestiones-tanda.mjs --armar', fecha: HOY, lotes: lotes.map((l) => ({ n: l.n, clubId: l.id })) }, null, 1) + '\n');
  if (!existsSync(resolve(dir, 'instrucciones.md'))) writeFileSync(resolve(dir, 'instrucciones.md'), INSTRUCCIONES(relative(ROOT, dir)));
  console.log(`\nEscrito: ${lotes.length} lote(s) e instrucciones.md en ${relative(ROOT, dir)}/. Un subagente por lote: "Leé ${relative(ROOT, dir)}/instrucciones.md; tu lote es el N".`);
}

const INSTRUCCIONES = (rel) => `# Investigar gestiones (quién condujo cada club) — instrucciones para el agente

Armado por tools/gestiones-tanda.mjs --armar (${HOY}). Proyecto: /Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports (sitio
público de finanzas de clubes de fútbol; lo leen hinchas y periodistas: la precisión importa más que la velocidad).

## Qué hacer
Tu lote es UN club (\`lote-N.json\` en esta carpeta: clubId, nombre, \`carpeta\` con sus documentos y \`cierres\` = las fechas de cierre de
los ejercicios cargados). Encontrá QUIÉN CONDUCÍA EL CLUB en cada una de esas fechas, con fecha de asunción y de salida, y una fuente por
gestión.

## Criterio del país (ya decidido; no lo cambies)
Leé primero \`Admin/gestiones-por-pais/<iso>.md\` (iso = la clave del país en tu lote, en minúscula) y \`data/gestiones/<iso>.js\`: los
otros clubes del país ya cargados son el ejemplo. El formato y la regla de qué ejercicio es de qué gestión están en la cabecera de
\`data/gestiones/ar.js\` y en \`Admin/ARQUITECTURA.md\`.

## Reglas
- \`desde\`: fecha en que ASUMIÓ (no la de la elección o el anuncio), AAAA-MM-DD. \`hasta\`: fecha en que dejó el cargo, o null si sigue.
- Si la fuente da solo año o año y mes, usá día 01 (y mes 01 si solo hay año) Y decilo en la nota de esa gestión.
- \`fuente\`: UNA URL de donde salen las fechas (sitio oficial, Wikipedia, prensa seria). \`confirmada: true\` SOLO si la fuente dice esas
  fechas; si no, \`confirmada: false\` y explicá por qué.
- Los documentos del club (\`.md\` de la \`carpeta\`) dicen quién firma cada balance: usalos para CORROBORAR y citá archivo y línea en la nota.
  La \`fuente\` igual tiene que ser una URL web con las fechas.
- \`corto\`: el apellido como lo escribe la prensa en alfabeto latino. \`nombre\`: nombre completo (transliterado si hace falta).
- Cubrí TODAS las fechas de \`cierres\`: exactamente una gestión confirmada por cierre (desde <= cierre <= hasta).
- Si la gestión cambió entre el cierre y la aprobación del balance, avisalo en \`notas\` (no inventes el campo \`firmo\`).
- Nada de inventar: lo que no encuentres va a \`dudas\`. Una gestión dudosa no se publica.

## Herramientas
WebSearch y WebFetch. NO uses el navegador integrado (lo comparten otros agentes). NO edites ningún archivo salvo tu \`resultado-N.json\`.

## Entrega
\`resultado-N.json\` en esta carpeta:
{
  "criterioPais": { "<ISO>": "una o dos frases: qué figura se cargó en este club y por qué" },
  "clubes": { "<clubId>": {
    "gestiones": [ { "nombre": "...", "corto": "...", "cargo": "Presidente", "desde": "AAAA-MM-DD", "hasta": "AAAA-MM-DD" | null,
                     "fuente": "https://...", "confirmada": true } ],
    "notas": { "<nombre de la gestión>": "por qué esa persona, esa fecha y esa fuente; qué dice el balance (archivo:línea)" },
    "cubre": { "<fecha de cierre>": "<nombre>" },
    "dudas": [ "..." ] } }
}
Validá con \`node tools/gestiones-tanda.mjs --validar ${rel}\` (desde la raíz del repo). Después contestá con un resumen corto: qué
cierres quedaron cubiertos y cuáles no, y por qué.
`;

function lotesDe(dir) {
  const ns = readdirSync(dir).map((f) => Number((f.match(/^lote-(\d+)\.json$/) || [])[1] || 0)).filter(Boolean).sort((a, b) => a - b);
  const sel = flag('--lotes') ? new Set(flag('--lotes').split(',').map(Number)) : null;
  return ns.filter((k) => !sel || sel.has(k)).map((k) => ({ k, L: JSON.parse(readFileSync(resolve(dir, `lote-${k}.json`), 'utf8')), R: existsSync(resolve(dir, `resultado-${k}.json`)) ? JSON.parse(readFileSync(resolve(dir, `resultado-${k}.json`), 'utf8')) : null }));
}

// Lo que hacía tanda-2026-10-13/validar.js. Devuelve la cantidad de problemas.
function validar(dir) {
  const F = /^\d{4}-\d{2}-\d{2}$/; let total = 0;
  for (const { k, L, R } of lotesDe(dir)) {
    let prob = 0;
    if (!R) { console.log(`lote ${k}: sin resultado-${k}.json`); total++; continue; }
    for (const cs of Object.values(L)) for (const c of cs) {
      const V = (R.clubes || {})[c.clubId]; if (!V) { console.log(`  FALTA ${c.clubId}`); prob++; continue; }
      for (const g of V.gestiones || []) {
        const e = [];
        for (const x of ['nombre', 'corto', 'cargo', 'desde', 'fuente']) if (!g[x]) e.push('sin ' + x);
        if (g.desde && !F.test(g.desde)) e.push('desde mal');
        if (g.hasta !== null && g.hasta !== undefined && !F.test(g.hasta)) e.push('hasta mal');
        if (g.hasta && g.desde && g.hasta < g.desde) e.push('hasta<desde');
        if (typeof g.confirmada !== 'boolean') e.push('confirmada no booleano');
        if (g.fuente && !/^https?:\/\//.test(g.fuente)) e.push('fuente no URL');
        if (e.length) { console.log(`  ${c.clubId} ${g.nombre}: ${e.join(', ')}`); prob++; }
      }
      const conf = (V.gestiones || []).filter((g) => g.confirmada);
      for (const cierre of c.cierres) { const q = conf.filter((g) => g.desde <= cierre && (g.hasta === null || g.hasta === undefined || g.hasta >= cierre)); if (q.length !== 1) { console.log(`  ${c.clubId} cierre ${cierre}: ${q.length} gestiones confirmadas lo cubren`); prob++; } }
      if ((V.dudas || []).length) console.log(`  dudas ${c.clubId}: ${V.dudas.length}`);
    }
    console.log(`lote ${k}: ${prob} problemas`); total += prob;
  }
  return total;
}

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
function cargar(dir) {
  const rel = relative(ROOT, dir); const porPais = {}; const evid = []; let n = 0;
  // Solo tandas armadas por --armar (tanda.json): las de antes dejaban afuera a propósito clubes que esperaban una
  // decisión de criterio (la lista HOLD de su cargar-gestiones.mjs); recargarlas acá los metería sin esa decisión.
  if (!existsSync(resolve(dir, 'tanda.json')) && !ARGS.includes('--forzar')) { console.error(`${rel} no la armó tools/gestiones-tanda.mjs --armar (falta tanda.json): se carga con su propio cargador. --forzar si es a propósito.`); process.exit(1); }
  for (const { k, L, R } of lotesDe(dir)) {
    if (!R) { console.log(`lote ${k}: sin resultado, no se carga`); continue; }
    for (const [pais, cs] of Object.entries(L)) for (const c of cs) {
      const V = (R.clubes || {})[c.clubId]; if (!V) continue;
      const G = (V.gestiones || []).filter((g) => g.confirmada === true).sort((a, b) => a.desde.localeCompare(b.desde));
      if (!G.length) continue;
      n += G.length;
      const lin = G.map((g) => `    { nombre:${q(g.nombre)}, corto:${q(g.corto)}, cargo:${q(g.cargo)}, desde:${q(g.desde)}, hasta:${g.hasta ? q(g.hasta) : 'null'},\n      fuente:${q(g.fuente)}, confirmada:true },`);
      (porPais[pais.toLowerCase()] ||= []).push(`  ${q(c.clubId)}: [\n${lin.join('\n')}\n  ],`);
      const notas = G.map((g) => `${g.nombre} (${g.desde} a ${g.hasta || 'hoy'}): ${(V.notas || {})[g.nombre] || 'sin nota'}`);
      const sinConf = (V.gestiones || []).filter((g) => g.confirmada !== true).map((g) => `SIN CONFIRMAR, no cargada: ${g.nombre} (${g.desde} a ${g.hasta || 'hoy'}), ${g.fuente}: ${(V.notas || {})[g.nombre] || ''}`);
      evid.push({ id: c.clubId, lineas: [...notas, ...sinConf, ...(V.dudas || []).map((d) => `Duda: ${d}`)], k });
    }
  }
  // Como cargar-gestiones.mjs: un club que ya tiene gestiones SUMA las confirmadas que faltan (mismo corto y mismo desde = ya
  // está), ordenadas por desde; lo cargado no se toca.
  const escritos = []; const cambios = [];
  const archivos = {};
  for (const [iso, bloques] of Object.entries(porPais)) {
    const f = `data/gestiones/${iso}.js`; const nuevo = !existsSync(resolve(ROOT, f));
    let s = nuevo ? 'window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};\n\nObject.assign(window.CLUB_GESTIONES, {\n});\n' : readFileSync(resolve(ROOT, f), 'utf8');
    const nuevos = [];
    for (const b of bloques) {
      const id = b.match(/^ {2}'([^']+)'/)[1]; const ini = s.indexOf(`  '${id}': [\n`);
      if (ini < 0) { nuevos.push(b); cambios.push(`${id}: club nuevo en ${f}`); continue; }
      const fin = s.indexOf('\n  ],', ini); const cuerpo = s.slice(s.indexOf('\n', ini) + 1, fin);
      const entradas = (txt) => txt.split(/\n(?= {4}\{ )/).filter((e) => e.trim());
      // Misma gestión = mismo `corto` y mismo `desde` (no el nombre completo: Aris se cargó como "Theodoros Karipidis" y el resultado dice
      // "Theodoros Karipidis (del Anestis)"; con la clave por nombre de cargar-gestiones.mjs entraba duplicada).
      const clave = (e) => `${e.match(/corto:'((?:[^'\\]|\\.)*)'/)[1]}|${e.match(/desde:'([^']+)'/)[1]}`;
      const hoy = entradas(cuerpo); const ya = new Set(hoy.map(clave));
      const agregar = entradas(b.slice(b.indexOf('\n') + 1, b.lastIndexOf('\n  ],'))).filter((e) => !ya.has(clave(e)));
      if (!agregar.length) { console.log(`  ${id}: ya tiene todas las confirmadas`); continue; }
      const todas = [...hoy, ...agregar].sort((a, b2) => a.match(/desde:'([^']+)'/)[1].localeCompare(b2.match(/desde:'([^']+)'/)[1]));
      s = s.slice(0, s.indexOf('\n', ini) + 1) + todas.join('\n') + s.slice(fin);
      cambios.push(`${id}: + ${agregar.map((e) => clave(e).replace('|', ' desde ')).join('; ')}`);
    }
    const i = s.lastIndexOf('});'); if (nuevos.length) s = s.slice(0, i) + nuevos.join('\n') + '\n' + s.slice(i);
    if (s !== (nuevo ? null : readFileSync(resolve(ROOT, f), 'utf8'))) archivos[f] = s;
  }
  for (const c of cambios) console.log(`  ${c}`);
  console.log(`${n} gestiones confirmadas en ${rel}; ${Object.keys(archivos).length} archivo(s) de data/gestiones cambian.`);
  if (!ESCRIBIR) { console.log('ENSAYO (agregá --escribir).'); return; }
  if (Object.keys(archivos).length) {
    const extra = evid.map((e) => EV.rutaRel(e.id)); const snap = snapshot(extra);
    try {
      for (const [f, s] of Object.entries(archivos)) { writeFileSync(resolve(ROOT, f), s); escritos.push(f); }
      for (const e of evid) escritos.push(EV.guardar(e.id, EV.agregarSeccion(EV.leer(e.id), 'Gestiones', e.lineas, `investigado por un subagente con fuente por gestión (${rel}/resultado-${e.k}.json, tools/gestiones-tanda.mjs, ${HOY})`)));
      const r = publicarCambios(snap, extra, escritos);
      if (!r.ok) { console.error(`REVERTIDO: ${r.motivo}\n${r.audit || ''}`); process.exit(1); }
      console.log(`Escrito (${r.escritos.join(', ')}). Auditoría: ${r.audit}.`);
    } catch (err) { const rv = revertir(snap, extra); console.error(`${err.message} — se revirtió todo (${rv.restaurados} restaurados, ${rv.borrados} borrados)`); process.exit(1); }
  }
  // Los casos de la cola cuyo cierre quedó cubierto se contestan; los demás siguen pendientes.
  const gest = cargarSitio().gestiones || {}; let contestados = 0;
  for (const c of pendientes().filter((x) => x.etapa === 'cargar' && x.motivo === 'gestion')) {
    const cierre = cierreDe(c); if (cierre && cubre(gest[clubDeCaso(c)], cierre)) { responder(c.id, 'aceptar', `cargada en data/gestiones (${rel}, tools/gestiones-tanda.mjs, ${HOY})`); contestados++; }
  }
  console.log(`Cola: ${contestados} caso(s) de gestión contestados (su cierre quedó cubierto).`);
  console.log(`Para el commit: git add -- data/gestiones Admin/carga-clubes index.html fuentes fuentes.html Admin/ESTADO-clubes.md Admin/COMO-CORRE-EL-PROYECTO.html Admin/registros/cola-revision.jsonl "${rel}"`);
}

if (ARGS.includes('--armar')) armar();
else if (flag('--validar')) { const p = validar(resolve(ROOT, flag('--validar'))); process.exit(p ? 1 : 0); }
else if (flag('--cargar')) cargar(resolve(ROOT, flag('--cargar')));
else { console.error('Uso: node tools/gestiones-tanda.mjs --armar [--pais gr] [--club <id>] [--escribir] | --validar <carpeta> | --cargar <carpeta> [--lotes 1,2] [--escribir]'); process.exit(1); }
