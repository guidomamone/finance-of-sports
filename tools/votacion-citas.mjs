#!/usr/bin/env node
// ============================================================================
// tools/votacion-citas.mjs — verifica las citas de los votos de una votación de criterios (skill votacion-de-criterios, sección 2: «sin esa cita, el precedente no suma»)
//
// Una cita es { ref, texto }: `ref` es `ruta/del/archivo.md:123` (o `:123-130`) o `club-id@2023` (el ejercicio de data/<país>/<club>.json) y `texto` es un fragmento literal de esa línea
// o de ese ejercicio. Se verifica que el archivo exista dentro del repo, que la línea exista y que contenga el texto (sin mayúsculas ni espacios de más), o que el ejercicio exista y lo contenga.
// Un voto cuyo precedente no se verifica no suma: lo cuenta `votacion-contar.mjs`.
//
// USO: node tools/votacion-citas.mjs <voto.json …>     lista cada cita de cada voto con ✓ o ✗ y el motivo; sale con 1 si alguna falla
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { rutaData } from './data-clubes.js';

const ROOT = resolve(import.meta.dirname, '..');
const norm = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
export const TEXTO_MIN = 6; // un fragmento más corto que esto cita cualquier cosa

export function verificarCita(cita, raiz = ROOT) {
  if (!cita || typeof cita !== 'object' || !cita.ref) return { ok: false, motivo: 'la cita no trae `ref`' };
  const texto = norm(cita.texto);
  if (texto.length < TEXTO_MIN) return { ok: false, motivo: `la cita no trae \`texto\` (el fragmento literal, ${TEXTO_MIN} caracteres o más)` };
  const club = /^([a-z0-9-]+-[a-z]{2})@(\d{4})$/.exec(cita.ref);
  if (club) {
    let json; try { json = rutaData(club[1]).replace(/-data\.js$/, '.json'); } catch { return { ok: false, motivo: `no hay un club «${club[1]}»` }; }
    const abs = resolve(raiz, json);
    if (!existsSync(abs)) return { ok: false, motivo: `no existe ${json}` };
    const d = JSON.parse(readFileSync(abs, 'utf8'));
    const anios = (d.years || []).filter((y) => Number(y.fiscal_year) === Number(club[2]));
    if (!anios.length) return { ok: false, motivo: `${club[1]} no tiene el ejercicio ${club[2]}` };
    return norm(JSON.stringify(anios)).includes(texto) ? { ok: true } : { ok: false, motivo: `el ejercicio ${club[2]} de ${club[1]} no contiene «${cita.texto}»` };
  }
  const m = /^(.+?):(\d+)(?:-(\d+))?$/.exec(cita.ref);
  if (!m) return { ok: false, motivo: `la \`ref\` «${cita.ref}» no es ruta:línea ni club-id@año` };
  const abs = resolve(raiz, m[1]);
  if (relative(raiz, abs).startsWith('..')) return { ok: false, motivo: 'la ruta sale del repo' };
  if (!existsSync(abs)) return { ok: false, motivo: `no existe ${m[1]}` };
  const L = readFileSync(abs, 'utf8').replace(/\n$/, '').split('\n');
  const desde = Number(m[2]), hasta = Number(m[3] || m[2]);
  if (desde < 1 || hasta > L.length || hasta < desde) return { ok: false, motivo: `${m[1]} tiene ${L.length} líneas y la cita pide ${m[2]}${m[3] ? `-${m[3]}` : ''}` };
  return norm(L.slice(desde - 1, hasta).join(' ')).includes(texto) ? { ok: true } : { ok: false, motivo: `${m[1]}:${m[2]}${m[3] ? `-${m[3]}` : ''} no contiene «${cita.texto}»` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const archivos = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (!archivos.length) { console.error('Uso: node tools/votacion-citas.mjs <voto.json …>'); process.exit(1); }
  let mal = 0;
  for (const f of archivos) {
    const v = JSON.parse(readFileSync(resolve(f), 'utf8'));
    console.log(`${f} (voto ${v.opcion})`);
    for (const [k, c] of Object.entries(v.criterios || {})) { if (!c?.cita) continue; const r = verificarCita(c.cita); if (!r.ok) mal++; console.log(`  criterio ${k}: ${r.ok ? '✓' : '✗'} ${c.cita.ref}${r.ok ? '' : ` — ${r.motivo}`}`); }
  }
  process.exit(mal ? 1 : 0);
}
