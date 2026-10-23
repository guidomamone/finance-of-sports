// ============================================================================
// tools/evidencia-club.mjs — leer y editar Admin/carga-clubes/<clubId>.md, la evidencia de carga de cada club.
//
// POR QUÉ: data/<país>/<club>-data.js se publica y NO lleva comentarios (Admin/CONVENCIONES-DATOS.md). Lo que los scripts del pipeline antes
// escribían como comentario al lado del dato (cabecera del año, nota de cada fila, ajustes manuales, caja y deuda, liga, marcas de
// "posiblemente dentro de otro rubro") va a este .md. Este módulo es el ÚNICO que lo edita, así el formato es uno solo para todos.
//
// EL FORMATO (el mismo que dejó tools/archivo/mover-comentarios-data.mjs):
//   # <clubId> — evidencia de carga
//   ## Cabecera
//   ## 2025                      <- un título por ejercicio, de más nuevo a más viejo
//   ### Ingresos / Gastos / Meta / Liga / ...   <- en el orden de SECCIONES
//   bloques ```text ... ``` (texto tal cual), opcionalmente con una línea _nota:_ arriba, y al final la tabla | Fila | Rubro | Nota |
//   ## Fuentes / ## Otros        <- después de los años
//
// LAS OPERACIONES (todas toman y devuelven el texto del .md; leer() y guardar() tocan el disco):
//   agregarTexto(md, anio, seccion, lineas)   un bloque nuevo al final del texto de esa sección (antes de la tabla). Crea el año y la
//                                             sección si no existen, en su lugar.
//   quitarLineas(md, anio, seccion, regexes)  saca, de los bloques de texto de esa sección, las líneas que matchean alguna regex. Un
//                                             bloque que queda vacío se va con su _nota:_. Lo escrito a mano no se toca: cada script
//                                             reconoce SUS líneas por cómo empiezan. anio = null: en todos los años.
//   ponerTabla(md, anio, seccion, filas)      reemplaza la tabla de filas de esa sección ([] la saca). filas: [{fila, rawLabel, nota}].
//   agregarCabecera(md, lineas, nota?)        un bloque nuevo al final de "## Cabecera" (lo del club entero: alta, color), con una
//                                             línea _nota:_ arriba si se pasa (ej. de qué archivo vino).
//   reemplazarTexto(md, viejo, nuevo)         un texto exacto por otro (el color del alta).
//   agregarSeccion(md, titulo, lineas, nota?) un bloque en una sección del club que no es de un año ("## Gestiones").
//   agregarFuente(md, sourceId, lineas, nota?) la nota interna de una fuente, en "## Fuentes" / "### <sourceId>"; textoDeFuente() la lee.
// Después de cada operación, una sección o un año que quedaron vacíos se borran.
// ============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const SECCIONES = ['Ingresos', 'Gastos', 'Meta', 'Liga', 'Presupuesto al lado del balance', 'Presupuesto financiero',
  'Presupuesto de inversiones', 'Supuestos del presupuesto'];
export const rutaRel = (id) => `Admin/carga-clubes/${id}.md`;
const ruta = (id) => resolve(ROOT, rutaRel(id));

export function esqueleto(id) {
  return `# ${id} — evidencia de carga\n\n`
    + `Lo que antes iba como comentario en el data file del club, \`data/<país>/${id}-data.js\` (la regla: \`Admin/CONVENCIONES-DATOS.md\`, "data/<país>/<club>-data.js NO LLEVA\n`
    + 'COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y meta. Las notas de cada fila van en una tabla con su número de\n'
    + 'fila (hay nombres de rubro repetidos en un mismo año).\n';
}
export function leer(id) { return existsSync(ruta(id)) ? readFileSync(ruta(id), 'utf8') : esqueleto(id); }
export function guardar(id, md) { mkdirSync(dirname(ruta(id)), { recursive: true }); writeFileSync(ruta(id), limpiar(md)); return rutaRel(id); }

// ---------------------------------------------------------------------------
const esAnio = (t) => /^## \d{4}\s*$/.test(t);
const finDe = (L, i, re) => { let j = i + 1; while (j < L.length && !re.test(L[j])) j++; return j; };
const RE_H2 = /^## /, RE_H2_H3 = /^##+ /;

