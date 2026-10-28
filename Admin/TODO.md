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

### 1. 478 · (Pipeline): defectos de las herramientas que dejó la carga de Envigado y Atlético Nacional (19; el 19 de la lista original es el 473)

Salen de cargar 19 club-años de SIIS (CHANGELOG 1234) con `club-siis.mjs`, `lote.mjs` y tres subagentes por club. Regla de todos: **ninguna corrección pierde calidad de datos** (cada una pide igualdad exacta, o frena, o pregunta si hay duda), el caso que falla se escribe ANTES como prueba (`tools/probar-*.mjs`, patrón de `probar-pruebas-de-tool.mjs`; `prueba-escribir.mjs` para lo que escribe), y cada cambio a una tool del pipeline se cierra con `node tools/fos.mjs cerrar-tool --cambio "…"` (una tarea por commit; `cerrar-tool` corre ahora las pruebas de lo que cambió). Lo que ya se arregló: dos partidas de otro resultado integral en 0 de `siis-estado.mjs` (CHANGELOG 1233). Scripts de partida en `Prototyping/defectos-463/` (`reexpresion.mjs`, `diff-fila.mjs`, `responder-nacional.mjs`). Cómo replicar con los datos reales sin ensuciar el árbol: `node tools/con-worktree.mjs` (`conWorktree(fn)`) arma una copia descartable; los datos de Envigado y Nacional ya están cargados, así que para ver el caso original se quitan en la copia las respuestas de la cola o los archivos que se nombran.
Cada ítem: qué pasa · cómo replicar · cómo se sabe que anda. Rol Pipeline; las partes que son texto de skill o regla de datos van aparte (Guido las ve en el diff).
- [x] 1. `siis-estado.mjs` no avisa los años sin filas armadas y el lote lo paga. Qué pasa: «rubros de SIIS sin clase en CLASE» deja el `.md` escrito sin `.filas.json`, el resumen dice igual «Escritos 11 año(s)» y sale con 0; el ensayo de `lote.mjs` entonces estima «localizar ~US$ 0.038 + extraer ~US$ 0.20-0.33 (club sin historia)» por documento (US$ 1,77 en vez de 0,30 para Nacional) aunque SIIS es gratis. Replicar: en una copia, sacar `difImporteLibros` de `CLASE` en `tools/siis-estado.mjs` y correr `node tools/siis-estado.mjs --club "Atletico Nacional" --anio 2016 --escribir --rehacer`, después `node tools/lote.mjs --lista <lista con siis-estado-2016.pdf>` (ensayo). Anda cuando: el resumen final lista los años sin filas («N escritos, M sin filas: 2016, …») y sale con código distinto de 0; el ensayo del lote para un `siis-estado-AAAA.pdf` sin `.filas.json` dice «falta el .filas.json: node tools/siis-estado.mjs --club X --anio AAAA --rehacer --escribir», con costo 0, y no ofrece pagar localizar/extraer.
- [x] 2. `verificar-cierre.mjs` reconoce «presentación distinta» solo si la diferencia es una fila de `gasto`. Qué pasa: 12 de los 14 casos de la cola de Nacional (`anio-vecino` y `no-cierra`) eran la fila «Otras ganancias (pérdidas)» (lado `otro`), idéntica en los dos estados, que una comparación cuenta como ingreso y la otra no; las contesté a mano. Replicar: primero la prueba, con dos `.filas.json` de juguete cuyos ingresos difieren por una fila de lado `otro` con el mismo importe en los dos; con datos reales, en una copia sacar de `Admin/registros/cola-revision.jsonl` los casos `7918aca`, `908faee`, `ed1e59b`, `56c5bfe`, `48c9fd9`, `baf0128`, `cc272cf`, `a9a2a61` y correr el ensayo de `verificar` sobre `siis-estado-2019.pdf` a `2025.pdf`. Anda cuando: esos 8 casos no se abren y el detalle dice «presentación distinta: la diferencia es exactamente "Otras ganancias (pérdidas)"»; los pares 2015/2016 y 2018/2019 (reexpresiones reales, la diferencia no es una fila) SÍ se abren; `cerrar-tool` mide con el lote completo (lógica compartida de `verificar`) y da idéntico, o cada diferencia explicada. Calidad: igualdad exacta del importe con una fila de alguno de los dos documentos, y el mismo importe en ambos.
- [x] 3. `sponsor-fka.mjs --buscar` solo busca años «débiles». Qué pasa: con entradas sólidas en `tools/contexto-manual.json` no imprime nada; el subagente tuvo que escribir temporalmente «una sola fuente por año, a verificar en FKA» en `fuente` para que corriera, y después reemplazarlo. Replicar: `node tools/sponsor-fka.mjs atlnacional-co --buscar --nombre "Atletico Nacional"`. Anda cuando: existe `--anios 2015-2022` (o `--todos`) que busca esos años sin tocar `contexto-manual.json` (`git diff tools/contexto-manual.json` vacío) y el brief de estadio-sponsor lo usa en lugar del truco.
- [x] 4. `club-siis.mjs` no lista el subagente de gestiones al principio. Qué pasa: para Envigado solo apareció «estadio-sponsor»; las 9 preguntas de gestión se vieron cuando el lote ya había corrido. Replicar: en una copia sacar la clave `'envigado-co'` de `data/gestiones/co.js` y correr `node tools/club-siis.mjs "Envigado"`. Anda cuando: la línea «LANZÁ JUNTOS» incluye `gestiones` si algún cierre del 31/12 de los años por cargar no cae en una gestión confirmada de `data/gestiones/<iso>.js`, y no la incluye si todos caen.
- [x] 5. Nada avisa que tras tocar una liga hay que correr `publicar` antes de commitear. Qué pasa: editar `data/club-leagues/co.js` y commitear frena el hook (`rankings-desfasado` y `asset-v-sin-subir`); pasó dos veces. Replicar: editar una línea de liga y `git commit`. Anda cuando: el paso «Liga de cada año» de `club-siis` (y el mensaje de `--liga`, ítem 6) dice «después: `node tools/publicar.mjs` y commitear en OTRA llamada».
- [x] 6. No hay herramienta que escriba la línea de liga de un club (`club-siis.mjs --liga`). Qué pasa: `lookup-club-league.js` imprime la caché y la línea de `data/club-leagues/co.js` se edita a mano (Envigado 2016 a 2025, Nacional 2015 a 2025). Replicar: `node tools/lookup-club-league.js "Atletico Nacional" --pais CO` (sale también `co-primeraB … «Atlético» · NO EXACTA`, que NO es el club). Anda cuando: `--liga` escribe la línea solo si cada año tiene UNA liga con coincidencia exacta y descarta las «NO EXACTA»; con dudas imprime y no escribe; en una copia con las líneas de Envigado y Nacional quitadas las vuelve a escribir idénticas (`git diff` vacío contra HEAD).
- [ ] 7. `dictamenes-md.mjs` lista los escaneos pero no los pasa por Mistral. Qué pasa: 5 comandos `mistral-ocr-transcribe.mjs` a mano para Nacional 2015 a 2019 (US$ 0,07). Replicar: en una copia borrar, de la carpeta de Atlético Nacional en `Clubes/Colombia/`, los cinco .md de dictamen del revisor fiscal de 2015 a 2019 y correr `node tools/dictamenes-md.mjs "Atletico Nacional" --escribir`. Anda cuando: `--mistral` los corre, imprime el costo total y vuelve a revisar la firma; sin ese flag no gasta.
- [x] 8. `club-siis.mjs --avanzar` escribe aunque parece un ensayo. Qué pasa: sin `--ejecutar` igual fija categorías en la cola (`cola.mjs --corregir-categoria`), crea la lista del lote y corre el inventario. Replicar: `node tools/club-siis.mjs "Atletico Nacional" --avanzar` y mirar `git status`. Anda cuando: sin flag solo dice qué haría (el árbol queda igual) y `--escribir` lo aplica; `Admin/paises/co.md`, `Admin/PIPELINE.md` y las skills que lo nombran dicen lo mismo (texto de skill: commit aparte).
- [ ] 9. `lote.mjs` imprime en cada lote colombiano un fallo de una liga belga. Qué pasa: «listas-lote: 0 de 1 liga-años pasaron la compuerta. NO: be-div1amateur 2013…». Replicar: `node tools/lote.mjs --lista Admin/lotes/lote-175.txt` (ensayo). Anda cuando: solo se mira(n) el/los liga-año(s) de los documentos de la lista, o el aviso dice de qué lote viene; el de Colombia no menciona `be-*`.
- [ ] 10. `lookup-club-league.js` imprime `MODULE_TYPELESS_PACKAGE_JSON` en cada llamada. Replicar: `node tools/lookup-club-league.js "Envigado" --pais CO`. Anda cuando: la salida no trae el aviso (pasarlo a `.mjs` o declarar el tipo) y siguen andando todos los que lo llaman (`grep -rn lookup-club-league tools .claude Admin`).
- [ ] 11. `fos cerrar` ignora flags desconocidos. Qué pasa: `node tools/fos.mjs cerrar 401 --escribir` corrió en ensayo sin decirlo (el flag correcto es `--cerrar`). Replicar: ese comando. Anda cuando: sale con 1 y «Argumento desconocido: --escribir (¿--cerrar?)», como `medir-pipeline.mjs`, con una prueba.
- [ ] 12. Falta `fos reexpresion <club>`. Qué pasa: para contestar los casos `anio-vecino` hubo que escribir `Prototyping/defectos-463/reexpresion.mjs` (rubros que difieren entre el corte de un año y el «año anterior» del siguiente), `Prototyping/defectos-463/diff-fila.mjs` (¿la diferencia es exactamente una fila?) y mirar a mano que el resultado del año no cambiara. Replicar: `node Prototyping/defectos-463/reexpresion.mjs "Atletico Nacional" 2015 2025` y `node Prototyping/defectos-463/diff-fila.mjs "Atletico Nacional" "[[2015,75082.377,72453.712],[2018,71967.504,58226.401],[2019,109522.774,94619.857],[2020,60437.96,54796.73],[2023,136219.814,131056.739],[2024,168232.81,162890.702]]"`. Anda cuando: la tool imprime por par los rubros que difieren, si el resultado coincide y si la diferencia es una fila (con su etiqueta), y sobre Nacional da: 2015/2016 y 2018/2019 reexpresión, 2019/2020, 2020/2021, 2023/2024 y 2024/2025 la fila «Otras ganancias (pérdidas)»; entra a `tools/fos-comandos.json`.
- [ ] 13. `cola.mjs --responder` no acepta varios ids. Qué pasa: 14 casos, 14 comandos con las mismas tres opciones obligatorias; se hizo con `Prototyping/defectos-463/responder-nacional.mjs`. Replicar: leer ese script. Anda cuando: `--ids a,b,c` con una nota, evidencia, seguridad y causa compartidas deja una línea con esquema por caso (`probar-registros.mjs` la valida) y nunca sin las tres opciones.
- [ ] 14. `club-siis.mjs --crear-lista` y `--avanzar` no imprimen la ruta de la lista. Qué pasa: se encontró con `ls -t Admin/lotes`. Replicar: `node tools/club-siis.mjs "Atletico Nacional" --crear-lista`. Anda cuando: imprime «Lista: Admin/lotes/lote-NNN.txt» y el comando del lote con esa ruta.
- [ ] 15. `estadio-sponsor.mjs --ensayo` es de un año por llamada. Qué pasa: el brief pide una por año (7 para Envigado, 8 para Nacional); el subagente de Envigado salteó tres y las repetí yo. Replicar: `node tools/estadio-sponsor.mjs --ensayo --club envigado-co --anio 2019 --liga co-primeraA --cierre 12-31`. Anda cuando: `--anios 2016-2022` imprime una tabla año por año con los cuatro porcentajes, igual a las siete llamadas sueltas, y el brief de `club-siis --brief estadio-sponsor` la usa.
- [ ] 16. `club-siis.mjs --brief` mezcla el encabezado del comando con el texto y obliga a copiarlo. Replicar: `node tools/club-siis.mjs "Envigado" --brief estadio-sponsor` (la primera línea, «Reglas de datos de CO…», sale en todos los comandos). Anda cuando: `--brief X --texto` imprime solo el brief (o lo deja en `Generados/briefs/<club>-<nombre>.md`) y el lanzamiento de un subagente no pide editar nada.
- [ ] 17. El brief de estadio-sponsor promete «ningún sponsor queda débil» y los dos subagentes informaron que ninguna ficha de Football Kit Archive dice «frente». DECIDE GUIDO (criterio de datos; si no hay precedente, `votacion-de-criterios`): qué cuenta como respaldo del sponsor del frente (¿ficha FKA más una nota de prensa que diga «principal»? ¿FKA sola es `débil`?). Replicar: Envigado 2018 a 2022 («Pool», solo FKA) y Nacional 2016 a 2022 (FKA más Infobae «principal»). Anda cuando: el criterio queda en `.claude/skills/club-sourcing/referencia/liga-y-sponsor.md` 0.5 (texto de skill, commit aparte) y el brief lo repite sin la promesa.
- [ ] 18. El brief de gestiones y `Admin/ARQUITECTURA.md` («Gestiones») no dicen qué hacer con una fecha de inicio solo de mes. DECIDE GUIDO: hoy el brief manda «día 01 y `confirmada:false`», y eso deja a Ramiro Ruiz (Envigado, desde octubre de 2013, los cierres 2016 a 2024 están a años de distancia) sin mostrarse y con 9 preguntas abiertas. Replicar: `node tools/cola.mjs --dir "Clubes/Colombia/Envigado" --tipo gestion`. Anda cuando: la regla queda escrita en `ARQUITECTURA.md` (con su caso) y en el brief, y la gestión de Ruiz se resuelve según ella.
- [ ] 20. Las tools del pipeline sin entrada en `tools/patrones-tools.json` frenan `cerrar-tool` pidiendo `--sin-documentos` (pasó con `siis-estado.mjs` y `audit-chequeos-4.js`). Replicar: cambiar un comentario no sirve (no cuenta); cambiar una línea de código de `tools/siis-estado.mjs` en una copia y `node tools/fos.mjs cerrar-tool --cambio "x"`. Anda cuando: un chequeo (`patronDe` sobre todas las tools de `pipeline-tools.json`) no deja ninguna sin entrada, y `fos --check` o `audit.js` avisan cuando se suma una tool sin ella.
Terminado cuando: los 19 ítems están hechos o descartados con su motivo escrito acá (los que decide Guido, 17 y 18, quedan con su pregunta hasta que conteste), cada uno con su prueba y su medición en CHANGELOG, y los tres scripts de `Prototyping/defectos-463/` están absorbidos por tools de `tools/` o borrados.

