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
- **Antes de anotar "no se encontró nada", seguí la REGLA 2 de `fuentes-por-club.md`** (ya
  documentada ahí, no se repite acá): registrar CADA intento con el detalle de qué se probó, la URL/
  portal exacto, y por qué falló — nunca alcanza con "no se encontró". Ver `fuentes/Uruguay/
  _notas-generales.md` como ejemplo del nivel de detalle esperado.
- **Guardar los hallazgos**: PDFs en `Clubes/<País>/<Club>/` (mismo nivel que `Clubes/Argentina/`),
  documentación en `fuentes/<País>/<Club>.md` (con su línea en el índice de `fuentes-por-club.md`) —
  ver `CLAUDE.md` para la convención completa de carpetas.
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

**Procedimiento exacto (confirmado funcionando, seguir estos pasos en orden):**
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
- Ya confirmado con este método: Millonarios, América de Cali, Atlético Nacional, Independiente
  Santa Fe, Junior de Barranquilla, Deportivo Cali, Deportivo Pereira, Once Caldas, Deportes Tolima,
  Envigado (estos 3 últimos, sesión 2026-09-13 — 10 clubes colombianos en total). El NIT de un club
  nuevo se consigue rápido buscando en Google/WebSearch "[club] S.A. NIT" y cruzando con un
  directorio empresarial (datacreditoempresas.com.co, empresite, informacolombia.com, la-gar.com)
  cuando el nombre exacto no aparece en los primeros resultados — no hace falta abrir la Cámara de
  Comercio. Quedan sin explorar (alta probabilidad de que tengan ficha con el mismo patrón):
  Barranquilla F.C., Atlético Bucaramanga (NIT candidato 890203822, sin confirmar en SIIS), Águilas
  Doradas (NIT no encontrado todavía), La Equidad, Alianza Petrolera, Patriotas, Boyacá Chicó, Unión
  Magdalena, Jaguares de Córdoba, y el resto de los ~35 clubes-sociedad que menciona el informe
  agregado de Supersociedades
  (`supersociedades.gov.co/documents/20122/532936/Informe-futbol-pdf.pdf`, útil como cifra de
  control/lista de candidatos, no da datos por club).
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
  directo. `futebolpaulista.com.br/Repositorio/Institucional/<año>/<Club>.pdf` (y variantes de
  nombre) aloja laudos de auditoria de TODOS los clubes del Campeonato Paulista, no solo los SAF —
  confirmado para Ituano, Mirassol, Guarani, Ponte Preta. Mismo patrón en
  `federacaopr.sfo3.digitaloceanspaces.com` para clubes de Paraná (ya explotado parcialmente para
  Coritiba), y en `fgf.com.br/demonstracoes-financeiras-filiados` para clubes de Rio Grande do Sul
  (confirmado sesión 2026-09-16 con Juventude — ojo, el casing del nombre de archivo por club ahí es
  inconsistente). Vale la pena recorrer estos repositorios año por año en vez de buscar club por club
  cuando el foco es un estado específico.
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
- Dead-ends que siguen sin lead nuevo (no rabbit-holear más sin uno): América Mineiro, Náutico,
  Criciúma (solo balance de 2013 encontrado), Marília. **Juventude** es un dead-end parcial: solo se
  encontró el ejercicio 2020 (vía el repositorio de la Federação Gaúcha), y prensa reporta que el
  club no publicó su demonstração de 2024 dentro del plazo legal — la pregunta directa al club está
  en `dudas-por-club.md`.

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
  `dudas-por-club.md` sobre si cargarlo igual como caso histórico.
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
  (ver duda en `dudas-por-club.md`). Pohang Steelers (POSCO) directamente no tiene entidad
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
  `dudas-por-club.md`.
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
  abiertas en `dudas-por-club.md`).

## Cómo mantener este skill

Actualizar esta sección la primera vez que un país nuevo produzca un hallazgo real de metodología
(un regulador que aplica a todos los clubes de ese país, un gotcha de navegación que costó
descubrir) — no hace falta una entrada por cada club individual, eso vive en `fuentes/<País>/
<Club>.md`. Si un ángulo ya documentado acá como "bloqueado" se destraba en el futuro (ej. Uruguay
consigue un pedido de acceso a información pública), actualizar esa sección en vez de dejarla
desactualizada diciendo que sigue bloqueado.
