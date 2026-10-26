#!/usr/bin/env node
// ============================================================================
// tools/siis-estado.mjs — EL ESTADO DE RESULTADOS Y EL BALANCE DE SIIS (Supersociedades, Colombia) AL FORMATO DEL PIPELINE: .json crudo + .md fiel + PDF de ancla.
// Gratis, determinista, sin IA ni API paga. Regla y casos: Admin/CONVENCIONES-DATOS.md, «Colombia, el estado de resultados y el balance de SIIS…».
//
// POR QUÉ. Los PDF de «NOTAS EF» que SIIS guarda de algunos clubes traen solo las notas; el estado de resultados y el balance que el club cargó en el formulario están
// en la API pública del portal como datos (índices siis_resultadointegral y siis_sitfinan; cómo consultarlos: Admin/sourcing/Colombia/_notas-generales.md). Esta tool los baja
// y deja, al lado de los demás documentos del club en Clubes/Colombia/<Club>/, tres archivos por año: siis-estado-AAAA.json (la respuesta tal cual), siis-estado-AAAA.md
// (texto fiel: tablas de rubros con las cifras impresas en miles de pesos, motor «siis-api (determinista)» en la primera línea) y siis-estado-AAAA.pdf (la impresión del .md
// con Chrome sin ventana: ancla del registro y del visor, NO es el documento oficial). Después el documento es un PDF más: lote.mjs lo localiza, extrae, verifica y carga.
//
// COMPUERTAS (con una que falle no se escribe nada del año): (a) ingresos − costo de ventas = ganancia bruta; (b) ganancia bruta − gastos + otros ingresos − otros gastos
// ± otras ganancias + ingresos financieros − costos financieros = ganancia antes de impuestos; (c) ganancia antes de impuestos − impuesto + operaciones discontinuadas = ganancia del año; (d) ingresos y ganancia
// iguales a los de siis_empresas (financieros.ingresosEmpresa y utilidades); (e) activos = pasivos + patrimonio. Tolerancia 1 (miles). Aviso, sin frenar: el corteAnterior del
// año siguiente no es igual al corte de este (una reexpresión).
//
// USO:
//   node tools/siis-estado.mjs --club "Deportes Tolima" --anio 2025        ensayo de un año (no escribe)
//   node tools/siis-estado.mjs --club "Deportes Tolima" --todos            todos los años que SIIS tiene y la carpeta no
//   node tools/siis-estado.mjs --club todos --todos                        lo mismo para todas las carpetas de tools/siis-clubes.json
//   node tools/siis-estado.mjs --club "Deportes Tolima" --todos --escribir   escribe el .json, el .md y el .pdf (no pisa los que existen; --rehacer sí)
//   node tools/siis-estado.mjs --inventario [--escribir]                   qué tiene SIIS por NIT y qué falta en Clubes/Colombia/ (escribe Admin/sourcing/Colombia/siis-inventario.md)
//   node tools/siis-estado.mjs --faltantes                                 imprime los club-años que SIIS tiene y la carpeta no (lo usa audit.js)
// El NIT de cada carpeta está en tools/siis-clubes.json.
// ============================================================================
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { indiceBloques } from './indice-bloques.mjs';
import { negarSiSeMide } from './candado-medicion.mjs';
import { abrirConNotas, anexarNotas } from './siis-notas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const BASE = 'https://siis.ia.supersociedades.gov.co/siis_backend/api/v1/qr';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MOTOR = 'siis-api (determinista)';
const TOL = 1;
const rutaClub = (club, archivo) => ['Clubes', PAIS, club, archivo].join('/'); // la ruta relativa de un documento del club, como la guardan los registros
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
const { pais: PAIS, moneda: MONEDA, clubes: CLUBES } = JSON.parse(readFileSync(resolve(ROOT, 'tools/siis-clubes.json'), 'utf8')); // el país (carpeta de Clubes/), la moneda y el NIT de cada carpeta

