<!-- md: el pipeline etapa por etapa y las decisiones de Guido | leer: solo la etapa que se toca -->
# PIPELINE: de un PDF a un año cargado en el sitio

Referencia del proceso nuevo: qué hace cada etapa, sus escaleras y compuertas, y las decisiones de Guido que lo parametrizan.
Se actualiza en la misma sesión en que cambia una tool. Cómo se trabaja con el pipeline (reglas, medición, arranque) está en el skill
`club-or-year-onboarding`; lo que se midió y no entró, en `Admin/HALLAZGOS-pipeline.md`. Qué archivo pasa de una etapa a otra, qué lo deja
viejo y con qué comando se rehace: `Admin/CONTRATO-ETAPAS.md` (una página). Dónde está cada cosa dentro de una tool grande: `node tools/fos.mjs mapa <archivo>`.

---

## El proceso nuevo

Los comandos:

```bash
node tools/lote.mjs --lista Admin/lotes/lote-NN.txt                               # ensayo: qué haría y cuánto cuesta (gratis)
caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar      # de verdad (lo corre Guido)
caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --cargar   # además escribe lo que queda listo (altas, cargas, commits)
caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --reintentar   # camino de error (ver abajo)
node tools/cola.mjs                                                         # la cola humana
node tools/cola.mjs --lista Admin/lotes/lote-NN.txt                          # solo los casos de ese lote
node tools/estado.mjs                                                       # el tablero: cada PDF en su etapa y escalón (gratis)
node tools/inventario-transcripciones.mjs                                   # el registro, con la etapa de cada estado (gratis)
node tools/inventario-transcripciones.mjs --solo <lista|carpeta>          # solo esos PDFs (~1 s); lo usan pipeline.mjs --lista/--dir y lote.mjs
node tools/gasto-doc.mjs --lista <lista> --desde <ISO> [--hasta <ISO>]       # lo gastado por documento en una corrida pasada
```

`lote.mjs` corre las etapas 3 a 8 sobre una lista chica. Avisa (sin frenar) si un documento de la lista está también en otra `Admin/lotes/lote-*.txt`
: una lista cerrada va a `Admin/Archive/lotes/`. También avisa un documento de un club de la lista que está sin localizar y cuyo ejercicio
no cubre ni la lista ni un año cargado: se suma a la lista o va a `documentos-descartados.txt`.
Si la lista trae un documento y su versión corregida, entra solo la corrección:
el original se saltea en esa corrida y el final lo lista como propuesta para `documentos-descartados.txt` (con el ok de Guido).
- El registro (`Admin/registros/transcripciones-estado.jsonl`) se recalcula entero en ~1 min (todos los PDFs de Clubes/, sobre todo `quien.mjs --pendientes` para saber
  qué está cargado). `pipeline.mjs` con `--lista`/`--dir` y `lote.mjs` recalculan solo su lista (`--solo`, ~1 s) y copian las demás
  líneas; el recálculo entero queda para `estado.mjs --actualizar` y las corridas sin alcance. Medido: el registro sale idéntico.
- Un solo proceso a la vez escribiendo el registro: `lote.mjs` y `pipeline.mjs` (también en ensayo) y `cargar.mjs --escribir` toman el
  mismo candado (`Admin/registros/.candado.lock`, `tools/candado.mjs`). Si otro lo tiene, sale sin hacer nada y dice cuál; si quedó el de uno que
  se cortó (Ctrl+C, terminal cerrada), lo avisa y lo reemplaza.
- Lo que ya está hecho no se repite (queda en `Generados/`, que se respalda en git). Si el .md cambió desde extraer (`cache-al-dia.mjs`:
  misma huella, o cada fila sigue en su línea), un año sin cargar se rehace y uno cargado solo avisa.
  `localizar.mjs` anota en la `.ubicacion.json` el perímetro del ajuste que usó (`perimetroClub`). Si después se fija otro ajuste
  `perimetro`, esa localización está vieja y se rehace sola; los archivos sin el campo, o quien llama sin pasar el perímetro, no se comparan.
  La línea de comandos de `localizar.mjs` ahora pasa siempre el perímetro del ajuste, como `lote.mjs`.
  Además: si las filas son de otra localización (`.filas.json` guarda la huella de la `.ubicacion.json`) se rehacen
  validar y extraer; si la validación es de otra versión del .md (su `mdSha1`, o la fecha) se rehace solo validar. `cargar.mjs` usa la
  misma compuerta de la validación (`validacionAlDia`).
- Si la cola tiene respuestas a casos de la etapa 6 de un documento más nuevas que su `.verificacion.json`, el lote lo
  vuelve a verificar (gratis) antes de decidir el reintento o el rearmado con el texto propio; ya no hace falta `verificar.mjs` a mano.
- Para medir un cambio: `tools/medir-verificar.mjs` (verificar, sin tocar registros, `--pasadas 2`, `--script` para la versión vieja) y
  `tools/medir-cargar.mjs` (cargar, en paralelo por club, `--lista`/`--dir`), con las listas `Admin/lotes/prueba-{rapida,mediana,completa}.txt`.
- Un documento cuyo año ya está en el sitio (registro, o el sitio por el club y año de su propuesta; el año, del ajuste `anio` si lo tiene) no pasa por ninguna etapa más: ni
  verificar, ni categorizar, ni la propuesta de carga; dice "ya en el sitio" y la tabla final lo cuenta ahí. Con `--reintentar` sigue el
  camino de siempre. Así un lote que se vuelve a correr trabaja solo sobre lo que falta.
- Al final, la tabla "Dónde quedó cada PDF de la lista": cada documento una sola vez, en la etapa más temprana donde frenó. Los títulos de la
  terminal numeran los pasos (1/5 leer, 2/5 sumar, 3/5 categorizar, 4/5 proponer, 5/5 escribir) y los avisos que no frenan dicen "Aviso (no
  frena)" (texto aprobado por Guido r).
- El ensayo estima con el tamaño real: extraer = salida 2 × entrada; sin localizar, la mediana del club (sin historia, US$ 0,20-0,33: mediana y percentil 90 de las extracciones medidas).
- Al final: el gasto por documento y por tarea, con "N.ª vez" si esa tarea ya se había pagado para ese PDF; y el RESULTADO (listos,
  frenados, ya en el sitio: un año cargado va ahí aunque su propuesta sea vieja). Cada frenado lista TODOS sus motivos, uno por línea; si
  `cargar.mjs` cortó el análisis en un freno (`cortadoEn` en el `.carga.json`: sin club, sin .md, sin verificación...), lo dice, porque
  después de resolverlo pueden aparecer más motivos (categorías, socios, gestión) que todavía no se calcularon.

### 1 Conseguir

- a) Se encuentra el documento oficial y se guarda en `Clubes/<País>/<Club>/`.
  - Tools: `exa-search.mjs`, `wayback-cdx.mjs`, `wayback-verify-download.mjs`, `reddit-archive-search.mjs`, `twitterapiio-search.mjs`.
- b) Llega roto (un HTML con extensión .pdf, o cortado): `estado.mjs` lo lista en la etapa 1 con el archivo de `fuentes/` a reabrir.

Riesgos:
- i) un documento que no es del club, del año o del perímetro;
- ii) el mismo documento bajado dos veces con nombres distintos.

Mitigaciones:
- i) las fuentes no oficiales se guardan sin publicar; el año se lee del contenido (`periodo.mjs`), no del nombre;
  un primer ejercicio corto (rango en los títulos que no empieza el día 1, único y de menos de 12 meses) sale como período corto, no
  anual;
- ii) duplicados por huella: `inventario-transcripciones.mjs` guarda el sha1 de cada PDF (cacheado por tamaño y fecha) y de
  cada grupo de PDFs idénticos deja uno (el cargado, si no el que tiene .md, si no el que no se llama como un anexo, si no la primera
  ruta); los demás quedan en el estado `duplicado` (`duplicadoDe`). `pipeline.mjs` no los transcribe (elige por estado) y `lote.mjs` los
  saltea. Un PDF ya cargado nunca pasa a `duplicado`. Si las copias tienen años distintos en el nombre, falta un año: reabrir el sourcing.

### 2 Transcribir

- a) PDF digital (tiene texto propio): Mistral transcribe; el texto propio del PDF queda como segunda fuente gratis para la etapa 4.
- b) PDF escaneado: Mistral lo marca como escaneo; no hay segunda fuente gratis.
- c) PDF con texto roto (letras sin sentido en vez del texto real): se detecta solo y se trata como escaneo.
- c2) **Validación gratis antes de pagar** (`chequeos-gratis.mjs`, la usa `resolver-inventario.mjs` en el escalón 1a): cada página es
  `prosa` (no se valida), `validada-gratis` (todas sus cifras respaldadas por el texto del PDF, las sumas de sus tablas, la columna del año
  anterior ya cargado o el balance; tolera hasta 3 sin respaldo si el PDF tiene texto) o `dudosa`. Solo las dudosas van a Claude / Gemini.
  Escalón 0 de esa cascada: una cifra con forma imposible ("6.571,340,66", error del OCR) no se respalda con nada y su
  página queda dudosa. La misma función (`formaImposible`, en `verify-numbers.mjs`) hace que `caja-deuda.mjs` no lea esa fila. Lo ya
  transcripto no se relee: medido, ninguna llegó a un dato publicado.
- c3) **Control "sin tablas"** (`pipeline.mjs`, gratis): una transcripción vieja (no de Mistral) de 2+ páginas con menos de 5 renglones de
  tabla que todavía no pasó por verificar (sin `.verificacion.json`) se marca `sin-tablas` y la corrida siguiente la rehace con Mistral,
  una sola vez. La condición vieja era "sin la marca de Jev" de la preparación vieja, que casi todos los `.md` viejos tienen:
  marcaba 0; con la regla nueva, 238 (95 belgas; 100 de la lista de los 319 de la 292, decisión de Guido: Mistral, no subagentes; unas
  8.334 páginas). Un `.md` que ya pasó por verificar no se rehace (OH Leuven 2019 y 2021, que cierran por sus códigos NBB sin tablas).
  El ensayo (`--lista`/`--dir` sin `--ejecutar`) también lee esos candidatos y, si hay, imprime cuántos son, por país, y su
  costo (el rehacer con Mistral que cotiza `resolver-inventario`); la corrida real es la que escribe la marca.
- d) **Escalera** (escalón 1 construido; el 2 todavía no):

```
 ESCALÓN 0  la transcripción que hay ──────── ¿localizar encuentra el estado de resultados? sí → sigue
 ESCALÓN 1  si no, la transcripción no es de Mistral y el PDF tiene páginas interiores en imagen
            → re-transcribir con Mistral y volver a localizar (con --reintentar) ── ¿lo encuentra? sí → sigue
 ESCALÓN 1a el inventario dice "revisar" → resolver-inventario.mjs (las VOCES): Claude solo en las páginas `dudosa`
            de la validación gratis (c2); ignora las dudas en prosa ── compuerta: el inventario queda "listo" → sigue
            por página: una página con la misma huella que en la última validación "listo" se reusa, no se paga otra vez
            "sin verificar" (el .md cambió): primero la validación gratis del inventario; si queda "revisar", el resolver
            un .md viejo sin tablas (< 5 renglones "|", 2+ págs., motor que no es Mistral) se rehace entero con Mistral
            antes de validar; el ensayo lo cotiza igual (páginas × US$ 0,004 + la validación estimada con el .md viejo). Corrida
            sin-tablas-298e: el ensayo daba US$ 7,26 y costó 43,09; con esto, 40,60
 ESCALÓN 1b PDF digital, la etapa 4 dice que el .md no coincide con el texto propio y la verificación no
            quedó ok ni cierran todos sus chequeos de números → texto-propio-a-md.mjs rearma esas páginas (gratis) y se vuelve a localizar ── compuerta: etapas 4 y 6
            rearmado, con su escalera: método "columnas" ─► si la etapa 6 sigue sin cerrar, método "regiones" (una vez cada uno)
            COMPUERTA por página: la rearmada tiene que conservar al menos la mitad de las filas de tabla; si no, queda
            la anterior (Novorizontino 2025: estado de resultados girado 90°)
            Solo cuentan los números sin confirmar de bloques ELEGIDOS HOY: una validación hecha con otra localización
            (otro perímetro) no dispara el rearmado
            Un documento con la etapa 4 y sin la 6 (un lote cortado) pasa primero por la etapa 6, gratis y también en el
            ensayo, y el rearmado decide con ella
 ESCALÓN 2  (no entró: no hay escaneo entero con Gemini o Claude) escaneo entero → Gemini o Claude sobre las páginas candidatas
 nada → queda como fuente (memoria, dictamen, balance solo)
```

  Caso real: UC 2015, PDF híbrido; las páginas 4-9 (los estados) son imágenes y la transcripción vieja salió del texto propio del PDF.
- Tools: `mistral-ocr-transcribe.mjs`, `check-transcripcion-fidelidad.js` (corre solo), `reparar-pdf.mjs`.

Riesgos:
- i) en un escaneo, Mistral puede inventar un número con la misma seguridad que uno bien leído;
- ii) se saltea o resume una página.

Mitigaciones:
- i) la etapa 4 confirma cada número contra una fuente independiente;
- ii) `check-transcripcion-fidelidad.js` revisa páginas faltantes y bloques resumidos.

### 3 Localizar

- a) `indice-bloques.mjs` (gratis) arma una ficha de cada tabla o bloque de texto con cifras: página, líneas del .md, título de arriba,
  primeras y últimas filas.
- b) `localizar.mjs` (IA, ~US$ 0,05) ve las fichas y elige: los bloques del estado de resultados, las notas de ingresos y de gastos, la
  escala, la moneda, las columnas y el perímetro.
  Medición de modelo: `--lista <x> --modelo opus|sonnet` escribe `.ubicacion.<modelo>.json`, sin pisar el de la corrida.
- c) Si el documento no tiene estado de resultados (memoria sola, dictamen), queda como fuente.
- d) **Compuerta antes de pagar**:

```
 CIERRE     ajuste `cierre` ─► periodo.mjs ── hay → sigue · no → no se localiza (sugiere el de los vecinos)
 PERÍMETRO  ajuste (doc o club) ─► el .md trae uno solo ─► trae consolidado y el año cargado más cercano es consolidado
            ── pasa → localizar · no → no se localiza; el lote imprime el ajuste que falta (dos entidades: descartar primero la otra)
```

  `periodo.mjs`, paso 3b: si los títulos no deciden el período, vale el que declara el formulario en una frase fija, en
  celdas de tabla o en prosa: "boekjaar dat de periode dekt van ... tot ...", "exercice couvrant la période du ... au ..." (NBB) y el par
  "aruandeaasta algus / lõpp" (Estonia). Compuerta: fin de mes al final, 1 a 18 meses, una sola fecha de fin. Medido sobre los 3.429 `.md`:
  cambian 17 (16 belgas y Harju JK Laagri 2023): 12 pasan de sin cierre (o de la fecha de la asamblea: Lierse SK 2023 y 2025; del inicio:
  Beerschot 2019 -correction) al cierre del formulario, y 4 primeros ejercicios largos dejan de verse como anuales (Anderlecht 2011, 16
  meses; RAAL 2018, 14; Sint-Truiden 2013, 15; Zulte Waregem 2012, 17). Ninguno de esos 4 está cargado.

- e) **El perímetro del club por señales**, antes de la compuerta, para cada club de la lista que
  frenaría por perímetro. Mira TODOS los .md del club:

```
 PASO A (gratis)  por documento: ¿qué estados trae COMO TABLA? (fila del total de ingresos + el título de arriba que nombra un perímetro;
                  un "Conto economico" hereda el de su sección; "Financial statements at..." sin perímetro = individual)
                  solo uno → ese (si no hay un título del otro perímetro con tabla) · los dos → PASO B · nada → PASO A2
 PASO A2 (Claude) solo si el paso A no encontró ninguna tabla (otro idioma: griego, noruego...): la portada y los títulos del documento
                  con su línea y su primer texto → Claude ubica el estado de resultados y vota cinco criterios ("¿esto dice consolidado?"),
                  cada sí con su línea: título del estado o de su sección 4 · texto del estado 4 · auditor 1 · grupo 1 · portada 1.
                  Compuerta: la línea citada existe en lo mandado. 4 o más → consolidado · 0 a 2 → individual · 3 → cola; columnas o
                  estados de los dos perímetros → cola. Solo al ejecutar (~US$ 0,02 por documento; caché Generados/_cache/claude-perimetro.jsonl).
                  Medición: Admin/mediciones/perimetro-a2-medicion.txt (75 documentos, 15 clubes); --exportar-a2 arma los pedidos para medir
                  sin API (los contestan subagentes de la sesión y se agregan a la caché)
                  --modelo opus|sonnet (con --jev): A2 con ese modelo para medir, contra Admin/mediciones/perimetro-a2-verdad-ajustes.tsv
                  un club con ejercicios de los dos estados que no votaron no toma el perímetro de los ejercicios de un solo
                  estado: queda sin decidir (frena) y esos ejercicios llevan su ajuste. Ensayo: --decidir-clubes <lista> --solo-cache (gratis).
                  Auditoría a posteriori: los ajustes que escribe la regla del club nombran en su `evidencia` los
                  documentos que decidió A2; `--auditar-a2 <carpeta>` arma un pedido por documento para un subagente (grupo o
                  sociedad sola, con cita). Se corre después de cada país nuevo. La carpeta de `--auditar-a2` y la de
                  `--exportar-a2` tienen que estar fuera del repo o dentro de una que netlify.toml no publica (Admin/mediciones/...);
                  si no, frenan sin escribir
 PASO A3 (Claude) cuando A2 ve los dos estados sin totales para votar: las líneas que hablan de controladas
                  (cualquier idioma, tablas incluidas) → "¿alguna controlada hace el negocio del fútbol del club?" (la regla de
                  CONVENCIONES-DATOS). Compuerta: la línea citada está entre las mandadas y nombra a la controlada; SOLO "consolidado" decide
                  (un "individual" o "no_se" frena como antes). Cuenta como el voto de ese documento. Sonnet, solo al ejecutar (~US$ 0,01;
                  caché Generados/_cache/claude-perimetro-a3.jsonl); en el ensayo, sin respuesta guardada, el documento sale frenado.
                  Medición: --exportar-a3 <carpeta> (pedidos para un subagente) y --evaluar-a3 <carpeta> (compuerta contra el perímetro
                  fijado). Lotes 93-94: 10 casos, 6 bien, 0 mal, 3 no decide (PEC Zwolle dijo individual: no decide), 1 sin fijar;
                  el ensayo con esas respuestas pasa de 13 documentos frenados a 6
 PASO B (voto)    C1 consolidado ≥ 5% sobre individual (año o anterior) · C2 crecimientos distintos en ≥ 15 puntos (fusión) ·
                  C3 Jev: ¿una controlada hace negocio del fútbol? ── 2-3 → consolidado · 0 → individual · 1 o sin respuesta → no decide
 CLUB             la regla de Admin/CONVENCIONES-DATOS.md ("qué perímetro se carga cuando la serie cambia"): un ejercicio con un solo
                  perímetro lleva ese (ajuste del documento si no es el del club); el del club sale de los votos o, sin votos, del único
                  perímetro de la serie; sin votos y con los dos en la serie (Aris), uno por documento. Frena solo si los votos no coinciden
```

  En el ensayo no pregunta a Jev ni a Claude ni escribe: dice qué fijaría. Usa la respuesta GUARDADA de A2 si la hay; un documento sin respuesta guardada sale como "se decide al ejecutar solo si A2 ve un único estado o el voto alcanza; si
  no, el lote frena". Lotes 93 y 94 simulados sin sus ajustes de perímetro: el ensayo pasa de "0 de 36 frenarían" a 13, los que frenaron. Medido contra `Admin/mediciones/perimetro-verdad.tsv` (12 clubes italianos +
  Juventus y Novorizontino de control): 77 bien, 0 mal, 23 sin decidir; sobre los 517 documentos cargados no propone nada distinto de lo
  cargado. Lote 14: de 29 documentos frenados a 0. Con A2, la verdad da 91 bien, 0 mal, 9 sin decidir (Admin/mediciones/perimetro-a2-verdad.txt).