Verificar: manual

### 2. 473 · (Deploy, con Pantallas y Contrato de datos): separar la versión de los datos de la del código para que una carga no reescriba ~740 páginas

Va antes del 459 (Guido). Hoy `ASSET_V` es un solo número que lleva cada página generada (`club/`, `fuentes/`, `liga/`, unas 20 referencias `?v=` por página) y que `loadClubData`, `I18N.load`, `loadRanking` y los demás cargadores (gestiones, entidades, contexto, rankings, estimados, correcciones, sponsors) leen del HTML con el que entró el visitante. Cualquier cambio de `data/` o `js/` lo sube y reescribe todas las páginas (2 por club más las ligas; crece con la cantidad de clubes: unos 740 archivos hoy, unos 2.070 con 1.000 clubes). `publicar.mjs` lo sube además siempre que ya es igual a HEAD, y el aviso `asset-v-sin-subir` cuenta `data/correcciones/` como `data/`, así que regenerar el registro público de correcciones (dos veces por cada commit con `Corrige:`) también mueve todo el sitio: 15.000 líneas cambiadas que son solo el número.
HALLAZGO (2026-10-27, `curl -I` a producción): Netlify sirve `js/` y `data/` con `cache-control: public,max-age=0,must-revalidate` y ETag (no hay cabeceras propias en `netlify.toml`). El navegador revalida en cada visita, así que en producción ningún visitante se queda con un archivo viejo aunque el `?v=` no cambie. El `?v=` sirve donde esa cabecera no está: el servidor local de vista previa y el choque «HTML nuevo con js viejo» que pasó con `currency-map.js`.
DECISIÓN QUE ES DE GUIDO (aflojaría una compuerta): (a) eximir `data/correcciones/` del aviso `asset-v-sin-subir`, como ya lo está `data/schema/`: evita los dos commits de ~730 archivos por cada `Corrige:`; (b) bajar más: que `ASSET_V` suba solo con `js/` y `css/` (donde las etiquetas estáticas llevan el literal) y no con `data/`; (c) separar la versión de los datos de la del código con un manifiesto por club (el cambio de arquitectura de siempre: una carga toca el club, su `club/`, su `fuentes/` y el manifiesto). La recomendación es (a) ya y (c) si la cantidad de clubes lo pide.
Qué falta tras la decisión: el cambio en `audit-chequeos-5.js`, `publicar.mjs`/`cargar-escribir.mjs` y `generate-club-pages.js`, medido con el lote completo; ningún chequeo ni gancho se saca sin tu OK.
Terminado cuando: una carga de un club cambia un número chico de archivos (el commit lista el club, su `club/`, su `fuentes/`, el manifiesto y los registros) y no depende de cuántos clubes haya, o tu decisión de dejarlo como está queda escrita acá con su motivo; `node tools/audit.js` da P0 0 y P1 0.

