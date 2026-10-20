# sanlorenzo — evidencia de carga

Lo que había como comentario en `data/ar/sanlorenzo-ar-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/sanlorenzo-ar-data.js — Club Atlético San Lorenzo de Almagro: 10mo club del motor genérico. 4
ejercicios consecutivos cargados: 2011, 2012, 2013, 2014 (30/6 de cada año), balances auditados
reales, texto nativo (escaneado con calidad de OCR de imprenta vieja en 2013/2014 — pdftotext con
typos; 2011/2012 vienen de un balance distinto, auditado por Deloitte, con mejor calidad de
escaneo pero varias páginas de Anexo rotadas 90°, OCReadas con Tesseract tras rotar). PDF +
transcripción en Clubes/Argentina/San Lorenzo/memoria-y-balance-{2011-2012,2012-2013,2013-2014}.
{pdf,md} (la transcripción de 2011-2012 quedó pendiente de generar el .md, ver to-do).

2012 (Ejercicio cerrado 30/6/2012, auditado por Deloitte): tiene el desglose completo Anexo V
(Recursos)/Anexo VI (Gastos) por rubro x departamento (Fútbol/Administración central/Ciudad
deportiva/Subsedes), mismo mecanismo de columna-por-sector que Vélez/Instituto/2013 (Sueldos y
cargas sociales, Primas y premios de jugadores → columna Fútbol = wages_squad, resto =
youth_other_sports_expense). El Anexo VI está rotado 90° dentro del PDF (2 hojas) — se rotó con
PIL antes de re-OCRear, mismo criterio que club-data-mapping/referencia/leer-pdf.md. Su fila
"Transporte" es, otra vez, un subtotal "a transportar" de la Hoja 1 (no un gasto real) —
excluida, mismo hallazgo que ya existía para 2013.
2011 (comparativo DENTRO del balance de 2012, no hay archivo propio descargado para este año):
Anexo V (Recursos) da detalle completo por rubro para AMBOS años a la vez, así que 2011 tiene el
mismo nivel de detalle de revenue que 2012. Anexo VI (Gastos), en cambio, solo desglosa por
departamento el año "actual" (2012) — 2011 queda a nivel de las 7 categorías agregadas del
Estado de Recursos y Gastos principal (Fútbol/Administración central/Ciudad deportiva/Subsedes/
Depreciación/Amortización/Otros gastos), agregación honesta, no inventada.
2013 (Ejercicio cerrado 30/6/2013): tiene el desglose completo Anexo V (Recursos)/Anexo VI
(Gastos) por rubro x departamento (Fútbol/Administración central/Ciudad deportiva/Subsedes),
mismo mecanismo de columna-por-sector que Vélez/Instituto (Sueldos y cargas sociales, Primas y
premios de jugadores → columna Fútbol = wages_squad, resto = youth_other_sports_expense).
2014 (Ejercicio cerrado 30/6/2014): ESTE documento específico (19 páginas) NO incluye los Anexos
V/VI de detalle — solo el Estado de Recursos y Gastos con las 4 categorías agregadas (Fútbol/
Administración central/Ciudad deportiva/Otros). Se cargó con ese nivel de agregación honesto
(lump_football_operations para "Fútbol", member_dues para "Administración central" por analogía
directa con el desglose real de 2013 del mismo club, donde esa categoría fue ~99,7% cuotas
sociales), no se inventó un desglose que la fuente no da.

Bug de transcripción encontrado y corregido en 2013: la fila "Préstamos"... no, en este caso fue
la fila "Transporte" del Anexo VI (Hoja 2) — en realidad NO es una fila de gasto real, es un
subtotal "a transportar" de la Hoja 1 (verificado: la suma de las 18 filas de la Hoja 1 da
exactamente ese número, 113.639.649) — se excluyó de expenseLines para no duplicar gasto, se
usaron solo las filas reales de Hoja 1 + Hoja 2.

Varios números en el PDF fuente de 2013 usan COMA en vez de PUNTO como separador de miles (ej.
"155.932,357" en vez de "155.932.357", "4,034.869" en vez de "4.034.869") — confirmado como
error tipográfico del documento (no del OCR/transcripción) verificando que la suma de las partes
da exacto el total impreso con el separador corregido a punto.

grossDebt = "Deudas" corriente+no corriente, EXCLUYENDO "Previsiones" (contingencias, Anexo IV) —
mismo criterio que el resto de los clubes. cash = Caja y bancos.

FX: 2013 declara su propio Anexo (dos cotizaciones USD, $5,355 Activo / $5,388 Pasivo — se usó la
de Activo/Caja, mismo criterio que Rosario Central/Estudiantes LP). 2014 NO declara tipo de
cambio propio (documento más corto, sin Anexo de moneda extranjera) — se usó el dólar oficial
vendedor BNA de cierre 30/6/2014 ($8,15, investigado externamente). 2012 declara su propio Anexo
III (activos/pasivos en moneda extranjera, con VARIAS cotizaciones distintas por tipo de partida)
— se usó la de Caja y bancos ($4,4870), mismo criterio de "lado Activo/Caja" que el resto del
sitio. 2011 NO se pudo confirmar con la misma precisión (el Anexo III de 2012 no separa
claramente su columna comparativa 2011 por tipo de cambio) — se usó $4,11, una aproximación
externa del dólar oficial de mediados de 2011, MENOS confiable que el resto de los fx de este
archivo, documentado así en vez de inventar precisión que no se tiene.

Gestión: Carlos Abdo, presidente hasta su renuncia en agosto de 2012 (confirmado por búsqueda) —
cubre los Ejercicios 2011 y 2012 (ambos cierran 30/6, ANTES de su renuncia). Matías Lammens,
presidente provisional desde 1°/9/2012, electo formalmente 14/12/2013, reelecto 17/12/2016, hasta
2019 — cubre 2013/2014 con confianza (asumió a mitad del Ejercicio 2012/2013, mismo criterio que
Berlanga/Belloso en otros clubes).

2024 (Ejercicio 1°/7/2023 al 30/6/2024): a diferencia de 2013/2014, esta NO es una carga de
balance auditado — es el Presupuesto 2023-2024 (`Clubes/Argentina/San Lorenzo/
presupuesto-2023-2024.md`), un presupuesto de CAJA mensual (12 columnas, jul-23 a jun-24) con
texto nativo pero mal extraído por pdftotext -layout (números de filas anchas cayendo en líneas
separadas) — se re-leyó directo de imágenes renderizadas de la página (300dpi) para reconstruir
la tabla real. El documento separa una sección "Ordinaria" (operación normal) de una sección
"Orígenes y Aplicaciones Extraordinarias" (aportes bancarios/dirigenciales y su cancelación,
obras de capital, compra/venta de jugadores en términos de DESEMBOLSO de caja, cancelación de
deuda vieja) — REGLA (ver `.claude/skills/club-data-mapping/referencia/casos-por-pais-y-formato.md`): se cargó SOLO
la sección Ordinaria, la Extraordinaria es financiamiento/capital, no ingreso o gasto real del
ejercicio. "Resultado Ordinario" (no "Saldo Final por Período", que sí mezcla con financiamiento)
es el PAT del ejercicio. Pregunta anotada en Admin/dudas-por-club.md sobre por qué el club presupuesta
así en vez de devengado, como sus propios balances auditados.
"Impuestos/Moratoria/Cargas sociales" es UNA sola fila combinada en el documento (Pauta N°18) —
no se puede separar, se cargó entera como admin_general_expense (ver club-data-mapping/referencia/casos-por-pais-y-formato.md para el
precedente completo de cómo se categoriza cada uno de esos 3 conceptos por separado en otros
clubes). "Remuneraciones" excluye plantel profesional/cuerpo técnico/becas deportivas (Pauta N°8,
eso va aparte en "Fútbol Profesional" → wages_squad) — es el resto de la estructura del club, va a
admin_general_expense. Verificado con checksum antes de cargar: 7 categorías de Ingresos
Ordinarios suman $19.416.976.393 (oficial $19.416.976.392, diff $1 redondeo); 11 categorías de
Egresos Ordinarios suman $13.469.229.204 (oficial $13.469.229.203, diff $1); Ingresos−Egresos =
$5.947.747.189 = Resultado Ordinario impreso, EXACTO.
Gestión: Ejercicio a caballo entre 2 presidentes con una división casi exacta a la mitad —
Marcelo Tinelli hasta el 26/12/2023, Marcelo Moretti desde entonces (electo 17/12/2023, asumió
26/12/2023) — se usó Moretti (a cargo al cierre 30/6/2024, mismo criterio que Berlanga/Belloso/
Verón en otros clubes), pero por lo parejo de la división de meses queda anotado en
Admin/dudas-por-club.md, mismo caso que Estudiantes LP 2024.
FX: el presupuesto no declara tipo de cambio propio (es un documento en ARS puro, sin Anexo de
moneda extranjera) — se usó el dólar mayorista de cierre 30/6/2024 ($909), el mismo ya
investigado externamente y usado en Instituto/Independiente/Racing 2024 para la misma fecha.
============================================================================
```