- f) **Escalera** (es el reintento del camino de error):

```
 ESCALÓN 0  índice normal ────────────────────────────── ¿verificar cierra y no faltan categorías? sí → sigue
 ESCALÓN 1  índice ampliado (filas que terminan en "-") + la lista de lo que faltó (--reintentar, una vez) ── ¿cierra? sí → sigue
 ESCALÓN 2  sin estado pero con notas de ingresos y gastos: LAS NOTAS HACEN DE ESTADO
            el total de cada nota es un renglón; cierra contra el resultado impreso (en Colombia, la conciliación del impuesto)
 nada → se carga lo que cerró (sin abrir) o va a la cola
```

Riesgos:
- i) elige el balance, un presupuesto u otro perímetro;
- ii) el índice parte un estado en dos o pierde un renglón suelto.

Mitigaciones:
- i) la etapa 6 lo frena si no cierra; sus dudas van a la cola;
- ii) el índice tolera huecos chicos entre filas y marca "continúa" cuando un bloque sigue al anterior.

### 4 Validar

- a) PDF digital: cada número de los bloques elegidos se busca en el texto propio de su página. Gratis.
  Una página de un PDF digital SIN texto propio (menos de 50 caracteres: una hoja escaneada metida en el PDF, como el pro-forma firmado
  de Como 2025, pág. 9 del visor) se valida como un escaneo (b). `.validacion.json` → `hibridas`.
  Lo mismo una página con texto de encabezado y pie pero con la TABLA en imagen: si de los números de sus bloques (4 cifras o más, al menos 10)
  menos del 25% están en su texto propio, va a (b). Medido en los 242 documentos con validación: cambian Genoa 2023 (1 página), Inter 2024 (6, notas con la tabla en
  imagen) y Lazio 2022 (2); los demás, idéntico.
- b) Escaneo: Gemini lee la imagen de esa página (si la rechaza, Claude). ~US$ 0,003 por página.
- **Escalera** (en qué escalón quedó cada página: `.validacion.json` → `fuentes`; el conteo, `node tools/estado.mjs --escalones`):

```
 ESCALÓN 0  texto propio del PDF (digital) ────── ¿el número está en su página? sí → confirmado
 ESCALÓN 1  Gemini lee la imagen de la página ─── ¿coincide? sí → confirmado
 ESCALÓN 2  Claude lee la imagen (si Gemini la rechaza) ── ¿coincide? sí → confirmado
 ESCALÓN 2b ¿es un 1900-2099 en la fila de encabezado de una tabla? sí → sigue sin confirmar, con propuesta "anio-encabezado"
            compuerta (avisarRegistro, etapa 6): su línea no es la de ninguna fila que se carga → no frena la categorización
 ESCALÓN 3  las sumas de la etapa 6 lo confirman (también un número sin ninguna segunda lectura: Gemini y Claude rechazaron la página;
            con la etapa 6 cerrada no frena la categorización, sin cerrar va a la cola)
 ESCALÓN 3a un número que no es el valor del año de una fila que se carga (fila del resultado, total de una
            nota, columna del año anterior) no frena la categorización: si estuviera mal leído, la etapa 6 no habría cerrado
 ESCALÓN 3b de una fila que se carga: confirmado si el resultado cierra con él y deja de cerrar con el de la segunda
            lectura (sin segunda lectura parecida, solo con cierre exacto); si las dos cierran → pregunta en la cola (no frena en silencio)
 nada → cola con los dos números
```
- Tool: `validar-bloques.mjs`.

Riesgos:
- i) Mistral y Gemini leen mal el mismo dígito borroso;
- ii) el número está en la página pero en otra columna.

Mitigaciones:
- i) las sumas de la etapa 6;
- ii) el chequeo de año anterior y de año vecino.

### 5 Extraer

- a) `extraer.mjs` (IA, ~US$ 0,20 de mediana según lo gastado en `Admin/registros/api/claude-api.jsonl`; hasta ~US$ 0,35 en documentos largos) recibe solo los bloques elegidos, con cada línea numerada.
  Medición de modelo: `--lista <x> --modelo opus|sonnet` escribe `.filas.<modelo>.json`; `medir-verificar.mjs --filas <modelo>`
  verifica con esas filas (y restaura las de la carga).
- a2) Después de la respuesta del modelo, `tools/cuadro-sobrante.mjs` (gratis) revisa los cuadros que localizar eligió y extraer no usó (un anexo con otra estructura, como el de la Liga en Mafra): si una sección suya (≥ 3 filas, desde 1.000 unidades) suma exacto el total de un único conjunto de al menos dos renglones del estado, se reparte en un grupo exacto por renglón, el reparto es más fino que lo que hay hoy y una sola columna lo cumple, esas filas pasan a ser las hijas del renglón y reemplazan a las de menor detalle (`cuadroSobrante` en el `.filas.json`). Solo en extracciones nuevas: si el año ya está cargado en el sitio (o no se sabe) se salta y dice qué habría reemplazado. Medido sobre los 945 `.filas.json`: 2 casos (Mafra 2023-24, AS Roma 2009) y 0 aplicaciones en 44.511 ensayos contra renglones de otro club (tres semillas; con un solo renglón bastaba el azar una vez cada ~10.000). No cubre un cuadro que redondea por fila (Sporting 2002-2007): sigue a mano con ajustes `fila`. Ensayo: `node tools/cuadro-sobrante.mjs --doc "<pdf>" [--como-nuevo]`.
- b) Devuelve las filas tal cual: etiqueta, importe, año anterior, tipo (renglón, subtotal, total, resultado), lado (ingreso, gasto,
  financiero, impuesto), qué renglón del estado desglosa cada fila de nota, y la escala de cada bloque.
- c) Una nota puede desglosar un renglón de otra nota (desglose anidado). De un cuadro por segmento toma solo la columna del segmento que
  abre un renglón (UC: "Comerciales").
- d) No suma, no convierte, no categoriza.
- e) Tope de salida, escalera: escalón 0, una llamada con tope de 32.000 tokens; escalón 1, solo si la respuesta se cortó por el tope, un
  reintento con 128.000 por streaming (tarea `extraer-tope-largo`). Compuerta: la respuesta termina sola y el JSON es válido; si no, error
  como antes. Caso: Ferroviária dre-2022 (libro contable de ~580 cuentas).

Riesgos:
- i) lado o tipo equivocados;
- ii) una fila de nota pegada al renglón equivocado.

Mitigaciones:
- i y ii) la etapa 6 lo frena si no cierra.

### 6 Verificar

- a) Notas: reemplazan a su renglón solo si suman, también anidadas (una fila de una nota abierta por otro cuadro). Se lee la estructura impresa: qué subtotal suma qué, cuadros de detalle que no se suman
  Si las filas directas no cierran y alguna es un subtotal con filas propias (nota 18 de Beşiktaş: costo de ventas = mercaderías + "Satılan hizmet maliyeti" con sus 11 filas), se prueba otra vez con esas filas también (hasta 3 niveles), con la misma compuerta y el ajuste `desglose` (error del documento) como siempre.
  dos veces, subtotales impresos arriba de sus componentes.
  Si las filas que dicen abrir un renglón no lo cierran, se prueba solo con las del mismo lado y 17), y las notas de intereses también dicen abrir "altri"). Escalón, no regla: como regla rompía Goiás 2025, cuya nota mezcla
  un gasto y un ingreso que dan el renglón neto.
  Nota del SUBTOTAL: si la extracción asignó la nota al subtotal del grupo ("Totale altri ricavi e proventi") y la última
  propuesta de carga marcó una categoría en 0 de ese lado ("Televisión en 0"), las filas de la nota que suman el subtotal impreso
  reemplazan a los renglones que lo componen. Solo en ese camino de error: donde el estado ya viene desglosado (Atalanta 2024, Parma 2023)
  la nota repartía distinto o repetía lo mismo con otro nombre. Los componentes pueden estar arriba del subtotal (Bologna) o abajo
  (Sassuolo: "5) Altri ricavi e proventi:" y debajo a), b), f)). La señal se queda prendida (`notaSubtotal` en el .verificacion.json): sin
  eso, al arreglarse la TV la propuesta dejaba de marcarla en 0 y la corrida siguiente volvía atrás.
- Un ajuste que el script ya resuelve se anula con `node tools/ajustes.mjs --anular "<pdf>" <campo> [--etiqueta] [--valor] --motivo`
  (el archivo es un historial: el registro `anulado` gana sobre el anterior).
- b) Resultado: ingresos − gastos ± financiero ± impuesto tiene que dar el resultado impreso.
  Escalera de la compuerta: primero las 4 combinaciones de signo del financiero y del impuesto con el
  resultado EXACTO (media unidad impresa por fila); solo si ninguna es exacta, la tolerancia de siempre. Caso: Cremonese 2025 ganaba
  "los dos invertidos" a 8.522 EUR del impreso cuando "impuesto invertido" daba exacto.
  Escalón 2, entre las combinaciones exactas y la tolerancia: el signo de CADA fila del financiero por su rótulo (intereses
  cobrados / ingresos financieros suman, pagados / gastos financieros restan; un rótulo que no dice o dice las dos cosas queda como está
  impreso; listas FIN_INGRESO / FIN_GASTO de `tools/vocabulario.mjs`), con la misma compuerta EXACTA. Caso: Volos 2021-2025 imprime los
  intereses cobrados y pagados los dos en positivo; en bloque, 2021 y 2025 entraban por la tolerancia con el cobrado cargado como gasto.
  Bélgica: el esquema NBB imprime los costos financieros (65/66B, "Kosten van schulden", "Charges des dettes") en positivo;
  están en FIN_GASTO y este escalón les pone el signo sin ajustes `fila` (Beerschot 2025). Noruega: el formato NRS
  imprime "Annen finanskostnad", "Annen rentekostnad" y "Rentekostnad" en positivo y en singular; FIN_GASTO / FIN_INGRESO van en
  singular (cubre el plural). Viking AS 2025 y Fredrikstad 2018 y 2024 cierran exacto sin ajustes; en Fredrikstad 2024, con el signo
  bien, la lectura 5 reconoce "Sum driftsinntekter" como subtotal y deja de sumarlo junto con su renglón.
  Lectura 4 con notas: (a) un renglón que resta en su lado pasa su signo a las filas de su nota
  (una deducción abierta en su nota ya no suma); (b) un total que el escalón "subtotal repetido" salteó por ser la suma de las filas de
  arriba cierra con lo que salió de esas filas, y lo de abajo queda afuera; (c) un ajuste `fila` que saca un renglón sin lado se respeta
  también en las lecturas 3 y 4 (antes volvía a entrar por su signo). Con (a), Vitória Guimarães 2021-22 pasa de la lectura 5 a la 4
  (mismos totales; abre más notas, así que una recarga pide categorizar esas filas).
  Escalón "códigos NBB": un estado belga con los códigos legales del
  esquema NBB (de 70/76A, 70/74 o 9900 hasta 9904; en tabla o en texto suelto) se lee por sus códigos: se cargan las hojas del esquema
  con el signo de su código (las reversiones "(+)/(-)" negativas restan; el detalle 600/8 + 609 o 650/652/9 si suma su renglón, nunca
  los dos; la Brutomarge abreviada se abre en Omzet/60/61 + el residuo implícito solo si el residuo no es negativo, y si no queda sin
  abrir: negativa, como gasto). Compuerta: cierran EXACTO (media unidad por fila) todos los totales impresos de la columna del año; si
  no, la escalera de siempre. No corre si el documento tiene ajustes `fila` (manda el ajuste). Con esas filas la escalera prueba primero
  la lectura 4. Dos escalones más, con la misma lectura: el chequeo del año vecino compara los códigos 9904 y 9901 impresos de las dos
  columnas cuando los ingresos se presentan distinto (Brutomarge abierta en un año y no en el otro, reclasificaciones, esquema abreviado
  contra completo), y el caso "primer año" no hace falta (cada código tiene un solo lado). Medido sobre prueba-completa + los 60 belgas
  con verificación: los 358 de otros países idénticos; en Bélgica 17 documentos pasan de cola a OK, ninguno de OK a cola, y la carga de
  los 10 años belgas publicados reproduce lo publicado (10 de 10, como antes). Ensayo gratis: `node tools/nbb.mjs "<archivo.md>"`.
  El 630 por la nota: si los códigos "Geboekt" de la nota de activos fijos (8072/8079 pases, 8073 goodwill,
  8271-8276/8279 materiales) suman EXACTO el 630, el 630 se reemplaza por esas partes, con los rótulos de los ajustes ya cargados
  ("Afschrijvingen immateriële vaste activa (spelers)", "Afschrijvingen goodwill", "Afschrijvingen materiële vaste activa"); si no, queda
  entero. No en un año ya publicado (sus filas son las que se categorizaron). Medido: 33 de 191 documentos belgas con 630 lo parten; en
  prueba-completa + belgas, 25 documentos cambian de filas con los mismos totales y estados, y los 10 años publicados se reproducen.
  Escalón "de los cuales": una fila que empieza con "Waarvan:", "dont", "davon", "of which", "de los cuales"... (DE_LOS_CUALES
  de `tools/vocabulario.mjs`) es una parte de la de arriba. Si ninguna lectura cerró, se prueban la 4 y la 5 sin esas filas; compuerta,
  cierre EXACTO. Caso: el 76A belga debajo de la Brutomarge (Lierse SK y Patro Eisden 2025), que antes pedía un ajuste `fila` en 0.
- c) Año anterior cargado: la columna del año anterior contra lo que tiene el sitio.
- d) Año vecino: si el documento del año siguiente ya pasó por extraer, su columna "año anterior" tiene que coincidir.
- e) Redondeo: si solo falta menos de media unidad por fila, se agrega una fila "Diferencia de redondeo".
- f) **Escalera de lecturas** (si la base no cierra con un número impreso, se prueba la siguiente; gana la primera que cierra y queda escrita):
  Escalón 2b, justo después: la misma lectura por rótulo pero con el valor IMPRESO con su signo, no su valor absoluto. Una reversión
  negativa dentro de los costos financieros ("Annen finanskostnad" −136.202 dentro de "Sum finanskostnader" 1.313.085, Sarpsborg 08 2023) resta de
  verdad. Misma compuerta (resultado exacto); la lectura se llama "financiero por rótulo con signo". Medido en 722 documentos: 721 idénticos.

