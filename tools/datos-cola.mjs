#!/usr/bin/env node
// ============================================================================
// tools/datos-cola.mjs — LOS DATOS QUE VAN EN UNA PREGUNTA DE LA COLA
//
// POR QUÉ. La cola ofrecía «Propuesta del sistema: sí» como respuesta por defecto: invita a aceptar sin mirar, y la sesión cambió la categoría propuesta en 18 % de las
// preguntas de categoría (medido contra Admin/registros/cola-revision.jsonl). Ahora la pregunta trae lo que la sesión iba a buscar a mano, y no decide por ella:
//   · cuánto pesa la fila (monto y % del total de su lado del ejercicio),
//   · qué se le contestó a la MISMA etiqueta en este club, en su país y en el resto (cuenta por categoría), con la distribución y sin elegir una,
//   · qué dijeron Jev y Claude por separado y con qué confianza.
// Gratis (lee la cola y el .jev.json que ya existe). Un dato que no se puede calcular se omite, nunca se inventa.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { respuestasDonde } from './cola.mjs';
import { derivado } from './rutas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
export const normEtiqueta = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const catDe = ({ caso, resp }) => (resp.decision === 'aceptar' ? caso.categoriaPropuesta : resp.decision === 'corregir' ? String(resp.valor || '').trim() : null);
const cuenta = (xs) => { const m = {}; for (const x of xs) m[x] = (m[x] || 0) + 1; return Object.entries(m).sort((a, b) => b[1] - a[1]); };
const texto = (c) => cuenta(c).map(([k, n]) => `${k} ${n}`).join(', ');

// lo que ya se contestó a la misma etiqueta, por alcance (club / país / todo); `excepto` es el documento de esta pregunta
export function precedentesDeEtiqueta(etiqueta, pdf) {
  const e = normEtiqueta(etiqueta); if (!e) return null;
  const [, pais, club] = String(pdf).split('/');
  const todas = respuestasDonde('cargar', 'categoria', (c) => c.pdf !== pdf && normEtiqueta(String(c.detalle).split('|')[0].split('@')[0]) === e)
    .map((x) => ({ ...x, cat: catDe(x) })).filter((x) => x.cat);
  const club_ = todas.filter((x) => String(x.caso.pdf).split('/')[2] === club);
  const pais_ = todas.filter((x) => String(x.caso.pdf).split('/')[1] === pais);
  return { club: club_.map((x) => x.cat), pais: pais_.map((x) => x.cat), todo: todas.map((x) => x.cat) };
}

// qué dijo Jev por separado: lee el .jev.json del documento si existe
export function jevDe(md, etiqueta, lado) {
  try {
    const p = resolve(ROOT, derivado(md, '.jev.json', { crear: false })); if (!existsSync(p)) return null;
    const j = JSON.parse(readFileSync(p, 'utf8'));
    const r = (j.rubros || []).find((x) => normEtiqueta(x.label) === normEtiqueta(etiqueta) && (!lado || x.lado === lado));
    return r ? { cat: r.choice, conf: r.confidence } : null;
  } catch { return null; }
}

// el bloque de texto que se suma al `que` de la pregunta de categoría
export function datosCategoria({ etiqueta, pdf, md, lado, monto, totalLado, propuesta, confClaude }) {
  const l = [];
  if (monto != null && totalLado) l.push(`pesa ${(100 * Math.abs(monto) / totalLado).toFixed(2)}% de ${lado === 'revenue' ? 'los ingresos' : 'los gastos'} del ejercicio`);
  const p = precedentesDeEtiqueta(etiqueta, pdf);
  if (p) {
    const partes = [];
    if (p.club.length) partes.push(`este club (${p.club.length}): ${texto(p.club)}`);
    if (p.pais.length > p.club.length) partes.push(`su país (${p.pais.length}): ${texto(p.pais)}`);
    if (p.todo.length > p.pais.length) partes.push(`todos (${p.todo.length}): ${texto(p.todo)}`);
    l.push(partes.length ? `lo contestado a esta etiqueta: ${partes.join(' · ')}` : 'esta etiqueta no se había contestado antes');
  }
  const jev = jevDe(md, etiqueta, lado);
  if (jev) l.push(`Jev dijo ${jev.cat} (${jev.conf})${confClaude != null ? `; la combinada con Claude, ${confClaude}, propone ${propuesta}` : ''}`);
  return l.length ? `Datos: ${l.join('. ')}.` : '';
}
