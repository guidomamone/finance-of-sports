# ESTADO — finance-of-sports

**Qué hay armado hoy.** Este archivo es el snapshot del proyecto: qué existe, cómo
está organizado, y qué hay cargado de cada club. No es un log: si algo que dice acá
deja de ser cierto, se reemplaza, no se apila una línea nueva al lado de la vieja.

**Lo que NO está acá:**

- **Qué falta hacer** -> `Admin/TODO.md`.
- **Qué cambió y cuándo** -> `Admin/CHANGELOG.md`.
- **Por qué se decidió algo** -> `Admin/finance-of-sports-project.md`.
- **Reglas vigentes y trampas ya encontradas** -> `Admin/CONVENCIONES.md`. Leelo siempre.
- **Cómo funciona cada archivo del motor** -> `Admin/ARQUITECTURA.md`.
- **Cómo se ve cada pantalla del sitio** -> `Admin/PANTALLA.md`. **Cómo está hecho (motor, datos, mapa de archivos)** -> `Admin/ARQUITECTURA.md`.
- **Cuántos hay en cada etapa del pipeline y cuánto cuesta el paso siguiente** -> `node tools/estado.mjs` (gratis).

---

## Objetivo del proyecto

Un sitio de finanzas de clubes de fútbol (multi-club), pensado para hinchas, periodistas y
creadores de contenido. **Todo el sitio es gratis. Licencia (decisión de Guido, 2026-10-18): el Formato simplificado bajo CC BY-NC 4.0 (libre citando,
también en medios con publicidad); el uso comercial, la reventa, la descarga masiva u otra API necesitan licencia aparte; la API, si se
hace, es paga para todos. Los documentos de los clubes no llevan la licencia del sitio, lo de Wikipedia va con CC BY-SA 4.0 y el código
tiene todos los derechos reservados (`terminos.html`; fuentes y términos en `Admin/fuentes-externas.md`). Presupuesto casi cero, sigue
siendo un proyecto hobby de Guido: no gastar en infraestructura que no haga falta todavía.

Nombre del sitio: "El deporte en Números" en castellano y "Finance of Sports" en inglés (clave
`site.name`, ver `data/lang/en.js`). Dominio: **financeofsports.com**. Carpeta y repo:
`finance-of-sports`.

---

## Estado actual

### Pipeline: de un PDF a un año cargado (en `main`)

- El onboarding se hace con el pipeline: `tools/lote.mjs` (etapas 3 a 8, lo corre Guido), `tools/cargar.mjs` (escribe el año en el sitio,
  corre los generadores y `audit.js`, y revierte si algo falla) y `tools/caja-deuda.mjs` (caja y deuda, con el club ya publicado). Lo que no
  se resuelve solo va a la cola (`tools/cola.mjs`). Guido ya no la revisa (decisión del 2026-10-13): la contesta un subagente Sonnet con cita
  del documento y del criterio de `club-data-mapping`, firmada "Claude". Lo que no puede decidir y frena un alta o un año se le
  pregunta a Guido; lo que solo el club sabe va a `Admin/dudas-por-club.md` (skill `club-or-year-onboarding`, "La cola"). Cómo se trabaja: skill `club-or-year-onboarding`; el proceso etapa por etapa y
  las decisiones de Guido: `Admin/PIPELINE.md`; las mejoras medidas y descartadas: `Admin/HALLAZGOS-pipeline.md`. Un dato publicado mal se
  corrige con un ajuste manual (`tools/ajustes.mjs`, escalón 0 de cada escalera) además de en `data/`, para que una corrida futura no lo deshaga.
- Cuántos documentos hay en cada etapa y cuánto cuesta el paso siguiente: `node tools/estado.mjs` (gratis).
- Ejercicios nuevos: una tarea programada mensual (día 1, 9:00) corre `tools/ejercicios-nuevos.mjs`, baja los PDF nuevos a `Clubes/` y
  los anota en `Admin/sourcing/README.md`, sección "Ejercicios nuevos (tarea mensual)". El canal sale de la nota de sourcing (URL o
  "Página del canal") o del registro (API danesa por CVR, Companies House por número); lo que pide navegador queda "a revisar" con la
  instrucción exacta.
- El tablero del pipeline, para el celular: artifact de Claude https://claude.ai/artifact/ESc6PC7CUbQ8wV2ETgLVdb (etapas, cola, gasto por
  día, motor y país, mails a clubes). No se actualiza solo: `node tools/tablero.mjs` y subir los CSV (cabecera de la tool; to-do 300).
