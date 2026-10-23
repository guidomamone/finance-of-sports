---
name: club-sourcing
description: Metodología para BUSCAR estados financieros/balances auditados de clubes de fútbol que todavía no tienen nada cargado en finance-of-sports — qué regulador o canal público chequear según el país, gotchas concretos de cada portal (URLs que no sirven, formularios que hay que usar de una forma específica, categorías legales que determinan si un club puede o no tener balance público), y qué hacer cuando no se encuentra nada. Usar ANTES de salir a buscar PDFs de un club/país nuevo, para no repetir intentos que una sesión anterior ya probó y descartó. Es sourcing (encontrar y guardar el PDF), no mapeo de datos — para categorizar lo que ya se encontró, ver `club-data-mapping`.
---


# Cómo buscar estados financieros de clubes, país por país

**Esto no es solo de fútbol.** Cuando encares un país nuevo, la pregunta útil no es "¿dónde publica su
balance un club de fútbol de acá?" sino "¿qué obligación de publicar tiene la figura jurídica que
usan los clubes de acá?": la respuesta suele servir para todos los deportes juntos. El caso modelo es
`paises/Reino-Unido.md`, donde el canal depende de la forma jurídica del club y abre fútbol, rugby
union, cricket y Fórmula 1 de una sola vez.

Este skill es la memoria de qué funcionó y qué no al buscar balances/estados contables auditados de
clubes que todavía no están en el sitio, de cualquier país, Argentina incluida (`paises/Argentina.md`).
Sale de sesiones reales de sourcing, no es teoría. Leelo ANTES de salir a buscar un club/país nuevo:
te ahorra repetir un intento que ya se probó y descartó, y te da el ángulo que SÍ funcionó para países
similares.

**Esto es solo sourcing** (encontrar el documento y guardarlo en `Clubes/<País>/<Club>/`, documentar
en `Admin/sourcing/<País>/<Club>.md`). Categorizar lo que ya se encontró es otro skill (`club-data-mapping`).
Cómo estructurar la sesión de onboarding completa (una vez que ya hay un PDF elegido) es
`club-or-year-onboarding`.

## 0. Regla general, para cualquier país

- **Antes de navegar un portal, probar si responde sin navegador.** Si un registro devuelve la lista o el documento con un pedido
  simple (`curl`, o una API como la de Bélgica o brreg en Noruega), se arma un script en `tools/` que liste los ejercicios por club y
  año, sin bajar nada, y los compare con lo cargado. Ejemplo: `tools/listar-brreg.mjs`, ~0 tokens. Solo si la página arma la lista en
  el navegador se usa el Browser pane o, si hace falta, Crawl4AI.
- **Un club extinto o refundado vale** si sus balances siguen publicados: se bajan y se documentan como los de cualquier otro.
- **Fuente oficial primero, siempre.** El dominio propio del club (o un link que el dominio oficial
  comparta directo, ej. un PDF de Google Drive/Dropbox embebido en una noticia oficial) es la única
  fuente aceptable como "primary". Prensa, foros, mirrors de comunidades de hinchas, etc. son un
  último recurso documentado como tal (`reliability:'secondary_press'`/`'secondary_mirror'`), nunca
  presentados como si fueran el documento oficial.
- **Si el dominio oficial está caído o bloquea la conexión** (pasa seguido con hosting chico), probar
  la copia archivada de esa MISMA URL en Wayback Machine (usar la CDX API de archive.org para
  encontrar snapshots) antes de descartar el club: sigue siendo el documento del club, solo que
  servido por archive.org en vez de en vivo.
- **Antes de anotar "no se encontró nada", seguí la REGLA 2 de `Admin/sourcing/README.md`** (ya
  documentada ahí, no se repite acá): registrar CADA intento con el detalle de qué se probó, la URL/
  portal exacto, y por qué falló; nunca alcanza con "no se encontró". Ver `Admin/sourcing/Uruguay/
  _notas-generales.md` como ejemplo del nivel de detalle esperado.