```
 LECTURA 0  las filas tal cual ───────────────── ¿cierra? sí → OK
 LECTURA 1  + "resultado antes de impuestos" si no hay resultado final ── ¿cierra? sí → OK
 LECTURA 2  + el total impreso puede ser un renglón más del estado ─────── ¿cierra? sí → OK
 LECTURA 3  + renglones sin lado, según su signo ──────────────────────── ¿cierra? sí → OK
 LECTURA 4  + signos impresos; subtotal de un solo renglón; total bruto con deducciones aparte (Versiones 396, 409); los ajustes
            `fila` también con su signo, relativo a la mayoría de los ajustes de su lado
 ESCALÓN    si la 4 no cierra: la 4 sin contar el subtotal que repite el renglón INMEDIATO de arriba (mismo importe); si el renglón
            no se abrió, el subtotal ocupa su lugar con su nota; misma compuerta que la 4
            También una fila que no es renglón con el mismo importe que la fila inmediata de abajo (mismo lado, nada en el medio): no se
            cuenta
            Y una fila que no es renglón y es la suma con signo de las filas de arriba de su lado contando los subtotales
 ESCALÓN    si la 4 no cierra: los ajustes `fila` con el signo comparado contra cómo IMPRIME EL ESTADO su lado (la mayoría de sus
            renglones), no contra la mayoría de los ajustes: un ajuste con el valor tal cual impreso y el signo contrario resta. Misma
            compuerta que la 4; solo si cambia algún signo
 LECTURA 5  solo las hojas, con signo (C/D de balancetes); sin totales; compuerta: resultado impreso exacto
            si la 5 o la 6 cerraron, un renglón cuya nota (detalla_a) suma el renglón al centavo se abre en esa nota
            (AEK 2022-2025: nómina y amortización de pases por separado); totales y resultado no cambian
 LECTURA 6  la 5 + los renglones sin lado, según su signo
 ESCALÓN    si NINGUNA lectura cerró el RESULTADO: la 5 otra vez + los ajustes `fila` del financiero sin `reemplaza` (la 5 solo suma
            los que reemplazan); misma compuerta que la 5. No corre si el resultado ya
            cerró en alguna lectura y fallan solo los totales (Roma 2018: así, como regla de la 5, rompía lo cargado)
 ESCALÓN    si el resultado no cerró EXACTO en ninguna lectura y el documento tiene el formato del Codice Civile: "17) resta". El 17)
            (encabezado buscado en el .md, por su número o su nombre fijo) y lo que cuelga de él hasta el 17-bis o el total de C, como
            −|valor|; compuerta: la suma da EXACTO el total de C impreso; después las lecturas 0-6 con ese financiero, gana la primera que
            cierra exacto
            Si la suma no da el total de C, las sumas eligen el signo de las filas del 17-bis: la ÚNICA combinación (hasta 4 filas) que da
            exacto el total de C perdite su cambi", Atalanta 2019)
            si el .md no trae el 17) a la altura de la tabla, vale el nombre fijo del renglón en las filas
            del financiero; y si con el último subtotal la compuerta no cierra, se prueban los anteriores, del último al primero (caso Torino
            2019: etiquetas como texto arriba de una tabla sin nombres; el último subtotal es el 0 de la D). Medido en los 242 documentos con
            verificación: idéntico.
            si la extracción dejó filas de la D en el financiero, la compuerta de C mira solo las filas de C,
            y en la D una fila que cuelga de un 19) resta y una de un 18) suma; compuerta: el total de D impreso, exacto (casos Bologna 2023-24
            y 2024-25, "19) svalutazioni, a) di partecipazioni"). Medido en los 242: idéntico.
 ESCALÓN    "financiero dentro de un subtotal", el ÚLTIMO: solo si ninguna lectura ni escalón cerró. Un subtotal de
            ingresos o gastos que es la suma de los renglones de abajo con una fila del financiero adentro no se cuenta; esa fila toma el
            signo de su bloque (suma en ingresos, resta en gastos); compuerta: resultado impreso exacto (los totales mezclan lados). Caso
            Avaí 2021. Más arriba en la escalera le ganaba a la lectura 5 (Ferroviária 2012).
 ESCALÓN    "acumulados", después del patrón C: solo si nada cerró. El POC portugués (antes de 2010) imprime totales que
            acumulan: (C) = (A) + juros, (E) = (C) + extraordinarios, (G) = (E) + imposto, (D) = (B) + juros obtidos, (F) = (D) +
            extraordinarios. Un subtotal/total que es exacto el anterior de su lado + los renglones de su lado del tramo + algunas filas del
            financiero o del impuesto de ese tramo no se cuenta, y esas filas del financiero toman el signo de su lado (las dos columnas
            imprimen los juros en positivo). Solo se miran su lado, el financiero y el impuesto: el estado en dos columnas intercala los
            lados por línea (Sporting 2004-05). Compuerta: el resultado impreso exacto. Los chequeos del año vecino y del año anterior leen
            la columna con el mismo escalón (en el vecino, si su .verificacion.json dice que cerró así). Casos: Benfica 2005-06 y 2006-07,
            Sporting 1999, 2001 y 2002-03 a 2006-07. Medido con tools/medir-verificar.mjs (prueba-completa, dos pasadas): 349 de 358
            idénticos; los 9 que cambian son esos casos.
 ESCALONES  "sin-otros" y "otros con el signo del resultado", después de "acumulados", los dos con compuerta de resultado
            exacto: el primero repite "acumulados" sin las filas sin lado (un "Cash Flow" impreso debajo del resultado); el segundo lee las
            filas sin lado con el signo del RESULTADO y sin totales ("(Custos)/Proveitos com transacções de passes", Sporting 2008-09/2009-10).
 AL ESCRIBIR una fila del financiero que sumó dentro de ingresos o gastos (Juros de una nota de Outros rendimentos) se escribe
            con el lado de esa lista; (237 am) la pérdida impresa sin signo también se reconoce por el menos al final del importe o por la
            misma etiqueta en negativo en otra línea; (237 l) el chequeo del año vecino ignora documentos descartados y parciales; (298 n)
            una comparación con el año vecino que FALLA entre dos documentos con perímetro fijado distinto queda "no se puede comparar:
            perímetros distintos" y no frena (una que coincide sigue valiendo); lote completo: 718 de 720 idénticos; (237 an)
            el .rubros.json no se reescribe si no cambió (glosar no vuelve a pagar).
 ESCALÓN    "sección D": con el encabezado "D) Rettifiche di valore" (o "Value adjustments") impreso entre el
            financiero y el resultado y sin ajuste manual del financiero en esa zona: las filas sin lado de ahí van al financiero (las de un 18)
            suman |valor|, las de un 19) restan |valor|); compuerta: su suma da exacto el total de D impreso; después las lecturas 0-6 y gana la
            primera que cierra exacto (caso Bologna 2019-20).
            el encabezado también se reconoce con la "D)" y el título en celdas separadas (Inter 2023 y 2024) y con el
            "E) Proventi e oneri straordinari" (Chievo 2014-16, sin D impresa); en esa zona un "21) oneri" resta. Medido en los 177 documentos de Italia:
            cierran Chievo e Inter; Parma 2016 mejora (el total de gastos pasa a coincidir con el impreso); Lazio 2000-01 pasa de la lectura 6 a la 4
            (sigue OK y sus totales ahora cierran); el resto, idéntico.
            ESCALÓN "financiero sin hojas": en las lecturas 5 y 6 (solo hojas), si el estado no trae hojas de financiero, se usan sus renglones o su total único
            (Lazio 2016: "Oneri finanziari netti e differenze cambio (1.866.421)" era una sola fila impresa como subtotal y quedaba en 0). Medido en 242 documentos: Roma 2007 y Lazio 2011-12 y
            2012-13 dejan de marcar totales en rojo; Lazio 2012-13 pasa de cola a ok y su año anterior coincide con 2011-12; Lazio 2012-13 cargado daría ingresos 109.794312 (antes 109.794296) y
            gastos 114.569607 (antes 114.568051), pero lo ya cargado no se toca; el resto, idéntico.
            ESCALÓN "columna anterior con signo": al decidir si un total es la suma de sus renglones, la columna del año anterior también acepta la suma con el signo impreso
            (como la lectura 4 para la columna actual). Cambian solo el chequeo del año vecino y "año anterior cargado" de AC Milan 2017-18 y 2018-19 y Lazio 2015-16 y 2016-17: los
            totales que se cargan, idénticos; los 4 pasan de cola a ok
            SUBTOTAL CON HIJOS: al decidir si un total es la suma de lo de arriba (solo en la decisión final, después de los escalones previos), un subtotal con 2 hijas o más
            (que detallan_a él) que suman su importe cuenta como componente: las hijas no están en la lista de renglones y sin esto "Total Ertrag" de Basel (38,2 M) se contaba además de
            sus componentes (ingresos 76,4 M). Medido en 725 documentos (los 722 de la lista de prueba más los 3 Basel): 722 idénticos; cambian Basel 2005, 2009 y 2012 (siguen en cola por la
            fila "Verlustabdeckung", otro tema). La primera versión, que tocaba también los escalones previos, cambiaba Parma 2016, Sassuolo 2018 y Milan 2020-21: no entró
            Cobertura de pérdidas: una fila SIN LADO cuyo rótulo dice "cobertura de pérdidas" (`COBERTURA_PERDIDAS_RE` en `tools/vocabulario.mjs`: Verlustabdeckung, Verlustübernahme, Verlustausgleich…) no es un ingreso
            operativo (Guido): en verificar cuenta en el resultado como el financiero, fuera de ingresos y gastos; en cargar va como `exceptional_items` (ganancia dentro de los gastos, como la venta del 20% de Goiás 2023), no en netInterest.
            Basel 2005: ingresos 38,217415 (= Total Ertrag), gastos 38,844639, resultado 0,101193, netInterest 0,263711 (cola → ok). Solo Basel 2005, 2006 (en 0, se ignora) y 2009 tienen esa fila en todo el proyecto.
            ESCALÓN "presentación distinta": si el año vecino da distinto y la diferencia es exactamente UNA fila de gasto (no un
            total) de uno de los dos documentos, el chequeo queda sin decidir (uno la netea), sin casos en la cola. Olympiacos 2020/2021,
            Cuiabá 2022/2023; medido en los 112 casos de año vecino de la cola: 5 aciertos, 0 errores
 ESCALÓN    si la lectura que ganó (0-4) deja un renglón de ingresos de 20% o más del total dentro de un grupo de 3 renglones o
            menos: la misma lectura con la nota del subtotal abierta (sin esperar a la categoría en 0 del reintento); compuerta: cierra
            igual
            la nota reemplaza a los renglones del estado solo si trae al menos tantas filas como las que reemplaza; si trae
            menos es más gruesa y gana el estado (Sarpsborg 08 2024: Note 1 con 2 áreas contra 8 renglones de ingresos). Medido en
            prueba-completa más Sarpsborg 2023-2024 (722): 720 idénticos; cambian Sarpsborg 2024 (el buscado) y las líneas de gastos de AVS
            2023-24 (mismos totales; ya publicado, el lote no lo vuelve a procesar)
 nada cierra → reintento (una vez) → cola humana
```

  Si el documento no tiene ningún total ni resultado impreso en los bloques elegidos, es un fallo (no se carga sin confirmar sumas).
- **Escalera de escala**:

```
 ESCALÓN 0  la declarada (bloque → documento) ──────────────── declarada → manda, nunca se pisa
 ESCALÓN 1  si el documento dice "no se sabe": la del año vecino ANCLADO (la declara o la resolvió acá),
            si los ingresos del año en común dan exactamente x1.000 o x1.000.000 ──► COMPUERTA: chequeo de año vecino (d) ── pasa → adoptada
 nada → unidades y cola
```

  La cadena depende del orden (Fortaleza: 2025 declara → 2024 → 2023): `verificarLista()` repite la pasada si alguno se resolvió así.
- **Resultado impreso, escalón 2**: si no hay resultado en los bloques, una línea PREJUÍZO / SUPERÁVIT /
  "UTILE (PERDITA) DELL'ESERCIZIO" pegada al último bloque (hasta 4 líneas; en italiano el signo lo da el importe, entre paréntesis = pérdida);
  compuerta: alguna lectura cierra con él exacto. `ANTES_RE` reconoce también "prima delle imposte", el checo "před zdaněním" y el griego "προ φόρων" (sin "προ φόρων, χρηματοδοτικών…" ni "προ φόρων και τόκων", que son el resultado operativo).
- **Signo del resultado que se carga**. La compuerta del resultado compara valores absolutos, salvo cuando el resultado
  impreso es negativo: ese trae su signo y tiene que cerrar con signo; el signo que se le pasa a la carga:
  escalón 0 el ajuste `resultado-final`; escalón 1 el impreso tal cual; escalón 2 el signo de las filas, solo si el resultado del ejercicio
  cerró EXACTO con el signo opuesto Y el documento dice que el impreso es una pérdida sin signo (etiqueta de pérdida y no de las dos cosas:
  "Prejuízo" sí, "Superávit/Déficit" no; o la marca D de balancete; o los ingresos impresos en negativo). Sin señal, frena como siempre.
  Casos: Ferroviária 2013-b, 2014-b y 2017 ("= Prejuízo … D"), Novorizontino 2014-b ("PREJUIZO"), Paysandu 2025 (signos de balancete).
- **Gestión de jugadores neta**: si ninguna lectura cerró, de las filas sin lado solo cuentan las que están entre el total de
  costos y el "resultado antes de impuestos" (AS Roma 2013-2017: "Gestione operativa netta calciatori"); un valor positivo entra como ingreso, uno
  negativo como gasto. Compuerta: las lecturas 0-6 con esa selección y gana la primera que cierra el resultado EXACTO. El año vecino no se compara con un
  documento que no usa este escalón (otro régimen).
- **Chequeos cruzados**: si ninguna fila trae la columna del año anterior, "no se puede".
  escalón 1 de los dos chequeos, solo si las columnas crudas no coinciden: cada columna actual con los ajustes `fila` de
  su documento (reemplazar y agregar); en la columna anterior solo los ajustes que sacan una fila (valor 0 con reemplaza). Misma compuerta (2%).
  Caso: Roma 2007 contra 2008 (crudo 157.589 contra 162.017; con el ajuste de 2007, 162.255). Medido en los 242: 14 chequeos pasan a ok, 0 al revés, carga idéntica.
  Escalón 2, solo si el 1 tampoco coincide: la columna del año en común con LAS MISMAS FILAS que cerraron la columna que se carga
  (las líneas finales de cada documento, con su signo), no reconstruida con la lectura. Misma compuerta (2%). Caso: Ferroviária 2024, columna
  2023 (114,4 M reconstruida; 37,74 M con las filas que cerraron 2024; cargado 37,56 M). Medido en las 306: carga idéntica; pasan a ok
  Ferroviária 2024, Criciúma 2025 y Lazio 1999-00 (y Cuiabá 2024 contra 2025).
- **Resultado final**, si cerró contra "antes de impuestos": candidatos antes ± impuesto → escalón 0, impreso en el .md del
  documento; escalón 1, impreso en el documento siguiente (columna del año anterior) → compuerta: uno solo coincide; si no, cola.
- **Dudas de la IA, escalera** (antes de llegar a la cola):

```
 ESCALÓN 0  ¿afecta la carga? ── no ──► nota
 ESCALÓN 1  ¿Guido ya la contestó para este club? (club + tema + renglón) ── sí ──► se aplica
 ESCALÓN 2  ¿la aritmética la confirma? (la escalera de lecturas cerró, ningún año vecino da distinto, tema = cuadro por segmento /
            cuadro duplicado / columna, y la propuesta "sí" ya está aplicada) ── sí ──► se acepta sola, con nota
 ESCALA     duda de escala, la carga usó unidades y otro .md de la carpeta del club imprime uno de los importes del estado
            (6+ cifras, mismos decimales) pegado a su moneda, en una línea que no habla de miles ── sí ──► se cierra con la cita
 ESCALÓN 2b lo mismo cuando lo único que falla es el año vecino (: medido contra las respuestas de Guido,
            21 de 21 aceptadas tal cual) ── sí ──► se acepta sola, con nota
 MISMO CUADRO Guido ya contestó la duda del otro origen sobre el mismo cuadro (mismo primer bloque, que no sea el
            estado) y las dos son sobre si el cuadro entra ("¿se carga?" con "¿se deja afuera?", o dos "¿se deja afuera?") ── sí ──► se
            cierra con la respuesta implícita, con nota (dos "¿se carga…?" pueden ser maneras distintas de cargar: van las dos)
 NATURALEZA "¿Se carga <cuadro> como desglose conjunto / por naturaleza / transversal…?": el total del cuadro (fila total
            o subtotal; menos sus filas de otro lado) contra todas las combinaciones de renglones del estado de ese lado más el financiero
            del mismo signo, exacto a media unidad por fila. UNA combinación y propuesta "sí" ──► sí; NINGUNA y la carga no usa el cuadro
            ──► no; si no, cola. Medido: 7 de 7 respuestas iguales (Asteras 2020-2025, Levadiakos 2020, OFI 2020)
 INVENTARIOS el primer bloque de la duda es el cuadro de inventarios: UNA fila inicial, UNA final, compras (± regularizações)
            y UNA de costo, la identidad da exacta, el estado tiene ese costo y la carga no usa filas del cuadro ──► se cierra con nota,
            sin importar cómo esté redactada la pregunta (el cuadro queda afuera siempre). Medido con la cola vacía: 7 dudas, todas con la
            respuesta que ya tenían
 COLA HUMANA (escala, perímetro, cuadro de otro año, fila ilegible, "otro" y las propuestas "no" siempre llegan: medido,
            un tercio de esas dudas terminó corregido, así que son preguntas legítimas)
```
- Año vecino en otra moneda: si solo uno de los dos documentos tiene ajuste `moneda` con paridad fija al euro (PTE, ITL), se compara en
  euros a esa paridad.
- g) Sin fecha de cierre detectada: se deduce si el documento anterior y el siguiente del club cierran el mismo día (con aviso).
- h) **Compuerta del registro** (deja el documento "listo" para categorizar): exige confirmados solo los números de los bloques que usa la
  lectura que cerró (las filas que se cargan); un número de una nota que no se carga no frena. Marca `listo-para-jev`:
  5 rubros o más, o de 1 a 4 si la etapa 6 cerró contra el resultado impreso; si no, `sin-rubros`.
- Tool: `verificar.mjs` (gratis, sin IA: un modelo de lenguaje no sirve para verificar sumas).

Riesgos:
- i) dos errores que se compensan;
- ii) un club sin año vecino para comparar.

Mitigaciones:
- i) segundo chequeo (año vecino; el chequeo con un número citado en el texto del documento no entró: se midió y no agrega nada, ver `Admin/HALLAZGOS-pipeline.md`);
- ii) va a la cola.

### 7 Categorizar

- a) Precedente del club → Jev (si la confianza es 0,90 o más) → Claude por API (0,80 o más).
- b) Lo que queda debajo de 0,80 no se carga solo: va a la cola.
- c) **Escalera** (el escalón con contexto: Jev y Claude reciben como "sección" de dónde sale la fila, incluido
  "sin lado en el documento: entra como gasto por su signo, impreso en negativo"):

```
 ESCALÓN 0  ajuste manual · respuesta de la cola para esa fila, o la de otro documento del club con la misma etiqueta ──── gana siempre, en cualquier fila
 ETIQUETA REPETIDA la misma etiqueta (mismo lado) bajo dos o más renglones de categoría distinta del documento
            (PAOK "Αποσβέσεις" en fútbol y en administración; Olympiacos "Εισφορές" de jugadores y de otros empleados): el precedente sin
            contexto y la respuesta por etiqueta no deciden; solo el precedente del club con la misma nota, o la cola con la clave
            "etiqueta@renglón". Renglones distintos = títulos distintos (no palabras en común). Categoría del renglón: la propia ─► si no,
            la de sus otras filas si son 2 o más y todas coinciden
 ESCALÓN 1  precedente exacto CON CONTEXTO (misma etiqueta y mismo renglón que desglosa)
 ESCALÓN 2  precedente exacto (misma etiqueta en el club, una sola categoría)
 ESCALÓN 3  precedente por familia de palabras
 ESCALÓN 4  Jev con confianza >= 0,90
 ESCALÓN 5a ¿Claude ya respondió esto?
 ESCALÓN 5b Claude por API con confianza >= 0,80
 ESCALÓN 6a una fila que iba a la cola toma la respuesta de OTRO AÑO del club con la misma etiqueta salvo la marca
            de lista ("b) oneri sociali" = "oneri sociali"; claveFamilia igual, sin tolerancia de letras). Compuertas: mismo lado, misma
            nota (o una es el renglón del estado y la otra su hoja en la nota) y una sola categoría entre las respuestas
 ESCALÓN 6b si no: la respuesta de OTROS CLUBES DEL MISMO PAÍS. Compuertas: misma etiqueta (claveFamilia), mismo lado, mismo
            contexto (la nota que la abre o, en el estado, el renglón título de arriba: contextoFila() de padres-filas.mjs), respondida
            en al menos 1 club, todos con la misma categoría. La carga lo dice: "precedente del país: N clubes (...)"
 ESCALÓN 6c etiqueta genérica de lista cerrada (Outros, Outras, Otros, Otras, Others, Other, Altri, Altre) con la
            genérica de su lado como propuesta: se carga sin preguntar, salvo que el renglón que la abre tenga una categoría conocida
            distinta (Vila Nova 2025 "Outros" de "Despesas gerais e administrativas"). También la etiqueta repetida, con la misma compuerta
 ESCALÓN 7  materialidad, sobre lo que todavía iba a la cola: de la duda más chica a la más grande, se cargan con aviso mientras lo
            acumulado sin preguntar no pase el 1% de su lado y la confianza sea >= 0,5 (nunca la línea que junta amortización de
            jugadores y depreciación, ni una fila que chocó con otro año del club); el resto va a la cola con sus datos
 SACAR UNA FILA: una respuesta `descartar` o `corregir --valor no_es_rubro` vale solo para SU documento; la de otro año
            del club (respuesta del club, 6a) o de otros clubes (6b) no decide y la fila sigue por los escalones
 "NO ES RUBRO" de la IA en una fila verificada con lado: se excluye; si la carga no cierra, se prueba incluirla (a la cola);
            gana la que cierra
 COMPUERTA DEL LADO en todos los escalones (Versiones 374 y 377): la categoría tiene que ser del lado de la fila en el documento; si no,
            baja de escalón; la pregunta de la cola lleva la clave "etiqueta|lado"
 RESPUESTA DEL OTRO LADO: si la carga no cierra el resultado y una respuesta de la cola es del otro lado que la fila, segunda
            pasada mudando esas filas como el ajuste `categoria` (sin cambiar su efecto); gana solo si cierra el resultado impreso exacto
 nada → cola (pregunta de sí o no)
```

  Si la misma etiqueta tiene categorías distintas en el club, el precedente sin contexto no decide y se baja de escalón: "Remuneraciones"
  dentro del costo de ventas (sueldos del plantel) no se confunde con "Remuneración" dentro de gastos de administración. Dentro de un
  mismo documento, ver ETIQUETA REPETIDA arriba.
