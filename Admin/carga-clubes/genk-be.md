# genk-be — evidencia de carga

Lo que había como comentario en `data/be/genk-be-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/be/genk-be-data.js — K. Racing Club Genk 322 VZW (Bélgica). Uno de 4 clubes
belgas de la Pro League cargados en esta sesión (onboarding de Bélgica como
país nuevo): Club Brugge, Anderlecht, Genk, Gent.

FUENTE: `Clubes/Bélgica/Genk/jaarrekening-2025-06-30-individual.md` (única
versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto nativa.

FORMATO DEL DOCUMENTO: a diferencia de Anderlecht/Gent (NV, esquema
"VOL-kap"), Genk es una VZW (asociación sin fines de lucro, "vereniging
zonder winstoogmerk") y usa el esquema "VOL-VZW" — la estructura del P&L es
análoga pero con una línea propia "Lidgeld, schenkingen, legaten en
subsidies" (cuotas de socio + donaciones + legados + subsidios) que no
existe en el esquema NV, y con movimientos de "belastingvrije reserves"/
"uitgestelde belastingen" (reservas libres de impuesto/impuesto diferido)
más marcados: este ejercicio difirió a años futuros 7.225.620 EUR de
ganancias por transferencias (Jaarverslag, pág. 44), llevando 1.806.405 EUR
a impuesto diferido y 5.419.215 EUR a reservas libres de impuesto — el
"Winst van het boekjaar" (código 9904, 9.167.383) es el resultado del
ejercicio ANTES de esa asignación a reservas; el "Te bestemmen winst"
(3.748.168, después de la asignación) NO se usa como officialPAT acá, mismo
criterio que las demás cargas del sitio (el resultado del ejercicio es el
que corresponde antes de apropiaciones a reserva, no después).

INGRESOS (Resultatenrekening, códigos NBB, sin desglose numérico de
"Andere bedrijfsopbrengsten" en las notas — Nota 6.9 vacía, igual que
Anderlecht):
  Omzet (turnover) — sin desglose disponible                33.515090 → lump_football_operations
  Lidgeld, schenkingen, legaten en subsidies (cuotas + donaciones +
    legados + subsidios estatales)                          13.483361 → member_dues
  Andere bedrijfsopbrengsten — el Jaarverslag confirma que "Diversen"
    sube porque "de handelsvorderingen ten aanzien van clubs" crecieron
    "door de succesvolle verkopen van spelers" (aumentaron las cuentas
    a cobrar a otros clubes por ventas EXITOSAS de jugadores), y que la
    nota de "Niet-recurrente bedrijfsopbrengsten" (ganancias por venta de
    activos fuera del giro ordinario) está en CERO — es decir, Genk
    contabiliza sus ganancias por venta de jugadores como parte RECURRENTE
    del giro (coherente con su modelo de negocio de club formador/vendedor,
    confirmado también por el riesgo #1 declarado en el propio Jaarverslag:
    "correcte waardering spelersregistratierechten")          55.955475 → player_sales
Total: 102.953926 vs 102.953.926 impreso (exacto).

PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): si Genk pudiera
confirmar qué proporción de "Andere bedrijfsopbrengsten" es efectivamente
plusvalía de pases vs. otros conceptos (recupero de bedrijfsvoorheffing,
premios, etc., que otros clubes belgas sí reportan por separado).

GASTOS (Resultatenrekening):
  Handelsgoederen, grond- en hulpstoffen                     -1.332069 → other_expenses
  Diensten en diverse goederen (sin desglose disponible)     -18.864068 → other_expenses
  Bezoldigingen, sociale lasten en pensioenen (sin separar plantel del
    resto del personal)                                     -53.540132 → wages_squad
  Afschrijvingen (código 630) — el propio Jaarverslag identifica la
    "correcte waardering spelersregistratierechten" como el riesgo #1 del
    club, consistente con que el activo intangible dominante (y por lo
    tanto la depreciación dominante) son los pases                -16.300826 → player_amortisation
  Andere bedrijfskosten (código 640/8)                        -2.330760 → other_expenses
  Niet-recurrente bedrijfskosten (código con posible error de
    transcripción "86A" en el documento, pero el valor y su posición en
    la cascada de sumas lo identifican sin ambigüedad como el renglón de
    costos no-recurrentes)                                    -0.231000 → exceptional_items
(código 631/4, "Waardeverminderingen op voorraden/vorderingen", fue una
REVERSIÓN neta de +0.452026 en este ejercicio — un crédito, no un costo — y
se sumó adentro de other_expenses como valor negativo/crédito, no como línea
aparte, para no inflar la cantidad de líneas por un ajuste chico)
Total: -92.146829 vs -92.146.828 impreso (diferencia de 1.000 EUR, redondeo).

RESULTADO FINANCIERO (netInterest): Financiële opbrengsten 0.380980 -
Financiële kosten 1.820849 = -1.439869.

TAX: acá se combinan 2 movimientos "debajo de la línea" del esquema VZW
(mismo criterio que club-data-mapping SKILL.md sección 2 y el precedente de
Köln: nada de esto es gasto operativo) — Overboeking naar de uitgestelde
belastingen (-1.806405) + efecto neto de Belastingen op het resultaat
(+1.606560, un CRÉDITO neto: 0.413982 de impuesto corriente contra 2.020542
de "Regularisering van belastingen en terugneming van voorzieningen") =
-0.199845.

TIE-OUT (verificado): 102.953926 - 92.146828 - 1.439869 - 0.199845 =
9.167384, vs "Winst van het boekjaar" impreso 9.167.383 (diferencia de EUR
1, redondeo). Nota: esto es el resultado ANTES de la asignación de
5.419.215 EUR a reservas libres de impuesto (ver comentario de cabecera).

MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).

grossDebt: "Schulden op meer dan één jaar" (9.335878) + "Schulden op ten
hoogste één jaar" (25.169187) = 34.505065. cash: "Liquide middelen"
(3.500316). Total activa = Total pasiva = 102.229325.

GESTIÓN: no se identificó con confianza un presidente/responsable único para
todo el ejercicio → gestionId: null.
============================================================================
```

