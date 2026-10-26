#!/usr/bin/env node
// ============================================================================
// tools/siis-notas.mjs — QUÉ RUBROS DEL ESTADO DE SIIS ABREN LAS NOTAS DEL CLUB (punto 463, paso 3.0 a). Gratis, determinista, sin IA.
//
// POR QUÉ. El estado de resultados de SIIS trae ingresos y gastos en una línea cada uno; las notas del club (el `estados-financieros-AAAA.md` de la misma carpeta) los
// abren (Tolima, Nota 19: taquillas, venta de derechos deportivos = 30 % de los ingresos, publicidad…). Regla (CONVENCIONES-DATOS.md, caso 2 de «Colombia, el estado de
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
const TOL = 1; // miles de pesos: el redondeo de una suma en pesos
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
// ¿Esta tabla abre el rubro? Devuelve { col, factor, anterior } o null. `valor` y `previo` en miles de pesos (previo, el del año anterior en SIIS, puede ser null).
function sumaLaTabla(tabla, valor, previo) {
  const ancho = Math.max(...tabla.filas.map((f) => f.celdas.length));
  const salida = [];
  for (let col = 1; col < ancho; col++) {
    const datos = tabla.filas.filter((f) => f.celdas[0] && !ES_TOTAL.test(f.celdas[0]) && numeroDeNota(f.celdas[col]) != null);
    if (datos.length < 2) continue;
    const suma = datos.reduce((a, f) => a + numeroDeNota(f.celdas[col]), 0);
    for (const factor of [1, 1000]) { // 1: la nota está en miles, como SIIS; 1000: la nota está en pesos
      if (Math.abs(suma / factor - valor) <= TOL && !datos.some((f) => Math.abs(numeroDeNota(f.celdas[col]) / factor - valor) <= TOL)) {
        let anterior = null;
        if (previo != null) for (let c2 = 1; c2 < ancho; c2++) { if (c2 === col) continue; const d2 = datos.filter((f) => numeroDeNota(f.celdas[c2]) != null); if (d2.length === datos.length && Math.abs(d2.reduce((a, f) => a + numeroDeNota(f.celdas[c2]), 0) / factor - previo) <= TOL) { anterior = c2; break; } }
        salida.push({ col, factor, anterior, filas: datos.length });
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
    const firma = (x) => x.t.filas.map((f) => `${f.celdas[0]}=${f.celdas[x.h.col]}`).join('|');
    const distintos = [...new Map(hallazgos.map((x) => [firma(x), x])).values()];
    if (!distintos.length) { const c = cercana(notasMd, v.corte); sinAbrir.push({ clave: r.clave, motivo: c ? `ninguna tabla suma el rubro; la más cercana (L${c.desde}) difiere en ${c.d}` : 'ninguna tabla de las notas suma el rubro' }); continue; }
    if (distintos.length > 1) { sinAbrir.push({ clave: r.clave, motivo: `ambiguo: ${distintos.length} tablas distintas suman el rubro (L${distintos.map((x) => x.t.desde).join(', L')})` }); continue; }
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
      const datos = t.filas.filter((f) => f.celdas[0] && !ES_TOTAL.test(f.celdas[0]) && numeroDeNota(f.celdas[col]) != null);
      if (datos.length < 2) continue;
      const suma = datos.reduce((a, f) => a + numeroDeNota(f.celdas[col]), 0);
      for (const factor of [1, 1000]) { const d = Math.abs(suma / factor - valor); if (d > TOL && d <= valor * 0.001 && (!mejor || d < mejor.d)) mejor = { d: Math.round(d), desde: t.desde }; }
    }
  }
  return mejor;
}

const limpiar = (l) => l.replace(/\*\*/g, '').replace(/\$\s?/g, '');
// El título de la nota: la línea de encabezado o en negrita más cercana arriba de la tabla.
const tituloDe = (L, desde) => { for (let i = desde - 2; i >= Math.max(0, desde - 15); i--) { const t = L[i].trim(); if (/^#+\s|^\*\*\s*NOTA|^NOTA\s/i.test(t)) return t.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim(); } return 'tabla de las notas'; };
// Agrega al final del siis-estado-AAAA.md las tablas que abren rubros, copiadas de las notas (sin el «$» ni las negritas; el resto, tal cual), y devuelve el .md nuevo y las
// filas de esas tablas para armar-a-mano (cada una con su línea en el .md nuevo y `detalla_a` = la etiqueta del rubro de SIIS). `nombreDe(clave)`: la etiqueta de ese rubro.
export function anexarNotas({ md, notasRel, notasMd, abiertos, nombreDe }) {
  const nL = notasMd.split('\n'); const L = md.replace(/\n+$/, '').split('\n');
  L.push('', '## Detalle de las notas del club', '', `> Las tablas de abajo se copiaron de ${notasRel} (las notas del club, otro documento del mismo año), sin el signo «$» ni las negritas. Cada una abre un rubro del estado de resultados de arriba porque sus filas, sin los subtotales, suman EXACTO ese rubro (regla de Colombia, caso 2). Lo que las notas no abren queda como el rubro de SIIS.`, '');
  const tablas = [];
  for (const a of abiertos) {
    const titulo = tituloDe(nL, a.tabla.desde); const unidad = a.factor === 1 ? 'miles de pesos' : 'pesos';
    L.push(`### ${nombreDe(a.clave)}: ${titulo} (${notasRel}, L${a.tabla.desde}-L${a.tabla.hasta})`, '', `Cifras de esta tabla en ${unidad} colombianos.`, '');
    const nuevaDe = new Map(); const inicio = L.length + 1;
    for (let i = a.tabla.desde - 1; i < a.tabla.hasta; i++) if (/^\s*\|/.test(nL[i])) { L.push(limpiar(nL[i])); nuevaDe.set(i + 1, L.length); }
    tablas.push({ a, nuevaDe, inicio, fin: L.length, evidencia: `L${inicio - 2}: Cifras de esta tabla en ${unidad} colombianos`, unidad });
    L.push('');
  }
  return { md: L.join('\n') + '\n', tablas, filasDe: (t, bloque) => t.a.tabla.filas.filter((f) => f.celdas[0] && numeroDeNota(f.celdas[t.a.col]) != null).map((f) => {
    const crudo = (c) => limpiar(String(c ?? '')).trim().replace(/\s+/g, ' ');
    const total = ES_TOTAL.test(f.celdas[0]); const ant = t.a.anterior != null && numeroDeNota(f.celdas[t.a.anterior]) != null ? crudo(f.celdas[t.a.anterior]) : null;
    return { bloque, linea: t.nuevaDe.get(f.linea), etiqueta: f.celdas[0], actual: crudo(f.celdas[t.a.col]), anterior: ant, tipo: total ? (/^\W*sub/i.test(f.celdas[0]) ? 'subtotal' : 'total') : 'renglon', lado: t.a.lado, detalla_a: nombreDe(t.a.clave) };
  }) };
}
