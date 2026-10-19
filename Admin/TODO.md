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

**A. Cerrar lo abierto (chico, ya en marcha)**
* 292: cargar lo transcripto: lote 101 y 102 hechos (Go Ahead Eagles, Luzern 2018-2024 salvo 2023, Lommel SK 2019-2024, Lierse SK 2020-2021, Patro Eisden 2021 y 2023); quedan Patro Eisden 2022 y Lierse SK 2019 (período), y St. Gallen con la 298 ai y sus 6 casos (espera tu decisión de perímetro); el estadio de las amateur espera la 298 af; Basel es de la 324; después Suiza, Beşiktaş y Colombia --> Pantallas 3 (St. Gallen --> Pipeline 5)

**B. Bases baratas que después cuestan caro cambiar**
* 246: ids estables con mapa de alias (antes de los links compartibles: cambiar un id después rompe los links ya compartidos); va solo, con todo mergeado y sin worktrees abiertos

**C. Abaratar antes del onboarding grande**
* 260: caja y deuda, lo que falta por documento (Bayern, Japón 2025, Volos, Alverca y otros; todo espera un documento mejor)
* 298: mejoras de script de Estonia y Bélgica (af, las ligas amateur belgas, espera tu decisión; aj, signos de la columna previa; la z2, Westerlo 2015 con 18 meses, a decidir con vos; la g2, condicional) --> Pipeline 5. La ai (St. Gallen intragrupo, con tu decisión de perímetro) y la carga de St. Gallen también --> Pipeline 5.
(van antes de D: cada documento que se procese después sale más barato y con menos cola)

**D. Onboarding grande**
* 238: llevar a 0 los documentos que quedaron a mitad de camino --> Pantallas 3
* 261: Reino Unido: carga del fútbol inglés (lote 97, corriendo; el 98 y el alta de Celtic, lote 99, después); la cola de transcripción por Mistral --> Finanzas 5
* 165 c: altas de los países nuevos que faltan --> Pantallas 3
* 195: gestiones (presidentes) sin fuente confirmada (casi todas esperan respuesta del club)
* 283: Vålerenga y Aalesund: ya transcriptos; falta que decidas cómo se muestra la suma del AS y el FLI sin contar dos veces la transferencia
* 273: que generate-sponsors sume el contexto manual (los años viejos sin sponsor quedan en null) --> Pantallas 3

**E. Pantallas**
* 282: quién audita, lo que queda (que el pipeline exija la línea al dar de alta un club) --> Pipeline 5

**E2. Distribución (depende de 246)**
* 241: link dedicado, nivel 2: rutas reales, tarjeta al compartir, SEO (mockup con Design antes)
* 252: ejercicios nuevos, lo que queda (onboardear los PDFs ya bajados, Instituto 2024-25 incluido; Alemania en enero de 2027: qué bajar ya está en las notas de Gladbach y Stuttgart) --> Pantallas 3
* 259: material de difusión (después de 241: el deck tiene que poder linkear)
* 313: contenido para X e Instagram (después de 241 y 246; con el 259 y el 257)

**F. Técnico: herramientas a probar y datos para afuera (cuando haya tiempo; nada urgente)**
* 314: Stirling PDF contra los PDFs difíciles (escaneos, tablas rotadas), comparado con Tesseract y Mistral
* 315: Crawl4AI para bajar la lista de documentos de un regulador y compararla con lo cargado
* 316: detector de documentos nuevos (después de 315; mejora el 252)
* 317: Supabase como espejo de lectura de un país, para auditar en SQL (experimento descartable)
* 318: Open Notebook sobre las transcripciones de un país, para encontrar patrones
* 319: la skill I have ADHD en una sesión de lote, con y sin
* 320: Browser Use para portales con formularios fijos (cuando aparezca uno)
* 321: Higgsfield para imágenes y video del 313
* 322: Zapier y OmniRoute, a demanda
* 248: taxonomía genérica y subcategorías por deporte (antes del esquema; resuelve también 130 y 183)
* 130 y 183: otros deportes, polideportivos e Italia fuera del fútbol (después de 248)
* 270: estimado de club nuevo: queda como está; volver a medir cuando entren más años de Noruega, Suiza y Países Bajos
* 245: datos como JSON con esquema
* 247: registro público de correcciones (sobre 245)
* 249: API en dominio propio (último; no construirla ahora)

