# gimnasiaesgrima-ar — evidencia de carga

Lo que había como comentario en `data/ar/gimnasiaesgrima-ar-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/gimnasiaesgrima-ar-data.js — Club de Gimnasia y Esgrima La Plata (Asociación Civil, "el
Lobo"). Club nuevo, primeros ejercicios cargados: 2023/2024/2025 (balances reales, 136°/137°/138°
Ejercicio) + 2026 (presupuesto standalone, todavía sin balance real). Ver
Admin/sourcing/Argentina/Gimnasia y Esgrima LP.md para cómo se encontraron los 9 documentos (2 hosts
distintos: CDN de mailing para el 136°, wp-content del sitio para 137°/138°).

ARQUITECTURA DEL EJERCICIO DUAL (Presupuesto Y Balance a la vez, ver club-or-year-onboarding
SKILL.md sección 11): los 3 presupuestos descargados NO son del mismo ejercicio que el balance
con el que vienen empaquetados en la nota de prensa — son el presupuesto aprobado para el año
SIGUIENTE, en la misma asamblea que aprueba el balance del año que cierra (patrón común
argentino). Confirmado leyendo el título de cada presupuesto ("PRESUPUESTO ECONOMICO DE RECURSOS
Y GASTOS — EJERCICIO <N>"):
  - presupuesto-2023-2024.pdf (venía con el 136°/2022-23) → Ejercicio 2023-2024 → overlay de 2024.
  - presupuesto-2024-2025.pdf (venía con el 137°/2023-24) → Ejercicio 2024-2025 → overlay de 2025.
  - presupuesto-2025-2026.pdf (venía con el 138°/2024-25) → Ejercicio 2025-2026 → STANDALONE 2026
    (no hay balance real de este ejercicio todavía, es el futuro).
Mapeo real, confirmado exacto contra el análisis de la tarea: 2023 = solo balance;
2024/2025 = balance real (primario) + overlay de presupuesto del mismo ejercicio; 2026 = solo
presupuesto (fuente primaria de ese año, no hay overlay porque no hay balance al lado).

ESTRUCTURA DEL DOCUMENTO (balances): a diferencia de Racing/Boca (una sola tabla de rubros
transversal), Gimnasia reporta Recursos y Gastos por SECTOR/DEPARTAMENTO como eje de COLUMNAS
(Fútbol Profesional, Deportes y Actividades Sociales, Jardín de Infantes y Escuela, Generales,
Financieros y por Tenencia) cruzado con RUBRO como eje de FILAS (Anexo IV/V de Recursos/Gastos,
numeración de Anexo varía por año) — mismo patrón de matriz 2 ejes que Vélez Sarsfield (ver
club-data-mapping/referencia/formato-simplificado.md). Cuando una fila tiene columnas en más de un sector CON
LA MISMA normalizedCategory (ej. "Derechos de Televisión" en Fútbol Profesional + Deportes), se
cargó como UNA sola línea con el total combinado. Cuando los sectores de una fila mapean a
categorías DISTINTAS (ej. "Sueldos y Cargas Sociales", "Varios", "Atención Médica"), se partió en
una línea por sector, con el sector aclarado entre paréntesis en el rawLabel.

CRITERIO DE SECTOR → CATEGORÍA usado en los 3 ejercicios (igual en los 3, no varía):
  Fútbol Profesional → wages_squad (sueldos/primas/premios/médico/viáticos del plantel, mismo
    criterio "CASO CONSULTADO" de club-data-mapping/referencia/formato-simplificado.md: costos no salariales del plantel
    profesional se suman a wages_squad, como ya hace Racing/Boca 2027/Banfield/Talleres) o
    player_amortisation/player_impairment/other_expenses según el concepto puntual (ver abajo).
  Deportes y Actividades Sociales → youth_other_sports_expense (gasto) / other_sports (ingreso).
  Jardín de Infantes y Escuela → education_expense (gasto) / education (ingreso).
  Generales → admin_general_expense (gasto) / other_income (ingreso, salvo Cuotas Sociales →
    member_dues, que también vive en Generales).
  Financieros y por Tenencia → SIEMPRE a netInterest, nunca revenueLine/expenseLine (Intereses,
    Diferencia de Cambio, Rendimiento Inversiones del lado de Ingresos; Intereses y Gastos
    Financieros, Diferencia de Cambio del lado de Gastos). "Cargas Fiscales" es la EXCEPCIÓN: pese
    a aparecer bajo la columna Financieros en el documento, es un impuesto (Impuesto a los
    Débitos/Créditos Bancarios), así que sigue la regla fija de club-data-mapping/referencia/casos-por-pais-y-formato.md
    ("Impuestos → SIEMPRE admin_general_expense") en vez del criterio de columna.

RECPAM (Resultado por Exposición al Cambio del Poder Adquisitivo de la Moneda): en el balance
2023 vivía DENTRO de Anexo IV (columna "Financieros y por Tenencia" de Ingresos); desde 2024 el
documento lo separó como línea propia bajo "Superávit (Déficit) No Operativo", junto con
Amortización/Depreciación. En los 3 años se sumó a netInterest (mismo criterio que RECPAM de
Racing/River/Vélez/Estudiantes LP/Rosario Central/Banfield — ver club-data-mapping sección 2 y el
comentario de cabecera de banfield-ar-data.js), NUNCA como revenueLine/expenseLine.

"Incremento Valor Jugadores FP" (2.900,943865 M en 2024; 2.051,113616 M en 2025): fila NUEVA que
no existía en el Anexo IV de 2023, sin sub-ítems ni nota que la explique. Por el nombre, podría
ser una revaluación/reconocimiento no-cash del valor de jugadores formados en el club (ver Nota
de "Jugadores formados en el Ente" del balance 2023, que capitaliza el costo de formación al
firmar el primer contrato profesional) — pero no hay forma de confirmarlo con lo que dice el
documento. Se cargó a `other_income` (no es `player_sales`: la línea de ventas reales ya existe
aparte, "Ventas Jugadores") y quedó anotada en Admin/dudas-por-club.md para preguntarle al club
qué es exactamente.

"Entradas, Palcos y Plateas" / "Ingresos Partidos - Entradas, Palcos y Plateas": el documento NO
separa recaudación por partido (matchday_competition) de abonos/plateas de temporada
(season_tickets) en esta fila — es una sola cifra combinada. A diferencia de la fila separada "3.-
Recursos por Venta de Abonos Estadio" de los PRESUPUESTOS (que SÍ es abono puro, cargada a
`season_tickets`), esta fila del BALANCE se cargó entera a `matchday_competition` (single figure,
sin forma de separar), documentado acá para que quede claro que no es un descarte sino una
limitación real del documento.

FX: los 3 balances declaran su Anexo de "Activos y Pasivos en Moneda Extranjera", pero con
VARIAS cotizaciones distintas por línea (USD banco oficial/BNA vendedor vs. USD MEP, más EUR),
no una única "TC de cierre". Se usó la cotización BNA (la que aplica a la mayoría de las líneas
de deuda en USD: Mutuos USD BNA, Acreedores Varios USD, Convenio Deuda Jugadores, Otras deudas
FP) como fx de cierre: 268,00 (30/6/2023), 932,50 (30/6/2024), 1.215,00 (30/6/2025) —
fxSource:'document_close' en los 3. Ver el reporte de la sesión para la lista completa de
cotizaciones que aparecen en cada Anexo (incluye MEP, que quedó SIN usar por ser una cotización
secundaria/informal, no la de la mayoría de las líneas).

Los 3 presupuestos (overlay 2024/2025 y standalone 2026) NO declaran ningún tipo de cambio propio
(son documentos puramente en pesos, sin Anexo de moneda extranjera ni mención de "tipo de cambio
de referencia" en ningún lado — se buscó explícito, ausente). CORREGIDO en la integración
centralizada (2026-09-23): la primera versión de este archivo reusaba el `fx` document_close del
BALANCE pareado para los 2 overlays, pero eso etiqueta mal la procedencia — `document_close`
significa específicamente "ESTE documento lo declara", y el presupuesto no declara nada. Un
documento que no declara TC y cuyo ejercicio ya cerró cae en la regla 1/2 de club-data-mapping/referencia/fx.md: cotización de mercado a la fecha de CIERRE del ejercicio, exactamente lo que
ya existía en FX_CLOSE (`ARS@2024-06-30`:909, `ARS@2025-06-30`:1203 — agregadas en la Versión 207
para otro club, reusables sin tocar nada). Los 2 overlays quedaron entonces `fxSource:
'market_close'` con esas referencias, NO 'document_close'. Para el standalone 2026 (sin balance
pareado del que tomar nada), se agregó `ARS@2026-06-30`:1482 a FX_CLOSE (dólar mayorista BCRA vía
Rava) en esta misma sesión.

TRANSCRIPCIÓN DE presupuesto-2024-2025.pdf: este PDF tiene capa de texto nativa pero con una
fuente subseteada sin tabla ToUnicode para los montos/meses (`pdffonts` confirma `uni:no` en
`NSTNKC+CIDFont+F2`), así que `pdftotext` devuelve Unicode incorrecto para esas celdas (rótulos de
fila SÍ se leen bien, están en otra fuente). Se resolvió renderizando las páginas 2 y 3 a imagen
(300dpi) y leyendo visualmente rótulo + columna "TOTAL PERÍODO" — ver la nota al principio de
Clubes/Argentina/Gimnasia y Esgrima LP/presupuesto-2024-2025.md para la tabla completa decodificada
y la cita de página exacta.

VERIFICACIÓN (node, ver script de la sesión): los 3 balances y los 3 presupuestos (2 overlays +
el standalone) cierran EXACTO (o con diferencia de $1 por redondeo) contra su propio Superávit/
Déficit o Resultado Económico impreso — revenue + expenses + netInterest = PAT en los 6 casos.

grossDebt: los 3 balances separan "Deudas" (Operativas/Fiscales/Sociales/Otras) de "Previsiones"
(una previsión por contingencias judiciales, no deuda financiera) como líneas de pasivo
DISTINTAS — se usó Total Pasivo MENOS Previsiones en los 3 años (mismo criterio que Boca/Vélez).

Gestión: Mariano Cowen, Presidente, confirmado en la Comisión Directiva impresa de los balances
2023-24 y 2024-25 y en la firma de los 2 presupuestos de esos mismos ejercicios. El Ejercicio
2022-23 (136°) NO se le atribuyó gestión (gestionId:null): el propio balance (Nota 10, Hechos
Posteriores) y el Informe de Auditoría (Fundamento de la opinión con salvedades) documentan que
la Comisión Directiva cambió A MEDIADOS de ese ejercicio — el Presidente saliente, Gabriel Rubén
Pellegrino, cedió los derechos de TV del club a sí mismo en un acuerdo de noviembre de 2022; la
"actual Comisión Directiva" (Cowen) ya estaba en funciones para diciembre de 2022, cuando pidió la
medida cautelar que revirtió esa cesión. Sin una fecha exacta de asunción, no hay forma de
asignar con confianza quién presidió la MAYOR parte del ejercicio jul-2022/jun-2023.

El balance 2022-23 tiene OPINIÓN CON SALVEDADES del auditor externo (ver
Clubes/Argentina/Gimnasia y Esgrima LP/informe-auditoria-2022-2023.md): salvedad por la cesión de
derechos de TV al ex-presidente y falta de documentación UIF, más párrafo de "incertidumbre
significativa relacionada con empresa en funcionamiento" (sin modificar la opinión). El club está
además en CONCURSO PREVENTIVO DE ACREEDORES desde 2017 (Nota 7 del balance 2022-23), vigente en
los 3 ejercicios cargados. Ninguna de las 2 cosas cambia cómo se cargaron los números (los estados
contables están igual certificados como razonables), pero se documenta acá porque explica varias
líneas puntuales (Previsión por Contingencias, Rescisión Contratos, Hechos Posteriores).

No se encontró una cifra de cantidad de socios en ninguno de los 9 documentos.
============================================================================
```

