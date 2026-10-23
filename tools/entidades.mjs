#!/usr/bin/env node
// ============================================================================
// tools/entidades.mjs — LA ESTRUCTURA DE CADA CLUB: de qué entidad son los números de cada ejercicio, qué empresas hay arriba (la dueña
// inmediata y la última) y abajo (las controladas, dentro o fuera del consolidado), las otras entidades del club que no se cargan, y los
// grupos multiclub.
//
// DE DÓNDE SALE. De un registro escrito a mano o por subagentes, `Admin/registros/entidades.jsonl`, donde cada línea lleva una cita
// obligatoria. Este script no adivina entidades de las portadas (cada país las escribe distinto): verifica las citas y genera lo que lee el
// sitio. Una línea es una de tres cosas:
//
//   {"tipo":"entidad","id":"blueco-22","nombre":"Blueco 22 Limited","forma":"holding","pais":"GB","cita":{…}}
//       forma: club | sociedad | holding | asociacion | fundacion | fondo | persona. `clubId` si es un club del sitio. `grupo` (con `id`
//       para la URL, `nombre` y `alias`) si es la cabeza de un grupo multiclub: la que tiene página propia.
//   {"tipo":"relacion","de":"blueco-22","a":"chelsea-fc-holdings","rel":"controla","pct":100,"desde":2023,"hasta":null,"cita":{…}}
//       rel: controla (más del 50 %) | participa (minoría, con pct) | vinculada (sin control: una fundación, una sociedad hermana).
//       `consolidada` (true/false) en una relación `controla`: si la controlada entra en el consolidado de la que controla.
//       `desde`/`hasta`: ejercicios (el año de cierre, como en el sitio); null = abierto.
//   {"tipo":"carga","clubId":"chelsea-gb","anio":2025,"entidad":"chelsea-fc-holdings","perimetro":"consolidado","cita":{…}}
//       de qué entidad son los números de ese ejercicio. La cita es del documento fuente de ese año.
//
//   {"tipo":"carga-club","clubId":"lommelsk-be","entidad":"lommel-sk","perimetro":"individual","desde":2019,"hasta":2025,"cita":{…}}
// lo mismo para un RANGO de ejercicios con UNA sola cita: cada ejercicio cargado en el sitio dentro de [desde, hasta]
//       (hasta null = abierto) que no tenga su propia línea `carga` toma esta entidad y este perímetro. Para un club que no cambia de entidad
//       (un club con dueño y balance individual): una línea al dar el alta en lugar de una por año, que además no se puede agregar antes de
//       cargar el año. La cita es de un documento del club dentro del rango; una `carga` explícita del mismo año gana. Dos rangos del mismo
//       club que se pisan son un error.
//   {"tipo":"ingresos","entidad":"vitoria-sport-clube","anio":2022,"cierre":"2022-06-30","moneda":"EUR","total":4566468.26,
//    "filas":[{"md":"Clubes/…/x.md","linea":1348,"texto":"Vendas e serviços prestados | 13;22 | 3 820 068,63 €","valor":3820068.63},…]}
//       los ingresos de una entidad que NO se carga ese año, en la unidad del documento: los renglones de ingresos de su
//       estado de resultados (o su total impreso, un solo renglón), sin la ganancia por su parte de la sociedad que se carga (en Portugal,
//       "Ganhos imputados de subsidiárias"), que es resultado de esa sociedad y se contaría dos veces. `cierre` es su fecha de cierre, que
//       puede no ser la del club (una asociación con año calendario). `unidad` (1000 si el documento está en miles; sin ella, 1).
//   Cita de un documento: {"md":"Clubes/…/x.md","linea":3043,"texto":"The immediate parent company is Blueco 22 Midco Limited"}
//   Cita externa (lo que el balance no dice, p. ej. los otros clubes del dueño): {"url":"https://…","fecha":"","texto":"…"}
//   `que` ({es,en}) en una entidad: a qué se dedica, según el documento citado.
//   `nota` ({es,en}) solo donde las frases fijas de la pantalla no alcanzan (p. ej. dos entidades sumadas).
//
// CHEQUEOS (sale con código 1 si alguno falla):
//   - cada cita de documento: el texto está en esa línea del .md (±3 líneas, espacios normalizados) y el .md está trackeado en Clubes/;
//   - cada cita externa: url https, fecha AAAA-MM-DD y texto;
//   - (los ingresos del total de cada grupo salen de data/rankings/: si cambian, --check avisa que esto quedó viejo)
//   - cada carga: el club y el año están cargados en el sitio y el documento citado es de ese club y ese año (tools/quien.mjs);
//   - cada línea de ingresos: cada renglón está en su línea del .md y su texto trae el valor; la suma de los renglones da el total;
//     la entidad no es la que se carga ese año;
//   - ids únicos, relaciones y cargas que apuntan a entidades que existen, códigos de forma/rel/perímetro conocidos, sin ciclos de control.
// AVISOS (no frenan): clubes del sitio con una línea "otra entidad" en documentos-descartados.txt y sin ninguna entidad en el registro.
//
// QUÉ GENERA: `data/entidades/<país>.js` (window.CLUB_ENTIDADES[clubId] = { cargas, entidades, relaciones }, solo lo que toca a ese club:
// la cadena hacia arriba de cada entidad cargada, sus controladas y las vinculadas), `data/entidades/_grupos.js` (window.GRUPOS_INDICE =
// [{ id, nombre, alias, clubIds, clubes }], chico y eager: lo leen el buscador de js/selector.js y la tarjeta Estructura de Finanzas, con
// window.ENTIDADES_PAISES, los países que tienen archivo) y `data/entidades/_grupos-detalle.js` (window.GRUPOS[id] =
// { nombre, alias, clubes:[{ clubId|null, nombre, control, pct, desde, hasta }] }). Las citas de documento se publican como
// { md, linea } (la transcripción se publica); las externas, como { url }.
//
// USO:
//   node tools/entidades.mjs            verifica y escribe data/entidades/
//   node tools/entidades.mjs --check    verifica y compara sin escribir (código 1 si falla o quedó viejo; lo corre audit.js)
//   node tools/entidades.mjs --print    verifica e imprime la estructura de cada club
//   node tools/entidades.mjs --con <archivo> [--print]   verifica el registro más un borrador, sin escribir (los números de línea
//                                       que pasan del largo del registro son del borrador)
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execSync } from 'node:child_process';
import vm from 'node:vm';
import { loadSite, parseNumber } from './datos-sitio.mjs';
import { quien } from './quien.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const REGISTRO = 'Admin/registros/entidades.jsonl';
const DESCARTADOS = 'Admin/registros/documentos-descartados.txt';
const OUT = join(ROOT, 'data/entidades');
const args = process.argv.slice(2);
const CHECK = args.includes('--check') || args.includes('--con'), PRINT = args.includes('--print');

