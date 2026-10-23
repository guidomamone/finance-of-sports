#!/usr/bin/env node
// ============================================================================
// tools/relevancia-filas.mjs — ¿CUÁNTO SIRVE CADA FILA DEL FORMATO SIMPLIFICADO? (pedido de Guido: decidir con datos si una fila, o una candidata como «subsidios y donaciones», es útil para muchos clubes o para un par).
//
// QUÉ DA. Con el motor de la página (js/finanzas-calc.js en Node, las mismas filas que ve el visitante; dentro-de-otro.mjs lo usa igual), para cada fila de Ingresos y de Gastos, sobre los club-años que son BALANCE
// (reportType official_balance_sheet; un presupuesto o una estimación no cuenta):
//   - con número: cuántos club-años tienen la fila ≠ 0, y cuántos CLUBES la tienen alguna vez (de todos los medidos);
//   - cuando la tiene, qué pesa: mediana de su % de la sección y qué parte de los casos pasa de 10 %;
//   - cero real: el club-año muestra «0» (el documento no tiene el concepto o no hay plata);
//   - «—» (sin saber): hay un bolsón «sin desglosar» con plata y la fila está en 0, no se puede afirmar nada; y «dentro de otro» (incluidoEn).
//   - dónde: por país y por deporte, clubes que la tienen alguna vez / clubes medidos de ese grupo. Una fila que solo existe en un par de países se ve en esa línea.
//
// CANDIDATAS. `--etiqueta "<regex>"` mide lo mismo para un concepto que HOY NO ES FILA: las líneas (rawLabel) que caen en «Otros ingresos» / «Otros gastos» y matchean la expresión
// (por defecto la de subsidios y donaciones). Es la prueba de si abrir una categoría vale la pena, antes de votarla (Admin/CONVENCIONES.md, revisión de categorías).
//
// USO:
//   node tools/relevancia-filas.mjs                       escribe Admin/mediciones/filas-formato-simplificado.md (generado; lo corre publicarCambios al cerrar una carga)
//   node tools/relevancia-filas.mjs --ver                 imprime las tablas sin escribir
//   node tools/relevancia-filas.mjs --check               sale con 1 si ese archivo quedó viejo
//   node tools/relevancia-filas.mjs --etiqueta "regex" [--lado ingresos|gastos]   una candidata
//   node tools/relevancia-filas.mjs --fila "Educación"    los clubes concretos que tienen esa fila (y su % de la sección)
// ============================================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { motor } from './dentro-de-otro.mjs';
import { deporteDeClub } from './deporte-club.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const SALIDA = resolve(ROOT, 'Admin', 'mediciones', 'filas-formato-simplificado.md');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const ETIQUETA_ESTRICTA = 'subs[ií]d|subven|donac|\\bgrants?\\b|επιχορ|δωρε|субсид|пожертв|subsidie|tilskud';
const ETIQUETA_AMPLIA = `${ETIQUETA_ESTRICTA}|aporte|contribu|взнос|bijdrage|støtte|stöd`; // cota superior: puede atrapar líneas que no son subsidios (aportes de socios, contribuciones)

