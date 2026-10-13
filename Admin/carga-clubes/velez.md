# velez — evidencia de carga

Lo que había como comentario en `data/velez-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/velez-data.js — Club Atlético Vélez Sarsfield: primer club nuevo que se agrega desde que
existe el motor genérico (antes solo River/Racing lo usaban — esto obligó a sumar una 3ra rama a
varios ternarios de js/finanzas-calc.js/js/finanzas-render.js que estaban hardcodeados a
river/racing, ver Versión 82 en el historial de index.html).

TODOS los ejercicios con archivo oficial disponible están cargados (Versiones 82-93): 2025
(N°115), 2024 (N°114), 2023 (N°113, OCR), 2022 (N°112), 2021 (N°111), 2020 (N°110), 2019 (N°109),
2018 (N°108), 2017 (N°107, OCR), 2016 (N°106, OCR) y 2015 (N°105, OCR) — rango COMPLETO y sin
huecos, 11 ejercicios consecutivos 2014/2015 a 2024/2025. Copias locales de los PDF y sus
transcripciones en
Clubes/Argentina/Velez Sarsfield/balance-general-{2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015}.{pdf,md}.
El club no tiene (hasta donde se relevó) ejercicios previos a 2015 cargados en su archivo
institucional (velez.com.ar/elclubesdelossocios/memorias-estados-contables, ver
Admin/sourcing/README.md) — si aparece uno nuevo ahí en el futuro, o se publica el Ejercicio 2026,
ese sería el próximo candidato natural.

SOBRE EL OCR DE 2023/2017/2016/2015 (Versiones 90-93): esos 4 PDF no tienen capa de texto
(pdftotext devuelve vacío o casi vacío). Se instaló Tesseract vía Homebrew (`brew install
tesseract tesseract-lang`, incluye español) y se generó cada transcripción con
`pdftoppm -png -r 300` (450-900dpi para 2015/2016, páginas físicamente más chicas) +
`tesseract <pagina> -l spa --psm 6` página por página. Mucho más barato en tokens que renderizar
cada página como imagen con el Read tool (la alternativa que documentaba el gotcha viejo de
CLAUDE.md). OJO: varias páginas con tablas anchas (Anexo II/III, 6+ columnas) vienen ROTADAS 90°
en el PDF original — el OCR sale ilegible si no se rotan primero (`Image.rotate(-90,
expand=True)` con PIL antes de correr tesseract en esas páginas puntuales); si eso tampoco
alcanza (página muy chica), re-renderizar esa página puntual a mayor DPI (900+) antes de rotar y
re-OCRear. Los NÚMEROS finales se verificaron fila por fila: para cada línea de gasto se usa el
valor de la columna TOTAL <año> impreso (no se reconstruye sumando las 6 columnas de sector, que
es donde el OCR tiene más ruido), y la suma de todas esas columnas TOTAL tiene que cerrar exacto
contra el total impreso del Anexo (y contra GASTOS ORDINARIOS del Estado de Recursos y Gastos) —
no alcanza con "el OCR dio un número". 2016 cerró exacto sin ruido; 2015 y 2017 cerraron con una
diferencia de $40-50 mil sobre totales de cientos de millones (0,00001-0,00002%), irrelevante y
muy por debajo de la tolerancia de verifyTieOuts(). Si se encuentran más ejercicios escaneados
más adelante, reusar este mismo flujo.

BUG REAL encontrado y corregido en esta sesión (Versión 93): al cargar 2015, `verifyTieOuts()`
marcó una diferencia de ~$35M en "Expenses" que NO era ruido de OCR — era un bug en la fórmula
del check mismo (`Math.abs(expenses) + Math.abs(nonCash)` en vez de
`Math.abs(expenses + nonCash)`), que da un resultado distinto cuando `nonCash` neto es POSITIVO
(pasa cuando el crédito de "reclasificación" de un ejercicio es más grande que su amortización
real de plantel — le pasó a 2015 y 2017, nunca antes a ningún ejercicio de ningún club). Se
corrigió la fórmula en TODOS los checks de `verifyTieOuts()` (no solo los de Vélez) — es
matemáticamente equivalente para todo ejercicio donde nonCash ya era negativo (que es todos los
demás), así que no rompió ningún check que ya cerraba.

Convención de categorización (ver .claude/skills/club-data-mapping/SKILL.md antes de tocar esto):
el Anexo III (Gastos específicos de sectores) de Vélez desglosa CADA rubro en 6 columnas por
sector (Fútbol Profesional / Amateur / Complejo Polideportivo / Actividades de Enseñanza / Otras
Actividades Culturales / Otros Deportes y Sectores) — a diferencia de Racing, que ya viene con una
sola cifra por rubro. Para que "Salarios y primas (plantel y cuerpo técnico)" sea comparable
entre clubes (solo el plantel profesional, no TODO el personal del club incluida la escuela),
"Remuneraciones al personal" y "Cargas sociales" se separaron en 2 líneas cada una: la porción de
la columna FÚTBOL PROFESIONAL (-> wages_squad) y el resto de las 5 columnas restantes (->
youth_other_sports_expense, que ya cubre juvenil/otros deportes/polideportivo — acá también carga
el personal de Enseñanza/Culturales, que Vélez no separa más fino). "Primas y premios de
jugadores y cuerpo técnico" es casi 100% de la columna Fútbol Profesional (12.637,171532 de
12.639,230993 M), se cargó completa en wages_squad sin separar el resto (2,059461 M, 0,00002% del
total) para no sumar una línea que redondea a $0.

'Derechos de formación' (los 11 ejercicios) -> player_sales (to-do 43, unificado con
Argentinos/Boca/Envigado/Independiente/Once Caldas/Rosario Central/San Lorenzo): hasta ahora
estaba en other_income, catch-all, mismo concepto económico (derechos de formación/mecanismo de
solidaridad por jugadores formados en el club) que ya vive en player_sales para esos otros clubes.
```

