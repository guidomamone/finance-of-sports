# dinamozagreb-hr — evidencia de carga

Lo que había como comentario en `data/hr/dinamozagreb-hr-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/hr/dinamozagreb-hr-data.js — Građanski nogometni klub Dinamo (Zagreb, Croacia).
Primer club croata cargado en el sitio (país nuevo, sesión de onboarding de
Croacia). clubId 'dinamozagreb-hr' (sufijo de país, convención desde la
Versión 129).

FUENTE: `Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2024.md`
(transcripción completa vía pdftotext, ya provista al onboardear el país —
el PDF SÍ tiene capa de texto nativa, sin necesidad de OCR). Es el informe
CONSOLIDADO ("Revidirani konsolidirani financijski izvještaji za posebne
namjene") que integra GNK Dinamo (la udruga/asociación) con sus 2
subsidiarias 100%-controladas: Dinamo trade d.o.o. (venta de merchandising)
y Plavi korner d.o.o. (concesiones de bebidas en el estadio). Auditado por
Forvis Mazars d.o.o., dictamen "Mišljenje s rezervom" (opinión CON
SALVEDADES, no limpia) — las 3 salvedades son sobre el EJERCICIO DE
RECONOCIMIENTO de ciertas partidas entre 2023 y 2024 (ingreso UEFA
Conference League de 1.425.800 EUR, ingreso de transfer de 9.415.287 EUR +
comisión de 1.883.057 EUR, y una previsión judicial de 1.359.255 EUR — el
auditor considera que corresponden al ejercicio 2023, no 2024), no sobre la
exactitud de los montos en sí. Se carga el ejercicio 2024 TAL CUAL lo
imprime el propio balance (no se ajustan las salvedades del auditor, que
afectan la comparación INTERANUAL 2023 vs 2024, no la cifra 2024 en sí
misma). Ejercicio fiscal = año CALENDARIO (1/1 a 31/12/2024, confirmado en
el propio documento: "za godinu koja završava na dan 31. prosinca 2024.").

Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2024 está 100% en
EUR sin necesidad de convertir de kuna.

FORMATO DEL DOCUMENTO: plantilla estandarizada del "Pravilnik o
licenciranju i financijskoj održivosti klubova" de la HNS (Federación
Croata de Fútbol) — la misma estructura de líneas se repite en los 3
clubes croatas cargados en esta sesión (Dinamo/Hajduk/Rijeka), lo que
resultó muy útil para categorizar consistente entre los 3.

PRIHODI (ingresos) 2024, EUR exactos (no en miles):
  Prihodi od ulaznica (tickets) - ukupno: 6.656.275, desglosado en:
    Nacionalna natjecanja 1.174.982 + UEFA klupska natjecanja 2.585.754 +
    VIP ulaznice i hospitality 630.476 + Ostali nerazvrstani 20.733 →
    matchday_competition (4.411.945 combinado); Godišnje ulaznice
    (abonos anuales) 1.356.000 → season_tickets; Članarine (membresías)
    888.330 → member_dues (ver duda en Admin/dudas-por-club.md: la
    plantilla HNS agrupa "Članarine" DENTRO del bloque de "Prihodi od
    ulaznica"/tickets, distinto del criterio argentino donde cuotas
    sociales es un bloque separado de "recaudación de entradas" — se
    mapeó a member_dues por ser la traducción literal, pero es una
    categorización con incertidumbre genuina).
  Prihod od sponzorstva i oglašavanja - Ukupno: 2.904.304 → sponsorship_commercial.
  Prihodi od prava emitiranja - Ukupno: 1.265.400 → broadcasting.
  Komercijalni prihodi - Ukupno: 6.380.549, desglosado en Nacionalna
    natjecanja 1.147.826 + Prodaja proizvoda (merchandising) 5.128.032 →
    sponsorship_commercial (6.275.858 combinado); Ugostiteljske usluge
    durante partidos 104.691 → stadium_other (catering de matchday, mismo
    criterio que "Catering" de 1.FC Köln).
  Uefine nagrade i solidarne uplate - Ukupno: 32.430.730 (56% del revenue
    total — el club jugó la fase de liga de la Champions League 2024/25) →
    competition_bonus (mismo criterio que "Premies Europese competities"
    de Ajax).
  Ostali poslovni prihodi - Ukupno: 7.924.977 (donaciones de entidades
    nacionales/estatales/terceros + partidas sueltas) → other_income.
  Ukupno - Prihodi (impreso): 57.562.235. Suma de líneas de arriba
    verificada EXACTA contra este total.

RASHODI (gastos) 2024, ANTES de la sección de transferencias de jugadores:
  Troškovi prodaje/materijala: -5.073.592 → other_expenses.
  Troškovi primanja igrača -25.469.684 + Troškovi primanja stručnog
    stožera -6.532.043 → wages_squad (-32.001.727 combinado, plantel +
    cuerpo técnico).
  Trošak primanja ostalih zaposlenika: -6.238.624 → admin_general_expense
    (resto del personal, no futbolístico).
  Amortizacija dugotrajne materijalne imovine (tangible): -341.710 →
    depreciation. Amortizacija ostale nematerijalne imovine, bez
    registracija igrača (intangible NO relacionado a jugadores): -299.380
    → other_amortisation.
  Trošak imovine s pravom korištenja (leasing operativo) -439.748 +
    Troškovi sponzorstva i oglašavanja -210.882 + Troškovi imovine i
    objekata -360.394 → admin_general_expense (-1.011.024 combinado).
  Troškovi utakmica: -2.565.436 → match_organisation_expense.
  Ostali nerazvrstani poslovni rashodi: -6.662.775 → other_expenses.
  Ukupno - poslovni rashodi (bez registracija igrača) impreso: -54.194.268.
    Suma de líneas de arriba verificada EXACTA.
  Poslovni rezultat (bez registracija igrača) impreso: 3.367.967 (=
    57.562.235 - 54.194.268, verificado).

SECCIÓN DE TRANSFERENCIAS DE JUGADORES (el documento la muestra APARTE del
cuerpo principal de Ingresos/Gastos, método de CAPITALIZACIÓN Y
AMORTIZACIÓN de pases — Dinamo SÍ capitaliza, a diferencia de Hajduk):
  Amortizacija nematerijalne imovine (registracije igrača): -6.117.746 →
    PROMOVIDA a línea de gasto propia `player_amortisation` (no metida en
    el neto de meta, ver club-data-mapping SKILL.md sección 1 — igual
    criterio que Köln/Ajax: nunca esconder la amortización real de pases
    en un campo meta cuando el documento la separa como línea propia).
  Dobit od raspolaganja nematerijalnom imovinom (ganancia por venta de
    pases) +12.944.185, Dobit/gubitak od ustupanja ostalog osoblja
    -118.335, Nekapitalizirani troškovi para agentes -1.219.642 → NETEADOS
    en `fiscalYearMeta.profitOnPlayerSales` = 12.944.185 - 118.335 -
    1.219.642 = 11.606.208 (mismo criterio que "Resultaat vergoedingssommen"
    de Ajax: el documento no desglosa el bruto de estos 3 conceptos por
    separado del resultado neto).
  Neto rezultat impreso de TODA esta sección (incluyendo la amortización):
    5.488.462 = -6.117.746 + 11.606.208 ✓ tie-out exacto contra el
    impreso, confirmando que la separación arriba es fiel.

RESULTADO FINANCIERO (netInterest): Financijski prihodi 14.966 -
  Financijski rashodi 544.459 - Neto tečajne razlike/gubici 2.543 =
  -532.036 (impreso exacto).
assetSales: Ukupno dobit/(gubitak) od raspolaganja (dugotrajnom) imovinom,
  NO relacionado a pases = -154.714 (impreso exacto).
tax: Porezni prihod/(rashod) = -784.561.

TIE-OUT FINAL (verificado exacto): revenue 57.562.235 - expenses
  60.312.014 [= 54.194.268 + 6.117.746 player_amortisation] +
  profitOnPlayerSales 11.606.208 + assetSales -154.714 + netInterest
  -532.036 + tax -784.561 = 7.385.118 = Dobit(gubitak) poslije oporezivanja
  impreso EXACTO.

MONEDA: EUR. El documento no declara tipo de cambio propio a USD (no hay
Anexo de moneda extranjera con TC de cierre) — se usa fxRef a FX_CLOSE
(data/currency-map.js), que YA tenía la fecha necesitada (EUR@2024-12-31)
antes de esta carga.

grossDebt: Bankovni i ostali zajmovi (bank loans), corriente 3.700.000 +
  no corriente 0 = 3.700.000. Se usó SOLO esta línea (deuda financiera
  real), EXCLUYENDO obveze prema agentima/dobavljačima/zaposlenicima
  (pasivos operativos, no deuda financiera) y obračunati troškovi/
  rezerviranja (devengados/previsiones) — mismo criterio angosto que
  Boca/Vélez/Köln/Ajax (club-data-mapping/referencia/formato-simplificado.md). cash:
  Novac i novčani ekvivalenti = 562.542.

GESTIÓN: la Uprava (directorio ejecutivo) cambió de composición DENTRO del
ejercicio 2024 (Vlatka Peras presidenta hasta 23/5/2024, Zvonimir Manenica
desde 5/6/2024) — sin un único responsable identificable para todo el
ejercicio, gestionId genérico 'actual', sin entrada nominal en
gestionesByClub (ya no es obligatorio, ver club-or-year-onboarding SKILL.md
sección 16).
============================================================================
```