const iso = (id) => id.split('-').pop().toUpperCase();
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)} %` : '-');
const mediana = (xs) => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

function medir(M) {
  const clubes = []; // { id, pais, deporte, anios: [{ y, lados }] }
  for (const [id, d] of Object.entries(M.G)) {
    const anios = [];
    for (const [y, meta] of Object.entries(d.fiscalYearMeta || {})) {
      if (meta.reportType !== 'official_balance_sheet' || !(d.revenueLinesByYear?.[y] || []).length) continue;
      let r; try { r = M.reporte(id, y); } catch { continue; }
      if (r) anios.push({ y, lados: { ingresos: r.ingresos || [], gastos: r.gastos || [] } });
    }
    if (anios.length) clubes.push({ id, pais: iso(id), deporte: deporteDeClub(id) || 'futbol', anios });
  }
  return clubes.sort((a, b) => a.id.localeCompare(b.id));
}

const total = (filas) => filas.reduce((s, f) => s + Math.abs(f.value), 0); // los gastos vienen con signo: el peso es en valor absoluto

// una «fila» es una función (lado, filas del año) -> { valor, estado }
function estadisticas(clubes, lado, nombreFila, valorDe) {
  const e = { clubAnios: 0, conNumero: 0, cero: 0, raya: 0, dentro: 0, pesos: [], clubes: new Set(), porPais: {}, porDeporte: {}, ejemplos: [] };
  for (const c of clubes) {
    let tiene = false; e.porPais[c.pais] ??= [0, new Set()]; e.porDeporte[c.deporte] ??= [0, new Set()];
    e.porPais[c.pais][0]++ ; // se corrige abajo: cuenta clubes, no club-años
    for (const a of c.anios) {
      const filas = a.lados[lado]; const f = valorDe(filas, nombreFila);
      e.clubAnios++;
      if (!f) { e.cero++; continue; }
      if (f.value !== 0) { e.conNumero++; tiene = true; const t = total(filas); if (t > 0) e.pesos.push(Math.abs(f.value) / t); if (e.ejemplos.length < 4000) e.ejemplos.push({ id: c.id, y: a.y, peso: t > 0 ? Math.abs(f.value) / t : null }); }
      else if (f.unknown) e.raya++;
      else if (f.incluidoEn) e.dentro++;
      else e.cero++;
    }
    if (tiene) { e.clubes.add(c.id); e.porPais[c.pais][1].add(c.id); e.porDeporte[c.deporte][1].add(c.id); }
  }
  return e;
}

function filaDe(filas, label) { return filas.find((f) => f.label === label || (label.startsWith('Fútbol profesional') && f.label.endsWith('(sin desglosar por la fuente)') && f.label.split(' ')[0] === label.split(' ')[0])); }

function candidata(regex) {
  return (filas) => {
    const cat = filas.find((f) => /^Otros (ingresos|gastos)$/.test(f.label)); if (!cat?.items) return null;
    const v = cat.items.filter(([raw]) => regex.test(String(raw))).reduce((s, [, m]) => s + (m || 0), 0);
    return { value: v };
  };
}

function tablaMd(titulo, clubes, lado, nombres, valorDe) {
  const K = clubes.length; const out = [`### ${titulo}`, '', `| Fila | Club-años con número | Clubes que la tienen alguna vez | Cuando la tiene: mediana de la sección · casos ≥ 10 % | Cero real | «—» sin saber | Dentro de otro |`, '|---|---|---|---|---|---|---|`'.slice(0, -1)];
  const dondes = [];
  for (const n of nombres) {
    const e = estadisticas(clubes, lado, n.clave, n.fn || valorDe);
    const med = mediana(e.pesos); const m10 = e.pesos.filter((p) => p >= 0.1).length;
    out.push(`| ${n.nombre} | ${e.conNumero} de ${e.clubAnios} (${pct(e.conNumero, e.clubAnios)}) | ${e.clubes.size} de ${K} (${pct(e.clubes.size, K)}) | ${med == null ? '-' : `${(100 * med).toFixed(1)} % · ${pct(m10, e.pesos.length)}`} | ${e.cero} (${pct(e.cero, e.clubAnios)}) | ${e.raya} | ${e.dentro} |`);
    const clubesPais = {}; for (const c of clubes) (clubesPais[c.pais] ??= new Set()).add(c.id);
    const paises = Object.entries(e.porPais).map(([p, [, set]]) => [p, set.size, clubesPais[p].size]).filter(([, k]) => k > 0).sort((a, b) => b[1] - a[1]);
    const deportes = Object.entries(e.porDeporte).map(([d, [, set]]) => [d, set.size, clubes.filter((c) => c.deporte === d).length]).filter(([, k]) => k > 0);
    if (e.clubes.size && e.clubes.size / K < 0.6) dondes.push(`- **${n.nombre}** — países: ${paises.map(([p, k, t]) => `${p} ${k}/${t}`).join(' · ')}${deportes.length > 1 ? ` · deportes: ${deportes.map(([d, k, t]) => `${d} ${k}/${t}`).join(' · ')}` : ''}`);
  }
  return [...out, '', ...(dondes.length ? [`Dónde está (filas que tienen menos de 60 % de los clubes; países: clubes que la tienen alguna vez / clubes medidos):`, '', ...dondes, ''] : [''])].join('\n');
}