- El primer año de un club se confirma sin Guido: con lo impreso (ingresos, gastos y resultado, o un total y el resultado) o, si solo
  coincide el resultado, con una pregunta a Claude sobre las filas del estado (`tools/primer-anio-ia.mjs`, la contesta `lote.mjs --ejecutar`).
- Una etiqueta que aparece bajo dos renglones de categoría distinta (gastos por función: fútbol / administración / ventas; jugadores / otros
  empleados) se pregunta y se contesta por renglón (`cargar.mjs`, clave "etiqueta@renglón"); la categoría del renglón, si no la tiene, sale
  de sus otras filas. Deuda y caja sin dato son null en todo el sitio (no queda ningún 0/0 de la convención vieja) y se muestran "—";
  sin las dos no hay deuda neta. Una cifra con forma imposible del OCR no se valida gratis en la etapa 2. Para medir un cambio de
  `cargar.mjs` en todos los documentos: `tools/medir-cargar.mjs` (`--contra-sitio`: ¿el ensayo reproduce lo publicado?). `--reemplazar`
  reconoce un año cargado por `data/` aunque el registro esté viejo. El tie-out tolera el redondeo de la unidad impresa
  (`toleranciaTieOut()`, n renglones x media unidad): un redondeo no se silencia en `audit-ignore.json`.
- `caja-deuda.mjs` lee cada fila con y sin la celda con forma de nota y decide la compuerta (que también confirma con el documento anterior);
  en deuda, si la nota de la fila muestra que la fila es solo una parte, propone la suma de la nota (y si pasan las dos, no decide).
  Antes de la IA cara prueba Jev (escalón 1b, fijo en `--club`: elige la fila de caja y las de deuda sin reglas por idioma). La compuerta
  no acepta filas que suman 0 (un 0 sale solo por "ninguna fila de deuda") ni filas con una cifra de forma imposible del OCR; en una tabla
  con grupo y sociedad lado a lado lee las columnas del perímetro del club.
- Costo de personal del ejercicio (`staffCost`, interno, no se muestra): `caja-deuda.mjs --personal` (Jev elige la fila de total entre los
  documentos del mismo cierre, con la compuerta del vecino). `--partir` lo separa de una fila global de gasto como ajustes, y `audit.js`
  avisa `sueldos-escondidos` si `wages_squad` queda por debajo de la mitad. Cargado en Volos y Panetolikos.
- Gestiones (quién condujo cada club): `tools/gestiones-tanda.mjs` arma la tanda de subagentes desde los casos de la cola, la valida y la
  carga (contesta los casos cubiertos). Los cierres que ni los balances ni la web resuelven están en `Admin/dudas-por-club.md`
  ("Gestiones sin fecha confirmada") y siguen como casos en la cola.
- De qué club y año es un PDF, y qué PDF no están cargados: `tools/quien.mjs`. El onboarding viejo (`onboard.mjs`, `prepare-onboarding.mjs`)
  está en `tools/archivo/`.
- "Posiblemente dentro de otro rubro": una fila en "—" porque el documento no desglosa un renglón la marca `tools/dentro-de-otro.mjs` si el
  club la tiene en todos sus otros balances desglosados; `cargar.mjs --escribir` la aplica solo. La página dice el rubro en un bocadillo
  (`js/info-tip.js`). Para un año sin precedente todavía no hay pregunta en la cola: queda en "—".
- `lote.mjs --ejecutar --cargar` escribe solo lo que queda "listo para cargar" (`tools/cargar-lote.mjs`: alta con el color de
  `Admin/registros/altas-revision.jsonl`, un commit por año, revierte el alta si ningún año entra). `pipeline.mjs --lista/--dir` y `lote.mjs` recalculan
  el registro solo para su lista (inventario `--solo`, mucho más rápido que el inventario entero).
- Rusia NO sale de PDFs: `tools/bfo-rusia.mjs` lee los JSON oficiales del fisco (GIR BO) con el formulario 2 (código → categoría fijo,
  compuerta: la suma da el 2300 impreso) y el formulario 6 en los clubes que reciben aportes (Akhmat, Akron, Dynamo Makhachkala, Pari NN,
  Orenburg). Escalón 2 (`tools/bfo-rusia-notas.mjs`): abre ingresos, otros ingresos/gastos y costos por elemento con las tablas de las
  notas explicativas cuando suman el código del formulario. Qué clubes y años hay: `Admin/ESTADO-clubes.md`. Cómo corre:
  `Admin/PIPELINE.md`, "Rusia (GIR BO)".
