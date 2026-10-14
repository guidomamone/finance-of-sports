# HALLAZGOS del pipeline: lo que se midió y no entró

Ideas que se probaron con casos reales y se descartaron, con el porqué, para no volver a probarlas. Una línea por hallazgo; el
detalle de cada medición está en `Admin/CHANGELOG.md`. El proceso vigente está en `Admin/PIPELINE.md`.

- **Compilar el vocabulario agrupando los límites de palabra** (to-do 224): los términos consecutivos con los mismos límites bajo un solo
  `(?<!…)(?:a|b)(?!…)` bajan la importación de `vocabulario.mjs` de 277 a 133 ms por proceso (~17 s en un lote de 87 documentos), pero
  probar que todas las expresiones dan lo mismo compilando las dos versiones se quedó sin memoria. Ganancia chica sin prueba barata: no entra.
- **Elegir filas por palabras clave** (la etapa vieja): reproduce los ingresos ya cargados en 7-11% de los años. Por eso existe el proceso nuevo.
- **Cerrar sola la duda sobre un cuadro que la carga no usa** (to-do 211, parte b): en la cola de Grecia se equivocaba en 6 de 26 dudas
  (Asteras 2020-2023: la nota por naturaleza no se usaba como desglose de un renglón pero suma un GRUPO de renglones, y Guido dijo que va).
  Haría falta probar que el cuadro no suma ni un renglón ni un grupo. Y juntar dudas "por cuadro" con líneas superpuestas o un bloque en
  común junta preguntas distintas (8 de 18 en Grecia): el cuadro de una duda es su PRIMER bloque. JUNTAR las dos dudas de un cuadro en un
  solo caso (aunque sea el mismo cuadro) escondía una pregunta genuina (Levadiakos 2019: "¿solo?" no, "¿con su continuación?" sí): quedó
  como escalón que solo cierra una duda cuando la respuesta a la otra la contesta.
- **Localizar por páginas enteras:** descartado; un estado puede empezar a mitad de página.
- **Una sola escala por documento:** descartado; la nota puede estar en miles y el estado en unidades (1. FC Köln).
- **Escala por "plausibilidad" contra otros años del club:** inútil con inflación y años en otra moneda (Racing).
- **Heurística de encabezados para el tipo de cambio:** 4 errores en 17 documentos. Se saca.
- **"Las notas por segmento nunca se eligen":** descartada. En UC el desglose de "Ingresos Comerciales" solo está en la nota de segmentos.
  Reemplazo: un cuadro por segmento se usa si la columna de un segmento desglosa un renglón (y tiene que sumar).
- **Cierre de notas sumando todo** (la versión vieja de `verificar.mjs`): contaba dos veces los cuadros de detalle (UC, Betis, Athletic) y
  aceptaba notas que no cerraban por la tolerancia de 0,5% (Chapecoense).
