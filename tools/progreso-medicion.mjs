#!/usr/bin/env node
// ============================================================================
// tools/progreso-medicion.mjs — `fos progreso`: cuánto falta de la medición del pipeline que está corriendo (`node tools/medir-pipeline.mjs`).
//
// POR QUÉ. Una medición del lote completo tarda unos diez minutos y, desde afuera, no se ve nada hasta que termina. medir-pipeline.mjs escribe
// Admin/mediciones/pipeline/_progreso.json en cada paso (nivel, medidor, antes o después); esta tool lo lee y dice el porcentaje y el tiempo que falta.
// El porcentaje pesa cada paso por los documentos de su tramo (un medidor que no usa lista pesa como 150 documentos); el tiempo es una estimación lineal.
//
// USO: node tools/progreso-medicion.mjs        una línea: estado, porcentaje, qué está corriendo y cuánto lleva y falta
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const F = join(ROOT, 'Admin', 'mediciones', 'pipeline', '_progreso.json');
const min = (s) => (s == null ? '?' : s >= 60 ? `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s` : `${s} s`);
if (!existsSync(F)) { console.log('No hay una medición en curso ni registro de la última (Admin/mediciones/pipeline/_progreso.json no existe).'); process.exit(0); }
const p = JSON.parse(readFileSync(F, 'utf8'));
let viva = false; try { process.kill(p.pid, 0); viva = true; } catch { /* terminó o cayó */ }
if (p.estado === 'midiendo' && !viva) p.estado = 'cayó sin terminar';
if (p.estado === 'midiendo') {
  console.log(`Midiendo: ${p.porcentaje} % · lleva ${min(p.segundos)} · quedan unos ${min(p.segundosQueFaltan)}`);
  console.log(`  ahora: lote ${p.nivel} (${p.nivelNumero} de ${p.nivelesTotal}), medidor ${p.medidor} (paso ${p.medidorNumero} de ${p.pasosTotal}), ${p.fase}${p.documentosDelTramo ? `, ${p.documentosDelTramo} documentos en este tramo` : ''}`);
  console.log(`  tools: ${(p.tools || []).join(', ')}`);
} else {
  const verbo = p.estado === 'terminado' ? 'terminó' : p.estado === 'cortado' ? 'se cortó por diferencias' : p.estado;
  console.log(`La última medición ${verbo}: ${p.porcentaje} % del plan en ${min(p.segundos)} (${(p.tools || []).join(', ')}). No hay otra en curso.`);
}
