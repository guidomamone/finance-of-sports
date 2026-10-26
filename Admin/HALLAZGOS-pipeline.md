<!-- md: lo que se midió y no entró al pipeline, con el porqué | leer: antes de proponer una mejora al pipeline, por grep -->
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
- **Compuerta del total de deuda financiera impreso** (to-do 262, caja-deuda.mjs, 2026-10-17): de 748 años con deuda cargada, solo 44
  imprimen un rótulo de total ("Totale passività finanziarie", "Total financial liabilities", "Totale indebitamento finanziario"...) y en
  12 no coincide con el sitio (otra definición: ESMA en Roma 2021 y Lazio 2021-2026; Juventus 2012-2015 y 2025). Contra los 13 distintos
  arreglaba 1 (Milan 2018) y dejaba sin decidir 4 aciertos (Juventus 2012-2015); Bologna imprime el total partido en dos y Genoa no lo
  imprime. Entró en su lugar el diccionario italiano (obbligazioni, soci per finanziamenti: 164 → 168 iguales, 13 → 11 distintos).
  Sumar "debiti verso altri finanziatori" (factoring) metía un error nuevo: Monza 2024, 13,5 M contra 0.
- **Jev antes de Claude en perimetro-a2** (to-do 233, 2026-10-17): misma entrada y mismas preguntas en opción cerrada (líneas), con la misma
  compuerta. Sobre los 176 documentos de `perimetro-a2-lista.txt` decidió 23: 21 bien y 2 MAL (Ferroviária dre-2022 y dre-2023: tomó el
  "CONSOLIDADO" del membrete del sistema contable, L9, como título y texto del estado; Claude, con la instrucción del membrete, da
  individual). De los otros, 121 no entran en la API (máximo 255 opciones por pregunta) y 29 sin estado. Revertido (código en el commit
  70c91b6f3, medición en `Admin/mediciones/perimetro-a2-jev-medicion.txt`). Lo que enseñó: Jev sirve para opciones cerradas y cortas sin
  matices (filas del balance en caja y deuda), no para criterios con trampas que hay que explicarle.
- **Sonnet en vez de Opus en perimetro-a2** (to-do 288, 2026-10-18, US$ 13,82 entre las dos corridas): misma entrada y misma compuerta,
  contra el ajuste `perimetro` de 202 documentos (`Admin/mediciones/perimetro-a2-verdad-ajustes.tsv`). Opus: 119 bien · 2 MAL · 81 cola;
  Sonnet: 83 bien · 5 MAL · 114 cola. Sonnet mete 4 errores que Opus no tiene (Rapid Wien 2017-18, 2019-20 y 2023-24 y Trabzonspor
  2021-22: "individual" donde el ajuste dice consolidado) y manda a la cola 36 que Opus decidía bien (casi todo Sandefjord). No entra: A2 sigue
  en Opus. El flag `--modelo` queda para volver a medir. Mediciones: `Admin/mediciones/perimetro-a2-opus.txt` y `perimetro-a2-sonnet.txt`.
- **Sonnet en vez de Opus en localizar** (to-do 288, 2026-10-18, US$ 3,97, `prueba-mediana`): de 77 documentos comparables, los bloques del
  estado de resultados son los mismos en 76 de 76 (Torino 2020 es a mano), pero las notas de ingresos o gastos cambian en 45 (agrega o saca
  un bloque; Estoril 2021-22 suma b47 y b48 a gastos, Chaves 2021-22 saca b48) y el perímetro pasa a "no se sabe" en 7. Sin extraer y
  verificar no se sabe cuál acierta, y el ahorro es ~US$ 0,025 por documento: localizar sigue en Opus (decisión de Guido). Para retomarlo,
  extraer + verificar con `.ubicacion.sonnet.json` en esos 45. Comparación: `Admin/mediciones/localizar-opus-vs-sonnet.txt`.
- **Sonnet en vez de Opus en extraer** (to-do 288, 2026-10-18, `prueba-rapida`, 44 documentos; Opus otra vez US$ 7,44 y Sonnet US$ 3,35):
  verificar con cada juego de filas contra lo cargado (los 2 `filas-a-mano` no se miden). Opus nuevo: 21 cargan igual, 8 cierran con otra
  carga, 13 a la cola con los MISMOS totales (dudas nuevas sin respuesta en la cola), 0 con otros totales. Sonnet: 15 igual, 9 con otra
  carga, 8 a la cola con los mismos totales y 10 a la cola con OTROS totales (lee mal importes o filas). No entra: extraer sigue en Opus.
  Lo que enseñó: repetir la extracción con el mismo modelo ya cambia 8 cargas de 42 (el piso de variación es alto: cualquier cambio de
  extraer se mide contra una segunda corrida, no contra lo cargado). Mediciones: `Admin/mediciones/extraer-verificar-cargado-vs-*.txt`.
- **Sonnet en categorizar**: ya medido antes (`Admin/mediciones/test-categorizar-claude.md`, 259 rubros: 74,9% contra 81,1% de Opus, peor
  calibrado); en el cierre del to-do 288 (2026-10-18) no se volvió a medir. Sigue en Opus.
