# Sesión `proyecto` (Datos 4): to-do 248, migración al esquema 2.0

## Qué cambió (commits de esta vuelta, sin push)

- **5510610c9c (1/4)**: `data/category-map.js` con la capa genérica (`GENERIC_REVENUE/EXPENSE_CATEGORIES` con su bloque, `SPORT_TAXONOMIES`
  de fútbol `football-1`) y 3 chequeos en `audit.js`: `taxonomia-incompleta` (P1), `bloque-motor-distinto` (P1, en la sonda del motor) y
  `fila-parte-generica` (P2). Todos dan 0. ASSET_V 1540.
- **608ab8f76c (1b/4)**: `genericCategoryOf()`: una subcategoría del otro lado va a la genérica catch-all de su lado. Es la decisión 3 como regla
  general, así `validar` no rechaza nada que hoy acepta (no endurece una regla del pipeline). ASSET_V 1541.
- **ac6f5b227c (2/4), LA MIGRACIÓN**: los 319 JSON pasan a `schema_version` 2.0 (`category` genérica + `subcategory`, `club.sport` en inglés,
  `club.taxonomy`), con `tools/json-datos.mjs`, `generar-data.mjs`, `generar-schema-json.mjs` (escribe `data/schema/club-v2.json` y
  `taxonomy-football-1.json`; `club-v1.json` queda congelado), `exportar-paquete.mjs` y la nueva `tools/migrar-v2.mjs`. ASSET_V 1542.
  Va en un commit con las tools porque, separados, uno de los dos no pasa `audit.js` (`json-no-valida`).
- **3/4**: documentos (`245-esquema.md`, `CONVENCIONES-DATOS.md` con la regla «la genérica se deriva», `ARQUITECTURA.md`, el plan).

## Los 4 chequeos de sumas (todos en verde)

1. Los 319 `-data.js` regenerados son idénticos byte por byte (`git status` sin ningún `-data.js`).
2. Huella de importes (`migrar-v2.mjs --huella`, 38.883 renglones: cada línea y cada item con su rótulo, subcategoría e importe), antes y después:
   `cmp` idéntico.
3. Por club, ejercicio y lado, las genéricas suman el total; la cascada armada con los bloques da el ebitda, el resultado operativo y el pat de
   `computeYearGeneric` en los 1.296 ejercicios. Se probó que detecta: con `depreciation` mapeada a una genérica operativa, 896 fallas y no escribe.
4. `ida-y-vuelta` 319/319 idénticos; `validar-esquema-json` 319 válidos; `generar-data --check`, `generate-rankings --check`,
   `generate-fuentes-page --check` y `generate-club-index --check` al día; `audit.js` 0 P0 / 0 P1 y los mismos conteos por código que antes;
   `?audit=1`: 319 clubes, 3703 checks, 0 no cierran, 0 warnings.

## Para el merge

- `data/` y `tools/` de esta rama no chocan con main (`git diff proyecto...main` vacío en `data/`, `tools/`, `js/` al empezar). El choque de
  siempre es ASSET_V y lo generado (`index.html`, `fuentes/`, `club/`, `liga/`): `tools/worktree.mjs mergear`.
- **Después de mergear cualquier rama con JSON en v1**: `node tools/migrar-v2.mjs --escribir` (es idempotente; con los chequeos en verde
  escribe solo los que estaban en v1).
- Una tool vieja de otra rama que escriba un JSON sin `subcategory` falla en `validar` y no escribe (no rompe datos).
- Los JSON crecieron un 7 % en bytes: varias líneas pasan los 150 caracteres y `serializar` las abre en varios renglones.

## Para TODO, CHANGELOG y ESTADO (los escribe la principal)

- TODO 248: hechos los pasos 1 a 3 (mapa, migración, documentos). Quedan el paso 4 (la etapa de pantalla: motor y Formato simplificado leyendo
  el mapa) y el 5 (Bath Rugby, decisiones 9 a 14 del plan, abiertas).
- CHANGELOG: "248: esquema 2.0: cada línea con category genérica (derivada de data/category-map.js) y subcategory del deporte; los 319 JSON
  migrados con tools/migrar-v2.mjs sin cambiar un importe (4 chequeos); club-v2.json y taxonomy-football-1.json; 3 chequeos nuevos en audit.js".
