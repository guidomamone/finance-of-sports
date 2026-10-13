# union — evidencia de carga

Lo que había como comentario en `data/ar/union-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/union-data.js — Club Atlético Unión (Santa Fe): 11vo club del motor genérico. 4 ejercicios
cargados: 2022, 2023 (agregado a nivel de 4 categorías, ver más abajo), 2024, 2025. PDF +
transcripción en Clubes/Argentina/Union/{memoria-y-balance-116,memoria-y-balance-117,
estados-contables-118-2023-2024,memoria-y-balance-119}.{pdf,md}.

2025 (Ejercicio N°119, 1°/7/2024 al 30/6/2025): balance auditado real. Este PDF es MIXTO:
páginas 1-35 (Memoria narrativa) tienen texto nativo, pero páginas 36-54 (los Estados Contables
reales — Situación Patrimonial, Recursos y Gastos, Anexos) son un escaneo sin capa de texto,
transcripto vía OCR (Tesseract, español, 300-600dpi). Varias páginas de Anexo (Bienes de Uso,
Activos Intangibles, Situación Patrimonial) estaban rotadas 90° dentro del escaneo — se corrigió
con PIL antes de re-OCRear, mismo criterio que club-data-mapping/referencia/leer-pdf.md. El Anexo V
(moneda extranjera) no se pudo leer de forma confiable ni rotado ni a 600dpi (tabla multi-columna
resistente al OCR) — se usó el dólar oficial vendedor BNA de cierre en su lugar (investigado
externamente, ver fx abajo).

Categorización del Anexo IV de 2025 ("Informe sobre el rubro Gastos y su aplicación"): a
diferencia de Vélez/Instituto/Rosario Central/Estudiantes LP, este Anexo NO tiene una columna por
sector limpiamente separable en el texto OCR de ESTE documento puntual (las columnas de
departamento se mezclaron en la extracción). Se cargaron con CONFIANZA solo 3 desgloses que se
pudieron verificar por checksum exacto contra el total de su categoría en el Estado de Recursos y
Gastos: "Sueldos y Jornales de Futbol" (6.510,993333 M, dentro de "Gastos de fútbol") →
wages_squad, y las 2 filas de "Amortizaciones" (Anexo I: 398,387133 M + Anexo II: 2.476,887829 M
= 2.875,274962 M, cierra EXACTO contra "Amortizaciones de bienes de uso y activo intangibles" del
estado principal) → depreciation / player_amortisation respectivamente. El RESTO de cada una de
las 6 categorías del estado principal (Administración, Partidos y estadio, resto de Fútbol,
Subcomisiones, Otros gastos) se cargó como una sola línea por categoría (usando el total ya
verificado del propio Estado de Recursos y Gastos), en vez de forzar una asignación fila-por-fila
que el OCR no permite confirmar con certeza — más fiel que adivinar a qué departamento pertenece
cada fila ambigua.

2022 (Ejercicio N°116, "Rectificativo" — versión corregida presentada, firmada 4/3/2024) y 2023
(Ejercicio N°117): a diferencia del documento de 2025, el Anexo IV ("Informe Sobre el Rubro
Gastos y su Aplicación") de estos 2 balances SÍ tiene columnas por departamento razonablemente
separables en el texto OCR (aunque el header de columnas quedó parcialmente cortado en la
extracción) — se verificó fila por fila que la SUMA de todos los rubros del Anexo cierra EXACTO
contra el "Total de Gastos Ordinarios" del Estado de Recursos y Gastos principal antes de cargar
(2022: 23 rubros suman $2.067.493.328,46 vs. impreso $2.067.493.328,45, diferencia de 1 centavo
por redondeo). Categorización por NATURALEZA del rubro (mismo criterio que Argentinos Juniors
esta sesión), no por columna de departamento cuando el reparto exacto entre 2 departamentos no
se pudo confirmar con certeza (ej. "Sueldos y Jornales de Maestranza", que el Anexo reparte entre
2 columnas, se cargó entero en admin_general_expense en vez de forzar el split).
Ambos documentos declaran "expresado a moneda de cierre" — es la aplicación normal de la
normativa de ajuste por inflación vigente en Argentina desde 2019 (no es el mismo problema
encontrado en Argentinos Juniors esta sesión: ahí una presentación RESTATED HACIA ATRÁS convivía
con balances individuales NO restated de los mismos años, dando cifras incompatibles entre sí.
Acá cada balance de Unión declara su PROPIO ejercicio "a moneda de cierre" de ESE mismo ejercicio
— es simplemente la cifra nominal de cierre del año, consistente con el resto del sitio) — pero
por las dudas, se usó SIEMPRE la columna "del ejercicio actual" de cada balance (nunca la columna
comparativa de un balance posterior, que si se restated hacia una fecha de cierre distinta no
sería comparable).
NINGUNO de los 2 archivos (116, 117) incluye una página de Estado de Situación Patrimonial
completa en el escaneo disponible (se buscó explícitamente "TOTAL DEL ACTIVO"/"TOTAL ACTIVO" en
todo el texto OCR de ambos archivos, sin encontrarlo) — grossDebt/cash quedaron SIN CARGAR para
2022 y 2023 (no inventados), a diferencia de 2024/2025 que sí lo tienen.

2024 (Ejercicio N°118, Estados Contables 2023-2024): ver comentario en su propio bloque de
fiscalYearMeta más abajo — este documento SOLO da el Estado de Recursos y Gastos a nivel de las 4
categorías agregadas (no tiene Anexo IV de detalle por rubro en el archivo descargado), se cargó
con ese nivel de agregación honesta.

grossDebt = "Deudas" corriente+no corriente, EXCLUYENDO "Previsiones" — mismo criterio que el
resto de los clubes (cuando el balance lo permite calcular). cash = Caja y bancos.

Gestión: Luis Jorge Spahn, presidente desde el 24/7/2009 (varias reelecciones, la más reciente en
mayo de 2025, mandato hasta 2028) — cubre los 4 ejercicios cargados con confianza total.
============================================================================
```