**G. Orden de la casa**
* 255: consolidar las reglas repartidas (lo chequeable ya pasó a hooks)
* 256: CHANGELOG corto
* 257: skills que faltan (después de 255)
* 237 al: anexo UEFA para abrir las ventas (lo dejaste para después)
* 51: proceso de mails a clubes
* 278 y 287: carpetas duplicadas: la herramienta está (`tools/mudar-carpetas.mjs`, ensayo 3 a unir y 21 duplicados al archivo); la principal la corre cuando termine el lote 97 (toca Cardiff y Swansea)
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
   api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
   SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
   (`Admin/fuentes-externas.md`, "Consecuencias").
252. EJERCICIOS NUEVOS: LO QUE QUEDA (pedido de Guido; mensual). La revisión está hecha: `tools/ejercicios-nuevos.mjs` y una tarea programada
   (día 1, 9:00, carpeta principal); todas las notas tienen canal. Falta: onboardear Instituto 2024-25 (Ejercicio N°71, bajado de Drive; anotado en la
   nota; ya bajados) y onboardearlos; cargar los clubes con el PDF del ejercicio siguiente ya bajado (`node tools/ejercicios-nuevos.mjs` los lista;
   onboarding); Gladbach y Stuttgart 2025, en el Unternehmensregister desde enero de 2027 (publica a los ~13 meses); el script no reconoce como "ya
   bajado" un documento cuyo cierre cambió de fecha (River, agosto → diciembre).
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
   Geschäftsbericht); Japón 2025 (10 clubes) y América (la fuente no nombra la transcripción); Volos 2019-2020 (formato Β.5 solo con
   totales); Ferroviária 2014 (al PDF le falta la página del pasivo no corriente) y Remo 2019 (sin balance), los dos parciales; Alverca 2022-2025 y Estrela 2023 (montos con accionistas sin nota de préstamo:
   preguntar al club); HSV 2024 y RB Leipzig 2023-2024 (la escala del año: to-do 289). Dortmund 2024-2025 y RB Leipzig 2022 y 2025, escritos el 2026-10-18.
   Unión 2022-2024, Argentinos Juniors 2019 (caja) y Mirassol 2024 (deuda 0) cargados el 2026-10-19; la AFAC de Ferroviária no es
   deuda (Guido). Informe: `Admin/mediciones/informe-260-caja-deuda-sin-documento-nuevo.md`.

273. ESTADIO Y SPONSOR: LO QUE QUEDA. Cerrado salvo un punto (Guido, 2026-10-19: los ejercicios ya cargados sin sponsor quedan en null
   y no se vuelven a buscar). La compuerta ya está nombrada en la skill de onboarding (2026-10-19). Falta: que
   `generate-sponsors.js` sume `tools/contexto-manual.json` (los años viejos sin sponsor no se completan).
