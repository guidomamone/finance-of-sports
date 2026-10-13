# almagro-ar — evidencia de carga

Lo que había como comentario en `data/almagro-ar-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/almagro-ar-data.js — Club Almagro (Asociación Civil, Medrano 522, CABA):
clubId lleva el sufijo de país ('almagro-ar') por la convención de la Versión 129
(Admin/CONVENCIONES.md): cualquier club nuevo desde entonces nace con el país en el id,
para no arrastrar una colisión futura si aparece otro "Almagro" en otro país. Los 41
clubes de antes de esa versión (incluido "instituto"/"racing"/"velez"/"rosariocentral",
cargados antes de la 129 o en la misma tanda sin haberse actualizado) se quedan sin
migrar a propósito, ver el criterio completo en CONVENCIONES.md.
club NUEVO, motor genérico. 6 ejercicios cargados, todos balances auditados reales,
consecutivos: Ejercicio 80 (cierre 31/10/2018) a Ejercicio 85 (cierre 31/10/2023).
PDF + transcripción en Clubes/Argentina/Almagro/{balance-2018,balance-2019,
memoria-y-balance-2020,balance-2021,balance-2022,balance-2023}.{pdf,md}. Los 4 últimos
(2020-2023) están marcados "ESCANEADO, TRANSCRIPTO CON MISTRAL OCR" en su .md — se
verificaron a mano los 6 ejercicios sumando cada Anexo contra su total impreso (y el
total contra el "TOTAL DE RECURSOS"/"TOTAL GASTOS"/resultado final de cada balance,
columna del AÑO CORRIENTE de ESE balance, nunca la comparativa de un balance posterior —
club-data-mapping sección 6 punto 5), así que la advertencia de esos 4 archivos ya se
puede borrar.

FORMATO DEL DOCUMENTO, igual los 6 años (confirmado leyendo 2018 entero y grepeando el
resto): Estado de Resultados = "RECURSOS" (Cuota Sociales -Anexo II + Recaudación por
Actividades -Anexo III) − "GASTOS" (Gastos Específicos -Anexo IV + Gastos de
Operaciones -Anexo V + Amortización -Anexo I A y I B) = "Rtado de las operaciones
ordinarias", +/− "Resultado financiero y por tenencia (incluye RECPAM)" = resultado
final del ejercicio.

TRAMPA REAL ENCONTRADA (2021 y 2022, y la más grande en 2023): el balance imprime DOS
resultados con nombres que invitan a confundirlos. "RESULTADO DEL EJERCICIO" es el
resultado ANTES del resultado financiero (Recursos − Gastos); "RESULTADO FINAL" es
DESPUÉS de sumarle el resultado financiero — es este último el que se cargó como
`officialPAT`, nunca el intermedio. El caso más extremo es 2023: "RESULTADO DEL
EJERCICIO -GANANCIA-" da +69.702.506,29 (Recursos 423.070.550,27 − Gastos
353.368.043,98), pero el resultado financiero de ese año es -72.886.626,53, así que el
"RESULTADO FINAL" -y el officialPAT real- es -3.184.120,24 (PÉRDIDA), lo opuesto de lo
que sugiere leer solo la primera línea. Mismo patrón, menor magnitud, en 2021
(RESULTADO DEL EJERCICIO -6.885.940,57 vs. RESULTADO FINAL -10.836.428,30) y 2022
(-6.311.157,56 vs. -13.483.786,33). 2018/2019/2020 no tienen esta ambigüedad de rótulo
(una sola línea de resultado, ya neta del resultado financiero cuando corresponde).
2020 es el único ejercicio de los 6 sin línea de "Resultado financiero" separada —
"RESULTADO DEL EJERCICIO -GANANCIA-" ES el resultado final ese año (netInterest:0).

CATEGORIZACIÓN (ver club-data-mapping SKILL.md sección 1 para el criterio de cada
categoría; estas son las decisiones específicas de Almagro, algunas no cubiertas por el
skill al 100%, ver reporte de la sesión):
- "Sede Social - Medrano 522 CABA" (Anexo II, única línea) -> member_dues. DECISIÓN DE GUIDO (2026-10-05): son cuotas sociales;
  no es una duda abierta y una auditoría no la reabre (el balance pone aparte "Alquiler de Sede").
- "Futbol Ingreso por Partidos" / "Partidos Amistosos" (2023) -> matchday_competition.
- "Ingreso A.F.A." / "Ingreso A.F.A: dcho tv" / "Derechos TV" -> broadcasting (el propio
  rótulo 2020+ dice "dcho tv", confirma que es reparto de TV/torneos vía AFA).
- "Alquiler de Sede" -> other_income, NO stadium_other: es alquiler de la SEDE SOCIAL
  (Medrano 522), un domicilio distinto y explícitamente separado del Estadio (M.T. de
  Alvear 223, José Ingenieros) en la carátula del propio balance — criterio conservador
  de club-data-mapping sección 1 (stadium_other solo si el rótulo nombra el estadio).
- "Alquiler de Canchas" -> other_income (no se puede confirmar que sean las canchas del
  estadio vs. las del predio de entrenamiento; conservador, mismo criterio que Sede).
- "Canon por Alquiler Cancha Tenis" -> other_sports (sección deportiva no futbolística,
  ver tabla de club-data-mapping sección 1).
- "Premio Copa Argentina" -> competition_bonus.
- "Publicidad" / "Alquiler de Antena" -> sponsorship_commercial.
- "Derechos de Solidaridad Jugadores" (2020) / "Derecho de Formacion Jugadores" (2021-22)
  / "Prima por Venta Jugadores" (2022) -> player_sales (mecanismos FIFA de
  solidaridad/formación y prima de venta, todos ingreso ligado a transferencias).
- "Asignacion Extraordinaria A.F.A" (2021, $1,26M) -> other_income, NO broadcasting: a
  diferencia de "Ingreso A.F.A: dcho tv" (que el propio rótulo liga a TV), esta línea no
  aclara su origen y podría ser un aporte extraordinario (ej. alivio post-pandemia) sin
  relación con derechos de TV — JUDGMENT CALL, no cubierto por el skill, señalado en el
  reporte de la sesión.
- "Intereses Fondo de Inversion" (2023, Anexo III) -> other_income, NO netInterest: es
  financiero por naturaleza, pero el propio balance lo incluye dentro de "RECAUDACIÓN
  POR ACTIVIDADES" (Anexo III), no dentro de "Resultado financiero y por tenencia" (que
  es una línea aparte y ya se carga como netInterest) — mismo criterio que "Interese
  perdidos" de Anexo V abajo: fiel a dónde lo puso el propio documento, sin reclasificar.
- "Subsidio Otorgado" (2023) -> other_income.
- "Interese perdidos" (TODOS los años, Anexo V) -> other_expenses, NO netInterest: el
  propio documento lo computa DENTRO del total de "GASTOS DE OPERACIONES -Anexo V" (se
  verificó sumando: en 2018, 349.387,63 está incluido en el total 31.796.015,48), a
  diferencia de "Resultado financiero y por tenencia" que es una línea SEPARADA y
  distinta (esa sí es netInterest). No se resta ni se reclasifica, se deja donde el
  balance lo puso (regla explícita del pedido de esta sesión, alineada con
  club-data-mapping sección 2: ahí solo aplica a lo que el documento muestra APARTE).
- "Gastos de alimentos" (2018 solamente) / "Gastos Cuerpo Médico y Técnico" / "Honorarios
  Cuerpo Medico y Tecnico" / "Sueldos y Jornales" / "Cargas Sociales" / "Cargas Sociales
  Seg Soc." / "Primas por contrato privado" -> wages_squad. "Gastos de alimentos" (comida
  del plantel) NO está explícitamente cubierto por el skill; se agrupó con wages_squad
  seguindo el precedente de Racing (club-data-mapping/referencia/formato-simplificado.md, "CASO CONSULTADO":
  costos no salariales del plantel — médico, viáticos, comida — que Boca/Racing ya
  mezclan dentro de su propio wages_squad) — JUDGMENT CALL, señalado en el reporte.
- "Comision por compra Jugadores" / "Comision por Representante" -> other_expenses, NO
  player_amortisation: precedente de Racing (referencia/formato-simplificado.md, "CASO CONSULTADO"; Boca tampoco mezcla comisiones
  de compraventa dentro de "Compra de jugadores").
- "Gastos Compra Jugadores" (2023, costo directo de adquisición, $6,43M) -> SÍ
  player_amortisation (a diferencia de las comisiones de arriba, es el costo del pase en
  sí, mismo criterio que "Costo transferencia de jugadores" de Racing).
- Impuestos (Ley 25413, Impuestos y Contribuciones, IVA no computable), honorarios
  (abogados, contador), seguros, gastos administrativos/generales, gastos bancarios,
  limpieza -> admin_general_expense (impuestos/honorarios/seguros/administrativos, ver
  club-data-mapping/referencia/casos-por-pais-y-formato.md) salvo gastos bancarios (sin precedente explícito,
  quedaron en other_expenses junto con Interese perdidos, mismo tipo de costo financiero
  operativo).
- Estadías y traslados / movilidad / Gastos de Policía / Servicios de Emergencia /
  Ambulancia para partidos / alquiler para entrenamiento / Servicio de Seguridad ->
  match_organisation_expense.
- Mantenimiento, gastos varios, lavandería, eventos, transmisión radio, alquiler
  equipo electrógeno, alquiler vivienda para jugadores, Juicios, Multa, Percepciones
  Perdidas, Servicio de Lavandería -> other_expenses (sin categoría más específica; ver
  club-data-mapping/referencia/casos-por-pais-y-formato.md para Juicios/Moratoria — acá no hay moratoria, y Juicios
  no tiene un contexto de agrupación del propio balance que sugiera admin_general_expense
  como si tuvo Racing en algunos años).

FX: ninguno de los 6 balances tiene Anexo de moneda extranjera (no hay Activos/Pasivos
en USD/EUR declarados, club sin ese tipo de exposición) — confirmado en los 6 archivos.
fxRef a ARS@AAAA-10-31 (dólar mayorista BCRA de cierre, serie Rava Bursátil, agregada a
data/currency-map.js en esta sesión — no existían entradas de cierre 31/10 previas).

grossDebt = TOTAL DEL PASIVO completo de cada año (el balance de Almagro no separa una
línea "Deudas" angosta de otras categorías de pasivo tipo Previsiones/Ingresos
anticipados — Deudas Fiscales + Remuneraciones y C. Sociales + AFA a Pagar son, los tres,
deuda real — mismo criterio que Racing en club-data-mapping/referencia/formato-simplificado.md). cash = Caja y
Bancos de cada año.

GESTIÓN: la NÓMINA DE COMISIÓN DIRECTIVA impresa en cada balance confirma 2 presidencias
distintas a lo largo de los 6 ejercicios: Jorge Julián Romeo (nóminas 2016-2018 en el
balance 2018, 2018-2020 en 2019/2020, 2018-2021 en 2021 — cubre los ejercicios
2018-2021) y Julio Osvaldo Cucchi (nómina 2021-2024 impresa en los balances 2022 y 2023,
y firmante en ambos — cubre 2022-2023). El propio balance 2021 aclara en su Nota 1.4 que
Romeo renunció el 23/10/2023 (F ya vencido el ejercicio 2021, mientras el balance seguía
sin firmar) y que lo firmaría Cucchi como nuevo presidente — no cambia a qué gestión
pertenece el EJERCICIO 2021 (la nómina impresa para ESE ejercicio es la de Romeo).

BRANDCOLOR: la tarea original asumía "blanco y violeta/lila", pero Wikipedia (infobox +
texto: "fueron adoptados... los colores azul, blanco y negro y con ello adopta el apodo
de tricolor") confirma que el club es TRICOLOR azul/blanco/negro, apodo "Tricolor" — no
hay violeta/lila en ningún lado. Con 3 colores sin un orden de predominancia declarado
por el club/liga (a diferencia de los casos bicolor de club-or-year-onboarding sección
3), y sin theme-color del sitio oficial ni hex confiable en agregadores (footylogos no
lista a Almagro, teamcolorcodes no tiene el club), se dejó brandColor:null — resultado
cerrado, no pendiente. Ver Admin/sourcing/Argentina/Almagro.md para el detalle de la búsqueda.
============================================================================
```

