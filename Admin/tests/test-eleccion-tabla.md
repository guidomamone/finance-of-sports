# Test de elección de tabla y de lado (ingreso/gasto) para la carga automática — 2026-09-30

Dos problemas medidos en `tools/proponer-carga.mjs` (etapa 5 del pipeline) y `tools/filas-rubro.mjs`, resueltos con un test que eligió
por datos. Todo sin tokens de sesión: backtest contra producción, Jev para categorizar (con caché), Mistral solo para ampliar la muestra.

## Gasto

| API | Qué | Costo |
|---|---|---|
| Mistral OCR | 45 `.mistral-redo.md` nuevos (los 45 ejercicios cargados más cortos que no lo tenían, 688 páginas) | **US$ 2,75** |
| Jev | 5.214 llamadas únicas (caché en disco; cada estrategia extra costó 0 a 250 llamadas nuevas) | ~US$ 0,3 (estimado a ~1.500 tokens por llamada) |
| Claude / Gemini | nada | 0 |

Un backtest completo (92 ejercicios, ~3.000 filas) tarda ~45-70 s con concurrencia 6; con la caché caliente, igual (el cuello es preparar).

## A) Elección de la tabla

### Qué pasaba

La versión 1 cargaba todas las filas de todas las tablas `likelyRelevant` con palabras de estado de resultados, sin abrir ninguna nota:

- **Arsenal**: la nota "3. Group turnover" (taquilla / TV / comercial, que suma exactamente `Group turnover 616.580`) no estaba marcada
  `likelyRelevant`, así que Jev solo veía la línea resumida. 0-1% de ingresos bien ubicados.
- **Bayern**: la GuV del Einzelabschluss está en una lista con viñetas ("- Einnahmen aus dem Spielbetrieb 260,7 Mio. Euro"), no en una tabla.
- **Werder (HGB)**: la GuV tiene dos columnas por año (sub-partidas y total); `yearColumn()` tomaba la primera y "1. Umsatzerlöse" no existía.
- **Fulham / Sunderland**: igual que Arsenal (la nota de turnover no era relevante).
- Además, meter todo infla: la mediana de dinero de ingresos propuesto "de más" (categoría que producción no tiene, o por encima) era 107% en el set de 40.

### Estrategias comparadas (`--tabla <estrategia>`)

- **actual**: la versión 1.
- **ancla**: cada línea (y cada subtotal) del estado de resultados se busca en TODO el documento. Si una tabla tiene filas contiguas que suman
  exactamente ese importe (± redondeo de n importes impresos), se cargan esas filas en vez de la línea. Es recursivo (hasta 3 niveles: Staff costs de
  Arsenal se abre en la nota de sueldos). La escala de la nota se deduce del cierre, no se adivina.
- **ancla-listas**: igual, pero también busca en listas con viñetas.
- **ancla-listas-solo-principales**: la primera versión de ancla, que solo recorría las tablas con título de estado de resultados.
- **ancla-listas-libres**: acepta también ventanas de 3+ filas que no están cerradas por un total impreso (`--ventanas-libres`).
- **cierre**: por lado, la tabla con más filas cuya suma coincide con algún total impreso del documento.
- **precedente**: por lado, la tabla cuyas etiquetas más se parecen a los rubros que el club tiene cargados en OTROS años.

Métrica: la del backtest (dinero de producción que quedó en la categoría correcta, contando solo las filas con Jev ≥ 0,90), más dos nuevas:
**"de más"** (dinero propuesto que sobra respecto de producción, en mediana, porque un ejercicio con escala mal leída da 50.000% y se come la media)
y **cierre** (las filas de ingresos propuestas suman un total de ingresos impreso en el documento). Todas las estrategias usan la MISMA caché de
Jev, así que la diferencia entre ellas es solo la elección de filas (sin caché, dos corridas de la misma estrategia difieren un par de puntos).

### Resultados

Set de 40 (el mismo de la versión 1, todos con `.mistral-redo.md`):

