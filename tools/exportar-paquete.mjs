#!/usr/bin/env node
// ============================================================================
// tools/exportar-paquete.mjs — un Data Package de Frictionless Data (datapackage.json, perfil 2.0) que describe el conjunto
// de datos: título, licencia, fuentes, un recurso por club (el JSON del esquema de data/schema/club-v2.json), la tabla de la taxonomía de cada deporte
// y el diccionario de campos.
//
// Decisiones de Guido: (1) licencia CC BY-NC 4.0, con el enlace a terminos.html ("Licencia y reuso"); (2) las cotizaciones `market_approx`
// (ARS y CLP, 10 ejercicios) quedan, anotadas en `sources` con BCRA y SII y su restricción de uso comercial; (3) el paquete lleva SOLO lo financiero: los
// archivos del paquete no traen squad_transfers, results, titles ni extras (soloFinanciero() de tools/json-datos.mjs).
//
// SOLO LECTURA sobre data/ y js/. Escribe en una carpeta que no se publica (default Generados/paquete/): datapackage.json y datos-json/<país>/<id>.json.
// USO: node tools/exportar-paquete.mjs [--salida <carpeta>] [--fecha AAAA-MM-DD]
// ============================================================================
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { todosLosArchivos, leerClub, aJson, soloFinanciero, validar, categoriasDelSitio, referenciasExternas, CAMPOS as C } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const A = process.argv.slice(2); const flag = (f) => { const i = A.indexOf(f); return i >= 0 ? A[i + 1] : null; };
const salida = resolve(flag('--salida') || resolve(ROOT, 'Generados', 'paquete'));
const fecha = flag('--fecha') || new Date().toISOString().slice(0, 10);

