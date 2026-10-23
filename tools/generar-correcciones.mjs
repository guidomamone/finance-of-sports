// ============================================================================
// tools/generar-correcciones.mjs — EL REGISTRO PÚBLICO DE CORRECCIONES. Diseño y decisiones de Guido: Admin/mediciones/247-plan.md.
//
// Qué hace. Recorre el historial de git de los data files de los clubes (data/**/<id>-data.js; el JSON y el JS cambian en el mismo commit, y el JS
// existe desde el principio del historial) y compara cada versión con la anterior. Un cambio sobre un año YA publicado que toca un importe, una
// categoría, las filas, un total, la caja o la deuda, la moneda, el tipo de cambio, la fuente o el perímetro es una corrección. Año nuevo, club
// nuevo, filas nuevas del mismo día del alta, reordenar y renombrar ids NO cuentan. Se agrupa por evento = (commit, club, año).
//
// Escribe (todo se REGENERA, no se edita):
//   data/correcciones/correcciones.json   todos los eventos (con schema_version, generated_at, registro_desde)
//   data/correcciones/<país>.json         los de un país (lo que lee el bloque de Finanzas; existe aunque no tenga eventos)
//   data/correcciones/correcciones.csv    plano, una fila por cambio, para periodistas
// `--check` avisa (exit 1) si algo de eso quedó viejo; lo corre audit.js (`correcciones-desfasado`, P1) y tools/generadores.mjs.
//
// El motivo (nunca se inventa), en este orden:
//   1. Admin/registros/correcciones.jsonl: una línea por evento {commit, club, anio, motivo_es, motivo_en?, fuente?}. `commit` es el sha (basta el prefijo).
//   2. El trailer `Corrige: <motivo en una frase>` del commit (en español; `Corrige-en:` es la versión en inglés, opcional). audit.js da
//      `correccion-sin-motivo` (P2) si un commit corrige un dato publicado y no tiene ni trailer ni línea.
//   3. Ninguno: motivo null, y el sitio dice «Motivo no registrado». Los asuntos de commit son jerga interna y no se publican.
// Un evento anterior a REGISTRO_DESDE sale marcado `anterior_al_registro` (Guido: se muestra, y la vista lo filtra por defecto).
// Solo cuenta lo que está en el HEAD actual. Caché de lo ya calculado: Generados/.cache-correcciones.json (gitignoreado; sin él tarda ~1 minuto).
// ============================================================================
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const ROOT = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const { idDeArchivo } = require('./data-clubes.js');
export const REGISTRO_DESDE = '2026-10-20'; // el día en que el JSON pasó a ser la fuente
const OBLIGA_DESDE = '2026-10-21'; // desde este día un commit que corrige un dato publicado necesita motivo (trailer `Corrige:`); audit.js: correccion-sin-motivo, P2
const SCHEMA = '1.0';
const DIR = resolve(ROOT, 'data/correcciones');
const CACHE = resolve(ROOT, 'Generados/.cache-correcciones.json');
const CURADO = resolve(ROOT, 'Admin/registros/correcciones.jsonl');
const EPS = 1e-6;
const git = (args, opts = {}) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 30, ...opts });

// ---------------------------------------------------------------- leer una versión
function leerVersion(blob) {
  let texto; try { texto = git(['cat-file', 'blob', blob]); } catch { return null; }
  const sb = { console, window: {}, sources: {}, gestionesByClub: {}, memberCountByClub: {} }; sb.window.window = sb.window;
  try { vm.runInContext(texto, vm.createContext(sb), { timeout: 5000 }); } catch { return null; }
  const ids = Object.keys(sb.window.CLUB_GENERIC_DATA || {}); if (ids.length !== 1) return null;
  const d = sb.window.CLUB_GENERIC_DATA[ids[0]]; const out = { id: ids[0], years: {}, fuentes: {} };
  for (const [sid, s] of Object.entries(sb.sources || {})) out.fuentes[sid] = s && s.title || sid;
  const rev = d.revenueLinesByYear || {}, exp = d.expenseLinesByYear || {}, meta = d.fiscalYearMeta || {};
  for (const y of new Set([...Object.keys(rev), ...Object.keys(exp)])) {
    const m = meta[y] || {}; const fila = (l) => ({ r: String(l.rawLabel), c: l.normalizedCategory, a: Number(l.amountNative) });
    out.years[y] = {
      rev: (rev[y] || []).map(fila), exp: (exp[y] || []).map(fila),
      meta: { moneda: m.currency ?? null, tipo_de_cambio: m.fx ?? null, fuente: m.sourceId ?? null, perimetro: m.reportType ?? null,
        total_ingresos: m.officialTotalRevenue ?? null, total_gastos: m.officialTotalExpenses ?? null, resultado: m.officialPAT ?? null, deuda: m.grossDebt ?? null, caja: m.cash ?? null },
    };
  }
  return out;
}
const claveFilas = (filas) => { const n = new Map(); return filas.map((f) => { const k = f.r; const i = (n.get(k) || 0) + 1; n.set(k, i); return [`${k}#${i}`, f]; }); };
const suma = (filas) => Math.round(filas.reduce((s, f) => s + (Number.isFinite(f.a) ? f.a : 0), 0) * 1e6) / 1e6;
const distintoNum = (a, b) => Math.abs(a - b) > EPS;
const sinPrefijo = (s, ...ids) => { let t = String(s ?? ''); for (const id of ids) if (id && t.startsWith(id)) { t = t.slice(id.length); break; } return t.replace(/^-+/, '').replace(/^[a-z]{2}-(?=[a-z0-9])/, ''); };