- **Stirling PDF en vez de Mistral para escaneos** (to-do 314, 2026-10-20, US$ 0): en seis escaneos con filas ya cargadas lee 83 a 94% de las
  cifras en cuatro (los tres noruegos y Ferroviária; Tesseract pelado da 24 a 59% en los noruegos) y 3 a 4% en las páginas dadas vuelta de Sporting;
  Mistral da 100%, pero ese techo está inflado porque las filas cargadas salieron de su mismo `.md`. Con una lectura local de respaldo, Mistral
  se ahorraría en 0 de 6 documentos (0 de 10 en la muestra ampliada: Stirling halla de 52 a 90% de las cifras que Mistral leyó). No entra.
  Retomar con documentos sin `.md` de Mistral y con totales oficiales, para sacar el sesgo. `Admin/mediciones/stirling-vs-tesseract-vs-mistral.md`.
- **Una voz local (Tesseract) como respaldo de cifras en escaneos** (to-do 298 x2, 2026-10-20, US$ 0): respaldaría ~22% de las páginas de escaneo
  sin error (39 de 178; ~US$ 10 de ~US$ 48 de segunda voz sobre los 317 escaneos pendientes) pero daría por buena por lo menos 1 de cada 82
  páginas con error real (1,2%); la cascada de `tools/chequeos-gratis.mjs` tiene 0 escapes. No entra. Retomar si el gasto de la segunda voz
  en escaneos pesa más y hay un OCR mejor: repetir con una muestra mayor, sin tocar la compuerta. `Admin/mediciones/x2-voz-local-escaneos.md`.

- **Segunda fuente de una liga en grupos** (`segunda-fuente-liga.mjs`, to-do 358): la Super League 2 griega 2025 (RSSSF `grk2025`, grupos Voreios y Notios de 10) y la Liga 3 portuguesa 2023 (`port2023`, séries A y B de 12) frenan en la compuerta, bien: la tabla que lee el script es la del primer grupo y trae la mitad de los equipos de Wikipedia (10 de 20, 12 de 24). Los dos clubes que el aviso `liga-una-fuente` nombra (AE Larissas 2025, FC Felgueiras 1932 2023) están, revisado a mano, en la primera tabla de su grupo. No se relaja la compuerta: un parcial que pasa es el error que la regla evita. Se retoma si `audit.js` suma una liga con grupos sin segunda fuente (hoy 2 avisos `liga-una-fuente`): el escalón sería juntar los grupos de la sección y comparar la unión contra Wikipedia.

- **El chequeo del iXBRL como freno en el perímetro consolidado** (`ixbrl-resultado.mjs`, `cargar.mjs`, to-do 352): se queda como aviso. Medido con `tools/medir-ixbrl-consolidado.mjs`: de los 317 XHTML, 37 traen un `ProfitLoss` con el eje de grupo y solo Burnley 2024-25 está cargado (coincide exacto); ningún año consolidado con minoritarios, así que no hay con qué saber si un grupo cargaría el resultado atribuible a la matriz y el freno lo frenaría de más. Los 12 XHTML daneses con minoritarios usan otro eje (`ConsolidatedSoloDimension`) que el chequeo no lee (responde solo-matriz, nunca frena). Se retoma cuando la tool imprima «Se puede decidir» (2 clubes o más con un año consolidado cargado y uno con minoritarios), y entonces hay que enseñarle el eje danés.

- **Wikidata como fuente automática de estadio y capacidad** (`tools/dato-publico.mjs`): sobre los 185 club-años que hoy se completan a mano en `tools/contexto-manual.json` (69 clubes), Wikidata da el mismo estadio en 64 de 150 (43 %), otro nombre en 25 (17 %: el estadio cambia de nombre por sponsor o por época) y ningún dato en 61; la capacidad coincide en 31 de 73 (42 %), difiere en 15 y falta en 27; 12 de los 69 clubes no se resuelven por nombre (4 sin entidad, 8 ambiguos). Sirve como CANDIDATO con cita, no como valor: `estadio-sponsor.mjs` lo imprime cuando a un club le falta el estadio, y se confirma contra la página del club. Escribirlo solo, sin confirmar, publicaría un nombre de estadio equivocado en 1 de cada 6 casos. La fundación sí sale limpia (Lierse Kempenzonen: 1943, de Oosterzonen).
- **Segunda fuente de estadio y capacidad** (`tools/medir-segunda-fuente.mjs`, TODO 367; 73 club-años de `tools/contexto-manual.json` con estadio y capacidad manual, 54 con candidato de Wikidata). (1) **OpenStreetMap (Nominatim)** da capacidad en 5 % de los casos (4 de 73): descartado. **Transfermarkt** responde 202 vacío (desafío antihumano): descartado, no se esquiva. (2) **Estadio:** el candidato «confirmado» por el artículo del club coincide con el manual en 70 % (28 de 40); el resto es el mismo estadio con otro nombre de época (SMH Group Stadium era Proact; Swissporarena era thermoplan arena; Vodafone Park era BJK İnönü), por eso el estadio NO se escribe solo. (3) **Capacidad:** Wikidata acierta a menos de 3 % en 59 % (27 de 46) y a menos de 10 % en 67 %; el artículo del estadio en Wikipedia, 64 % (34 de 53) y 74 % (39). Regla «si las dos difieren menos de X %, se toma el artículo»: X 5 % acepta 29 de 73, acierta 76 % a menos de 3 % y 90 % a menos de 10 %; X 1 % acepta 16 (88 % a menos de 10 %); X 25 % acepta 42 (90 %). Subir X suma cobertura sin perder precisión desde 5 %, así que 5 % es el corte (`TOL_CAPACIDAD`). **Límite:** las dos fuentes son de la familia Wikipedia y la referencia manual también salió casi toda de Wikipedia, así que la tabla mide consistencia, no verdad; la confirmación independiente (web del club, federación, informe anual) la hace el agente del paso 3 de `Admin/PIPELINE.md`.

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
- **Un renglón con hijos que se deja en una línea (Onboarding 8, 2026-10-21; caso Girona 2021-23):** necesita un `fila` que reemplaza el primer hijo con el total del renglón y otro `fila` en 0 para cada hijo restante; si no, `verificar.mjs` cuenta la cifra dos veces y el resultado no cierra (ingresos 31,38 en vez de 21,61 M). Al tercer documento de dos clubes pasa a mejora general (sección 8 de `auditoria-finance-of-sports`).

