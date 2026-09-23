---
name: club-sourcing
description: Metodología para BUSCAR estados financieros/balances auditados de clubes de fútbol que todavía no tienen nada cargado en finance-of-sports — qué regulador o canal público chequear según el país, gotchas concretos de cada portal (URLs que no sirven, formularios que hay que usar de una forma específica, categorías legales que determinan si un club puede o no tener balance público), y qué hacer cuando no se encuentra nada. Usar ANTES de salir a buscar PDFs de un club/país nuevo, para no repetir intentos que una sesión anterior ya probó y descartó. Es sourcing (encontrar y guardar el PDF), no mapeo de datos — para categorizar lo que ya se encontró, ver `club-data-mapping`.
---

# Cómo buscar estados financieros de clubes, país por país

**Actualizado 2026-09-13: esto ya no es solo de fútbol.** La sección 9 (Reino Unido) fue el primer
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

## 1. Chile — CMF, la fuente más confiable encontrada hasta ahora

Los clubes chilenos organizados como Sociedad Anónima Deportiva Profesional (SADP) que ADEMÁS son
"emisores de valores" (RVEMI) ante la CMF (Comisión para el Mercado Financiero, cmfchile.cl) publican
Estados Financieros Consolidados trimestrales/anuales bajo IFRS, descargables en PDF — este es,
hasta ahora, el canal más prolijo y completo de todo el barrido sudamericano (series de 16-17 años
consecutivos para Universidad Católica/Universidad de Chile/Colo-Colo).

- **Cómo navegar la CMF**: el portal solo sirve el documento cuando se navega la ficha de la entidad
  con clics reales (`institucional/mercados/entidad.php?rut=...&pestania=3`, pestaña "Información
  Financiera", filtrando por mes 12 = cierre anual) — la URL de descarga final tiene parámetros
  `auth`/`send` que cambian por documento y NO se pueden construir a mano ni adivinar, hay que
  llegar navegando. Ojo con la pestaña "EEFF Filiales": es una trampa, muestra los estados de una
  SUBSIDIARIA del club (ej. "Inmobiliaria Azul Azul SpA"), no del club — la pestaña correcta es
  "Información Financiera".
- **Muchos clubes chilenos NO van a tener nunca EEFF público, y eso se puede confirmar rápido**: si
  la CMF clasifica al club como "OTODP" (en vez de "RVEMI"), esa entidad estructuralmente NUNCA tiene
  la pestaña de Información Financiera/EEFF — su "Memoria Anual" es pura narrativa (verificar: cero
  totales de balance en el texto) y a lo sumo tiene un "Presupuesto y Cauciones" con cifras
  PROYECTADAS, no auditadas. Confirmado dead-end estructural (no solo "no se encontró") para
  Cobreloa, Huachipato, Ñublense, Unión Española, O'Higgins, Everton, Audax Italiano, Deportes
  Iquique, Coquimbo Unido, Unión La Calera, Deportes La Serena, Curicó Unido. Antes de invertir
  tiempo en un club chileno nuevo, chequeá su clasificación (RVEMI vs. OTODP) en la CMF primero.
  Palestino es un caso mixto: tiene AMBOS registros (RVEMI y OTODP) — usar el RVEMI.
  - **Aceleración**: el sitio propio del club a veces aloja copias directas de sus mismos envíos a
    la CMF (ej. Universidad Católica en `cruzados.cl/inversionistas/`, con URLs estáticas predecibles
    por trimestre, sin necesitar el mecanismo `auth`/`send`) — chequear la sección de
    inversionistas/transparencia del sitio del club ANTES de pelearse con la CMF directamente.
  - La Bolsa de Santiago tiene un endpoint sin autenticación que sirve el ÚLTIMO estado financiero de
    un emisor directo: `apiws.bolsadesantiago.com/ifrs/newobtenerpdf.asp?nemo=<NEMOTECNICO>` — útil
    como atajo rápido para el año más reciente, no para el histórico completo.

## 2. Colombia — Supersociedades (SIIS), sorpresa positiva de la sesión 2026-09

Varios clubes colombianos organizados como S.A. deben presentar un "Informe Periódico de Fin de
Ejercicio" a la asamblea de accionistas (Circular 012 de 2022, Superintendencia Financiera de
Colombia) con estados financieros completos, consultable gratis y sin login en el portal SIIS de la
Superintendencia de Sociedades.

**ACTUALIZADO 2026-09-22 — SIIS es una API JSON pública: NO hace falta browser.** El portal es una
SPA cuyo backend son dos endpoints abiertos (sin login, sin API key, sin captcha), así que todo el
flujo se scriptea con `curl`. Esto reemplaza el procedimiento de clicks que estaba acá antes (y que
sigue siendo válido, solo que es mucho más lento). El detalle completo, con los cuerpos de request,
está en `fuentes/Colombia/_notas-generales.md`; el resumen:

1. **Buscar / enumerar**: `POST siis.ia.supersociedades.gov.co/siis_backend/api/v1/qr/siis_empresas/_search`
   acepta query DSL de Elasticsearch completo, agregaciones incluidas. Ya no hace falta el NIT: se
   busca por nombre, y **se puede listar la liga entera de una sola consulta** agregando por
   `nombreEmpresa.keyword` sobre el CIIU deportivo. Son TRES los CIIU a mirar, no uno: **R9312**
   (clubes deportivos), **R9319** (otras actividades deportivas) y **R9311** (gestión de
   instalaciones deportivas) — Boyacá Chicó, La Equidad y Fortaleza CEIF están en R9319.
   De cada hit se saca `infoEmpresa.num_radicado`, que es la llave del paso 2, más un bloque
   `financieros` con activos/ingresos/utilidad/ROE/ROA ya calculados.
2. **Listar los documentos del ejercicio**:
   `GET .../plantillas-api/documentos-adicionales?numero-radicado=<num_radicado>` devuelve el JSON
   con "NOTAS EF" / "DICTAMEN DEL REVISOR FISCAL" / "CERTIFICACION EF" y el token de cada uno. Es lo
   mismo que antes había que clickear en "Ver otros documentos adicionales" de la Vista 360.
   **Trampa**: el campo `infoEmpresa.documentos_adicionales` que viene en la respuesta de
   Elasticsearch está desactualizado — viene VACÍO para 2021 en adelante aunque los documentos
   existan. Usar el endpoint, nunca el campo.
3. **Bajar**: `subvisor.aspx?Radicado=<token>` PRIMERO (es el que materializa el temporal y el que
   trae la ruta real), y recién después `GET .../bpmformularios/tmp/<ruta>` con `Referer` al
   subvisor. **El patrón `tmp/<radicado>/<radicado>.PDF` NO siempre se cumple**: el nombre de
   archivo a veces es interno y arbitrario (`tmp/2024-01-344261/1wr6f501!.PDF`) — hay que parsearlo
   del HTML del subvisor, no construirlo (adivinarlo da 404 silencioso).
4. **No paralelizar más de 1-2 procesos**: con 5 en paralelo el subvisor empieza a devolver HTML sin
   ninguna ruta de PDF adentro (throttling, no error) y hay que reparar después.

Si un club NO aparece en SIIS, casi siempre hay una causa societaria, no un problema de búsqueda:
o deposita bajo la razón social de otra sociedad (Águilas Doradas deposita como **TALENTO DORADO
S.A.**, NIT 900456885), o no es una sociedad comercial (Deportivo Pasto era asociación hasta su
conversión reciente a S.A.; la sociedad del DIM figura "en liquidación" mientras opera una
corporación). Ver el archivo de cada club.

**Procedimiento viejo, por browser (sigue funcionando, útil solo si los endpoints cambian):**
1. Googlear `"[club] S.A. NIT"` para conseguir el número de 9 dígitos — la búsqueda POR NOMBRE en
   SIIS no filtra bien (devuelve miles de resultados irrelevantes o ninguno), hace falta el NIT
   exacto.
2. Entrar a `siis.ia.supersociedades.gov.co`, pegar el NIT en el buscador (nunca el nombre) y click
   "BUSCAR".
3. Elegir el resultado con punto de entrada "Individuales" (o el del ejercicio más reciente si hay
   varios) y click "VER DETALLES" o directo "VISTA 360".
4. En Vista 360, click "Ver otros documentos adicionales" — si aparece una tabla con radicados, esos
   son los PDFs reales: "NOTAS EF" (a pesar del nombre, es el paquete COMPLETO: situación financiera
   + resultado integral + cambios en patrimonio + flujo de efectivo + notas, 30-60 páginas),
   "CERTIFICACION EF" y "DICTAMEN DEL REVISOR FISCAL".
5. Cada link "Ver" de esa tabla abre un visor (`servicios.supersociedades.gov.co/bpmformularios/...`)
   cuya petición de red real apunta a un PDF descargable directo en
   `.../bpmformularios/tmp/<radicado>/<radicado>.PDF` — hay que inspeccionar las network requests
   del browser para sacar esa URL exacta, no está en el HTML visible. El link puede abrir un popup
   bloqueado por el entorno — mejor `navigate()` directo a la URL del link en vez de clickearlo.
- El sitio a veces entra en mantenimiento ("Estamos actualizando SIIS...") por minutos — reintentar
  más tarde, no es un dead-end permanente.
- **Con la sesión 2026-09-22 quedan cubiertos 18 de los 20 clubes de la Categoría Primera A**:
  Millonarios, América de Cali, Atlético Nacional, Independiente Santa Fe, Junior de Barranquilla,
  Deportivo Cali, Deportivo Pereira, Once Caldas, Deportes Tolima y Envigado (sesiones 2026-09-12 y
  09-13), más Atlético Bucaramanga, Boyacá Chicó, Alianza FC (ex Alianza Petrolera), La Equidad,
  Llaneros, Unión Magdalena, Fortaleza CEIF y Águilas Doradas (2026-09-22). **Ya NO hace falta
  googlear el NIT**: con la API se busca por nombre, o se lista la liga entera agregando por CIIU.
  Los 2 que faltan no son falta de búsqueda, tienen causa societaria documentada en su archivo —
  **Independiente Medellín** (la S.A. figura en liquidación y opera una corporación, fuera del
  perímetro de Supersociedades) y **Deportivo Pasto** (era asociación; se convirtió a S.A. hace
  poco, así que debería empezar a aparecer — vale reintentar en una sesión futura).
  Quedan sin explorar, todos con ficha muy probable bajo el mismo patrón, pero son de Primera B o ya
  fuera de la categoría: Barranquilla F.C., Patriotas Boyacá, Real Cartagena, Cúcuta Deportivo,
  Atlético Huila, Deportes Quindío, Jaguares, Leones, Orsomarso, Cortuluá, Bogotá F.C., Tigres,
  Valledupar F.C., Real Santander, Universitario Popayán. El mismo listado incluye clubes de
  **básquet** (Titanes, Fastbreak, Gigantes de Barranquilla) y de **béisbol** (Los Toros) — o sea que
  el canal colombiano, como Companies House en Reino Unido, no depende del deporte. El informe
  agregado de Supersociedades
  (`supersociedades.gov.co/documents/20122/532936/Informe-futbol-pdf.pdf`) sigue sirviendo como
  cifra de control, no da datos por club.
  - **Envigado es el mejor hallazgo hasta ahora**: SIIS lista 10 ejercicios individuales consecutivos
    (2016-2025) bajo el mismo NIT — solo se bajó 2025 en la sesión 2026-09-13, queda pendiente bajar
    la serie completa si se busca el histórico más largo de Colombia.
  - **Gotcha nuevo confirmado (sesión 2026-09-13): la URL final del PDF
    (`.../bpmformularios/tmp/<radicado>/<radicado>.PDF`) a veces devuelve 404 en un `curl` directo
    aunque el navegador la sirva 200 OK.** Dos causas identificadas, arreglar en este orden: (1) el
    servidor parece necesitar que el navegador visite primero
    `VisualizarDocumentos.aspx?Radicado=<mismo token>` para "materializar" el archivo temporal —
    navegar ahí con el browser (aunque sea en blanco, no hace falta ver el visor cargar del todo) y
    RECIÉN DESPUÉS lanzar el `curl` a la URL `.../tmp/...PDF`; (2) además, mandar un `User-Agent` de
    navegador real y un header `Referer` apuntando a
    `.../bpmformularios/subvisor.aspx?Radicado=<token>` (`curl -A "Mozilla/5.0 ..." -e "<subvisor
    url>"`) — sin esto también puede devolver 404 incluso con el paso (1) hecho. Con ambos pasos,
    los 9 PDFs de los 3 clubes de esta sesión bajaron bien.
  - **Gotcha de tooling, no del portal**: en esta sesión el sitio SIIS disparó varios pop-ups a sitios
    de terceros sin relación (directinfo.ma, orcjamaica.com, servicio.indecopi.gob.pe) al clickear
    ciertos elementos (ej. "Ver otros documentos adicionales") — parecen anuncios/redirects
    inyectados en el entorno de testing, no arriesgan el hallazgo: simplemente cerrar la pestaña
    nueva y volver a seleccionar la pestaña original de SIIS (`tabs_select`), reintentar el click si
    hizo falta, y seguir. No confundir con un error real del portal.

