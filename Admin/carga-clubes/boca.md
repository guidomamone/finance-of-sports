# boca — evidencia de carga

Lo que había como comentario en `data/boca-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/boca-data.js — datos financieros y deportivos de Boca: bocaRevenueLinesByYear/
bocaExpenseLinesByYear/bocaFiscalYearMeta (motor genérico, mismo shape que
data/river-data.js), gestionesByClub/sources/memberCountByClub (en data/clubs.js,
Boca sigue eager-loaded ahí), bocaPasesData, bocaResultadosData, bocaTitulosData.

MIGRACIÓN (a pedido explícito de Guido, "poné a Boca en el mismo motor que el resto"):
hasta acá Boca vivía en yearsRaw{} (9 campos fijos) + computeYear() propio, con una
SEGUNDA estructura paralela (nativeFinancialsBoca) para la tabla nativa del Ejercicio
2025, que reconciliaba a un total distinto ("Revenue" excluía transferencias de
jugadores) del que usaban KPIs/verifyTieOuts. Esto se resolvió así:

1) "Revenue" de Boca ahora SÍ incluye ingresos por transferencias/rescisión de pases,
   igual que hace el balance en su propia pág. 76 (Total de Recursos) y que ya hacían
   8 clubes migrados antes (Estudiantes, Argentinos, Instituto, Rosario Central, Unión,
   Independiente, Vélez, San Lorenzo: todos suman su propia línea de venta de jugadores
   directo a Revenue, normalizedCategory 'player_sales'). El comentario viejo que decía
   "misma convención que usa el resto del sitio" para EXCLUIR transferencias era
   incorrecto: el resto del sitio no hace eso. Revenue 2025 pasó de $152.899,938548 M
   (excluyendo transferencias) a $237.614,566642 M (Total de Recursos real, pág. 76).

2) El Ejercicio 2025 (balance auditado) desglosaba Gastos por DEPARTAMENTO (Fútbol
   profesional, Estadio, Educación física, etc.), mezclando sueldos + amortización +
   gastos operativos en una sola línea por departamento — no alcanzaba para separar
   wages_squad/player_amortisation/depreciation (categorías que el motor genérico
   necesita para nonCash/PAT). Se volvió a los anexos originales del balance
   (Clubes/Argentina/Boca/memoria-y-balance-2024-25.md, Anexos IX y XI-XVII) y se
   verificó que CADA departamento reporta su propia línea "Remuneraciones y cargas
   sociales" (o equivalente) por separado — sumando esas 9 líneas da EXACTO
   $67.869,732365 M, el mismo total de sueldos que ya usaba el sitio. Cada departamento
   ahora son 2 líneas (Remuneraciones / Otros gastos operativos) en vez de 1, con el
   mismo nombre de departamento, para no perder ni un peso ni el desglose por área.
   Verificado: revenue+expenses+nonCash reconcilian EXACTO contra "Resultado antes del
   efecto financiero" ($34.869,724928 M) y PAT contra "Superávit del ejercicio"
   ($35.581,462204 M), impresos en la pág. 76.

Quién lo usa: js/finanzas-calc.js (computeYearGeneric, nativeReportFor,
simplifiedReportForGeneric) y js/finanzas-render.js leen estas constantes vía
window.CLUB_GENERIC_DATA.boca, igual que cualquier otro club.
============================================================================
---------- INGRESOS ----------
Versión 138 (pedido de Guido: "quita los ejercicios que sean placeholder, antes tenían
sentido, hoy no"): Boca tenía 7 ejercicios sin documento detrás y se borraron los 7. Cinco
eran placeholder puro con 9 rubros inventados (2018, 2019, 2021, 2022, 2023), puestos
cuando el sitio era un MVP y necesitaba algo que dibujar; los otros dos (2024, 2026) eran
`pending_official`, ejercicios reales que Boca todavía no publicó, cargados en cero. Los
dos casos se veían igual en pantalla: una columna vacía en los gráficos de Inicio con la
leyenda "no reportado por el club", y una opción "(Placeholder)" en el selector de Año.
Quedan los 2 ejercicios con documento: el balance 2024/25 y el presupuesto 2026/27.
```