_de data/clubs.js:_

```text
Almagro: ejercicio económico 1°/11 al 31/10 (los 6 balances cargados cierran todos el
31/10). Club nuevo, id con sufijo de país ('almagro-ar') por la convención de la
Versión 129 (ver CONVENCIONES.md). brandColor:null a propósito: Wikipedia confirma que
el club es TRICOLOR azul/blanco/negro (apodo "Tricolor"), sin un color que predomine
declarado por el club ni fuente de hex confiable — ver comentario de cabecera de
data/almagro-ar-data.js.
```

_de data/club-leagues/ar.js:_

```text
Verificado el 13/9/2026: temporadas 2022, 2023, 2024 y 2025 de Primera División contra sus
páginas de Wikipedia (cubren Estudiantes, Unión, Rosario Central, Independiente, Instituto,
River, Boca, San Lorenzo 2024, Racing 2024 y Vélez 2024); Argentinos Juniors contra su propia
página y la de la B Nacional 2016-17. Vélez, San Lorenzo y Racing en todos los años con
balance: confirmado por Guido, que conoce el dato (13/9/2026).

SUB-REGLA DE "LA CATEGORÍA AL CIERRE", para los ejercicios que cierran entre dos torneos:
vale la categoría de la temporada EN CURSO o recién terminada a la fecha de cierre. Importa
una sola vez acá, y es el caso de Argentinos: su ejercicio jul-2015/jun-2016 se jugó entero en
Primera (el descenso se definió al terminar el torneo 2016, en mayo), así que ese ejercicio es
Primera aunque al 30/6/2016 el club ya estuviera descendido para el torneo siguiente. Leerlo al
revés pondría como "B Nacional" un año cuyos ingresos son 100% de Primera.
Confirmado por búsqueda web (2026-09-27): Almagro jugó Primera Nacional (ex Primera B
Nacional) de forma corrida en los 6 ejercicios cargados, sin ascenso ni descenso en el medio.
```

