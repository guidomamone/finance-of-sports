# psv-nl — evidencia de carga

Lo que había como comentario en `data/psv-nl-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/psv-nl-data.js — PSV N.V. (Eindhoven, Países Bajos).
Uno de 4 clubes holandeses cargados en la sesión de onboarding de Países Bajos
como país nuevo (Eredivisie). Ver data/ajax-nl-data.js para el contexto
compartido de la tanda (país/liga nuevos, convención de clubId).

FUENTE: `Clubes/Países Bajos/PSV/jaarverslag-2024-25.md` y
`jaarverslag-2023-24.md` (transcripciones completas vía `pdftotext -layout`,
PDF con capa de texto nativa, sin necesidad de OCR). Se cargaron los 2
ejercicios MÁS RECIENTES de los 9 disponibles en el archivo de PSV (serie
completa 2016/17-2024/25).

Ejercicio 2023/2024 (cierra 30/6/2024) → clave 2024. Ejercicio 2024/2025
(cierra 30/6/2025) → clave 2025. Valores de 2023/2024 tomados de la columna
comparativa del jaarverslag 2024/2025, verificados EXACTOS contra el propio
jaarverslag 2023/2024 (netto-omzet 152.128, Bedrijfsresultaat 13.909, Resultaat
na belastingen 9.651 en los 2 documentos — cuentas holandesas a costo
histórico nominal, sin reexpresión).

FORMATO DEL DOCUMENTO: Geconsolideerde winst- en verliesrekening, esquema por
naturaleza. A DIFERENCIA de Ajax, PSV SÍ desglosa el resultado de
transferencias en sus 3 componentes brutos: "Vergoedingssommen" (ingreso bruto
por venta/traspaso de jugadores), "Afschrijving op vergoedingssommen"
(amortización del valor en libros de los pases) y "Bijzondere
waardeverminderingen" (deterioro de pases) — por eso acá SÍ se cargan como
revenueLine/expenseLine propias (player_sales/player_amortisation/
player_impairment), no como profitOnPlayerSales neto en meta (club-data-mapping
SKILL.md sección 1: promover a líneas de primer nivel cuando el documento
SÍ separa los componentes).

NETTO-OMZET por categoría (Toelichting nota 20, EUR miles), reconcilia exacto:
                                                2024/2025   2023/2024
  Recettes competitie en KNVB beker                4.398       4.099   → matchday_competition
  Recettes Europees voetbal                        8.778       7.833   → matchday_competition
  Seizoen Club Cards (inclusief All-in)            13.676      11.396   → season_tickets
  Premies Europees voetbal                        65.085      51.286   → competition_bonus
  Overige wedstrijdopbrengsten                      1.194       1.367   → stadium_other
  Partnerships                                     41.012      38.157   → sponsorship_commercial
  Merchandising                                    11.274      10.342   → sponsorship_commercial
  Media                                            15.039      11.034   → broadcasting
  Stadionexploitatie                                5.155       9.030   → stadium_other
  Overige opbrengsten                               5.231       7.584   → other_income

GASTOS: Lonen, salarissen en sociale lasten (nota 21) NO separa por sector
(a diferencia de Ajax) — toda la masa salarial va a wages_squad. Overige
bedrijfskosten (nota 22) SÍ se desglosa: Overige personeelskosten +
Huisvestingskosten + Beheerskosten → admin_general_expense; Wedstrijdkosten →
match_organisation_expense propio. Kostprijs van de omzet → other_expenses.
Afschrijvingen op materiële vaste activa → depreciation.

RESULTADO FINANCIERO (netInterest): Renteresultaat (nota 23) = Rentebaten -
Rentelasten. 2024/2025: 2.259 - 3.168 = -909. 2023/2024: 2.379 - 3.118 = -739.

tax: Belastingen (nota 24). ATENCIÓN: en la transcripción por `pdftotext
-layout` del bloque "Resultaat uit gewone bedrijfsuitoefening voor
belastingen"/"Belastingen" las 2 columnas salieron en orden INVERTIDO (un
artefacto de layout de esa página puntual, columnas numéricas muy pegadas) —
se confirmó el valor real de cada año recalculando PBT = Bedrijfsresultaat +
Renteresultaat y PAT = PBT + tax contra los totales impresos (Resultaat na
belastingen 7.548/9.651), y cruzando además contra el detalle de nota 24
("Feitelijke belastinglast -2.554 25,3%" 2024/2025, "-3.519 26,7%" 2023/2024).
tax 2024/2025 = -2.554; tax 2023/2024 = -3.519.

TIE-OUT (verificado exacto contra los totales impresos):
  2024/2025: revenue (170,842 netto-omzet + 23,676 vergoedingssommen) =
    194,518; expenses -183,507; operatingProfit 11,011 = Bedrijfsresultaat
    impreso exacto; + netInterest -0,909 = 10,102 = Resultaat uit gewone
    bedrijfsuitoefening vóór belastingen impreso exacto; + tax -2,554 = 7,548 =
    Resultaat na belastingen impreso exacto.
  2023/2024: revenue (152,128 + 31,250) = 183,378; expenses -169,469;
    operatingProfit 13,909 = impreso exacto; + netInterest -0,739 = 13,170 =
    impreso exacto; + tax -3,519 = 9,651 = impreso exacto.

MONEDA: EUR ambos años, fxRef a FX_CLOSE (mismas 2 fechas ya usadas por Ajax).

grossDebt (balance CONSOLIDADO, no el enkelvoudig/standalone): Achtergestelde
leningen (préstamo subordinado, deuda financiera real) + Schulden uit hoofde
van transfers (deudas por traspasos) + Overige schulden (LT+CT) + Belastingen
en premies sociale verzekeringen (LT+CT) + Aflossingsverplichting langlopende
schulden + Crediteuren, EXCLUYENDO Voorzieningen (previsiones) y Overlopende
passiva (pasivo devengado/diferido) — mismo criterio angosto que Ajax/Köln.
cash: Liquide middelen (balance consolidado).
============================================================================
```