## Conocido, sin daño hoy (no se trabaja salvo que algo cambie)
- **Una fila del impuesto que es un ingreso impreso en positivo (Pipeline 14, 2026-10-21): hoy va por ajuste; al tercer documento de 2 clubes o
  más, escalón.** El esquema italiano trae «proventi (oneri) da adesione al regime di consolidato fiscale / trasparenza fiscale» entre las imposte,
  en positivo cuando es un provento que BAJA el impuesto. verificar.mjs lo suma como costo y el resultado no cierra; y como el escalón «17) resta»
  exige que cierre el resultado entero, el financiero tampoco se corrige. Casos: Genoa 2024 (.md L419, 280.131; total L420 2.253.415 = 1.007.712
  + 1.525.834 − 280.131) y Genoa 2023 (+12.799, con el mismo criterio): un solo club. Hoy se resuelve con un ajuste `fila --lado impuesto --valor
  "-<importe>" --reemplaza-linea <L>`: con él cierra el impuesto, entra el «17) resta» y el resultado da el impreso (Genoa 2024: −38.831.182).
  El escalón medido y revertido (`00d729644d`, `1e5f028b6d`): si las filas del impuesto no suman el total impreso después de ellas, la ÚNICA
  combinación de signos (hasta 6 filas) que lo da, como el 17-bis; sobre los 974 documentos con verificación cambiaba solo Genoa 2024. Retomar
  cuando otro club traiga el mismo patrón (3 documentos de 2 clubes, sección 8 de la auditoría).
- **Brøndby 2025: `ProfitLoss` ambiguo en el XHTML (Pipeline 14, 2026-10-21): es un error de etiquetado del informe, no del perímetro.** Una sola
  entidad (LEI 213800DAZ89VABJPBD93). El estado de resultados está bien: «Årets resultat −130.578 | −104.164», con −130.578 en el contexto
  2024-07-01..2025-06-30 y −104.164 en 2023-01-01..2024-06-30 (18 meses). El estado de cambios en el patrimonio etiqueta las dos filas «Årets
  resultat» con los períodos cruzados: la que sigue a «Egenkapital 1. januar 2023» (−104.164) lleva el período 2024/25 y la que sigue a
  «Egenkapital 1. juli 2024» (−130.578), el 2023/24. El resultado 2024/25 es −130,578 M DKK. `ixbrl-resultado.mjs` ve dos valores sin ejes
  para el mismo período y no compara (lo dice): correcto. Un desempate (preferir el hecho del estado de resultados, o descartar el que coincide
  con un hecho del eje `ComponentsOfEquityAxis`) no se codea por un caso. Retomar si otro XHTML da dos `ProfitLoss` sin ejes para un período.
- **Deuda belga por códigos NBB (to-do 310 parte 2, 2026-10-19): medido, no se hace (Guido).** Union SG 2025: 170/4 = 3,154 M y 42 = 0, pero
  lo cargado es 31,66 M porque incluye los "otros débitos" (178/9 y 47/48), que son catch-alls con préstamos de socios y partidas que no son
  deuda financiera. Una regla por códigos daría 7,62 M, por debajo de lo cargado. La deuda belga sigue por la lectura del documento (IA o ajuste
  con cita). Retomar si aparece un código NBB que separe los préstamos de socios.
- **OH Leuven y los `.md` sin columna de códigos (to-do 310 parte 3, 2026-10-19): cubierto por la parte 1 (Guido).** La caja de un año sin
  vecino ya no depende del código 54/58 sino del balance del documento (tres votos). Si un documento sin vecino sigue sin dato, se ve en
  `caja-deuda --medir`; se reabre solo con un caso concreto.
- **Milan 2018 en `caja-deuda --medir` (to-do 306, 2026-10-19): medido, no se diseña.** El balance de Milan imprime la deuda como títulos
  sin importe ("1 obbligazioni", "3 debiti verso soci", "5 debiti verso altri finanziatori") con las filas "a) entro / b) oltre 12 mesi"
  debajo; el diccionario solo ve "4 debiti verso banche" (1,21 M contra 164,27 M cargados). Es el único club italiano con ese formato (9
  documentos de Milan). Aunque las filas hijas heredaran el título del padre, daría 127,73 M: los 36,54 M de "altri finanziatori" (factoring)
  quedan afuera a propósito (to-do 291). Riesgo: la compuerta del documento siguiente dejó pasar los 1,21 M porque el año vecino repite el
  defecto. Retomar si se carga otro año de Milan o si se resuelve el 291 (¿el factoring es deuda?).