## 2023

### Ingresos

_antes de la fila 11 (`Intereses Fondo de Inversion`):_

```text
Ver comentario de cabecera: interés financiero, pero el propio balance lo mete en
Anexo III (Recaudación por Actividades), no en "Resultado financiero" — se deja ahí.
```

### Gastos

_antes de la fila 6 (`Gastos Compra Jugadores`):_

```text
"Gastos Compra Jugadores": costo directo de adquisición (no comisión) -> SÍ
player_amortisation, ver comentario de cabecera.
```

### Meta

```text
2023: EL CASO MÁS EXTREMO — "RESULTADO DEL EJERCICIO -GANANCIA-" +69.702.506,29
(Recursos-Gastos, operativo) se revierte a PÉRDIDA una vez sumado netInterest
-72.886.626,53: officialPAT es "RESULTADO FINAL -PERDIDA-" -3.184.120,24 (confirmado
también contra el Estado de Evolución del Patrimonio Neto: "Resultado del ejercicio
-3.184.120,24"). Ver comentario de cabecera, es la trampa que el pedido original de
esta sesión ya anticipaba.
```

## 2022

### Gastos

_antes de la fila 6 (`Comision por compra Jugadores`):_

```text
"Comision por compra Jugadores"/"Comision por Representante": ver comentario de
cabecera — comisiones, no costo del pase en sí, quedan en other_expenses.
```

