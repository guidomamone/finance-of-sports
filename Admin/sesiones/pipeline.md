# Cierre de la sesión pipeline (worktree fos-pipeline, rama pipeline)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- **La escala del año en caja-deuda (to-do 289).** `tools/caja-deuda.mjs`, `escalaDe`: escalón 0, ajuste manual `escala`
  (`unidades` | `miles` | `millones`, por PDF y año con `--anio`, campo nuevo en `tools/ajustes.mjs`); escalón 1, `factorPorIngresos`
  como antes. Lo usan todos los lugares de `contexto()` y `--medir --escalas`. Medido sin ajustes: `--medir --detalle` y ensayo `--club`
  de los 259 clubes, idénticos antes y después. Con los ajustes nuevos, `--medir` sigue idéntico.
- **Ajustes escritos** (`Admin/registros/ajustes-manuales.jsonl`, leídos por subagente Sonnet y revisados contra el `.md`):
  RB Leipzig 2024 (escala miles; caja 783 TEUR; deuda 153.717 TEUR), RB Leipzig 2023 (escala miles; caja 765.425,23 EUR; deuda 111.731
  TEUR), HSV 2024 (escala miles; caja 35.723.518,58 EUR; deuda 57.848 TEUR, con el bono convertible por decisión de Guido). Ensayo: Leipzig 4 de 4
  años vacíos, HSV 2 de 2.

- **La numeración "bis" en caja-deuda (to-do 290).** `sinCodigo` (`tools/caja-deuda.mjs`) y `claveFamilia` (`tools/vocabulario.mjs`) sacan
  "4 bis)", "5-bis)", "17bis)", "15 bis )" (y "ter") como sacaban "4)": el diccionario de deuda ve "4 bis) Debiti verso banche oltre
  l'esercizio successivo". Medido: `--medir` deuda, distintos de lo cargado 11 → 10 (sale Genoa 2022, que daba 15,68 M contra 95,7 M:
  ahora propone 65,24 M y la compuerta no lo confirma, sin dato) y ningún distinto nuevo; ensayo de los 259 clubes idéntico;
  `medir-cargar --dir Clubes/Italia` (176) y `medir-verificar` sobre prueba-completa (358) idénticos.

- **Opus → Sonnet, primera tarea: caja-deuda (to-do 288).** `tools/claude-llamada.mjs`: `modelo` por llamada (Opus por defecto). `tools/caja-deuda.mjs`:
  `--medir --ia --modelo opus|sonnet` (respuestas aparte, `.caja-deuda-ia.<modelo>.json`) y el escalón 2 pasa a Sonnet. Medido en los 606 documentos
  de los años cargados (US$ 12,37): deuda 210 iguales / 14 distintos contra 211 / 18 de Opus, caja 421 / 7 contra 417 / 7, ningún distinto
  nuevo. Las respuestas de Opus guardadas se siguen usando; con ellas más las de Sonnet donde no había: deuda 215 / 18, caja 423 / 7 (antes
  211 / 18 y 417 / 7). Ensayo de los 259 clubes idéntico. No se repitió Opus (piso de variación): la compuerta contra lo cargado ya pasaba.

- **Opus → Sonnet, segunda tarea: perimetro-a2 (to-do 288), medida y NO adoptada.** `tools/perimetro-senales.mjs --modelo opus|sonnet` (con
  --jev) y la verdad `Admin/mediciones/perimetro-a2-verdad-ajustes.tsv` (202 documentos, del ajuste `perimetro`). Sonnet: 4 errores que Opus no
  tiene. A2 sigue en Opus (HALLAZGOS-pipeline.md). Costo de la medición US$ 13,82 (Opus repagó 100 documentos, no ~35: caché vieja).

- **Opus → Sonnet, tercera tarea: localizar (to-do 288), medida y NO adoptada.** `tools/localizar.mjs --lista <x> --modelo opus|sonnet`
  (`.ubicacion.<modelo>.json`, con el perímetro del club como lote.mjs). Estado igual en 76 de 76, notas distintas en 45 de 77: sigue en Opus
  (HALLAZGOS-pipeline.md). US$ 3,97.

- **Opus → Sonnet, cuarta tarea: extraer (to-do 288), medida y NO adoptada.** `tools/extraer.mjs --modelo opus|sonnet` (`.filas.<modelo>.json`)
  y `tools/medir-verificar.mjs --filas <modelo>`. Sobre prueba-rapida, Sonnet deja 10 documentos en la cola con otros totales (Opus nuevo: 0):
  sigue en Opus (HALLAZGOS-pipeline.md). US$ 10,79 entre las dos corridas.