## 2025

### Gastos

_antes de la fila 3 (`Overige personeelskosten + Huisvestingskosten + Beheerskosten`):_

```text
admin_general_expense = Overige personeelskosten(5.555) + Huisvestingskosten(12.267) +
Beheerskosten(20.464) = 38.286.
```

### Meta

```text
grossDebt = Achtergestelde leningen(45.000) + Schulden uit hoofde van transfers(21.368) +
Overige schulden(296+32.750) + Belastingen en premies(0+6.964) + Aflossingsverplichting(207)
+ Crediteuren(34.242), EXCLUYE Voorzieningen(6.250) y Overlopende passiva(22.770).
```

## 2024

### Gastos

_antes de la fila 3 (`Overige personeelskosten + Huisvestingskosten + Beheerskosten`):_

```text
admin_general_expense = Overige personeelskosten(5.082) + Huisvestingskosten(12.234) +
Beheerskosten(20.347) = 37.663.
```

### Meta

```text
grossDebt (balance consolidado) = Achtergestelde leningen(45.100) + Schulden uit hoofde van
transfers(31.760) + Overige schulden(404+35.000) + Belastingen en premies(12.820+12.902) +
Aflossingsverplichting(202) + Crediteuren(25.203), EXCLUYE Voorzieningen(6.006) y
Overlopende passiva(28.182). cash = Liquide middelen (consolidado).
```

## Gestiones

_antes de Toon Gerbrands (data/gestiones/nl.js):_

```text
Gerbrands: algemeen directeur desde el 1/7/2014 (sucedió a Tiny Sanders); dejó el cargo al final de la temporada 2021/22.
```

_antes de Marcel Brands (data/gestiones/nl.js):_

```text
Brands: anunciado el 14/2/2022 para entrar "después de esta temporada"; 1/7/2022 aproximado.
```