- **Achicar el texto del paso A2 del perímetro (to-do 232 e, 2026-10-19): medido, no se prueba.** A2 costó US$ 40,13 en 709 llamadas
  (8% del gasto de API; mediana 9.300 tokens de entrada, máximo 50.700). Recortar las notas que vienen después del estado ahorraría ~US$ 0,02
  por documento (2-3% del gasto total), y A2 existe para encontrar el estado cuando las palabras no alcanzan: recortar antes de saber dónde
  está ya perdió 7 decisiones y metió 2 errores (2026-10-14). Sonnet en vez de Opus, descartado (to-do 288: 5 MAL de 202). Retomar si A2
  pasa del 15% del gasto de API (`Admin/registros/api/claude-api.jsonl`, tarea perimetro-a2) o si un país nuevo trae documentos de más de
  100.000 tokens.
- **El final del lote lista como frenado un original reemplazado por su -correction (to-do 298 v, 2026-10-19): medido, no entra.** Lo
  escribe cargar-lote.mjs, que lee la lista entera sin la regla de la 298 o de lote.mjs. Hoy no pasa: los 5 originales con corrección del
  lote 92 ya están en documentos-descartados.txt (ok de Guido) y el ensayo de cargar-lote no los lista (41 frenados, ninguno de ellos). Solo
  se ve en la primera corrida de un par nuevo, antes del descarte, y no carga nada mal. Retomar si un país nuevo trae muchos pares
  -correction (ahí: que cargar-lote aplique la misma compuerta que lote.mjs y los cuente aparte).
- **Extraer con 0 filas no avisa por qué (to-do 298 s, 2026-10-19): medido, no entra.** El caso de origen (Beerschot 2019 -correction,
  columna "Vorig boekjaar" vacía) ya no pasa: con la 298 f, periodo.mjs da el cierre 30-06-2019 sin el ajuste `cierre` y la localización toma
  la columna del ejercicio (48 filas). Hoy ningún `.filas.json` tiene 0 filas (0 de 720); si aparece uno, la verificación no cierra y va a
  la cola, no se carga callado. El ajuste `cierre` de ese documento sobra pero no estorba. Retomar si un lote deja un documento con 0 filas
  (ahí: que lote.mjs lo diga con la columna y el cierre que usó localizar).
- **La pregunta de perímetro de la carga propone mal (to-do 298 m, 2026-10-19): medido, no entra.** El ajuste del club ya es el escalón 0
  de cargar.mjs (L417): Nõmme Kalju 2022-2024 preguntaron "¿individual como 2025?" porque todavía no tenía ajuste de club; hoy cargan sin
  preguntar. Los 37 casos `perimetro` de la etapa cargar están contestados (29 ya con ajuste); en 22 de 35 la propuesta se corrigió, porque
  toma el año cargado más cercano aunque sea una excepción de un solo estado (Nõmme Kalju 2025, Benfica). Desde la 298 d,
  perimetro-senales fija el perímetro antes de localizar, así que la carga ya no debería llegar a preguntar. Retomar si aparece un caso
  `perimetro` de la etapa cargar con fecha posterior al 2026-10-19 (ahí: que la propuesta ignore los años con ajuste de documento).
- **5 ajustes `fila` que la 298 y ya no necesita se quedan (to-do 298 y4, 2026-10-19; Guido y Onboarding 2).** Fredrikstad 2024 (acta 2025,
  L1064 y L1077) y St. Gallen 2024-25 (L261, L330 y L403). Sin ellos los números dan iguales, pero los dos años frenan: Fredrikstad vuelve a
  abrir "primer-anio" (la respuesta guardada de `primer-anio-ia` está atada a la huella del pedido) y St. Gallen deja el `.categorias.json`
  viejo por huellas. Se quedan porque destrabarlos cuesta más que lo que limpia. Sacarlos solo si alguna vez hay que recargar esos años por
  otro motivo (y ahí correr `primer-anio-ia --ejecutar` y la etapa 5).
- **Paso A de perimetro-senales en estonio (to-do 298 d, 2026-10-18): probado, no entra.** Con "Kokku tulud" como total, los números
  "1 922 401,00" y "konsolideeritud" como título consolidado, las dos verdades (102 y 202 documentos) dan idénticas, pero los informes
  estonios con dos estados siguen sin voto: su total de ingresos dice "Kokku" a secas, igual que el total del activo, del pasivo y del flujo.
  Sin daño hoy: con el 298 d esos clubes frenan en vez de quedar con el perímetro equivocado. Retomar si se quiere que voten solos (habría
  que tomar el total de cada estado desde las líneas que da A2).
- **Renglones NBB "(+)/(-)" impresos negativos (to-do 298 b2, 2026-10-18): no se reproduce.** El onboarding de Bélgica vio el 631/4 de
  Beerschot 2025 (−64.834) entrar positivo y necesitó un ajuste `fila`. Con el código de hoy (y el 298 b1), Beerschot sin ese ajuste ni los
  de signo financiero da el renglón negativo, abierto por su nota ("Teruggenomen" −8.210 y −56.624, L817 y L820), y cierra con la lectura 5;
  OH Leuven 2025 da el 631/4 y el 635/8 negativos con la lectura 4. La propuesta de cargar.mjs lleva el signo de la verificación (`signoFijo`).
  No se pudo correr la propuesta de Beerschot acá (las categorías tienen que rehacerse con los rubros nuevos). Retomar si un documento NBB
  nuevo vuelve a necesitar un ajuste `fila` de signo para un renglón "(+)/(-)".

