# Brasil — muy buena cobertura, gracias a la Lei do SAF

Los clubes convertidos a SAF (Sociedade Anônima do Futebol, Lei 14.193/2021) publican "Demonstrações
Financeiras" auditadas anualmente, casi siempre colgadas directo en el propio sitio del club (buscar
sección "Transparência"/"SAF"/"Governança").

- **CVM**: se buscó explícitamente si algún SAF brasileño está registrado como "companhia aberta"
  (capital abierto) ante la CVM (rad.cvm.gov.br) — no se encontró ninguno. Todos publican como
  "sociedade de capital fechado" directo en su sitio o en el de la federación estadual, cumpliendo
  la ley sin necesidad de registro CVM (que solo aplica a oferta pública de acciones). No vale la
  pena buscar en CVM salvo que aparezca evidencia concreta de que un club específico sí cotiza.
  - **Excepción real, cuidado con la atribución**: el archivo `demonstracoes-financeiras-2019-2020.pdf`
    que en un momento se guardó como si fuera de Botafogo (Rio de Janeiro) resultó ser de **Botafogo
    Futebol S.A. (Ribeirão Preto-SP)**, un club homónimo completamente distinto — el propio documento
    lo aclaraba en su nota de contexto operacional ("sede na cidade de Ribeirão Preto"). Verificar
    SIEMPRE el contexto operacional de la primera página de un PDF brasileño antes de asumir a qué
    club pertenece, sobre todo con nombres de club que se repiten entre estados.
- **Repositorios de federación estadual**: buenísima fuente alternativa cuando el club no lo cuelga
  directo, y en la práctica el canal que más clubes destrabó. Confirmados hasta hoy, SEIS estados:
  - **São Paulo** — `futebolpaulista.com.br`, el más completo de todos: ver el punto siguiente.
  - **Paraná** — `federacaopr.sfo3.digitaloceanspaces.com` (Coritiba, Operário Ferroviário).
  - **Rio Grande do Sul** — `fgf.com.br/demonstracoes-financeiras-filiados` (Juventude; ojo, el
    casing del nombre de archivo por club ahí es inconsistente).
  - **Goiás** — `fgf.esp.br/pt/conteudo/?q=11&sc=11` ("Publicações", paginado `&p=2`…`&p=7`),
    ejercicios 2021-2025 de ~21 clubes filiados. **NO confundir con `fgf.com.br`, que es el
    gaúcho**: dos federaciones distintas con la misma sigla.
  - **Mato Grosso** — `fmfmt.com.br/pt/conteudo/?q=14&sc=11` ("Balanço dos Clubes"). Corre el mismo
    CMS que el goiano: PDFs en `<dominio>/assets/uploads/<id>.pdf`, y **el prefijo `/pt/` de la URL
    es obligatorio** — sin él el servidor devuelve 404 seco, no un redirect.
  - **Santa Catarina** — `fcf.com.br/categoria/financeiro/balancos/`, una página por año (2013-2025,
    sin 2021) con un link por club. Gotcha: los links de 2013/2014 tienen triple barra
    (`fcf.com.br///wp-content/...`) y devuelven el HTML de la home con **HTTP 200** — un `curl`
    "exitoso" que no trae PDF, así que validar siempre con `pdfinfo`.
  - **Rio de Janeiro (FERJ)** — la ficha del club está en
    `servicos.fferj.com.br/ClubesLigas/ViewTeam?alias=<id>` (el host `www.fferj.com.br` con la misma
    ruta devuelve una página vacía de 5 KB). El link es un visor `RenderDoc?caminho=<url encodeada>`:
    hay que extraer ese parámetro y pegarle a
    `fferj.azurewebsites.net/admin/AzureStorage/GetDocument?path=...`.
  - **El patrón NO es universal**: la FAF (Amazonas) tiene página de transparencia pero solo con los
    balances de la propia federación, ninguno de club; las federaciones de Minas Gerais
    (`fmf.com.br`) y Pará (`fpfpara.com.br` — no `fpfpa.com.br`) tampoco publican los de sus
    filiados. Chequear antes de asumir que existe.