_de data/clubs.js:_

```text
Gimnasia y Esgrima (La Plata), club nuevo (sesión 2026-09-23, to-do 58): 3 balances reales +
presupuestos, 2 de ellos cargados como overlay de un ejercicio dual (ver
data/ar/gimnasiaesgrima-ar-data.js). `brandColor:null` (no ausente): camiseta blanca con banda
azul marino, el que lo identifica es el blanco — mismo bucket que River/Vélez/Sevilla/Real
Madrid/Valencia/Once Caldas, confirmado en.wikipedia.org.
```

_de data/club-leagues/ar.js:_

```text
Confirmado vía en.wikipedia.org ("2025 Club de Gimnasia y Esgrima La Plata season": 2025 fue su
11ma temporada consecutiva en Primera, sin descenso desde ~2015) — cubre los 4 ejercicios.
```

## 2026

### Ingresos

```text
Ejercicio 2025-2026 (139°, TODAVÍA SIN balance real), presupuesto-2025-2026.pdf (5 págs, texto
nativo, fuentes Arial/WinAnsi normales — sin el problema de codificación del presupuesto
2024-2025). Fuente PRIMARIA de este año (no hay balance al lado, ver comentario de cabecera).
```

_al final de las filas:_

```text
9.- Otros Recursos de Gestión por Fútbol, Recursos Financieros y Recursos Extraordinarios: $0.
```

