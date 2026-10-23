#!/usr/bin/env node
// ============================================================================
// tools/generar-schema-json.mjs — el JSON Schema formal (draft 2020-12) del archivo de un club, para que lo valide
// CUALQUIER validador estándar (Ajv, check-jsonschema, jsonschema de Python...) y no solo tools/validar-esquema-json.mjs.
//
// Sale de la misma fuente que el exportador: los nombres de campo del diccionario de tools/json-datos.mjs (CAMPOS) y las categorías de data/category-map.js,
// así no hay dos listas que se desfasen. Si cambia category-map.js o el diccionario, se regenera: `node tools/generar-schema-json.mjs`.
// `disclosure` es una lista cerrada (DISCLOSURE de json-datos.mjs, los valores que hoy usan los clubes): un valor nuevo hace fallar el schema a propósito,
// igual que una categoría desconocida.
//
// Esquema 2.0: cada línea lleva `category` (la genérica, igual para cualquier deporte) y `subcategory` (la
// del deporte); el par se valida con un `oneOf` por genérica, así un validador externo también lo exige. Escribe además la tabla pública del mapa de cada
// deporte (data/schema/taxonomy-<versión>.json). data/schema/club-v1.json queda publicado y congelado: este script ya no lo toca.
//
// USO: node tools/generar-schema-json.mjs            escribe data/schema/club-v2.json y data/schema/taxonomy-<versión>.json
//      node tools/generar-schema-json.mjs --stdout   imprime el schema
// ============================================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { CAMPOS as C, SCHEMA_VERSION, UNIT, DISCLOSURE, categoriasDelSitio, categoriasDeDeporte } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const cat = categoriasDelSitio();
// las subcategorías de todos los deportes (las de cada uno están en su tabla, data/schema/taxonomy-<versión>.json)
const subcategorias = [...new Set(Object.values(cat.deportes).flatMap((t) => [...Object.keys(t.revenue), ...Object.keys(t.expense)]))].sort();
const disclosure = new Set(DISCLOSURE);
// genérica -> subcategorías que la dan, por lado y para todos los deportes (una subcategoría del otro lado va a la catch-all: genericCategoryOf)
const pares = (lado) => {
  const m = new Map(cat.genericas[lado].map((g) => [g.id, new Set()]));
  for (const dep of Object.keys(cat.deportes)) for (const sub of subcategorias) { const g = cat.genericCategoryOf(dep, lado, sub); if (g) m.get(g).add(sub); }
  return [...m].filter(([, subs]) => subs.size).map(([g, subs]) => [g, [...subs].sort()]);
};

const num = { type: 'number' }; const numONull = { type: ['number', 'null'] }; const texto = { type: 'string' };
const objeto = (props, required = [], extra = {}) => ({ type: 'object', properties: props, required, additionalProperties: false, ...extra });
const solo = (dic, tipo) => Object.fromEntries(Object.values(dic).map((n) => [n, tipo]));

function linea(lado) {
  const p = pares(lado);
  return objeto({ label: texto, category: { enum: p.map(([g]) => g) }, subcategory: { enum: subcategorias }, amount: num, disclosure: { enum: [...disclosure].sort() }, items: { $ref: '#/$defs/items' } },
    ['label', 'category', 'subcategory', 'amount'], { oneOf: p.map(([g, subs]) => ({ properties: { category: { const: g }, subcategory: { enum: subs } } })) });
}