async function buscar(indice, cuerpo) {
  for (let intento = 0; intento < 3; intento++) {
    try {
      await dormir(300);
      const res = await fetch(`${BASE}/${indice}/_search?size=1000`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) });
      if (res.ok && /json/.test(res.headers.get('content-type') || '')) return (await res.json()).hits.hits;
    } catch { /* se reintenta */ }
    await dormir(2000 * (intento + 1));
  }
  throw new Error(`SIIS no respondió para ${indice}`);
}
// El perímetro de cada registro va en el id del documento: «individuales» y «separados» son los estados propios del club, «consolidados» los del grupo. Un club puede presentar los dos en el mismo año
// (con cifras distintas, y a veces el consolidado en otra unidad). Se toma el propio; el consolidado solo si no hay otro, o si tools/siis-clubes.json pide `perimetro: "consolidado"` para ese club.
const esConsolidado = (id) => /onsolidad/.test(id);
const rangoPerimetro = (id, preferido = 'individual') => ((esConsolidado(id) ? 1 : 0) === (preferido === 'consolidado' ? 1 : 0) ? 0 : 1);
// un hit por (NIT, año), del perímetro preferido
function porAnio(hits, fechaDe, preferido) {
  const m = new Map();
  for (const h of hits) { const a = fechaDe(h._source).slice(0, 4); if (!m.has(a) || rangoPerimetro(h._id, preferido) < rangoPerimetro(m.get(a)._id, preferido)) m.set(a, h); }
  return m;
}
const delNit = (nit) => ({
  empresas: () => buscar('siis_empresas', { query: { match: { NIT: nit } } }),
  resultado: () => buscar('siis_resultadointegral', { query: { match: { 'resultado.NIT': nit } } }),
  balance: () => buscar('siis_sitfinan', { query: { match: { 'infoEmpresa.NIT': nit } } }),
});

const fmt = (n) => (n == null ? '' : `${n < 0 ? '(' : ''}${Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}${n < 0 ? ')' : ''}`);
const num = (v) => (typeof v === 'number' ? v : null);

// las filas {nombre, corte, corteAnterior} de un bloque, en el orden de la API, sin las vacías
function filasDe(registros) {
  return Object.entries(registros || {}).filter(([, v]) => v && typeof v === 'object' && (num(v.corte) != null || num(v.corteAnterior) != null)).map(([k, v]) => ({ clave: k, nombre: (v.nombre || k).trim(), corte: num(v.corte), anterior: num(v.corteAnterior) }));
}
// el orden en que se lee un estado de resultados; los rubros que no están acá van al final, en el orden de la API. `gananciaPerdida` («[sinopsis]») repite a `gananciaPerd` y no se imprime.
const ORDEN_RESULTADO = ['ingresosActividadesOrdinarias', 'costoVentas', 'gananciaBruta', 'gastosVentas', 'gastosAdministracion', 'otrosIngresos', 'otrosGastos', 'otrasGananciasPerdidas', 'deterioroValorGanancias', 'gananciaPerdidaAmortizado', 'gananciasPerdidasDifCostoAmortizado', 'gananciaPerdidasCovertura', 'gananciaPerdidaXActividadesOperacion', 'ingresosFinancieros', 'costosFinancieros', 'participacion_ganancias_subsidiarias', 'gananciaPerdidaAntesImpuestos', 'ingresoGastoXImpuestos', 'gananciaPerdidaOperacionesContinuadas', 'gananciaPerdidaOperacionesDiscontinuadas', 'gananciaPerd'];
const ordenar = (filas) => [...filas].sort((x, y) => { const i = ORDEN_RESULTADO.indexOf(x.clave), j = ORDEN_RESULTADO.indexOf(y.clave); return (i < 0 ? 99 : i) - (j < 0 ? 99 : j); });
// un rubro que SIIS informa en un año y no en el otro (null) es cero en el que falta: se imprime 0 para que la fila tenga sus dos cifras
const celda = (v, otro) => (v == null && otro != null ? '0' : fmt(v));
const tabla = (titulo, filas, a, b) => [`### ${titulo}`, '', `| Concepto | ${a} | ${b} |`, '| --- | ---: | ---: |', ...filas.map((f) => `| ${f.nombre} | ${celda(f.corte, f.anterior)} | ${celda(f.anterior, f.corte)} |`), ''];

