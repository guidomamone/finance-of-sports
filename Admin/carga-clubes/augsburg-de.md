# augsburg-de — evidencia de carga

Lo que había como comentario en `data/de/augsburg-de-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/de/augsburg-de-data.js — Fußball-Club Augsburg 1907 GmbH & Co. KGaA
(Augsburg, Alemania). Uno de 5 clubes alemanes cargados en paralelo el
2026-09-22 (país 'DE' / liga 'de-bundesliga' ya agregados a data/leagues.js
por otra sesión). clubId = 'augsburg-de' (con guion, no 'augsburg' solo).

FUENTE: Clubes/Alemania/FC Augsburg/konzernabschluss-2023-24.md y
konzernabschluss-2024-25.md — extractos del Unternehmensregister alemán
(bajados por sesión anterior, ver Admin/sourcing/Alemania/FC Augsburg.md), CADA
UNO es el Konzernabschluss (cuentas CONSOLIDADAS del grupo: FCA KGaA +
F.C. Augsburg Arena Besitz und Betriebs GmbH, 91,7% participación) para su
ejercicio 01.07-30.06. El consolidado ES el total oficial de cada
documento (no hay individual en paralelo).
  - 2024 = ejercicio 01.07.2023-30.06.2024 (Konzern-GuV, pág. 3-4 del .md).
  - 2025 = ejercicio 01.07.2024-30.06.2025 (Konzern-GuV, pág. 3-4 del .md).

UMSATZERLÖSE (línea agrupadora, NO se carga como bolsón): la Nota VI
("Erläuterungen zur Konzern-Gewinn- und Verlustrechnung") de cada ejercicio
desglosa la cifra en 6 conceptos con categoría real distinta entre sí, así
que se promueven a 6 líneas de primer nivel (regla de club-data-mapping
SKILL.md sección 1): Erlöse aus dem Spielbetrieb (matchday_competition),
Werbung (sponsorship_commercial), TV-Einnahmen (broadcasting), Transfers
(player_sales — la política contable declarada, "Transfererlöse... auf
Basis einer Nettobilanzierung", confirma que esta cifra YA es neta de
pérdidas por transferencia, por eso profitOnPlayerSales queda en 0 en
fiscalYearMeta, no se netea de nuevo), Handel (sponsorship_commercial,
venta de mercadería/fanshop del club) y Sonstiges (other_income). ESTA
NOTA SOLO DA PRECISIÓN EN MILES DE EUR (TEUR), a diferencia del total
impreso de Umsatzerlöse en la Konzern-GuV que sí es exacto al centavo —
por eso la suma de estas 6 líneas queda ~560 EUR (2024) / ~292 EUR (2025)
por debajo de Umsatzerlöse real, una diferencia de ~0,0005% de redondeo de
la propia nota, documentada, no un error de carga (ver club-data-mapping
SKILL.md sección 6).

ABSCHREIBUNGEN (depreciación/amortización, también agrupadora en la
Konzern-GuV): el Konzernanlagenspiegel (Anhang, tabla de movimientos del
activo fijo) SÍ da el desglose exacto por tipo de activo, y las 3 partes
tienen categoría real distinta → promovidas a 3 líneas: Spielerwerte
(player_amortisation), Konzessionen/otros intangibles (other_amortisation)
y Sachanlagen —Grundstücke+technische Anlagen+andere Anlagen, sumadas
porque las 3 SON depreciation— (depreciation). Suma exacta contra el total
impreso de "Abschreibungen" en ambos ejercicios (17.208.200,55 en 2024;
14.610.437,86 en 2025), verificado contra el propio Anlagenspiegel.

PERSONALAUFWAND: Löhne und Gehälter + soziale Abgaben, sin split por
departamento/plantel vs. resto (a diferencia de Vélez, este documento NO
tiene un 2do eje por sector) → TODO a wages_squad (criterio default de
club-data-mapping cuando no hay cómo separar), con las 2 sub-líneas como
`items` de transparencia (misma categoría que el padre).

SONSTIGE STEUERN (línea 11 de la Konzern-GuV, "otros impuestos" no ligados
al resultado — no es Steuern vom Einkommen/vom Ertrag) → admin_general_expense,
mismo criterio que Impuestos/tasas en el resto del sitio (club-data-mapping/referencia/casos-por-pais-y-formato.md). Se carga como expenseLine (no como `tax`) para que
officialTotalExpenses/PAT cierren con la fórmula estándar del sitio.

AUFLÖSUNG UNTERSCHIEDSBETRAG AUS DER KAPITALKONSOLIDIERUNG (línea 12,
reversión anual programada del pasivo por diferencia de primera
consolidación de FCA Arena GmbH, HGB $309 Abs.2 — un ítem puramente de
consolidación, no operativo ni de venta de jugadores/activos): sin un meta
field dedicado para este caso, se cargó como revenueLine `other_income`
(única categoría disponible que no lo tergiversa como algo que no es). VER
DUDA genuina en el reporte de esta sesión: si el sitio necesita un campo
propio para ítems de consolidación no operativos en vez de other_income.

netInterest = Sonstige Zinsen und ähnliche Erträge − Zinsen und ähnliche
Aufwendungen (neto, nunca como línea, club-data-mapping sección 2).
tax = Steuern vom Einkommen und vom Ertrag (0,00 en 2024 por Jahresfehlbetrag;
-2.990.125,88 en 2025, primer ejercicio con Ergebnis positivo del período).
officialPAT = Konzernjahresfehlbetrag (2024) / Konzernjahresüberschuss (2025)
— el resultado consolidado del AÑO (línea 13), ANTES de las líneas 14-16
(asignación a minoritarios / arrastre de resultados, que son de balance,
no del ejercicio).

grossDebt = D. Verbindlichkeiten (línea angosta de deuda, excluye
Rückstellungen/Rechnungsabgrenzungsposten — mismo criterio que Boca, ver
club-data-mapping/referencia/formato-simplificado.md). cash = C. Kassenbestand, Guthaben bei
Kreditinstituten (Schecks en 2024).

Moneda: EUR, sin tipo de cambio propio declarado por el documento (ningún
anexo de moneda extranjera en las 24 páginas revisadas) → fxRef a
FX_CLOSE (data/currency-map.js), que YA tenía 'EUR@2024-06-30' y
'EUR@2025-06-30' antes de esta carga, no se agregó nada ahí.

gestionId: 'actual' para los 2 años — la FCA KGaA es una KGaA con
Geschäftsführung (Michael Ströll, estable en ambos ejercicios), no un
club asociativo con presidencia electa por ejercicio en el sentido
argentino, así que no aplica una atribución de "gestión" con ese
significado (club-data-mapping sección 7 / club-or-year-onboarding
sección 16: sin esa info, 'actual' es el default seguro).
============================================================================
```

