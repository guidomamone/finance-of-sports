# monza-it — evidencia de carga

Lo que había como comentario en `data/monza-it-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/monza-it-data.js — Associazione Calcio Monza S.p.A. (Italia).
ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
las estructuras de abajo están vacías a propósito. Los rubros, los totales
oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
(tools/proponer-carga.mjs / sesión de onboarding), que es también la que
reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).

Documento que originó el alta: Clubes/Italia/Monza/Monza-bilancio-2022.pdf

De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
  id                 ok        "monza-it" — slug de "Monza" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
  name               ok        "Associazione Calcio Monza S.p.A." — el .md, 6 veces (nombre del club + forma societaria)
  displayName        ok        "Monza" — nombre de la carpeta del club en Clubes/
  country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
  reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
  fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
  sport              ok        "futbol" — el .md nombra el fútbol 37 veces y ningún otro deporte más que eso
  brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
  anio               ok        2022 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
  cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
  reportType         ok        "official_balance_sheet" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: balance anual ('Bilancio d'Esercizio al 31 dicembre 2022'); 'semestr
  perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 1 ejerc
  currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
  fxRef              ok        "EUR@2022-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.937559. --escribir agrega 'EUR@2022-12-31' a FX_CLOSE
  sourceId           ok        "monza-it-bilancio-2022" — clubId + nombre del archivo en slug
  liga               ok        "it-seriea" — roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Monza"

FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
  2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-12-31","sourceId":"monza-it-bilancio-2022"}
============================================================================
```

_de data/clubs.js:_

```text
Monza: alta por tools/alta-club.mjs (2026-10-07) desde Clubes/Italia/Monza/Monza-bilancio-2022.pdf.
brandColor y su procedencia: fuentes/Italia/Monza.md.
```

_de data/club-leagues/it.js:_

