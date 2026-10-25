# rijeka-hr — evidencia de carga

Lo que había como comentario en `data/hr/rijeka-hr-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/hr/rijeka-hr-data.js — HRVATSKI NOGOMETNI KLUB RIJEKA sportsko dioničko
društvo (Rijeka, Croacia). Tercer club croata cargado en esta sesión de
onboarding de Croacia como país nuevo. clubId 'rijeka-hr' (sufijo de país,
convención desde la Versión 129).

FUENTE ELEGIDA: `Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-kombinirani.md`
(el informe COMBINADO), NO `financijsko-izvjesce-2024.md` (el INDIVIDUAL).
Investigado antes de decidir: el "kombinirani" consolida HNK Rijeka s.d.d.
con Stadion Kantrida d.o.o. — la sociedad que ADMINISTRA EL ESTADIO Y VENDE
LAS ENTRADAS — exigido desde el Pravilnik o licenciranju i financijskoj
održivosti de octubre de 2024 de la HNS. Es decir: no es una versión
"extendida" opcional del mismo informe, es un documento DISTINTO y más
completo — el informe individual de HNK Rijeka s.d.d. a secas
probablemente NO incluye (o incluye parcialmente) los ingresos de
entradas/estadio, que se facturan a través de la subsidiaria. Usar el
individual habría subestimado el revenue real del club. Mismo criterio que
Dinamo (que también consolida sus 2 subsidiarias, Dinamo trade d.o.o. y
Plavi korner d.o.o.) — de los 3 clubes croatas cargados en esta sesión,
Dinamo y Rijeka reportan CONSOLIDADO, Hajduk reporta solo la sociedad
matriz (sin subsidiarias mencionadas en su propio documento).

El PDF del "kombinirani" tiene texto nativo limpio (sin problemas de OCR,
a diferencia del de Hajduk) — la transcripción ya vino provista en tablas
Markdown bien formateadas. Auditado por KPMG Croatia d.o.o. za reviziju,
dictamen LIMPIO ("Mišljenje" sin salvedades — el párrafo "Isticanje
pitanja" es solo una nota estándar sobre el marco contable de propósito
especial de la HNS, no una salvedad: "Naše mišljenje nije modificirano
zbog ovog pitanja"). Ejercicio fiscal = año CALENDARIO (1/1 a 31/12/2024).

Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2024 está 100% en
EUR sin necesidad de convertir de kuna.

A diferencia de Hajduk, Rijeka SÍ capitaliza/amortiza registraciones de
jugadores (misma "metoda kapitalizacije i amortizacije" que Dinamo) — la
sección de transferencias del documento dice explícitamente "Ispunjava
samo izvještajni subjekt koji primjenjuje metodu kapitalizacije i
amortizacije registracija igrača".

PRIHODI (ingresos) 2024, EUR exactos:
  Prihodi od ulaznica - ukupno: 1.675.274, desglosado en Nacionalna
    natjecanja 48.809 + UEFA klupska natjecanja 216.591 + Ostali
    nerazvrstani 10.348 → matchday_competition (275.748 combinado);
    Godišnje ulaznice 993.248 → season_tickets; Članarine 406.278 →
    member_dues (mismo criterio y misma duda que Dinamo, ver
    Admin/dudas-por-club.md).
  Prihod od sponzorstva i oglašavanja - ukupno: 1.231.950 →
    sponsorship_commercial.
  Prihodi od prava emitiranja - ukupno: 1.214.000 (Nacionalna natjecanja)
    → broadcasting.
  Komercijalni prihodi - ukupno: 1.388.707, desglosado en Prodaja
    proizvoda 771.956 + Ostali nerazvrstani 19.749 →
    sponsorship_commercial (791.705 combinado); Korištenje objekata za
    vrijeme neodigravanja utakmica 597.002 → stadium_other.
  Uefine nagrade i solidarne uplate - ukupno: 2.026.304 →
    competition_bonus.
  Ostali poslovni prihodi - ukupno: 834.045 (donaciones de estado/lokalne
    samouprave + terceros no relacionados + partidas sueltas) →
    other_income.
  Ukupno - Prihodi (impreso): 8.370.280. Suma de las 6 categorías de
    arriba verificada EXACTA.

RASHODI (gastos) 2024, ANTES de la sección de transferencias:
  Troškovi prodaje/materijala - ukupno: -1.093.209 → other_expenses.
  Troškovi primanja igrača -6.224.869 + Troškovi primanja stručnog
    stožera -2.059.390 → wages_squad (-8.284.259 combinado).
  Trošak primanja ostalih zaposlenika: -1.266.194 →
    admin_general_expense.
  Amortizacija i umanjenje vrijednosti dugotrajne materijalne imovine:
    -948.359 → depreciation (no hay línea de intangible-no-jugador este
    año, sale en 0).
  Trošak imovine s pravom korištenja -162.783 + Troškovi sponzorstva i
    oglašavanja -40.761 + Troškovi imovine i objekata -314.457 →
    admin_general_expense (-518.001 combinado).
  Troškovi održavanja utakmica: -645.353 → match_organisation_expense.
  Ostali nerazvrstani poslovni rashodi: -4.372.293 → other_expenses.
  Ukupno - poslovni rashodi (bez registracija igrača) impreso:
    -17.127.668. Suma de líneas de arriba verificada EXACTA.
  Poslovni rezultat (bez registracija igrača) impreso: -8.757.388 (=
    8.370.280 - 17.127.668, verificado).

SECCIÓN DE TRANSFERENCIAS DE JUGADORES (método de capitalización, misma
estructura que Dinamo — se separa la amortización real como línea de
gasto propia, se netea el resto en profitOnPlayerSales):
  Amortizacija dugotrajne nematerijalne imovine (registracije igrača):
    -502.826 → PROMOVIDA a línea propia `player_amortisation`.
  Dobit od raspolaganja dugotrajnom nematerijalnom imovinom (registracije
    igrača) +11.133.224, Gubitak od raspolaganja -1.040.429 → NETEADOS en
    `fiscalYearMeta.profitOnPlayerSales` = 11.133.224 - 1.040.429 =
    10.092.795.
  Neto rezultat impreso de toda esta sección (incluyendo amortización):
    9.589.969 = -502.826 + 10.092.795 ✓ tie-out exacto contra el impreso.

RESULTADO FINANCIERO (netInterest): Financijski prihodi 173.977 -
  Financijski rashodi 964.164 = -790.187 (impreso exacto, "Ukupni neto
  prihod/rashod od financiranja"). tax: Porezni prihod/(rashod) = 0
  (impreso).

TIE-OUT FINAL (verificado exacto): Poslovni rezultat -8.757.388 + Neto
  rezultat sección transferencias 9.589.969 + netInterest -790.187 + tax 0
  = 42.394 = Dobit/(gubitak) poslije oporezivanja impreso EXACTO.
  Equivalente en términos de revenueLines/expenseLines de este archivo:
  officialTotalRevenue 8.370.280 - officialTotalExpenses 17.630.494 [=
  17.127.668 + player_amortisation 502.826] + profitOnPlayerSales
  10.092.795 + netInterest -790.187 = 42.394 ✓.

MONEDA: EUR. El documento no declara tipo de cambio propio a USD — se usa
fxRef a FX_CLOSE (data/currency-map.js), que YA tenía la fecha necesitada
(EUR@2024-12-31) antes de esta carga.

BALANCE: grossDebt = Bankovni i drugi zajmovi (bank loans), corriente
  2.470.654 + no corriente 11.621.634 = 14.092.288 (mismo criterio angosto
  que Dinamo/Hajduk/Köln/Ajax, EXCLUYE obveze prema posrednicima/
  dobavljačima/zaposlenicima, factoring de transferencias, y obveze prema
  subjektima grupe/rezerviranja). cash: Novac i novčani ekvivalenti =
  1.691.323.

GESTIÓN: firman la Izjava o odgovornosti Uprave Nikola Ivaniš (član Uprave)
y Vlatko Vrkić (prokurist) — sin fecha de inicio/fin de mandato declarada
en el documento, gestionId genérico 'actual', sin entrada nominal en
gestionesByClub (no es obligatorio, ver club-or-year-onboarding SKILL.md
sección 16).
============================================================================
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Croacia/Rijeka/financijsko-izvjesce-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Croacia/Rijeka/financijsko-izvjesce-2025.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Dobit od prodaje igrača | pág. 25, Jev 0.98 |
| 2 | Prihodi od sponzorstava | pág. 25, Jev 0.99 |
| 3 | Prihodi od prodaje ulaznica | pág. 25, Jev 1 |
| 4 | Prihodi od TV prava | pág. 25, Jev 1 |
| 5 | Prihodi od prodaje ekonomskih prava igrača | pág. 25, Jev 1 |
| 6 | Najam poslovnog prostora | pág. 25, precedente |
| 7 | Ostali prihodi od prodaje | pág. 25, precedente |
| 8 | UEFA nagrade i solidarne uplate | pág. 25, Jev 1 |
| 9 | Donacije u zemlji | pág. 25, Jev 0.97 |
| 10 | Prihodi od članarina | pág. 25, Jev 1 |
| 11 | Ostali nespomenuti prihodi | pág. 25, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sportska oprema | pág. 26, Claude 0.8 |
| 2 | Roba za ambulantu | pág. 26, precedente |
| 3 | Utrošene sirovine i materijal | pág. 26, Jev 0.97 |
| 4 | Ostalo | pág. 26, Jev 1 |
| 5 | Troškovi prodane robe | pág. 26, Claude 0.8 |
| 6 | Naknade igračima i trenerima | pág. 26, Jev 1 |
| 7 | Najam | pág. 26, precedente |
| 8 | Intelektualne usluge | pág. 26, Jev 0.95 |
| 9 | Trošak održavanja utakmica | pág. 26, Jev 1 |
| 10 | Vanjske usluge | pág. 26, Jev 0.97 |
| 11 | Pripreme igrača | pág. 26, Jev 0.96 |
| 12 | Marketinški troškovi | pág. 26, Jev 1 |
| 13 | Prijevozne usluge | pág. 26, Jev 0.98 |
| 14 | Ostale usluge | pág. 26, precedente |
| 15 | Neto plaće i nadnice | pág. 26, precedente |
| 16 | Troškovi poreza i doprinosa iz plaća | pág. 26, precedente |
| 17 | Doprinosi na plaće | pág. 26, precedente |
| 18 | Nematerijalne imovine | pág. 27, precedente |
| 19 | Materijalne imovine | pág. 27, Jev 1 |
| 20 | Naknade za transfere igrača | pág. 27, Jev 0.92 |
| 21 | Reprezentacija | pág. 27, Jev 0.98 |
| 22 | Naknade i kazne savezima | pág. 27, precedente |
| 23 | Porezi i doprinosi koji ne ovise o rezultatu | pág. 27, Jev 0.99 |
| 24 | Dnevnice i putni troškovi | pág. 27, Jev 0.95 |
| 25 | Ostalo | pág. 27, Jev 1 |
| 26 | Vrijednosno usklađenje potraživanja | pág. 10, Jev 1 |
| 27 | Ostali poslovni rashodi | pág. 10, Jev 0.92 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): hr-hnl, verificado contra roster cacheado de "2025–26 Croatian Football League" (tools/club-league-reference/hr.json), coincidencia exacta "Rijeka".
```

