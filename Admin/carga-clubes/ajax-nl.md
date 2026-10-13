# ajax-nl — evidencia de carga

Lo que había como comentario en `data/nl/ajax-nl-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/nl/ajax-nl-data.js — AFC Ajax N.V. (Ámsterdam, Países Bajos).
Uno de 4 clubes holandeses cargados en la sesión de onboarding de Países Bajos
como país nuevo (Eredivisie). País 'NL' y liga 'nl-eredivisie' se crean en esta
misma sesión (ver data/leagues.js). clubId 'ajax-nl' (sufijo de país, convención
desde la Versión 129).

FUENTE: `Clubes/Países Bajos/Ajax/jaarverslag-2024-25.md` y
`jaarverslag-2023-24.md` (transcripciones completas vía `pdftotext -layout`,
generadas en esta sesión a partir de los PDF oficiales ya descargados —
jaarverslagen 2023/2024 y 2024/2025, IFRS consolidado). Los PDF SÍ tienen capa
de texto nativa (confirmado con pdffonts/pdftotext, sin necesidad de OCR). Se
cargaron los 2 ejercicios MÁS RECIENTES de los 11 disponibles en el archivo de
Ajax (2013/14-2024/25, falta 2017/18) — priorizando cerrar los 4 clubes del
país con 1-2 años cada uno antes que profundizar el histórico de uno solo, ver
pedido explícito de la sesión.

Ejercicio 2023/2024 (01.07.2023-30.06.2024, cierra 30/6/2024) → clave 2024.
Ejercicio 2024/2025 (01.07.2024-30.06.2025, cierra 30/6/2025) → clave 2025.
Fechas confirmadas en el encabezado de la Geconsolideerde balans/winst- en
verliesrekening de cada .md ("30 juni 2025"/"30 juni 2024" y "2024/2025"/
"2023/2024"), no asumidas del nombre de archivo. Los valores del ejercicio
2023/2024 se tomaron de la columna comparativa del jaarverslag 2024/2025 (no
hay reexpresión por inflación en cuentas holandesas a costo histórico nominal —
verificado cruzando contra el propio jaarverslag 2023/2024, que imprime EXACTO
el mismo número para su propio año corriente: netto-omzet 151.961, Bedrijfs-
resultaat -8.012, Resultaat na belastingen -9.751 en los dos documentos).

FORMATO DEL DOCUMENTO: Geconsolideerde winst-en-verliesrekening bajo IFRS,
esquema "por naturaleza" con 2 líneas de resultado por transferencias
(Afschrijvingen vergoedingssommen = amortización de pases, y Resultaat
vergoedingssommen = resultado NETO de transferencias, ya neteado por el propio
club — el Anhang aclara "de netto-opbrengst uit de verkoop van spelers... onder
aftrek van... transferkosten en de boekwaarde... van de betreffende spelers").
A diferencia de PSV (que sí separa ingreso bruto/costo), Ajax NO desglosa el
bruto — por eso "Resultaat vergoedingssommen" va a `fiscalYearMeta.
profitOnPlayerSales` (club-data-mapping SKILL.md sección 2: un resultado neto
que el documento muestra aparte del cuerpo principal de líneas, no una
revenueLine/expenseLine más).

NETTO-OMZET por categoría (Toelichting nota 25, EUR miles), Voetbal +
no-fútbol, reconcilia exacto contra el total impreso:
                                                   2024/2025   2023/2024
  Recettes competitie, beker, amistosos              9.455       8.179    → matchday_competition
  Recettes Europese competities                     12.533      10.491    → matchday_competition
  Premies Europese competities                      20.752      10.602    → competition_bonus
  Seizoenkaarten                                     14.799      13.741    → season_tickets
  Business-seats en skybox-plaatsen                  23.038      20.911    → season_tickets (paquetes de temporada, no partido por partido)
  Indirecte wedstrijdbaten                            4.440       2.439    → stadium_other
  Partnerships                                       42.460      40.100    → sponsorship_commercial
  Televisie                                          11.724      12.425    → broadcasting
  Merchandising                                      33.408      28.717    → sponsorship_commercial
  Overige baten                                       5.520       4.356    → other_income

GASTOS: Lonen, salarissen en sociale lasten (nota 27) SÍ separa por sector
("Voetbal" vs "Overige") con montos propios — mismo patrón de 2do eje que
Vélez (club-data-mapping/referencia/formato-simplificado.md): "Voetbal" (84.153/78.583, plantel
+ cuerpo técnico/médico) → wages_squad; "Overige" (24.957/23.293, resto del
personal) se sumó a los otros 3 rubros de "Overige bedrijfskosten" (nota 29:
Overige personeelskosten, Huisvestingskosten, Beheer- en administratiekosten)
para formar admin_general_expense — reconcilia exacto: Lonen+Overige
bedrijfskosten = 167.826 (24/25) / 164.610 (23/24) = wages_squad+admin_general+
match_organisation en las 2 columnas. Wedstrijdkosten (nota 29) → categoría
propia match_organisation_expense. Inkoopwaarde omzet (nota 26, costo de
mercadería + operación de ajax.nl/horeca) → other_expenses (sin categoría más
específica, mismo criterio que Materialaufwand de Köln). Afschrijvingen op
vaste activa (nota 28) → depreciation. Afschrijvingen vergoedingssommen (nota
30, amortización de pases) → player_amortisation.

RESULTADO FINANCIERO (netInterest): Waardeverandering deelnemingen (0 los 2
años) + Financiële baten - Financiële lasten + Waardeverandering effecten.
2024/2025: 0 + 8.719 - 10.723 + 916 = -1.088. 2023/2024: 0 + 9.778 - 15.371 +
743 = -4.850.

tax: Belastingen resultaat uit bedrijfsuitoefening (nota 36) — positivo los 2
años (crédito fiscal por resultado negativo): +14.165 (24/25), +3.111 (23/24).

TIE-OUT (verificado exacto contra los totales impresos):
  2024/2025: revenue 178,129 + expenses -238,878 + profitOnPlayerSales 10,333 +
    netInterest -1,088 = -51,504 = Resultaat uit bedrijfsuitoefening vóór
    belastingen impreso exacto; + tax 14,165 = -37,339 = Resultaat na
    belastingen impreso exacto.
  2023/2024: revenue 151,961 + expenses -241,495 + profitOnPlayerSales 81,522 +
    netInterest -4,850 = -12,862 = impreso exacto; + tax 3,111 = -9,751 =
    impreso exacto.

MONEDA: EUR ambos años. El documento no declara tipo de cambio propio a USD —
se usa fxRef a FX_CLOSE (data/currency-map.js), que YA tenía las 2 fechas
necesitadas (EUR@2024-06-30, EUR@2025-06-30) antes de esta carga.

grossDebt: Geconsolideerde balans — Leaseverplichtingen (LT+CT) + Overige
schulden (LT+CT) + Crediteuren + Belastingen en premies sociale verzekeringen
(CT), EXCLUYENDO Belastinglatenties (pasivo por impuesto diferido, análogo a
una previsión) y Overlopende passiva (pasivo devengado/diferido, análogo a
Rechnungsabgrenzungsposten) — mismo criterio angosto que ya usan Boca/Vélez/
Köln (club-data-mapping/referencia/formato-simplificado.md), extendido acá a los pasivos por
lease (el equivalente holandés de deuda financiera, sin línea de préstamo
bancario tradicional en este balance). cash: Liquide middelen.
============================================================================
```