- Dinamarca desde 2025 publica en XHTML (iXBRL): `tools/xhtml-aarsrapport.mjs` lo deja como `.md` fiel con un PDF de ancla y no escribe si
  ubica menos del 98 % de las líneas (un informe diseñado como el consolidado de FC København queda afuera). Los cierres de un año en
  XHTML salen del período etiquetado del iXBRL (`periodo.mjs`, escalón 0) y, en el perímetro individual, el resultado cargado se compara con
  el `ProfitLoss` etiquetado y frena si no coincide (`tools/ixbrl-resultado.mjs`; en el consolidado solo avisa).
- Reino Unido (Companies House): los clubes que presentan en iXBRL se cargan desde el XHTML (`xhtml-aarsrapport.mjs`, sin transcribir ni pagar
  IA: `lote.mjs` la frena sobre estos documentos salvo `--pagar-ia-xhtml`); si el XHTML está maquetado con div o span, el `.md` sale sin
  tablas y el club espera el conversor (TODO 356). El resto, casi todo escaneado, se transcribe con subagentes de Claude: Tesseract más
  revisión de las páginas clave contra la imagen, con una cola en `Admin/transcripcion-subagentes/` (README.md). Lo que falta, en
  `Admin/TODO.md` (356).
- La liga de un año necesita dos fuentes (regla en `Admin/CONVENCIONES-DATOS.md`): la segunda es RSSSF, que lee
  `tools/segunda-fuente-liga.mjs` a la caché de `tools/club-league-reference/`; lo que falta, en el TODO 358.
- `tools/pipeline.mjs` hace SOLO la etapa 2 (transcribir con Mistral y validar, más el control "sin tablas"). La lista de rubros la arma
  `verificar.mjs` y la categorización es la etapa 7 del lote.
- Perímetro del club por señales (`tools/perimetro-senales.mjs`): antes de la compuerta de la etapa 3, `lote.mjs` fija solo el ajuste
  `perimetro` de un club nuevo cuando sus documentos coinciden (tablas de cada perímetro y voto con Jev); si la serie cambia de perímetro,
  no frena: un ejercicio con un solo perímetro se carga con ese (regla en `Admin/CONVENCIONES-DATOS.md`). Reconoce títulos en italiano e
  inglés; en otros idiomas decide el paso A2 (Claude, cinco criterios con peso). Frena solo si los votos de dos ejercicios chocan.
- No se transcriben PDFs nuevos salvo los de las 5 grandes ligas, Brasil y Argentina (Mistral); el resto se carga solo si ya tiene `.md`
  (regla en `Admin/CONVENCIONES.md`). Cargar sin API (con tokens de sesión): `club-or-year-onboarding/carga-con-tokens.md`.
- Un club nuevo entra al lote con un solo ejercicio; el resto de sus años, después del alta y de contestar su cola (skill
  `club-or-year-onboarding`), para que las respuestas del primero sirvan de precedente. Las respuestas grandes de la cola que todavía
  no se aplicaron quedan en `Admin/registros/cola-borradores/`. Antes de correr un lote cuyos documentos ya arrastran casos, conviene
  contestarlos primero (subagentes por grupos de clubes, con un archivo de criterio común). El lote vuelve a verificar solo un documento
  con respuestas nuevas; aun así, antes de pasar el comando conviene el ensayo de `cargar.mjs --desde-verificacion` de cada documento,
  porque frenos de la carga (signo del resultado, filas del otro lado) no se ven en la verificación.
- Estonia es un país del sitio desde el 2026-10-18 (lote 89: Flora, Harju JK Laagri, Kuressaare, Nõmme Kalju, Tartu Tammeka, FCI
  Levadia, Narva Trans, Paide, Tallinna Kalev), completa: los 54 años 2019-2025 en el sitio; con sus ligas (Meistriliiga y Esiliiga) en Ligas; Bélgica suma Lierse SK, Lokeren-Temse,
  Lommel SK, OH Leuven, Patro Eisden, RWDM, Beerschot y RAAL La Louvière (lote 90). Caja y deuda: Estonia con el vocabulario estonio (bilanss, raha, laenukohustised) y Bélgica solo la caja de un año
  sin vecino, por el código NBB 54/58 si el balance del documento cuadra; la deuda belga espera criterio (to-do 310). El estado belga se verifica por sus códigos NBB
  (`tools/nbb.mjs`). La liga de un año nuevo la resuelve `listas-lote.mjs --lote`, que corre
  `lote.mjs --cargar`. Los años belgas 2013-2024 (lote 92) pasan la compuerta de estadio y sponsor (en una liga amateur alcanza el estadio): no se cargan
  con ajustes a mano (Guido).