- ESTADO, lo que deja de ser cierto: la línea de `data/` dice «esquema en `data/schema/club-v1.json`»; ahora es `club-v2.json`, con la tabla
  `data/schema/taxonomy-football-1.json`.

## Skill: cambio propuesto, NO aplicado (necesita el ok de Guido)

`club-data-mapping/SKILL.md`, sección 0, el párrafo que empieza «El motor genérico (`computeYearGeneric`…». Cambiar
«En el JSON del club los campos se llaman `{ label, category, amount, disclosure, items? }`» por:

> En el JSON del club los campos se llaman `{ label, category, subcategory, amount, disclosure, items? }`: `subcategory` es la
> `normalizedCategory` (la que se elige con este skill) y `category` es la genérica, igual para cualquier deporte, que no se elige: la escribe
> `tools/json-datos.mjs` desde `SPORT_TAXONOMIES` de `data/category-map.js`. Una subcategoría nueva lleva su genérica en ese mapa en la misma
> sesión (`audit.js`, `taxonomia-incompleta`).

## Hallazgos de paso (no se tocaron)

- Bath Rugby 2023-24 (`Clubes/Inglaterra/Bath Rugby/bath-rugby-full-accounts-2023-24.md`, pág. 22, L1026-1050): el estado de resultados
  quedó sin cifras (rótulos sí, números como "Teo / I> Ion / Im"). Hay que volver a transcribir esa página antes de cargar.
- Bath Rugby, Strategic Report: el OCR se come la coma ("Central income 74" por 7,4 en 2023-24 L163; "44" por 4,4 en 2024-25 L206).
  Ningún chequeo mira hoy la tabla del Strategic Report.
- Atlético Mineiro 2024 y 2025: "Custo de mercadorias e produtos (custo do manto vendido)" es `admin_general_expense` con importe negativo en
  `revenue`. Queda en `other_revenue` por la regla cruzada; si es un costo cargado del lado del ingreso, es tema de la carga de ese club.
- El hook de commit frena un commit que toca un JSON de `data/` sin subir ASSET_V, aunque el JSON no lo cargue ninguna página (el chequeo
  `asset-v-sin-subir` de `audit.js` exceptúa solo `data/schema/`). Hubo que subirlo dos veces en esta vuelta. Es tema de Pipeline, no lo toqué.

---

# Sesión Datos 3 (rama proyecto)

## 246 — ids estables (hecho, un commit)

**Qué cambió (para CHANGELOG):** los 41 ids de club sin país pasan a `<slug>-<iso2>` (boca → boca-ar, realmadrid → realmadrid-es…). 123 archivos movidos
(`data/<iso>/<id>-data.js`, `fuentes/<id>.html`, `Admin/carga-clubes/<id>.md`), sourceIds con el prefijo nuevo, claves en `data/` y registros que una tool lee por club,
`audit-ignore.json`. `data/club-aliases.js` (CLUB_ALIASES + `resolverClubId`/`resolverClubIds`), cargado en `index.html` después de `clubs.js`; el sitio lo aplica a
`?club=`, a Comparar (`a`/`b`), a `fos_club` en `localStorage` y a las búsquedas guardadas de Mi cuenta. 82 redirects 301 de `fuentes/` en `netlify.toml`
(entre marcas `# ids-alias`). `tools/data-clubes.js`: `normalizarId()` (y `rutaData` lo usa). `audit.js`: `clubid-sin-pais` pasa a P1, sin lista de heredados; nuevo `alias-roto` (P1).
Se subió ASSET_V a 1515. Diseño: `Admin/mediciones/246-ids.md`; ensayo: `246-ensayo.txt`. Herramienta: `tools/renombrar-ids.mjs` (`--verificar` sigue sirviendo; archivar en `tools/archivo/` cuando se cierre el 245).
**Verificado:** `audit.js` 0 P0 / 0 P1; `auditAll()` 319 clubes, 3703 checks OK, 0 no cierran; `?club=boca` abre y la URL se reescribe a `boca-ar`; `fos_club=river` → `river-ar`; Comparar con `c.racing:2024`; club nuevo `elche-es`.
**Sin tocar a propósito:** CHANGELOG, Archive, sesiones, logs de gasto (`registros/api/`), `Clubes/`, y las menciones en prosa de notas de sourcing.

**Qué deja de ser cierto en ESTADO:** la línea "Los clubes nuevos nacen con el país en el clubId" ahora vale para todos (ya no hay heredados); `Admin/ESTADO-clubes.md` ya se regeneró.
**Corrección dentro del 246:** el renombre había dejado `gestionesByClub.<id>` y `memberCountByClub.<id>` con el id viejo en 40 data files (los datos de gestión y socios quedaban sin leer, sin que `auditAll()` lo notara); arreglado en un commit aparte y la regla `propiedad-registro` está en `tools/renombrar-ids.mjs`.
**TODO:** borrar el 246. El 245 sigue (fase 2). Mixpanel/KV cortan la serie por club en el deploy (decidido por Guido).
**Primer push:** mirar que las 301 de `/fuentes/boca.html` → `/fuentes/boca-ar.html` respondan en producción.

**Skills (cambios propuestos, NO aplicados):**
- `escala-finance-of-sports/SKILL.md` ~172-177 (bloque "`clubId` sin país"): reemplazar por «ids: todos `<slug>-<iso2>`; los viejos viven en `data/club-aliases.js`; `audit.js` vigila formato y mapa (P1)».
- `club-data-mapping/referencia/formato-simplificado.md:61`: `data/ar/boca-data.js` → `data/ar/boca-ar-data.js`.

## 245 fase 2 — el JSON es la fuente (hecho)

**Qué cambió (para CHANGELOG):** `data/<país>/<id>.json` (319) es la fuente de los datos de cada club y se publica como dato abierto (D1); `data/<país>/<id>-data.js` se GENERA de ahí
(`tools/generar-data.mjs`, con una cabecera fija «GENERADO…») y el sitio lo carga igual (D2). Nombres de campo en inglés también en los bloques de texto libre (`results`, `titles`,
`extras.budget_*`; textos en español; diccionario `CLAVES_LIBRES` en `tools/json-datos.mjs`). Boca quedó con la estructura de los demás: sus fuentes, gestiones y socios ya no
están en `data/clubs.js` sino en su data file (JSON: `sources[]`, `management[]`, `members`). Nuevas: `tools/club-json.mjs` (`modificarClub`, `crearClub`) y `tools/generar-data.mjs`
(`--check`, `--identidad`). `cargar.mjs`, `caja-deuda.mjs` (caja, deuda y `--personal`), `dentro-de-otro.mjs` y `alta-club.mjs` leen y escriben el JSON (validan contra
`data/schema/club-v1.json` antes de escribir) y regeneran el JS. `audit.js`: `json-js-desfasado` y `json-no-valida` pasan a P1 (generadores de `checkGenerados`); `json-aviso` sigue P2.
`exportar-json.mjs` quedó como la migración de una sola vez. Docs: CONVENCIONES-DATOS, ARQUITECTURA, PIPELINE, PANTALLA, `mediciones/245-esquema.md` y CLAUDE.md (un párrafo).
**Verificado:** ida y vuelta 319 de 319 idénticos; el JS generado es idéntico, como objetos, al de antes (319 de 319 contra HEAD); `audit.js` 0 P0 / 0 P1; `auditAll()` 319 clubes,
3703 checks, 0 que no cierran; `cargar.mjs --reemplazar --escribir` sobre FCI Levadia 2019 y `dentro-de-otro.mjs --todos --escribir` reproducen lo publicado (única diferencia: un `incluidoEn: {}`
vacío de Krasnodar desaparece, como hacía la tool antes).
**Qué deja de ser cierto en ESTADO:** «los data files son lo que se edita» (ahora el JSON); la sección «Dónde vive cada cosa» (`data/`: JSON fuente + `-data.js` generado); «Boca» con
fuentes en clubs.js; la línea de la fase 1 del 245 en el TODO. **TODO:** borrar el 245 al mergear (la fase 2 está hecha); seguir con las skills (propuesta en la carpeta de notas).
**Pendiente / ojo:** el ASSET_V subió a 1520 (el 246 y el 245); mirar tras el primer push las 301 de `/fuentes/<id>.html`. `tools/renombrar-ids.mjs` y `exportar-json.mjs` se pueden archivar en
`tools/archivo/` (no lo hice: `renombrar-ids.mjs --verificar` todavía sirve). Los comentarios de otras tools que dicen «escribe el data file» (lectura con `vm`) siguen ciertos porque leen el JS generado.

## Al mergear con main (conflictos anticipados con `git merge-tree`, main 14 commits adelante)

Conflictos reales: `data/ar/godoycruz-ar-data.js` y `data/ar/gimnasiaesgrima-ar-data.js` (Onboarding 6 los tocó en main, y acá el `-data.js` es generado). Resolución: quedarse con la versión de
main de esos dos `-data.js`, pasar su cambio al JSON con `node tools/exportar-json.mjs --club godoycruz-ar --fecha <hoy>` (y lo mismo con `gimnasiaesgrima-ar`; esa tool lee el JS y escribe
`data/ar/<id>.json`) y regenerar con `node tools/generar-data.mjs`. El resto del conflicto es generado (`index.html` ASSET_V, `fuentes.html`, `fuentes/*.html`): `tools/worktree.mjs mergear`
lo resuelve y regenera (hay que regenerar también `data/rankings/ar-primera.js`, que cambió en los dos lados). Después `node tools/audit.js`, `node tools/generar-data.mjs --check` y
`node tools/renombrar-ids.mjs --verificar` (que no vuelva a aparecer un id viejo en lo que trajo main).

## Lo que una sesión nueva tiene que saber del 246 (y del estado de la rama)

- **Formato del id:** `<slug>-<iso2>` con el `country` de `data/clubs.js` (`boca-ar`, `realmadrid-es`). Un id nunca se reutiliza. Los 41 viejos (`boca`, `river`, `racing`…) están en `data/club-aliases.js`
  (`window.CLUB_ALIASES` + `resolverClubId`/`resolverClubIds`), que se carga en `index.html` después de `clubs.js` y no se borra nunca. En tools, `normalizarId()` de `tools/data-clubes.js` (`rutaData` lo usa) acepta
  un id viejo y avisa. `audit.js`: `clubid-sin-pais` y `alias-roto` son P1.
- **`tools/renombrar-ids.mjs`:** el ensayo (sin flags) escribe `Admin/mediciones/246-ensayo.txt`; `--aplicar` exige árbol limpio; `--verificar` (solo lectura) dice si queda un id viejo en un contexto reconocido. Reescribe
  solo en contextos (comillas, clave de objeto, rutas, `?club=`, sourceIds EXACTOS leídos del data file del club, `"match": "<id> …"` de `audit-ignore.json`, `|<id>"` de la cola). Excluye a propósito: historia
  (CHANGELOG, Archive, sesiones, auditorías), `Clubes/`, logs de gasto, `.claude/`, `audit.js`, `js/selector.js`.
- **Trampas que aparecieron:** (1) un token `<id>-algo` entre comillas NO es siempre un sourceId (entidades como `botafogo-saf`, slugs de sponsors, ejemplos de docs): por eso los sourceIds salen del data file;
  (2) en los data files los registros se asignaban con `gestionesByClub.river = …` y `memberCountByClub.river = …` (propiedad, no comillas): quedaron con el id viejo y `auditAll()` NO lo detecta (la gestión
  queda «sin dato»); (3) una clave con guion en JS necesita comillas; (4) archivos viejos de `Admin/gestiones-por-pais/` ya usaban ids con país (`clubamerica-mx`): no se duplica el sufijo; (5) `git mv` + reescritura
  en el mismo `--aplicar`; (6) el clasificador de permisos frenó `--aplicar` hasta que Guido lo confirmó en la sesión.
- **Chequeo que conviene siempre tras tocar ids:** cargar todos los data files y datos compartidos en un `vm` y buscar cualquier id viejo como clave o valor (se hizo con un script suelto; resultado: ninguno).
- **Estado de la rama `proyecto`:** además del 246 (`b802dc4d52` y el arreglo `1ad395ff4e`), la sesión ya hizo y commiteó el 245 fase 2 antes de que cambiara el brief (`ccaac6af55` Boca, `f22c829d39` JSON fuente, ya
  verificado; ver la sección de arriba). El Boca (`ccaac6af55`) quedó ANTES del arreglo del 246 en la historia. No reescribí historia.
