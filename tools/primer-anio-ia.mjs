// ============================================================================
// tools/primer-anio-ia.mjs — EL PRIMER AÑO DE UN CLUB, ESCALÓN 3: una pregunta a Claude cuando del estado solo se puede
// confirmar el resultado.
//
// POR QUÉ (decisión de Guido: "no quiero revisar yo el primer año del club"). Sin año anterior cargado ni documento vecino,
// verificar.mjs confirma un primer año con lo impreso: escalón 1, ingresos, gastos y resultado a 0,01%; escalón 2, un total y el resultado,
// con el otro total sin imprimir. En 42 de los 77 primeros años aceptados por la cola solo coincide el RESULTADO (Volos 2021-2023 y
// Panserraikos 2025 no imprimen totales; Roma, Lazio, Ferroviária cerraron con la lectura que no usa totales). Con el resultado exacto, lo
// único que se escapa es un error que se compensa: la misma cifra de más en los dos lados, o una fila que falta de un lado y sobra del otro.
// Eso no lo ve ninguna suma; se le pregunta a Claude con las líneas del estado y lo que se carga.
//
// LA ESCALERA DEL PRIMER AÑO (en verificar.mjs; acá solo el escalón 3):
//   1  ingresos, gastos y resultado coinciden con lo impreso a 0,01%                   → sin caso
//   2  un total y el resultado coinciden, el otro total no está impreso                 → sin caso
//   3  solo el resultado coincide a 0,01% → Claude: ¿falta, sobra, se repite o está del lado equivocado alguna fila del estado?
//        COMPUERTA: las cuatro listas vacías → sin caso. Cualquier fila marcada (o citada fuera del estado) → caso "primer-anio" con la cita,
//        que contesta el subagente de la sesión.
//   nada → caso "primer-anio" (como antes).
// verificar.mjs arma el pedido (pedidoPrimerAnio) y, si la respuesta está guardada, aplica la compuerta (compuertaPrimerAnio); si no, deja el
// caso y anota el pedido en el .verificacion.json (primerAnio.estado = "pendiente"). Esta tool contesta los pendientes y lote.mjs vuelve a
// verificar esos documentos.
//
// USO:
//   node tools/primer-anio-ia.mjs --lista <txt>                       # ensayo: qué documentos tienen el pedido pendiente y el costo
//   node tools/primer-anio-ia.mjs --lista <txt> --ejecutar            # pregunta a Claude (API) y guarda Generados/<doc>.primer-anio-ia.json
//   node tools/primer-anio-ia.mjs --lista <txt> --exportar <carpeta>  # los pedidos en archivos, para medir sin API (los contestan subagentes)
//   node tools/primer-anio-ia.mjs --importar <carpeta>                # guarda esas respuestas como si las hubiera dado la API
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');

export const SISTEMA = `Sos analista de estados financieros de clubes de fútbol. Recibís (1) las líneas numeradas del ESTADO DE RESULTADOS de un documento ("L123: ..."), en cualquier idioma, y (2) la lista de lo que se va a cargar de ese estado: cada fila con su lado (ingreso, gasto, financiero, impuesto), su rótulo, su importe (en millones) y la línea de donde sale. El resultado del ejercicio que da lo cargado coincide con el impreso.
Revisá, para la columna del ejercicio (la del año más reciente), si en lo que se carga:
- faltan: un renglón del estado con importe que no está cargado (ni él ni sus partes);
- sobran: una fila cargada que no es un renglón del estado (un subtotal, un total, un resultado intermedio, un dato del año anterior);
- repetidas: un mismo importe cargado dos veces (por ejemplo, el mismo renglón como ingreso y como gasto, o un renglón y también sus partes);
- lado_equivocado: un ingreso cargado como gasto o al revés.
Reglas: los subtotales y totales del estado (resultado bruto, resultado operativo, resultado antes de impuestos, totales) NO son filas para cargar. Una fila cuya línea está fuera del estado viene de una nota que abre un renglón del estado: eso está bien si sus partes reemplazan a ese renglón. Un renglón en cero o vacío no falta. Cada problema lleva la línea del estado (o de la fila cargada) que lo muestra y una explicación corta. Si no hay ningún problema, devolvé las cuatro listas vacías.`;
const ITEM = { type: 'object', additionalProperties: false, required: ['linea', 'motivo'], properties: { linea: { type: 'integer' }, motivo: { type: 'string' } } };
export const ESQUEMA = {
  type: 'object', additionalProperties: false, required: ['faltan', 'sobran', 'repetidas', 'lado_equivocado', 'observacion'],
  properties: { faltan: { type: 'array', items: ITEM }, sobran: { type: 'array', items: ITEM }, repetidas: { type: 'array', items: ITEM }, lado_equivocado: { type: 'array', items: ITEM }, observacion: { type: 'string' } },
};
const PROBLEMAS = ['faltan', 'sobran', 'repetidas', 'lado_equivocado'];

