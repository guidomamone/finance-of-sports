// tools/ingreso-derivado.js — la identidad con la que se reconstruye el ingreso de un ejercicio belga cuyo documento imprime el margen bruto (código 9900) y no los ingresos:
//   ingreso = margen bruto + compras y servicios (60 + 61, o 60/61), todo de la columna del ejercicio en el estado de resultados del documento.
// Lo usan tools/ingreso-base.mjs (reconoce y marca los ejercicios reconstruidos) y audit.js (que un `revenue_derivation` siga cerrando contra su documento).
// Admin/mediciones/455-ingresos-con-margen-bruto.md. Solo mira códigos del plan contable belga; no nombra ningún club.
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const TOL = 0.0001; // millones de la moneda: 100 unidades (los documentos belgas imprimen euros enteros)
const CODIGOS = new Set(['9900', '60', '61', '60/61']);
const num = (s) => { const t = (s || '').trim().replace(/\./g, '').replace(',', '.'); return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : null; };
// «Overige bedrijfsopbrengsten (impliciet in Brutomarge…)»: la carga ya reconstruyó el renglón que falta y lo rotuló así (el documento imprime otro formato de costos).
const RENGLON_IMPLICITO = /impl[ií]c[ie]{1,2}t[o]?\s+(en|in)\s+(la\s+)?Brutomarge/i;

const cache = new Map();
// {margen, costos} (en unidades de la moneda) del documento cuyo PDF es `rutaPdf` (la transcripción .md está al lado), o null si no imprime ambos.
function margenYCostos(rutaPdf) {
  if (!rutaPdf) return null;
  const md = path.resolve(ROOT, String(rutaPdf).replace(/\.pdf$/i, '.md'));
  if (cache.has(md)) return cache.get(md);
  let r = null;
  if (fs.existsSync(md)) {
    const got = {}; let enResultaten = false;
    for (const ln of fs.readFileSync(md, 'utf8').split('\n')) {
      if (/RESULTATENREKENING/i.test(ln)) enResultaten = true;
      if (!enResultaten || !ln.startsWith('|')) continue;
      const c = ln.split('|').slice(1, -1).map((s) => s.trim());
      const i = c.findIndex((x, k) => k <= 3 && CODIGOS.has(x));
      if (i < 0 || got[c[i]] !== undefined) continue;
      const n = c.slice(i + 1).map(num).filter((v) => v !== null);
      got[c[i]] = n.length ? n[0] : null;
    }
    const costos = got['60/61'] != null ? got['60/61'] : (got['60'] != null && got['61'] != null ? got['60'] + got['61'] : null);
    if (got['9900'] != null && costos != null) r = { margen: got['9900'], costos };
  }
  cache.set(md, r);
  return r;
}

// ¿El ingreso cargado es exactamente margen + costos del documento? Lo es el `total` (millones) o, si el año suma también ingresos extraordinarios (código 76) que la
// identidad no incluye, UNA de las líneas (`importes`). true / false, o null si el documento no imprime ambos.
function cierraConDocumento(rutaPdf, total, importes = []) {
  const d = margenYCostos(rutaPdf); if (!d) return null;
  const objetivo = (d.margen + d.costos) / 1e6;
  if (total == null && !importes.length) return null;
  return (total != null && Math.abs(total - objetivo) <= TOL) || importes.some((v) => v != null && Math.abs(v - objetivo) <= TOL);
}

// Qué son los ingresos cargados de un ejercicio (`revenue_basis`) y, si el documento no los imprime y se reconstruyeron, cómo (`revenue_derivation`). Lo usan
// tools/ingreso-base.mjs (años ya cargados) y tools/cargar-ejercicio.mjs (al cargar un año): una sola regla.
//   lineas: las líneas de ingresos {rawLabel, normalizedCategory}; sinDesglose: el `sinDesglose` del año ({lado, tipo}); documento: ruta del PDF; totalRevenue: el total
//   de ingresos cargado (millones); sourceId: el id de la fuente del año. Devuelve {base, derivacion?} o null si el año no tiene ingresos.
function baseDeIngreso({ lineas, sinDesglose, documento, totalRevenue, sourceId }) {
  if (!lineas || !lineas.length) return null;
  const sd = (sinDesglose || []).find((e) => /^(revenue|ingreso)$/.test(e.lado));
  const reconstruido = (documento && cierraConDocumento(documento, totalRevenue, lineas.map((l) => l.amountNative)) === true) || lineas.some((l) => RENGLON_IMPLICITO.test(l.rawLabel || ''));
  if (reconstruido) return { base: lineas.length === 1 ? 'sales_total' : 'full', derivacion: { method: 'margin_plus_costs', sources: [sourceId] } };
  if (sd && sd.tipo === 'gross_margin') return { base: 'gross_margin' };
  if (lineas.length === 1 && /^lump_/.test(lineas[0].normalizedCategory || '')) return { base: 'sales_total' };
  return { base: 'full' };
}

module.exports = { margenYCostos, cierraConDocumento, baseDeIngreso, RENGLON_IMPLICITO, TOL };