const FORMAS = new Set(['club', 'sociedad', 'holding', 'asociacion', 'fundacion', 'fondo', 'persona']);
const RELS = new Set(['controla', 'participa', 'vinculada']);
const PERIMETROS = new Set(['individual', 'consolidado', 'suma']);

const errores = [], avisos = [];
const err = (n, msg) => errores.push(`${REGISTRO}:${n}: ${msg}`);

// --- leer el registro ---------------------------------------------------------------------------------------------------------------
// --con <archivo>: verifica el registro MÁS las líneas de ese archivo (un borrador de un subagente) sin escribir nada.
const CON = (() => { const i = args.indexOf('--con'); return i >= 0 ? args[i + 1] : null; })();
const lineas = [...(existsSync(join(ROOT, REGISTRO)) ? readFileSync(join(ROOT, REGISTRO), 'utf8').split('\n') : []),
  ...(CON ? readFileSync(resolve(CON), 'utf8').split('\n') : [])];
const entidades = new Map(), relaciones = [], cargas = [], ingresos = [], rangos = [];
lineas.forEach((l, i) => {
  const n = i + 1;
  if (!l.trim() || l.trim().startsWith('//')) return;
  let o; try { o = JSON.parse(l); } catch (e) { return err(n, `JSON inválido (${e.message})`); }
  o._n = n;
  if (o.tipo === 'entidad') {
    if (!o.id || !o.nombre) return err(n, 'entidad sin id o sin nombre');
    if (entidades.has(o.id)) return err(n, `id repetido "${o.id}" (ya está en la línea ${entidades.get(o.id)._n})`);
    if (!FORMAS.has(o.forma)) err(n, `forma desconocida "${o.forma}"`);
    if (o.pais != null && !/^[A-Z]{2}$/.test(o.pais)) err(n, `país que no es un código ISO de 2 letras`); // sin pais: el documento no lo dice
    entidades.set(o.id, o);
  } else if (o.tipo === 'relacion') {
    if (!RELS.has(o.rel)) err(n, `rel desconocida "${o.rel}"`);
    if (o.rel === 'participa' && !(o.pct > 0 && o.pct <= 50)) err(n, 'participa sin pct entre 0 y 50');
    if (o.rel === 'controla' && o.pct != null && !(o.pct > 50)) err(n, 'controla con pct de 50 o menos (es participa)');
    relaciones.push(o);
  } else if (o.tipo === 'carga') {
    if (!PERIMETROS.has(o.perimetro)) err(n, `perímetro desconocido "${o.perimetro}"`);
    cargas.push(o);
  } else if (o.tipo === 'carga-club') {
    if (!PERIMETROS.has(o.perimetro) || o.perimetro === 'suma') err(n, `perímetro desconocido o no admitido en un rango "${o.perimetro}"`); // un rango no puede ser una suma: esa lleva nota por año
    if (!o.clubId || !o.entidad) err(n, 'carga-club sin clubId o sin entidad');
    if (!Number.isInteger(o.desde) || !(o.hasta == null || (Number.isInteger(o.hasta) && o.hasta >= o.desde))) err(n, 'carga-club con desde/hasta que no son ejercicios (hasta puede ser null)');
    rangos.push(o);
  } else if (o.tipo === 'ingresos') {
    if (!Array.isArray(o.filas) || !o.filas.length) err(n, 'ingresos sin filas');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(o.cierre || '') || !/^[A-Z]{3}$/.test(o.moneda || '') || typeof o.total !== 'number') err(n, 'ingresos sin cierre AAAA-MM-DD, moneda ISO o total');
    ingresos.push(o);
  } else err(n, `tipo desconocido "${o.tipo}"`);
});

