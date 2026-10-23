// ============================================================================
// tools/datos-sitio.mjs — dos utilidades que usan las etapas del pipeline: leer los datos del sitio (loadSite) y leer un importe impreso
// (parseNumber). Vivían en tools/proponer-carga.mjs, el camino viejo de la carga (selección de filas por palabras y su backtest), que se
// archivó en el to-do 218: hoy toda carga sale de la verificación (cargar.mjs, Generados/.../<doc>.verificacion.json).
//
// USO:
//   import { loadSite, parseNumber } from './datos-sitio.mjs';
//   loadSite()               -> { generic: window.CLUB_GENERIC_DATA, clubs }  (data/clubs.js, currency-map, sources-view y los data files)
//   parseNumber('(1.234,5)') -> -1234.5   (formato de miles y decimales de cada país, paréntesis y signo; null si no hay número)
// ============================================================================
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { archivosData } from './data-clubes.js';

const root = resolve(import.meta.dirname, '..');

export function loadSite() {
  const sandbox = { console, window: {} }; sandbox.window.window = sandbox.window;
  const ctx = vm.createContext(sandbox);
  const files = ['data/clubs.js', 'data/currency-map.js', 'data/sources-view.js', ...archivosData()];
  for (const rel of files) vm.runInContext(readFileSync(resolve(root, rel), 'utf8'), ctx, { filename: rel });
  return { generic: vm.runInContext('window.CLUB_GENERIC_DATA', ctx), clubs: vm.runInContext('typeof clubs !== "undefined" ? clubs : null', ctx) };
}

export function parseNumber(raw) {
  // sin las marcas de negrita del Markdown: "**67.881.535**" se leía 67,881 y "**(727.914)**" positivo (Bologna 2019-20, UC 2009)
  let s = String(raw).trim().replace(/\*\*|__/g, '').replace(/R\$|[$€£¥]/g, '').replace(/^\s*-\s+(?=\()/, '').trim();
  if (!/\d/.test(s)) return null;
  s = s.replace(/(\d)\s+(?=\d)/g, '$1');
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−') || (s.startsWith('–') && /^–\s*\d/.test(s))) { neg = true; s = s.slice(1); } // el guion largo (U+2013) pegado a un dígito es un menos: FC Basel y FC Luzern lo imprimen así ("–14 000 000.00" se leía +14 M). Un "–" sin cifra sigue sin ser número.
  const c = s.lastIndexOf(','); const d = s.lastIndexOf('.');
  if (c !== -1 && d !== -1) s = c > d ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (c !== -1) s = /,\d{3}$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (d !== -1 && /\.\d{3}$/.test(s) && s.replace(/\./g, '').length > 3) s = s.replace(/\./g, '');
  const n = parseFloat(s.replace(/[^0-9.eE-]/g, ''));
  return Number.isNaN(n) ? null : (neg ? -n : n);
}