Defectos medidos que hoy no afectan ningún dato publicado ni frenan nada. Cada uno dice cuándo se retoma; si pasa, vuelve a `Admin/TODO.md`.
Salieron del TODO el 2026-10-15 (pedido de Guido: hacían ruido en la lista).

Del onboarding de Países Bajos (2026-10-17):
- `pdftotext` pierde las ligaduras en las fuentes Calibri CID ("Ne o-omzet", "ac va", "Toelich ng") en NEC Holding 2023-24, FC Den Bosch
  2022-24 y Fortuna Sittard 2022-24; las cifras están bien y la categorización la hace una IA. Retomar si un rótulo roto frena localizar
  o la categorización (Sparta 2021-22 tenía "w inst-en-verliesrekening" en el título del estado: se unió a mano).

Del to-do 237 (diagnóstico por subagentes Sonnet, 2026-10-16):
- 237 b) Un renglón que junta amortización de pases y depreciación (Moreirense 2022 y 2025) se carga entero a la parte mayor; la parte chica
  es menos del 3% de los gastos. Retomar: otro club con la parte menor de más del 10% de los gastos.
- 237 c) El perfil del club (socios, otros deportes) es por club y no por entidad o ejercicio (Rio Ave). Retomar: un reintento por 0 en
  cuotas o deportes que se dispare (o no) mal en el año de otra entidad del mismo club.
- 237 h) La venta de jugadores en "Outros rendimentos" con nota al pie (Moreirense): ya cargado como player_sales con ajustes. Retomar: un
  segundo club con nota al pie que cambie la categoría de una fila de más del 5% de los ingresos.
- 237 i y j) Un ajuste `fila` con `reemplaza` no alcanza una fila que entra después al abrir la nota en la lectura 5 (Vitória 2022 SAD), y
  un renglón corregido por ajuste ya no se abre con su nota (Alverca 2024). Hay workaround (reemplazar el renglón por sus partes).
  Retomar: un tercer caso donde ese workaround no sirva.
- 237 l, primera parte) verificar.mjs toma el valor absoluto de un ajuste `fila` en la lectura base: una reversión de gasto (Rio Ave 2024)
  va como ajuste de ingreso con valor positivo (mismo efecto). Retomar: un documento donde la reversión no se pueda pasar al ingreso.
- 237 m) La cola repite preguntas por año: el cierre en cadena del to-do 232 d ya las cierra con una respuesta, y 42 grupos de Portugal
  tienen respuestas distintas entre años (no se puede contestar por club). Retomar: la cola de categoría pasa de ~100 casos repetidos.
- 237 p) La etapa 8 preguntando el perímetro con ajuste manual fue una carrera de tiempos (la cola se abrió 5 minutos antes del ajuste);
  el código ya usa el ajuste como escalón 0. Retomar: un caso de perímetro creado después de que exista el ajuste.
- 237 u) Un informe partido en varios PDF (Boavista 2023-24) se resolvió con 3 ajustes `fila`. Retomar: otro año frenado por una nota que
  está en otra parte del informe.
- 237 x) Buscar con la aritmética del estado el dígito mal leído (Santa Clara 2024-25, 12 cifras) es M y riesgo medio para un solo
  documento. Retomar: un segundo escaneo con 5 o más cifras mal leídas sin el cierre ya resuelto.
- 237 ae) Notas como imagen sin transcribir (Porto 2020-21): el año cierra con el estado, faltan solo detalles. Retomar: un año frenado o
  con un renglón grande sin desglose por una tabla en imagen (primero detectar y marcar el .md, no transcribir).
- 237 aj) El id del club en la revisión del alta distinto del de alta-club.mjs: 0 daño hoy (la revisión ya tiene la línea con el id de la
  carpeta). Retomar: un alta frenada por "sin color elegido" teniendo la revisión en la carpeta (buscarla por `carpeta`).
- 237 q, resto) Benfica 2014-15: una fila sin lado después del resultado ("ACIONISTAS DA EMPRESA-MÃE") contada como ingreso y una nota de
  PROVISÕES con el signo del resultado; probar una regla de signo de nota rompía Vitória Guimarães 2021-22. Retomar: un segundo documento
  con nota de signo contrario (mientras tanto, `resultado-final` y ajustes `fila` a mano).
- 237 o) Cerrar sola una duda de escala con propuesta "sí" cuando el chequeo "año anterior cargado" da ok: medido (2026-10-16) con la cola
  vacía en 100 documentos, decidía 36; de las 12 que ya tenían respuesta, 2 se habían contestado "no" (Torino 2024 "¿está en miles?", era
  en euros; Novorizontino 2016). El año anterior confirma la escala que usó la carga, y esa no siempre es la que dice la propuesta. Sin daño
  hoy: esas dudas van a la cola y se contestan. Retomar: si localizar o extraer dejan la escala propuesta como campo (miles / unidades) y
  no solo en el texto de la pregunta; entonces la compuerta compara ese campo con la escala que usó la carga.
- Caja y deuda, mejora 3 (confirmar con el vecino por valor y no por nombre de familia): medida el 2026-10-16. Abierta (caja, deuda,
  todos los escalones) confirmaba errores que el vecino repite: Palmeiras 2024 caja 1,3 M contra 38,4 M cargado (fila mal leída), Sporting
  2007 "caja" de una fila del Cash Flow. Restringida a deuda del escalón 1, no ganaba ningún caso: el que la motivó (AVS 2024) era otra
  cosa, una celda de notas "3;8;9;21;" leída como importe (to-do 260 d). Retomar: si aparecen casos de deuda de escalón 1 que cambian de
  nombre entre años y no los resuelve otra mejora.