### Gastos

```text
Ejercicio 2025-2026 (139°, TODAVÍA SIN balance real), presupuesto-2025-2026.pdf.
```

_al final de las filas:_

```text
6.- Costo de Venta de Jugadores y Gastos Extraordinarios: $0, no se cargan filas. Gastos
Financieros (-491,939500) va neto a netInterest, no es línea.
```

### Meta

```text
Presupuesto STANDALONE (Ejercicio 2025-2026, todavía sin balance real — ver comentario de
cabecera). El documento no declara tipo de cambio propio: dólar mayorista BCRA al 30/6/2026
(1.482, `ARS@2026-06-30` en FX_CLOSE, agregado en esta integración).
netInterest = Recursos Financieros (0) − Gastos Financieros (491,939500) = -491,939500.
Sin balance real todavía: no hay grossDebt/cash de este ejercicio.
officialPAT NO se carga (presupuesto puro, sin balance auditado — mismo criterio que Racing
2019/2026/2027, ver club-or-year-onboarding SKILL.md sección 3 punto 3).
```

## 2025

### Ingresos

```text
Ejercicio 138° (2024-25), balance-2024-2025.pdf (31 págs, texto nativo).
```

_al final de las filas:_

```text
Prestamos jugadores: $0 este ejercicio (no se carga fila en $0).
Intereses (64,068734), Diferencia de Cambio (4.119,615702) y Rendimiento Inversiones
(56,782596) del lado de Ingresos, más Intereses y Gastos Financieros (857,433660) y Diferencia
de Cambio (846,949226) del lado de Gastos, más "Resultado por Exposición al Cambio del Poder
Adquisitivo" (-499,920059, línea propia "No Operativo"): van netos a
fiscalYearMeta[2025].netInterest.
```