_antes de la fila 9 (`Interese perdidos`):_

```text
Nota: el "Totales" impreso en Anexo IV dice 49.206.174,97, pero la suma de las líneas
de arriba (verificada) da 49.200.174,97 — EXACTO lo que imprime el Estado de
Resultados ("GASTOS ESPECIFICOS -Anexos IV | 49.200.174,97"). El "Totales" del propio
Anexo IV es un dígito OCR mal leído (206 en vez de 200); se usó la cifra que
reconcilia con el Estado de Resultados y con la suma real de sus propias líneas.
```

### Meta

```text
2022: mismo patrón que 2021 — "RESULTADO DEL EJERCICIO -PERDIDA-" -6.311.157,56 es solo
el operativo; officialPAT es "RESULTADO FINAL -PERDIDA-" -13.483.786,33.
```

## 2021

### Ingresos

_antes de la fila 4 (`Asignacion Extraordinaria A.F.A`):_

```text
Ver comentario de cabecera: "Asignacion Extraordinaria A.F.A" no aclara su origen, se
categorizó other_income en vez de broadcasting (judgment call).
```

### Meta

```text
2021: ver comentario de cabecera — "RESULTADO DEL EJERCICIO -PERDIDA-" -6.885.940,57 es
SOLO el operativo (Recursos-Gastos); officialPAT es "RESULTADO FINAL -PERDIDA-"
-10.836.428,30, después de sumar netInterest -3.950.487,73.
```

## 2020

### Meta

```text
2020: único ejercicio de los 6 sin línea de "Resultado financiero" separada — el propio
balance va directo de TOTAL GASTOS a "RESULTADO DEL EJERCICIO -GANANCIA-", que es a la
vez operativo y final este año. netInterest:0.
```

## 2018

### Gastos

_antes de la fila 14 (`Interese perdidos`):_

```text
Anexo V. "Interese perdidos": ver comentario de cabecera, se deja acá (no netInterest).
```

_antes de la fila 17 (`Gastos de alimentos`):_

```text
"Gastos de alimentos": ver comentario de cabecera (judgment call, agrupado con plantel).
```

### Meta

```text
2018: único año SIN ambigüedad de rótulo — "RESULTADO DEL EJERCICIO -PERDIDA-" ya es el
resultado final (post resultado financiero).
```

## Gestiones

_antes de Julián Romeo (data/gestiones/ar.js):_

