# Cierre de la rama `pipeline` (sesión Pipeline 2: to-do 298 t y u primero, después el resto del plan)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- **El estado belga por sus códigos NBB (to-do 298 t, ok de Guido 2026-10-18: "escalón, no manta corta").** `tools/nbb.mjs` (nuevo) lee el
  estado de resultados del esquema NBB por sus códigos legales: las hojas del esquema con el signo de su código (reversiones "(+)/(-)"
  negativas restan; el detalle 600/8 + 609 o 650/652/9 si suma su renglón, nunca los dos; la Brutomarge abreviada se abre en Omzet/60/61 +
  el residuo implícito si el residuo no es negativo, y si no queda sin abrir; negativa, como gasto). Lee tablas y texto suelto (OH Leuven
  2019 y 2021); una línea de texto con un solo importe va a la única columna con la que el año cierra. `tools/verificar.mjs`: escalón
  "códigos NBB", compuerta: cierran exacto todos los totales impresos del año; si no cierra, o el documento tiene ajustes `fila`, la
  escalera de siempre. Con las filas NBB la escalera prueba primero la lectura 4. Además: el año vecino se compara por los códigos 9904 y
  9901 impresos cuando los ingresos se presentan distinto, y el caso "primer año" no hace falta con el estado por códigos.
  Cubre las 7 reglas de la t: Beerschot 2021 gastos 15,1 M (antes 30,7 M); Lommel SK 2023 contra 2024 coincide; Lierse SK 2019-2021 y
  Patro Eisden 2021 con la Brutomarge negativa como gasto; Patro Eisden 2022 y 2023 y Lokeren-Temse 2021-2023 con el residuo (768.543,
  1.451.259, 76.401, 64.280, 551.469); el financiero abreviado restando; las reversiones restando; OH Leuven 2021 con el estado de la
  pág. 8 del visor (ingresos 11.399.352, gastos 28.279.767). Patro Eisden 2020 -correction: Brutomarge 277.991 sin abrir (decisión de Guido).
  Medido (medir-verificar, 2 pasadas, prueba-completa + los 60 belgas con verificación): los 358 de otros países idénticos; en Bélgica 17
  documentos de cola a OK, ninguno de OK a cola. medir-cargar sobre Bélgica: los 10 años publicados se reproducen (10 de 10, como antes).
  Auditoría P0 0 / P1 0. Commit 610179d6f7.

## Qué queda (para TODO)

- 298 t, lo que no cubre: los años 2025 belgas ya cargados tienen ajustes `fila` (Beerschot, Lierse SK, Lokeren-Temse, Lommel SK, OH
  Leuven, Patro Eisden, RWDM) y el escalón no corre en ellos (manda el ajuste). Dos quedaron cargados con errores chicos que el escalón
  hubiera evitado: Patro Eisden 2025 (ingresos 1.810 de más por el "waarvan" 76A; gastos 4.012 de más por el 631/4 impreso −2.006 sumado
  como +2.006; cerró por la tolerancia) y Lommel SK 2025 (gastos 172 de más: el 609 impreso −86 leído +86). Lommel SK 2018 (cargado) da
  −182 EUR de financiero que la carga vieja no tenía (cerraba por tolerancia). Decidir con Guido si se corrigen y cómo (escalón: correr el
  NBB también con ajustes si con ellos el resultado sigue exacto).
- Bélgica (lote 92) ya no espera a la t; espera a la u. Los documentos cuyas filas cambiaron (Beerschot 2020, OH Leuven 2019 y 2020, Patro
  Eisden 2016 y 2019, entre otros) vuelven a categorizar en el lote (etapa 7, ~US$ 0,03 por documento).

## Qué deja de ser cierto en ESTADO

- Bélgica no se frena por el esquema NBB (to-do 298 t hecho); sigue frenada por la compuerta de estadio y sponsor (298 u).

## Para fos-onboarding (cómo se carga)

- Un documento belga con el estado NBB con códigos se verifica por sus códigos: las filas que llegan a la categorización son las hojas del
  esquema (con el rótulo que extrajo la IA en esa línea, o el del .md). Una fila de nota sigue abriendo su renglón si suma.
- Un documento belga con ajustes `fila` se verifica como antes.

## Después del merge de la 298 t (2026-10-18)

### Qué cambió (para CHANGELOG)

- **La liga de un año nuevo (to-do 298 u, ok de Guido 2026-10-18: "mientras no rompa nada, ok a todo").** `tools/listas-lote.mjs --lote
  <lista>`: además de su modo de siempre, baja las listas de equipos que faltan de los años de los documentos de la lista (la fecha de
  cierre del registro), para cada liga del país con nombre en NOMBRES, también con sus nombres viejos (OTROS_NOMBRES; Bélgica: Second /
  Third / Fourth Division antes de 2016, First Division A y B y First / Second Amateur Division 2016-2020, como el mismo escalón de la
  pirámide). Compuerta de la lista, la de siempre. NOMBRES suma be-challengerproleague, be-div1amateur y be-div2amateur. `tools/lote.mjs
  --cargar` la corre antes de cargar-lote (sin `--ejecutar`, en ensayo). `tools/alta-club.mjs` (proponerLiga): un alias de
  `tools/club-league-reference/alias.json` vale como el nombre exacto. Alias belgas nuevos: "Oud-Heverlee Leuven" (OH Leuven), "RWDM47" y
  "RWD Molenbeek" (RWDM), "Patro Eisden Maasmechelen", "Lierse Kempenzonen" (Lierse SK desde 2018-19; el viejo Lierse S.K. no), "Beerschot
  Wilrijk", "Lommel United". Medido: ensayo de listas-lote sobre el lote 92, 41 de 51 listas pasan la compuerta; con ellas, 44 de 55
  documentos encuentran su liga (los 11 restantes quedan sin decidir, ninguno mal); medir-cargar de los 815 documentos idéntico (el alias
  solo cuenta en años sin fila de liga). Auditoría P0 0 / P1 0. Commit 48d52fb26d.

### Qué queda (para TODO)

- **La compuerta de estadio y sponsor (to-do 273) sigue frenando a Bélgica.** Con la liga resuelta, de los 40 años con liga del lote 92,
  18 pasan y 22 frenan: "falta sponsor" en la Pro League y la Challenger (Beerschot 2022 y 2024, OH Leuven 2022-2024, Lierse SK 2023-2024,
  Lommel SK 2024, Patro Eisden 2015 y 2024, RWDM 2024) y "falta estadio y sponsor" en las ligas amateur (Lierse SK 2019-2020,
  Lokeren-Temse 2023-2024, Patro Eisden 2017-2023, RWDM 2019). Lo que falta va a `tools/contexto-manual.json` con fuente, o a otro escalón
  de estadio-sponsor.mjs (`--local`, la Wikipedia del país). Medido corriendo la compuerta y restaurando data/contexto.