- **Caja y deuda, escalón "cada guion como 0 en su columna"** (`caja-deuda.mjs`, 2026-10-05): `--medir` idéntico en todos los clubes y ningún dato nuevo. Donde el guion daba con qué comparar, la compuerta rechazó con razón: la deuda cambió de renglón entre años (Novorizontino 2020: la fila de 2020 tiene "-" en 2019, que tiene 32,32 cargado; Fortaleza 2023: "-" en el documento 2024). El guion no era lo que frenaba.
- **Caja y deuda, "vecino por importe"** (`caja-deuda.mjs`, 2026-10-05): si ningún vecino tiene la misma familia, buscar el importe exacto (tolerancia del redondeo impreso) en el balance del documento anterior o siguiente. `--medir`: 5 datos nuevos en años cargados, 2 iguales y 3 distintos (Elche 2024 deuda 10,40 contra 13,13; São Paulo 2023 9,83 contra 217,53; Palmeiras 2024 caja 1,33 contra 38,36); además, Novorizontino 2018 deuda = 2 (es 27,51). Emparejar por etiqueta también controla que sea la misma fila; por importe solo controla la lectura, y una fila mal elegida pasa igual.
- **Número citado en el texto como segundo chequeo** (to-do 140(f), 2026-10-05): 84 de 88 años verificados ya tienen un chequeo cruzado ok; los 4 restantes (balancetes de Novorizontino 2010/2013/2014, UC 2009 sin cargar) no citan el total en la prosa. No agrega nada hoy.
- **Coherencia de categoría entre años por etiqueta** (to-do 140(g), 2026-10-05): sin la sección de cada fila da 16 falsos avisos de 18 (Fortaleza: la misma etiqueta en la nota de fútbol y en la de administración); los errores de categoría no volvieron.
- **Sacar los identificadores (CNPJ, CPF, NIT, números de 10+ dígitos sin separador) de la validación gratis del inventario** (`verify-numbers.mjs`, to-do 140(e), 2026-10-05): de los 453 en "revisar", 3 pasan a "listo" (Ituano 2011-2012, Mechelen 2018) y 3 a "no aplica" (Mirassol, que los manda a la segunda voz paga); de los 467 "listo", 4 empeoran a "no aplica" (Mirassol 2025, Remo 2020, Bucaramanga 2025, Atromitos 2016-17). Los CNPJ/CPF de los ejemplos (Vila Nova, Sport Recife) no son lo que traba esos documentos.
- **Resultado final tomado de la columna anterior del documento siguiente** (to-do 140(a), 2026-10-05): en 80 pares de documentos verificados coincide con el resultado verificado 62 de 70 veces (89%); los 8 que no, reexpresiones reales (Juventus consolidado/individual e IFRS, Novorizontino "reapresentado", UC). Y no arregla ninguno de sus 4 casos (Fortaleza CEIF 2017-2019 y 2022): ahí el siguiente no trae la columna anterior en la fila extraída; el número está en la nota de patrimonio ("Resultado Año 2018 | (639,077)"), un formato de un club. Volver solo con un caso nuevo y con compuerta (el número impreso también en el propio documento).
- **Año del nombre: "si el par de años baja, el primero"** (to-do 140(a), 2026-10-05): arregla Goiás ("2017-2016" = ejercicio 2017) y rompe Suduva ("up2021-2020.12.31" = subido en 2021, ejercicio 2020; 14 PDFs). Entró el escalón que decide por las fechas de cierre del .md (Versión 519).
- **"Posiblemente dentro de otro rubro" si la fila tiene plata en ALGÚN otro año del club** (`dentro-de-otro.mjs`, to-do 140(i), 2026-10-05): backtest en años completos, 7,4% de marcas falsas (213 de 2.893; Premios 37%, Educación en gastos 53%, Otras secciones 23%). Entró la versión "en TODOS sus otros balances desglosados, al menos 2": 0,8% (11 de 1.394).
- **Año vecino con el total con el que cerró cada documento** (`verificar.mjs` `compararVecino`, to-do 139, 2026-10-05): del lado de la columna del año en curso, usar `totales.ingresos` (ajustes `fila` incluidos) en vez de releer. Con `prueba-completa` arregla Juventus 2005 y rompe 2003 y 2004: los ajustes de los documentos italianos viejos pasan las plusvalías extraordinarias a ingresos solo en la columna propia, y la columna anterior del vecino sigue sin ellas. Los "NO" pasan de 7 a 7.
- **Caja y deuda, "si la columna tiene importes, la cifra no es nota"** (`caja-deuda.mjs`, to-do 143, 2026-10-05): cambiaba 7.627 filas del corpus; rompía Novorizontino 2023 (fila sin celda de nota que corre las columnas) y leía mal Molde, Rio Ave y Standard ("18/26", "6; 21" y los códigos belgas "170/4" pasaban por importes). Con solo separador de miles y filas parejas, 4.816 filas y seguía mal en Aalesund 2012 y Brann 2025, donde la transcripción mezcló la columna "Note" con una de importes: con la tabla sola no se distingue. Entró solo la columna de notas inequívoca (Versión 513).
- **Caja en las notas** (`caja-deuda.mjs`, 2026-10-05): si el balance no tiene fila de caja, proponer la única fila de caja de las notas. En su propio caso (Fortaleza 2020-2022) propuso 2.483 / 5.073 / 2.152: la fila "Caja" de la nota de efectivo (caja chica, una parte del efectivo; el efectivo es "Efectivo" 20.036 en 2021) y con la escala corrida. Pasó la compuerta porque cada año se comparó contra el anterior que la misma corrida acababa de aceptar.
- **La lectura 5 con TODOS los ajustes `fila` del financiero, como REGLA de la lectura 5** (to-do 156 B, medido 2026-10-07 sobre los
  57 de Italia): arregla Inter 2024-25 pero rompe Roma 2018, que hoy carga 68 líneas por una lectura con notas; con el ajuste de terzi
  dentro de la lectura 5, esa gana (no usa totales), la carga baja a 15 líneas y `cargar.mjs` deja de cerrar el resultado. Para Inter alcanza
  como escalón aparte que corre solo si ninguna lectura cerró el resultado (Versión 581).