- Portugal está cargado salvo Benfica 2014-15 (en HALLAZGOS; to-do 165 b0). Caja y deuda: lo que falta está frenado por el documento o por la escala del año (lista en el to-do 260). Un ajuste `caja` / `deuda` puede llevar año (`ajustes.mjs --anio`), para un PDF que alimenta dos años. Rusia sale de los códigos del balance del fisco (caja 1250, deuda 1410 + 1510). Los préstamos de socios cuentan como deuda (Guido, 2026-10-17). Del to-do 237
  queda solo `al` (Guido la dejó para después). Los años en escudos (PTE) se cargan en su moneda con la paridad fija al euro, como las liras.
  Un ejercicio de transición por cambio de cierre (11 meses que encadenan con el cierre anterior y el siguiente) se carga con nota pública.
- `lote.mjs` saltea desde la etapa 3 los documentos cuyo año ya está en el sitio (salvo `--reintentar`): volver a correr una lista
  trabaja solo sobre lo que falta. En Portugal, si la portada dice SAD o SDUQ, cuotas y otras secciones en 0 son reales en ese
  documento y no se pregunta (`cargar.mjs`); el perfil del club no se toca (Porto publica años del club y de la SAD).
- Para enterarse de que terminó un lote sin mirar la terminal: el comando lleva al final
  `; osascript -e 'display notification "Terminó el lote" with title "finance-of-sports" sound name "Glass"'; say "lote terminado"`.
- Sesiones en paralelo: cada una en su worktree y su rama (`tools/worktree.mjs preparar` / `mergear`); solo la principal escribe TODO,
  CHANGELOG y ESTADO, las otras dejan su cierre en `Admin/sesiones/<rama>.md` (skill de arranque, `worktree.md`). Qué worktree hace qué:
  el "Reparto en worktrees" arriba del ORDEN de `Admin/TODO.md`. Una rama que sigue abierta después de un merge escribe lo nuevo de su
  cierre debajo de una línea con la fecha del merge; un worktree no mergea main en su rama: la principal le hace un fast-forward.
- Trabajo por roles (`Admin/CONVENCIONES.md`, «ONBOARDING CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA»): Onboarding carga, Pipeline es la única
  que toca `tools/`, la Auditora aprueba arreglos y vota criterios (skill `votacion-de-criterios`, con materialidad de 1%), y la principal
  mergea. Ningún año queda frenado por datos sin pasar por la Auditora. El gasto por sesión: `node tools/gasto.mjs --sesion <carpeta>`.
- Hooks de Claude Code (`.claude/settings.json` → `tools/hooks/pre-tool.mjs`): `audit.js` antes de cada commit publicable (frena con P0/P1;
  `[sin-audit]` con el ok de Guido), y piden permiso editar skills, `git push` y borrar en `Clubes/`; en un worktree rechazan escribir TODO,
  CHANGELOG y ESTADO. También rechazan (con el motivo y cómo reescribirlo) rutas en `/tmp`, `$(...)` y variables, `cd ... &&`, `node -e`
  que importa una tool, un subagente sin la regla de solo Read, Grep y Write, el modo plan o un `git merge`/`pull` en un worktree y `rsync`
  sin `--no-links`; `mv` en `Clubes/` pide permiso. Qué chequea cada uno: la cabecera del script.
- Estadio, capacidad, sponsor de camiseta y marca técnica de cada club y ejercicio: `data/contexto/<iso>.js` (`tools/estadio-sponsor.mjs`,
  de Wikipedia con el permalink de la revisión; lo manual en `tools/contexto-manual.json` con fuente). `cargar.mjs` no escribe un año
  nuevo sin estadio y sponsor, salvo en una liga amateur o en las segundas sin tabla de camisetas en Wikipedia, donde basta el estadio (la lista, `SOLO_ESTADIO` de `estadio-sponsor.mjs`; `compuertaContexto()`; también `bfo-rusia.mjs`). Donde la temporada en inglés no lo trae, el estadio y la capacidad salen de la Wikipedia del país
  (`--local`, con `fuenteLocal`); el sponsor y la marca que faltan, de la tabla de camisetas de la página del club (`--camisetas`, fuente en
  `club`, caché `_clubes.json`); lo manual, en `tools/contexto-manual.json`, con una fuente por campo. El índice de sponsors y marcas: `data/sponsors.js` (y uno chico para el buscador, `data/sponsors-indice.js`).
  En Finanzas, la tarjeta "Estadio y camiseta"; cada sponsor y marca tiene su página (`?tab=sponsor&sponsor=…`, con los equipos de hoy y
  la línea de tiempo), que también se encuentra en el buscador ("Sponsors y marcas").
- El plan para Guido (solo lo pendiente, corto) vive en el panel Plan de la app; su copia durable es el bloque ORDEN de `Admin/TODO.md`
  (tandas A-G por dependencias), y el detalle, en los to-dos.
