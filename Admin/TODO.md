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

### 1. 463 · (Onboarding, con Pipeline y Auditora): SIIS de Colombia: cargar los clubes con años pendientes

Cargar con SIIS los años de los clubes colombianos que todavía no están. Cómo se carga un club: `Admin/paises/co.md`, «Pipeline de Colombia: los estados de SIIS», y `node tools/club-siis.mjs "<Club>"` (dice qué falta y con qué comando; después `--preparar`, los tres subagentes y `--avanzar --ejecutar --cargar --en-segundo-plano`). Qué está cargado y qué falta de cada club: `node tools/club-siis.mjs` sin nombre.
Decisiones vigentes: el estado de resultados y el balance de SIIS son el estado primario oficial de un club colombiano; un año que SIIS tiene y no tiene PDF útil se carga igual (rubros grandes y resultado); la tool, los chequeos (`tools/audit-chequeos-siis.js`, dentro de `audit.js`) y la regla viven en el pipeline. Lo que quedó pendiente de los clubes ya cargados y los hallazgos de las tools: Admin/mediciones/463-hallazgos-20-club-anios.md y el punto 479.
- [x] Cargados: Deportes Tolima, La Equidad, Águilas Doradas, Atlético Bucaramanga, Independiente Medellín, Leones FC, Fortaleza CEIF, Once Caldas, Boyacá Chicó, Unión Magdalena, Alianza FC, Deportivo Pereira, Deportivo Cali, Cortulua, Tigres FC, Atlético FC, Real Cartagena, Cúcuta Deportivo, América de Cali, Orsomarso, Atlético Huila, Barranquilla FC, Bogotá FC, Envigado (2016 a 2024) y Atlético Nacional (2015 a 2024), Jaguares y Real Santander (2016 a 2025) (`node tools/club-siis.mjs` da el detalle).
- [ ] Lo que dejaron Jaguares y Real Santander: gestiones `confirmada:false` (criterio en el 479, P3); sponsor `sin-fuente` en los 20 años (FKA sin campo «Sponsor»); marca de Real Santander 2016 y 2017 sin cargar (Wikipedia y FKA discrepan); dictámenes que SIIS no tiene (Jaguares 2016 a 2019 y 2021; Real Santander 2016 a 2019); estadio de Jaguares 2016 de Wikidata (nombre actual).
- [ ] Independiente Santa Fe: 9 años por cargar (`node tools/club-siis.mjs "Independiente Santa Fe"`; 1 de 10 cargado).
- [ ] Junior de Barranquilla: 9 años por cargar (1 de 10 cargado; el inventario marca años de SIIS sin PDF nuestro: 2017, 2018, 2020, 2021 y 2022).
- [ ] Llaneros: 9 años por cargar (1 de 10 cargado).
- [ ] Millonarios: 10 años por cargar (1 de 11 cargado).
- [ ] Boca Juniors de Cali: 10 años (2016 a 2025), sin alta.
- [ ] Deportes Quindío: 10 años (2016 a 2025), sin alta.
- [ ] Patriotas Boyacá: 10 años (2016 a 2025), sin alta.
- [ ] Caimanes de Barranquilla (baloncesto): 9 años en SIIS, sin alta; entra por el 464 si Guido abre el baloncesto.
- [ ] Valledupar FC (NIT 824006447): 10 años (2016 a 2025), sin alta ni entrada en `tools/siis-clubes.json`.
- [ ] Cóndores de Cundinamarca (baloncesto, NIT 900695572): 2 años (2021 y 2022), sin alta; va por el 464.
- [ ] Corsarios: 4 años en SIIS; `node tools/club-siis.mjs "Corsarios" --evaluar` dio REVISAR (decidir si se carga o se descarta con motivo).
- [ ] Titanes de Barranquilla (baloncesto, 5 años) y Toros de Córdoba (béisbol, 6 años): van por el 464.
- [ ] Sin comprobar, ¿hay más de lo que ya encontramos en SIIS? Las 66 sociedades salen de tres CIIU deportivos (R9312, R9319 y R9311). Falta buscar sociedades de clubes con otra actividad principal: consultar `siis_empresas` por nombre («fútbol», «deportivo», «club», «F.C.») sin filtrar por CIIU y cruzar con `tools/siis-clubes.json`.
- [ ] Sin comprobar: clubes de la Primera A y de la Primera B de cada año (`data/club-leagues/co.js` y las listas de `tools/club-league-reference/`) que no tengan NIT en `tools/siis-clubes.json`. `Admin/sourcing/Colombia/_notas-generales.md` nombra Deportivo Pasto y Universitario Popayán; lo que no deposita en SIIS (una corporación sin ánimo de lucro) va por sourcing (`club-sourcing`).
- [ ] Real Sincelejo: descartado (sin actividad: ingresos 0 en todos los años); queda como cierre del ítem, sin trabajo.
Terminado cuando: cada club de la lista está cargado o descartado con su motivo, y las dos preguntas «sin comprobar» están respondidas.

Verificar: existe tools/siis-estado.mjs
Verificar: audit siis-faltante = 0

### 2. 481 · (Pipeline, prioridad 3): Acelerar medir-pipeline sin perder lo que mide

`node tools/fos.mjs cerrar-tool` tardó 24 min 16 s en el último cambio (ocho tools; seis medidores; lotes chico, mediano y completo, cada uno «antes» y «después»), y un cambio solo de texto paga el mismo lote completo que uno de lógica. Se quiere bajar ese tiempo sin que la medición deje de encontrar lo que hoy encuentra. Lo que no se negocia: una medición acelerada tiene que dar el mismo veredicto que la lenta sobre los cambios ya medidos (`Admin/registros/mediciones-pipeline.jsonl`).
- [ ] Medir dónde se va el tiempo: `node tools/duraciones-mediciones.mjs` (por medidor y nivel) y un perfil de una corrida real (qué parte es el «antes», cuál el «después», cuánto cuesta cada medidor por documento).
- [ ] Reutilizar el «antes»: guardarlo por commit y por clave de lote (la tool ya tiene una clave de caché: `node tools/fos.mjs probar medir-pipeline`) para que dos mediciones sobre el mismo HEAD no lo repitan.
- [ ] Correr los medidores independientes en paralelo (alta, cargar, audit, escribir, contexto no comparten escritura; los que tocan `Admin/registros/` se revierten por medidor: comprobar que el revertido no se pisa).
- [ ] Medir solo lo afectado: hoy «25 familias afectadas de 25» para un cambio de salidas; un cambio que no toca lectura ni categorías no necesita el lote completo si el veredicto de `fos patron` lo clasifica como infraestructura sin documentos.
- [ ] Comparar cada aceleración con la medición lenta sobre los últimos cinco cambios medidos: mismo veredicto y mismas diferencias; si una diferencia desaparece, la aceleración se descarta.
Terminado cuando: una medición de un cambio como el último baja de 24 min a menos de la mitad con el mismo veredicto, y la comparación contra la lenta está en el documento del punto.