// Compara dos versiones y devuelve {año: {tipo, cambios[], filas_cambiadas?}} de los años publicados en las dos (o retirados).
function comparar(a, b) {
  const out = {};
  for (const y of Object.keys(a.years)) {
    const A = a.years[y], B = b.years[y];
    if (!B) { out[y] = { tipo: 'retirado', cambios: [{ lado: null, rotulo: null, campo: 'suma_ingresos', antes: suma(A.rev), despues: null, moneda: A.meta.moneda }, { lado: null, rotulo: null, campo: 'suma_gastos', antes: suma(A.exp), despues: null, moneda: A.meta.moneda }] }; continue; }
    const moneda = B.meta.moneda; const cambios = []; let nFilas = 0;
    for (const [lado, fa, fb] of [['ingresos', A.rev, B.rev], ['gastos', A.exp, B.exp]]) {
      const ma = new Map(claveFilas(fa)), mb = new Map(claveFilas(fb));
      for (const [k, f] of ma) {
        const g = mb.get(k);
        if (!g) { nFilas++; cambios.push({ lado, rotulo: f.r, campo: 'fila', antes: f.a, despues: null, moneda }); continue; }
        if (Number.isFinite(f.a) && Number.isFinite(g.a) && distintoNum(f.a, g.a)) { nFilas++; cambios.push({ lado, rotulo: f.r, campo: 'importe', antes: f.a, despues: g.a, moneda }); }
        if (f.c !== g.c) { nFilas++; cambios.push({ lado, rotulo: f.r, campo: 'categoria', antes: f.c, despues: g.c, moneda }); }
      }
      for (const [k, g] of mb) if (!ma.has(k)) { nFilas++; cambios.push({ lado, rotulo: g.r, campo: 'fila', antes: null, despues: g.a, moneda }); }
    }
    const metaCambios = [];
    for (const campo of Object.keys(A.meta)) {
      let x = A.meta[campo], z = B.meta[campo];
      if (campo === 'fuente') { x = sinPrefijo(x, a.id, b.id); z = sinPrefijo(z, a.id, b.id); }
      if (campo === 'fuente' && (a.fuentes[A.meta.fuente] || x) === (b.fuentes[B.meta.fuente] || z)) continue; // solo cambió el id (un renombre), no el documento
      if (x === z) continue;
      if (typeof x === 'number' && typeof z === 'number' && !distintoNum(x, z)) continue;
      if ((campo === 'deuda' || campo === 'caja') && x === 0 && (z == null || z === 0)) continue; // el 0 de la convención vieja era «sin dato»: pasar a null no es corrección
      if (x == null) continue; // «—» que pasa a tener valor es una ampliación, no una corrección
      metaCambios.push({ lado: null, rotulo: null, campo, antes: campo === 'fuente' ? (a.fuentes[A.meta.fuente] || A.meta.fuente) : x, despues: campo === 'fuente' ? (b.fuentes[B.meta.fuente] || B.meta.fuente) : z, moneda: ['moneda', 'perimetro', 'fuente', 'tipo_de_cambio'].includes(campo) ? null : moneda });
    }
    if (!cambios.length && !metaCambios.length) continue;
    const total = Math.max(A.rev.length + A.exp.length, 1);
    if (nFilas > total / 2) {
      out[y] = { tipo: 'recarga', filas_cambiadas: nFilas, cambios: [
        { lado: 'ingresos', rotulo: null, campo: 'suma_ingresos', antes: suma(A.rev), despues: suma(B.rev), moneda },
        { lado: 'gastos', rotulo: null, campo: 'suma_gastos', antes: suma(A.exp), despues: suma(B.exp), moneda }, ...metaCambios] };
      continue;
    }
    const todos = [...cambios, ...metaCambios]; const campos = new Set(todos.map((c) => c.campo));
    const tipo = campos.has('importe') ? 'valor' : campos.has('categoria') ? 'categoria' : cambios.length ? 'estructura' : ['total_ingresos', 'total_gastos', 'resultado', 'deuda', 'caja'].some((c) => campos.has(c)) ? 'total' : 'otro';
    out[y] = { tipo, cambios: todos };
  }
  return out;
}

