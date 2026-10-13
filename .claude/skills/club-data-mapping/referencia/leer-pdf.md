# Leer un PDF fuente difícil: escaneos, tablas rotadas, filas acumuladas

Cómo medir si un PDF tiene texto, enderezar escaneos torcidos o rotados, OCR con Tesseract, y qué hacer con un subtotal que no concilia. Leelo solo cuando el PDF es escaneado, no tiene capa de texto o una fila no concilia.

## Antes de asumir que un PDF es fácil de extraer, medilo

No asumas que los PDFs de un club tienen texto extraíble porque fue cierto para los años ya cargados: verificalo por documento con
`pdftotext archivo.pdf - | wc -c` dividido por la cantidad de páginas (`pdfinfo archivo.pdf`). Si da ~1 char/página es un escaneo
sin capa de texto (una nota decía "todos estos PDFs tienen texto extraíble" y era cierto para 3 de 24 documentos). Re-verificá
siempre contra el archivo real.

## Leer un PDF fuente: texto nativo vs. imagen, y cómo enderezar un escaneo torcido

Probá `pdftotext -layout archivo.pdf -` primero: si devuelve texto real, es MUCHO más barato que renderizar páginas como imagen. Si
da vacío o basura, es un escaneo puro (el registro por documento de Racing está en `Admin/sourcing/Argentina/Racing.md`, índice en
`Admin/sourcing/_indice/Argentina.md`). En volumen el default no arranca acá: es `tools/mistral-ocr-transcribe.mjs` y
`tools/gemini-transcribe.mjs` desde la terminal de Guido (ver `Admin/PIPELINE.md`, "Documentos fuente"). Lo de esta sección y de la
de "PDF escaneado sin capa de texto" (más abajo) es para cuando una página puntual cae en una sesión.

**Escaneo inclinado en diagonal**: leer así arrastra error hacia los bordes, y crece hacia la columna de totales (el borde
derecho), donde más importa. Ejemplo: en `Clubes/Argentina/Racing/presupuesto2019-20.pdf` la fila "9.- Cobros de otros recursos de
gestión por fútbol" se leyó como 634.152.050 cuando el valor real (confirmado por Guido) era 18.000.000: se estaba leyendo la fila
de ABAJO ("B. Ingresos Sociales") por el corrimiento acumulado.

Receta (deskew), no hay herramienta armada en el repo, es un script ad-hoc de Python por documento:
1. Renderizar a alta resolución: `pdftoppm -r 300 -f N -l N archivo.pdf pagina`.
2. Con Python/PIL, probar ángulos pequeños (-2° a +2°, pasos de 0.1°-0.2°) y para cada uno calcular la VARIANZA de los promedios de
   brillo por fila de píxeles (`np.array(img.convert('L')).mean(axis=1).var()`).
3. El ángulo con la varianza MÁS ALTA es el que mejor alinea las líneas horizontales (para `presupuesto2019-20.pdf`, ~0.78°).
4. Rotar ese ángulo (`img.rotate(angle, expand=True, fillcolor='white')`) y releer con el Read tool.

**Caso DISTINTO: tabla escaneada en landscape "acostada" dentro de una página portrait** (`presupuesto2018-19.pdf`, págs. 8-9,
Ingresos/Egresos). La imagen no está inclinada: está rotada 90° entera (una planilla ancha con rubros + 12 meses + Total, guardada
como página vertical). Se lee en un orden RARO: la fila "Total"/"Subtotal" de cada bloque aparece ANTES que su desglose. Señal de
alerta: una tabla escaneada que se lee con el TOTAL primero y el detalle debajo. Arreglo: renderizar la página y rotar 90° exactos
con `img.rotate(90, expand=True)` (o `-90`; el correcto deja los rubros leyéndose de arriba hacia abajo a la izquierda y los meses
como columnas hacia la derecha, con "Total del Período" al final). Si además está inclinada, rotar primero 90° y recién después
medir el ángulo de deskew.

## La "fila acumulada": un subtotal impreso puede incluir OTRAS líneas separadas, no solo sus hijos visuales