- Tools: `glosar-rubros.mjs`, `jev-categorizar.mjs`, `categorizar-claude.mjs`, `memoria-categorias.mjs`. ~US$ 0,03 por documento. El ensayo
  de `lote.mjs` la cobra solo a los documentos que van a categorizar; lote 93: de US$ 0,78 a 0,06; prueba mediana: de US$ 9,96 a 0,33 (11 de 332).

Riesgos:
- i) categoría equivocada con sumas correctas (nada lo delata).

Mitigaciones:
- i) las filas de menos de 0,80 van a la cola de categorías (etapa 8). El primer año de un club ya no es una revisión de Guido:
  el caso "primer-anio" de `verificar.mjs` pide solo que ingresos, gastos y resultado coincidan con lo impreso, y no se levanta si un
  documento vecino lo confirma, si el documento imprime los tres y lo cargado da cada uno a 0,01% o menos, o si imprime un
  solo total y el resultado, los dos a 0,01%, y el otro total no está impreso (queda determinado por la cuenta). Si solo coincide el
  RESULTADO (escalón 3, `tools/primer-anio-ia.mjs`, ~US$ 0,02): Claude recibe las líneas del estado y lo que se carga (con los signos de la
  carga) y dice si falta, sobra, se repite o está del lado equivocado alguna fila; sin nada marcado, no hay caso; con algo, el caso lleva la
  cita. `verificar.mjs` deja el pedido en el `.verificacion.json` (`primerAnio.estado` = pendiente); `lote.mjs --ejecutar` lo contesta y
  vuelve a verificar esos documentos. Medido sobre los 39 primeros años aceptados que solo cerraban por el resultado, con subagentes de la
  sesión (`--exportar` / `--importar`; `PRIMER_ANIO_SIMULAR=1` arma el pedido aunque el año anterior ya esté cargado): 38 confirmados, 1
  alarma legítima (Roma 2007, la quota di terzi cargada como financiero), y 8 de 8 errores fabricados detectados (fila repetida en los dos
  lados o en el mismo, fila que falta, lado cambiado, subtotal cargado).

### 8 Cargar

**Año belga sin ingresos (ok de Guido).** Un estado belga abreviado cuyo escalón de códigos NBB cerró exacto con la Brutomarge 9900 negativa
cargada como gasto no tiene ninguna fila de ingresos. Si además el resultado del ejercicio cierra y el total de ingresos de la verificación es 0, `cargar.mjs` ya no
frena con "ninguna fila de ingresos con categoría aceptable": el total oficial de ingresos es 0, con un aviso, y no se buscan televisión ni estadio en 0. Casos:
Lierse SK 2020 y 2021, Patro Eisden 2021 (Lierse SK 2019 sigue frenado por su período de 12 meses distinto). Medido en `prueba-completa` (703 documentos, `medir-cargar`):
solo esos 4 cambian, 0 filas a la cola, 0 categorías distintas.

- a) `cargar.mjs --desde-verificacion`: carga solo lo que la etapa 6 dejó en "ok". Tipo de cambio, liga y fuente con página. Si el
  documento no está `listo-para-jev` en el registro, el freno dice por qué (sin `.verificacion.json`, la etapa 6 no cerró, la validación es
  de otra versión del .md, números sin confirmar de la etapa 4, o el registro no se actualizó porque no corrió el lote).
  LA LIGA DE UN AÑO NUEVO: escalón 0, la fila de `data/club-leagues`; escalón 1, la lista de equipos guardada de esa
  temporada (`alta-club.mjs` proponerLiga: el club UNA sola vez, con su nombre exacto o un alias de `tools/club-league-reference/alias.json`,
  o una coincidencia parcial única). Para que el escalón 1 tenga listas, `lote.mjs --cargar` corre antes `tools/listas-lote.mjs --lote
  <lista>` (gratis, Wikipedia): baja las listas que faltan de los años de la lista, para cada liga del país con nombre en NOMBRES, también
  con sus nombres viejos (OTROS_NOMBRES: Bélgica antes de 2016 y 2016-2020), con la compuerta de siempre de la lista (tamaño y todos los
  clubes del sitio de esa liga-año). Medido en el lote 92 (Bélgica 2013-2024): 41 de 51 listas pasan; 44 de 55 documentos encuentran su
  liga; los 11 que no, quedan sin decidir (listas de un solo grupo en las ligas amateur, First Division B 2017-18 y 2018-19 con un equipo
  menos, Patro Eisden 2013-2014). Después de la liga, la compuerta de estadio y sponsor frena 22 de esos años por sponsor o
  estadio que Wikipedia no trae. (298 u2) Las listas de un grupo y el equipo de menos eran la misma causa: fetch-club-league-reference.mjs
  cortaba los códigos de la plantilla sports table con guion ("team1=B-W" -> "B": Beerschot Wilrijk sin nombre, tabla incompleta, el escalón
  de grupos la descartaba). Ahora el código acepta "." y "-" (empieza con letra o número), y la unión de grupos informa cuántos fueron
  (GRUPOS, para el tope de 40 por grupo de listas-lote). Lote 92: 41 -> 45 de 51 listas; las 6 que faltan no tienen página en Wikipedia.
  DOS FUENTES (regla de CONVENCIONES-DATOS): cada liga-temporada de la caché guarda `fuentes` (la de Wikipedia la escribe
  fetch-club-league-reference.mjs; una entrada vieja sin `fuentes` cuenta como 1). La segunda, `node tools/segunda-fuente-liga.mjs "<url>"
  <leagueId> <año> --pais xx --tabla "<título>" [--escribir]`: la tabla de posiciones de RSSSF, sin IA, sin tocar data/club-leagues/. La sección
  de la división se elige por su nombre: el enlace del índice de la página con ese texto exacto («Liga Portugal 2», no «Liga Portugal»), o la única
  línea suelta que lo contiene como título entero (sin otra palabra ni número después); si no la identifica, frena. De esa sección, la primera tabla (una liga en dos grupos da la mitad y frena). Lee las
  páginas en UTF-16; no escribe si no encuentra la tabla o da menos equipos que Wikipedia; un sitio que responde 403 o 429 se descarta (worldfootball.net). lookup-club-league.js
  dice cuántas fuentes tiene cada coincidencia. Hechas: cy-seconddivision 2024 y it-seriea 2022.
  Las 358 listas guardadas, con el lector viejo y el nuevo: mismos equipos (tr-superlig 2019 deja de leer un "team1" comentado).
- Datos como JSON con esquema: el JSON de cada club, `data/<país>/<id>.json`, es la FUENTE y el `data/<país>/<id>-data.js` que carga el sitio se genera de ahí. Las tools de carga (`cargar.mjs`, `caja-deuda.mjs`, `dentro-de-otro.mjs`, `alta-club.mjs`) leen y escriben el JSON con `tools/club-json.mjs` (`modificarClub(id, (c) => …)`: se arma con los nombres de siempre, se valida contra `data/schema/club-v1.json` y se regenera el JS; si no valida, no se escribe nada). A mano: editar el JSON y correr `node tools/generar-data.mjs` (`--check` avisa si algún JS no coincide; `--identidad` vuelve a copiar la identidad del club de `data/clubs.js`); `node tools/validar-esquema-json.mjs` lo valida y `node tools/ida-y-vuelta.mjs` regenera el JS del JSON en memoria y lo compara objeto por objeto con el que está en disco. `node tools/audit.js` corre el validador y `generar-data.mjs --check` como P1 (`json-no-valida`, `json-js-desfasado`). La biblioteca y el diccionario de nombres, en `tools/json-datos.mjs`; `tools/exportar-json.mjs` (JS → JSON) fue la migración de una sola vez.
- Extracto de Wikipedia para las gestiones: `node tools/wiki-extracto.mjs "<título>" --lang pt --ficha | --seccion "Presidentes" | --secciones` baja por la API la ficha o UNA sección de la página, en texto corto y con la URL de fuente (una página entera de club pesa 250 a 450 KB; la ficha, ~0,5 a 0,9 KB; una sección, 1 a 6 KB). Lo corre Onboarding y le pasa el extracto al subagente. No toca datos.
- b) Club nuevo: `alta-club.mjs`, en el mismo commit que su primer año. Se commitean TODOS los archivos que lista "Alta escrita (...)",
  también los compartidos (`data/currency-map.js` con el tipo de cambio nuevo): en las altas italianas quedó afuera y se commiteó suelto.
  El país del club: escalón 0, la tabla PAISES de `alta-club.mjs`; escalón 1, si la carpeta no está ahí,
  `tools/paises-referencia.json` (ISO2, moneda ISO 4217, región, nombre en inglés y la moneda de antes del euro), con una sola entrada que
  coincida sin tildes. Antes, un país nuevo frenaba con 3 preguntas (id, país, moneda); hoy las 32 carpetas sin fila (Polonia, Suecia,
  Uruguay...) se resuelven. Gales, Escocia e Irlanda del Norte van como GB (decisión de Guido). El país en el selector del sitio
  (`data/leagues.js` COUNTRIES, con su bandera) sigue aparte.
  `alta-club.mjs --todos` (el registro `Admin/registros/altas-club.jsonl`): una carpeta cuyos `.md` están TODOS en `documentos-descartados.txt`
  o `documentos-parciales.txt` no se analiza y queda `faltan-datos` con la lista; si un documento
  sale de la lista, la corrida siguiente la vuelve a analizar. Los documentos de esas dos listas tampoco cuentan como "hermanos" del
  documento base (cierre del club, "dos entidades del mismo ejercicio"): descartar el relatório de la otra entidad alcanza para que el
  perímetro deje de preguntar.
  El tipo de documento (`reportType`) del alta: escalón 0 el ajuste; si no, el `.md` tiene que tener un estado contable con 10+ filas de 2+
  montos; escalón 1: un estado de resultados corto de una columna vale si la primera página trae su título y el ejercicio anual
  (período impreso de 12 meses, o "Demonstração do Resultado do Exercício") con 5+ filas con monto; escalón 2: si la
  pregunta es solo "¿trae un estado de resultados?" (no presupuesto, intermedio ni nombre sospechoso) y la verificación del documento cerró
  con el resultado impreso, es un balance anual (cualquier idioma: los estonios no tienen palabras en STATEMENT). Si no, pregunta.
  Medido sin los 86 ajustes `reportType`: de 72 frenos a 4 (los de la rama intermedio); el lote completo, idéntico.
  Nombre legal (`decidirNombre()`): ajuste `name` (del documento o de la carpeta del club) o respuesta de la cola → si la portada y lo
  más frecuente del .md coinciden, ese → si no, pregunta a la cola (una por club, se contesta `corregir --valor "<nombre legal>"`).
  Después de un alta, un subagente Sonnet revisa nombre, tipo de documento y cierre contra el documento (decisión de Guido: el alta es
  una sola vez y se averigua fácil); lo que esté mal se corrige con un ajuste (`name`, `reportType`, `cierre`).
- c) Después corre `audit.js`; si da un error grave, revierte solo.
- d) **Escaleras chicas**:

```
 TIPO DE CAMBIO   ajuste ─► declarado (compuerta: su frase no trae otra fecha que el cierre) ─► en tabla (fecha más nueva) ─► serie oficial ─► cola
 PERÍMETRO        heredado del año cargado más cercano ─► cola
 FECHA DE CIERRE  títulos ─► encabezados de las tablas (ejercicio | un año antes) ─► vecinos ─► cola; compuerta: no más de 2 años después de hoy
                  ─► en un anual por descarte, si la fecha más citada no sale de una frase de período ("findo em", "ended") y una fila de
                  tabla que es solo encabezado trae el par (f | f un año antes) con otra fecha, manda el par: la más citada era la firma
                  o el fin de mandato
 AÑO (alta-club)  ajuste `anio` ─► nombre con dos años seguidos que bajan ("2017-2016", ambiguo): el de las fechas de cierre del .md si es
                  uno de los dos ─► la regla del nombre (el segundo de un par, el de una fecha ISO...) ─► contenido ─► cola
 PRESIDENTES      data/gestiones/<país>.js tiene una gestión confirmada que cubre el cierre ─► si no, caso `gestion` en la
                  cola (no frena; lo contesta el subagente con nombre, desde, hasta y fuente; trae como pista el firmante del .md) ─►
                  "descartar" = club sin presidente persona (SAF, sociedad anónima), no se vuelve a preguntar
                  Las tandas: `node tools/gestiones-tanda.mjs --armar [--escribir]` cierra los casos ya cubiertos y arma
                  `Admin/gestiones-por-pais/tanda-<fecha>/` (un lote por club, un subagente por lote); `--validar <carpeta>`; `--cargar
                  <carpeta> [--escribir]` suma las confirmadas a data/gestiones (misma gestión = mismo corto y mismo desde), publica y
                  contesta los casos cubiertos. Solo tandas armadas por --armar (tanda.json).
 PERÍODO CORTO    menos de 12 meses ─► la columna del año anterior sin importes (primer ejercicio de una sociedad nueva) → se carga
                  como el año con publicNote (Volos 2019, Kifisia 2022; Admin/CONVENCIONES-DATOS.md) ─► encadena con el cierre anterior
                  (+ los meses del período) y el siguiente (+12 meses), y ningún anual con cierre entre esos dos lo contiene (otro
                  documento del mismo cierre no cuenta): tramo de transición por cambio de cierre → se carga como el año del cierre con
                  publicNote y `periodMonths` (fuera del ranking, la mediana y los Δ; OH Leuven 2019, Benfica 2007-08) ─► si no → frena
                  (parcial) y la línea va sola a Admin/registros/documentos-parciales.txt con «falta: …», también en el ensayo, sin
                  caso en la cola. Cuántos meses tiene el tramo lo dice periodo.mjs; cuando el rango no está en un título (Fiorentina
                  2020, Genoa 2024, Atalanta 2022), su escalón 3c lo lee de las columnas: el cierre al lado del cierre anterior
 ETIQUETA REPETIDA se decide por renglón: ver la escalera de la etapa 7
 SIN CATEGORÍA    fila impresa (con página) que no está en el .categorias.json y nada categorizó ─► frena con su nombre ─► las demás sin categoría aceptable: más del 5% del dinero del lado frena, menos es aviso y no se cargan
 CATEGORÍAS EN 0  ajuste `cero-real` ─► (298 p2) el `cero-real` de esa categoría en OTRO documento del club, si ningún año cargado del
                  club la tiene con monto (Beerschot 2019, 2020 y 2022 toman el de 2025: "Cuotas sociales") ─► taquilla o entradas en 0 (en fútbol, Estadio) con cierre del 2020-03-31 al 2021-12-31:
                  real (ventana COVID; sin cierre conocido, el año 2021; el ajuste `covid-omitir` lo apaga) ─► salarios / TV / estadio, o socios / otros deportes según el perfil ─► reintento (una vez) ─► aviso
                  (298 p1) EL PERFIL ES POR AÑO: cada chequeo (respuesta de la cola, forma jurídica, revisión) guarda el año del documento y
                  vale para los años a menos de 5 (perfil-clubes.mjs, perfilVigente). Fuera de la ventana vale igual el chequeo más cercano
                  del club (perfilCercano), con un aviso del año del que sale: no se vuelve a preguntar. Un chequeo nuevo que contradice al más
                  cercano abre `perfil-cambio` (revisar los años cargados entre los dos; no frena). Las líneas viejas sin año no cuentan.
 LO QUE CERRÓ EN LA ETAPA 6 (Versiones 375-378): financiero e impuesto con el signo con que cerró; una fila verificada con lado no se mueve
                  por palabras ni se excluye sola por "no es rubro" dudoso
 "NO ES RUBRO"    (fila verificada con lado, dicho por la IA) excluirla ─► si la carga no cierra, incluirla (a la cola) ─► gana la que
                  cierra; el intento descartado no escribe en la cola
 "POSIBLEMENTE DENTRO DE OTRO RUBRO"
                  una fila en "—" por un renglón sin desglosar: ajuste `incluye` / `cero-real` ─► precedente del club (plata en TODOS sus
                  otros balances desglosados, al menos 2) ─► (cola: a diseñar con el primer caso) ─► queda "—". No cambia ningún número.
                  Reescribe sus propias marcas: el año nuevo nace marcado y un año viejo gana o pierde las suyas si el nuevo le cambia el
                  precedente.
```
- En el lote es propuesta; con `lote.mjs --ejecutar --cargar` (o `node tools/cargar-lote.mjs --lista <lista> [--escribir]`) lo que quedó
  "listo para cargar" se escribe solo: alta del club nuevo si el registro de altas lo da listo y `Admin/registros/altas-revision.jsonl`
  tiene su color, `cargar.mjs --escribir` con su auditoría, y un commit por año (el alta en el del primer año). Si ningún año de un club
  nuevo escribe, el alta se revierte. Antes de decidir un alta recalcula el registro de altas de ese club. El revertir restaura lo que existía y borra lo nuevo que dejó en `data/` y `fuentes/`. Exige `data/`, `index.html`, `fuentes/` y `Admin/sourcing/` sin cambios al empezar. Sin push.
  Saltea, igual que `lote.mjs`, los documentos de `documentos-descartados.txt` y de `documentos-parciales.txt` aunque tengan un `.carga.json`
  viejo.
  Al terminar avisa, sin frenar nada, qué años recién escritos todavía no tienen su línea del auditor en `Admin/registros/auditoria.jsonl` y arma sus extractos en `Generados/auditoria/` (la línea la escribe un subagente que lee el extracto).
