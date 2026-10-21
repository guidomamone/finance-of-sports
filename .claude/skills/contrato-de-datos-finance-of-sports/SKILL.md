---
name: contrato-de-datos-finance-of-sports
description: Qué es público de los datos de finance-of-sports (el JSON de cada club, su esquema, la taxonomía, los ids) y qué cambio lo rompe. Usar antes de renombrar, quitar o cambiar el significado de un campo, de cambiar una categoría genérica, un id de club o una unidad, o de tocar `data/schema/`, `tools/json-datos.mjs`, `tools/generar-schema-json.mjs` o `tools/exportar-paquete.mjs`.
---

# El contrato

**Qué es público.** `data/<país>/<id>.json` (esquema `data/schema/club-v2.json`, taxonomía `data/schema/taxonomy-<deporte>-<n>.json`), el paquete que arma `tools/exportar-paquete.mjs`, `data/correcciones/`, los ids (`<slug>-<iso2>`; los viejos viven en `data/club-aliases.js` y `fuentes/` redirige con 301 desde `netlify.toml`) y los permalinks `/club/<id>` y `/liga/<id>`. Quien lo usa no avisa: hay que tratarlo como API.

**Qué NO rompe (se hace sin permiso):** agregar un campo opcional; agregar una subcategoría o un deporte nuevo con taxonomía propia; cargar clubes y años.

**Qué rompe (hay que decidirlo con Guido y subir `schema_version`):**
- renombrar, mover o quitar un campo;
- cambiar la unidad (hoy, millones de la moneda del club, escrita en `unit`);
- cambiar el significado de un valor (sin dato es `null`, nunca 0);
- cambiar la categoría genérica de una línea ya publicada o la tabla de la taxonomía;
- cambiar o quitar un `id` sin dejar el alias;
- cambiar la licencia o lo que el paquete incluye (hoy solo lo financiero).

**Cómo se cambia lo que rompe:** el esquema nuevo es un archivo nuevo (`club-v3.json`); el anterior queda congelado y publicado, como `club-v1.json`. Una migración es una tool (`tools/migrar-v2.mjs` es el ejemplo) que corre con `--ensayo`, y va con los chequeos de `audit.js` (`json-no-valida`, `json-js-desfasado`, `taxonomia-incompleta`) en verde. El motor y el data file generado conservan sus nombres; lo que cambia es el JSON.

**Siempre:** la fuente es el JSON y el `-data.js` se genera (`node tools/generar-data.mjs`); después de editar a mano, `node tools/publicar.mjs`. El esquema vigente y sus decisiones: `Admin/mediciones/245-esquema.md`; reglas de datos: `Admin/CONVENCIONES-DATOS.md`.

## Cómo mantener esta skill

Si aparece un cambio de esquema que esta lista no clasifica, proponele a Guido el texto exacto y esperá su ok.
