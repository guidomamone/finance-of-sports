# PIPELINE: de un PDF a un año cargado en el sitio

Referencia del proceso nuevo: qué hace cada etapa, sus escaleras y compuertas, y las decisiones de Guido que lo parametrizan.
Se actualiza en la misma sesión en que cambia una tool. Cómo se trabaja con el pipeline (reglas, medición, arranque) está en el skill
`club-or-year-onboarding`; lo que se midió y no entró, en `Admin/HALLAZGOS-pipeline.md`.

---

## El proceso nuevo

Los comandos:

```bash
node tools/lote.mjs --lista Admin/lotes/lote-NN.txt                               # ensayo: qué haría y cuánto cuesta (gratis)
caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar      # de verdad (lo corre Guido)
caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --cargar   # además escribe lo que queda listo (altas, cargas, commits)
caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar --reintentar   # camino de error (ver abajo)
node tools/cola.mjs                                                         # la cola humana
node tools/estado.mjs                                                       # el tablero: cada PDF en su etapa y escalón (gratis)
node tools/inventario-transcripciones.mjs                                   # el registro, con la etapa de cada estado (gratis)
node tools/inventario-transcripciones.mjs --solo <lista|carpeta>          # solo esos PDFs (~1 s); lo usan pipeline.mjs --lista/--dir y lote.mjs
node tools/gasto-doc.mjs --lista <lista> --desde <ISO> [--hasta <ISO>]       # lo gastado por documento en una corrida pasada
```

`lote.mjs` corre las etapas 3 a 8 sobre una lista chica. Avisa (sin frenar) si un documento de la lista está también en otra `Admin/lotes/lote-*.txt`
(to-do 232 g): una lista cerrada va a `Admin/Archive/lotes/`. También avisa un documento de un club de la lista que está sin localizar y cuyo ejercicio
no cubre ni la lista ni un año cargado (to-do 232 q): se suma a la lista o va a `documentos-descartados.txt`.
- El registro (`Admin/registros/transcripciones-estado.jsonl`) se recalcula entero en ~1 min (12.184 PDFs, sobre todo `quien.mjs --pendientes` para saber
  qué está cargado). `pipeline.mjs` con `--lista`/`--dir` y `lote.mjs` recalculan solo su lista (`--solo`, ~1 s) y copian las demás
  líneas; el recálculo entero queda para `estado.mjs --actualizar` y las corridas sin alcance. Medido: el registro sale idéntico.
- Un solo proceso a la vez escribiendo el registro: `lote.mjs` y `pipeline.mjs` (también en ensayo) y `cargar.mjs --escribir` toman el
  mismo candado (`Admin/registros/.candado.lock`, `tools/candado.mjs`). Si otro lo tiene, sale sin hacer nada y dice cuál; si quedó el de uno que
  se cortó (Ctrl+C, terminal cerrada), lo avisa y lo reemplaza.
- Lo que ya está hecho no se repite (queda en `Generados/`, que se respalda en git). Si el .md cambió desde extraer (`cache-al-dia.mjs`:
  misma huella, o cada fila sigue en su línea), un año sin cargar se rehace y uno cargado solo avisa.
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
  anual (to-do 232 i: Kifisia 2022 "09/08/2021 – 30/06/2022");
- ii) duplicados por huella (Versión 521): `inventario-transcripciones.mjs` guarda el sha1 de cada PDF (cacheado por tamaño y fecha) y de
  cada grupo de PDFs idénticos deja uno (el cargado, si no el que tiene .md, si no el que no se llama como un anexo, si no la primera
  ruta); los demás quedan en el estado `duplicado` (`duplicadoDe`). `pipeline.mjs` no los transcribe (elige por estado) y `lote.mjs` los
  saltea. Un PDF ya cargado nunca pasa a `duplicado`. Si las copias tienen años distintos en el nombre, falta un año: reabrir el sourcing.

### 2 Transcribir

- a) PDF digital (tiene texto propio): Mistral transcribe; el texto propio del PDF queda como segunda fuente gratis para la etapa 4.
- b) PDF escaneado: Mistral lo marca como escaneo; no hay segunda fuente gratis.
- c) PDF con texto roto (letras sin sentido en vez del texto real): se detecta solo y se trata como escaneo.
- d) **Escalera** (escalón 1 construido; el 2 todavía no):

```
 ESCALÓN 0  la transcripción que hay ──────── ¿localizar encuentra el estado de resultados? sí → sigue
 ESCALÓN 1  si no, la transcripción no es de Mistral y el PDF tiene páginas interiores en imagen
            → re-transcribir con Mistral y volver a localizar (con --reintentar) ── ¿lo encuentra? sí → sigue
 ESCALÓN 1a (Versión 433) el inventario dice "revisar" → resolver-inventario.mjs (las VOCES): Claude solo en las páginas con cifras que
            no coinciden con el texto del PDF; ignora las dudas en prosa ── compuerta: el inventario queda "listo" → sigue
            (Versión 443) por página: una página con la misma huella que en la última validación "listo" se reusa, no se paga otra vez
            (Versión 463) "sin verificar" (el .md cambió): primero la validación gratis del inventario; si queda "revisar", el resolver
 ESCALÓN 1b (Versión 395, camino de error) PDF digital, la etapa 4 dice que el .md no coincide con el texto propio y la verificación no
            quedó ok ni cierran todos sus chequeos de números (to-do 162: dudas de la IA en la cola no alcanzan para rearmar) → texto-propio-a-md.mjs rearma esas páginas (gratis) y se vuelve a localizar ── compuerta: etapas 4 y 6
            rearmado, con su escalera (Versión 397): método "columnas" ─► si la etapa 6 sigue sin cerrar, método "regiones" (una vez cada uno)
            COMPUERTA por página (Versión 411): la rearmada tiene que conservar al menos la mitad de las filas de tabla; si no, queda
            la anterior (Novorizontino 2025: estado de resultados girado 90°)
            Solo cuentan los números sin confirmar de bloques ELEGIDOS HOY (Versión 458): una validación hecha con otra localización
            (otro perímetro) no dispara el rearmado
            Un documento con la etapa 4 y sin la 6 (un lote cortado) pasa primero por la etapa 6, gratis y también en el
            ensayo, y el rearmado decide con ella (to-do 162)
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
- c) Si el documento no tiene estado de resultados (memoria sola, dictamen), queda como fuente.
- d) **Compuerta antes de pagar** (Versión 441, `antes-de-localizar.mjs`; solo documentos sin `.ubicacion.json`):

```
 CIERRE     ajuste `cierre` ─► periodo.mjs ── hay → sigue · no → no se localiza (sugiere el de los vecinos)
 PERÍMETRO  ajuste (doc o club) ─► el .md trae uno solo ─► trae consolidado y el año cargado más cercano es consolidado
            ── pasa → localizar · no → no se localiza; el lote imprime el ajuste que falta (dos entidades: descartar primero la otra)