- Caja y deuda, precedente por casualidad sin otro año donde probarlo (to-do 260 a y b, 2026-10-17): el precedente contradicho descarta
  las filas que suman por casualidad cuando otro año cargado las desmiente, pero Bahia 2024 (deuda = "Despesas tributárias" +
  "Intangível" + "Outros ativos") no tiene otro año con esas filas y en `--medir` sigue proponiendo 790,7 M para 2025 (cargado 36,8 M).
  Sin daño hoy: 2025 está cargado y `--club` no pisa un valor. Retomar: si un año vacío de un club con un solo año cargado recibe una
  propuesta del escalón 0 con filas que no son caja ni deuda.
- Caja y deuda, "sin año vecino, aceptar si dos escalones coinciden" (reglas y Jev / IA, to-do 260 c, medido el 2026-10-17): 61 casos en
  todo el sitio, pero coincidir en la fila no asegura el número: CRB 2022 y 2023 deuda "1" y PAOK 2017 deuda "9" (referencias a nota),
  Colo-Colo 2023 2.811 M CLP contra 10 M en 2024, cajas de 13 a 529 € (Chaves, Boavista, Porto 2023; esas las ataja el piso). No entra.
  Los clubes de un solo balance (AVS, Boavista, Chaves, Mafra, Tondela, Felgueiras) se cargaron con ajustes `caja` / `deuda` leídos a
  mano. Retomar: si los ajustes a mano de clubes sin vecino pasan de unos 50 por país.
- Caja y deuda, deuda italiana por el esquema del art. 2424 (sección "D) Debiti", ítems 1 a 5 por número, sin vocabulario; to-do 260 i,
  medido el 2026-10-17 con un prototipo): aparece en 107 documentos, pero sin la compuerta mezcla escalas (balance en euros con el estado
  en miles), perímetros (consolidado y capogruppo en el mismo .md), lee mal números pegados (Hellas Verona 2024: 1,8e16) y no sirve en
  los IFRS (Lazio). De 22 deudas ya cargadas coincide en 4; Bologna 2018-2025 tiene cargado solo "debiti verso banche" (2025: 19,36 M
  contra 41,07 M con los cinco ítems). Italia se completó leyendo cada balance (subagentes con cita). Retomar: si entran muchos balances
  italianos nuevos con el esquema 2424 y sin precedente.
- Etiquetado `perimetro` de las dudas de localizar y extraer: la IA lo usa para preguntas de inventarios, imparidad o notas que difieren
  del estado (Rio Ave, Famalicão, Santa Clara, Torreense). Sin daño (se contestan igual). Retomar: si una regla empieza a contestar
  dudas por su tema.

- 232 k) Una respuesta "no" de la cola a una duda de importe ("¿se carga X del estado y no Y de la nota?", Olympiacos 2023 caso 446850a)
  no cambia nada: la verificación siguió con el importe del estado y hubo que agregar un ajuste `fila` a mano. Que esa respuesta
  aplique sola el importe de la nota (es lo que la pregunta ofrece), con la misma compuerta de cierre.
  Dónde: las respuestas las lee `verificar.mjs` con `respuestaDe(pdf, 'verificar', motivo, detalle)` (L190, L1360); el caso es
  `duda-tema` de extraer. El ajuste que se puso a mano: `fila` de Olympiacos 2023 L237 en `Admin/registros/ajustes-manuales.jsonl`.
  CONOCIDO, SIN DAÑO HOY (Guido, 2026-10-14): en toda la cola, de 17 dudas "¿se carga X y no Y?", 4 contestadas "no" y solo esta es
  de importe (las otras tres son de qué cuadro cargar); entró con el ajuste. Aplicarla sola pide que la duda traiga los dos importes con
  su línea en forma estructurada, o sea cambiar el prompt pago de extraer (y su caché). Se retoma si se repite.
- 232 l) Desglose de un renglón NETO del estado: en Olympiacos el estado NIIF imprime solo "Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών" y
  la nota lo abre en venta bruta menos costos; extraer marcó los costos como `gasto` y la carga los puso como gasto en 2023 y como
  ingreso negativo en 2021, 2022, 2024 y 2025 (hubo que fijarlo con ajustes `categoria`). Si el renglón que la nota desglosa es de
  ingreso, sus filas de costo van como ingreso negativo, siempre.
  Los ajustes que lo fijaron: `categoria` player_sales en Olympiacos 2021-2025 (`Admin/registros/ajustes-manuales.jsonl`); el
  criterio es el de la skill `club-data-mapping` sección 3 ("reflejá cómo lo presenta cada club": 2016-2020 el estado imprime bruto).
  Ojo: el escalón tiene que respetar eso (si el ESTADO imprime ingreso y gasto por separado, quedan separados).
  CONOCIDO, SIN DAÑO HOY (Guido, 2026-10-14): verificar.mjs ya pone del lado del ingreso las hijas de un renglón de ingreso (1.683 de
  1.685 en todos los documentos, 67 en negativo) y cargar.mjs pregunta si la categoría contradice ese lado. Única excepción hoy: Ceará
  2025 "Perdas na venda de ativos" (0,356 M) como gasto bajo "Outras receitas, líquidas" (el neto es el mismo).
