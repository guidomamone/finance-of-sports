# istra-hr — evidencia de carga

Lo que había como comentario en `data/istra-hr-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/istra-hr-data.js — NK Istra 1961 sportsko dioničko društvo (Pula, Croacia),
clubId 'istra-hr'. Ejercicio fiscal = año CALENDARIO (1/1-31/12/2025).

FUENTE: `Clubes/Croacia/Istra 1961/financijsko-izvjesce-2025.md` (transcripción
de `financijsko-izvjesce-2025.pdf`). El PDF tiene capa de texto nativa en la
mayoría de páginas (Račun dobiti i gubitka, Bilješke) — `pdftotext -layout`
reprodujo esas tablas limpio y alineado, USADO en vez del .md (que las mostraba
desordenadas por columnas, error de `pdftotext` sin `-layout` en la sesión que
transcribió). Las páginas de "Financijski kriteriji" con el detalle de intereses/
neposlovni prihodi (pág. 13 del documento) y la Bilanca (pág. 9-10) SON escaneos
sin capa de texto — se verificaron con OCR (Tesseract) Y se confirmaron leyendo
la imagen renderizada directamente (`pdftoppm -r 300`) antes de cargar ningún
número de esas dos páginas. Auditor: Consultum Komparić d.o.o., con un párrafo de
"Isticanje pitanja" (sin modificar la opinión) remitiendo a la Bilješka 22 sobre
litigios judiciales en curso contra el club — no cuantificado en el cuerpo del
balance, ver `Admin/dudas-por-club.md`.

INGRESOS (Račun dobiti i gubitka, 2025, EUR, verificados contra `pdftotext -layout`
pág. 11 del documento, exacto fila por fila):
  Prihodi od ulaznica (Nacionalna natjecanja 410.161 + Ostali nerazvrstani 22.829,
    UEFA klupska/VIP en 0) → matchday_competition, 432.990.
  Prihodi od ulaznica - Godišnje ulaznice (73.124) → season_tickets (abono anual,
    distinto de la recaudación partido-por-partido).
  Prihod od sponzorstva i oglašavanja - Ukupno (Glavni sponzor 65.664 + Reklamiranje
    panoi 2.300 + Ostali nerazvrstani 442.207, el resto en 0) → sponsorship_commercial,
    510.171.
  Prihodi od prava emitiranja - Nacionalna natjecanja (895.800) → broadcasting.
  Komercijalni prihodi - Ukupno (Nacionalna natjecanja 1.490 + Prodaja proizvoda
    198.056) → sponsorship_commercial (mismo criterio que osijek-hr/mechelen-be
    para "Komercijalni prihodi"), 199.546.
  Uefina klupska natjecanja - solidarne uplate (1.873.750) → competition_bonus.
  Ostali poslovni prihodi - Ukupno (Donacije nacionalnih nogometnih tijela 71.671 +
    Donacije države/lokalne samouprave 119.171 + Donacije nepovezanih strana 35.954 +
    Ostali nerazvrstani poslovni prihodi 114.443) → other_income, 341.239.
  Ukupno - Prihodi (impreso, verificado exacto): 4.326.620.

GASTOS (misma tabla, pág. 12):
  wages_squad = Troškovi primanja igrača (-3.615.261) + Troškovi primanja stručnog
    stožera (-1.996.344) = -5.611.605 (mismo criterio osijek-hr: plantel + cuerpo
    técnico combinados, sin desglose de sector disponible).
  admin_general_expense = Troškovi prodaje robe/proizvoda (-309.314, costo de
    mercadería) + Trošak primanja ostalih zaposlenika (-268.151, resto del personal
    no futbolístico) + Troškovi sponzorstva i oglašavanja (-51.479) + Troškovi
    imovine i objekata (-63.760) = -692.704.
  depreciation = Amortizacija dugotrajne materijalne imovine (-71.042) + Amortizacija
    ostale nematerijalne imovine (-188.576) = -259.618.
  match_organisation_expense = Troškovi utakmica (-847.995).
  other_expenses = Izvanredni troškovi (-10.233) + Ostali nerazvrstani poslovni
    rashodi (-1.643.113) = -1.653.346.
  Ukupno - poslovni rashodi (bez registracije igrača) impreso: -9.065.268, suma de
    líneas de arriba EXACTA.

TRANSFERENCIAS DE JUGADORES (pág. 12): Troškovi stjecanja registracija igrača
  (-1.667.303) + Prihod od raspolaganja registracijama igrača (+4.150.035) +
  Nekapitalizirani troškovi za naknade agentima/posrednicima (-774.888) = Neto
  rezultat 1.707.844 (impreso exacto) → profitOnPlayerSales.

RESULTADO FINANCIERO Y NO OPERATIVO (pág. 13 del documento — página ESCANEADA sin
capa de texto, leída directo de la imagen renderizada para evitar cualquier error
de OCR/orden de columnas en un bloque de 12 números):
  Dobit/(gubitak) od raspolaganja dugotrajnom imovinom: 0.
  Financijski prihodi 28 - Financijski rashodi 87.833 - Neto tečajne razlike 0 =
    Ukupni neto prihod/rashod od financiranja (87.805) → netInterest.
  Ostali neposlovni prihodi 439.467 - Ostali neposlovni rashodi 512 = Ukupni
    neposlovni prihodi/rashodi 438.955 (impreso exacto) — SIN campo dedicado en el
    motor genérico (solo profitOnPlayerSales/assetSales/netInterest/tax). Se cargó
    en `assetSales` (que de otro modo sería 0, no hay venta de activos fijos este
    año) SOLO para que el PAT cierre matemáticamente, pero se sobreescribió
    `meta.extraRows` con el label real "Otros ingresos/egresos no operativos" en vez
    de dejar el label por defecto "Venta de activos" (que sería falso/impreciso) —
    mecanismo de `nativeReportFor`/`simplifiedReportForGeneric`, ver
    `club-or-year-onboarding` SKILL.md sección 2. PREGUNTA ABIERTA (ver
    Admin/dudas-por-club.md): el documento no explica de qué se compone este monto
    (10% del revenue del ejercicio), ninguna Bilješka lo desglosa en las páginas
    leídas.
  Porezni prihod/(rashod): 0.
  Dobit/(gubitak) poslije oporezivanja: (2.679.654) (impreso, KONTROLA "TOČNO" en el
    propio documento).

TIE-OUT FINAL (verificado exacto): revenue 4.326.620 - expenses 9.065.268 +
  profitOnPlayerSales 1.707.844 + assetSales(=neposlovni) 438.955 + netInterest
  (87.805) + tax 0 = -2.679.654 = Dobit/(gubitak) poslije oporezivanja impreso,
  EXACTO.

MONEDA: EUR. El documento no declara tipo de cambio propio (no hay Anexo de moneda
extranjera) — fxRef a FX_CLOSE 'EUR@2025-12-31' (ya existía en data/currency-map.js,
agregada en la tanda anterior de esta misma sesión).

grossDebt/cash: NO se cargaron este ejercicio (quedan en 0 vía default de
`computeYearGeneric`) — la Bilanca (pág. 9-10 del documento) es un escaneo sin capa
de texto y no se llegó a OCRearla en esta sesión, priorizando cerrar el P&L de los 4
clubes asignados. Pendiente para una sesión futura, no es un dato inventado ni un 0
real, es un gap documentado.

GESTIÓN: el Upravni odbor (Branko Devide Vincenti, presidente) está vigente al
cierre y al momento de la firma, sin cambios durante el ejercicio — pero no hay
evidencia de una "gestión" en el sentido asociativo argentino (esto es una s.d.d.,
sociedad anónima deportiva) → gestionId: null, sin entrada en gestionesByClub (ya no
es obligatorio, ver club-or-year-onboarding SKILL.md sección 16).
============================================================================
```

## 2025

### Meta

```text
Troškovi stjecanja registracija igrača(-1.667303) + Prihod od raspolaganja(4.150035)
+ Nekapitalizirani troškovi za naknade agentima(-0.774888) = 1.707844 (impreso "Neto
rezultat od raspolaganja registracijama igrača").
Repurposed para "Ukupni neposlovni prihodi/rashodi" (438.955, ver comentario de
cabecera) — SOLO para que el PAT cierre, el label real se fuerza vía extraRows abajo.
Financijski prihodi(0.000028) - Financijski rashodi(0.087833) - Neto tečajne razlike(0).
```