```

- e) **El perímetro del club por señales** (Versión 561, `perimetro-senales.mjs`), antes de la compuerta, para cada club de la lista que
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
                  Auditoría a posteriori (to-do 227): los ajustes que escribe la regla del club nombran en su `evidencia` los
                  documentos que decidió A2; `--auditar-a2 <carpeta>` arma un pedido por documento para un subagente (grupo o
                  sociedad sola, con cita). Se corre después de cada país nuevo. La carpeta de `--auditar-a2` y la de
                  `--exportar-a2` tienen que estar fuera del repo o dentro de una que netlify.toml no publica (Admin/mediciones/...);
                  si no, frenan sin escribir
 PASO B (voto)    C1 consolidado ≥ 5% sobre individual (año o anterior) · C2 crecimientos distintos en ≥ 15 puntos (fusión) ·
                  C3 Jev: ¿una controlada hace negocio del fútbol? ── 2-3 → consolidado · 0 → individual · 1 o sin respuesta → no decide
 CLUB             la regla de Admin/CONVENCIONES-DATOS.md ("qué perímetro se carga cuando la serie cambia"): un ejercicio con un solo
                  perímetro lleva ese (ajuste del documento si no es el del club); el del club sale de los votos o, sin votos, del único
                  perímetro de la serie; sin votos y con los dos en la serie (Aris), uno por documento. Frena solo si los votos no coinciden
```

  En el ensayo no pregunta a Jev ni a Claude ni escribe: dice qué fijaría. Medido contra `Admin/mediciones/perimetro-verdad.tsv` (12 clubes italianos +
  Juventus y Novorizontino de control): 77 bien, 0 mal, 23 sin decidir; sobre los 517 documentos cargados no propone nada distinto de lo
  cargado. Lote 14: de 29 documentos frenados a 0. Con A2, la verdad da 91 bien, 0 mal, 9 sin decidir (Admin/mediciones/perimetro-a2-verdad.txt).

- f) **Escalera** (es el reintento del camino de error):