- **Decisión para Guido: las ligas belgas de ascenso y amateur en Ligas.** Cuando el lote guarde las listas nuevas (be-challengerproleague,
  be-div1amateur y be-div2amateur 2013-2025), faltantes-liga.mjs y estimar.mjs les arman faltantes y estimados (archivos nuevos en
  data/faltantes/ y data/estimados/, +123 líneas en Admin/sourcing/pendientes.md): se ve en el sitio con el primer año que se cargue.
  Se midió en la rama y se revirtió; no está commiteado.
- **298 u, lo que no decide:** listas de un solo grupo (Third Division antes de 2016, Second Amateur Division / Division 2: Lokeren-Temse
  2021-2022, Patro Eisden 2013-2014 y 2019); la First Division B 2017-18 y 2018-19 baja con 7 equipos de 8 (falta Beerschot Wilrijk: la
  tool que baja las listas pierde una fila) y la compuerta la rechaza (OH Leuven 2017-2019, Beerschot 2019). Letra aparte, con su escalón.
- **Caso para la 298 f:** Lierse SK 2023 tiene en el registro el cierre 2023-10-28 (la asamblea, .md L27) y no el 30-06-2023 de la celda
  (L33): con ese cierre, la carga le daría la temporada 2023-24. Es el mismo defecto de la f (fechas del cierre en celdas).

## Después del merge de la 298 u (2026-10-18)

### 298 x (pedido de la principal, hallado por Onboarding 2)

- **Qué cambió (para CHANGELOG):** `tools/generadores.mjs` (nuevo) tiene la lista de generadores que se corren antes de la auditoría al
  escribir en el sitio; la usan `tools/cargar.mjs` (sin cambios en la lista) y `tools/alta-club.mjs`, que no corría
  `faltantes-liga.mjs` ni `estimar.mjs`: toda alta nueva dejaba desfasados data/faltantes y data/estimados, la auditoría daba 2 P1 y el
  alta se revertía (FC Volendam, lote 93). `queFalla()`: el aviso "dio P0/P1" de los dos dice ahora qué chequeo falló
  ("faltantes-desfasado, asset-v-sin-subir"). Medido: alta de FC Volendam 2024-25 escrita en la rama con P0 0 / P1 0 y después deshecha;
  `queFalla` probado con un faltantes desfasado a propósito. Commit ed60e8d2b5.
- **Para fos-onboarding:** las altas que se revertían por "P1 2" ya entran; reintentar las del lote 93 y las 11 del borrador de Finanzas.

## Después del merge de la 298 x (2026-10-18)

### Decisión de Guido (2026-10-18, por la principal)

- Las ligas belgas de ascenso y amateur: "Sí: que el lote guarde las listas belgas de ascenso y amateur aunque eso les arme faltantes y
  estimados en Ligas." No cambia nada en las tools (es lo que ya hace `lote.mjs --cargar`).

### 282 g: el informe del auditor en estonio (ok de Guido 2026-10-18)

- **Qué cambió (para CHANGELOG):** `tools/auditoria.mjs` (ANCLA de `--extractos`) suma 7 frases estonias del criterio de Finanzas:
  "vandeaudiitor", "meie arvates", "märkusega arvamus", "vastupidine arvamus", "arvamuse avaldamisest loobumine", "tegevuse jätkuvus",
  "asjaolu rõhutamine". Medido (gratis): de 66 `.md` estonios, 43 con extracto (antes 0), y son los 43 con línea "sin_salvedades"; los 23
  sin ninguna mención de auditoría (los 15 "sin_informe" y los 7 de Pärnu Vaprus, que no está en el sitio) siguen "sin frases". Ninguna de
  las frases aparece en `.md` de otros países: sus extractos no cambian. Auditoría P0 0 / P1 0.
- **Qué queda (para TODO):** la 282 g, hecha.

## Después del merge de la 282 g (2026-10-18)

### 298 e: el control "sin tablas" (ok de Guido 2026-10-18: "ok. ok. mistral")

- **Qué cambió (para CHANGELOG):** `tools/pipeline.mjs` (`sinPasarPorElLote`): una transcripción vieja sin tablas se marca `sin-tablas` si
  nunca pasó por verificar (sin `.verificacion.json`), no si le falta la marca de Jev de la preparación vieja (casi todos la tienen: el
  control marcaba 0). Medido con copia de los registros: `pipeline.mjs --lista Admin/lotes/sin-tablas-298e.txt --ejecutar` marca 238
  (gratis); el ensayo siguiente da 238 documentos, 8.334 páginas, ~US$ 7,26. Lista nueva `Admin/lotes/sin-tablas-298e.txt`. Auditoría
  P0 0 / P1 0. Commit 562c5eb6e5 (y el de la lista).
- **Decisiones de Guido:** se rehacen también los 43 belgas que ya se leen por los códigos NBB (para las notas); los 100 de la lista de
  los 319 de la 292 van por Mistral, no con subagentes.
- **Qué queda (para TODO):** correr los dos comandos de abajo en la carpeta principal después del merge (el segundo es pago, lo corre
  Guido). Después, esos documentos entran a los lotes de carga de cada país como cualquier otro.
- **Comandos (carpeta principal, después del merge):**
  1. `node tools/pipeline.mjs --lista Admin/lotes/sin-tablas-298e.txt --ejecutar` (gratis: solo marca `sin-tablas`).
  2. `caffeinate -i node tools/pipeline.mjs --lista Admin/lotes/sin-tablas-298e.txt --max-paginas 0 --limit 0 --ejecutar` (~US$ 7,26).

## Después del merge de la 298 e (2026-10-18)

### 298 f: el período que declara el formulario (ok de Guido 2026-10-18: "si es un escalón que no rompe nada, sí")

- **Qué cambió (para CHANGELOG):** `tools/periodo.mjs`, paso 3b: si los títulos no deciden, vale la frase fija del período del formulario,
  en celdas de tabla o en prosa ("boekjaar dat de periode dekt van … tot …", "exercice couvrant la période du … au …", y el par estonio
  "aruandeaasta algus / lõpp"); compuerta: fin de mes al final, 1 a 18 meses, una sola fecha de fin. Medido sobre los 3.429 `.md`: cambian 17
  (16 belgas y Harju JK Laagri 2023); 12 pasan al cierre correcto (Lierse SK 2023 y 2025 dejan la fecha de la asamblea; Beerschot 2019
  -correction deja el inicio del ejercicio, que era el caso de la 298 s; los demás no tenían cierre), Harju JK Laagri 2023 pasa a 31-12-2023
  y 4 primeros ejercicios largos dejan de verse anuales. Ninguno de los cargados cambia. Auditoría P0 0 / P1 0. Commit e2a41fa8e8.
