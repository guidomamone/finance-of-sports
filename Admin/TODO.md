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

**A. En marcha**
* 246: ids estables con mapa de alias; primero el diseño, para tu ok --> Datos 3
* 245 fase 2: el JSON pasa a ser la fuente y el `-data.js` se genera desde ahí (D1 y D2 decididos), después del 246 --> Datos 3

**B. Pantallas y distribución (después del 246)**
* Vålerenga: la tabla de Finanzas repite etiquetas de las dos entidades sumadas (dos «Lønnskostnad»); mostrar de qué entidad es cada una
* 282: quién audita, lo que queda (informes del auditor sin canal público: candidatos a mail, cuando lo decidas)
* 241: link dedicado, nivel 2: rutas reales, tarjeta al compartir, SEO (mockup con Design antes)
* 259: material de difusión (después de 241)
* 313: contenido para X e Instagram (después de 241 y 246; con el 259 y el 257)

**C. Técnico (cuando haya tiempo; nada urgente)**
* 248: taxonomía genérica y subcategorías por deporte
* 247: registro público de correcciones (sobre 245)
* 249: API en dominio propio (último; no construirla ahora)
* 270: estimado de club nuevo: volver a medir cuando entren más años de Noruega, Suiza y Países Bajos
* 327: los 12 chequeos automatizables que dejó el 255 (sección 4 de `Admin/Archive/consolidar-reglas-255.md`): elegir cuáles van a hook o a audit.js (Pipeline)
* 317 a 322: herramientas a probar (Supabase, Open Notebook, I have ADHD, Browser Use, Higgsfield, Zapier y OmniRoute)

**D. Orden de la casa**
* 330 (después del 246 y el 245, decisión de Guido): revisar todo el proyecto buscando dónde se gastan tokens en decidir o descubrir cosas que después se pierden (decisiones en el chat o en notas de sesión que no llegan a una regla, a un registro ni a una tool; hallazgos que no se leen nunca); proponer dónde tiene que quedar cada cosa
* 326: check-in de outreach, el 2026-10-24
* 257: skills que faltan
* 278 y 287: carpetas duplicadas: la herramienta está (`tools/mudar-carpetas.mjs`); la principal la corre cuando no haya lotes corriendo en ningún worktree
* 237 al: anexo UEFA para abrir las ventas (lo dejaste para después)
* 51: proceso de mails a clubes
* 258: índice partido por país o liga (cuando la skill de escala lo diga)


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

241. LINK DEDICADO, NIVEL 2: RUTAS REALES, TARJETA AL COMPARTIR Y SEO (mejoras de proyecto, pedido de Guido 2026-10-16). `/club/<id>` y `/liga/<id>` pre-generadas (redirect de Netlify +
   un generador de HTML por club, como `fuentes/<club>.html`), con título, descripción y OG image ("Boca Juniors · Ingresos 2025: US$ 120 M").
   WhatsApp y Google no ejecutan JS: sin esto la preview es la portada y nadie que busque "deuda de Boca" llega. Mockups con Design antes de codear.
245. DATOS COMO JSON CON ESQUEMA (mejoras de proyecto, pedido de Guido 2026-10-16). Hoy son JS (`const xRevenueLinesByYear = {...}`), sin versión de esquema, con la unidad implícita
   (millones) y la moneda en otro archivo. JSON con schema_version, unit/scale/currency explícitos y fecha de corte, como fuente; el JS del
   sitio se genera desde ahí. FASE 1 HECHA (2026-10-20, aprobada por la auditora): esquema en `Admin/mediciones/245-esquema.md` (por club,
   millones con `unit.scale`, nombres en inglés, `period_end` y `exported_at`); `tools/exportar-json.mjs`, `tools/validar-esquema-json.mjs`
   y `tools/ida-y-vuelta.mjs` (313 de 313 idénticos). Falta la FASE 2: que el JSON sea la fuente y el JS se genere desde ahí (con todo
   mergeado y sin worktrees, como el 246), con los cambios de skills y documentos que inventaría Docs 1. En la fase 2 también (Guido,
   2026-10-20): los nombres de campo de los bloques de texto libre pasan al inglés (los textos quedan en español) y Boca se normaliza a la
   estructura de los otros clubes (sus fuentes y gestiones viven hoy en clubs.js y gestiones/ar.js).
   Decidido (Guido, 2026-10-20): el JSON fuente vive en `data/<país>/<club>.json` y se publica como dato abierto (D1); el sitio sigue
   cargando el `-data.js`, que pasa a ser GENERADO desde el JSON (D2). Inventario: `Admin/mediciones/245-inventario-docs.md`.
   Hecho (2026-10-20): JSON Schema formal (`data/schema/club-v1.json`) y `datapackage.json` (CC BY-NC 4.0, solo lo financiero).