_de data/clubs.js:_

```text
Croacia (onboarding 2026-09-25): PAÍS NUEVO, 3 clubes de HNL, ejercicio 2024 (año CALENDARIO,
fiscalYearStart:'01-01' — confirmado en cada documento fuente: "za godinu koja završava na dan
31. prosinca 2024."). reportingCurrency:'EUR' (Croacia adoptó el euro el 1/1/2023, el ejercicio
2024 es 100% en euros). brandColor verificado vía schemecolor.com/brandpalettes (Dinamo: azul de
su escudo/camiseta, "Hermes" en la paleta; Hajduk: camiseta blanca dominante con acento azul,
mismo criterio que River — se usó el azul #21409A de su indumentaria; Rijeka: camiseta
blanca/azul con la cruz celeste característica, se usó ese azul #38A1CE).
```

## 2025

### Ingresos

```text
2025: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Croacia/Dinamo Zagreb/dinamo-2025-konsolidirano.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Croacia/Dinamo Zagreb/dinamo-2025-konsolidirano.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Prihodi od ulaznica - Nacionalna natjecanja | pág. 10, Jev 1 |
| 2 | Prihodi od ulaznica - UEFA klupska natjecanja | pág. 10, Jev 0.92 |
| 3 | Prihodi od ulaznica - VIP ulaznice i hospitality | pág. 10, Jev 0.96 |
| 4 | Prihodi od ulaznica - Godišnje ulaznice | pág. 10, precedente |
| 5 | Prihodi od ulaznica - Članarine | pág. 10, precedente |
| 6 | Ostali nerazvrstani prihodi od ulaznica | pág. 10, Jev 0.92 |
| 7 | Prihod od sponzorstva i oglašavanja - Sponzor za opremu (Proizvođač opreme) | pág. 10, Jev 1 |
| 8 | Prihod od sponzorstva i oglašavanja - Glavni sponzor na opremi | pág. 10, Jev 1 |
| 9 | Ostali nerazvrstani prihodi od sponzorstva i oglašavanja | pág. 10, precedente |
| 10 | Prava emitiranja - Nacionalna natjecanja | pág. 10, Jev 0.99 |
| 11 | Komercijalni prihodi - Nacionalna natjecanja | pág. 10, Jev 0.99 |
| 12 | Komercijalni prihodi - Prodaja proizvoda | pág. 10, Jev 1 |
| 13 | Komercijalni prihodi - Korištenje objekata za vrijeme neodigravanja utakmica | pág. 10, Jev 1 |
| 14 | Ostali nerazvrstani komercijalni prihodi | pág. 10, Claude 0.85 |
| 15 | Uefina klupska natjecanja - prava emitiranja, komercijalni prihodi, nagrade | pág. 10, precedente |
| 16 | Donacije i dotacije ili drugi iznosi od nacionalnih nogometnih tijela | pág. 10, Jev 0.97 |
| 17 | Donacije i dotacije ili drugi iznosi od države (na teritoriju sjedišta) i lokalne samouprave | pág. 10, Jev 1 |
| 18 | Donacije nepovezanih strana | pág. 10, Jev 1 |
| 19 | Bonovi za ručak | pág. 30, Jev 0.98 |
| 20 | Refundacije | pág. 30, Jev 1 |
| 21 | Dohodak u naravi | pág. 30, Jev 1 |
| 22 | Naknade šteta | pág. 30, Jev 1 |
| 23 | Prihod od potraživanja po sudskim sporovima | pág. 30, Jev 1 |
| 24 | Naplaćena otpisana potraživanja | pág. 30, Jev 1 |
| 25 | Ostali prihodi | pág. 30, Jev 1 |
| 26 | Dobit od raspolaganja nematerijalnom imovinom (registracije igrača) | pág. 12, Jev 0.99 |
| 27 | Prihod od raspolaganja registracijama igrača (uključujući prihod od ustupanja) | pág. 12, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Troškovi prodaje robe/proizvoda - Izravni | pág. 11, Jev 0.99 |
| 2 | Troškovi prodaje robe/proizvoda - Ostali nerazvrstani | pág. 11, Jev 1 |
| 3 | Plaće igrača | pág. 11, Jev 1 |
| 4 | Porezi i doprinosi - igrači | pág. 11, Jev 0.99 |
| 5 | Ostali nerazvrstani troškovi primanja igrača | pág. 11, Jev 1 |
| 6 | Plaće stručnog stožera | pág. 11, Jev 0.99 |
| 7 | Porezi i doprinosi - stručni stožer | pág. 11, Claude 0.92 |
| 8 | Ostali nerazvrstani troškovi primanja stručnog stožera | pág. 11, Claude 0.92 |
| 9 | Plaće ostalih zaposlenika | pág. 11, Jev 0.96 |
| 10 | Porezi i doprinosi - Ostali zaposlenici | pág. 11, precedente |
| 11 | Ostali nerazvrstani troškovi za primanja ostalih zaposlenika | pág. 11, Jev 1 |
| 12 | Amortizacija dugotrajne materijalne imovine | pág. 11, precedente |
| 13 | Amortizacija ostale nematerijalne imovine (bez registracija igrača) | pág. 11, precedente |
| 14 | Trošak imovine s pravom korištenja (operativni najam) | pág. 11, Claude 0.88 |
| 15 | Troškovi utakmica | pág. 11, precedente |
| 16 | Troškovi sponzorstva i oglašavanja | pág. 11, Jev 1 |
| 17 | Troškovi komercijalnih aktivnosti | pág. 11, Jev 0.99 |
| 18 | Troškovi imovine i objekata | pág. 11, Jev 0.97 |
| 19 | Intelektualne usluge | pág. 31, Jev 0.99 |
| 20 | Službena putovanja | pág. 31, Jev 0.95 |
| 21 | Troškovi loža i reprezentacije | pág. 31, Jev 0.9 |
| 22 | Povremeni rad | pág. 31, precedente |
| 23 | Naknade i kazne savezima | pág. 31, precedente |
| 24 | Energija | pág. 31, Jev 0.98 |
| 25 | Komunalne usluge | pág. 31, Jev 0.98 |
| 26 | Telefon, Internet i prijevoz | pág. 31, precedente |
| 27 | Donacije | pág. 31, Jev 0.97 |
| 28 | Potrošni materijal | pág. 31, precedente |
| 29 | Članarine i kotizacije | pág. 31, precedente |
| 30 | Ispravak vrijednosti potraživanja | pág. 31, Jev 0.99 |
| 31 | Sitni inventar | pág. 31, precedente |
| 32 | Financijske usluge | pág. 31, Jev 0.91 |
| 33 | Osiguranje | pág. 31, Claude 0.92 |
| 34 | Ostali rashodi | pág. 31, Claude 0.85 |
| 35 | Amortizacija nematerijalne imovine (registracije igrača) | pág. 12, precedente |
| 36 | Umanjenje vrijednosti nematerijalne imovine (registracije igrača) | pág. 12, Jev 0.92 |
| 37 | Troškovi stjecanja registracija igrača (uključujući troškove ustupanja) | pág. 12, Jev 1 |
| 38 | Nekapitalizirani troškovi za naknade agentima/posrednicima | pág. 12, Jev 1 |
| 39 | Dobit /(gubitak) od raspolaganja dugotrajnom imovinom | pág. 12, precedente |
| 40 | Dobit /(gubitak) od raspolaganja ostalom nematerijalnom imovinom | pág. 12, precedente |

### Meta

```text
2025: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-19): cierre = 2025-12-31. el índice dice 'año que termina el 31 de diciembre de 2025' (.md líneas 25-28)
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): hr-hnl, verificado contra roster cacheado de "2025–26 Croatian Football League" (tools/club-league-reference/hr.json), coincidencia exacta "Dinamo Zagreb".
```

## 2024

### Gastos

_antes de la fila 9 (`Amortizacija nematerijalne imovine (registracije igrača)`):_

```text
Amortizacija nematerijalne imovine (registracije igrača) — promovida a línea propia, ver
comentario de cabecera (no se netea con profitOnPlayerSales).
```

### Meta

```text
Dobit od raspolaganja nematerijalnom imovinom (12.944.185) + Dobit/gubitak od ustupanja
ostalog osoblja (-118.335) + Nekapitalizirani troškovi za naknade agentima (-1.219.642).
Ver comentario de cabecera para el tie-out completo de esta sección.
Ukupno - dobit/(gubitak) od raspolaganja (dugotrajnom) imovinom, no relacionado a pases.
Financijski prihodi(14.966) - Financijski rashodi(544.459) - Neto tečajne razlike(2.543).
grossDebt = Bankovni i ostali zajmovi (corriente 3.700.000 + no corriente 0). cash = Novac i
novčani ekvivalenti.
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Velimir Zajec (2024-03-10 a 2025-09-16): Wikipedia en inglés da 10 de marzo de 2024 a 16 de septiembre de 2025 (lo sucede Zvonimir Boban); lo antecede Mirko Barišić. Dos fuentes de prensa (gnkdinamo.hr y zagreb.info, ambas con 403 al abrirlas) figuran en la búsqueda como confirmación de su elección en la asamblea de marzo de 2024; las fechas salen solo de la Wikipedia.
Duda: Las fechas de Zajec (2024-03-10 y 2025-09-16) salen de una sola fuente (Wikipedia). La página del club no se pudo abrir (403).
```

## Fuentes

### dinamozagreb-hr-financijsko-izvjesce-2024

_note (data/):_

```text
Balance auditado CONSOLIDADO (GNK Dinamo + Dinamo trade d.o.o. + Plavi korner d.o.o., 100% controladas), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de la HNS (Federación Croata de Fútbol). Auditor: Forvis Mazars d.o.o. Dictamen "Mišljenje s rezervom" (opinión con 3 salvedades sobre el EJERCICIO de reconocimiento de ciertas partidas entre 2023/2024, ver comentario de cabecera de data/hr/dinamozagreb-hr-data.js) — no afecta la exactitud del ejercicio 2024 tal cual se carga acá. Transcripción completa en Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2024.md.
```

### dinamozagreb-hr-dinamo-2025-konsolidirano

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Croacia/Dinamo Zagreb/dinamo-2025-konsolidirano.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```
