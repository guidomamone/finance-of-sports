# hajduksplit-hr — evidencia de carga

Lo que había como comentario en `data/hr/hajduksplit-hr-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/hr/hajduksplit-hr-data.js — HNK Hajduk s.d.d. (Split, Croacia).
Segundo club croata cargado en esta sesión de onboarding de Croacia como
país nuevo. clubId 'hajduksplit-hr' (sufijo de país, convención desde la
Versión 129).

FUENTE: `Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2024.md`
(transcripción provista al onboardear el país, plantilla "Financijski
kriterij FO2" del Pravilnik o licenciranju i financijskoj održivosti
klubova de la HNS — misma familia de documento que Dinamo/Rijeka). El PDF
parece un escaneo con OCR de calidad media: varios dígitos y celdas salen
garbled (ej. "340.81" en vez de "340.811", un "0" faltante en "44.267" en
vez de "404.267"). Se RECONSTRUYERON los valores garbled restando/sumando
contra los subtotales "Ukupno" impresos (que sí se leyeron limpios), no se
tomó ningún número dudoso al pie de la letra sin cruzarlo — ver el detalle
de cada reconstrucción en los comentarios de línea de abajo. Auditado por
Kalibović i partneri d.o.o., dictamen LIMPIO ("Mišljenje" sin salvedades,
"fer prezentiraju... financijski položaj"). Ejercicio fiscal = año
CALENDARIO (1/1 a 31/12/2024, confirmado en el propio documento).

Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2024 está 100% en
EUR sin necesidad de convertir de kuna.

A DIFERENCIA DE DINAMO: Hajduk NO capitaliza registraciones de jugadores
(Nematerijalna imovina - registracije igrača = 0 en el balance, los 2
años) — expensa el costo completo de adquirir un pase al momento de la
operación, y reporta la venta de pases como ingreso BRUTO ordinario, sin
netear. Es el MISMO patrón que Racing (club-data-mapping SKILL.md sección
3): "Transferencia de Jugadores" (ingreso) y "Costo Transferencia de
Jugadores" (gasto) como líneas ordinarias separadas.

PRIHODI (ingresos) 2024, EUR exactos:
  Prihodi od ulaznica - ukupno: 6.437.224, desglosado en Nacionalna
    natjecanja 2.717.370 + UEFA klupska natjecanja 768.095 →
    matchday_competition (3.485.465 combinado; VIP/hospitality, Članarine
    y "ostali nerazvrstani" dan 0 este año, se omiten); Godišnje ulaznice
    2.951.759 → season_tickets.
  Prihod od sponzorstva i oglašavanja - Ukupno: 4.176.713 →
    sponsorship_commercial.
  Prihodi od prava emitiranja - Ukupno: 1.090.600 → broadcasting (la suma
    de sus 2 sub-líneas OCR da 1.090.609, 9 EUR de diferencia por ruido de
    OCR sobre un total de 1,09M — irrelevante, se usó el "Ukupno" impreso).
  Komercijalni prihodi - Ukupno: 9.273.142, desglosado en Nacionalna
    natjecanja 340.811 (reconstruido: Ukupno 9.273.142 menos los otros 3
    componentes visibles, el OCR había truncado el último dígito a
    "340.81") + Prodaja proizvoda (merchandising) 8.453.825 + Ostali
    nerazvrstani 385.611 → sponsorship_commercial (9.180.247 combinado);
    Korištenje objekata para vrijeme neodigravanja utakmica 92.895 →
    stadium_other (uso del estadio FUERA del partido, no catering de
    matchday como Dinamo/Köln).
  Uefine nagrade i solidarne uplate - Ukupno: 1.734.229 →
    competition_bonus.
  Ostali poslovni prihodi - Ukupno: 2.703.091 (donaciones de entidades
    nacionales/terceros relacionados y no relacionados + ingresos
    extraordinarios + partidas sueltas; "donaciones de estado/lokalne
    samouprave" salió en 0 tras reconstruir contra el Ukupno, su celda OCR
    estaba vacía/garbled) → other_income.
  Prihod od raspolaganja registracijama igrača (venta de pases, BRUTO,
    sección de transferencias): 1.990.492 → player_sales (línea ordinaria,
    NO neteada, ver nota de cabecera).
  Ukupno - Prihodi (impreso, EXCLUYE la sección de transferencias):
    25.414.999. Suma de las 6 categorías de arriba (sin player_sales)
    verificada EXACTA contra este total.

RASHODI (gastos) 2024, ANTES de la sección de transferencias:
  Troškovi prodaje/materijala: -5.490.518 → other_expenses.
  Troškovi primanja igrača -14.043.603 + Troškovi primanja stručnog
    stožera -1.369.507 → wages_squad (-15.413.110 combinado).
  Trošak primanja ostalih zaposlenika: -4.791.301 → admin_general_expense.
  Amortizacija dugotrajne materijalne imovine (tangible): -386.805 →
    depreciation. Amortizacija ostale nematerijalne imovine, bez
    registracija igrača: -1.165.210 → other_amortisation.
  Troškovi utakmica: -2.329.584 → match_organisation_expense.
  Troškovi sponzorstva i oglašavanja -298.428 + Troškovi komercijalnih
    aktivnosti -1.076.187 + Troškovi imovine i objekata -554.550 →
    admin_general_expense (-1.929.165 combinado).
  Ostali nerazvrstani poslovni rashodi: -3.509.629 → other_expenses.
  Ukupno - poslovni rashodi (bez registracija igrača) impreso: -35.015.322
    (el documento OCR muestra "(9.600,323)" para el RESULTADO, no el
    total de rashodi — se despejó: 25.414.999 - X = -9.600.323 → X =
    35.015.322, y esta suma reconcilia EXACTA contra las líneas de arriba).

SECCIÓN DE TRANSFERENCIAS DE JUGADORES (líneas ORDINARIAS, sin netear, ver
nota de cabecera — a diferencia de Dinamo/Rijeka que sí capitalizan):
  Troškovi stjecanja registracija igrača (uključujući troškove ustupanja):
    -1.802.429 → player_amortisation (mismo criterio que "Costo
    Transferencia de Jugadores" de Racing: no hay amortización real que
    separar porque no se capitaliza, todo el costo de la operación entra
    acá).
  Prihod od raspolaganja registracijama igrača: +1.990.492 → player_sales
    (revenueLine, ver arriba).
  Nekapitalizirani troškovi za naknade agentima/posrednicima: -592.330 →
    other_expenses (mismo criterio que Racing: comisiones de
    intermediación NO se mezclan con player_amortisation).
  Neto rezultat impreso de esta sección: el OCR mostraba "(44.267)", pero
    -1.802.429 + 1.990.492 - 592.330 = -404.267, no -44.267 — se
    reconstruyó como -404.267 (el OCR perdió un "0" interno), y ESTE valor
    reconstruido es el que hace cerrar el resultado final del ejercicio
    contra el Dobit/(gubitak) poslije oporezivanja impreso (ver tie-out
    abajo), confirmando la reconstrucción.

RESULTADO FINANCIERO (netInterest): Financijski prihodi 0 - Financijski
  rashodi 810.410 + Neto tečajne razlike 78.153 = -732.257 (impreso
  exacto).
assetSales: Ukupno dobit/(gubitak) od raspolaganja imovinom (no pases) = 0
  (impreso). tax: Porezni prihod/(rashod) = 0 (impreso, Hajduk no pagó
  impuesto a las ganancias este ejercicio, coherente con el resultado
  negativo).

TIE-OUT FINAL (verificado exacto, usando el neto reconstruido de -404.267
  para la sección de transferencias): Poslovni rezultat (bez registracija
  igrača) -9.600.323 + neto sección transferencias -404.267 + assetSales 0
  + netInterest -732.257 + tax 0 = -10.736.847 = Dobit/(gubitak) poslije
  oporezivanja impreso EXACTO.
  Equivalente en términos de revenueLines/expenseLines de este archivo:
  officialTotalRevenue 27.405.491 [= 25.414.999 + player_sales 1.990.492]
  - officialTotalExpenses 37.410.081 [= 35.015.322 + player_amortisation
  1.802.429 + agentes 592.330] + netInterest -732.257 = -10.736.847 ✓.

MONEDA: EUR. El documento no declara tipo de cambio propio a USD — se usa
fxRef a FX_CLOSE (data/currency-map.js), que YA tenía la fecha necesitada
(EUR@2024-12-31) antes de esta carga.

BALANCE (también con celdas OCR desalineadas, reconstruido igual cruzando
contra los "Ukupno" impresos — ver Clubes/Croacia/Hajduk Split/
financijsko-izvjesce-2024.md para el detalle línea por línea): grossDebt =
Bankovni i ostali zajmovi (bank loans), corriente 5.124.513 + no corriente
0 = 5.124.513 (mismo criterio angosto que Dinamo/Köln/Ajax, EXCLUYE
obveze prema agentima/dobavljačima/zaposlenicima y obračunati
troškovi/rezerviranja). cash: Novac i novčani ekvivalenti = 1.414.039.

GESTIÓN: Ivan Bilić, Predsjednik Uprave, firma la Izjava o odgovornosti
Uprave para todo el ejercicio 2024 (sin cambio de presidencia mencionado
en el documento) — gestionId genérico 'actual' de todos modos, sin entrada
nominal en gestionesByClub (no es obligatorio, ver club-or-year-onboarding
SKILL.md sección 16; se prefirió no inventar el nombre completo de la
gestión sin confirmar fecha de inicio/fin del mandato).
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Croacia/Hajduk Split/financijsko-izvjesce-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prihodi od ulaznica - Nacionalna natjecanja | pág. 10, Jev 0.99 |
| 2 | Prihodi od ulaznica - UEFA klupska natjecanja | pág. 10, Claude 0.95 |
| 3 | Prihodi od ulaznica - Godišnje ulaznice | pág. 10, precedente |
| 4 | Prihod od sponzorstva i oglašavanja - Sponzor za opremu (Proizvođač opreme) | pág. 10, Jev 1 |
| 5 | Prihod od sponzorstva i oglašavanja - Glavni sponzor na opremi | pág. 10, Jev 1 |
| 6 | Prihod od sponzorstva i oglašavanja - Reklamiranje na panoima oko terena za igru | pág. 10, Jev 1 |
| 7 | Ostali nerazvrstani prihodi od sponzorstva i oglašavanja | pág. 10, Jev 0.94 |
| 8 | Prava emitiranja - Nacionalna natjecanja | pág. 10, Jev 1 |
| 9 | Komercijalni prihodi - Nacionalna natjecanja | pág. 10, Jev 1 |
| 10 | Komercijalni prihodi - Prodaja proizvoda | pág. 10, Jev 1 |
| 11 | Komercijalni prihodi - Korištenje objekata za vrijeme neodigravanja utakmica | pág. 10, precedente |
| 12 | Ostali nerazvrstani komercijalni prihodi | pág. 10, Jev 1 |
| 13 | Uefina klupska natjecanja - prava emitiranja, komercijalni prihodi, nagrade | pág. 10, Claude 0.8 |
| 14 | Uefina klupska natjecanja - solidarne uplate | pág. 10, Jev 1 |
| 15 | Donacije i dotacije ili drugi iznosi od nacionalnih nogometnih tijela | pág. 11, Jev 0.97 |
| 16 | Donacije nepovezanih strana | pág. 11, Jev 1 |
| 17 | Donacije i doprinosi povezanih strana | pág. 11, Jev 1 |
| 18 | Prihodi od refundacije | pág. 36, Jev 1 |
| 19 | Prihod od otpisa obveza | pág. 36, Jev 1 |
| 20 | Prihod od naplačenih vrijednosnih usklađenja | pág. 36, Jev 1 |
| 21 | Inventurni viškovi na robi | pág. 36, Jev 1 |
| 22 | Ostali poslovni prihodi | pág. 36, precedente |
| 23 | Prihod od raspolaganja registracijama igrača (uključujući prihode od ustupanja, solidarnih doprinosa i naknada za treniranje) | pág. 13, Jev 1 |
| 24 | Dobit /(gubitak) od raspolaganja dugotrajnom imovinom | pág. 13, Jev 0.99 |
| 25 | Dobit /(gubitak) od raspolaganja ostalom nematerijalnom imovinom | pág. 13, Jev 0.97 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Troškovi prodaje robe/proizvoda - izravni | pág. 12, Jev 0.99 |
| 2 | Troškovi prodaje robe/proizvoda - ostali nerazvrstani | pág. 12, Jev 1 |
| 3 | Plaće igrača | pág. 12, Jev 1 |
| 4 | Ostali nerazvrstani troškovi primanja igrača | pág. 12, Jev 1 |
| 5 | Plaće stručnog stožera | pág. 12, Jev 0.99 |
| 6 | Ostali nerazvrstani troškovi primanja stručnog stožera | pág. 12, Claude 0.95 |
| 7 | Plaće ostalih zaposlenika | pág. 12, Jev 0.99 |
| 8 | Porezi i doprinosi - ostali zaposlenici | pág. 12, Jev 0.98 |
| 9 | Ostali nerazvrstani troškovi za primanja ostalih zaposlenika | pág. 12, Jev 1 |
| 10 | Amortizacija dugotrajne materijalne imovine | pág. 12, precedente |
| 11 | Amortizacija ostale nematerijalne imovine (bez registracija igrača) | pág. 12, precedente |
| 12 | Troškovi utakmica | pág. 12, precedente |
| 13 | Troškovi sponzorstva i oglašavanja | pág. 12, Jev 1 |
| 14 | Troškovi komercijalnih aktivnosti | pág. 12, Jev 1 |
| 15 | Troškovi imovine i objekata | pág. 12, Jev 0.99 |
| 16 | Kazne, penali naknada štete | pág. 37, Jev 0.95 |
| 17 | Usluge konzult., stručnog nadzora i savjetovanja | pág. 37, Jev 0.97 |
| 18 | Usluge pripreme i analitike sportaša | pág. 37, precedente |
| 19 | Troškovi zakupa i lizinga | pág. 37, precedente |
| 20 | Odvjetničke i bilježničke usluge, autorski honorari, ostale intelektualne usluge | pág. 37, Jev 0.99 |
| 21 | Bankovne usluge i troškovi platnog prometa | pág. 37, precedente |
| 22 | Naknade za korištenje prava intelekt. vlasništva | pág. 37, precedente |
| 23 | Troškovi reprezentacije | pág. 37, Jev 0.99 |
| 24 | Vrijednosno usklađenje od kupaca | pág. 37, Jev 0.99 |
| 25 | Troškovi telekomunikacijskih i prijevoznih usluga | pág. 37, precedente |
| 26 | Premije osiguranja | pág. 37, Claude 0.85 |
| 27 | Darovanje za općekorisne namjene | pág. 37, Jev 0.98 |
| 28 | Članarine, naknade i slična davanja | pág. 37, precedente |
| 29 | Troškovi službenog puta, obrazovanja i ostalo | pág. 37, precedente |
| 30 | Troškovi promidžbe | pág. 37, Jev 0.97 |
| 31 | Troškovi komunalnih usluga | pág. 37, precedente |
| 32 | Troškovi usklađenja | pág. 37, precedente |
| 33 | Troškovi koji će se prefakturirati | pág. 37, Jev 0.95 |
| 34 | Rashodi i otpisi potraživanja | pág. 37, Jev 0.98 |
| 35 | Troškovi stjecanja registracija igrača (uključujući troškove ustupanja, solidarne doprinose i naknade za treniranje) | pág. 13, Jev 1 |
| 36 | Nekapitalizirani troškovi za naknade agentima/posrednicima | pág. 13, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): cierre = 2025-12-31. ejercicio calendario: los financijsko izvješće de los clubes croatas cierran el 31-12 (Rijeka y Dinamo del mismo país lo hacen así); Pantallas 3, lote 103
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): hr-hnl, verificado contra roster cacheado de "2025–26 Croatian Football League" (tools/club-league-reference/hr.json), coincidencia exacta "Hajduk Split".
```

