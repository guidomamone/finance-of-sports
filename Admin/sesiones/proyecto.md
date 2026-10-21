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
- **3/4**: documentos (`245-esquema.md`, `CONVENCIONES-DATOS.md` con la regla «la genérica se deriva», `ARQUITECTURA.md`, el plan). (Los tres de
  arriba ya están mergeados en main.)
- **b2d1658ae8 (4/4), ETAPA DE PANTALLA**: `computeYearGeneric` suma los gastos por el bloque de la genérica y `bucketize` arma las filas por
  genérica, con el deporte del club; las `cats` de fútbol de cada fila se derivan del mapa (las leen `audit.js` y `dentro-de-otro.mjs`). El bolsón
  se rotula por deporte (`LUMP_LABEL_BY_SPORT`, con «Rugby profesional (sin desglosar por la fuente)» y su traducción); `js/liga.js` lo
  reconoce con `esBolson()`. Para el fútbol no cambia nada: la foto de `computeYearGeneric`, `simplifiedReportForClub` y el presupuesto de los
  1.296 ejercicios es idéntica a la de main; `generate-rankings --check` al día; `dentro-de-otro` 397 → 397; `auditAll()` 3703 checks, 0 no
  cierran; Ligas probada en el navegador. ASSET_V 1546.
- **3d8259071d, TAXONOMÍA `rugby-1`**: `RUGBY_REVENUE/EXPENSE_CATEGORIES` (con descripción) y sus rótulos, `SPORT_TAXONOMIES.rugby` y el bolsón de
  cada deporte (`lump`) en `data/category-map.js`; `categoriasDeDeporte(deporte)` en `tools/json-datos.mjs`; `validar` mira las subcategorías del
  deporte del club; `data/schema/taxonomy-rugby-1.json`. Rugby sigue apagado en el selector. ASSET_V 1547.
- **f188d4345b**: el plan al día (CVC es fila aparte del Strategic Report, la votación, las respuestas a Pipeline sobre la taxonomía).
- Bath 2023-24, pág. 22 rehecha con Mistral (abajo, en hallazgos).

## Bath Rugby (paso 5 del 248): CARGADO, los 5 ejercicios

- Commits (sin push): 86baf79b86 (alta de `bathrugby-gb`, Rugby activo en `data/leagues.js`, liga `gb-premiershiprugby`, ejercicio 2021),
  911ff2ed74 (2022), e2ed50005f (2023), 4d00a760e0 (2024), 5f6da735e1 (2025), f5e2b1df3c (caja y deuda), 51b20931df (fuentes con Companies House
  y notas públicas; EJEMPLO-CATEGORÍA de CVC y fair value y `reglas-categoria --escribir`; 5 reglas de fútbol marcadas `CATEGORÍA (prompt, futbol)`
  porque con Rugby activo `reglas-categoria.mjs` las daba por error).
- Con tokens de sesión: especificaciones de `armar-a-mano`, Jev y Claude `--desde-sesion` (41 rubros, `rugby-1`). API de Bath en total: ~US$ 0,51
  (transcribir 0,44, validar 0,04, caja-deuda 0,03).
- Cada año cierra con lo impreso (ingresos, gastos y resultado); `auditAll()` 320 clubes, 3718 checks, 0 no cierran; `audit.js` 0 P0 / 0 P1.
- Visto en el preview, a escritorio y a 375 px: Rugby en el paso Deporte del selector; Premiership Rugby en Ligas (5 ejercicios, un club); la
  ficha de Bath con Formato simplificado por genérica y el bolsón «Rugby profesional (sin desglosar por la fuente)».
- Los 5 frenos de script de Bath están resueltos en `frenados-por-script.jsonl` (e500bdab8c, 121399a592, e18b1aa60e, 05ebe22888, 7e1971717e).
- Lo que no se pudo: separar el costo de personal (decisión 12). `caja-deuda --personal` no encuentra el total en ningún año (la fila del total de
  la nota «Staff costs» no tiene rótulo; Jev: «ninguna»), así que `--partir` no tiene dato: los sueldos quedan en el bolsón y la pantalla los
  muestra «—». Caja de 2021 y 2023 y deuda de 2021, 2023 y 2025 quedaron sin dato (escala del script: 3.102.211 «no coincide» con 3102211;
  49.093 tomado como 2.425 veces los ingresos).

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

