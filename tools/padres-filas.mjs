// ============================================================================
// tools/padres-filas.mjs — EN QUÉ NOTA ESTÁ CADA FILA (el "padre": el renglón del estado que la fila desglosa, o 'estado'), para las
// filas ya verificadas. Gratis: lee los Generados/**/<doc>.verificacion.json (la etapa 6 deja escrito el origen de cada línea:
// 'nota que desglosa "Custo com futebol"').
//
// POR QUÉ (Versión 403, auditoría del pipeline del 2026-10-02, diseño aprobado por Guido): lo CARGADO en el sitio (data/*-data.js) no guarda
// en qué nota estaba cada fila, y el precedente "sin contexto" de la etapa 7 decidía por la etiqueta sola. Casos reales, Goiás:
//   - "Despesa com pessoal" 2014 (nota de fútbol, 21.628.163) tomó el precedente de 2022-2023, donde la misma etiqueta está en la nota
//     ADMINISTRATIVA: salió gastos generales en vez de sueldos del plantel;
//   - "Serviços de terceiros" 2008-2016 (bloque administrativo) tomó la respuesta de Guido para la fila de "Custo com futebol" (2024-2025).
// Con el padre conocido, los escalones de precedente y las respuestas de la cola de otro año se usan solo para la MISMA nota.
//
// sinMarca(): la etiqueta sin la marca de nota del final ("Despesa com pessoal (a)" -> "despesa com pessoal"; también "(1)", "(nota 17)"),
// para comparar etiquetas cuando se compara también el padre (la marca cambia de nota entre años: en Goiás 2024 la "(a)" es la
// administrativa y en 2025 la de fútbol).
// ============================================================================

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { normalizar, claveFamilia } from './vocabulario.mjs';
import { clubDeRuta } from './carpetas-clubes.mjs';
import { padreDe } from './memoria-categorias.mjs';

const ROOT = resolve(import.meta.dirname, '..');

export const sinMarca = (s) => normalizar(String(s || '')).replace(/\s*\((?:[a-z]|\d{1,2}|nota \d+)\)\s*$/i, '').trim();
// MISMA NOTA por las PALABRAS DE CONTENIDO del título (Versión 403, medido: comparar el texto exacto dejaba sin precedente cientos de filas
// que salían bien, porque cada año nombra distinto la misma nota: "Gasto de administración" / "Gastos de Administración" en UC, frases
// largas en Fortaleza). Se sacan palabras genéricas (gastos, despesas, total, ingresos, nota...) y se compara por raíz de 5 letras: comparten
// al menos una -> misma nota. "(-) Despesas com futebol profissional e amador" y "Custo com futebol" comparten "futeb"; con "Despesas
// administrativas e gerais" no comparten nada. 'estado' solo es igual a 'estado'.
const GENERICAS = new Set(['gasto', 'gastos', 'despesa', 'despesas', 'custo', 'custos', 'costo', 'costos', 'total', 'totales', 'ingreso', 'ingresos', 'receita', 'receitas', 'liquida', 'liquidas', 'nota', 'notas', 'otros', 'otras', 'outros', 'outras', 'siguiente', 'detalle', 'conformados', 'diciembre', 'dezembro', 'terminados', 'anos', 'años', 'actividades', 'atividades', 'ordinarias', 'operacion', 'operacionales', 'operacionais', 'expenses', 'income', 'revenue', 'other', 'costs']);
const raices = (t) => new Set(sinMarca(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z]+/).filter((w) => w.length > 3 && !GENERICAS.has(w)).map((w) => w.slice(0, 5)));
export const mismoPadre = (a, b) => {
  if (a == null || b == null) return false;
  if (sinMarca(a) === sinMarca(b)) return true;
  if (a === 'estado' || b === 'estado') return false;
  const ra = raices(a); const rb = raices(b);
  if (!ra.size || !rb.size) return true; // títulos solo genéricos ("Total Otros Gastos"): no se puede decir que sean distintos
  for (const r of ra) if (rb.has(r)) return true;
  return false;
};

const LADO = { ingreso: 'revenue', gasto: 'expense' };
let cache = null;

function walk(dir, out) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.verificacion.json')) out.push(p);
  }
  return out;
}

// { porDoc: Map(md -> Map('lado|etiqueta' -> padre)), porClub: Map('club|año|lado|etiqueta' -> padre) }. Una etiqueta que aparece dos veces en
// el mismo documento con padres distintos queda en null (no se sabe cuál).
export function padres() {
  if (cache) return cache;
  const porDoc = new Map(); const porClub = new Map();
  const poner = (m, k, v) => { if (!m.has(k)) m.set(k, v); else if (m.get(k) !== v) m.set(k, null); };
  for (const f of walk(resolve(ROOT, 'Generados'), [])) {
    let v; try { v = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
    if (!v.md || !Array.isArray(v.lineas)) continue;
    const club = clubDeRuta(v.md).clubId; const year = v.year != null ? String(v.year) : null;
    const d = new Map(); porDoc.set(v.md, d);
    for (const l of v.lineas) {
      const lado = LADO[l.lado]; if (!lado || !l.etiqueta) continue;
      const padre = padreDe(l.origen); const k = `${lado}|${sinMarca(l.etiqueta)}`;
      poner(d, k, padre);
      if (club && year) poner(porClub, `${club}|${year}|${k}`, padre);
    }
  }
  cache = { porDoc, porClub };
  return cache;
}

export const padreEnDoc = (md, lado, label) => padres().porDoc.get(md)?.get(`${lado}|${sinMarca(label)}`) ?? null;
export const padreEnClub = (club, year, lado, label) => padres().porClub.get(`${club}|${year}|${lado}|${sinMarca(label)}`) ?? null;
void relative;

// CONTEXTO DE UNA FILA PARA COMPARAR ENTRE CLUBES (to-do 152, escalón B). Si una nota la abre: la nota ("nota:per servizi"). Si es una fila del
// ESTADO, padreEnDoc() dice solo "estado", que no distingue nada: ahí el contexto es el RENGLÓN TÍTULO más cercano de arriba en la misma tabla
// (la fila sin importes: "titulo:per il personale"). Caso: "altri costi" es wages_squad bajo "9) per il personale" y otra cosa bajo
// "14) oneri diversi". Sin contexto, null (y el escalón B no decide).
const mdLineas = new Map();
const celdas = (l) => l.split('|').slice(1, -1).map((x) => x.replace(/\*/g, '').trim());
export function contextoFila(md, label, lado) {
  const p = padreEnDoc(md, lado, label);
  if (p && p !== 'estado') return 'nota:' + claveFamilia(p);
  if (!mdLineas.has(md)) { const abs = resolve(ROOT, md); mdLineas.set(md, existsSync(abs) ? readFileSync(abs, 'utf8').split('\n') : []); }
  const L = mdLineas.get(md); const k = L.findIndex((x) => x.trim().startsWith('|') && claveFamilia(celdas(x)[0] || '') === claveFamilia(label));
  if (k < 0) return null;
  for (let j = k - 1; j >= 0 && L[j].trim().startsWith('|'); j--) { const c = celdas(L[j]); if (/^:?-+:?$/.test(c[0] || '')) continue; if (c[0] && c.slice(1).every((x) => !/\d/.test(x))) return 'titulo:' + claveFamilia(c[0]); }
  return null;
}
