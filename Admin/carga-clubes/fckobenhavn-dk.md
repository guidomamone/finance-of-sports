# fckobenhavn-dk — evidencia de carga

Lo que había como comentario en `data/fckobenhavn-dk-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/fckobenhavn-dk-data.js — F.C. København P/S (clubId 'fckobenhavn-dk'). Primer club de
Dinamarca cargado al sitio (PAÍS NUEVO, DKK MONEDA NUEVA — ver data/currency-map.js). Un solo
ejercicio: 2024 (año calendario, 1° de enero a 31 de diciembre de 2024).

ENTIDAD LEGAL — OJO, DOS entidades distintas existen para este club (ver
fuentes/Dinamarca/FC København.md y fuentes/Dinamarca/_notas-generales.md):
  1. PARKEN Sport & Entertainment A/S (CVR 15 10 77 07): la holding histórica que cotiza en
     Nasdaq Copenhagen, CONSOLIDADO que mezcla el fútbol masculino con el estadio Parken,
     retail/eventos y (desde 2024) el fútbol femenino. Perímetro mezclado, no se usó acá.
  2. F.C. København P/S (CVR 43 95 21 61): entidad NUEVA constituida 29/03/2023, que aísla
     específicamente la operación de fútbol masculino profesional. ES LA QUE SE CARGÓ ACÁ —
     perímetro limpio, "solo fútbol", igual que el resto de los clubes del sitio.

Fuente: transcripción completa en "Clubes/Dinamarca/FC København/aarsrapport-2024-12-31.md"
(aarsrapport = informe anual danés; EY como auditor, sin salvedades).

Cifras en DKK MILLONES nativos (documento en t.kr. = miles de coronas, dividido por 1.000 al
cargar). `fxRef:'DKK@2024-12-31'` porque el documento NO declara ningún tipo de cambio propio a
USD (es un P/S danés, todo en DKK, sin ninguna nota de moneda extranjera) — se usó la cotización
de cierre EUR/DKK del BCE (7,4578) dividida por EUR/USD del BCE (1,0389) = 7,1786 DKK por USD,
mismo método que ya usa el sitio para convertir GBP (ver comentario de las entradas GBP en
data/currency-map.js). Ver la entrada 'DKK@2024-12-31' en FX_CLOSE para el detalle.

CATEGORIZACIÓN DE INGRESOS (Nota 2 "Nettoomsætning", segmentoplysninger — 7 líneas, suman EXACTO
los 466.559 t.kr. impresos):
  - "Entréindtægter" (recaudación de entradas partido a partido) -> matchday_competition.
  - "TV- og præmie-indtægter" (TV Y premios por competencia MEZCLADOS, el documento no los separa)
    -> broadcasting. Se eligió TV como categoría dominante: el nombre lista "TV" primero, y el
    salto de 110.836 (2024) a 477.453 (2023, año con fase de grupos de Champions League) es
    consistente con que la porción de derechos de TV/UEFA domina el monto, no los premios por
    avance de ronda doméstica. Aproximación documentada, no una certeza — ver
    Admin/dudas-por-club.md.
  - "Samarbejdspartnere" (sponsors/partners comerciales) -> sponsorship_commercial.
  - "Merchandiseindtægter" -> sponsorship_commercial (mismo criterio que "Venta de artículos
    deportivos" de Once Caldas).
  - "Food & Beverage, konferencecenter m.v." -> stadium_other. La propia Ledelsesberetning declara
    que la actividad del club es "at drive fodbold- og stadionforretning, samt afholde
    koncertarrangementer" (fútbol Y NEGOCIO DE ESTADIO, más organizar conciertos) — F&B/centro de
    conferencias en ese contexto es exactamente "concesiones del estadio fuera del partido"
    (categoría stadium_other, Versión 189), aunque el rótulo no diga la palabra "Parken"/"estadio"
    literal. Documentado como interpretación razonable, no un calce literal — ver dudas-por-club.md.
  - "Ejendomsudlejning" (alquiler de inmuebles/propiedad comercial) -> other_income. A diferencia
    de la línea anterior, ACÁ SÍ se aplicó el criterio CONSERVADOR de club-data-mapping sección 1
    (stadium_other: "un 'Alquileres'/'Arrendamientos' genérico NO entra, va a other_income"): el
    rótulo no nombra el estadio ni una parte de él, y no hay evidencia textual de que sea
    específicamente sub-alquiler dentro de Parken vs. otra propiedad. Pregunta anotada en
    Admin/dudas-por-club.md.
  - "Øvrige indtægter" (otros ingresos varios) -> other_income.
  - "Andre driftsindtægter" (otros ingresos operativos, 287.954 t.kr., FUERA de Nettoomsætning):
    la nota de política contable dice explícito que esta línea "indeholder... fortjeneste og tab
    ved afhændelse af kontraktrettigheder" (contiene la GANANCIA/PÉRDIDA por venta de derechos de
    contrato = pases de jugadores), y la Ledelsesberetning confirma que 2024 tuvo "rekordhøje
    transferindtægter" (ingresos por transferencias récord) por las ventas de Orri Oskarsson (a
    Real Sociedad) y Elias Jelert (a Galatasaray) -> player_sales. A diferencia de Brøndby/
    Midtjylland (ver esos archivos), F.C. København SÍ presenta esto como una línea de dos
    dígitos claramente identificable dentro del cuerpo principal (no como un renglón aparte tipo
    "Transferaktiviteter"), así que se carga como revenueLine ordinaria, no como
    `profitOnPlayerSales` en fiscalYearMeta (ver club-data-mapping sección 3: "reflejá cómo LO
    PRESENTA CADA CLUB").

CATEGORIZACIÓN DE GASTOS:
  - "Vareforbrug" (costo de materiales/mercadería, F&B y merchandise) -> other_expenses (mismo
    criterio que "Costo de Ventas productos deportivos" de Once Caldas).
  - "Andre eksterne omkostninger" (la propia nota de política contable dice que incluye
    "distribution, salg, reklame, administration, lokaler, tab på debitorer og operationelle
    leasingomkostninger" = distribución, ventas, publicidad, administración, locales, deudores
    incobrables y leasing operativo) -> admin_general_expense.
  - "Personaleomkostninger" (sueldos, sin desglose por departamento — el club es una entidad
    100% fútbol profesional, sin polideportivo/colegio/otras secciones) -> wages_squad, la cifra
    completa.
  - Nota 5 "Af- og nedskrivninger af materielle og immaterielle anlægsaktiver" (137.242 t.kr.),
    desglosada línea por línea:
      "Amortiseringer af kontraktrettigheder" (amortización de pases) -> player_amortisation.
      "Nedskrivninger af kontraktrettigheder" (deterioro de pases) -> player_impairment.
      "Afskrivning på indretning af lejede lokaler" + "på bygninger" + "på produktionsanlæg og
      maskiner" (depreciación de mejoras a locales alquilados, edificios y equipamiento) ->
      depreciation, agrupadas en una sola línea con `items` (Versión 189: mismo criterio de
      acordeón de club-data-mapping sección 12).

RESULTADOS FINANCIEROS: "Indtægter af kapitalandele i tilknyttede virksomheder" (dividendos de
subsidiarias, 13.500) + "Andre finansielle indtægter" (2.733) - "Øvrige finansielle omkostninger"
(5.613) = netInterest 10.620 (fiscalYearMeta, NUNCA como línea, ver club-data-mapping sección 2).

IMPUESTO A LAS GANANCIAS: tax = 0. El propio documento lo explica en "Anvendt regnskabspraksis":
"Selskabet er som partnerselskab ikke et selvstændigt skattesubjekt, idet skattepligten påhviler
selskabets kapitalejere. Der indregnes derfor ikke aktuel og udskudt skat i årsregnskabet" — como
P/S (sociedad en comandita/partnership), la responsabilidad tributaria recae en los socios
(PARKEN Sport & Entertainment A/S), no en la entidad misma, así que NO se reconoce impuesto
corriente ni diferido en este balance.

VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
  revenueLines suman 754.513 (466.559 Nettoomsætning + 287.954 Andre driftsindtægter) =
  officialTotalRevenue.
  expenseLines suman -718.897 (106.193 Vareforbrug + 181.906 Andre eksterne omkostninger +
  293.556 Personaleomkostninger + 137.242 Af-og nedskrivninger) = officialTotalExpenses.
  754.513 - 718.897 = 35.616, EXACTO igual al "Driftsresultat" que imprime el propio Resultatopgørelse.
  35.616 + netInterest(10.620) = 46.236, EXACTO igual a "Årets resultat" (officialPAT). Cierre
  perfecto en dos pasos, cada uno contra un subtotal impreso del documento.
============================================================================
```

_de data/clubs.js:_

```text
Dinamarca (sesión de esta tanda): PAÍS NUEVO, DKK MONEDA NUEVA (ver data/currency-map.js), 3
clubes de la Superliga, cada uno con el ejercicio más reciente que permitiera separar Revenue de
Expenses de verdad (ver comentario de cabecera de cada archivo — FC Midtjylland usa 2019 en vez
de un año más reciente porque sus balances 2022+ netean Revenue contra Cost of Sales en una sola
línea "Bruttofortjeneste", sin desglose disponible). brandColor: footylogos.com/Wikipedia.
```

## 2024

### Meta

_al lado del campo `netInterest`:_

```text
13.500 (indtægter kapitalandele) + 2.733 (andre fin. indtægter) - 5.613 (øvrige fin. omk.)
```

_al lado del campo `tax`:_

```text
P/S: no es sujeto tributario propio, ver comentario de cabecera
```

_al lado del campo `profitOnPlayerSales`:_

```text
el resultado por venta de pases YA está en revenueLines (Andre driftsindtægter)
```

_al lado del campo `grossDebt`:_

```text
fuera de alcance de esta carga (Finanzas), no se transcribió el detalle de Balance para deuda/caja
```
