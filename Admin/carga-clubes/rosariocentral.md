# rosariocentral — evidencia de carga

Lo que había como comentario en `data/rosariocentral-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/rosariocentral-data.js — Club Atlético Rosario Central: 6to club del motor genérico. Dos
ejercicios cargados: 2022/2023 (1°/7/2022 al 30/6/2023) y 2024/2025 (1°/7/2024 al 30/6/2025, ver
comentario propio más abajo), ambos balances auditados reales (Grant Thornton / Adler, Hasenclever
y Asociados S.R.L.), ambos texto nativo. PDF + transcripción en
Clubes/Argentina/Rosario Central/estados-contables-2022-2023.{pdf,md} y
estados-contables-2024-2025.{pdf,md}. Falta el ejercicio 2023/2024 (ver fuentes/Argentina/Rosario
Central.md).

Estructura del documento (Anexo V "Recursos" / Anexo VI "Gastos"): cada rubro tiene una fila
propia con un desglose por DEPARTAMENTO (Fútbol Profesional/Estadio/Ciudad Deportiva/Cruce
Alberdi/Otras Disciplinas/Subsedes/Tiendas/Administración/Comisión Directiva/Socios/Judiciales/
Guardería Náutica/Arroyo Seco) — mucho más granular que el Anexo III de Vélez/Instituto (19 filas
x 8 columnas en Recursos, 38 filas x 13 columnas en Gastos). Para las 3 filas de personal (Sueldos,
Cargas sociales, Primas) se aplicó el mismo criterio de columna-por-sector (Fútbol Profesional ->
wages_squad, resto de columnas -> youth_other_sports_expense) que Vélez/Instituto. El resto de las
~35 filas (sin desglose salarial) se cargó con su propia columna Total, categorizada por la
naturaleza del rubro (ver comentario en cada línea abajo), sin partir por departamento.

VERIFICACIÓN QUE ENCONTRÓ Y CORRIGIÓ UN ERROR DE LECTURA: la suma de los 38 rubros de Gastos
(Anexo VI) contra el "Total gastos ordinarios" impreso ($11.600.201.350) dio una diferencia de
$201.178.171 en el primer intento — la fila "Préstamos" se había leído con Total=$418.582.883,
mientras que su columna Fútbol Profesional (única columna con valor) daba $619.761.055. Usando
$619.761.055 como Total de esa fila, la suma cierra exacta (diferencia de $1, redondeo). El
`pdftotext -layout` desalinea columnas en tablas muy anchas con salto de línea — la fila entera es
Fútbol Profesional, ninguna otra columna tiene valor. Ver club-data-mapping/SKILL.md sección 6
para el criterio general ("si no cierra, buscar qué explica la diferencia antes de asumir nada").

grossDebt: excluye "Previsiones" (Anexo III, contingencia por juicios, no deuda financiera real) —
mismo criterio que Boca/Vélez/Instituto: Total del Pasivo (5.166,386522) - Previsiones
(1.037,827336) = 4.128,559186 M.

DUDA ABIERTA (ver Admin/dudas-por-club.md): el Anexo IV (moneda extranjera) declara DOS cotizaciones de
USD distintas en el MISMO balance — $255,00 del lado del Activo (Caja y bancos) y $268,00 del lado
del Pasivo (Acreedores varios fútbol). Se usó $255,00 (la que corresponde a "Caja y bancos", el
campo que alimenta `cash`) como fx único del sitio, pero es una aproximación — el club claramente
usa "comprador"/"vendedor" distinto según el rubro, y el sitio solo modela un fx por ejercicio.

Gestión: Gonzalo Belloso asumió el 18/12/2022, a mitad de este ejercicio (1°/7/2022-30/6/2023) —
se cargó bajo su gestión completa, mismo criterio que Berlanga/Rapisarda en Vélez (el ejercicio
donde asume a mitad de año cae bajo la gestión nueva).
============================================================================
============================================================================
EJERCICIO 2024/2025 (1°/7/2024 al 30/6/2025), agregado en sesión posterior. Balance auditado real
(Grant Thornton / Adler, Hasenclever & Asociados S.R.L., informe 13/10/2025). PDF + transcripción en
Clubes/Argentina/Rosario Central/estados-contables-2024-2025.{pdf,md} (41 págs, TEXTO NATIVO —
la nota vieja de fuentes/Argentina/Rosario Central.md que decía "escaneo sin capa de texto" estaba
mal, corregida).

Estructura del documento (Anexo V "Recursos" / Anexo VI "Gastos"): esta vez agrupa en SOLO 6
departamentos (Fútbol Profesional/Institucional/Fútbol Amateur ["Inferiores"]/Deportes ["Deporte
Amateur"]/Tiendas/Guardería Náutica) — mucho MENOS granular que el Anexo V/VI del ejercicio 2022-23
(que tenía 12+ columnas de departamento). Igual que en 2022-23, para las filas de personal
("Sueldos y cargas sociales") se aplicó columna-por-sector: Fútbol Profesional -> wages_squad, resto
de columnas -> youth_other_sports_expense. "Primas" solo tenía valor en la columna Fútbol
Profesional (el documento no desglosó primas por otro departamento este año), así que fue íntegro a
wages_squad. Mismo criterio nuevo aplicado a INGRESOS: la fila "Ingresos por cuotas" mezclaba en una
sola fila Institucional (cuotas sociales genuinas, 17.861,005014 M) + Deporte Amateur (504,929437 M)
+ Guardería Náutica (602,898123 M) — se separó en 3 líneas por columna-por-sector, mismo criterio
que ya usa el ejercicio 2023 para "Abonos guardería náutica" (other_sports, no member_dues): la
columna Institucional -> member_dues, las otras 2 (secciones recreativas, no fútbol) -> other_sports.
El resto de filas (Recursos y Gastos) se cargó con su Total impreso, sin desglose por departamento,
mismo criterio que usó 2022-23 para sus ~35 filas sin desglose salarial (el desglose de departamento
no cambia la normalizedCategory de esas filas, así que perderlo en `items` no pierde información
relevante para el motor genérico — la fila del PDF sigue citable 1:1 vía la transcripción .md).

CATEGORÍAS SIN HOGAR CLARO EN category-map.js HOY (se dejaron en other_income/other_expenses,
catch-all, sin tocar category-map.js — ver nota en la sesión que agregó este ejercicio):
- "Ingresos por ventas tiendas" (3.880,592172 M) y su costo "Costo de mercadería vendida"
  (2.673,789474 M): venta minorista de indumentaria/merchandising del club. No hay
  `merchandise_sales`/`cost_of_goods_sold` en category-map.js, candidatas a agregar si más clubes
  reportan una tienda con este volumen.
- "Ingresos fútbol profesional" (2.732,084479 M): línea genérica sin más desglose en el documento
  (a diferencia de TV/entradas/sponsors, que sí tienen su propia fila), fue a other_income.
- "Gastos de fútbol profesional" (5.308,772334 M): mismo caso del lado de gastos, catch-all sin más
  detalle en el documento, fue a other_expenses (NO a lump_football_operations_expense: esa
  categoría es para cuando el departamento ENTERO no se desglosa, acá sí hay decenas de otras filas
  de fútbol profesional desglosadas, esta es solo una línea residual del propio documento).
- "Gastos bancarios y financieros" (889,618876 M) y "Gastos por comisiones pagadas"/"Gastos gestión
  de socios"/"Gastos sistemas informáticos"/"Tasas e impuestos": a admin_general_expense (gastos de
  funcionamiento administrativo, NO confundir con `netInterest` — el resultado financiero real del
  ejercicio, RECPAM incluido, ya está separado como línea propia "RESULTADOS FINANCIEROS Y POR
  TENENCIA NETOS" en el Estado de Recursos y Gastos, y se cargó en fiscalYearMeta.netInterest, no
  acá).
- "Quebranto por cuotas" (2.187,552982 M, incobrabilidad de cuotas sociales) y "Quebrantos por
  previsión" (1.292,418614 M, aumento de la previsión para juicios del Anexo III — mismo concepto
  que "Juicios (aumento de previsión)" del ejercicio 2023): ambos a other_expenses.

VERIFICACIÓN: revenueLines suma exacto contra "Total recursos ordinarios" impreso
(45.989,403491 M). expenseLines suma 58.497,629214 M contra "Total gastos ordinarios" impreso de
58.497,629215 M (diferencia de $1, redondeo del propio documento). revenue+expenses = -12.508,225723
M contra "(DÉFICIT) OPERATIVO" impreso de -12.508,225724 M (diferencia de $1, mismo redondeo).
+netInterest(-901,781813) = -13.410,007536 M, exacto contra "(DÉFICIT) DEL EJERCICIO" impreso
($(13.410.007.536)).

fx: Anexo IV declara USD 1.165,00 del lado ACTIVO (Caja/Bancos/Deudores por fútbol, las 3 líneas en
USD del activo corriente usan ese mismo valor) y USD 1.215,00 del lado PASIVO (Convenios y
Acreedores por fútbol, corriente y no corriente). Se usó 1.165,00 (lado Activo/Créditos), mismo
criterio ya establecido para Unión/Newell's. A diferencia del ejercicio 2022-23 (que tenía una duda
abierta real por diferencia entre "Caja y bancos" vs. "Acreedores varios fútbol"), acá el lado Activo
es un valor ÚNICO y consistente en sus 3 líneas, sin ambigüedad adicional.

grossDebt: Total del Pasivo (38.552,024890) - Previsiones no corrientes/Anexo III (4.591,676771,
contingencia por juicios, no deuda financiera real) = 33.960,348119 M. cash = Caja y bancos
(271,773022 M, nota 4.a).

assetSales: la fila "OTROS INGRESOS" del Estado de Recursos y Gastos (separada del cuerpo de
Recursos Ordinarios, junto a "RESULTADOS FINANCIEROS...") vale $0 para el ejercicio 2025 (sí tenía
$1.462.872.561 en la columna comparativa 2024, no se usa: ver regla de columna comparativa en
club-data-mapping sección 6.5). Se dejó assetSales:0 para este ejercicio.
============================================================================
```

