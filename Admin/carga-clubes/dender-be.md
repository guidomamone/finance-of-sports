# dender-be — evidencia de carga

Lo que había como comentario en `data/be/dender-be-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/be/dender-be-data.js — Football Club Verbroedering Dender EH VZW (conocido como
"FCV Dender EH"), Bélgica, clubId 'dender-be'. Cierre 30/6/2025 (ejercicio
1/7/2024-30/6/2025) → clave 2025, mismo criterio que el resto de los clubes belgas.

FUENTE: `Clubes/Bélgica/Dender EH/jaarrekening-2025-06-30-individual.md`. PDF con
capa de texto nativa, formato VKT-VZW (esquema estatutario ABREVIADO de una VZW,
"vereniging zonder winstoogmerk" — asociación sin fines de lucro, no una NV/sociedad
anónima como el resto de los belgas cargados). Auditor/Commissaris no identificado
con nombre en las secciones leídas (el filing es de tipo "micro/klein", sin informe
de auditoría extenso adjunto). Verificado con `pdftotext -layout` y comparado contra
la imagen renderizada de la Resultatenrekening (pág. 5) antes de cargar, porque
el código "73" (Lidgeld, schenkingen, legaten en subsidies) aparece IMPRESO EN
BLANCO en el documento — no es un error de transcripción, el club simplemente no
completó ese código en el filing.

OJO — ESTA ES LA ENTIDAD VZW SOLA, NO EL GRUPO: la nota de "Waarderingsregels"
(pág. 15) dice explícito que en el ejercicio 2025-26 "zal een herstructurering
plaatsvinden waarbij bepaalde activiteiten door NV Dender Foot zullen worden
verdergezet" (ciertas actividades se transferirán a la sociedad comercial NV Dender
Foot) — o sea que esta VZW es la entidad HISTÓRICA/patrimonial (dueña del estadio,
empleadora del plantel), y buena parte del negocio comercial ya convive con una NV
hermana. No hay cuentas consolidadas disponibles.

INGRESOS (Resultatenrekening, pág. 5, EUR): el esquema VKT-VZW abreviado NO
desglosa "Omzet" (código 70) en ningún lado del documento (no hay Nota 6.10 tipo
Charleroi/Anderlecht en este formato) — se carga como lump_football_operations.
  Omzet (código 70): 7.116.234 → lump_football_operations.
  Niet-recurrente bedrijfsopbrengsten (código 76A): 119.704 → other_income.
  Residuo IMPLÍCITO no impreso como línea propia: "Brutomarge" (código 9900,
    4.843.550) es por definición Bedrijfsopbrengsten(70+71+72+74+76A) menos
    Handelsgoederen/diensten (código 60/61, 4.318.796) — despejando:
    Bedrijfsopbrengsten = 4.843.550+4.318.796 = 9.162.346, y como 70+76A =
    7.235.938, el resto (1.926.408) corresponde a códigos 71/72/74 (variación de
    stock/producción propia/otros ingresos operativos), que el esquema VKT-VZW
    abreviado NO imprime como líneas separadas. Se cargó como línea propia
    ("Overige bedrijfsopbrengsten, impliciet in Brutomarge") → other_income, para no
    perder ese monto real (no inventado: es la única cifra consistente con
    Brutomarge + 60/61 impresos), documentado como IMPLÍCITO, no como una línea que
    el club haya identificado con nombre propio. PREGUNTA ABIERTA (ver
    Admin/dudas-por-club.md): a qué corresponde exactamente.
  officialTotalRevenue = 7.116.234+119.704+1.926.408 = 9.162.346 (no es un total
    impreso literal en el documento, es la reconstrucción exacta de
    Bedrijfsopbrengsten que exige la fórmula de Brutomarge, ver arriba).

GASTOS (misma tabla):
  wages_squad = Bezoldigingen, sociale lasten en pensioenen (código 62, -8.269.828,
    sin separar plantel/resto del personal — no hay Nota tipo Vélez con 2do eje).
  depreciation = Afschrijvingen en waardeverminderingen (código 630, -574.659,
    inmateriales + materiales combinado — la Nota 6.1.1/6.1.2 de movimiento de
    activos SÍ separa 241.982 inmaterial + 332.677 material, pero el documento NO
    confirma en ningún lado que "Immateriële vaste activa" sean derechos federativos
    de jugadores, a diferencia de Charleroi/sonderjyske-dk donde sí hay una nota
    explícita — se dejó combinado en depreciation en vez de forzar
    player_amortisation sin esa confirmación; PREGUNTA ABIERTA para
    Admin/dudas-por-club.md).
  exceptional_items = Niet-recurrente bedrijfskosten (código 66A, -37.088).
  other_expenses = Handelsgoederen/diensten (código 60/61, -4.318.796) +
    Waardeverminderingen op vorderingen (código 631/4, -41.123) + Andere
    bedrijfskosten (código 640/8, -36.709) = -4.396.628.
  officialTotalExpenses = 8.269.828+574.659+4.396.628 = 13.241.115, EXCLUYENDO el ítem
  exceptional_items (37.088) — CORREGIDO en la integración: `computeYearGeneric()`
  (js/finanzas-calc.js) excluye `exceptional_items` de `expenses` a propósito (mismo
  criterio "Chelsea" que ya usan Charleroi/Club Brugge/Zulte Waregem), y la versión
  original de este archivo incluía el ítem en `officialTotalExpenses`, desalineándolo del
  cálculo real del motor — detectado por `node tools/audit.js` (`no-cierra`, P0).

RESULTADO FINANCIERO: Financiële opbrengsten (145) - Financiële kosten (623.692) =
  netInterest -623.547.
TAX: Belastingen op het resultaat = -213.846 (código 67/77, SUMA como gasto pese a
  que el club está en pérdida — así lo resta el propio esquema, Winst vóór belasting
  9903 menos 213.846 = Winst 9904).

TIE-OUT (verificado contra pág. 5, código 9904 "Winst (Verlies) van het boekjaar"):
  revenue 9.162.346 - expenses 13.278.203 + netInterest (623.547) + tax (213.846) =
  -4.953.250, contra -4.953.248 impreso — diferencia de EUR 2, redondeo del propio
  documento (el mismo tipo de diferencia de EUR 1-2 ya documentado en
  charleroi-be/anderlecht-be, no es error de carga: "Bedrijfswinst" 9901 impreso
  (-4.115.855) también difiere en EUR 2 de la suma exacta de sus propias líneas
  componentes, -4.115.857).

MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en data/currency-map.js).

grossDebt: Schulden op meer dan één jaar - Overige leningen (21.682.470, deuda con
  accionistas/partes relacionadas según Nota 6.6: "RC Belinda Siahaan - vaste
  vertegenwoordigd van Dender Foot NV") — no hay deuda financiera de corto plazo
  separada (Kredietinstellingen/Overige leningen ≤1 año en 0). cash: Liquide
  middelen = 44.976.

GESTIÓN: 4 bestuurders listados (De Bolster Els, Verbeken Rik, Sitorus Sihar, Dender
  Foot representado por Siahaan Belinda) sin un cargo de "voorzitter"/presidente
  marcado en la lista → gestionId: null, sin entrada en gestionesByClub.
============================================================================
```

