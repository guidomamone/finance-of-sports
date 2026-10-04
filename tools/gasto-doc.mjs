// ============================================================================
// tools/gasto-doc.mjs — LO GASTADO EN CADA DOCUMENTO en una corrida, por tarea, y si esa tarea ya se había pagado antes para el mismo PDF.
// Gratis: solo lee los registros de gasto que ya existen.
//
// POR QUÉ (Versión 449, punto 1.vi del HANDOFF, aprobado por Guido el 2026-10-04). El lote decía solo "Gastado: US$ X" en total, y así no
// se veían las repeticiones: Juventus 2022-23 pagó localizar 4 veces y extraer 3 (la corrida del 10-04 habría mostrado "3.ª vez").
// Una repetición es cualquier pago anterior de la misma tarea para el mismo PDF (decisión de Guido): es información, no frena nada; las
// fechas al lado dejan ver si fue justificada.
//
// DE DÓNDE SALE CADA NÚMERO (solo lo que tiene fecha dentro de la corrida):
//   Claude    Admin/claude-api/resultados.jsonl          localizar (y su segunda vuelta localizar-2), extraer, extraer-reintento,
//                                                        categorizar, caja-deuda (con la ruta real del PDF)
//   Mistral   Admin/mistral/resultados.jsonl             transcribir o re-transcribir
//   resolver  Admin/transcripciones-verificaciones.jsonl `costoUsd` por documento (etapa 2, escalón 1a; sus llamadas a Gemini y Claude
//                                                        van con rutas temporales, por eso se toma el total que deja el resolver)
//   validar   lo pasa lote.mjs (`extra`): las páginas escaneadas que leyó Gemini en la etapa 4 (también con rutas temporales)
// Familias para contar repeticiones: localizar-2 es parte de localizar; extraer-reintento cuenta como extraer.
//
// USO SUELTO (para mirar una corrida pasada):
//   node tools/gasto-doc.mjs --lista Admin/lote-13g.txt --desde 2026-10-04T17:30 --hasta 2026-10-04T17:45
// ============================================================================

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const leer = (rel) => { const p = resolve(ROOT, rel); if (!existsSync(p)) return []; const out = []; for (const l of readFileSync(p, 'utf8').split('\n')) { if (!l) continue; try { out.push(JSON.parse(l)); } catch { /* línea rota */ } } return out; };
const familia = (t) => String(t).replace(/-2$/, '').replace(/-reintento$/, '');
const fecha = (ts) => String(ts).slice(5, 16).replace('T', ' ');

// docs: [pdf]; desde/hasta: ISO; registro: entradas del registro (para pasar de .md a .pdf); extra: { pdf: { tarea: usd } }.
// Devuelve [{ pdf, total, partes: [{ tarea, usd, n, vez, antes: [ts] }] }] solo de los documentos con gasto.
export function gastoPorDocumento(docs, { desde, hasta = '9999', registro = [], extra = {} } = {}) {
  const set = new Set(docs); const mdAPdf = new Map(registro.filter((e) => e.md).map((e) => [e.md, e.pdf]));
  const pagos = []; // { pdf, tarea, ts, usd }
  for (const x of leer('Admin/claude-api/resultados.jsonl')) if (set.has(x.pdf)) pagos.push({ pdf: x.pdf, tarea: x.tarea, ts: x.ts, usd: x.costUsd || 0 });
  for (const x of leer('Admin/mistral/resultados.jsonl')) if (set.has(x.pdf)) pagos.push({ pdf: x.pdf, tarea: 'mistral', ts: x.ts, usd: x.costUsd || 0 });
  // La línea 'validar-bloques (proceso nuevo)' la escribe verificar.mjs copiando la validación anterior (con su costoUsd): no es un pago.
  for (const x of leer('Admin/transcripciones-verificaciones.jsonl')) { const pdf = mdAPdf.get(x.md); if (pdf && set.has(pdf) && x.costoUsd && !/^validar-bloques/.test(x.method || '')) pagos.push({ pdf, tarea: 'resolver', ts: x.ts, usd: x.costoUsd }); }
  const out = [];
  for (const pdf of docs) {
    const P = pagos.filter((p) => p.pdf === pdf).sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
    const enCorrida = P.filter((p) => p.ts >= desde && p.ts <= hasta);
    const partes = new Map();
    for (const p of enCorrida) {
      const t = p.tarea; const q = partes.get(t) || { tarea: t, usd: 0, n: 0, vez: 0, antes: [] };
      q.usd += p.usd; q.n++;
      // Repetición: pagos anteriores de la misma FAMILIA para este PDF (sin contar la segunda vuelta de localizar dentro de la misma llamada).
      if (!/-2$/.test(t)) { const prev = P.filter((y) => y.ts < p.ts && familia(y.tarea) === familia(t) && !/-2$/.test(y.tarea)); q.vez = prev.length + 1; q.antes = prev.map((y) => y.ts); }
      partes.set(t, q);
    }
    for (const [t, usd] of Object.entries(extra[pdf] || {})) if (usd) { const q = partes.get(t) || { tarea: t, usd: 0, n: 0, vez: 0, antes: [] }; q.usd += usd; q.n++; partes.set(t, q); }
    const total = [...partes.values()].reduce((a, q) => a + q.usd, 0);
    if (total > 0) out.push({ pdf, total, partes: [...partes.values()] });
  }
  return out;
}

// Las líneas del resumen: "  2022-23  US$ 0,64  localizar 0,15 (3.ª vez; antes: 10-03 22:39, 10-03 23:18) · ..."
export function lineasGasto(g) {
  const anio = (pdf) => (pdf.match(/(\d{4}(?:-\d{2})?)(?!.*\d{4})/) || [])[1] || pdf.split('/').pop();
  return g.map((d) => `  ${anio(d.pdf).padEnd(8)} US$ ${d.total.toFixed(2)}  ${d.partes.map((q) => `${q.tarea} ${q.usd.toFixed(2)}${q.n > 1 ? ` (${q.n} llamadas)` : ''}${q.vez > 1 ? ` (${q.vez}.ª vez de ${familia(q.tarea)}; antes: ${q.antes.slice(-3).map(fecha).join(', ')})` : ''}`).join(' · ')}   ${d.pdf.split('/').slice(1, 3).join('/')}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const A = process.argv.slice(2); const f = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
  if (!f('--lista') || !f('--desde')) { console.error('Uso: node tools/gasto-doc.mjs --lista <archivo> --desde <ISO> [--hasta <ISO>]'); process.exit(1); }
  const docs = readFileSync(resolve(ROOT, f('--lista')), 'utf8').split('\n').map((l) => l.trim().replace(/^testigo\s+/i, '')).filter((l) => l && !l.startsWith('#'));
  const registro = leer('Admin/transcripciones-estado.jsonl');
  const g = gastoPorDocumento(docs, { desde: f('--desde'), hasta: f('--hasta') || '9999', registro });
  console.log(`GASTO POR DOCUMENTO (${f('--desde')} a ${f('--hasta') || 'hoy'}; validar con Gemini no figura suelto, lo anota el lote):`);
  for (const l of lineasGasto(g)) console.log(l);
  console.log(`  Total: US$ ${g.reduce((a, d) => a + d.total, 0).toFixed(2)}`);
}