282. QUIÉN AUDITA: LO QUE QUEDA (pedido de Guido, 2026-10-17). Los 1004 balances tienen línea, la tarjeta de Finanzas está (con el
   "alcance" de una revisión limitada, procedimientos acordados, propósito especial o cuentas del grupo). Falta: (a) 56 informes del auditor
   que no están en ningún PDF nuestro (`node tools/auditoria.mjs --pendientes`, "FALTA EN EL PDF"): casi todos sin canal público, son candidatos a mail (sin pedir: Guido no lo quiere ahora);
   queda Go Ahead Eagles 2025 (sin canal público: candidato a mail, sin outreach) (Lazio 2006 ya salió de Wayback; Roma 2022 queda pendiente por decisión de Guido: no hay informe del consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025
   cambian de informe (los dos están bajados). (f) que el pipeline exija la línea al dar de alta un club (fos-pipeline). En Ligas ya está la
   tarjeta "Las cuentas de la liga": cada entidad que entra por el 295 aparece sola.
283. VÅLERENGA Y AALESUND: SUMAR EL AS Y EL FLI EN UN SOLO AÑO (pedido de Guido, 2026-10-17). El AS tiene los ingresos comerciales y el
   FLI los sueldos, que el AS le paga como transferencia (Vålerenga Elite 2023: 85,4 M de sueldos; el AS le transfiere 87,5 M); ninguno
   consolida. Sumar los dos documentos sin contar dos veces la transferencia, con una nota en Finanzas que explique la suma.
   Vålerenga: 46 PDFs sin `.md`; 40 `.md` de subagentes que cortaron por el límite de uso están SIN trackear y SIN verificar en
   fos-onboarding (algunos sin mirar las imágenes): validarlos con `pipeline.mjs --lista Admin/lotes/transcribir-valerenga.txt` o rehacerlos con Mistral.
284. FREDRIKSTAD Y SARPSBORG 08: EL CLUB ES EL FLI (pedido de Guido, 2026-10-17). Fredrikstad: FLI 2012-2018 y 2024 cargados. Sarpsborg 08:
   FLI 2012 y 2014-2025 cargados; 2008 sin liga confirmada. Pardubice: no darle el alta con lo que hay (es FK Junior z.s.); el sourcing de la a.s.
   lo hace Guido.
287. QUE NO SE REPITA LA LIMPIEZA (cierre de onboarding). `audit.js` `carpeta-doble` ya está (P2): dio 25 hallazgos reales para mirar
   contra el documento (Hearts en Kelty Hearts, Fjölnir en ÍR; carpetas dobles de NEC, RFS, Thun, St. Gallen y Omonia; informes de liga
   compartidos a propósito: Bundesliga 2, Ljungskile/United Nordic, Brasil), sin silenciar ni mover nada; va con el 278.
   Un `.md` sin PDF no es error (Ajax, PSV, Feyenoord y AZ 2023-25 son la fuente publicada de lo cargado).
292. TRANSCRIPCIONES POR SUBAGENTES: CARGAR (Estonia, Bélgica, Suiza, Beşiktaş, Países Bajos y Colombia). Validación (326 listas) y Mistral
   hechos; Estonia y Bélgica dados de alta (lotes 89 y 90, 17 clubes). Falta: los lotes de carga por país que siguen (91-92 en curso,
   después Suiza, Colombia, Beşiktaş); Países Bajos: el alta de los 26 clubes está hecha (lote 93); sigue el lote 95 con los demás
   años de los clubes nuevos (lista en `Admin/Archive/sesion-onboarding-2-2026-10-19.md`) y volver a correr Bélgica (lote 92); OH Leuven 2022 y Llaneros 2022, que siguen sin tablas (ver 298 e); decidir subagentes
   o Mistral para los 319 `.md` viejos sin tablas de `Admin/lotes/sin-tablas-6paises.txt`, después de medir el 298 e.
   Lote 101: Luzern 2019 y 2022 y Go Ahead Eagles 2021-2024 cargados; Basel espera la 324; Luzern 2018 y 2024 frenan por estadio o
   sponsor, 2020 y 2023 por categorías en cola (y el tie-out de gastos de 2023). Sigue el lote 102 (Lommel, Lierse, Patro Eisden).
298. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por
   vez; el detalle con casos, en `Admin/Archive/sesion-onboarding-2026-10-18-2.md`). a) CIERRE FALSO en verificar.mjs: compara en valor
   absoluto y da "cierra" con una fila del lado o signo equivocado (Lierse Kempenzonen 2022 habría cargado un gasto como ingreso): lo más
   grave. b) Esquema NBB belga en verificar.mjs y cargar.mjs: costos financieros 65/66B positivos, renglones "(+)/(-)" por valor absoluto,
   el 76A sumado aparte, y verificar y la propuesta que no leen igual el signo; una regla por código NBB. aa) `tools/worktree.mjs mergear` deja sin commitear `data/sponsors.js` y `data/sponsors-indice.js`, que regenera
   `generate-sponsors.js`: sumarlos a su lista de `git add` (el commit siguiente frena por asset-v-sin-subir).
   Aviso para la próxima corrida grande: 368 documentos viejos sin tablas (221 en "revisar", 102 en "pendiente-segunda-voz", 38 en
   "sin-tablas") se rehacen con Mistral (~US$ 83 más la validación) apenas pasen por resolver-inventario; el ensayo ya lo cotiza.
   RWDM 2019: el registro
   tiene el cierre 2019-11-30 y el balance va del 30/11/2018 al 30/06/2019 (como la f). Escocia, Gales e Irlanda del Norte se ven como GB
   ("Inglaterra") en el selector: decisión de pantalla pendiente. g2) partir en la cola cualquier fila según su nota (otros países, el 66A de Lommel SK
   2025): solo si aparece otra fila mixta sin códigos; el 630 belga ya sale solo. i) alta-club.mjs: un país nuevo
   frena hasta agregar su fila a PAISES: que la proponga. o) dos versiones "-correction" del mismo ejercicio entran juntas al lote (Bélgica): que
   entre una sola.
