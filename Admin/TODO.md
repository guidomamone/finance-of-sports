<!-- md: qué falta hacer, un punto por título y por prioridad | leer: con node tools/todo.mjs; nunca entero -->
# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.** No la dupliques en `Admin/CHANGELOG.md` ni en
`Admin/finance-of-sports-project.md` (historia) ni en el comentario de ningún archivo de código.

## Cómo leerla y cómo editarla

- **Un punto es un título `### <orden>. <id> · <qué>` y su cuerpo debajo.** El **orden** es la prioridad (1 es lo próximo; se trabaja de
  arriba hacia abajo). El **id** es el identificador estable con el que otros archivos citan el punto (CHANGELOG, HALLAZGOS, el código): no cambia
  nunca, y un punto nuevo toma el id siguiente al más alto, nunca uno libre. Por eso el id tiene huecos: son los puntos resueltos o descartados.
- **Para no leerla entera:** `node tools/todo.mjs` imprime la lista (orden, id y título); `node tools/todo.mjs 355` imprime el cuerpo de ese punto;
  `node tools/todo.mjs --cerrar 355` borra el punto y renumera el orden de los de abajo. A mano, `grep -n '^### ' Admin/TODO.md` da lo mismo que
  el primero.
- **Un punto con varios pasos los lista como ítems: `- [x] hecho` y `- [ ] pendiente`.** `node tools/todo.mjs` muestra cuántos van (`[2 de 5 hechos]`), `node tools/todo.mjs <id>` abre con HECHO y PENDIENTE antes del cuerpo, y con todos hechos `audit.js` avisa `todo-todo-hecho` (hay que cerrarlo). Un punto sin ítems sigue como siempre.
- **Un punto resuelto se BORRA** (no se marca «RESUELTO»); su historia queda en `Admin/CHANGELOG.md` y, si ameritaba el porqué, en
  `Admin/finance-of-sports-project.md`. Si el punto sigue vivo en parte, se reescribe a lo que falta.
- **Un punto nuevo arranca con «Terminado cuando:»**: la lista cerrada de lo que entra (clubes, años, archivos, tools) y la prueba de que está
  hecho. Lo que aparece en el camino y no está en esa lista es un punto nuevo.
- **Cada punto termina con una o más líneas `Verificar: ...`** que una máquina comprueba: `audit <código> [«texto»] <op> <n>`, `existe <ruta>`,
  `no-existe <ruta>`, `contiene <ruta> | <texto>`, `no-contiene <ruta> | <texto>`, o `Verificar: manual` si no se puede. `node tools/todo.mjs
  --verificar` las corre; `audit.js` avisa `todo-cumplido` cuando un punto ya cumple (hay que cerrarlo) y `todo-sin-verificar` cuando falta la línea.
- **Los pendientes de sourcing de un país no van acá**: viven en `Admin/sourcing/<País>/_notas-generales.md`.

## A. En marcha

### 1. 480 · (Pantallas, con Contenido, prioridad alta): Inicio: card «Últimas cargas» con los últimos club-años cargados y «Ver más» a una página

Pedido de Guido: en Inicio, un card «Últimas cargas» con los últimos club-años cargados (10) y un «Ver más» que lleva a una página con la lista completa. Es chico y va primero. El diseño y la fuente de datos están en el documento del punto.
- [ ] Fuente pública: `tools/generar-ultimas-cargas.mjs` arma data/ultimas-cargas.js (club, ejercicio, fecha de carga, solo cargas reales, no estimados) desde los commits de carga que deja `cargar-lote.mjs` (como `generar-correcciones.mjs` con el historial de git); `--check` en la auditoría, como los otros generados. `Admin/registros/cargar-ultimo.jsonl` es interno y no se publica.
- [ ] Mockup del card y de la página en Prototyping/Pantallas/mockup-480.html con números reales (skill `producto-y-pantalla`): el ok de Guido antes del código.
- [ ] Card en Inicio con los 10 últimos (escudo o iniciales del club, ejercicio, fecha) y enlace a cada club en ese ejercicio; botón «Ver más».
- [ ] Página ultimas-cargas.html generada (lista completa con más cargas por página, enlace desde el card, en `sitemap.xml` y servida en `/ultimas-cargas`).
- [ ] Verificar en celular (375 px), español e inglés, sin errores en consola y con `node tools/audit.js` en 0 P0 y P1.
Terminado cuando: Inicio muestra el card con los 10 últimos club-años, «Ver más» abre ultimas-cargas.html con el resto, y la lista se regenera sola con cada carga.

Documento: Admin/propuestas/480-inicio-card-ultimas-cargas-con-los-ultimos-club-an.md
Verificar: existe tools/generar-ultimas-cargas.mjs
Verificar: existe ultimas-cargas.html
Verificar: contiene js/principal.js | ultimas-cargas

### 2. 463 · (Onboarding, con Pipeline y Auditora): SIIS de Colombia: los clubes que faltan cargar (va después del 470, 471 y 472)

Lo hecho (la tool `siis-estado.mjs`, el chequeo `siis-control`, el criterio en `CONVENCIONES-DATOS.md`, `siis-notas.mjs`, `club-siis.mjs` y los clubes cargados) está archivado en `Admin/Archive/TODO-463-siis-hecho.md` (historia) y en el CHANGELOG; cómo se carga un club: `Admin/paises/co.md`, «Pipeline de Colombia: los estados de SIIS», y `node tools/club-siis.mjs "<Club>"`. Decisiones de Guido que siguen vigentes: el estado de resultados y el balance de SIIS son el estado primario oficial de un club colombiano; un año que SIIS tiene y no tiene PDF útil se carga igual (rubros grandes y resultado); la tool, el chequeo y la regla viven en el pipeline y en `audit.js`; el informe de UEFA con imágenes y la Money League no entran.
Qué está cargado y qué falta de cada club: `node tools/club-siis.mjs` (sin nombre; «N/N años cargados» y su veredicto). Sin alta: Valledupar FC (NIT 824006447, 2016 a 2025) y Cóndores de Cundinamarca (900695572, 2021 y 2022); Titanes de Barranquilla (baloncesto) y Toros de Córdoba (béisbol) van por el 464; Corsarios dio REVISAR; Real Sincelejo está descartado (sin actividad). Un club se carga con `node tools/club-siis.mjs "<Club>" --preparar`, los tres subagentes y `--avanzar --ejecutar --cargar --en-segundo-plano`.
Lo que quedó pendiente de los clubes ya cargados está en el punto 476.
- [x] Cargados: Deportes Tolima, La Equidad, Águilas Doradas, Atlético Bucaramanga, Independiente Medellín, Leones FC, Fortaleza CEIF, Once Caldas, Boyacá Chicó, Unión Magdalena, Alianza FC, Deportivo Pereira, Deportivo Cali, Cortulua, Tigres FC, Atlético FC, Real Cartagena, Cúcuta Deportivo, América de Cali, Orsomarso, Atlético Huila, Barranquilla FC, Bogotá FC, Envigado (2016 a 2024) y Atlético Nacional (2015 a 2024), Jaguares y Real Santander (2016 a 2025) (`node tools/club-siis.mjs` da el detalle).
- [ ] Lo que dejaron Jaguares y Real Santander: gestiones `confirmada:false` (criterio en el 479, P3); sponsor `sin-fuente` en los 20 años (FKA sin campo «Sponsor»); marca de Real Santander 2016 y 2017 sin cargar (Wikipedia y FKA discrepan); dictámenes que SIIS no tiene (Jaguares 2016 a 2019 y 2021; Real Santander 2016 a 2019); estadio de Jaguares 2016 de Wikidata (nombre actual).
- [ ] Con años por cargar: Independiente Santa Fe, Junior, Llaneros, Millonarios, Boca Juniors de Cali, Deportes Quindío, Patriotas Boyacá y Caimanes de Barranquilla.
- [ ] Sin alta: Valledupar FC (NIT 824006447) y Cóndores de Cundinamarca (900695572). Corsarios dio REVISAR; Titanes de Barranquilla y Toros de Córdoba van por el 464; Real Sincelejo está descartado.
Terminado cuando: los clubes de SIIS que tienen años por cargar están cargados o descartados con motivo.