- **Guardar los hallazgos**: PDFs en `Clubes/<País>/<Club>/` (mismo nivel que `Clubes/Argentina/`),
  documentación en `Admin/sourcing/<País>/<Club>.md`, con su línea en el índice de su país
  (`Admin/sourcing/_indice/<País>.md`); la convención de carpetas está en `Admin/PIPELINE.md`, sección
  "Documentos fuente". **Trabajá siempre sobre el archivo de TU país**: es lo que permite que dos
  sesiones de sourcing corran en paralelo sin pisarse. `Admin/sourcing/README.md` (el índice de países) se
  toca solo al terminar, y solo si cambiaron los números de ese país (se regenera con
  `node tools/generate-fuentes-index.js`).
- **Una sola carpeta por club.** Antes de guardar un PDF, mirá la entidad de la portada (nombre legal) y fijate en `ls Clubes/<País>/` si el
  club ya tiene carpeta, con otro nombre o grafía (`FC Thun` y `Thun`). Si la tiene, guardalo ahí; no abras una segunda. Un informe de liga
  que cubre varios clubes se guarda una sola vez, en una carpeta `_<Nombre>`. `node tools/audit.js` lo caza después (`carpeta-doble`: el
  mismo PDF en dos carpetas de club).
- **Si el hallazgo es un video (presentación en YouTube en vez de PDF) o una nota de prensa,
  guardar la URL EXACTA, no solo el título.** Un título alcanza para que Guido reconozca el
  documento, pero no para que una sesión futura lo abra sin volver a buscarlo (caso: el video del
  105° Ejercicio de Banfield en `Admin/sourcing/Argentina/Banfield.md`, que hizo falta para `club-outreach`).
- **Si en el camino de buscar un documento aparece un email de contacto del club** (prensa@,
  secretaría@, relaciones institucionales: en el sitio oficial, una nota de prensa, un formulario de
  contacto) y guardarlo no cuesta nada extra, anotarlo en `Admin/outreach/contactos.json` (`email`,
  `source`, `date`). Esto es oportunista, no una obligación a recordar: `club-outreach` busca el
  contacto igual al momento de escribir si no está guardado, así que no hace falta ir a buscarlo
  a propósito en una sesión de sourcing que no lo necesita.