// --- citas ----------------------------------------------------------------------------------------------------------------------------
const norm = (s) => String(s).replace(/[‘’´`]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
const mdCache = new Map();
// -z y sin quotepath: con acentos (Vitória Guimarães) git devuelve la ruta entre comillas y en octal; NFC para comparar igual.
const tracked = new Set(execSync('git -c core.quotepath=off ls-files -z Clubes', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 }).split('\0').map(f => f.normalize('NFC')));
function chequearCita(o) {
  const c = o.cita;
  if (!c) return err(o._n, 'sin cita');
  if (c.md) {
    if (!tracked.has(c.md.normalize('NFC'))) return err(o._n, `la cita apunta a un .md que no está trackeado: ${c.md}`);
    if (!Number.isInteger(c.linea) || !c.texto) return err(o._n, 'cita de documento sin linea o sin texto');
    if (!mdCache.has(c.md)) mdCache.set(c.md, readFileSync(join(ROOT, c.md), 'utf8').split('\n'));
    const ls = mdCache.get(c.md);
    const ventana = norm(ls.slice(Math.max(0, c.linea - 4), c.linea + 3).join(' '));
    if (!ventana.includes(norm(c.texto))) err(o._n, `el texto citado no está en ${c.md}:${c.linea} (±3)`);
  } else if (c.url) {
    if (!/^https:\/\//.test(c.url) || !/^\d{4}-\d{2}-\d{2}$/.test(c.fecha || '') || !c.texto) err(o._n, 'cita externa sin url https, fecha AAAA-MM-DD o texto');
  } else err(o._n, 'cita sin md ni url');
}
[...entidades.values(), ...relaciones, ...cargas, ...rangos].forEach(chequearCita);
for (const g of ingresos) {
  let suma = 0;
  for (const f of g.filas || []) {
    chequearCita({ _n: g._n, cita: f });
    const nums = (String(f.texto).match(/\(?-?[\d][\d .,]*\d\)?|\d/g) || []).map(parseNumber).filter(v => v != null);
    if (!nums.some(v => Math.abs(Math.abs(v) - Math.abs(f.valor)) < 0.005)) err(g._n, `el renglón "${f.texto}" no trae el valor ${f.valor}`);
    suma += f.valor;
  }
  if (Math.abs(suma - g.total) > 0.01) err(g._n, `los renglones suman ${suma.toFixed(2)}, no el total ${g.total}`);
}

// --- referencias y el sitio -------------------------------------------------------------------------------------------------------------
const { generic, clubs } = loadSite();
for (const e of entidades.values()) if (e.clubId && !clubs[e.clubId]) err(e._n, `clubId "${e.clubId}" no está en data/clubs.js`);
for (const r of relaciones) for (const k of ['de', 'a']) if (!entidades.has(r[k])) err(r._n, `${k}: "${r[k]}" no es una entidad del registro`);
for (const g of ingresos) {
  if (!entidades.has(g.entidad)) err(g._n, `entidad "${g.entidad}" no está en el registro`);
  if (cargas.some(c => c.entidad === g.entidad && c.anio === g.anio)) err(g._n, `"${g.entidad}" es la entidad cargada en ${g.anio}: sus ingresos ya están en el sitio`);
}
// Los rangos: se expanden a una carga por ejercicio cargado en el sitio, salvo los que tienen su propia línea `carga`.
const rangosPorClub = new Map();
for (const r of rangos) {
  if (!entidades.has(r.entidad)) err(r._n, `entidad "${r.entidad}" no está en el registro`);
  const club = generic[r.clubId];
  if (!club) { err(r._n, `el club "${r.clubId}" no tiene datos en el sitio`); continue; }
  if (r.cita?.md) {
    const q = quien(join(ROOT, r.cita.md.replace(/\.md$/, '.pdf')), r.clubId);
    if (q.error || !(q.year >= r.desde && (r.hasta == null || q.year <= r.hasta))) err(r._n, `el documento citado es del ejercicio ${q.year ?? '?'} según tools/quien.mjs, fuera del rango ${r.desde}-${r.hasta ?? ''}`);
  } else err(r._n, 'un rango se cita con un documento del club, no con una url');
  const previos = rangosPorClub.get(r.clubId) || [];
  const pisa = previos.find(p => r.desde <= (p.hasta ?? Infinity) && p.desde <= (r.hasta ?? Infinity));
  if (pisa) err(r._n, `el rango ${r.desde}-${r.hasta ?? ''} se pisa con el de la línea ${pisa._n}`);
  rangosPorClub.set(r.clubId, [...previos, r]);
  for (const y of Object.keys(club.fiscalYearMeta || {}).map(Number)) {
    if (y < r.desde || (r.hasta != null && y > r.hasta) || cargas.some(c => c.clubId === r.clubId && c.anio === y)) continue;
    cargas.push({ tipo: 'carga', clubId: r.clubId, anio: y, entidad: r.entidad, perimetro: r.perimetro, cita: r.cita, deducida: true, _n: r._n });
  }
}
const vistos = new Set();
for (const c of cargas) {
  if (!entidades.has(c.entidad)) err(c._n, `entidad "${c.entidad}" no está en el registro`);
  const club = generic[c.clubId];
  if (!club) { err(c._n, `el club "${c.clubId}" no tiene datos en el sitio`); continue; }
  if (!club.fiscalYearMeta?.[c.anio]) err(c._n, `${c.clubId} no tiene cargado el ejercicio ${c.anio}`);
  const clave = `${c.clubId}|${c.anio}|${c.entidad}`;
  if (vistos.has(clave)) err(c._n, `carga repetida ${clave}`); vistos.add(clave);
  if (c.deducida) { /* la cita es del rango: se verificó arriba */ } else if (c.cita?.md) {
    const q = quien(join(ROOT, c.cita.md.replace(/\.md$/, '.pdf')), c.clubId);
    if (q.error || q.year !== c.anio) err(c._n, `el documento citado es del ejercicio ${q.year ?? '?'} según tools/quien.mjs, no del ${c.anio}`);
  } else err(c._n, 'una carga se cita con su documento fuente, no con una url');
}
// Un ejercicio con dos cargas es una suma: todas sus cargas dicen perimetro "suma" y alguna lleva la nota.
const porAnio = new Map();
for (const c of cargas) { const k = `${c.clubId}|${c.anio}`; porAnio.set(k, [...(porAnio.get(k) || []), c]); }
for (const [k, cs] of porAnio) if (cs.length > 1 && (cs.some(c => c.perimetro !== 'suma') || !cs.some(c => c.nota))) err(cs[0]._n, `${k} tiene ${cs.length} entidades: van con perimetro "suma" y una nota`);

// Sin ciclos de control (A controla B controla A dejaría la cadena hacia arriba sin fin).
const padres = (id) => relaciones.filter(r => r.a === id && r.rel === 'controla').map(r => r.de);
for (const id of entidades.keys()) {
  const camino = new Set([id]); let frontera = padres(id);
  while (frontera.length) {
    const sig = [];
    for (const p of frontera) { if (p === id) { err(entidades.get(id)._n, `ciclo de control desde "${id}"`); sig.length = 0; break; } if (!camino.has(p)) { camino.add(p); sig.push(...padres(p)); } }
    frontera = sig;
  }
}

// Aviso: club del sitio con otra entidad descartada y nada en el registro.
const conEntidad = new Set([...cargas.map(c => c.clubId), ...[...entidades.values()].map(e => e.clubId).filter(Boolean)]);
// Solo las entidades del propio club (asociación, SAD, fundación, Verein…): no los errores de sourcing de una entidad ajena (un municipio).
const OTRA = /\(asociaci[oó]n|club asociaci[oó]n|no de la SAD|no de la SDUQ|fundaci[oó]n|Verein|Stichting|holding/i;
if (existsSync(join(ROOT, DESCARTADOS))) {
  const sinRegistro = new Map();
  for (const l of readFileSync(join(ROOT, DESCARTADOS), 'utf8').split('\n')) {
    if (!l.startsWith('Clubes/') || !OTRA.test(l.split(' # ')[1] || '')) continue;
    const q = quien(join(ROOT, l.split(' # ')[0]));
    if (q.clubId && generic[q.clubId] && !conEntidad.has(q.clubId)) sinRegistro.set(q.clubId, (sinRegistro.get(q.clubId) || 0) + 1);
  }
  for (const [id, k] of sinRegistro) avisos.push(`${id}: ${k} documento(s) de otra entidad en documentos-descartados.txt y ninguna entidad en el registro`);
}

if (errores.length) { console.error(errores.join('\n')); console.error(`\n${errores.length} error(es): no se escribe nada.`); process.exit(1); }

// --- armar lo que lee el sitio ------------------------------------------------------------------------------------------------------------
const citaPublica = (c) => (c.md ? { md: c.md, linea: c.linea } : { url: c.url });
const pub = (o, campos) => Object.fromEntries(campos.filter(k => o[k] !== undefined && o[k] !== null).map(k => [k, o[k]]).concat([['fuente', citaPublica(o.cita)]]));
const relPub = (r) => pub(r, ['de', 'a', 'rel', 'pct', 'consolidada', 'desde', 'hasta', 'nota']);

const porClub = {};
for (const clubId of [...new Set(cargas.map(c => c.clubId))].sort()) {
  const cs = cargas.filter(c => c.clubId === clubId).sort((a, b) => a.anio - b.anio);
  const ids = new Set(), rels = new Set();
  // hacia arriba (controla y participa) desde cada entidad cargada
  const subir = (id) => { if (ids.has(id)) return; ids.add(id); for (const r of relaciones.filter(r => r.a === id && r.rel !== 'vinculada')) { rels.add(r); subir(r.de); } };
  // hacia abajo, solo un nivel de controladas y participadas (lo que el consolidado incluye o deja afuera), y las vinculadas
  for (const c of cs) {
    subir(c.entidad);
    for (const r of relaciones.filter(r => r.de === c.entidad || (r.rel === 'vinculada' && r.a === c.entidad))) { rels.add(r); ids.add(r.a); ids.add(r.de); }
  }
  porClub[clubId] = {
    pais: clubs[clubId].country.toLowerCase(),
    cargas: cs.map(c => pub(c, ['anio', 'entidad', 'perimetro', 'nota'])),
    entidades: Object.fromEntries([...ids].sort().map(id => {
      const e = pub(entidades.get(id), ['nombre', 'forma', 'pais', 'clubId', 'grupo', 'que']);
      const ing = ingresos.filter(g => g.entidad === id).sort((a, b) => a.anio - b.anio);
      if (ing.length) e.ingresos = Object.fromEntries(ing.map(g => [g.anio, { total: +(g.total * (g.unidad || 1) / 1e6).toFixed(3), moneda: g.moneda, cierre: g.cierre, fuente: citaPublica(g.filas[0]) }]));
      return [id, e];
    })),
    relaciones: [...rels].sort((a, b) => a._n - b._n).map(relPub),
  };
}

// Grupos: los clubes bajo la cabeza del grupo (controla o participa, a cualquier profundidad), con el tramo de años de la relación directa
// con el club. Un club del grupo que no está en el sitio queda con clubId null y se muestra sin link.
// Los ingresos de cada club-ejercicio, en millones de USD y formato simplificado, tal como los publica data/rankings/ (el motor real,
// tools/generate-rankings.js): el total de un grupo es la suma de esos números, sin recalcular nada acá.
const ingresosRanking = {};
{
  const ctx = vm.createContext({ window: {} });
  for (const f of readdirSync(join(ROOT, 'data/rankings')).filter(f => f.endsWith('.js') && !f.startsWith('_')))
    vm.runInContext(readFileSync(join(ROOT, 'data/rankings', f), 'utf8'), ctx);
  for (const liga of Object.values(ctx.window.RANKINGS || {}))
    for (const [anio, r] of Object.entries(liga)) for (const c of r.clubs || []) (ingresosRanking[c.id] ||= {})[anio] = c.revenue;
}
const grupos = {};
for (const g of [...entidades.values()].filter(e => e.grupo)) {
  const clubesG = [];
  const bajar = (id, control, visto = new Set()) => {
    if (visto.has(id)) return; visto.add(id);
    for (const r of relaciones.filter(r => r.de === id && r.rel !== 'vinculada')) {
      const hijo = entidades.get(r.a), ctrl = control && r.rel === 'controla';
      const clubDeHijo = hijo.clubId || cargas.find(c => c.entidad === hijo.id)?.clubId || null;
      if (hijo.forma === 'club' || clubDeHijo) clubesG.push({ clubId: clubDeHijo, nombre: hijo.nombre, pais: hijo.pais, control: ctrl, pct: r.pct ?? null, desde: r.desde ?? null, hasta: r.hasta ?? null, fuente: citaPublica(r.cita) });
      else bajar(r.a, ctrl, visto);
    }
  };
  bajar(g.id, true);
  // El dueño último del grupo: hacia arriba por `controla` desde la cabeza.
  let top = null;
  for (let id = g.id, r; (r = relaciones.find(x => x.a === id && x.rel === 'controla')); id = r.de) top = r;
  const ingresos = {};
  for (const c of clubesG) if (c.clubId && c.control && ingresosRanking[c.clubId]) ingresos[c.clubId] = ingresosRanking[c.clubId];
  grupos[g.grupo.id || g.id] = { nombre: g.grupo.nombre || g.nombre, alias: g.grupo.alias || [], entidad: g.id, legal: g.nombre, pais: g.pais,
    fuente: citaPublica(g.cita), duenoUltimo: top ? { nombre: entidades.get(top.de).nombre, pais: entidades.get(top.de).pais, fuente: citaPublica(top.cita) } : null,
    clubes: clubesG, ingresos };
}

// --- escribir o comparar ---------------------------------------------------------------------------------------------------------------------
const CABECERA = '// Generado por tools/entidades.mjs desde Admin/registros/entidades.jsonl. No editar a mano.\n';
const archivos = {};
const paises = [...new Set(Object.values(porClub).map(c => c.pais))].sort();
for (const p of paises) {
  const delPais = Object.fromEntries(Object.entries(porClub).filter(([, c]) => c.pais === p).map(([id, { pais, ...resto }]) => [id, resto]));
  archivos[`${p}.js`] = `${CABECERA}window.CLUB_ENTIDADES = window.CLUB_ENTIDADES || {};\nObject.assign(window.CLUB_ENTIDADES, ${JSON.stringify(delPais, null, 1)});\n`;
}
const indice = Object.entries(grupos).map(([id, g]) => ({ id, nombre: g.nombre, alias: g.alias, clubIds: [...new Set(g.clubes.map(c => c.clubId).filter(Boolean))],
  clubes: g.clubes.map(({ clubId, nombre, control, desde, hasta }) => ({ clubId, nombre, control, desde, hasta })) }));
archivos['_grupos.js'] = `${CABECERA}window.GRUPOS_INDICE = ${JSON.stringify(indice)};\nwindow.ENTIDADES_PAISES = ${JSON.stringify(paises)};\n`;
archivos['_grupos-detalle.js'] = `${CABECERA}window.GRUPOS = ${JSON.stringify(grupos, null, 1)};\n`;

if (PRINT) {
  for (const [id, c] of Object.entries(porClub)) {
    console.log(`\n${id}`);
    for (const k of c.cargas) console.log(`  ${k.anio}: ${c.entidades[k.entidad].nombre} (${k.perimetro})`);
    for (const r of c.relaciones) console.log(`  ${c.entidades[r.de].nombre} --${r.rel}${r.pct ? ' ' + r.pct + '%' : ''}${r.consolidada === false ? ', fuera del consolidado' : ''}--> ${c.entidades[r.a].nombre}`);
  }
  for (const [id, g] of Object.entries(grupos)) console.log(`\ngrupo ${id} (${g.nombre}): ${g.clubes.map(x => `${x.nombre}${x.clubId ? '' : ' (sin cargar)'}${x.control ? '' : ` (${x.pct}%)`}`).join(', ')}`);
}
if (avisos.length) console.error(`Avisos:\n  ${avisos.join('\n  ')}`);

const actuales = existsSync(OUT) ? readdirSync(OUT).filter(f => f.endsWith('.js')) : [];
if (CHECK) {
  const viejos = [...Object.keys(archivos).filter(f => !existsSync(join(OUT, f)) || readFileSync(join(OUT, f), 'utf8') !== archivos[f]),
                  ...actuales.filter(f => !archivos[f])];
  if (viejos.length) { console.error(`data/entidades/ desactualizado: ${viejos.join(', ')}`); process.exit(1); }
  console.log(`data/entidades/ al día (${Object.keys(porClub).length} clubes, ${Object.keys(grupos).length} grupos).`);
} else {
  mkdirSync(OUT, { recursive: true });
  for (const f of actuales) if (!archivos[f]) rmSync(join(OUT, f));
  for (const [f, s] of Object.entries(archivos)) writeFileSync(join(OUT, f), s);
  console.log(`data/entidades/: ${Object.keys(archivos).length} archivos (${Object.keys(porClub).length} clubes, ${Object.keys(grupos).length} grupos, ${entidades.size} entidades, ${relaciones.length} relaciones, ${ingresos.length} ingresos).`);
}