// [ini, fin) del año (desde su "## ") o null; con crear, lo inserta en su lugar.
function rangoAnio(L, anio, crear) {
  const a = String(anio);
  let i = L.findIndex((t) => t.trim() === `## ${a}`);
  if (i < 0) {
    if (!crear) return null;
    // antes del primer año más viejo; si no hay, antes de "## Fuentes"/"## Otros"/"## (fuera…"; si no, al final
    let pos = L.findIndex((t) => esAnio(t) && Number(t.slice(3)) < Number(a));
    if (pos < 0) pos = L.findIndex((t) => /^## (Fuentes|Otros|\()/.test(t));
    if (pos < 0) pos = L.length;
    L.splice(pos, 0, `## ${a}`, '');
    i = pos;
  }
  return [i, finDe(L, i, RE_H2)];
}
// [ini, fin) de la sección dentro del año
function rangoSeccion(L, anio, seccion, crear) {
  const ra = rangoAnio(L, anio, crear); if (!ra) return null;
  let i = -1;
  for (let k = ra[0] + 1; k < ra[1]; k++) if (L[k].trim() === `### ${seccion}`) { i = k; break; }
  if (i < 0) {
    if (!crear) return null;
    const orden = SECCIONES.indexOf(seccion);
    let pos = ra[1];
    for (let k = ra[0] + 1; k < ra[1]; k++) {
      const m = /^### (.+?)\s*$/.exec(L[k]);
      if (m && SECCIONES.indexOf(m[1]) > orden) { pos = k; break; }
    }
    L.splice(pos, 0, `### ${seccion}`, '');
    i = pos;
  }
  return [i, finDe(L, i, RE_H2_H3)];
}
const fence = (lineas) => { const t = lineas.join('\n'); const f = /```/.test(t) ? '~~~' : '```'; return [`${f}text`, ...lineas, f]; };

export function agregarTexto(md, anio, seccion, lineas) {
  if (!lineas || !lineas.length) return md;
  const L = md.replace(/\n+$/, '').split('\n');
  const [i, f] = rangoSeccion(L, anio, seccion, true);
  let pos = f;
  for (let k = i + 1; k < f; k++) if (/^\| Fila \| Rubro \| Nota \|/.test(L[k])) { pos = k; break; }
  while (pos > i + 1 && L[pos - 1].trim() === '') pos--;
  L.splice(pos, 0, '', ...fence(lineas), '');
  return limpiar(L.join('\n'));
}

export function quitarLineas(md, anio, seccion, regexes) {
  const L = md.split('\n');
  const anios = anio == null ? L.filter(esAnio).map((t) => t.slice(3).trim()) : [String(anio)];
  for (const a of anios) {
    const r = rangoSeccion(L, a, seccion, false); if (!r) continue;
    const [i, f] = r;
    const nuevas = [];
    for (let k = i; k < f; k++) {
      const m = /^(```|~~~)text\s*$/.exec(L[k]);
      if (!m) { nuevas.push(L[k]); continue; }
      let j = k + 1; const dentro = [];
      while (j < f && L[j] !== m[1]) dentro.push(L[j++]);
      const quedan = dentro.filter((t) => !regexes.some((re) => re.test(t)));
      if (quedan.some((t) => t.trim() !== '')) nuevas.push(L[k], ...quedan, m[1]);
      else { // el bloque se vacía: se va con su _nota:_ (y el blanco entre los dos)
        while (nuevas.length && nuevas[nuevas.length - 1].trim() === '') nuevas.pop();
        if (nuevas.length && /^_.*:_\s*$/.test(nuevas[nuevas.length - 1])) nuevas.pop();
      }
      k = j;
    }
    L.splice(i, f - i, ...nuevas);
  }
  return limpiar(L.join('\n'));
}

export function ponerTabla(md, anio, seccion, filas) {
  const L = md.replace(/\n+$/, '').split('\n');
  const r = rangoSeccion(L, anio, seccion, filas.length > 0);
  if (!r) return md;
  const [i, f] = r;
  let t0 = -1; for (let k = i + 1; k < f; k++) if (/^\| Fila \| Rubro \| Nota \|/.test(L[k])) { t0 = k; break; }
  if (t0 >= 0) { let t1 = t0; while (t1 < f && L[t1].startsWith('|')) t1++; L.splice(t0, t1 - t0); }
  if (filas.length) {
    const celda = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    const tabla = ['| Fila | Rubro | Nota |', '|---|---|---|', ...filas.map((x) => `| ${x.fila} | ${celda(x.rawLabel)} | ${celda(x.nota)} |`)];
    const [, f2] = rangoSeccion(L, anio, seccion, false);
    let pos = f2; while (pos > i + 1 && L[pos - 1].trim() === '') pos--;
    L.splice(pos, 0, '', ...tabla, '');
  }
  return limpiar(L.join('\n'));
}

// "## Cabecera" (lo de todo el club: el alta, de dónde salió cada campo, el color): un bloque nuevo al final de esa sección. La crea, si no
// está, antes del primer "## ".
export function agregarCabecera(md, lineas, nota = null) {
  if (!lineas || !lineas.length) return md;
  const L = md.replace(/\n+$/, '').split('\n');
  let i = L.findIndex((t) => t.trim() === '## Cabecera');
  if (i < 0) { let pos = L.findIndex((t) => RE_H2.test(t)); if (pos < 0) pos = L.length; L.splice(pos, 0, '## Cabecera', ''); i = pos; }
  let pos = finDe(L, i, RE_H2); while (pos > i + 1 && L[pos - 1].trim() === '') pos--;
  L.splice(pos, 0, '', ...(nota ? [`_${nota}:_`, ''] : []), ...fence(lineas), '');
  return limpiar(L.join('\n'));
}
// Una sección del club que no es de un año (ej. "## Gestiones"): un bloque nuevo al final, con _nota:_ arriba si se pasa. La crea, si no
// está, después de los años y antes de "## Fuentes" / "## Otros".
export function agregarSeccion(md, titulo, lineas, nota = null) {
  if (!lineas || !lineas.length) return md;
  const L = md.replace(/\n+$/, '').split('\n');
  let i = L.findIndex((t) => t.trim() === `## ${titulo}`);
  if (i < 0) { let pos = L.findIndex((t) => /^## (Fuentes|Otros)\s*$/.test(t)); if (pos < 0) pos = L.length; L.splice(pos, 0, `## ${titulo}`, ''); i = pos; }
  let pos = finDe(L, i, RE_H2); while (pos > i + 1 && L[pos - 1].trim() === '') pos--;
  L.splice(pos, 0, '', ...(nota ? [`_${nota}:_`, ''] : []), ...fence(lineas), '');
  return limpiar(L.join('\n'));
}
// La nota interna de UNA fuente (lo que antes era `sources[id].note` en data/): un bloque al final de "### <sourceId>" dentro de
// "## Fuentes" (crea las dos si faltan; "## Fuentes" va después de los años y de "## Gestiones", antes de "## Otros").
export function agregarFuente(md, sourceId, lineas, nota = null) {
  if (!lineas || !lineas.length) return md;
  const L = md.replace(/\n+$/, '').split('\n');
  let i = L.findIndex((t) => t.trim() === '## Fuentes');
  if (i < 0) { let pos = L.findIndex((t) => /^## Otros\s*$/.test(t)); if (pos < 0) pos = L.length; L.splice(pos, 0, '## Fuentes', ''); i = pos; }
  const f = finDe(L, i, RE_H2);
  let j = -1; for (let k = i + 1; k < f; k++) if (L[k].trim() === `### ${sourceId}`) { j = k; break; }
  if (j < 0) { let pos = f; while (pos > i + 1 && L[pos - 1].trim() === '') pos--; L.splice(pos, 0, '', `### ${sourceId}`, ''); j = pos + 1; }
  let pos = finDe(L, j, RE_H2_H3); while (pos > j + 1 && L[pos - 1].trim() === '') pos--;
  L.splice(pos, 0, '', ...(nota ? [`_${nota}:_`, ''] : []), ...fence(lineas), '');
  return limpiar(L.join('\n'));
}
// El texto de "### <sourceId>" en "## Fuentes" (para quien antes leía `sources[id].note`), sin las marcas de bloque.
export function textoDeFuente(md, sourceId) {
  const L = md.split('\n');
  const j = L.findIndex((t) => t.trim() === `### ${sourceId}`); if (j < 0) return '';
  return L.slice(j + 1, finDe(L, j, RE_H2_H3)).filter((t) => !/^(```|~~~)/.test(t) && !/^_.*:_$/.test(t)).join(' ').replace(/\s+/g, ' ').trim();
}
// Para quien antes leía el TEXTO del data file (comentarios incluidos) buscando algo (la ruta de la transcripción, el perímetro):
//   textoFuenteCompleto(src)  el objeto de la fuente como JSON + su nota en la evidencia (lo que antes era JSON.stringify(src) con `note`)
//   cabeceraDe(clubId)        la "## Cabecera" de la evidencia (lo que antes eran las primeras líneas de comentario del data file)
export function textoFuenteCompleto(src) {
  if (!src) return '';
  return `${JSON.stringify(src)} ${src.clubId && src.id ? textoDeFuente(leer(src.clubId), src.id) : ''}`;
}
export function cabeceraDe(clubId) {
  const md = leer(clubId); const i = md.indexOf('\n## Cabecera'); if (i < 0) return '';
  const f = md.indexOf('\n## ', i + 5); return md.slice(i, f < 0 ? md.length : f);
}
// Reemplaza un texto exacto en la evidencia (ej. "brandColor AUSENTE a propósito" -> "brandColor #c8102e" al ponerle el color a un club).
export function reemplazarTexto(md, viejo, nuevo) { return md.includes(viejo) ? md.replace(viejo, nuevo) : md; }

// secciones y años vacíos fuera; nunca más de una línea en blanco seguida; un salto al final
function limpiar(md) {
  let L = md.split('\n');
  for (let cambio = true; cambio;) {
    cambio = false;
    for (let k = 0; k < L.length; k++) {
      const h3 = /^### /.test(L[k]), h2 = esAnio(L[k]);
      if (!h3 && !h2) continue;
      const f = finDe(L, k, h3 ? RE_H2_H3 : RE_H2);
      if (L.slice(k + 1, f).every((t) => t.trim() === '')) { L.splice(k, f - k); cambio = true; break; }
    }
  }
  // una línea en blanco antes de cada título (fuera de los bloques de texto, que van tal cual)
  const out = []; let enBloque = null;
  for (const t of L) {
    const f = /^(```|~~~)/.exec(t);
    if (f) enBloque = enBloque === null ? f[1] : (t.trim() === enBloque ? null : enBloque);
    else if (enBloque === null && /^#{1,3} /.test(t) && out.length && out[out.length - 1].trim() !== '') out.push('');
    out.push(t);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\n*$/, '\n');
}
