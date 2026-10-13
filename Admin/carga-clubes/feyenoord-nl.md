# feyenoord-nl — evidencia de carga

Lo que había como comentario en `data/feyenoord-nl-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/feyenoord-nl-data.js — Feyenoord Rotterdam N.V. (Róterdam, Países Bajos).
Uno de 4 clubes holandeses cargados en la sesión de onboarding de Países Bajos
como país nuevo (Eredivisie). Ver data/ajax-nl-data.js para el contexto
compartido de la tanda.

FUENTE: `Clubes/Países Bajos/Feyenoord/jaarverslag-2024-25.md` y
`jaarverslag-2023-24.md` (transcripciones completas vía `pdftotext -layout`,
PDF con capa de texto nativa). Se cargaron los 2 ejercicios MÁS RECIENTES de
los 7 disponibles en el archivo de Feyenoord (serie completa 2018/19-2024/25).

Ejercicio 2023/2024 (cierra 30/6/2024) → clave 2024. Ejercicio 2024/2025
(cierra 30/6/2025) → clave 2025. Valores de 2023/2024 tomados de la columna
comparativa del jaarverslag 2024/2025, verificados EXACTOS contra el propio
jaarverslag 2023/2024 (netto omzet 125.675, Resultaat na belastingen 9.547 en
los 2 documentos — cuentas holandesas a costo histórico nominal).

FORMATO DEL DOCUMENTO: Geconsolideerde winst- en verliesrekening. La sección de
transferencias tiene 3 líneas ("Afschrijvingen en bijzondere
waardeverminderingen vergoedingssommen" = amortización+deterioro combinados de
pases, "Afschrijvingen goodwill", "Resultaat vergoedingssommen" = ingreso por
transferencias) más una fila "Spelersresultaat" que es SOLO el subtotal
visual de esas 3 (verificado: -54.968+0+60.334 = 5.366 exacto, no una 4ta
línea a sumar aparte). "Resultaat vergoedingssommen" se cargó como
revenueLine `player_sales` (ingreso), "Afschrijvingen en bijzondere
waardeverminderingen vergoedingssommen" como expenseLine `player_amortisation`
(el documento no separa amortización de deterioro, van juntos en una sola
línea) y "Afschrijvingen goodwill" como `other_amortisation`.

NETTO-OMZET por categoría (Toelichting nota 3.1, EUR miles), reconcilia exacto:
                                                         2024/2025   2023/2024
  Wedstrijdopbrengsten                                    97.311      67.316   → matchday_competition (incluye recaudación + premios de competencia, el club no los separa)
  Partnerships, business seats, units en boarding         45.238      39.593   → sponsorship_commercial (línea MIXTA sin desglose disponible: junta sponsors/publicidad de valla con paquetes de temporada premium — ver duda anotada en Admin/dudas-por-club.md)
  Mediabaten                                              11.716      10.895   → broadcasting
  Merchandising & Business to Consumer activiteiten        4.544       3.539   → sponsorship_commercial
  Overige baten                                            1.648       4.332   → other_income

GASTOS: Lonen, salarissen en sociale lasten (nota 3.2.2) no separa por sector
→ todo a wages_squad. Overige bedrijfskosten (nota 3.2.3) sí se desglosa:
Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten
→ admin_general_expense; Wedstrijdkosten → match_organisation_expense propio.
Kostprijs van de omzet → other_expenses. Afschrijvingen materiële vaste activa
→ depreciation.

RESULTADO FINANCIERO (netInterest): Financiële baten en lasten, ya neto en el
documento (nota 3.2.4). 2024/2025: -433. 2023/2024: -1.982.

tax: Belastingen resultaat uit gewone bedrijfsuitoefening (nota 3.2.5).
2024/2025: -8.017. 2023/2024: -3.756.

TIE-OUT (verificado exacto contra los totales impresos):
  2024/2025: revenue (160,457 netto omzet + 60,334 resultaat vergoedingssommen)
    = 220,791; expenses -189,286 (incluye afschrijvingen vergoedingssommen y
    goodwill); operatingProfit 31,505 = Bedrijfsresultaat impreso exacto; +
    netInterest -0,433 = 31,072 = Resultaat voorbelastingen impreso exacto; +
    tax -8,017 = 23,055 = RESULTAAT NA BELASTINGEN impreso exacto.
  2023/2024: revenue (125,675 + 39,729) = 165,404; expenses -150,119;
    operatingProfit 15,285 = impreso exacto; + netInterest -1,982 = 13,303 =
    impreso exacto; + tax -3,756 = 9,547 = impreso exacto.

MONEDA: EUR ambos años, fxRef a FX_CLOSE (mismas 2 fechas ya usadas por Ajax/PSV).

grossDebt (balance consolidado): Schulden aan kredietinstellingen (LT+CT) +
Transferverplichtingen (LT+CT) + Belastingen en premies sociale verzekeringen
(LT+CT) + Crediteuren + Schulden aan participanten + Schulden aan verbonden
partijen + Schuld inzake pensioenen + Overige schulden (CT), EXCLUYENDO
Voorziening latente belastingen (impuesto diferido) y Overlopende passiva —
mismo criterio angosto que Ajax/PSV/Köln. cash: Liquide middelen (nota que
30/6/2024 = EUR 62 mil, extraordinariamente bajo, tal cual imprime el
documento — no es un error de transcripción).
============================================================================
```

## 2025

### Gastos

_antes de la fila 3 (`Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten`):_

```text
admin_general_expense = Overige personeelskosten(4.399) + Huisvestingskosten(8.791) +
Beheer- en administratiekosten(13.290) = 26.480.
```

### Meta

```text
grossDebt = Schulden aan kredietinstellingen(13.850+7.415) + Transferverplichtingen
(12.241+29.926) + Belastingen en premies(4.796+16.761) + Crediteuren(7.222) + Schulden aan
participanten(653) + Schulden aan verbonden partijen(33) + Schuld inzake pensioenen(155) +
Overige schulden(20.304), EXCLUYE Voorziening latente belastingen(4.761) y Overlopende
passiva(29.951).
```

## 2024

### Gastos

_antes de la fila 3 (`Overige personeelskosten + Huisvestingskosten + Beheer- en administratiekosten`):_

```text
admin_general_expense = Overige personeelskosten(2.018) + Huisvestingskosten(8.500) +
Beheer- en administratiekosten(11.376) = 21.894.
```

### Meta

```text
grossDebt (balance consolidado) = Schulden aan kredietinstellingen(15.078+5.571) +
Transferverplichtingen(15.192+16.745) + Belastingen en premies(7.878+8.407) +
Crediteuren(8.557) + Schulden aan participanten(979) + Schulden aan verbonden
partijen(8) + Schuld inzake pensioenen(141) + Overige schulden(19.225), EXCLUYE
Voorziening latente belastingen(305) y Overlopende passiva(22.945). cash = Liquide middelen.
```
