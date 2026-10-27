#!/usr/bin/env node
// ============================================================================
// tools/reglas-categoria.mjs — Las REGLAS DE CATEGORÍA que salen de una votación o de una decisión de Guido (`## REGLA:` de
// Admin/CONVENCIONES-DATOS.md) tienen que llegarles a Jev y a Claude, que solo veían ejemplos ya cargados y categorias-aprendidas.jsonl.
//
// LA CONVENCIÓN (dos líneas dentro de la sección `## REGLA:` de la regla, al final, una por cada cosa que la regla decide):
//   CATEGORÍA (prompt): <una frase: qué rubros y a qué categoría>       va al prompt de categorizar-claude.mjs (b), de todos los deportes
//   CATEGORÍA (prompt, rugby): <frase> solo al prompt de ese deporte (id de SPORTS en data/leagues.js)
// Todo id de categoría (con guion bajo) que nombra la frase tiene que ser una subcategoría del deporte de la regla, o de TODOS los deportes activos si no lleva deporte
// (más las genéricas del 248 y las claves financieras del JSON, que no son subcategorías). Un id de un solo deporte en una regla de todos hace que el prompt de otro
// deporte le pida una categoría que no existe: `node tools/reglas-categoria.mjs` lo marca y sale con código 1.
//   EJEMPLO-CATEGORÍA: <club-id> | revenue|expense | <etiqueta tal cual> | <categoría>     un caso real; se registra como ejemplo (a)
// (a) `--escribir` agrega cada EJEMPLO a Admin/registros/categorias-aprendidas.jsonl (confianza 1, modelo `guido`, motivo con el título de la regla), una
// sola vez. Lo aprendido se usa como precedente de ESE club y como ejemplo para Jev y Claude de los demás; lo cargado en el sitio gana sobre lo aprendido
// (lineasAprendidas), así que ningún año cargado cambia.
// (b) categorizar-claude.mjs lee las líneas `CATEGORÍA (prompt)` con `reglasParaPrompt()` y las pone en el prompt del sistema.
//
// USO:   node tools/reglas-categoria.mjs              valida (club del sitio, categoría, lado) y dice qué falta registrar; código 1 si hay errores
//        node tools/reglas-categoria.mjs --escribir   registra los ejemplos que faltan en categorias-aprendidas.jsonl
// ============================================================================
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { categoriasDeDeporte, deporteDeClub, deportes, deportesActivos, genericasIds } from './deporte-club.mjs'; // la regla puede ser de un deporte
import { docsDeReglas, DOC_GENERAL } from './docs-reglas.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const DOC = DOC_GENERAL;
const APRENDIDAS = resolve(ROOT, 'Admin', 'registros', 'categorias-aprendidas.jsonl');