- Club nuevo en el ENSAYO: sin `--escribir`, `cargar.mjs` no corta en "el club no existe": si la ficha del alta (`analizar()`)
  tiene id, país, moneda e inicio del ejercicio sin preguntas, anota el freno `club` y evalúa el resto con un club provisional armado de esa
  ficha. Así el ensayo de `cargar-lote.mjs` muestra los frenos reales (categorías y perfil en la cola, tie-outs, fx) y escribe sus preguntas
  en la cola antes del alta, igual que con un club existente. Con `--escribir` corta como siempre.
- Escribir: `cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año; después `caja-deuda.mjs --club <id> [--ejecutar] --escribir`.
  Al final imprime el `git add` de lo que tocó esa corrida: se pega tal cual en el commit.
  El club de `quien.mjs` se compara con el del alta solo si salió de `carpetas-clubes.mjs`: sin cita (club sin alta) `quien` usa el nombre
  de la carpeta y lo marca `clubDeCarpeta`.
  Las marcas "Posiblemente dentro de otro rubro" las pone `--escribir` solo (no hay un paso más). Para un club cargado a mano o corregido
  fuera de `cargar.mjs`: `node tools/dentro-de-otro.mjs --club <id> [--escribir]`.
- Dónde queda la evidencia: ni el JSON ni el data file llevan comentarios (`Admin/CONVENCIONES-DATOS.md`). `cargar.mjs --escribir` deja en
  `Admin/carga-clubes/<clubId>.md`, en la sección del año, la cabecera "cargado por… tie-out", la tabla de filas con la página y el
  escalón de cada categoría, los ajustes manuales y la nota de meta, y de dónde salió la liga. Lo edita solo a través de
  `tools/evidencia-club.mjs`; con `--reemplazar` saca SUS líneas de ese año (lo escrito a mano queda) y las vuelve a escribir. Si la
  auditoría da P0/P1, el `.md` se revierte junto con `data/`. `dentro-de-otro.mjs` hace lo mismo con su nota (en la meta de cada año
  marcado): como las marcas, en cada corrida saca TODAS sus notas del club y pone las de ahora.
  `alta-club.mjs` crea el `.md` del club con su "## Cabecera" (de dónde salió cada campo, el color AUSENTE a propósito) y la liga del
  año; `cargar-lote.mjs` / `bfo-rusia.mjs` cambian ahí el color al ponerlo, borran el `.md` si revierten el alta y lo incluyen en el commit.

Riesgos:
- i) el documento declara varios tipos de cambio;
- ii) el documento no declara y la moneda no está en el archivo de series (cuáles hay: `node tools/audit.js --fx`).

Mitigaciones:
- i) si están en una tabla con una fecha por columna (la fecha puede repetirse: importe, tipo y total de cada año; meses en turco incluidos) o en bloques que arrancan con una línea que es solo una fecha ("31.05.2007" y una tabla debajo), gana la fecha más nueva; si el bloque de la fecha más nueva trae varios tipos distintos (Beşiktaş 2006: caja 1,5357, préstamos 1,5442), o si no (frase, años sueltos, activo y pasivo), a la cola;
- ii) se agrega la moneda al script de series oficiales; mientras tanto, frena.

### 9 Publicar

- Commit local, un commit por año cargado. El push lo hace Guido.

### Medir un cambio a una tool (`tools/medir-pipeline.mjs`)

`tools/pipeline-tools.json` lista las tools del pipeline y, por tool, su alcance (etapa o compartida) y sus medidores (`medir-cargar`, `medir-verificar`, `caja-deuda --medir`, `audit.js --json`, …). `node tools/fos.mjs medir pipeline` toma de git las tools editadas, corre cada medidor con la versión de git (ANTES) y con lo editado (DESPUÉS) sobre el lote chico, y después el mediano o el completo según el alcance (cualquier diferencia en el mediano escala al completo); exige 3 documentos por familia afectada (país × formato, `tools/familias-docs.mjs`) y anota el resultado. Un medidor con `resumir` en la tabla cuenta qué cambió (valores de personal, avisos de la auditoría por código); solo un valor aceptado que cambia o se pierde, o un aviso nuevo, se cierra con `--explicacion "…"`. `--base <commit>` mide retroactivamente. Cada .js y .mjs de primer nivel de tools/ cae en una clase (`node tools/clasificar-tools.mjs`): en la tabla, módulo que una tool de la tabla usa (se calcula solo por los imports y los comandos que llama; se mide con los medidores de quienes lo usan), `no_pipeline` (con el motivo), `sin_medidor` o sin clasificar; una sin clasificar la frena `audit.js` (`tool-sin-clasificar`, P1) y el hook de commit. Una tool nueva se suma a `tools` o a `no_pipeline` en el mismo commit. Las listas (`Admin/lotes/prueba-*.txt`) las regenera `tools/lotes-prueba.mjs` al cerrar cada carga. El hook de commit (`tools/hooks/pre-tool.mjs`) exige la línea del registro con la huella de la tool que se commitea. Lo que una tool no pudo resolver queda en `Admin/registros/casos-sin-resolver.jsonl` con su causa (`tools/casos-sin-resolver.mjs`, hoy `costo-personal.mjs`); `node tools/fos.mjs causas` las cuenta y marca como candidata a regla a la de 3 casos de 2 clubes. La prueba de la propia herramienta: `node tools/fos.mjs probar medir-pipeline`. Un medidor que usa la red (`estadio-sponsor --ensayo`) baja las páginas que falten de Wikipedia; `medir-pipeline` revierte la caché que dejan.

**Cómo se arman los lotes** (`tools/lotes-prueba.mjs`, al cerrar cada carga). Chico: lo escrito a mano, un documento por familia, los casos raros y la ranura de la semana. Mediano: el chico, tres documentos por club, uno por estrato y hasta 5 de cada clase de caso raro. Completo: todo documento con verificación. Un CASO RARO es un documento con un ajuste manual (`ajustes-manuales.jsonl`), un freno de un script (`frenados-por-script.jsonl`) o una respuesta de la cola que no fue «aceptar» (`cola-revision.jsonl`): se leen esos registros, así una carga manual o automática entra sola. Tope por cobertura y no por antigüedad: de cada clase, el documento de año más viejo y el más nuevo, de la clase más reciente a la menos y hasta 40 documentos en el chico. La ranura de la semana suma un documento de una familia que rota por semana ISO.

**El veredicto.** Un cambio de código a una tool de esa tabla, además de medido, lleva su veredicto: `node tools/fos.mjs patron --cambio "…" --patron "<regex sobre los .md>" --escribir` comprueba que el código agregado no nombre un club, un año ni una ruta de `Clubes/`, cuenta los documentos y clubes con el patrón (general desde 3 documentos de 2 clubes) y toma la medición de la huella actual. Un cambio al lector de XHTML cuyo patrón se ve en el `.xhtml` y no en el `.md` usa `--en-xhtml "<regex>"` (cuenta sobre los `Clubes/**/*.xhtml`). GENERAL y RECHAZADA quedan en `Admin/registros/auditoria-proceso.jsonl`; un PARCHE no toca el código e imprime el `ajustes.mjs --agregar`. El hook de commit pide la línea GENERAL, salvo que el cambio sea solo de comentarios o una mudanza (`patron.mjs --exento`). Un cambio de infraestructura que no lee documentos (cuándo escribe una tool, cómo mide, el texto de un aviso) usa `--sin-documentos "por qué no lee documentos"` en lugar de `--patron`: exige igual código sin nombres y medición idéntica o explicada, y el registro guarda el motivo.

### El lote con la Batch API (`tools/lote-batch.mjs`)

Mismo lote y mismo modelo de cada tarea, a mitad de precio (Batch API de Anthropic). Corre `lote.mjs` tal cual con `FOS_CLAUDE_BATCH=1`
(`tools/claude-batch.mjs`): cada llamada a Claude sin respuesta se anota en una cola y su documento se corta en esa etapa; al terminar la
pasada se manda la cola, se espera (casi siempre menos de una hora) y el lote corre otra vez, hasta una pasada sin pedidos. Olas típicas:
perímetro A2 · localizar · localizar-2 · extraer · primer año · categorizar. Lo usan `claude-llamada.mjs` y `categorizar-claude.mjs`; la
transcripción (`claude-api-transcribe.mjs`) y el tope largo de extraer (streaming) siguen directos. No acepta `--reintentar`. Cortado,
se vuelve a correr el mismo comando y recoge el envío que esperaba. Más lento: para lotes grandes; uno chico o urgente va con `lote.mjs`.

### Camino de error (reintento)

El camino limpio no cambia: si todo suma y nada falta, el documento sigue. Las reglas extra viven acá (regla de Guido: "para cuando haya
errores"). Un documento se marca para reintentar por dos motivos:

- a) **Un desglose no suma** (una nota, o un cuadro que abre una fila de una nota). Lo detecta la etapa 6.
- b) **Una categoría da 0 cuando debería tener número.** Lo detecta la etapa 8 (ahí ya hay categorías):
  - salarios del plantel, televisión o estadio en 0: siempre, salvo la taquilla en la ventana COVID (ver CATEGORÍAS EN 0);
  - cuotas sociales en 0: solo si el perfil del club dice que tiene socios;
  - otras secciones deportivas en 0: solo si el perfil dice que tiene otros deportes (básquet, vóley, futsal...);
  - educación nunca dispara;
  - un documento con una línea "sin desglosar por la fuente" no se revisa.

Qué pasa después:

- Antes del primer pago de cada documento, la compuerta de la etapa 3 (perímetro y cierre fijados).
- Al final del lote aparecen dos listas con su comando: lo que destraba la carga (`--reintentar`: categoría en 0, o desglose
  que no suma con la etapa 6 sin cerrar) y el detalle opcional (`--reintentar --detalle`: desglose que no suma con la etapa 6 cerrada; el
  año se carga igual con el renglón sin abrir). Un año ya cargado (registro o sitio) solo se reintenta por categoría en 0, y solo si su
  propuesta de carga está al día: ningún ajuste manual del mismo documento o de su club con fecha igual o posterior.
- El reintento vuelve a localizar con un índice más permisivo (cuenta las filas que terminan en "-") y con la lista de lo que faltó, y
  extrae con esa misma lista (y la regla de usar la columna de totales de un cuadro por segmento para un renglón del estado).
- Una sola vez por documento (también por "categoría en 0": queda la marca `.reintento-categorias.json`). Si sigue faltando, se carga con aviso.
- Va en el MISMO modo que la localización vigente (si es "las notas hacen de estado", en ese modo), y un resultado "sin estado" no pisa una
  localización que tenía estado.

### Troubleshooting: un desglose que sigue sin sumar después del reintento

```
 el lote lo lista al final ("DESGLOSES QUE SIGUEN SIN SUMAR DESPUÉS DEL REINTENTO")
        │
        ▼
 node tools/diagnostico-desglose.mjs "<pdf>"   (gratis)
        │ ¿hay líneas con cifras FUERA de los bloques elegidos, cerca del desglose?
        ├── sí ──► problema del ÍNDICE (etapa 3): la tool dice por qué quedó afuera cada línea
        │          (etiqueta partida en dos, termina en "-", hueco largo...)
        │          → mejorar el índice ampliado en tools/indice-bloques.mjs
        │          → MEDIR en todas las transcripciones (ningún documento puede perder filas)
        │          → subir VERSION_AMPLIADO (cada documento reintentado tiene un reintento más) → --reintentar
        │ no
        ▼
 problema de la TRANSCRIPCIÓN o del PDF (etapa 2): escalón 1 (re-transcribir con Mistral) o mirar la página
```

Mientras tanto el documento se carga con el renglón sin abrir (correcto, con menos detalle). Caso que lo originó: UC 2013 (etiquetas partidas
en dos renglones en el cuadro por segmento); el índice ampliado v2 lo resolvió.

### Perfil de cada club

- Archivo `Admin/registros/perfil-clubes.jsonl`, se lee con `node tools/perfil-clubes.mjs [clubId]`.
- Sin perfil ni respuesta: si la portada del documento (hasta la pág. 3) dice ΠΑΕ / Ποδοσφαιρική Ανώνυμη Εταιρεία, `cargar.mjs` guarda
  "no" y "no" con esa línea como cita (fuente `forma-juridica`) y cierra los casos de perfil del club. Solo ΠΑΕ: la SAF
  brasileña no sirve (Cuiabá y Ferroviária tienen socios).
- Portugal: si la portada dice SAD o SDUQ (sociedad desportiva, solo fútbol profesional), cuotas y otras secciones en 0 son reales EN ESE
  DOCUMENTO, con esa línea como cita, y no se pregunta. No se guarda en el perfil del club, porque un club puede publicar años del club
  (con socios y modalidades) y años de la SAD (Porto). Un documento del club sin SAD en la portada sigue preguntando.
- Una respuesta de perfil en la cola (`corregir --valor sí|no`) se guarda en el perfil en el momento y cierra los casos iguales
  (mismo club y campo) de los otros años, pendientes.
- Dos datos por club: ¿tiene socios que pagan cuota?, ¿tiene otros deportes en sus estados financieros? Sí, no o no se sabe, con evidencia.
- Cuántos clubes tienen perfil y qué dice cada uno: `node tools/perfil-clubes.mjs`. Criterio aceptado por Guido: "clube social e esportes
  amadores" que además nombra básquet, vóley, futsal o remo cuenta como otros deportes.
- Si un club no está o dice "no se sabe" y la categoría da 0: pregunta de sí o no en la cola. Guido contesta o manda un agente a buscar; la
  respuesta queda en el perfil para todos los años del club.

### Ajustes manuales

- `Admin/registros/ajustes-manuales.jsonl`, se lee y se agrega con `node tools/ajustes.mjs`. Una decisión de Guido atada al documento y al campo
  (`no-recargar`, `filas-a-mano`, `estado`, `resultado-final`, `sin-dudas`, `fila` (del lado financiero, `--destino profit_on_player_sales` la manda a `financial.profit_on_player_sales` en vez de `net_interest`: «Resultados por enajenaciones» del PGC español, Girona 2021-23), `fx`, `cero-real`, `desglose`, `categoria`, `perimetro` — este también para todo el club —, `cierre`, `reportType`, `confirmado`, `caja`, `deuda-incluye` — este también para todo el club); es el escalón 0 de cada escalera y queda escrita en el `.verificacion.json` y en la meta del año.
- Cargar con tokens de sesión: `node tools/armar-a-mano.mjs <especificacion.json> [--escribir]` arma el `.ubicacion.json` y el `.filas.json` desde una especificación corta, valida cada fila contra el `.md` (la regla de `cacheAlDia`) antes de escribir, les pone las huellas (`mdSha1`, `ubicacionSha1`) y agrega el ajuste `filas-a-mano`; `node tools/huellas.mjs --documento "<pdf>"` imprime las huellas de un documento y si cada etapa está al día. La especificación está en la cabecera de `armar-a-mano.mjs`. La etapa 7 sin API: `jev-categorizar.mjs --listos --desde-sesion <json>` y `categorizar-claude.mjs --listos --desde-sesion <json>` escriben `.jev.json` y `.categorias.json` desde las respuestas de la sesión (formato en la cabecera de cada una), con las huellas de siempre, `origen`/`modelo` «sesión» y costo 0; si falta un rubro o una categoría no existe, no escriben nada (con `--dry-run` el segundo dice cuántos rubros faltan contestar). `lote.mjs --ejecutar --sin-api` corre todo lo gratis y frena, documento por documento, donde llamaría a una API (localizar, extraer, validar un escaneo, resolver el inventario, el primer año, Jev y Claude) con «frena (--sin-api): …» en el resumen; lo que la sesión dejó hecho con `armar-a-mano.mjs` y `--desde-sesion` sigue de largo hasta cargar. El perímetro por Jev tampoco se pregunta (queda como en el ensayo).
- Un año que suma dos entidades: ajuste `suma-con` sobre el PDF del AS (`--valor` el PDF del otro, `--etiqueta` el renglón de gasto del AS del que se resta la transferencia, `--etiqueta-otra` el ingreso espejo del otro documento, `--evidencia` las dos líneas). `cargar.mjs` (tools/suma-entidades.mjs) junta las filas verificadas de los dos, saca el ingreso espejo, resta ese importe del gasto y carga como resultado la SUMA de los dos impresos; no carga si el renglón del AS es menor que la transferencia o los totales no cierran. Cada etiqueta (renglones y financiero, no el impuesto) lleva el prefijo «AS · » / «Elite · »: el nombre corto sale de los nombres de los dos PDFs del ajuste (`nombresCortos()`), no está fijo. La nota pública de la fuente dice cómo se sumó. `verificar.mjs` compara cada documento solo con vecinos de su misma entidad. Las dos líneas `carga` con perímetro `suma` (y su nota) van en `entidades.jsonl`, a mano.
- `estado.mjs` regenera solo el registro (`transcripciones-estado.jsonl`, 15 s, gratis) cuando su `cargado` no coincide con `quien.mjs --pendientes`: lo cargado en un worktree no lo marcaba en el de main y el tablero contaba como «Propuesta lista» años que ya están en el sitio.
- Verificar, lecturas 3 y 6: una fila sin lado que viene después de una fila de resultado y repite su importe (la atribución, «ACIONISTAS DA EMPRESA-MÃE 7.072» debajo del resultado líquido) no es un renglón y no se suma (`repiteResultado`, en el estado propio y en el chequeo del año vecino). Benfica 2014-15 pos-AG cerraba por eso.
- Reglas de categoría de una votación: en la sección `## REGLA:` de `Admin/CONVENCIONES-DATOS.md`, una línea `CATEGORÍA (prompt): <frase>` (o `CATEGORÍA (prompt, <deporte>)`; va al prompt de `categorizar-claude.mjs`, bajo «REGLAS YA DECIDIDAS») y una `EJEMPLO-CATEGORÍA: <club-id> | revenue|expense | <etiqueta> | <categoría>` por caso (`node tools/reglas-categoria.mjs --escribir` lo registra en `categorias-aprendidas.jsonl`, con confianza 1 y el título de la regla; Jev y Claude lo ven como ejemplo, y es precedente de ese club). `audit.js` avisa (P2) si una línea es inválida o un ejemplo no está registrado. Lo cargado en el sitio gana sobre lo aprendido: ningún año cargado cambia.
- Jev y Claude con el país del club: el texto que recibe Jev trae «(club, de <país>)» (`tools/pais-club.mjs`, de `country` en `data/clubs.js`) y, en `jev-categorizar.mjs` y en `categorizar-claude.mjs`, los ejemplos con el mismo parecido de palabras salen primero los del mismo país y después los del mismo idioma. Medido sobre los 19.217 rubros de los `.rubros.json`: la lista de 8 ejemplos cambia en 4.016 (el conjunto, en 2.801) y los ejemplos del mismo país pasan de 49,5 % a 53,5 %.
- El pipeline sabe el deporte: `tools/deporte-club.mjs` da el deporte del club (`sport` de `data/clubs.js`, id interno: `futbol`, `rugby`), las categorías de su taxonomía (`SPORT_TAXONOMIES` de `data/category-map.js`) y la tabla de ceros (`CEROS_POR_DEPORTE`: una sola, con `[]` para un deporte sin medición; `node tools/deporte-club.mjs` la chequea y la corre `audit.js`). Jev y Claude reciben solo las categorías del deporte del club, el deporte en el texto («un club de rugby»), y los ejemplos del mismo deporte antes que los del mismo país; un ejemplo cuya categoría no existe en la taxonomía del deporte (ingreso + gasto juntos) no se muestra. `cargar.mjs`, `cola.mjs` y `reglas-categoria.mjs` validan la categoría contra el deporte del club. Un deporte sin taxonomía frena (`deporte`), no cae al fútbol. Los criterios de `categorizar-claude.mjs` (CRITERIOS) son los del fútbol; otro deporte recibe solo la convención del club y qué no es una línea hasta que alguien escriba los suyos. Regla de categoría de un solo deporte: `CATEGORÍA (prompt, <deporte>): <frase>`; sin deporte va a todos y todo id de la frase tiene que existir en cada deporte activo (el validador lo chequea). El alta toma el deporte de la ficha, después de la liga (`data/leagues.js`), después de las menciones del `.md`; si nada responde pregunta, y `cargar.mjs` ya no supone fútbol. El deporte de un documento (`resolverDeporte` de `tools/deporte-club.mjs`) sale de la ficha del club en `data/clubs.js` y, para un club nuevo, de la línea de su carpeta en `Admin/registros/altas-club.jsonl` (`sport: { valor, origen }`, que escribe `alta-club.mjs`: ficha, liga, menciones o claude; `origen: 'pregunta'` = se preguntó y nadie contestó); sin ninguno de los dos Jev, Claude y la cola se detienen y piden el deporte (`node tools/alta-club.mjs --todos --solo "<país>/<club>"`, gratis), no categorizan como fútbol. `lote.mjs` corre esa alta sobre las carpetas sin deporte antes de Jev y Claude. `audit.js` marca `club-sin-deporte` (P1) un club de `data/clubs.js` sin `sport`. Con el fútbol, los pedidos a Jev y a Claude, `medir-cargar.mjs` y `medir-verificar.mjs` dan idéntico.
- Gasto por sesión: cada línea nueva de `Admin/registros/api/*.jsonl` lleva `sesion` (la carpeta del worktree, `tools/sesion.mjs`); `node tools/gasto.mjs --sesion <carpeta>` suma solo lo suyo y el resumen trae el bloque «Por sesión».
- `fila` saca la fila que trajo mal la extracción con `--reemplaza "<etiqueta>"` (TODAS las que se llaman así) o `--reemplaza-linea N`
  (SOLO la de esa línea del .md, o las hojas de su nota si estaba abierta). Con etiquetas repetidas (en el formato italiano "altri" es
  ingreso, financiero + y financiero −), siempre por línea.
