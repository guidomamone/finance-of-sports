# 0.1 La escalera de ángulos, y cuándo parar

*Se abre con un club sin nada cargado, para decidir por dónde buscar y cuándo parar. El núcleo y la tabla de qué abrir están en `SKILL.md`.*

#### 0.1 La escalera de ángulos, y cuándo parar

Un club sin nada cargado no es "buscar hasta encontrar o hasta cansarse": es una escalera de
ÁNGULOS que se agotan EN ORDEN, cada uno A FONDO antes de pasar al siguiente. Lo que importa no es
"cuántos intentos" sino "cuántas familias de ángulo DISTINTAS, cada una llevada hasta su límite
natural": probar 3 variaciones del mismo canal (3 nombres de archivo parecidos en el mismo sitio)
no son 3 ángulos, es 1 ángulo probado 3 veces.

**Las familias, en el orden en que conviene probarlas:**

1. **Fuente oficial del club**: el sitio propio, MENÚ COMPLETO (no solo la home ni la primera
   sección que parezca obvia, tipo "Transparencia"). Si es WordPress, además del menú, buscar posts
   de asamblea/balance/ejercicio vía `wp-json/wp/v2/search?search=<término>` y abrir CADA resultado
   (el documento real puede colgar de un post cuyo título no menciona "balance" para nada). Listar
   también la mediateca: `wp-json/wp/v2/media?per_page=100&search=<término>&mime_type=application/pdf`
   devuelve PDFs que ninguna página enlaza.
   **"Encontré la Memoria y es puramente narrativa" NO es señal de que el club no publica un
   balance real**: es señal de que hay que seguir mirando DENTRO del sitio, no de pasar a la
   familia 2. Gimnasia y Esgrima (La Plata) es el caso que lo prueba: sus memorias son narrativas, y
   el balance real vive en un PDF SEPARADO, colgado del mismo post de convocatoria a asamblea que la
   memoria. Talleres tiene el mismo patrón: el EECC real cuelga de una nota de prensa cuyo título no
   menciona ni "balance" ni "estados contables". Antes de dar un club por agotado en esta familia,
   mirar el post o la sección DE AL LADO de donde ya se encontró algo, no solo lo ya encontrado.

   **Si el sitio devuelve 403/bloqueo a `curl`/`WebFetch`** (WAF, CDN, IP deny; no confundir con
   ausencia de contenido), antes de dar la familia 1 por "parcial" probar Firecrawl (clave en
   `Admin/api-keys/firecrawl.env`): `POST api.firecrawl.dev/v1/scrape` con `{"url":..., "formats":["markdown"]}`,
   agregando `"proxy":"stealth"` si el intento básico falla. Costo bajo (~1 crédito por request): no
   hace falta ningún gate de "señal" antes de probarlo, a diferencia de Exa (ver 0.1b). Para confirmar
   el MENÚ COMPLETO de un sitio grande de una sola vez, en vez de navegar página por página, usar
   `POST api.firecrawl.dev/v1/map` (barre el dominio entero y devuelve todas las URLs internas; en
   Pachuca dio 1.305 URLs en una sola llamada). Si Firecrawl también da 403, es señal de un bloqueo
   de IP/hosting real (ej. cPanel "IP Deny rules"), no un challenge JS, y ni un Browser pane real lo
   resuelve (León): ahí no vale la pena seguir escalando tooling, pasar a la familia 3 (Wayback) o
   documentar el bloqueo como confirmado.

   **Portal sin link de descarga directo (botón dispara un flujo JS con token, no una URL fija)**:
   `grep` los bundles JS que carga la página buscando el endpoint real detrás del botón; suele ser
   un token temporario (`GetValetKey`/similar) + un segundo endpoint que lo consume. Con eso se baja
   el archivo con `curl` puro, sin sesión ni login (ver `Admin/sourcing/Argentina/River.md` para un caso
   completo, reusable para cualquier portal con esta forma).
