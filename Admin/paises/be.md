<!-- md: las reglas de datos que solo valen para Bélgica (el mismo formato que CONVENCIONES-DATOS.md) | leer: al cargar o corregir un club de Bélgica -->
# Reglas de datos de Bélgica

## REGLA: el intangible belga "Concessies, octrooien, licenties…" no es de jugadores sin confirmación del documento (votación 3 a 0)

La amortización de ese intangible va a `depreciation` y el residuo de "Andere bedrijfsopbrengsten" a `other_income`, salvo que el propio
documento (una nota de reglas de evaluación, el Jaarverslag con la cifra) diga que es de jugadores o de transferencias: entonces
`player_amortisation` y `player_sales`. El rótulo cargado no agrega palabras que el documento no imprime ("spelersregistratierechten",
"probablemente…"). Casos: Dender (`depreciation`), Charleroi y Anderlecht (confirmados por texto: `player_amortisation`), Mechelen 2025 (sin
confirmación: pasa a `depreciation` el 1,11 M y a `other_income` el 8,54 M). Westerlo y Antwerp: mirar si tienen la confirmación por texto.

CATEGORÍA (prompt, futbol): en Bélgica, el intangible «Concessies, octrooien, licenties…» y su amortización van a depreciation, y el residuo de «Andere bedrijfsopbrengsten» a other_income, salvo que el documento diga que es de jugadores o de transferencias (entonces player_amortisation y player_sales); no agregues palabras que el documento no imprime.

## Pipeline de Bélgica: el esquema NBB

### Verificar (etapa 6): escalón «códigos NBB» y el 630 por la nota
Escalón "códigos NBB": un estado belga con los códigos legales del
esquema NBB (de 70/76A, 70/74 o 9900 hasta 9904; en tabla o en texto suelto) se lee por sus códigos: se cargan las hojas del esquema
con el signo de su código (las reversiones "(+)/(-)" negativas restan; el detalle 600/8 + 609 o 650/652/9 si suma su renglón, nunca
los dos; la Brutomarge abreviada se abre en Omzet/60/61 + el residuo implícito solo si el residuo no es negativo; con residuo
negativo y 60/61 impreso el ingreso es una sola línea, 70/74 = 9900 + 60/61 (las partes impresas no cuadran: no se inventa una
composición); sin 60/61 queda sin abrir: el margen, o como gasto si es negativa). Cada año cargado lleva `revenue_basis` (completo,
ventas totales o margen bruto) y, si se reconstruyó con 60/61, `revenue_derivation` (`tools/ingreso-derivado.js`; `node tools/fos.mjs
ingreso-base` lo completa en lo ya cargado; `audit.js`: `ingreso-reconstruido-no-cierra` e `ingreso-sin-base`). Compuerta: cierran EXACTO (media unidad por fila) todos los totales impresos de la columna del año; si
no, la escalera de siempre. No corre si el documento tiene ajustes `fila` (manda el ajuste). Con esas filas la escalera prueba primero
la lectura 4. Dos escalones más, con la misma lectura: el chequeo del año vecino compara los códigos 9904 y 9901 impresos de las dos
columnas cuando los ingresos se presentan distinto (Brutomarge abierta en un año y no en el otro, reclasificaciones, esquema abreviado
contra completo), y el caso "primer año" no hace falta (cada código tiene un solo lado). Ensayo gratis: `node tools/nbb.mjs "<archivo.md>"`.
El 630 por la nota: si los códigos "Geboekt" de la nota de activos fijos (8072/8079 pases, 8073 goodwill,
8271-8276/8279 materiales) suman EXACTO el 630, el 630 se reemplaza por esas partes, con los rótulos de los ajustes ya cargados
("Afschrijvingen immateriële vaste activa (spelers)", "Afschrijvingen goodwill", "Afschrijvingen materiële vaste activa"); si no, queda
entero. No en un año ya publicado (sus filas son las que se categorizaron).

### Cargar (etapa 8): año belga sin ingresos
**Año belga sin ingresos.** Un estado belga abreviado cuyo escalón de códigos NBB cerró exacto con la Brutomarge 9900 negativa
cargada como gasto no tiene ninguna fila de ingresos. Si además el resultado del ejercicio cierra y el total de ingresos de la verificación es 0, `cargar.mjs` ya no
frena con "ninguna fila de ingresos con categoría aceptable": el total oficial de ingresos es 0, con un aviso, y no se buscan televisión ni estadio en 0. Casos:
Lierse SK 2020 y 2021, Patro Eisden 2021 (Lierse SK 2019 sigue frenado por su período de 12 meses distinto).

### Caja y deuda: un año sin vecino
Caja de un año SIN VECINO en el esquema NBB belga: la escalera no decide (su compuerta pide un vecino), así que la caja sale del
código 54/58 (la celda que sigue al código) si el balance del propio documento cuadra (20/58 = 10/49). Solo la caja: la deuda por códigos
(170/4, 42, 43) no coincide con el criterio con que se cargó Bélgica (`cajaNBB` en `tools/caja-deuda.mjs`).
