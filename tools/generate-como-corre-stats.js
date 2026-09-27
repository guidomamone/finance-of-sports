#!/usr/bin/env node
// ============================================================================
// tools/generate-como-corre-stats.js — recalcula el bloque de números
// ("Clubes cargados", "Países", "Ligas", "Documentos fuente") de la cabecera
// de Admin/COMO-CORRE-EL-PROYECTO.html desde los propios datos del sitio.
//
// POR QUÉ EXISTE: hasta la Versión 249 esos 5 números eran texto tipeado a
// mano, y quedaron desactualizados (decían "41 clubes · 6 países" cuando el
// sitio ya tenía 161 clubes de 14 países) — el mismo problema de fondo que ya
// resolvieron los otros 4 generadores de `tools/`, así que este sigue el mismo
// patrón: un bloque entre marcadores HTML que este script reescribe, nunca a
// mano.
//
// QUÉ SÍ CALCULA (determinístico, desde `data/*.js`, mismo criterio de carga
// que `tools/audit.js`/`tools/generate-fuentes-page.js`): clubes, países,
// ligas y documentos fuente (`Object.keys(sources).length`).
//
// QUÉ NO CALCULA, A PROPÓSITO: "Checks de datos" (verifyTieOuts() +
// checkFxSanity()) sigue siendo manual. Automatizarlo de verdad exigiría
// reimplementar esas dos funciones en Node, y este proyecto tiene una regla
// explícita en contra de eso (`Admin/CONVENCIONES.md`: "la verificación usa
// el motor del sitio, nunca una copia" — una vez una copia simplificada dio
// 12 falsos positivos). Correr `?audit=1` / `auditAll()` en un preview y
// pegar el número a mano en el marcador CHECKS de abajo sigue siendo el
// procedimiento; "Archivos por club" es una constante del proceso de
// onboarding (7, ver paso 03), no un dato que crezca con el sitio.
//
// USO:
//   node tools/generate-como-corre-stats.js           reescribe el bloque
//   node tools/generate-como-corre-stats.js --check   no escribe; sale con
//                                                      código 1 si quedó viejo
// ============================================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DOC = path.join(ROOT, 'Admin', 'COMO-CORRE-EL-PROYECTO.html');
const CHECK = process.argv.includes('--check');

function cargar() {
  const sandbox = { console };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  const files = [
    'data/clubs.js', 'data/category-map.js', 'data/currency-map.js',
    'data/sources-view.js', 'data/site-labels.js', 'data/leagues.js',
    ...fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('-data.js')).sort().map(f => 'data/' + f),
  ];
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  return vm.runInContext('({ clubs, sources, LEAGUES })', ctx);
}

function calcular() {
  const { clubs, sources, LEAGUES } = cargar();
  const nClubs = Object.keys(clubs).length;
  const nPaises = new Set(Object.values(clubs).map((c) => c.country)).size;
  const nLigas = Object.keys(LEAGUES).length;
  const nDocs = Object.keys(sources).length;
  return { nClubs, nPaises, nLigas, nDocs };
}

function main() {
  const { nClubs, nPaises, nLigas, nDocs } = calcular();
  const html = fs.readFileSync(DOC, 'utf8');

  const marcador = /<!-- STATS:AUTO -->[\s\S]*?<!-- \/STATS:AUTO -->/;
  if (!marcador.test(html)) {
    console.error('No encontré el bloque <!-- STATS:AUTO --> ... <!-- /STATS:AUTO --> en ' + DOC);
    process.exit(1);
  }

  const bloqueNuevo = `<!-- STATS:AUTO -->
  <div><dt>Clubes cargados</dt><dd>${nClubs}</dd></div>
  <div><dt>Países</dt><dd>${nPaises}</dd></div>
  <div><dt>Ligas en el catálogo</dt><dd>${nLigas}</dd></div>
  <div><dt>Documentos fuente</dt><dd>${nDocs}</dd></div>
  <!-- /STATS:AUTO -->`;

  const actualizado = html.replace(marcador, bloqueNuevo);

  if (CHECK) {
    if (actualizado === html) {
      console.log(`Bloque de stats al día: ${nClubs} clubes, ${nPaises} países, ${nLigas} ligas, ${nDocs} documentos.`);
      process.exit(0);
    }
    console.error(`Admin/COMO-CORRE-EL-PROYECTO.html quedó vieja: correr "node tools/generate-como-corre-stats.js" (real hoy: ${nClubs} clubes, ${nPaises} países, ${nLigas} ligas, ${nDocs} documentos).`);
    process.exit(1);
  }

  fs.writeFileSync(DOC, actualizado);
  console.log(`Actualizado: ${nClubs} clubes, ${nPaises} países, ${nLigas} ligas, ${nDocs} documentos. "Checks de datos" sigue siendo manual (correr auditAll()) — ver el comentario de cabecera de este script.`);
}

main();