Verificar: existe tools/siis-estado.mjs
Verificar: contiene data/co/deportestolima-co.json | "fiscal_year": 2016
Verificar: contiene data/co/deportestolima-co.json | "fiscal_year": 2025
Verificar: audit siis-faltante = 0

### 3. 481 · (Pipeline, prioridad 3): Acelerar medir-pipeline sin perder lo que mide

`node tools/fos.mjs cerrar-tool` tardó 24 min 16 s en el último cambio (ocho tools; seis medidores; lotes chico, mediano y completo, cada uno «antes» y «después»), y un cambio solo de texto paga el mismo lote completo que uno de lógica. Se quiere bajar ese tiempo sin que la medición deje de encontrar lo que hoy encuentra. Lo que no se negocia: una medición acelerada tiene que dar el mismo veredicto que la lenta sobre los cambios ya medidos (`Admin/registros/mediciones-pipeline.jsonl`).
- [ ] Medir dónde se va el tiempo: `node tools/duraciones-mediciones.mjs` (por medidor y nivel) y un perfil de una corrida real (qué parte es el «antes», cuál el «después», cuánto cuesta cada medidor por documento).
- [ ] Reutilizar el «antes»: guardarlo por commit y por clave de lote (la tool ya tiene una clave de caché: `node tools/fos.mjs probar medir-pipeline`) para que dos mediciones sobre el mismo HEAD no lo repitan.
- [ ] Correr los medidores independientes en paralelo (alta, cargar, audit, escribir, contexto no comparten escritura; los que tocan `Admin/registros/` se revierten por medidor: comprobar que el revertido no se pisa).
- [ ] Medir solo lo afectado: hoy «25 familias afectadas de 25» para un cambio de salidas; un cambio que no toca lectura ni categorías no necesita el lote completo si el veredicto de `fos patron` lo clasifica como infraestructura sin documentos.
- [ ] Comparar cada aceleración con la medición lenta sobre los últimos cinco cambios medidos: mismo veredicto y mismas diferencias; si una diferencia desaparece, la aceleración se descarta.
Terminado cuando: una medición de un cambio como el último baja de 24 min a menos de la mitad con el mismo veredicto, y la comparación contra la lenta está en el documento del punto.

Documento: Admin/mediciones/481-acelerar-medir-pipeline-sin-perder-lo-que-mide.md
Verificar: manual

### 4. 479 · (Pipeline, con Onboarding): SIIS de Colombia: lo que las tools no imprimen y cada subagente reconstruye (hallazgos de cargar 20 club-años, 463)

Cargar Jaguares y Real Santander (20 club-años, 28-10-2026) dejó 20 hallazgos de las tools y nueve propuestas de proceso, todas de salida, nombre legal o texto de briefs (ninguna toca un dato publicado ni una compuerta): `Admin/mediciones/463-hallazgos-20-club-anios.md`. Un cambio a una tool del pipeline se mide antes y después (`cerrar-tool`).
- [x] Hecho y medido: P1 nombre legal del alta normalizado; P4 `--ejemplo`, `--agregar` y `--pendientes --club` del auditor; P5 salida honesta de los ensayos; P6 alias y pista de liga en `club-siis`; P7 `--informe-anual` y `validar-contexto`; P8 y P9 (briefs y `lookup-brand-color`); el brief de subagentes con cierre obligatorio (`brief-tool`).
- [ ] P2 una sola pregunta de gestión por club en la cola (hoy una por año): cambia `cola.mjs` o la etapa que la encola; medir con `cerrar-tool`.
- [ ] P3 criterio de las gestiones sin nota de inicio o de salida (votación de tres, `votacion-de-criterios`): hoy Jaguares y Real Santander quedan `confirmada:false` y la cola pregunta 20 veces lo mismo.
- [ ] Dos dudas de los subagentes sin regla escrita (auditor «firma» o «persona»; `continuidad` con una recomendación sin «incertidumbre material»): entran a la votación.
Documento: Admin/mediciones/463-hallazgos-20-club-anios.md
Terminado cuando: cada propuesta está hecha (con su medición) o descartada con su motivo, y la votación del criterio de gestiones está resuelta.

Verificar: manual

### 5. 466 · (Onboarding, con Pantallas): un mapa visual, tipo workflow, del proceso de onboarding (sin sourcing): comandos, tools, hooks y qué hace cada paso

Pedido de Guido (2026-10-26): un mapa VISUAL, con forma de workflow, de todo el proceso de onboarding de un club, SIN el sourcing (buscar documentos): desde que el PDF o el estado de SIIS está en la carpeta hasta el año publicado y con su línea del auditor. Que se vea de un vistazo qué corre cada paso (comando de `node tools/fos.mjs` o de `club-siis`), qué tool lo hace y de qué archivo lee y a cuál escribe (`Admin/CONTRATO-ETAPAS.md`), qué hook o compuerta lo cuida (`tools/hooks/pre-tool.mjs`, `exigir-medida`, `audit.js`, `verificar`), dónde interviene un subagente o Guido, qué cuesta (API o gratis) y qué commit deja. Dos caminos en el mismo mapa: el PDF (etapas de `Admin/PIPELINE.md`) y el de SIIS (`club-siis.mjs`). Se hace con el widget de diagramas o con un Artifact (la skill `producto-y-pantalla-finance-of-sports` no aplica: no es del sitio); una vez hecho, `club-siis` y `fos` lo citan y el arranque de una sesión de onboarding lo abre en vez de leer `PIPELINE.md` entero. Salió de que una sesión tardó una hora en cargar un solo club por no tener este mapa a la vista.
Terminado cuando: existe el mapa (un Artifact o un `.html` en `Admin/`), muestra los dos caminos con comando, tool, hook, costo y quién decide en cada paso, y está citado desde `Admin/PIPELINE.md` y el arranque de la skill `club-or-year-onboarding` (el texto de la skill, con su diff para Guido).