Documento: Admin/mediciones/481-acelerar-medir-pipeline-sin-perder-lo-que-mide.md
Verificar: manual

### 3. 484 · (Pipeline, hermano del 481): Por qué medir un cambio en cola.mjs tarda unos 50 minutos y cómo bajarlo

Medir un cambio de `cola.mjs` estima unos 50 minutos (15 pasos de medidores, lotes chico, mediano y completo, cada uno antes y después): ver el plan con `node tools/medir-pipeline.mjs --ensayo` y el avance con `node tools/fos.mjs progreso`. Lo usan todas las etapas, así que ningún medidor se salva; el cambio que lo mostró era solo de lo que `cola.mjs` imprime al listar (un resumen al final) y ningún medidor ejecuta ese tramo. Es el caso chico del 481: acá se estudia qué hace que un cambio de una tool compartida pague todo el plan.
- [ ] Medir el plan real de `cola.mjs`: qué medidores y qué lote elige `tools/pipeline-tools.json` para ella y cuánto tarda cada uno (`node tools/duraciones-mediciones.mjs`).
- [ ] Comprobar si algún medidor ejecuta el tramo de `cola.mjs` que solo corre como programa (`if (import.meta.url === …)`, el listado): si ninguno lo hace, un cambio ahí no necesita ningún lote, solo correr la tool y comparar su salida.
- [ ] Clasificar el cambio por lo que toca (solo el listado, una función de lectura, una de escritura) y medir solo los medidores que ejercitan esa parte, con una regla que la tool pueda aplicar sola y que el veredicto de `fos patron` firme.
- [ ] Partir `cola.mjs` (41 KB) en lectura y listado por un lado y escritura de respuestas por otro, con `node tools/fos.mjs mover`, para que un cambio de listado no pague el plan de la escritura.
- [ ] Comparar cada recorte con la medición lenta sobre los cambios de `cola.mjs` ya medidos (`node tools/fos.mjs changelog historial cola.mjs`): mismo veredicto y mismas diferencias, o se descarta.
Terminado cuando: un cambio solo de listado en `cola.mjs` se mide en minutos con el mismo veredicto que la medición completa, y la regla está en `Admin/PIPELINE.md`.

Documento: Admin/mediciones/484-por-que-medir-un-cambio-en-cola-mjs-tarda-unos-50-.md
Verificar: manual

### 4. 479 · (Pipeline, con Onboarding): SIIS de Colombia: lo que las tools no imprimen y cada subagente reconstruye (hallazgos de cargar 20 club-años, 463)

Cargar Jaguares y Real Santander (20 club-años, 28-10-2026) dejó 20 hallazgos de las tools y nueve propuestas de proceso, todas de salida, nombre legal o texto de briefs (ninguna toca un dato publicado ni una compuerta): `Admin/mediciones/463-hallazgos-20-club-anios.md`. Un cambio a una tool del pipeline se mide antes y después (`cerrar-tool`).
- [x] Hecho y medido: P1 nombre legal del alta normalizado; P4 `--ejemplo`, `--agregar` y `--pendientes --club` del auditor; P5 salida honesta de los ensayos; P6 alias y pista de liga en `club-siis`; P7 `--informe-anual` y `validar-contexto`; P8 y P9 (briefs y `lookup-brand-color`); el brief de subagentes con cierre obligatorio (`brief-tool`).
Documento: Admin/mediciones/463-hallazgos-20-club-anios.md
- [x] Criterio de las gestiones sin nota de inicio o de salida (P3): queda `confirmada:false` (lo más fiel al documento y no mueve ninguna cifra); un presidente nombrado por notas fechadas en años sueltos no confirma los cierres en los que ninguna nota lo nombra. La regla está en `Admin/ARQUITECTURA.md`, «GESTIONES».
- [x] Dos dudas de los subagentes: el auditor «en representación de» una firma va como firma (la persona en la nota), y la continuidad con una recomendación sin «incertidumbre material» es `false` (`Admin/CONVENCIONES-DATOS.md`, «el dictamen del auditor»).
- [ ] `todo.mjs --nuevo --doc` crea el documento en Admin/mediciones/ y `audit.js` lo avisa como `medicion-sin-destino` hasta que alguien lo lista en `Admin/mediciones/README.md`: que la tool agregue la fila (o que el chequeo cuente un `Documento:` del TODO como destino).
- [ ] `tools/dictamen-fechas.mjs` toma como «firma más reciente» una fecha del comparativo cuando el dictamen no trae fecha de firma (Envigado 2017 y Atlético Nacional 2015 salen como `dictamen-fechas-ajenas` siendo del ejercicio correcto): que ignore las fechas de «al 31 de diciembre de AAAA y AAAA» y avise «sin fecha de firma».
- [ ] `tools/lookup-brand-color.js` tiene 41 líneas de cabecera (el límite es 40, `cabecera-larga-en-tools`): achicarla junto con el próximo cambio medido de una tool que mida lo mismo (comentario solo: igual obliga a medir).
- [ ] `alta-club.mjs --resumen` (el ensayo) escribe: agrega a `Admin/registros/altas-club.jsonl` («pedido de Guido» según el código) y, para un club nuevo, encola la pregunta del nombre en `Admin/registros/cola-revision.jsonl` (`camposDelClub` llama a `decidirNombre` sin `escribirCola:false`, en `tools/alta-club-analisis.mjs`). Un ensayo no debería escribir la cola; decidir si el registro de altas es lo que Guido pidió o también se evita.
- [ ] Sin comprobar con una corrida real: «marca discrepa» de `sponsor-fka.mjs` (no apareció en ninguna salida; el caso es Real Santander 2016 y 2017), `--todos` con Exa en un club sin entrada en `contexto-manual.json` (solo se probó en ensayo) y las fichas juveniles o de reserva.
- [ ] `Admin/briefs-subagentes-tools.md`, punto 4 del cierre: dice `node tools/fos.mjs probar <tool>`, pero `fos probar` solo acepta los nombres de prueba que lista; que diga «`node tools/fos.mjs probar` lista las pruebas; corré la que nombra tu tool (`ls tools/probar-*`)».
- [ ] El brief de gestiones (`node tools/club-siis.mjs "<Club>" --brief gestiones`) dice que el motivo de una gestión sin confirmar va en `fuente`, pero `Admin/ARQUITECTURA.md` define `fuente` como una URL y manda el porqué a `Admin/carga-clubes/<club>.md`: unificar dónde va el motivo.
- [ ] P2: la cola lista las preguntas de gestión sin cubrir en un renglón por club con los ids para contestarlas en bloque. El cambio está escrito como parche en `Admin/propuestas/479-cola-resumen-de-gestiones.patch` (solo imprime; lo cuenta el 484: medirlo en `cola.mjs` cuesta unos 50 minutos, así que se mide junto con otro cambio de `cola.mjs`).
Terminado cuando: cada propuesta está hecha (con su medición) o descartada con su motivo, y la votación del criterio de gestiones está resuelta.

