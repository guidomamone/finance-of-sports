# ESTADO del pipeline — finance-of-sports

El detalle de cómo corre el pipeline, por país y por escalón. Se lee solo al onboardear clubes o al tocar las tools del pipeline
(`tools/lote.mjs`, `cargar.mjs`, `caja-deuda.mjs` y las de cada etapa); el resto de las tareas arranca con `Admin/ESTADO.md`.
Es un snapshot, igual que `ESTADO.md`: lo que deja de ser cierto se reemplaza.

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
- Dos documentos distintos del mismo club y ejercicio: entra el que trae el estado de resultados completo de la entidad del club (si los
  dos, el más completo); el otro, a descartados (regla en `Admin/CONVENCIONES-DATOS.md`). Antes de transcribir por subagentes se lee la
  portada (paso 0 de `Admin/transcripcion-subagentes/reglas.md`).
- Club asociación o sociedad (SAD/SDUQ): se elige entidad solo cuando hay dos documentos del mismo ejercicio; el de la otra va a
  `documentos-descartados.txt`, y entonces `alta-club.mjs` y el lote dejan de verlo. Un documento único del club que no trae el fútbol (la
  SAD no consolida) no se carga. Regla en `Admin/CONVENCIONES-DATOS.md`.
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
