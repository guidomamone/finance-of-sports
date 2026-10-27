#!/usr/bin/env node
// ============================================================================
// tools/dictamen-fechas.mjs — ¿LAS FECHAS DEL DICTAMEN SON LAS DEL EJERCICIO? Gratis, sin red, determinista; solo avisa.
//
// POR QUÉ. `auditoria.mjs` verifica que la cita de un dictamen exista y que su .md sea del ejercicio, pero no mira las fechas que el documento imprime: Alianza FC 2024 y 2025 traen un
// dictamen firmado «Marzo 29 de 2024» y «Marzo 29 de 2025» para ejercicios que cierran el 31 de diciembre de esos años (la plantilla de otro año con el año tocado), y la cita pasaba.
//
// QUÉ MIRA. Del registro `Admin/registros/auditoria.jsonl`, de cada línea con auditor: las fechas completas (día, mes, año) en las 4 líneas de arriba y la de abajo de la cita del auditor (la firma: «Ciudad, Marzo 29 de 2025» va encima del nombre) y
// el cierre del ejercicio (`period_end` del JSON del club). Avisa si la fecha más reciente de la firma es ANTERIOR al cierre (se firmó antes de que el ejercicio terminara) o pasa de 30 meses
// después del cierre, y si el .md citado no nombra el año del cierre en ningún lado. Los meses están en español, portugués, inglés, italiano, alemán, francés y neerlandés; un idioma
// sin esos meses no se mira (no avisa). Es un aviso: lo que reporta lo mira una sesión contra el documento (el dictamen puede estar bien y la firma ser de una reexpresión).
//
// USO:   node tools/dictamen-fechas.mjs             lista los club-años sospechosos y sale con código 0
//        node tools/dictamen-fechas.mjs --todos     además cuenta cuántas líneas se pudieron mirar
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const MESES = { 1: 'enero|janeiro|january|jan|gennaio|januar|janvier|januari', 2: 'febrero|fevereiro|february|feb|febbraio|februar|février|fevrier|februari', 3: 'marzo|março|marco|march|mar|märz|marz|mars|maart',
  4: 'abril|april|apr|aprile|avril', 5: 'mayo|maio|may|maggio|mai|mei', 6: 'junio|junho|june|jun|giugno|juni|juin', 7: 'julio|julho|july|jul|luglio|juli|juillet|juil', 8: 'agosto|august|aug|août|aout|augustus',
  9: 'septiembre|setiembre|setembro|september|sep|sept|settembre|septembre', 10: 'octubre|outubro|october|oct|ottobre|oktober|octobre|okt', 11: 'noviembre|novembro|november|nov|novembre', 12: 'diciembre|dezembro|december|dec|dicembre|dezember|décembre|decembre|dez|dic' };