### Gastos

_al final de las filas:_

```text
Intereses y Gastos Financieros (-857,433660) y Diferencia de Cambio (-846,949226) NO se
cargan como líneas: van netos a fiscalYearMeta[2025].netInterest.
```

### Meta

```text
netInterest = Intereses (64,068734) + Diferencia de Cambio ingreso (4.119,615702) +
Rendimiento Inversiones (56,782596) − Intereses y Gastos Financieros (857,433660) − Diferencia
de Cambio gasto (846,949226) − Resultado por Exposición al Cambio del Poder Adquisitivo
(-499,920059, línea propia "No Operativo") = 2.036,164087.
```

### Presupuesto al lado del balance

```text
Ejercicio 2024-2025 (aprobado en la asamblea del 137°/2023-24): presupuesto-2024-2025.pdf,
4 págs, texto nativo con fuente rota para montos/meses (ver comentario de cabecera y la nota de
transcripción en el .md) — valores tomados de la lectura visual de la columna Total Período.
```

_dentro de revenueLines:_

```text
Recursos por Préstamo de Jugadores, Recursos Financieros y Recursos Extraordinarios: $0.
```

_dentro de expenseLines:_

```text
Gastos Financieros: línea normal, mismo motivo documentado en el overlay 2024 arriba (el
overlay no tiene su propio netInterest/extraRows).
Costo de Venta de Jugadores, Gastos por Préstamos de Jugadores Recibidos y Gastos
Extraordinarios: $0, no se cargan filas.
```