```
 ESCALÓN 0  índice normal ────────────────────────────── ¿verificar cierra y no faltan categorías? sí → sigue
 ESCALÓN 1  índice ampliado (filas que terminan en "-") + la lista de lo que faltó (--reintentar, una vez) ── ¿cierra? sí → sigue
 ESCALÓN 2  sin estado pero con notas de ingresos y gastos: LAS NOTAS HACEN DE ESTADO (--reintentar, una vez; Versión 360)
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
  menos del 25% están en su texto propio, va a (b) (Versión 610, to-do 179; caso Genoa 2023, pág. 13 del visor, 71 números sin confirmar con la
  etapa 6 cerrada al centavo). Medido en los 242 documentos con validación: cambian Genoa 2023 (1 página), Inter 2024 (6, notas con la tabla en
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
 ESCALÓN 3a (Versión 588, to-do 176) un número que no es el valor del año de una fila que se carga (fila del resultado, total de una
            nota, columna del año anterior) no frena la categorización: si estuviera mal leído, la etapa 6 no habría cerrado
 ESCALÓN 3b (Versión 588) de una fila que se carga: confirmado si el resultado cierra con él y deja de cerrar con el de la segunda
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
  dos veces, subtotales impresos arriba de sus componentes.
  Si las filas que dicen abrir un renglón no lo cierran, se prueba solo con las del mismo lado (to-do 163: "altri" es renglón de ingresos y
  del 16) y 17), y las notas de intereses también dicen abrir "altri"). Escalón, no regla: como regla rompía Goiás 2025, cuya nota mezcla
  un gasto y un ingreso que dan el renglón neto.
  Nota del SUBTOTAL (to-do 163): si la extracción asignó la nota al subtotal del grupo ("Totale altri ricavi e proventi") y la última
  propuesta de carga marcó una categoría en 0 de ese lado ("Televisión en 0"), las filas de la nota que suman el subtotal impreso
  reemplazan a los renglones que lo componen. Solo en ese camino de error: donde el estado ya viene desglosado (Atalanta 2024, Parma 2023)
  la nota repartía distinto o repetía lo mismo con otro nombre. Los componentes pueden estar arriba del subtotal (Bologna) o abajo
  (Sassuolo: "5) Altri ricavi e proventi:" y debajo a), b), f)). La señal se queda prendida (`notaSubtotal` en el .verificacion.json): sin
  eso, al arreglarse la TV la propuesta dejaba de marcarla en 0 y la corrida siguiente volvía atrás.
- Un ajuste que el script ya resuelve se anula con `node tools/ajustes.mjs --anular "<pdf>" <campo> [--etiqueta] [--valor] --motivo`
  (el archivo es un historial: el registro `anulado` gana sobre el anterior).
- b) Resultado: ingresos − gastos ± financiero ± impuesto tiene que dar el resultado impreso.
  Escalera de la compuerta (Versión 582, to-do 155 escalón 1): primero las 4 combinaciones de signo del financiero y del impuesto con el
  resultado EXACTO (media unidad impresa por fila); solo si ninguna es exacta, la tolerancia de siempre. Caso: Cremonese 2025 ganaba
  "los dos invertidos" a 8.522 EUR del impreso cuando "impuesto invertido" daba exacto.
  Escalón 2 (to-do 212), entre las combinaciones exactas y la tolerancia: el signo de CADA fila del financiero por su rótulo (intereses
  cobrados / ingresos financieros suman, pagados / gastos financieros restan; un rótulo que no dice o dice las dos cosas queda como está
  impreso; listas FIN_INGRESO / FIN_GASTO de `tools/vocabulario.mjs`), con la misma compuerta EXACTA. Caso: Volos 2021-2025 imprime los
  intereses cobrados y pagados los dos en positivo; en bloque, 2021 y 2025 entraban por la tolerancia con el cobrado cargado como gasto.
- c) Año anterior cargado: la columna del año anterior contra lo que tiene el sitio.
- d) Año vecino: si el documento del año siguiente ya pasó por extraer, su columna "año anterior" tiene que coincidir.
- e) Redondeo: si solo falta menos de media unidad por fila, se agrega una fila "Diferencia de redondeo".
- f) **Escalera de lecturas** (si la base no cierra con un número impreso, se prueba la siguiente; gana la primera que cierra y queda escrita):

```
 LECTURA 0  las filas tal cual ───────────────── ¿cierra? sí → OK
 LECTURA 1  + "resultado antes de impuestos" si no hay resultado final ── ¿cierra? sí → OK
 LECTURA 2  + el total impreso puede ser un renglón más del estado ─────── ¿cierra? sí → OK
 LECTURA 3  + renglones sin lado, según su signo ──────────────────────── ¿cierra? sí → OK
 LECTURA 4  + signos impresos; subtotal de un solo renglón; total bruto con deducciones aparte (Versiones 396, 409); los ajustes
            `fila` también con su signo, relativo a la mayoría de los ajustes de su lado (Versión 493)
 ESCALÓN    si la 4 no cierra: la 4 sin contar el subtotal que repite el renglón INMEDIATO de arriba (mismo importe); si el renglón
            no se abrió, el subtotal ocupa su lugar con su nota; misma compuerta que la 4 (Versión 586, to-do 175; caso Parma 2025)
            También una fila que no es renglón con el mismo importe que la fila inmediata de abajo (mismo lado, nada en el medio): no se
            cuenta (to-do 199, patrón A; casos Remo 2023 y 2024, "Receita Operacional Bruta" = "Receita Operacional Líquida")
            Y una fila que no es renglón y es la suma con signo de las filas de arriba de su lado contando los subtotales (to-do 199, patrón B;
            caso Ferroviária 2016, "RECEITA LÍQUIDA" = "RECEITA OPERACIONAL BRUTA" − "Deduções")
 ESCALÓN    si la 4 no cierra: los ajustes `fila` con el signo comparado contra cómo IMPRIME EL ESTADO su lado (la mayoría de sus
            renglones), no contra la mayoría de los ajustes: un ajuste con el valor tal cual impreso y el signo contrario resta. Misma
            compuerta que la 4; solo si cambia algún signo (to-do 200; caso Criciúma 2022, "Outras receitas Operacionais" 32.222 dentro de
            los gastos impresos entre paréntesis)
 LECTURA 5  solo las hojas, con signo (C/D de balancetes); sin totales; compuerta: resultado impreso exacto (Versión 414)
            (to-do 220) si la 5 o la 6 cerraron, un renglón cuya nota (detalla_a) suma el renglón al centavo se abre en esa nota
            (AEK 2022-2025: nómina y amortización de pases por separado); totales y resultado no cambian
 LECTURA 6  la 5 + los renglones sin lado, según su signo (Versión 434)
 ESCALÓN    si NINGUNA lectura cerró el RESULTADO: la 5 otra vez + los ajustes `fila` del financiero sin `reemplaza` (la 5 solo suma
            los que reemplazan); misma compuerta que la 5 (Versión 581, to-do 156 B; caso Inter 2024-25). No corre si el resultado ya
            cerró en alguna lectura y fallan solo los totales (Roma 2018: así, como regla de la 5, rompía lo cargado)
 ESCALÓN    si el resultado no cerró EXACTO en ninguna lectura y el documento tiene el formato del Codice Civile: "17) resta". El 17)
            (encabezado buscado en el .md, por su número o su nombre fijo) y lo que cuelga de él hasta el 17-bis o el total de C, como
            −|valor|; compuerta: la suma da EXACTO el total de C impreso; después las lecturas 0-6 con ese financiero, gana la primera que
            cierra exacto (Versión 583, to-do 155; caso Torino 2024)
            Si la suma no da el total de C, las sumas eligen el signo de las filas del 17-bis: la ÚNICA combinación (hasta 4 filas) que da
            exacto el total de C (Versión 590, to-do 166; casos Napoli 2024 "b) perdite su cambi", Atalanta 2019)
            Versión 621 (to-do 188, peldaño A): si el .md no trae el 17) a la altura de la tabla, vale el nombre fijo del renglón en las filas
            del financiero; y si con el último subtotal la compuerta no cierra, se prueban los anteriores, del último al primero (caso Torino
            2019: etiquetas como texto arriba de una tabla sin nombres; el último subtotal es el 0 de la D). Medido en los 242 documentos con
            verificación: idéntico.
            Versión 623 (to-do 188, peldaño B): si la extracción dejó filas de la D en el financiero, la compuerta de C mira solo las filas de C,
            y en la D una fila que cuelga de un 19) resta y una de un 18) suma; compuerta: el total de D impreso, exacto (casos Bologna 2023-24
            y 2024-25, "19) svalutazioni, a) di partecipazioni"). Medido en los 242: idéntico.
 ESCALÓN    "financiero dentro de un subtotal" (to-do 199, patrón C), el ÚLTIMO: solo si ninguna lectura ni escalón cerró. Un subtotal de
            ingresos o gastos que es la suma de los renglones de abajo con una fila del financiero adentro no se cuenta; esa fila toma el
            signo de su bloque (suma en ingresos, resta en gastos); compuerta: resultado impreso exacto (los totales mezclan lados). Caso
            Avaí 2021. Más arriba en la escalera le ganaba a la lectura 5 (Ferroviária 2012).
 ESCALÓN    "sección D" (Versión 589, to-do 166): con el encabezado "D) Rettifiche di valore" (o "Value adjustments") impreso entre el
            financiero y el resultado y sin ajuste manual del financiero en esa zona: las filas sin lado de ahí van al financiero (las de un 18)
            suman |valor|, las de un 19) restan |valor|); compuerta: su suma da exacto el total de D impreso; después las lecturas 0-6 y gana la
            primera que cierra exacto (caso Bologna 2019-20).
            Versión 610 (to-do 179): el encabezado también se reconoce con la "D)" y el título en celdas separadas (Inter 2023 y 2024) y con el
            "E) Proventi e oneri straordinari" (Chievo 2014-16, sin D impresa); en esa zona un "21) oneri" resta. Medido en los 177 documentos de Italia:
            cierran Chievo e Inter; Parma 2016 mejora (el total de gastos pasa a coincidir con el impreso); Lazio 2000-01 pasa de la lectura 6 a la 4
            (sigue OK y sus totales ahora cierran); el resto, idéntico.
            Versión 611 (to-do 187): ESCALÓN "financiero sin hojas": en las lecturas 5 y 6 (solo hojas), si el estado no trae hojas de financiero, se usan sus renglones o su total único
            (Lazio 2016: "Oneri finanziari netti e differenze cambio (1.866.421)" era una sola fila impresa como subtotal y quedaba en 0). Medido en 242 documentos: Roma 2007 y Lazio 2011-12 y
            2012-13 dejan de marcar totales en rojo; Lazio 2012-13 pasa de cola a ok y su año anterior coincide con 2011-12; Lazio 2012-13 cargado daría ingresos 109.794312 (antes 109.794296) y
            gastos 114.569607 (antes 114.568051), pero lo ya cargado no se toca; el resto, idéntico.
            Versión 611, ESCALÓN "columna anterior con signo": al decidir si un total es la suma de sus renglones, la columna del año anterior también acepta la suma con el signo impreso
            (como la lectura 4 para la columna actual). Cambian solo el chequeo del año vecino y "año anterior cargado" de AC Milan 2017-18 y 2018-19 y Lazio 2015-16 y 2016-17: los
            totales que se cargan, idénticos; los 4 pasan de cola a ok
            To-do 232 m, ESCALÓN "presentación distinta": si el año vecino da distinto y la diferencia es exactamente UNA fila de gasto (no un
            total) de uno de los dos documentos, el chequeo queda sin decidir (uno la netea), sin casos en la cola. Olympiacos 2020/2021,
            Cuiabá 2022/2023; medido en los 112 casos de año vecino de la cola: 5 aciertos, 0 errores
 ESCALÓN    si la lectura que ganó (0-4) deja un renglón de ingresos de 20% o más del total dentro de un grupo de 3 renglones o
            menos: la misma lectura con la nota del subtotal abierta (sin esperar a la categoría en 0 del reintento); compuerta: cierra
            igual (Versión 587, to-do 175; caso Cremonese 2024)
 nada cierra → reintento (una vez) → cola humana
```

  Si el documento no tiene ningún total ni resultado impreso en los bloques elegidos, es un fallo (no se carga sin confirmar sumas).
- **Escalera de escala** (Versión 362; queda en el `.verificacion.json` como `escala`):

```
 ESCALÓN 0  la declarada (bloque → documento) ──────────────── declarada → manda, nunca se pisa
 ESCALÓN 1  si el documento dice "no se sabe": la del año vecino ANCLADO (la declara o la resolvió acá),
            si los ingresos del año en común dan exactamente x1.000 o x1.000.000 ──► COMPUERTA: chequeo de año vecino (d) ── pasa → adoptada
 nada → unidades y cola