```text
Monza (alta-club.mjs, 2026-10-07): verificado contra roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Monza".
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Monza/Monza-bilancio-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Monza/Monza-bilancio-2024.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di Campionato | pág. 50, precedente |
| 2 | Gare Coppa Italia | pág. 50, precedente |
| 3 | Gare Amichevoli | pág. 50, precedente |
| 4 | Gare Coppa Italia | pág. 50, precedente |
| 5 | Abbonamenti | pág. 50, precedente |
| 6 | Contributi Federali | pág. 50, precedente |
| 7 | Contributi LNPA | pág. 50, precedente |
| 8 | Proventi da sponsorizzazioni e altre attività promozionali | pág. 51, precedente |
| 9 | Proventi commerciali e royalties | pág. 51, precedente |
| 10 | Proventi corporate | pág. 51, precedente |
| 11 | Proventi da cessione diritti audiovisivi | pág. 51, precedente |
| 12 | Ricavi da cessione temporanea prestazioni calciatori | pág. 51, precedente |
| 13 | Altri proventi da gestione calciatori | pág. 51, precedente |
| 14 | Plusvalenze da cessione diritti pluriennali alle prestazioni dei calciatori | pág. 51, Jev 0.99 |
| 15 | Ricavi altre attività sportive organizzate dalla società | pág. 51, precedente |
| 16 | Proventi da attività accessorie | pág. 51, precedente |
| 17 | Proventi diversi, indennizzi e sopravvenienze | pág. 51, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6. Per materie prime, sussidiarie, di consumo e di merci | pág. 19, precedente |
| 2 | Costi per tesserati | pág. 53, precedente |
| 3 | Costi per attività sportiva | pág. 53, precedente |
| 4 | Costi specifici tecnici | pág. 53, precedente |
| 5 | Compensi per Agenti Sportivi | pág. 53, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 53, precedente |
| 7 | Costi assicurativi e servizi finanziari | pág. 53, precedente |
| 8 | Costi per servizi inerenti il personale | pág. 53, precedente |
| 9 | Spese amministrative e generali | pág. 53, precedente |
| 10 | Spese pubblicitarie e promozionali | pág. 53, precedente |
| 11 | Servizio biglietteria e controllo ingressi | pág. 53, precedente |
| 12 | Noleggio automezzi e autoveicoli per uso aziendale | pág. 55, precedente |
| 13 | Noleggio attrezzature sportive e varie | pág. 55, precedente |
| 14 | Canoni utilizzo software e simili | pág. 55, precedente |
| 15 | Concessione strutture sportive | pág. 55, precedente |
| 16 | a) salari e stipendi | pág. 19, precedente |
| 17 | b) oneri sociali | pág. 19, precedente |
| 18 | c) trattamento di fine rapporto | pág. 19, precedente |
| 19 | e) altri costi | pág. 19, precedente |
| 20 | Licenze Software | pág. 56, precedente |
| 21 | Marchio | pág. 56, precedente |
| 22 | Diritti Pluriennali prest. Calciatori | pág. 56, precedente |
| 23 | Migliorie Stadio | pág. 56, precedente |
| 24 | Migliorie Monzello | pág. 56, precedente |
| 25 | Altre immobilizzazioni immateriali | pág. 56, precedente |
| 26 | Terreni e fabbricati | pág. 56, precedente |
| 27 | Impianto Telefonico | pág. 56, precedente |
| 28 | Impianti Generici | pág. 56, precedente |
| 29 | Attrezzatura e dotazioni | pág. 56, precedente |
| 30 | Attrezzatura Sportiva | pág. 56, precedente |
| 31 | Macchine Elettroniche | pág. 56, precedente |
| 32 | Mobili E Arredi | pág. 56, precedente |
| 33 | Autovetture e ciclomotori | pág. 56, precedente |
| 34 | Allestimenti stadio | pág. 56, precedente |
| 35 | c) altre svalutazioni delle immobilizzazioni | pág. 19, precedente |
| 36 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 19, precedente |
| 37 | 12. Accantonamenti per rischi | pág. 19, precedente |
| 38 | Minusvalenze cessione diritti pluriennali prestazione calciatori | pág. 57, precedente |
| 39 | Costi per acquisizione temporanea prestazione calciatori | pág. 57, precedente |
| 40 | Spese organizzazione gare | pág. 57, precedente |
| 41 | Tasse iscrizioni gare | pág. 57, precedente |
| 42 | Percentuale su incassi gare a squadre ospitate | pág. 57, precedente |
| 43 | Oneri contribuzione Lega | pág. 57, precedente |
| 44 | sell on fee | pág. 57, Jev 0.99 |
| 45 | premi di preparazione | pág. 57, precedente |
| 46 | premi/indennizzi passivi ex art. 103, comma 3, NOIF | pág. 57, precedente |
| 47 | contributi di solidarietà | pág. 57, Jev 0.91 |
| 48 | altri oneri | pág. 57, precedente |
| 49 | sopravvenienze passive e perdite su crediti | pág. 57, precedente |
| 50 | multe e ammende | pág. 57, precedente |
| 51 | imposte e tasse diverse | pág. 57, precedente |
| 52 | abbonamenti | pág. 57, precedente |
| 53 | minusvalenze cessione immobilizzazioni materiali | pág. 57, precedente |
| 54 | altri | pág. 57, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2024: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Monza/Monza-bilancio-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Monza/Monza-bilancio-2023.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di Campionato | pág. 47, precedente |
| 2 | Gare Coppa Italia | pág. 47, precedente |
| 3 | Gare Amichevoli | pág. 47, precedente |
| 4 | Ricavi da gare fuori casa | pág. 47, precedente |
| 5 | Abbonamenti | pág. 47, precedente |
| 6 | Contributi Federali | pág. 47, precedente |
| 7 | Controbuti LNPA | pág. 47, precedente |
| 8 | Altri contributi sportivi | pág. 47, precedente |
| 9 | Proventi da sponsorizzazioni e altre attività promozionali | pág. 47, precedente |
| 10 | Proventi commerciali e royalties | pág. 47, precedente |
| 11 | Proventi da cessione diritti audiovisivi | pág. 47, precedente |
| 12 | Proventi Corporate | pág. 47, precedente |
| 13 | Ricavi da cessione temporanea prestazioni calciatori | pág. 48, precedente |
| 14 | Altri proventi da gestione calciatori | pág. 48, precedente |
| 15 | Plusvalenze da cessione diritti pluriennali prestazioni dei calciatori | pág. 48, Jev 1 |
| 16 | Ricavi altre attività sportive organizzate dalla società | pág. 48, precedente |
| 17 | Proventi da attività accessorie | pág. 48, precedente |
| 18 | Proventi diversi, indennizzi e sopravvenienze | pág. 48, precedente |
| 19 | Contributi e crediti fiscali emergenza sanitaria | pág. 48, precedente |

### Gastos

```text
tools/cargar.mjs (2026-10-08)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6. Per materie prime, sussidiarie, di consumo e di merci | pág. 17, precedente |
| 2 | Costi per tesserati | pág. 49, precedente |
| 3 | Costi per attività sportiva | pág. 49, precedente |
| 4 | Costi specifici tecnici | pág. 49, precedente |
| 5 | Compensi per Agenti Sportivi | pág. 49, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 49, precedente |
| 7 | Costi assicurativi e servizi finanziari | pág. 49, precedente |
| 8 | Costi per servizi inerenti il personale | pág. 49, precedente |
| 9 | Spese amministrative e generali | pág. 49, precedente |
| 10 | Spese pubblicitarie e promozionali | pág. 49, precedente |
| 11 | Servizio biglietteria e controllo ingressi | pág. 49, precedente |
| 12 | Noleggio automezzi e autoveicoli per uso aziendale | pág. 51, precedente |
| 13 | Noleggio attrezzature sportive e varie | pág. 51, precedente |
| 14 | Locazione impianti sportivi | pág. 51, precedente |
| 15 | Canoni utilizzo software e simili | pág. 51, precedente |
| 16 | Locazioni immobiliari | pág. 51, Jev 0.99 |
| 17 | Concessione strutture sportive | pág. 51, precedente |
| 18 | a) salari e stipendi | pág. 17, precedente |
| 19 | b) oneri sociali | pág. 17, precedente |
| 20 | c) trattamento di fine rapporto | pág. 17, precedente |
| 21 | e) altri costi | pág. 17, precedente |
| 22 | Licenze Software | pág. 52, precedente |
| 23 | Marchio | pág. 52, precedente |
| 24 | Diritti Pluriennali prest. Calciatori | pág. 52, precedente |
| 25 | Migliorie Stadio | pág. 52, precedente |
| 26 | Migliorie Centro Sportivo | pág. 52, Claude 0.93 |
| 27 | Altre immobilizzazioni immateriali | pág. 52, precedente |
| 28 | Terreni e fabbricati | pág. 52, precedente |
| 29 | Impianto Telefonico | pág. 52, precedente |
| 30 | Impianti Generici | pág. 52, precedente |
| 31 | Attrezzatura e dotazioni | pág. 52, precedente |
| 32 | Attrezzatura Sportiva | pág. 52, precedente |
| 33 | Macchine Elettroniche | pág. 52, precedente |
| 34 | Mobili E Arredi | pág. 52, precedente |
| 35 | Autovetture e ciclomotori | pág. 52, precedente |
| 36 | Allestimenti stadio | pág. 52, precedente |
| 37 | c) altre svalutazioni delle immobilizzazioni | pág. 17, precedente |
| 38 | d) svalutazioni dei crediti compresi nell'attivo circolante e delle disponibilità liquide | pág. 17, Jev 1 |
| 39 | 12. Accantonamenti per rischi | pág. 17, precedente |
| 40 | Minusvalenze cessione diritti pluriennali prestazione calciatori | pág. 53, precedente |
| 41 | Costi per acquisizione temporanea prestazione calciatori | pág. 53, precedente |
| 42 | Spese organizzazione gare | pág. 53, precedente |
| 43 | Tasse iscrizioni gare | pág. 53, precedente |
| 44 | Percentuale su incassi gare a squadre ospitate | pág. 53, precedente |
| 45 | Oneri contribuzione Lega | pág. 53, precedente |
| 46 | premi di preparazione | pág. 53, precedente |
| 47 | premi/indennizzi passivi ex art. 103, comma 3, NOIF | pág. 53, Jev 0.9 |
| 48 | altri oneri | pág. 53, precedente |
| 49 | sopravvenienze passive e perdite su crediti | pág. 53, precedente |
| 50 | multe e ammende | pág. 53, precedente |
| 51 | imposte e tasse diverse | pág. 53, precedente |
| 52 | abbonamenti | pág. 53, precedente |
| 53 | minusvalenze cessione immobilizzazioni materiali | pág. 53, ? 0.6 |
| 54 | altri | pág. 53, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
2023: tools/cargar.mjs 2026-10-08, verificado contra roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia e
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Monza/Monza-bilancio-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Italia/Monza/Monza-bilancio-2022.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gare di Campionato | pág. 45, Jev 0.98 |
| 2 | Gare Coppa Italia | pág. 45, Jev 0.93 |
| 3 | Gare Amichevoli | pág. 45, Jev 0.99 |
| 4 | Ricavi da gare fuori casa | pág. 45, precedente |
| 5 | Abbonamenti | pág. 45, precedente |
| 6 | Mutualità generale LNPB | pág. 47, precedente |
| 7 | Contributi Federali | pág. 47, Jev 0.96 |
| 8 | Contributi LNPA | pág. 47, Jev 0.94 |
| 9 | Altri contributi sportivi | pág. 47, precedente |
| 10 | Contributi LNPB | pág. 47, Jev 0.93 |
| 11 | Proventi da sponsorizzazioni e altre attività promozionali | pág. 46, Jev 0.94 |
| 12 | Proventi commerciali e royalties | pág. 46, Jev 0.98 |
| 13 | Proventi da cessione diritti audiovisivi | pág. 46, Jev 1 |
| 14 | Proventi Corporate | pág. 46, Jev 0.95 |
| 15 | Ricavi da cessione temporanea prestazioni calciatori | pág. 46, precedente |
| 16 | Altri proventi da gestione calciatori | pág. 46, precedente |
| 17 | Ricavi altre attività sportive organizzate dalla società | pág. 46, precedente |
| 18 | Proventi da attività accessorie | pág. 46, Jev 0.97 |
| 19 | Proventi diversi, indennizzi e sopravvenienze | pág. 46, Jev 1 |
| 20 | Contributi e crediti fiscali emergenza sanitaria | pág. 46, Jev 1 |