// ---------------------------------------------------------------- recorrer el historial
function historial() {
  const salida = git(['log', '--reverse', '--topo-order', '-M', '--raw', '--no-abbrev', '--date=short', '--format=%x01%H%x02%ad%x02%B%x03', '--', 'data/*-data.js']);
  const commits = [];
  for (const bloque of salida.split('\x01').slice(1)) {
    const [cab, resto = ''] = bloque.split('\x03'); const [sha, fecha, cuerpo] = cab.split('\x02');
    const archivos = [];
    for (const l of resto.split('\n')) {
      const m = l.match(/^:\d+ \d+ ([0-9a-f]+) ([0-9a-f]+) ([A-Z])\d*\t([^\t]+)(?:\t([^\t]+))?$/); if (!m) continue;
      archivos.push({ antes: m[1], despues: m[2], st: m[3], ruta: m[5] || m[4], rutaVieja: m[5] ? m[4] : null });
    }
    if (archivos.length) commits.push({ sha, fecha, cuerpo: (cuerpo || '').trim(), archivos });
  }
  return commits;
}

function trailer(cuerpo, clave) { const m = cuerpo.match(new RegExp(`^${clave}:\\s*(.+)$`, 'mi')); return m ? m[1].trim() : null; }

function calcular() {
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}; let sucio = false;
  const memo = new Map(); const ver = (blob) => { if (!memo.has(blob)) { if (memo.size > 800) memo.clear(); memo.set(blob, leerVersion(blob)); } return memo.get(blob); };
  const cadena = new Map(); // ruta -> {ruta actual}: sigue un club a través de las mudanzas
  const primera = new Map(); // cadena -> {año: fecha de su primera publicación}
  const eventos = []; let sinLeer = 0;
  for (const c of historial()) {
    for (const f of c.archivos) {
      if (f.st === 'D') { cadena.delete(f.ruta); continue; }
      let k;
      if (f.rutaVieja && cadena.has(f.rutaVieja)) { k = cadena.get(f.rutaVieja); cadena.delete(f.rutaVieja); } else k = cadena.get(f.ruta) || { ruta: f.ruta };
      k.ruta = f.ruta; cadena.set(f.ruta, k);
      if (!primera.has(k)) primera.set(k, {});
      const pri = primera.get(k);
      const kA = `a:${f.despues}`; // los años de cada versión, en la caché: leer una versión es lo que cuesta
      if (!(kA in cache)) { const n = ver(f.despues); cache[kA] = n ? Object.keys(n.years) : null; sucio = true; }
      if (!cache[kA]) { sinLeer++; continue; }
      let evs = {};
      if (f.st !== 'A' && f.antes && !/^0+$/.test(f.antes)) {
        const clave = `${f.antes}>${f.despues}`;
        if (!(clave in cache)) { const viejo = ver(f.antes); const nuevo = ver(f.despues); cache[clave] = viejo && nuevo ? comparar(viejo, nuevo) : null; sucio = true; }
        evs = cache[clave]; if (!evs) sinLeer++;
      }
      for (const [y, e] of Object.entries(evs || {})) {
        if (pri[y] === c.fecha) continue; // dentro de la tanda de alta del año
        eventos.push({ k, anio: Number(y), sha: c.sha, fecha: c.fecha, cuerpo: c.cuerpo, ...e });
      }
      for (const y of cache[kA]) if (!pri[y]) pri[y] = c.fecha;
    }
  }
  if (sucio) { mkdirSync(resolve(ROOT, 'Generados'), { recursive: true }); writeFileSync(CACHE, JSON.stringify(cache)); }
  return { eventos, sinLeer };
}

