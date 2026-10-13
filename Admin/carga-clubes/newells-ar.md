# newells-ar — evidencia de carga

Lo que había como comentario en `data/newells-ar-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/newells-ar-data.js — Club Atlético Newell's Old Boys: club nuevo del motor genérico
(clubId con sufijo de país, `newells-ar`, ver CLAUDE.md/convención de la Versión 129: los ids
nuevos llevan el país al final). 1 ejercicio cargado: 2019 (Ejercicio 1°/7/2018 al 30/6/2019).
PDF + transcripción en
Clubes/Argentina/Newells Old Boys/memoria-y-balance-2018-2019.{pdf,md} (98 páginas, capa de
texto NATIVA — sin OCR, confirmado con pdftotext antes de transcribir). Ver
fuentes/Argentina/Newells Old Boys.md para cómo se encontró el PDF (recuperado de Wayback
Machine, la URL oficial viva devuelve 404 hoy).

El segundo PDF de la carpeta (resumen-anual-actividades-2012-2013.pdf) es narrativo, sin
estados contables — NO es fuente de esta carga, ya revisado en la sesión de sourcing.

ESTRUCTURA DEL DOCUMENTO (balance auditado real, "Memoria y Balance General"): Estado de
Situación Patrimonial + Estado de Recursos y Gastos + Estado de Evolución del Patrimonio Neto +
notas + Anexos I-VIII. El Estado de Recursos y Gastos separa RECURSOS/GASTOS ORDINARIOS de un
resultado EXTRAORDINARIO (Nota 13) — a diferencia del caso de San Lorenzo (club-data-mapping/referencia/casos-por-pais-y-formato.md, un PRESUPUESTO de caja donde la sección extraordinaria es financiamiento y
se descarta), este es un BALANCE con devengado real en las dos secciones, así que ambas suman
directo al resultado final: Superávit Ordinario 205.980.660 + Superávit Extraordinario 2.982.903
= Superávit Final 208.963.563 (los 3 números impresos tal cual en el documento, pág. 2 del PDF /
"--- pág. 2 ---" del .md). CONFIRMADO SUPERÁVIT (no déficit): los 3 montos se imprimen positivos,
sin paréntesis ni signo negativo, a diferencia de los renglones de gasto (que sí llevan
paréntesis, ej. "Total Gastos Ordinarios (644.592.060)").

LA EXTRAORDINARIA (Nota 13, pág. 15) es "Donaciones" $2.982.903 — un ingreso real, no
financiamiento ni venta de activos, así que se cargó como una revenueLine más
(normalizedCategory:'other_income', rawLabel con la cita a la Nota 13), no como un meta field
aparte: no hay un campo de fiscalYearMeta que le calce mejor (no es profitOnPlayerSales, no es
assetSales, no es netInterest) y así el propio `computed.revenue` de computeYearGeneric() queda
trazable 1:1 contra la suma de revenueLines. officialTotalRevenue = 772.154677 (Total Recursos
Ordinarios, impreso) + 2.982903 (Donaciones) = 775.137580. La "Recupero de gastos" extraordinaria
que menciona la Nota 13 aparece sin monto (implícitamente $0), no se cargó nada por ella.

RECURSOS (Anexo V "Recursos para Fines Generales" + Anexo VI "Recursos para Fines Específicos",
págs. 24-25 del .md): Anexo V mezcla cuotas sociales con el negocio no futbolístico del club
(pileta/natación, básquet, hockey, futsal → other_sports; CIENOB, el colegio del club, "Complejo
Educativo Newell's Old Boys" → education; alquiler del estadio cubierto y "El Coloso" —apodo del
estadio Marcelo Bielsa— fuera del partido → stadium_other, CRITERIO CONSERVADOR de
club-data-mapping sección 1 porque el rótulo nombra el estadio explícito). Anexo VI separa
Fútbol Profesional (transferencias, TV, sponsors, entradas) de Fútbol Amateur ("Escuela de
fútbol" → youth_football). "Cuotas socios fútbol y abonos plateas" es una línea MIXTA (cuota +
abono, no separable en el documento) — se cargó a season_tickets siguiendo el mismo criterio que
ya usó Unión para su línea igual de mixta ("Contribuciones de socios, ventas de palcos y
plateas"). "Recupero por Dto. 1212/03" (Nota 22, pág. 18): NO es sponsor ni TV, es una ganancia
contable por el mecanismo AFA de retención/percepción del 6,5% sobre entradas/transferencias/TV
que sustituye el aporte a la seguridad social — se cargó a other_income (técnico, no operativo
real). "Concesiones" y "Derechos de fútbol" (dentro de Fútbol Profesional) son demasiado
genéricos para asignarles una categoría propia con confianza — other_income, ver
Admin/dudas-por-club.md.

GASTOS (Anexo VII "Gastos Generales de Administración", pág. 26, TODO admin_general_expense; y
Anexo VIII "Gastos Específico de Sectores", pág. 27, con columnas Fútbol/Otros por rubro —
mismo patrón de "2do eje" que ya usó Vélez, club-data-mapping/referencia/formato-simplificado.md). Columna Fútbol:
remuneraciones + cargas sociales del plantel profesional → wages_squad; "Estadía, concentración y
otros" (viajes/concentración del plantel) → wages_squad, mismo criterio que Racing para costos NO
salariales del plantel (club-data-mapping/referencia/formato-simplificado.md); "Gastos Edificio Jorge Griffa" → wages_squad
TAMBIÉN: la Memoria narrativa (pág. 1 y varias más del .md) confirma que "edificio Griffa" es el
HOTEL/centro de entrenamiento del PLANTEL PROFESIONAL donado por Marcelo Bielsa, no la academia
juvenil (a pesar del nombre "Griffa", asociado también a las inferiores) — se verificó el uso
exacto en el propio texto antes de categorizar. "Costo de bajas plantel" y "Préstamos y
transferencias" → player_amortisation (costo de bajas/altas de jugadores, mismo criterio que
"Costo transferencia de jugadores" de Racing). "Complejo Ricardone" → youth_other_sports_expense,
SIN confirmar con certeza qué actividad aloja (la Memoria solo menciona la escrituración del
predio, no su uso) — duda anotada en Admin/dudas-por-club.md, monto chico ($2,65M sobre $644,6M
de gastos totales, 0,4%). Columna Otros: pileta/hockey/básquet/futsal/otras
secciones/implementos/estadio cubierto → youth_other_sports_expense; CIENOB → education_expense;
"Gastos seguridad y control" (columna Otros, no Fútbol → se interpreta como seguridad general de
sede, no de partidos) → admin_general_expense; "Gastos tienda" → other_expenses (contrapartida de
"Resultado vta. Mercadería oficial" del lado de ingresos). Amortización de Bienes de Uso (Anexo
III) → depreciation; Amortización de Activos Intangibles (Anexo II, los pases de jugadores
capitalizados) → player_amortisation.

TIPO DE CAMBIO: el Anexo I ("Activos y Pasivos en Moneda Extranjera", pág. 19) declara SU PROPIO
TC de cierre al 30/06/2019, `fxSource:'document_close'` (regla #0 de club-data-mapping/referencia/fx.md).
El documento usa DOS tasas de USD distintas según el lado del balance: 41,50 (comprador, para los
Créditos/Activos en USD, ej. "Deudores por transferencia jugadores") y 43,50 (vendedor, para las
Deudas/Pasivos en USD) — el mismo spread comprador/vendedor que ya documentó Unión
(data/union-data.js) para su propio Anexo de moneda extranjera. Se usó el lado ACTIVO/CRÉDITO
(comprador, 41,50), mismo criterio ya establecido para Unión ("Anexo V, lado Activo/Créditos").
NO se usó el fxRef ARS@2019-06-30 de currency-map.js (42,45, cotización de mercado): el documento
declara el suyo propio, que gana siempre sobre una cotización externa.

grossDebt: el Estado de Situación Patrimonial (pág. 1-2 del .md) separa "Deudas" de
"Remuneraciones y Cargas Sociales", "Deudas Fiscales", "Ingresos cobrados por anticipado" y
"Deudas Judiciales" como líneas de pasivo DISTINTAS — se usó la línea angosta "Deudas"
(corriente + no corriente), excluyendo "Deudas Judiciales" (litigios, análogo a una Previsión,
no deuda financiera) e "Ingresos cobrados por anticipado" (no es deuda), mismo criterio que Boca/
Vélez/Unión. cash = "Caja y Bancos" únicamente (no se sumó "Inversiones").

Membresía: no se encontró una cifra de "cantidad de socios" en este documento (memberCountByClub
queda en null). Gestión: "Eduardo Bermúdez" figura como Presidente en la Comisión Directiva del
propio documento (pág. 1) y firma el Estado de Recursos y Gastos como tal (pág. 2) — confirmado
con el propio balance, no una fuente externa.
============================================================================
```