Verificar: manual

### 6. 459 · (Deploy, con Guido, prioridad alta): Supabase se pausó otra vez: el Worker fos-supabase-ping no lo mantuvo despierto

Dicho por Guido (2026-10-25): «Supabase me pausó de vuelta, el worker no anduvo». MI CUENTA usa Supabase en plan gratis, que se pausa tras 7 días sin uso; lo debería mantener despierto el Worker `fos-supabase-ping` (cron cada 3 días que llama a `ping()`; `Admin/ESTADO.md`, «MI CUENTA»). Esta vez se pausó igual, así que el Worker no corrió o falló. Qué mirar: las corridas del Worker en Cloudflare (sin corridas o con errores), que el cron siga activo y apunte al proyecto de Supabase correcto, que la función `ping()` exista y responda (`node tools/supabase/stats.mjs` llama a `stats()`), y reactivar el proyecto en el panel de Supabase. Si el plan gratis no alcanza, la alternativa es otro mecanismo (un ping desde otro cron) o un plan pago. Mientras esté pausado, la pestaña MI CUENTA dice «no disponible».
Terminado cuando: Supabase está activo, el Worker corre su cron y deja una corrida sin errores, y hay una prueba de que dos corridas seguidas mantienen el proyecto sin pausarse.

Verificar: manual

### 7. 362 · (Pipeline, con la Auditora): el freno de documentos de grupo

Un consolidado de grupo con negocios ajenos al club (caso Fleetwood/Jaymel) vale como documento del club solo si cumple la regla de `Admin/CONVENCIONES-DATOS.md`, «Un consolidado de grupo con negocios ajenos al club» (votada 3 a 0): el club está en el grupo el ejercicio entero y lo ajeno pesa a lo sumo el 10 % del turnover impreso. Hoy esa regla la aplica una sesión a mano; ninguna tool la frena. Un cambio a una tool del pipeline se mide antes y después (`cerrar-tool`).
- [ ] Antes de codear: recorrer la sección 7 de la skill `auditoria-finance-of-sports` (condición nueva en una tool) y anotar en CHANGELOG «sin revisión independiente».
- [ ] Frenar en `tools/perimetro-senales.mjs` o `tools/cargar.mjs` (lo que resulte general) el documento de grupo cuando el turnover por clase de negocio deja el deporte del club (con sus instalaciones y servicios, según la regla) por debajo del 90 %.
- [ ] Frenar cuando el ejercicio trae la compra o la venta de la sociedad del club.
- [ ] Medir con `node tools/fos.mjs cerrar-tool --cambio "<qué hace>"`: tiene que frenar los tres documentos de grupo de Jaymel (listados en `Admin/registros/documentos-descartados.txt`) y ninguno de los británicos ya cargados desde un documento de grupo (Arsenal, Chelsea y Newcastle entre ellos).
Terminado cuando: el freno está activo, medido con el veredicto de `cerrar-tool` en CHANGELOG, y los tres documentos de Jaymel quedan frenados sin cambiar ningún año cargado.

Verificar: manual

### 8. 363 · (Pipeline): lo aprobado de Pipeline 15 que no se aplicó

Lo aprobado por la Auditora 5 y 6 (`Admin/registros/auditoria-proceso.jsonl`; detalle en `Admin/Archive/sesion-pipeline-2026-10-21.md`, «Pipeline 15», «Qué queda») que quedó sin commitear. Un cambio a una tool del pipeline se mide antes y después (`cerrar-tool`). Los avisos de recorte ya están (`avisarRecorte`); falta lo de abajo.
- [ ] (a1) `jevDe` (`tools/caja-deuda-propuestas.mjs`) manda a Jev todas las filas del balance, no las primeras 120. Condición de la Auditora 6, antes de commitear: volver a pedirle a Jev los documentos que hoy cortan (`caja-deuda.mjs` avisa «AVISO (recorte)»); los años cuya caja o deuda cambia van como corrección con cita y trailer `Corrige:`, o se revierte.
- [ ] (a2) El encabezado de balance se busca en la página entera, no en los primeros 1500 caracteres (`tools/caja-deuda-md.mjs`, `slice(0, 1500)` en las búsquedas de encabezado). Aprobado; `caja-deuda.mjs --medir` dio idéntico en todos los años de deuda.
- [ ] (a3) `nombreLegal` (`tools/alta-club-lectura.mjs`, `slice(0, 4000)` de líneas) y las señales de intermedio (`tools/alta-club-analisis.mjs`, `slice(0, 20000)`) quedan como ventana de portada declarada en un comentario del código, con la medición de leer entero (63 de 356 cambian, mezclado; 394 informes pasarían a «intermedio»); y la regla de `Admin/PIPELINE.md` («Una tool que decide no lee solo una parte del documento») suma «salvo una ventana de portada declarada en el código, con la medición de leer entero».
- [ ] (b) Estado `falta_documento` en `tools/auditoria.mjs` (el documento remite a un informe del auditor que no trae: Sourcing), separado de `falta_transcripcion`, con `citas.remite` validada (±3 líneas, `.md` del club y año). Cambios exigidos: las marcas «--- pág. N ---» de 1 a N sin saltos; las 13 sin `.md` propio también como `falta_documento`, citando el `.md` fuente del año. Migrar los `falta_transcripcion` con un subagente Sonnet y que el lote entero pase `node tools/auditoria.mjs --check` antes del commit. El parche `p15-falta-documento.patch` no está en el repo ni en el disco: se rehace desde la descripción.
- [ ] (c) Sacar `cabecera` del retorno de `perimetroHeredado` (`tools/cargar.mjs`, `const cab` y `cabecera: cab`): se calcula y nadie la lee.
- [ ] (d) Las skills `auditoria-finance-of-sports` (eje datos) y la de la cola (`club-data-mapping`) dicen «antes de reportar algo raro de un documento, `node tools/rarezas.mjs --md <ruta>`». Texto de skill: lo lee Guido en el diff; esta tarea se commitea sola.
Las dos preguntas de la Auditora 5 están contestadas en `Admin/CONVENCIONES-DATOS.md` (tramo corto como C; temporada COVID con la etiqueta en pantalla, sin publicNote).
Terminado cuando: a1, a2, a3, b y c están commiteados con su medición en `Admin/registros/mediciones-pipeline.jsonl` (o descartados con su motivo), y d está en las dos skills.