## 2025

### Meta

```text
Financiële opbrengsten(0.000145) - Financiële kosten(0.623692).
Belastingen op het resultaat (código 67/77), resta pese a estar en pérdida.
grossDebt = Schulden op meer dan één jaar - Overige leningen (deuda con partes
relacionadas, Nota 6.6). cash = Liquide middelen.
```

## Gestiones

_antes de André Van Roy (data/gestiones/be.js):_

```text
Van Roy: voorzitter de la vzw; el informe más antiguo (ejercicio 2008) ya lo lista así y sigue hasta que el consejo cambió el 30/1/2018 (nuevos dueños de Indonesia).
El inicio real no se conoce: desde = inicio del ejercicio 2008.
```

_antes de Sihar Sitorus (data/gestiones/be.js):_

```text
Sitorus: dueño (Wikipedia). El 30/1/2018 entró el grupo indonesio (Belinda Siahaan, gedelegeerd bestuurder desde esa fecha, y Denderfoot NV);
Sitorus figura en el consejo desde el 3/6/2019. La fecha de compra se toma del cambio de consejo (aproximada).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Bélgica/Dender EH/jaarrekening-2023-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Dender EH/jaarrekening-2023-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Brutomarge | pág. 5, Jev 0.91 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bezoldigingen, sociale lasten en pensioenen | pág. 5, precedente |
| 2 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 5, precedente |
| 3 | Andere bedrijfskosten | pág. 5, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): be-challengerproleague, verificado contra roster cacheado de "2022–23 Challenger Pro League" (tools/club-league-reference/be.json), coincidencia exacta "Dender EH".
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Bélgica/Dender EH/jaarrekening-2020-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Dender EH/jaarrekening-2020-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 6, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, precedente |
| 2 | 620 | pág. 13, precedente |
| 3 | 621 | pág. 13, precedente |
| 4 | 623 | pág. 13, precedente |
| 5 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 6, precedente |
| 6 | Andere bedrijfskosten | pág. 6, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): be-div1amateur, verificado contra roster cacheado de "2019–20 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Dender EH".
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Bélgica/Dender EH/jaarrekening-2019-06-30-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Dender EH/jaarrekening-2019-06-30-individual.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 7, Claude 0.8 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 7, Jev 0.97 |
| 2 | 620 | pág. 13, Jev 0.96 |
| 3 | 621 | pág. 13, Jev 0.97 |
| 4 | 623 | pág. 13, Jev 0.99 |
| 5 | Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa | pág. 7, Jev 0.97 |
| 6 | Voorzieningen voor risico's en kosten: toevoegingen (bestedingen en terugnemingen) | pág. 7, Jev 0.98 |
| 7 | Andere bedrijfskosten | pág. 7, Claude 0.93 |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): be-div1amateur, verificado contra roster cacheado de "2018–19 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Dender EH".
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Bélgica/Dender EH/jaarrekening-2017-06-30-individual-correction.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Bélgica/Dender EH/jaarrekening-2017-06-30-individual-correction.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Bedrijfsopbrengsten | pág. 6, Claude 0.8 |
| 2 | Uitzonderlijke opbrengsten | pág. 6, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Handelsgoederen, grond- en hulpstoffen, diensten en diverse goederen | pág. 6, Jev 0.97 |
| 2 | 620 | pág. 13, Jev 0.96 |
| 3 | 621 | pág. 13, Jev 0.97 |
| 4 | 623 | pág. 13, Jev 0.99 |
| 5 | Andere bedrijfskosten | pág. 6, Claude 0.93 |
| 6 | Uitzonderlijke kosten | pág. 6, Jev 1 |
| 7 | Afschrijvingen materiële vaste activa | pág. 6, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

### Liga

```text
tools/cargar.mjs (2026-10-25): be-div1amateur, verificado contra roster cacheado de "2016–17 Belgian First Amateur Division" (tools/club-league-reference/be.json), coincidencia exacta "Dender EH".
```

## Fuentes

### dender-be-jaarrekening-2025

_note (data/):_

```text
Cuentas de la VZW (asociación sin fines de lucro) individual, NO consolidadas con NV Dender Foot (sociedad comercial hermana que, per nota de la propia jaarrekening, absorberá parte de la actividad desde el ejercicio 2025-26). Esquema estatutario ABREVIADO (VKT-VZW): no desglosa Omzet por categoría de ingreso, a diferencia del esquema completo de otros clubes belgas cargados. PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Dender EH/jaarrekening-2025-06-30-individual.md.
```

### dender-be-jaarrekening-2017-06-30-individual-correction

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Bélgica/Dender EH/jaarrekening-2017-06-30-individual-correction.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### dender-be-jaarrekening-2019-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Bélgica/Dender EH/jaarrekening-2019-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### dender-be-jaarrekening-2023-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Bélgica/Dender EH/jaarrekening-2023-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### dender-be-jaarrekening-2020-06-30-individual

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Bélgica/Dender EH/jaarrekening-2020-06-30-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