const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://financeofsports.com/data/schema/club-v2.json',
  title: `Finance of Sports: datos de un club (schema_version ${SCHEMA_VERSION})`,
  description: 'Un archivo por club. Importes en millones de la moneda del club (unit.scale); gastos en negativo. Cada línea lleva category (genérica, la misma para cualquier deporte) y subcategory (la del deporte); el mapa de cada deporte está en data/schema/taxonomy-<club.taxonomy>.json. Se genera con tools/generar-schema-json.mjs; el diccionario de campos: Admin/mediciones/245-esquema.md.',
  ...objeto({
    schema_version: { const: SCHEMA_VERSION },
    exported_at: { $ref: '#/$defs/fecha' },
    unit: objeto({ scale: { const: UNIT.scale }, label: texto }, ['scale', 'label']),
    club: objeto({ id: { type: 'string', pattern: '^[a-z0-9][a-z0-9-]*$' }, name: texto, display_name: texto, country: { type: 'string', pattern: '^[A-Z]{2}$' }, reporting_currency: { $ref: '#/$defs/moneda' }, fiscal_year_start: { type: 'string', pattern: '^\\d{2}-\\d{2}$' }, predecessor_id: { type: 'string', pattern: '^[a-z0-9][a-z0-9-]*$' }, sport: { enum: Object.values(C.DEPORTE) }, taxonomy: { enum: Object.values(cat.deportes).map((t) => t.version) } }, ['id', 'taxonomy']),
    sources: { type: 'array', items: { $ref: '#/$defs/fuente' } },
    management: { type: 'array', items: objeto({ id: texto, name: texto, first_year: { type: 'integer' }, last_year: { type: 'integer' } }, ['id', 'name', 'first_year', 'last_year']) },
    members: numONull,
    years: { type: 'array', items: { $ref: '#/$defs/anio' } },
    budget_overlay: { type: 'object', patternProperties: { '^\\d{4}$': { $ref: '#/$defs/overlay' } }, additionalProperties: false },
    squad_transfers: { type: 'array', description: 'Opcional: no va en el paquete publicado (solo lo financiero).' },
    results: { type: 'object' },
    titles: { type: 'array' },
    extras: objeto(Object.fromEntries(Object.values(C.EXTRAS).map((n) => [n, {}])), [], { description: 'Contenido editorial de pocos clubes (supuestos y detalle del presupuesto, ejercicios y gestiones a mostrar): las claves van en inglés y los textos quedan en español.' }),
  }, ['schema_version', 'exported_at', 'unit', 'club', 'sources', 'years']),
  $defs: {
    fecha: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    moneda: { type: 'string', pattern: '^[A-Z]{3}$', description: 'ISO 4217' },
    fuente: objeto({ id: texto, club_id: texto, title: texto, type: texto, reliability: texto, url: texto, public_note: texto }, ['id', 'club_id', 'title', 'type', 'reliability']),
    items: { type: 'array', items: { $ref: '#/$defs/item' }, description: 'Desglose de una línea: [rótulo, importe] o [rótulo, importe, subitems].' },
    item: { oneOf: [{ type: 'array', prefixItems: [texto, num], minItems: 2, maxItems: 2, items: false }, { type: 'array', prefixItems: [texto, num, { $ref: '#/$defs/items' }], minItems: 3, maxItems: 3, items: false }] },
    linea_ingreso: linea('revenue'), linea_gasto: linea('expense'),
    fx: objeto({ ref: texto, rate: num, source: texto }),
    anio: objeto({
      fiscal_year: { type: 'integer' }, period_end: { $ref: '#/$defs/fecha' },
      period_months: { type: 'integer', minimum: 1, maximum: 36, not: { const: 12 }, description: 'Meses del ejercicio, solo si no son 12 (sin el campo, 12). Un ejercicio de menos de 12 (tramo de transición por cambio de cierre) no entra al ranking por año, a la mediana de la liga ni a las variaciones interanuales.' },
      currency: { $ref: '#/$defs/moneda' }, fx: { $ref: '#/$defs/fx' },
      source_id: { type: ['string', 'null'] }, report_type: texto, management_id: { type: ['string', 'null'] },
      revenue: { type: 'array', items: { $ref: '#/$defs/linea_ingreso' } }, expenses: { type: 'array', items: { $ref: '#/$defs/linea_gasto' } },
      financial: objeto(solo(C.FINANCIERO, numONull)), official_totals: objeto(solo(C.TOTALES, numONull)),
      adjustments: objeto({
        extra_rows: { type: 'array', items: objeto({ label: texto, amount: numONull }, ['label', 'amount']) }, // amount null = la fuente no lo informa (103 filas)
        no_breakdown: { type: 'array', items: objeto({ line: texto, side: texto, amount: num, reason: texto }, ['line', 'side', 'amount', 'reason']) },
        included_in: { type: 'object', additionalProperties: { oneOf: [texto, objeto({ in: texto, possible: { type: 'boolean' }, by: texto }, ['in'])] } },
      }),
    }, ['fiscal_year', 'period_end']),
    overlay: objeto({ currency: { $ref: '#/$defs/moneda' }, fx: { $ref: '#/$defs/fx' }, source_id: texto, revenue: { type: 'array', items: { $ref: '#/$defs/linea_ingreso' } }, expenses: { type: 'array', items: { $ref: '#/$defs/linea_gasto' } } }),
  },
};

if (process.argv.includes('--stdout')) console.log(JSON.stringify(schema, null, 2));
else {
  const dest = resolve(ROOT, 'data', 'schema', 'club-v2.json'); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, JSON.stringify(schema, null, 2) + '\n');
  console.log(`escrito ${dest} (${subcategorias.length} subcategorías, ${cat.genericas.revenue.length}+${cat.genericas.expense.length} genéricas, ${disclosure.size} valores de disclosure)`);
  // la tabla pública del mapa, una por deporte: qué genérica da cada subcategoría y en qué bloque de la cascada del resultado está
  for (const [dep, t] of Object.entries(cat.deportes)) {
    // cada subcategoría del lado con su rótulo y su descripción (las que ven Jev y Claude); las del otro lado van a la catch-all (cross_side)
    const cd = categoriasDeDeporte(dep);
    const lado = (l) => Object.fromEntries(Object.entries(cd[l]).map(([sub, x]) => [sub, { generic: x.generic, label_es: x.label, description_es: x.description }]));
    const cruzadas = (l) => Object.keys(cd[l === 'revenue' ? 'expense' : 'revenue']).filter((sub) => !cd[l][sub]).sort();
    const tabla = {
      taxonomy: t.version, sport: C.DEPORTE[dep],
      description: 'Mapa de las subcategorías de este deporte a las categorías genéricas de Finance of Sports. La genérica no se elige: se deriva de esta tabla. Una subcategoría del otro lado (un gasto usado en una línea de ingreso, o al revés) va a la genérica catch-all de su lado. block: la parte del resultado (revenue; operating = gasto operativo en efectivo; non_cash = amortizaciones y depreciación; exceptional). Resultado operativo = ingresos + operating + non_cash + exceptional.',
      generic: { revenue: cat.genericas.revenue.map((g) => ({ id: g.id, block: g.block, label_en: g.en, label_es: g.label })), expense: cat.genericas.expense.map((g) => ({ id: g.id, block: g.block, label_en: g.en, label_es: g.label })) },
      undisclosed: cd.lump,
      subcategories: { revenue: lado('revenue'), expense: lado('expense') },
      cross_side: { revenue: { generic: cat.genericCategoryOf(dep, 'revenue', cruzadas('revenue')[0]), subcategories: cruzadas('revenue') }, expense: { generic: cat.genericCategoryOf(dep, 'expense', cruzadas('expense')[0]), subcategories: cruzadas('expense') } },
    };
    const f = resolve(ROOT, 'data', 'schema', `taxonomy-${t.version}.json`); writeFileSync(f, JSON.stringify(tabla, null, 2) + '\n'); console.log(`escrito ${f}`);
  }
}