## 2024

### Ingresos

```text
Ejercicio 137° (2023-24), balance-2023-2024.pdf (30 págs, texto nativo).
```

_al final de las filas:_

```text
Diferencia de Cambio (10.971,407854) y Rendimiento Inversiones (368,203928) del lado de
Ingresos, más Intereses y Gastos Financieros (474,167767) y Diferencia de Cambio
(5.033,858016) del lado de Gastos, más RECPAM (-2.543,491374, ya separado como línea propia
"No Operativo" por el propio documento este año): van netos a fiscalYearMeta[2024].netInterest.
```

### Gastos

_al final de las filas:_

```text
Costo Cesión Der. Federativos: $0 este ejercicio (no se carga fila en $0).
Intereses y Gastos Financieros (-474,167767) y Diferencia de Cambio (-5.033,858016) NO se
cargan como líneas: van netos a fiscalYearMeta[2024].netInterest.
```

### Meta

```text
netInterest = Diferencia de Cambio ingreso (10.971,407854) + Rendimiento Inversiones
(368,203928) − Intereses y Gastos Financieros (474,167767) − Diferencia de Cambio gasto
(5.033,858016) − RECPAM (-2.543,491374, línea propia "No Operativo") = 3.288,094625.
```

### Presupuesto al lado del balance

```text
Ejercicio 2023-2024 (aprobado en la asamblea del 136°/2022-23): presupuesto-2023-2024.pdf,
3 págs, texto nativo, desglose mensual jul-23 a jun-24 + columna Total Período.
```

_dentro de revenueLines:_

```text
Recursos Financieros: a diferencia del BALANCE (donde este concepto va a netInterest, ver
club-data-mapping sección 2), en el OVERLAY se carga como línea normal — el overlay no
tiene su propio mecanismo de netInterest/extraRows (`presupuestoOverlayReportFor()`,
js/finanzas-calc.js: "el overlay no tiene su propio concepto de extraRows separado"), así
que excluirlo dejaría el Resultado Neto de la columna Presupuesto sin cerrar contra el
Resultado Económico impreso (mismo criterio ya usado en racingPresupuestoOverlayByYear
[2020], "Cobros por venta de inversiones financieras" -> other_income).
Recursos por Préstamo de Jugadores y Recursos Extraordinarios: $0, no se cargan filas.
```

_dentro de expenseLines:_

```text
Gastos Financieros: línea normal por el mismo motivo que Recursos Financieros arriba
(mismo criterio que racingPresupuestoOverlayByYear[2020], "Pago de gastos financieros" ->
admin_general_expense).
Gastos Extraordinarios: $0, no se carga fila.
```

## 2023

### Ingresos

```text
Ejercicio 136° (2022-23), balance-general-2022-2023.pdf (28 págs, texto nativo).
```

_al final de las filas:_