## 2025

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2023): Educación
El propio balance no se pudo leer con confianza para su Anexo de moneda extranjera (ver
comentario de cabecera) — dólar oficial vendedor BNA de cierre 30/6/2025, investigado
externamente.
grossDebt = Deudas corriente (8.619,653532) + no corriente (137,744168), sin Previsiones
(704,285792, contingencia). cash = Caja y bancos.
officialTotalRevenue/Expenses = "Total de Recursos"/"Total de Gastos Ordinarios" impresos.
DÉFICIT FINAL real: $(4.022.045.732) ARS.
```

## 2024

### Gastos

_antes de la fila 1 (`Gastos generales de administración y funcionamiento`):_

```text
Este archivo (Estados Contables 2023-2024) NO incluye el Anexo IV de detalle por rubro (a
diferencia de 116/117) — se cargó a nivel de las 6 categorías agregadas del Estado de
Recursos y Gastos principal, agregación honesta. Única excepción: "Amortizaciones de bienes
de uso y activo intangibles" SÍ se pudo partir en 2, cruzando contra el Anexo II (Activos
Intangibles) que declara "Amortización del Ejercicio" = $1.245.739.483 exacto — el resto
($259.700.253) es la depreciación de bienes de uso.
```

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2023): Salarios y primas (plantel y cuerpo técnico), Educación
No se encontró página de Estado de Situación Patrimonial en el escaneo disponible de este
archivo — grossDebt/cash quedan sin cargar, no inventados.
SUPERÁVIT FINAL real: $1.166.322.977 ARS.
```

## 2023

### Meta

```text
No se encontró página de Estado de Situación Patrimonial en el escaneo disponible de este
archivo (ver comentario de cabecera) — grossDebt/cash quedan sin cargar, no inventados.
SUPERÁVIT FINAL real: $893.901.287 ARS.
```

## 2022

### Meta

```text
No se encontró página de Estado de Situación Patrimonial en el escaneo disponible de este
archivo (ver comentario de cabecera) — grossDebt/cash quedan sin cargar, no inventados.
SUPERÁVIT FINAL real: $190.408.914 ARS.
```

## Fuentes

### union-memoria-y-balance-116

_note (data/):_

```text
PDF oficial (52 páginas, escaneado sin capa de texto, transcripto vía OCR). Versión "Rectificativa" (corregida), firmada 4/3/2024. SUPERÁVIT FINAL real: $190.408.914 ARS. El Anexo IV (Gastos) SÍ tiene columnas por departamento razonablemente separables — verificado que sus 23 rubros suman exacto contra el Total de Gastos Ordinarios antes de cargar. No se encontró página de Estado de Situación Patrimonial en este escaneo — grossDebt/cash sin cargar. Convertido a USD con $124 (Anexo V, lado Activo/Créditos). Ver data/ar/union-data.js.
```

