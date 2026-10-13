# ferrocarriloeste-ar — evidencia de carga

Lo que había como comentario en `data/ar/ferrocarriloeste-ar-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/ferrocarriloeste-ar-data.js — Club Ferro Carril Oeste (Asociación Civil), Caballito, Buenos
Aires, Argentina. Club social multideportivo (fútbol, básquet, natación, hockey, tenis, etc.),
mismo tipo de entidad que Banfield/Vélez/Racing — NO una SAF. 2 EJERCICIOS CARGADOS: 118
(1°/7/2021 al 30/6/2022) y 119 (1°/7/2022 al 30/6/2023). fiscalYearStart:'07-01'.

Fuentes: Estados Contables oficiales completos (Estado de Situación Patrimonial + Estado de
Recursos y Gastos + Anexos A-G), ambos con informe de auditoría (Dr. Gabriel Alejandro Warley,
CPCECABA T°295 F°232) SIN salvedades, descargados de ferrocarriloeste.org.ar (ver
Admin/sourcing/Argentina/Ferro Carril Oeste.md). PDF con texto nativo, transcripción completa en
Clubes/Argentina/Ferro Carril Oeste/estados-contables-ejercicio-118-2021-22.md (Ej. 118) y
balance-ejercicio-119-2022-23.md (Ej. 119). Preparados en MONEDA HOMOGÉNEA (RT6, reexpresados por
inflación a la fecha de cierre de CADA balance) — se usó siempre la columna "año corriente" de
CADA documento (nunca la comparativa del balance del año siguiente, que reexpresa a otra fecha de
cierre: club-data-mapping sección 6.5 — confirmado real acá, la columna comparativa "30/06/2022"
que imprime el balance 119 NO coincide con el año corriente "30/06/2022" que imprime el balance
118, exactamente por este motivo).

ESTRUCTURA DEL DOCUMENTO (misma para los 2 ejercicios): el Estado de Recursos y Gastos separa
"RECURSOS ORDINARIOS" (Anexo B: Cuotas Sociales + Aranceles por Actividades + Otros Ingresos
Ordinarios + Ingresos Extraordinarios — las 4 sub-secciones suman "Total Recursos Ordinarios") de
"GASTOS ORDINARIOS" (Anexo D "Específicos de sectores" + Anexo E "Generales de administración" +
Amortizaciones de bienes, Anexo A). Entre Gastos Ordinarios y el Superávit Operativo hay una línea
suelta "Recupero Decreto 1212/03" (ver más abajo). Debajo del Superávit Operativo va una única
línea "Resultados Financieros incluido RECPAM" (neta, incluye el resultado por exposición a la
inflación) -> netInterest. No hay ítems extraordinarios separados: "Superávit (Deficit) del
Ejercicio" = "Superávit (Deficit) Ordinarios" en los 2 años.

"Recupero Decreto 1212/03" (Nota 7 de cada balance): el Decreto 1212/03 es un régimen de
percepción/retención de la AFA sobre entradas/transferencias/publicidad/TV de los clubes
afiliados, destinado a cargas sociales de jugadores y personal de fútbol profesional. LA NATURALEZA
EXACTA DE ESTE "RECUPERO" (¿crédito por retención en exceso? ¿reintegro vinculado a las cargas
sociales del plantel?) NO SE PUDO CONFIRMAR con el texto del balance — es una DUDA GENUINA, anotada
para Admin/dudas-por-club.md. Se cargó como `other_income` (catch-all conservador: es un ingreso/
recupero real que el propio documento incluye dentro de "Recursos Ordinarios" al computar el
Superávit Operativo, pero sin categoría más específica disponible con certeza).

Categorización de Ingresos (Anexo B + Anexo C para el desglose por actividad):
- 'Cuotas Sociales Gral' -> member_dues.
- 'Servicios a Socios' (Anexo C: Natación/Fitness/Tenis/Racquetball/Otros, actividades
  recreativas para socios) -> other_sports.
- 'Ingresos por Actividades Federadas': el Anexo C desglosa esta línea por deporte, y SÍ incluye
  una línea propia "Futbol Infantil" — promovida a línea de primer nivel con normalizedCategory
  `youth_football` (regla de la sección 1 de club-data-mapping: un sub-ítem con categoría real
  distinta del resto se promueve, no se aplana). El resto de los deportes de esta línea (Futsal,
  Hockey, Handball, Voleyball, Basquetball, Gimnasia, Tenis, Natación, Otros) -> other_sports.
- 'Ingreso por Colonia de Vacaciones' -> other_sports (actividad recreativa de verano/invierno).
- 'Ingreso por Colegio Instituto Educativo' -> education (colegio del club).
- 'Ingreso por Instituto del Deporte' -> other_sports.
- 'Ingreso por Escuelas Deportivas' (Anexo C: Natación/Tenis/Futsal/Gimnasia/Hockey/Basquetball/
  Patín/Handball/Voleyball/Fitness/Efi/Running/Beisbol/Taekwondo/Boxeo/Racquetball/Judo-Karate-
  Lucha/Ajedrez/Tenis de Mesa — sin una línea "Futbol" propia, Futsal es una disciplina distinta) ->
  other_sports completo.
- 'Ingresos Ponteveedra' (instalación/predio anexo del club) -> other_sports.
- 'Recaudaciones Eventos Deportivos' -> matchday_competition. 'Ingresos por Torneos' ->
  competition_bonus. 'Derechos de Television' -> broadcasting. 'Venta de Abonos y Plateas' ->
  season_tickets. 'Ingreso por Publicidad y Sponsors' -> sponsorship_commercial.
- 'Ingresos por Alquileres': CRITERIO CONSERVADOR (club-data-mapping sección 1, regla de
  `stadium_other`) — el rótulo NO nombra el estadio ni una parte de él, así que NO va a
  `stadium_other`, va a `other_income` (mismo criterio que un "Alquileres" genérico de cualquier
  otro club ya cargado).
- 'Ingresos por Buffet' -> other_income (concesión de buffet, no ligada específicamente al
  estadio en el propio documento).
- 'Futbol Profesional Ventas y Prestamos' (SOLO Ej. 119, no existe como línea en Ej. 118 — ahí el
  monto era marginal, "Otros ingresos Futbol Profesional") -> player_sales: título explícito de
  venta/préstamo de jugadores del plantel profesional.
- 'Otros Ingresos' -> other_income. 'Otros ingresos Futbol Profesional' (Ej. 118, monto chico, sin
  desglose que permita separar venta de préstamo de otro concepto) -> other_income.
- 'Derechos de Formacion y afines' -> youth_football (mecanismo de solidaridad/formación, mismo
  criterio que Botafogo/Vasco da Gama SAF con "Mecanismo de solidariedade").
- 'Programa de Asis. de Emerg. al Trabajo y la Produccion' (Ej. 118, programa ATP del Estado
  argentino durante la pandemia) -> other_income (subsidio estatal, no ligado a ninguna categoría
  deportiva específica). 'Subsidios Recibidos' (Ej. 119) -> other_income, mismo criterio.
- 'Recupero Decreto 1212/03' -> other_income (ver nota extensa arriba, duda genuina).

Categorización de Gastos (Anexo D "Específicos de sectores" + Anexo E "Generales de
administración" + Amortizaciones de bienes):
- '1- Departamento de Educacion Fisica': actividad físico-recreativa general para socios (no es
  el colegio, que tiene su propio Anexo separado más abajo) -> youth_other_sports_expense.
- '2- Departamento de Deportes [Federados]' (Basquetball Profesional/Basquetball/Beisball/Boxeo/
  Efi/Fitness/Futsal/Gimnasia/Handball/Hockey/Judo/Natación/Patín/Racquetball/Taekwondo/Tenis/
  Tenis de Mesa/Voley/Otros — sin línea "Futbol" propia) -> youth_other_sports_expense completo
  (la etiqueta de esta categoría incluye explícitamente "básquet", ver category-map.js).
- '3- Gastos Especificos Departamento Fútbol': 'Departamento de Futbol Profesional' (la línea más
  grande de todo el archivo) -> wages_squad, mismo criterio que Racing/Boca 2027 (club-data-mapping/referencia/formato-simplificado.md, "CASO CONSULTADO": el documento no separa sueldos de otros costos
  operativos del plantel profesional dentro de esta línea, así que se carga entera junto con los
  sueldos, como ya se hace para ese tipo de línea mixta en otros clubes). 'Departamento de Futbol
  Femenino'/'...Infantil'/'...Amateur' -> youth_other_sports_expense (espejo de gasto de
  youth_football/womens_football, que no tienen contraparte propia del lado de Gastos).
- '4- Departamento Medico': a diferencia de Banfield (donde el gasto médico está DENTRO del Anexo
  de Fútbol Profesional), acá es un departamento APARTE de "Gastos Especificos Departamento
  Fútbol", lo que sugiere que sirve a todas las secciones del club, no solo al plantel
  profesional -> admin_general_expense.
- '5- Egresos por Actividades': 'Instituto Educativo' -> education_expense (espejo de
  'Ingreso por Colegio Instituto Educativo'). 'Colonia de Vacaciones'/'Instituto del Deporte'/
  'Ponteveedra' -> youth_other_sports_expense (espejo de sus ingresos, todos en other_sports).
- '6- Intendencia Campos de Deportes': 'Egresos Sede Social'/'Egresos Anexos'/'Egresos Generales'
  -> admin_general_expense. 'Egresos Campo Deportivo' (mantenimiento de las canchas/instalaciones
  deportivas) -> match_organisation_expense, mismo criterio que el "Sector Estadio" de Banfield.
- '7- Otros Egresos: Egresos Departamento Cultural' (Ej. 119 solamente, Ej. 118 = $0, sin línea) ->
  other_expenses (catch-all, el propio documento ya lo llama "Otros").
- Anexo E (Gastos Generales de Administración): TODAS admin_general_expense, incluyendo
  'Impuestos / Tasas / Contribuciones' (regla permanente de club-data-mapping/referencia/casos-por-pais-y-formato.md) y
  'Cargas Sociales' (adosada al sueldo administrativo de este mismo Anexo, no al del plantel,
  mismo criterio de esa sección). 'Gastos Bancarios' se mantiene acá (no a netInterest): son
  comisiones/gastos de acreditación de tarjeta, no intereses de deuda financiera — el documento ya
  tiene una línea aparte y agregada, "Resultados Financieros incluido RECPAM", para lo financiero.
- 'Amortizaciones de bienes' (Anexo A) -> depreciation.

Verificación (Node, antes de cargar):
Ej. 118: revenueLines suma EXACTO 1.133.154.575,19 = Total Recursos Ordinarios (1.050.575.536,66)
  + Recupero Decreto 1212/03 (82.579.038,53). expenseLines suma 1.126.908.873,56 vs. Total Gastos
  Ordinarios impreso 1.126.908.873,57 (diferencia de 1 centavo = redondeo del propio documento,
  ver club-data-mapping sección 6). revenue+expenses = 6.245.701,63 = "Superávit (deficit)
  Operativo" impreso, EXACTO. + netInterest (250.656.213,95) = 256.901.915,58 = "Superávit
  (Deficit) del Ejercicio" impreso, EXACTO.
Ej. 119: revenueLines suma EXACTO 3.022.684.808,49 = Total Recursos Ordinarios (2.838.730.671,99)
  + Recupero Decreto 1212/03 (183.954.136,50). expenseLines suma EXACTO 2.939.047.831,97 = Total
  Gastos Ordinarios impreso. revenue+expenses = 83.636.976,52 = "Superávit (deficit) Operativo"
  impreso, EXACTO. + netInterest (629.290.795,32) = 712.927.771,84 = "Superávit (Deficit) del
  Ejercicio" impreso, EXACTO.

grossDebt: el Estado de Situación Patrimonial separa "Deudas Financieras" (corriente + no
corriente) de "Deudas Comerciales", "Deudas Sociales y Fiscales" y "Previsiones-Contingencias
Judiciales" — se usó la línea más angosta (solo Deudas Financieras), mismo criterio que Boca/
Vélez/Banfield. Ej. 118: 93.153.967,83 + 210.947.730,91 = 304.101.698,74. Ej. 119: 175.893.949,71
+ 239.129.381,37 = 415.023.331,08. cash = "Caja y Bancos" (sin sumar "Inversiones"), Nota 4.1 de
cada balance: Ej. 118 = 3.903.444,64; Ej. 119 = 59.450.677,25.

FX: NINGUNO de los 2 balances declara su propio tipo de cambio de cierre en un Anexo dedicado (se
buscó explícitamente "U$S"/"USD"/"dólar" en los 2 documentos completos, sin resultado — solo hay
una nota de criterio de valuación genérica que dice "al tipo de cambio comprador/vendedor del
Banco de la Nación Argentina vigente al cierre", SIN dar el valor numérico). Se usó el dólar
MAYORISTA de referencia del BCRA (Comunicación "A" 3500, serie oficial vía
apis.datos.gob.ar/series/api/series, id 175.1_DR_REFE500_0_0_25): $125,215 al 30/6/2022 (jueves,
día hábil) y $256,675 al 30/6/2023 (viernes, día hábil) — ninguna de las 2 fechas cae en fin de
semana, no hace falta ajustar a la rueda hábil más cercana. Migrado a `fxRef` ('ARS@2022-06-30'/
'ARS@2023-06-30', ya agregadas a `FX_CLOSE` en `data/currency-map.js` en la integración de esta
misma versión), mismo criterio que ya usan Racing/Vélez/Banfield para sus propias fechas de
dólar mayorista.

Gestión: Carlos Daniel Pandolfi firma como Presidente el informe de auditoría de LOS 2 balances
(16/9/2022 para el Ej. 118, 7/9/2023 para el Ej. 119) — evidencia directa y consistente de que
presidió el club durante ambos ejercicios. No se encontró en las Memorias narrativas una fecha de
elección/mandato explícita, pero la firma en carácter de Presidente en 2 balances consecutivos
alcanza la confianza que pide club-data-mapping sección 7.

Socios: la Memoria del Ej. 119 (memoria-ejercicio-119-2022-23.md, pág. 12) publica "CANTIDAD DE
SOCIOS/AS POR CATEGORÍA AL 30/6/23": TOTAL 18.280. La Memoria del Ej. 118 no publica un total
equivalente (solo menciona "la asistencia de 342 socios habilitados" a la Asamblea, que es
quórum, no el padrón total). Se usó el único total real disponible (18.280, al 30/6/2023).
============================================================================
```