Verificar: no-contiene tools/caja-deuda-propuestas.mjs | todas.slice(0, 120)
Verificar: no-contiene tools/caja-deuda-md.mjs | slice(0, 1500)
Verificar: contiene Admin/PIPELINE.md | ventana de portada declarada
Verificar: contiene tools/auditoria.mjs | falta_documento
Verificar: no-contiene tools/cargar.mjs | cabecera: cab
Verificar: contiene .claude/skills/auditoria-finance-of-sports/SKILL.md | rarezas.mjs --md

## D. Orden de la casa

### 9. 445 · (Auditora, con Guido): SønderjyskE 2022-2024 en formato completo: qué hace falta (Guido lo prefiere)

Guido (2026-10-24) prefiere ver a SønderjyskE en formato completo. Hoy: 2025 cargado completo (ventas 66,29 M y otros ingresos 0,12 M; votación 3 a 0 en `Admin/mediciones/413-votacion-formato-completo-vs-reducido.md`); 2022, 2023 y 2024 cargados como «Bruttofortjeneste» (el margen bruto, balance resumido por la § 32), que es como el club publicó esos años. Para mostrarlos completos hace falta el estado completo de cada año: 2024: el informe 2025 trae la columna 2023/24 completa pero REEXPRESADA (pasó 2,13 M de personal a margen bruto: 35,30 M contra 37,43 M originales). Esa es la opción C que la votación descartó por la regla «un comparativo reexpresado no es la transcripción del año» (`CONVENCIONES-DATOS.md`, Salernitana 2022); hacerlo exige que Guido decida una excepción o una regla nueva («el comparativo completo de un informe posterior reemplaza al año resumido, con una publicNote de reexpresión»), cambia 1 año ya publicado y se recarga con `cargar.mjs --reemplazar`. 2022 y 2023: los informes publicados no traen el desglose; habría que pedírselo al club (mail, skill `club-outreach`) o encontrar una versión interna; mientras tanto quedan resumidos con su nota. Sobre qué mide «completo»: ingresos y gastos brutos (el resultado no cambia), útil para el tamaño real y la relación sueldos/ingresos; no es «poder adquisitivo». POR QUÉ LA VOTACIÓN RECHAZÓ USAR EL 2024 DEL INFORME 2025 (pregunta de Guido): (1) el informe 2024 publicó 37,43 M de margen bruto y el comparativo del 2025 dice 35,30 M para el mismo año, porque el club reclasificó 2,13 M entre personal y margen bruto; cargar el comparativo mostraría para 2024 una cifra que el club no publicó ese año, y quien abra el informe 2024 encontraría otra; (2) la regla vigente (`CONVENCIONES-DATOS.md`, «UN COMPARATIVO REEXPRESADO NO ES LA TRANSCRIPCIÓN DEL AÑO», decisión de Guido para Salernitana 2022, y `club-data-mapping/SKILL.md`: usar siempre la columna del propio ejercicio) lo permite solo si el PDF del año es ilegible, y el del 2024 es legible; (3) 2024 quedaría completo entre 2022 y 2023 resumidos (la serie seguiría mezclada). A favor de hacerlo: es la última versión que da el propio club, y el desglose de 2024 sale gratis. Es una regla, no una ley: Guido puede decidir la excepción.
DECISIÓN DE GUIDO (2026-10-24): NO se usa el 2024 del informe 2025; 2024 queda como el club lo publicó (resumido), de acuerdo con la votación. Queda abierto solo si se le pide el desglose completo de 2022, 2023 y 2024 al club (mail, `club-outreach`; un pedido por club, no urgente).
Terminado cuando: Guido decide si se le pide el desglose completo de 2022 a 2024 al club, y lo decidido queda hecho (el mail, o el punto se cierra con «no se pide»).

Verificar: manual

### 10. 338 · correr todas las auditorías del proyecto (al final de A)

CORRER TODAS LAS AUDITORÍAS (pedido de Guido, 2026-10-20). Después del 258, al cerrar D: correr cada auditoría del proyecto
(`node tools/audit.js` completo, `?audit=1` con `auditAll()` y `verifyTieOuts()` en el sitio, `generar-data --check`, `estimar --check`,
`generate-club-pages --check`, la skill `auditoria-finance-of-sports`) y mirar qué queda en P2 y P3 para decidir qué se arregla.
CORRIDO a medias (2026-10-23, sesión sola): `audit.js` P0 0 · P1 0 · P2 16 · P3 132; `?audit=1` `auditAll()`: 331 clubes, 3.823 chequeos OK, 0 que no cierran, 0 avisos de tipo de cambio; `generar-data --check`, `estimar --check`, `generate-club-pages --check`, `generate-club-index --check`, `generate-rankings --check` y `generate-fuentes-page --check`: todos al día. Falta la skill `auditoria-finance-of-sports` (un eje) y decidir qué hacer con los P2 y P3 (el 370), que es lo que pide el punto.

Verificar: manual

### 11. 258 · índice partido, cuando lo que se baja siempre pase 150 KB comprimidos (hoy 46,5 KB)

ÍNDICE PARTIDO POR PAÍS O LIGA (mejoras de proyecto, pedido de Guido 2026-10-16). Medido por Pantallas 6 (2026-10-21): con 320 clubes,
clubs.js + club-index.js = 17,7 KB comprimidos (~55 B por club) y lo que se baja siempre, 46,5 KB comprimidos; a 1.000 clubes ~84 KB, a
3.000 ~200 KB. Todavía no. Se reabre cuando lo que se baja siempre pase 150 KB comprimidos (~2.200 clubes) o esos dos archivos pasen 1 MB
crudos. Posible chequeo P3 `payload-eager` en `checkEscala()` de `audit.js` (hoy proyecta bytes crudos): condición nueva, va a la Auditora.

Verificar: manual

### 12. 364 · (Pantallas): el registro de correcciones, curado (hoy todo dice «Motivo no registrado»)