// ---- el diccionario de campos: ruta en el JSON, nombre que tenía en data/*.js, tipo y qué es
const D = (ruta, tipo, desc, antes = null) => ({ path: ruta, type: tipo, description: desc, ...(antes ? { legacy_name: antes } : {}) });
const diccionario = [
  D('schema_version', 'string', 'Versión del esquema ("2.0"). Define el JSON Schema data/schema/club-v2.json.'),
  D('exported_at', 'date', 'Cuándo se generó este archivo (AAAA-MM-DD).'),
  D('unit.scale', 'integer', 'Todos los importes del archivo están expresados en millones de la moneda del club (1000000).'),
  D('club.id', 'string', 'Identificador del club en el sitio.', 'clubs.js id'),
  D('club.name', 'string', 'Nombre legal del club.', 'name'), D('club.display_name', 'string', 'Nombre corto.', 'displayName'),
  D('club.country', 'string', 'País (ISO 3166-1 alfa-2).', 'country'), D('club.reporting_currency', 'string', 'Moneda en que el club reporta (ISO 4217).', 'reportingCurrency'),
  D('club.fiscal_year_start', 'string', 'Día en que empieza el ejercicio (MM-DD).', 'fiscalYearStart'), D('club.sport', 'string', 'Deporte (football, rugby_union...).', 'sport'),
  D('club.taxonomy', 'string', 'Versión del mapa de subcategorías del deporte a categorías genéricas con que se derivó cada category (data/schema/taxonomy-<versión>.json).'),
  D('sources[]', 'object', 'Documento del que sale cada ejercicio: id, club_id, title, type, reliability, url, public_note, document (ruta del PDF de origen en el repositorio).', 'sources{}'),
  D('management[]', 'object', 'Gestiones (presidentes) del club con los años que cubren: id, name, first_year, last_year.', 'gestionesByClub'),
  D('members', 'number|null', 'Cantidad de socios.', 'memberCountByClub'),
  D('years[].fiscal_year', 'integer', 'Año del ejercicio (el año en que cierra).'), D('years[].period_end', 'date', 'Fecha de cierre del ejercicio.'),
  D('years[].currency', 'string', 'Moneda de los importes de ese ejercicio (ISO 4217).', 'fiscalYearMeta.currency'),
  D('years[].fx.ref', 'string', 'Referencia de la cotización usada, "MONEDA@fecha".', 'fxRef'), D('years[].fx.rate', 'number', 'Cotización explícita (solo cuando el ejercicio la fija).', 'fx'), D('years[].fx.source', 'string', 'De dónde sale esa cotización (document_close, manual, market_approx...).', 'fxSource'),
  D('years[].source_id', 'string', 'Id de la fuente en sources[].', 'sourceId'), D('years[].report_type', 'string', 'Tipo de documento (official_balance_sheet, official_budget...).', 'reportType'), D('years[].management_id', 'string|null', 'Id de la gestión en management[].', 'gestionId'),
  D('years[].revenue[]', 'object', 'Líneas de ingresos del ejercicio.', 'revenueLinesByYear'), D('years[].expenses[]', 'object', 'Líneas de gastos (importe negativo).', 'expenseLinesByYear'),
  D('years[].revenue[].label', 'string', 'Rótulo de la línea en el documento.', 'rawLabel'), D('years[].revenue[].category', 'string', 'Categoría genérica, la misma para cualquier deporte (media_rights, first_team_staff...). Se deriva de subcategory con la tabla de club.taxonomy; no se elige.'),
  D('years[].revenue[].subcategory', 'string', 'Categoría del deporte (para el fútbol: broadcasting, wages_squad...), común a todos los clubes de ese deporte.', 'normalizedCategory'),
  D('years[].revenue[].amount', 'number', 'Importe en millones de la moneda del ejercicio.', 'amountNative'), D('years[].revenue[].disclosure', 'string', 'Nivel de detalle de la fuente (aggregated, detailed...).', 'disclosureLevel'),
  D('years[].revenue[].items', 'array', 'Desglose de la línea: [rótulo, importe] o [rótulo, importe, subitems].', 'items'),
  ...Object.entries(C.FINANCIERO).map(([a, b]) => D(`years[].financial.${b}`, 'number|null', { net_interest: 'Resultado financiero neto.', tax: 'Impuesto a las ganancias.', profit_on_player_sales: 'Resultado por venta de jugadores.', asset_sales: 'Resultado por venta de activos.', gross_debt: 'Deuda financiera bruta.', cash: 'Caja y equivalentes.', staff_cost: 'Costo de personal (cuando la fuente lo separa).' }[b], a)),
  ...Object.entries(C.TOTALES).map(([a, b]) => D(`years[].official_totals.${b}`, 'number|null', { revenue: 'Total de ingresos impreso en el documento.', expenses: 'Total de gastos impreso en el documento.', net_result: 'Resultado del ejercicio impreso en el documento.' }[b], a)),
  D('years[].adjustments.extra_rows[]', 'object', 'Filas que el documento imprime y no entran en las líneas: {label, amount|null}.', 'extraRows'),
  D('years[].adjustments.no_breakdown[]', 'object', 'Renglones que el documento no abre, con el motivo: {line, side, amount, reason}.', 'sinDesglose'),
  D('years[].adjustments.included_in', 'object', 'Categorías cuyo importe va incluido en otra, por categoría: texto o {in, possible, by}.', 'incluidoEn'),
  D('budget_overlay.<año>', 'object', 'Presupuesto del año (cuando existe), con el mismo esquema de líneas.', 'presupuestoOverlayByYear'),
];

// ---- los recursos: un JSON por club, solo lo financiero
const categorias = categoriasDelSitio(); const externos = referenciasExternas();
const recursos = []; let mal = 0; let bytes = 0;
for (const rel of todosLosArchivos()) {
  const id = rel.split('/').pop().replace(/-data\.js$/, ''); const pais = rel.split('/')[1];
  const j = soloFinanciero(aJson(leerClub(rel), { exportadoEn: fecha }));
  const r = validar(j, { categorias, externos }); if (r.errores.length) { mal++; console.log(`  ${id}: ${r.errores[0]}`); continue; }
  const txt = JSON.stringify(j, null, 1) + '\n'; const ruta = `datos-json/${pais}/${id}.json`; const dest = resolve(salida, ruta); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, txt);
  bytes += Buffer.byteLength(txt);
  recursos.push({ name: id, path: ruta, format: 'json', mediatype: 'application/json', encoding: 'utf-8', bytes: Buffer.byteLength(txt), hash: `sha256:${createHash('sha256').update(txt).digest('hex')}`, title: j.club.display_name || j.club.name || id,
    description: `Finanzas de ${j.club.name || id}: ${j.years.length} ejercicio(s), de ${j.years[0]?.fiscal_year} a ${j.years.at(-1)?.fiscal_year}, en ${j.club.reporting_currency || 'la moneda del club'}.`, jsonSchema: 'https://financeofsports.com/data/schema/club-v2.json' });
}