Verificar: manual

### 5. 466 · (Onboarding, con Pantallas): mapa visual del onboarding de un club (sin sourcing), con sus dos caminos

Guido pidió un mapa visual, con forma de workflow, del onboarding de un club sin el sourcing: desde que el PDF o el estado de SIIS está en la carpeta hasta el año publicado con su línea del auditor. Que se vea de un vistazo qué corre cada paso y qué lo cuida, para que una sesión no tarde una hora en cargar un solo club por no tenerlo a la vista. Dos caminos en el mismo mapa: el PDF (etapas de `Admin/PIPELINE.md`) y el de SIIS (`tools/club-siis.mjs`). Se hace con el widget de diagramas o con un Artifact (la skill `producto-y-pantalla-finance-of-sports` no aplica: no es del sitio).
- [ ] Mapa del camino PDF: por paso, el comando (`node tools/fos.mjs`), la tool, qué archivo lee y a cuál escribe (`Admin/CONTRATO-ETAPAS.md`).
- [ ] Mapa del camino SIIS: lo mismo, con los pasos de `node tools/club-siis.mjs "<Club>"`.
- [ ] En cada paso: qué hook o compuerta lo cuida (`tools/hooks/pre-tool.mjs`, `tools/exigir-medida.mjs`, `tools/audit.js`, `tools/verificar.mjs`), dónde decide un subagente o Guido, si cuesta API o es gratis, y qué commit deja.
- [ ] Publicado como Artifact o como `.html` en `Admin/` (un `.html` interno va dentro de `Admin/`).
- [ ] Citado desde `Admin/PIPELINE.md`, `tools/club-siis.mjs` y el arranque de la skill `club-or-year-onboarding` (cita en la skill: va sola en su commit, con el diff para Guido).
Terminado cuando: existe el mapa, muestra los dos caminos con comando, tool, hook, costo y quién decide en cada paso, y está citado desde `Admin/PIPELINE.md` y el arranque de la skill `club-or-year-onboarding`.

Verificar: manual
Verificar: contiene Admin/PIPELINE.md | mapa del onboarding

### 6. 459 · (Deploy, con Guido, prioridad alta): Supabase se pausó otra vez; el Worker `fos-supabase-ping` no lo mantuvo despierto

MI CUENTA usa Supabase en plan gratis, que pausa el proyecto tras 7 días sin uso. Lo debería mantener despierto el Worker `fos-supabase-ping` (cron cada 3 días que llama a `ping()`; código en `tools/supabase/ping-worker.mjs`, SQL en `tools/supabase/ping.sql`; `Admin/ESTADO.md`, «MI CUENTA»). Guido (2026-10-25): se pausó igual, así que el Worker no corrió o falló. Mientras esté pausado, la pestaña MI CUENTA dice «no disponible».
- [ ] Guido: reactivar el proyecto en el panel de Supabase.
- [ ] Guido: mirar en Cloudflare las corridas del Worker (Logs / Cron Events): sin corridas o con error. El Worker tira error si Supabase no contesta `"ok"`, así que una corrida fallida queda marcada.
- [ ] Guido: confirmar que el Cron Trigger sigue activo (cada 3 días) y que el Worker desplegado es el de `tools/supabase/ping-worker.mjs` (misma `SUPABASE_URL` que `js/cuenta.js`).
- [ ] Confirmar que `ping()` existe y responde: `node tools/supabase/stats.mjs` (llama a `stats()`, solo cantidades).
- [ ] Si la causa es el plan gratis (p. ej. el proyecto se pausa igual con el ping), decidir: otro mecanismo (un ping desde otro cron, p. ej. la tarea programada `fos-auditoria-semanal`) o un plan pago.
- [ ] Dejar `Admin/ESTADO.md`, «MI CUENTA», con el mecanismo que quedó.
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

### 9. 445 · (Auditora, con Guido): SønderjyskE 2022 a 2024 en formato completo: ¿se le pide el desglose al club?

Guido prefiere ver a SønderjyskE en formato completo. Hoy 2025 está completo y 2022, 2023 y 2024 están resumidos («Bruttofortjeneste», margen bruto, balance resumido por la § 32), que es como el club los publicó. Decisión de Guido: no se usa el 2024 del informe 2025, porque ese comparativo está reexpresado (35,30 M contra 37,43 M publicados) y la regla vigente no lo permite si el PDF del año es legible (`Admin/CONVENCIONES-DATOS.md`, «UN COMPARATIVO REEXPRESADO NO ES LA TRANSCRIPCIÓN DEL AÑO»). El porqué y los 3 a 0 de 2025: `Admin/mediciones/413-votacion-formato-completo-vs-reducido.md`. Los informes publicados de 2022 y 2023 no traen el desglose, así que completar los tres años exige pedírselo al club. Lo que mide «completo»: ingresos y gastos brutos (el resultado no cambia); sirve para el tamaño real y la relación sueldos/ingresos.
- [x] Decidido: 2024 queda como el club lo publicó (resumido); no se usa el comparativo del informe 2025.
- [ ] Guido decide si se le pide al club el desglose completo de 2022, 2023 y 2024 (mail, skill `club-outreach`; un pedido por club, no urgente).
- [ ] Si se pide: mandar el mail; si llega el desglose, cargar cada año con `cargar.mjs --reemplazar` (sin comprobar el comando exacto contra la ayuda de hoy: `node tools/fos.mjs ayuda cargar`).
- [ ] Si no se pide: cerrar el punto con «no se pide»; los años siguen resumidos con su nota.
Documento: Admin/mediciones/413-votacion-formato-completo-vs-reducido.md
Terminado cuando: Guido decidió si se le pide el desglose al club y lo decidido está hecho (el mail enviado, o el punto cerrado con «no se pide»).

Verificar: manual

### 10. 338 · (Auditora): correr todas las auditorías del proyecto, una por una (al final de A)

Pedido de Guido: correr cada auditoría que existe y mirar qué queda en P2 y P3 para decidir qué se arregla. Cada ítem es una auditoría distinta; se tilda cuando se corrió y se anotó el resultado. Lo que salga P0 o P1 se arregla antes de seguir. Las decisiones sobre P2 y P3 se registran con `node tools/decision.mjs` (una por código, ver `auditoria-finance-of-sports`, «Lo que queda en P2 y P3»). Las que pagan API o piden criterio de Guido lo dicen.