_de data/clubs.js:_

```text
Ferro Carril Oeste, club nuevo (Versión 220, 3er batch de PDF transcriptos pendientes, sesión
2026-09-24): 2 balances reales (Ejercicios 118 y 119, 2021-22 y 2022-23).
```

_de data/club-leagues/ar.js:_

```text
Ferro Carril Oeste (Versión 220, sesión 2026-09-24): fuentes encontradas se contradicen entre sí
sobre la categoría exacta de estos 2 ejercicios (Primera B Metropolitana/Nacional/Torneo Federal
A, ninguna de las cuales tiene liga propia en el catálogo hoy) — queda en `null`, sin verificar,
en vez de adivinar.
```

## 2023

### Meta

```text
grossDebt = Deudas Financieras (corriente 175.893.949,71 + no corriente 239.129.381,37).
cash = Caja y Bancos (Nota 4.1).
officialTotalRevenue = Total Recursos Ordinarios (2.838.730.671,99) + Recupero Decreto
1212/03 (183.954.136,50). officialTotalExpenses = Total Gastos Ordinarios impreso
(2.939.047.831,97). officialPAT = "Superávit (Deficit) del Ejercicio" impreso (712.927.771,84).
Verificado exacto: revenue + expenses = 83.636.976,52 = "Superávit (deficit) Operativo".
```

