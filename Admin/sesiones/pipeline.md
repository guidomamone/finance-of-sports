# Cierre de la rama `pipeline` (sesión Pipeline 2: to-do 298 t y u primero, después el resto del plan)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- **El estado belga por sus códigos NBB (to-do 298 t, ok de Guido 2026-10-18: "escalón, no manta corta").** `tools/nbb.mjs` (nuevo) lee el
  estado de resultados del esquema NBB por sus códigos legales: las hojas del esquema con el signo de su código (reversiones "(+)/(-)"
  negativas restan; el detalle 600/8 + 609 o 650/652/9 si suma su renglón, nunca los dos; la Brutomarge abreviada se abre en Omzet/60/61 +
  el residuo implícito si el residuo no es negativo, y si no queda sin abrir; negativa, como gasto). Lee tablas y texto suelto (OH Leuven
  2019 y 2021); una línea de texto con un solo importe va a la única columna con la que el año cierra. `tools/verificar.mjs`: escalón
  "códigos NBB", compuerta: cierran exacto todos los totales impresos del año; si no cierra, o el documento tiene ajustes `fila`, la
  escalera de siempre. Con las filas NBB la escalera prueba primero la lectura 4. Además: el año vecino se compara por los códigos 9904 y
  9901 impresos cuando los ingresos se presentan distinto, y el caso "primer año" no hace falta con el estado por códigos.
  Cubre las 7 reglas de la t: Beerschot 2021 gastos 15,1 M (antes 30,7 M); Lommel SK 2023 contra 2024 coincide; Lierse SK 2019-2021 y
  Patro Eisden 2021 con la Brutomarge negativa como gasto; Patro Eisden 2022 y 2023 y Lokeren-Temse 2021-2023 con el residuo (768.543,
  1.451.259, 76.401, 64.280, 551.469); el financiero abreviado restando; las reversiones restando; OH Leuven 2021 con el estado de la
  pág. 8 del visor (ingresos 11.399.352, gastos 28.279.767). Patro Eisden 2020 -correction: Brutomarge 277.991 sin abrir (decisión de Guido).
  Medido (medir-verificar, 2 pasadas, prueba-completa + los 60 belgas con verificación): los 358 de otros países idénticos; en Bélgica 17
  documentos de cola a OK, ninguno de OK a cola. medir-cargar sobre Bélgica: los 10 años publicados se reproducen (10 de 10, como antes).
  Auditoría P0 0 / P1 0. Commit 610179d6f7.

## Qué queda (para TODO)

- 298 t, lo que no cubre: los años 2025 belgas ya cargados tienen ajustes `fila` (Beerschot, Lierse SK, Lokeren-Temse, Lommel SK, OH
  Leuven, Patro Eisden, RWDM) y el escalón no corre en ellos (manda el ajuste). Dos quedaron cargados con errores chicos que el escalón
  hubiera evitado: Patro Eisden 2025 (ingresos 1.810 de más por el "waarvan" 76A; gastos 4.012 de más por el 631/4 impreso −2.006 sumado
  como +2.006; cerró por la tolerancia) y Lommel SK 2025 (gastos 172 de más: el 609 impreso −86 leído +86). Lommel SK 2018 (cargado) da
  −182 EUR de financiero que la carga vieja no tenía (cerraba por tolerancia). Decidir con Guido si se corrigen y cómo (escalón: correr el
  NBB también con ajustes si con ellos el resultado sigue exacto).
- Bélgica (lote 92) ya no espera a la t; espera a la u. Los documentos cuyas filas cambiaron (Beerschot 2020, OH Leuven 2019 y 2020, Patro
  Eisden 2016 y 2019, entre otros) vuelven a categorizar en el lote (etapa 7, ~US$ 0,03 por documento).

## Qué deja de ser cierto en ESTADO

- Bélgica no se frena por el esquema NBB (to-do 298 t hecho); sigue frenada por la compuerta de estadio y sponsor (298 u).

## Para fos-onboarding (cómo se carga)

- Un documento belga con el estado NBB con códigos se verifica por sus códigos: las filas que llegan a la categorización son las hojas del
  esquema (con el rótulo que extrajo la IA en esa línea, o el del .md). Una fila de nota sigue abriendo su renglón si suma.
- Un documento belga con ajustes `fila` se verifica como antes.

## Después del merge de la 298 t (2026-10-18)