## 2019

### Ingresos

_antes de la fila 1 (`Cuotas Socios`):_

```text
Anexo V — Recursos para Fines Generales (Total 167.521.788)
```

_antes de la fila 14 (`Campeonatos AFA y venta de entradas de partidos de fútbol`):_

```text
Anexo VI — Recursos para Fines Específicos / Fútbol Profesional (subtotal 597.711.545)
```

_antes de la fila 23 (`Escuela de fútbol`):_

```text
Anexo VI — Recursos Fútbol Amateur (subtotal 6.921.344)
```

_antes de la fila 24 (`Donaciones (Recursos y Gastos Extraordinarios, Nota 13)`):_

```text
Nota 13 — Recursos y Gastos Extraordinarios (Donaciones, 2.982.903)
```

### Gastos

_antes de la fila 1 (`Remuneraciones Administración`):_

```text
Anexo VII — Gastos Generales de Administración (Total 87.661.810)
```

_antes de la fila 14 (`Remuneraciones fútbol profesional`):_

```text
Anexo VIII — Gastos Específico de Sectores, columna Fútbol (subtotal 394.405.970)
```

_antes de la fila 24 (`Gastos pileta`):_

```text
Anexo VIII — Gastos Específico de Sectores, columna Otros (subtotal 62.145.256)
```