EL REGISTRO DE CORRECCIONES, CURADO (Pantallas 7, sale del 247). `correcciones.html` y el bloque de Finanzas muestran hoy 236 eventos en 56
clubes, y todos dicen «Motivo no registrado». Terminado cuando: (a) los eventos de más impacto (valor, retiros, recargas) tienen su motivo en
español en `Admin/registros/correcciones.jsonl` (`{"commit","club","anio","motivo_es","motivo_en","fuente"}`; con subagentes que lean el
cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`; el motivo es público: se escribe para un hincha o un periodista); (b) decidido si
el motivo se traduce al inglés al curar (sin `motivo_en` la página en inglés muestra el español); (c) `tools/exportar-paquete.mjs` suma el
registro al Data Package (pasa por la skill `contrato-de-datos`); (d) revisado que los tipos «total» y «otro» de los eventos no tengan ruido
de renombres. Lo hace Pantallas.

Peso (medido 2026-10-24): `data/correcciones/correcciones.json`, que carga la página, pesa 415 KB y 24 KB comprimido (Netlify lo sirve comprimido) con 718 eventos; los de cada país, hasta 76 KB y 5 KB comprimidos (lo que lee el bloque de Finanzas). No hace falta partirlo hoy. Se parte (por año del evento, con páginas 1, 2, 3… en la vista) cuando el archivo comprimido pase de 150 KB, unas 6 veces el de hoy. Hoy ningún aviso de `audit.js` mira el tamaño de ese archivo (`archivo-pesado` cubre solo algunos `.md` e `index.html`): sumarlo al hacer este punto.

Además, `correcciones.html` da tres avisos de `audit.js` que son de esta pantalla: `doc-interno-no-excluido` (es una página pública: se silencia con el motivo o se mueve), `raya-larga-visible` (línea 76) e `i18n-incompleto` (`corr.th.antes` y `corr.th.despues` sin traducción en `data/lang/en.js`).

Verificar: audit doc-interno-no-excluido = 0
Verificar: audit raya-larga-visible = 0
Verificar: audit i18n-incompleto = 0
Verificar: manual

### 13. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica: lo que sigue abierto

Revisado el 2026-10-28 contra el código, `Admin/HALLAZGOS-pipeline.md` y `Admin/registros/auditoria-proceso.jsonl`. El detalle de cada letra: `Admin/Archive/sesion-onboarding-2026-10-18-4.md` (a a q) y `-5.md` (s a v). Cada letra pendiente es un escalón del pipeline con medición completa (`fos cerrar-tool`); varias llevan una decisión de Guido.

- [x] Hechas antes (mergeadas el 2026-10-18): a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2, y3 y aa.
- [x] Hechas con otro mecanismo (verificadas el 2026-10-28): l (`reportType` se deduce del `.md` en tres escalones, `Admin/PIPELINE.md:596`; 72 frenos bajaron a 4), n (`verificar-cierre.mjs:145`: perímetros distintos no se comparan), p (298 p1 y p2: el perfil vale por ventana de 5 años y un `cero-real` de otro documento del club vale), q (`lote-final.mjs:14`: el ensayo solo cobra lo que llega a categorizar), RWDM 2019 (en `documentos-parciales.txt`, con la aclaración de Guido).
- [x] Descartadas con motivo (`Admin/HALLAZGOS-pipeline.md`): m («medido, no entra»: el ajuste `perimetro` del club es el escalón 0), s (con la f, `periodo.mjs` da el cierre bueno y Beerschot 2019 está cargado), v (los cinco originales ya están en `documentos-descartados.txt`).
- [x] u2, lo principal: la 298 af sumó a `data/club-leagues/be.js` Patro Eisden 2013-2015 y Lokeren-Temse 2021-2022; Patro 2019, Beerschot 2019 y OH Leuven 2019 ya estaban.
- [x] Escocia en el selector: `SCT` existe en `data/leagues.js` (la Premiership y Celtic).
- [x] z, el diseño: ejercicios de más de 12 meses sin tope, con el año del cierre, los importes tal cual y `publicNote` (298 w2 y z2, `Admin/CONVENCIONES-DATOS.md`, votación 2 a 1). RAAL La Louvière 2018 (14 meses) está cargado.
- [ ] k: `alta-club.mjs` y `cargar-lote.mjs` no usan las `ligas` que trae `Admin/registros/altas-revision.jsonl` (`cargar-lote.mjs:69` solo toma `brandColor`); el alta saca la liga de la caché `tools/club-league-reference/<iso>.json`, así que un club sin caché queda con liga null. Escalón chico: que el alta tome la liga de la revisión cuando no hay caché.
- [ ] z, las tres cargas que faltan: Anderlecht 2011 (16 meses), Sint-Truiden 2013 (15) y Zulte Waregem 2012 (17). Sus clubes solo tienen 2025. Los PDF y `.md` de Anderlecht 2011 están en `Clubes/Bélgica/Anderlecht/`. Ojo: `CONVENCIONES-DATOS.md:260` dice «Anderlecht 2011 ya cargado», y hoy no lo está: corregir esa frase al cargar.
- [ ] t2 (no verificada el 2026-10-28; es de Guido): los años 2025 belgas con ajustes `fila` y el escalón NBB sin correr: Patro Eisden 2025 (ingresos +1.810, gastos +4.012), Lommel SK 2025 (gastos +172) y Lommel SK 2018 (−182 de financiero) cerraron por tolerancia con errores chicos. Decidir si se corrigen (escalón: correr el NBB también con ajustes si el resultado sigue exacto).
- [ ] u2, el resto (no verificado): si la tool que arma las listas de ligas sigue perdiendo a Beerschot Wilrijk en la First Division B 2017-18 y 2018-19 (baja 7 de 8; aparece en `tools/club-league-reference/be.json`). OH Leuven 2017-2018 no están cargados, así que no hay dato que etiquetar.
- [ ] g2 (condicional): partir en la cola cualquier fila mixta según su nota, solo si aparece otra sin códigos (el 66A de Lommel SK 2025 ya se resolvió a mano). Si no aparece otra, se descarta con motivo.
- [ ] Gales e Irlanda del Norte en el selector (decisión de pantalla, de Guido): `data/leagues.js:60` solo comenta cómo se haría `WAL`. Hoy no hay clubes galeses ni norirlandeses cargados, así que no se ve; se retoma con el primero.
- [ ] Aviso «368 documentos viejos sin tablas se rehacen con Mistral (~US$ 83)»: la tanda `Admin/lotes/sin-tablas-298e.txt` (239 documentos) ya se corrió (el ensayo daba US$ 7,26 y costó US$ 40,60 a 43,09). No se verificó cuántos quedan; correr `node tools/pipeline.mjs` para contarlos y, si quedan, decidir el gasto con Guido.
Terminado cuando: cada letra pendiente se hizo o se descartó con su motivo en `Admin/HALLAZGOS-pipeline.md`, y quedan cargados Anderlecht 2011, Sint-Truiden 2013 y Zulte Waregem 2012.

Verificar: contiene data/be/anderlecht-be.json | "fiscal_year": 2011
Verificar: contiene data/be/sinttruiden-be.json | "fiscal_year": 2013
Verificar: contiene data/be/zultewaregem-be.json | "fiscal_year": 2012

### 14. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

- [x] Lierse son dos clubes: la vzw (`liersekempenzonen-be`, 2018 a 2021 cargados) y la NV sucesora (`liersesk-be`, con `predecessor_id`).
- [x] 2023-2025 de la vzw: sin depósito en la BNB (chequeo 2026-10-21); el aviso `ejercicio-sin-rastro` está silenciado en `tools/audit-ignore.json` con la cita de la nota de sourcing.
- [ ] Decidir 2022 (la Auditora, con Guido): el balance abreviado de la vzw está en `Clubes/Bélgica/Lierse Kempenzonen/` (`jaarrekening-2022-06-30-individual.md`), con un margen bruto de −2.369 EUR, casi sin actividad porque la NV ocupó su plaza. Opciones: cargarlo (como se cargaron 2018 a 2021; la liga de la NV esa temporada es `be-challengerproleague`, y hay que decidir si la vzw la hereda) o descartarlo con motivo en `Admin/sourcing/Bélgica/Lierse Kempenzonen.md`.
- [ ] Al decidir: actualizar el motivo de `tools/audit-ignore.json` (hoy dice «lo decide el 365, que sigue abierto») y dejar `ejercicio-sin-rastro` de `liersekempenzonen-be` en 0.
Terminado cuando: 2022 está cargado o descartado con motivo, y el motivo del silenciamiento ya no dice que el 365 sigue abierto.

Verificar: manual

### 15. 452 · (Pantallas, con Contenido): particularidades contables clave en `metodologia.html` (balance resumido, cierre, perímetro, sin socios, tipo de cambio), sin curso de contabilidad

Pedido de Guido: que un lector entienda qué está leyendo con un puñado de particularidades contables cortas, cada una con su caso real del sitio. Son cosas que solo se ven con ejercicios de muchos países. Lo escribe Contenido con el criterio de `contenido-y-difusion`. Guido tiene ideas y NO se cierra hasta que lo autorice explícitamente.
- [x] Nota por ejercicio en «Notas sobre este club» (debajo del Estado de resultados) para ingresos en una sola línea o margen: `renderNotasClub` en `js/finanzas-render.js`, plantillas `pl.sd.tip.*` y `pl.notas.*` en `data/lang/en.js` (el español va como texto por defecto en el código).
- [ ] Sección nueva en `metodologia.html` (hoy tiene: fuentes, formato, dólares, inflación, deuda y caja, estimados, auditor, correcciones, fuentes externas, cómo citar; nada de las cinco particularidades). Candidatas, a elegir y escribir cortas, cada una con ejemplo real y enlace a la fuente:
  1. balance resumido contra completo: algunos clubes publican solo un margen («Bruttofortjeneste» danés, esquema abreviado belga, «lucro bruto») y el salto al formato completo es de formato, no de actividad (caso SønderjyskE 2024 contra 2025). Antes de escribirla hay que separar los ejercicios con el ingreso en una sola línea entre margen y facturación entera (cuántos son: ver `Admin/ESTADO.md` o `node tools/audit.js`, sin comprobar el comando exacto);
  2. el ejercicio no es el año calendario (cierre 30-06 o 31-12) y el año del sitio es el del cierre;
  3. individual contra consolidado: dos balances del mismo club con perímetros distintos, no se suman ni se comparan;
  4. sociedades sin socios: «cuotas sociales» en cero es un cero real;
  5. moneda local convertida al tipo de cambio de cierre: un club puede «crecer» en dólares por la moneda (la sección «Cómo se pasa a dólares» ya explica el método, no este efecto).
- [ ] Idioma: `metodologia.html` está solo en español (no tiene claves de idioma ni versión inglesa); si la sección también va en inglés, antes hay que decidir cómo se traduce la página (duda para Guido).
- [ ] Una nota corta donde el lector tropieza (el gráfico de ingresos cuando hay cambio de formato): sin comprobar si lo cubre ya la nota por ejercicio.
Terminado cuando: `metodologia.html` tiene una sección corta con las particularidades elegidas, cada una con un ejemplo real del sitio y un enlace a la fuente, y Guido autorizó el cierre.

Verificar: manual

### 16. 372 · (Auditora, prioridad baja): decidir si lo que reparte la federación o la liga con nombre de «subsidio» entra a Subsidios y donaciones

Las etiquetas de subsidios que quedaron excluidas de `grants_donations` en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas, no una confianza baja de Jev: mezcladas con otro concepto, solidaridad de la federación o la liga (`competition_bonus`), subvención de capital imputada, impuestos y deducciones. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo. Guido no las revisa una por una: el proceso es `node tools/fos.mjs etiquetas`.
- [x] Lista corta de 24 etiquetas decididas por Guido (13 a Subsidios y donaciones, 11 quedan en Otros ingresos): commit `cf38f19df9`.
- [x] El JSON de decisiones no tiene etiquetas por revisar (`revisar` y `guido` vacíos en `tools/subsidios-etiquetas.json`).
- [ ] Criterio de lo que reparte la federación o la liga cuando el documento lo llama «subsidio», «toetus» o «contributi» (EJL, Eesti Jalgpalliliidu, Contributi Federali, Contributi da Leghe e Enti Federali, LNPA/LNPB, Subsídios Associações/FPF/Liga, FPF/LPF de Oliveirense; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`): votación con `votacion-de-criterios`, con la tabla de `node tools/fos.mjs filas` como evidencia. Si alguna entra, se recategoriza con `node tools/fos.mjs etiquetas --categoria grants_donations` y se mide.
- [ ] La decisión escrita en `Admin/CONVENCIONES-DATOS.md`, en la REGLA «subsidios, donaciones y aportes van a `grants_donations`», con el caso.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso).

