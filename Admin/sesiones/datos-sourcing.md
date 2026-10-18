# Cierre de la rama datos-sourcing (worktree fos-datos)

Lo que la principal pasa a TODO, CHANGELOG y ESTADO al mergear. Se va completando mientras la sesión trabaja.

## Qué cambió (CHANGELOG)

- **To-do 277 cerrado, y la premisa estaba vencida:** `data/club-leagues/it.js` estaba bien. Entre 2016 y 2019 Parma cerró el 30/6
  (`club-index`, `ci`): su 2017 es la Serie C 2016-17 y su 2018 la Serie B 2017-18. El error estaba en `tools/listas-lote.mjs`, que calculaba
  la temporada con la regla del club (`fiscalYearStart: 01-01`, cierre 31/12) en vez del cierre de cada ejercicio, y por eso buscaba a Parma
  en la Serie C 2017-18. Ahora usa `CI[id].ci[y]`, como `faltantes-liga.mjs`. Medido con `--ensayo`: 6 → 5 liga-años pendientes.
- **To-do 276: las listas de equipos que no salían.** Cambios en el lector (`tools/fetch-club-league-reference.mjs`):
  - **Matrícula:** si la 1ª celda de una fila es solo un número, el club es la celda siguiente (Bélgica 2024-25 daba 16 números).
  - **Grupos:** con secciones "Group A/B/C" (o "Girone"), se toma la mejor tabla de cada grupo y se juntan, si la unión es más grande
    que lo que da la sección de equipos y la contiene. Solo con 2 grupos o más y al menos 8 equipos en cada uno. La Serie C 2016-17 sale
    igual a la lista armada a mano (60, sin diferencias).
  - En `tools/listas-lote.mjs`: tope de 40 equipos por grupo, y `OTRO_IDIOMA`, títulos en otro idioma para ligas sin página en inglés
    (hoy solo Primera B Metro: "Campeonato de Primera B 2019-20 (Argentina)", sección "Equipos participantes"), que se prueban solo si
    ningún título en inglés pasa la compuerta.
  - `alias.json`: "Union SG" → `unionsg-be` (clave `be` nueva).
  - Ensayo: 5 de 5 liga-años pasan la compuerta. `--contra-cache`: 15 de 376 listas guardadas difieren de lo que baja hoy, pero el
    lector viejo da lo mismo que el nuevo en las 15 (son cambios de Wikipedia o de reglas anteriores, no se tocaron).
  - Guardadas las 5 listas (`listas-lote.mjs`): Primera B Metro 2020 (18) y 2021 (17), Pro League 2024-25 (16, `be.json` nuevo),
    Serie C 2023-24 (60) y Liga 1 de Perú 2020 (19). `faltantes-liga.mjs` regenerado (`data/faltantes/` con `ar-primerab.js` y
    `be-proleague.js` nuevos, `Admin/sourcing/pendientes.md`), ASSET_V 1254, `fuentes/` regenerado. `--print`: 0 alias rotos, 0 que faltan.
- **To-do 273 (en curso): `tools/estadio-sponsor.mjs --ensayo`.** Mide, sin escribir nada, cuánto estadio, capacidad, sponsor de camiseta
  (frente) y marca técnica se puede leer de las páginas de temporada de Wikipedia que ya usan las listas, por ejercicio cargado.
  Campos y fuente decididos por Guido (2026-10-18): esos 4, sin monto, fuente = revisión exacta de la página. Cobertura medida sobre 891
  ejercicios con lista: estadio 83%, sponsor 89%, marca 91% (38 ejercicios sin liga en club-leagues y 3 sin lista quedan afuera).
  Huecos: estadio de Rusia (la página lo trae en un mapa, no en tabla), Brasil C/D y Paulistas, Liga 3 de Portugal, ascensos de
  Argentina y Colombia sin tabla de kits.
