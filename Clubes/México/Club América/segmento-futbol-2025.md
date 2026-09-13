# Ollamani, S.A.B. de C.V. — Reporte Financiero BMV, Trimestre 4D, Año 2025

Transcripción de las páginas relevantes de `reporte-financiero-ollamani-2025-auditado.pdf` (113
páginas, texto nativo extraído con `pdftotext -layout`, sin necesidad de OCR) para la carga del
"Segmento de Fútbol" (Club América) en numeros-de-boca. NO es una transcripción completa del
documento (que en su mayoría es boilerplate consolidado de IFRS común a cualquier emisora
mexicana, irrelevante para este club puntual) — son las páginas con el dato de Fútbol, el tipo de
cambio y la deuda consolidada, tal cual pide la sesión de onboarding de Club América. Cifras
transcriptas EXACTAS tal cual impresas, sin redondear ni reclasificar.

Cabecera repetida en cada página del reporte original (formato estándar BMV): "Bolsa Mexicana de
Valores S.A.B. de C.V. — Clave de Cotización: AGUILAS — Trimestre: 4D Año: 2025 — AGUILAS
Consolidado — Cantidades monetarias expresadas en Unidades" (esto último, pese a decir "Unidades",
corresponde en la práctica a MILES DE PESOS — confirmado cruzando la cifra de la tabla, ver nota al
final de este documento).

---
--- pág. 6 de 113 ---

## Segmento de Fútbol (MD&A, comentario del cuarto trimestre 2025)

> Fútbol
>
> El segmento de Fútbol de la Compañía incluye la promoción de espectáculos deportivos y eventos
> especiales en México, es propietaria del Club de Fútbol América, así como del Estadio Banorte.
>
> Los ingresos del segmento de Fútbol ascendieron a $586.6 y $445.5 millones y representaron 40.3%
> y 33.3% de los ingresos consolidados auditados de la Compañía por el cuarto trimestre terminado
> el 31 de diciembre de 2025 y 2024, respectivamente. Los ingresos del segmento de Fútbol
> corresponden principalmente a ingresos por publicidad y patrocinios, así como ventas de taquilla
> y esquilmos.
>
> El resultado del segmento de Fútbol fue una utilidad por $46.8 y $253.9 millones y representaron
> el 8% y 57.0% de los ingresos consolidados auditados de la Compañía por el cuarto trimestre
> terminado el 31 de diciembre de 2025 y 2024, respectivamente.

(Estas cifras — $586.6 M / $46.8 M — son del CUARTO TRIMESTRE 2025 solo, expresadas directo en
millones en esta sección narrativa, NO del año completo. El año completo está en la Nota de
Segmentos, pág. 108-109, ver más abajo — son las cifras que se cargaron al sitio.)

---
--- pág. 6-7 de 113 ---

## Definición de "Utilidad de los segmentos operativos" (footnote de la tabla trimestral, MD&A)

> (2) Utilidad de los segmentos operativos se define como la utilidad de operación antes de
> depreciación y amortización y otros ingresos o gastos, neto.

Esta misma definición se repite en la Nota de Segmentos formal (pág. 108-109, ver más abajo) — es
la definición vigente para CUALQUIER cifra de "utilidad de segmento" de este reporte, trimestral o
anual.

---
--- pág. 7 de 113 ---

## Tipo de cambio (comentario de "Gastos financieros, neto", sección MD&A)

> La utilidad por fluctuación cambiaria, neto, resultó principalmente del efecto de la apreciación
> o depreciación del peso frente al dólar estadounidense sobre la posición monetaria promedio en
> dólares estadounidenses del Grupo. El tipo de cambio del peso frente al dólar estadounidense fue
> de $18.0012 y $20.7862 al 31 de diciembre de 2025 y 2024, respectivamente.

**OJO — discrepancia real con la Nota a los estados financieros auditados (pág. 104, ver más
abajo), que declara $17.9528 y $20.8691 para las mismas dos fechas.** Se usó la cifra de la Nota a
los estados financieros (pág. 104), no esta de la sección MD&A, ver justificación completa en el
comentario de cabecera de `data/clubamerica-data.js`.

---
--- pág. 10 de 113 ---

## Deuda y pasivos por arrendamiento CONSOLIDADOS (los 3 segmentos juntos, sin split por segmento)

| Concepto | 31/12/2025 | 31/12/2024 | Variación |
|---|---|---|---|
| Deuda a largo plazo | $1,672.0 M | $0.0 M | +$1,672.0 M |
| **Total Deuda** | **$1,672.0 M** | **$0.0 M** | **+$1,672.0 M** |
| Porción circulante de pasivo por arrendamiento | $90.3 M | $95.8 M | ($5.5) M |
| Pasivo por arrendamiento, neto de porción circulante | $969.2 M | $1,021.5 M | ($52.3) M |
| **Total Pasivo por arrendamiento** | **$1,059.5 M** | **$1,117.3 M** | **($57.8) M** |
| **Total deuda y pasivos por arrendamiento** | **$2,731.5 M** | **$1,117.3 M** | **+$1,614.2 M** |