## 2025

### Meta

```text
Steuern vom Einkommen und vom Ertrag = -2.990.125,88 (primer ejercicio con Ergebnis positivo
de la muttergesellschaft en el período cargado).
```

## 2024

### Meta

```text
Sonstige Zinsen und ähnliche Erträge (807.870,83) − Zinsen und ähnliche Aufwendungen
(24.789,24), neto.
Steuern vom Einkommen und vom Ertrag = 0,00 (Jahresfehlbetrag, no corresponde impuesto).
Transfers ya se carga NETO como revenueLine (player_sales) por política contable declarada
del club ("Nettobilanzierung"), no hay ganancia/pérdida por venta de jugadores aparte que
netear acá.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Michael Ströll (2023-09-12 a hoy): Es Geschäftsführer desde el 22/8/2016 (b4bschwaben.de) y, según el club, Gesamtverantwortlicher (CEO) desde 2023: asumió la responsabilidad general cuando Stefan Reuter (hasta entonces Geschäftsführer Sport y cabeza) renunció el 12/9/2023 (Spox, Sky). Se usó esa fecha como inicio; el club solo dice 2023. Contrato renovado hasta el 30/6/2029. El Präsident (Markus Krapf desde 6/9/2022) es honorario y del e.V., no se cargó.
Duda: La fecha 2023-09-12 es la renuncia de Reuter, la fecha en que Ströll asumió la responsabilidad general se infiere; el club solo dice 'desde 2023'.
```

## Fuentes

### augsburg-de-konzernabschluss-2024

_note (data/):_

```text
Extracto del Unternehmensregister alemán (HRB 21812, Amtsgericht Augsburg). Cuentas CONSOLIDADAS del grupo (FCA KGaA + F.C. Augsburg Arena Besitz und Betriebs GmbH, 91,7%). Transcripción completa en Clubes/Alemania/FC Augsburg/konzernabschluss-2023-24.md.
```

### augsburg-de-konzernabschluss-2025

_note (data/):_

```text
Extracto del Unternehmensregister alemán (HRB 21812, Amtsgericht Augsburg). Cuentas CONSOLIDADAS del grupo (FCA KGaA + F.C. Augsburg Arena Besitz und Betriebs GmbH, 91,7%). Transcripción completa en Clubes/Alemania/FC Augsburg/konzernabschluss-2024-25.md.
```