- 232 n) Un ajuste `fila` que suma una fila fuera del total impreso (Kifisia 2025: 60.000 de transferencias, L421) deja el chequeo del total
  de ingresos en NO en cada corrida. El ajuste tendría que poder decir "fuera del total impreso" para que ese chequeo lo descuente.
  El ajuste está en `Admin/registros/ajustes-manuales.jsonl` (Kifisia_notes_2025, campo `fila`); el chequeo es el "total de ingresos"
  de `verificar.mjs`.
  CONOCIDO, SIN DAÑO HOY (medido el 2026-10-14): de 103 documentos con ajuste `fila` y verificación, 7 tienen un total en NO (Kifisia
  2025, Aris 2024, Criciúma 2022, Lazio 2007-08, AS Roma 2012 y 2018, Como 2025); ninguno frena (estado ok o año ya cargado). Se
  retoma si uno frena una carga.
- 232 o) `alta-club.mjs` no encontró el nombre legal de ninguno de los 6 clubes griegos del lote 71 (puso el de la carpeta): los documentos
  lo dicen en "Επωνυμία: ..." o en la portada como "ΠΟΔΟΣΦΑΙΡΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΕΙΑ <nombre>". Escalón por esas frases, con la cita.
  Código: `nombreLegal(md, displayName)` en `tools/alta-club.mjs` (L726). Las respuestas correctas para medir están en los ajustes
  `name` del 2026-10-14 (Olympiacos L484, PAOK L5-7, Aris L137, Atromitos L280, Panetolikos L5, Kifisia L496 de sus .md más nuevos) y
  en AEK, Asteras, Levadiakos, OFI, Panserraikos y Volos (ajustes `name` anteriores).
  CONOCIDO, SIN DAÑO HOY (Guido, 2026-10-14): el nombre pendiente no frena el alta y la revisión del alta (subagente) lo resuelve con
  cita. Pasa con CUALQUIER alfabeto no latino, no solo griego: nombreLegal() busca tokens latinos del displayName y FORMAS solo trae
  formas latinas (falta ООО / АО / ПАО / 株式会社...). Carpetas afectadas: Ucrania, Bulgaria, Serbia (en parte), Kazajistán, Macedonia
  del Norte, Armenia, Georgia, Japón, Corea, China y Chipre (Rusia no pasa por alta-club.mjs). Los nombres se transliteran a mano
  ("Olympiakos Syndesmos Filathlon Peiraios P.A.E."): un escalón por script no daría idéntico.
- 232 z) "Diferencia de redondeo" DENTRO de una nota se pierde: `verificar.mjs` (L1049) la agrega como hoja sin página y sin categoría, y
  `cargar.mjs` la deja como "sin categoría" (aviso, no se carga). AEK 2024: tres filas de 1 euro (Κόστος πωλήσεων, Αμοιβές
  ποδοσφαιρικού, Απομείωση παγίων). Conocido, sin daño hoy (el tie-out tolera la unidad); el redondeo de los TOTALES sí se carga
  (`cargar.mjs` L774, other_income / other_expenses). Si se arregla: la misma categoría por lado que el de los totales.
- 165 d) Rusia: las tablas de otros ingresos y gastos que no suman el código del formulario (Krasnodar, Krylia 2021-2025, Rostov 2025, Rubin
  2022-2025: la nota en bruto, el formulario en neto). Sin daño hoy: esos años quedan con el renglón entero.
- 323 c) "Stated after charging" (clubes ingleses): la duda-de-extraer de una nota que lista partidas incluidas en el resultado y no desglosa un renglón. Medido (Pipeline 5, 2026-10-19): solo 4 casos distintos en la cola (Bournemouth 2021-22, Brentford 2022-23, Fulham 2020-21, Burnley 2021-22) y siempre se contestan igual (dejar afuera). Una compuerta "el cuadro no tiene total, ninguna fila dice a qué renglón abre y ninguna combinación de filas suma un renglón del estado" probada sobre 3.702 documentos NO cierra ninguno de los 4 (la extracción ya cargó solo las filas que suman un renglón, p. ej. Bournemouth L1060-1061 = Depreciation and amortisation charge, y la duda es por el resto de la nota) y sí cierra un caso que no es de esta clase (Levadiakos 2019, gastos de personal en griego: la respuesta puede ser "se carga"). Sin daño hoy: la cola la contesta un subagente. Se retoma si pasan de unas decenas por lote.
- 298 aj) St. Gallen: la columna del año anterior de "Ertragsminderungen" (reducciones de ingresos, negativas) se suma con signo invertido en el chequeo del año vecino: 2020-21 imprime 2020 con ingresos 30,932 contra los 29,602 de 2019-20 (diferencia 1,33 = 2 × 0,666, la reducción de 2020). Medido (Pipeline 5, 2026-10-19): no cambia ningún dato que se cargue (cada año carga su propia columna actual, que cierra con el total impreso); solo deja un caso `anio-vecino` en la cola de 2019-20 y 2020-21. Sin daño hoy; se retoma si el chequeo del año vecino frena una carga.

## 373, medición de lectura y hallazgos del mapa (2026-10-22)