_de data/clubs.js:_

```text
Países Bajos (sesión de esta tanda): PAÍS NUEVO, 4 clubes de Eredivisie, 2 ejercicios cada uno
(2023/2024 y 2024/2025, ambos cierran 30/6). brandColor verificado contra footylogos.com
(color-codes/eredivisie): los 4 clubes tienen rojo como color primario listado (no el blanco
ni el negro que también llevan en el escudo/indumentaria).
```

## 2025

### Gastos

_antes de la fila 3 (`Lonen, salarissen en sociale lasten — Overige + Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten`):_

```text
admin_general_expense = Lonen "Overige" (24.957) + Overige personeelskosten (5.005) +
Huisvestingskosten (7.629) + Beheer- en administratiekosten (20.669) = 58.260.
```

### Meta

```text
Waardeverandering deelnemingen(0) + Financiële baten(8.719) - Financiële lasten(10.723) +
Waardeverandering effecten(916).
grossDebt = Leaseverplichtingen(97.747+5.947) + Overige schulden(23.354+23.205) +
Crediteuren(55.921) + Belastingen en premies sociale verzekeringen(13.085), EXCLUYE
Belastinglatenties(15.877) y Overlopende passiva(31.557). cash = Liquide middelen.
```

## 2024

### Gastos

_antes de la fila 3 (`Lonen, salarissen en sociale lasten — Overige + Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten`):_