## 2025

### Ingresos

_antes de la fila 2 (`Uso del estadio`):_

```text
"Uso del estadio" es la línea más grande después de Cuotas/Transferencias, pero NO es
recaudación de entradas de los propios partidos de Vélez: el club alquila el José Amalfitani
para recitales y otros eventos no deportivos (ver Nota 6 del balance, "Recitales a devengar").
No hay ninguna categoría "matchday_competition" a la que esto pertenezca de verdad, así que
queda en other_income, mismo criterio que "específico del club" del skill.
```

_antes de la fila 8 (`Otros derechos de fútbol profesional`):_

```text
Incluye $3.061,680111 M de recupero de cargas sociales (decreto 510/2023, nota al pie del
propio Anexo II) — no es plata de hinchas/sponsors, pero el documento no lo separa en una
línea propia, así que queda en el catch-all tal cual lo reporta el club.
```

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto (ver
comentario de cabecera) ---
```

_antes de la fila 28 (`Gastos y derechos de jugadores profesionales`):_

```text
Comisiones/gastos de compraventa de jugadores: mismo criterio que Racing (club-data-mapping
SKILL.md sección 1, Versión 52) — Boca tampoco separa esto dentro de "Compra de jugadores"
(solo amortización+deterioro), meterlo ahí sería MENOS fiel, no más homologado.
```

_antes de la fila 29 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo): reclasificación de costos de desarrollo de jugadores propios ya
capitalizados como pase (ver Nota 3 del balance) — directamente relacionado a pases, no un
"otro gasto" genérico.
```

_antes de la fila 30 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 44 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (Estado de situación patrimonial, pág. 6-7:
32.313,540865 + 5.616,101955), SIN incluir "Ingresos anticipados" (plata ya cobrada mas no
devengada, no es deuda financiera) ni "Fondos con destino específico"/"Previsiones" — mismo
criterio que ya usa Boca (grossDebt = Total Deudas, no Total del Pasivo completo). cash = Caja
y bancos (pág. 6, Activo corriente).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b, pág. 23): intereses ganados/
bancarios/deudas previsionales, resultado por tenencia de jugadores propios, diferencias de
cambio y RECPAM, todo junto en una sola línea combinada — mismo criterio que Boca/Racing/River
(nunca se separa este resultado financiero en revenueLines/expenseLines).
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos en el Estado de Recursos y Gastos (pág. 8) — Expenses YA incluye Amortizaciones
(que acá se cargaron como expenseLines, no como meta), ver verifyTieOuts.
```

## 2024

### Ingresos

_antes de la fila 2 (`Uso del estadio`):_

```text
Mismo criterio que 2025 (ver comentario ahí y Admin/dudas-por-club.md): no hay categoría propia para
"estadio alquilado para recitales/eventos no deportivos", queda en other_income.
```

_antes de la fila 3 (`Competencias deportivas`):_

```text
A diferencia de 2025, el Anexo II de este ejercicio no separa "Competencias internacionales" de
"Competencias deportivas" — es una sola línea.
```

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
```