- Dos documentos distintos del mismo club y ejercicio: entra el que trae el estado de resultados completo de la entidad del club (si los
  dos, el más completo); el otro, a descartados (regla en `Admin/CONVENCIONES-DATOS.md`). Antes de transcribir por subagentes se lee la
  portada (paso 0 de `Admin/transcripcion-subagentes/reglas.md`).
- Club asociación o sociedad (SAD/SDUQ): se elige entidad solo cuando hay dos documentos del mismo ejercicio; el de la otra va a
  `documentos-descartados.txt`, y entonces `alta-club.mjs` y el lote dejan de verlo. Un documento único del club que no trae el fútbol (la
  SAD no consolida) no se carga. Regla en `Admin/CONVENCIONES-DATOS.md`.
- Qué hay cargado de cada club (ejercicios, tipo de documento, moneda, deuda y caja): `Admin/ESTADO-clubes.md`, generado por
  `node tools/generate-club-index.js`. El detalle de cada año (fuente, qué es real y qué no) está en la evidencia del club, `Admin/carga-clubes/<clubId>.md`.
- Grecia está cargada (qué hay y qué falta por club: to-do 165 a y `Admin/ESTADO-clubes.md`). Las mejoras de
  script que dejó su onboarding: to-do 232; abaratar etapas (Opus → Sonnet): to-do 288; la Batch API (`tools/lote-batch.mjs`) ya está.
- Brasil, Italia y Rusia se cargaron por el pipeline (Rusia por su camino propio); en los documentos italianos viejos quedan ajustes
  manuales donde el script no da idéntico, y dos ejercicios (Lazio 2012-13, AS Roma 2021) llevan el ajuste `no-recargar` porque lo publicado
  es más detallado que lo que lee el script. Un ejercicio de menos de 12 meses no se carga: queda en `Admin/registros/documentos-parciales.txt` con el
  tramo que falta; salvo el primer ejercicio de una sociedad nueva (sin importes del año anterior), que se carga con una nota pública
  (Volos 2019, Kifisia 2022). Los ejercicios de Lazio en liras (ITL) llevan su tipo de cambio de cierre y la paridad fija a euro para mostrarse en EUR.
  La etiqueta y la gestión de cada ejercicio salen de su propio cierre, aunque el club haya cambiado la fecha de cierre. Un documento que no
  es del dominio (un artículo de prensa) va a `Admin/registros/documentos-descartados.txt`. Sin transcribir: rugby, tenis y entes italianos; ver
  `Admin/sourcing/Italia/_notas-generales.md`. Las federaciones entran al sitio.

### Qué falta de cada liga y estimados

- Por liga y año se sabe qué clubes faltan y en qué estado (`tools/faltantes-liga.mjs`, generado en cada carga); la lista de pendientes de
  sourcing es `Admin/sourcing/pendientes.md` (generada, no se edita): una sesión de sourcing puede arrancar de ahí.
- Estimaciones (`data/estimados/`, `tools/estimar.mjs`): los años que le faltan a un club que tenemos, por interpolación entre sus años
  reales, y todo club de la lista de una liga sin balance ese año (club nuevo: regresión sin historia, error alto; los países de `PAISES_SIN_ESTIMAR`, hoy Estonia, no se estiman). Se
  muestran en Ligas dentro de la tabla de ingresos con "(estimado)*", rango y error; el total de la liga los suma solo cuando más de la
  mitad tiene balance real, y la composición y el simulador usan solo lo real. Arriba de la tabla, "La liga en total, por categoría".
- Registro público de correcciones: `correcciones.html` y un bloque en Finanzas, generados del historial de git (`tools/generar-correcciones.mjs`,
  dato abierto en `data/correcciones/`). El motivo sale del trailer `Corrige:` de cada commit (regla en `Admin/CONVENCIONES.md`).
- Ligas: una lista con filtros de deporte, región e informes, agrupada por país, deporte o nivel, sin conteos de lo cargado ni plata (Guido); Escocia es un país aparte de Inglaterra (`nationOf()` en `data/leagues.js`).
- "Informes de esta liga" en Ligas (`data/informes.js`): informes de terceros sobre las finanzas de la liga, con quién lo publica, qué cubre,
  una cifra con su fuente y el link al original; los de Europa arriba. Cubre Europa, Inglaterra, Alemania, España, Italia, Brasil, Noruega, Colombia y Japón. No sale en ligas sin ranking.
- Las listas de Wikipedia (`tools/club-league-reference/`) cubren 376 liga-años y guardan la posición final donde la tabla está completa.

### Finanzas multi-año

