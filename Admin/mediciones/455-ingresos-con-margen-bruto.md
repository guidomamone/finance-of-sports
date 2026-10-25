<!-- md: inventario de los ejercicios cuyo documento imprime un margen bruto en vez de los ingresos, qué se puede recuperar sin estimar y las otras casuísticas del mismo tipo | leer: al tocar el estimado de Ligas, la detección de margen bruto en el pipeline o las notas «sin desglose» -->
# Ingresos con margen bruto (punto 455)

Medido sobre los JSON de `data/` (1340 ejercicios). Un ejercicio es «de margen» si su ingreso cargado es el margen bruto que el club imprime (`sinDesglose.kind = gross_margin`) y no sus ingresos.

## Cuántos y dónde

- 53 ejercicios (4 %) en 14 clubes; solo Bélgica (8 clubes) y Dinamarca (5). Por rótulo, en 7 idiomas, no hay otro país cargado con un margen en lugar de ingresos. Es consecuencia de qué clubes están cargados, no de que el fenómeno sea belga o danés: la misma exención existe en Alemania (Rohergebnis, §276 HGB), Países Bajos (bruto-marge de la empresa mediana), Dinamarca (§32) y Bélgica (esquema abreviado).
- Peso en la liga (ingreso cargado de la liga-año): Bélgica 2019-2024, 3 a 6 clubes de 7 a 9 por año, 15 a 46 % del ingreso cargado; Bélgica 2025, 4 de 22 (2 %); Dinamarca 2022 y 2023, todos los cargados; 2024 y 2025, 31 %.
- Clubes con más años de margen: RAAL (7 de 8), Lommel (6 de 8), Fredericia (6 de 7), RWDM (5 de 6), Lierse SK (4 de 7).

## Qué es el margen belga y cuándo se puede recuperar el ingreso

El margen bruto belga (código 9900) es `ingresos de explotación (70/76A) - compras (60) - servicios y bienes diversos (61)`. Verificado al euro en Lommel 2022/23: 5.806.012 - 322.653 - 4.229.458 = 1.253.901. Dos caminos exactos, sin estimar:

1. El documento imprime 60/61 aunque sea esquema abreviado: ingreso = margen + 60/61. Ya está aplicado donde se cargó así (Patro Eisden 2016-2019 y 2022-2023, Lokeren 2021-2023). Queda por revisar Patro Eisden 2020 (el documento corregido trae 60/61 = 423.072 y el sitio muestra el margen 277.991).
2. El documento del año siguiente trae el ingreso completo en su columna anterior: Lommel 2022/23 = 5,81 M EUR; RWDM 2023/24 = 12,50 M EUR (el sitio muestra el margen, 3,96 M). Lokeren 2024 trae solo «Omzet» 1,84 M comparativo (las ventas, no el total). Esos datos no se escriben sobre el año publicado (voto del 413); solo sirven de dato real para el estimado de Ligas.

El resto (unos 45 ejercicios) no tiene ancla: el documento no imprime ni los ingresos ni 60/61.

## El margen no sirve de proxy

Razón ingreso / margen en los pares exactos: Lommel 4,6; RWDM 3,2; Lokeren 2,1 y 2,2; Patro Eisden 2,5 a 3,8; Dender 3,8 a 4,0 y hasta 17,7 en un año; con margen negativo (Patro 2018, Dender 2021) no hay razón. Multiplicar el margen por una razón no es un estimado defendible; en Dinamarca (§32: nettoomsætning + otros ingresos - materias primas - otros costos externos) no se verificó qué descuenta ni hay pares.

## Otras casuísticas revisadas

- Fredrikstad 2016-2018 («Annen driftsinntekt»): el documento imprime esa sola línea y «Sum inntekter» es igual; es el ingreso total, no «otros». Corresponde tipo de ventas totales, no `other`.
- «Receita Operacional Bruta» (Remo 2023 y 2024, Criciúma 2022): en el DRE de Remo 2023 bruta y líquida son iguales (sin deducciones). No es un problema.
- Remo 2025, Palmeiras, Cruzeiro y otros con «(receita bruta)» dentro de varias líneas: deducciones aparte, ya cargadas como líneas negativas.
- Líneas sin desglose como parte del ingreso (más de 200 ejercicios, Bélgica, Grecia, Rusia, Portugal, RB Leipzig, Arsenal, Girona): la nota ya no afirma comparabilidad (Versión 1088).
- América 2025: ingresos del segmento de fútbol; no se midió si el club tiene otro segmento.