## 2022

### Meta

```text
netInterest = "Resultados Financieros incluido RECPAM" impreso.
grossDebt = Deudas Financieras (corriente 93.153.967,83 + no corriente 210.947.730,91).
cash = Caja y Bancos (Nota 4.1).
officialTotalRevenue = Total Recursos Ordinarios (1.050.575.536,66) + Recupero Decreto
1212/03 (82.579.038,53), ver nota de cabecera. officialTotalExpenses = Total Gastos Ordinarios
impreso. officialPAT = "Superávit (Deficit) del Ejercicio" impreso. Verificado exacto:
revenue + expenses = "Superávit (deficit) Operativo" (6.245.701,63); + netInterest =
256.901.915,58 = officialPAT.
```

## Gestiones

_antes de Guillermo Bameule (data/gestiones/ar.js):_

```text
Bameule: sigue abierta; el 27/9/2026 hubo elecciones y ganó la oposición, todavía no figura quién asumió.
```

## Fuentes

### ferrocarriloeste-ar-estados-contables-118-2021-22

_note (data/):_

```text
PDF oficial (texto nativo), informe de auditoría sin salvedades (Dr. Gabriel Alejandro Warley, CPCECABA T°295 F°232, 16/9/2022). Estados contables preparados en moneda homogénea (RT6). SUPERÁVIT real: $256.901.915,58 ARS. Total del Activo al cierre: $3.693.397.732,35. No declara tipo de cambio de cierre propio (sin Anexo de moneda extranjera) — convertido con dólar mayorista de referencia BCRA (Comunicación A 3500) al 30/6/2022 ($125,215), investigado vía apis.datos.gob.ar. Ver data/ar/ferrocarriloeste-ar-data.js para el detalle completo de categorización.
```