## 2025

### Ingresos

_antes de la fila 7 (`Ingresos por cuotas (Institucional)`):_

```text
"Ingresos por cuotas" del documento venía en 1 sola fila con 3 columnas de departamento —
separado por columna-por-sector (ver comentario de cabecera): Institucional = cuotas sociales
genuinas, Deporte Amateur/Guardería Náutica = abonos de secciones recreativas (mismo criterio
que "Abonos guardería náutica" del ejercicio 2023).
```

_antes de la fila 13 (`Ingresos por ventas tiendas`):_

```text
Sin categoría propia en category-map.js hoy (ver comentario de cabecera) — venta minorista de
indumentaria/merchandising del club.
```

### Gastos

_antes de la fila 5 (`Costo de mercadería vendida`):_

```text
Sin categoría propia en category-map.js hoy (ver comentario de cabecera) — costo de la
mercadería vendida en tiendas del club.
```

_antes de la fila 6 (`Gastos bancarios y financieros`):_

```text
"Diferencia de inventario": $0 en el ejercicio 2025 (tenía $7.235.909 en la comparativa 2024),
omitida por no tener valor en el año corriente.
```

_antes de la fila 8 (`Gastos de fútbol profesional`):_

```text
Línea residual del propio documento (catch-all sin más desglose) — NO es
lump_football_operations_expense: el departamento Fútbol Profesional SÍ está desglosado en
decenas de otras filas de este mismo Anexo VI, esta es solo una línea más entre ellas.
```