- **To-do 273: guardado y compuerta.** `estadio-sponsor.mjs --escribir` escribe `data/contexto/<iso>.js` (18 países):
  `window.CLUB_CONTEXT[clubId][año] = { estadio, capacidad, sponsor, marca, temporada, fuente }`, `fuente` = permalink con `oldid`. Lo ya
  guardado no se vuelve a bajar (`--refrescar` sí). `tools/contexto-manual.json` (nuevo, vacío) gana campo por campo, con fuente
  obligatoria. Una tabla de kits "solo la actual" vale solo en la última temporada de la liga en la caché. Sobre 932 ejercicios: estadio
  79%, sponsor 85%, marca 87%; 238 sin estadio o sin sponsor (no se frenan: son ejercicios ya cargados).
  **Compuerta en `tools/cargar.mjs`** (`compuertaContexto()`, un solo punto antes de `escribir()`, acordado con fos-pipeline para que la
  del auditor del to-do 282 vaya al lado): corre `estadio-sponsor.mjs --escribir --club <id> --anio <año> --liga <liga> --cierre <MM-DD>`
  y no escribe si falta estadio o sponsor. `alta-club.mjs` no la necesita: da de alta el club sin ejercicios, y el primero pasa por
  `cargar.mjs`. También en `tools/bfo-rusia.mjs`, que escribe con `escribir()` sin pasar por el `main()` de cargar (aviso de fos-pipeline);
  ahí no frena un año ya cargado que solo se reescribe. Ojo: el estadio de Rusia no sale de Wikipedia (0 de 66), así que todo año ruso
  nuevo frena hasta completarlo a mano. ASSET_V 1255 (los archivos de `data/contexto/` todavía no los carga el sitio: los va a mostrar fos-pantallas en Finanzas).
- **To-do 273: índice de sponsors y marcas** (pedido de Guido: página por sponsor y por marca técnica, con su histórico y los equipos que
  sponsorea hoy; los equipos de toda la liga, los que el sitio no tiene en gris). `estadio-sponsor.mjs` ahora guarda una caché por liga-año
  con TODOS los equipos (`tools/club-league-reference/contexto/<iso>.json`; `--todas` para todas las listas, `--actuales` para la temporada
  en curso de cada liga; una página inexistente queda anotada). Lo guardado de cada club no cambió (932 de 932 iguales).
  `tools/generate-sponsors.js` (nuevo) → `data/sponsors.js`: 2402 sponsors y marcas (965 con algún club del sitio), 431 liga-años, "hoy" en
  52 ligas; ~650 KB. Un equipo se une a un club del sitio por nombre (un filial, "Benfica B", solo con su nombre exacto). Nombres unificados
  a mano en `tools/sponsor-alias.json` (17 variantes de espacio o ".com", y Fly Emirates = Emirates; las "X Group" no, sin verificar).
  `alias.json`: "Inter Milan" → inter-it y "Sporting de Braga" → braga-pt. Corre con los generadores de `cargar.mjs` y `alta-club.mjs`, y
  `audit.js` lo chequea (`sponsors-desfasado`, P1). ASSET_V 1256.
- **To-do 273: estadio de Rusia.** Las páginas rusas lo traen en una galería de fichas (sección "Venues"), no en tabla: lector nuevo
  `galeriaEstadios()` en `estadio-sponsor.mjs` (bloques club / estadio / capacidad, se acepta uno solo si las tres filas tienen las mismas
  celdas). Rusia: estadio de 0 a 55 de 66 ejercicios; total, estadio 82%. ASSET_V 1257.
- **To-do 273: limpieza (avisos de fos-pantallas).** El lector ya no deja pegado un atributo de celda ("nowrap data-sort-value=… |", 5
  valores, también limpiados en la caché). `tools/estadio-alias.json` (nuevo, por club) unifica el mismo estadio escrito de dos formas
  (La Bombonera = Alberto J. Armando, "Olimpico" = "Stadio Olimpico"...; 28 clubes); un cambio de nombre real (Allianz Stadium, Gewiss,
  Mâs Monumental, MorumBIS, Ozon Arena) queda. `--escribir` reconstruye todo desde la caché por liga-año (no baja lo que ya está).
  `generate-sponsors.js`: un equipo sin club con dos nombres ("AC Sparta Prague" / "Sparta Prague") se unifica por país y nombre
  normalizado, con el de la temporada más nueva. ASSET_V 1258.