Verificar: manual

### 3. 463 · (Onboarding, con Pipeline y Auditora): SIIS de Colombia: los clubes que faltan cargar (va después del 470, 471 y 472)

Lo hecho (la tool `siis-estado.mjs`, el chequeo `siis-control`, el criterio en `CONVENCIONES-DATOS.md`, `siis-notas.mjs`, `club-siis.mjs` y los clubes cargados) está archivado en `Admin/Archive/TODO-463-siis-hecho.md` (historia) y en el CHANGELOG; cómo se carga un club: `Admin/paises/co.md`, «Pipeline de Colombia: los estados de SIIS», y `node tools/club-siis.mjs "<Club>"`. Decisiones de Guido que siguen vigentes: el estado de resultados y el balance de SIIS son el estado primario oficial de un club colombiano; un año que SIIS tiene y no tiene PDF útil se carga igual (rubros grandes y resultado); la tool, el chequeo y la regla viven en el pipeline y en `audit.js`; el informe de UEFA con imágenes y la Money League no entran.
Qué está cargado y qué falta de cada club: `node tools/club-siis.mjs` (sin nombre; «N/N años cargados» y su veredicto). Sin alta: Valledupar FC (NIT 824006447, 2016 a 2025) y Cóndores de Cundinamarca (900695572, 2021 y 2022); Titanes de Barranquilla (baloncesto) y Toros de Córdoba (béisbol) van por el 464; Corsarios dio REVISAR; Real Sincelejo está descartado (sin actividad). Un club se carga con `node tools/club-siis.mjs "<Club>" --preparar`, los tres subagentes y `--avanzar --ejecutar --cargar --en-segundo-plano`.
Lo que quedó pendiente de los clubes ya cargados está en el punto 476.
- [x] Cargados: Deportes Tolima, La Equidad, Águilas Doradas, Atlético Bucaramanga, Independiente Medellín, Leones FC, Fortaleza CEIF, Once Caldas, Boyacá Chicó, Unión Magdalena, Alianza FC, Deportivo Pereira, Deportivo Cali, Cortulua, Tigres FC, Atlético FC, Real Cartagena, Cúcuta Deportivo, América de Cali, Orsomarso, Atlético Huila, Barranquilla FC, Bogotá FC, Envigado (2016 a 2024) y Atlético Nacional (2015 a 2024) (`node tools/club-siis.mjs` da el detalle).
- [ ] Con años por cargar: Independiente Santa Fe, Junior, Llaneros, Millonarios, Boca Juniors de Cali, Deportes Quindío, Jaguares, Patriotas Boyacá, Real Santander y Caimanes de Barranquilla.
- [ ] Sin alta: Valledupar FC (NIT 824006447) y Cóndores de Cundinamarca (900695572). Corsarios dio REVISAR; Titanes de Barranquilla y Toros de Córdoba van por el 464; Real Sincelejo está descartado.
Terminado cuando: los clubes de SIIS que tienen años por cargar están cargados o descartados con motivo.

