// ============================================================================
// tools/ixbrl-resultado.mjs — EL RESULTADO DEL EJERCICIO TAL COMO LO ETIQUETA EL INFORME XHTML (iXBRL), para contrastarlo con lo cargado (condición de la Auditora 5).
//
// POR QUÉ. El tie-out de cargar.mjs compara contra el resultado que sale del MISMO .md: un signo o una escala mal leídos del texto se repiten en los dos lados. El hecho
// iXBRL (`ProfitLoss`) es una segunda lectura independiente y estructurada: valor, escala, signo y decimales vienen en atributos, no en el texto impreso. Lo usa `cargar.mjs`:
// FRENA si lo cargado es individual y no coincide; en el consolidado, AVISO.
//
// LA CONDICIÓN (veredicto de la Auditora 5, Admin/registros/auditoria-proceso.jsonl):
//   (a) solo contra el XHTML del MISMO cierre: lo decide quien llama (el .xhtml hermano del .md del año, que lo generó); además el contexto del hecho tiene que terminar en `cierre`.
//   (b) el contexto se elige por fechas y sin dimensiones (un `ProfitLoss` con eje de segmento no es el del ejercicio), no «el primero»: duración que termina en `cierre`.
//       Si hay dos valores distintos en contextos válidos, NO decide.
//   (c) nombre local sin prefijo (fsa, d, c, ifrs-full e ifrs_full_14 cambian), escala, signo (atributo sign="-", que el texto impreso puede no tener) y formato (ixt:numdotcomma,
//       numcommadecimal y num-dot-decimal separan distinto).
//   (d) tolerancia: medio punto de `decimals` (hecho en miles: ±500 unidades, 0,0005 M).
//   (f) PERÍMETRO (Auditora 5, tras la prueba con cuentas británicas): si lo cargado es CONSOLIDADO, el resultado es el `ProfitLoss` cuyo ÚNICO eje es GroupCompanyDataDimension=Consolidated (el hecho sin ejes es el de la
//       sociedad matriz: en Burnley vale 0 y el del grupo −28,530); si solo hay hecho sin ejes, no compara y lo dice. Si lo cargado es INDIVIDUAL, el hecho sin ejes. Si el perímetro no se conoce, no compara.
//   (e) ingresos (`Revenue`, o `TurnoverRevenue`/`Turnover`): solo se informa si lo cargado es MENOR que la etiqueta (se perdió una línea); mayor es lo normal (Revenue es la cifra de negocios).
// Devuelve millones de la moneda del informe, como official_totals.
// ============================================================================
import { readFileSync, readdirSync, openSync, readSync, closeSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

// Un .xhtml puede venir comprimido con gzip (bytes 1f 8b: Brøndby 2025 en Clubes/Dinamarca/); se descomprime EN MEMORIA, sin tocar ni reemplazar el archivo (Auditora 5).
export function leerXhtmlTexto(abs) { const b = readFileSync(abs); return (b[0] === 0x1f && b[1] === 0x8b ? gunzipSync(b) : b).toString('utf8'); }

const local = (n) => String(n || '').replace(/^.*:/, '');
const attr = (t, a) => { const m = t.match(new RegExp(`\\b${a}\\s*=\\s*"([^"]*)"`)); return m ? m[1] : null; };

// contextos sin dimensiones y de duración, por id -> { inicio, fin }
function contextos(src) {
  const out = new Map();
  for (const m of src.matchAll(/<(?:[\w-]+:)?context\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?context>/g)) {
    const cuerpo = m[2];
    if (/typedMember/.test(cuerpo)) continue;
    const dims = [...cuerpo.matchAll(/<(?:[\w-]+:)?explicitMember\b[^>]*\bdimension="([^"]+)"[^>]*>\s*([^<\s]+)\s*</g)].map((x) => [local(x[1]), local(x[2])]);
    const ini = (cuerpo.match(/<(?:[\w-]+:)?startDate>\s*([\d-]+)\s*</) || [])[1]; const fin = (cuerpo.match(/<(?:[\w-]+:)?endDate>\s*([\d-]+)\s*</) || [])[1];
    if (ini && fin) out.set(m[1], { inicio: ini, fin, dims });
  }
  return out;
}

// el texto del hecho según su formato -> número o null si el formato no se conoce
function numero(txt, formato) {
  const f = local(formato).toLowerCase().replace(/-/g, '');
  if (/zerodash|fixedzero|fixed0/.test(f)) return 0;
  const t = String(txt).replace(/\s| /g, '');
  if (!/\d/.test(t)) return null;
  let dec = '.'; // sin formato: punto decimal
  if (f) {
    if (/numdotcomma|numcommadecimal|numspacecomma|numunitdecimalcomma/.test(f)) dec = ',';
    else if (/numcommadot|numdotdecimal|numspacedot|numunitdecimal/.test(f)) dec = '.';
    else return null;
  }
  const miles = dec === ',' ? '.' : ',';
  const limpio = t.split(miles).join('').replace(dec, '.').replace(/[^\d.]/g, '');
  const v = Number(limpio); return Number.isFinite(v) ? v : null;
}

// hechos nonFraction de nombre local `nombre` con contexto válido que termina en `cierre`
export function hechos(src, nombre, cierre, aceptar) { // nombre null = todos los conceptos
  const ctx = contextos(src); const out = [];
  for (const m of src.matchAll(/<ix:nonFraction\b([^>]*)>([\s\S]*?)<\/ix:nonFraction>/g)) {
    const a = m[1]; if (nombre && local(attr(a, 'name')) !== nombre) continue;
    const c = ctx.get(attr(a, 'contextRef')); if (!c || c.fin !== cierre || !aceptar(c.dims)) continue;
    const txt = m[2].replace(/<[^>]+>/g, '');
    const n = numero(txt, attr(a, 'format')); if (n == null) { out.push({ ilegible: txt.trim() }); continue; }
    const escala = Number(attr(a, 'scale') || 0); const dcm = attr(a, 'decimals');
    const valor = (attr(a, 'sign') === '-' ? -1 : 1) * n * 10 ** escala;
    const tol = dcm == null || /^inf$/i.test(dcm) ? 0 : 0.5 * 10 ** (-Number(dcm));
    out.push({ valor, tolM: tol / 1e6, inicio: c.inicio, txt: txt.trim(), n: local(attr(a, 'name')) });
  }
  return out;
}
const unico = (hs) => { const ok = hs.filter((h) => !h.ilegible); if (hs.some((h) => h.ilegible)) return { estado: 'formato', detalle: hs.find((h) => h.ilegible).ilegible }; if (!ok.length) return { estado: 'sin-hecho' }; const v = ok[0]; if (ok.some((h) => Math.abs(h.valor - v.valor) > Math.max(h.tolM, v.tolM) * 1e6)) return { estado: 'ambiguo', valoresM: ok.map((h) => h.valor / 1e6) }; return { estado: 'ok', valorM: v.valor / 1e6, tolM: Math.max(...ok.map((h) => h.tolM)), inicio: v.inicio }; };

// Sin ejes / solo el eje de grupo consolidado (regla (f))
export const sinEjes = (d) => d.length === 0;
export const grupo = (d) => d.length === 1 && d[0][0] === 'GroupCompanyDataDimension' && d[0][1] === 'Consolidated';
function elegir(src, nombres, cierre, perimetro) {
  const per = String(perimetro || '').toLowerCase();
  if (per !== 'consolidado' && per !== 'individual') return { estado: 'perimetro', detalle: perimetro || 'sin dato' };
  for (const nombre of nombres) {
    if (per === 'individual') { const h = hechos(src, nombre, cierre, sinEjes); if (h.length) return unico(h); continue; }
    const g = hechos(src, nombre, cierre, grupo); if (g.length) return unico(g);
    if (hechos(src, nombre, cierre, sinEjes).length) return { estado: 'solo-matriz' };
  }
  return { estado: 'sin-hecho' };
}

// -> { resultado: {estado, valorM, tolM}, ingresos: {...} } para el ejercicio que cierra en `cierre` (AAAA-MM-DD) y el perímetro cargado ('consolidado' | 'individual')
export function leerResultadoIxbrl(xhtmlAbs, cierre, perimetro) {
  const src = leerXhtmlTexto(xhtmlAbs);
  return { resultado: elegir(src, ['ProfitLoss'], cierre, perimetro), ingresos: elegir(src, ['Revenue', 'TurnoverRevenue', 'Turnover'], cierre, perimetro) };
}

// El emisor del XHTML (el `xbrli:identifier` de sus contextos: CVR, número de Companies House). Primero el comienzo del archivo (600 KB, donde suele
// estar el ix:header) y, si ahí no está el identifier, el archivo ENTERO (Auditora 5, regla de PIPELINE.md «Una tool que decide no lee solo una parte
// del documento»): en 17 de 249 XHTML el ix:header está más abajo (Silkeborg 2025, en el byte 2,69 MB) y el año cargado de PDF se quedaba sin la segunda lectura.
const IDENTIFIER_RE = /<(?:[\w-]+:)?identifier\b[^>]*>\s*([^<\s]+)\s*</;
export function emisorDe(xhtmlAbs) {
  const fd = openSync(xhtmlAbs, 'r'); const b = Buffer.alloc(600000); const n = readSync(fd, b, 0, b.length, 0); closeSync(fd);
  const gz = b[0] === 0x1f && b[1] === 0x8b;
  const m = (gz ? leerXhtmlTexto(xhtmlAbs).slice(0, 600000) : b.toString('utf8', 0, n)).match(IDENTIFIER_RE) || (n === b.length || gz ? leerXhtmlTexto(xhtmlAbs).match(IDENTIFIER_RE) : null);
  return ((m || [])[1] || '').replace(/[^0-9A-Za-z]/g, '');
}
// Un año cargado de PDF puede contrastarse con un XHTML de la carpeta del club SI es del mismo emisor (su identificador figura en el .md del año) y del mismo cierre (lo decide el contexto
// del hecho). Devuelve la ruta si hay exactamente uno.
export function xhtmlDelMismoEmisor(dir, mdTexto) {
  const plano = String(mdTexto).replace(/[^0-9A-Za-z]/g, ''); const ok = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.xhtml'))) { const e = emisorDe(join(dir, f)); if (e.length >= 6 && plano.includes(e)) ok.push(join(dir, f)); }
  return ok.length === 1 ? ok[0] : null;
}

// Compara con lo cargado (en millones). -> { avisos: [texto], caso: texto|null, frena: bool }
// FRENAZO: `frena` solo si el hecho es único («ok»), la diferencia pasa la tolerancia y lo cargado es INDIVIDUAL (medido: 9 clubes, 0 falsos). En el
// consolidado sigue siendo aviso y caso en la cola hasta que `node tools/medir-ixbrl-consolidado.mjs` diga que se puede decidir: dos años consolidados de clubes distintos, uno con minoritarios (el ProfitLoss de un grupo IFRS incluye la
// parte no controladora y lo cargado puede ser la atribuible). «ambiguo», «solo-matriz», «sin-hecho», «formato» y «perímetro» nunca frenan.
export function chequearIxbrl(ix, { resultadoM, ingresosM, perimetro }) {
  const avisos = []; let caso = null; const r = ix.resultado;
  if (r.estado === 'ok' && resultadoM != null) {
    if (Math.abs(r.valorM - resultadoM) > r.tolM + 1e-6) { caso = `resultado iXBRL ${r.valorM} M contra ${resultadoM} M cargado (diferencia ${+(r.valorM - resultadoM).toFixed(6)} M; tolerancia ${r.tolM} M)`; avisos.push(`ProfitLoss del informe XHTML (iXBRL) no coincide: ${caso}`); }
  } else if (r.estado === 'ambiguo') avisos.push(`ProfitLoss del informe XHTML: dos valores distintos en contextos válidos (${r.valoresM.join(' / ')} M); no se compara`);
  else if (r.estado === 'solo-matriz') avisos.push('ProfitLoss del informe XHTML: lo cargado es consolidado y el informe solo trae el hecho sin eje de grupo (la sociedad matriz); no se puede saber de qué perímetro es: no se compara');
  else if (r.estado === 'perimetro') avisos.push(`ProfitLoss del informe XHTML: no se sabe el perímetro cargado (${r.detalle}): no se compara`);
  else if (r.estado === 'formato') avisos.push(`ProfitLoss del informe XHTML: formato de número que no se lee («${r.detalle}»); no se compara`);
  const i = ix.ingresos;
  if (i.estado === 'ok' && ingresosM != null && ingresosM < i.valorM - i.tolM - 1e-6) avisos.push(`ingresos cargados ${ingresosM} M son menores que la etiqueta Revenue del informe XHTML (${i.valorM} M): ¿se perdió una línea?`);
  return { avisos, caso, frena: !!caso && String(perimetro || '').toLowerCase() === 'individual', resultado: r.estado };
}