```text
Romeo: las fuentes dan solo el año (2014); dia 01 por convencion. Cierre 31/10.
```

_antes de Julio Cucchi (data/gestiones/ar.js):_

```text
Cucchi: ganó la elección del 31/10/2021 y la nota dice que asumiría formalmente "en los próximos días": 01/11 aproximado.
```

## Fuentes

### almagro-ar-balance-2018

_note (data/):_

```text
PDF oficial (18 páginas, texto nativo). Presidente: Jorge Julián Romeo (nómina de Comisión Directiva 2016-2018 impresa en el propio balance). Cifras en moneda homogénea (ajuste por inflación, RT 6 FACPCE). Convertido a USD con $35,95, dólar mayorista BCRA de cierre al 31/10/2018 (serie Rava Bursátil) — el balance no declara Anexo de moneda extranjera propio.
```

### almagro-ar-balance-2019

_note (data/):_

```text
PDF oficial (18 páginas, texto nativo). Presidente: Jorge Julián Romeo (nómina 2018-2020). Cifras en moneda homogénea. Convertido a USD con $59,67, dólar mayorista BCRA de cierre al 31/10/2019.
```

### almagro-ar-balance-2020

_note (data/):_

```text
PDF oficial (21 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Jorge Julián Romeo (nómina 2018-2020). Único ejercicio de los 6 sin línea de "Resultado financiero" separada. Cifras en moneda homogénea. Convertido a USD con $78,32, dólar mayorista BCRA de la última rueda hábil antes del cierre (viernes 30/10/2020, el 31/10 cayó sábado).
```

### almagro-ar-balance-2021

_note (data/):_

```text
PDF oficial (15 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Jorge Julián Romeo (nómina 2018-2021 impresa para este ejercicio; el balance se firmó recién en nov/dic 2023, y su Nota 1.4 aclara que Romeo renunció el 23/10/2023 y lo firmó el nuevo presidente Julio Osvaldo Cucchi — no cambia la gestión del ejercicio 2021 en sí). "RESULTADO DEL EJERCICIO -PERDIDA-" (-6.885.940,57) es solo el resultado operativo; el oficial (PAT) es "RESULTADO FINAL -PERDIDA-" (-10.836.428,30), después del resultado financiero. Convertido a USD con $99,72, dólar mayorista BCRA de la última rueda hábil antes del cierre (viernes 29/10/2021, 30 y 31/10 cayeron sábado y domingo).
```

### almagro-ar-balance-2022

_note (data/):_

```text
PDF oficial (15 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Julio Osvaldo Cucchi (nómina 2021-2024). "RESULTADO DEL EJERCICIO -PERDIDA-" (-6.311.157,56) es solo el resultado operativo; el oficial (PAT) es "RESULTADO FINAL -PERDIDA-" (-13.483.786,33). El "Totales" impreso del Anexo IV (Gastos Específicos) trae un dígito OCR mal leído (49.206.174,97); se usó 49.200.174,97, que reconcilia exacto contra la suma real de sus líneas y contra el Estado de Resultados. Convertido a USD con $156,91, dólar mayorista BCRA de cierre al 31/10/2022.
```

### almagro-ar-balance-2023

_note (data/):_

```text
PDF oficial (15 páginas, escaneado, transcripto con Mistral OCR y verificado a mano). Presidente: Julio Osvaldo Cucchi (nómina 2021-2024). OJO al leer este ejercicio: "RESULTADO DEL EJERCICIO -GANANCIA-" da +69.702.506,29 (Recursos 423.070.550,27 − Gastos 353.368.043,98), pero el resultado financiero de -72.886.626,53 lo revierte a PÉRDIDA: el oficial (PAT) es "RESULTADO FINAL -PERDIDA-" (-3.184.120,24), confirmado también contra el Estado de Evolución del Patrimonio Neto. Convertido a USD con $350, dólar mayorista BCRA de cierre al 31/10/2023.
```

## Otros

### gestionesByClub['almagro-ar']

```text
Confirmado por la nómina de Comisión Directiva impresa en cada balance (ver comentario
de cabecera): Romeo cubre los ejercicios 2018-2021, Cucchi 2022-2023.
```

### memberCountByClub['almagro-ar']

```text
No se encontró una cifra pública confiable de cantidad de socios de Club Almagro
(Medrano 522, CABA) — la búsqueda de esta sesión solo encontró resultados de OTROS clubes
homónimos ("Almagro" de Santa Fe, San Lorenzo de Almagro). Null es un resultado cerrado,
no un pendiente (ver club-or-year-onboarding SKILL.md sección 3).
```