Verificar: existe tools/siis-estado.mjs
Verificar: contiene data/co/deportestolima-co.json | "fiscal_year": 2016
Verificar: contiene data/co/deportestolima-co.json | "fiscal_year": 2025
Verificar: audit siis-faltante = 0

### 4. 476 · (Onboarding, con Pantallas y Pipeline): lo que quedó pendiente de lo ya cargado de SIIS Colombia (sale del 463)

Lo que falta de los clubes colombianos ya cargados. Cada pendiente se hace o se descarta con su motivo escrito acá.
- [ ] Gestiones que ninguna nota fecha (`fos gestion-exa <clubId> --anios "…" --resumen`): Independiente Medellín (17-12-2020 al 21-1-2021; interinato de Ossa Giraldo en 2019), Cortulua (Martán Palau; razón social desde 2024 como Inter de Palmira), Orsomarso (2017 y 2018, 2020 a 2025), Barranquilla FC (Herrera entre 2023 y hoy), Bogotá FC (Perdomo sin nota propia en 2016, 2017, 2019, 2020 y 2024).
- [ ] Sponsors débiles o sin dato (`sponsor-fka.mjs <clubId> --buscar`, Exa, sin Gemini): Orsomarso (9 años sin dato, marca 2020), Atlético Huila (una sola fuente 2017 a 2019 y 2021 a 2025), Barranquilla FC (solo es.wikipedia), Bogotá FC (FKA sin campo «frente»).
- [ ] Capacidad de Atlético Huila 2016; liga 2025 de Barranquilla FC de una sola fuente (`segunda-fuente-liga.mjs`; `audit` dice `liga-una-fuente`).
- [ ] Caja y deuda en los años que SIIS no resuelve (el siguiente reexpresó el cierre, o ningún pasivo financiero reportado): `node tools/caja-deuda.mjs --club <id>` dice cuáles; mirar si el documento del año los resuelve.
- [ ] Pantallas: (i) filas «n/d*» y «—» mezcladas en un mismo año (Bucaramanga); (iii) impuestos e intereses en filas distintas según el año (Leones FC, La Equidad, Tolima: `extra_rows` contra `financial`); un año «solo SIIS» con su marca «fuente: SIIS» (mockup antes de código).
- [ ] Dictámenes del revisor fiscal sin transcribir (sourcing; `club-siis "<Club>"` los lista): Tigres 2016 a 2019 y 2023, Atlético FC 2016 a 2019 y 2021, Cortulua 2020, y 2016 a 2019 de Huila, Orsomarso, Barranquilla FC y Bogotá FC. Huecos que solo el club puede dar: La Equidad 2016, 2018 y 2019; Águilas Doradas 2016 y 2018; Bucaramanga 2017, 2018 y 2021 (mail solo si Guido lo pide).
- [ ] Skills (un commit por skill, Guido ve el diff): `club-sourcing` (`paises/Colombia.md` y `_notas-generales.md`: «NOTAS EF» no es «el paquete COMPLETO»; `siis_resultadointegral` es dato oficial de cada año) y `club-or-year-onboarding` (el camino SIIS).
- [ ] Cositas chicas del 461: la nota de ingreso negativo a 375 px y con teclado; imágenes `og/` y tabla de los otros seis clubes de margen bruto; nota en español de la vista de varios años; 414 (la carga manda a la cola una «ganancia en inmovilizado» que pese poco); `fos liga-segunda-fuente-local --escribir`.
- [ ] Envigado y Atlético Nacional, lo que queda tras la carga (463, CHANGELOG 1234): la línea del auditor de sus 19 años (`node tools/club-siis.mjs "<Club>" --brief auditor`; Envigado 2016 a 2024 y Nacional 2015 a 2024) y las gestiones de Nacional 2017, 2021 y 2022 (`--brief gestiones`).
- [ ] Decide Guido: la gestión de Ramiro Ruiz en Envigado (`data/gestiones/co.js`) quedó `confirmada:false` porque la fuente de su inicio dice solo «octubre de 2013» (el fin es exacto: 22-10-2025, comunicado del club y El Colombiano; notas fechadas que lo nombran presidente: 2016, 2018, 2020 y 2024). Con `confirmada:false` el sitio no la muestra y las 9 preguntas de gestión de Envigado siguen abiertas (no frenan la carga). Si pasa a `true`, es un campo; el criterio general (fecha solo de mes lejos de todo cierre) va al punto 478, defecto 18.
- [ ] Revisar lo débil o elegido por la sesión: sponsor de Envigado 2018 a 2022 («Pool», solo fichas de Football Kit Archive, ninguna dice «frente»; 2016 y 2017 `sin-fuente`); capacidad de Nacional 2015 y 2016 (40.943 por la remodelación de 2011; Wikidata y es.wikipedia traen otras cifras en el caso de Envigado, 11.000 elegido contra 12.000 y 14.000); «Entretenimiento y esparcimiento» de Envigado (ingreso de importe redondo anual, 1.600 a 2.000 millones de pesos) a `other_income` porque el documento no dice qué es; los 14 casos de `verificar` de Nacional aceptados como reexpresión o presentación (CHANGELOG 1234, con el motivo en cada respuesta de la cola).
Terminado cuando: cada pendiente de arriba está hecho o descartado con su motivo escrito acá.

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

