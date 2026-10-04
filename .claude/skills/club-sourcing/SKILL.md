---
name: club-sourcing
description: Metodología para BUSCAR estados financieros/balances auditados de clubes de fútbol que todavía no tienen nada cargado en finance-of-sports — qué regulador o canal público chequear según el país, gotchas concretos de cada portal (URLs que no sirven, formularios que hay que usar de una forma específica, categorías legales que determinan si un club puede o no tener balance público), y qué hacer cuando no se encuentra nada. Usar ANTES de salir a buscar PDFs de un club/país nuevo, para no repetir intentos que una sesión anterior ya probó y descartó. Es sourcing (encontrar y guardar el PDF), no mapeo de datos — para categorizar lo que ya se encontró, ver `club-data-mapping`.
---

# Cómo buscar estados financieros de clubes, país por país

**Actualizado 2026-09-13: esto ya no es solo de fútbol.** El archivo `paises/Reino-Unido.md` fue el primer
hallazgo donde el canal NO depende del deporte sino de la forma jurídica del club, y de una sola vez
abrió fútbol, rugby union, cricket y Fórmula 1. Cuando encares un país nuevo, la pregunta útil no es
"¿dónde publica su balance un club de fútbol de acá?" sino "¿qué obligación de publicar tiene la
figura jurídica que usan los clubes de acá?" — la respuesta suele servir para todos los deportes
juntos.

Este skill es la memoria de qué funcionó y qué no al buscar balances/estados contables auditados de
clubes que todavía no están en el sitio (fuera de Argentina, principalmente, donde el criterio ya es
distinto — ver sección 0). Salió de sesiones reales de sourcing (agentes en background que barrieron
decenas de clubes por país), no es teoría. Leelo ANTES de salir a buscar un club/país nuevo: te ahorra
repetir un intento que ya se probó y descartó, y te da el ángulo que SÍ funcionó para países similares.

**Esto es solo sourcing** (encontrar el documento y guardarlo en `Clubes/<País>/<Club>/`, documentar
en `fuentes/<País>/<Club>.md`). Categorizar lo que ya se encontró es otro skill (`club-data-mapping`).
Cómo estructurar la sesión de onboarding completa (una vez que ya hay un PDF elegido) es
`club-or-year-onboarding`.

## 0. Regla general, para cualquier país

- **Fuente oficial primero, siempre.** El dominio propio del club (o un link que el dominio oficial
  comparta directo, ej. un PDF de Google Drive/Dropbox embebido en una noticia oficial) es la única
  fuente aceptable como "primary". Prensa, foros, mirrors de comunidades de hinchas, etc. son un
  último recurso documentado como tal (`reliability:'secondary_press'`/`'secondary_mirror'`), nunca
  presentados como si fueran el documento oficial.
- **Si el dominio oficial está caído o bloquea la conexión** (pasa seguido con hosting chico), probar
  la copia archivada de esa MISMA URL en Wayback Machine (usar la CDX API de archive.org para
  encontrar snapshots) antes de descartar el club — sigue siendo el documento del club, solo que
  servido por archive.org en vez de en vivo.
- **Antes de anotar "no se encontró nada", seguí la REGLA 2 de `fuentes/README.md`** (ya
  documentada ahí, no se repite acá): registrar CADA intento con el detalle de qué se probó, la URL/
  portal exacto, y por qué falló — nunca alcanza con "no se encontró". Ver `fuentes/Uruguay/
  _notas-generales.md` como ejemplo del nivel de detalle esperado.
- **Guardar los hallazgos**: PDFs en `Clubes/<País>/<Club>/` (mismo nivel que `Clubes/Argentina/`),
  documentación en `fuentes/<País>/<Club>.md`, con su línea en el índice de su país
  (`fuentes/_indice/<País>.md`) — ver `CLAUDE.md` para la convención completa de carpetas.
  **Trabajá siempre sobre el archivo de TU país**: es lo que permite que dos sesiones de sourcing
  corran en paralelo sin pisarse. `fuentes/README.md` (el índice de países) se toca solo al
  terminar, y solo si cambiaron los números de ese país.
- **Si el hallazgo es un video (presentación en YouTube en vez de PDF) o una nota de prensa,
  guardar la URL EXACTA, no solo el título** (encontrado 2026-09-26: `fuentes/Argentina/
  Banfield.md` describía el video del 105° Ejercicio con su título pero sin el link, y hubo que
  volver a buscarlo con `WebSearch` cuando hizo falta para `club-outreach`). Un título alcanza para
  que Guido lo reconozca, pero no para que una sesión futura lo abra sin volver a buscarlo.
- **Si en el camino de buscar un documento aparece un email de contacto del club** (prensa@,
  secretaría@, relaciones institucionales — en el sitio oficial, una nota de prensa, un formulario de
  contacto) y guardarlo no cuesta nada extra, anotarlo en `Admin/outreach/contactos.json` (`email`,
  `source`, `date`). Esto es oportunista, no una obligación a recordar: `club-outreach` busca el
  contacto igual al momento de escribir si no está guardado, así que no hace falta ir a buscarlo
  a propósito en una sesión de sourcing que no lo necesita.