_antes de la fila 3 (`Primas y premios de jugadores y cuerpo técnico`):_

```text
Igual que 2025: "Primas y premios" es casi 100% Fútbol Profesional (5.606,247460 de 5.609,842912
M, 0,06% es Amateur), se carga completa en wages_squad sin separar el resto.
```

_antes de la fila 6 (`Cargo por retenciones y percepciones Decreto 510/2023`):_

```text
Línea propia de este ejercicio (no existía en 2025): un cargo impositivo específico sobre
fútbol profesional, 100% columna Fútbol Profesional. Es un costo tributario, no salarial, mismo
criterio que "Impuestos (sectores)" más abajo -> admin_general_expense.
```

_antes de la fila 30 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo): reclasificación de costos de desarrollo de jugadores propios ya
capitalizados como pase (Anexo I) — mismo criterio que 2025. Este ejercicio compensa EXACTO el
total de la columna Amateur del Anexo III (columna Amateur suma $0 neto en el total impreso),
confirmando que es la contrapartida de todo el gasto de desarrollo juvenil capitalizado.
```

_antes de la fila 31 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 42 (`Publicidad y propaganda`):_

```text
Línea propia de este ejercicio (no existía en 2025): mismo criterio que el resto de Anexo IV.
```

_antes de la fila 46 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (Estado de situación patrimonial, pág. 8:
15.085,097828 + 278,344545), mismo criterio que 2025 (SIN Ingresos anticipados/Previsiones).
cash = Caja y bancos (pág. 7, Activo corriente).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b, pág. 22), mismo criterio que
2025: intereses, resultado por tenencia de jugadores propios, diferencias de cambio y RECPAM,
todo en una sola línea combinada.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal cual
impresos (pág. 9) — Expenses ya incluye Amortizaciones. DÉFICIT DEL EJERCICIO real: verificado
igual a Revenue - Expenses + netInterest = -1.113.139.098 ARS (vs. Superávit +36.833.752 del
ejercicio 2025 recién anterior).
```

## 2023

### Gastos

```text
Ejercicio 2023 (N°113): único cargado vía OCR (Tesseract), no texto nativo — ver comentario de
cabecera y Clubes/Argentina/Velez Sarsfield/balance-general-2023.md. Categorización idéntica al
resto: FÚTBOL PROFESIONAL vs. resto de columnas para Remuneraciones/Cargas sociales, Primas y
premios completo en wages_squad, "Costo de desarrollo" como crédito a player_amortisation.
```

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores" ---
```

_antes de la fila 6 (`Honorarios y retribuciones por servicios (sectores)`):_

```text
"Cargo por retenciones y percepciones Decreto 1212/2003" es $0 este ejercicio (hubo
$24.405.634 en 2022) — no se carga línea en $0.
```

_antes de la fila 30 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 44 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
Ejercicio 2023 (N°113): único cargado vía OCR, no texto nativo. Firmado por el Vicepresidente
1° (Lic. Diego González) en lugar de Rapisarda — Rapisarda se tomó licencia en julio 2023,
JUSTO después del cierre de este ejercicio (30/6/2023); el ejercicio en sí (1°/7/2022-30/6/2023)
transcurrió íntegro bajo su presidencia, por eso sigue siendo gestionId:'rapisarda'.
grossDebt = "Deudas" corriente + no corriente (pág. 9: 5.132,091055 + 175,241654). cash = Caja
y bancos (pág. 8).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 10) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
a Revenue - Expenses + netInterest = $522.234.138 ARS. Verificado con 2 sumas independientes
del Anexo III (una desde el detalle línea por línea, otra desde el total de la fila Amateur
en $0 neto) — ambas dan exacto $10.413.869.311, el mismo total impreso.
```