Verificar: contiene Admin/CONVENCIONES-DATOS.md | REGLA: lo que reparte la federación o la liga

### 17. 377 · (Onboarding, con Pipeline): Alemania: años cargados sin verificación (RB Leipzig, Hamburger SV, DFL) que las listas de prueba no cubren

Las listas que arma `tools/lotes-prueba.mjs` salen de lo que tiene `Generados/<País>/<Club>/<doc>.verificacion.json`; un club cargado sin ese archivo no entra y un cambio a una tool no se mide sobre él. En Alemania solo Borussia Mönchengladbach (2021 y 2022) tiene verificación; RB Leipzig (2015, 2017, 2018-19), Hamburger SV (2021-22) y `_DFL-Finanzkennzahlen` tienen `.categorias.json` y `.rubros.json` pero ningún `.filas.json` ni `.verificacion.json` (cargados por el camino legado: tienen `.previo-legado.md`). Averiguar el motivo por documento antes de decidir, sin asumir; según la causa: rehacer las etapas 3 a 6 donde corresponde (`tools/verificar.mjs`), o declarar el año como legado sin verificación en `Admin/paises/de.md` y dejar que `node tools/lotes-prueba.mjs --check` lo acepte.
- [x] Rusia: su camino no pasa por verificación (JSON del fisco, `Admin/paises/ru.md`), tiene medidor propio (`escribir` en `tools/pipeline-tools.json`: `bfo-rusia.mjs` y `bfo-rusia-notas.mjs`; prueba con Krasnodar 2025, `Admin/PIPELINE.md`, «La escritura de las tools que escriben…»).
- [x] Ucrania y República Checa: no hay `data/ua` ni `data/cz` (sin club cargado); el `.categorias.json` suelto de cada una (Polissya, Karpaty Lviv, Baník Ostrava) es de un ensayo. Se cubren cuando se carguen, con el onboarding normal.
- [x] Alemania entra a las listas: Mönchengladbach 2021 y 2022 en `Admin/lotes/prueba-completa.txt` (`node tools/lotes-prueba.mjs --ensayo`: «Alemania · pdf»).
- [ ] Averiguar por qué RB Leipzig 2015, 2017 y 2018-19, Hamburger SV 2021-22 y el DFL no tienen `.filas.json`/`.verificacion.json` (legado anterior a la etapa 6; sin comprobar año por año).
- [ ] Por cada uno: rehacer hasta la etapa 6 o declararlo legado en `Admin/paises/de.md`.
Terminado cuando: cada año de Alemania con `.categorias.json` tiene `.verificacion.json` o está declarado legado en `Admin/paises/de.md`, y `node tools/lotes-prueba.mjs --check` pasa.

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/RB Leipzig/
Verificar: audit lote-prueba-desfasado = 0