- TODO 248: HECHO entero (mapa, migración, documentos, etapa de pantalla, `rugby-1` y Bath Rugby cargado como prueba). Se puede borrar.
  Las 14 decisiones del plan están cerradas: 1 a 9, 11 y 12 como se recomendaron; 10 (CVC) y 13 (fair value 2021) por votación, a `other_income`;
  14 (comparar con fútbol) y lo visible de Bath (Rugby en el selector, «Rugby profesional…») con el ok de Guido. Los textos fijos que dicen «fútbol»
  (pie y paquete) quedan como están.
- TODO 339 (Pipeline): la taxonomía de rugby ya se lee por código; las respuestas a sus 3 dudas están en `Admin/mediciones/248-plan.md`,
  sección 5, «Cómo leen las tools la taxonomía de un club».
- CHANGELOG: "248: esquema 2.0: cada línea con category genérica (derivada de data/category-map.js) y subcategory del deporte; los 319 JSON
  migrados con tools/migrar-v2.mjs sin cambiar un importe (4 chequeos); club-v2.json y taxonomy-football-1.json; 3 chequeos nuevos en audit.js".
  Y otra: "248: el motor y Formato simplificado leen la capa genérica (para el fútbol, idéntico); taxonomía rugby-1 y categoriasDeDeporte();
  Bath 2023-24 pág. 22 rehecha con Mistral".
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

- **Pantalla, probablemente también en producción**: tocar un club en la página de una liga (`/liga/<id>`) falla con «No se pudieron cargar los
  datos de <club>» si sus datos no estaban cargados: `loadClubData` (`js/principal.js` L32) arma `data/<país>/<id>-data.js` RELATIVO y, con la URL
  en `/liga/…`, el navegador pide `/liga/data/gb/burnley-gb-data.js` (404). Probado con Burnley y con Bath en el preview. Arreglo probable: ruta
  absoluta (`/data/...`). Es de Pantallas.
- Pantalla: «Salarios / Ingresos» da 0 % cuando los sueldos están dentro de un bolsón sin desglosar (Bath, y cualquier club con bolsón de gastos);
  debería ser «—». Y la fila «Resultado neto» del estado de resultados sale en castellano en la versión en inglés.
- caja-deuda: problemas de escala en Bath (2021: 3.102.211 «no coincide» con el mismo número del documento siguiente; 2023: 49.093 £ de caja
  tomado como 2.425 veces los ingresos). Y `--personal` no lee un total de nota sin rótulo.

- Bath Rugby 2023-24, pág. 22: la rehice con Mistral (US$ 0,004) y quedó como tabla. Corrección de lo que dije antes: la versión vieja NO había
  perdido las cifras, las tenía en una columna aparte debajo de los rótulos; son las mismas. El `.md` cambió, así que el pipeline lo va a ver
  como transcripción distinta de la que verificó (si tenía una validación guardada).
- **DEFECTO DE SCRIPT, PARA PIPELINE** (no lo arreglé): en el Strategic Report de Bath el OCR se come la coma decimal de una cifra en £m
  ("Central income 74" por 7,4 en `bath-rugby-full-accounts-2023-24.md` L163; "44" por 4,4 en `bath-rugby-medium-company-accounts-2024-25.md`
  L206). La tabla tiene su total impreso (Turnover 20,8 y 23,3) y la suma no cierra, pero ningún chequeo de transcripción ni de carga mira
  las tablas en £m con un decimal del informe de los directores. Escalón posible: que el chequeo de fidelidad (o verificar) sume las tablas
  con fila de total y marque las que no cierran, que es como se ve.
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

## Orden 1: to-dos 330 y 257 (propuestas, sin aplicar; 2026-10-21)

### Qué cambió
- `Admin/propuestas/330-donde-se-pierde.md`: seis tipos de pérdida (decisión en la memoria, pregunta resuelta en dudas, descarte medido que no llegó a HALLAZGOS, medición sin destino, pendiente de una nota de sesión archivada, registro sin lector) con archivo y línea, dónde tiene que quedar cada uno y el chequeo que lo vigila.
- `Admin/propuestas/257-skills.md`: destino de cada una de las 27 memorias, texto exacto de cuatro skills nuevas (producto y pantalla, contenido y difusión, contrato de datos, deploy y release) y de una quinta que las memorias piden (la sesión principal), cambios a skills y documentos existentes, chequeos y el candado de skills (el hook exige que el texto ya esté commiteado en `Admin/propuestas/`).
- No se tocó `.claude/skills/`, la memoria, tools ni hooks.