| Estrategia | Con propuesta | Ingresos bien ubicado (media / mediana) | Gastos bien ubicado (media / mediana) | Ingresos de más (mediana) | Gastos de más (mediana) | Ejercicios ≥90% / ≤10% ingresos | Cierra con un total impreso | Filas a Jev |
|---|---|---|---|---|---|---|---|---|
| actual | 34 (85%) | 67% / 91% | 60% / 60% | 107% | 12% | 17 / 6 | 5 (15%) | 1955 |
| ancla | 34 (85%) | 67% / 75% | 58% / 63% | 77% | 19% | 11 / 3 | 4 (12%) | 1889 |
| **ancla-listas** | 34 (85%) | **70% / 81%** | 58% / 63% | 77% | 18% | 12 / **2** | 3 (9%) | 1894 |
| ancla-listas-solo-principales | 34 (85%) | 61% / 70% | 49% / 54% | 1% | 4% | 11 / 6 | 6 (18%) | 1254 |
| ancla-listas-libres | 34 (85%) | 68% / 81% | 57% / 60% | 46% | 19% | 9 / 2 | 4 (12%) | 2048 |
| cierre | 34 (85%) | 68% / 83% | 43% / 47% | 51% | 6% | 15 / 5 | 3 (9%) | 1400 |
| precedente | 35 (88%) | 72% / 83% | 49% / 45% | 1% | 10% | 13 / 5 | 14 (40%) | 1157 |

Set completo (92 ejercicios cargados con `.mistral-redo.md`: los 40 + 45 transcriptos hoy + 7 que ya lo tenían; 74 arman propuesta):

| Estrategia | Con propuesta | Ingresos bien ubicado (media / mediana) | Gastos bien ubicado (media / mediana) | Ingresos de más (mediana) | Gastos de más (mediana) | Ejercicios ≥90% / ≤10% ingresos | Cierra con un total impreso | Filas a Jev |
|---|---|---|---|---|---|---|---|---|
| actual | 74 (80%) | 54% / 63% | 55% / 55% | 53% | 7% | 29 / 21 | 9 (12%) | 3114 |
| ancla | 74 (80%) | 61% / 73% | 55% / 57% | 19% | 11% | 29 / 14 | 8 (11%) | 3066 |
| **ancla-listas** | 74 (80%) | **64% / 77%** | **55% / 57%** | **20%** | 7% | **31 / 12** | 7 (9%) | 3076 |
| ancla-listas-solo-principales | 74 (80%) | 58% / 69% | 48% / 51% | 1% | 2% | 27 / 16 | 11 (15%) | 2166 |
| ancla-listas-libres | 74 (80%) | 63% / 77% | 53% / 54% | 15% | 11% | 28 / 12 | 8 (11%) | 3404 |
| cierre | 74 (80%) | 57% / 69% | 45% / 39% | 9% | 1% | 27 / 18 | 8 (11%) | 2497 |
| precedente | 75 (82%) | 58% / 70% | 50% / 45% | 1% | 7% | 23 / 18 | 24 (32%) | 2237 |

Los cuatro casos que motivaron el test (ingresos / gastos bien ubicados):

| Documento | actual | ancla-listas |
|---|---|---|
| Arsenal 2023-24 | 1% / 100% | 100% / 100% |
| Arsenal 2024-25 | 0% / 100% | 100% / 94% |
| Fulham 2023-24 | 7% / 0% | 100% / 0% |
| Fulham 2024-25 | 4% / 0% | 99% / 0% |
| Bayern (4 ejercicios) | 0% / 0% | 100% / 0% |
| Werder 2022-23 | 0% / 48% | 15% / 85% |
| Werder 2023-24 | 0% / 89% | 14% / 89% |
| Sunderland 2023-24 / 2024-25 | 22% / 0%, 11% / 0% | 77% / 14%, 91% / 17% |

Detalle por ejercicio: `Admin/test-proponer-carga_F_<estrategia>.jsonl` (campo `filas`: etiqueta, importe en millones, lado, categoría, confianza y
de dónde salió cada fila: `estado N` o `nota N (ancla M)`).

### Recomendación: `ancla-listas` (quedó como default)

Es la que más dinero de ingresos ubica bien en los dos sets (+10 puntos en el completo, +3 en el de 40), la que menos ejercicios deja en 0-10%
(21 → 12) y la que más baja el dinero "de más" sin perder ingresos (53% → 20%). En gastos empata con la versión 1 en el set completo (55%) y
pierde 2 puntos en el de 40. `precedente` y `cierre` tienen menos "de más" porque cargan menos, pero pierden 5-10 puntos de gastos.
`solo-principales` confirma que el título de la tabla no alcanza para saber cuál es el estado principal.

Lo que hubo que agregar para que el ancla no metiera basura (cada uno con su comentario y número en el código):