// El pedido: las líneas del estado (de la primera a la última fila del estado, con 3 de margen) y lo que se carga. `filas`: [{ lado,
// etiqueta, M, linea }]. Devuelve { user, clave, rango: [desde, hasta], lineasCargadas }.
export function pedidoPrimerAnio(mdText, estado, filas) {
  const L = mdText.split('\n');
  const ls = estado.map((f) => f.linea).filter((n) => Number.isInteger(n));
  if (!ls.length) return null;
  const desde = Math.max(1, Math.min(...ls) - 3); const hasta = Math.min(L.length, Math.max(...ls) + 3);
  const texto = L.slice(desde - 1, hasta).map((l, k) => `L${desde + k}: ${l}`).filter((l) => !/^L\d+:\s*$/.test(l)).join('\n');
  const carga = filas.map((f) => `- ${f.lado} · "${String(f.etiqueta).slice(0, 90)}" · ${f.M} · L${f.linea ?? '?'}${f.linea != null && (f.linea < desde || f.linea > hasta) ? ' (de una nota)' : ''}`).join('\n');
  const user = `ESTADO DE RESULTADOS (líneas ${desde} a ${hasta} del .md):\n${texto}\n\nLO QUE SE CARGA:\n${carga}`;
  const clave = createHash('sha1').update(JSON.stringify([SISTEMA, user])).digest('hex');
  return { user, clave, rango: [desde, hasta], lineasCargadas: filas.map((f) => f.linea).filter((n) => n != null) };
}

const archivoRespuesta = (md) => resolve(ROOT, derivado(md, '.primer-anio-ia.json'));
export function respuestaGuardada(md, clave) {
  const p = resolve(ROOT, derivado(md, '.primer-anio-ia.json', { crear: false }));
  if (!existsSync(p)) return null;
  try { const j = JSON.parse(readFileSync(p, 'utf8')); return j.clave === clave ? j.datos : null; } catch { return null; }
}
function guardar(md, clave, datos, fuente) {
  writeFileSync(archivoRespuesta(md), JSON.stringify({ md, clave, generado: new Date().toISOString(), fuente, datos }, null, 1));
}

// LA COMPUERTA: sin ningún problema → ok. Un problema cuya línea no está en el estado ni entre las filas cargadas → también va a la cola
// (la cita no se puede comprobar).
export function compuertaPrimerAnio(datos, pedido) {
  const [desde, hasta] = pedido.rango; const cargadas = new Set(pedido.lineasCargadas);
  const probs = PROBLEMAS.flatMap((k) => (datos?.[k] || []).map((x) => ({ tipo: k, ...x, citaValida: (x.linea >= desde && x.linea <= hasta) || cargadas.has(x.linea) })));
  if (!probs.length) return { ok: true, problemas: [] };
  return { ok: false, problemas: probs, detalle: probs.map((p) => `${p.tipo.replace('_', ' ')} L${p.linea}${p.citaValida ? '' : ' (línea fuera del estado)'}: ${p.motivo}`).join('; ') };
}