- **Qué queda (para TODO):**
  - **Letra nueva (298 z): cargar los primeros ejercicios de más de 12 meses** (decisión de Guido: "son parciales, pero corresponde
    cargarlos; es complicado porque son su propio caso, pero deberían"). Casos: Anderlecht 2011 (16 meses, 24-02-2010 a 30-06-2011), RAAL La
    Louvière 2018 (14, desde 12-05-2017), Sint-Truiden 2013 (15, desde 05-04-2012) y Zulte Waregem 2012 (17, desde 03-02-2011). Diseño a
    decidir: cómo se muestra un año de más de 12 meses en el sitio y cómo compara con los vecinos.
  - La 298 s queda en parte cubierta (el cierre de Beerschot 2019 -correction); falta ver si localizar sigue eligiendo la columna "Vorig
    boekjaar" vacía con el cierre bueno.

## Después del merge de la 298 f (2026-10-18)

### 298 g: el 630 belga partido por la nota (ok de Guido 2026-10-18: "como escalón, no manta corta")

- **Qué cambió (para CHANGELOG):** `tools/nbb.mjs` (`partir630`): en el estado NBB, si los códigos "Geboekt" / "Actées" de la nota de
  activos fijos (8072 y 8079 pases, 8073 goodwill, 8271-8276 y 8279 materiales) suman EXACTO el 630, el 630 se reemplaza por esas partes,
  con los rótulos de los ajustes ya cargados ("Afschrijvingen immateriële vaste activa (spelers)", "Afschrijvingen goodwill",
  "Afschrijvingen materiële vaste activa"); si no suman, el 630 queda entero (la cola, como antes). `tools/verificar.mjs`: no lo parte en
  un año ya publicado. Medido: 33 de 191 documentos belgas con 630 lo parten (Lommel SK 2023: 4.986.964 + 295.242; RWDM 2024: 6.990.742 +
  464.020); no suman 15 (Beerschot 2021: parte de lo amortizado está en el 66A); sin esos códigos 143. medir-verificar (prueba-completa +
  belgas, 2 pasadas): 25 documentos cambian de filas, ninguno de totales ni de estado; medir-cargar --contra-sitio de Bélgica, 10 de 10.
  Auditoría P0 0 / P1 0. Commit f7abf3a3f2.
- **Qué queda (para TODO):** la 298 g en general (partir en la cola cualquier fila según su nota, para otros países o el 66A de Lommel SK
  2025) no se hizo: el caso que la motivó, el 630 belga, sale solo. Retomarla si aparece otra fila mixta que no tenga códigos.
- **Para fos-onboarding:** los documentos belgas cuyas filas cambiaron vuelven a categorizar en el lote (etapa 7, ~US$ 0,03 por documento).

## Después del merge de la 298 g (2026-10-18)

### 298 h: un no_es_rubro que deja un renglón sin filas (ok de Guido 2026-10-18, con freno)

- **Qué cambió (para CHANGELOG):** `tools/cola.mjs --responder`: en un caso de categoría, `corregir --valor no_es_rubro` no se guarda si
  la fila vino de una nota que abre un renglón del estado (origen "nota que desglosa X" o "desglose de X" en el `.verificacion.json`; vale
  el padre más cercano) y, con esa respuesta y las otras `no_es_rubro` del documento, al renglón no le queda ninguna fila: avisa que el
  renglón se perdería entero y pide la categoría; `--igual` la guarda igual. Medido sobre las 7 respuestas `no_es_rubro` que tuvo la cola:
  frena solo las 2 de Narva Trans 2025 ("sh" de "Riigi ja KOV toetused", 42.848 + 109.938 = 152.786). Probado con copia de la cola: la
  primera "sh" pasa (queda la otra), la segunda frena, Vitória Guimarães 2021-22 (fila sin nota) pasa. No cambia nada de lo que se
  carga. Auditoría P0 0 / P1 0. Commit d306d3f42c.
- **Para fos-onboarding y los subagentes de la cola:** si `--responder` contesta "No guardé la respuesta: … se queda sin filas", la
  respuesta correcta suele ser la categoría de las filas, no sacarlas.

## Después del merge de la 298 h (2026-10-18)

### 298 i: el país de un club nuevo (ok de Guido 2026-10-18; Gales, Escocia e Irlanda del Norte como GB)

- **Qué cambió (para CHANGELOG):** `tools/paises-referencia.json` (nuevo): tabla de referencia ISO por nombre de carpeta en castellano
  (ISO2, moneda ISO 4217, región del selector, nombre en inglés y la moneda de antes del euro de Eslovaquia, Eslovenia, Letonia, Lituania,
  Finlandia, Irlanda, Malta, Chipre y Luxemburgo). `tools/alta-club.mjs` (`paisDe`): escalón 0 la tabla PAISES, escalón 1 la referencia si
  una sola entrada coincide sin tildes; la fuente del campo lo dice. Escocia pasa a GB en PAISES (antes era una pregunta). Medido: las 32
  carpetas de `Clubes/` sin fila en PAISES se resuelven (ninguna tiene todavía un `.md`, así que el alta entera no se pudo probar con
  ellas); el alta en ensayo del primer documento de cada país con fila sale idéntica, salvo Celtic (Escocia): `celtic-gb`, país GB, sin las
  preguntas de id y país. Auditoría P0 0 / P1 0. Commit 5c16518381.
- **Qué queda (para TODO):** el país en el selector del sitio (`data/leagues.js` COUNTRIES, con nombre y bandera) sigue aparte para cada
  país nuevo; Escocia, Gales e Irlanda del Norte se ven como GB ("Inglaterra", bandera inglesa) hasta que se decida otra cosa en pantalla.

## Para la sesión nueva (Pipeline 3): por dónde seguir (2026-10-18, cierre de Pipeline 2 por contexto)

Estado: rama `pipeline` limpia, todo commiteado; la 298 i (5c16518381, 90a7e3ac80) es lo último y espera merge. Hecho en esta sesión: 298 t, u,
x, e, f, g, h, i y la 282 g. Antes de nada: `node tools/worktree.mjs preparar /Users/guidopablomamonesoneira/Claude/Projects/fos-pipeline`.
Cómo se trabajó: cada letra con diseño + medición gratis y el ok de Guido ANTES de codear (en la f me lo salteé: no repetirlo); medir antes y
después (`medir-verificar --pasadas 2`, `medir-cargar --contra-sitio`, foto completa de la tool que cambia); un commit por cambio; nota acá y
aviso a la principal con el comando que haga falta. No se mergea main en la rama.

**Orden de las letras que quedan (el detalle de cada una, en la lista de pendientes de la principal):**
1. **298 y** (de Onboarding 2; la primera, porque toca años que se están cargando). NRS noruego: Annen finanskostnad, Annen rentekostnad y
   Rentekostnad sumados como ingreso financiero (Vålerenga, Aalesund, Viking, Sarpsborg 08, Fredrikstad 2018 y 2024); "Sum driftsinntekter"
   sumado junto con su renglón (Fredrikstad 2024); St. Gallen, "Erträge netto" junto con su desglose y los "-" al revés. Detalle en
   Admin/sesiones/onboarding.md de la rama onboarding (commit 89a2a53698, debajo de "Después del quinto merge del 2026-10-18"): esperar a que
   esté en main. Después, anular con medición los 11 ajustes a mano del lote 94 que lo tapan.
2. **298 w** (de Onboarding 2): antes-de-localizar dice que el perímetro "se decide al ejecutar", pero lote.mjs frena igual.
3. **298 l, m, n, p**: repreguntas en un club ya dado de alta (reportType por año; perímetro contra el año cargado y no contra el ajuste del
   club; año vecino con otro perímetro; ceros reales y perfil que vuelven cada año).
4. **298 q**: el ensayo de lote.mjs cobra la categorización de documentos ya cargados o ya categorizados.
5. **298 s** (lo que falta): con el cierre bueno (lo arregló la f), ver si localizar sigue eligiendo la columna "Vorig boekjaar" vacía
   (Beerschot 2019 -correction).
6. **298 v**: el final de lote.mjs lista como frenados los originales reemplazados por su -correction.
7. **298 u2**: listas de ligas en grupos (Third Division belga antes de 2016, Second Amateur / Division 2) que bajan con un solo grupo, y la
   First Division B 2017-18 y 2018-19 que fetch-club-league-reference baja con un equipo menos (falta Beerschot Wilrijk).
8. **298 z**: cargar los primeros ejercicios de más de 12 meses (Anderlecht 2011, RAAL 2018, Sint-Truiden 2013, Zulte Waregem 2012; Guido: "son
   parciales, pero corresponde cargarlos").
9. **298 g2**: partir en la cola cualquier fila según su nota (otros países, el 66A), solo si aparece otra fila mixta sin códigos.
10. Después, del plan: 310, 290, 232, 279, 286, 287, 301, 302, 306, 307.
11. **298 e3 (letra nueva, de la principal):** el ensayo de `pipeline.mjs` sobre `Admin/lotes/sin-tablas-298e.txt` estimó ~US$ 7,26 y la
   corrida real va camino a ~US$ 36 (US$ 8,91 a los 59 de 238 documentos). Ver por qué el ensayo de resolver-inventario subestima cinco veces
   un rehacer de `sin-tablas` (¿cuenta solo las páginas dudosas de Claude y no el costo de Mistral por página, o la validación de todas las
   páginas de un `.md` nuevo?) y que el ensayo dé el número real antes de la próxima corrida grande. Medir contra el registro de costos de
   esta corrida (tools/gasto.mjs).

**Decisiones de Guido abiertas:**
- **298 t2:** Patro Eisden 2025 (ingresos 1.810 y gastos 4.012 de más), Lommel SK 2025 (gastos 172 de más) y Lommel SK 2018 (falta un financiero
  de −182): cargados con ajustes `fila`, así que el lector NBB no corre en ellos. ¿Se corrigen y cómo? (propuesta: que el escalón NBB corra
  también con ajustes si con ellos el resultado sigue exacto).
- **298 e2:** la corrida paga de Mistral de los 238 `.md` sin tablas (~US$ 7,26), en la carpeta principal: `caffeinate -i node
  tools/pipeline.mjs --lista Admin/lotes/sin-tablas-298e.txt --max-paginas 0 --limit 0 --ejecutar` (la marca gratis ya la corrió la principal).
- Escocia, Gales e Irlanda del Norte se ven como GB ("Inglaterra", bandera inglesa) en el selector: decisión de pantalla pendiente.

## Pipeline 3

- **298 y1 hecha** (bceafe97c4, ok de Guido 2026-10-18): FIN_GASTO / FIN_INGRESO noruegos en singular ("Annen finanskostnad", "Annen
  rentekostnad", "Rentekostnad"). Medido con `medir-verificar --pasadas 2` sobre 366 documentos (prueba completa + los 7 noruegos con
  filas): 360 idénticos, OK 346 -> 348. Cambian solo los 6 noruegos del lote 94: Viking AS 2025 y Fredrikstad FLI 2018 cierran exacto;
  Vålerenga AS 2025, Aalesund AS 2025 y Sarpsborg 08 FLI 2025 dejan de dar "no cierra" (les quedan las dudas de otras etapas).
- **298 y2 resuelta por la y1, sin código propio:** en Fredrikstad 2024 (acta 2025), con el signo financiero bien, la lectura 5 reconoce
  "Sum driftsinntekter" como subtotal: ingresos 185,45 M -> 92,73 M y el resultado cierra exacto.
- Sigue: **298 y3** (St. Gallen 2024-25: "Erträge netto" consolidado sumado junto al desglose por sociedad, y los signos de L330 y L403).
  Después, **y4**: con la y en main y el merge de onboarding hecho, sacar los ajustes `fila` noruegos del lote 94 (8 de los 11) y medir que lo
  cargado quede igual.
- **298 y3 hecha** (ok de Guido 2026-10-18), tres escalones en verificar.mjs, un commit cada uno, medidos con `medir-verificar --pasadas 2`
  sobre los mismos 366 documentos:
  a) 10bb653925, la nota de un renglón que resta hereda su signo en la lectura 4: 365 idénticos. Cambia Vitória Guimarães 2021-22 (cargado):
     "Imparidade de dívidas a receber" +100.695 (reversión) abierto en su nota ya resta, la lectura 4 cierra exacto y gana sobre la 5. Mismos
     totales; lo publicado no cambia. `medir-cargar --contra-sitio` sobre ese documento frena porque la verificación abre filas de nota sin
     categorizar ("Programas computador", amortización por clase): solo pesa si se recarga ese año (etapa 5, centavos).
  b) d6bd922a54, un total salteado por "subtotal repetido" cierra con lo que salió de sus partes: 365 idénticos, cambia solo St. Gallen.
  c) 719f2c133b, un ajuste `fila` que saca un renglón sin lado se respeta en las lecturas 3 y 4: 366 idénticos.
  Simulado con los 2 ajustes de la compensación entre sociedades ("Entschädigung" ±11.500, L268-269, de la rama onboarding): St. Gallen cierra
  exacto, ingresos 45,101 M, gastos 44,681 M, resultado 0,117 M. Auditoría P0 0 / P1 0.