### Qué queda (para TODO)
- Guido: decidir qué skills nuevas y qué cambios de 257-skills.md (partes 2 y 3) aprueba. Sin su ok no se pega nada. → descartado: aprobado y aplicado (partes 2, 3 y 7).
- Auditora 4 (sección 7): los chequeos de 330 y de la parte 4 del 257 (`memoria-no-es-regla`, `doc-de-criterio-con-historia`, `duda-resuelta-en-dudas`, `medicion-sin-destino`, `registro-sin-lector`, `archivar-con-ok`, `modelo-opus-con-ok`, `worktree-sin-permission-mode`, el candado de skills, ampliación de `comandos-simples`, cambios de `worktree.mjs`). → descartado: aprobados y codeados (vuelta 2).
- Falta línea en `Admin/HALLAZGOS-pipeline.md` para los descartes 314 (Stirling) y 298 x2 (voz local); falta en `Admin/TODO.md` el punto de que `perfil-en-cola` de `cargar.mjs` nunca frene; la pregunta de Deportes Tolima (`dudas-por-club.md:201`) frena una carga y no está en el TODO. → HALLAZGOS: las líneas de 314 y 298 x2 están en esta vuelta; → TODO: `perfil-en-cola` y la pregunta de Tolima (la escribe la principal).
- Sin mirar: los chats de las sesiones y las 118 notas de `Admin/Archive/sesion-*` (muestreé dos). Ver el final de 330. → TODO: pasada opcional con subagentes; la principal decide si la abre.

### Qué deja de ser cierto en ESTADO
- Nada todavía: son propuestas. Si se aprueban, el bloque de hooks cambia (candado, archivar, Opus) y aparecen las skills nuevas.

### Vuelta 2 de Orden 1 (2026-10-21): chequeos aprobados codeados

- `b0d07505dd` audit.js: `historia-en-doc-de-criterio` (ya existía, P3) ahora mira también `Admin/ESTADO.md` y dice la primera línea de cada documento.
- `b8991ad051` audit.js: `duda-resuelta-en-dudas` (5), `registro-sin-lector` (5) y `medicion-sin-destino` (P3). `Admin/mediciones/README.md` lista con su destino los archivos que ninguna tool, skill ni documento de criterio nombra (hay filas «a confirmar»). Con ese índice `medicion-sin-destino` da 0; sin él, contando solo lo que citan tools, skills y documentos de criterio, eran 22 de 54, no los 35 de 51 que midió la Auditora (cuenta distinta: no sé cuál usó).
- `c582fccf38` gasto.mjs: imprime el paso A2 como parte del gasto de API contra el techo del 15% (hoy 4,8%).
- `c7679d083c` tools/hooks/pre-tool.mjs: el candado de skills (Edit: el `new_string` entero en un solo archivo de `Admin/propuestas/` commiteado en HEAD, si no deny; con el texto, ask con la ruta; Write: cada párrafo de 40+ caracteres; Bash que escribe en skills, deny; los comandos de git que reescriben el árbol pasan), `archivar-con-ok`, `modelo-opus-con-ok`, `worktree-sin-permission-mode`, `memoria-no-es-regla` (los cuatro, ask) y `comando-que-edita` (ask; anota cada disparo en `Admin/registros/.hooks-disparos.jsonl`, gitignoreado). Probados con entradas simuladas: todos dan lo esperado.
- Parte 7 de `Admin/propuestas/257-skills.md` (qué de las convenciones es skill) y textos de las partes 2 y 3 sin historia.

### Qué queda (vuelta 2)

