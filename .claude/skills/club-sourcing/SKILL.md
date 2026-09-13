---
name: club-sourcing
description: Metodología para BUSCAR estados financieros/balances auditados de clubes de fútbol que todavía no tienen nada cargado en finance-of-sports — qué regulador o canal público chequear según el país, gotchas concretos de cada portal (URLs que no sirven, formularios que hay que usar de una forma específica, categorías legales que determinan si un club puede o no tener balance público), y qué hacer cuando no se encuentra nada. Usar ANTES de salir a buscar PDFs de un club/país nuevo, para no repetir intentos que una sesión anterior ya probó y descartó. Es sourcing (encontrar y guardar el PDF), no mapeo de datos — para categorizar lo que ya se encontró, ver `club-data-mapping`.
---

# Cómo buscar estados financieros de clubes de fútbol, país por país

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
  confirmado para Ituano, Mirassol, y aparecen ahí también São Paulo FC, Corinthians, Guarani, Ponte
  Preta, Botafogo-SP. Mismo patrón en `federacaopr.sfo3.digitaloceanspaces.com` para clubes de Paraná
  (ya explotado parcialmente para Coritiba). Vale la pena recorrer estos repositorios año por año en
  vez de buscar club por club cuando el foco es un estado específico.
- **Cloudflare bloquea varios dominios oficiales** (ej. Vasco da Gama, Sport Recife) — antes de
  descartar, buscar el mismo PDF mirrorado en otro dominio (ej. un portal de noticias o un sitio de
  socios que republicó el mismo documento) en vez de pelear con el bloqueo directo.
- Dead-ends confirmados de esta sesión (sin lead nuevo, no rabbit-holear más sin uno): América
  Mineiro, Náutico, Sport Recife (DNS roto en el subdominio de transparencia), Vitória (URL de
  transparencia devolvió 404), Criciúma (solo balance de 2013 encontrado), Ceará, Fortaleza
  (navegación por menú JS, no hay links planos de PDF en el HTML), Juventude, Marília.

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
- **MLS (Estados Unidos/Canadá) — dead-end estructural confirmado, no reintentar**: la liga opera
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

## Cómo mantener este skill

Actualizar esta sección la primera vez que un país nuevo produzca un hallazgo real de metodología
(un regulador que aplica a todos los clubes de ese país, un gotcha de navegación que costó
descubrir) — no hace falta una entrada por cada club individual, eso vive en `fuentes/<País>/
<Club>.md`. Si un ángulo ya documentado acá como "bloqueado" se destraba en el futuro (ej. Uruguay
consigue un pedido de acceso a información pública), actualizar esa sección en vez de dejarla
desactualizada diciendo que sigue bloqueado.
