# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.**
No la dupliques en `Admin/CHANGELOG.md` ni en `Admin/finance-of-sports-project.md`, que son historia,
ni en el comentario de ningún archivo de código.

## Cómo leer esta lista

- **Los números son IDENTIFICADORES, no prioridad.** Se conservan de la lista vieja (la
  que vivía en el comentario de `index.html`) porque los puntos se citan entre ellos:
  "ver to-do 20(h)" tiene que seguir apuntando a lo mismo. Por eso hay
  huecos: son los puntos que se resolvieron o se descartaron. Un punto nuevo toma el
  número siguiente al más alto, nunca uno libre.
- **La prioridad es el ORDEN en que están escritos**, de arriba hacia abajo.
- **Un punto resuelto se BORRA de acá.** Su historia ya queda en `Admin/CHANGELOG.md` y, si
  ameritaba el porqué, en `Admin/finance-of-sports-project.md`. Antes se dejaban marcados como
  "RESUELTO" y la lista terminó con la mitad de los puntos siendo cosas ya hechas.
- **Los pendientes de sourcing de un país no van acá**: viven en `Admin/sourcing/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

---

## Qué hay que hacer

ORDEN (pedido de Guido, 2026-10-17: seguir este orden). Es la copia durable del panel Plan: al arrancar una sesión, ponerlo en el
panel tal cual (modo plan → ExitPlanMode → show_pane "plan"; editar el archivo del plan no refresca el panel).

Reparto en worktrees (2026-10-18; cada uno cierra en `Admin/sesiones/<rama>.md` y la principal mergea): pantallas 282 (pantalla) y 273 (pantalla, cuando esté el dato) · finanzas 281, 282, 242, 294 · pipeline 289, 290, 288, 232, 279, 286, 287 · onboarding 292, 238, 285, 284, 283, 195, 165 c ·
datos-sourcing 276, 277, 273, 252 · Reino Unido (261) en su propia sesión · la principal: 268, 291, 250, 244 y los merges; el 246 va
solo, con todo mergeado y sin worktrees abiertos.

Todo lo del plan es un to-do numerado. Tandas en orden; dentro de cada una, de arriba abajo. Al lado, por qué va ahí.

**A. Cerrar lo abierto (chico, ya en marcha)**
* 268: dashboard de usuarios y visitas: confirmar el cron (19/10) y que se actualice solo
* 289, 290 y 291: caja y deuda, lo que queda (escala del año, Genoa 2022, duda del factoring)
* 292: transcripciones por subagentes de los 6 países: validar, Mistral y cargar

**B. Bases baratas que después cuestan caro cambiar**
* 250: hooks: auditoría antes del commit, skills, ASSET_V (vuelve automáticas reglas que hoy dependen de acordarse)
* 244: licencia del dataset y de cada fuente (lo que alguien copie sin licencia no se recupera)
* 246: ids estables con mapa de alias (antes de los links compartibles: cambiar un id después rompe los links ya compartidos)

**C. Abaratar antes del onboarding grande**
* 288: Opus → Sonnet, tarea por tarea y medido (la Batch API ya está)
* 232: mejoras de script que dejó Grecia
* 279: la tool que duplicaba claves en club-leagues/ru.js
* 286 y 287: el ensayo que no anticipa Mistral; chequeo carpeta-doble y entidad al guardar
(van antes de D: cada documento que se procese después sale más barato y con menos cola)

**D. Onboarding grande**
* 238: llevar a 0 los documentos que quedaron a mitad de camino
* 261: Reino Unido, transcripción por subagentes
* 165 c: altas de los países nuevos que faltan
* 195: gestiones (presidentes) sin fuente confirmada (se puede ir haciendo con cada país)
* 276 y 277: listas de equipos que no salen; Parma 2018 en club-leagues
* 284 y 285: Fredrikstad y Sarpsborg 08 sobre el FLI; transcribir Viking Fotball AS
* 283: Vålerenga y Aalesund, sumar el AS y el FLI (con nota en Finanzas)
* 273: estadio y sponsor de cada ejercicio (definir los campos con Guido antes de juntar)

**E. Pantallas**
* 281 y 282: Finanzas, los ingresos de las otras entidades (falta transcribir y la pantalla) y quién audita
* 294: llenar el registro de entidades

**E2. Distribución (depende de 246)**
* 241: link dedicado, nivel 2: rutas reales, tarjeta al compartir, SEO (mockup con Design antes)
* 254 + 243: repaso mensual de métricas y lo que se busca sin resultado (eligen qué club sumar en D)
* 242: para periodistas: CSV, cómo citar y metodología pública
* 252: tarea semanal que busca ejercicios nuevos (los clubes publican entre septiembre y diciembre: cuanto antes, mejor)
* 259: material de difusión (después de 241 y 242: el deck tiene que poder linkear)

**F. Datos para afuera (cuando haya tiempo; nada urgente)**
* 248: taxonomía genérica y subcategorías por deporte (antes del esquema; resuelve también 130 y 183)
* 130 y 183: otros deportes, polideportivos e Italia fuera del fútbol (después de 248)
* 270: estimado de club nuevo, prendido con 50% de error: volver a medir con más datos
* 245: datos como JSON con esquema
* 247: registro público de correcciones (sobre 245)
* 249: API en dominio propio (último; no construirla ahora)

**G. Orden de la casa**
* 255: consolidar las reglas repartidas (después de 250: lo chequeable ya pasó a hooks)
* 256: CHANGELOG corto
* 257: skills que faltan (después de 255)
* 253: tablero del pipeline para el celular
* 237 al: anexo UEFA para abrir las ventas (lo dejaste para después)
* 51: proceso de mails a clubes
* 278: carpetas duplicadas en Clubes/ (sin borrar PDFs)
* 258: índice partido por país o liga (cuando la skill de escala lo diga)

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-10). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/registros/altas-revision.jsonl: nombre, color, perímetro, cierres y ligas).
    HECHO: Brasil completo (lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs, 16 clubes). Etapa 2 (transcribir) de los 14 países
    del (c) hecha: lote 66 (468 documentos). Nombres legales de las altas: 24 contestados con cita (ajustes `name`). Gestiones de los clubes
    nuevos de Grecia, Rep. Checa, Portugal, Noruega, Países Bajos y Turquía cargadas (to-do 195).
    FALTA, en este orden:
    a) GRECIA: HECHA (lotes 66-75, cerrada el 2026-10-14). En el sitio: Olympiacos y AEK 2016-2025, PAOK 2017 y 2019-2025, Atromitos 2016 y
       2019-2025, Panetolikos 2017-2018 y 2020-2025, Aris 2019 y 2021-2025, Kifisia 2023-2025, Asteras, Levadiakos y Volos 2019-2025, OFI
       2018-2025, Panserraikos 2023 y 2025, AEL y Panathinaikos. Sin documento: Athens Kallithea (el PDF era del municipio), PAOK 2018,
       Atromitos 2017-2018, Panetolikos 2019, Aris 2020 (fichas de `Admin/sourcing/Grecia/`). Kifisia 2022 es parcial. Caja y deuda: 50 de 86
       datos de los clubes del lote 71 al cerrar Grecia; después, con las columnas por perímetro y Jev en caja-deuda.mjs, se sumaron
       Olympiacos (caja 2016-2025), AEK 2025 (caja), PAOK 2021 y Panetolikos 2022 (deuda). Conocido, sin tocar (histórico): Panathinaikos 2025 tiene
       "Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου" como competition_bonus; en AEK 2023 y 2025 va como other_income.
    b0) PORTUGAL, CARGADO SALVO LO QUE ESPERA SCRIPTS (al 2026-10-16). Qué hay en el sitio: Admin/ESTADO-clubes.md (lotes 76 y 79-83;
       los 32 clubes con documento tienen al menos un año). Falta solo lo que espera una mejora de script:
       - Benfica 2014-15 (237 q, en HALLAZGOS).
       - Gil Vicente: 2024 se cargó (o se carga) con el consolidado de la Associação (único documento del año) y el resto con la SDUQ.
       Reglas que salieron de Portugal (en CONVENCIONES-DATOS o en las respuestas de la cola): qué entidad se carga cuando el fútbol está
       en una SAD; "Outros" toma la categoría del bloque; cuadros de inventario y de bruto a neto afuera; palcos y cativos a stadium_other;
       ejercicio de 11 meses por cambio de cierre se carga.
    b1) (2026-10-18: la limpieza de lo de abajo está hecha y mergeada, rama onboarding; lo que sigue está en el punto 2 del ORDEN. Lo
       de "proponer a descartados" ya está en descartados.) ESTONIA Y BÉLGICA POR SUBAGENTES (decisión de Guido, 2026-10-15: usar el límite semanal de la suscripción en vez de API para
       transcribir países 100% digitales). Estonia: los 66 .md hechos (commit "Estonia: 66 transcripciones"). Falta: (1) correr
       `pipeline.mjs --lista` sobre los PDFs de Estonia (solo hace la validación gratis, ya tienen .md) y después el lote; (2) Bélgica: los
       61 .md hechos y commiteados; falta lo mismo que Estonia (`pipeline.mjs --lista` y el lote). (3) Suiza: 36 .md hechos y
       commiteados (St. Gallen 2018-19 a 2024-25, FC St. Gallen AG y Event AG 2024-25, FC Aarau 2025, FC Thun 2021 y 2025, Luzern
       2017-18 a 2019-20 y 2021-22 a 2024-25, Grasshopper 2022-23); Basel también hecho (16 del FC Basel 2006-2021 con Verein y AG; Tourismus 2023 y
       Theater 2022-23 descartados); falta Young Boys y la validación con el pipeline. Basel: se carga la AG (el fútbol), no el Verein. Luzern 2022-23 y FC Thun 2021 traen los estados como imagen: los validará la segunda voz. Grasshopper 2022-23 es un anuario
       sin estados financieros (proponer a descartados). (4) Turquía, Beşiktaş: 14 .md hechos (2006-2008, 2010-2013, 2018, 2019, 2021-2024);
       2012, 2013 y 2024 son solo el informe de gestión, sin estados financieros. Faltan 2014-2017 y 2020, y los demás clubes turcos. El comparador da "no" en las páginas imagen del informe del
       comisario (no tienen texto): se toman como buenas si sus totales coinciden con el balance. Para notar al cargar Bélgica:
       Patro Eisden 2024 sin "correction" trae al final el informe del revisor de otra entidad (Patro Eisden Jeugd VZW); el informe del
       comisario de Lierse SK 2023 habla de la vzw Lierse Kempenzonen (confirmar la entidad de cada carpeta); Patro Eisden 2017 y 2020
       traen el pasivo del año anterior descuadrado en el propio PDF. Cómo: un subagente Sonnet por documento, en tandas de ~8, con las reglas de
       `Admin/transcripcion-subagentes/reglas.md` (formato, columnas, cifras partidas, páginas imagen) y los dos chequeos
       (`check-transcripcion-fidelidad.js` y `Admin/transcripcion-subagentes/comparar-numeros.mjs`); ~110.000 tokens por documento de ~20 págs.
       Para notar al verificar Estonia: Laagri 2023 es un primer ejercicio de menos de un año (constituido el 09.01.2023); Flora 2025 pág. 29
       y Nõmme Kalju 2024 traen descuadres del propio PDF en el patrimonio; varios informes traen consolidado y la MTÜ sola.
       (5) Países Bajos y Colombia (sesión de transcripción del 2026-10-16): 167 .md hechos y commiteados (Países Bajos 159, Colombia 8),
       todos con los dos chequeos en verde (las páginas imagen, leídas del render). El detalle por documento, en
       Admin/transcripcion-subagentes/avance-2026-10-16.md. Falta: `pipeline.mjs --lista` sobre esos PDFs (el registro todavía los
       cuenta "sin .md"; sin un lote corriendo) y después el lote. Antes del lote:
       - No son el club de fútbol (proponer a descartados): NEC 2022-23 y 2023-24 (Stichting N.E.C. Maatschappelijk; los demás años de NEC
         son N.E.C. Holding B.V.), RKC Waalwijk `Jaarrekening_def` (Stichting Samen RKC 2018-19), VVV `jaarrekening_vvv_foundation_2023-2024`,
         Titanes de Barranquilla (baloncesto) y Toros de Córdoba (béisbol).
       - Duplicados y versiones: NEC Nijmegen `wf-2024-2025` es idéntico a NEC 2024-25 (dos carpetas para el mismo club; unificar);
         Cambuur `_x96442` y FC Emmen 2017-18 y 2018-19 sin `-DEF` son idénticos a otros (a descartados, sin .md); FC Twente 2021-22 tiene
         dos versiones con cifras distintas (se transcribió la `wf-src`: decidir cuál es la definitiva); Feyenoord 2023-24 y 2024-25 ya tenían
         otro .md; Ajax y AZ tienen jaarverslag y `wf-` (depósito en la KvK) del mismo año (elegir uno por ejercicio).
       - Arreglos chicos en los .md: Ajax 2024-25 pág. 44 (sacar las descripciones "Grafiek: ..." agregadas), portadas en imagen de Sparta
         2024-25 y 2020-21, ADO Den Haag 2023-24 págs. 5 y 8 sin contenido.
       - Revisar contra el PDF las filas que el subagente reubicó y las páginas leídas del render (lista en el archivo de avance).
       Quedan 468 PDFs digitales sin transcribir en los países de este to-do: Colombia 203 (59 son certificaciones y dictámenes), Rep. Checa
       116, Dinamarca 84, Turquía 27, Noruega 18, Croacia 12, Ucrania 6, Suiza 1 y Países Bajos 1 (Ajax 2013-14). La lista de escaneos para
       Mistral, en el archivo de avance.
    b) SIGUIENTE. Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
       Altas de Noruega contestadas (2026-10-15) salvo dos, en Admin/registros/cola-borradores/altas-noruega.jsonl: Vålerenga (¿matriz,
       Elite FLI o AS: cuál tiene salarios e ingresos del fútbol?) y Viking (el subagente propone Viking Fotball AS, ~266 M NOK contra
       ~18 M del club, en lugar del ajuste `name` Viking Fotballklubb).
    Mejoras de script vistas en Grecia: to-do 232.

237. MEJORAS DE SCRIPT VISTAS EN EL LOTE 76 (Portugal, 2026-10-15; cada letra es un escalón a diseñar con el ok de Guido).
    ESTADO DEL 237 (2026-10-16). Hechas y medidas (un commit por letra, ver CHANGELOG 707 y 708): ad, n, f, d, t, e, ab, a+ac, v, r, paridad PTE, aa, q (POC y q1/q2), k, w, am, l (vecino sin
    descartados), ah, af+s, ai+ak, z, g y la letra nueva an (verificar no reescribe el .rubros.json igual, glosar no vuelve a pagar). Pasaron a
    Admin/HALLAZGOS-pipeline.md: o, b, c, h, i, j, l (primera parte), m, p, u, x, ae, aj y Benfica 2014-15. Guido dejó al para después.
    Cómo medir cada letra: verificar -> node tools/medir-verificar.mjs --lista Admin/lotes/prueba-completa.txt --salida <x> --pasadas 2
    (antes con --script <copia de la versión vieja dentro de tools/>) y --comparar; cargar -> node tools/medir-cargar.mjs --salida <x>
    (paralelo, ~1,5 min) y --comparar, después git checkout -- Admin/registros/categorias-aprendidas.jsonl; auditoría -> node tools/audit.js.
    PENDIENTE: solo al (Guido la dejó para después).
    al) EL ANEXO EN FORMATO UEFA ABRE LAS VENTAS Y NADIE LO USA (Mafra 2023-24, "Contas Anuais ED*-1", .md L1437-1483: bilheteira, patrocínios,
       TV, merchandising, competições y otros = 1.275.143,83, exacto con Vendas e serviços prestados; el lote pedía un reintento pago por TV y
       estadio en 0). Se cargó con ajustes `fila`. Portimonense 2024-25 trae algo parecido en el informe de gestión. Escalón posible: que
       localizar ofrezca ese anexo como desglose de Vendas cuando su suma da el renglón (compuerta: suma exacta).
       Más casos (lote 84): Sporting 2002 a 2007, cuadro de gestión de los proveitos (columna de resultados reales, mismo total que
       el estado): cargado con 45 ajustes `fila` (TV, taquilla, abonos, cuotas, sponsors, royalties, UEFA y un resto).
238. LLEVAR A 0 LOS ESTADOS INTERMEDIOS DEL INVENTARIO (pedido de Guido, 2026-10-15). El objetivo no es borrar documentos de la lista
   sino que todo lo que está frenado a mitad de camino y se puede cargar termine cargado en el sitio. Estados intermedios: `listo`
   (transcripto y validado, falta el lote), `pendiente-segunda-voz`, `revisar`, `listo-para-jev`, `sin-rubros`, `sin-tablas` y
   `sin-verificar`. `duplicado` y `no-es-pdf` no son intermedios (se revisan solo para confirmar que están bien marcados). Cuántos hay
   en cada uno: el resumen final de `node tools/pipeline.mjs` o `node tools/estado.mjs` (gratis); el 2026-10-15 eran 565 listo, 399
   pendiente-segunda-voz, 355 revisar, 259 listo-para-jev, 220 sin-rubros, 38 sin-tablas y 1 sin-verificar, sobre 11.029 a trabajar.
   Cómo: por país y por estado, el escalón que corresponde de la etapa 2 (`pipeline.mjs --lista`) y después lotes; lo que no se puede
   cargar (sin estado de resultados, parcial) va a `documentos-descartados.txt` o `documentos-parciales.txt` con su ok, para que deje de
   contar como frenado.

241. LINK DEDICADO, NIVEL 2: RUTAS REALES, TARJETA AL COMPARTIR Y SEO (mejoras de proyecto, pedido de Guido 2026-10-16). `/club/<id>` y `/liga/<id>` pre-generadas (redirect de Netlify +
   un generador de HTML por club, como `fuentes/<club>.html`), con título, descripción y OG image ("Boca Juniors · Ingresos 2025: US$ 120 M").
   WhatsApp y Google no ejecutan JS: sin esto la preview es la portada y nadie que busque "deuda de Boca" llega. Mockups con Design antes de codear.
242. PARA PERIODISTAS: CSV, CÓMO CITAR Y METODOLOGÍA PÚBLICA (mejoras de proyecto, pedido de Guido 2026-10-16). Descarga en CSV por club y año, un "cómo citar" con link, y una página
   pública de metodología (cómo se categoriza, cómo se convierte a USD, cómo se ajusta por inflación).
243. LO QUE SE BUSCA SIN RESULTADO GUÍA EL SOURCING (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker ya registra las búsquedas que no encuentran club: esa lista decide qué
   club se carga después (junto con el repaso de métricas, to-do 254).
244. LICENCIA DEL DATASET Y DE CADA FUENTE (mejoras de proyecto, pedido de Guido 2026-10-16). Hoy data/**/*.js y Clubes/**/*.md se bajan sin licencia (terminos.html no dice nada).
   Definir una (p. ej. CC BY-NC) y anotar, por fuente externa (ligas, pases, cotizaciones, deflactores, presidentes), de dónde sale y si
   permite reventa. Es lo que después permite cobrar el uso comercial.
245. DATOS COMO JSON CON ESQUEMA (mejoras de proyecto, pedido de Guido 2026-10-16). Hoy son JS (`const xRevenueLinesByYear = {...}`), sin versión de esquema, con la unidad implícita
   (millones) y la moneda en otro archivo. JSON con schema_version, unit/scale/currency explícitos y fecha de corte, como fuente; el JS del
   sitio se genera desde ahí.
246. IDS ESTABLES (mejoras de proyecto, pedido de Guido 2026-10-16). Conviven ids sin país (realmadrid, athleticclub) y con país (elche-es, corinthians-br). Normalizar antes de tener
   clientes de una API, con un mapa de alias de los ids viejos.
247. REGISTRO PÚBLICO DE CORRECCIONES (mejoras de proyecto, pedido de Guido 2026-10-16). Las correcciones se registran adentro (ajustes, evidencia por club); afuera nadie sabe qué cambió
   ni cuándo, dato por dato. Un registro público versionado.
248. TAXONOMÍA GENÉRICA + SUBCATEGORÍAS POR DEPORTE (mejoras de proyecto, pedido de Guido 2026-10-16). Una capa genérica (ingresos y gastos operativos, deuda) y las subcategorías de cada
   deporte debajo, para que wages_squad no quede como campo de primer nivel de una API (ver to-do 130).
249. API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
   api.financeofsports.com desde el primer día. No construirla ahora.
250. HOOKS DE CLAUDE CODE (mejoras de proyecto, pedido de Guido 2026-10-16). Hoy no hay ninguno. Candidatos: audit.js antes de cada commit; bloquear la edición de .claude/skills/ sin el
   ok de Guido; avisar si cambió data/ y no subió ASSET_V. Lo que una máquina puede chequear sale del texto de las reglas.
252. TAREA PROGRAMADA: EJERCICIOS NUEVOS (mejoras de proyecto, pedido de Guido 2026-10-16). Los clubes publican una vez por año (casi todos entre septiembre y diciembre). Una tarea semanal
   revisa reguladores y webs de los clubes cargados y deja los links en Admin/sourcing/README.md (con Claude in Chrome para los portales con
   sesión o formularios difíciles).
253. TABLERO DEL PIPELINE (ARTIFACT CON BASE DE DATOS) (mejoras de proyecto, pedido de Guido 2026-10-16). Lo de estado.mjs, la cola, el gasto de API por país y el seguimiento de mails a
   clubes, abrible desde el celular.
254. REPASO MENSUAL DE MÉTRICAS (MIXPANEL Y NETLIFY) (mejoras de proyecto, pedido de Guido 2026-10-16). Qué clubes se buscan y no están, y dónde se corta el embudo del selector.
   Con números, revisar qué fue al panel "Más opciones" de Finanzas (rediseño del 265: hoy es criterio, no dato).
255. CONSOLIDAR LAS REGLAS (mejoras de proyecto, pedido de Guido 2026-10-16). CLAUDE.md, las memorias, 7 skills, CONVENCIONES, CONVENCIONES-DATOS, PANTALLA y PIPELINE: una regla en tres
   lugares es lo que hace que una sesión contradiga a otra. Pasada de consolidación; lo chequeable va a hooks (250) o a audit.js.
256. CHANGELOG CORTO (mejoras de proyecto, pedido de Guido 2026-10-16). Casi 3.000 líneas y git ya guarda la historia: dejar los últimos 30 días y archivar el resto en Admin/Archive/.
257. SKILLS QUE FALTAN (mejoras de proyecto, pedido de Guido 2026-10-16). Producto/pantalla (mockup, ok, implementación, chequeo en celular; hoy mezclado en PANTALLA.md); contenido y
   difusión (un año cargado → hilo o post con el dato verificado y el link a la fuente); contrato de datos/API (esquema público y qué lo
   rompe); deploy/release (qué chequear antes de pushear y cómo verificar producción).
258. ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). clubs.js + club-index.js pesan ~93 KB para ~230 clubes y se bajan siempre (con 10.000 clubes,
   ~4 MB). Partir el índice y cargar el buscador aparte cuando la skill escala-finance-of-sports diga que llegó el momento.
259. MATERIAL DE DIFUSIÓN (mejoras de proyecto, pedido de Guido 2026-10-16). Un deck para periodistas y sponsors, o un informe por liga ("las finanzas de LaLiga 2025 en 10 slides"), con
   el tipo Slides. Sin código.
260. CAJA Y DEUDA: MEJORAS DE SCRIPT VISTAS EN PORTUGAL (sin aplicar; corrida del 2026-10-16: 151 de 327 datos, IA ~US$ 6). Cada una es un
   escalón a diseñar con el ok de Guido y a medir con `caja-deuda.mjs --medir`.
   LO QUE FALTA (2026-10-17), todo sin dato por el documento: Bayern 2021-2025 (solo el comunicado condensado: hace falta el
   Geschäftsbericht); Japón 2025 (10 clubes) y América, Argentinos Juniors 2019 y Unión 2022-2024 (la fuente no nombra la transcripción);
   Volos 2019-2020 (formato Β.5 solo con totales); Ferroviária 2014 (al PDF le falta la página del pasivo no corriente); Remo 2019 (sin
   balance); Mirassol 2024 (solo el informe del auditor); Alverca 2022-2025 y Estrela 2023 (montos con accionistas sin nota de préstamo:
   preguntar al club); HSV 2024 y RB Leipzig 2023-2024 (la escala del año: to-do 289). Dortmund 2024-2025 y RB Leipzig 2022 y 2025, escritos el 2026-10-18.
   Pendiente de mirar: Ferroviária 2023-2025, "Partes relacionadas" no corriente (3.844.165) puede ser un préstamo de una parte
   relacionada (con el criterio de socios, contaría); hoy la deuda es solo "Empréstimos".

268. MI CUENTA Y EL DASHBOARD DE USUARIOS Y VISITAS (pedido de Guido, 2026-10-17). Falta: (a) confirmar la primera corrida del cron
   del Worker fos-supabase-ping el 2026-10-19 12 UTC (Cloudflare → fos-supabase-ping → Logs); (b) que el dashboard
   https://claude.ai/artifact/7kPta8U7BxyiGRKAyayHhA se actualice solo (hoy: correr tools/supabase/stats.mjs --json y
   tools/cloudflare-visitas.mjs --json y subir los archivos; se puede programar).
273. ESTADIO Y SPONSOR DE CADA EJERCICIO (pedido de Guido, 2026-10-18). Por club y temporada: estadio, capacidad, sponsor de camiseta
   (frente) y marca técnica, con el link a la versión exacta de la página de Wikipedia de la temporada; sin monto. Los junta fos-datos.
   Se ve en Finanzas (Guido: "tiene que estar en finanzas"; link de salto, bloque o fila de la ficha, a decidir con él); la pantalla,
   recién cuando fos-datos avise el formato y el archivo.
281. FINANZAS: INGRESOS RESUMIDOS DE LAS OTRAS ENTIDADES (pedido de Guido, 2026-10-17). El dato ya está (línea `ingresos` del registro de
   entidades, piloto Portugal: Vitória 2021/22, Tondela 2021, Braga). Falta: transcribir por subagentes los ~17 documentos de entidades de
   clubes portugueses publicados sin `.md` (Porto 3, Braga 2022-23, Marítimo 5, Belenenses, Chaves, Vizela 2, Académica, União de
   Leiria) y sumar su línea de ingresos; y la pantalla, con mockup (artboard "Vitória y Tondela (to-do 281)" de "Pantallas FoS").
282. QUIÉN AUDITA Y QUÉ DICE EL INFORME (pedido de Guido, 2026-10-17). El auditor y el dictamen en pocas palabras (sin salvedades /
   con salvedades / adverso / abstención / sin informe; duda sobre la continuidad), en Finanzas, con el link "ver en el balance". También en
   Ligas, pero del balance propio de la entidad que organiza la liga (AFA, LFP), no de los clubes (aclaración de Guido); el sitio todavía
   no tiene esas entidades. El dato está en piloto en la rama finanzas (19 balances, `data/auditoria/`); un club-año que no está es "no
   sabemos", no "sin informe". El pipeline va a exigir el dato al dar de alta un club (fos-pipeline). Mockup antes de codear.
283. VÅLERENGA Y AALESUND: SUMAR EL AS Y EL FLI EN UN SOLO AÑO (pedido de Guido, 2026-10-17). El AS tiene los ingresos comerciales y el
   FLI los sueldos, que el AS le paga como transferencia (Vålerenga Elite 2023: 85,4 M de sueldos; el AS le transfiere 87,5 M); ninguno
   consolida. Sumar los dos documentos sin contar dos veces la transferencia, con una nota en Finanzas que explique la suma.
284. FREDRIKSTAD Y SARPSBORG 08: EL CLUB ES EL FLI (pedido de Guido, 2026-10-17). Fredrikstad: el FLI (Fredrikstad Fotballklubb) tiene
   los sueldos y no deposita cuentas desde 2019, así que hay 2012-2018; antes de cerrarlo, abrir `wf-src-FFK_-_Årsmøte_2025.pdf`; para
   2008-2011 solo existe el AS. Sarpsborg 08: el alta se hizo sobre un AS inversor sin empleados; rehacerla sobre el FLI "Sarpsborg 08
   Fotballforening" (sus 14 PDFs no tienen `.md`). Pardubice: no darle el alta con lo que hay (es FK Junior z.s.); el sourcing de la a.s.
   lo hace Guido.
285. VIKING: TRANSCRIBIR LOS PDFs DE VIKING FOTBALL AS (pedido de Guido, 2026-10-17). Es el club desde el 2026-10-17 y hoy solo los del
   FLI tienen `.md`.
286. EL ENSAYO DE pipeline.mjs NO ANTICIPA EL REHACER CON MISTRAL (cierre de onboarding). `--lista` muestra un `.md` sin tablas como
   "texto (Claude solo en págs. dudosas)" y `--ejecutar` lo rehace con Mistral (~US$ 0,17 por documento; la corrida de los 6 países
   estimó US$ 27,83 y se cortó en 40 de 566). Que el ensayo los cuente como "rehacer con Mistral" con su costo. Quedan 481 .md así
   (Bélgica 268, Colombia 208). Ya avisado a pipeline.
287. QUE NO SE REPITA LA LIMPIEZA (cierre de onboarding; escalones, uno por vez). `audit.js` `carpeta-doble` (dos carpetas de un país
   con PDFs de la misma huella) y `club-sourcing` (mirar la entidad de la portada al guardar y no abrir una segunda carpeta del club).
   Un `.md` sin PDF no es error (Ajax, PSV, Feyenoord y AZ 2023-25 son la fuente publicada de lo cargado).
288. OPUS → SONNET, TAREA POR TAREA Y MEDIDO (reemplaza a los viejos 233 y 230; cierre de pipeline, 2026-10-18). La Batch API ya está
   hecha (`tools/lote-batch.mjs`, mismo lote y modelo a mitad de precio, opcional y más lento). Sigue pasar a Sonnet localizar, extraer,
   caja-deuda, categorizar y perimetro-a2, una por vez, con medición antes y después. Jev no sirve para localizar ni perimetro-a2
   (HALLAZGOS): queda para opciones cerradas y cortas. CÓMO MEDIR un cambio de extraer: rehacerlo cuesta ~US$ 6 por corrida sobre `prueba-
   mediana.txt` (34 documentos) y la IA no responde igual dos veces (6 de 34 documentos y el 3,5% de las etiquetas cambian con el MISMO
   código), así que hay que correr también el "antes" y comparar contra ese piso. El comparador usado (propuesta de `cargar.mjs --lista
   <x> --salida <x.jsonl>`, línea por línea: etiqueta, categoría, importe y totales) vivía en el scratch de la sesión: subirlo a `tools/`
   como `comparar-cargas.mjs` si se vuelve a medir. Restaurar después `Generados/` de los clubes de prueba y la cola con `git checkout`.
289. LA ESCALA DEL AÑO EN CAJA-DEUDA (cierre de pipeline). RB Leipzig 2024: el comparativo al 30.06.2024 del jahresabschluss-2024-25 está
   en TEUR (caja 783, préstamos de Red Bull 153.717, .md L531), pero `caja-deuda.mjs` detecta para ese año la escala EUR, así que un
   ajuste "tal cual impreso" daría 0,15 M. Mismo problema que Leipzig 2023 y HSV 2024: la escala del año, no el ajuste.
290. GENOA 2022 SIGUE MAL EN caja-deuda --medir (15,7 M contra 95,7 M publicados): le faltan las filas "4 bis) … oltre l'esercizio
   successivo" y "altri finanziatori".
291. DUDA PARA GUIDO: ¿EL FACTORING ES DEUDA? En Monza 2024 se decidió que no (ajuste del 2026-10-17: 0); en Genoa 2022 el sitio publica
   95,7 M que lo incluyen (30,4 M con Banca Sistema, .md L2637). Decidir un criterio; no se reabrió nada.
292. TRANSCRIPCIONES POR SUBAGENTES: VALIDAR, MISTRAL Y CARGAR (Estonia, Bélgica, Suiza, Beşiktaş, Países Bajos y Colombia; la limpieza
   está hecha, ver el 165 b1). En este orden: validar `Admin/lotes/subagentes-validar.txt` (~US$ 3,47); transcribir con Mistral
   `Admin/lotes/mistral-despues-del-merge.txt` (36 documentos, ~US$ 6); lotes de carga por país (el alta con un solo año); y decidir
   subagentes o Mistral para los 319 `.md` viejos sin tablas de `Admin/lotes/sin-tablas-6paises.txt`.
294. LLENAR EL REGISTRO DE ENTIDADES (sigue al 280; pedido de Guido, 2026-10-18, vía fos-finanzas). `Admin/registros/entidades.jsonl`
   (llega con el merge de la rama finanzas) tiene solo Chelsea 2025 e Inter 2025. Faltan: (1) los otros ejercicios de Chelsea e Inter
   (Suning antes de 2024); (2) Portugal, club asociación y SAD: los avisos de `node tools/entidades.mjs`; (3) los grupos con dos o más
   clubes cargados: City Football Group (Man City, Girona), Marinakis (Forest, Olympiacos, Rio Ave), Friedkin (Roma, Everton), 777
   Partners (Genoa, Standard, Vasco), Eagle Football (Botafogo, parte de Crystal Palace); (4) los casos de
   `Admin/registros/cola-borradores/altas-2026-10-17.md`, cuando esos clubes estén publicados. Con subagentes: cada línea lleva una cita
   del .md, o url y fecha si es externa, y `tools/entidades.mjs` la verifica. Visto de paso: Qatar Sports Investments (dueño del
   PSG) tiene 29,60 % de la Braga SAD (Relato_rio-Contas-2022-23-SAD.md L1613), participación menor de un grupo.
270. ESTIMAR UN CLUB QUE NUNCA CARGAMOS: VOLVER A MEDIR (pedido de Guido, 2026-10-17). Está PRENDIDO desde el 2026-10-18 (decisión de
   Guido: en Ligas todo club sin balance figura como estimado), con 50% de error (regresión sin historia: mediana de la liga-año, división,
   posición en la tabla). Volver a medir (`node tools/estimar.mjs --medir`) cuando haya más clubes cargados. Variable sin medir: partidos
   contra clubes con finanzas.
276. LISTAS DE EQUIPOS QUE NO SALEN (faltantes-liga). Primera B Metro (sin página con tabla), Pro League belga 2024-25 (el lector no la
   entiende), Serie C (3 grupos por página), Perú 2020 (la tabla pone la ciudad primero). `node tools/listas-lote.mjs` las reintenta.
277. PARMA EN LA SERIE C EN 2018 (data/club-leagues/). En 2017-18 jugó la Serie B: verificar y corregir.
278. CARPETAS DUPLICADAS EN Clubes/. Cardiff y Swansea en `Inglaterra/` y `Gales/`; `Suiza/FC St. Gallen` y `Suiza/St. Gallen`.
   `faltantes-liga` las lee juntas. Unificar sin borrar ningún PDF y chequeando antes las referencias del pipeline.
279. LA TOOL QUE DUPLICABA CLAVES EN data/club-leagues/ru.js (mejora de script). El archivo acumuló 58 claves repetidas: la tool que lo
   escribe (probablemente `bfo-rusia.mjs` o `alta-club.mjs`) agrega sin mirar si la clave ya está.

232. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO GRECIA (pedido de Guido, 2026-10-14: anotar lo que se aprende en el onboarding griego). Cada
    letra es un escalón a diseñar con su ok (skill club-or-year-onboarding, sección 3.b), uno por vez.
    e) `perimetro-a2` le pasa a la IA hasta ~42.000 tokens de entrada para contestar ~130 (Olympiacos 2018: US$ 0,17 por llamada); en
       Grecia fue el 20% del gasto de API. Mirar qué texto le hace falta de verdad (hoy, to-do 288).
       PROBADO Y DESCARTADO (2026-10-14): recortar los textos debajo de los títulos sin tabla pierde 7 decisiones y mete 2 errores
       (Admin/HALLAZGOS-pipeline.md). Lo que queda por probar: que Jev haga una primera pasada barata (medido y descartado: HALLAZGOS; hoy, to-do 288) o achicar solo la parte
       de las notas que viene DESPUÉS del estado de resultados.

195. GESTIONES SIN FUENTE (solo entran las `confirmada: true`). Una tanda nueva se arma sola desde los casos de la cola con
    `node tools/gestiones-tanda.mjs --armar --escribir` (la última, tanda-2026-10-14-2, cargó 12). Siguen sin cubrir:
    - con caso en la cola y la pregunta en `Admin/dudas-por-club.md` ("Gestiones sin fecha confirmada"): CRB 2020, Cuiabá 2022-2025, Vila
      Nova 2014, Ferroviária 2010-2013 y 2023 (además, criterio de SAF: presidente del consejo o director-presidente), Goiás 2010-2013 y
      2017, OFI 2018 (administración judicial: sin gestión, decisión de Guido);
    - de las tandas 1 y 2, sin caso abierto en la cola (no los toma --armar): Fortaleza, Novorizontino, Ituano, Ceará 2024-2025, Amazonas
      2024, Cruzeiro 2024-2025 (Pedro Lourenço sin fecha de cierre de la compra), Pari NN 2021-2022, Once Caldas 2024-2025,
      Mönchengladbach 2023 (Rolf Königs). Para investigarlos con la herramienta hay que armarles un lote (--club no los encuentra sin caso).
    Las dudas de cada club, en "## Gestiones" de su `Admin/carga-clubes/<club>.md`; los casos `firmo` (la gestión cambió entre el cierre y
    la aprobación del balance), ahí mismo, sin cargar.

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    Inglaterra suma cricket: Warwickshire CCC (The Warwickshire County Cricket Club Limited, consolida Birmingham Phoenix y Edgbaston
    Experience) tiene un caso de alta en la cola (670a1fe) sin contestar hasta que se decida esto.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `Admin/sourcing/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