- Finanzas tiene la tarjeta Estructura ("De quién son estos números": entidad y perímetro, cadena de dueños, controladas, clubes del
  mismo grupo y nota para periodistas) y la página del grupo multiclub (`?tab=grupo`, clubes que controla y total por año), desde
  `data/entidades/` (lo genera `tools/entidades.mjs` del registro `Admin/registros/entidades.jsonl`, con cita por línea). El registro tiene
  60 clubes y 9 grupos multiclub (265 entidades). Donde el registro los tiene, la tarjeta muestra también los ingresos de la otra entidad del club.
- Para periodistas: la tarjeta "Citar y descargar" de Finanzas (cita sugerida de lo que se ve, copiar la cita o el link, CSV por rubro y
  ejercicio con moneda, tipo de cambio y documento; sin dato va vacío, nunca 0) y la página pública `metodologia.html` (link en el pie).
- Balances propios de las entidades que organizan las ligas: en `Ligas/` (cuáles hay: `data/auditoria/_ligas.js`; las notas de sourcing de cada entidad, en `Admin/sourcing/Ligas/`), con su auditoría en
  `data/auditoria/_ligas.js` (to-do 295); en Ligas, la tarjeta "Las cuentas de la liga".
- Quién auditó cada balance: `Admin/registros/auditoria.jsonl` (con citas) y `tools/auditoria.mjs`, que genera `data/auditoria/` (todos los
  balances). En Finanzas, la tarjeta "Quién auditó estos números"; un club-año sin línea dice "Todavía no lo
  revisamos", no "sin informe", y sin ningún dato del club la tarjeta se esconde; una revisión que no es auditoría plena dice
  su alcance (revisión limitada, procedimientos acordados, propósito especial, cuentas del grupo).
- Finanzas muestra varios ejercicios a la vez: el título es el club; cards de ejercicios (default, los últimos 5 con balance) y
  fila de gestión; KPIs con comparación y sparkline; gráfico de evolución arriba de la tabla; Estado de resultados y Deuda con una
  columna por año (rubro desplegable, % del total, presupuesto al lado del balance); valores ajustados por inflación (deflactor del
  PBI, USD y EUR); fuentes por ejercicio; card "otra liga" con el puesto. `?multi=0` vuelve a la vista de un año (salida de
  emergencia). Cómo está hecho y qué no romper: `Admin/PANTALLA.md`, "Finanzas multi-año". Mockup aprobado:
  `Prototyping/Finanzas/mockup-147.html`.
- Datos que se mantienen a mano una vez por año: `data/deflactores.js` (se genera con
  `node tools/fetch-fx-reference.mjs --deflactores`) y `data/gestiones/<país>.js` (los presidentes de cada club; un año nuevo
  sin presidente que lo cubra abre un caso `gestion` en la cola al cargarlo).

### Inicio, Ligas y navegación

- Inicio: qué es el sitio, el buscador como acción principal y rankings del mundo y de América por ejercicio más tarjetas de liga, desde
  `data/rankings/_regiones.js` (lo escribe `tools/generate-rankings.js` en cada carga). Ligas: buscador, regiones y una fila por país; la
  liga elegida con ranking de barras, composición apilada y simulador. Debajo, de dónde sale la lista de clubes de la temporada (Wikipedia, CC BY-SA 4.0;
  `wiki` de cada liga-año en `data/rankings/`, de `tools/club-league-reference/`). No hay pestaña Fuentes ni botón del club en el header: se busca con
  "Buscar un club o una liga" (Ctrl/Cmd K) y el club se nombra en el título de Finanzas.
- El estado va en la URL: pestaña, club, años, liga y ejercicio, y solo cuando no son los de siempre la moneda, `real=1` (inflación),
  `formato=club` y los dos lados de Comparar (`a`, `b`); también el grupo multiclub (`?tab=grupo&grupo=…`). Se lee al abrir y con
  "atrás"; un club, liga o moneda que el sitio no tiene se ignora. Cómo está hecho: `Admin/PANTALLA.md`. Mockups: artifact de Design
  "Pantallas FoS".

### Comparar con el diseño de Finanzas

- Comparar se lee como Finanzas: los dos cards de lado son el título, con los chips de ejercicio de Finanzas (un club puede elegir
  varios ejercicios, cada lado con "Promedio | Suma"); sin botón, el resultado se arma solo con los dos lados llenos; barra con
  formato fijo y "Valores ajustados por inflación" (serie USD, propia de Comparar); un solo gráfico con A y B en el mismo eje de
  años; tabla con las filas de Finanzas (A, B, B / A, % del total, rubro desplegable); avisos de cada lado en su card y fuentes por
  ejercicio. La moneda no está en el header en ninguna pestaña: en Finanzas va en "Más opciones". Cómo está hecho: `Admin/PANTALLA.md`, "Comparar con el diseño de
  Finanzas". Mockup: `Prototyping/Comparar/mockup-23.html`.

