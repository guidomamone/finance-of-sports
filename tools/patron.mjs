#!/usr/bin/env node
// ============================================================================
// tools/patron.mjs — el veredicto «general, parche o rechazada» de una mejora a una tool (auditoría, sección 8), por una tool y no de memoria.
//
// USO:
//   node tools/patron.mjs --cambio "<qué hace>" --patron "<regex sobre los .md>" [--rango A..B] [--tools a.mjs,b.mjs] [--sesion unica] [--motivo "…"] [--escribir]
//   node tools/patron.mjs --patron "<regex>"      solo cuenta (documentos y clubes) y dice parche o general; no mira ningún cambio
//
// Sin --rango mira lo que cambió en tools/ contra HEAD (más las tools nuevas); con --rango A..B, ese rango (para reproducir un caso viejo).
// Tres cosas, en orden:
//   1. SIN NOMBRES: ninguna línea de código agregada nombra un club (id, nombre o slug de data/clubs.js), un año literal ni una ruta de Clubes/.
//   2. CUÁNTOS: documentos y clubes de Clubes/**/*.md que cumplen --patron (regex JS, flags im). General: 3 documentos de 2 clubes o más.
//   3. NO ROMPE: la medición de Admin/registros/mediciones-pipeline.jsonl con la huella actual de cada tool cambiada, idéntica o explicada.
// Veredicto: GENERAL (las tres), PARCHE (el patrón no llega al umbral y no hay código que cambiar: imprime el `ajustes.mjs --agregar`),
// RECHAZADA (nombres, o código nuevo con un patrón por debajo del umbral), PENDIENTE (falta el patrón o la medición). --escribir anota
// GENERAL y RECHAZADA en Admin/registros/auditoria-proceso.jsonl, con la huella de cada tool: el hook de commit la pide para una tool del pipeline.
// Un cambio que solo toca comentarios o que mueve código sin cambiarlo no necesita veredicto (`cambioDeCodigo`; `--exento a.mjs,b.mjs [--indice]` lo dice, para el hook).
// ============================================================================
import { readFileSync, readdirSync, appendFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { clasificar } from './clasificar-tools.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const git = (a, o = {}) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28, ...o });
const REGISTRO = join(ROOT, 'Admin', 'registros', 'auditoria-proceso.jsonl');
const MEDICIONES = join(ROOT, 'Admin', 'registros', 'mediciones-pipeline.jsonl');
export const UMBRAL = { documentos: 3, clubes: 2 };

// El código de un archivo JS sin comentarios: una línea por elemento, sin blancos al borde ni líneas vacías.
// Recorre cadenas, plantillas y regex para no confundir `//` de una URL o de un patrón con un comentario.
export function codigoSinComentarios(src) {
  let out = '', i = 0, previo = '';
  const n = src.length;
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { i += 2; while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; out += ' '; continue; }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === '\\') j++; j++; }
      out += src.slice(i, j + 1); previo = c; i = j + 1; continue;
    }
    if (c === '/' && (previo === '' || '(,=:[!&|?{};+-*%<>~^'.includes(previo))) {
      let j = i + 1, clase = false;
      while (j < n && src[j] !== '\n' && (clase || src[j] !== '/')) { if (src[j] === '\\') j++; else if (src[j] === '[') clase = true; else if (src[j] === ']') clase = false; j++; }
      out += src.slice(i, j + 1); previo = '/'; i = j + 1; continue;
    }
    out += c; if (!/\s/.test(c)) previo = c; i++;
  }
  return out.split('\n').map((l) => l.trim().replace(/\s+/g, ' ')).filter(Boolean);
}

const cuenta = (ls) => { const m = new Map(); for (const l of ls) m.set(l, (m.get(l) || 0) + 1); return m; };
function sobran(a, b) { // líneas de a que b no tiene (con multiplicidad)
  const mb = cuenta(b), out = [];
  for (const l of a) { if (mb.get(l) > 0) mb.set(l, mb.get(l) - 1); else out.push(l); }
  return out;
}

// El código agregado y el quitado por un cambio a esas tools. base/destino: una revisión, 'indice' (lo staged) o null (el árbol de trabajo / HEAD).
export function cambioDeCodigo(nombres, { base = 'HEAD', destino = null } = {}) {
  const viejo = [], nuevo = [];
  for (const n of nombres) {
    const ruta = `tools/${n}`;
    let a = ''; try { a = git(['show', `${base}:${ruta}`], { stdio: ['ignore', 'pipe', 'ignore'] }); } catch { /* tool nueva */ }
    let b = '';
    try { b = destino === 'indice' ? git(['show', `:${ruta}`], { stdio: ['ignore', 'pipe', 'ignore'] }) : destino ? git(['show', `${destino}:${ruta}`], { stdio: ['ignore', 'pipe', 'ignore'] }) : readFileSync(join(ROOT, ruta), 'utf8'); } catch { /* borrada */ }
    viejo.push(...codigoSinComentarios(a)); nuevo.push(...codigoSinComentarios(b));
  }
  const agregado = sobran(nuevo, viejo), quitado = sobran(viejo, nuevo);
  // solo comentarios: nada agregado ni quitado. Mudanza: lo agregado es, línea por línea, lo quitado.
  const mudanza = agregado.length === quitado.length && JSON.stringify([...agregado].sort()) === JSON.stringify([...quitado].sort());
  return { agregado, quitado, hayCodigo: !(mudanza || (!agregado.length && !quitado.length)) };
}

