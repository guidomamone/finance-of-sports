# cerclebrugge-be — evidencia de carga

Lo que había como comentario en `data/be/cerclebrugge-be-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/be/cerclebrugge-be-data.js — Cercle Brugge KSV (BV, Bélgica). Uno de 3
clubes belgas + 1 danés cargados en esta sesión (2da tanda de onboarding,
20 transcripts más, 4 clubes totalmente nuevos). Propiedad de AS Monaco FC
SAM (accionista mayoritario, parte de la red multi-club de Monaco).

FUENTE: `Clubes/Bélgica/Cercle Brugge/jaarrekening-2025-06-30-individual.md`
(única versión disponible, cuentas INDIVIDUALES, no hay consolidado). Cierre
30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto
nativa. Esquema estatutario belga "VOL-inb" (BV/sociedad de responsabilidad
limitada), en neerlandés.

INGRESOS (Resultatenrekening pág. 8 + Nota 6.10 pág. 24, EUR):
  Omzet (turnover, código 70) — Nota 6.10 tiene los encabezados
    "Uitsplitsing per bedrijfscategorie"/"per geografische markt" sin
    ningún valor completado debajo (mismo caso que Sint-Truiden/Zulte
    Waregem)                                                   19.306482 → lump_football_operations
  Andere bedrijfsopbrengsten (código 74, total 24.416750, subió desde
    18.161444 el ejercicio anterior) — la Nota 6.10 solo completa el
    sub-ítem de subsidios (740, apenas 1.619 EUR); el resto (99,99% de esta
    línea, 56% del revenue total del club) queda SIN explicar en el cuerpo
    de notas. Este club es propiedad de AS Monaco FC SAM (Nota 6.15,
    "Betrekkingen met verbonden ondernemingen") y funciona como parte de su
    red de desarrollo/venta de jugadores, así que es plausible que incluya
    resultado de transferencias — pero el documento NO lo confirma para
    ESTE ejercicio: la única mención textual de "transferactiviteiten" (Nota
    6.14, pág. 31, "Netto gerealiseerde meerwaarden n.a.v.
    transferactiviteiten tijden de zomermercato 2025: 6.634.214") es un
    HECHO POSTERIOR AL CIERRE (mercato de verano 2025, después del
    30/6/2025), explícitamente fuera de este P&L. Se categoriza
    conservadoramente como other_income, no player_sales, y se anota como
    PREGUNTA ABIERTA en Admin/dudas-por-club.md:
    - Exploitatiesubsidies en vanwege de overheid ontvangen compenserende
      bedragen (740, disclosed)                                  0.001619 → other_income
    - Resto sin desglosar (24.416750-0.001619)                  24.415131 → other_income
  Niet-recurrente bedrijfsopbrengsten (76A): 0 este ejercicio, no se carga línea.
Total revenueLines: 19.306482+0.001619+24.415131 = 43.723232 vs.
  "Bedrijfsopbrengsten" (70/76A) impreso 43.723.231, diferencia de EUR 1,
  redondeo.

PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md, prioridad alta dado
el tamaño): a qué corresponde el residuo sin desglosar de "Andere
bedrijfsopbrengsten" (24,4 M EUR, 56% del revenue) — si incluye resultado
de transferencias REALIZADAS dentro de este mismo ejercicio (distinto del
hecho posterior de la Nota 6.14) o es otra cosa.

GASTOS (Resultatenrekening pág. 8 + Notas 6.2.3/6.3.1-6.3.3/6.3.5 pág.
12-16 + Nota 6.10 pág. 24-25):
  Handelsgoederen, grond- en hulpstoffen (código 60, compras 719980 +
    variación de stock 73637)                                  -0.793617 → other_expenses
  Diensten en diverse goederen (código 61, sin más desglose)   -14.011456 → other_expenses
  Bezoldigingen, sociale lasten en pensioenen (código 62, todo el personal
    de la sociedad — 72 empleados/64,4 FTE, sin separar plantel de resto,
    Nota 6.10)                                                -19.290772 → wages_squad
    items: Bezoldigingen y ventajas sociales directas 15.983999 +
      Contribuciones patronales seg. social 2.406575 + Premias seguros
      extralegales 0.751715 + Otros costos de personal 0.148483
  Afschrijvingen (código 630, total P&L 3.347557) — la suma de "Geboekt"
    del movimiento de activos fijos (Notas 6.2.3/6.3.1-3/6.3.5: intangible
    2.820298 + tangible 0.286824+0.049552+0.096563+0.041915=0.474854, total
    3.295152) NO reconcilia exacto contra el total impreso (diferencia de
    52.405 EUR, ~1,6% — no se encontró la línea que explique la diferencia
    en las notas disponibles, posible waardevermindering adicional no
    desglosada). Se usa el "Geboekt" de intangibles (confiable, reconcilia
    exacto contra la evolución del valor neto en libros de esa nota) para
    player_amortisation, y el RESTO por diferencia (no la suma de notas de
    activo tangible) para depreciation, para que el total cierre exacto
    contra el código 630 impreso:
    - Amortización spelersregistratierechten (intangibles, Geboekt 8072)
                                                                -2.820298 → player_amortisation
    - Depreciación activo material + diferencia sin explicar (residuo)
                                                                -0.527259 → depreciation
  Waardeverminderingen op voorraden/handelsvorderingen (código 631/4,
    Geboekt sobre handelsvorderingen, Nota 6.10 código 9112)     -0.003500 → other_expenses
  Voorzieningen voor risico's en kosten (código 635/8, -89.665 IDÉNTICO en
    ambos ejercicios — un neto crédito recurrente, Toevoegingen 34.687 -
    Bestedingen/terugnemingen 124.352, Nota 6.10) — mismo código/criterio
    que Zulte Waregem/Charleroi (provisión → exceptional_items)   0.089665 → exceptional_items
  Andere bedrijfskosten (código 640/8, total 269.439) — Nota 6.10 pág. 25
    desglosa 640 (Bedrijfsbelastingen) = 269.439 y 641/8 (Andere) = 0 este
    ejercicio (impuestos SIEMPRE admin_general_expense, club-data-mapping/referencia/casos-por-pais-y-formato.md):
    - Bedrijfsbelastingen en -taksen (640)                      -0.269439 → admin_general_expense
  Niet-recurrente bedrijfskosten (código 66A, 6.012.965, todo bajo el
    código 6690 "Andere niet-recurrente bedrijfskosten" según Nota 6.12,
    sin más desglose textual disponible) — mismo criterio que 76A del lado
    de ingresos: forma parte del cuerpo de Bedrijfskosten, se categoriza
    exceptional_items                                          -6.012965 → exceptional_items
Total expenseLines: -43.639641, exacto contra "Bedrijfskosten" (60/66A)
  impreso (43.639.641).

PREGUNTA ABIERTA #2 (anotada en Admin/dudas-por-club.md): a qué corresponde
el "Niet-recurrente bedrijfskosten" de 6,0 M EUR (código 66A, 17% del gasto
total) — el documento no lo explica en prosa en ningún lado.

RESULTADO FINANCIERO (netInterest): Financiële opbrengsten (75/76B, 0.266891:
  751 Opbrengsten uit vlottende activa 0.266442 + 752/9 Andere 0.000449) -
  Financiële kosten (65/66B, 0.097869: 650 Kosten van schulden 0.082174 +
  652/9 Andere 0.015695) = 0.266891 - 0.097869 = 0.169022.

TAX: Belastingen op het resultaat (código 67/77, todo en 670/3, sin
  regularización ni movimiento de impuestos diferidos este ejercicio —
  780/680 en blanco) → tax = -0.162946.

TIE-OUT (verificado exacto contra los 4 subtotales impresos, pág. 8-9):
  Bedrijfsopbrengsten 43.723231 - Bedrijfskosten 43.639641 = Bedrijfswinst
  0.083590 (código 9901, exacto). 0.083590 + netInterest(0.169022) =
  0.252612 = Winst vóór belasting (código 9903, exacto). 0.252612 -
  tax(0.162946) = 0.089666 ≈ Winst van het boekjaar impreso (códigos
  9904/9905: 89.666, exacto) → officialPAT.
  officialTotalRevenue no cambia (no hay exceptional_items en ingresos este
  ejercicio, 76A=0). officialTotalExpenses EXCLUYE los 2 ítems
  exceptional_items (+0.089665 crédito de 635/8, -6.012965 de 66A, neto
  -5.923300), mismo criterio que Zulte Waregem/Sint-Truiden/Charleroi/Club
  Brugge: officialTotalExpenses = 43.639641 - 5.923300 = 37.716341.

MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).

grossDebt: "Schulden op meer dan één jaar" (7.000326) + "Schulden op ten
hoogste één jaar" (12.177282) = 19.177608, EXCLUYENDO "Overlopende
rekeningen" (0.886693, ingresos diferidos/gastos a pagar, sub-categoría
separada dentro de Schulden en este balance, pág. 7) — mismo criterio que
el resto de los belgas de esta sesión. cash: "Liquide middelen" (código
54/58, 6.900418). Total activa = Total pasiva = 29.137227 (balance cuadra).

CONTEXTO: la Nota 6.14 (pág. 31-32) revela dos hechos NO reflejados en este
P&L/balance: (1) condonación CONDICIONAL de deuda por 52.764.886 EUR de su
controlante AS Monaco FC SAM, con cláusula resolutoria de reactivación si
mejora la situación de la sociedad (fuera de balance, no se carga); (2)
plusvalías netas de transferencias por 6.634.214 EUR realizadas en el
mercado de pases de VERANO 2025, hecho posterior al cierre (30/6/2025), no
se carga en este ejercicio.

GESTIÓN: el listado de administradores (pág. 2) tiene un "Gedelegeerd
bestuurder" pero SIN un "Voorzitter" explícito identificado → gestionId:
null, sin entrada en gestionesByClub (ver club-or-year-onboarding sección
16: ya no es obligatorio inventar una entrada solo por robustez técnica).
============================================================================
```