```text
Intereses (37,543387), Diferencia de Cambio (19,989227), Rendimiento Inversiones (20,221026) y
RECPAM (1.556,386009) NO se cargan como líneas: van netos a fiscalYearMeta[2023].netInterest.
```

### Gastos

_antes de la fila 21 (`Amortización Activos Intangibles (Anexo I, derechos federativos)`):_

```text
Líneas propias fuera de "Gastos Ordinarios" (Estado de Recursos y Gastos, sección "No Operativo"):
```

_al final de las filas:_

```text
Intereses y Gastos Financieros (-215,830989) y Diferencia de Cambio (-2.033,296300) NO se
cargan como líneas: van netos a fiscalYearMeta[2023].netInterest.
```

### Meta

```text
netInterest = Intereses (37,543387) + Diferencia de Cambio ingreso (19,989227) + Rendimiento
Inversiones (20,221026) + RECPAM (1.556,386009) − Intereses y Gastos Financieros (215,830989)
− Diferencia de Cambio gasto (2.033,296300) = -614,987640.
grossDebt = Total Pasivo (4.279,850248) − Previsiones (314,280088, Anexo III, no es deuda
financiera). cash = Caja y Bancos (Nota 3.1).
```

## Fuentes

### gimnasiaesgrima-ar-balance-2022-2023

_note (data/):_

```text
PDF oficial (28 páginas, texto nativo), publicado junto a la convocatoria a Asamblea General Ordinaria en gimnasia.org.ar (CDN de plataforma de mailing, myperfit.net). Informe de Auditoría con OPINIÓN CON SALVEDADES (cesión de derechos de TV al ex-presidente Gabriel Pellegrino sin documentación UIF; párrafo de incertidumbre por empresa en funcionamiento, sin modificar la opinión) — ver informe-auditoria-2022-2023.md. Club en concurso preventivo de acreedores desde 2017 (vigente). Comisión Directiva cambió a mediados de este ejercicio (Pellegrino → Cowen, nov/dic 2022): sin gestión asignada por esa ambigüedad. Tipo de cambio: no declara un único TC de cierre, sino varias cotizaciones por línea en su Anexo VI (USD BNA 268, USD MEP 484,69, EUR 291) — se usó 268 (BNA, la que aplica a la mayoría de la deuda en USD). Superávit/Déficit del Ejercicio real: -$750.171.524 ARS (déficit).
```

### gimnasiaesgrima-ar-balance-2023-2024

_note (data/):_

```text
PDF oficial (30 páginas, texto nativo), publicado junto a la convocatoria a Asamblea General Ordinaria en gimnasia.org.ar/wp-content. Ejercicio dual: convive con gimnasiaesgrima-ar-presupuesto-2023-2024 (el presupuesto aprobado para ESTE mismo ejercicio, en la asamblea del 136° anterior), cargado como columna "Presupuesto" de comparación. Tipo de cambio de cierre declarado en Anexo VI: 932,50 (BNA, la cotización de la mayoría de la deuda en USD; MEP declaraba 1.347,96 ese mismo cierre, no usado). Superávit del Ejercicio real: $4.066.580.234 ARS.
```

### gimnasiaesgrima-ar-balance-2024-2025

_note (data/):_

```text
PDF oficial (31 páginas, texto nativo), publicado junto a la convocatoria a Asamblea General Ordinaria en gimnasia.org.ar/wp-content. Ejercicio dual: convive con gimnasiaesgrima-ar-presupuesto-2024-2025 (el presupuesto aprobado para ESTE mismo ejercicio, en la asamblea del 137° anterior), cargado como columna "Presupuesto" de comparación. Tipo de cambio de cierre declarado en Anexo V: 1.215,00 (BNA; MEP declaraba 1.211,10 ese mismo cierre, prácticamente convergidas). Superávit del Ejercicio real: $4.022.179.754 ARS.
```

### gimnasiaesgrima-ar-presupuesto-2023-2024

_note (data/):_