## 2024

### Ingresos

_antes de la fila 9 (`Prihod od raspolaganja registracijama igrača (uključujući prihod od ustupanja)`):_

```text
Sección de transferencias, líneas ORDINARIAS sin netear (Hajduk no capitaliza pases, ver
comentario de cabecera).
```

### Gastos

_antes de la fila 9 (`Troškovi stjecanja registracija igrača (uključujući troškove ustupanja)`):_

```text
Sección de transferencias, líneas ORDINARIAS (no capitaliza, ver comentario de cabecera).
```

### Meta

```text
Financijski prihodi(0) - Financijski rashodi(810.410) + Neto tečajne razlike(78.153).
grossDebt = Bankovni i ostali zajmovi (corriente 5.124.513 + no corriente 0). cash = Novac i
novčani ekvivalenti.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Ivan Bilić (2024-04-25 a hoy): La lista oficial de presidentes de hajduk.hr da 25/4/2024 hasta hoy. La página de organización del club lo muestra como Predsjednik Uprave. Antes: Marinka Akrap (8/4/2024 a 25/4/2024, interina) y Lukša Jakobušić (30/10/2020 a 8/4/2024).
```

## Fuentes

### hajduksplit-hr-financijsko-izvjesce-2024

_note (data/):_

```text
Balance auditado de HNK Hajduk s.d.d., preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de la HNS. Auditor: Kalibović i partneri d.o.o. Dictamen limpio, sin salvedades. El documento fuente presenta varias celdas con calidad de OCR media (dígitos truncados o perdidos); los valores afectados se reconstruyeron cruzando contra los subtotales "Ukupno" impresos (ver comentario de cabecera de data/hr/hajduksplit-hr-data.js para el detalle de cada reconstrucción). Transcripción completa en Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2024.md.
```

### hajduksplit-hr-financijsko-izvjesce-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