af) listas de las ligas amateur belgas
   de esos años para el estadio (Lokeren-Temse 2022, Patro Eisden 2013-2015).
   ai) St. Gallen: la compensación intragrupo "Entschädigung von/an FCSG Event AG" se suma como ingreso en la columna combinada (2018-19,
   2019-20, 2021-22 y 2023-24); con el perímetro de las dos sociedades sumadas debería netearse (decisión de perímetro de Guido pendiente).
   Y 6 casos de la cola ("Erträge brutto" y "Direkte Kosten" 2018-19, 2021-22 y 2022-23): ¿se carga el desglose de las cuentas individuales
   de las dos sociedades (suman casi exacto) en vez de la fila consolidada? Si no: lump_football_operations y other_expenses.
   aj) la columna del año anterior invierte el signo de "Ertragsminderungen" y de "Resultaat vergoedingsommen", y suma el subtotal
   "Erträge netto" cuando el documento lo imprime. Detalle de ah a aj en `Admin/Archive/sesion-onboarding-3-2026-10-19-e.md`.
   z2) (también Aston Villa 2023-24, 13 meses por cambio de cierre de mayo a junio, precedente Wolves 2025: la compuerta de `cargar.mjs`,
   `per.meses < 12`, no reconoce una transición de más de 12 meses con importes del año anterior; Aston Villa se carga con la compuerta
   salteada a mano esa sola vez) Westerlo 2015: 18 meses por cambio de cierre (no es primer ejercicio), sigue frenado; regla a decidir con Guido. t2) los años 2025 belgas ya cargados tienen ajustes `fila` y el escalón NBB no corre en
   ellos: Patro Eisden 2025 (ingresos +1.810 por el waarvan 76A, gastos +4.012 por el 631/4), Lommel SK 2025 (gastos +172, el 609) y Lommel SK
   2018 (−182 de financiero) cerraron por tolerancia con errores chicos: decidir con Guido si se corrigen (escalón: correr el NBB también
   con ajustes si el resultado sigue exacto). El detalle,
   con líneas y montos, en `Admin/Archive/sesion-onboarding-2026-10-18-5.md`. k) alta-club.mjs / cargar-lote.mjs escriben la liga del alta en null aunque
   `altas-revision.jsonl` traiga las ligas verificadas (las 17 altas de los lotes 89-90): que el alta las tome de la revisión.
270. ESTIMAR UN CLUB QUE NUNCA CARGAMOS: VOLVER A MEDIR (pedido de Guido, 2026-10-17). Está PRENDIDO desde el 2026-10-18 (decisión de
   Guido: en Ligas todo club sin balance figura como estimado), con 50% de error (regresión sin historia: mediana de la liga-año, división,
   posición en la tabla). Medido otra vez el 2026-10-19 con 1.011 club-años (`node tools/estimar.mjs --medir --detalle`): sigue en 50%,
   pero va de 33% (Italia, Chile, Bélgica) a 95-97% (Estonia, Países Bajos). La causa es una sola recta global que sobreestima las ligas
   chicas y subestima las grandes. "Partidos contra clubes con finanzas" no mejora nada (51% contra 50%). A decidir con Guido (detalle en
   `Admin/Archive/sesion-finanzas-4-2026-10-19-e.md`; Guido, 2026-10-19: el modelo queda como está). Las opciones medidas: (1) efecto de país o liga en la regresión, medido dejando afuera el país entero;
   (2) atajo: la mediana de la liga donde le gana al modelo (50% a 46%, optimista); (3) sacar Estonia y Países Bajos de los estimados de
   Ligas hasta tener más datos; (4) el texto del 50% en pantalla: "entre un tercio y el doble, según la liga". Volver a medir cuando
   entren más años de Noruega, Suiza y Países Bajos.