_de data/club-leagues/ar.js:_

```text
El único de los 11 que cambió de categoría en el período cargado: descendió al terminar el
torneo de transición 2016 y jugó la B Nacional 2016-17, que ganó (terminó el 30/7/2017, o sea
que al cierre del ejercicio 2017 todavía estaba en curso). Volvió a Primera para 2017-18.
```

_de data/club-leagues/ar.js:_

```text
2027 es el presupuesto jul-2026/jun-2027: cierra en el futuro; 2022/2023 (to-do 73) Boca jugó Primera todo el período, ambos cierres 30/6
```

## 2027

### Ingresos

```text
Ejercicio 2027 = Presupuesto oficial 2026/27. Las mismas 9 categorías y montos que antes vivían en
yearsRaw[2027]+revenueBreakdown[2027]. Suma exacta a $239.392,104 M, el total oficial del presupuesto.
```

### Gastos

```text
Ejercicio 2027 = Presupuesto oficial 2026/27, misma fuente que antes (expenseBreakdown[2027]/
expenseSubBreakdown[2027]). "Fútbol Profesional" (-120.358,357 M en el resumen del presupuesto) se
separa acá en sus 2 componentes reales, ya desglosados en el propio presupuesto (pág. 15):
Remuneraciones ($72.632,108 M = Gerencia de Fútbol Profesional + Futbol Femenino) y Amortización
de plantel ($47.726,249 M), para que el motor genérico calcule nonCash/wages igual que para
cualquier otro club. El resto de las categorías no cambia de valor, solo de etiqueta (mismo
agrupamiento que ya usaba "Formato simplificado" para este ejercicio).
```

### Meta

```text
Ejercicio 2027 = Presupuesto oficial 2026/27. fx = promedio entre el dólar de inicio ($1.480) y
cierre ($1.840) del ejercicio = $1.660 (ver acordeón "Presupuesto 2026/27"). officialPAT acá es un
resultado DERIVADO (Ingresos − Gastos del propio presupuesto, $3.402,243 M), no una cifra que el
documento imprima con esa etiqueta (un presupuesto no tiene "Superávit del ejercicio" real
todavía), se deja como chequeo de consistencia interna igual que Revenue/Expenses.
```

### Presupuesto financiero

```text
Presupuesto Financiero 2026/27, tal cual lo imprime el documento oficial (ver
Clubes/Argentina/Boca/presupuesto-26-27.md). Estuvo escrito a mano como HTML adentro de
index.html hasta la Versión 135: era el mismo dato, pero en la capa de markup y solo para
Boca, con un `isBoca2027` decidiendo si se mostraba. Los montos están en MILLONES de ARS,
como el resto del proyecto; `formato:'ars-exacto'` le dice al render que esta tabla se
muestra en pesos enteros con separador de miles (así la imprime el documento), no
convertida por el toggle de moneda.
```

### Presupuesto de inversiones

```text
Presupuesto de Inversiones 2026/27, obra por obra, del mismo documento. Mismo origen y
mismo criterio de unidades que el financiero de arriba.
```

### Supuestos del presupuesto

```text
Las premisas que el propio presupuesto declara (macro, política de ingresos y de gastos).
Movido desde js/finanzas-render.js en la Versión 135, junto con el Presupuesto Financiero
y el de Inversiones: son datos del club y su lugar es el archivo del club.
```

## 2025

### Ingresos

