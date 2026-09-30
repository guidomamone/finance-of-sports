// ============================================================================
// tools/altas-registro.mjs — el REGISTRO DE ALTAS: `Admin/altas-club.jsonl`, una línea por carpeta de
// club (`Clubes/<País>/<Club>/`) con qué haría falta para darlo de alta. Lo escribe SOLO
// tools/alta-club.mjs (cada corrida actualiza las líneas de las carpetas que analizó); lo leen
// `alta-club.mjs --resumen` / `--dudas` y, a futuro, `pipeline.mjs --resumen` (con `resumenAltas()`).
//
// POR QUÉ EXISTE (pedido de Guido, 2026-09-30: "que se haga por script, porque las IA se olvidan"):
// hasta ahora el resultado de alta-club.mjs vivía en la terminal y en un informe escrito a mano
// (Admin/test-alta-club.md). Una sesión de otro día no tenía cómo saber qué clubes ya estaban listos,
// cuáles tenían preguntas, ni si lo que se había concluido seguía valiendo. Con el registro:
//   - una línea por carpeta, REEMPLAZADA en cada corrida (no se apila): dos sesiones que corren
//     carpetas distintas no se pisan, y una que corre la misma carpeta la deja al día;
//   - cada línea guarda la HUELLA de todo lo que se usó para calcularla (mismo patrón que
//     tools/huellas.mjs): si cambia cualquier entrada, la próxima corrida de `--todos` la recalcula
//     sola; si no cambió nada, no se toca (ni se vuelve a pagar Claude).
//
// QUÉ ENTRA EN LA HUELLA (y por qué):
//   - sha1 de cada `.md` de la carpeta del club (no solo el documento base: alta-club.mjs mira los
//     demás `.md` para el cierre del ejercicio y para detectar dos entidades el mismo año);
//   - sha1 de los archivos de referencia consultados: `data/clubs.js` (ids existentes, patrón de
//     cierre del país), `data/currency-map.js` (FX_CLOSE, rangos), la serie `tools/fx-reference/
//     <moneda>-usd.json` de la moneda del país, `tools/club-league-reference/<iso2>.json` y
//     `data/club-leagues/<iso2>.js` (liga);
//   - la resolución de la regla carpeta -> club (tools/carpetas-clubes.mjs): si mañana algún
//     data/<id>-data.js empieza a citar la carpeta, la línea pasa a `existe` sin que nadie lo pida;
//   - sha1 de tools/alta-club.mjs y tools/alta-claude.mjs: si cambian las reglas, se recalcula todo
//     (son ~20 s para 200 carpetas, 0 llamadas a API).
//
// ESTADOS (`estado`):
//   existe            la carpeta ya es un club del sitio (regla de carpetas-clubes.mjs). No hay alta.
//   listo-para-alta   sin ninguna pregunta abierta (las que Claude resolvió con cita verificada cuentan
//                     como resueltas) y sin pendientes que bloqueen. `alta-club.mjs --escribir` puede ir.
//   con-preguntas     queda al menos una pregunta de criterio abierta (lista en `preguntas`).
//   faltan-datos      no hay `.md` para analizar (falta transcribir), o falta un dato que ningún
//                     criterio resuelve y sin el cual la carga del primer año no puede hacerse: el tipo
//                     de cambio (moneda sin serie en tools/fx-reference/ ni FX_CLOSE para ese cierre).
//                     El resto de los `pendiente` (brandColor, liga en null, nombre legal incompleto) NO
//                     bloquea: se escriben con el valor honesto de "nadie lo miró" y audit.js los cuenta.
// ============================================================================

import { readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = resolve(import.meta.dirname, '..');
export const REGISTRO = resolve(ROOT, 'Admin', 'altas-club.jsonl');
export const ESTADOS = ['existe', 'listo-para-alta', 'con-preguntas', 'faltan-datos'];

const sha1 = (s) => createHash('sha1').update(s).digest('hex');
const cacheSha = new Map();
export function sha1Archivo(rel) {
  if (cacheSha.has(rel)) return cacheSha.get(rel);
  const p = resolve(ROOT, rel);
  const h = existsSync(p) ? sha1(readFileSync(p)) : 'ausente';
  cacheSha.set(rel, h);
  return h;
}
// entradas: { archivos: [rutas relativas], extra: {cualquier cosa serializable} } -> { huella, detalle }
export function huellaEntradas({ archivos, extra = {} }) {
  const detalle = Object.fromEntries([...new Set(archivos)].sort().map((a) => [a, sha1Archivo(a)]));
  return { huella: sha1(JSON.stringify({ detalle, extra })), detalle };
}

export function leerRegistro() {
  if (!existsSync(REGISTRO)) return new Map();
  const m = new Map();
  for (const l of readFileSync(REGISTRO, 'utf8').split('\n')) {
    if (!l.trim()) continue;
    try { const e = JSON.parse(l); m.set(e.carpeta, e); } catch { /* línea rota: se ignora y se reescribe */ }
  }
  return m;
}

// Reemplaza las líneas de estas carpetas y deja las demás como están. Lee el archivo del disco JUSTO
// antes de escribir (no el que se leyó al arrancar): si otra sesión escribió otras carpetas mientras
// tanto, no se pierden. Escritura atómica (archivo temporal + rename).
export function guardarEnRegistro(entradas) {
  const m = leerRegistro();
  for (const e of entradas) m.set(e.carpeta, e);
  const lineas = [...m.values()].sort((a, b) => a.carpeta.localeCompare(b.carpeta)).map((e) => JSON.stringify(e));
  const tmp = REGISTRO + '.tmp';
  writeFileSync(tmp, lineas.join('\n') + '\n');
  renameSync(tmp, REGISTRO);
}

// Para pipeline.mjs --resumen (y alta-club.mjs --resumen): conteo por estado + los listos.
// Devuelve { total, porEstado: {estado: n}, listos: [{carpeta, clubId, documento}], preguntasPorCampo: {campo: n},
//            resueltasPorClaude: n, fecha: la más reciente }.
export function resumenAltas() {
  const m = leerRegistro();
  const porEstado = Object.fromEntries(ESTADOS.map((e) => [e, 0]));
  const preguntasPorCampo = {}; let resueltasPorClaude = 0; let fecha = null;
  const listos = [];
  for (const e of m.values()) {
    porEstado[e.estado] = (porEstado[e.estado] || 0) + 1;
    for (const p of e.preguntas || []) preguntasPorCampo[p.campo] = (preguntasPorCampo[p.campo] || 0) + 1;
    resueltasPorClaude += (e.resueltas || []).length;
    if (e.estado === 'listo-para-alta') listos.push({ carpeta: e.carpeta, clubId: e.clubId, documento: e.documento });
    if (!fecha || e.fecha > fecha) fecha = e.fecha;
  }
  return { total: m.size, porEstado, listos, preguntasPorCampo, resueltasPorClaude, fecha };
}