2. **El canal país/regulador ya documentado en este skill** (ver el índice de países más abajo), si
   existe uno para ese país. Consultarlo es SIEMPRE prioritario a seguir adivinando en el sitio del
   club: es la fuente con mejor relación señal/costo de todo el proyecto (CMF, SIIS, Companies
   House, Unternehmensregister, etc.).

   **Cada país tiene su propio archivo en `paises/<País>.md`: leé SOLO el de tu país, no hace falta
   abrir los demás.** El índice completo está más abajo, después de la sección 0.3.

   **Si el club emitió deuda pública alguna vez (obligaciones negociables/bonos)**, sumar el
   organismo de valores del país (CNV en Argentina, CVM en Brasil, CNMV en España, SEC en EE.UU.,
   etc.): es un canal distinto del registro de asociaciones civiles/sociedades, con su propio
   régimen de disclosure, a veces más completo (ver `Admin/sourcing/Argentina/River.md`).

   **En Europa, el canal suele ser la licencia nacional de la federación, más que un registro**:
   PZPN (Polonia, criterio F.01), HNS, FRF, FSS, NSBiH, LFF, FFM, FFA o MLSZ hacen que el club
   publique sus estados en su propio sitio. Pistas: una sección permanente (`/dokumenti`,
   `/transparenca`, `/sprawozdania`, `/tao`), archivos con el código del criterio (`F.01`,
   `fin0101`) o una declaración de pagos a intermediarios al lado. Casi siempre queda solo el último
   año (el club reemplaza el archivo o borra el anterior): los viejos salen del CDX de dominio
   completo (familia 3), verificando el ejercicio en la carátula porque el mismo nombre de archivo
   sirve para varios años. No se extiende a otros deportes (Polonia: vóley, básquet, speedway).

3. **Wayback Machine, CDX API sobre el DOMINIO COMPLETO** del club (`matchType=domain`), no solo la
   URL puntual que se sospecha. Sirve para dos cosas: recuperar un documento que el sitio vivo movió
   o borró, y como señal fuerte de ausencia total: "0 PDFs archivados nunca en todo el dominio"
   (Chaco For Ever, Gimnasia y Tiro Salta) es mucha más evidencia que "no encontré nada en la
   home".
4. **Búsqueda web dirigida** (`filetype:pdf`, nombre + "estados contables"/"balance"/"memoria" +
   año, nombre + "asamblea"). Complementaria, no sustituye a las 3 de arriba: un club puede indexar
   mal y tener igual el documento colgado en su sitio.

   **Gotcha de la familia 3, Wayback CDX**: una captura archivada grande puede venir TRUNCADA a
   exactamente 1.048.576 bytes (1 MiB), con el header `wayback content truncated by "length"`, y un
   PDF truncado a mitad de archivo puede fallar en silencio al abrirlo o parecer vacío, dando la
   falsa impresión de "0 PDFs archivados" para ese club. Caso real: Almagro figuraba como "0 PDFs
   archivados" y tiene 6 balances auditados reales (Ejercicios 80-85, 2018-2023) que solo aparecen
   al reintentar la MISMA URL con otro timestamp de la lista CDX (otro snapshot cercano suele NO
   estar truncado). **Antes de cerrar un club como "0 PDFs en Wayback" por un resultado vacío o
   sospechosamente corto, reintentar con otro timestamp de la misma URL** si la CDX API lista más de
   uno: no asumir que la primera captura que se abrió es representativa de todas.

   **Con varias capturas del mismo PDF, listarlas todas** con `fl=original,timestamp,length` y quedarse con la de mayor tamaño (la de
   exactamente 1.048.576 bytes está truncada: Operário, Volta Redonda, Emelec, Pinheiros). Hay clubes cuyos PDFs viejos solo existen en
   Wayback, de un sitio que ya cambió a SPA (Coritiba, Paulistano, Operário). Validar cada captura con `pdfinfo`, no por el código HTTP: a
   veces es una página HTML en lugar del PDF. Con `id_`, usar `curl --compressed` (si no, baja un gzip crudo).

   **Un club "ya muy sourceado" NO es excusa para saltear la familia 3: el barrido de dominio
   completo puede no haberse corrido nunca en serio.** Boca Juniors es el caso: tenía presupuesto y
   balance del año más reciente cargados, pero nadie había corrido el CDX de dominio completo
   (`matchType=domain`) sobre `bocajuniors.com.ar`; al correrlo apareció un directorio
   (`/rebrand/files/`) con 2 balances de ejercicios que llevaban sesiones enteras marcados como
   "pendientes de encontrar", sin ningún nombre obvio que un intento de adivinar filename hubiera
   acertado. "El club ya tiene datos cargados" es una razón para no repetir la familia 1 a ciegas,
   pero NO dice nada sobre si la familia 3 se agotó: son preguntas distintas. Antes de escribir "no
   aplica" para Wayback CDX en un club grande ya cargado, confirmar que de verdad se corrió el
   barrido de dominio completo al menos una vez; si nunca se corrió, es barato hacerlo (una sola
   llamada a la CDX API) y puede rendir series enteras de años.