FRENO DE DOCUMENTOS DE GRUPO (sale del 356, Fleetwood/Jaymel; regla votada 3 a 0 en CONVENCIONES-DATOS, «Un consolidado de grupo con
negocios ajenos al club», umbral del 10 % sobre lo impreso). Terminado cuando: `perimetro-senales.mjs` o `cargar.mjs` frenan un documento de
grupo si el turnover por clase de negocio deja el deporte del club por debajo del 90 %, o si el ejercicio trae la venta o compra de la
sociedad del club; medido, frena los 3 Jaymel y 0 de los 53 británicos cargados desde grupo. Antes de codear, pasa por la sección 7 de la
skill de auditoría (la Auditora). Lo hace Pipeline.

Verificar: manual

### 8. 363 · (Pipeline): lo aprobado de Pipeline 15 que no se aplicó

LO APROBADO DE PIPELINE 15 QUE NO SE APLICÓ (Auditora 5 y 6, `Admin/registros/auditoria-proceso.jsonl`; el detalle
en `Admin/Archive/sesion-pipeline-2026-10-21.md`, «Pipeline 15»). Terminado cuando: (a) barrido de lecturas recortadas: `jevDe` de
`caja-deuda.mjs` con todas las filas (aprobado con un cambio: antes de commitear, volver a pedirle a Jev los 162 documentos que cortan en 120
filas, y los años cuya caja o deuda cambia van como corrección con cita y trailer `Corrige:`, o se revierte); los encabezados de balance de
la página entera (`--medir` dio idéntico en 779 años); y `nombreLegal` de `alta-club.mjs` y las señales de intermedio de
`perimetro-senales.mjs` como ventana de portada declarada en el código, con la medición (63 de 356 y 394 falsos intermedios) y la frase en la
regla de PIPELINE.md «salvo una ventana de portada declarada en el código, con la medición de leer entero»; (b) `falta_documento` en
`auditoria.mjs` (parche `p15-falta-documento.patch` en la carpeta de notas compartidas de la principal; aprobado con dos cambios: las
marcas «--- pág. N ---» de 1 a N sin saltos, y las 13 sin `.md` propio citan el `.md` fuente del año), con la migración de las 58 por un
subagente Sonnet y el lote entero pasando `--check` antes del commit (medido: 45 con el `.md` completo, 0 con páginas sin transcribir); (c)
se saca `cabecera` de `perimetroHeredado` (`cargar.mjs:215-220`), que se calcula y no la lee nadie; (d) la skill `auditoria-finance-of-sports`
(eje datos) y la de la cola dicen «antes de reportar algo raro de un documento, `node tools/rarezas.mjs --md <ruta>`» (texto para el ok de
Guido). Lo hace Pipeline (a, b, c) y la principal (d). Las dos preguntas de la Auditora 5 ya están contestadas en CONVENCIONES-DATOS:
el tramo corto va como C y la temporada COVID lleva la etiqueta en pantalla, sin publicNote.

