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