```

  La cadena depende del orden (Fortaleza: 2025 declara → 2024 → 2023): `verificarLista()` repite la pasada si alguno se resolvió así.
- **Resultado impreso, escalón 2** (Versión 415, ampliado en la 592): si no hay resultado en los bloques, una línea PREJUÍZO / SUPERÁVIT /
  "UTILE (PERDITA) DELL'ESERCIZIO" pegada al último bloque (hasta 4 líneas; en italiano el signo lo da el importe, entre paréntesis = pérdida);
  compuerta: alguna lectura cierra con él exacto. `ANTES_RE` reconoce también "prima delle imposte", el checo "před zdaněním" y el griego "προ φόρων" (sin "προ φόρων, χρηματοδοτικών…" ni "προ φόρων και τόκων", que son el resultado operativo).
- **Signo del resultado que se carga** (to-do 198). La compuerta del resultado compara valores absolutos; el signo que se le pasa a la carga:
  escalón 0 el ajuste `resultado-final`; escalón 1 el impreso tal cual; escalón 2 el signo de las filas, solo si el resultado del ejercicio
  cerró EXACTO con el signo opuesto Y el documento dice que el impreso es una pérdida sin signo (etiqueta de pérdida y no de las dos cosas:
  "Prejuízo" sí, "Superávit/Déficit" no; o la marca D de balancete; o los ingresos impresos en negativo). Sin señal, frena como siempre.
  Casos: Ferroviária 2013-b, 2014-b y 2017 ("= Prejuízo … D"), Novorizontino 2014-b ("PREJUIZO"), Paysandu 2025 (signos de balancete).
- **Gestión de jugadores neta** (to-do 170, Versión 601): si ninguna lectura cerró, de las filas sin lado solo cuentan las que están entre el total de
  costos y el "resultado antes de impuestos" (AS Roma 2013-2017: "Gestione operativa netta calciatori"); un valor positivo entra como ingreso, uno
  negativo como gasto. Compuerta: las lecturas 0-6 con esa selección y gana la primera que cierra el resultado EXACTO. El año vecino no se compara con un
  documento que no usa este escalón (otro régimen).
- **Chequeos cruzados** (año vecino, año anterior cargado; Versión 416): si ninguna fila trae la columna del año anterior, "no se puede".
  Versión 625 (to-do 189): escalón 1 de los dos chequeos, solo si las columnas crudas no coinciden: cada columna actual con los ajustes `fila` de
  su documento (reemplazar y agregar); en la columna anterior solo los ajustes que sacan una fila (valor 0 con reemplaza). Misma compuerta (2%).
  Caso: Roma 2007 contra 2008 (crudo 157.589 contra 162.017; con el ajuste de 2007, 162.255). Medido en los 242: 14 chequeos pasan a ok, 0 al revés, carga idéntica.
  Escalón 2 (to-do 201), solo si el 1 tampoco coincide: la columna del año en común con LAS MISMAS FILAS que cerraron la columna que se carga
  (las líneas finales de cada documento, con su signo), no reconstruida con la lectura. Misma compuerta (2%). Caso: Ferroviária 2024, columna
  2023 (114,4 M reconstruida; 37,74 M con las filas que cerraron 2024; cargado 37,56 M). Medido en las 306: carga idéntica; pasan a ok
  Ferroviária 2024, Criciúma 2025 y Lazio 1999-00 (y Cuiabá 2024 contra 2025).
- **Resultado final** (Versión 364), si cerró contra "antes de impuestos": candidatos antes ± impuesto → escalón 0, impreso en el .md del
  documento; escalón 1, impreso en el documento siguiente (columna del año anterior) → compuerta: uno solo coincide; si no, cola.
- **Dudas de la IA, escalera** (antes de llegar a la cola):

```
 ESCALÓN 0  ¿afecta la carga? ── no ──► nota
 ESCALÓN 1  ¿Guido ya la contestó para este club? (club + tema + renglón) ── sí ──► se aplica
 ESCALÓN 2  ¿la aritmética la confirma? (la escalera de lecturas cerró, ningún año vecino da distinto, tema = cuadro por segmento /
            cuadro duplicado / columna, y la propuesta "sí" ya está aplicada) ── sí ──► se acepta sola, con nota
 ESCALA     (to-do 213) duda de escala, la carga usó unidades y otro .md de la carpeta del club imprime uno de los importes del estado
            (6+ cifras, mismos decimales) pegado a su moneda, en una línea que no habla de miles ── sí ──► se cierra con la cita
 ESCALÓN 2b lo mismo cuando lo único que falla es el año vecino (Versión 628, to-do 173: medido contra las respuestas de Guido,
            21 de 21 aceptadas tal cual) ── sí ──► se acepta sola, con nota
 MISMO CUADRO (to-do 211) Guido ya contestó la duda del otro origen sobre el mismo cuadro (mismo primer bloque, que no sea el
            estado) y las dos son sobre si el cuadro entra ("¿se carga?" con "¿se deja afuera?", o dos "¿se deja afuera?") ── sí ──► se
            cierra con la respuesta implícita, con nota (dos "¿se carga…?" pueden ser maneras distintas de cargar: van las dos)
 NATURALEZA (to-do 222) "¿Se carga <cuadro> como desglose conjunto / por naturaleza / transversal…?": el total del cuadro (fila total
            o subtotal; menos sus filas de otro lado) contra todas las combinaciones de renglones del estado de ese lado más el financiero
            del mismo signo, exacto a media unidad por fila. UNA combinación y propuesta "sí" ──► sí; NINGUNA y la carga no usa el cuadro
            ──► no; si no, cola. Medido: 7 de 7 respuestas iguales (Asteras 2020-2025, Levadiakos 2020, OFI 2020)
 COLA HUMANA (escala, perímetro, cuadro de otro año, fila ilegible, "otro" y las propuestas "no" siempre llegan: medido el 2026-10-09,
            un tercio de esas dudas terminó corregido, así que son preguntas legítimas)