- **Opus → Sonnet, quinta tarea: categorizar (to-do 288), sin medir otra vez.** Ya estaba medido (`Admin/mediciones/test-categorizar-claude.md`,
  259 rubros): Sonnet 74,9% contra 81,1% de Opus, peor calibrado, centavos de ahorro. Sigue en Opus. **El to-do 288 se cierra:** solo
  caja-deuda pasó a Sonnet; perimetro-a2, localizar, extraer y categorizar siguen en Opus, cada uno con su medición en HALLAZGOS. Gasto de las
  mediciones de esta sesión: US$ 40,95 (caja-deuda 12,37; perimetro-a2 13,82; localizar 3,97; extraer 10,79).

- **El cierre falso de verificar (to-do 298 a).** `tools/verificar.mjs` (`cierraRes`): un resultado impreso NEGATIVO tiene que cerrar con su
  signo; el valor absoluto queda para el impreso positivo o sin signo (escalera del to-do 198). Caso: Lierse Kempenzonen 2022 (impreso −4.591)
  cerraba "financiero invertido" con +4.590; ahora no cierra con esa lectura. Medido con `medir-verificar` sobre 376 documentos
  (prueba-completa + Bélgica y Estonia, con los derivados de la principal copiados un rato): idénticos. Comparar siempre con signo se
  probó y no entra (cambiaba Novorizontino 2014-b, AVS 2023-24 y Portimonense 2022-23, pérdidas impresas sin signo).

- **Los costos financieros belgas (to-do 298 b, parte 1).** `tools/vocabulario.mjs` FIN_GASTO: nl `financiele kosten`, `kosten van schulden`;
  fr `charges des dettes`. El escalón "financiero por rótulo" de verificar les pone el signo. Caso: Beerschot 2025 cierra exacto sin sus 2
  ajustes `fila` de signo (antes, el resultado no daba y sumaba 15 líneas fuera del total de gastos). Medido: los 9 belgas sin sus ajustes de
  signo, ninguno empeora (Beerschot y OH Leuven pasan a cerrar); 376 documentos con los ajustes actuales, 375 idénticos (OH Leuven 2025, en la
  cola en los dos, deja de sumar dos veces los gastos); prueba-completa (358) idéntica con el archivo final.

- **Las filas "Waarvan:" (to-do 298 b, parte 3).** `tools/vocabulario.mjs` DE_LOS_CUALES (nl waarvan, fr dont, de davon, it di cui, en of
  which, es de los cuales, pt dos quais, da heraf, no herav, sv varav) y en `tools/verificar.mjs` el escalón "de los cuales": si ninguna
  lectura cerró, las lecturas 4 y 5 sin esas filas, compuerta exacta. Casos: Lierse SK 2025 (76A 82.200 bajo la Brutomarge 2.706.155) y Patro
  Eisden 2025 cierran sin su ajuste `fila` en 0. Medido: 376 documentos, 374 idénticos; los 2 que cambian son esos dos (en la cola en los dos
  casos acá, porque la rama no tiene sus otros ajustes). Parte 2 de la b ("(+)/(-)"): no se reproduce (HALLAZGOS).

- **La versión corregida reemplaza al original (to-do 298 o).** `tools/lote.mjs`: si la lista trae `<doc>.pdf` y `<doc>-correction.pdf` (misma
  carpeta, la corrección con su .md), entra solo la corrección; el original se saltea con aviso y el final lo propone para
  `documentos-descartados.txt`. Medido: ensayo de prueba-completa idéntico; una lista de 3 pares (Beerschot 2019, Club Brugge 2013, Dender
  2017) y un original solo (Mechelen 2023) hace entrar 4 documentos, no 7.

## Qué queda pendiente (para TODO)

- **Escribir caja y deuda en `data/`, en la carpeta principal después del merge** (sin API: escalón 0). Junto con lo que ya dejó la
  sesión anterior:
  `node tools/caja-deuda.mjs --club dortmund-de --escribir && node tools/caja-deuda.mjs --club rbleipzig-de --escribir && node tools/caja-deuda.mjs --club hamburgersv-de --escribir`
  Escribe Dortmund 2024-2025, RB Leipzig 2022-2025 y HSV 2024.
- **Criterio nuevo de deuda (decisión de Guido, 2026-10-18), para `Admin/CONVENCIONES-DATOS.md` y la skill `club-data-mapping`:** un bono
  convertible (Wandelschuldverschreibung) es deuda financiera y entra en `grossDebt`. Caso: HSV 2024, 57.848 TEUR con la WSV de 30.000.
  HSV 2025 no la suma (ver el criterio de abajo).

- **`localizar.mjs --lista --ejecutar` imprime "Gastado: US$ 0.00"** aunque el registro (claude-api.jsonl) anota el costo real (US$ 3,97 en
  la medición de Sonnet): el total del final no suma. Solo es lo que se muestra; `tools/gasto.mjs` da el número bueno.