- Bytes que lee una sesión que toma el primer paso del 368 (extraer el bloque de personal de caja-deuda): ≈ 537 KB leyendo entero caja-deuda, verificar y cargar y la sección del PIPELINE; ≈ 43 KB con el mapa, los tramos que señala y la página de contrato (8 %). Es un modelo de lectura, no una sesión observada: `Admin/mediciones/373-bytes-leidos.txt` y el script que lo reproduce.
- El mapa de código encontró que verificar.mjs NO son 7 funciones de unas 270 líneas: es UNA función `verificar()` de 1623 líneas (176 a 1798) con unos 30 tramos marcados por comentarios de sangría 2 («ESCALÓN …»); partirlo (TODO 375) es cortar esa función. caja-deuda tiene 64 funciones de nivel superior (no 50) y lote.mjs 21 (no es un script de una función).
- Comentarios que dicen otra cosa que el código o la documentación (para el TODO 374, no se arreglan acá): `rutas.mjs` dice que Generados/ está gitignoreado y está trackeado (11.818 archivos); `cargar.mjs` (línea 384) y `caja-deuda.mjs --partir` llaman «etapa 5» a la categorización, que en PIPELINE.md es la 7.

## 368, el costo de personal por la estructura de la nota (2026-10-22)

- Medición completa en `Admin/registros/mediciones-pipeline.jsonl` y el veredicto «general» en `auditoria-proceso.jsonl`: en 31 clubes británicos, 41 valores aceptados idénticos, 0 cambian, 0 se pierden, 25 club-años nuevos (la estructura resuelve 50 club-años de 19 clubes). `Admin/mediciones/personal-verdad.tsv` pasó de 10 a 27 filas (los 17 valores del 351 que quedaron en los ajustes: valen como regresión, no como verdad independiente porque los produjo este mismo script con el vecino).
- Se descartó el escalón 0 (cifras etiquetadas del XHTML) para estos casos: ninguno de los 20 pendientes viene en XHTML. Sigue en el 356.
- Dos defectos que salieron al aplicar a los datos: la estructura de la sociedad sola (5 % de los ingresos en Aston Villa) tapaba la del grupo que Jev sí elegía, y un «Restated» en la columna anterior de la propia tabla contradecía al año ya cargado (Newcastle 2024). Los dos se arreglaron y se midieron contra los mismos 31 clubes. Quedan 12 club-años de a uno en el TODO 351.

## 407, la cola que se contesta sola: lo que se midió y no entró (2026-10-23)

- **Identidad en localizar/extraer: no discrimina.** Sobre 722 respuestas, una tabla que suma su propio total se aceptó el 49-59 % (contra 77 % cuando no cierra), y una cifra citada en la pregunta igual al total del cuadro se aceptó el 67 % (contra 76 %). Las preguntas se hacen justo porque la tool no pudo decidir, así que "cierra" no es señal. Lo que sí separa es el país (aceptar de 36 % en Noruega a 95 % en Estonia): va como historial en la pregunta (`historialParecidos` de `cola.mjs`), sin decidir.
- **Casos provisorios: descartado.** De los casos que terminan `obsoleto`, solo `primer-anio` se cierra en minutos (66 % en 15 min o menos; ya lo resuelve `primer-anio-ia.mjs` en el mismo lote). `no-cierra`, `anio-vecino` y `numero-no-confirmado` tardan de una hora a un día (o se cierran en bloque por un cambio de código): no son ruido de una misma corrida.
- **Gestión:** `cargar.mjs` ya no preguntaba por un club con un `descartar` contestado, pero un lote levanta el caso de todos los años antes de que nadie conteste (92 repeticiones). Ahora contestar `descartar` cierra los otros pendientes del club (`cola.mjs --responder`).
- **Signo con aclaración:** solo 1 de 50 preguntas de signo tiene una aclaración tipo «(- = Steuerertrag)» en el rótulo; va como dato en la pregunta, sin regla.

## El resumen de la IA contra la fila de su línea: descartado para los totales (2026-10-25)

- **`verificar-lecturas.mjs`, total_ingresos y total_gastos con la regla del resultado (`resFila`): no entró.** Idéntico en los 1.029 documentos del lote completo (los tres niveles), pero no por falta de casos: en una pasada de diagnóstico sobre ese lote, de 2.198 comparaciones contra la fila de la misma línea, solo Salernitana 2022 difiere más de 1 % (ingresos 56,07 M del resumen contra 46,06 M de la fila; gastos 60,95 contra 58,95), y ahí el resumen es el correcto: el documento imprime «TOTALE RICAVI 56.070.082» (L437) y la fila extraída trae 46.056.062. Es decir, la fila no siempre es la que está validada contra el PDF. Para el resultado la regla se justifica por un caso (Bolton 2024-25) que cierra con ella; para los totales no hay ninguno y hay un contraejemplo. Se descartó el cambio.

## Contestar la cola de categoría por precedente de otros clubes: descartado (2026-10-26)

- **Precedente de otros clubes (465): no entró.** Backtest sobre las 3.296 preguntas de categoría respondidas (`Admin/registros/cola-revision.jsonl`, orden cronológico, solo respuestas de otros clubes): con la misma etiqueta y el mismo país, un precedente unánime cubre 13 % de las preguntas y acierta 83 %, dos precedentes cubren 8 % y aciertan 88 %, tres cubren 7 % y aciertan 87 %; con la propuesta del sistema incluida en la clave, 5 a 11 % con 91 a 95 %. La propuesta del sistema ya acierta casi lo mismo en esas mismas preguntas (348 de 433), así que contestar por precedente no ahorra preguntas ni gana acierto; el precedente del PROPIO club ya lo da la memoria de categorías. Lo que sí tiene señal es la confianza de la categorización: 93 % de acierto desde 0,7, 81 % entre 0,5 y 0,7, 58 % por debajo de 0,5 (`fos cola-historial categoria`).
