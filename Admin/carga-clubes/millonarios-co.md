# millonarios-co — evidencia de carga

Lo que había como comentario en `data/millonarios-co-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/millonarios-co-data.js — Azul & Blanco Millonarios FC S.A. (Bogotá,
Colombia). Tercer club colombiano cargado en finance-of-sports (junto con
Envigado/Once Caldas). Un único ejercicio cargado a propósito: 2025.

FUENTE: `Clubes/Colombia/Millonarios/estados-financieros-2025.md` (documento
principal, 46 páginas del PDF, "Estados Financieros" con Notas 1-32, vía SIIS
siis.ia.supersociedades.gov.co, NIT 900430878, comparativo 2025/2024). PDF
ESCANEADO sin capa de texto, transcripto vía OCR (Tesseract `-l spa --psm 6`).
`certificacion-ef-2025.md` y `dictamen-revisor-fiscal-2025.md` en la misma
carpeta son de contexto/cruce (carátula y dictamen del revisor fiscal, sin
salvedades) — no aportan línea de detalle propia.

A DIFERENCIA de Envigado, este documento NO trae un Estado de Resultado
Integral PRIMARIO consolidado en una sola tabla: solo las notas explicativas
(Nota 22 "Ingresos de Actividades Ordinarias", Nota 23 "Costo Deportivo y de
Ventas", Nota 24 "Gastos de Administración", Nota 25 "Otros Ingresos", Nota 26
"Otros Gastos", Nota 27 "Otros Ingresos (Gastos) Financieros", Nota 28
"Depreciaciones y Amortizaciones"). El único resultado final impreso es
"Resultado del ejercicio" dentro de la Nota 20 (Patrimonio, pág. 44 del .md):
$(4.690.112) para 2025 — mismo criterio que Once Caldas (notas, sin primario),
pero acá la reconciliación cerró EXACTA igual (ver abajo).

ESCALA: el documento declara explícitamente "US$ miles de pesos" (pág. 21 del
.md) — está en MILES de pesos colombianos, NO en pesos completos (a diferencia
de Envigado). Para guardar en MILLONES de COP (criterio del sitio), cada cifra
impresa se divide por 1.000 (no por 1.000.000).

FX: el documento SÍ declara su propio tipo de cambio de cierre (pág. 3 del
.md, "Las tasas tomadas para estos estados financieros son"): TRM USD al
31/12/2025 = $3.757,50 — LIGERAMENTE distinto de la TRM oficial genérica ya
cargada en FX_CLOSE (COP@2025-12-31 = 3757,08). Por la Regla 0 de
club-data-mapping/referencia/fx.md (el tipo de cambio que el propio
documento declara gana siempre sobre una cotización externa), se usa el
literal 3757,50 con fxSource:'document_close', NO fxRef.

REVENUE: Nota 22 (9 líneas, suma EXACTA $103.403.007 miles = $103.403,007 M,
el total impreso) + Nota 25 "Otros Ingresos" (3 líneas, $5.589,176 M) — mismo
criterio que Envigado, se suman ambas al campo `revenue`. officialTotalRevenue
= 103.403,007 + 5.589,176 = 108.992,183 M.

EXPENSES: Nota 23 "Costo Deportivo y de Ventas" ($91.524,998 M impreso — nota
que MEZCLA costos de fútbol profesional CON costo de ventas de tiendas/
academias, ver caveat de "Gasto de personal" abajo) + Nota 24 "Gastos de
Administración" ($8.483,046 M) + Nota 26 "Otros Gastos" ($1.768,076 M) + Nota
28 "Depreciaciones y Amortizaciones" ($12.108,211 M). officialTotalExpenses =
91.524,998 + 8.483,046 + 1.768,076 + 12.108,211 = 113.884,331 M.

CAVEAT IMPORTANTE — "Gasto de personal" de la Nota 23 ($45.741,164 M, el 40%
de todo el gasto del club): la Nota 23 se llama "COSTO DEPORTIVO Y DE VENTAS",
o sea agrupa en una sola cifra de personal TANTO al plantel profesional COMO
al personal de las 5 tiendas y 7 sedes de academias (que tienen su propio
costo de mercancías separado en la misma nota, pero NO un costo de personal
separado). El documento no permite separar cuánto de esos $45.741,164 M es
sueldo de jugadores/cuerpo técnico vs. personal de tiendas/academias. Se
cargó TODO a `wages_squad` (criterio: "Costo Deportivo" es el concepto
principal de la nota, y el plantel profesional es estructuralmente el rubro
de personal más grande de cualquier club ya cargado) — es una aproximación
que probablemente sobrestima levemente el salario del plantel real. Anotado
en Admin/dudas-por-club.md para eventual aclaración con el club.

netInterest = Nota 27: Ingresos financieros ($4.806,939 M: intereses +
diferencia en cambio) − Gastos financieros ($4.595,249 M: diferencia en
cambio + intereses pasivos por derechos de uso + gastos bancarios +
intereses) = +211,690 M.

tax = Nota 21.5 "Total impuesto sobre la renta reconocido en el período" =
$(9,654) M (impuesto corriente $0 por pérdida fiscal + efecto de impuesto
diferido $(42,999) + ganancia ocasional $52,653 = -9,654 neto, impreso).

VERIFICACIÓN (node, antes de cargar): revenue (108.992,183) − expenses
(113.884,331) + netInterest (211,690) = −4.680,458 M, EXACTO igual a
"Beneficio (pérdida) antes de impuestos" impreso (Nota 21.5, pág. 37-38 del
.md). Sumándole tax (−9,654): −4.690,112 M, EXACTO igual a "Resultado del
ejercicio" impreso en la Nota 20 (Patrimonio). Reconciliación exacta, sin
ningún residuo/plug — incluso sin Estado de Resultado Integral primario.

grossDebt = Nota 14 "Obligaciones Financieras" ($28,340 M: saldos de tarjetas
de crédito corporativas Bancolombia/Av Villas, la única línea de deuda
FINANCIERA que separa el documento de las cuentas por pagar comerciales/
impositivas de la Nota 15). cash = Nota 6 "Efectivo y Equivalentes de
Efectivo" ($6.465,046 M).
============================================================================
```