- **Genoa 2022 en `--medir`:** con la regla de los "bis", la propuesta es 65,24 M (soci 1,3 + banche 15,68 + banche oltre 48,27). Para
  llegar a los 95,7 M publicados faltan las dos filas de altri finanziatori (factoring, 30,45 M): depende de la decisión del to-do 291.
  Además, la compuerta del documento siguiente no confirma: en 2023 "3 bis) soci" tiene vacía la columna del año (pasó a corto plazo).
- **Nuevo to-do, Milan 2018 en `--medir` (1,21 M contra 164,27 M publicados):** las filas de deuda son "a) entro 12 mesi" y "b) oltre 12
  mesi" debajo de un título sin importe ("1 obbligazioni", "5 debiti verso altri finanziatori"; AC-Milan-bilanci-relazioni-2017-18.md
  L895-904), y el diccionario solo ve "4 debiti verso banche" (la única con importe en su renglón). Sin daño hoy: es un año cargado.
- **Criterio, para `Admin/CONVENCIONES-DATOS.md` y `club-data-mapping` (decisión de Guido, 2026-10-18):** un bono convertible con conversión
  OBLIGATORIA en acciones, que el documento muestra como partida especial después del patrimonio (Sonderposten nach dem Eigenkapital), no
  es deuda. HSV 2025 queda en 22,03 M (la Wandelschuldverschreibung de 30 M fuera; .md L395-406). Junto con el de arriba: convertible
  común dentro de las deudas, sí; convertible obligatorio fuera de las deudas, no.

## Qué deja de ser cierto en ESTADO

- Los to-dos 288, 289 y 290 se cierran, y las letras a), b) (la parte 2 no se reproduce) y o) del 298 (290: Genoa 2022 deja de dar un valor mal; el valor publicado depende del 291).
- RB Leipzig 2023-2024 y HSV 2024 dejan de estar "sin escala del documento" en caja-deuda.

## Para fos-onboarding (cómo se carga)

- Nada cambia mientras un documento no tenga un ajuste `escala`. El campo nuevo `escala` existe solo en esta rama hasta el merge.
- caja-deuda pregunta a Sonnet (no a Opus) en el escalón 2 desde el merge: con las respuestas guardadas, lo que se escribe no cambia; en un documento nuevo, contesta Sonnet.
- `claveFamilia` saca ahora la numeración "bis" (to-do 290): `cargar.mjs` y `verificar.mjs` medidos idénticos (Italia y prueba-completa); cambia solo qué filas "bis" ve el diccionario de deuda de caja-deuda.
- `verificar.mjs` (to-do 298 a): un documento con resultado impreso negativo que solo cerraba con las filas dadas vuelta (en valor absoluto) ya no cierra: va a la cola. En los 376 medidos no cambió ninguno.
- `vocabulario.mjs` FIN_GASTO suma tres rótulos belgas (to-do 298 b1): un documento NBB nuevo cierra con "financiero por rótulo" sin el ajuste `fila` de signo de los costos financieros; los ajustes ya puestos siguen dando lo mismo.
- `verificar.mjs` escalón "de los cuales" (to-do 298 b3): un documento que no cerraba porque sumaba aparte una fila "Waarvan:"/"dont"/"davon" puede cerrar sin ella (solo si el cierre es exacto). Los ajustes `fila` en 0 ya puestos siguen dando lo mismo.
- `lote.mjs` (to-do 298 o): con un original y su "-correction" en la misma lista, entra solo la corrección; el original queda propuesto para `documentos-descartados.txt` (sin escribirlo). Una lista con un original solo, como siempre.

## Después del merge del 2026-10-18

Lo de arriba ya lo pasó la principal (merge 621acf6cea, CHANGELOG 738). Lo nuevo va acá.

### Qué cambió
- **El código NBB no es un importe (to-do 298 c, parte 1).** `tools/caja-deuda.mjs` (`esRefNota`): una celda con barra ("54/58", "631/4",
  "70/76A") o un número pegado a A/B ("76A", "66B") es un código de cuenta. Antes, Lierse SK, Lokeren-Temse, Lommel SK, Patro Eisden y RWDM
  daban la misma caja 0,005458 (el código 54/58); ahora el escalón 1 propone la caja impresa (Lierse SK 2025: 2.984 TEUR, L169). Medido:
  `--medir` deuda 168 → 170 iguales (Académico de Viseu 2023 y 2024), sin distintos nuevos; ensayo de los 259 clubes igual salvo Estrela da
  Amadora 2023 (sigue sin dato; el ensayo ahora ofrece la IA, US$ 0,01). Los belgas siguen sin dato hasta la parte 2 (un solo año, sin vecino).

### Para fos-onboarding
- caja-deuda deja de leer los códigos NBB como importes: en un club belga, Jev ya no tiene guardada la respuesta (cambian las filas), y un
  `--ejecutar` paga ~US$ 0,07 por club en Jev.
