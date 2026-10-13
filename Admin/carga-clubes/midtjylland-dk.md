# midtjylland-dk — evidencia de carga

Lo que había como comentario en `data/dk/midtjylland-dk-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/dk/midtjylland-dk-data.js — FC Midtjylland (Dinamarca, Superliga), clubId
'midtjylland-dk'.

Fuente: Årsrapport de FC Midtjylland A/S, ejercicio 1° de julio de 2018 a 30 de
junio de 2019 (temporada 2018/19), depositado en Erhvervsstyrelsen (CVR).
Transcripción completa en Clubes/Dinamarca/FC Midtjylland/aarsrapport-2019-06-30.md.

POR QUÉ ESTE EJERCICIO Y NO UNO MÁS RECIENTE: los ejercicios 2022/23 y 2023/24
(y el período de transición 2024, 13 meses) reportan la Resultatopgørelse desde
"Bruttofortjeneste" (Ganancia Bruta, Revenue NETO de Cost of Sales) hacia abajo,
sin desglosar Nettoomsætning (Revenue bruto) en ningún lado del documento ni en
la Ledelsesberetning — un formato legal danés que protege el detalle comercial,
pero que le impide a este sitio calcular Revenue/Expenses reales, solo un margen
ya neteado. El ejercicio 2018/19 SÍ reporta Nettoomsætning como línea propia de
la Resultatopgørelse, así que se usó este año en su lugar (cualquier año sirve,
prioridad: que el documento permita separar Revenue de Expenses de verdad).

amountNative en millones de DKK nativos. revenue positivo, expense NEGATIVO.

REVENUE (Resultatopgørelse 1 julio 2018-30 junio 2019, pág. 24-25):
  - "Nettoomsætning" (107.921 tDKK): revenue "core" del club (matchday/sponsor/
    TV combinados) — el documento NO lo desglosa en ningún lado (ni en nota ni
    en la Ledelsesberetning), así que se carga como `lump_football_operations`
    (mismo criterio que River/Alianza Lima 2022-2024 con desglose no disponible).
  - "Andre driftsindtægter" (161.960 tDKK): la política contable del propio
    documento (Nota "Andre driftsindtægter/-omkostninger", pág. 33) la define
    EXPLÍCITAMENTE como "avance og tab ved salg af transferrettigheder og
    materielle anlægsaktiver" (ganancia/pérdida por venta de derechos de
    transferencia y activos fijos) — y la Ledelsesberetning (pág. 12) confirma
    que el aumento interanual (142M→162M) se debe a las ventas de Bubacarr
    Sanneh, Dominick Drexler, Mikkel Duelund y Andreas Poulsen. Se carga
    ENTERA a `player_sales` (neto de eventuales ventas de activos fijos, que el
    documento no separa pero son inmateriales frente al monto).

GASTOS (misma Resultatopgørelse + Nota 1 "Personaleomkostninger" + Nota 2
"Af- og nedskrivninger", pág. 32-33):
  - "Andre eksterne omkostninger" (-73.974 tDKK): gastos externos (viajes,
    organización de partidos, servicios profesionales, sin más desglose
    disponible) → other_expenses.
  - "Personaleomkostninger" (-93.592 tDKK = Lønninger 82.112 + Pensioner 9.334
    + Andre omkostninger til social sikring 2.146): sin separar plantel de
    administración → wages_squad completo, mismo criterio que el resto de los
    clubes europeos cargados.
  - "Af- og nedskrivninger af immaterielle og materielle anlægsaktiver"
    (-32.610 tDKK), desglosada en Nota 2: Afskrivninger af immaterielle
    anlægsaktiver (-29.319, derechos federativos) → player_amortisation;
    Afskrivninger af materielle anlægsaktiver (-3.291, bienes de uso) →
    depreciation.
  - "Andre driftsomkostninger" (-3.244 tDKK): segunda línea de gastos varios,
    separada de "Andre eksterne omkostninger" en la Resultatopgørelse, sin más
    detalle → other_expenses.

TIE-OUT: Revenue (107.921+161.960=269.881) − Expenses (73.974+93.592+29.319+
3.291+3.244=203.420) = 66.461 = "Resultat før finansielle poster" impreso,
EXACTO. + Finansielle indtægter (0.427) − Finansielle omkostninger (0.470) =
66.418 = "Resultat før skat" impreso, EXACTO. − Skat (10.649) = 55.769 =
"Årets resultat" impreso, EXACTO. Ningún residuo en ningún paso.

GROSSDEBT/CASH: no se cargaron (quedan en 0) — el balance de este documento no
se leyó en esta sesión (alcance: solo Resultatopgørelse), mismo criterio que
Werder Bremen cuando la fuente no permite confirmarlos con el tiempo disponible.

MONEDA: DKK, moneda NUEVA para el sitio (ver data/currency-map.js, agregada en
esta misma sesión). El documento no declara tipo de cambio propio (empresa
100% doméstica) → `fxRef:'DKK@2019-06-30'`, cotización de cierre BCE.

PROPIEDAD: Matthew Benham (también dueño de Brentford FC, Inglaterra, ya
cargado en este sitio como `brentford-gb`) controlaba FC Midtjylland en este
ejercicio — confirmado en balances posteriores del mismo club (ver nota de
hechos posteriores del ejercicio 2023, que menciona la venta de sus acciones a
Impact Co A/S recién en 2023, muy posterior a este ejercicio 2018/19).
============================================================================
```

## Gestiones

_antes de Matthew Benham (data/gestiones/dk.js):_

```text
Benham es el accionista mayoritario de FCM Holding desde julio de 2014 (día 01 aproximado). El chairman operativo (Rasmus Ankersen) es otro cargo y no se carga.
```

## Fuentes

### midtjylland-dk-aarsrapport-2019

_note (data/):_

```text
Depositado en Erhvervsstyrelsen (registro mercantil danés). Transcripción completa en Clubes/Dinamarca/FC Midtjylland/aarsrapport-2019-06-30.md. Se eligió este ejercicio (no uno más reciente) porque los balances 2022/23-2024 reportan desde "Bruttofortjeneste" sin desglosar Revenue bruto — ver comentario de cabecera de data/dk/midtjylland-dk-data.js.
```
