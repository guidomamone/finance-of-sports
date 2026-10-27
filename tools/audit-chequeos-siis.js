// tools/audit-chequeos-siis.js — checkSiisControl, checkSiisEntreAnios, checkSiisFaltante: lo cargado de un país con SIIS (Supersociedades) contra SIIS, y los años de SIIS que todavía no se bajaron (punto 463).
// Sin red: leen el resumen que genera `node tools/siis-estado.mjs --inventario --escribir` (Admin/sourcing/<País>/siis-resumen.json) y tools/siis-clubes.json. Avisos P3: no frenan nada.

const { ROOT, add, fs, path } = require('./audit-base.js');

const leer = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')); } catch { return null; } };
function contexto() {
  const cfg = leer('tools/siis-clubes.json'); if (!cfg) return null;
  const resumen = leer(`Admin/sourcing/${cfg.pais}/siis-resumen.json`); if (!resumen) return null;
  return { cfg, resumen };
}
const mill = (pesos) => `${(pesos / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })} M`;

// siis-control: el resultado y los ingresos cargados contra los de SIIS en cada año. El resultado tiene que coincidir (tolerancia de redondeo); los ingresos cargados no pueden ser MENOS que
// los ingresos ordinarios de SIIS (pueden ser más: el total cargado suma otros ingresos que SIIS cuenta aparte). Un caso ya revisado se silencia con tools/silenciar.mjs.
function checkSiisControl() {
  const c = contexto(); if (!c) return;
  let comparados = 0;
  for (const e of Object.values(c.cfg.clubes)) {
    if (!e.clubId) continue;
    const j = leer(`data/${e.clubId.split('-').pop()}/${e.clubId}.json`);
    if (!j || j.club?.reporting_currency !== c.cfg.moneda) continue;
    const escala = j.unit?.scale || 1;
    for (const y of j.years || []) {
      const t = y.official_totals; const s = c.resumen.nits[e.nit]?.anios?.[String(y.fiscal_year)];
      if (!t || !s) continue;
      comparados++;
      if (t.net_result != null && s.utilidades != null) {
        const cargado = t.net_result * escala, siis = s.utilidades * 1000;
        if (Math.abs(cargado - siis) > Math.max(2e3, 0.0005 * Math.abs(siis))) add('P3', 'siis-control', `${e.clubId} ${y.fiscal_year}: resultado cargado ${mill(cargado)} contra ${mill(siis)} en SIIS (${c.cfg.moneda}); mirar el documento y, si SIIS está bien, corregir con un ajuste`);
      }
      if (t.revenue != null && s.ingresos != null && t.revenue * escala < s.ingresos * 1000 * 0.999) add('P3', 'siis-control', `${e.clubId} ${y.fiscal_year}: ingresos cargados ${mill(t.revenue * escala)} son menos que los ingresos ordinarios de SIIS (${mill(s.ingresos * 1000)}); falta algún ingreso`);
    }
  }
  if (!comparados) add('P3', 'siis-control', 'no se pudo comparar ningún club-año con SIIS: revisá tools/siis-clubes.json (clubId) y Admin/sourcing/<País>/siis-resumen.json');
}

// siis-faltante: años que SIIS tiene (con estado de resultados) y la carpeta del club no tiene como siis-estado-AAAA.md, sin contar los frenados (tools/siis-clubes.json). Un solo aviso con el total:
// el detalle por club está en Admin/sourcing/<País>/siis-inventario.md. Y si el resumen tiene más de 120 días, hay que volver a generarlo (SIIS publica cada año).
function checkSiisFaltante() {
  const c = contexto(); if (!c) return;
  const porClub = [];
  for (const [carpeta, e] of Object.entries(c.cfg.clubes)) {
    const frenados = new Set(e.frenados || []);
    const dir = path.join(ROOT, 'Clubes', c.cfg.pais, carpeta);
    const faltan = Object.entries(c.resumen.nits[e.nit]?.anios || {}).filter(([a, d]) => d.estado && !frenados.has(a) && !fs.existsSync(path.join(dir, `siis-estado-${a}.md`))).map(([a]) => a);
    if (faltan.length) porClub.push([carpeta, faltan]);
  }
  const total = porClub.reduce((n, [, f]) => n + f.length, 0);
  if (total) add('P3', 'siis-faltante', `${total} club-año(s) de ${c.cfg.pais} que SIIS tiene y no están bajados, en ${porClub.length} club(es) (Admin/sourcing/${c.cfg.pais}/siis-inventario.md): ${porClub.slice(0, 4).map(([k, f]) => `${k} ${f.length}`).join(', ')}…`);
  const dias = (Date.now() - new Date(c.resumen.generado).getTime()) / 86400000;
  if (dias > 120) add('P3', 'siis-resumen-viejo', `el resumen de SIIS es del ${c.resumen.generado} (${Math.round(dias)} días): volvé a generarlo con node tools/siis-estado.mjs --inventario --escribir`);
}