- Va acá lo que Guido decide forzar. NO va escrita en un documento (ningún script lo lee) ni en una respuesta de la cola (esa se ata al texto de la pregunta).

### Rarezas del documento ya revisadas

- `Admin/registros/rarezas.jsonl`, se agrega y se lista con `node tools/rarezas.mjs`: una errata del documento (fecha, nombre o cifra mal impresa) que alguien ya miró, con su línea del `.md`, el texto impreso, el veredicto y la cita (que nombra una línea, `L<n>`, o una página, `pág. <n>`). Cubre un hallazgo solo si es del mismo `.md`, a ±3 líneas, con el texto todavía ahí y si lo que cita el propio hallazgo (la cifra o el texto que marca) es lo registrado: otra cifra de la misma tabla, otra línea u otro texto se marca como siempre (Auditora 5). No decide qué valor se carga (eso es un ajuste o la cola). La leen `audit.js` (`coma-comida` no marca una línea cubierta; `rareza-sin-su-texto` P3 si una re-transcripción la movió), `auditoria.mjs --extractos` (el subagente la ve al final del extracto) y `cola.mjs` (al lado del caso cuyas líneas la cubren).

### Cola humana

- Archivo: `Admin/registros/cola-revision.jsonl`. Se lee con `node tools/cola.mjs`.
- QUÉ ALCANZA UNA RESPUESTA (el único lugar donde está escrito; la etapa 7 y el perfil remiten acá):
  - una duda por tema (escala, perímetro, cuadro duplicado...) se reconoce por club + tema + renglón: contestada en cualquier año del club
    vale para todos sus años, también si se contestó antes del alta;
  - una de perfil (`corregir --valor sí|no`) se guarda en el perfil y cierra los casos iguales de los otros años; el chequeo más
    cercano del club vale también fuera de la ventana de 5 años (con aviso), y no se vuelve a preguntar;
  - `descartar` en una de gestión cierra los otros pendientes de gestión del club;
  - una duda de localizar o extraer reformulada (mismo documento, etiquetas citadas y bloques) nace con la última respuesta;
  - una de categoría (aceptar o corregir, salvo `no_es_rubro`) cierra los casos pendientes del club con la misma etiqueta en otros años
   , queda como precedente del club (`Admin/registros/categorias-aprendidas.jsonl`) y `cargar.mjs` la aplica en otro
    documento solo si la fila está en la misma nota (si no, el caso se reabre);
  - sacar una fila (`no_es_rubro`) vale solo para su documento. Si la fila vino de una nota que abre un renglón y, con esa
    respuesta y las otras `no_es_rubro` del documento, el renglón se queda sin filas, `--responder` no la guarda y avisa (el renglón se
    perdería entero); `--igual` la guarda igual.
- Cada caso es una **pregunta de sí o no**, con la página del visor y la impresa, las líneas del .md y los datos para decidir: en
  categoría, el peso de la fila, lo contestado a la misma etiqueta (club, país, todo) y Jev aparte (`tools/datos-cola.mjs`); en las dudas de
  verificar, el historial de casos parecidos (etapa, motivo y país) y, en las de signo, la aclaración del rótulo. No hay respuesta por defecto.
- Guido contesta con `node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club --nota "..."`.
  En un caso de categoría, `descartar` se rechaza: para sacar la fila,
  `corregir --valor no_es_rubro`; para un año ya cargado, la categoría con la que está publicado.
- Una categoría que da 0 porque el documento la junta con otra línea: ajuste `incluye` (`--valor <categoría> --categoria <donde está> [--posible]`); `cargar.mjs` la escribe en `adjustments.included_in` del año del JSON (`incluidoEn` en el data file generado) y no la revisa como un 0.
- Para fijar la categoría de una fila sin que haya un caso: `node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."`.
- La próxima corrida toma la respuesta.
- Al abrir la cola, se cierran solos (estado "obsoleto", sin efecto en ninguna tool) los casos de `verificar` y de `cargar · perimetro` de
  años que ya están en el sitio: ya no frenan nada. Nunca los de categoría (pueden tocar un dato publicado) ni los de perfil (son del club).
  Si una etapa vuelve a levantar uno, se reabre y no se vuelve a cerrar solo.
- Las dudas de la IA traen un tema de una lista fija (usar un cuadro por segmento, cuadro duplicado, cuadro de otro año, perímetro, escala,
  columna, fila ilegible, otro) y el renglón al que afectan (alcance: arriba).
- Qué entra: números no confirmados que no cierran, totales o resultado que no cierran, año vecino distinto, primer año sin vecino (salvo que lo impreso lo confirme: ver etapa 7), dudas de
  localizar y de extraer que afectan la carga, y filas con categoría menor a 0,80 (etapa 8).
- Quién la contesta (decisión de Guido): un subagente Sonnet con cita del documento y del criterio de `club-data-mapping`,
  firmado "Claude"; Claude revisa contra el documento las correcciones grandes antes de aplicarlas. A Guido solo lo que el subagente no
  puede decidir y frena un alta o un año; lo que solo el club sabe, a `Admin/dudas-por-club.md` (skill `club-or-year-onboarding`).
- Las respuestas grandes de la cola que todavía no se aplicaron (un lote, un club con muchos años) quedan en `Admin/registros/cola-borradores/`,
  un archivo por lote o club, y se aplican con `cola.mjs --responder`; aplicadas, el archivo va a `Admin/Archive/`. Antes de correr un lote cuyos
  documentos ya arrastran casos, se contestan primero.

---

## Rusia (GIR BO): otro camino de entrada

Rusia no sale de PDFs. Para cada club hay un JSON oficial del fisco ruso (`Clubes/Rusia/<Club>/bfo-AAAA-datos.json`), así que el camino
reemplaza las etapas 2 a 7 y comparte la 8 (cargar) y la 9 (un commit por año, sin push). El proceso completo, con ejemplos, está en la
sección Rusia de `Admin/COMO-CORRE-EL-PROYECTO.html`; el detalle de cada escalón, en la cabecera de cada script.

- Escalón 1, `tools/bfo-rusia.mjs` (gratis, sin IA): el formulario 2 ruso con un mapa fijo de código a categoría. Compuerta: la suma de
  los renglones da el 2300 impreso. Si no cierra, el año no se carga.
- Escalón 2, `tools/bfo-rusia-notas.mjs` (IA barata, la corre Guido con `--ejecutar`): abre los renglones del formulario 2 con las tablas de
  las notas explicativas. Compuerta aritmética sin IA: las filas suman el código del formulario 2. Si no suma, el año queda con el renglón
  entero del escalón 1.
- Formulario 6, también en `tools/bfo-rusia.mjs`: para los clubes que reciben aportes (sin fines de lucro o con aportes del dueño o del
  gobierno regional). Compuerta del propio formulario: 6100 + 6200 − 6300 = 6400.
- Ensayo por defecto: `node tools/bfo-rusia.mjs [--club <Club>]` no escribe el sitio. `--escribir` carga (con la misma función
  `escribir()` de `cargar.mjs`, que audita y revierte si da P0/P1) y `--reemplazar` reescribe los años ya cargados que tienen tablas de
  notas o formulario 6.

## Dinamarca: los informes en XHTML (ESEF / iXBRL)

`Clubes/Dinamarca/` trae informes `aarsrapport-AAAA-MM-DD.xhtml`. El registro, `lote.mjs` y `cargar.mjs` trabajan sobre PDFs, así que `tools/xhtml-aarsrapport.mjs` (gratis, determinista, sin IA ni OCR) deja cada XHTML en la forma que el pipeline ya usa: un `.md` fiel (texto visible, tablas `| celda |`, cifras tal cual se imprimen, sin soft hyphens ni lo oculto) y un `.pdf` al lado, que es el mismo XHTML impreso con Chrome sin ventana. El PDF sirve de ancla del registro y del «página N del visor»; NO es el documento oficial, y la validación `numeros-vs-texto-pdf` controla al conversor, no es una segunda lectura independiente. Por eso el motor queda como «xhtml-ixbrl (determinista)» (`Admin/registros/api/xhtml-ixbrl.jsonl`, que lee `inventario-transcripciones.mjs`) y en la primera línea del `.md`.
- Compuerta (a): cada hecho iXBRL visible tiene su número impreso en el `.md`. Los que están dentro de un elemento `display:none` no se ven en el documento: se listan aparte y no frenan. Con un faltante visible no se escribe nada.
- Compuerta (b): las marcas `--- pág. N ---` salen de ubicar cada línea en la página del PDF; con menos de 98 % ubicadas no se escribe nada y se dice cuáles líneas quedaron sin página. Si el alineador simple no llega, corre un segundo escalón con la misma firma y el mismo piso, pero con la mejor asignación de páginas (`pdftotext -raw`); el consolidado PSE de FC København (95,8 %: 217 líneas no están en el PDF de Chrome) sigue sin convertirse.
- Una tabla dentro de otra (informes británicos) se lee como maquetación: sus etiquetas `table/tr/td` cuentan como salto de línea y las tablas de adentro salen como tablas. Un `span` con `position:absolute` es una línea. Un `div` con `top:` y `left:` es una celda puesta por coordenadas (los informes que Companies House saca de un PDF): las de una página se agrupan por `top` y se ordenan por `left`, dos o más en la misma fila son una fila de tabla. El medidor `xhtml` reconvierte todos los `.xhtml` (`--rehacer`); un `.md` reconvertido obliga a `lote.mjs --rehacer` (punto 419). La tool nunca escribe un `.md` ni un `.pdf` que no generó ella (ni con `--rehacer`): si el `.xhtml` tiene el mismo nombre que un PDF oficial, se renombra (`-ixbrl.xhtml`). El `.xhtml` comprimido con gzip no se lee.
- Segunda lectura del resultado: `cargar.mjs` compara el resultado cargado con el `ProfitLoss` etiquetado en el XHTML del mismo emisor y cierre (`tools/ixbrl-resultado.mjs`; consolidado → el hecho con el eje de grupo, individual → sin ejes). Si lo cargado es individual y el hecho es único y no coincide, frena (`ixbrl-resultado`); en el consolidado es un aviso y una fila de cola `ixbrl-resultado`, hasta medir dos años consolidados de clubes distintos, uno con minoritarios. Un hecho ambiguo, solo de la matriz o ausente nunca frena. El ajuste `ixbrl-omitir`, con su motivo, lo apaga para un documento.
- La escritura de `cargar.mjs` tiene su prueba de regresión: `node tools/prueba-escribir.mjs` escribe de verdad un año con fuente nueva en un worktree descartable y falla si se revierte (el ensayo no ejecuta `escribir(P)`); correrla después de tocar `cargar.mjs`.
- Lo ya etiquetado no se paga con IA: `lote.mjs --ejecutar` no corre si la lista tiene un documento de motor `xhtml-ixbrl (determinista)` (frena el lote entero, antes de escribir nada) salvo con `--pagar-ia-xhtml "<motivo>"` (queda en `Admin/registros/pagar-ia-xhtml.jsonl`). El ensayo pone «se frenaría (determinista)» al lado del costo de cada uno y separa el total entre lo que corre (los demás documentos) y lo que se frena. `audit.js` da P1 `pago-ia-sobre-determinista` si un log de API registra una llamada paga sobre uno de esos documentos sin la bandera.
- Después el documento es un PDF más: `lote.mjs` lo localiza, extrae, verifica y carga con las etapas de siempre; las compuertas aritméticas son las de siempre. Ensayo: `node tools/xhtml-aarsrapport.mjs "<xhtml>|<carpeta>"`; `--escribir` escribe el `.md` y el `.pdf` (no pisa los que existen; `--rehacer` sí).

## Categoría nueva: recategorizar lo cargado (`tools/recategorizar-etiquetas.mjs`)

Cuando una REGLA de `Admin/CONVENCIONES-DATOS.md` abre una categoría (con su línea `CATEGORÍA (prompt)`), lo ya cargado que cae en la categoría de origen se pasa por ETIQUETA, sin que Guido lea cada una. Las reglas objetivas y la expresión amplia de cada categoría están en `tools/etiquetas-reglas.mjs`; las decisiones (aprobada o excluida, con motivo y quién: regla, jev, agente, guido) en `tools/etiquetas/<categoría>.json` (`tools/subsidios-etiquetas.json` para `grants_donations`). `node tools/fos.mjs etiquetas --categoria <id>`, en este orden:

1. `--proponer`: lo claro (mezclado, solidaridad de la federación o la liga, subvención de capital, impuestos) se decide solo.
2. `--jev`: Jev recibe TODAS las etiquetas sin decidir con el criterio de la REGLA como prompt; confianza de 0,90 o más pasa sola, entre 0,50 y 0,90 va a `revisar`. Cuesta centavos; las respuestas quedan en `Admin/registros/etiquetas-jev.jsonl` y no se vuelven a preguntar. `--backtest` mide cuánto de lo ya decidido reproduce Jev (cuántas con confianza alta, y los errores de confianza alta, que son lo que importa).
3. `--prompt`: el prompt fijo para un agente (Sonnet) con las etiquetas en `revisar`; devuelve si es, el motivo y una CITA textual del `.md`. `--respuestas <json>` verifica la cita contra el archivo: sin cita verificable, o en conflicto con una regla objetiva, la etiqueta va a Guido.
4. `--guido`: la lista corta, una sola; se decide con `--decidir "<etiqueta>" aprobada|excluida --motivo "…"`.
5. `--ensayo` y `--escribir` mueven las líneas aprobadas (JSON de cada club); después `node tools/publicar.mjs` y un commit con `Corrige:`.

`audit.js` avisa `etiqueta-sin-revisar` (P3) cuando una línea de la categoría de origen puede ser de una categoría con regla y no tiene decisión. Una categoría nueva agrega su entrada a `REGLAS` en `tools/etiquetas-reglas.mjs`.

## Caja y deuda (`tools/caja-deuda.mjs`)

Comando aparte, con el club ya publicado: completa `cash` y `grossDebt` de cada año cargado donde el sitio tiene null (nunca pisa un valor
cargado) y nunca frena. Medir: `node tools/caja-deuda.mjs --medir [--club <id>] [--detalle] [--escalas]` (gratis); `--medir --jev` y
`--medir --ia` (escalones 1b y 2; sin `--ejecutar`, ensayo); `--medir --ia --modelo opus|sonnet`; el escalón 2 usa Sonnet; las respuestas de Opus ya guardadas se siguen usando. `--personal --medir` (staffCost contra `Admin/mediciones/personal-verdad.tsv`).
Escribir: `--club <id> --ejecutar --escribir` (el valor en `data/`, sin comentario; de dónde salió, en la meta del año en
`Admin/carga-clubes/<club>.md`). Cuestan API los escalones 1b (Jev, centavos por club) y 2 (IA): esa corrida la hace Guido.

Escalón 0, el ajuste manual `caja` / `deuda` (el valor tal cual impreso; se pasa a millones con la escala que se detecta para ese año), se
busca por PDF y AÑO. Si un PDF alimenta dos años del club (el del documento y su comparativo: Dortmund 2024 y 2025 desde
geschaeftsbericht-2024-25), el ajuste lleva `--anio AAAA` y vale solo para ese año; uno sin año vale solo si el PDF alimenta un único año.
Sin ajuste de ese año, el escalón 0 no decide y el año sigue por la escalera.

Caja de un año SIN VECINO en el esquema NBB belga: la escalera no decide (su compuerta pide un vecino), así que la caja sale del
código 54/58 (la celda que sigue al código) si el balance del propio documento cuadra (20/58 = 10/49). Solo la caja: la deuda por códigos
(170/4, 42, 43) no coincide con el criterio con que se cargó Bélgica (`cajaNBB` en `tools/caja-deuda.mjs`).