### Techo del modelo (no es una tarea)

- La taxonomía es de fútbol (`player_sales`, `wages_squad`, `youth_football`) y las pestañas Resultados/Títulos y
  `gestionesByClub` también. Un club de otro deporte entra hoy con media taxonomía vacía y 2 pestañas sin sentido.

### Sitio, publicación y analytics

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin build step, servido desde la raíz. Deploy continuo en
  Netlify al pushear a `main` del repo de GitHub. Dominio propio: **financeofsports.com**.
- QUÉ SE PUBLICA: Netlify publica la raíz, pero `netlify.toml` borra del artefacto de deploy lo interno (`Admin/`, con las notas de
  sourcing de `Admin/sourcing/`; `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/` y `Generados/`); todo se trackea, así que el respaldo en GitHub es completo. Se publican
  las páginas `fuentes/<clubId>.html`, `data/`, `js/`, `css/` y las transcripciones `Clubes/**/*.md`: estas últimas se publican A PROPÓSITO (decisión
  de Guido; `netlify.toml` no las borra). Los PDFs no se trackean (`.gitignore`). Un documento interno nuevo va adentro de `Admin/`;
  `node tools/audit.js` caza el que quede suelto en la raíz (`doc-interno-no-excluido`).
  Los comentarios de `index.html` y `js/` también viajan al visitante: solo el porqué técnico, sin historia interna (regla en
  `Admin/PANTALLA.md`, chequeo `comentario-interno-publicado`). `data/` tampoco lleva comentarios internos ni `note`: la evidencia de
  cada carga vive en `Admin/carga-clubes/<club>.md` (la escriben los scripts del pipeline vía `tools/evidencia-club.mjs`; regla en
  `Admin/CONVENCIONES-DATOS.md`), y las de ligas, gestiones y cotizaciones en `Admin/ligas-por-pais/`, `Admin/gestiones-por-pais/` y
  `Admin/fx-cotizaciones.md` (chequeos `comentario-interno-publicado` y `comentario-en-data-club`).
- ANALYTICS: Cloudflare Web Analytics (snippet en el `<head>` de `index.html`): visitas, pageviews, referrers y país, sin cookies ni banner
  de consentimiento. Además, un Worker + KV propios (`square-sky-ca25.guidomamone91.workers.dev` → KV namespace `FOS_LOGS`, cuenta de
  Cloudflare de Guido, free tier) loggean texto libre que Web Analytics no puede: qué se tipea en el buscador (con o sin resultado) y qué par
  de clubes se elige en Comparar. Se lee directo del dashboard de Cloudflare (KV Pairs), sin reporte propio. Mixpanel (proyecto "Finance of
  sports", free tier) cubre el FUNNEL del selector, paso a paso, desde que se abre hasta que se elige un club (`selector_opened` /
  `selector_step_completed` / `selector_club_chosen`, instrumentados a mano en `js/selector.js`, nunca Autocapture). `track_pageview:false` a
  propósito, para no duplicar lo que ya da Cloudflare. El Worker y Mixpanel están GATEADOS por hostname en `js/selector.js`: solo mandan datos
  si `location.hostname === 'financeofsports.com'`, así que probar el sitio en preview local no ensucia esas cuentas.
- MI CUENTA: Supabase en plan gratis (se pausa tras 7 días sin uso). Lo mantiene despierto el Worker `fos-supabase-ping` (cron cada 3 días,
  llama a ping()); si igual se cae, la pestaña avisa "no disponible". Cómo se usa: `node tools/supabase/stats.mjs` (llama a stats(), solo
  cantidades). Las visitas: `node tools/cloudflare-visitas.mjs` (Web Analytics; el plan gratis muestrea de a 10, así que son estimadas; necesita `Admin/api-keys/cloudflare.env`). Los dos alimentan el dashboard
  de Claude https://claude.ai/artifact/7kPta8U7BxyiGRKAyayHhA. Lo actualiza la tarea programada `fos-auditoria-semanal` (lunes 8:10,
  carpeta principal; vive en `~/.claude/scheduled-tasks/`): `audit.js --quiet`, `tools/dashboard-usuarios.mjs` (arma y sube los 4 archivos y
  mira las corridas del Worker de los últimos 7 días: sin corridas o con errores, ALERTA), el tablero del pipeline, la auditoría de rutina con un
  eje rotando y de 3 a 5 sugerencias de mejora. Commitea solo `auditorias/<fecha>.md`; lo que va al TODO queda en su sección "Para TODO", para
  la principal. Avisa siempre con una línea.