## 3. Brasil — el país con mejor cobertura, gracias a la Lei do SAF

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
  - **São Paulo** — `futebolpaulista.com.br`, el más completo de todos: ver el punto siguiente, que
    es el hallazgo grande de la sesión 2026-09-22.
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
- **La Federação Paulista tiene un índice JSON abierto de TODOS sus clubes, año por año, 2010-2025
  (sesión 2026-09-22). Esto reemplaza el consejo viejo de descubrir nombres de archivo con
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
    repositorio de la federación** (sesión 2026-09-16): Palmeiras (2017-2025), Corinthians
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
  challenge`** (confirmado con Sport Recife, sesión 2026-09-16): una vez cargada la página en el
  Browser pane, usar `fetch()` + `Blob` + `<a download>` desde la consola de la página para bajar el
  archivo (comparando el tamaño en bytes contra el original) — `curl` sigue fallando aunque ya se
  tenga la URL exacta en la mano, así que no vale la pena reintentarlo ahí.
- **Un botón de descarga de "transparencia" clickeado por un browser automatizado puede disparar un
  redirect a un sitio de terceros sin relación** (Vitória → `rcdespanyol.com`, sesión 2026-09-16) —
  mismo patrón ya visto con SIIS Colombia (sección 2). No es un bloqueo real del club: extraer el
  `href` real vía JS del DOM en vez de clickear el botón.
- **El PDF real puede estar escondido dentro de un `<iframe src="about:blank"
  data-src="...docs.google.com/viewer?url=<pdf real>">` con lazy loading** — hay que revisar el
  `outerHTML` completo de la página, no solo los `<a href>` visibles ni el `.src` actual del iframe
  (que arranca en blanco hasta que se scrollea a la vista).
- **Comparar el tamaño en bytes de un PDF entre dos mirrors/fuentes es una forma barata y confiable
  de confirmar que es el mismo documento** (usado repetidamente sesión 2026-09-16 para desambiguar
  Santos/Guarani y sitio propio vs. mirror de la federación en Corinthians) — más rápido que releer
  el texto completo cada vez.
- **Un dead-end de una sesión anterior puede haberse destrabado solo porque la URL se movió, sin que
  cambiara nada regulatorio** (sesión 2026-09-16: de los 5 dead-ends reintentados con un ángulo
  nuevo, 4 — Vitória, Ceará, Fortaleza, Sport Recife — se resolvieron encontrando el portal en una
  URL/subdominio distinto al que había fallado antes). Vale la pena reintentar periódicamente los
  dead-ends viejos con una búsqueda fresca, no tratarlos como permanentes salvo que el bloqueo sea
  estructural (forma jurídica, regulador inexistente).
- **Dos dead-ends viejos más se destrabaron en la sesión 2026-09-22, y por el mismo motivo en los
  dos: se estaba adivinando el nombre de archivo en vez de leer un índice.** **América Mineiro**
  (que esta skill listaba como dead-end) tiene sus PDFs linkeados en el HTML de
  `americafc.com.br/transparencia`, solo que apuntando a `irp.cdn-website.com` (CDN de Duda) y nunca
  al dominio del club — por eso `WebSearch site:americafc.com.br` no los encontraba; la regla que
  sale de ahí es `curl` + `grep '\.pdf'` sobre el HTML crudo antes de dar por perdido un portal que
  "menciona" las demonstrações. **Criciúma** pasó de "solo un balance de 2013" a **14 ejercicios
  consecutivos (2012-2025)**, vía la Federação Catarinense y su propio
  `criciuma.com.br/portal-transparencia`: el error 500 de la sesión anterior venía de adivinar
  nombres de archivo, no de un bloqueo.
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

## 4. Uruguay — bloqueado, no reintentar con los mismos 3 ángulos

Peñarol y Nacional son ambos "Sociedad Anónima Deportiva" y sí producen balances auditados reales,
pero Uruguay NO tiene un regulador tipo CMF/Supersociedades que obligue a publicarlos abiertos.
Confirmado, 3 ángulos distintos, los 3 bloqueados — **no reintentar con estos mismos métodos**:
1. La sección "Transparencia" del sitio propio de Peñarol redirige al login de socios
   (`crm2.montevideo.com.uy/areasocio`).
2. La AIN (Auditoría Interna de la Nación, el regulador estatal de las SAD uruguayas) no tiene un
   portal de consulta pública de balances por sociedad — solo normativa general.
3. La prensa (montevideo.com.uy, elobservador.com.uy) confirma CIFRAS puntuales de resultado, pero
   nunca linkea ni adjunta el PDF real.
- Si se retoma en el futuro, el ángulo distinto a probar es un pedido formal de acceso a información
  pública a la AIN, o contactar a un socio real dispuesto a compartir el PDF que le llega por mail —
  no repetir los 3 de arriba.

## 5. Ecuador — ningún club es todavía S.A.D.P./SAD; Supercias no aplica hasta que eso cambie

**Corrección importante de la sesión 2026-09-13, sobre la primera versión de esta sección (que
asumía Supercias como la vía correcta "en teoría"): el problema no era solo el autocomplete, era que
Supercias estructuralmente no regula a estos clubes todavía.** Los clubes profesionales
ecuatorianos obtienen personería jurídica vía el Ministerio del Deporte (Acuerdo Ministerial), como
"sociedades civiles sin fines de lucro" — no como "compañías" bajo la Ley de Compañías que sí regula
Supercias. La figura de S.A.D.P./SAD (Sociedad Anónima Deportiva) es LEGAL desde hace tiempo en
teoría, pero recién se volvió operativa en la práctica: reforma a la Ley Orgánica del Deporte
publicada 11-feb-2026, reglamento de la Superintendencia de Compañías emitido 23/24-jun-2026, y a
agosto de 2026 solo UN club de todo el país (9 de Octubre, categoría inferior) había presentado
documentación para INICIAR (no completar) el trámite — ningún club grande de Serie A lo completó
todavía (Barcelona SC lo está "analizando", proceso estimado 12-18 meses). Ver
`fuentes/Ecuador/_notas-generales.md` para la cronología completa con fuentes de prensa.

**Implicación práctica para sourcing**: mientras un club no complete su conversión a SAD, buscarlo en
el portal "Consulta de Compañías" de Supercias es un callejón sin salida estructural, no un problema
de autocomplete — la entidad no está ahí porque no es una "compañía". El autocomplete (PrimeFaces)
del portal también es poco predecible por su cuenta (no devolvió sugerencias ni con nombre completo
ni con RUC candidato, y con búsquedas parciales devuelve coincidencias que ni contienen el término
buscado), pero eso es secundario frente al problema de fondo. Cuando algún club efectivamente
complete la conversión a SAD (chequear con `"[club] se convierte en sociedad anónima deportiva"` en
prensa antes de ir directo a Supercias), a partir de ese momento sí pasaría a estar regulado por
Supercias y este portal volvería a ser relevante.

**Qué SÍ funcionó esta sesión, sin depender de Supercias ni de la figura SAD**: varios clubes
publican voluntariamente, como sociedad civil, reportes de rendición de cuentas a sus socios en su
propio sitio oficial — Deportivo Cuenca colgó en agosto de 2026 un "informe presidencial" (dos PDFs
vía links de Google Drive en una nota de prensa propia) con movimientos bancarios e impuestos
pagados; LDU Quito tiene una sección `/transparencia/` fija con estados financieros de su club social
consolidado (aunque mezclado con colegio/country club, ver `fuentes/Ecuador/LDU Quito.md`). Ojo: esto
es voluntario y poco común — la mayoría de los clubes chequeados esta sesión (Barcelona SC, Emelec,
Independiente del Valle, Aucas, Delfín SC, Universidad Católica, El Nacional, Macará, Mushuc Runa,
Técnico Universitario, Orense SC) NO tienen ninguna sección equivalente — pero vale la pena revisar
el sitio oficial de cada club (menú completo, no solo rutas típicas `/transparencia/`) antes de
asumir que no existe. Cuidado además con reportes de este tipo: suelen ser de CAJA (ingresos/egresos
bancarios, pagos de impuestos), no estados contables de DEVENGADO con balance/estado de resultados
completo — releer `club-data-mapping/SKILL.md` antes de decidir si encajan en el esquema del sitio.

## 6. Perú, Paraguay, Bolivia, Venezuela — sin metodología país-nivel todavía

Estos 4 países no tuvieron (todavía) un hallazgo de nivel "regulador que aplica a todos los clubes"
como Chile/Colombia/Brasil — lo encontrado hasta ahora fue caso por caso, ver la ficha de cada club
en `fuentes/<País>/<Club>.md`:
- **Perú**: barrido de 12 clubes adicionales (sesión 2026-09-13, además de los 3 ya conocidos)
  confirmó un patrón consistente: la enorme mayoría de los clubes de Liga 1 son **asociaciones
  civiles sin fines de lucro** (Melgar, Cienciano, Sport Boys, Cusco FC, ADT, Alianza Atlético,
  Deportivo Municipal, Comerciantes Unidos, Sport Huancayo, Binacional — todos confirmados vía SUNAT/
  datosperu.org con tipo societario "Asociación"), sin obligación legal de publicar nada. Los pocos
  que SÍ son sociedades son S.A. o S.A.C. CERRADAS (Sporting Cristal, UCV, Los Chankas), que tampoco
  tienen obligación de registro ante la SMV (solo aplica a S.A.A. — Sociedad Anónima ABIERTA). Ningún
  club de los 12 tiene sección de transparencia/estados financieros en su sitio oficial propio (a
  diferencia de Alianza Lima, que sí publica voluntariamente pese a ser también una entidad sin fines
  de lucro — es la excepción, no la regla). Conclusión: en Perú, salvo que un club sea S.A.A. y
  registre valores ante la SMV, **no hay ningún regulador que obligue a publicar** — el único canal
  viable es la publicación VOLUNTARIA en el sitio propio del club (como Alianza Lima) o un proceso
  concursal INDECOPI (ver debajo, con matiz importante).
  - **SMV (Superintendencia del Mercado de Valores, smv.gob.pe/SIMV) — confirmado que SÍ es
    consultable pero Melgar NO está ahí**: el buscador de "razón social de la empresa" en la portada
    de smv.gob.pe es de texto libre (no autocomplete, pese al mensaje de validación "Ingrese/
    Seleccione"). Se buscó "MELGAR" y "FOOT BALL CLUB MELGAR" (el club estuvo cerca de convertirse en
    S.A.A. hace más de una década según prensa, pero revirtió a asociación en 2019): **0 resultados
    en ambos casos**, confirmando que nunca se registró como emisor. También existe
    `Frm_InformacionFinancieraporperiodo` (listado completo de TODOS los emisores que presentaron
    EEFF en un período dado, con filtros Individual/Consolidada/Todos + Anual/Intermedio) — se
    recorrió el listado completo de 2023 Anual (276 filas) buscando "MELGAR"/"DEPORTIVO"/"CIENCIANO":
    ningún club de fútbol apareció. Útil como método de descarte rápido para futuros candidatos
    peruanos con sospecha de ser S.A.A.
  - **INDECOPI / IFCO (servicio.indecopi.gob.pe/e-value/pgw_infoXDeudor.seam) — ahora SÍ explorado a
    fondo para Universitario de Deportes, confirmado DEAD-END para documentos financieros, con
    gotcha de navegación importante**: la URL carga por defecto en el tab equivocado
    ("PROCEDIMIENTO ACELERADO DE REFINANCIACIÓN CONCURSAL - PARC", identificable porque su combo de
    "oficina concursal" solo lista 4 opciones tipo "-PARC"); hay que clickear explícitamente el link
    "INFORMACIÓN POR DEUDOR" del menú superior (`frmMenu:cmdlnkRecursoSel22`) para que el combo
    muestre la lista larga real (CCO-INDECOPI, CRP-INDECOPI, etc.). Ahí sí, con el radio "Razón
    Social" + captcha (imagen de 6 caracteres, capturable con `canvas.drawImage()` +
    `toDataURL()` vía JS ya que es demasiado chica para leerse en un screenshot normal), la búsqueda
    funciona y devuelve el expediente. PERO los 3 sub-modales del resultado (seguimientos del
    expediente, juntas programadas, listado de acreedores) exponen únicamente **historial procesal**
    (resoluciones con fecha/número/texto de "SE RESUELVE", fechas de convocatoria de asambleas,
    nombres/montos de acreedores) — nunca un PDF adjunto ni un informe del administrador con balance.
    A diferencia de Colombia (Supersociedades en reorganización SÍ expone estados financieros
    completos), el sistema concursal peruano NO es un canal de estados financieros, solo de
    trazabilidad legal del proceso. FBC Melgar tiene un proceso concursal similar desde 2012 (deuda
    con SUNAT) pero no se ubicó su expediente exacto esta sesión — de encontrarse, esperar el mismo
    resultado (dead-end) salvo evidencia en contrario.
- **Paraguay**: Olimpia/Cerro Porteño/Libertad — sin regulador tipo CMF/Supersociedades identificado,
  sin sección de transparencia financiera en ninguno de los 3 sitios oficiales, dead-end sin lead
  nuevo por ahora.
- **Bolivia/Venezuela**: solo un primer chequeo superficial hecho, sin metodología desarrollada
  todavía — próxima sesión que toque estos países, empezar por buscar si existe un regulador
  societario nacional con portal público (mismo patrón que Colombia/Ecuador) antes de ir club por
  club.

## 7. CONCACAF (Norte/Centroamérica/Caribe) — la región más difícil, un hallazgo real inesperado en México

Barrido inicial de 2026-09-13, 10+ clubes entre México, Costa Rica, Honduras, Panamá, Guatemala,
Jamaica y MLS (Estados Unidos). Confirma que esta es, hasta ahora, la región más pobre en disclosure
público de todo el proyecto — con UNA excepción real que vale la pena explotar más en el futuro.

- **México — Club América es, de hecho, un caso "CMF/Supersociedades" oculto**: el 31/01/2024,
  Grupo Televisa escindió su negocio de fútbol (Club América) + Estadio Azteca (ahora Banorte) +
  editoriales + juegos de azar en una compañía nueva, **Ollamani, S.A.B.**, que cotiza en la Bolsa
  Mexicana de Valores (clave `AGUILAS`) y por lo tanto está obligada por la CNBV a publicar Estados
  Financieros Consolidados auditados bajo IFRS — descargables sin login en `ollamani.com.mx/reportes-3/`
  (espejados en bmv.com.mx y gob.mx/cnbv). Ollamani reporta bajo IFRS 8 un "Segmento de Fútbol" (Club
  América + Estadio Banorte) con ingresos y utilidad propios, aunque SIN balance separado por
  segmento — es fútbol mezclado con ingresos de estadio, no un balance puro del club. Dos ejercicios
  ya descargados (2024 y 2025) en `Clubes/México/Club América/`, ver `fuentes/México/Club América.md`
  para el detalle completo y las dudas de mapeo pendientes.
  - **Implicación para el resto de Liga MX**: el supuesto de partida ("Liga MX = todo privado, sin
    disclosure") ya no se puede asumir ciegamente — antes de descartar un club nuevo de Liga MX, vale
    la pena chequear si su grupo controlador tiene ALGUNA otra pata que cotice en BMV/CNBV (ej. FEMSA
    para Monterrey/Tigres, aunque no confirmado si desglosan fútbol como segmento). Cruz Azul (dueño:
    una cooperativa cementera, no una S.A.) SÍ tiene auditoría externa confirmada por prensa pero sin
    disclosure público encontrado — ver `fuentes/México/Cruz Azul.md`.
- **Costa Rica — mismo patrón que Uruguay, pero con un regulador que ACTIVAMENTE prohíbe publicar**:
  Alajuelense, Saprissa y Herediano sí producen estados financieros auditados reales (Saprissa
  confirmado auditado por Grant Thornton), pero la Federación Costarricense de Fútbol (FEDEFUT)
  exige el documento al Comité de Licencias (Reglamento de Concesión de Licencias, art. 41) Y
  GARANTIZA CONFIDENCIALIDAD por el mismo reglamento (art. 12) — el regulador deportivo es lo opuesto
  a un CMF: exige y blinda, no exige y publica. El Registro Nacional de Costa Rica solo certifica
  personería jurídica, no es un repositorio de balances. Tres ángulos agotados (sitio oficial,
  prensa, FEDEFUT) — ver `fuentes/Costa Rica/_notas-generales.md` antes de reintentar igual.
- **Honduras, Panamá, Guatemala — reguladores de valores reales, pero sin ningún club registrado**:
  los tres países tienen bolsa/superintendencia de valores con padrón público de emisores (BCV/CNBS
  en Honduras, SMV en Panamá, BVNSA en Guatemala) — se revisó el listado completo de Panamá y
  Guatemala sin encontrar ningún club de fútbol como emisor (confirmado, no reintentar salvo anuncio
  específico de emisión). Honduras: el listado no se revisó línea por línea todavía (pendiente).
  Ninguno de los 5 clubes chequeados (Olimpia, Motagua, Tauro FC, Comunicaciones, Municipal) tiene
  cobertura de prensa sobre auditorías/asambleas como sí la tiene Costa Rica.
- **Jamaica — lead sin cerrar, el más prometedor de la región después de México**: la Companies Act
  2004 jamaiquina exige balance + P&L + dictamen de auditor a TODA compañía (no solo bursátiles), y
  el Companies Office of Jamaica tiene un portal de búsqueda pública con pedido de "certified
  documents" pagos. No se pudo confirmar en esta sesión si esos documentos incluyen los estados
  financieros depositados (vs. solo actos societarios) por una limitación de TOOLING (browser
  compartido con otra tarea en paralelo, pestañas cerrándose solas) — no un bloqueo real del sitio.
  Waterhouse FC Limited ya confirmado como entidad registrada candidata. Retomar con browser dedicado
  o pagando la tarifa en JMD por el documento certificado — ver `fuentes/Jamaica/_notas-generales.md`.
- **MLS (Estados Unidos/Canadá) — dead-end estructural confirmado para el FÚTBOL, no reintentar**
  (pero ojo: esto NO es la conclusión sobre EE.UU. en general — ver sección 10, donde la SEC sí
  resultó un canal real para básquet, hockey y béisbol): la liga opera
  como "single-entity" (Major League Soccer, L.L.C. es dueña centralizada de todos los equipos y
  contratos) — no existe ni puede existir un balance standalone por club bajo este diseño
  institucional. Confirmado en SEC EDGAR: cero filings de clubes individuales. Las valuaciones de
  Forbes/Sportico por club son estimaciones de mercado, NUNCA un estado financiero auditado — no usar
  como fuente bajo ningún concepto.

## 8. África — primer barrido (sesión 2026-09-13), 0 clubes con PDF real, pero Marruecos abre una
## pista regulatoria concreta

Primer intento de sourcing fuera de Sudamérica. Se probaron 4 países (Sudáfrica primero, por tener
la infraestructura de registro corporativo más desarrollada del continente; después Egipto,
Marruecos y Nigeria) con varios ángulos genuinos cada uno — 0 PDFs reales conseguidos en esta
sesión, pero cada dead-end quedó documentado a fondo (ver `fuentes/<País>/_notas-generales.md` de
cada uno) para que una sesión futura no repita el camino. Detalle completo por país abajo; acá solo
el resumen que importa para decidir por dónde seguir.

- **Sudáfrica — dead-end ESTRUCTURAL (no reintentar sin un dato nuevo)**: los clubes de la PSL están
  constituidos como "(Pty) Ltd" (private companies), y la Sección 33 de la Companies Act
  sudafricana EXIME a las private companies de presentar su AFS ante el CIPC (Companies and
  Intellectual Property Commission) para consulta pública — esa obligación solo aplica a "public
  companies" (Ltd) y state-owned companies. Confirmado con 5 clubes (Kaizer Chiefs, Orlando Pirates,
  Mamelodi Sundowns, SuperSport United, Royal AM), ninguno cotiza en JSE/AltX, y ninguna corporación
  madre (ej. MultiChoice, ex-dueño de SuperSport United) desglosa al club en sus EEFF por ser
  inmaterial. Mismo patrón que Chile OTODP: la categoría societaria misma bloquea la publicación, no
  un problema de portal. Único hilo sin cerrar: los manuales PAIA (ley de acceso a la información)
  que publican los clubes por ley — no se pudo leer su contenido (403), podrían listar los AFS como
  registro disponible a pedido formal.
- **Egipto — dead-end estructural, verificado no asumido**: Al Ahly y Zamalek son asociaciones
  deportivas (no sociedades), sin regulador que les exija publicar. Confirmado explícitamente
  (Zamalek: la propia vicepresidencia admitió no haber sido transparente ni con sus propios socios
  sobre la escala real de la deuda) en vez de asumir la opacidad típica de clubes-asociación.
- **Marruecos — el hallazgo más prometedor de este barrido, un mecanismo real pero bloqueado por
  pago**: Marruecos viene profesionalizando sus clubes a **SAS (Société Anonyme Sportive)** — Wydad
  AC y Raja Club Athletic ya tienen la suya. Marruecos SÍ tiene un registro central equivalente al
  Infogreffe francés (**OMPIC**, vía el portal **directinfo.ma**) donde toda Société Anonyme
  marroquí deposita su "bilan"/CPC (balance + resultado) ante el greffe del Tribunal de Commerce —
  la búsqueda de una empresa es gratis, pero DESCARGAR el documento real es un servicio pago que
  requiere cuenta OMPIC + medio de pago marroquí, algo que un agente no puede completar (no se puede
  crear cuentas ni ingresar datos de pago). No se llegó a confirmar siquiera si Raja S.A. (SAS
  constituida en agosto 2025, posiblemente sin su primer ejercicio cerrado todavía) o la SAS del
  Wydad (más antigua, mejor candidata) tienen ya un bilan depositado para pagar. **Sugerencia
  concreta para la próxima sesión**: entrar a `directinfo.ma`, usar la búsqueda GRATUITA por nombre
  ("RAJA CLUB ATHLETIC SOCIETE ANONYME RAJA", "WYDAD ATHLETIC CLUB") para confirmar que existe un
  bilan depositado ANTES de pagar nada — si Guido está dispuesto a pagar el documento él mismo (el
  monto parece bajo, a juzgar por los tramos de `charika.ma`, un revendedor privado que confirmó no
  tener el bilan de Raja disponible ni pago), esta sería la primera fuente 100% oficial de África.
  Ojo: la prensa financiera marroquí (Médias24 sobre todo) SÍ cubre los "rapport financier" de ambos
  clubes con cifras reales y detalladas, pero solo los presenta en la Asamblea de socios y nunca
  adjunta el PDF — mismo patrón exacto que Uruguay, no vale la pena insistir con prensa.
- **Nigeria — dead-end a nivel de LIGA completa, no club por club**: la NPFL (Nigeria Professional
  Football League) es mayoritariamente de clubes propiedad de gobiernos estatales, que según prensa
  nigeriana ni siquiera presentan retorno anual ante la CAC (Corporate Affairs Commission) ni tienen
  cuentas auditadas — no hay ni la estructura societaria mínima de la que exigir un balance. No vale
  la pena investigar club por club de la NPFL sin un cambio de política; el ángulo sin explorar es
  buscar el escaso número de clubes nigerianos de propiedad PRIVADA (ej. ligados a una iglesia o un
  empresario) en vez de los estatales.

Ningún club africano (de los investigados en ningún país) cotiza en ninguna bolsa continental, y no
existe ningún club de fútbol africano listado directamente en bolsa (a diferencia de casos europeos
como Ajax o Borussia Dortmund) — confirmado con una búsqueda específica de este punto.

## 9. Reino Unido — Companies House, el mejor canal del proyecto, y sirve para CUALQUIER deporte

Primer barrido 2026-09-13. Toda sociedad limitada británica está obligada por la Companies Act 2006
a depositar cuentas anuales auditadas, y **Companies House las publica enteras, gratis, sin login,
sin API key y sin límite** — un `curl` con User-Agent de navegador alcanza. No hay equivalente al
`auth`/`send` de la CMF chilena, al Referer del SIIS colombiano ni al pago del OMPIC marroquí.

Como la obligación es por forma jurídica y no por deporte, de un solo barrido salieron 24 entidades
de 4 deportes: 10 clubes de fútbol (9 Premier League + Celtic en Escocia), 4 de rugby union
(Premiership), 4 condados de cricket y 5 escuderías de Fórmula 1.

**Los 3 pasos:**
1. Buscar: `.../search/companies?q=<nombre>` → `href="/company/<número>"`.
2. Listar: `.../company/<número>/filing-history` (y `?page=2` para ir más atrás). El parámetro
   `?category=accounts` **no filtra nada** por `curl`, hay que filtrar por texto uno mismo.
3. Bajar: `.../company/<número>/filing-history/<transactionId>/document?format=pdf&download=0`.
   (Host: `find-and-update.company-information.service.gov.uk`.)

**El tipo de presentación dice qué hay adentro, y hay que leerlo:**
- `Group of companies' accounts` = consolidadas, es lo que conviene.
- `Full accounts` = una sola sociedad; puede dejar afuera actividad del grupo (Manchester City y
  Aston Villa presentan así, y su grupo controlante es otra entidad).