- **y4 (después del merge de pipeline y onboarding):** sacar los ajustes `fila` que tapaban la y (8 noruegos y 3 de St. Gallen: "Erträge
  netto" L261, L330 y L403) y DEJAR los 2 de la compensación "Entschädigung" (L268-269): son una decisión de la cola, no un defecto del script.
  En los 718 `.filas.json` hay un solo par de filas sin lado que se anulan (+X / −X): no hace falta un escalón para eso.

## Después del merge de la y1-y3 (2026-10-19)

- **298 y4, parte 1** (702f59ccc0, decisión de Guido 2026-10-19: "saca los 6 por ahora"): salen los 6 ajustes `fila` de Vålerenga,
  Aalesund, Viking y Sarpsborg 08 2025. `medir-cargar --contra-sitio`: los 4 reproducen lo publicado; `--comparar`: 0 diferencias.
- **Quedan 5 ajustes** (Fredrikstad 2024 acta 2025, L1064 y L1077; St. Gallen 2024-25, L261, L330 y L403). Medido sin ellos: los números
  dan iguales, pero los dos años frenan. Fredrikstad vuelve a abrir "primer-anio": la respuesta guardada de `primer-anio-ia` está atada a la
  huella del pedido, que cambia sin los ajustes. St. Gallen frena porque el `.categorias.json` queda viejo por huellas (L330 y L403 pasan de
  "ajuste manual" a "nota que desglosa"). Le pregunté a Onboarding 2 si ya están resueltos en main; si no, se quedan (son correctos), o se
  sacan corriendo `primer-anio-ia --ejecutar` y la etapa 5 de St. Gallen (centavos).

## Después del merge de la y4 (2026-10-19)
- **Los 5 ajustes se quedan** (Onboarding 2, 2026-10-19: los años ya están cargados bien; no se contestó ni recategorizó nada en main después
  de la carga). Anotado en Admin/HALLAZGOS-pipeline.md, "Conocido, sin daño hoy": se sacan solo si hay que recargar esos años por otro
  motivo. Con esto la y4 queda cerrada.
- **298 w hecha** (ok de Guido 2026-10-19, dos escalones en perimetro-senales.mjs):
  1) 69023925b1, el ensayo usa la respuesta GUARDADA de A2 y dice qué frena. Lotes 93-94 simulados sin sus 129 ajustes de perímetro
     (restaurados): antes-de-localizar pasa de "0 de 36 frenarían" a 13, los mismos 8 + 5 que frenaron al ejecutar.
  2) 3c598e75ca, paso A3: cuando A2 ve los dos estados sin totales para votar, Claude (Sonnet) contesta si alguna controlada hace el
     negocio del fútbol del club, con la línea que la nombra. Solo "consolidado" decide (un "individual" o "no_se" frena como antes).
     Medido con un subagente sobre los 10 casos: 6 bien, 0 mal, 3 no decide, 1 sin fijar (Willem II). Con esas respuestas como caché
     (simulada y borrada), los lotes 93-94 pasan de 13 frenados a 6. Sin respuesta guardada no cambia nada: perimetro-verdad.tsv
     (61 bien, 0 mal), --decidir-clubes de 99 carpetas y antes-de-localizar de los lotes 93-94, idénticos. Auditoría P0 0 / P1 0.
  79aa1c2e73: el motivo del ajuste de perímetro de PEC Zwolle (sigue consolidado) decía "academia", que el documento no dice; ahora cita L778.
  Willem II: A3 dice consolidado ("Willem II Tilburg B.V.", L550); lo está fijando Onboarding 2.