Cómo se sabe que se corrió: la salida esperada de cada una, y para las de juicio el reporte `auditorias/<AAAA-MM-DD>-<eje>.md` más una línea de `Admin/registros/auditoria-proceso.jsonl`.

**Automáticas (gratis, segundos a minutos)**
- [ ] `audit.js` completo: `node tools/audit.js`. Mira todo el sitio y el proceso (P0 a P4); incluye, sin correrlas aparte, los `--check` de manifiesto, correcciones, sponsors, estadísticas de «cómo corre», índice de fuentes, índice de los .md, CHANGELOG, hallazgos, cargas a mano, esquema del JSON, imports sin export, dictámenes con firma ajena, revisión de taxonomía y calibración de la cola. Se sabe que corrió: la línea `P0 x · P1 y · P2 z · P3 w` con P0 y P1 en 0.
- [ ] Procedencia de los tipos de cambio: `node tools/audit.js --fx`. Lista cada tipo de cambio y de dónde salió. Se sabe: lista sin tipos «sin fuente».
- [ ] Leyenda y estado de las severidades: `node tools/audit.js --leyenda`. Cada nivel con su definición y sus hallazgos de hoy. Se sabe: coincide con la tabla de la skill (no salta `severidades-desfasadas`).
- [ ] Totales en el navegador: abrir el sitio con `?audit=1&cb=<nuevo>` (servidor `fos-local`, de `.claude/launch.json`) o `auditAll()` en la consola. Carga todos los clubes y recorre `computeYearGeneric()` y `verifyTieOuts()`. Se sabe: «0 que no cierran, 0 avisos de tipo de cambio» en consola.
- [ ] Datos publicados contra su JSON: `node tools/generar-data.mjs --check`. Cada `-data.js` es lo que sale de su JSON. Se sabe: exit 0.
- [ ] Estimaciones publicadas: `node tools/estimar.mjs --check`. Lo publicado en `data/estimados/` es lo que da la regla. Se sabe: exit 0.
- [ ] Páginas de club: `node tools/generate-club-pages.js --check`. Páginas viejas, faltantes, sobrantes o fuera de los topes de largo. Se sabe: exit 0.
- [ ] Índice de clubes: `node tools/generate-club-index.js --check`. `Admin/ESTADO-clubes.md` al día. Se sabe: exit 0.
- [ ] Rankings: `node tools/generate-rankings.js --check`. `data/rankings/` al día. Se sabe: exit 0.
- [ ] Página de fuentes: `node tools/generate-fuentes-page.js --check`. `fuentes.html` y `fuentes/<clubId>.html` al día. Se sabe: exit 0.
- [ ] Lista de comandos de `tools/`: `node tools/fos.mjs --check`. Tools sueltas sin registrar en `tools/fos-comandos.json`. Se sabe: «la lista está al día».
- [ ] Puntos del TODO que ya cumplen: `node tools/todo.mjs --verificar`. Cierra los que cumplen su `Verificar:`. Se sabe: ningún `todo-cumplido` ni `todo-sin-verificar` en `audit.js`.
- [ ] Todas las pruebas de tools y hooks: `node tools/fos.mjs probar` (en segundo plano, varios minutos). Incluye la del sello y la de la caja de `audit.js`. Se sabe: exit 0 y fechas nuevas en `Admin/registros/pruebas-corridas.json`.
- [ ] Nombres sin definir en `tools/`: `node tools/fos.mjs indefinidos` (necesita `cd tools && npm install` la primera vez). Se sabe: sin salida de eslint.
- [ ] Producción al día: `node tools/fos.mjs produccion`. Compara el `ASSET_V` publicado con el de `index.html`. Se sabe: atraso 0 (si hay atraso es de Guido: el push es suyo).

**Con juicio (la skill `auditoria-finance-of-sports`, un eje por corrida)**
- [ ] Eje `datos`, por país: el país con «Última auditoría de datos» más vieja en `Admin/sourcing/_indice/<País>.md`; lo que decidió el paso A2 de perímetro se revisa con `node tools/perimetro-senales.mjs --auditar-a2 <carpeta del scratchpad>`. Se sabe: reporte `auditorias/<fecha>-datos.md` y la fecha del país actualizada. Un criterio de datos que falte va a Guido (o a `votacion-de-criterios`).
- [ ] Eje `escala`: skill `escala-finance-of-sports` (mapa de puntos calientes, cada fila con su comando). Se sabe: reporte `auditorias/<fecha>-escala.md`. Pide `audit.js` primero.
- [ ] Eje `codigo`: con el sitio levantado, consola limpia, listeners, gráficos que se destruyen, `loadClubData()` con un club que falla y los toggles combinados. Se sabe: reporte `auditorias/<fecha>-codigo.md`. La tarea semanal lo salta; hay que correrlo en una sesión con el sitio.
- [ ] Eje `docs`: duplicados, lo que se lee sin usarse y lo desactualizado; incluye la memoria de la sesión principal y `node tools/fos.mjs historia` (fechas y «to-do N» en documentos de criterio). Se sabe: reporte `auditorias/<fecha>-docs.md`.
- [ ] Eje `tokens`: `node tools/fos.mjs lecturas --ultimas 5` con la sección 4 de la skill al lado. Solo lee los transcripts. Se sabe: reporte `auditorias/<fecha>-tokens.md` y, si se recorta algo, la tabla antes y después en `Admin/registros/lecturas.jsonl`.
- [ ] Eje `ux`: con el sitio levantado, escritorio y 375 px, recorrer `.claude/skills/producto-y-pantalla-finance-of-sports/referencia/ux.md` sobre Inicio, un club, Comparar, Ligas, una liga y un sponsor. Se sabe: reporte `auditorias/<fecha>-ux.md`; las fallas, como puntos de Pantallas en el TODO.
- [ ] Calibración de la cola (segunda revisión independiente): `node tools/calibrar-cola.mjs`, y por celda pendiente `--muestra 10 --motivo <m> --seguridad <s>`, que la lea un revisor que no ve la respuesta original y se anote con `--registrar`. Gasta tokens de un subagente; no pega a APIs de pago. Se sabe: `audit.js` sin `calibracion-cola-pendiente` y líneas nuevas en `Admin/registros/calibracion-cola.jsonl`.

**Programadas (solo comprobar que corrieron)**
- [ ] Tarea semanal `fos-auditoria-semanal` (lunes 8:10, en `~/.claude/scheduled-tasks/`): `audit.js --quiet`, tableros, un eje y sugerencias. Se sabe: un `auditorias/<fecha>.md` commiteado en la última semana (`ls auditorias`). Gasta tokens de Opus por corrida.