## 2022

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
```

_antes de la fila 3 (`Primas y premios de jugadores y cuerpo técnico`):_

```text
Primas y premios: 975,162776 de 975,772438 M (99,94%) ya es Fútbol Profesional, se carga
completa en wages_squad, mismo criterio que 2024/2025.
```

_antes de la fila 6 (`Cargo por retenciones y percepciones Decreto 1212/2003`):_

```text
Línea propia de este ejercicio (equivalente al "Decreto 510/2023" de 2024, pero con otro
decreto): mismo criterio, cargo tributario 100% Fútbol Profesional -> admin_general_expense.
```

_antes de la fila 30 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo): reclasificación de costos de desarrollo de jugadores propios ya
capitalizados como pase — mismo criterio que 2024/2025. Compensa exacto la columna Amateur
del Anexo III (confirmado con la suma, esa columna da $0 neto en el total impreso).
```

_antes de la fila 31 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 45 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (pág. 9: 1.911,940047 + 438,371500), mismo
criterio que 2024/2025. cash = Caja y bancos (pág. 8).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b), mismo criterio que
2024/2025: incluye RECPAM (la reexpresión por inflación ya se aplicaba en este ejercicio).
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 10) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado
igual a Revenue - Expenses + netInterest = +1.216.670.585 ARS.
```

## 2021

### Ingresos

_antes de la fila 2 (`Competencias deportivas`):_

```text
"Uso del estadio" no tiene línea propia este ejercicio (0 en 2021, sí hubo $38,768388 M en
2020) — no se carga una línea en $0.
```

_antes de la fila 11 (`Subsidio A.T.P.`):_

```text
Subsidio estatal COVID (Programa de Asistencia de Emergencia al Trabajo y la Producción,
vigente 2020-2021) — no hay categoría propia para esto, mismo criterio que "Subsidios
estatales a la educación" -> other_income.
```

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
```

_antes de la fila 16 (`Publicidad (sectores)`):_

```text
Línea propia de este ejercicio, distinta de "Publicidad y propaganda" del Anexo IV (esta es
parte del gasto por sector, aquella del Anexo IV es una columna única de administración) —
mismo criterio de todos modos: costo de marketing/difusión -> admin_general_expense.
```

_antes de la fila 31 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo), mismo criterio que 2022/2024/2025: compensa exacto la columna Amateur.
```

_antes de la fila 32 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 45 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (pág. 7: 993,999756 + 58,649519), mismo criterio
que el resto. cash = Caja y bancos (pág. 6).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado igual a
Revenue - Expenses + netInterest = $(753.625.872) ARS.
```

## 2020

### Ingresos

_antes de la fila 12 (`Subsidio A.T.P.`):_

```text
Segundo ejercicio con este subsidio COVID (mismo criterio que 2021).
```

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
```

_antes de la fila 11 (`Energía eléctrica (sectores)`):_

```text
"Pérdida por baja jugadores profesionales" es $0 este ejercicio (sí hubo en 2019) — no se
carga una línea en $0.
```

_antes de la fila 30 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo), mismo criterio que los otros ejercicios: compensa exacto la columna
Amateur del Anexo III.
```

_antes de la fila 31 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 44 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

_antes de la fila 45 (`Regularización valuación plantel profesional de fútbol (Ejercicio 2015)`):_

```text
Crédito: regularización de una valuación del Ejercicio 2015 (Nota 2.g) — reduce el costo de
amortización de este ejercicio, no es una línea de ingreso.
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (pág. 7: 581,508235 + 12,201099), mismo criterio
que el resto. cash = Caja y bancos (pág. 6).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado igual a
Revenue - Expenses + netInterest = $(145.019.616) ARS.
```

## 2019

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
```

_antes de la fila 16 (`Subvención a otras entidades`):_

```text
Línea nueva, no vista en los otros ejercicios: donaciones/subvenciones que el club le da a
OTRAS entidades (no ingreso, gasto) — monto ínfimo ($49.305), sin categoría propia, mismo
criterio catch-all que "Varios" -> other_expenses.
```

_antes de la fila 31 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo), mismo criterio que los otros ejercicios: compensa exacto la columna
Amateur del Anexo III.
```

_antes de la fila 32 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 45 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (pág. 7: 486,907381 + 33,132700), mismo criterio
que el resto. cash = Caja y bancos (pág. 6).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
a Revenue - Expenses + netInterest = $370.018.627 ARS.
```

## 2018

### Gastos

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
```