## Después del merge de la w2 (2026-10-19)

- **298 e3 hecha** (6d92cfa468, ok de Guido 2026-10-19). La causa: un `.md` viejo sin tablas (< 5 renglones "|", 2+ págs., motor que no es
  Mistral) se rehace entero con Mistral en el paso −0.5 de `resolveDoc()`, y el ensayo (`dryRunDoc`) no lo contaba: cotizaba solo la
  validación del `.md` viejo. Corrida sin-tablas-298e (238 docs): el ensayo daba US$ 7,26 y costó 43,09 (`gasto.mjs --desde 2026-10-19`:
  Mistral 33,34 por 8.335 páginas, validación ~10); con el arreglo, 40,60. Ensayo de todo lo pendiente (9.471 docs): de US$ 1.761,02 a
  1.844,17. Los +83,15 son exactamente Mistral de las 20.788 páginas de 368 documentos (206 de "texto" y 162 de "escaneo"). La validación de
  cada documento y el resto de los planes dan igual. **Aviso para la próxima corrida grande:** esos 368 documentos (221 en "revisar", 102 en
  "pendiente-segunda-voz", 38 en "sin-tablas") se van a rehacer con Mistral (~US$ 83 más la validación) apenas pasen por `resolver-inventario`.

## Después del merge de la e3 (2026-10-19)

- **Eerste Divisie** (52de3d44b4, ya en main): le alcanza el estadio, como a las ligas amateur (decisión de Guido vía Onboarding 2).
- **298 l hecha** (57b582095f, ok de Guido 2026-10-19). Escalón 2 de `reportType` en `analizar()` de alta-club.mjs: si la única pregunta es
  "¿trae un estado de resultados?" (STATEMENT no reconoce las palabras, como en estonio, o casi no hay tablas) y la verificación del
  documento cerró con el resultado impreso, es un balance anual. Presupuesto, intermedio y nombre sospechoso siguen preguntando. Medido
  sin los 86 ajustes `reportType` (simulado y restaurado): de 72 frenos `alta:reportType` a 4 (Monza 2022 y tres de Benfica, rama
  intermedio). Lote completo (350 docs) con los ajustes reales: `--comparar` 0 diferencias, `--contra-sitio` igual antes y después.
  1b2c34df38: salen los 59 ajustes `reportType` estonios; con y sin ellos, 59 de 59 reproducen lo publicado, 0 diferencias.
  Sigue: la m (el perímetro en la carga compara con el año cargado más cercano y no con el ajuste del club).

## Después del merge de la l (2026-10-19)
- **Lotes de prueba al día** (6404b0504b, pedido de Guido 2026-10-19). `tools/lotes-prueba.mjs` (gratis; `--escribir` reescribe) arma la
  mediana (la rápida + 3 documentos por club: más viejo, del medio y más nuevo) y la completa (todos los documentos con verificación) desde
  `Generados/`. La rápida sigue a mano: +18 casos de esta semana (62). Quedan 62 / 339 / 720 documentos de 12 países (antes 44 / 118 / 358,
  sin Bélgica, Estonia, Países Bajos, Noruega ni Suiza). Base: `medir-verificar --pasadas 2` sobre la completa, OK 683 / COLA 37;
  `medir-cargar --contra-sitio`, 624 años publicados con el mismo documento, 598 se reproducen, 4 distintos, 22 frenan. Pendiente del ok de
  Guido: la sección 5 de la skill club-or-year-onboarding todavía dice "16 / 34 / 87" y no nombra el generador.

## Después del merge de los lotes de prueba (2026-10-19)

- dbee5a48c0: la sección 5 de la skill club-or-year-onboarding nombra `tools/lotes-prueba.mjs` (ok de Guido).
- **298 m: medida, sin daño hoy, a HALLAZGOS** (no se codea). El ajuste del club ya es el escalón 0 de la carga; Nõmme Kalju 2022-2024
  preguntaron porque todavía no lo tenía y hoy cargan sin frenar (`medir-cargar`). Los 37 casos `perimetro` de la etapa cargar: 0 abiertos,
  29 con ajuste hoy; en 22 de 35 la propuesta se corrigió (toma el año más cercano aunque sea una excepción). Condición para retomar, en
  Admin/HALLAZGOS-pipeline.md. Sigue la n.