Verificar: manual

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

### 13. 298 · (Pipeline): las mejoras de script que dejó el onboarding de Estonia y Bélgica; revisar qué letras siguen vivas

2026-10-24 (Orden): no es un punto chico. Verificadas contra el código y sacadas del texto por estar hechas: aa (`worktree.mjs` ya lleva `data/sponsors.js` y `sponsors-indice.js` en OTROS_GENERADOS), i (`alta-club-tablas.mjs` resuelve un país fuera de PAISES con la tabla de referencia ISO) y o (`lote-preparar.mjs`: «la versión corregida reemplaza al original»). Quedan unas 12 letras sin verificar (g2, k, l a q, s, z, t2, u2, v…), cada una un escalón del pipeline con medición completa y varias con diseño de Guido (z: cómo se muestra un año de más de 12 meses; t2: si se corrigen los 3 años belgas con errores chicos; Escocia/Gales/Irlanda del Norte en el selector). Falta, primero, recorrer las letras contra el código y borrar del texto las que ya estén hechas (ej.: la `aa` de `worktree.mjs mergear` puede haber desaparecido con el modo de una sola sesión); lo que quede, de a una, con Pipeline.
MEJORAS DE SCRIPT VISTAS ONBOARDEANDO ESTONIA Y BÉLGICA (lotes 89-92; HECHAS la a, b, c, d, e, e2, f, g (el 630 belga), h, i, o, r, t, u, x, y1, y2 e y3, mergeadas el 2026-10-18; cada letra es un escalón a diseñar con el ok de Guido, uno por
Terminado cuando: cada letra pendiente se hizo, se descartó con su motivo en `Admin/HALLAZGOS-pipeline.md` o se confirmó ya resuelta en
el código. El texto de abajo quedó cortado en un cierre y se recuperó del historial (`git show 7ef1eb6874:Admin/TODO.md`): antes de
trabajar una letra, verificarla contra el código, porque varias pueden estar hechas.
vez; el detalle con casos, en `Admin/Archive/sesion-onboarding-2026-10-18-2.md`). a) CIERRE FALSO en verificar.mjs: compara en valor
absoluto y da "cierra" con una fila del lado o signo equivocado (Lierse Kempenzonen 2022 habría cargado un gasto como ingreso): lo más
grave. b) Esquema NBB belga en verificar.mjs y cargar.mjs: costos financieros 65/66B positivos, renglones "(+)/(-)" por valor absoluto,
el 76A sumado aparte, y verificar y la propuesta que no leen igual el signo; una regla por código NBB.
Aviso para la próxima corrida grande: 368 documentos viejos sin tablas (221 en "revisar", 102 en "pendiente-segunda-voz", 38 en
"sin-tablas") se rehacen con Mistral (~US$ 83 más la validación) apenas pasen por resolver-inventario; el ensayo ya lo cotiza.
RWDM 2019: el registro
tiene el cierre 2019-11-30 y el balance va del 30/11/2018 al 30/06/2019 (como la f). Escocia, Gales e Irlanda del Norte se ven como GB
("Inglaterra") en el selector: decisión de pantalla pendiente. g2) partir en la cola cualquier fila según su nota (otros países, el 66A de Lommel SK
2025): solo si aparece otra fila mixta sin códigos; el 630 belga ya sale solo. l) a p) más casos de onboarding (reportType por año de un club existente, perímetro de la carga, año vecino con
perímetros distintos, ceros reales y perfil que se repreguntan). q) el ensayo de lote.mjs cobra la categorización de todos los documentos de
la lista, también los ya cargados o categorizados. El detalle
de l a q, en `Admin/Archive/sesion-onboarding-2026-10-18-4.md`. s) el cierre de Beerschot 2019 -correction ya lo arregló la f: falta ver si localizar sigue
eligiendo la columna "Vorig boekjaar" vacía con el cierre bueno. z) cargar los primeros ejercicios de más de 12 meses (Guido: "son
parciales, pero corresponde cargarlos"): Anderlecht 2011 (16 meses), RAAL La Louvière 2018 (14), Sint-Truiden 2013 (15) y Zulte Waregem
2012 (17); diseño a decidir: cómo se muestra un año de más de 12 meses y cómo compara con los vecinos. t2) los años 2025 belgas ya cargados tienen ajustes `fila` y el escalón NBB no corre en
ellos: Patro Eisden 2025 (ingresos +1.810 por el waarvan 76A, gastos +4.012 por el 631/4), Lommel SK 2025 (gastos +172, el 609) y Lommel SK
2018 (−182 de financiero) cerraron por tolerancia con errores chicos: decidir con Guido si se corrigen (escalón: correr el NBB también
con ajustes si el resultado sigue exacto). PRIMERO: u2) lo que la u no decide: listas de un solo grupo (Third Division antes de 2016, Second
Amateur Division: Lokeren-Temse 2021-2022, Patro Eisden 2013-2014 y 2019) y la First Division B 2017-18 y 2018-19, que baja con 7 de 8
(la tool pierde a Beerschot Wilrijk; OH Leuven 2017-2019, Beerschot 2019).  v) el final
de lote.mjs lista como frenados los originales que salteó por su -correction. El detalle de s a v, con líneas y montos, en
`Admin/Archive/sesion-onboarding-2026-10-18-5.md`. k) alta-club.mjs / cargar-lote.mjs escriben la liga del alta en null aunque
`altas-revision.jsonl` traiga las ligas verificadas (las 17 altas de los lotes 89-90): que el alta las tome de la revisión.

Verificar: manual

### 14. 365 · Lierse Kempenzonen 2022 y los años sin depósito (Auditora y Onboarding)