278. CARPETAS DUPLICADAS EN Clubes/. Cardiff y Swansea en `Inglaterra/` y `Gales/`; `Suiza/FC St. Gallen` y `Suiza/St. Gallen`.
   `faltantes-liga` las lee juntas. Unificar sin borrar ningún PDF y chequeando antes las referencias del pipeline.
195. GESTIONES SIN FUENTE (solo entran las `confirmada: true`). Una tanda nueva se arma sola desde los casos de la cola con
    `node tools/gestiones-tanda.mjs --armar --escribir` (la última, tanda-2026-10-19: 18 de Bélgica y Estonia, con criterio de Estonia en
    `Admin/gestiones-por-pais/ee.md`; 7 preguntas a los clubes en `Admin/dudas-por-club.md`). Siguen sin cubrir:
    - con caso en la cola y la pregunta en `Admin/dudas-por-club.md` ("Gestiones sin fecha confirmada"): CRB 2020, Cuiabá 2022-2025, Vila
      Nova 2014, Ferroviária 2010-2013 y 2023 (además, criterio de SAF: presidente del consejo o director-presidente), Goiás 2010-2013 y
      2017, OFI 2018 (administración judicial: sin gestión, decisión de Guido);
    - sin caso en la cola, buscados en la tanda-2026-10-19-2 sin confirmar (esperan respuesta del club, ya en `Admin/dudas-por-club.md`):
      Novorizontino 2010 y Cruzeiro 2024-2025 (Pedro Lourenço: compra firmada el 29-04-2024, CADE el 12-06-2024);
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

261. REINO UNIDO: TRANSCRIPCIÓN POR SUBAGENTES (pedido de Guido, 2026-10-16: gastar la ventana de 5 horas de la suscripción). 114 .md hechos y
    commiteados (93 con subagentes Opus y 21 con Sonnet) (Tesseract + revisión de las páginas clave contra la imagen; los 93 dan 0 P1 / 0 P2 en `check-transcripcion-fidelidad.js`):
    años 2021-2026 de los clubes de Premier, F1, cricket y rugby que ya tenían algún .md. Cola, scripts e instrucciones:
    `Admin/transcripcion-subagentes/README.md` (van 77 de 1531 bloques; Guido, 2026-10-19: no transcribir más con subagentes, el resto va por Mistral con el ensayo; `claim.sh` tiene la ruta de la principal: en un worktree, una copia apuntada a esa carpeta; quedan unos 3600 PDFs, casi todos escaneos). Falta:
    a) Validados los 118 (19-10: 106 + los 12 de Sonnet, US$ 8,59 + 1,3). Falta el lote de carga (etapa 3 en adelante). Ojo al cargar: Leeds 2019-20 es de 13 meses
       y 2020-21 la versión "AMENDED" de 11; Red Bull 2020, usar el turnover del estado (229.754), no el de la pág. 4. Falta el lote (etapa 3 en adelante); Celtic 2020-21 con
       `--max-paginas 0`. Tres con páginas que solo validó Claude (Celtic 2021-22 pág. 52; los otros en `transcripciones-estado.jsonl`):
       cerrar con sum-check al onboardear. Notas de West Ham 2019-21 y parte de Aston Villa cerradas por sumas: mirarlas antes de caja y deuda.
    c) Los 3 `wf-*` duplicados ya están en descartados y los mal nombrados, anotados en `sociedad-por-documento.md`. Antes de transcribir el resto de los `wf-*` (están al final de la cola), mirar si repiten un documento ya transcripto.
    d) Chelsea 2021-22 (Sonnet): solo los 4 estados se miraron contra la imagen; las notas se corrigieron por sumas. Revisar las notas
       contra el PDF antes de cargar caja y deuda.
313. CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
    Ideas a diseñar cuando se retome, una por vez y con el ok de Guido:
    (a) la skill de contenido y difusión (ya es el 257): un año cargado → hilo o post con el dato verificado y el link a la fuente;
    (b) un script que proponga "dato del día" desde lo cargado (el ranking de una liga, el club que más cambió de deuda o de ingresos, un
        club que nunca figuró) y solo con años que pasaron `verifyTieOuts()`, para que cada post salga con cifra chequeada;
    (c) tarjetas de imagen con el mismo estilo del sitio (tamaños de X e Instagram; con Design antes) y, si ayuda, un video corto
        con Higgsfield (321);
    (d) un calendario: qué liga o club se publica cada semana, para no repetir;
    (e) enlaces a `/club/<id>` con tarjeta al compartir (241) y medir qué publicaciones traen visitas. Depende de 241 y 246.