- Un solo motor genérico calcula Finanzas para todos los clubes (ver `Admin/ARQUITECTURA.md`); ningún club tiene motor propio. Todos los
  `clubId` llevan el país (`<slug>-<iso2>`, ej. `boca-ar`, `corinthians-br`); los ids viejos viven en `data/club-aliases.js` y `fuentes/`
  redirige con 301 desde `netlify.toml`. `tools/audit.js` vigila el formato y el mapa.
- DATOS: cuántos clubes, de qué países y qué ejercicios tiene cada uno: `Admin/ESTADO-clubes.md` (generado). Solo cuentan los clubes
  con al menos un ejercicio REAL (balance o presupuesto oficial).

### Dónde vive cada cosa

- Raíz: las páginas del sitio (`index.html`, `fuentes.html`, `metodologia.html`, `privacidad.html`, `terminos.html`, `sitemap.xml`), `netlify.toml` y `CLAUDE.md`.
- `club/<id>.html` y `liga/<id>.html` (generadas por `tools/generate-club-pages.js`, con la imagen de `og/`): el link propio de cada club y liga,
  con título, descripción y tarjeta al compartir; Netlify las sirve en `/club/<id>` y `/liga/<id>` y la app arranca en esa pestaña (`window.FOS_RUTA`).
  La dependencia de imágenes (`@resvg/resvg-js`) vive en `tools/package.json`: `cd tools && npm install` en una carpeta nueva.
- Deporte de cada club: el pipeline lo lee de la ficha o del registro de altas (`tools/deporte-club.mjs`) y usa la taxonomía de ese deporte
  (Jev, Claude, la carga, la verificación y `audit.js`); un club sin deporte se pregunta. Cómo sumar un deporte: `Admin/PIPELINE.md`, «Un deporte nuevo». Una liga o un deporte nuevo no se agrega a mano a `data/leagues.js`: lo propone `tools/catalogo-liga.mjs` desde Wikipedia y se escribe con la aprobación registrada (la liga, la Auditora; activar un deporte, Guido). Los prompts de lectura nombran el deporte del club; `estadio-sponsor.mjs` lee la ficha de rugby (el sponsor de rugby va a mano). Un sponsor sin fuente solo pasa la compuerta con el registro de búsqueda de club-sourcing 0.5. Un renglón que el documento abre en un cuadro que suma exacto se carga con ese detalle (`tools/cuadro-sobrante.mjs`).
- `data/`: la fuente de cada club es `data/<país>/<clubId>.json` (dato abierto, esquema en `data/schema/club-v2.json`: cada línea con `category` genérica, derivada de `data/category-map.js`, y
  `subcategory` del deporte, tabla en `data/schema/taxonomy-football-1.json`; `club-v1.json` queda congelado); el sitio carga el
  `data/<país>/<clubId>-data.js`, que se GENERA desde el JSON (`tools/generar-data.mjs`; `--check` lo controla). Los
  compartidos (`clubs.js`, `leagues.js`, …) sueltos; `club-leagues/`, `gestiones/`, `rankings/` y `lang/`. Las tools arman la ruta de un
  club solo con `tools/data-clubes.js`.
- `js/` (el script principal es `js/principal.js`) y `css/styles.css`. `fuentes/`: solo las páginas públicas `<clubId>.html`.
- `Clubes/<País>/<Club>/`: los PDFs y sus transcripciones `.md`. `Generados/`: lo que las tools derivan de cada documento.
- `Admin/`: los documentos internos sueltos (este, TODO, CONVENCIONES, PIPELINE, …) y `api-keys/` (las claves, gitignoreadas salvo la
  pública de Supabase), `registros/` (los registros del pipeline; `registros/api/`, el gasto de cada API), `lotes/` (las listas abiertas y
  las de prueba), `mediciones/` (tests, backtests y propuestas medidas), `sourcing/` (las notas de sourcing; `sourcing/README.md` es donde
  Guido deja links), `carga-clubes/` (la evidencia de cada club), `ligas-por-pais/`, `gestiones-por-pais/`, `outreach/` y `Archive/`.
- `tools/`: las tools, sueltas; las que ya no se usan, en `tools/archivo/` (su README dice por qué).

---

## Si algo no cierra (números, totales)

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición.
`verifyTieOuts()` automatiza esto para los club-ejercicios que tienen un total
conocido: mirá la consola del navegador al cargar el sitio. Este sitio es para
uso público de hinchas y periodistas reales: la precisión importa más que la
velocidad acá.