function reporte(M) {
  const clubes = medir(M); const K = clubes.length; const N = clubes.reduce((s, c) => s + c.anios.length, 0);
  const filasIng = M.B.ingresos.map((b) => ({ nombre: b.label, clave: b.label })).concat([{ nombre: 'Otros ingresos (catch-all)', clave: 'Otros ingresos' }]);
  const filasGas = M.B.gastos.map((b) => ({ nombre: b.label, clave: b.label })).concat([{ nombre: 'Otros gastos (catch-all)', clave: 'Otros gastos' }]);
  const cand = [
    { nombre: 'Subsidios y donaciones, estricta (subsidio, subvención, donación, grant…)', clave: 'estricta', fn: candidata(new RegExp(ETIQUETA_ESTRICTA, 'i')) },
    { nombre: 'Subsidios, donaciones y aportes, amplia (cota superior)', clave: 'amplia', fn: candidata(new RegExp(ETIQUETA_AMPLIA, 'i')) },
  ];
  return [
    '<!-- md: qué tan relevante es cada fila del Formato simplificado (cuántos clubes la usan, cuánto pesa, dónde) | leer: al revisar filas o antes de abrir una categoría; lo escribe node tools/relevancia-filas.mjs -->',
    '# Relevancia de las filas del Formato simplificado (generado)',
    '',
    `Lo escribe \`node tools/relevancia-filas.mjs --escribir\` (lo corre solo \`publicarCambios()\`); no se edita a mano. Base: ${K} clubes y ${N} club-años que son balance oficial (presupuestos y estimaciones no cuentan). Las filas son las que ve el visitante.`,
    '',
    '**Cómo leerla.** «Cero real» = la página muestra 0: el concepto no está en el documento. «—» = hay un bolsón «sin desglosar» con plata y la fila está en 0: no se sabe. La pregunta de una fila nueva o de Educación es la columna «Clubes que la tienen alguna vez» y, cuando la tienen, si pasa de 10 % de la sección; la línea «Dónde está» dice si son pocos países.',
    '',
    tablaMd('Ingresos', clubes, 'ingresos', filasIng, filaDe),
    tablaMd('Gastos', clubes, 'gastos', filasGas, filaDe),
    tablaMd('Candidata a fila (concepto que hoy no es fila)', clubes, 'ingresos', cand, null),
    'Otra candidata: `node tools/relevancia-filas.mjs --etiqueta "<regex>" [--lado gastos]`. Un club concreto de una fila: `--fila "Educación"`.',
    '',
  ].join('\n');
}

const M = motor();
if (flag('--etiqueta')) {
  const clubes = medir(M); const lado = flag('--lado') || 'ingresos';
  console.log(tablaMd(`Candidata /${flag('--etiqueta')}/ en «Otros ${lado === 'gastos' ? 'gastos' : 'ingresos'}»`, clubes, lado, [{ nombre: flag('--etiqueta'), clave: 'x', fn: candidata(new RegExp(flag('--etiqueta'), 'i')) }], null));
} else if (flag('--fila')) {
  const clubes = medir(M);
  for (const lado of ['ingresos', 'gastos']) {
    const e = estadisticas(clubes, lado, flag('--fila'), filaDe);
    if (!e.conNumero) continue;
    console.log(`${lado}: ${flag('--fila')} — ${e.clubes.size} club(es), ${e.conNumero} club-años`);
    const por = {}; for (const x of e.ejemplos) (por[x.id] ??= []).push(x.peso == null ? '?' : `${(100 * x.peso).toFixed(0)}%`);
    for (const [id, ps] of Object.entries(por)) console.log(`  ${id}: ${ps.length} año(s), % de la sección: ${ps.join(', ')}`);
  }
} else {
  const md = reporte(M);
  if (A.includes('--ver')) console.log(md);
  else if (A.includes('--check')) {
    if (!existsSync(SALIDA) || readFileSync(SALIDA, 'utf8') !== md + '\n') { console.error('Admin/mediciones/filas-formato-simplificado.md quedó viejo: node tools/relevancia-filas.mjs'); process.exit(1); }
    console.log('relevancia-filas: al día');
  } else { writeFileSync(SALIDA, md + '\n'); console.log(`escrito ${SALIDA.replace(ROOT + '/', '')}`); }
}