// ---------------------------------------------------------------- CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  const importarF = flag('--importar');
  if (importarF) {
    const dir = resolve(ROOT, importarF); let n = 0;
    for (const l of readFileSync(resolve(dir, 'pedidos.jsonl'), 'utf8').split('\n')) {
      if (!l.trim()) continue; const p = JSON.parse(l); const f = resolve(dir, `${p.n}.json`);
      if (!existsSync(f)) { console.log(`  falta ${p.n}.json (${p.md})`); continue; }
      guardar(p.md, p.clave, JSON.parse(readFileSync(f, 'utf8')), 'subagente de la sesión (medición)'); n++;
    }
    console.log(`${n} respuesta(s) guardadas. Volver a correr verificar.mjs sobre esos documentos para aplicarlas.`); process.exit(0);
  }
  const listaF = flag('--lista'); if (!listaF) { console.error('Uso: --lista <txt> [--ejecutar | --exportar <carpeta>] | --importar <carpeta>'); process.exit(1); }
  const registro = readFileSync(resolve(ROOT, 'Admin', 'registros', 'transcripciones-estado.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  const docs = readFileSync(resolve(ROOT, listaF), 'utf8').split('\n').map((l) => l.trim().replace(/^testigo\s+/i, '')).filter((l) => l && !l.startsWith('#'));
  const pendientes = [];
  for (const pdf of docs) {
    const md = registro.find((x) => x.pdf === pdf)?.md || pdf.replace(/\.pdf$/i, '.md');
    const pV = resolve(ROOT, derivado(md, '.verificacion.json', { crear: false })); if (!existsSync(pV)) continue;
    const pa = JSON.parse(readFileSync(pV, 'utf8')).primerAnio;
    if (pa?.estado === 'pendiente' && !respuestaGuardada(md, pa.clave)) pendientes.push({ pdf, md, ...pa });
  }
  const exportarF = flag('--exportar');
  if (exportarF) {
    const dir = resolve(ROOT, exportarF); mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'sistema.txt'), SISTEMA);
    pendientes.forEach((p, k) => writeFileSync(resolve(dir, `${k + 1}.txt`), p.user));
    writeFileSync(resolve(dir, 'pedidos.jsonl'), pendientes.map((p, k) => JSON.stringify({ n: k + 1, md: p.md, clave: p.clave })).join('\n') + '\n');
    console.log(`${pendientes.length} pedido(s) en ${exportarF}`); process.exit(0);
  }
  const { llamarClaude, tokensDe, usdEstimado } = await import('./claude-llamada.mjs');
  const usdEst = pendientes.reduce((a, p) => a + usdEstimado(tokensDe(SISTEMA + p.user), 400), 0);
  if (!A.includes('--ejecutar')) {
    for (const p of pendientes) console.log(`  pendiente: ${p.pdf}`);
    console.log(`${pendientes.length} documento(s) con el escalón 3 del primer año pendiente: ~US$ ${usdEst.toFixed(2)}. Agregá --ejecutar.`); process.exit(0);
  }
  let usd = 0;
  for (const p of pendientes) {
    const r = await llamarClaude({ system: SISTEMA, user: p.user, schema: ESQUEMA, tarea: 'primer-anio', pdf: p.pdf, maxTokens: 4000 });
    usd += r.costo || 0;
    if (r.pendiente) { console.log(`  ${p.pdf}: pendiente de la Batch API (ola siguiente)`); continue; }
    if (r.error) { console.log(`  ${p.pdf}: ERROR ${r.error}`); continue; }
    guardar(p.md, p.clave, r.datos, 'API'); const g = compuertaPrimerAnio(r.datos, p);
    console.log(`  ${p.pdf}: ${g.ok ? 'sin problemas' : g.detalle}`);
  }
  console.log(`US$ ${usd.toFixed(3)}. Volver a correr verificar.mjs sobre esos documentos para aplicarlas.`);
}