- `Accounts for a medium company` = **puede** venir sin cuenta de resultados, pero no siempre:
  verificado que Bath Rugby FY2024/25 trae el P&L completo igual. No descartar por la etiqueta, abrir
  y buscar `TURNOVER`.
- `Accounts for a dormant company` / `Micro company accounts` = sociedad vacía; la operativa es otra.

**Gotcha central: los PDF de Companies House son ESCANEOS** (`Creator: go-tiff2pdf`), ~1 char/página
con `pdftotext`. Hay que OCRear con el flujo ya conocido del proyecto pero con `-l eng` en vez de
`-l spa`; probado a 200 dpi con `--psm 6` y la calidad es muy buena. Se probó pedir el iXBRL original
(`?format=xhtml` / `?format=xml`, que evitaría el OCR entero): devolvió **HTTP 500**. Vale reintentar
por sociedad, no contar con eso.

**Los clubes de cricket NO están en Companies House.** Son *registered societies* (número terminado
en `R`) y depositan en el **Mutuals Public Register de la FCA**. Buscados en Companies House aparecen
pero con historial de presentaciones VACÍO — no es que no publiquen, es el registro equivocado. El
canal de la FCA resultó incluso mejor:
- Buscar: `https://mutuals.fca.org.uk/Search/Search?SearchTerm=<nombre>` → `/Search/Society/<id>`.
- Listar (JSON, sin login): `https://mutuals.fca.org.uk/Documents/GetSocietiesDocument?societyId=<id>`.
  **Gotcha de parseo**: devuelve dos formas distintas según la sociedad, a veces un array pelado y a
  veces `{sEcho, iTotalRecords, aaData}`. Si no se contemplan las dos, el listado sale vacío sin
  error (en esta sesión 6 condados dieron "0 memorias" hasta arreglarlo).