## 2024

### Meta

```text
Presupuesto (no balance auditado), sección Ordinaria únicamente — ver comentario de cabecera.
Presupuesto de caja: no incluye Estado de Situación Patrimonial, sin grossDebt/cash (mismo
motivo que Boca 2027/Racing 2026-2027).
```

## 2017

### Meta

```text
fx VERIFICADO (to-do 21a, 2026-09-20): lo declara el Anexo II del propio balance,
"Activos y pasivos en moneda extranjera", 16,5300 del lado Activo (hoja 1). La hoja 2
(Pasivo) dice 16,6300: son los dos lados del spread del mismo día, mismo caso que Unión
(Versión 140). Se usa el comprador, igual que en el resto de los clubes.
officialTotalRevenue = RECURSOS ORDINARIOS (688.575463) + "Otros ingresos y egresos"
(86.779016), cargado como revenue line. SUPERÁVIT muy chico este ejercicio ($436.617,
prácticamente equilibrio) — verificado, no es un error.
```

## 2016

### Meta

```text
fx VERIFICADO (to-do 21a, 2026-09-20): Anexo III del propio balance, 14,9400 del lado
Activo (Créditos US$) contra 15,0400 del lado Pasivo. Comprador, ver 2017.
Resultados financieros y por tenencia dio POSITIVO este ejercicio ($93.428.003) — no es un
error, el propio documento lo imprime así (ganancia financiera neta, no gasto).
officialTotalRevenue = RECURSOS ORDINARIOS (440.467744) + "Otros ingresos y egresos"
(2.296869), cargado como revenue line.
```