## 2025

### Meta

```text
Overboeking naar de uitgestelde belastingen (-1.806405) + Belastingen op het resultaat neto
(+1.606560, crédito). Ver comentario de cabecera.
```

_al lado del campo `officialTotalRevenue`:_

```text
excluye exceptional_items (-0.231), mismo criterio que Chelsea
```

## Gestiones

_antes de Harry Lemmens (data/gestiones/be.js):_

```text
Genk es una vzw sin dueño: presidente del consejo. Lemmens: voorzitter desde 2006 (solo año); renunció en la semana del 23/10/2009.
```

_antes de Herbert Houben (data/gestiones/be.js):_

```text
Houben: ya es voorzitter en noviembre de 2009 (voetbalkrant 24/11/2009); desde = fecha del artículo de VRT sobre la renuncia de Lemmens (aproximada).
Hasta: el consejo se renovó el 16/5/2017 (terminaron cuatro mandatos); en el informe del ejercicio 2017 ya preside Croonen.
```

_antes de Peter Croonen (data/gestiones/be.js):_

```text
Croonen: voorzitter hasta junio de 2026; Wikipedia lo ubica 2018-2026 pero el informe del ejercicio 2017 ya lo lista como presidente.
```

## Fuentes

### genk-be-jaarrekening-2025

_note (data/):_

```text
Cuentas INDIVIDUALES de la VZW (no hay consolidado disponible). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Genk/jaarrekening-2025-06-30-individual.md. Nota 6.9 (desglose de "Andere bedrijfsopbrengsten") no fue completada por el club en este filing.
```