// ---------------------------------------------------------------- armar la salida
export function armar() {
  const curado = existsSync(CURADO) ? readFileSync(CURADO, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : [];
  const { eventos: crudos, sinLeer } = calcular();
  const lineaCurada = (sha, club, anio) => curado.find((c) => sha.startsWith(c.commit) && c.club === club && Number(c.anio) === anio);
  const eventos = []; const vistos = new Set();
  for (const e of crudos) {
    const club = idDeArchivo(e.k.ruta); if (!club || !existsSync(resolve(ROOT, e.k.ruta))) continue;
    const id = `${club}-${e.anio}-${e.sha.slice(0, 7)}`; if (vistos.has(id)) continue; vistos.add(id);
    const cur = lineaCurada(e.sha, club, e.anio); const tes = trailer(e.cuerpo, 'Corrige'), ten = trailer(e.cuerpo, 'Corrige-en');
    eventos.push({ id, club_id: club, fiscal_year: e.anio, fecha: e.fecha, tipo: e.tipo, ...(e.filas_cambiadas ? { filas_cambiadas: e.filas_cambiadas } : {}), cambios: e.cambios,
      motivo_es: cur?.motivo_es ?? tes ?? null, motivo_en: cur?.motivo_en ?? ten ?? null, fuente: cur?.fuente ?? null,
      commit: e.sha.slice(0, 7), anterior_al_registro: e.fecha < REGISTRO_DESDE });
  }
  eventos.sort((a, b) => b.fecha.localeCompare(a.fecha) || a.club_id.localeCompare(b.club_id) || b.fiscal_year - a.fiscal_year);
  return { eventos, sinLeer };
}

const csvCelda = (v) => { if (v == null) return ''; const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
function archivos(eventos) {
  const sal = new Map();
  const base = { schema_version: SCHEMA, registro_desde: REGISTRO_DESDE, unit: { scale: 1000000, label: 'millions of currency' } };
  const j = (o) => `{${Object.entries(o).map(([k, v]) => k === 'events' ? `"events":[\n${v.map((e) => JSON.stringify(e)).join(',\n')}\n]` : `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(',')}}\n`;
  // (sin generated_at: el archivo tiene que salir idéntico si no cambió nada, para que --check funcione)
  sal.set('correcciones.json', j({ ...base, events: eventos }));
  const paises = new Set(readdirSync(resolve(ROOT, 'data')).filter((d) => /^[a-z]{2}$/.test(d)));
  for (const p of paises) sal.set(`${p}.json`, j({ ...base, country: p.toUpperCase(), events: eventos.filter((e) => e.club_id.endsWith(`-${p}`)) }));
  const cab = ['id', 'club_id', 'fiscal_year', 'fecha', 'tipo', 'lado', 'rotulo', 'campo', 'antes', 'despues', 'moneda', 'motivo_es', 'motivo_en', 'commit', 'anterior_al_registro'];
  const filas = [cab.join(',')];
  for (const e of eventos) for (const c of e.cambios.length ? e.cambios : [{}]) filas.push([e.id, e.club_id, e.fiscal_year, e.fecha, e.tipo, c.lado, c.rotulo, c.campo, c.antes, c.despues, c.moneda, e.motivo_es, e.motivo_en, e.commit, e.anterior_al_registro].map(csvCelda).join(','));
  sal.set('correcciones.csv', filas.join('\n') + '\n');
  return sal;
}

if (basename(process.argv[1] || '') === 'generar-correcciones.mjs') {
  const chequeo = process.argv.includes('--check');
  const { eventos, sinLeer } = armar(); const sal = archivos(eventos);
  if (process.argv.includes('--sin-motivo')) { // para audit.js: los commits que corrigen un dato publicado sin decir por qué
    const por = new Map(); for (const e of eventos) if (!e.motivo_es && e.fecha >= OBLIGA_DESDE) por.set(e.commit, [...(por.get(e.commit) || []), e.club_id]);
    console.log(JSON.stringify([...por].map(([commit, clubs]) => ({ commit, clubs: [...new Set(clubs)] }))));
  } else if (chequeo) {
    const malos = [...sal].filter(([n, t]) => !existsSync(resolve(DIR, n)) || readFileSync(resolve(DIR, n), 'utf8') !== t).map(([n]) => n);
    if (malos.length) { console.error(`data/correcciones/ desactualizado (${malos.slice(0, 4).join(', ')}${malos.length > 4 ? ', …' : ''}). Corré: node tools/generar-correcciones.mjs`); process.exit(1); }
    console.log('data/correcciones/ al día');
  } else {
    mkdirSync(DIR, { recursive: true });
    for (const [n, t] of sal) writeFileSync(resolve(DIR, n), t);
    const porTipo = {}; for (const e of eventos) porTipo[e.tipo] = (porTipo[e.tipo] || 0) + 1;
    console.log(`${eventos.length} eventos en ${new Set(eventos.map((e) => e.club_id)).size} clubes (${Object.entries(porTipo).map(([t, n]) => `${t} ${n}`).join(', ')}); ${eventos.filter((e) => !e.anterior_al_registro).length} desde el registro; ${eventos.filter((e) => e.motivo_es).length} con motivo; versiones sin leer: ${sinLeer}`);
  }
}