4b. **Agregadores de datos y sitios de fanáticos.** Un sitio de terceros (una página de
    recopilación de datos armada por un aficionado, un foro/blog de hinchas, una cuenta de
    estadísticas) puede tener un PDF re-alojado que el sitio oficial del club ya perdió, o una
    cifra que ningún canal oficial publicó nunca. NO es una fuente primaria (sección 0): cualquier
    dato encontrado ahí es un LEAD, no un hallazgo cerrado, mismo estándar de cautela que ya existe
    para prensa y para homonimia de entidades.

    **Confiable como lead** (vale la pena seguirlo): reproduce o linkea un documento identificable
    como el balance/estado contable REAL del club (PDF completo, escaneo, foto legible de la
    planilla) Y declara de dónde lo sacó (asamblea puntual, canal oficial, fecha): el documento se
    puede verificar de forma independiente aunque el sitio no sea oficial. Ejemplo real (hallado con
    Exa): un sitio de hinchas con "balances completos" que no es oficial ni está en Wayback del
    club, pero el documento detrás era real.

    **NO confiable, descartar**: el sitio solo muestra cifras ya elaboradas/estimadas por el propio
    agregador (rankings, cálculos "a ojo") sin documento fuente detrás: eso es opinión de un
    tercero, no un lead, mismo criterio que ya excluye a la prensa como fuente en sí.

    **Cómo se marca en `Admin/sourcing/<País>/<Club>.md`**: nunca como hallazgo cerrado. Una línea así:

        **Lead sin verificar (agregador)**: <sitio/URL> dice tener el balance <ejercicio> — <qué
        dice concretamente>. Fuente NO oficial, pendiente de verificar contra <documento original /
        otra fuente independiente> antes de cargar. Encontrado <fecha>.

    No se carga a `Clubes/<País>/<Club>/` ni se categoriza en `club-data-mapping` hasta
    confirmarlo: mismo gate que ya existe para cualquier PDF no oficial (los PDFs de fuentes no
    oficiales se guardan pero no se trackean; ver `Admin/PIPELINE.md`, "OJO CON LO QUE SE TRACKEA").
5. **Prensa**, solo para CONFIRMAR que el documento existe cuando no se lo encuentra descargable en
   ningún lado (nunca como fuente en sí; ver la primera regla de esta sección). Si prensa cita
   cifras concretas de una asamblea reciente, es señal de que el documento SÍ existe y vale la pena
   seguir buscándolo o escalar a mail (ver 0.3), no de que el club es un dead-end.

**Adivinar nombres de archivo es una TÉCNICA de la familia 1, no una familia aparte, y tiene tope
explícito**: cubrir el espacio de variación plausible UNA vez (ej. Talleres: 7 meses candidatos × 3
años, todos 404) y parar ahí. Sin un dato nuevo (un nombre real encontrado en otro lado, un patrón
confirmado en algún año), seguir inventando variantes del mismo patrón es gastar presupuesto de
tokens sin acercarse al documento.

**Señal de "seguir profundizando" vs. "pasar a la próxima familia": si el próximo intento sigue
trayendo información nueva, seguir; si no, parar.** No hay un número mágico de pasos: se sigue
mientras cada paso nuevo agrega señal, y se corta cuando dos intentos seguidos devuelven lo mismo que
ya se sabía. Redundancia es la señal de que la familia está agotada, no un contador. Concreto: si la
2ª variante de búsqueda web no trae nada que la 1ª ya no haya traído, no hace falta una 3ª; pasar a
la próxima familia o cerrar directamente.

**STOP — cuándo documentar dead-end y dejar de buscar**: cuando TODAS las familias aplicables a ese
club (no todas existen para todo país: si no hay regulador documentado para el país, esa familia no
aplica y no cuenta contra el club) se agotaron A FONDO, no a medias. "A fondo" en la familia 1
significa el menú COMPLETO del sitio, no la home; en la familia 3, la CDX API del dominio completo,
no una URL sospechada. Chaco For Ever y Gimnasia y Tiro (Salta) son el ejemplo de cada extremo: el
primero se cerró bien (sitio sin sección institucional confirmado, CDX en 0, 2 búsquedas dirigidas
sin nada, las 3 familias aplicables agotadas de verdad). El segundo NO se cerró, a propósito: quedó
"Noticias Institucionales" sin abrir del todo en el sitio oficial, así que la familia 1 no estaba
agotada todavía; se documentó como pendiente con el próximo paso concreto, no como dead-end.
