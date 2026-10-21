#!/usr/bin/env node
// ============================================================================
// tools/generar-schema-json.mjs — to-do 245, estándares abiertos (1): el JSON Schema formal (draft 2020-12) del archivo de un club, para que lo valide
// CUALQUIER validador estándar (Ajv, check-jsonschema, jsonschema de Python...) y no solo tools/validar-esquema-json.mjs.
//
// Sale de la misma fuente que el exportador: los nombres de campo del diccionario de tools/json-datos.mjs (CAMPOS) y las categorías de data/category-map.js,
// así no hay dos listas que se desfasen. Si cambia category-map.js o el diccionario, se regenera: `node tools/generar-schema-json.mjs`.
// `disclosure` es una lista cerrada (DISCLOSURE de json-datos.mjs, los valores que hoy usan los clubes): un valor nuevo hace fallar el schema a propósito,
// igual que una categoría desconocida.
//
// USO: node tools/generar-schema-json.mjs            escribe data/schema/club-v1.json
//      node tools/generar-schema-json.mjs --stdout   lo imprime
// ============================================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { CAMPOS as C, SCHEMA_VERSION, UNIT, DISCLOSURE, categoriasDelSitio } from './json-datos.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const cat = categoriasDelSitio();
const categorias = [...new Set([...cat.revenue, ...cat.expense])].sort();
const disclosure = new Set(DISCLOSURE);

const num = { type: 'number' }; const numONull = { type: ['number', 'null'] }; const texto = { type: 'string' };
const objeto = (props, required = [], extra = {}) => ({ type: 'object', properties: props, required, additionalProperties: false, ...extra });
const solo = (dic, tipo) => Object.fromEntries(Object.values(dic).map((n) => [n, tipo]));

const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://financeofsports.com/data/schema/club-v1.json',
  title: 'Finance of Sports: datos de un club (schema_version 1.0)',
  description: 'Un archivo por club. Importes en millones de la moneda del club (unit.scale); gastos en negativo. Se genera con tools/generar-schema-json.mjs; la propuesta y el diccionario de campos: Admin/mediciones/245-esquema.md.',
  ...objeto({
    schema_version: { const: SCHEMA_VERSION },
    exported_at: { $ref: '#/$defs/fecha' },
    unit: objeto({ scale: { const: UNIT.scale }, label: texto }, ['scale', 'label']),
    club: objeto({ id: { type: 'string', pattern: '^[a-z0-9][a-z0-9-]*$' }, name: texto, display_name: texto, country: { type: 'string', pattern: '^[A-Z]{2}$' }, reporting_currency: { $ref: '#/$defs/moneda' }, fiscal_year_start: { type: 'string', pattern: '^\\d{2}-\\d{2}$' }, sport: texto }, ['id']),
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
    linea: objeto({ label: texto, category: { enum: categorias }, amount: num, disclosure: { enum: [...disclosure].sort() }, items: { $ref: '#/$defs/items' } }, ['label', 'category', 'amount']),
    fx: objeto({ ref: texto, rate: num, source: texto }),
    anio: objeto({
      fiscal_year: { type: 'integer' }, period_end: { $ref: '#/$defs/fecha' }, currency: { $ref: '#/$defs/moneda' }, fx: { $ref: '#/$defs/fx' },
      source_id: { type: ['string', 'null'] }, report_type: texto, management_id: { type: ['string', 'null'] },
      revenue: { type: 'array', items: { $ref: '#/$defs/linea' } }, expenses: { type: 'array', items: { $ref: '#/$defs/linea' } },
      financial: objeto(solo(C.FINANCIERO, numONull)), official_totals: objeto(solo(C.TOTALES, numONull)),
      adjustments: objeto({
        extra_rows: { type: 'array', items: objeto({ label: texto, amount: numONull }, ['label', 'amount']) }, // amount null = la fuente no lo informa (103 filas)
        no_breakdown: { type: 'array', items: objeto({ line: texto, side: texto, amount: num, reason: texto }, ['line', 'side', 'amount', 'reason']) },
        included_in: { type: 'object', additionalProperties: { oneOf: [texto, objeto({ in: texto, possible: { type: 'boolean' }, by: texto }, ['in'])] } },
      }),
    }, ['fiscal_year', 'period_end']),
    overlay: objeto({ currency: { $ref: '#/$defs/moneda' }, fx: { $ref: '#/$defs/fx' }, source_id: texto, revenue: { type: 'array', items: { $ref: '#/$defs/linea' } }, expenses: { type: 'array', items: { $ref: '#/$defs/linea' } } }),
  },
};

if (process.argv.includes('--stdout')) console.log(JSON.stringify(schema, null, 2));
else { const dest = resolve(ROOT, 'data', 'schema', 'club-v1.json'); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, JSON.stringify(schema, null, 2) + '\n'); console.log(`escrito ${dest} (${categorias.length} categorías, ${disclosure.size} valores de disclosure)`); }