## 2025

### Meta

```text
Financiële opbrengsten (0.266891) - Financiële kosten (0.097869).
Belastingen op het resultaat (670/3), sin movimiento de diferidos este ejercicio.
grossDebt = Schulden op meer dan één jaar + Schulden op ten hoogste één jaar, EXCLUYE
Overlopende rekeningen. cash = Liquide middelen.
officialTotalExpenses EXCLUYE los 2 ítems exceptional_items (neto -5.923300), mismo
criterio que Zulte Waregem/Sint-Truiden/Charleroi/Club Brugge.
```

## Gestiones

_antes de Frans Schotte (data/gestiones/be.js):_

```text
Sin dueño persona (AS Monaco compró la mayoría de la cvba el 5/5/2017). Presidentes según la lista de Wikipedia, solo año (01-01).
Goemaere ya figura como voorzitter el 22/4/2020 (Sporza), antes del cierre del 30/6/2020. Tousseyn: la fuente da solo 2023; el ejercicio 2023 depende de ese año.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Bélgica/Cercle Brugge/jaarrekening-2019-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Cercle Brugge/jaarrekening-2019-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Omzet | pág. 7, precedente |
| 2 | Andere bedrijfsopbrengsten | pág. 7, Jev 0.94 |
| 3 | Niet-recurrente bedrijfsopbrengsten | pág. 7, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Aankopen | pág. 7, Claude 0.85 |
| 2 | Voorraad: afname (toename) (+)/(-) | pág. 7, Jev 1 |
| 3 | Diensten en diverse goederen | pág. 7, precedente |
| 4 | 620 | pág. 20, Jev 0.96 |
| 5 | 621 | pág. 20, Jev 0.97 |
| 6 | 623 | pág. 20, Jev 0.95 |
| 7 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 7, precedente |
| 8 | Waardeverminderingen op voorraden, op bestellingen in uitvoering en op handelsvorderingen: toevoegingen (terugnemingen) (+)/(-) | pág. 7, Jev 0.99 |
| 9 | Voorzieningen voor risico's en kosten: toevoegingen (bestellingen en terugnemingen) (+)/(-) | pág. 7, Jev 0.99 |
| 10 | 640 | pág. 20, Claude 0.85 |
| 11 | 641/8 | pág. 20, Jev 0.96 |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): be-proleague, verificado contra roster cacheado de "2018–19 Belgian First Division A" (tools/club-league-reference/be.json), coincidencia exacta "Cercle Brugge".
```

## Fuentes

### cerclebrugge-be-jaarrekening-2025

_note (data/):_

```text
Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB), esquema estatutario VOL-inb. PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Cercle Brugge/jaarrekening-2025-06-30-individual.md. Propiedad de AS Monaco FC SAM. "Andere bedrijfsopbrengsten" (24,4 M EUR, 56% del revenue) casi no tiene desglose disponible en el documento; ver comentario de cabecera del archivo de datos y Admin/dudas-por-club.md. Nota 6.14 revela una condonación de deuda condicional de 52,8 M EUR de AS Monaco (fuera de balance) y plusvalías de transferencias de 6,6 M EUR del mercado de pases de verano 2025 (hecho posterior al cierre), ninguna de las dos cargadas en este ejercicio.
```

### cerclebrugge-be-jaarrekening-2019-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Bélgica/Cercle Brugge/jaarrekening-2019-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
