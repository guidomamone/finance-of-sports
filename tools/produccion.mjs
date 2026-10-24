#!/usr/bin/env node
// ============================================================================
// tools/produccion.mjs — `fos produccion`: ¿lo que está publicado en financeofsports.com es lo que hay en main?
//
// POR QUÉ. El 2026-10-24 se vio que producción seguía en el deploy del 20/10 (ASSET_V 1534) cuando main estaba en 1762: Netlify se quedó sin créditos del ciclo y no hubo ninguna
// alarma. Esta tool lee el ASSET_V de la home publicada y lo compara con el de index.html; sale con 1 si difieren. Gratis: un GET a la home pública.
//
// USO: node tools/produccion.mjs        dice los dos ASSET_V y cuántas versiones de atraso lleva producción (exit 1 si hay atraso)
//      node tools/produccion.mjs --json { local, produccion, atraso }
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const URL_SITIO = 'https://financeofsports.com/';
const asset = (html) => Number((html.match(/window\.ASSET_V\s*=\s*'(\d+)'/) || [])[1]);
const local = asset(readFileSync(resolve(ROOT, 'index.html'), 'utf8'));
let produccion = NaN;
try { const r = await fetch(`${URL_SITIO}?cb=${Date.now()}`, { signal: AbortSignal.timeout(15000) }); produccion = asset(await r.text()); } catch (e) { console.error(`No pude leer ${URL_SITIO}: ${e.message}`); process.exit(2); }
const atraso = local - produccion;
if (process.argv.includes('--json')) console.log(JSON.stringify({ local, produccion, atraso }));
else if (!Number.isFinite(atraso)) { console.log('No pude leer el ASSET_V de producción ni el local.'); process.exit(2); }
else console.log(atraso > 0 ? `Producción lleva ${atraso} versión(es) de atraso: publicado ${produccion}, en el repo ${local}. Revisá Netlify → Deploys (créditos del ciclo, build fallido o publicación pausada) y que main esté pusheado.` : `Producción al día (ASSET_V ${produccion}).`);
process.exit(atraso > 0 ? 1 : 0);