function compuertas(res, emp) {
  const r = res.resultado.registros; const c = (k) => num(r[k]?.corte) ?? 0; const fallas = [];
  const cierra = (a, b, que) => { if (Math.abs(a - b) > TOL) fallas.push(`${que}: ${fmt(a)} contra ${fmt(b)}`); };
  cierra(c('ingresosActividadesOrdinarias') - c('costoVentas'), c('gananciaBruta'), 'ingresos − costo de ventas = ganancia bruta');
  const antes = num(r.gananciaPerdidaAntesImpuestos?.corte);
  if (antes != null) cierra(c('gananciaBruta') - c('gastosVentas') - c('gastosAdministracion') + c('otrosIngresos') - c('otrosGastos') + c('otrasGananciasPerdidas') + c('ingresosFinancieros') - c('costosFinancieros') - c('deterioroValorGanancias') + c('gananciaPerdidaAmortizado') + c('gananciasPerdidasDifCostoAmortizado') + c('gananciaPerdidasCovertura') + c('participacion_ganancias_subsidiarias'), antes, 'ganancia bruta − gastos ± otros + financieros = ganancia antes de impuestos');
  if (antes != null) cierra(antes - c('ingresoGastoXImpuestos') + c('gananciaPerdidaOperacionesDiscontinuadas'), c('gananciaPerdida'), 'antes de impuestos − impuesto + operaciones discontinuadas = ganancia del año');
  if (emp) { cierra(c('ingresosActividadesOrdinarias'), emp.financieros.ingresosEmpresa, 'ingresos contra siis_empresas'); cierra(c('gananciaPerdida'), emp.financieros.utilidades, 'ganancia contra siis_empresas (utilidades)'); } else fallas.push('no hay registro en siis_empresas para cruzar');
  return fallas;
}
function compuertaBalance(bal) {
  const b = bal.resultado;
  const t = (v) => (typeof v === 'object' && v ? v.valorCorte ?? v.corte : v);
  const A = t(b.activos.activoTotal), P = t(b.pasivos.pasivoTotal), PT = t(b.patrimonio.patrimonioTotal);
  return Math.abs(A - (P + PT)) > TOL ? [`activos ${fmt(A)} contra pasivos + patrimonio ${fmt(P + PT)}`] : [];
}

function armarMd({ club, nit, anio, res, bal, nombre, consulta }) {
  const reg = res.resultado.registros; const sal = res.resultado.fechaCorte.slice(0, 4); const ant = String(Number(sal) - 1);
  const L = [`> Generado de la API pública de SIIS (Supersociedades) por tools/siis-estado.mjs · motor: ${MOTOR}. Consulta del ${consulta}. Cifras en miles de pesos colombianos, tal cual las cargó el club en el formulario. El PDF de al lado es la impresión de este texto, no el documento oficial.`, '',
    `# ${nombre} — NIT ${nit}`, '', `Estado de resultados integral y estado de situación financiera al ${res.resultado.fechaCorte} (${res.infoEmpresa.puntoEntrada}, radicado ${res.infoEmpresa.num_radicado}).`, ''];
  const resFilas = ordenar(filasDe(reg).filter((f) => f.clave !== 'gananciaPerdida'));
  const inicio = L.length; L.push(...tabla('Estado de resultados integral', resFilas, sal, ant));
  const filasRes = resFilas.map((f, i) => ({ ...f, linea: inicio + 4 + i + 1 })); // el título, la línea en blanco, el encabezado y la raya van antes de la primera fila; las líneas del .md empiezan en 1
  if (bal) {
    const b = bal.resultado; const sec = (titulo, bloque, tot) => { const f = filasDe(bloque.registros).filter((x) => !/^total(ActCorrientesDist|PasivosCorrientesDist|PasivosNoCorrientes)/.test(x.clave)); const t = bloque.totalCorte != null ? [{ nombre: `Total ${tot}`, corte: bloque.totalCorte, anterior: bloque.totalAnterior }] : []; return f.length || t.length ? tabla(titulo, [...f, ...t], sal, ant) : []; };
    const tt = (nombreFila, o) => ({ nombre: nombreFila, corte: o.valorCorte ?? o.corte, anterior: o.valorAnterior ?? o.corteAnterior });
    L.push('## Estado de situación financiera', '', ...sec('Activos corrientes', b.activos.corrientes, 'activos corrientes'), ...sec('Activos no corrientes', b.activos.noCorrientes, 'activos no corrientes'), ...tabla('Total activos', [tt('Total activos', b.activos.activoTotal)], sal, ant),
      ...sec('Pasivos corrientes', b.pasivos.Corrientes || b.pasivos.corrientes || {}, 'pasivos corrientes'), ...sec('Pasivos no corrientes', b.pasivos.noCorrientes || {}, 'pasivos no corrientes'), ...tabla('Total pasivos', [tt('Total pasivos', b.pasivos.pasivoTotal)], sal, ant),
      ...sec('Patrimonio', b.patrimonio, 'patrimonio'), ...tabla('Total patrimonio', [tt('Total patrimonio', b.patrimonio.patrimonioTotal)], sal, ant));
  }
  return { md: L.join('\n') + '\n', filasRes, sal, ant };
}

