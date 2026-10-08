# HALLAZGOS del pipeline: lo que se midió y no entró

Ideas que se probaron con casos reales y se descartaron, con el porqué, para no volver a probarlas. Una línea por hallazgo; el
detalle de cada medición está en `Admin/CHANGELOG.md`. El proceso vigente está en `Admin/PIPELINE.md`.

- **Elegir filas por palabras clave** (la etapa vieja): reproduce los ingresos ya cargados en 7-11% de los años. Por eso existe el proceso nuevo.
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