- **La Federação Paulista tiene un índice JSON abierto de TODOS sus clubes, año por año, 2010-2025.
  Esto reemplaza el consejo viejo de descubrir nombres de archivo con
  `WebSearch site:futebolpaulista.com.br`**, que solo servía para el año más reciente porque los
  nombres del repositorio son irregulares a propósito (conviven `São Paulo.pdf`, `271A.pdf` y
  `BALANÇO ITUANO 2020 E PARECER DA AUDITORIA.pdf`).
  - Años: `GET /Handlers/Institucional/ListaPeriodoFinanca.ashx` → 16 años **contiguos, 2010-2025**.
  - Clubes y anexos de un año: `GET /Handlers/Institucional/ListaFinanca.ashx?periodoSelecionado=<año>`
    → `{Codigo, Sucesso, Retorno:[{idClube, nomeClube, anexos:[{anexo, nomeAnexo}]}]}`, donde `anexo`
    es la ruta relativa al PDF. Un club puede tener 1 anexo o 12.
  - **Tres comportamientos distintos en el mismo dominio, no confundirlos**: (1) los HANDLERS sí
    están detrás de Cloudflare — llamarlos con `fetch()` desde el Browser pane con `Financas.aspx`
    cargada y el header `X-Requested-With: XMLHttpRequest`; (2) el 403 del LISTADO de directorio
    **no es Cloudflare sino IIS con directory browsing deshabilitado** (corrige lo que decía esta
    skill): da el mismo 403 desde un browser real, no vale la pena intentarlo; (3) los PDFs
    individuales bajan con `curl` 200 con solo un User-Agent de navegador, ni siquiera hace falta
    `Referer` — hay que URL-encodear el path.
  - **Gotcha de parseo**: el casing de las claves difiere entre los dos handlers
    (`DataPeriodo` en mayúscula, `idClube`/`nomeClube`/`anexos` en minúscula dentro de `Retorno`).
    Filtrar por `NomeClube` devuelve vacío sin ningún error.
  - **Un año ausente para un club NO significa que falte en el repositorio**: el índice tiene los 16
    años para todos, así que si un club no aparece en un año es que ESE club no presentó. Distinguir
    las dos cosas al documentar un hueco.
  - Esto llevó a Ituano de 1 ejercicio a 15 (2010-2024) y a Mirassol de 1 a 12 (2012-2018,
    2021-2025) en una sola pasada. Queda mucho por explotar: el mismo índice tiene hasta 2010 a
    Corinthians, Palmeiras, Santos, São Paulo, Ponte Preta, Guarani, RB Bragantino, Botafogo-SP,
    Portuguesa, Ferroviária y Novorizontino. En 2012 varios clubes subieron `.jpg` en vez de `.pdf`.
- **Portales de transparencia propios con API JSON**: vale la pena buscar `/api/` en el bundle JS de
  la página antes de rendirse con un portal que parece vacío. Volta Redonda (Next.js) expone
  `voltaco.com.br/api/documents` con `fileUrl` pre-firmadas de S3 que `curl` baja directo — pero
  **caducan a las 24 h** (`X-Amz-Expires=86400`), hay que re-pedir el JSON. Ojo además con la ruta:
  la versión en portugués `/transparencia/` daba 404 y la viva era `/transparency`.
- **Gotcha de SPA que hace perder tiempo**: un sitio de club con Vite/React sin fallback 404 devuelve
  **HTTP 200 con un index.html de ~650 bytes para CUALQUIER ruta** (caso Operário Ferroviário), así
  que un `curl` a una URL inexistente parece exitoso. Si el HTML que baja es minúsculo y sin links,
  es una SPA: hay que ir al Browser pane, y a veces el ítem de menú ni siquiera es un `<a>` (en
  Operário "DFS" es un `<li>` con handler de click). Variante del mismo problema: un servidor que
  **redirige al home (302) en vez de devolver 404** (Paysandu), así que probar URLs adivinadas exige
  leer el código HTTP, no el éxito del `curl`.
- **"SAF publica, asociación no publica" NO se sostiene en Brasil**: Goiás EC (asociación civil)
  publica desde el ejercicio 2007/08, la serie más larga de Sudamérica en el proyecto; Criciúma,
  Avaí y Vila Nova también publican sin ser SAF. No usar la forma jurídica para descartar un club.
  - **PERO el sitio propio del club suele tener una serie más profunda y más prolija que el
    repositorio de la federación**: Palmeiras (2017-2025), Corinthians
    (2019-2025 en su propia sección de transparencia) y São Paulo FC (su CDN llega hasta 2006)
    superan largo a lo que ofrece `futebolpaulista.com.br` para esos mismos clubes. Revisar primero
    a fondo la sección "Transparência"/"Governança" del sitio oficial (no solo la home, el menú
    completo) antes de conformarse con el mirror de la federación.
  - **El listado de directorio del repositorio paulista está bloqueado por Cloudflare vía `curl`
    (403/challenge JS), pero un archivo individual con el nombre exacto sí descarga bien (200,
    cacheado)** — la forma de descubrir el nombre exacto sin poder listar el directorio es
    `WebSearch site:futebolpaulista.com.br ... .pdf`, no adivinar el nombre del club a mano (solo
    funciona para el año más reciente).
  - **La carpeta-año de la URL no garantiza que ESE sea el ejercicio del documento**: un archivo de
    São Paulo FC vivía en `Institucional/2023/1402169_BALANÇOSPFC_2018_2.pdf` pero el "2018" del
    nombre era un número de radicado/protocolo, no el ejercicio — el contenido real era 2022/2023.
    Verificar siempre las fechas DENTRO del documento, nunca solo por la carpeta o el nombre de
    archivo.
- **Cloudflare bloquea varios dominios oficiales** (ej. Vasco da Gama, Sport Recife) — antes de
  descartar, buscar el mismo PDF mirrorado en otro dominio (ej. un portal de noticias o un sitio de
  socios que republicó el mismo documento) en vez de pelear con el bloqueo directo. **Si no hay
  mirror, un browser real sí puede pasar el challenge donde `curl` da 403/`cf-mitigated:
  challenge`** (confirmado con Sport Recife): una vez cargada la página en el
  Browser pane, usar `fetch()` + `Blob` + `<a download>` desde la consola de la página para bajar el
  archivo (comparando el tamaño en bytes contra el original) — `curl` sigue fallando aunque ya se
  tenga la URL exacta en la mano, así que no vale la pena reintentarlo ahí.