```text
Ejercicio 2025 = Memoria y Balance oficial auditado al 30/06/2025 (sources['boca-balance-2024-25']
en data/clubs.js). Las 11 categorías tal cual la pág. 76 del balance (mismo orden y mismos montos
que antes vivían en nativeFinancialsBoca[2025].ingresos): la suma da EXACTO el Total de Recursos
($237.614,566642 M) impreso en esa página. Guardado en ARS MILLONES EXACTOS ("moneda homogénea",
Nota 2.2 del balance, reexpresado a poder adquisitivo del 30/06/2025 según RT 6/17).
```

### Gastos

```text
Ejercicio 2025: reconstruido departamento por departamento a partir de Clubes/Argentina/Boca/
memoria-y-balance-2024-25.md (Anexos IX, X, XI-XVIII), separando en cada departamento su propia
línea "Remuneraciones y cargas sociales" (wages_squad) del resto de sus gastos operativos —
verificado que las 9 líneas de sueldo suman EXACTO $67.869,732365 M (el total de sueldos que ya
usaba el sitio antes de esta migración). "Amortización jugadores profesionales" (Anexo IX) es la
única línea de amortización real, $36.573,123213 M exacto. Las líneas SIN desglose de sueldo
propio (Organización de espectáculos, Fútbol femenino, Departamento de cultura, Impuestos y
tasas, Gastos generales, Depreciaciones) no tienen un item de "Remuneraciones" identificable en
la fuente, se dejan como una sola línea, igual que antes. La suma total (con las líneas de
transferencias de pases de abajo) da EXACTO $202.744,841714 M, el Total de Gastos impreso.
```

### Meta

```text
Ejercicio 2025 = Memoria y Balance auditado al 30/06/2025 (sources['boca-balance-2024-25']). fx =
dólar mayorista BCRA al 30/06/2025 ($1.203), fecha de cierre puntual (el balance ya está en
"moneda homogénea" al 30/06/2025, Nota 2.2, así que corresponde el tipo de cambio de ESE día, no
un promedio del ejercicio). officialTotalRevenue = Total de Recursos impreso pág. 76 (incluye
transferencias de pases, ver comentario de cabecera del archivo). officialTotalExpenses = Total
de Gastos impreso pág. 76. officialPAT = Superávit del ejercicio impreso pág. 76. extraRows
preserva la etiqueta real del balance para esta fila (en vez de la genérica "Intereses netos").
```

## 2023

### Ingresos

```text
Ejercicio 2023 = Estados Contables auditados, Ejercicio Económico N°119 (1/7/2022 al 30/6/2023,
sources['boca-balance-2022-23']). Mismo hallazgo/transcripción que 2022 (to-do 73). Las 11
categorías tal cual el Estado de Recursos y Gastos (pág. 61): suma EXACTA al Total de Recursos
($26.178.273.845). "Departamento de fútbol juvenil" no tiene ingreso propio este ejercicio (el
documento lo imprime en $0 para 30/06/2023) y se omite, igual que "Derechos de tanteo" (revenue),
que no aparece en absoluto en esta columna.
```

### Gastos

```text
Ejercicio 2023: mismo criterio que 2022. La suma total (con las 4 líneas de transferencias de
pases) da EXACTO $(27.795.138.995), el Total de Gastos impreso pág. 60. "Participación de
terceros en venta de jugadores" no tiene gasto propio este ejercicio (el documento lo imprime en
$0 para 30/06/2023) y se omite.
```

### Meta

```text
Ejercicio 2023 = Estados Contables auditados, Ejercicio N°119 (sources['boca-balance-2022-23']).
fx = USD activo al 30/06/2023 ($256,30), declarado en el mismo Anexo III. grossDebt = "Deudas"
corriente + no corriente ($2.155.761.442 + $1.192.317.317). netInterest da POSITIVO este
ejercicio ($2.639.247.885, RECPAM incluido) — el "Resultado antes del efecto financiero" fue
deficitario (-$1.616.865.150) y el resultado financiero lo revirtió a superávit, verificado
exacto contra el Superávit del ejercicio impreso ($1.022.382.735, pág. 60). gestionId 'ameal':
mismas firmas que 2022 (informe fechado 08/09/2023, la gestión de Ameal termina en 2023).
```