LIERSE KEMPENZONEN (vzw) DESPUÉS DE 2021 (sale del 355). La vzw sigue sin cargar 2022 (el balance está en `Clubes/Bélgica/Lierse Kempenzonen/`, abreviado,
con un margen bruto de −2.369 EUR: casi sin actividad, porque la NV ocupó su plaza) y 2023-2025 no tienen depósito en la BNB (chequeo 2026-10-21).
Terminado cuando: la Auditora decide si 2022 se carga (y con qué liga: la de la NV en esa temporada es `be-challengerproleague`) o se descarta con motivo, y
`ejercicio-sin-rastro` de `liersekempenzonen-be` queda en 0 (2023-2025 silenciados en `tools/audit-ignore.json` con la cita de la nota de sourcing).

HOY (2026-10-23): el aviso `ejercicio-sin-rastro` de este club está silenciado en `tools/audit-ignore.json` (2023-2025 sin depósito; 2022 con el balance en mano) para llevar el P3 a cero; lo que falta es la decisión de 2022, así que la línea de verificación pasó a manual.
Verificar: manual

### 15. 452 · (Pantallas, con Contenido): mostrarle al lector las particularidades contables clave de lo que está leyendo (balance resumido, cierre, perímetro), sin curso de contabilidad

Pedido de Guido (2026-10-24): mostrar en algún lugar del sitio un puñado de particularidades contables, no un curso para periodistas, para que un lector entienda qué está leyendo, más allá de lo que se resuelva con el 447. Son cosas que solo se ven al tener ejercicios de muchos países. Candidatas (a elegir y a escribir cortas, con el caso real como ejemplo): (1) balance resumido contra completo: algunos clubes publican solo un margen (el «Bruttofortjeneste» danés de la exención del artículo 32 de la ley contable, el esquema abreviado belga, el «lucro bruto»), y el sitio lo muestra como «ingresos» aunque ya vienen netos de costos; el salto cuando pasan al formato completo es de formato, no de actividad (SønderjyskE: 37,4 M en 2024 contra 55,9 M de ventas reales, que el informe 2025 trae en la columna comparativa; 71 de los 1340 ejercicios cargados, un 5 %, tienen los ingresos en una sola línea sin abrir; en unos es un margen y en otros la facturación entera, y hay que separarlos antes de escribir la nota); (2) el ejercicio no es el año calendario: cierra el 30-06 en España, Países Bajos o Francia, el 31-12 en Brasil, Rusia o Noruega, y el año del sitio es el del cierre; (3) individual contra consolidado: el mismo club tiene dos balances con perímetros distintos y no se suman ni se comparan; (4) sociedades sin socios: «cuotas sociales» en cero es un cero real, no un dato perdido; (5) cifras en moneda local convertidas al tipo de cambio de cierre: un club puede «crecer» en dólares por la moneda. Dónde: `metodologia.html` (donde ya explica cómo se leen los datos) y una nota corta en el lugar donde el lector tropieza (el gráfico de ingresos cuando hay un cambio de formato, ver el 447). El aviso `metodologia-desactualizada` de `audit.js` recuerda revisarlo cada 40 commits de reglas. Lo escribe Contenido con el criterio de `contenido-y-difusion`.
HECHO parcial (2026-10-25): «Notas sobre este club» (debajo del Estado de resultados) ya explica el caso de los ingresos en una línea; se arma por ejercicio con plantillas es/en. QUEDA lo de `metodologia.html` y las demás particularidades (cierre, perímetro). Guido tiene ideas y NO se cierra hasta que lo autorice explícitamente.
Terminado cuando: `metodologia.html` y sus textos en español e inglés tienen una sección corta con esas particularidades, cada una con un ejemplo real del sitio y un enlace a la fuente.

Verificar: manual

### 16. 372 · (Auditora, prioridad baja): revisar las 67 etiquetas de subsidios que quedaron excluidas

Las 67 etiquetas excluidas en `tools/subsidios-etiquetas.json` las dejaron afuera reglas objetivas (no una confianza baja de Jev): mezcladas con otro concepto, lo que reparte la federación o la liga (solidaridad: `competition_bonus`), subvención de capital imputada, impuestos y deducciones. Guido no las va a revisar una por una (2026-10-22): el proceso es `node tools/fos.mjs etiquetas` (369, hecho). Este punto es lo que queda después de que corrió. La lista corta de 24 etiquetas ya está decidida por Guido (2026-10-23). Falta la decisión de criterio sobre lo que reparte la federación o la liga cuando el documento lo llama «subsidio» o «toetus» (EJL, Contributi Federali, FPF/LPF; hoy excluidas por la REGLA de solidaridad de `Admin/CONVENCIONES-DATOS.md`); se vota con `votacion-de-criterios` con la tabla de `node tools/fos.mjs filas` como evidencia. `node tools/fos.mjs etiquetas --categoria grants_donations --listar --todas` las muestra con su motivo.
Terminado cuando: las etiquetas excluidas por la regla de la federación o la liga tienen una decisión escrita (entran o quedan afuera, con el caso) y el JSON de decisiones no tiene ninguna «SIN REVISAR».

Verificar: manual

### 17. 377 · (Onboarding, con Pipeline): Alemania, Rusia, Ucrania y República Checa sin documentos con verificación, así que las listas de prueba no los cubren