## Después del merge de la m (2026-10-19)

- **298 n hecha** (783f7fd859, ok de Guido 2026-10-19). En verificar.mjs, una comparación con el año vecino que FALLA entre dos documentos
  con perímetro fijado distinto (ajuste del documento o del club) queda "no se puede comparar: perímetros distintos" y no abre el caso
  `anio-vecino`. Solo baja la que falla: la primera versión salteaba todas y Roma 2005 y Benfica 2005-06 pasaban de OK a COLA (perdían un
  chequeo que coincidía). Medido con `medir-verificar --pasadas 2` sobre la completa nueva (720): 718 idénticos; Benfica 2018-19
  (consolidado contra 2019-20 individual) y Aris 2021 (individual contra el grupo) pasan de COLA a OK con los mismos números. Sigue la p.

## Después del merge de la n (2026-10-19)

- **298 p2 hecha** (31470c9ec1, ok de Guido 2026-10-19). Escalón 0b del aviso de categoría en 0 en cargar.mjs: el `cero-real` de esa
  categoría en otro documento del club vale, si ningún año cargado del club la tiene con monto. Simulado con un solo ajuste por club y
  categoría (salen 58 de 94): frenos por reintento 46 -> 28 (los 28, clubes con algún año con monto: la compuerta). Lote completo: 0 filas
  distintas; Beerschot 2019, 2020 y 2022 toman el cero real de "Cuotas sociales" de 2025. Los 58 ajustes que sobran siguen en el archivo
  (no estorban); se pueden sacar con medición, como en la y4 y la l.
- **298 p1 hecha** (11bc28a8ac, diseño de Guido: chequeo cada 5 años). El perfil (socios, otros deportes) es por año: cada chequeo guarda
  el año del documento y vale para los años a menos de 5; fuera de toda ventana se pregunta de nuevo, una vez por club, campo y tramo;
  la respuesta de cualquier documento del club en la ventana sirve; un chequeo que contradice al más cercano abre `perfil-cambio`.
  Líneas viejas sin año no cuentan (decisión de Guido). b2920d3dc7: 150 chequeos con año de la revisión de los 33 tramos (subagente
  Sonnet sobre extractos con línea, revisado): 28 confirman; Benfica (socios desde 2005) y Sporting (desde 2001) contradecían el perfil
  "sin socios" (lo cargado ya tiene sus cuotas). medir-cargar sobre la completa: 0 filas distintas; 16 años cargados volverían a preguntar
  si se recargan (Juventus, cuyo perfil no tiene año; Beerschot 2019-2020; Goiás 2007, caso límite).

## Después del merge de la p (2026-10-19)

- **298 q hecha** (0364eb2830, ok de Guido 2026-10-19: "si no rompe lo que ya funciona"). El ensayo de lote.mjs cobra la categorización
  solo a los documentos que van a categorizar: cotizados para localizar o extraer, o extraídos; no testigos; con el `.categorias.json` no
  al día (`categoriasAlDia`). Lote 93: US$ 0,78 -> 0,06 (Vitesse y Willem II, los únicos sin categorías); 19 documentos nuevos: 3,78 ->
  3,66 (15 de 19); prueba mediana: 9,96 -> 0,33 (11 de 332). El resto de la salida del ensayo, igual. Ojo, sin relación con la q: el
  ensayo de lote.mjs re-verifica gratis los documentos con respuestas nuevas en la cola y deja modificados sus `.verificacion.json` y la
  cola; los de la prueba mediana (8 belgas) se restauraron sin commitear. Sigue la s.

## Después del merge de la q (2026-10-19)
- **298 s medida: sin daño hoy, a HALLAZGOS** (no se codea). La causa la resolvió la 298 f: periodo.mjs da el cierre 30-06-2019 de Beerschot
  2019 -correction sin el ajuste `cierre`, y la localización toma la columna del ejercicio (48 filas). Ningún `.filas.json` tiene 0 filas
  (0 de 720). Condición para retomar el aviso de "0 filas", en Admin/HALLAZGOS-pipeline.md. Sigue la v.

## Después del merge de la s (2026-10-19)
- **298 v medida: sin daño hoy, a HALLAZGOS** (no se codea). La lista de frenados la escribe cargar-lote.mjs, que no aplica la regla de la
  298 o; pero los 5 originales con corrección del lote 92 ya están descartados y el ensayo de cargar-lote no los lista. Solo se vería en la
  primera corrida de un par nuevo. Condición para retomar, en HALLAZGOS. Siguen u2, z (decisión de pantalla de Guido) y g2 (condicional).

## Después del merge de la v (2026-10-19)

- **298 u2 hecha** (5e0d624b05, ok de Guido 2026-10-19). Las listas de un solo grupo y la First Division B con un equipo menos eran la
  misma causa: fetch-club-league-reference.mjs cortaba los códigos de la plantilla sports table con guion ("team1=B-W" -> "B"). Ahora el
  código acepta "." y "-" (empieza con letra o número, para no tomar los enlaces de los cuadros de play-off) y la unión de grupos informa
  cuántos fueron. Third Division 2015-16: 16 -> 37 equipos; Division 2 2021-22 y Second Amateur 2019-20: 15 -> 48; First Division B
  2017-18 y 2018-19: 7 -> 8. `listas-lote --lote Admin/lotes/lote-92.txt --ensayo`: 41 -> 45 de 51 (las 6 que faltan no tienen página
  en Wikipedia). Las 358 listas guardadas, lector viejo contra nuevo: mismos equipos. Las 4 listas nuevas se escriben solas en la próxima
  corrida de `lote.mjs --cargar` (corre listas-lote --lote antes). Quedan z (decisión de pantalla de Guido) y g2 (condicional).

## Después del merge de la u2 (2026-10-19)

- **298 z hecha** (f2902b838c y 8baa47c274, decisión de Guido 2026-10-19: "cargarlo como el año del cierre, con su nota"). Los cuatro son el
  primer ejercicio de una sociedad nueva de más de 12 meses (Anderlecht 2011: 16; RAAL La Louvière 2018: 14; Sint-Truiden 2013: 15; Zulte
  Waregem 2012: 17) y ninguno tiene los ingresos inflados contra el año siguiente. (1) periodo.mjs lee el período del formulario NBB con las
  fechas en las líneas de abajo: además, 31 belgas dejan de tomar la fecha de la asamblea como cierre ("nombre no coincide" 155 -> 124).
  (2) cargar.mjs aplica la regla del primer ejercicio también a más de 12 meses (importes tal cual, nota pública con fechas y meses);
  CONVENCIONES-DATOS al día. medir-cargar sobre la completa: 0 diferencias, contra-sitio igual. Los 4 años se cargan cuando pasen por el
  lote (todavía no están extraídos). Caso nuevo, sin regla: Westerlo 2015, 18 meses por cambio de cierre (01/01/2014 – 30/06/2015), sigue
  frenado; a decidir si aparece en un lote. Sin respuesta de Guido sobre la marca "N meses" en pantalla: no se pidió.