const NOMBRE = {}; for (const [n, ls] of Object.entries(MESES)) for (const m of ls.split('|')) NOMBRE[m] = Number(n);
const ALT = Object.keys(NOMBRE).sort((a, b) => b.length - a.length).join('|');
const DMA = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th|º|°|\\.)?\\s*(?:de |del |of |\\.)?\\s*(${ALT})\\.?,?\\s*(?:de |del |of )?\\s*(\\d{4})\\b`, 'gi');
const MDA = new RegExp(`\\b(${ALT})\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s*(?:de |del )?\\s*(\\d{4})\\b`, 'gi');
const NUM = /\b(\d{1,2})[/.-](\d{1,2})[/.-](20\d{2})\b/g, ISO = /\b(20\d{2})-(\d{2})-(\d{2})\b/g;
const dia = (y, m, d) => (m >= 1 && m <= 12 && d >= 1 && d <= 31 ? Date.UTC(y, m - 1, d) : null);

export function fechasDe(texto) {
  const out = []; const poner = (t) => { if (t !== null) out.push(t); };
  for (const m of texto.matchAll(DMA)) poner(dia(+m[3], NOMBRE[m[2].toLowerCase()], +m[1]));
  for (const m of texto.matchAll(MDA)) poner(dia(+m[3], NOMBRE[m[1].toLowerCase()], +m[2]));
  for (const m of texto.matchAll(NUM)) poner(+m[1] > 12 ? dia(+m[3], +m[2], +m[1]) : +m[2] > 12 ? dia(+m[3], +m[1], +m[2]) : dia(+m[3], +m[2], +m[1]));
  for (const m of texto.matchAll(ISO)) poner(dia(+m[1], +m[2], +m[3]));
  return out;
}

const cacheMd = new Map(); const cacheClub = new Map();
const leerMd = (md) => { if (!cacheMd.has(md)) cacheMd.set(md, existsSync(resolve(ROOT, md)) ? readFileSync(resolve(ROOT, md), 'utf8').split('\n') : null); return cacheMd.get(md); };
const cierreDe = (clubId, anio) => {
  if (!cacheClub.has(clubId)) { const f = resolve(ROOT, 'data', clubId.split('-').pop(), `${clubId}.json`); cacheClub.set(clubId, existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null); }
  const y = (cacheClub.get(clubId)?.years || []).find((x) => Number(x.fiscal_year) === Number(anio)); const p = y?.period_end?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return p ? Date.UTC(+p[1], +p[2] - 1, +p[3]) : null;
};
const iso = (t) => new Date(t).toISOString().slice(0, 10);

// Devuelve { mirada, motivo } de una línea del registro: motivo es null si todo cierra o no se pudo mirar.
export function revisarLinea(o) {
  const c = o.citas?.auditor; if (!c?.md || !c.linea || !o.clubId) return { mirada: false, motivo: null };
  // solo un documento que ES el informe (dictamen-…, informe-…, auditor…): en un balance entero la firma está entre cientos de fechas que no son la firma
  if (!/dictamen|informe|revisor|audit|opini[oó]n|certifica|parecer|relat[oó]rio de aud|independent|revisione/i.test(c.md.split('/').pop())) return { mirada: false, motivo: null };
  const L = leerMd(c.md), P = cierreDe(o.clubId, o.anio); if (!L || P === null) return { mirada: false, motivo: null };
  const ventana = L.slice(Math.max(0, c.linea - 5), c.linea + 2).join('\n'); if (/[Ѐ-ӿ]/.test(ventana)) return { mirada: false, motivo: null }; // meses en cirílico: no se leen
  const fechas = fechasDe(ventana); if (!fechas.length) return { mirada: false, motivo: null };
  const D = Math.max(...fechas); const motivos = [];
  if (D < P) motivos.push(`la firma más reciente (${iso(D)}) es anterior al cierre del ejercicio (${iso(P)})`);
  else if (D > P + 30 * 30.44 * 864e5) motivos.push(`la firma más reciente (${iso(D)}) es más de 30 meses posterior al cierre (${iso(P)})`);
  if (!L.join('\n').includes(String(new Date(P).getUTCFullYear()))) motivos.push(`el .md no nombra el año ${new Date(P).getUTCFullYear()}`);
  return { mirada: true, motivo: motivos.length ? `${c.md}:${c.linea}: ${motivos.join('; ')}` : null };
}

export function sospechosos() {
  const reg = resolve(ROOT, 'Admin/registros/auditoria.jsonl'); const out = []; let miradas = 0, total = 0;
  for (const l of (existsSync(reg) ? readFileSync(reg, 'utf8').split('\n') : [])) {
    if (!l.trim()) continue; let o; try { o = JSON.parse(l); } catch { continue; } total++;
    const r = revisarLinea(o); if (r.mirada) miradas++; if (r.motivo) out.push(`${o.clubId || `liga ${o.ligaId}`} ${o.anio}: ${r.motivo}`);
  }
  return { out, miradas, total };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { out, miradas, total } = sospechosos(); for (const l of out) console.log(l);
  console.log(`${out.length} dictamen(es) con fechas que no cierran con el ejercicio (${miradas} de ${total} líneas del registro se pudieron mirar).`);
}
