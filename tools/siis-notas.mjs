#!/usr/bin/env node
// ============================================================================
// tools/siis-notas.mjs — QUÉ RUBROS DEL ESTADO DE SIIS ABREN LAS NOTAS DEL CLUB (punto 463, paso 3.0 a). Gratis, determinista, sin IA.
//
// POR QUÉ. El estado de resultados de SIIS trae ingresos y gastos en una línea cada uno; las notas del club (el `estados-financieros-AAAA.md` de la misma carpeta) los
// abren (Tolima, Nota 19: taquillas, venta de derechos deportivos = 30 % de los ingresos, publicidad…). Regla (Admin/paises/co.md, caso 2 de «Colombia, el estado de
// resultados y el balance de SIIS»): las notas abren un rubro de SIIS SOLO si sus líneas suman EXACTO ese rubro; si no suman, queda el rubro de SIIS tal cual.
//
// QUÉ HACE. Para cada rubro de SIIS (ingresos, costo de ventas, gastos de ventas y de administración, otros ingresos y gastos) busca, entre las tablas de las notas, la que
// tiene UNA columna cuyas filas (sin sus subtotales y totales) suman el rubro del año (en miles de pesos, o en pesos: el factor sale de la suma). Una tabla que no suma no entra,
// y un rubro con dos tablas distintas que suman no se abre (queda anotado como ambiguo). La tabla elegida se COPIA, tal cual y sin el signo «$», al final del `siis-estado-AAAA.md`
// con su origen (el archivo y las líneas de las notas); `siis-estado.mjs` arma con esas filas las `notas_ingresos` / `notas_gastos` y `verificar.mjs` hace el resto (el mismo
// cierre de siempre de una nota contra su renglón).
//
// USO (módulo; sin CLI propio. El ensayo por club: node tools/siis-estado.mjs --club "<Club>" --todos --notas):
//   import { abrirConNotas } from './siis-notas.mjs'; abrirConNotas({ notasMd, valores }) → { abiertos: [...], sinAbrir: [...] }
// ============================================================================
export const RUBROS = [
  { clave: 'ingresosActividadesOrdinarias', lado: 'ingreso', destino: 'notas_ingresos' },
  { clave: 'costoVentas', lado: 'gasto', destino: 'notas_gastos' },
  { clave: 'gastosVentas', lado: 'gasto', destino: 'notas_gastos' },
  { clave: 'gastosAdministracion', lado: 'gasto', destino: 'notas_gastos' },
  { clave: 'otrosIngresos', lado: 'ingreso', destino: 'notas_ingresos' },
  { clave: 'otrosGastos', lado: 'gasto', destino: 'notas_gastos' },
];
// Tolerancia, en miles de pesos (la unidad de SIIS): con la nota en miles, 1 (el redondeo de una línea); con la nota en pesos, media unidad de SIIS más medio peso por fila, que es lo que acepta verificar.mjs al cerrar una nota (una nota en pesos cuya suma cae más lejos que eso no se abre: no la cerraría).
const tolDe = (factor, filas) => (factor === 1 ? 1 : 0.5 + 0.0005 * filas);
const celdasDe = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.replace(/\*\*/g, '').trim());
const ES_TOTAL = /^\W*(sub\s*)?total\b|^\W*valor en libros\b|^\W*suma\b/i;
// «$ 10,422,799» → 10422799; «-$ 132,115» y «($ 132,115)» → -132115; «-» o vacío → null. Enteros: los estados de Colombia no traen decimales.
export function numeroDeNota(crudo) {
  let s = String(crudo ?? '').replace(/[$\s*]/g, '');
  if (!/\d/.test(s) || /[A-Za-z]/.test(s)) return null;
  let neg = false;
  if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
  if (s.startsWith('-') || s.startsWith('−')) { neg = true; s = s.slice(1); }
  if (!/^\d{1,3}([.,]\d{3})*$|^\d+$/.test(s)) return null;
  const n = Number(s.replace(/[.,]/g, ''));
  return neg ? -n : n;
}
// las tablas de un .md: { desde, hasta (líneas, desde 1), filas: [{ linea, celdas }] }. Una tabla que un salto de página parte (solo líneas en blanco y «--- pág. N ---» en el medio) es una sola.
export function tablasDe(md) {
  const L = md.split('\n'); const tablas = []; let t = null;
  L.forEach((l, i) => {
    if (/^\s*\|/.test(l)) { if (!t) { t = { desde: i + 1, filas: [] }; tablas.push(t); } if (!/^\s*\|[\s:|-]+\|\s*$/.test(l)) t.filas.push({ linea: i + 1, celdas: celdasDe(l) }); t.hasta = i + 1; } else if (l.trim() && !/^---\s*pág\.\s*\d+\s*---\s*$/i.test(l.trim())) t = null;
  });
  return tablas;
}
// La columna de las etiquetas: la de antes de las cifras con más valores distintos que son texto (una columna de párrafos de la norma, «NIC 1, 102», se repite; la leyenda no). Empata: la de más a la izquierda.
function colEtiqueta(tabla, col) {
  let mejor = 0; let n = -1;
  for (let c = 0; c < col; c++) { const d = new Set(tabla.filas.map((f) => f.celdas[c]).filter((x) => x && /[A-Za-zÁ-ú]{3}/.test(x) && numeroDeNota(x) == null)).size; if (d > n) { n = d; mejor = c; } }
  return mejor;
}
// ¿Esta tabla abre el rubro? Devuelve { col, factor, anterior } o null. `valor` y `previo` en miles de pesos (previo, el del año anterior en SIIS, puede ser null).
function sumaLaTabla(tabla, valor, previo) {
  const ancho = Math.max(...tabla.filas.map((f) => f.celdas.length));
  const salida = [];
  for (let col = 1; col < ancho; col++) {
    const ce = colEtiqueta(tabla, col); const datos = tabla.filas.filter((f) => f.celdas[ce] && !ES_TOTAL.test(f.celdas[ce]) && numeroDeNota(f.celdas[col]) != null);
    if (datos.length < 2) continue;
    const suma = datos.reduce((a, f) => a + numeroDeNota(f.celdas[col]), 0);
    // el último total impreso de la tabla tiene que ser la suma de sus filas: un cuadro cuyo total no suma (Bucaramanga 2017, costos: «Total» a mitad de la lista) es del documento mal armado y verificar.mjs no lo cierra
    const totales = tabla.filas.filter((f) => ES_TOTAL.test(f.celdas[ce] || '') && numeroDeNota(f.celdas[col]) != null);
    if (totales.length && Math.abs(numeroDeNota(totales.at(-1).celdas[col]) - suma) > Math.max(2, datos.length) * 1000 * 0.001) continue;
    for (const factor of [1, 1000]) { // 1: la nota está en miles, como SIIS; 1000: la nota está en pesos
      if (Math.abs(suma / factor - valor) <= tolDe(factor, datos.length) && !datos.some((f) => Math.abs(numeroDeNota(f.celdas[col]) / factor - valor) <= tolDe(factor, 1))) {
        let anterior = null;
        if (previo != null) for (let c2 = 1; c2 < ancho; c2++) { if (c2 === col) continue; const d2 = datos.filter((f) => numeroDeNota(f.celdas[c2]) != null); if (d2.length === datos.length && Math.abs(d2.reduce((a, f) => a + numeroDeNota(f.celdas[c2]), 0) / factor - previo) <= tolDe(factor, datos.length)) { anterior = c2; break; } }
        salida.push({ col, ce, factor, anterior, filas: datos.length });
      }
    }
  }
  return salida.length ? salida[0] : null;
}
// valores: { clave: { corte, anterior } } de SIIS (en miles). Devuelve los rubros que las notas abren y los que no, con el motivo.
export function abrirConNotas({ notasMd, valores }) {
  const tablas = tablasDe(notasMd); const abiertos = []; const sinAbrir = [];
  for (const r of RUBROS) {
    const v = valores[r.clave]; if (!v || !v.corte) continue;
    const hallazgos = tablas.map((t) => ({ t, h: sumaLaTabla(t, v.corte, v.anterior) })).filter((x) => x.h);
    // una misma tabla impresa dos veces (mismas etiquetas e importes) es una sola
    const firma = (x) => x.t.filas.map((f) => `${f.celdas[x.h.ce]}=${f.celdas[x.h.col]}`).join('|');
    const distintos = [...new Map(hallazgos.map((x) => [firma(x), x])).values()];
    if (!distintos.length) { const c = cercana(notasMd, v.corte); sinAbrir.push({ clave: r.clave, motivo: c ? `ninguna tabla suma el rubro; la más cercana (L${c.desde}) difiere en ${c.d}` : 'ninguna tabla de las notas suma el rubro' }); continue; }
    if (distintos.length > 1) { sinAbrir.push({ clave: r.clave, motivo: `ambiguo: ${distintos.length} tablas distintas suman el rubro (L${distintos.map((x) => x.t.desde).join(', L')})` }); continue; }
    // los rótulos de ventas y administración de SIIS se intercambian en algún año (Tolima y La Equidad 2024): si el título de la nota dice lo contrario del rubro, sus filas no se cuelgan de ese rubro (se categorizarían por la sección equivocada)
    const titulo = tituloDe(notasMd.split('\n'), distintos[0].t.desde).toLowerCase();
    if ((r.clave === 'gastosVentas' && /administraci/.test(titulo)) || (r.clave === 'gastosAdministracion' && /ventas|deportiv/.test(titulo))) { sinAbrir.push({ clave: r.clave, motivo: `el título de la nota (L${distintos[0].t.desde}) dice lo contrario del rubro de SIIS: rótulos intercambiados` }); continue; }
    abiertos.push({ ...r, tabla: distintos[0].t, ...distintos[0].h });
  }
  // una misma tabla no abre dos rubros (la tabla de gastos totales suma gastos de ventas más administración, nunca uno solo; si pasa, se desambigua por la que se vio primero)
  const usadas = new Set(); const finales = [];
  for (const a of abiertos) { if (usadas.has(a.tabla.desde)) { sinAbrir.push({ clave: a.clave, motivo: `la tabla de L${a.tabla.desde} ya abre otro rubro` }); continue; } usadas.add(a.tabla.desde); finales.push(a); }
  return { abiertos: finales, sinAbrir };
}