## Después del merge de la z (2026-10-19)

- **232 e cerrado en HALLAZGOS** (decisión de Guido 2026-10-19). A2 es el 8% del gasto de API (US$ 40,13, 709 llamadas); el recorte
  ahorraría ~2-3% del total con riesgo de perder decisiones. Condición para retomar, en HALLAZGOS. Sigue el 279.
- **279 hecho** (324ae1d8c7, ok de Guido 2026-10-19). La liga de un año en data/club-leagues la escribe `ligaEnTexto()` de cargar.mjs (pura):
  año en null se reemplaza; misma liga, no se toca; otra liga, queda la que estaba y avisa. Antes, bfo-rusia.mjs (liga con estado
  "pendiente") agregaba el año otra vez en cada reescritura (58 claves repetidas en ru.js) y, con otra liga, el sitio tomaba la última en
  silencio. Probado en memoria sobre ru.js con la lógica vieja y la nueva (el ensayo de la carga no escribe ligas). Sigue el 286-287.

## Después del merge del 279 (2026-10-19)

### Cierre de Pipeline 3 (2026-10-19, por contexto)

Estado: rama `pipeline` igual a main (todo mergeado hasta el 279), sin cambios sin commitear. No hay nada medido o diseñado sin commitear:
los parches de prueba de esta sesión (q, n, l, u2, y3) quedaron aplicados y commiteados; el resto de los ensayos vivió en el scratchpad.

**Qué queda (del bloque C y de la 298):**
- **z2** (decisión de Guido): Westerlo 2015, 18 meses por cambio de cierre de diciembre a junio (01/01/2014 – 30/06/2015). Tiene importes
  del año anterior, así que no entra por la regla del primer ejercicio (z) ni por la de transición (solo cubre menos de 12 meses). Opciones a
  mostrarle: cargarlo como 2015 con nota, como la transición de 11 meses de Benfica; o dejarlo parcial.
- **g2** (condicional): partir en la cola una fila mixta según su nota. Solo si aparece otra fila mixta sin códigos NBB; hoy no hay caso.
- **286 y 287**: el ensayo que no anticipa Mistral; el chequeo de carpeta doble y de entidad al guardar. Sin mirar todavía. Ojo: la 298 e3
  ya arregló el ensayo de `resolver-inventario` para los `.md` sin tablas; ver qué queda del 286 después de eso.
- **306**: Milan 2018 en `caja-deuda --medir` (1,21 M contra 164,27 M): las filas de deuda "a) entro / b) oltre" cuelgan de un título sin
  importe y el diccionario solo ve "4 debiti verso banche". Sin daño hoy (año cargado): medir antes de decidir si es HALLAZGOS.
- **307**: `localizar.mjs --lista --ejecutar` imprime "Gastado: US$ 0.00" (el registro tiene el costo real; `gasto.mjs` da el bueno).
- **301**: `gasto.mjs --json | …` se corta a los 64 KB (el proceso sale antes de vaciar stdout).
- **302**: el deflactor de EE.UU. desde la BEA en vez de FRED (`tools/fetch-fx-reference.mjs --deflactores`).
- **290 y 310**: caja y deuda (290 lo que queda de Genoa 2022; 310 el primer año sin vecino, cualquier país: ver el TODO).

**Para la sesión nueva: por dónde seguir.**
- Arrancar con la skill club-or-year-onboarding y `node tools/worktree.mjs preparar <carpeta>`. Medir con los lotes nuevos:
  `Admin/lotes/prueba-rapida.txt` (a mano, 62), `prueba-mediana.txt` (339) y `prueba-completa.txt` (720), que arma
  `node tools/lotes-prueba.mjs --escribir` (correrlo si entraron años nuevos). Bases de esta sesión: `medir-verificar --pasadas 2` sobre la
  completa, OK 685 / COLA 35; `medir-cargar --contra-sitio`, 604 de 644 años publicados se reproducen.
- Cómo se trabajó: diseño con medición gratis y el ok de Guido en texto ANTES de codear; código viejo contra nuevo sobre la completa; un
  commit por cambio; nota acá; aviso a la principal. Sin el panel Plan ni el modo plan (pedido de la principal: la sesión caía en
  acceptEdits); los diseños y las preguntas, en el chat.
- Trampas vistas: el ensayo de `lote.mjs` re-verifica gratis los documentos con respuestas nuevas en la cola y deja modificados sus
  `.verificacion.json` y la cola (restaurar con git antes de commitear); `medir-cargar` con la p1 anota en `perfil-clubes.jsonl` las
  respuestas viejas de la cola con su año (restaurar después de medir); los subagentes de esta sesión no tienen Grep: si tienen que buscar en
  `.md` grandes, sacar antes las líneas con un script y pasarles el extracto.
- Pendiente de anotar en la memoria (con Guido): que el panel Plan dejó de usarse en las sesiones de worktree.

## Pipeline 4 (2026-10-19)

**286 (commit ff216bf16f).** `pipeline.mjs`: el ensayo cotiza los `.md` viejos sin tablas que la corrida real marcaría (`candidatosSinTablas`
solo lee; `chequearTablas` escribe la marca). Con el 298 e3 y la corrida de sin-tablas-298e ya no queda ninguno: ensayo completo y de
Colombia sin la línea nueva (0 candidatos; de los 23 `.md` viejos sin tablas, 7 tienen `formatoIntentado`, otros son de 1 página o ya
pasaron por verificar). Queda como resguardo para la próxima tanda de `.md` viejos.

**287 (commit a7070802ab).** `audit.js`: hallazgo P2 `carpeta-doble` (mismo sha1 en dos carpetas de club del país; tamaño primero; salta
`_...`; sigue symlinks). Probado con un PDF copiado a una carpeta temporal. Auditoría P0 0 / P1 0; P2 215 → 240: 25 hallazgos reales para
mirar contra el documento (misfiling: Hearts en Kelty Hearts, Fjölnir en ÍR; carpetas dobles: NEC, RFS, Thun, St. Gallen, Omonia; informes de
liga compartidos a propósito: Bundesliga 2, Ljungskile/United Nordic, Brasil). No se silenció ni se movió nada: silenciar en
`audit-ignore.json` exige mirar la fuente. Pendiente: texto para la skill `club-sourcing` (mostrado a Guido, sin su ok todavía).
Ojo: `audit.js --json` con pipe se corta a los 64 KB (como el 301); se redirige a un archivo.

## Después del merge del 286-287 (2026-10-19)

**287, skill (commit 631fd82536).** `club-sourcing`: punto nuevo "Una sola carpeta por club" (ok de Guido).