1. Solo ventanas **naturales** (la tabla entera, o cerradas por una fila de total que vale el ancla). Con ventanas libres, Arsenal "abría"
   subtotales en conciliaciones de impuestos diferidos y en el informe de gestión.
2. Signos mezclados solo si hay un total impreso; **materialidad** (líneas < 0,5% del importe mayor no se abren); **no se abren resultados**
   ("Loss for the year" se abría en la tabla de impuestos).
3. Escala de la nota **deducida del cierre** (la del texto o la plausible, la que cierra): `pickScale()` ponía los honorarios de auditoría de Arsenal en millones.
4. Encabezados: grupo de columnas del año (Werder, Arsenal), encabezados de varios renglones y columnas "Nota" (Colo-Colo), etiquetas partidas
   en dos filas ("Spielerträge ... / sowie Transfererträge").
5. Recorrer **todas** las tablas de estado (no solo las de título de estado), pero saltear una tabla secundaria cuyos importes ya se vieron
   (la nota de segmentos de Colo-Colo repetía el estado) y no reemplazar un subtotal por un detalle con menos filas (Colo-Colo abría su nota
   de ingresos en la tabla de NIIF 15 por momento de reconocimiento).
6. Listas: se sigue la lista a través de aclaraciones entre paréntesis de varios renglones y de los "- davon ..." (Bayern).
7. Resultados puros ("Operatives Ergebnis", "Gewinn vor Steuern", "(Loss) for the financial year") ya no llegan a Jev; se salvan los que son una venta
   ("Profit on disposal of players' registrations" es un ingreso en producción).

## B) Lado (ingreso / gasto) en `filas-rubro.mjs`

### Causa

1. **Estructura**: un subtotal que es un RESULTADO con una palabra de gasto adentro ("Profit/(loss) before net finance **charges**",
   "19. Ergebnis nach **Steuern**") le ponía `expense` a todas las filas de su bloque, ingresos incluidos. La numeración "19." escondía que era un
   resultado. Además marcaba filas sin importe en esa columna.
2. **Columna de notas**: `pipeline.mjs` toma como columna de importes "la primera con números en el 40% de las filas", que en Alverca y
   Fluminense es la columna "Notas" (9, 15, "7/8" leído 78, "17.2.3"). Las "sumas" salen de números de nota.
3. **Lado de la tabla** (en `pipeline.mjs`, fallback de todo lo que la estructura no decide): una tabla "RENDIMENTOS E GASTOS" tiene las dos
   familias de palabras... pero `SIDE_REV` no tiene "rendimento", así que la tabla entera daba `expense`. Por eso "Vendas e serviços prestados"
   de Alverca quedaba como gasto: la estructura no decidía nada y caía al lado de la tabla.

### Medición

Verdad: 913 filas de 150 documentos (los `.rubros.json` + los ejercicios cargados) cuyo importe coincide con una línea de producción del mismo
club (año o año anterior); esa línea da el lado. 70 son coincidencias de importe sin ninguna palabra en común con la línea de producción
("verdad dudosa", ej. "Cargas Sociales" = "Recaudaciones Eventos Deportivos"); la columna "confiable" las excluye.
Con la tabla como último recurso, como la usa `pipeline.mjs` (`lados[i] || ladoTabla`):

| Regla | Decide | Contradice producción | Acierto | Verdad confiable (843): decide / contradice |
|---|---|---|---|---|
| **VIEJO** (estructura vieja ‖ tabla) | 626 | 67 | 89% | 574 / 37 (94%) |
| tabla sola | 571 | 62 | 89% | 522 / 32 |
| signo del importe (solo tablas con + y -), sola | 428 | 50 | 88% | — |
| estructura corregida, sola | 122 | 3 | 98% | — |
| posición ("Total X" da su lado a las filas desde el total anterior), sola | 201 | 4 | 98% | — |
| palabras de la etiqueta, sola | 309 | 15 | 95% | — |
| palabras > estructura > posición ‖ tabla | 778 | 30 | 96% | — |
| **NUEVO: estructura > posición > palabras ‖ tabla** | **778** | **27** | **97%** | **718 / 8 (99%)** |

(Una primera medición con 455 filas / 48 documentos dio lo mismo: viejo 359 decididas / 9 errores, nuevo 400 / 6, y 0 errores en la verdad
confiable. El conjunto creció al sumar los 45 `.mistral-redo` nuevos.)