// Cómo se lee cada rubro de SIIS en el pipeline: [tipo, lado] de las filas de armar-a-mano.mjs. Lo que no está acá no se arma solo (la tool lo avisa y no escribe las filas).
const CLASE = {
  ingresosActividadesOrdinarias: ['renglon', 'ingreso'], costoVentas: ['renglon', 'gasto'], gananciaBruta: ['subtotal', 'resultado'], gastosVentas: ['renglon', 'gasto'], gastosAdministracion: ['renglon', 'gasto'],
  otrosIngresos: ['renglon', 'ingreso'], otrosGastos: ['renglon', 'gasto'], otrasGananciasPerdidas: ['renglon', 'otro'], deterioroValorGanancias: ['renglon', 'gasto'], gananciaPerdidaAmortizado: ['renglon', 'otro'],
  gananciasPerdidasDifCostoAmortizado: ['renglon', 'otro'], gananciaPerdidasCovertura: ['renglon', 'otro'], gananciaPerdidaXActividadesOperacion: ['resultado', 'resultado'], ingresosFinancieros: ['renglon', 'financiero'],
  costosFinancieros: ['renglon', 'financiero'], participacion_ganancias_subsidiarias: ['renglon', 'otro'], gananciaPerdidaAntesImpuestos: ['resultado', 'resultado'], ingresoGastoXImpuestos: ['renglon', 'impuesto'], gananciaPerdidaOperacionesContinuadas: ['resultado', 'resultado'],
  gananciaPerdidaOperacionesDiscontinuadas: ['renglon', 'otro'], gananciaPerd: ['resultado', 'resultado'],
};
// La especificación de armar-a-mano.mjs: el estado de resultados de SIIS son las filas, cada una en su línea del .md. Devuelve null si algún rubro no tiene clase.
function especificacion({ club, anio, md, filasRes, sal, ant, perimetro, notas }) {
  const sinClase = filasRes.filter((f) => !CLASE[f.clave]); if (sinClase.length) return { error: `rubros de SIIS sin clase en CLASE: ${sinClase.map((f) => f.clave).join(', ')}` };
  const bloque = indiceBloques(md).bloques.find((b) => b.lineas[0] <= filasRes[0].linea && b.lineas[1] >= filasRes.at(-1).linea);
  if (!bloque) return { error: 'el índice de bloques no encuentra la tabla del estado de resultados' };
  const imp = (n) => fmt(n);
  const resultado = filasRes.find((f) => f.clave === 'gananciaPerd');
  // las tablas de las notas que abren rubros (siis-notas.mjs): cada una es un bloque del .md, con su escala y sus filas, y `detalla_a` el rubro de SIIS
  const delIndice = indiceBloques(md).bloques; const notasSpec = { notas_ingresos: [], notas_gastos: [], escalas: [], filas: [] };
  for (const t of notas?.tablas || []) {
    const b = delIndice.find((x) => x.lineas[0] <= t.inicio && x.lineas[1] >= t.fin); if (!b) return { error: `el índice de bloques no encuentra la tabla de las notas que abre ${t.a.clave}` };
    notasSpec[t.a.destino].push(b.id); notasSpec.escalas.push({ bloque: b.id, escala: t.unidad === 'pesos' ? 'unidades' : 'miles', evidencia: t.evidencia }); notasSpec.filas.push(...notas.filasDe(t, b.id));
  }
  return { spec: {
    pdf: rutaClub(club, `siis-estado-${anio}.pdf`), estado: [bloque.id], escala: 'miles', escala_evidencia: 'L1: Cifras en miles de pesos colombianos', moneda: MONEDA, columna_ejercicio: sal, columna_anterior: ant, perimetro: perimetro || 'individual',
    escalas: [{ bloque: bloque.id, escala: 'miles', evidencia: 'L1: Cifras en miles de pesos colombianos' }, ...notasSpec.escalas],
    notas_ingresos: notasSpec.notas_ingresos, notas_gastos: notasSpec.notas_gastos,
    filas: [...filasRes.map((f) => ({ bloque: bloque.id, linea: f.linea, etiqueta: f.nombre, actual: f.corte == null ? '0' : imp(f.corte), anterior: f.anterior == null ? '0' : imp(f.anterior), tipo: CLASE[f.clave][0], lado: CLASE[f.clave][1], detalla_a: null })), ...notasSpec.filas],
    total_ingresos: null, total_gastos: null, resultado: resultado ? { linea: resultado.linea, actual: imp(resultado.corte), anterior: resultado.anterior == null ? '0' : imp(resultado.anterior) } : null,
    observaciones: `Estado de resultados de SIIS (Supersociedades): datos que el club cargó en el formulario, generados por tools/siis-estado.mjs; ${notas?.tablas?.length ? 'el detalle de los rubros que las notas del club abren y suman exacto se copió al final (siis-notas.mjs)' : 'no hay notas en este documento'}.` } };
}
function mdAHtml(md) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const filas = []; let enTabla = false;
  for (const l of md.split('\n')) {
    if (l.startsWith('|')) { if (/^\| ---/.test(l)) continue; const c = l.slice(1, -1).split('|').map((x) => esc(x.trim())); const tag = enTabla ? 'td' : 'th'; filas.push(`${enTabla ? '' : '<table>'}<tr>${c.map((x, i) => `<${tag}${i ? ' class="n"' : ''}>${x}</${tag}>`).join('')}</tr>`); enTabla = true; continue; }
    if (enTabla) { filas.push('</table>'); enTabla = false; }
    if (l.startsWith('### ')) filas.push(`<h3>${esc(l.slice(4))}</h3>`); else if (l.startsWith('## ')) filas.push(`<h2>${esc(l.slice(3))}</h2>`); else if (l.startsWith('# ')) filas.push(`<h1>${esc(l.slice(2))}</h1>`); else if (l.trim()) filas.push(`<p>${esc(l.replace(/^> /, ''))}</p>`);
  }
  if (enTabla) filas.push('</table>');
  return `<!doctype html><meta charset="utf-8"><style>body{font:11px sans-serif;margin:24px}table{border-collapse:collapse;width:100%;margin:6px 0 14px}td,th{border-bottom:1px solid #ccc;padding:2px 6px;text-align:left}.n{text-align:right}</style>${filas.join('\n')}`;
}
function imprimirPdf(md, pdfAbs) {
  if (!existsSync(CHROME)) throw new Error(`no encuentro Chrome en ${CHROME}: sin él no hay PDF de ancla; la tool no escribe nada del año`);
  const dir = mkdtempSync(join(tmpdir(), 'siis-')); const html = join(dir, 'estado.html'); writeFileSync(html, mdAHtml(md));
  try { execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfAbs}`, pathToFileURL(html).href], { stdio: 'ignore', timeout: 120000 }); } finally { rmSync(dir, { recursive: true, force: true }); }
}

async function estadosDe(club, anios, { escribir, rehacer, sinNotas }) {
  const cfg = CLUBES[club]; if (!cfg) throw new Error(`«${club}» no está en tools/siis-clubes.json`);
  const dir = resolve(ROOT, 'Clubes', PAIS, club);
  const q =delNit(cfg.nit); const [emps, ress, bals] = [await q.empresas(), await q.resultado(), await q.balance()];
  const E = porAnio(emps, (s) => s.fechaCorte, cfg.perimetro), R = porAnio(ress, (s) => s.resultado.fechaCorte, cfg.perimetro), B = porAnio(bals, (s) => s.infoEmpresa.corte, cfg.perimetro);
  const lista = (anios === 'todos' ? [...R.keys()].filter((a) => !(cfg.frenados || []).includes(a) && (rehacer || !existsSync(join(dir, `siis-estado-${a}.md`)))) : [String(anios)]).sort();
  const hoy = new Date().toISOString().slice(0, 10); let escritos = 0, frenados = 0;
  for (const a of lista) {
    const res = R.get(a)?._source; if (!res) { console.log(`${club} ${a}: SIIS no tiene estado de resultados`); continue; }
    const bal = B.get(a)?._source || null; const emp = E.get(a)?._source || null;
    const fallas = [...compuertas(res, emp), ...(bal ? compuertaBalance(bal) : [])];
    const sig = R.get(String(Number(a) + 1))?._source; const avisos = [];
    if (sig) for (const k of ['ingresosActividadesOrdinarias', 'gananciaPerdida']) { const x = num(res.resultado.registros[k]?.corte), y = num(sig.resultado.registros[k]?.corteAnterior); if (x != null && y != null && Math.abs(x - y) > TOL) avisos.push(`${k}: ${fmt(x)} y el año siguiente lo repite como ${fmt(y)}`); }
    console.log(`${club} ${a}: ${fallas.length ? `NO CIERRA — ${fallas.join(' · ')}` : 'cierra'}${bal ? '' : ' (sin balance)'}${avisos.length ? ` · aviso: ${avisos.join(' · ')}` : ''}`);
    if (fallas.length) { frenados++; continue; }
    // las notas del club (estados-financieros-AAAA.md de la misma carpeta) abren los rubros de SIIS que suman exacto (siis-notas.mjs; regla de Colombia, caso 2)
    const notasRel = rutaClub(club, `estados-financieros-${a}.md`); const notasAbs = resolve(ROOT, notasRel); let abre = { abiertos: [], sinAbrir: [] }; let notasMd = null;
    if (!sinNotas && existsSync(notasAbs)) {
      notasMd = readFileSync(notasAbs, 'utf8');
      abre = abrirConNotas({ notasMd, valores: Object.fromEntries(Object.entries(res.resultado.registros).map(([k, v]) => [k, { corte: num(v?.corte), anterior: num(v?.corteAnterior) }])) });
      console.log(`  notas: abren ${abre.abiertos.map((x) => `${x.clave} (L${x.tabla.desde}, ${x.filas} filas${x.anterior == null ? ', sin año anterior' : ''})`).join(', ') || 'nada'}${abre.sinAbrir.length ? ` · no abren: ${abre.sinAbrir.map((x) => `${x.clave} (${x.motivo})`).join('; ')}` : ''}`);
    } else console.log(`  notas: ${sinNotas ? 'apagadas (--sin-notas)' : 'el club no tiene estados-financieros de este año'}`);
    const base = join(dir, `siis-estado-${a}`);
    if (existsSync(`${base}.md`) && !rehacer) { console.log(`  ya existe ${base.slice(ROOT.length + 1)}.md (--rehacer lo pisa)`); continue; }
    if (!escribir) continue;
    mkdirSync(dir, { recursive: true });
    const armado = armarMd({ club, nit: cfg.nit, anio: a, res, bal, nombre: emp?.nombreEmpresa || res.infoEmpresa.nombreEmpresa, consulta: hoy });
    const { filasRes, sal, ant } = armado; let md = armado.md; let notas = null;
    if (abre.abiertos.length) { notas = anexarNotas({ md, notasRel, notasMd, abiertos: abre.abiertos, nombreDe: (clave) => filasRes.find((f) => f.clave === clave).nombre, reservados: filasRes.map((f) => f.nombre) }); md = notas.md; }
    imprimirPdf(md, `${base}.pdf`);
    writeFileSync(`${base}.json`, JSON.stringify({ consulta: hoy, nit: cfg.nit, anio: Number(a), siis_empresas: emp, siis_resultadointegral: res, siis_sitfinan: bal }, null, 1) + '\n');
    writeFileSync(`${base}.md`, md); escritos++;
    appendFileSync(resolve(ROOT, 'Admin/registros/api/siis-api.jsonl'), JSON.stringify({ ts: new Date().toISOString(), md: rutaClub(club, `siis-estado-${a}.md`), model: MOTOR, costUsd: 0, nit: cfg.nit, radicado: res.infoEmpresa.num_radicado }) + '\n'); // el motor que lee inventario-transcripciones.mjs
    // las filas, sin leer con IA: la especificación del estado de resultados y armar-a-mano.mjs (valida cada fila contra el .md y deja el .ubicacion.json y el .filas.json con sus huellas)
    const { spec, error } = especificacion({ club, anio: a, md, filasRes, sal, ant, perimetro: esConsolidado(res.infoEmpresa.puntoEntrada) ? 'consolidado' : 'individual', notas });
    if (error) { console.log(`  ${club} ${a}: el .md quedó escrito pero las filas no se armaron solas: ${error}`); continue; }
    const carpetaSpec = resolve(ROOT, 'Generados', PAIS, club); mkdirSync(carpetaSpec, { recursive: true });
    const specAbs = join(carpetaSpec, `siis-estado-${a}.spec.json`); writeFileSync(specAbs, JSON.stringify(spec, null, 1) + '\n');
    try { const out = execFileSync('node', [resolve(ROOT, 'tools/armar-a-mano.mjs'), specAbs, '--escribir'], { cwd: ROOT, encoding: 'utf8' }); console.log(`  filas armadas: ${out.trim().split('\n').pop()}`); } catch (e) { console.log(`  ${club} ${a}: armar-a-mano frenó: ${String(e.stdout || e.message).trim().split('\n').slice(-3).join(' | ')}`); }
  }
  return { escritos, frenados };
}

// el inventario: por NIT, los años que SIIS tiene (siis_empresas, tres CIIU deportivos) contra los siis-estado-AAAA.md y los estados-financieros-AAAA.pdf de la carpeta
async function inventario() {
  const ciiu = ['Actividades de clubes deportivos', 'Otras actividades deportivas', 'Gestión de instalaciones deportivas'];
  const hits = await buscar('siis_empresas', { query: { bool: { should: ciiu.map((a) => ({ match_phrase: { actividadesEconomicas: a } })), minimum_should_match: 1 } }, _source: ['NIT', 'nombreEmpresa', 'fechaCorte', 'actividadesEconomicas', 'financieros.ingresosEmpresa', 'financieros.utilidades'] });
  const porNit = new Map();
  const preferidoDe = new Map(Object.values(CLUBES).map((v) => [v.nit, v.perimetro]));
  for (const h of hits) {
    const s = h._source; const e = porNit.get(s.NIT) || { nombre: s.nombreEmpresa, ciiu: s.actividadesEconomicas[0].slice(0, 5), anios: new Set(), datos: {}, rango: {} };
    const a = s.fechaCorte.slice(0, 4); const r = rangoPerimetro(h._id, preferidoDe.get(s.NIT)); e.anios.add(a);
    if (e.rango[a] === undefined || r < e.rango[a]) { e.rango[a] = r; e.datos[a] = { ingresos: s.financieros?.ingresosEmpresa ?? null, utilidades: s.financieros?.utilidades ?? null }; } // dos perímetros en un año: el propio del club
    porNit.set(s.NIT, e);
  }
  // los años que tienen estado de resultados en siis_resultadointegral (un registro en siis_empresas no siempre lo tiene)
  const estados = await buscar('siis_resultadointegral', { query: { terms: { 'resultado.NIT': [...porNit.keys()] } }, _source: ['resultado.NIT', 'resultado.fechaCorte'] });
  const conEstado = new Set(estados.map((h) => `${h._source.resultado.NIT}|${h._source.resultado.fechaCorte.slice(0, 4)}`));
  const resumen = { generado: new Date().toISOString().slice(0, 10), pais: PAIS, moneda: MONEDA, unidad: 'miles', nits: {} };
  const carpetaDe = new Map(Object.entries(CLUBES).map(([c, v]) => [v.nit, c]));
  const filas = [], faltantes = [], sinCarpeta = [];
  for (const [nit, e] of [...porNit.entries()].sort((a, b) => a[1].nombre.localeCompare(b[1].nombre))) {
    const anios = [...e.anios].sort(); const club = carpetaDe.get(nit);
    resumen.nits[nit] = { nombre: e.nombre, anios: Object.fromEntries(anios.map((a) => [a, { ...e.datos[a], estado: conEstado.has(`${nit}|${a}`) }])) };
    if (!club) { sinCarpeta.push(`| ${nit} | ${e.nombre} | ${e.ciiu} | ${anios[0]}–${anios.at(-1)} (${anios.length}) |`); continue; }
    const dir = resolve(ROOT, 'Clubes', PAIS, club); const ls = existsSync(dir) ? readdirSync(dir) : [];
    const frenados = new Set(CLUBES[club].frenados || []);
    const tiene = (a) => ls.includes(`siis-estado-${a}.md`); const conPdf = (a) => ls.includes(`estados-financieros-${a}.pdf`);
    const marca = (a) => (tiene(a) ? '✔' : frenados.has(a) ? '✗' : !conEstado.has(`${nit}|${a}`) ? '–' : conPdf(a) ? 'p' : '·');
    const falta = anios.filter((a) => !tiene(a) && !frenados.has(a) && conEstado.has(`${nit}|${a}`));
    for (const a of falta) faltantes.push({ club, anio: a });
    filas.push(`| ${club} | ${nit} | ${anios.map((a) => `${a}${marca(a)}`).join(' ')} | ${falta.length} |`);
  }
  return { filas, faltantes, sinCarpeta, resumen, total: hits.length, nits: porNit.size };
}

const A = process.argv.slice(2); const flag = (k) => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null; };
if (import.meta.url === `file://${process.argv[1]}`) {
  negarSiSeMide('siis-estado.mjs', { si: A.includes('--escribir'), argv: process.argv }); // escribe Clubes/, Generados/ y Admin/registros: no mientras medir pipeline mide
  if (A.includes('--inventario') || A.includes('--faltantes')) {
    const inv = await inventario();
    if (A.includes('--faltantes')) { for (const f of inv.faltantes) console.log(`${f.club} ${f.anio}`); process.exit(0); }
    const hoy = new Date().toISOString().slice(0, 10);
    const md = ['<!-- md: qué años de cada club colombiano tiene SIIS y cuáles faltan bajar | leer: antes de buscar documentos de Colombia; generado, no se edita -->', '# SIIS: lo que tiene contra lo que bajamos (generado)', '',
      `Generado el ${hoy} por \`node tools/siis-estado.mjs --inventario --escribir\`. ${inv.total} presentaciones de ${inv.nits} NIT en los tres CIIU deportivos (R9312, R9319, R9311). Cada año: ✔ bajado (\`siis-estado-AAAA.md\`), p solo tenemos el PDF de notas, · no tenemos nada, ✗ frenado (una compuerta no cierra; \`frenados\` en \`tools/siis-clubes.json\`), – SIIS no tiene estado de resultados de ese año. La columna «faltan» cuenta los años sin \`siis-estado\`: se bajan con \`node tools/siis-estado.mjs --club "<Club>" --todos --escribir\`. El mismo faltante lo avisa \`audit.js\` (\`siis-faltante\`).`, '',
      '| Club (carpeta) | NIT | Años en SIIS | Faltan |', '| --- | --- | --- | ---: |', ...inv.filas, '', '## NIT de SIIS sin carpeta en tools/siis-clubes.json', '', 'Algunos son clubes de fútbol que faltan dar de alta (se suman a `tools/siis-clubes.json` y a `alta-club.mjs`); el resto son gimnasios, campos de golf y empresas de instalaciones que no entran.', '', '| NIT | Razón social | CIIU | Años (cantidad) |', '| --- | --- | --- | --- |', ...inv.sinCarpeta, ''].join('\n');
    if (A.includes('--escribir')) { writeFileSync(resolve(ROOT, 'Admin/sourcing', PAIS, 'siis-resumen.json'), JSON.stringify(inv.resumen) + '\n'); writeFileSync(resolve(ROOT, 'Admin/sourcing', PAIS, 'siis-inventario.md'), md); console.log(`Escrito Admin/sourcing/${PAIS}/siis-inventario.md: ${inv.faltantes.length} club-años por bajar, ${inv.sinCarpeta.length} NIT sin carpeta.`); } else console.log(md.slice(0, 3000), `\n... (ensayo: ${inv.faltantes.length} club-años por bajar; --escribir lo guarda)`);
    process.exit(0);
  }
  const club = flag('--club'); const anio = flag('--anio'); const todos = A.includes('--todos');
  if (!club || (!anio && !todos)) { console.error('Uso: node tools/siis-estado.mjs --club "<Club>" (--anio AAAA | --todos) [--escribir] [--rehacer]   ·   --inventario [--escribir]   ·   --faltantes'); process.exit(1); }
  const clubes = club === 'todos' ? Object.keys(CLUBES) : [club]; let escritos = 0, frenados = 0;
  for (const c of clubes) { const r = await estadosDe(c, todos ? 'todos' : anio, { escribir: A.includes('--escribir'), rehacer: A.includes('--rehacer'), sinNotas: A.includes('--sin-notas') }); escritos += r.escritos; frenados += r.frenados; }
  console.log(`${A.includes('--escribir') ? `Escritos ${escritos} año(s)` : 'Ensayo: no se escribió nada (--escribir)'}${frenados ? `; ${frenados} año(s) frenado(s) por una compuerta` : ''}.`);
}