_antes de la fila 34 (`Amortización de Bienes de Uso (Anexo III)`):_

```text
Amortizaciones (cuerpo principal del Estado de Recursos y Gastos)
```

### Meta

```text
grossDebt = Deudas corriente (211.885373) + no corriente (14.645665), EXCLUYENDO Deudas
Judiciales (litigios) e Ingresos cobrados por anticipado. cash = Caja y Bancos.
netInterest = "Resultados Financieros y por Tenencia incluyendo el RECPAM" (RXTYR), impreso
positivo en el Estado de Recursos y Gastos.
officialTotalRevenue = Total Recursos Ordinarios (772.154677) + Donaciones extraordinarias
(2.982903) = 775.137580. officialTotalExpenses = Total Gastos Ordinarios impreso (no incluye
gasto extraordinario, la Nota 13 no declara ninguno). officialPAT = Superávit Final del
Ejercicio impreso ($208.963.563, SUPERÁVIT confirmado: los 3 montos —ordinario, extraordinario
y final— se imprimen positivos, sin paréntesis).
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en data/instituto-data.js, Versión 95).
```

### gestionesByClub['newells-ar']

```text
Eduardo Bermúdez figura como Presidente en la Comisión Directiva del propio documento y firma
el Estado de Recursos y Gastos como tal — confirmado con el balance mismo, no con una fuente
externa. Solo se carga el rango de este único ejercicio, sin asumir cuánto duró el mandato.
```

### memberCountByClub['newells-ar']

```text
no se encontró una cifra de "cantidad de socios" en este documento
```