**Después de correrlas**
- [ ] Bajar P2 y P3 con la regla de «Lo que queda en P2 y P3» (un código por corrida, cinco hallazgos de muestra, decisión con `decision.mjs`); lo que deja trabajo va al TODO como punto propio. Criterios de datos sin precedente: votación de tres.

Terminado cuando: cada ítem de arriba está tildado con su salida esperada, y cada código P2 o P3 tiene decisión registrada (arreglar, silenciar con motivo, o sacar el chequeo).

Verificar: audit todo-cumplido = 0
Verificar: manual

### 11. 258 · (Pantallas): índice partido por país o liga, cuando lo que se baja siempre pase 150 KB comprimidos

`data/clubs.js` y `data/club-index.js` crecen por club y los baja todo visitante antes de elegir uno. Partirlos por país o liga no vale la pena todavía; se reabre cuando lo que se baja siempre pase 150 KB comprimidos o esos dos archivos pasen 1 MB crudos. Un cambio de código se mide antes y después (`cerrar-tool`); una condición nueva en `audit.js` pasa por la sección 7 de `auditoria-finance-of-sports`.
- [x] Medido que todavía no llega: `gzip -9c data/clubs.js | wc -c` y `gzip -9c data/club-index.js | wc -c` (suma muy por debajo de 150 KB; `wc -c` de los dos, por debajo de 1 MB).
- [ ] Arreglar el comando de medición de la sección B de `.claude/skills/escala-finance-of-sports/SKILL.md`: busca `src="data/` en `index.html`, pero ahora los archivos de `data/` se piden con `fosDataTag('data/...')` y esa búsqueda solo encuentra `manifiesto.js`. Lista nueva: `grep -o "fosDataTag('[^']*" index.html`. (Texto de una skill: va en un commit propio, lo lee Guido.)
- [ ] Chequeo P3 `payload-eager` en `checkEscala()` (`tools/audit-chequeos-4.js`): suma lo que `index.html` carga siempre (los `fosDataTag(...)` de `data/`), mide el comprimido y avisa al pasar 150 KB, o si `clubs.js` + `club-index.js` pasan 1 MB crudos. Hoy `checkEscala()` solo proyecta bytes crudos (`proyeccion`). Es una condición nueva: sección 7 de la skill, medir con `cerrar-tool` y anotar en CHANGELOG «sin revisión independiente».
- [ ] Si el chequeo avisa: decidir el corte (por país o liga) con `escala-finance-of-sports` antes de tocar nada.

Terminado cuando: el chequeo `payload-eager` está activo y medido, y el comando de la skill lista los archivos de `data/` que `index.html` carga hoy; o, si el aviso salta, el índice está partido y medido.

Verificar: contiene tools/audit-chequeos-4.js | payload-eager
Verificar: no-contiene .claude/skills/escala-finance-of-sports/SKILL.md | src="data/

### 12. 364 · (Pantallas): el registro de correcciones: curar los eventos sin motivo y sumarlo al Data Package

`correcciones.html` y el bloque de Finanzas leen `data/correcciones/` (lo genera `tools/generar-correcciones.mjs` desde el historial de git). El motivo sale del trailer `Corrige:` del commit o de `Admin/registros/correcciones.jsonl`; sin ninguno dice «Motivo no registrado» (nunca se inventa). Los eventos nuevos ya traen trailer; los viejos, de antes del registro, no. Cuántos eventos hay y cuántos tienen motivo: `node tools/generar-correcciones.mjs` (reescribe `data/correcciones/`; sin escribir, `--check`).

- [x] Los tres avisos de `correcciones.html` (`doc-interno-no-excluido`, `raya-larga-visible`, `i18n-incompleto`) están en 0; `corr.th.antes` y `corr.th.despues` están en `data/lang/en.js`.
- [x] El motivo de los eventos nuevos: trailer `Corrige:` obligatorio desde 2026-10-21 (aviso `correccion-sin-motivo`, `Admin/PANTALLA.md`, «Registro público de correcciones»).
- [ ] Curar los eventos viejos sin motivo (los marcados `anterior_al_registro` y los pocos posteriores sin trailer), empezando por los de más impacto (valor, retiros, recargas): una línea por evento en `Admin/registros/correcciones.jsonl` (`{"commit","club","anio","motivo_es","motivo_en","fuente"}`; hoy el archivo no existe). Se escribe para un hincha o un periodista, con subagentes que lean el cuerpo del commit y `Admin/registros/ajustes-manuales.jsonl`. Lo que no se pueda reconstruir con fuente queda como «Motivo no registrado».
- [ ] Decidir si el motivo se traduce al inglés al curar (sin `motivo_en`, la página en inglés muestra el español).
- [ ] `tools/exportar-paquete.mjs` suma el registro al Data Package (hoy no lo menciona); pasa por la skill `contrato-de-datos-finance-of-sports`.
- [ ] Revisar que los tipos «total» y «otro» no tengan ruido de renombres.
- [ ] Un aviso de `audit.js` que mire el tamaño de `data/correcciones/correcciones.json` (`archivo-pesado`, en `tools/audit-chequeos-4.js`, no lo cubre). Se parte por año del evento, con páginas en la vista, cuando el archivo comprimido pase de 150 KB (medido el 2026-10-24: 24 KB comprimido con 718 eventos; el tamaño de hoy, `ls -l data/correcciones/correcciones.json`).

Terminado cuando: los eventos de más impacto tienen motivo curado o quedan marcados sin fuente, el inglés está decidido, el Data Package incluye el registro, el ruido de «total» y «otro» está revisado y el peso tiene su aviso.

Verificar: audit doc-interno-no-excluido = 0
Verificar: audit raya-larga-visible = 0
Verificar: audit i18n-incompleto = 0
Verificar: existe Admin/registros/correcciones.jsonl
Verificar: contiene tools/exportar-paquete.mjs | correcciones
Verificar: manual

### 13. 298 · (Pipeline): lo que dejó el onboarding de Estonia y Bélgica en las tools: que el alta tome la liga de la revisión

Lo que sigue abierto de las mejoras de tool del onboarding de Estonia y Bélgica. El detalle de cada letra: `Admin/Archive/sesion-onboarding-2026-10-18-4.md` (a a q) y `-5.md` (s a v); lo descartado con motivo, `Admin/HALLAZGOS-pipeline.md`. Un cambio a una tool del pipeline se mide antes y después (`cerrar-tool`).

