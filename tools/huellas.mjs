// ============================================================================
// tools/huellas.mjs — "¿este resultado sigue correspondiendo a su entrada?" para la cadena de la categorización:
//
//     <md>.rubros.json  ->  <md>.jev.json  ->  <md>.categorias.json
//     (verificar.mjs)      (jev-categorizar)    (categorizar-claude)
//
// POR QUÉ EXISTE (bug real, 2026-09-30, piloto C): cada etapa decidía si tenía trabajo mirando SOLO si su archivo de salida
// existía. Esa tarde se regeneraron 438 `.rubros.json` (lado ingreso/gasto y columna de importes corregidos), pero sus `.jev.json`
// seguían ahí, hechos sobre la lista VIEJA: Jev no los rehizo y categorizar-claude.mjs mandó 44 documentos a Claude por API
// (US$ 1,90) mezclando la lista nueva con las categorías de la vieja. Ninguna sesión se dio cuenta hasta mirar el gasto.
// Regla desde entonces: cada archivo derivado guarda la HUELLA de su entrada, y una etapa rehace su salida cuando la huella no
// coincide o falta. Nadie tiene que acordarse de borrar nada: lo decide el script (pedido de Guido: "que se haga por script,
// porque las IA se olvidan").
//
// Qué entra en cada huella (y qué NO, a propósito):
//   - huellaRubros: etiqueta, lado, valores, página y columnas de cada rubro. NO `glosa` (tools/glosar-rubros.mjs la agrega DESPUÉS
//     de preparar, sobre el mismo archivo, y no cambia qué hay que categorizar) ni `generatedAt` (cambia en cada re-preparación
//     aunque el contenido sea idéntico).
//   - huellaJev: etiqueta, lado, categoría y confianza de cada respuesta de Jev.
//   Un `.jev.json` / `.categorias.json` viejo, escrito antes de que existieran las huellas, no tiene el campo: cuenta como
//   desactualizado y se rehace (Jev cuesta centavos; Claude, ~US$ 0,015-0,04 por documento).
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { derivado } from './rutas.mjs';
import { createHash } from 'node:crypto';

const sha1 = (s) => createHash('sha1').update(s).digest('hex');
const leer = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } };
const rutas = (mdAbs) => ({ rubros: derivado(mdAbs, '.rubros.json', { crear: false }), jev: derivado(mdAbs, '.jev.json', { crear: false }), cats: derivado(mdAbs, '.categorias.json', { crear: false }) });

// (to-do 298 a3) LA HUELLA DEL CÓDIGO DE LA VERIFICACIÓN. verificar.mjs la guarda en cada .verificacion.json (`scriptHuella`); cargar.mjs la compara con la de hoy
// y AVISA (no frena) si no coincide: ese caché lo hizo otra versión del verificador. Caso: St. Gallen 2019 y 2022 se cargaron con un caché anterior a la 298 ai y
// quedaron con la compensación intragrupo sumada. Qué entra: verificar.mjs y los tres archivos de reglas que cambian lo que da (vocabulario, nbb, verify-numbers);
// no la cola, los ajustes ni los registros, que cambian todos los días sin cambiar el algoritmo. Un caché sin el campo (hecho antes de este sello) no avisa.
let _huellaVerificar = null;
export function huellaVerificar() {
  if (_huellaVerificar) return _huellaVerificar;
  const dir = import.meta.dirname;
  _huellaVerificar = sha1(['verificar.mjs', 'vocabulario.mjs', 'nbb.mjs', 'verify-numbers.mjs'].map((f) => readFileSync(resolve(dir, f), 'utf8')).join('\u0000')).slice(0, 12);
  return _huellaVerificar;
}

export function huellaRubros(rj) {
  return sha1(JSON.stringify((rj?.rubros || []).map((r) => [r.label, r.lado ?? null, r.values ?? null, r.page ?? null, r.columns ?? null])));
}
export function huellaJev(jj) {
  return sha1(JSON.stringify((jj?.rubros || []).map((r) => [r.label, r.side ?? r.lado ?? null, r.choice ?? r.categoria ?? null, r.confidence ?? r.confianza ?? null])));
}

// ¿El .jev.json existe y se hizo sobre la lista de rubros ACTUAL?
export function jevAlDia(mdAbs) {
  const p = rutas(mdAbs); const rj = leer(p.rubros); const jj = existsSync(p.jev) ? leer(p.jev) : null;
  return Boolean(rj && jj && jj.rubrosHuella === huellaRubros(rj));
}
// ¿El .categorias.json existe y se hizo sobre la lista de rubros y el .jev.json ACTUALES?
export function categoriasAlDia(mdAbs) {
  const p = rutas(mdAbs); const rj = leer(p.rubros); const jj = leer(p.jev); const cj = existsSync(p.cats) ? leer(p.cats) : null;
  return Boolean(rj && jj && cj && cj.rubrosHuella === huellaRubros(rj) && cj.jevHuella === huellaJev(jj));
}

// Lista de PDFs de un archivo (una ruta por línea, # = comentario), como la usan pipeline.mjs y resolver-inventario.mjs.
export function leerLista(ruta) {
  return new Set(readFileSync(ruta, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')));
}