Tienen `.categorias.json` (Alemania 7, Rusia 2, Ucrania 2, República Checa 1) pero ningún `.verificacion.json`: las listas de prueba que arma `tools/lotes-prueba.mjs` salen de lo verificado y por eso no los incluyen, y `medir-pipeline` frena una tool dirigida a ellos (por ejemplo `bfo-rusia.mjs`, el camino del fisco ruso) porque no hay documentos que medir. Primero averiguar POR QUÉ no tienen verificación, sin asumir (¿su camino de entrada no pasa por la etapa 6, como el de Rusia, que sale del fisco y no del PDF? ¿se cargaron antes de que la etapa existiera? ¿quedaron frenados?). Según la causa: correr verificar donde corresponde, o declarar que su camino no pasa por verificación y darle un medidor propio en `tools/pipeline-tools.json` (y una familia propia en las listas) para que un cambio a su tool se pueda medir.
DEPENDE DE: el 371 (cerrado).
Terminado cuando: cada país con documentos cargados tiene verificación o un medidor propio documentado, y las listas de prueba tienen documentos de esa familia (o la tabla dice cuál es su medidor).

Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Alemania/
Verificar: contiene Admin/lotes/prueba-completa.txt | Clubes/Rusia/

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

### 20. 420 · (Onboarding, con la Auditora): cargar los británicos en iXBRL: lote 143 y Hibernian, los años pagables, Falkirk, las altas (viene del 356)

Viene del 356 (el conversor ya está: celdas por coordenadas como tablas, medido sobre 317 XHTML). Qué hay hecho: los 55 `.md` de Hibernian, Bolton, Bristol Rovers, Cambridge, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford, Tranmere, Blackpool y Reading están reconvertidos con tablas (costo 0), y Bolton 2024-25 corrió de punta a punta (`lote.mjs --rehacer --ejecutar --pagar-ia-xhtml`: US$ 0,15, verificó, 2 dudas ordinarias en la cola). Presupuesto del 356: US$ 35 de Guido, gastados ~2 (`node tools/gasto.mjs`), con ensayo gratis antes de cada corrida.
- Los lotes: `Admin/lotes/lote-143.txt` (13 documentos de Inglaterra, el año más reciente de cada club; ensayo ~US$ 0,4 por documento con IA) y Hibernian en un lote de Escocia (un país por lote). Los `Generados/` de esos clubes eran de cuando el `.md` no tenía tablas (`sin_estado: true`); desde el 419 el lote lo ve solo («el .md cambió desde localizar … se rehace») y el ensayo cotiza US$ 4,85 para los 13 (Bolton ya está hecho). Los 2 documentos de OH Leuven 2017 y 2022 (Bélgica) también quedan «viejos» por su `.md` cambiado. Después las altas como en los lotes 140 y 141: cola contestada por subagentes Sonnet, ficha de alta, estadio y sponsor, perímetros (group accounts: perímetro consolidado con la regla 1 de CONVENCIONES-DATOS), gestiones.
- Los otros años de esos clubes (17 años esperaban el conversor) y los años pagables de las altas hechas (~US$ 8): Ross County 2022-24, Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 (su alta puede entrar por 2023-24), Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24 y Wigan 2022-23, con las respuestas del lote anterior como precedente.
- Falkirk 2025: listo salvo la liga. Scottish Championship no existe en `data/leagues.js`: crearla (`club-sourcing` 0.4) y cargar con su publicNote y el EJEMPLO-CATEGORÍA de la regla del goodwill negativo (`reglas-categoria.mjs --escribir`; CONVENCIONES-DATOS).
- De las 10 altas del 356: las líneas del auditor (`node tools/auditoria.mjs --pendientes`), los escudos sin mirar (`escudoOk` null) y las gestiones (presidentes, en la cola; no frenan).
- Criterio a escribir en CONVENCIONES-DATOS (votación o precedente): la cuota que cobra el Trust dueño (Wimbledon, Exeter) no cuenta como cuota de socios (se contestó «no»).
- La nota de sourcing de Fleetwood dice «Ejercicios útiles: Jaymel 2015/16-2023/24», y es falso (fútbol 42 % en 2021-22); lo único útil es Fleetwood Wanderers 2020-21. Fleetwood/Jaymel 2022-25 está descartado.
- Daneses que esperan (se cruza con el 413): los XHTML de SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025 (−130,578 M) y el PSE de København 2021-25, y los 9 de 2025-26 cuyo PDF de Chrome sale sin texto (Horsens, Hobro, Lyngby, Næstved, Randers, Skive, Viborg).
- Ya cargados en el 356 (Onboarding 9, lotes 140 y 141): AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield, Exeter City, Gillingham, Lincoln City y Shrewsbury Town 2025 y Wigan Athletic 2024.
HECHO (2026-10-24, con el ok de Guido para pagar el 420): lote 143 corrido de punta a punta (13 documentos; ensayo estimaba US$ 4,85 y costó US$ 1,33 la primera vez y US$ 1,59 el reintento único de desgloses de personal; gasto total del día en API: US$ 3,58 con el 413). Contestadas con cita por tres revisores Sonnet y revisadas contra el documento: 21 de sumas/notas, 10 de perfil (Oxford y Plymouth tienen membresía paga), 15 de categorías (incl. «Football» de Blackpool a lump_football_operations y «New stadium development costs» de Oxford a other_expenses). Los 13 documentos están verificados; falta contestar 43 preguntas nuevas que dejó el reintento (cola, `node tools/cola.mjs`) y después `lote.mjs --lista Admin/lotes/lote-143.txt --ejecutar --cargar --pagar-ia-xhtml "<motivo>"`, que hace las 13 altas (hoy el único freno restante es `[club] el club no existe`). Las 13 gestiones (presidentes) están en la cola y no frenan. QUEDA además: Hibernian en su lote de Escocia, los años pagables (~US$ 8), Falkirk (Scottish Championship), las altas (color, escudo, estadio y sponsor, perímetro, gestiones), el criterio del Trust y la nota de Fleetwood.
Terminado cuando: cada club británico con iXBRL que presenta y el sitio no tiene está cargado o descartado con motivo, y Scottish Championship existe en data/leagues.js.

Verificar: contiene data/leagues.js | Scottish Championship
Verificar: contiene Admin/CONVENCIONES-DATOS.md | Trust
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