- [x] Hechas, hechas con otro mecanismo o descartadas con motivo: todas las demás letras (verificadas el 2026-10-28; `git log --oneline --grep="298"`).
- [ ] k: `alta-club.mjs` y `cargar-lote.mjs` no usan las `ligas` de `Admin/registros/altas-revision.jsonl` (`cargar-lote.mjs` solo toma `brandColor` de la revisión); el alta saca la liga de la caché `tools/club-league-reference/<iso>.json`, así que un club sin caché queda con liga null. Escalón chico: que el alta tome la liga de la revisión cuando no hay caché. Sin comprobar contra `alta-club.mjs` de hoy.
- [ ] u2, el resto (sin comprobar): si la tool que arma las listas de ligas sigue perdiendo a Beerschot Wilrijk en la First Division B 2017-18 y 2018-19 (baja 7 de 8; aparece en `tools/club-league-reference/be.json`). OH Leuven 2017-2018 no están cargados, así que no hay dato que etiquetar.
- [ ] g2 (condicional): partir en la cola cualquier fila mixta según su nota, solo si aparece otra sin códigos. Si no aparece otra, se descarta con motivo en `Admin/HALLAZGOS-pipeline.md` (hoy no figura ahí).

Terminado cuando: k está hecha y medida, y u2 y g2 están hechas o descartadas con su motivo en `Admin/HALLAZGOS-pipeline.md`.

Verificar: manual

### 14. 482 · (Onboarding): Bélgica: cargar Anderlecht 2011, Sint-Truiden 2013 y Zulte Waregem 2012 (ejercicios de más de 12 meses)

Tres ejercicios de transición de más de 12 meses que el diseño ya acepta (se cargan como el año del cierre, con los importes tal cual y `publicNote`; `Admin/CONVENCIONES-DATOS.md`, regla de los ejercicios largos). Los clubes tienen hoy solo 2025 en `data/be/`; los PDF y `.md` de los tres años están en `Clubes/Bélgica/<club>/`.

- [ ] Anderlecht 2011 (16 meses): `Clubes/Bélgica/Anderlecht/jaarrekening-2011-06-30-individual.md`.
- [ ] Sint-Truiden 2013 (15 meses): `Clubes/Bélgica/Sint-Truiden/jaarrekening-2013-06-30-individual.md`.
- [ ] Zulte Waregem 2012 (17 meses): `Clubes/Bélgica/Zulte Waregem/jaarrekening-2012-06-30-individual.md`.
- [ ] Al cargar Anderlecht 2011, corregir `Admin/CONVENCIONES-DATOS.md` (hoy dice «Anderlecht 2011 (16 meses) ya cargado» en dos lugares, y no lo está).

Terminado cuando: los tres años están en el JSON de su club con `publicNote`, verificados contra el total oficial, y `CONVENCIONES-DATOS.md` ya no dice que Anderlecht 2011 está cargado sin estarlo.

Verificar: contiene data/be/anderlecht-be.json | "fiscal_year": 2011
Verificar: contiene data/be/sinttruiden-be.json | "fiscal_year": 2013
Verificar: contiene data/be/zultewaregem-be.json | "fiscal_year": 2012
Verificar: no-contiene Admin/CONVENCIONES-DATOS.md | Anderlecht 2011 (16 meses) ya cargado

### 15. 483 · (Auditora, con Guido): Decisiones belgas y de gasto que quedaron de la 298 (ajustes con error chico, Gales e Irlanda del Norte, Mistral)

- [ ] t2 (no verificada): los años belgas con ajustes `fila` y el escalón NBB sin correr cerraron por tolerancia con errores chicos: Patro Eisden 2025 (ingresos +1.810, gastos +4.012), Lommel SK 2025 (gastos +172) y Lommel SK 2018 (−182 de financiero). Decidir si se corrigen (escalón: correr el NBB también con ajustes si el resultado sigue exacto) o se aceptan con motivo.
- [ ] Gales e Irlanda del Norte en el selector (decisión de pantalla): `data/leagues.js` solo comenta cómo se haría `WAL`. No hay clubes galeses ni norirlandeses cargados; se retoma con el primero.
- [ ] Documentos viejos sin tablas que se rehacen con Mistral (`tools/pipeline.mjs` imprime cuántos hay): la tanda `Admin/lotes/sin-tablas-298e.txt` ya se corrió; cuántos quedan, sin comprobar. Si quedan, el gasto es de Guido (la tanda anterior costó unos US$ 40 contra US$ 7 del ensayo).

Terminado cuando: cada ítem está decidido (hacer, descartar con motivo en `Admin/HALLAZGOS-pipeline.md`, o gasto aprobado o rechazado).

Verificar: manual

### 16. 365 · (Auditora, con Onboarding): Lierse Kempenzonen 2022: cargarlo o descartarlo, y cerrar el silenciamiento

Lierse son dos clubes: la vzw (`liersekempenzonen-be`, con 2018 a 2021 cargados) y la NV sucesora (`liersesk-be`, con `predecessor_id`). Falta decidir el ejercicio 2022 de la vzw.

- [x] Lierse son dos clubes con `predecessor_id` (355).
- [x] 2023-2025 de la vzw: sin depósito en la BNB (chequeo 2026-10-21); `ejercicio-sin-rastro` está silenciado en `tools/audit-ignore.json` con la cita de la nota de sourcing.
- [ ] Decidir 2022 (la Auditora, con Guido): el balance abreviado de la vzw está en `Clubes/Bélgica/Lierse Kempenzonen/jaarrekening-2022-06-30-individual.md`, margen bruto −2.369 EUR, casi sin actividad porque la NV ocupó su plaza. Opciones: cargarlo (como 2018 a 2021; la liga de la NV esa temporada es `be-challengerproleague`, y hay que decidir si la vzw la hereda) o descartarlo con motivo en `Admin/sourcing/Bélgica/Lierse Kempenzonen.md`.
- [ ] Al decidir: actualizar el motivo de `tools/audit-ignore.json` (la entrada de `liersekempenzonen-be:` dice «lo decide el 365, que sigue abierto») y dejar `ejercicio-sin-rastro` de ese club en 0.

Terminado cuando: 2022 está cargado o descartado con motivo, y el motivo del silenciamiento ya no dice que el 365 sigue abierto.

Verificar: no-contiene tools/audit-ignore.json | lo decide el 365, que sigue abierto

### 17. 452 · (Pantallas, con Contenido): particularidades contables clave en `metodologia.html` (balance resumido, cierre, perímetro, sin socios, tipo de cambio), sin curso de contabilidad

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

### 18. 372 · (Auditora, prioridad baja): decidir si lo que reparte la federación o la liga con nombre de «subsidio» entra a Subsidios y donaciones

