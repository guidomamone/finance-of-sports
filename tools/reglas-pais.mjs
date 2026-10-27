#!/usr/bin/env node
// ============================================================================
// tools/reglas-pais.mjs — saca de Admin/CONVENCIONES-DATOS.md las reglas que solo valen para un país y las pone en Admin/paises/<iso>.md.
//
// POR QUÉ. Las reglas generales (cómo se carga un dato) y las de un país (un balance turco, el intangible belga, los estados de SIIS de Colombia) vivían en el mismo archivo: cada sesión
// leía las de países que no estaba tocando. Una regla es de un país cuando su TÍTULO nombra un país (su nombre o su gentilicio) fuera del paréntesis del caso («(votación 3 a 0, Silkeborg y Viborg 2025)»
// es el caso que la disparó, no el alcance). `paisDeTitulo()` es la misma cuenta que usan el aviso `regla-de-pais-en-doc-general` del audit y el hook de pre-tool.
//
// USO:   node tools/reglas-pais.mjs               lista qué secciones van a qué país (no escribe)
//        node tools/reglas-pais.mjs --escribir    las mueve: crea o completa Admin/paises/<iso>.md y las saca de CONVENCIONES-DATOS.md
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
// iso -> [nombre del país, expresión con su nombre y su gentilicio]
export const PAISES = {
  co: ['Colombia', 'colombia|colombian'], tr: ['Turquía', 'turc|turquía|turquia'], be: ['Bélgica', 'belga|bélgica|belgica'], de: ['Alemania', 'alem[aá]n|alemana|alemania'], dk: ['Dinamarca', 'dan[eé]s|danesa|dinamarca'],
  gb: ['Reino Unido', 'ingl[eé]s|inglesa|inglaterra|escoc[eé]s|escocia|brit[aá]nic|gales|gal[eé]s'], es: ['España', 'espa[ñn]ol|españa'], it: ['Italia', 'italian|italia'], pt: ['Portugal', 'portugu[eé]s|portugal'], br: ['Brasil', 'brasile[ñn]|brasil'],
  ar: ['Argentina', 'argentin'], nl: ['Países Bajos', 'neerland|holand|pa[ií]ses bajos'], fr: ['Francia', 'franc[eé]s|francia'], gr: ['Grecia', 'griego|grecia'], no: ['Noruega', 'noruego|noruega'], se: ['Suecia', 'sueco|suecia'],
  ch: ['Suiza', 'suizo|suiza'], at: ['Austria', 'austr[ií]a'], cl: ['Chile', 'chileno|chile\\b'], mx: ['México', 'mexican|m[eé]xico'], jp: ['Japón', 'japon[eé]s|jap[oó]n'], ee: ['Estonia', 'estoni'], ru: ['Rusia', 'ruso|rusia'], ua: ['Ucrania', 'ucrani'],
  cz: ['Chequia', 'checo|chequia|rep[uú]blica checa'], hr: ['Croacia', 'croata|croacia'], cy: ['Chipre', 'chipriota|chipre'], pe: ['Perú', 'peruano|per[uú]\\b'], uy: ['Uruguay', 'uruguay'], py: ['Paraguay', 'paraguay'], ec: ['Ecuador', 'ecuator'],
  ve: ['Venezuela', 'venezola'], us: ['Estados Unidos', 'estadounidens|estados unidos'],
};
const norm = (s) => s.toLowerCase();