## 2024

### Gastos

_antes de la fila 8 (`Amortizacija dugotrajne nematerijalne imovine (registracije igrača)`):_

```text
Amortizacija dugotrajne nematerijalne imovine (registracije igrača) — promovida a línea
propia, ver comentario de cabecera (no se netea con profitOnPlayerSales).
```

### Meta

```text
Dobit od raspolaganja (11.133.224) - Gubitak od raspolaganja (1.040.429), registracije
igrača. Ver comentario de cabecera para el tie-out completo de esta sección.
Financijski prihodi(173.977) - Financijski rashodi(964.164).
grossDebt = Bankovni i drugi zajmovi (corriente 2.470.654 + no corriente 11.621.634). cash =
Novac i novčani ekvivalenti.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Damir Mišković (2012-03-20 a hoy): Wikipedia en inglés: asumió como chairman el 20 de marzo de 2012, cuando rescató al club y pasó a ser el dueño. El informe financiero auditado 2024 (nk-rijeka.hr) lo muestra como Predsjednik Uprave con mandato vigente del 27/11/2020 al 27/11/2028: es la renovación actual, no el inicio. Los accionistas son TEANNA LIMITED (70 por ciento) y la ciudad de Rijeka (30 por ciento); se cargó a Mišković porque es quien firma y a la vez la persona detrás del dueño.
Duda: El desde 2012-03-20 es la fecha en que se hizo cargo del club (Wikipedia); el mandato formal de la Uprava actual figura desde 2020-11-27 en el informe del club. Si el sitio prefiere la fecha societaria, usar 2020-11-27.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Croacia/Rijeka/financijsko-izvjesce-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Croacia/Rijeka/financijsko-izvjesce-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Dobit od prodaje igrača | pág. 27, precedente |
| 2 | Prihodi od sponzorstava | pág. 27, precedente |
| 3 | Prihodi od prodaje ulaznica | pág. 27, precedente |
| 4 | Prihodi od TV prava | pág. 27, precedente |
| 5 | Najam poslovnog prostora | pág. 27, precedente |
| 6 | Ostali prihodi od prodaje | pág. 27, precedente |
| 7 | UEFA nagrade i solidarne uplate | pág. 28, precedente |
| 8 | Donacije u zemlji | pág. 28, precedente |
| 9 | Prihodi od članarina | pág. 28, precedente |
| 10 | Ostali nespomenuti prihodi | pág. 28, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Sportska oprema | pág. 28, precedente |
| 2 | Roba za ambulantu | pág. 28, precedente |
| 3 | Utrošene sirovine i materijal | pág. 28, precedente |
| 4 | Ostalo | pág. 28, precedente |
| 5 | Troškovi prodane robe | pág. 28, precedente |
| 6 | Naknade igračima i trenerima | pág. 28, precedente |
| 7 | Najam | pág. 28, precedente |
| 8 | Intelektualne usluge | pág. 28, precedente |
| 9 | Trošak održavanja utakmica | pág. 28, precedente |
| 10 | Vanjske usluge | pág. 28, precedente |
| 11 | Pripreme igrača | pág. 28, precedente |
| 12 | Marketinški troškovi | pág. 28, precedente |
| 13 | Prijevozne usluge | pág. 28, precedente |
| 14 | Ostale usluge | pág. 28, precedente |
| 15 | Neto plaće i nadnice | pág. 29, precedente |
| 16 | Troškovi poreza i doprinosa iz plaća | pág. 29, precedente |
| 17 | Doprinosi na plaće | pág. 29, precedente |
| 18 | Nematerijalne imovine | pág. 29, precedente |
| 19 | Materijalne imovine | pág. 29, precedente |
| 20 | Naknade za transfere igrača | pág. 29, precedente |
| 21 | Reprezentacija | pág. 29, precedente |
| 22 | Naknade i kazne savezima | pág. 29, precedente |
| 23 | Porezi i doprinosi koji ne ovise o rezultatu | pág. 29, precedente |
| 24 | Dnevnice i putni troškovi | pág. 29, precedente |
| 25 | Besplatne ulaznice | pág. 29, ? 0.55 |
| 26 | Ostalo | pág. 29, precedente |
| 27 | Vrijednosno usklađenje potraživanja | pág. 12, precedente |
| 28 | Ostali poslovni rashodi | pág. 12, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-25): hr-hnl, verificado contra roster cacheado de "2022–23 Croatian Football League" (tools/club-league-reference/hr.json), coincidencia exacta "Rijeka".
```

## Fuentes

### rijeka-hr-financijsko-izvjesce-2024-kombinirani

_note (data/):_

```text
Balance auditado COMBINADO (HNK Rijeka s.d.d. + Stadion Kantrida d.o.o., la sociedad que administra el estadio y vende las entradas), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de octubre de 2024 de la HNS — combinación exigida desde esa fecha. Auditor: KPMG Croatia d.o.o. za reviziju. Dictamen limpio, sin salvedades. Se usó este informe combinado en vez del informe individual de HNK Rijeka s.d.d. a secas (también disponible en la misma carpeta) porque los ingresos de entradas/estadio se facturan a través de la subsidiaria: el individual habría subestimado el revenue real del club. Transcripción completa en Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-kombinirani.md.
```

### rijeka-hr-financijsko-izvjesce-2025

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Croacia/Rijeka/financijsko-izvjesce-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### rijeka-hr-financijsko-izvjesce-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Croacia/Rijeka/financijsko-izvjesce-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