## 2022

### Ingresos

```text
Ejercicio 2022 = Estados Contables auditados, Ejercicio Económico N°118 (1/7/2021 al 30/6/2022,
sources['boca-balance-2021-22']). Encontrado vía Wayback CDX de dominio completo (to-do 73,
Versión 247), transcripto con Mistral OCR (Clubes/Argentina/Boca/eecc-30525418835-2022.md).
Las 12 categorías tal cual el Estado de Recursos y Gastos (pág. 32): la suma da EXACTO el Total
de Recursos ($14.279.912.579) impreso ahí. Guardado en ARS MILLONES (el documento imprime pesos
completos en moneda homogénea, Nota 2.2, reexpresada a poder adquisitivo del 30/06/2022; cada
cifra se divide por 1.000.000 al cargar, mismo criterio de unidad que 2025/2027).
OJO: la columna "30/06/2022" que aparece como COMPARATIVA dentro del balance de 2023 (año
siguiente) reexpresa estas mismas cifras a OTRA fecha de cierre y NO coincide con estos
números — se usó siempre la columna "año corriente" del balance cuyo ejercicio es el que se
carga, nunca la comparativa de un balance posterior (club-data-mapping sección 6, regla 5).
```

### Gastos

```text
Ejercicio 2022: mismo criterio de separación wages_squad/player_amortisation/other_expenses por
departamento que ya usa 2025 (ver comentario de cabecera del archivo) — acá cada departamento SÍ
desglosa su propia línea "Remuneraciones y cargas sociales" (o "Remuneraciones personal
administrativo"/"Remuneraciones plantel profesional, primas" en Fútbol profesional), así que se
separa igual. La suma total (con las 4 líneas de transferencias de pases de arriba) da EXACTO
$(13.669.793.975), el Total de Gastos impreso pág. 32.
```

### Meta

```text
Ejercicio 2022 = Estados Contables auditados, Ejercicio N°118 (sources['boca-balance-2021-22']).
fx = USD activo al 30/06/2022 ($125,03), declarado por el propio balance en su Anexo III
(Activos y Pasivos en Moneda Extranjera) — regla 0 de club-data-mapping/referencia/fx.md, se prefiere
siempre al de mercado. grossDebt = "Deudas" corriente + no corriente (nota 6.1, $2.413.758.080 +
$449.885.280), EXCLUYE Obligaciones de hacer y Previsiones, mismo criterio que Boca 2025.
officialTotalRevenue/officialTotalExpenses/officialPAT = Total de Recursos/Total de
Gastos/Superávit del ejercicio impresos pág. 32. gestionId 'ameal': Jorge Amor Ameal firma como
Presidente en todo el documento (fecha de informe 15/09/2022).
```

## Fuentes

### boca-presupuesto-2026-27

_note (data/):_

```text
PDF subido directamente por Guido. Transcripto completo en el acordeón "Presupuesto 2026/27 (oficial)" de Finanzas.
```

### boca-balance-2024-25

_note (data/):_

```text
PDF oficial (149 páginas, firmado por Comisión Directiva/Fiscalizadora, con dictamen de auditoría de Becher y Asociados S.R.L. sin salvedades, 10/09/2025), descargado del Google Drive linkeado en la página oficial del club. Cifras en moneda homogénea (reexpresadas a poder adquisitivo del 30/06/2025 según RT 6/17, Nota 2.2 del balance), no nominales del momento de cada operación. "Revenue" del sitio incluye ingresos por venta/rescisión de pases (Versión 102: igual que el propio balance los trata en su Total de Recursos, pág. 76, y que el resto de los clubes del motor genérico); "wages" es la suma real de "Remuneraciones y cargas sociales" de los 9 anexos que la desglosan por departamento (ver comentario de cabecera de data/boca-data.js).
```