- Bajar: `https://mutuals.fca.org.uk/Documents/Download/<docId>`.
- **Atajo de descubrimiento**: el padrón COMPLETO de las 32.430 sociedades registradas está como CSV
  abierto en `https://fcastoragemprprod.blob.core.windows.net/societylist/SocietyList.csv`. Filtrando
  por nombre se encuentran todas las de un deporte de una (43 con "cricket").
- **Estos PDF SÍ tienen capa de texto** (57.000-131.000 caracteres): `pdftotext -layout` y listo, sin
  OCR. Y el histórico es mucho más profundo que Companies House: Warwickshire tiene 37 memorias desde
  1993 y Surrey 35 desde 1994 — la serie más larga de todo el proyecto.

**Escocia** es el mismo Companies House, con números `SC` (Celtic = `SC003487`).

**Actualizado (sesión 2026-09-16): los 20 clubes de la Premier League 2025/26 ya están cubiertos**
(los 10 que faltaban — Bournemouth, Brentford, Brighton, Burnley, Crystal Palace, Fulham, Leeds,
Nottingham Forest, Sunderland, Wolves — se bajaron esa sesión). Dos gotchas nuevos que costó
encontrar:

- **La entidad correcta a veces es una HOLDING separada de la operativa, y el nombre no siempre lo
  delata.** Crystal Palace no está bajo "CPFC Limited" sino bajo `CPFC 2010 Limited` (n° 07206409);
  Burnley no está bajo la sociedad histórica `Burnley Football & Athletic Company, Limited`
  (00054222) sino bajo `Burnley FC Holdings Limited` (n° 08335231). El indicio para elegir bien:
  filtrar candidatos por SIC "93120 Activities of sport clubs", comparar cuál presenta `Group of
  companies' accounts` (consolidado, lo que conviene) en vez de solo `Full accounts`, y cruzar los
  directores listados con los dueños conocidos del club por prensa (Steve Parish/Josh
  Harris/Woody Johnson para Palace, Alan Pace/ALK Capital para Burnley) antes de asumir que la
  primera coincidencia de nombre es la correcta.
- **Un club con historia de administración judicial puede tener DOS entidades en Companies House,
  y el historial de la nueva no llega más atrás de su año de incorporación.** Leeds United tiene una
  entidad vieja disuelta (`Leeds United Association Football Club Limited (The)`, n° 00170600,
  dissolved 2019) y la actual (06233875, incorporada 2007) — el filing history de la actual no
  cubre nada anterior a 2013. Si en el futuro se agrega un club de la EFL con pasado de
  administración/liquidación (ej. Portsmouth, Bury), buscar ambas entidades antes de concluir que
  "no hay historial viejo".
- **La fecha de cierre de ejercicio puede cambiar dentro de la misma serie de un club** (no es un
  error de transcripción): Wolves y Nottingham Forest cerraban el 31 de mayo y pasaron al 30 de
  junio en su presentación más reciente; Burnley pasó del 30 de junio al 31 de julio en 2020. Antes
  de cargar al sitio un ejercicio de transición, chequear si cubre 12 o 13 meses.

**Qué queda de Reino Unido**: los clubes de la EFL (segunda a cuarta división), los 9 condados de
cricket restantes (ya identificados en el CSV), el resto de Premiership Rugby, la Super League de
rugby league, y profundizar el histórico (años extra) de los 20 clubes de Premier ya cubiertos. No
hay nada que investigar en ninguno de esos, es ejecutar el mismo procedimiento.

## 10. Estados Unidos — la SEC, para los deportes que NO son fútbol

El dead-end de la MLS (sección 7) es real pero es SOLO de la MLS. La regla que sí generaliza es la
misma que ya había aparecido en México con Ollamani/Club América: **si el dueño de un club es una
compañía que cotiza, la SEC la obliga a publicar estados auditados completos, gratis**. Confirmado
2026-09-13 para 3 clubes de 3 deportes: New York Knicks (NBA) y New York Rangers (NHL) vía Madison
Square Garden Sports Corp. (`MSGS`), y Atlanta Braves (MLB) vía Atlanta Braves Holdings (`BATRA`).

Procedimiento: `https://www.sec.gov/files/company_tickers.json` (padrón de emisores, sirve además
como descarte rápido) → `https://data.sec.gov/submissions/CIK<cik a 10 dígitos>.json` →
`https://www.sec.gov/Archives/edgar/data/<cik>/<accession sin guiones>/<primaryDocument>`.

**Dos ventajas y un gotcha:**
- Los documentos son **HTML con texto real**, no escaneos: cero OCR. El más barato de procesar de
  todos los canales del proyecto.
- El mismo canal sirve para clubes que no son de EE.UU.: Manchester United plc presenta un 20-F,
  así que es el único club inglés de esta sesión que NO hay que OCRear.
- **Gotcha**: la SEC devuelve **HTTP 403** si el `User-Agent` no identifica a quien consulta. Un UA
  de navegador común NO alcanza (sí alcanza en Companies House); hay que mandar el formato que pide
  la SEC, `Nombre contacto@dominio`.

Problema recurrente de este canal, en los 3 casos: **el perímetro nunca es "un club"**. MSG Sports
mezcla dos clubes de dos deportes en un solo consolidado, Braves Holdings mezcla el club con un
desarrollo inmobiliario, Ollamani mezclaba el club con el estadio y con negocios que no son deporte.
Antes de cargar, mirar la nota de segmentos y decidir explícitamente qué perímetro se publica.

## 11. Gotcha de TOOLING (no de ningún portal): tesseract no puede leer de `/tmp`

En este entorno, `tesseract /tmp/x.png stdout` falla con `Error in fopenReadStream: failed to open
locally`. No es un problema del PDF ni del OCR: el sandbox bloquea esa ruta. Hay que renderizar las
imágenes al directorio de scratchpad de la sesión y OCRear desde ahí. Se pierde bastante tiempo
buscándole la vuelta si uno cree que el PDF está roto.

## 12. Alemania — Unternehmensregister + DFL Finanzkennzahlen, la mejor cobertura de liga completa
## del proyecto hasta ahora

Primer barrido (sesión 2026-09-16/17), dentro de una lista más larga de las 30 mejores ligas del
mundo por consenso general, recorrida en orden alfabético. Alemania resultó tener DOS canales
oficiales que juntos cubren los 18 clubes de la Bundesliga sin excepción, algo que no había pasado
en ningún otro país del proyecto:

- **Unternehmensregister** (`unternehmensregister.de`, gratis, sin login) es el equivalente alemán
  de Companies House: toda sociedad (GmbH, AG, KGaA) debe depositar su Jahresabschluss
  (balance+cuenta de resultados+anexo+dictamen de auditor) por ley. Funciona muy bien para los
  clubes que separaron su rama profesional en una sociedad — confirmado con series largas y
  completas para RB Leipzig (12 ejercicios, 2014-2025 sin huecos) y TSG Hoffenheim (16 ejercicios
  confirmados desde 2009). Borussia Dortmund, al cotizar en la Bolsa de Fráncfort, además publica su
  propio Geschäftsbericht completo en su sección de inversores — el caso más fácil y prolijo de la
  liga.
  - **Buscar por la razón social LEGAL de la sociedad, no por el nombre del club**: hace falta la
    denominación exacta (ej. "RasenBallsport Leipzig GmbH", "Borussia Dortmund GmbH & Co. KGaA"), no
    "RB Leipzig" a secas.
  - **Exención legal real que bloquea PERMANENTEMENTE a algunos clubes**: el §264 Abs. 3 / §264b del
    HGB (código de comercio alemán) exime de depositar Jahresabschluss propio a una sociedad cuyo
    único socio es una gran corporación que garantiza su deuda. Esto bloquea a **Bayer Leverkusen**
    (socio único: Bayer AG) y **VfL Wolfsburg** (socio único: Volkswagen AG) de forma estructural,
    no por falta de búsqueda — no vale la pena reintentar sin evidencia de un cambio societario.
  - **Hamburger SV tiene DOS entidades que hay que distinguir**: la `HSV Fußball AG & Co. KGaA` (el
    perímetro correcto para las finanzas del fútbol) y el `Hamburger Sport-Verein e.V.` (la
    asociación madre multideporte) — verificar siempre cuál de las dos es cada PDF antes de cargar
    cualquier cifra.
