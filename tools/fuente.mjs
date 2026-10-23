#!/usr/bin/env node
// ============================================================================
// tools/fuente.mjs — ver y editar las FUENTES de un club.
//
// POR QUÉ. cargar.mjs escribe la fuente de un año con un título genérico («Bath Rugby Limited — bath-rugby-full-accounts-2020-21 (ejercicio 2021)»), sin url y sin nota pública.
// Para ponerle el título del documento, el link del registro y una nota pública (CVC, fair value, redondeo, gasto por función) no había tool: se editaba a mano el JSON del club y
// después había que correr generar-data y subir ASSET_V (ahora: node tools/publicar.mjs). Esto edita el JSON por la vía de siempre (club-json.mjs: valida el esquema antes de escribir
// y regenera el data file).
//
// USO:
//   node tools/fuente.mjs <clubId>                                        lista sus fuentes (id, título, url, si tiene nota pública)
//   node tools/fuente.mjs <clubId> --propuesta                            para cada fuente sin url o con título genérico: el .md, un título y un link PROPUESTOS desde el documento (Companies House si el
//                                                                          número de registro está en el .md) y los ajustes manuales del documento (su motivo, de donde sale la nota pública). No escribe
//   node tools/fuente.mjs <clubId> <sourceId> [--titulo "..."] [--url "..."] [--nota "..."] [--escribir]
//                                                                          ensayo del cambio; con --escribir lo escribe. La nota pública la escribe quien conoce el caso: no se inventa
//   Después de --escribir: node tools/publicar.mjs (sube ASSET_V, regenera fuentes/ y club/, audita).
// ============================================================================
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { leerJsonClub, modificarClub } from './club-json.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2);
const flag = (n) => { const i = A.indexOf(n); return i >= 0 ? A[i + 1] : null; };
const pos = A.filter((a, i) => !a.startsWith('--') && !['--titulo', '--url', '--nota'].includes(A[i - 1]));
const [clubId, sourceId] = pos;
if (!clubId) { console.error('uso: node tools/fuente.mjs <clubId> [--propuesta | <sourceId> [--titulo "..."] [--url "..."] [--nota "..."] [--escribir]]'); process.exit(1); }
const j = leerJsonClub(clubId);
const fuentes = j.sources || [];

const slug = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const mdsDeClubes = () => { const out = []; (function walk(d) { for (const e of readdirSync(d)) { const f = join(d, e); statSync(f).isDirectory() ? walk(f) : f.endsWith('.md') && out.push(f); } })(resolve(ROOT, 'Clubes')); return out; };

if (!sourceId && !A.includes('--propuesta')) {
  for (const f of fuentes) console.log(`${f.id}\n   título: ${f.title}\n   url: ${f.url || '(sin url)'}\n   nota pública: ${f.public_note ? 'sí' : '(sin nota)'}`);
  process.exit(0);
}

if (!sourceId) { // --propuesta
  const mds = mdsDeClubes(); const ajustes = existsSync(resolve(ROOT, 'Admin/registros/ajustes-manuales.jsonl')) ? readFileSync(resolve(ROOT, 'Admin/registros/ajustes-manuales.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  for (const f of fuentes) {
    const generico = / — .+ \(ejercicio \d{4}\)$/.test(String(f.title)); if (f.url && !generico && f.public_note) continue;
    const resto = String(f.id).startsWith(`${clubId}-`) ? String(f.id).slice(clubId.length + 1) : null;
    // el id de la fuente es <clubId>-<el nombre del archivo sin el nombre del club>: el .md es el que TERMINA igual (y, si hay varios, el de la carpeta del club)
    const palabra = slug(j.club?.display_name || clubId).split('-')[0];
    const cand = resto ? mds.filter((m) => slug(m.split('/').pop().replace(/\.md$/, '')).endsWith(resto)) : [];
    const md = cand.length === 1 ? cand[0] : cand.find((m) => slug(m.split('/').slice(-2, -1)[0] || '').includes(palabra)) || null;
    console.log(`\n${f.id}\n   título actual: ${f.title}\n   url actual: ${f.url || '(sin url)'}`);
    if (!md) { console.log('   (no encontré su .md en Clubes/: el id no coincide con el nombre del archivo)'); continue; }
    const rel = md.replace(`${ROOT}/`, ''); const txt = readFileSync(md, 'utf8'); const cabeza = txt.split('\n').slice(0, 80).join('\n');
    const titulo = (cabeza.match(/^.*(?:Annual Report|Report and Financial Statements|Financial Statements|Estados Financieros|Jaarrekening|Bilancio)[^\n]*$/im) || [])[0];
    const reg = (txt.match(/(?:Registration number|Company (?:registration )?number|Companies House number)[:\s]*\(?\s*(\d{8})/i) || [])[1];
    console.log(`   .md: ${rel}`);
    if (titulo) console.log(`   título propuesto (de la portada): ${titulo.replace(/^[#\s*>|]+|[#\s*|]+$/g, '').trim()}`);
    if (reg) console.log(`   url propuesta (Companies House ${reg}): https://find-and-update.company-information.service.gov.uk/company/${reg}/filing-history`);
    const pdf = rel.replace(/\.md$/, '.pdf'); const aj = ajustes.filter((x) => x.pdf === pdf && !x.anulado && ['desglose', 'categoria', 'fila', 'incluye', 'confirmado', 'perimetro'].includes(x.campo));
    if (aj.length) { console.log('   ajustes manuales del documento (de acá sale la nota pública):'); for (const x of aj.slice(0, 8)) console.log(`     - ${x.campo}${x.etiqueta ? ` «${x.etiqueta}»` : ''}: ${String(x.motivo || '').slice(0, 160)}`); }
  }
  process.exit(0);
}

const f = fuentes.find((x) => x.id === sourceId);
if (!f) { console.error(`${clubId}: no tiene la fuente ${sourceId}. Fuentes: ${fuentes.map((x) => x.id).join(', ')}`); process.exit(1); }
const nuevo = { title: flag('--titulo') ?? f.title, url: flag('--url') ?? f.url ?? null, public_note: flag('--nota') ?? f.public_note ?? null };
if (nuevo.url && !/^https?:\/\//.test(nuevo.url)) { console.error(`--url tiene que empezar con http:// o https://`); process.exit(1); }
console.log(`${A.includes('--escribir') ? 'ESCRIBIR' : 'ENSAYO'} ${clubId} · ${sourceId}\n   título: ${f.title}\n        → ${nuevo.title}\n   url:    ${f.url || '(sin url)'}\n        → ${nuevo.url || '(sin url)'}\n   nota:   ${f.public_note || '(sin nota)'}\n        → ${nuevo.public_note || '(sin nota)'}`);
if (!A.includes('--escribir')) { console.log('Agregá --escribir para escribirlo.'); process.exit(0); }
const escritos = modificarClub(clubId, (c) => {
  const s = c.sources[sourceId]; if (!s) throw new Error(`no hay fuente ${sourceId}`);
  s.title = nuevo.title; if (nuevo.url) s.url = nuevo.url; else delete s.url; if (nuevo.public_note) s.publicNote = nuevo.public_note; else delete s.publicNote;
});
console.log(`Escrito (${[].concat(escritos || []).join(', ') || 'JSON y data file'}). Siguiente: node tools/publicar.mjs`);