_antes de la fila 14 (`Seguros (sectores)`):_

```text
"Invitaciones a partidos" es $0 este ejercicio (hubo $250.674 en 2017) — no se carga línea
en $0.
```

_antes de la fila 31 (`Costo de desarrollo de jugadores propios (reclasificación)`):_

```text
Crédito (positivo), mismo criterio que los otros ejercicios: compensa exacto la columna
Amateur del Anexo III.
```

_antes de la fila 32 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 43 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (pág. 7: 280,162071 + 59,037916), mismo criterio
que el resto. cash = Caja y bancos (pág. 6).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b). Este ejercicio NO tiene
línea de RECPAM (cierra 30/6/2018, un día antes de la fecha desde la que la FACPCE consideró
a la Argentina economía de alta inflación — ver Nota 1.b del balance 2024) — no es un olvido
de carga, el propio balance no la incluye.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
a Revenue - Expenses + netInterest = $342.815.648 ARS.
```

## 2017

### Gastos

```text
Ejercicio 2017 (N°107): también vía OCR (mismo escaneo A4 estándar que 2018-2025, no el
tamaño reducido de 2015). Prácticamente todas las filas del Anexo III verificaron su suma
interna (columna FP + resto = Total impreso) exacta; el total del Anexo cierra con una
diferencia de $40 contra el impreso ($374.700.522), y el total de Gastos Ordinarios del
ejercicio con la misma diferencia de $40 — ruido de OCR irrelevante (0,00001% del total),
muy por debajo de la tolerancia de verifyTieOuts().
```

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores" ---
```

_antes de la fila 33 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 41 (`Servicios públicos (administración)`):_

```text
"Seguridad y vigilancia" (administración) es $0 este ejercicio.
```

_antes de la fila 43 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
grossDebt = "Deudas" corriente + no corriente (pág. 8: 124,896100 + 42,575219). cash = Caja y
bancos (pág. 7).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b) — sin RECPAM (anterior a
julio 2018).
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 9) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado (con
~$40 de ruido de OCR) igual a Revenue - Expenses + netInterest = $(73.534.953) ARS.
```

## 2016

### Gastos

```text
Ejercicio 2016 (N°106): también vía OCR. TODAS las filas del Anexo II/III/IV verificaron su
suma interna exacta contra el total impreso (sin ruido, a diferencia de 2015/2017) — el
"Total 2015" comparativo de este mismo balance además confirmó, de forma independiente, cada
valor ya cargado para el Ejercicio 2015.
```

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores" ---
```

