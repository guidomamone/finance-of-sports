# clubbrugge-be — evidencia de carga

Lo que había como comentario en `data/be/clubbrugge-be-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/be/clubbrugge-be-data.js — Club Brugge KV (Bélgica). Uno de 4 clubes belgas
de la Pro League cargados en esta sesión (onboarding de Bélgica como país
nuevo): Club Brugge, Anderlecht, Genk, Gent.

FUENTE: `Clubes/Bélgica/Club Brugge/jaarrekening-2025-06-30-consolidado.md`
(transcripción del jaarrekening GECONSOLIDEERD — cuentas de GRUPO, en IFRS —
preferida sobre la versión `-individual` disponible para el mismo año, según
el criterio de la tarea: preferir siempre consolidado cuando exista). Cierre
30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. El PDF tiene capa de
texto nativa.

FORMATO DEL DOCUMENTO: a diferencia de Anderlecht/Genk/Gent (que solo
tuvieron individual, formato estatutario belga VOL-kap/VOL-VZW con "codes"),
las cuentas consolidadas de Club Brugge están en IFRS puro, con un P&L
(Geconsolideerde resultatenrekening, pág. 10) MUCHO más desglosado — Nota 20
separa explícitamente Wedstrijdopbrengsten/Mediarechten/Commerciële/Overige,
y notas 21-24 desglosan cada línea de gasto. Esto la hace la fuente más rica
de las 4 y la plantilla natural para las otras 3.

INGRESOS (P&L pág. 10, en €'000, reproducidos acá tal cual — ej. "27.588"
del documento = 27.588 millones EUR):
  Wedstrijdopbrengsten (matchday)                         27.588 → matchday_competition
  Opbrengsten uit mediarechten (media rights)              74.117 → broadcasting
    Nota 20.2: Binnenlands (doméstico) 12.968 + Europees (UCL/UEL) 61.149
  Commerciële opbrengsten (comercial/sponsors)             18.784 → sponsorship_commercial
  Overige opbrengsten (Nota 20.4: honorarios de selecciones
    nacionales a jugadores cedidos + canon de Cercle Brugge
    por compartir el Jan Breydel — mezclado, no se puede separar)  1.778 → other_income
  Meerwaarde bij de overdracht van spelersregistratierechten
    (ganancia BRUTA por venta de pases, sin netear contra la
    pérdida del lado de gastos — igual criterio que Boca/Racing)  31.658 → player_sales
  Overige bedrijfsopbrengsten (Nota 21: Lidgeld/cuotas 0.044 +
    Giften/donaciones 0.030 + Overige 0.198)                       0.272 → other_income
Total: 154.197 vs 154.196 impreso (diferencia de 1.000 EUR, redondeo).

GASTOS (P&L pág. 10 + Nota 22 "Overige bedrijfskosten", pág. 56):
  Aankoop van materialen (compra de materiales/insumos)    -4.985 → other_expenses
  "Overige bedrijfskosten" (-29.319 en el P&L) se PROMOVIÓ a 2 líneas de
  primer nivel según la Nota 22 (mismo criterio de club-data-mapping SKILL.md
  sección 1: sub-ítems con categoría real distinta se promueven, no se
  entierran en `items`):
    Organización/viajes/hoteles (Organisatie+Reiskosten+Hotels)  -13.693 → match_organisation_expense
    Administración/alquiler/consulting/interim/impuestos        -15.625 → admin_general_expense
    (suma 29.318 vs 29.319 impreso, redondeo de 1.000 EUR)
  Lonen van spelers en kosten van technische staf (plantel+CT) -48.075 → wages_squad
    (Nota 23 tiene un desglose de sub-ítems que NO reconcilia exacto contra
    el total — diferencia de ~99.000 EUR, probablemente un dígito mal
    transcripto en "Overige kosten" de la nota — se usa el total del P&L
    principal, que es el dato auditado confiable, sin desglosar en `items`)
  Overige personeelskosten (personal NO deportivo: administración,
    backoffice — Nota 24)                                 -10.060 → admin_general_expense
  Minderwaarde bij de overdracht van spelersregistratierechten
    (pérdida por venta de pases por debajo del valor libro)  -9.024 → player_impairment
  Afschrijvingen van spelersregistratierechten (amortización
    lineal de pases)                                       -26.844 → player_amortisation
  Afschrijvingen van overige immateriële/materiële activa   -3.293 → depreciation
  Afschrijvingen van recht-op-gebruik activa (IFRS16,
    depreciación de derechos de uso — leases)                -1.731 → depreciation
  Overige niet-kaskosten (crédito no-efectivo, reversión)     +0.335 → exceptional_items
Total: -132.995 vs -132.996 impreso (diferencia de 1.000 EUR, redondeo).

RESULTADO FINANCIERO (netInterest): Financiële opbrengsten 3.082 -
Financiële kosten 1.327 = 1.755 (= "Financieel resultaat" impreso exacto).

TAX: Actuele belastingen -7.522 + Uitgestelde belastingen 0.631 = -6.891
(= "Totaal inkomstenbelastingen" impreso exacto).

TIE-OUT (verificado): 154.196 (revenue oficial) - 132.996 (expenses oficial)
+ 1.755 (netInterest) - 6.891 (tax) = 16.064, exacto igual a "Winst (verlies)
voor de periode" impreso (16.064). Toerekenbaar 100% a los accionistas de
Club Brugge NV (minderheidsbelangen = 0, no hay minoritarios).

MONEDA: EUR. El documento no declara un tipo de cambio propio a USD (no aplica,
es un club de la Eurozona) → fxRef a FX_CLOSE, que YA tenía 'EUR@2025-06-30'
(0,8532) antes de esta carga.

grossDebt: se usó Total langlopende verplichtingen (50.424) + Total
kortlopende verplichtingen (49.635) - Voorzieningen (1.314, la única línea de
tipo "previsión" del pasivo) = 98.745. Mismo criterio de exclusión que
Köln/Boca (deuda financiera+comercial+leases+pases a pagar, EXCLUYENDO
previsiones). cash: Geldmiddelen en kasequivalenten (21.401).

Total activa = Total pasiva = 199.141 (balance cuadra).

GESTIÓN: Voorzitter Raad van Bestuur = Bart Verhaeghe (accionista mayoritario
y presidente desde 2012) — se usa como identificador de la gestión actual,
sin fecha de inicio verificada con precisión para este ejercicio puntual.
============================================================================
```