Las etiquetas de subsidios que quedaron excluidas de `grants_donations` en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas, no una confianza baja de Jev: mezcladas con otro concepto, solidaridad de la federación o la liga (`competition_bonus`), subvención de capital imputada, impuestos y deducciones. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo. Guido no las revisa una por una: el proceso es `node tools/fos.mjs etiquetas`.
- [x] Lista corta de 24 etiquetas decididas por Guido (13 a Subsidios y donaciones, 11 quedan en Otros ingresos): commit `cf38f19df9`.
- [x] El JSON de decisiones no tiene etiquetas por revisar (`revisar` y `guido` vacíos en `tools/subsidios-etiquetas.json`).
- [ ] Criterio de lo que reparte la federación o la liga cuando el documento lo llama «subsidio», «toetus» o «contributi» (EJL, Eesti Jalgpalliliidu, Contributi Federali, Contributi da Leghe e Enti Federali, LNPA/LNPB, Subsídios Associações/FPF/Liga, FPF/LPF de Oliveirense; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`): votación con `votacion-de-criterios`, con la tabla de `node tools/fos.mjs filas` como evidencia. Si alguna entra, se recategoriza con `node tools/fos.mjs etiquetas --categoria grants_donations` y se mide.
- [ ] La decisión escrita en `Admin/CONVENCIONES-DATOS.md`, en la REGLA «subsidios, donaciones y aportes van a `grants_donations`», con el caso.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso).

Verificar: contiene Admin/CONVENCIONES-DATOS.md | REGLA: lo que reparte la federación o la liga

### 19. 377 · (Onboarding, con Pipeline): Alemania: años cargados sin verificación (RB Leipzig, Hamburger SV, DFL) que las listas de prueba no cubren

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

### 20. 464 · (Onboarding, con Pantallas y Contrato de datos): abrir con SIIS los clubes de baloncesto y béisbol de Colombia

SIIS tiene el estado de resultados de clubes de baloncesto y béisbol colombianos; no se cargan hasta que Guido active cada deporte (`Admin/PIPELINE.md`, «Un deporte nuevo»). Hoy `SPORTS` en `data/leagues.js` tiene `basquet` inactivo y no tiene béisbol. Lista de clubes, NIT y años: `Admin/sourcing/Colombia/siis-inventario.md` (generado; ahí están por razón social los de R9312 y R9319).

- [x] Estados de SIIS de Toros de Córdoba adelantados (`Clubes/Colombia/Toros de Cordoba/siis-estado-*`); la carga espera la activación del béisbol.
- [ ] Guido decide qué deportes se activan (baloncesto, béisbol) y con qué taxonomía; activar es suyo (`catalogo-liga.mjs --activar-deporte` pide una línea DECIDIDO).
- [ ] Sumar a `tools/siis-clubes.json` los NIT que faltan: Gigantes de Barranquilla (901330760), Frastbreak Basketball Club (901123128), Bogotá Piratas (900720607) y el NIT 900721306, cuya «razón social» en el inventario es una descripción del objeto social (confirmar de qué club es antes de darlo de alta). Ya están Titanes, Toros de Córdoba y Caimanes.
- [ ] Alta de esos clubes (`alta-club.mjs`, que pregunta el deporte) y su carpeta en `Clubes/Colombia/` (Titanes, Toros y Caimanes ya tienen).
- [ ] Carga de una carga de prueba de un club del deporte antes del primer lote (`Admin/PIPELINE.md`, «Un deporte nuevo»), después `node tools/siis-estado.mjs --club "<Club>" --todos --escribir` y el pipeline de siempre.
- [ ] Pantallas y Contrato de datos si el deporte cambia algo visible o público.

Terminado cuando: Guido decidió qué deportes se activan con SIIS y los clubes de esos deportes con estado en SIIS están cargados, o quedó escrito por qué no.

Verificar: manual

### 21. 357 · (Pantallas, con Auditora y Contrato de datos): mostrar las inyecciones de capital de los dueños

El aporte, aumento de capital o préstamo de dueños o socios va al patrimonio o a la deuda, no al resultado, y el sitio hoy no lo muestra. `Admin/CONVENCIONES-DATOS.md` («subsidios, donaciones y aportes») ya deja afuera de `grants_donations` el aporte que el documento lleva al patrimonio neto.

- [ ] Medir (Auditora o Pipeline): en cuántos club-años el documento imprime la inyección (estado de cambios en el patrimonio, flujo de fondos o notas) y con qué rótulos, por país. Sin comprobar: no existe hoy una tool ni un campo que lo mida.
- [ ] Pantallas propone dónde se ve, con mockup para el ok de Guido (skill `producto-y-pantalla-finance-of-sports`).
- [ ] Si suma un campo al JSON: skill `contrato-de-datos-finance-of-sports` antes de tocar `data/schema/`.

Terminado cuando: hay una medición por país de dónde se imprime la inyección, Guido aprobó (o descartó) un mockup y, si se aprobó, la pantalla la muestra con su verificación.

Verificar: manual

### 22. 420 · (Onboarding, con la Auditora): cargar los británicos en iXBRL: lote 143 y Hibernian, los años pagables, Falkirk, las altas

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

### 23. 337 · (Onboarding, con Guido): las 5 grandes ligas, Brasil y Argentina bien cargadas, antes de difundir (313)

Antes de difundir (313) hay que tener bien cargadas Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão Série A y la Primera argentina. Mistral es el motor de transcripción (`Admin/PIPELINE.md`, «Documentos fuente»); en estas ligas se transcribe lo que falte.
- [x] Medir qué falta por liga: `node tools/faltantes-liga.mjs --print` (por liga y año) y `Admin/ESTADO-clubes.md` (por club).
- [ ] Decide Guido: el umbral de «bien cargada». Recomendación: 90% de los club-años 2021-25 cargados o cerrados con motivo (Argentina 60%, por la falta de balances públicos).
- [ ] Decide Guido: el presupuesto de transcripción con Mistral. Recomendación: US$160, el estimado de la medición (sin recomprobar contra la medición de hoy).
- [ ] Ligue 1: no hay lista de equipos (tools/club-league-reference/fr.json) ni clubes en `data/`. Armar la lista (Pipeline) y cargar desde el DNCG; el criterio de ese informe va a `votacion-de-criterios`.
- [ ] Completar las listas de equipos que faltan en las otras seis ligas: `node tools/faltantes-liga.mjs --print`, secciones «Nombres sin unir» y «Clubes … que la lista no reconoce».
- [ ] Cargar o cerrar con motivo los club-años que falten hasta el umbral, liga por liga (rol Onboarding, `club-or-year-onboarding`).
Terminado cuando: cada una de las siete ligas llega al umbral que Guido decida, con los club-años restantes cerrados con motivo, y Ligue 1 tiene lista y datos.

Verificar: manual

### 24. 313 · (Contenido, con Pantallas): difusión: X, Instagram y material para periodistas y sponsors (después del 337)

Promocionar el sitio con publicaciones propias. Nada sale antes del 337 (las siete ligas bien cargadas). Cada idea se diseña de a una, con el ok de Guido.
- [x] Skill de contenido y difusión: `.claude/skills/contenido-y-difusion-finance-of-sports/SKILL.md` (un año cargado, hilo o post con el dato verificado y el link a la fuente).
- [ ] Script que proponga «dato del día» desde lo cargado (ranking de una liga, club que más cambió de deuda o ingresos, club que nunca figuró), solo con años que pasaron `verifyTieOuts()`.
- [ ] Tarjetas de imagen con el estilo del sitio, en los tamaños de X e Instagram (mockup antes); video corto con Higgsfield si ayuda (sin comprobar si sigue vigente).
- [ ] Calendario: qué liga o club se publica cada semana, sin repetir.
- [ ] Links a `/club/<id>` con tarjeta al compartir: las páginas `club/<id>.html` existen; falta comprobar que la tarjeta al compartir (og:image) esté puesta y medir qué publicaciones traen visitas (sin comprobar).
- [ ] Material para periodistas y sponsors: un deck o un informe por liga («las finanzas de LaLiga 2025 en 10 slides»), con el tipo Slides, sin código.
Terminado cuando: el 337 está cerrado y Guido aprobó y se publicó al menos una pieza de cada línea que decida seguir (dato del día, tarjeta, deck), con su dato verificado.

Verificar: manual
### 25. 335 · (Sourcing, con Guido): mails a clubes

Todo lo que implique escribirle a un club vive acá. Nadie redacta ni manda un mail sin que Guido lo pida con sus palabras.
- [x] Etapa 1 lista y probada de punta a punta: Resend, `outreach.financeofsports.com`, cola en `Admin/outreach/cola/`, envío desde la terminal de Guido con `tools/outreach-send.js`. El flujo: skill `club-outreach`; cuándo amerita un mail: `club-sourcing`, sección 0.3.
- [ ] Decide Guido: hacer el check-in de la Etapa 1 (`Admin/outreach/checkin-2026-10-24.md`, fecha ya pasada) y elegir prender la Etapa 2 (disparo con 3 preguntas acumuladas o 90 días, follow-up y cooldown; documentada en `club-outreach`, no prendida) o esperar. Recomendación: esperar; hay un solo envío real de prueba (`Admin/outreach/enviados/`) y no hay base para evaluar la redacción. Hecho el check-in, archivar ese archivo en `Admin/Archive/` con el resultado.
- [ ] Informes del auditor que faltan en nuestros PDFs: `node tools/auditoria.mjs --pendientes`. Casi todos sin canal público; pedirlos solo si Guido lo pide. Roma 2022 queda así por decisión de Guido (no hay informe del consolidado público). Si el sitio publicara el consolidado de Juventus, sus líneas 2022-2025 cambian de informe (los dos están bajados).
- [ ] Preguntas a cada club: `Admin/dudas-por-club.md` (la lista de la que sale cada mail).
Terminado cuando: Guido decidió sobre la Etapa 2 y el check-in está archivado; el resto de los ítems se trabaja cuando Guido pide un mail.

Verificar: manual

### 26. 460 · (Contenido, con Pantallas, prioridad baja): una página de blog que suma nuestros datos a lo que dicen los informes de UEFA, Deloitte y similares

Pedido de Guido (2026-10-26): una página de blog (la ruta la decide Pantallas) que tome lo que dicen informes como el de UEFA o la Money League de Deloitte y le agregue lo que dicen NUESTROS datos. Es contenido: ninguna cifra de esos informes se carga en el sitio ni se usa como control de calidad de nuestros clubes. Va antes de la API (249).
- [x] Informe de UEFA 2025 guardado y transcripto: `Admin/informes-externos/uefa/ecfil-2025.md`; su `Admin/informes-externos/README.md` dice qué trae (KPI por liga y país, no ingresos por club).
- [ ] Bajar la Money League de Deloitte (sin bajar) y guardarla con su transcripción en `Admin/informes-externos/` más una fila en el `README.md` de esa carpeta.
- [ ] Fila de cada informe usado en `Admin/fuentes-externas.md` (licencia o términos, si permite citar, cita pedida, URL); hoy ninguno figura.
- [ ] Elegir la liga o el tema del primer artículo y qué de nuestros datos lo completa (cobertura de la liga: `node tools/faltantes-liga.mjs`; ingresos por rubro de los clubes cargados). Criterio de lo que se publica con un dato: skill `contenido-y-difusion-finance-of-sports`.
- [ ] Mockup de la página (Pantallas, skill `producto-y-pantalla-finance-of-sports`) y ok de Guido; recién después se construye.
- [ ] Construir la página con un artículo que cita el informe con su fuente y suma datos del sitio.
Terminado cuando: existe la página de blog con al menos un artículo que cita el informe externo con su fuente y suma datos del sitio, con el mockup aprobado por Guido y la fila del informe en `Admin/fuentes-externas.md`.

Verificar: contiene Admin/fuentes-externas.md | UEFA
Verificar: manual

### 27. 249 · API en dominio propio

La API, si se hace, va en `api.financeofsports.com` desde el primer día y es paga para todos (`Admin/ESTADO.md`, «Objetivo del proyecto»). No se construye ahora. El Worker actual vive en una cuenta personal (`square-sky-ca25.guidomamone91.workers.dev`, usado por `js/selector.js`); no se amplía para esto.
Un ejercicio convertido con una cotización de BCRA, SII, Banco de Rusia o Bank of England (restringen el uso comercial) se sirve en la moneda del club o se pide permiso: `Admin/fuentes-externas.md`, «Consecuencias» (`node tools/audit.js --fx` dice de dónde sale cada cotización).
- [x] Contrato de datos (esquema público y qué lo rompe): skill `contrato-de-datos-finance-of-sports`, `data/schema/club-v2.json`, `tools/json-datos.mjs` y `tools/exportar-paquete.mjs`. El 257 ya no es un punto abierto (lo que quedaba de él se absorbió en el 463).
- [ ] Índice partido (258): abierto, se reabre cuando lo que se baja siempre pase 150 KB comprimidos (`node tools/todo.mjs 258`); no bloquea hasta entonces.
- [ ] Carga de las grandes ligas (337): abierto, falta la decisión de umbral y presupuesto de Guido (`node tools/todo.mjs 337`).
- [ ] Decidir con Guido que la API se empieza (hoy es una idea guardada), y entonces diseñar: dominio y cuenta del Worker, qué datos sirve, cómo se cobra, las cotizaciones restringidas de arriba.
Terminado cuando: la API responde en `api.financeofsports.com` con los datos del contrato, las cotizaciones restringidas resueltas, y el 258 y el 337 cerrados o descartados como condición.

Verificar: manual