### Gastos

```text
tools/cargar.mjs (2026-10-07)
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 6. Per materie prime, sussidiarie, di consumo e di merci | pág. 16, Jev 0.99 |
| 2 | Costi per tesserati | pág. 48, precedente |
| 3 | Costi per attività sportiva | pág. 48, precedente |
| 4 | Costi specifici tecnici | pág. 48, precedente |
| 5 | Compensi per Agenti Sportivi | pág. 48, precedente |
| 6 | Costi vitto, alloggio, locomozione gare | pág. 48, Jev 1 |
| 7 | Costi assicurativi e servizi finanziari | pág. 48, Jev 1 |
| 8 | Costi per servizi inerenti il personale | pág. 48, precedente |
| 9 | Spese amministrative e generali | pág. 48, Jev 1 |
| 10 | Spese pubblicitarie e promozionali | pág. 48, Jev 0.93 |
| 11 | Servizio biglietteria e controllo ingressi | pág. 48, Jev 0.99 |
| 12 | Noleggio automezzi e autoveicoli per uso aziendale | pág. 50, precedente |
| 13 | Noleggio attrezzature sportive e varie | pág. 50, precedente |
| 14 | Locazione impianti sportivi | pág. 50, precedente |
| 15 | Canoni utilizzo software e simili | pág. 50, precedente |
| 16 | Concessione strutture sportive | pág. 50, precedente |
| 17 | a) salari e stipendi | pág. 16, Jev 0.93 |
| 18 | b) oneri sociali | pág. 16, precedente |
| 19 | c) trattamento di fine rapporto | pág. 16, precedente |
| 20 | e) altri costi | pág. 16, precedente |
| 21 | Costi di Impianto e Ampliamento | pág. 51, Claude 0.85 |
| 22 | Licenze Software | pág. 51, Claude 0.85 |
| 23 | Marchio | pág. 51, Claude 0.85 |
| 24 | Diritti Pluriennali prest. Calciatori | pág. 51, Jev 0.99 |
| 25 | Migliorie Stadio | pág. 51, precedente |
| 26 | Migliorie Monzello | pág. 51, precedente |
| 27 | Altre immobilizzazioni immateriali | pág. 51, Jev 0.93 |
| 28 | Terreni e fabbricati | pág. 51, Jev 0.98 |
| 29 | Impianto Telefonico | pág. 51, Claude 0.9 |
| 30 | Impianti Generici | pág. 51, Claude 0.9 |
| 31 | Attrezzatura e dotazioni | pág. 51, Claude 0.9 |
| 32 | Attrezzatura Sportiva | pág. 51, Claude 0.9 |
| 33 | Macchine Elettroniche | pág. 51, Claude 0.9 |
| 34 | Mobili e Arredi | pág. 51, Claude 0.9 |
| 35 | Autovetture e ciclomotori | pág. 51, Claude 0.9 |
| 36 | Allestimenti stadio | pág. 51, Claude 0.9 |
| 37 | c) altre svalutazioni delle immobilizzazioni | pág. 16, precedente |
| 38 | 12. Accantonamenti per rischi | pág. 16, precedente |
| 39 | Minusvalenze cessione diritti pluriennali prestazione calciatori | pág. 52, precedente |
| 40 | Costi per acquisizione temporanea prestazione calciatori | pág. 52, precedente |
| 41 | Spese organizzazione gare | pág. 52, Jev 1 |
| 42 | Tasse iscrizioni gare | pág. 52, Jev 0.98 |
| 43 | Percentuale su incassi gare a squadre ospitate | pág. 52, Jev 0.97 |
| 44 | Oneri contribuzione Lega | pág. 52, precedente |
| 45 | premi di preparazione | pág. 52, precedente |
| 46 | altri oneri | pág. 52, Claude 0.8 |
| 47 | sopravvenienze passive e perdite su crediti | pág. 52, Jev 0.92 |
| 48 | multe e ammende | pág. 52, Jev 1 |
| 49 | imposte e tasse diverse | pág. 52, Jev 0.99 |
| 50 | abbonamenti | pág. 52, Jev 0.99 |
| 51 | altri | pág. 52, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): reportType = official_balance_sheet. Guido 2026-10-06: balance anual ('Bilancio d'Esercizio al 31 dicembre 2022'); 'semestre' es un comentario de gestión, no un intermedio
2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2022-12-31. Guido 2026-10-06: el ejercicio cierra el 31/12/2022
tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Gestiones

_antes de Fininvest (data/gestiones/it.js):_

```text
Desde el 8/7/2022 el club no tiene presidente persona: lo controla Fininvest (sociedad de la familia Berlusconi). Decisión de Guido
2026-10-07: se carga Fininvest como gestión (excepción a "el dueño solo si es una persona con nombre", ver ar.js).
```

## Fuentes

### (general)

```text
Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
```

### monza-it-bilancio-2022

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Monza/Monza-bilancio-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### monza-it-bilancio-2023

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Monza/Monza-bilancio-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### monza-it-bilancio-2024

_note (data/):_

```text
Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Monza/Monza-bilancio-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