314. PROBAR STIRLING PDF (idea, 2026-10-19). Levantarlo en Docker local y medirlo contra los PDFs que hoy dan más trabajo (escaneos, tablas
    rotadas, filas que no concilian), contra Tesseract y Mistral: una tabla "PDF difícil → motor → fidelidad contra los totales oficiales".
    No cambia nada del pipeline; si gana en algún caso, se diseña un escalón con el ok de Guido. Conectado con el costo de Mistral (298) y
    con los escaneos del 261.
315. PROBAR CRAWL4AI PARA SOURCING (idea, 2026-10-19). Que un script baje en Markdown la lista de documentos de un portal de regulador
    (empezar por uno ya conocido, el belga o el noruego) y la compare con `Admin/ESTADO-clubes.md`. Mide si reemplaza navegar con el Browser
    pane (menos tokens: va con la regla de scripts antes que sesión). Va con las notas de `club-sourcing`.
316. DETECTOR DE DOCUMENTOS NUEVOS (idea, 2026-10-19; optimiza el 252). Hoy `tools/ejercicios-nuevos.mjs` corre una vez por mes. Con Maxun o
    con 315 más una tarea programada, vigilar los portales que publican cada año y dejar los candidatos en `Admin/sourcing/README.md`,
    sin que Guido tenga que pasar los links. Después de 315.
317. SUPABASE COMO ESPEJO DE LECTURA (idea, 2026-10-19; con el 245 y el 258). Un experimento descartable: exportar los ejercicios de un solo
    país a tablas y correr las auditorías en SQL (rubros que no suman, años faltantes, outliers entre clubes) para comparar con
    `verifyTieOuts()`. Sirve de medida para decidir cuándo `data/*.js` deja de alcanzar (skill de escala). No es una migración. Sobre lo de
    "Supabase recuerda y Claude no": la memoria entre sesiones ya la dan CLAUDE.md, las skills y la carpeta de memoria; una base con
    pgvector solo agrega búsqueda semántica y hay que construir la recuperación encima.
318. OPEN NOTEBOOK SOBRE LAS TRANSCRIPCIONES (idea, 2026-10-19). Cargar las `Clubes/<País>/**/*.md` de un país y preguntarle cosas
    ("¿qué clubes reportan préstamos de accionistas?") para encontrar patrones y armar `Admin/dudas-por-club.md` y las referencias de
    `club-data-mapping` más rápido. Probar con un país antes de pensar en todo.
319. PROBAR I HAVE ADHD EN SESIONES DE LOTE (idea, 2026-10-19). Skill de Claude Code que pone la respuesta primero y saca el relleno
    (repo `ayghri/i-have-adhd`; verificar el dueño antes de instalar, hay copias con el mismo nombre). Probar un lote con y sin ella; en
    línea con "un mensaje, preguntas en orden".
320. PROBAR BROWSER USE (idea, 2026-10-19). Solo para portales con formularios de secuencia fija que hoy consumen mucho contexto del Browser
    pane. Esperar a que aparezca uno en un lote; hoy no es urgente.
321. HIGGSFIELD MCP (idea, 2026-10-19). Conector (`https://mcp.higgsfield.ai/mcp`) para generar imágenes y video corto con créditos de
    Higgsfield. Sirve para los visuales del 313 (c); verificar precio y condiciones en su sitio, las fuentes encontradas son blogs.
322. ZAPIER MCP Y OMNIROUTE (ideas, 2026-10-19; a demanda). Zapier: solo si el flujo de mails (51) o el de publicación (313) necesitan
    automatizar "respuesta → fila" o programar posts; exponer solo las acciones necesarias. OmniRoute: gateway local de modelos con
    fallback, para abaratar la API (no Haiku, ver la regla de modelos); concentra credenciales y prompts, así que se revisa el repo
    antes. Quedan sin ubicar OpenSEO (para el SEO del 241), Book to Skill y Open Generative AI: pedir los links a Guido.