// siis-entre-anios: los rubros de un año contra el comparativo que el año siguiente imprime (los siis-estado-AAAA.md de cada club, sin red). Dos cosas: los intercambios son P3 y la reexpresión P4 (informativa):
//  - rótulos intercambiados: el comparativo de AAAA+1 le da a un rubro de gasto el importe que AAAA imprime con OTRO rótulo (Tolima y La Equidad 2024: «Gastos de ventas» y «Gastos de administración» cambian de lugar; Bucaramanga 2018:
//    «Costo de ventas» pasa a «Gastos de ventas»). Un año cargado con el rótulo y no con el contenido publica la actividad deportiva como administración (regla de Colombia en Admin/CONVENCIONES-DATOS.md): mirar el año y, si ya está bien, silenciar.
//  - reexpresión material: ingresos o resultado del comparativo que difieren de lo que el año imprimió en más de 1 % de los ingresos. Un aviso por club.
const RUBROS_DE_GASTO_E_INGRESO = ['Costo de ventas', 'Gastos de ventas', 'Gastos de administración', 'Otros ingresos', 'Otros gastos', 'Costos financieros', 'Ingresos financieros'];
const cifra = (t) => { const x = String(t).trim(); if (!/\d/.test(x)) return null; const n = Number(x.replace(/[().\s]/g, '')); return /^\(/.test(x) ? -n : n; };
function estadoDeMd(md) {
  const L = md.split('\n'); const i = L.findIndex((l) => /^### Estado de resultados integral/.test(l)); if (i < 0) return null;
  const filas = new Map();
  for (let k = i + 4; k < L.length && /^\|/.test(L[k]); k++) { const c = L[k].split('|').map((x) => x.trim()); const a = cifra(c[2]); if (c[1] && a != null) filas.set(c[1], { act: a, ant: cifra(c[3]) }); }
  return filas;
}
function checkSiisEntreAnios() {
  const c = contexto(); if (!c) return;
  for (const carpeta of Object.keys(c.cfg.clubes)) {
    const dir = path.join(ROOT, 'Clubes', c.cfg.pais, carpeta); if (!fs.existsSync(dir)) continue;
    const anios = fs.readdirSync(dir).map((f) => f.match(/^siis-estado-(\d{4})\.md$/)?.[1]).filter(Boolean).sort();
    const E = new Map(anios.map((y) => [y, estadoDeMd(fs.readFileSync(path.join(dir, `siis-estado-${y}.md`), 'utf8'))]));
    const reexp = [];
    for (const y of anios) {
      const cur = E.get(y), sig = E.get(String(Number(y) + 1)); if (!cur || !sig) continue;
      const ing = Math.abs(cur.get('Ingresos de actividades ordinarias')?.act || 0); if (!ing) continue;
      const vistos = new Set();
      for (const [etq, v] of sig) {
        if (!RUBROS_DE_GASTO_E_INGRESO.includes(etq) || v.ant == null) continue;
        const mio = cur.get(etq); if (mio && Math.abs(mio.act - v.ant) <= 1) continue;
        const otro = RUBROS_DE_GASTO_E_INGRESO.find((e2) => e2 !== etq && cur.get(e2) && Math.abs(cur.get(e2).act - v.ant) <= 1 && Math.abs(v.ant) > 0.005 * ing);
        if (!otro) continue;
        const par = [etq, otro].sort().join('|'); if (vistos.has(par)) continue; vistos.add(par);
        add('P3', 'siis-entre-anios', `${carpeta} ${y}→${Number(y) + 1}: «${etq}» y «${otro}» cambian de lugar (el comparativo de ${Number(y) + 1} le da a «${etq}» el importe que ${y} imprime como «${otro}»): mirar que ${y} esté cargado por el contenido y no por el rótulo`);
      }
      for (const [etq, que] of [['Ingresos de actividades ordinarias', 'ingresos'], ['Ganancia (pérdida)', 'resultado']]) { const v = sig.get(etq), m = cur.get(etq); if (v && m && v.ant != null && Math.abs(v.ant - m.act) > 0.01 * ing) reexp.push(`${y}→${Number(y) + 1} ${que} ${(((v.ant - m.act) / 1e3)).toLocaleString('es-AR', { maximumFractionDigits: 0 })} M`); }
    }
    if (reexp.length) add('P4', 'siis-entre-anios', `${carpeta}: reexpresión de ingresos o resultado en el comparativo del año siguiente (más de 1 % de los ingresos): ${reexp.join('; ')} (millones de pesos; informativo: cada año se carga como lo imprimió su estado)`);
  }
}

// regla-nota-contradicha: las líneas de gastos cargadas que la regla por nota (NOTA-CATEGORÍA de CONVENCIONES-DATOS: personal, viajes y «Diversos» de la nota de gastos de Colombia) manda a otra categoría.
// Las lista `node tools/reglas-categoria.mjs --cargadas`, que mira la nota de cada fila; se corrige con `recategorizar-linea --gasto` (o recargando el año) y un commit con `Corrige:`. Aviso P3 por club.
function checkReglaNotas() {
  let out; try { out = require('child_process').execFileSync('node', ['tools/reglas-categoria.mjs', '--cargadas'], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString(); } catch (e) { add('P3', 'regla-nota-contradicha', `tools/reglas-categoria.mjs --cargadas falló: ${String(e.stderr || e.message).split('\n')[0]}`); return; }
  const porClub = new Map();
  for (const l of out.split('\n').filter((x) => x.includes(' | '))) { const club = l.split(' ')[0]; (porClub.get(club) || porClub.set(club, []).get(club)).push(l.slice(club.length + 1)); }
  for (const [club, ls] of porClub) add('P3', 'regla-nota-contradicha', `${club}: ${ls.length} línea(s) de gastos que la regla por nota manda a otra categoría: ${ls.slice(0, 4).join('; ')}${ls.length > 4 ? '…' : ''} (node tools/reglas-categoria.mjs --cargadas; se corrige con recategorizar-linea --gasto y «Corrige:»)`);
}

// dictamen-fechas-ajenas: un dictamen del registro de auditoría cuya firma es anterior al cierre del ejercicio (o 30 meses posterior) o cuyo .md no nombra el año del cierre: suele ser la plantilla de otro
// año (Alianza FC 2024 y 2025, firmados en marzo del mismo año del cierre). Lo lista `node tools/dictamen-fechas.mjs`; se mira contra el documento y, si el dictamen es de otro ejercicio, se corrige el registro. Aviso P3.
function checkDictamenFechas() {
  let out; try { out = require('child_process').execFileSync('node', ['tools/dictamen-fechas.mjs'], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString(); } catch (e) { add('P3', 'dictamen-fechas-ajenas', `tools/dictamen-fechas.mjs falló: ${String(e.stderr || e.message).split('\n')[0]}`); return; }
  for (const l of out.split('\n').filter((x) => /^\S+ \d{4}: /.test(x))) add('P3', 'dictamen-fechas-ajenas', `${l} (node tools/dictamen-fechas.mjs; mirar el documento: si el dictamen es de otro ejercicio, corregir Admin/registros/auditoria.jsonl)`);
}

module.exports = { checkSiisControl, checkSiisEntreAnios, checkSiisFaltante, checkReglaNotas, checkDictamenFechas };
