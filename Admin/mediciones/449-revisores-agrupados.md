<!-- md: la prueba de los revisores agrupados de la cola (un subagente por documento, con JSON y cita) contra uno por pregunta, y el reintento único del lote 143 | leer: antes de lanzar revisores de la cola o de decidir si un reintento de desgloses vale su costo -->
# 449: revisores agrupados de la cola y el reintento único

Conclusión: un revisor por DOCUMENTO con un brief fijo y respuesta en JSON cuesta 75 a 81 mil tokens por 7 u 8 preguntas (unos 10 mil por pregunta, 18 a 33 segundos), contra 72 mil por pregunta con un subagente por pregunta: 7 veces menos, y contestó igual que el individual en las 6 preguntas que se hicieron de los dos modos. Contra la decisión histórica coincidió en 19 de 23 (83 %); las 4 que difieren son «corregir lo que se aceptó» y las citas del revisor son defendibles (ver abajo), así que no son errores sin más: hay que mirarlas. No es un ahorro contra lo que ya se hace (en el lote 143 los revisores ya eran agrupados: 80 a 130 mil tokens por 13 preguntas), pero deja la respuesta estructurada y con cita. El reintento único (US$ 0,12 por documento) encontró la nota de personal en 12 de 13 documentos; se mantiene.
Destino: `Admin/BRIEF-REVISOR-COLA.md` (el brief para lanzar revisores), los puntos 449 (se cierra) y 450 (las 4 respuestas que difieren).

## La prueba (2026-10-24)

Muestra: 23 preguntas ya contestadas por una persona (`verificar`: duda-tema, duda-de-extraer, duda-de-localizar) de 3 documentos, elegidos por tener varias corregidas: West Ham 2023-24 (7), Sampdoria 2018 (8), Leeds 2019-20 (8). 9 se habían corregido y 14 aceptado. El revisor no vio la respuesta histórica. Seis de las 23 (2 por documento, 3 corregidas y 3 aceptadas) se hicieron además una por una, cada una con su subagente.

| | Tokens | Tiempo | Misma decisión que el histórico |
|---|---|---|---|
| 3 revisores agrupados (7, 8 y 8 preguntas) | 75.085 + 80.924 + 78.038 = 234.047 | 18 a 33 s cada uno | 19 de 23 (83 %); aceptó lo que se corrigió: 0; corrigió lo que se aceptó: 4 |
| 6 revisores individuales | 70.601 a 72.876 cada uno, 431.944 en total | 10 a 16 s cada uno | 6 de 6 |
| Las mismas 6 con los agrupados | — | — | 6 de 6, y igual al individual en decisión y valor |

Gasto total de la prueba: unos 667 mil tokens de subagentes Sonnet (más que los 250 a 400 mil que estimé: un subagente suelto gasta unos 70 mil solo en arrancar, y por eso el individual cuesta 7 veces más). Las 23 citas (`md` y rango de líneas) apuntan a rangos que existen; no verifiqué el texto de cada una. Seguridad de los agrupados: 17 alta y 6 media (las 3 de payroll de Leeds, donde el documento no dice a qué renglón van los sueldos).

## Las 4 que difieren (todas: el histórico dice aceptar, el revisor dice corregir «no»)

- **Sampdoria 2018, `9414130` (imposte) y `2f9021a` (interessi passivi):** el histórico dejó afuera los cuadros b63 y b62 («criterio ya decidido o cierre exacto»). El revisor cita que b62 suma 2.728 (miles) = el renglón (2.728.204) de la línea 1051 del estado, y que b63 suma 6.969.234 = 19.022.174 − 12.052.939: es decir que los cuadros sí cierran con el estado y serían su desglose. La regla actual (ESTADO.md: un renglón que el documento abre en un cuadro que suma exacto se carga con ese detalle) le da la razón al revisor.
- **Leeds 2019-20, `776c847` y `73f981d` (Turnover):** el histórico aceptó cargar el Turnover como una línea porque la nota 4 «está mal transcripta (no es tabla)». El revisor cita la nota 4 en las líneas 790-802 con 7 fuentes que suman 54.183.980 = el Turnover del estado. Otra pregunta del mismo documento (`27baa05`, de un día antes) se había corregido «sí» con la misma cuenta (los 7 rubros suman 54.183.980), de modo que el histórico del propio Leeds no es consistente.
Ninguna de las 4 cambió datos: son respuestas de la cola, y decidir si el detalle se carga es del punto 450.

## El reintento único

El reintento del lote 143 (`lote.mjs --reintentar`, desgloses de personal) costó US$ 1,59 para 13 documentos: US$ 0,12 por documento. Dejó 30 preguntas nuevas en 12 de los 13 documentos (13 de localizar, 13 de extraer, 3 de tema y 1 de no-cierra), casi todas del tipo «¿se cargan las remuneraciones de la nota 6 (Employees)?». En 12 de 13 documentos encontró esa nota; sin el reintento, el costo de personal queda en 0 hasta `caja-deuda --personal`. En toda la cola, las preguntas de personal o salarios se aceptaron 78 % (100 de 129) y las de «se carga como Salarios del plantel el total…» 89 % (16 de 18): ninguna llega al 98 % de una compuerta. Se mantiene el reintento; el costo es chico y el gasto de revisión por documento (unos 10 mil tokens por pregunta con el revisor agrupado) también.
