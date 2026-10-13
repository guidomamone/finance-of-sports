# gent-be — evidencia de carga

Lo que había como comentario en `data/gent-be-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gent-be-data.js — K.A.A. Gent NV (Bélgica). Uno de 4 clubes belgas de la
Pro League cargados en esta sesión (onboarding de Bélgica como país nuevo):
Club Brugge, Anderlecht, Genk, Gent.

FUENTE: `Clubes/Bélgica/Gent/jaarrekening-2025-06-30-individual.md`. Gent SÍ
tiene años con `-consolidado` disponibles (2017-2022), pero NO para 2023,
2024 ni 2025 — el ejercicio más reciente disponible (criterio de la tarea:
"elegí el más reciente") solo existe en versión individual. Cierre
30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto
nativa.

FORMATO DEL DOCUMENTO: NV, esquema estatutario "VOL-kap", igual que
Anderlecht — pero a diferencia de Anderlecht/Genk, Gent SÍ incluye un
"Jaarverslag" (informe de gestión) con comentario cuantitativo específico
por línea del P&L (pág. 42 del PDF), lo que permite una categorización más
fundamentada que en los otros 2 individuales.

INGRESOS (Resultatenrekening + comentario del Jaarverslag, pág. 42):
  Omzet — el Jaarverslag dice explícito: "De omzet uit ticketing, sponsoring
    en publiciteit bedraagt €37.503k" (ticketing + sponsors + publicidad,
    sin desglosar cuánto es cada uno)                          37.503463 → lump_football_operations
  Andere bedrijfsopbrengsten — el Jaarverslag dice explícito: "voornamelijk
    gerealiseerd... door uitgaande transfers en recuperatie
    bedrijfsvoorheffing" (mayormente por transferencias salientes/ventas de
    jugadores + recupero de retención impositiva sobre sueldos)  43.656204 → player_sales
Total: 81.159667 vs 81.159.667 impreso (exacto).

PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): separar ticketing de
sponsoring/publicidad dentro de Omzet, y separar la plusvalía de pases del
recupero impositivo dentro de Andere bedrijfsopbrengsten.

GASTOS (Resultatenrekening + Jaarverslag):
  Handelsgoederen, grond- en hulpstoffen                       -0.357352 → other_expenses
  Diensten en diverse goederen (el Jaarverslag la suma junto con
    Bezoldigingen sin separar más, "€57.141k" combinado — sin desglose
    propio disponible)                                        -22.217207 → other_expenses
  Bezoldigingen, sociale lasten en pensioenen                  -34.923563 → wages_squad
  Afschrijvingen (código 630) — el Jaarverslag solo dice "werden in
    continuïteit toegepast" (se aplicaron en continuidad respecto al año
    anterior), sin desglosar players vs. PP&E — se asume dominancia de
    pases por ANALOGÍA con Club Brugge (donde la Nota IFRS SÍ confirma
    ~84% del cargo es de pases) y con el propio negocio de Gent (venta
    recurrente de jugadores formados) — ES UNA INFERENCIA, no una
    confirmación explícita del documento, a diferencia de Anderlecht/Genk
    donde el club SÍ lo dijo con esas palabras                 -13.616725 → player_amortisation
  Voorzieningen voor risico's en kosten (código 635/8) — REVERSIÓN neta de
    +0.349285 este ejercicio ("saldo van terugneming voorziening risico's
    en kosten van €349k", confirmado por el Jaarverslag)         0.349285 → exceptional_items
  Andere bedrijfskosten — el Jaarverslag dice que incluye "onder meer"
    (entre otras cosas) impuesto inmobiliario (onroerende voorheffing) Y
    comisiones/sell-on fees de compraventa de jugadores — mezcla de al
    menos 2 tipos de gasto sin monto propio para cada uno         -6.717525 → other_expenses
  Niet-recurrente bedrijfskosten — el Jaarverslag dice que son
    "voornamelijk" (mayormente) costos de un acuerdo/dading y el cierre de
    un arbitraje CEPANI (litigio)                                -0.988421 → exceptional_items
Total: -78.471508 vs -78.471.508 impreso (exacto). (Nota: el código 631/4
del propio documento, "58.344", quedó identificado como el valor del
ejercicio ANTERIOR — 2024 — mal alineado en la columna de transcripción; no
aporta al ejercicio 2025, que reconciliation confirma en 0 para esa línea.)

RESULTADO FINANCIERO (netInterest): Financiële opbrengsten 0.138518 -
Financiële kosten 0.812459 = -0.673941. El Jaarverslag confirma que son
"in hoofdzaak" intereses de créditos bancarios corrientes.

TAX: Belastingen op het resultaat -0.118355.

TIE-OUT (verificado): 81.159667 - 78.471508 - 0.673941 - 0.118355 =
1.895863, exacto igual a "Winst (verlies) van het boekjaar" impreso
(1.895863). Sin movimientos de reservas libres de impuesto/impuesto
diferido este ejercicio (a diferencia de Genk), así que no hay ninguna
distinción entre "winst van het boekjaar" y "te bestemmen winst" para este
club/año.

MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).

grossDebt: "Schulden op meer dan één jaar" (40.892966, incluye €17,68M de
leasingschulden por el opstalrecht/derecho de superficie del estadio) +
"Schulden op ten hoogste één jaar" (29.518840) = 70.411806, EXCLUYENDO
"Voorzieningen voor risico's en kosten" (1.072769) y "Overlopende
rekeningen" (9.216400, ingresos diferidos — el Jaarverslag confirma que son
mayormente ingresos de ventas de junio 2025 correspondientes a la temporada
siguiente). cash: "Liquide middelen" (9.057614). Total activa = Total
pasiva = 106.163479.

GESTIÓN: no se identificó con confianza un presidente/responsable único
verificado para todo el ejercicio → gestionId: null.
============================================================================
```

## 2025

### Meta

_al lado del campo `officialTotalRevenue`:_

```text
excluye exceptional_items netos -0.639136, mismo criterio que Chelsea
```

## Gestiones

_antes de Ivan De Witte (data/gestiones/be.js):_

```text
De Witte: voorzitter desde 1999 (solo año). Baro compró el club el 20/7/2023 (95% de las acciones, aprobado en asamblea especial); De Witte siguió como voorzitter
un año más y Baro pasó a presidir desde la temporada 2024-25.
```