// El país al que pertenece una regla por su título (sin el paréntesis final del caso), o null si es general.
export function paisDeTitulo(titulo) {
  const t = norm(String(titulo).replace(/^\s*(?:##\s+)?REGLA(?:\s*\([^)]*\))?:\s*/i, '').replace(/\s*\([^()]*\)\s*$/, ''));
  for (const [iso, [, re]] of Object.entries(PAISES)) if (new RegExp(`(?:^|[^a-záéíóúñ])(?:${re})`, 'i').test(t)) return iso;
  return null;
}

// Las secciones `## ...` de un texto: [{ ini, fin, titulo }] sobre el arreglo de líneas (fin exclusivo).
export function secciones(L) {
  const hs = L.map((l, i) => (/^## /.test(l) ? i : -1)).filter((i) => i >= 0);
  return hs.map((ini, k) => ({ ini, fin: k + 1 < hs.length ? hs[k + 1] : L.length, titulo: L[ini] }));
}

// LOS DOCUMENTOS GENERALES: qué títulos miran (CONVENCIONES-DATOS: los `## REGLA:`; ESTADO y PIPELINE: cualquier `##` o `###`). Un título que nombra un país y es general (un formato, un deporte) se acepta con su motivo
// en tools/titulos-pais-aceptados.json ({ "<documento>": { "<título sin #>": "<motivo>" } }). Lo usan el CLI de abajo (el aviso `regla-de-pais-en-doc-general` de audit.js) y el hook de pre-tool.
export const DOCS_GENERALES = { 'Admin/CONVENCIONES-DATOS.md': /^## REGLA/, 'Admin/ESTADO.md': /^#{2,3} /, 'Admin/PIPELINE.md': /^#{2,3} / };
const aceptados = () => { try { return JSON.parse(readFileSync(join(ROOT, 'tools/titulos-pais-aceptados.json'), 'utf8')); } catch { return {}; } };
const titulo = (l) => l.replace(/^#+\s+/, '').trim();
export function titulosConPais(doc, lineas) {
  const ok = aceptados()[doc] || {};
  return lineas.map((l, i) => ({ l, linea: i + 1 })).filter((x) => DOCS_GENERALES[doc].test(x.l) && !(titulo(x.l) in ok)).map((x) => ({ ...x, iso: paisDeTitulo(x.l) })).filter((x) => x.iso);
}
// Para el hook: los títulos con país que un Edit/Write AGREGA a un documento general (los que ya están en el archivo no cuentan: es una edición de texto, no una sección nueva).
export function nuevosTitulosConPais(ruta, texto) {
  const doc = Object.keys(DOCS_GENERALES).find((d) => String(ruta).endsWith(`/${d}`)); if (!doc) return [];
  let hoy = ''; try { hoy = readFileSync(join(ROOT, doc), 'utf8'); } catch { /* sin archivo */ }
  const ya = new Set(hoy.split('\n').map(titulo));
  return titulosConPais(doc, String(texto).split('\n')).filter((x) => !ya.has(titulo(x.l))).map((x) => ({ ...x, doc }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const ruta = join(ROOT, 'Admin/CONVENCIONES-DATOS.md'); const L = readFileSync(ruta, 'utf8').split('\n');
  const otros = Object.keys(DOCS_GENERALES).filter((d) => d !== 'Admin/CONVENCIONES-DATOS.md').flatMap((d) => titulosConPais(d, readFileSync(join(ROOT, d), 'utf8').split('\n')).map((x) => ({ ...x, doc: d })));
  const mover = secciones(L).filter((s) => /^## REGLA/.test(s.titulo)).map((s) => ({ ...s, iso: paisDeTitulo(s.titulo) })).filter((s) => s.iso);
  for (const x of otros) console.log(`${x.iso} · L${x.linea} · ${x.doc.split('/').pop()} · ${titulo(x.l).slice(0, 100)} (si el título es general, tools/titulos-pais-aceptados.json con su motivo; si no, a Admin/paises/${x.iso}.md)`);
  if (!mover.length) { console.log('Ninguna regla de CONVENCIONES-DATOS.md nombra un país en su título.'); process.exit(0); }
  for (const s of mover) console.log(`${s.iso} · L${s.ini + 1}-${s.fin} · ${s.titulo.slice(0, 110)}`);
  if (!process.argv.includes('--escribir')) { console.log(`\n${mover.length} regla(s) a Admin/paises/. Ensayo: no se escribió nada (--escribir).`); process.exit(0); }
  mkdirSync(join(ROOT, 'Admin/paises'), { recursive: true });
  for (const iso of [...new Set(mover.map((s) => s.iso))]) {
    const destino = join(ROOT, 'Admin/paises', `${iso}.md`); const nombre = PAISES[iso][0];
    const cuerpo = mover.filter((s) => s.iso === iso).map((s) => L.slice(s.ini, s.fin).join('\n').replace(/\n+$/, '')).join('\n\n');
    const previo = existsSync(destino) ? readFileSync(destino, 'utf8').replace(/\n+$/, '') : `<!-- md: las reglas de datos que solo valen para ${nombre} (el mismo formato que CONVENCIONES-DATOS.md) | leer: al cargar o corregir un club de ${nombre} -->\n# Reglas de datos de ${nombre}`;
    writeFileSync(destino, `${previo}\n\n${cuerpo}\n`);
  }
  const salen = new Set(mover.flatMap((s) => Array.from({ length: s.fin - s.ini }, (_, i) => s.ini + i)));
  writeFileSync(ruta, L.filter((_, i) => !salen.has(i)).join('\n'));
  console.log(`\nMovidas ${mover.length} regla(s). Ahora: node tools/reglas-categoria.mjs, node tools/indice-md.mjs --escribir y node tools/audit.js.`);
}