- **Un botón de descarga de "transparencia" clickeado por un browser automatizado puede disparar un
  redirect a un sitio de terceros sin relación** (Vitória → `rcdespanyol.com`) — mismo patrón ya
  visto con SIIS Colombia (`paises/Colombia.md`). No es un bloqueo real del club: extraer el `href` real vía JS
  del DOM en vez de clickear el botón.
- **El PDF real puede estar escondido dentro de un `<iframe src="about:blank"
  data-src="...docs.google.com/viewer?url=<pdf real>">` con lazy loading** — hay que revisar el
  `outerHTML` completo de la página, no solo los `<a href>` visibles ni el `.src` actual del iframe
  (que arranca en blanco hasta que se scrollea a la vista).
- **Comparar el tamaño en bytes de un PDF entre dos mirrors/fuentes es una forma barata y confiable
  de confirmar que es el mismo documento** (usado para desambiguar Santos/Guarani y sitio propio vs.
  mirror de la federación en Corinthians) — más rápido que releer el texto completo cada vez.
- **Un dead-end viejo puede haberse destrabado solo porque la URL se movió, sin que cambiara nada
  regulatorio** (Vitória, Ceará, Fortaleza, Sport Recife, América Mineiro, Criciúma se destrabaron
  así). Vale la pena reintentar periódicamente los dead-ends viejos con una búsqueda fresca, no
  tratarlos como permanentes salvo que el bloqueo sea estructural (forma jurídica, regulador
  inexistente). Dos causas típicas de que un dead-end viejo se destrabe: (1) el club movió el PDF a
  un CDN externo (`irp.cdn-website.com`, no el dominio propio) — `curl` + `grep '\.pdf'` sobre el
  HTML crudo antes de dar por perdido un portal que "menciona" las demonstrações; (2) se estaba
  adivinando el nombre de archivo en vez de leer un índice de la federación estadual.
- Dead-ends que siguen sin lead nuevo (no rabbit-holear más sin uno): Náutico, Marília.
  **Juventude** es un dead-end parcial: solo se encontró el ejercicio 2020 (vía el repositorio de la
  Federação Gaúcha), y prensa reporta que el club no publicó su demonstração de 2024 dentro del
  plazo legal — la pregunta directa al club está en `Admin/dudas-por-club.md`.
- **El sitio de la SAF puede no ser el sitio del club**, y el link entre los dos suele estar en el
  pie de página y no en el menú: Athletic Club tiene `athleticclub.com.br` (la asociación, cuya
  sección "Governança" solo trae cartas-convite) y `acfutebol.com.br` (la SAF, con `/transparencia`
  y los balances reales). Antes de anotar "no tiene sección financiera", buscar si hay un dominio
  separado para la SAF.
- **Un mismo archivo puede estar publicado bajo dos años distintos**: en el repositorio propio de
  Remo, `balan_o_patrimonial_2019` y `..._2020` tienen md5 idéntico y ambos son al 31/12/2020.
  Comparar el md5 entre años consecutivos antes de dar por buenos dos ejercicios seguidos.
- **Gotcha de tooling, no de portal: WebFetch inventa URLs.** Sobre una página larga de índice
  (Goiás) devolvió una tabla prolija por año en la que varias URLs eran reconstrucciones plausibles
  pero inexistentes. Sirve para descubrir que una sección existe, nunca como fuente de las rutas
  exactas a `curl`ear — para eso, `curl` + grep de `href`.

## Redes sociales y sitios de fans

**Reddit: HIT en los 2 clubes con subreddit grande, MISS en el más chico — piloto del 2026-09-27,
to-do 81 de `Admin/TODO.md`.** Con Arctic Shift/PullPush (gratis, sin cuenta — ver `Reino-Unido.md`
para por qué WebSearch/Exa/la API oficial no sirven), `r/Corinthians` (125k miembros) y
`r/palmeiras` (75k) dieron HIT real: posts propios discutiendo el "balanço financeiro" oficial de
2025 con cifras concretas (ej. "Corinthians registra déficit de quase R$ 150 milhões no balanço
financeiro de 2025"). **Sorpresa: Flamengo, el club más grande de Brasil, no tiene un subreddit
comparable** — el único match real es `r/flamengolivre`, con apenas 573 miembros, y dio MISS. Esto
confirma que el tamaño de la fanaticada en la calle NO predice el tamaño de su comunidad en Reddit
específicamente — hay que chequear el subreddit real (`/api/subreddits/search?subreddit_prefix=` de
Arctic Shift) antes de asumir que un club grande tiene cobertura ahí. El patrón que sí se sostiene,
igual que en Inglaterra: subreddits de ~75-125k rinden, uno de <1k no, sin que el idioma sea la
variable relevante — ver `Reino-Unido.md` para el detalle completo del piloto.