- **Un PDF descargado clickeando un link/botón en el Browser pane cae en `~/Downloads` del sistema,
  NO en el proyecto** (a diferencia de `curl`/`fetch()+Blob`, que sí se pueden apuntar directo a
  `Clubes/<País>/<Club>/`): el Browser pane es un navegador de verdad, y una descarga real de
  sistema operativo no sabe nada de la carpeta del proyecto. Encontrado en la sesión 2026-09-22,
  cuando 18 PDFs de un barrido de República Checa (y de sesiones de otros países) aparecieron
  sueltos en `~/Downloads`, algunos ya duplicados por un `curl` posterior que sí había bajado bien a
  `Clubes/`. **Mové el archivo a `Clubes/<País>/<Club>/` (con `mv`, no `cp`) INMEDIATAMENTE después
  de la descarga, como parte del mismo paso del subagente** — no lo dejes para una sesión de
  limpieza aparte, que es exactamente lo que costó tokens y una sesión entera de "encontrar y
  reidentificar" documentos que ya se habían sourceado bien la primera vez. Si el subagente ya sabe
  que va a necesitar clickear un botón de descarga (portales sin `curl` viable, ver los gotchas de
  Cloudflare/challenge JS más abajo en cada país), preferí de entrada `fetch()+Blob+<a download>`
  desde la consola del Browser pane en vez del click directo: ese método SÍ podés apuntarlo con un
  nombre de archivo que ya incluya la carpeta destino, y evita el paso extra de mover.
- **Antes de cargar cualquier PDF encontrado en un país nuevo al sitio**, releer `club-data-mapping`
  sección 5 (conversión a USD) y sección 14 (`grossDebt`) — ambas asumen implícitamente el criterio
  argentino de "moneda homogénea"/RT6, que puede no aplicar en otro país con otra normativa contable.
- **Antes de lanzar una búsqueda en worktrees separados (varias sesiones en paralelo sobre distintos
  países/clubes), consultar a Guido primero** — qué países/clubes y cuántas sesiones, no asumirlo. La
  excepción es un pedido puntual (un club concreto, o un ejercicio suelto de un club ya conocido): eso
  se corre directo en la sesión actual, sin preguntar y sin worktree.

### 0.1 La escalera de ángulos, y cuándo parar

Un club sin nada cargado no es "buscar hasta encontrar o hasta cansarse": es una escalera de
ÁNGULOS que se agotan EN ORDEN, cada uno A FONDO antes de pasar al siguiente. Lo que importa no es
"cuántos intentos" sino "cuántas familias de ángulo DISTINTAS, cada una llevada hasta su límite
natural" — probar 3 variaciones del mismo canal (3 nombres de archivo parecidos en el mismo sitio)
no son 3 ángulos, es 1 ángulo probado 3 veces.

**Las familias, en el orden en que conviene probarlas:**

1. **Fuente oficial del club** — el sitio propio, MENÚ COMPLETO (no solo la home ni la primera
   sección que parezca obvia, tipo "Transparencia"). Si es WordPress, además del menú, buscar posts
   de asamblea/balance/ejercicio vía `wp-json/wp/v2/search?search=<término>` y abrir CADA resultado
   — el documento real puede colgar de un post cuyo título no menciona "balance" para nada.
   **"Encontré la Memoria y es puramente narrativa" NO es señal de que el club no publica un
   balance real** — es señal de que hay que seguir mirando DENTRO del sitio, no de pasar a la
   familia 2. Gimnasia y Esgrima (La Plata) es el caso que lo prueba: 4 memorias narrativas
   quedaron confirmadas durante sesiones enteras, y el balance real vivía en un PDF SEPARADO,
   colgado del mismo post de convocatoria a asamblea que la memoria. Talleres tiene el mismo
   patrón: el EECC real cuelga de una nota de prensa cuyo título no menciona ni "balance" ni
   "estados contables". Antes de dar un club por agotado en esta familia, mirar el post o la
   sección DE AL LADO de donde ya se encontró algo, no solo lo ya encontrado.

   **Si el sitio devuelve 403/bloqueo a `curl`/`WebFetch`** (WAF, CDN, IP deny — no confundir con
   ausencia de contenido), antes de dar la familia 1 por "parcial" probar Firecrawl (to-do 75,
   validado 2026-09-27, `Admin/firecrawl/.env`): `POST api.firecrawl.dev/v1/scrape` con
   `{"url":..., "formats":["markdown"]}`, agregando `"proxy":"stealth"` si el intento básico falla.
   Costo bajo (~1 crédito por request) — no hace falta ningún gate de "señal" antes de probarlo,
   a diferencia de Exa (ver 0.1b). Para confirmar el MENÚ COMPLETO de un sitio grande de una sola
   vez, en vez de navegar página por página, usar `POST api.firecrawl.dev/v1/map` (barre el dominio
   entero y devuelve todas las URLs internas — resolvió Pachuca, 1.305 URLs en una sola llamada).
   Si Firecrawl también da 403, es señal de un bloqueo de IP/hosting real (ej. cPanel "IP Deny
   rules"), no un challenge JS — ni un Browser pane real lo resuelve tampoco (confirmado con León,
   2026-09-27): ahí no vale la pena seguir escalando tooling, pasar a la familia 3 (Wayback) o
   documentar el bloqueo como confirmado.

   **Portal sin link de descarga directo (botón dispara un flujo JS con token, no una URL fija)**:
   `grep` los bundles JS que carga la página buscando el endpoint real detrás del botón — suele ser
   un token temporario (`GetValetKey`/similar) + un segundo endpoint que lo consume. Con eso se baja
   el archivo con `curl` puro, sin sesión ni login (ver `fuentes/Argentina/River.md` para un caso
   completo, reusable para cualquier portal con esta forma).