- **Abrir con la nota del subtotal todo renglón de ingresos de 20% o más** (to-do 175, escalón 2, medido 2026-10-08 sobre 98 de Italia):
  cambiaba Atalanta 2022/2024 y Genoa 2022 (cargados), cuyo estado ya viene desglosado en ~9 renglones y la nota reparte distinto (Atalanta
  2024: TV 107,5 -> 101,8 M; Genoa: el paracadute pasaba a "contributi"). Entró con el grupo de 3 renglones o menos como condición.
- **Disparar el escalón de la sección D con "el resultado no cerró exacto"** (to-do 166, 2026-10-08): con las notas en miles la tolerancia
  exacta (media unidad por fila) tapa una D chica (Como 2024: 8.695 dentro de ~20 mil). Entró con un gatillo estructural (el encabezado de la D
  impreso). Y sin ese encabezado movía 10 Juventus IFRS, cuyas filas sin lado en esa zona no son la D.

## 2026-10-08, dos trampas que costaron una corrida

- Una respuesta "no" de la cola a una duda de extraer ("¿se cargan las filas de la nota b41?") NO saca filas que la extracción ya trajo: queda como nota y las filas siguen entrando. Para sacarlas se usa un ajuste `fila`
  con `--reemplaza-linea` sobre el renglón del estado (el ajuste lo deja entero y se lleva las hojas de su nota). Caso: Inter 2018-19, nota b41 "Capitalizzazione costi vivaio" (ingreso 7.147.379).
- Un ajuste `categoria` sobre filas que la extracción dejó sin lado (`otro`) las MUDA de lado conservando el efecto en el resultado: una fila de +7.147 que en verdad es parte de un ingreso pasaba a ingreso de −7.147 y el resultado
  quedaba 14 M corrido. Si las filas son el detalle de un renglón, se arregla el renglón (ajuste `fila`), no cada fila.
- Escalón "el total repite sus componentes" (to-do 187a, medido y descartado el 2026-10-08): en la rama `filaTotal` de `ajuste()`, si las líneas de afuera de la fila total (al menos 3) suman el total
  con 1% más el redondeo, descartar la fila total. Medido en los 242 documentos con verificación (con los ajustes manuales ya puestos): solo cambia Fiorentina 2023-24 (pasa de la lectura 5 a la 4,
  con los totales cerrando), y la columna anterior que lee el chequeo del año vecino pasa de 228,7 a 428,7 M (los dos fallan contra los 243,0 M del documento siguiente). No toca Lazio 2016 ni su
  vecino 2017: ese chequeo lee la columna anterior por otro camino (`ingresosConLectura` y `lineasDeLado`, no `ajuste()`), que es donde se duplica el total. Antes de los ajustes manuales (copia
  del 2026-10-08) cambiaba Lazio 2005, 2011 y 2016 y 2011-12, pero ya no hay documento al que sirva.