**Elegido**: estructura (corregida) > posición > palabras, con reglas de palabras para impuestos (gasto aunque digan income/rendimento),
deducciones de la receita (ingreso) y subsidios (ingreso). El signo se descartó (la peor regla). Decide 152 filas más que antes y contradice
40 menos. En Alverca: "Vendas e serviços prestados", "Subsídios à exploração" y "Outros rendimentos" pasaron de `expense` a `revenue`.

### Re-generación de los `.rubros.json`

Se corrió `node tools/pipeline.mjs --ejecutar --solo-preparar --repreparar --limit 0 --sin-jev` (sin API): 438 `.rubros.json` re-generados
(388 `listo-para-jev`, 346 `sin-rubros` en el registro). **Ojo, efecto colateral encontrado**: ese comando además marca como `sin-tablas` los
documentos cuyo `.md` no tiene tablas (296 acá), y la próxima corrida del pipeline los manda a rehacer con Mistral. Esas 296 marcas NO
existían antes (eran documentos preparados antes de que existiera la regla), así que se quitaron del historial (`Admin/transcripciones-verificaciones.jsonl`,
solo las líneas `sin-tablas` de esta corrida; hay una copia de antes en el scratchpad de la sesión) y se regeneró el registro. Las 438 líneas `listo` nuevas
quedaron (dos veces, porque se corrió dos veces). Los `.jev.json` de esos documentos son de la lista de rubros anterior: Jev va a categorizar de nuevo
cuando corra `--listos` si el pipeline así lo decide.

## Lo que queda sin resolver

1. **Gastos**: el ancla no mejora gastos (55% en los dos). En Fluminense, Bahia, Frankfurt y Ponte Preta el subtotal de gastos del estado
   se abre en una nota por NATURALEZA (comisiones, limpieza, honorarios) mientras producción usa la apertura por FUNCIÓN del estado (sueldos del
   plantel, etc.): el ancla cierra bien pero elige una granularidad que Jev no puede mapear a las categorías del sitio. Fulham/Bayern: los gastos
   no tienen un total impreso contra qué anclar (Bayern publica la lista de gastos sin total).
2. **Consolidado vs individual**: con los dos estados en el documento se cargan los dos (Bayern: Umsatz 978,3 del Konzern + la lista del
   Einzelabschluss que suma 926,6). Hace falta el "alcance del año anterior" (TODO 3b del HANDOFF).
3. **Werder**: el detalle de ingresos por rubro está en PROSA del Lagebericht; la nota solo abre "Spielerträge ... sowie Transfererträge"
   en un bloque. No se intenta leer prosa.
4. **`pipeline.mjs` (no se podía editar en esta sesión)**: (a) debería elegir la columna de importes con `columnaDeImportes()` de
   `filas-rubro.mjs` en vez de "la primera con 40% de números" (evita la columna Notas); (b) a `SIDE_REV` le falta `rendiment` y `subsidi`
   (la tabla "RENDIMENTOS E GASTOS" cae a gasto); (c) `--repreparar` no debería crear marcas `sin-tablas` nuevas en documentos que ya estaban
   `listo` (dispara Mistral en la corrida siguiente sin que nadie lo pida).
5. La métrica "cierra con un total impreso" quedó baja para todas (9-15%, salvo `precedente`): el lado que se le pasa a Jev deja afuera
   filas sin lado y las de "otros ingresos". No se usó para decidir.
6. La muestra ampliada (45 documentos) son los ejercicios cargados MÁS CORTOS sin `.mistral-redo`, por presupuesto: sobre-representa
   informes de 1-20 páginas. Los 81 restantes (~4.800 páginas, ~US$ 19) no se transcribieron.
7. Aun con `ancla-listas`, 12 de 74 ejercicios siguen con ≤10% de ingresos bien ubicados: **todavía no es viable dejar escribir** la etapa 6.

## Cómo repetir

```bash
# lo que se corrió (con --sin-mistral-nuevo no se transcribe nada nuevo; la caché de Jev evita repetir llamadas)
node tools/proponer-carga.mjs --backtest --mistral-fresco --sin-mistral-nuevo --limit 0 --concurrencia 6 \
  --tabla ancla-listas --cache-jev /ruta/cache-jev.jsonl --etiqueta _F_ancla-listas
node tools/proponer-carga.mjs --backtest --mistral-fresco --sin-mistral-nuevo --solo-totales --club arsenal-gb   # gratis, para iterar
PROPONER_DEBUG=1 node tools/proponer-carga.mjs ...                                                                 # qué tablas recorre
```