## E. Después de A a D (Guido, 2026-10-20)

### 18. 464 · (Onboarding, con Pantallas y Contrato de datos): abrir con SIIS los deportes que no son fútbol (baloncesto y béisbol de Colombia)

Pedido de Guido (2026-10-26): SIIS tiene el estado de resultados de clubes de otros deportes y hay que abrirlos. No se cargan hasta que Guido active cada deporte (`Admin/PIPELINE.md`, «Un deporte nuevo»; activar un deporte es suyo). Lo que SIIS tiene hoy (`Admin/sourcing/Colombia/siis-inventario.md`, generado): baloncesto, Gigantes de Barranquilla (NIT 901330760, 2021 a 2025), Titanes de Barranquilla (901213941, 2021 a 2025; ya hay carpeta en `Clubes/Colombia/`), Frastbreak Basketball Club (901123128, 2018, 2019 y 2021 a 2025), Bogotá Piratas (900720607, 2016, 2017, 2019 y 2021 a 2025) y un club de baloncesto de razón social «Fomentar, patrocinar y practicar el baloncesto…» (900721306, 2024); béisbol, Toros de Córdoba (900477535, 2017 a 2019 y 2021 a 2023; carpeta existente) y Caimanes de Barranquilla (900650770; carpeta existente). Los dos de béisbol y Titanes ya figuran en `tools/siis-clubes.json`; los demás hay que sumarlos con su carpeta.
Pasos: (1) Guido decide qué deportes se activan (baloncesto, béisbol) y con qué taxonomía. (2) Se suman los NIT que faltan a `tools/siis-clubes.json` y se dan de alta los clubes (`alta-club.mjs`, que pregunta el deporte). (3) `node tools/siis-estado.mjs --club "<Club>" --todos --escribir` y el pipeline de siempre. (4) Pantallas y Contrato de datos si el deporte cambia algo visible o público.
Terminado cuando: Guido decidió qué deportes se activan con SIIS y los clubes de esos deportes con estado en SIIS están cargados, o quedó escrito por qué no.

Verificar: manual

### 19. 357 · mostrar las inyecciones de capital de los dueños (diseño de Pantallas, con mockup)

MOSTRAR LAS INYECCIONES DE CAPITAL (Guido, 2026-10-21: «agregá como to do mostrar en algún lado inyecciones de capital»). Lo que el
dueño o los socios ponen como aumento de capital, aporte o préstamo va al patrimonio o a la deuda, no al resultado, y hoy el sitio no lo
muestra. Primero medir (Auditora o Pipeline): en cuántos club-años el documento lo imprime (estado de cambios en el patrimonio, flujo de
fondos o notas) y con qué rótulos, por país. Después Pantallas propone dónde se ve, con mockup para el ok de Guido. Si suma un campo al
JSON, pasa por la skill `contrato-de-datos`. Se relaciona con el 350 (subsidios y aportes impresos como ingreso).

Verificar: manual

### 20. 420 · (Onboarding, con la Auditora): cargar los británicos en iXBRL: lote 143 y Hibernian, los años pagables, Falkirk, las altas

El lote 143 (`Admin/lotes/lote-143.txt`, 13 documentos de Inglaterra, el año más reciente de cada club) pasó la lectura, las 13 sumas verifican y sus colas de sumas, perfil y categorías están contestadas, pero ninguna de las 13 altas está hecha. Pagar la IA sobre XHTML exige `--pagar-ia-xhtml "<motivo>"`: sin ese flag `lote.mjs` frena el lote entero porque el motor `xhtml-ixbrl` no tiene escalón determinista. Gasto de API a la fecha: `node tools/gasto.mjs`.
- [x] Los 55 `.md` de Hibernian, Bolton, Bristol Rovers, Cambridge, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford, Tranmere, Blackpool y Reading reconvertidos con tablas (los Hibernian están en `Clubes/Escocia/Hibernian/`).
- [x] Lote 143 leído (localizar, validar, extraer): 13 documentos verificados; sumas, perfil y categorías contestadas con cita por tres revisores Sonnet (commits `31d48f0b6d`, `f43c716591`, `ee269d571a`, `fbb3382ed6`).
- [ ] Contestar las preguntas nuevas que dejó el reintento de desgloses de personal (el commit `fbb3382ed6` dice 43): hoy `node tools/cola.mjs` no lista ningún caso británico (28 casos, todos de Colombia): sin comprobar si se contestaron o se perdieron; mirar `node tools/lote.mjs --lista Admin/lotes/lote-143.txt` antes de cargar.
- [ ] Las 13 altas: `node tools/lote.mjs --lista Admin/lotes/lote-143.txt --ejecutar --cargar --pagar-ia-xhtml "<motivo>"`. Después de cada alta: ficha, color, escudo (`escudoOk` null = sin mirar), estadio y sponsor, perímetro (group accounts: perímetro consolidado, regla 1 de `Admin/CONVENCIONES-DATOS.md`), gestiones (presidentes, en la cola, no frenan) y las líneas del auditor (`node tools/auditoria.mjs --pendientes`).
- [ ] Hibernian en su propio lote de Escocia (un país por lote; `Admin/lotes/lote-144.txt` es de Dinamarca, así que hay que armar uno nuevo; `lote-143.txt` todavía dice «Hibernian en el 144»). Los OH Leuven 2017 y 2022 (Bélgica) también quedan viejos por su `.md` cambiado.
- [ ] Falkirk 2025 (`Clubes/Escocia/Falkirk/falkirk-group-accounts-2024-25-ixbrl.md`): crear Scottish Championship en `data/leagues.js` (`club-sourcing` 0.4; hoy solo existe `gb-scottishpremiership`) y cargar con su publicNote y el EJEMPLO-CATEGORÍA de la regla del goodwill negativo (`reglas-categoria.mjs --escribir`; `Admin/CONVENCIONES-DATOS.md`).
- [ ] Los otros años de esos clubes (hoy `node tools/lote.mjs --lista Admin/lotes/lote-143.txt` los avisa como transcriptos sin localizar) y los años pagables de las altas hechas: Ross County 2022-24 (su alta no está en `data/clubs.js`: sin comprobar), Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 (su alta puede entrar por 2023-24), Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24 y Wigan 2022-23, con las respuestas del lote anterior como precedente. Se presupuestaron ~US$ 8: sin comprobar si sigue valiendo (ensayo gratis antes de cada corrida).
- [ ] Criterio a escribir: la cuota que cobra el Trust dueño (Wimbledon, Exeter) no cuenta como cuota de socios (se contestó «no»). Es regla de un país: va a Admin/paises/gb.md (no existe todavía; el título nombra el país), por votación (`votacion-de-criterios`) o precedente. `Admin/CONVENCIONES-DATOS.md` no menciona «Trust».
- [ ] Daneses que esperan (el punto 413 ya no existe; 445 solo cubre SønderjyskE 2022-24): Hvidovre 2025, Brøndby 2025 (−130,578 M; hoy cargado 2020-2021 según `Admin/ESTADO-clubes.md`) y el PSE de København 2021-23 (cargado 2024-2025), y los 9 de 2025-26 cuyo PDF de Chrome sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg). Sin comprobar cuáles siguen faltando: `Admin/ESTADO-clubes.md` y `Clubes/Dinamarca/`.
- [x] Cargados: AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham, Lincoln City y Shrewsbury Town 2025, y Wigan Athletic 2024 (`data/gb/*.json`).
Terminado cuando: cada club británico con iXBRL que presenta y el sitio no tiene está cargado o descartado con motivo (los 13 del lote 143, Hibernian y Falkirk), Scottish Championship existe en `data/leagues.js` y la regla del Trust está escrita.