Caja de un año SIN VECINO en cualquier país (ok de Guido; `cajaSinVecinoAceptable`): si la escalera propone una caja y la
compuerta solo falla por "ningún año vecino", se acepta cuando tres votos coinciden: (1) la fila está en una tabla del balance cuyo total del
activo es igual (a 1 unidad) a un total del pasivo y la caja no lo supera; (2) esa tabla es la del mayor activo del documento; (3) otra fila del
documento trae la misma cifra (por ejemplo el saldo final del estado de flujos de caja). Solo la caja: "el balance cuadra" no prueba que una fila
sea deuda (de 6 deudas sin vecino, 5 distintas de lo cargado). Los votos 2 y 3 salen de Udinese 2022, cuyo documento trae en la pág. 32 el balance
de una entidad chica (activo 17,2 M) con "Disponibilità liquide" 165.648; la caja real es 44,18 M (aparece 8 veces; la mala, una). Medido con
`--medir` en todos los clubes: caja iguales 418 → 422, distintos 7 → 7, deuda idéntica; con el voto 1 solo, 8 distintos.

Estonio en el diccionario: `bilanss` (título del balance), `raha` (caja) y `laenukohustised` (préstamos) en `tools/vocabulario.mjs`.
Sin ellos ninguna fila estonia era del balance y caja-deuda daba "sin páginas de balance".

La escala del año es su propia escalera: escalón 0, el ajuste manual `escala` (`unidades` | `miles` | `millones`,
la que el documento imprime para ese año, también por PDF y año con `--anio`); escalón 1, `factorPorIngresos` (la escala con la que más
ingresos cargados del año aparecen en el documento); si ninguno da, el año queda "sin escala del documento" y no entra ni un ajuste de
`caja` o `deuda`. Hace falta cuando el comparativo va en otra escala que el año corriente (RB Leipzig 2024: "30.06.2024 TEUR" en el
jahresabschluss-2024-25, con el 2025 en EUR) o cuando una transcripción vieja sin tablas no deja encontrar la escala (RB Leipzig 2023, HSV 2024).

Diccionario de deuda en italiano (escalón 1, `DEUDA_FINANCIERA` de `tools/vocabulario.mjs`): banche, debiti finanziari, obbligazioni y soci
per finanziamenti. La numeración italiana "4 bis)", "5-bis)", "15 bis )" sale de la etiqueta igual que "4)", así que
las filas "… oltre l'esercizio successivo" (largo plazo) también entran. "Altri finanziatori" (factoring) no entra: el criterio no es el mismo en todos los clubes (Monza 2024 no lo
cuenta, Genoa 2022 sí).

```
 LECTURA DE FILAS  una sola referencia a nota; una celda con "%" no es un importe; un código NBB ("54/58", "76A") tampoco; activo y pasivo en la misma fila = dos filas; sin código de cuenta ni numeración
                   ("4)", "a)") para el diccionario. La referencia a nota es una escalera: escalón 1, si la tabla tiene una columna de
                   notas inequívoca antes de la cifra, la cifra es un importe (Novorizontino 2019 "| Empréstimos |  | 27 | 24 |");
                   escalón 2, sin esa evidencia, el primer entero de 1-2 dígitos se descarta como nota; una lista de notas con ";"
                   ("3;8;9;21;", "3.7.; 4.") nunca es importe; y una columna de notas
                   de varios niveles ("6.1", "6.8": la primera columna numérica, valores con punto, en orden creciente) se saca de la fila
                   (AEK 2018 "| Ταμειακά διαθέσιμα | 6.8 | 1.650.369,92 |" daba caja 6,8). Lo que ese detector no reconoce (AEK 2019,
                   notas sin orden) lo resuelven las DOS LECTURAS: cada propuesta se evalúa con la fila de siempre y sin la
                   celda en una columna con forma de nota, con los vecinos leídos igual; decide la compuerta (una sola pasa → esa; las dos
                   con valores distintos → no decide). Una tabla con los dos perímetros lado a lado (encabezado "Όμιλος | Εταιρεία", Group /
                   Company, Konzern / Gesellschaft...) da las cifras de cada uno por separado y se toman las del ajuste `perimetro`. Una fila con una cifra de forma imposible ("13.950,790,99", OCR) no se usa. La columna con forma de nota se juzga sin el encabezado del bloque. Una celda que no puede ser
                   importe en ningún formato tampoco es cifra: entero con punto final ("24.") o dos o más puntos con grupos de menos de 3
                   cifras ("7.1.3"); Grecia: Olympiacos 2017 "| Ταμειακά διαθέσιμα | 24. | 1.820.725,55 |", Aris 2019 "| ... | 7.1.3 | 420.500,00 |".
 PERSONAL         `caja-deuda.mjs --personal` (el código vive en `tools/costo-personal.mjs`; el despachador de opciones sigue en caja-deuda.mjs; escalón 1 = la nota de personal por su estructura, antes de Jev; `node tools/fos.mjs personal` corre la cadena de los clubes con aviso `sin-salarios`): staffCost (costo de personal del ejercicio, interno) = la fila de total que
                  Jev elige entre las de todos los documentos del mismo cierre, con la compuerta del vecino (medido: 9 de 9 en Volos y
                  Panetolikos). COMPUERTA DE PLAUSIBILIDAD: un total que es menos de 15 % de los ingresos del año no se usa (casi seguro la
                  nota de otra entidad del grupo, sin los jugadores: Aston Villa 2019-22). `--partir` separa el sueldo de la fila global cuando el año no
                  tiene wages_squad y hay UNA sola fila global >= staffCost; si ninguna alcanza (el estado por función reparte los sueldos entre costo de
                  ventas y administración) marca `incluye wages_squad --posible` en la fila global más grande. Con `--escribir` corre SOLO la cadena
                  entera: ajustes → verificar.mjs → jev-categorizar.mjs → categorizar-claude.mjs → cargar.mjs --reemplazar --escribir (los ajustes
                  quedan en `Admin/registros/ajustes-manuales.jsonl`: una recarga posterior los vuelve a aplicar). Después, `node tools/publicar.mjs`.
 PÁGINAS DEL BALANCE  título o total del balance, y no el flujo de efectivo ni los cambios en el patrimonio (una FILA con esas palabras
                      no cuenta si la página tiene el título del balance como encabezado)
 PERÍMETRO  cada página del balance es consolidado o individual por su encabezado; con ajuste `perimetro` solo cuenta ese (si el .md
            trae los dos, solo las páginas marcadas)
 ESCALA     una por documento (la del estado de resultados contra lo cargado); la del vecino, con SU escala; en la compuerta, si
            el valor no es plausible (1/100 a 100 veces el año cargado más cercano) o no pasa, se prueban las otras escalas y se
            acepta si UNA sola da ok y plausible
 TECHO      caja hasta 3 veces los ingresos del año y deuda hasta 20 (máximos reales medidos: 2,53 y 13,7): por encima no
            es plausible, se prueban las otras escalas y, si ninguna cae debajo, no pasa. El mismo techo es el P1 de audit.js
            `caja-deuda-desproporcionada`, que revierte la escritura (Hellas Verona 2024, Milan 2009, Inter 2021, Lazio 2008-2019)
 PISO       caja por debajo de 7e-5 veces los ingresos (una tabla en miles leída en unidades: Porto 2016, Milan 2008,
            Lazio 2001): el mismo camino que el techo, y el mismo P1 en audit.js. La caja real más chica cargada: Forest 2024, 1,0e-4
 AJUSTE MANUAL `caja` / `deuda` del año (Versiones 419 y 495): el número tal cual impreso, gana sobre la escalera y NO pasa por la
            compuerta (es una decisión de Guido)
 ESCALÓN 0  precedente del club (las familias que suman lo cargado en el año más cercano); en deuda, si la familia está partida en no
            corriente + corriente en este documento, el par. Las familias aprendidas se prueban en
            los otros años cargados del club: si en todos los que las tienen dan otra cosa, son una casualidad y se prueba el precedente
            siguiente; sin otro año donde probarlas, como antes
 TABLA RESUMEN una tabla anterior que repite el total del activo / pasivo del balance de la tercera columna en adelante (una
            serie de varios años) es un desglose del informe de gestión: sus filas no cuentan (Benfica 2022-23, pág. 37 contra pág. 109)
 ESCALÓN 1  diccionario (vocabulario.mjs; en portugués también "Caixa e depósitos bancários", el rubro del SNC) + términos del club o
            del documento (ajuste `deuda-incluye`); jerarquía de balancete: padre e
            hija no se suman; cuenta D no es deuda. Además propone: deuda corriente + no corriente de la misma etiqueta (exactamente
            dos filas, a cada lado del total del pasivo no corriente —también "Total do passivo não corrente" y "Total - Passivo não
            corrente"—, o, si ese total no tiene nombre, una bajo el título "Passivo não corrente" y otra bajo "Passivo corrente"; el par y
            las otras familias propuestas, todas en la misma tabla: si se mezclan tablas no decide, deuda mejora 2); las filas de la nota de efectivo si la caja es una parte; el total
            de la nota de deuda si no hay otra fila de deuda. "La caja es una parte de la nota" no vale si el total que suma es un total del
            balance
 TABLA DEL BALANCE (deuda, mejora 1) si una familia de deuda o de caja aparece en más de una tabla de las páginas del balance y el
            documento tiene UNA sola tabla con el total del pasivo (o del activo), cuentan solo las filas de esa tabla (un total en texto
            corrido cuenta como otra tabla: Botafogo 2025). Las tablas resumen del informe de gestión, en miles, quedan afuera
 ESCALÓN 1b Jev: propone la fila de caja (opción cerrada entre las filas del balance) y las de
            deuda (sí/no por fila), antes de la IA cara; medido en todos los clubes: caja 9 de 9, deuda 5 de 7 (los 2 distintos, errores
            del sitio)
 ESCALÓN 2  IA (solo líneas)
 LA NOTA DE LA FILA: si la propuesta es una fila del balance con su nota ("6.15") y la nota muestra que es solo una
            parte (la fila es uno de los totales de la nota, o la diferencia está impresa), se propone la suma de los totales de la nota
            (tablas con columna del año y del anterior; un total es la fila que suma las de arriba). Misma compuerta: pasa una sola → esa;
            pasan las dos con valores distintos → no decide (AEK 2021: la fila 5.029.327 es el largo plazo, la nota da 6.038.235)
 COMPUERTA (la misma para todos): la familia de la fila es la del dato y el año anterior cargado o el documento siguiente dicen lo mismo
            (el documento anterior también confirma, solo a favor; por debajo de 1.500 unidades, coincidir es ser el mismo número).
            Filas propuestas que suman 0 no pasan, en ningún escalón: un 0 sale solo por "ninguna fila" (la trampa del cero)
            ── pasa → dato · no pasa → siguiente escalón · nada → null
 VECINO     lo cargado en el sitio o el documento vecino; nunca un valor aceptado en la misma corrida
```

Los pendientes están en `auditorias/2026-10-04-clubes-pipeline.md` .

---

## Un deporte nuevo

Cada tool lee el deporte de un club de `tools/deporte-club.mjs`, que lo saca de `sport` en `data/clubs.js` (id interno: `futbol`, `rugby`) y, para un club sin ficha, del registro de altas (`resolverDeporte`). Las categorías que admite son las de `SPORT_TAXONOMIES` en `data/category-map.js` (`categoriasDeDeporte`, `leerCategorias` con su descripción, `bolsonDeDeporte`, `categoriaDeSueldos`) y lo que no puede dar 0 está en `CEROS_POR_DEPORTE` (`[]` si no se midió). Sin deporte o sin taxonomía una tool se detiene; nunca categoriza como fútbol.

Dónde frenó el primer club de otro deporte (Bath Rugby) y cómo quedó cada lugar:
- **`verificar.mjs`:** una nota en £m con un decimal cerraba el Turnover por la tolerancia y pisaba la diferencia que el ajuste `desglose` había dicho. El ajuste se prueba antes de `cerrarNota()`.
- **Jev, Claude y `cargar.mjs` (categorías):** aceptaban solo las del fútbol. Leen la taxonomía del deporte del club (`criteriosDe`, `catsDe`, `ladoDeCat`).
- **`jev-categorizar.mjs --desde-sesion`:** validaba con `sideOf()` del fútbol. Valida con la taxonomía del deporte del documento.
- **`caja-deuda.mjs --personal --partir`:** escribía `wages_squad`. Usa la categoría que la taxonomía mapea a `first_team_staff` (`squad_wages` en rugby).
- **`estadio-sponsor.mjs` (rugby):** la página de temporada de una liga de rugby ya da estadio, capacidad y marca (su tabla «Stadiums and locations» trae «Kit supplier»); hace falta que la liga-temporada esté en `tools/club-league-reference/<iso>.json` (`fetch-club-league-reference.mjs`). La tabla de camisetas de la página del club se acepta con la ficha de su deporte (`Infobox rugby team`; un club de fútbol sigue con la suya). El sponsor de camiseta no sale de Wikipedia en rugby: va a mano en `tools/contexto-manual.json`, con fuente.
- **`estadio-sponsor.mjs`, sponsor sin fuente:** `sin-fuente.sponsor` de `tools/contexto-manual.json` solo cuenta como resuelto con el registro de búsqueda (`{ buscado, por, intentos }`: tres clases de fuente sin contar Wikipedia, una de ellas informe-anual, club-oficial o archivo-web; `tools/sponsor-busqueda.js`) o, para los años que ya tenían un texto libre, con `{ legacy: true, texto }` y el club y el año en `tools/sponsor-legacy.json` (la lista no crece). `audit.js`: P1 `sponsor-sin-busqueda` y `sponsor-legacy-fuera-de-lista`, P3 `sponsor-sin-registro`. Estadio, capacidad y marca siguen con el texto.
- **Prompts de lectura (`localizar`, `extraer`, `perimetro-senales`, `caja-deuda`, `glosar-rubros`):** dicen «club de <deporte>» con `deporteDePdf` / `deporteEnFrase` de `tools/deporte-club.mjs` (sin deporte, «club de deporte»; nunca fútbol por defecto). Con el fútbol el texto es el mismo, byte por byte. Por eso `lote.mjs` corre el alta gratis (que calcula el deporte de un club nuevo) antes de la primera lectura, no después. «El negocio del fútbol del club» de las preguntas de perímetro es el criterio de `Admin/CONVENCIONES-DATOS.md` y sigue igual.
- **`audit.js` `checkCategorias`:** daba P0 `categoria-inexistente` a `lump_rugby_operations`. Valida con las listas del deporte del club.

Antes del primer lote de un deporte nuevo va una carga de prueba de UN club, sin API y de punta a punta (`tools/armar-a-mano.mjs`, `verificar.mjs`, `cargar.mjs` con `--escribir`, `audit.js`), con la taxonomía, el bolsón y la tabla de ceros del deporte ya escritos. Cada freno que aparezca se anota como defecto de script en `Admin/registros/frenados-por-script.jsonl` y lo arregla la sesión de pipeline con su medición; el fútbol tiene que dar idéntico (`medir-cargar.mjs`, `medir-verificar.mjs`, `audit.js`). Un worktree necesita `node tools/worktree.mjs preparar <carpeta>`, que enlaza también `tools/node_modules`.

**La liga y el deporte nuevos en el catálogo** (`tools/catalogo-liga.mjs --liga <id>`): cuando una fila de liga queda en null porque la liga no está en `LEAGUES`, la tool PROPONE la entrada leyendo Wikipedia: el nombre es el título de la página de temporada sin la temporada; el país, el prefijo del id (comprobado contra el infobox); el deporte, el infobox de la liga; el `tier`, el `level` del infobox o la liga de `promotion` más uno (sin ninguno de los dos pregunta; el escalón se compara dentro de un deporte y un país, el de rugby sigue la pirámide inglesa). Con `--escribir --full "<nombre>" --name "<corto>" --aprobado-ref <línea>` escribe la línea de `LEAGUES`: los nombres los da quien aprueba (la propuesta es el título inglés de Wikipedia) y la aprobación es una línea de `Admin/registros/auditoria-proceso.jsonl` que el script verifica (sesión auditora, veredicto APROBADO o DECIDIDO, el id de la liga en `cambio`). `--tier` y `--pais` contestan una pregunta de la propuesta. Un deporte nuevo (inactivo o ausente en `SPORTS`) se activa con `--activar-deporte --deporte-ref <línea>` (una línea DECIDIDO que nombre el deporte, la decisión de Guido), y solo si hay taxonomía, clave en `CEROS_POR_DEPORTE`, al menos un club cargado y ninguna regla `CATEGORÍA (prompt)` inválida con el deporte ya activo (`validarReglasPrompt` de `reglas-categoria.mjs`, que la propuesta lista regla por regla antes de escribir). Un deporte puede activarse con un solo club cargado. Después: `ligas-sin-verificar.mjs --escribir` completa las filas null y `publicar.mjs`.

Que un chequeo no dependa de un id del fútbol lo cuida `node tools/audit.js`: por cada deporte con taxonomía distinto del fútbol arma en memoria un club de muestra (una línea por subcategoría) y le corre los chequeos de datos de clubes; un P0 o P1 de esa muestra sale como P1 `deporte-muestra`. Un chequeo nuevo que mire categorías lee `api.SPORT_TAXONOMIES` del deporte del club o se saltea; nunca una lista fija del fútbol.

## Links propios de club y liga (`tools/generate-club-pages.js`)

Cada club y cada liga con ranking tiene su página: `club/<id>.html` y `liga/<id>.html` (la dirección pública es `/club/<id>` y `/liga/<id>`, con un rewrite 200 en `netlify.toml`). El generador toma `index.html` como plantilla y le pone `<head>` propio (título, descripción, canonical, Open Graph, JSON-LD, `<base href="/">`), `window.FOS_RUTA` y un bloque de texto visible sin JS (`#pagina-estatica`, se oculta cuando la app arranca). Los números salen del motor del sitio (`computeYearGeneric` + `toDisplayValue`) y de `data/rankings/`. Escribe también `sitemap.xml` (el único escritor) y la imagen de la tarjeta de cada página, `og/club/<id>.png` y `og/liga/<id>.png` (1200×630, tope 300 KB): un SVG armado por el generador y convertido con `@resvg/resvg-js` (dependencia de desarrollo en `tools/package.json`: `cd tools && npm install`; fuente Inter en `tools/fonts/`). `og/_hashes.json` guarda el hash del SVG de cada imagen: solo se renderiza la que cambió, y el hash va en el `og:image` (`?v=`). Sin `tools/node_modules` el generador solo falla si hay que renderizar alguna imagen. Corre en `GENERADORES` (`tools/generadores.mjs`) después de `generate-rankings`, así que cada carga lo regenera; `audit.js` corre `--check` (`club-pages-desfasado`, P1: página vieja, que falta o que sobra, título de más de 60 o descripción de más de 155 caracteres, sin canonical). `--muestra` genera solo el 10% de los clubes, para revisar a ojo. Un id de club renombrado suma el 301 `/club/<viejo>` en el bloque `ids-alias` (`renombrar-ids.mjs`).