Nota (1) del documento: "Al 31 de diciembre de 2025 el total de la deuda se presenta neto de los
costos de financiamiento."

**Esta tabla es CONSOLIDADA (Fútbol + Juegos + Editoriales), sin desglose por segmento** — por eso
no se puede usar para `grossDebt` del Segmento de Fútbol sin inventar un criterio de reparto que el
documento no da. Ver `grossDebt:0, cash:0` en `data/clubamerica-data.js`.

---
--- pág. 93-94 de 113 (Nota "Ingresos diferidos", NO usada — es consolidada, no por segmento) ---

Tabla de "Ingresos diferidos" por tipo de contrato (Patrocinios / Publicidad y suscripciones /
Otros), consolidada, sin split por segmento. Se revisó por si daba un desglose de ingreso de
Fútbol por tipo de concepto, pero es un pasivo de balance (anticipos de clientes), no ingreso
reconocido del año, y está a nivel de todo el Grupo, no de Fútbol — no aporta al desglose que se
buscaba.

---
--- pág. 104 de 113 (Nota a los estados financieros auditados, "Gastos financieros, neto") ---

## Tipo de cambio — cifra usada para la carga al sitio

> (3) La (pérdida) utilidad por fluctuación cambiaria, neto, resultó principalmente del efecto de
> la apreciación o depreciación del peso frente al dólar estadounidense sobre la posición
> monetaria promedio en dólares estadounidenses del Grupo. **El tipo de cambio del peso frente al
> dólar estadounidense fue de $17.9528 y $20.8691 al 31 de diciembre de 2025 y 2024,
> respectivamente.**

Esta es la cifra usada como `fx` en `clubamericaFiscalYearMeta[2025]` ($17.9528 MXN por USD), por
estar dentro de la Nota a los estados financieros auditados (misma sección formal que la Nota de
Segmentos usada para revenue/utilidad), no en la sección MD&A narrativa (pág. 7, que declara
$18.0012 para la misma fecha — ver discrepancia documentada arriba).

---
--- pág. 108 de 113 (Nota "Información por segmentos") ---

## Definición de los 3 segmentos reportables (IFRS 8)

> Los segmentos que se reportan se determinaron en función a los reportes internos del Grupo para
> su administración y operación.
>
> El Grupo está organizado con base en los servicios y productos que proporciona. Los segmentos
> del Grupo son unidades de negocios estratégicos que ofrecen distintos servicios y productos de
> entretenimiento. Los segmentos reportables del Grupo, son como sigue:
>
> **Fútbol**
> El segmento de Fútbol incluye las operaciones nacionales del Grupo en la promoción de eventos
> deportivos y espectáculos y el equipo de fútbol.
>
> **Juegos**
> El segmento de Juegos incluye 17 establecimientos en el país, con más de cinco mil ochocientas
> máquinas de juegos electrónicos y nuevas opciones en línea, bingos más modernos, así como la más
> amplia oferta de apuestas deportivas en México.
>
> **Editoriales y Distribuidoras**
> El segmento de Editoriales y Distribuidoras incluye la venta de publicación de revistas en
> español, suscripciones de revistas e ingresos por publicidad, así como la distribución y
> comercialización de publicaciones en México y otros productos denominados coleccionables.

## Ingresos Totales y Utilidad por segmento — Año terminado el 31 de diciembre de 2025

| Segmento | Ingresos Totales | (Pérdida) utilidad por segmento |
|---|---|---|
| Fútbol | $2,795,643 | $43,911 |
| Juegos | $3,103,172 | $632,286 |
| Editoriales y Distribuidoras | $416,038 | ($115,963) |
| **Suman los segmentos** | **$6,314,853** | **$560,234** |
| Depreciación y amortización | – | ($820,345) |
| Ingresos y pérdida de operación consolidada antes de otros gastos | $6,314,853 | ($260,111) |
| Otros gastos, neto | – | ($28,114) |
| **Ingresos consolidados y pérdida de operación** | **$6,314,853** | **($288,225)** |

## Ingresos Totales y utilidad por segmento — Periodo inicial de once meses terminado el 31 de diciembre de 2024

| Segmento | Ingresos Totales | Utilidad por segmento |
|---|---|---|
| Fútbol | $2,726,568 | $584,078 |
| Juegos | $2,756,441 | $674,591 |
| Editoriales y Distribuidoras | $545,448 | $44,585 |
| **Suman los segmentos** | **$6,028,457** | **$1,303,254** |
| Depreciación y amortización | — | ($769,909) |
| Ingresos y utilidad de operación consolidada antes de otros gastos | $6,028,457 | $533,345 |
| Otros gastos, neto | — | ($4,962) |
| **Ingresos consolidados y utilidad de operación** | **$6,028,457** | **$528,383** |