**306 (commit ae1823fb94).** Pasado a HALLAZGOS "Conocido, sin daño hoy" (ok de Guido): solo Milan tiene el formato; aunque las filas hijas
heredaran el título daría 127,73 M contra 164,27 M cargados por los 36,54 M de "altri finanziatori" (291). Retomar con otro año de Milan o si
se resuelve el 291. Para borrar del TODO.

**307: no se reproduce.** `localizar.mjs --lista <1 doc> --modelo sonnet --rehacer --ejecutar` (Fredrikstad 2017): "Gastado: US$ 0.02" y el
registro anota 0,0165, o sea suma bien. El código suma `r.costo` de cada documento y un documento ya hecho devuelve 0 (correcto). La única
vía que daría 0 con gasto real es el modo Batch (`FOS_CLAUDE_BATCH=1`: la respuesta queda `pendiente`, costo 0, y el bucle rompería en
`d.sin_estado`); no se probó. Probable: el número de la nota original salió de una versión anterior al `--modelo` (commit 8be215ec01).
Para borrar del TODO como no reproducible; se reabre si aparece de nuevo.

Pendiente de Guido en su chat: nada. Sigue: 301, 302, 290, 310 y las letras 298 ab y ac que sumó la principal.

## Después del merge del 306-307 (2026-10-19)

**301 (commits gasto.mjs y audit.js).** `process.exit` antes de vaciar stdout cortaba el `--json` en un pipe a 65.536 bytes (gasto: 327.687).
Arreglo con el patrón de `carpetas-clubes.mjs`: gasto.mjs espera la escritura; audit.js sale con el código de siempre en el callback del
write. Medido: `gasto.mjs --json | wc -c` = 327.687 y parsea; `audit.js --json | json.load` parsea (P3 783, P2 241); auditoría P0 0 / P1 0.
Otros `--json` con process.exit (paginas-con-numeros, companies-house-fetch, perfil-clubes) imprimen poco: no se tocaron. Para borrar el 301 del TODO.

## Después del merge del 301 (2026-10-19)

**302 (commit d26d44f3ac).** `fetch-fx-reference.mjs --deflactores`: USD sale de `apps.bea.gov/national/Release/TXT/NipaDataA.txt` (serie
`A191RD`, ~12 MB, sin key) en vez de FRED. Medido: los 31 valores 1995-2025 salen idénticos; `data/deflactores.js` solo cambió el texto de
`fuente`; EUR (Eurostat) sin cambios. Como cambió `data/`, el commit pidió subir ASSET_V (1377 → 1378 en `index.html`: constante y 31 `?v=`) y
regenerar las páginas de fuentes (`node tools/generate-fuentes-page.js`: 318 archivos, solo el `?v=`). Si main también subió ASSET_V, queda
un choque trivial en `index.html` y en `fuentes/`: se resuelve regenerando. Para borrar el 302 del TODO.

## Después del merge del 302 (2026-10-19)

**310 parte 1 (commits 8e12e3666b y 57f555d0a3).** `caja-deuda.mjs`: `balanceCuadraConFila`. La caja de un año sin vecino se acepta si la fila
está en una tabla del balance cuyo total del activo = un total del pasivo (±1) y la caja no lo supera. Solo caja. `--medir` en todos los
clubes: acepta 5 cajas sin vecino; 4 iguales (Ferroviária 2012 y 2021, Fiorentina 2019, Vilanova 2021) y 1 distinta: Udinese 2022 (0,17 M contra
44,18 M: la pág. 32 es el balance de una entidad chica de activo 17,2 M). Agregué por mi cuenta la condición "tabla de mayor activo del documento"
(4 de 4, Udinese rechazada) y Guido me pidió sacarla: no se endurece una regla sin preguntarle (memoria no-endurecer-reglas-sin-preguntar).
Quedó sin la condición. PENDIENTE DE GUIDO: cómo evitar Udinese 2022; opciones medidas: 1) mayor activo (4/4, 0 errores); 2) la cifra repetida
en el `.md` (rechaza Udinese: 1 vez contra 8 de la real; confirma solo 1 de 4); 3) no hacer nada.
**310 partes 2 y 3 y 290: recomendación hecha a Guido (ver el chat); sin tocar código.**

## Después del merge del 310 parte 1 (2026-10-19)

**310 parte 1, votos (Guido, 2026-10-19).** `cajaSinVecinoAceptable` reemplaza a `balanceCuadraConFila`: acepta la caja sin vecino solo si coinciden
tres votos (balance cuadra / tabla del mayor activo / otra fila con la misma cifra). Probé las variantes con una variable temporal (sin
commitear): voto 1 solo 422 iguales y 8 distintos (Udinese 2022); la idea 1, la 2, "las dos" y "alguna" dieron 422 y 7; quedó la de los votos
(las tres de acuerdo). `--medir` final: caja 422/7/379, deuda 180/10/575 (idéntica). Los 7 distintos son los de antes de la regla (Milan 2025, Arouca
2024, Juventus 2005, Lazio 2006, Napoli 2019 y 2023, Wolves 2025). Los lotes de prueba miden verificar y cargar, que esta regla no toca.

**310 partes 2 y 3 y 290 (ok de Guido, 2026-10-19).** Parte 2 (deuda belga por códigos) y parte 3 (OH Leuven) pasadas a HALLAZGOS "sin daño hoy"
(la 3 cubierta por la parte 1). Regla del factoring escrita en `Admin/CONVENCIONES-DATOS.md`: con recurso entra en la deuda, pro soluto no; lo
decide la nota de cada documento y el diccionario no suma "altri finanziatori". Genoa 2022 queda como está; sin cambio de código. Para borrar del
TODO: el 310 entero, el 290 y el 291.

**298 ab (Guido, 2026-10-19).** `verificar.mjs`: la nota del subtotal reemplaza a los renglones del estado solo si trae al menos tantas filas
(`cn.hojas.length < comp.length` → no reemplaza). Base: 24 casos distintos pasan por ese reemplazo, 22 afinan y 2 achican (Sarpsborg 2024 y un gasto
de AVS 2023-24). `medir-verificar --pasadas 2` sobre prueba-completa + Sarpsborg 2023-24 (722): 720 idénticos, 2 con diferencias, OK 686 / COLA 36 como
antes. Sarpsborg 2024 vuelve a los 8 renglones del estado (ingresos 203,736698 contra 203,736697 impreso) y cierra. AVS 2023-24: mismos
totales y mismo estado (COLA), gastos de 22 a 31 líneas (personal: 6 de la nota → 15 del estado). Con `medir-cargar`, el .categorias.json de ambos
queda desactualizado (filas nuevas) y AVS tendría 3 casos nuevos en la cola si se reprocesara; es un año ya publicado y el lote no lo reprocesa, así que
el sitio no cambia. Restauré Generados y los registros después de medir. **ac sin hacer**: falta el ok de Guido para rehacer la localización de
Sarpsborg 2023 (hasta US$ 0,10) y para guardar el perímetro usado en .ubicacion.json.