```text
admin_general_expense = Lonen "Overige" (23.293) + Overige personeelskosten (8.500) +
Huisvestingskosten (8.434) + Beheer- en administratiekosten (22.707) = 62.934.
```

### Meta

```text
Resultaat vergoedingssommen (nota 31), NETO — el documento no desglosa bruto/costo, ver
comentario de cabecera.
Waardeverandering deelnemingen(0) + Financiële baten(9.778) - Financiële lasten(15.371) +
Waardeverandering effecten(743).
grossDebt = Leaseverplichtingen(102.906+6.260) + Overige schulden(62.281+26.301) +
Crediteuren(89.664) + Belastingen en premies sociale verzekeringen(8.770), EXCLUYE
Belastinglatenties(24.492) y Overlopende passiva(33.345). cash = Liquide middelen.
```

## Gestiones

_antes de Michael Kinsbergen (data/gestiones/nl.js):_

```text
Kinsbergen: algemeen directeur y voorzitter de la directie desde el 26/11/2012; su mandato terminó el 30/6/2015 (hasta = día siguiente, así el cierre 30/6/2015 es suyo).
```

_antes de Dolf Collee (data/gestiones/nl.js):_

```text
Collee: directeur ad interim el 7/9/2015, statutair directeur y directievoorzitter el 13/11/2015; mandato hasta el 11/11/2016.
```

_antes de Edwin van der Sar (data/gestiones/nl.js):_

```text
Van der Sar: directievoorzitter y algemeen directeur desde el 11/11/2016; el 1/6/2023 traspasó sus tareas (el contrato terminó el 1/8/2023).
```

_antes de Jan van Halst (data/gestiones/nl.js):_

```text
Van Halst: algemeen directeur ad interim (titulair) del 1/6/2023 al 14/3/2024 inclusive.
```

_antes de Alex Kroes (data/gestiones/nl.js):_

```text
Kroes: algemeen directeur (statutair) desde el 15/3/2024; desde el 1/5/2024 es technisch directeur (titulair).
```

_antes de Menno Geelen (data/gestiones/nl.js):_

```text
Geelen: algemeen directeur ad interim desde el 10/5/2024; el contrato como titular rige desde el 1/7/2025 (VI, según la prensa).
```

## Fuentes

### ajax-nl-jaarverslag-2024

_note (data/):_

```text
Jaarverslag oficial consolidado (IFRS) de AFC Ajax N.V., descargado del canal público de la KNVB (licencia F.04). PDF con capa de texto nativa. Transcripción completa en Clubes/Países Bajos/Ajax/jaarverslag-2023-24.md.
```

### ajax-nl-jaarverslag-2025

_note (data/):_

```text
Jaarverslag oficial consolidado (IFRS) de AFC Ajax N.V., descargado del canal público de la KNVB (licencia F.04). PDF con capa de texto nativa. Transcripción completa en Clubes/Países Bajos/Ajax/jaarverslag-2024-25.md.
```

## Otros

### gestionesByClub['ajax-nl']

```text
Sin composición de directiva/RvC confirmada con solvencia para todo el período — gestionId
genérico 'actual', sin entrada nominal en gestionesByClub (ya no es obligatorio, ver
club-or-year-onboarding SKILL.md sección 16).
```