- **5 de los 18 clubes de Bundesliga siguen siendo e.V. puro** (nunca escindieron el fútbol
  profesional a una sociedad): 1. FC Union Berlin, SC Freiburg, 1. FSV Mainz 05, FC St. Pauli, 1. FC
  Heidenheim. Para estos, Unternehmensregister no tiene nada que buscar — confirmado explícitamente
  que su balance real existe pero es de acceso solo para socios (Union Berlin y St. Pauli).
- **DFL Finanzkennzahlen — el hallazgo más importante de la sesión**: la propia Deutsche Fußball
  Liga publica anualmente un PDF único (`Clubes/Alemania/_DFL-Finanzkennzahlen/`) con Bilanz + GuV
  auditado de **los 18 clubes de Bundesliga a la vez**, sin importar su forma jurídica — cubre
  incluso a los e.V. puros y a los exentos por el §264 HGB. Se bajaron 7 ejercicios (2018-2024). Es
  el equivalente alemán a lo que sería un informe agregado de liga entera, y vale la pena chequear
  si otras ligas top (España/LaLiga, Francia/DNCG) tienen un equivalente antes de dar por perdido un
  club sin disclosure individual.
- **Gotcha de tooling, no del portal**: la búsqueda y descarga en Unternehmensregister necesitan un
  click real (`computer`, no JS/fetch) porque el flujo pasa por un formulario con sesión — si el
  Browser pane deja de estar visible en pantalla a mitad de una sesión larga, las descargas se
  bloquean sin error claro. **La vuelta que funcionó**: abrir una pestaña nueva con `tabs_create` —
  el bloqueo desapareció de entrada, sin ningún otro truco. No hace falta pelear con la pestaña
  vieja, es más rápido abrir una nueva.
- **Un mismo ejercicio puede tener DOS depósitos con el mismo texto de enlace en el listado**: para
  Borussia Mönchengladbach 2024 había dos entradas idénticas en apariencia — una era solo el informe
  del consejo de vigilancia (3 páginas), la otra el balance completo (15 páginas). El tamaño en
  bytes de la respuesta es la forma rápida de distinguir cuál es cuál sin abrir los dos.
- **Con los 18 clubes de Bundesliga 2025/26 con ejercicio(s) reales confirmados** (RB Leipzig,
  Dortmund, Bayern, TSG Hoffenheim con serie completa 2009-2025, Borussia Mönchengladbach con serie
  confirmada desde 2006, Werder Bremen, Eintracht Frankfurt, VfB Stuttgart, 1. FC Köln, FC Augsburg,
  Hamburger SV — más Leverkusen/Wolfsburg vía el agregado de la DFL, y los 5 e.V. puros también vía
  DFL), Alemania queda como la primera liga top del proyecto sin ningún club sin cubrir. Lo que
  queda es solo profundidad: varios clubes tienen más ejercicios históricos confirmados en el
  registro de los que se bajaron (ej. Mönchengladbach hasta 2006) — mismo procedimiento, sección de
  arriba, para quien quiera completarlo.

## 13. Austria — Firmenbuch bloqueado por pago, pero la liga entera publica un agregado gratis

Segundo país de la lista de "30 mejores ligas del mundo" recorrida en orden alfabético (sesión
2026-09-17), inmediatamente después de Alemania. A diferencia de Alemania, el registro mercantil
austríaco NO es gratis para el documento completo:

- **Firmenbuch** (`justizonline.gv.at`, y su índice de eventos `evi.gv.at`): la búsqueda de la
  sociedad y sus datos básicos (razón social, capital, directores, fecha exacta de cada depósito de
  Jahresabschluss) son gratis y sin login — muy útil para CONFIRMAR que un club deposita cuentas y
  desde cuándo. Pero ver la lista completa de documentos exige login con ID Austria, y descargar el
  documento en sí es un servicio pago aparte. Confirmado con FC Red Bull Salzburg y FK Austria Wien
  AG — ni siquiera las Aktiengesellschaft (sociedades anónimas) se libran. Misma clase de barrera
  que el OMPIC marroquí (sección 8).
- **El sitio propio del club puede saltarse el problema por completo**: SK Rapid Wien publica en
  `skrapid.at/geschaeftsbericht-2/` una serie ININTERRUMPIDA de 15 ejercicios (2010/11-2024/25),
  balance consolidado + el de cada entidad (SK Rapid GmbH + el Verein) por separado — el mejor
  hallazgo individual del barrido, comparable a RB Leipzig en Alemania. Revisar siempre la sección
  "Geschäftsbericht"/"Transparenz" del sitio del club ANTES de ir al Firmenbuch.
- **La liga entera publica un agregado gratis, igual que la DFL alemana**: la Österreichische
  Fußball-Bundesliga publica un PDF anual ("Finanzkennzahlen"/Klub-JA) con balance + P&G auditados
  de los 24 clubes de las dos divisiones profesionales (12 Bundesliga + 12 2. Liga) a la vez — se
  bajaron 8 ejercicios (2017/18-2024/25). Vale la pena buscar este tipo de agregado de liga ANTES de
  pelear club por club contra un registro pago: ya funcionó en dos países consecutivos (Alemania y
  Austria), así que es lo primero a chequear en el próximo país nuevo también.
- Con esto, 11 de los 12 clubes de la Bundesliga austríaca quedaron cubiertos (directo o vía el
  agregado ÖFBL); el único sin ningún dato ni siquiera agregado por confirmar es un caso a revisar
  si se retoma Austria.

## 14. Bélgica — el canal más abierto del proyecto hasta ahora, sin login y scriptable por API

Tercer país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17), inmediatamente después
de Austria. La **Centrale des bilans** del Banco Nacional de Bélgica (`consult.cbso.nbb.be`) resultó
ser, hasta ahora, el registro mercantil más fácil de todo el proyecto:

- **Gratis, sin login, Y con una API JSON pública** — no hace falta ni un browser real:
  `.../api/rs-consult/published-deposits?enterpriseNumber=<BCE>` lista todos los depósitos de una
  entidad, y `.../api/external/broker/public/deposits/pdf/<id>` baja cada PDF directo con `curl`. Es
  un nivel más abierto que Companies House (UK) o Unternehmensregister (Alemania), que sí necesitan
  navegación real en algún punto del flujo.
- **Esto permitió series MUY largas en poco tiempo**: Club Brugge (35 ejercicios, 1999-2025),
  Standard Liège (31), Union Saint-Gilloise (28) y Westerlo (27) — las series más profundas
  encontradas en cualquier país hasta ahora, salvo Reino Unido (cricket).
- **El nombre del club casi nunca es la razón social legal, y puede haber homónimos con turnover en
  blanco**: hay que buscar por el número de empresa (BCE) correcto, y cuando existan varias
  entidades con nombres parecidos, comparar el campo de turnover (Omzet) del depósito más reciente
  de cada una antes de elegir — la entidad real del fútbol profesional tiene turnover real, las
  otras (asociación histórica, sociedad patrimonial del estadio) lo dejan en blanco. Confirmado con
  3 casos: Club Brugge operaba como "De Klokke" hasta 2011; la entidad real de Zulte Waregem se
  llama "Grensverleggend NV"; OH Leuven tiene 2 entidades homónimas sin turnover real además de la
  BV correcta.
- **Techo de disponibilidad real, no de búsqueda**: 1999 es el año más antiguo con PDF disponible en
  la Centrale des bilans para cualquier entidad consultada — no vale la pena buscar más atrás ahí.
- **Deloitte Pro League Report**: la propia Pro League/Deloitte publican un estudio socioeconómico
  agregado de toda la liga (5 ediciones bajadas, 2019-2023) — mismo patrón de "agregado de liga
  entera" que funcionó con la DFL alemana y la ÖFBL austríaca, aunque acá es un estudio, no un
  Bilanz+GuV por club.
- Con esto, los 16 clubes de la Pro League belga 2025/26 quedaron cubiertos con datos reales.

## 15. China — mayormente dead-end por diseño societario, pero NO es un dead-end de liga completa

Cuarto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17), primero donde el
resultado fue casi todo dead-end. Distinto de Nigeria (sección 8), donde no hay ni estructura
societaria de la que exigir nada: acá SÍ hay sociedades reales, solo que por diseño (accionista
único, sin obligación de depósito) casi ninguna genera disclosure público.

- **El ángulo que sí funciona, cuando funciona, es el mismo de México/Ollamani (sección 7) y
  EEUU/SEC (sección 10): rastrear si el accionista CONTROLANTE del club cotiza en alguna bolsa**
  (Shanghai, Shenzhen, o Hong Kong vía HKEXnews — `www1.hkexnews.hk`, gratis y sin login, el
  equivalente de la SEC para Hong Kong). De los 16 clubes de la CSL 2025/26, solo uno (**Shanghai
  Port**, cuyo dueño SIPG cotiza SSE:600018) tiene este caso, y aun así el club no tiene cifras
  propias desglosadas en el consolidado del dueño (mezclado con inmobiliaria/energía) — más
  limitado que Ollamani/MSG Sports.
- **La CFA exige auditoría a cada club para la licencia pero NO la publica** — mismo patrón que
  FEDEFUT en Costa Rica (sección 7): el regulador deportivo exige y blinda, no exige y publica.
- **La CSL tuvo una ola de reestructuraciones societarias 2023-2025** (varios clubes cambiaron de
  accionista controlante tras el colapso de Evergrande) — esto hace que el ángulo de "accionista
  cotizante" valga la pena reintentar periódicamente para clubes hoy dead-end, no descartarlos como
  permanentes.
- **Hallazgo real pero fuera del scope de clubes vigentes**: Guangzhou Evergrande Taobao FC fue el
  único club chino que cotizó con disclosure completo (New Third Board / NEEQ, ticker 834338,
  2015-2021) — 5 ejercicios anuales + 1 semestral reales descargados, con cifras de la crisis. Ya no
  juega en la CSL actual (descendió tras el colapso del grupo). Ver la duda para Guido en
  `Admin/dudas-por-club.md` sobre si cargarlo igual como caso histórico.
- **Gotcha de tooling**: `neeq.com.cn` tiene un WAF que bloquea `curl` incluso con cookies de sesión
  real replicadas. La vuelta que funcionó: `fetch()` dentro de `javascript_tool` — cuando el
  resultado excede el límite de tokens del chat, el contenido completo igual se guarda en un archivo
  `tool-results/*.txt` (JSON `[{type,text}]`) legible con Bash, de donde se decodifica el base64
  directo al PDF.

## 16. Corea del Sur — DART funciona como un EDGAR/SEC coreano, para los clubes de chaebol

Quinto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). Mismo patrón que
México/Ollamani (sección 7) y EEUU/SEC (sección 10): varios clubes de la K League 1 son filiales
directas de conglomerados surcoreanos (chaebols) que cotizan, y el regulador de mercado —
**DART** (`dart.fss.or.kr`, Financial Supervisory Service) — es gratis, sin login, con texto nativo
en los PDF (cero OCR necesario).