```text
PDF oficial (3 páginas, texto nativo), aprobado en la Asamblea General Ordinaria del 136° Ejercicio (2022-23), publicado junto a ese balance. Desglose mensual jul-23 a jun-24 + columna Total Período. No declara tipo de cambio propio (documento puramente en pesos): la columna "Presupuesto" de Estado de resultados usa la cotización de mercado de FX_CLOSE al 30/6/2024 (909, market_close), no el TC declarado por el balance real de este mismo ejercicio. Resultado Económico del Período presupuestado: $2.884.015.397 ARS.
```

### gimnasiaesgrima-ar-presupuesto-2024-2025

_note (data/):_

```text
PDF oficial (4 páginas), aprobado en la Asamblea General Ordinaria del 137° Ejercicio (2023-24), publicado junto a ese balance. Capa de texto nativa pero con una fuente subseteada sin ToUnicode para montos/meses (pdftotext devuelve Unicode incorrecto en esas celdas, rótulos de fila sí se leen bien) — valores extraídos leyendo visualmente la página renderizada, ver nota al principio del .md transcripto. No declara tipo de cambio propio: la columna "Presupuesto" usa la cotización de mercado de FX_CLOSE al 30/6/2025 (1.203, market_close), no el TC declarado por el balance real de este mismo ejercicio. Resultado Económico del Período presupuestado: $4.168.479.311 ARS.
```

### gimnasiaesgrima-ar-presupuesto-2025-2026

_note (data/):_

```text
PDF oficial (5 páginas, texto nativo), aprobado en la Asamblea General Ordinaria del 138° Ejercicio (2024-25), publicado junto a ese balance. Ejercicio 2025-2026 TODAVÍA SIN balance real (es el más reciente, cerró 30/6/2026 pero el club no publicó su balance auditado todavía) — este presupuesto es la fuente PRIMARIA de este año, no un overlay. No declara tipo de cambio propio: cotización de mercado FX_CLOSE al 30/6/2026 (1.482, dólar mayorista BCRA vía Rava, market_close). Resultado Económico del Período presupuestado: $823.433.973 ARS.
```

## Otros

### Presupuesto al lado del balance (gimnasiaesgrimaArPresupuestoOverlayByYear), en general

```text
gimnasiaesgrimaArPresupuestoOverlayByYear (ver club-or-year-onboarding SKILL.md sección 11): para
los 2 ejercicios duales (2024/2025), el presupuesto de ESE MISMO ejercicio, usado solo para la
columna "Presupuesto" de "Estado de resultados". fx: el presupuesto no declara TC propio, así que
usa la cotización de mercado de FX_CLOSE a la fecha de cierre de ESE ejercicio (`market_close`,
no `document_close` — ver comentario de cabecera), NO el TC declarado por el balance pareado.
```

### Supuestos del presupuesto (gimnasiaesgrimaArPresupuestoSupuestosByYear), en general

```text
Los presupuestos de Gimnasia son tablas de rubros con desglose mensual, sin premisas
macroeconómicas en prosa ni un waterfall de caja separado (Saldo Inicial+Ingresos-Egresos=Saldo
Final aparte del cuerpo Recursos/Gastos) — no tienen el contenido narrativo que sí tienen los
presupuestos de Racing/Boca. Igual que Newell's/Banfield/Talleres, se dejan vacíos.
```

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub['gimnasiaesgrima-ar']

```text
Mariano Cowen, Presidente, confirmado en la Comisión Directiva impresa de los balances 2023-24
y 2024-25, y firmante de los presupuestos 2024-25 y 2025-26. Ejercicio 2022-23 (136°) queda
afuera a propósito: la Comisión Directiva cambió a mediados de ese ejercicio (ver comentario de
cabecera), sin fecha exacta de asunción no hay forma de atribuir con confianza quién presidió la
mayor parte del año.
```

### memberCountByClub['gimnasiaesgrima-ar']

```text
no se encontró una cifra de socios en ningún documento
```