Ejemplo (`Clubes/Argentina/Racing/racing-presupuesto-2019-20.pdf`, fila "2.- Cobranzas por participación"): el documento imprimía
606.734.000, pero sus sub-ítems visibles (d+e+f, indentados debajo) sumaban 274.780.000, con una diferencia de 331.954.000. La fila
no era un subtotal de sus hijos visuales sino un ACUMULADO que TAMBIÉN suma otras 2 líneas listadas por separado más abajo ("3.-
Cobranzas por abonos estadio" y "4.- Cobros por retransmisión"): 274.780.000 + 123.154.000 + 208.800.000 = 606.734.000, exacto.
Cargar 606.734.000 como valor propio de la fila hubiera CONTADO DOS VECES los ítems 3 y 4, que ya se cargan como líneas
independientes. Criterio correcto: cargar el valor NO acumulado (274.780.000, la suma de sus propios hijos).

Señal de alerta genérica: si una fila con sub-ítems visibles no reconcilia contra la suma de esos sub-ítems, Y la diferencia
coincide (exacta o casi) con el valor de OTRA fila del mismo documento, es un acumulado que incluye esa fila, no un error de
transcripción ni un dato a elegir. Antes de cargar una fila así: sumar sus hijos visibles, compararlos con el valor impreso y, si no
cierra, buscar qué otras filas explican la diferencia. Si no hay explicación clara, preguntarle a Guido con la especificidad de la
sección 11 de `SKILL.md`, sin elegir un criterio unilateralmente.

## PDF escaneado sin capa de texto: OCR con Tesseract y cómo verificarlo fila por fila

Este es el flujo para cuando una transcripción cae en un subagente (por ejemplo, Gemini rechaza el documento por `RECITATION`). El
default en volumen son las APIs externas (sección "Leer un PDF fuente", arriba). Confirmá primero con `pdffonts`/`pdftotext` que no hay capa de texto, antes de
renderizar imágenes con el Read tool (mucho más caro).

1. Instalar Tesseract si no está: `brew install tesseract tesseract-lang` (el segundo trae los idiomas; sin él solo reconoce inglés).
2. Renderizar: `pdftoppm -png -r 300 archivo.pdf page` (300 dpi alcanza para A4; con páginas físicamente más chicas, subir a
   450-900 dpi, o el OCR sale con ruido).
3. OCR: `tesseract page-NN.png out -l spa --psm 3`. `--psm 3` (segmentación automática) salió mejor que `--psm 6` sobre ~5.000
   páginas: en tablas con más de una columna de totales `--psm 6` se comía filas "Total", y en layouts complejos (balances
   publicados como aviso legal dentro de una página de diario) mezclaba columnas. `--psm 6` es la opción a probar si una página
   puntual sale peor con `--psm 3`.
4. Armar el `.md` como con `pdftotext` (separadores `--- pág. N ---`), con una nota en el encabezado aclarando que es OCR y que los
   números se verifican aparte. Transcribir ANTES de extraer datos sigue siendo obligatorio.

**Tablas anchas (6+ columnas, como el Anexo III de Vélez) muchas veces vienen ROTADAS 90° dentro del PDF escaneado.** El OCR sale
ilegible (basura sin estructura) si no se corrige primero. **Tesseract detecta el ángulo solo** (OSD, menos de 1 segundo por página,
confiable sobre ~5.000 páginas): `tesseract page-NN.png - --psm 0` devuelve `Rotate: N` (0/90/180/270, ángulo horario para
enderezarla) más una confianza. Rotá con `Image.open('page-NN.png').rotate(-N, expand=True, fillcolor='white').save(...)` (negativo
porque PIL rota antihorario) y recién ahí corré el OCR normal. Conviene correrlo SIEMPRE antes de OCRear cada página: un `Rotate: 0`
con confianza alta no cuesta nada y detecta rotaciones que a simple vista no se notan. Si la página es de tamaño reducido, subir el
DPI (900 en vez de 300-450) ANTES de rotar.

**Caso real de lo que cuesta no chequear la rotación (River 2024, Anexo VIII, matriz de 30 conceptos x 8 áreas, páginas 59-62).**
Una sesión encontró "diferencias no explicadas al sumar celdas individuales" y dejó sin transcribir la matriz (la decisión de no
publicar cifras dudosas fue correcta; el diagnóstico no). Las 4 páginas estaban rotadas 90°; `--psm 0` lo muestra en 3 segundos
(`Rotate: 90`) y, rotando y re-OCReando, las filas salen limpias y **reconcilian exacto** contra su total impreso. **Si las celdas
de una tabla escaneada no reconcilian, chequeá la rotación ANTES de concluir que el OCR no sirve**: una matriz que no cierra por
rotación se ve igual que una que no cierra por mala calidad de escaneo.

**Verificación: usá la columna "Total <año>" impresa de cada fila, no reconstruyas sumando las columnas de sector.** El OCR tiene
más ruido en las columnas angostas intermedias (ej. "1.088.197" en vez de "7.088.197") que en la columna ancha de fútbol
profesional o en el total de fila. Para cada línea de gasto, tomá SOLO la columna Fútbol Profesional (para separar `wages_squad`) y
la columna Total del año (para todo lo demás). Después, la SUMA de las columnas "Total <año>" de un Anexo tiene que cerrar EXACTO
contra el total impreso de ese Anexo (el mismo del Estado de Recursos y Gastos): si no cierra, hay un dígito mal leído en alguna
fila; recorrelas hasta que cierre. En la práctica, Vélez 2016 cerró exacto sin ajustes; 2015 y 2017 cerraron con $40-50 mil de
diferencia sobre cientos de millones (~0,00001%), muy por debajo de la tolerancia de `verifyTieOuts()`: aceptable.

**Pista sobre `verifyTieOuts()`**: el check de "Expenses" compara `Math.abs(computed.expenses + computed.nonCash)` contra el oficial
(combina primero y después el valor absoluto). Si el crédito de "reclasificación" de un ejercicio (Costo de desarrollo de jugadores
propios) es MÁS GRANDE que la amortización real de plantel, `nonCash` neto da positivo. Si un ejercicio nuevo no cierra en
"Expenses" por una diferencia grande y sospechosamente redonda, revisá primero si `nonCash` neto se volvió positivo antes de
asumir que el dato de carga está mal.

## Documento transcripto con Mistral OCR: verificar a mano cada cifra

Es el punto 6 de la verificación de la sección 6 de `SKILL.md`.

6. **Si el `.md` empieza con la advertencia "ESCANEADO, TRANSCRIPTO CON MISTRAL OCR"**, el chequeo 1-5 NO alcanza solo: verificá a
   mano contra el PDF cada cifra que vayas a cargar. En una celda dañada o tapada por sombreado, Mistral devuelve un TOTAL mal leído
   con la misma confianza que uno bien leído, sin marcarlo `[ilegible]` (Llaneros 2016). Si el tie-out contra un total de otra
   fuente independiente cierra, confiá; si el "total conocido" sale del mismo documento, que cierre solo no alcanza. Borrá la
   advertencia del `.md` una vez verificado.