- **Buscar SIEMPRE por la razón social legal de la entidad operadora, nunca el nombre público del
  club** — mismo gotcha que Alemania (razón social vs. nombre de fantasía): "에프씨서울" (el nombre
  público de FC Seoul) no da resultados en DART, hay que buscar "지에스스포츠" (GS Sports, la
  entidad real). Confirmado con 4 clubes: FC Seoul (GS Sports/GS Group, 10 ejercicios FY2016-2025
  sin huecos), Jeju SK (SK Group, ex Jeju United, 10 ejercicios sin huecos), Jeonbuk Hyundai Motors
  (Hyundai Motor Company, solo 2 ejercicios disponibles) y Daejeon Hana Citizen (4 ejercicios,
  cortados en 2020 al reestructurarse con Hana Financial Group).
- **Ser filial de un chaebol que cotiza NO garantiza disclosure**: Ulsan HD (HD Hyundai) tiene
  entidad en DART pero CERO informes de auditoría depositados en 10 años, mientras que Jeonbuk
  Hyundai Motors (mismo tamaño de grupo) sí deposita — posible exención societaria sin confirmar
  (ver duda en `Admin/dudas-por-club.md`). Pohang Steelers (POSCO) directamente no tiene entidad
  identificable en el registro.
- **Los clubes "시민구단"/"도민구단" (ciudadanos/provinciales) son dead-end estructural**: son
  sociedades sin fines de lucro fundadas por el municipio/provincia, sin obligación de disclosure —
  confirmado para Daegu FC, Gwangju FC, FC Anyang, Gangwon FC, Suwon FC. Gimcheon Sangmu (el club
  del ejército) es la misma figura (사단법인 sin fines de lucro) — el ejército solo aporta
  jugadores, no es dueño societario.
- Con esto, 4 de 12 clubes de la K League 1 2025/26 quedaron con datos reales; el resto es dead-end
  estructural (mayoría) o semi-dead-end sin cerrar (Ulsan HD, Pohang Steelers).

## 17. Croacia — sin registro central gratis, pero el mandato de licenciamiento de la liga alcanza

Sexto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). A diferencia de Alemania/
Austria/Bélgica, el registro mercantil central croata (**RGFI-JAV**, operado por FINA,
`rgfi.fina.hr`) NO es gratis: exige cuenta (usuario+contraseña+reCAPTCHA) para ver o descargar
cualquier documento. El único dato abierto sin login es un CSV de balances *abreviados* de empresas
micro/pequeñas en `data.gov.hr` — ningún club HNL entra ahí (facturan demasiado). No crear cuenta
para esto (regla general del proyecto).

- **El canal real que SÍ funcionó fue sourcing directo club por club en el sitio propio de cada
  uno**, sostenido por el mandato de licenciamiento de la HNS (Hrvatski nogometni savez): los 10
  clubes publican los mismos formularios "F.01"/"F.02" con nombre idéntico, señal de que es un
  requisito de licencia deportiva, no una elección voluntaria de cada club — mismo patrón que
  FEDEFUT en Costa Rica (sección 7) pero con la diferencia clave de que ACÁ SÍ se publica (Costa
  Rica lo exige y lo blinda). Resultado: 9 de 10 clubes con PDFs reales, series de hasta 9
  ejercicios (Rijeka, 2017-2025 sin huecos).
- **La forma jurídica varía club por club y hay que confirmarla, no asumirla**: la mayoría convirtió
  su actividad profesional a una sociedad separada (s.d.d./š.d.d.), pero Dinamo Zagreb y Lokomotiva
  Zagreb siguen operando como "udruga" (asociación) sin sociedad — igual publican el balance de la
  udruga misma, así que no es un dead-end, solo una entidad distinta a buscar.
- **Lokomotiva es el único bloqueo real**: sus 2 ejercicios más recientes están alojados en Scribd
  (login/pago) en vez del sitio propio del club — decisión de Guido si vale la pena, ver
  `Admin/dudas-por-club.md`.
- **Wayback Machine estuvo caído durante toda la sesión** para varios huecos puntuales (Dinamo 2023,
  Slaven Belupo 2019-2023) — no es un dead-end confirmado, retomar en una sesión futura cuando el
  servicio esté disponible, antes de asumir que esos ejercicios no existen.

## 18. Dinamarca — el mejor canal del proyecto junto con Bélgica, y una idea reutilizable

Séptimo país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). La API pública de la
Erhvervsstyrelsen (danés: el registro mercantil estatal) resultó tan buena como la Centrale des
bilans belga (sección 14), y por el mismo motivo: es una API, no una interfaz web para humanos.

- **`distribution.virk.dk/offentliggoerelser` es un Elasticsearch público, gratis, sin login y sin
  bloqueo de Cloudflare** — se busca por `cvrNummer` y cada resultado trae la URL directa del
  documento en `regnskaber.virk.dk`, descargable con `curl --compressed` sin token especial.
  `cvrapi.dk` (gratis, con rate-limit) sirve para resolver el CVR a partir del nombre del club.
  **La interfaz web para humanos (`datacvr.virk.dk`) SÍ está bloqueada por Cloudflare** — la
  lección repetida (ya vista en Bélgica, sección 14): cuando un registro tiene una interfaz web
  bloqueada, buscar si expone una API/endpoint de datos por debajo antes de darlo por perdido.
- **Resultado: los 12 clubes de la Superliga 2025/26 cubiertos con series de 17 a 30 ejercicios
  cada uno** (307 documentos reales) — la profundidad histórica más pareja de cualquier país del
  proyecto (todos los clubes tienen series largas, no solo 1-2 destacados como pasó en otros
  países).
- **Gotchas menores**: algunos ejercicios recientes traen un PDF que es solo una carátula de 1
  página — usar el `.xhtml` que acompaña al mismo depósito en esos casos. Varias sociedades
  cambiaron de razón social sin cambiar de CVR (ej. AGF, ex-"Aarhus Elite A/S") — buscar siempre
  por CVR, no por nombre histórico. 4 clubes tuvieron transiciones de ejercicio fiscal (marcadas
  `-transicion` en el nombre de archivo, mismo criterio que Wolves/Forest en Inglaterra, sección
  9). FC København y OB tienen perímetro mezclado con otras actividades del grupo controlante
  (eventos, hoteles) — confirmar si el informe desglosa el segmento fútbol antes de cargar (dudas
  abiertas en `Admin/dudas-por-club.md`).

## 19. Francia — sin registro mercantil abierto, pero la DNCG publica bilanes individuales por club

Octavo país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). A diferencia de
Bélgica/Dinamarca, el registro mercantil francés NO es abierto de punta a punta:

- **`data.inpi.fr`** tiene la ficha de identidad de cada sociedad (SIREN, forma jurídica, capital,
  auditor) 100% pública y gratis, pero la lista de "Comptes annuels" depositados exige resolver un
  captcha (FriendlyCaptcha) y descargar cualquiera exige además crear cuenta — bloqueo distinto al
  de Austria/Marruecos (que es por PAGO): acá es captcha+cuenta, ninguna de las dos cosas resoluble
  por un agente. Confirmado con OGC Nice: 28 comptes annuels depositados, inaccesibles.
- **El hallazgo real es la DNCG** (Direction Nationale du Contrôle de Gestion, el organismo que
  audita a los clubes para la licencia), que publica cada temporada un PDF único en
  `sta.lfp.fr/reports-dncg` con el **bilan + cuenta de resultados INDIVIDUAL de cada club de Ligue 1
  Y Ligue 2** (perímetro societario incluido, ej. "SASP + asociación + desarrollo + medios" para
  Marsella) — gratis, sin login, sin bloqueo. Mejor que los agregados de DFL alemán/ÖFBL austríaco/
  Deloitte belga porque trae el balance completo por club, no solo KPIs. Se bajaron 21 temporadas
  (2002/03-2022/23 + 2024/25 vía mirror de prensa; falta 2023/24, no localizada todavía).
- **Un tercer caso confirmado de "holding cotizante desglosa el club"** (después de Manchester
  United/Companies House en UK y Club América/Ollamani en México, sección 7): Olympique Lyonnais
  tiene su holding, Eagle Football Group SA (ex "OL Groupe"), cotizando en Euronext Paris — su
  Document d'Enregistrement Universel (IFRS completo) es descargable directo. Ojo: consolida el
  fútbol de Lyon con otros clubes del mismo grupo (Botafogo, RWD Molenbeek, Crystal Palace hasta
  2025) — confirmar si desglosa el segmento antes de cargar (duda abierta en `Admin/dudas-por-club.md`).
- **`recherche-entreprises.api.gouv.fr`**: API pública del gobierno francés, gratis y sin login,
  mejor que el buscador roto de INPI para resolver el SIREN de cualquier entidad — útil como primer
  paso en cualquier sourcing francés futuro (no solo fútbol).
- **AS Monaco es la única entidad de Ligue 1 de derecho NO francés** ("SA à loi monégasque" según
  la propia DNCG) — igual aparece en el agregado DNCG, pero su relación exacta con la SIREN francesa
  parecida (515109692) no está confirmada (duda abierta).
- Con esto, los 18 clubes de Ligue 1 2025/26 quedaron cubiertos, la mayoría solo vía el agregado
  DNCG (no un balance propio descargado aparte) — suficiente para cargar, pero sin la profundidad
  individual de Bélgica/Dinamarca.

## 20. Grecia — el primer país con el 100% de la liga top cubierta con un solo canal

Noveno país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). El **ΓΕΜΗ** (Γενικό
Εμπορικό Μητρώο, el registro mercantil general griego, `publicity.businessportal.gr`) funcionó al
mismo nivel que Bélgica/Dinamarca: gratis, sin login, sin captcha, con descarga directa por API
(`/api/download/financial/<id>?companyId=<ΓΕΜΗ>`) — ni siquiera hace falta un click de navegador
real, a diferencia de Alemania/UK. Resultado: **los 14 clubes de la Super League Greece 2025/26
quedaron cubiertos con documentos reales, sin ningún dead-end** — la primera vez en el proyecto que
una liga top entera se cubre al 100% con un solo canal.

- **Buscar por razón social o "ΠΑΕ + nombre" no siempre alcanza**: varios clubes (Panathinaikos,
  Panetolikos, PAOK, Volos, Kifisia) necesitaron variantes de búsqueda para encontrar la ΠΑΕ
  (Ποδοσφαιρική Ανώνυμη Εταιρεία, la figura legal específica de club de fútbol profesional).
- **Rate-limit real**: el endpoint devuelve 429 después de ~10 descargas seguidas sin pausa —
  espaciar con `sleep 1.3-1.5s` entre requests, mismo criterio que cualquier API pública sin API key.
- **Varios clubes tienen múltiples entidades ΠΑΕ históricas** (activa + en liquidación) por
  quiebras/refundaciones societarias — elegir siempre la marcada "Ενεργή" (activa) en el registro,
  mismo patrón que Leeds United en Inglaterra (sección 9) o Panserraikos acá mismo (refundado en
  2020 tras liquidar la ΠΑΕ anterior).
- **Huecos genuinos sin explicación encontrada, no son bloqueos de portal**: Aris (FY2019/20),
  Atromitos (FY2017/18), Panetolikos (FY2018/19 y FY2020/21, el único con dos), PAOK (FY2017/18) —
  no se encontró ningún depósito para esos ejercicios puntuales pese a continuidad en el resto de
  la serie.

## 21. Italia — no es un registro mercantil, es la obligación de licencia UEFA

Décimo país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). El Registro delle
Imprese italiano es **pago** para terceros (tarjeta de crédito, tarifas del decreto MISE 2007) —
mismo patrón que Austria/Croacia, no el de Bélgica/Dinamarca/Grecia. Pero acá el registro mercantil
no hizo falta: el motor real es la obligación de disclosure del **Manuale delle Licenze UEFA**, que
lleva a la mayoría de los clubes a publicar voluntariamente su bilancio en la sección
"trasparenza"/"licenze-uefa" de su propio sitio, cotización aparte.

- **Hallazgo transversal, aplicable a cualquier país nuevo con clubes que jueguen competiciones
  UEFA**: antes de asumir que hace falta un registro mercantil o una bolsa, chequear si el club
  publica directo por obligación de licencia — es más simple y más común de lo esperado.