## Decisiones tomadas por Guido

1. Una fila categorizada con confianza menor a 0,80 no se carga sola: va a la cola.
2. Un total de ingresos o gastos que el documento no imprime se acepta si cierra con el resultado, y se busca un segundo chequeo.
3. Un total que cierra solo por redondeo lleva una fila "Diferencia de redondeo".
4. Una diferencia de una unidad entre dos tablas (UC: 1.790.062 contra 1.790.063) no va a la cola.
5. Tipo de cambio: si el documento declara el suyo, **gana el del documento**; si declara varios en una tabla, el de la fecha más nueva (puede que el club acceda a una cotización mejor que la de
   mercado). El promedio entre apertura y cierre es solo para presupuestos.
6. Si el documento no declara tipo de cambio: la cotización de cierre del **archivo de series oficiales** (`tools/fx-reference/`, bajado de
   cada banco central). Nunca una cotización dada por Claude. Si la moneda no está en el archivo, se agrega al script que baja las series,
   desde su fuente oficial (hoy hay 21 monedas; CLP toma el primer día con dato posterior al cierre, como lo declaran los clubes).
   En el mismo directorio y con el mismo script (`--deflactores`) viven los deflactores del PBI de EE.UU. y de la zona euro, la otra
   mitad de la cuenta: el tipo de cambio lleva cada cierre a USD de ese año y el deflactor lo lleva a USD de hoy (Finanzas, "Valores
   ajustados por inflación"). De esos dos archivos se genera `data/deflactores.js`; se corre una vez por año.
7. Perímetro: lo decide `perimetro-senales.mjs` antes de localizar (lote.mjs; ver la etapa 3, PASO A y PASO B) con la regla de
   `Admin/CONVENCIONES-DATOS.md` ("qué perímetro se carga cuando la serie cambia"). Un ajuste `perimetro` a mano solo para lo que el lote
   frena e imprime. Casos de la regla: Boca, Racing, Panathinaikos, Juventus, Aris.

## Datos públicos de un club (estadio, capacidad, fundación, web, registro)

Una tool agota las fuentes en orden y recién después pasa a un agente; no se googlea de entrada. Medido en `Admin/HALLAZGOS-pipeline.md` («Segunda fuente de estadio y capacidad»).

1. **Estadio, capacidad y sponsor de un ejercicio:** los trae sola la compuerta de `cargar.mjs` (`tools/estadio-sponsor.mjs`): página de temporada de Wikipedia, ficha del club, Wikipedia del país (`--local`). Lo que falta, lo imprime con el candidato del paso 2.
2. **Candidato** (`node tools/dato-publico.mjs "<club>" --pais <iso2> --anio <año>`): Wikidata, con el artículo del club y el del estadio en Wikipedia como cruce.
   - **Estadio:** identifica el estadio, no su nombre de ese año (Wikidata da el actual: aun «confirmado» por el artículo del club, el nombre coincide con el manual en 70 %). Nunca se escribe solo; se verifica el nombre que tenía ese año.
   - **Capacidad, regla medida:** si Wikidata y el artículo del estadio difieren **menos de 5 %**, se toma el del artículo (76 % queda a menos de 3 % de lo revisado a mano y 90 % a menos de 10 %); si difieren más, o solo una fuente la da, pasa al paso 3. Cubre ~40 % de los casos. La constante es `TOL_CAPACIDAD` de `dato-publico.mjs`; se revisa con `node tools/fos.mjs medir segunda-fuente`.
3. **El agente** resuelve lo que quedó sin decidir: `node tools/dato-publico.mjs --club <clubId> --anio <año> --prompt <estadio|capacidad|fundacion>` imprime el prompt fijo (búsqueda corta, ficha del club abierta, una confirmación fuera de Wikipedia y Wikidata, JSON con citas, nunca inventa); se lo pasa tal cual a un Agent **Sonnet**, no Opus. Lo que el agente devuelve como «encontrado» con dos fuentes que coinciden se pega en `tools/contexto-manual.json` con las citas; «fuentes en conflicto» o «no encontrado» va a la sesión.
4. **A `Admin/dudas-por-club.md`** va solo lo que únicamente el club sabe. Fundación, licencia o número de registro son públicos: no se le preguntan.

La fundación y la web de un club nuevo las da el paso 2 (`fundación`, `web`), pero ninguna tool las escribe todavía en `data/`: las pega la sesión.

---

## Documentos fuente: carpetas, transcripción y trampas de PDF (venía de `CLAUDE.md`)

Texto movido sin cambios. Lo que dice "este archivo" o "acá" se refería a `CLAUDE.md`.

**Un documento que una tool no lee.** Primero `file <archivo>`. Si no es lo que dice la extensión (gzip, Zip, una página HTML de error), el
problema es la descarga y no la tool: se descomprime a un archivo nuevo (`<base>-descomprimido.<ext>`, el original queda) o se vuelve a bajar
(skill `club-sourcing`, «Gotchas de tooling»). Excepción: un `.xhtml` en gzip se deja como está, porque `xhtml-aarsrapport.mjs` e
`ixbrl-resultado.mjs` lo descomprimen en memoria. Si es lo que dice y la tool falla, va a `Admin/registros/frenados-por-script.jsonl` y lo
arregla Pipeline. Lo vigila `audit.js` (`archivo-no-es-lo-que-dice`, P2).

## Estructura de carpetas de documentos fuente: Clubes/<País>/<Club>/ (PDF y transcripción juntos)

Todos los PDFs fuente Y sus transcripciones a Markdown viven JUNTOS, en la
misma carpeta: `finance-of-sports/Clubes/<País>/<Club>/` — NO carpetas sueltas
tipo `racing-pdfs/`, `river-pdfs/` al nivel raíz, y NO dos árboles paralelos separados para PDFs
y para transcripciones (eso fue el esquema `PDFs/` + `pdf-extracts/` de la, reemplazado en la a pedido de Guido: quería el PDF y
su transcripción uno al lado del otro, no en dos carpetas distintas que hay
que mantener sincronizadas).

Ejemplo actual: `Clubes/Argentina/Boca/`, `Clubes/Argentina/River/`,
`Clubes/Argentina/Racing/`. País y club van CAPITALIZADOS (`Argentina`,
`Boca`, `River`, `Racing` — no `argentina`/`boca-ar` en minúscula). Ojo: esto es
distinto del criterio que sigue usando el CÓDIGO del sitio para los
`clubId` (`boca-ar`, `river-ar`, `racing-ar`, siempre en minúscula) — son dos
convenciones separadas a propósito, una para carpetas (legible para Guido en
Finder), otra para identificadores internos (consistente con el resto del
código). Si en el futuro se agrega un club de otro país (ej. Flamengo,
Brasil), la carpeta nueva es `Clubes/Brasil/Flamengo/` — NUNCA una carpeta
nueva al nivel raíz de `finance-of-sports/` por club o por país.

Dentro de la carpeta de cada club podés tener subcarpetas propias si hace
falta separar por tipo o por procedencia del documento (ej.
`Clubes/Argentina/River/estados-contables-leads/` para el PDF de fuente no
oficial — Y su transcripción, juntos ahí también, mismo criterio) — eso sí
está bien, lo que no escala es una carpeta nueva por club al nivel raíz del
proyecto.

**OJO CON LO QUE SE TRACKEA, que no es lo mismo que lo que se guarda.**
El repo entero se deploya: Netlify publica la raíz, así que cualquier archivo
trackeado queda servido en `financeofsports.com/<su ruta>` salvo que `netlify.toml`
lo saque del artefacto de deploy (ver arriba: `Admin/` y poco más). Los PDFs no viajan (`*.pdf` está en `.gitignore`),
pero las transcripciones `.md` sí, y son 106 MB de los 110 MB del repo. Para un
balance oficial eso está bien y hasta es coherente con el proyecto. Para un
documento que NO es del dominio del club, no: la carpeta
`Clubes/Argentina/River/estados-contables-leads/` está en `.gitignore` por eso —
el PDF se consiguió en una réplica de la comunidad tuRiver. Los archivos siguen en
la máquina y se usan igual; lo único que cambia es que no se publican. **Si
aparece otra fuente no oficial, mismo criterio: se guarda, no se trackea.**

**Unificar carpetas duplicadas.** Los PDFs no se trackean, así que un borrado no se recupera:
la tool mueve, no borra. Lee `Admin/registros/mudanzas-carpetas.json` (lista de `{de, a, archivos}`); por cada archivo de `de`, si `a` ya tiene
uno con la misma huella sha1 lo manda a `Admin/Archive/pdfs-duplicados/<País>/<Carpeta>/`, si `a` no tiene uno con ese nombre lo pasa a `a`, y si
el nombre existe con otro contenido frena la entrada sin mover nada. Una carpeta de origen que queda vacía se saca. Se corre en la carpeta
PRINCIPAL (en un worktree `Clubes/` son enlaces y la tool se niega): ensayo sin flags, `--escribir` para mover; después
`node tools/inventario-transcripciones.mjs` y `node tools/audit.js`. Antes de agregar una entrada, abrir el documento y ver de qué club es: una
carpeta equivocada se detecta por `carpeta-doble` en la auditoría, pero cuál es la correcta lo decide la portada.

## Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo

Cuando se descarga o recibe un PDF nuevo para este proyecto (balance, presupuesto,
lo que sea), lo primero que se hace con él — antes de extraer datos, antes de
cargar nada al sitio — es transcribir el contenido COMPLETO a un archivo
`.md`, en LA MISMA carpeta que el PDF: `finance-of-sports/Clubes/<País>/<Club>/`
(crear las carpetas si no existen), con el mismo nombre base que el PDF (ej.
`Memoria y Balance al 30-06-2025.pdf` → `memoria-y-balance-2024-25.md`, los
dos juntos en `Clubes/Argentina/Boca/`).

Por qué: estos PDFs suelen ser escaneos sin capa de texto (pdftotext no sirve),
así que leerlos implica OCR o (si no hay más remedio) renderizar página por
página como imágenes con el Read tool — caro en tokens. Guido quiere poder
iterar sobre CÓMO se muestra un número (probar formatos, reclasificaciones,
layouts) sin que cada prueba implique volver a abrir el PDF de página en
página. Con el `.md` ya transcripto, esas iteraciones futuras leen texto
plano — rápido y barato.

Actualizado: para
un PDF escaneado sin capa de texto, antes de recurrir al Read tool sobre
imágenes, instalar Tesseract (`brew install tesseract tesseract-lang`) y
generar la transcripción con `pdftoppm -png -r 300` + `tesseract -l spa
--psm 6` página por página — mucho más barato en tokens, y el OCR de tablas
numéricas resultó muy confiable en la práctica. Ver
`.claude/skills/club-data-mapping/referencia/leer-pdf.md` para el flujo
completo (incluye qué hacer con tablas anchas rotadas 90° en el escaneo, y
cómo verificar los números del OCR fila por fila antes de cargarlos).

**En el onboarding con el pipeline, la transcripción (etapa 2) la corre `tools/pipeline.mjs`, que además la valida: ver el
skill `club-or-year-onboarding`.** Lo que sigue describe los motores que usa por dentro y el camino para un PDF suelto.

**ACTUALIZADO: el DEFAULT para transcribir en volumen ya
no es que la sesión de Claude lo haga, es mandarlo a una API externa barata, corrida por Guido desde
SU PROPIA terminal — 0 tokens de Claude, sea 1 PDF o sean 2000.** El test completo (30 documentos,
costo y calidad comparados cifra por cifra) está en `Admin/Archive/test-costo-transcripcion.md`; el criterio
que salió de ese test:

1. **Default: `node tools/mistral-ocr-transcribe.mjs --all`** (Mistral OCR, motor de extracción
   dedicado, ~$4 cada 1000 páginas). Marca en la consola y con una advertencia adentro del `.md`
   cuando el PDF es un escaneo — en ese caso, antes de cargar esos datos hace falta verificar a mano
   contra el PDF (`club-data-mapping` sección 6): es el único caso real donde encontramos que
   inventa un número con la misma confianza que uno bien leído, en vez de avisar.
2. **`node tools/gemini-transcribe.mjs --redo-mistral-scanned`** (Gemini 3.8 Flash) para lo que
   Mistral marcó como escaneo y amerita más cuidado — OJO, no es `--all`: ese flag busca PDFs sin
   ningún `.md` y se saltea justo los que Mistral ya tocó (aunque los haya marcado escaneados) — en el test manejó escaneos rotados/dañados sin errores. Rechaza
   ~1 de cada 4 documentos con `finishReason: RECITATION` (falso positivo de copyright de Google,
   más común en "memorias" narrativas) — no es un problema del documento ni de Mistral.
3. **Un subagente de Claude** (el flujo de siempre, Tesseract incluido, descripto abajo) para lo que
   Gemini rechaza por RECITATION, o cualquier caso donde ninguna de las dos APIs alcance. Es el más
   caro (70.000-290.000 tokens por documento) pero también el más minucioso: cruza sumas entre notas,
   marca `[ilegible]` en vez de inventar, y corrige ambigüedades de OCR contra el resto del documento.

Las dos APIs necesitan su propia key en `Admin/api-keys/gemini.env` / `Admin/api-keys/mistral.env` (gitignoreadas,
mismo criterio que la de Resend) — si no existen todavía, pedírselas a Guido, no asumir que hay que
usar el flujo de Tesseract de abajo por default.

**Los pasos 1 y 2 corren solos `tools/check-transcripcion-fidelidad.js` sobre cada `.md`
recién escrito, y avisan en la consola si encuentran algo** — no hace falta acordarse de correrlo
aparte para esos dos. El chequeo mira CONTENIDO, no solo cantidad de páginas: agarra un bloque
reemplazado por un resumen en inglés en vez de transcripto (el error real que dejó pasar el test de
costo de Haiku, ver `Admin/Archive/test-costo-transcripcion.md`) y huecos en la numeración de página. Es
gratis (script de Node puro, sin ninguna llamada a modelo) y no bloquea la transcripción si encuentra
algo, solo marca qué archivo revisar antes de onboardear. **El paso 3 (subagente de Claude) NO lo
corre solo** — correlo a mano al terminar (`node tools/check-transcripcion-fidelidad.js
<archivo.md>`), es la misma clase de modelo (chat, no motor de extracción) que produjo el bug
original, así que el chequeo tiene más chance real de encontrar algo ahí que en Mistral.

Qué transcribir: TODO el documento, página por página, en el mismo orden,
incluyendo tablas (como tablas Markdown o listas alineadas, lo que se lea
mejor), números exactos tal cual figuran impresos (sin redondear, sin
reclasificar a ninguna categoría del sitio todavía — eso es un paso aparte,
después), y una marca de página (ej. `--- pág. 76 ---`) antes de cada una para
poder citar la fuente exacta más adelante. Es una transcripción fiel, no un
resumen: si se resume o se salta contenido "poco relevante", se pierde
justamente el dato suelto que capaz hace falta en una sesión futura.

Una vez que el `.md` está armado, se usa ESE archivo (no el PDF) para extraer
los datos que se vayan a cargar a `years[].revenue`/`expenses` del JSON del club
(ver `data/ar/river-ar.json` para el shape, el mismo que usan todos los clubes incluida Boca), y para
cualquier experimentación de formato que pida Guido más adelante sobre ese
mismo documento.

### Trampas de PDF y de grep

- **Una tool que decide no lee solo una parte del documento.** Si lee los primeros N KB, N líneas o N páginas para decidir algo (quién emite, el
  perímetro, el período, el tipo de documento), o lee el archivo entero, o dice en su salida que cortó y qué no miró, para que el caso no pase como
  «no encontrado». Un recorte para mostrar texto en pantalla no cuenta. Al medir una tool nueva o un cambio, se corre sobre todos los documentos de su
  tipo, no sobre una muestra, y se cuenta cuántos quedaron cortados. Caso: `emisorDe` de `ixbrl-resultado.mjs` leía 600 KB y en 17 de 48 XHTML
  daneses la cabecera está más abajo.

- **Un documento que una tool no lee.** Primero `file <archivo>`. Si no es lo que dice la extensión (gzip, Zip, una página HTML de
  error), el problema es la descarga y no la tool: se descomprime a un archivo nuevo o se vuelve a bajar (skill `club-sourcing`,
  «Gotchas de tooling»). Si es lo que dice y la tool falla, va a `Admin/registros/frenados-por-script.jsonl` y lo arregla Pipeline.
- **`grep -oP '.{20}CARACTER.{20}'` (u otro cuantificador de caracteres
  alrededor de un carácter especial) puede fallar en silencio cerca de
  acentos**: el cuantificador `.{N}` con `-P` (PCRE) en este entorno no
  cuenta bien caracteres cuando hay vocales acentuadas cerca (más, línea,
  categoría, año) del texto en español, así que una línea real puede
  simplemente no aparecer en el resultado, dando una falsa sensación de "ya
  no queda ninguna". El chequeo confiable: `grep -n 'CARACTER' archivo` (sin
  capturar contexto con un cuantificador de caracteres, solo el número de
  línea) y revisar cada línea completa a mano.
- **`pdfinfo archivo.pdf | grep "^Pages:"` puede devolver VACÍO en silencio
  si el PDF trae bytes NUL en sus metadatos**. `grep` detecta esos
  bytes NUL, decide que el stream es binario, y deja de hacer matching línea
  por línea — así que la línea `Pages:` (que viene DESPUÉS de `Producer` en
  la salida de `pdfinfo`) nunca aparece, aunque `pdfinfo` sin pipear muestre
  todo bien. Síntoma típico: una variable de cantidad de páginas que queda
  vacía y rompe el comando siguiente (`seq 1 ""` → "invalid floating point
  argument"), no un error de `pdfinfo` en sí. El fix es `grep -a` (fuerza a
  tratar el input como texto pase lo que pase) en vez de `grep` a secas,
  cualquier vez que se parsee la salida de `pdfinfo` (o de cualquier otra
  herramienta que pueda traer metadata binaria) con grep.
- **`pdftotext` puede devolver texto que "funciona" (no vacío, sin error) pero es MOJIBAKE, no el
  contenido real**: el PDF tenía capa de texto, pero sus fuentes eran
  Helvetica/WinAnsi no embebidas y sin mapa ToUnicode (confirmable con `pdffonts`), así que
  `pdftotext` devolvía caracteres latinos sin sentido (`TOB (AyAI4TOPCbKA`) en vez del cirílico real
  (`ТОВ «АУДИТОРСЬКА»`). La señal: si el idioma esperado del documento es no-latino (cirílico,
  griego, etc.) y `pdftotext` devuelve caracteres latinos, no asumas que "no tiene texto que
  aportar" ni that el documento está en otro idioma — es mojibake. Tratarlo como escaneado (OCR con
  Tesseract, en el idioma real del documento) en vez de confiar en esa capa de texto rota.