```
- g) Sin fecha de cierre detectada: se deduce si el documento anterior y el siguiente del club cierran el mismo día (con aviso).
- h) **Compuerta del registro** (deja el documento "listo" para categorizar): exige confirmados solo los números de los bloques que usa la
  lectura que cerró (las filas que se cargan); un número de una nota que no se carga no frena (Versión 457).
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
- c) **Escalera** (el escalón con contexto se agregó el 2026-10-01; Jev y Claude reciben como "sección" de dónde sale la fila, incluido
  "sin lado en el documento: entra como gasto por su signo, impreso en negativo"):

```
 ESCALÓN 0  ajuste manual · respuesta de Guido en la cola para esa fila ──────── gana siempre
 ESCALÓN 1  precedente exacto CON CONTEXTO (misma etiqueta y mismo renglón que desglosa)
 ESCALÓN 2  precedente exacto (misma etiqueta en el club, una sola categoría)
 ESCALÓN 3  precedente por familia de palabras
 ESCALÓN 4  Jev con confianza >= 0,90
 ESCALÓN 5a ¿Claude ya respondió esto? (caché: carpeta + lado + etiqueta + nota, Versión 404)
 ESCALÓN 5b Claude por API con confianza >= 0,80
 ESCALÓN 6  materialidad: las dudas de un lado suman ≤ 1% de ese lado → las de confianza >= 0,60 se cargan con aviso (Versión 386)
 ESCALÓN 7a (to-do 152) una fila que iba a la cola toma la respuesta de Guido de OTRO AÑO del club con la misma etiqueta salvo la marca
            de lista ("b) oneri sociali" = "oneri sociali"; claveFamilia igual, sin tolerancia de letras). Compuertas: mismo lado, misma
            nota (o una es el renglón del estado y la otra su hoja en la nota) y una sola categoría entre las respuestas
 ESCALÓN 7b (to-do 152) si no: la respuesta de OTROS CLUBES DEL MISMO PAÍS. Compuertas: misma etiqueta (claveFamilia), mismo lado, mismo
            contexto (la nota que la abre o, en el estado, el renglón título de arriba: contextoFila() de padres-filas.mjs), respondida
            en al menos 1 club (to-do 215: con 1 decide 59 y acierta 59), todos con la misma categoría. La carga lo dice: "precedente del país: N clubes (...)"
 SACAR UNA FILA (to-do 205): una respuesta `descartar` o `corregir --valor no_es_rubro` vale solo para SU documento; la de otro año
            del club (respuesta del club, 7a) o de otros clubes (7b) no decide y la fila sigue por los escalones
 "NO ES RUBRO" de la IA en una fila verificada con lado: se excluye; si la carga no cierra, se prueba incluirla (a la cola);
            gana la que cierra (Versión 462)
 COMPUERTA DEL LADO en todos los escalones (Versiones 374 y 377): la categoría tiene que ser del lado de la fila en el documento; si no,
            baja de escalón; la pregunta de la cola lleva la clave "etiqueta|lado"
 nada → cola (pregunta de sí o no)
```

  Si la misma etiqueta tiene categorías distintas en el club, el precedente sin contexto no decide y se baja de escalón: "Remuneraciones"
  dentro del costo de ventas (sueldos del plantel) no se confunde con "Remuneración" dentro de gastos de administración.
- Tools: `glosar-rubros.mjs`, `jev-categorizar.mjs`, `categorizar-claude.mjs`, `memoria-categorias.mjs`. ~US$ 0,03 por documento.

Riesgos:
- i) categoría equivocada con sumas correctas (nada lo delata).

Mitigaciones:
- i) las filas de menos de 0,80 van a la cola de categorías (etapa 8). El primer año de un club ya no es una revisión de Guido (to-do 214):
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

- a) `cargar.mjs --desde-verificacion`: carga solo lo que la etapa 6 dejó en "ok". Tipo de cambio, liga y fuente con página. Si el
  documento no está `listo-para-jev` en el registro, el freno dice por qué (sin `.verificacion.json`, la etapa 6 no cerró, la validación es
  de otra versión del .md, números sin confirmar de la etapa 4, o el registro no se actualizó porque no corrió el lote).
- b) Club nuevo: `alta-club.mjs`, en el mismo commit que su primer año. Se commitean TODOS los archivos que lista "Alta escrita (...)",
  también los compartidos (`data/currency-map.js` con el tipo de cambio nuevo): en las altas italianas quedó afuera y se commiteó suelto.
  `alta-club.mjs --todos` (el registro `Admin/registros/altas-club.jsonl`): una carpeta cuyos `.md` están TODOS en `documentos-descartados.txt`
  o `documentos-parciales.txt` no se analiza y queda `faltan-datos` con la lista (to-do 232 a: Athens Kallithea, Catania); si un documento
  sale de la lista, la corrida siguiente la vuelve a analizar.
  El tipo de documento (`reportType`) del alta: escalón 0 el ajuste; si no, el `.md` tiene que tener un estado contable con 10+ filas de 2+
  montos; escalón 1 (to-do 202): un estado de resultados corto de una columna vale si la primera página trae su título y el ejercicio anual
  (período impreso de 12 meses, o "Demonstração do Resultado do Exercício") con 5+ filas con monto. Si no, pregunta.
  Nombre legal (`decidirNombre()`): ajuste `name` (del documento o de la carpeta del club) o respuesta de la cola → si la portada y lo
  más frecuente del .md coinciden, ese → si no, pregunta a la cola (una por club, se contesta `corregir --valor "<nombre legal>"`).
  Después de un alta, un subagente Sonnet revisa nombre, tipo de documento y cierre contra el documento (decisión de Guido: el alta es
  una sola vez y se averigua fácil); lo que esté mal se corrige con un ajuste (`name`, `reportType`, `cierre`).
- c) Después corre `audit.js`; si da un error grave, revierte solo.
- d) **Escaleras chicas** (de dónde salió cada dato: `.carga.json` → `procedencia`, y `_escalon` / `_fuenteCat` en cada línea, Versión 525; el conteo: `node tools/estado.mjs --escalones`):

```
 TIPO DE CAMBIO   ajuste ─► declarado (compuerta: su frase no trae otra fecha que el cierre) ─► en tabla (fecha más nueva) ─► serie oficial ─► cola
 PERÍMETRO        heredado del año cargado más cercano ─► cola
 FECHA DE CIERRE  títulos ─► encabezados de las tablas (ejercicio | un año antes) ─► vecinos ─► cola; compuerta: no más de 2 años después de hoy
 AÑO (alta-club)  ajuste `anio` ─► nombre con dos años seguidos que bajan ("2017-2016", ambiguo): el de las fechas de cierre del .md si es
                  uno de los dos (Versión 519) ─► la regla del nombre (el segundo de un par, el de una fecha ISO...) ─► contenido ─► cola
 PRESIDENTES      (Versión 552) data/gestiones/<país>.js tiene una gestión confirmada que cubre el cierre ─► si no, caso `gestion` en la
                  cola (no frena; lo contesta el subagente con nombre, desde, hasta y fuente; trae como pista el firmante del .md) ─►
                  "descartar" = club sin presidente persona (SAF, sociedad anónima), no se vuelve a preguntar
 PERÍODO CORTO    menos de 12 meses ─► la columna del año anterior sin importes (primer ejercicio de una sociedad nueva) → se carga
                  como el año con publicNote (Volos 2019, Kifisia 2022; Admin/CONVENCIONES-DATOS.md) ─► con importes → frena (parcial)
 SIN CATEGORÍA    fila impresa (con página) que no está en el .categorias.json y nada categorizó ─► frena con su nombre (to-do 232 x;
                  AEK 2024) ─► las demás sin categoría aceptable: más del 5% del dinero del lado frena, menos es aviso y no se cargan
 CATEGORÍAS EN 0  ajuste `cero-real` ─► salarios / TV / estadio, o socios / otros deportes según el perfil ─► reintento (una vez) ─► aviso
 LO QUE CERRÓ EN LA ETAPA 6 (Versiones 375-378): financiero e impuesto con el signo con que cerró; una fila verificada con lado no se mueve
                  por palabras ni se excluye sola por "no es rubro" dudoso
 "NO ES RUBRO"    (fila verificada con lado, dicho por la IA) excluirla ─► si la carga no cierra, incluirla (a la cola) ─► gana la que
                  cierra; el intento descartado no escribe en la cola (Versión 462)
 "POSIBLEMENTE DENTRO DE OTRO RUBRO" (Versión 518; tools/dentro-de-otro.mjs, la llama --escribir sobre el club entero antes de publicar)
                  una fila en "—" por un renglón sin desglosar: ajuste `incluye` / `cero-real` ─► precedente del club (plata en TODOS sus
                  otros balances desglosados, al menos 2) ─► (cola: a diseñar con el primer caso) ─► queda "—". No cambia ningún número.
                  Reescribe sus propias marcas: el año nuevo nace marcado y un año viejo gana o pierde las suyas si el nuevo le cambia el
                  precedente.