- **To-do 273: Rusia por fuera de Wikipedia** (ok de Guido: web del club o fuente equivalente). En `tools/contexto-manual.json`, 11
  ejercicios: Krylia Sovetov 2021-2025 y Akron 2024-2025 (Solidarnost Samara Arena, 44.918; Gran Enciclopedia Rusa y Vedomosti), Dynamo
  Makhachkala 2024-2025 (Anzhi-Arena, sin capacidad: championat dice 28.000 y sport-express 30.000), Sochi 2024 (Fisht) y Spartak 2022
  (Otkritie Bank Arena); Akron 2021-2023 corregido a "Kristall (Zhigulyovsk)" (la tabla daba la ciudad; Vedomosti). championat.com no sirve como fuente por temporada (muestra el nombre de hoy en temporadas viejas). Después, con la pista de
  Gemini que trajo Guido verificada contra fuentes: Spartak 2023 (ejercicio = año calendario 2023, "Otkritie Bank Arena" hasta el
  31/12/2023 según TASS/fomag) y Baltika 2024 (Rostec Arena, dp.ru). Rusia: estadio en todos los ejercicios. ASSET_V 1261. Un dato manual guarda su fuente aparte (`fuenteManual` y `manual`: los campos que puso) y la de Wikipedia sigue en `fuente`.
- **To-do 273: ligas en null** (pedido de Guido: completarlas, sin liga no hay de dónde leer estadio y sponsor). `tools/ligas-sin-verificar.mjs`
  (nuevo): para cada ejercicio cargado con la liga en null, prueba las ligas del club en otros años y las demás del país con listas (baja la
  lista que falte, con el título de otra temporada de la misma liga), y decide solo si el club está con su nombre EXACTO (o un alias) en una
  sola. Medido: un parcial "único en la lista" daba Novorizontino 2010 en la Série A como "Grêmio" y Dynamo Makhachkala 2021 en la Premier
  como "Dynamo"; por eso solo exacto. Alias confirmados en `alias.json`: "Volos" → volosnfc-gr, "Spartak" → spartakmoscow-ru. Escritas 18
  ligas en `data/club-leagues/` con evidencia en `Admin/carga-clubes/` (Alverca 2022-2024 Liga 3, Católica 2010 y 2017-2021 y 2025,
  Ferro 2022-2023, Spartak 2021, Vila Nova 2014, Volos 2022-2025); generadores corridos (los estimados solo mueven el ancho de sus rangos).
  No toca los países de fos-onboarding. Estadio 88%, sponsor 86%. ASSET_V 1263.

## Qué queda (TODO)

- Ligas que siguen en null (20 ejercicios): Católica 2011-2016 (Chile jugó 2013-14 a 2016-17 con calendario europeo y Apertura/Clausura:
  otro título de página), Ferroviária 2010-2014 y Novorizontino 2010 (Paulistas sin lista), Kifisia 2022-2025, Levadiakos 2022, AVS 2021 y
  2023, Dynamo Makhachkala 2021 (FNL-2, liga fuera del catálogo), Fredericia 2019 (sin fila en dk.js), Zulte Waregem 2025 (Bélgica,
  fos-onboarding), y Racing 2026 (está en dos listas: Racing de Avellaneda y Racing de Córdoba; falta un alias).
