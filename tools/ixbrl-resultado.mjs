// ============================================================================
// tools/ixbrl-resultado.mjs — EL RESULTADO DEL EJERCICIO TAL COMO LO ETIQUETA EL INFORME XHTML (iXBRL), para contrastarlo con lo cargado (to-do 345, condición de la Auditora 5).
//
// POR QUÉ. El tie-out de cargar.mjs compara contra el resultado que sale del MISMO .md: un signo o una escala mal leídos del texto se repiten en los dos lados. El hecho
// iXBRL (`ProfitLoss`) es una segunda lectura independiente y estructurada: valor, escala, signo y decimales vienen en atributos, no en el texto impreso. Lo usa `cargar.mjs`
// como AVISO (a frenazo cuando 10 años de varios clubes, ÅRL e IFRS, den cero falsos frenos; decide la Auditora).
//
// LA CONDICIÓN (veredicto de la Auditora 5, Admin/registros/auditoria-proceso.jsonl):
//   (a) solo contra el XHTML del MISMO cierre: lo decide quien llama (el .xhtml hermano del .md del año, que lo generó); además el contexto del hecho tiene que terminar en `cierre`.
//   (b) el contexto se elige por fechas y sin dimensiones (un `ProfitLoss` con eje de segmento no es el del ejercicio), no «el primero»: duración que termina en `cierre`.
//       Si hay dos valores distintos en contextos válidos, NO decide.
//   (c) nombre local sin prefijo (fsa, d, c, ifrs-full e ifrs_full_14 cambian), escala, signo (atributo sign="-", que el texto impreso puede no tener) y formato (ixt:numdotcomma,
//       numcommadecimal y num-dot-decimal separan distinto).
//   (d) tolerancia: medio punto de `decimals` (hecho en miles: ±500 unidades, 0,0005 M).
//   (e) ingresos (`Revenue`): solo se informa si lo cargado es MENOR que la etiqueta (se perdió una línea); mayor es lo normal (Revenue es la cifra de negocios).
// Devuelve millones de la moneda del informe, como official_totals.
// ============================================================================
import { readFileSync } from 'node:fs';

const local = (n) => String(n || '').replace(/^.*:/, '');
const attr = (t, a) => { const m = t.match(new RegExp(`\\b${a}\\s*=\\s*"([^"]*)"`)); return m ? m[1] : null; };

// contextos sin dimensiones y de duración, por id -> { inicio, fin }
function contextos(src) {
  const out = new Map();
  for (const m of src.matchAll(/<(?:[\w-]+:)?context\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?context>/g)) {
    const cuerpo = m[2];
    if (/explicitMember|typedMember/.test(cuerpo)) continue;
    const ini = (cuerpo.match(/<(?:[\w-]+:)?startDate>\s*([\d-]+)\s*</) || [])[1]; const fin = (cuerpo.match(/<(?:[\w-]+:)?endDate>\s*([\d-]+)\s*</) || [])[1];
    if (ini && fin) out.set(m[1], { inicio: ini, fin });
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
function hechos(src, nombre, cierre) {
  const ctx = contextos(src); const out = [];
  for (const m of src.matchAll(/<ix:nonFraction\b([^>]*)>([\s\S]*?)<\/ix:nonFraction>/g)) {
    const a = m[1]; if (local(attr(a, 'name')) !== nombre) continue;
    const c = ctx.get(attr(a, 'contextRef')); if (!c || c.fin !== cierre) continue;
    const txt = m[2].replace(/<[^>]+>/g, '');
    const n = numero(txt, attr(a, 'format')); if (n == null) { out.push({ ilegible: txt.trim() }); continue; }
    const escala = Number(attr(a, 'scale') || 0); const dcm = attr(a, 'decimals');
    const valor = (attr(a, 'sign') === '-' ? -1 : 1) * n * 10 ** escala;
    const tol = dcm == null || /^inf$/i.test(dcm) ? 0 : 0.5 * 10 ** (-Number(dcm));
    out.push({ valor, tolM: tol / 1e6, inicio: c.inicio, txt: txt.trim() });
  }
  return out;
}
const unico = (hs) => { const ok = hs.filter((h) => !h.ilegible); if (hs.some((h) => h.ilegible)) return { estado: 'formato', detalle: hs.find((h) => h.ilegible).ilegible }; if (!ok.length) return { estado: 'sin-hecho' }; const v = ok[0]; if (ok.some((h) => Math.abs(h.valor - v.valor) > Math.max(h.tolM, v.tolM) * 1e6)) return { estado: 'ambiguo', valoresM: ok.map((h) => h.valor / 1e6) }; return { estado: 'ok', valorM: v.valor / 1e6, tolM: Math.max(...ok.map((h) => h.tolM)), inicio: v.inicio }; };

// -> { resultado: {estado, valorM, tolM}, ingresos: {estado, valorM, tolM} } para el ejercicio que cierra en `cierre` (AAAA-MM-DD)
export function leerResultadoIxbrl(xhtmlAbs, cierre) {
  const src = readFileSync(xhtmlAbs, 'utf8');
  return { resultado: unico(hechos(src, 'ProfitLoss', cierre)), ingresos: unico(hechos(src, 'Revenue', cierre)) };
}

// Compara con lo cargado (en millones). -> { avisos: [texto], caso: texto|null }
export function chequearIxbrl(ix, { resultadoM, ingresosM }) {
  const avisos = []; let caso = null; const r = ix.resultado;
  if (r.estado === 'ok' && resultadoM != null) {
    if (Math.abs(r.valorM - resultadoM) > r.tolM + 1e-6) { caso = `resultado iXBRL ${r.valorM} M contra ${resultadoM} M cargado (diferencia ${+(r.valorM - resultadoM).toFixed(6)} M; tolerancia ${r.tolM} M)`; avisos.push(`ProfitLoss del informe XHTML (iXBRL) no coincide: ${caso}`); }
  } else if (r.estado === 'ambiguo') avisos.push(`ProfitLoss del informe XHTML: dos valores distintos en contextos válidos (${r.valoresM.join(' / ')} M); no se compara`);
  else if (r.estado === 'formato') avisos.push(`ProfitLoss del informe XHTML: formato de número que no se lee («${r.detalle}»); no se compara`);
  const i = ix.ingresos;
  if (i.estado === 'ok' && ingresosM != null && ingresosM < i.valorM - i.tolM - 1e-6) avisos.push(`ingresos cargados ${ingresosM} M son menores que la etiqueta Revenue del informe XHTML (${i.valorM} M): ¿se perdió una línea?`);
  return { avisos, caso, resultado: r.estado };
}