_de data/club-leagues/co.js:_

```text
Verificado el 2026-09-25 (onboarding, Versión 221) — se enfrentaron entre sí en la Primera A
2025 (Apertura y Clausura), confirma que los 2 jugaron esa categoría ese año.
```

## 2025

### Ingresos

_antes de la fila 10 (`Aprovechamientos`):_

```text
Nota 25 "Otros Ingresos" (no forman parte de "Ingresos de Actividades Ordinarias", Nota 22,
pero se suman al revenue del sitio, mismo criterio que Envigado):
```

### Gastos

_antes de la fila 1 (`Gasto de personal (plantel profesional + tiendas + academias, sin desglose disponible)`):_

```text
Nota 23 "Costo Deportivo y de Ventas" ($91.524,998 M impreso), agrupada por categoría real
(ver caveat de "Gasto de personal" en el comentario de cabecera):
```

_antes de la fila 6 (`Gastos de Administración`):_

```text
Nota 24 "Gastos de Administración" ($8.483,046 M impreso):
```

_antes de la fila 7 (`Gravamen a los movimientos financieros (GMF)`):_

```text
Nota 26 "Otros Gastos" ($1.768,076 M impreso):
```

_antes de la fila 11 (`Amortización de intangibles (derechos deportivos propios)`):_

```text
Nota 28 "Depreciaciones y Amortizaciones" ($12.108,211 M impreso):
```

### Meta

```text
El documento declara su propio TRM de cierre (pág. 3 del .md): $3.757,50 al 31/12/2025 —
literal, no fxRef (ver comentario de cabecera, Regla 0 de club-data-mapping/referencia/fx.md).
officialTotalExpenses EXCLUYE "Gastos extraordinarios (provisiones por contingencias
laborales, exjugador Jorge Perlaza)" (-256,298, exceptional_items) — mismo criterio que
Botafogo/Atlético Mineiro: verifyTieOuts()/tools/audit.js comparan "Expenses" contra gasto
ordinario + no-efectivo solamente, exceptional_items no participa de ese check (sí de
officialPAT). 113884,331 (impreso, incluye el extraordinario) - 256,298 = 113628,033.
```

## Gestiones

_antes de Enrique Camacho Matamoros (data/gestiones/co.js):_

```text
Camacho: presidente desde 2014, tras la renuncia de Juan Carlos Saldarriaga (Noticias Caracol; solo el año: dia 01). Sigue en 2026. El accionista mayoritario es un fondo (Amber Capital, vía Blas de Lezo Inversiones, 86,61%): no es una persona, no se carga como dueño.
```

## Fuentes

### millonarios-co-estados-financieros-2025

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900430878). PDF escaneado sin capa de texto, transcripto vía OCR (Tesseract). Cifras del documento expresadas en MILES de pesos colombianos (no pesos completos, a diferencia de Envigado) — reconvertido a millones para el sitio. Sin Estado de Resultado Integral primario consolidado, solo notas (22 a 28) — la reconciliación contra "Resultado del ejercicio" (Nota 20, Patrimonio) cerró exacta de todas formas. TRM de cierre declarada por el propio documento: $3.757,50 (31/12/2025). Transcripción completa en Clubes/Colombia/Millonarios/estados-financieros-2025.md.
```

## Otros

### gestionesByClub['millonarios-co']

```text
No se confirmó con certeza una "gestión"/presidencia en el sentido usado para clubes
argentinos (Millonarios es una S.A., el firmante de los EEFF es el Representante Legal, Jorge
Enrique Camacho Matamoros, no necesariamente equivalente a una presidencia electa) — entrada
genérica sin confirmar, mismo criterio que Envigado/Once Caldas.
```