```
- En el lote es propuesta; con `lote.mjs --ejecutar --cargar` (o `node tools/cargar-lote.mjs --lista <lista> [--escribir]`) lo que quedó
  "listo para cargar" se escribe solo (Versión 642): alta del club nuevo si el registro de altas lo da listo y `Admin/registros/altas-revision.jsonl`
  tiene su color, `cargar.mjs --escribir` con su auditoría, y un commit por año (el alta en el del primer año). Si ningún año de un club
  nuevo escribe, el alta se revierte. Exige `data/`, `index.html`, `fuentes/` y `Admin/sourcing/` sin cambios al empezar. Sin push.
  Saltea, igual que `lote.mjs`, los documentos de `documentos-descartados.txt` y de `documentos-parciales.txt` aunque tengan un `.carga.json`
  viejo (to-do 232 j: Kifisia 2022, parcial, se había publicado igual).
- Club nuevo en el ENSAYO (to-do 210): sin `--escribir`, `cargar.mjs` no corta en "el club no existe": si la ficha del alta (`analizar()`)
  tiene id, país, moneda e inicio del ejercicio sin preguntas, anota el freno `club` y evalúa el resto con un club provisional armado de esa
  ficha. Así el ensayo de `cargar-lote.mjs` muestra los frenos reales (categorías y perfil en la cola, tie-outs, fx) y escribe sus preguntas
  en la cola antes del alta, igual que con un club existente. Con `--escribir` corta como siempre.
- Escribir: `cargar.mjs "<pdf>" --desde-verificacion --escribir`, un commit por año; después `caja-deuda.mjs --club <id> [--ejecutar] --escribir`.
  Al final imprime el `git add` de lo que tocó esa corrida (generadores y registros incluidos; to-do 232 y): se pega tal cual en el commit.
  El club de `quien.mjs` se compara con el del alta solo si salió de `carpetas-clubes.mjs`: sin cita (club sin alta) `quien` usa el nombre
  de la carpeta y lo marca `clubDeCarpeta` (to-do 232 f).
  Las marcas "Posiblemente dentro de otro rubro" las pone `--escribir` solo (no hay un paso más). Para un club cargado a mano o corregido
  fuera de `cargar.mjs`: `node tools/dentro-de-otro.mjs --club <id> [--escribir]`.
- Dónde queda la evidencia: `data/<país>/<club>-data.js` no lleva comentarios (se publica). `cargar.mjs --escribir` deja en
  `Admin/carga-clubes/<clubId>.md`, en la sección del año, la cabecera "cargado por… tie-out", la tabla de filas con la página y el
  escalón de cada categoría, los ajustes manuales y la nota de meta, y de dónde salió la liga. Lo edita solo a través de
  `tools/evidencia-club.mjs`; con `--reemplazar` saca SUS líneas de ese año (lo escrito a mano queda) y las vuelve a escribir. Si la
  auditoría da P0/P1, el `.md` se revierte junto con `data/`. `dentro-de-otro.mjs` hace lo mismo con su nota (en la meta de cada año
  marcado): como las marcas, en cada corrida saca TODAS sus notas del club y pone las de ahora.
  `alta-club.mjs` crea el `.md` del club con su "## Cabecera" (de dónde salió cada campo, el color AUSENTE a propósito) y la liga del
  año; `cargar-lote.mjs` / `bfo-rusia.mjs` cambian ahí el color al ponerlo, borran el `.md` si revierten el alta y lo incluyen en el commit.

Riesgos:
- i) el documento declara varios tipos de cambio;
- ii) el documento no declara y la moneda no está en el archivo de series (hoy hay 21).

Mitigaciones:
- i) si están en una tabla con una fecha por columna, gana la fecha más nueva; si no (frase, años sueltos, activo y pasivo), a la cola;
- ii) se agrega la moneda al script de series oficiales; mientras tanto, frena.

### 9 Publicar

- Commit local, un commit por año cargado. El push lo hace Guido.

### Camino de error (reintento)

El camino limpio no cambia: si todo suma y nada falta, el documento sigue. Las reglas extra viven acá (regla de Guido: "para cuando haya
errores"). Un documento se marca para reintentar por dos motivos:

- a) **Un desglose no suma** (una nota, o un cuadro que abre una fila de una nota). Lo detecta la etapa 6.
- b) **Una categoría da 0 cuando debería tener número.** Lo detecta la etapa 8 (ahí ya hay categorías):
  - salarios del plantel, televisión o estadio en 0: siempre (en 241 años cargados, salarios nunca es 0, televisión 2%, estadio 1%);
  - cuotas sociales en 0: solo si el perfil del club dice que tiene socios;
  - otras secciones deportivas en 0: solo si el perfil dice que tiene otros deportes (básquet, vóley, futsal...);
  - educación nunca dispara;
  - un documento con una línea "sin desglosar por la fuente" no se revisa.

Qué pasa después:

- Antes del primer pago de cada documento, la compuerta de la etapa 3 (perímetro y cierre fijados).
- Al final del lote aparecen dos listas con su comando (Versión 442): lo que destraba la carga (`--reintentar`: categoría en 0, o desglose
  que no suma con la etapa 6 sin cerrar) y el detalle opcional (`--reintentar --detalle`: desglose que no suma con la etapa 6 cerrada; el
  año se carga igual con el renglón sin abrir). Un año ya cargado (registro o sitio) solo se reintenta por categoría en 0, y solo si su
  propuesta de carga está al día: ningún ajuste manual del mismo documento o de su club con fecha igual o posterior (Versión 461).
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
  "no" y "no" con esa línea como cita (fuente `forma-juridica`) y cierra los casos de perfil del club (to-do 232 c). Solo ΠΑΕ: la SAF
  brasileña no sirve (Cuiabá y Ferroviária tienen socios).
- Una respuesta de categoría en la cola (aceptar o corregir, salvo `no_es_rubro`) cierra los casos pendientes del mismo club con la misma
  etiqueta en otros años; `cargar.mjs` aplica la respuesta solo si la fila está en la misma nota y, si no, el caso se reabre (to-do 232 d).
- Una respuesta de perfil en la cola (`corregir --valor sí|no`) se guarda en el perfil en el momento y cierra los casos iguales
  (mismo club y campo) de los otros años, pendientes (to-do 232 r).
- Dos datos por club: ¿tiene socios que pagan cuota?, ¿tiene otros deportes en sus estados financieros? Sí, no o no se sabe, con evidencia.
- Hoy: los 66 clubes sudamericanos (armado por un subagente con lo cargado y las transcripciones). Socios: 49 sí, 11 no, 6 no se sabe.
  Otros deportes: 31 sí, 25 no, 10 no se sabe. Criterio aceptado por Guido: "clube social e esportes amadores" que además nombra básquet,
  vóley, futsal o remo cuenta como otros deportes.
- Si un club no está o dice "no se sabe" y la categoría da 0: pregunta de sí o no en la cola. Guido contesta o manda un agente a buscar; la
  respuesta queda en el perfil para todos los años del club.

### Ajustes manuales (Versión 366)

- `Admin/registros/ajustes-manuales.jsonl`, se lee y se agrega con `node tools/ajustes.mjs`. Una decisión de Guido atada al documento y al campo
  (`no-recargar` (`cargar.mjs` frena aunque sea con `--reemplazar`: lo publicado es mejor que una corrida nueva; Versión 637, Lazio 2012-13 y Roma 2021), `filas-a-mano` (`localizar.mjs` y `extraer.mjs` no pisan la ubicación ni las filas armadas a mano, ni con `--rehacer`; Versión 614), `estado` (los bloques del estado de resultados, escalón 0 de `localizar.mjs`; Versión 614, AS Roma 2005), `resultado-final`, `sin-dudas`, `fila`, `fx`, `cero-real`, `desglose`, `categoria`, `perimetro` — este también para todo el club —, `cierre`, `reportType`, `confirmado`, `caja`, `deuda-incluye` — este también para todo el club); es el escalón 0 de cada escalera y queda escrita en el `.verificacion.json` y en la meta del año.
- `fila` saca la fila que trajo mal la extracción con `--reemplaza "<etiqueta>"` (TODAS las que se llaman así) o `--reemplaza-linea N`
  (SOLO la de esa línea del .md, o las hojas de su nota si estaba abierta). Con etiquetas repetidas (en el formato italiano "altri" es
  ingreso, financiero + y financiero −), siempre por línea.
- Va acá lo que Guido decide forzar. NO va escrita en un documento (ningún script lo lee) ni en una respuesta de la cola (esa se ata al texto de la pregunta).

### Cola humana

- Archivo: `Admin/registros/cola-revision.jsonl`. Se lee con `node tools/cola.mjs`.
- Una duda por tema (escala, perímetro, cuadro duplicado...) contestada para el club vale para todos sus años, también si se contestó antes
  del alta del club (la clave llevaba el nombre de la carpeta y ahora lleva el id del sitio; to-do 153).
- Cada caso es una **pregunta de sí o no**, con la propuesta del sistema, la página del visor y la impresa, y las líneas del .md.
- Guido contesta con `node tools/cola.mjs --responder <id> aceptar | corregir --valor "..." | descartar | preguntar-club --nota "..."`.
  En un caso de categoría, `descartar` se rechaza (to-do 205: parecía "descarto la pregunta" y sacaba la fila): para sacar la fila,
  `corregir --valor no_es_rubro`; para un año ya cargado, la categoría con la que está publicado.
- Una categoría que da 0 porque el documento la junta con otra línea: ajuste `incluye` (`--valor <categoría> --categoria <donde está> [--posible]`); `cargar.mjs` la escribe en `fiscalYearMeta.incluidoEn` y no la revisa como un 0 (Versión 511).
- Para fijar la categoría de una fila sin que haya un caso: `node tools/cola.mjs --corregir-categoria "<pdf>" "<etiqueta>" <categoría> --nota "..."`.
- La próxima corrida toma la respuesta.
- Al abrir la cola, se cierran solos (estado "obsoleto", sin efecto en ninguna tool) los casos de `verificar` y de `cargar · perimetro` de
  años que ya están en el sitio: ya no frenan nada. Nunca los de categoría (pueden tocar un dato publicado) ni los de perfil (son del club).
  Si una etapa vuelve a levantar uno, se reabre y no se vuelve a cerrar solo.
- Las dudas de la IA traen un tema de una lista fija (usar un cuadro por segmento, cuadro duplicado, cuadro de otro año, perímetro, escala,
  columna, fila ilegible, otro) y el renglón al que afectan. Una duda de tema fijo se reconoce por club + tema + renglón: si Guido ya la
  contestó en cualquier año del club, se aplica sola.
- Qué entra: números no confirmados que no cierran, totales o resultado que no cierran, año vecino distinto, primer año sin vecino (salvo que lo impreso lo confirme: ver etapa 7), dudas de
  localizar y de extraer que afectan la carga, y filas con categoría menor a 0,80 (etapa 8).
- Una respuesta de categoría queda como precedente del club para los años siguientes (`Admin/registros/categorias-aprendidas.jsonl`).
- Cómo la resuelve Guido (2026-10-05): con un subagente (Sonnet) que resume los casos; no hace falta ordenarla ni otra vista.

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

## Caja y deuda (`tools/caja-deuda.mjs`)

Comando aparte, con el club ya publicado: completa `cash` y `grossDebt` de cada año cargado donde el sitio tiene null (nunca pisa un valor
cargado) y nunca frena. Medir: `node tools/caja-deuda.mjs --medir --club <id> [--detalle]` (gratis). Escribir: `--escribir` (el valor en
`data/`, sin comentario; de dónde salió, en la meta del año en `Admin/carga-clubes/<club>.md`).

```
 LECTURA DE FILAS  una sola referencia a nota; una celda con "%" no es un importe; activo y pasivo en la misma fila = dos filas; sin código de cuenta ni numeración
                   ("4)", "a)") para el diccionario. La referencia a nota es una escalera: escalón 1, si la tabla tiene una columna de
                   notas inequívoca antes de la cifra, la cifra es un importe (Novorizontino 2019 "| Empréstimos |  | 27 | 24 |");
                   escalón 2, sin esa evidencia, el primer entero de 1-2 dígitos se descarta como nota; y (to-do 221) una columna de notas
                   de varios niveles ("6.1", "6.8": la primera columna numérica, valores con punto, en orden creciente) se saca de la fila
                   (AEK 2018 "| Ταμειακά διαθέσιμα | 6.8 | 1.650.369,92 |" daba caja 6,8). Lo que ese detector no reconoce (AEK 2019,
                   notas sin orden) lo resuelven las DOS LECTURAS (to-do 223): cada propuesta se evalúa con la fila de siempre y sin la
                   celda en una columna con forma de nota, con los vecinos leídos igual; decide la compuerta (una sola pasa → esa; las dos
                   con valores distintos → no decide). Una tabla con los dos perímetros lado a lado (encabezado "Όμιλος | Εταιρεία", Group /
                   Company, Konzern / Gesellschaft...) da las cifras de cada uno por separado y se toman las del ajuste `perimetro` (to-do 232 w:
                   Olympiacos 2016-2025). La columna con forma de nota se juzga sin el encabezado del bloque (to-do 232 x:
                   AEK 2025 transcribió "σημ." como "Α/Υ" y la columna dejaba de reconocerse). (to-do 232 v) Una celda que no puede ser importe en ningún formato tampoco es
                   cifra: entero con punto final ("24.") o dos o más puntos con grupos de menos de 3 cifras ("7.1.3"); Grecia: Olympiacos
                   2017 "| Ταμειακά διαθέσιμα | 24. | 1.820.725,55 |", Aris 2019 "| ... | 7.1.3 | 420.500,00 |"
 PÁGINAS DEL BALANCE  título o total del balance, y no el flujo de efectivo ni los cambios en el patrimonio (una FILA con esas palabras
                      no cuenta si la página tiene el título del balance como encabezado)
 PERÍMETRO  cada página del balance es consolidado o individual por su encabezado; con ajuste `perimetro` solo cuenta ese (si el .md
            trae los dos, solo las páginas marcadas)
 ESCALA     una por documento (la del estado de resultados contra lo cargado); la del vecino, con SU escala; en la compuerta, si
            el valor no es plausible (1/100 a 100 veces el año cargado más cercano) o no pasa, se prueban las otras escalas y se
            acepta si UNA sola da ok y plausible
 ESCALÓN 0  ajuste manual `caja` / `deuda` del año · precedente del club (las familias que suman lo cargado en el año más cercano)
 ESCALÓN 1  diccionario (vocabulario.mjs) + términos del club o del documento (ajuste `deuda-incluye`); jerarquía de balancete: padre e
            hija no se suman; cuenta D no es deuda. Además propone: deuda corriente + no corriente de la misma etiqueta (exactamente
            dos filas, a cada lado del total del pasivo no corriente); las filas de la nota de efectivo si la caja es una parte; el total
            de la nota de deuda si no hay otra fila de deuda
 ESCALÓN 2  IA (solo líneas)
 LA NOTA DE LA FILA (deuda, to-do 228): si la propuesta es una fila del balance con su nota ("6.15") y la nota muestra que es solo una
            parte (la fila es uno de los totales de la nota, o la diferencia está impresa), se propone la suma de los totales de la nota
            (tablas con columna del año y del anterior; un total es la fila que suma las de arriba). Misma compuerta: pasa una sola → esa;
            pasan las dos con valores distintos → no decide (AEK 2021: la fila 5.029.327 es el largo plazo, la nota da 6.038.235)
 COMPUERTA (la misma para todos): la familia de la fila es la del dato y el año anterior cargado o el documento siguiente dicen lo mismo
            (el documento anterior también confirma, solo a favor; por debajo de 1.500 unidades, coincidir es ser el mismo número)
            ── pasa → dato · no pasa → siguiente escalón · nada → null
 VECINO     lo cargado en el sitio o el documento vecino; nunca un valor aceptado en la misma corrida (Versión 502)