2. **El canal país/regulador ya documentado en este skill** (ver el índice de países más abajo), si
   existe uno para ese país. Consultarlo es SIEMPRE prioritario a seguir adivinando en el sitio del
   club: es la fuente con mejor relación señal/costo de todo el proyecto (CMF, SIIS, Companies
   House, Unternehmensregister, etc.).

   **Cada país tiene su propio archivo en `paises/<País>.md` (to-do 87, resuelto 2026-09-27) — leé
   SOLO el de tu país, no hace falta abrir los 28 restantes.** Antes vivían las 29 secciones juntas
   en este mismo archivo (123 KB); un agente sourceando Argentina no tenía por qué cargar qué pasa en
   Grecia. El índice completo está más abajo, después de la sección 0.3.

   **Si el club emitió deuda pública alguna vez (obligaciones negociables/bonos)**, sumar el
   organismo de valores del país (CNV en Argentina, CVM en Brasil, CNMV en España, SEC en EE.UU.,
   etc.) — es un canal distinto del registro de asociaciones civiles/sociedades, con su propio
   régimen de disclosure, a veces más completo (ver `fuentes/Argentina/River.md`).


3. **Wayback Machine, CDX API sobre el DOMINIO COMPLETO** del club (`matchType=domain`), no solo la
   URL puntual que se sospecha. Sirve para dos cosas: recuperar un documento que el sitio vivo movió
   o borró, y como señal fuerte de ausencia total — "0 PDFs archivados nunca en todo el dominio"
   (Chaco For Ever, Gimnasia y Tiro Salta) es mucha más evidencia que "no encontré nada en la
   home".
4. **Búsqueda web dirigida** (`filetype:pdf`, nombre + "estados contables"/"balance"/"memoria" +
   año, nombre + "asamblea"). Complementaria, no sustituye a las 3 de arriba — un club puede indexar
   mal y tener igual el documento colgado en su sitio.

   **Gotcha de la familia 3, Wayback CDX, encontrado en el barrido de 40 clubes tradicionales de
   Argentina (2026-09-26)**: una captura archivada grande puede venir TRUNCADA a exactamente
   1.048.576 bytes (1 MiB), con el header `wayback content truncated by "length"` — y un PDF
   truncado a mitad de archivo puede fallar en silencio al abrirlo o parecer vacío, dando la falsa
   impresión de "0 PDFs archivados" para ese club. El caso real: Almagro había sido cerrado en el
   barrido del 2026-09-22 como "0 PDFs archivados", y resultó tener 6 balances auditados reales
   (Ejercicios 80-85, 2018-2023) que solo aparecían al reintentar la MISMA URL con un timestamp CDX
   distinto de la lista (`cdx.data.length` u otro snapshot cercano en el tiempo suele NO estar
   truncado). **Antes de cerrar un club como "0 PDFs en Wayback" por un resultado vacío o
   sospechosamente corto, reintentar con otro timestamp de la misma URL** si la CDX API lista más de
   uno — no asumir que la primera captura que se abrió es representativa de todas.

   **Un club "ya muy sourceado" NO es excusa para saltear la familia 3 — el barrido de dominio
   completo puede seguir sin haberse corrido nunca en serio.** Encontrado con Boca Juniors
   (2026-09-26): la nota del club decía "Wayback CDX: no aplica esta sesión (club muy sourceado, no
   ameritaba)" porque ya tenía presupuesto y balance del año más reciente cargados — pero nadie
   había corrido nunca el CDX de dominio completo (`matchType=domain`) sobre `bocajuniors.com.ar`.
   Al correrlo apareció un directorio (`/rebrand/files/`) con 2 balances de ejercicios que llevaban
   sesiones enteras marcados como "pendientes de encontrar", sin ningún nombre obvio que un intento
   de adivinar filename hubiera acertado. La lección: "el club ya tiene datos cargados" es una razón
   para no volver a intentar la familia 1 (sitio oficial) a ciegas otra vez, pero NO dice nada sobre
   si la familia 3 se agotó — son preguntas distintas. Antes de escribir "no aplica" para Wayback CDX
   en un club grande ya cargado, confirmar que de verdad se corrió el barrido de dominio completo al
   menos una vez; si nunca se corrió, es barato hacerlo (una sola llamada a la CDX API) y puede
   rendir series enteras de años que las otras 4 familias ya habían agotado.