51. PROCESO DE EMAIL A CLUBES — EN CONSTRUCCIÓN, ETAPA 1. El envío queda afuera de cualquier sesión
    de chat: Resend + subdominio propio + una cola de archivos que Guido revisa, con el envío
    disparado por Guido desde su propia terminal. Proceso completo en
    `.claude/skills/club-outreach/SKILL.md`. Sin regla de disparo automática todavía: Guido decide
    cuándo escribir.

    **Infraestructura, estado real:** (a) ✅ cuenta en Resend creada 2026-09-24 (conectada con
    GitHub, sigue en free por ahora); (b) ✅ subdominio `outreach.financeofsports.com` verificado
    2026-09-24 (DNS en Netlify DNS — DKIM, SPF vía 2 CNAME, DMARC `p=none` en `_dmarc.outreach`, no
    en la raíz); (c) `Receiving` activado (MX agregado, propagación confirmada por `dig` desde 3
    resolvers distintos) — el dashboard de Resend tardó en reflejarlo como verificado pero la
    infraestructura ya estaba bien; (d) ✅ API key generada y en `Admin/api-keys/outreach.env`
    (gitignoreado), `from` = `info@outreach.financeofsports.com`.

    **✅ PIPELINE PROBADO DE PUNTA A PUNTA, 2026-09-25**: mail de prueba escrito directo en
    `Admin/outreach/aprobados/`, Guido corrió `tools/outreach-send.js` desde su terminal, llegó a su
    Gmail, y el archivo se archivó solo en `Admin/outreach/enviados/`. La Etapa 1 está lista para
    usarse con clubes de verdad — ver `club-outreach/SKILL.md` sección 1 para el flujo completo
    (candidatos → redactar en `cola/` → Guido aprueba moviendo a `aprobados/` → Guido corre el
    script).

    **Check-in programado para 2026-10-24** (30 días desde que arrancó la Etapa 1): evaluar si
    conviene prender la Etapa 2 (regla de disparo automática — 3 preguntas acumuladas O 90 días — y
    cadencia de follow-up/cooldown, documentadas pero no activas todavía en el skill). Ver
    `Admin/outreach/checkin-2026-10-24.md` para qué mirar exactamente. Hay una tarea programada
    (`club-outreach-checkin`) que va a preguntarlo esa fecha, más el archivo como respaldo.

    **El criterio de CUÁNDO un club amerita un mail sigue siendo el mismo, sin cambios** (to-do 52,
    `club-sourcing/SKILL.md` sección 0.3): documento CONFIRMADO que existe pero no descargable
    (prensa con cifras, video en vez de PDF, compartir revocado — ver Independiente/Banfield/Atlanta)
    sí amerita mail; un dead-end sin ninguna señal de que el documento exista, o un bloqueo
    regulatorio estructural, no. Ese criterio y este proceso son cosas separadas a propósito.