```

Los pendientes están en `auditorias/2026-10-04-clubes-pipeline.md` .

---

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
7. Perímetro: cuando un documento trae los dos estados (individual y consolidado), se carga el **individual**, salvo que una controlada
   concentre ingresos del club (por ejemplo, el marketing): eso se mira en el `.md` antes de fijar el ajuste `perimetro` del club. Se fija
   antes del primer lote. Casos: Boca, Racing, Panathinaikos, Juventus.


---

## Documentos fuente: carpetas, transcripción y trampas de PDF (venía de `CLAUDE.md`)

Texto movido sin cambios. Lo que dice "este archivo" o "acá" se refería a `CLAUDE.md`.

## Estructura de carpetas de documentos fuente: Clubes/<País>/<Club>/ (PDF y transcripción juntos)

Todos los PDFs fuente Y sus transcripciones a Markdown viven JUNTOS, en la
misma carpeta: `finance-of-sports/Clubes/<País>/<Club>/` — NO carpetas sueltas
tipo `racing-pdfs/`, `river-pdfs/` al nivel raíz (eso fue un error temprano,
corregido en la Versión 17), y NO dos árboles paralelos separados para PDFs
y para transcripciones (eso fue el esquema `PDFs/` + `pdf-extracts/` de la
Versión 17, reemplazado en la Versión 28 a pedido de Guido: quería el PDF y
su transcripción uno al lado del otro, no en dos carpetas distintas que hay
que mantener sincronizadas).

Ejemplo actual: `Clubes/Argentina/Boca/`, `Clubes/Argentina/River/`,
`Clubes/Argentina/Racing/`. País y club van CAPITALIZADOS (`Argentina`,
`Boca`, `River`, `Racing` — no `argentina`/`boca` en minúscula). Ojo: esto es
distinto del criterio que sigue usando el CÓDIGO del sitio para los
`clubId` (`boca`, `river`, `racing`, siempre en minúscula) — son dos
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

**OJO CON LO QUE SE TRACKEA, que no es lo mismo que lo que se guarda (2026-09-17).**
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

Actualizado (Versión 90 de `index.html`, onboarding de Vélez Sarsfield): para
un PDF escaneado sin capa de texto, antes de recurrir al Read tool sobre
imágenes, instalar Tesseract (`brew install tesseract tesseract-lang`) y
generar la transcripción con `pdftoppm -png -r 300` + `tesseract -l spa
--psm 6` página por página — mucho más barato en tokens, y el OCR de tablas
numéricas resultó muy confiable en la práctica. Ver
`.claude/skills/club-data-mapping/referencia/leer-pdf.md` para el flujo
completo (incluye qué hacer con tablas anchas rotadas 90° en el escaneo, y
cómo verificar los números del OCR fila por fila antes de cargarlos).

**En el onboarding con el pipeline, la transcripción (etapa 2) la corre `tools/pipeline.mjs`, que además la valida (desde la Versión 529 hace solo eso; `--sin-jev` se acepta y no hace nada): ver el
skill `club-or-year-onboarding`.** Lo que sigue describe los motores que usa por dentro y el camino para un PDF suelto.

**ACTUALIZADO OTRA VEZ (Versiones 244-248, 2026-09-26): el DEFAULT para transcribir en volumen ya
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

**Los pasos 1 y 2 corren solos `tools/check-transcripcion-fidelidad.js` (to-do 90) sobre cada `.md`
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
los datos que se vayan a cargar a `<club>RevenueLinesByYear`/
`<club>ExpenseLinesByYear`/etc. (ver `data/ar/river-data.js` para el shape, el
mismo que usan todos los clubes incluida Boca desde la Versión 102), y para
cualquier experimentación de formato que pida Guido más adelante sobre ese
mismo documento.

### Trampas de PDF y de grep

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
  si el PDF trae bytes NUL en sus metadatos** (encontrado en la transcripción
  masiva de la Versión 156/157, con PDF de clubes chinos generados por
  PDFsharp: el campo `Producer` arrastra restos de un string UTF-16 de
  Windows sin convertir, con bytes `\0` de por medio). `grep` detecta esos
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
  contenido real** (encontrado transcribiendo `Clubes/Ucrania/Kolos Kovalivka/kolos-auditor-
  info-adicional-2025.pdf`, Versión 214): el PDF tenía capa de texto, pero sus fuentes eran
  Helvetica/WinAnsi no embebidas y sin mapa ToUnicode (confirmable con `pdffonts`), así que
  `pdftotext` devolvía caracteres latinos sin sentido (`TOB (AyAI4TOPCbKA`) en vez del cirílico real
  (`ТОВ «АУДИТОРСЬКА»`). La señal: si el idioma esperado del documento es no-latino (cirílico,
  griego, etc.) y `pdftotext` devuelve caracteres latinos, no asumas que "no tiene texto que
  aportar" ni that el documento está en otro idioma — es mojibake. Tratarlo como escaneado (OCR con
  Tesseract, en el idioma real del documento) en vez de confiar en esa capa de texto rota.