- **Un PDF descargado clickeando un link/botón en el Browser pane cae en `~/Downloads` del sistema,
  NO en el proyecto** (a diferencia de `curl`/`fetch()+Blob`, que sí se pueden apuntar directo a
  `Clubes/<País>/<Club>/`): el Browser pane es un navegador de verdad, y una descarga real de
  sistema operativo no sabe nada de la carpeta del proyecto. **Mové el archivo a
  `Clubes/<País>/<Club>/` (con `mv`, no `cp`) INMEDIATAMENTE después de la descarga, como parte del
  mismo paso del subagente**, no en una sesión de limpieza aparte (que termina siendo "encontrar y
  reidentificar" documentos que ya estaban bien sourceados). Si el subagente ya sabe que va a
  necesitar clickear un botón de descarga (portales sin `curl` viable, ver los gotchas de
  Cloudflare/challenge JS en cada país), preferí de entrada `fetch()+Blob+<a download>` desde la
  consola del Browser pane: ese método SÍ se puede apuntar con un nombre de archivo que ya incluya la
  carpeta destino, y evita el paso extra de mover.
- **El informe del auditor es un documento aparte casi siempre** (Italia, Juventus, Lazio, Torino…): si el balance cargado no lo
  trae, buscarlo en la misma página del club antes de anotar "FALTA EN EL PDF". El detalle por país, en `paises/<País>.md`.
- **Antes de cargar cualquier PDF encontrado en un país nuevo al sitio**, releer `club-data-mapping` sección 5 (conversión a USD; detalle en `club-data-mapping/referencia/fx.md`) y `club-data-mapping/referencia/formato-simplificado.md, "grossDebt"`: ambas asumen implícitamente el criterio
  argentino de "moneda homogénea"/RT6, que puede no aplicar en otro país con otra normativa contable.
- **Búsquedas en worktrees separados** (varias sesiones en paralelo sobre distintos países/clubes): se
  lanzan sin consultar a Guido; se le cuenta qué países/clubes y cuántas sesiones. Un pedido puntual (un
  club concreto, o un ejercicio suelto de un club ya conocido) se corre directo en la sesión actual, sin
  worktree. Cómo conviven las sesiones en
  paralelo (el sourcing va en el worktree, el onboarding en `main`): `Admin/CONVENCIONES.md`.

### Qué abrir y cuándo (cada archivo está en `referencia/`; las secciones conservan su número)

| Sección | Abrila cuando | Archivo |
|---|---|---|
| 0.1 La escalera de ángulos | un club no tiene nada cargado y hay que decidir por dónde buscar y cuándo parar | `escalera-de-angulos.md` |
| 0.1b Quién ejecuta cada barrido | vas a repartir barridos entre Sonnet, Exa y Opus | `quien-ejecuta.md` |
| 0.2 Registro rápido de qué se probó | terminaste de buscar un club y hay que dejar escrito qué se probó | `registro-rapido.md` |
| 0.3 Cuándo escalar | no aparece nada: sesión dedicada, mail al club o gestión de Guido | `cuando-escalar.md` |
| 0.4 y 0.5 Informes de la liga y sponsor de camiseta | se abre una liga nueva, o hay que buscar el sponsor de camiseta de un ejercicio | `liga-y-sponsor.md` |

**No hace falta abrir ninguno** para: consultar un registro por API o CVR (un script de `tools/`, la regla de arriba y `paises/<País>.md`), bajar un
ejercicio suelto de un club ya conocido (la nota del club en `Admin/sourcing/<País>/` y `paises/<País>.md`) o revisar qué se probó (`Admin/sourcing/README.md`).


## Gotchas de tooling (no de ningún portal)

- **`tesseract` no puede leer de `/tmp`.** En este entorno, `tesseract /tmp/x.png stdout` falla con
  `Error in fopenReadStream: failed to open locally`. No es un problema del PDF ni del OCR: el
  sandbox bloquea esa ruta. Hay que renderizar las imágenes al directorio de scratchpad de la sesión
  y OCRear desde ahí. Se pierde bastante tiempo buscándole la vuelta si uno cree que el PDF está roto.
- **Varios agentes de sourcing en paralelo (subagentes del `Agent` tool) pueden compartir el mismo
  Browser pane**: una pestaña se puede navegar sola a un sitio de otro agente en medio de la
  búsqueda. No es un bug del portal que se está investigando. Lo que funciona: cada agente abre su
  propia pestaña con `tabs_create` al arrancar y fija ese `tabId` explícito en cada llamada del
  Browser tool, en vez de operar sobre "la pestaña activa" por defecto. Si se lanzan sourcing agents
  en paralelo que usan el browser, decírselo en el prompt.
- **Un archivo bajado se mira antes de darlo por guardado: que sea lo que dice su extensión.** `file <archivo>` tiene que decir PDF, XHTML o HTML, o XML. Si dice gzip o Zip (un depósito que sirve el archivo comprimido, como `regnskaber.virk.dk`), se descomprime a un archivo nuevo, `<base>-descomprimido.<ext>`, y el original queda. Si un `.pdf` resulta ser HTML, es una página de error o de login, no el documento: se vuelve a bajar. Lo vigila `audit.js` (`archivo-no-es-lo-que-dice`).

## Países: un archivo por regulador/región en `paises/`

Cada entrada de abajo es un archivo propio bajo `.claude/skills/club-sourcing/paises/`. Abrí SOLO el
archivo del país/región que estés buscando; no hace falta leer los demás.

- **Argentina — sitio oficial; IGJ bloqueada; CNV para los clubes que emiten deuda** → [`paises/Argentina.md`](paises/Argentina.md)
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
- **Armenia — sitio del club; el registro solo da datos básicos** → [`paises/Armenia.md`](paises/Armenia.md)
- **Austria — Firmenbuch bloqueado por pago, pero la liga entera publica un agregado gratis** → [`paises/Austria.md`](paises/Austria.md)
- **Azerbaiyán — sin canal público de estados individuales** → [`paises/Azerbaiyan.md`](paises/Azerbaiyan.md)
- **Bélgica — sin login y scriptable por API** → [`paises/Belgica.md`](paises/Belgica.md)
- **Bielorrusia — sin canal público de balances** → [`paises/Bielorrusia.md`](paises/Bielorrusia.md)
- **Bosnia — sitio del club, plantilla de licencia del NSBiH** → [`paises/Bosnia.md`](paises/Bosnia.md)
- **Bulgaria — Registro Mercantil público, gratis y scripteable: alcanza solo** → [`paises/Bulgaria.md`](paises/Bulgaria.md)
- **China — mayormente dead-end por diseño societario, pero NO es un dead-end de liga completa** → [`paises/China.md`](paises/China.md)
- **Corea del Sur — DART funciona como un EDGAR/SEC coreano, para los clubes de chaebol** → [`paises/Corea-del-Sur.md`](paises/Corea-del-Sur.md)
- **Croacia — sin registro central gratis, pero el mandato de licenciamiento de la liga alcanza** → [`paises/Croacia.md`](paises/Croacia.md)
- **Dinamarca — mismo patrón que Bélgica, y una idea reutilizable** → [`paises/Dinamarca.md`](paises/Dinamarca.md)
- **Eslovaquia — `registeruz.sk`: API pública, sin cuenta ni captcha** → [`paises/Eslovaquia.md`](paises/Eslovaquia.md)
- **Eslovenia — sitio del club; AJPES pide captcha para ver los documentos** → [`paises/Eslovenia.md`](paises/Eslovenia.md)
- **España — sin registro único; el atajo es listar el CMS de cada club en Wayback** → [`paises/España.md`](paises/España.md)
- **Estonia — e-Äriregister: PDF gratis y sin login, con `curl` sin User-Agent** → [`paises/Estonia.md`](paises/Estonia.md)
- **Francia — sin registro mercantil abierto, pero la DNCG publica bilanes individuales por club** → [`paises/Francia.md`](paises/Francia.md)
- **Georgia — reportal.ge: el buscador es público, los documentos piden cuenta** → [`paises/Georgia.md`](paises/Georgia.md)
- **Grecia — 100% de la liga top cubierta con un solo canal** → [`paises/Grecia.md`](paises/Grecia.md)
- **Hungría — sección TAO / beszámolók del sitio del club; el depósito estatal tiene captcha** → [`paises/Hungria.md`](paises/Hungria.md)
- **Italia — no es un registro mercantil, es la obligación de licencia UEFA** → [`paises/Italia.md`](paises/Italia.md)
- **Kazajistán — DFO en modo invitado, solo para clubes con participación estatal** → [`paises/Kazajistan.md`](paises/Kazajistan.md)
- **Letonia — sitio del club por licencia LFF, más los datos abiertos del registro** → [`paises/Letonia.md`](paises/Letonia.md)
- **Lituania — sitio del club por la licencia LFF; el registro no es accesible para un agente** → [`paises/Lituania.md`](paises/Lituania.md)
- **Macedonia del Norte — sitio del club por la licencia FFM; registro sin verificar** → [`paises/Macedonia-del-Norte.md`](paises/Macedonia-del-Norte.md)
- **Noruega — canal excelente, con un gotcha real de URL no documentada** → [`paises/Noruega.md`](paises/Noruega.md)
- **Países Bajos — KvK de pago, pero el mandato de licencia F.04 de la KNVB alcanza igual** → [`paises/Paises-Bajos.md`](paises/Paises-Bajos.md)
- **Polonia — sitio del club por la licencia PZPN; el registro RDF está bloqueado por IP** → [`paises/Polonia.md`](paises/Polonia.md)
- **Portugal — muy buena cobertura de liga completa, y una tercera red de rescate reutilizable** → [`paises/Portugal.md`](paises/Portugal.md)
- **República Checa — otro registro gratis de primer nivel, y dos formatos nuevos para el `.gitignore`** → [`paises/Republica-Checa.md`](paises/Republica-Checa.md)
- **Rumania — sitio del club, por el formato de licencia de la FRF** → [`paises/Rumania.md`](paises/Rumania.md)
- **Rusia — accesible pese al contexto geopolítico, vía un dominio redirigido** → [`paises/Rusia.md`](paises/Rusia.md)
- **Serbia — sitio del club; el registro APR no es accesible desde EE.UU.** → [`paises/Serbia.md`](paises/Serbia.md)
- **Suiza — Zefix es dead-end de país, pero la mitad de la liga publica voluntariamente** → [`paises/Suiza.md`](paises/Suiza.md)
- **Turquía — los 4 grandes cotizan DIRECTO como club-asociación, caso único en el proyecto** → [`paises/Turquia.md`](paises/Turquia.md)
- **Ucrania — no es un registro mercantil, es la ley de contabilidad la que obliga a publicar** → [`paises/Ucrania.md`](paises/Ucrania.md)


## Cómo mantener este skill

Cada país vive en su propio archivo bajo `paises/`, no en una sección de este `SKILL.md`. Cuando un país
produce un hallazgo real de metodología (un regulador que aplica a todos los clubes de ese país, un gotcha de
navegación que costó descubrir), o un ángulo documentado ahí como "bloqueado" se destraba (ej. Uruguay consigue
un pedido de acceso a información pública), proponele a Guido el texto exacto del cambio al archivo del país
y esperá su ok; mientras tanto el hallazgo se documenta en `Admin/sourcing/<País>/<Club>.md`. La regla vale también
para editar a mano los `paises/*.md`. No hace falta una entrada por cada club individual.

**País nuevo, sin canal documentado todavía**: proponer `paises/<País>.md` (mismo formato que cualquiera
de los existentes: título, canal/regulador, gotchas, fecha de último chequeo) y su línea en el
índice de la sección "Países" más arriba, con el mismo ok, en el mismo orden en que aparecen los demás (no hay un
criterio de orden estricto; geográfico/alfabético es lo que ya viene siendo). Un país que hoy no
tiene nada ("sin metodología país-nivel todavía", ver `paises/Peru-Paraguay-Bolivia-Venezuela.md`)
igual amerita archivo propio si se investiga y se confirma que no hay canal: "ya se buscó y no hay
nada" es información real, no ausencia de información.

**Este es un skill de criterio, no un changelog.** Al agregar o editar el archivo de un país, separar
tres cosas:

- **Se queda en el skill** (tal cual o resumido): el canal/regulador en sí y cómo usarlo (URLs,
  parámetros, forma exacta del formulario), gotchas de portal que pueden repetirse (rate limits,
  formatos de archivo raros, captchas, bloqueos de WAF, entidad equivocada vs. entidad correcta), la
  categoría legal que determina si un club PUEDE tener balance público, y una fecha de "Último
  chequeo" (importa para saber si conviene revalidar).
- **Se comprime a una línea o se corta**: la envoltura de historia. "En la sesión del X, un agente
  encontró Y" se convierte en el hecho seco ("País: hallazgo, verificado fecha"). El PROCESO de cómo
  se llegó a un hallazgo (qué se probó y falló antes) solo vale la pena conservarlo si es un patrón
  repetible en OTRO club del mismo país; si es anecdótico de un club puntual, va al archivo de ese
  club (`Admin/sourcing/<País>/<Club>.md`), no acá. Un enumerado largo de "qué clubes puntuales quedaron
  cubiertos" tampoco va acá completo: un conteo (`X de Y clubes`) alcanza, el detalle club por club
  ya vive en `Admin/sourcing/_indice/<País>.md`.
- **Va a `Admin/CHANGELOG.md` o `Admin/Archive/`**: decisiones tomadas una vez que ya están cerradas
  y no van a volver a discutirse, bugs de tooling ya resueltos que no van a repetirse en otro país.
  Antes de archivar algo, sacarle lo que todavía sirve como criterio.

Un archivo de país que empieza a acumular "sesión 2026-XX-XX" repetidas, o "N-ésimo país de tal
barrido", es la señal de que se está volviendo changelog otra vez: cortarlo ahí, no dejarlo crecer.