### ferrocarriloeste-ar-balance-119-2022-23

_note (data/):_

```text
PDF oficial (texto nativo), informe de auditoría sin salvedades (Dr. Gabriel Alejandro Warley, CPCECABA T°295 F°232, 7/9/2023). Estados contables preparados en moneda homogénea (RT6). SUPERÁVIT real: $712.927.771,84 ARS, impulsado por una venta/préstamo grande de jugadores del plantel profesional ($459,755138 M, línea "Futbol Profesional Ventas y Prestamos", que no existía como línea propia en el Ej. 118). Total del Activo al cierre: $8.563.450.301,47. No declara tipo de cambio de cierre propio — convertido con dólar mayorista de referencia BCRA al 30/6/2023 ($256,675). 18.280 socios/as al 30/6/2023 (única cifra de padrón encontrada en las 2 memorias). Ver data/ar/ferrocarriloeste-ar-data.js para el detalle completo de categorización.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub['ferrocarriloeste-ar']

```text
Carlos Daniel Pandolfi, Presidente — firma en ese carácter el informe de auditoría de AMBOS
balances (Ej. 118: 16/9/2022; Ej. 119: 7/9/2023). No se encontró una fecha de elección/mandato
explícita en las Memorias narrativas, pero la firma consistente en 2 balances consecutivos
confirma la gestión para los 2 ejercicios cargados con la confianza que exige club-data-mapping
SKILL.md sección 7.
```

### memberCountByClub['ferrocarriloeste-ar']

```text
al 30/6/2023, memoria-ejercicio-119-2022-23.md
```