- **Ajuste `fila-anterior`** (to-do 189 paso 2, medido por un Sonnet el 2026-10-09): un importe de la columna del año anterior cargado a mano, solo para el chequeo del año vecino.
  Cerraría 16 chequeos falsos de Sampdoria 2020-21 e Inter 2019-21 (filas que la extracción no trajo de esa columna: Sampdoria L888 1.779.291; Inter L640 27.574.094 y
  L642 16.802.772). Descartado por Guido: son alarmas aceptadas en la cola, sin daño en los datos.
- 2026-10-09 (Versión 640, `--solo`): medir un cambio de `lote.mjs` solo con el ENSAYO no alcanza: las líneas que tocan el registro después de pagar (resolver, re-transcribir, etapa 7) corren solo con `--ejecutar`. El comentario agregado en esas 3 líneas se tragó `registro = leerRegistro()` y el ensayo de `prueba-completa` dio idéntico; se vio leyendo el diff. Para un cambio en esos caminos: leer el diff línea por línea y, si se puede, simular con `--ejecutar` sobre una copia.
- 2026-10-10, to-do 199 patrón C (subtotal que suma renglones de cualquier lado, Avaí 2021): no entró. Solo no cierra Avaí (falta el signo
  del financiero según su bloque) y cambia Ferroviária 2012 (agrega una fila "Sócio torcedor" en 0). Medido en las 306 verificaciones.
  (Resuelto después como último escalón de la escalera: ver CHANGELOG, Versión 669.)
- 2026-10-13, to-do 223, A/B de la compuerta de `caja-deuda.mjs` con dos lecturas por fila: la versión con VOTOS (año cargado 3, flujo de
  efectivo del mismo documento 3, documento siguiente 2, documento anterior 2; hacen falta 3 y ninguno en contra) no entró. Sobre lo cargado:
  deuda 48 -> 37 iguales, caja 106 -> 94 (el documento siguiente solo ya no alcanza) y el flujo de efectivo no sumó ningún caso. Con chequeos
  exactos, los votos no agregan nada. Tampoco entró el documento anterior votando EN CONTRA: frenaba 7 valores bien cargados (Novorizontino
  2023 reexpresado, Tottenham y Fluminense 2025 con otra escala, Ceará 2025 y Católica 2016 con otra fila); quedó solo a favor.
- **extraer.mjs, "salida corta"** (to-do 230, 2026-10-14; no entró): la IA devuelve `etiqueta: null` cuando es la primera celda de su línea y
  `detalla_linea` en vez de copiar la etiqueta, y el script las completa desde el .md. Medido sobre `prueba-mediana.txt` (34 documentos):
  US$ 5,82 → 4,84 (−17%; salida 258.827 → 210.037 tokens, menos que el −33% del conteo, porque la IA siguió escribiendo más etiquetas de
  las previstas). Pero la carga cambió en 17 de 34 documentos: las etiquetas difieren en el 15,2% de las filas (contra 3,5% entre dos
  corridas con el código de hoy). 220 de esas filas son de Universidad Católica, cuyas tablas están transcriptas como TEXTO, sin `|`: la
  "primera celda" era la línea entera con los números, y la compuerta (que tenga letras) la dejaba pasar. El resto (129, 5,6%) son
  etiquetas que la IA escribe distinto cuando no tiene que copiarlas. El código medido quedó afuera del repo.
- **Ruido de extraer entre corridas** (2026-10-14, misma medición): con el código de hoy, rehacer extraer sobre los mismos 34 documentos
  cambió la carga en 6 (Goiás 2013, Novorizontino 2013, UC 2010, Fortaleza 2019, 2021 y 2025) y el 3,5% de las etiquetas. Cualquier
  medición de "lo cargado idéntico" que rehace extraer tiene que compararse contra este piso, no contra cero.