// Las reglas de todos los documentos de tools/docs-reglas.mjs (CONVENCIONES-DATOS.md y Admin/paises/<iso>.md). `archivo` dice de cuál es cada una; `donde(x)` arma «L12» o «co.md L12» para un mensaje.
export const donde = (x) => `${x.archivo && x.archivo !== DOC_GENERAL ? `${x.archivo.split('/').pop()} ` : ''}L${x.linea}`;
export function leerReglasCategoria() {
  const reglas = []; let actual = null;
  for (const archivo of docsDeReglas()) {
    actual = null;
    for (const [i, linea] of readFileSync(resolve(ROOT, archivo), 'utf8').split('\n').entries()) {
      const h = linea.match(/^##\s+REGLA:\s*(.+)$/);
      if (h) { actual = { titulo: h[1].trim(), archivo, prompt: [], promptItems: [], notas: [], ejemplos: [] }; reglas.push(actual); continue; }
      if (/^##\s/.test(linea)) { actual = null; continue; }
      if (!actual) continue;
      const p = linea.match(/^CATEGOR[ÍI]A \(prompt(?:,\s*([^)\s]+))?\):\s*(.+)$/);
      if (p) { actual.prompt.push(p[2].trim()); actual.promptItems.push({ texto: p[2].trim(), deporte: p[1] || null, linea: i + 1, archivo }); continue; }
      const n = linea.match(/^NOTA-CATEGOR[ÍI]A \((\w\w)\):\s*([^|]+)\|([^|]+)\|\s*([a-z_]+)\s*$/);
      if (n) { actual.notas.push({ pais: n[1], nota: n[2].trim(), concepto: n[3].trim(), categoria: n[4], linea: i + 1, archivo }); continue; }
      const e = linea.match(/^EJEMPLO-CATEGOR[ÍI]A:\s*(.+)$/);
      if (e) { const [club, lado, etiqueta, categoria] = e[1].split('|').map((x) => x.trim()); actual.ejemplos.push({ club, lado, etiqueta, categoria, linea: i + 1, archivo }); }
    }
  }
  return reglas;
}

// LA REGLA POR NOTA (`NOTA-CATEGORÍA (co): <nota> | <concepto> | <categoría>`, nota = ventas | administración | cualquiera): la categoría de una fila de GASTO que se decide por la
// nota que la abre y por qué concepto es, no por su rótulo suelto. Gana sobre el precedente y sobre Jev (categorizar-claude-listos.mjs y catDe de cargar-categorias.mjs la
// llaman antes); una respuesta de la cola o un ajuste manual de esa fila siguen ganando. La nota sale del renglón que la fila desglosa (`padre`, padreDe) o, si no, de la marca
// «(Gastos de ventas)» de su etiqueta; si no se sabe cuál es (o son las dos), la regla no decide. Los conceptos son el vocabulario de las etiquetas (acá), la decisión es de la regla (el doc).
const CONCEPTOS = { personal: /^(?:(?:gastos?|costos?)\s+)?(?:de(?:l)?\s+)?personal\b/, viaje: /^(?:(?:otros\s+)?gastos?\s+)?(?:de\s+)?viajes?\b/, diversos: /^(?:gastos?\s+)?divers[oa]s\b/ };
const plano = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
let porNota = null; // las reglas leídas una vez por proceso
export function notaDeFila(padre, label) {
  const tipo = (t) => { const a = /administraci|administrativ/.test(t); const v = /gastos? de venta|deportiv|equipo (?:de futbol|profesional)/.test(t); return a === v ? null : a ? 'administración' : 'ventas'; };
  return tipo(plano(padre)) || tipo(plano((String(label).match(/\(([^()]*(?:venta|administraci)[^()]*)\)\s*$/) || [])[1]));
}
export function reglaDeNota({ clubId, lado, label, padre }) {
  if (lado !== 'expense' || !clubId) return null; const pais = String(clubId).split('-').pop();
  const concepto = Object.keys(CONCEPTOS).find((c) => CONCEPTOS[c].test(plano(label).replace(/(?:\s*\([^()]*\))+\s*$/, '').trim())); if (!concepto) return null;
  const nota = notaDeFila(padre, label);
  porNota ??= leerReglasCategoria();
  for (const r of porNota) for (const x of r.notas) if (x.pais === pais && x.concepto === concepto && (x.nota === 'cualquiera' || x.nota === nota)) return { cat: x.categoria, titulo: r.titulo, linea: x.linea, nota, concepto };
  return null;
}

// Las frases para el prompt de categorizar-claude.mjs (solo texto: no importa nada del categorizador, que importa esto).
// `deporte`: solo las reglas de todos los deportes y las de ese deporte (sin argumento: 'futbol', como era cuando todo era fútbol).
export function reglasParaPrompt(deporte = 'futbol') {
  return leerReglasCategoria().flatMap((r) => r.promptItems.filter((x) => !x.deporte || x.deporte === deporte).map((x) => `- ${x.texto} (${r.titulo.replace(/\s*\(.*$/, '')})`));
}

// Las frases CATEGORÍA (prompt) contra los deportes dados (por defecto, los activos): una regla sin deporte tiene que ser válida en cada uno. El alta de un deporte nuevo
// (tools/catalogo-liga.mjs) la corre ANTES de activarlo, con el candidato agregado, y lista las reglas que quedarían inválidas. Devuelve { errores: [texto], reglas: [{ titulo, linea, deporte, texto, ok }] }.
export function validarReglasPrompt({ activos = deportesActivos() } = {}) {
  const reglas = leerReglasCategoria(); const errores = []; const detalle = [];
  // las categorías válidas son las de la taxonomía del deporte (data/category-map.js, SPORT_TAXONOMIES); no se importa categorizar-claude.mjs: él importa este archivo
  // claves que una frase puede nombrar sin ser subcategorías de un deporte: las genéricas del 248 y las financieras del JSON
  const NO_SUBCATEGORIAS = new Set([...genericasIds(), 'profit_on_player_sales', 'asset_sales', 'net_interest', 'gross_debt', 'staff_cost', 'no_es_rubro']);
  for (const r of reglas) for (const x of r.promptItems) {
    const q = `${donde(x)} (${r.titulo.slice(0, 50)})`; const antes = errores.length;
    if (x.deporte && !deportes().some((d) => d.id === x.deporte)) { errores.push(`${q}: el deporte «${x.deporte}» no es un id de SPORTS en data/leagues.js`); detalle.push({ titulo: r.titulo, linea: x.linea, deporte: x.deporte, texto: x.texto, ok: false }); continue; }
    const ids = [...new Set(x.texto.match(/\b[a-z]+(?:_[a-z]+)+\b/g) || [])].filter((i) => !NO_SUBCATEGORIAS.has(i));
    const deDeporte = x.deporte ? [x.deporte] : activos;
    for (const id of ids) for (const d of deDeporte) {
      const t = categoriasDeDeporte(d);
      if (!t) errores.push(`${q}: nombra «${id}» y el deporte «${d}» no tiene taxonomía en category-map.js`);
      else if (!t.todas.has(id)) errores.push(`${q}: «${id}» no es una categoría de ${d}${x.deporte ? '' : ' (la regla es de todos los deportes activos: marcala con CATEGORÍA (prompt, <deporte>) o sacá el id de la frase)'}`);
    }
    detalle.push({ titulo: r.titulo, linea: x.linea, deporte: x.deporte, texto: x.texto, ok: errores.length === antes });
  }
  return { errores, reglas: detalle };
}

// LO CARGADO CONTRA LA REGLA POR NOTA: las líneas de gastos de data/<país>/*.json que la regla de su país manda a otra categoría, con la nota de cada fila (padres-filas.mjs).
// `--cargadas` las lista, una por renglón («club año | etiqueta | nota | actual -> regla»); el chequeo `regla-nota-contradicha` de audit.js lo llama.
export async function cargadasContradichas() {
  const { padreEnClub } = await import('./padres-filas.mjs'); const { readdirSync } = await import('node:fs'); const out = [];
  porNota ??= leerReglasCategoria();
  for (const pais of new Set(porNota.flatMap((r) => r.notas.map((x) => x.pais)))) {
    const dir = resolve(ROOT, 'data', pais); if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => /-[a-z]{2}\.json$/.test(x))) {
      const id = f.replace('.json', '');
      for (const y of JSON.parse(readFileSync(resolve(dir, f), 'utf8')).years || []) for (const l of y.expenses || []) {
        const g = reglaDeNota({ clubId: id, lado: 'expense', label: l.label, padre: padreEnClub(id, String(y.fiscal_year), 'expense', l.label) });
        if (g && g.cat !== l.subcategory) out.push(`${id} ${y.fiscal_year} | ${l.label} | ${g.nota || 'cualquiera'} | ${l.subcategory} -> ${g.cat}`);
      }
    }
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}` && process.argv.includes('--cargadas')) {
  const l = await cargadasContradichas(); console.log(l.join('\n')); console.log(`${l.length} línea(s) cargadas que contradicen la regla por nota.`);
} else if (import.meta.url === `file://${process.argv[1]}`) {
  const reglas = leerReglasCategoria(); const errores = validarReglasPrompt().errores;
  const clubs = readFileSync(resolve(ROOT, 'data', 'clubs.js'), 'utf8');
  const ya = existsSync(APRENDIDAS) ? readFileSync(APRENDIDAS, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : [];
  const faltan = [];
  for (const r of reglas) for (const x of r.notas) { // NOTA-CATEGORÍA: nota, concepto y categoría de gasto válidos
    const q = `${donde(x)} (${r.titulo.slice(0, 50)})`; const t = categoriasDeDeporte('futbol');
    if (!['ventas', 'administración', 'cualquiera'].includes(x.nota)) errores.push(`${q}: la nota «${x.nota}» no es ventas | administración | cualquiera`);
    if (!CONCEPTOS[x.concepto]) errores.push(`${q}: el concepto «${x.concepto}» no es ${Object.keys(CONCEPTOS).join(' | ')}`);
    if (!t?.expense.has(x.categoria)) errores.push(`${q}: «${x.categoria}» no es una categoría de gasto de fútbol`);
  }
  for (const r of reglas) for (const e of r.ejemplos) {
    const q = `${donde(e)} (${r.titulo.slice(0, 50)})`;
    if (!e.club || !e.lado || !e.etiqueta || !e.categoria) { errores.push(`${q}: el ejemplo necesita club | lado | etiqueta | categoría`); continue; }
    if (!clubs.includes(`id:'${e.club}'`)) errores.push(`${q}: el club «${e.club}» no está en data/clubs.js`);
    if (!['revenue', 'expense'].includes(e.lado)) errores.push(`${q}: lado «${e.lado}» (revenue | expense)`);
    const dClub = deporteDeClub(e.club); const tx = dClub ? categoriasDeDeporte(dClub) : null; // el ejemplo se valida contra el deporte del club del ejemplo
    const ladoDe = (c) => (tx?.revenue.has(c) ? 'revenue' : tx?.expense.has(c) ? 'expense' : null);
    if (dClub && !tx) errores.push(`${q}: el deporte «${dClub}» de ${e.club} no tiene taxonomía en category-map.js`);
    else if (tx && !ladoDe(e.categoria)) errores.push(`${q}: la categoría «${e.categoria}» no existe en la taxonomía de ${dClub} (category-map.js)`);
    else if (tx && ladoDe(e.categoria) !== e.lado) errores.push(`${q}: «${e.categoria}» es de ${ladoDe(e.categoria)} y el ejemplo dice ${e.lado}`);
    if (!ya.some((x) => x.club === e.club && x.lado === e.lado && x.label === e.etiqueta && x.categoria === e.categoria && /^regla de votación/.test(x.motivo || ''))) faltan.push({ r, e });
  }
  console.log(`${reglas.length} reglas en ${docsDeReglas().map((f) => f.split('/').pop()).join(' + ')}; ${reglas.filter((r) => r.prompt.length).length} con frase para el prompt; ${reglas.reduce((a, r) => a + r.ejemplos.length, 0)} ejemplos; ${faltan.length} sin registrar en categorias-aprendidas.jsonl.`);
  for (const m of errores) console.log(`  ERROR ${m}`);
  if (errores.length) process.exit(1);
  if (process.argv.includes('--escribir') && faltan.length) {
    appendFileSync(APRENDIDAS, faltan.map(({ r, e }) => JSON.stringify({ ts: new Date().toISOString(), club: e.club, year: null, lado: e.lado, label: e.etiqueta, padre: null, glosa: null, categoria: e.categoria, confianza: 1, motivo: `regla de votación: ${r.titulo} (Admin/CONVENCIONES-DATOS.md)`, jevDecia: null, jevConf: null, modelo: 'guido', md: null })).join('\n') + '\n');
    console.log(`registrados ${faltan.length} ejemplos.`);
  } else for (const { r, e } of faltan) console.log(`  falta registrar: ${e.club} · ${e.lado} · «${e.etiqueta}» -> ${e.categoria}`);
}