Verificar: existe data/gb/blackpool-gb.json
Verificar: existe data/gb/oxfordunited-gb.json
Verificar: existe data/gb/hibernian-gb.json
Verificar: existe data/gb/falkirk-gb.json
Verificar: contiene data/leagues.js | Scottish Championship
Verificar: contiene Admin/paises/gb.md | Trust
Verificar: manual

### 21. 337 · las 5 grandes ligas, Brasil y Argentina bien cargadas, con Mistral (medido; falta tu decisión de umbral y presupuesto)

ANTES DE DIFUNDIR: LAS GRANDES LIGAS BIEN CARGADAS (pedido de Guido, 2026-10-20). No se difunde nada (313) hasta tener bien cargadas
Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Primero medir qué falta por liga
(clubes y años, con `tools/faltantes-liga.mjs` y `Admin/ESTADO-clubes.md`) y proponerle a Guido el umbral de «bien cargada». Ojo: completar
se transcribe con Mistral (Guido, 2026-10-20: excepción a la regla de no transcribir, solo para estas ligas).
Medido (Onboarding 7, 2026-10-20; detalle en `Admin/Archive/sesion-onboarding-2026-10-21.md`): club-años 2021-25 cargados: Premier 74/100, Serie A 72/100,
Brasil 46/100, Bundesliga 24/90, LaLiga 18/60, Argentina 32/138, Ligue 1 0. Propuesta: umbral 90% (Argentina 60%) cargado o cerrado
con motivo; ~US$160. Abiertas: el umbral y la plata (Guido); Ligue 1 desde el DNCG (criterio a la Auditora); listas de equipos que
faltan (Pipeline).

Verificar: manual

### 22. 313 · contenido y difusión: X, Instagram y material para periodistas y sponsors (después del 337)

CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
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

Verificar: manual

### 23. 335 · mails a clubes

MAILS A CLUBES (une el 51, el 282 y el 326, Guido 2026-10-20). Todo lo que implique escribirle a un club vive acá. Nadie manda ni redacta
un mail sin que Guido lo pida en sus palabras.
(a) Proceso: Etapa 1 lista y probada de punta a punta (Resend, `outreach.financeofsports.com`, cola en `Admin/outreach/`, envío desde
la terminal de Guido con `tools/outreach-send.js`); el flujo, en la skill `club-outreach`. Etapa 2 (disparo automático: 3 preguntas
acumuladas o 90 días; follow-up y cooldown) documentada, no prendida. Cuándo amerita un mail: `club-sourcing`, sección 0.3.
(b) Check-in a los 30 días, el 2026-10-24: `Admin/outreach/checkin-2026-10-24.md` (hay una tarea programada que lo pregunta).
(c) Informes del auditor que faltan: 56 que no están en ningún PDF nuestro (`node tools/auditoria.mjs --pendientes`, "FALTA EN EL
PDF"), casi todos sin canal público; entre ellos Go Ahead Eagles 2025. Roma 2022 queda así por decisión de Guido (no hay informe del
consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025 cambian de informe (los dos están bajados).
(d) Las preguntas a cada club: `Admin/dudas-por-club.md`.

Verificar: manual

### 24. 460 · (Contenido, con Pantallas, prioridad baja): una página de blog: sumar nuestros datos a lo que dicen los informes de UEFA, Deloitte y similares

Pedido de Guido (2026-10-26): hacer eventualmente una página de blog (la ruta se decide con Pantallas) que tome lo que dicen informes como el de UEFA (*The European Club Finance and Investment Landscape*) o la Money League de Deloitte y le agregue lo que dicen NUESTROS datos. No se toman cifras de esos informes para cargarlas en el sitio ni para compararlas con nuestros clubes como control de calidad; es contenido de blog. Ya está guardado el informe de UEFA 2025: `Admin/informes-externos/uefa/ecfil-2025.md` (transcripción de Mistral, 112 páginas) y su `README.md` dice qué trae (no trae ingresos por club; trae KPI por liga y país). Falta: elegir qué liga o tema abre el primer artículo, qué de nuestros datos lo completa (cobertura de la liga en el sitio, ingresos por rubro de los clubes cargados), diseño de la página (Pantallas, mockup antes; la skill `contenido-y-difusion-finance-of-sports` es el criterio de lo que se publica con un dato), la fila del informe en `Admin/fuentes-externas.md` y sus términos de uso, y la Money League de Deloitte (aún sin bajar). Va antes del punto de la API.
Terminado cuando: existe la página de blog con al menos un artículo que cita el informe externo con su fuente y suma datos del sitio, con el mockup aprobado por Guido y la fila del informe en `Admin/fuentes-externas.md`.

Verificar: manual

### 25. 249 · API en dominio propio (necesita antes el contrato de datos del 257, el índice partido del 258 y la carga del 337)

API EN DOMINIO PROPIO (mejoras de proyecto, pedido de Guido 2026-10-16). El Worker está en una cuenta personal (square-sky-ca25.guidomamone91.workers.dev). Una API, si se hace, va en
api.financeofsports.com desde el primer día. No construirla ahora. Un ejercicio convertido con una cotización de BCRA,
SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso
(`Admin/fuentes-externas.md`, "Consecuencias").

Verificar: manual