246. IDS ESTABLES (mejoras de proyecto, pedido de Guido 2026-10-16). Conviven ids sin país (realmadrid, athleticclub) y con país (elche-es, corinthians-br). Normalizar antes de tener
   clientes de una API, con un mapa de alias de los ids viejos.
247. REGISTRO PÚBLICO DE CORRECCIONES (mejoras de proyecto, pedido de Guido 2026-10-16). Las correcciones se registran adentro (ajustes, evidencia por club); afuera nadie sabe qué cambió
   ni cuándo, dato por dato. Un registro público versionado.
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
259. MATERIAL DE DIFUSIÓN (mejoras de proyecto, pedido de Guido 2026-10-16). Un deck para periodistas y sponsors, o un informe por liga ("las finanzas de LaLiga 2025 en 10 slides"), con
   el tipo Slides. Sin código.
282. QUIÉN AUDITA: LO QUE QUEDA (pedido de Guido, 2026-10-17). Los 1004 balances tienen línea, la tarjeta de Finanzas está (con el
   "alcance" de una revisión limitada, procedimientos acordados, propósito especial o cuentas del grupo). Falta: (a) 56 informes del auditor
   que no están en ningún PDF nuestro (`node tools/auditoria.mjs --pendientes`, "FALTA EN EL PDF"): casi todos sin canal público, son candidatos a mail (sin pedir: Guido no lo quiere ahora);
   queda Go Ahead Eagles 2025 (sin canal público: candidato a mail, sin outreach) (Lazio 2006 ya salió de Wayback; Roma 2022 queda pendiente por decisión de Guido: no hay informe del consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025
   cambian de informe (los dos están bajados). En Ligas ya está la
   tarjeta "Las cuentas de la liga": cada entidad que entra por el 295 aparece sola.
287. QUE NO SE REPITA LA LIMPIEZA (cierre de onboarding). `audit.js` `carpeta-doble` ya está (P2): dio 25 hallazgos reales para mirar
   contra el documento (Hearts en Kelty Hearts, Fjölnir en ÍR; carpetas dobles de NEC, RFS, Thun, St. Gallen y Omonia; informes de liga
   compartidos a propósito: Bundesliga 2, Ljungskile/United Nordic, Brasil), sin silenciar ni mover nada; va con el 278.
   Un `.md` sin PDF no es error (Ajax, PSV, Feyenoord y AZ 2023-25 son la fuente publicada de lo cargado).
298. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por
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

313. CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
    Ideas a diseñar cuando se retome, una por vez y con el ok de Guido:
    (a) la skill de contenido y difusión (ya es el 257): un año cargado → hilo o post con el dato verificado y el link a la fuente;
    (b) un script que proponga "dato del día" desde lo cargado (el ranking de una liga, el club que más cambió de deuda o de ingresos, un
        club que nunca figuró) y solo con años que pasaron `verifyTieOuts()`, para que cada post salga con cifra chequeada;
    (c) tarjetas de imagen con el mismo estilo del sitio (tamaños de X e Instagram; con Design antes) y, si ayuda, un video corto
        con Higgsfield (321);
    (d) un calendario: qué liga o club se publica cada semana, para no repetir;
    (e) enlaces a `/club/<id>` con tarjeta al compartir (241) y medir qué publicaciones traen visitas. Depende de 241 y 246.
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
326. CHECK-IN DE OUTREACH A LOS 30 DÍAS (2026-10-24, sacado de la skill `club-outreach`): evaluar lo que dice
    `Admin/outreach/checkin-2026-10-24.md`; hay una tarea programada que lo pregunta, el archivo es el respaldo.
327. CHEQUEOS QUE DEJÓ EL 255 (2026-10-20). Los 12 de la sección 4 de `Admin/Archive/consolidar-reglas-255.md`: elegir cuáles se automatizan
   (hook o audit.js) y hacerlos con el circuito de Pipeline. Nada urgente.
330. DÓNDE SE PIERDE LO QUE SE DECIDE O SE DESCUBRE (pedido de Guido, 2026-10-20). Revisar el proyecto entero (notas de sesión,
   `Admin/Archive/`, HALLAZGOS, mediciones, dudas, registros, chats de sesiones) buscando tokens gastados en decidir o descubrir algo que
   después no llega a ningún lado: una decisión que no quedó como REGLA ni en un registro, un hallazgo que nadie vuelve a leer, una
   medición que no cambió nada. Proponer, para cada tipo, dónde tiene que quedar para que la próxima sesión no lo pague de nuevo.