// La tabla que no suma pero se queda a menos de 0,1 % del rubro (la nota del club y SIIS difieren en unas unidades): se avisa, no se abre ni se carga la diferencia (regla, caso 2).
export function cercana(notasMd, valor) {
  let mejor = null;
  for (const t of tablasDe(notasMd)) {
    const ancho = Math.max(...t.filas.map((f) => f.celdas.length));
    for (let col = 1; col < ancho; col++) {
      const ce = colEtiqueta(t, col); const datos = t.filas.filter((f) => f.celdas[ce] && !ES_TOTAL.test(f.celdas[ce]) && numeroDeNota(f.celdas[col]) != null);
      if (datos.length < 2) continue;
      const suma = datos.reduce((a, f) => a + numeroDeNota(f.celdas[col]), 0);
      for (const factor of [1, 1000]) { const d = Math.abs(suma / factor - valor); if (d > tolDe(factor, datos.length) && d <= valor * 0.001 && (!mejor || d < mejor.d)) mejor = { d: Math.round(d * 1000) / 1000, desde: t.desde }; }
    }
  }
  return mejor;
}

const limpiar = (l) => l.replace(/\*\*/g, '').replace(/\$\s?/g, '');
// Una celda que es solo una cifra se imprime con coma de miles y signo adelante («$ 1.613,214» y «-$ 91,834» de un mismo cuadro pasan a «1,613,214» y «-91,834»): el parser de cifras del pipeline lee mal un cuadro con dos separadores distintos.
const limpiarFila = (l) => limpiar(l).split('|').map((c, i, a) => { if (i === 0 || i === a.length - 1 || !/^\s*[-−(]?\s*\d[\d.,]*\)?\s*$/.test(c)) return c; const n = numeroDeNota(c); return n == null ? c : ` ${n < 0 ? '-' : ''}${Math.abs(n).toLocaleString('en-US')} `; }).join('|');
// El título de la nota: la línea de encabezado o en negrita más cercana arriba de la tabla.
const tituloDe = (L, desde) => { for (let i = desde - 2; i >= Math.max(0, desde - 15); i--) { const t = L[i].trim(); if (/^#+\s|^\*\*\s*NOTA|^NOTA\s/i.test(t)) return t.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim(); } return 'tabla de las notas'; };
// Agrega al final del siis-estado-AAAA.md las tablas que abren rubros, copiadas de las notas (sin el «$» ni las negritas; el resto, tal cual), y devuelve el .md nuevo y las
// filas de esas tablas para armar-a-mano (cada una con su línea en el .md nuevo y `detalla_a` = la etiqueta del rubro de SIIS). `nombreDe(clave)`: la etiqueta de ese rubro.
// Una etiqueta repetida (en dos tablas, o igual a un rubro de SIIS) se distingue con el rubro entre paréntesis: el pipeline categoriza por etiqueta, y «gastos de personal» de la nota de administración no es la de la de ventas.
const clave = (e) => String(e).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
export function anexarNotas({ md, notasRel, notasMd, abiertos, nombreDe, reservados = [] }) {
  const nL = notasMd.split('\n'); const L = md.replace(/\n+$/, '').split('\n');
  const cuenta = new Map(reservados.map((r) => [clave(r), 1]));
  for (const a of abiertos) for (const f of a.tabla.filas) { const e = f.celdas[a.ce]; if (e && numeroDeNota(f.celdas[a.col]) != null && !ES_TOTAL.test(e)) cuenta.set(clave(e), (cuenta.get(clave(e)) || 0) + 1); }
  L.push('', '## Detalle de las notas del club', '', `> Las tablas de abajo se copiaron de ${notasRel} (las notas del club, otro documento del mismo año), sin el signo «$» ni las negritas, con las cifras escritas con coma de miles y, si una etiqueta se repite entre tablas, con el rubro entre paréntesis. Cada una abre un rubro del estado de resultados de arriba porque sus filas, sin los subtotales, suman EXACTO ese rubro (regla de Colombia, caso 2). Lo que las notas no abren queda como el rubro de SIIS.`, '');
  const tablas = [];
  for (const a of abiertos) {
    const titulo = tituloDe(nL, a.tabla.desde); const unidad = a.factor === 1 ? 'miles de pesos' : 'pesos';
    L.push(`### ${nombreDe(a.clave)}: ${titulo} (${notasRel}, L${a.tabla.desde}-L${a.tabla.hasta})`, '', `Cifras de esta tabla en ${unidad} colombianos.`, '');
    const nuevaDe = new Map(); const etiquetaDe = new Map(); const inicio = L.length + 1;
    const porLinea = new Map(a.tabla.filas.map((f) => [f.linea, f]));
    for (let i = a.tabla.desde - 1; i < a.tabla.hasta; i++) if (/^\s*\|/.test(nL[i])) {
      let linea = limpiarFila(nL[i]); const f = porLinea.get(i + 1);
      if (f && f.celdas[a.ce] && !ES_TOTAL.test(f.celdas[a.ce]) && cuenta.get(clave(f.celdas[a.ce])) > 1) { const e = f.celdas[a.ce]; const nueva = `${e} (${nombreDe(a.clave)})`; const celdas = linea.split('|'); celdas[a.ce + 1] = ` ${nueva} `; linea = celdas.join('|'); etiquetaDe.set(i + 1, nueva); }
      L.push(linea); nuevaDe.set(i + 1, L.length);
    }
    tablas.push({ a, nuevaDe, etiquetaDe, inicio, fin: L.length, evidencia: `L${inicio - 2}: Cifras de esta tabla en ${unidad} colombianos`, unidad });
    L.push('');
  }
  return { md: L.join('\n') + '\n', tablas, filasDe: (t, bloque) => t.a.tabla.filas.filter((f) => f.celdas[t.a.ce] && numeroDeNota(f.celdas[t.a.col]) != null).map((f) => {
    const crudo = (c) => { const n = numeroDeNota(c); return n == null ? limpiar(String(c ?? '')).trim().replace(/\s+/g, ' ') : `${n < 0 ? '-' : ''}${Math.abs(n).toLocaleString('en-US')}`; };
    const et = t.etiquetaDe.get(f.linea) || f.celdas[t.a.ce]; const total = ES_TOTAL.test(et); const ant = t.a.anterior != null && numeroDeNota(f.celdas[t.a.anterior]) != null ? crudo(f.celdas[t.a.anterior]) : null;
    return { bloque, linea: t.nuevaDe.get(f.linea), etiqueta: et, actual: crudo(f.celdas[t.a.col]), anterior: ant, tipo: total ? (/^\W*sub/i.test(et) ? 'subtotal' : 'total') : 'renglon', lado: t.a.lado, detalla_a: nombreDe(t.a.clave) };
  }) };
}