- Borrar los to-dos 276 y 277 (resueltos; el 277 con la premisa vencida, ver arriba).
- 273 sigue abierto: completar a mano (`tools/contexto-manual.json`) los 238 ejercicios cargados sin estadio o sin sponsor
  (`node tools/estadio-sponsor.mjs --ensayo` los lista); mostrarlo en Finanzas (fos-pantallas); la página de cada sponsor (pedido de Guido:
  su histórico y qué equipos sponsorea hoy: los datos están en `data/sponsors.js`; falta la pantalla). Lo cargado a mano en
  `contexto-manual.json` todavía no entra al índice de sponsors (está por año de ejercicio, no por liga-temporada). `data/sponsors.js`
  pesa ~650 KB: si la pantalla lo carga entero, partirlo (por letra o por liga).
- La skill `club-or-year-onboarding` y `Admin/PIPELINE.md` tienen que nombrar la compuerta nueva de `cargar.mjs` (la skill, con ok de Guido).

## Qué deja de ser cierto en ESTADO

- Nada de las listas: ESTADO no las nombra.
- La lista de compuertas de `cargar.mjs` en ESTADO ("Pipeline") suma una: estadio y sponsor del ejercicio (to-do 273).

## Después del merge del 2026-10-18

- **To-do 273: la Wikipedia del país como fuente en lote** (ok de Guido). `estadio-sponsor.mjs --local` busca la página de la misma
  temporada en la Wikipedia local (pt, es, it, ru; tabla `LOCAL`) con la API de búsqueda, y la acepta solo si el título trae la temporada y
  la página nombra al menos el 60% de los equipos de la lista en inglés. Queda en la caché por liga-año (clave `local`; null = se buscó y
  no pasó). El lector aprende encabezados en esos idiomas ("Equipa", "Estádio, Cidade", "Squadra", "Proveedor"...), plantillas de club
  ({{Futebol Benfica}}) y entidades HTML. De la página local se toman SOLO estadio y capacidad: MEDIDO, en "Liga1 2022 (Perú)" la tabla de
  kits tiene las columnas corridas (ADT con sponsor "Huancayo", Alianza Lima con "Nike"). Lo que viene de ahí lleva `fuenteLocal` y la
  lista `local` de campos. Estadio de 88% a 96% (891 de 932); capacidad 89%.
- Limpieza (avisos de fos-pantallas): un sponsor "TBA", "TBD", "N/A" o sin letras ("0", "22") es un dato que falta; una capacidad menor a
  100 también. Alias de estadio: "Stadio Olimpico di Roma" (Roma y Lazio), "Estádio Com. Joaquim A. Freitas" (Moreirense).
- `generate-sponsors.js` escribe además `data/sponsors-indice.js` (pedido de fos-pantallas, para el buscador):
  `window.SPONSORS_INDICE = [[id, nombre, roles]]`, ~95 KB; `--check` mira los dos. ASSET_V 1272 (main estaba en 1271).

### Qué queda (TODO)

- 273: 140 ejercicios cargados sin estadio o sin sponsor (casi todos sin sponsor: ligas de ascenso y años viejos sin tabla de kits en
  ninguna Wikipedia). `node tools/estadio-sponsor.mjs --ensayo` los lista; van a `tools/contexto-manual.json` con fuente.
- `tools/generate-sponsors.js` todavía no suma lo de `contexto-manual.json` (está por año de ejercicio, no por liga-temporada).

## Después del segundo merge del 2026-10-18