261. REINO UNIDO: TRANSCRIPCIÓN POR SUBAGENTES (pedido de Guido, 2026-10-16: gastar la ventana de 5 horas de la suscripción). 108 .md hechos y
    commiteados (93 con subagentes Opus y 15 con Sonnet) (Tesseract + revisión de las páginas clave contra la imagen; los 93 dan 0 P1 / 0 P2 en `check-transcripcion-fidelidad.js`):
    años 2021-2026 de los clubes de Premier, F1, cricket y rugby que ya tenían algún .md. Cola, scripts e instrucciones:
    `Admin/transcripcion-subagentes/README.md` (van 71 de 1531 bloques; quedan unos 3600 PDFs, casi todos escaneos). Falta:
    a) Validarlos con `pipeline.mjs --lista` y seguir con el lote (etapa 3 en adelante).
    b) Sociedad de cada documento (ver `hallazgos-por-documento.txt` de esa carpeta): en varios clubes conviven la sociedad del club y la
       holding consolidada (Aston Villa: Aston Villa FC Ltd y NSWE Sports; Wolves: WWFC (1986) y W.W. (1990); West Ham: WHUFC y WH Holding;
       Brighton: el club y Holdings; Fulham: el club y Fulham Football Leisure; Sunderland: el club y Sunderland Ltd). El perímetro lo fija
       la regla de `Admin/CONVENCIONES-DATOS.md`; no cargar las dos para el mismo año.
    c) Nombres engañosos y duplicados entre los `wf-*`: West Ham wf-2022-2023-659d1396 y Wolves wf-2022-2023-d10fbea7 son del ejercicio
       2023-24, no 2022-23. Son el mismo informe que otro PDF de la carpeta: Celtic wf-2023-2024-2cb3da35 (= celtic-group-accounts-2023-24),
       Celtic wf-2022-2023-3e4a518a (= celtic-group-accounts-2022-23) y Man City wf-2022-2023-2d906303 (= mancity-full-accounts-2022-23).
       Antes de transcribir el resto de los `wf-*` (están al final de la cola), mirar si repiten un documento ya transcripto.
    d) Chelsea 2021-22 (Sonnet): solo los 4 estados se miraron contra la imagen; las notas se corrigieron por sumas. Revisar las notas
       contra el PDF antes de cargar caja y deuda.