- La principal: agregar al `matcher` de `.claude/settings.json` `mcp__ccd_session_mgmt__archive_session`, `mcp__ccd_session__start_session` y `mcp__ccd_session_mgmt__set_session_model`; sin eso los tres hooks de sesiones no corren. Los demás ya corren. → descartado: hecho, `settings.json` ya los tiene.
- Rechazados por la Auditora (no codeados): que `mergear` frene sin flecha (va como aviso, primero el texto de `worktree.md` con el ok de Guido) y un paso de adelantar en `worktree.mjs` (no existe). → descartado: rechazados por la Auditora; el aviso de `mergear` ya está.
- Sigue pendiente el ok de Guido a cada skill de las partes 2, 3 y 7 de 257-skills.md. → descartado: aprobadas y aplicadas.
- Medición del candado: 162 commits tocaron `.claude/skills` en total y 32 desde el 2026-10-14; cada uno habría necesitado su propuesta commiteada antes. → descartado: es un dato de la medición, no un pendiente.

### Vuelta 3 de Orden 1 (2026-10-21): partes 3 y 7 del 257 aplicadas

- Parte 3 (ocho commits, el último `83070e4759`): club-sourcing, start-session (párrafo, filas 9 a 13 de la tabla, «Cómo mantener»), club-outreach, `worktree.md`, club-or-year-onboarding (la cola y el gasto de API), CONVENCIONES-DATOS y CONVENCIONES (la regla de dónde queda lo que se decide, con su tabla, y el índice sin versiones). El chequeo de historia se nombra `historia-en-doc-de-criterio` (el nombre real en `audit.js`).
- Parte 7 (un commit): `producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md` (con la verificación y las trampas del navegador), cinco párrafos de pasos de worktree en `worktree.md` (con `data/sponsors.js` en la lista de generados) y la sección «Cerrar un punto del TODO» en la skill principal. En `Admin/PANTALLA.md` las dos secciones quedan en una línea que apunta a la skill; en `Admin/CONVENCIONES.md` se borraron «DOS SESIONES EN PARALELO» (queda su primera frase y el bullet de `migrar-v2.mjs`, que decide quien mergea) y «UNA PREMISA VENCIDA» (queda una línea que apunta a la skill). Los textos exactos, en `Admin/propuestas/257-parte3-texto.md` y `257-parte7-texto.md`.

### Qué queda (vuelta 3)

- En `Admin/PANTALLA.md` quedó, bajo «Verificar en el browser de verdad…», el párrafo «Cómo verlo como archivo» (Chrome sin ventana con `--screenshot`): el texto aprobado de la skill no lo trae y no lo mudé para no perderlo. Para moverlo a `navegador-de-preview.md` hace falta un texto nuevo con el ok de Guido. → TODO: texto exacto en `Admin/propuestas/257-como-verlo-como-archivo.md`, para el ok de Guido.
- La introducción de `Admin/CONVENCIONES.md` (línea 20) todavía dice que el índice de reglas mudadas sirve para buscar «por su versión»; el índice ya no lleva versiones. → descartado: la principal lo corrigió.
- El aviso de `worktree.mjs mergear` por un «Qué queda» sin flecha no está codeado (la tabla de CONVENCIONES lo nombra): cambio de tool para Pipeline, con la Auditora. → descartado: ya está (`worktree.mjs mergear` avisa).
- Memorias de la parte 1: todas cubiertas; antes de borrar la 14 (`no-frenar-carga-por-socios`) falta en `Admin/TODO.md` la mejora de que el gate `perfil-en-cola` de `cargar.mjs` nunca frene. → descartado: la memoria ya está vaciada.

### Vuelta 4 de Orden 1 (2026-10-21): HALLAZGOS, flechas y propuesta de «Cómo verlo como archivo»

- `Admin/HALLAZGOS-pipeline.md`: las líneas de los descartes 314 (Stirling PDF contra Mistral) y 298 x2 (voz local de respaldo en escaneos).
- `Admin/propuestas/257-como-verlo-como-archivo.md`: texto exacto para mudar el párrafo «Cómo verlo como archivo» de `Admin/PANTALLA.md` a `navegador-de-preview.md`. No se aplicó.
- Cada punto de «Qué queda» de esta nota lleva su flecha.

### Qué queda (vuelta 4)

- Falta el ok de Guido al texto de `Admin/propuestas/257-como-verlo-como-archivo.md`; con su sí se aplica con Edit y se borra el párrafo de `Admin/PANTALLA.md`. → TODO: punto 8 del 257, (d).