- **To-do 252: la revisión mensual de ejercicios nuevos** (Guido: mensual, no semanal; que baje el PDF a Clubes/). `tools/ejercicios-nuevos.mjs`
  (nuevo, gratis): para cada club cargado, el ejercicio que sigue al último real cargado y si ya debería estar publicado (cierre + 4
  meses); lee las URLs del canal de su nota de sourcing (la carpeta sale de la evidencia de carga), busca links a PDF que nombran esa
  temporada y los estados financieros (filtro por nombre de archivo: fuera actas, dictámenes, edictos, presupuestos; un nombre sin
  palabras como "2-2023_2024.pdf" vale), y si la carpeta ya tiene un PDF de esa temporada no es nuevo (falta cargarlo). Con `--escribir`
  baja el PDF a `Clubes/<País>/<Club>/` (nombre ASCII; nunca pisa uno existente), escribe la sección "## Ejercicios nuevos (tarea
  mensual)" de `Admin/sourcing/README.md` (antes del índice de países, que no toca), el registro `Admin/registros/ejercicios-nuevos.json`
  (lo ya avisado no se repite) y, si bajó algo, regenera `data/faltantes/`, sube ASSET_V y regenera `fuentes/`.
  Primera corrida (2026-10-18): 1 PDF nuevo (Amazonas 2025, `Clubes/Brasil/Amazonas/demonstracoes-contabeis-2025-faf-1.pdf`, **copiado
  con rsync a la carpeta principal**), 14 clubes con el PDF ya en la carpeta sin cargar, 45 páginas para revisar con el navegador (37 notas
  sin URL, 2 clubes sin carpeta en la evidencia, el resto captcha o JavaScript), 196 todavía en plazo. ASSET_V 1273.
- Tarea programada mensual (día 1, 9:00, en esta Mac, carpeta principal): corre el script y revisa con el navegador las páginas que el
  script no pudo leer. Ver "Qué queda".

### Qué queda (TODO)

- 252: las 37 notas de sourcing sin URL del canal (la tarea las marca "a revisar" todos los meses): agregarles la URL.
- 252: los 14 clubes con el PDF del ejercicio siguiente ya bajado y sin cargar (los lista `node tools/ejercicios-nuevos.mjs`): onboarding.

## Después del tercer merge del 2026-10-18

- **252: Dinamarca sin URL, resuelto por el canal y no por la nota.** El canal danés es la API del registro (`distribution.virk.dk`, por
  CVR), no una página. `ejercicios-nuevos.mjs` saca el CVR de la nota ("CVR 83 83 99 10", con espacios) y pide el informe anual
  (AARSRAPPORT, no el semestral) del ejercicio que cierra en la fecha esperada; lo baja como `aarsrapport-AAAA-MM-DD.<pdf|xhtml>`, el
  nombre que ya usa la carpeta. "Ya bajado" reconoce también la fecha de cierre o la temporada en el nombre (SønderjyskE pasó de junio a
  septiembre: "aarsrapport-2022-2023-09-30-transicion"). Los 11 clubes daneses ya tienen el informe del ejercicio siguiente en su carpeta.
- El script nombra los clubes con el PDF ya bajado y sin cargar (consola y una línea del README), y una segunda corrida el mismo día
  reemplaza el bloque de ese día. Corrida de hoy: 26 ya bajados sin cargar, 34 a revisar con el navegador (antes 45), 0 nuevos.

### Qué queda (TODO)

- 252: notas sin URL del canal (Portugal 9, Argentina 4, Inglaterra 3, Brasil 3, Alemania 2, Perú, Italia y Chile 1; Colombia 2 es de
  fos-onboarding). Inglaterra y Alemania probablemente sean de registro (Companies House, Unternehmensregister), como Dinamarca: canal
  por API en el script, no URL.
- 26 clubes con el PDF del ejercicio siguiente ya bajado y sin cargar (los lista `node tools/ejercicios-nuevos.mjs`): onboarding.
- **252: Inglaterra y Alemania, también por el canal.** Reino Unido: el número de Companies House de la nota ("Companies House n° 04250459";
  en Arsenal el del grupo) y `tools/companies-house-fetch.mjs --list --json` (salida nueva: la serie con fecha de cierre, tipo y URL); el
  ejercicio que cierra en la fecha esperada se baja con el nombre que ya usa la carpeta (`<slug>-<group|full>-accounts-<temporada>.pdf`).
  Arsenal, Liverpool y West Ham 2025-26 todavía no se presentaron (Companies House da 9 meses: llegan hacia febrero de 2027). Alemania: el
  Unternehmensregister pide un formulario con sesión, así que el club queda "a revisar con el navegador" con la razón social exacta a buscar
  (Mönchengladbach, Stuttgart). Nueva línea del README y de la consola: "el registro todavía no lo publicó".