// ---- la taxonomía de cada deporte (la escribe tools/generar-schema-json.mjs): un recurso más, para leer category sin abrir el sitio
const taxonomias = readdirSync(resolve(ROOT, 'data', 'schema')).filter((f) => /^taxonomy-.+\.json$/.test(f)).sort().map((f) => {
  const txt = readFileSync(resolve(ROOT, 'data', 'schema', f), 'utf8'); const ruta = `esquema/${f}`; const dest = resolve(salida, ruta); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, txt);
  return { name: f.replace(/\.json$/, ''), path: ruta, format: 'json', mediatype: 'application/json', encoding: 'utf-8', bytes: Buffer.byteLength(txt), hash: `sha256:${createHash('sha256').update(txt).digest('hex')}`,
    title: `Taxonomía ${JSON.parse(txt).taxonomy}`, description: 'Qué categoría genérica (category) da cada subcategoría del deporte (subcategory), y en qué bloque del resultado está cada genérica.' };
});

const paquete = {
  $schema: 'https://datapackage.org/profiles/2.0/datapackage.json',
  name: 'finance-of-sports-clubes',
  title: 'Finance of Sports: finanzas de clubes de fútbol',
  description: 'Ingresos y gastos anuales de clubes de fútbol, transcriptos de sus balances publicados y llevados a las mismas categorías (el "Formato simplificado" de financeofsports.com). Un archivo JSON por club, importes en millones de la moneda del club (gastos en negativo), con la fuente de cada ejercicio. Solo lo financiero: sin pases, resultados ni títulos. Esquema: data/schema/club-v1.json.',
  homepage: 'https://financeofsports.com',
  version: '2.0.0',
  created: `${fecha}T00:00:00Z`,
  licenses: [{ name: 'CC-BY-NC-4.0', path: 'https://financeofsports.com/terminos.html', title: 'Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0). Libre citando la fuente; el uso comercial necesita licencia (terminos.html, "Licencia y reuso").' }],
  sources: [
    { title: 'Balances y cuentas anuales publicados por cada club (cada ejercicio cita su documento en sources[] del archivo del club)', path: 'https://financeofsports.com/fuentes.html' },
    { title: 'Cotizaciones explícitas de 10 ejercicios (fx.source = market_approx: ARS 4 y CLP 6) que pueden venir del BCRA o del SII de Chile. Ambas fuentes restringen el uso comercial (BCRA: no sin autorización previa; SII: uso personal, el público o comercial pide autorización escrita). Aquí van bajo CC BY-NC.', path: 'https://www.bcra.gob.ar/aviso-legal/' },
    { title: 'SII de Chile, términos del sitio (restringe el uso comercial de la cotización)', path: 'https://www.sii.cl/sobre_el_sii/terminos_sitio_web.html' },
    { title: 'Fuentes externas del sitio y sus términos', path: 'https://financeofsports.com/metodologia.html' },
  ],
  keywords: ['football', 'soccer', 'finance', 'club accounts', 'financial statements'],
  resources: [...recursos.sort((a, b) => (a.name < b.name ? -1 : 1)), ...taxonomias],
  dictionary: diccionario,
};
mkdirSync(salida, { recursive: true }); writeFileSync(resolve(salida, 'datapackage.json'), JSON.stringify(paquete, null, 2) + '\n');
console.log(`${recursos.length} recursos (${(bytes / 1e6).toFixed(1)} MB) y datapackage.json en ${salida}${mal ? `; ${mal} con error de esquema` : ''}`);
process.exit(mal ? 1 : 0);