4b. **Agregadores de datos y sitios de fanáticos.** Un sitio de terceros — una página de
    recopilación de datos armada por un aficionado, un foro/blog de hinchas, una cuenta de
    estadísticas — puede tener un PDF re-alojado que el sitio oficial del club ya perdió, o una
    cifra que ningún canal oficial publicó nunca. NO es una fuente primaria (sección 0): cualquier
    dato encontrado ahí es un LEAD, no un hallazgo cerrado, mismo estándar de cautela que ya existe
    para prensa y para homonimia de entidades.

    **Confiable como lead** (vale la pena seguirlo): reproduce o linkea un documento identificable
    como el balance/estado contable REAL del club (PDF completo, escaneo, foto legible de la
    planilla) Y declara de dónde lo sacó (asamblea puntual, canal oficial, fecha) — el documento se
    puede verificar de forma independiente aunque el sitio no sea oficial. Ejemplo real (Exa, A/B
    test 2026-09-26): un sitio de hinchas con "balances completos" que no es oficial ni está en
    Wayback del club, pero el documento detrás era real.

    **NO confiable, descartar**: el sitio solo muestra cifras ya elaboradas/estimadas por el propio
    agregador (rankings, cálculos "a ojo") sin documento fuente detrás — eso es opinión de un
    tercero, no un lead, mismo criterio que ya excluye a la prensa como fuente en sí.

    **Cómo se marca en `fuentes/<País>/<Club>.md`**: nunca como hallazgo cerrado. Una línea así:

        **Lead sin verificar (agregador)**: <sitio/URL> dice tener el balance <ejercicio> — <qué
        dice concretamente>. Fuente NO oficial, pendiente de verificar contra <documento original /
        otra fuente independiente> antes de cargar. Encontrado <fecha>.

    No se carga a `Clubes/<País>/<Club>/` ni se categoriza en `club-data-mapping` hasta
    confirmarlo — mismo gate que ya existe para cualquier PDF no oficial (ver CLAUDE.md, "OJO CON
    LO QUE SE TRACKEA").
5. **Prensa**, solo para CONFIRMAR que el documento existe cuando no se lo encuentra descargable en
   ningún lado (nunca como fuente en sí — ver la primera regla de esta sección). Si prensa cita
   cifras concretas de una asamblea reciente, es señal de que el documento SÍ existe y vale la pena
   seguir buscándolo o escalar a mail (ver 0.3) — no de que el club es un dead-end.

**Adivinar nombres de archivo es una TÉCNICA de la familia 1, no una familia aparte, y tiene tope
explícito**: cubrir el espacio de variación plausible UNA vez (ej. Talleres: 7 meses candidatos × 3
años, todos 404) y parar ahí. Sin un dato nuevo (un nombre real encontrado en otro lado, un patrón
confirmado en algún año), seguir inventando variantes del mismo patrón es exactamente el síntoma que
motivó esta tarea: gastar presupuesto de tokens sin acercarse al documento.

**Señal de "seguir profundizando" vs. "pasar a la próxima familia": si el próximo intento sigue
trayendo información nueva, seguir; si no, parar.** Es el mismo criterio que usan la mayoría de los
agentes de research (incluido el "multi-agent researcher" que Anthropic documentó de su propio
funcionamiento interno): no hay un número mágico de pasos fijo, se sigue mientras cada paso nuevo
agrega señal, y se corta cuando dos intentos seguidos devuelven lo mismo que ya se sabía —
redundancia es la señal de que la familia está agotada, no un contador. Acá eso se traduce concreto:
si la 2ª variante de búsqueda web no trae nada que la 1ª ya no haya traído, no hace falta una 3ª —
pasar a la próxima familia o cerrar directamente.

**STOP — cuándo documentar dead-end y dejar de buscar**: cuando TODAS las familias aplicables a ese
club (no todas existen para todo país: si no hay regulador documentado para el país, esa familia no
aplica y no cuenta contra el club) se agotaron A FONDO, no a medias. "A fondo" en la familia 1
significa el menú COMPLETO del sitio, no la home; en la familia 3, la CDX API del dominio completo,
no una URL sospechada. Chaco For Ever y Gimnasia y Tiro (Salta) (sesión 2026-09-23) son el ejemplo
de cada extremo: al primero se lo cerró bien — sitio sin sección institucional confirmado, CDX en 0,
2 búsquedas dirigidas sin nada, las 3 familias aplicables agotadas de verdad. Al segundo NO se lo
cerró, a propósito: quedó "Noticias Institucionales" sin abrir del todo en el sitio oficial, así que
la familia 1 no estaba agotada todavía — se documentó como pendiente con el próximo paso concreto, no
como dead-end.

### 0.1b Quién ejecuta cada barrido (Sonnet → Exa → Opus) — VALIDADO con A/B test el 2026-09-26

Además de QUÉ familia probar (0.1), importa QUÉ herramienta la corre — escalando en costo a medida
que el club se resiste. Versión revisada tras el A/B test de la sesión del 2026-09-26
(`Admin/test-barridos.md`, 23 clubes argentinos, split aleatorio): la versión original de este punto
proponía Haiku para el descubrimiento mecánico de un club nuevo, con Sonnet verificando después — el
test lo midió y **costó 30,8% MÁS caro que Sonnet solo** (tokens, tool calls y duración, consistente
en los 3 lotes probados), porque verificar bien a Haiku exigía rehacer buena parte del trabajo
(re-descargar lo que dejaba corrupto, profundizar donde se quedaba corto con la misma herramienta,
corregir cifras mal leídas) — no fue un "sí/no" rápido sobre candidatos sólidos. El caso más grave:
en un lote, Haiku casi hace que se cargue el balance de una cooperativa eléctrica ajena como si fuera
del club de fútbol homónimo, por coincidencia de nombre sin verificar el contenido. **Por eso Haiku
queda afuera de la escalera por defecto** — sigue siendo una opción a mano si en el futuro aparece un
escenario distinto (un club con miles de candidatos en Wayback CDX para FILTRAR antes de que Sonnet
mire, tipo Boca/Racing, que no se probó en este test), pero no es la regla.

1. **Club nuevo o 2do barrido**: **Sonnet directo**, la escalera completa de 0.1 (sitio oficial +
   Wayback CDX de dominio completo + búsqueda web + prensa). Esto incluye reconciliar contra lo ya
   cargado/documentado en un club que "parece bien cubierto" (¿este PDF es nuevo o el mismo que ya
   tenemos con otro nombre? ¿el archivo de 838 KB realmente abre o tiene el xref roto?) — así
   aparecieron 5 documentos nuevos de Unión y 1 de Gimnasia La Plata sobre clubes que se creían
   agotados, y 4 de Boca vía Wayback CDX de dominio completo nunca corrido en serio antes.
2. **GATE antes de escalar más**: no pasar a Exa/Opus en cualquier club — solo si HAY SEÑAL de que
   vale la pena (prensa confirma que el documento existe, es un club grande/tradicional, o el barrido
   de Sonnet dejó un hilo suelto concreto). Sin señal, cerrar como ya indica 0.3 (dead-end / candidato
   a mail / pendiente). Motivo: escalar a herramientas pagas en cada uno de los ~400 clubes "sin
   PDFs" del proyecto no tiene el mismo repago que en un puñado de clubes grandes.
3. **3er barrido** (con señal, sigue sin nada): **Exa** (búsqueda semántica por contenido, no por
   nombre de archivo ni palabra clave) — `node tools/exa-search.mjs "<query>"`, necesita
   `Admin/exa/.env`. **Esta parte SÍ se validó con datos**: en el mismo test, sobre 5 clubes
   argentinos ya cerrados como dead-end real (escalera de Sonnet agotada a fondo), una sola query de
   Exa por club reabrió 2 de los 5 — encontró un sitio de hinchas con balances completos que ninguna
   de las 3 familias estándar puede ver (no es sitio oficial, no está en Wayback del dominio del
   club, no rankea en búsqueda web genérica) y una nota de prensa con el detalle de una asamblea que
   va a regularizar 6 ejercicios. Costo mínimo (una llamada HTTP de segundos, sin tokens de modelo
   de por medio salvo para leer el resultado). **Gotcha confirmado, mismo que ya tenía la búsqueda
   web genérica**: Exa puede confundir clubes de nombre parecido (2 de 5 queries del test trajeron el
   club equivocado por homonimia) — filtrar SIEMPRE por dominio/contexto antes de confiar en un
   resultado, nunca por el título solo.
4. **4to barrido** (sigue sin nada): **Opus**, SOLO para pensar ángulos nuevos que la escalera de 0.1
   no contempla — no ejecuta ninguna búsqueda él mismo.
5. **4.5** (si Opus propuso algo concreto): **Sonnet** ejecuta esa idea.
6. **5to barrido** (la idea tampoco resultó): documentar como dead-end, siguiendo 0.3.

Un club puede terminar en un número más alto que 5 si aparece trabajo ad hoc extra (un mail que trae
una pista, una gestión de Guido) — el número no es una medalla, es solo "cuántas rondas de búsqueda
distintas ya recibió este club".

**Registro**: la línea `**Ángulos**` (0.2) suma un segmento `barrido: N (<quién>)`, ej. `barrido: 2
(Sonnet)` o `barrido: 3 (Exa)`. Actualizarlo cada vez que una sesión avanza al club un escalón, no
solo la primera vez.

### 0.2 Dejar registro rápido de qué ya se probó — sin tener que leer la prosa completa

Hoy, saber si YA se probó tal ángulo en tal club exige leer entero `fuentes/<País>/<Club>.md`, que es
prosa libre — y prosa libre se puede leer mal. Pasó de verdad: un chequeo automático sobre 44 clubes
de Argentina (sesión 2026-09-23) clasificó mal 6 de ellos como "nunca tocados" porque buscaba un
encabezado literal (`## Chequeo <fecha>`) que no todos los archivos usan (`## Lo nuevo (<fecha>)`,
bullets sueltos con "ENCONTRADO <fecha>" son formatos igual de válidos y ya usados en este mismo
skill). Si una lectura cuidadosa se equivocó, un agente que arranca en frío tiene el mismo riesgo —
y el costo no es solo confusión, es tiempo y tokens re-buscando algo que ya estaba resuelto.

**La convención, desde esta sesión: una línea `**Ángulos**` al PRINCIPIO de cada
`fuentes/<País>/<Club>.md`, justo debajo del título**, con el estado de cada familia de la escalera
de 0.1 que aplique a ese club. Es una convención de escritura, no una herramienta ni una base de
datos nueva — este proyecto es deliberadamente estático de punta a punta. Formato, una familia por
segmento separado con `·`:

    **Ángulos**: sitio oficial: agotado (sin sección institucional) · Wayback CDX: agotado (0 PDFs)
    · búsqueda web: agotado (sin resultados) · regulador/país: no aplica · barrido: 1 (Sonnet)
    — 2026-09-23

Estados posibles: `agotado (<qué encontró o no>)`, `parcial — <qué falta concretamente>` (como
Gimnasia y Tiro Salta: "sitio oficial: parcial — falta abrir Noticias Institucionales completa"),
`no aplica` (el país no tiene canal regulador documentado, o la familia no corresponde a este club),
o `no intentado` (todavía no se llegó a esa familia). **Es un SNAPSHOT, no un log — se REEMPLAZA en
cada sesión que toca el club, no se apila una línea vieja al lado de la nueva**, mismo criterio que
ya sigue `Admin/ESTADO.md` con el resto del proyecto. La prosa de abajo (las secciones
`## Chequeo <fecha>` o el formato libre que ya use cada archivo) sigue siendo el lugar del detalle
completo y no cambia de ninguna forma; la línea de arriba es solo el TL;DR que una sesión nueva lee
primero, antes de decidir por dónde seguir.

**Esto NO es retroactivo.** No hay que salir a agregarle esta línea a los ~610 archivos de
`fuentes/<País>/<Club>.md` que ya existen — eso es trabajo de re-lectura masiva, exactamente lo que
el to-do 57 va a encarar como pasada propia. La regla es: todo club NUEVO la lleva desde el primer
chequeo, y todo club EXISTENTE la gana la próxima vez que una sesión lo toque (lo lee a fondo o le
agrega algo) — nunca una barrida aparte solo para agregarla.

**Esto tampoco toca el formato de `fuentes/_indice/<País>.md`.** Ese archivo SÍ lo parsea
`tools/generate-fuentes-index.js` con una regex sobre el texto libre de cada línea
(`SENAL_SI`/`SENAL_NO` adentro del script) — cualquier cambio ahí hay que probarlo con `--debug`
antes de tocar nada. La línea `**Ángulos**` vive en el archivo de club, que ese script ni siquiera
abre, así que no hay riesgo de romper el generador.

### 0.3 Cuándo escalar: sesión dedicada, mail al club, gestión de Guido, o simplemente el próximo club

Agotada la escalera de 0.1 sin encontrar el documento, la pregunta siguiente no es "seguir
insistiendo": es cuál de estos 5 caminos corresponde. Son señales concretas derivadas de casos
reales de esta sesión, no un árbol de decisión — la mayoría de los clubes caen limpio en uno solo,
sin ambigüedad:

- **Dead-end real, 0 señal de que el documento exista (ni prensa, ni video, ni mención) → próximo
  club, sin mail.** Chaco For Ever, Gimnasia y Tiro (Salta) una vez agotada la familia 1: ningún
  rastro de que el club publique ni haya publicado nunca nada. Escribirle a un club así tiene bajo
  valor esperado (no hay ninguna confirmación de que algo exista del otro lado) — no amerita el mail
  del to-do 51. Revisar de nuevo más adelante, sin fecha fija (mismo criterio que ya usa este skill
  con los dead-ends de Brasil (`paises/Brasil.md`): varios se destrabaron solos meses después, por una URL
  nueva, sin que cambiara nada regulatorio).
- **Documento CONFIRMADO que existe pero no está descargable en ningún canal digital → candidato a
  mail (to-do 51), Guido decide y aprueba cada envío.** Señales de "confirmado": prensa cita cifras
  concretas de una asamblea reciente (Independiente, Ejercicio N°121), el club subió una
  presentación en VIDEO en vez de PDF (Banfield, 105° Ejercicio), o el documento estuvo público y el
  compartir se revocó (Atlanta, los 4 Drive de 2013-2016). En los tres casos pedirle al club que
  publique/resuba lo que YA tiene es barato para el club y de alto valor esperado — lo que separa
  esto del punto anterior es la CONFIRMACIÓN de existencia, no el esfuerzo ya invertido buscando. El
  proceso de escribir y mandar ese mail de verdad es `club-outreach`, no este skill.
- **Bloqueo estructural confirmado en una fuente primaria (ley, reglamento, estatuto societario) →
  CERRADO, no pendiente, sin mail.** Liga MX/SICE (confidencialidad por reglamento, to-do 47), Costa
  Rica/FEDEFUT, Sudáfrica (exención de la Companies Act), Chile/OTODP: acá no hay PDF que destrabar
  con más mail o más sesión — el regulador mismo lo prohíbe o lo exime. Documentarlo como RESUELTO
  (con la cita legal exacta) en vez de dejarlo como "pendiente" en ningún índice: es trabajo
  terminado, no trabajo que falta. Reabrir solo si cambia la regulación (mismo patrón que ya usa
  Ecuador (`paises/Ecuador.md`): buscar `"[club] se convierte en sociedad anónima deportiva"` antes de asumir
  que sigue bloqueado para siempre).
- **Canal identificado pero exige la identidad o el medio de pago de una PERSONA real → gestión de
  Guido, no una tarea de sourcing.** River/IGJ (clave fiscal AFIP nivel 2+, con costo), Marruecos/
  OMPIC, Austria/Firmenbuch, Francia/INPI (captcha+cuenta), Países Bajos/KvK (pago por documento): un
  agente no puede crear una cuenta ni pagar. Documentar el canal exacto y los pasos (como ya hace
  `fuentes/Argentina/River.md`) y PARAR ahí — no es un dead-end de sourcing, es una decisión de
  costo/tiempo que le toca a Guido, y no se resuelve insistiendo desde una sesión.
- **Lead real pero que necesita mucho trabajo sostenido en UN club → sesión dedicada aparte, no
  adentro de un barrido de país.** Jamaica (portal de pago por documento certificado, browser
  dedicado), Colombia/SIIS con el histórico completo de Envigado (10 ejercicios, 1 solo bajado):
  cuando destrabar un club exige un procedimiento de varios pasos que no cabe en el tiempo de un
  barrido de decenas de clubes, marcarlo explícitamente como candidato a sesión propia (en
  `Admin/TODO.md` o en la nota del club) en vez de hacerlo a medias adentro de una sesión que tiene
  otro objetivo.

## Gotcha de tooling (no de ningún portal): tesseract no puede leer de `/tmp`

En este entorno, `tesseract /tmp/x.png stdout` falla con `Error in fopenReadStream: failed to open
locally`. No es un problema del PDF ni del OCR: el sandbox bloquea esa ruta. Hay que renderizar las
imágenes al directorio de scratchpad de la sesión y OCRear desde ahí. Se pierde bastante tiempo
buscándole la vuelta si uno cree que el PDF está roto.

## Países — un archivo por regulador/región en `paises/`

Cada entrada de abajo es un archivo propio bajo `.claude/skills/club-sourcing/paises/`, con el mismo
contenido que antes vivía como sección numerada acá (to-do 87, resuelto 2026-09-27: 29 secciones,
123 KB, todas en un solo archivo que cualquier sesión de sourcing leía entero sin importar qué país
le tocaba). Abrí SOLO el archivo del país/región que estés buscando — no hace falta leer los demás.

- **Chile — CMF** → [`paises/Chile.md`](paises/Chile.md)
- **Colombia — Supersociedades (SIIS)** → [`paises/Colombia.md`](paises/Colombia.md)
- **Brasil — muy buena cobertura, gracias a la Lei do SAF** → [`paises/Brasil.md`](paises/Brasil.md)
- **Uruguay — bloqueado, no reintentar con los mismos 3 ángulos** → [`paises/Uruguay.md`](paises/Uruguay.md)
- **Ecuador — ningún club es todavía S.A.D.P./SAD; Supercias no aplica hasta que eso cambie** → [`paises/Ecuador.md`](paises/Ecuador.md)
- **Perú, Paraguay, Bolivia, Venezuela — sin metodología país-nivel todavía** → [`paises/Peru-Paraguay-Bolivia-Venezuela.md`](paises/Peru-Paraguay-Bolivia-Venezuela.md)
- **CONCACAF (Norte/Centroamérica/Caribe) — la región más pobre en disclosure, un hallazgo real en México** → [`paises/CONCACAF.md`](paises/CONCACAF.md)
- **África — 0 clubes con PDF real, pero Marruecos abre una pista regulatoria concreta** → [`paises/Africa.md`](paises/Africa.md)
- **Reino Unido — Companies House, sirve para CUALQUIER deporte** → [`paises/Reino-Unido.md`](paises/Reino-Unido.md)
- **Estados Unidos — la SEC, para los deportes que NO son fútbol** → [`paises/Estados-Unidos.md`](paises/Estados-Unidos.md)
- **Alemania — Unternehmensregister + DFL Finanzkennzahlen** → [`paises/Alemania.md`](paises/Alemania.md)
- **Austria — Firmenbuch bloqueado por pago, pero la liga entera publica un agregado gratis** → [`paises/Austria.md`](paises/Austria.md)
- **Bélgica — sin login y scriptable por API** → [`paises/Belgica.md`](paises/Belgica.md)
- **China — mayormente dead-end por diseño societario, pero NO es un dead-end de liga completa** → [`paises/China.md`](paises/China.md)
- **Corea del Sur — DART funciona como un EDGAR/SEC coreano, para los clubes de chaebol** → [`paises/Corea-del-Sur.md`](paises/Corea-del-Sur.md)
- **Croacia — sin registro central gratis, pero el mandato de licenciamiento de la liga alcanza** → [`paises/Croacia.md`](paises/Croacia.md)
- **Dinamarca — mismo patrón que Bélgica, y una idea reutilizable** → [`paises/Dinamarca.md`](paises/Dinamarca.md)
- **España — sin registro único; el atajo es listar el CMS de cada club en Wayback** → [`paises/España.md`](paises/España.md)
- **Francia — sin registro mercantil abierto, pero la DNCG publica bilanes individuales por club** → [`paises/Francia.md`](paises/Francia.md)
- **Grecia — 100% de la liga top cubierta con un solo canal** → [`paises/Grecia.md`](paises/Grecia.md)
- **Italia — no es un registro mercantil, es la obligación de licencia UEFA** → [`paises/Italia.md`](paises/Italia.md)
- **Noruega — canal excelente, con un gotcha real de URL no documentada** → [`paises/Noruega.md`](paises/Noruega.md)
- **Países Bajos — KvK de pago, pero el mandato de licencia F.04 de la KNVB alcanza igual** → [`paises/Paises-Bajos.md`](paises/Paises-Bajos.md)
- **Portugal — muy buena cobertura de liga completa, y una tercera red de rescate reutilizable** → [`paises/Portugal.md`](paises/Portugal.md)
- **República Checa — otro registro gratis de primer nivel, y dos formatos nuevos para el `.gitignore`** → [`paises/Republica-Checa.md`](paises/Republica-Checa.md)
- **Rusia — accesible pese al contexto geopolítico, vía un dominio redirigido** → [`paises/Rusia.md`](paises/Rusia.md)
- **Suiza — Zefix es dead-end de país, pero la mitad de la liga publica voluntariamente** → [`paises/Suiza.md`](paises/Suiza.md)
- **Turquía — los 4 grandes cotizan DIRECTO como club-asociación, caso único en el proyecto** → [`paises/Turquia.md`](paises/Turquia.md)
- **Ucrania — no es un registro mercantil, es la ley de contabilidad la que obliga a publicar** → [`paises/Ucrania.md`](paises/Ucrania.md)

## Cómo mantener este skill

**Desde el to-do 87 (2026-09-27), cada país vive en su propio archivo bajo `paises/`, no en una
sección de este `SKILL.md`.** Actualizar el archivo del país correspondiente la primera vez que
produzca un hallazgo real de metodología (un regulador que aplica a todos los clubes de ese país, un
gotcha de navegación que costó descubrir) — no hace falta una entrada por cada club individual, eso
vive en `fuentes/<País>/<Club>.md`. Si un ángulo ya documentado ahí como "bloqueado" se destraba en el
futuro (ej. Uruguay consigue un pedido de acceso a información pública), actualizar ese archivo en vez
de dejarlo desactualizado diciendo que sigue bloqueado.

**País nuevo, sin canal documentado todavía**: crear `paises/<País>.md` (mismo formato que cualquiera
de los existentes: título, canal/regulador, gotchas, fecha de último chequeo) y agregarle su línea al
índice de la sección "Países" más arriba, en el mismo orden en que aparecen los demás (no hay un
criterio de orden estricto — geográfico/alfabético lo que ya viene siendo, no importa demasiado). Un
país que hoy no tiene nada ("sin metodología país-nivel todavía", ver `paises/
Peru-Paraguay-Bolivia-Venezuela.md`) igual amerita archivo propio si en el futuro se investiga y se
confirma que no hay canal — "ya se buscó y no hay nada" es información real, no ausencia de
información.

**Este es un skill de criterio, no un changelog (pedido de Guido, to-do 57, 2026-09-23).** Al
agregar o editar el archivo de un país, separar tres cosas:

- **Se queda en el skill** (tal cual o resumido): el canal/regulador en sí y cómo usarlo (URLs,
  parámetros, forma exacta del formulario), gotchas de portal que pueden repetirse (rate limits,
  formatos de archivo raros, captchas, bloqueos de WAF, entidad equivocada vs. entidad correcta), la
  categoría legal que determina si un club PUEDE tener balance público, y una fecha de "Último
  chequeo" (importa para saber si conviene revalidar).
- **Se comprime a una línea o se corta**: la envoltura de historia — "en la sesión del X, un agente
  encontró Y" se convierte en el hecho seco ("País: hallazgo, verificado fecha"). El PROCESO de cómo
  se llegó a un hallazgo (qué se probó y falló antes) solo vale la pena conservarlo si es un patrón
  repetible en OTRO club del mismo país; si es anecdótico de un club puntual, va al archivo de ese
  club (`fuentes/<País>/<Club>.md`), no acá. Un enumerado largo de "qué clubes puntuales quedaron
  cubiertos" tampoco va acá completo: un conteo (`X de Y clubes`) alcanza, el detalle club por club
  ya vive en `fuentes/_indice/<País>.md`.
- **Va a `Admin/CHANGELOG.md` o `Admin/Archive/`**: decisiones tomadas una vez que ya están cerradas
  y no van a volver a discutirse, bugs de tooling ya resueltos que no van a repetirse en otro país.
  Antes de archivar algo, sacarle lo que todavía sirve como criterio.

Un archivo de país que empieza a acumular "sesión 2026-XX-XX" repetidas, o "N-ésimo país de tal
barrido", es la señal de que se está volviendo changelog otra vez — cortarlo ahí, no dejarlo crecer.