### boca-balance-2021-22

_note (data/):_

```text
PDF oficial (101 páginas, escaneado, sin dictamen con salvedades — Becher y Asociados S.R.L., 15/09/2022), no linkeado desde la página vigente del club: encontrado vía Wayback CDX de dominio completo sobre bocajuniors.com.ar (to-do 73, Versión 247, snapshot 2023-01-01), colgando de un directorio /rebrand/files/ sin ningún nombre obvio en el sitio vivo de hoy. Transcripto con Mistral OCR (Clubes/Argentina/Boca/eecc-30525418835-2022.md) y verificado íntegramente contra los totales impresos del propio documento (ver comentario de cabecera de data/boca-data.js).
```

### boca-balance-2022-23

_note (data/):_

```text
PDF oficial (128 páginas, escaneado, firmado, sin dictamen con salvedades — Becher y Asociados S.R.L., 08/09/2023), mismo hallazgo que 2021-22 (Wayback CDX de dominio completo, to-do 73, snapshot 2023-11-11, directorio /rebrand/files/). Transcripto con Mistral OCR (Clubes/Argentina/Boca/balance-01-07-22-al-30-06-23-firmado.md) y verificado íntegramente contra los totales impresos del propio documento.
```

## Otros

### Gastos (bocaExpenseLinesByYear), en general

```text
---------- GASTOS ----------
SUELDOS POR DEPARTAMENTO (decisión de Guido, to-do 101, 2026-10-06; NO volver a plantearla): en 2022, 2023
y 2025 el sueldo de cada departamento va a la MISMA categoría que los otros gastos de ese departamento.
Solo "Fútbol profesional" queda en wages_squad. Estadio, Casa Amarilla, Departamento médico y Gastos de
estructura operativa → admin_general_expense; Educación física, Fútbol juvenil y Básquet →
youth_other_sports_expense. Es lo que dice club-data-mapping/referencia/casos-por-pais-y-formato.md y lo que hacen Vélez, Rosario Central y
San Lorenzo. Antes de esta decisión los 8 sueldos iban a wages_squad (2025: 67.870 M de sueldos del plantel;
ahora 46.452 M). Totales sin cambio.
```

### Meta (bocaFiscalYearMeta), en general

```text
---------- METADATOS POR EJERCICIO ----------
```

### bocaPasesData

```text
---------- MERCADO DE PASES / RESULTADOS DEPORTIVOS / TÍTULOS (sin cambios de contenido) ----------
```

### bocaResultadosData

```text
Fuente: cobertura de Infobae, La Nación y Wikipedia sobre cada gestión (agosto 2026).
Verificar contra el sitio oficial del club antes de publicar.
```

### Presupuesto financiero (bocaPresupuestoFinancieroByYear), en general

```text
Versión 102 (migración de Boca al motor genérico, ver comentario de cabecera del archivo): mismo
registro que ya usan River/Racing/etc. — reemplaza yearMeta/computeYear/simplifiedReportForBoca/
nativeFinancialsBoca (borrados de js/finanzas-calc.js y js/finanzas-render.js en la misma migración).
finanzasYears/finanzasGestiones (campos opcionales, leídos por populateFinanzasSelectors en
js/finanzas-render.js): qué años/gestiones muestra el <select> de Finanzas. Desde la Versión 138
`finanzasYears` es redundante para Boca (los años que excluía ya no existen en
bocaFiscalYearMeta), pero se deja declarado: es el mecanismo genérico que cualquier club puede
necesitar, y borrarlo acá no lo documenta mejor. `finanzasGestiones:['riquelme']` sí sigue
haciendo falta, porque gestionesByClub.boca conserva ameal/angelici para Mercado de Pases y
Resultados. Cualquier club sin estos 2 campos (el resto) muestra TODOS sus años/gestiones.
```