- **Aviso de un año que queda fuera del lote (to-do 232 q, 2026-10-14)**: sin compuerta avisaba 24 documentos en el lote 71 (informes del
  auditor y del directorio de años que la lista ya cubre); con la del ejercicio no cubierto, 2 (los dos con el cierre mal leído por
  `periodo.mjs`: el acta de Aris del 2021-01-30 y el informe del directorio 2015-16 de Atromitos). No avisa un documento sin cierre
  identificado (Atromitos_audit_2016-17, confianza baja): un escalón para esos (el año del nombre del archivo, por ejemplo) no se midió.
- **Período corto en `periodo.mjs` (to-do 232 i, 2026-10-14)**: la primera versión del escalón 2b (rango con inicio que no es día 1 y
  menos de 12 meses) cambiaba 30 documentos de 2.713, la mayoría fechas sueltas de un título ("31/12/2023 31/12/2023"); exigir un
  separador de rango los bajó a 9, y exigir que sea el único rango del ejercicio sacó a Lazio 2003-04 (tramos de gestión A y B, cargado
  como anual) y a la memoria 2020-21 de Barcelona. Quedaron 7, todos períodos cortos de verdad.
- **Etiqueta repetida bajo dos renglones (to-do 232 h, 2026-10-14)**: con "renglones distintos" a secas, 9 documentos de prueba-completa
  que cargaban pasaban a la cola (~60 preguntas, 34 en Fortaleza 2017, cuyas notas son "Total Gastos de Administración" y "Total Gastos
  de Ventas", sin categoría en el .categorias.json). Quedó "dos renglones de categoría CONOCIDA y distinta": 79 idénticos, cambia solo PAOK.
  Además `mismoPadre()` (tools/padres-filas.mjs) no veía letras griegas ni cirílicas y daba "misma nota" a cualquier par de títulos griegos.
- **Colores y ligas de Grecia (to-do 232 p, 2026-10-14)**: las ligas ya estaban cacheadas (`tools/club-league-reference/gr.json`: Super
  League y Super League 2, 2016-2025). Los colores no se pueden cachear: footylogos.com/color-codes trae solo 9 ligas (Bundesliga,
  Eredivisie, LaLiga, Liga MX, Liga Profesional Argentina, Ligue 1, Premier League, Serie A, Brasileirão A) y ningún club griego. El color
  de un club griego sigue el proceso a mano de `club-or-year-onboarding/club-nuevo.md`.
- **Trampa del cero en caja-deuda (2026-10-14)**: con la compuerta nueva (filas que suman 0 no pasan), --medir sin Jev ni IA baja deuda
  de 56 a 53 iguales: los tres "iguales" eran ceros publicados que salían de filas en 0 (Once Caldas 2022-2023, PAOK 2021). El de PAOK 2021
  era un error del sitio (deuda 0; el préstamo de 8,9 M pasó a corto plazo, L431), y con la IA guardada la compuerta propone 8,9.
- **Achicar el texto de perimetro-a2 (to-do 232 e, 2026-10-14, US$ 4,64)**: un solo renglón de texto debajo de los títulos sin tabla y la
  portada sin la advertencia de OCR (−27% de texto; Olympiacos 2018 de 101.226 a 72.326 caracteres). Medido en
  Admin/mediciones/perimetro-a2-medicion.txt contra el resultado anterior: 7 decisiones correctas ("individual") pasan a cola (Avaí 2021 y
  2024, PAOK 2023 y 2025, Sandefjord 2010, Novorizontino 2025, OB 2021: Claude señala como estado una línea que no es un título con tabla)
  y 2 de la cola pasan a "consolidado" en FC Groningen, que es individual (error). No entra; salida en
  Admin/mediciones/perimetro-a2-medicion-recorte-232e.txt. El contexto alrededor de los títulos le sirve a Claude para ubicar el estado.