// 1. nombres de club, años y rutas de Clubes/ en las líneas agregadas
function nombresProhibidos() {
  const src = readFileSync(join(ROOT, 'data', 'clubs.js'), 'utf8');
  const palabras = new Set();
  for (const m of src.matchAll(/^\s*'([a-z0-9-]+-[a-z]{2})':/gm)) { palabras.add(m[1]); const slug = m[1].replace(/-[a-z]{2}$/, ''); if (slug.length >= 7) palabras.add(slug); }
  for (const m of src.matchAll(/\b(?:name|displayName):'([^']{7,})'/g)) palabras.add(m[1]);
  return palabras;
}
export function nombresEn(lineas, ignorar = []) {
  const prohibidos = nombresProhibidos(), halladas = [];
  const año = /\b(?:19[89]\d|20[0-3]\d)\b/, ruta = /\bClubes\//;
  for (const l of lineas) {
    const bajo = l.toLowerCase();
    const club = [...prohibidos].find((p) => !ignorar.includes(p) && new RegExp(`(^|[^a-z0-9-])${p.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z0-9-])`).test(bajo));
    if (club) halladas.push({ linea: l, motivo: `nombra un club («${club}»)` });
    else if (año.test(l)) halladas.push({ linea: l, motivo: 'año literal' });
    else if (ruta.test(l)) halladas.push({ linea: l, motivo: 'ruta de Clubes/' });
  }
  return halladas;
}

// 2. cuántos documentos y clubes tienen el patrón
function recorrer(dir, salida = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) recorrer(p, salida); else if (e.name.endsWith('.md')) salida.push(p);
  }
  return salida;
}
export function contar(patron) {
  const re = new RegExp(patron, 'im');
  const docs = [], clubes = new Set();
  for (const f of recorrer(join(ROOT, 'Clubes'))) {
    if (!re.test(readFileSync(f, 'utf8'))) continue;
    const r = relative(join(ROOT, 'Clubes'), f).split(sep);
    docs.push(r.join('/')); clubes.add(r.slice(0, 2).join('/'));
  }
  return { documentos: docs.length, clubes: clubes.size, ejemplos: docs.slice(0, 5) };
}