_de data/clubs.js:_

```text
Bélgica (sesión de esta tanda): PAÍS NUEVO, 4 clubes de la Pro League, 1 ejercicio cada uno
(2024/2025, cierra 30/6). brandColor verificado con Wikipedia (colores oficiales del infobox)
+ teamcolorcodes.com/schemecolor.com/logotyp.us para el hex — mismo criterio que River: bicolor
con blanco, se usa el acento NO blanco (Club Brugge es azul/negro sin blanco, se usó el azul).
```

## 2025

### Meta

```text
Financiële opbrengsten (3.082) - Financiële kosten (1.327).
Actuele belastingen (-7.522) + Uitgestelde belastingen (0.631).
grossDebt = Total langlopende verplichtingen (50.424) + Total kortlopende verplichtingen
(49.635) - Voorzieningen (1.314). cash = Geldmiddelen en kasequivalenten.
```

_al lado del campo `officialTotalRevenue`:_

```text
excluye exceptional_items (+0.335 crédito), mismo criterio que Chelsea
```

## Gestiones

_antes de Michel Van Maele (data/gestiones/be.js):_

```text
Van Maele: voorzitter desde 1999 (solo año; Fernand De Clerck renunció por un desacuerdo en el consejo), murió el 26/2/2003. El ejercicio 1999 depende de ese año.
```

_antes de Michel D'Hooghe (data/gestiones/be.js):_

```text
D'Hooghe: lo sucedió en 2003 (la fecha exacta no figura; marzo aproximado, ganó la liga dos meses después). Dejó en junio de 2009 (hasta = 1/7/2009, así el cierre 30/6/2009 es suyo).
```

_antes de Pol Jonckheere (data/gestiones/be.js):_

```text
Jonckheere: voorzitter 2009-2011; Verhaeghe lo sucedió el 1 de febrero de 2011.
```

## Fuentes

### clubbrugge-be-jaarrekening-2025

_note (data/):_

```text
Cuentas CONSOLIDADAS (grupo, IFRS), preferidas sobre la versión individual disponible para el mismo año. Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Club Brugge/jaarrekening-2025-06-30-consolidado.md.
```