Todas las cifras en MILES de pesos mexicanos (confirmado cruzando contra la propia nota de
sourcing: "$2,726.6 millones MXN" para el segmento Fútbol 2024 = $2,726,568 miles de esta tabla ÷
1000, exacto).

Footnote (2) de esta tabla (misma definición que la del MD&A trimestral, pág. 6): "Utilidad de los
segmentos operativos se define como la utilidad de operación antes de depreciación y amortización
y otros ingresos o gastos, neto." — **NO incluye D&A, "otros ingresos/gastos", resultado
financiero ni impuestos.** Ver comentario de cabecera de `data/clubamerica-data.js`, sección
"UTILIDAD DEL SEGMENTO NO ES RESULTADO NETO".

---
--- pág. 108-109 de 113 ---

## Activos por segmento (se concilian con el total de activos)

| Segmento | 2025 | 2024 |
|---|---|---|
| Fútbol | $9,863,633 | $7,527,464 |
| Juegos | $3,578,947 | $2,798,453 |
| Editoriales y distribuidoras | $770,809 | $1,475,174 |
| **Total de activos** | **$14,213,389** | **$11,801,091** |

## Pasivos por segmento (se concilian con el total de pasivos)

| Segmento | 2025 | 2024 |
|---|---|---|
| Fútbol | $3,013,763 | $592,681 |
| Juegos | $1,966,198 | $1,785,463 |
| Editoriales y distribuidoras | $325,361 | $337,921 |
| **Total de pasivos** | **$5,305,322** | **$2,716,065** |

**Estos son TOTALES de activos/pasivos por segmento (incluyen cuentas por cobrar/pagar,
arrendamientos, provisiones, todo), NO una cifra de "deuda financiera" separada de "caja" —
Ollamani no desglosa esas dos partidas específicas por segmento en ningún lado del reporte.** No
se usaron para `grossDebt`/`cash` de Club América por ese motivo (ver `grossDebt:0, cash:0,
documentado` en `data/clubamerica-data.js`).

---
--- pág. 109 de 113 ---

## Desagregación de ingresos totales por línea de servicio/producto y mercado geográfico

### Año terminado el 31 de diciembre de 2025

| Línea de servicio | Ingresos nacionales | Ingresos por exportación | Ingresos totales |
|---|---|---|---|
| Eventos de fútbol y promoción de espectáculos | $2,726,632 | $69,011 | $2,795,643 |
| Juegos | $3,103,172 | – | $3,103,172 |
| Editoriales-circulación de revistas | $70,909 | – | $70,909 |
| Editoriales-publicidad | $155,055 | – | $155,055 |
| Distribuidoras | $190,074 | – | $190,074 |
| **Total de ingresos consolidados** | **$6,245,842** | **$69,011** | **$6,314,853** |

### Periodo inicial de once meses terminado el 31 de diciembre de 2024

| Línea de servicio | Ingresos nacionales | Ingresos por exportación | Ingresos totales |
|---|---|---|---|
| Eventos de fútbol y promoción de espectáculos | $2,577,540 | $149,028 | $2,726,568 |
| Juegos | $2,756,441 | – | $2,756,441 |
| Editoriales-circulación de revistas | $62,094 | – | $62,094 |
| Editoriales-publicidad | $123,265 | – | $123,265 |
| Distribuidoras | $360,089 | – | $360,089 |
| **Total de ingresos consolidados** | **$5,879,429** | **$149,028** | **$6,028,457** |

**"Eventos de fútbol y promoción de espectáculos" ($2,795,643 miles, 2025) coincide EXACTO con la
fila "Fútbol" de la tabla de Ingresos Totales por segmento de la página anterior** — confirma que
no hay error de transcripción y que este es el ÚNICO desglose de ingreso disponible para el
segmento Fútbol (geografía nacional/exportación, no por tipo de ingreso TV/entradas/sponsors).

---

## Resumen de cifras cargadas al sitio (numeros-de-boca), Ejercicio 2025

- `revenueLines`: 1 línea, "Ingresos del Segmento de Fútbol" = $2,795,643 miles = **$2,795.643 M
  MXN** (categoría `lump_football_operations`).
- `expenseLines`: 1 línea DERIVADA, "Costos y gastos del Segmento de Fútbol (implícito)" =
  $2,795,643 − $43,911 = $2,751,732 miles = **−$2,751.732 M MXN** (categoría
  `lump_football_operations_expense`).
- `officialTotalRevenue`: 2795.643 (impreso, verificado 2 veces).
- `officialTotalExpenses`: 2751.732 (identidad aritmética, no impreso con ese nombre).
- `officialPAT`: `null` — la "Utilidad de los segmentos operativos" ($43.911 M) NO es un PAT
  comparable (ver footnote 2 de la tabla, arriba).
- `fx`: 17.9528 (MXN por USD al 31/12/2025, Nota a los EEFF auditados, pág. 104).
- `grossDebt`/`cash`: 0/0, documentado como "no disponible a nivel de segmento", no deuda cero real.