_antes de la fila 21 (`Primas (Fútbol Profesional)`):_

```text
"Primas" solo tenía valor en la columna Fútbol Profesional este año (a diferencia de 2023, que
también tenía "Primas (Otras Disciplinas)").
```

_antes de la fila 23 (`Quebrantos por previsión`):_

```text
Aumento de la previsión para juicios (Anexo III) — mismo concepto que "Juicios (aumento de
previsión)" del ejercicio 2023.
```

_antes de la fila 26 (`Sueldos y cargas sociales (Fútbol Profesional)`):_

```text
Anexo VI, fila "Sueldos y cargas sociales" — columna-por-sector (Fútbol Profesional ->
wages_squad, resto de columnas -> youth_other_sports_expense), mismo criterio que 2023.
```

### Meta

```text
Anexo IV: USD 1.165,00 lado Activo (Caja/Bancos/Deudores por fútbol, valor único y consistente
en las 3 líneas), USD 1.215,00 lado Pasivo (Convenios/Acreedores). Se usó el lado Activo/
Créditos, mismo criterio que Unión/Newell's — ver comentario de cabecera.
grossDebt = Total del Pasivo (38.552,024890) - Previsiones/Anexo III (4.591,676771,
contingencia por juicios, no deuda financiera real). cash = Caja y bancos.
netInterest = "Resultados financieros y por tenencia, netos, incluyendo RECPAM" (línea separada
del cuerpo de Recursos/Gastos Ordinarios en el Estado de Recursos y Gastos).
officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
ordinarios" impresos (pág. 6/Anexos V-VI). DÉFICIT DEL EJERCICIO real: $(13.410.007.536) ARS.
```

