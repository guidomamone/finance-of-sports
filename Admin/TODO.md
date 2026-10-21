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

Se trabaja de arriba hacia abajo, en el orden numerado (Guido, 2026-10-20): A, B, C y D; E queda para después. Dentro de cada bloque,
el número de la izquierda es el orden de trabajo.

**A. En marcha**
* Lo que está en marcha va marcado en cada bloque.

**C. Técnico**
1. 327 (Pipeline 10): 4 chequeos nuevos en audit.js y 6 frenos automáticos en el hook (ok de Guido)
2. 248 (Datos 4, Opus): taxonomía genérica y subcategorías por deporte; se prueba cargando Bath Rugby (Guido)
3. 317 a 322: herramientas a probar (Supabase, Open Notebook, I have ADHD, Browser Use, Higgsfield, Zapier y OmniRoute)
4. 249: API en dominio propio (el último de C; no construirla todavía)

**D. Orden de la casa**
5. 330: dónde se gastan tokens en decidir o descubrir cosas que después se pierden, y dónde tiene que quedar cada una
6. 278 y 287: carpetas duplicadas con `tools/mudar-carpetas.mjs` (la principal, sin lotes corriendo)
7. 257: skills que faltan
8. 237 al: anexo UEFA para abrir las ventas
9. 258: índice partido por país o liga (cuando la skill de escala lo diga)

**E. Después de A a D (Guido, 2026-10-20)**
10. 337: las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)
11. 313: contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)
12. 335: mails a clubes

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

248. TAXONOMÍA GENÉRICA + SUBCATEGORÍAS POR DEPORTE (mejoras de proyecto, pedido de Guido 2026-10-16). Una capa genérica (ingresos y gastos operativos, deuda) y las subcategorías de cada
   deporte debajo, para que wages_squad no quede como campo de primer nivel de una API. Sin otros deportes por ahora (Guido, 2026-10-20: no se transcribe más).
249. API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
   api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
   SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
   (`Admin/fuentes-externas.md`, "Consecuencias").
257. SKILLS QUE FALTAN (mejoras de proyecto, pedido de Guido 2026-10-16). Producto/pantalla (mockup, ok, implementación, chequeo en celular; hoy mezclado en PANTALLA.md); contenido y
   difusión (un año cargado → hilo o post con el dato verificado y el link a la fuente); contrato de datos/API (esquema público y qué lo
   rompe); deploy/release (qué chequear antes de pushear y cómo verificar producción).
258. ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). clubs.js + club-index.js pesan ~93 KB para ~230 clubes y se bajan siempre (con 10.000 clubes,
   ~4 MB). Partir el índice y cargar el buscador aparte cuando la skill escala-finance-of-sports diga que llegó el momento.
287. QUE NO SE REPITA LA LIMPIEZA (cierre de onboarding). `audit.js` `carpeta-doble` ya está (P2): dio 25 hallazgos reales para mirar
   contra el documento (Hearts en Kelty Hearts, Fjölnir en ÍR; carpetas dobles de NEC, RFS, Thun, St. Gallen y Omonia; informes de liga
   compartidos a propósito: Bundesliga 2, Ljungskile/United Nordic, Brasil), sin silenciar ni mover nada; va con el 278.
   Un `.md` sin PDF no es error (Ajax, PSV, Feyenoord y AZ 2023-25 son la fuente publicada de lo cargado).
298. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por
278. CARPETAS DUPLICADAS EN Clubes/. Cardiff y Swansea en `Inglaterra/` y `Gales/`; `Suiza/FC St. Gallen` y `Suiza/St. Gallen`.
   `faltantes-liga` las lee juntas. Unificar sin borrar ningún PDF y chequeando antes las referencias del pipeline.

313. CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
    Ideas a diseñar cuando se retome, una por vez y con el ok de Guido:
    (a) la skill de contenido y difusión (ya es el 257): un año cargado → hilo o post con el dato verificado y el link a la fuente;
    (b) un script que proponga "dato del día" desde lo cargado (el ranking de una liga, el club que más cambió de deuda o de ingresos, un
        club que nunca figuró) y solo con años que pasaron `verifyTieOuts()`, para que cada post salga con cifra chequeada;
    (c) tarjetas de imagen con el mismo estilo del sitio (tamaños de X e Instagram; con Design antes) y, si ayuda, un video corto
        con Higgsfield (321);
    (d) un calendario: qué liga o club se publica cada semana, para no repetir;
    (e) enlaces a `/club/<id>` con tarjeta al compartir (241) y medir qué publicaciones traen visitas. Depende de 241 y 246.
    (f) material de difusión (era el 259): un deck para periodistas y sponsors, o un informe por liga («las finanzas de LaLiga 2025 en
        10 slides»), con el tipo Slides; sin código. Nada de esto sale antes del 337.
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
322. ZAPIER MCP Y OMNIROUTE (ideas, 2026-10-19; a demanda). Zapier: solo si el flujo de mails (335) o el de publicación (313) necesitan
    automatizar "respuesta → fila" o programar posts; exponer solo las acciones necesarias. OmniRoute: gateway local de modelos con
    fallback, para abaratar la API (no Haiku, ver la regla de modelos); concentra credenciales y prompts, así que se revisa el repo
    antes. Quedan sin ubicar OpenSEO (para el SEO del 241), Book to Skill y Open Generative AI: pedir los links a Guido.
327. CHEQUEOS QUE DEJÓ EL 255 (2026-10-20). Los 12 de la sección 4 de `Admin/Archive/consolidar-reglas-255.md`: elegir cuáles se automatizan
   (hook o audit.js) y hacerlos con el circuito de Pipeline. Nada urgente.
330. DÓNDE SE PIERDE LO QUE SE DECIDE O SE DESCUBRE (pedido de Guido, 2026-10-20). Revisar el proyecto entero (notas de sesión,
   `Admin/Archive/`, HALLAZGOS, mediciones, dudas, registros, chats de sesiones) buscando tokens gastados en decidir o descubrir algo que
   después no llega a ningún lado: una decisión que no quedó como REGLA ni en un registro, un hallazgo que nadie vuelve a leer, una
   medición que no cambió nada. Proponer, para cada tipo, dónde tiene que quedar para que la próxima sesión no lo pague de nuevo.
335. MAILS A CLUBES (une el 51, el 282 y el 326, Guido 2026-10-20). Todo lo que implique escribirle a un club vive acá. Nadie manda ni redacta
   un mail sin que Guido lo pida en sus palabras.
   (a) Proceso: Etapa 1 lista y probada de punta a punta (Resend, `outreach.financeofsports.com`, cola en `Admin/outreach/`, envío desde
   la terminal de Guido con `tools/outreach-send.js`); el flujo, en la skill `club-outreach`. Etapa 2 (disparo automático: 3 preguntas
   acumuladas o 90 días; follow-up y cooldown) documentada, no prendida. Cuándo amerita un mail: `club-sourcing`, sección 0.3.
   (b) Check-in a los 30 días, el 2026-10-24: `Admin/outreach/checkin-2026-10-24.md` (hay una tarea programada que lo pregunta).
   (c) Informes del auditor que faltan: 56 que no están en ningún PDF nuestro (`node tools/auditoria.mjs --pendientes`, "FALTA EN EL
   PDF"), casi todos sin canal público; entre ellos Go Ahead Eagles 2025. Roma 2022 queda así por decisión de Guido (no hay informe del
   consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025 cambian de informe (los dos están bajados).
   (d) Las preguntas a cada club: `Admin/dudas-por-club.md`.
337. ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
   Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
   (clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
   se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
   Medido (Onboarding 7, 2026-10-20; detalle en `Admin/sesiones/onboarding.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
   Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
   con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
   faltan (Pipeline).