### union-memoria-y-balance-117

_note (data/):_

```text
PDF oficial (63 páginas, escaneado sin capa de texto, transcripto vía OCR). Versión "Rectificativa" (corregida), firmada 4/3/2024. SUPERÁVIT FINAL real: $893.901.287 ARS. Anexo IV verificado (24 rubros suman exacto contra el Total de Gastos Ordinarios). No se encontró página de Estado de Situación Patrimonial — grossDebt/cash sin cargar. Convertido a USD con $255 (Anexo V, lado Activo/Créditos). Ver data/ar/union-data.js.
```

### union-estados-contables-118-2023-24

_note (data/):_

```text
PDF oficial (53 páginas, escaneado sin capa de texto, transcripto vía OCR), firmado 31/10/2024. SUPERÁVIT FINAL real: $1.166.322.977 ARS. A diferencia de 116/117, este archivo NO incluye el Anexo IV de detalle de Gastos por rubro — se cargó a nivel de las 6 categorías agregadas del Estado de Recursos y Gastos, con la excepción de "Amortizaciones" que se pudo partir en 2 cruzando contra el Anexo II (Activos Intangibles). No se encontró página de Estado de Situación Patrimonial — grossDebt/cash sin cargar. Convertido a USD con $890,50 (Anexo V, lado Activo/Créditos). Ver data/ar/union-data.js.
```

### union-memoria-y-balance-119

_note (data/):_

```text
PDF oficial (54 páginas) MIXTO: páginas 1-35 (Memoria) texto nativo, páginas 36-54 (Estados Contables reales) escaneadas sin capa de texto, transcriptas vía OCR (Tesseract, algunas páginas rotadas 90°). El Anexo V (moneda extranjera) no se pudo leer con confianza — se usó el dólar oficial vendedor BNA de cierre 30/6/2025 ($1.217,87), investigado externamente. Firmado por Luis Jorge Spahn como Presidente. DÉFICIT FINAL real: $(4.022.045.732) ARS. El Anexo IV (Gastos) no separaba limpiamente sus columnas de departamento en el OCR — se cargaron con confianza solo "Sueldos y Jornales de Fútbol" (wages_squad) y las 2 líneas de Amortizaciones (verificadas por checksum exacto), el resto de cada categoría se cargó a nivel agregado (ver comentario completo en data/ar/union-data.js).
```

## Otros

### Meta (unionFiscalYearMeta), en general

```text
LOS 4 TIPOS DE CAMBIO DE UNIÓN SON `document_close`, NO `market_close` (corregido en la
Versión 140). Estaban etiquetados como cotización de mercado y no lo son: los 4 salen del
ANEXO V del propio balance de Unión, lado Activo/Créditos, como dice la `note` de cada
fuente en data/clubs.js. La etiqueta equivocada disparaba 2 hallazgos de la auditoría, y el
más ruidoso era real pero mal diagnosticado: "Unión 2024 usa 890,50 pero la tabla de mercado
dice 909 para esa fecha".

LOS DOS NÚMEROS ESTÁN BIEN, Y ESTA ES LA PARTE QUE HAY QUE ENTENDER ANTES DE "CORREGIR"
ALGUNO (lo planteó Guido: "puede ser porque tuvieron acceso a distinto FX, o porque al
momento de cancelar o recibir tal plata, el fx era distinto"): un Anexo de moneda extranjera
valúa los ACTIVOS (créditos, lo que le deben al club) al tipo COMPRADOR y los PASIVOS
(deudas) al VENDEDOR. Son los dos lados del spread del mismo día. 890,50 es el comprador
del 30/6/2024 y ~909 el mayorista/vendedor: no se contradicen, describen cosas distintas.
Por eso la regla del proyecto dice que el `fx` que declara un documento va LITERAL en el
archivo de ese club y nunca se mueve a FX_CLOSE ni se reemplaza por el de otro club.
```

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.union

```text
Confirmado por búsqueda (Versión 95): Luis Jorge Spahn presidente desde 24/7/2009, varias
reelecciones, la más reciente en mayo de 2025 (mandato hasta 2028).
```

### memberCountByClub.union

```text
no se encontró una cifra confiable en esta sesión
```