- **Juventus, cotizante desde 2001, dio la serie más profunda de todo el proyecto**: 23 ejercicios
  sin huecos (2002/03-2024/25), superando a Club Brugge/Standard Liège (Bélgica, sección 14) y
  Companies House (Reino Unido, sección 9). Lazio también cotiza desde 1998 pero solo se bajó 1
  ejercicio — el histórico completo queda como pista pendiente para profundizar.
- **Report Calcio (FIGC/PwC/AREL)**: existe pero es un agregado SECTORIAL (como el Deloitte belga o
  la DFL alemana) — sirve de cifra de contexto, no da bilanci por club individual.
- **Resultado: 16 de 20 clubes de Serie A 2025/26 con al menos un ejercicio real, 100% PDF con capa
  de texto nativa** (cero escaneos en todo el país, el mejor resultado de formato del proyecto). Los
  4 sin nada (Torino, Pisa, Lecce, Cagliari) no tienen un bloqueo estructural confirmado — Cagliari
  incluso tiene la sección pero con el link a Google Drive roto (accionable: pedirle al club que lo
  arregle).
- **Gotcha de tooling nuevo**: un snapshot de Wayback Machine puede devolver HTTP 200 pero venir
  TRUNCADO (header `warning: 299 wayback content truncated by "length"`, típico de capturas vía
  Common Crawl) — verificar con `pdfinfo`/chequear el `%%EOF` del archivo, no confiar en el 200 solo.
- **Varios clubes tienen links propios rotos por migración de CDN sin actualizar** (Inter, Napoli,
  Udinese) — vale la pena probar Wayback Machine antes de descartar, no asumir dead-end por un 404
  directo.

## 22. Noruega — el mejor canal del proyecto hasta ahora, con un gotcha real de URL no documentada

Undécimo país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). El
**Regnskapsregisteret** del Brønnøysundregistrene (el registro central noruego) es, hasta ahora, el
mejor resultado del proyecto:

- **`data.brreg.no/regnskapsregisteret/regnskap/aarsregnskap/kopi/<organisasjonsnummer>/<año>`
  descarga por `curl` directo, sin login, sin captcha, sin pago**, con series de hasta 18 ejercicios
  consecutivos (2008-2025) — más profundo que Bélgica/Dinamarca/Grecia en la mayoría de los clubes.
- **Gotcha importante: esta URL NO está documentada públicamente.** La API JSON "abierta" de cifras
  clave (`driftsinntekter`, etc.) SÍ está limitada al último ejercicio, como advierte la
  documentación oficial — pero esa limitación NO se extiende a la descarga del PDF completo por la
  URL de "kopi". Se encontró interceptando el `fetch()` real que dispara la interfaz humana
  (`virksomhet.brreg.no`) con un parche de `window.fetch` inyectado por JS — si un registro similar
  en otro país nórdico/europeo parece limitado por su documentación oficial, vale la pena repetir
  este truco antes de darlo por bloqueado.
- **Formato: 100% escaneos sin capa de texto** (igual que Companies House UK) — van a necesitar el
  flujo de OCR ya conocido del proyecto antes de mapear cualquier cifra.
- **El mismo gotcha de "dos entidades por club" que Alemania/Bélgica, pero más extendido**: la
  mitad de los clubes de la Eliteserien deposita bajo su "idrettslag" (asociación deportiva
  tradicional, FLI) y la otra mitad bajo una AS (aksjeselskap) dedicada al fútbol profesional — y
  no hay un patrón fijo de cuál es la real, hay que comparar el campo `driftsinntekter` (ingresos
  operativos) de cada candidato en la API de cifras clave antes de elegir, mismo criterio que se
  usó para OH Leuven en Bélgica (sección 14) y Mönchengladbach en Alemania (sección 12). Varios
  clubes (Vålerenga con 3 entidades activas) quedaron con el perímetro sin resolver del todo.
- Con esto, los 16 clubes de la Eliteserien 2025/26 tienen al menos algo de disclosure, aunque 2
  (KFUM, Lillestrøm) muestran huecos recientes sin explicar y 1 (Bodø/Glimt) tiene un hueco extraño
  justo en sus años de título — ver `Admin/dudas-por-club.md`.

## 23. Países Bajos — KvK de pago, pero el mandato de licencia F.04 de la KNVB alcanza igual

Duodécimo país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). La Kamer van
Koophandel (KvK, el registro mercantil neerlandés) confirma el patrón de pago por documento
(€3,90/documento, tarifa 2026) — mismo grupo que Austria/Croacia/Italia, no el de Bélgica/Dinamarca/
Grecia/Noruega.

- **El canal real fue el mandato de licencia F.04 de la KNVB** (la federación neerlandesa): obliga
  a cada club a publicar su jaarverslag en su propio sitio, y la KNVB mantiene un PDF-índice por
  temporada (2018/19-2024/25) con el link de cada club — mismo patrón que Croacia (mandato de la
  HNS, sección 17) e Italia (licencia UEFA, sección 21). Con esto, ningún club de la Eredivisie
  2025/26 quedó en dead-end total, aunque varios tienen huecos de 1-3 años.
- **FC Groningen dio la serie más profunda (16 ejercicios, 2009/10-2024/25 sin huecos)**, seguido
  de NEC (12) — ninguno de los dos es el club más grande de la liga, otra confirmación de que la
  profundidad depende del canal encontrado, no del tamaño del club.
- **Varios sitios de club son SPA y no sirven nada a `curl` plano** (AZ, PSV, FC Twente, sc
  Heerenveen, NEC, Feyenoord) — hubo que usar el Browser pane con `javascript_tool` para
  renderizarlos primero.
- **Algunos clubes sirven el PDF real desde una URL sin extensión `.pdf`** (PSV, NEC) — no descartar
  un link solo porque no termina en `.pdf`, verificar el `Content-Type` de la respuesta.
- **Un club puede migrar de storage sin actualizar los links ya indexados** (Go Ahead Eagles pasó a
  un bucket de Google Cloud) — la URL vieja rompe, pero insertando el segmento de path correcto
  (`/sites/1/` en este caso) el documento sigue estando ahí. Antes de descartar un 404, probar
  variaciones simples del path.
- **No todos los clubes son BV/NV**: Heracles Almelo y FC Volendam son "Stichting" (fundación sin
  fines de lucro) — confirmar si el criterio de `club-data-mapping` aplica igual antes de mapear
  (duda abierta en `Admin/dudas-por-club.md`).

## 24. Portugal — la mejor cobertura de liga completa hasta ahora, y una tercera red de rescate nueva

Decimotercer país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). 17 de 18 clubes
de la Primeira Liga 2025/26 quedaron con datos reales — la mejor cobertura de liga completa del
proyecto hasta ahora.

- **Sporting CP dio 26 ejercicios ININTERRUMPIDOS (1999-2024/25)** — Club Brugge (Bélgica, sección
  14) tiene 35 ejercicios nominales pero con "correction" y algún hueco de por medio; Sporting es
  la serie más larga SIN NINGÚN hueco de todo el proyecto, superando a Juventus (23, Italia sección
  21). Junto con Benfica (21 ejercicios), ambos cotizantes en Euronext Lisbon dieron el mismo
  patrón que Juventus/Ajax/Man Utd: holding cotizante = disclosure largo y prolijo. Porto tiene SAD
  pero solo bonos cotizando (no acciones) — igual publica 10 ejercicios completos.
- **El resto de la liga se cubrió casi 100% vía publicación voluntaria sostenida por el mandato de
  licencia de Liga Portugal/FPF** — mismo patrón que Croacia (sección 17), Italia (sección 21) y
  Países Bajos (sección 23). Nunca hizo falta pelear con el registro societario portugués
  (`publicacoes.mj.pt`), que quedó sin confirmar del todo si es pago para consulta de terceros (la
  REGISTRACIÓN sí es paga, eso es distinto).
- **Gotcha nuevo, tercera red de rescate reutilizable**: cuando un sitio se rediseña y Wayback
  Machine trunca el archivo a 5 MB (ya visto con Udinese en Italia, sección 21), **el archivo web
  NACIONAL del propio país** (acá, `arquivo.pt`) puede tener una copia completa que Wayback no
  tiene. Funcionó para rescatar el único ejercicio de Tondela. Antes de dar un club por perdido en
  cualquier país con archivo web nacional propio (varios países europeos lo tienen), probar esa
  tercera red antes de Wayback.
- **Arouca es un caso raro**: se confirmó por metadata de Wayback que 4 ejercicios existieron, pero
  ninguna copia completa sobrevive en ningún archivo consultado — a diferencia de un dead-end por
  falta de disclosure, acá el club SÍ publicó pero la evidencia se perdió. Vale la pena pedirle al
  club que resuba (ver `Admin/dudas-por-club.md`).

## 25. República Checa — otro registro gratis de primer nivel, y dos formatos nuevos para el `.gitignore`

Decimocuarto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). `or.justice.cz`
(la Sbírka listin, parte del registro público checo) funcionó para los 16 de 16 clubes de la Chance
Liga 2025/26 — gratis, sin login, sin captcha, PDFs con texto nativo (cero OCR). Se suma al grupo de
mejores canales del proyecto junto con Bélgica/Dinamarca/Grecia/Noruega.

- **100% scripteable por `curl` puro, sin browser**: con un cookie-jar temporal por documento
  alcanza — no hizo falta ni un solo click de navegador real. Sesión con más ejercicios
  descargados por club de todo el país hasta ahora: Karviná con 34 documentos.
- **Casi todos los clubes son a.s. (akciová společnost), salvo Pardubice**, que sigue siendo z.s.
  (spolek, asociación sin fines de lucro) y aun así deposita cuentas — no asumir que la forma
  jurídica "asociación" bloquea el disclosure sin confirmar primero en el registro.
- **Dos formatos nuevos que el `.gitignore` no contemplaba, agregados esta sesión**: algunos
  depósitos vienen como `.docx` (Viktoria Plzeň) o como XML/iXBRL puro (Jablonec) en vez de PDF —
  mismo criterio que TIFF/XHTML de Dinamarca (sección 18): documento fuente crudo queda local,
  aunque sea chico (13-49 KB en este caso, el criterio no depende del tamaño). Antes de commitear
  cualquier sourcing nuevo, chequear `git status` por extensiones no vistas antes.
- **Gotcha de tooling, no del portal**: usar `fetch()+Blob+<a download>` en el Browser pane para
  automatizar varias descargas seguidas puede disparar diálogos nativos de "guardar archivo"
  apilados si el navegador real de la sesión tiene activado "preguntar dónde guardar cada archivo"
  — interrumpe al usuario en su propia máquina. Con un registro que soporta `curl` puro (como este),
  preferir siempre esa vía para descargas en serie, no el browser.
- **Huecos sospechosos de ser un problema del filtro de búsqueda, no dead-ends reales**: Slovan
  Liberec (17 años sin depósito) y Slovácko (serie muy discontinua) — ver dudas abiertas en
  `Admin/dudas-por-club.md` antes de asumir que esos años no existen.

## 26. Rusia — accesible pese al contexto geopolítico, vía un dominio redirigido

Decimoquinto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17/18). Contrario a lo
esperado por el aislamiento de varios servicios rusos desde 2022, el registro financiero SÍ resultó
accesible desde este entorno:

- **`bo.nalog.ru` redirige (HTTP 302) a un dominio nuevo, `bo.nalog.gov.ru`, que carga perfecto**:
  HTTP 200, sin captcha, sin login, con una API JSON pública 100% scripteable por `curl` — mismo
  nivel que Bélgica/Dinamarca/Grecia/Noruega/República Checa. El registro EGRUL propiamente dicho
  (`egrul.nalog.ru`/`egrul.nalog.gov.ru`) SÍ dio timeout de conexión — pero no hizo falta, porque
  `bo.nalog.gov.ru` ya expone ИНН/ОГРН/razón social en su propio buscador.
  - Buscar: `bo.nalog.gov.ru/advanced-search/organizations/search?query=<INN o nombre>`.
  - Listar TODOS los ejercicios: `bo.nalog.gov.ru/nbo/organizations/<id>/bfo/` (2021 es el techo
    real de profundidad histórica del propio depósito estatal ГИРБО, no un límite de búsqueda).
  - Descargar: `bo.nalog.gov.ru/download/audit/<reportId>` (dictamen de auditor) y
    `.../download/clarification/<reportId>` (notas al balance).