## 2015

### Meta

```text
fx VERIFICADO (to-do 21a, 2026-09-20): Anexo III del propio balance, 8,9880 del lado
Activo (Caja y bancos / Créditos US$) contra 9,0880 del lado Pasivo. Comprador, ver 2017.
OJO, la sospecha que dejó la to-do 21(a) de que pudiera haber una copia desde Vélez (que
tiene el MISMO 8,988 en 2015 y el mismo 14,94 en 2016) queda descartada: los dos clubes
cierran el 30 de junio, así que les corresponde la misma cotización oficial de cierre.
Coincidir es lo esperado, no la señal de una copia.
officialTotalRevenue = RECURSOS ORDINARIOS (429.409431) + "Otros ingresos y egresos"
(9.356337), cargado como revenue line.
```

## 2014

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2011, 2012, 2013, 2015, 2016, 2017): Comercial / Sponsors, Estadio, Televisión, Venta de Jugadores, Salarios y primas (plantel y cuerpo técnico), Organización de partidos, Otras secciones deportivas (juvenil, otros deportes, básquet)
officialTotalRevenue = RECURSOS ORDINARIOS (233.154363) + "Otros ingresos y egresos"
(39.067369), cargado como revenue line.
```

## 2013

### Meta

```text
officialTotalRevenue = RECURSOS ORDINARIOS (165.590237) + "Otros ingresos y egresos"
(15.242433), cargado como revenue line — ver comentario de cabecera.
```

## 2011

### Meta

```text
tools/dentro-de-otro.mjs (2026-10-05): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2012, 2013, 2015, 2016, 2017): Salarios y primas (plantel y cuerpo técnico), Organización de partidos, Otras secciones deportivas (juvenil, otros deportes, básquet)
Comparativo dentro del balance 2011-2012 — no hay archivo propio descargado para este año.
```

## Gestiones

_antes de Carlos Abdo (data/gestiones/ar.js):_

```text
Abdo: electo el 11/12/2010, asumió el 28/12/2010; renunció en julio de 2012 y Lammens asumió la conducción el 1/8/2012.
```

_antes de Matías Lammens (data/gestiones/ar.js):_

```text
Lammens: interino desde el 1/8/2012, formalmente electo con asunción el 1/9/2012.
```

_antes de Marcelo Tinelli (data/gestiones/ar.js):_

```text
Tinelli: licencia desde mayo de 2021; la renuncia se anunció el 30/4/2022 y se formalizó a fines de mayo (30/5/2022, aproximado).
```

_antes de Marcelo Moretti (data/gestiones/ar.js):_

```text
Moretti: hasta = acefalía declarada el 16/12/2025 (licencia desde agosto de 2025 con Lopardo a cargo; Costantino transitorio desde el 22/12/2025). Sin gestiones posteriores cargadas.
```

## Fuentes

### sanlorenzo-ar-memoria-y-balance-2011-12

_note (data/):_

```text
PDF oficial (33 páginas, texto nativo, algunas páginas de Anexo rotadas 90°), auditado por Deloitte & Co. S.A. DÉFICIT real 2012: $(45.744.341) ARS. Da el Ejercicio 2012 con detalle completo de Anexo V (Recursos)/Anexo VI (Gastos, por rubro x departamento) y el Ejercicio 2011 como comparativo (revenue con detalle completo, gastos solo a las 7 categorías agregadas del Estado de Recursos y Gastos — el Anexo VI no desglosa el año comparativo). DÉFICIT real 2011: $(41.645.487) ARS. Convertido a USD con $4,4870 (2012, Anexo III, lado Caja y bancos) / $4,11 (2011, aproximación externa MENOS confiable, el Anexo III de este balance no separa claramente su columna comparativa por tipo de cambio). Ver data/ar/sanlorenzo-ar-data.js.
```

### sanlorenzo-ar-memoria-y-balance-2016-17

_note (data/):_

```text
PDF oficial (40 páginas, texto nativo con bastante ruido de OCR en esta copia, algunas páginas de Anexo rotadas 90°), auditado por Bertora & Asociados. SUPERÁVIT real: $436.617 ARS (ejercicio de resultado prácticamente en equilibrio, verificado). Detalle completo de Anexo V (Recursos)/Anexo VI (Gastos por rubro x departamento). Convertido a USD con $16,53 (Anexo III, Caja y bancos en USD). Ver data/ar/sanlorenzo-ar-data.js.
```

### sanlorenzo-ar-memoria-y-balance-2015-16

_note (data/):_

```text
PDF oficial (37 páginas, texto nativo, algunas páginas de Anexo rotadas 90°), auditado por Bertora & Asociados. SUPERÁVIT real: $33.377.884 ARS — este ejercicio tuvo un resultado financiero POSITIVO ($93.428.003, ganancia neta, no gasto). Detalle completo de Anexo V (Recursos)/Anexo VI (Gastos por rubro x departamento). Convertido a USD con $14,94 (Anexo III, Créditos del Activo Corriente en US$ — la Caja y bancos de este ejercicio solo tenía EUR, no USD). Ver data/ar/sanlorenzo-ar-data.js.
```

### sanlorenzo-ar-memoria-y-balance-2014-15

_note (data/):_

```text
PDF oficial (34 páginas, texto nativo, algunas páginas de Anexo rotadas 90°), auditado por Bertora & Asociados. SUPERÁVIT real: $41.968.388 ARS. Detalle completo de Anexo V (Recursos)/Anexo VI (Gastos por rubro x departamento). Convertido a USD con $8,988 (Anexo III, lado Activo/Caja — el Pasivo declara $9,088). Ver data/ar/sanlorenzo-ar-data.js.
```

### sanlorenzo-ar-memoria-y-balance-2012-13

_note (data/):_

```text
PDF oficial (34 páginas, texto nativo con bastantes typos de imprenta — comas en vez de puntos como separador de miles en varios números, verificado que es error tipográfico del propio documento sumando las partes contra el total impreso). Auditado por Bertora & Asociados, informe de fecha 20/12/2013, firmado por Matías Lammens como Presidente. SUPERÁVIT real: $32.929.698 ARS. Convertido a USD con $5,355 (lado Activo/Caja del Anexo de moneda extranjera — el Pasivo declara $5,388). Ver data/ar/sanlorenzo-ar-data.js para el detalle completo, incluye una fila "Transporte" del Anexo VI que en realidad es un subtotal de página, no un gasto real (se excluyó).
```

### sanlorenzo-ar-memoria-y-balance-2013-14

_note (data/):_

```text
PDF oficial (19 páginas, texto nativo), auditado por Bertora & Asociados, informe de fecha 14/1/2015, firmado por Matías Lammens como Presidente. SUPERÁVIT real: $76.628.874 ARS. Este documento específico NO incluye los Anexos V/VI de detalle por rubro (solo el Estado de Recursos y Gastos con 4 categorías agregadas) — se cargó con ese nivel de agregación honesto, sin inventar desglose. Convertido a USD con $8,15 (dólar oficial vendedor BNA de cierre, investigado externamente — este documento no declara su propio tipo de cambio).
```

### sanlorenzo-ar-presupuesto-2023-24

_note (data/):_

```text
PDF oficial (1 página, texto nativo pero mal extraído por pdftotext -layout, re-leído de imágenes renderizadas de la página). Presupuesto de CAJA con sección Ordinaria (operación normal) y una sección Extraordinaria de financiamiento/capital que NO se cargó (ver data/ar/sanlorenzo-ar-data.js y `.claude/skills/club-data-mapping/referencia/casos-por-pais-y-formato.md`). Resultado Ordinario proyectado: $5.947.747.189 ARS. Convertido a USD con $909 (dólar mayorista de cierre 30/6/2024, investigado externamente, mismo valor usado en Instituto/Independiente/Racing para la misma fecha — este documento no declara tipo de cambio propio).
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-ar-data.js, Versión 95).
```

### gestionesByClub.sanlorenzo

```text
Confirmado por búsqueda (Versión 95): Matías Lammens presidente provisional desde 1°/9/2012,
electo formalmente 14/12/2013, reelecto 17/12/2016, hasta 2019 — cubre ambos ejercicios
cargados (2013, 2014).
Carlos Abdo, presidente hasta su renuncia en agosto de 2012 (confirmado por búsqueda) — cubre
los Ejercicios 2011 y 2012 (ambos cierran 30/6, antes de la renuncia).
Tinelli sucedió a Lammens en 2019, presidió hasta el 26/12/2023 (derrotado en la elección de
dic-2023) — NO tiene entrada propia acá porque ningún ejercicio cargado queda atribuido
enteramente a su gestión (el único ejercicio de este rango, 2024, se atribuyó a Moretti, ver
abajo); agregar su entrada si en el futuro se carga un ejercicio 100% suyo (2020-2023).
Moretti electo 17/12/2023, asumió 26/12/2023. El Ejercicio 2023/2024 (jul-jun) quedó dividido
casi exactamente a la mitad entre Tinelli y Moretti — se usó Moretti (a cargo al cierre
30/6/2024, mismo criterio que Berlanga/Belloso/Verón en otros clubes), con la duda anotada en
Admin/dudas-por-club.md por lo pareja que fue la división de meses.
```

### memberCountByClub.sanlorenzo

```text
~89.717 socios (Wikipedia, 2026)
```