_antes de la fila 33 (`Remuneraciones al personal (administración)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 44 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

### Meta

```text
Ejercicio 2017 (N°107): también vía OCR. Anexo III/Gastos Ordinarios cierran con una
diferencia de $40 contra el impreso (ruido de OCR irrelevante, ver comentario en
velezExpenseLinesByYear.2017).
Ejercicio 2016 (N°106): también vía OCR, sin ruido detectado (todas las sumas cerraron exacto).
fx VERIFICADO (to-do 21a, 2026-09-20): Anexo VI del propio balance, 14,94 en la columna
"cambio vigente". Comprador, ver 2015.
grossDebt = "Deudas" corriente + no corriente (pág. 8: 156,158679 + 24,036428). cash = Caja y
bancos (pág. 7).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b) — sin RECPAM.
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 9) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
a Revenue - Expenses + netInterest = $66.227.589 ARS.
```

## 2015

### Ingresos

```text
Anexo II "Recursos ordinarios", columna "Totales 2025". Todo en ARS MILLONES (pesos oficiales /
1.000.000), moneda homogénea (reexpresada según FACPCE, Nota 1.b del balance) — mismo criterio
que el resto del sitio, sin ninguna conversión adicional al cargar el dato.
```

### Gastos

```text
Ejercicio 2015 (N°105): único cargado vía OCR de un PDF de baja resolución/tamaño reducido
(178x252pt) — varios valores de columna intermedia (Amateur/otros sectores) tuvieron ruido de
OCR de $500-5.000 en algunas filas, PERO el valor de columna Fútbol Profesional y el de TOTAL
<año> de cada fila (los 2 únicos que se usan acá) se verificaron con una suma fila-por-fila que
cierra EXACTO contra el total impreso del Anexo III ($210.685.807) — ver metodología completa
en el comentario de cabecera de este archivo.
```

_antes de la fila 1 (`Remuneraciones al personal (fútbol profesional)`):_

```text
--- Anexo III "Gastos específicos de sectores" ---
```

_antes de la fila 10 (`Pérdida por desvinculación de jugadores profesionales`):_

```text
Línea propia de este ejercicio: en el resto de los años se llama "Pérdida por baja jugadores
profesionales", acá figura como "Pérdida por desvinculación jugadores profesionales" — mismo
concepto, mismo criterio -> player_impairment.
```

_antes de la fila 14 (`Invitaciones a partidos`):_

```text
Línea nueva, no vista en otros ejercicios: gastos de invitaciones/hospitalidad para partidos,
mismo tipo de concepto que "Gastos partidos" -> match_organisation_expense.
```

_antes de la fila 33 (`Remuneraciones al personal (administración y cobranzas)`):_

```text
--- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
```

_antes de la fila 44 (`Amortización plantel profesional de fútbol`):_

```text
--- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
```

_antes de la fila 45 (`Regularización valuación plantel profesional de fútbol (Ejercicio 2011)`):_

```text
Dos créditos de regularización distintos este ejercicio (de 2 ejercicios de origen distintos),
mismo tipo de ajuste retroactivo que en 2018-2020.
```

### Meta

```text
Ejercicio 2015 (N°105): único cargado vía OCR de un PDF de baja resolución — ver comentario en
velezExpenseLinesByYear.2015 y en la cabecera del archivo para la metodología de verificación.
fx VERIFICADO (to-do 21a, 2026-09-20): lo declara el Anexo VI del propio balance
("Activos y pasivos en moneda extranjera"), 8,9880 en la columna "cambio vigente" de las
líneas en US$. La Nota 2.a) dice explícitamente que se usa el tipo comprador para activos y
el vendedor para pasivos, así que 8,9880 es el comprador: mismo criterio que los otros 9
ejercicios de Vélez y que el resto de los clubes.
La to-do 21(a) daba esto por imposible ("la transcripción de esos 2 escaneos no preservó la
columna de cambio vigente"). Era cierto cuando se escribió; ya no lo es.
grossDebt = "Deudas" corriente + no corriente (pág. 8: 149,036862 + 23,887407). cash = Caja y
bancos (pág. 7).
netInterest = "Resultados financieros y por tenencia" (Nota 5.b) — este ejercicio (2015) no
tiene línea de RECPAM, igual que 2018 (ambos anteriores al inicio de la reexpresión por
inflación en julio 2018).
officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
cual impresos (pág. 9) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado igual a
Revenue - Expenses + netInterest = $(36.195.305) ARS.
```

## Fuentes

### velez-balance-2024-25

_note (data/):_

```text
PDF oficial (50 páginas, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 15/10/2025, firmado por Luis Fabián Berlanga como Presidente), descargado de la página institucional de balances del club (archivo completo, 2015-2025). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2025.pdf. Cifras en moneda homogénea (reexpresadas según FACPCE, Nota 1.b). Convertido a USD con $1.196, el tipo de cambio de cierre que el propio balance declara en su Anexo VI (Activos y pasivos en moneda extranjera) para USD al 30/06/2025 — mismo valor que declaró el balance de Racing para la misma fecha de cierre. SUPERÁVIT real del ejercicio: $36.833.752 ARS (mucho más chico que el del ejercicio anterior, que fue déficit de $(1.551.939.880) ARS). "Salarios y primas (plantel y cuerpo técnico)" se separó de "Otras secciones deportivas" usando la columna "FÚTBOL PROFESIONAL" del Anexo III (el club desglosa gastos por sector: fútbol profesional/amateur/complejo polideportivo/enseñanza/culturales/otros deportes), no el total de sector — ver comentario completo en data/velez-data.js.
```

### velez-balance-2023-24

_note (data/):_

```text
PDF oficial (48 páginas, texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 7/10/2024, firmado por Luis Fabián Berlanga como Presidente), mismo archivo institucional que el Ejercicio 2025. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2024.pdf. Convertido a USD con $909, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2024. DÉFICIT real del ejercicio: $(1.113.139.098) ARS. Mismo criterio de categorización que el Ejercicio 2025 (ver data/velez-data.js): "Primas y premios" se cargó completa en wages_squad (99,94% ya es columna Fútbol Profesional); "Costo de desarrollo de jugadores propios" es un crédito que compensa exacto la columna Amateur del Anexo III (confirmado: esa columna suma $0 neto en el total impreso).
```

### velez-balance-2014-15

_note (data/):_

```text
PDF oficial ESCANEADO, de tamaño de página reducido (178x252pt), sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 450-900dpi según la página; algunas tablas anchas rotadas 90° en el escaneo original). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 28/9/2015, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017 — NO Rapisarda, que asumió recién en noviembre 2017). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2015.pdf (transcripción en balance-general-2015.md). Convertido a USD con $8,988, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2015 (previo a la devaluación de diciembre 2015). DÉFICIT real del ejercicio: $(36.195.305) ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); varios valores de columnas intermedias del Anexo III tuvieron ruido de OCR de unos pocos miles de pesos, pero los valores usados (columna Fútbol Profesional y columna Total del año) se verificaron con una suma fila por fila que cierra EXACTO contra el total impreso.
```

### velez-balance-2015-16

_note (data/):_

```text
PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 450dpi; algunas tablas anchas rotadas 90°). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 26/9/2016, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2016.pdf (transcripción en balance-general-2016.md). Convertido a USD con $14,94, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2016. SUPERÁVIT real del ejercicio: $66.227.589 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); TODAS las sumas del Anexo II/III/IV cerraron exacto contra los totales impresos, sin ruido de OCR detectado — y la columna comparativa "2015" de este mismo balance confirmó, en forma independiente, cada cifra ya cargada para el Ejercicio 2015.
```

### velez-balance-2016-17

_note (data/):_

```text
PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 300dpi; algunas tablas anchas rotadas 90° en el escaneo original). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 25/9/2017, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2017.pdf (transcripción en balance-general-2017.md). Convertido a USD con $16,53, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2017. DÉFICIT real del ejercicio: $(73.534.953) ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); casi todas las filas del Anexo III cerraron su checksum interno exacto, el total del Anexo/Gastos Ordinarios tiene una diferencia de $40 (ruido de OCR irrelevante) contra el impreso.
```

### velez-balance-2017-18

_note (data/):_

```text
PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 24/9/2018, firmado por Sergio D. Rapisarda como Presidente, su primera gestión), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2018.pdf. Convertido a USD con $28,75, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2018. SUPERÁVIT real del ejercicio: $342.815.648 ARS. Este ejercicio (cierre 30/6/2018) es el último ANTES de que la FACPCE empezara a considerar a la Argentina economía de alta inflación (desde el 1°/7/2018) — no tiene línea de RECPAM en Resultados financieros, a diferencia de todos los ejercicios posteriores. Mismo criterio de categorización que el resto (ver data/velez-data.js).
```

### velez-balance-2018-19

_note (data/):_

```text
PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 16/9/2019, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2019.pdf. Convertido a USD con $42,263, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2019. SUPERÁVIT real del ejercicio: $370.018.627 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); incluye una línea de crédito por "Regularización valuación plantel profesional de fútbol (Ejercicio 2015)" (mismo tipo de ajuste que aparece también en el Ejercicio 2020) y una línea nueva "Subvención a otras entidades" (donación del club a terceros, monto ínfimo, other_expenses).
```

### velez-balance-2019-20

_note (data/):_

```text
PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 13/11/2020, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2020.pdf. Convertido a USD con $70,26, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2020. DÉFICIT real del ejercicio: $(145.019.616) ARS. Ejercicio de pandemia (COVID-19): incluye el mismo subsidio estatal "Subsidio A.T.P." que el Ejercicio 2021. Mismo criterio de categorización que el resto (ver data/velez-data.js); incluye una línea de crédito por "Regularización valuación plantel profesional de fútbol (Ejercicio 2015)" que reduce el costo de amortización de este ejercicio en particular.
```

### velez-balance-2020-21

_note (data/):_

```text
PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 28/9/2021, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2021.pdf. Convertido a USD con $95,52, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2021. DÉFICIT real del ejercicio: $(753.625.872) ARS. Incluye un ingreso extraordinario COVID ("Subsidio A.T.P.", programa estatal de asistencia al trabajo y la producción) categorizado como other_income. Mismo criterio de categorización que 2022/2024/2025 (ver data/velez-data.js).
```

### velez-balance-2021-22

_note (data/):_

```text
PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 30/9/2022, firmado por Sergio D. Rapisarda como Presidente, NO Berlanga — ejercicio anterior a su gestión), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2022.pdf. Convertido a USD con $125,03, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2022. SUPERÁVIT real del ejercicio: $1.216.670.585 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js).
```

### velez-balance-2022-23

_note (data/):_

```text
PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 300dpi; páginas con tablas anchas de 6 columnas rotadas 90° en el escaneo original se re-rotaron antes de correr el OCR para que saliera legible). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 25/9/2023, firmado por el Vicepresidente 1° (Lic. Diego González) en lugar de Rapisarda — Rapisarda se tomó licencia recién en julio 2023, después del cierre de este ejercicio, así que el ejercicio en sí transcurrió íntegro bajo su presidencia. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2023.pdf (transcripción en balance-general-2023.md). Convertido a USD con $256,30, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2023. SUPERÁVIT real del ejercicio: $522.234.138 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); los números se verificaron con 2 sumas independientes del Anexo III antes de cargarlos (ambas coinciden exacto con el total impreso), no solo con el OCR crudo.
```

## Otros

### velezPasesData

```text
---------------------------------------------------------------------------
Mercado de pases / Resultados deportivos / Títulos: TODAVÍA NO onboardeados para Vélez (esta
sesión se enfocó solo en Finanzas). Vacíos a propósito, no placeholder inventado — a diferencia
de Boca/River/Racing (que arrancaron con movimientos/títulos de mentira tipo "Jugador A"), acá se
prefirió dejarlo vacío hasta cargar datos reales, para no tener que salir a buscar y borrar
placeholders más adelante. Las 3 pestañas (Mercado de Pases/Resultados/Comparar Gestiones) andan
bien con esto vacío (ver pasesDataForClub/resultadosDataForClub/titulosDataForClub en index.html,
ya devuelven `|| []`/manejan la ausencia de la gestión sin romper).
---------------------------------------------------------------------------
```

### window.CLUB_GENERIC_DATA

```text
Versión 95: registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js).
```

### gestionesByClub.velez

```text
Confirmado (Versión 83): Fabián Berlanga fue electo presidente el 12/11/2023 (nota oficial
del club, velez.com.ar/club/notas/2023/11/12/220544_fabian-berlanga-presidente), mandato
2023-2026. `nombre` ya refleja esa fecha real de asunción. firstYear/lastYear siguen siendo
el rango de EJERCICIOS REALES CARGADOS (no la fecha de asunción) — mismo criterio que
"milito"/"blanco" de Racing. Ampliado a 2024 en la Versión 84 (el Ejercicio 114, 1°/7/2023 al
30/6/2024, cae bajo su gestión — asumió en noviembre 2023, a mitad de ese ejercicio).
Confirmado (Versión 85): Sergio Rapisarda asumió por primera vez en noviembre 2017, fue
reelecto en marzo 2021, y se tomó licencia en julio 2023 tras la agresión de barras (dejando
paso, meses después, a la elección de Berlanga en noviembre 2023). Ampliado a 2018 en la
Versión 89 (el Ejercicio 108, 1°/7/2017 al 30/6/2018, también cae dentro de su primera
gestión — asumió en noviembre 2017, a mitad de este ejercicio).
Ampliado a 2023 en la Versión 90 (Ejercicio 113, 1°/7/2022 al 30/6/2023) — el ejercicio
transcurrió íntegro bajo su presidencia aunque el balance esté firmado por el Vicepresidente
(Rapisarda se tomó licencia recién en julio 2023, después del cierre de este ejercicio).
Confirmado por búsqueda (Versión 91): Raúl H. Gámez fue presidente de Vélez en 3 mandatos no
consecutivos (1996-1999, 2002-2005, 2014-2017); el Ejercicio 2015 (1°/7/2014-30/6/2015) cae
en su 3er mandato, el único cargado hasta ahora bajo su gestión.
Ampliado a 2017 en la Versión 92 (Ejercicio 107, 1°/7/2016 al 30/6/2017, último de su 3ra
gestión antes de que asumiera Rapisarda en noviembre 2017).
```