- **Gotcha de tooling real que costó una hora**: la conexión es lenta e inestable — varios `curl`
  de archivos grandes cortaron a los 25s con `Operation timed out` pero igual habían recibido HTTP
  200 en los headers antes del corte, marcando falsamente 16 PDFs como "OK" en la primera pasada.
  **No confiar en el código HTTP solo** cuando la conexión a un dominio es inestable: validar cada
  PDF con `pdfinfo | grep -a "^Pages:"` después de descargarlo, y reintentar con `curl -C -`
  (resume) hasta 5 veces con timeout largo (200s) si hace falta.
- **Homónimos con el mismo ИНН reasignado a otro proyecto**: Dynamo Makhachkala tenía 2 entidades
  candidatas además de la correcta — una histórica en liquidación sin ningún depósito, y otra
  renombrada a un club de otra ciudad con escala irrisoria. Se resolvió cruzando el sitio oficial
  del club con la escala de ingresos del registro, mismo criterio que Bélgica (comparar turnover,
  sección 14) y Noruega (comparar driftsinntekter, sección 22).
- Con esto, 15 de 16 clubes de la Premier League rusa 2025/26 quedaron con documentos reales
  (dictamen de auditor y/o notas al balance). Un club (Akhmat Grozny) está legalmente obligado a
  depositar el dictamen pero nunca lo hizo en 5 años — ver duda en `Admin/dudas-por-club.md`.

## 27. Suiza — Zefix es dead-end de país, pero la mitad de la liga publica voluntariamente

Decimosexto país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-17). **Zefix** (el
índice central de sociedades suizas) es un dead-end estructural CONFIRMADO, no por falta de
búsqueda: solo da identidad básica gratis, y el Código de Obligaciones suizo no exige depósito
público de cuentas anuales salvo para sociedades cotizantes o de "interés público" (ningún club de
la Super League cotiza). La API pública de Zefix devuelve 401 sin credenciales pedidas por email —
no vale la pena insistir sin ese paso previo.

- **6 de 12 clubes publican voluntariamente en su propio sitio** (Basel, St. Gallen, Luzern, Thun,
  Young Boys) — mismo patrón de "publicación voluntaria" ya visto en Ecuador (Deportivo Cuenca,
  sección 5) pero mucho más consistente y con series largas: FC Thun dio 13 documentos
  (2011/12-2024, un solo hueco). FC Basel publicó una serie completa 2005-2021 pero dejó de hacerlo
  después (dead-end propio reciente, sin explicación encontrada).
- **Plataforma común reutilizable: "aico.swiss"**. Varios sitios de club (Basel, St. Gallen, y
  probablemente otros) corren sobre la misma plataforma de agencia web, que aloja los PDF en
  `storage.aico.swiss/<ID_cliente>/files/<nombre>.pdf`. El listado de años en la página
  "Geschäftsberichte" se arma con JavaScript — no aparece con un `curl` plano, hace falta renderizar
  con el Browser pane y extraer los `href` con
  `document.querySelectorAll('a[href*=".pdf"]')`. Si aparece un club suizo nuevo con esta misma
  plantilla de sitio, este selector es el atajo directo a la lista completa sin navegar página por
  página.
- **La SFL (Swiss Football League) publica un agregado ("SFL Finanzzahlen") de los clubes con
  licencia UEFA cada año** (5 ejercicios, 2021-2025) — mismo patrón que DFL/ÖFBL/Deloitte
  (secciones 12-14). Cubre parcialmente a los 6 clubes sin disclosure propio (Zürich, Sion,
  Servette, Lausanne-Sport, Lugano, Grasshopper), aunque Winterthur solo aparece 1 de los 5 años
  (no pidió licencia europea el resto de las temporadas).
- Con esto, ningún club de la Super League 2025/26 quedó totalmente sin datos, aunque la mitad
  depende solo del agregado de liga (menos profundo que un balance propio).

## 28. Turquía — los 4 grandes cotizan DIRECTO como club-asociación, caso único en el proyecto

Decimoséptimo país de la lista de "30 mejores ligas del mundo" (sesión 2026-09-18, sesión
INCOMPLETA por el Browser pane caído — ver gotcha abajo, retomar cuando esté disponible).
Galatasaray, Fenerbahçe, Beşiktaş y Trabzonspor son un caso que no había aparecido en ningún otro
país: el club-asociación (dernek) mismo cotiza directo en Borsa İstanbul, sin necesidad de una
holding/sociedad anónima separada como Juventus/Ajax/Man Utd/Eagle Football Group. Esto los sujeta
directo a la obligación de disclosure de **KAP** (Kamuyu Aydınlatma Platformu, `kap.org.tr`) — el
equivalente turco a EDGAR/HKEXnews, gratis, con series largas y auditadas.

- **Galatasaray: serie completa 2012/13-2024/25 (13 ejercicios)** — el mejor resultado del país.
- **KAP tiene un gotcha de tooling real**: la URL de resumen de un emisor es fetchable por
  `curl`/WebFetch (SSR), pero el LISTADO de disclosures individuales de cada ejercicio se arma con
  botones React sin `href` real — no hay forma de sacar el link de descarga sin un browser real
  renderizando JS. Además, el filtro de fecha por defecto muestra solo 1 año y no se puede ampliar
  por parámetros de URL. Sin browser disponible, KAP queda bloqueado a pesar de ser gratis.
- **Los clubes chicos son dernek sin obligación de mercado de capitales** — algunos publican "Mali
  Tablolar" (estados financieros) en su propio sitio por mandato de licencia TFF/UEFA, mismo patrón
  que Croacia/Italia/Países Bajos/Portugal, pero mucho menos consistente: de los 13 clubes chicos
  investigados, solo 6 dieron algo, y ninguno con más de 4 ejercicios.
- **Gotcha nuevo, apareció 2 veces**: un servidor puede responder 200 con `Content-Type` de PDF pero
  el archivo real es "Java serialization data" corrupto (no un PDF válido) — verificar siempre con
  `pdfinfo`/abrir el archivo antes de dar una descarga por buena, no confiar en el código HTTP ni el
  Content-Type declarado.
- **El Browser pane puede caerse por sesiones enteras** (timeouts de 300s en cada `preview_start`/
  `navigate`, confirmado con reintentos espaciados) — cuando esto pasa, documentarlo explícitamente
  como bloqueo de TOOLING (no del portal) y seguir con lo que sí se pueda hacer por `curl`/WebFetch,
  dejando anotado qué quedó pendiente de retomar con browser. **Confirmado transitorio**: un
  seguimiento la sesión siguiente encontró el Browser pane funcionando normal desde el primer
  intento — no asumir que un corte así es permanente, solo reintentar en una sesión nueva.
- **Causa raíz real del "Java serialization data" en vez de PDF (KAP)**: no es anti-bot, es el
  formato real que devuelve el endpoint cuando se lo pide sin las cookies de sesión de un browser.
  La vuelta que funcionó: `fetch()` DENTRO del Browser pane (no `curl` externo) + recortar
  manualmente el buffer desde el magic byte `%PDF`.
- **El formato de disclosure de KAP cambió con el tiempo**: los ejercicios viejos (~2015-2016)
  vienen partidos en 5 "bildirim" (notificaciones) separadas que en realidad apuntan al mismo PDF
  (confirmado comparando SHA-256, todas idénticas) — no tratar cada bildirim como un documento
  distinto. Los ejercicios más nuevos son un solo bildirim.
- **El buscador "Detailed Search" de KAP limita el rango de fechas a exactamente 1 año** — para
  armar una serie larga hay que iterar año por año, no se puede pedir un rango de varios años de
  una sola búsqueda.
- **Un link roto en el sitio del club puede confirmarse como dead-end real, no como bloqueo de JS**:
  para Antalyaspor, interceptar el evento click e inspeccionar el DOM completo confirmó que los
  `href="#"` eran placeholders genuinamente rotos (sin `data-href`/`onclick` oculto) — Wayback
  Machine tampoco tenía los PDFs (solo cacheó la página que los linkeaba, nunca los archivos en sí,
  que se rompieron entre oct-2023 y abr-2024). Vale la pena este nivel de verificación antes de
  escribir "bloqueado por JS" — puede ser un dead-end real disfrazado de problema de tooling.

## 29. Ucrania — no es un registro mercantil, es la ley de contabilidad la que obliga a publicar

Decimoctavo y último país nuevo de la lista de "30 mejores ligas del mundo" (sesión 2026-09-18,
durante la guerra iniciada en 2022 — sourcing puro de datos financieros públicos, sin ninguna
interacción con los clubes). El registro estatal ucraniano (`usr.minjust.gov.ua`) es solo de
identidad, no sirve balances. **SMIDA** (НКЦПФР, el regulador de valores) sí es un canal real, pero
solo aplica a los 2 clubes que son sociedades anónimas (Veres ПАТ, Shakhtar ПрАТ) — el resto son
ТОВ (LLC), estructuralmente fuera de SMIDA.

- **El canal que de verdad abrió el país fue el art. 14 de la Ley ucraniana de Contabilidad**: toda
  empresa "mediana"/"grande" (sea cual sea su forma jurídica) debe publicar su estado financiero
  auditado en SU PROPIO SITIO WEB — no un mandato de licencia deportiva como Croacia/Italia/Países
  Bajos/Portugal, sino una obligación de derecho contable general que resulta aplicar igual a
  clubes de fútbol. Con esto, 11 de 16 clubes de la UPL 2025/26 quedaron con datos reales.
  - **Polissya dio la serie más larga (9 ejercicios, 2016-2024)** — via Google Drive/SharePoint, no
    el sitio del club directo.
- **3 dead-ends de disclosure sin explicación técnica** (Dynamo Kyiv, Zorya, Kryvbas): a diferencia
  de la mayoría de la liga, que sí publica por el art. 14, estos 3 no tienen ninguna sección
  financiera ni señal de bloqueo — candidatos directos para reach-out (ver `Admin/dudas-por-club.md`).
- **Un bloqueo de tooling real, no de disclosure**: Oleksandriya (`fco.com.ua`) da 403 incluso con
  browser real, pero Google confirma que el documento existe (indexado) — distinto de un dead-end
  genuino, vale la pena reintentar con otro método (mirror, caché de Google, Wayback) en una sesión
  futura.
- **Formato nuevo que obligó a tocar el `.gitignore`**: SK Poltava publica su balance como
  fotos/escaneos JPG en vez de PDF — mismo criterio que TIFF/XHTML/DOCX/XML de otros países,
  documento fuente crudo queda local sin importar el formato exacto.
- **Gotcha de identidad societaria, mismo patrón que Bélgica/Rusia**: Obolon comparte sitio y
  patrocinio con la cervecera homónima ПрАТ "ОБОЛОНЬ" — no confirmado si el PDF encontrado es del
  club de fútbol o de la empresa, verificar antes de cargar (duda abierta).

Con este país se completa el barrido de las 30 mejores ligas del mundo por consenso general (18
países nuevos sourceados en orden alfabético, Arabia Saudita salteada a pedido de Guido por
sospecha de dead-end estructural sin confirmar).

## Cómo mantener este skill

Actualizar esta sección la primera vez que un país nuevo produzca un hallazgo real de metodología
(un regulador que aplica a todos los clubes de ese país, un gotcha de navegación que costó
descubrir) — no hace falta una entrada por cada club individual, eso vive en `fuentes/<País>/
<Club>.md`. Si un ángulo ya documentado acá como "bloqueado" se destraba en el futuro (ej. Uruguay
consigue un pedido de acceso a información pública), actualizar esa sección en vez de dejarla
desactualizada diciendo que sigue bloqueado.