// 3. la medición con la huella de cada tool
function medicion(nombres, destino) {
  const lineas = existsSync(MEDICIONES) ? readFileSync(MEDICIONES, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const huella = (n) => (destino ? git(['rev-parse', `${destino === 'indice' ? '' : destino}:tools/${n}`]) : git(['hash-object', `tools/${n}`])).trim();
  const huellas = Object.fromEntries(nombres.map((n) => [n, huella(n)]));
  const BUENO = /^(idéntico|\d+ diferencias, todas explicadas)$/;
  const faltan = nombres.filter((n) => !lineas.some((l) => BUENO.test(l.resultado || '') && l.tools?.[n]?.despues === huellas[n]));
  const l = [...lineas].reverse().find((x) => nombres.some((n) => x.tools?.[n]?.despues === huellas[n]));
  return { huellas, faltan, linea: l && { fecha: l.fecha, resultado: l.resultado, nivel: l.lote?.nivel } };
}

function principal() {
  const A = process.argv.slice(2);
  const v = (k) => { const j = A.indexOf(k); return j < 0 ? undefined : A[j + 1]; };
  if (A.includes('--exento')) { // para el hook de commit: «si» si el cambio a esas tools es solo de comentarios o una mudanza
    console.log(cambioDeCodigo(v('--exento').split(',').filter(Boolean), { destino: A.includes('--indice') ? 'indice' : null }).hayCodigo ? 'no' : 'si');
    return;
  }
  const patron = v('--patron'), cambio = v('--cambio'), rango = v('--rango');
  if (!patron && !cambio) { console.error('Uso: node tools/patron.mjs --cambio "<qué hace>" --patron "<regex>" [--rango A..B] [--tools a.mjs] [--escribir]  (ver la cabecera)'); process.exit(1); }
  const [base, destino] = rango ? rango.split('..') : ['HEAD', null];
  let nombres = v('--tools')?.split(',');
  if (!nombres) {
    const cambiados = rango ? git(['diff', '--name-only', rango, '--', 'tools']) : `${git(['diff', '--name-only', 'HEAD', '--', 'tools'])}\n${git(['ls-files', '--others', '--exclude-standard', 'tools'])}`;
    const C = clasificar(ROOT); // solo las tools del pipeline y sus módulos: un medidor o una tool de orden no es lo que juzga la regla
    nombres = [...new Set(cambiados.split('\n').map((f) => f.match(/^tools\/([^/]+\.(?:mjs|js))$/)?.[1]).filter((n) => n && ['tools', 'modulo'].includes(C.clase(n))))];
  }
  const dif = nombres.length ? cambioDeCodigo(nombres, { base, destino }) : { agregado: [], quitado: [], hayCodigo: false };
  const cont = patron ? contar(patron) : null;
  const bajoUmbral = cont && (cont.documentos < UMBRAL.documentos || cont.clubes < UMBRAL.clubes);
  const nom = dif.hayCodigo ? nombresEn(dif.agregado, (v('--ignorar-nombre') || '').split(',').filter(Boolean)) : [];
  const med = dif.hayCodigo ? medicion(nombres, destino) : null;

  console.log(`Tools: ${nombres.join(', ') || '(ninguna)'} · código ${dif.hayCodigo ? `cambiado (+${dif.agregado.length} / -${dif.quitado.length} líneas sin comentarios)` : 'sin cambios (solo comentarios o mudanza)'}`);
  if (cont) console.log(`Patrón /${patron}/im: ${cont.documentos} documentos de ${cont.clubes} clubes (umbral ${UMBRAL.documentos} de ${UMBRAL.clubes})${cont.ejemplos.length ? `\n  p. ej. ${cont.ejemplos.join('\n        ')}` : ''}`);
  if (dif.hayCodigo) {
    console.log(nom.length ? `Nombres en el código (${nom.length}):\n${nom.slice(0, 8).map((x) => `  ${x.motivo}: ${x.linea.slice(0, 140)}`).join('\n')}` : 'Sin nombres: ningún club, año ni ruta de Clubes/ en el código agregado.');
    console.log(med.faltan.length ? `Sin medición con la huella actual: ${med.faltan.join(', ')} (node tools/fos.mjs medir pipeline).` : `Medición: ${med.linea?.resultado} (lote ${med.linea?.nivel}, ${med.linea?.fecha}).`);
  }

  let veredicto, motivo;
  if (!dif.hayCodigo && !cont) { console.log('Nada que decidir: el cambio no toca código (solo comentarios o mudanza).'); process.exit(0); }
  if (nom.length) { veredicto = 'RECHAZADA'; motivo = `el código nombra ${nom.length} cosa(s) que la regla general no puede nombrar (${nom[0].motivo})`; }
  else if (!cont) { veredicto = 'PENDIENTE'; motivo = 'falta --patron: sin el comando que cuenta los documentos no hay veredicto'; }
  else if (bajoUmbral && dif.hayCodigo) { veredicto = 'RECHAZADA'; motivo = `el patrón está en ${cont.documentos} documentos de ${cont.clubes} clubes (menos de ${UMBRAL.documentos} de ${UMBRAL.clubes}) y se quiso meter en el código; va como ajuste`; }
  else if (bajoUmbral) { veredicto = 'PARCHE'; motivo = `el patrón está en ${cont.documentos} documentos de ${cont.clubes} clubes: no se toca el código, va como ajuste`; }
  else if (dif.hayCodigo && med.faltan.length) { veredicto = 'PENDIENTE'; motivo = 'falta la medición con la huella actual'; }
  else { veredicto = 'GENERAL'; motivo = `sin nombres; ${cont.documentos} documentos de ${cont.clubes} clubes${med ? `; medición ${med.linea?.resultado}` : ''}`; }
  console.log(`\nVeredicto: ${veredicto} — ${motivo}`);
  if (veredicto === 'PARCHE' || (veredicto === 'RECHAZADA' && bajoUmbral)) {
    console.log(`Ajuste (completá el campo y la evidencia):\n  node tools/ajustes.mjs --agregar "${cont.ejemplos[0] ? `Clubes/${cont.ejemplos[0]}`.replace(/\.md$/, '.pdf') : '<pdf>'}" <campo> --valor "…" --motivo "${(cambio || patron).replace(/"/g, "'")}" --evidencia "pág. N del visor, .md L…"`);
  }
  if (A.includes('--escribir') && ['GENERAL', 'RECHAZADA'].includes(veredicto)) {
    const reg = {
      fecha: new Date().toISOString().slice(0, 10), sesion: v('--sesion') || 'unica', cambio,
      commit: rango ? rango : 'sin commit', veredicto: veredicto === 'GENERAL' ? 'GENERAL: SE COMMITEA' : 'RECHAZADA',
      patron: `/${patron}/im`, comando: `node tools/patron.mjs --patron ${JSON.stringify(patron)}`, documentos: cont.documentos, clubes: cont.clubes,
      antes: med?.linea ? `medición ${med.linea.fecha}` : 'sin código', despues: med?.linea ? `${med.linea.resultado} (lote ${med.linea.nivel})` : 'sin código',
      motivo: v('--motivo') ? `${motivo}. ${v('--motivo')}` : motivo, tools: med?.huellas,
    };
    appendFileSync(REGISTRO, `${JSON.stringify(reg)}\n`);
    console.log(`Anotado en ${relative(ROOT, REGISTRO)}.`);
  } else if (A.includes('--escribir')) console.log('No se anota: solo GENERAL y RECHAZADA quedan en el registro.');
}

if (import.meta.url === `file://${process.argv[1]}`) principal();
