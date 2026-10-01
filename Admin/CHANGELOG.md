# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión
por versión, desde la Versión 10 (cuando el sitio pasó de ser solo de Boca a
multi-club) hasta hoy. Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `Admin/finance-of-sports-project.md`. Para el
estado actual del proyecto (qué hay armado, qué es real vs. placeholder por club) ver
`Admin/ESTADO.md`, y para la to-do list vigente, `Admin/TODO.md` — hasta la Versión 137
las dos cosas vivían en un comentario HTML al principio de `index.html`.

**Las rutas que aparecen DENTRO de cada entrada son las de su época.** La Versión 196 mudó
los documentos internos a `Admin/` y no reescribió el historial: una entrada de septiembre
que dice `ESTADO.md` era verdad ese día.

---

## Versión 354 — Caja y deuda: escalón 2 con IA (2026-10-01)

- `caja-deuda.mjs`: `porIA()` (una llamada a Claude por documento, solo si los escalones 0 y 1 no dieron nada) elige las líneas del balance de caja y de deuda (criterio del club si hay precedente; si no, deuda financiera) y la escala con su frase. `datoDeIA()`: las cifras salen de esas líneas del .md, nunca de la IA; se descarta si una línea no es fila del balance o la frase de la escala no está en el balance; se acepta confirmada por un año vecino; "ninguna deuda" + total del pasivo = 0. Respuesta guardada en `Generados/<doc>.caja-deuda-ia.json`. `--medir --ia`: ensayo 171 documentos, ~US$ 5,49.

## Versión 353 — Caja y deuda: un balance completo sin deuda financiera es deuda 0 (2026-10-01)

- `caja-deuda.mjs`: deuda 0 (decisión de Guido) cuando el balance tiene su total del pasivo, ninguna fila es deuda financiera y el club tiene un precedente aprendido de deuda financiera que en este documento no aparece. UC 2010-2019: 0 (2015 y 2019 revisados: el pasivo son cuentas por pagar, provisiones e impuestos). Medido: sin cambios en los 205 años (ningún 0 equivocado). Probado y descartado: sin exigir el precedente, 3 aciertos y 25 ceros equivocados (Boca, Flamengo, Talleres: su deuda se llama de otra forma).

## Versión 352 — Caja y deuda del balance, etapa 6b (paso 1: escalones 0 y 1, sin conectar al lote) (2026-10-01)

- `tools/caja-deuda.mjs` (nuevo): lee `cash` y `grossDebt` del balance. Escalón 0: precedente del club (qué filas, 1 a 3, suman lo cargado en otro año; mismas familias en este documento). Escalón 1: vocabulario. Un dato se acepta solo si lo confirma un año vecino (año anterior cargado o documento siguiente, en su columna del año anterior); el escalón 1 necesita el año anterior cargado (el documento siguiente no ataja un error de escala). Si no, null con el motivo: nunca frena. `--medir`: lectura de los años ya cargados contra lo cargado a mano, con precedente solo de los OTROS años del club.
- `vocabulario.mjs`: conceptos CAJA y DEUDA_FINANCIERA (nuevos, no cambian los existentes).
- Medido (205 años con deuda y caja y con transcripción): deuda 11 iguales, 1 distinta, 193 sin dato; caja 47 iguales, 1 distinta, 157 sin dato. Las 2 distintas las confirma el documento vecino (Athletico Paranaense 2024, Wolves 2025): a revisar si es el criterio de lo cargado a mano. Probado y descartado: leer solo el "balance principal" (arreglaba U. de Chile 2022 y perdía 13 cajas).

## Versión 351 — El lote termina con "Listo para cargar Y" y "Frenados X" (2026-10-01)

- `lote.mjs`: bloque RESULTADO al final de la corrida, con la última propuesta de carga de cada documento de la lista (también los que no pasaron por la etapa 8 en esa corrida): listos (con años), frenados (año y primer motivo), ya en el sitio y sin propuesta. Pedido de Guido. Probado sobre los archivos del lote 07: 8 listos (2010-2017), 0 frenados, 8 ya en el sitio.

## Versión 350 — En la cola, "obsoleto" es un estado y no una respuesta; un caso que vuelve a aparecer se reabre (2026-10-01)

- `cola.mjs`: solo cuentan como respuesta las de Guido (aceptar, corregir, descartar, preguntar-club). "obsoleto" y "reabierto" son estados. `agregarCaso` reabre un caso cerrado como obsoleto que una etapa vuelve a levantar; `pendientes()` y `cola.mjs` lo muestran. Antes: `cargar.mjs` frenaba por un caso que la cola no mostraba (UC 2013, "Otras ganancias (pérdidas)", regresión de la Versión 348) y `verificar.mjs` daba por contestado un chequeo fallado que había vuelto. `cargar.mjs`: sin la excepción por 'obsoleto' (ya no hace falta).
- Medido en los 17 documentos con verificación, dos pasadas con el código viejo y dos con el nuevo desde la misma cola: `verificar` idéntico; `cargar` solo cambia UC 2013 (FRENA → CARGA); la cola no cambia; pasada 1 = pasada 2. Prueba aparte sobre una cola de prueba: cerrar, no volver a cerrar, reabrir.

## Versión 349 — El proceso nuevo le avisa al registro cuando un documento queda listo para categorizar (2026-10-01)

- `verificar.mjs` (`avisarRegistro`): al terminar ok desde el lote, si el `.md` no está cargado ni ya es `listo-para-jev` para su huella, y `validacion.json` es posterior al `.md` y no tiene números sin confirmar, agrega al historial (`transcripciones-verificaciones.jsonl`) la misma línea que escribe `pipeline.mjs`, con método "validar-bloques (proceso nuevo)" y el detalle "solo los bloques que se cargan; el resto del .md no se validó". Caso: UC 2015, re-transcripto, quedaba "sin-verificar" y la etapa 7 no lo categorizaba. Medido en los 16 años de UC: una sola línea nueva (2015); en el registro solo cambia 2015 (sin-verificar → listo, listo-para-jev).

## Versión 348 — Un caso de categoría que una respuesta del club ya resolvió se cierra solo (2026-10-01)

- `cola.mjs`: `cerrarResueltoPorClub()`. `cargar.mjs`: cuando aplica a un documento la respuesta de categoría que Guido dio en otro año del club, cierra el caso pendiente de ese documento con la misma etiqueta (`obsoleto`, con la respuesta que lo resolvió). UC 2013, caso 6c69d0a ("Otras ganancias (pérdidas)", resuelto por 4094e9d de 2014). Medido en los 17 documentos de UC: `.carga.json` y salida de `cargar.mjs` idénticos antes y después; en la cola solo cambia ese caso.

## Versión 347 — El documento re-transcripto en el lote pasa a verificar en la misma corrida (2026-10-01)

- `lote.mjs`: la etapa 6 toma todo estado que empiece con "extraído" (antes, igualdad exacta: UC 2015, re-transcripto con Mistral y extraído en el reintento del lote 06, quedaba sin verificar). Los testigos siguen afuera. Ensayo del lote 06, con y sin `--reintentar`: idéntico antes y después.

## Versión 346 — Dudas confirmadas por la aritmética; la categorización sabe cuándo una fila entró por su signo; diagnóstico de desgloses (2026-10-01)

- `verificar.mjs`: escalón 2 de las dudas: si la escalera cerró, ningún año vecino da distinto, el tema es cuadro por segmento / cuadro duplicado / columna / escala y la propuesta "sí" ya está aplicada, se acepta sola con nota. Las filas que entran por su signo (lectura 3) llevan esa explicación como sección para Jev y Claude. Guarda `faltasDesglose` siempre.
- `tools/diagnostico-desglose.mjs` (nuevo): para un desglose que sigue sin sumar después del reintento, lista las líneas con cifras fuera de los bloques elegidos y por qué el índice las dejó afuera (índice, etapa 3) o dice que no hay (transcripción, etapa 2). `lote.mjs` lo recomienda al final. HANDOFF: escalera de troubleshooting.

## Versión 345 — Índice ampliado v2 (etiquetas partidas en dos renglones); el reintento re-transcribe moviendo la transcripción vieja (2026-10-01)

- `indice-bloques.mjs` (solo el índice ampliado, que usa el reintento): un renglón solo de números debajo de un renglón solo de texto es una fila con la etiqueta partida (UC 2013, cuadro por segmento). `VERSION_AMPLIADO = 2`: un documento reintentado con una versión anterior tiene un reintento más (`verificar.mjs`, `cargar.mjs`, `localizar.mjs`). Medido: ampliado v2 505.203 filas en bloques (v1 498.282, normal 485.595), ningún documento pierde filas.
- `lote.mjs`: el escalón 1 de la etapa 2 mueve la transcripción vieja a Generados/ antes de llamar a Mistral (no la pisaba: "Ya existe el .md"); si Mistral falla, la restaura.
- Lote 06, reintento: UC 2017 da CARGA; UC 2013 vuelve a reintentar con el índice v2; UC 2015 se re-transcribe en la próxima corrida.

## Versión 344 — Arreglos del lote 06: respuesta de categoría por club, resultado derivado, año vecino con fecha deducida, descartados (2026-10-01)

- `cargar.mjs`: una respuesta de categoría vale para todos los documentos del mismo club con la misma etiqueta ("Otras ganancias (pérdidas)" de UC llegaba una vez por año). Tie-out contra `resultadoParaCargar` (si la verificación cerró contra "antes de impuestos", el resultado del ejercicio es ese más el impuesto impreso: UC 2013, 220.616).
- `verificar.mjs`: el chequeo de año vecino usa la fecha deducida del otro documento (UC 2010 contra 2011: ok; ya no pide "primer año").
- `Admin/documentos-descartados.txt` (nuevo): lo saltea `lote.mjs`. UC 2009.

## Versión 343 — Escaleras de la etapa 2 (re-transcribir) y de la 7 (precedente con contexto); dibujos en el HANDOFF (2026-10-01)

- `lote.mjs`: si localizar dice "no hay estado de resultados", la transcripción no es de Mistral y el PDF tiene páginas interiores en imagen, se marca para re-transcribir; con `--reintentar` re-transcribe con Mistral (guarda la anterior en Generados/) y vuelve a localizar y extraer. Caso: UC 2015 (páginas 4-9 en imagen).
- `categorizar-claude.mjs` / `memoria-categorias.mjs` / `cargar.mjs`: lo aprendido guarda el renglón que desglosa su fila (`padre`); el precedente prueba primero misma etiqueta y mismo renglón. Probado con "Remuneraciones" bajo "Costo de ventas" (sueldos del plantel) y bajo "Gastos de Administración" (administración).
- HANDOFF: el dibujo de la escalera de cada etapa (2, 3, 4, 6, 7, 8).

## Versión 342 — Etapa 6: escalera de lecturas; fecha de cierre deducida de los vecinos (2026-10-01)

- `verificar.mjs`: si la lectura base no cierra con un número impreso, prueba en orden: (1) "resultado antes de impuestos" si no hay resultado final, (2) el total impreso puede ser un renglón, (3) renglones sin lado según su signo. Acumulativas; gana la primera que cierra y queda escrita. Si el documento no tiene ningún número impreso para cerrar, es un fallo (antes pasaba como OK). Prueba gratis sobre UC 2010-2025: 2010-2014 cierran con la lectura 3 ("Otras ganancias (pérdidas)" quedaba afuera); los 8 años que ya cerraban siguen con la lectura 0 y las mismas líneas.
- `tools/cierre-vecinos.mjs` (nuevo): sin fecha de cierre detectada, se deduce si el documento anterior y el siguiente del club cierran el mismo día y mes; con aviso. Lo usan `verificar.mjs` y `cargar.mjs`. UC 2011: 31-12-2011, y los chequeos de año vecino contra 2010 y 2012 dan ok.
- Lote 06 (UC 2009-2017): 2009 descartado (PDF de una página escaneada); 2015 sin estado de resultados en la transcripción vieja (falta re-transcribir); 2016 y 2017 limpios.

## Versión 341 — UC 2018-2020 cargados; dudas reconocidas por club + tema + renglón (2026-10-01)

- UC 2018, 2019 y 2020 escritos (reintento por "cuotas sociales en 0": ahora con socios 98.296 / 202.753 / 99.645 y escuelas de fútbol). UC queda con 2018-2025.
- `localizar.mjs` / `extraer.mjs`: cada duda trae `tema` (lista fija: usar-cuadro-por-segmento, cuadro-duplicado, cuadro-de-otro-anio, perimetro, escala, columna, fila-ilegible, otro) y `renglon`. `verificar.mjs` reconoce las de tema fijo por club + tema + renglón (`cola.mjs respuestaPorDetalle`): una respuesta de Guido en cualquier año del club se aplica a todos. Motivo: la misma pregunta del cuadro por segmento llegó tres veces redactada distinto. La respuesta ya dada para UC se pasó a la clave nueva.

## Versión 340 — Reintento por categorías en 0; perfil de clubes (socios, otros deportes) (2026-10-01)

- `cargar.mjs` (etapa 8, con `--desde-verificacion`): marca reintento si salarios del plantel, televisión o estadio dan 0 (siempre), o cuotas sociales / otras secciones deportivas dan 0 y el perfil del club dice que tiene socios / otros deportes. Si el perfil no lo sabe, pregunta de sí o no en la cola y la respuesta se guarda en el perfil. Medido sobre 241 años cargados: con "cualquier categoría en 0" se reintentaría el 94% de los documentos.
- `tools/perfil-clubes.mjs` (nuevo) y `Admin/perfil-clubes.jsonl` (66 clubes sudamericanos, armado por un subagente con evidencia de data/ y transcripciones).
- `lote.mjs --reintentar` toma también estas marcas; `localizar.mjs` y `extraer.mjs` reciben qué faltó en el intento anterior.
- UC 2018-2020: frenan por "cuotas sociales en 0" (localizar no había elegido el cuadro por segmento); reintento pendiente.

## Versión 339 — Peso chileno: la cotización de un cierre es la del primer día con dato posterior (2026-10-01)

- `lookup-fx-close.js` (`diaCierre: 'siguiente'` en CLP) y `alta-club.mjs` (`FX_DIA_SIGUIENTE`): para CLP se toma el primer día con dato posterior al cierre (el dólar observado se publica al día siguiente). Los 12 cierres declarados por UC y Palestino: 11 exactos, 2024 a 0,02 (antes, entre 0,04% y 0,85% de diferencia). Las demás monedas no cambian.

## Versión 338 — Series oficiales de EUR, DKK y GBP; la carga usa el signo verificado (2026-10-01)

- `fetch-fx-reference.mjs`: EUR (BCE, tipo de referencia diario, invertido), DKK (Danmarks Nationalbank, Statbank DNVALD, por 100) y GBP (Bank of England, serie XUDLUSS, invertida). Banco central de cada moneda en vez de la Reserva Federal (H.10 se aleja hasta 0,4-0,9% de lo que declaran los documentos). EUR coincide exacto con 4 cierres declarados por Hajduk Split (tomando el hábil ANTERIOR, aun cuando el 31/12 tiene dato); DKK y GBP sin tipos declarados en las transcripciones: comparados contra BCE cruzado y FRED. `lookup-fx-close.js` y `alta-club.mjs` las conocen.
- `cargar.mjs --desde-verificacion`: usa el signo que decidió verificar.mjs (`signoFijo`) en vez de adivinarlo por tabla. UC 2020 frenaba porque "Feriado Legal −15.597" (reversión dentro de gastos de administración) quedaba sumando gasto (31.194 de diferencia). UC 2018-2020: los tres dan CARGA.
- Lote 05 (UC 2018-2020): la cadena de años vecinos coincide al peso en los tres.

## Versión 337 — UC 2021 y 2025 cargados con todos los desgloses; perímetro del año más cercano (2026-10-01)

- `cargar.mjs`: el perímetro se hereda del año cargado más cercano (UC: individual hasta 2021, consolidado desde 2022); si no se puede heredar, va a la cola como pregunta de sí o no (antes frenaba sin cola).
- UC 2025 recargado (se revirtió la carga anterior): costo de ventas abierto por la columna de totales del cuadro por segmento (sueldos del plantel 10.762.861) e "Ingresos Comerciales" por la columna Comerciales (Membresía de Socios 278.185). En el sitio local: sueldos del plantel 11,9 M USD (42% de los ingresos); "Salarios / Ingresos" ya no da 0%.
- UC 2021 cargado (perímetro individual, como el documento): ingresos 16,8 M USD, resultado −4,2 M, tipo de cambio 844,69 declarado.

## Versión 336 — Camino de error: reintento cuando un desglose no suma (2026-10-01)

- `verificar.mjs` marca `reintentar` con los desgloses (notas o anidados) de 2+ filas que no suman. `lote.mjs --reintentar` vuelve a localizar SOLO esos documentos con el índice ampliado (`indice-bloques.mjs`, opción `ampliado`: filas que terminan en "-") y a extraer con la lista de lo que no sumó y la regla de la columna de Totales para un renglón del estado. Una vez por documento. El camino limpio no cambia (decisión de Guido: las reglas extra son para cuando hay errores).
- Caso que lo motivó, UC 2025 (lote 04): la nota de segmentos tiene el desglose de "Ingresos Comerciales" y del costo de ventas, pero las filas con "-" partían el cuadro (5.180.336 contra 7.940.492; 20.162.209 contra 20.985.893). Con el índice ampliado el cuadro queda entero.
- Lote 04: UC 2021 con "Ingresos Comerciales" abierto por la nota de segmentos da CARGA.

## Versión 335 — Desgloses anidados y cuadros por segmento (2026-10-01)

- `localizar.mjs` / `extraer.mjs`: una nota puede desglosar un renglón de otra nota; un cuadro por segmento se usa solo con la columna del segmento que abre un renglón (UC: columna "Comerciales" -> "Ingresos Comerciales"); los cuadros por jugador no se eligen.
- `verificar.mjs`: `abrirAnidadas()` reemplaza una hoja de una nota por su propio desglose si suma (misma regla de `cerrarNota`), hasta 3 niveles. Probado con las filas de segmentos de UC 2021 agregadas a mano a una copia: "Ingresos Comerciales 6.542.146" se abre en socios, escuelas de fútbol, publicidad, tienda y merchandising; el resultado y la columna del documento 2022 siguen cerrando. Con lo ya extraído, UC 2021 y 2025 no cambian.
- Guido cambió sus respuestas sobre la nota de segmentos de UC 2021 y 2025: sí se usa como desglose de "Ingresos Comerciales", como en 2022-2024.

## Versión 334 — Lote: documentos testigo; UC 2021 da CARGA (2026-10-01)

- `lote.mjs`: una línea `testigo <pdf>` entra solo hasta extraer (para el chequeo de año vecino de otro documento); no se verifica, categoriza ni propone cargar.
- Lote 03: UC 2021 verificado contra la columna 2021 del documento 2022 (14.157.951 contra 14.157.952): primera vez que el chequeo de año vecino corre con datos reales. Propuesta de carga: CARGA (resultado −3.538.301, tipo de cambio 844,69 declarado). No se escribió el sitio.
- Probada y descartada en la misma sesión: "las notas por segmento nunca se eligen". En UC el desglose de "Ingresos Comerciales" (socios, escuelas de fútbol, publicidad, tienda, merchandising) solo está en la nota de segmentos, y 2022-2024 se cargaron con él.

## Versión 333 — Serie oficial del peso chileno (CLP) (2026-10-01)

- `fetch-fx-reference.mjs`: CLP, "dólar observado" del Banco Central de Chile publicado por el SII (HTML público, sin usuario; la API del Banco Central y la de la CMF piden credenciales). 6.666 cotizaciones, 2000-2026, en `tools/fx-reference/clp-usd.json`. `lookup-fx-close.js` y `alta-club.mjs` la conocen.
- Verificada contra los 12 cierres que declaran UC (2016-2025) y Palestino (2018, 2019): 11 exactos y uno a 0,02, PERO tomando el primer día con dato posterior al cierre (el dólar observado de un día se publica al día siguiente). El lookup de hoy toma el hábil anterior y queda entre 0,04% y 0,85% lejos: decisión pendiente.

## Versión 332 — UC 2025 cargado: primer año del proceso nuevo en el sitio; costo de ventas "sin desglosar" (2026-10-01)

- Universidad Católica 2025 escrito por `cargar.mjs --escribir`: ingresos 25.850.434, gastos 25.665.995, resultado −729.845 (miles de CLP), tipo de cambio 907,13 declarado. Auditoría P0 0 · P1 0. Visto en el sitio local: 28,5 / 28,3 / −0,8 M USD.
- "Costo de ventas" (20.985.893, sin desglose porque la Nota 20 del documento trae la tabla equivocada) va a `lump_football_operations_expense` ("sin desglosar por la fuente"); sueldos del plantel se ve "—". Marca nueva `fiscalYearMeta.sinDesglose` (renglón, importe, motivo), que la página todavía no lee.
- `cola.mjs --corregir-categoria`: Guido fija la categoría de una fila aunque la categorización no haya tenido dudas. `cargar.mjs`: escribe `sinDesglose` para toda línea "sin desglosar".
- Visto y pendiente: "Salarios / Ingresos" muestra 0% para UC 2025 (los sueldos están adentro del costo de ventas).

## Versión 331 — Categoría dudosa a la cola en la etapa 8; UC 2025 da "CARGA" (2026-10-01)

- `cargar.mjs`: una fila con categoría menor a 0,80 va a la cola como pregunta de sí o no, cuenta en las sumas con la categoría propuesta y el documento frena con "N filas esperan categoría" (antes quedaba afuera y frenaba con un "no cierra" engañoso). La respuesta de Guido gana sobre cualquier categoría de esa fila y se guarda en `Admin/categorias-aprendidas.jsonl` con confianza 1 (precedente del club). `cola.mjs`: `casoYRespuesta()`.
- UC 2025: con las 3 respuestas de Guido (Transporte, Arriendo de Bienes, Provisión No Operacionales -> gastos de administración), la propuesta de carga da CARGA: ingresos 25.850.434, gastos 25.665.995, resultado −729.845 (igual al impreso), tipo de cambio 907,13 del documento. Primer documento del proceso nuevo que llega a "carga". No se escribió el sitio.

## Versión 330 — La etapa 8 imprime un resumen; UC 2025 espera la Nota 20 del club (2026-10-01)

- `cargar.mjs --lista`: imprime siempre el resumen por documento (carga o frena, motivos, avisos) y deja la propuesta completa en `Generados/.../<doc>.carga.json` (sufijo nuevo en `rutas.mjs`). Antes, un lote de un documento imprimía ~400 líneas de JSON.
- UC 2025: segunda corrida, verificación OK y cola vacía; la carga frena por 3 filas con categoría menor a 0,80. Guido decidió no cargar 2025 hasta tener la Nota 20 (en una línea, sueldos del plantel quedaría en 0).

## Versión 329 — Dudas de la IA como preguntas de sí o no (2026-10-01)

- `localizar.mjs` y `extraer.mjs`: cada duda trae `pregunta` (concreta, se contesta sí o no mirando el PDF) y `propuesta` (sí/no), además del porqué. `verificar.mjs` y `cola.mjs` muestran la pregunta y la propuesta. Pedido de Guido: la cola mostraba explicaciones exploratorias. Dudas en el formato anterior se muestran como antes.

## Versión 328 — Tipo de cambio: con varios valores en una tabla, gana la fecha más nueva (2026-10-01)

- `alta-club.mjs`: si el documento declara más de un tipo de cambio y están en una fila de tabla cuyo encabezado tiene una fecha completa por columna, gana la columna con la fecha más nueva (decisión de Guido). Frases, años sueltos o filas que no se corresponden con el encabezado siguen yendo a la pregunta (cola).
- Medido sobre los 3.358 documentos: cambia en 11 (UC 2016-2025 y Palestino 2018, verificados contra el .md); Fluminense 2022, Argentinos 2019, Racing 2012, San Lorenzo 2015, Club América 2025, Atlético Nacional 2025 y Rubin Kazan 2025 siguen en la cola.
- Reglas confirmadas por Guido: gana el tipo de cambio que declara el documento; si no declara, la serie oficial de `tools/fx-reference/` (nunca una cotización dada por Claude).

## Versión 327 — Primer documento por el proceso nuevo (UC 2025); cierre de notas por estructura; HANDOFF corto (2026-10-01)

- Primera corrida real del proceso nuevo, un solo PDF: Universidad Católica (Cruzados) 2025 (`Admin/lote-02.txt`, US$ 0,24). El resultado cierra y la columna 2024 coincide con el sitio; frenó en la carga por la cola y por dos tipos de cambio declarados.
- `verificar.mjs`: `cerrarNota()` lee la estructura impresa (subtotal que cierra lo de arriba o lo de abajo, renglón suelto en negrita, cuadros de detalle y notas repetidas que no se suman dos veces), con tolerancia de media unidad por fila en vez de 0,5%. Medido en 69 renglones con nota de 27 extracciones: 62 igual, 5 mejoran (UC, Betis, Athletic, Nordsjælland, Levante), Chapecoense deja de "cerrar" 917 contra 912. Filas sin importe ("-") no se cargan.
- Dudas: `localizar.mjs` y `extraer.mjs` las devuelven con bloques y `afecta_carga`; `verificar.mjs` manda a la cola las de las dos etapas, con página y líneas del bloque, y deja las que no afectan la carga como notas.
- `cola.mjs`: casos que la última corrida ya no levanta se cierran solos como `obsoleto`.
- `lote.mjs`: el ensayo ya no llama a extraer de verdad cuando localizar estaba hecho; la etapa 7 no imprime el registro entero.
- Probada y descartada: elegir el tipo de cambio por el encabezado de la columna (4 errores en 17 documentos).
- `tools/archivo/`: `localizar-extraer.mjs` y `test-motores.mjs`. `Admin/Archive/`: `MAPA-DE-TOOLS.md` y el HANDOFF largo; `Admin/HANDOFF-pipeline.md` reescrito corto.
- UC 2025, Nota 20 con la tabla equivocada: a `Admin/dudas-por-club.md` (decisión de Guido: costo de ventas en una línea).

## Versión 326 — La cola humana dice la página del visor y el número impreso (2026-10-01)

- `cola.mjs`: "Abrí el PDF en la página N del visor (la hoja tiene impreso "M" al pie)". El número impreso sale del último renglón de la página en el .md o, si no está, del texto propio del PDF; si no hay, lo dice. Pedido de Guido: buscó "pág. 8" de Bahia en la hoja con el "6" impreso (era otro documento y otra numeración).

## Versión 325 — Índice de bloques: no perder renglones sueltos del estado de resultados (2026-10-01)

- `indice-bloques.mjs`: dentro de un bloque de texto tolera huecos de hasta 3 líneas (blancas, hasta dos líneas de texto sin cifras, o un número de página suelto), y cuenta como fila una línea que termina en 2+ números chicos. Encontrado antes de correr el lote 01: en Bahia 2021 pág. 8 "Outras receitas (despesas), líquidas 64.283" y "Receitas financeiras 77" quedaban fuera de todo bloque, y extraer no los iba a ver.
- Medido sobre las 2.249 transcripciones: filas en bloques 436.679 -> 485.595, ningún documento pierde filas. Bahia 2021 y 2022 y FC Midtjylland 2021 (bilingüe; antes 0 filas de estado) quedan con el estado de resultados entero en un bloque.

## Versión 324 — El proceso nuevo (localizar, validar, extraer, verificar) con cola humana: tools construidas, sin correr (2026-10-01)

- Diseño acordado con Guido etapa por etapa (riesgos, mitigaciones, cola humana) en `Admin/HANDOFF-pipeline.md`, "El proceso nuevo", junto con lo que falló en los tests y lo que no entró. Se trabaja en lotes de 5; no se corrió ningún piloto (pedido de Guido).
- Tools nuevas: `indice-bloques.mjs` (localizar por bloque, no por página: el estado puede empezar a mitad de página), `localizar.mjs`, `validar-bloques.mjs` (números contra el PDF: texto propio o lectura de la imagen; solo los bloques elegidos), `extraer.mjs` (escala por bloque, línea del .md, columna del año anterior), `verificar.mjs` (notas por cierre, totales, resultado, año anterior cargado y documento del año vecino: 101 de los 159 años nuevos tienen el documento siguiente transcripto y solo 2 el año anterior cargado), `cola.mjs` (cola humana con qué abrir en el PDF y en el .md; respuestas que la próxima corrida toma), `lote.mjs` (orquesta las etapas 3-8, ensayo por defecto), `claude-llamada.mjs`. `cargar.mjs --desde-verificacion`. `rutas.mjs`: sufijos nuevos.
- `estado.mjs`: lista los PDFs rotos con el archivo de `fuentes/` a reabrir (antes quedaban como caso cerrado), y el comando del proceso nuevo.
- Probado gratis: índice de bloques (Köln, PSV), ensayos de costo (lote 01: ~US$ 0,63 + categorización), `verificar.mjs` con datos sintéticos del test por página (Köln y Bournemouth cierran; Forest frena por el resultado). `Admin/lote-01.txt`: Bahia 2021-2023 y Athletic Club 2022-2023.

## Versión 323 — Etapa 6 en el tablero por grupo; test localizar-extraer-verificar con IA (2026-10-01)

- `cargar.mjs --lista` deja su última corrida en `Admin/cargar-ultimo.jsonl`; `estado.mjs` la muestra (6c) por grupo y motivo.
- Test de la etapa 4 por grupo (266 años cargados, gratis): la selección por palabras reproduce los ingresos de producción (±2%) en 7%, y "solo el estado principal y sus notas" en 11%.
- `tools/localizar-extraer.mjs` (nuevo, test): Claude localiza las páginas del estado de resultados y sus notas, extrae las filas tal cual y un script verifica (importe literal en la página, escala de la nota deducida del cierre, suma contra producción). 31 años: 5 bien descartados por no tener estado; de 26, ingresos 11 y gastos 18 a ±2% (palabras: 0-1 y 2); 1 de 1.117 importes no literal. US$ 3,52. `rutas.mjs`: sufijos `.localizar.json` / `.extraccion.json`.

## Versión 322 — Grupos de países en el tablero; escala: el "000" de adentro de un número; etapa 6 sobre 159 años nuevos (2026-09-30)

- `tools/grupos-pais.mjs` (nuevo): 12 grupos por marco contable (ARG, BRA, LAT, IBE, GBR, GER, BNL, NOR, EST, MED, ASI, OTR) y, por grupo y etapa, lo propio que ya se vio en documentos reales (pedido de Guido: partir la lógica por país).
- `estado.mjs`: qué tools hacen las etapas 2, 3 y 4; desglose por grupo debajo de cada estado y en la etapa 6; `--logica [grupo]`.
- `proponer-carga.mjs detectScale()`: el "000" de adentro de un número ("363,750,000.00", "$1.000.000") ya no dice "en miles" (Almagro 2023, Racing 2012). Sobre 199 años cargados reconstruidos: ingresos x1000 de más 40 -> 9, bien 71 -> 92. Escala única por documento probada en dos variantes y descartada (empeoraba 15 y 7 años: la prosa de la página engaña).
- Etapa 6 sobre `Admin/piloto-existentes.txt` (159 años nuevos de clubes existentes, categorizados por Guido): 0 cargan; 150 frenan por el cierre de sumas, por tablas que no son el estado de resultados (detalle por grupo y ejemplos en el HANDOFF).
- HANDOFF: reglas de trabajo de Guido (etapa y para qué al proponer un comando, ejemplos reales, siglas explicadas).

## Versión 321 — Etapa 3 = lo que carga la etapa 6; familia de etiquetas; memoria de respuestas pagas; fila de redondeo (2026-09-30)

- `pipeline.mjs` etapa 3: la lista de rubros (`.rubros.json`) pasa a ser la selección de `seleccionarFilas()` (lo que carga `cargar.mjs`) más cada renglón del estado que se abrió en una nota (`esAncla`); lista vieja solo si la selección falla (`seleccion.ok: false`). Medido en 719 documentos: de 17.266 filas categorizadas, 4.700 no se cargaban nunca y 3.068 que se cargaban no se categorizaban. Regenerado sin API: 429 con rubros (antes 407), 290 sin rubros; selección en 475, lista vieja en 244. Se conserva la glosa de etiquetas ya glosadas.
- `pipeline.mjs --solo-preparar` ya no corre la etapa 5 (bug: prometía "sin API" y después mandaba todo a Jev y Claude).
- `proponer-carga.mjs`: no abre en una nota el resultado del ejercicio, el impuesto a las ganancias ni el resultado financiero (van enteros al fiscalYearMeta); su nota se consume sin abrir y sus filas quedan como vistas. Una ventana con una fila de resultado del ejercicio no es desglose de nada. Un estado PRINCIPAL que repite importes ya vistos es una copia (Sandefjord 2019, controladora + consolidado de Brann y Parma). Cada fila lleva su sección. Contra la selección anterior (719 documentos, gratis): 85 cambian, ningún documento deja de cerrar contra un total impreso y 7 empiezan a cerrar.
- `vocabulario.mjs`: `FINANCIERO_RE`, `IMPUESTO_GANANCIAS_RE`, `IMPUESTO_SOLO_RE` (mudados desde cargar.mjs); "totaalresultaat", "resultaat (van het) boekjaar"; `claveFamilia()` / `mismaFamilia()`.
- Precedente por FAMILIA de etiquetas (`precedenteFamilia()` en categorizar-claude.mjs, usado también por cargar.mjs; pedido de Guido): sin número de nota, numeración, markdown ni traducción `<br>`, hasta 1 letra de diferencia (10+ caracteres) o 2 (20+); el paréntesis final (el sector) tiene que coincidir si las dos lo tienen. Contra producción (7.098 líneas): 110 líneas más con 96,4% de acierto con lado conocido; sin lado (antes no había precedente) exacto 99,7% y familia estricta 60 más con 100%.
- `tools/respuestas-cache.mjs` (nuevo): toda respuesta de Jev y de Claude por (club, lado, rubro) en `Generados/_cache/`; `jev-categorizar.mjs` y `categorizar-claude.mjs` no vuelven a preguntar lo ya contestado (`--sin-cache` sí). Resuelve pagar dos veces tras cada cambio de listas y que Jev no sea determinista. Sembrada con lo ya pagado: 12.348 respuestas de Jev, 977 de Claude.
- `cargar.mjs`: fila explícita "Diferencia de redondeo" cuando un total impreso difiere de la suma solo por redondeo (menos de media unidad impresa por fila; decisión 3 de Guido), y el resultado se vuelve a buscar con ella. Decisión 1 (Claude < 0,80 aunque cierre el resultado): no se carga; decisión 2 (`por-resultado`): se acepta, doble chequeo propuesto.
- `Admin/piloto-existentes.txt`: los 159 documentos con rubros de clubes que ya están en el sitio.

## Versión 320 — Etapa 6: `tools/cargar.mjs`, probada de punta a punta (2026-09-30)

- `tools/cargar.mjs` (nuevo): carga un año nuevo de un club existente; `--propuesta` / `--escribir` (reversión automática si audit.js da P0/P1, probada) / `--comparar`. Frena con motivo escrito si falta algo (anual, categorías al día, fx, liga, cierre de sumas contra los totales impresos). Backtest sobre 18 ejercicios cargados reconstruidos: 1 idéntico a producción (Alianza Lima 2023), 17 frenados con motivo, ningún número falso; PSV 2019-20 carga con `--umbral-claude 0.7`. Informe y lista de problemas de etapas anteriores: `Admin/tests/test-cargar.md`.
- `proponer-carga.mjs`: exporta `seleccionarFilas`, `briefingFor`, `loadSite`, `parseNumber` (el CLI no corre al importarse); marca el ancla de cada fila; `esNoPL()` descarta flujos de fondos y tablas de balance. `periodo.mjs`: reconoce temporadas "AAAA-AA" (nombreNoCoincide 226 -> 15).
- Gasto de API del test: ~US$ 1,60 (quedó en el log del worktree borrado, no en `Admin/claude-api/resultados.jsonl`).

## Versión 319 — Memoria de categorías: lo que Claude resuelve y Jev no sabía queda para la próxima (2026-09-30)

- Sembrada con 148 rubros de 61 documentos. Bug encontrado al sembrar: respuestas viejas traían el club equivocado (el Athletic Club brasileño como 'athleticclub', el de Bilbao) y los clubes nuevos tienen id provisorio: la memoria recalcula el club desde la carpeta del documento con `carpetas-clubes.mjs` al leer.
- `inventario-transcripciones.mjs --verificar --estado <x>`: revalida solo los de ese estado. Pasos gratis corridos: los 7 `sin-verificar` revalidados; los 43 validados sin preparar (memorias de más de 100 páginas, que `--max-paginas` dejaba afuera) preparados: 3 con rubros, 2 sin rubros, 38 `sin-tablas` (transcripciones viejas sin tablas: hay que rehacerlas con Mistral, pago).
- `tools/memoria-categorias.mjs` (nuevo) + `Admin/categorias-aprendidas.jsonl`: cada rubro que Claude por API categoriza con confianza >= 0,80 queda registrado (club, año, lado, rubro, glosa, categoría, confianza, motivo, qué decía Jev). Pedido de Guido: "debería quedar documentado para que Jev la próxima vez sepa".
- `categorizar-claude.mjs`: registra lo que resuelve; usa lo aprendido con >= 0,90 como PRECEDENTE del mismo club (escalón 0, gratis: el año siguiente no vuelve a pagar el mismo rubro) y lo aprendido con >= 0,80 como contexto y ejemplos. `jev-categorizar.mjs --listos`: lo aprendido entra entre los ejemplos parecidos que ve Jev. Lo cargado en el sitio siempre gana; los backtests no usan la memoria. `--sembrar` la llena con los `.categorias.json` ya hechos.

## Versión 318 — Tablero del inventario (`tools/estado.mjs`) y tools/ fuera del deploy (2026-09-30)

- `tools/estado.mjs` (nuevo, gratis): por estado, cuántos PDFs, qué significa, qué le falta, con qué comando se avanza y cuánto cuesta; detalle de los que tienen rubros (categorización al día, club en el sitio o nuevo, no anuales, reservas) y de las altas. `--actualizar` regenera el registro antes.
- `tools/estado.mjs` reorganizado por etapas del proyecto (1 conseguir ... 7 en el sitio), con los estados en 0 (pedido de Guido). HANDOFF reescrito al cierre de la sesión.
- `netlify.toml`: `rm -rf tools` (pedido de Guido: "no publiquemos tools"); ninguna página carga nada de `tools/`.

## Versión 317 — Los archivos generados salen de Clubes/: todo derivado vive en Generados/ (2026-09-30)

- `tools/rutas.mjs` (nuevo): la única regla de dónde vive un derivado de un documento. `Clubes/<País>/<Club>/` queda SOLO con el PDF y su `.md`; los derivados (`.briefing.json`, `.rubros.json`, `.jev.json`, `.categorias.json`, `.previo-*.md`, `.antes-sumas.md`, `.mistral-redo.md`, `.gemini-check.md`, `.claude-check.md`, `.t-*.md`) van a `Generados/<País>/<Club>/` con la misma ruta relativa (gitignoreado). `ubicar()` traduce las rutas viejas que guarda el historial.
- 17 tools pasaron de armar la ruta a mano (~45 lugares) a `derivado()`: los tres transcriptores (con `--out-suffix`), resolver, pipeline, prepare-onboarding, onboard, inventario, huellas, jev, categorizar-claude, glosar, proponer-carga, chequeos-gratis, revisar-reservas, test-motores.
- Mudanza (`node tools/rutas.mjs --mudar --aplicar`): 2.704 archivos movidos, ninguno borrado (varios son caché de APIs ya pagadas o evidencia de correcciones). Las 10 transcripciones `-mistral-test.md` del test de costo del 26/09, que estaban trackeadas, se movieron con `git mv` a `Admin/test-costo-transcripcion/mistral-test/`.
- Informes de tests (`Admin/test-*`, 37) a `Admin/tests/`; las tools que los escriben y los documentos vivos apuntan ahí. Quedan en `Admin/` `test-costo-transcripcion.md` (+ su carpeta) y `test-barridos.md` porque los citan `CLAUDE.md` y dos skills (mover sus referencias en las skills requiere el OK de Guido).
- Verificado: una "foto" sin API del estado (resumen, ensayos del pipeline, del resolver, de Jev y Claude, revisar-reservas, chequeos-gratis --prueba, gasto, periodo, altas) tomada con el código y los archivos de antes es IDÉNTICA a la de después.

## Versión 316 — Vocabulario contable en 29 idiomas en un solo módulo (2026-09-30)

- `tools/vocabulario.mjs` (nuevo): por concepto (título de estado de resultados, ingresos, gastos, impuestos, resultado, total al comienzo y al final, total de ingresos, resultado del ejercicio, flujo de efectivo, cambios en el patrimonio, saldo inicial, balance, total del activo/pasivo, columna de notas / código de fila) los términos en 29 idiomas (es, pt, en, de, fr, it, nl, da, no, sv, fi, cs, sk, pl, hr/bs/sr, sr cirílico, sl, hu, ro, bg, el, tr, ru, uk, zh, ja, ko, ar, he), con límites de palabra y UNA normalización (`normalizar()`). `pipeline.mjs`, `extract-table-rows.mjs`, `filas-rubro.mjs`, `proponer-carga.mjs` y `chequeos-gratis.mjs` toman el vocabulario de ahí; la lógica de cada tool no cambió.
- Bugs de vocabulario arreglados (medidos): "venta" encontraba "inventario" (91 tablas de notas de activo/inventario entraban como rubros); "oneri", "costi", "custo", "cost", "tulos", "ertr" dentro de otras palabras; la ı turca y el Hangul coreano nunca coincidían (Beşiktaş 0 -> 93 rubros, Jeju SK 0 -> 34); la columna "Код рядка" (código de fila ruso/ucraniano) se tomaba como importes; estados de resultados españoles que no entraban (Barcelona 2015-16 0 -> 49, Getafe 3 -> 55, Celta 2 -> 42); ligaduras de PDF ("Deﬁcit").
- Medido sobre 1.061 `.md` (Admin/test-vocabulario.md): documentos con estado de resultados 675 -> 684, `listo-para-jev` 621 -> 631, rubros 30.083 -> 30.949, rubros con lado 76% -> 81%, lado contradictorio con producción 4,90% -> 4,83%. Los 150 documentos que perdieron filas las perdieron por falsos positivos, flujo/patrimonio o totales reconocidos; los 17 que duplicaron son estados de resultados reales (revisados uno por uno). Re-preparados los 713 documentos del inventario (sin API). `chequeos-gratis.mjs --prueba` sigue en 196/196 errores reales detectados en páginas con números.
- Pendiente: Japón (14 documentos) sigue sin ningún estado de resultados reconocido; sv, fi, sk, pl, sr, sl, hu, ro, bg, ar y he están en el vocabulario pero sin documentos para medirlos. Los `.jev.json`/`.categorias.json` de los 404 documentos re-preparados quedaron desactualizados (la huella lo detecta): la próxima categorización los rehace (Jev + Claude por API).

## Versión 315 — Ligas y países de los clubes nuevos en el catálogo; liga por la categoría al cierre y nombres sin palabras genéricas (2026-09-30)

- `data/leagues.js`: 11 países (AT, CH, CN, CZ, EC, IT, KR, NO, PT, RU, TR) y 25 ligas (Serie A/B de Italia, Eliteserien, Primeira Liga, Süper Lig, K League, Eerste Divisie, League One/Two...) agregados ANTES de tener ejercicios cargados. Decisión de Guido ("no pasa nada si están vacías"), que cambia la regla del archivo ("ni una liga sin ejercicios"); anotada en el comentario. Verificado en el navegador: la pestaña Ligas las lista y una liga vacía muestra "todavía no hay ejercicios". ASSET_V 292 -> 293, generadores regenerados.
- `alta-club.mjs`: (1) temporada por "la categoría al CIERRE del ejercicio" (regla de la Versión 132): en una liga de temporada partida, un ejercicio que cierra entre julio y diciembre usa la temporada que empezó ese año (antes Atalanta 2020, Sassuolo 2021, Genoa 2022, Thun 2019 y los rusos recibían la anterior); (2) nombres comparados sin palabras genéricas (FC, AC, SK, NFC...) y una coincidencia parcial ÚNICA en la temporada vale ("AC Milan" = "Milan", "OFI Crete" = "OFI", confirmado por Guido); (3) `data/leagues.js` en la huella del registro de altas. Liga resuelta: 17 -> 63 de 150 carpetas con `.md`; ninguna duda de nombre pendiente.
- Rosters: 146 liga-temporadas de 13 países más (`tools/club-league-reference/`); "co-primeraa" unificada con "co-primeraA".
- Bug encontrado: correr `alta-club.mjs --todos` SIN `--claude` descartaba del registro las respuestas de Claude ya pagadas (quedaban 12 de 36). Recuperadas desde git y recalculado con `--claude --tope-usd 0` (reusa sin pagar): 78 listos para alta. Arreglado: las respuestas anteriores viajan en `claudeAnterior` hasta que una corrida con `--claude` las reemplace.

## Versión 314 — Período de cada documento leído del contenido: trimestral, semestral, anual calendario o temporada (2026-09-30)

- `tools/periodo.mjs` (nuevo, gratis): tipo de período (anual calendario / temporada, trimestral, semestral, nueve meses, bimestral, intermedio, otro), meses, cierre y la cita que lo sostiene, leídos de los TÍTULOS de las primeras páginas en ~15 idiomas ("three months ended", "Üç Aylık Ara Hesap Dönemi", "01.01.2018 bis 30.06.2018", "13 month period ended"); avisa si el nombre del archivo dice otra fecha. `--grupos` lista por club y año los períodos parciales para juntarlos cuando lleguen los demás.
- Primera versión medida sobre 2.249 `.md`: 58 "intermedio" casi todos falsos ("intermediação de atletas", "segundo semestre" en prosa). Con frases completas y solo títulos: 16 no anuales, todos casos reales (Galatasaray T1 2019, América trimestral, Osasuna intermedios, RB Leipzig y OH Leuven 6 meses, Westerlo 18, Midtjylland y Wolves 13, Gaziantep 7) + 2 dudosos (U. de Chile anual con columnas trimestrales, Real Madrid).
- `inventario-transcripciones.mjs`: campo `periodo` por PDF en `Admin/transcripciones-estado.jsonl`.

## Versión 313 — La aritmética decide las páginas "con reserva": sumas verticales y horizontales (2026-09-30)

- `chequeos-gratis.mjs`: `respaldoFilas()` (nuevo): en tablas de movimiento (saldo inicial + altas - bajas = saldo final) una celda es igual a una combinación con signo de las demás de su fila. `respaldoSumas()` exportada.
- `resolver-inventario.mjs`: el desempate por aritmética usa celdas respaldadas por sumas verticales y horizontales (antes `tieScore()`, que solo veía filas "total" y había decidido 2 de 1.190 páginas); gana la lectura que le saca >= 3 celdas a la segunda. También se aplica cuando Gemini rechaza la página y solo quedan dos lecturas (antes ganaba Claude directo, con reserva).
- `tools/revisar-reservas.mjs` (nuevo, gratis): aplica ese criterio a los documentos ya resueltos. Sobre 163 páginas con reserva (31 documentos): 44 confirmadas por sumas, 10 CORREGIDAS (la lectura anterior cerraba sumas y la elegida no; Rubin Kazan 2025 págs. 14 y 32 entre ellas), 109 siguen con reserva. Aplicado; el `.md` anterior queda en `<nombre>.antes-sumas.md` (gitignoreado).

## Versión 312 — Piloto D: estados de resultados sin título en la tabla, etiqueta en la segunda columna, flujo de efectivo y patrimonio fuera, lado en ucraniano/checo/turco (2026-09-30)

- Piloto D (`Admin/piloto-d.txt`, 10 PDFs): US$ 1,73 de transcripción y validación + US$ 0,42 de categorización; PDFs con texto validados 100% gratis (Athletic Club, Fortaleza CEIF, Vitória Guimarães, Rubin 2023: 0 páginas a Claude); las carpetas que antes caían en otro club resolvieron bien; 69% de rubros categorizados solos (bajado por los formularios en cirílico, con muchas filas que no son rubros).
- `extract-table-rows.mjs`: en formularios oficiales (checo, ucraniano, ruso) la primera columna es un código ("I.", "A.") y el rubro está en la segunda: se toma la segunda como etiqueta. Nuevo `filasDeResultados` (>= 3 filas con palabras de ingresos/gastos); NO cambia `likelyRelevant` (probado así: Real Madrid 32 -> 253 rubros, Polissya 0 -> 200).
- `pipeline.mjs`: una tabla con filas de resultados en una página cuyo TÍTULO (línea corta fuera de tablas) es de estado de resultados cuenta como estado de resultados (Baník 1997: 3 -> 31 rubros; Polissya 0 -> 56; Galatasaray 0 -> 48). Los estados de flujo de efectivo y de cambios en el patrimonio se excluyen (Karpaty 60 -> 41).
- `filas-rubro.mjs`: palabras de ingreso/gasto en ucraniano, checo y turco (filas con lado: Karpaty 11 -> 24 de 41, Polissya 12 -> 26).
- Pendiente anotado: Fortaleza CEIF 2025 trae solo notas (sin estados) pero la nota 19 abre los ingresos; hoy queda `sin-rubros`.

## Versión 311 — Registro de altas por script y preguntas del alta resueltas por Claude con cita verificada (2026-09-30)

- `tools/altas-registro.mjs` (nuevo) + `alta-club.mjs --todos`: `Admin/altas-club.jsonl`, una línea por carpeta de club nuevo con estado (`listo-para-alta` / `con-preguntas` / `faltan-datos` / `existe`), preguntas, pendientes y la huella de sus entradas (`.md`, series de fx, rosters, `data/clubs.js`); si algo cambia, se recalcula solo. `pipeline.mjs --resumen` lo muestra. Hoy, de 212 carpetas: 77 listos para alta, 63 con preguntas, 72 esperando datos (63 sin `.md`).
- `tools/alta-claude.mjs` (nuevo, `alta-club.mjs --claude`): las preguntas del alta (perímetro, tipo de documento, cierre, moneda, nombre legal) van a Claude por API, una llamada por club, y cada respuesta tiene que traer una cita textual que el script verifica en la página del `.md`; sin cita verificada no se da por resuelta. Backtest sobre 13 club-años cargados: 60/62 coinciden con producción (los 2 restantes son de convención de nombre), 71/71 citas verificadas, US$ 0,088 por club. Corrida real: 36 carpetas, US$ 1,73, 17 pasaron a listo. `--dudas` lista lo que queda (12, casi todo criterio de perímetro); no escribe en `dudas-por-club.md`. Informe: `Admin/test-altas-claude.md`.
- La liga ya no bloquea el alta (queda `null` con nota); `alta-club.mjs` usa `carpetas-clubes.mjs`; rangos plausibles de fx ajustados a las series reales (TRY [0,5; 70]).

## Versión 310 — Lotes de Claude de hasta 8 páginas (2026-09-30)

- `resolver-inventario.mjs`: Claude recibe como máximo 8 páginas por llamada. Una página densa de escaneo son ~2.300 tokens de salida (Real Madrid 2005-06: 18 páginas = 41.763 tokens, US$ 0,45) y el tope es 64.000: con lotes de 18-25 páginas un intento se cortaba por `max_tokens`, se pagaba y se tiraba. El costo por página no cambia.

## Versión 309 — Una sola regla carpeta -> club, vigilada por audit.js; el registro marca lo pagado sin .md (2026-09-30)

- `tools/carpetas-clubes.mjs` (nuevo): el club de `Clubes/<País>/<Club>/` sale de la cita en `data/<id>-data.js`, y si no la hay, de un nombre IGUAL entre los clubes del mismo país; si no, es club nuevo. `onboard.mjs` (y con él `--quien`, el registro y el pipeline) la usa en vez de `guessClubId()` (substring, sin país).
- Medido con la regla vieja: 17 carpetas de clubes del sitio quedaban ambiguas (Racing = Racing Club y Genk; Nacional = Internacional y Atlético Nacional) y 11 caían en un club EQUIVOCADO (Porto -> Grêmio, Inter -> Internacional, Lazio y Rubin Kazan -> AZ, Braga -> Bragantino, Vitória Guimarães -> Vitória, Independiente Rivadavia -> Independiente). En el registro: 15 PDFs figuraban "ya cargados" sin estarlo y 87 figuraban pendientes estando cargados (316 -> 388 cargados).
- `audit.js`: P1 `carpeta-club-ambigua` (salvo carpetas de agregado `_*`), P2 `club-sin-carpeta`.
- `inventario-transcripciones.mjs`: un `sin-md` con transcripción de Mistral registrada dice "PAGADO SIN .md" en el detalle (21 PDFs).
- Tipos de cambio locales para NOK (Norges Bank), CZK (ČNB), TRY (TCMB), RUB (Banco de Rusia), UAH (NBU), CHF y KRW (Reserva Federal H.10), 2000-2026, en `tools/fx-reference/` (`fetch-fx-reference.mjs`, `lookup-fx-close.js`, `alta-club.mjs`). Verificados contra los tipos declarados en Krasnodar 2020/2021 y Fenerbahçe 2020 (exactos) y contra el BCE día por día (mediana < 0,3%; las diferencias grandes son crisis o tipos oficiales fijos).

## Versión 308 — La etapa 5 solo toca los documentos de la corrida; resultados derivados con huella; lotes de Claude que exceden el tope se parten (2026-09-30)

- Bug del piloto C: la etapa 5 del pipeline tomaba TODOS los `listo-para-jev` del inventario; `categorizar-claude.mjs` mandó 44 documentos a Claude (US$ 1,90) con `.jev.json` hechos sobre la lista de rubros anterior a la Versión 307 antes de que se cortara. Ahora `pipeline.mjs` pasa `--lista` (los documentos de la corrida) a `glosar-rubros`, `jev-categorizar` y `categorizar-claude`.
- `tools/huellas.mjs` (nuevo): `.jev.json` guarda la huella de su `.rubros.json`, y `.categorias.json` la de los dos. Una etapa rehace su salida si la huella falta o no coincide; Claude no recibe un documento cuyo `.jev.json` está desactualizado. Los documentos preparados sin categorizar entran solos en la siguiente corrida (`needsCategorize`).
- `resolver-inventario.mjs`: un lote que Claude corta por `max_tokens` se reparte en mitades (Real Madrid 2005-06: 18 páginas densas en un lote dejaban el documento en `revisar`).
- `glosar-rubros.mjs --listos` ya no saltea las listas con un `.jev.json` viejo.
- Piloto C: el estado de resultados ucraniano en nominativo ("ФІНАНСОВІ РЕЗУЛЬТАТИ") y el turco ("Kar veya Zarar", "Hasılat") no se reconocían (Polissya y Galatasaray quedaban `sin-rubros`): regex en `pipeline.mjs`, `proponer-carga.mjs` y `extract-table-rows.mjs`. El año de un club que `onboard.mjs` no identifica se tomaba del PRIMER año del nombre ("2023-24" -> 2023): ahora el de cierre, misma regla que `guessYear()`. `gasto.mjs` ya no cuenta dos veces el Mistral que el resolver hace adentro de la validación.

## Versión 307 — Validación paga solo en páginas con números y dudosas, Claude después de Jev, alta de club por script, tabla por ancla, lado corregido (2026-09-30)

- `tools/paginas-con-numeros.mjs` (nuevo, gratis): decide con el `.md` de Mistral qué páginas tienen cifras de carga. Sobre 222 ejercicios cargados elige el 58% de las páginas y cubre el 99,7% de los importes de producción. Con `pdftotext` rinde menos y no sirve en el 23% de los PDFs (escaneo o mojibake). Informe: `Admin/test-seleccion-paginas.md`.
- `tools/chequeos-gratis.mjs` (nuevo, gratis): cascada por página (texto del PDF, sumas de la tabla, columna del año anterior en producción, balance). Sobre 104 documentos ya resueltos: 163 de 163 páginas con números con error real quedan `dudosa`, ahorro ~49% del costo. La regla "una tabla que cierra valida la página" se descartó (dejaba pasar 37 páginas con error). Informe: `Admin/test-chequeos-gratis.md`.
- `resolver-inventario.mjs`: Gemini y Claude solo reciben las páginas `dudosa` de la cascada; la prosa no se paga. Bug arreglado: en un escaneo con lista de páginas chica, Gemini recibía el PDF entero.
- `tools/categorizar-claude.mjs` (nuevo) y etapa 5b de `pipeline.mjs`: precedente del club, Jev >= 0,90, y el resto a Claude por API (Opus 5.5, una llamada por documento, con las líneas ya cargadas del club); se acepta >= 0,80. Backtest sobre 3.975 rubros: 80,2% automático con 94,5% de acierto (Jev sola: 69,4% con 94,4%), ~US$ 0,015 por documento. Deja `<md>.categorias.json`. Informe: `Admin/test-categorizar-claude.md`.
- `tools/alta-club.mjs` (nuevo): propone la entrada de `data/clubs.js`, moneda, cierre del ejercicio, tipo de cambio, liga, perímetro; `--escribir` solo sin preguntas abiertas, con reversión si `audit.js` da P0/P1. Sobre 141 clubes nuevos: 75% de campos `ok`, 39% escribibles hoy. Todavía no está en el pipeline (el alta va con la carga del primer año). Informe: `Admin/test-alta-club.md`.
- `proponer-carga.mjs`: estrategia `--tabla ancla-listas` (default): carga la nota cuyas filas suman la línea del estado de resultados. Sobre 92 ejercicios: ingresos bien ubicados 54% -> 64% (mediana 63% -> 77%), ingresos cargados de más 53% -> 20%; gastos sin cambio (55%). Informe: `Admin/test-eleccion-tabla.md`.
- `filas-rubro.mjs` + `pipeline.mjs`: lado ingreso/gasto corregido (resultados con palabra de gasto, columna "Notas" tomada como importes, "rendimentos"). Contra producción, 913 filas: contradicciones 67 -> 27. `pipeline.mjs` usa `columnaDeImportes()`; `--repreparar` ya no crea marcas `sin-tablas`.
- `tools/gasto.mjs` (nuevo, gratis): gasto por motor, día y documento; lista lo pagado cuyo `.md` no está en disco (25 transcripciones, US$ 5,01). Cuenta una sola vez las validaciones que el pipeline vuelve a escribir.
- Gasto de API de los tests: Claude US$ 5,62, Mistral US$ 2,75, Jev ~US$ 0,3.

## Versión 306 — Piloto de 9 documentos de punta a punta: Gemini página por página, PDFs dañados, filtro de filas, lado por estructura, glosa para Jev (2026-09-30)

- `tools/reparar-pdf.mjs` (nuevo): diagnostica y arregla PDFs antes de gastar API. `qpdf` reconstruye los dañados recuperables; las páginas con imágenes de más de 8000 px (Thun: 128x105.696, Mistral respondía HTTP 400) se rasterizan en una copia; un PDF truncado (PEC Zwolle) queda como `no-es-pdf` con el link de `fuentes/` para volver a bajarlo. Conectado a `mistral-ocr-transcribe.mjs` y a `resolver-inventario.mjs`. Thun 2019 verificado: 20 de 20 páginas por $0,08.
- `resolver-inventario.mjs`: cuando Gemini rechaza un documento entero por RECITATION (124 de 141 fallos registrados), se prueba página por página (medido: Ituano 7/8 aceptadas, Alverca 21/29, Start 17/17, Sandefjord 16/16) y Claude recibe solo las rechazadas. Antes recibía el documento entero (~$0,016 por página contra ~$0,003 de Gemini).
- `pipeline.mjs`: la etapa 5 usaba el registro viejo y los documentos preparados en la misma corrida quedaban sin categorizar hasta la siguiente; ahora lo regenera antes. `--repreparar` ahora sí rehace los que ya tenían lista de rubros. `STATEMENT_RE` no reconocía "Rendimentos e gastos" (SNC portugués): Alverca quedaba con 0 rubros.
- `tools/filas-rubro.mjs` (nuevo, gratis): descarta filas que no son rubros (números sueltos, subtotales detectados por suma, resultados, metadatos) y deduce el lado ingreso/gasto por la estructura de la tabla. Rosenborg pasó de 10 a 57 filas con lado.
- `tools/glosar-rubros.mjs` (nuevo, ~$0,001 por documento): glosa en español de cada rubro para que la búsqueda de ejemplos parecidos funcione en idiomas que el sitio no tiene. Sobre 7 documentos: Jev con confianza >= 0,90 pasó de 30% a 39,5%.
- `proponer-carga.mjs`: `--solo-totales`, `--sin-filtro`, `--con-escape`, `--etiqueta`. Hallazgo: el 14% de "total impreso = oficial de producción" no es un bug del detector, en 23 de 35 ejercicios el total de producción no está impreso (definiciones curadas: Dortmund usa HGB de la KGaA, Fluminense suma las líneas ordinarias). Ofrecerle `no_es_rubro` a Jev no ayudó (68% / 60% contra 67% / 60%).

## Versión 305 — Inventario de transcripciones: registro de quién hizo cada `.md`, validación gratis contra el texto del PDF, y resolución paga solo de las páginas dudosas (2 pilotos, 21 documentos)

- **`tools/verify-numbers.mjs`**: compara los números de un `.md` contra el texto interno del PDF (`pdftotext`),
  sin depender del formato de tablas. Detecta cifras mal leídas (dígito distinto, mismo largo) y `.md`
  incompletos; "no aplica" en escaneos o texto ilegible (cobertura < 25%). Bugs encontrados al calibrarlo:
  pegaba columnas contiguas (`133.816 189.064` como un solo número) y una referencia de nota con su importe
  (`13 228.106`); ignora cifras redondas al buscar "casi iguales".
- **`tools/inventario-transcripciones.mjs`**: registro `Admin/transcripciones-estado.jsonl` (regenerable): por
  cada PDF con `.md`, motor/modelo/fecha/costo de quien lo hizo (de los logs de las APIs; "legado" = anterior a
  las APIs), otras versiones que existen, si el ejercicio ya está cargado y estado de validación (`cargado`,
  `listo`, `revisar`, `pendiente-segunda-voz`, `reintentar`, `sin-verificar`). Las validaciones se guardan en
  `Admin/transcripciones-verificaciones.jsonl` (solo se agrega, con hash del `.md`: si el archivo cambia, el
  estado vuelve solo a sin-verificar). NO se escribe dentro de los `.md`. Resultado inicial sobre 2.166 PDFs
  con `.md`: 276 cargados, 598 listos sin gastar API, 561 a revisar, 730 escaneos pendientes de segunda voz.
  Hallazgo: los `.md` viejos (Tesseract/subagentes) tienen cifras mal leídas en ~42% de los casos con texto,
  también entre los ya cargados (el dato del sitio se corrigió a mano; el `.md` quedó con el error).
- **`tools/resolver-inventario.mjs`**: la fase paga, con `--ejecutar` (sin él es un ensayo con estimación de
  costo), `--dir`, `--lista`, `--limit`, `--estado`, `--concurrencia`. Claude ve SOLO las páginas dudosas
  (recortadas con qpdf). PDF con texto: páginas cuyos números no cierran con el texto del PDF -> Claude -> revalida;
  si sigue mal o más de la mitad no coincide, el texto del PDF no es confiable y pasa a comparar voces.
  Escaneo: Gemini entero como segunda voz -> Claude solo en páginas que difieren -> voto entre voces por página
  (un número gana si está en 2 voces) -> cuarta voz (Mistral, solo en esas páginas) si sigue sin consenso; si
  Gemini rechaza por RECITATION, Claude transcribe entero y Gemini desempata página a página; si también rechaza
  la página, gana Claude y queda como `reserva` (cerrar con sum-check al onboardear). Cada página reemplazada
  queda registrada con su motor. Fallos por crédito/límite/red: espera con backoff creciente y reintenta el MISMO
  motor, deja el documento en `reintentar` y corta la corrida tras 3 seguidos.
- **`tools/test-motores.mjs`** + `Admin/test-motores-lista.txt` / `test-motores-resultados.md`: test de los 3 motores
  sobre 15 PDFs. Claude por API: 15/15, 0 bloqueos, ~$0,016/pág.; Gemini rechazó 7/15 (5 de 6 escaneos, incluidos
  balances numéricos, no solo memorias); Mistral leyó mal cifras en Ponte Preta aunque el PDF tiene texto.
- **`tools/compare-transcripts.mjs`**: ignora la columna "Nota", celdas vacías, símbolos de moneda y una columna de
  más en un lado (antes: ~280 discrepancias falsas en 15 documentos, ahora 33, casi todas errores reales del `.md` viejo).
- **`tools/claude-api-transcribe.mjs`**: parte PDFs de más de 25 páginas o más de 20 MB en tramos (antes una memoria
  de 88 páginas se guardó cortada en la 46 sin avisar); nunca guarda una transcripción truncada por `max_tokens`;
  `qpdf` código 3 (éxito con advertencias) ya no cuenta como fallo.
- Bugs del piloto ya corregidos: decidir por página aceptaba un error de Claude cuando Mistral y Gemini coincidían
  (Almagro 2018); texto de PDF roto (Ferro 121, Cuiaba) gastaba Claude en vano; PDFs de 34 MB superaban el límite de
  la API (Temperley: una página de 25 MB se rasteriza a 130 dpi -> 170 KB).
- Pilotos: 21 documentos de 14 países, todos `listo` (algunos con `reserva`), ~$5,20 de API.
- **Bugs de las tools de onboarding encontrados corriéndolas (gratis) sobre los 21 documentos del piloto:**
  - `tools/onboard.mjs` `guessYear()`: una fecha ISO en el nombre (`...-2025-12-31.pdf`) se leía como el rango
    "2025-12" -> **2012**, y `2011-06-30` como 2006. Efecto real: **26 ejercicios ya cargados** (Bélgica 2025-06-30,
    Dinamarca, etc.) figuraban como pendientes, así que un `--all` los habría re-transcripto y pagado de nuevo. Corregido
    (fecha ISO = año de cierre; un sufijo de 2 dígitos solo es rango si es el año siguiente). Cargados en el registro: 276 -> 302.
  - `tools/prepare-onboarding.mjs` tie-out: en un balance con jerarquía sumaba subtotales Y sus rubros (cada peso dos veces:
    la "diferencia" daba exactamente el total). Ahora, si no cierra, prueba sin las filas en negrita y solo con ellas
    (cierre exacto obligatorio), y tolera ±redondeo en documentos de importes enteros. Fallos falsos en los 21: 244 -> 107;
    los que quedan son totales encadenados/jerárquicos sin negrita (límite conocido), y las cuentas de los documentos cierran a mano.
  - `tools/extract-table-rows.mjs` `RELEVANT_KEYWORDS`: solo reconocía ingresos/gastos en ES/IT/EN/NO/GR sin acentos, así que en
    balances en alemán, croata, francés/neerlandés, danés y portugués no marcaba NINGUNA tabla como relevante y el precedente de
    categorías se omitía en silencio (0 de 13-35 tablas en Mönchengladbach, Hamburger, Dinamo, Gorica, Anderlecht). Ampliada y
    comparada sin acentos/diéresis: pasan a 2-12 tablas relevantes y calculan precedente.
  - Probado y DESCARTADO (revertido): ignorar en `suggest-category-precedent.mjs` las palabras genéricas de un club para el nivel
    PARECIDO. No arregló el caso real (Dinamo: "Prihodi od ulaznica" = entradas, emparejado con derechos de TV "Prihodi od prava
    emitiranja" al 50%) y empeoró Ferro (más emparejamientos entre ingreso y egreso del mismo nombre). PARECIDO seguirá siendo baja
    confianza por diseño; la mejora de fondo es Jev (to-do 99).
  - Piloto de 44: los `Syntax Error` que inundaban la terminal eran mensajes de poppler (`pdftotext`/`pdfinfo`) leyendo PDFs
    dañados, no bugs del código; `execFileSync` los heredaba a la pantalla. Ahora se silencian (`stdio` sin stderr). Bug real
    del mismo piloto: `qpdf` devuelve código 2 en un PDF dañado (DNCG Francia 2018-19) y el resolver lo marcaba `revisar`;
    ahora cae a `pdfseparate` + `pdfunite` (poppler, más tolerante).
  - **`tools/pipeline.mjs`: el comando único de punta a punta** (`node tools/pipeline.mjs --ejecutar [--limit N] [--dir ...] [--lista ...]`,
    sin `--ejecutar` es un ensayo con estimación de costo; `--resumen` muestra el estado sin correr nada). Toma los PDFs no cargados en
    el sitio que no tienen `.md` o tienen uno sin confirmar; Mistral transcribe los que no tienen; `resolver-inventario.mjs` valida; las
    tools gratis de onboarding preparan la lista de rubros; y deja `<md>.rubros.json` (gitignoreado) con la marca `listo-para-jev`, o
    `sin-rubros` (actas, memorias narrativas). NO categoriza rubros (eso es Jev, to-do 99). Probado de verdad con 3 documentos
    (uno sin `.md`, uno sin confirmar, uno ya validado). El registro pasó a incluir los PDFs sin `.md` (estado `sin-md`, 1.178) y el campo `jev`.
  - Consenso entre voces en una página, en este orden: mayoría -> **parche de dígitos por mayoría** (cifra que ninguna otra voz tiene y casi
    igual a una que tienen 2 -> se corrige el dígito) -> cuarta voz (Mistral) -> **aritmética del documento** (gana la versión cuyas
    sumas cierran, vía prepare-onboarding) -> Claude con `reserva`. Un `revisar` por "sin consenso" ya solo queda si no hay versión de Claude.
  - Primera corrida real del pipeline (50 documentos): los 4 primeros eran informes anuales de Borussia Dortmund de 224-244 páginas en
    paralelo; Gemini tiene un tope de 150 s y de tokens de salida, así que daba timeout seguro y gastaba reintentos. Arreglado:
    documentos de más de 40 páginas se transcriben por tramos de 20 (Gemini y Claude), timeouts proporcionales, `--max-paginas 100`
    por defecto (los más grandes quedan aparte, `--max-paginas 0` los incluye) y un lote con `--limit` toma una muestra repartida
    por tamaño en vez de los N primeros del listado.
  - Resolver, PDF con texto y más de la mitad de las páginas sin coincidir con el texto del PDF: antes se asumía que el texto del PDF
    era el roto y se pasaba a Gemini + Claude (visto en la corrida de 50 con `.md` viejos de Tesseract, incluso de 1 página). Ahora
    primero se hace una lectura fresca con Mistral (~$0,004/pág.): si esa sí coincide, el `.md` viejo era el malo y se lo reemplaza
    (el original queda en `.previo-*.md`); solo si tampoco coincide se comparan voces.
  - Resolver, PDF con texto: el veredicto final ya no es el chequeo global (que contaba como "cifras sin respaldo" las de páginas-imagen sin
    texto en el PDF y, por coincidencias de un dígito con cifras de otras páginas, las tomaba por lecturas mal hechas: Gent, Charleroi,
    Sint-Truiden mandaban el documento ENTERO a Gemini + Claude). Ahora es por página: las páginas con texto se verifican contra el texto
    del PDF (una cifra de Claude ausente en el PDF solo es sospechosa si se parece a una que sí está); las páginas SIN texto en el PDF
    (imágenes dentro de un PDF con texto), y aquellas donde Claude discrepa de todo, pasan al camino de voces SOLO ellas. Si el `.md`
    viejo y Claude leyeron igual y el texto del PDF difiere, se acepta (es el texto del PDF).
  - Casos nuevos de la primera corrida del pipeline: (1) **`.pdf` que no es PDF** (2 en Clubes/: Unión Magdalena, un HTML de 38 KB guardado como
    .pdf; DNCG Francia 2014-15, 2,9 MB sin cabecera): el resolver los marca `no-es-pdf` (no reintenta) para volver a conseguir el documento.
    (2) **Un motor que devuelve menos páginas que las pedidas** (Aston Martin F1, Claude: 12 de 20): antes fallaba todo el documento; ahora
    reparte el lote en mitades y reintenta, y una página sola que vuelve vacía se toma como página en blanco.
  - **`tools/jev-categorizar.mjs`: la etapa de Jev** (API de typesafe.ai, ~$42 por mil millones de tokens; 0 tokens de Claude Code). `--backtest`
    toma rubros de ejercicios YA CARGADOS (3.975 rubros únicos de 164 clubes), cuya categoría real ya decidió una sesión humana, se los
    pregunta a Jev sin mostrársela y deja `Admin/test-jev-resultados.md`: acierto total, por banda de confianza, errores con confianza
    ≥ 0,70 (el caso peligroso para una integración automática), acierto por categoría. `--listos` categoriza los `<md>.rubros.json` de los
    documentos `listo-para-jev` y deja `<md>.jev.json` (gitignoreado). El lado (ingreso/gasto) no se le dice: se le ofrecen las 26
    categorías juntas (`--lado-conocido` las separa). Las descripciones de las categorías salen de `data/category-map.js`. Probado con 6 rubros reales.
  - **Backtest de Jev completo** (3.975 rubros únicos ya cargados, 164 clubes; informes en `Admin/test-jev-resultados*.md`): sin ayuda 69,5%
    (90,3% en la banda de confianza ≥ 0,90); diciéndole el lado (ingreso/gasto) 74,2% (93,0%); lado + 8 ejemplos parecidos ya categorizados
    86,6% (95,9% en la banda alta, que cubre el 72% de los rubros); lado + ejemplos SOLO de otros clubes (el caso de un club nuevo) 83,0% (94,4%,
    69% de los rubros). Los errores que quedan son sobre todo entre catch-alls (`admin_general_expense` <-> `other_expenses`) y convenciones
    propias de cada club. Conclusión: sirve como primer piso con la banda alta, pero un ~5% de error en esa banda no alcanza para aceptar sin un
    segundo control. `--listos` ahora usa lado (cuando el documento lo indica) y ejemplos por defecto.
  - `tools/pipeline.mjs`: `<md>.rubros.json` ahora lleva el `lado` de cada tabla (por palabras del título y las columnas en varios idiomas; 49% de
    los rubros lo traen) y un documento solo es `listo-para-jev` si tiene un **estado de resultados** (o de recursos y gastos) con al menos 5 rubros;
    si no, `sin-rubros` (272 de los 304 `sin-rubros` no tienen ninguno: actas, dictámenes, certificaciones, memorias narrativas). Nuevos flags:
    `--solo-preparar` (solo la preparación gratis, sin API), `--repreparar` (rehace documentos que ya la tenían). Corrida sin API sobre los 640
    documentos validados: 336 `listo-para-jev`, 304 `sin-rubros`.
  - **`tools/proponer-carga.mjs` (etapa 5, versión 0, solo mide; no escribe nada del sitio)** + `onboard.mjs --quien <pdf>` (a qué club/año corresponde un PDF,
    aunque ya esté cargado). Primer backtest sobre 40 ejercicios ya cargados: 0% de aciertos en total de ingresos y resultado; 53% arma alguna propuesta,
    7% de cobertura de los rubros de producción. Es un resultado útil, no un bug: (1) los `rawLabel` de producción son agrupaciones curadas a mano, no
    filas literales del documento, así que el precedente por texto exacto casi nunca coincide; (2) elegir la tabla correcta y la columna del año es la parte
    difícil; (3) la detección de escala por palabras da falsos positivos (Volta Redonda: dividió por 1.000 un documento en unidades). Siguiente versión:
    escala por plausibilidad contra la historia del club, tablas elegidas por chequeo de sumas, rubros categorizados con Jev y comparación a nivel de
    total por categoría (no por texto de rubro).
  - **Segundo lote de 50** (24 `listo-para-jev`, 25 `sin-rubros`, 1 `no-es-pdf`; $11,58). Casos nuevos y arreglos: (1) **el 82% de los `.md` viejos (778 de 954) no
    tiene NINGUNA tabla** (0 líneas con `|`; etiquetas e importes en bloques separados, típico de Bélgica y Argentina): sus números validan contra el PDF pero no
    sirven para rubros, sumas ni categorías. El resolver ahora los rehace con Mistral (~$0,004/pág.) si el nuevo tiene tablas (el viejo queda en `.previo-*.md`), y el
    pipeline marca `sin-tablas` para que la próxima corrida lo haga (una sola vez, `formatoIntentado`). (2) Documentos en ruso/ucraniano, checo, neerlandés, japonés,
    coreano y chino no reconocían sus tablas de resultados: ampliadas las palabras clave (`extract-table-rows.mjs`) y la detección de estado de resultados y de lado
    (`pipeline.mjs`). (3) Unión Magdalena figuraba `sin-md` en vez de `no-es-pdf` y consumía un lugar en cada lote. (4) **Jev es la etapa 5 del pipeline**
    (`--sin-jev` la saltea). Nuevo `Admin/MAPA-DE-TOOLS.md`: qué es cada archivo de `tools/`.
  - **`proponer-carga.mjs` versión 1** (escala por plausibilidad contra la historia del club, filas categorizadas con Jev con lado y ejemplos que EXCLUYEN el ejercicio
    reconstruido, comparación por categoría; `--mistral-fresco` usa una transcripción nueva con tablas). Backtest de 40 ejercicios cargados: con el `.md` guardado (casi sin
    tablas) 75% arma propuesta, dinero bien ubicado 45% ingresos / 26% gastos; con Mistral fresco 88% arma propuesta, el total de ingresos oficial se detecta en 14%, el
    resultado en 17%, y el dinero bien ubicado (solo filas con Jev >= 0,90) es 67% ingresos / 60% gastos. Conclusión: la carga 100% automática todavía no es viable; lo
    que falta es sobre todo detectar de forma robusta los totales impresos (son la puerta de aceptación) y no la categorización.
  - Documentación de traspaso para sesiones nuevas: `Admin/HANDOFF-pipeline.md` (estado, decisiones de Guido, números medidos, qué falta), `Admin/MAPA-DE-TOOLS.md`, cabecera de `pipeline.mjs` con las 7 etapas y snapshot en `Admin/ESTADO.md`. Nuevo to-do 109 (ordenar las carpetas del proyecto).
  - Bug: `inventario-transcripciones.mjs` contaba como "cargado" todo lo que `onboard.mjs --all` no listaba, incluidos los documentos
    con briefing al día (lo que el propio pipeline prepara). `ONBOARD_IGNORE_BRIEFING=1` separa las dos cosas.
  - Jev (typesafe.ai): API `POST https://api.typesafe.ai/v1/systemone`, `Authorization: Bearer`, cuerpo `{state, model:"jev-latest",
    questions:{<nombre>:{type:"choice", instructions, criteria:{<categoría>:<descripción>}}}}`; devuelve `choice`, `confidence` y
    `probabilities`. Docs: https://docs.typesafe.ai/ (índice en `/llms.txt`). Categorizar rubros NO es parte del pipeline actual.


## Versión 304 — `tools/claude-api-transcribe.mjs`: la 3ra API conectada de verdad (Claude, API directa), y el paso 2 del HTML al día

- **`tools/thirdapi-transcribe.mjs` (placeholder de la Versión 301) renombrado a `tools/claude-api-transcribe.mjs`
  y conectado de verdad**: Guido decidió Claude como 3ra API. Llama a `POST /v1/messages` con el PDF
  adjunto (`claude-sonnet-5-5`, $2/$10 por MTok) por HTTP crudo con `fetch()` (sin SDK, mismo
  criterio que Mistral/Gemini: este proyecto no tiene `package.json` ni `node_modules`, a propósito),
  **streameado** (no una espera simple) porque una transcripción completa puede generar decenas de
  miles de tokens de salida y a la velocidad normal de generación eso puede tardar varios minutos —
  una respuesta no streameada se corta sola antes de terminar. Mismo prompt, mismo formato de
  resultado/fallidos.jsonl y mismo chequeo de fidelidad que `gemini-transcribe.mjs`, para que
  `tools/onboard.mjs` no tenga que tratarla distinto. `tools/onboard.mjs` actualizado con el nuevo
  nombre; `Admin/claude-api/.env` (antes `Admin/thirdapi/.env`) sumado a `.gitignore`.
- **Todavía sin key ni test de calidad propio** — Guido va a abrir la API key de Anthropic
  (aclarado: es facturación aparte, pago por uso, NO consume los tokens semanales de su plan de
  Claude Code/Claude.ai) y correr su propia prueba antes de confiar en esto para casos reales.
- **`Admin/COMO-CORRE-EL-PROYECTO.html`, "El paso 2, en detalle" actualizado**: la tabla y el texto
  describían el flujo viejo (Gemini solo redoing escaneos, subagente de Claude como única red de
  contención) — ahora describe el flujo real desde la Versión 302/303: Mistral y Gemini SIEMPRE en
  paralelo + comparación, Claude API como reemplazo puntual cuando Gemini rechaza por RECITATION, y
  el subagente completo como última red.
- **Mergeado `worktree-todo-106-mistral-gemini`** (sesión terminada): el test real de 8 escaneos que
  fundamenta la Versión 303, con `Admin/test-mistral-gemini-escaneos.md` como detalle completo.

## Versión 303 — to-do 106, la corrida real: head-to-head Mistral vs. Gemini en 8 escaneos (8 subagentes, ~1.660 celdas), confirma "ninguna es mejor"

- **La corrida ampliada que la Versión 302 (abajo) anticipaba con un solo documento**, ahora hecha
  de verdad: 8 documentos que Mistral marcó como escaneados (Brasil, Colombia, Grecia y Noruega — 2
  por país), verificados celda por celda contra el PDF fuente por 8 subagentes en paralelo, uno por
  documento. Resultado: ningún motor domina — cada uno cometió errores reales que el otro no
  cometió, en cantidad similar, sobre una tasa de error minúscula (~1.660 celdas comparadas). **No
  se cambia el DEFAULT Mistral→Gemini** de CLAUDE.md/`club-data-mapping/SKILL.md` sección 15.
- **2 hallazgos nuevos, ninguno detectable con un chequeo de sumas**: Mistral puede saltearse
  contenido real SIN NINGUNA advertencia (una columna entera de ratios, en un documento); Gemini
  puede fabricar un valor en una celda vacía, o "corregir" en silencio un dígito hacia lo que le
  parece más consistente. Confirma que la verificación manual obligatoria para escaneos sigue
  siendo necesaria con cualquiera de los dos motores — el chequeo de comparación (`tools/compare-
  transcripts.mjs`, Versión 302) atrapa un desacuerdo ENTRE los dos, pero no un error en el que
  ambos coincidan por accidente. Detalle completo en `Admin/test-mistral-gemini-escaneos.md`.

## Versión 302 — to-do 106 cerrado: "ninguna es mejor" → Mistral+Gemini en paralelo con comparación, no un default

- **to-do 106 (¿conviene cambiar el default Mistral→Gemini?) cerrado con una respuesta distinta a
  la esperada**: una sesión en worktree corrió el comparativo de punta a punta contra una muestra
  amplia de documentos y el resultado fue que NINGUNA de las dos es sistemáticamente mejor — cada
  motor se equivoca en celdas DISTINTAS del mismo documento. Elegir un default no resuelve nada.
- **Propuesta de Guido, adoptada**: correr Mistral Y Gemini en paralelo para cada documento (acepta
  el costo 2x) y usar el DESACUERDO entre los dos como la señal de qué necesita revisión humana, en
  vez de confiar en uno solo. `tools/compare-transcripts.mjs` (nueva) compara ambas transcripciones
  por rubro — probado contra River 2021 (Mistral vs. la transcripción de Gemini de la Versión
  298/299): encontró el error ya conocido ("Amortización de software") MÁS otras 18 discrepancias
  reales en el mismo documento, confirmando el diagnóstico de "ninguna es mejor".
- **`tools/onboard.mjs` reescrito** con el flujo completo: Mistral → Gemini en paralelo → comparar →
  si coinciden, `prepare-onboarding.mjs` automático; si no, para ahí y deja los 2 `.md` listos para
  cuando Guido convoque a Claude a resolverlo (nunca automático). `gemini-transcribe.mjs` sumó
  `--out-suffix` (mismo patrón que ya tenía `mistral-ocr-transcribe.mjs`) para poder transcribir en
  paralelo sin pisar el `.md` de Mistral.
- `*.gemini-check.md` sumado a `.gitignore`, mismo criterio que `*.briefing.json`.

## Versión 301 — `tools/onboard.mjs`: el comando único (Mistral → Gemini redo → prepare-onboarding)

- **Pedido de Guido**: que correr Mistral/Gemini desde su terminal también dispare las tools nuevas
  del to-do 105, sin un comando aparte que acordarse de correr. `tools/onboard.mjs` encadena, sin
  tocarlas, `mistral-ocr-transcribe.mjs` → `gemini-transcribe.mjs --redo-mistral-scanned` →
  `prepare-onboarding.mjs` (un briefing.json por documento). Uso individual (`<pdf> [--club]
  [--year]`) o en lote (`--all [--dir] [--limit]`).
- **`--club` se adivina comparando el nombre de la CARPETA contra `data/clubs.js`, solo si hay UNA
  coincidencia clara** — probado con un caso real ambiguo ("Racing" matchea tanto a Racing Club
  como a Genk, cuyo nombre legal en bélgico incluye "Racing"): ahí se niega a adivinar y pide
  `--club` explícito, en vez de arriesgar cargar bajo el clubId equivocado. `--year` sí se adivina
  siempre del nombre del archivo (bajo riesgo, solo afecta la búsqueda de liga cacheada).
- **OJO para cuando se corra `--all` de verdad**: el paso de Gemini (`--redo-mistral-scanned`) barre
  TODO el proyecto, no solo el `--dir` pedido — no se corrió de punta a punta en esta sesión por
  eso, queda para que Guido lo tire desde su terminal.

## Versión 300 — to-do 105 #1, ronda 2: `prepare-onboarding.mjs` probado contra portugués/EUR, 3 bugs más en `extract-table-rows.mjs`

- **`extract-table-rows.mjs` no encontraba NINGUNA tabla en un documento sin "|"** (Corinthians
  2024-25: Mistral transcribió un PDF con capa de texto nativa muy limpia como texto corrido en vez
  de tabla Markdown -- 0 tablas en un documento de 5000+ líneas con datos reales adentro). Agregado
  un segundo parser (`parsePlainTextRow`) que reconoce "Etiqueta [Nota] Valor1 [Valor2]" en texto
  plano, escaneando desde la derecha por tokens que parecen un valor monetario real (con separador
  de miles/decimal) para distinguirlos de una referencia de Nota.
- **Una sub-nota tipo "24.1"/"24.2" se confundía con un valor real** (ambas tienen un "."), corregido
  con la señal que las distingue: un separador de miles real agrupa de a 3 dígitos, una sub-nota de
  a 1.
- **Un heading FUERTE repetido en cada página (membrete de Corinthians) bloqueaba para siempre el uso
  del heading DÉBIL real** ("Demonstração do Resultado do Exercício"), porque el trail de headings
  nunca se reseteaba por página y la ventana de solo 2 headings se llenaba con metadata (fecha,
  moneda, fila "Nota AÑO AÑO") antes de llegar a la tabla. Arreglado reseteando el trail en cada
  salto de página y ensanchando la ventana de 2 a 5 (`TRAIL_MAX`).
- Probado sin regresión contra los 3 documentos de la Versión 299 (River, Once Caldas, Rosenborg) +
  2 nuevos (Corinthians portugués/BRL en texto plano, AC Milan italiano/EUR con tablas `|`
  normales) -- 8 bugs reales encontrados y arreglados en total entre las 2 rondas.
- Sigue sin conectarse a ningún skill (misma razón que la Versión 299): ya cubrió la diversidad de
  idioma/moneda/formato que hacía falta, queda pendiente que Guido confirme antes de sumarlo.

## Versión 299 — to-do 105 #1: `tools/prepare-onboarding.mjs`, construido y probado (todavía sin conectar a ningún skill)

- **Nueva tool, pensada para correr desde la terminal de Guido** (no desde una sesión de Claude):
  orquesta extract-table-rows + sum-check + suggest-category-precedent + lookup-club-league de una
  sola vez y deja un `<archivo>.briefing.json` compacto al lado del `.md` (gitignoreado).
- **5 bugs reales encontrados y arreglados probándola contra 3 documentos reales** (River 2021, Once
  Caldas 2024, Rosenborg 2012 en noruego): tie-out por tabla entera en vez de por segmento (no
  chequeaba nada en tablas con varios "Total" en cascada, que es el caso normal), un crash de
  proceso hijo sin `stdio` capturado, un Anexo con encabezado de 2 niveles rompiendo `sum-check.mjs`,
  un heading en negrita (`**Estado de Recursos y Gastos**`) que dejaba la tabla MÁS IMPORTANTE de
  River marcada `likelyRelevant:false` (arreglado en `extract-table-rows.mjs`), y `sum-check.mjs`
  sin soporte para el formato escandinavo (espacio como separador de miles) ni para "Sum" como
  palabra de total. Con los 2 últimos arreglados, Rosenborg pasó de 28 a 55 tie-outs cerrando de 82.
- **Todavía NO conectada a `club-or-year-onboarding`/`club-data-mapping`** a pedido explícito de
  Guido, para seguir probando antes de fijar el paso en los skills.

## Versión 298 — to-do 103 cerrado: SEGUNDO error real encontrado en River 2021 "Amortización de software" ($12.326.234, no $12.326.254)

- **`data/river-data.js`, Ejercicio 2021**: el dato que estaba cargado en producción para
  "Amortización de software" (`-12.326254`, $12.326.254) era en sí mismo un error, distinto del que
  ya se sabía de Mistral ($12.336.254). El valor real impreso en el PDF es **$12.326.234** —
  confirmado con zoom sobre la celda y con `tools/sum-check.mjs` contra el subtotal de la fila
  (cierra EXACTO, sin ningún residual). Corregido en el archivo. `node tools/audit.js` y
  `auditAll()` corridos después del fix: 0 P0/P1, River 2021 no aparece entre los que no cierran.
- **Gemini transcribió esta celda bien a la primera** (probado con `tools/gemini-transcribe.mjs`
  sobre el mismo PDF), lo que originalmente motivó el to-do 103 (comparar Mistral vs. Gemini en
  escaneos). Es un solo documento, no alcanza para cambiar el DEFAULT del proyecto — sigue abierto
  como to-do 106, con una muestra más amplia por correr antes de decidir.
- **ASSET_V 291 → 292** (`index.html`) por el cambio en `data/river-data.js`; regenerados
  `data/rankings/*.js` (afectado además por el fix de `ceara-br` de la Versión 297),
  `Admin/ESTADO-clubes.md` y `fuentes.html`/páginas de club.

## Versión 297 — to-do 104 arreglado (heurística de tabla en `fetch-club-league-reference.mjs`), 2 ligas más cacheadas, y guía de ritmo de onboarding en el skill

- **to-do 104 cerrado**: `tools/fetch-club-league-reference.mjs` tomaba la PRIMERA tabla wikitable de
  la sección "Teams", que a veces no es el roster (Grecia). Ahora extrae todas las tablas de la
  sección y se queda con la que tiene más equipos ÚNICOS (no más filas) — probado sin regresión
  contra Colombia 2016 (sigue en 20) y Noruega 2019 (sigue en 16), y corregido contra Grecia
  "2024–25 Super League Greece" (ahora trae los 14 reales en vez de 2). La limitación de Argentina
  (páginas sin wikitable, usan una plantilla Lua) sigue sin resolver, es otro tipo de problema, ver
  `tools/club-league-reference/README.md`.
- **2 liga-temporada más cacheadas con la tool ya corregida**: Grecia Super League 2024-25 y Brasil
  Série A/Série B 2024. De paso se resolvió `ceara-br` 2024 (marcado `null`/"sin verificar"): el
  roster de Série A 2024 no lo incluye, el de Série B sí — jugó la B en 2024, ascendió para 2025.
  Corregido en `data/club-leagues/br.js`.
- **`club-or-year-onboarding/SKILL.md` sección 1**: agregada guía de ritmo (to-do 105, pedido de
  Guido de subir el ritmo rumbo a 2000 PDFs) — agrupar varios ejercicios del MISMO club en una sola
  sesión (el precedente de `suggest-category-precedent.mjs` mejora con cada año sumado), y
  paralelizar clubes DISTINTOS con el Agent tool (baja tiempo de reloj, no tokens).

## Versión 296 — to-do 50: Pumas/Tigres descartado, DIABLOS explicado y sigue pendiente de Guido

- **Pumas y Tigres (México) descartado**: decisión de Guido, 2026-09-29 ("elijo no hacerlo, me da
  igual") — las 2 solicitudes de transparencia (UNAM/UANL) ya redactadas no se van a presentar.
- **DIABLOS (Diablos Rojos del México, béisbol, cotiza en BMV) sigue sin decisión**: se le agregó al
  to-do la explicación completa (por qué abre liga Y deporte nuevos, y que el proyecto ya tiene
  contenido de otro deporte sin cargar en `Clubes/` por el piloto de Firecrawl del to-do 75) para que
  Guido decida con contexto la próxima vez que lo lea.
- León (venta sin cerrar) y SIIS Colombia/León-Pachuca (ya resueltos) quedan como estaban, solo
  reordenados para separar lo cerrado de lo que sigue en puro monitoreo.

## Versión 295 — ronda de 5 onboardings de prueba de los tools del to-do 98/95, y plan de velocidad (to-do 105)

- **Once Caldas Ejercicios 2022 y 2023 cargados** (Colombia, años nuevos de club ya cargado):
  ingresos/gastos reconciliados exacto en los dos. `suggest-category-precedent.mjs` sugirió 15/16
  rubros EXACTO en 2022 y 11/11 en 2023 — el precedente mejora con cada año que se suma.
- **River Plate Ejercicio 2021 cargado** (Argentina, año nuevo de club grande): reemplaza el
  placeholder inventado que tenía desde la Versión 138, con el balance auditado real (CNV,
  individual). Transcripción propia con Mistral OCR encontró y corrigió un dígito transpuesto real
  contra el PDF ($12.336.254 leído vs. $12.326.254 real, ver to-do 103). Encontró (sin corregir, a
  pedido de Guido) un bug real en datos YA publicados de 2024 de este mismo club — to-do 102.
- **Boyacá Chicó cargado** (Colombia, club nuevo): primer ejercicio real de este club. La liga se
  confirmó contra un roster ya cacheado del onboarding de Once Caldas, cero fetches nuevos.
- **Panathinaikos cargado** (Grecia, primer país 100% nuevo del sitio): descartó sin usar un archivo
  mal nombrado cuyo contenido era en realidad el ejercicio 2020, no 2025 — chequeando la fecha del
  propio documento antes de cargar nada. PAT reconcilia exacto, sin residuo.
- **Ecuador/LDU Quito evaluado y descartado** (no es un club nuevo cargado): el único documento de
  resultados disponible consolida escuela y country club, cero líneas de fútbol — ya decidido por
  una sesión anterior (`fuentes/Ecuador/LDU Quito.md`, 2026-09-25), redescubierto y confirmado.
- Consolidación: Grecia registrada en `data/leagues.js` (faltaba), 3 generadores corridos, `ASSET_V`
  290→291, 3 párrafos con conteos de páginas/notas desactualizados corregidos (162→164, 655→671).
  Estado final: 164 clubes, 305 ejercicios, 0 P0/P1 en `node tools/audit.js`.
- to-do 101: 3 conflictos de categorización reales (y 1 falso positivo de la propia tool) del
  barrido de `suggest-category-precedent.mjs` contra los 162 clubes, sin revisar todavía.
- to-do 104: 2 casos reales donde `fetch-club-league-reference.mjs` toma la tabla wikitable
  equivocada de Wikipedia (Argentina sin sección "Teams", Grecia con un resumen antes de la real).
- to-do 105: plan para subir el ritmo de onboarding rumbo a 2000 PDFs antes de fin de año — JEV
  solo no alcanza (resuelve solo categorización, y ni está prendido todavía), el cuello de botella
  real es el sourcing de clubes 100% nuevos. Recomendación principal: armar un script
  `tools/prepare-onboarding.mjs` que corra todo lo mecánico de una sola vez antes de que arranque
  la sesión de Claude, sin construir todavía.

## Versión 294 — to-do 98, paso 5 (tier 0): sugerir categoría por precedente del mismo club, y skills al día

- **`tools/suggest-category-precedent.mjs` nuevo**: si un rubro nuevo tiene el mismo texto que uno ya
  categorizado en un año anterior del MISMO club, lo sugiere en vez de que Claude decida de cero.
  Tres niveles (EXACTO/PARECIDO/SIN_PRECEDENTE), nunca escribe datos. Bug real encontrado
  probándola contra Boca ("Futbol Femenino" es ingreso en un año y gasto en otros, mismo texto) —
  corregido separando el precedente de ingresos y gastos (antes se mezclaban en un mapa). Barrido
  completo de los 162 clubes sin fallos; encontró 4 conflictos de categorización reales y genuinos
  (mismo rubro, mismo lado, categoría distinta entre años) en Argentinos Juniors, Estudiantes LP,
  Mallorca y San Lorenzo — anotados para revisar en una sesión futura, no tocados hoy.
- **Skills actualizados con los tools nuevos de esta sesión** (`club-data-mapping`,
  `club-or-year-onboarding`): `extract-table-rows.mjs`, `sum-check.mjs` y
  `suggest-category-precedent.mjs` en el flujo de categorización/verificación; el pipeline de 3 tools
  del to-do 95 (`resolve-wikipedia-season-page.mjs` → `fetch-club-league-reference.mjs` →
  `lookup-club-league.js`) en el paso de `data/club-leagues/<iso2>.js`.

## Versión 293 — Once Caldas Ejercicio 2024 cargado: validación real del to-do 98 (y el to-do 95 en simultáneo)

- **to-do 98 validado con un onboarding real**: Once Caldas Ejercicio 2024 (Colombia), usando
  `tools/extract-table-rows.mjs` para navegar el documento. Ingresos y gastos reconciliados EXACTO
  contra los totales impresos. Encontró un bug real en el extractor (tabla cortada por salto de
  página, un separador Markdown mal puesto en la continuación) — no es un bug de Mistral, y no se
  arregla con más regex: el tie-out obligatorio es la red de seguridad real. Detalle en el to-do 98
  de `Admin/TODO.md`.
- **`tools/sum-check.mjs` nuevo** (pedido de Guido en el camino): saca la aritmética de los tie-outs
  de Claude, sin tocar la parte que sigue siendo juicio (qué filas entran en cada suma).
- **to-do 95 usado en el mismo onboarding**: `data/club-leagues/co.js` — Once Caldas 2024 confirmado
  en Categoría Primera A vía el pipeline de Wikipedia (`2024 Liga DIMAYOR`, el título cambió de
  sponsor respecto de años anteriores).
- Pregunta nueva a Once Caldas/SIIS en `Admin/dudas-por-club.md`: la Nota 25 (Gastos No
  Operacionales) del Ejercicio 2024 no reconcilia contra su propio total, mismo patrón ya visto en el
  Ejercicio 2025 de este club. `tax` cargado como residuo, documentado explícito.
- `ASSET_V` 289→290 (tocó `data/`), 3 generadores corridos.

## Versión 292 — to-do 95 corregido: sí se puede automatizar, con las páginas de TEMPORADA de Wikipedia

- La evaluación de la Versión 291 había mirado las fuentes equivocadas (página del club, RSSSF) y
  concluyó que no alcanzaba. Guido corrigió: la página de la TEMPORADA en Wikipedia (no la del club)
  tiene una tabla de equipos en wikitext estándar de MediaWiki, parseable de forma mecánica.
- Pipeline de 3 tools probado de punta a punta: `tools/resolve-wikipedia-season-page.mjs` (encuentra
  el título exacto), `tools/fetch-club-league-reference.mjs` (baja y cachea el roster completo, sin
  escribir nada si no encuentra tabla), `tools/lookup-club-league.js` (busca por nombre contra la
  caché — reescrito, ya no busca por `clubId`). Probado con Colombia 2016 (20 equipos, incluido
  Boyacá Chicó) y Noruega 2019 (16 equipos, incluido Lillestrøm).
- Detalle completo en el to-do 95 de `Admin/TODO.md` y en `tools/club-league-reference/README.md`.

## Versión 291 — to-do 98 (paso 4) y to-do 95: prototipos probados, sin integrar todavía

- **to-do 98, paso 4**: `tools/extract-table-rows.mjs` (prototipo, no integrado a ningún flujo) saca
  las tablas Markdown de un `.md` transcripto a JSON compacto, sin convertir los números a float.
  Detecta el separador decimal del documento automáticamente (no por país: Almagro y River/Boca,
  mismo país, usan formatos distintos). Probado contra 6 documentos de países/formatos distintos,
  26-96% menos caracteres según el caso. Detalle completo en el to-do 98 de `Admin/TODO.md`.
- **to-do 95**: evaluado contra un caso difícil (Boyacá Chicó, Colombia) — Wikipedia, TheSportsDB y
  RSSSF no alcanzan para un scraper masivo tipo "precargar toda la liga", así que no se construyó.
  En cambio: `tools/lookup-club-league.js` + `tools/club-league-reference/` (vacío), una caché liviana
  de lo que ya se buscó y confirmó a mano, sin el riesgo del scraper. Detalle en el to-do 95 de
  `Admin/TODO.md` y en `tools/club-league-reference/README.md`.

## Versión 290 — limpieza de to-do list: 40 y 39 cerrados por decisión de Guido, 74+36 fusionados, 73 dividido

- **to-do 40 (CMS) cerrado**: la motivación real era ahorrar tokens de sesión, no editar sin código —
  ya resuelta por el to-do 65 (CSS inline de `index.html` extraído a `js/styles.css`). No hace falta
  un CMS.
- **to-do 39 (camiseta vs. círculo) cerrado**: decisión de Guido, no lo va a hacer.
- **to-dos 74 y 36 fusionados en el 99**: eran el mismo backtest de JEV escrito en 2 lugares. El
  nuevo plan incorpora la idea de Guido de probarlo onboardeando 2-3 clubes reales de países (y
  deportes) distintos de la cola de sourcing, en vez de solo contra ejercicios ya categorizados.
- **to-do 73 dividido**: su núcleo (cargar los 2 balances de Boca) ya estaba cerrado desde la
  Versión 289; lo que seguía abierto (el balance de River en Scribd, los 4 ejercicios de Boca sin
  encontrar) pasó a su propio número, el 100, para que no quedara escondido bajo un to-do que ya
  figuraba como resuelto.
- to-do 34 actualizado con lo que cambió desde el merge del selector (to-dos 70 y 83) y los números
  reales de hoy (88 de 162 clubes con un solo ejercicio, antes 34 de 41). to-do 23 pasa a prioridad
  activa (Guido, 2026-09-29).

## Versión 289 — to-do 73 cerrado: Boca Juniors, Ejercicios 2022 y 2023 (N°118 y N°119) cargados

- `data/boca-data.js`: 2 balances auditados reales nuevos, encontrados vía Wayback CDX el
  2026-09-26 y transcriptos con Mistral OCR. Categorizados siguiendo el mismo criterio que el
  Ejercicio 2025 ya cargado (separar wages_squad/player_amortisation/other_expenses por
  departamento cuando el propio documento desglosa "Remuneraciones y cargas sociales" aparte).
  Verificado programáticamente (no solo a mano): la suma de cada línea de primer nivel contra sus
  `items` anidados, y el total de Revenue/Expenses de cada ejercicio contra el Total de
  Recursos/Total de Gastos impreso en la pág. 32 (2022) y pág. 61 (2023) — cierran EXACTO, sin
  redondeo, en los dos ejercicios.
- Ejercicio 2022 (Ejercicio N°118): Revenue $14.279.912.579, Expenses $13.669.793.975, Superávit
  $461.837.755. fx = $125,03 (USD activo al 30/06/2022, declarado por el propio Anexo III).
- Ejercicio 2023 (Ejercicio N°119): Revenue $26.178.273.845, Expenses $27.795.138.995, Superávit
  $1.022.382.735 — con un resultado financiero (RECPAM) positivo de +$2.639.247.885 que revierte un
  resultado antes del efecto financiero deficitario. fx = $256,30.
- `data/clubs.js`: 2 entradas nuevas en `sources{}` (`boca-balance-2021-22`, `boca-balance-2022-23`)
  y `gestionesByClub.boca.ameal` vuelve a tener ejercicios reales de Finanzas (`firstYear:2022,
  lastYear:2023` — antes apuntaba a los años placeholder que se habían borrado en la Versión 138).
- `data/club-leagues/ar.js`: fila de Boca 2022/2023, Primera División los dos ejercicios.
- Verificado en el navegador (`auditAll()`, los 4 KPIs de Finanzas, el acordeón de "Formato
  simplificado" y "Formato del club" en los dos ejercicios): 866/869 checks cierran, las 3
  excepciones son las mismas de siempre (redondeo de Bayern Munich, ya documentadas), 0 warnings
  de fx, 0 clubes sin cargar. `ASSET_V` subido a 289.

## Versión 288 — to-do 94 cerrado: login de Google publicado para visitantes reales

- Google Cloud → OAuth consent screen: la app pasó de modo "Testing" (solo cuentas agregadas a mano)
  a publicada — cualquier visitante puede loguearse, no solo Guido.
- Supabase → Authentication → URL Configuration: agregado `https://financeofsports.com/*` a los
  Redirect URLs permitidos (antes solo tenía el `localhost` de desarrollo).
- Con esto, "Saved Searches" (to-do 70) queda usable de punta a punta en producción, no solo en local.

## Versión 287 — footer actualizado: ya no habla de votar en elecciones de club

- `footer.text`/`footer.note` (`index.html` + `data/lang/en.js`) describían el concepto original
  del sitio ("El deporte en Números", ayudar a socios a votar informados) y "MVP · datos
  placeholder · versión de prueba" — ninguna de las dos cosas es cierta hoy (162 clubes con datos
  reales, sitio pivotado a comparador financiero). Texto nuevo, mismo criterio que ya usa
  `terminos.html`: qué es el sitio, de dónde salen los números, que no representa a ningún club/
  liga/federación.

## Versión 286 — to-do 94: páginas de privacidad y términos, para publicar el login de Google

- `privacidad.html`/`terminos.html` nuevas, en la raíz (contenido para el visitante, no interno —
  `tools/audit-ignore.json` documenta por qué `doc-interno-no-excluido` no aplica acá). Google
  exige un home page + link a privacidad + link a términos, los tres en el mismo dominio, antes de
  poder pasar el proyecto de OAuth de "Testing" a "In production" (Publish app) — ver to-do 94.
  Explican en criollo qué datos junta el sitio (nada sin login; con login, el email vía Supabase y
  qué se guarda en "Mi Cuenta") y qué es/no es el sitio (no asesoramiento financiero, las
  simulaciones de liga son solo por plata). Linkeadas desde el footer de `index.html`.

## Versión 285 — to-do 83, dos pedidos más: año editable y sumar una liga entera

- **El año de un club recién sumado ahora es un dropdown editable**, adentro de la misma frase
  ("Racing Club (▾2019/2020): con..."), no texto fijo — pedido de Guido: "puedo elegir un club pero
  no puedo cambiar el año". Solo aparece si ese club tiene más de un ejercicio cargado.
- **"Sumar toda una liga" en el mismo buscador** ("quedaría muy cool tener toda la liga argentina y
  brasilera juntas"): buscar el nombre de una liga (no solo de un club) la inserta ENTERA — todos
  sus clubes, de una. A diferencia de sumar un club suelto, esto NO baja ningún
  `data/<club>-data.js`: reusa `data/rankings/<liga>.js`, que ya trae cada fila calculada — insertar
  10-20 clubes de golpe es tan barato como insertar 1. Por eso esos clubes no tienen el dropdown de
  año (no se les cargó el detalle por ejercicio, no hay entre qué elegir) — trade-off aceptado a
  propósito por la diferencia de costo.

## Versión 284 — fix real: `--redo-mistral-scanned` podía borrar transcripciones sin reemplazo

- **Incidente, 2026-09-28**: Guido corrió `node tools/gemini-transcribe.mjs --redo-mistral-scanned`
  (Grecia/Italia/Noruega, ~203 PDFs marcados como escaneados por Mistral) y lo cerró a mitad de
  camino porque "andaba raro". Al cerrarlo, 203 archivos `.md` de Grecia/Italia/Noruega quedaron
  BORRADOS del working tree, sin ningún reemplazo de Gemini escrito — trabajo de Mistral ya hecho,
  desaparecido. Recuperado entero con `git checkout -- Clubes/Grecia Clubes/Italia Clubes/Noruega`
  porque nada se había commiteado todavía (si se hubiera commiteado antes de cerrar la sesión, se
  perdía de verdad).
- **Causa raíz, ya arreglada**: `--redo-mistral-scanned` borraba los `.md` de LOS 203 PDFs DEL LOTE
  ENTERO, de una, ANTES de arrancar a procesarlos uno por uno con Gemini (para evitar el guard
  `if (existsSync(mdPath)) return skipped` de `transcribeOne()`, que si no los saltea a todos). Con
  eso, cualquier corte a mitad de la corrida (Ctrl+C, cerrar la terminal) dejaba cientos de archivos
  borrados sin haber llegado siquiera a intentarlos con Gemini.
- **El fix**: `transcribeOne()` ahora acepta `opts.redo` — con eso saltea el guard de `existsSync`
  SIN borrar nada; `writeFileSync()` ya pisa el archivo solo cuando Gemini responde bien. Resultado:
  un .md solo se pierde en el mismo instante en que se reemplaza por uno bueno, nunca antes. Cortar
  la corrida a la mitad deja trabajo a medio HACER (algunos redos pendientes), nunca a medio BORRAR.

## Versión 283 — to-do 83, segunda parte: "sumar uno o más equipos" desde Ligas

- Al ver cualquier liga, un buscador nuevo ("Sumar un club a este ranking…") deja insertar cualquier
  club del sitio — no hace falta venir de Finanzas. A diferencia de ese camino, el club acá NO está
  cargado: se baja su `data/<club>-data.js` con `loadClubData()` (de index.html, reusada igual que
  `computeYearGeneric`) antes de poder calcular su ingreso.
- `st.simulado` (un objeto) pasa a ser `st.simulados` (array) en todo `js/liga.js` — generaliza el
  camino de la Versión 281/282 en vez de duplicarlo: 1 club sigue siendo el caso normal, solo que
  ahora es un array de 1. El dropdown de "probar en otra liga" y "Volver a Ligas con el club en cola"
  ahora llevan TODOS los clubes simulados, no solo uno.
- Guardado en Mi Cuenta: `state.clubes` es siempre un array (mismo criterio, ni el caso de 1 club
  guarda distinto). El label reusa el patrón de `labelForLado()` (Comparar): hasta 3 nombres unidos
  con "+", de ahí para arriba "2 primeros + N más".
- **Bug real encontrado y corregido en el camino**: `notifyStateChange()` en `js/cuenta.js` validaba
  `!!state.club`, que con el `state.club` singular ya reemplazado por `state.clubes` daba `false`
  SIEMPRE — sin el fix, ninguna simulación se hubiera guardado nunca, en silencio, sin error visible.

## Versión 282 — to-do 83: 2 ajustes tras probarlo en producción

- **"Volver a Ligas" durante una simulación ya no te saca del flujo**: antes reseteaba todo y había
  que ir hasta Finanzas de nuevo para retomar; ahora vuelve al picker de ligas CON el mismo club en
  cola, listo para probar otra. `botonVolver()` restaura `pendingSim` desde `st.simulado`.
- **Dropdown de liga nuevo** (`selectorDeLigaSimulada()`), visible solo mientras hay una simulación
  activa, agrupado por continente igual que el picker: cambiar de liga ahí recalcula la simulación
  para el mismo club sin volver atrás (ej. Brasileirão Série A → Série B en un clic).

## Versión 281 — to-do 83: "¿cómo le iría este club en otra liga?"

- Simulación por plata (NO predicción deportiva): desde la ficha de Finanzas de un club, botón
  "¿Cómo le iría en otra liga?" → se elige la liga destino → el club se inserta en el ranking real
  de esa liga-ejercicio, en su posición por ingresos, marcado visualmente distinto (barra
  translúcida + fila con fondo ámbar + badge "(simulado)"), con un callout arriba que dice la frase
  ("Con MUSD X, sería el Nº de M en Liga Y"). Nunca cuenta para los totales/coberturas reales de esa
  liga — la fila simulada es una vista, `window.RANKINGS` no se toca.
- Mismo motor que `tools/generate-rankings.js` (`computeYearGeneric` + `toDisplayValue` +
  `simplifiedReportForClub`, `js/finanzas-calc.js`), corrido EN VIVO en el navegador porque el club
  ya está cargado — sin bajar nada nuevo. Bug real encontrado y corregido en el camino: `reportType`/
  `sourceId` salen de `computeYearGeneric().meta`, NO de `yearMetaFor()` (mismo gotcha que ya
  documentaba el generador de rankings, ver su cabecera) — el primer intento los leía mal y la fila
  simulada mostraba "Ejercicio" en vez de "Balance" y sin tipo de documento.
- Se guarda en Mi Cuenta (to-do 70) como cualquier otra búsqueda: template pedido por Guido, "River
  2024/2025 en LaLiga, ejercicio 2025" — `js/cuenta.js` suma un `view:'ligaSim'` nuevo a
  `stateKey()`/`labelFor()`. El año de la LIGA se etiqueta "ejercicio N" (no "N/N+1"): es como
  `js/liga.js` ya etiqueta un ranking, inventar un formato de temporada para ligas sería una segunda
  convención para lo mismo.
- `js/liga.js` gana `iniciarSimulacion()`/`showConSimulado()` (nuevas, exportadas) y un hook
  `onSimulado` para que index.html decida guardar — el módulo sigue sin saber de Supabase, mismo
  principio que ya usaba con `pickClub`/`goFinanzas`. El botón se esconde en modo "Por gestión": la
  simulación es de UN ejercicio puntual, el motor real no calcula por rango de gestión.

## Versión 280 — River Plate: 4 balances reales nuevos encontrados vía CNV, y un fix a `wayback-verify-download.mjs`

- **Hallazgo grande, sourcing (pedido explícito de Guido)**: River es emisor regulado por la
  Comisión Nacional de Valores desde su primera Obligación Negociable (feb. 2025) y al inscribirse
  subió varios ejercicios históricos — canal verdaderamente oficial, mejor que cualquier mirror.
  Descubierto el mecanismo genérico para bajar un adjunto público de `aif2.cnv.gov.ar` sin login
  (GET a `ValetKeyProvider/GetPublicValetKey` + POST a `blob.cnv.gov.ar/.../DownloadBlob`),
  documentado en `fuentes/Argentina/River.md` para reusar con cualquier otro emisor argentino.
- Descargados a `Clubes/Argentina/River/` (no trackeados, `*.pdf` gitignoreado, pendientes de
  transcripción): Ejercicio 120 (2020-21, individual + consolidado), 121 (2021-22), 122 (2022-23),
  una copia oficial del 123 (2023-24, ya cargado vía mirror de tuRiver) y un documento con Fecha de
  Cierre 31/12/2025 — este último con una PREGUNTA ABIERTA (¿cambio de ejercicio fiscal a
  calendario, o período irregular de transición?) anotada en `Admin/dudas-por-club.md`.
- Agotadas sin resultado, para los 2 ejercicios que siguen faltando (118 2018-19, 119 2019-20):
  `cariverplate.com.ar` (dominio viejo, hoy redirige a riverplate.com; sus PDFs archivados en
  Wayback son memoria narrativa duplicada o anexo DEPORTIVO, no financiero) y Wayback CDX de
  dominio completo sobre `riverplate.com`. Quedan documentadas con cifras de prensa (La Página
  Millonaria, Olé, Doble Amarilla) como corroboración, no como fuente primaria.
- `tools/wayback-verify-download.mjs` (to-do 79): fix a un falso positivo del chequeo `id_`/`if_` —
  la regex exigía una barra ANTES de `id_`, pero el formato real de Wayback es
  `/web/<timestamp>id_/<url>` (el `id_` pega contra el timestamp, sin barra previa). Encontrado al
  usar la herramienta de verdad por primera vez contra un caso real (`cariverplate.com.ar`).

## Versión 279 — to-do 67 cerrado: confirmado en producción

- Guido confirmó en Chrome (sin bloqueador de trackers) que los 3 eventos del funnel del selector
  llegan al Live View de Mixpanel. To-do 67 cerrado — queda como pendiente aparte, no urgente,
  armar el reporte de Funnel en la UI de Mixpanel (2-3 pasos, no requiere código).

## Versión 278 — to-do 67: fix real — faltaba el snippet oficial de Mixpanel

- La Versión 277 cargaba `cdn.mxpnl.com/libs/mixpanel-2-latest.min.js` con un `<script src>` plano,
  igual que Chart.js/Supabase. Guido probó en producción (Brave primero, después Chrome) y no llegó
  NINGÚN evento — ni siquiera `window.mixpanel` quedaba definido con `.init`/`.track` funcionales,
  sin ningún error visible en consola aparte de un `"mixpanel" object not initialized` genérico.
  Causa real: Mixpanel necesita el snippet oficial (un stub que define `window.mixpanel` con métodos
  que ENCOLAN llamadas antes de que la librería real cargue de forma asíncrona) — un script tag
  plano no alcanza. `index.html` reemplazado con el snippet oficial completo
  (docs.mixpanel.com/docs/quickstart/install-mixpanel). Verificado en preview local: `window.mixpanel`
  queda armado con `.init` de entrada, y `.track` aparece disponible apenas corre `.init()` — el envío
  real solo se pudo confirmar contra la API directamente (`api.mixpanel.com/track` vía curl, Versión
  277), no todavía desde un browser real con este fix — eso lo confirma Guido en producción.
- Aparte, confirmado que Brave (Shields) bloquea `cdn.mxpnl.com` por default — separado del bug de
  arriba, pero compuesto con él en el primer intento fallido: hay que probar en un navegador sin
  bloqueador de trackers activo para que el resultado sea concluyente.

## Versión 277 — to-do 67: funnel del selector instrumentado en Mixpanel

- `js/selector.js`: 3 eventos nuevos (`selector_opened`, `selector_step_completed` con
  `{step,origen,saltado}`, `selector_club_chosen` con `{clubId,origen}`), instrumentados a mano (sin
  Autocapture) y gateados por hostname igual que `logEvent()` de la Versión 216 — no reemplaza ese
  logging (búsquedas/comparaciones) ni a Cloudflare Web Analytics (pageviews/referrers,
  `track_pageview:false` a propósito). Las 5 asignaciones sueltas de `resuelto`/`saltado` que había
  en el archivo se centralizaron en un helper nuevo, `marcarResuelto()`.
- `index.html`: `<script src="cdn.mxpnl.com/libs/mixpanel-2-latest.min.js">` agregado antes de
  `js/selector.js`. `ASSET_V` 245→246. Token del proyecto ("Finance of sports" en Mixpanel) va
  hardcodeado en `js/selector.js`, mismo criterio que la key pública de Supabase: no es secreto.
  Verificado con un POST directo a `api.mixpanel.com/track` (devolvió `1`, evento aceptado) — el
  browser pane de esta sesión bloquea `cdn.mxpnl.com` (mismo trato que le da a
  `cloudflareinsights.com`), así que la carga del SDK en sí no se pudo probar en preview local, solo
  en producción.

## Versión 276 — to-do 50: SIIS Colombia completado, León/Pachuca ya resueltos, Pumas/Tigres redactado

- Boyacá Chicó suma 2021-2025 (8 ejercicios en total) y Once Caldas completa la serie 2016-2025 (la
  nota anterior de "resuelto" para Once Caldas estaba incompleta, corregida). Bucaramanga 2021
  confirmado como hueco real de la fuente (no throttling), verificado con la API y con Vista 360 en
  browser real. León/Pachuca ya estaban resueltos por el to-do 75. Texto de las 2 solicitudes de
  transparencia (UNAM/UANL) redactado, sin enviar — le corresponde a Guido presentarlas. `DIABLOS`
  BMV y la venta de León (sin cerrar) quedan igual, pendientes de Guido/del mercado.

## Versión 275 — Piloto A/B más grande de Firecrawl: 6 clubes de EE.UU. + 6 de Paraguay

- Repetición del piloto (to-do 80, evaluar Firecrawl-desde-el-inicio) con una muestra más grande y
  sin el sesgo de dueño compartido del piloto anterior: 3 clubes por celda, control vs. tratamiento,
  2 países. Resultado invertido respecto al piloto chico: tokens prácticamente iguales (+0,5%) y
  ~35% MÁS tiempo real con Firecrawl-desde-el-inicio — confirma que la política ya escrita en el
  skill (Firecrawl como respaldo, no como default) es la correcta. Subproducto real: Green Bay
  Packers (3 Annual Reports auditados FY2016-2022, único equipo de las 4 grandes ligas de propiedad
  pública) y Sportivo Luqueño (Paraguay, candidato fuerte a mail) quedan documentados junto con el
  resto de los 12 clubes nuevos.

## Versión 274 — Piloto A/B chico de Firecrawl: 4 clubes nuevos de EE.UU.

- Primer piloto de medición (to-do 80, "¿usar Firecrawl desde el inicio ahorra tokens/tiempo?"):
  2 clubes control (Toronto Raptors, Miami Heat) vs. 2 tratamiento con Firecrawl-primero (Toronto
  Maple Leafs, Dallas Mavericks). Resultado aparente de ~20% menos tokens/tiempo, con un sesgo
  identificado (Raptors/Leafs comparten dueño MLSE/Rogers) — motivó repetir el test más grande
  (Versión 275). Subproducto: 4 equipos nuevos documentados en `fuentes/Estados Unidos/`.

## Versión 273 — to-do 75 cerrado: Firecrawl suma a la familia 1 de `club-sourcing/SKILL.md`

- Test contra San Telmo (Argentina), León y Pachuca (México, Grupo Pachuca) — los 3 casos originales
  ya se habían resuelto sin Firecrawl en sesiones posteriores. San Telmo: HIT, Firecrawl devolvió el
  menú completo en vivo (sin sección financiera, confirma el dead-end con evidencia directa). Pachuca:
  HIT parcial, `/v1/map` barrió el dominio completo (1.305 URLs), sin nada financiero — consistente
  con el blindaje del Art. 12 de LIGA MX ya documentado. León: MISS, ni Firecrawl ni un Browser pane
  real pasan el 403 (bloqueo de IP/hosting, no WAF con challenge).
- Guido decidió sumarlo: `club-sourcing/SKILL.md` sección 0.1 (familia 1) ahora documenta `/v1/scrape`
  (con `proxy:stealth` si falla el intento básico) para cuando el sitio da 403, y `/v1/map` para
  confirmar el menú completo de un sitio grande en una sola llamada. Sin gate de "señal" antes de
  probarlo (a diferencia de Exa) por lo barato que salió (~1 crédito por request).

## Versión 272 — to-do 70 cerrado: "Saved Searches" funcionando de punta a punta

- **`js/cuenta.js` (nuevo)**: cliente de Supabase, login/logout con Google, y el render de "Mi
  Cuenta" (favoritos primero con ★, después el historial, botón de borrar). Sigue el mismo
  principio que `js/selector.js`: no sabe cómo se renderiza el resto del sitio — recibe `reopen`
  por `CUENTA.init()` y expone `notifyStateChange()` para que lo llamen desde afuera.
- **`index.html`**: reemplazado el viejo stub de "Mi Cuenta" (hablaba del plan pago que Guido ya
  había descartado el 2026-09-14) por la pantalla real. `refreshFinanzas()` avisa a `cuenta.js`
  cada vez que se asienta club/año/gestión; `reopenSavedSearch()` reabre lo guardado. `ASSET_V` a
  245 (archivo nuevo + cambios en el motor de Finanzas).
- **`js/selector.js`**: 2 agregados chicos para la comparación (pestaña "Comparar"/vs) — avisa
  cuando se confirma una comparación (`aplicar()`), y `reopenComparacion()`/`paresDeLado()` nuevos
  para reabrirla desde Mi Cuenta con los años ya resueltos (un bloque puede guardar el año en
  `null` = "el más reciente disponible", que se resuelve recién al calcular — el label
  "Real Betis, 2025/2026" necesitaba el valor real, no el crudo).
- **`data/lang/en.js`**: traducciones de lo nuevo; corregido `cuenta.sub`, que había quedado
  hablando del plan pago viejo en inglés.
- 3 bugs reales encontrados y arreglados en la sesión de prueba de Guido: el nombre del club salía
  crudo (`realbetis`) porque el código buscaba `window.clubs` y `clubs` es una variable global
  común, no una propiedad de `window`; el año de un lado de comparación salía vacío por el mismo
  motivo de arriba (año sin resolver); y reabrir una comparación mostraba la tabla de resultado
  pero dejaba los dos cards de arriba vacíos, porque solo se llamaba `aplicar()` y no `render()`.
- **Pendiente antes de que esto sirva para un visitante real** (no es código, son 2 configuraciones
  externas): to-do 94 nuevo.

## Versión 271 — to-do 70: infraestructura de "Saved Searches" (Supabase + login con Google)

- Proyecto Supabase creado (`qgupzttqsgtidoruipel`); URL y `anon public key` en
  `Admin/supabase/.env` (no es secreta, a diferencia de los demás `.env` del proyecto).
- Login con Google configurado de punta a punta: proyecto propio en Google Cloud
  (`finance-of-sports-login`), pantalla de consentimiento OAuth, Client ID/Secret cargados en
  Supabase. Verificado con `curl` contra `/auth/v1/settings`: `google: true`.
- Schema creado y funcionando: tabla `saved_searches` (una fila por combinación de
  `user_id`+`state_hash` — reabrir la misma búsqueda actualiza en vez de duplicar, decisión de
  Guido), RLS para que cada usuario solo vea sus propias filas, función `save_search()` que hace el
  upsert sin resetear `is_favorite`, y los GRANT a `authenticated` (gotcha encontrado en vivo: RLS
  sola no alcanza, Postgres exige el GRANT de tabla aparte). SQL completo respaldado en
  `Admin/supabase/schema.sql`.
- Falta todavía el código del sitio en sí (botón de login, guardado automático desde el selector,
  pantalla de cuenta) — sigue en el to-do 70.

## Versión 270 — to-dos 76 y 77 evaluados: homonimia sin herramienta limpia, video sí rinde gratis

- **To-do 76 (verificación de entidad/homonimia): sin solución automatizable.** Los 3 candidatos
  reales están bloqueados por diseño — OpenCorporates exige token pago desde la primera consulta
  (planes desde USD 300/mes), cuitonline.com está detrás de un challenge de Cloudflare, y el propio
  ARCA/AFIP oficial (gratis, la fuente correcta) pide resolver un captcha en su flujo público — nada
  de esto se automatiza sin violar la regla de no resolver CAPTCHAs. Conclusión: paso manual, no
  herramienta — leer el CUIT del documento y confirmarlo a mano contra ARCA cuando haya sospecha de
  homonimia.
- **To-do 77 (transcripción de video): SÍ rinde, gratis, sin API paga.** El video puntual de Banfield
  (105° Ejercicio) sigue sin confirmarse — un `WebSearch` con ese título trae un falso positivo real
  (Cooperativa Agrícola La Vencedora), mismo hallazgo que ya había descartado la sesión anterior.
  Prueba de concepto con OTRO club (Independiente, asamblea 24/25 en su canal oficial): la
  transcripción automática de YouTube capturó el Estado de Situación Patrimonial completo, cifras
  que coinciden con una nota de prensa ya anotada en `fuentes/Argentina/Independiente.md` — dos
  fuentes independientes confirmando el mismo número. Herramienta: `yt-dlp` con
  `--extractor-args "youtube:player_client=android"` (esquiva un bloqueo nuevo de YouTube),
  encapsulado en `tools/video-transcript-fetch.sh`. Bonus: el Ejercicio 121 de Independiente (el que
  falta cargar) ya está como columna comparativa en un PDF que YA tenemos descargado
  (`estados-contables-2025-2026.pdf`) — pendiente de una sesión de onboarding aparte.
- **Decisión de Guido**: to-do 76 cerrado sin agregar nada a `club-sourcing/SKILL.md` (queda solo
  como criterio informal, sin paso formalizado). To-do 77 cerrado como manual/puntual, con un
  alcance más acotado todavía que Reddit/X: `tools/video-transcript-fetch.sh` se corre SOLO cuando
  el sourcing normal ya dejó anotado un video como lead (no se sale a buscar videos de forma
  proactiva en cada club). Ambos to-dos borrados de `Admin/TODO.md`.

## Versión 269 — to-do 80: X/Twitter sí rinde como sourcing en Argentina, pagando un revendedor barato

- Investigado si X tenía un atajo gratis tipo Arctic Shift/PullPush (Reddit, to-do 81): no lo tiene,
  y su situación es peor — la API oficial no tiene NINGÚN tier gratis desde 2026 (pay-per-use puro,
  $0,005/lectura, Enterprise a partir de USD 42.000/mes recién para buscar el archivo completo, no
  solo los últimos 7 días). Nitter está muerto desde agosto 2026 por cease-and-desist de X;
  `snscrape`/`twint` rotos sin mantenimiento desde 2023/2024.
- Guido armó cuenta en **TwitterAPI.io** (revendedor de terceros, $0,15 cada 1.000 tweets, búsqueda
  de archivo completo real) y se corrió un piloto de 5 casos con `tools/twitterapiio-search.mjs`
  (nuevo, `Admin/twitterapiio/.env` gitignoreado igual que las demás keys): **4 de 5 HIT** — solo
  Chaco For Ever y Gimnasia y Tiro (Salta) dieron MISS (mismo resultado que ya tenían agotado en las
  otras 4 familias). Argentinos Juniors y Atlanta confirmaron cosas ya sabidas; **All Boys aportó un
  dato nuevo real**: la cuenta oficial confirmó los números de Ejercicio 103, 106, 108 y 112 de su
  Memoria y Balance (2016-2025), útil para un mail dirigido aunque no sea el documento en sí —
  anotado en `fuentes/Argentina/All Boys.md`.
- **Decisión de Guido: manual/puntual, no entra a la escalera rutinaria de `club-sourcing/SKILL.md`**
  — mismo criterio que Reddit. `tools/twitterapiio-search.mjs` queda para correrlo a mano cuando un
  club esté agotado en las 4 familias de siempre y tenga cuenta oficial de X activa. To-do 80 cerrado
  y borrado de `Admin/TODO.md`.

## Versión 268 — to-do 81 cerrado: Reddit rinde como sourcing, pero por tamaño de subreddit, no por país

- Piloto en 3 pasos. (1) `WebSearch`/Exa no llegan a `reddit.com` en absoluto (confirmado con
  `includeDomains` real y una query de control sin fútbol) — mismo límite de HERRAMIENTA que el
  to-do 80 con `twitter.com`/`x.com`. (2) La API oficial de Reddit está cerrada para este caso de
  uso: solo aprueba apps nuevas con "valid moderation use case", y "Reddit for Researchers" exige
  afiliación universitaria + IRB. (3) Encontrado un ángulo gratis y sin cuenta que sí funciona:
  **Arctic Shift** (`arctic-shift.photon-reddit.com`) y **PullPush** (`pullpush.io`), archivos
  comunitarios sucesores de Pushshift.
- Piloto extendido a 12 clubes con esas dos herramientas (5 Inglaterra + 4 LatAm + 3 Brasil):
  **4/5 HIT en Inglaterra** (`r/nffc`, `r/Everton`, `r/NUFC`, `r/Gunners` — leads verificables a
  filings reales de Companies House o al Annual Report oficial; `r/safc`/Sunderland MISS) y
  **3/7 HIT en LatAm/Brasil** (`r/BocaJuniors`, `r/Corinthians`, `r/palmeiras` — cifras concretas de
  asamblea/balanço oficial citadas por hinchas; River, Racing, Colo-Colo y el subreddit de Flamengo
  MISS). **Hallazgo principal: la variable que separa HIT de MISS es el tamaño del subreddit
  (~20-25k miembros para arriba), no el idioma/país** — la hipótesis original del to-do quedó
  refutada por los datos (Boca con 31k rinde igual que Everton con 62k; Sunderland con 6,8k no rinde
  igual que Racing con 1,1k).
- Nueva sección "Redes sociales y sitios de fans" en `paises/Reino-Unido.md`, `paises/Chile.md` y
  `paises/Brasil.md` con el hallazgo — primera vez que este criterio se guarda por país.
- **Decisión de Guido: no entra a la escalera rutinaria de `club-sourcing/SKILL.md`** — muy pocos
  clubes de fútbol del mundo tienen un subreddit de ~20-25k miembros para arriba, así que no rinde
  correrlo por default en cada club nuevo. Queda `tools/reddit-archive-search.mjs` (dos subcomandos:
  `subs <prefijo>` para chequear el tamaño del subreddit antes de nada, `search` para buscar palabras
  clave con PullPush) para una corrida manual y ocasional cuando un club puntual lo amerite.
- To-do 93 nuevo (no 90 — ya usado y retirado, corregido tras el aviso de Guido): evaluar si
  Argentina amerita su propio `paises/Argentina.md`.

## Versión 267 — to-do 84 cerrado: familia 4b (agregadores y sitios de fans) en club-sourcing

- `.claude/skills/club-sourcing/SKILL.md` sección 0.1 suma la familia 4b: criterio de "confiable
  como lead" (reproduce/linkea el documento real y dice de dónde salió) vs. "descartar" (cifras
  propias del agregador sin documento fuente), y la línea de marca en `fuentes/<País>/<Club>.md`
  para un lead sin verificar todavía. No se carga ni categoriza nada hasta confirmarlo contra el
  original.

## Versión 266 — to-do 80, paso 1: confirmado que Exa no cubre X/Twitter gratis

- 4 queries de prueba con `tools/exa-search.mjs` (2 generales de asambleas/balances mencionando
  Twitter, 1 puntual sobre Argentinos Juniors/@AAAJoficial, 1 con `site:twitter.com OR site:x.com`
  explícito): de ~25 resultados, cero URLs directas de `twitter.com`/`x.com` — el único contenido de
  tweet que apareció fue embebido en un artículo de prensa que Exa ya indexa por su cuenta. Sin
  cobertura incremental real. Decisión de si pagar la API de X queda para Guido, sin resolver.

## Versión 265 — to-do 72 cerrado: los 3 pendientes de Browser pane, resueltos con navegador real

- **Chacarita Juniors**: con Browser pane real el sitio carga sin ningún bloqueo (el "Vercel Security
  Checkpoint" era específico a tráfico automatizado). Se recorrió el menú COMPLETO en vivo — "El
  Club" solo tiene un Estatuto Social en PDF, ninguna sección de balance/transparencia en ningún
  lado. Familia 1 queda AGOTADA de verdad, ya no es un problema de herramienta.
- **Newell's Old Boys**: el sitio se REDISEÑÓ por completo desde el último chequeo — ya no es el
  WordPress que daba 403 en `wp-content/uploads`, es un sitio nuevo 100% orientado a marketing de
  socios, sin ninguna sección institucional de documentos (confirmado enumerando TODOS los links de
  la home vía JS). El endpoint `wp-json` sigue dando 403 incluso con navegador real — no era un
  bloqueo de herramienta, es un backend viejo que quedó de pie sin exponerse. Familia 1 agotada.
- **Argentinos Juniors**: las 2 imágenes del informe contable 2019-20 en `i.ibb.co`
  (`gJSBgrV/1a.jpg`, `NyhkqSZ/1b.jpg`) SÍ se pudieron descargar — el "bloqueo de red" que reportaba
  la sesión anterior era simplemente `curl` sin `User-Agent`/`Referer` (con esos headers, 200 y
  bytes reales). Descargadas a `Clubes/Argentina/Argentinos Juniors/informe-contable-2019-20-
  {resultados,patrimonial}.jpg` y transcriptas completas: son 2 tablas comparativas de gestión
  (2014-2020, cifras RT6/moneda homogénea, sin desglose de rubros) — confirman un total nuevo para
  el Ejercicio 2019-20 y revelan que el patrimonio neto de 2014 fue NEGATIVO (-205.849.283), dato que
  no estaba en ningún otro documento del proyecto. Sigue sin cargarse al sitio (no hay rubros que
  desglosar), pero ahora es mejor evidencia para pedirle al club el balance auditado completo.
- To-do 72 borrado (resuelto); su referencia cruzada en el to-do 59 actualizada para no apuntar a un
  to-do ya cerrado.

## Versión 264 — to-do 91 cierra el loop: skills apuntan a las herramientas nuevas, y un "miss" queda registrado para que Guido lo prepopule

- `club-data-mapping/SKILL.md` sección 5 y `club-or-year-onboarding/SKILL.md` sección 3 punto 1b:
  ambas apuntan ahora a `tools/lookup-fx-close.js`/`tools/lookup-brand-color.js` ANTES de salir a
  buscar en la web — sin esto, las herramientas del to-do 91 quedaban sin que ninguna sesión supiera
  que existen.
- `tools/lookup-fx-close.js` y `tools/lookup-brand-color.js`: cualquier búsqueda sin resultado (moneda
  no configurada, fecha fuera de rango, liga no cacheada, club no encontrado) queda anotada en
  `tools/{fx-reference,brand-color-reference}/misses.jsonl` (pedido de Guido, 2026-09-27) — el mensaje
  en consola le dice a la sesión que avise, para que Guido pueda revisar el archivo de vez en cuando y
  correr el fetcher correspondiente en vez de que cada sesión se tope con el mismo hueco sin dejar
  rastro. Nuevo flag `--misses` en los dos scripts para ver el resumen (deduplicado) sin abrir el
  JSONL a mano.

## Versión 263 — to-do 91 ampliado: 3 monedas (no solo ARS) y 5 ligas (no solo 3), a pedido de Guido

- `tools/fetch-fx-reference.mjs` ahora baja 3 series, no solo ARS — las 3 monedas con más clubes ya
  cargados en el sitio: **BRL** (BCB, API pública, PTAX de cierre-venda, 4.203 cotizaciones desde
  2010) y **COP** (datos.gov.co, dataset de la TRM oficial, 6.111 cotizaciones desde 2010) se suman a
  ARS. Las 2 nuevas verificadas igual que ARS: exacto dígito por dígito contra los valores YA
  cargados a mano en `FX_CLOSE` para clubes brasileños y colombianos existentes (BRL 2017-2024, COP
  2018 y 2025). `tools/lookup-fx-close.js` ya las reconoce (`--currency ARS|BRL|COP`).
- `tools/brand-color-reference/` suma **España** (`laliga`, 18 clubes) e **Inglaterra**
  (`premier-league`, 18 clubes) a Argentina/Colombia/Brasil — las 2 ligas europeas con más clubes ya
  cargados (10 españoles, 19 ingleses, ver `club-data-mapping/SKILL.md` sección 13). Japón se probó
  y no tiene página de liga en footylogos (`j-league`/`j1-league` dan 404) — no es un hueco real: el
  proyecto ya usa una fuente mejor para Japón, la `クラブカラー` oficial de la J.League (ver
  `club-or-year-onboarding/SKILL.md` sección 3), no footylogos.
- Quedan afuera, a propósito, los ~24 países restantes de `club-sourcing/SKILL.md` que hoy tienen
  pocos o ningún club cargado — seedear una liga entera sin actividad de onboarding encima no ahorra
  nada todavía. El criterio que queda: cachear una liga cuando el onboarding/sourcing la toca de
  verdad (`node tools/fetch-brand-color-reference.mjs <slug> <nombre>`, un comando), no
  preemptivamente las 29.

## Versión 262 — to-do 91: FX y brandColor precargados en lote, en vez de buscar uno por uno por club

- `tools/fetch-fx-reference.mjs` + `tools/fx-reference/ars-usd.json`: serie histórica completa del
  dólar mayorista BCRA (Comunicación A 3500), 5.828 cotizaciones de 2003 a hoy, bajada de la API
  pública del BCRA. Verificado dígito por dígito contra los 6 valores de `FX_CLOSE` ya cargados a
  mano para Almagro (31/10/2018 a 31/10/2023): coincide exacto en los 6.
- `tools/lookup-fx-close.js <fecha>`: busca LOCAL contra esa serie, con fallback al día hábil
  anterior más cercano si la fecha cae fin de semana/feriado (mismo criterio que ya usa el proyecto a
  mano), e imprime la entrada lista para pegar en `FX_CLOSE`. 0 búsquedas web.
- `tools/fetch-brand-color-reference.mjs <liga-footylogos> <nombre>` + `tools/lookup-brand-color.js`:
  mismo patrón para los swatches de color que footylogos publica por liga. Cacheadas hoy: Argentina
  (31 clubes), Colombia (21), Brasil (19) — las 3 ligas con más actividad de sourcing/onboarding
  reciente. Esto NO decide `brandColor`: solo evita el fetch repetido, el proceso completo de
  `club-or-year-onboarding/SKILL.md` sección 3 punto 1b (identidad primero, después el hex, las 4
  trampas ya documentadas) sigue aplicando sobre estos datos cacheados.
- Ninguno de los 2 tipos de archivo de referencia se lee desde `data/` ni se sirve al visitante —
  viven en `tools/`, son insumo de onboarding. Agregar otra liga o moneda es correr el fetcher de
  nuevo con otro argumento, no tocar código.

## Versión 261 — to-do 88 cerrado por análisis, no por código: no conviene partir la lectura de skills entre sesiones

- Conclusión (2026-09-27): partir la lectura de `club-data-mapping`/`club-or-year-onboarding` entre 2
  sesiones (una solo mapeo, otra solo arquitectura) no ahorra tokens — los ~150 KB de los dos skills
  se pagan igual en total, solo se reparten entre dos facturas en vez de una — y agrega un costo nuevo
  real: el traspaso de decisiones de una sesión a la otra, justo donde ya se coló un error esta misma
  sesión (el PAT de Almagro 2021-2023 mal leído por un `grep` en vez de por lectura completa). El
  apalancamiento real ya existe sin inventar nada: onboardear varios clubes en la MISMA sesión, que ya
  amortiza el costo fijo de los skills entre todos. To-do borrado sin dejar código, la conclusión
  queda acá.

## Versión 260 — to-do 92: podada la prosa narrativa acumulada de `club-data-mapping/SKILL.md` (sección 13)

- La sección 13 ("Formato Simplificado" homologado a Boca) venía acumulando "Versión 46... 47... 48...
  49... 52... 53..." ronda tras ronda desde que se escribió, sin que cada ronda comprimiera la
  anterior — 262 líneas, gran parte historia de CÓMO se llegó a cada regla en vez de la regla vigente
  en sí. Comprimida a 113 líneas: se conservó cada regla permanente (el orden/nombres exactos de las
  filas de Ingresos y Gastos, `hideIfZero`, Estadio vs. Abonos, los precedentes de Racing para
  `player_amortisation`/`wages_squad`, la regla de ingeniería de `otherExpenses`/`nonCash` en
  `computeYearGeneric()`) y los ejemplos pedagógicos reales (Athletic Club, Boca 2025) que ilustran
  CÓMO aplicar la regla — se cortó la envoltura de citas textuales y "en la ronda tal, Guido pidió...".
  Archivo completo: 92.632 → 79.607 bytes (-14%).
- Resto del skill revisado (secciones con más menciones de "Versión N"): la sección 5 (conversión a
  USD) ya es densa en regla/tabla/ejemplo, no changelog disfrazado — no se tocó.

## Versión 259 — to-do 87: `club-sourcing/SKILL.md` partido en un archivo por país

- Las 28 secciones de país (Chile a Ucrania, sección 11 —gotcha de tooling, no de país— aparte) se
  movieron a `.claude/skills/club-sourcing/paises/<País>.md`, un archivo por regulador/región,
  copiadas tal cual (no reescritas) para no perder ningún gotcha en la transcripción. El `SKILL.md`
  principal quedó con las secciones generales (0, 0.1, 0.1b, 0.2, 0.3), el gotcha de tooling, un
  índice de países con un link a cada archivo, y "Cómo mantener este skill" actualizado para el nuevo
  esquema (país nuevo = archivo nuevo + línea al índice, no una sección más acá).
- Arregladas ~26 referencias cruzadas entre países ("ver sección 7", "sección 14") que hubieran
  quedado rotas/sin sentido al partir el archivo — reescritas para apuntar al archivo correspondiente
  (`paises/CONCACAF.md`, etc.), verificado con un script que confirma que no queda ningún "sección N"
  de país sin resolver.
- `SKILL.md` principal: 122.978 → 34.121 bytes. Total repartido entre los 29 archivos: ~128 KB (un
  poco más que el original por los headers/links nuevos de cada archivo — el punto no es pesar menos
  en total, es que una sesión sourceando un país abra 1 archivo chico en vez del archivo completo).
- `start-session-finance-of-sports-project/SKILL.md`: corregido el peso declarado de `club-sourcing`
  en la tabla de arranque (113 KB → 33 KB + el archivo del país).

## Versión 258 — to-do 86: limpieza completa de `Clubes/Colombia/Envigado/estados-financieros-2023.md` y `2024.md`

- `2023.md`: los 5 placeholders en inglés (obligaciones financieras y beneficios a empleados en el
  Estado de Situación Financiera, firmas del Estado de Resultado Integral, movimientos de capital,
  tabla de depreciación de Nota 10) reemplazados por la transcripción real, leída de las páginas
  escaneadas del PDF (render + lectura directa, esas páginas no tienen capa de texto). De paso,
  varios números mal transcritos en esas mismas tablas (Estado de Situación Financiera, Estado de
  Resultado Integral) corregidos contra la imagen de la página.
- `2023.md`: contenido real que faltaba entre página física 15 y 19 del PDF (secciones 3.3.3
  Obligaciones financieras, 3.3.4 Cuentas comerciales por pagar, 3.3.5 Retiro de activos
  financieros, y el primer párrafo de 3.3.6 Deterioro de valor de activos financieros — la
  transcripción original las había saltado y empalmado el resto como si fuera continuación de
  3.3.2) reconstruido desde el PDF (SÍ tiene capa de texto nativa en esa zona) y agregado en su
  lugar. Un párrafo duplicado de "reversión de pérdida por deterioro" (pegado dos veces, una de
  más al final de lo que hoy es la página 18) eliminado.
- El hueco de páginas 24-25 y el de página 39-40 de `2023.md`: en los dos casos las marcas de
  página venían con offset (contenido de 2 páginas físicas bajo una sola marca `--- pág. N ---`,
  sin pérdida de contenido) — confirmado releyendo el PDF y contando marcas contra páginas reales,
  mismo patrón que Atlético Bucaramanga 2017. Renumeradas ~30 marcas de página (16 a 46) para que
  cada una refleje la página física real del PDF, sin re-transcribir el texto que ya estaba bien.
- `2024.md`: el hueco de páginas 12-18 (7 páginas) resultó ser el mismo patrón, pero mucho más
  extendido — las primeras 11 marcas del documento (todo el escaneo de la Nota 3, la más larga)
  venían comprimiendo 18 páginas físicas reales bajo 11 marcas, con contenido completo pero sin una
  marca por página. Confirmado renderizando y haciendo OCR (Tesseract) de las 18 páginas del PDF
  (este documento es enteramente escaneado, sin capa de texto) y ubicando en el `.md` dónde
  arrancaba cada página real; sin ningún dato faltante. Marcas 1-18 reconstruidas página por
  página; 19-30 ya estaban bien.
- `node tools/check-transcripcion-fidelidad.js` sobre los dos archivos: 0 P1, 0 P2 (quedan algunos
  P3 de "página corta", señal débil, sin resolver — no ameritan más que revisión humana eventual).
- `Admin/TODO.md`: to-do 86 borrado (resuelto).

## Versión 257 — el chequeo de fidelidad de transcripción queda cableado al pipeline, no es un paso suelto

- `tools/mistral-ocr-transcribe.mjs` y `tools/gemini-transcribe.mjs`: corren `check-transcripcion-fidelidad.js`
  automáticamente sobre cada `.md` recién escrito (un `execFileSync` a Node, sin costo — el chequeo no
  llama a ningún modelo) y avisan en la consola (`[FIDELIDAD: N hallazgo(s) P1 ...]`) si encuentran
  algo, tanto en modo lote como archivo suelto. Nuevo campo `fidelidadP1` en cada registro de
  `Admin/{mistral,gemini}/resultados.jsonl`. No bloquea la transcripción — solo marca qué revisar.
- `CLAUDE.md` (sección "Cada PDF nuevo"): documentado que los pasos 1 y 2 del pipeline ya corren el
  chequeo solos, y que el paso 3 (subagente de Claude) hay que correrlo a mano al terminar — es el
  mismo tipo de modelo de chat que produjo el bug original (el test de costo de Haiku), así que ahí el
  chequeo tiene más chance real de encontrar algo que en Mistral (que es un motor de extracción, no un
  chat, y no debería caer en este patrón).

## Versión 256 — `tools/check-transcripcion-fidelidad.js` (to-do 90): chequeo de fidelidad de transcripción por contenido, no solo páginas

- Script nuevo, corre sobre cualquier `.md` bajo `Clubes/` con marcas de página: detecta placeholders
  de contenido en inglés (bloque entero, ej. `[Complex depreciation table...]`, o cortos dentro de una
  celda de tabla, ej. `[value]`/`[not visible]`) que reemplazan una transcripción real en vez de
  hacerla — P1, alta confianza — y huecos en la numeración de páginas contra la cantidad real del PDF
  hermano (`pdfinfo`) — P2, señal a revisar, no veredicto (ver el punto siguiente). `--json`/`--quiet`,
  mismo estilo que `tools/audit.js`, pero deliberadamente SEPARADO de ese script (que audita
  CONSISTENCIA de los datos ya cargados, no fidelidad de una transcripción fuente).
- Corrida sobre las 2187 transcripciones del repo: 6 P1 (los 5 placeholders + su duplicado de columna
  ya conocidos de `Clubes/Colombia/Envigado/estados-financieros-2023.md`, ver to-do 86), 7 P2, resto
  P3 de bajo valor (páginas cortas, en su mayoría carátulas legítimas).
- **Limitación real encontrada verificándolo contra `Clubes/Colombia/Atletico Bucaramanga/
  estados-financieros-2017.md`** (que el to-do 71 ya había dado por resuelto): la marca `--- pág. N
  ---` no siempre es la página FÍSICA N del PDF — ese archivo tiene un offset constante desde temprano
  en el documento (probablemente páginas de portada/legales sin marca propia), así que un hueco en la
  numeración de marcas no implica necesariamente contenido faltante — se verificó a mano que las Notas
  6 a 27 están completas y en orden. Por eso el chequeo de cobertura de páginas quedó en **P2**
  (revisar), no P1 (bloquear): es evidencia de que algo no cuadra en el rotulado, no un veredicto de
  contenido faltante. Documentado en la cabecera del script para que no se repita el error de
  confiarle un P1 a este chequeo puntual.

## Versión 255 — 5 to-dos nuevos (88-92), candidatos del to-do 85 salidos del onboarding de Almagro y de resolver el to-do 71

- `Admin/TODO.md`: 88 (¿conviene partir la lectura de skills entre sesiones de
  club-data-mapping/club-or-year-onboarding?), 89 (leer el documento completo es caro pero
  abaratarlo tiene un riesgo ya confirmado en esta sesión — un total sacado con `grep` para
  Almagro 2021-2023 estaba mal, se salvó porque igual hubo que leer completo), 90 (falta un
  chequeo de fidelidad de transcripción que mire contenido, no solo cantidad de páginas — el
  chequeo de páginas del to-do 71 no agarró ni las marcas corridas ni los placeholders de Haiku),
  91 (precargar en lote FX_CLOSE y brandColor en vez de buscar uno por uno, con recomendación de
  arquitectura: la serie histórica completa va a un archivo de referencia fuera de `data/`, nunca
  al payload eager del sitio), 92 (podar la prosa narrativa de `club-data-mapping/SKILL.md`, 89 KB,
  aplicando la convención que el propio skill ya tiene escrita mientras no aplica pareja).
- Ninguno de los 5 es código todavía, son candidatos para que Guido priorice (mismo criterio que
  pide el to-do 85).

## Versión 254 — completadas las 4 transcripciones incompletas del test de costo (to-do 71)

- `Clubes/Colombia/{Envigado/estados-financieros-2024,2023, Atletico Bucaramanga/estados-financieros-2017, Alianza FC/estados-financieros-2024}.md`:
  completadas y verificadas página por página contra el PDF (texto nativo o imagen según el
  documento), warning `⚠️ INCOMPLETA` sacado de los 4. Los 4 terminan ahora en el número de página
  real del PDF (17/21/30/46) sin huecos.
- El chequeo estructural original (conteo de páginas) subestimaba el problema: en Alianza FC y
  Bucaramanga las páginas "faltantes" en realidad estaban transcriptas pero con las marcas de
  página corridas (páginas reales fusionadas bajo menos marcas de las que corresponden); en
  Envigado sí faltaba texto real, incluyendo bloques que Haiku había reemplazado directamente por
  un comentario placeholder (`[Complex tax reconciliation table...]`) en vez de transcribir, y una
  tabla de ~150 filas con etiquetas/montos desalineados. Se corrigieron además ~10 dígitos mal
  leídos por el OCR original, verificados contra la imagen o el subtotal impreso.
- **Pendiente para otra sesión, fuera del alcance de este to-do**: en `Envigado/estados-financieros-2023.md`
  quedan más placeholders del mismo tipo (líneas ~246, 249, 306, 333, 822 — obligaciones
  financieras, beneficios a empleados, movimientos de capital, depreciación) y las marcas de página
  de sus primeras ~15-20 páginas (y las de `2024.md`) también vienen corridas — no se tocó por
  estar fuera del rango pedido. Ver to-do 86.

## Versión 253 — Club Almagro (Argentina, Primera Nacional): club nuevo, 6 ejercicios reales (2018-2023)

- `data/almagro-ar-data.js` nuevo: 6 balances auditados reales (Ejercicios 80-85, cierre 31/10 de
  cada año 2018-2023), motor genérico. Los 6 cierran exacto contra sus propios totales impresos.
  `clubId` con sufijo de país (`almagro-ar`, convención de la Versión 129 para clubes nuevos).
- Trampa real del propio documento (2021-2023): "RESULTADO DEL EJERCICIO" es el resultado ANTES
  del resultado financiero, "RESULTADO FINAL" es DESPUÉS — se cargó siempre el FINAL como
  `officialPAT`. El caso extremo es 2023: +69,7M de resultado operativo se revierte a -3,2M de
  PAT final una vez sumado el resultado financiero (-72,9M).
- `data/currency-map.js`: 6 entradas nuevas a `FX_CLOSE` (`ARS@2018-10-31` a `ARS@2023-10-31`,
  dólar mayorista BCRA de cierre, serie Rava Bursátil) — no existían cierres de 31/10 previos.
- `data/clubs.js`: entrada de Almagro (`brandColor:null` — Wikipedia confirma tricolor
  azul/blanco/negro, no el blanco/violeta asumido al empezar la sesión, sin color que predomine).
- `data/club-leagues/ar.js`: fila de Almagro, Primera Nacional los 6 ejercicios.
- `fuentes/Argentina/Almagro.md` + `fuentes/_indice/Argentina.md`: marcados como cargados.
- Regenerados los 3 generadores (`generate-club-index.js`, `generate-fuentes-page.js`,
  `generate-rankings.js`) y `ASSET_V` subido a 244.
- 2 preguntas nuevas en `Admin/dudas-por-club.md` (categorización de "Asignacion Extraordinaria
  A.F.A." y "Gastos de alimentos", ninguna cubierta al 100% por `club-data-mapping/SKILL.md`).

## Versión 252 — dos herramientas nuevas en `tools/` para el gotcha de Wayback CDX (to-dos 78 y 79)

- `tools/wayback-cdx.mjs`: cliente de la CDX API de Wayback Machine con paginación real
  (`resumeKey`, no solo la primera página de 1000 filas) y reintento con backoff exponencial ante
  504/502/503/429 o fallo de red. Si todos los reintentos fallan, tira una excepción — nunca
  devuelve `[]` en ese caso, para que no se confunda "la consulta falló" con "consulté y no hay
  nada" (el bug real de la sesión del 2026-09-26, un 504 leído como "dominio sin snapshots").
  Exporta `queryCdx()` para usar desde otro script y también corre como CLI.
- `tools/wayback-verify-download.mjs`: descarga una URL de Wayback (con `id_`/`if_`) y verifica
  integridad antes de guardarla — tamaño exacto de 1.048.576 bytes (la firma conocida de
  truncamiento en silencio), `pdfinfo` sin error, y `%%EOF` presente. Si algo falla, guarda el
  archivo con sufijo `.SOSPECHOSO-truncado` en vez de dejarlo pasar como si fuera el documento
  completo.
- Validado con un PDF de prueba armado a mano (bueno y truncado a exactamente 1.048.576 bytes) y
  contra dominios reales (`racingclub.com.ar`, `bocajuniors.com.ar`, `chacaforever.com.ar`).

## Versión 251 — `COMO-CORRE-EL-PROYECTO.html`: CSS de ancho de texto, prosa sin versionado, y el flujo de terminal completo

- Pedido de Guido: el CSS angostaba todo el texto a 68ch dejando la mitad de la página en blanco
  ("el css es una porquería, hae que todo texto siga utilizando el ancho de la página"); y la prosa
  entera narraba historia del proyecto ("todo lo que 'desde la versión' o algo con fechas, no me
  interesa... no me interesa saber que pasaba antes").
- **CSS**: sacado el `max-width:68ch`/`62ch` de `.col`, `.standfirst` y `.gnote` (y de un par de
  párrafos con estilo inline) — el texto ahora usa el ancho completo de `.wrap` (1120px), no una
  columna angosta con dos tercios de la página vacíos al lado.
- **Prosa reescrita en todo el documento** para describir el estado actual, sin fechas ni números de
  versión ni "hasta la Versión X"/"desde la Versión Y": la mención de un número de versión puntual se
  saca del documento porque ya vive en `Admin/CHANGELOG.md`, que es donde corresponde y no se
  duplica. Afectó la cabecera, las 4 tablas de inventario, las secciones de sourcing/onboarding/
  auditoría/generadores/rankings/publicación, y el pie.
- **"El paso 2, en detalle" suma "De punta a punta, en una terminal nueva"**: el script completo de
  copiar y pegar (`cd` a la carpeta del proyecto, confirmar que las API keys están, Mistral con
  `--limit`, Gemini con `--redo-mistral-scanned`, y el `--pendientes-claude` final), en un bloque con
  estilo de terminal (`.term`, nuevo en el CSS) — antes los 2 comandos estaban sueltos en una tabla
  sin el resto del flujo.

## Versión 250 — `COMO-CORRE-EL-PROYECTO.html` remedido entero + sus 4 números clave ya no se tipean a mano

- Pedido de Guido: "hay más clubes, más países, más ligas, se puede hacer que no esté hardcoded eso?",
  después de notar que el mapa de procesos seguía diciendo "41 clubes · 6 países" con el sitio ya en
  161 clubes de 14 países — la Versión 249 había agregado la tabla de transcripción sin remedir el
  resto del documento.
- **`tools/generate-como-corre-stats.js` (generador nuevo, el 5to de `tools/`)**: recalcula el bloque
  de cabecera (clubes, países, ligas, documentos fuente) leyendo `data/clubs.js`/`data/leagues.js`/
  `sources{}` con el mismo criterio de carga por `vm` que ya usan `audit.js` y
  `generate-fuentes-page.js`. Tiene `--check`. A propósito NO entra en el `checkGenerados()` que
  bloquea el push (P1): actualiza un documento de referencia interno, no un dato que el sitio
  publique, y atar la auditoría de datos a este documento sería la dirección equivocada. "Checks de
  datos" (`verifyTieOuts()`/`checkFxSanity()`) se queda manual a propósito — automatizarlo de verdad
  exigiría reimplementar esas dos funciones en Node, que es justo lo que `Admin/CONVENCIONES.md`
  prohíbe.
- **Todo el resto del documento remedido contra el repo real** (no solo el bloque de cabecera): la
  tabla de "Código" ya no dice que `index.html` lleva el CSS (se separó a `js/styles.css` en el to-do
  65, antes de esta versión, pero el documento nunca se actualizó) y suma su fila propia; los pesos de
  archivo de las tablas Código/Datos/Instrucciones/Registro; los "228 checks"/"41 clubes" de la
  sección de auditoría, ahora 842/161; el conteo de `audit.js` (0 P0/P1/P2, 9 P3, 83 silenciados).
- **Sección nueva, "02 Buscar antes de cargar (sourcing)"**, entre "Arrancar sesión" y "Onboardear un
  club" (que pasa a ser el paso 03; el resto de los pasos corridos +1, 04 a 08). Resume la escalera de
  5 familias de `club-sourcing` 0.1 (sitio oficial → regulador del país → Wayback CDX de dominio
  completo → búsqueda dirigida → prensa) y la escalada de QUIÉN la ejecuta validada con el A/B test
  del 2026-09-26 (Sonnet → gate de señal → Exa → Opus → Sonnet), más las 5 salidas de 0.3 cuando la
  escalera se agota. Pedido de Guido: "abrime el proceso de sourcing que ahora está más interesante y
  profundo".
- **Corregido un flag equivocado, en `CLAUDE.md` y en este mismo documento**: la instrucción decía
  `node tools/gemini-transcribe.mjs --all` para redoer lo que Mistral marca como escaneo, pero `--all`
  busca PDFs SIN ningún `.md` y se saltea justo los que Mistral ya tocó — el flag correcto es
  `--redo-mistral-scanned`. Corregido también el comentario de cabecera de
  `tools/mistral-ocr-transcribe.mjs`, que seguía describiéndose a sí mismo como "pensado como segunda
  pasada" (el orden de antes de la Versión 244), contradiciendo el pipeline ya vigente.

## Versión 249 — documentado el pipeline de 3 IAs para transcribir (Mistral → Gemini → Claude)

- Pedido de Guido: que en dos semanas no se olvide quién es Mistral ni por qué hay tres capas.
  Actualizado en los tres lugares que corresponden, cada uno para su lector: `CLAUDE.md` sección
  "Cada PDF nuevo" (la regla que lee cualquier sesión al arrancar), `club-data-mapping/SKILL.md`
  sección 15 (el flujo de Tesseract queda como lo que hace un subagente cuando le toca a él, no como
  el default), y `Admin/COMO-CORRE-EL-PROYECTO.html` (el mapa de procesos para Guido, nueva tabla en
  el paso 02 con quién transcribe, cuándo, costo por documento y el límite conocido de cada uno).
  Ningún archivo repite el detalle completo — los tres apuntan a `Admin/test-costo-transcripcion.md`.

## Versión 248 — `tools/mistral-ocr-transcribe.mjs`: 3 bugs reales y advertencia de escaneo

- **Bug de tablas (crítico)**: el `markdown` de cada página de Mistral OCR trae las tablas como un
  link-placeholder (`[tbl-0.md](tbl-0.md)`) en vez del contenido — vive aparte en `page.tables[]`.
  Sin resolverlo, el `.md` quedaba con links rotos y CERO cifras (encontrado en el test de
  comparación de 10 documentos contra transcripciones ya verificadas, 2026-09-26).
- **Bug de timeout**: el `AbortController` solo cubría hasta que llegaban los headers de la
  respuesta, no la lectura completa del cuerpo — un documento colgó el proceso >15 minutos sin
  cortar. Ahora el mismo `signal` cubre `resp.json()` también.
- **429 con backoff insuficiente**: un rate-limit real (cuenta sin método de pago cargado) reintentaba
  cada 2-16s como si fuera un error de red transitorio. Ahora respeta `Retry-After` si viene, y usa un
  piso de 20s si no.
- **Detección de escaneo + advertencia inline**: `--all`/`--retry-gemini-failures` marcan cada PDF sin
  capa de texto real con `[ESCANEADO -- revisar cifras a mano]` en la consola, y el `.md` resultante
  arranca con una advertencia visible. Motivo: en el único documento escaneado+rotado+dañado del test
  de comparación, Mistral leyó bien las líneas de detalle pero inventó un TOTAL con la misma
  confianza que uno correcto, sin marcarlo `[ilegible]` — a diferencia de Gemini o de una
  transcripción hecha por Claude. Agregada la regla correspondiente a `club-data-mapping/SKILL.md`
  sección 6, para que el onboarding no confíe solo en el tie-out cuando ve esa advertencia.
- Resultado tras el fix: 9 de 10 documentos del test de comparación salieron con coincidencia exacta
  contra la transcripción ya verificada (68 cifras comparadas, 59 coinciden — las 9 diferencias son
  todas del documento escaneado/dañado de arriba).

## Versión 247 — Wayback CDX de dominio completo encuentra 2 balances de Boca que se creían perdidos

- Pedido de Guido, a raíz de una discusión sobre costo de tokens: reintentar sourcing de balances
  viejos de Boca y River con las herramientas ya identificadas (Wayback CDX de dominio completo para
  Boca, variantes del patrón turiver/Backblaze para River).
- **Boca: 4 documentos nuevos**, encontrados en `/rebrand/files/` de `bocajuniors.com.ar` (ruta sin
  ningún nombre obvio en el sitio vivo) — Memoria y Estados Contables Ejercicio 118 (cerrado
  30/06/2022) y Ejercicio 119 (cerrado 30/06/2023, firmado), ambos escaneados y pendientes de OCR;
  más los Presupuestos de Ejercicio 119 y 120, estos con capa de texto real. Períodos confirmados
  abriendo la portada de cada PDF, no solo por el nombre de archivo. 2018, 2019, 2021 y 2024 siguen
  sin aparecer en el dominio. Detalle completo en `fuentes/Argentina/Boca.md`.
- **River: sin hallazgo nuevo** en el patrón turiver/Backblaze reintentado para otros años. Apareció
  un balance del ejercicio cerrado 31/08/2016 en Scribd (más viejo que cualquiera ya cargado) pero
  detrás de una suscripción paga — no descargado, queda como pendiente de decisión de Guido, mismo
  criterio que el trámite de la IGJ ya documentado.
- **Actualizado `.claude/skills/club-sourcing/SKILL.md`** (sección 0.1, familia 3): nuevo gotcha —
  un club "ya muy sourceado" no es excusa para no haber corrido nunca el CDX de dominio completo;
  la nota de Boca decía "no aplica, club muy sourceado" y ahí mismo estaban estos 2 balances.

## Versión 246 — barrido de sourcing de los 40 clubes más tradicionales de Argentina (7 agentes en paralelo)

- Pedido de Guido: elegir 40 clubes argentinos "tradicionales" (criterio propio: los 5 grandes de
  AFA + clubes históricos de Buenos Aires, Rosario, Córdoba, Santa Fe, Cuyo y Tucumán) y buscar sus
  últimos 5 ejercicios fiscales, repartiendo el trabajo en subagentes en paralelo.
- **Hallazgo principal: 6 balances auditados reales de Almagro** (Ejercicios 80-85, 2018-2023), club
  nuevo para el sitio, encontrados vía Wayback Machine. El barrido shallow del 2026-09-22 lo había
  cerrado mal como "0 PDFs archivados" por un gotcha real de truncamiento de capturas grandes de
  Wayback (>1 MiB) — ahora documentado en `.claude/skills/club-sourcing/SKILL.md`.
- Ningún otro PDF nuevo descargable en los 39 clubes restantes: 9 ya estaban bien cubiertos sin
  novedad (Boca, River, Racing, Independiente, Vélez, Estudiantes LP, Gimnasia LP, Unión, Ferro
  Carril Oeste); ~20 quedaron como **candidatos a mail** (documento confirmado por prensa o asamblea
  pero nunca publicado digitalmente — detalle club por club en `fuentes/Argentina/<Club>.md`, ver
  to-do 59/72); 5 como **dead-end real confirmado** (Independiente Rivadavia —dominio actualizado a
  `csir.com.ar`—, San Martín de San Juan, Quilmes, Huracán, Deportivo Morón); 3 quedaron **bloqueados
  por motivos técnicos** a retomar con Browser pane (ver to-do 72).
- Nueva pregunta en `Admin/dudas-por-club.md`: Instituto (Córdoba), el ejercicio 2024-25 nunca se
  trató en asamblea.
- Actualizados los 40 `fuentes/Argentina/<Club>.md` tocados (línea `**Ángulos**` + chequeo del día) y
  `fuentes/_indice/Argentina.md` completo; regenerado `fuentes/README.md` (369 de 571 clubes con
  documento, +1). `Admin/inventario-pendiente.md` suma la entrada de Almagro.

## Versión 245 — `gemini-transcribe.mjs` pasa a `tools/` con modo lote `--all`

- Guido preguntó cuántos tokens de Claude le costaría pedirme que mande 1000 PDFs a Gemini uno por
  uno — la respuesta honesta es "bastantes, y no entra en una sola sesión" si lo hago yo archivo por
  archivo. La solución real es que el script recorra solo: agregado `--all` (busca todos los PDF sin
  `.md` bajo `Clubes/`, sin tipear ninguna ruta), `--limit N`, `--dir <subcarpeta>`, `--concurrency N`
  (default 2) y reintento con backoff en 429/5xx. Corre entero desde la terminal de Guido, 0 tokens
  de Claude sea 1 PDF o sean 2000.
- Movido de `Admin/test-costo-transcripcion/` (donde nació como parte del to-do 66) a `tools/`, junto
  con el resto de las herramientas del proyecto (`audit.js`, `generate-rankings.js`, etc.). La API key
  se movió con él, a `Admin/gemini/.env` (gitignoreada, mismo criterio que la de Resend).

## Versión 244 — test de costo/calidad de transcripción Sonnet vs Haiku vs Gemini (cierra el to-do 66)

- **Resultado en `Admin/test-costo-transcripcion.md`**: 30 PDFs reales de Colombia, 10 por pata.
  Gemini 3.8 Flash salió más barato ($0,09/doc en promedio, 0 tokens de Claude), más rápido, y el
  único con verificación independiente 10/10 perfecta. Sonnet fue el más caro (~184k tokens/doc) pero
  sin errores de completitud. **Haiku, más barato que Sonnet, tuvo 4 de 10 documentos con páginas
  faltantes o colapsadas pese a reportar "transcripción completa"** — el hallazgo central del test.
- **Herramienta nueva**: `Admin/test-costo-transcripcion/gemini-transcribe.mjs`, script standalone
  (corre desde terminal, sin sesión de Claude ni tokens de Claude) para transcribir un PDF vía la API
  de Gemini. Necesita `Admin/test-costo-transcripcion/.env` con `GEMINI_API_KEY` (gitignoreado, mismo
  criterio que la key de Resend).
- **30 transcripciones reales cargadas** a `Clubes/Colombia/<Club>/estados-financieros-<año>.md` —
  26 completas y usables, 4 (de la pata Haiku) marcadas con una advertencia al principio del archivo
  por páginas faltantes, pendientes de completar antes de usarse para cargar datos.

## Versión 243 — tres mejoras a la pestaña Ligas (cierra el to-do 68)

- **Orden por división, no alfabético** (`ligasDePaisAlfa()`, `js/liga.js`): cuando un país tiene
  más de una liga cargada, la grilla de `estadoFrio()` ahora las ordena por `LEAGUES[lid].tier`
  ascendente (nombre como desempate), en vez de `.name.localeCompare(...)`. Corrige el caso
  argentino, que salía "Primera B Metropolitana (3ª), Primera División (1ª), Primera Nacional (2ª)".
- **% del total en el gráfico de barras**: el plugin `ligaValueLabels` de `grafico()` ahora escribe,
  debajo del valor en M/MM USD de cada barra, el `(N%)` que esa barra representa del total de la
  liga-ejercicio — se ve tanto en la pestaña Ligas como en la vidriera de Inicio, que comparten la
  función. Reusa la cuenta del total (`totalDe(r)`, nueva), la misma que ya usaban `tabla()` y
  `salvedades()`.
- **Desglose de ingresos por categoría, por club**: debajo de la tabla del ranking, un bloque nuevo
  (`desglose()`) muestra la composición de cada club en las categorías de Formato simplificado
  (Comercial/Sponsors, Estadio, Televisión, etc.), siempre visible y sin toggle — Guido corrigió el
  pedido original ("que se halle scrolleando", no al click). El dato ya estaba precalculado: `mix`
  en `data/rankings/<liga>.js` viene de la Versión 182, hasta ahora solo se leía para el aviso del
  bolsón sin desglosar. No hizo falta tocar `tools/generate-rankings.js`.

## Versión 242 — tooltip "?" en México, explica por qué el país casi no tiene clubes (cierra el to-do 47)

- **El paso "País" del selector (`js/selector.js`)**: la fila de México, además del flag y "1 club",
  ahora lleva un círculo "?" (`op.info` en `PASOS_FILTRO`, sección `country`). Hover en desktop,
  click/tap en mobile (donde no existe hover) — un bocadillo de 2-3 líneas explica que el Reglamento
  de Control Económico de la Liga MX exige balances auditados (art. 26) Y en el mismo texto los
  declara confidenciales (art. 12): los balances existen, nadie fuera de la liga puede verlos. Menciona
  a Club América (el único club mexicano cargado, vía el segmento "Fútbol" de Ollamani en la BMV) como
  excepción parcial. El tooltip explica una ausencia, no reemplaza tener el club: no toca el conteo
  "1 club" ni ningún ranking.
- **El bocadillo NO cuelga del botón "?"**: `.paso` recorta con `overflow:hidden` (para sus esquinas
  redondeadas), así que un bocadillo posicionado como descendiente se cortaba apenas el botón quedaba
  cerca del borde de la card — le pasaba justo a México, la última fila de Países. Se resolvió con un
  único `<div class="op-info-float">` (`position:fixed`) colgado de `document.body`, reposicionado con
  `getBoundingClientRect()` en cada apertura (`mostrarInfo()`), que esquiva cualquier `overflow` ajeno
  en el camino. Un solo bocadillo abierto a la vez; se cierra clickeando afuera o si el paso se
  repinta (`cerrarInfosAbiertas()` en `renderModal()`/`close()`).
- 2 claves nuevas en `data/lang/en.js`: `sel.country.mx.info`, `sel.info.aria`.
- `ASSET_V` 240 → 241 (se tocó `js/selector.js` y `js/styles.css`), constante y los 15 `<script src>`;
  `fuentes.html` y sus 161 páginas de club regeneradas.
- Verificado en el navegador, en los dos idiomas y en mobile (375px): el tooltip se ve completo (no
  recortado), no selecciona México al abrirse, y seleccionar la fila (fuera del "?") sigue marcando el
  país con normalidad. `node tools/audit.js`: 0 P0, 0 P1, 0 P2 (igual que antes de esta sesión).

## Versión 241 — brandColor al onboarding, eje `datos` de la auditoría por país, sentinel de liga sin catálogo (to-dos 56 y 64)

- **`club-or-year-onboarding/SKILL.md`**: nuevo paso en el checklist de cierre — un club NUEVO
  verifica su `brandColor` contra el escudo real (Browser pane) antes de cerrar la sesión, una sola
  vez, no en cada auditoría periódica. Existía el proceso para ELEGIR el hex (sección 3, por texto:
  Wikipedia/`theme-color`/agregadores) pero nunca una verificación VISUAL contra el escudo, y esa
  falta dejó pasar los 2 errores de abajo.
- Corregidos con ese chequeo nuevo: `godoycruz-ar` `#0000FF` (azul saturado) → `#0070D0` (celeste
  real, muestreado por píxel del escudo de Wikimedia); `fortaleza-br` `#FF0000` → `null` (tricolor
  declarado azul/rojo/blanco sin predominancia, mismo criterio que `saopaulo-br`/`bahia-br`).
  Documentado en `fuentes/Argentina/Godoy Cruz.md` y `fuentes/Brasil/Fortaleza.md`.
- **`auditoria-finance-of-sports/SKILL.md`**, eje `datos`: ahora se corre POR PAÍS, no sobre el
  proyecto entero (Brasil 32 clubes, España/Reino Unido 19, Argentina 18 — la escala real medida el
  2026-09-26, muy por debajo de los 120 que no entraron en una sola corrida). `brandColor` sale de
  este eje: ya se verifica en el onboarding (punto anterior), así que la auditoría periódica no
  vuelve a pedirlo. Mecanismo de "a qué país le toca": campo nuevo **Última auditoría de datos:
  AAAA-MM-DD** en cada `fuentes/_indice/<País>.md` (44 archivos), mismo patrón que "Último chequeo"
  de sourcing — REGLA 5 nueva en `fuentes/README.md`.
- **Sentinel `'liga-no-catalogada'`** en `data/club-leagues.js`: un tercer valor posible además de
  `null` y un id real, para un ejercicio cuya liga SÍ se verificó pero todavía no está en el catálogo
  (`data/leagues.js`). Aplicado a `fredericia-dk` 2019 (Nordic Bet Ligaen) y `zultewaregem-be` 2025
  (Challenger Pro League) — decisión de Guido: no sumar las 2 ligas de segundo escalón al catálogo
  por un solo club-ejercicio cada una. Se comporta como `null` para el selector (no matchea ninguna
  liga real) pero cuenta como verificado en `clubLeagueCoverage()`, así que no queda pendiente para
  siempre. El P2 `liga-sin-fila` de `tools/audit.js` deja de marcar estos 2 casos.
- `node tools/audit.js`: P0 0, P1 0, P2 0 (bajó de 1, era `liga-sin-fila`) tras este cambio.
- To-dos 56 y 64 cerrados en `Admin/TODO.md` (implementados, no solo decididos).
- `ASSET_V` 239 → 240 (se tocaron `data/clubs.js` y `data/club-leagues.js`); regenerados
  `fuentes.html` + sus 161 páginas de club y `sitemap.xml`.

## Versión 240 — unificar "derechos de formación / mecanismo de solidaridad" a `player_sales` (to-do 43)

- Recategorizadas a `player_sales` las líneas de ingreso que representan derechos de
  formación/mecanismo de solidaridad FIFA (plata cobrada por jugadores formados en el club y
  transferidos después) en 5 de los 7 clubes que el to-do 43 listaba con este concepto escondido en
  el catch-all: Botafogo (3 ejercicios, "Mecanismo de solidariedade (recebido)"), Cruzeiro (4
  ejercicios, mismo rótulo), Grêmio (1 ejercicio, "Mecanismo de Solidariedade"), Racing (3
  ejercicios, "Cobros de derechos de formación y mecanismo de solidaridad") y Vélez (los 11
  ejercicios cargados, "Derechos de formación"). Estaban en `youth_football`/`other_income`, ahora
  en `player_sales`, mismo destino que ya usan Argentinos/Boca/Envigado/Independiente/Once
  Caldas/Rosario Central/San Lorenzo para el mismo concepto — pura reclasificación, ningún monto
  tocado.
- **Estudiantes de La Plata y Unión (Santa Fe) NO se tocaron**: revisando sus balances fuente, la
  única línea de `youth_football` de cada uno ("Recursos fútbol infantil/amateur" en Estudiantes,
  "Ingresos Fútbol Amateur" en Unión) es ingreso operativo de la escuela/departamento de fútbol
  amateur del club, no cobros de mecanismo de solidaridad — un concepto distinto que en estos 2
  clubes no tiene una línea propia identificable en el documento (Unión ya tiene "Otros recursos por
  derechos sobre jugadores" en `player_sales`, que probablemente ya cubre esto). Forzar la
  recategorización habría mezclado ingreso real de programa juvenil con venta de jugadores. Quedó
  documentado como pregunta abierta en `Admin/dudas-por-club.md` (secciones Estudiantes de La Plata y
  Unión).
- Verificación: `node tools/audit.js` (P0 0, P1 0 tras regenerar rankings/índice/fuentes) y
  `auditAll()`/`verifyTieOuts()` en el navegador — mismo baseline de siempre (842 checks cierran, 3
  no cierran — el caso ya documentado de Bayern Munich —, 0 warnings de fx) antes y después del
  cambio, ningún total se movió.
- `ASSET_V` 238 → 239 (se tocaron 5 `data/<club>-data.js`); regenerados
  `data/rankings/{ar-primera,br-serieA,br-serieB}.js`, `fuentes.html` + sus 161 páginas de club y
  `sitemap.xml`.

## Versión 239 — se parte el bloque CLUB-INDEX de `Admin/ESTADO.md` a un archivo propio (to-do 63)

- `Admin/ESTADO.md` se acercaba al umbral de 60 KB que usa `tools/audit.js` (55,98 KB a 161 clubes,
  de los cuales 12,35 KB eran el bloque `CLUB-INDEX:START`...`CLUB-INDEX:END` generado por
  `node tools/generate-club-index.js`) — a ese ritmo el umbral se cruzaba en ~218 clubes, 40-50 más
  que al momento de la auditoría de escala del 2026-09-26 que lo detectó.
- El bloque se movió a `Admin/ESTADO-clubes.md`, archivo nuevo, con un puntero de una línea en
  `Admin/ESTADO.md` donde vivía — mismo mecanismo que liberó a `index.html` de su comentario interno
  en la Versión 138. `Admin/ESTADO.md` bajó a 44,47 KB; `Admin/ESTADO-clubes.md` pesa 12,97 KB.
- `tools/generate-club-index.js` ahora escribe en `Admin/ESTADO-clubes.md`, no en `Admin/ESTADO.md`
  (los marcadores se mantuvieron como texto plano, mismo criterio que en la migración de la Versión
  138). `node tools/generate-club-index.js --check` confirma que quedó al día.
- Referencias actualizadas en `CLAUDE.md`, `Admin/CONVENCIONES.md`, `Admin/COMO-CORRE-EL-PROYECTO.html`
  y en los skills `start-session-finance-of-sports-project`, `club-or-year-onboarding`,
  `club-data-mapping`, `auditoria-finance-of-sports` y `escala-finance-of-sports` (esta última marca
  el punto caliente correspondiente como RESUELTO). Sacada la entrada de `tools/audit-ignore.json`
  que silenciaba `Admin/ESTADO-clubes.md` como "nombre propuesto, todavía no existe": ya existe.
- `node tools/audit.js`: P0 0, P1 0 (los P1 que aparecen en una corrida en paralelo son de datos sin
  commitear de otra sesión concurrente en el mismo working tree, no de este cambio).

## Versión 238 — CSS de `index.html` a `js/styles.css` (to-do 65)

- Sacado el bloque `<style>` inline de `index.html` (754 líneas, líneas 31-786) a
  `js/styles.css` nuevo, referenciado con `<link rel="stylesheet" href="js/styles.css?v=238">`,
  mismo criterio de `?v=` que los `<script src>` propios. `index.html` bajó de 142 KB a 84 KB;
  `js/styles.css` pesa 57 KB. El JS ya estaba separado desde antes — el CSS era lo último
  mezclado con el markup.
- `ASSET_V` subido de 231 a 238 (la constante y los 15 tags, no uno solo — ver CLAUDE.md gotcha
  de caché) para invalidar el CSS nuevo en el navegador de cualquier visitante con la página
  vieja cacheada.
- Corrido `node tools/generate-fuentes-page.js` porque ese generador lee `ASSET_V` de
  `index.html` (161 páginas de club + `fuentes.html` + `sitemap.xml` regenerados con `v=238`).
- Verificado en el navegador (desktop y mobile, Inicio y Finanzas) que el sitio se ve idéntico
  antes/después del split. `node tools/audit.js`: P0 0, P1 0 (igual que antes del cambio).

## Versión 237 — chequeo de git post-auditorías + 2 to-dos nuevos (saved searches, commit pendiente)

- `tools/audit-ignore.json`: 2 entradas nuevas para `ruta-muerta` (`Admin/ESTADO-clubes.md` y
  `Admin/test-costo-transcripcion.md`, ambos nombres de archivo PROPUESTOS dentro de to-dos
  existentes, todavía no creados a propósito — no son punteros rotos).
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md`: la tabla de pesos de la
  sección 1 estaba desactualizada en casi todos sus renglones (crecieron entre 41 y 161 clubes);
  re-medida con `wc -c` y actualizada entera. Esto apagó el P3 `doc-peso-desfasado` que había
  disparado `tools/audit.js` sobre `Admin/TODO.md`.
- `Admin/TODO.md`: dos to-dos nuevos. **70**, pedido de producto de Guido: guardar las búsquedas de
  cada usuario como "Saved Searches", visibles en su cuenta — primera razón de producto para tener
  cuentas de usuario (distinta del corte free/paid ya descartado el 2026-09-14, que sigue
  descartado). **69**: hay trabajo real de varias sesiones concurrentes del 2026-09-26 (la rotación
  completa de auditoría, Versiones 230-236, más 5 reportes en `auditorias/`) sin commitear — nada
  roto (`tools/audit.js` sigue en P0 0 / P1 0), pero mezclado entre sesiones y sin revisar junto
  todavía, así que se deja para que alguien lo revise y commitee con criterio en vez de hacerlo a
  ciegas.

## Versión 236 — decisión de Guido: partir el eje `datos` por país + mover `brandColor` al onboarding

- Sesión de consejo (sin tocar código ni skills): midió en frío `tools/audit.js` — 0,56-0,58s CPU a
  161 clubes contra 0,28s a 41 (2026-09-17), sub-lineal (exponente ~0,53), proyectado ~2,8s incluso
  a 3.000 clubes (techo del to-do 36). **El script nunca fue el cuello de botella** — el problema es
  exclusivamente el tiempo de lectura MANUAL del eje de juicio `datos`, que ya se rompió el
  2026-09-26 (120 clubes nuevos sin poder revisar `brandColor`, spot-check de solo ~10).
- Comparó 4 opciones (partir por país, dejarlo como está, incremental/cacheado en el script, mover
  el chequeo al onboarding) contra el precedente ya existente en el proyecto (`fuentes/README.md`
  trackea staleness por país para sourcing con el mismo patrón que haría falta acá).
- **Guido decidió dos, complementarias**: (a) partir el eje `datos` por país (`auditoria-finance-of-
  sports/SKILL.md`, Capa 3) y (b) mover la verificación de `brandColor` al cierre del onboarding
  (`club-or-year-onboarding/SKILL.md`), en vez de a la auditoría periódica. Descartado tocar
  `tools/audit.js` (no hace falta, medido). Registrado en **to-do 56** con el contexto completo,
  la dependencia entre (a) y (b), y los tamaños reales por país (Brasil 32, España/Reino Unido 19,
  Argentina 18) para calibrar el alcance de una corrida — sin implementar todavía.

## Versión 235 — auditoría de tokens (161 clubes, eje `tokens`), cierra la tercera vuelta de la rotación

- `auditorias/2026-09-26-tokens.md`, corrida completa del eje `tokens`, contra la línea de base
  `2026-09-20-tokens.md` (41 clubes). El piso de arranque obligatorio creció 49% (119→179 KB)
  mientras el proyecto creció 3,9x en clubes (41→161) — sub-lineal, sano, misma conclusión que ya
  sacó `escala` hoy para `index.html` (crece por feature, no por club). Las dos pilas de tarea
  (onboarding, sourcing) crecieron más (+29% y +39%) porque `club-data-mapping`/`club-sourcing`
  acumularon los criterios de las docenas de clubes nuevos — no se recortó nada ahí, cada criterio
  existe por un error real que costó encontrarlo.
- **`tools/audit.js`**: `checkLineas()` generaliza el chequeo `signo-invertido` para reconocer, del
  lado ingreso, el vocabulario de deducción fiscal ya verificado 31 veces en clubes brasileños/
  hispanohablantes (imposto/tributo/dedução/retención/devolución) — nuevo agregado
  `P3 dedu-fiscal-conocida` en vez de pedir una entrada nueva de `tools/audit-ignore.json` por cada
  club que repite el mismo patrón. Probado con `git stash` sacando y devolviendo una entrada real
  (`cruzeiro 2024`) para confirmar que el chequeo viejo SÍ la pedía y el nuevo no. "Silenciados"
  bajó de 114 a 83 — no por dejar de verificar nada, sino porque esas 31 entradas dejaron de hacer
  falta.
- `start-session-finance-of-sports-project/SKILL.md`: corregido el peso prometido de `Admin/TODO.md`
  (23→32 KB, `doc-peso-desfasado`).
- **Borrado to-do 23(a)** de `Admin/TODO.md`: estaba marcado RESUELTO desde la Versión 140 citando
  `renderInicioStats()`, función borrada en la Versión 184 — llevaba ~92 versiones sin borrarse,
  contra la propia regla del proyecto de no dejar puntos resueltos marcados en vez de sacados.
- Corrida en paralelo con `docs` (Versión 234) y el mismo día que `datos`/`escala`/`código`
  (231-233): con las cinco, se cierra la tercera vuelta completa de la rotación.

## Versión 234 — auditoría de docs (161 clubes, eje `docs`), corrida en paralelo con `tokens`

- `auditorias/2026-09-26-docs.md`, corrida completa del eje `docs` (la anterior era
  `2026-09-20-docs.md`, 41 clubes).
- **Encontrado y corregido en el momento**: el párrafo que explica qué borra `netlify.toml` del
  deploy estaba copiado a mano en `CLAUDE.md`, `Admin/ESTADO.md` y `Admin/CONVENCIONES.md` — la
  copia de `CONVENCIONES.md` tenía los números de antes del crecimiento a 161 clubes (41 páginas /
  613 notas) y describía el mecanismo de forma vieja (lista de archivos sueltos en vez de "la
  carpeta `Admin/` entera", que es lo que hace `netlify.toml` de verdad desde la Versión 196).
  Corregida, alineada con `CLAUDE.md`. La copia de `Admin/ESTADO.md` tenía la misma redacción vieja
  (sus números ya estaban al día por la auditoría de `datos` de hoy) — corregida también al
  mergear los hallazgos de esta corrida.
- **`tools/audit.js` gana `checkParrafoNetlifyDuplicado()`** (P2, `doc-parrafo-netlify-desfasado`):
  compara las 3 copias del párrafo contra el conteo real de `fuentes/*.html` y `fuentes/**/*.md`,
  probado rompiendo un número a propósito antes de darlo por bueno.
- Dos snapshots vencidos en `start-session-finance-of-sports-project/SKILL.md` §4 (el "resultado
  esperado" de `auditAll()`/`tools/audit.js` seguía citando 41 clubes y datos del 2026-09-22,
  incluyendo "0 que no cierran" cuando hoy hay 3 ya explicados por redondeo de fuente): reescritos
  con los números de hoy y un criterio que no vuelve a vencer solo (compara contra la explicación ya
  documentada en el data-file, no contra un total fijo).
- Mismo patrón en `Admin/ARQUITECTURA.md` ("dibuja los 41 clubes...", corregido a "todos los clubes
  cargados (161 al 2026-09-26)").
- Reconfirmado sin cambios: el patrón "cita código ya borrado" (hallazgo estrella del 2026-09-20) no
  reapareció en las 9 funciones chequeadas, y la duplicación de datos de club sigue resuelta.

## Versión 233 — auditoría de código (161 clubes, eje `codigo`), reverifica la Versión 232 el mismo día

- `auditorias/2026-09-26-codigo.md`, corrida completa del eje `codigo` de
  `auditoria-finance-of-sports`, pedida fuera de rotación (la última corrida de este eje era
  `2026-09-20.md`, 41 clubes). Los 5 chequeos del skill, todos limpios: consola (solo el beacon de
  Cloudflare ya conocido y 3 avisos de `bayernmunich-de` ya explicados), `Chart.instances` estable
  (6→6) sobre 15 ciclos de navegación y 10 de toggles, listeners netos en `window`/`document` en
  1/1 (balanceado), `loadClubData()` con un club forzado a 404 sigue mostrando el aviso visible
  desde Finanzas (to-do 40 de la corrida anterior, confirmado que sigue arreglado), y 0 deriva en
  10 ciclos de moneda×formato sobre Boca 2025.
- **La Versión 232 (pestaña Ligas, botón de volver, cards por continente) se revisó el mismo día que
  se commiteó**: 15 ciclos completos de entrar/salir de una liga no dejaron cargando ningún chart
  huérfano ni agregaron un listener neto a `window`/`document`. Sin hallazgos.
- **Gotcha de entorno nuevo en `CLAUDE.md`**: el propio `index.html` (no solo sus `<script src>`) se
  puede quedar cacheado entero en el navegador de esta sesión — una pestaña nueva siguió leyendo
  `ASSET_V` viejo. Único fix que funcionó: un query string en la URL de nivel superior (`/?cb=...`),
  no en un `<script src>`.
- Aparte, no de código: se notó que el `to-do 40` de `Admin/TODO.md` se reusó para dos temas
  distintos en momentos distintos (el aviso de error de carga, cerrado en la Versión 172, y después
  el CMS sin código) — contradice la convención de no reusar números liberados. Anotado para el
  próximo eje `docs`, sin acción en esta corrida.
- Corridas concurrentes el mismo día: `auditorias/2026-09-26.md` (`datos`, Versión 231) y
  `auditorias/2026-09-26-escala.md` (`escala`, Versión 230, otra sesión). Con las tres, faltan
  `docs` y `tokens` para cerrar la tercera vuelta completa de la rotación.

## Versión 232 — pestaña Ligas: botón de volver, cards por continente

- `js/liga.js`: al elegir una liga no había forma de volver al estado frío (la grilla de ligas) más
  que el nav, que además la reconstruye de cero. Nuevo botón "‹ Volver a Ligas" arriba de la liga
  elegida (`botonVolver()`), que solo resetea `st` y vuelve a renderizar — no navega, así que no
  pierde la posición de scroll.
- `estadoFrio()` (la grilla de las ligas, pedido explícito de Guido, 2026-09-26): pasó de una grilla
  plana ordenada por tier+nombre a un card por continente (`REGIONS`, mismo orden editorial que usa
  el selector jerárquico), y dentro de cada card, país y liga en orden alfabético (`paisesDeRegionAlfa()`,
  `ligasDePaisAlfa()`) — a diferencia del selector, acá no hay ningún tier a la vista que justifique
  ordenar por escalón primero.
- CSS nuevo en `index.html`: `.liga-frio-cont`/`.liga-frio-cont-t` (el card y su título de
  continente) y `.liga-volver` (mismo lenguaje visual que `.liga-club-link`, texto azul sin fondo).
- `data/lang/en.js`: clave nueva `liga.back`.
- `ASSET_V` 229 → 231 (231 para no pisar la 230 de la auditoría de escala concurrente) y
  `node tools/generate-fuentes-page.js` corrido de nuevo por el bump.

## Versión 231 — auditoría de datos (161 clubes, eje `datos`), se cierra la segunda vuelta de la rotación

- `auditorias/2026-09-26.md`, corrida completa del eje `datos` de `auditoria-finance-of-sports`,
  contra la última corrida de este eje (`2026-09-13.md`, 41 clubes). Los 7 grupos de P2 de esa línea
  de base (to-do 20, 8 subpuntos) están todos cerrados; `tools/audit.js` bajó de 52 P2/7 P3 a 2 P2/9
  P3 pese a que el proyecto casi se cuadruplicó.
- **P1 arreglado en el momento**: `fuentes.html` y sus 161 páginas de club habían quedado atrás de
  `data/clubs.js`. `node tools/generate-fuentes-page.js` las regeneró (297 documentos en total).
- **Dos números stale corregidos** en `CLAUDE.md` y `Admin/ESTADO.md`: decían "41 páginas
  `fuentes/<clubId>.html`" y "613 notas de `fuentes/**/*.md`" desde que el proyecto tenía 41 clubes;
  ahora dicen 161 y 655 (conteo real).
- **Hallazgo principal del eje de juicio**: la verificación de `brandColor` contra el escudo real de
  los clubes nuevos desde la última corrida (120, de 41 a 161) no se pudo cubrir entera en una
  sesión. Un spot-check de ~10 encontró 2 casos con problema (`godoycruz-ar`: azul saturado en vez
  de celeste; `fortaleza-br`: rojo elegido para un club tricolor declarado, inconsistente con
  `saopaulo-br`/`bahia-br` que sí quedaron en `null` por el mismo motivo). Quedan ~108 clubes sin
  ninguna verificación. **to-do 56** (partir el eje `datos` por país, pedido de Guido 2026-09-23)
  pasa de "no urgente" a tener evidencia concreta; **to-do 64** nuevo con los 2 `brandColor` a
  corregir y el hueco de catálogo de ligas de segunda división (`liga-sin-fila`, ya documentado
  a propósito en `data/club-leagues/dk.js` y `be.js`, pero sigue marcando en cada corrida).
- Corrida concurrente el mismo día: `auditorias/2026-09-26-escala.md` (Versión 230, otra sesión). Los
  dos reportes se referencian entre sí para no duplicar mediciones.

## Versión 230 — auditoría de escala (161 clubes, eje `escala`)

- `auditorias/2026-09-26-escala.md`, corrida completa del eje `escala` de
  `.claude/skills/escala-finance-of-sports/`, la primera desde el 2026-09-17 (41→161 clubes en 9
  días). Resueltos desde la corrida anterior: buscador del selector y grid de país del constructor
  de mezcla (`grillaConTope()`, tope 30 + debounce + índice de texto cacheado); `auditAll()` en
  tandas se reconfirma sin cambios.
- Hallazgo nuevo, el más urgente del reporte: `Admin/ESTADO.md` va a cruzar su umbral de 60 KB en
  ~218 clubes (40-50 clubes más al ritmo actual), no en "~600" como proyectaba el mapa viejo — la
  proyección anterior asumía la prosa fija constante, y hoy esa prosa sola ya son 43,3 de los 60 KB
  de presupuesto. To-do 63 nuevo: mover el bloque `CLUB-INDEX` generado a un archivo separado.
- Payload eager de `index.html` (10 archivos desde que se sumaron `data/lang/langs.js` y
  `data/destacados.js`): comprimido subió de 29,3 a 49,7 KB en 9 días (1,7x, mientras los clubes
  subían 3,9x). Sigue sin ameritar el refactor pospuesto el 2026-09-20, pero to-do 62 nuevo: re-medir
  en la próxima corrida en vez de esperar a 1000 clubes.
- Confirmado sano sin cambios de fondo: `clubId` heredado (41, sin crecer), `data/club-leagues.js`
  (289 filas, partido por país), backlog de transcripción en `Clubes/` (la brecha con lo cargado se
  achica, no se agranda: 2,25x carpetas y 8,05x `.md` contra 8,2x y 30x el 2026-09-17), catch-all
  no-futbolístico (16/161 clubes, 9,9%, mismo ritmo que el 9,8% de la Versión 189), `tools/audit.js`
  (0,96 s con 161 clubes, sub-lineal).
- `.claude/skills/escala-finance-of-sports/SKILL.md` actualizada con todos los números de esta
  corrida. `Admin/TODO.md`: to-do 22 apunta al reporte nuevo; agregados 62 y 63.

## Versión 229 — club-outreach: regla de exhaustividad, cierre obligatorio, video como fuente

- `club-outreach/SKILL.md` (pedido de Guido, 2026-09-26), tres reglas nuevas:
  - **Exhaustividad**: un club recién está listo para el primer mail cuando se agotó el sourcing de
    al menos sus últimos 5 ejercicios y se onboardeó lo que se haya encontrado — recién ahí se
    compilan TODAS las dudas/candidatos-a-mail pendientes en UN SOLO mail, nunca uno por pregunta a
    lo largo de varios meses.
  - **Cierre obligatorio**: todo mail invita a pasarse por financeofsports.com y deja en claro que
    el sitio está en construcción (variando la redacción exacta entre mails).
  - **Video como fuente**: un documento que solo existe como presentación en YouTube (ej. Banfield,
    105° Ejercicio) es válido si Guido lo mira y saca las cifras a mano — mismo tratamiento que un
    PDF. Si el video no tiene números reales, el mail lo dice explícitamente en vez de simular que
    no se buscó.
- `club-sourcing/SKILL.md`: nueva instrucción — guardar la URL exacta de un video/nota de prensa,
  no solo el título (el gap se encontró de verdad: `fuentes/Argentina/Banfield.md` tenía el título
  del video del 105° Ejercicio pero no el link).
- `fuentes/Argentina/Banfield.md`: intento de agregar el link del video vía `WebSearch`
  (`youtube.com/watch?v=0CW5sF2NSGg`) **corregido el mismo día** — Guido confirmó que ese resultado
  era un falso positivo (un video sobre agricultura, sin relación), no el video real. Revertido a
  "link sin confirmar, buscar a mano" en vez de dejar una URL incorrecta citada como fuente.
- Nota aparte, no de esta sesión: `Admin/CHANGELOG.md` tiene DOS entradas "Versión 216" (esta de
  `club-outreach` — ya renumerada por otra sesión a la 218 — y una de "logging de búsquedas y
  comparaciones" agregada después). Detectado, no corregido acá: hay varias sesiones concurrentes
  trabajando sobre el mismo working tree ahora mismo, y renumerar historia ya commiteada le
  corresponde a una decisión de Guido, no a un arreglo de paso.

## Versión 228 — inventario completo de pendientes de sourcing/onboarding

- Pedido explícito de Guido: "hace la lista entera de pdfs que faltan transcribir y de
  transcripciones que faltan y ponelos en un mismo to-do así la siguiente sesión no tiene que hacer
  de detective". Archivo nuevo `Admin/inventario-pendiente.md` (~33 KB): 1 barrido determinístico del
  filesystem (PDFs sin `.md`, 2047 archivos en 15 países) + 2 agentes Explore en paralelo (América/
  Asia y Europa, cruzando `Admin/ESTADO.md` CLUB-INDEX contra cada `.md` de `Clubes/` y la cabecera de
  cada `data/<clubId>-data.js`) para las transcripciones ya hechas y sin cargar (~570 archivos).
- **Hallazgo más grande**: Colo-Colo/Universidad Católica/Universidad de Chile tienen cada uno hasta
  17 años de EEFF IFRS ya transcriptos (2009/2010-2025), pero solo 3 (2022-2024) están cargados —
  ~41 ejercicios-año sin usar, verificado directo con `grep` de las claves de año en cada data.js, no
  asumido del índice.
- Bélgica (~280 archivos) y Dinamarca (~110) concentran el grueso de "ejercicio nuevo de club ya
  cargado": los 14 clubes belgas y 10 daneses tienen series históricas completas (hasta 33 años en
  Club Brugge) pero solo 1 ejercicio cargado cada uno.
- 20 documentos nuevos identificados y descartados con motivo verificado (sumados a los ya conocidos
  de `Admin/TODO.md` punto 60): entidad equivocada (Real Betis: Fundación en vez de la S.A.D.; Vasco/
  Botafogo: associação social en vez de la SAF; FC København: holding PSE consolidada; Akhmat Grozny:
  plantilla regulatoria en blanco, ni siquiera es del club), versión rechazada por el propio club
  (Sevilla FC borrador 2022/23), sociedad sin actividad real (Coritiba SAF 2022), período parcial
  (Osasuna intermedio, Gaziantep FK, Ecuador Deportivo Cuenca), y más casos de "solo Memoria sin
  balance" en Argentina (Ferro Carril Oeste, Gimnasia y Esgrima LP, Unión, San Lorenzo, Racing, All
  Boys).
- Queda 1 to-do explícito sin resolver dentro del archivo: extraer del documento agregado de la
  J.League (texto en japonés, ~60 clubes en una sola tabla) la lista de clubes japoneses no
  cargados todavía — nadie llegó a procesarlo esta sesión.
- `Admin/TODO.md` punto 61 apunta a este archivo con los números resumidos, sin duplicar el detalle.
  No se tocó ningún `data/*.js` ni `ASSET_V` — es trabajo puramente de documentación/sourcing.

## Versión 227 — 20 transcripts más (15 clubes nuevos + 7 ejercicios), sin dead-ends esta vez

- De 146 a 161 clubes cargados, 269 a 291 ejercicios. Pedido de Guido: "20 más" (misma sesión que la
  Versión 226). A diferencia de la tanda anterior, esta vez se priorizó a propósito PAÍSES YA
  CARGADOS (Bélgica/Dinamarca/Croacia) — un agente Explore encontró que esos 3 países tenían series
  históricas completas ya transcriptas y sentadas sin cargar en `Clubes/`, así que los 20 candidatos
  salieron de ahí para minimizar scaffolding nuevo. Trabajo repartido en 5 agentes paralelos, mismo
  esquema de límites (no tocar archivos compartidos) que la Versión 226. **Ninguno de los 20 resultó
  dead-end esta vez.**
- **15 clubes NUEVOS**: Bélgica +7 (Standard Liège, Union Saint-Gilloise —campeona 2024/25, primer
  título desde 1934/35—, Westerlo, Zulte Waregem, Sint-Truiden, Cercle Brugge, Dender EH), Dinamarca
  +5 (FC Fredericia 2019, FC Nordsjælland 2024, Randers FC 2022/23, Vejle 2024, SønderjyskE 2022),
  Croacia +3 (Istra 1961, Varaždin, Gorica).
- **7 ejercicios nuevos de 4 clubes ya cargados**: Los Andes 2019/20 (Ejercicio 104), RB Leipzig
  2021/22, Bayern Munich 2022/23 (mismo caso de fuente agregada que 2020/21: solo 4 cifras, sin
  desglose de GuV), Botafogo — el de Río, NO Botafogo-SP — 2023 y 2025 (con corrección de errores
  reales de OCR encontrados y corregidos antes de cargar: dígitos transpuestos en 3 líneas), Cruzeiro
  2022 (campeón Série B, ascenso) y 2023 (14° en Série A, primer año de vuelta).
- **2 P0 reales encontrados y corregidos en la integración** (ambos por aplicar mal el patrón
  "Chelsea" de `exceptional_items`, que en `computeYearGeneric()` solo se excluye de `expenses` del
  lado de GASTOS, nunca de `revenue`): Zulte Waregem 2025 tenía `officialTotalRevenue` restándole un
  ingreso `exceptional_items` (diferencia de 2,63M EUR); Dender EH 2025 tenía `officialTotalExpenses`
  SIN restarle un gasto `exceptional_items` (diferencia de 37 mil EUR). Además, 2 líneas de INGRESO
  (Zulte Waregem, Botafogo 2023) estaban categorizadas `exceptional_items`, que es una categoría de
  la taxonomía de GASTOS y no existe del lado de Ingresos (`categoria-cruzada`, P2) — recategorizadas
  a `other_income`.
- **2 clubes quedaron sin fila en `data/club-leagues/*.js` a propósito**: Zulte Waregem jugó
  Challenger Pro League (2ª división belga) en el ejercicio cargado, la ganó y ascendió recién para
  2025/26; FC Fredericia jugó Nordic Bet Ligaen (1. Division, 2ª división danesa) en 2019, ascendió a
  Superliga recién para 2025/26. Ninguna liga de 2do escalón belga/danesa existe en el catálogo
  todavía — se dejó sin fila en vez de forzarlas a `be-proleague`/`dk-superliga`.
- **7 entradas nuevas a `FX_CLOSE`** (`data/currency-map.js`): `DKK@2019-12-31`, `DKK@2022-06-30`,
  `DKK@2023-06-30` (esta última sourceada DIRECTO del Danmarks Nationalbank, no cruzada vía BCE — más
  precisa cuando está disponible). Y una liga nueva: `ar-primerab` ya existía (Versión 226), se
  reusó para Los Andes 2020.
- **14 hallazgos nuevos verificados y silenciados en `tools/audit-ignore.json`**: 5
  `signo-invertido` (deducciones fiscales brasileñas + una variación de existencias belga, todas
  líneas negativas legítimas) y 9 `catchall-dominante` (Standard Liège/Union SG/Westerlo/Sint-Truiden/
  Cercle Brugge/Dender EH: ninguno completó la Nota 6.10 belga de desglose de Omzet; SønderjyskE:
  exención §32 danesa, mismo caso que FC Midtjylland; Cruzeiro 2023: ingreso financiero/patrimonial
  extraordinario real, sin categoría mejor disponible).
- ASSET_V 227 → 228 (constante Y los 15 `<script src>` estáticos, `index.html`), 3 generadores
  corridos al final. `node tools/audit.js`: 0 P0, 0 P1, 1 P2 (intencional, ver arriba), 8 P3.
  `auditAll()` en el navegador: 842 checks (3 no cierran, los mismos de Bayern Munich 2024/2025 ya
  conocidos, nada nuevo), 0 warnings de fx, 0 clubes que no cargaron.
- ~30 preguntas nuevas en `Admin/dudas-por-club.md` (catch-alls grandes sin desglose completo en la
  fuente en varios clubes belgas, sospecha de `player_sales` sin confirmar en 2 clubes "feeder" —
  Sint-Truiden/DMM, Cercle Brugge/Monaco—, un restatement de Botafogo 2024 sin resolver) — detalle
  completo ahí, sección "2da tanda de 20 transcripts más".

## Versión 226 — 20 transcripts al azar, sin prioridad de país (15 clubes nuevos + 5 ejercicios)

- De 131 a 146 clubes cargados, 248 a 269 ejercicios. Pedido de Guido: elegir 20 transcripciones ya
  hechas y sin cargar, "no me importa un orden específico" — se armó una lista de ~51 candidatos
  (agente Explore recorriendo `Clubes/` completo contra los 131 `data/*.js` ya cargados) y se
  eligieron 20 priorizando países YA cargados (para minimizar scaffolding nuevo: moneda, liga,
  brandColor de un país entero) y balance de clubes nuevos vs. ejercicios nuevos de clubes ya
  cargados. Trabajo repartido en 5 agentes en paralelo (4 clubes cada uno), cada uno con el límite
  explícito de NO tocar archivos compartidos (`clubs.js`/`category-map.js`/`currency-map.js`/
  `club-leagues/*`/`Admin/*`/`fuentes/*`) para poder correr en simultáneo sin pisarse — solo crear/
  editar su propio `data/<club>-data.js` y reportar los snippets para integrar después. Integración
  centralizada (clubs.js, FX_CLOSE, club-leagues, generadores, audit) hecha en un solo paso al final.
- **3 de los 20 candidatos elegidos al azar resultaron dead-ends sin estados contables reales**
  (encontrado por los propios agentes ANTES de escribir ningún dato, sin inventar nada):
  **Temperley** (`memoria-ejercicio-2025-26.md`) y **Belgrano** (`memoria-anual-2020.md`) son
  "Memoria" narrativa institucional pura, sin una sola tabla de Recursos/Gastos — confirmado también
  contra `fuentes/Argentina/Temperley.md` de una sesión de sourcing anterior, que ya documentaba el
  mismo hallazgo para Temperley. **Palestino** (`estados-financieros-2018.md`) es un estado
  financiero INTERMEDIO de 6 meses (jun-2019, con comparativo jun-2018), sin el Estado de Resultados
  del ejercicio ANUAL 2018 completo — mismo caso que Instituto (`club-or-year-onboarding` §15). Se
  reemplazaron por **Botafogo-SP, Juventude y Amazonas** (los 3 con DRE/P&L real verificado).
- **15 clubes NUEVOS**: Croacia +2 (Osijek, Slaven Belupo — ejercicio calendario 2025), Dinamarca +3
  (AGF 2020/21, Silkeborg IF 2024, Viborg FF 2024), Bélgica +3 (Charleroi, Mechelen, Antwerp —
  ejercicio 2024/25, mismo tipo de documento jaarrekening/comptes annuels que los 4 ya cargados),
  Brasil +5 (Ceará 2024-2025, Sport Recife 2025, Amazonas 2024, Juventude 2020, Botafogo-SP 2024 —
  este último es la SAF de Ribeirão Preto, NO el Botafogo de Río ya cargado), Argentina +2 (Godoy
  Cruz 2019/20, Los Andes 2020/21 — 3er escalón, `ar-primerab` nueva en el catálogo de ligas).
- **5 ejercicios nuevos de clubes ya cargados**: Cruzeiro 2024 (déficit real mayor al de 2025),
  Coritiba 2023 (ejercicio parcial, la SAF recién quedó operacional a mitad de año — 2022 no se
  cargó, sin actividad real), Chapecoense 2017 (post-tragedia LaMia, resultado financiero positivo
  por los intereses de las donaciones recibidas), Bayern Munich 2020/21 (fuente mucho más chica que
  2023/24-2024/25: solo 4 cifras agregadas, D&A y resultado financiero combinados en una sola línea
  aproximada por no poder separarlos), RB Leipzig 2022/23 (Anhang 4.1 con 3 categorías de Umsatz en
  vez de las 4 de los otros 2 ejercicios, sin línea propia de transferencias ese año).
- **1 P0 real encontrado y corregido en la integración**: Sport Recife 2025 tenía la Nota 21
  ("Outras Despesas/Receitas Operacionais", -R$35.739 mil) categorizada `exceptional_items`, que el
  motor (`computeYearGeneric()`) suma DESPUÉS de `expenses` (junto a `nonCash`, no antes) — pero esa
  línea es parte del "Superávit/déficit operacional ANTES do resultado financeiro" que imprime el
  propio DRE, mismo nivel que Custos/Despesas administrativas. Recategorizada a `other_expenses`.
- **10 hallazgos nuevos verificados y silenciados en `tools/audit-ignore.json`**: 7 `signo-invertido`
  (deducciones fiscales impresas como línea negativa dentro de Ingresos — Botafogo-SP, Ceará ×2,
  Chapecoense, Sport Recife — y un crédito de `exceptional_items` en Charleroi, mismo patrón que
  Anderlecht/Club Brugge) y 3 `catchall-dominante` (Antwerp Ingresos/Gastos — Nota 6.10 belga sin
  completar por el club; Coritiba Ingresos — la cesión del 20% de los derechos comerciales del
  Brasileirão a Liga Forte União, R$152M de R$216,65M, sin categoría propia mejor disponible hoy).
- **6 entradas nuevas a `FX_CLOSE`** (`data/currency-map.js`): `EUR@2025-12-31`, `DKK@2021-06-30`,
  `DKK@2024-06-30` (promovida desde un `market_approx` mal etiquetado — el agente que la cargó la
  había calculado exacto vía SDMX del BCE, pero la marcó `market_approx` solo porque no podía tocar
  `currency-map.js`, no porque fuera una aproximación real), `BRL@2017-12-31`, `BRL@2020-12-31`,
  `ARS@2021-06-30`. Y una liga nueva en el catálogo: `ar-primerab` (Primera B Metropolitana, 3er
  escalón argentino, tier:3).
- **ASSET_V 226 → 227** (constante Y los 15 `<script src>` estáticos, `index.html`), 3 generadores
  corridos al final (`generate-club-index.js`, `generate-fuentes-page.js`, `generate-rankings.js`).
  `node tools/audit.js`: 0 P0, 0 P1, 0 P2, 8 P3, 100 silenciados. `auditAll()` en el navegador: 779
  checks (3 no cierran, los mismos ±0,1 M€ de redondeo de Bayern Munich 2024/2025 ya conocidos y
  silenciados, nada nuevo de esta tanda), 0 warnings de fx, 0 clubes que no cargaron.
- Corregido `fuentes/Brasil/Amazonas.md`: decía que ninguno de los 2 PDFs de Amazonas tenía estado
  de resultados — cierto para `balancos-2022-2023.pdf` (mala calidad de OCR, ver to-do 60), falso
  para `balanco-patrimonial-2024.pdf`, que sí trae una DRE de 7 líneas que reconcilia exacto.
- ~25 preguntas nuevas en `Admin/dudas-por-club.md` (categorización de rubros sin desglose completo
  en la fuente, un grossDebt ambiguo, brandColor ambiguo de Sport Recife) — detalle completo ahí,
  sección "Tanda de 20 transcripts al azar".

## Versión 225 — 3 países europeos nuevos (10 clubes): Croacia, Bélgica, Dinamarca

- De 121 a 131 clubes cargados, 238 a 248 ejercicios. Pedido de Guido esta vez sin prioridad de país
  ("de donde sea, cualquier año, repetir club o no, no importa") — con Sudamérica/España/Inglaterra
  ya agotados (Versiones 222-223) y buena parte de Alemania/Países Bajos cubierta (Versión 224), se
  abrieron 3 países europeos más en 3 agentes paralelos: **Croacia** (Dinamo Zagreb, Hajduk Split,
  Rijeka — ejercicio 2024, ya en euros porque Croacia adoptó el euro el 1/1/2023), **Bélgica** (Club
  Brugge, Anderlecht, Genk, Gent — ejercicio 2024/25) y **Dinamarca** (FC København, Brøndby, FC
  Midtjylland — DKK moneda nueva del sitio).
- **Los 3 agentes se cortaron por el límite de sesión a mitad de tarea** (no el límite semanal esta
  vez), cada uno en distinto grado de avance: Croacia y Bélgica llegaron a escribir los 3-4 archivos
  de datos completos y las notas de fuentes, solo faltaba `Admin/dudas-por-club.md` pese a que varios
  comentarios ya la referenciaban ("ver duda anotada..."); Dinamarca llegó solo a 2 de 3 clubes, sin
  ningún registro (clubs.js/leagues.js/moneda nueva/club-leagues). Se completó todo a mano.
- **4 P0 reales encontrados y corregidos en Bélgica**, los 4 con la MISMA causa que Chelsea (Versión
  223): `officialTotalExpenses` incluía por error el neto de `exceptional_items` en los 4 clubes
  (Anderlecht, Club Brugge, Genk, Gent) — la plantilla contable belga (NBB) reporta casi siempre una
  línea "Voorzieningen voor risico's en kosten"/"Niet-recurrente bedrijfs(kosten/opbrengsten)" que el
  motor excluye de ese chequeo. Corregido en los 4 casos.
- **1 P0 real en Dinamarca, causa distinta**: Brøndby 2020 tenía un sub-ítem "Bestyrelseshonorar"
  transcripto como -499 en vez de -0,499 (typo de decimal en la transcripción original, no un error
  de mapeo), atrapado por el chequeo `items-no-cierran` de `node tools/audit.js`.
- **DKK es moneda nueva** (`CURRENCY_META`/`FX_PLAUSIBLE_RANGE`/3 entradas `FX_CLOSE` en
  `data/currency-map.js`, cruzando DKK/EUR × EUR/USD del BCE, mismo método que ya usa el sitio para
  GBP) — la corona danesa está fijada al euro (ERM II) desde 1982, así que no es una moneda volátil.
- **FC Midtjylland usa el ejercicio 2018/19, no uno más reciente**: sus balances desde 2022/23 en
  adelante reportan la Resultatopgørelse desde "Bruttofortjeneste" (Revenue ya neteado contra Cost of
  Sales), sin desglosar Revenue bruto en ningún lado del documento — un formato legal danés que
  protege el detalle comercial pero que le impide a este sitio separar Revenue de Expenses de verdad.
  2018/19 sí reporta Nettoomsætning como línea propia, así que se usó ese año en su lugar.
- 3 nuevas ligas en el catálogo: `hr-hnl`, `be-proleague`, `dk-superliga`. Ninguno de los 10 clubes
  necesitó verificación de descenso salvo Brøndby (Superliga los 2 tramos de su ejercicio calendario
  2020, 4° y luego campeón) — confirmado contra Wikipedia, no asumido.

## Versión 224 — Países Bajos país nuevo (4 clubes) + 6 clubes alemanes grandes: Ajax, PSV, Feyenoord, AZ, Bayern Munich, Borussia Dortmund, RB Leipzig, TSG Hoffenheim, Hamburger SV, Borussia Mönchengladbach

- De 111 a 121 clubes cargados, 218 a 238 ejercicios. Con Sudamérica/España/Inglaterra ya agotados
  (Versiones 222-223), esta sesión siguió a pedido de Guido "más en Europa": Alemania (país ya
  cargado, 6 clubes nuevos) y Países Bajos (país nuevo, 4 clubes) en 3 agentes paralelos.
- **Hallazgo real de esta sesión**: para Países Bajos, los PDFs de Ajax/PSV/Feyenoord/AZ NO estaban
  transcriptos todavía (a diferencia de lo asumido al arrancar) — el agente los transcribió él mismo
  vía `pdftotext -layout` (los 8 documentos tenían capa de texto nativa, sin necesidad de OCR) antes
  de mapear ningún dato, siguiendo la regla de CLAUDE.md. País nuevo en `data/leagues.js`
  (`nl-eredivisie`), `data/club-leagues/nl.js` nuevo.
- Los 6 clubes alemanes se sumaron a Bundesliga/2.Bundesliga ya cargada (Köln, Eintracht Frankfurt,
  Augsburg, Stuttgart, Werder Bremen), sin infraestructura nueva. **3 casos de fuente de mala
  calidad, reconstruidos con cuidado, no descartados**: Hamburger SV (tabla de GuV/Bilanz garbled en
  la conversión PDF→Markdown, reconstruida cruzando el Lagebericht narrativo — `tax` quedó como plug
  contra el Jahresüberschuss real impreso, `grossDebt`/`cash` no se cargaron por no poder
  confirmarse); TSG Hoffenheim (Konzern-GuV con 3 líneas de resultado por la "atypisch stille
  Beteiligung" de Dietmar Hopp, duda abierta sobre qué línea usar como `officialPAT`); Borussia
  Mönchengladbach (GuV incompleta, sin fila de resultado financiero — se combinó con "Sonstige
  betriebliche Erträge" y se documentó como simplificación).
- **Bayern Munich, único con discrepancia visible en `verifyTieOuts()` del navegador**: la fuente
  cargada es el comunicado oficial anual (no el Geschäftsbericht completo con Anhang notarial),
  redondeado a 1 decimal en cada línea — sumar componentes puede diferir hasta ±0,1 M€ del total
  impreso, también redondeado. 3 entradas verificadas en `tools/audit-ignore.json` (Revenue 2024,
  Revenue 2025, PAT 2025); `node tools/audit.js` da 0 P0/P1/P2 porque SÍ consulta ese archivo, pero
  `verifyTieOuts()` del navegador no tiene mecanismo de excepciones y va a seguir marcando estos 3
  checks como "NO CIERRA" — es un artefacto de redondeo de la fuente, no un error de carga.
- Hamburger SV jugó 2. Bundesliga los 2 ejercicios (asciende recién en 2025/26). El resto de los 9
  clubes de esta sesión se mantuvo en su primera división todo el período cargado.

## Versión 223 — 15 clubes nuevos, Inglaterra (14) + España (Levante UD): Aston Villa, Bournemouth, Brentford, Brighton, Burnley, Chelsea, Crystal Palace, Fulham, Leeds United, Newcastle United, Nottingham Forest, Sunderland, West Ham, Wolves, Levante

- De 96 a 111 clubes cargados, 193 a 218 ejercicios. Sesión continuación de la Versión 222 (mismo
  pedido de Guido de agotar el pool de PDF ya transcriptos, prioridad Sudamérica agotada, siguió por
  España/Inglaterra). Ningún país nuevo — Inglaterra pasa de 5 a 19 clubes, España de 18 a 19.
- **4 agentes en worktrees aislados, 2 se cortaron a mitad de tarea por el límite semanal de uso**
  (uno había escrito 4 de 5 clubes sin registrarlos en `clubs.js`; el otro había delegado toda la
  investigación a 5 sub-agentes propios y nunca llegó a escribir un archivo). Se rescató el trabajo a
  mano en los 2 casos: para el primero, se completó lo que faltaba (brandColor, registro,
  club-leagues); para el segundo, se escribieron los 5 `data/<club>-data.js` directamente con el
  research ya verificado que los sub-agentes habían entregado. Los otros 2 agentes (Sunderland+3 y
  Brighton) terminaron solos sin problemas — Brighton fue el único que verificó de entrada estar
  sobre un commit reciente de `main`, evitando el problema que costó tiempo en la Versión 222.
- **1 P0 real encontrado y corregido en la integración**: `chelsea-gb` 2025 tenía
  `officialTotalExpenses` incluyendo por error un ítem `exceptional_items` (£50,2M, settlement UEFA
  por Financial Sustainability Regulations) — mismo patrón ya documentado desde Botafogo, el motor
  excluye exceptional_items de ese chequeo.
- **1 corrección de `fx`**: Wolves 2024-25 usaba una aproximación (`GBP@2025-05-31`) cuando la
  cotización EXACTA del día de cierre real (`GBP@2025-06-30`) ya estaba cargada en el catálogo.
- `gb-championship` es liga nueva (2ª división inglesa): Sunderland (2 ejercicios) y Leeds United (2
  ejercicios) jugaron ahí, no en Premier League — verificado contra el propio documento de cada club
  y WebSearch, no asumido. `FX_CLOSE` nuevo: `GBP@2024-07-31`/`GBP@2025-07-31` (cierre de ejercicio
  de Sunderland y Burnley, 31/7, distinto del 30/6 o 31/5 del resto).
- **Limitaciones genuinas documentadas, no errores de carga** (detalle completo en
  `Admin/dudas-por-club.md`): Aston Villa (cuentas individuales sin NINGÚN activo intangible ni
  compraventa de jugadores — el costo del plantel vive en otra entidad del grupo NSWE no depositada
  en Companies House, 93% de sus gastos operativos quedó como `lump_football_operations_expense`);
  Wolves 2024-25 es un período de transición de 13 meses (cambio de fecha de cierre de ejercicio);
  Fulham 2025 tiene un valor de "Gate Receipts" forzado por el total (posible error de OCR); Chelsea
  tiene "Cost of sales" sin desglose de wages y un gap de £1,6M sin explicar entre el P&L y sus notas
  de amortización de pases; Crystal Palace y Fulham quedan con `brandColor:null` (franjas rojo/azul
  sin predominancia declarada, camiseta blanca, respectivamente, mismo bucket que Levante/River).

## Versión 222 — 3 países sudamericanos nuevos (Chile, Perú) y evaluación de Ecuador: Colo-Colo, Universidad de Chile, Universidad Católica, Alianza Lima

- De 92 a 96 clubes cargados, 178 a 193 ejercicios. Prioridad explícita de Guido: Sudamérica primero.
  3 sesiones en paralelo (worktrees aislados) sobre el pool ya transcripto sin cargar: **Chile**
  (`colocolo-cl` 2022-2024, `udechile-cl` 2022-2024, `catolica-cl` 2022-2024 — los 3 con serie
  completa 2009/2010-2025 ya transcripta, se cargaron los 3 años más recientes de cada uno) y
  **Perú** (`alianzalima-pe`, los 6 ejercicios consecutivos disponibles, 2019-2024).
- Chile país nuevo: `cl-primera` en `data/leagues.js`, `data/club-leagues/cl.js` nuevo. Perú país
  nuevo: `pe-liga1`, `data/club-leagues/pe.js` nuevo.
- `FX_CLOSE` nuevo: `PEN@2022/2023/2024-12-31` (BCRP interbancario / TC contable SBS). Los 3 balances
  chilenos NO declaran TC propio y su tipo de cambio (dólar observado SII, día hábil más cercano al
  31/12) quedó `fx` LITERAL con `fxSource:'market_approx'` en cada archivo de club, no centralizado
  en `FX_CLOSE` — la regla ya escrita en `data/currency-map.js` reserva esa tabla para cotizaciones
  EXACTAS (`market_close`), justo para que nadie reuse una aproximación creyendo que es un cierre
  oficial.
- **Ecuador evaluado y descartado, a propósito**: LDU Quito 2022 (el único documento disponible
  consolida colegio + country club, CERO líneas de fútbol — la "Comisión Especial de Fútbol" aparece
  solo como saldo a cobrar) y Deportivo Cuenca (solo un historial de pagos SRI/IESS y un informe de
  caja de un semestre, sin resultado devengado contra qué hacer tie-out) no llegan al estándar de
  calidad del sitio. Ninguno de los dos se cargó; ambos documentados en `fuentes/Ecuador/` y
  `Admin/dudas-por-club.md` con preguntas concretas para un futuro reach-out.
- Las 3 sesiones se integraron a mano a `main` (no un merge de historia divergente: cada worktree
  había arrancado de un commit ~55-61 versiones viejo, sin la migración a `Admin/`, sin `brandColor`,
  con `totalClubs` todavía en `data/leagues.js` — se extrajo el contenido sustantivo de cada diff y
  se reaplicó a mano contra las convenciones vigentes de HOY, no las de la base vieja de cada
  worktree). `node tools/audit.js` y `auditAll()` en el navegador, 0 P0/P1/P2, 96 clubes, 551 checks,
  0 mismatches, 0 warnings de fx, 0 clubes sin cargar.

## Versión 221 — 7 clubes nuevos (4to batch de 10 PDF transcriptos pendientes, prioridad Sudamérica): Millonarios, Deportivo Pereira, Guarani, Ponte Preta, RCD Mallorca, Real Oviedo, Rayo Vallecano

- De 85 a 92 clubes cargados. Pedido explícito: prioridad Sudamérica, España como respaldo si no
  alcanzaba. El pool limpio de Sudamérica ya transcripto y sin cargar dio 8 ejercicios (Colombia:
  **Millonarios** `millonarios-co` 2025; **Deportivo Pereira** `deportivopereira-co` 2025, "en
  reorganización de oficio". Brasil: **Guarani** `guarani-br` 2024-2025, en recuperación judicial;
  **Ponte Preta** `pontepreta-br` 2022-2024) — faltaron 2 para 10, completados con España
  (**RCD Mallorca** `rcdmallorca-es`, **Real Oviedo** `realoviedo-es`, **Rayo Vallecano**
  `rayovallecano-es`, los 3 ejercicio 2024/25).
- **Descartado a propósito, no por error**: Deportes Tolima (Colombia) — una sesión de sourcing
  anterior ya había encontrado 3 cifras de resultado neto en conflicto (SIIS, la Nota 18(3) del
  propio documento, y la suma de líneas) sin poder reconciliar ninguna, y decidió explícitamente no
  cargarlo (`Admin/dudas-por-club.md`). Se respetó esa decisión en vez de forzar un número. También
  se descartaron los `informe-gestion` narrativos de Millonarios (2023/2024, cifras en prosa con
  inconsistencias internas menores) y 2 documentos ecuatorianos (uno de caja no devengado, otro que
  mezcla el club de fútbol con actividades no deportivas) por no llegar al estándar de calidad.
- `FX_CLOSE` nuevo: `BRL@2022-12-31` (5,2177, Ponte Preta). Ninguna liga nueva en el catálogo.
- **3 P0 reales encontrados y corregidos en la integración**, los 3 con la misma causa:
  `officialTotalExpenses` incluía por error un ítem `exceptional_items` que el motor excluye de ese
  check desde Botafogo — `millonarios-co` 2025 (provisión por contingencia laboral de un exjugador),
  `deportivopereira-co` 2025 (gastos de ejercicios anteriores) y `pontepreta-br` 2024 (un ajuste
  extraordinario ligado a un pasivo laboral nuevo, además reconstruido de un dígito perdido por el
  OCR — ver `Admin/dudas-por-club.md`). Corregidos restando el monto exacto en cada caso.
- `verifyTieOuts()`: de 506 checks (0 mismatches, 0 warnings) tras sumar los 10 ejercicios nuevos —
  confirmado con el motor real en el navegador.
- `tools/audit.js`: 2 hallazgos nuevos silenciados (1 `signo-invertido`, 1 `catchall-dominante`,
  ambos verificados contra el documento fuente) + el `outlier-liga` de Volta Redonda reescrito con un
  `match` que ya no depende del valor exacto de la mediana (que se mueve cada vez que se suman más
  clubes brasileños grandes).
- Los 3 generadores corridos: `Admin/ESTADO.md` (comprimida la sección "DATOS" para que no siga
  creciendo sin límite en cada tanda — el detalle club por club de cada versión ya vive acá, no hace
  falta repetirlo ahí), `fuentes.html` (92 páginas de club) y `data/rankings/<liga>.js`.

## Versión 220 — 11 clubes nuevos (3er batch de 20 PDF transcriptos pendientes, priorizando Brasil y Argentina): Corinthians, Palmeiras, São Paulo, Santos, Internacional, Fluminense, Fortaleza, Bahia, Chapecoense, Vasco da Gama, Ferro Carril Oeste

- De 74 a 85 clubes cargados. Mismo criterio que las Versiones 217/219 pero pedido explícito de
  priorizar Brasil y Argentina: se relevó `Clubes/Brasil/` y `Clubes/Argentina/` completos y aparecieron
  varios de los clubes MÁS GRANDES del país (Corinthians, Palmeiras, São Paulo, Santos, Internacional,
  Fluminense) sourceados en sesiones de 2026-09-12/16 pero nunca cargados. 5 agentes en paralelo
  (algunos delegaron a sub-agentes propios sin que se lo pidiera, detectado y esperado igual): 19
  ejercicios cargados de 20 PDF planeados (Vasco da Gama 2024 resultó ser, al leerlo completo, el
  balance de la associação CRVG, no de la SAF — se descartó en vez de cargar la entidad equivocada,
  queda pendiente re-sourcear el documento real). **Corinthians** (`corinthians-br`, 2024-2025),
  **Palmeiras** (`palmeiras-br`, 2024-2025), **São Paulo** (`saopaulo-br`, 2023-2024), **Santos**
  (`santos-br`, 2024-2025 — descendido por primera vez en su historia en 2023, campeón de la Série B
  2024), **Internacional** (`internacional-br`, 2024-2025), **Fluminense** (`fluminense-br`,
  2024-2025), **Fortaleza** (`fortaleza-br`, 2025, SAF), **Bahia** (`bahia-br`, 2024-2025, SAF),
  **Chapecoense** (`chapecoense-br`, 2021) y **Vasco da Gama** (`vascodagama-br`, 2023, SAF) en
  Brasil; **Ferro Carril Oeste** (`ferrocarriloeste-ar`, Ejercicios 118/119, 2021-22 y 2022-23) en
  Argentina — el único candidato argentino con datos financieros reales ya transcriptos que apareció
  en el relevamiento.
- `FX_CLOSE` nuevo: `BRL@2021-12-31` (5,5805, Chapecoense), `ARS@2022-06-30` (125,215) y
  `ARS@2023-06-30` (256,675, ambas Ferro Carril Oeste). Ninguna liga nueva en el catálogo (se
  reutilizaron `br-serieA`/`br-serieB` de las Versiones 217/219); Ferro Carril Oeste quedó con sus 2
  ejercicios en `null` en `data/club-leagues/ar.js` — las fuentes encontradas se contradicen sobre su
  categoría exacta (Primera B Metropolitana/Nacional/Torneo Federal A), no se adivinó.
- **3 P0/P1 reales encontrados y corregidos en la integración**: `internacional-br` 2025 tenía
  `officialTotalRevenue`/`officialPAT` tomados del literal impreso del documento, que no reconciliaba
  con la suma real de las líneas cargadas por un redondeo interno de la Nota 22 del propio balance —
  se cambió a usar la suma real (601,893/8,993 en vez de 601,873/8,972), documentado. `chapecoense-br`
  2021 tenía una inconsistencia real de 3 lecturas del resultado del ejercicio dentro del propio
  documento (DRE, Flujo de Caja y suma de Notas, cada una ~1% distinta) — se usó la que reconcilia con
  los datos efectivamente cargados. `fluminense-br` 2024 tenía 2 acordeones de Formato Simplificado
  cuyos ítems no sumaban contra su propia fila (redondeo de las Notas 4(c)/4(h) del documento) —
  ajustados para que cierren exacto, como exige club-data-mapping sección 12.
- `verifyTieOuts()`: de 476 checks (0 mismatches, 0 warnings) tras sumar los 19 ejercicios nuevos —
  confirmado con el motor real en el navegador, no solo el cálculo manual de cada agente.
- `tools/audit.js`: 17 hallazgos nuevos silenciados con su motivo verificado (15 `signo-invertido` —
  deducciones de impuestos contra-revenue y 3 créditos/reclasificaciones documentadas explícitamente
  por cada balance; 1 `outlier-liga` — Volta Redonda se ve chico contra la mediana de Brasil porque
  esta misma versión sumó varios de los clubes más grandes del país, no un error de escala; 1
  `catchall-dominante` — Chapecoense 2021, techo real de detalle de un balance de un club en crisis
  financiera aguda, 2 meses antes de pedir Recuperação Judicial).
- `ASSET_V` 219 → 221 (subido dos veces en la misma sesión: 220 al integrar, y 221 porque el fix de
  `internacional-br` no se reflejaba en el navegador con el mismo `?v=` ya cacheado — gotcha de
  siempre, CLAUDE.md).
- Los 3 generadores corridos: `Admin/ESTADO.md`, `fuentes.html` (85 páginas de club) y
  `data/rankings/<liga>.js`.

## Versión 219 — 5 clubes brasileños grandes nuevos (2do batch de 10 PDF transcriptos pendientes): Flamengo, Atlético Mineiro, Athletico Paranaense, Vitória, RB Bragantino

- De 69 a 74 clubes cargados. Mismo criterio que la Versión 217 pero un pool distinto: en vez de
  ampliar a países nuevos, se relevó `Clubes/Brasil/` completo y aparecieron varios clubes GRANDES
  ya transcriptos en sesiones de sourcing de 2026-09-12/16 (antes de la Versión 214) pero nunca
  onboardeados — cero infraestructura de país/moneda nueva (Brasil ya soportado), mayor valor por
  documento. 4 agentes en paralelo, mismo protocolo de no tocar `clubs.js`/`category-map.js`/
  `currency-map.js`: **Flamengo** (`flamengo-br`, 2024-2025, associação — no SAF), **Atlético
  Mineiro** (`atleticomineiro-br`, 2023-2025, SAF — 2023 es un "stub period" de solo 3,5 meses desde
  la constitución de la SAF, no un año completo), **Athletico Paranaense** (`athleticoparanaense-br`,
  2024-2025, descendido a la Série B en 2024), **Vitória** (`vitoria-br`, 2025) y **RB Bragantino**
  (`rbbragantino-br`, 2019 y 2024, única Ltda del lote — el PDF de 2019 era vectorial sin capa de
  texto real, verificado con más cuidado).
- `FX_CLOSE` nuevo: `BRL@2019-12-31` (4,0307). 2 ligas nuevas en el catálogo de la Versión 217
  reutilizadas (`br-serieA`, `br-serieB`), sin ligas nuevas esta vez.
- **2 P0 reales encontrados y corregidos en la integración**: `atleticomineiro-br` 2024 y 2025 no
  cerraban en Expenses (`officialTotalExpenses` incluía por error el ítem `exceptional_items`
  —"Resultado equivalência patrimonial"—, que el motor excluye a propósito de ese check desde
  Botafogo). Se corrigió restando el monto exacto del ítem en cada año, documentado en el comentario
  de `data/atleticomineiro-br-data.js`. Ningún otro P0.
- `verifyTieOuts()`: de 389 a 419 checks, 0 mismatches, 0 warnings — los 10 ejercicios nuevos
  reconcilian exacto contra el motor real (`auditAll()` en el navegador), no solo contra el cálculo
  manual de cada agente.
- `tools/audit.js`: 18 hallazgos nuevos silenciados con su motivo verificado (10 `categoria-cruzada`
  — ingresos extraordinarios en `exceptional_items`, mismo patrón ya aceptado de Racing, y un COGS
  neteado contra revenue con `admin_general_expense`, mismo patrón de Botafogo; 8 `signo-invertido`
  — deducciones de impuestos contra-revenue; 2 `salto-interanual` — el stub period 2023 de Atlético
  Mineiro y los 5 años sin cargar entre los 2 ejercicios de RB Bragantino, ambos explicados).
- `ASSET_V` 218 → 219 (se editaron `data/clubs.js` y `data/currency-map.js`, ambos eager-loaded) —
  el número 218 quedó tomado por una sesión concurrente (ver la entrada de arriba, detectada durante
  esta integración sin conflicto real).
- Los 3 generadores corridos: `Admin/ESTADO.md`, `fuentes.html` (74 páginas de club) y
  `data/rankings/<liga>.js`.

## Versión 218 — Pipeline de outreach (Etapa 1) probado de punta a punta

- Guido creó la cuenta de Resend, verificó `outreach.financeofsports.com` (DNS en Netlify DNS: DKIM,
  SPF vía 2 CNAME, MX para Receiving, DMARC `p=none` correctamente en `_dmarc.outreach`, no en la
  raíz) y generó la API key. `Admin/outreach/.env` creado (gitignoreado).
- Corrección de diseño: el `from` queda en `info@outreach.financeofsports.com`, no
  `contacto@outreach.…` como decía el borrador original del skill — decisión de Guido, actualizado
  en `club-outreach/SKILL.md`. Se evaluó y se descartó usar la raíz (`info@financeofsports.com`):
  mantiene la reputación de envío aislada del dominio principal, a propósito.
  (`financeofsports.com`, sin subdominio, seguía sin verificar en Resend — no era una opción real,
  además de no convenir.)
- **Prueba real, no solo revisión de código**: un mail de prueba escrito directo en
  `Admin/outreach/aprobados/`, Guido corrió `tools/outreach-send.js` desde su propia terminal (nunca
  una sesión de Claude Code), llegó a su Gmail, y el archivo se archivó solo en
  `Admin/outreach/enviados/`. La Etapa 1 queda lista para usarse con un club de verdad.
- Detectada sesión concurrente en el mismo working tree (la de la Versión 217, todavía onboardeando
  más clubes brasileños al cerrar esta entrada) — sin conflicto real, pero confirma que sigue siendo
  un riesgo vivo del proyecto (ver `CLAUDE.md`).

## Versión 217 — 4 clubes nuevos (10 PDF transcriptos onboardeados en paralelo): América Mineiro, Operário Ferroviário, Volta Redonda (Brasil) y Unión Magdalena (Colombia)

- De 65 a 69 clubes cargados. 4 agentes en paralelo (uno por club, sin tocar `data/clubs.js`/
  `category-map.js`/`currency-map.js` para no pisarse) onboardearon los 10 PDF ya transcriptos
  (Versiones 214/215) que estaban limpios de OCR y sin cargar: **América Mineiro** (`americamineiro-br`,
  3 ejercicios: 2023-2025), **Operário Ferroviário** (`operarioferroviario-br`, 2024-2025), **Volta
  Redonda** (`voltaredonda-br`, 2024-2025, 4 documentos) y **Unión Magdalena** (`unionmagdalena-co`,
  2018). Ninguno necesitó infraestructura de país nueva (Brasil y Colombia ya estaban cargados).
- Los 4 nacen con el país en el `clubId` (convención de la Versión 129, que hasta ahora no se venía
  aplicando a los clubes nuevos — `tools/audit.js` lo empezó a chequear recién esta sesión,
  `clubid-sin-pais`).
- 2 ligas nuevas en el catálogo (`data/leagues.js`): `br-serieC` (Volta Redonda, campeón 2024) y
  `co-primeraB` (Unión Magdalena, subcampeón 2018) — ambas con su fila en `data/club-leagues/<iso2>.js`,
  ninguna liga-temporada quedó sin verificar.
- `FX_CLOSE` nuevo en `data/currency-map.js`: `BRL@2023-12-31` (4,8413) y `COP@2018-12-31` (3249,75),
  investigados vía API oficial del Banco Central do Brasil y TRM oficial de la Superintendencia
  Financiera de Colombia respectivamente.
- `verifyTieOuts()`: de 365 a 389 checks, 0 mismatches, 0 warnings — cada ejercicio nuevo cierra exacto
  contra el total impreso de su propio documento, confirmado con el motor real (`auditAll()`) además
  del cálculo manual de cada agente.
- `tools/audit.js`: 7 hallazgos nuevos (4 `signo-invertido`, 3 `catchall-dominante`) verificados uno
  por uno contra el documento fuente y silenciados con su motivo en `tools/audit-ignore.json` — ninguno
  es un error de carga, son líneas reales (deducciones contra-revenue, un crédito de reclasificación,
  una ganancia por revalúo de inmuebles categorizada `exceptional_items`, y 2 catch-alls de Ingresos
  grandes por una línea sin desglosar en el propio balance de América Mineiro, ya anotada en
  `Admin/dudas-por-club.md`).
- Encontrado y corregido un dígito de OCR mal leído en `Clubes/Brasil/Volta Redonda/balanco-2024.md`
  (Nota 13.1(iii)), cruzando contra la columna comparativa de texto nativo del balance 2025.
- `ASSET_V` 209 → 217 (se editaron `data/clubs.js` y `data/currency-map.js`, ambos eager-loaded).
- Los 3 generadores corridos: `Admin/ESTADO.md` (sección QUÉ ES REAL POR CLUB), `fuentes.html` (69
  páginas de club) y `data/rankings/<liga>.js` (incluidos los 2 rankings nuevos, `br-serieC` y
  `co-primeraB`).

---

## Versión 216 — Proceso de email a clubes rediseñado, Etapa 1 (to-do 51)

- Skill nuevo `club-outreach`: reemplaza el diseño original del to-do 51 ("Claude redacta, Guido
  aprueba en el chat, envío por Gmail") por un pipeline que saca el paso de ENVÍO afuera de
  cualquier sesión de chat — la restricción de aprobación mensaje-por-mensaje es de la plataforma,
  no de Gmail, y ningún scope de conector la evita. Decisión de Guido tras comparar Gmail/MCP, APIs
  transaccionales, no-code y agentes dedicados; arranca directo en la Etapa 1 (subdominio + Resend +
  cola de revisión, sin regla de disparo automática), salteando la Etapa 0 manual.
- `Admin/outreach/` nuevo: `contactos.json` (SOLO el email de contacto por club — nada de historial
  de envíos duplicado, eso ya vive en los nombres/contenido de los propios archivos), `cola/` →
  `aprobados/` → `enviados/` (la cola de revisión de borradores), `checkin-2026-10-24.md` (qué
  evaluar en el check-in de 30 días antes de prender la Etapa 2).
- `tools/outreach-send.js` nuevo: manda los `.md` aprobados vía la API de Resend y los archiva en
  `enviados/`. Lo corre Guido desde su propia terminal — ninguna sesión de Claude Code lo ejecuta, ni
  por pedido explícito en el chat, porque hacerlo ahí adentro es la misma aprobación
  mensaje-por-mensaje que este diseño existe para evitar.
- `.gitignore`: nueva regla para `Admin/outreach/.env` (la API key de Resend) — única excepción real
  a "lo interno se trackea todo", porque es una credencial, no un documento.
- `club-sourcing/SKILL.md`: nueva instrucción en la sección 0 — si aparece el email de contacto de un
  club al buscar su documento, anotarlo en `Admin/outreach/contactos.json` si es gratis hacerlo en el
  momento. Oportunista, no obligatorio: `club-outreach` lo busca igual al redactar si no está.
- `CLAUDE.md`: pasa de 6 a 7 skills en la lista obligatoria.
- Guido creó la cuenta de Resend el mismo día (conectada con GitHub) — falta verificar el
  subdominio, activar `Receiving` para las respuestas, y generar la API key.
- To-do 51 de `Admin/TODO.md` reescrito con el estado real: qué ya está construido, qué está
  bloqueado en que Guido cree la cuenta de Resend y verifique el subdominio, y la fecha del
  check-in.

---

## Versión 10 — El sitio empezó a ser multi-club (River y Racing agregados)

- Sitio pasa de ser solo de Boca a multi-club: se agregan River Plate y Racing con un esquema de datos normalizado (`data/clubs.js`, `category-map.js`, `river-data.js`, `racing-data.js`).
- Boca no se tocó (sigue con su motor propio); River/Racing usan un motor genérico nuevo.
- Racing usa datos reales de prensa (agrupados en 2 rubros grandes); River queda 100% placeholder, sin fuente confiable todavía. Banner amarillo para datos no oficiales.
- `verifyTieOuts()` nuevo: verifica automáticamente que los rubros cierren contra el total oficial conocido.
- Selector de club nuevo; toggle USD/ARS oculto para River/Racing (sin cotización propia todavía).

## Versión 11 — Todas las pestañas son multi-club, y se agregó el stub de Mi Cuenta

- Selector de club movido al header, ahora aplica a las 6 pestañas (no solo Finanzas).
- River y Racing suman una segunda gestión cada uno (D'Onofrio, Blanco), con resultados deportivos reales pero finanzas placeholder.
- Pestaña nueva "Mi Cuenta", stub vacío para futuro paywall.
- Copy de Inicio/Resultados/Fuentes generalizado para no sonar Boca-only.

## Versión 12 — Rename a "Tu club en números" y ajuste de header

- Rename del sitio de "Boca en Números" a "Tu club en números" (title, logo, mailto).
- Header comprimido (paddings/fonts) para mantener una sola fila con más elementos.
- Bloque de estado de `index.html` reescrito para reflejar el sitio multi-club.

## Versión 13 — Ejercicio 2025 de Boca pasó de placeholder a balance oficial auditado

- Se cargó el primer balance real auditado de Boca (Ejercicio 2025, Memoria y Balance N°121), extraído de un PDF escaneado de 149 páginas.
- Tabla completa Revenue→EBITDA→Resultado reconstruida con números reales, cierre exacto verificado contra el documento impreso.
- Tipo de cambio: dólar mayorista de cierre del ejercicio ($1.203), no promedio.

## Versión 14 — Free tier muestra cada club "tal cual lo reporta", y CTA de Premium

- Finanzas deja de normalizar los números a una estructura compartida; cada club/ejercicio se muestra con sus categorías reales, en acordeones.
- 4 funciones de render viejas se reemplazan por una sola genérica para los 3 clubes.
- Bug real corregido: en River/Racing la amortización/depreciación se contaba dos veces.
- CTA de Premium agregado (teaser, sin paywall real; eliminado en V30).
- Regla nueva: todo PDF se transcribe completo a Markdown antes de extraer datos.

## Versión 15 — Primer balance real de River (Ejercicio 2024), y hallazgo clave para Racing

- Primer balance real de River cargado (Ejercicio 2024), obtenido de una réplica no oficial (tuRiver), ya que River nunca publica sus estados contables en su propio dominio.
- Categorías reales de River cargadas tal cual, sin normalizar a Boca; "Salarios/Ingresos" da 0% por límite de la fuente.
- Discrepancia real entre dos valores de "Depreciación" en el mismo documento, resuelta por aritmética antes de cargar.
- Racing: 3 documentos extraídos pero no cargados todavía. Hallazgo: los 2 ejercicios reales de Racing dan déficit, muy distinto del placeholder anterior (que mostraba superávit).

## Versión 16 — Los 3 datos reales de Racing quedaron cargados al sitio

- Se cargaron los 3 documentos extraídos en la V15: Ejercicio 2024 y 2025 (balances auditados reales) y Presupuesto 2026 (reemplazando el dato de prensa).
- Conversión a USD con tipo de cambio de cierre de cada ejercicio (balances) o promedio declarado (presupuesto).
- `grossDebt` de Racing = Total del Pasivo completo (no separa deuda financiera aparte), documentado como criterio propio del club.

## Versión 17 — Reorganización de carpetas de PDFs, ya no escalaba una por club

- Carpetas sueltas por club (`racing-pdfs/`, `river-pdfs/`) reemplazadas por `PDFs/<país>/<club>/` y `pdf-extracts/<país>/<club>/` (reemplazado de nuevo en V28).
- Solo reorganización de archivos, ningún dato cambió.

## Versión 18 — Ejercicios en formato AAAA/AAAA, espaciado de Finanzas, y acordeones redundantes fuera

- Ejercicios pasan a mostrarse como "Ejercicio AAAA/AAAA" en vez de solo el año de cierre.
- Espaciado vertical de Finanzas unificado (18/20px → 24px parejo).
- 2 acordeones redundantes del Presupuesto 2026/2027 de Boca eliminados (su info ya estaba disponible en la tabla principal).

## Versión 19 — Toggle Año-a-año por defecto, más espacio todavía, y "Apertura de Gastos" migró al detalle

- Toggle de Finanzas invertido: "Año a año" pasa a ser el default.
- Espaciado subido de 24px a 32px, más aire entre título y contenido de cada card.
- El acordeón "Apertura de Gastos" (jerarquía de hasta 4 niveles, ~434 líneas) se migró a la tabla principal, con desglose recursivo nuevo y conversión a USD/ARS en cualquier nivel.

## Versión 20 — 3 ejercicios históricos de Racing pre-Blanco (2008/09, 2009/10, 2010/11)

- Se cargaron los 3 ejercicios más antiguos y simples de Racing (pre-Blanco), con categorías reales de Recursos y Gastos.
- Se corrigió una asunción previa: no todos los PDFs de Racing tienen texto extraíble (buena parte del archivo son escaneos).
- Conversión a USD parcialmente interpolada por falta de cotización exacta de esos años.
- Gestión de esos 3 años no atribuida (presidencia incierta, Racing venía de una quiebra).

## Versión 21 — Card "Presupuesto 2026/2027" dividido en 3, y trendChart ya no inventa datos

- El card único de presupuesto de Boca se dividió en 3 (Supuestos, Presupuesto Financiero, Presupuesto de Inversiones).
- El gráfico de evolución deja de graficar valores placeholder inventados; esos años quedan con barra vacía.
- Aclarado que solo el Ejercicio 2025 de Boca tiene deuda real cargada; el resto (incl. 2027) da 0 por falta de desglose, no porque la deuda sea cero.

## Versión 22 — Bug real en el CDN de Chart.js (nunca se veían los gráficos), y 8 ajustes de UX en Finanzas

- Bug real corregido: la versión de Chart.js pineada (4.4.4) nunca existió en el CDN, así que los gráficos nunca cargaban para ningún visitante; corregido a 4.5.1.
- 8 ajustes de UX: columnas de comparación ocultas cuando no aplican, fuente duplicada consolidada, aviso nuevo cuando "Deuda=Caja=0" es por falta de desglose (no deuda real cero), waterfall de flujo de caja, alineación de montos en tablas.

## Versión 23 — Bug real de "Gastos" descalzado con la tabla, y 5 ajustes más de copy/UX en Finanzas

- Bug real corregido: el stat "Gastos" de arriba no incluía amortización de pases/depreciación mientras la tabla de abajo sí, dando dos números distintos; ahora comparten una sola fuente de verdad.
- Ajustes de copy y gráficos: fix del título "$" rotado en el eje Y, leyenda del pie/doughnut con %, waterfall del Presupuesto Financiero responde al toggle USD/ARS.

## Versión 24 — Bug real de alineación en los acordeones de Inversiones, y % de vuelta al gráfico (no a la leyenda)

- Bug real corregido: los montos de los acordeones de Presupuesto de Inversiones no alineaban entre sí (problema de flexbox con 3 hijos).
- El % de cada porción del gráfico de torta pasa a dibujarse encima de la porción; leyenda reordenada a una columna alineada.

## Versión 25 — El "$" dibujado a mano en el canvas salía roto, reemplazado por un `<span>` de HTML normal

- El símbolo "$" del eje Y (dibujado a mano en canvas) se veía roto; reemplazado por un `<span>` de HTML normal.

## Versión 26 — Bug real de orden en el selector de Año (River/Racing), y fuente dinámica por club

- Bug real corregido: el selector de año de River/Racing arrancaba siempre en el ejercicio más viejo; ahora ordena descendente y recuerda el año más cercano al cambiar de club.
- Nota de fuente de "Estado de resultados" pasa a ser dinámica por club (antes citaba siempre a Boca).

## Versión 27 — Bug real, la fuente de "Supuestos/Presupuesto Financiero/Inversiones" quedaba visible en Racing/River

- Bug real corregido: una nota de fuente 100% de Boca quedaba visible con cualquier club seleccionado, por no estar incluida en la clase de show/hide por club.

## Versión 28 — PDFs/ y pdf-extracts/ se unificaron en Clubes/<País>/<Club>/ (el PDF y su transcripción, juntos)

- Los dos árboles de carpetas se unificaron en `Clubes/<País>/<Club>/`, con el PDF y su transcripción juntos; nombres de carpeta capitalizados.
- Solo movimiento de archivos, ningún dato cambió.

## Versión 29 — Toggle "Formato simplificado" en Estado de resultados (solo Boca por ahora)

- Toggle nuevo "Formato del club / Formato simplificado" para Boca: reclasifica los datos ya verificados a categorías uniformes, sin inventar ni recalcular nada.
- No se pudo separar "Salarios de jugadores" de "cuerpo técnico"/"primas" para todos los ejercicios (solo 2027 tiene ese detalle).
- Tensión de producto sin resolver: el CTA de Premium seguía prometiendo esta funcionalidad, ahora gratis (resuelto en V30).

## Versión 30 — Bug real de proceso, se había cargado un resumen del PDF 2027 en vez de transcribirlo antes, y se perdió detalle real. También: se sacó el botón Premium

- Bug real de proceso: al cargar el presupuesto 2027 de Boca se saltó el paso de transcribir el PDF completo, y "Torneo Oficial" quedó resumido, perdiendo el desglose real de TV/Recaudación/Premio.
- Corregido de raíz: PDF transcripto completo, desglose real restaurado sin cambiar ningún total.
- Botón CTA Premium eliminado (el toggle "Formato simplificado" queda gratis, decisión de producto de Guido).

## Versión 31 — Menos ruido en "Formato simplificado" (ingresos unidos, gastos desagregados), y columna "% del total" en las dos vistas

- Ingresos: dos categorías chicas se unieron en una ("Otras secciones deportivas y otros ingresos").
- Gastos: "Otros gastos" (Ejercicio 2027) se desagregó en 3 categorías más chicas y legibles.
- Columna nueva "% del total" agregada en toda la tabla, calculada contra el total de su propia sección.

## Versión 32 — Toggle USD/ARS y Formato del club/simplificado para Racing y River (antes solo Boca), más el Presupuesto 2026/27 de Racing

- Los toggles USD/ARS y Formato del club/simplificado se extienden a Racing y River.
- Datos de River/Racing reescritos para guardar montos en ARS nativo en vez de ya-convertidos a USD; se usa siempre el tipo de cambio que declara el propio documento.
- Bug real corregido: el stat "Gastos" de Racing/River se convertía dos veces a USD.
- Presupuesto 2026/27 de Racing cargado; investigado (sin cargar) el ejercicio 2025/26 de Boca, que todavía no tiene balance oficial.

## Versión 33 — Card "Supuestos" para Racing (premisas del Presupuesto 2026/27), inspirada en la de Boca

- Card nueva con las premisas macroeconómicas y políticas de ingresos/gastos del presupuesto de Racing, mismo patrón que la de Boca.
- Bug real corregido: la card aparecía visible con Boca seleccionado en la carga inicial (el show/hide por club solo corría al cambiar de club).

## Versión 34 — El card "Supuestos" pasa a ser un solo card genérico, siempre presente para cualquier club/ejercicio, regla nueva no opcional

- Los 2 cards estáticos de Supuestos (Boca, Racing) se unifican en uno genérico, siempre visible, con mensaje explícito si no hay premisas declaradas.
- Regla nueva: el card de Supuestos siempre tiene que estar presente.

## Versión 35 — Misma regla para "Presupuesto Financiero" y "Presupuesto de Inversiones", siempre presentes, genéricos, explícitos si no hay dato

- Mismo patrón que V34 aplicado a Presupuesto Financiero y Presupuesto de Inversiones: pasan a ser genéricos y siempre visibles.
- Racing recibe datos reales para ambos cards (waterfall de caja simple, e inversiones sin desglose por obra).

## Versión 36 — Regla nueva, la fuente nunca va adentro de un card individual

- Se sacó la cita de fuente que había quedado repetida dentro de cada card individual; la fuente vive solo en 3 lugares fijos del sitio.

## Versión 37 — Bug visual real, el "$" del eje Y del gráfico de barras quedaba tapado por el tick más alto

- Bug real corregido: el símbolo "$" del eje Y se superponía con el tick más alto de Chart.js; se agregó padding superior al área de trazado.

## Versión 38 — Bug real de categorización, Racing 26/27 tenía TV, marketing y salarios "enterrados" adentro de items, en $0 en Formato simplificado

- Bug real corregido: 9 líneas reales de fútbol de Racing (TV, marketing, salarios, etc.) estaban cargadas como sub-ítems anidados en vez de líneas de primer nivel, así que "Formato simplificado" las mostraba en $0 pese a tener plata real.
- Promovidas a líneas de primer nivel; regla nueva: siempre revisar "Formato simplificado" tras categorizar un ejercicio nuevo, para detectar buckets en $0 con plata real escondida.

## Versión 39 — Bug real de layout, la columna del ejercicio en "Estado de resultados" se corría de lugar según club/formato

- Bug real corregido: la columna del ejercicio no arrancaba siempre en el mismo lugar horizontal; se agregó ancho fijo por columna.
- Regresión encontrada y corregida en la misma sesión: el fix dejaba una franja muerta a la derecha en modo "Año a año"; resuelto reescribiendo el ancho de columnas dinámicamente según el modo.

## Versión 40 — Acordeón de control en "Formato simplificado" (Boca) + Ejercicio 2025/2026 agregado al selector, en espera

- "Formato simplificado" de Boca ahora es expandible fila por fila, mostrando de qué campos nativos sale cada número reclasificado.
- Ejercicio 2025/2026 de Boca agregado al selector, en cero, con mensaje explícito de "esperando que Boca lo publique" (no se cargó la cifra de prensa).

## Versión 41 — Tooltip de glosario en filas de desglose + 3 cards "Ingresos y Egresos por Torneo" (Boca 2027)

- Tooltip de glosario agregado a filas técnicas del desglose (ej. amortización de pases "Compras" vs. "Inferiores").
- 3 cards nuevos para Boca 2027: Ingresos y Egresos por torneo (Copa Libertadores, Liga Profesional, Copa Argentina), con instancia presupuestada de cada uno; aclarado que "Gastos" ahí es solo logística, no sueldos del plantel.

## Versión 42 — Sin em dashes de acá en adelante, bug real de "Ingresos" en Boca 2024/2025, acordeón para River/Racing, y los 4 cards de presupuesto ahora se esconden en vez de mostrar "no hay"

- Se eliminaron las 550 apariciones del em dash del sitio (regla nueva: no usarlo más).
- Bug real corregido: el stat "Ingresos" de arriba de Finanzas no coincidía con ninguno de los 2 números de la tabla de abajo (Boca 2025); ahora usa el mismo total ya calculado por la tabla.
- Acordeón de control (V40) extendido a River/Racing.
- Regla invertida: los 4 cards de presupuesto ahora se esconden si no hay dato, en vez de mostrar un mensaje.

## Versión 43 — Ancho fijo para el select de "Año" (cambiaba de tamaño según club/ejercicio)

- Bug real corregido: el ancho del selector de Año cambiaba según club/ejercicio; se fijó a 300px.

## Versión 44 — Ancho fijo también para "Gestión", y nuevo orden de Comercial/Abonos en Formato simplificado (River/Racing)

- Mismo fix de ancho fijo aplicado al selector de Gestión (200px).
- Orden de filas de "Formato simplificado" (River/Racing) reordenado: Comercial y Abonos suben a 2da y 3ra posición.

## Versión 45 — "Partidos y competencias" (River/Racing) renombrado a "Estadio: recaudación de partidos", mismo nombre que Boca, sube a la 3ra fila

- Fila renombrada para usar el mismo vocabulario que Boca, sin cambiar categoría ni cifras.

## Versión 46 — Regla permanente, "Formato simplificado" usa la categorización de Boca para todos los clubes; discrepancias reales encontradas, consultadas a Guido, y resueltas

- Regla permanente: "Formato simplificado" de cualquier club usa la misma categorización/vocabulario que Boca; discrepancias se consultan antes de resolver.
- 3 discrepancias reales encontradas: River deja sin desglosar 66,7% del revenue (sin tocar, a criterio de Guido); Racing separa "Premios por competencias" en categoría nueva; catch-all de gastos se deja igual por ahora (solo renombrado).

## Versión 47 — El orden de "Formato simplificado" (River/Racing) también tiene que calzar con Boca, y se esconde "Fútbol profesional (sin desglosar)" cuando está en $0

- Orden de buckets de Ingresos reordenado para calzar exacto con el de Boca.
- La fila catch-all "Fútbol profesional (sin desglosar)" se esconde cuando da $0.

## Versión 48 — Los labels tienen que ser idénticos, no solo parecidos ("Televisión" vs. "Televisión / Derechos de TV"), y gotcha de verificación con grep

- Bug real corregido: el label "Televisión / Derechos de TV" del motor genérico no era idéntico al "Televisión" de Boca; unificado.
- Gotcha de testing documentado: un patrón de grep con cuantificador de caracteres fallaba en silencio cerca de acentos, dejando pasar em dashes sin detectar.

## Versión 49 — "Estadio" y "Abonos" son 2 conceptos distintos, no el mismo repartido en 2 filas

- Distinción aclarada: "Estadio" = venta partido por partido, "Abonos" = pago de temporada completa. Se sacó "Entradas /" del label de Abonos (mismo valor, solo nombre).

## Versión 50 — "(Presupuestado)" ya no se superpone con "% del total" en el header de la tabla

- El sufijo "(presupuestado)" cambió a prefijo "Presupuesto" (más corto), evitando que el texto invada la columna de al lado.

## Versión 51 — Limpieza de arquitectura antes de seguir agregando clubes (fix de category-map.js, separación cálculo/render, y lazy-loading de River/Racing)

- Primera vez con control de versiones (git) propio para el repo (entonces llamado `numeros-de-boca`, renombrado a `finance-of-sports` en 2026-09-13).
- Fix de nombre de categoría inconsistente (`player_sales`).
- ~2530 líneas separadas del script principal en 3 archivos nuevos (`data/boca-data.js`, `js/finanzas-calc.js`, `js/finanzas-render.js`), sin cambiar código.
- River/Racing pasan a lazy-load (ya no se bajan siempre); 2 bugs reales de referencia a variables no definidas encontrados y corregidos en el proceso.

## Versión 52 — Homologación de "Compra de jugadores" de Racing con Boca en Formato simplificado

- Líneas reales de costo de transferencias de Racing (hasta ahora en el catch-all "Otros gastos") re-categorizadas a "Compra de jugadores", mismo vocabulario que Boca.
- Bug real corregido: `verifyTieOuts()` de Racing 2026/2027 no sumaba la categoría nueva, dando un desvío.

## Versión 53 — Filas de gastos siempre iguales entre clubes + 3 categorías nuevas para bajar el catch-all "Otros gastos" de Racing (de 64% a 18%/0%)

- 3 categorías nuevas de gasto agregadas para que las filas de "Formato simplificado" sean siempre las mismas entre clubes.
- Catch-all "Otros gastos" de Racing bajó de 64% a 18%/0% según ejercicio.
- Bug real más serio corregido: `computeYearGeneric()` no sumaba las 3 categorías nuevas al total de gastos, haciendo que Racing mostrara superávit en ejercicios con déficit real.

## Versión 54 — Sacar "Intereses netos"/"Impuestos" del card "Estado de resultados", igual para los 3 clubes y cualquier año

- Filas sueltas de "Intereses netos"/"Impuestos" (inconsistentes entre clubes/años) se sacaron de la tabla; el monto se sigue sumando al resultado final, solo deja de mostrarse como fila (revertido parcialmente en V60-61).

## Versión 55 — Sin ningún copy después de la tabla en "Estado de resultados"

- Se sacaron los 2 párrafos de nota (unidad de moneda, tipo de cambio) que quedaban después de la tabla; esa info ya vive en el card Supuestos y en Fuentes.

## Versión 56 — Dropdown "Año" con sufijo estandarizado (3 palabras, no más) + tabs de Pases/Resultados/Comparar ocultos por ahora

- Sufijo del dropdown "Año" estandarizado a exactamente 4 variantes posibles.
- Bug real corregido: Boca (club default) mostraba sufijos viejos en la carga inicial hasta el primer cambio de club.
- Tabs de Mercado de Pases, Resultados y Comparar Gestiones ocultados del nav (reversible, contenido no borrado).

## Versión 57 — Columna "Balance" para ejercicios con Presupuesto y Balance a la vez, se saca la comparación año-contra-año

- Se sacó la comparación "Ejercicio Anterior"/Var./Var.% entre años distintos.
- Mecanismo nuevo (overlay) para mostrar Balance vs. Presupuesto del MISMO ejercicio como 2da columna, reusando esa infraestructura.

## Versión 58 — Primer ejercicio real con Presupuesto y Balance a la vez (Racing, Ejercicio 2019/2020)

- Primer caso real del mecanismo de overlay: Racing 2019/2020 cargado con balance real y presupuesto real del mismo ejercicio.
- Bug real de proceso corregido: un escaneo con inclinación diagonal desplazaba columnas al leerlas; corregido con deskew automático.
- Caso de criterio consultado con Guido: una fila del presupuesto era un acumulado de 3 líneas, no un valor propio.

## Versión 59 — Formato simplificado del overlay compara categoría por categoría, se sacan Var./Var.%

- Bug real corregido: la columna Presupuesto en Formato Simplificado quedaba vacía fila por fila; ahora bucketiza igual que la columna primaria.
- Columnas Var./Var.% eliminadas del todo de la tabla.

## Versión 60 — "Estado de resultados" reconcilia a simple vista + sin scroll + % y Resultado Neto propios de Presupuesto

- Bug de presentación corregido: Ingresos-Gastos no reconciliaba a simple vista contra Resultado Neto porque la fila de "Intereses netos" se había sacado en V54; se restaura cuando no es cero.
- Anchos de columna angostados para eliminar el scroll horizontal.
- Columna Presupuesto ahora tiene su propio % del total y Resultado Neto calculado (antes "—").

## Versión 61 — Headers legibles en 2-3 líneas a propósito, "Intereses netos"/"Int." siempre visibles, dropdown "Año" sin "Ejercicio " y con "(Balance)"

- Headers de tabla parten en el punto correcto (nunca mitad de palabra), 4 columnas numéricas con el mismo ancho.
- "Intereses netos" pasa a mostrarse siempre (aunque sea $0).
- Stat nuevo "Int." en los cards de arriba de Finanzas, para que Ingresos+Gastos+Int.=Resultado neto reconcilie a simple vista.
- Dropdown "Año" pierde el prefijo "Ejercicio" y suma "(Balance)" como 4ta opción explícita.

## Versión 62 — Nuevo ejercicio real de Racing, 2020/2021 (Ejercicio N° 119, irregular de 10 meses)

- Se cargó el balance real de Racing 2020/2021 (ejercicio irregular de 10 meses, transición de cierre agosto→junio).

## Versión 63 — Nuevo ejercicio real de Racing, 2017/2018 (presupuesto-only, último documento con texto extraíble del archivo)

- Se cargó el presupuesto de Racing 2017/2018 (sin balance todavía); criterio confirmado: cargar presupuesto-only está bien, no hace falta esperar el balance.
- Bug real corregido: 3 `sourceId` ya en uso desde versiones anteriores nunca tuvieron su entrada correspondiente en `clubs.js`.

## Versión 64 — Ejercicio 2017/2018 de Racing pasa a ser Presupuesto+Balance (segundo par del sitio, después de 2019/2020)

- Se cargó el balance real de Racing 2017/2018, completando el par con el presupuesto ya cargado (mecanismo de overlay, segundo caso real).

## Versión 65 — Header "Estado de resultados" nunca parte una palabra, y "Balance" para cualquier `official_balance_sheet`

- Regla permanente: ninguna palabra del header de la tabla se parte nunca, la columna overlay siempre lleva el año.
- Cualquier ejercicio `official_balance_sheet` (no solo Boca) pasa a mostrar el prefijo "Balance" en vez de "Ejercicio".

## Versión 66 — Nuevo ejercicio real de Racing, 2018/2019 (presupuesto-only, escaneo con tablas en landscape)

- Se cargó el presupuesto de Racing 2018/2019 (presupuesto-only), con OCR de tablas escaneadas en landscape (rotadas 90°).

## Versión 67-75 — Archivo completo de Racing cargado — todos los balances y presupuestos de Clubes/Argentina/Racing/ (Ejercicios 111 a 117)

- Se cargó el resto del archivo histórico de Racing (2012-2017): 2 presupuestos y 6 balances reales, completando el 100% del archivo oficial de racingclub.com.ar/informes/ (~24 documentos, 2009-2027).
- 2 ejercicios (2014, 2016) pasaron a ser Presupuesto+Balance (overlay).
- Hallazgo real: un cambio de auditor externo en 2016 reclasificó la exposición de 2015 en su comparativo (solo presentación, no un error); se dejó sin tocar el dato ya cargado.
- Presidencia de un ejercicio (2012/2013) quedó incierta, sin firma; gestión no atribuida a propósito.
- 20 checks nuevos de `verifyTieOuts()`, todos cierran exacto.

## Versión 76 — Inicio sin "MVP · datos de ejemplo", 3 gráficos de evolución (Ingresos/Gastos/Deuda), todos los ejercicios sin saltear ninguno

- Badge "MVP · datos de ejemplo" sacado de Inicio.
- 3 gráficos nuevos en Inicio (Ingresos, Gastos, Deuda neta por ejercicio), con el rango completo y continuo de años del club, en blanco los años sin dato real (sin saltear ninguno).

## Versión 77 — Los 4 stats de Inicio en español y en una línea, gráficos apilados por "Formato simplificado", clic lleva a Finanzas, sin "Cómo usar este sitio"

- Stats de Inicio traducidos/acortados para entrar en una línea.
- Los años con Presupuesto (sin balance) se muestran en color atenuado en los gráficos, aclarado en el tooltip.
- Clic en una barra del gráfico lleva directo a Finanzas con ese año seleccionado.
- Se sacó el card "Cómo usar este sitio".
- Ingresos y Gastos pasan a graficarse apilados por categoría de "Formato Simplificado".

## Versión 78 — Total y % arriba/adentro de cada barra, orden dinámico por magnitud, "No informado por el club" en las columnas vacías, período en 2 líneas, leyenda HTML alineada

- Total del año y % de cada categoría dibujados directo sobre las barras.
- Orden de categorías (y leyenda) ahora dinámico, de mayor a menor según el último ejercicio disponible.
- Columnas sin dato muestran un texto vertical "No informado por el club" en vez de quedar vacías sin explicación.
- Leyendas de los 2 gráficos apilados con HTML propio, alineadas entre sí.

## Versión 79 — Toggle USD/ARS universal (header), ya no solo dentro de Finanzas

- El toggle de moneda se mueve al header (al lado del selector de club), aplicando también a Inicio, no solo a Finanzas.

## Versión 80 — "Formato simplificado" pasa a ser el default de Finanzas

- Cambio de un solo estado inicial: Finanzas arranca en "Formato simplificado" en vez de "Formato del club".

## Versión 81 — Boca, se sacaron los años placeholder de Finanzas

- Los años placeholder de Boca (2018/2019/2021/2022/2023) se sacaron del selector de Finanzas (quedan 2024-2027); no se tocó Comparar Gestiones/Pases/Resultados, que siguen usando esos años.
- Documentado por qué Boca 2027 y Racing en transición a presupuesto no tienen deuda cargada (estructural: los presupuestos no traen balance patrimonial).
- Archivo nuevo `dudas-por-club.md` para preguntas pendientes por club, a modo de reach-out futuro.

## Versión 82 — Cuarto club del sitio, Vélez Sarsfield (Ejercicio 2025)

- Vélez Sarsfield se agrega como 4to club, con el Ejercicio 2025 (balance real auditado).
- Hallazgo estructural: el motor genérico tenía ternarios hardcodeados a solo river/racing; generalizado a 3 ramas para soportar un 3er club real.
- Mercado de Pases/Resultados/Títulos quedan vacíos a propósito (fuera de alcance de esta sesión).

## Versión 83 — Copy de Inicio, gestión de Berlanga confirmada, y criterio nuevo en dudas-por-club.md

- Se sacó ", sin opinión" del título/subtítulo de Inicio.
- Gestión de Berlanga (Vélez) confirmada por búsqueda (2023-2026), corregida en el sitio.
- Regla nueva: antes de anotar una pregunta en `dudas-por-club.md`, buscar primero si es un dato público fácilmente verificable.

## Versión 84 — Vélez Sarsfield, segundo ejercicio (2023/2024)

- Se cargó el Ejercicio 2023/2024 de Vélez (déficit real), mismo criterio de categorización que 2025.

## Versión 85 — Vélez Sarsfield, tercer ejercicio (2021/2022), y un año salteado a propósito

- Se cargó el Ejercicio 2021/2022 de Vélez; el 2022/2023 (escaneo, más caro de procesar) quedó documentado como pendiente, no cargado en silencio.
- Cambio de gestión detectado: este ejercicio es de Rapisarda, no de Berlanga.

## Versión 86 — Vélez Sarsfield, cuarto ejercicio (2020/2021)

- Se cargó el Ejercicio 2020/2021 de Vélez (déficit real, incluye subsidio ATP por pandemia).
- Bug real encontrado por `verifyTieOuts()`: faltaba una línea de gasto (Becas); corregido.

## Versión 87 — Vélez Sarsfield, quinto ejercicio (2019/2020, ejercicio de pandemia)

- Se cargó el Ejercicio 2019/2020 de Vélez (déficit real, en plena pandemia).

## Versión 88 — Vélez Sarsfield, sexto ejercicio (2018/2019)

- Se cargó el Ejercicio 2018/2019 de Vélez (superávit real).

## Versión 89 — Vélez Sarsfield, séptimo ejercicio (2017/2018)

- Se cargó el Ejercicio 2017/2018 de Vélez (superávit real); último ejercicio antes de que Argentina se considerara economía de alta inflación (sin RECPAM).

## Versión 90 — Vélez Sarsfield, octavo ejercicio (2022/2023), cargado vía OCR

- Se cargó el Ejercicio 2022/2023 de Vélez, el único escaneado, vía OCR con Tesseract (más barato que leer imagen por imagen con el Read tool).
- Verificado con 2 sumas manuales independientes antes de cargar.

## Versión 91 — Vélez Sarsfield, noveno ejercicio (2014/2015), vía OCR

- Se cargó el Ejercicio 2014/2015 de Vélez vía OCR; gestión de Raúl Gámez identificada.
- Bug real corregido en `verifyTieOuts()`: la fórmula de verificación fallaba cuando el "nonCash" neto era positivo (caso nunca visto antes); corregido en todos los checks del sitio.

## Versión 92 — Vélez Sarsfield, décimo ejercicio (2016/2017), vía OCR

- Se cargó el Ejercicio 2016/2017 de Vélez (déficit real), último ejercicio de la gestión de Gámez.

## Versión 93 — Vélez Sarsfield, undécimo ejercicio (2015/2016), vía OCR, rango completo sin huecos

- Se cargó el Ejercicio 2015/2016 de Vélez, completando 11 ejercicios consecutivos sin huecos (2014/2015 a 2024/2025).

## Versión 94 — Quinto club del sitio, Instituto Atlético Central Córdoba

- Instituto se agrega como 5to club, con el Ejercicio 2023/2024 (superávit real), 100% texto nativo sin necesidad de OCR.
- Pestaña Fuentes actualizada para reflejar los 5 clubes ya cargados.

## Versión 95 — Onboarding masivo, 6 clubes nuevos, de 5 a 11 clubes del sitio

- 6 clubes nuevos cargados con datos reales: Rosario Central, Independiente, Argentinos Juniors, Estudiantes de La Plata, San Lorenzo, Unión.
- 3 clubes revisados y descartados por no tener datos contables reales (Gimnasia y Esgrima LP, Talleres, Belgrano).
- Refactor de arquitectura: registro genérico (`CLUB_GENERIC_DATA`) reemplaza los ternarios hardcodeados por club, para que agregar un club nuevo no requiera tocar el motor.
- 2 bugs reales corregidos: una categoría de gasto mal etiquetada (existía solo como categoría de ingreso) hacía desaparecer plata del total en 2 clubes.
- Varias preguntas abiertas anotadas en `dudas-por-club.md` sin resolver a criterio propio (atribución de gestión, tipos de cambio ambiguos).

## Versión 96 — Bug de Boca vacío en la primera carga + regla de orden del dropdown de clubes

- Bug real corregido: Boca aparecía vacío en la primera carga de la página (`ReferenceError` por falta de `window.` en una variable global compartida entre clubes).
- Bug colateral corregido: el dropdown de clubes quedaba desincronizado del club realmente cargado.
- Regla nueva: el dropdown de clubes va siempre en orden alfabético ascendente.

## Versión 97 — Segundo ejercicio de San Lorenzo + 2 reglas nuevas de arquitectura (presupuestos)

- Se cargó el Presupuesto 2023/2024 de San Lorenzo (3er ejercicio del club).
- Regla nueva: el sitio reconstruye balances por temporada (jul-jun), nunca por año calendario; si un documento no permite reconstruir la temporada completa, no se carga (aplicado al presupuesto de Instituto, que quedó sin cargar).
- Regla nueva: secciones "extraordinarias" (financiamiento/capital) no se cargan como ingreso/gasto operativo.
- Precedente de categorización de Impuestos/Cargas sociales/Moratoria documentado para no re-investigar cada vez.

## Versión 98 — Bug grave encontrado y corregido, Argentinos Juniors estaba en pesos restated

- Bug grave encontrado: los 5 ejercicios de Argentinos Juniors (cargados en V95) venían de un documento en pesos ajustados por inflación (restated), no nominales, a diferencia de todos los demás clubes del sitio.
- Corregido: 3 balances reales (2015/16, 2016/17, 2017/18) OCReados y cargados con cifras nominales reales; 2015 reconstruido desde el comparativo.
- 1 discrepancia aritmética real del propio documento (2016) documentada y ajustada.

## Versión 99 — Backlog de OCR completo, San Lorenzo/Unión/Estudiantes LP al día

- San Lorenzo: de 3 a 8 ejercicios (2011-2017 consecutivos + 2024).
- Unión: de 1 a 4 ejercicios (2022-2025); `grossDebt`/`cash` sin cargar en 3 años por falta de balance patrimonial en el archivo disponible.
- Estudiantes de La Plata: se sumó el Ejercicio 2025 (primer déficit del club en los ejercicios cargados).
- `verifyTieOuts()` llega a 270 checks, todos cierran.

## Versión 100 — Dos barridos de sourcing en background, Primera Nacional y Sudamérica

- 2 agentes en background relevaron PDFs de clubes todavía no cargados: 4 de Primera Nacional (Los Andes con 13 balances, Ferro, Godoy Cruz, Temperley) y clubes de Chile/Brasil/Colombia/Perú.
- Tarea puramente de sourcing: PDFs descargados y documentados en `fuentes-por-club.md`, nada cargado a `data/*.js` todavía.

## Versión 101 — Segunda ronda de sourcing Sudamérica, 3 agentes en paralelo, mismo repo

- 3 clubes chilenos (Universidad Católica, Universidad de Chile, Colo-Colo) pasan a tener series casi completas (16-17 ejercicios cada uno).
- Brasil: Vasco recuperado pese a bloqueo del sitio oficial; 7 clubes nuevos con hits reales; bug de atribución corregido (un PDF de "Botafogo" era en realidad de un club homónimo distinto).
- Colombia se dispara de 1 a 7 clubes vía el portal de Supersociedades.
- Regla nueva: documentar también los intentos fallidos de sourcing (dónde se buscó y por qué no hubo resultado), no solo los éxitos.
- Sigue siendo sourcing puro, nada cargado al sitio todavía.

## Versión 109 — Primeros 4 clubes de Brasil cargados (Grêmio, Botafogo, Cruzeiro, Atlético Goianiense)

- Cuarto país con datos reales en el sitio: Grêmio (2024), Botafogo SAF (2024), Cruzeiro SAF (2025) y Atlético Goianiense (2025), 1 ejercicio cada uno — 8 clubes brasileños más quedan sourceados pero sin cargar, como to-do explícito (prioridad ancho-sobre-profundo: mejor 4 verificados a fondo que 12 apurados).
- `ejercicioLabel()`/`populateFinanzasSelectors()`/`inicioTooltipTitle()`/`inicioPeriodLabels()` generalizados con `isCalendarYearClub(clubId)` (nueva función en `js/finanzas-calc.js`, lee `clubs[clubId].fiscalYearStart`) para no mostrarle a un club de ejercicio calendario (Brasil: ene-dic, igual que México/Japón ya cargados) un rango de temporada estilo "2023/2024" que sería falso — resuelve el to-do que habían dejado abierto las cargas de Club América y Japón.
- Bug de datos encontrado al generalizar lo de arriba: `clubs.river.fiscalYearStart` decía `'01-01'` desde siempre (inofensivo mientras nada leía el campo) — corregido a `'09-01'` (el ejercicio real de River es sep-ago), verificado que no rompe el label de River.
- `BRL` ya estaba en `CURRENCY_META` desde la Versión 103 (el toggle de moneda genérico funciona para Brasil sin tocar `toDisplayValue()`).
- `verifyTieOuts()` pasa para los 4 clubes nuevos, sin regresiones en los clubes ya cargados (Argentina, México, Japón).

## Versión 102 — Boca migrada al motor genérico (mismo engine que el resto de los clubes)

- `data/boca-data.js` reescrito: `yearsRaw`/`computeYear()`/`simplifiedReportForBoca()`/`nativeFinancialsBoca`/`revenueBreakdown`/`expenseBreakdown`/`expenseSubBreakdown` se borraron; Boca ahora vive en `bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`/`bocaFiscalYearMeta`, registrada en `CLUB_GENERIC_DATA.boca` igual que River/Racing/etc.
- Decisión confirmada con Guido: el "Revenue" de Boca ahora incluye ingresos por transferencias de pases (antes se excluían). Revenue 2025 pasa de $152.899,9M a $237.614,6M (Total de Recursos que el propio balance imprime en pág. 76) — un comentario viejo decía que excluirlas era "la convención del resto del sitio", lo cual era falso: los 8 clubes ya migrados suman su venta de jugadores a Revenue.
- Gastos 2025 reconstruidos departamento por departamento desde los anexos originales del balance (Clubes/Argentina/Boca/memoria-y-balance-2024-25.md) para separar "Remuneraciones y cargas sociales" del resto de cada área — el total de sueldos aislado así ($67.869,7M) coincide exacto con el que ya usaba el sitio.
- `finanzasYears`/`finanzasGestiones` (campos nuevos, opcionales, en `CLUB_GENERIC_DATA`): preservan el recorte de la Versión 81 (Finanzas de Boca solo muestra 2024-2027 y Riquelme) sin reintroducir código Boca-only en `finanzas-render.js`.
- `js/finanzas-calc.js`/`js/finanzas-render.js`: se borró todo el código Boca-only en paralelo (`yearMeta`, `bocaYearIsReal`, `computeYear`, `simplifiedReportForBoca`, `drawTrendChart`/`drawBreakdownChart`/`renderDebtBlock`/`renderFinanzasStatsFromComputed`/`updateFinanzasByGestion`/`updateFinanzasByAnio`), Boca pasa por las mismas funciones `...Generic` que todos los demás clubes.
- `verifyTieOuts()`: los 3 checks de Boca (Revenue 2027/2025, PAT 2025) ya no están hardcodeados, salen del mismo loop genérico que el resto — todos los officialTotalRevenue/officialTotalExpenses/officialPAT re-verificados exactos antes y después de la migración con un script Node.

## Versión 103 — Moneda generalizada a cualquier país (fundación para onboardear 90 clubes fuera de Argentina)

- `data/currency-map.js` (nuevo): `CURRENCY_META` por código ISO ({scale, unitSuffix}), reemplaza el hardcode binario 'ARS'/'USD' de `toDisplayValue()`/`fmtAmount()`/`fmtAmountPlain()` en `js/finanzas-calc.js`. Bug real corregido: antes de esto, cualquier moneda que no fuera literalmente 'ARS' pasaba SIN CONVERTIR y se etiquetaba "M USD" — habría mostrado números mal escalados con la unidad incorrecta para el primer club no-argentino/no-USD.
- El toggle de moneda del header (`#currencyToggleGlobal`) dejó de ser HTML estático — `populateCurrencyToggle(clubId)` lo arma en runtime desde `clubs[clubId].reportingCurrency` (campo que ya existía pero estaba inerte). Invariante documentado: el toggle de cualquier club es siempre [moneda nativa <-> USD], nunca 2 monedas no-USD directas — USD es el pivote universal.
- `fx` (en `fiscalYearMeta[year]`) reforzado como SIEMPRE el tipo de cambio que el documento declaró para ese cierre puntual, nunca reusable entre clubes/ejercicios ni comparable a una cotización externa — documentado explícitamente en `data/currency-map.js` y `club-data-mapping/SKILL.md`.
- "Formato del club"/"Formato simplificado" (`simplifyToggleWrap`) se desacopló del gate de moneda/país (compartía el mismo `isArgentineClub` por una conflación accidental desde la Versión 32) — siempre visible para cualquier club.
- Límite conocido documentado, a propósito no construido sin un caso real: un documento puede reportar algunas líneas ya en USD mientras el resto está en moneda local; el modelo de hoy solo soporta una moneda por ejercicio entero, no por línea.

## Versión 104 — Sourcing Ecuador: hallazgo de que ningún club es todavía S.A.D.P./SAD

- Barrido de sourcing sobre 13 clubes candidato ecuatorianos (Barcelona SC, Emelec, LDU Quito, Independiente del Valle, Aucas, Delfín SC, Universidad Católica, El Nacional, Macará, Deportivo Cuenca, Mushuc Runa, Técnico Universitario, Orense SC).
- Hallazgo estructural clave: a septiembre 2026 NINGÚN club ecuatoriano es una S.A.D.P./SAD todavía — la reforma legal que lo habilita recién se publicó feb-2026 y el reglamento operativo jun-2026; a agosto de 2026 solo un club de categoría inferior (9 de Octubre) había iniciado el trámite. Corrige una asunción errónea de la sesión anterior (que ya daba por hecho que LDU Quito tenía una S.A.D.P. separada sin encontrar todavía).
- Único hallazgo de PDF real esta sesión: Deportivo Cuenca, informe presidencial de caja (movimientos bancarios + pagos SRI/IESS 2021-2026), publicado voluntariamente por el club en ago-2026 — no es un estado contable devengado tradicional.
- Los otros 12 clubes quedaron en dead-end documentado (sin sección de transparencia en su sitio oficial, o el sitio no respondió).
- `.claude/skills/club-sourcing/SKILL.md` sección 5 (Ecuador) corregida con esta cronología y la explicación de por qué Supercias no aplica todavía a estos clubes.
- Sigue siendo sourcing puro, nada cargado a `data/*.js`.

## Versión 105 — Primer barrido de sourcing en África: 4 países investigados a fondo, 0 PDFs reales conseguidos

- Sudáfrica, Egipto, Marruecos y Nigeria investigados con metodología propia por país (ver `.claude/skills/club-sourcing/SKILL.md` sección 8). Sudáfrica y Egipto: dead-end estructural confirmado (clubes privados exceptuados de publicar ante el CIPC sudafricano; asociaciones sin regulador en Egipto). Nigeria: dead-end a nivel de liga completa (NPFL, clubes estatales sin registro CAC). Marruecos: hallazgo real pero bloqueado — sus clubes en transformación a SAS (Wydad, Raja) depositan bilans en el registro oficial OMPIC (`directinfo.ma`), pero descargarlos es un servicio pago que un agente no puede completar; queda documentada la pista exacta para retomar.
- 10 clubes de la PSL sudafricana, 2 de Egipto y 2 de Marruecos documentados individualmente en `fuentes/<País>/<Club>.md`; Nigeria documentada a nivel de liga en `fuentes/Nigeria/_notas-generales.md`.
- Sourcing puro, 0 PDFs descargados, nada cargado al sitio.

## Versión 106 — Primer barrido de sourcing para España, sección nueva en el índice

- España nunca sourceada antes: 10 de 11 clubes candidatos (Real Madrid, FC Barcelona, Atlético de Madrid, Athletic Club, Sevilla FC, Valencia CF, Villarreal CF, Real Betis, Celta de Vigo, Deportivo Alavés) terminaron con documentos reales; Real Sociedad quedó como dead-end documentado (cuentas gateadas a accionistas, sin sección de transparencia pública).
- Series destacadas: Real Madrid (22 ejercicios, 2003-2025, sin huecos), FC Barcelona (22 ejercicios, 2003-2025, con serie 1978-2003 identificada y sin bajar todavía), Atlético de Madrid (12 ejercicios, 2013-2025, sin huecos) y Deportivo Alavés (9 ejercicios, 2016-2025, sin huecos — sorpresa de la sesión, mejor cobertura de lo esperado para un club chico).
- PDFs a `Clubes/España/<Club>/` (gitignorados), documentación a `fuentes/España/<Club>.md` nuevo, sección `### España` nueva en el índice de `fuentes-por-club.md`.
- Sigue siendo sourcing puro: nada transcripto a Markdown, nada cargado a `data/*.js` todavía.

## Versión 107 — Club América (México), primer club no argentino cargado con datos reales

- `data/clubamerica-data.js` (nuevo): Ejercicio 2025 (año calendario completo) del Club de Fútbol América, vía el "Segmento de Fútbol" que reporta Ollamani, S.A.B. de C.V. (la compañía bursátil, clave BMV `AGUILAS`, en la que Grupo Televisa escindió su negocio de fútbol + Estadio Azteca/Banorte el 31/01/2024). Club América no publica balance propio; el dato sale de la Nota de Segmentos IFRS 8 auditada de Ollamani.
- Caveat central, documentado en rawLabel + comentario de cabecera del archivo: el "Segmento de Fútbol" MEZCLA Club América con el Estadio Banorte (revenue $2,795.643 M MXN, 2025), sin desglose posible entre los dos. No hay balance por segmento (solo activos/pasivos totales, no deuda financiera separada de caja) — `grossDebt`/`cash` quedan en 0/0, con `debtDisclosureNote()` (mecanismo ya existente) avisando que es dato no disponible, no deuda cero real.
- `officialPAT` deliberadamente `null`: la "utilidad de segmento" que imprime el documento ($43.911 M MXN) está definida por la propia nota como ANTES de depreciación/amortización y "otros ingresos o gastos, neto" — no es un Resultado Neto/PAT comparable. `officialTotalExpenses` (2,751.732 M) sí se cargó, pero es una identidad aritmética (Ingresos − Utilidad de segmento), no una cifra impresa con ese nombre.
- Tipo de cambio: el documento declara DOS cifras de cierre distintas para el 31/12/2025 ($18.0012 en la sección MD&A vs. $17.9528 en la Nota a los EEFF auditados) — se usó la de la Nota (más autorizada), discrepancia documentada en vez de promediada o descartada en silencio.
- `data/currency-map.js`: entrada `MXN` nueva (`scale:1`, igual que BRL/PEN/EUR).
- `data/clubs.js`: entrada `clubamerica` nueva (`country:'MX'`, `reportingCurrency:'MXN'`, `fiscalYearStart:'01-01'`).
- Sin gestión/presidencia tradicional (sociedad bursátil, no asociación civil): entrada sintética única en `gestionesByClub.clubamerica` para no romper las funciones genéricas que asumen ≥1 gestión por club (`populateFinanzasSelectors`/`populateResultadosSelector`/`populateCompararSelectors`).
- Mercado de Pases/Resultados deportivos/Títulos quedaron vacíos (alcance de esta carga: solo datos financieros).
- Transcripción de las páginas relevantes del PDF en `Clubes/México/Club América/segmento-futbol-2025.md`. Verificado en el navegador: `verifyTieOuts()` corre sin errores para `clubamerica`, Revenue y Expenses cierran exacto (2 checks; PAT sin check, a propósito).

## Versión 108 — 10 clubes de Japón (J.League), Ejercicio 2025 — segundo país no argentino

- 10 clubes nuevos (Kashima Antlers, Urawa Red Diamonds, Yokohama F. Marinos, Kawasaki Frontale, Vissel Kobe, Gamba Osaka, Cerezo Osaka, FC Tokyo, Sanfrecce Hiroshima, Nagoya Grampus): sitio pasa de 12 a 22 clubes, de 2 a 3 países.
- Fuente: documento anual consolidado de la J.League (`club_doc-2025.pdf`), cubre los 60 clubes de J1/J2/J3.
- Corrección de un hallazgo previo de sourcing: el documento SOLO da 3 cifras reales por club (Ingreso Total, Sponsor, Gate) — el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división, no por club.
- `revenueLines` de 3 líneas por club (Sponsor/Gate/Otros residual), reconcilian exacto contra el Ingreso Total impreso. `expenseLinesByYear` vacío a propósito (sin dato real de costo por club en esta fuente) — `officialTotalExpenses`/`officialPAT` en `null`, `verifyTieOuts()` solo corre el check de Revenue para estos 10 clubes.
- `JPY` agregado a `CURRENCY_META` (`data/currency-map.js`, scale:1) — la tabla genérica ya soportaba cualquier moneda desde la Versión 103, así que no hizo falta tocar `toDisplayValue()`. fx:150 JPY/USD es placeholder, no declarado por el documento.
- Verificado en el navegador: los 10 clubes aparecen en el dropdown, `verifyTieOuts()` da el check de Revenue OK para los 10, 0 errores de consola.
- Limitación cosmética conocida, no corregida: el header de "Estado de resultados" muestra "2024/2025" en vez de "2025" para estos clubes (función compartida `ejercicioLabel()` asume siempre temporada partida) — mismo to-do ya anotado para Club América.

## Versión 110 — Primeros 2 clubes de Colombia cargados (Once Caldas, Envigado)

- Once Caldas S.A. En Reorganización y Envigado Fútbol Club S.A. cargados con su Ejercicio 2025 (estados financieros auditados reales, vía SIIS/Supersociedades). Envigado reconcilia exacto (el PDF trae el Estado de Resultado Integral primario); Once Caldas usa un residuo documentado para `tax` (el PDF descargado solo trae las notas, no el estado primario, ver `dudas-por-club.md`).
- Deportes Tolima investigado pero NO cargado: 3 cifras de resultado neto en conflicto para el mismo ejercicio, sin poder reconciliar (ver `dudas-por-club.md`).
- `COP` ya estaba en `CURRENCY_META` desde la Versión 103 (el toggle de moneda genérico funciona para Colombia sin tocar `toDisplayValue()`).
- fx usado para los 2 clubes cargados: TRM oficial de Colombia al 31/12/2025 ($3.757,08 COP/USD) — ninguno de los 2 documentos declara su propio tipo de cambio.
- A propósito solo se cargó UN ejercicio por club (2025), pese a que Envigado tiene 10 años consecutivos disponibles en SIIS — pedido explícito de Guido: ampliar clubes, no profundizar uno.
- `gestionesByClub` de estos 2 clubes lleva una entrada genérica "Gestión actual" (no un nombre propio): un club con `gestionesByClub[clubId]` vacío rompe el selector "Por gestión" (primer caso real de un club sin ninguna gestión conocida, ni siquiera parcial).

## Versión 111 — Primeros 10 clubes españoles onboardeados, un ejercicio cada uno

- Real Madrid, FC Barcelona, Atlético de Madrid, Athletic Club, Sevilla FC, Valencia CF, Villarreal CF, Real Betis, Celta de Vigo y Deportivo Alavés, cada uno con el Ejercicio 2024/25 (2023/24 para Villarreal, único año real en su archivo) — decisión explícita de alcance: sumar clubes en vez de profundizar años. Sexto país del sitio con datos reales.
- `EUR` ya estaba en `CURRENCY_META` desde la Versión 103 (el toggle de moneda genérico funciona para España sin tocar `toDisplayValue()`).
- Bug real de fx encontrado y corregido al mergear: los 10 archivos guardaban `fx` como "USD por 1 EUR" (ej. 1,172), el sentido INVERSO al que usa `toDisplayValue()` para el resto de las monedas (ARS/COP/BRL/MXN/JPY, todas "moneda nativa por 1 USD") — se invirtió a "EUR por 1 USD" (0,8532 para el cierre 30/6/2025, 0,9337 para el cierre 30/6/2024 de Villarreal) en los 10 archivos, documentado en cada comentario de cabecera.
- Los 10 clubes reconcilian EXACTO contra Revenue/Expenses/PAT impresos de su propio documento (`verifyTieOuts()`, 30 checks nuevos, 0 errores), verificado en el navegador.
- Gotcha nuevo encontrado: FC Barcelona tiene el texto de sus páginas de balance/PyG deliberadamente ofuscado (ToUnicode reordenado), leído renderizando esas páginas a imagen en vez de `pdftotext`.
- Mercado de Pases/Resultados/Títulos vacíos a propósito en los 10 clubes (alcance de esta sesión fue solo Finanzas).

## Versión 112 — Ajustes de arquitectura para escalar a 1000 clubes (pedido explícito: revisar qué no escalaba antes de seguir onboardeando)

- `CLUB_DATA_SCRIPT_SRC` (mapa a mano en index.html, un onboarding = una edición manual) reemplazado por convención: `loadClubData(clubId)` arma `data/<clubId>-data.js` directo. `CLUB_DATA_SCRIPT_OVERRIDE` (vacío hoy) para el caso excepcional de un nombre de archivo distinto.
- Toggle "Año a año"/"Por gestión" de Finanzas OCULTO (Guido: "i dont care anymore about the Por Gestión toggle. either get rid of it or hide it") — mismo criterio que las pestañas Pases/Resultados/Comparar (Versión 56), UI oculta, código y datos intactos.
- Bug real encontrado al revisar esto: aun con el toggle oculto, `renderInicioStats()` seguía leyendo `gestionesByClub[currentClub][key]` sin guardas — un club onboardeado sin NINGUNA entrada de gestión rompía Inicio (la primera pantalla que ve cualquier visitante), no solo el toggle escondido. Se hizo defensivo en el motor (`currentGestionKey()` y todo lector de `gestionesByClub` en js/finanzas-render.js con `|| {}`, `renderInicioStats()` degrada a "Sin dato"). Ya NO hace falta que un club nuevo agregue una entrada sintética de gestión solo para evitar un crash.
- `checkFxSanity()` nuevo (`data/currency-map.js`, corre junto a `verifyTieOuts()` al cargar el sitio): compara cada `fx` contra un rango plausible por moneda (`FX_PLAUSIBLE_RANGE`) y avisa por `console.warn` si algo parece invertido o con el orden de magnitud equivocado — habría marcado el bug de fx invertido de España (Versión 111) de inmediato. 0 warnings en los 38 clubes actuales tras ajustar el rango de ARS (el histórico real va de ~$4 a ~$1900 por USD).
- Regresión completa verificada en el navegador tras los 3 cambios: 38 clubes, 213 checks de `verifyTieOuts()`, 0 mismatches, 0 warnings de `checkFxSanity()`, 0 errores de consola.

## Versión 113: Dominio propio (financeofsports.com) y rename del proyecto a `finance-of-sports`

- Guido compró **financeofsports.com** y el dominio ya sirve el sitio desde Netlify (verificado: `www.financeofsports.com` → 301 a `financeofsports.com`, `server: Netlify`, devuelve este `index.html`). Resuelve la mitad del to-do 7, que venía abierto desde el principio del proyecto.
- Carpeta local renombrada `numeros-de-boca/` → `finance-of-sports/`. 58 referencias de PATH (`numeros-de-boca/...`) actualizadas en docs, skills, transcripciones de `Clubes/` y comentarios de cabecera de `data/*.js`; las referencias al NOMBRE viejo se actualizaron también, salvo 3 líneas de historial puro (CHANGELOG Versión ~50, `finance-of-sports-project.md`) donde el nombre viejo es el dato correcto y se aclaró entre paréntesis.
- **`.gitignore` del sitio profesional (`../.gitignore`) actualizado**: la línea `numeros-de-boca/` pasó a `finance-of-sports/`. Esto es lo único que rompía de verdad con el rename: sin esa línea, todo este proyecto se vuelve untracked dentro del repo `guidomamone-website` y se puede commitear/deployar por error al sitio profesional de Guido. Verificado con `git check-ignore -v`.
- Nada del código del sitio depende del nombre de la carpeta: todos los assets se cargan con paths relativos (`data/*.js`, `js/*.js`) y `loadClubData()` arma el path por convención desde la Versión 112. Verificado que las 6 referencias locales de `<script src>` resuelven a archivos existentes.
- PENDIENTE, necesita a Guido (un agente no puede): renombrar el repo en GitHub y re-linkear el repo en Netlify. Ver to-do 7 en `index.html` para el paso a paso y el porqué del re-link.
- Nota de branding abierta: el sitio sigue llamándose "Tu club en números" (castellano) con un dominio en inglés, y el mail de contacto sigue siendo el placeholder `contacto@bocaennumeros.example` (to-do 8), que además referencia un nombre de marca ya abandonado.

## Versión 114 — Refactor de escalabilidad de documentación: el comentario de index.html pasó de 139 KB a 46 KB

- Hallazgo que cambió el plan: la sección "ESTADO ACTUAL" no era estado, era historial. 1.008 de las ~1.650 líneas del comentario (91 KB de los 139 KB) eran entradas de versión en orden cronológico inverso, de la Versión 112 para atrás, duplicando `CHANGELOG.md` a pesar de que el propio archivo declaraba desde la Versión 101 que "ya no acumula historial". La duplicación por club (el problema que el to-do 0 señalaba) es real pero es 14 KB, siete veces más chica.
- Verificado antes de borrar nada: las 73 versiones referenciadas dentro de "ESTADO ACTUAL" tienen todas su entrada propia en `CHANGELOG.md` (que va de la 10 a la 113, superset estricto), y se compararon 3 entradas al azar (76, 83, 98) para confirmar que el contenido está cubierto, no solo el número de versión.
- `CONVENCIONES.md` nuevo: los 25 bullets de REGLA/OJO que estaban sueltos dentro del historial y que son criterios VIGENTES (varios "pedido explícito de Guido"), no historia. Son lo que una sesión nueva tiene que leer antes de tocar el sitio. Se movieron textuales, sin reescribir.
- `ARQUITECTURA.md` nuevo: "ARCHIVOS DEL PROYECTO" + "MODELO DE DATOS" (referencia técnica que se consulta cuando hace falta, no contexto de arranque).
- "ESTADO ACTUAL" reescrito de cero como estado real, 40 líneas: qué es el sitio, cuántos clubes/países, la convención de archivos, la verificación automática, el estado de cada pestaña, y el desajuste de branding abierto. Bloque nuevo "DÓNDE ESTÁ CADA COSA" con el mapa de los 8 archivos de documentación.
- La sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" quedó intacta a propósito (decisión de Guido: hacer primero el corte barato por propósito, y dejar el de-duplicado por club para una sesión propia, que necesita 38 diffs a mano contra cada `data/<club>-data.js`).
- Regresión verificada en el navegador: 38 clubes, todos los assets 200, `verifyTieOuts()`/`checkFxSanity()` sin errores, 0 errores de consola.

## Versión 115 — Selector de idioma (castellano/inglés), motor i18n que escala a N idiomas, y versionado de assets

- Selector de idioma nuevo en el header, arriba a la derecha: un botón de globo con menú desplegable. Se eligió globo + menú en vez de una tira de botones por idioma porque el nav ya se recorta abajo de ~850px (to-do 9) y el costo de ancho tiene que ser constante, no crecer con cada idioma que se sume.
- `js/i18n.js` nuevo, el motor. AGREGAR UN IDIOMA = crear `data/lang/<code>.js` + una línea en `data/lang/langs.js`; no se toca ni el HTML ni el motor. El archivo del idioma se inyecta por convención (`data/lang/<code>.js`), mismo criterio que `loadClubData()` desde la Versión 112 y que `populateClubSelect()` desde la Versión 101.
- El castellano NO tiene archivo de diccionario, a propósito: el HTML ya está escrito en castellano, así que `apply()` guarda el texto original de cada elemento la primera vez y lo usa como valor "es". Consecuencia buscada: traducir mal un idioma nuevo no puede romper el castellano, y una clave que falte degrada al castellano en vez de mostrar la clave cruda o un hueco.
- `data/lang/en.js` nuevo, ~105 claves: nav, títulos, subtítulos, controles, headers de tabla, footer, modal de contacto, los stats de Inicio y de Finanzas, y los buckets de "Formato simplificado".
- `data/site-labels.js` nuevo: la lista de etiquetas que SON del sitio y por lo tanto se traducen. `tLabel()` traduce solo si la etiqueta está en ese mapa; cualquier otra pasa intacta. Así los rubros de "Formato del club" (que salen textuales del balance de cada club) NO se traducen nunca, que es la promesa del sitio: mostrar cada club tal cual lo reporta. Traducir "Ingresos por Cuota Social" de un balance argentino sería poner en el documento algo que el documento no dice.
- La traducción se aplica al DIBUJAR, no sobre el dato: los `label` en castellano siguen siendo las claves con las que matchea `findPrevVal()` y el overlay de presupuesto, así que cambiar de idioma no puede romper la comparación entre ejercicios.
- Detecta el idioma del navegador en la primera visita y recuerda la elección en `localStorage` (envuelto en try/catch: en modo privado no persiste, pero no rompe). Actualiza `<html lang>` al cambiar.
- `window.ASSET_V` nuevo + `?v=` en todos los `<script src>` propios (los 2 cargadores dinámicos leen la misma constante). Esto convierte en convención permanente lo que `CLAUDE.md` documentaba como truco temporal de verificación: sin esto, un visitante que ya entró antes se queda con el JS viejo cacheado mientras el HTML es nuevo. Pasó de verdad en esta sesión: el HTML nuevo pedía traducciones a una versión vieja del render que no las tenía.
- Verificado en el navegador: ida y vuelta ES/EN completa, cambio de club con lazy-load en inglés, `verifyTieOuts()`/`checkFxSanity()` sin errores, todos los assets 200/304, 0 errores de consola.

## Versión 116 — 3 clubes nuevos de Brasil (Coritiba, Ituano, Mirassol), de 38 a 41 clubes

- Se midió primero `pdftotext` chars/página de los 8 PDFs de Brasil pendientes: los 8 tienen texto nativo extraíble, ninguno es escaneo. Se cargaron 3 en esta sesión, quedan 5 igual de "fáciles" (ver to-do 16).
- **Coritiba SAF, Ejercicio 2024**: PREJUÍZO de R$ 139.402.626 sobre una receita líquida de R$ 87.002.707 (gastó 2,5 veces lo que ingresó), con patrimônio líquido NEGATIVO de R$ (29.915.096) al cierre. Es el peor ejercicio de cualquier club cargado en el sitio.
- Trampa encontrada y evitada en Coritiba: la DRE presenta los costos del fútbol en 2 líneas por DESTINO ("Futebol profissional" / "Futebol das categorias de base"), que son un bolsón sin categoría real. Cargarlas así habría dejado el bucket "Salarios y primas" de Formato Simplificado en CERO para el club, que es exactamente el bug que la REGLA de la Versión 38 existe para evitar. Se cargaron en cambio las 9 líneas POR NATUREZA de la Nota 22 (pessoal, direito de imagem, jogos, viagens, etc.), más las 13 líneas de la Nota 23 en vez de la única línea agregada de Despesas administrativas de la DRE.
- Discrepancia real de la fuente documentada (Coritiba): la Nota 22 suma R$ 98.539.079, exacto contra su propio total impreso, pero las 2 líneas de la DRE para el MISMO concepto suman R$ 98.538.080. R$ 999 de diferencia sin explicación en el documento. `officialTotalExpenses`/`officialPAT` guardan los números IMPRESOS; la diferencia resultante (0,001 M) cae dentro de la tolerancia de `verifyTieOuts()` (0,01 M), y está documentada en el código en vez de esconderse ajustando una línea para que cierre exacto.
- **Ituano, Ejercicio 2024**: déficit de R$ 7.063.131,20. No es SAF. DRE desglosada línea por línea cuyos 4 subtotales y resultado final cierran EXACTO; ninguna inconsistencia en el documento.
- **Mirassol, Ejercicio 2024**: superávit de R$ 4.143.614,12. No es SAF. Es el club con menos desglose del sitio junto con los de Japón, y la razón es la fuente: el PDF no son las demonstrações contábeis sino el informe NARRATIVO del auditor sobre ellas, sin un solo rubro desglosado. 1 línea de ingresos (`lump_football_operations`) y 2 de gastos.
- El monto de "Custos" de Mirassol no está impreso en ningún lado: se despeja de las otras 3 cifras (R$ 36.105.741,22) y queda confirmado por una vía independiente, el propio documento publica custos/receita = 60,84610193746302 % y el valor despejado da 60,84610193746304 %. No es un residuo a ciegas.
- Dudas nuevas anotadas en `dudas-por-club.md` (Mirassol): el Patrimônio Líquido del informe no cierra consigo mismo (saldo inicial + superávit = R$ 31.416.601,08, pero imprime R$ 30.267.600,99, R$ 1.149.000,09 sin explicar), por lo que NO se cargó ningún dato patrimonial; más varios errores de redacción del documento (cifras cuya versión en letras no coincide con el número, porcentajes que en realidad son coeficientes).
- Los 3 clubes usan el mismo PTAX BCB de cierre 31/12/2024 (R$6,1923) que ya usaban Grêmio y Botafogo para esa misma fecha. Ninguno de los 3 documentos declara tipo de cambio propio.
- Verificado en el navegador: 41 clubes, `verifyTieOuts()`/`checkFxSanity()` sin ninguna falla, 0 errores de consola, Coritiba renderizado y revisado a ojo en Finanzas.

## Versión 117 — El sitio pasa a llamarse "El deporte en Números" en castellano

- Rename de marca pedido por Guido: "Tu club en números" -> "El deporte en Números". Cambia el `<title>`, el logo del header y el asunto del mail del formulario de contacto. Historia completa del nombre: "Boca en Números" (inicio) -> "Tu club en números" (Versión 12) -> "El deporte en Números" (esta).
- La marca es DISTINTA POR IDIOMA a propósito, y eso queda resuelto como decisión, no como deuda: "El deporte en Números" en castellano, "Finance of Sports" en inglés (clave `site.name` de `data/lang/en.js`), que además es el dominio. Cierra la duda abierta que había dejado la Versión 115.
- `git remote` local actualizado a `https://github.com/guidomamone/finance-of-sports.git` (Guido ya renombró el repo en GitHub).

## Versión 118 — `auditAll()`: la auditoría deja de mirar solo el club que está abierto

- Problema que resuelve: `verifyTieOuts()`/`checkFxSanity()` solo pueden revisar clubes cargados en memoria, y los clubes se cargan por demanda desde la Versión 112. Como el único `data/<club>-data.js` que entra por `<script src>` es el de Boca, una carga normal de la página corría **6 de los 222 checks que existen**. Los otros 216 solo corrían si un visitante elegía justo ese club. Un error de datos en el club N° 37 era invisible hasta que alguien lo miraba a mano.
- `auditAll()` nuevo: fuerza `loadClubData()` sobre los 41 clubes, corre las 2 verificaciones y devuelve (además de imprimir) un resumen con checks que cierran, checks que no, warnings de fx y clubes que no cargaron. Se dispara con `?audit=1` en la URL o llamándolo desde la consola.
- La carga por demanda NO se tocó: verificado que una carga normal sigue teniendo 1 solo club en memoria. El visitante que solo quiere ver Boca sigue sin bajar 41 archivos de datos.
- Regla nueva documentada en el código: cualquier verificación total tiene que pasar por `computeYearGeneric()`, nunca reimplementar la cascada. Al escribir esto se probó primero un verificador aparte en Node que recalculaba el PAT por su cuenta y tiró 12 FALSOS POSITIVOS, porque el motor real suma cosas que esa fórmula no tenía (nonCash, profitOnPlayerSales, assetSales, tax).
- Resultado de la primera corrida completa: 41 clubes, 222 checks cierran, 0 que no cierran, 0 warnings de fx, 0 clubes que no cargan.

## Versión 119 — El origen del proyecto entra al repo: `finance-of-sports-project.md` deja de estar partido en dos

- Guido notó que había un `finance-of-sports-project.md` fuera de la carpeta del proyecto. Al compararlos NO eran duplicados: el de afuera (68 KB, sin tocar desde el 11/9) es el VOLUMEN 0 del proyecto, y tenía material que el de adentro nunca cubrió — el planteo original (Objetivo, quién hace algo parecido, la lista de qué analizar, dónde buscar la información, la recomendación de enfoque), las Versiones 1 a 9 del MVP, las notas de deploy y una to-do list vieja. El de adentro arranca en la Versión 10.
- Se fusionó: el bloque único se agregó al final de `finance-of-sports-project.md` como "VOLUMEN 0 — ORIGEN DEL PROYECTO", textual, sin editar una palabra (incluidas las rutas viejas `numeros-de-boca/`, que se dejaron a propósito: es un documento histórico y corregirlo sería perder el registro de cómo se pensaba el proyecto al principio). También entró la sección del barrido de fuentes de los 27 clubes restantes de Primera División, que tampoco estaba.
- Las Versiones 10-20 y 81-82 del archivo viejo NO se copiaron: ya están en este archivo, con más detalle.
- La copia vieja pasó a `_to_delete/` (fuera de git) en vez de borrarse de una. La línea `finance-of-sports-project.md` del `.gitignore` del sitio profesional se sacó, ya no hace falta.
- Efecto real: el origen del proyecto pasa a estar versionado en git por primera vez. Hasta ahora vivía en un archivo suelto e ignorado, a un `rm` de distancia de perderse.

## Versión 120 — "Qué es real por club" se GENERA desde los datos, y skill de arranque de sesión

- `tools/generate-club-index.js` nuevo: la sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" del comentario de `index.html` deja de escribirse a mano y pasa a generarse desde `data/clubs.js` + los `fiscalYearMeta` de cada club. Deja de ser prosa paralela y pasa a ser una VISTA de los datos: no puede desincronizarse, porque no hay nada que sincronizar. `--check` sale con código 1 si quedó desactualizada, para chequear antes de un push.
- Esto resuelve la "fuga 1" del mapa de procesos: esa sección decía lo mismo que el comentario de cabecera de cada `data/<club>-data.js` ya decía, y era la copia que se desactualizaba. Onboardear un club pasa de tocar 6 archivos de documentación a tocar 2.
- La división de responsabilidades quedó explícita: el índice generado contesta QUÉ hay cargado (cuántos ejercicios, de qué tipo, en qué moneda); el comentario de cabecera del `data/<club>-data.js` contesta POR QUÉ (qué supuesto se tomó, qué salvedad tiene una cifra, qué quedó sin cargar). Lo segundo no es derivable de los datos y por eso no se intentó generar.
- La prosa vieja NO se perdió: quedó textual en `QUE-ES-REAL-historico.md`, marcada como archivo histórico que ya no se actualiza, como red de seguridad por si algún dato no estuviera en el archivo de su club.
- BUG REAL cometido y corregido en la misma sesión: los marcadores de la sección generada se pusieron primero como comentarios HTML (`<!-- CLUB-INDEX:START -->`). Como esa sección vive DENTRO del comentario grande de `index.html`, el `-->` anidado CERRÓ el comentario exterior antes de tiempo y todas las notas internas (la TO-DO list incluida) pasaron a renderizarse como texto visible en el sitio, arriba del header. Se detectó revisando el navegador. Los marcadores pasaron a ser texto plano (`===== CLUB-INDEX:START =====`) y quedó la advertencia escrita en el script.
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md` nuevo: el checklist de arranque y cierre de cualquier sesión (qué leer y en qué orden, qué NO leer, cómo levantar el sitio, `auditAll()` antes de pushear, qué documentar al terminar, la regla de git). Guido va a empezar a abrir las sesiones directamente en `finance-of-sports/` en vez de la carpeta de arriba, lo que hace que los 4 skills del proyecto se autodescubran en vez de haber que abrirlos a mano.
- Efecto medido: el comentario de `index.html` pasó de 51 KB a 40 KB, y la parte que crecía linealmente con cada club ahora es generada.

## Versión 121 — El motor deja de tener una lista de clubes escrita a mano, y 2 renames

- `presupuestoOverlayFor()` (js/finanzas-calc.js) era un `if` que sólo conocía a `racing` y `river`: onboardear un club con presupuesto Y balance del mismo ejercicio obligaba a editar el motor. Era el último lugar donde sobrevivía el patrón "agregar un club = tocar el código", que el resto del proyecto ya había eliminado (`loadClubData()` Versión 112, `populateClubSelect()` Versión 101). Ahora sale por convención: alcanza con que el `window.CLUB_GENERIC_DATA.<club>` del archivo del club registre `presupuestoOverlayByYear`.
- Los 22 archivos de club que declaraban `<club>PresupuestoOverlayByYear` sin registrarlo (código muerto) ahora lo registran. Un club sin overlay devuelve null igual que antes.
- Verificado que no fue una regresión: Racing sigue mostrando las columnas "Balance 2019/2020" y "Presupuesto 2019/2020" en el mismo ejercicio, y `auditAll()` da 41 clubes / 222 checks / 0 fallas.
- `Proyecto Boca.md` renombrado a **`finance-of-sports-project.md`**. El nombre venía de cuando el sitio era solo de Boca; hoy son 41 clubes de 6 países. Actualizadas las ~40 referencias en `index.html`, `CLAUDE.md`, `CONVENCIONES.md`, `ARQUITECTURA.md`, los 4 skills, `data/river-data.js`, `fuentes/` y el propio encabezado del archivo (que deja constancia del nombre viejo).
- Skill `start-session` renombrado a **`start-session-finance-of-sports-project`**, para que el nombre diga a qué proyecto pertenece cuando aparezca en una lista de skills junto con los de otros proyectos.

## Versión 122 — `tools/audit.js`: auditoría determinista de lo que un total correcto no delata

- `tools/audit.js` nuevo: audita el proyecto entero en Node y agrupa los hallazgos en P0 (un número publicado puede estar mal) / P1 (algo roto que el visitante ve) / P2 (riesgo) / P3 (limpieza). `--json` para la lista completa, `--quiet` para usarlo de gate, código de salida 1 si hay P0 o P1.
- Complementa a `auditAll()`, no lo reemplaza: `auditAll()` verifica que cada ejercicio CIERRE contra el total que su documento imprime. Esto busca lo que cierra igual — ejercicios sin ningún total contra qué compararse, categorías con typo o prestadas de la otra taxonomía, categorías que el motor no suma, errores de escala, desgloses que se contradicen con su propia fila, catch-all dominante, ramas por club en el código.
- Respeta la regla heredada de `auditAll()`: carga `js/finanzas-calc.js` en un contexto de `vm` y llama a `computeYearGeneric()`/`toDisplayValue()`/`bucketize()` reales. No reimplementa la cascada en ningún lado.
- Detalle de carga que difiere de `tools/generate-club-index.js`: ahí el sandbox usa `window: {}` y alcanza porque solo lee datos; acá el objeto global del contexto TIENE que ser su propio `window`, porque el motor lee `CLUB_GENERIC_DATA` sin el prefijo `window.`.
- La sonda de categorías huérfanas no es análisis estático: arma un club sintético con una línea de cada categoría declarada y le pregunta al motor cuánto sumó. Encuentra siempre el bug de la Versión 53 (una categoría en `EXPENSE_CATEGORIES` que `computeYearGeneric()` no toca hace desaparecer plata de todo el sitio), que aquella vez se encontró de casualidad.
- Probado inyectando errores a propósito en una copia desechable: un rubro alterado (rompe el tie-out), un typo de categoría, una categoría declarada que el motor no suma, un desglose que no cierra, y un `fx` mal transcripto (3757,08 → 3,75708). Los cinco se detectan; el último es el que más importa, porque deja TODOS los tie-outs en verde y publica un número 1000 veces más grande.
- 4 falsos positivos de la primera versión, corregidos: `fx: null` no rompe la conversión (`yearMetaFor()` sustituye el `FX_RATE` global, así que el toggle muestra un número aproximado, no `$0`); los `items` de un gasto se guardan en positivo y la línea en negativo, así que hay que comparar magnitudes; un ingreso negativo o un gasto positivo casi siempre es una deducción legítima, así que solo se reporta si pesa más del 2% de su sección; y un ejercicio placeholder tiene sus líneas en cero, no le "faltan" los sueldos.
- `tools/audit-ignore.json` nuevo: silencia hallazgos YA verificados a mano contra el documento fuente, con el motivo escrito. Sin esto, una auditoría de rutina repite los mismos hallazgos hasta que nadie la lee. Con la regla explícita de que no se agrega una entrada sin mirar la fuente.
- Primera corrida sobre los 41 clubes: 0 P0, 0 P1, 52 P2, 7 P3. El detalle agrupado quedó como to-do 20 en `index.html`.

## Versión 123 — Skill de auditoría de rutina, y el primer reporte

- `.claude/skills/auditoria-finance-of-sports/SKILL.md` nuevo: el procedimiento de la auditoría de rutina, que es una tercera cosa distinta de las dos verificaciones que ya existían. El onboarding audita lo que se acaba de tocar; `auditAll()` audita que los totales sigan cerrando; esto audita lo que nadie tocó hace meses, que es donde nadie mira.
- Tres capas, de lo más determinista a lo más caro, cada una acotando a la siguiente: `node tools/audit.js` (5 segundos, 0 juicio) → lectura dirigida SOLO de lo que el script marcó → un eje de juicio por corrida, rotando entre `datos`, `escala`, `codigo`, `docs` y `tokens`. Es lo que hace que una auditoría no cueste leer el repo entero.
- Cada corrida deja `auditorias/<fecha>.md` y **diffea contra el reporte anterior**. Sin eso, la cuarta auditoría repite los mismos 52 hallazgos y nadie la lee. Los P0/P1/P2 que sobreviven van a la to-do de `index.html`, que sigue siendo la única lista oficial de próximos pasos: el reporte no es una segunda to-do.
- El eje `tokens` viene con la lista de recortes PROHIBIDOS escrita (verificar el OCR fila por fila, re-sumar las líneas en vez de confiar en el total impreso, resumir una transcripción, saltear un tie-out, pre-convertir moneda, silenciar un hallazgo sin mirar la fuente), para que una sesión futura no "optimice" la exactitud creyendo que ahorra.
- Regla que hace que las auditorías se terminen: cuando un hallazgo se repite en más de un club, el arreglo no es arreglar los datos sino escribir la regla en el skill que corresponde, para que el club siguiente no nazca mal.
- `auditorias/2026-09-13.md`: primer reporte, línea de base. 0 P0, 0 P1, 52 P2, 7 P3, eje de juicio `datos`.
- Hallazgo principal de ese eje, que el script marcaba pero no podía interpretar: **el sitio muestra igual "la fuente reporta cero" y "la fuente no lo desglosa"**. Los 10 clubes de Japón tienen 3 líneas de ingreso porque es todo lo que publica la J.League por club, así que muestran Televisión = $0 con la mitad de sus ingresos en un catch-all rotulado "Otras secciones deportivas y otros ingresos", que afirma algo que la fuente no dice. `river 2024` tiene el mismo efecto por otra causa: sus 8 rubros de gasto están en `other_expenses` con etiquetas por sector, con los sueldos adentro de "Fútbol profesional" (80% de los gastos) — la trampa de "costos por destino, no por naturaleza" ya documentada con Coritiba. Quedó como to-do 20 (h), con las 2 opciones propuestas; ninguna mueve un número.

## Versión 124 — `CLAUDE.md` deja de decir que los skills del proyecto no se autodescubren

- El párrafo de `CLAUDE.md` que manda a leer los skills afirmaba que el descubrimiento automático no llega a `finance-of-sports/.claude/skills/` y que había que abrirlos a mano con el Read tool. Dejó de ser cierto en la Versión 120, cuando Guido empezó a abrir las sesiones directamente en `finance-of-sports/` en vez de la carpeta de arriba: desde ahí aparecen solos en la lista y se invocan por nombre. Verificado en esta sesión.
- Reescrito como las 2 situaciones reales (sesión abierta en `finance-of-sports/` → aparecen solos; sesión abierta en `Website propio/` → puede que no, leerlos a mano), dejando explícito que la obligación de leerlos no cambia en ninguno de los dos casos, que es la razón por la que el párrafo existe.
- Aprovechado para que la lista sea completa: eran 3 skills enumerados de 5. Faltaban `start-session-finance-of-sports-project` (que es por dónde hay que empezar) y `auditoria-finance-of-sports` (Versión 123).


## Versión 125: Cada tipo de cambio dice de dónde salió, y las cotizaciones de mercado se dicen una sola vez

- `fxSource` nuevo en cada ejercicio: `document_close` (lo declara el balance), `document_assumption` (la premisa de un presupuesto), `market_close`, `market_approx`, `placeholder`, `unknown`. Son las 4 reglas de `club-data-mapping` §5 hechas campo, más el estado "todavía no se sabe".
- `document_assumption` es una categoría propia a pedido de Guido ("para Presupuesto, los clubes toman assumption de FX siempre"): un presupuesto declara un pronóstico que puede terminar equivocado, no un cierre ya ocurrido. Boca 2027 usa 1660, el promedio entre el dólar de inicio ($1.480) y el de cierre ($1.840) que asume el propio documento.
- `FX_CLOSE` nuevo (`data/currency-map.js`): las cotizaciones de mercado, una sola vez, por moneda y fecha de cierre. 33 copias de 9 valores pasaron a 9 entradas + `fxRef`. El cierre del real al 31/12/2024 estaba escrito a mano en 5 archivos, el euro al 30/6/2025 en 9, el ¥150 de la J.League en 10.
- La regla que hace que la tabla no contradiga "nunca reuses el fx de un club para otro": lo que declara un documento va literal en el archivo del club (dos clubes pueden declarar valores distintos para el mismo día y los dos están bien); lo que es cotización pública no es un dato del club y se dice una vez en la tabla.
- `fxMetaFor()` resuelve `fxRef` en un solo lugar; `yearMetaFor()`, `presupuestoOverlayMetaFor()`, `checkFxSanity()` y `tools/audit.js` pasan por ahí en vez de leer `meta.fx` crudo.
- Los 89 `fx` migrados con evidencia archivo por archivo: 30 declarados por un balance, 32 cotización de mercado, 8 premisa de presupuesto, 4 aproximación, 10 placeholder, 5 sin determinar. Antes, 18 de los 89 no tenían ningún rastro de su procedencia y el resto lo contaba en prosa con ~10 redacciones distintas.
- Verificado de paso contra las transcripciones: los 9 fx de Vélez 2017-2025 SÍ salen de su propio Anexo VI (columna Activo), que nadie había documentado; el de Instituto 2024 no está en su documento.
- `tools/audit.js` suma la procedencia: `fx-sin-procedencia`, `fx-mercado-discrepante` (una cotización de club que contradice a la tabla para la misma fecha) y `fx-ref-rota`. Primer hallazgo real: Unión 2024 usa 890,50 donde Racing, Vélez y Estudiantes declaran 909 para el mismo cierre.
- `node tools/audit.js --fx` nuevo: no audita, LISTA. Los 89 tipos de cambio, uno por club-ejercicio (los 4 overlays de presupuesto de Racing incluidos), agrupados por moneda y ordenados por año, con su origen al lado. Contesta "¿de dónde salió este número?" sin abrir un archivo de club, que era la pregunta que abrió la sesión.
- BUG REAL, encontrado al migrar: los `?v=` de los `<script src>` estáticos son literales y NO salen de `window.ASSET_V`, contra lo que decían `index.html` y `CLAUDE.md`. Subir solo la constante dejó al navegador sirviendo un `currency-map.js` cacheado sin `fxMetaFor()` con un `finanzas-calc.js` nuevo que ya lo llamaba: `ReferenceError` en toda la página. Corregida la documentación y agregado el chequeo `asset-v-desfasado` (P1) que compara la constante contra cada tag.
- `auditAll()`: 41 clubes, 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 126: Cada número cita su documento: ficha de Fuentes en Finanzas y `fuentes.html`

- Card "Fuentes" al final de Finanzas, por ejercicio: documento (con link), nivel de fuente, tipo de cambio usado CON su procedencia, y las salvedades. Si el ejercicio tiene balance y presupuesto, muestra los DOS tipos de cambio (Racing 2020: el balance declara 73,98, el presupuesto asumió 70).
- Reemplaza a `finanzasClubSourceText`, un objeto escrito a mano con 3 entradas (Boca, Racing, River) que dejaba a los otros 38 clubes sin citar nada.
- Arreglo de fondo: `sources{}` tenía 91 entradas con 61 URLs y se consumía en UN solo lugar, el banner de advertencia, que hace `return` temprano cuando el ejercicio es oficial, o sea que los 88 ejercicios REALES no mostraban su fuente en ningún lado mientras el sitio prometía "todo dato cita su origen". El banner ahora solo advierte y no repite el documento.
- Pestaña Fuentes: se borraron la tabla de 6 filas escritas a mano (IGJ, INDEC, actas de Boca) y el párrafo de ~450 palabras que nombraba club por club y se había quedado en 12 clubes argentinos. En su lugar, los documentos del club seleccionado, generados de los datos. Escala por construcción: nunca lista más de un club.
- `fuentes.html` nuevo, generado por `tools/generate-fuentes-page.js`: el listado completo del sitio, 91 documentos de 41 clubes de 6 países, 61 con link al original, cada uno con qué ejercicios respalda, con qué tipo de cambio se convirtió y qué salvedades tiene. Página propia y estática (URL rankeable, sin depender de JS para el crawler) en vez de más filas dentro de `index.html`. `--check` avisa si quedó vieja.
- Las etiquetas nuestras (nivel de fuente, procedencia del fx) pasan por `t()` y están traducidas al inglés; el título y las salvedades de cada documento quedan en su idioma original a propósito, mismo criterio que los rubros de "Formato del club".
- BUG en el chequeo de i18n de `tools/audit.js`: buscaba las claves definidas entre comillas simples y `data/lang/en.js` las escribe entre dobles, así que el conjunto de definidas quedaba VACÍO y reportaba como sin traducir TODAS las claves usadas. De ahí las "88 claves" de la primera auditoría, que nunca fueron el número real. Con el regex arreglado (y salteando los prefijos de clave dinámica) el faltante real es 0.
- `auditAll()`: 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 127: la pestaña Fuentes revisada, y la nota interna deja de publicarse

- BUG DE PRIVACIDAD, encontrado por Guido al revisar la Versión 126: `sources[].note` es la nota que una sesión le deja a la siguiente, y 64 de las 91 mencionan su nombre o rutas de su disco ("PDF subido directamente por Guido", "Transcripción completa en Clubes/España/..."). Se publicaban tal cual en la pestaña Fuentes y en la ficha de Finanzas.
- `note` pasa a ser explícitamente interna y no se renderiza en ningún lado. Lo que ve el visitante es `publicNote`, nueva: una o dos oraciones escritas para un lector, solo donde hay una salvedad que no se deduce de los datos. La tienen 17 de 91 documentos (River, Club América, los 10 de Japón, Argentinos, la cobertura de prensa de Racing y los 3 placeholders).
- `sourceCaveats()` nueva (`data/sources-view.js`): el resto de las salvedades se deriva de los campos que ya existen (tipo de cambio de referencia o aproximado, balance que no publica el resultado del ejercicio, ejercicio sin deuda ni caja). Un club nuevo las trae bien sin que nadie escriba una línea.
- `data/sources-view.js` nuevo: las etiquetas de tipo y nivel de documento estaban duplicadas entre `js/finanzas-render.js` y `tools/generate-fuentes-page.js`, o sea que el sitio y la página podían describir distinto el mismo documento. Ahora salen de un archivo que cargan los dos.
- `fuentes.html` pasa de una lista de cards a una tabla de País, Equipo, Fuente y Notas, a ancho completo (1600px en vez de 900px). Las notas largas se pliegan en un `<details>` con "Ver más", sin JavaScript, así que un crawler las lee igual.
- La pestaña Fuentes pierde el card "Sobre mí" (pedido de Guido) y muestra el tipo de documento además del nivel. Las 6 claves de tipo se tradujeron al inglés.
- 15 títulos de documento tenían un em dash y se limpiaron, más 38 líneas de texto escritas en esta sesión: la regla está en `CONVENCIONES.md` desde la Versión 42 y la había violado sistemáticamente.
- `tools/audit.js` suma 2 guardarraíles: `nota-publica-con-interno` (P1) si un `publicNote` menciona un nombre propio, una ruta del repo o un detalle de transcripción, y `note-interna-renderizada` (P1) si alguien vuelve a interpolar `.note` dentro de HTML. Probado inyectando la fuga a propósito.
- `auditAll()`: 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 128: auditoría de escala, y la página de fuentes deja de ser huérfana

- Segunda auditoría del día, eje `escala` (pedida por Guido antes de un cambio grande): `auditorias/2026-09-13-escala.md`.
- P1 encontrado y arreglado: `fuentes.html` era una página huérfana. Se hizo para que la indexen buscadores y sus únicos links los armaba el JS en runtime, así que un crawler que no ejecuta JavaScript nunca llegaba (los 3 `fuentes.html` de `index.html` estaban los tres dentro de comentarios). Ahora hay un `<a>` estático en el footer, verificado con `curl` sobre el HTML servido.
- 6 cuellos de escala medidos, con el número en el que aparece cada uno, a la to-do 22: `clubId` sin país (ya hay un Olimpia en Honduras y otro en Paraguay), los 50 KB de comentario interno que baja cada visitante y crecen 102 bytes por club, `fuentes.html` como página única de 767 bytes por documento, `clubs.js` entero en cada visita, el `<select>` plano de clubes, y `auditAll()` cargando en serie.
- Anotado el techo del modelo: la taxonomía y 3 pestañas asumen fútbol.

## Versión 129: los dos prerrequisitos del selector jerárquico

- `data/club-index.js` nuevo, GENERADO por `tools/generate-club-index.js` (que ahora emite dos artefactos y los chequea con `--check`): nombre, país, calidad del dato, cuántos ejercicios y el más reciente, por club. ~76 bytes por club contra los ~366 de `clubs.js`.
- Por qué existía el problema: el panel jerárquico tiene que mostrar el punto de calidad y el conteo de ejercicios de cada club SIN cargar ninguno, y las dos cosas viven adentro de `data/<club>-data.js`. Verificado en el navegador con la página recién abierta: `clubs{}` 41 entradas, `sources{}` 3, todas de Boca.
- `clubQuality()` nueva en `data/sources-view.js`, al lado de `sourceLevel()`. Sus 4 estados NO son los 4 valores de `reliability`: la regla "verde si todos son primary, gris si ninguno lo es" deja a River en "solo placeholder", y River tiene un balance auditado real conseguido en una réplica de hinchas. La pregunta es "¿hay algún documento REAL?", no "¿hay algún primary?".
- Convención nueva en `CONVENCIONES.md`: el `clubId` de un club NUEVO lleva el país al final (`nacional-uy`). El id nombra el archivo de datos y prefija cada `sourceId`, así que una colisión se paga en tres lugares, y los nombres se repiten entre países más de lo que parece (Racing, Independiente, Unión, Nacional). Los 41 de antes no se migran.
- `tools/audit.js` suma `clubid-heredado-ambiguo` (P2), que no prohíbe la convivencia de `racing` con `racing-es`: avisa el día que un id heredado deja de ser inequívoco, que es el único momento en que renombrarlo vale lo que cuesta. Probado agregando un Racing Santander de mentira.
- Falso positivo corregido en `clubid-hardcodeado`: buscaba ids entre comillas en `index.html` sin saltear los comentarios HTML, así que cada mención de un club en la prosa del comentario de cabecera (50 KB) se reportaba como una rama por club. Ahora los comentarios se blanquean antes de buscar, conservando los números de línea, y no se miran backticks, que en prosa son markdown.
- Documentado, porque rompió el archivo al probarlo: un `clubId` con guion NO es clave JS válida sin comillas (`'racing-es': { ... }`).
- `auditAll()`: 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 130: dos cargas simultáneas del mismo club dejan de pisarse

- BUG REAL, encontrado buscando qué más hace falta antes del selector jerárquico: `loadClubData()` marca el club como cargado recién en el `onload`, así que dos llamadas SIMULTÁNEAS al mismo club inyectaban dos `<script>` del mismo archivo. El segundo tira `SyntaxError: Identifier 'velezRevenueLinesByYear' has already been declared`, porque los `const` de un data file viven en el scope global. Los datos quedaban bien (gana el primero), pero la consola se llenaba de errores.
- No pasaba hasta ahora porque el sitio carga un club por vez. La comparación multi-club lo va a hacer todo el tiempo: 5 sujetos en paralelo, el mismo club en dos ejercicios, o el promedio de una liga que incluye al club activo.
- Arreglado cacheando la promesa en vuelo, y borrándola también al fallar para que un reintento después de un error de red vuelva a intentar de verdad. Verificado con 3 llamadas simultáneas en pestaña limpia: 1 solo `<script>`, 0 errores.

## Versión 131: el sitio tolera no tener club elegido

- Prerrequisito del cold start del selector jerárquico (§3.0a de `PROMPT-selector-jerarquico.md`), decidido con Guido: el hero sin club es `currentClub` en null DE VERDAD, no un club por debajo tapado por una capa.
- Se midió en vez de suponer: con `currentClub = null`, 9 de los 15 puntos de entrada de render tiraban TypeError (`populateFinanzasSelectors`, `populateCurrencyToggle`, `refreshFinanzas`, `populatePasesSelectors`, `applyPasesFilters`, `renderResultados`, `renderTitulosTable`, `renderInicioCharts`, `refreshAllForClub`). Ahora son 0.
- El arreglo va en los ACCESORES, no en cada punto de entrada: `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` devuelven null, `yearMetaFor`/`reportTypeForYear`/`allYearsRangeForClub`/`computeYearGeneric` toleran que el club no esté cargado, y `populateFinanzasSelectors` deja los `<select>` vacíos. Un solo lugar por dato en vez de quince.
- `clubCargado(clubId)` nueva en `index.html`: el único lugar que contesta "¿hay datos de este club acá y ahora?", que distingue los dos estados nuevos ("todavía no se eligió" y "se eligió pero su archivo no bajó").
- `computeYearGeneric()` devuelve `null` sin club, y sus 2 orquestadores cortan ahí en vez de pintar ceros: un cero se lee como un dato, y este sitio no muestra datos que no tiene.
- Verificado en las dos direcciones: los 15 puntos de entrada con `currentClub = null` sin una sola excepción, y el camino normal intacto (`auditAll()` 222 checks, 0 mismatches, 0 warnings, cambio de club a Racing y Finanzas pintando).

## Versión 132: en qué liga jugó cada club, cada ejercicio

- `data/club-leagues.js` nuevo, a pedido de Guido: la liga de cada club en cada ejercicio, en UN archivo que se actualiza una vez por temporada, en vez de un campo `league` repartido en los 41 `data/<club>-data.js` como proponía el prompt del selector.
- Nace con las 85 filas en `null`, y `null` significa "nadie lo verificó todavía". No se rellena de memoria ni por deducción: se mira la temporada en la fuente y recién ahí se escribe. El archivo ES la lista de pendientes.
- `leagueAt(clubId, year)` devuelve null cuando no se verificó, a propósito, en vez de caer a "la liga de hoy": un ejercicio de hace diez años puede ser de otra categoría, y contestar con la actual sería inventar justo el dato que este archivo existe para no inventar.
- `tools/audit.js` suma `liga-sin-fila` (P2, un ejercicio real que ni siquiera tiene su fila) y `liga-sin-verificar` (P3, cuántas filas siguen en null). Hoy: 0 y 85 de 85.
- Pregunta abierta que bloquea las 55 filas argentinas: un ejercicio que cierra el 30/6 (o el 31/8 de Racing hasta 2021) cruza dos torneos del calendario argentino. Hay que fijar el criterio una vez. España, México y los de año calendario (Brasil, Japón, Colombia) no tienen esa ambigüedad.

## Versión 133: criterio de liga por ejercicio, y las primeras 30 filas verificadas

- CRITERIO decidido por Guido, escrito en `CONVENCIONES.md` y en el archivo: cuando un ejercicio cruza dos torneos, vale LA CATEGORÍA AL CIERRE. Es la misma regla que el proyecto ya usa para atribuir la gestión presidencial, así que es una regla menos que recordar. No afirma que todos los ingresos del ejercicio se hayan generado en esa categoría; si alguna vez eso importa, el matiz va en el aviso de la comparación, no en el criterio.
- 30 de las 85 filas de `data/club-leagues.js` verificadas contra las páginas de temporada de Wikipedia, con la fuente anotada por bloque: Japón (10 clubes, J1 2025), España (9 en LaLiga 2024/25 más Villarreal en 2023/24), Brasil (7, repartidos entre Série A y B), Colombia (2, Primera A) y México (1, Liga MX).
- Dos de esas 7 filas brasileñas corrigen la suposición del prototipo: Coritiba e Ituano jugaron la Série B 2024, y Atlético Goianiense la Série B 2025 (había descendido de la Série A 2024). Mirassol 2024 también es Série B, y ascendió para 2025, que es justo el caso que el prototipo usaba de ejemplo.
- Faltan las 55 argentinas, que necesitan la historia año por año de cada club.

## Versión 134: Argentina cargada, 82 de 85 filas de liga verificadas

- Las 55 filas argentinas de `data/club-leagues.js`, con su fuente. Vélez, San Lorenzo y Racing en todos sus años con balance: confirmado por Guido. El resto contra las páginas de Wikipedia de las temporadas 2022, 2023, 2024 y 2025 de Primera División, que cubren Estudiantes, Unión, Rosario Central, Independiente, Instituto, River y Boca de una.
- Argentinos Juniors es el único de los 11 que cambió de categoría en el período cargado: descendió al terminar el torneo de transición 2016 y jugó la B Nacional 2016-17, que ganó. Verificado contra la página de esa temporada.
- SUB-REGLA de "la categoría al cierre", que hizo falta exactamente una vez: vale la categoría de la temporada EN CURSO o recién terminada a la fecha de cierre. El ejercicio jul-2015/jun-2016 de Argentinos se jugó entero en Primera (el descenso se definió en mayo de 2016), así que ese ejercicio es Primera aunque al 30/6/2016 el club ya estuviera descendido para el torneo siguiente. Leerlo al revés etiquetaría como "B Nacional" un año cuyos ingresos son 100% de Primera.
- Los ids del primer y segundo escalón argentino son `ar-primera` y `ar-primeranacional`, NO el `ar-lpf` que propone `PROMPT-selector-jerarquico.md`: en el período cargado esa categoría cambió de organizador y de nombre tres veces (Primera de AFA, Superliga 2017-2019, Liga Profesional desde 2020), así que un id atado al organizador de hoy leería mal en un ejercicio de 2009. El id nombra el escalón, que no cambia.
- Quedan 3 filas en null, las tres presupuestos: Boca 2027 y Racing 2027 cierran en el futuro, y Racing 2026 no se chequeó contra la temporada.

## Versión 135: Boca deja de ser un caso especial en el código

- Los dos documentos de Boca que estaban escritos a mano como HTML adentro de `index.html` (Presupuesto Financiero y Presupuesto de Inversiones 2026/27, 133 líneas entre los dos) pasaron a ser datos en `data/boca-data.js`. Un `isBoca2027` decidía si se mostraban ellos o la versión genérica; ahora hay un solo render para todos.
- La forma genérica CRECIÓ para no perder nada: antes guardaba 4 números para el financiero y 1 para inversiones, así que mergear hacia ella habría borrado el desglose obra por obra de Boca (4 grupos, ~40 ítems). Ahora soporta `steps` (waterfall), `tabla` con filas tipadas (subhead/subtotal/total) y `groups` con ítems anidados; el club que tiene menos detalle declara menos.
- Los datos se extrajeron PARSEANDO el HTML existente, no retipeándolos, así que no hay riesgo de error de transcripción. De paso salió un tie-out gratis: los 4 grupos de inversiones suman exactamente el total impreso (41.767.058.000).
- Los presupuestos de Racing (Supuestos, Financiero, Inversiones) vivían en 3 registros `[clubId][year]` adentro de `js/finanzas-render.js`, o sea datos de club en la capa de render: onboardear un presupuesto obligaba a editar el motor. Se movieron a `data/racing-data.js` como `presupuesto*ByYear`, y el de Supuestos de Boca también.
- VERIFICACIÓN: se capturó el texto renderizado de las 6 cards (Boca 2027, Racing 2026, Racing 2027) ANTES del cambio, con los acordeones abiertos, y se comparó después. Los 6 hashes son idénticos, carácter por carácter. Un club sin presupuesto (Vélez) sigue escondiendo las 3 cards.
- Las tablas de Boca se muestran en pesos enteros y no responden al toggle de moneda, igual que cuando eran HTML fijo (`formato:'ars-exacto'`). Cambiar eso es una decisión aparte, no algo para colar en una mudanza.
- Los literales de `clubId` en el código bajaron de 5 a 2, y los 2 que quedan son a propósito: el club por defecto (desaparece con el cold start del selector) y los 3 cards de torneo de Boca, que Guido decidió dejar.

## Versión 136: primer sourcing fuera del fútbol — Reino Unido y EE.UU., 27 entidades de 7 deportes

*(Sesión de SOURCING solamente: no se cargó ningún club al sitio, no se tocó ni `index.html` ni
ningún archivo de `data/` ni de `js/`. Todo lo de abajo son documentos encontrados, descargados y
documentados, listos para una sesión de onboarding futura.)*

- **Companies House (Reino Unido) es el mejor canal encontrado hasta ahora, y no depende del
  deporte**: toda sociedad limitada británica deposita cuentas auditadas y el registro las publica
  gratis, sin login y sin API key. De un solo barrido salieron 4 deportes: fútbol, rugby union,
  cricket y Fórmula 1.
- Descargados y verificados uno por uno (entidad y período confirmados por OCR de la portada, no
  asumidos): **10 clubes de fútbol** (Arsenal, Tottenham, Liverpool, Manchester City, Everton,
  Chelsea, Newcastle, Aston Villa, West Ham y Celtic en Escocia), **4 de rugby** (Leicester Tigers,
  Northampton Saints, Bath, Harlequins), **4 condados de cricket** (Surrey, Lancashire, Yorkshire,
  Warwickshire) y **5 escuderías de F1** (McLaren, Williams, Aston Martin, Mercedes, Red Bull).
- Los clubes de cricket NO están en Companies House: son *registered societies* y depositan en el
  **Mutuals Public Register de la FCA**, que resultó mejor todavía — esos PDF sí tienen capa de texto
  (no hace falta OCR) y el histórico es mucho más profundo. Warwickshire tiene **37 memorias anuales
  desde 1993** y Surrey **35 desde 1994**: la serie más larga de todo el proyecto.
- **La SEC también es un canal, para los deportes de EE.UU. que no son fútbol.** El dead-end de la
  MLS (single-entity) era solo de la MLS: New York Knicks (NBA) y New York Rangers (NHL) publican vía
  Madison Square Garden Sports Corp., y los Atlanta Braves (MLB) vía Atlanta Braves Holdings. Los
  filings son HTML con texto real, cero OCR.
- Manchester United entra por los dos canales a la vez (20-F en la SEC + Companies House) y es el
  único club inglés del lote que no hay que OCRear. Ingresos 2024/25 ya verificados contra el propio
  documento: £666,5 M (Commercial 333.274 + Broadcasting 172.977 + Matchday 160.263).
- Cifras de control ya leídas de los documentos, listas como tie-out: Bath £23,3 M, Surrey £60,3 M,
  Lancashire £64,0 M, Warwickshire £40,4 M, Yorkshire £18,9 M, MSG Sports USD 1.154 M, Braves
  USD 732,5 M.
- Documentación nueva: `fuentes/Inglaterra/` (18 fichas + notas generales con el procedimiento
  completo), `fuentes/Escocia/`, 3 fichas nuevas en `fuentes/Estados Unidos/`, secciones 9, 10 y 11
  del skill `club-sourcing`, y 4 decisiones de criterio abiertas en `dudas-por-club.md` (qué país es
  el de una escudería de F1, qué hacer con un documento que cubre dos clubes de dos deportes, si un
  equipo de F1 entra en el esquema club-temporada-liga).
- CONVENCIÓN, decidida por Guido: las carpetas siguen ordenadas por PAÍS y el deporte se declara
  adentro del archivo de cada club (regla 3 de `fuentes-por-club.md`). No se migró nada de lo
  existente.
- `.gitignore`: se agregaron `Clubes/**/*.htm` y `Clubes/**/*.html` para que los filings de la SEC
  (2-4 MB de HTML cada uno) queden locales igual que los PDF. El patrón está limitado a `Clubes/**`
  a propósito, porque `index.html` y `fuentes.html` viven en la raíz y sí son parte del sitio.

## Versión 137: el selector jerárquico de club, el cold start y la comparación entre clubes

- `data/leagues.js` nuevo: el CATÁLOGO de la taxonomía del selector (6 deportes, 6 regiones, 6
  países, 8 ligas con su escalón). NO tiene membresía a propósito. REGLA DE ARQUITECTURA: no existe
  ninguna arista club → liga sin año; la membresía vive solo en `data/club-leagues.js`, que gana 6
  helpers (`clubsOfLeagueYear` para todo agregado, `leaguesOfClub` para el árbol, y los de
  navegación y cobertura). `clubs{}` gana `sport`, que sí es intrínseco del club.
- `js/selector.js` nuevo: el selector jerárquico Deporte › Región › País › Liga › Equipo, con
  búsqueda insensible a acentos, recientes en localStorage, punto de calidad del dato por club, dos
  salidas visibles y Ctrl/Cmd+K. Reemplaza al `<select id="clubSelect">` y a `populateClubSelect()`,
  las dos borradas. En el árbol, un club aparece bajo cada liga en la que tiene un ejercicio.
- COLD START: el sitio ya no abre en Boca. Sin club elegido muestra una portada con buscador grande,
  los 8 clubes con más ejercicios y un chip por liga, con el nav y las secciones escondidos. El club
  elegido queda en localStorage y la visita siguiente entra por el mismo camino que un click en el
  selector. Se vuelve con "Ver la portada" arriba del panel. `data/boca-data.js` deja de cargarse
  eager (78 KB menos en la primera carga) y no queda ningún club por default en el código.
- `js/comparar-clubes.js` nuevo: comparación entre clubes distintos (no confundir con "Comparar
  Gestiones"). La unidad comparable es (club, ejercicio), así que cada barra lleva su año y el mismo
  club en dos años son dos sujetos. Un solo modelo cubre 1 vs 1, N clubes y club contra el promedio o
  la mediana de su liga; el modo se deduce de la lista. Unicidad del par, forzada en los 4 caminos.
  Tope de 4 rivales + el club activo.
- Vista de comparación: barras horizontales por indicador (escala por indicador), "Composición de
  ingresos" al 100%, y la tabla detrás de un toggle. Fuerza USD y Formato simplificado, y lo dice en
  pantalla. Muestra "sin dato" en vez de 0 cuando la fuente no informa deuda, masa salarial o socios.
  4 avisos: sesgo del benchmark, ejercicios de años distintos, divisiones distintas, y presupuesto
  contra balance (este cuarto salió de probar, no del plan).
- Bugs reales corregidos: `hidden` perdía contra `display:flex/grid` (la franja de recientes aparecía
  vacía); el botón del selector aplastaba el `nav` a 0px abajo de 900 y las 4 pestañas desaparecían
  (to-do 9, ahora el nav tiene su propia fila); el `alert()` de error de carga congelaba la página
  entera, timers y `onload` incluidos, así que un club guardado que fallara dejaba el sitio
  congelado en cada visita (reemplazado por un aviso dentro de la portada); el toggle de moneda
  mostraba "undefined" sin club; la grilla de indicadores desbordaba en un teléfono de 375px.
- `data/lang/en.js`: 95 claves nuevas. `tools/audit.js` ahora busca claves `t()` también en
  `js/selector.js` y `js/comparar-clubes.js`, que antes no miraba (el chequeo pasaba mientras el
  visitante leía castellano).
- Verificación: `auditAll()` 41 clubes, 222 checks, 0 que no cierran, 0 warnings de fx. `node
  tools/audit.js` 0 P0, 0 P1. Cada cifra de la comparación verificada contra `computeYearGeneric()`
  + `toDisplayValue()`.

## Versión 138: el estado y la to-do list salen de index.html, y se van los ejercicios placeholder

- `ESTADO.md` y `TODO.md` nuevos. Hasta acá el estado del proyecto, la lista de qué es real por club
  y la to-do list entera vivían en un comentario HTML de 830 líneas al principio de `index.html`:
  80 KB de los 183 KB del archivo, que además bajaba cada visitante en cada pageview. Pedido
  explícito de Guido ("Index NO es el archivo para tener to do. Eso era al inicio"). En `index.html`
  queda un puntero de 15 líneas y el archivo baja a 122 KB, fuera de la lista de archivos pesados de
  la auditoría.
- `tools/generate-club-index.js` ahora escribe la sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR
  CLUB" en `ESTADO.md` en vez de en `index.html`.
- TO-DO: se borraron 4 puntos por decisión de Guido en vez de marcarlos resueltos (buscar los
  ejercicios que faltan de Racing/River y de Boca, el toggle de Formato simplificado ya resuelto, y
  Mercado de Pases, fuera de alcance). La mitad que seguía abierta del viejo punto 0 (partir
  `CHANGELOG.md` y la narrativa) vuelve como punto 24. Los números pasan a ser identificadores
  estables, no prioridad: los puntos se citan entre ellos y desde los skills.
- SE BORRARON LOS 9 EJERCICIOS PLACEHOLDER que quedaban, 7 de Boca (2018, 2019, 2021, 2022, 2023,
  2024, 2026) y 2 de River (2021, 2025), junto con sus 2 entradas de `sources`. Cinco eran
  placeholder puro con rubros inventados; cuatro eran ejercicios reales sin publicar, cargados en
  cero. Todo ejercicio que muestra el sitio tiene ahora un documento detrás.
- Consecuencias: 85 ejercicios en vez de 94, 89 documentos en vez de 91, Boca pasa de calidad
  "mixta" a "oficial" en el selector, los gráficos de Inicio pierden las columnas vacías, y el
  `<select>` de Año de Boca queda con sus 2 ejercicios reales. `gestionesByClub` se ajustó: el rango
  de Riquelme arranca en 2025 y el de Brito es 2024; `ameal`, `angelici` y `donofrio` se quedan sin
  ejercicio pero siguen declaradas, porque Mercado de Pases y Resultados agrupan por gestión.
- Verificación: `auditAll()` 41 clubes, 222 checks, 0 que no cierran, 0 warnings de fx (los mismos
  222: ningún ejercicio borrado tenía total oficial contra qué cerrar). `node tools/audit.js` 0 P0,
  0 P1.

## Versión 139: la traducción al inglés queda completa, `fuentes.html` incluida

- Los 3 cards de torneo del presupuesto de Boca 2026/27 (Copa Libertadores, Campeonato Liga
  Profesional, Copa Argentina) eran el último HTML del sitio sin `data-i18n`. Ahora su chrome se
  traduce; los rubros de sus tablas ("Premios Grupales", "Remuneraciones BICA, S.A.C.", "Policía
  Adicional") NO, porque salen textuales del presupuesto.
- `fuentes.html` se traduce sola. Carga `js/i18n.js` y el mismo diccionario que el sitio, y respeta
  el idioma que el visitante ya eligió. Se descartó generar un `fuentes-en.html` aparte: dos
  archivos por idioma se multiplican por cada idioma nuevo, y esta página además va a tener que
  partirse por país arriba de ~300 documentos (to-do 22c). Se traducen el chrome, el tipo y el nivel
  de cada fuente, y la procedencia de cada tipo de cambio (etiquetas nuestras); el título de cada
  documento queda en su idioma original.
- El generador de `fuentes.html` lee el `ASSET_V` de `index.html` en vez de tener el suyo, para que
  las dos páginas no puedan pedir versiones distintas del mismo `js/i18n.js`.
- REGLA NUEVA en `CONVENCIONES.md`, que cierra la decisión que el to-do 19(c) dejaba abierta: se
  traduce el chrome y toda etiqueta nuestra; no se traduce nada que salga textual de un documento ni
  ningún nombre propio (club, liga, y los nombres de gestión, que son apellidos de presidentes).
- 30 claves nuevas en `data/lang/en.js`. Cobertura: 204 de 204 claves usadas, y 28 de 28 en
  `fuentes.html`. To-do 19 borrado.

## Versión 140: la home dejó de publicar el presupuesto como si fuera el último balance

- INICIO mostraba, para Boca, "Último resultado: +2,0 M USD" y "Deuda neta actual: 0,0 M USD". Los
  dos salían del PRESUPUESTO 2026/27, porque `renderInicioStats()` usaba "el último ejercicio de la
  gestión actual" como sinónimo de "el estado actual del club". El de deuda era el peor: un
  presupuesto proyecta ingresos y egresos, no un balance, y escribe deuda y caja en cero, así que la
  home decía que Boca no debe nada. Ahora cada stat pide el último ejercicio QUE TENGA SU DATO (el
  último balance para el resultado, el último que informe deuda para la deuda), y escribe cuál es
  abajo del número en vez de esconderlo en un tooltip. Boca pasó a mostrar +29,6 M USD y 26,6 M USD,
  los dos del Balance 2024/25. Verificado en los 41 clubes, ninguno con NaN ni "undefined".
- RIVER 2024: sus 8 líneas de gasto estaban las 8 en `other_expenses` (80% en el catch-all,
  "Salarios y primas" en $0). Su Anexo VIII desglosa por DESTINO y no por naturaleza, así que se
  mapeó cada destino al bucket que ya existe, siguiendo línea por línea el precedente de Boca 2025.
  El catch-all quedó en 0% y el 53% que la fuente no desglosa está en la fila "Fútbol profesional
  (sin desglosar por la fuente)". Ni un peso se movió: el total sigue cerrando exacto.
- TIPOS DE CAMBIO: `FX_SOURCE` gana `document_average`, el caso que faltaba (un balance convierte su
  estado de resultados a un promedio del período y su balance al cierre; sin esta categoría habría
  que etiquetarlo `document_close`, que sería falso).
- UNIÓN: sus 4 tipos de cambio estaban marcados `market_close` y los 4 salen del Anexo V de su
  propio balance. Pasaron a `document_close`. El hallazgo "Unión 2024 usa 890,50 cuando la tabla dice
  909" era real pero mal diagnosticado: un Anexo de moneda extranjera valúa activos al comprador y
  pasivos al vendedor, así que los dos son el mismo día y los dos están bien. `fx-mercado-discrepante`
  quedó en 0 y `fx-mercado-fuera-de-tabla` bajó de 8 a 5.
- `tools/audit.js`: los umbrales de tamaño de archivo pasan a depender de CÓMO se lee cada uno. Los
  que se leen enteros (`index.html`, `ESTADO.md`, `TODO.md`) quedan apretados; `CHANGELOG.md` y
  `finance-of-sports-project.md` son de consulta puntual (se entra con grep, se lee un bloque) y su
  umbral sube. El to-do de partirlos se borró: partirlos tendría un costo real (hoy "dónde está la
  historia" tiene una respuesta de una palabra) y no resolvería ningún problema que exista.
- Auditoría: 0 P0, 0 P1, 51 P2 (eran 54), 8 P3 (eran 12). `auditAll()` 222 checks, 0 que no cierran.

## Versión 141: lo que la fuente no desglosa ahora lo dice, en vez de disfrazarse de otra cosa

- JAPÓN: se salió a buscar si el desglose de ingresos por club existe en algún lado (pedido de
  Guido). No existe, y quedó verificado con 3 evidencias independientes: la tabla por club del
  propio disclosure (exactamente 3 filas: total, sponsors, entradas), la "Ｊリーグ クラブ経営ガイド
  2025" (documento oficial distinto, que sí tiene las 8 categorías pero solo como promedio de J1/J2/
  J3), y el portal de terceros, que solo muestra el total por club. Anotado en
  `fuentes/Japón/_notas-generales.md`, incluida la advertencia sobre notas de análisis japonesas que
  circulan con un desglose de 4 líneas cuya cifra de 物販 no está en ninguna edición del documento.
- Los 10 clubes japoneses pasaron su línea residual de `other_income` a
  `lump_football_operations`: el número es el mismo, pero la fila dice "Fútbol profesional (sin
  desglosar por la fuente)" en vez de "Otras secciones deportivas y otros ingresos", que sugería que
  sabíamos qué era esa plata.
- `catchall-dominante` bajó de 11 a 3 (quedan instituto 2024 y velez 2016/2017, cuyos documentos sí
  podrían tener más detalle). P2 total: 44, eran 54 al empezar el día.
- `auditAll()`: 41 clubes, 222 checks, 0 que no cierran. Ningún total se movió.

## Versión 142: la to-do list pasó de 18 puntos a 8, y Japón pasó de tarea a pregunta

- Sacados de `TODO.md` por decisión de Guido, con el motivo escrito en el propio archivo para que
  quede el registro: los 6 puntos de sourcing y onboarding por país (eran 12 a 18 — Argentina,
  Ecuador, Marruecos, Club América, Brasil, España, Colombia), que son trabajo normal del proyecto y
  no una lista de pendientes; y el corte free/paid y el paywall (eran 5 y 6).
- DECISIÓN: el sitio va **todo gratis por ahora**. `ESTADO.md` lo dice, se borró el CSS muerto de
  `.premium-cta` (2 reglas que ya no usaba ningún markup), y queda anotado que "Mi Cuenta" es lo
  único que todavía le anuncia al visitante un plan pago.
- JAPÓN: la pregunta que quedó abierta tras la Versión 141 se anotó en `dudas-por-club.md`, en dos
  mitades — a la liga (¿existe el desglose por club del lado de la J.League, que es quien arma los
  promedios divisionales, y hay algún corte de GASTOS por club?) y a cada club (¿publican su propio
  決算公告 / 事業報告 completo?), cada una con su canal de contacto verificado.
- Cerrados también 7 (dominio y repo: ya estaba hecho, el repo se llama `guidomamone/finance-of-sports`
  y los push llegan) y 10 (los 3 cards de presupuesto en un tab propio: era un "evaluar si vale la
  pena", y no vale). Lo único del 7 que no había que perder — que la línea `finance-of-sports/` del
  `.gitignore` del sitio profesional es lo que mantiene separados los dos repos anidados — se movió
  a `CLAUDE.md`, que se lee en cada sesión.
- Anotados 3 hallazgos nuevos que salieron de PROBAR el punto 9 en un teléfono, ninguno en ninguna
  lista antes (25, 26, 27): el KPI "Deuda neta" de Finanzas publica 0,0 en un ejercicio de
  presupuesto mientras el aviso de abajo dice que ese 0 no es una deuda de cero (el mismo bug que
  la 140 arregló en Inicio, en la otra pestaña); `.header-right` desborda a 375px y deja el botón
  de idioma fuera de la pantalla, regresión del selector de la 137; y `debtDisclosureNote()` no
  pasa por `t()`, así que su aviso sale en castellano con el sitio en inglés.
- El punto 9 quedó anotado con su medición: ya no se reproduce (ningún elemento de `#finanzas`
  excede los 375px), pero se deja abierto hasta que Guido lo mire.
- Nada de esto mueve un número: `auditAll()` sigue en 41 clubes, 222 checks, 0 que no cierran.

> **ESTAS 17 ENTRADAS NO SON VERSIONES DEL SITIO.** Son los pasos del prototipado del selector
> (2026-09-14 al 15), que se hizo en `Prototyping/` sin tocar el sitio en producción: cuatro
> prototipos distintos de la pantalla de elegir club, de los que ganó el 4. Estaban numeradas
> "Versión 143" a "Versión 159", los MISMOS números que después usó la serie real del merge a
> producción, que arranca más abajo con "Versión 143: Finanzas abre con el selector". Renumeradas
> el 2026-09-20 (to-do 36, decisión de Guido) porque citar "la Versión 158" era ambiguo y porque
> dos sesiones distintas llegaron a elegir el número 158 el mismo día buscando el más alto del
> archivo. La serie vigente del proyecto nunca se tocó: sigue siendo consecutiva y es la única que
> numera versiones del sitio. Por qué los prototipos no la merecían: ningún archivo de producción
> cambió en estos 17 pasos, y los 4 prototipos se borraron al terminar el merge (ver
> `Prototyping/README.md`, que conserva por qué perdieron el 1, el 2 y el 3).

## Prototipo del selector — paso 1: prototipo de un Inicio en frío donde el selector ES la portada

- NUEVO `prototipo-inicio-selector.html` (no se deploya, no lo linkea ninguna página): la primera
  visita, en vez del card con buscador chico, abre con el **selector jerárquico desplegado en la
  portada**, con copy antes (qué es el sitio) y después (qué pasa cuando elegís + los 8 clubes de
  acceso rápido + el conteo). Pedido de Guido.
- El selector se puede **minimizar**: colapsa a una línea con el buscador de hoy y recuerda el
  estado en `localStorage` (`fos_proto_selector_min`). Buscar desde ahí lo vuelve a abrir, porque
  los resultados se dibujan adentro del panel.
- El panel NO se duplica: es el mismo `#clubPanel`, que el prototipo MUDA adentro de la portada
  mientras no hay club elegido y devuelve al `<body>` (modal de siempre) apenas hay uno. La mudanza
  la dispara un `MutationObserver` sobre el `hidden` de `#coldHero`, así el prototipo no parchea
  `applyClubMode()` ni `js/selector.js`.
- En frío se esconde el botón de club del header: repetía la misma acción a 2 cm del selector, y
  "Cambiar" sin club elegido no significa nada. Vuelve con el club.
- NUEVO `tools/build-prototipo-inicio.js`: genera el prototipo desde `index.html` (falla si un
  ancla no está, en vez de escribir un archivo a medias). El prototipo anterior era un mock con
  taxonomía embebida y números inventados; este corre con los 41 clubes y el motor reales, porque
  lo único nuevo a decidir es el layout.
- Nada del sitio cambió: `index.html` intacto, `node tools/audit.js` igual (0 P0, 0 P1).

## Prototipo del selector — paso 2: el prototipo de portada suma el ejercicio al selector

- En la columna EQUIPO cada club trae ahora un `<select>` con sus ejercicios, del más reciente al
  más viejo ("Presupuesto 2026/2027", "Balance 2024/2025", y año suelto para los clubes de
  ejercicio calendario: el label sale de `ejercicioLabel()`, no de un formato nuevo). Elegir uno
  carga el club Y cae en su ficha de Finanzas de ESE ejercicio, reusando `goToFinanzasYear()`.
  Pedido de Guido. Clickear la fila sigue llevando al club entero, sin tocar el dropdown.
- Anda igual en el árbol y en los resultados de búsqueda (las dos ramas dibujan la misma
  `clubRow()`), y en el panel embebido de la portada igual que en el modal del header.
- NUEVO `prototipo-inicio-ejercicios.js` (generado): por club, la lista de `[año, reportType]`.
  Es lo que hoy le falta a `data/club-index.js` — que trae el CONTEO de ejercicios y el último,
  no la lista — para que el panel pueda ofrecer el ejercicio sin bajar el `data/<club>-data.js`
  de cada club (41 clubes en pantalla, 0 archivos de datos bajados, y eso no se negocia).
- NUEVO `prototipo-inicio-selector.js` (generado): copia PARCHEADA de `js/selector.js` con los 3
  cambios que esto necesita (la fila pasa sus ejercicios, `pick()` acepta un año, `mkRow()` dibuja
  el select). El diff contra `js/selector.js` ES la propuesta de implementación.
- En móvil el dropdown baja a su propio renglón: al lado del nombre le comía 128px de 312px y
  partía el nombre del club ("Argentinos Juni…", medido a 390px).
- `js/selector.js` y el resto del sitio siguen intactos; `node tools/audit.js` sin cambios.

## Prototipo del selector — paso 3: 5 correcciones al prototipo de portada, una de ellas es un bug del sitio

- BUG DEL SITIO PUBLICADO, encontrado por Guido probando el prototipo: al elegir una REGIÓN, la
  columna Liga seguía listando las ligas de todos los países, así que después de cambiar de región
  quedaban a la vista las ligas de la anterior. La selección sí se limpiaba (`sel.league = null`);
  lo que no se filtraba era la lista. Arreglado en la copia del prototipo; `js/selector.js` sigue
  con el bug hasta que se decida el resto (to-do 28).
- La fila de club suma dos botones con texto, **Ver** y **Ver y elegir otro**. El segundo muestra
  el club pero NO cierra el panel y lo deja en modo comparar, así el siguiente que toques se suma
  en vez de reemplazar (pedido de Guido: "permanecer en el selector y elegir un segundo equipo,
  liga, etc"). Reemplazan al "+" de la fila de club: el mismo camino que antes había que descubrir.
  El primer club tiene que pasar a ser el activo porque el modelo de comparación lo tiene como
  sujeto 0; del segundo en adelante entran como rivales.
- El dropdown de ejercicio y los dos botones van en un segundo renglón de la fila, alineados bajo
  el nombre: los 3 controles en línea le dejaban ~110px al nombre del club y lo partían. El panel
  embebido pasó de 520 a 620px de alto para compensar filas más altas.
- COPY: la bajada de la portada pierde "y mercado de pases" (el sitio todavía no lo tiene cargado)
  y deja de cortarse a los 600px, que le metía un salto de línea en la mitad de la frase con medio
  card vacío al lado. Los ejemplos del buscador van con mayúscula ("Boca", "LaLiga", "Japón"): la
  búsqueda ignora mayúsculas y acentos, así que escribirlos bien no le cuesta nada al que busca.
  Los dos cambios tienen su gemelo pendiente en `data/lang/en.js` (`hero.sub`, `selector.search.ph`).
- "O empezá por uno de estos" pasó de 8 clubes a 3.

## Prototipo del selector — paso 4: el índice liviano ahora lista los ejercicios, y la portada se queda en la página

CAMBIO REAL DEL SITIO (lo único de esta sesión que sale del prototipo):

- `data/club-index.js` gana `yrs`: la LISTA de ejercicios de cada club con su reportType, del más
  reciente al más viejo, además del conteo (`y`) que ya tenía. Lo genera
  `tools/generate-club-index.js` desde los mismos `fiscalYearMeta`, así que no se puede
  desincronizar. Es lo que le faltaba al selector para poder ofrecer un ejercicio puntual
  ("Balance 2024/2025") sin bajar los 41 `data/<club>-data.js`. El archivo pasó de 4,4 a 7 KB;
  se guarda el reportType completo y no un código de una letra porque son 7 strings repetidos
  miles de veces, o sea justo lo que gzip aplasta, y un código propio costaría una tabla de
  traducción para ahorrar bytes que el transporte ya ahorra.
- `ASSET_V` a 142, en la constante y en los 13 tags (`data/club-index.js` cambió y sin esto un
  visitante que ya entró se queda con el viejo cacheado).
- `auditAll()`: 41 clubes, 222 checks, 0 que no cierran, 0 warnings. Ningún número se movió.

PROTOTIPO (`prototipo-inicio-selector.html`), 7 pedidos de Guido:

- EL SELECTOR SE QUEDA EN LA PÁGINA con el club ya elegido, encima de sus datos, y ahí sí se
  minimiza (bar de 53px). Antes desaparecía al elegir y había que ir al header para cambiar de
  club. La portada dejó de ser una pantalla aparte: es el mismo bloque en dos modos, y eso lo
  decide `applyClubMode()`, que ya era la única función que decidía portada vs. club.
- El botón Minimizar se fue de la portada en frío: ahí abajo no hay nada que descubrir.
- Las pestañas del header se ven desde la primera visita, apagadas e inertes hasta que haya club.
- La fila de club quedó en UNA línea (43px, eran 70): se fue el subtítulo "N ejercicios · Liga"
  (los ejercicios están en el dropdown de la misma fila; la liga es la columna de al lado) y los
  dos botones se juntaron con el dropdown de ejercicio en un solo control, "Ver", con las
  opciones agrupadas. Los resultados de búsqueda SÍ conservan el subtítulo: ahí no hay columnas
  que den ese contexto.
- Los 3 clubes de acceso rápido se mudaron al lado derecho del buscador, que ocupaba todo el
  ancho con la mitad vacía.
- Se fueron los dos copys que sobraban: el "Elegí tu club / Escribí el nombre..." de arriba del
  selector y el párrafo de abajo.
- Y se esconde "Ver la portada con todos los clubes": la portada ya no es otra pantalla.

## Prototipo del selector — paso 5: el prototipo se puede volver a la primera visita

- Botón "Volver a la primera visita" en la franja roja del prototipo (pedido de Guido). Borra las
  4 claves que el sitio guarda en el navegador — el club elegido, los recientes, el cartelito del
  selector y el estado minimizado — y recarga arriba de todo, con `history.scrollRestoration` en
  manual para que no vuelva al scroll anterior. El idioma NO se toca: resetearlo mandaría la
  página a inglés según el navegador, y lo que se prueba acá es el selector.
- Vive en la franja del prototipo y no en el sitio a propósito: no es una feature, es el banco de
  pruebas. El sitio no tiene backend, así que "primera visita" son exactamente esas claves.

## Prototipo del selector — paso 6: un segundo prototipo de selector, de a un paso por vez

- NUEVO `prototipo-pasos.html` + `prototipo-pasos-selector.js` + `tools/build-prototipo-pasos.js`.
  El prototipo 1 (`prototipo-inicio-*`) queda intacto: son dos visualizaciones para comparar, no
  una encima de la otra.
- QUÉ CAMBIA (Guido: "siento que con el actual le estamos poniendo una cantidad de información
  impresionante al usuario ni bien se loguea"). El panel de columnas muestra a la vez 6 deportes,
  6 regiones, 6 países, 8 ligas y 41 clubes: ~67 opciones y 5 decisiones simultáneas. Acá se elige
  de a una: un card por paso (Deporte › Región › País › Liga › Club), apilados, el siguiente se
  abre cuando el anterior se resolvió y el resuelto se encoge a una línea con lo elegido y un
  "Cambiar". Un 6to card, opcional, elige el ejercicio.
- Como los cards van apilados, la misma pantalla entra en un teléfono SIN una sola regla de media
  query: verificado a 390px, sin scroll horizontal.
- FUERA, a pedido de Guido: el punto de color de calidad del dato y su leyenda (Balance oficial /
  Parcial / Placeholder / Sin datos).
- "Cambiar" en un paso borra ESE y todos los de abajo, así que el bug de la to-do 29 (la liga de
  la región anterior seguía a la vista) no puede existir acá: el estado es el CAMINO, no una
  selección suelta por columna.
- Se mantiene lo que el prototipo 1 dejó aprobado: el selector vive en la página y se queda
  (plegado a una línea) con el club ya elegido, las pestañas se ven desde la primera visita, y hay
  un buscador de una línea como atajo para quien ya sabe qué club quiere.
- El selector nuevo NO es un parche de `js/selector.js`: es otro componente, con la MISMA API
  pública (init/open/close/refresh/renderButton/goHome/savedClub), así `index.html` y
  `js/comparar-clubes.js` no se enteran de cuál está cargado.
- Apoyado en dos libros de `Business Books/`: la segunda ley de Krug (`dont_make_me_think.md`) —
  muchos clicks obvios le ganan a uno que obliga a pensar — y la divulgación progresiva de
  Higgins (`better_onboarding.md`).

## Prototipo del selector — paso 7: el prototipo 2 pasa a multi-selección, todo paso se puede ignorar, y comparar deja de ser opcional

Cuatro reglas nuevas de Guido, todas dentro de `prototipo-pasos.html` (el sitio no se tocó):

- **Todo paso se puede ignorar**, con un botón que dice **"Elegir más tarde"**. Es lo mismo que un
  "ver todos" pero dicho como lo piensa el visitante: no es que quiera ver todo, es que todavía no
  quiere decidir eso. Consecuencia directa: el paso del ejercicio dejó de estar marcado como
  "opcional", porque ahora lo son los seis y marcar uno solo decía algo falso de los otros cinco.
- **Cada paso es multi-selección**, con casilla en vez de botón: "Argentina y Brasil" es una
  respuesta tan válida como "Argentina". Por eso cada paso necesita un "Continuar" explícito (que
  además dice cuántos llevás elegidos): con casillas, el primer click ya no puede avanzar solo sin
  romper la posibilidad de marcar una segunda.
- **Si ignora todo, elegimos nosotros y se lo decimos**: "No elegiste nada, así que elegimos por
  vos: Boca Juniors contra River Plate", y la comparación queda cargada abajo. Si un filtro
  anterior deja afuera a alguno de los dos, la regla se generaliza sola a los dos clubes con más
  ejercicios de lo que quedó.
- **Un club solo no es el destino**: "la gracia de todo esto es comparar, no analizar un club en
  solitario" (Guido). Cuando la selección termina con uno, el card final no felicita a nadie:
  explica por qué un número solo no dice nada y ofrece 3 rivales de su propia liga a un click. El
  mismo club en 2 ejercicios también cuenta como comparación, y ahí el card no insiste.
- Los ejercicios elegidos se aplican sobre los chips de la bandeja (`.chip-year`), que es el
  control que ya sabe qué años son válidos para cada sujeto. Se reintenta 4 veces porque ese
  redibujo es asíncrono y pisaba el primer intento (el segundo chip se quedaba con el año
  automático).
- `Business Books/` agregado al `.gitignore`: este repo es público y deploya a Netlify, así que
  commitear esos resúmenes los publicaría en internet.

## Prototipo del selector — paso 8: grupos en el prototipo 2 — sumar clubes y ligas y medirlos contra otro grupo

Tres pedidos de Guido, todos dentro de `prototipo-pasos.html` (el sitio no se tocó):

- **"Elegir todos" en el paso del club**, que arma un grupo entero (una liga, un país, o lo que
  hayas filtrado) en un click en vez de tildar 11 casillas.
- **LADOS (grupos)**: la selección terminada se guarda como un lado, y el card final ofrece
  "Comparar contra otro grupo", que reinicia los pasos manteniendo lo ya armado. La barra de arriba
  muestra `A: Primera División (11) · B: LaLiga (10)`. Es la funcionalidad que faltaba: hasta acá
  `js/comparar-clubes.js` compara SUJETOS sueltos (hasta 5) y su "promedio de liga" es un promedio,
  no un total; un lado SUMA. Probado con el ejemplo de Guido: Primera División contra LaLiga.
- El corte entre las dos vistas no es un gusto: hasta 5 clubes se usa la comparación que el sitio
  ya tiene (una barra por club), que es el MAX de sujetos de `comparar-clubes`; de ahí para arriba
  el grupo se suma y se muestra como un lado.
- **El paso del ejercicio dejó de ser confuso** (Guido: "el usuario no tiene claro de quién es cada
  ejercicio"). Con UN club se listan SUS ejercicios con la etiqueta real ("Balance 2024/2025"); con
  varios, un ejercicio no es de nadie en particular, así que se listan los AÑOS DE CIERRE
  ("Cierre 2025") y cada uno dice a cuántos de los clubes elegidos les corresponde. El texto de
  ayuda explica por qué el año es el del cierre y que sin elegir nada se usa el más reciente de
  cada uno.
- LAS 3 REGLAS DE HONESTIDAD DEL TOTAL DE UN GRUPO, que es lo que hace que la vista sirva: un club
  sin el ejercicio pedido queda AFUERA del total y se cuenta aparte (no suma cero); un indicador que
  la fuente no informa se cuenta aparte ("8 de 11 lo informan"); y los números salen de
  `computeYearGeneric()` + `toDisplayValue()`, el motor real, sumando lo que ya calculó club por
  club. Además el card avisa cuando los ejercicios sumados abarcan más de 2 años y cuántos de ellos
  son presupuestos (proyecciones) y no balances.
- BUG DE TOOLING corregido en los DOS generadores: los `<script>` de los prototipos no llevaban
  `?v=`, así que el navegador servía el JS viejo de su caché con el HTML nuevo y se depuraba un bug
  ya arreglado (la trampa que documenta `CLAUDE.md`). Ahora llevan la fecha de modificación.

## Prototipo del selector — paso 9: el paso 7 del prototipo 2 — contra qué comparar, y la página que dejó de moverse sola

Tres pedidos de Guido, todos dentro de `prototipo-pasos.html`:

- COPY COHERENTE: los seis títulos pasan a la misma forma plural — "Elegí uno o más deportes",
  "una o más regiones", "uno o más países", "una o más ligas", "uno o más clubes", "uno o más
  ejercicios". Antes decían "Elegí el deporte" y la casilla ya permitía varios: el título mentía.
- PASO 7, "Elegí contra qué comparar". Es el paso que faltaba, y resuelve dos cosas de una. La
  primera: al terminar el paso 6 la página cargaba el club y BAJABA sola hasta los números, con lo
  cual el selector se iba de la pantalla justo cuando el visitante todavía no había decidido lo más
  importante. Ahora la página NO se mueve sola nunca — bajar es un botón ("Ver los números ↓").
  La segunda: comparar contra otro ejercicio DEL MISMO CLUB estaba escondido en la bandeja, y ahora
  es la primera opción del paso, con la etiqueta real de cada ejercicio.
- Las opciones del paso 7, según lo que haya elegido: los otros ejercicios del mismo club, el
  promedio de su liga (que el motor ya sabía calcular pero nadie encontraba), y 3 rivales de su
  misma liga. El pie es la decisión explícita que pidió Guido: "Continuar solo con lo que elegí" o
  "Comparar con eso", más "Compararlo contra un grupo entero (una liga, un país…)", que cierra este
  lado y arranca el rival con los mismos 7 pasos.
- El orden de los sujetos ahora respeta lo elegido: si el paso 6 se saltea, el club conserva SU
  ejercicio por default y el del paso 7 entra como segundo sujeto (Boca 2026/27 contra Boca
  2024/25). `null` en la lista de años significa "no toques el de este", que no es lo mismo que
  "el más reciente".
- BUG ENCONTRADO Y CORREGIDO EN EL CAMINO: el botón "+ Otro año" del sitio se clickeaba solo si no
  estaba `hidden`, y ese botón vive en un card que aparece recién cuando el club ya está dibujado.
  Resultado: la comparación contra otro ejercicio se perdía en silencio. `hidden` no impide que el
  listener corra, así que ahora se clickea igual.

## Prototipo del selector — paso 10: datos inventados para el prototipo 2, encerrados con llave

- NUEVO `prototipo-pasos-datos-inventados.js`: rellena los ejercicios 2016-2025 de los 18 clubes de
  ARGENTINA y BRASIL que hay cargados, con ascensos y descensos inventados entre primera y segunda
  división. Pedido de Guido: "estoy queriendo probar cosas y el tener datos incompletos me limita
  la creatividad". Hoy 10 de los 18 clubes cambian de categoría en esos 10 años.
- LOS EJERCICIOS REALES NO SE PISAN: solo se rellenan los huecos. Boca pasa de 2 ejercicios a 11, y
  los 2 reales siguen siendo los reales.
- LAS 5 CONDICIONES QUE LO CONTIENEN, ahora regla permanente en `CONVENCIONES.md`: no vive en
  `data/`; lo carga una sola página no linkeada; ninguna herramienta lo ve (`tools/audit.js` y
  `auditAll()` leen `data/*.js`); cada ejercicio inventado se declara (meta `inventado:true`,
  fuente `type:'placeholder'` — que hace que el PROPIO sitio muestre su aviso "número inventado,
  no es real" adentro de Finanzas —, rubros terminados en "(inventado)" y "· INVENTADO" al lado
  del año en todo el selector); y no se copia a `data/` nunca. La franja del prototipo pasó de
  verde a ROJA, para que ninguna captura se confunda con el sitio.
- Los números son deterministas (misma semilla por club-año): si cambiaran en cada recarga, nada de
  lo que se pruebe con ellos sería repetible. La única regla de negocio que tienen es que un año en
  segunda división factura ~55% menos, que es lo que hace que el ascenso se NOTE en el gráfico.
- To-do 30 nuevo: borrar todo esto el día que se decida el selector.
- DOS PROBLEMAS DE ORDEN DE CARGA resueltos en el camino, los dos del mismo tipo: `loadClubData()`
  lo define el `<script>` principal de `index.html`, que corre DESPUÉS de los `<script src>`, así
  que encender el relleno temprano instalaba el wrapper sobre un `undefined`; y el club guardado de
  la visita anterior se dibuja en ese mismo INIT, o sea antes de que existan los ejercicios
  inventados, así que hay que volver a elegirlo. Además `finanzasYears` (la lista blanca opcional
  que usa Boca) hacía que los ejercicios aparecieran en el selector y no adentro de Finanzas.
- El sitio no se tocó: `index.html`, `js/` y `data/` intactos, `node tools/audit.js` en 0 P0, 0 P1.

## Prototipo del selector — paso 11: el paso 7 se agrupa por tipo de rival, y el paso 5 deja de decidir por vos

Seis correcciones de Guido probando el flujo, todas en `prototipo-pasos.html`:

- **"Deseleccionar todos"** en CUALQUIER paso que tenga algo marcado (destildar de a uno cuando
  marcaste once era un castigo). "Elegir todos" sigue solo donde significa algo: el paso del club.
- **El paso 5 ya no decide por el visitante.** Con 2 o más clubes marcados, dos botones que nombran
  las dos cosas distintas que puede querer: "Comparar entre los N seleccionados" (uno al lado del
  otro) o "Armar un grupo con los N" (sumados, como un lado). Antes lo decidía el sistema por la
  cantidad —hasta 5 sueltos, de 6 para arriba sumados— y se enteraba después.
- **EL MODELO DE "LADO" CAMBIÓ**: era una lista de clubes con un año; ahora es una lista de pares
  (club, ejercicio) con un modo, `suma` o `promedio`. Con clubes sueltos no entraba el escenario que
  pidió Guido: "Boca 24/25 contra el promedio de sus últimos 10 años" es un lado de UN club y DIEZ
  ejercicios. Con pares, una liga entera, un club en diez años y un club solo son el mismo objeto.
- **El paso 7 pasó de una grilla plana a un menú por TIPO de rival**, cada uno desplegable y de
  selección múltiple: "Otro balance de X", "Un presupuesto de X", "Promedio de…", "Sumatoria de…",
  "Otro club". Mezclados en una grilla, "Balance 2023/24" y "el promedio de sus últimos 10" parecían
  la misma clase de cosa. El promedio y la suma se dibujan en el card de grupos, porque son
  conjuntos y el comparador del sitio compara club-ejercicios.
- **El promedio divide por los ejercicios que INFORMAN cada indicador**, no por el total de la
  lista: promediar 8 deudas entre 11 sujetos sería inventar tres ceros que nadie publicó.
- **COPY**: los botones del paso 7 dicen el nombre de lo que hacen ("Comparar Boca Juniors contra lo
  marcado acá (2)" / "Ver Boca Juniors sin comparar"). Antes decían "Comparar con eso" y "Continuar
  solo con lo que elegí", y Guido no podía saber qué era "eso" ni cuál de los dos era su selección.
- **DOS SALTOS QUE NO CORRESPONDÍAN**: al comparar, la página saltaba al tope y a la pestaña
  Finanzas. Los dos salían de `goToFinanzasYear()`, que hace tres cosas a la vez (pone el año, va a
  Finanzas, sube al tope). Ahora se llama SOLO cuando el pedido es ver la ficha de un ejercicio
  (un club, un año, nada contra qué compararlo); para todo lo demás se toca el `<select>` del año,
  que es lo único que la comparación necesita.
- BUG PROPIO ENCONTRADO Y CORREGIDO: `ladosVs` se usaba tres líneas antes de declararse, así que
  `var` lo dejaba en `undefined` y la comparación contra un promedio no llegaba a dibujarse nunca.
  Y `comoGrupo` se preguntaba DESPUÉS de meter el lado en la lista, con lo cual siempre daba true.

## Prototipo del selector — paso 12: los prototipos se mudan a `Prototyping/`, y nace el tercero (dos columnas, A contra B)

- **TODO LO DE PROTOTIPOS VIVE AHORA EN `Prototyping/`**, con su propio `README.md` (pedido de
  Guido: "no mezclemos nada con los archivos que están en producción"). Se movieron los 5 archivos
  de los prototipos 1 y 2 y sus 2 generadores, que estaban en la raíz y en `tools/`. `tools/` queda
  solo con las herramientas del sitio.
  Cada `.html` generado lleva ahora `<base href="../">`: el sitio se sirve desde la raíz, y esa
  línea hace que TODA ruta relativa siga resolviendo bien, incluidas las que arma el JS en tiempo
  de ejecución (`loadClubData()`, `I18N.load()`), que reescribir a mano era imposible.
- **NUEVO PROTOTIPO 3: `prototipo-duelo.html`** — dos columnas, Equipo A contra Equipo B, con un
  toggle arriba ("quiero comparar dos" / "solo quiero ver uno"). Cada columna puede ser un club o
  una liga entera, y una liga se mide por promedio por club o por total. Los prototipos 1 y 2
  quedan congelados: son tres formas de resolver la misma pantalla, para compararlas.
  POR QUÉ: en el de pasos, comparar obligaba a pasar por el selector dos veces, y eso generaba
  casuística que nadie quería contestar (¿el paso 7 vuelve a aparecer?, ¿en qué momento se cierra
  un lado?). Con las dos columnas a la vista, comparar deja de ser un estado en el que entrás y
  salís: es la pantalla. Y el toggle es la otra mitad: la mayoría quiere UN club y no tiene por qué
  pagar una pantalla partida al medio.
  De paso resuelve el escenario que el prototipo 2 no podía: un club contra el promedio de una liga
  AJENA (Boca contra el promedio de la Série A), porque cada columna se elige por separado.
- BUG REPORTADO POR GUIDO Y ARREGLADO en el prototipo 2 (lo único que se le tocó): "un club contra
  su pasado y no me aparecen los números". Causa: "+ Otro año" elige el ejercicio libre más nuevo,
  y como el club activo todavía estaba en su año por default, elegía justo el que el visitante
  había pedido como principal; al mover el año del activo DESPUÉS, los dos sujetos quedaban en el
  mismo ejercicio y `onActiveChanged()` descartaba el duplicado: la bandeja quedaba vacía. Ahora el
  año del activo se mueve ANTES de sumar ningún rival. Y el card de totales dejó de aparecer en una
  comparación normal, donde competía con el resultado de verdad.
- BUG en los datos inventados: `window.clubs` (que es `undefined`, porque `clubs` es un `const` de
  su archivo y no una propiedad de window) rompía `clubsOfLeague()`. Es la MISMA trampa que ya está
  documentada dos veces en este repo; costó media hora otra vez.
- Se registra la borrada de `prototipo-selector.html` y `PROMPT-selector-jerarquico.md` (el mock y
  el prompt con los que se diseñó el selector en la Versión 137). Los borró Guido y estaban sin
  commitear desde entonces; lo que decidieron ya está construido en `js/selector.js`, y las dos
  referencias que quedaban apuntando a ellos en `TODO.md` se corrigieron.

## Prototipo del selector — paso 13: el árbol vuelve al prototipo 3, adentro de las dos columnas

- **VUELVE LA NAVEGACIÓN POR DEPORTE › REGIÓN › PAÍS › LIGA › EQUIPO** al prototipo 3
  (`Prototyping/prototipo-duelo-selector.js`), pedido de Guido: "en el prototipo 3 se perdió lo de
  buscar por deporte, región, etc. Traelo de nuevo pero manteniendo las dos columnas". La primera
  versión lo había cambiado por dos pestañas planas (Clubes / Ligas enteras) con una lista
  alfabética de 41 filas, que no dice nada de la forma de los datos hasta leerla entera.
- **CÓMO ENTRA UN ÁRBOL DE 5 NIVELES EN MEDIA PANTALLA**: no al lado, abajo. Las 5 columnas de
  `js/selector.js` se vuelven UN nivel por vez, con breadcrumb clickeable arriba haciendo el
  trabajo que allá hacían las columnas de la izquierda. Cada columna tiene su propio árbol y su
  propio breadcrumb. El buscador queda por ENCIMA del árbol y sigue siendo transversal (escribir
  "boca" o "japon" llega en un paso desde cualquier nivel); mientras hay texto escrito el árbol se
  esconde entero y la lista pasa a ser el resultado, agrupado en Equipos / Ligas / Países /
  Regiones.
- **UN LADO YA NO ES SOLO UN CLUB O UNA LIGA: también un país o una región enteros.** Toda fila de
  conjunto lleva un ⊕ que lo toma entero sin bajar hasta un club, y el primer renglón de cada nivel
  ofrece el conjunto en el que ya estás parado ("Toda la liga", "Todo el país", "Toda la región").
  `lado.tipo` pasó de `'liga'` a `'grupo'` con un `kind`; lo único que cambia entre los tres kinds
  es de dónde sale la lista de clubes, de ahí para abajo se calculan igual. "Argentina contra
  LaLiga" ya se puede preguntar.
- El botón "Elegir otro" vacía la columna dejando el árbol parado donde estaba el sujeto, no en la
  lista de regiones.
- El árbol de la columna B arranca parado en el país del club guardado: el rival más probable de
  Boca es otro club argentino.
- El bug 29 del sitio publicado (la columna Liga no filtra por región) no se repite acá: volver a
  un nivel limpia todo lo que colgaba más abajo.
- Los conjuntos se nombran por su TIPO y no por su nombre propio ("Toda la liga", no "Todo
  LaLiga"): el artículo concuerda con el nombre, y los nombres los ponen las ligas y los países.
  Concatenar daba "Todo Primera División", "Todo España", "Todo Argentina".
- **BUG DE DATOS ENCONTRADO DE PASO, y arreglado SOLO en el prototipo**: los 10 clubes japoneses
  tienen ingresos cargados y `expenseLines: []` (la J.League publica el ingreso por club, no su
  estructura de costos), así que el promedio de Japón salía con "Gastos 0,0 M USD" y "Resultado del
  ejercicio 55,0 M USD". No es un dato incompleto, es un dato falso. `numerosDe()` ahora manda
  gastos y resultado a "sin dato" cuando la fuente no los informa, igual que ya hacía con la deuda.
  EL SITIO PUBLICADO TIENE EL MISMO BUG, en `js/comparar-clubes.js:339` y en los KPIs de la ficha de
  Finanzas (la tabla de abajo sí muestra guiones): queda anotado como to-do 31, sin tocar.
- Arreglado de paso "Cierre 2026 (1 clubes)" en el desplegable de ejercicio de un conjunto.

## Prototipo del selector — paso 14: prototipo 4 — dos cards vacíos, y los pasos del 2 adentro de un modal

- **NUEVO `Prototyping/prototipo-cards.html`**, pedido de Guido después de probar el 3: "no me
  gusta el prototipo 3. Quiero ver un prototipo 4: Inicio comienza con un card como el attached
  pero claramente los cards están vacíos. Apretás el card y se dispara un modal que es el selector
  del prototipo 2, pero a ese selector quitale el paso que es para comparar con otra cosa".
  Es **el 3 por fuera y el 2 por dentro**: la portada abre con dos cards vacíos (un botón grande
  cada uno) y toda la complejidad de elegir vive adentro del modal, de a un paso.
- **SE VA EL PASO 7** ("contra qué comparar"). No se pierde ninguna función: ese paso existía para
  contestar "y ahora contra qué mido esto", que es exactamente lo que el segundo card contesta en
  la pantalla misma. El card B ES el rival.
- **Y CON ÉL SE VA LA PREGUNTA DEL PASO 5** ("¿comparar entre los N o armar un grupo con los N?").
  Un card es un lado, y un lado se mide como uno solo: marcar cinco clubes es un conjunto. Lo único
  que queda por decidir es si se lee sumado o promediado, y eso se elige después, en el card.
- Lo que se hereda de cada uno, literal: del 2 los 6 pasos, el filtro único `clubsQueQuedan()`,
  "Elegir más tarde" en todos los pasos, la multi-selección con casillas, el card resuelto encogido
  a una línea y el buscador como atajo de un paso (escribir "boca" y tocarlo llena el card sin
  recorrer nada); del 3 el cálculo de cada lado con `computeYearGeneric()`, la tabla de A contra B,
  los avisos y el toggle "comparar dos / ver uno".
- Un lado es SIEMPRE lo mismo: una lista de pares (club, ejercicio). Un club suelto es el caso de
  un par; una liga entera son 11. No hay dos formas de lado.
- Reabrir un card vuelve a los pasos con lo que ese card había elegido, no a cero.
- El fix de los gastos que no informa la fuente (to-do 31) va también acá, desde el principio.
- GOTCHA DEL GENERADOR: el markup del modal va antes del `<footer>` y no antes de `</body>`. El
  `<script>` principal de `index.html` está al final del body y es el que llama a
  `CLUB_SELECTOR.init()`: con el modal después de ese script, `init()` corría con el markup
  todavía inexistente, `$('modalX')` daba null y los dos cards quedaban muertos.
- En el modal los labels de opción ENVUELVEN en vez de cortarse con puntos suspensivos: el bloque
  del prototipo 2 ocupaba el ancho de la página y el modal mide 760px, así que "Fútbol americano"
  quedaba en "Fútbol ...".

## Prototipo del selector — paso 15: el prototipo 4 arranca preguntando, y los dos cards se mudan a una pestaña

- **INICIO ES AHORA UNA PREGUNTA DE DOS OPCIONES** (pedido de Guido): "quiero ver un club en
  particular" contra "quiero comparar dos clubes o ligas". Hasta acá los dos cards eran la portada,
  así que TODA visita empezaba mirando una pantalla partida al medio, incluida la mayoría, que
  viene por un club y nada más.
- **"Un club en particular"** abre el modal de pasos y, al confirmar, carga el club y salta a
  **Finanzas**. **"Comparar dos"** lleva a la pestaña **Comparar**, que es la pantalla de los dos
  cards de la Versión 156. El modal es el mismo para los dos caminos; lo único que cambia es a
  dónde va lo elegido (`origen`).
- **FINANZAS ABRE CON EL SELECTOR**: con club es una línea con el club activo y "Cambiar de club";
  sin club es un card con "Elegir un club", y el resto de la pantalla se esconde — las tablas
  vacías y el banner amarillo de "dato placeholder" que quedaban abajo no dicen nada, y el banner
  encima miente (no hay dato inventado, no hay dato).
- **PESTAÑA NUEVA `data-section="vs"`, que el visitante lee como "Comparar".** El id `comparar` ya
  existe en `index.html` y es "Comparar Gestiones" (dos presidencias del MISMO club, escondida del
  nav desde la Versión 56): son dos cosas distintas y el id no se puede pisar.
- **SE FUE EL TOGGLE "quiero comparar dos / solo quiero ver uno"** de adentro de la pestaña
  Comparar: esa pregunta ahora la hace Inicio, y tenerla en dos lugares era la misma bifurcación
  duplicada que este prototipo vino a sacar.
- El club guardado de una visita anterior ya NO llena el card A. Ese club es asunto de Finanzas; la
  pestaña Comparar arranca siempre con los dos cards vacíos, porque "contra qué comparar" no se
  hereda de la visita pasada.
- Si el visitante marcó VARIOS clubes viniendo por el camino de "un club en particular", el card
  final no descarta la selección en silencio ni inventa un promedio: dice qué va a ver y ofrece
  llevar los N a Comparar.
- `applyClubMode()` ya no esconde el nav ni las secciones mientras no hay club: en el sitio la
  portada es un hero suelto fuera de `<main>`, pero acá la portada ES una sección y esconderlas
  dejaba la página en blanco.
- La navegación entre pestañas se hace APRETANDO el botón del nav, no repitiendo las clases
  `active` del `<script>` de index.html: reimplementarla es garantizarse dos verdades.

## Prototipo del selector — paso 16: un lado deja de tener un agregador y pasa a ser una suma de bloques

- **EL PASO 4 DEL PROTOTIPO 4 ES AHORA UNA BIFURCACIÓN DE TRES**: 🏆 Ligas enteras, 👕 Clubes, 🧩 Una
  mezcla. De lo que se elija ahí dependen los pasos 5 y 6, así que la lista de pasos dejó de ser una
  constante y la arma `pasosActivos()`.
- **UN LADO YA NO TIENE UN AGREGADOR: LO TIENE CADA PARTE.** Pedido de Guido, con un caso concreto:
  "promedio de clubes colombianos + sumatoria de 6 clubes brasileros" contra Real Madrid. El modelo
  nuevo es el de una tabla dinámica:
  `LADO = bloque + bloque + …`, y cada bloque es `(qué cosas) × (qué año) × (cómo se agrega)`.
  La mezcla es el CASO GENERAL y las otras dos opciones son atajos que producen un lado de un
  bloque: un solo motor, tres puertas de entrada.
- **CONSECUENCIA VISIBLE: se fue el toggle Promedio / Todo sumado del card.** El agregador vive en
  el bloque, y el card muestra la fórmula en castellano (`promedio(Primera A 2025) + suma(6 clubes)`).
- **LAS LIGAS AHORA TIENEN TEMPORADA**, que era lo que arrancó todo esto ("comparar la liga de 2025
  contra la de 2024 para ver si el total creció"). El paso 6 de la rama Ligas es una fila por liga
  con sus temporadas como chips, y cada chip dice CUÁNTOS EQUIPOS tenía la liga ese año: sale de
  `clubsOfLeagueYear()`, la membresía por año, no de quiénes están cargados hoy. Primera División
  2025 son 10 equipos y 2024 son 11, y sin ese dato "la liga creció" mezcla plata con aritmética.
- **ATAJO PARA LA PREGUNTA QUE LO MOTIVÓ**: marcar dos temporadas de la misma liga las SUMA (un lado
  se mide como uno solo), así que el card final ofrece "2025 acá y 2024 en el otro card", que llena
  los dos cards de una y deja la comparación lista.
- **EL PASO 6 DE LA RAMA CLUBES SE AGRUPA POR CLUB** (pedido de Guido: "si no, el usuario pierde
  noción de quién son los balances"): "Boca Juniors" con el desplegable de SUS balances, "+ Otro
  ejercicio de Boca Juniors" debajo, y el agregador del conjunto una sola vez al final. El ejercicio
  que agrega ese botón arranca en el primero que ese club todavía no tenga en el lado.
- **EL CONSTRUCTOR DE LA MEZCLA** tiene forma de tabla dinámica: una fila por parte con qué es, de
  qué año, cómo se agrega y cuántos ejercicios entran, la fórmula abajo, y dos botones para sumar
  partes. La columna dice "qué entra" y no "cuánto aporta" a propósito: el aporte en plata obliga a
  bajar el `data/<club>-data.js` de cada club del bloque, que es justo lo que el selector no hace
  mientras elegís.
- Un lado puede sumar un promedio con una sumatoria. Se avisa en el card final y abajo de la tabla,
  pero NO se prohíbe: decisión de Guido, "suma peras con manzanas pero no es mi tema, yo tengo que
  dar la funcionalidad".
- "X de Y lo informan" en la tabla de resultados ahora cuenta PARTES del lado, no ejercicios: con un
  agregador por bloque, "2 de 8" mezclaba dos unidades en la misma frase.

## Prototipo del selector — paso 17: gana el prototipo 4, y queda documentado para el merge

- **DECIDIDO EL PUNTO 28**: de los cuatro prototipos del selector, el que va al sitio es el 4. Lo
  que queda es el merge a producción, que es grande y pasó a ser el **to-do 32**.
- `Prototyping/` se reorganizó a pedido de Guido: el ganador y sus archivos viven en
  `Prototyping/Selector/`, y los prototipos 1, 2 y 3 en `Prototyping/Selector/Archive/`. Los cuatro
  generadores se ajustaron (ROOT, `<base href>` y las rutas de los `<script src>` que inyectan) y
  se regeneraron; los cuatro `.html` cargan sin errores desde su ubicación nueva.
- **NUEVO `Prototyping/Selector/MERGE-A-PRODUCCION.md`** (292 líneas), escrito para una sesión que
  no vivió ninguna de estas: qué es el prototipo, el modelo de datos (un lado es una suma de
  bloques), qué cambia archivo por archivo en producción, un plan de merge por etapas, las 6 cosas
  que el prototipo no resuelve, la decisión de fondo sobre `js/comparar-clubes.js`, los 7 gotchas
  que cuestan tiempo, y un mapa de las 1.700 líneas del selector.
- Los datos inventados se mudaron con el ganador (`Selector/prototipo-pasos-datos-inventados.js`) y
  los prototipos archivados los referencian desde ahí; siguen siendo el mismo archivo con las
  mismas 5 condiciones, y se borran cuando termine el merge (to-do 30).
- `README.md` de `Prototyping/` reescrito: ahora abre con el ganador y una tabla de por qué perdió
  cada uno de los otros tres.
- De paso, `fuentes.html` estaba desactualizado respecto de los datos (8 documentos decían
  "Cotización oficial de cierre" donde su club ya declara `fxSource: document_close`). Se regeneró
  con `node tools/generate-fuentes-page.js`: no cambia ningún número, solo la procedencia del tipo
  de cambio, que ahora dice lo que dicen los datos.

## Versión 143: Finanzas abre con el selector, no con tablas vacías

- Etapa 1 del merge del prototipo 4 (to-do 32). Es la única independiente del resto.
- `#finSelector`, un card debajo del subtítulo de Finanzas: con club, una línea con "Cambiar de
  club"; sin club, `#finanzas.sin-club` esconde todo lo demás y queda solo el selector. Antes, sin
  club, esa pantalla eran tablas vacías y un banner de "dato placeholder" que además mentía.
- `renderFinSelector()` en `js/selector.js`, colgado de `renderButton()`: el punto que el sitio ya
  llama en cada cambio de club activo.
- ASSET_V 142 → 143.

## Versión 144-145: Inicio pregunta, y la comparación tiene su propia pestaña

- Etapa 2. Inicio deja de ser una pantalla de trabajo: es la bifurcación (`#bifurca`), dos opciones
  grandes. "Ver un club" abre el selector y aterriza en Finanzas; "comparar dos" va a la pestaña
  nueva.
- Nace la sección `#vs` ("Comparar") con su botón en el nav. El id es `vs` y no `comparar`, que ya
  lo usa "Comparar Gestiones" (dos presidencias del mismo club).
- La comparación entre clubes (`#cmpCta`, `#compareCard`, `#mixCard`) se muda de `#inicio` a `#vs`.
  Mudanza de markup: `js/comparar-clubes.js` escribe por id y no se entera.
- Los KPIs y los 3 gráficos de Inicio quedan abajo de la pregunta, dentro de `#inicioClub`, y solo
  cuando hay club.
- `applyClubMode()` deja de esconder el nav entero: se ven siempre Inicio, Comparar, Finanzas y Mi
  Cuenta; Fuentes aparece con club. Si la pestaña activa se esconde, vuelve a Inicio.
- Muere el `#coldHero` como pantalla (su markup sobrevive hasta la 146). `#clubLoadError` sale de
  adentro y estrena estilo sobre fondo claro: adentro del hero, un club que no cargaba fallaba en
  silencio.
- Regla `.fin-sel[hidden]`: `display:flex` de una clase le gana al `display:none` de `[hidden]`.
- ASSET_V 143 → 145.

## Versión 146-147: el modal paso a paso reemplaza al panel de 5 columnas

- Etapa 3, la más grande: `js/selector.js` reescrito entero.
- El panel de Miller columns (Deporte › Región › País › Liga › Equipo, ~67 opciones a la vez) pasa
  a ser un modal con los pasos apilados: Deporte → Región → País → Clubes → Ejercicio. El resuelto
  se encoge a una línea con un "Cambiar"; "Elegir más tarde" está en todos.
- Misma API pública, así que `index.html` y `js/comparar-clubes.js` no cambiaron.
- Puente con la comparación vieja: abierto desde ella, el paso de clubes prende y apaga sujetos con
  `CLUB_COMPARE.toggleClub()`. El promedio de liga, que era el "+" de la columna de ligas, se mudó
  abajo de los clubes: no se perdió ninguna función.
- Se borra el `#coldHero` y todo el CSS del panel y del hero: `index.html` de 141,6 KB a 133,9 KB.
- **To-do 29 resuelto**: el bug de la columna LIGA sin filtrar por región muere con el panel. En el
  modal, "Cambiar" un paso invalida los de abajo.
- ASSET_V 145 → 147.

## Versión 148-151: un lado es una suma de bloques, y los dos cards

- Etapa 4. Nace el paso 4, "¿QUÉ QUERÉS MEDIR?", que bifurca en Ligas / Clubes / Mezcla. Solo
  aparece viniendo de un card de Comparar.
- **UN LADO PASA A SER UNA SUMA DE BLOQUES**, cada uno con SU agregador (promedio o sumatoria).
  Ligas y Clubes son atajos que producen un lado de un solo bloque; la mezcla es el modelo completo.
  Un motor, tres puertas de entrada.
- Por eso el card no tiene toggle Promedio/Sumatoria: muestra la FÓRMULA
  (`promedio(LaLiga 2025) + suma(3 clubes)`), y avisa cuando mezcla las dos.
- La rama Ligas muestra las temporadas como chips CON CUÁNTOS EQUIPOS tenía cada una: sin ese dato,
  "la liga creció" mezcla plata con aritmética.
- El resultado: una fila por indicador con su barra, a escala dentro de su indicador, más las
  salvedades (años distintos, presupuestos, lados desparejos, "un club sin el dato no suma cero").
- **BUG, encontrado por Guido** comparando la liga argentina contra la brasilera: el card decidía
  "este lado es un club" CONTANDO clubes, y el Brasileirão Série A 2025 tiene un solo equipo con
  datos (Mirassol). El card le pedía `bloques[0].pares`, que un bloque de liga no tiene → TypeError,
  y como `render()` colgaba los tres hijos de a uno, el card B desaparecía dejando el A y el VS.
  Ahora la condición mira `kind === 'clubes'`, `render()` arma los dos cards antes de colgarlos, y
  la fórmula del lado se muestra siempre que haya una liga, aunque sea de un solo ejercicio.
- ASSET_V 147 → 151.

## Versión 152-154: se retira la comparación de chips, y se conserva lo que hacía mejor

- Etapa 5. **Se borra `js/comparar-clubes.js` entero** (870 líneas) y con él la bandeja de chips, el
  botón "Comparar" del header, la tarjeta de Inicio, el banner y la barra de confirmación del modal,
  sus 6 call sites, ~11 KB de CSS y 88 claves de i18n huérfanas. Los dos cards son la única forma de
  comparar.
- Lo que hacía mejor se conserva en `js/selector.js`: los **6 indicadores** (vuelven "Masa salarial
  / Ingresos" e "Ingreso por socio"), sus notas, las **3 reglas de comparabilidad** escritas en
  pantalla, y la **composición de ingresos**.
- Los dos ratios NO se agregan sumando: se acumulan sus dos insumos por separado, y solo de los
  ejercicios que informan LOS DOS, y el ratio se arma con los totales del lado. Promediar el
  porcentaje de un club chico con el de uno grande da un número que no describe a ninguno.
- La composición de ingresos mejora: antes un promedio de liga no tenía mezcla propia porque
  promediaba porcentajes; ahora los rubros se suman en USD antes de sacar el porcentaje.
- **EL BUSCADOR ENCUENTRA LIGAS** (lo levantó Guido: "puse 'primera div' y no me trajo Primera
  División"). El placeholder prometía "un club, una liga o un país" y solo devolvía clubes. Busca
  por `name` y `full`, agrupa en Ligas / Clubes, y una liga elegida así aterriza en el paso de la
  temporada: sin temporada no es un sujeto.
- **TO-DO 31 RESUELTO, en las dos mitades de la pantalla.** Los 10 clubes japoneses publicaban
  "Gastos 0,0 M USD" y un resultado igual a los ingresos, porque la J.League publica el ingreso de
  cada club y no su estructura de costos. Ahora los KPIs de Finanzas dicen "Sin dato" y la tabla
  explica por qué, en vez de listar los rubros en cero.
- `tools/audit.js`: `js/comparar-clubes.js` sale de la lista del chequeo i18n.
- ASSET_V 151 → 154. `fuentes.html` regenerado (arrastraba ASSET_V 142).

## Versión 155: se borran los prototipos y los datos inventados

- Etapa 6, la última del merge. **To-do 30 y to-do 32 cerrados.**
- Se borran los 4 `.html` generados, los 4 generadores, los 4 `-selector.js` y
  `prototipo-pasos-datos-inventados.js`: `Prototyping/` baja de 996 KB a 28 KB.
- Motivo extra al de la limpieza: **esa carpeta se deploya**. No hay `netlify.toml` ni `_redirects`,
  y Netlify publica la raíz del repo, así que `financeofsports.com/Prototyping/...` servía los
  ejercicios inventados de 18 clubes a cualquiera con la URL.
- Los 4 generadores ya no funcionaban: fallan buscando anclas de `index.html` que las etapas 3 y 5
  borraron. Es su diseño (fallan en vez de escribir a medias), pero dejaba 572 KB de `.html`
  congelados.
- Sobreviven los 2 `.md`: `Prototyping/README.md`, reescrito para que sea la tabla de por qué
  perdieron los prototipos 1, 2 y 3 —lo que evita volver a proponerlos— y
  `Selector/MERGE-A-PRODUCCION.md`, marcado como cerrado, que sigue siendo la mejor explicación del
  modelo que hoy corre.
- La etapa de i18n que el plan tenía como 6ª nunca existió: cada fase dejó sus claves en
  `data/lang/en.js` al cerrar.
- **To-do 34 nuevo**: las 6 cosas que el merge dejó abiertas a propósito (móvil, grupos guardados,
  el año por bloque en la mezcla, el aporte en plata, promedio + sumatoria, y que los datos son
  flacos para lo que la interfaz ya permite).

## Versión 156: transcripción masiva a `.md` de todos los PDF fuente pendientes

- Solo el paso de transcripción (pedido explícito de Guido: "no hagas el onboarding entero, solo
  el full transcript"), sin categorizar ni cargar ningún dato al sitio.
- Todos los PDF bajo `Clubes/` que no tenían su `.md` gemelo (ninguno traía capa de texto: eran
  escaneos o exports de imagen, `pdftotext` devolvía 0 caracteres reales) ahora lo tienen —
  transcripción página por página vía Tesseract OCR (300dpi, español/portugués/inglés/alemán
  según país), con marca `--- pág. N ---` antes de cada página.
- Detección y corrección automática de páginas rotadas 90° (Tesseract OSD + rotación con PIL)
  antes de OCRear, en vez de dejarlas ilegibles.
- Se descartó `--psm 6` (asume una sola columna) a favor de `--psm 3` (segmentación automática):
  igual de rápido en páginas normales, pero mucho más preciso en balances con columnas
  (capturaba filas de "Total" que `--psm 6` se comía enteras) y en páginas de layout complejo
  (balances publicados como aviso legal dentro de una página de diario, várias columnas).
- El repo fue creciendo clubes nuevos en paralelo mientras corría esta tarea (Alemania, Austria,
  y carpetas vacías de Costa Rica/Estados Unidos/Guatemala/Honduras/Jamaica/Panamá todavía sin
  PDF) — el driver quedó armado para re-escanear `Clubes/` y solo procesar lo que falte, así que
  sirve para correrlo de nuevo sin repetir trabajo si aparecen más PDF.
- Efecto colateral: resuelve la mitad de la to-do 21(a) (San Lorenzo 2014-15/2015-16/2016-17
  nunca se habían transcripto) — la comprobación de sus 3 tipos de cambio `fxSource:'unknown'`
  sigue pendiente, es trabajo de mapeo de datos, no de esta tarea.

## Versión 157: la transcripción masiva sigue el ritmo del sourcing en simultáneo (6 países más)

- Continuación directa de la Versión 156, mismo pedido de Guido y mismo alcance (solo
  transcripción, nada de mapeo de datos). Mientras corría, sesiones de sourcing en paralelo
  fueron agregando países nuevos a `Clubes/` — el driver, armado para re-escanear y procesar
  solo lo que falte, terminó transcribiendo ~570 PDF más sin haber sido relanzado a mano para
  cada país: Bélgica (~315, ver más abajo), China, Corea del Sur, Croacia, Dinamarca y Francia.
- **Bélgica necesitó ruteo de idioma POR CLUB, no por país**: a diferencia de todos los países
  anteriores, Bélgica tiene clubes que presentan sus cuentas en francés (Standard Liège,
  Charleroi, RAAL La Louvière, Union Saint-Gilloise — Valonia y el lado francófono de Bruselas)
  y otros en neerlandés (el resto, Flandes — confirmado renderizando la página 1 de una muestra
  de cada uno antes de asumir nada, no por el nombre del archivo: todos comparten el nombre
  genérico `jaarrekening-...` sea cual sea el idioma real adentro). El reporte anual de Deloitte
  sobre la Pro League, aparte, está en inglés.
- Corea del Sur, China y Croacia sumaron `kor`/`chi_sim`/`hrv` sin sorpresas — page-by-page
  legible, incluidos los caracteres chinos y los diacríticos croatas (đ, š, ž). Único hallazgo
  menor: los índices con puntos suspensivos largos (tabla de contenidos) confunden a Tesseract en
  coreano, que alucina Hangul repetido en vez de leer los puntos — no pierde datos financieros
  (esas páginas son solo el índice), no se persiguió más.
- Dos gaps de idioma reales, encontrados y corregidos EN CALIENTE (con archivos ya mal
  transcriptos, borrados y re-hechos) porque el país apareció después de armar la tabla de
  idiomas: Dinamarca (13 archivos con modelo de español antes de agregar `dan`) y sin
  consecuencia todavía cuando se agregó Francia (`fra`, a tiempo).
- Bug de infraestructura real, no de idioma: el driver quedó en loop infinito reintentando UN PDF
  corrupto (`Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2021.pdf` — descarga trunca,
  `pdfinfo`/`pdftoppm` no pueden ni abrirlo, xref y trailer rotos, no es recuperable con las
  herramientas de este entorno) miles de veces por minuto, porque el script no tenía forma de
  recordar "esto ya falló, no lo reintentes" entre pasadas. Se agregó una lista de fallos
  permanentes (`permafail.txt`): un archivo se reintenta como máximo una vez por corrida; si
  falla, se excluye de las pasadas siguientes y queda listado al final para atención manual. Ese
  PDF puntual sigue sin transcribir — necesita que alguien lo vuelva a descargar.
- (Ver también CLAUDE.md, gotcha nuevo sobre `pdfinfo | grep` y bytes NUL en metadata, encontrado
  en el mismo tramo con los PDF de clubes chinos.)

## Versión 158: `fuentes-por-club.md` se parte por país (índice de países + `fuentes/_indice/`)

- `fuentes-por-club.md` pasa de tener una línea por club (570 líneas, 940 en total, ~97 KB) a ser
  solo un índice de PAÍSES de 132 líneas / 10 KB: una línea por país con cuántos clubes trackea,
  cuántos tienen documento encontrado, y la fecha del chequeo más viejo, ordenadas alfabéticamente.
- El detalle línea-por-club se movió a `fuentes/_indice/<País>.md`, 44 archivos nuevos (el más
  grande, Argentina, 81 líneas). Mismo formato de línea de siempre, links reescritos a `../`.
  `fuentes/<País>/<Club>.md` no se tocó.
- Motivo además del tamaño: con un archivo por país, dos sesiones o agentes sourceando países
  distintos no comparten ningún archivo, así que no pueden generar conflictos de merge (ya había
  pasado con dos agentes en paralelo sobre el archivo único).
- REGLA 4 nueva en `fuentes-por-club.md` con el criterio; REGLAS 1 y 3 reescritas para apuntar al
  archivo del país. Se documenta también qué cuenta como "con documento encontrado" (incluye
  agregados de liga con desglose por club como la DNCG; no cuenta lo inaccesible por pago/captcha).
- Migración verificada: 569 líneas-bullet antes y después, 0 perdidas, 0 duplicadas, 0 links rotos.
  Los 530 clubes del índice coinciden exactamente con los 530 `fuentes/<País>/<Club>.md` en disco.
- Se corrigió `fuentes/Peru/` → `fuentes/Perú/` y `Clubes/Peru/` → `Clubes/Perú/`: el índice decía
  "Perú" y las carpetas no, la única inconsistencia de tilde que quedaba en un nombre de país.
- Actualizados `CLAUDE.md`, `ARQUITECTURA.md`, `ESTADO.md`, `TODO.md`, `COMO-CORRE-EL-PROYECTO.html`
  y los 4 skills que citaban el índice.
- To-do 35 nuevo: automatizar el índice con `tools/generate-fuentes-index.js`. El prompt
  autocontenido para esa sesión quedó en `PROMPT-generador-indice-fuentes.md`.
- Bug aparte, encontrado al correr los generadores como verificación de cierre:
  `tools/generate-fuentes-page.js --check` venía diciendo "fuentes.html quedó DESACTUALIZADO"
  todos los días sin que hubiera cambiado ningún dato. El regex que borra la fecha del footer
  antes de comparar no contemplaba el `</span>` que el markup mete entre el texto y la fecha, así
  que no matcheaba nunca y la única diferencia real (la fecha de generación) contaba como cambio.
  `fuentes.html` no estaba desactualizado: sus 89 documentos coinciden con los datos.

## Versión 159 — Auditoría de escala (eje `escala`, pedido explícito de Guido) y skill nueva

- Re-corrida completa del mapa de escala de la Versión 128 (`auditorias/2026-09-13-escala.md`)
  contra el estado actual: 3 cuellos resueltos (`clubId` sin país, comentario de `index.html`,
  selector jerárquico), 3 vigentes sin cambios (`fuentes.html` sin partir, `clubs.js` sin
  adelgazar del todo, `auditAll()` en serie), 4 nuevos que la corrida anterior no podía ver
  todavía: `fuentes-por-club.md` (el índice de sourcing, no su contenido) ya cruzó su propio
  umbral de partición; el payload eager de `index.html` es 8 archivos y el que más crece es
  `club-leagues.js`, no `clubs.js`; el buscador del selector no tiene debounce ni límite de
  resultados; y el backlog de transcripción en `Clubes/` corre ~8x más rápido que la carga real.
  Reporte completo: `auditorias/2026-09-17-escala.md`. To-do 22 actualizado con los hallazgos
  vigentes y nuevos.
- Skill nueva: `.claude/skills/escala-finance-of-sports/`, dedicada al mapa de puntos calientes de
  escala y su metodología, separada de `auditoria-finance-of-sports` (que sigue siendo el
  procedimiento genérico de los 5 ejes) porque el mapa es grande y cambia con cada sesión de
  sourcing/onboarding. `CLAUDE.md` y el eje `escala` de `auditoria-finance-of-sports` apuntan a
  ella.
- NOTA (agregada al reconciliar con `main`): el hallazgo 1 de este trabajo (partir
  `fuentes-por-club.md`) se resolvió en paralelo, en `main`, con la misma Versión 158 — otra
  sesión lo hizo el mismo día sin que las dos se vieran. Se renumeró esta entrada a 159 para no
  chocar, y el to-do 22(g) se marcó resuelto apuntando al commit de `main`.

## Versión 160: `auditAll()` carga los clubes en tandas paralelas (punto 5 del plan de escala)

- `auditAll()` (`index.html`) pasa de un `for` con `await` adentro (41 requests en fila) a tandas
  de 25 con `Promise.allSettled`. Es el primer punto ejecutado de `PLAN-REMEDIACION-ESCALA.md`
  (orden 2) y cierra el to-do 22(f), vigente desde hacía dos auditorías de escala seguidas.
- Verificado antes y después con los mismos 41 clubes: 222 checks cierran, 0 que no cierran, 0
  warnings de fx, 0 clubes que no cargaron. 78 ms en serie contra 38 ms en frío en tandas, sobre
  localhost.
- Camino de error probado aparte, con dos clubes falsos que dan 404 en la misma tanda: los dos
  quedan atribuidos a su propio id en `clubesQueNoCargaron` y en el `console.error`, y los otros
  41 siguen dando sus 222 checks. `allSettled` y no `all` justamente por eso: con `all`, el
  primer fallo aborta la tanda entera.
- `node tools/audit.js` sigue en 0 P0 / 0 P1.
- De paso, tres conteos que habían quedado viejos: `ESTADO.md` y el skill de arranque decían 58/9
  y 52/7 P2/P3 de `tools/audit.js`; los reales son 44 y 8. El punto D del skill
  `escala-finance-of-sports` queda marcado como resuelto, con la propiedad que hay que preservar
  si alguien lo vuelve a tocar (ningún `data/<club>-data.js` loguea, y las verificaciones corren
  después de la carga, no intercaladas).

## Versión 161: chequeo de carpetas duplicadas en `Clubes/` (punto 8 del plan de escala)

- `checkCarpetasClubes()` nueva en `tools/audit.js`: recorre `Clubes/<País>/` y reporta P2 cuando
  dos carpetas del mismo país normalizan al mismo nombre (sin acentos, minúsculas, sin
  separadores), o sea un club transcripto dos veces con dos grafías y sus documentos partidos
  entre las dos. Segundo hallazgo del mismo pase: una carpeta de club colgando directo de
  `Clubes/` sin país en el medio, que `CLAUDE.md` prohíbe y que no vigilaba nadie.
- CORRECCIÓN AL PLANTEO DEL PUNTO, que pedía "el equivalente de `checkClubIds()` para carpetas":
  la colisión exacta NO es detectable por construcción. Un filesystem no admite dos carpetas con
  el mismo nombre en el mismo directorio, así que el segundo club cae adentro de la carpeta del
  primero sin dejar rastro. Contra eso sigue valiendo solo la REGLA 3 de `fuentes-por-club.md`,
  aplicada a mano. Lo escrito quedó en el comentario de la función, en esa regla y en la sección E
  del skill de escala.
- Alcance: el disco entero (336 carpetas) y no solo `clubs{}` (41), porque la duplicación nace al
  sourcear, antes de que el club llegue al sitio. Si `Clubes/` no existe, el chequeo se sale
  callado en vez de reportar que no pudo correr.
- Línea de base: 0 hallazgos hoy. Se ejercitó a propósito con dos carpetas temporales para
  confirmar que los dos avisos salen de verdad, y se corrió una copia del repo sin `Clubes/` para
  confirmar que no rompe: 0 P0, 0 P1, 44 P2, 8 P3 en los tres casos.

## Versión 162: `fuentes.html` se parte en una página por club, más sitemap (punto 2 del plan de escala)

- `tools/generate-fuentes-page.js` pasa de generar 1 archivo a generar 43: `fuentes/<clubId>.html`
  (41, una por club, con solo sus documentos), `fuentes.html` (ahora el índice: una fila por club
  con su conteo y el link, sin contenido de fuentes) y `sitemap.xml`. El índice baja de 86,5 KB a
  14,5 KB y cada visitante se baja solo la página del club que mira.
- Se partió por CLUB y no por país, que es lo que pedía el to-do 22(c): el club es la unidad que el
  visitante busca y la única que puede rankear sola en un buscador. Hasta acá los 41 compartían una
  URL, así que ninguno podía rankear por su nombre.
- El generador BORRA las páginas huérfanas (un club que deja de existir o que cambia de `clubId`):
  sin eso, Netlify seguiría sirviendo una página con datos fantasma, porque publica la raíz del
  repo entera. `--check` compara los 43 archivos y avisa cuál falta, cuál quedó viejo y cuál sobra.
- `sitemap.xml` va SIN `<lastmod>` a propósito: una fecha que cambia todos los días haría que
  `--check` reporte desactualizado cada día sin que cambie un dato, que es el bug que ya tuvo el
  footer de esta página (commit `411beaf`).
- La ficha de Finanzas ahora linkea a la página del club y abajo a "Ver fuentes de otros equipos".
  Un club sin ningún documento cargado no tiene página generada, así que en ese caso se muestra
  solo el link al índice.
- BUG REAL ENCONTRADO Y CORREGIDO EN EL CAMINO: `I18N.load()` armaba el src del diccionario
  relativo al documento, así que las páginas de `fuentes/` pedían `fuentes/data/lang/en.js`, se
  comían un 404 y se quedaban en castellano aunque el visitante tuviera el sitio en inglés. No se
  veía rota porque el `onerror` degrada a castellano a propósito. Ahora el src lleva
  `window.I18N_BASE` adelante. Regla nueva en `CONVENCIONES.md`.
- PUNTO CIEGO CERRADO: el chequeo `i18n-incompleto` de `tools/audit.js` no miraba
  `tools/generate-fuentes-page.js`, que también emite `data-i18n`. Una clave nueva de esas páginas
  era invisible. Ya está en la lista, y la regla de `CONVENCIONES.md` se amplió de "todo archivo de
  `js/` que llame a `t()`" a todo archivo que emita claves, incluido el que genera HTML.
- 6 claves nuevas en `data/lang/en.js` (`th.docs`, `fuentes.page.intro3`, `fuentes.club.intro`,
  `fuentes.card.others`, `fuentes.doc`, `fuentes.docs`) y se borró `fuentes.card.all`, que quedó
  huérfana, por la regla de la Versión 155. `ASSET_V` de 155 a 162, constante y los 13 tags.
- Verificado: `--check` limpio, `node tools/audit.js` en 0 P0 / 0 P1, `auditAll()` en 222 checks
  con 0 que no cierran, índice y páginas de club renderizando y traduciendo en el navegador, links
  de la ficha apuntando donde corresponde, y el barrido de huérfanas probado a mano.

## Versión 163: la colisión de `clubId` se avisa al sourcear, no al cargar (punto 7 del plan de escala)

- `checkColisionSourcing()` nueva en `tools/audit.js`: lee los 44 `fuentes/_indice/<País>.md` y
  reporta P3 cuando un club que se está sourceando coincide en nombre con un `clubId` heredado sin
  país ya cargado, o sea antes de transcribir nada. `checkClubIds()` avisaba recién cuando el club
  que colisiona ya estaba cargado, que es cuando migrar cuesta tres cosas a la vez.
- Hoy ese P3 da 0 y calla. Se ejercitó a mano agregando un club de prueba a un índice para
  confirmar que dispara con el mensaje correcto.
- SE MIDIÓ ANTES DE DISEÑARLO, y cambió el diseño: sobre los 530 clubes trackeados, la comparación
  exacta de nombres da 3 pares entre países (Everton, Nacional, Olimpia); por primera palabra da
  119 clubes en 23 grupos, casi todos "Deportivo", "Atlético", "FC" y "Unión". O sea que NO hace
  falta lista de excepciones para nombres genéricos: hace falta no hacer matching difuso. Esos 3
  pares van en UNA línea agregada, no una por par, porque no está cargado ninguno de los dos.
- GOTCHA DE PARSEO que costaba un falso positivo grande: el patrón de línea de club matchea
  también `- [Notas generales de X](../X/_notas-generales.md)`, una por país. Sin excluirlas el
  conteo da 569 en vez de los 530 reales y aparece un choque fantasma de "Notas" en 39 países. Se
  excluyen por el destino del link, que empieza con `_`.
- `node tools/audit.js`: 0 P0, 0 P1, 44 P2, 9 P3 (uno más, la línea agregada).

## Versión 164: `club-leagues` se parte por país y sale del camino eager (punto 9 del plan de escala)

- Las filas de `data/club-leagues.js` se mudaron a `data/club-leagues/<iso2>.js` (6 archivos, uno
  por país), cada uno autoregistrándose con `Object.assign` en la misma tabla, el patrón de
  `sources{}`/`gestionesByClub{}` de la Versión 101. `data/club-leagues.js` quedó con las reglas,
  los 6 helpers y el cargador, sin un solo dato.
- SE ELIGIÓ POR PAÍS Y NO POR LIGA, con el invariante verificado: sobre los 41 clubes, ninguno juega
  una liga de otro país.
- LO QUE DE VERDAD CAMBIÓ NO ES CÓMO SE PARTE SINO CUÁNDO SE CARGA. Partir por país no compraba
  lazy-load: el selector necesita la tabla entera para dibujarse (`ligasConClubes()` recorre todas
  las ligas). Lo que sirvió fue sacarla del camino eager y ponerla detrás de UNA frontera async, el
  `abrirModal()` de `js/selector.js`. Los 6 helpers siguen síncronos: volverlos async obligaría a
  volver async cada función de render del modal.
- AHORRO REAL, medido y sin redondear para arriba: 1,2 KB sin comprimir hoy (79,7 KB a 78,5 KB de
  payload eager), porque el archivo de helpers se quedó con la prosa de las reglas. Lo que cambió es que ese archivo
  pasó a ser de tamaño FIJO en vez de crecer por ejercicio. Los 11,1 KB de datos se bajan al abrir
  el modal.
- LA PROYECCIÓN QUE MOTIVABA EL PUNTO ESTABA INFLADA 5x: el archivo era 65% comentarios, y las filas
  de datos son 28 B/ejercicio, no 164. A 5000 ejercicios son ~137 KB de datos, no ~800 KB.
- SOBRE EL "~38 KB" QUE CIRCULABA: no era un error, era otra cosa. Es la suma de los TRES archivos
  eager que escalan (`clubs.js` + `club-index.js` + `club-leagues.js` = 37,3 KB), que es lo que dice
  el skill de escala. El payload eager COMPLETO son 8 archivos: 79,7 KB sin comprimir, y **29,3 KB
  como viajan de verdad** (Netlify los sirve comprimidos). Los tres números miden cosas distintas y
  conviene decir cuál se está usando.
- BUG REAL EN EL CAMINO: el cargador leía `window.clubs`, que es `undefined` porque `data/clubs.js`
  declara `const clubs`, o sea un global léxico y no una propiedad de `window`. Es el mismo bug de
  la Versión 96. La lista de países salía vacía y no se pedía ningún archivo, en silencio.
- Verificado: los 6 helpers dan salida byte a byte idéntica a la de antes del cambio (mismo hash
  SHA-1 de `leaguesOfClub` para los 41 clubes, y `clubsOfLeague`/`leagueYears`/`clubsOfLeagueYear`
  iguales liga por liga). Antes de abrir el modal la tabla está vacía y no se bajó ningún archivo de
  país; al abrirlo se bajan los 6 y quedan los 41 clubes. Modal recorrido paso a paso con dos
  regiones y dos países (Argentina 11 clubes, España 10, 21 en el paso de clubes). 0 recursos
  fallidos, `auditAll()` en 222 checks, `node tools/audit.js` en 0 P0 / 0 P1. `ASSET_V` a 164.

## Versión 165: debounce y tope de resultados en el selector (punto 4 del plan de escala)

- Debounce de 160 ms en el `input` del buscador del modal. VA EN EL LISTENER Y NO EN
  `renderBusqueda()`: esa función también se llama desde adentro de sí misma al elegir un club o
  una liga, justo después de vaciar el input, y esas llamadas tienen que correr en el mismo tick.
  Debouncear la función dejaría los resultados viejos en pantalla mientras `confirmar()` cambia de
  club.
- Tope de 30 resultados en la grilla de clubes, con "Mostrar más" y el conteo real al lado
  ("30/34"). El tope se resetea en cada consulta nueva y en cada apertura del modal.
- Caché del texto buscable de cada club (nombre + país + ligas, ya normalizado). Antes el filtro
  llamaba a `ligasDe(id)` para CADA club en CADA tecla, y esa función ordena las ligas del club
  cada vez. Se invalida al cargar la tabla de ligas (Versión 164).
- La grilla de "elegir clubes" del constructor de mezcla lleva el mismo tope, pero con los clubes
  ya marcados SIEMPRE primero y visibles: ahí el visitante está seleccionando, y esconderle algo
  que marcó se lee como que se le borró.
- Clave nueva `sel.mostrarmas` en `data/lang/en.js` y estilo `.sel-mas`. `ASSET_V` a 165.
- Verificado en el navegador: sin resultados en el tick del tecleo y 30 tras el debounce; "Mostrar
  más" revela los 34 y el botón desaparece; una consulta nueva vuelve al tope; elegir un club desde
  el buscador limpia los resultados en el mismo tick y deja el club activo; la grilla de mezcla
  muestra 30/41 y un club marcado que estaba en la posición 40 pasa a la 0. `node tools/audit.js`
  en 0 P0 / 0 P1, los dos generadores con `--check` limpio, 0 recursos fallidos.
- **Con esto quedan cerrados los 8 puntos de `PLAN-REMEDIACION-ESCALA.md`** (7 hechos y el punto 3
  descartado con mediciones).

## Versión 166: Cloudflare Web Analytics

- Snippet de Cloudflare Web Analytics (`beacon.min.js` con token propio) agregado en el `<head>` de
  `index.html`, antes de `</head>`. Da visitas, pageviews, referrers y país por visitante sin
  cookies ni banner de consentimiento; no requiere pasar el DNS del dominio por Cloudflare (se
  instaló como snippet JS, no como sitio proxeado). Dashboard en Cloudflare, Analytics → Web
  Analytics.
- Verificado en producción: el deploy de Netlify sirve el script (chequeado con `curl` sobre
  `financeofsports.com`), y el dashboard de Cloudflare registró visitas reales tras cargar el sitio
  en un navegador.

## Versión 167: el KPI de deuda deja de publicar un cero que ninguna fuente dice, y el aviso de deuda se traduce

- **To-do 25.** `renderFinanzasStatsGeneric()` publicaba "Deuda neta · 0,0 M USD" en el cuerpo de
  letra más grande de la ficha para cualquier ejercicio cuyo documento no desglosa deuda ni caja,
  mientras el aviso de la tabla de abajo (misma pantalla) decía que ese cero no significa nada. El
  test de "no desglosado" existía sólo adentro de `renderDebtBlockGeneric()`. Se extrajo a
  `deudaNoDesglosada(c)`, compartida por las dos, y el KPI ahora muestra "Sin dato" con el mismo
  criterio que ya usaban `Gastos` y `Resultado neto`.
- Alcance real, más grande que el presupuesto de Boca que motivó el to-do: también los 10 clubes
  japoneses, Club América, Once Caldas y Mirassol, que informan ingresos pero no deuda ni caja,
  publicaban deuda neta 0,0.
- La rama de Boca que el to-do mandaba a chequear (`renderFinanzasStatsFromComputed`) ya no existe:
  se fue con el motor genérico de la Versión 102, sobrevive sólo citada en comentarios.
- **To-do 27.** `debtDisclosureNote()` (`js/finanzas-calc.js`) armaba sus mensajes como template
  literals en castellano, así que con el sitio en inglés el aviso salía en castellano. Pasa por
  `t()` con placeholders `{a}`/`{b}`; 2 claves nuevas en `data/lang/en.js` (no 3: "sólo el actual" y
  "sólo el anterior" son el mismo texto). `t()` local nuevo en `js/finanzas-calc.js`.
- **To-do 8.** El mailto del formulario de contacto pasa del placeholder
  `contacto@bocaennumeros.example` a `guidomamone91@gmail.com`.
- **To-do 37.** Las 613 notas internas de sourcing (`fuentes/<País>/<Club>.md` y
  `fuentes/_indice/<País>.md`) se destrackean: estaban servidas en
  `financeofsports.com/fuentes/<País>/<Club>.md` y 37 mencionan a Guido por nombre. Regla nueva en
  `.gitignore` (`fuentes/**/*.md`, que deja afuera los 41 `fuentes/<clubId>.html` generados, que sí
  son parte del sitio). Los archivos siguen en disco y se usan igual.
- `ASSET_V` a 167 (la 166 ya estaba tomada por el snippet de Cloudflare Analytics), 13 tags más la
  constante; `fuentes.html`, sus 41 páginas y `sitemap.xml` regenerados.
- Verificado en el navegador: Boca 2026/27 muestra "Sin dato"/"No data" y su aviso en los dos
  idiomas; Boca 2025 (balance real con deuda) sigue mostrando 26,6 M USD y sin aviso; Gamba Osaka
  pasa a "Sin dato". `auditAll()` en 41 clubes · 222 checks · 0 no cierran · 0 warnings, y
  `node tools/audit.js` en 0 P0 / 0 P1.

## Versión 168: auditoría de rutina, eje `codigo`

- Tercera auditoría de rutina (`auditorias/2026-09-20.md`), eje `codigo` por rotación (`datos`
  2026-09-13 → `escala` 2026-09-17 → `codigo`). Próximo eje: `docs`.
- Capa 1 sin novedades: los mismos 44 P2 y 9 P3 que la corrida del 17, `auditAll()` en 41 clubes /
  222 checks / 0 no cierran, los dos generadores con `--check` limpio.
- 4 de los 5 chequeos del eje pasan limpio, medidos en el navegador: 0 charts huérfanos tras 20
  ciclos de toggle; 350 `addEventListener` contra 350 `removeEventListener`, 0 fugas netas;
  `loadClubData()` rechaza bien un archivo 404 y los 3 llamadores lo manejan; los toggles combinados
  no derivan (Boca 2025 vuelve al mismo valor tras ~30 ciclos, y ARS = USD × 1.203, el fx declarado).
- Verificado además lo que dejaron las versiones nuevas: 3 aperturas del modal en el mismo tick
  piden 6 archivos de liga y no 18 (el cache de `_clubLeaguesPromise` de la Versión 164), y el tope
  de la 165 muestra "Mostrar más (30/41)".
- Hallazgo P2 nuevo, **to-do 40**: `#clubLoadError` vive adentro de `#inicio`, así que el aviso de
  club que no carga es invisible para el visitante parado en Finanzas.
- Hallazgos P3 nuevos, solo en el reporte: la frontera async de `abrirModal()` no tiene estado de
  carga, y el beacon de Cloudflare reintenta ~6 veces por pageview en localhost (no es del sitio).
- `CONVENCIONES.md`: la regla "SIN DATO NO ES CERO" se extiende con la lección de mecanismo de la
  Versión 167. El bug volvió tres veces (140, 152, 167) porque la regla decía QUÉ mostrar y no DÓNDE
  vive el test: ahora dice que va en una función compartida (`informaDeuda()`, `deudaNoDesglosada()`)
  y nunca en línea adentro de un render.

## Versión 169: los 5 tipos de cambio sin procedencia resultaron los 5 declarados por su propio balance

- **To-do 21(a) cerrado.** San Lorenzo 2015/2016/2017 y Vélez 2015/2016 pasan de
  `fxSource:'unknown'` a `'document_close'`, verificados uno por uno contra el Anexo de moneda
  extranjera de su propio balance: San Lorenzo 8,9880 / 14,9400 / 16,5300 (Anexo III y II, lado
  Activo) y Vélez 8,9880 / 14,94 (Anexo VI). En los dos clubes el lado Pasivo declara el vendedor
  (9,0880 / 15,0400 / 16,6300), que es el mismo spread ya documentado con Unión en la Versión 140.
- **Los 2 motivos por los que la to-do daba esto por bloqueado ya no eran ciertos**: los PDFs de San
  Lorenzo sí están transcriptos (desde el 2026-09-17) y la transcripción de Vélez sí conserva la
  columna de cambio vigente. Queda anotado en la to-do para que no se repita el diagnóstico viejo.
- Descartada la sospecha de una copia de fx entre San Lorenzo y Vélez: los dos cierran el 30 de
  junio, así que la misma cotización oficial es lo esperado.
- Ningún número se movió: `fx` no cambió, solo su procedencia declarada. `auditAll()` sigue en 41
  clubes / 222 checks / 0 no cierran / 0 warnings.
- `node tools/audit.js` baja de 44 P2 / 9 P3 a **39 P2 / 8 P3**: desaparecen el grupo
  `fx-sin-procedencia` (5) y el P3 `fx-procedencia-pendiente`.
- `ASSET_V` a 169, `fuentes.html` + sus 41 páginas + `sitemap.xml` regenerados (la ficha de fuente
  de esos 5 ejercicios ahora declara de dónde sale su tipo de cambio).

## Versión 170: Racing 2009-2011 dejan de ser inverificables, y la auditoría deja de pedir lo que no existe

- **To-do 20(e) cerrado.** Los 3 ejercicios reales que no tenían NINGÚN número de control ahora
  cargan `officialTotalRevenue` y `officialPAT`, leídos del Estado de Recursos y Gastos de cada
  balance: 2009 $78.209.061 + $9.195.840 de extraordinarios y resultado +$2.687.137; 2010
  $72.936.813 + $370.152 y −$9.714.118; 2011 $108.779.778 y +$267.202. Van en USD (estos 3 están
  guardados en USD ya-convertido, excepción documentada en `club-data-mapping` §5), dividiendo por
  el mismo fx de cada línea. `auditAll()` pasa de 222 a **228 checks**, los 6 nuevos cierran.
- `officialTotalExpenses` queda en `null` a propósito en los 3: el "TOTAL DE GASTOS" impreso no
  tiene el mismo alcance que `expenses + nonCash` del sitio y no lo agrupa igual año a año. Es el
  caso que `club-data-mapping` §6.4 manda NO forzar; la verificación se hizo por PAT, que es el
  número inambiguo.
- Dos rarezas del propio documento quedaron anotadas en el archivo: el Anexo de 2010 y el de 2011
  imprimen un "Total Recursos Ordinarios" distinto del "TOTAL DE RECURSOS" del Estado (las líneas
  reproducen el del Estado), y el Estado de 2011 rotula "RESULTADO FINAL (Pérdida)" sobre un número
  POSITIVO — el rótulo quedó de la plantilla del año anterior.
- **To-do 20(a) cerrado, arreglando el chequeo y no los datos.** `balance-sin-pat` tiraba 11
  hallazgos y 10 eran clubes de la J.League, que publica el ingreso de cada club y no su estructura
  de costos: sin gastos publicados no hay resultado que cargar. Ahora el chequeo solo dispara cuando
  el documento publica ingresos Y gastos. El hallazgo 11 (Club América) se silencia con su motivo:
  su "utilidad del segmento" IFRS 8 no es el resultado neto del club. Regla nueva en
  `club-data-mapping` §18.
- **To-do 20(d) cerrado por decisión de Guido:** las 5 líneas de ingreso extraordinario de Racing se
  quedan en `exceptional_items`. Silenciadas en `tools/audit-ignore.json` y la decisión, con su
  consecuencia aceptada, escrita en `CONVENCIONES.md`.
- **To-do 40 cerrado.** `#clubLoadError` se mudó de `#inicio` a `<main>`, arriba de las secciones,
  así que el aviso de "no se pudieron cargar los datos de X" se ve desde cualquier pestaña. Se le
  agregó apagado explícito al cargar un club bien, que antes no hacía falta porque se escondía solo
  al cambiar de sección.
- **To-do 36 cerrado.** Las 17 entradas del prototipado del selector pasan de "Versión 143-159" a
  "Prototipo del selector — paso 1-17", con una nota que explica por qué. Ya no hay dos bloques con
  los mismos números y la serie vigente del proyecto queda como la única que numera versiones.
- **To-do 9 cerrado** sin trabajo: no se reproducía desde que se agregó `.table-scroll`.
- `node tools/audit.js` pasa de 39 P2 / 8 P3 a **20 P2 / 8 P3** (6 silenciados con motivo escrito).
  `ASSET_V` a 170.

## Versión 171: auditorías de rutina de los ejes `docs` y `tokens` — se cierra la rotación

- Dos corridas más el mismo día (`auditorias/2026-09-20-docs.md` y `-tokens.md`), a pedido de Guido.
  **Con estas se completó la vuelta entera** `datos` → `escala` → `codigo` → `docs` → `tokens`. El
  próximo eje vuelve a `datos`.
- **Eje `docs`.** Se encontraron y corrigieron 3 lugares que citaban en presente código borrado:
  `CONVENCIONES.md` decía que los cards de presupuesto usan `noDataMsg()` 54 líneas después de
  decir que esa función se borró; `club-data-mapping` §12 citaba `revenueDetailOrLeaf()` y
  `revenueComponentTuple()` (motor Boca-only, Versión 102); `club-or-year-onboarding` describía la
  nota de fuente vieja (`renderClubSourceNote()`, reemplazada en la 126/127).
- Se actualizó la tabla de pesos de `start-session-finance-of-sports-project` §1: decía 33 KB para
  `club-sourcing` (pesa 91) y 68 KB para `CHANGELOG.md` (pesa 189), justo los dos archivos que más
  conviene no abrir de corrido.
- `tools/audit.js` gana `doc-peso-desfasado` (P3): compara cada KB prometido contra el archivo real
  y avisa si se desvía más de 25%. Probado rompiendo un número a propósito — la primera versión de
  su regex prohibía el `|` y no disparaba nunca, con la tabla en celdas separadas por pipes.
- Se midió y quedó registrado que la duplicación de datos de club YA está resuelta
  (`generate-club-index.js`, Versión 128): no hay trabajo pendiente ahí y el próximo eje `docs` no
  tiene que volver a medirlo.
- **Eje `tokens`.** El piso de una sesión son 119 KB (~30 mil tokens) antes de mirar código, y ~260
  KB si además es onboarding de un club. El hallazgo no es el tamaño: es que lo más caro son las
  premisas vencidas de la to-do (tres casos medidos hoy: 21(a), 25 y 20(a)).
- Regla nueva en `CONVENCIONES.md`: cuando una tarea se cierra y el motivo por el que estaba trabada
  resultó falso, eso se escribe — es la única señal de que los otros puntos pueden estar igual.
- Ninguna de las dos corridas agregó puntos a la to-do.

## Versión 172: el sitio deja de decir que un club japonés no cobra televisación

- **To-do 20(h) cerrado, decisión de Guido: se hacen los dos cambios.** `bucketize()` marca `unknown`
  toda fila de Formato simplificado que dé cero **cuando su sección tiene un bolsón "sin desglosar
  por la fuente" con plata adentro**, y `buildNativeSectionHtml()` la pinta "—" en vez de $0, valor
  y porcentaje. Gamba Osaka pasa de "Televisión $0" a "Televisión —", con sus 33,8 M USD de bolsón
  a la vista. Un club que SÍ desglosa todo sigue mostrando $0 donde el cero es real (verificado con
  Estudiantes, que muestra "Estadio 0.0" porque ese cero existe). **Ningún total cambia.** La otra
  mitad del punto (usar `lump_*` en vez del catch-all genérico) ya estaba hecha en la Versión 141.
- **To-do 20(f) cerrado.** Se recuperó la celda "Sueldos y cargas sociales" x "Fútbol profesional"
  del Anexo VIII de River: **$12.889.436.305**, el 16,3% de esa columna, que pasa de la fila "sin
  desglosar por la fuente" a `wages_squad`. La sesión anterior no había podido: las 4 páginas del
  Anexo están **rotadas 90°** en el escaneo, y OCRearlas sin enderezar mezcla columnas — que era
  exactamente el síntoma ("diferencias no explicadas") que la hizo abortar. Verificado por tres
  caminos: la fila suma exacto contra su total impreso, la fila de totales del Anexo coincide exacto
  con los 8 valores por área ya cargados, y una segunda fila al azar también cierra.
- **To-do 20(c) cerrado.** Los 16 hallazgos de signo invertido resultaron los 16 correctos, cada uno
  verificado contra su transcripción y silenciado con el motivo escrito. Cuatro son deducciones
  brasileñas impresas entre paréntesis; **Envigado fue el único que no traía ni paréntesis ni signo**
  y se resolvió sumando la nota entera: los 17 rubros dan 43.845.339.915 y el total impreso es
  36.888.980.382, o sea que se resta, exacto al peso. Los 11 de Vélez son la misma línea repetida:
  un crédito por capitalizar el costo de formar jugadores propios, no un gasto con el signo dado
  vuelta.
- **To-do 20(b), mitad cerrada.** El Anexo V de Instituto SÍ desglosa por sector (FUTBOL / BASQUET /
  LA AGUSTINA / SEDE / COLEGIO / TIENDA) en TODAS sus filas, no solo en las de personal — el archivo
  decía lo contrario. Con el desglose sin usar, 2.425,8 M ARS que el propio balance atribuye a
  sectores no-fútbol quedaban en el catch-all: **de 42% a 27%**. Lo que queda ahí es "Comisiones y
  acuerdos de rescisión" (19,6%, 100% de la columna FUTBOL, se queda por la decisión ya tomada sobre
  comisiones) y "Diversos" de fútbol, que el Anexo no abre más.
- **To-do 20(g) cerrado** por decisión de Guido: `isBoca2027` se queda. Silenciado con el motivo y
  con la condición para reabrirlo (el día que un segundo club traiga desglose por torneo).
- **To-do 39 cerrado**, opción (b) de Guido: se destrackean `finance-of-sports-project.md`,
  `CLAUDE.md` y `dudas-por-club.md`. Los otros 9 `.md` de la raíz siguen trackeados a propósito, son
  documentación del proyecto. Consecuencia aceptada y anotada: un clon nuevo del repo ya no trae
  `CLAUDE.md`.
- Reglas nuevas: "la fuente reporta cero" vs. "no lo desglosa" en `CONVENCIONES.md`, y el caso de la
  rotación de River en `club-data-mapping` §15.
- `node tools/audit.js` pasa de 20 P2 / 8 P3 a **2 P2 / 8 P3** (23 silenciados con motivo). Los 2
  que quedan son el catch-all de Vélez, diferido por Guido. `auditAll()` sigue en 228 checks, 0 no
  cierran. `ASSET_V` a 172.

## Versión 173: lo interno se saca en el deploy, no del repo — y las 5 cotizaciones van a la tabla

- **Se revierte el destrackeo de las Versiones 167 y 172 y se resuelve bien.** Lo levantó Guido:
  *"si pierdo la mac pierdo semanas de trabajo"*. Tenía razón — destrackear sacaba los archivos del
  sitio Y del respaldo en GitHub. Y la alternativa que propuso, hacer el repo privado, **no alcanza
  sola**: la privacidad del repo controla quién entra a GitHub, no qué sirve Netlify (verificado en
  producción: `financeofsports.com/CLAUDE.md` devuelve 200 hoy).
- **`netlify.toml` nuevo**, el primero del proyecto. Todo vuelve a estar trackeado —los 3 documentos
  de la raíz y las 613 notas de sourcing— y el deploy borra lo interno del artefacto antes de
  publicar. Simulado sobre una copia del repo: `index.html`, `data/` (49), `js/` (4) y las 41
  páginas `fuentes/<club>.html` intactas; los internos, fuera.
- **CORRECCIÓN A UN HALLAZGO DE ESTA MISMA SESIÓN: los 6 skills nunca estuvieron publicados.** Se
  habían reportado como expuestos (98 menciones a Guido). Netlify no publica archivos ni carpetas
  que empiezan con punto, así que `.claude/skills/` devuelve 404 en producción. Se verificó con
  `curl` antes de tocarlos; no hacía falta destrackearlos y no se hizo.
- **To-do 21(b) cerrado, y con esto el punto 21 entero.** Las 5 cotizaciones de Argentinos Juniors
  (2015-2019) pasan de estar escritas a mano en su archivo a `FX_CLOSE`, referenciadas con `fxRef`.
  Antes de moverlas se confirmó que de verdad son de mercado, que es lo que el to-do pedía: sus 3
  balances auditados no declaran tipo de cambio propio (no tienen Anexo de moneda extranjera, solo
  notas con partidas ya convertidas). No contradicen los `document_close` de San Lorenzo y Vélez
  para esas mismas fechas: 9,085 es el vendedor de mercado y 8,988 el comprador que declara cada
  documento — los dos lados del spread.
- Tres archivos (`CLAUDE.md`, `ESTADO.md`, `CONVENCIONES.md`) afirmaban "no hay `netlify.toml` ni
  `_redirects`". Corregidos en el acto, que es la regla que dejó el eje `docs` de la Versión 171.
- `info-adicional-todos-abiertos-borrar-luego.md` nuevo, a pedido de Guido: contexto por punto
  abierto para sesiones futuras, temporal. **Lo más importante que contiene: la premisa del to-do 33
  está vencida.** Medido contra `data/club-leagues/`, hay 3 rankings de liga viables hoy (J1 2025
  con 10 clubes, LaLiga 2025 con 9, Primera Argentina 2024 con 8), no cero.
- `node tools/audit.js` en 0 P0 / 0 P1 / 2 P2 / 7 P3. `ASSET_V` a 173.

## Versión 174: la grilla de "elegir clubes" de Mezcla tiene su propio filtro

- **To-do 38 cerrado.** La grilla de clubes del constructor de Mezcla suma un campo de filtro
  propio (`panelAgregar()` en `js/selector.js`), con el mismo markup y CSS que el buscador del
  modal (`.modal-busca`) pero creado dentro del panel: el `#modalQ` del modal principal no existe
  ahí, porque el constructor es otro modal a propósito.
- El filtro busca por nombre de club + país, y NO por liga: índice nuevo `indiceClubPais()`,
  separado de `indiceBusqueda()` (que incluye ligas) porque esta grilla imprime nombre + país en
  cada botón y nada más. Se invalida junto con el otro al abrir el modal.
- Los clubes ya marcados siguen arriba y nunca los filtra el texto; sólo se achica la lista de
  "resto". El aviso de "ningún club con ese nombre" aparece cuando no matchea ni un marcado.
- El texto del filtro y su "Mostrar más" viven en estado propio del panel (`mezclaQ`,
  `mezclaTodos`), no en el `mostrarTodos` de módulo que comparten las demás grillas: expandir acá
  ya no deja expandido el buscador del modal, ni al revés. `grillaConTope()` acepta ahora un
  `estado` opcional `{ver, expandir}` para eso.
- La grilla se repinta sin pasar por `renderModal()`, así el input no muere en cada tecla; el
  texto sobrevive igual a los repintados completos que dispara marcar un club.
- Claves nuevas `sel.mezcla.buscaph` y `sel.mezcla.nohits`, con su traducción en `data/lang/en.js`.
- `auditAll()` en 41 clubes / 228 checks / 0 que no cierran, `node tools/audit.js` en 0 P0 / 0 P1.
  `ASSET_V` a 174, `fuentes.html` y las 41 páginas de club regeneradas por el bump.

## Versión 175: el índice de países de `fuentes-por-club.md` se genera, no se escribe

- **To-do 35 cerrado.** `tools/generate-fuentes-index.js` nuevo: regenera la sección "Índice de
  países" de `fuentes-por-club.md` (las 44 líneas de país con sus 3 números, más el párrafo de
  totales) desde los propios `fuentes/_indice/<País>.md`. Hasta ahora esos números se habían
  escrito una vez con un script de un solo uso y se mantenían a mano después de cada sesión de
  sourcing. `--check` avisa si quedó vieja, `--debug` imprime la clasificación club por club.
- "Con documento encontrado" no es un campo sino prosa libre del agente de sourcing, así que se
  infiere con dos listas de regex (señales de SÍ / señales de NO), las mismas de la corrida
  original del 2026-09-20. Cuando una línea matchea señales de los DOS lados, o de ninguna, el
  script ABORTA con el detalle en vez de adivinar: la decisión se toma a mano y se escribe en
  `OVERRIDES`, adentro del script, con el motivo. Los 12 conflictos de la corrida original quedaron
  ahí. El script también avisa si un override ya no matchea ninguna línea, o si un país con clubes
  no tiene ninguna fecha de "Último chequeo".
- No usa marcadores START/END como `generate-club-index.js`: se ancla en el heading `## Índice de
  países` y en el bloque contiguo de líneas `- [`, para no tener que tocar el archivo al estrenarlo.
- Verificado: corrido sobre el estado actual del repo da 44 países / 530 clubes / 339 con documento
  —los tres números que ya estaban escritos— con `git diff` vacío, 0 líneas ambiguas y los 12
  overrides usados. Probado además que el camino de escritura restaura el archivo byte por byte
  después de ensuciarlo a mano.
- `PROMPT-generador-indice-fuentes.md` borrado: era el brief de esta sesión y ya cumplió. Se
  actualizaron sus dos referencias vivas (`PLAN-REMEDIACION-ESCALA.md`, que ahora manda al script, e
  `info-adicional-todos-abiertos-borrar-luego.md`); la de este changelog queda como histórica.
- El script sumado a la sección de herramientas de `ESTADO.md` y del skill
  `start-session-finance-of-sports-project`.

## Versión 176: `tools/audit.js` avisa si un .md nuevo de la raíz no está cubierto por netlify.toml

- **Chequeo nuevo, `doc-interno-no-excluido` (P2).** Surgió de un hallazgo lateral de la sesión del
  to-do 35: `PROMPT-generador-indice-fuentes.md` no estaba en el `rm -f` de `netlify.toml` y se
  hubiera publicado en `financeofsports.com/PROMPT-generador-indice-fuentes.md` — la misma falla que
  `netlify.toml` existe para evitar (`CLAUDE.md`, Versión 173), repetida una vez más sobre un archivo
  creado en la misma sesión que escribió esa advertencia. "Acordarse de sumarlo a la lista" ya falló
  al menos dos veces, así que ahora lo chequea una máquina: compara los `.md` de la raíz contra el
  `rm -f` de `netlify.toml` y reporta cada uno que falta.
- **No decide qué es interno**, eso lo sigue diciendo un humano: el hallazgo solo señala que un .md
  no está cubierto, y `tools/audit-ignore.json` sirve para marcar el que sea público a propósito.
- **Corrido hoy contra el repo, dio 8**: `ARQUITECTURA.md`, `CHANGELOG.md`, `CONVENCIONES.md`,
  `ESTADO.md`, `PLAN-REMEDIACION-ESCALA.md`, `QUE-ES-REAL-historico.md`, `TODO.md`,
  `fuentes-por-club.md`. Ninguno se agregó al `rm -f` ni se silenció: queda para que Guido decida
  cuál es contenido para el visitante y cuál es interno, archivo por archivo. Mientras tanto no
  bloquea nada (P2, `--quiet` sigue en verde) porque nada de esto llegó a producción todavía — el
  repo local sigue sin pushear desde antes de que `netlify.toml` existiera.

## Versión 177 — Cuántos equipos tuvo la liga, por temporada (to-do 23(b))

- `LEAGUE_SIZE_BY_YEAR` nuevo: (liga, ejercicio) -> cuántos equipos jugaron esa liga ese año, con
  `leagueSizeAt(liga, año)` y `leagueSizeCoverage()`. Las reglas en `data/club-leagues.js`, las
  filas en los mismos `data/club-leagues/<iso2>.js` autoregistrados, o sea el mismo cargador
  (`loadClubLeagues()`) y ni un pedido de red nuevo.
- **`LEAGUES[].totalClubs` ELIMINADO** de las 8 ligas de `data/leagues.js`, no llenado: un número
  suelto por liga es el mismo error que la regla "no existe ninguna arista club -> liga sin año"
  prohíbe para la membresía. La Primera argentina pasó de 20 a 30 equipos en el período cargado,
  así que ese número es falso en casi todas las temporadas. No tenía ningún consumidor.
- 3 liga-temporadas verificadas contra Wikipedia, las 3 que habilitan un ranking: `jp-j1` 2025 = 20,
  `es-laliga` 2025 (temporada 2024/25) = 20, `ar-primera` 2024 = 28. Cada una con su fuente y fecha
  anotadas en el archivo de su país.
- El caso argentino queda atado por escrito: el ejercicio 2024 cierra el 30/6 (o el 31/8, River) con
  el Campeonato de Primera División 2024 en curso, y la otra competencia de ese año calendario (Copa
  de la Liga Profesional 2024) la jugaron los mismos 28, así que el número no depende de cómo se lea.
- **Ninguna vista lo usa todavía, a propósito**: esto sienta el dato, el consumidor (el "N de M" del
  aviso de sesgo del benchmark) es el to-do 23(c)/33.
- `CONVENCIONES.md`, `ESTADO.md` y las cabeceras de `data/leagues.js` y `data/club-leagues.js`
  actualizados. ASSET_V 174 -> 177, constante + los 13 tags literales de `index.html`.
- `fuentes.html` y las 41 páginas de `fuentes/` regeneradas: llevan el ASSET_V adentro, así que
  dejarlas en 174 era justo la mezcla de versiones que la regla existe para evitar. El diff de las
  42 es solo eso más la fecha de generación.
- **Bug aparte, encontrado justo al regenerar esas páginas**: `tools/generate-fuentes-page.js`
  armaba la fecha del pie con `new Date().toISOString()`, que es siempre UTC, así que una corrida
  nocturna escribía "Generado desde los datos del sitio el <mañana>" — un día que todavía no pasó
  para quien lee la página. Ahora se arma de los getters locales. NO es el mismo bug que el del
  `--check` (commit 411beaf): aquel era un falso positivo al comparar, este es un día equivocado
  impreso en la página, y como `sinFecha` ignora el pie al comparar, no se delataba solo.
- OJO CON EL EFECTO DIFERIDO: `--check` y el escritor comparan con `sinFecha`, o sea que una
  diferencia de SOLO fecha nunca dispara una reescritura (deliberado, evita churn diario). Por eso
  las 42 páginas ya escritas siguen diciendo la fecha vieja hasta la próxima regeneración por un
  cambio de contenido real; ahí se corrigen solas.

## Versión 178 — Cada club se muestra con SU color, no con el azul del sitio

- To-do 23(e), con el alcance recortado a propósito: **solo color, no escudos-imagen** (una imagen
  hay que alojarla en el dominio propio, que es justo lo que un club puede objetar).
- `clubs[id].brandColor` nuevo en `data/clubs.js`: un hex por club, **39 de los 41**, verificado uno
  por uno contra su propia fuente — `theme-color`/CSS del sitio oficial del club donde lo declara
  (River #E30520, Vélez #0061A8, San Lorenzo #00325A, Independiente #EC1C24, Estudiantes #E41815,
  Ituano #E2041A), el infobox de Wikipedia en el idioma del país para el resto, y la `クラブカラー`
  que cada club declara —dato oficial de la J.League— para los 10 japoneses.
- **2 clubes quedaron SIN color a propósito, y el campo es opcional por eso**: `realmadrid` y
  `oncecaldas`. Los dos porque el color que los identifica es el BLANCO ("El color que identifica al
  club es el blanco", el Blanco Blanco) y un círculo blanco no se ve contra el fondo blanco del
  modal. Siguen con el azul del sitio, que es el fallback: un color equivocado se lee peor que
  ninguno. Decisión de Guido, en la misma consulta que resolvió los otros 3 casos dudosos: Sevilla
  (camiseta blanca, va con su rojo de marca #F43333), Rosario Central (bastones azul y amarillo en
  partes iguales, gana el azul del escudo #0A3D72) y Valencia (camiseta blanca, va con el naranja
  del murciélago #E23C07).
- `pintarCrest()` en `js/selector.js`: pinta el círculo en los 4 lugares donde existe (`.op-crest`
  de la fila del modal, `.arm-crest` del paso "ejercicio de cada club", `.cd-crest` del card de
  Comparar, `#cbCrest` del header) y, sin `brandColor`, RESETEA los estilos en vez de no hacer nada
  — `#cbCrest` es un solo nodo que se reusa en cada cambio de club, y sin el reset el visitante se
  quedaba con el color del club anterior.
- El color de las INICIALES se calcula, no se guarda: `textoSobre()` usa la luminancia relativa de
  WCAG y deja blanco mientras llegue a 4:1, negro cuando no. Dos reglas que se probaron y se
  descartaron, medidas en el navegador sobre los 39: un umbral fijo de luminancia dejaba blanco
  sobre el celeste de Racing y el de Kawasaki a 2,8:1 (ilegible), y "siempre el color de más
  contraste" partía a la familia de los rojos al medio (Independiente y Unión en negro, River y
  Estudiantes en blanco, con dos décimas de diferencia). Piso real que quedó: 4,11:1.
- Los colores muy claros (Club América, Mirassol) llevan un aro interno por `box-shadow`, no por
  `border`, para no cambiar el tamaño del círculo.
- ASSET_V 177 -> 178, constante + los 13 tags literales de `index.html`; `fuentes.html` y las 41
  páginas de `fuentes/` regeneradas, que lo llevan adentro.
- `clubs.js` pasa de ~404 a ~480 bytes por club (el campo + su comentario de cabecera), y es
  eager: es el precio del color en cada pageview.
- Verificado: `auditAll()` 41 clubes / 228 checks / 0 que no cierran, `node tools/audit.js` 0 P0 y
  0 P1, y los 4 círculos mirados en el navegador (incluido el fallback de Real Madrid entrando
  DESPUÉS de un club con color).

## Versión 179 — Resolver el color de un club nuevo es un paso del onboarding, no una barrida que se repite

- **`club-or-year-onboarding/SKILL.md` §3 punto 1b** (el punto donde se escribe la fila del club en
  `clubs{}`) ahora incluye `sport` y `brandColor` en la lista de campos —le faltaban los dos, de las
  Versiones 137 y 178— y suma el procedimiento para resolver el color de un club NUEVO. Un ejercicio
  nuevo de un club ya cargado no lo dispara: `clubs{}` solo se toca cuando el club es nuevo.
- **La jerarquía de fuentes quedó INVERTIDA respecto de cómo la contó la Versión 178**, y esa es la
  corrección de fondo. No es "sitio oficial → Wikipedia → liga" sino dos capas: primero la IDENTIDAD
  del color (infobox de Wikipedia en el idioma del país preguntando por los colores ACTUALES y por
  cambios históricos, o el color que declare la liga), y recién después el HEX, que se acepta solo si
  cae en esa familia. De los 41, el sitio oficial dio el hex en 6 casos; el orden viejo invita a la
  trampa contraria.
- Cuatro trampas ya pagadas, documentadas con su caso: el `theme-color`/CSS del sitio oficial sirve
  para precisar un color que ya sabés, no para descubrirlo (Real Madrid declara un violeta de su
  design system, Sevilla el azul de Bootstrap, Unión el rojo default de WordPress); nunca el primer
  color de la paleta de un agregador, que ordena por el ESCUDO y no por la camiseta (Kashima y
  Nagoya salen negros); el desempate de bicolores en 4 pasos; y la camiseta blanca con acento fuerte
  (~15% de los clubes), que es decisión de producto y va directo a Guido en vez de gastar fetches.
- **`brandColor: null` explícito** en `realmadrid` y `oncecaldas`, que antes no tenían el campo.
  `null` = "se miró y NO lleva color" (resultado cerrado, nadie lo completa a ojo después); campo
  AUSENTE = nadie lo chequeó. En pantalla son idénticos —`pintarCrest()` hace `if(!c)`— así que es
  cero cambio visible: existe para no tener que rebarrer los clubes de mañana para saber cuál es cuál.
- **Chequeo nuevo en `tools/audit.js`: `club-sin-color-ni-null` (P3)**, un club de `clubs{}` sin
  `brandColor` y sin `null`. Es lo que hace que el paso no dependa de que la sesión haya leído el skill.
- Regla nueva en `CONVENCIONES.md`: **un `brandColor` no se oscurece ni se retoca para que pase el
  contraste del círculo** — lo arregla `textoSobre()` (el TEXTO) o el aro interno, o se va a `null`.
- `auditoria-finance-of-sports/SKILL.md`: el eje `datos` suma qué mirar del color que el script no
  puede (que el hex sea el de la camiseta y no el del escudo), y la sección 6 suma el falso positivo
  "un club sin color es un dato faltante", que no lo es si dice `null`.
- ASSET_V 178 → 179, constante + los 13 tags literales; `fuentes.html` y las 41 páginas de `fuentes/`
  regeneradas, que lo llevan adentro. Lo pidió el propio `audit.js` (`asset-v-sin-subir`, P1), aunque
  el cambio de `data/clubs.js` sea de comportamiento nulo.
- To-do 37 nuevo: los 39 clubes que YA tienen color no tienen anotada su procedencia (32 son
  "agregador" en genérico), y `boca` es el único hex que no salió literal de una fuente.
- Verificado: `node tools/audit.js` 0 P0 y 0 P1; `auditAll()` 41 clubes / 228 checks / 0 que no
  cierran; en el navegador, River (rojo) → Real Madrid (`null`, resetea al azul del sitio) → Racing
  (celeste con iniciales negras), sin errores de consola; y el chequeo P3 probado en negativo,
  sacándole el campo a un club y viéndolo aparecer.

## Versión 180 — La procedencia del color de los 39 clubes que ya lo tenían (to-do 37)

- Los 39 clubes con `brandColor` ya tienen su procedencia escrita en `fuentes/<País>/<Club>.md`,
  una línea por club, en el formato que la Versión 179 dejó fijado para el onboarding de un club
  nuevo: `Color de marca: #XXXXXX — <fuente>, verificado AAAA-MM-DD`. Aplicación retroactiva del
  criterio existente, no un criterio nuevo. Nada en `data/clubs.js`, que es eager.
- De dónde salió cada hex, identificado y verificado contra la fuente el 2026-09-21: 5 del sitio
  oficial del club (River por su CSS, Vélez/San Lorenzo/Independiente por `theme-color`,
  Estudiantes por su CSS), 20 de las tablas por liga de footylogos (11 de Argentina, 5 de
  Brasil, 8 de LaLiga, Liga MX y Primera A colombiana), 9 de la paleta de logotyp.us (japoneses),
  2 de teamcolorcodes (Sevilla y Atlético Goianiense, que no están en las tablas de footylogos)
  y 1 del infobox de ja.wikipedia (Cerezo, el único japonés cuyo rosa #FA1A82 no está en
  logotyp.us).
- **`boca` (`#0A2B5C`) documentado como lo que es**: el único de los 39 que NO salió literal de
  ninguna fuente externa, sino del `--azul` histórico del sitio. Su línea lo dice explícitamente
  en vez de citar una fuente que no existe.
- **`ituano` (`#E2041A`) es el único que no se pudo re-verificar**: `ituanofc.com.br` devuelve
  503 y ningún agregador tiene página del club. Queda registrado así, con la capa 1 (identidad
  rubro-negra) sí confirmada.
- Los 10 japoneses llevan además la クラブカラー que declara el club (infobox de ja.wikipedia,
  citando el perfil de la J.League), que es lo que justifica por qué en Kashima y Nagoya el hex
  es el 3er color de la paleta y no el 1°, y el desempate de los bicolores de Gamba y FC Tokyo.
- Ningún hex quedó fuera de la familia que dicta la capa 1 del criterio, así que no se tocó
  ningún color ni se agregó nada a `dudas-por-club.md`.
- Sin ASSET_V nuevo: no se tocó `js/`, `data/` ni `index.html`. `fuentes/**/*.md` no se publica
  (`netlify.toml`), así que no hay cambio en el sitio.
- Verificado: `node tools/audit.js` 0 P0 y 0 P1; `generate-fuentes-page.js --check`,
  `generate-fuentes-index.js --check` y `generate-club-index.js --check` los tres al día.

## Versión 181: dos altas en TODO.md, sin tocar el sitio

- **To-do 39 nuevo**: evaluar reemplazar el círculo de iniciales con color de marca (Versiones
  178-180) por lo que hace soccerassociation con la identidad de cada club. Pedido de Guido al
  cerrar el to-do 37. Antes de definir alcance hay que ver qué hace esa página en concreto — si
  termina siendo un escudo-imagen, vuelve a cruzar la pregunta de derechos/hosting del 23(e)
  original.
- El to-do 23(c) (vista de liga) suma una etapa de research y prototipo ANTES de tocar el motor
  real: mirar cómo otras páginas (deportivas y no deportivas) comunican "qué se puede hacer acá"
  con rankings y números, escribir una recomendación, y armar un prototipo HTML en `Prototyping/`
  para que Guido lo vea antes de cualquier cambio al sitio — no quedó como entrada propia acá
  porque no cierra nada, solo cambia CÓMO se va a encarar esa sesión.
- Sin ASSET_V nuevo: no se tocó `js/`, `data/` ni `index.html`.

## Versión 182: los rankings de liga, precalculados (tanda 1 de 3 del to-do 23(c)/33)

- **`tools/generate-rankings.js` nuevo**: corre el motor real (`computeYearGeneric()` +
  `simplifiedReportForClub()` en un contexto de `vm`, mismo loader que `tools/audit.js`) y
  escribe el ranking de ingresos de cada liga-ejercicio en **`data/rankings/<liga>.js`**, un
  archivo por liga. 8 ligas, 27 liga-ejercicios, 82 filas de club, 39 KB crudos / **5 KB gzip**.
- Por qué precalculado y no en vivo: medido archivo por archivo, un ranking en vivo cuesta 18 KB
  gzip (J1 2025, 10 clubes), 29 KB (LaLiga 2025, 9) y **101 KB (Primera 2024, 8** — Racing trae 16
  ejercicios y el ranking usa uno). Detrás de un click eso se paga; el ranking de Inicio lo paga
  todo visitante, incluido el que rebota, y hoy el sitio no baja ni un `data/<club>-data.js` eager.
- **`data/destacados.js` nuevo**: la lista curada a mano de hasta 10 (liga, ejercicio) para la
  vidriera de Inicio. Arranca con `jp-j1` 2025, `es-laliga` 2025, `ar-primera` 2024 y `br-serieB`
  2024. Decisión de Guido: se eligen discrecionalmente, no por una regla de "más de N clubes".
- **`tools/audit.js` suma `checkRankings()`**, con 5 hallazgos nuevos: `rankings-desfasado` (P1,
  le pregunta al generador con `--check` en vez de reimplementar la comparación),
  `rankings-sin-generar` (P1), `destacado-sin-ranking` (P1), `destacado-de-un-club` (P2) y
  `destacados-de-mas` (P2). Es P1 porque `data/rankings/` es lo único del proyecto que guarda
  NÚMEROS DE PLATA copiados: un metadato viejo se nota, un ingreso viejo se publica.
- **Bug encontrado y arreglado en el propio generador**: filtrar la composición por `> 0` tiraba
  los buckets NEGATIVOS, que son reales — Botafogo 2024, Cruzeiro 2025 y Envigado 2025 reportan
  ingreso bruto y después una línea de deducciones (`Deduções sobre a receita`, `Impostos e
  contribuições`, `Devoluciones, rebajas y descuentos`). La composición de Cruzeiro sumaba 119,7 M
  USD contra un total de 114,1. Ahora se descartan solo los ceros exactos, y el generador **aborta**
  si el desglose de un club no cierra contra su propio ingreso.
- Segundo bug del mismo tipo, cazado comparando `--print` contra la ficha de Finanzas:
  `reportType`/`sourceId`/`yearLabel` se leían de `yearMetaFor()`, que devuelve SOLO moneda y tipo
  de cambio. Los 82 ejercicios `official_balance_sheet` quedaban etiquetados "Ejercicio 2023/2024"
  en vez de "Balance 2023/2024". Ahora salen de `computeYearGeneric()`.
- `ESTADO.md`: los conteos de `audit.js` decían "2 P2, 8 P3" desde hacía varias versiones; medido
  hoy son 10 P2 y 7 P3, los mismos antes y después de esta tanda.
- **El sitio no cambió en nada**: ni `index.html` ni `js/` referencian los archivos nuevos todavía,
  así que no hay ASSET_V nuevo. Las pantallas son las tandas 2 (pestaña Ligas) y 3 (Inicio).
- Verificado: `node tools/generate-rankings.js --check` al día; `node tools/audit.js` 0 P0 y 0 P1,
  sin agregar ni un hallazgo contra el baseline; los 82 desgloses cierran contra su ingreso; los
  totales por liga dan 550,5 M USD (J1 2025), 3.971,8 (LaLiga 2025) y 503,7 (Primera 2024), iguales
  a los calculados a mano contra el motor antes de escribir el generador.

## Versión 183: la pestaña Ligas (tanda 2 de 3, cierra el to-do 23(c))

- **Pestaña nueva "Ligas"** (`<section id="liga">` + `js/liga.js`): el ranking de ingresos de los
  clubes de una liga en UN ejercicio. Barras verticales ascendentes, cada una en el `brandColor`
  del club (Versión 178) y con su número escrito arriba; abajo la tabla con puesto, club,
  ingresos, ejercicio y tipo de documento; abajo de todo las salvedades. Va antes de Finanzas en
  el nav y está en `TABS_SIN_CLUB`: una liga no necesita club activo.
- **No baja ni un `data/<club>-data.js`**: lee `data/rankings/<liga>.js` (Versión 182), entre 1 y
  3,4 KB gzip por liga.
- **El ejercicio por defecto es el que MÁS clubes tiene, no el más reciente.** Los balances tardan
  en publicarse, así que el último ejercicio es siempre el más flaco: la Primera argentina abre en
  2024 (8 clubes) y no en 2025 (5). El selector de ejercicio dice cuántos clubes trae cada año.
- **"N de M" solo cuando `leagueSizeAt()` lo sabe.** En 24 de las 27 liga-temporadas devuelve
  `null` y la pantalla dice cuántos clubes tiene cargados y que no está verificado de cuántos son.
- **Salvedades derivadas del dato, no escritas a mano**: cuántos clubes faltan, cuáles ejercicios
  son PRESUPUESTOS (San Lorenzo 2024 está 7º en el ranking argentino), cuáles vienen de una copia
  no oficial (River 2024, que es el 1º), y qué porcentaje del ranking no está desglosado por club
  (43% en la J1, 29% en la Primera).
- **Estado frío**: entrar por el nav sin liga elegida muestra la grilla de las 8 ligas. `LEAGUES`
  es eager, así que no cuesta un pedido de red.
- Cada barra y cada fila de la tabla llevan a Finanzas de ese club; la columna Documento linkea a
  `fuentes/<clubId>.html`, que ya existe generado.
- **El selector ahora puede terminar en una liga** (`js/selector.js`): `confirmar('liga')` nuevo,
  hook `pickLeague` nuevo, y el card final ofrece "Ver el ranking de ingresos de X".
- **El buscador del modal ofrece ligas SIEMPRE**, no solo en el camino de Comparar. El motivo que
  lo limitaba ("Finanzas muestra un club por vez") dejó de ser cierto al existir esta pantalla:
  buscar "LaLiga" desde el botón del header devolvía sus 9 clubes y no la liga.
- **`pasosActivos()` respeta `tipo === 'liga'` viniendo de Finanzas.** Sin esto, elegir una liga
  desde el buscador dejaba el estado marcado con una liga y los pasos mostrando clubes.
- En el camino que termina en Ligas, el paso de temporada es de **una sola** temporada y **no
  muestra el agregador** Promedio/Suma: los dos son conceptos de Comparar. Y un prellenado que
  nadie tocó deja decidir a la vista, para que la misma página no abra en 2024 por el nav y en
  2025 por el selector.
- **`tools/audit.js` suma `checkGenerados()`**, que corre el `--check` de los 4 generadores y
  reporta P1. Salió de un problema real de esta sesión: `generate-fuentes-page.js` LEE `ASSET_V`
  de `index.html`, así que subirlo desactualiza las 42 páginas de fuentes sin tocar ningún dato y
  sin que nada se vea roto. Cuesta 0,2 s.
- **`data/rankings/` dejó de guardar `yearLabel`**: era un string de presentación en castellano
  ("Balance 2024/2025") y congelarlo lo volvía intraducible. La vista lo arma en runtime con
  `window.ejercicioLabel()`, que no necesita cargar ningún data file.
- **ASSET_V 179 → 183**, constante y los 14 `<script src>`; `fuentes.html` y las 41 páginas de
  club regeneradas por el mismo motivo.
- `data/lang/en.js`: 33 claves nuevas (`liga.*`, `nav.liga`, `sel.toliga`, `sel.liga.res`).
- **Inicio no se tocó**: sigue mostrando la bifurcación y el resumen del club activo. Eso es la
  tanda 3.
- Verificado en el navegador, en castellano y en inglés: las 8 ligas, el caso de `leagueSizeAt()`
  en null (Série B), el de un solo club (Liga MX), el flujo entero desde el buscador, y el click
  de una fila a Finanzas. `auditAll()` 41 clubes / 228 checks / 0 que no cierran / 0 warnings;
  `node tools/audit.js` 0 P0 y 0 P1; los 4 generadores al día.

## Versión 184: Inicio es la pregunta y la vidriera de rankings (tanda 3 de 3, cierra el to-do 33)

- **Inicio deja de mostrar el club activo.** Se borró `#inicioClub` entero: los 4 KPIs y los 3
  gráficos de evolución. Decisión de Guido (2026-09-22): "en Inicio quedan las ligas que dejamos
  predeterminadas como para mostrar de qué es capaz y qué tiene la página… nada más, no información
  del equipo que el usuario tenga por default". No se mudaron a ningún lado; dos de los tres
  gráficos ya duplicaban al `trendChart` de Finanzas, que sigue donde estaba.
- **La vidriera**: abajo de la bifurcación, hasta 10 bloques de ranking, uno por entrada de
  `data/destacados.js` (hoy 4: J1 2025, LaLiga 2024/25, Primera 2024 y Série B 2024). Cada bloque
  es el encabezado con su "N de M", el gráfico, el aviso de cuánto no está desglosado y un "Ver la
  liga ›". El resto de las salvedades vive en la pestaña de cada liga: una portada con seis
  advertencias abajo de cada gráfico no se lee.
- Los 4 `data/rankings/<liga>.js` se bajan **en paralelo** al pintar Inicio: ~6,5 KB gzip, contra
  los ~150 KB que costaría calcular los mismos 4 rankings desde los `data/<club>-data.js`. **Sigue
  sin bajarse ningún archivo de club en la portada.**
- `js/liga.js` lleva ahora **dos registros separados de instancias de Chart.js** (`liga` y `dest`):
  las dos pantallas conviven, y repintar una no puede dejar los 4 canvas de la otra en blanco.
- **BORRADO DE CÓDIGO MUERTO, 430 líneas.** `js/finanzas-render.js` pasa de 1.467 a 1.101 líneas
  (`renderInicioStats`, `renderInicioCharts` y sus 8 helpers de gráfico, más `informaDeuda`,
  `ultimoEjercicioCon` y `goToFinanzasYear`); `js/finanzas-calc.js` de 764 a 700
  (`INICIO_GASTOS_BUCKETS`, `lastAvailableYearForClub`, `inicioStackedSeriesForClub`,
  `inicioDeudaSeriesForClub`). Se conservan `INICIO_INGRESOS_BUCKETS` (su consumidor real hoy es
  `colorDeRubro()` de la pestaña Comparar) y, como decisión explícita, `allYearsRangeForClub()` y
  `yearKindForClub()` — ver el to-do 43.
- Se limpiaron además las 3 reglas CSS de `.inicio-legend*`, los 5 comentarios que quedaron
  apuntando a funciones borradas (en `finanzas-calc.js`, `finanzas-render.js`, `liga.js` y
  `tools/generate-club-index.js`) y **13 claves muertas de `data/lang/en.js`** (`inicio.*`,
  `stat.*`, `liga.clubs`): 368 → 362, con 3 nuevas (`vid.*`).
- **ASSET_V 183 → 184**, constante y los 15 `<script src>`; `fuentes.html` y las 41 páginas de club
  regeneradas, porque su generador lee ASSET_V de `index.html`.
- `data/destacados.js` pasa a cargarse eager (es la portada, y son ~20 líneas).
- Las barras llevan `maxBarThickness:64`: con 3 clubes (el Brasileirão Série B 2024) Chart.js
  repartía todo el ancho entre las 3 y salían del tamaño de un cartel, leyéndose como una
  infografía y no como un ranking flaco, que es lo que es.
- Verificado en el navegador, en castellano y en inglés: los 4 bloques dibujan, "Ver la liga ›"
  aterriza en la pestaña con esa liga y ese ejercicio, un click en una barra lleva a Finanzas de
  ese club, el cambio de idioma repinta las dos pantallas sin dejar canvas vacíos, y con un club
  elegido Inicio sigue sin mostrar nada de ese club. `auditAll()` 41 clubes / 228 checks / 0 que no
  cierran / 0 warnings; `node tools/audit.js` 0 P0 y 0 P1; los 4 generadores al día; cero
  `ReferenceError` en consola.

## Versión 186: los 4 últimos textos que se veían en castellano en medio de una tabla en inglés (cierra el to-do 42)

- **`tierLabel()`** (`data/leagues.js`): "1ª división"/"2ª división" ahora pasan por `I18N.t()`
  (`league.tier1`/`league.tier2`). Solo 2 claves, no una plantilla con placeholder: LEAGUES no
  tiene hoy ningún tier 3+, y el ordinal en inglés (1st/2nd/3rd...) no se puede derivar del número
  como en castellano, así que un tier futuro que no existe todavía se queda en castellano hasta
  que haga falta. Se ve en la grilla de la pestaña Ligas y en el selector.
- **`ejercicioLabel()`** (`js/finanzas-calc.js`): el prefijo ("Balance"/"Presupuesto"/"Ejercicio")
  pasa por `t()`, el año se sigue concatenando en JS aparte (`ejercicio.balance`/`ejercicio.budget`/
  `ejercicio.default`) — mismo orden de palabras en los dos idiomas, así que alcanza con el patrón
  ya usado en `js/liga.js` (`t('liga.exercise','Ejercicio') + ' ' + year`), sin hacer falta el
  patrón `{a}`/`{b}` de `debtDisclosureNote()`. Se ve en Finanzas, en la tabla de Ligas y en tooltips.
- **Los avisos por tipo de reporte** (banner de calidad de dato de Finanzas,
  `renderDataQualityBannerForCurrentSelection()` en `js/finanzas-render.js`): los 4 mensajes
  (`pending_official`/`press_estimate`/`unofficial_mirror`/placeholder) pasan a claves enteras
  (`finanzas.banner.*`), no fragmentos — mismo motivo que `debtDisclosureNote()`.
- **Los buckets de "Formato simplificado" NO se tocaron: ya estaban traducidos** (`tLabel()` +
  `data/site-labels.js`, desde la Versión 115). La cabecera de `data/lang/en.js` los seguía
  listando como pendientes por error; se corrigió el comentario. De paso se sacó "los nombres de
  gestión" de esa misma lista de pendientes: son apellidos y años reales (`gestionesByClub` en
  `data/clubs.js`, ej. "Ameal (2019-2023)"), no copy del sitio — mismo criterio que los rubros de
  "Formato del club", estaban mal clasificados ahí.
- 9 claves nuevas en `data/lang/en.js` (363 → 372).
- Encontrado al verificar en el navegador, fuera de los 4 puntos del to-do: `anioDropdownSuffix()`
  (el sufijo " (Presupuesto)"/" (Balance)" del `<select>` de ejercicio en Finanzas) tiene el mismo
  problema y no pasa por `ejercicioLabel()`. No se tocó en esta pasada — queda como to-do 44.
- **ASSET_V 185 → 186**, constante y los 15 `<script src>`; `fuentes.html` y las 41 páginas de
  club regeneradas. La Versión 185 (to-do 41, otra sesión sobre el mismo working tree) ya había
  subido ASSET_V a 185 y cubría estos 3 archivos, pero para cuando esta entrada se cerró esa
  versión ya estaba commiteada — subir de nuevo a 186 es lo correcto para los cambios de ESTA
  entrada, hechos después de ese commit.
- Verificado en el navegador, en inglés: ningún texto de los 4 puntos queda en castellano (Ligas,
  Finanzas, banner de calidad de dato, Formato simplificado); en castellano, todo idéntico a antes.
  `node tools/audit.js`: 0 P0, 0 P1 (igual que antes de esta sesión).

## Versión 185: la deducción negativa ya no se pierde en "Composición de ingresos" (to-do 41)

- `mezclaDe()` (`js/selector.js`) filtraba `r.value > 0` y tiraba enteros los buckets
  negativos reales: Botafogo 2024, Cruzeiro 2025 y Envigado 2025 informan ingreso bruto y
  una línea de deducciones aparte que cae en el catch-all y queda negativa. El card
  "Composición de ingresos" de Comparar calculaba sus porcentajes sobre ese total inflado
  (119,7 M USD contra 114,1 oficiales para Cruzeiro, ~5% de error). Filtro cambiado a
  `r.value !== 0`, mismo criterio que ya usaba `tools/generate-rankings.js` para el mismo
  dato (Versión 182).
- `cardMezcla()` reescrito para que la barra apilada represente la deducción: los rubros
  positivos se escalan al bruto (mismo % que mostraban antes del bug) y la deducción se
  dibuja como una franja rayada roja (`.mix-seg-neg`, reusa `--red`) superpuesta al final de
  la barra, no como un segmento más de la pila — un stacked bar no tiene forma honesta de
  apilar un segmento negativo. El número al costado de cada barra pasa a ser el NETO (suma
  de todos los rubros, positivos y negativos), que es el dato correcto. Leyenda nueva
  ("Deducciones sobre el ingreso bruto") solo cuando aplica.
- La decisión de cómo dibujar la deducción se le preguntó a Guido en el chat antes de
  tocar el render: la solución de la pestaña Ligas para el mismo problema (barras de un
  color sólido) no aplicaba acá sin perder el propósito del card, que es justamente mostrar
  la composición.
- `cmp.mix.deducciones` nueva en `data/lang/en.js`.
- ASSET_V 184 → 185, constante y los 15 `<script src>`; `fuentes.html` y las 41 páginas de
  club regeneradas.
- Verificado en el navegador: Comparar con Cruzeiro (Balance 2025) contra Boca (Presupuesto
  2026/2027) — el total de Cruzeiro en "Composición de ingresos" pasa a ser 114,1 M USD (no
  119,7), con la franja de deducción visible al final de su barra y el tooltip mostrando
  "Otras secciones deportivas y otros ingresos: −5,6 M USD". Confirmado por consola que
  Botafogo 2024 y Envigado 2025 también cierran ahora (`mezclaNeto === revenue` en los tres).
  `node tools/audit.js`: 0 P0, 0 P1.

## Versión 187: el sufijo del `<select>` de ejercicio en Finanzas, traducido (cierra el to-do 44)

- **`anioDropdownSuffix()`** (`js/finanzas-calc.js`): las 4 palabras (" (Presupuesto)"/" (Balance)"/
  " (Presupuesto y Balance)"/" (Placeholder)") pasan por `t()`. Queda como función aparte de
  `ejercicioLabel()` (que traduce el prefijo del header de la tabla desde el to-do 42), a propósito:
  comparten concepto pero no texto — "Presupuesto y Balance" y "Placeholder" no tienen equivalente
  en `ejercicioLabel()`.
- 4 claves nuevas en `data/lang/en.js` (372 → 376): `ejercicio.dropdown.budget`,
  `ejercicio.dropdown.budgetAndBalance`, `ejercicio.dropdown.balance`, `ejercicio.dropdown.placeholder`.
- **ASSET_V 186 → 187**, constante y los 15 `<script src>`; `fuentes.html` y las 41 páginas de club
  regeneradas.
- Verificado en el navegador, en inglés: el `<select>` de ejercicio de Boca (Budget/Balance) y de
  Racing (Budget and balance sheet, todas las combinaciones) ya no muestra nada en castellano; en
  castellano, idéntico a antes. `node tools/audit.js`: 0 P0, 0 P1 (igual que antes de esta sesión).

## Versión 188: el header móvil ya no desborda a 375px, y 3 decisiones de Guido sin código

- **To-do 26 cerrado, opción (a).** `.header-right` (moneda, botón de club, contacto, idioma) ya
  no comparte una sola fila sin envolver: dentro del breakpoint de 900px pasa a ser su propia fila
  completa (`flex-basis:100%`, antes compartía fila con `.logo` y el 100% de sus hijos era 100%
  de ese ancho angosto, no de la pantalla — el primer intento truncaba el nombre del club) y el
  botón de club, adentro, se queda con esa fila para él solo. Verificado en el navegador a 375px:
  `document.documentElement.scrollWidth` pasa de 494 a 383 (los 8px que quedan son un desborde
  previo de 1 carácter en "Mi Cuenta" del nav, ajeno a este to-do, no se tocó). A 800px y en
  desktop, sin cambios.
- **To-do 43 cerrado: se quedan.** Decisión de Guido — `allYearsRangeForClub()` y
  `yearKindForClub()` (`js/finanzas-calc.js`) siguen sin consumidor pero no se borran. El comentario
  que los explica se actualizó para que ninguna sesión futura vuelva a hacer la misma pregunta.
- **To-do 23(f) cerrado: la premisa estaba vencida.** El botón "Comparar" del header no abre
  ningún panel de elegir club — funciona sin club activo desde la Versión 144 (`applyClubMode()`,
  `TABS_SIN_CLUB`). Verificado en frío (localStorage vacío): Comparar se abre directo con sus dos
  cards vacíos. El punto se escribió en la Versión 137, antes de ese cambio, y nunca se actualizó.
- **To-do 40 cerrado: se deja como está.** Decisión de Guido — el nav queda Inicio · Comparar ·
  Ligas · Finanzas · Fuentes · Mi Cuenta, sin renombrar.
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md`: el peso de `TODO.md` en la
  tabla de arranque, 19 KB → 14 KB (los 4 puntos cerrados en esta versión lo achicaron).
- ASSET_V 187 → 188, constante y los 15 `<script src>`; `fuentes.html` y las 41 páginas de club
  regeneradas. `node tools/audit.js`: 0 P0, 0 P1.

## Relevamiento del negocio no futbolístico (sin número de versión: no toca el sitio)

- `auditorias/2026-09-22-catchall-no-futbol.md`: relevamiento de las 2.412 líneas de
  `revenueLines`/`expenseLines` de los 41 clubes (85 ejercicios) buscando negocio NO futbolístico,
  pedido de Guido antes de decidir el to-do 20(b). **13 clubes lo tienen con plata invisible en el
  catch-all de Ingresos, no 2** — los 11 argentinos cargados (11 de 11), Botafogo y Envigado.
- El hallazgo de fondo: las 3 filas que la Versión 53 agregó para que el catch-all no se coma lo que
  no es plantel profesional existen solo del lado de GASTOS. Ingresos tiene 7 filas, todas de fútbol,
  y `other_income`/`other_sports`/`youth_football`/`womens_football` caen enteras al catch-all. Por
  eso el precedente de Instituto (Versión 172) no aplica a Vélez: aquel recategorizó a
  `youth_other_sports_expense`, que SÍ tiene fila.
- Se midió el costo de la regla de la Versión 53: una fila nueva de ingresos no futbolísticos
  mostraría plata real en **60 de los 85 club-ejercicios**, "—" en 13 (regla `unknown` de la
  Versión 172) y `$0` literal en solo 12. La premisa de "la mayoría en $0" que frenaba la decisión
  no se sostiene.
- Dos hallazgos laterales, independientes de la decisión: "derechos de formación / mecanismo de
  solidaridad" está en `player_sales` (fila visible) en 7 clubes y en `youth_football`/`other_income`
  (catch-all) en otros 7; y el 48% de lo que queda en el catch-all de Ingresos son líneas genéricas
  que la propia fuente no abre (Racing es el caso extremo: ninguna fila nueva lo mejora).
- **Nada implementado.** El to-do 20(b) sigue abierto hasta que Guido decida sobre las tres
  alternativas del documento.

## Versión 189: "Estadio" es una fila sola, y el colegio de un club deja de ser "otros"

- **Formato simplificado, Ingresos: "Estadio: recaudación de partidos" pasa a "Estadio" a secas y
  absorbe los abonos y el uso/alquiler del estadio** (decisión de Guido). Es UNA fila con
  `matchday_competition` + `season_tickets` + `stadium_other`, y el acordeón las separa con el
  `rawLabel` de cada club. La fila "Abonos" deja de existir. Boca 2026/27 pasa a mostrar su estadio
  como el 35,0% del club, un número que antes no estaba en ninguna fila.
- **Dos filas nuevas de Ingresos: "Educación" y "Otras secciones deportivas"**, espejo de las que
  la Versión 53 creó del lado de Gastos. El catch-all pasa a **"Otros ingresos"** a secas.
  Categorías nuevas: `education` y `stadium_other` (`data/category-map.js`).
- **`ABONOS_DENTRO_DE_ESTADIO`** (`js/finanzas-calc.js`), a pedido de Guido: la fusión de abonos se
  revierte cambiando `true` por `false` + `node tools/generate-rankings.js`, **sin tocar ningún
  archivo de datos**. Los colores y las claves i18n de "Abonos" y "Estadio: recaudación de
  partidos" quedan vivas para eso. Probado en los dos estados.
- **97 líneas recategorizadas en 10 clubes**, ningún monto tocado. El catch-all de Ingresos: los
  club-años con ≥20% bajan de 27 a 10; Vélez 2016, de 48,6% a 24,4%. Los 2 hallazgos P2 de
  `catchall-dominante` se cierran (audit.js: 10 P2 → 8).
- **Athletic Club, error viejo destapado por la fusión**: "Ingresos deportivos" (139,5 M€, 82% del
  club) estaba entero en `matchday_competition` y contenía los 72,7 M€ de televisación — el sitio
  mostraba "Televisión 0,0" para el Athletic. Abierto en los 5 conceptos de la Nota 21.4 de sus
  cuentas, que suman exacto el mismo total.
- `CONVENCIONES.md`: la regla de la Versión 49 ("Estadio" y "Abonos" son 2 filas) queda reemplazada
  y se conserva como historia. Actualizados los 2 skills que nombran las filas, `dudas-por-club.md`
  (6 clubes con alquileres sin especificar, más la duda vieja de Vélez) y
  `auditorias/2026-09-22-catchall-no-futbol.md` con lo que se decidió.
- To-do 20(b) cerrado. Nuevos: 40 (CMS sin código), 41 (la vidriera de Inicio dibuja sus gráficos
  dos veces, bug preexistente), 42 (Ingresos tiene fila "Educación" y Gastos no).
- `auditAll()`: 41 clubes, 228 checks, 0 que no cierran, 0 warnings de fx. `node tools/audit.js`:
  0 P0, 0 P1. ASSET_V 188 → 189, los 4 generados al día.

## Versión 192: la vidriera de Inicio deja de dibujar sus gráficos dos veces

- **To-do 41 cerrado.** `grafico()` (`js/liga.js`) creaba el `<canvas>` de forma síncrona pero
  pintaba el `Chart` adentro de un `setTimeout`, y ese callback volvía a buscar el canvas con
  `document.getElementById(canvasId)` en vez de usar la referencia que la misma llamada ya tenía.
  Al cargar Inicio, `LIGA_VIEW.refresh()` se llama dos veces muy cerca una de otra (la explícita de
  `index.html` y la que dispara `I18N.init()` al detectar el idioma del navegador): el segundo
  `matarCharts('dest')` corría ANTES de que el `setTimeout` del primer render llegara a poblar
  `instancias.dest`, así que no destruía nada — y como los `canvasId` se repiten
  (`vidChart0`..`vidChart3`), el `getElementById` del primer batch, deferido, terminaba
  encontrando el canvas NUEVO del segundo batch y los dos Chart.js competían por el mismo
  elemento: "Canvas is already in use" × 4 en cada carga.
- Arreglado usando la referencia `cv` (el canvas que esa llamada creó) en vez de re-consultar el
  DOM por id, más un `Chart.getChart(cv)` defensivo antes de pintar — destruye cualquier chart que
  ya esté atado a ESE canvas puntual, sin depender solo del array `instancias`. Mismo `grafico()`
  sirve a la pestaña Ligas y a la vidriera de Inicio; los dos se probaron.
- Verificado en el navegador (pestaña nueva, sin el historial de consola de pruebas previas):
  carga en frío con el idioma del navegador en inglés — 0 errores de "Canvas is already in use"
  (antes, 4 en cada carga). Tres cambios de idioma seguidos después, tampoco. Los 4 gráficos de
  Inicio y el de la pestaña Ligas renderizan bien en las dos pasadas.
- ASSET_V 189 → 192 (se saltea 190/191, que no tocaban `js/`/`data/`), constante y los 15
  `<script src>`; `fuentes.html` y las 41 páginas de club regeneradas (`checkGenerados()` lo pedía
  como P1, ya resuelto). `node tools/audit.js`: 0 P0, 0 P1.

## Versión 193: to-do 39 en pausa con research hecho, to-do 40 en pausa

- To-do 39: el research de `auditorias/2026-09-22-camiseta-vs-circulo-selector.md` (ilustración de
  camiseta por club vs. el círculo de `brandColor`) queda citado en `TODO.md` con su recomendación
  (generador paramétrico, no réplica manual; piloto acotado sobre los ~27 clubes con color
  repetido antes de barrer los 41; la pregunta de derechos sigue abierta para Guido). Decisión de
  Guido: no retomar antes de ~un mes.
- To-do 40 (CMS sin código): mismo criterio, en pausa ~un mes.
- Sin ASSET_V nuevo: no se tocó `js/`, `data/` ni `index.html`.

## Versión 194: "Educación" también del lado de Gastos (cierra el to-do 42)

- `education_expense` nueva en `data/category-map.js`, y fila "Educación" en
  `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` (`js/finanzas-calc.js`), al lado de "Otras secciones
  deportivas" — espejo de la fila que Ingresos ya tenía desde la Versión 189. Hasta acá el sitio
  mostraba cuánto INGRESA un colegio de club pero no cuánto CUESTA, así que no se podía leer el
  margen del negocio.
- BUG evitado antes de que llegara a producción: `computeYearGeneric()` sumaba
  `youth_other_sports_expense`/`admin_general_expense`/etc. a `otherExpenses` a mano por nombre de
  categoría — el mismo bug que ya había pasado una vez al crear esas 3 categorías en la Versión 53
  (plata que desaparecía de todo cálculo del sitio, no solo de `verifyTieOuts()`). Se agregó
  `education_expense` a esa lista. `node tools/audit.js` (`categoria-huerfana`, P0) lo habría
  cazado igual si se hubiera escapado.
- Recategorizado, ningún monto tocado: Independiente ("Centro Educativo (gasto)"), Unión
  ("Departamento para la Actividad Educativa", 2 ejercicios) y Racing ("Colegio", 10 ejercicios
  2009-2018) tenían líneas ya puras — cambio de categoría solo. Instituto no: sus 6 líneas del
  Anexo V mezclan Colegio con Básquet/La Agustina/Sede/Tienda en un solo monto por fila, así que se
  partieron usando la columna COLEGIO que el propio Anexo V imprime (Clubes/Argentina/Instituto/
  balance-general-2023-2024.md, pág. 17) — no una estimación. Los 6 pares (y el trío de
  "Remuneraciones y cargas") cierran exacto contra el total impreso de su fila original.
- `auditAll()`: 41 clubes, 228 checks, 0 que no cierran, 0 warnings — antes y después, ningún total
  cambió. `node tools/audit.js`: 0 P0, 0 P1.
- ASSET_V 192 → 194 (se saltea 193, que no tocaba `js/`/`data/`), constante y los 15 `<script src>`;
  `fuentes.html` y las 41 páginas de club regeneradas.

## Versión 195: limpieza de PDFs sueltos en `~/Downloads`, y regla nueva en `club-sourcing`

- Un subagente de sourcing (barrido de República Checa, entre otros países) había clickeado botones
  de descarga en el Browser pane, que cayeron en `~/Downloads` del sistema en vez de en el proyecto
  — 26 archivos, todos fuera de `finance-of-sports/`. Revisados uno por uno (nombre de archivo +
  primera página cuando hacía falta), sin tocar ningún archivo personal de esa carpeta.
- 18 eran duplicados exactos (MD5, o solo el trailer PDF distinto en 2 casos de Noruega) de
  documentos que YA estaban bien guardados en `Clubes/<País>/<Club>/`: Portugal (Estrela da
  Amadora), Bélgica (Club Brugge), Croacia (Istra 1961), Brasil (Ituano), Alemania (RB Leipzig,
  Bayern Munich), Países Bajos (PSV), Noruega (Rosenborg ×2) y República Checa (Slavia Praha ×8).
  Movidos a la papelera del sistema (no `rm`: recuperables si hiciera falta).
- 1 era un dead-end ya documentado (`dncg-saison-2024-2025.pdf`, el anexo de estatutos de la DNCG,
  no un informe financiero — ya advertido en `fuentes/Francia/_notas-generales.md`), 1 estaba
  corrupto/truncado y sin forma de identificar el club (ni `qpdf` pudo repararlo), y 6 eran
  descargas fallidas de 0 bytes (`sport-recife-*`, el mismo bloqueo de Cloudflare que ya documenta
  `club-sourcing` sección 3). Los 26 movidos a la papelera.
- El único documento genuinamente nuevo: el informe financiero COMBINADO 2024 de HNK Rijeka
  (consolida Stadion Kantrida d.o.o., la sociedad del estadio, exigido desde el Pravilnik o
  licenciranju i financijskoj održivosti de octubre 2024 de la HNS) — distinto del informe
  individual que ya estaba cargado. Movido a `Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-
  kombinirani.pdf`, transcripto íntegro (25 páginas, con capa de texto nativa) a su `.md`, y anotado
  en `fuentes/Croacia/Rijeka.md` y `fuentes/_indice/Croacia.md`.
- Regla nueva en `.claude/skills/club-sourcing/SKILL.md` sección 0: un PDF descargado clickeando un
  botón en el Browser pane cae en `~/Downloads` del sistema, no en el proyecto — moverlo a
  `Clubes/<País>/<Club>/` es parte del mismo paso de la descarga, no una limpieza aparte. Causa raíz
  de esta versión; sin la regla se iba a repetir con el próximo país sourceado por Browser pane.
- Sin ASSET_V nuevo: no se tocó `js/`, `data/` ni `index.html`, ni se cargó ningún dato al sitio
  (esto es sourcing, no onboarding — el informe de Rijeka queda documentado y transcripto, no
  cargado a `data/`).

## Versión 196 — Los documentos internos se mudan a `Admin/`, y la exclusión del deploy pasa a ser una sola línea

### Movido
- `ESTADO.md`, `TODO.md`, `CONVENCIONES.md`, `ARQUITECTURA.md`, `CHANGELOG.md`, `dudas-por-club.md`,
  `finance-of-sports-project.md` y `COMO-CORRE-EL-PROYECTO.html` → `Admin/`.
- `PLAN-REMEDIACION-ESCALA.md` y `QUE-ES-REAL-historico.md` → `Admin/Archive/`, con un banner de
  "archivado" cada uno y un `Admin/Archive/README.md` que explica el criterio (se archiva lo que
  cumplió su función entera; se borra lo que sobra; se rescata lo vivo antes de archivar).
- `fuentes-por-club.md` → `fuentes/README.md`, al lado de las notas que indexa.
- `CLAUDE.md` NO se movió: Claude Code lo carga por convención desde la raíz del repo.
- La raíz queda con el sitio (`index.html`, `fuentes.html`, `sitemap.xml`, `js/`, `data/`,
  `tools/`, `fuentes/`, `Clubes/`), su config y `CLAUDE.md`.

### Borrado
- `info-adicional-todos-abiertos-borrar-luego.md`, que se creó para eso. Sus 7 secciones estaban
  todas cerradas o ya capturadas: 33/23(c) en la Versión 184, 23(b) en la 177 (`totalClubs` se sacó
  a propósito), 23(e) con `brandColor` ya en `data/clubs.js`, 26 en la 188, 20(b) en la 189 (el
  relevamiento quedó en `auditorias/2026-09-22-catchall-no-futbol.md`), y 38 y 34 ya escritos en su
  punto de `TODO.md`. Se sacó también el puntero que `TODO.md` le tenía.

### Arreglado
- **`.gitignore`: tres reglas vivas (`finance-of-sports-project.md`, `CLAUDE.md`,
  `dudas-por-club.md`) eran restos del intento de destrackear del 2026-09-20 que la propia decisión
  de Guido revirtió.** Inertes mientras los archivos estaban trackeados, pero un patrón sin barra
  matchea en cualquier nivel: al mudarlos a `Admin/` los tres paths nuevos quedaban ignorados y Git
  los iba a saltear **en silencio**, perdiendo justo el respaldo que esa decisión quiso salvar.
  Verificado con `git check-ignore` antes y después.
- **`COMO-CORRE-EL-PROYECTO.html` estaba servido en producción.** Es `.html`, estaba en la raíz, y
  el `rm -f` de `netlify.toml` solo listaba `.md`. No está linkeado ni en `sitemap.xml`, pero
  devolvía 200. Ahora está en `Admin/`.
- Dos afirmaciones vencidas que decían "no hay `netlify.toml` ni `_redirects`" (en `CLAUDE.md` y en
  `.gitignore`), de antes de la Versión 173.

### Cambiado
- `netlify.toml`: el `rm -f` con la lista de nombres sueltos pasa a `rm -rf Admin` + `rm -f
  CLAUDE.md`. Un documento interno nuevo ya no hay que acordarse de sumarlo acá: alcanza con
  dejarlo en `Admin/`. Simulado el pruning completo contra el árbol nuevo antes de commitear.
- `tools/audit.js`, `checkDeployInterno()` reescrito. Antes leía los `.md` de la raíz contra la
  lista de `rm -f`; con los documentos en subcarpetas ese chequeo se habría quedado **ciego y en
  verde**. Ahora verifica dos invariantes: que `Admin/` esté cubierta por un `rm -rf` (P1 nuevo,
  `admin-no-excluido`) y que no haya `.md` **ni `.html`** sueltos en la raíz fuera de `index.html`
  y `fuentes.html` (P2). Los dos se probaron rompiéndolos a propósito.
- `tools/generate-club-index.js` escribe `Admin/ESTADO.md`; `tools/generate-fuentes-index.js`
  escribe `fuentes/README.md`; los límites de peso de `audit.js` apuntan a `Admin/`.
- 203 líneas de referencias actualizadas en 31 archivos (los 6 skills, `CLAUDE.md`, `index.html`,
  `js/`, `tools/`, 9 `data/<club>-data.js`). `CHANGELOG.md`, `finance-of-sports-project.md`,
  `auditorias/` y `Prototyping/` **no** se reescribieron: son historia, y una ruta vieja ahí era
  verdad el día que se escribió.
- Rescatado a `.claude/skills/escala-finance-of-sports/SKILL.md` antes de archivar el plan de
  remediación: mover `fiscalYearStart` al `data/<club>-data.js` **no se puede**, porque
  `js/selector.js` lo lee antes de bajar ningún club (verificado en `js/selector.js:274`).
  Sin esto, la skill quedaba mandando a una sesión futura a hacer algo que el plan ya probó falso.
- Pesos de la tabla de lecturas del skill de arranque actualizados contra los archivos reales.

### Resultado
- `node tools/audit.js`: **0 P0, 0 P1, 0 P2, 7 P3** (venía de 8 P2 — eran exactamente los `.md`
  internos sueltos en la raíz).
- `auditAll()`: 41 clubes, 228 checks, 0 que no cierran, 0 warnings de FX. Los 4 generadores, al día.
- Sin ASSET_V nuevo: los cambios en `index.html`, `js/` y `data/` son todos de comentario.

## Versión 197 — `Admin/ARQUITECTURA.md` puesta al día (to-do 45)

### Cambiado
- `Admin/ARQUITECTURA.md` no mencionaba nada de las Versiones 162-184: `js/liga.js`, `js/i18n.js` +
  `data/lang/`, `data/rankings/<liga>.js` + `tools/generate-rankings.js`, `data/destacados.js`,
  `data/leagues.js` + `data/club-leagues.js`/`data/club-leagues/<iso2>.js`, `fuentes.html` + sus 41
  páginas por club + `sitemap.xml` (generadas por `tools/generate-fuentes-page.js`,
  `tools/generate-fuentes-index.js` para la sección de índice de `fuentes/README.md`), ni `ASSET_V`
  — la convención de caché de todo el proyecto, que no aparecía ni una vez. Cada archivo nuevo se
  verificó contra el disco (cabecera del archivo real, no el nombre) antes de describirlo. La
  sección del motor genérico (`computeYearGeneric()`) no se tocó: seguía correcta.
- Peso de `Admin/ARQUITECTURA.md` en la tabla §1 de `start-session-finance-of-sports-project`:
  9 KB → 17 KB.

### Resultado
- `node tools/audit.js`: **0 P0, 0 P1, 0 P2, 7 P3**, sin `doc-peso-desfasado` para `ARQUITECTURA.md`.
- Sin cambios de código ni de datos: no hace falta ASSET_V nuevo ni regenerar nada.

## Versión 198 — Chequeo de rutas muertas en `audit.js`, y los dos links que la 196 dejó rotos

### Agregado
- `checkRutasMuertas()` en `tools/audit.js` (to-do 46, P2 `ruta-muerta`). Recorre los archivos
  VIVOS —`CLAUDE.md`, `index.html`, `netlify.toml`, `js/`, `tools/`, `data/`, los 6 skills, los
  `.md` de `Admin/` y `fuentes/_indice/`— buscando rutas que ya no existen, en sus dos formas: la
  ruta entre backticks y el destino de un link Markdown, que se resuelve relativo a la carpeta del
  archivo que lo contiene. Los históricos (`Admin/CHANGELOG.md`,
  `Admin/finance-of-sports-project.md`, `Admin/Archive/`, `auditorias/`, `Prototyping/`) quedan
  afuera a propósito. Una mención abreviada (`club-data-mapping/SKILL.md` sin el `.claude/skills/`
  adelante) resuelve por sufijo y no da hallazgo. Corre en 0,37 s con el resto de la auditoría.

### Arreglado — los dos los encontró el chequeo nuevo, en su primera corrida
- **Los 44 `fuentes/_indice/<País>.md` linkeaban `fuentes-por-club.md`**, renombrado a
  `fuentes/README.md` en la Versión 196. El barrido a mano de esa versión no los había mirado: eran
  44 links rotos, uno por país.
- **`fuentes/README.md` linkeaba sus índices como `fuentes/_indice/<País>.md`**, correcto cuando el
  archivo estaba en la raíz y roto desde que la 196 lo movió adentro de `fuentes/`, porque resolvía
  a `fuentes/fuentes/_indice/...`. Arreglado en `linkPais()` de `tools/generate-fuentes-index.js`,
  que es quien genera esas líneas, y regenerado.
- `fuentes/_indice/Arabia Saudita.md` citaba la REGLA 2 del índice por su nombre viejo.

### Cambiado
- 6 entradas nuevas en `tools/audit-ignore.json`, todas verificadas leyendo su contexto: son rutas
  que este proyecto nombra PARA DECIR QUE NO EXISTEN (comparar-clubes.js borrado en la 152, el 404
  que las páginas de fuentes tenían antes del `prefijo: '../'`, la ausencia deliberada de un
  archivo de idioma para el castellano, y dos PROMPT-*.md citados como historia). Se evaluó
  detectar la negación por contexto y cubría 5 de 7 casos: un chequeo que acierta a veces es peor
  que uno estricto.
- El ejemplo `FOO.md` de `Admin/CONVENCIONES.md` pasa a `<NOMBRE>.md`, que el chequeo lee como
  patrón y no como ruta.

### Resultado
- `node tools/audit.js`: 0 P0, 0 P1, 0 P2, 7 P3 (29 silenciados). Las dos ramas del chequeo nuevo
  —backtick y link Markdown— se probaron rompiéndolas a propósito.
- Sin ASSET_V nuevo: no se tocó `index.html`, `js/` ni `data/`.

## Versión 199 — `Admin/COMO-CORRE-EL-PROYECTO.html` puesto al día (to-do 44)

### Cambiado
- El documento estaba parcialmente vencido desde antes de la Versión 127: decía "222 checks" en
  vez de los 228 que corre `auditAll()`, y la versión más nueva que mencionaba era la 126. Cada
  número (checks, pesos de archivo, entradas de `CHANGELOG.md`, hallazgos de `tools/audit.js`) se
  verificó contra el repo del día, no se copió de otro documento — incluye `js/selector.js` y
  `js/liga.js` (antes ausentes), el motor de rankings/pestaña Ligas (paso nuevo "06"), los 4
  generadores de `tools/` (paso nuevo "05"), y `netlify.toml` + la mudanza a `Admin/` (paso nuevo
  "07"). Las tablas de la sección "Qué es cada cosa" suman las filas que faltaban: `data/leagues.js`,
  `data/club-leagues.js` + `club-leagues/<iso2>.js`, `data/rankings/`, `data/destacados.js`,
  `data/lang/`, y los 2 skills que CLAUDE.md ya listaba pero el documento no
  (`auditoria-finance-of-sports`, `escala-finance-of-sports`).
- Corregidas 3 afirmaciones que ya no eran ciertas y no solo viejas: los skills se autodescubren
  solos (son 6, no 3, y el repo dejó de estar anidado dentro del sitio profesional el 2026-09-15);
  `index.html` ya no lleva ningún comentario de estado/to-do (se sacó en la Versión 138); y el pie
  ahora aclara que este documento se trackea pero NO se publica desde la Versión 196 (antes de esa
  versión sí, por ser `.html` en la raíz).
- La sección "Riesgos de escala" deja de duplicar el mapa completo: apunta a
  `.claude/skills/escala-finance-of-sports/SKILL.md`, que es donde vive de verdad ese eje desde que
  dejó de caber acá, y conserva sólo 2 puntos propios de este documento.
- Formato y CSS intactos, sin tocar: es una página HTML que Guido lee en el navegador, no se pasó a
  Markdown.

### Resultado
- Coordinado con una sesión paralela sobre el mismo working tree (la que hizo la Versión 198): sus
  números post-commit (172 entradas de `CHANGELOG.md`, 29 silenciados en `tools/audit-ignore.json`,
  `Clubes/` con 336 carpetas de club en 35 países y no sólo los 41 cargados) se verificaron de nuevo
  contra el disco antes de usarlos, no se copiaron del aviso.
- `node tools/audit.js`: 0 P0, 0 P1, 0 P2, 7 P3, sin `ruta-muerta` nuevo para este archivo.
- Sin ASSET_V nuevo: no se tocó `index.html`, `js/` ni `data/`.

## Versión 200 — Una ruta gitignoreada deja de contar como ruta muerta, y queda el protocolo de trabajo en paralelo

### Arreglado
- `checkRutasMuertas()` (Versión 198) daba un falso positivo en un worktree recién creado:
  `data/river-data.js` cita `Clubes/Argentina/River/estados-contables-leads/…md`, que está
  **gitignoreada** (la fuente no oficial de tuRiver) y por lo tanto existe en el árbol principal y
  no en un checkout nuevo. La presencia de una ruta ignorada es una propiedad del checkout, no del
  repo. Ahora el chequeo filtra las candidatas con un solo `git check-ignore` en batch. Verificado:
  0 P2 en los dos árboles, y sigue cazando una ruta muerta que NO esté ignorada.

### Agregado
- Regla nueva en `Admin/CONVENCIONES.md`: cómo correr dos sesiones en paralelo (onboarding en
  `main`, sourcing en un worktree) y por qué no es simétrico — los 2881 PDFs de `Clubes/` no están
  trackeados, así que un worktree nace sin ninguno y los que se bajen ahí no viajan al mergear.
  Incluye el criterio de numeración de Versión al mergear y la regla de regenerar, no mergear, los
  archivos generados.
- Worktree `sourcing` en `.claude/worktrees/sourcing` (carpeta ya excluida de git), 154 MB.

### Resultado
- `node tools/audit.js`: 0 P0, 0 P1, 0 P2, 7 P3, en `main` y en el worktree. Sin ASSET_V nuevo.

## Versión 201 — 20 clubes nuevos, 2 países nuevos (Alemania e Inglaterra) y la libra esterlina

### Agregado
- 20 clubes nuevos, todos sus ejercicios ya transcriptos en `Clubes/` (ninguno requirió sourcing
  nuevo): 5 colombianos (América de Cali, Atlético Nacional, Deportivo Cali, Independiente Santa Fe,
  Junior de Barranquilla, Ejercicio 2025 cada uno), 5 españoles (Getafe CF, Girona FC, RCD Espanyol,
  Elche CF, CA Osasuna, 2 ejercicios cada uno salvo Girona), y 10 en 2 países completamente nuevos:
  Alemania (1. FC Köln, Eintracht Frankfurt, Werder Bremen, FC Augsburg, VfB Stuttgart, Bundesliga) e
  Inglaterra (Arsenal, Liverpool, Manchester City, Everton, Tottenham Hotspur, Premier League).
  61 clubes, 121 ejercicios, 8 países (antes 41, 85, 6).
- **Libra esterlina (GBP), moneda nueva**: `CURRENCY_META`/`FX_PLAUSIBLE_RANGE` en
  `data/currency-map.js`, y 8 entradas nuevas en `FX_CLOSE` (5 GBP + 3 EUR de fechas que no
  existían), todas cierres BCE — para GBP, cruzando GBP/EUR × EUR/USD del mismo boletín BCE, porque
  el BCE no publica GBP/USD directo. 2 de las 8 caen en fin de semana (sin cotización BCE ese día
  exacto): se usó el boletín del viernes anterior, mismo criterio que ya usaba `BRL@2025-12-31`.
- 2 ligas de 2° escalón nuevas en el catálogo (`data/leagues.js`): `es-segunda` y `de-2bundesliga`
  (mismo criterio que `ar-primeranacional`/`br-serieB`), para que Elche/Girona/Espanyol/Köln no
  queden sin fila en `data/club-leagues.js` en los ejercicios que jugaron en Segunda.
- `data/club-leagues/de.js` y `data/club-leagues/gb.js`, archivos nuevos (Alemania e Inglaterra).

### Arreglado (encontrado por `node tools/audit.js` al cargar los 20 clubes, antes de pushear)
- 2 líneas mal categorizadas con una categoría de la taxonomía equivocada (una de gasto de Santa Fe
  usando `sponsorship_commercial`, que es solo de ingresos; 2 de ingreso de Werder Bremen usando
  `exceptional_items`, que es solo de gastos) — esto rompía el tie-out de Santa Fe 2025 por $144 mil
  COP exactos (P0) y no rompía números en Werder Bremen pero sí generaba ruido de auditoría.
- 1 línea de gasto de Werder Bremen 2025 usando `exceptional_items` correctamente en la taxonomía
  pero rompiendo el tie-out igual: el motor (`computeYearGeneric()`) excluye a propósito esa
  categoría de `expenses`/`nonCash` (la suma aparte, directo a `operatingProfit`) — recategorizada a
  `other_expenses` en vez de ajustar `officialTotalExpenses` para no crear una trampa igual la
  próxima vez que alguien use esa categoría.
- 2 items de Eintracht Frankfurt ("Spielbetrieb Lizenzfußball", 2024 y 2025) con una suma que no
  cerraba contra su propia fila — el desglose de la Nota 19 es "im Wesentlichen" (sustancial, no
  completo), así que se sacaron los items en vez de dejar un desglose parcial engañoso.
- 2 catch-alls dominantes reales (no del documento, de la carga): Junior de Barranquilla tenía
  "Utilidad en venta de derechos deportivos" (36,7 M COP) enterrada en un catch-all de "Otros
  ingresos" en vez de en `player_sales`; Deportivo Cali tenía venta/préstamo de derechos deportivos,
  escuela de fútbol y cuotas de sostenimiento en el mismo catch-all en vez de sus categorías reales.
  Promovidas a líneas propias, mismo criterio que club-data-mapping sección 1.

### Documentado
- 15 dudas nuevas en `Admin/dudas-por-club.md`, una sección por país, para preguntas de
  categorización que ningún documento ni búsqueda resuelve (ver el archivo). Ninguna bloquea el tie-
  out, todas están explícitamente marcadas como decisión razonable a falta de mejor información.
- La duda vieja de CA Osasuna ("¿qué período cubre cada PDF?") quedó RESUELTA para los 2 ejercicios
  cargados (jul-jun confirmado leyendo el texto interno) — lo que sigue abierto es si el club cambió
  a año calendario DESPUÉS de 2024, que no bloquea nada de lo cargado.

### Resultado
- ASSET_V 194 → 201 (los 15 `<script src>` estáticos actualizados a mano, más la constante).
- `auditAll()` en el navegador: 61 clubes, 336 checks, 0 mismatches, 0 warnings de fx, 0 clubes que
  no cargaron.
- `node tools/audit.js`: 0 P0, 0 P1, 10 P2 (todos catch-all dominante, techo real de disclosure de
  cada documento — 6 alemanes con "Sonstige betriebliche Aufwendungen" sin partir más, 2 españoles
  con "Ingresos accesorios..." sin partir más, y los 2 colombianos de arriba que sí se pudieron
  mejorar), 7 P3, 31 silenciados (2 nuevos: el ajuste de reconciliación de Santa Fe 2025 y el salto
  interanual de Girona, los dos verificados contra la fuente).
- Los 4 generadores corridos: `Admin/ESTADO.md`, `fuentes.html` (61 páginas de club),
  `data/rankings/*.js` (12 ligas) y `fuentes/README.md`.

## Versión 202 — Sourcing en paralelo: Liga MX, Série A/B y Primera A completas

### Agregado
- **México**: los 18 clubes de Liga MX trackeados (eran 2). Atlas con documento vía desglose de
  operación discontinua IFRS 5 en el Reporte Anual 2019 de TV Azteca; Atlético San Luis vía la nota
  de empresas del grupo del Atlético de Madrid. El país queda documentado como RESUELTO: el
  Reglamento de Control Económico exige balances dictaminados (art. 26) y los declara
  confidenciales (art. 12).
- **Brasil**: 43 de 43 clubes de Série A/B, todos con documento (eran 28). Ituano pasa de 1 a 15
  ejercicios en disco, Mirassol de 1 a 12.
- **Colombia**: 20 de 20 de Primera A, 18 con documento (eran 10). Los 2 sin documento tienen causa
  societaria escrita, y el de Deportivo Pasto caduca.
- 418 PDFs en el worktree `sourcing` (gitignoreados, hay que consolidarlos aparte).
- To-do 47: explicarle al visitante por qué México no muestra casi nada. Es tarea de producto, no
  de sourcing — la primera vez que el proyecto necesita mostrar una AUSENCIA explicada.

### Cambiado
- `club-sourcing`: SIIS (Colombia) es una API JSON pública sin login, scripteable entera con curl,
  con tres correcciones a lo que decía antes (son 3 CIIU y no 1, el nombre del PDF temporal no
  sigue siempre el patrón, y `documentos_adicionales` viene vacío para 2021+ aunque existan). La
  Federação Paulista tiene índice JSON 2010-2025. Cae la creencia "SAF publica, asociación no".

### Pendiente
- Pasó a `Admin/TODO.md`, puntos 48, 49 y 50 (la lista de pendientes vive solo ahí).

## Versión 203 — Limpieza rápida: audit.js en verde, título de ESTADO.md y Riesgos de escala afuera

### Arreglado
- `node tools/audit.js` vuelve a 0 P0/P1/P2 (to-do 48). El P1 `fuentes-indice-desfasado` se resolvió
  agregando 13 `OVERRIDES` a `tools/generate-fuentes-index.js` (7 clubes de Brasil, 2 de Colombia y 4
  de México que el sourcing de la Versión 201-202 dejó ambiguos) y corriendo el generador:
  `fuentes/README.md` pasa a 44 países, 571 clubes, 365 con documento. Los 10 P2
  `catchall-dominante` (3 españoles, 3 alemanes) se verificaron uno por uno contra el comentario de
  cabecera de cada `data/<club>-data.js` — todos son el techo real de lo que desglosa su documento
  fuente, no una categorización pendiente — y se silenciaron en `tools/audit-ignore.json` con el
  motivo de cada uno.

### Cambiado
- La sección de `Admin/ESTADO.md` que genera `tools/generate-club-index.js` pasa a llamarse "QUÉ ES
  REAL POR CLUB" (to-do 54). Desde la Versión 138 no queda ningún ejercicio placeholder cargado, así
  que la mitad vieja del título ("...Y QUÉ ES PLACEHOLDER") no describía nada; 4 de los 7 lugares que
  la nombraban ya usaban la forma corta de manera informal, ahora es una sola.

### Quitado
- La sección "Riesgos de escala" de `Admin/COMO-CORRE-EL-PROYECTO.html` (to-do 55, pedido de Guido).
  Duplicaba lo que ya vive completo en el skill `escala-finance-of-sports`. Se sacó junto con el
  callout de cabecera que apuntaba a ella y la CSS que quedó huérfana (`.fixes`, `.fix`, `.effort`).

## Versión 204 — River: el canal oficial existe, pero es un trámite de Guido, no una búsqueda

### Investigado
- To-do 53 (pedido de Guido): se buscó una fuente oficial para reemplazar el balance de River
  2023/2024, hoy cargado desde un mirror no oficial (tuRiver.com, `reliability:'secondary_mirror'`).
  `riverplate.com` ya estaba descartado de una sesión anterior (7 años de "Memoria" narrativa, nunca
  estados contables). Encontrado: River es una asociación civil inscripta en la IGJ (CUIT
  `30-52674844-8`), y la IGJ tiene un trámite público real, "informe de balances presentados", que
  devolvería el estado contable oficial — pero exige TAD con clave fiscal AFIP o Mi Argentina (la
  identidad de una persona) y tiene costo. **Es una gestión para Guido, no un sourcing que un agente
  pueda completar solo.** Documentado en `fuentes/Argentina/River.md` con el link del trámite y el
  CUIT, para cuando Guido decida iniciarlo. El to-do 53 sale de la lista: la parte buscable ya se
  buscó.

## Versión 205 — ESTADO.md decía que fuentes/**/*.md no se trackea, y hace 32 versiones que no es así

### Arreglado
- Un párrafo de `Admin/ESTADO.md` decía "NO SE TRACKEAN, DESDE LA VERSIÓN 167" sobre las notas de
  sourcing (`fuentes/<País>/<Club>.md`, `fuentes/_indice/<País>.md`) — hallado revisando el estado
  del repo antes de armar la próxima sesión de sourcing. Cierto en su momento (regla en
  `.gitignore`), pero Guido revirtió esa regla 6 versiones después (Versión 173, "si pierdo la mac
  pierdo semanas de trabajo") a favor del mecanismo que sigue vigente: todo se trackea, y
  `netlify.toml` saca lo interno del artefacto de deploy. El párrafo nunca se actualizó y quedó
  contradiciendo la explicación correcta que el propio archivo ya tiene más abajo. NO es un problema
  de privacidad activo: verificado con `git ls-remote`, el repo público en GitHub todavía está 43
  commits atrás (Versión 166, 2026-09-20 — Guido no pushea seguido), y ninguno de los 610 archivos
  de club menciona a Guido por nombre hoy. Reescrito para que diga lo mismo que `netlify.toml` y el
  resto de `ESTADO.md`.

## Versión 206 — El barrido de Argentina (to-do 49) ya estaba terminado, y nadie se había dado cuenta

### Investigado
- El to-do 49 decía "quedaban ~51 clubes sin documento" citando la fecha del índice
  (`fuentes/_indice/Argentina.md`), que el agente del 2026-09-22 nunca llegó a sincronizar antes de
  cortarse por presupuesto. Leyendo cada `fuentes/Argentina/<Club>.md` a mano (no solo la fecha del
  índice) apareció la imagen real: **44 de 46 clubes candidatos ya estaban barridos con hallazgos
  reales documentados**, solo que con formatos de sección distintos (`## Chequeo`, `## Lo nuevo`, o
  simplemente bullets con "ENCONTRADO 2026-09-22") que un primer chequeo automático con un patrón
  único no detectaba. Solo 2 clubes habían quedado genuinamente sin tocar (Chaco For Ever y
  Gimnasia y Tiro (Salta), sin dominio anotado en su momento) — se barrieron hoy: 0 documentos en
  los dos, dominios sin sección institucional visible y 0 PDFs en Wayback. **El barrido de
  Argentina queda cerrado**, el to-do 49 sale de la lista.
- `fuentes/_indice/Argentina.md` se sincronizó con la fecha real de cada chequeo (estaba mostrando
  `2026-09-12` en 44 líneas que ya tenían trabajo del `2026-09-22`).
- Efecto colateral bueno: la relectura destapó **6 ejercicios reales ya descargados y nunca
  cargados al sitio** — 3 de un club (Gimnasia y Esgrima LP) que hoy no tiene ningún dato, más 1
  cada uno de Talleres y Newell's (también sin datos hoy) y de Banfield, más 2 ejercicios nuevos de
  clubes ya cargados (Rosario Central 2024-25, Independiente N°122 2025-26). Pasa a `Admin/TODO.md`
  como to-do 58 (onboarding, no sourcing) y to-do 59 (2 reclamos directos a clubes que valen la
  pena: Atlanta con 4 balances en Drive que dejaron de compartir, Banfield con un ejercicio
  aprobado solo en video de YouTube).

## Versión 207 — Talleres, Newell's Old Boys y Banfield: los primeros 3 de la 58, los 3 sin OCR

### Datos
- **Talleres (Córdoba), club nuevo (`talleres-ar`) → 2 ejercicios completos**: Estados Contables
  2024 y 2025 (ejercicio CALENDARIO, no temporada), transcriptos íntegros y cargados. Cierran
  exactos contra el "RESULTADO DEL EJERCICIO - SUPERAVIT" impreso de cada balance. El documento
  netea "Transferencias de Derechos Económicos" antes de imprimir el total, a diferencia de Boca/
  Racing — se cargó neto para no romper el tie-out, con el bruto/costo/gastos como `items` del
  desglose. Ninguno de los 2 Anexos de moneda extranjera declara un TC de cierre real: se agregaron
  `ARS@2024-12-31`/`ARS@2025-12-31` a `FX_CLOSE` (dólar mayorista BCRA, última rueda de cada año).
- **Newell's Old Boys, club nuevo (`newells-ar`) → 1 ejercicio**: Memoria y Balance 2018-19,
  transcripción de 98 páginas, cierra exacto contra Superávit Ordinario + Extraordinario
  (Donaciones, Nota 13) = Superávit Final $208.963.563. TC declarado por el propio Anexo I
  ($41,50/$43,50 comprador/vendedor).
- **Banfield, club nuevo (`banfield-ar`) → 1 ejercicio**: Memoria y Balance 116° Ejercicio
  (2019-20), transcripción de 58 páginas. Reporta por sector/departamento (no por naturaleza de
  gasto transversal como el resto de los clubes argentinos) — cada Anexo de sector se categorizó
  línea por línea. El Anexo XI ("Gastos Impositivos y Financieros") estaba sumado dentro de "Total
  Gastos" del propio documento, se sacó y se reclasificó a `netInterest`. Cierra exacto contra el
  Resultado Final ($80.173.576,08) y el Total del Activo ($1.253.147.745,78). Se agregó
  `ARS@2020-06-30` a `FX_CLOSE` (el documento no declara TC propio).
- Los 3 clubes suman `brandColor` (investigado contra Wikipedia + footylogos), entrada en
  `data/club-leagues/ar.js` (Primera División en los 4 ejercicios) y su página en `fuentes.html`.
  El sitio pasa de 61 a 64 clubes, 348 checks de `verifyTieOuts()`/`checkFxSanity()`, 0 mismatches.

### Proceso
- Onboardeados con 3 agentes en paralelo (uno por club), coordinados para no tocar archivos
  compartidos (`data/clubs.js`, `category-map.js`, `currency-map.js`, `club-leagues/ar.js`,
  `fuentes/_indice/Argentina.md`) durante la carga — esa integración se hizo centralizada al final,
  sobre los 3 reportes.
- `tools/audit.js` marcó 1 P2 real (`signo-invertido` en Banfield 2020, "Apropiación de Costos
  Fútbol Amateur"): verificado contra el documento (capitalización de Nota 4 revertida por el mismo
  importe, efecto neto cero) y silenciado en `tools/audit-ignore.json` con el motivo.

## Versión 208 — Gimnasia y Esgrima (La Plata): el 4° club nuevo del to-do 58, y el 2° ejercicio dual del sitio

### Datos
- **Gimnasia y Esgrima LP, club nuevo (`gimnasiaesgrima-ar`) → 3 balances reales + 2 ejercicios
  duales Presupuesto+Balance + 1 presupuesto standalone**: 136° (2022-23), 137° (2023-24) y 138°
  (2024-25), más el presupuesto 2025-26 (todavía sin balance real). El hallazgo de sourcing (el
  balance vive en un PDF separado de la Memoria, que sí es puramente narrativa) ya estaba
  documentado; esta sesión transcribió los 9 documentos (8 vía `pdftotext`, 1 vía Tesseract OCR —
  el único escaneado, 3 págs) y los mapeó.
- Los 3 presupuestos vienen empaquetados con el balance del ejercicio ANTERIOR (aprobados en la
  misma asamblea), no con el propio: cruzando por ejercicio real, 2 de los 3 resultaron ser el
  presupuesto del MISMO ejercicio que un balance real ya cargado — el 2° caso del sitio (después de
  Racing) del mecanismo de "ejercicio dual" (`club-or-year-onboarding` SKILL.md sección 11):
  balance real primario + columna "Presupuesto" de comparación, cerrando ambas columnas contra su
  propio total impreso. El 3° presupuesto (2025-26) no tiene balance pareado (es el ejercicio más
  reciente, todavía sin publicar) — se cargó standalone.
- Corrección durante la integración: la primera versión reusaba el `fx` `document_close` del
  balance pareado para los 2 overlays. Etiquetar así el TC del presupuesto mentía la procedencia —
  `document_close` es específicamente "el balance lo declara", y el presupuesto no declara nada. Se
  corrigió a `fxSource:'market_close'`, referenciando `FX_CLOSE` a la fecha de cierre de cada
  ejercicio (`ARS@2024-06-30`/`ARS@2025-06-30`, ya existían de otro club). Se agregó
  `ARS@2026-06-30` (1.482, dólar mayorista BCRA vía Rava) para el presupuesto standalone.
- `verifyTieOuts()`/`auditAll()`: 359 checks, 0 mismatches, 0 warnings (eran 348). Sitio pasa de 64
  a 65 clubes. `brandColor:null` (camiseta blanca con banda azul marino, mismo bucket que
  River/Vélez/Sevilla). Liga confirmada Primera División en los 4 ejercicios (sin descenso desde
  ~2015, según en.wikipedia.org).

## Versión 209 — Rosario Central e Independiente suman un 2do ejercicio cada uno, cierra el to-do 58

### Datos
- **Rosario Central, Ejercicio 2024-25 (cierre 30/6/2025)**: la nota de sourcing decía "escaneo sin
  capa de texto" — resultó ser texto nativo completo, corregido en `fuentes/Argentina/Rosario
  Central.md`. Déficit real $(13.410.007.536) ARS, cierra exacto contra los totales impresos. `fx`
  1.165 (Anexo IV, lado Activo/Créditos, sin ambigüedad esta vez a diferencia del ejercicio 2022-23
  ya cargado).
- **Independiente, Ejercicio N°122 (2025-26, cierre 30/6/2026)**: 2 documentos, con el desglose fino
  (Anexo D) cambiado de lugar respecto del ejercicio anterior — este año vive en
  `estados-contables-2025-2026.pdf` (fuente subseteada sin ToUnicode en la mayoría de sus 54
  páginas, resuelto renderizando a imagen y leyendo visualmente, no con OCR crudo), mientras que la
  Memoria de 150 páginas es puramente narrativa. Superávit real $1.778.079.629 ARS, verificado
  además contra los 5 anchors del Informe de Tesorería que ya tenía `fuentes/Argentina/
  Independiente.md` de la sesión de sourcing — los 5 reconcilian exacto. `fx` 1.500 (Anexo II, lado
  deuda, unánime en las 4 líneas de pasivo en USD).
- **Ejercicio N°121 de Independiente (2024-25) NO se cargó**, decisión explícita de Guido: sus
  únicas fuentes disponibles son la columna comparativa del 122 (reexpresada a otra fecha de
  cierre) y cifras de prensa, ninguna de las 2 es el documento propio del club. Queda como to-do 59
  (pedírselo directo) y documentado en `Admin/dudas-por-club.md`.
- `verifyTieOuts()`/`auditAll()`: 365 checks, 0 mismatches (eran 359). **Con esto se cierra el to-do
  58 completo**: los 6 ejercicios que el barrido de Argentina del 2026-09-22 encontró y descargó
  (Talleres, Newell's, Banfield, Gimnasia y Esgrima LP, y los 2 de esta versión) están todos
  cargados o su ausencia está documentada y justificada.

### Proceso
- Se corrigió un override obsoleto en `tools/generate-fuentes-index.js`
  ('Argentina|Gimnasia y Esgrima (La Plata)': doc:false) que había quedado sin actualizar desde la
  Versión 208 — un override manda SIEMPRE sobre la clasificación automática, así que
  `fuentes/README.md` venía subcontando ese club en "con documento encontrado" sin que ningún
  chequeo lo detectara (el script solo avisa de overrides "sobrantes", no de overrides con un valor
  desactualizado para una línea que sigue existiendo).

## Versión 210 — Metodología de sourcing: escalera de ángulos, snapshot de intentos y criterio de escalada (to-do 52)

### Docs
- `.claude/skills/club-sourcing/SKILL.md`, sección 0 ampliada con tres subsecciones nuevas (91 → 115
  KB): **0.1** la escalera de familias de ángulo (sitio oficial → regulador del país si existe →
  Wayback CDX del dominio completo → búsqueda web → prensa como confirmación) con el criterio de
  STOP (agotar cada familia aplicable A FONDO, no un número fijo de intentos; el guessing de nombres
  de archivo es una técnica acotada de la familia 1, no una familia en sí); **0.2** la convención de
  escritura `**Ángulos**` al principio de cada `fuentes/<País>/<Club>.md` (snapshot que se reemplaza,
  no se apila, mismo criterio que `Admin/ESTADO.md`) para que una sesión nueva vea de un vistazo qué
  ya se probó sin leer la prosa completa — no retroactivo, se gana club por club al tocarlo; **0.3**
  las 5 señales para decidir entre dead-end sin mail, candidato a mail (to-do 51), bloqueo
  estructural CERRADO, gestión de Guido (canal que exige identidad/pago de una persona real, ej.
  IGJ/River) o sesión dedicada aparte.
- Destilado de casos reales de la sesión 2026-09-22/23, no inventado en abstracto: Chaco For Ever y
  Gimnasia y Tiro (Salta) para el criterio de STOP (uno agotado de verdad, el otro a propósito no
  cerrado); Talleres y Gimnasia y Esgrima LP para "memoria narrativa no es señal de que no hay
  balance"; Independiente N°122 para el paso 0 de reconocer texto extraído basura antes de confiar
  en él; Rosario Central para no asumir ciego una nota de sourcing vieja; Atlanta/Banfield/River
  para las 3 señales de escalada distintas (mail, bloqueo estructural, gestión de Guido).
- No se tocaron las 29 secciones de país (eso es alcance del to-do 57) ni el formato de
  `fuentes/_indice/<País>.md` que parsea `tools/generate-fuentes-index.js` — verificado que el
  snapshot nuevo vive en el archivo de club, que ese script ni abre.

## Versión 211 — Las 29 secciones de país de `club-sourcing` separan criterio de historia (to-do 57, parte 1 de 3)

### Docs
- `.claude/skills/club-sourcing/SKILL.md` — pasada completa sobre las 29 secciones de país (sección
  0 NO se tocó, ya estaba hecha en la Versión 210). Se aplicó el criterio pedido por Guido: canal/
  regulador, cómo usarlo, gotchas de portal reutilizables, categoría legal y "Último chequeo: <fecha>"
  se quedan; la envoltura narrativa ("sesión 2026-09-17", "Enésimo país de la lista de 30 mejores
  ligas del mundo", "esta sesión") se corta o se comprime a la fecha sola.
- El hallazgo más grande: las 18 secciones de la barrida "30 mejores ligas del mundo" (12 a 29,
  Alemania a Ucrania) repetían casi textual la misma oración de apertura ("Enésimo país de la lista
  de 30 mejores ligas del mundo, sesión 2026-09-17...") — se cortó de las 18, sin perder ningún dato
  técnico (URLs, entidades, gotchas de formato). Colombia (sección 2) y Brasil (sección 3) tenían la
  mayor densidad de tags `(sesión 2026-09-XX)` sueltos dentro de gotchas por lo demás válidos — se
  quitaron los tags, se conservó el gotcha. Los enumerados largos de "qué clubes puntuales quedaron
  cubiertos" (Colombia tenía 18 nombres propios) se comprimieron a un conteo con puntero a
  `fuentes/_indice/<País>.md`, que ya tiene el detalle club por club.
- La mayoría del contenido de las 29 secciones YA ERA criterio vigente (URLs, pasos de portal,
  gotchas de entidad/formato/rate-limit) y no narrativa — por eso el archivo bajó poco de tamaño
  (115 → 112 KB, 1415 → ~1394 líneas): el objetivo no era achicarlo, era que lo que queda sea
  legible como metodología y no como bitácora de sesión.
- Sección "Cómo mantener este skill" reescrita para decir EXPLÍCITAMENTE el criterio de separación
  (qué se queda, qué se comprime, qué va a `Admin/CHANGELOG.md`/`Admin/Archive/`), para que una
  sesión futura no vuelva a mezclar historia con criterio al agregar un país nuevo.
- Verificado sin `grep`: ninguna sección se renombró ni se fusionó (siguen siendo 1-29 en el mismo
  orden), así que las citas cruzadas por número (`Admin/TODO.md`, `fuentes/<País>/<Club>.md`,
  `CLAUDE.md`) siguen apuntando a la sección correcta. `node tools/audit.js` sigue en 0 P0/P1/P2.
- Pendiente (to-do 57, partes 2 y 3): `club-data-mapping/SKILL.md` (1049 líneas) y
  `club-or-year-onboarding/SKILL.md` (885 líneas), mismo criterio, sesiones separadas.

## Versión 212 — Las 19 secciones de `club-data-mapping` separan criterio de historia (to-do 57, parte 2 de 3)

### Docs
- `.claude/skills/club-data-mapping/SKILL.md` — mismo criterio de separación ya aplicado a
  `club-sourcing` en la Versión 211 (ver la sección "Cómo mantener este skill" de ese archivo, y la
  versión nueva de la de acá): el criterio de categorización/conversión, el árbol de decisión y los
  ejemplos pedagógicos que ilustran CÓMO aplicar una regla (el deskew de la sección 9 con el
  presupuesto 2019-20 de Racing, el OCR con Tesseract de la sección 15 con Vélez) se quedan; la
  envoltura de historia ("en la sesión del X, Guido/un agente encontró Y") se comprime al hecho seco.
- La reducción fue chica a propósito (1049 → 1041 líneas): la mayoría del contenido YA era criterio
  vigente, no relleno narrativo — el objetivo era separar, no achicar a cualquier costo, mismo
  aprendizaje que dejó la Versión 211. Los recortes reales: el ejemplo de Racing 2025/26 en la
  sección 1 (lump_football_operations), el tamaño de la discrepancia de FX en la sección 5, el
  párrafo de corrección meta de la sección 12 (decía "pendiente" 20 versiones después de que el
  código ya lo resolvía), y el cierre de la sección 13 (Boca 2025 sin desglose de 3 filas). Se
  eliminó por completo un párrafo de la sección 13 sobre caché de `read_console_messages`: era un
  gotcha de tooling sin relación con categorización, y ya está documentado en `CLAUDE.md`.
- Ninguna sección se renombró ni se fusionó (siguen siendo 0-18 más "Cómo mantener este skill"),
  así que las citas cruzadas por número desde `CLAUDE.md`, `Admin/CONVENCIONES.md`,
  `Admin/ESTADO.md`, `js/finanzas-calc.js`, `tools/audit.js`, `club-or-year-onboarding/SKILL.md` y
  varios `Clubes/<País>/<Club>/*.md` siguen apuntando a la sección correcta. `node tools/audit.js`
  sigue en 0 P0/P1/P2.
- Sección "Cómo mantener este skill" ganó el mismo bloque de criterio explícito que ya tiene
  `club-sourcing` (qué se queda, qué se comprime, qué va a `Admin/CHANGELOG.md`/`Admin/Archive/`),
  con la sección 13 (10+ rondas de ajuste versionadas de "Formato Simplificado") señalada como la
  más expuesta a volver a acumular historia sin criterio nuevo.
- Pendiente (to-do 57, parte 3 de 3): `club-or-year-onboarding/SKILL.md` (885 líneas), mismo
  criterio, sesión aparte.

## Versión 213 — `club-or-year-onboarding` separa criterio de historia, cierra el to-do 57 (3 de 3)

### Docs
- `.claude/skills/club-or-year-onboarding/SKILL.md` — mismo criterio ya aplicado a `club-sourcing`
  (Versión 211) y `club-data-mapping` (Versión 212): las reglas/arquitectura vigentes y los ejemplos
  pedagógicos que ilustran cómo aplicarlas (las 4 trampas de `brandColor` de la sección 3, el caso
  Instituto de la sección 15) se quedan; la envoltura narrativa versionada ("Versión X, sesión tal
  fecha", citas largas de Guido que solo daban color) se corta o se comprime al hecho seco.
- La sección 14 (header de "Estado de resultados") era la más expuesta: relataba 3 rondas de ajuste
  sobre el mismo problema, "1ra ronda... 2da ronda... 3ra ronda", con citas textuales de cada una —
  quedó en 3 reglas finales con una frase de contexto cada una, sin el paso a paso.
- Reducción real pero moderada (885 → 857 líneas, ~72,8 → ~67,5 KB): la sección 3 (arquitectura de
  archivos para un club nuevo) es, de lejos, la más larga y la más citada por número/§ desde fuera
  del skill (~10 lugares solo para "§3 punto 1b", la metodología de `brandColor`) y se mantuvo casi
  intacta a propósito — comprimirla de más habría dejado el skill sin su única documentación de
  cómo resolver el color de un club nuevo.
- Ninguna sección se renombró ni se fusionó (siguen siendo 0-15, 17, 16 — la rareza de que la 17
  aparezca antes que la 16 ya existía y se dejó así), así que las citas cruzadas por número/§ desde
  `tools/audit.js`, `js/finanzas-calc.js`, `js/finanzas-render.js`, `Admin/CONVENCIONES.md`,
  `Admin/ESTADO.md`, `data/clubs.js`, `data/racing-data.js`, `data/gimnasiaesgrima-ar-data.js`,
  `data/instituto-data.js`, `data/stuttgart-de-data.js`, `data/augsburg-de-data.js`,
  `data/club-leagues/gb.js` y varios `fuentes/<País>/<Club>.md` siguen apuntando a la sección
  correcta. `node tools/audit.js` sigue en 0 P0/P1/P2.
- Sección "Cómo mantener este skill" reescrita con el mismo bloque de criterio explícito que ya
  tienen los otros 2 skills (qué se queda, qué se comprime, qué va a `Admin/CHANGELOG.md`/
  `Admin/Archive/`), señalando el patrón "1ra ronda... 2da ronda..." como la señal de que una
  sección se está volviendo changelog otra vez.
- **Con esto se cierra el to-do 57 completo** (las 3 partes: `club-sourcing` Versión 211,
  `club-data-mapping` Versión 212, `club-or-year-onboarding` acá) — se borra de `Admin/TODO.md`.

## Versión 214 — 17 PDF sourceados sin transcribir se transcriben (solo transcripción, sin mapeo de datos)

- Barrido de `Clubes/**` en busca de carpetas con PDF pero cero `.md`: dio 165 carpetas (varios
  cientos de PDF), la mayoría de países sourceados en sesiones recientes (Italia, Ucrania, Suiza,
  Noruega, República Checa, Países Bajos, Rusia, Portugal, Colombia, Grecia, Turquía) y nunca
  transcriptos. Esta sesión transcribió 17, elegidos por tamaño manejable (documentos chicos o con
  capa de texto nativa, no los de 60-300+ páginas o 100+ MB que quedan para una sesión de
  transcripción masiva dedicada, como la de las Versiones 156-157): Brasil (Amazonas x2, Operário
  Ferroviário x2), México (reglamento de Control Económico de LIGA MX), Turquía (Kocaelispor,
  İstanbul Başakşehir), Ucrania (Kolos Kovalivka, Obolon), Rusia (Akhmat Grozny), Italia (Hellas
  Verona x2, Cremonese), Noruega (Oslo KFUM x2), Portugal (Tondela) y Argentina (All Boys). 10 vía
  `pdftotext -layout` (texto nativo), 7 vía OCR con Tesseract (páginas escaneadas).
- **Gotcha nuevo, no cubierto por CLAUDE.md hasta ahora**: `Clubes/Ucrania/Kolos Kovalivka/
  kolos-auditor-info-adicional-2025.pdf` tiene capa de texto, pero es mojibake — `pdffonts` muestra
  fuentes Helvetica/WinAnsi no embebidas y sin mapa ToUnicode, así que `pdftotext` devuelve texto
  latino sin sentido en vez del cirílico real (ej. "ТОВ «АУДИТОРСЬКА»" sale como
  `TOB (AyAI4TOPCbKA`). Un `pdftotext` que "funciona" (no vacío, no tira error) no alcanza para
  confiar en la capa de texto: si el idioma esperado es cirílico/no-latino y el resultado sale en
  caracteres latinos irreconocibles, es mojibake, no texto real — hay que tratarlo como escaneado y
  pasar a OCR. Se resolvió así (Tesseract, `-l ukr`) y se transcribió completo.
- **Hallazgo real, no de proceso**: `Clubes/Rusia/Akhmat Grozny/2025-poyasneniya.pdf` transcribe
  perfecto (texto nativo limpio) pero NO es la información financiera de Akhmat Grozny — es la
  plantilla legal en blanco ("Приложение № 8 к ФСБУ 4/2023", generada desde la base de datos legal
  KonsultantPlus) del formulario de notas al balance, sin un solo valor cargado. El sourcing de este
  club trajo el formulario equivocado; falta volver a buscar el documento real.
- **OCR con calidad mala en tablas de 2+ columnas, marcado en el propio `.md`, no arreglado a mano**
  (regla del proceso: no inventar números que el OCR no puede leer con confianza): `Clubes/Brasil/
  Amazonas/balancos-2022-2023.md` (balance y balancete a 2 columnas, filas mezcladas incluso tras
  la corrección de rotación), las páginas 4-5 de ambos `Clubes/Noruega/KFUM/aarsregnskap-osloKFUM-
  2018/2019.md` (el formulario oficial de Brønnøysundregistrene salió mezclado, pero el mismo dato
  aparece limpio más adelante en el propio documento, en el "Balanse" del club) y varias páginas de
  `Clubes/Argentina/All Boys/asamblea-general-ordinaria-2024-presentacion.md` (diapositivas con
  logos/fotos, esperable en una presentación — las 2 diapositivas con datos económicos sí salieron
  legibles). Ninguno de estos 4 archivos debería usarse para cargar datos sin volver a chequear esas
  páginas contra el PDF.
- Alcance explícito de esta sesión: SOLO transcripción, cero mapeo de datos a `data/*.js`. Ningún
  club de los de arriba pasa a estar "cargado al sitio" — siguen en 65 clubes/131 ejercicios (ver
  `Admin/ESTADO.md`). Quedan ~148 carpetas más sin transcribir, la mayoría de las mismas 11
  países; no es un to-do nuevo, es trabajo de sourcing/transcripción normal, mismo criterio que
  sacó de la lista los puntos de "buscar y cargar" en la Versión 138.
- Se agrega el to-do 60 a `Admin/TODO.md`: re-chequear a mano las 4 transcripciones con OCR de mala
  calidad de esta sesión antes de usarlas para cargar datos.

## Versión 215 — 19 PDF más se transcriben (2do barrido, mismo alcance que la Versión 214)

- Continuación directa de la Versión 214: 19 PDF más de las mismas carpetas sin transcribir,
  completando 5 clubes enteros y dejando avanzado un 6°. Brasil (América Futebol Clube x3, Volta
  Redonda x4), Turquía (Gaziantep FK, las 4 planillas: flujo de caja, situación financiera, estado
  de resultados, cambios en el patrimonio), Rusia (Dínamo Majachkalá x3) y Portugal (Estrela da
  Amadora x3) quedan con TODOS sus PDF transcriptos; Colombia (Unión Magdalena) suma 2 de 3 (ver
  abajo). 13 vía `pdftotext -layout`, 6 vía OCR con Tesseract.
- **Descarga rota, no transcribible**: `Clubes/Colombia/Union Magdalena/dictamen-revisor-fiscal-
  2021.pdf` no es un PDF — es una página HTML "The URL you requested has been blocked" guardada con
  extensión `.pdf`, de un intento de descarga de una sesión anterior que `fuentes/Colombia/Union
  Magdalena.md` ni siquiera mencionaba. Se dejó sin transcribir y se corrigió la nota de sourcing
  con el hallazgo; hace falta volver a descargarlo del origen real.
- **Verificación cruzada del hallazgo de la Versión 214** (la plantilla en blanco de Akhmat Grozny):
  se le pidió al agente de Dínamo Majachkalá chequear lo mismo sobre su propio
  `2025-poyasneniya.pdf` (mismo nombre de archivo, mismo tipo de documento, mismo país) — en este
  caso SÍ es el documento real, con cifras y firmas del club, no una plantilla. Confirma que el
  problema de Akhmat Grozny fue puntual de ese club, no un patrón del canal ruso en general.
- Más OCR de calidad mala encontrado y marcado inline (no corregido a mano): 2 de las 4 planillas de
  Gaziantep FK con un dígito de más/de menos entre el detalle de una fila y su propio total impreso;
  las tablas numéricas densas (páginas rotadas) de `Dínamo Majachkalá/2025-poyasneniya.md`; y las 3
  transcripciones de Estrela da Amadora, con cifras de Balanço/Demonstração de Resultados degradadas
  o perdidas en varias páginas (texto narrativo sí confiable en las 3). Se suman al to-do 60.
- Mismo alcance que la Versión 214: SOLO transcripción, cero mapeo a `data/*.js`.

## Versión 216 — logging de búsquedas y comparaciones (Worker + KV propios)

- Motivación de Guido: tipeó "BILBAO" en el buscador esperando encontrar Athletic Club y no lo
  encontró — quiere ver esos casos antes de decidir si hace falta un alias. Cloudflare Web Analytics
  (Versión 166) no sirve para esto: solo mide pageviews/referrers, no texto libre tipeado.
- Worker propio (`square-sky-ca25.guidomamone91.workers.dev`, cuenta de Cloudflare de Guido) + KV
  namespace `FOS_LOGS`, ambos en el free tier (100k requests/día, 1k writes/día — el tráfico del
  sitio no se acerca). El Worker guarda contadores simples: `search:hit:<término>` /
  `search:miss:<término>` (búsqueda tuvo o no resultado) y `compare:<a> __vs__ <b>` (par de lados
  elegido en Comparar, alfabetizado para que A-vs-B y B-vs-A sumen al mismo contador). Se lee
  directo desde el dashboard de Cloudflare (KV Pairs), sin reporte propio que mantener.
- Dos hooks nuevos en `js/selector.js`: `renderBusqueda()` (línea ~2187) loggea la búsqueda con un
  debounce propio de 900ms (más largo que el de renderBusqueda en sí, Versión 165, para no mandar
  "b", "bi", "bil…" de una misma búsqueda como términos separados); `confirmar('vs')` (línea ~1386)
  loggea el par SOLO cuando los dos lados ya están puestos (un lado solo no es una comparación
  todavía).
- **Gateado por hostname a propósito** (`logEvent()`, línea ~79): si `location.hostname !==
  'financeofsports.com'`, no manda nada. Sin esto, cualquier sesión de trabajo probando el buscador
  en preview local ensuciaría las cuentas reales — confirmado en el navegador: tipear "BILBAO" en
  local no genera ningún request al Worker, y el mismo flujo en producción si lo genera. La única
  forma en que un test deja rastro es pegándole directo al Worker por fuera del sitio (pasó una vez,
  a mano, para confirmar que el binding KV funcionaba — esa entrada de prueba quedó marcada para que
  Guido la borre).
- `ASSET_V` a 229.