## 2023

### Gastos

_antes de la fila 1 (`Sueldos (Fútbol Profesional)`):_

```text
Anexo VI, 3 filas de personal separadas por columna de sector (Fútbol Profesional -> wages_squad,
resto de columnas -> youth_other_sports_expense), mismo criterio que Vélez/Instituto.
```

_antes de la fila 7 (`Costo por transferencias y bajas de derechos`):_

```text
Resto de Anexo VI, sin desglose salarial — su propia columna Total, por naturaleza del rubro.
```

_antes de la fila 10 (`Préstamos (de jugadores)`):_

```text
Corregido: Total real de esta fila es la columna Fútbol Profesional ($619.761.055), no el
$418.582.883 que el layout de pdftotext desalineó — ver comentario de cabecera.
```

_antes de la fila 41 (`Juicios (aumento de previsión)`):_

```text
Aumento de la previsión por juicios (Anexo III), mayormente en Fútbol Profesional — ordinario
según el propio Estado de Recursos y Gastos (no está en una sección de extraordinarios aparte).
```

### Meta

```text
Ver DUDA ABIERTA en el comentario de cabecera: el balance declara $255 (Activo) y $268
(Pasivo) para USD en el mismo Anexo IV. Se usó $255 (coherente con `cash`, que sale de "Caja
y bancos").
grossDebt = Total del Pasivo (5.166,386522) - Previsiones/Anexo III (1.037,827336, contingencia
por juicios, no deuda financiera real). cash = Caja y bancos.
netInterest = "Resultados financieros y por tenencia, netos, incluyendo RECPAM".
officialTotalRevenue/officialTotalExpenses = "Total recursos ordinarios"/"Total gastos
ordinarios" impresos (pág. 6). DÉFICIT DEL EJERCICIO real: $(3.107.221.597) ARS.
```

## Gestiones

_antes de Gonzalo Belloso (data/gestiones/ar.js):_

```text
Belloso: proclamado en la elección del 18/12/2022; no hay una fecha de traspaso aparte, se usa la de la proclamación.
```

## Fuentes

### rosariocentral-estados-contables-2022-23

_note (data/):_

```text
PDF oficial (43 páginas, texto nativo), auditado por Adler, Hasenclever y Asociados S.R.L. (Grant Thornton), informe de fecha 11/10/2023. DÉFICIT real del ejercicio: $(3.107.221.597) ARS. El Anexo IV (moneda extranjera) declara DOS cotizaciones de USD distintas en el mismo balance ($255 lado Activo, $268 lado Pasivo) — se usó $255 (coherente con "Caja y bancos"), ver duda abierta en Admin/dudas-por-club.md. Se corrigió una diferencia de $201.178.171 al verificar la suma de Gastos contra el total impreso: la fila "Préstamos" del Anexo VI se había leído con el valor equivocado por desalineación de columnas de pdftotext en una tabla muy ancha — ver comentario completo en data/rosariocentral-data.js.
```

### rosariocentral-estados-contables-2024-25

_note (data/):_

```text
PDF oficial (41 páginas, TEXTO NATIVO — a pesar de que la nota de sourcing decía "escaneo", se verificó con pdftotext -layout y tiene texto extraíble completo), auditado por Adler, Hasenclever & Asociados S.R.L. (Grant Thornton), informe de fecha 13/10/2025, Ejercicio Económico N° 136. DÉFICIT real del ejercicio: $(13.410.007.536) ARS. El Anexo IV declara USD 1.165,00 lado Activo (Caja/Bancos/Deudores por fútbol) y USD 1.215,00 lado Pasivo (Acreedores) — se usó 1.165 (lado Activo/Créditos). "Ingresos por cuotas" y "Sueldos y cargas sociales" se separaron por columna-por-sector (Institucional/Fútbol Profesional vs. resto de departamentos) — ver comentario completo en data/rosariocentral-data.js.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub.rosariocentral

```text
Confirmado por búsqueda (Versión 95) y reconfirmado en el propio documento del ejercicio
2024/2025 (pág. 3, "Composición de la Comisión Directiva... al 30 de junio de 2025", Presidente:
Sr. Belloso Gonzalo Luis): Gonzalo Belloso asumió el 18/12/2022 y sigue en el cargo al cierre de
este ejercicio.
```

### memberCountByClub.rosariocentral

```text
"más de 96.000 socios" (sitio oficial vía cobertura de prensa, 2025-26)
```
