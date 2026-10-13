# dinamozagreb-hr — evidencia de carga

Lo que había como comentario en `data/dinamozagreb-hr-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/dinamozagreb-hr-data.js — Građanski nogometni klub Dinamo (Zagreb, Croacia).
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

## Fuentes

### dinamozagreb-hr-financijsko-izvjesce-2024

_note (data/):_

```text
Balance auditado CONSOLIDADO (GNK Dinamo + Dinamo trade d.o.o. + Plavi korner d.o.o., 100% controladas), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de la HNS (Federación Croata de Fútbol). Auditor: Forvis Mazars d.o.o. Dictamen "Mišljenje s rezervom" (opinión con 3 salvedades sobre el EJERCICIO de reconocimiento de ciertas partidas entre 2023/2024, ver comentario de cabecera de data/dinamozagreb-hr-data.js) — no afecta la exactitud del ejercicio 2024 tal cual se carga acá. Transcripción completa en Clubes/Croacia/Dinamo Zagreb/financijsko-izvjesce-2024.md.
```
